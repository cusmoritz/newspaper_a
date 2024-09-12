import React from "react";
import { fetchFrontPageCatsSubcats } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const NavBarMono = () => {
    
    const [categories, setCategories] = useState([]);

    const loadPage = async () => {
        const allCategories = await fetchFrontPageCatsSubcats();
        if (allCategories) {
            //console.log('all cats', allCategories)
            setCategories(allCategories);
        }
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <nav className="">
            <Link to="/"><div className="grid">HOME</div></Link>
        <table>
            <tbody>
            <tr>
        {!categories ? null : categories.map((mainCat) => {
            return (
                // <div className="grid">
                // <details className="" key={mainCat.primary_category_id}>
                //     <summary value={mainCat.primary_category_id}>
                //     <Link to={`/${mainCat.primary_category_name.toLowerCase()}`}>
                //         {mainCat.primary_category_name}
                //     </Link>
                //     </summary>
                //     {mainCat.secondary.map((secondary) => {
                //         let adjustedParam = secondary.secondary_category_name.replace(" ","-").toLowerCase();
                //         return (
                //             <Link 
                //                 key={secondary.secondary_category_id} 
                //                 to={`/${mainCat.primary_category_name.toLowerCase()}/${adjustedParam}`}>
                //                 <p className="">{secondary.secondary_category_name}</p>
                //             </Link>
                            
                //         )
                //     })}
                // </details>
                // </div>

                

                <td>
                    <details>
                        <summary>
                            {mainCat.primary_category_name}
                        </summary>
                        {mainCat.secondary.map((secondary) => {
                        let adjustedParam = secondary.secondary_category_name.replace(" ","-").toLowerCase();
                        return (
                            <p><Link 
                                key={secondary.secondary_category_id} 
                                to={`/${mainCat.primary_category_name.toLowerCase()}/${adjustedParam}`}>
                                <p className="">{secondary.secondary_category_name}</p>
                            </Link></p>
                            
                        )
                    })}
                    </details>
                </td>

            //     <summary><Link to={`/${mainCat.primary_category_name.toLowerCase()}`}>
            //         <div className="" value={mainCat.primary_category_id}>{mainCat.primary_category_name}      
            //         </div>
            //     </Link>
            //     </summary>
            //     <details className="">
            //         {mainCat.secondary.map((secondary) => {
            //             let adjustedParam = secondary.secondary_category_name.replace(" ","-").toLowerCase();
            //             return (
            //                 <summary><Link 
            //                     key={secondary.secondary_category_id} 
            //                     to={`/${mainCat.primary_category_name.toLowerCase()}/${adjustedParam}`}>
            //                     <p 
            //                         className="">{secondary.secondary_category_name}</p>
            //                 </Link>
            //                 </summary>
            //             )
            //         })}
            //     </details>
            // </details>
            )
        })}
        </tr>
        </tbody>
        </table>      
        </nav>
    )
}