window.addEventListener('load',function(){

    let jsBtnRandom = document.querySelector('.js-btn-random');
    let popupHonor = document.querySelector('.popup-honor');

    jsBtnRandom.addEventListener('click',function(){
        popupHonor.classList.add('openevent');        

        setTimeout(()=>{
            popupHonor.classList.add('king');
        },2000);        

    });
    
});



