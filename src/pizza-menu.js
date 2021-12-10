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
            if (!item.title) {
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
            ul.appendChild(li);

            li.innerHTML = `<div class='li_img'><img src='${item.image}' alt='Zdjęcie pizza ${item.title}'></div><div class='li_text'><h3 id='${item.id}'>${item.id}. ${item.title}</h3><p class='li_ingredients'>${item.ingredients}</p></div><div class='li_price'>${item.price.toFixed(2)} zł</div><div class='li_buy'><button class='li_button' id='${setPizzaMenuId(item.id)}'>Zamów</button></div>`;

        });
        menuDiv.appendChild(ul);

        const btns = document.querySelectorAll('.li_button');

        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function (e) { CartObject.addItemToCart(btns[i].id) }, false);
        }

        console.log("PizzaMenu: showMenuOnSite END");
    }

    getPizzaMenuItem(id) {
        return this.PizzaMenuItems.get(id);
    }

}