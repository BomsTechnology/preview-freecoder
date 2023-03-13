import products from './data.js';

const gridContainer = document.querySelector('#gridselectproduct130323 .product_grid');
const selectedProductContainer = document.querySelector('#gridselectproduct130323 .selected_product_container');
const btnAddToCart = document.querySelector('#gridselectproduct130323 .add_to_cart');
const size = 4;
let productsSelected = [];

let html = '';
products.forEach((product) => {
    html += `
        <div class="product_card"  onMouseOver="this.style.backgroundColor='${product.color}'" onMouseOut="!this.classList.contains('active') ? this.style.backgroundColor='transparent' : null" data-id="${product.id}">
            <div class="product_image">
                <img src="${product.featured_image}" class="featured_image" alt="">
                <img src="${product.hover_image}" class="hover_image" alt="">
            </div>
            <h3 class="product_title">${product.title}</h3>
            <button type="button" class="product_add">Add</button>
            <div class="plus_minus_container">
                <div class="minus">-</div>
                <div class="selected_number">1</div>
                <div class="plus">+</div>
            </div>
        </div>  `;
});

gridContainer.innerHTML = html;

const productCards = document.querySelectorAll('#gridselectproduct130323 .product_card');

productCards.forEach((card, cardIndex) => {

    card.querySelector('.product_add').addEventListener('click', function(e) {
        if(productsSelected.length < size){
            card.classList.add('active');
            productsSelected.push(products[cardIndex]);
            renderSelectedProducts();

            btnAddToCart.innerHTML =  productsSelected.length == 4  ? `Add To Cart` : `Pick ${size - (productsSelected.length)} more boxes`;
            btnAddToCart.classList.add(productsSelected.length == 4 ? 'complete' : null);
            gridContainer.classList.add(productsSelected.length == 4 ? 'complete' : null);
        }
    });


    card.querySelector('.plus').addEventListener('click', function(e) {
        if(productsSelected.length < size){
            productsSelected.push(products[cardIndex]);
            setActiveCard(card, 'add');
            renderSelectedProducts();
        }
    });

    card.querySelector('.minus').addEventListener('click', function(e) {
        if(productsSelected.length > 0){
            let deleteIndex = productsSelected.indexOf(products[cardIndex]);
            productsSelected.splice(deleteIndex, 1);
            setActiveCard(card, 'remove');
            renderSelectedProducts();
        }
    });

})



function renderSelectedProducts () {
    let html = "";
    for(let i = 0; i < size; i++){
        html +=  productsSelected[i] ? ` 
            <div class="product_selected active">
                <span class="remove_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>                                      
                </span>
                <img src="${productsSelected[i].featured_image}" class="featured_image" alt="">
            </div>` : 
            ` <div class="product_selected"></div>`;
    }
    selectedProductContainer.innerHTML = html;
    setCloseBtn ();
}

function setCloseBtn () {
    selectedProductContainer.querySelectorAll('.remove_btn').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            let deleteElt = Array.from(productCards).filter((p) => {
               return  p.getAttribute('data-id') ===  productsSelected[index].id
            });
            productsSelected.splice(index, 1);
            setActiveCard(deleteElt[0], 'remove');
            renderSelectedProducts();
        })
    })
};

function setActiveCard(elt, type) {
    if(type == 'add'){
        elt.querySelector('.selected_number').innerHTML = parseInt(elt.querySelector('.selected_number').innerHTML) + 1;
        btnAddToCart.innerHTML =  productsSelected.length == 4  ? `Add To Cart` : `Pick ${size - productsSelected.length} more boxes`;
        btnAddToCart.classList.add(productsSelected.length == 4 ? 'complete' : null);
        gridContainer.classList.add(productsSelected.length == 4 ? 'complete' : null);

    }else{
        if(parseInt(elt.querySelector('.selected_number').innerHTML) === 1){
            elt.classList.remove('active');
            elt.style.backgroundColor='transparent' 
        }else{
            elt.querySelector('.selected_number').innerHTML = parseInt(elt.querySelector('.selected_number').innerHTML) - 1;
        }

        btnAddToCart.innerHTML =   `Pick ${-(- size + (productsSelected.length))} more boxes`;
        btnAddToCart.classList.remove('complete');
        gridContainer.classList.remove('complete');
    }
}

