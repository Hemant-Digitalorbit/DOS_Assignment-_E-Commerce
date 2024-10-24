const viewSelectedProduct = JSON.parse(localStorage.getItem('productSelected'))
    if (viewSelectedProduct) {
    document.querySelector('.view-one-product').innerHTML = `

        <div class='flex md:flex-row flex-col md:space-x-14 space-y-8 md:space-y-0'>
            <div class='flex flex-col-reverse md:flex-row justify-center space-y-4 md:space-y-0 gap-4'>
                <div class='view-product-scrollbar flex flex-row md:flex-col items-center md:h-96 mx-4 md:mx-0 space-x-4 md:space-x-0 md:space-y-4 overflow-x-auto md:overflow-y-auto scroll-smooth'>
                    <img class='w-full h-full w-20 h-24 md:w-20 md:h-24' src="${viewSelectedProduct.image}" />
                    <img class='w-full h-full w-20 h-24 md:w-20 md:h-24' src="${viewSelectedProduct.image}" />
                    <img class='w-full h-full w-20 h-24 md:w-20 md:h-24' src="${viewSelectedProduct.image}" />
                    <img class='w-full h-full w-20 h-24 md:w-20 md:h-24' src="${viewSelectedProduct.image}" />
                    <img class='w-full h-full w-20 h-24 md:w-20 md:h-24' src="${viewSelectedProduct.image}" />  
                </div>

                <div class='flex md:flex-col mx-4 w-60 md:w-80 h-full md:space-x-4'>
                    <img class='w-full h-full object-cover' src="${viewSelectedProduct.image}" />
                </div>
            </div>
                            
                    <div class='mx-4'>
                        <p class='text-[14px] md:text-[20px] text-[#0000009E] font-[Georgia] mb-1'>${viewSelectedProduct.brand}</p>
                        <h2 class='text-[28px] md:text-[38px] text-[#000000] font-[Georgia] font-[400] mb-1'>${viewSelectedProduct.name}</h2>
                        <div class='mt-2 bg-[#C8B39E] w-[60px] h-[28px] flex items-center space-x-1 px-2 mb-1'>
                            <p class=''>${viewSelectedProduct.rating}</p>
                            <i class="fa-regular fa-star text-sm text-[#0000009E]"></i>
                        </div>
                            <p class='text-[20px] md:text-[30px] text-[#000000] font-[Georgia] font-[400]'>Rs. ${viewSelectedProduct.price}</p>
                            <p class='text-[12px] md:text-[16px] text-[#0000009E] mb-4'>Inclusive of all taxes</p>
                            <div class='flex flex-col justify-center space-y-2 mb-4'>
                                <h4 class='text-[20px] text-[#3B3B3B] font-[Georgia]'>More Colors</h4>
                                <div class='flex space-x-4'>
                                    <p class='bg-[#D9D9D9] w-11 h-11'></p>
                                    <p class='bg-[#C8B39E] w-11 h-11'></p>
                                    <p class='bg-[#5F3838] w-11 h-11'></p>
                                    <p class='bg-[#2C6039] w-11 h-11'></p>
                                </div>

                            </div>

                            
                            <div class='flex flex-col justify-center space-y-2 mb-4'>
                                <h4 class='text-[20px] text-[#3B3B3B] font-[Georgia]'>Sizes</h4>
                                <select class='border w-56 h-11 cursor-pointer">
                                    <option value="" disabled selected>S</option>
                                    ${
                                        viewSelectedProduct.sizes.map((size) => 
                                        `<option value="${size}">${size}</option>`).join('')
                                    }
                                </select>
                            </div>

                        <button onclick="addToCart(this)"  
                            data-id="${viewSelectedProduct.id}"
                            data-brand="${viewSelectedProduct.brand}"
                            data-name="${viewSelectedProduct.name}"
                            data-price="${viewSelectedProduct.price}"
                            data-image="${viewSelectedProduct.image}"
                            data-sizes="${viewSelectedProduct.sizes.join(',')}"
                            class='bg-[#3B3B3B] text-center text-white w-56 h-12'>
                            Add to Bag
                        </button>
                    </div>
        </div>
    `

    
}

