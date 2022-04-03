<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>온누리콜센터</title>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<meta http-equiv="Pragma" content="no-cache" />
	
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.theme.css" type="text/css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha256-3dkvEK0WLHRJ7/Csr0BZjAWxERc5WH7bdeUya2aXxdU= sha512-+L4yy6FRcDGbXJ9mPG8MT/3UCDzwR9gPeyFNMCtInsol++5m3bk2bXWKdZjvybmohrAsn3Ua5x8gfLnbE1YkOg==" crossorigin="anonymous">
	<link rel="stylesheet" href="/stylesheets/style.css" integrity="sha256-OlSbjYBfrJGGd2zbT3qCsAZsPGxRwKOSGjqqfjF8aiY= sha512-1aDUINxj8c9UXJ76eIMAkG2/ofIjG8FBW4drgHUglwY/rGn+YWUtm8iSkrpAOtwZ9b9LEva02KPrTDx3M5ib3w==" crossorigin="anonymous">
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/comCounselSpec.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-rate-picker.js'/>"></script>
	
	<!-- SoftPhone 관련 스크립트 -->
	<script type="text/javascript" src="<c:url value='/resources/js/cti/ws_cti.js'/>"></script>
	<!-- 녹취 관련 스크립트 -->
	<!-- 
	<script type="text/javascript" src="<c:url value='/resources/js/rec/VOC_RecSeeInterfaceWeb.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/rec/VOC_RecSeeClient.js'/>"></script>
    -->
	<!-- -->
	<script type="text/javascript" src="<c:url value='/resources/js/cti/WS_softPhone.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/main/CallMain.js'/>"></script>
	
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
	<style type="text/css">
	
    	.ui-jqgrid tr.jqgrow td { white-space:nowrap !important; text-overflow: ellipsis;-o-text-overflow: ellipsis; }
    	
		.news { padding: 0 0px 20px; }		
		.news .open-event { height: 16px; position: relative; overflow: hidden; }
		.news .open-event ul { position: absolute; top: 0px; }
		.news .open-event ul#notice1 { left: 0; }
		.news .open-event ul#notice2 { right: 20px; }
		.news .open-event ul li { height: 20px; color: white; font-weight: bold; display: inline-block; width: 550px; cursor: pointer; }
		.news .open-event ul li:hover { text-decoration: underline; }
		.news .open-event ul li a { color: white; font-weight: bold; display: inline-block; width: 550px; }
		.news .open-event ul li a:hover { color: #8f7614; }
		.news .open-event ul li a strong { margin-right: 10px; }
		.news .open-event ul li span.date { display: inline-block; width: 60px; }
		.news .open-event .prev { position: absolute; top: 1px; right: 2px; width: 7px; height: 4px; line-height: 0; font-size: 0; }
		.news .open-event .next { position: absolute; bottom: 1px; right: 2px; width: 7px; height: 4px; line-height: 0; font-size: 0; }		
		.news .control { float: left; margin: 0px 0 0 10px; }
		.news .control a.stop { font-size: 12px; }
		.news .control a.on { color: red; font-size: 12px; }
		
		/* for MS계열 브라우저 */
		@keyframes blink { 
			0% { background-color: red; }
			50%{ background-color: yellow; }
		}
		
		/* blink CSS 브라우저 별로 각각 애니메이션을 지정해 주어야 동작한다. */
		.blinkcss {
			display: inline-block;
			margin: 1px 1px;
			border-radius: 4px;
			border: 1px solid #2b91dd;
			line-height: 1;
			padding: 2px 8px 4px 8px;
			font-family: 'NanumGothic', sans-serif;
			text-align: center;
			font-weight: bold;
			color: #fff;
			text-decoration: none;
			animation: blink 1s step-end infinite;
			-webkit-animation: blink 1s step-end infinite;
		}
		
		/******* 전화걸기 팝업 *******/
		a { color: #000; }
		.mask {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10;
			background: #000;
			opacity: .5;
			filter: alpha(opacity = 50);
		}
		/* #modalLayer{display:none; position:relative;} */
		#modalLayer {
			left: 203px;
			top: 68px;
			display: block;
			position: absolute;
			z-index: 9;
			text-align: left;
			border-radius: 0px 0px 7px 7px;
		}
		
		#modalLayer #modalLayerheader {
			/* padding: 5px; */
			padding-left: 15px;
			position: relative;
			/*  cursor: move; */
			z-index: 12;
			background-color: #003b91;
			color: #fff;
			font-weight: bold;
		}
		/* #modalLayer .modalContent{width:440px; height:123px; padding:20px; border:1px solid #ccc; position:fixed; left:30%; top:19%; z-index:11; background:#fff;border-radius: 7px;} */
		#modalLayer .modalContent {
			width: 606px;
			height: 32px;
			/* padding:3px 20px 3px 3px; */
			border: 1px solid #ccc;
			position: relative;
			left: 0;
			top: 19%;
			z-index: 11;
			background: #f6f6f6;
			border-radius: 0px 0px 7px 7px;
		}
		
		#modalLayer .modalContent button {
			/* position:absolute; */
			right: 0;
			top: 0;
			cursor: pointer;
		}
		
		#modalLayer .modalContent img {
			position: absolute;
			right: 0;
			top: 0;
			cursor: pointer;
		}
		/**************************/
		
		/** 빠른걸기 전화걸기 입력란 x버튼 삭제*/
		#modalCallNum::-ms-clear {
			display: none;
		}
	</style>

