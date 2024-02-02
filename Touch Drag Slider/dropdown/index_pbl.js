window.addEventListener('load', function(){   
    
    /*셀렉트 메뉴 클릭시 */
    let btnPick = document.querySelectorAll('.pick');
    btnPick.forEach(element => {
        element.addEventListener('click', btnPickClick);     
    });    

    /*셀렉트 메뉴 리스트 클릭시 */
    let dropdownLi = document.querySelectorAll('.dropdown_sub > .inner > li');    
    dropdownLi.forEach(element => {
        element.addEventListener('click', listClick);    
    });

    /*리셋 */
    let body = document.querySelector('body');    
    body.addEventListener('click' , resetDropdown);

});

    /*셀렉트 메뉴 클릭시 */
    const btnPickClick = (e) => {
        let target = e.currentTarget;
        let dropdownDiv = target.closest('.dropdown');
        let dropdownDivOn = dropdownDiv.classList.contains('on');
        let btnPick = document.querySelectorAll('.pick');

        if(dropdownDivOn){                    
            dropdownDiv.classList.remove('on'); 
            dropdownDiv.classList.remove('pageon');
            
        }else {
            for(btn of btnPick){                     
                let btnDiv = btn.closest('.dropdown');                               
                btnDiv.classList.remove('on');             
            }        
            dropdownDiv.classList.add('on');
            dropdownDiv.classList.add('pageon');
        }
    }


/*셀렉트 메뉴 리스트 클릭시 */
const listClick = (e) => {
    let target = e.currentTarget;
    let dropdownDiv = target.closest('.dropdown');   
    let inner =  dropdownDiv.querySelectorAll('.inner > li');
    let hasLion = dropdownDiv.classList.contains('lion');    

        dropdownDiv.classList.remove('on');    
        dropdownDiv.classList.remove('pageon');       

        if(hasLion){
            inner.forEach(element => {
                element.classList.remove('on');
            });

            target.classList.add('on');
        }
}


/*셀렉트 메뉴 리스트 외 클릭 시 */
const resetDropdown = (e) => {    
    let dropdownDiv = document.querySelectorAll('.dropdown');   
    let hasDropdown = e.target.classList.contains('dropdown');
    let closestDropdown = e.target.closest('.dropdown');

    if(!hasDropdown && !closestDropdown){

        for(dropdown of dropdownDiv){   
            dropdown.classList.remove('on');
            dropdown.classList.remove('pageon');
        }
    }   
};
