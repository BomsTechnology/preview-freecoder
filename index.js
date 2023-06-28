import { variants, dessins, textColors, bgColors, fonts, dimensions  } from "./data.js";

let productCustom = {
    variant: variants[0],
    dimension: dimensions[0],
    font: fonts[0],
    bgColor:  bgColors[0],
    textColor: textColors[0],
    dessin:  dessins[0],
    text: "",
    text2: "",
}

const selectVariant = document.querySelector('#customprdtform .customprdtform_container_qte_ctn select');
const formItems = document.querySelectorAll('#customprdtform .customprdtform_formitem_item');
const previewItems = document.querySelectorAll('#customprdtform .customprdtform_formitem_preview');
const previewElt = document.querySelector('#customprdtform .customprdtform_preview_content_item');
const prevText = previewElt.querySelectorAll('.customprdtform_preview_content_text');
const price = document.querySelector('#customprdtform .customprdtform_container_qte_price .price');

let html = '';
variants.forEach(variant => {
    html += `<option value="${variant.id}">${variant.title}</option>`;
});
selectVariant.innerHTML = html;
selectVariant.addEventListener('change', (e) => {
    let currVar = variants.filter(variant => variant.id == e.target.value)[0];
    productCustom.variant = currVar;
    setPrice();
});

formItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        showEltItems(index);
        item.classList.toggle('open');
        setHandleInput();
        formItems.forEach((curr_item, curr_index) => {
            if(curr_index != index) curr_item.classList.remove('open');
        });
    });
});

document.querySelectorAll('#customprdtform  .customprdtform_formitem_item_input').forEach((input, index) => {
    input.addEventListener('input', function(e) {
        if(e.target.value == ""){
            e.target.classList.add('error');
        }else{
            e.target.classList.remove('error');
        }

        if(index == 0){
            productCustom.text = e.target.value;
            document.querySelector('#customprdtform #customprdtform__submit-form input[name="properties[Texte]"]').value = productCustom.text;
            if(e.target.value.length <= 10){
                prevText[0].style.fontSize = `18px`;
                
            }else if(e.target.value.length <= 14){
                prevText[0].style.fontSize = `14px`;
            }else{
                prevText[0].style.fontSize = `10px`;
            }
        }else{
            productCustom.text2 = e.target.value;
            document.querySelector('#customprdtform #customprdtform__submit-form input[name="properties[Texte2]"]').value = productCustom.text2;
            if(e.target.value.length <= 10){
                prevText[1].style.fontSize = `18px`;
                
            }else if(e.target.value.length <= 14){
                prevText[1].style.fontSize = `14px`;
            }else{
                prevText[1].style.fontSize = `10px`;
            }
        }
        setPreviewField();
    });
});

function setPrice() {
    price.innerHTML = `<del>${productCustom.variant.max_price}</del><strong>${productCustom.variant.min_price}</strong>`;
}


