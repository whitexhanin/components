
//애니메이션 순서 카운트

//0.2배수 증감
// let aniNo02 = 0;
// //1배수 증감
// let aniNo1 = 0;
// //2배수 증감
// let aniNo2 = 0; 
// //3배수 증감
// let aniNo3 = 0; 

// //애니메이션 중지
// let stopNo1 = 9;
// let stopNo2 = 50;
// let stopNo3 = 1;

// window.addEventListener('mousewheel', function(e) {         

//     console.log(e.wheelDelta);    
  
//     let matrix1 = document.querySelector('.matrix1');    
//     let matrix2 = document.querySelector('.matrix2');   
//     let matrix3 = document.querySelector('.matrix3'); 

//     let mx1top = matrix1.offsetTop;
//     let mx2top = matrix2.offsetTop;
//     let mx3top = matrix3.offsetTop;

//     let windowY = window.scrollY;
//     let mtx1Top = mx1top + windowY;
//     let mtx2Top = mx2top + windowY;
//     let mtx3Top = mx3top + windowY;
//     console.log(windowY);
//     console.log('windowY:', windowY, 'mx1Top:', mx1top  ,'mx2Top:', mx2top,'mx3Top:', mx3top)
//     console.log('windowY:', windowY, 'mtx1Top:', mtx1Top  ,'mtx2Top:', mtx2Top,'mtx3Top:', mtx3Top)
//     console.log('e.deltaY:',e.deltaY,'aniNo1',aniNo1,'aniNo2',aniNo2,'aniNo3',aniNo3);

//     let assign = Math.sign(e.deltaY) === -1 ? '-' : '+';

//     //scr-event[1]과 src-event[2] 사이에 있을 때
//     if(mx1top < windowY && windowY < mx2top){
//         console.log('1번째 scr-event');
//         //aniNo1 = 0;
//         //aniNo2 = 0;
//         //aniNo3 = 0;
//         matrix1.style.transform = `scale(calc(1 + ${aniNo2}))`  
//         matrix1.style.opacity = `calc(0.15 + 0.${aniNo3})`
//         matrix1.classList.add('sticky');

//     }else if(mx2top < windowY && windowY < mx3top){
//         matrix2.style.transform = `scale(calc(${aniNo02}))`
//     }else if(mx3top < windowY){    
//         matrix3.style.transform = `scale(calc(${aniNo3}))`    
//     }

//     //scr-event[i]와 windowY 사이에 있는 scr-event 찾기


        


//     //스크롤 높이와 가장 가까운 scr-event 태그 찾기 filter
//     // let scrEvent = document.querySelectorAll('.scr-event');
//     // let scrEventArr = Array.from(scrEvent);
//     // let scrEventArrFilter = scrEventArr.filter(function(item){
//     //     return item.offsetTop - windowY >= 0;
//     // });
//     // console.log(scrEventArr);
//     // console.log(scrEventArrFilter);

//     // let scrEventNearIndex = scrEventArr.findIndex(function(item){
//     //     console.log(item.nextElementSibling);
//     //     return item.offsetTop < windowY && windowY < item.nextElementSibling.offsetTop;        
//     // });
    
//     // console.log('scrEventNearIndex',scrEventNearIndex);

//     // let scrEventArrFilterMin = Math.min.apply(null, scrEventArrFilter.map(function(item){
//     //     return item.offsetTop - windowY;
//     // }));

//     // console.log('scrEventArrFilterMin',scrEventArrFilterMin);

//     // let scrEventArrFilterMinIndex = scrEventArrFilter.findIndex(function(item){
//     //     return item.offsetTop - windowY === scrEventArrFilterMin; 
//     // });

//     // console.log('scrEventArrFilterMinIndex',scrEventArrFilterMinIndex);

//     // let scrEventArrFilterMinItem = scrEventArrFilter[scrEventArrFilterMinIndex];
//     // let scrEventArrFilterMinItemIndex = scrEventArrFilterMinItem.getAttribute('data-index');
    
//     // console.log('scrEventArrFilterMinItemIndex',scrEventArrFilterMinItemIndex);


//     //음수이면 위로
//     //각각의 scr-event에 aniNo1, aniNo2, aniNo3
//     //aniNo1은 0.2배수 증감