</head>
<body class="cbp-spmenu-push" style="overflow-y: hidden; min-width: 1904px; display:none;">
	<%@include file="/WEB-INF/jsp/common/header.jsp" %>
					
	<div id="contents_container">
		<div class="l-contents">
			<%@include file="/WEB-INF/jsp/common/custom_area.jsp" %>
			
			<%@include file="/WEB-INF/jsp/common/cnsl_history.jsp" %>
			<!-- ".list1"-->
		</div>
		<!--".l-contents"-->

		<div class="r-contents">
			<%@include file="/WEB-INF/jsp/common/content_tab.jsp" %>		
		</div>
		<!--".r-contents"-->
	</div>
	<!--".contents_container"-->
	<%@include file="/WEB-INF/jsp/common/footer.jsp" %>

	<!-- 전화걸기 팝업 -->
	<!--Draggable DIV:-->
	<div id="modalLayer">
		<div id="modalLayerheader">		
			<table>
				<tr>
					<th>
						<label style="color: #fff; cursor: move;">빠른전화걸기</label> 
						<img style="cursor: pointer;" src="<c:url value='/resources/images/pop_calldot_3.png'/>" id="lastFourDigit" alt="빠른전화걸기">
					</th>
					<td class="btn" style="padding-left: 10px; margin-left: 10px;">
						<img style="cursor: pointer;" src="<c:url value='/resources/images/sel_dub_arrow2.png'/>" id="popupCollapse" alt="펼치기">
					</td>
					<td class="btn" style="width: 80%; text-align: right; padding-left: 10px; margin-right: 10px;">
						<img style="cursor: pointer;" src="<c:url value='/resources/images/modal_close.png'/>" id="popupClose" alt="닫기">
					</td>
				</tr>
			</table>
		</div>
		<div class="modalContent">
			<div id="search" style="padding: 0px; margin-left: 2px; width: 600px; border-radius: 0 0 5px 5px;">
				<table summary="전화걸기" class="search_tbl">
					<tr>
						<th scope="row" style="width: 45px; text-align: left;">
							<label id="labCheckAff" for="chkAff" style="font-size: 9pt;">서무</label>
							<input type="checkbox" id="chkAff" class="checkbox" alt="서무">
						</th>
						<td scope="row" class="nemo_50" style="width: 440px;">
							<input type="text" id="modalCallNum" class="text_ol" maxlength="50" placeholder=" 전화번호 부서명 업무명을 입력해주세요!" alt="전화번호 부서명 업무명" title="전화번호 부서명 업무명"> 
							<input type="hidden" id="hidDBCallNum" value="" alt="전화번호" title="전화번호"> 
							<input type="hidden" id="hidKeyInput" value="" alt="검색어" title="검색어">
						</td>
						<td class="btn">
							<button type="button" id="btnModalCall" class="button">걸기</button>&nbsp;
							<button type="button" id="btnModalHangUp" class="button">끊기</button>
						</td>
					</tr>
				</table>

			</div>

		</div>
	</div>

	<!-- 걸기 버튼 클릭 시 메뉴 -->
	<div id="divPhoneMenu"
		style="background-color: white; padding: 0; margin: 0;">
		<div style="width: 80px; position: absolute; top: 5px; right: 5px; padding: 0; margin: 0; z-index: 99;">
			<div>
				<ul style="width: 100%; font-size: 15px;" id="ulPhoneMenu"></ul>
			</div>
		</div>
	</div>

	<!-- 이석 버튼 클릭 시 메뉴 -->
	<div id="divNotReadyMenu" style="background-color: white; padding: 0; margin: 0;">
		<div style="width: 80px; position: absolute; top: 5px; right: 5px; padding: 0; margin: 0; z-index: 99;">
			<div>
				<ul style="width: 100%; font-size: 15px;" id="ulNotReadyMenu"></ul>
			</div>
		</div>
	</div>

	<!-- 즐겨찾기 버튼 클릭 시 메뉴 -->
	<div id="divFavoritMenu" style="background-color: white; padding: 0; margin: 0;">
		<div style="width: 200px; position: absolute; top: 5px; right: 5px; padding: 0; margin: 0; z-index: 99;">
			<div>
				<ul style="width: 100%; font-size: 15px;" id="ulFavoritMenu"></ul>
			</div>
		</div>
	</div>

	<!-- 최근팝업 버튼 클릭 시 메뉴 -->
	<div id="divRecentMenu" style="background-color: white; padding: 0; margin: 0;">
		<div style="width: 200px; position: absolute; top: 5px; right: 5px; padding: 0; margin: 0;">
			<div>
				<ul style="width: 100%; font-size: 15px;" id="ulRecentMenu"></ul>
			</div>
		</div>
	</div>

	<!-- 알림 슬라이드 메뉴 -->
	<div id="divSlideAlert" class="mainAlert" style="right: 250px; z-index: 99;">
		<div>
			<label id="labSlideAlertMsg" style="font-size: 18pt; font-weight: bold;">
				30분 이내에<br/>
				3건의 예약이<br/>존재합니다.
			</label>
		</div>
	</div>

	<!-- 알림 슬라이드 메뉴 -->
	<div id="divSlideAlertMessage" class="mainAlert">
		<div>
			<label id="labSlideAlertMsgMessage" style="font-size: 18pt; font-weight: bold; z-index: 99;">
				읽지 않은 쪽지<br />3 건이<br />존재합니다.
			</label>
		</div>
	</div>
