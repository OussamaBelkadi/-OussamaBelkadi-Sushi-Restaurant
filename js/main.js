// Cart
let cartIcon = document.getElementById('cart-icon');
let cart = document.getElementsByClassName('cart')[0];
let closeCart = document.getElementById('close-cart');
//Open Cart
cartIcon.onclick = () =>{
    cart.classList.toggle('active');
};
//Close Cart
closeCart.onclick = () =>{
    cart.classList.remove('active');
};

// Cart Working
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded" , ready);
}else{
    ready();
}

// Fuction ready
function ready(){
    // Remove Items From the Cart
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons);
    for (var i =0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i]
        button.addEventListener("click" , removeCartItem);
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //Add To Cart
    var addCart = document.getElementsByClassName("btnadd");
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}
// tabs
function openMenu(evt, menuName){
    var i, tabContent, tablinks;
    tabContent = document.getElementsByClassName("swiper-wrapper");
    for(i = 0; i < tabContent.length; i++){
        tabContent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("swiper-slideH");
    for(i = 0; i < tablinks.length; i++){
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.className += " active";
} 
// Remove Items From Catr
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//Quantity Changed
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}
// Add to Cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement.parentElement;
    console.log(shopProducts);
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    console.log(title);
    var price = shopProducts.getElementsByClassName("prixe")[0].innerText;
    console.log(price);
    var shopProducts2 = button.parentElement.parentElement.parentElement.firstElementChild.getAttribute("src");
    console.log(shopProducts2);
    // var productImg = shopProducts2.getElementsByClassName("imgm")[0].src;
    addProductToCart(title, price, shopProducts2);
    updatetotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByCalssName("cart-product-title");
    for(var i = 0; i < cartItemsNames.length; i++){
      if(cartItemsNames[i].innerText == title){
        alert("vous avez deja ajouter se produit");
            return;
        }
    }
    var cartBoxContent = `
                        <img src="${productImg}" alt="image du choix du Menu!" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bx-trash cart-remove'></i>`;


    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);

}



// Updatetotal
function updatetotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    let price;
    for(let i = 0; i < cartBoxes.length; i++){
        let priceElement = cartBoxes[i].getElementsByClassName("cart-price")[0];
    
        let num = priceElement["price"];        
        let price = parseFloat(num);
        total = total + price;
        let hmm = document.getElementById("total-price");
    hmm.innerText = `${price}$`;
    }
    
}