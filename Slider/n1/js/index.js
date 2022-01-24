window.addEventListener('load',function(){

    /*공지사항 클릭 시  */    
    let popup = document.querySelector('.popup.notice');
    let hasOn = popup.classList.contains('on');
    let dotwrap = document.querySelector('.dot-wrap');
    let dot = dotwrap.querySelectorAll('.dot');
    let noticeWrapLI = document.querySelectorAll('.notice-wrap .rolling > .inner > li');
    let noticeWrapUl = document.querySelector('.notice-wrap .rolling > .inner');
    let child =  noticeWrapUl.childElementCount;


    noticeHeaderlist();
    

    if(child > 0){   

        /* 공지사항 리스트 갯수 체크*/
        noticelist(); 

        /* 공지사항 리스트 갯수 만큼 점 추가*/
        pageDotadd();   
        
        /* 공지사항 리스트 Width값 추가*/
        noticeWidth();
    }


      // 헤더 공지사항 리스트 클릭시 팝업 열림
    noticeWrapLI.forEach(element => {    
        element.addEventListener('click',popupOpen);
    });   

    /*점 클릭 시  */
    dot = dotwrap.querySelectorAll('a');
    dot.forEach(element => {    
        element.addEventListener('click',pageDot);
    });      

    /*점 클릭 시  */


    /*공지사항 prev ,next */
    let prev = document.querySelector('.popup.notice .arrow .prev');

    prev.addEventListener('click',noticePrev);

    let next = document.querySelector('.popup.notice .arrow .next');

    next.addEventListener('click',noticeNext);



    /*헤더 공지사항 arrow버튼 */
    let btnArrow = document.querySelector('.btn_arrow');    
    let btnArrowUp = btnArrow.querySelector('.up');
    let btnArroDown = btnArrow.querySelector('.down');


    if(child >= 2){
        btnArrow.classList.add('on');
        btnArrowUp.classList.add('on');
        btnArroDown.classList.add('on');
        btnArrowUp.addEventListener('click',upEvent);
        btnArroDown.addEventListener('click',downEvent);
    }
    
    

    /*dim 클릭 시 켜있는 팝업 닫힘 */
    let dim = document.querySelector('.dim');
    dim.addEventListener('click', dimClick);

    /*팝업 닫기(클로즈버튼)*/
    let closePP = document.querySelectorAll('.popup > .header > .close');
    closePP.forEach(element => {
        element.addEventListener('click',closePopup);        
    });

    
    
});

//헤더 공지사항 리스트 갯수 체크
const noticeHeaderlist = (e) => {
    let noticeWrap = document.querySelector('.notice-wrap');
    let noticeWrapUl = document.querySelector('.notice-wrap .rolling > .inner');
    let child =  noticeWrapUl.childElementCount;
    let noticeWrapLi = noticeWrapUl.querySelectorAll('li');

    if(child == 0){   
        noticeWrap.classList.remove('on');        
    }else {
        noticeWrap.classList.add('on');    
        
        noticeWrapLi.forEach((element,index) => {            
            element.setAttribute('index', index);
        });        
    }



}

//공지사항 팝업 리스트 체크
const noticelist = (e) => {
    let noticeList = document.querySelector('.notice-list');   
    
    let child =  noticeList.childElementCount;

        if(child >= 1){
            noticeWidth();
        }

    
}

//공지사항 가로 값,갯수 가로 값
const noticeWidth = (e) => {


    let ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
    let bodyWidth = ppNoticeWidth - '2';
    let noticeList = document.querySelector('.popup.notice .notice-list');
    let Li = noticeList.querySelectorAll('li');
    let length = noticeList.childElementCount;
    

    Li.forEach(element => {

        element.style.width = (bodyWidth) + 'px';
    });    

    noticeList.style.width = ((bodyWidth) * length) + 'px';


}
//페이징 점 추가
const pageDotadd = (e) => {
    let noticeList = document.querySelector('.popup.notice .notice-list');
    let Li = noticeList.querySelectorAll('li');

    let dotWrap = document.querySelector('.dot-wrap');    

    Li.forEach((element,index) => {

        let a = document.createElement('a');
        
        a.setAttribute('class','dot'+index);
        a.setAttribute('href','#');
        a.setAttribute('index',index);
        
        dotWrap.append(a); 
        
    });    

}

