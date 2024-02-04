from django.urls import path, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
import prediction.views as views

urlpatterns = [
    path("image/", views.imagePrediction, name="imagePrediction"),
    re_path(r"^.*", TemplateView.as_view(template_name="index.html")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
