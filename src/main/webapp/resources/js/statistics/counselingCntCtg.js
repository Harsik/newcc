var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if(currentMonth < 10)
	currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;

var gUserArr = [];
var gUserNmArr = [];
var gCtgCdArr = [];
var gCtgNmArr = [];

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

//파라미터 셋팅 usrList
function getJsonStrUserList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",//om001.selectList
		"map" : {
			"key" : "value",			
			"chkRetire" : $("#cslCntCtg_chkRetire").prop("checked"),	// 퇴사여부	
			"cntr_cd" : "010000",
			"notuse" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//상담유형코드리스트
function getJsonCtgCdList()
{
	/*
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMjIuY3RnQ29kZUxpc3Q=",
		"map" : {
			"key" : "value",
			"ctg_lvl" : "1"
		}
	};
	*/
	
	var termType = $("#cslCntCtg_optTerm").val();
	var schStartDt = "";
	var schEndDt = "";
	
	if(termType == "year") {
		schStartDt = $("#cslCntCtg_schYearStart").val();
		schEndDt = $("#cslCntCtg_schYearEnd").val();
	}
	else if(termType == "month") {	
		schStartDt = $('#cslCntCtg_schMonthStart').val();
		schEndDt = $('#cslCntCtg_schMonthEnd').val();
	}
	else if(termType == "day") {		
		schStartDt = $("#cslCntCtg_schDayStart").val();
		schEndDt = $("#cslCntCtg_schDayEnd").val();
	}
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMjAuc2VsZWN0Q29kZUxpc3Q=",
			"map" : {
				"key" : "value",
				"schStartDt" : schStartDt.replace(/-/g, ""),
				"schEndDt" :schEndDt.replace(/-/g, ""),
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonStsCounselingCntCtg
function getJsonStsCounselingCntCtg() {
	
	var termType = $("#cslCntCtg_optTerm").val();
	var schStartDt = "";
	var schEndDt = "";
	
	if(termType == "year") {
		schStartDt = $("#cslCntCtg_schYearStart").val();
		schEndDt = $("#cslCntCtg_schYearEnd").val();
	}
	else if(termType == "month") {	
		schStartDt = $('#cslCntCtg_schMonthStart').val();
		schEndDt = $('#cslCntCtg_schMonthEnd').val();
		
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("13개월 이상 검색할 수 없습니다.");
//			return false;
//		}
		
	}
	else if(termType == "day") {		
		schStartDt = $("#cslCntCtg_schDayStart").val();
		schEndDt = $("#cslCntCtg_schDayEnd").val();
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("31일 이상 검색할 수 없습니다.");
//			return false;
//		}
		
	}
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudEN0Zw==",//ch001.stsCounselingCntCtg
			"map" : {
				"key" : "value" ,
				"optTerm" : $("#cslCntCtg_optTerm").val(), // year, month, day
				"schStartDt" : schStartDt.replace(/-/g, ""),
				"schEndDt" :schEndDt.replace(/-/g, ""),		
				"chkHoliday" : $("#cslCntCtg_chkHoliday").is(":checked") ? "Y" : "N",
				"gUserArr" : gUserArr,
				"gCtgCdArr" : gCtgCdArr
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅_getJsonStsCounselingCntCtgExcel
function getJsonStsCounselingCntCtgExcel() {
	
	var termType = $("#cslCntCtg_optTerm").val();
	var schStartDt = "";
	var schEndDt = "";
	var titleType=""
	
	if(termType == "year") {		
		schStartDt = $("#cslCntCtg_schYearStart").val();
		schEndDt = $("#cslCntCtg_schYearEnd").val();
		titleType = "상담유형별_상담현황_년도별";
	}
	else if(termType == "month") {	
		schStartDt = $('#cslCntCtg_schMonthStart').val();
		schEndDt = $('#cslCntCtg_schMonthEnd').val();
		
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("13개월 이상 검색할 수 없습니다.");
//			return false;
//		}
		titleType = "상담유형별_상담현황_월별";
	}
	else if(termType == "day") {		
		schStartDt = $("#cslCntCtg_schDayStart").val();
		schEndDt = $("#cslCntCtg_schDayEnd").val();
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("31일 이상 검색할 수 없습니다.");
//			return false;
//		}
		titleType = "상담유형별_상담현황_일별";
		
	}
	titleType = titleType + setDownLoadName(schStartDt, schEndDt);
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudEN0Zw==", //ch001.stsCounselingCntCtg
			"map" : {
				"key" : "value" ,				
				"optTerm" : $("#cslCntCtg_optTerm").val(), // year, month, day
				"schStartDt" : schStartDt.replace(/-/g, ""),
				"schEndDt" :schEndDt.replace(/-/g, ""),		
				"chkHoliday" : $("#cslCntCtg_chkHoliday").is(":checked") ? "Y" : "N",
				"sidx" : $("#cslCntCtg_tblStsCounselingCntCtg").getGridParam("sortname"),
				"sord" : $("#cslCntCtg_tblStsCounselingCntCtg").getGridParam("sortorder"),
				"gUserArr" : gUserArr,
				"gCtgCdArr" : gCtgCdArr,
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

//상담사 셀렉트 박스 구성
function chkRetire(){	
	ulUserListSet();
//	init();
	
	gUserArr = [];
	gUserNmArr = [];	
	
	$("#ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArr.push($(this).val());
		gUserNmArr.push($(this).attr('data'));
	});
	
	$("#cslCntCtg_multiCheckbox").setCheckedCnt();	
}

function ulUserListSet(){
	var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='ulUserList'></ul></dd></dl>";
	$("#cslCntCtg_multiCheckbox").html(dropdownBoxHtml);
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data) {
			
			// param값을 JSON으로 파싱
			var ulUserList = "";
			$.each(data, function(key, state) {
				var tempTxt="";
				if(state.RET_YN != undefined) tempTxt = "("+state.RET_YN+")";
				ulUserList += "<li><input type='checkbox' name='liUser' value='" + state.USR_ID + "' data='" + state.USR_NM + tempTxt + "' /> " + state.USR_NM + "<font color='red'>"+tempTxt + "</font>" + "</li>";
				
			});
			
			$("#ulUserList").html(ulUserList);
			$("#cslCntCtg_multiCheckbox").dropdownMultiCheckbox();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 상담사 전체 선택 이벤트
	$("#ulUserList .allmultichk").on('click', function(e){		
		gUserArr = [];
		gUserNmArr = [];
		var chk = $(this).is(':checked');
		if(chk){
			$("dd input[name='liUser']").each(function(){
				gUserArr.push($(this).val());
				gUserNmArr.push($(this).attr('data'));
			});
		}		
	});
	// 상담사 개별 선택 이벤트
	$("dd input[name='liUser']").on('click',function(e){
		
		var chk = $(this).is(':checked');
		if(chk){
			gUserArr.push($(this).val());
			gUserNmArr.push($(this).attr('data'));
		}else{
			var pos = gUserArr.indexOf($(this).val());
			gUserArr.splice(pos, 1); 
			gUserNmArr.splice(pos, 1); 
		}		
	});	
}

// 초기화 함수
function init(){
	gUserArr = [];
	gUserNmArr = [];	
	
	$("#cslCntCtg_optTerm").val("day");

	$("#ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArr.push($(this).val());
		gUserNmArr.push($(this).attr('data'));
	});
	$("#cslCntCtg_multiCheckbox").setCheckedCnt();	
	//alert(gUserArr.toString());
	
	// 조회조건 기간 체인지 이벤트 등록
	changeTerm();
	

	// 그리드
	stsUsrSearch();
}


//기간 셀렉트 박스별 상세 검색
function changeTerm() {
	
	var termType = $("#cslCntCtg_optTerm").val();
	
	if(termType == "year") {
		$("#cslCntCtg_dvYear").show();
		$("#cslCntCtg_dvMonth").hide();
		$("#cslCntCtg_dvDay").hide();
		

		$("#cslCntCtg_schYearStart").val(currentYear);
		$("#cslCntCtg_schYearEnd").val(currentYear);
	}
	else if(termType == "month") {	
		$("#cslCntCtg_dvYear").hide();
		$("#cslCntCtg_dvMonth").show();
		$("#cslCntCtg_dvDay").hide();
			    
		$('#cslCntCtg_schMonthStart').val( currentYM );
		$('#cslCntCtg_schMonthEnd').val( currentYM );		
	}
	else if(termType == "day") {	
		$("#cslCntCtg_dvYear").hide();
		$("#cslCntCtg_dvMonth").hide();
		$("#cslCntCtg_dvDay").show();
		
		$("#cslCntCtg_schDayStart").val(getDate1());
		$("#cslCntCtg_schDayEnd").val(getDate());
	}
}


// 엑셀다운 버튼 클릭 이벤트
function stsUsrExelDown() {
	setGrid();
	param = getJsonStsCounselingCntCtgExcel();
	url = getContextPath() + "/excel/mprows/mpRowsExcelDown.do";	
	excelDownLoad(url, param);
    
}


function setGrid(){
	
	if(gUserArr.length == 0){
		alert("선택하신 상담사가 없습니다.");
		return false;		
	}
	
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
	
	gCtgCdArr = [];
	gCtgNmArr = [];
		
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/code/codelist.do",
		data : "pJson=" + getJsonCtgCdList(),
		success : function(data) {			
			// param값을 JSON으로 파싱			
			$.each(data, function(key, state) {
				gCtgCdArr.push(state.CTG_CD);
				gCtgNmArr.push(state.CTG_CD_NM);
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});		
	
	
	var positionS=0;
	
	gColNames.push("날짜", "구분");
	gColModel.push(
				{"name" : "RCV_DT", width : 100, align : "center", frozen : true, sortable : false, hidden:true}, 
				{"name" : "GB", width : 50, align : "center", frozen : true, sortable : false, hidden:false}
	);
	
	
	gColName.push( "GB");
	gColWidth.push(5);
	gColAlign.push("center");
	
	positionS = positionS + 1;
	gColHeader.push("구분, C, 0, 2");
	
	for(var i = 0  ; i < gCtgCdArr.length; i++){	
		
		gColNames.push("건수", "비율");
		
		gColModel.push(
				{"name" : "CNT_"+gCtgCdArr[i].toUpperCase(), width : 56, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}, 
				{"name" : "RATE_"+gCtgCdArr[i].toUpperCase(), width : 51, align : "right", sortable : false}
		);
		gGroupHeaders.push({startColumnName: "CNT_"+gCtgCdArr[i].toUpperCase(), numberOfColumns : 2, titleText : gCtgNmArr[i]});
		
		gColName.push( "CNT_"+gCtgCdArr[i], "RATE_"+gCtgCdArr[i]);
		gColWidth.push(8, 7);
		gColAlign.push("right", "right");
		
		gGroupHeader.push(gCtgNmArr[i]+", R," + positionS +", 2");		
		positionS = positionS + 2;
		gColHeader.push("건수, C, 1, 1","비율, C, 1, 1");
	}
		
	gColNames.push("합계");
	gColModel.push(		
			{"name" : "TOT", width : 95, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}
	);
	
	
	gColName.push( "TOT");
	gColWidth.push(7);
	gColAlign.push("right");
	gColHeader.push("합계, C, 0, 2");
	
}

//조회 버튼 클릭 이벤트 
function stsUsrSearch(){
	setGrid();
	grid(getJsonStsCounselingCntCtg(), gColNames, gColModel, gGroupHeaders);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
	$("#cslCntCtg_dvGridArea").empty();
	var tb = "<table id = 'cslCntCtg_tblStsCounselingCntCtg'></table>"; 
	$("#cslCntCtg_dvGridArea").append(tb);
	
	$("#cslCntCtg_tblStsCounselingCntCtg").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/counselingCntCtg.do",
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
		sortname : "RCV_DT",
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
	   		
            var ids = $("#cslCntCtg_tblStsCounselingCntCtg").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#cslCntCtg_tblStsCounselingCntCtg").getRowData(rowId) ;
            	if(rowData.GB =="합계"){
            		$("#cslCntCtg_tblStsCounselingCntCtg").setRowData( rowId ,false,{background:"#EAEAEA"});
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
		$("#cslCntCtg_btnStsActExelDown").show();
	}else{
		$("#cslCntCtg_btnStsActExelDown").hide();
	}

	
	var selectBox = "";	
	for(var i = currentYear; i >= currentYear-10; i--)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	
	$("#cslCntCtg_schYearStart").html(selectBox);
	$("#cslCntCtg_schYearEnd").html(selectBox);
	
	$("#cslCntCtg_schMonthStart").MonthPicker({
		MaxMonth: 0
    });
	
	$("#cslCntCtg_schMonthEnd").MonthPicker({
		MaxMonth: 0
    });

	/* 현황 조회날짜 제한 unlock함, 다른 콜센터 개발 시 lock하려면 밑의 주석과 관련 주석 풀기*/
//	$("#cslCntCtg_schDayStart").bind("change",  function () {
//		$( "#cslCntCtg_schDayEnd" ).datepicker( "option", "minDate", $("#cslCntCtg_schDayStart").val() );
//		var toDay = new Date(getDate());
//		var maxDay = new Date(getAddDate($("#cslCntCtg_schDayStart").val(), 31));
//		
//		if((toDay.getTime() - maxDay.getTime()) < 0){
//			// 현재 날짜가 작은경우
//			$( "#cslCntCtg_schDayEnd" ).datepicker( "option", "maxDate",getDate());
//		}else{
//			$( "#cslCntCtg_schDayEnd" ).datepicker( "option", "maxDate", getAddDate($("#cslCntCtg_schDayStart").val(), 31) );
//		}
//		$( "#cslCntCtg_schDayStart" ).datepicker( "option", "maxDate",getDate());			
//
//		$(".ui-datepicker-trigger").css("vertical-align","middle");
//	});
//	
//	$("#cslCntCtg_schDayEnd").bind("change",  function () {
//		//$( "#cslCntCtg_schDayStart" ).datepicker( "option", "minDate", getAddDate($("#cslCntCtg_schDayEnd").val(), -31) );
//		//$( "#cslCntCtg_schDayStart" ).datepicker( "option", "maxDate", $("#cslCntCtg_schDayEnd").val() );
//		$( "#cslCntCtg_schDayStart" ).datepicker( "option", "maxDate",getDate());
//		$( "#cslCntCtg_schDayEnd" ).datepicker( "option", "maxDate",getDate());
//		$(".ui-datepicker-trigger").css("vertical-align","middle");
//		
//	});

	datePicker("#cslCntCtg_schDayStart");
	datePicker("#cslCntCtg_schDayEnd");	
	
	// 상담사 셀렉트 박스 세팅
	ulUserListSet();
	// 초기화
	init();	

	// 퇴사자포함 체크 클릭 이벤트 등록
	$("#cslCntCtg_chkRetire").on("click", chkRetire);
	

	// 기간 조회조건 change 이벤트
	$("#cslCntCtg_optTerm").bind("change", changeTerm);		
		
	// 초기화 버튼 클릭 이벤트 등록
	$("#cslCntCtg_btnStsActInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntCtg_btnStsActSearch").bind("click", stsUsrSearch);
	
	// 엑셀다운 버튼 클릭 이벤트 등록
	$("#cslCntCtg_btnStsActExelDown").bind("click", stsUsrExelDown);
});