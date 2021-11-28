//class describing Pizza menu oject
class PizzaMenu {

    //Pizza types are stored in map object, where id from json is key
    PizzaMenuItems = new Map();

    constructor(data) {
        console.log("PizzaMenu - Constructor : START");

        data.forEach(item => {

            //Flag reporting issues with menu items
            let invalidItem = false;

            //Comments for adding menu on site
            let invalidId = " - ";
            let invalidTitle = " - ";
            let invalidPrice = " - ";
            let invalidImage = " - ";
            let InvalidIngredients = " - ";

            //check if item from json menu have id
            if (item.id === undefined || item.id === null || item.id == "") {
                invalidItem = true;
                invalidId = " - Id is undefined or do not have value: ";
            }

            //check if that id is not already assigned to other position
            else if (this.PizzaMenuItems.has(item.id)) {
                invalidItem = true;
                invalidId = " - Id duplicates other id in menu: ";
            }

            //check if pizza has name
            if (item.title === undefined || item.title === null || item.title == "") {
                invalidItem = true;
                invalidTitle = " - Title is undefined or do not have value: ";
            }

            //check if pizza has picture, if no then report this but still add this position to menu
            if (item.image === undefined || item.image === null || item.image == "") {
                invalidImage = " - Picture is undefined or do not have value:  " + item.image;
                item.image = "";
            }

            //if pizza has picture then just copy its adress to comment param in case if something more would be not ok with other data of this postion
            else {
                invalidImage = invalidImage + item.image;
            }

            //CHeck if pizza has a price or the price is not zero
            if (item.price === undefined || item.price === null || item.price == "" || item.price == 0) {
                invalidItem = true;
                invalidPrice = " - Price is undefined or do not have value: ";
            }

            //check if pizz has ingidients
            if (item.ingredients === undefined || item.ingredients === null || item.ingredients.length == 0) {
                invalidItem = true;
                InvalidIngredients = " - Ingredients are undefined or do not have value: ";
            }
            else {
                //item.ingredients = String(item.ingredients).replaceAll(",", ", ");
                //item.ingredients = item.ingredients.replaceAll("  ", " ");
                const regex = /(,(?=\S))/ig;
                item.ingredients = String(item.ingredients).replaceAll(regex, ", ");
                console.log(item.ingredients);
            }

            //if something important is missing (id, price, ingredients) or pizza has duplicated id, then do not add it on menu
            if (invalidItem) {
                console.log("PizzaMenu - Constructor : Invalid item not added to menu:");
                console.log(invalidId + item.id);
                console.log(invalidTitle + item.title);
                console.log(invalidPrice + item.price);
                console.log(invalidImage + item.image);
                console.log(InvalidIngredients + item.ingredients);
                console.log("");
                return;
            }

            //if there is no problem with position of menu, then add it to Menu that will be displayed on site
            this.PizzaMenuItems.set(item.id, item);
        });

        console.log("PizzaMenu - Constructor : Loaded " + this.PizzaMenuItems.size + " menu items");
        console.log("PizzaMenu - Constructor : END");
    }

    //function that displays menu on site
    showMenuOnSite() {
        console.log("PizzaMenu: showMenuOnSite START");

        //Get site element (with specific id) in which Pizza Menu should be showed
        let menuDiv = document.getElementById(getMenuId());

        let ul = document.createElement('ul');

        //for every pizza in pizza menu object
        this.PizzaMenuItems.forEach(item => {

            let li = document.createElement('li');

            //add pizza image
            let div1 = document.createElement('div');
            div1.className = "li_img";
            div1.appendChild(addPizzaPicture(item.image, "Zdjęcie pizza " + item.title));

            let div2 = document.createElement('div');
            div2.className = "li_text";

            //add pizza name
            let div2_h3 = document.createElement('h3');
            div2_h3.innerHTML = item.id + ". " + item.title;
            div2_h3.id = item.id;

            //add pizza ingredients
            let div2_p = document.createElement('p');
            div2_p.className = "li_ingredients";
            div2_p.innerHTML = item.ingredients;

            //add pizza price
            let div3 = document.createElement('div');
            div3.className = "li_price";
            div3.innerHTML = item.price.toFixed(2) + " zł";

            //add button
            let div4 = document.createElement('div');
            div4.className = "li_buy";

            //add order button and set specific id to it
            let btn = document.createElement("button");
            btn.className = "li_button";
            btn.id = setPizzaMenuId(item.id);
            btn.innerHTML = "Zamów";

            //add listinig function for adding pizza to cart
            btn.addEventListener("click", function () { CartObject.addItemToCart(btn.id) }, false);

            li.appendChild(div1);
            div2.appendChild(div2_h3);
            div2.appendChild(div2_p);
            li.appendChild(div2);
            li.appendChild(div3);
            div4.appendChild(btn);
            li.appendChild(div4);

            ul.appendChild(li);

        });
        menuDiv.appendChild(ul);
        console.log("PizzaMenu: showMenuOnSite END");
    }

    getPizzaMenuItem(id) {
        return this.PizzaMenuItems.get(id);
    }

}