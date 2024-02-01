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


model = YOLO(
    "D:\\Niru\\Coding\\Projects\\Important\\AgriVision\\1\\AgriVision-React-Django-ML\\backend\\prediction\\mlModel\\best.pt"
)


@csrf_exempt
def imagePrediction(request):
    if request.method == "POST":
        form = ObjectDetectionForm(request.POST, request.FILES)

        if form.is_valid():
            image = form.save()

            results = model.predict(source=image.image.path, conf=0.2)

            detected_classes = []
            confidence_scores = []

            for result in results:
                im_array = result.plot()
                im = Image.fromarray(
                    im_array[..., ::-1]
                )  
                im.save(
                    "D:\\Niru\\Coding\\Projects\\Important\\AgriVision\\1\\AgriVision-React-Django-ML\\backend\\media\\results.jpg"
                )

                tensor_data_0 = results[0].masks.data[0]
                numpy_data_0 = tensor_data_0.numpy()
                _, binary_image = cv2.threshold(numpy_data_0, 0, 255, cv2.THRESH_BINARY)
                binary_image = binary_image.astype(np.uint8)
                contours, _ = cv2.findContours(
                    binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
                )

                for contour in contours:
                    area = cv2.contourArea(contour)
                    print("Area:", area)
                height_factor_20m = 1.3

                conversion_factor_mm_to_px = 0.02962
                area_m2 = area * conversion_factor_mm_to_px
                print("Area in square meters : at 20m height", area_m2)

                actual_area = area_m2 / height_factor_20m
                print(
                    "Area in square meters : at ground height, is in the range",
                    (actual_area - 10),
                    "-",
                    (actual_area + 10),
                )

                boxes = result.boxes.cpu().numpy()
                for box in boxes:
                    detected_class = result.names[
                        int(box.cls[0])
                    ] 
                    detected_classes.append(detected_class)

                    confidence_score = box.conf[0]
                    confidence_scores.append(confidence_score)
                    print(
                        "confidence_score {}:".format(detected_class), confidence_score
                    )

            predicted_image = PredictedImage.objects.create()

            with open(
                "D:\\Niru\\Coding\\Projects\\Important\\AgriVision\\1\\AgriVision-React-Django-ML\\backend\\media\\results.jpg",
                "rb",
            ) as file:
                content = file.read()
                predicted_image.image.save("predicted_image.jpg", ContentFile(content))

            predicted_image.save()

            image.predicted_image = predicted_image
            image.save()

            return JsonResponse({"area": area, "image_url": predicted_image.image.url})
        else:
            return JsonResponse({"error": "Invalid form data"}, status=400)

    return JsonResponse(
        {"classes": detected_classes, "image_url": predicted_image.image.url}
    )
