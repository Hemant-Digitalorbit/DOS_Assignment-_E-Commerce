
// Toggle Menu Functionnality
const toggleMenu = document.querySelector('.toggle-menu');
const mobileLinks = document.querySelector('.mobile-nav-links');
const closeMenu = document.querySelector('.close-button');
const body = document.body;

toggleMenu.addEventListener('click', () => {
    mobileLinks.classList.toggle('show');

    if (mobileLinks.classList.contains('show')){
        mobileLinks.classList.remove('close');
        body.classList.add('no-scroll');
    }else {
        mobileLinks.classList.add('close');
        body.classList.remove('no-scroll');
    } 
});

closeMenu.addEventListener('click', ()=> {
    mobileLinks.classList.remove('show');
    mobileLinks.classList.add('close');
});



// Search Toggle For Mobile Version
document.querySelector('.search-btn').addEventListener('click', function(){
    const searchForm = document.querySelector('.show-mobile-form');

    // For Mobile Form
    if (searchForm.style.display === 'none' || searchForm.style.display === ''){
        searchForm.style.display = 'flex';
    }else {
        searchForm.style.display = 'none';
    }
})



// Search functionality to search the products on base of there name..........

const products = [];
const searchInput = document.querySelector('.search-input')
const searchResults = document.querySelector('.search-result')

fetch('./src/data.json')
.then(blob => blob.json())
.then((data) => products.push(...data.products))

// search query 
const searchQuery = (query) => {
    const regex = new RegExp(query, 'gi');
    return  products.filter(product => product.name.match(regex))
};  

const showResults = () => {  
    const query = searchInput.value.trim();
    const matchArray = searchQuery(query)          
        const resultItems = matchArray.map(product => {
            return `
                <div class="flex flex-row items-center w-full mt-2 space-x-2 border-b-2 pb-1">
                    <img class="w-6 h-7" src="${product.image}" />
                    <a href="viewoneproduct.html?productId=${product.id}"
                        ><h1 class="text-[18px] cursor-pointer">${product.name}</h1>
                    </a>
                </div>
            `;
        }).join('')
           
    searchResults.innerHTML = resultItems;
    
    // see search results are available or not
    if (query.length > 0) {
        searchResults.style.display = 'block';
    } else {
        searchResults.style.display = 'none';
    }
}

searchInput.addEventListener('input', showResults)

// function
function getUrlParams(param){   
    const urlParam = new URLSearchParams(window.location.search)
    return urlParam.get(param)
}

fetch('./src/data.json')
    .then(response => response.json())
    .then((data) => {
        const productId = getUrlParams('productId'); 
        const selectedProduct = data.products.find(product => product.id === parseInt(productId));

        if (selectedProduct) {
            document.querySelector('.product-image').src = selectedProduct.image;
            document.querySelector('.product-name').textContent = selectedProduct.name;
            document.querySelector('.product-brand').textContent = selectedProduct.brand;
            document.querySelector('.product-price').textContent = `Rs. ${selectedProduct.price}`;
        }
    });




