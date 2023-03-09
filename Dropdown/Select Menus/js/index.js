window.addEventListener('load', function(){   
    
    
    
    /*셀렉트 메뉴 클릭시 */
    let btnPick = document.querySelectorAll('.pick');
    btnPick.forEach(element => {
        element.addEventListener('click', eventPick);     
    });

    /*셀렉트 메뉴 리스트 클릭시 */
    let selectLi = document.querySelectorAll('.select_sub > .inner > li');    
    selectLi.forEach(element => {
        element.addEventListener('click', eventLi);    
    });

    /*리셋 */
    let body = document.querySelector('body');
    let selectDiv = document.querySelectorAll('.select_div');  

        body.addEventListener('click' , resetList);

});





    /*셀렉트 메뉴 클릭시 */
    const eventPick = (e) => {
        let target = e.currentTarget;
        let parent = target.parentNode;
        let parentOn = parent.classList.contains('on');
        let btnPick = document.querySelectorAll('.pick');
        let ul = parent.querySelector('.select_sub');   
        let ulInner = ul.querySelector('.inner');      
        let ulInnerH = ulInner.querySelector('li').clientHeight;
        let length = ulInner.children.length;  
        


        if(parentOn){        
            
            ul.style.height = '0em';
            parent.classList.remove('on'); 
            
        }else {
            for(btn of btnPick){            
                btn.nextElementSibling.style.height = '0em';
                btn.parentNode.classList.remove('on');             
            }        
            ul.style.height = ((ulInnerH * length) + 22) + 'px';
            parent.classList.add('on');
            
            
        }
    }

/*셀렉트 메뉴 리스트 클릭시 */
const eventLi = (e) => {
    let target = e.currentTarget;
    let parent = target.parentNode.parentNode.parentNode;
    
    target.parentNode.parentNode.style.height = '0em';
    parent.classList.remove('on');    

}


/*셀렉트 메뉴 리스트 외 클릭 시 */
const resetList = (e) => {    

    let selectDiv = document.querySelectorAll('.select_div');   
    let etargetN = e.target.classList.contains('select_div');
    let etargetPN = e.target.parentElement.parentElement.classList.contains('select_div');

   
    if(!etargetN && !etargetPN){
        for(menu of selectDiv){
            let ul = menu.querySelector('.select_sub');  
            ul.style.height = '0em';
            menu.classList.remove('on');    
        }
    }
                

};
