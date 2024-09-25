import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllResourcesAdmin } from "../../api";
import { EditResourceMono } from "./EditResourceMono";
import { CreateNewResourceMono } from "./CreateNewResourceMono";

export const AdminResourcesMono = () => {

    const [adminResources, setAdminResources] = useState([]);
    const [communityResources, setCommunityResources] = useState([]);
    const [editBool, setEditBool] = useState(false);
    const [editResource, setEditResource] = useState({});
    const [createNewBool, setCreateNewBool] = useState(false);

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

    const setEditingResource = (resource) => {
        if (resource) {
            if (editBool === true) {
                setEditBool(false);
            }
            setEditResource(resource)
            setEditBool(true)
        }
    }

    useEffect(() => {
        loadPage();
    }, [editBool])

return (
    <div>
        <h2>Resource management page</h2>
        {!editBool ? null : 
        <EditResourceMono resource={editResource} editResourceBool={editBool} setEditBool={setEditBool}/>
        }
        {!createNewBool ? <button onClick={() => setCreateNewBool(true)}>Create Resource</button> :
        <CreateNewResourceMono setCreateNewBool={setCreateNewBool}/>
        }
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
                                    <p><a href={resource.resource_url}>{resource.resource_display_text}</a> | Created on {resource.resource_create_date} </p>
                                    {resource.resource_most_updated_date ?
                                    <p>Most recently updated on {resource.resource_most_updated_date}</p>
                                    : null}
                                    <p>In the {resource.resource_name} category</p>
                                    <button onClick={() => setEditingResource(resource)}>
                                        <a href="#edit-resource">Edit</a>
                                    </button> &nbsp;
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
                                console.log('resource FE', resource)
                            return (
                                <div key={index}>
                                    <p><a href={resource.resource_url}>{resource.resource_display_text}</a></p>
                                    <p>Created on {resource.resource_create_date} </p>
                                    {resource.resource_most_updated_date ?
                                    <p>Most recently updated on {resource.resource_most_updated_date}</p>
                                    : null}
                                    <p>In the {resource.resource_name} category</p>
                                    <button onClick={() => setEditingResource(resource)}>
                                        <a href="#edit-resource">Edit</a>
                                    </button> &nbsp;
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