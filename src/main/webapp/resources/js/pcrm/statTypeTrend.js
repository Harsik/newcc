var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

var lineChartColor = "";
var chartData = [];

var chartCntArr = [];

$(document).ready(function(){
	// 행정동 셋팅
	creatSelctBox();
	
	// 상담유형 셋팅
	selCounselType();
	
	// 색상 셋팅
	changeColorEvent();
	
	rMateChart();
	
	fnbtnInit();
	
	//조회버튼 클릭 이벤트
    $("#btnStsTypeSearch").bind("click", fnbtnSearch);

    //초기화버튼 클릭 이벤트
    $("#btnStsTypeInit").bind("click", fnbtnInit);
    
    //엑셀버튼 클릭 이벤트
    $("#btnStsTypeExelDown").bind("click",  fnbtnExcelDown);
    
    //change color
	$("#changeColor").bind("change", changeColor);
	
}); 

var totCnt = 0;
var ratio = 0;

function fnbtnSearch(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrTypeTrendData(),
		success : function(data){
			chartData = data;
			
			// 전체 갯수
			totCnt = 0;
			// CNT값 비교를 위한 배열
			chartCntArr = [];
			for(var i in chartData){
				totCnt += chartData[i].CNT;
				chartCntArr.push(chartData[i].CNT);
			}
			console.log("chartCntArr >> "+chartCntArr);
			console.log("chartTotCnt >> "+totCnt);
			
			// 비율계산
			ratio = 0;
			for(var i=0; i<chartData.length; i++){
				var ratio = 0;
				if(chartData[i].CNT > 0){
					ratio = (chartData[i].CNT/totCnt*100).toFixed(2);
				}
				
				chartData[i].RATIO = ratio;
			}
			
			rMateChart();
			
			tableCreate(chartData);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 초기화 버튼
function fnbtnInit(){
	// 검색조건 초기화
	$("#selCtgAddr").val("all");
	$("#checkZero,#checkMinMax,#checkAll").prop('checked',false);
	$("#selSrchIntvLgCd").val("all").trigger("change");
	
	// 날짜 초기화
	$("#optTerm").val("day");
	initDate();
	
	// 차트 초기화
	$("#changeChart").val("line");
	lineChartColor = "#d63a39";
	$("#changeColor").css( "background-color", lineChartColor );
	rMateChart();
	
	// 재검색
	fnbtnSearch();
}

// 엑셀다운로드 버튼
function fnbtnExcelDown(){
	excelDownLoad(getContextPath() + "/excel/pcrm/typeTrendListExcel.do", getJsonStrTypeTrendData());
}

function getJsonStrTypeTrendData(){
	prevDate();
	
	var termType = $("#optTerm").val();
	var strtDt = "";
	var endDt = "";
	
	if(termType=="day"){
		strtDt 	= $("#schDayStart").val();
		endDt 	= $("#schDayEnd").val();
	} else if(termType=="week") {
		strtDt 	= commWeekStartDay($("#schWeekStart").val());
		endDt 	= commWeekEndDay($("#schWeekEnd").val());
	} else if(termType=="month") {
		strtDt 	= $("#schMonthStart").val();
		endDt 	= $("#schMonthEnd").val();
	} else if(termType=="year") {
		strtDt 	= $("#schYearStart").val();
		endDt 	= $("#schYearEnd").val();
	}
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : termType != "week" ? "cGNybS5zZWxlY3RUeXBlVHJlbmRMaXN0" : "cGNybS5zZWxlY3RUeXBlVHJlbmRXZWVrTGlzdA==",
			"map" : {
				"key" : "value",
				"termType" : termType,
				"strtDt" : strtDt.replace(/[-, :, \s]/g, ""),
				"endDt" : endDt.replace(/[-, :, \s]/g, ""),
				
				"checkZero" : $("#checkZero").is(":checked"), 	// 0건 제외
				"selCtgAddr" : $("#selCtgAddr").val(),			// 행정동
				
				"selCtgLgCd" : $("#selSrchIntvLgCd").val(), 	
				"selCtgMdCd" : $("#selSrchIntvMdCd").val(), 	
				"selCtgSmCd" : $("#selSrchIntvSmCd").val(), 
				
				// excel
				"title" : "유형별지표"+ setDownLoadName(strtDt, endDt),
				"colWidth" : [25, 25, 25],
				"colName" : ["MONTH", "CNT", "INCREASE"],
				"colHeader" : ["날짜", "건수", "증감"],
			}
		};
			
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}


function tableCreate(data){
	var statTypeTitleText = "";
	
	statTypeTitleText += $("#selSrchIntvLgCd option:selected").text();
	
	if ($("#selSrchIntvMdCd").val() != "all") {
		statTypeTitleText += " > " + $("#selSrchIntvMdCd option:selected").text();
	}
	if ($("#selSrchIntvSmCd").val() != "all") {
		statTypeTitleText += " > " + $("#selSrchIntvSmCd option:selected").text();
	}
	
	$("#rightTableTitle").empty();
	$("#rightTableTitle").append(statTypeTitleText);
	
	var str = "";
	
	str	+= '<thead>';
	str	+= '<tr>';
	for(var i=0; i<data.length; i++){
		str	+= '<th>'+data[i].MONTH+'</th>';
	}
	str	+= '</tr>';
	str	+= '</thead>';
	
	str	+= '<tr style="height: 50%">';
	str	+= '<td></td>';
	
	for(var i=0; i<data.length; i++){
		if(i > 0){
			if(data[i].INCREASE >= 0){
				str	+= '<td style="color: blue;">+'+data[i].INCREASE+'</td>';
			}else{
				str	+= '<td style="color: red;">'+data[i].INCREASE+'</td>';
			}
		}
	}
	
	str	+= '<tr style="height: 50%">';
	for(var i=0; i<data.length; i++){
		str	+= '<td>'+numberFormat(data[i].CNT)+'</td>';
	}
	str	+= '</tr>';
	
	$("#rightTable").empty();
	$("#rightTable").append(str);
	
}

function changeColorEvent(){
	lineChartColor = "#d63a39";
	$("#changeColor").css( "background-color", lineChartColor );
	
	$('.colors option').each(function() {
		$(this).css('background-color', $(this).val());
	});
	
	$('.colors').on('change', function() {
		$(this).css('background-color', $(this).val());
	});
}

function changeColor() {
	lineChartColor = $("#changeColor option:selected").val();
	$("#changeColor").css( "background-color", lineChartColor );
	rMateChart();
}

function creatSelctBox(){
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

function selCounselType(){
	g_popup="GCHILD";
	setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "1", g_popup, "00000000", "all", "CHANGE");

	$("#selSrchIntvLgCd").bind("change", function()
	{
	    setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "2", g_popup, $("#selSrchIntvLgCd").val(), "", "CHANGE");
	});
	 
	$("#selSrchIntvMdCd").bind("change", function()
	{
	    setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "3", g_popup, $("#selSrchIntvMdCd").val(),"","CHANGE");
	});
	
	$("#selSrchIntvLgCd").trigger("change");
}

