import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllResourcesAdmin } from "../../api";

export const AdminResourcesMono = () => {

    const [adminResources, setAdminResources] = useState([]);
    const [communityResources, setCommunityResources] = useState([]);

    const loadPage = async () => {
        var allResources = await fetchAllResourcesAdmin();
        if (allResources) {
            //console.log('all', allResources)
            var adminResources = [];
            var publicResources = [];
            for (let i = 0; i < allResources.length; i++) {
                if (allResources[i].admin_bool === true) {
                    adminResources.push(allResources[i]);
                } else {
                    publicResources.push(allResources[i]);
                }
            }
            setAdminResources(adminResources);
            setCommunityResources(publicResources);
        }
    };

    useEffect(() => {
        loadPage();
    }, [])

return (
    <div>
        <h2>Resource management page</h2>
        <table>
            <tbody>
                <tr>
                    <td>
                    <details>
                        <summary>Admin / Reporter Assistant Resources</summary>
                        {!adminResources ? null :
                        adminResources.map((resource, index) => {
                            return (
                                <div key={index}>
                                    <p><a href={resource.resource_url}>{resource.resource_display_text}</a> | {resource.resource_create_date} </p>
                                    <p>{resource.resource_category_name}</p>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                    {adminResources.length - 1 == index
                                    ? <p></p> 
                                    : <hr></hr>}
                                </div>
                            )})}
                    </details>
                    </td>
                </tr>
                <tr>
                    <td>
                        <details>
                            <summary>View / Edit Community Resources</summary>
                            {!communityResources ? null :
                            communityResources.map((resource, index) => {
                            return (
                                <div key={index}>
                                    <p><a href={resource.resource_url}>{resource.resource_display_text}</a> | {resource.resource_create_date} </p>
                                    <p>{resource.resource_category_name}</p>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                    {communityResources.length - 1 == index
                                    ? <p></p> 
                                    : <hr></hr>}
                                </div>
                            )})}
                        </details>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);
};