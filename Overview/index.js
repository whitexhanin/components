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
    let target = e.type === 'click' ? e.currentTarget : e    
    let name = target.innerText;
    let iframe = document.querySelector('iframe');
    let active = document.querySelector('.itemlist button.active');    
    let subList = target.closest('.sublist');
    let targetLi;
    let targetMore;
    let moreTxt;    
    let overviewContainer = document.querySelector('.overviewcontainer');     

    
    if(!target.classList.contains('more')){
        active?.classList.remove('active');
        target.classList.add('active');        
        
        if(subList) {
            targetLi = subList.closest('li');
            targetMore = targetLi.querySelector('.more');            
            moreTxt = targetMore.innerText;  
            iframe.setAttribute('src',`../${moreTxt}/${name}/index.html`);  
        }else{
            if(name !== 'Overview'){                
                iframe.setAttribute('src',`../${name}/index.html`);                  
            }

            openReset();           
        }
           

        if(name == 'Overview'){
            iframe.classList.remove('on');
            overviewContainer.classList.add('on');
        }else {
            overviewContainer.classList.remove('on');
            iframe.classList.add('on');            
        }
    }    
    
 }
 const moreClick = (e) => {    
    let target = e.type === 'click' ? e.currentTarget : e       
    let subList = target.closest('li').querySelector('.sublist');
    let subLength = subList.childElementCount;
    
    if(target.classList.contains('open')){
        target.classList.remove('open');
        subList.style.height = '0';
    }else {        
        openReset();          
        target.classList.add('open');
        subList.style.height = `calc(48px * ${subLength})`;
    }
 }

 const openReset = () => {
    let open = document.querySelector('.open');
    let openSub;

    if(open){
        openSub = open.closest('li').querySelector('.sublist');
        open.classList.remove('open');
        openSub.style.height = '0';   
    }
 } 