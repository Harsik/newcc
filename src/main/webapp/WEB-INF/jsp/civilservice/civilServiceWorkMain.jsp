<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="org.apache.commons.codec.binary.Base64"%>
<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page import="egovframework.com.vo.SessionVo"%>

<%   
/**************   암복화시  처리 부분 *********************************/
	String ouCode = "";
	String uid = "";
	
	//파라미터 존재 확인
	boolean isExists = StringUtils.isNotBlank(request.getParameter("ouCode")) && StringUtils.isNotBlank(request.getParameter("uid"));

	if(isExists) {
		Base64 b64 = new Base64();
		ouCode = request.getParameter("ouCode");
		uid = new String(b64.decode(request.getParameter("uid").getBytes()));
		//System.out.println("params");
	} else {
		String temp = StringUtils.defaultIfBlank((String)session.getAttribute("dept_id"), null);
		ouCode = temp == null ? "" : temp + "0000";
		uid = (String)session.getAttribute("user_id");
		//System.out.println("sso");      
	}
	
	//session
	SessionVo sessionDto = new SessionVo();
	sessionDto.setLogin_usr_id(uid);
	sessionDto.setLogin_usr_ip(request.getRemoteAddr());
	request.getSession().setAttribute("sessionDto", sessionDto);
// 	System.out.println("SESSION : "+sessionDto.getLogin_usr_id());
	
	
	
// 	window.sessionStorage.setItem("ouCode", $("#ouCode").val());
// 	window.sessionStorage.setItem("usrId", $("#uid").val());

	System.out.println("decrypt ouCode= "+ouCode+" , uid= "+uid);      
	
//	String paraStr='"'+ouCode+"^"+uid+'"';
	String paraStr=""+ouCode+"^"+uid+"";
%>

<c:set var="paraStr" value="<%=paraStr%>" />
<c:set var="ouCode" value="<%=ouCode%>" />
<c:set var="uid" value="<%=uid%>" />

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="UTF-8">
	<meta http-equiv="Cache-Control" content="no-cache"/>
	<meta http-equiv="Expires" content="0"/>
	<meta http-equiv="Pragma" content="no-cache"/>

	<title>공무원 업무</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-1.12.4.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/json3.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
</head>

<script type="text/javascript">
function init(){
	var ouCode = $("#ouCode").val();
	
	$("#vocCnt").html("부서(0)/할일(0)");
	$("#dbCnt").html("부서(0)/할일(0)");
	
	if($("#ouCode").val() == "" || $("#ouCode").val() == "null"){
		alert("부서코드가 존재하지 않습니다!!");		
	}else{
<%		// 콜센터담당자 지정 권한여부 확인 후 세션에 고정%>
		$.ajax({
			type : "post",
			dataType : "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/csw.do",
			data : "pJson=" + getJsonCCAuth(),
			success : function(data1) {
				$.ajax({  
					type : "post",
					dataType : "json",
					async : false,
					url : getContextPath() + "/ajax/civilservice/csw.do",
					data : "pJson=" + getJsonCCAffairsYN(),
					success : function(data2) {
						var auth = data1.CC_AUTH;
						var affairs = data2.CC_AFFAIRS_YN;
						window.sessionStorage.setItem("CC_AFFAIRS_YN", affairs);
					}
				});
			},
			error : function(data1, status, err) {
				networkErrorHandler(data1, status, err);
			}
		});

		// 	민원이관건수 조회
  		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/csw.do",
			data : "pJson=" + getJsonVocCnt(),
			success : function(data){
				$("#vocCnt").html("부서("+ data.VOCDEPTCNT +")/할일("+ data.VOCUSRCNT + ")");
				if(window.sessionStorage.getItem("CC_AFFAIRS_YN")=="Y"){
					if(data.VOCDEPTCNT !=0 || data.VOCUSRCNT!=0){
						$("#vocCnt").css("color","#FF007F");
					}else{
						$("#vocCnt").css("color","#404040");
					}
				}else{
					if(data.VOCUSRCNT==0){
						$("#vocCnt").css("color","#404040");
					}else{
						$("#vocCnt").css("color","#FF007F");
					}
				}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});

		//	상담DB요청건수 조회 
 		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/csw.do",
			data : "pJson=" + getJsonVocCntDB(),
			success : function(data){
				$("#dbCnt").html("부서("+ data.ORG_VOCCNT +")/할일("+ data.USR_VOCCNT + ")");
				if(window.sessionStorage.getItem("CC_AFFAIRS_YN")=="Y"){
					if(data.ORG_VOCCNT !=0 || data.USR_VOCCNT!=0){
						$("#dbCnt").css("color","#FF007F");
					}else{
						$("#dbCnt").css("color","#404040");
					}
				}else{
					if(data.USR_VOCCNT==0){
						$("#dbCnt").css("color","#404040");
					}else{
						$("#dbCnt").css("color","#FF007F");
					}
				}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});		
	} 
}

