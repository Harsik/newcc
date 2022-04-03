<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
  	<title>PCRM</title>
    <meta charset="utf-8">
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statKeywordSumm.js'/>"></script> 
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>

<script type="text/javascript">
rMateChartH5.create("chart1", "chartHolder", "", "90%", "90%");
var layoutStr = '<rMateChart backgroundColor="#FFFFFF" borderStyle="none" fontFamily="Noto Sans KR">' // 이 예제에서는 구글 웹폰트를 적용하였습니다.
    /* 
       WordCloudChart 생성시에 필요한 WordCloudChart를 정의합니다 
        showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다  
     */
    +'<WordCloudChart showDataTips="true">'
         +'<series>'
             /*
                WordCloudChart 내에서 사용되어질 WordCloudSeries를 설정하도록 합니다.
                  textField : 화면에 출력할 문자열의 필드 명을 설정합니다.
                 weightField : 각 문자가 가지고 있는 가중치 필드 명을 설정합니다.
           */
            +'<WordCloudSeries textField="CD_NM" weightField="CNT">'
               +'<showDataEffect>'
                     +'<SeriesInterpolate duration="1000"/>'
                 +'</showDataEffect>'
                +'<fills>'
                      +'<SolidColor color="#D63A39"/>' //빨강
                      +'<SolidColor color="#27a6b5"/>' //청록
                      +'<SolidColor color="#86d3ed"/>' //밝은 하늘
                      +'<SolidColor color="#43576B"/>' //다크블루
                      +'<SolidColor color="#F55E53"/>' //다홍
                      +'<SolidColor color="#C4BD46"/>' //노랑+녹색
                      +'<SolidColor color="#404362"/>' //남색
                      +'<SolidColor color="#466700"/>' //녹색
                      +'<SolidColor color="#FDB939"/>' //귤
                      +'<SolidColor color="#3fb1e7"/>' //하늘
                      +'<SolidColor color="#FD9139"/>' //오렌지
                      +'<SolidColor color="#8C2F71"/>' //자주
                      +'<SolidColor color="#669B94"/>' //어두운 하늘
                +'</fills>'
             +'</WordCloudSeries>'
       +'</series>'
    +'</WordCloudChart>'
+'</rMateChart>';

//차트 데이터
var chartData = [
{"CD_NM":"용기", "CNT":12},
{"CD_NM":"치유", "CNT":8},
{"CD_NM":"행복하다", "CNT":9},
{"CD_NM":"좋아요", "CNT":3},
{"CD_NM":"함께해요", "CNT":3},
{"CD_NM":"사람들", "CNT":1},
{"CD_NM":"블랙홀", "CNT":11},
{"CD_NM":"우리", "CNT":8},
{"CD_NM":"엄마","CNT":9},
{"CD_NM":"클로드모네", "CNT":9},
{"CD_NM":"힘내자", "CNT":2},
{"CD_NM":"은하수", "CNT":3},
{"CD_NM":"맛있다", "CNT":1},
{"CD_NM":"오늘하루", "CNT":1},
{"CD_NM":"본능", "CNT":4},
{"CD_NM":"빛", "CNT":8},
{"CD_NM":"비밀", "CNT":9},
{"CD_NM":"즐겁게", "CNT":9},
{"CD_NM":"혁명", "CNT":2},
{"CD_NM":"감성", "CNT":1},
{"CD_NM":"우주", "CNT":10},
{"CD_NM":"새벽", "CNT":16},
{"CD_NM":"냉정", "CNT":6},
{"CD_NM":"여행", "CNT":8}];


rMateChartH5.calls("chart1", {
"setLayout" : layoutStr,
"setData" : chartData
});
</script>

</head>
<body>
	<select id="selCtgAddr">
		<option value="all">전체</option>
	</select>
	<select id="selCtgCd">
		<option value="ctg_lg_cd">대분류</option>
		<option value="ctg_md_cd">중분류</option>
		<option value="ctg_sm_cd" selected="selected">소분류</option>
	</select>
	<select id="selCtgRank">
		<option value="10">TOP10</option>
		<option value="20">TOP20</option>
		<option value="30" selected="selected">TOP30</option>
	</select>
	<button id="btnSearch">조회</button>
	
	
	
	<div id="chartHolder" style="height:800px; width:1000px;"></div>
</body>
</html>