function initDate(){
	// 년도별 -시작연도, 종료연도 초기화
	var selectBox = "";	
	for(var i = currentYear; i >= currentYear-10; i--)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	$("#schYearStart").html(selectBox);
	$("#schYearEnd").html(selectBox);
	
	// 일별 -시작일, 종료일 초기화
	$('#schDayStart').val(getDate().substr(0, 8) + "01");
	$('#schDayEnd').val(getDate());

	datePicker("#schDayStart");
	datePicker("#schDayEnd");
	
	// 주간별 -시작일, 종료일 초기화
	$('#schWeekStart').val(getDate().substr(0, 8) + "01");
	$('#schWeekEnd').val(getDate());

	datePicker("#schWeekStart");
	datePicker("#schWeekEnd");

	// 월별 - 시작일, 종료일 초기화
	$("#schMonthStart").MonthPicker({
		MaxMonth : 0
	});

	$("#schMonthEnd").MonthPicker({
		MaxMonth : 0
	});

	$('#schMonthStart').val(getDate().substr(0, 7));
	$('#schMonthEnd').val(getDate().substr(0, 7));

	fnChangeTerm();

	// 일별,월별 selectbox change 이벤트
	$("#optTerm").bind("change", fnChangeTerm);
}

/*
 * selectbox(date) change 함수
 */
