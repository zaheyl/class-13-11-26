
// HERO IMAGE SLIDER

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
}

setInterval(showSlide, 5000);


// SHOPPING CART

let cart = [];

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Automatically open popup
    openCart();
}


function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is currently empty.</p>';
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>RM ${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    REMOVE
                </button>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = total.toFixed(2);
}


// REMOVE PRODUCT

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// OPEN CART POPUP

function openCart() {

    document.getElementById("cart-overlay").classList.add("show");
}


// CLOSE CART POPUP

function closeCart(event) {

    if (
        !event ||
        event.target.id === "cart-overlay"
    ) {
        document.getElementById("cart-overlay").classList.remove("show");
    }
}


// CHECKOUT THROUGH WHATSAPP

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello METALLICA! I would like to place an order:\n\n";

    let total = 0;

    cart.forEach(item => {

        let subtotal = item.price * item.quantity;

        message += `${item.name}\n`;
        message += `Quantity: ${item.quantity}\n`;
        message += `Price: RM ${subtotal.toFixed(2)}\n\n`;

        total += subtotal;
    });

    message += `TOTAL: RM ${total.toFixed(2)}\n\n`;
    message += "Please let me know how to proceed with my order. Thank you!";

    const whatsappURL = "https://wa.me/60132582804?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}
