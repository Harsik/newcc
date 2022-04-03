// 날짜 셋팅
var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if(currentMonth < 10)
	currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;

//차트 데이터
var chartData=[];
var chartData2=[];

var layoutStr = "";
var layoutStr2 ="";

var ctgLvl = 1;
var ctgCd = "";

var arrFilter = [];

$(document).ready(function(){
	$("#btnExcel").hide();
	
	getLayout();
	
	initDate();
	
	creatSelctBox();
	
	fnPie(1,"");
	fnColumn(1,"");
	
	//기간 조회조건 change 이벤트
    $("#optTerm").bind("change", fnChangeTerm);
	
	//조회버튼 클릭 이벤트
    $("#btnSearch").bind("click", fnbtnSearch);

    //적용버튼 클릭 이벤트
    $("#btnMultiCheckBox").bind("click", fnBtnMultiCheckBox);
    
    //키워드 selectbox set start
    var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='ulUserList'></ul></dd></dl>";
    $("#multiCheckbox").html(dropdownBoxHtml);
    
    //rmate
    rMateChartH5.create("chart1", "chartHolder", "", "100%", "100%");
    rMateChartH5.create("chart2", "chartHolder2", "", "100%", "100%");
    rMateChartH5.registerTheme(rMateChartH5.themes);
});

function rMateChartH5ChangeTheme(theme){
    document.getElementById("chart1").setTheme(theme);
}

function fnbtnSearch(){
	ctgLvl = 1;
	arrFilter = [];
	
	getLayout();
	fnPie(1,"");
	fnColumn(1,"");
}

function log(){
	console.log("ctgLvl 	: " + ctgLvl);
	console.log("arrFilter 	: " + arrFilter);
	console.log("ctgCd 		: " + ctgCd);
	
	
}

