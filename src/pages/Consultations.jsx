import React, { useState, useEffect } from "react";
import api from "../api";
import Consultation from "../components/Consultation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Consultations.css";

function ConsultationsPage() {
    const [consultations, setConsultations] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [doctor, setDoctor] = useState("");
    const [animal, setAnimal] = useState("");
    const [consultation_date, setConsultation_date] = useState("");
    const [duration, setDuration] = useState("");
    const [cost, setCost] = useState("");

    // Fetch consultations, doctors, and animals when the component mounts
    useEffect(() => {
        getConsultations();
        getDoctors();
        getAnimals(); // Now the animals will be fetched successfully
    }, []);

    // Fetch consultations from the API
    const getConsultations = () => {
        api.get("/api/consultations/")
            .then((res) => res.data)
            .then((data) => setConsultations(data))
            .catch((err) => alert(err));
    };

    // Fetch doctors from the API
    const getDoctors = () => {
        api.get("/api/doctors/")
            .then((res) => res.data)
            .then((data) => setDoctors(data))
            .catch((err) => alert(err));
    };

    // Fetch animals from the API (now the endpoint works)
    const getAnimals = () => {
        api.get("/api/animals/") // The new endpoint for animals
            .then((res) => res.data)
            .then((data) => setAnimals(data))
            .catch((err) => alert(err));
    };

    // Delete a consultation
    const deleteConsultation = (id) => {
        api.delete(`/api/consultations/delete/${id}/`)
            .then(() => {
                alert("Consultation deleted!");
                getConsultations();
            })
            .catch((error) => alert(error));
    };

    // Create a consultation
    const createConsultation = (e) => {
        e.preventDefault();

        // Ensure all fields are passed correctly when submitting
        api.post("/api/consultations/", {
            doctor,
            animal,
            consultation_date,
            duration,
            cost,
            created_at: new Date().toISOString(), // Add created_at field
        })
            .then((res) => {
                alert("Consultation created!");
                getConsultations();
            })
            .catch((err) => alert(err));
    };


    const updateConsultation = (id, updatedData) => {
        api.put(`/api/consultations/update/${id}/`, updatedData)
            .then(() => {
                alert("Consultation updated!");
                getConsultations();
            })
           // .catch((error) => alert(error));
    };

    return (
        <div className="consultations-page">
            <Navbar />
            <div className="main-content">
                <div className="consultations-list">
                    <h2>Consultations</h2>
                    {consultations.map((consultation) => (
                        <Consultation
                            consultation={consultation}
                            onDelete={deleteConsultation}
                            onUpdate={updateConsultation}
                            key={consultation.id}
                        />
                    ))}
                </div>

                {/* Submit Consultation Form */}
                <div className="submit-consultation">
                    <h2>Create a Consultation</h2>
                    <form onSubmit={createConsultation}>
                        <label htmlFor="doctor">Doctor:</label>
                        <select
                            id="doctor"
                            required
                            value={doctor}
                            onChange={(e) => setDoctor(parseInt(e.target.value))}
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map((doc) => (
                                <option key={doc.id} value={doc.id}>
                                    Dr. {doc.first_name_d} {doc.last_name_d}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="animal">Animal:</label>
                        <select
                            id="animal"
                            required
                            value={animal}
                            onChange={(e) => setAnimal(parseInt(e.target.value))}
                        >
                            <option value="">Select Animal</option>
                            {animals.map((ani) => (
                                <option key={ani.id} value={ani.id}>
                                    {ani.name} {/* Assuming `name` is the animal's name */}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="consultation_date">Date:</label>
                        <input
                            type="text"
                            id="consultation_date"
                            required
                            value={consultation_date}
                            onChange={(e) => setConsultation_date(e.target.value)}
                            placeholder="YYYY-MM-DD"
                            pattern="\d{4}-\d{2}-\d{2}"
                            title="Date format: YYYY-MM-DD"
                        />

                        <label htmlFor="duration">Duration:</label>
                        <input
                            type="number"
                            id="duration"
                            required
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />

                        <label htmlFor="cost">Cost:</label>
                        <input
                            type="number"
                            id="cost"
                            required
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />

                        <button type="submit">Create Consultation</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ConsultationsPage;
