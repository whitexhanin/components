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

    // Mouse Event    
    let mouseevent = false;
    let targetOffTop;       
    
    let timerStamp = [];
    let moveBool = false;
    let timer;

    
   

    touchItem.forEach(element => {

        // mouseevent tranlate
        element.addEventListener('touchstart', function (e) {  
            eTarget = e.currentTarget;
            
                   
                timerStamp.push(e.timeStamp);
                eTarget.style.opacity = '0.5';

                ItemOffsetTop(name);    

            timer = setTimeout(() => {
                eTarget.style.background = 'red';
                //NO PTR                 
                body.classList.add('touchdevice');
            },700);

            if(Math.abs(timerStamp[0]-timerStamp[1]) < 700){
                clearTimeout(timer);
            }
              
        });     

        element.addEventListener('mousedown', function (e) {  

            eTarget = e.currentTarget;
            ItemOffsetTop(name);          
            
            if( e.type == 'mousedown' ){
                mouseevent = true;
            }

        });

        document.addEventListener('mousemove', function (e) {            
            
            //마우스 down이벤트 true 일때만
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
             //마우스 down이벤트 true 일때만
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
        element.addEventListener('touchmove', function (e) {      
            

            if(touchZone.scrollTop !== 0){
                targetOffTop = wintopY - touchZone.scrollTop;    
            }else{
                targetOffTop = wintopY;
            }

            timerStamp.push(e.timeStamp);
            console.log(Math.abs(timerStamp[0]-timerStamp[1]));
            console.log(Math.abs(timerStamp[0]-timerStamp[1]) > 700)
            if(Math.abs(timerStamp[0]-timerStamp[1]) > 700){
                clearTimeout(timer);
                // eTarget.style.background = 'red';
                console.log(moveBool);
                console.dir(touchZone);
                touchZone.style.overflowY = 'hidden';
                eMoveY.push(
                    Math.sign(e.changedTouches[0].clientY) == -1 ? 0 : e.changedTouches[0].clientY - targetOffTop                
                );
                // console.log(eMoveY);
                // console.log(eMoveY[eMoveY.length-1]);
                console.log(eTarget);
                eTarget.style.position = 'absolute';       
                eTarget.style.top = eMoveY[eMoveY.length-1] +'px';  
                // eTarget.style.background = 'rgba(0,0,0,0.5)';
                // e.currentTarget.style.padding = '12px 0px';
                console.log(eMoveY[eMoveY.length-1]);
                console.log(touchZone.scrollTop);
                console.log((touchZone.clientHeight - eMoveY[eMoveY.length-1]));    
                // if(eMoveY[eMoveY.length-1] >= touchZone.clientHeight){
                //     touchZone.scrollBy(0, Math.abs(touchZone.clientHeight - eMoveY[eMoveY.length-1]));   
                //     console.log((touchZone.clientHeight - eMoveY[eMoveY.length-1]));                 
                // }
                if(eMoveY.length > 0){                       
                    near(eTarget , eMoveY , name);                             
                }
                // moveBool = 2;     

                
            }
            console.log(moveBool);
                       
        });  

        element.addEventListener('touchend', function (e) {       
            // if(moveBool){
                console.log(e.currentTarget);
                console.log(eMoveY);
                
                eTarget.style.position = 'static';
                eTarget.style.top = 'initial';  
                eTarget.style.background = 'initial';
                body.classList.remove('touchdevice');
    
                touchItem.forEach(element => {
                    element.style.marginTop = '0px';
                    element.style.marginBottom = '0px';
                });
    
                eMoveY = [];
                ItemOffsetTop(name);
                touchZone.style.overflowY = 'auto';
                eTarget.style.opacity = '1';
                
            // }   
            moveBool = false;       
            console.log(moveBool);

            timerStamp = [];
            clearTimeout(timer);
            
            


        }); 

        // element.addEventListener('touchcancel', function (e) {            
        //             console.log('캔슬  ');
        //             alert('취소 됐다');
        //             clearTimeout(timer);
        // });              
    });
}


const near = (eTarget , eMoveY , name) => {
    
    // console.log(eMoveY);

    let touchZone = document.querySelector('.'+name);
    let touchItem = touchZone.querySelectorAll('li');
    let curArr;
    console.log(touchItem);

    let touchItemarr = [...touchItem];
    let nearTopArr = [];
    let currentTop;
    let nearTop;
    let secLiTop;

    console.log(touchItemarr);


    touchItemarr.map((element,idx) => {
        console.log(element);
        let top = Number(element.getAttribute('data-top'));
        currentTop = eMoveY[eMoveY.length-1];
        curArr = [];
        // console.log(typeof(currentTop));
        // console.log(top , currentTop);        
        curArr.push(currentTop);
        // let nearTop = Math.sign(currentTop) == -1 ? (top + currentTop) : (top - currentTop)    
        nearTop = Math.abs(currentTop - top);

        //target의 top 값 - li top 값
        nearTopArr.push(nearTop);
        console.log(nearTop);  
        
        if(idx == 1){
            secLiTop = element.getAttribute('data-top');
        }
    });    
    console.log(nearTopArr);
    console.log(curArr);
    console.log(nearTop);       

    let minnear = Math.min(...nearTopArr);
    //0시작 하니 +1 한거고 , li top 과 target 의 top 값을 뺀값
    //가까운 li의 index
    let minnearidx = nearTopArr.indexOf(minnear);
    console.log(minnearidx);
    console.log(secLiTop);

    if((eMoveY[eMoveY.length-1] <= 15)  || Math.sign(eMoveY[eMoveY.length-1]) == -1){
        console.log('rrr1')
        minnearidx = nearTopArr.indexOf(minnear);
    }
    else {
        console.log('rrr2')
        minnearidx = nearTopArr.indexOf(minnear);
    }
    
    console.log(minnearidx , minnear);
    
    


    
    console.log(eMoveY[eMoveY.length-1]);
    console.log(minnearidx);
        
    if((eMoveY[eMoveY.length-1] <= 15)  || Math.sign(eMoveY[eMoveY.length-1]) == -1){
        console.log('첫번째');
        touchItemarr.forEach(element => {
            element.style.marginTop = '0px';
            element.style.marginBottom = '0px';
        });
        
        touchItemarr[minnearidx].style.marginTop = '25px';
        console.log(touchItemarr[minnearidx]);
        console.log(touchItemarr[minnearidx].style.marginTop);
        touchItemarr[minnearidx].insertAdjacentElement('beforebegin', eTarget);
                //0 <= 10  0 <= 50
                //minnear 은 ...nearTopArr 의 최소값
                //0~50
    } else {
        console.log('두번째');
        touchItemarr.forEach(element => {
            element.style.marginTop = '0px';
            element.style.marginBottom = '0px';
        });
        touchItemarr[minnearidx].style.marginBottom = '25px';
        touchItemarr[minnearidx].insertAdjacentElement('afterend', eTarget);
    }
    //0~16 이면 위,
    //17~30 이면 아래, 

    

        
}

const ItemOffsetTop = (name) => {    
    console.log('다시다시');
    let touchZone = document.querySelector('.'+name);
    let touchItem = touchZone.querySelectorAll('li');
    touchItem.forEach((element , idx) => {       
        console.log(idx);
        if(idx == 0){
            element.setAttribute('data-top', element.offsetTop);
        }else{
            element.setAttribute('data-top', (element.offsetTop + 15));
        }
    });     
}





