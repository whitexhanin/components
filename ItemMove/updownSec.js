window.addEventListener('load',function(){
    let btnUp = document.querySelectorAll('.btn-up');
    btnUp.forEach(element => {
        element.addEventListener('click',btnUpEvt);
    });

    let btnDown = document.querySelectorAll('.btn-down');
    btnDown.forEach(element => {
        element.addEventListener('click',btnDownEvt);
    });

    // 점검일지 리스트에 data-id 부여
    dataIdAdd(); 

})

const btnUpEvt = (e) => {
    let target = e.currentTarget;
    let updownSec = target.closest('.updownsec');
    let checkList = updownSec.querySelector('.check-list');
    let checkListLength = checkList.childElementCount;
    let updownListChild;
    let upItem;

    if(!checkList){
        //위험성평가수정
        updownListChild = updownSec.querySelectorAll('.updownlist > li .ckbox:checked')

        if(updownListChild.length == 1){
            upItem = updownListChild[0].closest('li');
            let ItemprevSib = upItem.previousElementSibling;
    
            if(upItem.classList.contains('end')){
                alert('종료 된 작업은 위치 이동 불가능 합니다.');
            }else {
                if(ItemprevSib !== null && !ItemprevSib.classList.contains('end')){
                    ItemprevSib.before(upItem);
                }            
            }
    
        }else {
            alert('단일 선택 하세요')
        }  

    }else {
        //점검리스트
        dataIdAdd();

        updownListChild = updownSec.querySelectorAll('.updownlist > li > .tit-wrap  .ckbox:checked');               

        if(updownListChild.length > 0){    

            let addLipoint = []; 
            let itemIdArr = [];
            let itemNidArr = [];
            let itemdataId; 
            let nIdArr = [];
            let nId;
            let sliceArr = [];
            let nIdvalArr = [];
            let nIdIdxArr = [];
            let eleline = [];
            let nids;
            let itemdataNids;
            let itemdataPosition;

            updownListChild.forEach((ele,idx)=>{
                
                item = ele.closest('li');  
                itemdataId = item.getAttribute('data-id');

                let moveSib =  item.previousElementSibling;                     
                let movepoint = moveSib !==null? moveSib.getAttribute('data-id') : item.getAttribute('data-id');

                addLipoint.push(movepoint);
                itemIdArr.push(itemdataId);

                if(Number(addLipoint[idx+1]) !== Number(addLipoint[idx])+1){
                    nId = addLipoint[idx];
                    nIdArr.push(nId);
                    itemNidArr.push(itemdataId);
                }                
            });

            nIdArr.forEach((arr)=>{
                let indexNum = nIdArr.indexOf(arr);
                sliceArr.push(indexNum);
            })

            let nIdArrCopy = [...nIdArr];
            nIdArr.forEach((element , idx) => {
                if(Number(element)-1 == Number(nIdArr[idx-1]) || nIdArr[idx-1] == undefined){
                    nIdArrCopy.splice(idx,1,'|')
                }                
            });

            nIdvalArr.push(nIdArr[0]);
            nIdIdxArr.push(0);
            
            nIdArrCopy.forEach((arr, idx) => {
                if(!arr.startsWith('|')){
                    nIdvalArr.push(arr);  
                    nIdIdxArr.push(idx);                  
                }                
            });            

            nIdIdxArr.forEach((arr , idx)=>{
                if(nIdIdxArr.length-1  > idx || Number(nIdvalArr[idx])-1 == Number(nIdvalArr[idx-1])){
                    eleline.push(itemNidArr.slice(arr,nIdIdxArr[idx+1]));
                }else {
                    eleline.push(itemNidArr.slice(arr,itemNidArr.length+1));
                }

                eleline.forEach((arr , idx)=>{                   
                    if(idx > 0){
                        nids = Number(nIdvalArr[idx]);
                    }else{
                        nids = nIdvalArr[idx]; 
                    }                  

                    arr.forEach((arr2,idx) => {
                        if(idx > 0){
                            checkList.querySelector(`li[data-id='${arr2}']`).setAttribute('data-nid',Number(nids)+idx);
                            checkList.querySelector(`li[data-id='${arr2}']`).setAttribute('data-position','afterend');
                        }else{
                            checkList.querySelector(`li[data-id='${arr2}']`).setAttribute('data-nid',Number(nids));
                        }
                    });
                })
                
            });

            updownListChild.forEach((ele,idx)=>{                

                item = ele.closest('li');  
                itemdataId = item.getAttribute('data-id');
                itemdataNids = item.getAttribute('data-nid');
                itemdataPosition = item.getAttribute('data-position');

                let movepointLi;                

                if(Number(addLipoint[idx+1]) == Number(addLipoint[idx])+1 ||Number(itemIdArr[idx])+1 == Number(itemIdArr[idx+1])|| Number(addLipoint[idx-1]) == Number(addLipoint[idx])-1 ||addLipoint[idx] == 0){
                    movepointLi = checkList.querySelector(`li[data-id="${itemdataNids}"]`);     

                    if(itemdataPosition == 'afterend'){
                        movepointLi.insertAdjacentElement('afterend',item);
                    }else if( itemNidArr.includes('0')){
                        return;
                    }else {
                        movepointLi.insertAdjacentElement('beforebegin',item);
                    }                    

                }else if((itemdataId == 0) || (itemIdArr.includes('0') && Number(itemIdArr[idx-1]) == Number(itemIdArr[idx])-1 )||itemNidArr.includes('0')){
                    return;
                }else {
                    movepointLi = checkList.querySelector(`li[data-id="${addLipoint[idx]}"]`); 
                    movepointLi.before(item);
                }  
            });
           
        }else {
            alert('한개 이상 선택 하세요')
        }  
    }
    
    
}