function fnChangeTerm() {
	var termType = $("#optTerm").val();
	if(termType == "year") {
		$("#dvYear").show();
		$("#dvMonth").hide();
		$("#dvWeek").hide();
		$("#dvDay").hide();

		$("#schYearStart").val(currentYear);
		$("#schYearEnd").val(currentYear);
	} else if (termType == "month") {
		$("#dvYear").hide();
		$("#dvMonth").show();
		$("#dvWeek").hide();
		$("#dvDay").hide();
	} else if (termType == "week") {
		$("#dvYear").hide();
		$("#dvMonth").hide();
		$("#dvWeek").show();
		$("#dvDay").hide();
	} else if (termType == "day") {
		$("#dvYear").hide();
		$("#dvMonth").hide();
		$("#dvWeek").hide();
		$("#dvDay").show();
	}
}

// 차트생성
function rMateChart() {
	// columnBubble 일때 '최대최소값' 막기 - 해당 차트에서는 지원 안됨
	if($("#changeChart").val()=="columnBubble"){
		$("#checkMinMax").prop('checked', false);
		$("#checkMinMax").prop("disabled", true);
	}else{
		$("#checkMinMax").prop("disabled", false);
	}
	
	var chartLayout = getChartLayout();
	
	rMateChartH5.create("chart1", "chartHolder", "", "100%", "100%");
	rMateChartH5.calls("chart1", {"setLayout" : chartLayout,"setData" : chartData});
	
	var chartType = $("#changeChart option:selected").val();
	// 1초후 slide 자동 실행
	if(chartType == "columnMotion" || chartType == "columnBubble"){
		setTimeout(function() {
			document.getElementById("chart1").sliderPlay();
		}, 1000);
	}
	//
	/*var chartType = $("#changeChart option:selected").val();
	if(chartType == "columnMotion" || chartType == "columnBubble"){
		$("#chartHolder").sliderPlay();
	}*/
}

/*
 * chart layout
 */