//     console.log(assign);
//     console.log(new Function(`aniNo2 = 1 ${assign} 2`));
    
//     if( Math.sign(e.deltaY) === -1){         

//         if(1 >= aniNo3){
//             if(1 < aniNo2){                             
//                 // console.log(new Function('aniNo2 = aniNo2 assign 2'));
//                 aniNo2 = aniNo2 - 2;

//                 if(0 < aniNo3){
//                     aniNo3 = aniNo3 - 3;
//                 }
//             }    
//         } 
//         if(stopNo3 >= aniNo02 && 0 <= aniNo02){
//             aniNo02 = (aniNo02 - 0.2).toFixed(1);             
//         }

//     //양수이면 아래로
//     }else if(Math.sign(e.deltaY) === 1){        
//             aniNo2 = aniNo2 + 2;   
//             aniNo3 = aniNo3 + 3;
//             aniNo02 = aniNo02 + 0.2;     
//             //소수점 1자리까지만 표시
//             aniNo02 = aniNo02 !== 1 || aniNo02 !== 0 ? aniNo02.substring(0, aniNo02.length - 1) : aniNo02;
//             // if(stopNo2 > aniNo2 && stopNo1 == aniNo3){                    
//             //     aniNo2 = aniNo2 + 2;                    
//             // }           
    
//             // if(stopNo1 > aniNo3) {
//             //     aniNo3 = aniNo3 + 3;
//             // }   
        

//         // if(stopNo2 <= aniNo2 && stopNo3 > aniNo02){            
//         //     aniNo02 = aniNo02 + 0.2;     
//         //     //소수점 1자리까지만 표시
//         //     aniNo02 = aniNo02 !== 1 || aniNo02 !== 0 ? aniNo02.substring(0, aniNo02.length - 1) : aniNo02;
//         // }
//     } 

//     //
    
//     // matrix2.style.transform = `scale(calc(${aniNo3}))`

// });

window.addEventListener('load' , function(){

    //Video Control Scrolling Mode
    let v0 = document.querySelector('#v0');
    v0.pause();
    window.addEventListener('scroll', function() {
        v0.pause();
    });

    setInterval(function(){
        v0.currentTime = (window.scrollY / 400);
    },40);
})


let aniNo1 = 0;
let aniNo3 = 0;
let aniNo2 = 0;

window.addEventListener('mousewheel', function(e) {

    let windowY = window.scrollY;
    let scrEvent = document.querySelectorAll('.scr-event');    
    let scrEventArr = Array.from(scrEvent);  

    let scrEventTop = scrEventArr.map(function(item){
        return item.offsetTop;
    }); 
    let scrEventHeight = scrEventArr.map(function(item){
        return item.offsetHeight;
    });
    let scrEventBottom = scrEventTop.map(function(item, index){
        return item + scrEventHeight[index];
    }); 
    let scrEventFindIndex  = scrEventBottom.findIndex(function(item , index){
        console.log(windowY , scrEventTop[index] , item , windowY);
        return windowY >= scrEventTop[index] && item >= windowY;
    });
    
    scrEventFindIndex = scrEventFindIndex < 0 ? scrEvent.length-1 : scrEventFindIndex;

    // let N3end = 1 < aniNo3 ? 1 : 0;
    // let N2end = 40 < aniNo2 ? 40 : 0;
    // aniNo1 = 0 <= aniNo1 && 9 > aniNo1 ? aniNo1 + 1 : null;     
    // aniNo3 = 0 <= aniNo3 && 9 > aniNo3 ? aniNo3 + 1 : N3end;  
    
    
    // console.log(aniNo3);

    // aniNo2 = aniNo3 === 7 || 1 < aniNo2 && 40 > aniNo2 ? aniNo2 + 2 : N2end;     

    console.log(scrEventFindIndex);

    if(e.deltaY > 0){
        console.log('down');
    }else if(e.deltaY < 0){
        console.log('up');
    }

    let scrEventEle = scrEventArr[scrEventFindIndex];

    console.log(scrEventEle);
    scrEventEle.classList.add('sticky');
    // scrEventEle.style.opacity = `calc(0.15 + 0.${aniNo3})`
    // scrEventEle.style.transform = `scale(calc(1 + ${aniNo2}))`;
    // console.log(scrEventEle);

});









