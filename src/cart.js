//class describing Cart oject
class Cart {

    //map to store ordered pizzas
    CartItems = new Map();

    //Price Summary 
    PriceSummary = 0.00;

    constructor() {


    }
    //Function for showing cart on site
    showCartOnSite() {
        console.log("Cart: showCartOnSite START");

        //Get site element (with specific id) in which Cart should be showed
        let cartNode = document.getElementById(getCartId());
        removeAllChildNodes(cartNode);

        //If cart is empty show messege
        if (this.CartItems.size == 0) {
            console.log("Cart: showCartOnSite Cart is empty");
            let h2 = document.createElement('h2');
            h2.innerHTML = "Głodny?<br />Zamów naszą pizzę!";
            cartNode.appendChild(h2)
        }

        //if cart is not empty...
        else {
            console.log("Cart: showCartOnSite Cart has " + this.CartItems.size + " positions");

            let ul = document.createElement('ul');

            //For every pizza type in cart, show pizza name, quantity and price summary for that pizza type 
            this.CartItems.forEach(item => {
                let li = document.createElement('li');
                let div1 = document.createElement('div');
                let div2 = document.createElement('div');
                let div3 = document.createElement('div');
                let div4 = document.createElement('div');
                div1.className = "cart_text";
                div2.className = "cart_quantity";
                div3.className = "cart_price";
                div4.className = "cart_delete";

                let btn = document.createElement("button");
                btn.className = "cart_button";
                btn.id = setCartPizzaId(item.id);
                btn.innerHTML = "usuń";

                //add listinig function for removing
                btn.addEventListener("click", function () { CartObject.removeItemFromCart(btn.id) }, false);

                div1.innerHTML = item.title;
                div2.innerHTML = item.quantity + " x";
                div3.innerHTML = item.positionPrice.toFixed(2) + " zł  ";
                li.appendChild(div1);
                li.appendChild(div2);
                li.appendChild(div3);
                div4.appendChild(btn);
                li.appendChild(div4);
                ul.appendChild(li);

            });
            cartNode.appendChild(ul);

            //After displaying all pizza, display price for whole order
            let p = document.createElement('p');
            p.innerHTML = "Suma <span>" + this.PriceSummary.toFixed(2) + " zł" + "</span>";
            cartNode.appendChild(p);
        }

        console.log("Cart: showCartOnSite END");
        return;
    }

    //Function adding pizza to Cart
    addItemToCart(id) {
        console.log("Cart: addItemToCart START");

        //Extract id of pizza from json 
        let pizzaId = extractPizzaMenuId(id);
        pizzaId = Number(pizzaId);

        console.log("You klicked " + id);

        //get information about pizza from menu
        let pizzaItem = PizzaMenuObject.getPizzaMenuItem(pizzaId);

        //Check is such Pizza exists in menu
        if (pizzaItem === undefined) {
            console.error("Cart: addItemToCart: No pizza information for id: " + pizzaId);
            return;
        }

        //If that pizza type (id from json) is already in Cart then...
        if (this.CartItems.has(pizzaId)) {
            let CartItem = this.CartItems.get(pizzaId);

            let updatedItem = {};

            //and update informaion (title, quantity, positionPrice)
            updatedItem.id = pizzaItem.id;
            updatedItem.title = pizzaItem.title;
            updatedItem.quantity = CartItem.quantity + 1;

            updatedItem.positionPrice = pizzaItem.price;/*multiplyFloats(updatedItem.quantity, pizzaItem.price);*/

            //set updated position in cart
            this.CartItems.set(pizzaId, updatedItem);
        }

        //If that position is not yet in cart
        else {
            //console.log ("%o", pizzaItem);
            let newItem = {};

            //assing information about pizza (title. quantity, price)
            newItem.id = pizzaItem.id;
            newItem.title = pizzaItem.title;
            newItem.quantity = 1;
            newItem.positionPrice = pizzaItem.price

            //add new position to cart
            this.CartItems.set(pizzaId, newItem);
        }

        //after Item is added, refresh cart
        this.refreshCart();
        console.log("Cart: addItemToCart END");

        return;
    }

    //Function that sumirize price for all Cart
    countPriceSummary() {

        console.log("Cart: countPriceSummary START ");
        this.PriceSummary = 0.00;

        //For each position in the Cart, price for position are added
        this.CartItems.forEach(item => {

            this.PriceSummary = addFloats(this.PriceSummary, multiplyFloats(item.quantity, item.positionPrice)); /*addFloats(this.PriceSummary, item.positionPrice);*/
        });

        console.log("Cart: countPriceSummary Price is " + this.PriceSummary);
        console.log("Cart: countPriceSummary END ");
        return;
    }

    //Function that removes pizza from cart
    removeItemFromCart(id) {
        console.log("Cart: removeItemFromCart START");

        //Extract id of pizza 
        let cartId = extractCartId(id);
        cartId = Number(cartId);

        console.log("You klicked to remove " + cartId);

        //If there is pizza with this id in Cart...
        if (this.CartItems.has(cartId)) {
            let CartItem = this.CartItems.get(cartId);

            //If there is only one pizza of thah type, then delete position in cart for this pizza id
            if (this.CartItems.get(cartId).quantity == 1) {
                this.CartItems.delete(cartId);
            }

            //if there is more than one pizza of that kind...
            else {
                let pizzaItem = PizzaMenuObject.getPizzaMenuItem(cartId);
                let updatedItem = {};

                //update informaion (title, quantity, positionPrice)
                updatedItem.id = pizzaItem.id;
                updatedItem.title = pizzaItem.title;
                updatedItem.quantity = CartItem.quantity - 1;
                updatedItem.positionPrice = pizzaItem.price;/*multiplyFloats(updatedItem.quantity, pizzaItem.price);*/

                this.CartItems.set(cartId, updatedItem);
            }
        }

        //else nothing happens (we do not have that kind of pizza);
        else {
            console.log("No item do delete. Id: " + cartId);

        }

        //after Item is removed, refresh cart
        this.refreshCart();
        console.log("Cart: removeItemFromCart END");

        return;
    }

    //Function for refreshing cart: counting price summary and showing CartOnSite sometimes are used both at the same time 
    //so I put them in one function for refreshing
    refreshCart() {
        this.countPriceSummary();
        this.showCartOnSite();
    }
}