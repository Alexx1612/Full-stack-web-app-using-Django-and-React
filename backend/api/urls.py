from django.urls import path
from . import views

urlpatterns = [
    path("doctors/", views.DoctorListCreate.as_view(), name="doctor-list"),
    path("doctors/delete/<int:pk>/", views.DoctorDelete.as_view(), name="delete-doctor"),

    path('animals/', views.AnimalListUpdateView.as_view(), name='animal-list-update'),
    path('owners/', views.OwnerListUpdateView.as_view(), name='owner-list-update'),

    path("consultations/", views.ConsultationListCreate.as_view(), name="consultation-list"),
    path("consultations/delete/<int:pk>/", views.ConsultationDelete.as_view(), name="delete-consultation")

]


