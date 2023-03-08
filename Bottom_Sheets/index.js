window.addEventListener('load', function(){
    
    let con = document.querySelector('.container');        
    con.addEventListener('touchstart', touchStartEvn);        
    con.addEventListener('touchmove', touchMoveEvn);      
    con.addEventListener('touchend', touchEndEvn);   
    
    con.addEventListener('click',function(e){
        setTimeout(plClick(e),3000);    
    });    
    con.addEventListener('keyup',plClick);

    //poi정보 열려있을때 클릭 시 
    window.addEventListener('pointerdown',plReset);
    
});




let startY;
let endY;
let touchEndArr = [];

const touchStartEvn = (e) => {        
    let target = e.target;
    let touchArea;          

    if(target.closest('.touch-area') && !target.closest('.btnnv')){

        touchArea = document.querySelector('.touch-area');  
                  
        startY = e.touches[0].clientY;            
                        
    }        

}
let i  = 0;

const touchMoveEvn = (e) => {   
    let target = e.target;
    if(target.closest('.touch-area') && !target.closest('.btnnv')){

    touchArea = document.querySelector('.touch-area');  
    itemH = touchArea.clientHeight;
    let H = e.touches[0].clientY;
    


    touchEndArr.push(e.touches[0].clientY);                


}
    
    
}
const touchEndEvn = (e) => {  
    let target = e.target;
    if(target.closest('.touch-area') && !target.closest('.btnnv')){      
        touchArea = document.querySelector('.touch-area');  
        itemH = touchArea.clientHeight;
        let body = document.querySelector('body').clientHeight;
        let nav = document.querySelector('header').clientHeight;        

        let scroll = document.querySelector('.card .scroll');        
        let scrollUl = scroll.querySelector('ul');
        let scrolltagArea = scroll.querySelector('.tag-area2');
       
        
        let pd = 62;        
        let cost = body - nav - pd;;
        let tAscrTop = touchArea.scrollTop;

        let d3Area = document.querySelector('.d3-area');   
        
        cost = body - nav - pd;

        let scrollHeight = cost - 91;
        let scrollInner = scrollUl.clientHeight + scrolltagArea.clientHeight + 30;
        


        if(target.closest('.scroll')){
            if(scrollHeight > scrollInner){              
                touchMotion(e);
            }
        }else {
            touchMotion(e);
        }
    }
}    
const plClick = (e) => {  

    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown' || e.type === 'click') {
        let target = e.target;
        if(target.closest('.touch-area') && !target.closest('.btnnv') && !target.closest('.scroll')){   
            
            touchArea = document.querySelector('.touch-area');  
            itemH = touchArea.clientHeight;
            let body = document.querySelector('body').clientHeight;
            let nav = document.querySelector('header').clientHeight;            
            let scroll = document.querySelector('.card .scroll');            
            let pd = 62;        
            let cost = body - nav - pd;
            let tAscrTop = touchArea.scrollTop;
            let d3Area = document.querySelector('.d3-area');       

            if(touchArea.classList.contains('open')){   

                touchArea.classList.remove('open');
                touchArea.style.top = 'calc(100% - 9.9rem)';
                touchArea.style.overflow = 'hidden';
                scroll.style.overflow = 'hidden';
            }else {
                touchArea.classList.add('open');        
                touchArea.style.overflow = 'auto';           
                scroll.style.overflow = 'auto';
        
                if(itemH > cost){
                    touchArea.style.top = 'calc(100% - '+ cost +'px)';
                    touchArea.style.height = cost+'px';
                    scroll.style.height = 'calc(-91px + '+ cost +'px)';            
                }else{
                    touchArea.style.top = 'calc(100% - '+ itemH +'px)';
                    touchArea.style.height = itemH+'px';            
                }        
                
                tAscrTop = 0;
            }  
            touchEndArr = [];
        }
    }
}    

const touchMotion = (e) => {
    touchArea = document.querySelector('.touch-area');  
    itemH = touchArea.clientHeight;
    let body = document.querySelector('body').clientHeight;
    let nav = document.querySelector('header').clientHeight;    
    let scroll = document.querySelector('.card .scroll');            
    let pd = 62;        
    let cost = body - nav - pd;
    let tAscrTop = touchArea.scrollTop;
    let d3Area = document.querySelector('.d3-area');  

    if(touchEndArr[0] < touchEndArr[touchEndArr.length - 1] && tAscrTop === 0){

        touchArea.classList.remove('open');
        touchArea.style.top = 'calc(100% - 9.9rem)';        
        
        touchArea.style.overflow = 'hidden';
        scroll.style.overflow = 'hidden';        


    }else if(touchEndArr[0] > touchEndArr[touchEndArr.length - 1]) {
        touchArea.classList.add('open');        
        touchArea.style.overflow = 'auto';           
        scroll.style.overflow = 'auto';

        if(itemH > cost){
            touchArea.style.top = 'calc(100% - '+ cost +'px)';
            touchArea.style.height = cost+'px';
            scroll.style.height = 'calc(-91px + '+ cost +'px)';            
        }else{
            touchArea.style.top = 'calc(100% - '+ itemH +'px)';
            touchArea.style.height = itemH+'px';            
        }        
        
        tAscrTop = 0;
    }
    touchEndArr = [];


}

const poiClick = (e) =>{
    
    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown') {
        let plArea = document.querySelector('.pl-area');
        let target = e.currentTarget;
        let dataSub = target.getAttribute('data-sub');
        // let d3Area = document.querySelector('.d3-area');

        if(dataSub == 'true'){
            plArea.setAttribute('class','pl-area touch-area on havelist');
            
        }else {
            plArea.setAttribute('class','pl-area on');
        }     
        
        plArea.style.top = 'calc(100% - 9.9rem)';
        // d3Area.classList.add('st01'); 
    }

}

const plReset = (e) => {
    let target = e.target;    
    let plArea = document.querySelector('.pl-area');
    let scroll = document.querySelector('.card .scroll');  
    let d3Area = document.querySelector('.d3-area');    

    //만약 poi 정보가  열려있을때 누르면    
    if(!target.closest('.pl-area') && plArea.classList.contains('on') && !target.closest('canvas')){

        if(!plArea.classList.contains('open')){
            plArea.classList.remove('on');
            plArea.style.top = 'calc(100% + 1rem)';
            // d3Area.classList.remove('st01'); 
        }else {
            plArea.classList.remove('open');
            plArea.style.top = 'calc(100% - 9.9rem)';
            plArea.style.overflow = 'hidden';
            if(scroll){
                scroll.style.overflow = 'hidden';
            }
            
        }
    }
    // if(d3Area.classList.contains('st02') && !target.closest('header') && !target.closest('.d3btn') && !target.closest('.qr')&& !target.closest('.poct')){

    //     let poct = document.querySelector('.poct');
    //     let selfl = document.querySelector('.selfl');
        
        
    //         // d3Area.classList.remove('st02'); 
    //         poct.classList.remove('on');
    //         selfl.classList.remove('disable');
    // }
}




