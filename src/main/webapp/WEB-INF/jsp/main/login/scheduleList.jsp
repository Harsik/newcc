<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>일정관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/main/login/scheduleList.js"></script>

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
	<div style="height: 540px;">		
		<div>
			<div class="stitle">
				일정 목록
			</div>
			<div style="padding: 0 10px; float: left;">
				<!-- <select id="optCdbKnd" style="width: 50px;"></select> -->
				<input name="optCdbKnd" class="radio" id="optCdbKnd" type="radio" checked="checked"  value="all">전체
				<input name="optCdbKnd" class="radio" id="optCdbKnd" type="radio"  value="010000">개인
				<input name="optCdbKnd" class="radio" id="optCdbKnd" type="radio"  value="020000">공통
			</div>
			<div style=" float: left;  padding : 10px; margin-bottom: 10px;	border: 1px solid #dddddd; ">
				<div id="calendar"></div>
				<div id="optColor" style="padding: 10px 0 0 0;">
			</div>
			</div>
		</div>
	</div>
</body>
</html>