function getJsonCCAuth() {
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "c20wMDIuc2VsQ0NBdXRo",
		"map" : {
			"key" : "value",
			"tp_cd" : "90909",
			"orgId" : $("#uid").val()
		}
	};
	// console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonCCAffairsYN() {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0Y2NBZmZhaXJzWW4=",
			"map" : {
				"key" : "value",
				"uId" : $("#uid").val()
			}
	};
	
	// console.log(loParam);
	return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonVocCnt(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "Y20wMzIuc2VsZWN0Vm9jQ250",
			"map" : {
				"key" : "value",
				"ccAffairs" : window.sessionStorage.getItem("CC_AFFAIRS_YN"),
				"orgId" : $("#ouCode").val(),
				"orgUsrId" : $("#uid").val(),
			}
		};
		
		// console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonVocCntDB(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wMTUuc2VsZWN0Vm9jQ250REI=",
			"map" : {
				"key" : "value",
				"orgId" : $("#ouCode").val(),
				"orgUsrId" : $("#uid").val()
			}
		};
	
		// console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

function fn_link(){
	var clickId=this.id;
	
	window.sessionStorage.removeItem("ouCode");
	window.sessionStorage.removeItem("usrId");
	
	if($("#ouCode").val() == "" || $("#ouCode").val() == "null"){
		alert("부서코드가 존재하지 않아 페이지를 연동할 수 없습니다.");			
	}
	//uid check
	else if($("#uid").val() == "" || $("#uid").val() == "null"){
		alert("id가 존재하지 않아 페이지를 연동할 수 없습니다.");
	}
	
	else{
		
		window.sessionStorage.setItem("ouCode", $("#ouCode").val());
		window.sessionStorage.setItem("usrId", $("#uid").val());
		
		if(clickId == "dvVocCnt" || clickId == "vocCnt"){			
			$("#fromDiv").val("VOC");
		}
		if(clickId == "dvDbCnt" || clickId == "dbCnt"){			
			$("#fromDiv").val("DB");
		}
		
		var url=getContextPath() +"/web/civilservice/civilServiceWork.do";
		var option="titlebar=no,status=no ,location=no, directoryies=no, scrollbars=yes, resizable=yes, width=1500, height=1000, left=100, top=100";
	
		var pVal='${paraStr}'; 
		
		noToolbarPopup(url, "ouCode^uid^fromDiv", pVal+"^"+$("#fromDiv").val(), "cswOpen", option);
	}
}

$(document).ready(function(){
	$("#dvVocCnt").bind("click", fn_link);	
	$("#dvDbCnt").bind("click", fn_link);
	/*
	$("#reLoad").on('click', function() {
		init();
		//alert("버튼 누름!!");
	});
	*/
	$("#reLoad").on('click',init);
});

///////////////////////////// 타이머 기능 /////////////////////////////////////////	
// var tempTime = 1000 * 60 * 60 * 2; // 2시간
var tempTime = 1000 * 60 * 5 // 5분
var timer = setInterval(function(){ init(); },tempTime);
</script>

<style>
body {
	margin: 0px
}
body, td {
	font-size: 12px; font-family: "돋움"; color: #5f5e5e;
}
img {
	border: 0;
}
.title_bg {
	cellSpacing: 0;
	cellPadding: 0;
	border: 0;
	background: url(${pageContext.request.contextPath}/resources/images/seaol/title_bg_only2.png) no-repeat left top;
	width: 180px;	
}

.box_title {
	height: 40px;
}

.box_out {	
	width: 180px;
	height : 55px;
	border: 0;
	background: url(${pageContext.request.contextPath}/resources/images/seaol/box.gif) no-repeat left bottom;
	line-height:13px;
}

.box_in {
	padding: 0px 6px 5px;
}
.stitle {
	float: left;
	padding: 0 0 5px 15px;
	margin: 3px;
	background: url(${pageContext.request.contextPath}/resources/images/icon_bullet.png);
	background-repeat: no-repeat;
	font-weight: bold;
	letter-spacing: -1px;
	word-spacing: -2px;
	text-align: left;
}
</style>
<body onload="init();" style="padding-top: 3px;"> 
	<table class=title_bg border="0" cellSpacing="0" cellPadding="0">
		<tbody>
			<tr>
				<td class=box_title>
					<span style="margin-left:25px;font-size: 13px;font-weight: bold;color:#111;">온누리콜센터</span>
					<IMG id='reLoad' alt="새로고침" src="/resources/images/seaol/icon_refresh.gif"style="cursor: pointer;margin-left: 15px;">
				</td>
			</tr>
		</tbody>
	</table>
	<table class=box_out>
		<tbody>
			<tr>
				<td class=box_in>
					<div id="dvVocCnt" class="stitle" style="float: none;">
						이관 - <span class="c" id='vocCnt' style="color: #404040; padding-left: 1px; font-weight: normal; cursor: pointer;"></span>
					</div>
					<div id="dvDbCnt" class="stitle" style="float: none;">
						상담DB - <span class="c" id='dbCnt' style="color: #404040; padding-left: 1px; font-weight: normal; cursor: pointer;"></span>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
		
 		<input type="hidden" id="ouCode" name="ouCode" value="${ouCode}"/>
 		<input type="hidden" id="uid" name="uid" value="${uid}"/>
		<input type="hidden" id="fromDiv" name="fromDiv" />
</body>
</html>