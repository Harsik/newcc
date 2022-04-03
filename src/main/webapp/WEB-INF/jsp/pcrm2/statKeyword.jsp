<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>

<html lang="ko">
<head>
	
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>키워드별 지표</title>
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
	<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statKeyword.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
	
	<base target="_self">
	<style type="text/css">
		#pop_body {	overflow:none; height: 915px; }
		#pop_body_inner {	overflow-y: auto; height: 800px; border: 8px solid #8eb4e3; margin-top:0px;}
	   	
	   	.table table {border-collapse: separate;}
		.table table th, .table table td {white-space: pre; padding: 7px;font-size: 1.7emem;width: 180px; font-family:'NanumBarunGothicBold' !important;}
		.table table th {background: #8eb4e3;color: #fff;}
		.table table td {font-size:15px;background: #dce7f0;color: #00244b;text-align: center;}
	</style>
 
</head>
<body style="overflow-y: hidden;">
<div id="h1">키워드별 지표</div>
<div id="pop_body">
        <!-- search part start -->
			<div id="search"  style="height: 65px">
				<table class="search_tbl" >
					<tr>
						<th style = "width: 85px;">
	                        <label>행정동</label>
	                    </th>
	                    <td style="width: 550px;">
	                        <select class="select_al" id="selCtgAddr" style="width: 85px;">
								<option value="all">전체</option>
							</select>
	                    </td>
						
						<!-- type -->
						<th style = "width: 70px;">
							<label>민원유형(대)</label>
						</th>
						<td style = "width: 200px; ">							
							<select class="select_al" style="width:140px;" id="selSrchIntvLgCd"></select>
						</td>
						<th style = "width: 70px;">
							<label>민원유형(중)</label>
						</th>
						<td style = "width: 200px; ">							
							<select class="select_al" style="width:120px;" id="selSrchIntvMdCd"></select>
						</td>
						
						<!-- function button -->
						<td class="btn">
							<button type="button" id="btnStsKeywordSearch" class="button">조회</button>
							<button type="button" id="btnStsKeywordInit" class="button">초기화</button>
							<button id="btnStsKeywordExelDown" class="button">엑셀다운</button>  
						</td>
					</tr>
					
					<tr>
						<!-- period condition -->
						<th style = "width: 50px; padding-right : 15px">
							<label>기간</label>
						</th>
						<td>
							<select class="select_al" id = "optTerm" style = "width: 85px;">
								<option value = "year">년도별</option>
								<option value = "month" selected="selected">월별</option>
								<option value = "week">주간별</option>
								<option value = "day">일별</option>
							</select>
							<div id="dvYear" style="display: inline;">
		                        <select id = 'statKeywordYearStart' style ='width : 70px; margin-left : 5px;' ></select>
		                        <span>~</span>
		                        <select id = 'statKeywordYearEnd' style ='width : 70px; margin-left : 5px;' ></select>
		                    </div>
		                    <div id="dvMonth" style="display: inline;">
		                        <input type="text" class="text_Date" id="schMonthStart" maxlength="7" width="65px;"/>
		                        <span>~</span>
		                        <input type="text" class="text_Date" id="schMonthEnd" maxlength="7" width="65px;"/>
		                    </div>
		                    <div id="dvWeek" style="display: inline;">
		                         <input type="text" class="text_Date" id="statKeywordWeekDay" maxlength="10" />
		                     </div>
		                    <div id="dvDay" style="display: inline;">
		                        <input id="schDayStart" type="text" class="text_ol_half" style="width: 70px;"/>
		                        <span>~</span>
		                        <input id="schDayEnd" type="text" class="text_ol_half" style="width: 70px;"/>
		                    </div>
							
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>상담유형 0건 제외</label>
							<input type="checkbox" name="checkZero" id="checkZero">
						</td>
						
						<th style = "width: 65px;">
	                        <label>유형랭킹</label>
	                    </th>
	                    
	                    <td class="line_b" style="width:70px;">
	                        <select id = 'selCtgRank' style ="width : 75px;" class="select_al" >
	                            <option value="all">전체</option>
	                            <option value="10">TOP10</option>
								<option value="20"  selected="selected">TOP20</option>
								<option value="30">TOP30</option>
								<option value="50">TOP50</option>
								<option value="100">TOP100</option>
	                        </select>
	                    </td>
					</tr>
				</table>
			</div>
    
    <div id="pop_body_inner">

        <div id="chartHolder" style="width:100%; height:600px; margin-top: 30px; margin-left:0px;"></div>
        
        <div id="grd">
            <!-- Left -->
            <div style="width:18%; margin-top: 15px; float: left;">
                <div class="table" id="table" style="margin-top: 15px;margin-left:25px;">
                    <table id="table1">
                    </table>
                </div>
            </div>
            
            <!-- Right -->
            <div style="width:80.5%; margin-top: 15px; float: left; overflow:auto;"> 
                <div class="table" id="table" style="position: relative; margin-top: 15px; width:98.5%; margin-left:10px;">
                    <table id="table2">
                    </table>
                </div>
            </div>
        </div>
    </div>
    
</div><!-- end of pop_body -->
</body>

</html>