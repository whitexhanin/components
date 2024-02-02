window.addEventListener('load',function(){   

    let vh = 0;    
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    let name = "bus2";
    init(name);

    // let dim  = document.querySelector('.dim');
    // dim.addEventListener('click',dimClick);   

    window.addEventListener('resize',function(){
        
        let name = "bus2";
        let slider2 = document.querySelector('.slider-area2 .roadmap');
        let targetIDX = slider2.getAttribute('index');

        init(name);
        moveTo(targetIDX);
    });    
    
    window.addEventListener('resize', setVh);
    setVh();
      
      
      let mql = window.matchMedia('(orientation:portrait)');
      mql.addEventListener('change', function(event) {
            setTimeout( function() {                

                let name = "bus2";
                let slider2 = document.querySelector('.slider-area2 .roadmap');
                let targetIDX = slider2.getAttribute('index');
        
                init(name);
                moveTo(targetIDX);
                setVh();
            }, 200 )

          });      

    
    let sliderArea = document.querySelectorAll('.slider-area2');
    sliderArea.forEach(element => {
        element.addEventListener('touchstart',touchstart2);
        element.addEventListener('touchmove',touchMove2);
        element.addEventListener('touchend',touchEnd2);        
    });
    let sliderLi = document.querySelectorAll('.slider-area2 .roadmap > li');
    sliderLi.forEach(element => {
        element.addEventListener('keyup',tabEvent);
    });

    let bus2 = document.querySelector('#bus2');
    let busbtnArea = bus2.querySelector('.busbtn-area');
    let busBtns = busbtnArea.querySelectorAll('button');
    let i = 0;
    
    busBtns.forEach(element => {
        element.addEventListener('click',busBtnClick);
        element.addEventListener('keyup',busBtnClick);
        element.setAttribute('idx',i++);
    });




    

    //셔틀버스 호차 버튼 클릭 시 pop5 팝업 오픈
    let timeTable = document.querySelector('.opentable');
    timeTable.addEventListener('pointerdown',pop5Open);
    timeTable.addEventListener('keyup',pop5Open);

    // 팝업 클로즈 버튼 
    let btnClo = document.querySelectorAll('.btn-close');
    btnClo.forEach(element => {
        element.addEventListener('click',popClose);    
        element.addEventListener('keyup',popClose);    
    });

    
});
const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)        
};

const dimOn = (e) => {
    let dim  = document.querySelector('.dim');
    dim.classList.add('on');   
}


const dimOFF = (e) => {
    let dim  = document.querySelector('.dim');
    if(dim.classList.contains('on')){
        dim.classList.remove('on');   
    }
    
}

const dimClick = (e) => {
    // let nav = document.querySelector('nav');
    // let navOn = nav.classList.contains('on');
    // let pop1On = document.querySelector('.pop1.on');
    // let btnBack = document.querySelector('.btn-back'); 
    
    // if(navOn){
    //     nav.classList.remove('on');        
    // }
    // if(pop1On){
    //     cngUIremove();
    //     btnBack.classList.remove('on');

    // }

    dimOFF(e);
    popClose(e);


}

const busBtnClick = (e) => {

    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'click') {
        let target = e.currentTarget;    
        let targetIDX = target.getAttribute('idx');

        sliderIndexEvent(e , targetIDX);
        moveTo(targetIDX);

    }
}
const pop5Open = (e) => {

    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown') {
        let target = e.currentTarget;
        let mapTxt = target.querySelector('.chnum').innerText;
        let pop5 = document.querySelector('.pop5');
        let cgtxt = pop5.querySelector('.cgtxt');
        let timeTableOn = pop5.querySelector('.timetable-wrap ul.on');
        let timeTable = pop5.querySelector('.timetable-wrap ul'+'.line'+mapTxt);
        let pop5Close = pop5.querySelector('.btn-close');

        timeTableOn.classList.remove('on');
        cgtxt.innerText = mapTxt;
        pop5.classList.add('on');
        timeTable.classList.add('on');
        pop5Close.focus();
        dimOn();
    }
}

const popClose = (e) => {

    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown'|| e.type === 'click') {

        let popOn = document.querySelector('.popup-area > div.on');
        if(popOn){
            if(!e.target.classList.contains('fn3')){
                popOn.classList.remove('on');   
            }
        }

        let listBtnOn = document.querySelector('.slider2 li.on');    
        if(listBtnOn){
            listBtnOn.classList.remove('on');
        }
        
        if(!e.target.classList.contains('fn3')){
            dimOFF(e);
        }
            
        
    }
}
    

const init = (dataItem) => {
    let itemName = dataItem;
    sliderWidth(itemName);    
    sliderLength(itemName);
}

const tabEvent = (e) => {

    let slider2 = document.querySelector('.slider-area2 .roadmap');
    let targetIDX = slider2.getAttribute('index');

    if (e.code === 'Tab' || e.keyCode === 9 ) {
        if(targetIDX == 5 || targetIDX > 5 ){
            sliderIndexEvent(e , targetIDX);
        }else{
            sliderIndexEvent(e , ++targetIDX);
        }       
        
        moveTo(targetIDX);
    }

}

