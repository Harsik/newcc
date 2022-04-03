var s_usrNm = "all";
var s_statCd = "all";
var s_strtDt = "";
var s_endDt = "";

//파라미터셋팅 commonList
function getJsonStrCommonList(s_usrNm, s_statCd, s_strtDt, s_endDt)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjIuc2VsZWN0Q29tbUxpc3Q=",
		"map" : {
			"key" : "value",
			"usr_id" : s_usrNm,
			"usr_stat_cd" : s_statCd,
			"stat_alt_strt_dt" : s_strtDt,
			"stat_alt_end_dt" : s_endDt
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 categoryList
function getJsonStrCategoryList(s_usrNm, s_statCd, s_strtDt, s_endDt)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjIuc2VsZWN0Q2F0Z3J5TElzdA==",
		"map" : {
			"key" : "value",
			"usr_id" : s_usrNm,
			"stat_alt_strt_dt" : s_strtDt,
			"stat_alt_end_dt" : s_endDt
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//일반리스트
function getCommonList()
{
	$("#altStIf_tbl1").jqGrid({
			url : getContextPath() + "/jqgrid/user/loginInfo.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrCommonList(s_usrNm, s_statCd, s_strtDt, s_endDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["근무일", "소속", "상담사", "상태", "시작시각", "종료시각", "소요시간"],
			colModel : [
				{ name : "STAT_ALT_DT", index : "STAT_ALT_DT", align : "center", width : 40 },
				{ name : "CNTR_TEAM_NM", index : "CNTR_TEAM_NM", align : "center", width : 110 },
				{ name : "USR_NM", index : "USR_NM", align : "center", width : 50 },
				{ name : "USR_STAT_CD_NM", index : "USR_STAT_CD_NM", align : "center", width : 40 },
				{ name : "STAT_STRT_TM", index : "STAT_STRT_TM", align : "center", width : 40 },			
				{ name : "STAT_END_TM", index : "STAT_END_TM", align : "center", width : 40 },			
				{ name : "STAT_MNTN_TM", index : "STAT_MNTN_TM", align : "center", width : 40 }
			],
			sortname : "STAT_ALT_DT",
			sortorder : "desc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "520",
		   	width : "100%",
		   	rowNum : 20,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#altStIf_pg1",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
	}).jqGrid("navGrid", "#altStIf_pg1", {edit : false, add : false, del : false, search : false});
}

//상담사별 리스트
function getCategoryList()
{
	$("#altStIf_tbl2").jqGrid({
		url : getContextPath() + "/jqgrid/user/loginInfo.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrCategoryList(s_usrNm, s_statCd, s_strtDt, s_endDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : [
			            "소속", "상담사", "로그인", "준비", "대기", "통화중", "후처리", "휴식",  "식사", "교육", "업무", "기타", "문자상담" 
			],
			colModel : [
				{ name : "CNTR_NM", index : "CNTR_NM", align : "center", width : 70 }, // 소속
				{ name : "USR_NM", index : "USR_NM", align : "center", width : 40 }, // 상담사
				{ name : "LOGIN", index : "LOGIN", align : "center", width : 20 }, // 로그인
				{ name : "READY", index : "READY", align : "center", width : 20 }, // 준비
				{ name : "WAIT", index : "WAIT", align : "center", width : 20 }, // 대기
				{ name : "CALLING", index : "CALLING", align : "center", width : 20 }, // 통화중
				{ name : "POST", index : "POST", align : "center", width : 20 }, // 후처리
				{ name : "REST", index : "REST", align : "center", width : 20 }, // 휴식
				{ name : "EAT", index : "EAT", align : "center", width : 20 }, // 식사
				{ name : "EDU", index : "EDU", align : "center", width : 20 }, // 교육
				{ name : "WORK", index : "WORK", align : "center", width : 20 }, // 업무
				{ name : "ETC", index : "ETC", align : "center", width : 20 }, // 기타	
				{ name : "MESSAGE", index : "MESSAGE", align : "center", width : 20, hidden : "true" }, // 문자상담
			],
			sortname : "usr_id",
			sortorder : "desc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "520",
		   	width : "100%",
		   	rowNum : 20,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#altStIf_pg2",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onSelectRow : function(rowid) {
		   		
		   	},
		   	onPaging : function(pgButton) {	   		
			   		
		   	}
	}).jqGrid("navGrid", "#altStIf_pg2", {
		edit : false, add : false, del : false, search : false
	}).jqGrid("setGroupHeaders", {
		useColSpanStyle : true, 
		groupHeaders : [{startColumnName : "LOGIN", numberOfColumns: 15, titleText: "상태"}]
	});
}

