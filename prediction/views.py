from ultralytics import YOLO
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from django.core.files.base import ContentFile
from django.utils.translation import gettext_lazy as _
from .forms import ObjectDetectionForm
from .models import PredictedImage
import cv2
from django.http import JsonResponse
import numpy as np
import base64
import os


model = YOLO(
    "D:\\Niru\\Coding\\Projects\\Important\\AgriVision\\1\\AgriVision\\prediction\\mlModel\\best.pt"
)


@csrf_exempt
def imagePrediction(request):
    if request.method == "POST":
        form = ObjectDetectionForm(request.POST, request.FILES)

        if form.is_valid():
            image = form.save(commit=False)
            desired_filename = "input_image.jpg"
            image.image.name = desired_filename
            image.save()

            results = model.predict(
                source=image.image.path, conf=0.2, show_boxes=False, save=True
            )

            pred_dir = results[0].save_dir
            pred_dir_path = r"{}".format(pred_dir)

            assert os.path.isdir(pred_dir_path), "Directory not found: {}".format(
                pred_dir_path
            )

            predicted_image = PredictedImage.objects.create()

            try:
                files = os.listdir(pred_dir_path)

                assert len(files) > 0, "No files found in the directory: {}".format(
                    pred_dir_path
                )

                files.sort(
                    key=lambda x: os.path.getmtime(os.path.join(pred_dir_path, x)),
                    reverse=True,
                )

                filename = files[0]
                file_path = os.path.join(pred_dir_path, filename)

                with open(file_path, "rb") as file:
                    content = file.read()
                    print("Content is being read")
                    predicted_image.image.save(
                        "predicted_image.jpg", ContentFile(content)
                    )
            except AssertionError as e:
                print(e)

            detected_classes = []

            for result in results:
                boxes = result.boxes.cpu().numpy()
                for i, box in enumerate(boxes):
                    detected_class = result.names[int(box.cls[0])]
                    detected_classes.append(detected_class)

            retain_mask_areas = {}
            destroy_mask_areas = {}
            masks = results[0].masks.data
            numberOfMasks = len(masks)

            for i in range(numberOfMasks):
                class_name = detected_classes[i]

                tensor_data = results[0].masks.data[i]
                numpy_data = tensor_data.numpy()
                _, binary_image = cv2.threshold(numpy_data, 0, 255, cv2.THRESH_BINARY)
                binary_image = binary_image.astype(np.uint8)

                contours, _ = cv2.findContours(
                    binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
                )

                total_area = 0

                for contour in contours:
                    area = cv2.contourArea(contour)
                    total_area += area

                if class_name == "retain":
                    retain_mask_areas[i] = total_area
                    print(
                        "Area in pixels for 'Retain' mask {}: {} sq. pixels".format(
                            i, total_area
                        )
                    )
                elif class_name == "destroy":
                    destroy_mask_areas[i] = total_area
                    print(
                        "Area in pixels for 'Destroy' mask {}: {} sq. pixels".format(
                            i, total_area
                        )
                    )

            total_retain_area = sum(retain_mask_areas.values())
            total_destroy_area = sum(destroy_mask_areas.values())

            print("Total Retain Area:", total_retain_area, "sq. pixels")
            print("Total Destroy Area:", total_destroy_area, "sq. pixels")

            try:
                files = os.listdir(pred_dir_path)
                assert len(files) > 0, "No files found in the directory: {}".format(
                    pred_dir_path
                )

                files.sort(
                    key=lambda x: os.path.getmtime(os.path.join(pred_dir_path, x)),
                    reverse=True,
                )

                filename = files[0]
                file_path = os.path.join(pred_dir_path, filename)

                with open(file_path, "rb") as file:
                    encoded_image = base64.b64encode(file.read()).decode("utf-8")

            except AssertionError as e:
                print(e)

            predicted_image.save()

            return JsonResponse(
                {
                    "retainedArea": total_retain_area,
                    "destroyedArea": total_destroy_area,
                    "image": encoded_image,
                }
            )
        else:
            return JsonResponse({"error": "Invalid form data"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=405)