function getChartLayout(){
	
	var chartFontSize = 17;
	
	// chart cnt 최대/최소 값
	var cntMax = jQuery.inArray(Math.max.apply(null,chartCntArr),chartCntArr);
	var cntMin = jQuery.inArray(Math.min.apply(null,chartCntArr),chartCntArr);
	console.log(cntMax,cntMin);
	
	//chart scroll	
	/*
	Scroll_Area_2D차트를 생성시엔 horizontalAxisRenderers에 ScrollableAxisRenderer를 정의해야 합니다
	 visibleItemSize : 스크롤 차트가 한번에 표시할 데이터의 개수입니다
	 labelRotation 수치라벨을 기울입니다.
	 */
	var chartScroll = ""; 
	if (chartData.length > 5 && chartData.length < 32) {
		chartScroll+='<ScrollableAxisRenderer axis="{hAxis}" labelRotation="45" fontWeight="bold" fontSize="'+chartFontSize+'" visibleItemSize="'+chartData.length+'"/>'
	}else if(chartData.length > 31){
		chartScroll+='<ScrollableAxisRenderer axis="{hAxis}" labelRotation="45" fontWeight="bold" fontSize="'+chartFontSize+'" visibleItemSize="31"/>'
	}else {
		chartScroll+='<ScrollableAxisRenderer axis="{hAxis}" labelRotation="45" fontWeight="bold" fontSize="'+chartFontSize+'"/>'
	}
	
	var line =
		'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
			+'<Options>'
				+'<SubCaption text="(단위 : 건)" textAlign="right" color="black" fontSize="15"/>'
			+'</Options>'
			+'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>' //숫자포맷(1000단위 콤마)
				+'<Area2DChart showDataTips="true" gutterRight="10" dataTipDisplayMode="axis" fontWeight="bold">'
			/*
			Scroll_Area_2D 차트 생성시에 필요한 Area2DChart 정의합니다
			 showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다
			 */
					+'<verticalAxis>'
						+'<LinearAxis id="vAxis" interval="300" formatter="{numfmt}" minimum="" />'
					+'</verticalAxis>'
					+'<verticalAxisRenderers>'
						+'<Axis2DRenderer axis="{vAxis}" fontSize="'+chartFontSize+'"/>' //Y축
					+'</verticalAxisRenderers>'
					 +'<series>'
					// showValueLabels : 특정 수치만 보이도록
					 if($("#checkAll").is(":checked")){
						 line += '<Area2DSeries yField="CNT" displayName="지표" labelPosition="up" styleName="seriesStyle">'
					 }else if($("#checkMinMax").is(":checked") && !$("#checkAll").is(":checked")){
						 line += '<Area2DSeries yField="CNT" displayName="지표" labelPosition="up" styleName="seriesStyle" showValueLabels="['+cntMin+','+cntMax+']">' //styleName : 컬럼 내부 데이터 스타일 지정
					 }else{
						 line += '<Area2DSeries yField="CNT" displayName="지표" labelPosition="up" styleName="seriesStyle" showValueLabels="[]">' //styleName : 컬럼 내부 데이터 스타일 지정
					 }
	
					 	line += '<areaFill>'
								+'<SolidColor color="'+lineChartColor+'" alpha="0.15"/>'
							+'</areaFill>'
							+'<areaStroke>'
								+'<Stroke color="'+lineChartColor+'" weight="1"/>'
							+'</areaStroke>'
						+'</Area2DSeries>'
						 /* Scroll_Area_2D차트를 생성 할 Area2DChart 정의 후 Area2DSeries를 정의합니다  */
					+'</series>'
					+'<horizontalAxis>'
						+'<CategoryLinearAxis id="hAxis" padding="0.2" categoryField="MONTH" />'
						 /* Scroll_Area_2D차트를 생성시엔 HorizontalAxis에 CategoryLinearAxis를 정의해야합니다 */
					 +'</horizontalAxis>'
					+'<horizontalAxisRenderers>'
						//scroll area
						+chartScroll
							/*
							Scroll_Area_2D차트를 생성시엔 horizontalAxisRenderers에 ScrollableAxisRenderer를 정의해야 합니다
							 visibleItemSize : 스크롤 차트가 한번에 표시할 데이터의 개수입니다
							 labelRotation 수치라벨을 기울입니다.
							 */
					+'</horizontalAxisRenderers>'
				+'</Area2DChart>'
				+'<Style>'
					+'.seriesStyle{fontSize:'+chartFontSize+';color:#000;}'
				+'</Style>'
		+'</rMateChart>';
	
	var columnMotion =
		'<rMateChart backgroundColor="0xFFFFFF" borderStyle="none" paddingTop="14">'
			+'<Options>'
				+'<SubCaption text="(단위 : 건)" textAlign="right" color="black" fontSize="15"/>'
			+'</Options>'
			+'<NumberFormatter id="numFmt" precision="0" useThousandsSeparator="true"/>'
		  /*
			  MotionChart 생성시 사용되어질 MotionChart를 설정하도록 합니다.
			duration : MotionChart내에 설정된 데이터들의 총 출력시간 입니다. 기본 값 : NaN
						기본 값이 NaN 이며 duration을 설정하지 않을 경우 elementOffset의 시간과
							차트에 설정된 데이터 갯수를 가지고 데이터들을 출력하게 됩니다.
						 만약 duration을 설정할 경우 elementOffset 값은 무시됩니다.
			 elementOffset : 차트 아이템 하나가 현재 데이터에서 다음 데이터를 출력하기까지의 시간입니다.
	 
			  - MotionColumnSeries -
			  type : Column의 출력 형태를 설정합니다. 유효 값 clustered, overlaid, stacked, 100%
	 
				- MotionBubbleSeries -
			  maxRadius : Bubble의 최대 radius 크기 입니다.
			minRadius : Bubble의 최소 radius 크기 입니다.
		*/
			+'<MotionChart showDataTips="true" duration="100" fontWeight="bold" fontSize="'+chartFontSize+'">'
				+'<horizontalAxis>'
					//+'<CategoryAxis categoryField="MONTH"/>'
					+'<CategoryLinearAxis id="hAxis" categoryField="MONTH" />'
				+'</horizontalAxis>'
				+'<horizontalAxisRenderers>'
				//scroll area
				+chartScroll
				+'</horizontalAxisRenderers>'
				+'<verticalAxis>'
					 +'<LinearAxis id="vAxis" interval="300" formatter="{numFmt}"/>'
				+'</verticalAxis>'
				+'<verticalAxisRenderers>'
					+'<Axis2DRenderer axis="{vAxis}" fontSize="'+chartFontSize+'"/>'
				+'</verticalAxisRenderers>'
				+'<series>'
					/*
						  MotionChart에서 사용되어질 MotionColumnSeries를 설정하도록 합니다.
						  showTrailItems : 출력했었던 아이템들을 계속 나타낼지 설정합니다. 유효 값 true | false
					*/
					if($("#checkAll").is(":checked")){
						columnMotion += '<MotionColumnSeries labelPosition="outside" displayName="지표" yField="CNT" formatter="{numFmt}" showTrailItems="true" color="black" labelAlign="top" insideLabelYOffset="10" styleName="seriesStyle">'
					}else if($("#checkMinMax").is(":checked") && !$("#checkAll").is(":checked")){
						columnMotion += '<MotionColumnSeries labelPosition="outside" displayName="지표" yField="CNT" formatter="{numFmt}" showTrailItems="true" color="black" labelAlign="top" insideLabelYOffset="10" styleName="seriesStyle" showValueLabels="['+cntMin+','+cntMax+']">'
					}else{
						columnMotion += '<MotionColumnSeries labelPosition="outside" displayName="지표" yField="CNT" formatter="{numFmt}" showTrailItems="true" color="black" labelAlign="top" insideLabelYOffset="10" styleName="seriesStyle" showValueLabels="[]">'
					}
						columnMotion += '<fill>'
							+'<SolidColor color="'+lineChartColor+'"/>'
						+'</fill>'
					+'</MotionColumnSeries>'
				+'</series>'
			+'</MotionChart>'
			+'<Style>'
			+'.seriesStyle{fontSize:'+chartFontSize+';color:#000;}'
			+'</Style>'
		+'</rMateChart>';
	
		var columnBubble =
			'<rMateChart backgroundColor="0xFFFFFF" borderStyle="none" paddingTop="14">'
				+'<Options>'
					+'<SubCaption text="(단위 : %)" textAlign="right" color="black" fontSize="15"/>'
				+'</Options>'
				+'<NumberFormatter id="numFmt" precision="0" useThousandsSeparator="true"/>'
//				+'<CurrencyFormatter id="numFmtCur" currencySymbol="%" alignSymbol="right"/>'
				/*
				  MotionChart 생성시 사용되어질 MotionChart를 설정하도록 합니다.
					duration : MotionChart내에 설정된 데이터들의 총 출력시간 입니다. 기본 값 : NaN
								기본 값이 NaN 이며 duration을 설정하지 않을 경우 elementOffset의 시간과
								차트에 설정된 데이터 갯수를 가지고 데이터들을 출력하게 됩니다.
							 만약 duration을 설정할 경우 elementOffset 값은 무시됩니다.
				 elementOffset : 차트 아이템 하나가 현재 데이터에서 다음 데이터를 출력하기까지의 시간입니다.
		 
				  - MotionColumnSeries -
				  type : Column의 출력 형태를 설정합니다. 유효 값 clustered, overlaid, stacked, 100%
		 
					- MotionBubbleSeries -
				  maxRadius : Bubble의 최대 radius 크기 입니다.
					minRadius : Bubble의 최소 radius 크기 입니다.
				*/
//				+'<MotionChart showDataTips="true" duration="100" minRadius ="15" fontWeight="bold" fontSize="'+chartFontSize+'" dataTipJsFunction="dataTipFunc">'
				+'<MotionChart showDataTips="true" duration="100" minRadius ="15" fontWeight="bold" fontSize="'+chartFontSize+'" >'
					+'<horizontalAxis>'
						//+'<CategoryAxis categoryField="MONTH"/>'
						+'<CategoryLinearAxis id="hAxis" categoryField="MONTH" formatter="{numFmt}"/>'
					+'</horizontalAxis>'
					+'<horizontalAxisRenderers>'
					//scroll area
					+chartScroll
					+'</horizontalAxisRenderers>'
					+'<verticalAxis>'
						 +'<LinearAxis id="vAxis" interval="300" formatter="{numFmt}"/>'
					+'</verticalAxis>'
					+'<verticalAxisRenderers>'
						+'<Axis2DRenderer axis="{vAxis}" fontSize="'+chartFontSize+'"/>'
					+'</verticalAxisRenderers>'
					+'<series>'
							/*
							  MotionChart에서 사용되어질 MotionBubbleSeries를 설정하도록 합니다.
							  showTrailItems : 출력했었던 아이템들을 계속 나타낼지 설정합니다. 유효 값 true | false
							*/
//						+'<MotionBubbleSeries labelPosition="inside" yField="CNT" radiusField="RATIO" values="CNT" displayName="지표" formatter="{numFmtCur}" showTrailItems="true" alwayShowLabels="true" color="#000" fontSize="'+chartFontSize+'" insideLabelYOffset="-2">'
						
						if($("#checkAll").is(":checked")){
							columnBubble += '<MotionBubbleSeries labelPosition="inside" yField="CNT" radiusField="RATIO" values="CNT" displayName="지표" showTrailItems="true" alwayShowLabels="true" color="#000" fontSize="'+chartFontSize+'" insideLabelYOffset="-2">'
						}else{
							columnBubble += '<MotionBubbleSeries yField="CNT" radiusField="RATIO" values="CNT" displayName="지표" showTrailItems="true" alwayShowLabels="true" color="#000" fontSize="'+chartFontSize+'" insideLabelYOffset="-2">'
						}
						
							columnBubble += '<fill>'
								+'<RadialGradient focalPointRatio="0.4" angle="235">'
									+'<entries>'
										+'<GradientEntry ratio="0" color="'+lineChartColor+'"/>'
										+'<GradientEntry ratio="0.4" alpha="0.7" color="'+lineChartColor+'"/>'
										+'<GradientEntry ratio="1" color="'+lineChartColor+'"/>'
									+'</entries>'
								+'</RadialGradient>'
							+'</fill>'
							+'<stroke>'
								+'<Stroke color="'+lineChartColor+'" alpha="1"/>'
							+'</stroke>'
						+'</MotionBubbleSeries>'
					+'</series>'
				+'</MotionChart>'
		+'</rMateChart>';
	
	var columnLine =
		'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
			+'<NumberFormatter id="numFmt" precision="0" useThousandsSeparator="true"/>'
			+'<Options>'
				+'<SubCaption text="(단위 : 건)" textAlign="right" color="black" fontSize="15"/>'
			+'</Options>'
			+'<HistoryChart fontWeight="bold" fontSize="'+chartFontSize+'">'
			/*
			 History 차트 생성시에 필요한 HistoryChart 정의합니다
			 History 차트는 디스플레이어(Displayer), 네비게이터(Navigator), 셀렉터(Selector)로 구성되어 있습니다
			*/
				+'<displayerChart>'
				/*
				  디스플레이어 3D (Displayer3D) - 3D 디스플레이어 차트를 생성합니다.
				  디스플레이어 차트는 사용자가 선택된 영역이 표시되는 차트 입니다. 실제로 사용자가 보고자 하는 부분의 데이터를 표시합니다
				  */
					+'<Displayer3D showDataTips="true" width="100%" height="100%">'
						+'<horizontalAxis>'
							+'<CategoryAxis id="mainHAxis" categoryField="MONTH" padding="0.5"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis id="vAxis" formatter="{numFmt}"/>'
						+'</verticalAxis>'
						+'<verticalAxisRenderers>'
							+'<Axis2DRenderer axis="{vAxis}" fontSize="'+chartFontSize+'"/>'
						+'</verticalAxisRenderers>'
						+'<horizontalAxisRenderers>'
							//+chartScroll
							+'<Axis3DRenderer axis="{mainHAxis}" labelRotation="45" fontWeight="bold" fontSize="'+chartFontSize+'" canDropLabels="true" tickPlacement="none">'
								+'<axisStroke>'
									+'<Stroke color="#f4f4f4"/>'
								+'</axisStroke>'
							+'</Axis3DRenderer>'
						+'</horizontalAxisRenderers>'
						+'<series>'
						
						if($("#checkAll").is(":checked")){
							columnLine += '<Column3DSeries yField="CNT" maxColumnWidth="20" displayName="지표" columnWidthRatio="0.42" labelPosition="outside">'
						}else if($("#checkMinMax").is(":checked") && !$("#checkAll").is(":checked")){
							columnLine += '<Column3DSeries yField="CNT" maxColumnWidth="20" displayName="지표" columnWidthRatio="0.42" labelPosition="outside" showValueLabels="['+cntMin+','+cntMax+']">'
						}else{
							columnLine += '<Column3DSeries yField="CNT" maxColumnWidth="20" displayName="지표" columnWidthRatio="0.42">'
						}
							columnLine += '<fill>'
									 +'<SolidColor color="'+lineChartColor+'"/>'
								+'</fill>'
								+'<showDataEffect>'
									+'<SeriesInterpolate duration="1000" elementOffset="0"/>'
								+'</showDataEffect>'
							+'</Column3DSeries>'
							+'<Line2DSeries yField="CNT" displayName="지표" itemRenderer="CircleItemRenderer">'
								+'<lineStroke>'
									+'<Stroke color="'+lineChartColor+'" weight="3"/>'
								+'</lineStroke>'
								+'<showDataEffect>'
									+'<SeriesInterpolate duration="1000" elementOffset="0"/>'
								 +'</showDataEffect>'
							+'</Line2DSeries>'
							+'</series>'
					+'</Displayer3D>'
				+'</displayerChart>'
				+'<navigator>'
					/*
				  네비게이터(Navigator)
					네비게이터는 전체 데이터를 표현하여 데이터의 흐름을 전체적으로 볼 수 잇습니다
				  */
					+'<Navigator width="100%" height="80" gutterLeft="0" gutterBottom="0" gutterRight="0" paddingLeft="30" paddingRight="10">'
							/* 수평 축 정의  */
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="MONTH" id="naviHAxis" padding="0"/>'
						+'</horizontalAxis>'
						+'<horizontalAxisRenderers>'
							+'<Axis2DRenderer axis="{naviHAxis}" visible="false" showLabels="false"/>'
						+'</horizontalAxisRenderers>'
						 /* 수직 축 정의  */
						+'<verticalAxis>'
							+'<LinearAxis id="vAxis"/>'
						+'</verticalAxis>'
						+'<verticalAxisRenderers>'
							+'<Axis2DRenderer axis="{vAxis}" visible="false"/>'
						+'</verticalAxisRenderers>'
						/* 배경 정의 */
						+'<backgroundElements>'
							+'<GridLines direction="horizontal"/>'
							+'</backgroundElements>'
						+'<series>'
							+'<Area2DSeries yField="CNT">'
									+'<areaStroke>'
										+'<Stroke color="'+lineChartColor+'" weight="1"/>'
									+'</areaStroke>'
							+'</Area2DSeries>'
							/* 네비게이터(Navigator)차트로 Area2DSeries를 정의 하였습니다 */
						+'</series>'
					+'</Navigator>'
				+'</navigator>'
				+'<selector>'
					 /*
						  셀렉터(Selector)
						셀렉터는 네비게이터에서 사용자가 틀정 영역을 선택하게끔 하는 역할을 합니다
						셀렉터에서 선택된 영역이 디스플레이어(Displayer)차트에 표현 됩니다
						시작 시 보여지는 차트는 총 데이터의 약 30%이며 센터 영역입니다.
 
						  liveDragging 속성 : 드래그로 셀렉터 이동 시 적용할지 여부를 나타냅니다.(기본값 : true)
						 퍼포먼스가 좋지 않은 경우 false 를 권장합니다.
						*/
					+'<HistoryRangeSelector width="100%" startingRange="center" visibleItemSize="10" liveDragging="false"/>'
					  /*
					  startingRange - center, left, right : 히스토리 차트가 처음 로딩 시 표시할 데이터 영역
					visibleItemSize : 처음 로딩 시 디스플레이어 차트가 표시할 데이터의 양을 나타냅니다 양은 전체 데이터의 퍼센티지 수치입니다. 유효값 1~100
					 */
				+'</selector>'
			+'</HistoryChart>'
		+'</rMateChart>';
	
		var chartType = $("#changeChart option:selected").val();
		if(chartType == "line"){
			return line;
		}else if(chartType == "columnMotion"){
			return columnMotion;
		}else if(chartType == "columnBubble"){
			return columnBubble;
		}else if(chartType == "columnLine"){
			return columnLine;
		}
}


