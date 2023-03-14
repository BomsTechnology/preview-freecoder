import products from './data.js';

const gridContainer = document.querySelector('#gridselectproduct130323 .product_grid');
const selectedProductContainer = document.querySelector('#gridselectproduct130323 .selected_product_container');
const btnAddToCart = document.querySelector('#gridselectproduct130323 .add_to_cart');
const containerPrice = document.querySelector('#gridselectproduct130323 .container_pack_price');
const pack4 = document.querySelector('#gridselectproduct130323 .switch_pack #pack_4');
const pack6 = document.querySelector('#gridselectproduct130323 .switch_pack #pack_6');

const pack4Price = {
    old: '',
    current: '$39',
};

const pack6Price = {
    old: '$59',
    current: '$54',
};

let size = 4;
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

            btnAddToCart.innerHTML =  productsSelected.length == size  ? `Add To Cart` : `Pick ${size - (productsSelected.length)} more boxes`;
            btnAddToCart.disabled = productsSelected.length == size ? false : true;
            gridContainer.classList.add(productsSelected.length == size ? 'complete' : null);
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

});

pack4.addEventListener('click', function(e) {
    pack6.classList.remove('active');
    pack4.classList.add('active');
    size = 4;
    renderSelectedProducts();

    if(productsSelected[5]){
        let deleteElt = Array.from(productCards).filter((p) => {
            return  p.getAttribute('data-id') ===  productsSelected[5].id;
        });
        deleteElt.length > 0 ? productsSelected.splice(5, 1) : null;
        deleteElt.length > 0 ? setActiveCard(deleteElt[0], 'remove') : null;
    }

    
    if(productsSelected[4]){
        let deleteElt = Array.from(productCards).filter((p) => {
            return  p.getAttribute('data-id') ===  productsSelected[4].id;
        });
        deleteElt.length > 0 ? productsSelected.splice(4, 1) : null;
        deleteElt.length > 0 ? setActiveCard(deleteElt[0], 'remove') : null;
    }

    setActiveCard();
    setPrice(pack4Price);
    
});


pack6.addEventListener('click', function(e) {
    pack4.classList.remove('active');
    pack6.classList.add('active');
    size = 6;
    renderSelectedProducts();

    setActiveCard();
    setPrice(pack6Price);
});


function renderSelectedProducts () {
    let html = "";
    for(let i = 0; i < size; i++){
        html +=  productsSelected[i] ? ` 
            <div class="product_selected active">
                <span class="remove_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
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
            deleteElt.length > 0 ? productsSelected.splice(index, 1) : null;
            deleteElt.length > 0 ? setActiveCard(deleteElt[0], 'remove') : null;
            renderSelectedProducts();
        })
    })
};

function setActiveCard(elt, type) {
    if(type == 'add'){
        elt.querySelector('.selected_number').innerHTML = parseInt(elt.querySelector('.selected_number').innerHTML) + 1;
    }else if(type == 'remove'){
        if(parseInt(elt.querySelector('.selected_number').innerHTML) === 1){
            elt.classList.remove('active');
            elt.style.backgroundColor='transparent' 
        }else{
            elt.querySelector('.selected_number').innerHTML = parseInt(elt.querySelector('.selected_number').innerHTML) - 1;
        }
    }

    btnAddToCart.innerHTML = productsSelected.length == size  ? `Add To Cart` :  `Pick ${-(- size + (productsSelected.length))} more boxes`;
    btnAddToCart.disabled = productsSelected.length == size ? false : true;
    productsSelected.length == size ? gridContainer.classList.add('complete') : gridContainer.classList.remove('complete');
}

function setPrice(price) {
    if(price.old != ''){
        containerPrice.querySelector('.old_pack_price').style.display = 'block';
        containerPrice.querySelector('.old_pack_price').innerHTML = price.old;
    }else{
        containerPrice.querySelector('.old_pack_price').style.display = 'none';
    }

    containerPrice.querySelector('.current_pack_price').innerHTML = price.current;
}

renderSelectedProducts();
