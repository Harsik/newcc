var layoutStr = "";
var chartData = [];
var chartVars = "rMateOnLoadCallFunction=chartReadyHandler";

$(document).ready(function(){
	//행정동 주소 selectBox
	creatAddrSelctBox();
	
	getLayout();
	
	//초기화
    fnInit();
    
    //이벤트
    //조회버튼 클릭 이벤트
    $("#btnSearch").bind("click", fnSearch);
    
    //초기화버튼 클릭
    $("#btnInit").bind("click", fnInit);
    
    //일별,월별 selectbox change 이벤트
    $("#optTerm").bind("change", fnChangeTerm);
    
    // 자동 실시간 데이터 가져오기(테스트중 주석처리해놓음)
//    rMateChartH5.create("chart1", "chartHolder", chartVars, "100%", "100%"); 
    rMateChartH5.create("chart1", "chartHolder", "", "100%", "100%"); 
    
    rMateChartH5.registerTheme(rMateChartH5.themes);
    
    
});

// 차트의 속성인 rMateOnLoadCallFunction 으로 설정된 함수.
// rMate 차트 준비가 완료된 경우 이 함수가 호출됩니다.
// 이 함수를 통해 차트에 레이아웃과 데이터를 삽입합니다.
// 파라메터 : id - rMateChartH5.create() 사용 시 사용자가 지정한 id 입니다.
function chartReadyHandler(id) {
	document.getElementById("chart1").setLayout(layoutStr);
	document.getElementById("chart1").setData(makeData());
	
	setTimeout(changeData, 3000);
}

function changeData(){
	document.getElementById("chart1").setData(makeData());
	setTimeout(changeData, 5000);
}

function rMateChartH5ChangeTheme(theme){
    document.getElementById("chart1").setTheme(theme);
 }

