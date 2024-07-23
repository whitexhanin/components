window.addEventListener('load',function(){

    let btnPopup = document.querySelectorAll('.btn-pop2');
    btnPopup.forEach(element => {
        element.addEventListener('click',popupOpen);        
    });


    let btnPopup3 = document.querySelectorAll('.btn-pop3');
    btnPopup3.forEach(element => {
        element.addEventListener('click',popupOpen3);        
    });

    let dim = document.querySelectorAll('.dim');
    dim.forEach(element => {
        element.addEventListener('click',popupClose);         
    });  

    let dim3 = document.querySelectorAll('.dim3');    
    dim3.forEach(element => {
        element.addEventListener('click',popupClose3);         
    });     
    
    let btnClose2 = document.querySelectorAll('.btn-close2');
    btnClose2.forEach(element => {
        element.addEventListener('click',popupClose);         
    });    

    let btnCancle = document.querySelectorAll('.btn-cancle');     
    btnCancle.forEach(element => {
        element.addEventListener('click',popupClose);         
    });

    let btnClose3 = document.querySelectorAll('.btn-close3');
    btnClose3.forEach(element => {
        element.addEventListener('click',popupClose3);         
    });    

    let btnCancle3 = document.querySelectorAll('.btn-cancle3');     
    btnCancle3.forEach(element => {
        element.addEventListener('click',popupClose3);         
    });

})

const popupOpen = (e) => {
    let target = e.currentTarget;
    let dataPop = target.getAttribute('data-pop');    
    let popup = document.querySelector(`.popup[data-pop=${dataPop}]`);
    let dim = document.querySelector('.dim');

    target.classList.add('on');
    popup.classList.add('on');
    dim.classList.add('on');  
    if(dataPop == 'p2'){
        viewCondition(e,popup);
    } 
    if(dataPop == 'p2' || dataPop == 'p6' ){
        // dateRangeEvt();  
        // dateMonthEvt();  
    }     
}

const popupOpen3 = (e) => {
    let target = e.currentTarget;
    let dataPop = target.getAttribute('data-pop');    
    let popup = document.querySelector(`.inpopup[data-pop=${dataPop}]`);
    let dim = document.querySelector('.dim3');

    target.classList.add('on');
    popup.classList.add('on');
    dim.classList.add('on');
}

const popupClose = () => {
    let popupOn = document.querySelector('.popup.on');
    let dim = document.querySelector('.dim');
    let dataPop = popupOn.getAttribute('data-pop');  
    let btnPopup = document.querySelector(`.btn-pop2[data-pop=${dataPop}]`);

    popupOn.classList.remove('on');
    dim.classList.remove('on');
    btnPopup.classList.remove('on');

}

const popupClose3 = () => {
    let popupOn = document.querySelector('.inpopup.on');
    let dim = document.querySelector('.dim3');
    let dataPop = popupOn.getAttribute('data-pop');  
    let btnPopup = document.querySelector(`.btn-pop3[data-pop=${dataPop}]`);

    popupOn.classList.remove('on');
    dim.classList.remove('on');
    btnPopup.classList.remove('on');

}






