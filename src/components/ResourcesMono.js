import React, { useEffect } from "react";
import { fetchFrontEndResources } from "../api";
import { useState } from "react";

export const ResourcesMono = () => {

    const [allResources, setAllResources] = useState([]);

    const fetchAllResources = async () => {
        const resources = await fetchFrontEndResources();
        if (resources) {
            setAllResources(resources);
            console.log('resources', resources)
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
        <p>These resources are for everyone in the community.</p>
        <p>A lot of these resources are broken up by ... </p>
        <p>There are some involving food insecurity; conntacting your local senetors or congressman; housing assistance; and much else.</p>
        <p>If you know of a resource that would fit well here, please <a href="mailto:whatever@gmail.com">send us an email</a></p>
        <table>
            <tbody>
                {allResources == null ? null :
                allResources.map((resourceCat) => {
                    return (
                        <tr key={resourceCat.resource_cat_id}>
                            <td>
                            <details>
                                <summary>
                                    {resourceCat.resource_name}
                                </summary>
                                {resourceCat.resources == null ? null :
                                resourceCat.resources.map((resource) => {
                                    return (
                                        <p key={resource.resource_id}><a href={resource.resource_url}>{resource.resource_display_text}</a> | Last updated on {resource.resource_create_date}</p>
                                    )
                                })
                                }
                            </details>
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
        </>
        
    );
};