//조회버튼 클릭이벤트
function btnSearchClickEvent()
{
	s_usrNm = $("#altStIf_optSrchUsrNm").val();
	s_statCd = $("#altStIf_optSrchStatType").val();
	s_strtDt = $("#altStIf_selStrtDate").val();
	s_endDt = $("#altStIf_selEndDate").val();
	
	var rMsg = "";
	
	if(s_strtDt == "" || s_endDt == "")
	{
		rMsg += "날짜가 선택되지않았습니다.";
	}
	else
	{
		s_strtDt = s_strtDt.replace(/[-, :, \s]/g,"");
		s_endDt = s_endDt.replace(/[-, :, \s]/g,"");
	}
	
	if(rMsg != "")
	{
		alert(rMsg);
		return;
	}
	
	$("#altStIf_tbl1").jqGrid("setGridParam", 
			{postData : {pJson : getJsonStrCommonList(s_usrNm, s_statCd, s_strtDt, s_endDt)}, 
			 page : 1, 
			 sortname : "STAT_ALT_DT", 
			 sortorder : "desc"}).trigger("reloadGrid");
//	$("#altStIf_tbl1").trigger("reloadGrid");
	
	$("#altStIf_tbl2").jqGrid("setGridParam", 
			{postData : {pJson : getJsonStrCategoryList(s_usrNm, s_statCd, s_strtDt, s_endDt)}, 
			 page : 1, 
			 sortname : "usr_id", 
			 sortorder : "desc"}).trigger("reloadGrid");
//	$("#altStIf_tbl2").trigger("reloadGrid");
}

//엑셀저장버튼 클릭이벤트
function btnExcelClickEvent()
{
	var loParam = "";
	
	if($("#altStIf_useCategory").is(":checked"))
	{
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwMjIuc2VsZWN0Q2F0Z3J5TElzdA==",
			"map" : {
				"key" : "value", 
				"usr_id" : s_usrNm, 
				"usr_stat_cd" : s_statCd, 
				"stat_alt_strt_dt" : s_strtDt, 
				"stat_alt_end_dt" : s_endDt, 
				"sidx" : $("#altStIf_tbl2").getGridParam("sortname"), 
				"sord" : $("#altStIf_tbl2").getGridParam("sortorder"), 
				"title" : "상태변경이력" + setDownLoadName($("#altStIf_selStrtDate").val(), $("#altStIf_selEndDate").val()), 
				"colWidth" : [20, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], 
				"colName" : ["CNTR_NM", "USR_NM", "LOGIN", "WAIT", "CALLING", "POST", "REST", "EAT", "EDU", "WORK", "ETC", "SMS"],
				"colHeader" : ["소속", "상담사", "로그인", "대기", "통화중", "후처리", "휴식", "식사", "교육", "업무", "기타", "문자상담"]
			}
		};
	}
	else
	{
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwMjIuc2VsZWN0Q29tbUxpc3Q=",
			"map" : {
				"key" : "value",
				"usr_id" : s_usrNm,
				"usr_stat_cd" : s_statCd,
				"stat_alt_strt_dt" : s_strtDt,
				"stat_alt_end_dt" : s_endDt,
				"sidx" : $("#altStIf_tbl1").getGridParam("sortname"),
				"sord" : $("#altStIf_tbl1").getGridParam("sortorder"),
				"title" : "상태변경이력" + setDownLoadName($("#altStIf_selStrtDate").val(), $("#altStIf_selEndDate").val()),
				"colWidth" : [20, 40, 20, 20, 20, 20, 20],
				"colName" : ["STAT_ALT_DT", "CNTR_TEAM_NM", "USR_NM", "USR_STAT_CD_NM", "STAT_STRT_TM", "STAT_END_TM", "STAT_MNTN_TM"],
				"colHeader" : ["근무일", "소속", "상담사", "상태", "시작시각", "종료시각", "소요시간"],
				"colAlign" : ["center", "center", "center", "center", "center", "center", "center"]
			}
		};
	}
	console.log(JSON.stringify(loParam));
	
	excelDownLoad(getContextPath() + "/excel/user/altStatInfoExcel.do", encodeURIComponent(JSON.stringify(loParam)));
	
	//var url = getContextPath() + "/excel/user/altStatInfoExcel.do?pJson=" + encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
	//window.open(url);
}

