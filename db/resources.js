// resource functions
const {client} = require('./index');


// ##################### ADMIN FUNCTIONS ####################
const createNewResource = async (resourceObj) => {
    try {
        const {rows: [resource]} = await client.query(`
        INSERT INTO resources (resource_url, resource_display_text, resource_category, resource_sub_category, admin_bool)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, [resourceObj.url, resourceObj.display_text, resourceObj.category, resourceObj.subcategory, resourceObj.admin_bool])
        return resource;
    } catch (error) {
        console.log('there was a database error creating a new resource');
        throw error;
    }
};







// ##################### FRONT END FUNCTION ######################
const fetchAllFrontEndResources = async () => {
    try {
        const {rows: resources} = await client.query(`
        SELECT * FROM resources
        ;
        `, []);
        return resources; 
    } catch (error) {
        console.log('there was a database error fetching all resources');
        throw error;
    }
}


const startingResources = [{
    url: "https://www.fcgov.com/elections/faq",
    display_text: "Fort Collins Government Voting FAQ",
    category: 1, // fort collins?,
    subcategory: 2,
    admin_bool: false
},
{
    url: "https://peak.my.site.com/peak/s/benefit-information/benefit-detail?language=en_US&category=food-assistance-programs",
    display_text: "Colorado Applications for SNAP (food assistance) and WIC",
    category: 2, // government ??
    subcategory: 3,
    admin_bool: false
},
{
    url: "https://www.cde.state.co.us/cdeboard/congressional_district_map",
    display_text: "Colorado State Government Website Regional Congressional District Map",
    category: 4, // government?
    subcategory: 4,
    admin_bool: false
},
{
    url: "https://doh.colorado.gov/housing-voucher-programs",
    display_text: "Colorado Housing Voucher FAQ",
    category: 2, // government?
    subcategory: 5,
    admin_bool: false
},
{
    url: "https://timnathpdco.justfoia.com/publicportal/home/newrequest",
    display_text: "Timnath, CO police records request form",
    category: 5, // public safety?
    subcategory: 1,
    admin_bool: true
},
{
    url: "https://doh.colorado.gov/emergency-rental-assistance",
    display_text: "Colorado Debartment of Local Affairs emergency rental assistance FAQ",
    category: 2,
    subcategory: 1,
    admin_bool: false
},
{
    url: "https://www.211colorado.org/#category",
    display_text: "2-1-1 Colorado, supplemental assistance program search",
    category: 3,
    subcategory: 3,
    admin_bool: false
},
{
    url: "https://www.211colorado.org/reports/",
    display_text: "2-1-1 Colorado reporting dashboard",
    category: 4,
    subcategory: 1,
    admin_bool: true
}
// {
//     url: ,
//     display_text: ,
//     category: , // public safety?
//     subcategory: 
// }
];

const insertResources = async (array) => {
    array.forEach(resource => {
        //console.log('resource', resource)
        createNewResource(resource);
    });
}

insertResources(startingResources);

module.exports = {
    createNewResource,
    fetchAllFrontEndResources,


}