function initDate(){
	// 기간 셋팅
	var selectBox = "";	
	for(var i = currentYear; i >= currentYear-10; i--)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	
	$("#statYearStart").html(selectBox);
	$("#statYearEnd").html(selectBox);
	
	$("#statMonthStart").MonthPicker({
		MaxMonth: 0
    });
	
	$("#statMonthEnd").MonthPicker({
		MaxMonth: 0
    });
	
	$("#statDayStart").bind("change",  function () {
		$( "#statDayEnd" ).datepicker( "option", "minDate", $("#statDayStart").val() );
		var toDay = new Date(getDate());
		var maxDay = new Date(getAddDate($("#statDayStart").val(), 31));
		
		if((toDay.getTime() - maxDay.getTime()) < 0){
			// 현재 날짜가 작은경우
			$( "#statDayEnd" ).datepicker( "option", "maxDate",getDate());
		}else{
			$( "#statDayEnd" ).datepicker( "option", "maxDate", getAddDate($("#statDayStart").val(), 31) );
		}
		$( "#statDayStart" ).datepicker( "option", "maxDate",getDate());			

		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	$("#statDayEnd").bind("change",  function () {
		$( "#statDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#statDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
		
	});
	
	datePicker("#statWeekDate");
	datePicker("#statDayStart");
	datePicker("#statDayEnd");
    
    fnChangeTerm();
}

//기간 셀렉트 박스별 상세 검색
function fnChangeTerm() {
    var termType = $("#optTerm").val();
    
    if(termType == "year") {
		$("#dvYear").show();
		$("#dvMonth").hide();
		$("#dvWeek").hide();
		$("#dvDay").hide();

		$("#statYearStart").val(currentYear);
		$("#statYearEnd").val(currentYear);
	}
	else if(termType == "month") {	
		$("#dvYear").hide();
		$("#dvMonth").show();
		$("#dvWeek").hide();
		$("#dvDay").hide();
			    
		$('#statMonthStart').val( currentYM );
		$('#statMonthEnd').val( currentYM );		
	}
	else if(termType == "week") {	
		$("#dvYear").hide();
		$("#dvMonth").hide();
		$("#dvWeek").show();
		$("#dvDay").hide();
		
		$("#statWeekDate").val(getDate());
	}
	else if(termType == "day") {	
		$("#dvYear").hide();
		$("#dvMonth").hide();
		$("#dvWeek").hide();
		$("#dvDay").show();
		
		$("#statDayStart").val(getDate());
		$("#statDayEnd").val(getDate());
	}
}

//차트 클릭 이벤트
function chartClickHanlder(seriesId, index, data, values){
	
	console.log("seriesId 	: "+seriesId);
	console.log("index 		: "+index);
	console.log("data		: "+data);
	console.log(values);
	
	if(values.CTG_LVL==3) {
		alert("소분류입니다.");
		return false;
	}
	
	if(values.CTG_CNT==0){
		alert("0건은 선택 XXX");
		return false;
	}
	
	if(values.CTG_LVL==1) {
		$("#ctgLgTitle").html(values.CTG_NM);
	} else if(values.CTG_LVL==2) {
		$("#ctgMdTitle").html("> "+values.CTG_NM);
	} else if(values.CTG_LVL==3) {
		$("#ctgSmTitle").html("> "+values.CTG_NM);
	}
	
	ctgLvl = parseInt(values.CTG_LVL);
	ctgCd = values.CTG_CD;
	parntCd = values.PARNT_CD;
	arrFilter = [];
	
	console.log("!==============");
	console.log("seriesId 	: "+seriesId);
	console.log("ctgLvl 	: "+ctgLvl);
	console.log("ctgCd		: "+ctgCd);
	console.log("parntCd 	: "+parntCd);
	console.log("==============!");
	
	if(seriesId == "pie") {
		ctgLvl ++;
		fnColumn(ctgLvl,ctgCd);
	} else {
		if(ctgLvl != 1){
			fnPie(ctgLvl,parntCd);
		}
		ctgLvl ++;
		fnColumn(ctgLvl,ctgCd);
	}
}

/*
 * 원형 그래프
 * 0건 값 X , 필터 영향 X
 */
function fnPie(lvl,cd){
	var termType = $("#optTerm").val();
	var strtDt = "";
	var endDt = "";
	
	if(termType=="day"){
		strtDt 	= $("#statDayStart").val();
		endDt 	= $("#statDayEnd").val();
	} else if(termType=="week") {
		strtDt 	= commWeekStartDay($("#statWeekDate").val());
		endDt 	= commWeekEndDay($("#statWeekDate").val());
	} else if(termType=="month") {
		strtDt 	= $("#statMonthStart").val();
		endDt 	= $("#statMonthEnd").val();
	} else if(termType=="year") {
		strtDt 	= $("#statYearStart").val();
		endDt 	= $("#statYearEnd").val();
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getPcrmData.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "cGNybS5zZWxlY3RDb3Vuc2VsVHlwZVBpZQ==", {
			"ctgLvl": lvl,
			"parntCd": cd,
			
			"termType" : termType,
			"strtDt" : strtDt.replace(/-/gi, ""),
			"endDt" : endDt.replace(/-/gi, ""),
			
			"hAddr" : $("#selCtgAddr").val(),
		}),
		success : function(data)
		{	
			if(data.length > 0){
				console.log("Pie Data Count > "+data.length);
//				chartData = data;
//				rMateChartH5.calls("chart1", {
//					   "setLayout" : layoutStr,
//					   "setData" : chartData
//				});
			}else{
				alert("데이터가 존재하지 않습니다. 다른 조건으로 검색해주세요.");
			}
			
			chartData = data;
			rMateChartH5.calls("chart1", {
				   "setLayout" : layoutStr,
				   "setData" : chartData
			});
		},
		error : function(data, status, err)
		{
			//networkErrorHandler(data, status, err);
		}
	});
}

/*
 * 막대 그래프
 */
function fnColumn(lvl,cd){
	var termType = $("#optTerm").val();
	var strtDt = "";
	var endDt = "";
	
	if(termType=="day"){
		strtDt 	= $("#statDayStart").val();
		endDt 	= $("#statDayEnd").val();
	} else if(termType=="week") {
		strtDt 	= commWeekStartDay($("#statWeekDate").val());
		endDt 	= commWeekEndDay($("#statWeekDate").val());
	} else if(termType=="month") {
		strtDt 	= $("#statMonthStart").val();
		endDt 	= $("#statMonthEnd").val();
	} else if(termType=="year") {
		strtDt 	= $("#statYearStart").val();
		endDt 	= $("#statYearEnd").val();
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getPcrmData.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "cGNybS5zZWxlY3RDb3Vuc2VsVHlwZUNvbHVtbg==", {
			"ctgLvl": lvl,
			"parntCd": cd,
			
			"termType" : termType,
			"strtDt" : strtDt.replace(/-/gi, ""),
			"endDt" : endDt.replace(/-/gi, ""),
			
			"checkZero" : $("#checkZero").is(":checked"),
			"hAddr" : $("#selCtgAddr").val(),
		}),
		success : function(data)
		{	
			
			if(data.length > 0){
				fnFilterInfo(data);
				createTable(data);
				chartData2 = data;
				rMateChartH5.calls("chart2", {
					   "setLayout" : layoutStr2,
					   "setData" : chartData2
					});
			}
		},
		error : function(data, status, err)
		{
			//networkErrorHandler(data, status, err);
		}
	});
}



