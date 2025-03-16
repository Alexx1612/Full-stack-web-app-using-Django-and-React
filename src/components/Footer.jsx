import React from "react";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">Cabinet Bingus</div>
                <div className="footer-contact">
                    <p><strong>Contact Us:</strong></p>
                    <p>Phone: 0696912345</p>
                    <p>Email: Bingus_ROcks@gmail.com</p>
                    <p>Address: Camin P16</p>
                </div>
                <div className="footer-socials">
                    <p><strong>Follow Us:</strong></p>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
