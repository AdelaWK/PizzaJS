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
        const cartNode = document.getElementById(getCartId());
        removeAllChildNodes(cartNode);

        //If cart is empty show messege
        if (this.CartItems.size === 0) {

            console.log("Cart: showCartOnSite Cart is empty");

            document.getElementById("cart_container_h2").style.display = "block";
            document.getElementById("cart").style.display = "none";

        }

        //if cart is not empty...
        else {
            document.getElementById("cart_container_h2").style.display = "none";
            document.getElementById("cart").style.display = "block";


            console.log("Cart: showCartOnSite Cart has " + this.CartItems.size + " positions");

            let ul = document.createElement('ul');

            //For every pizza type in cart, show pizza name, quantity and price summary for that pizza type 
            this.CartItems.forEach(item => {


                let li = document.createElement('li');
                ul.appendChild(li);

                li.innerHTML = "<div class='cart_text'>" + item.title + "</div><div class='cart_quantity'>" + item.quantity + " x</div><div class='cart_price'>" + item.positionPrice.toFixed(2) + " zł </div><div class='cart_delete'><button class='cart_button' id='" + setCartPizzaId(item.id) + "'>usuń</button></div>";

            });
            cartNode.appendChild(ul);

            const cart_btns = document.querySelectorAll('.cart_button');
            //console.log(cart_btns);

            for (let i = 0; i < cart_btns.length; i++) {
                cart_btns[i].addEventListener('click', function (e) { CartObject.removeItemFromCart(cart_btns[i].id) }, false);
            }


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