import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/SimpleIntterogations.css";
import api from "../api"; // Ensure this is set up for your backend

function SimpleInterrogations() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [xAnimals, setXAnimals] = useState(""); // Added state for x_animals input

    const handleQuery = (queryId) => {
        setLoading(true);
        setError(null);
        setResult(null);

        let url = `/api/simple-query/${queryId}/`; // Default URL for other queries

        // If it's query 3 (Oldest "x" animals), add the x_animals parameter
        if (queryId === 3 && xAnimals) {
            url += `?x=${xAnimals}`;
        }

        // Make an API call based on the query ID
        api.get(url)
            .then((response) => setResult(response.data))
            .catch((err) => setError(`Error fetching query result: ${err.message}`))
            .finally(() => setLoading(false));
    };

    return (
        <div className="simple-interrogations">
            <Navbar />
            <div className="simple-interrogations-container">
                <div className="results-box">
                    {result ? (
                        <pre>{JSON.stringify(result, null,1)}</pre> // Preformatted for JSON readability
                    ) : (
                        <p>Select a query to view the results.</p>
                    )}
                </div>
                <div className="button-container">
                    <button onClick={() => handleQuery(1)}>Owners and animals</button>
                    <button onClick={() => handleQuery(2)}>Consultations info</button>
                    <button onClick={() => handleQuery(3)}>Oldest "x" animals</button>
                    <input
                        type="number"
                        id="x_animals"
                        placeholder="Select x"
                        value={xAnimals}
                        onChange={(e) => setXAnimals(e.target.value)} 
                    />
                    <button onClick={() => handleQuery(4)}>Treatment for each animal</button>
                    <button onClick={() => handleQuery(5)}>All specializations</button>
                    <button onClick={() => handleQuery(6)}>Consulations for each doctor</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SimpleInterrogations;