//페이징 점 이벤트
const pageDot = (e,index) => {        
    e.preventDefault();
    
    let target = e.currentTarget;
    let count = target.attributes.index.value;
    let dotWrap = document.querySelector('.dot-wrap');        
    let dot = dotWrap.querySelectorAll('a');  
    
    let ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
    let bodyWidth = ppNoticeWidth - '2';
    let noticeList = document.querySelector('.popup.notice .notice-list');


    dot.forEach(element => {    
        element.classList.remove('on');
    });   
    target.classList.add('on');
    noticeList.setAttribute('index',count);
    noticeList.style.transform = 'translateX('+ ('-'+bodyWidth * count) + 'px)';

    sliderIndexEvent(e,count);
 
}

// 헤더 공지사항 리스트 클릭시 팝업 열림
const popupOpen = (e) => {
    e.preventDefault();   

    let t = e.currentTarget;
    let tIndex = t.attributes.index.value;    

    let popup = document.querySelector('.popup.notice');
    
    popup.classList.add('on');
    noticeWidth();
    dimAdd();
    roeX(e , tIndex);

}


const roeX = (e , index) => {
    let count = index;

    let ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
    let bodyWidth = ppNoticeWidth - '2';
    let noticeList = document.querySelector('.popup.notice .notice-list');
    let dotWrap = document.querySelector('.dot-wrap');        
    let dotpick = dotWrap.querySelector('.dot'+index);
    
    
    noticeList.setAttribute('index',count);
    noticeList.style.transform = 'translateX('+ ('-'+bodyWidth * count) + 'px)';
    dotpick.classList.add('on');


    sliderIndexEvent(e , index);



}

const sliderIndexEvent = (e , index) => {
    let count = index;
    let noticeList = document.querySelector('.popup.notice .notice-list');
    let length = noticeList.childElementCount;
    let prev = document.querySelector('.popup.notice .arrow .prev');
    let next = document.querySelector('.popup.notice .arrow .next');


    if(count == 0){
        prev.classList.remove('on');
    }else if(count <= 3 && count > 0) {
        prev.classList.add('on');
        noticeList.setAttribute('index',count);  
    }

    if(count == length-1){
        next.classList.remove('on');
    }else if(count <= 3 && count >= 0) {
        next.classList.add('on');
        noticeList.setAttribute('index',count);  
    }

}
const sliderDotEvent = (e ,index) => {
    e.preventDefault();    
    
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

    let ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
    let bodyWidth = ppNoticeWidth - '2';

    let noticeList = document.querySelector('.popup.notice .notice-list');
    let tIndex = noticeList.attributes.index.value;
    let count = tIndex;

    let prev = document.querySelector('.popup.notice .arrow .prev');
    let next = document.querySelector('.popup.notice .arrow .next');

     
    

    let dotWrap = document.querySelector('.dot-wrap');        
    let dot = dotWrap.querySelectorAll('a');  
    let dot0 = dotWrap.querySelector('.dot0');  


    
    count--;

    if(count == 0){
        prev.classList.remove('on');
        noticeList.style.transform = 'translateX('+ ('-'+bodyWidth * count) + 'px)';
        noticeList.setAttribute('index',count); 
        
        dot.forEach(element => {    
            element.classList.remove('on');
        }); 
    
        dot0.classList.add('on');

    }else if(count <= 2 && count > 0) {
        prev.classList.add('on');
        next.classList.add('on');
        noticeList.style.transform = 'translateX('+ ('-'+bodyWidth * count) + 'px)';
        noticeList.setAttribute('index',count);  
        sliderDotEvent(e,count);       
    }  

    
    
    
}

/*공지사항 next */


