window.addEventListener('load',function(){
    let dotwrap = document.querySelector('.dot-wrap');
    let dot;
    
    sliderLength();
    sliderWidth();

    /**점 클릭 시  **/
    dot = dotwrap.querySelectorAll('a');
    dot.forEach(element => {    
        element.addEventListener('click',pageDot);
    });     

    /*공지사항 prev ,next */
    let prev = document.querySelector('.arrow .prev');

    prev.addEventListener('click',noticePrev);

    let next = document.querySelector('.arrow .next');

    next.addEventListener('click',noticeNext);
    
});

//슬라이드 리스트 갯수 체크
const sliderLength = (e) => {    
    let sliderList = document.querySelector('.slider-body .slider-list');
    let child =  sliderList.childElementCount;
    let sliderBox = sliderList.querySelectorAll('ul');
    let prev = document.querySelector('.arrow .prev');
    let next = document.querySelector('.arrow .next');
    let pageNum = document.querySelector('.page_num');
    let pageCrt = pageNum.querySelector('.current');
    let pageTt = pageNum.querySelector('.total');     

    if(child > 1){           
        next.classList.add('on');        
        pageIdk();

        sliderBox.forEach((element,index) => {            
            element.setAttribute('index', index);
        });
        sliderList.setAttribute('index',0);    
        pageDotadd();                        
    }
}


//슬라이드리스트 가로 값
const sliderWidth = (e) => {

    let sliderBody = document.querySelector('.slider-body').clientWidth;
    let bodyWidth = sliderBody;
    let sliderList = document.querySelector('.slider-body .slider-list');
    let sliderBox = sliderList.querySelectorAll('ul');
    let length = sliderList.childElementCount;

    sliderBox.forEach(element => {
        element.style.width = (bodyWidth) + 'px';
    });   
    sliderList.style.width = ((bodyWidth) * length) + 'px';

}
//페이징 점 추가
const pageDotadd = (e) => {
    let sliderList = document.querySelector('.slider-list');
    let sliderBox = sliderList.querySelectorAll('ul');

    let dotWrap = document.querySelector('.dot-wrap');    
    let dotOn;

    sliderBox.forEach((element,index) => {

        let a = document.createElement('a');
        
        a.setAttribute('class','dot'+index);
        a.setAttribute('href','#');
        a.setAttribute('index',index);
        
        dotWrap.append(a); 
        
    });  

    dotOn = dotWrap.querySelector('a').classList.add('on');

}

//페이징 점 이벤트
const pageDot = (e,index) => {        
    e.preventDefault();
    
    let target = e.currentTarget;
    let count = target.attributes.index.value;

    sliderDotEvent(count);
    moveTo(count);
    sliderIndexEvent(e,count); 
    pageIdk(e , count);
}

const sliderIndexEvent = (e , index) => {
    let count = index;
    let sliderList = document.querySelector('.slider-body .slider-list');
    let length = sliderList.childElementCount - 1;
    let prev = document.querySelector('.arrow .prev');
    let next = document.querySelector('.arrow .next');

    if(count == 0){        
        prev.classList.remove('on');

        if(0 < length){
            next.classList.add('on');   
        }
    }else if(count < length && count > 0 ) {
        prev.classList.add('on');
        next.classList.add('on');
    }else if(0 < length && count == length){        
        next.classList.remove('on');
        prev.classList.add('on');
    }
    

}
const sliderDotEvent = (index) => {  
    
    let count = index;
    let dotWrap = document.querySelector('.dot-wrap');        
    let dot = dotWrap.querySelectorAll('a');  
    let target = dotWrap.querySelector('.dot'+count);

    dot.forEach(element => {    
        element.classList.remove('on');
    }); 

    target.classList.add('on');

}

/*공지사항 prev */

const noticePrev = (e) => {
    e.preventDefault();          

    let sliderBody = document.querySelector('.slider-body').clientWidth;
    let bodyWidth = sliderBody;

    let sliderList = document.querySelector('.slider-body .slider-list');
    let length = sliderList.childElementCount - 1;
    let tIndex = sliderList.attributes.index.value;
    let count = tIndex;

    let prev = document.querySelector('.arrow .prev');
    let next = document.querySelector('.arrow .next');   

    let pageNum = document.querySelector('.page_num');
    let pageCrt = pageNum.querySelector('.current');
    
    count--;    
 
    sliderIndexEvent(e,count); 
    moveTo(count);    
    sliderDotEvent(count);   
    pageCrt.innerHTML = Number(count) + 1;
}

/*공지사항 next */

const noticeNext = (e) => {
    e.preventDefault();   
      

    let sliderBody = document.querySelector('.slider-body').clientWidth;
    let bodyWidth = sliderBody;

    let sliderList = document.querySelector('.slider-body .slider-list');
    let length = sliderList.childElementCount - 1;

    let tIndex = sliderList.attributes.index.value;
    let count = tIndex;

    let next = document.querySelector('.arrow .next');
    let prev = document.querySelector('.arrow .prev');

    let pageNum = document.querySelector('.page_num');
    let pageCrt = pageNum.querySelector('.current');
    
    count++;    

    sliderIndexEvent(e,count); 
    moveTo(count);       
    sliderDotEvent(count);    
    pageCrt.innerHTML = Number(count) + 1;    
}

//슬라이드 인디케이터
const pageIdk = (e , index) => {
    let count = index;
    let sliderList = document.querySelector('.slider-body .slider-list');    
    let length = sliderList.childElementCount;
    let pageNum = document.querySelector('.page_num');
    let pageCrt = pageNum.querySelector('.current');
    let pageTt = pageNum.querySelector('.total');
    let page = document.querySelector('.page_num');

    if(length > 1){   
        page.classList.replace('off','on');
        pageCrt.innerHTML = Number(count) + 1;
        pageTt.innerHTML = length;
    }else {
        pageCrt.innerHTML = '1';
        pageTt.innerHTML = length;
        page.classList.replace('on','off');
    }

}

const moveTo = (count) => {
    
    let sliderBody = document.querySelector('.slider-body').clientWidth;
    let bodyWidth = sliderBody;
    let sliderList = document.querySelector('.slider-body .slider-list');

    sliderList.setAttribute('index',count);
    sliderList.style.transform = 'translateX('+ ('-'+bodyWidth * count) + 'px)';
}













