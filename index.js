const textCards = Array.from(document.querySelectorAll('#infotabsslider160323 .container_text_card .text_card'));
const images = Array.from(document.querySelectorAll('#infotabsslider160323 .container_image img'));
let isPaused = false;
let time = 1;
let currentIndex = document.querySelector('#infotabsslider160323 .container_text_card .text_card.active') ? 0 : null;

textCards.forEach((textCard, textCardIndex) => {
    textCard.addEventListener('click', function(e){
        textCards.forEach((currTextCard, currTextCardIndex) => {
            if(textCard === currTextCard){
                currTextCard.classList.add('active');
                images[currTextCardIndex].classList.add('active');
                time = 1;
                currentIndex = currTextCardIndex;
            }else{
                currTextCard.classList.remove('active');
                images[currTextCardIndex].classList.remove('active');
            }
        });
    })
});

if(currentIndex != null){
    setInterval(() => {
        if(!isPaused){
            if(time === 5){
                textCards[currentIndex].classList.remove('active');
                images[currentIndex].classList.remove('active');
                if(currentIndex === textCards.length - 1){
                    textCards[0].classList.add('active');
                    images[0].classList.add('active');
                    currentIndex = 0;
                }else{
                    textCards[currentIndex + 1].classList.add('active');
                    images[currentIndex + 1].classList.add('active');
                    currentIndex =  currentIndex + 1;
                }
                time = 1; 
            }else{
                time = time + 1;
            }
        }
    }, 1000);
}


function onPause() {
    isPaused = true;
}

function onResume() {
    isPaused = false;
}
