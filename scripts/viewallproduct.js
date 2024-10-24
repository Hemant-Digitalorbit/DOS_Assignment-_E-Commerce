// Fetch all Products To Window
fetch('./src/data.json')
.then(response => response.json())
.then((data) => {
    console.log("data", data)

    const productsData = document.querySelector('.prod');
    const productShowPerPage = 8;
    let currentPage = 1;
    const totalPages = Math.ceil(data.products.lenght / productShowPerPage)

    function showProductsOnPage (page){
        productsData,innerHTML = '';
        const startPage = (page - 1) * productShowPerPage;
        const endPage = startPage + productShowPerPage;
        // how many products
        const currentPageProduct = data.products.slice(startPage, endPage)

        currentPageProduct.forEach(product => {
            productsData.innerHTML += `
                        <div class='mt-8'>
                            <div class='w-44 mr-2 md:w-48 md:mr-6'>
                                <a href="viewoneproduct.html" data-id="${product.id}">
                                    <img class='w-full h-56 md:w-full md:h-60 object-cover' src="${product.image}" alt="${product.name}" />
                                </a>
                            </div>
                            <div class='mt-4'>
                                <p class='text-[#0000009E] text-xs'>${product.brand}</p>
                                <div class='flex justify-between items-center'>
                                    <h2 class='text-sm'>${product.name}</h2>
                                    <a href="#" class='mr-2 md:mr-6 w-6 h-6'>
                                        <img src="https://img.icons8.com/?size=100&id=3686&format=png&color=000000"/>
                                    </a>
                                </div>
                                <p style="font-family: Georgia; line-height: 1.5;" class='text-md'>Rs. ${product.price}</p>
                                <div class='mt-2 bg-[#C8B39E] w-[60px] h-[28px] flex items-center space-x-1'>
                                    <p style="font-family: Georgia;" class='text-sm text-[#0000009E] px-1'>${product.rating}</p>
                                    <i class="fa-regular fa-star text-sm text-[#0000009E]"></i>
                                </div>
                            </div>   
                        </div>
                `
            })
    }

    function addPagination(){
        const paginationStore = document.querySelector('.pagination')
        paginationStore.innerHTML = '';

        // condition
        for (let i= 1; i<=totalPages; i++){
            const pageBtn = document.createElement('button')
            pageBtn.textContent = 1;
            pageBtn.classList.add('page-button', 'rounded-full', 'bg-black')

            if (i === currentPage) {
                pageBtn.classList.add('active')
            }

            pageBtn.addEventListener('click', () => {
                currentPage = 1
                showProductsOnPage(currentPage);
                document.querySelectorAll('.page-button').map(button => button.classList.remove('active'))
                pageBtn.classList.add('active')
            })

            paginationStore.appendChild(pageBtn)
        }
    }
    showProductsOnPage(currentPage);
    addPagination();
})  