//슬라이드 리스트 갯수 체크
const sliderCheck = (itemName) => {    
    let Name = itemName; 
    let sliderList = document.querySelector('#'+Name+ ' .slider-area2 .slider2');
    
    let child =  sliderList.childElementCount;
    let sliderBox = sliderList.querySelectorAll('ul');

    if(child > 1){           

        sliderBox.forEach((element,index) => {            
            element.setAttribute('index', index);
        });
        sliderList.setAttribute('index',0);       
    }
}


//슬라이드 리스트 갯수 체크
const sliderLength = (itemName) => {   
    let Name = itemName;     
    let sliderList = document.querySelector('#'+Name+ ' .slider-area2 .slider2'); 
    let child =  sliderList.childElementCount;
    let sliderBox = sliderList.querySelectorAll('ul');
    let btnArea = document.querySelector('#'+Name+ ' .btn-slider2');
    let targetIDX = sliderList.getAttribute('index');

    if(targetIDX == null){
        targetIDX = 0;
    }


    if(child > 1){           

        sliderBox.forEach((element,index) => {            
            element.setAttribute('index', index);
        });
        sliderList.setAttribute('index',targetIDX);    
    }
    if(child === 1 || child === 0){
        btnArea.classList.add('none');
    }
}


//슬라이드리스트 가로 값
const sliderWidth = (itemName) => {
    let Name = itemName;        
    let sliderBody = document.querySelector('#'+Name+ ' .slider-area2').clientWidth;
    let bodyWidth = sliderBody;
    let sliderList = document.querySelector('#'+Name+ ' .slider-area2 .slider2');
    let sliderBox = document.querySelectorAll('#'+Name+ ' .slider-area2 .slider2 > li');
    let length = sliderList.childElementCount;

    sliderBox.forEach(element => {
        element.style.width = 'calc('+bodyWidth +'px'+' - 6rem)';
        
    });   
    sliderList.style.width = ((bodyWidth) * length) + 'px';

}

const sliderIndexEvent = (e , index) => {
    let target = e.currentTarget;    
    let Name = 'bus2';         

    let count = Number(index) + 1;
    let sliderList = document.querySelector('#'+Name+ ' .slider-area2 .slider2');
    let length = sliderList.childElementCount - 1;
    let dotArea = document.querySelector('.dot-area');
    let dots = dotArea.querySelectorAll('span');
    
    let dotOn = document.querySelector('.dot-area span:nth-child('+count+')');

    let bus2 = document.querySelector('#bus2');
    let busbtnArea = bus2.querySelector('.busbtn-area');
    let busBtn = busbtnArea.querySelector('button.on');
    let busBtnOn = busbtnArea.querySelector('button:nth-child('+count+')');

    
    let mapTxt = bus2.querySelector('.chnum');

    dots.forEach(element => {
        element.classList.remove('on');
    });    
    
    dotOn.classList.add('on');
    
    

    busBtn.classList.remove('on');   
    busBtnOn.classList.add('on');   

    mapTxt.innerText = count;

}

/*prev */

const sliderPrev = (e) => {
    
    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown'|| e.type === 'touchend') {

        let target = e.currentTarget;    
        let Name = 'bus2';         
        let sliderList = document.querySelector('#'+Name+ ' .slider-area2 .slider2');
        let tIndex = sliderList.attributes.index.value;
        let count = tIndex;

        
        
        if(count !== 0 && count > 0){
            count--;  
            sliderIndexEvent(e,count); 
            moveTo(count);    
        }  
    }
}

/*next */

const sliderNext = (e,tabbool) => {
    if (e.code === 'Enter' || e.keyCode === 13 || e.type === 'pointerdown' || tabbool || e.type === 'touchend') {

        let target = e.currentTarget;    
        let Name = 'bus2'; 
        let sliderList = document.querySelector('#'+Name+ ' .slider-area2 .slider2');
        let tIndex = sliderList.attributes.index.value;
        let count = tIndex;
        let length = sliderList.childElementCount - 1;
        

        if(0 < length && count < length){
            count++;    
        
            sliderIndexEvent(e,count); 
            
            moveTo(count,tabbool);       
        }
    }
}

const moveTo = (count , tabbool) => {
    let Name = 'bus2';
    let sliderBody = document.querySelector('#'+Name+ ' .slider-area2').clientWidth;
    let bodyWidth = sliderBody;
    let sliderList = document.querySelector('#'+Name+ ' .slider-area2 .slider2');   
    let busbtnArea = document.querySelector('#bus2 .busbtn-area'); 

    sliderList.setAttribute('index',count);
    if(!tabbool){
        sliderList.style.transform = 'translateX('+ ('-'+bodyWidth * count) + 'px)';
    }
    
    if(count == '1'){
        busbtnArea.scrollTo({left:0,top:0});
    }
    if(count == '4'){    
        busbtnArea.scrollTo({left:1000,top:0});
    }
    
}

let scrXStr2;
const touchstart2 = (e) => {
    scrXStr2 = e.changedTouches[0].screenX;   
}
const touchMove2 = (e) => {    
}
const touchEnd2 = (e) => {   
    let scrXEnd = e.changedTouches[0].screenX;
    if(scrXStr2 > scrXEnd ) {
        sliderNext(e);
    }else if(scrXStr2 < scrXEnd ){
        sliderPrev(e);
    }   
}


















