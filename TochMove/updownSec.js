window.addEventListener('load', function () {   
    
    const touchMove1 = new TouchMove('touchzone1');
    const touchMove2 = new TouchMove('touchzone2');    


});

function TouchMove(name) {

    let body = document.querySelector('body');
    let touchZone = document.querySelector('.'+ name);
    let touchItem = touchZone.querySelectorAll('li');      
    let eMoveY = []; 

    let wintopY = touchZone.getBoundingClientRect().top;
    let eTarget;


    let mouseevent = false;
    let targetOffTop;      
    let timerStamp = [];
    let timer;
   

    touchItem.forEach(element => {        

        element.addEventListener('mousedown', function (e) {  
            eTarget = e.currentTarget;
            ItemOffsetTop(name);    

            if( e.type == 'mousedown' ){
                mouseevent = true;
            }

        });

        document.addEventListener('mousemove', function (e) {            
            
            if(mouseevent){
                if(touchZone.scrollTop !== 0){
                    targetOffTop = wintopY - touchZone.scrollTop;    
                }else{
                    targetOffTop = wintopY;
                }
                
                eMoveY.push(
                    Math.sign(e.clientY) == -1 ? 0 : e.clientY - targetOffTop          
                );                

                eTarget.style.position = 'absolute';     
                eTarget.style.top = eMoveY[eMoveY.length-1]+'px';                    
                eTarget.style.background = 'rgba(0,0,0,0.5)';

                if(eMoveY.length > 0){                                 
                    near(eTarget , eMoveY , name);                             
                }
            }

        });
        document.addEventListener('mouseup', function (e) {  

             if(mouseevent){
            
                eTarget.style.position = 'static';
                eTarget.style.top = 'initial';  
                eTarget.style.background = 'initial';

                touchItem.forEach(element => {
                    element.style.marginTop = '0px';
                    element.style.marginBottom = '0px';
                });

                eMoveY = [];
                ItemOffsetTop(name);
                mouseevent = false;
            }

        });

        element.addEventListener('touchstart', function (e) {  
            eTarget = e.currentTarget;            
                   
                timerStamp.push(e.timeStamp);
                eTarget.style.opacity = '0.5';

                ItemOffsetTop(name);    

            timer = setTimeout(() => {
                
                eTarget.classList.add('touchstyle');
                body.classList.add('touchdevice');
            },700);

            if(Math.abs(timerStamp[0]-timerStamp[1]) < 700){
                clearTimeout(timer);
            }              
        });     

        element.addEventListener('touchmove', function (e) {      

            if(touchZone.scrollTop !== 0){
                targetOffTop = wintopY - touchZone.scrollTop;    
            }else{
                targetOffTop = wintopY;
            }

            timerStamp.push(e.timeStamp);
            if(Math.abs(timerStamp[0]-timerStamp[1]) > 700){
                clearTimeout(timer);

                touchZone.style.overflowY = 'hidden';
                eMoveY.push(
                    Math.sign(e.changedTouches[0].clientY) == -1 ? 0 : e.changedTouches[0].clientY - targetOffTop                
                );

                eTarget.style.position = 'absolute';       
                eTarget.style.top = eMoveY[eMoveY.length-1] +'px';  

                if(eMoveY.length > 0){                       
                    near(eTarget , eMoveY , name);                             
                }
                
            }
                       
        });  

        element.addEventListener('touchend', function (e) {       
                
                eTarget.style.position = 'static';
                eTarget.style.top = 'initial';                  
                eTarget.classList.remove('touchstyle');
                body.classList.remove('touchdevice');
    
                touchItem.forEach(element => {
                    element.style.marginTop = '0px';
                    element.style.marginBottom = '0px';
                });
    
                eMoveY = [];
                ItemOffsetTop(name);
                touchZone.style.overflowY = 'auto';
                eTarget.style.opacity = '1';
                

            timerStamp = [];
            clearTimeout(timer);

        }); 
    });
}


const near = (eTarget , eMoveY , name) => {


    let touchZone = document.querySelector('.'+name);
    let touchItem = touchZone.querySelectorAll('li');
    let curArr;
    let touchItemarr = [...touchItem];
    let nearTopArr = [];
    let currentTop;
    let nearTop;
    let secLiTop;


    touchItemarr.map((element,idx) => {
        let top = Number(element.getAttribute('data-top'));
        currentTop = eMoveY[eMoveY.length-1];
        curArr = [];
          
        curArr.push(currentTop);
        nearTop = Math.abs(currentTop - top);

        nearTopArr.push(nearTop);
        
        if(idx == 1){
            secLiTop = element.getAttribute('data-top');
        }
    });    

    let minnear = Math.min(...nearTopArr);
    let minnearidx = nearTopArr.indexOf(minnear);

    if((eMoveY[eMoveY.length-1] <= 15)  || Math.sign(eMoveY[eMoveY.length-1]) == -1){
        minnearidx = nearTopArr.indexOf(minnear);
    }
    else {
        minnearidx = nearTopArr.indexOf(minnear);
    }
        
    if((eMoveY[eMoveY.length-1] <= 15)  || Math.sign(eMoveY[eMoveY.length-1]) == -1){
        touchItemarr.forEach(element => {
            element.style.marginTop = '0px';
            element.style.marginBottom = '0px';
        });
        
        touchItemarr[minnearidx].style.marginTop = '25px';
        touchItemarr[minnearidx].insertAdjacentElement('beforebegin', eTarget);
                
    } else {
        touchItemarr.forEach(element => {
            element.style.marginTop = '0px';
            element.style.marginBottom = '0px';
        });
        touchItemarr[minnearidx].style.marginBottom = '25px';
        touchItemarr[minnearidx].insertAdjacentElement('afterend', eTarget);
    }
        
}

const ItemOffsetTop = (name) => {    
    let touchZone = document.querySelector('.'+name);
    let touchItem = touchZone.querySelectorAll('li');
    touchItem.forEach((element , idx) => {       
        if(idx == 0){
            element.setAttribute('data-top', element.offsetTop);
        }else{
            element.setAttribute('data-top', (element.offsetTop + 15));
        }
    });     
}





