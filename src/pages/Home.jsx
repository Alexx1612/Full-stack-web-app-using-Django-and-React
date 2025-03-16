import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <div className="main-content">
                <div className="welcome-section">
                    <h1>Welcome to Our Clinic Management System</h1>
                    <p>
                        Easily manage consultations and doctors with our user-friendly interface. 
                        Use the navigation bar above to explore different sections.
                    </p>
                    <p>
                        Whether you need to add new consultations, manage existing ones, or
                        update doctor information, we have you covered!
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