function fnBtnMultiCheckBox(){
	var lvl = ctgLvl;
	var cd = ctgCd;
	
	//키워드 dataSet
    $("input:checkbox[name=chkCtgCd]:checked").each(function(){
    	arrFilter.push($(this).val());
    });
    
    $.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getPcrmData.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "cGNybS5zZWxlY3RDb3Vuc2VsVHlwZUNvbHVtbg==", {
			"ctgLvl": lvl,
			"parntCd": cd,
			
			
			"checkZero" : $("#checkZero").is(":checked"),
			"hAddr" : $("#selCtgAddr").val(),
			
			"chkRoundYn" : $("#chkRoundYn").is(":checked"),
			"arrFilter" : arrFilter
		}),
		success : function(data)
		{	
			
			if(data.length > 0){
				createTable(data);
				chartData2 = data;
				rMateChartH5.calls("chart2", {
					   "setLayout" : layoutStr2,
					   "setData" : chartData2
					});
			}
		},
		error : function(data, status, err)
		{
			//networkErrorHandler(data, status, err);
		}
	});
    
}

function creatSelctBox(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "cGNybS5zZWxlY3RBZGRyQ2Q=", {"key" : "value"}),
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

function createTable(data){
	var totCnt = 0;

	$.each(data, function(key, state) {
    	totCnt += state.CTG_CNT;
    });
    
    var str1 = "";
	var str2 = "";
	
	str1 += '<tr>';
	str1 += '<th nowrap="">행정동</th>';
	str1 += '<th nowrap="">합계</th>';
	str1 += '</tr>';
	str1 += '<tr>';
	str1 += '<td nowrap="">'+$("#selCtgAddr option:checked").text()+'</td>';	
	str1 += '<td nowrap="">'+numberFormat(totCnt)+'건</td>';
	str1 += '</tr>';
	
	str2 += '<tr>';
	for(var i=0; i<data.length; i++){
		str2 += '<th nowrap="">'+data[i].CTG_NM+'</th>';
	}
	str2 += '</tr>';
	str2 += '<tr>';
	for(var i=0; i<data.length; i++){
		str2 += '<td nowrap="">'+numberFormat(data[i].CTG_CNT)+'건</td>';
	}
	str2 += '</tr>';
	
	$("#table1,#table2").empty();
	$("#table1").append(str1);
	$("#table2").append(str2);
}

function fnFilterInfo(data){
	var ulUserList = "";
    $.each(data, function(key, state) {
        ulUserList += "<li><input type='checkbox' name='chkCtgCd' value='" + state.CTG_CD + "' > " + state.CTG_NM + "</input></li>";
    });
    
    $("#ulUserList").html(ulUserList);
    //$("#ulUserList .allmultichk").prop("checked", true);
    $("input:checkbox[name=chkCtgCd]").prop("checked", true);
    $("#multiCheckbox").dropdownMultiCheckbox();
}

