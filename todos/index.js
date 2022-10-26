window.addEventListener('DOMContentLoaded',function(){

    enterAdd();
    ckLI();
    btnModify();
    btnOk();
    btnDel();
    btnCkAll();
});

const enterAdd = () => {    
    let addInput = document.querySelector('#add');    
    let addText;

    addInput.addEventListener('keypress',function(e){
        addText = addInput.value;

        if(e.key === "Enter"){            
            todoLi(addText);
            addInput.value = '';
        }
    });    
}

const btnAdd = () => {
    let addInput = document.querySelector('#add');    
    let addText;

    todoLi(addText);
    addInput.value = '';
}

const todoLi = (text) => {
    let ul = document.querySelector('.todos-ul');
    let ulcount = ul.childElementCount;
    let li = document.createElement('li');
    let txt = text;

    ul.appendChild(li);
    li.setAttribute('date-id',ulcount + 1);

    li.innerHTML = `
    <input type="checkbox" name="" id="">
    <input type="text" name="" id="" value=` + txt + `  readonly>    
    `;    
}

let numadd = [];

const ckLI = () => {
    let ul = document.querySelector('.todos-ul');
    let ulcount = ul.childElementCount;
    let id;
    

    ul.addEventListener('pointerdown',function(e){      

        let allCk = document.querySelector('.all-ck');
        let alck = allCk.querySelector('input[type="checkbox"]');
        

        if(e.target.type == 'checkbox'){
            
            let li = e.target.parentElement;
            id = li.getAttribute('date-id');
            ulcount = ul.childElementCount;

            switch (e.target.checked) {
                case false:
                    numadd.push(id);                    
                    if(ulcount == numadd.length){
                        alck.checked = true;
                    }
                    break;
                case true:
                    numadd.splice(numadd.indexOf(id), 1)                    
                    alck.checked = false;

                    break;
                default:
                    break;
            }     
            choiceNum(numadd.length)
            
        }      
    });        
}

const btnModify = () => {    
    let btnmodify = document.querySelector('.modify');

    btnmodify.addEventListener('pointerdown',function(e){        
        let txt = e.currentTarget.textContent;
        if(numadd.length > 0){

            switch (txt) {
                case '작업수정':

                    numadd.forEach(element => {            
                        document.querySelector('[date-id="' + element + '"]').classList.add('modify');                                
                        document.querySelector('[date-id="' + element + '"] input[type="text"]').readOnly = false;
                    });    

                    btnmodify.textContent = '작업수정완료';
                    
                    break;

                case '작업수정완료':
                    numadd.forEach(element => {            
                        document.querySelector('[date-id="' + element + '"]').classList.remove('modify');            
                        document.querySelector('[date-id="' + element + '"] input[type="text"]').readOnly = true;
                    });    

                    btnmodify.textContent = '작업수정';
                
                    break;
            
                default:
                    break;
            }
        }

        
    }) 
}

const btnOk = () => {    
    let btnok = document.querySelector('.ok');
    let btnmodify = document.querySelector('.modify');

    btnok.addEventListener('pointerdown',function(e){       

        if(numadd.length > 0 && btnmodify.textContent !== '작업수정완료'){

            numadd.forEach(element => {  
                document.querySelector('[date-id="' + element + '"]').classList.add('todo-ok'); 
                document.querySelector('[date-id="' + element + '"] input[type="checkbox"]').disabled = true;
                document.querySelector('[date-id="' + element + '"] input[type="checkbox"]').checked = false;
                // document.querySelector('[date-id="' + element + '"] input[type="checkbox"]').setAttribute('type','hidden');                     
            });
            numadd = [];
            choiceNum(numadd.length)
        }

        
    }) 
}

const btnDel = () => {

    let btndel = document.querySelector('.del');
    let btnmodify = document.querySelector('.modify');

    btndel.addEventListener('pointerdown',function(e){       

        if(numadd.length > 0 && btnmodify.textContent !== '작업수정완료'){

            numadd.forEach(element => {  
                document.querySelector('[date-id="' + element + '"]').remove();                 
            });
            numadd = [];
            choiceNum(numadd.length)
        }
    }) 
}

const btnCkAll = () => {
    let allCk = document.querySelector('.all-ck');
    allCk.addEventListener('pointerdown',function(e){
        let target = e.target;
        let alck = allCk.querySelector('#all');
        let ul = document.querySelector('.todos-ul');
        let ulChild = ul.childElementCount;
        let ck = ul.querySelectorAll('input[type="checkbox"]');
        let id;

        if(ulChild > 0){
            if(alck.checked == true) {

                ck.forEach(element => {
                    element.checked = false;
                });
                if(target.className == 'all-ck'){
                    alck.checked = false;
                }
                
                numadd = [];                

            }else if(alck.checked == false){

                ck.forEach(element => {
                    if(element.checked == false && element.disabled == false){
                        id = element.parentElement.getAttribute('date-id');
                        element.checked = true;
                        numadd.push(id);   
                    }                    
                });           
                if(target.className == 'all-ck'){
                    alck.checked = true;
                }    
            }   
            choiceNum(numadd.length)                  
        }
    });   
}

const choiceNum = (numadd) => {    
    let num = document.querySelector('.num');    
     num.textContent = numadd;
}

