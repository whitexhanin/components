window.addEventListener('load',function(){    

    let stateWrap = document.querySelector('.section-beato .state-wrap');
    let timerBtn = stateWrap.querySelector('.btn');

    timerBtn.addEventListener('click',beatoBtnClick);

});

const beatoBtnClick = (e) => {
    let target = e.currentTarget;
    let stateWrap = document.querySelector('.section-beato .state-wrap');
    const stopwatch = document.getElementById("stopwatch");


    if(stateWrap.classList.contains('start')){                
        startClock();
        stateWrap.classList.replace('start','pause');
    }else{
        stopClock(); 
        target.setAttribute('data-join','alert');  
        stateWrap.classList.replace('pause','start');      
    }
}


let timerId;
let time = 0;
let  hour, min, sec;

const printTime = (e) => {
    time++;
    stopwatch.innerText = getTimeFormatString();
}

//시계 시작 - 재귀호출로 반복실행
const startClock = (e) => {       
    printTime();
    stopClock();
    timerId = setTimeout(startClock, 1000);
}

//시계 중지
const stopClock = (e) => {
    if (timerId != null) {
        clearTimeout(timerId);
    }
}

// 시계 초기화
const resetClock = (e) => {
    stopClock()
    stopwatch.innerText = "00:00:00";
    time = 0;
}

// 시간(int)을 시, 분, 초 문자열로 변환
const getTimeFormatString = (e) => {
    hour = parseInt(String(time / (60 * 60)));
    min = parseInt(String((time - (hour * 60 * 60)) / 60));
    sec = time % 60;

    return String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}