<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>일정관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/fullcalendar.min.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/moment.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/fullcalendar.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/locale-all.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/myinfo/scheduleList.js"></script>

<style>
	#calendar {
		padding: 5px;
		background-color: white;
		
	}
	
	.profile_tbl .line_b { /*입력칸 아래선*/
	width: auto;
}

	.info_tbl_btn {
   margin: auto;
}

   
    .fc-sat span, .fc-sat .fc-day-number{  
    	color:#0054FF; 
    }    
	.fc-sun span, .fc-sun .fc-day-number{  
    	color:#FF0000; 
    } 
	button.fc-today-button{
		display: none;
	}
	
	button.fc-prev-button,button.fc-next-button {
	display: inline-block;
	border-radius: 3px;
	border: 1px solid #2b91dd;
	line-height: 1;
	padding: 3px 4px;
	background: #0f71ba;
	background: -moz-linear-gradient(top, #3fa4f0 0%, #0f71ba 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #3fa4f0), color-stop(100%, #0f71ba));
	background: -webkit-linear-gradient(top, #3fa4f0 0%, #0f71ba 100%);
	background: -o-linear-gradient(top, #3fa4f0 0%, #0f71ba 100%);
	background: -ms-linear-gradient(top, #3fa4f0 0%, #0f71ba 100%);
	background: linear-gradient(to bottom, #3fa4f0 0%, #0f71ba 100%);
	font-family: '돋움', sans-serif;
	font-size: 9pt;
	text-align: center;
	font-weight: bold;
	color: #fff;
	text-decoration: none;
}

button.fc-prev-button:hover,button.fc-next-button:hover {
	border: 1px solid #336ac8;
	background: #2f65c0;
	background: -moz-linear-gradient(top, #427cdb 0%, #2559b1 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #427cdb), color-stop(100%, #2559b1));
	background: -webkit-linear-gradient(top, #427cdb 0%, #2559b1 100%);
	background: -o-linear-gradient(top, #427cdb 0%, #2559b1 100%);
	background: -ms-linear-gradient(top, #427cdb 0%, #2559b1 100%);
	background: linear-gradient(to bottom, #427cdb 0%, #2559b1 100%);
	color: #f4f4f4;
}

button.fc-prev-button:active,button.fc-next-button:active {
	border: 1px solid #336ac8;
	background: #2f65c0;
	background: -moz-linear-gradient(top, #427cdb 0%, #2559b1 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #427cdb), color-stop(100%, #2559b1));
	background: -webkit-linear-gradient(top, #427cdb 0%, #2559b1 100%);
	background: -o-linear-gradient(top, #427cdb 0%, #2559b1 100%);
	background: -ms-linear-gradient(top, #427cdb 0%, #2559b1 100%);
	background: linear-gradient(to bottom, #427cdb 0%, #2559b1 100%);
}
</style>
</head>
<body>
	<div id="h1">일정관리</div>
	<div id="pop_body"  style="height: 680px;">
		<table class="info_tbl_btn">
			<tr>
				<td>
					<button type="button" id="scheli_btnModify" class="button">일정등록</button>
					<button type="button" id="scheli_btnInit" class="button">초기화</button>
				</td>
			</tr>
		</table>
		<div>
			<div class="stitle">
				스케줄조회
			</div>
			<div style="padding: 0 10px; float: left;">
				<!-- <select id="scheli_optCdbKnd" style="width: 50px;"></select> -->
				<input name="optCdbKnd" class="radio" id="scheli_optCdbKnd" type="radio" checked="checked"  value="all">전체
				<input name="optCdbKnd" class="radio" id="scheli_optCdbKnd" type="radio"  value="010000">개인
				<input name="optCdbKnd" class="radio" id="scheli_optCdbKnd" type="radio"  value="020000">공통
			</div>
			<div style=" float: left;  padding : 10px; margin-bottom: 10px;	background-color: #E5EAF5; border: 1px solid #dddddd; ">
				<div id="scheli_calendar"></div>
				<div id="scheli_optColor" style="padding: 10px 0 0 0;">
			</div>
			</div>
		</div>
	</div>
</body>
</html>