<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>공지게시판</title>
<link rel="icon" href="/resources/images/favicon.ico">
<script type="text/javascript" src="<c:url value='/resources/js/main/login/myInfo_Notiboard.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/resources/js/lib/select.js'/>"></script> --%>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
<style type="text/css">
	#board_detail ul {
		width: 100%;
		margin: 0 10px 5px 0;
	}
	#board_detail li {
		width: 100%;
	}
	.unsearch_tbl th{
		font-weight:bold;
	}
</style>
</head>
<body>
 <!-- <div id="h1">공지게시판</div> -->
    <div style="overflow-y: hidden; overflow-x:hidden; height: auto;">
       <div class="stitle">공지사항 목록</div>
        <div id="grid_all" >
            <!-- 그리드테이블 -->
            <div class="grid_tbl" style="float: left; width: 97%;">       
                <table id="tblNotifyList"></table>
                <div id="pgNotifyList"></div>
            </div>
        </div>
          <br/>  
        <div id="board_content" class="re_board" style="width:97%; display: none;">
        	<div style = "padding: 15px 0;">
	        	<div class="stitle">공지사항상세</div>
				<!-- ui-button ui-button-text-only ui-widget ui-state-default ui-corner-all -->
	        	<div style="float: right;"><button type="button" id="btnShowNotify" class="button">목록보기</button></div>
        	</div>
        	<div  id="board_detail" style = " padding: 15px 0;">
                <ul>
	               	<li style="text-align: right;">
	                    <span id="sUsrNm"></span>&nbsp;|&nbsp;조회수&nbsp;:
	                    <span id="sTbbsInQrCnt"></span>&nbsp;|&nbsp;
	                    <span id="sModDt"></span>&nbsp;<span id="sModTm"></span>&nbsp;|&nbsp;
	                    <span id="sEmrgYN"></span>&nbsp;|&nbsp; 
	                    <span id="sTbbsStrtDt"></span>&nbsp;~&nbsp;
	                    <span id="sTbbsEndDt"></span>                   
	                </li>
            	</ul>
            	<br />
	            <ul>
	                <li>
	                	<label id="sTbbsTtl" style="font-family: '돋움', sans-serif; font-size: 20px; font-weight: bold; display: inline-block;"></label>
	                	<!-- <p id="sTbbsTtl" style="font-family: '돋움', sans-serif; font-size: 20px; font-weight: bold; display: inline-block;"></p>
	                	<p id="pCommNum" style="display: inline-block; color: #f41016; font-weight: bold; font-family: 'Dotum', 'sans-serif'; font-size: 13pt;"></p> -->
	                </li>
	            </ul>
	            <div id="dTbbsCntn" style="width:100%;height:200px;margin-bottom:10px;overflow-y:scroll;"></div>
            	<!-- <p id="dTbbsCntn" style="width: 100%; min-height: 150px;"></p>본문내용 -->
            	<table id="fileInfos" class="tb_list" style="width: 100%"></table>
            </div>
        </div>
    </div><!-- end of pop_body -->
</body>
</html>