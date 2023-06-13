const steps = Array.from(document.querySelectorAll('#newbcustomizeralienx .newbcustomizeralienx_step'));
const sponsorInputs = Array.from(document.querySelectorAll('#newbcustomizeralienx .sponsor_in'));
const btnSponsorInputs = Array.from(document.querySelectorAll('#newbcustomizeralienx .sponsor_in-clear-button'));
let currentStep = 0;


/* Intialize Navigation */

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


/* Intialize Sponsor Input */

sponsorInputs.forEach((inpt, index) => {
    inpt.addEventListener('input', function(e) {
        if (e.target.value && !inpt.classList.contains("sponsor_in--touched")) {
            inpt.classList.add("sponsor_in--touched")
        } else if (!e.target.value && inpt.classList.contains("sponsor_in--touched")) {
            inpt.classList.remove("sponsor_in--touched")
        }
    });
});

btnSponsorInputs.forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
        sponsorInputs[index].value = ''
        sponsorInputs[index].focus()
        sponsorInputs[index].classList.remove("sponsor_in--touched")
    });
});
