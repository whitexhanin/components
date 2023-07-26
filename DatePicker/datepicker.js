window.addEventListener('load',function(){

    dateRangeEvt();  
    dateRange2Evt();
    dateMonthEvt();  
    dateDefaultEvt();    
    dateDefaultEvt2();    
    
    let holySetWrap = document.querySelector('.holyset');
    if(holySetWrap){
        let day = holySetWrap.querySelectorAll('.datepicker-grid .day');
        day.forEach(element => {
            element.addEventListener('click',daysToggleEvt);    
        });
    }        

})

const dateRangeEvt = () => {
    const dateRange = document.querySelectorAll('.date-range'); 
    dateRange.forEach(element => {
        const rangepicker = new DateRangePicker(element, {
            language : 'ko',
            autohide : true,  
            format: "yyyy-mm-dd",         
            pickLevel : 0, 
            });        
    }); 
}
const dateRange2Evt = () => {
    const dateRange = document.querySelectorAll('.date-range2'); 
    dateRange.forEach(element => {
        const rangepicker = new DateRangePicker(element, {
            language : 'ko',
            autohide : true,  
            format: "yyyy-mm-dd(D)",         
            pickLevel : 0, 
            });        
    }); 
}
const dateDefaultEvt = () => {
    const dateDefault = document.querySelectorAll('.date-default'); 
    dateDefault.forEach(element => {
        const datepicker = new Datepicker(element, {
            language : 'ko',
            autohide : true,  
            format: "yyyy-mm-dd",         
            pickLevel : 0, 
            });        
    }); 
}
const dateDefaultEvt2 = () => {
    const dateDefault = document.querySelector('.date-default2'); 
    if(dateDefault){

    
    const datepicker = new Datepicker(dateDefault, {
        language : 'ko',
        autohide : false,  
        format: "yyyy-mm-dd",         
        pickLevel : 0,             
        });   
        let wrap = document.querySelector('.holyset');
        let controls = wrap.querySelector('.datepicker-footer .datepicker-controls');
    
        let btnCancle = document.createElement('button');
        btnCancle.setAttribute('class','btn1 btn-cancle');
        btnCancle.innerText = '취소';
    
        let btnSubmit = document.createElement('button');
        btnSubmit.setAttribute('class','btn3 btn-submit');
        btnSubmit.innerText = '적용';   
        
        
        controls.appendChild(btnCancle);
        controls.appendChild(btnSubmit);         
    }
 
}
const dateMonthEvt = () => {
    const dateMonth = document.querySelectorAll('.date-month');

        dateMonth.forEach(element => {            
            const datepicker = new Datepicker(element, {
                language : 'ko',                
                format: "yyyy-mm",         
                autohide : true,  
                pickLevel : 1,             
            });            
        });
}

const daysToggleEvt = (e) => {
    let target = e.currentTarget;
    target.classList.toggle('hoday');    
}


(function () {
    Datepicker.locales.ko = {
        days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		daysShort: ["일", "월", "화", "수", "목", "금", "토"],
		daysMin: ["일", "월", "화", "수", "목", "금", "토"],
		months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		today: "오늘",
		clear: "삭제",
		format: "yyyy-mm-dd",
		titleFormat: "yyyy년mm월",
		weekStart: 0
    };
  }());



