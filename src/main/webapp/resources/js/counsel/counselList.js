// 조회 조건 및 조회 값
var g_listType = "counsel";
var g_srchtype = "all";
var g_srchval = "";
var g_usrId = "all";
var g_frDt = "";
var g_toDt = "";
var g_selCounselNm = "";
var g_selChGbCd = "";
var g_selActTypeCd = "";
var g_selActStCd = "";
var g_srchDtType = "dt";
var g_ListPopup = "CHILD";

// 파라미터 셋팅 CounselList
function getJsonStrCounselList(srchtype, srchval, srchDtType, usrId)
{
	var cust_id=null;	
	var frDt = $("#cslist_selFrDate").val();
	var toDt = $("#cslist_selToDate").val();

	if($("#cslist_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#cslist_selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");

	if(opener.document.title=="특이민원인 현황"){
		frDt = window.sessionStorage.getItem("schStartDt").replace(/-/g, "");
		toDt = window.sessionStorage.getItem("schEndDt").replace(/-/g, "");
		cust_id=window.sessionStorage.getItem("cust_id");
	}	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3Q=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchDtType" : "rcvDt",
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#cslist_selChGbCd").val(),
			"selActTypeCd" : $("#cslist_selActTypeCd").val(),
			"selActStCd" : $("#cslist_selActStCd").val(),
//			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
			"srchval" : srchtype=="srchAddr"?"temp":srchval.replace(/-/g,""),
			/* "intv_ex_cd" : $("#cslist_selSrchIntvExCd").val(), */
			"intv_lg_cd" : $("#cslist_selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#cslist_selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#cslist_selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#cslist_selCallGb").val(),
//			"keyWord" : $("#cslist_selSrchKeyWordCd").val(),
			"selAddr" : $("#cslist_selSrchAddrCd").val(),
			"loc_yn" : "",
			"agree_yn" : $("#cslist_selInfoAgree").val(),
			"cust_id" : cust_id
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅 CounselListCnt
function getJsonStrCounselListCnt(srchtype, srchval, srchDtType, usrId)
{
	var frDt = $("#cslist_selFrDate").val();
	var toDt = $("#cslist_selToDate").val();
	
	if($("#cslist_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#cslist_selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3RjbnQ=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#cslist_selChGbCd").val(),
			"selActTypeCd" : $("#cslist_selActTypeCd").val(),
			"selActStCd" : $("#cslist_selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
			"srchDtType" : "rcvDt",
			"selContType" : $("#cslist_selContType").val(),
			"selContTxt" : $("#cslist_selContTxt").val(),
			"selCnslCsVltn" : $("#cslist_selCnslCsVltn").val(),
			/* "intv_ex_cd" : $("#cslist_selSrchIntvExCd").val(), */
			"intv_lg_cd" : $("#cslist_selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#cslist_selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#cslist_selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#cslist_selCnslSrchCallGbCd").val(),
//			"keyWord" : $("#cslist_selSrchKeyWordCd").val(),
			"selAddr" : $("#cslist_selSrchAddrCd").val(),
			"loc_yn" : "",
			"agree_yn" : $("#cslist_selInfoAgree").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅 counselListExcel
function getJsonStrCounselListExcel(srchtype, srchval, srchDtType, usrId)
{
	var frDt = $("#cslist_selFrDate").val();
	var toDt = $("#cslist_selToDate").val();
	
	if($("#cslist_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#cslist_selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3Q=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#cslist_selChGbCd").val(),
			"selActTypeCd" : $("#cslist_selActTypeCd").val(),
			"selActStCd" : $("#cslist_selActStCd").val(),
//			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
			"srchval" : srchtype=="srchAddr"?"temp":srchval.replace(/-/g,""),
			"srchDtType" : "rcvDt",
			"selContType" : $("#cslist_selContType").val(),
			"selContTxt" : $("#cslist_selContTxt").val(),
			"selCnslCsVltn" : $("#cslist_selCnslCsVltn").val(),
			/* "intv_ex_cd" : $("#cslist_selSrchIntvExCd").val(), */
			"intv_lg_cd" : $("#cslist_selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#cslist_selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#cslist_selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#cslist_selCnslSrchCallGbCd").val(),
//			"keyWord" : $("#cslist_selSrchKeyWordCd").val(),
			"selAddr" : $("#cslist_selSrchAddrCd").val(),
			"loc_yn" : $("#cslist_selLocationAgree").val(),
			"agree_yn" : $("#cslist_selInfoAgree").val(),
			"sidx" : $("#cslist_tblCounselList").getGridParam("sortname"),
			"sord" : $("#cslist_tblCounselList").getGridParam("sortorder"),
			"title" : "상담이력목록" + setDownLoadName($("#cslist_selFrDate").val(), $("#cslist_selToDate").val()),
			"colWidth" : [10, 20, 10, 20, 20, 20, 30, 30, 10, 10, 20, 10, 10, 10, 10, 20, 10, 10, 10, 20, 20],
			"colName" : ["RCV_USR_NM", "RCV_DT_FORMAT", "CUST_NM", "INTV_LG_NM", "INTV_MD_NM", "INTV_SM_NM", "RCV_CONT", "ACT_CONT", "ACT_TYPE_NM", "H_ADDR", "PPS_NM", "CST_COMP_NM", "CH_GB_NM", "CALL_GB_NM_ENG", "CALL_TIME", "CNTCT_INFM_FORMAT", "INFM_YN", "ACT_ST_NM", "MOD_USR_NM", "MOD_DT_FORMAT", "TCKT_ID"],
			"colHeader" : ["상담사", "접수일시", "민원인명", "상담대분류", "상담중분류","상담소분류", "문의내용", "답변내용", "처리유형", "주소", "여행목적", "민원인성향", "채널구분", "통화구분", "통화시간", "전화번호", "수신동의여부", "처리상태", "수정자", "수정일시", "접수번호"],
			"colAlign" : ["center", "center", "center", "center", "center","center","center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅 ProgramList
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var cntrCd = "";
	
	if(window.sessionStorage.getItem("USR_GRD_CD") == "060100" || window.sessionStorage.getItem("USR_GRD_CD") == "090100")
		cntrCd = "";
	else
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : true,
			"chkRetire" : $("input[id=chkNotUse]:checkbox").prop("checked"),
			"cntr_cd" : cntrCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchtype = $("#cslist_optSrchtype").val();
	g_srchval = $("#cslist_tfSrchval").val();
	g_srchDtType = $("#cslist_selDtType").val();
	g_usrId = $("#cslist_selCounselNm").val();
	$("#cslist_selSrchAddrCd").val("all");
	
	$("#cslist_labCnslListInOutCnt").html("IN : 0, OUT : 0");
	
	$("#cslist_tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#cslist_tblCounselList").trigger("reloadGrid");
	
	counselInitInfo("list","CHILD");
}
	function testPopup(){
		  
	 var pObjectArrayCode=window.opener.g_arrObj_T;
		 
	}
// 초기화 버튼 클릭 이벤트
function initEvent()
{
 
	g_srchtype = "custNm";
	g_srchval = "";
		// 상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");

	} else{
		g_usrId = "all";
	}
	srchDtType = "dt";

	$("#cslist_optSrchtype").val("all");
	$("#cslist_tfSrchval").val("");
	$("#cslist_selCounselNm").val(g_usrId);
	
	$("#cslist_tfSrchval").show();
//	$("#cslist_selSrchKeyWordCd").hide();
	$("#cslist_selSrchAddrCd").hide();
	
	$("#cslist_selChGbCd option:eq(0)").attr("selected", "selected");
	$("#cslist_selActStCd option:eq(0)").attr("selected", "selected");
	$("#cslist_selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#cslist_selContType option:eq(0)").attr("selected", "selected");
	$("#cslist_selContType option:eq(0)").attr("selected", "selected");
	$("#cslist_selContTxt").val("");
	
	$("#cslist_selFrDate").val(getDate());
	$("#cslist_selToDate").val(getDate());
	
	$("#cslist_tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#cslist_tblCounselList").trigger("reloadGrid");
	
	counselInitInfo("list");
	
	// setSelectBoxWithCodeIntvLgCd("selCnslSrchIntvLgCd", "전체", "90027", "",
	// "", "all", window.sessionStorage.getItem("CNTR_CD"));
	// setObjSelectBoxWithCode("selCnslSrchCallGbCd", "전체", "", g_ListPopup,
	// "90010", ""); // 채널구분 셋팅
	
	// $("#cslist_selSrchIntvExCd").val("all").trigger("change");
    $("#cslist_selSrchIntvLgCd").val("all").trigger("change");
	
	// 재조회
	setTimeout(function(){$("#cslist_btnSearch").trigger("click");}, 1000);
}

function setSelectBoxWithUser()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data)
		{
			$("#cslist_selCounselNm").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
		
				if(g_usrId==state.USR_ID){
					// 상담사 본인것만 조회
					value += "<option selected value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				}else{
					value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				}
			});
			
			$("#cslist_selCounselNm").append(value);
			$("#cslist_selCounselNm").trigger("change");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 엑셀저장 버튼 클릭 이벤트
function btnExcelPopup_clickEvent()
{
	var arrStDate = $("#cslist_selFrDate").val().split("-");
	var assLtDate = $("#cslist_selToDate").val().split("-");
	var stDate = new Date(arrStDate[0], arrStDate[1] - 1, arrStDate[2]);
	var ltDate = new Date(assLtDate[0], assLtDate[1] - 1, assLtDate[2]);
	var betweenDate = (ltDate.getTime() - stDate.getTime()) / 1000 / 60 / 60 / 24;
	
	if(betweenDate > 30)
	{
		alert("30일이 넘는 기간은 엑셀로 다운로드 하실 수 없습니다.");
		return;	
	}
	
	excelDownLoad(getContextPath() + "/excel/counsel/counsellist.do", getJsonStrCounselListExcel(g_srchtype, g_srchval, g_srchDtType, g_usrId));

}

// 청취 버튼 클릭 이벤트
// function listenRecPopup(recUrl)
// {
// if(recUrl != null && recUrl != "")
// {
// var width = 400;
// var height = 180;
// var top = window.screenTop + (screen.height - height) / 2;
// var left = window.screenLeft + (screen.width - width) / 2;
//		
// var paramURL = "http://172.16.34.151/recsee/interface/VocPlayer.php?file=" +
// recUrl;
// var option = "width=" + width + ", height=" + height + ",
// toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no,
// top=" + top + ",left=" + left +"";
//		
// var newWindow = window.open(paramURL, "RECSEE", option);
// newWindow.focus();
// }
// }

// init Page
$(document).ready(function()
{	
	g_ListPopup = "CHILD";
	g_popup = "CHILD";
	counselDateTimePicker();
	counselInitInfo("list");
	counselButtonEvent();
	
	datePicker("#cslist_selFrDate");
	datePicker("#cslist_selToDate");
	datePicker("#cslist_resvFrDate");
	datePicker("#cslist_resvToDate");
	$("#cslist_optSrchtype").val("all");
	$("#cslist_tfSrchval").val("");
	$("#cslist_selFrDate").val(getDate());
	$("#cslist_selToDate").val(getDate());
	
	$("#cslist_tfSrchval").show();
//	$("#cslist_selSrchKeyWordCd").hide();
	$("#cslist_selSrchAddrCd").hide();
	
		// 상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");
	 $("#cslist_selCounselNm").prop("disabled", true);
     $("#cslist_btnExcelPopup").hide();
	} 	
	
	if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100"){
		setSelectBoxWithAgent("cslist_selCounselNm", "전체", g_ListPopup,"all","","","","","" );
	}else{
		setSelectBoxWithAgent("cslist_selCounselNm", "전체", g_ListPopup,window.sessionStorage.getItem("USR_ID"),"","","","","" );
	}
	
	setObjSelectBoxWithCode("cslist_selChGbCd", "전체", "", g_ListPopup, "90009", "");	// 채널구분
																				// 셋팅
	setObjSelectBoxWithCode("cslist_selActStCd", "전체", "", g_ListPopup, "90013", "");	// 처리상태
																				// 셋팅
	setObjSelectBoxWithCode("cslist_selActTypeCd", "전체", "", g_ListPopup, "90014", "");	// 채널구분
																					// 셋팅
	setObjSelectBoxWithCode("cslist_selCallGb", "전체", "", g_ListPopup, "90010", "");	// 민원처리상태
	
//	setObjSelectBoxWithCode("cslist_selSrchKeyWordCd", "", "",g_ListPopup,"90025", "0");	// 키워드
	
	//20.09.08 주소검색 추가
	setObjSelectBoxWithCode("cslist_selSrchAddrCd", "전체", "",g_ListPopup,"98002", "");	// 주소

// setSelectBoxWithCode("selTrnrActStCd", "전체", "90300", "", "", ""); // 민원처리상태

    /*
	 * setObjectSelectBoxWithCode2("selSrchIntvExCd", "전체", "1", g_ListPopup,
	 * "00000000", "all", "CHANGE");
	 * 
	 * $("#cslist_selSrchIntvExCd").bind("change", function() {
	 * setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "2", g_ListPopup,
	 * $("#cslist_selSrchIntvExCd").val(), "", "CHANGE");+///~
	 * 
	 * $("#cslist_selSrchIntvLgCd").bind("change", function() {
	 * setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "3", g_ListPopup,
	 * $("#cslist_selSrchIntvLgCd").val(), "", "CHANGE"); });
	 * 
	 * $("#cslist_selSrchIntvMdCd").bind("change", function() {
	 * setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "4", g_ListPopup,
	 * $("#cslist_selSrchIntvMdCd").val(),"","CHANGE"); });
	 */
	setObjectSelectBoxWithCode2("cslist_selSrchIntvLgCd", "전체", "1", g_ListPopup, "00000000", "all", "CHANGE");
	

	$("#cslist_selSrchIntvLgCd").bind("change", function() 
	{
		setObjectSelectBoxWithCode2("cslist_selSrchIntvMdCd", "전체", "2", g_ListPopup, $("#cslist_selSrchIntvLgCd").val(), "", "CHANGE");
	});
	
	$("#cslist_selSrchIntvMdCd").bind("change", function() 
	{
		setObjectSelectBoxWithCode2("cslist_selSrchIntvSmCd", "전체", "3", g_ListPopup, $("#cslist_selSrchIntvMdCd").val(),"","CHANGE");
	});
	$("#cmscsp_POPUP").val("CHILD");
	// comCounsel 공통하단
	 comCounselSpecLoad();

    // $("#cslist_selSrchIntvExCd").trigger("change");
	$("#cslist_selSrchIntvLgCd").trigger("change");
	
	$("#cmscsp_callBackTable").css("display", "none");
	
	$("#cslist_selDtType").html("");	
	$("#cslist_selDtType").append("<option value='dt'>접수일</option> <option value='resvDt'>예약일</option><option value='divDt'>분배일</option><option value='sucDt'>완료일</option>");
	$("#cslist_selDtType").val("dt");
	$("#cslist_tblCounselList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCounselList($("#cslist_optSrchtype").val(), $("#cslist_tfSrchval").val(),  $("#cslist_selDtType").val(), g_usrId)
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["ID", "녹취경로","녹취ID","등록일","상담사ID", "수정자ID", "접수일시", "상담사", "민원인명", "전화번호", "상담유형", "처리유형", "상담결과", "통화구분", "수신동의","민원처리결과", "녹취듣기"],
        // colNames : ["ID", "녹취경로","녹취ID","등록일","상담사ID", "특분류","접수일시", "상담사",
		// "민원인명", "전화번호", "상담유형", "처리유형", "상담결과", "통화구분", "위치동의","민원처리결과",
		// "녹취듣기"],
	
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
	   	 	{ name : "RECD_ID", index : "RECD_ID", hidden:true },
	   	 	{ name : "CALL_ID", index : "CALL_ID" ,hidden:true },
	   	 	{ name : "RCV_DT", index : "RCV_DT" ,hidden:true },
	   	 	{ name : "RCV_USR_ID", index : "RCV_USR_ID" ,hidden:true },
	   	 	{ name : "MOD_USR_ID", index : "MOD_USR_ID" ,hidden:true },
	   	 	// { name : "INTV_EX_CD", index : "INTV_EX_CD" ,hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 90 },
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 60 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 70, hidden:true },
			{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 70 },
			{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 240 },			
			{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 50 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 60, formatter:fnStatusFormatter },
			// { name : "RCV_CONT_TTL", index : "RCV_CONT_TTL", align : "left",
			// width : 180 },
			{ name : "CALL_GB_NM_ENG", index : "CALL_GB_NM_ENG", align : "center", width : 50 },
			{ name : "INFM_YN", index : "INFM_YN", align : "center", width : 50 },
	   		{ name : "TRNR_ACT_ST_NM", index : "TRNR_ACT_ST_NM", align : "center", width : 80, hidden:true },
			{ name : "REC_BUTTON", align : "center", width: 50 }
	   	],
	   	sortname : "RCV_DT_FORMAT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#cslist_pgCounselList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		$("#cslist_POPUP").val("CHILD");
	   		var row = $("#cslist_tblCounselList").getRowData(rowid);	   			   			   		
	   		counselInitTable(row.TCKT_ID, "list", "counsel");
	   	},
	   	gridComplete : function()
	   	{
	   		var ids = $(this).getDataIDs();
	   		
	   		// 녹취 버튼 표시
	   		for(var i = 0; i < ids.length; i++)
	   		{
	   			var rowId = ids[i];
	   			var row = $(this).getRowData(rowId);

	   			// 특이민원 색상 //고쳐야함
                // if(row.INTV_EX_CD=="70000000"){
	   			//if(row.INTV_LG_CD=="70000000"){
		   			if(row.INTV_LG_CD=="90000000"){
	   				 $("#cslist_tblCounselList").setRowData(rowId,false,{background:"#ffb3b3"});
	   			}
	   			
	   			if(row.CALL_ID != null && row.CALL_ID != "")
	   			{
	   				// 청취 키 (녹취날짜 + con_id + agentId)
					var rec_param=row.RCV_DT+"|"+row.CALL_ID+"|"+row.RECD_ID;
		   			
					//2018.11.19 상담사는 자신것만 들을 수 있다.
		   			var rec_visible = "";
		   			if(window.sessionStorage.getItem("USR_GRD_CD") == "010100" &&
		   					window.sessionStorage.getItem("USR_ID") != row.MOD_USR_ID){
		   				rec_visible = " display:none; ";
		   			}
		   			
					var recBtn = "<button class='button' style='width: 50px;"+ rec_visible +"' id='rec_" + row.TCKT_ID + "' " + "name='" + rec_param + "'>청취</button>";
		   			$(this).jqGrid("setRowData", rowId, { REC_BUTTON : recBtn });
		   			$("#rec_" + row.TCKT_ID).bind("click", fnReclisten);
		   			
	   			}
	   		}
	   		
	   
	   		// in, out 건수 표시
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/counsel/externalCorpInsert.do",
				data : "pJson=" + getJsonStrCounselListCnt($("#cslist_optSrchtype").val(), $("#cslist_optSrchtype").val() == "srchPhone" ? $("#cslist_tfSrchval").val().replace(/-/gi, "") : $("#cslist_tfSrchval").val(),  $("#cslist_selDtType").val(), $("#cslist_selCounselNm").val()),
				success : function(data)
				{
					if(data != 0)
					{
						$("#cslist_labCnslListInOutCnt").html("IN : " + data.INCNT.toString() + ", OUT : " + data.OUTCNT.toString());
					}
				},
				error : function(data, status, err) 
				{
					
				}
			});
	   		
	   	}
	}).jqGrid("navGrid", "#cslist_pgCounselList", {edit : false, add : false, del : false, search : false});
		
	// 조회 버튼 클릭 이벤트 등록
	$("#cslist_btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#cslist_btnInit").bind("click", initEvent);
	
	$("#cslist_optSrchtype").bind("change", function ()
	{
		var selval=$("#cslist_optSrchtype").val();
//		if(selval=="srchKeyWord"){
		if(selval=="srchAddr"){
			$("#cslist_tfSrchval").hide();
//			$("#cslist_selSrchKeyWordCd").show();
			$("#cslist_selSrchAddrCd").show();
		}else{
			$("#cslist_tfSrchval").show();
//			$("#cslist_selSrchKeyWordCd").hide();
			$("#cslist_selSrchAddrCd").hide();
			$("#cslist_selSrchAddrCd").val("all");
			
		}
		
	});
		
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#cslist_tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	$("#cslist_selContTxt").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	// 엑셀저장 버튼 클릭 이벤트 등록
	$("#cslist_btnExcelPopup").bind("click", btnExcelPopup_clickEvent);
	
	$("#cslist_chkNotUse").bind("click", function()
	{
		setSelectBoxWithUser();
	});
	
	/*
	 * 21.02.19 : 방향키(위/아래)로 상담이력 조회 가능하도록 추가
	 * 21.03.15 : 복사기능이 막히는 현상이 있어서 제어키일때만 scroll lock 되도록 변경
	 * 
	 */
		$("#cslist_tblCounselList").keydown(function(key) {
			var rowid = $("#cslist_tblCounselList").jqGrid("getGridParam","selrow");	 // 선택한 rownum, default : 1
			var rownum = $("#cslist_tblCounselList").jqGrid("getGridParam","rowNum");	 // 한페이지에 보여주는 total 갯수
			var page = $("#cslist_tblCounselList").jqGrid("getGridParam","page");		 // 현재 페이지
			var lastpage = $("#cslist_tblCounselList").jqGrid("getGridParam","lastpage");// 마지막 페이지
			var totrec = $("#cslist_tblCounselList").jqGrid("getGridParam","reccount");	 // 현재 페이지 total record
			
			if (key.keyCode == 13 || key.keyCode == 40 || key.keyCode == 32) { // 엔터, 방향키 down, 스페이스바
				
				if(lastpage == page && totrec == rowid){
					// 마지막 값일때는 동작 X
					return false;
				}else{
					rowid++;
					if(rowid==parseInt(rownum)+1){ // ex) 1 == 11 -> 다음페이지로 넘어갔을때 rowid 1로 초기화 
						rowid=1;
						$("#cslist_tblCounselList").setGridParam({
					        page : page+1,
							rowNum : rownum,
					        gridComplete : function() {
					        	// 녹취 버튼 표시
					        	var ids = $(this).getDataIDs();
					        	for(var i = 0; i < ids.length; i++)
						   		{
						   			var rowId = ids[i];
						   			var row = $(this).getRowData(rowId);
						   			
						   			if(row.CALL_ID != null && row.CALL_ID != "")
						   			{
						   				// 청취 키 (녹취날짜 + con_id + agentId)
										var rec_param=row.RCV_DT+"|"+row.CALL_ID+"|"+row.RECD_ID;
							   			
										//2018.11.19 상담사는 자신것만 들을 수 있다.
							   			var rec_visible = "";
							   			if(window.sessionStorage.getItem("USR_GRD_CD") == "010100" &&
							   					window.sessionStorage.getItem("USR_ID") != row.MOD_USR_ID){
							   				rec_visible = " display:none; ";
							   			}
							   			
										var recBtn = "<button class='button' style='width: 50px;"+ rec_visible +"' id='rec_" + row.TCKT_ID + "' " + "name='" + rec_param + "'>청취</button>";
							   			$(this).jqGrid("setRowData", rowId, { REC_BUTTON : recBtn });
							   			$("#rec_" + row.TCKT_ID).bind("click", fnReclisten);
							   			
						   			}
						   		}
					        	
					        	if(rownum>10) $("#cslist_tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop(0);	//스크롤 맨 위로 이동
					            $("#cslist_tblCounselList").jqGrid("setSelection", rowid, true);
					            $("#cslist_tblCounselList").focus();
					        }
					    }).trigger("reloadGrid");
					}else{
						if(rownum>10) $("#cslist_tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop($("#cslist_tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop() + 25); //스크롤 아래로 한칸씩 이동
						$("#cslist_tblCounselList").jqGrid("setSelection", rowid, true);
					}
				}
				var row = $("#cslist_tblCounselList").getRowData(rowid);
				counselInitTable(row.TCKT_ID, "list", "counsel");
				key.preventDefault(); // scroll lock
				
			}else if(key.keyCode == 38){ // 방향키 up
				
				if(rowid==1 && page==1){ // 첫번째페이지 && 첫번째row
					// 맨 첫번째 값에 대해서는 이벤트 발생 X
					return false;
				}else{
					if(rowid==1 && page!=1){
						rowid=parseInt(rownum); //이전페이지 맨 마지막 값으로 이동
						$("#cslist_tblCounselList").setGridParam({
					        page : page-1,
							rowNum : rownum,
					        gridComplete : function() {
					        	// 녹취 버튼 표시
					        	var ids = $(this).getDataIDs();
					        	for(var i = 0; i < ids.length; i++)
						   		{
						   			var rowId = ids[i];
						   			var row = $(this).getRowData(rowId);
						   			
						   			if(row.CALL_ID != null && row.CALL_ID != "")
						   			{
						   				// 청취 키 (녹취날짜 + con_id + agentId)
										var rec_param=row.RCV_DT+"|"+row.CALL_ID+"|"+row.RECD_ID;
							   			
										//2018.11.19 상담사는 자신것만 들을 수 있다.
							   			var rec_visible = "";
							   			if(window.sessionStorage.getItem("USR_GRD_CD") == "010100" &&
							   					window.sessionStorage.getItem("USR_ID") != row.MOD_USR_ID){
							   				rec_visible = " display:none; ";
							   			}
							   			
										var recBtn = "<button class='button' style='width: 50px;"+ rec_visible +"' id='rec_" + row.TCKT_ID + "' " + "name='" + rec_param + "'>청취</button>";
							   			$(this).jqGrid("setRowData", rowId, { REC_BUTTON : recBtn });
							   			$("#rec_" + row.TCKT_ID).bind("click", fnReclisten);
							   			
						   			}
						   		}
					        	
					            $("#cslist_tblCounselList").jqGrid("setSelection", rowid, true);
					            $("#cslist_tblCounselList").focus();
					            if(rownum>10) $("#cslist_tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop($("#cslist_tblCounselList").css("height").replace(/px/g, ""));	//스크롤 맨 아래로 이동
					        }
					    }).trigger("reloadGrid");
					}else{
						rowid--;
						if(rownum>10) $("#cslist_tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop($("#cslist_tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop() - 25); //스크롤 위로한칸씩 이동
						$("#cslist_tblCounselList").jqGrid("setSelection", rowid, true);
					}
				}
				var row = $("#cslist_tblCounselList").getRowData(rowid);
				counselInitTable(row.TCKT_ID, "list", "counsel");
				key.preventDefault(); // scroll lock
			}
			
		});
});

function fnReclisten()
{
	var name_by_id = $('#cslist_'+this.id).attr('name');
 		if( this.id == "btnListenRec")	{
 			name_by_id = $("#cslist_hidCallId").val();
 		} else {
 			if(typeof name_by_id == "undefined" || name_by_id == null || name_by_id == '' || name_by_id == "undefined") {
 				name_by_id =this.name;
 			}
 		}
 		// alert("fnReclisten() " + this.id + " : " + name_by_id);
 		listenRecPopup("","","",name_by_id);
}