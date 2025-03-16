import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ComplexIntterogations.css";
import api from "../api"; 

function ComplexInterrogations() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [yAnimals, setYAnimals] = useState(""); // Added state for x_animals input

    const handleQuery = (queryId) => {
        setLoading(true);
        setError(null);
        setResult(null);

        let url = `/api/complex-query/${queryId}/`;

        if (queryId === 4 && yAnimals) {
            url += `?y=${yAnimals}`;
        }

        // Make an API call based on the query ID
        api.get(url)
            .then((response) => setResult(response.data))
            .catch((err) => setError(`Error fetching query result: ${err.message}`))
            .finally(() => setLoading(false));
    };

    return (
        <div className="complex-interrogations">
            <Navbar />
            <div className="complex-interrogations-container">
                <div className="results-box">
                    {result ? (
                        <pre>{JSON.stringify(result, null, 2)}</pre> 
                    ) : (
                        <p>Select a query to view the results.</p>
                    )}
                </div>
                <div className="button-container">
                    <button onClick={() => handleQuery(1)}>High risk diseases</button>
                    <button onClick={() => handleQuery(2)}>Number of consulations( per animal )</button>
                    <button onClick={() => handleQuery(3)}>Cost estimation</button>
                    <button onClick={() => handleQuery(4)}>Most "y" expensive consultations(and average)</button>
                    <input
                        type="number"
                        id="y_animals"
                        placeholder="Select Y"
                        value={yAnimals}
                        onChange={(e) => setYAnimals(e.target.value)} 
                    />
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
            <Footer />
        </div>
    );
}

export default ComplexInterrogations;
