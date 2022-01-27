*TAB 기계에서 공지사항 팝업 TOUCH로 좌우 이동 하기*

준비사항 touchstart,thochmove,thochend 
        touch 시작 시  div(슬라이드 컴포넌트)의 screenX


touchstart
: touch 시작 시 touch의 screenX 좌표 를 얻는다.이것을 beforeX라 부르겠다.

touchmove
: 시 따로 할 이벤트는 없어서 사용 안했다.

touchend 
: touchend시 나온 div의 screenX와 beforeX와 비교 하여 beforeX 값이 크면 next 함수,beforeX 값이 작으면 prev 함수 실행 된다.