</body>

<!-- 일반전화용 인입 팝업 레이어 -->
<div id="dialogMainCallPopupGeneral" title="확인">
	<div id="content_call" style="height: 322px;">
		<div class="call_01" style="height: 110px;">
			<div class="call_num01" style="margin-top: 12px;">
				<img src="<c:url value='/resources/images/pop_calldot.png'/>" alt="화살표" /> 
				<label style="width: 65px; display: inline-block;">인입정보</label> 
				<input type="text" class="call_text_ol" style="width: 182px;" id="tfDialogMainCallPopupGeneralCallgb" alt="인입정보" title="인입정보" />
			</div>
			<div class="call_num02">
				<img src="<c:url value='/resources/images/pop_calldot.png'/>" alt="화살표" /> 
				<label style="width: 65px; display: inline-block;">발신번호</label> 
				<input type="text" class="call_text_ol" style="width: 182px;" id="tfDialogMainCallPopupGeneralAni" alt="발신번호" title="발신번호" />
			</div>
			<div class="call_num02">
				<img src="<c:url value='/resources/images/pop_calldot.png'/>" alt="화살표" /> 
				<label style="width: 65px; display: inline-block;">민원인유형</label> 
				<input type="text" class="call_text_ol" style="width: 182px;" id="tfDialogMainCallPopupGeneralCustNm" alt="민원인유형" title="민원인유형" />
			</div>
			<div class="call_num02">
				<img src="<c:url value='/resources/images/pop_calldot.png'/>" alt="화살표" /> 
				<label style="width: 65px; display: inline-block;">행정동주소</label> 
				<input type="text" class="call_text_ol" style="width: 182px;" id="tfDialogMainCallPopupGeneralCustAddr" alt="행정동주소" title="행정동주소" />
			</div>
			<div class="call_num02">
				<img src="<c:url value='/resources/images/pop_calldot.png'/>" alt="화살표" /> 
				<label style="width: 65px; display: inline-block;">메모</label> 
				<input type="text" class="call_text_ol" style="width: 182px;" id="tfDialogMainCallPopupGeneralMemo" alt="메모" title="메모"/>
			</div>
		</div>
		<div class="call_btn">
			<div>
				<a href="#">
					<img src="<c:url value='/resources/images/btn_call1.png'/>" alt="전화받기" id="btnDialogMainCallPopupGeneral" alt="전화받기">
				</a>
			</div>
		</div>
	</div>