function showEltItems(index){
    let html = '';
    switch(index){
        case 0:
             dimensions.forEach((dim, index) => {
                let checked = productCustom.dimension == dim ? 'checked' : '';
                html += `
                    <input type="radio" ${checked} name="dimension" id="dimension_${index+1}" value="${index}">
                    <label for="dimension_${index+1}" class="customprdtform_formitem_preview_btn">
                        <div class="thumb-customprdtform_formitem_preview_btn">
                            <div><span class="shapeThumbInfos">${dim.title}</span></div>
                            ${dim.svg}
                            <div><span class="shapeThumbInfos">${dim.size}</span></div>
                        </div>
                    </label>
                `; 
             });
            break;
        case 1:
            let text = productCustom.text == "" ? "Mon Texte" : productCustom.text;
            fonts.forEach((font, index) => {
                let checked = productCustom.font == font ? 'checked' : '';
                html += `
                    <input type="radio" ${checked} name="font" id="font_${index+1}" value="${index}">
                    <label for="font_${index+1}" class="customprdtform_formitem_preview_btn">
                            <div class="font-customprdtform_formitem_preview_btn" style="font-family:${font} !important">
                                ${text}
                            </div>
                    </label>
                `;
            })
            break;
        case 2:
            bgColors.forEach((color, index) => {
                let checked = productCustom.bgColor == color ? 'checked' : '';
                html += `
                    <input type="radio" ${checked} name="bgColor" id="bgColor_${index+1}" value="${index}">
                    <label for="bgColor_${index+1}" class="customprdtform_formitem_preview_btn">
                        <div class="color-customprdtform_formitem_preview_btn" style="background-color:${color.value} !important">
                        </div>
                    </label>
                `;
            });
            break;
        case 3:
            textColors.forEach((color, index) => {
                let checked = productCustom.textColor == color ? 'checked' : '';
                html += `
                    <input type="radio" ${checked} name="textColor" id="textColor_${index+1}" value="${index}">
                    <label for="textColor_${index+1}" class="customprdtform_formitem_preview_btn">
                        <div class="color-customprdtform_formitem_preview_btn" style="background-color:${color.value} !important">
                        </div>
                    </label>
                `;
            });
            break;
        case 4:
            let checked = productCustom.dessin == 'none' ? 'checked' : '';
            html += `
                <input type="radio" ${checked} name="dessin" id="dessin_$0" value="none">
                <label for="dessin_0" class="customprdtform_formitem_preview_btn">
                <svg class="dessin" style="transform: scale(0.6); filter: none;" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><path class="st0" d="M13.6,11.5l9-9c0.6-0.6,0.6-1.5,0-2.1c-0.6-0.6-1.5-0.6-2.1,0l-9,9l-9-9C2-0.1,1-0.1,0.4,0.4
                  C-0.1,1-0.1,2,0.4,2.5l9,9l-9,9c-0.6,0.6-0.6,1.5,0,2.1C0.7,22.9,1.1,23,1.5,23c0.4,0,0.8-0.1,1.1-0.4l9-9l9,9
                  c0.3,0.3,0.7,0.4,1.1,0.4c0.4,0,0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L13.6,11.5z" fill="#C4C4C4"></path></svg>
                </label>`;
            dessins.forEach((dessin, index) => {
                let checked = productCustom.dessin == dessin ? 'checked' : '';
                html += `
                    <input type="radio" ${checked} name="dessin" id="dessin_${index+1}" value="${index}">
                    <label for="dessin_${index+1}" class="customprdtform_formitem_preview_btn">
                        <img class="image-customprdtform_formitem_preview_btn" src="${dessin.path}" alt="">
                    </label>
                `;
            });
            break;
    };
    if(index <= 1){
        previewItems[0].querySelector('.customprdtform_formitem_preview_content').innerHTML = html;
        previewItems[1].classList.remove('open');
        previewItems[2].classList.remove('open');
        if(formItems[index].classList.contains('open')){
            previewItems[0].classList.remove('open');
        }else{
            previewItems[0].classList.add('open');
        }
    }else{
        if(window.innerWidth <= 780){
            if(index <= 3){
                previewItems[1].querySelector('.customprdtform_formitem_preview_content').innerHTML = html;
                previewItems[0].classList.remove('open');
                previewItems[2].classList.remove('open');
                if(formItems[index].classList.contains('open')){
                    previewItems[1].classList.remove('open');
                }else{
                    previewItems[1].classList.add('open');
                }
            }else{
                previewItems[2].querySelector('.customprdtform_formitem_preview_content').innerHTML = html;
                previewItems[0].classList.remove('open');
                previewItems[1].classList.remove('open');
                if(formItems[index].classList.contains('open')){
                    previewItems[2].classList.remove('open');
                }else{
                    previewItems[2].classList.add('open');
                }
            }
        }else{
            previewItems[2].querySelector('.customprdtform_formitem_preview_content').innerHTML = html;
            previewItems[0].classList.remove('open');
            previewItems[1].classList.remove('open');
            if(formItems[index].classList.contains('open')){
                previewItems[2].classList.remove('open');
            }else{
                previewItems[2].classList.add('open');
            }
        }
    }
}