/*
 * Bubble Motion Trails Chart Tooltip
 */
function dataTipFunc(seriesId, seriesName, index, xName, yName, data, values)
{
	return "<table cellpadding='0' cellspacing='1'>"
		+"<tr>"
			+"<td align='left'>" + values[0] + "</td>"
		+"</tr><tr>"
			+"<td align='left'>지표 : <b>" + numberFormat(values[1]) + "</b></td>"
		+"</tr></table>";
}

//param : pStartDate - 시작일(YYYYMMDD)
//param : pEndDate  - 마지막일(YYYYMMDD)
//param : pType		- 'D':일수, 'M':개월수
//Update. 2014.11.07. 변수명 변경 : strGapDT->strTermCnt
//Update. 2014.11.07. 개월수 계산 시 년도가 다른 경우 부정확성 보완 : floor->round AND 365.25->365
function fn_calcDayMonthCount(pStartDate, pEndDate, pType) {
	var strSDT = new Date(pStartDate.substring(0,4),pStartDate.substring(4,6)-1,pStartDate.substring(6,8));
	var strEDT = new Date(pEndDate.substring(0,4),pEndDate.substring(4,6)-1,pEndDate.substring(6,8));
	var strTermCnt = 0;
	
	if(pType == 'D') {	//일수 차이
		strTermCnt = (strEDT.getTime()-strSDT.getTime())/(1000*60*60*24);
	} else {			//개월수 차이
		//년도가 같으면 단순히 월을 마이너스 한다.
		// => 20090301-20090201 의 경우(윤달이 있는 경우) 아래 else의 로직으로는 정상적인 1이 리턴되지 않는다.
		if(pEndDate.substring(0,4) == pStartDate.substring(0,4)) {
			strTermCnt = pEndDate.substring(4,6) * 1 - pStartDate.substring(4,6) * 1;
		} else {
			//strTermCnt = Math.floor((strEDT.getTime()-strSDT.getTime())/(1000*60*60*24*365.25/12));
			strTermCnt = Math.round((strEDT.getTime()-strSDT.getTime())/(1000*60*60*24*365/12));
		}
	}
	//console.log("계산값 : "+ strTermCnt);
	return strTermCnt;
}

