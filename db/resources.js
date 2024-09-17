// resource functions
const {client} = require('./index');


// ##################### ADMIN FUNCTIONS ####################
const createNewResource = async (resourceObj) => {
    try {
        const {rows: [resource]} = await client.query(`
        INSERT INTO resources (resource_url, resource_display_text, resource_category, resource_sub_category)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [resourceObj.url, resourceObj.display_text, resourceObj.category, resourceObj.subcategory])
        return resource;
    } catch (error) {
        console.log('there was a database error creating a new resource');
        throw error;
    }
};



const startingResources = [{
    url: "https://www.fcgov.com/elections/faq",
    display_text: "Fort Collins Government Voting FAQ",
    category: 1, // fort collins?,
    subcategory: 0
},
{
    url: "https://peak.my.site.com/peak/s/benefit-information/benefit-detail?language=en_US&category=food-assistance-programs",
    display_text: "Colorado Applications for SNAP (food assistance) and WIC",
    category: 2, // government ??
    subcategory: 0
},
{
    url: "https://www.cde.state.co.us/cdeboard/congressional_district_map",
    display_text: "Colorado State Government Website Regional Congressional District Map",
    category: 2, // government?
    subcategory: 0
},
{
    url: "https://doh.colorado.gov/housing-voucher-programs",
    display_text: "Colorado Housing Voucher FAQ",
    category: 2, // government?
    subcategory: 0
},
{
    url: "https://timnathpdco.justfoia.com/publicportal/home/newrequest",
    display_text: "Timnath, CO police records request form",
    category: 3, // public safety?
    subcategory: 0
},
// {
//     url: ,
//     display_text: ,
//     category: , // public safety?
//     subcategory: 
// }
];

console.log('resources all', startingResources)

const insertResources = async (array) => {
    array.forEach(resource => {
        console.log('resource', resource)
        createNewResource(resource);
    });
}

insertResources(startingResources);

module.exports = {
    createNewResource,


}