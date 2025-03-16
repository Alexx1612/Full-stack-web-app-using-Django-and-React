import React, { useState } from "react";
import "../styles/Doctors.css";

function Doctor({ doctor, onDelete, onEdit }) {
    return (
        <div className="doctor-container">
            <p className="doctor-info">
                Dr. {doctor.first_name_d} {doctor.last_name_d} with {doctor.experience} years of experience
            </p>
            <p>Specialization: {doctor.specialization}</p>
            <button className="delete-doctor" onClick={() => onDelete(doctor.id)}>
                Delete
            </button>
            <button className="edit-doctor" onClick={() => onEdit(doctor)}>
                Update
            </button>
        </div>
    );
}

export default Doctor;
