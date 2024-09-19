import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllResourcesAdmin } from "../../api";

export const AdminResourcesMono = () => {


    const loadPage = async () => {
        var allResources = await fetchAllResourcesAdmin();
        if (allResources) {
            console.log('all', allResources)
            var adminResources = [];
            var publicResources = [];
            for (let i = 0; i < allResources.length; i++) {

            }
        }
    };

    useEffect(() => {
        loadPage();
    }, [])

return (
    <div>
        This is the resource management page.
        <table>
            <tbody>
                <tr>
                    <td>
                        <details>
                            <summary>Admin / Reporter Assistant Resources</summary>
                        </details>
                    </td>
                </tr>
                <tr>
                    <td>
                        <details>
                            <summary>View / Edit Community Resources</summary>
                        </details>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);
};