"use strict";

window.addEventListener('load', function () {
  /*공지사항 클릭 시  */
  var popup = document.querySelector('.popup.notice');
  var hasOn = popup.classList.contains('on');
  var dotwrap = document.querySelector('.dot-wrap');
  var dot = dotwrap.querySelectorAll('.dot');
  var noticeWrapLI = document.querySelectorAll('.notice-wrap .rolling > .inner > li');
  var noticeWrapUl = document.querySelector('.notice-wrap .rolling > .inner');
  var child = noticeWrapUl.childElementCount;
  noticeHeaderlist();

  if (child > 0) {
    /* 공지사항 리스트 갯수 체크*/
    noticelist();
    /*  *공지사항 리스트 갯수 만큼 점 추가**/

    pageDotadd();
    /* 공지사항 리스트 Width값 추가*/

    noticeWidth();
  } // 헤더 공지사항 리스트 클릭시 팝업 열림


  noticeWrapLI.forEach(function (element) {
    element.addEventListener('click', popupOpen);
  });
  /**점 클릭 시  **/

  dot = dotwrap.querySelectorAll('a');
  dot.forEach(function (element) {
    element.addEventListener('click', pageDot);
  });
  /*공지사항 prev ,next */

  var prev = document.querySelector('.popup.notice .arrow .prev');
  prev.addEventListener('click', noticePrev);
  var next = document.querySelector('.popup.notice .arrow .next');
  next.addEventListener('click', noticeNext);
  /*공지사항 롤링 */

  startTimer();
  /*헤더 공지사항 arrow버튼 */

  var btnArrow = document.querySelector('.btn_arrow');
  var btnArrowUp = btnArrow.querySelector('.up');
  var btnArroDown = btnArrow.querySelector('.down');

  if (child >= 2) {
    btnArrow.classList.add('on');
    btnArrowUp.classList.add('on');
    btnArroDown.classList.add('on');
    btnArrowUp.addEventListener('click', upEvent);
    btnArroDown.addEventListener('click', downEvent);
  }
  /*dim 클릭 시 켜있는 팝업 닫힘 */


  var dim = document.querySelector('.dim');
  dim.addEventListener('click', dimClick);
  /*팝업 닫기(클로즈버튼)*/

  var closePP = document.querySelectorAll('.popup > .header > .close');
  closePP.forEach(function (element) {
    element.addEventListener('click', closePopup);
  });
  /*스와이프 */

  var innerSlider = document.querySelector(".notice-list");
  var beforeScreenX, screenX;
  innerSlider.addEventListener("touchstart", function (e) {
    beforeScreenX = e.changedTouches[0].screenX;
  });
  innerSlider.addEventListener("touchmove", function (e) {});
  innerSlider.addEventListener("touchend", function (e) {
    screenX = e.changedTouches[0].screenX;
    moveSwiper(screenX, beforeScreenX);
  });
}); //공지사항 스와이프

var moveSwiper = function moveSwiper(screenX, beforeScreenX) {
  if (screenX < beforeScreenX) {
    noticeNext();
  } else {
    noticePrev();
  }
}; //헤더 공지사항 리스트 갯수 체크


var noticeHeaderlist = function noticeHeaderlist(e) {
  var noticeWrap = document.querySelector('.notice-wrap');
  var noticeWrapUl = document.querySelector('.notice-wrap .rolling > .inner');
  var child = noticeWrapUl.childElementCount;
  var noticeWrapLi = noticeWrapUl.querySelectorAll('li');

  if (child == 0) {
    noticeWrap.classList.remove('on');
  } else {
    noticeWrap.classList.add('on');
    noticeWrapLi.forEach(function (element, index) {
      element.setAttribute('index', index);
    });
  }
}; //공지사항 팝업 리스트 체크


var noticelist = function noticelist(e) {
  var noticeList = document.querySelector('.notice-list');
  var child = noticeList.childElementCount;

  if (child >= 1) {
    noticeWidth();
  }
}; //공지사항 가로 값,갯수 가로 값


