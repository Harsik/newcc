﻿﻿﻿<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>온누리콜센터</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<meta http-equiv="Pragma" content="no-cache" />

<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/fullcalendar.min.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/normalize.css" type="text/css" />
<link href="https://fonts.googleapis.com/css?family=Gamja+Flower" rel="stylesheet">

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/moment.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/fullcalendar.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/locale-all.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<!-- <style type="text/css">
		button:active {
  			outline: none;
		}
	</style> -->
<style type="text/css">
.ui-tabs .ui-tabs-panel {
	padding: 0.7vw 0.759vw;
}

.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {
	text-align: center;
	float: none !important;
}

.img_face {
	width: auto;
	height: 100%;
	padding: 1%;
	box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.8);
}

.info_table th {
	padding: .5em 1em;
	text-align: center;
}

.info_table td {
	padding: .5em 1em;
	text-align: center;
}
</style>
<script type="text/javascript">

//$("body").hide();
	var isinitmINotiboard = false;
	var isinitscheduleList = false;
	var isinitcustomerManagement = false;
	var isinitoperationManagement = false;
	$(document).ready(function() {
		//$("#myMain").hide();
		var tab = $("#myMain").tabs({
			heightStyle : "content",
			activate : function(event, ui) {
				var id = ui.newPanel.attr('id');
				initTabs(id);
			}
		});
		//initTabs("mINotiboard");
		$("#myMain").show();
	});
	function initTabs(id) {
		switch (id) {
		case "mINotiboard":
			if (isinitmINotiboard == false) {
				//initmINotiboard();
				isinitmINotiboard = true;
			}
			break;
		case "scheduleList":
			if (isinitscheduleList == false) {
				initscheduleList();
				isinitscheduleList = true;
			}
			break;
		case "customerManagement":
			if (isinitcustomerManagement == false) {
				initcustomerManagement();
				isinitcustomerManagement = true;
			}
			break;
		case "operationManagement":
			if (isinitoperationManagement == false) {
				initoperationManagement();
				isinitoperationManagement = true;
			}
			break;
		}
	}

	//이전 날짜를 가져옴
	function getPrevDate(vday)
	{
		var date = new Date(getDate());
		var oneMonth = new Date(date);
		oneMonth.setDate(oneMonth.getDate() - vday);
		var nm = new Date(oneMonth);
		
		var year = nm.getFullYear();
		var month = nm.getMonth() + 1;
		var day = nm.getDate();
		
		if(month < 10)
			month = "0"+month;
		if(day < 10)
			day = "0"+day;

		$("#operMn_date").html(year+"년 "+month+"월 "+day+"일 "+"우수사원");
		$("#custMn_date").html(year+"년 "+month+"월 "+day+"일 "+"사원실적");
		return year + "-" + month + "-" + day;
	}

	//$("body").show();
</script>
</head>
<body>
	<div id="myMain" class="easyui-tabs" style="display: none;">
		<ul>
			<li><a href="#mINotiboard">공지사항</a></li>
			<li><a href="#scheduleList" onclick="fullCalendar();">일정정보</a></li>
<!-- 			<li><a href="#customerManagement">개인실적</a></li> -->
<!-- 			<li><a href="#operationManagement">우수사원정보</a></li> -->
		</ul>
		<div id="mINotiboard" style="">
			<%@include file="/WEB-INF/jsp/main/login/mINotiboard.jsp"%>
		</div>
		<div id="scheduleList">
			<%@include file="/WEB-INF/jsp/main/login/scheduleList.jsp"%>
		</div>
<!-- 		<div id="customerManagement"> -->
<%-- 			<%@include file="/WEB-INF/jsp/main/login/customerManagement.jsp"%> --%>
<!-- 		</div> -->
<!-- 		<div id="operationManagement"> -->
<%-- 			<%@include file="/WEB-INF/jsp/main/login/operationManagement.jsp"%> --%>
<!-- 		</div> -->
	</div>
</body>
<!-- 
<script>
$( document ).ready(function() {
	$(function() {
   		tab = $( "#myMain" ).tabs({
   		    create: function(e, ui) {
   		        
   		    }
   		});
 	});
	//$( "#myMain" ).tabs();
});
</script>
 -->
</html>