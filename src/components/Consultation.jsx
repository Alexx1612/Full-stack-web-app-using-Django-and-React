import React, { useState } from "react";

function Consultation({ consultation, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedDate, setUpdatedDate] = useState(consultation.consultation_date);
    const [updatedDuration, setUpdatedDuration] = useState(consultation.duration);
    const [updatedCost, setUpdatedCost] = useState(consultation.cost);

    const handleUpdate = () => {
        onUpdate(consultation.id, {
            consultation_date: updatedDate,
            duration: updatedDuration,
            cost: updatedCost,
        });
        setIsEditing(false);
    };

    const formattedConsultationDate = new Date(consultation.consultation_date).toLocaleDateString();
    const formattedCreatedAt = new Date(consultation.created_at).toLocaleString();

    const doctorName = consultation.doctor
        ? `Dr. ${consultation.doctor.first_name_d} ${consultation.doctor.last_name_d}`
        : "Unknown Doctor";
    const animalName = consultation.animal?.name || "Unknown Animal";

    return (
        <div className="consultation-container">
            {!isEditing ? (
                <>
                    <p className="consultation-info">
                      Consultation with ID: {consultation.id} (created at: {formattedCreatedAt})
                    </p>
                    <p>Consultation date: {formattedConsultationDate}</p>
                    <p>Cost: ${consultation.cost} | Duration: {consultation.duration} minutes</p>

                    <button className="delete-consultation" onClick={() => onDelete(consultation.id)}>
                        Delete
                    </button>
                    <button className="update-consultation" onClick={() => setIsEditing(true)}>
                        Update
                    </button>
                </>
            ) : (
                <div className="consultation-edit-form">
                    <label>
                        Date:
                        <input
                            type="date"
                            value={updatedDate.split("T")[0]} // Ensure format is YYYY-MM-DD
                            onChange={(e) => setUpdatedDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Duration (minutes):
                        <input
                            type="number"
                            value={updatedDuration}
                            onChange={(e) => setUpdatedDuration(e.target.value)}
                        />
                    </label>
                    <label>
                        Cost ($):
                        <input
                            type="number"
                            value={updatedCost}
                            onChange={(e) => setUpdatedCost(e.target.value)}
                        />
                    </label>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Consultation;