var noticeWidth = function noticeWidth(e) {
  var ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
  var bodyWidth = ppNoticeWidth - '2';
  var noticeList = document.querySelector('.popup.notice .notice-list');
  var Li = noticeList.querySelectorAll('li');
  var length = noticeList.childElementCount;
  Li.forEach(function (element) {
    element.style.width = bodyWidth + 'px';
  });
  noticeList.style.width = bodyWidth * length + 'px';
}; //페이징 점 추가


var pageDotadd = function pageDotadd(e) {
  var noticeList = document.querySelector('.popup.notice .notice-list');
  var Li = noticeList.querySelectorAll('li');
  var dotWrap = document.querySelector('.dot-wrap');
  Li.forEach(function (element, index) {
    var a = document.createElement('a');
    a.setAttribute('class', 'dot' + index);
    a.setAttribute('href', '#');
    a.setAttribute('index', index);
    dotWrap.append(a);
  });
}; //페이징 점 이벤트


var pageDot = function pageDot(e, index) {
  e.preventDefault();
  var target = e.currentTarget;
  var count = target.attributes.index.value;
  var dotWrap = document.querySelector('.dot-wrap');
  var dot = dotWrap.querySelectorAll('a');
  var ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
  var bodyWidth = ppNoticeWidth - '2';
  var noticeList = document.querySelector('.popup.notice .notice-list');
  dot.forEach(function (element) {
    element.classList.remove('on');
  });
  target.classList.add('on');
  noticeList.setAttribute('index', count);
  noticeList.style.transform = 'translateX(' + ('-' + bodyWidth * count) + 'px)';
  sliderIndexEvent(e, count);
}; // 헤더 공지사항 리스트 클릭시 팝업 열림


var popupOpen = function popupOpen(e) {
  e.preventDefault();
  var t = e.currentTarget;
  var tIndex = t.attributes.index.value;
  var popup = document.querySelector('.popup.notice');
  popup.classList.add('on');
  noticeWidth();
  dimAdd();
  roeX(e, tIndex);
};

var roeX = function roeX(e, index) {
  var count = index;
  var ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
  var bodyWidth = ppNoticeWidth - '2';
  var noticeList = document.querySelector('.popup.notice .notice-list');
  var dotWrap = document.querySelector('.dot-wrap');
  var dotpick = dotWrap.querySelector('.dot' + index);
  noticeList.setAttribute('index', count);
  noticeList.style.transform = 'translateX(' + ('-' + bodyWidth * count) + 'px)';
  dotpick.classList.add('on');
  sliderIndexEvent(e, index);
};

var sliderIndexEvent = function sliderIndexEvent(e, index) {
  var count = index;
  var noticeList = document.querySelector('.popup.notice .notice-list');
  var length = noticeList.childElementCount;
  var prev = document.querySelector('.popup.notice .arrow .prev');
  var next = document.querySelector('.popup.notice .arrow .next');

  if (count == 0) {} else if (count <= length && count > 0) {
    noticeList.setAttribute('index', count);
  }

  if (count == length) {} else if (count <= length && count >= 0) {
    noticeList.setAttribute('index', count);
  }

  pageIdk(e, index);
};

var sliderDotEvent = function sliderDotEvent(index) {
  var count = index;
  var dotWrap = document.querySelector('.dot-wrap');
  var dot = dotWrap.querySelectorAll('a');
  var target = dotWrap.querySelector('.dot' + count);
  dot.forEach(function (element) {
    element.classList.remove('on');
  });
  target.classList.add('on');
};
/*공지사항 prev */


