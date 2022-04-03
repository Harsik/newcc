<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>키워드 Summary</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statKeywordSumm.js'/>"></script>

<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
<base target="_self">

<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
<style type="text/css">
    
    .rMateH5__UITextField {font-size: 15px;font-weight: bold;}
    
/*     body {	font-family: "Dotum", sans-serif;} */
#pop_body {	overflow-y: none; height: 915px; }
#pop_body_inner {	overflow-y: none; height: 800px; border: 8px solid #8eb4e3; margin-top:0px;}
</style>
<script type="text/javascript">
</script>

</head>
<body style="overflow-y: hidden;">
    <div id="h1" style="font-family: 'Dotum', sans-serif;">키워드 Summary</div>
    <div id="pop_body">
        <div class="stitle">키워드 Summary</div><!--"타이틀"-->
        <!-- 검색 -->
        <div id="search">
            <table class="search_tbl">
                <tr>
                    <th style = "width: 30px;">
                        <label>기간</label>
                    </th>
                    <td class="nemo_30" style="width: 385px;">
                        <select id="optTerm" style="width: 60px;" class="select_al">
                            <option value = "year">년도별</option>
                            <option value = "month" selected="selected">월별</option>
                            <option value = "week">주별</option>
                            <option value = "day">일별</option>
                        </select>
                        <div id="dvYear" style="display: inline;">
                            <select id = 'statKeywordYearStart' style ='width : 70px; margin-left : 5px;' ></select>
                            <span>~</span>
                            <select id = 'statKeywordYearEnd' style ='width : 70px; margin-left : 5px;' ></select>
                        </div>
                        <div id="dvMonth" style="display: inline;">
                            <input type="text" class="text_Date" id="statKeywordMonthStart" maxlength="7" />
                            <span>~</span>
                            <input type="text" class="text_Date" id="statKeywordMonthEnd" maxlength="7" />
                        </div>
                        <div id="dvWeek" style="display: inline;">
                            <input type="text" class="text_Date" id="statKeywordWeekDay" maxlength="10" />
                        </div>
                        <div id="dvDay" style="display: inline;">
                            <input type="text" class="text_Date" id="statKeywordDayStart" maxlength="10" />
                            <span>~</span>
                            <input type="text" class="text_Date" id="statKeywordDayEnd" maxlength="10" />
                        </div>
                    </td>
                    <th style = "width: 50px;">
                        <label>행정동</label>
                    </th>
                    <td style="width: 100px;">
                        <select class="select_al" id="selCtgAddr">
							<option value="all">전체</option>
						</select>
                    </td>
                    
                    <th style = "width: 65px;">
                        <label>유형랭킹</label>
                    </th>
                    <td style="width: 85px;">
                    	<select class="select_al" id="selCtgCd">
							<option value="ctg_lg_cd">대분류</option>
							<option value="ctg_md_cd">중분류</option>
							<option value="ctg_sm_cd">소분류</option>
						</select>
                    </td>
                    
                    <td class="line_b" style="width:70px;">
                        <select id = 'selCtgRank' style ='width : 75px; margin-left : 5px;' class="select_al" >
                            <option value="all">전체</option>
                            <option value="10">TOP10</option>
							<option value="20">TOP20</option>
							<option value="30">TOP30</option>
							<option value="30">TOP50</option>
							<option value="30">TOP100</option>
                        </select>
                    </td>
                    <td class="btn">
                        <button type="button" id="btnSearch" class="button">조회</button>
                        <button type="button" id="btnInit"   class="button">초기화</button>
                    </td>
                    
                </tr>
            </table>
        </div>
        <br/>
        
        <div id="h1" style="margin-top: 55px; background-color: #8eb4e3;" align="center" >
<!--         	<span>기간별</span> -->
        	<span style="color: #ffffff;"> 워드 </span><span>클라우드</span>
        </div>
        <div id="pop_body_inner">
            <div id="chartHolder" style="width:100%; height:100%;" ></div>
        </div>
    </div><!-- end of pop_body -->

</body>
</html>