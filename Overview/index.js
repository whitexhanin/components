window.addEventListener('load',function(){
    let itemList = document.querySelectorAll('.itemlist button');
    itemList.forEach(element => {
        element.addEventListener('click',itemClick);    
    });

    let moreList = document.querySelectorAll('.itemlist .more');
    moreList.forEach(element => {
        element.addEventListener('click',moreClick);    
    });

    
})

const itemClick = (e) => {
    let target = e.currentTarget;
    let name = target.innerText;
    let iframe = document.querySelector('iframe');
    let active = document.querySelector('.itemlist button.active');    
    let more = document.querySelector('.more');
    let subList = target.closest('.sublist');
    let targetLi;
    let targetMore;
    let moreTxt;    

    
    if(!target.classList.contains('more')){
        active.classList.remove('active');
        target.classList.add('active');        

        //타겟이 서브 메뉴 일때 or 아닐때
        if(subList) {
            targetLi = subList.closest('li');
            targetMore = targetLi.querySelector('.more');            
            moreTxt = targetMore.innerText;  
            iframe.setAttribute('src','../'+ moreTxt+'/'+ name +'/index.html');  
        }else{
            iframe.setAttribute('src','../'+ name +'/index.html');  
            if(more.classList.contains('open')){
                more.classList.remove('open');
            }
        }

        
    }    
    
 }
 const moreClick = (e) => {    
    let target = e.currentTarget;    
    let subList = target.closest('li').querySelector('.sublist');
    let subLength = subList.childElementCount;
    
    if(target.classList.contains('open')){
        target.classList.remove('open');
        subList.style.height = '0';
    }else {
        target.classList.add('open');
        subList.style.height = 'calc(48px *'+ subLength+')';
    }
 }