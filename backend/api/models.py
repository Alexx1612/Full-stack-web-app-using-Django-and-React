from django.db import models
from django.contrib.auth.models import User

class Doctor(models.Model):
    first_name_d = models.CharField(max_length=50)
    last_name_d = models.CharField(max_length=50)
    specialization = models.CharField(max_length=100)
    experience = models.IntegerField()
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name="doctors")
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return f"Dr. {self.first_name_d} {self.last_name_d}"
    class Meta:
        managed = True
        db_table = 'doctors'

class Owner(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    address = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    class Meta:
        managed = True
        db_table = 'owners'

class Animal(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, default=1)
    name = models.CharField(max_length=50)
    breed = models.CharField(max_length=50)
    pedigree = models.BooleanField()
    age = models.IntegerField()
    weight = models.FloatField()
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], default='Male')
    birth_date = models.DateField()

    def __str__(self):
        return self.name
    class Meta:
        managed = True
        db_table = 'animals'

class Disease(models.Model):
    risk_level = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    symptoms = models.CharField(max_length=200)
    transmissible = models.BooleanField()

    def __str__(self):
        return self.name
    class Meta:
        managed = True
        db_table = 'diseases'

class Treatment(models.Model):
    duration = models.IntegerField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    estimated_cost = models.FloatField()

    def __str__(self):
        return self.name
    class Meta:
        managed = True
        db_table = 'treatments'

class Diagnosis(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE)
    treatment = models.ForeignKey(Treatment, on_delete=models.CASCADE)
    date = models.DateField()
    justification = models.TextField()

    def __str__(self):
        return f"Diagnosis for {self.animal}: {Treatment.name} for {Disease.name}"
    
    class Meta:
        managed = True
        db_table = 'diagnoses'
        verbose_name_plural = "Diagnoses"

class Consultation(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="doctor")
    consultation_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    duration = models.IntegerField()
    cost = models.FloatField()

    def __str__(self):
        return f"Consultation with {self.doctor} for {self.animal} scheduled at {self.consultation_date} "
    
    class Meta:
        managed = True
        db_table = 'consultations'
