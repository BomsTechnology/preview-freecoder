import data from "./data.js";

let quizzform = document.querySelector('#quizzpage280123 #quizzform');
let step = 0;
let html = '';

data.forEach((item, index, arr) => {
    let active = index == 0 ? 'active' : '';
    let start = index == 0 ? 'start' : '';
    let complete = index == 0 ? 'complete' : '';
    html += `<div class="form-item ${active}">
                <div class="form-wrap">
                    <h1 class="question">${item.question}</h1>
                    <div class="answers ${start} ${complete}">`;
    
    item.answers.forEach((answer, ansIndex) =>  {
        html += `<div class="answer-item">`;
        html += item.answer_type == '' ? '' 
                : item.answer_type == 'single' ? 
                `<input type="radio" name="${item.question_id}" id="${item.question_id}_${ansIndex+1}" value="${answer.value}">` : 
                `<input type="checkbox" name="${item.question_id}" id="${item.question_id}_${ansIndex+1}" value="${answer.value}">`;
        

        if(answer.type == 'text') {
            html += answer.info != '' ?
                    `<label for="${item.question_id}_${ansIndex+1}" class="${start}">
                        <span class="ico-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>                                          
                        </span>
                        <span class="info">${answer.info}</span>
                        <span>${answer.value}</span>
                        </label>` : 
                    `<label for="${item.question_id}_${ansIndex+1}" class="${start}">
                        <span>${answer.value}</span>
                    </label>`;
        }else{
            html += `<label for="${item.question_id}_${ansIndex+1}" class="${start} ctn-ans-image">
                        <div class="ans-image">
                            <img src="${answer.path}" alt="">
                        </div>
                        <span>${answer.value}</span>
                    </label>
                `;
        }
        html += `</div>`;
    });

    html += `</div><div class="ctn-btn">`;
    html +=  index > 1 ?  `
            <span class="go-back">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                    <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
                </svg>
            </span> ` : ``;
            
    html +=  `<span class="next-btn">${item.button_text}</span></div> `;

    html +=  index > 0 ?`
        <div class="ctn-progress-bar">
            <div class="progress-bar" style="width:${(20*index)}%"></div>
            <div class="progress-bar-paging">${index}/${arr.length -1}</div>
        </div> ` : ``;
        
    html += `</div></div>`;

});
quizzform.innerHTML = html;


let formItems = document.querySelectorAll('#quizzpage280123 .form-item');
let nextBtns = document.querySelectorAll('#quizzpage280123 .next-btn');
let prevBtns = document.querySelectorAll('#quizzpage280123 .go-back');

nextBtns.forEach((clickBtn, clickIndex) => {
    clickBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let isComplete = formItems[step].querySelector('.answers').classList.contains('complete');
        if(step == (data.length - 1)) {
            document.querySelector('#quizzpage280123 .container').classList.add('hide');
            document.querySelector('#quizzpage280123 .ctn-diagnostic-prdts ').classList.add('show');
        } else if(step == 0 || isComplete){
            formItems[step].classList.remove('active');
            formItems[step + 1].classList.add('active');
            setSelectElts();
            step = step + 1;
        }
        
    })
});


prevBtns.forEach((clickBtn, clickIndex) => {
    clickBtn.addEventListener('click', function(e) {
        e.preventDefault();
        formItems[step].classList.remove('active');
        formItems[step - 1].classList.add('active');
        setSelectElts(); 
        step = step - 1; 
    })
});

function setSelectElts() {
    let elts = document.querySelectorAll('#quizzpage280123 .form-item.active .answer-item label');
    elts.forEach((elt) => {
        elt.addEventListener('click', function(e) {
            setTimeout(() => {
                let isCompleteRadio = document.querySelectorAll('#quizzpage280123 .form-item.active .answer-item input[type="radio"]:checked');
                let isCompleteChekbox = document.querySelectorAll('#quizzpage280123 .form-item.active .answer-item input[type="checkbox"]:checked');
                if(isCompleteRadio.length > 0 || isCompleteChekbox.length > 0){
                    document.querySelector('#quizzpage280123 .form-item.active .answers').classList.add('complete');
                }else{
                    document.querySelector('#quizzpage280123 .form-item.active .answers').classList.remove('complete');
                }
            }, 100)
            
        })
    })
}
