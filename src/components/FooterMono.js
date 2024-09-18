import React from "react";
import { Link } from "react-router-dom";

export const FooterMono = () => {

    const year = new Date().getFullYear();
    return (
        <table>
            <tbody>
                <tr>
                    <td colSpan={4}>
                    <p className="resources"><Link to={`/resources`}>Community Resources</Link></p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>About Us</p>
                    </td>
                    <td>
                        <p>Contact</p>
                    </td>
                    <td>
                        <p>Terms of Use</p>
                    </td>
                    <td>
                        <p>Careers</p>
                    </td>
                </tr>
                <tr className="social-row">
                    <td>
                    <img className="social-image" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="Built with GitHub"/>
                    </td>
                    <td>
                    <img className="social-image" src="https://imgs.search.brave.com/qLLHz0l2FYTQ-WrBnQBJ3VLwVvoLxhz0eR1cwkz5o6k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzUxL0ZhY2Vib29r/X2ZfbG9nb18oMjAx/OSkuc3Zn.svg" alt="Connect with us on Facebook" />
                    </td>
                    <td>
                    <img className="social-image" src="https://imgs.search.brave.com/6EgyLmzbyfJkgTFi9JZF5IMoROjA_-_7nrdEXnEj3-4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9l/L2U3L0luc3RhZ3Jh/bV9sb2dvXzIwMTYu/c3Zn.svg" alt="Follow us on Instagram"/>
                    </td>
                    <td>
                        <p>Copyright, {year}</p>
                    </td>
                </tr>
            </tbody>
        </table>
        // <div className="footer-container">
        //     <hr></hr>
        //     <ul className="footer-links-container">
        //         <li className="footer-links">About Us</li>
        //         <li className="footer-links">Contact</li>
        //         <li className="footer-links">Terms of Use</li>
        //         <li className="footer-links">Careers</li>
        //     </ul>
        //        <div className="social-links">
        //         <img className="social-image" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="Built with GitHub"/>
        //         <img className="social-image" src="https://imgs.search.brave.com/qLLHz0l2FYTQ-WrBnQBJ3VLwVvoLxhz0eR1cwkz5o6k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzUxL0ZhY2Vib29r/X2ZfbG9nb18oMjAx/OSkuc3Zn.svg" alt="Connect with us on Facebook" />
        //         <img className="social-image" src="https://imgs.search.brave.com/6EgyLmzbyfJkgTFi9JZF5IMoROjA_-_7nrdEXnEj3-4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9l/L2U3L0luc3RhZ3Jh/bV9sb2dvXzIwMTYu/c3Zn.svg" alt="Follow us on Instagram"/>
        //     </div>
        //     <p className="copyright-link">Copyright, {year}</p>
        // </div>
    );
};