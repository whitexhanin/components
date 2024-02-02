window.addEventListener('load', function(){   
    
    /*셀렉트 메뉴 클릭시 */
    let btnPick = document.querySelectorAll('.pick');
    btnPick.forEach(element => {
        element.addEventListener('click', btnPickClick);     
    });    

    /*셀렉트 메뉴 리스트 클릭시 */
    let selectLi = document.querySelectorAll('.select_sub > .inner > li');    
    selectLi.forEach(element => {
        element.addEventListener('click', listClick);    
    });

    /*리셋 */
    let body = document.querySelector('body');    
    body.addEventListener('click' , resetSelect);

});

    /*셀렉트 메뉴 클릭시 */
    const btnPickClick = (e) => {
        let target = e.currentTarget;
        let selectDiv = target.closest('.Select');
        let selectDivOn = selectDiv.classList.contains('on');
        let btnPick = document.querySelectorAll('.pick');

        if(selectDivOn){                    
            selectDiv.classList.remove('on'); 
            
        }else {
            for(btn of btnPick){     
                let btnDiv = btn.closest('.Select');               
                btnDiv.classList.remove('on');             
            }        
            selectDiv.classList.add('on');
        }
    }


/*셀렉트 메뉴 리스트 클릭시 */
const listClick = (e) => {
    let target = e.currentTarget;
    let selectDiv = target.closest('.Select');    
    let poplist = selectDiv.querySelector('.poplist'); 
    
    if(!poplist){
        selectDiv.classList.remove('on');    
    }    
}


/*셀렉트 메뉴 리스트 외 클릭 시 */
const resetSelect = (e) => {    
    let selectDiv = document.querySelectorAll('.Select');   
    let hasSelect = e.target.classList.contains('Select');
    let closestSelect = e.target.closest('.Select');

    if(!hasSelect && !closestSelect){

        for(select of selectDiv){   
            select.classList.remove('on');
        }
    }   
};
