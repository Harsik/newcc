// 전역 변수
var gTermType = "";
var gUsrGrdCd = getUserGrdCode();

var gCenterArr = [];
var gTeamArr = [];
var gCounselArr = [];

var gCenterNm = "";
var gTeamNm = "";
var gCounselNm = "";

// 엑셀 정보
var gColWidth = [];
var gColName = [];
var gColHeader = [];
var gColAlign = [];

// 그리드 설정 정보
var gColNames = [];
var gColModel = [];
var gGroupHeaders = [];

//파라미터 셋팅_getJsonStrAllList
function getJsonStrAllList(term, termType){
	var startDate = "";
	var endDate = "";
	
	if($("#tfTermStart").val() != null && $("#tfTermEnd").val()){
		startDate = $("#tfTermStart").val().replace(/-/gi, "");
		endDate = $("#tfTermEnd").val().replace(/-/gi, "");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAuYWxsTGlzdHNz",
		"map" : {
			"key" : "value",
			"term" : term,
			"termType" : termType,
			"startDate" : startDate,
			"endDate" : endDate,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
		}
	};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrAllListExcel
function getJsonStrAllListExcel(term, termType){
	
	var titleCenter=($("#optCenter").val()=="all")?"전체":"온누리콜센터";
	 var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	 var titleYear=$("#optDayYear").val()+" 년 ";
	 var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?"시간별":"기간별";
	 var titleMonth=($("#optDayMonth").length==0)?"":$("#optDayMonth").val()+" 월 의 ";
	 //"title" : "상담사별접수현황 ( "+titleCenter+titleteam+" 상담사의 "+titleYear+titleMonth+titleTearm+" )",
	var startDate = "";
	var endDate = "";
	
	if($("#tfTermStart").val() != null && $("#tfTermEnd").val())
	{
		startDate = $("#tfTermStart").val().replace(/-/gi, "");
		endDate = $("#tfTermEnd").val().replace(/-/gi, "");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAuYWxsTGlzdHNz",
		"map" : {
			"key" : "value",
			"term" : term,
			"termType" : termType,
			"startDate" : startDate,
			"endDate" : endDate,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
			"sidx" : $("#tblWork").getGridParam("sortname"),
			"sord" : $("#tblWork").getGridParam("sortorder"),
			"title" : "상담사별접수현황("+titleCenter+titleteam+"_상담사의_"+titleYear+titleMonth+titleTearm+")",
			"colWidth" : gColWidth,
			"colName" : gColName,
			"colHeader" : gColHeader,
			"colAlign" : gColAlign
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrIntvList
function getJsonStrIntvList(term){
	var startDate = "";
	var endDate = "";
	if($("#tfTermStart").val() != null && $("#tfTermEnd").val()){
		startDate = $("#tfTermStart").val().replace(/-/gi, "");
		endDate = $("#tfTermEnd").val().replace(/-/gi, "");
	}
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAuaW50dkxpc3Rzcw==",
		"map" : {
			"key" : "value",
			"term" : term,
			"startDate" : startDate,
			"endDate" : endDate,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrIntvListExcel
function getJsonStrIntvListExcel(term){
	//월별
	var titleVal ="";
	
	var titleCenter = $("#optCenter option:checked").text();
	var titleteam= $("#optTeam option:checked").text();
	var titleName= $("#optWorkCounselNm option:checked").text();
	var titleYear=$("#optYear option:checked").text()==''?$("#optDayYear option:checked").text()+$("#optDayMonth option:checked").text():$("#optYear option:checked").text();
	
	titleVal = titleCenter+" "+titleteam+" "+titleName+" "+titleYear;
	var startDate = "";
	var endDate = "";
	
	if($("#tfTermStart").val() != null && $("#tfTermEnd").val()){
		startDate = $("#tfTermStart").val().replace(/-/gi, "");
		endDate = $("#tfTermEnd").val().replace(/-/gi, "");
		titleVal = titleCenter+"_"+titleteam+"_"+titleName+"_"+titleYear+"_"+startDate+"~"+endDate;
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAuaW50dkxpc3Rzcw==",
		"map" : {
			"key" : "value",
			"term" : term,
			"startDate" : startDate,
			"endDate" : endDate,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
			"sidx" : $("#tblWork").getGridParam("sortname"),
			"sord" : $("#tblWork").getGridParam("sortorder"),
			"title" : "상담유형_통계("+titleVal+")",
			"colWidth" : gColWidth,
			"colName" : gColName,
			"colHeader" : gColHeader,
			"colAlign" : gColAlign
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrUsrList
function getJsonStrUsrList(term)
{
	var startDate = "";
	var endDate = "";
	
	if($("#tfTermStart").val() != null && $("#tfTermEnd").val())
	{
		startDate = $("#tfTermStart").val().replace(/-/gi, "");
		endDate = $("#tfTermEnd").val().replace(/-/gi, "");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAudXNyTGlzdHNz",
		"map" : {
			"key" : "value",
			"term" : term,
			"startDate" : startDate,
			"endDate" : endDate,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrUsrListExcel
function getJsonStrUsrListExcel(term)
{
	var titleCenter=($("#optCenter").val()=="all")?"전체":"온누리콜센터";
	 var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	 var titleYear=($("#optYear").val()==null)?($("#optDayYear").val()==null)?" ":$("#optDayYear").val()+" 년 ":$("#optYear").val()+" 년 ";
	 var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?"시간별":"기간별";
	 //"title" : "상담유형 통계 ( "+titleCenter+titleteam+" 상담사의 "+titleYear+titleTearm+" )",
	 
	var startDate = "";
	var endDate = "";
	
	if($("#tfTermStart").val() != null && $("#tfTermEnd").val())
	{
		startDate = $("#tfTermStart").val().replace(/-/gi, "");
		endDate = $("#tfTermEnd").val().replace(/-/gi, "");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAudXNyTGlzdHNz",
		"map" : {
			"key" : "value",
			"term" : term,
			"startDate" : startDate,
			"endDate" : endDate,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
			"sidx" : $("#tblWork").getGridParam("sortname"),
			"sord" : $("#tblWork").getGridParam("sortorder"),
			"title" : "상담유형_통계("+titleCenter+titleteam+"_상담사의_"+titleYear+titleTearm+")",
			"colWidth" : gColWidth,
			"colName" : gColName,
			"colHeader" : gColHeader,
			"colAlign" : gColAlign
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 usrList
function getJsonStrUserList(cntr_cd, team_cd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : true,
			"chkRetire" : true,
			"cntr_cd" : cntr_cd,
			"team_cd" : team_cd,
			"notuse" : false,
			"chkRetire" : false,
			"teamCd" : "1",
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 초기화 함수
function init()
{
	$("#chkCounselor").prop("checked", false);
	$("#optTerm").val("month");
	$("#selType").val("optIntv");
	
	// 조회 조건 셀렉트 박스 등록
	regCenter();
	
	// 기간 셀렉트박스 체인지 이벤트 등록
	changeTerm();
	
	// 그리드 그리는 함수
	drawGrid();
}

//초기화 함수
function load_init()
{
	$("#chkCounselor").prop("checked", false);
	$("#optTerm").val("month");
	$("#selType").val("optIntv");
	
	// 조회 조건 셀렉트 박스 등록
	regCenter();
	
	// 기간 셀렉트박스 체인지 이벤트 등록
	changeTerm();
	
	// 그리드 그리는 함수
	load_drawGrid();
}

//기간 셀렉트 박스별 상세 검색
function changeTerm()
{
	var d = new Date();
	var termType = $("#optTerm").val();
	
	if(termType == "month")
	{
		var currentYear = d.getFullYear();
		var selectBox = "";
		selectBox +=  "<select id = 'optYear' style ='width : 90px; margin-left : 5px;' >";
		for(var i = 2015; i <= currentYear; i++)
		{
			selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
		}
		selectBox +=  "</select>";
		
		$("#termDetail").empty();
		$("#termDetail").append(selectBox);
		$("#optYear").val(currentYear);
	}
	else if(termType == "day")
	{
		var currentYear = d.getFullYear();
		var optYear =  "";
		var currentMonth = d.getMonth() + 1;
		optYear +=  "<select id = optDayYear style ='width : 90px; margin-left : 5px;'>";
		for(var i = 2015; i <= currentYear; i++)
		{
			optYear +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
		}
		optYear +=  "</select>";
		
		var optMonth = "";
		optMonth += "<select id = optDayMonth style ='width : 90px; margin-left : 10px;'>";
		for(var i = 1; i <= 12; i++)
		{
			optMonth +=  "<option value = '" + i + "'>" + i + "월"+"</option>";
		}
		optMonth += "</select>";
		
		$("#termDetail").empty();
		$("#termDetail").append(optYear);
		$("#termDetail").append(optMonth);
		$("#optDayYear").val(currentYear);
		$("#optDayMonth").val(currentMonth);
	}
	else if(termType == "term")
	{
		var tfTermStart = "<input type = 'text' id = 'tfTermStart' style = 'width : 95px; margin-left : 5px;' readOnly/>";
		var tfTermEnd = "<input type = 'text' id = 'tfTermEnd' style = 'width : 95px;' readOnly/>";
		$("#termDetail").empty();
		$("#termDetail").append(tfTermStart);
		$("#termDetail").append(" ~ ");
		$("#termDetail").append(tfTermEnd);
		/*
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		
		if(month < 10)
			month = "0" + month;
		
		$("#tfTermStart").val(year + "-" + month + "-01" );
		$("#tfTermEnd").val(weeked);
		*/
		$("#tfTermStart").val(getPrvDay("D", 7, "-"));
		$("#tfTermEnd").val(getPrvDay("D", 1, "-"));
		
		datePicker("#tfTermStart");
		datePicker("#tfTermEnd");
	}
}

// 그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) {
	$("#tblWorkArea").empty();
	var tb = "<table id = 'tblWork'></table>"; 
	$("#tblWorkArea").append(tb);
	
	$("#tblWork").jqGrid({
		url : getContextPath() + "/ajax/statistics/workList.do",
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
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "405",
	   	width : "100%",
	   	rowNum : "10000000",
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	pager : "",
	   	loadComplete : function(data) {
	   		
		},
	   	gridComplete : function(){
	   		var selType = $("#selType").val();
	   		var colInfo = [];
	   		
	   		if(selType == "optAll"){
	   			if($("#optTerm").val() == "term"){
	   				colInfo = [{ colName : "CNTR_NM", index : "1", colSpan : "5", bgColor : "rgb(154, 154, 152)"}, 
	   				           { colName : "TEAM_NM", index : "2", colSpan : "4", bgColor : "rgb(154, 154, 152)"}, 
	   				           { colName : "USR_NM", index : "3", colSpan : "3", bgColor : "rgb(154, 154, 152)"}, 
	   				           { colName : "INTV_LG_NM", index : "4", colSpan : "2", bgColor : "rgb(171, 171, 169)"}, 
	   				           { colName : "INTV_MD_NM", index : "5", colSpan : "1", bgColor : "rgb(190, 190, 188)"}, 
	   				           { colName : "INTV_SM_NM", index : "6", colSpan : "1", bgColor : "rgb(190, 190, 188)"}];
	   			}else{
	   				colInfo = [{ colName : "WRK_DT", index : "1", colSpan : "6", bgColor : "rgb(154, 154, 152)"},
	   				           { colName : "CNTR_NM", index : "2", colSpan : "5", bgColor : "rgb(154, 154, 152)"}, 
	   				           { colName : "TEAM_NM", index : "3", colSpan : "4", bgColor : "rgb(154, 154, 152)"},
	   				           { colName : "USR_NM", index : "4", colSpan : "3", bgColor : "rgb(154, 154, 152)"}, 
	   				           { colName : "INTV_LG_NM", index : "5", colSpan : "2", bgColor : "rgb(171, 171, 169)"},
	   				           { colName : "INTV_MD_NM", index : "6", colSpan : "1", bgColor : "rgb(190, 190, 188)"}, 
	   				           { colName : "INTV_SM_NM", index : "7", colSpan : "1", bgColor : "rgb(190, 190, 188)"}];
	   			}
	   		}else if(selType == "optIntv"){
	   			colInfo = [
	   			           { colName : "INTV_LG_NM", index : "1", colSpan : "3", bgColor : "rgb(171, 171, 169)"},
	   			           { colName : "INTV_MD_NM", index : "2", colSpan : "2", bgColor : "rgb(190, 190, 188)"}, 
				           { colName : "INTV_SM_NM", index : "3", colSpan : "1", bgColor : "rgb(190, 190, 188)"}];
	   		}else if(selType == "optUsr"){
				colInfo = [{ colName : "CNTR_NM", index : "1", colSpan : "6", bgColor : "rgb(154, 154, 152)"}, 
				           { colName : "TEAM_NM", index : "2", colSpan : "5", bgColor : "rgb(154, 154, 152)"}, 
				           { colName : "USR_NM", index : "3", colSpan : "4", bgColor : "rgb(154, 154, 152)"},
				           { colName : "INTV_LG_NM", index : "4", colSpan : "3", bgColor : "rgb(171, 171, 169)"},
				           { colName : "INTV_MD_NM", index : "5", colSpan : "2", bgColor : "rgb(190, 190, 188)"}, 
				           { colName : "INTV_SM_NM", index : "6", colSpan : "1", bgColor : "rgb(190, 190, 188)"}];
	   		}
	   		
	   		gridRowColSpan("tblWork", colInfo);
		}
	}).jqGrid('setGroupHeaders', 
	{
	  useColSpanStyle : true, 
	  groupHeaders : groupHeadersValue
	}).jqGrid('setFrozenColumns');
}

function cellStyle(jqGridName, i, bgColor)
{
	jqGridName.setCell(i,"TRT_SCNT", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"TRT_SCNT_IN", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"TRT_SCNT_OUT", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"TRT_SCNT_RATE", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"ACT_SCNT", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"IMPF_SCNT", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"ACT_PER", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"SUVY_SCNT", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"AVRG_STSFDG", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"TOTA_ACW_TM", "", {color:'white', backgroundColor: bgColor});
	jqGridName.setCell(i,"TOTA_CALL_TM", "", {color:'white', backgroundColor: bgColor});
}


//그리드 로우, 콜 스판_여러 컬럼 적용
function gridRowColSpan(gridName, colInfo){
	var jqGridName = $("#"+gridName);
	var tblRowNum = jqGridName.getGridParam("reccount");
	
	if( tblRowNum == 1 )
		return;
	
	var cnt = [];
	var startCnt = [];
	var target = [];
	
	$.each(colInfo, function(key, state){
		cnt.push(1);
		startCnt.push(1);
		target.push($("td[aria-describedby="+ gridName +"_"+ state.colName +"]"));
	});
	
	for(var i = 0; i <= tblRowNum; i++){
		$.each(colInfo, function(key, state){
			var currentValue = jqGridName.getCell(i, state.index);
			var rowNextValue = jqGridName.getCell(i + 1, state.index);
			var colBackValue = jqGridName.getCell(i, state.index - 1);
			
			if(currentValue == rowNextValue && currentValue != "합계" && rowNextValue != "합계"){
				target[key][startCnt[key]].setAttribute("rowspan", cnt[key]);
				target[key][i].setAttribute("style", "display : none");
				cnt[key]++;
			}else{
				cnt[key] = 2;
				startCnt[key] = i;
			}
			if(currentValue == "총계" && colBackValue != "총계"){
				target[key][i-1].setAttribute("colspan", state.colSpan);
				target[key][i-1].setAttribute("style", "text-align : center");
				
				target[key][i-1].style.backgroundColor = state.bgColor;
				target[key][i-1].style.color = "white";
				cellStyle(jqGridName, i, state.bgColor);
			}else if(currentValue == "총계" && colBackValue == "총계")
				target[key][i-1].setAttribute("style", "display : none");
			
			if(currentValue == "합계" && colBackValue != "합계"){
				target[key][i-1].setAttribute("colspan", state.colSpan);
				target[key][i-1].setAttribute("style", "text-align : center");
				
				target[key][i-1].style.backgroundColor = state.bgColor;
				target[key][i-1].style.color = "white";
				cellStyle(jqGridName, i, state.bgColor);
			}
			else if(currentValue == "합계" && colBackValue == "합계")
				target[key][i-1].setAttribute("style", "display : none");
		});
	}
}

// cd값을 nm값으로 변환
function cdConvert(cd, gArr) 
{
	var gNm = "";
	
	if(cd != undefined)
	{
		if(cd == "all")
			gNm = "";
		else
		{
			for(var i = 0 ; i < gArr.length; i++)
			{
				if( gArr[i].key == cd )
					gNm = gArr[i].value;
			}
		}
	}
	else
	{
		gNm = "";
	}
	
	return gNm;
}

//그리드 그리는 함수
function drawGrid(type){
	termType = $("#optTerm").val();
	var selType = $("#selType").val();
	
//	if(type == "search")
//	{
		var optCenterCd = $("#optCenter").val();
		var optTeamCd = $("#optTeam").val();
		var optCounselCd = $("#optWorkCounselNm").val();
		
		// 팀에 상담사가 존재 하는지 유무
		if(optCounselCd == "N")
		{
			alert("상담사가 없는 팀입니다.");
			return;
		}
		
		gCenterNm = cdConvert(optCenterCd, gCenterArr);
		gTeamNm = cdConvert(optTeamCd, gTeamArr);
		gCounselNm = cdConvert(optCounselCd, gCounselArr);
		
//	}
	
	var pJsonTerm = "";
	var pJsonTermType = "";
	
	if(Boolean($("#chkCounselor").prop("checked")))
		gridAndExcleSetting();
	else
		gridAndExcleSetting(selType);
	
	if(termType == "month"){
		
		pJsonTerm = $("#optYear").val();
		pJsonTermType = "YYYY-MM";
		
		if(selType == "optAll"){
			
			grid(getJsonStrAllList(pJsonTerm, pJsonTermType), gColNames, gColModel, gGroupHeaders);
		}else if(selType == "optIntv"){
			
			grid(getJsonStrIntvList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		}else if(selType == "optUsr"){
			
			grid(getJsonStrUsrList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		}
	}else if(termType == "day"){
		var year = $("#optDayYear").val();
		var month = $("#optDayMonth").val();
		
		if(month < 10)
			month = "0"+month;
		
		/*pJsonTerm = $("#tfYearMonthPicker").val().replace(/-/g, "");*/
		pJsonTerm = year + month;
		pJsonTermType = "YYYY-MM-DD";
		
		if(selType == "optAll"){
			
			grid(getJsonStrAllList(pJsonTerm, pJsonTermType), gColNames, gColModel, gGroupHeaders);
		}else if(selType == "optIntv"){
			
			grid(getJsonStrIntvList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		}else if(selType == "optUsr"){
			
			grid(getJsonStrUsrList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		}
	}else if(termType == "term"){
		pJsonTerm = termType;
		pJsonTermType = "YYYY-MM-DD";
		
		if(selType == "optAll"){
			grid(getJsonStrAllList(pJsonTerm, pJsonTermType), gColNames, gColModel, gGroupHeaders);
		}
		else if(selType == "optIntv"){
			
			grid(getJsonStrIntvList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		}else if(selType == "optUsr"){
			
			grid(getJsonStrUsrList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		}
	}
}

//그리드 그리는 함수
function load_drawGrid(type){
	termType = $("#optTerm").val();
	var selType = $("#selType").val();
	
//	if(type == "search")
//	{
		var optCenterCd = $("#optCenter").val();
		var optTeamCd = $("#optTeam").val();
		var optCounselCd = $("#optWorkCounselNm").val();
		
		// 팀에 상담사가 존재 하는지 유무
		if(optCounselCd == "N")
		{
			alert("상담사가 없는 팀입니다.");
			return;
		}
		
		gCenterNm = cdConvert(optCenterCd, gCenterArr);
		gTeamNm = cdConvert(optTeamCd, gTeamArr);
		gCounselNm = cdConvert(optCounselCd, gCounselArr);
		
//	}
	
	var pJsonTerm = "9999";
	var pJsonTermType = "";
	
	if(Boolean($("#chkCounselor").prop("checked")))
		gridAndExcleSetting();
	else
		gridAndExcleSetting(selType);
	
	if(termType == "month"){
		pJsonTermType = "YYYY-MM";
		
		if(selType == "optAll"){
			grid(getJsonStrAllList(pJsonTerm, pJsonTermType), gColNames, gColModel, gGroupHeaders);
		}else if(selType == "optIntv"){
			grid(getJsonStrIntvList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		}else if(selType == "optUsr"){
			
			grid(getJsonStrUsrList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		}
	}
}


// 그리드 및 엑셀 정보 셋팅
function gridAndExcleSetting(selType){
	gColNames = [];
	gColModel = [];
	gGroupHeaders = [];
	
	gColWidth = [];
	gColName = [];
	gColHeader = [];
	gColAlign = [];
	
	if(selType == "optAll"){
		if($("#optTerm").val() == "term"){
			gColWidth.push(20, 20, 20);
			gColAlign.push("center", "center", "center");
			gColHeader.push("센터명", "팀명", "상담사");
			gColName.push("CNTR_NM", "TEAM_NM", "USR_NM");
			gColNames.push("센터명", "팀명", "상담사");
			gColModel.push(
					{"name" : "CNTR_NM", align : "center", width : 90, frozen : true, sortable : false, classes : "gridBgColor"}, 
					{"name" : "TEAM_NM", align : "center", width : 90, frozen : true, sortable : false, classes : "gridBgColor"}, 
					{"name" : "USR_NM", align : "center", width : 80, frozen : true, sortable : false, classes : "gridBgColor"});
		}else{
			gColWidth.push(20, 20, 20, 20);
			gColAlign.push("center", "center", "center", "center");
			gColHeader.push("일자", "센터명", "팀명", "상담사");
			gColName.push("WRK_DT", "CNTR_NM", "TEAM_NM", "USR_NM");
			gColNames.push("일자", "센터명", "팀명", "상담사");
			gColModel.push(
					{"name" : "WRK_DT", align : "center", width : 60, frozen : true, sortable : false, classes : "gridBgColor"}, 
					{"name" : "CNTR_NM", align : "center", width : 90, frozen : true, sortable : false, classes : "gridBgColor"}, 
					{"name" : "TEAM_NM", align : "center", width : 90, frozen : true, sortable : false, classes : "gridBgColor"}, 
					{"name" : "USR_NM", align : "center", width : 80, frozen : true, sortable : false, classes : "gridBgColor"});
		}
		
	}else if(selType == "optUsr"){
		gColWidth.push(20, 20, 20);
		gColAlign.push("center", "center", "center");
		gColHeader.push("센터명", "팀명", "상담사");
		gColName.push("CNTR_NM", "TEAM_NM", "USR_NM");
		gColNames.push("센터명", "팀명", "상담사");
		gColModel.push({"name" : "CNTR_NM", align : "center", width : 90, frozen : true, sortable : false, classes : "gridBgColor"},
				{"name" : "TEAM_NM", align : "center", width : 90, frozen : true, sortable : false, classes : "gridBgColor"},
				{"name" : "USR_NM", align : "center", width : 80, frozen : true, sortable : false, classes : "gridBgColor"});
	}

	gColWidth.push(20, 20);
	gColAlign.push("center", "center","center");
	gColHeader.push("대분류", "중분류","소분류");
	gColName.push("INTV_LG_NM", "INTV_MD_NM","INTV_SM_NM");
	gColNames.push("대분류", "중분류","소분류");
	gColModel.push({"name" : "INTV_LG_NM", align : "left", width : 110, frozen : true, sortable : false, classes : "gridBgColor"}
		, {"name" : "INTV_MD_NM", align : "left", width : 160, frozen : true, sortable : false, classes : "gridBgColor"}
		, {"name" : "INTV_SM_NM", align : "left", width : 160, frozen : true, sortable : false, classes : "gridBgColor"}	
	);
	gGroupHeaders.push({startColumnName: "INTV_LG_NM", numberOfColumns : 3, titleText : "상담유형"});
	
	gColWidth.push(20, 20, 20, 20, 20, 20, 20, 20, 20);
	gColAlign.push("center", "center", "center", "center", "center", "center", "center", "center", "center");
	gColHeader.push("접수건수", "IN", "OUT",  "완료건수", "미완료건수",  "총후처리시간", "총상담시간");
	gColName.push("TRT_SCNT", "TRT_SCNT_IN", "TRT_SCNT_OUT","ACT_SCNT", "IMPF_SCNT",  "TOTA_ACW_TM", "TOTA_CALL_TM");
	gColNames.push("접수건수", "IN", "OUT", "비율", "완료건수", "미완료건수", "처리율", "총후처리시간", "총상담시간");
	gColModel.push({"name" : "TRT_SCNT", width : 60, align : "center", sortable : false, classes : "gridBgColor"}, 
			{"name" : "TRT_SCNT_IN", width : 60, align : "center", sortable : false, classes : "gridBgColor"}, 
			{"name" : "TRT_SCNT_OUT", width : 60, align : "center", sortable : false, classes : "gridBgColor"},
			{"name" : "TRT_SCNT_RATE", hidden : true, width : 60, align : "center", sortable : false, classes : "gridBgColor"}, 
			{"name" : "ACT_SCNT", width : 60, align : "center", sortable : false, classes : "gridBgColor"}, 
			{"name" : "IMPF_SCNT", width : 80, align : "center", sortable : false, classes : "gridBgColor"}, 
			{"name" : "ACT_PER", hidden : true,width : 60, align : "center", sortable : false, classes : "gridBgColor"}, 
			{"name" : "TOTA_ACW_TM", width : 100, align : "center", sortable : false, classes : "gridBgColor"},
			{"name" : "TOTA_CALL_TM", width : 100, align : "center", sortable : false, classes : "gridBgColor"});
	
}

//조회 조건 중 팀 셀렉트 박스 체인지 이벤트
function optTeam_changeEvent()
{
	if($("#optTeam").val() == "all")
	{
		$("#txtTeam").empty();
	}
	else
	{
		var optCounselNm = "<select id = 'optWorkCounselNm' style = 'width : 90px'></select>";
	
		$("#txtTeam").html(optCounselNm);
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/user/userList.do",
			data : "pJson=" + getJsonStrUserList($("#optCenter").val(), $("#optTeam").val()),
			success : function(data)
			{
				$("#optWorkCounselNm").empty();		

				// param값을 JSON으로 파싱
				var options = "";
				
				if(data.length == 0)
				{
					options += "<option value='N'>인원 없음</option>";
				}
				else
				{
					options += "<option value='all'>전체</option>";
					$.each(data, function(key, state) {
						options += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
						gCounselArr.push({"key" : state.USR_ID, "value" : state.USR_NM});
					});
				}
				
				$("#optWorkCounselNm").append(options);
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 조회 조건 중 센터 셀렉트 박스 체인지 이벤트
function optCenter_changeEvent()
{
	if($("#optCenter").val() == "all")
	{
		$("#txtCenter").empty();
	}
	else
	{
		var tag = "<select id = 'optTeam' style = 'width : 90px; margin-left : 5px; margin-right : 10px;'></select>" +
				"<span id = 'txtTeam'></span>";
		$("#txtCenter").html(tag);
		
		// 셀렉트 박스 셋팅
		$.ajax({
			type : "post",
			async : false,
			url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
			data : "pJson=" + getJsonStrCommonSetSelectBox("90003", "90002", $("#optCenter").val()),
			success : function(data)
			{
				$("#optTeam").empty();
			
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
				var options = "";
				
				if(data.length <= 0)
				{
					options += "<option value='N'>팀 없음</option>";
				}
				else
				{
					//~팀장급
					if(gUsrGrdCd < 50000)
					{
						$.each(jr, function(key, state)
						{
							if(state.CD == window.sessionStorage.getItem("TEAM_CD"))
							{
								options += "<option value='" + state.CD + "' >" + state.CD_NM + "</option>";
								gTeamArr.push({"key" : state.CD, "value" : state.CD_NM});
							}
						});
						//팀장급 이상
					}
					else
					{
						options += "<option value='all'>전체</option>";
					
						$.each(jr, function(key, state)
						{
							options += "<option value='" + state.CD + "' >" + state.CD_NM + "</option>";
							gTeamArr.push({"key" : state.CD, "value" : state.CD_NM});
						});
					}
				}
				
				$("#optTeam").append(options).bind("change", optTeam_changeEvent);
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 조회 조건 중 센터 등록
function regCenter()
{
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/user/cntrList.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "c20wMDIuc2VsZWN0Q250ckNk", {"key" : "value"}),
		success : function(data)
		{
			var options = "";
		
			// ~센터장급
			if(gUsrGrdCd < 60000)
			{
				for(var i in data)
				{
					if(data[i].CD == window.sessionStorage.getItem("CNTR_CD"))
					{
						options += "<option value='" + data[i].CD + "' >" + data[i].CD_NM + "</option>";
						gCenterArr.push({"key" : data[i].CD, "value" : data[i].CD_NM});
						break;
					}
				}
			//센터장급 이상
			}
			else
			{
				options += "<option value='all'>전체</option>";
			
				for(var i in data)
				{
					options += "<option value='" + data[i].CD + "' >" + data[i].CD_NM + "</option>";
					gCenterArr.push({"key" : data[i].CD, "value" : data[i].CD_NM});
				}
			}
			
			$("#optCenter").html(options).trigger("change").trigger("load");
			optCenter_changeEvent();
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});	
}

// 상담사별 체크박스 체인지 이벤트 등록
function chkCounselor_changeEvent()
{
	drawGrid("search");
}

// 엑셀 다운 버튼 클릭 이벤트
function btnExelDown_clickEvent() 
{
	var termType = $("#optTerm").val();
	var selType = $("#selType").val();
	
	var url = "";
	var param = "";
	
	if(termType == "month")
	{
		var pJsonTerm = $("#optYear").val();
		var pJsonTermType = "YYYY-MM";
		
		if(selType == "optAll")
		{
			param = getJsonStrAllListExcel(pJsonTerm, pJsonTermType);
		}
		else if(selType == "optIntv")
		{
			param = getJsonStrIntvListExcel(pJsonTerm);
		}
		else if(selType == "optUsr")
		{
			param = getJsonStrUsrListExcel(pJsonTerm);
		}
	}
	else if( termType == "day" )
	{
		var year = $("#optDayYear").val();
		var month = $("#optDayMonth").val();
		
		if(month < 10)
			month = "0"+month;
		
		/*pJsonTerm = $("#tfYearMonthPicker").val().replace(/-/g, "");*/
		var pJsonTerm = year + month;
		var pJsonTermType = "YYYY-MM-DD";
		
		if(selType == "optAll")
		{
			param = getJsonStrAllListExcel(pJsonTerm, pJsonTermType);
		}
		else if(selType == "optIntv")
		{
			param = getJsonStrIntvListExcel(pJsonTerm);
		}
		else if(selType == "optUsr")
		{
			param = getJsonStrUsrListExcel(pJsonTerm);
		}
	}
	else if(termType == "term")
	{
		pJsonTerm = termType;
		pJsonTermType = "YYYY-MM-DD";
		
		if(selType == "optAll")
		{
			param = getJsonStrAllListExcel(pJsonTerm, pJsonTermType);
		}
		else if(selType == "optIntv")
		{
			param = getJsonStrIntvListExcel(pJsonTerm);
		}
		else if(selType == "optUsr")
		{
			param = getJsonStrUsrListExcel(pJsonTerm);
		}
	}
	
	url = getContextPath() + "/excel/statistics/excel.do";
	
	excelDownLoad(url, param);
}

$(document).ready(function(){
	init();
	//센터 셀렉트박스 체인지 이벤트 등록'
	$("#optCenter").bind("change", optCenter_changeEvent);
	// 기간 셀렉트박스 체인지 이벤트 등록
	$("#optTerm").bind("change", changeTerm);
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", init);
	// 조회 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", function()
	{
		drawGrid("search");
	});
	// 상담사별 체크박스 체인지 이벤트 등록
	$("#chkCounselor").bind("change", chkCounselor_changeEvent);
	// 엑셀 다운로드 버튼 클릭 이벤트 등록
	$("#btnExelDown").bind("click", btnExelDown_clickEvent);
});