//Function fetching json file with menu
async function getPizzaMenu(url) {

    console.log("getPizzaMenu START");

    return fetch(url)
        .then(response => {
            const contentType = response.headers.get('content-type');
            //If no content then throw error
            if (!contentType) {
                throw new TypeError("No data");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log("getPizzaMenu END OK");
            return data;
        })
        .catch(error => {
            console.error(error)
            return null;
        });
}

//Function returning adress to JSON file (configuration)
function getJSONwithMenu() {
    return ("https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json");
}

//Function with name that will be added to Id of pizza. PizzaId + id from json shall be id of button for adding pizzas
function getPizzaMenuId() {
    return "PizzaId";
}

//Function creating new id for ordering buttons
function setPizzaMenuId(id) {
    return getPizzaMenuId() + id;
}

//Function extracting json id of pizza from id of buttons
function extractPizzaMenuId(id) {
    return id.replace(getPizzaMenuId(), "");
}

//Function with name that will be added to Id of pizza. PizzaId + id from json shall be id of button for adding pizzas
function getCartPizzaId() {
    return "CartPizzaId";
}

//Function creating new id for ordering buttons
function setCartPizzaId(id) {
    return getCartPizzaId() + id;
}

//Function extracting json id of pizza from id of buttons
function extractCartId(id) {
    return id.replace(getCartPizzaId(), "");
}

//Id of menu element
function getMenuId() {
    return "menu";
}

//Id of cart element
function getCartId() {
    return "cart";
}

//Function adding Floats returning result with 2 decimals places 
function addFloats(x, y) {
    return ((Math.round(100 * x + 100 * y)) / 100);
}

//Function multiplying Floats returning result with 2 decimals places 
function multiplyFloats(x, y) {
    return ((Math.round(100 * x * 100 * y)) / 10000);
}

///function that add picture with specific params
function addPizzaPicture(src, alt) {
    let img = document.createElement("img");
    img.src = src;
    img.alt = alt;

    return img;
}

///function that remove nodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}