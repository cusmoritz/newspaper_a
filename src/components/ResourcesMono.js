import React, { useEffect } from "react";
import { fetchFrontEndResources } from "../api";
import { useState } from "react";

export const ResourcesMono = () => {

    const [allResources, setAllResources] = useState([]);

    const fetchAllResources = async () => {
        const resources = await fetchFrontEndResources();
        if (resources) {
            setAllResources(resources);
        }
    }

    const loadPage = () => {
        fetchAllResources();
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <>
        <h1>Community Resources</h1>
        <table>
            <tbody>
                <th></th>
                {/* <tr>
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
                </tr> */}
            </tbody>
        </table>
        </>
        
    );
};