const btnDownEvt = (e) => {
    let target = e.currentTarget;
    let updownSec = target.closest('.updownsec');
    let checkList = updownSec.querySelector('.check-list');
    let checkListLength = checkList.childElementCount;
    let updownListChild;
    let upItem;

    if(!checkList){
        //위험성평가수정
        updownListChild = updownSec.querySelectorAll('.updownlist > li .ckbox:checked')

        if(updownListChild.length == 1){
            upItem = updownListChild[0].closest('li');
            let ItemnextSib = upItem.nextElementSibling;
    
            if(upItem.classList.contains('end')){
                alert('종료 된 작업은 위치 이동 불가능 합니다.');
            }else {
                if(ItemnextSib !== null && !ItemnextSib.classList.contains('end')){
                    ItemnextSib.after(upItem);
                }           
            }
    
        }else {
            alert('단일 선택 하세요')
        }  
    }else {
        //점검리스트
        dataIdAdd();
        updownListChild = updownSec.querySelectorAll('.updownlist > li > .tit-wrap  .ckbox:checked');  
        let updownListChildReverse = [...updownListChild].reverse();

        if(updownListChild.length  > 0){

            let addLipoint = []; 
            let itemIdArr = [];
            let itemNidArr = [];
            let itemdataId; 
            let nIdArr = [];
            let nId;
            let sliceArr = [];
            let nIdvalArr = [];
            let nIdIdxArr = [];
            let eleline = [];
            let nids;
            let itemdataNids;
            let itemdataPosition;

            updownListChildReverse.forEach((ele,idx)=>{

                item = ele.closest('li');  
                itemdataId = item.getAttribute('data-id');

                let moveSib =  item.nextElementSibling;                   
                let movepoint = moveSib !==null? moveSib.getAttribute('data-id') : item.getAttribute('data-id');

                addLipoint.push(movepoint);
                itemIdArr.push(itemdataId);

                if(Number(addLipoint[idx+1]) !== Number(addLipoint[idx])+1){
                    nId = addLipoint[idx];
                    nIdArr.push(nId);
                    itemNidArr.push(itemdataId);
                }  
            });
            
            nIdArr.forEach((arr)=>{
                let indexNum = nIdArr.indexOf(arr);
                sliceArr.push(indexNum);
            })

            let nIdArrCopy = [...nIdArr];
            nIdArr.forEach((element , idx) => {
                if(Number(element)+1 == Number(nIdArr[idx+1]) || nIdArr[idx+1] == undefined){
                    nIdArrCopy.splice(idx,1,'|')
                }                
            });


            nIdvalArr.push(nIdArr[0]);
            nIdIdxArr.push(0);
            
            nIdArrCopy.forEach((arr, idx) => {
                if(!arr.startsWith('|')){
                    nIdvalArr.push(arr);  
                    nIdIdxArr.push(idx);                  
                }                
            });

            nIdIdxArr.forEach((arr , idx)=>{                
                if((Number(nIdvalArr[idx]) !== Number(nIdvalArr[idx+1]) && nIdIdxArr.length-1  > idx )|| Number(nIdvalArr[idx])-1 == Number(nIdvalArr[idx-1]) || Number(nIdvalArr[idx]) !== Number(nIdvalArr[idx+1])){
                    eleline.push(itemNidArr.slice(arr,nIdIdxArr[idx+1]));
                }else {
                    eleline.push(itemNidArr.slice(arr,itemNidArr.length+1));
                }

                eleline.forEach((arr , idx)=>{

                    if(idx > 0){
                        nids = Number(nIdvalArr[idx]);
                    }else{
                        nids = nIdvalArr[idx]; 
                    }                  

                    arr.forEach((arr2,idx) => {
                        
                        if(idx > 0){
                            checkList.querySelector(`li[data-id='${arr2}']`).setAttribute('data-nid',Number(nids)-idx);
                        }else{
                            checkList.querySelector(`li[data-id='${arr2}']`).setAttribute('data-nid',Number(nids));
                        }
                    });
                })
                
            });

            updownListChildReverse.forEach((ele,idx)=>{                

                item = ele.closest('li');  
                itemdataId = item.getAttribute('data-id');
                itemdataNids = item.getAttribute('data-nid');
                itemdataPosition = item.getAttribute('data-position');

                let movepointLi;

                if(Number(addLipoint[idx-1]) == Number(addLipoint[idx])+1||Number(itemIdArr[idx])+1 == Number(itemIdArr[idx+1])|| Number(addLipoint[idx-1]) == Number(addLipoint[idx])-1 ||addLipoint[idx] == 0){
                    movepointLi = checkList.querySelector(`li[data-id="${itemdataNids}"]`); 
                        movepointLi.insertAdjacentElement('beforebegin',item);

                }else if((itemdataId == checkListLength-1) ||  (checkListLength > 1 && Number(itemIdArr[idx-1]) == Number(itemIdArr[idx])+1)){

                }else {
                    movepointLi = checkList.querySelector(`li[data-id="${addLipoint[idx]}"]`); 
                    movepointLi.after(item);
                }  

            });
    
        }else {
            alert('한개 이상 선택 하세요')
        }  
    }   
   
}

const dataIdAdd = () => {

    let updownSec = document.querySelector('.popup.p10.updownsec');
    
    let checkList = updownSec.querySelectorAll('.check-list > li');

    checkList.forEach((ele,idx) => {
        ele.setAttribute('data-id',idx);
        ele.setAttribute('data-nid','');
        ele.setAttribute('data-position','');
    });    
      
}