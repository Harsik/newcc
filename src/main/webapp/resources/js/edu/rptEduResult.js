// 조회 조건 및 조회 값
/*var g_usrId = "all";*/
var g_frDate = "";
var g_toDate = "";
var g_usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var g_GrdTypeNm = "";			//사용자 권한 타입(AD:ADMIN, MN:MANAGER, AG:AGENT)

//var usrGrdCd;

// 파라미터 셋팅 교육결과 상담사별 조회
function getJsonStrEduResultList(srchfrdt, srchtodt, teamCd, srchagtid)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDMuc2VsZWN0RWR1UmVzdWx0TGlzdA==",
		"map" : {
			"key" : "value",
			"edu_Strt_Dt" : srchfrdt,
			"edu_End_Dt" : srchtodt,
			"srchagtid" : srchagtid,
			/*"cntr_cd" : cntrCd,*/
			"team_cd" : teamCd,
			/*"crrcum" : crrcum,*/
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 상담사 개인별 교육과정 조회
function getJsonStrEduRsltDtlList(usr_Id, srchfrdt, srchtodt)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDIuc2VsZWN0RWR1UnN0RHRsTGlzdA==",
		"map" : {
			"key" : "value",
			"usr_Id" : usr_Id,
			"edu_Strt_Dt" : srchfrdt,
			"edu_End_Dt" : srchtodt,
			/*"crrcum" : crrcum,*/
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_courseListExcel
function getJsonStrEduRsltListExcel()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDMuc2VsZWN0RWR1UnNsdEV4Y2Vs",
		"map" : {
			"key" : "value",
			"edu_Strt_Dt" : $("#rpedrs_selFrDate").val().replace(/[-, :, \s]/g,""), 
			"edu_End_Dt" : $("#rpedrs_selToDate").val().replace(/[-, :, \s]/g,""), 
			"team_cd" : $("#rpedrs_srchTeamCd").val(), 
			"srchagtid" : $("#rpedrs_selAgent").val(),
			"sidx" : "COL2",
			"sord" : "asc",
			"title" : "교육결과조회" + setDownLoadName($("#rpedrs_selFrDate").val(), $("#rpedrs_selToDate").val()),
			"colWidth" : [15, 30, 30, 20, 25, 15, 15, 15],
			"colName" : ["COL3", "COL5", "COL6", "COL7", "COL8", "COL9", "COL10", "COL11"],
			"colHeader" : ["상담사", "총교육건수", "총교육시간", "내부교육건수", "내부이수시간", "외부교육건수", "외부이수시간", "교육점수"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 사용자 List
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var cntrCd = "";
	
	if (g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
		cntrCd = "";
		$("#rpedrs_srchTeamCd").prop("disabled", false);
	} else {
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		$("#rpedrs_srchTeamCd").prop("disabled", true);
	}
	
	var teamCd = $("#rpedrs_srchTeamCd").val();
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
			"map" : {
				"key" : "value",
				"chkRetire" : false,
				"cntr_cd" : cntrCd,
				"team_cd" : teamCd,
				"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
				"sord" : "asc",	
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//상담사 리스트
function setSelectBoxWithUser()
{
	$.ajax({
	type : "post",
	dataType: "json",
	async : false,
	url : getContextPath() + "/ajax/user/userList.do",
	data : "pJson=" + getJsonStrUserList(),
	success : function(data){
		$("#rpedrs_selAgent").html("");
		// param값을 JSON으로 파싱
		var value = "";
		value += "<option value='all'>전체</option>";
		$.each(data, function(key, state)
		{
			value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
		});
			
		$("#rpedrs_selAgent").append(value);
		$("#rpedrs_selAgent").trigger("change");
		
		if (g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
			$("#rpedrs_selAgent").prop("disabled", false);
		} else {
			$("#rpedrs_selAgent").val(window.sessionStorage.getItem("USR_ID"));
			$("#rpedrs_selAgent").prop("disabled", true);
		}
	},
	error : function(data, status, err) 
	{
		networkErrorHandler(data, status, err);
	}
	});
}

//tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
function init_grid(pMap)
{
    $("#rpedrs_"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#rpedrs_"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	}).jqGrid("navGrid", "#rpedrs_"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

//교육결과 현황 jqGrid Init
function tblResult_init_grid()
{
/*	var strUsr_id = "";
	if (usrGrdCd == "010100") {
		strUsr_id = window.sessionStorage.getItem("USR_ID");  
	} else {
		strUsr_id = "all";
	}*/
	
	pMap = {};
	pMap.tblId = "tblResultList";
	pMap.url   = "/jqgrid/edu/tblResultListGrid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wNDMuc2VsZWN0RWR1UmVzdWx0TGlzdA==", {
		"key" : "value" ,
		"edu_Strt_Dt" : $("#rpedrs_selFrDate").val().replace(/-/gi, ""),
		"edu_End_Dt" : $("#rpedrs_selToDate").val().replace(/-/gi, ""),
		"srchagtid" : $("#rpedrs_selAgent").val(),
		"team_cd" : $("#rpedrs_srchTeamCd").val()
	});
	pMap.colNames = ["상담사", "총교육건수", "총교육시간", "교육건수", "이수시간", "교육건수", "이수시간", "교육점수", "상담사ID"];
	pMap.colModel =
   	[
   	 	{ name : "USR_NM", index : "USR_NM", align : "center", width : 120 },
   	 	{ name : "EDU_CNT", index : "EDU_CNT", align : "center", width : 120 },
   	 	{ name : "TOTA_EDU_TM", index : "TOTA_EDU_TM", align : "center", width : 120 },
   	 	{ name : "EDU_IN_CNT", index : "EDU_IN_CNT", align : "center", width : 120 },
   		{ name : "EDU_IN_TM", index : "EDU_IN_TM", align : "center", width : 100 },  
   		{ name : "EDU_OUT_CNT", index : "EDU_OUT_CNT", align : "center", width : 100 },
   		{ name : "EDU_OUT_TM", index : "EDU_OUT_TM", align : "center", width : 100 },  
   		{ name : "TOTA_SCR", index : "TOTA_SCR", align : "center", width : 100 },  
   		{ name : "USR_ID", index : "USR_ID", align : "center", hidden:true },  
   	];
	pMap.rowNum = "10";
	pMap.sortname = "USR_NM";
	pMap.width = "100%";
	pMap.height = "200";
	pMap.pager = "pgResultList";
	pMap.selectEvent = "tblResultList_SelectRow";
	pMap.rowNumber = true;	
	
	init_grid(pMap);
	
	
	// 멀티 헤더 설정 
	$("#rpedrs_tblResultList").setGroupHeaders(
    {
        useColSpanStyle: true,
        groupHeaders: [
            { "numberOfColumns": 2, "titleText": "내부교육", "startColumnName": "EDU_IN_CNT" },
            { "numberOfColumns": 2, "titleText": "외부교육", "startColumnName": "EDU_OUT_CNT" }]
    });	
}
//교육과정 현황 jqGrid Init
function tblDetail_init_grid()
{
	pMap = {};
	pMap.tblId = "tblDetailList";
	pMap.url   = "/jqgrid/edu/tblDetailListGrid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wNDIuc2VsZWN0RWR1UnN0RHRsTGlzdA==", {
		"key" : "value" ,
		"usr_Id" : "X",
		"edu_Strt_Dt" : $("#rpedrs_selFrDate").val().replace(/-/gi, ""),
		"edu_End_Dt" : $("#rpedrs_selToDate").val().replace(/-/gi, ""),		
			
	});
	pMap.colNames = ["교육과정명", "교육내용", "내/외부구분", "교육기간", "강사", "교육시간", "교육점수"],
	pMap.colModel =
   	[
		{ name : "EDU_CLASS_NM", index : "EDU_CLASS_NM", align : "left", width : "180" },
		{ name : "EDU_CONT", index : "EDU_CONT", align : "left", width : "180" },
		{ name : "EDU_GB_NM", index : "EDU_GB_NM", align : "center", width : "80" },
		{ name : "EDU_STED_DT", index : "EDU_STED_DT", align : "center", width : "135" },
		{ name : "TCH_NM", index : "TCH_NM", align : "center", width : "80"},
		{ name : "TOTA_EDU_TM", index : "TOTA_EDU_TM", align : "center", width : "80" },		
		{ name : "SCR", index : "SCR", align : "center", width : "80"},
   	];
	pMap.rowNum = "10";
	pMap.sortname = "EDU_STED_DT";
	pMap.width = "100%";
	pMap.height = "280";
	pMap.pager = "pgDetailList";
	//pMap.selectEvent = "tblDetailList_SelectRow";
	pMap.rowNumber = false;
	
	init_grid(pMap);
}

// 교육결과현황 상담사별 교육과정 상세조회
function tblResultList_SelectRow(rowid)
{
	g_frDate = $("#rpedrs_selFrDate").val().replace(/[-, :, \s]/g,"");
	g_toDate = $("#rpedrs_selToDate").val().replace(/[-, :, \s]/g,"");

/*	var srchCrrcum = $("#rpedrs_srchCrrcum").val();*/
	
	var objGrid_Row = $("#rpedrs_tblResultList").jqGrid('getRowData', rowid);
	
	$("#rpedrs_tblDetailList").jqGrid("setGridParam", {postData : {pJson : getJsonStrEduRsltDtlList(objGrid_Row.USR_ID, g_frDate, g_toDate)}, page : 1, sortname : "TOTA_EDU_TM", sortorder : "desc"});
	$("#rpedrs_tblDetailList").trigger("reloadGrid");
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{	
	g_frDate = $("#rpedrs_selFrDate").val().replace(/[-, :, \s]/g,"");
	g_toDate = $("#rpedrs_selToDate").val().replace(/[-, :, \s]/g,"");
	
	var teamCd = $("#rpedrs_srchTeamCd").val();
	/*var srchCrrcum = $("#rpedrs_srchCrrcum").val();*/
	var usrId = $("#rpedrs_selAgent").val();
	
	$("#rpedrs_tblResultList").jqGrid("setGridParam", {postData : {pJson : getJsonStrEduResultList(g_frDate, g_toDate, teamCd, usrId)}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#rpedrs_tblResultList").trigger("reloadGrid");

	$("#rpedrs_tblDetailList").jqGrid("setGridParam", {postData : {pJson : getJsonStrEduRsltDtlList("", "", "")}, page : 1, sortname : "TOTA_EDU_TM", sortorder : "desc"});
	$("#rpedrs_tblDetailList").trigger("reloadGrid");
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{		
	$("#rpedrs_selFrDate").val(getDate());
	$("#rpedrs_selToDate").val(getDate());	
	
	if (g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
		$("#rpedrs_srchTeamCd").val("all");
		/*$("#rpedrs_srchCrrcum").val("");*/
		
		setSelectBoxWithUser();
	}
		
	var teamCd = $("#rpedrs_srchTeamCd").val();
	/*var srchCrrcum = $("#rpedrs_srchCrrcum").val();*/
	 var usrId = $("#rpedrs_selAgent").val();
	
	g_frDate = $("#rpedrs_selFrDate").val().replace(/[-, :, \s]/g,"");
	g_toDate = $("#rpedrs_selToDate").val().replace(/[-, :, \s]/g,"");	
	
	$("#rpedrs_tblResultList").jqGrid("setGridParam", {postData : {pJson : getJsonStrEduResultList(g_frDate, g_toDate, teamCd, usrId)}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#rpedrs_tblResultList").trigger("reloadGrid");	

	$("#rpedrs_tblDetailList").jqGrid("setGridParam", {postData : {pJson : getJsonStrEduRsltDtlList("", "", "")}, page : 1, sortname : "TOTA_EDU_TM", sortorder : "desc"});
	$("#rpedrs_tblDetailList").trigger("reloadGrid");
}

//엑셀저장 버튼 클릭 이벤트
function btnExcel_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/edu/eduResultList.do", getJsonStrEduRsltListExcel());
}

//초기화면 데이터 설정
function initData()
{
	$("#rpedrs_selFrDate").val(getDate());
	$("#rpedrs_selToDate").val(getDate());	
	
	// 센터 셀렉트 박스 셋팅(팀)
	setObjSelectBoxWithCode("rpedrs_srchTeamCd", "전체", "", "CHILD", "90003", (g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") ? "all" : window.sessionStorage.getItem("TEAM_CD") );

	//상담사 리스트
	setSelectBoxWithUser();
}

// init Page
$(document).ready(function()
{
	//교육기간
	datePicker("#rpedrs_selFrDate");
	datePicker("#rpedrs_selToDate");
	
	g_GrdTypeNm = getGradTypeNm(g_usrGrdCd);
	
	initData();
	
	//그리드 Init
	tblResult_init_grid();
	tblDetail_init_grid();

	// 조회 버튼 클릭 이벤트 등록
	$("#rpedrs_btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#rpedrs_btnInit").bind("click", btnInit_clickEvent);	
	// 엑셀저장 버튼 클릭 이벤트
	$("#rpedrs_btnExcel").bind("click", btnExcel_clickEvent);
	// 팀선택, 상담사 불러오기
	$("#rpedrs_srchTeamCd").bind("change", setSelectBoxWithUser);

});