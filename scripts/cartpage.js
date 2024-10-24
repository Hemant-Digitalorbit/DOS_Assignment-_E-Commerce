function cartPage() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsStore = document.querySelector('.cart-item');
    const totalPrice = document.querySelector('.total-price');

    let startingTotalPrice = 0;

    cartItemsStore.innerHTML = '';

    // Main Div to make flex both cartitems div and order summary div
    const mainCartPageContainer = document.createElement('div');
    mainCartPageContainer.classList.add('flex', 'md:flex-row', 'flex-col', 'mx-4', 'md:mx-0');

    // to store cartitems in this div 
    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.classList.add('w-full', 'lg:w-3/5');
    // see cart lenght
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="flex items-center justify-center text-lg text-red-500">Your cart is empty. Please add items to continue.</p>';
        mainCartPageContainer.appendChild(cartItemsContainer);
        cartItemsStore.appendChild(mainCartPageContainer);
        return
    }


    cart.forEach((item, index) => {
        startingTotalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('flex', 'flex-col', 'lg:flex-row');
        cartItem.innerHTML = ` 
            <div class="flex flex-col lg:flex-row gap-8">
                <div class="flex flex-col w-full ">
                    <div class="border-b-2 border-r-2 pr-12 md:pr-32 pt-8 pb-8">
                        <div class="flex flex-row gap-10">
                            <div class="w-24 h-[100px] md:w-[110px] md:h-[138px]">
                                <img class="w-full h-full object-cover" src="${item.image}" alt="${item.name}"/>
                            </div>
                            <div class="flex flex-col w-96 -mt-1 -md:mt-2">
                                <h2 class="text-[14px] md:text-[22px]">${item.name}</h2>
                                <div class="md:mt-1 flex flex-row md:space-x-2 space-x-1">
                                    <p class="text-[14px] md:text-[20px]">Rs. ${item.price.toFixed(2)}</p>
                                    <p class="text-[6px] md:text-[12px] flex md:justify-center items-center text-[#0000009E]"><span class="text-red-600">*</span>Inclusive of all taxes</p>
                                </div>
                                
                                <div class="flex flex-col">
                                    <div class="flex flex-row justify-start items-center mt-2 md:mt-2 space-x-4 md:space-x-6 w-28 h-6 md:w-36 md:h-8 font-[600] text-white">
                                        <button class="decrease-quantity w-6 h-6 bg-red-500 hover:bg-red-600">-</button>
                                        <span class="quantity-display w-6 h-6 bg-gray-200 text-center text-black">${item.quantity}</span>
                                        <button class="increase-quantity w-6 h-6 bg-green-500 hover:bg-green-600">+</button>
                                    </div>
                                    <div class="mt-2">
                                        <button class="remove-item bg-[#3B3B3B] text-[10px] text-center md:text-[16px] md:h-6 h-4 px-2 text-white hover:text-red-500">Remove</button>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Increase Quantity of product
        cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            cartPage();
        });

        // Decrease Quantity of produt
        cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                cartPage();
            }
        });

        // Delete cart item from cartpage 
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            cart.splice(index, 1); //remove 
            localStorage.setItem('cart', JSON.stringify(cart));
            cartPage();
        });
    });

    mainCartPageContainer.appendChild(cartItemsContainer);
    cartItemsStore.appendChild(mainCartPageContainer);

    
    const orderSummary = document.createElement('div');
    orderSummary.classList.add('w-full', 'lg:w-2/5');
    orderSummary.innerHTML = `
        <div class="order-summary">
            <div class="w-full">
                <h2 class="text-[20px] md:text-[38px] mb-2 mt-4 md:mt-0 ">Order Summary</h2>
                <div class="flex flex-col gap-2 w-80">   
                    <div class="flex flex-row justify-between">
                        <p class="text-[14px]">Subtotal</p>
                        <p class="text-[14px]">Rs. ${(startingTotalPrice).toFixed(2)}</p>
                    </div>
                    <div class="flex flex-row justify-between mb-1">
                        <p class="text-[14px]">Estimated Delivery & <br> Handeling </p>
                        <p class="text-[14px]">Rs. ${(300).toFixed(2)}</p>
                    </div>
                    <div class="border-b-2"></div>
                    <div class="flex flex-row justify-between mt-1">
                        <p class="text-[20px]">Total</p>
                        <p class="total-price text-[20px]">Rs. ${((startingTotalPrice) + 300).toFixed(2)}</p>
                    </div>
                    <button class="checkout bg-[#3B3B3B] text-white w-full h-10 mt-6">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    `;

    mainCartPageContainer.appendChild(orderSummary);

    totalPrice.textContent = startingTotalPrice.toFixed(2);

    // not addded checkout functionality to place order
    orderSummary.querySelector('.checkout').addEventListener('click', () => {
        alert("checkout functionality not added");
    });
}

window.onload = cartPage;
