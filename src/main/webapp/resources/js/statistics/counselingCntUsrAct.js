var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if(currentMonth < 10)
	currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;

var gUserArr = [];
var gUserNmArr = [];
var gActCdArr = [];
var gActNmArr = [];
var gActFstCdArr = [];

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

//plot data
var pNm=[];
var p1=[];
var p2=[];
var p3=[];



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
			"chkRetire" : $("#cslCntUsrAct_chkRetire").prop("checked"),	// 퇴사여부	
			"cntr_cd" : "010000",
			"team_cd" : $("#cslCntUsrAct_userTeamCd").val(),
			"notuse" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 처리유형리스트
function getJsonActCdList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZWxpc3Q=",
		"map" : {
			"key" : "value",
			"tp_cd" : "90014",			
			"notuse" : false,
			"sidx" : "cd_ord",
			"sord" : "asc"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//1차 처리에 들어갈 처리유형코드
function getjsonActFstCdList(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZWxpc3Q=",
		"map" : {
			"key" : "value",
			"tp_cd" : "90014",
			"ext5_cd" : "D",
			"notuse" : false,
			"sidx" : "cd_ord",
			"sord" : "asc"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}



//파라미터 셋팅_getJsonStsCounselingCntAct
function getJsonStsCounselingCntAct() {
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudFVzckFjdA==",//ch001.stsCounselingCntUsrAct
			"map" : {
				"key" : "value" ,				
				"schStartDt" : $("#cslCntUsrAct_schDayStart").val().replace(/-/g, ""),
				"schEndDt" :$("#cslCntUsrAct_schDayEnd").val().replace(/-/g, ""),
				"chkHoliday" : $("#cslCntUsrAct_chkHoliday").is(":checked") ? "Y" : "N",
				"gUserArr" : gUserArr,
				"gActCdArr" : gActCdArr,
				"gActFstCdArr" : gActFstCdArr //1차 처리율
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅_getJsonStsCounselingCntActExcel
function getJsonStsCounselingCntActExcel() {
	
	var titleType = "상담사별_처리현황"+ setDownLoadName($("#cslCntUsrAct_schDayStart").val(), $("#cslCntUsrAct_schDayEnd").val());
		
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudFVzckFjdA==", //ch001.stsCounselingCntUsrAct
			"map" : {
				"key" : "value" ,
				"schStartDt" : $("#cslCntUsrAct_schDayStart").val().replace(/-/g, ""),
				"schEndDt" :$("#cslCntUsrAct_schDayEnd").val().replace(/-/g, ""),	
				"chkHoliday" : $("#cslCntUsrAct_chkHoliday").is(":checked") ? "Y" : "N",
				"sidx" : $("#cslCntUsrAct_tblStsCounselingCntAct").getGridParam("sortname"),
				"sord" : $("#cslCntUsrAct_tblStsCounselingCntAct").getGridParam("sortorder"),
				"gUserArr" : gUserArr,
				"gActCdArr" : gActCdArr,
				"gActFstCdArr" : gActFstCdArr, //1차 처리율
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
	init();
}

function ulUserListSet(){
	var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='ulUserList'></ul></dd></dl>";
	$("#cslCntUsrAct_multiCheckbox").html(dropdownBoxHtml);
	
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
			$("#cslCntUsrAct_multiCheckbox").dropdownMultiCheckbox();
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
	
	
	$("#ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArr.push($(this).val());
		gUserNmArr.push($(this).attr('data'));
	});
	$("#cslCntUsrAct_multiCheckbox").setCheckedCnt();	
	//alert(gUserArr.toString());
	
	$("#cslCntUsrAct_schDayStart").val(getDate1());
	$("#cslCntUsrAct_schDayEnd").val(getDate());
	
	// 그리드
	stsUsrSearch();
}



// 엑셀다운 버튼 클릭 이벤트
function stsUsrExelDown() {
	setGrid();
	param = getJsonStsCounselingCntActExcel();
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
	
	gActCdArr = [];
	gActNmArr = [];
	gActFstCdArr = [];
		
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/code/codelist.do",
		data : "pJson=" + getJsonActCdList(),
		success : function(data) {			
			// param값을 JSON으로 파싱			
			$.each(data, function(key, state) {
				gActCdArr.push(state.CD);
				gActNmArr.push(state.CD_NM);
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});		
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/code/codelist.do",
		data : "pJson=" + getjsonActFstCdList(),
		success : function(data) {			
			// param값을 JSON으로 파싱			
			$.each(data, function(key, state) {
				gActFstCdArr.push(state.CD);
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	
	var positionS=0;
	
	gColNames.push("RCV_USR_ID", "상담사");
	gColModel.push(
				{"name" : "RCV_USR_ID", width : 100, align : "center", frozen : true, sortable : false, hidden:true}, 
				{"name" : "RCV_USR_NM", width : 100, align : "center", frozen : true, sortable : false}
	);
	
	
	gColName.push( "RCV_USR_NM");
	gColWidth.push(8);
	gColAlign.push("center");
	
	positionS = positionS + 1;
	gColHeader.push("상담사, C, 0, 2");
	
	for(var i = 0  ; i < gActCdArr.length; i++){	
		
		gColNames.push("건수", "비율");
		gColModel.push(
				{"name" : "CNT_"+gActCdArr[i], width : 70, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}, 
				{"name" : "RATE_"+gActCdArr[i], width : 70, align : "right", sortable : false}
		);
		gGroupHeaders.push({startColumnName: "CNT_"+gActCdArr[i], numberOfColumns : 2, titleText : gActNmArr[i]});
		
		gColName.push( "CNT_"+gActCdArr[i], "RATE_"+gActCdArr[i]);
		gColWidth.push(8, 7);
		gColAlign.push("right", "right");
		
		gGroupHeader.push(gActNmArr[i]+", R," + positionS +", 2");		
		positionS = positionS + 2;
		gColHeader.push("건수, C, 1, 1","비율, C, 1, 1");
		
		if(gActCdArr[i] == "030300"){
			gColNames.push("직접<br/>처리율");
			gColModel.push(		
					{"name" : "DIRECT_RATE", width : 70, align : "right", sortable : false, summaryType:'sum'}
			);
			
			
			gColName.push( "DIRECT_RATE");
			gColWidth.push(8);
			gColAlign.push("right");
			gColHeader.push("직접처리율, C, 0, 2");
			positionS = positionS + 1;
		}
	}
	
	
		
	gColNames.push("합계");
	gColModel.push(		
			{"name" : "TOT", width : 70, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}
	);
	
	
	gColName.push( "TOT");
	gColWidth.push(7);
	gColAlign.push("right");
	gColHeader.push("합계, C, 0, 2");
	
}

//조회 버튼 클릭 이벤트 
function stsUsrSearch(){
	setGrid();
	grid(getJsonStsCounselingCntAct(), gColNames, gColModel, gGroupHeaders);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
	$("#cslCntUsrAct_dvGridArea").empty();
	var tb = "<table id = 'cslCntUsrAct_tblStsCounselingCntAct'></table>"; 
	$("#cslCntUsrAct_dvGridArea").append(tb);
	
	$("#cslCntUsrAct_tblStsCounselingCntAct").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/counselingCntUsrAct.do",
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
		sortname : "RCV_USR_ID",
		sortorder : "ASC",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "465",
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
	   		pNm = [];
	   		p1 = [];
	   		p2 = [];
	   		p3 = [];
            var ids = $("#cslCntUsrAct_tblStsCounselingCntAct").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#cslCntUsrAct_tblStsCounselingCntAct").getRowData(rowId) ;
            	if(rowData.GB =="합계"){
            		$("#cslCntUsrAct_tblStsCounselingCntAct").setRowData( rowId ,false,{background:"#EAEAEA"});
            	}
            	pNm.push(rowData.RCV_USR_NM);
            	p1.push(rowData.CNT_010000);
            	p2.push(rowData.TOT);
            	p3.push(rowData.DIRECT_RATE);
            	
            	
           }) ;
            //console.log(p1);
            //console.log(p2);
            //console.log(p3);
            jqPlotView();
       },
       
	}).jqGrid('setGroupHeaders', 
	{
	  useColSpanStyle : true, 
	  groupHeaders : groupHeadersValue
	}).jqGrid('setFrozenColumns');
	
	 
}

//jqPlot
function jqPlotView(){
	/***** jqPlot ******************************************************************/
	$.jqplot.config.enablePlugins = true;
	$('#cslCntUsrAct_chart1').empty();

	plot1 = $.jqplot('cslCntUsrAct_chart1', [p2,p1,p3], {
		// Only animate if we're not using excanvas (not in IE 7 or IE 8)..
		animate: !$.jqplot.use_excanvas,
		animateReplot: true,
		axes: {
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				ticks: pNm 
			},
			y2axis: {
			pad: 0,
			tickOptions: {
				formatString: "%'d%"
			},
			rendererOptions: {
				forceTickAt0: false
			},
			max:100,
			numberTicks:5
		
			},
			yaxis: {
				pad: 0,
				tickOptions: {
				formatString: "%'d건"
			},
			rendererOptions: {
				// align the ticks on the y2 axis with the y axis.
				alignTicks: true,
				forceTickAt0: true
			},
			max:1000,
			numberTicks:5
			}
		},
	
	
		series: [
		{
			label: '전체상담건',
			yaxis: 'yaxis',
			shadow: true,
			renderer: $.jqplot.BarRenderer,
			pointLabels: { show: true,hideZeros:true,ypadding:-1 }
	
		},
		{
			label: '직접상담건',
			yaxis: 'yaxis',
			shadow: true,
			renderer: $.jqplot.BarRenderer,
			pointLabels: { show: true,hideZeros:true,ypadding:-1 }
	
		},
		{
			label: '직접상담율',
			yaxis: 'y2axis',
			shadow: true,
			pointLabels: { show: true,hideZeros:true }
		}
	
		],
		legend: {
			show: true,
			location: 'w', // compass direction, nw, n, ne, e, se, s, sw, w.
			xoffset: 0, // pixel offset of the legend box from the x (or x2) axis.
			yoffset: 0, // pixel offset of the legend box from the y (or y2) axis.
			placement: 'outsideGrid' 
		},
		highlighter: { show: false }
	});    	
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
		$("#cslCntUsrAct_btnStsActExelDown").show();
	}else{
		$("#cslCntUsrAct_btnStsActExelDown").hide();
	}

	
	$("#cslCntUsrAct_schDayStart").bind("change",  function () {
		$( "#cslCntUsrAct_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntUsrAct_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	$("#cslCntUsrAct_schDayEnd").bind("change",  function () {		
		$( "#cslCntUsrAct_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntUsrAct_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");		
	});
	
	
	datePicker("#cslCntUsrAct_schDayStart");
	datePicker("#cslCntUsrAct_schDayEnd");	
	
	// 팀 셀렉트 박스 셋팅  
	setObjSelectBoxWithCode("cslCntUsrAct_userTeamCd", "전체", "", "CHILD", "90003", "all");
	//$("#cslCntUsrAct_userTeamCd").val(window.sessionStorage.getItem("TEAM_CD"));
	if(window.sessionStorage.getItem("TEAM_CD")>7000){
		$("#cslCntUsrAct_userTeamCd").val("all");		
	}else{
		$("#cslCntUsrAct_userTeamCd").val(window.sessionStorage.getItem("TEAM_CD"));		
	}
	
	// 상담사 셀렉트 박스 세팅
	ulUserListSet();
	// 초기화
	init();	
	

	
	// 퇴사자포함 체크 클릭 이벤트 등록
	$("#cslCntUsrAct_chkRetire").on("click", chkRetire);	
	$("#cslCntUsrAct_userTeamCd").on("change", chkRetire);	

	// 초기화 버튼 클릭 이벤트 등록
	$("#cslCntUsrAct_btnStsActInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntUsrAct_btnStsActSearch").bind("click", stsUsrSearch);
	
	// 엑셀다운 버튼 클릭 이벤트 등록
	$("#cslCntUsrAct_btnStsActExelDown").bind("click", stsUsrExelDown);
	

	
});