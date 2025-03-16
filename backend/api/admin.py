from django.contrib import admin
from .models import Animal, Consultation, Diagnosis, Disease, Doctor, Owner, Treatment
# Models
admin.site.register(Animal)
admin.site.register(Consultation)
admin.site.register(Diagnosis)
admin.site.register(Disease)
admin.site.register(Doctor)
admin.site.register(Owner)
admin.site.register(Treatment)