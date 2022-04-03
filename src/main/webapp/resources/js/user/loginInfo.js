// 조회 조건 및 조회 값
var s_srchtype = "all";
var s_srchval = "";
var s_frDt = "";
var s_toDt = "";

var gUsrGrdCd = getUserGrdCode();
var gCntrCd = gUsrGrdCd == 90100 ?"": window.sessionStorage.getItem("CNTR_CD");
var gUsrId = gUsrGrdCd >= 30100 ? "": window.sessionStorage.getItem("USR_ID");

//파라미터 셋팅 loginInfoListExcel
function getJsonStrLoginInfoListExcel(srchtype, srchval, frDt, toDt){			
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjAubG9naW5JbmZvTGlzdA==",
		"map" : {
			"key" : "value",
			"optSrchType" : srchtype,
			"idSrchVal" : srchval,
			"frDt" : frDt,
			"toDt" : toDt,
			"cntr_cd" : gCntrCd,
			"usr_id": gUsrId,
			"sidx" : $("#lgnInf_loginInfoList").getGridParam("sortname"),
			"sord" : $("#lgnInf_loginInfoList").getGridParam("sortorder"),
			"title" : "로그인이력" + setDownLoadName(frDt, toDt),
			"colWidth" : [20, 20, 20, 20, 20, 20],
			"colName" : ["LGN_DT", "USR_NM", "LGN_TM", "LGT_TM", "EXTN_NO", "LGN_PC_IP"],
			"colHeader" : ["로그인일자", "이름", "로그인시각", "로그아웃시각", "내선번호", "로그인PC-IP"],
			"colAlign" : ["center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 검색
function getJsonStrLoginInfoList(s_srchtype, s_srchval, s_frDt, s_toDt){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjAubG9naW5JbmZvTGlzdA==",
		"map" : {
			"optSrchType" : s_srchtype,
			"idSrchVal" : s_srchval,
			"frDt" : s_frDt,
			"toDt" : s_toDt,
			"cntr_cd" : gCntrCd,
			"usr_id": gUsrId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
//검색타입 선택 이벤트
function optSrchtype_changeEvent(){
	if($("#lgnInf_optSrchtype").val() == "all"){
		$("#lgnInf_idSrchVal").prop("disabled", true);
		$("#lgnInf_idSrchVal").val("");
	}
	else
		$("#lgnInf_idSrchVal").prop("disabled", false);
}
//조회 버튼 클릭 이벤트
function btnSearch_clickEvent(){
	s_srchtype = $("#lgnInf_optSrchtype").val();
	s_srchval = $("#lgnInf_idSrchVal").val();
	s_frDt = $("#lgnInf_loginInfoDtStr").val().replace(/-/g,"");
	s_toDt = $("#lgnInf_loginInfoDtEnd").val().replace(/-/g,"");

	$("#lgnInf_loginInfoList").jqGrid("setGridParam", {postData : {pJson : getJsonStrLoginInfoList(s_srchtype, s_srchval, s_frDt, s_toDt)}, page : 1, sortname : "LGN_DT", sortorder : "desc"});
	$("#lgnInf_loginInfoList").trigger("reloadGrid");
	
}
//초기화 버튼 클릭 이벤트
function btnInit_initEvent(){
	$("#lgnInf_loginInfoDtStr").val(getDate());
	//20191025
	$("#lgnInf_loginInfoDtEnd").val(getDate());
	s_srchtype = $("#lgnInf_optSrchtype").val("all");
	s_srchval = $("#lgnInf_idSrchVal").val("");
	s_frDt = $("#lgnInf_loginInfoDtStr").val().replace(/-/g,"");
	s_toDt = $("#lgnInf_loginInfoDtEnd").val().replace(/-/g,"");

	$("#lgnInf_loginInfoList").jqGrid("setGridParam", {postData : {pJson : getJsonStrLoginInfoList(s_srchtype, s_srchval, s_frDt, s_toDt)}, page : 1, sortname : "LGN_DT", sortorder : "desc"});
	$("#lgnInf_loginInfoList").trigger("reloadGrid");

}

//엑셀저장버튼 클릭이벤트
function btnExcel_clickEvent(){
	excelDownLoad(getContextPath() + "/excel/user/loginInfoList.do", getJsonStrLoginInfoListExcel(s_srchtype, s_srchval, s_frDt, s_toDt));
}
$(document).ready(function(){	
	
	datePicker("#lgnInf_loginInfoDtStr");
	datePicker("#lgnInf_loginInfoDtEnd");
	
	//당일날자 셋팅
	var today = new Date().toISOString().substring(0, 10);
	$("#lgnInf_loginInfoDtStr").val(today);
	$("#lgnInf_loginInfoDtEnd").val(today);
	s_frDt = $("#lgnInf_loginInfoDtStr").val().replace(/-/g,"");
	s_toDt = $("#lgnInf_loginInfoDtEnd").val().replace(/-/g,"");
	
	//팀장급 미만일시
	if(gUsrGrdCd < 30000) {
		$("#lgnInf_optSrchtype").val("loginId").prop("disabled", true);
		$("#lgnInf_idSrchVal").val(window.sessionStorage.getItem("USR_NM")).prop("disabled", true);
		s_srchtype = $("#lgnInf_optSrchtype").val();
		s_srchval = $("#lgnInf_idSrchVal").val();
	}
	
	$("#lgnInf_loginInfoList").jqGrid({
		url : getContextPath() + "/jqgrid/user/loginInfo.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrLoginInfoList(s_srchtype, s_srchval, s_frDt, s_toDt)
		},
		jsonReader :{
			repeatitems: false
		},
		colNames : ["로그인일자", "이름", "로그인시각", "로그아웃시각", "내선번호", "로그인PC-IP"],
		colModel :
		[
			{ name : "LGN_DT", index : "LGN_DT", align : "center", width : 40 },
			{ name : "USR_NM", index : "USR_NM", align : "center", width : 40 },
			{ name : "LGN_TM", index : "LGN_TM", align : "center", width : 40 },
			{ name : "LGT_TM", index : "LGT_TM", align : "center", width : 40 },
			{ name : "EXTN_NO", index : "EXTN_NO", align : "center", width : 40 },			
			{ name : "LGN_PC_IP", index : "LGN_PC_IP", align : "center", width : 50 },			
		],
		sortname : "LGN_DT",
		sortorder : "asc",
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
	   	pager : "#lgnInf_pgLoginInfoList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true
	}).jqGrid("navGrid", "#lgnInf_pgLoginInfoList", {edit : false, add : false, del : false, search : false});

	// 조회 버튼 클릭 이벤트 등록
	$("#lgnInf_btnSearch").bind("click", btnSearch_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#lgnInf_btnInit").bind("click", btnInit_initEvent);
	// 검색어 텍스트인풋 엔터키 이벤트 등록
	$("#lgnInf_idSrchVal").bind("keydown", function (key){
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	//엑셀저장버튼 클릭 이벤트 등록
	$("#lgnInf_btnExcel").bind("click", btnExcel_clickEvent);
	
});