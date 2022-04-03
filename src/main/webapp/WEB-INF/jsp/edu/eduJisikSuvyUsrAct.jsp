<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>업무지식테스트 현황</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		

		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/edu/eduJisikSuvyUsrAct.js'/>"></script>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		
		<link class="include" rel="stylesheet" type="text/css" href="/resources/js/lib/jquery.jqplot.1.0.8r1250/jquery.jqplot.min.css" />	    
	   	<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/jquery.jqplot.min.js"></script>
		<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/plugins/jqplot.barRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/plugins/jqplot.pieRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/plugins/jqplot.categoryAxisRenderer.min.js"></script> 
		<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/plugins/jqplot.pointLabels.min.js"></script>    
    
		<base target="_self">
	</head>


	<body>
		<div id="h1">업무지식테스트 현황</div>
		<div id="pop_body" style="height: 682px;">
			<div class="stitle">업무지식테스트 현황</div><!--"타이틀"-->
			
			<div id="search">
				<table class="search_tbl">
					<tr>

						<th style = "width: 30px; padding-right : 10px">
							<label>기간</label>
						</th>
						<td style = "width: 220px; ">
							<input type="text" class="text_Date" id="edusat_schDayStart" readonly />
							<span>~</span>
							<input type="text" class="text_Date" id="edusat_schDayEnd" readonly />
						</td>
						
            <th style = "width: 30px; padding-right : 10px">
              <label>제목</label>
            </th>
            <td style = "width: 150px; "> 
              <select class="select_al" id="edusat_selSuvyTitle" style="width: 100%;"></select>
            </td>						
						
						<th style = "width: 50px; padding-right : 10px">
							<label>상담사</label>
						</th>
						<td style = "width: 100px;"><select class="select_al" id="edusat_srchTeamCd"></select></td>						
						<td style = "width: 350px;">              
							<div class="dropdownBox" id="edusat_multiCheckbox"></div>
							<input type="checkbox" id="edusat_chkRetire" name="" class="checkbox"><label for="chkRetire">퇴사자 포함</label>
						</td>
						
						<td class="btn">
              <button type="button" id="edusat_btnStsActSearch" class="button">조회</button>
              <button type="button" id="edusat_btnStsActInit" class="button">초기화</button>
              <!-- <button type="button" id="edusat_btnStsActExelDown" class="button">엑셀저장</button> -->
            </td>						
					</tr>
				</table>
			</div><!--"조회/검색"-->
			
			<div id="edusat_chart1" style="width:100%; height:200px; margin-top: 65px; "></div>
		
			
		<!-- 그리드테이블 -->		
			<div id="edusat_dvGridArea" style="margin-top: 5px;">
				<table id="edusat_tblJisikSuvyUsrAct"></table>
			</div>
		<!--"그리드테이블"-->	
					
		</div>
	</body>
</html>