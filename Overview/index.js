window.addEventListener('load',function(){
    let itemList = document.querySelectorAll('.itemlist button');
    itemList.forEach(element => {
        element.addEventListener('click',itemClick);    
    });
    
})

const itemClick = (e) => {
    let target = e.currentTarget;
    let name = target.innerText;
    let iframe = document.querySelector('iframe');

    iframe.setAttribute('src','../ '+ name + '/index.html');
    
    

    setAtt
}