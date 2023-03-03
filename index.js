import { sizes, poseTypes, coloris }  from './data.js';

let ralentiseur = document.querySelector('#configsection160223 #step_4 .select_item_content #ralentiseur');
let inputWidth = document.querySelector('#configsection160223 #step_2 .input_item_content #input_width');
let inputHeight = document.querySelector('#configsection160223 #step_2 .input_item_content #input_height');
let idPrice = document.querySelector('#configsection160223 #step_2  #id_price');
let btn = document.querySelector('#configsection160223  .config_preview #add_to_cart');

let selectOptions = document.querySelectorAll('#configsection160223 .config_preview .left .option');

let totalPrice = document.querySelector('#configsection160223 .config_preview .right .price');

let valWidth = 0;
let valHeight = 0;

let typeDePosePrice = 0;
let colorisStructurePrice = 0;
let ralentiseurPrice = 0;
let price = 0;


let html = '';

poseTypes.forEach((elt, index) => {
    html = index == 0 ? '' : html;
    let checked = index == 0 ? 'checked' : '';
    html += `
                <div class="image_item_content">
                    <input type="radio" name="typedepose" id="${elt.id}" value="100" ${checked}>
                    <label for="${elt.id}">
                        <div class="image_container">
                            <img src="${elt.image}" alt="${elt.label}">
                        </div>
                        <p>${elt.label}</p>
                    </label>
                </div>
            `;
});

document.querySelector('#configsection160223 #step_1 .wrap__item_content').innerHTML = html;
selectOptions[0].innerHTML = poseTypes[0].label;
typeDePosePrice = poseTypes[0].value;

coloris.forEach((elt, index) => {
    html = index == 0 ? '' : html;
    let checked = index == 0 ? 'checked' : '';
    html += `
                <div class="image_item_content">
                    <input type="radio" name="coloris" id="${elt.id}" value="100" ${checked}>
                    <label for="${elt.id}">
                        <div class="image_container">
                            <img src="${elt.image}" alt="${elt.label}">
                        </div>
                        <p>${elt.label}</p>
                    </label>
                </div>
            `;
});

document.querySelector('#configsection160223 #step_3 .wrap__item_content').innerHTML = html;
selectOptions[2].innerHTML = coloris[0].label;
colorisStructurePrice = coloris[0].value;

inputWidth.addEventListener('input', function(e) {
    e.preventDefault();

    if(e.target.value){
        valWidth = parseInt(e.target.value);
        let result = sizes.filter((elt) => valHeight != 0 && valWidth != 0 && elt.hauteur >= valHeight && elt.largeur >= valWidth);
        
        if(result.length != 0){
            idPrice.value = result[0].id;
            price = parseInt(result[0].prix);
            totalPrice.innerHTML = typeDePosePrice + colorisStructurePrice + ralentiseurPrice + price + ' €';
            btn.classList.remove('disabled');
            btn.disabled  = false;
        }else{
            btn.classList.add('disabled');
            btn.disabled  = true;
        }

        selectOptions[1].innerHTML = `Largeur : ${valWidth} mm - Hauteur : ${valHeight} mm`;


        if(price == 0){
            btn.children[0].classList.add('hide');
            btn.children[1].classList.add('hide');
            btn.children[2].classList.remove('hide');
            btn.disabled  = true;
        }else{
            btn.children[0].classList.remove('hide');
            btn.children[1].classList.remove('hide');
            btn.children[2].classList.add('hide');
            btn.disabled  = false;
        }
    }else {
        valWidth = 0;
        totalPrice.innerHTML = typeDePosePrice + colorisStructurePrice + ralentiseurPrice  + ' €';
        btn.classList.add('disabled');
        btn.disabled  = true;
    }
});


inputHeight.addEventListener('input', function(e) {
    e.preventDefault();

    if(e.target.value){
        valHeight = parseInt(e.target.value);
        let result = sizes.filter((elt) => valHeight != 0 && valWidth != 0 && elt.hauteur >= valHeight && elt.largeur >= valWidth);

        if(result.length != 0){
            idPrice.value = result[0].id;
            price = parseInt(result[0].prix);
            totalPrice.innerHTML = typeDePosePrice + colorisStructurePrice + ralentiseurPrice + price + ' €';
            btn.classList.remove('disabled');
            btn.disabled  = false;
        }else{
            btn.classList.add('disabled');
            btn.disabled  = true;
        }

        selectOptions[1].innerHTML = `Largeur : ${valWidth} mm - Hauteur : ${valHeight} mm`;

        if(valHeight == 0 || valWidth == 0){
            btn.classList.add('disabled');
            btn.disabled  = true;
        }

        
        if(price == 0){
            btn.children[0].classList.add('hide');
            btn.children[1].classList.add('hide');
            btn.children[2].classList.remove('hide');
            btn.disabled  = true;
        }else{
            btn.children[0].classList.remove('hide');
            btn.children[1].classList.remove('hide');
            btn.children[2].classList.add('hide');
            btn.disabled  = false;
        }
    }else {
        valHeight = 0;
        totalPrice.innerHTML = typeDePosePrice + colorisStructurePrice + ralentiseurPrice  + ' €';
        btn.classList.add('disabled');
        btn.disabled  = true;
    }
});

let typeDePoses = document.querySelectorAll('#configsection160223 #step_1 .image_item_content input[type="radio"]');

typeDePoses.forEach((elt, index) => {
    elt.addEventListener('click', function(e) {        
        if(e.target.checked){
            typeDePosePrice = parseInt(poseTypes[index].value);
            selectOptions[0].innerHTML = poseTypes[index].label;
            totalPrice.innerHTML = typeDePosePrice + colorisStructurePrice + ralentiseurPrice + price + ' €';
        }
    });
});

let colorisStructures = document.querySelectorAll('#configsection160223 #step_3 .image_item_content input[type="radio"]');

colorisStructures.forEach((elt, index) => {
    elt.addEventListener('click', function(e) {     
        if(e.target.checked){
            colorisStructurePrice = parseInt(coloris[index].value);
            selectOptions[2].innerHTML = coloris[index].label;
            totalPrice.innerHTML = typeDePosePrice + colorisStructurePrice + ralentiseurPrice + price + ' €';
        }
    });
});

ralentiseur.addEventListener('change', function(e) {
    ralentiseurPrice = parseInt(e.target.value);
    selectOptions[3].innerHTML = e.target.value == '0' ? 'Sans ralentisseur' : 'Avec ralentisseur';
    totalPrice.innerHTML = typeDePosePrice + colorisStructurePrice + ralentiseurPrice + price + ' €';
});


totalPrice.innerHTML = typeDePosePrice + colorisStructurePrice + ralentiseurPrice + price + ' €';
