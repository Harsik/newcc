<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>유형별 상담현황</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statCounselType.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>

<style>
#pop_body {	overflow:none; height: 915px; }
#pop_body_inner {	overflow-y: auto; height: 815px; border: 8px solid #8eb4e3; margin-top:0px;}

.table table {border-collapse: separate;}
.table table th, .table table td {padding: 7px;font-size: 1.7emem;width: 180px; white-space: pre; font-family:'NanumBarunGothicBold' !important;}
.table table th {background: #8eb4e3;color: #fff;}
.table table td {font-size:15px;background: #dce7f0;color: #00244b;text-align: center;}
</style>
</head>
<body style="overflow-y: hidden;">
	<div id="h1">유형별 상담현황</div>
	<div id="pop_body">
		<!-- 검색 -->
		<div id="search">
			<table class="search_tbl">
        		<tr>
					<!-- 날짜 -->
					<th style = "width: 30px; padding-right : 15px">
                        <label>기간</label>
                    </th>
                    <td class="nemo_30" style="width: 350px;">
                        <select id="optTerm" style="width: 100px;">
                        	<option value = "year">년도별</option>
                            <option value = "month">월별</option>
                            <option value = "week">주별</option>
                            <option value = "day" selected="selected">일별</option>
                        </select>
                        <div id="dvYear" style="display: inline;">
							<select id = 'statYearStart' style ='width : 70px; margin-left : 5px;' ></select>
							<span>~</span>
							<select id = 'statYearEnd' style ='width : 70px; margin-left : 5px;' ></select>
						</div>
                        <div id="dvMonth" style="display: inline;">
                            <input type="text" class="text_Date" id="statMonthStart" maxlength="7" />
                            <span>~</span>
                            <input type="text" class="text_Date" id="statMonthEnd" maxlength="7" />
                        </div>
                        <div id="dvWeek" style="display: inline;">
                            <input type="text" class="text_Date" id="statWeekDate" maxlength="10" />
                        </div>
                        <div id="dvDay" style="display: inline;">
                            <input type="text" class="text_Date" id="statDayStart" maxlength="10" />
                            <span>~</span>
                            <input type="text" class="text_Date" id="statDayEnd" maxlength="10" />
                        </div>
                    </td>
                    
                    <th style = "width: 85px;">
	                    <label>행정동</label>
	                </th>
	                <td style="width: 550px;">
	                    <select class="select_al" id="selCtgAddr" style="width: 85px;">
							<option value="all">전체</option>
						</select>
						
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>0 제외</label>
						<input type="checkbox" name="checkZero" id="checkZero" checked>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>소수점표시</label>
						<input type="checkbox" name="chkRoundYn" id="chkRoundYn">
	                </td>
                    
		 			<td class="btn">
						<button type="button" id="btnSearch" class="button">조회</button>
						<button type="button" id="btnInit" class="button">초기화</button>
						<button type="button" id="btnExcel" class="button">엑셀저장</button>
		  			</td>
       			</tr> 
      		</table>
		</div>
		
		<div id="pop_body_inner">
		<div id="bodyTitle" style="margin-top: -40px;">
		<div title="클릭시 해당 분류로 이동합니다." style="margin: -15px 690px 0px 0px; text-align: right; font-weight: bold; display: block;">
			<span id="defaultNm" style="color: #00f;">행정기관별</span>
			<span id="ctgExCd" style="color: #00f; cursor: pointer;"></span>
			<span id="ctgLgCd" style="color: #00f; cursor: pointer;"></span>
			<span id="ctgMdCd" style="color: #00f; cursor: pointer;"></span>
		</div>
		<div style="margin: -15px 630px 0px 0px; font-weight: bold; float: right;"> 상담현황</div>
		</div>
		
		<div style="margin-top: -23px; float: right;">
			<div style="width: 110px; font-weight: bold; margin-top: -2px; margin-right: 10px; float: left;">
				<input class="checkbox" id="chkPcntYn" type="checkbox" checked="">
                <label for="chkPcntYn" style="margin-bottom: 5px; display: inline-block;">총합대비비율</label>
			</div>
			<p style="font-weight: bold; margin-top: 3px; margin-right: 10px; float: left;">필터 </p>
			<div class="dropdownBox" id="multiCheckbox"></div>
			<button type="button" id="btnMultiCheckBox" class="button">적용</button>
		</div>
		
		<!-- Left -->
		<div id="leftDiv" style="width:32%; height:690px; margin-top: 30px; float: left;">
<!-- 		<div id="leftDiv" style="width:32%; height:790px; margin-top: 30px; float: left;"> -->
			<div id="chartHolder" style="height:690px; margin-left:15px;"></div>
			<div class="table" id="table" style="position: relative; margin-top: 20px;margin-left:25px; overflow-x: auto;">
				<table id="table1"></table>
			</div>
		</div>
		
		<!-- Right -->
		<div id="rightDiv" style="width:65%; height:690px; margin-top: 30px; float: right;"> 
<!-- 		<div id="rightDiv" style="width:65%; height:790px; margin-top: 30px; float: right;">  -->
			<div id="chartHolder2" style="height:690px; width:100%"></div>
			<div class="table" id=table style="position: relative; margin-top: 20px; width:93%; margin-left:32px; overflow-x: auto;">
				<table id="table2"></table>
			</div> 
		</div>
		</div>
		
	</div><!-- end of pop_body -->
</body>
</html>