</div>

<!-- 협의 통화 팝업 레이어 -->
<div id="dialogMainConfirmPopup" title="협의통화 요청">
	<label id="labTransferDialog" style="color: red; font-size: 13px;"></label>
	<p id="popupMessageConfirmPopup" style="font-size: 13px;">
		협의통화를 요청중입니다.<br> 상대편 전화가 연결되면 호전환 버튼을 눌러주세요
	</p>
</div>

<!-- ARS인증 팝업 레이어 -->
<div id="dialogMainARSAuthPopup" title="ARS인증 요청">
	<label id="labARSAuthDialog" style="color: red; font-size: 13px;"></label>
	<p id="popupMessageARSAuthPopup" style="font-size: 15px; text-align: center;">
		ARS인증을 요청중입니다.<br><br> 
		인증후 팝업창이 안닫이는 경우 닫기 버튼을 눌러주세요.<br><br> <a href="#">
		<img src="<c:url value='/resources/images/btn_close.gif'/>" alt="닫기" id="btnDialogMainARSAuthPopup"></a>
	</p>
</div>

<!-- Classie - class helper functions by @desandro https://github.com/desandro/classie -->
<script src="<c:url value='/resources/js/lib/classie.js'/>"></script>
<script>
		var menuLeft = document.getElementById( 'cbp-spmenu-s1' );
		var showLeft = document.getElementById( 'showLeft' );
		var body = document.body;

		showLeft.onclick = function()
		{
			classie.toggle( this, 'active' );
			classie.toggle( menuLeft, 'cbp-spmenu-open' );
			disableOther( 'showLeft' );
		};

		function disableOther( button )
		{
			if( button !== 'showLeft' )
				classie.toggle( showLeft, 'disabled' );
		};
	</script>

<script type="text/javascript">
	(function() {
			setCategoryCodeListToObject2("selMainIntvXlCd","","10000000", "Main");
			initCodeBook("Main");// 초기 코드 데이타
			setObjAgentList("Main"); //상담사 리스트
		}());	
	
</script>
<!-- 	<script src="codeDefer.js" defer></script> -->
</html>