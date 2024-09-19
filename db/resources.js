// resource functions
const {client} = require('./index');


// ##################### ADMIN FUNCTIONS ####################
const createNewResource = async (resourceObj) => {
    try {
        const {rows: [resource]} = await client.query(`
        INSERT INTO resources (resource_url, resource_display_text, resource_category, resource_sub_category, admin_bool)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, [resourceObj.url, resourceObj.display_text, resourceObj.category, resourceObj.subcategory, resourceObj.admin_bool]);
        //console.log('resource db', resource) // resource_id & resource_category

        let what = await updateCategoryWithResource(resource.resource_id, resource.resource_category);
        //console.log('what db', what);
        return resource;
    } catch (error) {
        console.log('there was a database error creating a new resource');
        throw error;
    }
};

const updateCategoryWithResource = async(resourceId, categoryId) => {
    try {
        const {rows: [updatedCategory]} = await client.query(`
        UPDATE resource_categories
        SET resource_associate_id = array_append(resource_associate_id, $1)
        WHERE resource_cat_id = $2
        RETURNING *
        ; 
        `, [resourceId, categoryId]);
        //console.log('updated category', updatedCategory);
        return updatedCategory;
    } catch (error) {
        console.log('there was a database error updating a category with a resource');
        throw error;
    }
};

const fetchAllAdminResources = async() => {
    try {
        const {rows: resources} = await client.query(`
        SELECT * FROM resources
        JOIN resource_categories ON resources.resource_category = resource_categories.resource_cat_id
        ;
        `, []);
        return resources;
    } catch (error) {
        console.log('there was a database error fetching all admin resources');
        throw error;
    }
}

const createNewResourceCategory = async(resourceObj) => {
    try {
        const {rows: [category]} = await client.query(`
        INSERT INTO resource_categories (resource_name)
        VALUES ($1)
        RETURNING *
        ;
        `,[resourceObj.resource_name]);
        return category;
    } catch (error) {
        console.log('there was a database error creating a new resource category');
        throw error;
    }
}







// ##################### FRONT END FUNCTION ######################


const fetchResourcesForCategory = async(categoryResourceArr) => {
    try {
        console.log('here', categoryResourceArr)
        let resources = [];

        if (categoryResourceArr != null) {
            for (let i = 0; i < categoryResourceArr.length; i++) {
                const {rows: [resource]} = await client.query(`
                SELECT * FROM resources
                WHERE resource_id = $1
                ;
                `,[categoryResourceArr[i]]);
                resources.push(resource);
            }
        }

        return resources;
    } catch (error) {
        console.log('there was a database error fetching resources for a category');
        throw error;
    }
}

const fetchAllResourceCategories = async() => {
    try {
        const {rows: categories} = await client.query(`
        SELECT * FROM resource_categories
        ORDER BY resource_cat_id
        ;
        `,[]);
        return categories;
    } catch (error) {
        console.log('there was a database error fetching resource categories');
        throw error;
    }
}

const fetchAllFrontEndResources = async () => {
    try {
        let categories = await fetchAllResourceCategories();
        
        // go get resources for category
        if (categories.length > 0) {
            for (let i = 0; i < categories.length; i++){
                let resource = await fetchResourcesForCategory(categories[i].resource_associate_id);
                categories[i].resources = resource;
            }
        }

        return categories; 
    } catch (error) {
        console.log('there was a database error fetching all resources');
        throw error;
    }
}


const startingResources = [{
    url: "https://www.fcgov.com/elections/faq",
    display_text: "Fort Collins Government Voting FAQ",
    category: 2, // voting
    subcategory: 2,
    admin_bool: false
},
{
    url: "https://peak.my.site.com/peak/s/benefit-information/benefit-detail?language=en_US&category=food-assistance-programs",
    display_text: "Colorado Applications for SNAP (food assistance) and WIC",
    category: 4, //food
    subcategory: 3,
    admin_bool: false
},
{
    url: "https://www.cde.state.co.us/cdeboard/congressional_district_map",
    display_text: "Colorado State Government Website Regional Congressional District Map",
    category: 5, // elected government
    subcategory: 4,
    admin_bool: false
},
{
    url: "https://doh.colorado.gov/housing-voucher-programs",
    display_text: "Colorado Housing Voucher FAQ",
    category: 1, // housing
    subcategory: 5,
    admin_bool: false
},
{
    url: "https://timnathpdco.justfoia.com/publicportal/home/newrequest",
    display_text: "Timnath, CO police records request form",
    category: 9, // internal use / public resource
    subcategory: 1,
    admin_bool: true
},
{
    url: "https://doh.colorado.gov/emergency-rental-assistance",
    display_text: "Colorado Debartment of Local Affairs emergency rental assistance FAQ",
    category: 1, //housing
    subcategory: 1,
    admin_bool: false
},
{
    url: "https://www.211colorado.org/#category",
    display_text: "2-1-1 Colorado, supplemental assistance program search",
    category: 6, //co - statewide
    subcategory: 3,
    admin_bool: false
},
{
    url: "https://www.211colorado.org/reports/",
    display_text: "2-1-1 Colorado reporting dashboard",
    category: 9,// internal / publicc use
    subcategory: 1,
    admin_bool: true
},
{
    url: "https://www.causeiq.com/organizations/teamsters-267,841096171/",
    display_text: "Fort Collins Teamsters 267 revenue, stats",
    category: 7,
    subcategory:7,
    admin_bool: true
},
{
    url: "https://www.cde.state.co.us/cdeadult",
    display_text: "Colorado Adult Education Initiative website",
    category: 8,
    subcategory: 3,
    admin_bool: false
}
// {
//     url: ,
//     display_text: ,
//     category: , // public safety?
//     subcategory: 
// }
];

const fakeResourceCategories = [
    {
        resource_name: "Housing"
    },
    {
        resource_name: "Voting"
    },
    {
        resource_name: "Criminal Justice"
    },
    {
        resource_name: "Food Assistance"
    },
    {
        resource_name: "Elected Government"
    },
    {
        resource_name: "CO - Statewide"
    },
    {
        resource_name: "Employment / Unionization"
    },
    {
        resource_name: "Education"
    },
    {
        resource_name: "Newspaper Internal Resources / Public Resources"
    }
];

const insertResources = async (array) => {
    array.forEach(resource => {
        //console.log('resource', resource)
        createNewResource(resource);
    });
}

const insertFakeResourceCats = async(array) => {
    array.forEach(category => {
        createNewResourceCategory(category);
    })
}

insertFakeResourceCats(fakeResourceCategories);
insertResources(startingResources);

module.exports = {
    createNewResource,
    fetchAllFrontEndResources,
    fetchAllAdminResources,


}