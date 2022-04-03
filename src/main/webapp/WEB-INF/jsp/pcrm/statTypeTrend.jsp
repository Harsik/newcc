<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
  	<title>유형별 지표 추이</title>
    <meta charset="utf-8">
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statTypeTrend.js'/>"></script> 
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>

<script type="text/javascript">
rMateChartH5.create("chart1", "chartHolder", "", "90%", "90%");
var layoutStr =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
    	+'<NumberFormatter id="numfmt" precision="0" rounding="nearest"/>' // 퍼센트
        +'<Column3DChart showDataTips="true" columnWidthRatio="0.4">'
            +'<horizontalAxis>'
                  +'<CategoryAxis categoryField="CD_NM"/>'
               +'</horizontalAxis>'
             +'<verticalAxis>'
                +'<LinearAxis maximum="100" interval="10"/>'
             +'</verticalAxis>'
               +'<series>'
                  +'<Column3DSeries formatter="{numfmt}" labelPosition="outside" yField="RATE" outsideLabelYOffset="-14" outsideLabelXOffset="7">'
                     +'<showDataEffect>'
                          +'<SeriesInterpolate/>'
                      +'</showDataEffect>'
                 +'</Column3DSeries>'
             +'</series>'
         +'</Column3DChart>'
      +'</rMateChart>'


</script>
<style>
table {
    width: 100%;
    border: 1px solid #444444;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #444444;
    padding: 10px;
  }
</style>
</head>
<body>
	기간
	<select id = "optTerm" style = "width: 100px;">
		<option value = "day" selected="selected">일별</option>
		<option value = "week">주간별</option>
		<option value = "month">월별</option>
		<option value = "year">년도별</option>
	</select>

	행정동
	<select id="selCtgAddr">
		<option value="all">전체</option>
	</select>
	
	<label>0건 제외</label><input type="checkbox" name="chkExcept" id="chkExcept">
	<label>최대/최소값</label><input type="checkbox" name="checkMinMax" id="checkMinMax">
	<label>전체값</label><input type="checkbox" name="checkAll" id="checkAll">
	
	
	
	민원유형
	<select id="selCtgLgCd"></select>
	<select id="selCtgMdCd"></select>
	<select id="selCtgSmCd"></select>
	
	차트유형
	<select id="changeChart">
		<option value="line">라인 차트</option>
		<option value="columnMotion">막대 차트</option>
		<option value="columnBubble">거품 차트</option>
		<option value="columnLine">3D막대+라인 차트</option>
	</select>	
	
	색상
	<select id="changeColor" style="width: 100px;">
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
	
	<button id="btnSearch">조회</button>
	
	
	<div id="chartHolder" style="height:600px; width:100%;"></div>
	<div class="table" id="leftTable" style="width: 10%; float: left;">
		<table id ="left">
			<tr>
				<td rowspan="2" style = "" nowrap>유형</td>
			</tr>
			<tr>
											
			</tr>
			<tr>
				<td id="tableKeyword"  style = "height: 85px;" nowrap></td>
			</tr>
		</table>
	</div>
	
	<div class="table" id="rightTable" style="width: 90%; float: right;"></div>
	
	
</body>
</html>