var noticePrev = function noticePrev(e) {
  e.preventDefault();
  var ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
  var bodyWidth = ppNoticeWidth - '2';
  var noticeList = document.querySelector('.popup.notice .notice-list');
  var length = noticeList.childElementCount;
  var tIndex = noticeList.attributes.index.value;
  var count = tIndex;
  var prev = document.querySelector('.popup.notice .arrow .prev');
  var next = document.querySelector('.popup.notice .arrow .next');
  var dotWrap = document.querySelector('.dot-wrap');
  var dot = dotWrap.querySelectorAll('a');
  var dot0 = dotWrap.querySelector('.dot0');
  var pageNum = document.querySelector('.page_num');
  var pageCrt = pageNum.querySelector('.current');
  count--;

  if (count == 0) {
    prev.classList.remove('on');
    noticeList.style.transform = 'translateX(' + ('-' + bodyWidth * count) + 'px)';
    noticeList.setAttribute('index', count);
    pageCrt.innerHTML = Number(count) + 1;
    dot.forEach(function (element) {
      element.classList.remove('on');
    });
    dot0.classList.add('on');
  } else if (count <= length - 1 && count > 0) {
    prev.classList.add('on');
    next.classList.add('on');
    noticeList.style.transform = 'translateX(' + ('-' + bodyWidth * count) + 'px)';
    noticeList.setAttribute('index', count);
    pageCrt.innerHTML = Number(count) + 1;
    sliderDotEvent(count);
  }
};
/*공지사항 next */


var noticeNext = function noticeNext(e) {
  e.preventDefault();
  var ppNoticeWidth = document.querySelector('.popup.notice').clientWidth;
  var bodyWidth = ppNoticeWidth - '2';
  var noticeList = document.querySelector('.popup.notice .notice-list');
  var length = noticeList.childElementCount;
  var tIndex = noticeList.attributes.index.value;
  var count = tIndex;
  var next = document.querySelector('.popup.notice .arrow .next');
  var prev = document.querySelector('.popup.notice .arrow .prev');
  var dotWrap = document.querySelector('.dot-wrap');
  var dot = dotWrap.querySelectorAll('a');
  var dot0 = dotWrap.querySelector('.dot' + count);
  var pageNum = document.querySelector('.page_num');
  var pageCrt = pageNum.querySelector('.current');
  count++; // console.log('next',count);

  if (count == length - 1) {
    next.classList.remove('on');
    noticeList.style.transform = 'translateX(' + ('-' + bodyWidth * count) + 'px)';
    noticeList.setAttribute('index', count);
    pageCrt.innerHTML = Number(count) + 1;
    dot.forEach(function (element) {
      element.classList.remove('on');
    });
    dot0 = dotWrap.querySelector('.dot' + count);
    dot0.classList.add('on');
  } else if (count <= length - 1 && count >= 0) {
    next.classList.add('on');
    prev.classList.add('on');
    noticeList.style.transform = 'translateX(' + ('-' + bodyWidth * count) + 'px)';
    noticeList.setAttribute('index', count);
    pageCrt.innerHTML = Number(count) + 1;
    sliderDotEvent(count);
  }
}; //공지사항 페이지 인디케이터


var pageIdk = function pageIdk(e, index) {
  var count = index;
  var noticeWrapUl = document.querySelector('.notice-wrap .rolling > .inner');
  var child = noticeWrapUl.childElementCount;
  var noticeList = document.querySelector('.popup.notice .notice-list');
  var length = noticeList.childElementCount;
  var pageNum = document.querySelector('.page_num');
  var pageCrt = pageNum.querySelector('.current');
  var pageTt = pageNum.querySelector('.total');
  var page = document.querySelector('.page');

  if (child > 1) {
    page.classList.replace('off', 'on');
    noticeList.classList.remove('full');
    pageCrt.innerHTML = Number(count) + 1;
    pageTt.innerHTML = length;
  } else {
    page.classList.replace('on', 'off');
    noticeList.classList.add('full');
  }
}; //공지사항 롤링


var isPause = false;
var timerId;
var first = false;

var startTimer = function startTimer() {
  isPause = false;
  timerId = setInterval(rolling, 5000);
};

var stopTimer = function stopTimer() {
  clearInterval(timerId);
  isPause = true;
};

var rolling = function rolling() {
  var noticeWrap = document.querySelector('.notice-wrap');
  var noticeWrapUl = noticeWrap.querySelector('.rolling > .inner');
  var noticeWrapLi = noticeWrapUl.querySelector('li:first-child');

  if (!isPause) {
    noticeWrapUl.animate([{
      transform: 'translateY(-0px)'
    }, {
      transform: 'translateY(-10px)'
    }], {
      duration: 500
    });
    noticeWrapUl.append(noticeWrapLi.cloneNode(true));
    setTimeout(function () {
      noticeWrapLi.remove();
      noticeWrapUl.animate([{
        transform: 'translateY(10px)'
      }, {
        transform: 'translateY(0px)'
      }], {
        duration: 200
      });
      noticeWrapUl.style.transform = 'translateY(-0px)';
    }, 500);
  }
};
/*헤더 공지사항 버튼*/


