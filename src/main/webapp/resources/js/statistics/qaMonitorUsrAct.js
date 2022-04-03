/*
 * 모니터링평가 현황(그래프)
 * Table : om025 (평가기본)
			OM026 (평가대상자기본)
			OD026 (평가대상자처리율상세)
			OD028 (평가대상자품질평가상세)
			OD029 (평가대상자품질평가점수상세)
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
var gGroupHeaders = [];

//plot data
var pNm=[];

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
			"chkRetire" : $("#qausat_chkRetire").prop("checked"),	// 퇴사여부	
			//"cntr_cd" : "010000",
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

//조회기간 년월 리스트
function getJsonActCdList()
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2QwMjIuZ2V0WWVhck1vbkxpc3Q=",
			"map" : {
				"key" : "value",
				"syymm" : $("#qausat_schDayStart").val().replace(/-/g, "").substr(0, 6),		
				"eyymm" : $("#qausat_schDayEnd").val().replace(/-/g, "").substr(0, 6),
			}
		};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonMonitorUsrAct
function getJsonMonitorUsrAct() {
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2QwMjkuZ3JwTW9uaXRvclVzckFjdA==",		//od029.grpMonitorUsrAct
			"map" : {
				"key" : "value" ,				
				"schStartDt" : $("#qausat_schDayStart").val().replace(/-/g, ""),
				"schEndDt" :$("#qausat_schDayEnd").val().replace(/-/g, ""),		
				"gUserArr" : gUserArr.length != 0 ? gUserArr : null,
				"gActCdArr" : gActCdArr
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//상담사 셀렉트 박스 구성
function chkRetire(){	
	ulUserListSet($("#qausat_srchTeamCd").val());
	init();
}

function ulUserListSet(pTeamCd){
	var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='qausat_ulUserList'></ul></dd></dl>";
	$("#qausat_multiCheckbox").html(dropdownBoxHtml);
	
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
				if(state.RET_YN != undefined) tempTxt = "("+state.USR_ID+")";
				ulUserList += "<li><input type='checkbox' name='liUser' value='" + state.USR_ID + "' data='" + state.USR_NM + tempTxt + "' /> " + state.USR_NM + "<font color='red'>"+tempTxt + "</font>" + "</li>";
				
			});
			
			$("#qausat_ulUserList").html(ulUserList);
			$("#qausat_multiCheckbox").dropdownMultiCheckbox();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 상담사 전체 선택 이벤트
	$("#qausat_ulUserList .allmultichk").on('click', function(e){		
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
	
	var strDt = opener.$("#qamoni_selFrDate1").val();
	var endDt = opener.$("#qamoni_selToDate1").val();
	
	$("#qausat_ulUserList .allmultichk").prop('checked', true);
	
	$("dd input[name='liUser']").each(function(){
		$(this).prop('checked', true);
		gUserArr.push($(this).val());
		gUserNmArr.push($(this).attr('data'));
	});
	$("#qausat_multiCheckbox").setCheckedCnt();	
	//alert(gUserArr.toString());
	
//	$("#qausat_schDayStart").val(getDate1());
//	$("#qausat_schDayEnd").val(getDate());
	$("#qausat_schDayStart").val(strDt);
	$("#qausat_schDayEnd").val(endDt);
	
	// 그리드
	stsUsrSearch();
}

function setGrid(){
	
	// 그리드 설정 정보
	gColNames = [];
	gColModel = [];
	gGroupHeaders = [];
	
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
				{"name" : "USR_ID", width : 50, align : "center", frozen : true, sortable : false, hidden:true}, 
				{"name" : "USR_NM", width : 80, align : "center", frozen : true, sortable : false}
	);

	
	for(var i = 0  ; i < gActCdArr.length; i++){	
		
		gColNames.push("1차", "2차", "평균");
		gColModel.push(
				{"name" : gActCdArr[i] + "_ORD1_SCR", width : 45, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
				{"name" : gActCdArr[i] + "_ORD2_SCR", width : 45, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}, 
				{"name" : gActCdArr[i] + "_AVG_SCR", width : 45, align : "right", sortable : false}
		);
		gGroupHeaders.push({startColumnName: gActCdArr[i] + "_ORD1_SCR", numberOfColumns : 3, titleText : gActNmArr[i]});

	}
	
}

//조회 버튼 클릭 이벤트 
function stsUsrSearch(){
	setGrid();
	grid(getJsonMonitorUsrAct(), gColNames, gColModel, gGroupHeaders);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
	$("#qausat_dvGridArea").empty();
	var tb = "<table id = 'qausat_tblMonitorUsrAct'></table>"; 
	$("#qausat_dvGridArea").append(tb);
	
	$("#qausat_tblMonitorUsrAct").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/qaMonitorUsrAct.do",
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
	   	height : "355",
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
	
	   		//var arrCrt = [];
	   		var pCrt = [];
	   		
	   		pNm = [];

	   		var j = 1;
	   		var pHderNm = "";
	   		
	   		for (var i = 1; i <= jqColCnt; i++) {
	   			eval("var pCrt"+i+"=[]");
	   			arrJqColCd.push(colModelValue[i+1].name); 
   				arrJqColNm.push(groupHeadersValue[j-1].titleText + " " + colNamesValue[i+1]);
   				
   				//pHderNm = groupHeadersValue[j-1].titleText + " " + colNamesValue[i+1];
   				//eval("pCrt"+i+".push('"+pHderNm+"')");
   				
	   			if (i%3 == 0) {j = j + 1};
	   		}
	   		

	   		
	   		var ids = $("#qausat_tblMonitorUsrAct").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#qausat_tblMonitorUsrAct").getRowData(rowId) ;
            	if(rowData.USR_NM =="평균"){
            		$("#qausat_tblMonitorUsrAct").setRowData( rowId ,false,{background:"#EAEAEA"});
            	}
            	pNm.push(rowData.USR_NM);
            	
            	//arrCrt = [];
            	
            	$.each(rowData, function(key, value) {
            		//alert('key:' + key + ' / ' + 'value:' + value);
            		
            		if (key != "USR_ID" && key != "USR_NM" ) {
            			//arrCrt.push(value);
            			for (var i = 1; i <= jqColCnt; i++) {
	            			if (key == arrJqColCd[i-1])
	            				eval("pCrt"+i+".push("+value+")");
	            		}
            		}

            	});

            	//pCrt.push(arrCrt);
         	
           }) ;

        	for (var i = 1; i <= jqColCnt; i++) {
        		eval("pCrt.push(pCrt"+i+")");
	   		}
        	
            jqPlotView(pCrt, arrJqColNm);
       },
       
	}).jqGrid('setGroupHeaders', 
	{
	  useColSpanStyle : true, 
	  groupHeaders : groupHeadersValue
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
	$('#qausat_chart1').empty();
	
	// 그래프 최대값 최소값 셋팅
	var min = Infinity;
	var max = -Infinity;
	for(var i=0; i<pCrt.length; i++){
		pCrt.forEach(function(x) {
		    var rowMax = Math.max.apply(null, x);
		    var rowMin = Math.min.apply(null, x);
		    if (rowMax > max) max = rowMax;
		    if (rowMin < min) min = rowMin; 
		});
		
		if(pCrt[i].indexOf(0)!= "-1") min=0;
	}
	
	var maxSlice = parseInt(String(max).slice(0,-1));
	var minSlice = parseInt(String(min).slice(0,-1));
	if(maxSlice==10){
		max=100;
	}else{
		maxSlice=maxSlice+1;
		max=maxSlice+"0";
	}
	
	if(min>0){
		minSlice=minSlice-1;
		min = minSlice+"0";
	}else{
		min = 0;
	}
	
	console.log("max==>"+max);
	console.log("min==>"+min);

	plot1 = $.jqplot('qausat_chart1', pCrt, {
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
				forceTickAt0: true
			},
			max:max,
			min:min,
			numberTicks:4
		
			},
		},	
	    cursor: {
	        show: true,
	        zoom: true,
	        looseZoom: true,
	        showTooltip: true,     // 툴팁 유무
	        tooltipLocation:'sw'   // 툴팁 위치
	    },
		series: arrGrp,	
		legend: {
			show: true,
			location: 'w', // compass direction, nw, n, ne, e, se, s, sw, w.
			xoffset: 0, // pixel offset of the legend box from the x (or x2) axis.
			yoffset: 0, // pixel offset of the legend box from the y (or y2) axis.
			placement: 'outsideGrid' 
		},
		highlighter: {
            show: true,
            sizeAdjust: 1,
            tooltipOffset: 9
        },
	});    	
}

$(document).ready(function(){
	
	$("#qausat_schDayStart").bind("change",  function () {
		//$( "#qausat_schDayStart" ).datepicker( "option", "maxDate",getDate());
		//$( "#qausat_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	$("#qausat_schDayEnd").bind("change",  function () {		
		//$( "#qausat_schDayStart" ).datepicker( "option", "maxDate",getDate());
		//$( "#qausat_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");		
	});
	
	
	datePicker("#qausat_schDayStart");
	datePicker("#qausat_schDayEnd");	
	
	// 센터 셀렉트 박스 셋팅(팀) 
	setObjSelectBoxWithCode("qausat_srchTeamCd", "미선택", "", "GCHILD", "90003", "all");
	
	$("#qausat_srchTeamCd").bind("change", function() {
		var teamCd = $("#qausat_srchTeamCd").val();
		ulUserListSet(teamCd);
	});	
	
	// 상담사 셀렉트 박스 세팅
	//ulUserListSet();
	// 초기화
	init();	
	

	
	// 퇴사자포함 체크 클릭 이벤트 등록
	$("#qausat_chkRetire").on("click", chkRetire);	

	// 초기화 버튼 클릭 이벤트 등록
	$("#qausat_btnStsActInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#qausat_btnStsActSearch").bind("click", stsUsrSearch);

	
});