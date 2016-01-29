// ==UserScript==
// @name        NamufixBugReporter
// @namespace   http://nekopoly.n-e.kr/
// @description Nekopoly's Namufix BugReporter
// @include     http://no-ssl.namu.wiki/*
// @include     http://namu.wiki/*
// @include     https://namu.wiki/*
// @include     http://issue.namu.wiki/*
// @downloadURL http://localhost:8000/NamufixBugReporter.user.js
// @require     http://shironeko.nekopoly.n-e.kr/static/jquery-2.2.0.min.js
// @version     1
// @grant       none
// @run-at      document-end
// ==UserScript==

  var nodes = document.querySelectorAll('div[class^="Nama"]');
  var i,
  node;
  $(document).ready(function() {
     // Stuff to do as soon as the DOM is ready
  for (i in nodes) {
    node = nodes[i];
    console.log(node);
  }
  if (node >= 7) {
    console.log('나무픽스(이)가 있습니다.');
    run();
  } else {
    console.log('나무픽스(이)가 없습니다.');
  }
});

function run() {
  var NEwindow_create='<div id="nbr_ne_window" style="background: rgba(0, 0, 0, 0.5) none repeat scroll 0% 0%; z-index: 999999; position: fixed; left: 0px; top: 0px; height: 100%; width: 100%;">'
  +'<div class="TooSimplePopup"><div class="header" style="background:#2D4996">나무픽스 버그리포터</div><div class="container">'
  +'나무픽스를 이용하는도중 버그가발생하였나요?<br/>'
  +'<span>제목</span><input name="title" type="text" style="width:100%" />'
  +'</div><div class="footer"><button type="button" style="background:#2D4996" id="nbr_close">닫기</button></div></div></div>';
  $('.container-fluid.wiki-article').append(NEwindow_create);
  $('#nbr_close').click(function(event) {
    $('#nbr_ne_window').fadeOut(500, function() {
      //Stuff to do *after* the animation takes place
    });
  });
  $('#nbr_ne_window').hide(); //숨기기
 //-----------------------------------
  //$('.container-fluid.wiki-article').prepend('<div class="alert alert-success" role="alert" id="nbr_notice"><strong>[알림]</strong><br>나무픽스 버그리포터가 정상적으로 실행되었습니다.</div>');
  /*setTimeout(function () {
    $('#nbr_notice').fadeOut(500, function() {
      //Stuff to do *after* the animation takes place
    });
  }, 2000);*/
  $('.NamaEditor.NEMenu').append('<button title="버그리포트" type="button" class="NamaEditor NEMenuButton" id="bugreport"><span class="ion-bug"></span></button>');
  $('#bugreport').click(function(event) {
    $('#nbr_ne_window').show();
  });
}