function setHandleInput() {
    document.querySelectorAll('#customprdtform input[type="radio"]').forEach((input) => {
        input.addEventListener('change', (e) => {
            switch(e.target.name){
                case 'dimension':
                    if(e.target.checked){
                        productCustom.dimension = dimensions[parseInt(e.target.value)];
                        if(e.target.value == '0' ){
                            document.querySelector('#customprdtform .customprdtform_formitem_flex.input').classList.remove('input_2');
                            previewElt.classList.remove('text_2');
                        }else{
                            document.querySelector('#customprdtform .customprdtform_formitem_flex.input').classList.add('input_2');
                            previewElt.classList.add('text_2');
                        }
                    }
                    break;
                case 'font':
                    if(e.target.checked){
                        productCustom.font = fonts[parseInt(e.target.value)];
                    }
                    break;
                case 'bgColor':
                    if(e.target.checked){
                        productCustom.bgColor = bgColors[parseInt(e.target.value)];
                    }
                    break;
                case 'textColor':
                    if(e.target.checked){
                        productCustom.textColor = textColors[parseInt(e.target.value)];
                    }
                    break;
                case 'dessin':
                    if(e.target.checked){
                        productCustom.dessin = dessins[parseInt(e.target.value)];
                    }
                    break;
            }
            setPreviewField();
        });
    });
}

function setPreviewField() {
    previewElt.style.fontFamily = productCustom.font;
    previewElt.style.backgroundColor = productCustom.bgColor.value;
    previewElt.querySelector('.customprdtform_preview_content_image img').setAttribute('src', productCustom.dessin.path)
    prevText[0].style.color = productCustom.textColor.value;
    prevText[1].style.color = productCustom.textColor.value;
    prevText[0].innerHTML =  productCustom.text != "" ? `<span>${productCustom.text}</span>` : `<span>Mon Texte<span>`;
    prevText[1].innerHTML =  productCustom.text2 != "" ? `<span>${productCustom.text2}</span>` : `<span>Mon Texte<span>`;


    formItems.forEach((item, index) => {
        let ctn = item.querySelector('.customprdtform_formitem_item_content');
        switch(index){
            case 0:
                ctn.innerHTML = `<div class="customprdtform_formitem_item_content-dimension">${productCustom.dimension.title} ${productCustom.dimension.size}</div>`;
                document.querySelector('#customprdtform #customprdtform__submit-form input[name="properties[Dimension]"]').value = `${productCustom.dimension.title} ${productCustom.dimension.size}`;
                break;
            case 1:
                ctn.innerHTML = `<div class="customprdtform_formitem_item_content-font" style="font-family: ${productCustom.font}">${productCustom.text != "" ? productCustom.text : 'Mon Texte'}</div>`;
                document.querySelector(`#customprdtform #customprdtform__submit-form input[name="properties[Police d'écriture]"]`).value = `${productCustom.font}`;
                break;
            case 2:
                ctn.innerHTML = `<div class="customprdtform_formitem_item_content-color" style="background-color: ${productCustom.bgColor.value};"></div>`;
                document.querySelector('#customprdtform #customprdtform__submit-form input[name="properties[Couleur du fond]"]').value = `${productCustom.bgColor.text}(${productCustom.bgColor.value})`;
                break;
            case 3:
                ctn.innerHTML = `<div class="customprdtform_formitem_item_content-color" style="background-color: ${productCustom.textColor.value};"></div>`;
                document.querySelector('#customprdtform #customprdtform__submit-form input[name="properties[Couleur du texte]"]').value = `${productCustom.textColor.text}(${productCustom.textColor.value})`;
                break;
            case 4:
                ctn.innerHTML = `<div class="customprdtform_formitem_item_content-dessin">
                                    <img class="image-customprdtform_formitem_preview_btn" src="${productCustom.dessin.path}" alt="">
                                </div>`;
                document.querySelector('#customprdtform #customprdtform__submit-form input[name="properties[Dessin]"]').value = `${productCustom.dessin.name}(${productCustom.dessin.path})`;
                break;
        }
    });
}

document.body.addEventListener('click', function(e) {
    let clickInside = e.target.classList.contains('customprdtform_formitem_item');
        if (!clickInside) {
            previewItems[0].classList.remove('open');
            previewItems[1].classList.remove('open');
            previewItems[2].classList.remove('open');
            formItems.forEach((item, index) => {
                item.classList.remove('open');
            });
        }
});

setPrice();
setPreviewField();
