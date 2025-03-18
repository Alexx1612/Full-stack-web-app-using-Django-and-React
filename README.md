# Veterinary Clinic Management System
Track medical history, manage consultations, and streamline veterinary workflows
![Screenshot 2025-03-16 120101](https://github.com/user-attachments/assets/b670569f-397e-4d81-964b-6388d1b7cfc4)


🛠️ Technologies
 - Backend : Django, PostgreSQL
 - Frontend : React
 - Database Design : Entity-Relationship Model

🚀 Key Features
 - Patient Management :
   - Track animals, owners, medical history, and treatments.
 - Consultations :
   - Schedule appointments with doctors and view cost details.
  - Advanced Queries :
    - Filter animals by age, list high-risk diseases, and generate cost summaries.
   
📝 Architecture
 - Database Relationships :
   - Owner ↔ Animal (1:N)
   - Animal ↔ Doctor (N:N via Consultation)
   - Animal ↔ Disease (N:N via Diagnosis)
   - Animal ↔ Treatment (N:N via Diagnosis)

![Database_Diagram](https://github.com/user-attachments/assets/62a5833f-2029-402d-9c9b-d773cc462b65)