const noticeNext = (e) => {
    e.preventDefault();    

    let ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
    let bodyWidth = ppNoticeWidth - '2';

    let noticeList = document.querySelector('.popup.notice .notice-list');
    let length = noticeList.childElementCount;

    let tIndex = noticeList.attributes.index.value;
    let count = tIndex;

    let next = document.querySelector('.popup.notice .arrow .next');
    let prev = document.querySelector('.popup.notice .arrow .prev');

    let dotWrap = document.querySelector('.dot-wrap');        
    let dot = dotWrap.querySelectorAll('a');  
    let dot0 = dotWrap.querySelector('.dot'+count);  


    
    count++;

    if(count == length-1){
        next.classList.remove('on');
        noticeList.style.transform = 'translateX('+ ('-'+bodyWidth * count) + 'px)';
        noticeList.setAttribute('index',count);  

        dot.forEach(element => {    
            element.classList.remove('on');
        }); 
    
        dot0 = dotWrap.querySelector('.dot'+count);  
        dot0.classList.add('on');

    }else if(count <= 2 && count >= 0) {
        next.classList.add('on');
        prev.classList.add('on');
        noticeList.style.transform = 'translateX('+ ('-'+bodyWidth * count) + 'px)';
        noticeList.setAttribute('index',count);          
        sliderDotEvent(e,count);
    }      
    
}

//공지사항 롤링

let j = 0; 

const rolling = (i) => {

    let noticeWrap = document.querySelector('.notice-wrap');
    let noticeWrapUl = noticeWrap.querySelector('.rolling > .inner');
    let noticeWrapLi = noticeWrapUl.querySelector('li:first-child');
    
    noticeWrapLi = noticeWrapUl.querySelector('li:first-child');   
    noticeWrapUl.append(noticeWrapLi);
           
}

/*헤더 공지사항 버튼*/
const upEvent = (e) => {
    e.preventDefault();
    let noticeWrap = document.querySelector('.notice-wrap');
    let noticeWrapUl = noticeWrap.querySelector('.rolling > .inner');
    let noticeWrapLi = noticeWrapUl.querySelector('li:first-child');

    noticeWrapLi = noticeWrapUl.querySelector('li:last-child');   
    noticeWrapUl.prepend(noticeWrapLi);

}

const downEvent = (e) => {
    e.preventDefault();
    let noticeWrap = document.querySelector('.notice-wrap');
    let noticeWrapUl = noticeWrap.querySelector('.rolling > .inner');
    let noticeWrapLi = noticeWrapUl.querySelector('li:first-child');

    noticeWrapLi = noticeWrapUl.querySelector('li:first-child');   
    noticeWrapUl.append(noticeWrapLi);
    
}


//헤더 프로필 

const profileToggle = (e) => {
    e.preventDefault();
    
    let sub = document.querySelector('.profile-wrap .sub-wrap');
    let OnHas = sub.classList.contains('on');


    if(!OnHas){
        sub.classList.add('on');        
    }else {
        sub.classList.remove('on');        
    }
}

/*dim 클릭 시 팝업 닫힘 */
const dimClick = (e) => {
    e.preventDefault();

    let popup = document.querySelectorAll('.popup');

    popup.forEach(element => {
        element.classList.remove('on');
    });    

    dimRemove();

}

/*팝업 닫기(클로즈버튼)*/
const closePopup = (e) => {
    e.preventDefault();

    let target = e.currentTarget.parentElement.parentElement;
    let dotWrap = document.querySelector('.dot-wrap');        
    let dot = dotWrap.querySelectorAll('a');
    
    
    
    //공지사항
    if(target.classList.contains('notice')){
        dot.forEach(element => {
            element.classList.remove('on'); 
        });
    }

    //노선도
    let btn04 = document.querySelector('.left-btn > .btn-04'); 
    if(target.classList.contains('map')){        
        btn04.classList.remove('on');         
    }

    target.classList.remove('on');  

    

    dimRemove();  

    
}

/*팝업 배경 생성*/
const dimAdd = (e) => {
    
    let dim = document.querySelector('.dim');
    dim.classList.add('on');
}

/*팝업 배경 삭제*/
const dimRemove = (e) => {
    
    let dim = document.querySelector('.dim');
    let notice = document.querySelector('.popup.notice');
    let hasOn = notice.classList.contains('on');  


    //공지사항
    let dotWrap = document.querySelector('.dot-wrap');        
    let dot = dotWrap.querySelectorAll('a');
    dot.forEach(element => {
        element.classList.remove('on'); 
    });

    //노선도    
    let btn04 = document.querySelector('.left-btn > .btn-04'); 

    if(btn04 !== null){
        if(btn04.classList.contains('on')){        
            btn04.classList.remove('on');         
        }
    }

    dim.classList.remove('on');
}









