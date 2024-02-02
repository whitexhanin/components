
function Sliders (sliderSet) {

    //option : setInterval,appendUl,

    let regex = /[^0-9]/gi;
    let sliderWrap;
    let autoplaying;

    //Slider SetInterval Code
    const sliderInterval = (idNum , autoplay) => {    
        Slider = document.querySelector(`#slider${idNum}`);    
        num = Slider.querySelector('.slider-list').getAttribute('index');
        sLength = Slider.querySelector('.slider-list').childElementCount;                

            if(num <= sLength-2){      
                btnNext(Slider);        
            }
            else{            
                clearInterval(`interval${idNum}`);                       
            }   
    }    

    //Slider list length
    const sliderLength = (e , sArea) => {    
        let slider = sArea;
        let sliderList = slider.querySelector('.slider-body .slider-list');
        let child =  sliderList.childElementCount;
        let sliderBox = sliderList.querySelectorAll('.slider-box');    
        let next = slider.querySelector('.arrow .next');   
        let count = sliderList.attributes.index.value; 
        let sAreaId = sArea.getAttribute('id').replace(regex, "");
        let view;

        sliderSet.map(arr => {
            if(arr.idNum == sAreaId){            
                view = arr.viewer;                
            }
        });   

        if(child > 1){           
            next.classList.add('on');        
            pageIdk(e,count,sArea);

            sliderBox.forEach((element,index) => {            
                element.setAttribute('index', index);
            });
            sliderList.setAttribute('index',0);    
            pageDotadd(e, sArea);                        
        }
        if(child <= view){
            next.classList.remove('on');   
        }      
    }

    //SliderUl width
    const sliderWidth = (e , sArea) => {    
        let slider = sArea;
        let sliderBody = slider.querySelector('.slider-body').clientWidth;    
        let bodyWidth = sliderBody;
        let sliderList = slider.querySelector('.slider-body .slider-list');
        let sliderBox = sliderList.querySelectorAll('.slider-box');
        let length = sliderList.childElementCount;
        let boxWidth = length > 0?sliderBox[0].clientWidth : 0; 
        let sAreaId = sArea.getAttribute('id').replace(regex, "");
        let gap;

        sliderSet.map(arr => {
            if(arr.idNum == sAreaId){            
                gap = arr.gap;             
            }
        });   

        sliderBox.forEach(element => {
            element.style.width = (sliderBody) + 'px';
        });           
        sliderList.style.width = ((sliderBody + gap) * length) + 'px';
        sliderList.style.gap = `${gap}px`;

    }

    //Create add paging(round)
    const pageDotadd = (e , sArea) => {
        let slider = sArea;
        let sliderList = slider.querySelector('.slider-list');
        let sliderBox = sliderList.querySelectorAll('.slider-box');
        let dotWrap = slider.querySelector('.dot-wrap');
        let dotOn;  
        
        let sAreaId = slider.getAttribute('id').replace(regex, "");
        let paging;
        sliderSet.map(arr => {
            if(arr.idNum == sAreaId){            
                paging = arr.pagination;
            }
        }); 

        if(paging){
            sliderBox.forEach((element,index) => {

                let a = document.createElement('a');
                
                a.setAttribute('class','dot'+index);
                a.setAttribute('href','#');
                a.setAttribute('index',index);
                
                dotWrap.append(a); 
                
            });      
        
            dotOn = dotWrap.querySelector('a').classList.add('on');
        }    

    }


    //handleEvent paging(round)
    const pageDot = (e,index) => {        
        e.preventDefault();     
        let target = e.currentTarget;
        let sArea = target.closest('.slider-wrap');
        let count = target.attributes.index.value;

        sliderDotEvent(count , sArea);
        moveTo(count , sArea);
        sliderIndexEvent(e,count , sArea); 
        pageIdk(e,count,sArea);
    }


    const sliderIndexEvent = (e , index, sArea) => {
        let sAreaId = sArea.getAttribute('id').replace(regex, "");
        let view;
        sliderSet.map(arr => {
            if(arr.idNum == sAreaId){            
                view = arr.viewer;
            }
        });    
        let count = index;
        let sliderList = sArea.querySelector('.slider-body .slider-list');    
        let length = sliderList.childElementCount - view;                
        let prev = sArea.querySelector('.arrow .prev');
        let next = sArea.querySelector('.arrow .next');

        if(count == 0){        
            prev.classList.remove('on');

            if(0 < length){
                next.classList.add('on');   
            }
            if(0 == length){
                next.classList.remove('on');   
            }
        }else if(count < length && count > 0 ) {
            prev.classList.add('on');
            next.classList.add('on');
        }else if(0 < length && count == length){        
            next.classList.remove('on');
            prev.classList.add('on');
        }    

    }

    const sliderDotEvent = (index, sArea) => {     
        let count = index;
        let dotWrap = sArea.querySelector('.dot-wrap');        
        let dot = dotWrap.querySelectorAll('a');  
        let target = dotWrap.querySelector('.dot'+count);

        let sAreaId = sArea.getAttribute('id').replace(regex, "");
        let paging;

        sliderSet.map(arr => {
            if(arr.idNum == sAreaId){            
                paging = arr.pagination;
            }
        }); 
        
        if(paging){

            dot.forEach(element => {    
                element.classList.remove('on');
            }); 
            target.classList.add('on');
        }  
    }


    // Prev
    const btnPrev = (e) => {  
        let target = e.currentTarget;
        let sArea = target.closest('.slider-wrap');      
        let sliderList = sArea.querySelector('.slider-body .slider-list');
        let tIndex = sliderList.attributes.index.value;
        let count = tIndex;
        let pageNum = sArea.querySelector('.page_num');
        let pageCrt = pageNum.querySelector('.current');
        
        count--;    
    
        sliderDotEvent(count , sArea);
        moveTo(count , sArea);
        sliderIndexEvent(e,count , sArea); 
        pageCrt.innerHTML = Number(count) + 1;
    }


    // Next
    const btnNext = (e) => {        
        
        let target = e.isTrusted? e.currentTarget : e;    
        let sArea = target.closest('.slider-wrap');     
        let sliderList = sArea.querySelector('.slider-body .slider-list');
        let tIndex = sliderList.attributes.index.value;
        let count = tIndex;
        let pageNum = sArea.querySelector('.page_num');
        let pageCrt = pageNum.querySelector('.current');
        
        count++;    

        sliderDotEvent(count , sArea);
        moveTo(count , sArea);
        sliderIndexEvent(e,count , sArea); 
        pageCrt.innerHTML = Number(count) + 1;    
    }

    //Slider Indicator
    const pageIdk = (e , index ,sArea) => {
        let slider = sArea;
        let count = index;
        let sliderList = slider.querySelector('.slider-body .slider-list');    
        let length = sliderList.childElementCount;
        let pageNum = slider.querySelector('.page_num');
        let pageCrt = pageNum.querySelector('.current');
        let pageTt = pageNum.querySelector('.total');    

        if(length > 1){   
            pageNum.classList.replace('off','on');
            pageCrt.innerHTML = Number(count) + 1;
            pageTt.innerHTML = length;
        }else {
            pageCrt.innerHTML = '1';
            pageTt.innerHTML = length;
            pageNum.classList.replace('on','off');
        }

    }


    const moveTo = (count , sArea) => {
        
        let sliderBody = sArea.querySelector('.slider-body').clientWidth;
        let bodyWidth = sliderBody;
        let sliderList = sArea.querySelector('.slider-body .slider-list');
        let sliderBox = sliderList.querySelectorAll('.slider-box');
        let boxWidth = sliderBox[0].clientWidth; 
        let sAreaId = sArea.getAttribute('id').replace(regex, "");
        let gap;

        sliderSet.map(arr => {
            if(arr.idNum == sAreaId){            
                gap = arr.gap;             
            }
        });   

        sliderList.setAttribute('index',count);
        sliderList.style.transform = 'translateX('+ ('-'+(boxWidth + gap) * count) + 'px)';
    }

    // Mouse SetInterval Control    
    const stopInterval = (e) => {
        sliderWrap = e.target.closest('.slider-wrap');

        if(sliderWrap){           
            autoplaying =  sliderWrap.getAttribute('data-auto');
            if(autoplaying){                                   
                idNum = sliderWrap.getAttribute('id').replace(regex, "");
                clearInterval(window[`interval${idNum}`]);          
            }
        }    
    }

    const startInterval = (e) => {
        sliderWrap = e.target.closest('.slider-wrap');

        if(sliderWrap){ 
            autoplaying = sliderWrap.getAttribute('data-auto');
            if(autoplaying){                      
                idNum = sliderWrap.getAttribute('id').replace(regex, "");
                window[`interval${idNum}`] = setInterval(sliderInterval,5000, `${String(idNum)}`,true);
            }
        }     
    }

    let scrXStr;
    const touchstart = (e) => {
        scrXStr = e.changedTouches[0].screenX;   
        stopInterval(e);
    }
    const touchMove = (e) => {    
        stopInterval(e);
    }
    const touchEnd = (e) => {   
        let scrXEnd = e.changedTouches[0].screenX;
        let sliderList = e.currentTarget.querySelector('.slider-list');
        let count = sliderList.attributes.index.value;
        let length = sliderList.childElementCount - 1;

        if(scrXStr > scrXEnd && count < length) {
            btnNext(e);
            startInterval(e);
        }else if(scrXStr < scrXEnd && count  > 0){        
            btnPrev(e);
            startInterval(e);
        }   
    }


    //Event
    let sliderArea = document.querySelectorAll('.slider-wrap');
    let sliderName = [];

    sliderArea.forEach(ele => {
        let idName = ele.getAttribute('id');
        sliderName.push(idName);              
    });

    let Slider;   
    let bin;    

    //First Action
    sliderName.forEach((ele) => {
        Slider = document.querySelector(`#${ele}`);            
        
        sliderLength(bin,Slider);
        sliderWidth(bin,Slider);    

        // Slider.setAttribute('data-num','1');             
        
    }); 
    
    let dot;        
    //Indicator click
    dot = document.querySelectorAll('.dot-wrap a');
    dot.forEach(element => {    
        element.addEventListener('click',pageDot);
    });     
    
    //Prev , Next click
    let prev = document.querySelectorAll('.arrow .prev');
    prev.forEach(element => {
        element.addEventListener('click',btnPrev);    
    });    

    let next = document.querySelectorAll('.arrow .next');
    next.forEach(element => {
        element.addEventListener('click',btnNext);    
    });
    

    //Slider SetInterval Function 
    sliderSet.forEach(slider => {       

        Slider = document.querySelector(`#slider${slider.idNum}`);                          

        if(slider.option[0].autoplay){            
            window[`interval${slider.idNum}`] = setInterval(sliderInterval,slider.option[0].speed,slider.idNum,slider.option[0].autoplay);              
        }
        Slider.setAttribute('data-auto',slider.option[0].autoplay); 
    });   

    window.addEventListener('mouseover',stopInterval);   
    window.addEventListener('mouseout',function(e){        
        startInterval(e);      
    });    
    
    sliderArea.forEach(element => {
        element.addEventListener('touchstart',touchstart);
        element.addEventListener('touchmove',touchMove);
        element.addEventListener('touchend',touchEnd);        
    });

    window.addEventListener('resize',function(e){

        sliderArea.forEach(ele => {            
            let sliderList = ele.querySelector('.slider-body .slider-list');            
            let count = sliderList.attributes.index.value;    

            sliderWidth(bin,ele);    
            moveTo(count , ele);         
        });
        
    });
}
















