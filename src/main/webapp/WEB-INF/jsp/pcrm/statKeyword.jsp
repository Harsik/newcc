<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
  	<title>행정동별 지표</title>
    <meta charset="utf-8">
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statKeyword.js'/>"></script> 
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

rMateChartH5.calls("chart1", {
"setLayout" : layoutStr,
"setData" : chartData
});
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
	행정동
	<select id="selCtgAddr">
		<option value="all">전체</option>
	</select>
	
	민원유형(대)
	<select id="selCtgLgCd"></select>
	
	민원유형(중)
	<select id="selCtgMdCd"></select>

	 랭킹
	<select id="selCtgRank">
		<option value="all">전체</option>
		<option value="5">TOP5</option>
		<option value="10">TOP10</option>
		<option value="15">TOP15</option>
		<option value="20">TOP20</option>
	</select>
	
	<div id="div_chkExcept"><input type="checkbox" id="chkExcept" name="chkExcept" value="Y" />0건 제외</div>
	
	<button id="btnSearch">조회</button>
	
	
	<div id="chartHolder" style="height:800px; width:1000px;"></div>
	<div class="table" id="tableSample" style="position: relative; margin-top: 20px; width:93%; margin-left:32px; overflow-x: auto;"></div>
	
	
</body>
</html>