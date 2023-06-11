const steps = Array.from(document.querySelectorAll('#newbcustomizeralienx .newbcustomizeralienx_step'));
let currentStep = 0;

steps.forEach((step, index) => {
    step.querySelector('.action_btn.next').addEventListener('click', function(e) {
        e.preventDefault();
        if(currentStep < steps.length - 1) {
            steps[currentStep].classList.add('finish');
            currentStep = currentStep + 1;
            steps[currentStep].classList.add('active');
        }
    });
    step.querySelector('.action_btn.prev').addEventListener('click', function(e) {
        e.preventDefault();
        console.log(currentStep)
        if(currentStep > 0) {
            steps[currentStep].classList.remove('active');
            currentStep = currentStep - 1;
            steps[currentStep].classList.remove('finish');
        }
    });
});
