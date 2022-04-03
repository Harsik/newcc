var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if(currentMonth < 10)
	currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;


// 그리드 설정 정보
var gColNames = [];
var gColModel = [];
var gGroupHeaders = [];

//엑셀 정보
var gColName = [];
var gColWidth = [];
var gColAlign = [];
var gGroupHeader = [];
var gColHeader = [];


// 관리자 여부
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");



//파라미터 셋팅_getJsonStsCounselingCntIVR
function getJsonStsCounselingCntIVR() {
	
	var termType = $("#cslCntIvr_optTerm").val();
	var schStartDt = "";
	var schEndDt = "";
	
	if(termType == "year") {
		schStartDt = $("#cslCntIvr_schYearStart").val();
		schEndDt = $("#cslCntIvr_schYearEnd").val();
	}
	else if(termType == "month") {	
		schStartDt = $('#cslCntIvr_schMonthStart').val();
		schEndDt = $('#cslCntIvr_schMonthEnd').val();
		
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("13개월 이상 검색할 수 없습니다.");
//			return false;
//		}
		
	}
	else if(termType == "day") {		
		schStartDt = $("#cslCntIvr_schDayStart").val();
		schEndDt = $("#cslCntIvr_schDayEnd").val();
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("31일 이상 검색할 수 없습니다.");
//			return false;
//		}
		
	}
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMjAuc3RzQ291bnNlbGluZ0NudElWUg==",//st020.stsCounselingCntIVR
			"map" : {
				"key" : "value" ,
				"optTerm" : $("#cslCntIvr_optTerm").val(), // year, month, day
				"schStartDt" : schStartDt.replace(/-/g, ""),
				"schEndDt" :schEndDt.replace(/-/g, "")
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅_getJsonStsCounselingCntIVRExcel
function getJsonStsCounselingCntIVRExcel() {
	
	var termType = $("#cslCntIvr_optTerm").val();
	var schStartDt = "";
	var schEndDt = "";
	var titleType=""
	
	if(termType == "year") {		
		schStartDt = $("#cslCntIvr_schYearStart").val();
		schEndDt = $("#cslCntIvr_schYearEnd").val();
		titleType = "운영지표별_상담현황_년도별";
	}
	else if(termType == "month") {	
		schStartDt = $('#cslCntIvr_schMonthStart').val();
		schEndDt = $('#cslCntIvr_schMonthEnd').val();
		
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("13개월 이상 검색할 수 없습니다.");
//			return false;
//		}
		titleType = "운영지표별_상담현황_월별";
	}
	else if(termType == "day") {		
		schStartDt = $("#cslCntIvr_schDayStart").val();
		schEndDt = $("#cslCntIvr_schDayEnd").val();
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("31일 이상 검색할 수 없습니다.");
//			return false;
//		}
		titleType = "운영지표별_상담현황_일별";
		
	}
	titleType = titleType + setDownLoadName(schStartDt, schEndDt);
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMjAuc3RzQ291bnNlbGluZ0NudElWUg==",//st020.stsCounselingCntIVR
			"map" : {
				"key" : "value" ,				
				"optTerm" : $("#cslCntIvr_optTerm").val(), // year, month, day
				"schStartDt" : schStartDt.replace(/-/g, ""),
				"schEndDt" :schEndDt.replace(/-/g, ""),		
				"sidx" : $("#cslCntIvr_tblStsCounselingCntIVR").getGridParam("sortname"),
				"sord" : $("#cslCntIvr_tblStsCounselingCntIVR").getGridParam("sortorder"),
				
				"title" : titleType,
				"colWidth" :gColWidth,
				"colName" : gColName,				
				"colAlign" :gColAlign,				
		        "colHeader1" : gGroupHeader,
			    "colHeader3" : gColHeader
				
			}
	};	
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
	
}




// 초기화 함수
function init(){
	
	$("#cslCntIvr_optTerm").val("day");
	
	// 조회조건 기간 체인지 이벤트 등록
	changeTerm();
	

	// 그리드
	stsIVRSearch();
}


//기간 셀렉트 박스별 상세 검색
function changeTerm() {
	
	var termType = $("#cslCntIvr_optTerm").val();
	
	if(termType == "year") {
		$("#cslCntIvr_dvYear").show();
		$("#cslCntIvr_dvMonth").hide();
		$("#cslCntIvr_dvDay").hide();
		

		$("#cslCntIvr_schYearStart").val(currentYear);
		$("#cslCntIvr_schYearEnd").val(currentYear);
	}
	else if(termType == "month") {	
		$("#cslCntIvr_dvYear").hide();
		$("#cslCntIvr_dvMonth").show();
		$("#cslCntIvr_dvDay").hide();
			    
		$('#cslCntIvr_schMonthStart').val( currentYM );
		$('#cslCntIvr_schMonthEnd').val( currentYM );		
	}
	else if(termType == "day") {	
		$("#cslCntIvr_dvYear").hide();
		$("#cslCntIvr_dvMonth").hide();
		$("#cslCntIvr_dvDay").show();
		
		$("#cslCntIvr_schDayStart").val(getDate1());
		$("#cslCntIvr_schDayEnd").val(getDate());
	}
}


// 엑셀다운 버튼 클릭 이벤트
function stsIVRExelDown() {
	setGrid();
	param = getJsonStsCounselingCntIVRExcel();
	url = getContextPath() + "/excel/mprows/mpRowsExcelDown.do";	
	excelDownLoad(url, param);
    
}


function setGrid(){
	
	// 그리드 설정 정보
	gColNames = [];
	gColModel = [];
	gGroupHeaders = [];

	//엑셀 정보	
	gColName = [];
	gColWidth = [];
	gColAlign = [];
	gGroupHeader = [];
	gColHeader = [];
	
	var positionS=0;
	
	gColNames.push("날짜", "구분", "총처리호<br/>(E+F)");
	gColModel.push(
				{"name" : "TASK_DT", width : 80, align : "center", sortable : false, hidden:false}, 
				{"name" : "GB", width : 50, align : "center", sortable : false, hidden:true},				
				{"name" : "EF", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}
	);
	
	
	gColName.push( "GB");
	gColWidth.push(5);
	gColAlign.push("center");
	
	positionS = positionS + 1;
	gColHeader.push("구분, C, 0, 2");
	
	gColName.push( "EF");
	gColWidth.push(10);
	gColAlign.push("right");
	
	positionS = positionS + 1;
	gColHeader.push("총처리호\n(E+f), C, 0, 2");	
		
	gColNames.push("인입호<br/>(A)", "응대호<br/>(B)","포기호","응대율<br/>(B/A)");
		
	gColModel.push(
			{"name" : "A", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
			{"name" : "B", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
			{"name" : "IVR_ABND", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
			{"name" : "BA", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'avg'}
	);
	gGroupHeaders.push({startColumnName: "A", numberOfColumns : 4, titleText : "IVR"});

	gColNames.push("인입호<br/>(D)", "응대호<br/>(E)","포기호","응대율<br/>(E/D)");
	
	gColModel.push(
			{"name" : "D", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
			{"name" : "E", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
			{"name" : "IN_ABND", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
			{"name" : "ED", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'avg'}
	);
	gGroupHeaders.push({startColumnName: "D", numberOfColumns : 4, titleText : "IB(IN BOUND)"});
		
	gColName.push( "A", "B", "IVR_ABND", "BA");
	gColWidth.push(10, 10, 10, 10);
	gColAlign.push("right", "right","right", "right");

	gGroupHeader.push("IVR, R," + positionS +", 4");		
	positionS = positionS + 4;
	gColHeader.push("인입호\n(A), C, 1, 1","응대호\n(E), C, 1, 1","포기호, C, 1, 1","응대율\n(E/D), C, 1, 1");

	gColName.push( "D", "E", "IN_ABND", "ED");
	gColWidth.push(10, 10,10, 10);
	gColAlign.push("right", "right","right", "right");
	gGroupHeader.push("IB(IN BOUND), R," + positionS +", 4");		
	positionS = positionS + 4;
	gColHeader.push("인입호\n(D), C, 1, 1","응대호\n(E), C, 1, 1","포기호, C, 1, 1","응대율\n(E/D), C, 1, 1");
	
	gColNames.push("OB<br/>성공호<br/> (F)", "콜백서비스", "문자서비스");
	gColModel.push(
				{"name" : "F", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
				{"name" : "CALLBACK", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},		
				{"name" : "SMS", width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}
	);		
	

	
	gColName.push( "F", "CALLBACK", "SMS");
	gColWidth.push(10, 10, 10);
	gColAlign.push("right", "right","right");


	gColHeader.push("OB성공호\n(F), C, 0, 2","콜백서비스, C, 0, 2","문자서비스, C, 0, 2");
}
	

//조회 버튼 클릭 이벤트 
function stsIVRSearch(){
	setGrid();
	grid(getJsonStsCounselingCntIVR(), gColNames, gColModel, gGroupHeaders);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
	$("#cslCntIvr_dvGridArea").empty();
	var tb = "<table id = 'cslCntIvr_tblStsCounselingCntIVR'></table>"; 
	$("#cslCntIvr_dvGridArea").append(tb);
	
	$("#cslCntIvr_tblStsCounselingCntIVR").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/counselingCntIVR.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : jsonValue
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : colNamesValue,
		colModel : colModelValue,
		sortname : "TASK_DT",
		sortorder : "ASC",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "660",
	   	width : "100%",	   	
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	rowNum : "10000",
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	//footerrow	 : true,
	   	//userDataOnFooter : true,
	   	loadComplete: function() {
	   		
            var ids = $("#cslCntIvr_tblStsCounselingCntIVR").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#cslCntIvr_tblStsCounselingCntIVR").getRowData(rowId) ;
            	if(rowData.GB =="합계"){
            		$("#cslCntIvr_tblStsCounselingCntIVR").setRowData( rowId ,false,{background:"#EAEAEA"});
            	}
            	
            	 
           }) ;
           
    
       },
       
	}).jqGrid('setGroupHeaders', 
	{
	  useColSpanStyle : true, 
	  groupHeaders : groupHeadersValue
	}).jqGrid('setFrozenColumns');
	
	 
}


$(document).ready(function(){
	
	var isMngr= false;
	switch(usr_grd_cd) {
      case '020100'://파트매니저
      case '030100'://그룹매니저
      case '050100'://센터장
      case '060100'://통합센터장
      case '090100'://시스템관리자
         isMngr = true;
         break;
      default:
         isMngr = false;
         break;
	}

	if(isMngr){
		$("#btnStsIVRExelDown").show();
	}else{
		$("#btnStsIVRExelDown").hide();
	}

	
	var selectBox = "";	
	for(var i = currentYear; i >= currentYear-10; i--)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	
	$("#cslCntIvr_schYearStart").html(selectBox);
	$("#cslCntIvr_schYearEnd").html(selectBox);
	
	$("#cslCntIvr_schMonthStart").MonthPicker({
		MaxMonth: 0
    });
	
	$("#cslCntIvr_schMonthEnd").MonthPicker({
		MaxMonth: 0
    });
	
	
	
//	$("#cslCntIvr_schDayStart").bind("change",  function () {
//		$( "#cslCntIvr_schDayEnd" ).datepicker( "option", "minDate", $("#cslCntIvr_schDayStart").val() );
//		var toDay = new Date(getDate());
//		var maxDay = new Date(getAddDate($("#cslCntIvr_schDayStart").val(), 31));
//		
//		if((toDay.getTime() - maxDay.getTime()) < 0){
//			// 현재 날짜가 작은경우
//			$( "#cslCntIvr_schDayEnd" ).datepicker( "option", "maxDate",getDate());
//		}else{
//			$( "#cslCntIvr_schDayEnd" ).datepicker( "option", "maxDate", getAddDate($("#cslCntIvr_schDayStart").val(), 31) );
//		}
//		$( "#cslCntIvr_schDayStart" ).datepicker( "option", "maxDate",getDate());			
//
//		$(".ui-datepicker-trigger").css("vertical-align","middle");
//	});
	
	$("#cslCntIvr_schDayEnd").bind("change",  function () {
		//$( "#cslCntIvr_schDayStart" ).datepicker( "option", "minDate", getAddDate($("#cslCntIvr_schDayEnd").val(), -31) );
		//$( "#cslCntIvr_schDayStart" ).datepicker( "option", "maxDate", $("#cslCntIvr_schDayEnd").val() );
		$( "#cslCntIvr_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntIvr_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
		
	});
	
	
	datePicker("#cslCntIvr_schDayStart");
	datePicker("#cslCntIvr_schDayEnd");	
	

	// 초기화
	init();	
	

	

	// 기간 조회조건 change 이벤트
	$("#cslCntIvr_optTerm").bind("change", changeTerm);		
		
	// 초기화 버튼 클릭 이벤트 등록
	$("#cslCntIvr_btnStsIVRInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntIvr_btnStsIVRSearch").bind("click", stsIVRSearch);
	
	// 엑셀다운 버튼 클릭 이벤트 등록
	$("#cslCntIvr_btnStsIVRExelDown").bind("click", stsIVRExelDown);
});