function getLayout(){
	// 원형
	layoutStr =
	    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
	       +'<Options>'
//	         +'<Legend useVisibleCheck="true"/>'
	       	+'<Legend position="bottom" useVisibleCheck="true" direction="horizontal" labelPlacement="right" width="630" height="130" horizontalGap ="25" verticalScrollPolicy="on" />'
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
	
	
	var precision = 0;
	
	if( $("#chkRoundYn").is(":checked") ){
		precision = 2;
	}else{
		precision = 0;
	}
	
	//막대
	layoutStr2 =
        '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
//              +'<Options>'
//            +'</Options>'
//		 	+'<NumberFormatter id="numfmt" precision="1"/>'
		 	+'<NumberFormatter id="numfmt" precision="'+precision+'" rounding="nearest"/>' // 퍼센트	
            +'<Column3DChart itemClickJsFunction="chartClickHanlder" showDataTips="true" columnWidthRatio="0.4">'
                +'<horizontalAxis>'
                      +'<CategoryAxis categoryField="CTG_NM"/>'
                   +'</horizontalAxis>'
                 +'<verticalAxis>'
                    +'<LinearAxis maximum="100" interval="10"/>'
                 +'</verticalAxis>'
                   +'<series>'
                      +'<Column3DSeries id="column" formatter="{numfmt}" labelPosition="outside" yField="CTG_RATE" outsideLabelYOffset="-14" outsideLabelXOffset="7">'
                         +'<showDataEffect>'
                              +'<SeriesInterpolate duration="1200" elementOffset="60"/>'
                          +'</showDataEffect>'
                     +'</Column3DSeries>'
                 +'</series>'
             +'</Column3DChart>'
          +'</rMateChart>';
}


////////////////////////////////

// 삐져나오게
function setLayout(arr){
	var layoutStr =
	    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
	       +'<Options>'
	         +'<Legend useVisibleCheck="true"/>'
	       +'</Options>'
	     +'<Pie3DChart itemClickJsFunction="chartClickHanlder" showDataTips="true" innerRadius="0.5" depth="70" paddingLeft="100" paddingTop="50" paddingRight="100" paddingBottom="50">'
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
//	               +'<Pie3DSeries id="pie" nameField="CTG_NM" field="CTG_CNT"  perWedgeExplodeRadius="[0,0.1,0]" labelPosition="inside" color="#ffffff" startAngle="90">'
	               +'<Pie3DSeries id="pie" nameField="CTG_NM" field="CTG_CNT"  perWedgeExplodeRadius="'+arr+'" labelPosition="inside" color="#ffffff" startAngle="90">'
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
}

function CrtArr(){
	var arr = [];	// [0,0.1,0]
}


//상담사 셀렉트 박스 구성
function ulCtgListSet(data){
	var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='ulUserList'></ul></dd></dl>";
	$("#multiCheckbox").html(dropdownBoxHtml);
	
	if(data.length!=0){
		// param값을 JSON으로 파싱
		var ulUserList = "";
		$.each(data, function(key, state) {
			var tempTxt="";
			ulUserList += "<li><input type='checkbox' name='liUser' value='" + state.CTG_NM + "' data='" + state.CTG_NM + tempTxt + "' /> " + state.CTG_NM + "</li>";
		});
		$("#ulUserList").html(ulUserList);
		$("#multiCheckbox").dropdownMultiCheckbox();
	}
	
	// 상담사 전체 선택 이벤트
	$("#ulUserList .allmultichk").on('click', function(e){		
		gUserArrNm = [];
		var chk = $(this).is(':checked');
		if(chk){
			$("dd input[name='liUser']").each(function(){
				gUserArrNm.push($(this).attr('data'));
			});
		}		
	});
	// 상담사 개별 선택 이벤트
	$("dd input[name='liUser']").on('click',function(e){
		
		var chk = $(this).is(':checked');
		if(chk){
			gUserArrNm.push($(this).attr('data'));
		}else{
			var pos = gUserArrNm.indexOf($(this).val());
			gUserArrNm.splice(pos, 1); 
		}		
	});	
	
	// check event
	gUserArrNm = [];
	
	$("#ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArrNm.push($(this).attr('data'));
	});
	$("#multiCheckbox").setCheckedCnt();
	
}