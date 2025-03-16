from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ConsultationSerializer, DoctorSerializer , AnimalSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Consultation, Doctor, Animal , Owner

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection

from .serializers import AnimalSerializer, OwnerSerializer

class AnimalListUpdateView(generics.ListAPIView, generics.UpdateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class OwnerListUpdateView(generics.ListAPIView, generics.UpdateAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
###

class DoctorListCreate(generics.ListCreateAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Doctor.objects.filter(username=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(username=self.request.user)
        else:
            print(serializer.errors)

class DoctorDelete(generics.DestroyAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Doctor.objects.filter(username=user)
    

###
    
class ConsultationListCreate(generics.ListCreateAPIView):
    serializer_class = ConsultationSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        return Consultation.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class ConsultationDelete(generics.DestroyAPIView):
    serializer_class = ConsultationSerializer
    permission_classes = [IsAuthenticated]  

    def get_queryset(self):
        return Consultation.objects.all()
    
class ConsultationUpdate(generics.UpdateAPIView):
    def get_queryset(self):
        return Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = [IsAuthenticated]

###

# User Registration View
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



class SimpleQueryView(APIView):
    def get(self, request, query_id):
        x = request.query_params.get('x')  # Get the 'x' parameter if present
        queries = {
        1: """SELECT CONCAT(o.First_Name, ' ', o.Last_Name, ' owns ', a.Name_A)
           FROM Animal a 
           JOIN Owner o ON a.Owner_Id = o.Owner_Id;""",
    
        2: """SELECT CONCAT(d.First_Name_D, ' ', d.Last_Name_D, ' will consult ', a.Name_A, ' on ', c.Consultation_Date)
           FROM Consultation c
           JOIN Animal a ON c.Animal_Id = a.Animal_Id
           JOIN Doctor d ON c.Doctor_Id = d.Doctor_Id;""",
    
        3: f"""SELECT CONCAT(Name_A, ' is ', Age, ' years old')
           FROM Animal 
           ORDER BY Age DESC 
           LIMIT {x};""",  # If x is provided, limit the query
    
        4: """SELECT CONCAT(a.Name_A,' has ' ,d.Name_B,'.    Treatment: ',t.Name_T)
            FROM Animal a
            JOIN Diagnosis diag ON a.Animal_Id = diag.Animal_Id
            JOIN Disease d ON diag.Disease_Id = d.Disease_Id
            JOIN Treatment t ON diag.Treatment_Id = t.Treatment_Id;""",
    
        5: """SELECT DISTINCT  Doctor.Specialization
            FROM Doctor;""",

        6: """SELECT CONCAT(d.First_Name_D, ' (', d.Specialization, ')', ' has ', COUNT(c.Consultation_Id), 
            CASE WHEN COUNT(c.Consultation_Id) = 1 THEN ' consultation' ELSE ' consultations' END)
            FROM Doctor d
            JOIN Consultation c ON d.Doctor_Id = c.Doctor_Id
            GROUP BY d.First_Name_D, d.Specialization;"""
        }

        query = queries.get(query_id)
        if not query:
            return Response({"error": "Invalid query ID"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

        return Response(rows)


class ComplexQueryView(APIView):
    def get(self, request, query_id):
        y = request.query_params.get('y', None)  # Default to None if y is not provided
        
        queries = {
            1: """SELECT CONCAT(a.Name_A, ' (owner: ', o.First_Name, ' ', o.Last_Name, ') suffers of: ', d.Name_B)
                   FROM Animal a
                   JOIN Owner o ON a.Owner_Id = o.Owner_Id
                   JOIN Diagnosis diag ON a.Animal_Id = diag.Animal_Id
                   JOIN Disease d ON diag.Disease_Id = d.Disease_Id
                   WHERE d.Risk_Level = 'High';""",     
2: """
    SELECT CONCAT(a.Name_A, ' (', a.Breed, ') has ', COUNT(c.Consultation_Id), ' consultations. ',
                'Total consultation cost: ', SUM(c.Cost), ' RON. ',
                'Owner: ', o.First_Name, ' ', o.Last_Name, '.')
    FROM Animal a
    JOIN Consultation c ON a.Animal_Id = c.Animal_Id
    JOIN Owner o ON a.Owner_Id = o.Owner_Id
    GROUP BY a.Animal_Id, o.Owner_Id
    ORDER BY SUM(c.Cost) DESC;
""",
            3: """SELECT CONCAT(a.Name_A, ' will be treated for ', t.Name_T, '. Estimated cost: ', t.Estimated_Cost)
                   FROM Animal a
                   JOIN Diagnosis diag ON a.Animal_Id = diag.Animal_Id
                   JOIN Treatment t ON diag.Treatment_Id = t.Treatment_Id
                   WHERE a.Age > (SELECT AVG(Age) FROM Animal);""",
            
4: f"""
    SELECT CONCAT(a.Name_A, ' will be consulted on ', c.Consultation_Date, ' with the cost of: ', c.Cost, ' RON. ',
                'The average cost for consultations of ', a.Name_A, ' is: ', 
                (SELECT AVG(c2.Cost) 
                 FROM Consultation c2 
                 WHERE c2.Animal_Id = a.Animal_Id), ' RON.') AS Consultation_Details
    FROM Animal a
    JOIN Consultation c ON a.Animal_Id = c.Animal_Id
    ORDER BY c.Cost DESC
    LIMIT {y};
"""
        }

        query = queries.get(query_id)
        if not query:
            return Response({"error": "Invalid query ID"}, status=400)

        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

        return Response(rows)
