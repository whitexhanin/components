window.addEventListener('load',function(){    

    //1.POI 정보 리스트 클릭 시 
    let plArea = document.querySelector('.pl-area');
    let list = plArea.querySelector('.poilist');

    if(list.childElementCount > 0){
        let lis = list.querySelectorAll('li');
        lis.forEach(element => {
            element.addEventListener('pointerdown',poiListClick);
            element.addEventListener('keyup',poiListClick);
        });
    }  

    //3.POI 정보 리스트 컨트롤 버튼
    let listup = document.querySelector('.liup');
    listup.addEventListener('pointerdown',listUpClick);
    listup.addEventListener('keyup',listUpClick);

    let listdown = document.querySelector('.lidown');
    listdown.addEventListener('pointerdown',listDownClick);
    listdown.addEventListener('keyup',listDownClick);

});

//POI 정보 리스트 클릭 시 
const poiListClick = (e) => {
    let target = e.currentTarget;
    let tgPin = target.querySelector('.ipin');
    let tgAow = target.querySelector('.iaow');
    
    let plArea = document.querySelector('.pl-area');
    let list = plArea.querySelector('.poilist');
    let liOn = list.querySelector('li.on'); 
    

    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown') {

        if(liOn){
            let liOnPin = liOn.querySelector('.ipin');
            let liOnAow = liOn.querySelector('.iaow');

            
            liOn.classList.remove('on');
            liOnPin.classList.remove('on');
            if(liOnAow){
                liOnAow.classList.remove('on');
            }
            txtALT(tgPin,liOnPin);
        }   
        

        target.classList.add('on');
        tgPin.classList.add('on');

        
        if(tgAow){
            tgAow.classList.add('on');
        }    

        let btnArea = plArea.querySelector('.btn-area');        
        if(btnArea.classList.contains('step03')){
            plBtnReset();
        }        
    }
}


//POI 정보 리스트 컨트롤 버튼 이전 리스트
const listUpClick = (e) => {
    let plArea = document.querySelector('.pl-area');
    let list = plArea.querySelector('.poilist');
    let liOn = list.querySelector('li.on');   
    let firLiOn = list.querySelector('li:first-child');

    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown') {

        if(liOn && !firLiOn.classList.contains('on')){
            let prevli = liOn.previousElementSibling;      
                
            let prevliPin = prevli.querySelector('.ipin');
            let prevliAow = prevli.querySelector('.iaow');

            let liOnPin = liOn.querySelector('.ipin');
            let liOnAow = liOn.querySelector('.iaow');

            prevli.classList.add('on');
            prevli.focus();
            prevliPin.classList.add('on');
            if(prevliAow){
                prevliAow.classList.add('on');
            }

            liOn.classList.remove('on');
            liOnPin.classList.remove('on');
            if(liOnAow){
                liOnAow.classList.remove('on');
            }
            plBtnReset();
        }   
    }
}

//POI 정보 리스트 컨트롤 버튼 다음 리스트
const listDownClick = (e) => {
    let plArea = document.querySelector('.pl-area');
    let list = plArea.querySelector('.poilist');
    let liOn = list.querySelector('li.on');   
    let lasLiOn = list.querySelector('li:last-child');

    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown') {

        if(liOn && !lasLiOn.classList.contains('on')){
            let nextli = liOn.nextElementSibling;                  
            let nextliPin = nextli.querySelector('.ipin');
            let nextliAow = nextli.querySelector('.iaow');

            let liOnPin = liOn.querySelector('.ipin');
            let liOnAow = liOn.querySelector('.iaow');

            nextli.classList.add('on');
            nextli.focus();
            nextliPin.classList.add('on');
            if(nextliAow){
                nextliAow.classList.add('on');
            }

            liOn.classList.remove('on');
            liOnPin.classList.remove('on');
            if(liOnAow){
                liOnAow.classList.remove('on');
            }
            plBtnReset();
        }   
    }
}

//경로안내 Reset
const plBtnReset = () => {
    let plArea = document.querySelector('.pl-area');
    let btnArea = plArea.querySelector('.btn-area');
    let poiArea = document.querySelector('.poi-area');
    
    if(!btnArea.classList.contains('step01')){
        
        btnArea.setAttribute('class','btn-area step01');     
        poiArea.classList.remove('off');   
        poiListHeight();
    }
}
//POI 선택 장소 대체텍스트
const txtALT = (tgPin,liOnPin) => {
    
    let tgPins = tgPin;
    let liOnPins = liOnPin;
    let onALT = liOnPins.querySelector('.t-hdn');
    let span = document.createElement('span');    
    span.classList.add('t-hdn');
    span.innerText = '선택된 장소 입니다';
    if(onALT){
        onALT.remove();
    }    
    tgPins.append(span);
}