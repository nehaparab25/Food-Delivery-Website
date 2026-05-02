var swiper = new Swiper(".reviews-swiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});


const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelectorAll('.cart-total');
const cartValue = document.querySelector('.cart-value');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelectorAll('.fa-bars');

cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));
closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));
hamburger.addEventListener('click', (e) => mobileMenu.classList.toggle('mobile-menu-active'));
hamburger.addEventListener('click', (e) => bars.classList.toggle('fa-xmark'));


const showCards = () => {
  productList.forEach((product) => {

    const orderCart = document.createElement('div');

    orderCart.classList.add('order-card');

    orderCart.innerHTML = `
      <div class="card-image">
        <img src="${product.image}" alt="menu image">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="#" class="btn card-btn">Add to cart</a>
    `;

    cardList.appendChild(orderCart);

    const cardBtn = orderCart.querySelector('.card-btn');

    cardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product); // IMPORTANT
    });

  });
};

let productList = [];
let cartProduct = [];



const updateTotal = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll('.item').forEach(item => {

    const quantity = parseInt(item.querySelector('.quantity-display').textContent);
    const Price = parseFloat(item.querySelector('.item-total').textContent.replace('$', ''));
    totalPrice += Price;
    totalQuantity += quantity;
  });

  cartTotal.forEach(total => {
  total.textContent = `$${totalPrice.toFixed(2)}`;

  cartValue.textContent = totalQuantity;

});
};



const addToCart = (product) => {

  const existingProduct = cartProduct.find(item => item.id === product.id);
  if (existingProduct) {
    alert('Item is already in the cart');
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace('$', ''));

  const cartItem = document.createElement('div');
  cartItem.classList.add('item');

  cartItem.innerHTML = `
  <div class="image-container">
    <img src="${product.image}">
  </div>
  <div class="item-details">
    <h4>${product.name}</h4>
    <h4 class="item-total">$${price}</h4>
  </div>
  <div class="quantity-controls">
    <a href="#" class="quantity-btn minus">
      <i class="fa-solid fa-minus"></i>
    </a>
    <h4 class="quantity-display">${quantity}</h4>
    <a href="#" class="quantity-btn plus">
      <i class="fa-solid fa-plus"></i>
    </a>
  </div>
`;
  cartList.appendChild(cartItem);
  updateTotal();

  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-display');
  const itemTotal = cartItem.querySelector('.item-total');
  const minusBtn = cartItem.querySelector('.minus');

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(quantity * price).toFixed(2)}`;
      updateTotal();
    }

    else{
      cartItem.classList.add('item-slide-out');
      setTimeout(() => {
         cartItem.remove();
         cartProduct = cartProduct.filter(item => item.id !== product.id);
          updateTotal();
     
    }, 300);
    }
  });

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(quantity * price).toFixed(2)}`;
    updateTotal();
  });
};


const init = () => {
  fetch('products.json').then
    (response => response.json())
    .then(data => {
      productList = data;
      showCards();
    });
}

init();