<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
  	<title>유형별 상담현황</title>
    <meta charset="utf-8">
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statCounselType.js'/>"></script> 
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>

<script type="text/javascript">
rMateChartH5.create("chart1", "chartHolder", "", "100%", "100%");
rMateChartH5.create("chart2", "chartHolder2", "", "100%", "100%");


var layoutStr =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
       +'<Options>'
         +'<Legend useVisibleCheck="true"/>'
       +'</Options>'
     +'<Pie3DChart itemClickJsFunction="chartClickHanlder" showDataTips="true" innerRadius="0.2" depth="70" paddingLeft="100" paddingTop="50" paddingRight="100" paddingBottom="50">'
  /*
  Doughnut3D 차트 생성시에 필요한 Pie3DChart 정의합니다
 showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
    innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
 */
 /* startAngle : 첫번째 데이터가 표현되는 파이 조각이 기본으로 3시 방향입니다.
 90도 반시계 방향으로 회전하여 12시 방향을 시작점으로 설정합니다. */
   /* perWedgeExplodeRadius : 파이 조각을 삐져나오게 하는 역할을 합니다.
 5번째 파이 조각이 삐져 나오게 설정되었습니다. 만약 2, 7 번째 파이 조각이 삐져나오게 설정하려면
     perWedgeExplodeRadius="[0,0.1,0,0,0,0,0.1]" 로 설정하면 됩니다.*/
          +'<series>'
               +'<Pie3DSeries id="pie" nameField="CTG_NM" field="CTG_CNT" labelPosition="inside" color="#ffffff">'
             /* Pie3DChart 정의 후 Pie3DSeries labelPosition="inside"정의합니다 */
                   +'<showDataEffect>'
                   /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                        +'<SeriesSlide direction="right" duration="1000"/>'
   /*
  SeriesSlide 효과는 시리즈 데이터가 데이터로 표시될 때 한쪽에서 미끄러지듯 나타나는 효과를 적용합니다
   - 공통속성 -
    elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
  minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
               이 값보다 짧은 시간에 effect가 실행되지 않습니다
 offset : effect개시의 지연시간을 설정합니다 default:0
    perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
   - SeriesSlide속성 -
   direction : left:왼쪽, right:오른쪽, up:위, down:아래 default는 left입니다
  */
                  +'</showDataEffect>'
              +'</Pie3DSeries>'
         +'</series>'
      +'</Pie3DChart>'
  +'</rMateChart>';

//차트 데이터
var chartData = 
[{"CTG_NM":"Cell Phone", "CTG_CNT":900},
{"CTG_NM":"TV", "CTG_CNT":2400},
{"CTG_NM":"Tablet", "CTG_CNT":1900}];




/// 막대
var layoutStr2 =
         '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
               +'<Options>'
             +'</Options>'
             +'<Column3DChart itemClickJsFunction="chartClickHanlder" showDataTips="true" columnWidthRatio="0.4">'
                 +'<horizontalAxis>'
                       +'<CategoryAxis categoryField="CTG_NM"/>'
                    +'</horizontalAxis>'
                  +'<verticalAxis>'
                     +'<LinearAxis maximum="100" interval="10"/>'
                  +'</verticalAxis>'
                    +'<series>'
                       +'<Column3DSeries id="column" labelPosition="outside" yField="CTG_RATE" outsideLabelYOffset="-14" outsideLabelXOffset="7">'
                          +'<showDataEffect>'
                               +'<SeriesInterpolate duration="1200" elementOffset="60"/>'
                           +'</showDataEffect>'
                      +'</Column3DSeries>'
                  +'</series>'
              +'</Column3DChart>'
           +'</rMateChart>'
 
// 차트 데이터
var chartData2 = [{"CTG_NM":"SouthSudan", "CTG_RATE":20},
               {"CTG_NM":"Libya", "CTG_RATE":30},
              {"CTG_NM":"SierraLeone", "CTG_RATE":51.2},
                {"CTG_NM":"Mongolia", "CTG_RATE":44.5},
             {"CTG_NM":"Paraguay", "CTG_RATE":62.35},
                {"CTG_NM":"TimorLeste", "CTG_RATE":84.46},
                {"CTG_NM":"Iraq", "CTG_RATE":48.9},
             {"CTG_NM":"Panama", "CTG_RATE":38},
             {"CTG_NM":"Gambia", "CTG_RATE":60.5},
               {"CTG_NM":"Mozam-bique", "CTG_RATE":40.1}];

rMateChartH5.calls("chart1", {
"setLayout" : layoutStr,
"setData" : chartData
});

rMateChartH5.calls("chart2", {
	 "setLayout" : layoutStr2,
	 "setData" : chartData2
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
  
  
/************************************ dropdownBox ************************************/
	.dropdownBox{
		display : inline-block;
	}
	.dropdownBox *{
		vertical-align: middle;
		padding:0;
		margin:0;
		font-size:9pt;
	}
	.dropdownBox dt{
		cursor:pointer;
	}
	
	.dropdownBox dt, .dropdownBox dd {
		width:130px;
	}
	
	.dropdownBox dt{
		display:inline-block;
		vertical-align:middle;
		line-height:19px;
		padding: 0em 0.5em;
		border:1px solid #bbbaba;
		background-color:#fff;
	}
	
	.dropdownBox dt>span{
		display:inline-block;
		vertical-align:middle;
	}
	
	.dropdownBox dt>span.multiCheckValues{
		width:90%;		
	}
	
	.dropdownBox dt>spn.dropBtn{
		width:10px;
	}
	
	.dropdownBox dd{
		display:none;
		position:absolute;
		overflow-x:hidden;
		overflow-y:auto;
		word-break:break-all;
		z-index:100;
		border:1px solid #bbbaba;
		background-color:#FFFFFF;
		max-height:200px;
		padding:0.3em 0.5em;
	}
	
	.dropdownBox ul, dropdownBox li{
		list-style:nene;
	}
	
	.dropdownBox dd>ul li{
		line-height:25px;
	}
  
</style>
</head>
<body>
	행정동
	<select id="selCtgAddr">
		<option value="all">전체</option>
	</select>
	
	<label>0건 제외</label><input type="checkbox" name="chkExcept" id="chkExcept">
	<label>소수점</label><input type="checkbox" name="chkRoundYn" id="chkRoundYn">
	
	<label>총합대비 비율</label><input type="checkbox" name="chkPcntYn" id="chkPcntYn">
	
	필터
	<div>
		<div class="dropdownBox" id="multiCheckbox"></div>
		<button type="button" id="btnMultiCheckBox" class="button">적용</button>
	</div>
	
	<button id="btnSearch">조회</button>
	</br>
	</br>
	
	<div style="margin-bottom: 600px;">
		<div id="leftDiv" style="width:32%; height:600px; float: left;">
			<div id="chartHolder" style="height:600px;"></div>
		</div>
		<div id="rightDiv" style="width:65%; height:600px; float: right;">
			<div id="chartHolder2" style="height:600px;"></div>
		</div>
	</div>
	
	<div>
		<span id="ctgLgTitle"></span>
		<span id="ctgMdTitle"></span>
		<span id="ctgSmTitle"></span>
	</div>
	
	<div class="table" id="tableSample" style="position: relative; margin-top: 20px; width:93%; margin-left:32px; overflow-x: auto;"></div>
</body>
</html>