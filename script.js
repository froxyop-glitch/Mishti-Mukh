
let cart = JSON.parse(localStorage.getItem('mishtiCart') || '[]');

function addToCart(name, price){
  cart.push({name,price});
  localStorage.setItem('mishtiCart', JSON.stringify(cart));
  alert(name + ' added to cart');
}

//cartcounter
function updateCartCount() {

    const count =
    document.getElementById("cart-count");

    if(count){
        count.innerText = cart.length;
    }
}

function addToCart(name,price){

    cart.push({
        name,
        price
    });

    localStorage.setItem(
        "mishtiCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart");
}

updateCartCount();
//Cart counter

const cartDiv = document.getElementById('cartItems');
if(cartDiv){
  let total = 0;
  cartDiv.innerHTML = cart.map(item=>{
    total += item.price;
    return `<p>${item.name} - ₹${item.price}</p>`;
  }).join('') + `<h3>Total: ₹${total}</h3>`;
}
//Checkout integration

function loadCheckout(){

    let cartItems =
    document.getElementById("cartItems");

    let total = 0;

    if(!cartItems) return;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-row">
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            </div>
        `;
    });

    document.getElementById(
        "grandTotal"
    ).innerText = total;
}

loadCheckout();
//checkout---end--
//Payment Integration
function placeOrder(){

    let total =
    document.getElementById("grandTotal")
    .innerText;

    let payment =
    document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    if(payment === "cod"){

        alert(
            "Order placed successfully!"
        );

        localStorage.removeItem(
            "mishtiCart"
        );

        window.location =
        "index.html";

        return;
    }

    var options = {

        key: "YOUR_RAZORPAY_KEY",

        amount: total * 100,

        currency: "INR",

        name: "Mishti Mukh",

        description:
        "Sweet Order Payment",

        handler: function(response){

            alert(
                "Payment Successful"
            );

            console.log(
                response.razorpay_payment_id
            );

            localStorage.removeItem(
                "mishtiCart"
            );

            window.location =
            "index.html";
        }
    };

    var rzp =
    new Razorpay(options);

    rzp.open();
}
//Payment integration done

