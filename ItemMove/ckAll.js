window.addEventListener('load',function(){

    //체크박스 전체
    let ckall = document.querySelectorAll('.ck-all');

    ckall.forEach(element => {        
        element.addEventListener('click',ckAllEvent);

    });

    //체크박스 하위 자식    
    let ck = document.querySelectorAll('.ckbox');

    ck.forEach(element => {        
        element.addEventListener('click',ckEvent);

    });

    //버튼 전체선택 
    let btnCkall = document.querySelectorAll('.btn-ckall');

    btnCkall.forEach(element => {        
        element.addEventListener('click',btnCkAllEvent);

    });


})

const ckAllEvent = (e) => {
let target = e.currentTarget;
let popList = target.closest('.poplist');
let onesDiv = popList.closest('.ones_div');
let ckAll = onesDiv? popList.querySelectorAll('.ckbox') : popList.querySelectorAll('.body .ckbox');    

let ckAllFrom  = Array.from(ckAll);
let newckAll = ckAllFrom.filter(el => !el.classList.contains("ck-all"))

if(target.checked == true){
    newckAll.forEach(element => {
        if(element.disabled == false){
            element.checked = true;    
        }
        
    });        
}else{
    newckAll.forEach(element => {
        if(element.disabled == false){
            element.checked = false;    
        }
    });   
}    

}


const ckEvent = (e) => {

    let target = e.currentTarget;
    let popList = target.closest('.poplist');    

    if(popList && !target.classList.contains('.ck-all')){    

        let ckAll = popList.querySelector('.ck-all');
        let onesDiv = popList.closest('.ones_div');
        let cklist = onesDiv? popList.querySelectorAll('.ckbox') : popList.querySelectorAll('.body .ckbox');  
        let cklistFrom  = Array.from(cklist);
        let newcklist = cklistFrom.filter(el => !el.classList.contains("ck-all"))  

        let checkCount = 0;

        newcklist.forEach(function(v) {
            if(v.checked === false){
                checkCount++;
            }
        });

        if(checkCount > 0) {
            ckAll.checked = false;        
        } else if(checkCount === 0) {
            ckAll.checked = true;
        } 
    }

}

const btnCkAllEvent = (e) => {
    let target = e.currentTarget;
    let updownSec = target.closest('.updownsec');    
    let updownListChild = updownSec.querySelectorAll('.updownlist > li .tit-wrap .ckbox')

    
    if(target.classList.contains('on')){
        target.classList.remove('on');
        target.innerText = '전체선택'
        updownListChild.forEach(element => {
            element.checked = false;
        });

    }else{
        target.classList.add('on');
        target.innerText = '전체해제'
        updownListChild.forEach(element => {
            element.checked = true;
        });
    }
    
}