function makeData(){
	chartData = [];
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/pcrm/getCustInfo.do",
		data : "pJson=" + getJsonStrKeywordSummList(),
		success : function(data){
			chartData = data;
			
			// 임시 가데이터 : 움직이는 것 보기위함
			/*
			for(var i = 0; i < data.length ; i++){
				chartData.push({
		            CD_NM : data[i].CD_NM,
		            CNT : data[i].CNT,
		            CTG_RATE : Math.floor(Math.random(10) * 100)
		      });
			}
			*/
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	return chartData;
}

//hasNoData(false); 데이터가 존재하지 않으므로 차트의 기본 구조도 보이지 않아야 한다면 false로 주어 차트 전체의 visible을 false로 설정합니다.
//hasNoData(true); 데이터가 존재하지 않아도 차트의 기본 구조는 보여야 한다면 true로 주어 visible을 true로 설정합니다.
function checkData(data){
	// 데이터가 없을 경우 hasNoData함수를 실행하여 메세지창을 출력한다.
	if(data.length <= 0)
		document.getElementById("chart1").hasNoData(true);
}

function fnDateSet(){
	
	//년도별 select box set start
    var selectBox = "";
    var d = new Date();
    var currentYear = d.getFullYear();
    for(var i = currentYear; i >= currentYear-10; i--)
    {
        selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
    }
    $("#statKeywordYearStart").html(selectBox);
    $("#statKeywordYearEnd").html(selectBox);
    
    //년도별 select box set end
    
    //월별  set start
    $("#statKeywordMonthStart").MonthPicker({
        MaxMonth: 0
    });
    
    $("#statKeywordMonthEnd").MonthPicker({
        MaxMonth: 0
    });
    
    $('#statKeywordMonthStart').val( getDate().substr(0, 7) );
    $('#statKeywordMonthEnd').val( getDate().substr(0, 7) );
    //월별  set end
    
    //주별 set start
    $("#statKeywordWeekDay").val( getDate() );
    datePicker("#statKeywordWeekDay");
    //주별 set end
    
    //요일별 set start
    $('#statKeywordDayStart').val( getDate() );
    $('#statKeywordDayEnd').val( getDate() );
    
    datePicker("#statKeywordDayStart");
    datePicker("#statKeywordDayEnd");
    //요일별 set start
    
    fnChangeTerm();
}

function fnInit(){
	// 검색조건 초기화
	$("#optTerm").val("month");
	$("#selCtgAddr").val("all");
	$("#selCtgCd").val("ctg_lg_cd");
	$("#selCtgRank").val("all");
	
	// 날짜 초기화
	fnDateSet();
	
    // 재검색
    fnSearch();
}

/*
 * selectbox change 함수
 */
function fnChangeTerm() {
    
    var termType = $("#optTerm").val();
    
    
    if(termType == "year") {
        $("#dvYear").show();
        $("#dvMonth").hide();
        $("#dvWeek").hide();
        $("#dvDay").hide();
    }
    else if(termType == "month") {
        $("#dvYear").hide();
        $("#dvMonth").show();
        $("#dvWeek").hide();
        $("#dvDay").hide();
    }
    else if(termType == "day") {
        $("#dvYear").hide();
        $("#dvMonth").hide();
        $("#dvWeek").hide();
        $("#dvDay").show();
    }
    else if(termType == "week") {
        $("#dvYear").hide();
        $("#dvMonth").hide();
        $("#dvWeek").show();
        $("#dvDay").hide();
    }
    
}

var stDt  = "";
var endDt = "";
var tmp1  = "";
var tmp2  = "";

function fnValidator(){
	
	var termType = $("#optTerm").val();
	
    stDt  = "";
    endDt = "";
    tmp1  = "";
    tmp2  = "";
    
    if(termType == "year"){
        stDt  = $('#statKeywordYearStart option:selected').val();
        endDt  = $('#statKeywordYearEnd option:selected').val();
    }
    else if(termType == "month"){
        tmp1  = $('#statKeywordMonthStart');
        tmp2  = $('#statKeywordMonthEnd');
        stDt  = tmp1.val().replace(/[-, :, \s]/g, "");
        endDt = tmp2.val().replace(/[-, :, \s]/g, "");
    }
    else if(termType == "day"){
        tmp1  = $('#statKeywordDayStart');
        tmp2  = $('#statKeywordDayEnd');
        stDt  = $('#statKeywordDayStart').val().replace(/[-, :, \s]/g, "");
        endDt = $('#statKeywordDayEnd').val().replace(/[-, :, \s]/g, "");
    }
    else if(termType == "week"){
    	tmp1  = $('#statKeywordWeekDay').val();
        stDt  = commWeekStartDay($('#statKeywordWeekDay').val());
        endDt = commWeekEndDay($('#statKeywordWeekDay').val());
        if( !(stDt != "" && stDt != null) ){
            alert("조회일을 입력하세요.");
            $('#statKeywordWeekDay').focus();
            return;
        }
        
    }
    
    if( !(stDt != "" && stDt != null) ){
        alert("조회 시작일(월)을 입력하세요.");
        tmp1.focus();
        return;
    }
    
    if(!(endDt != "" && endDt != null) && termType != "week"){
        alert("조회 종료일(월)을 입력하세요.");
        tmp2.focus();
        return;
    }
    
    if(stDt > endDt && termType != "week"){
        alert("시작일(월)을 확인하세요.");
        tmp1.focus();
        return;
    }
    
}

function fnSearch(){
	fnValidator();
	
	chartData = [];
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrKeywordSummList(),
		success : function(data){

			chartData = data;
			rMateChartH5.calls("chart1", {
				   "setLayout" : layoutStr,
				    "setData" : chartData
			});
			
			if(chartData.length <= 0){
				alert("데이터가 없습니다.");
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrKeywordSummList(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cGNybS5zZWxlY3RLZXl3b3JkU3VtbQ==",
		"map" : {
			"key" : "value",
			"termType" :$("#optTerm").val() ,
			"statKeywordStartDt" : stDt,
            "statKeywordEndDt" : endDt,
			"ctgCd" : $("#selCtgCd").val(),
			"hAddr" : $("#selCtgAddr").val(),
			"rankCnt" : $("#selCtgRank").val()
		}
	};
		
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function creatAddrSelctBox(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrCtgCdSetSelectBox(),
		success : function(data){
			var str = "";
			$.each(data , function(i){
				str += '<option value="'+data[i].CD+'">'+data[i].CD_NM+'</option>';
			});
			$("#selCtgAddr").append(str);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrCtgCdSetSelectBox(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "cGNybS5zZWxlY3RBZGRyQ2Q=",
			"map" : {
				"key" : "value",
			}
		};
			
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

function getLayout(){
	layoutStr = '<rMateChart backgroundColor="#FFFFFF" borderStyle="none" fontFamily="Noto Sans KR" fontWeight="bold">'
    +  '<Options>'
    +   '</Options>'
//    +   '<WordCloudChart showDataTips="true" selectionMode="single" itemClickJsFunction="fnWordCloudChartItemClick" dataTipJsFunction="fnDataTip" >'
    +	'<WordCloudChart showDataTips="true" dataTipJsFunction="dataTipFunc">'
    +    '<series>'
//    +     '<WordCloudSeries  id="WordCloud" textField="CD_NM" weightField="RANK" maxFontSize ="200">'
    +	 '<WordCloudSeries textField="CD_NM" weightField="CTG_RATE" maxFontSize ="200">'
    +      '<showDataEffect>'
    +        '<SeriesInterpolate duration="1000"/>'
    +      '</showDataEffect>'
    +      '<fills>'
    +        '<SolidColor color="#D63A39"/>' //빨강
    +        '<SolidColor color="#27a6b5"/>' //청록
    +        '<SolidColor color="#86d3ed"/>' //밝은 하늘
    +        '<SolidColor color="#43576B"/>' //다크블루
    +        '<SolidColor color="#F55E53"/>' //다홍
    +        '<SolidColor color="#C4BD46"/>' //노랑+녹색
    +        '<SolidColor color="#404362"/>' //남색
    +        '<SolidColor color="#466700"/>' //녹색
    +        '<SolidColor color="#FDB939"/>' //귤
    +        '<SolidColor color="#3fb1e7"/>' //하늘
    +        '<SolidColor color="#FD9139"/>' //오렌지
    +        '<SolidColor color="#8C2F71"/>' //자주
    +        '<SolidColor color="#669B94"/>' //어두운 하늘
    +        '<SolidColor color="#A1E1D7"/>' //민트
  	+        '<SolidColor color="#ADCF77"/>' //연두
  	+        '<SolidColor color="#FFDC04"/>' //노랑
  	+        '<SolidColor color="#5473b3"/>' //파랑
    +      '</fills>'
    +     '</WordCloudSeries>'
    +    '</series>'
    +   '</WordCloudChart>'
    +'</rMateChart>';
}

/*
 * 툴팁 Info 메시지 수정
 */
function dataTipFunc(seriesId, seriesName, index, xName, yName, data, values)
{
   return  "<table cellpadding='0' cellspacing='1'>"
   + "<tr>"
   + "<td align='center' colspan='2' style='border-bottom:solid 2px #8b8b8b; padding:4px; font-weight:bold;'>" + data.CD_NM + "</td>"
   + "</tr><tr>"
   + "<td style='padding:2px;'>건수 : </td><td align='right'; style='font-weight:bold;'> " + data.CNT + "건</td>"
   + "</tr><tr>"
   + "<td style='padding:2px;'>비율 : </td><td align='right'; style='font-weight:bold;'>" + data.CTG_RATE + "%</td>"
   + "</tr></table>";
}
