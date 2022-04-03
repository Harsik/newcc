var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if(currentMonth < 10)
	currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;

var gUserArr = [];
var gUserArrNm = [];

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
			"chkRetire" : $("#cslCntUsr_chkRetire").prop("checked"),	// 퇴사여부
			"cntr_cd" : "010000",
			"notuse" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStsCounselingCntUsr
function getJsonStsCounselingCntUsr() {
	
	var termType = $("#cslCntUsr_optTerm").val();
	var schStartDt = "";
	var schEndDt = "";
	
	if(termType == "year") {
		schStartDt = $("#cslCntUsr_schYearStart").val();
		schEndDt = $("#cslCntUsr_schYearEnd").val();
	}
	else if(termType == "month") {	
		schStartDt = $('#cslCntUsr_schMonthStart').val();
		schEndDt = $('#cslCntUsr_schMonthEnd').val();
		
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("13개월 이상 검색할 수 없습니다.");
//			return false;
//		}
		
	}
	else if(termType == "day") {		
		schStartDt = $("#cslCntUsr_schDayStart").val();
		schEndDt = $("#cslCntUsr_schDayEnd").val();
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("31일 이상 검색할 수 없습니다.");
//			return false;
//		}
		
	}
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudFVzcg==",//ch001.stsCounselingCntUsr
			"map" : {
				"key" : "value" ,
				"optTerm" : $("#cslCntUsr_optTerm").val(), // year, month, day
				"schStartDt" : schStartDt.replace(/-/g, ""),
				"schEndDt" :schEndDt.replace(/-/g, ""),		
				"gUserArr" : gUserArr,
				"chkHoliday" : $("#cslCntUsr_chkHoliday").is(":checked") ? "Y" : "N"
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅_getJsonStsCounselingCntUsrExcel
function getJsonStsCounselingCntUsrExcel() {
	
	var termType = $("#cslCntUsr_optTerm").val();
	var schStartDt = "";
	var schEndDt = "";
	var titleType=""
	
	if(termType == "year") {		
		schStartDt = $("#cslCntUsr_schYearStart").val();
		schEndDt = $("#cslCntUsr_schYearEnd").val();
		titleType = "상담사별_상담현황_년도별";
	}
	else if(termType == "month") {	
		schStartDt = $('#cslCntUsr_schMonthStart').val();
		schEndDt = $('#cslCntUsr_schMonthEnd').val();
		
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("13개월 이상 검색할 수 없습니다.");
//			return false;
//		}
		titleType = "상담사별_상담현황_월별";
	}
	else if(termType == "day") {		
		schStartDt = $("#cslCntUsr_schDayStart").val();
		schEndDt = $("#cslCntUsr_schDayEnd").val();
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
//		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
//			alert("31일 이상 검색할 수 없습니다.");
//			return false;
//		}
		titleType = "상담사별_상담현황_일별";
		
	}
	titleType = titleType + setDownLoadName(schStartDt, schEndDt);
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudFVzcg==", //ch001.stsCounselingCntUsr
			"map" : {
				"key" : "value" ,				
				"optTerm" : $("#cslCntUsr_optTerm").val(), // year, month, day
				"schStartDt" : schStartDt.replace(/-/g, ""),
				"schEndDt" :schEndDt.replace(/-/g, ""),		
				"sidx" : $("#cslCntUsr_tblStsCounselingCntUsr").getGridParam("sortname"),
				"sord" : $("#cslCntUsr_tblStsCounselingCntUsr").getGridParam("sortorder"),
				"gUserArr" : gUserArr,
				"chkHoliday" : $("#cslCntUsr_chkHoliday").is(":checked") ? "Y" : "N",
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
	gUserArrNm = [];
	
	$("#ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArr.push($(this).val());
		gUserArrNm.push($(this).attr('data'));
	});
	
	$("#cslCntUsr_multiCheckbox").setCheckedCnt();	
}

function ulUserListSet(){
	var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='ulUserList'></ul></dd></dl>";
	$("#cslCntUsr_multiCheckbox").html(dropdownBoxHtml);
	
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
			$("#cslCntUsr_multiCheckbox").dropdownMultiCheckbox();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 상담사 전체 선택 이벤트
	$("#ulUserList .allmultichk").on('click', function(e){		
		gUserArr = [];
		gUserArrNm = [];
		var chk = $(this).is(':checked');
		if(chk){
			$("dd input[name='liUser']").each(function(){
				gUserArr.push($(this).val());
				gUserArrNm.push($(this).attr('data'));
			});
		}		
	});
	// 상담사 개별 선택 이벤트
	$("dd input[name='liUser']").on('click',function(e){
		
		var chk = $(this).is(':checked');
		if(chk){
			gUserArr.push($(this).val());
			gUserArrNm.push($(this).attr('data'));
		}else{
			var pos = gUserArr.indexOf($(this).val());
			gUserArr.splice(pos, 1); 
			gUserArrNm.splice(pos, 1); 
		}		
	});	
}

// 초기화 함수
function init(){
	gUserArr = [];
	gUserArrNm = [];
	
	$("#cslCntUsr_optTerm").val("day");

	$("#ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArr.push($(this).val());
		gUserArrNm.push($(this).attr('data'));
	});
	$("#cslCntUsr_multiCheckbox").setCheckedCnt();	
	//alert(gUserArr.toString());
	
	// 조회조건 기간 체인지 이벤트 등록
	changeTerm();
	

	// 그리드
	stsUsrSearch();
}


//기간 셀렉트 박스별 상세 검색
function changeTerm() {
	
	var termType = $("#cslCntUsr_optTerm").val();
	
	if(termType == "year") {
		$("#cslCntUsr_dvYear").show();
		$("#cslCntUsr_dvMonth").hide();
		$("#cslCntUsr_dvDay").hide();
		

		$("#cslCntUsr_schYearStart").val(currentYear);
		$("#cslCntUsr_schYearEnd").val(currentYear);
	}
	else if(termType == "month") {	
		$("#cslCntUsr_dvYear").hide();
		$("#cslCntUsr_dvMonth").show();
		$("#cslCntUsr_dvDay").hide();
			    
		$('#cslCntUsr_schMonthStart').val( currentYM );
		$('#cslCntUsr_schMonthEnd').val( currentYM );		
	}
	else if(termType == "day") {	
		$("#cslCntUsr_dvYear").hide();
		$("#cslCntUsr_dvMonth").hide();
		$("#cslCntUsr_dvDay").show();
		
		$("#cslCntUsr_schDayStart").val(getDate1());
		$("#cslCntUsr_schDayEnd").val(getDate());
	}
}


// 엑셀다운 버튼 클릭 이벤트
function stsUsrExelDown() {
	setGrid();
	param = getJsonStsCounselingCntUsrExcel();
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
	
	var positionS=0;
	
	gColNames.push("날짜", "구분");
	gColModel.push(
				{"name" : "RCV_DT", width : 100, align : "center", frozen : true, sortable : false, hidden:true}, 
				{"name" : "GB", width : 40, align : "center", frozen : true, sortable : false, hidden:false}
	);
	
	
	gColName.push( "GB");
	gColWidth.push(5);
	gColAlign.push("center");
	
	positionS = positionS + 1;
	gColHeader.push("구분, C, 0, 2");
	
	for(var i = 0  ; i < gUserArr.length; i++){	
		
		gColNames.push("IN", "OUT", "CB_OUT", "계");
		gColModel.push(
				{"name" : "IN_"+gUserArr[i].toUpperCase(), width : 50, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}, 
				{"name" : "OUT_"+gUserArr[i].toUpperCase(), width : 50, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},			
				{"name" : "CB_OUT_"+gUserArr[i].toUpperCase(), width : 60, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},			
				{"name" : "CNT_"+gUserArr[i].toUpperCase(), width : 60, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}
		);
		gGroupHeaders.push({startColumnName: "IN_"+gUserArr[i].toUpperCase(), numberOfColumns : 4, titleText : gUserArrNm[i].toUpperCase()});
		
		gColName.push( "IN_"+gUserArr[i], "OUT_"+gUserArr[i], "CB_OUT_"+gUserArr[i], "CNT_"+gUserArr[i]);
		gColWidth.push(7, 7, 7, 7);
		gColAlign.push("right", "right", "right", "right");
		
		gGroupHeader.push(gUserArrNm[i]+", R," + positionS +", 4");		
		positionS = positionS + 4;
		gColHeader.push("IN, C, 1, 1","OUT, C, 1, 1","CB_OUT, C, 1, 1","계, C, 1, 1");
	}
		
	gColNames.push("IN", "OUT", "CB_OUT", "계");
	gColModel.push(
			{"name" : "IN_TOT", width : 50, align : "right", formatter: 'integer',  sortable : false, summaryType:'sum'}, 
			{"name" : "OUT_TOT", width : 50, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},			
			{"name" : "CB_OUT_TOT", width : 60, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},			
			{"name" : "CNT_TOT", width : 60, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}
	);
	gGroupHeaders.push({startColumnName: "IN_TOT", numberOfColumns : 4, titleText : "합계"});
	
	
	gColName.push( "IN_TOT", "OUT_TOT", "CB_OUT_TOT", "CNT_TOT");
	gColWidth.push(7, 7, 7, 7);
	gColAlign.push("right", "right", "right", "right");

	gGroupHeader.push("합계, R," + positionS +", 4");	
	gColHeader.push("IN, C, 1, 1","OUT, C, 1, 1","CB_OUT, C, 1, 1","계, C, 1, 1");


}

//조회 버튼 클릭 이벤트 
function stsUsrSearch(){
	setGrid();
	grid(getJsonStsCounselingCntUsr(), gColNames, gColModel, gGroupHeaders);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
	$("#cslCntUsr_dvGridArea").empty();
	var tb = "<table id = 'cslCntUsr_tblStsCounselingCntUsr'></table>"; 
	$("#cslCntUsr_dvGridArea").append(tb);
	
	$("#cslCntUsr_tblStsCounselingCntUsr").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/counselingCntUsr.do",
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
	   		
            var ids = $("#cslCntUsr_tblStsCounselingCntUsr").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#cslCntUsr_tblStsCounselingCntUsr").getRowData(rowId) ;
            	if(rowData.GB =="합계"){
            		$("#cslCntUsr_tblStsCounselingCntUsr").setRowData( rowId ,false,{background:"#EAEAEA"});
            	}
            	
            	 
           }) ;
           
          
            
           /* 한단 footer 처리 안됨....
            $('#cslCntUsr_tblStsCounselingCntUsr').jqGrid('footerData', 'set', { GB: 'TOT' }); 
        	for(var i = 0  ; i < gUserArr.length; i++){	
        		
        		var inArr = new String("IN_".concat(gUserArr[i]));
        		var outArr = new String("OUT_".concat(gUserArr[i]));
        		
        	

        		if(gUserArr[i] == 'agent001'){
        			$('#cslCntUsr_tblStsCounselingCntUsr').jqGrid('footerData', 'set', { IN_agent001 : $("#cslCntUsr_tblStsCounselingCntUsr").getCol('IN_'+gUserArr[i],false,'sum')  });
        			$('#cslCntUsr_tblStsCounselingCntUsr').jqGrid('footerData', 'set', { OUT_agent001 : $("#cslCntUsr_tblStsCounselingCntUsr").getCol('OUT_'+gUserArr[i],false,'sum')  });
        		}else{
        			$('#cslCntUsr_tblStsCounselingCntUsr').jqGrid('footerData', 'set', { inArr : $("#cslCntUsr_tblStsCounselingCntUsr").getCol('OUT_'+gUserArr[i],false,'sum')  });
        			$('#cslCntUsr_tblStsCounselingCntUsr').jqGrid('footerData', 'set', { outArr : $("#cslCntUsr_tblStsCounselingCntUsr").getCol('OUT_'+gUserArr[i],false,'sum')  });
        		}
        	}
        	
        
        	
            $('#cslCntUsr_tblStsCounselingCntUsr').jqGrid('footerData', 'set', { IN_TOT:$("#cslCntUsr_tblStsCounselingCntUsr").getCol('IN_TOT',false,'sum') }); 
            $('#cslCntUsr_tblStsCounselingCntUsr').jqGrid('footerData', 'set', { OUT_TOT:$("#cslCntUsr_tblStsCounselingCntUsr").getCol('OUT_TOT',false,'sum') }); 
            $('#cslCntUsr_tblStsCounselingCntUsr').jqGrid('footerData', 'set', { CNT_TOT:$("#cslCntUsr_tblStsCounselingCntUsr").getCol('CNT_TOT',false,'sum') }); 
            
            */
        	
    
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
		$("#cslCntUsr_btnStsUsrExelDown").show();
	}else{
		$("#cslCntUsr_btnStsUsrExelDown").hide();
	}

	var selectBox = "";	
	for(var i = currentYear; i >= currentYear-10; i--)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	
	$("#cslCntUsr_schYearStart").html(selectBox);
	$("#cslCntUsr_schYearEnd").html(selectBox);
	
	$("#cslCntUsr_schMonthStart").MonthPicker({
		MaxMonth: 0
    });
	
	$("#cslCntUsr_schMonthEnd").MonthPicker({
		MaxMonth: 0
    });

	/* 현황 조회날짜 제한 unlock함, 다른 콜센터 개발 시 lock하려면 밑의 주석과 관련 주석 풀기*/