function prevDate(){
	g_tbbsStrtDt = $("#tfKeywordStrtDt").val(getDate().substr(0, 8) + "01");
	g_tbbsEndDt = $("#tfKeywordEndDt").val(getDate());
	
	//날짜 차이 체크
	if ($("#optTerm").val() == "month") {
		//시작월
		var startYear = $("#schMonthStart").val().substring( 0, 4 );
		var startMonth = $("#schMonthStart").val().substring( 5, 7 );
		
		//종료월
		var endYear = $("#schMonthEnd").val().substring( 0, 4 );
		var endMonth = $("#schMonthEnd").val().substring( 5, 7 );
		
		//날짜 계산
		var calcMonth = fn_calcDayMonthCount(startYear+startMonth+"01", endYear+endMonth+"01", 'M'); 
		
		if(calcMonth >=12 ){
			
			var expireMonth = new Date(startYear, startMonth, "01");
			var expireMonthTextYear = "";
			var expireMonthTextMonth = "";
			
			//12개월 제한
			expireMonth.setMonth(expireMonth.getMonth()+11); 
			
			expireMonthTextYear = expireMonth.getFullYear();
			if(expireMonth.getMonth() < 10){
				expireMonthTextMonth = "0"+expireMonth.getMonth();
			}else{
				expireMonthTextMonth = expireMonth.getMonth();
			}
			
			alert("12개월 이후는 검색하실 수 없습니다. \n "+expireMonthTextYear+"-"+expireMonthTextMonth+" 이후로는 검색하실 수 없습니다.");
			$("#schMonthEnd").val(expireMonthTextYear+"-"+expireMonthTextMonth);
			return;
		}
		
	} else {
		//시작일
		var startYear = $("#schDayStart").val().substring( 0, 4 );
		var startMonth = $("#schDayStart").val().substring( 5, 7 );
		var startDay = $("#schDayStart").val().substring( 8, 10 );
		
		//종료일
		var endYear = $("#schDayEnd").val().substring( 0, 4 );
		var endMonth = $("#schDayEnd").val().substring( 5, 7 );
		var endDay = $("#schDayEnd").val().substring( 8, 10 );
		
		//날짜 계산
		var calcDay = fn_calcDayMonthCount(startYear+startMonth+startDay, endYear+endMonth+endDay, 'D');
		
		if(calcDay > 62){
			
			var expireDay = new Date(startYear, startMonth, startDay);
			var expireDayText = "";
			var expireDayTextYear = "";
			var expireDayTextMonth = "";
			var expireDayTextDate = "";
			
			//62일 제한
			expireDay.setDate(expireDay.getDate()+62);
			
			expireDayTextYear = expireDay.getFullYear();
			if(expireDay.getMonth() < 10){
				expireDayTextMonth = "0"+expireDay.getMonth();
			}else{
				expireDayTextMonth = expireDay.getMonth();
			}
			if(expireDay.getDate() < 10){
				expireDayTextDate = "0"+expireDay.getDate();
			}else{
				expireDayTextDate = expireDay.getDate();
			}
			
			alert("62일 이상은 검색하실 수 없습니다. \n "+expireDayTextYear+"-"+expireDayTextMonth+"-"+expireDayTextDate+" 이후로는 검색하실 수 없습니다.");
			$("#schDayEnd").val(expireDayTextYear+"-"+expireDayTextMonth+"-"+expireDayTextDate);
			return;
		}
		
	}
}