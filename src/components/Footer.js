import React from "react";

export const Footer = () => {
    return (
        <div className="footer-container">
            <hr></hr>
            <div>This is the footer</div>
            <p className="footer-links">About Us</p>
            <p className="footer-links">Contact</p>
            <p className="footer-links">Terms of Use</p>
            <p className="footer-links">Careers</p>
            
            <p className="copyright-link">Copyright Newspaper, {Date.now().getYear()}</p>
            <div className="social-links">
                <img className="social-image" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="Built with GitHub"/>
                <img className="social-image" src="https://imgs.search.brave.com/qLLHz0l2FYTQ-WrBnQBJ3VLwVvoLxhz0eR1cwkz5o6k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzUxL0ZhY2Vib29r/X2ZfbG9nb18oMjAx/OSkuc3Zn.svg" alt="Connect with us on Facebook" />
                <img className="social-image" src="https://imgs.search.brave.com/6EgyLmzbyfJkgTFi9JZF5IMoROjA_-_7nrdEXnEj3-4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9l/L2U3L0luc3RhZ3Jh/bV9sb2dvXzIwMTYu/c3Zn.svg" alt="Follow us on Instagram"/>
            </div>
        </div>
    );
};