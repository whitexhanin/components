window.addEventListener('load',function(){
    let tab = document.querySelectorAll('.tab');
    tab.forEach(element => {
        element.addEventListener('click',tabClick);        
    });
})

const tabClick = (e) => {
    let target = e.currentTarget;
    let tabArea = target.closest('.tab-area');
    let tabAll = tabArea.querySelectorAll('.tab');    

    tabAll.forEach(element => {
        element.classList.remove('on');        
    });
    target.classList.add('on');
}