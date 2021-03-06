// ==UserScript==
// @name        NamufixBugReporter
// @namespace   http://nekopoly.n-e.kr/
// @description 네코폴리가 개발한 나무픽스 버그보고 플러그인 입니다.
// @include     http://no-ssl.namu.wiki/*
// @include     http://namu.wiki/*
// @include     https://namu.wiki/*
// @include     http://issue.namu.wiki/*
// @namespace   http://nekopoly.n-e.kr/
// @downloadURL https://github.com/Nekopoly/NamufixBugReporter/raw/master/NamufixBugReporter.user.js
// @version     b1.34
// @grant       none
// @run-at      document-end
// ==/UserScript==
//original backup
  var nodes = document.querySelectorAll('div[class^="Nama"]');
  var i,
  node;
  var cerror;
  $(document).ready(function() {
     // Stuff to do as soon as the DOM is ready
  for (i in nodes) {
    node = nodes[i];
    console.log(node);
  }
  if (node >= 7) {
    console.log('나무픽스(이)가 있습니다.');
    run();
  }else{
    console.log('나무픽스(이)가 없습니다.');
  }
});

function run() {
  var NEwindow_create='<div id="nbr_ne_window" style="background: rgba(0, 0, 0, 0.5) none repeat scroll 0% 0%; z-index: 999999; position: fixed; left: 0px; top: 0px; height: 100%; width: 100%;">'
  +'<div class="TooSimplePopup"><div class="header" style="background:#2D4996">나무픽스 버그리포터</div><div class="container">'
  +'<span>나무픽스를 이용하는도중 버그가발생하였나요?</span><br>'
  +'<span>사진업로드는 <a href="http://imgur.com" target="new">imgur.com</a>을 이용해주시길 바랍니다.</span><br>'
  +'<span style="color:red">별표 로 표시된것은 필수입력입니다.</span><br>'
  +'<span id="loading" style="color:#FF42D6">잠시만 기다려주십시오.</span><br>'
  +'<span>제목*</span><input name="title" type="text" style="width:100%" id="nbr_tt"/>'
  +'<span>닉네임(이름)</span><input name="names" type="text" style="width:100%" id="nbr_name"/>'
  +'<span>내용*</span><br><button type="button" style="background:#2D4996" id="nbr_img">사진첨부</button><textarea id="nbr_bd" style="max-height: calc(100vh - 150px); width: 100%; height: 390px; display: block;"></textarea>'
  +'</div><div class="footer"><button type="button" style="background:#2D4996" id="nbr_close">닫기</button><button type="button" style="background:#2D4996" id="nbr_send">보내기</button></div></div></div>';
  $('.container-fluid.wiki-article').append(NEwindow_create);
  $('#loading').hide();
  $('#nbr_close').click(function(event) {
    if($("#nbr_bd").val() == ""&&$("#nbr_tt").val()==""){
    $('#nbr_ne_window').fadeOut(500, function() {/*Nothing*/});
  }else{
    if(confirm("작성내용이 있습니다. 정말닫으시겠습니까?")!=0){
      $("#nbr_tt").val("");
      $("#nbr_name").val("");
      $("#nbr_bd").val("");
      $('#nbr_ne_window').fadeOut(500, function() {/*Nothing*/});
    }else{

    }
  }
  });
  $('#nbr_img').click(function(event) {
    /* Act on the event */
    var msg = "이미지주소를 입력하여주십시오. 예)http://i.imgur.com/0LINzxs.jpg";
    var result = prompt(msg);
    if(result===null){
      return;
    }
    if(result==""){
          alert("이미지 주소가 없습니다.")
        }else{
          //$('#nbr_bd').append("![image]("+result+")");
          var areaValue = $('#nbr_bd').val();
          $('#nbr_bd').val(areaValue +"\n"+"![image]("+result+")");
      }
  });
  $('#nbr_send').click(function(event) {
    /*var title = $("#nbr_tt").val();
    var nick = $("#nbr_name").val();
    var body = $("#nbr_bd").val();*/
    $('#loading').show();
    $.ajax({
		url:"https://shironeko.nekopoly.n-e.kr/backend/index.php",
    //url:"http://localhost:8000/index.php",
		contentType: "application/json",
		type:"POST",
		cache:false,
		datatype:"json",
    data:JSON.stringify({"title":$("#nbr_tt").val(),"body":$("#nbr_bd").val(),"users":$("#nbr_name").val()}),
		success: function(data) {
            //alert("의견을 보내주셔서 감사합니다.");
            var conv_string = JSON.stringify(data);
            var parsed = JSON.parse(conv_string);
            alert(parsed.message);
            if(parsed.status=="error"||parsed.status=="fuckyou"){
            }else{
              $("#nbr_tt").val("");
              $("#nbr_name").val("");
              $("#nbr_bd").val("");
              $('#nbr_ne_window').fadeOut(500, function() {/*Nothing*/});
            }
    },
    beforesend:function(){
      $('#loading').text("전송중...");
      $('#loading').show();
    },
    complete:function(){
      setTimeout(function (){
       $('#loading').text("잠시만 기다려주십시오...");
       $('#loading').hide();
      },5000);
    },
    error:function (request, status, error) {
        //alert("실패:"+request.responseText);
      cerror ="접속에 실패하였습니다."+request.responseText;
      Isfail();
		}
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
    $('#nbr_ne_window').fadeIn(500, function() {});
  });
}
function Isfail(){
  $('#loading').show();
  $('#loading').text(cerror);
}
