 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>유형별 지표 추이</title>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statTypeTrend.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		
		<base target="_self">
		<style>
		#pop_body {	overflow-y: none; height: 915px; }
		#pop_body_inner { height: 765px; margin-top:90px; border:8px solid #8eb4e3; border-top-width:50px; overflow: scroll;}
		
		.table table {border-collapse: separate; height: 123px;}
		.table table th, .table table td {white-space: pre; padding: 7px; font-size: 1.7emem;width: 180px; font-family:'NanumBarunGothicBold' !important;}
		.table table th {background: #8eb4e3; color: #fff; font-size: large;}
		.table table td {background: #dce7f0; color: #00244b; text-align: center; font-size: initial;}
		
		.yellow {
			background-color: yellow;
		}
		.red {
			background-color: red;
		}
		.green { 
			background-color: green;
		}
		.blue {
			background-color: blue;
		}

		</style>
		
	</head>

	<body style="overflow-y: hidden;">
		<div id="h1">유형별 지표 추이</div>
		<!-- outer pop_body part start -->
		<div id="pop_body">
			<!-- search part start -->
			<div id="search"  style="height: 65px">
				<table class="search_tbl" >
					<tr>
						<th style = "width: 85px;">
	                        <label>행정동</label>
	                    </th>
	                    <td style="width: 500px;">
	                        <select class="select_al" id="selCtgAddr" style="width: 85px;">
								<option value="all">전체</option>
							</select>
							
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>0 제외</label>
							<input type="checkbox" name="checkZero" id="checkZero">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>최대/최소값</label>
							<input type="checkbox" name="checkMinMax" id="checkMinMax">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>전체값</label>
							<input type="checkbox" name="checkAll" id="checkAll">
	                    </td>
						
						<!-- type -->
						<th style = "width: 50px; padding-right : 15px">
							<label>민원유형</label>
						</th>
						<td style = "width: 650px; ">							
							<select class="select_al" style="width:140px;margin-left:4px;" id="selSrchIntvLgCd"></select>
							<select class="select_al" style="width:120px;" id="selSrchIntvMdCd"></select>
							<select class="select_al" style="width:250px;" id="selSrchIntvSmCd"></select>
						</td>
						
						<!-- function button -->
						<td class="btn">
							<button type="button" id="btnStsTypeSearch" class="button">조회</button>
							<button type="button" id="btnStsTypeInit" class="button">초기화</button>
							<button id="btnStsTypeExelDown" class="button">엑셀다운</button>  
						</td>
					</tr>
					
					<tr>
						<!-- period condition -->
						<th style = "width: 50px; padding-right : 15px">
							<label>기간</label>
						</th>
						<td style = "width: 400px; ">
						<select class="select_al" id = "optTerm" style = "width: 85px;">
							<option value = "year">년도별</option>
							<option value = "month">월별</option>
							<option value = "week">주간별</option>
							<option value = "day" selected="selected">일별</option>
						</select>
							<div id="dvYear" style="display: inline;">
								<select id = 'schYearStart' style ='width : 70px; margin-left : 5px;' ></select>
								<span>~</span>
								<select id = 'schYearEnd' style ='width : 70px; margin-left : 5px;' ></select>
							</div>
							<div id="dvMonth" style="display: inline;">
								<input type="text" class="text_Date" id="schMonthStart"  />
								<span>~</span>
								<input type="text" class="text_Date" id="schMonthEnd" />
							</div>
							<div id="dvWeek" style="display: inline;">
								<input type="text" class="text_Date" id="schWeekStart"  />
								<span>~</span>
								<input type="text" class="text_Date" id="schWeekEnd" />
							</div>
							<div id="dvDay" style="display: inline;">
								<input type="text" class="text_Date" id="schDayStart"  />
								<span>~</span>
								<input type="text" class="text_Date" id="schDayEnd" />
							</div>
						</td>
						
						<th style = "width: 50px; padding-right : 15px">
							<label>차트유형</label>
						</th>
						<td style = "width: 350px;padding-left: 3px;">
							<select class="select_al" style="width: 140px;"" id="changeChart">
								<option value="line">라인 차트</option>
								<option value="columnMotion">막대 차트</option>
								<option value="columnBubble">거품 차트</option>
								<option value="columnLine">3D막대+라인 차트</option>
							</select>
							
							<span style="font-weight: bold;">색상</span>
							<select class="select_al" style="width:100px;" id="changeColor">
								<option value="#d63a39" style="background: #d63a39">	</option>
								<option value="#fabc05" style="background: #fabc05">	</option>
								<option value="#81d733" style="background: #81d733">	</option>
								<option value="#43cbff" style="background: #43cbff">	</option>
								<option value="#3284c3" style="background: #3284c3">	</option>
								<option value="#15b671" style="background: #15b671">	</option>
								<option value="#00998e" style="background: #00998e">	</option>
								<option value="#8d65d2" style="background: #8d65d2">	</option>
								<option value="#f99b2b" style="background: #f99b2b">	</option>
								<option value="#00c574" style="background: #00c574">	</option>
								<option value="#4c9cff" style="background: #4c9cff">	</option>
								<option value="#2aa8b4" style="background: #2aa8b4">	</option>
								<option value="#8647a7" style="background: #8647a7">	</option>
								<option value="#03a9f5" style="background: #03a9f5">	</option>
								<option value="#00b6aa" style="background: #00b6aa">	</option>
								<option value="#88b14b" style="background: #88b14b">	</option>
								<option value="#d23579" style="background: #d23579">	</option>
								<option value="#f79d2e" style="background: #f79d2e">	</option>
								<option value="#074d81" style="background: #074d81">	</option>
								<option value="#5587a2" style="background: #5587a2">	</option>
							</select>
						</td>
					</tr>
				</table>
			</div>
			<!-- search part end -->
			
			<!-- inner pop_body part start -->
			<div id="pop_body_inner">
				
				<div id="statTypeTitle" style="margin: -40px 0px 0px 580px; color: #00f; font-weight: bold; position: absolute;"></div>
				
				<!-- rMateChart part -->
				<div id="chartHolder" style="width:95%; height:550px; margin-top: 25px; margin-left:32px"></div>
				
				<!-- html table part start -->
				<div id="grd" style="width: 95%;margin-left:32px;margin-top: 15px;">
				
					<!-- Left -->
					<div style="width:20%; float: left;">
						<div class="table" style="position: relative; margin-left:35px;">
							<table id="leftTable" style="width: 100%;">
							 	<thead>
							 		<tr>
							 			<th>유형</th>
							 		</tr>
							 	</thead>
							 	<tbody>
							 		<tr style="height: 100%">
							 			<td id="rightTableTitle"></td>
							 		</tr>
							 	</tbody>
							</table>
						</div>
					</div>
					
					<!-- Right -->
					<div style="width:80%; float: right; overflow:auto;"> 
						<div class="table" style="position: relative; width:98.5%;">
							<table id="rightTable"></table>
						</div> 
					</div>
					
					
				</div>
				<!-- html table part end -->
				
			</div>
			<!-- inner pop_body part end -->
			
		</div>
		<!-- outer pop_body part start -->
		
	</body>
</html>