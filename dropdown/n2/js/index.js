window.addEventListener('load', function(){   
        
    //메뉴01 리스트 클릭 시
    let submenuM01groupLIA = document.querySelectorAll('.group-box  .ul-group > li > .tit_n01');
    
    submenuM01groupLIA.forEach(element => {
        element.addEventListener('click',subM01LiClick);
    });   

});


const subM01LiClick = (e) => {
    e.preventDefault();

    let target = e.currentTarget;
    let parent = target.parentElement;
    let hasOn = parent.classList.contains('on');    

    let submenuM01groupLI = document.querySelectorAll('.group-box  .ul-group > li');
    
    if(!hasOn){
        submenuM01groupLI.forEach(element => {
            element.classList.remove('on');
        });
    
        parent.classList.add('on');
    }else {
        submenuM01groupLI.forEach(element => {
            element.classList.remove('on');
        });
    
        parent.classList.remove('on');
    }   


}