// Fetch all Products To Window
fetch('./src/data.json')
.then(blob => blob.json())
.then((data) => {

    // Select all .products class for all div ...........
    const productData = document.querySelectorAll('.products');
    productData.forEach((container) => {

        // to only see 4 products on mobile version
        const isMobile = window.innerWidth <=1024;
        const forMobile = isMobile ? 4 : data.products.length;

        data.products.slice(0,forMobile).forEach(product => {
            container.innerHTML += `
                        <div class='mt-8'>
                            <div class='w-44 mr-2 md:w-48 md:mr-6'>
                                <a href="viewoneproduct.html?param=${product.id}" class="view-product" data-id="${product.id}">
                                    <img class='viewone w-full h-56 md:w-full md:h-60 object-cover cursor-pointer' src="${product.image}" alt="${product.name}" />
                                </a>
                            </div>
                            <div class='mt-4'>
                                <p class='text-[#0000009E] text-xs'>${product.brand}</p>
                                <div class='flex justify-between items-center'>
                                    <h2 class='text-sm'>${product.name}</h2>
                                    <button onclick="addToCart(this)"
                                            data-id="${product.id}"
                                            data-brand="${product.brand}"
                                            data-name="${product.name}"
                                            data-price="${product.price}"
                                            data-image="${product.image}"
                                            data-sizes="${product.sizes.join(',')}"  
                                     class='mr-2 md:mr-6 w-6 h-6 transform transition-transform duration-200 hover:scale-110'>
                                        <img src="https://img.icons8.com/?size=100&id=3686&format=png&color=000000"/>
                                    </button>
                                </div>
                                <p style="font-family: Georgia; line-height: 1.5;" class='text-md'>Rs. ${product.price}</p>
                                <div class='mt-2 bg-[#C8B39E] w-[60px] h-[28px] flex items-center space-x-1'>
                                    <p style="font-family: Georgia;" class='text-sm text-[#0000009E] px-1'>${product.rating}</p>
                                    <i class="fa-regular fa-star text-sm text-[#0000009E]"></i>
                                </div>
                            </div>   
                        </div>
            `
        });

        const viewProduct = document.querySelectorAll('.view-product')
        viewProduct.forEach(tab => {
            tab.addEventListener('click', (e) => {

                e.preventDefault();

                const productId = tab.getAttribute('data-id');
                const productSelected = data.products.find(product => product.id == productId)

                localStorage.setItem('productSelected', JSON.stringify(productSelected));

                window.location.href = 'viewoneproduct.html'
            })
        })     
        
    })
}) 


// Cart Page Add products from product cart icon
function addToCart(button){
    const productId = button.getAttribute('data-id')
    const productName = button.getAttribute('data-name')
    const productBrand = button.getAttribute('data-brand')
    const productPrice = parseFloat(button.getAttribute('data-price'))
    const productImage = button.getAttribute('data-image')
    const productSizes = button.getAttribute('data-sizes').split(',')

    const product = {
        id : productId,
        name: productName,
        brand: productBrand,
        price: productPrice,
        image: productImage,    
        sizes: productSizes,
        quantity: 1
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || []

    const checkIndex = cart.find(item => item.id === productId)
    if(checkIndex) {
        checkIndex.quantity += 1;
    }else {
        cart.push(product)
    }

    localStorage.setItem('cart' , JSON.stringify(cart))
    alert("added")  
}


// To View All Products
document.querySelector('.viewall-btn').addEventListener('click', () => {
    window.location.href = 'viewallproducts.html' 
})

// To Contact Form
document.querySelector('.contact').addEventListener('click', () => {
    window.location.href = 'contact.html'
})

//  To View One Product
document.querySelector('.viewone').addEventListener('click', () => {
    window.location.href = 'viewoneproduct.html'
})

//  To View One Product
document.querySelector('.cart').addEventListener('click', () => {
    window.location.href = 'cartpage.html'
})




// Scroll Products Horizantally Function 
function scroll(side, button){
    const scrollElement = button.closest('section').querySelector('.products');
    const scrollValue = side === 'right' ? 10 : -10;
    let scrollAmounts = 0;
    const smoothScroll = setInterval(() => {
        scrollElement.scrollBy({left: scrollValue, behavior: 'auto'});
        scrollAmounts += Math.abs(scrollValue);
        
        if(scrollAmounts >= 800){
            clearInterval(smoothScroll)
        }
    }, 10)
} 
// Add event listeners to right angle
document.querySelectorAll('.scrollRight').forEach(button    => {
    button.addEventListener('click', 
        () => scroll('right', button)
    )
})
// Add event listeners to left angle
document.querySelectorAll('.scrollLeft').forEach(button => {
    button.addEventListener('click', 
        () => scroll('left', button)
    )
})


// Footer Mobile version 
function showChildElements(button){
    const panel = button.parentElement.nextElementSibling;
    const icons = button.nextElementSibling;
    // see panels 
    panel.classList.toggle('show');
    // to rotate arrow (180deg)
    icons.classList.toggle('rotate');
}