//	$("#cslCntUsr_schDayStart").bind("change",  function () {
//		$( "#cslCntUsr_schDayEnd" ).datepicker( "option", "minDate", $("#cslCntUsr_schDayStart").val() );
//		var toDay = new Date(getDate());
//		var maxDay = new Date(getAddDate($("#cslCntUsr_schDayStart").val(), 31));
//		
//		if((toDay.getTime() - maxDay.getTime()) < 0){
//			// 현재 날짜가 작은경우
//			$( "#cslCntUsr_schDayEnd" ).datepicker( "option", "maxDate",getDate());
//		}else{
//			$( "#cslCntUsr_schDayEnd" ).datepicker( "option", "maxDate", getAddDate($("#cslCntUsr_schDayStart").val(), 31) );
//		}
//		$( "#cslCntUsr_schDayStart" ).datepicker( "option", "maxDate",getDate());			
//
//		$(".ui-datepicker-trigger").css("vertical-align","middle");
//	});
//	
//	$("#cslCntUsr_schDayEnd").bind("change",  function () {
//		//$( "#cslCntUsr_schDayStart" ).datepicker( "option", "minDate", getAddDate($("#cslCntUsr_schDayEnd").val(), -31) );
//		//$( "#cslCntUsr_schDayStart" ).datepicker( "option", "maxDate", $("#cslCntUsr_schDayEnd").val() );
//		$( "#cslCntUsr_schDayStart" ).datepicker( "option", "maxDate",getDate());
//		$( "#cslCntUsr_schDayEnd" ).datepicker( "option", "maxDate",getDate());
//		$(".ui-datepicker-trigger").css("vertical-align","middle");
//		
//	});

	datePicker("#cslCntUsr_schDayStart");
	datePicker("#cslCntUsr_schDayEnd");	
	
	// 상담사 셀렉트 박스 세팅
	ulUserListSet();
	// 초기화
	init();

	// 퇴사자포함 체크 클릭 이벤트 등록
	$("#cslCntUsr_chkRetire").on("click", chkRetire);

	// 기간 조회조건 change 이벤트
	$("#cslCntUsr_optTerm").bind("change", changeTerm);		
		
	// 초기화 버튼 클릭 이벤트 등록
	$("#cslCntUsr_btnStsUsrInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntUsr_btnStsUsrSearch").bind("click", stsUsrSearch);
	
	// 엑셀다운 버튼 클릭 이벤트 등록
	$("#cslCntUsr_btnStsUsrExelDown").bind("click", stsUsrExelDown);
});