var upEvent = function upEvent(e) {
  e.preventDefault();
  var noticeWrap = document.querySelector('.notice-wrap');
  var noticeWrapUl = noticeWrap.querySelector('.rolling > .inner');
  var noticeWrapLi_last = noticeWrapUl.querySelector('li:last-child');
  noticeWrapUl.animate([{
    transform: 'translateY(-24px)'
  }, {
    transform: 'translateY(-0px)'
  }], {
    duration: 500
  });
  noticeWrapUl.prepend(noticeWrapLi_last.cloneNode(true));
  noticeWrapLi_last.remove();
  noticeWrapUl.style.transform = 'translateY(-0px)';
  stopTimer();
  startTimer();
};

var downEvent = function downEvent(e) {
  e.preventDefault();
  var noticeWrap = document.querySelector('.notice-wrap');
  var noticeWrapUl = noticeWrap.querySelector('.rolling > .inner');
  var noticeWrapLi_first = noticeWrapUl.querySelector('li:first-child');
  var rectY = Math.floor(noticeWrapUl.getBoundingClientRect().top);
  stopTimer();

  if (rectY >= 20) {
    noticeWrapUl.animate([{
      transform: 'translateY(-0px)'
    }, {
      transform: 'translateY(-10px)'
    }], {
      duration: 500
    });
    noticeWrapUl.append(noticeWrapLi_first.cloneNode(true));
    setTimeout(function () {
      noticeWrapLi_first.remove();
      noticeWrapUl.animate([{
        transform: 'translateY(10px)'
      }, {
        transform: 'translateY(0px)'
      }], {
        duration: 200
      });
      noticeWrapUl.style.transform = 'translateY(-0px)';
    }, 500);
  }

  startTimer();
}; //헤더 프로필 


var profileToggle = function profileToggle(e) {
  e.preventDefault();
  var sub = document.querySelector('.profile-wrap .sub-wrap');
  var OnHas = sub.classList.contains('on');

  if (!OnHas) {
    sub.classList.add('on');
  } else {
    sub.classList.remove('on');
  }
};
/*dim 클릭 시 팝업 닫힘 */


var dimClick = function dimClick(e) {
  e.preventDefault();
  var popup = document.querySelectorAll('.popup');
  popup.forEach(function (element) {
    element.classList.remove('on');
  });
  dimRemove();
};
/*팝업 닫기(클로즈버튼)*/


var closePopup = function closePopup(e) {
  e.preventDefault();
  var target = e.currentTarget.parentElement.parentElement;
  var dotWrap = document.querySelector('.dot-wrap');
  var dot = dotWrap.querySelectorAll('a'); //공지사항

  if (target.classList.contains('notice')) {
    dot.forEach(function (element) {
      element.classList.remove('on');
    });
  } //노선도


  var btn04 = document.querySelector('.left-btn > .btn-04');

  if (target.classList.contains('map')) {
    btn04.classList.remove('on');
  }

  target.classList.remove('on');
  dimRemove();
};
/*팝업 배경 생성*/


var dimAdd = function dimAdd(e) {
  var dim = document.querySelector('.dim');
  dim.classList.add('on');
};
/*팝업 배경 삭제*/


var dimRemove = function dimRemove(e) {
  var dim = document.querySelector('.dim');
  var notice = document.querySelector('.popup.notice');
  var hasOn = notice.classList.contains('on'); //공지사항

  var dotWrap = document.querySelector('.dot-wrap');
  var dot = dotWrap.querySelectorAll('a');
  dot.forEach(function (element) {
    element.classList.remove('on');
  }); //노선도    

  var btn04 = document.querySelector('.left-btn > .btn-04');

  if (btn04 !== null) {
    if (btn04.classList.contains('on')) {
      btn04.classList.remove('on');
    }
  }

  dim.classList.remove('on');
};