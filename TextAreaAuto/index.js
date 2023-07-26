window.addEventListener('load',function(){
    
    let txtArea = document.querySelectorAll('.txtarea');
    txtArea.forEach(element => {
        element.addEventListener('input',textAreaHeight);
        textAreaHeight(element);
    });


    let btnP6 = document.querySelectorAll(".btn-pop2[data-pop=p6]");
    btnP6.forEach(element => {
        element.addEventListener('click',function(){

            txtArea = document.querySelectorAll('.popup[data-pop=p6] .txtarea');
            txtArea.forEach(element => {                
                textAreaHeight(element);
            });
        });
        
    });
    let btnP2 = document.querySelectorAll('.btn-pop2[data-pop=p2]');
    btnP2.forEach(element => {
        element.addEventListener('click',function(){

            txtArea = document.querySelectorAll('.popup[data-pop=p2] .txtarea');
                        
            txtArea.forEach(element => {                
                textAreaHeight(element);
            });
            
            
        });
        
    });

    let btnP10 = document.querySelectorAll('.btn-pop2[data-pop=p10]');
    btnP10.forEach(element => {
        element.addEventListener('click',function(){

            txtArea = document.querySelectorAll('.popup[data-pop=p10] .txtarea');
                        
            txtArea.forEach(element => {                
                textAreaHeight(element);
            });
            
            
        });
        
    });    

})

const textAreaHeight = (e) => {    
    let target  = e.type == 'input' ? e.currentTarget : e;    
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
}