const steps = Array.from(document.querySelectorAll('#custdecosection210323 .step'));

let currentStep = 0;

steps.forEach((step, index) => {
    step.querySelector('.next_btn').addEventListener('click', function(e) {
        e.preventDefault();
        if((currentStep < steps.length - 1) && step.classList.contains('complete')){
            currentStep = index + 1;
            steps[index].classList.add('finish');
            steps[currentStep].classList.add('active');
        }
    });

    step.querySelector('.back_btn').addEventListener('click', function(e) {
        e.preventDefault();
        if(currentStep > 0){
            currentStep = index - 1;
            steps[index].classList.remove('active');
            steps[currentStep].classList.remove('finish');
        }
    });
});

// Verification for step 1
const step1Input = Array.from(steps[0].querySelectorAll('input[type="text"]'));
step1Input.forEach((input, index) => {
    input.addEventListener('input', function(e) {
        if(step1Input[0].value != "" && step1Input[1].value != ""){
            steps[0].classList.add('complete');
        }else{
            steps[0].classList.remove('complete');
        }
    });
});

// Verification for step 2
const step2Input = Array.from(steps[1].querySelectorAll('input[type="radio"]'));
const step2InputYes = steps[1].querySelector('#step2_1_yes');
const YesinputsStep2 = Array.from(step2InputYes.querySelectorAll('input[type="text"]'));
step2Input.forEach((input, index) => {
    input.addEventListener('click', function(e) {
        if(e.target.checked && e.target.value == 'no'){
            steps[1].classList.add('complete');
            step2InputYes.classList.add('hide');
        }else if(e.target.value == 'yes'){
            step2InputYes.classList.remove('hide');
            if(YesinputsStep2[0].value != "" && YesinputsStep2[1].value != ""){
                steps[1].classList.add('complete');
            }else{
                steps[1].classList.remove('complete');
            }
        }
    });
});

YesinputsStep2.forEach((input, index) => {
    input.addEventListener('input', function(e) {
        if(YesinputsStep2[0].value != "" && YesinputsStep2[1].value != ""){
            steps[1].classList.add('complete');
        }else{
            steps[1].classList.remove('complete');
        }
    });
});


// Verification for step 3
const textInputStep3 = Array.from(steps[2].querySelectorAll('input[type="text"]'));
const question3Inputs = Array.from(steps[2].querySelectorAll('#step3_3 input[type="radio"]'));
const Quest3Yes = steps[2].querySelector('#step3_3_yes');
const Quest3No = steps[2].querySelector('#step3_3_no');


textInputStep3.forEach((input, index) => {
    input.addEventListener('input', function(e) {
        if(textInputStep3[0].value != "" && textInputStep3[1].value != ""){
            steps[2].classList.add('complete');
        }else{
            steps[2].classList.remove('complete');
        }
    });
});


question3Inputs.forEach((input, index) => {
    input.addEventListener('click', function(e) {
        if(e.target.checked && e.target.value == 'no'){
            Quest3Yes.classList.add('hide');
            Quest3No.classList.remove('hide');
        }else if(e.target.value == 'yes'){
            Quest3No.classList.add('hide');
            Quest3Yes.classList.remove('hide');
            if(textInputStep3[0].value != "" && textInputStep3[1].value != "" && Quest3Yes.children[0].value != ""){
                steps[2].classList.add('complete');
            }else{
                steps[2].classList.remove('complete');
            }
        }
    });
});

Quest3Yes.children[0].addEventListener('input', function(e){
    if(textInputStep3[0].value != "" && textInputStep3[1].value != "" && Quest3Yes.children[0].value != ""){
        steps[2].classList.add('complete');
    }else{
        steps[2].classList.remove('complete');
    }
});


// Verification for step 4
const questionStep4 = Array.from(steps[3].querySelectorAll('.question'));
questionStep4.forEach((question, index) => {
    question.querySelectorAll('input[type="radio"]').forEach((input, index) => {
        input.addEventListener('click', function(e) {
            let quest1IsChecked = questionStep4[0].querySelector('input[type="radio"]:checked');
            let quest2IsChecked = questionStep4[1].querySelector('input[type="radio"]:checked');
            if(quest2IsChecked && quest1IsChecked ){
                steps[3].classList.add('complete');
            }else{
                steps[3].classList.remove('complete');
            }
        });
    });
})