//초기화버튼 클릭이벤트
function btnInitClickEvent()
{
	s_usrNm = "";
	s_statCd = "";
	initDatePicker();
	
	$("#altStIf_optSrchUsrNm").val("all");
	$("#altStIf_optSrchStatType").val("all");
	
	$("#altStIf_tbl1").jqGrid("setGridParam", {postData : {pJson : getJsonStrCommonList(s_usrNm, s_statCd, s_strtDt, s_endDt)}, 
		page : 1, sortname : "STAT_ALT_DT", sortorder : "desc"}).trigger("reloadGrid");
	$("#altStIf_tbl2").jqGrid("setGridParam", {postData : {pJson : getJsonStrCategoryList(s_usrNm, s_statCd, s_strtDt, s_endDt)}, 
		page : 1, sortname : "usr_id", sortorder : "desc"}).trigger("reloadGrid");
}

function initSelectData()
{
	var map = {};
	if(window.sessionStorage.getItem("USR_GRD_CD") == '090100') // 관리자 전체
	{
		// 시스템관리자
		map = 
		{
			"key" : "value",
			//"orderBy" : "usr_nm",
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		};
	}
	else if(window.sessionStorage.getItem("USR_GRD_CD") == '050100' || '030100'){ // manager급 이상  전부
		// 센터장
		map = 
		{
			"key" : "value",
			//"orderBy" : "usr_nm",
			"cntr_cd" : window.sessionStorage.getItem("CNTR_CD"),
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		};
		
	}
	else{
		map = 
		{
			"key" : "value",
			//"orderBy" : "usr_nm",
			"team_cd" : window.sessionStorage.getItem("TEAM_CD"),
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",				
		};
	}
	
	//상담사 selection
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TGlzdA==", map),
		success : function(data)
		{
			data.sort(function(a, b) {
				return a.USR_NM < b.USR_NM ? -1 : a.USR_NM > b.USR_NM ? 1 : 0;
			});
			
			var option = "<option value='all' selected>전체</option>";
			
			for(var i in data)
				option += "<option value='" + data[i].USR_ID + "'>" + data[i].USR_NM + "</option>";
			
				$("#altStIf_optSrchUsrNm").append(option);
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}	
	});
	
	//상태 selection
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/user/statList.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "c20wMDIuZ2V0U3RhdE5tcw==", {"key" : "value"}),
		success : function(data)
		{
			data.sort(function(a, b) {
				return a.CD_NM < b.CD_NM ? -1 : a.CD_NM > b.CD_NM ? 1 : 0;
			});
			
			var option = "<option value='all' selected>전체</option>";
			
			for(var i in data)
				option += "<option value='" + data[i].CD + "'>" + data[i].CD_NM + "</option>";
			
			$("#altStIf_optSrchStatType").append(option);
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//상담사별 체크 이벤트
function userCategoryChangeEvent()
{
    if($("#altStIf_useCategory").is(":checked"))
    {
    	$("#grid1").hide();
    	$("#grid2").show();
    	$("#altStIf_optSrchStatType").prop("disabled", true).val("all");
    }
    else
    {
    	$("#grid2").hide();
    	$("#grid1").show();
    	$("#altStIf_optSrchStatType").prop("disabled", false).val(s_statCd);
    }
}

//datePicker 날짜초기화
function initDatePicker()
{
	var today = new Date().toISOString().substring(0, 10);
	
//	$("#altStIf_selStrtDate").val(getDate1());
	$("#altStIf_selStrtDate").val(getDate());
	$("#altStIf_selEndDate").val(getDate());
	
	s_strtDt = $("#altStIf_selStrtDate").val().replace(/-/g,"");
	s_endDt = $("#altStIf_selEndDate").val().replace(/-/g,"");
}

$(document).ready(function()
{
	datePicker("#altStIf_selStrtDate");
	datePicker("#altStIf_selEndDate");
	
	//당일날짜 셋팅
	initDatePicker();
	//select박스 데이터 셋팅
	initSelectData();
	//리스트 셋팅
	getCommonList();
	getCategoryList();
	$("#grid2").hide();
	
	
	//검색버튼 클릭이벤트 등록
	$("#altStIf_btnSearch").bind("click", btnSearchClickEvent);
	//초기화버튼 클릭이벤트 등록
	$("#altStIf_btnInit").bind("click", btnInitClickEvent);
	//엑셀저장버튼 클릭이벤트 등록
	$("#altStIf_btnExcel").bind("click", btnExcelClickEvent);
	//상담사별 체크이벤트 등록
	$("#altStIf_useCategory").bind("change", userCategoryChangeEvent);
});
