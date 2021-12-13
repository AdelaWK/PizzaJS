'use strict';

let PizzaMenuObject;
let CartObject;

window.onload = async function () {

    //Fetching menu from json
    let jsonMenu = await getPizzaMenu(getJSONwithMenu());

    //If json with menu is not valid then inform usert than site is not available 
    if (jsonMenu === null) {
        console.log("Fail to load json menu file");

        let myNode = document.getElementById(getMenuId());
        myNode.innerHTML = "Na stronie wystąpiły problemy techniczne.<br/>Prosimy spróbować później."

        return;
    }

    //Create object with all pizzas
    PizzaMenuObject = new PizzaMenu(jsonMenu);
    PizzaMenuObject.sortPizzaMenuItems("name_asc");

    //write pizza menu on site
    PizzaMenuObject.showMenuOnSite();

    //create object with cart
    CartObject = new Cart();

    //read stored information about cart
    CartObject.readCartFromLocalStorage();

    //show cart on site
    CartObject.showCartOnSite();

};

