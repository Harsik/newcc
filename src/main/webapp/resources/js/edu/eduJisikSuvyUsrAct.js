/*
 * 업무지식 테스트 관리 현황(그래프)
 * Table : om022 (업무지식기본), od022 (업무지식상세)
 */

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

// 그리드 설정 정보
var gColNames = [];
var gColModel = [];
//var gGroupHeaders = [];

//plot data
var pNm=[];
var pAvg=[];

var g_GrdType = "010100";		//사용자 권한(상담사만:010100)

// 관리자 여부
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");

//파라미터 셋팅 usrList
function getJsonStrUserList(teamCd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",//om001.selectList
		"map" : {
			"key" : "value",			
			"chkRetire" : $("#edusat_chkRetire").prop("checked"),	// 퇴사여부	
			//"cntr_cd" : "010000", // 온누리콜센터
			"notuse" : false,
			"team_cd" : teamCd,
			"gradeType" : g_GrdType,	
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 조회기간 년월 리스트
function getJsonActCdList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2QwMjIuZ2V0WWVhck1vbkxpc3Q=",
		"map" : {
			"key" : "value",
			"syymm" : $("#edusat_schDayStart").val().replace(/-/g, "").substr(0, 6),		
			"eyymm" : $("#edusat_schDayEnd").val().replace(/-/g, "").substr(0, 6),
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonJisikSuvyUsrAct
function getJsonJisikSuvyUsrAct() {
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2QwMjIuZWR1SmlzaWtTdXZ5VXNyQWN0",	//od022.eduJisikSuvyUsrAct
			"map" : {
				"key" : "value" ,				
				"schStartDt" : $("#edusat_schDayStart").val().replace(/-/g, ""),
				"schEndDt" :$("#edusat_schDayEnd").val().replace(/-/g, ""),		
				"gUserArr" : gUserArr.length != 0 ? gUserArr : null,
				"gActCdArr" : gActCdArr,
				"task_knwg_id" : $("#edusat_selSuvyTitle").val() != "all" ? $("#edusat_selSuvyTitle").val() : "",
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 업무지식테스트 타이틀 리스트 조회
function getJsonStrJisikSuvyTitleList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjIuc2VsZWN0SmlzaWtTdXZ5VGl0bGVMaXN0",//om022.selectJisikSuvyTitleList
		"map" : {
			"key" : "value",			
			"exam_strt_dt" : $("#edusat_schDayStart").val().replace(/-/g, ""),
			"exam_end_dt" :$("#edusat_schDayEnd").val().replace(/-/g, ""),			
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//상담사 셀렉트 박스 구성
function chkRetire(){	
	ulUserListSet($("#edusat_srchTeamCd").val());
	init();
}

function ulUserListSet(pTeamCd){
	var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='edusat_ulUserList'></ul></dd></dl>";
	$("#edusat_multiCheckbox").html(dropdownBoxHtml);
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(pTeamCd),
		success : function(data) {
			
			// param값을 JSON으로 파싱
			var ulUserList = "";
			$.each(data, function(key, state) {
				var tempTxt="";
				if(state.RET_YN != undefined) tempTxt = "("+state.RET_YN+")";
				ulUserList += "<li><input type='checkbox' name='liUser' value='" + state.USR_ID + "' data='" + state.USR_NM + tempTxt + "' /> " + state.USR_NM + "<font color='red'>"+tempTxt + "</font>" + "</li>";
				
			});
			
			$("#edusat_ulUserList").html(ulUserList);
			$("#edusat_multiCheckbox").dropdownMultiCheckbox();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 상담사 전체 선택 이벤트
	$("#edusat_ulUserList .allmultichk").on('click', function(e){		
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

//업무지식테스트 타이틀 리스트 조회
function setSelectBoxWithJisikTitle()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/jisikSuvyTitleList.do",
		data : "pJson=" + getJsonStrJisikSuvyTitleList(),
		success : function(data)
		{			
			$("#edusat_selSuvyTitle").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>미선택</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.TTL_ID + "'>" + state.TTL_NM + "</option>";
			});
			
			$("#edusat_selSuvyTitle").append(value);

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 초기화 함수
function init(){
	gUserArr = [];
	gUserNmArr = [];	
	
	
	$("#edusat_ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArr.push($(this).val());
		gUserNmArr.push($(this).attr('data'));
	});
	$("#edusat_multiCheckbox").setCheckedCnt();	
	//alert(gUserArr.toString());
	
	$("#edusat_schDayStart").val(getDate1());
	$("#edusat_schDayEnd").val(getDate());
	
	//업무지식테스트 타이틀 리스트 selectbox init
	setSelectBoxWithJisikTitle();
	
	// 그리드
	stsUsrSearch();
}

function setGrid(){
	
	// 그리드 설정 정보
	gColNames = [];
	gColModel = [];
	//gGroupHeaders = [];

	gActCdArr = [];
	gActNmArr = [];
		
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/code/codelist.do",
		data : "pJson=" + getJsonActCdList(),
		success : function(data) {			
			// param값을 JSON으로 파싱			
			$.each(data, function(key, state) {
				gActCdArr.push(state.MON_CD);
				gActNmArr.push(state.MON_NM);
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});		
	
	gColNames.push("USR_ID", "상담사");
	gColModel.push(
		{name : "USR_ID", width : 50, align : "center", frozen : true, sortable : false, hidden:true}, 
		{name : "USR_NM", width : 100, align : "center", frozen : true, sortable : false}
	);
	
	for(var i = 0  ; i < gActCdArr.length; i++){	
		
		gColNames.push(gActNmArr[i]);
		gColModel.push(
				{name : "FST_"+gActCdArr[i], width : 80, align : "right", formatter: 'integer', sortable : false}
		);
	}
	
	gColNames.push("평균");
	gColModel.push(		
		{name : "AVG_FST", width : 70, align : "right", formatter: 'integer', sortable : false}
	);
	
}

//조회 버튼 클릭 이벤트 
function stsUsrSearch(){
	//if ($("#edusat_selSuvyTitle").val() == "all" || $("#edusat_selSuvyTitle").val() == null || $("#edusat_selSuvyTitle").val() == "") return;
	
	setGrid();
	grid(getJsonJisikSuvyUsrAct(), gColNames, gColModel);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue) 
{
	$("#edusat_dvGridArea").empty();
	var tb = "<table id = 'edusat_tblJisikSuvyUsrAct'></table>"; 
	$("#edusat_dvGridArea").append(tb);
	
	$("#edusat_tblJisikSuvyUsrAct").jqGrid(
	{
		url : getContextPath() + "/ajax/edu/eduJisikSuvyUsrAct.do",
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
		sortname : "USR_NM",
		sortorder : "ASC",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "385",
	   	width : "100%",	   	
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	//footerrow	 : true,
	   	//userDataOnFooter : true,
	   	loadComplete: function() {
	   		
	   		var jqColCnt = colModelValue.length - 2;	//USR_ID, USR_NM 컬럼(고정적인) 제외
	   		var arrJqColCd = [];
	   		var arrJqColNm = [];
	   		
	   		pNm = [];	//상담사명
	   		pAvg = [];	//평균
	   		
	   		for (var i = 1; i <= jqColCnt; i++) {
	   			eval("var pCrt"+i+"=[]");
	   			arrJqColCd.push(colModelValue[i+1].name); 
	   			arrJqColNm.push(colNamesValue[i+1]);
	   		}
	   		
            var ids = $("#edusat_tblJisikSuvyUsrAct").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#edusat_tblJisikSuvyUsrAct").getRowData(rowId) ;
            	if(rowData.USR_NM =="평균"){
            		$("#edusat_tblJisikSuvyUsrAct").setRowData( rowId ,false,{background:"#EAEAEA"});
            	}
            	pNm.push(rowData.USR_NM);
            	pAvg.push(rowData.AVG_FST);
            	
            	for (var i = 1; i <= jqColCnt; i++) {
    	   			//pCrt+i.push(rowData.jqColNm[i]); 
            		eval("pCrt"+i+".push(rowData."+arrJqColCd[i-1]+")");
    	   		}
            	
           }) ;
            
            var pCrt = [];
            
        	for (var i = 1; i <= jqColCnt; i++) {
        		eval("pCrt.push(pCrt"+i+")");
	   		}

            jqPlotView(pCrt, arrJqColNm);
       },
       
	}).jqGrid('setFrozenColumns');
	
	 
}

//jqPlot
function jqPlotView(pCrt, pJqColNm){
	/***** jqPlot ******************************************************************/
	
	var arrObj = {};
	var arrGrp = [];
	
	//범례 설정
	for (var i = 0; i < pJqColNm.length; i++) {

		if (i != pJqColNm.length) {
			arrObj = {label: pJqColNm[i], 
				yaxis: 'yaxis', 
				shadow: true, 
				renderer: $.jqplot.BarRenderer, 
				pointLabels: {show: true, hideZeros:true, ypadding:-1}};
		} else {
			arrObj = {label: pJqColNm[i], 
				yaxis: 'yaxis',
				shadow: true, 
				pointLabels: { show: true, hideZeros:true }};
		}
		
		arrGrp.push(arrObj);

	}
	
	//console.log(pCrt);
	//console.log(pJqColNm);
	//console.log(arrGrp);
	
	$.jqplot.config.enablePlugins = true;
	$('#edusat_chart1').empty();

	//plot1 = $.jqplot('chart1', [p2,p1,pAvg], {
	plot1 = $.jqplot('edusat_chart1', pCrt, {	
		// Only animate if we're not using excanvas (not in IE 7 or IE 8)..
		animate: !$.jqplot.use_excanvas,
		animateReplot: true,
	
		axes: {
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				ticks: pNm 
			},
			yaxis: {
				pad: 0,
				tickOptions: {
					formatString: "%'d점"
				},
				rendererOptions: {
					// align the ticks on the y2 axis with the y axis.
					//alignTicks: true,
					forceTickAt0: true
				},
				max:100,
				numberTicks:6
			},			

		},
		/*	
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer, 
            //trendline:{ show:false }, 
            rendererOptions: { padding: 8, showDataLabels: true }
        },*/

        series: arrGrp,
/*        
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
*/		
        
		legend: {
			show: true,					//범례 표시 여부
			location: 'w', 				//범례 표시 위치 compass direction, nw, n, ne, e, se, s, sw, w.
			xoffset: 0, 				//X축, X2축에서 범례 영역까지의 거리 pixel offset of the legend box from the x (or x2) axis.
			yoffset: 0, 				//Y축, X2축에서 범례 영역까지의 거리 pixel offset of the legend box from the y (or y2) axis.
			placement: 'outsideGrid' 	//범례 표시 영역
		},
		highlighter: {        // X축이 뭔지는 알아야 되니깐 마우스 오버 기능을 활용하기 위해 추가함
            show: true,
            sizeAdjust: 7.5          
        }, 
        cursor: {
        	show: true,
            zoom: true,
            looseZoom: true 
        },			
	});    	
}

$(document).ready(function(){
	
	$("#edusat_schDayStart").bind("change",  function () {
		//$( "#edusat_schDayStart" ).datepicker( "option", "maxDate",getDate());
		//$( "#edusat_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
		
		//업무지식테스트 타이틀 리스트 selectbox init
		setSelectBoxWithJisikTitle();
	});
	
	$("#edusat_schDayEnd").bind("change",  function () {		
		//$( "#edusat_schDayStart" ).datepicker( "option", "maxDate",getDate());
		//$( "#edusat_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
		
		//업무지식테스트 타이틀 리스트 selectbox init
		setSelectBoxWithJisikTitle();
	});
	
	
	datePicker("#edusat_schDayStart");
	datePicker("#edusat_schDayEnd");	
	
	// 센터 셀렉트 박스 셋팅(팀) 
	setObjSelectBoxWithCode("edusat_srchTeamCd", "미선택", "", "GCHILD", "90003", "all");
	
	
	$("#edusat_srchTeamCd").bind("change", function() {
		var teamCd = $("#edusat_srchTeamCd").val();
		ulUserListSet(teamCd);
	});	

	// 상담사 셀렉트 박스 세팅
	//ulUserListSet();
	
	// 초기화
	init();	
	

	
	// 퇴사자포함 체크 클릭 이벤트 등록
	$("#edusat_chkRetire").on("click", chkRetire);	

	// 초기화 버튼 클릭 이벤트 등록
	$("#edusat_btnStsActInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#edusat_btnStsActSearch").bind("click", stsUsrSearch);

	
});