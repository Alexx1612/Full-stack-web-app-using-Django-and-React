import React, { useState, useEffect } from "react";
import api from "../api";
import Doctor from "../components/Doctor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Doctors.css";

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [first_name_d, setFirstNameD] = useState("");
    const [last_name_d, setLastNameD] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State for updating a doctor
    const [isEditing, setIsEditing] = useState(false);
    const [doctorToEdit, setDoctorToEdit] = useState(null);

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = () => {
        api.get("/api/doctors/")
            .then((res) => res.data)
            .then((data) => setDoctors(data))
            .catch((err) => alert(err));
    };

    const deleteDoctor = (id) => {
        api.delete(`/api/doctors/delete/${id}/`)
            .then(() => {
                alert("Doctor deleted!");
                getDoctors();
            })
            .catch((error) => alert(error));
    };

    const createDoctor = (e) => {
        e.preventDefault();
        api.post("/api/doctors/", { first_name_d, last_name_d, specialization, experience, username, email, password })
            .then(() => {
                alert("Doctor created!");
                getDoctors();
                clearForm();
            })
            .catch((err) => alert(err));
    };

    const updateDoctor = (e) => {
        e.preventDefault();
        api.put(`/api/doctors/update/${doctorToEdit.id}/`, { first_name_d, last_name_d, specialization, experience })
            .then(() => {
                alert("Doctor updated!");
                getDoctors();
                clearForm();
                setIsEditing(false);
            })
            .catch((err) => alert(err));
    };

    const handleEditClick = (doctor) => {
        setIsEditing(true);
        setDoctorToEdit(doctor);
        setFirstNameD(doctor.first_name_d);
        setLastNameD(doctor.last_name_d);
        setSpecialization(doctor.specialization);
        setExperience(doctor.experience);
    };

    const clearForm = () => {
        setFirstNameD("");
        setLastNameD("");
        setSpecialization("");
        setExperience("");
        setUsername("");
        setEmail("");
        setPassword("");
        setDoctorToEdit(null);
    };

    return (
        <div className="home-page">
            <Navbar />
            <div className="main-content">
                {/* Doctors List */}
                <div className="doctors-list">
                    <h2>Doctors</h2>
                    {doctors.map((doctor) => (
                        <Doctor
                            doctor={doctor}
                            onDelete={deleteDoctor}
                            onEdit={handleEditClick}
                            key={doctor.id}
                        />
                    ))}
                </div>

                {/* Create Doctor Form */}
                <div className="submit-doctor">
                    <h2>Create a Doctor</h2>
                    <form onSubmit={createDoctor}>
                        <label htmlFor="first_name_d">First Name:</label>
                        <input
                            type="text"
                            id="first_name_d"
                            required
                            value={first_name_d}
                            onChange={(e) => setFirstNameD(e.target.value)}
                        />

                        <label htmlFor="last_name_d">Last Name:</label>
                        <input
                            type="text"
                            id="last_name_d"
                            required
                            value={last_name_d}
                            onChange={(e) => setLastNameD(e.target.value)}
                        />

                        <label htmlFor="specialization">Specialization:</label>
                        <input
                            type="text"
                            id="specialization"
                            required
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                        />

                        <label htmlFor="experience">Experience:</label>
                        <input
                            type="number"
                            id="experience"
                            required
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        />

                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit">Create Doctor</button>
                    </form>
                </div>

                {/* Update Doctor Form */}
                {isEditing && (
                    <div className="submit-doctor">
                        <h2>Update Doctor</h2>
                        <form onSubmit={updateDoctor}>
                            <label htmlFor="first_name_d">First Name:</label>
                            <input
                                type="text"
                                id="first_name_d"
                                required
                                value={first_name_d}
                                onChange={(e) => setFirstNameD(e.target.value)}
                            />

                            <label htmlFor="last_name_d">Last Name:</label>
                            <input
                                type="text"
                                id="last_name_d"
                                required
                                value={last_name_d}
                                onChange={(e) => setLastNameD(e.target.value)}
                            />

                            <label htmlFor="specialization">Specialization:</label>
                            <input
                                type="text"
                                id="specialization"
                                required
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                            />

                            <label htmlFor="experience">Experience:</label>
                            <input
                                type="number"
                                id="experience"
                                required
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />

                            <button type="submit">Update Doctor</button>
                            <button type="button" onClick={() => { setIsEditing(false); clearForm(); }}>
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default DoctorsPage;
