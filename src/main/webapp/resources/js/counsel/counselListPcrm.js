// 조회 조건 및 조회 값
var g_listType = "counsel";
var g_srchval = "";
var g_usrId = "all";
var g_frDt = "";
var g_toDt = "";
var g_selCounselNm = "";
var g_selChGbCd = "";
var g_selActTypeCd = "";
var g_selActStCd = "";
var g_srchDtType = "dt";
//var g_ListPopup = "CHILD";
var g_ListPopup = "PCRM2";

// 파라미터 셋팅 CounselList
function getJsonStrCounselList(srchval, srchDtType, usrId)
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
			"srchtype" : "srchContent",
			"srchDtType" : "rcvDt",
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#cslist_selChGbCd").val(),
			"selActTypeCd" : $("#cslist_selActTypeCd").val(),
			"selActStCd" : $("#cslist_selActStCd").val(),
			"srchval" : srchval,
			/* "intv_ex_cd" : $("#cslist_selSrchIntvExCd").val(), */
			"intv_lg_cd" : $("#cslist_selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#cslist_selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#cslist_selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#cslist_selCallGb").val(),
			"keyWord" : $("#cslist_selSrchKeyWordCd").val(),
			"selAddr" : $("#cslist_selAddr").val(), //주소
			"selAddrResult" : $("#cslist_selAddrResult").val(), //음성인식결과
			"loc_yn" : "",
			"cust_id" : cust_id
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅 CounselListCnt
function getJsonStrCounselListCnt(srchval, srchDtType, usrId)
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
			"srchtype" : "srchContent",
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#cslist_selChGbCd").val(),
			"selActTypeCd" : $("#cslist_selActTypeCd").val(),
			"selActStCd" : $("#cslist_selActStCd").val(),
			"srchval" : srchval,
			"srchDtType" : "rcvDt",
			"selContType" : $("#cslist_selContType").val(),
			"selContTxt" : $("#cslist_selContTxt").val(),
			"selCnslCsVltn" : $("#cslist_selCnslCsVltn").val(),
			/* "intv_ex_cd" : $("#cslist_selSrchIntvExCd").val(), */
			"intv_lg_cd" : $("#cslist_selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#cslist_selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#cslist_selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#cslist_selCnslSrchCallGbCd").val(),
			"keyWord" : $("#cslist_selSrchKeyWordCd").val(),
			"loc_yn" : "",
			"selAddr" : $("#cslist_selAddr").val(), //주소
			"selAddrResult" : $("#cslist_selAddrResult").val(), //음성인식결과
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅 counselListExcel
function getJsonStrCounselListExcel(srchval, srchDtType, usrId)
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
			"srchtype" : "srchContent",
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#cslist_selChGbCd").val(),
			"selActTypeCd" : $("#cslist_selActTypeCd").val(),
			"selActStCd" : $("#cslist_selActStCd").val(),
			"srchval" : srchval,
			"srchDtType" : "rcvDt",
			"selContType" : $("#cslist_selContType").val(),
			"selContTxt" : $("#cslist_selContTxt").val(),
			"selCnslCsVltn" : $("#cslist_selCnslCsVltn").val(),
			/* "intv_ex_cd" : $("#cslist_selSrchIntvExCd").val(), */
			"intv_lg_cd" : $("#cslist_selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#cslist_selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#cslist_selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#cslist_selCallGb").val(), //통화구분
			"keyWord" : $("#cslist_selSrchKeyWordCd").val(),
			"loc_yn" : $("#cslist_selLocationAgree").val(),
			"sidx" : $("#cslist_tblCounselList").getGridParam("sortname"),
			"sord" : $("#cslist_tblCounselList").getGridParam("sortorder"),
			"title" : "상담이력목록" + setDownLoadName($("#cslist_selFrDate").val(), $("#cslist_selToDate").val()),
			"selAddr" : $("#cslist_selAddr").val(), //주소
			"selAddrResult" : $("#cslist_selAddrResult").val(), //음성인식결과
			"colWidth" : [20, 20, 20, 20, 20, 20, 20],
			"colName" : ["RCV_DT", "INTV_LG_NM", "INTV_MD_NM", "INTV_SM_NM", "ACT_ST_NM", "H_ADDR", "CALL_GB_NM_ENG"],
			"colHeader" : ["접수일시", "상담대분류", "상담중분류", "상담소분류", "처리유형", "주소", "통화구분"],
			"colAlign" : ["center", "center", "center", "center", "center","center","center"]
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
	g_srchval = $("#cslist_tfSrchval").val();
	g_srchDtType = $("#cslist_selDtType").val();
	g_usrId = $("#cslist_selCounselNm").val();
	
	$("#cslist_labCnslListInOutCnt").html("IN : 0, OUT : 0");
	
	$("#cslist_tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT DESC, INTV_LG_CD ASC, H_ADDR", sortorder : "ASC"});
	$("#cslist_tblCounselList").trigger("reloadGrid");
	
//	counselInitInfo("list","CHILD");
	counselInitInfo("list","PCRM2");
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

//	$("#cslist_optSrchtype").val("all");
	$("#cslist_tfSrchval").val("");
	$("#cslist_selCounselNm").val(g_usrId);
	
	$("#cslist_tfSrchval").show();
	$("#cslist_selSrchKeyWordCd").hide();
	
	$("#cslist_selChGbCd option:eq(0)").attr("selected", "selected");
	$("#cslist_selActStCd option:eq(0)").attr("selected", "selected");
	$("#cslist_selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#cslist_selContType option:eq(0)").attr("selected", "selected");
	$("#cslist_selContType option:eq(0)").attr("selected", "selected");
	$("#cslist_selContTxt").val("");
	
	$("#cslist_selFrDate").val(getDate());
	$("#cslist_selToDate").val(getDate());
	
	$("#cslist_tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT DESC, INTV_LG_CD ASC, H_ADDR", sortorder : "ASC"});
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

function setSelectBoxWithAddr()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/addrList.do",
		data : "pJson=" + getJsonStrAddrList(),
		success : function(data)
		{
			$("#cslist_selAddr").html("");
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
			
			$("#cslist_selAddr").append(value);
			$("#cslist_selAddr").trigger("change");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 주소데이터 셋팅
function getJsonStrAddrList(){
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
	
	excelDownLoad(getContextPath() + "/excel/counsel/counsellist.do", getJsonStrCounselListExcel(g_srchval, g_srchDtType, g_usrId));

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
	initCodeBook("PCRM");
	setCategoryCodeListToObject2("cslist_selSrchIntvLgCd","","10000000", "Main");
	
//	g_ListPopup = "CHILD";
//	g_popup = "CHILD";
	g_ListPopup = "PCRM2";
	g_popup = "PCRM2";
	counselDateTimePicker();
	counselInitInfo("list");
	counselButtonEvent();
	
	datePicker("#cslist_selFrDate");
	datePicker("#cslist_selToDate");
	$("#cslist_tfSrchval").val("");
	
	//열리기 전에 날짜를 띄움
	$("#cslist_selFrDate").val(opener.$("#srcCnslFrDate").val() == null ? getDate() : opener.$("#srcCnslFrDate").val());
	$("#cslist_selToDate").val(opener.$("#srcCnslToDate").val() == null ? getDate() : opener.$("#srcCnslToDate").val());
	
	$("#cslist_tfSrchval").show();
	$("#cslist_selSrchKeyWordCd").hide();
	
		// 상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");
//	 $("#cslist_selCounselNm").prop("disabled", true);
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
	
	setObjSelectBoxWithCode("cslist_selSrchKeyWordCd", "", "",g_ListPopup,"90025", "0");	// 키워드
	
	setObjSelectBoxWithCode("cslist_selAddr", "전체", "all",g_popup,"98002", "");	// 주소검색 selectBox 추가 hhs 20.07.02
	setObjSelectBoxWithCode("cslist_selAddrResult", "전체", "",g_popup,"98003", "");	// 주소검색 selectBox 추가 hhs 20.07.02
	$("#cslist_selAddr").val(selAddr == "" ? "all" : selAddr); //주소셋팅
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
	setObjectSelectBoxWithCode2("cslist_selSrchIntvLgCd", "선택", "1", g_ListPopup, "00000000", "all", "CHANGE");
	

	$("#cslist_selSrchIntvLgCd").bind("change", function() 
	{
		setObjectSelectBoxWithCode2("cslist_selSrchIntvMdCd", "선택", "2", g_ListPopup, $("#cslist_selSrchIntvLgCd").val(), "", "CHANGE");
	});
	
	$("#cslist_selSrchIntvMdCd").bind("change", function() 
	{
		setObjectSelectBoxWithCode2("cslist_selSrchIntvSmCd", "선택", "3", g_ListPopup, $("#cslist_selSrchIntvMdCd").val(),"","CHANGE");
	});
//	$("#cmscsp_POPUP").val("CHILD");
	$("#cmscsp_POPUP").val("PCRM2");
	// comCounsel 공통하단
	 comCounselSpecLoad();

    // $("#cslist_selSrchIntvExCd").trigger("change");
	$("#cslist_selSrchIntvLgCd").trigger("change");
	
	$("#cmscsp_callBackTable").css("display", "none");
	
	$("#cslist_selCallGb").val(1); //통화구분 default:인바운드
	
	$("#cslist_selDtType").html("");	
	$("#cslist_selDtType").append("<option value='dt'>접수일</option> <option value='resvDt'>예약일</option><option value='divDt'>분배일</option><option value='sucDt'>완료일</option>");
	$("#cslist_selDtType").val("dt");
	$("#cslist_tblCounselList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
//			pJson : getJsonStrCounselList($("#cslist_optSrchtype").val(), $("#cslist_tfSrchval").val(),  $("#cslist_selDtType").val(), g_usrId)
			pJson : getJsonStrCounselList($("#cslist_tfSrchval").val(),  $("#cslist_selDtType").val(), g_usrId)
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["ID", "녹취경로","녹취ID","등록일","상담사ID", "수정자ID", "접수일시", "상담사", "민원인명", "상담유형", "처리유형", "상담결과", "주소", "통화구분","민원처리결과"],//, "녹취듣기"],
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
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 60, hidden:true},
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 70, hidden:true },
//			{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 70 },
			{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 240 },			
			{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 50 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 60, formatter:fnStatusFormatter },
			// { name : "RCV_CONT_TTL", index : "RCV_CONT_TTL", align : "left",
			// width : 180 },
			{ name : "H_ADDR", index : "H_ADDR", align : "center", width : 50 },
			{ name : "CALL_GB_NM_ENG", index : "CALL_GB_NM_ENG", align : "center", width : 50 },
//			{ name : "LOC_YN", index : "LOC_YN", align : "center", width : 50 },
	   		{ name : "TRNR_ACT_ST_NM", index : "TRNR_ACT_ST_NM", align : "center", width : 80, hidden:true },
//			{ name : "REC_BUTTON", align : "center", width: 50 }
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
//	   		$("#cslist_POPUP").val("CHILD");
	   		$("#cslist_POPUP").val("PCRM2");
	   		var row = $("#cslist_tblCounselList").getRowData(rowid);	   			   			   		
	   		counselInitTable(row.TCKT_ID, "list", "counsel");
	   		$("#cmscsp_counselComTable").attr("disabled", true);
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
//				data : "pJson=" + getJsonStrCounselListCnt($("#cslist_optSrchtype").val(), $("#cslist_optSrchtype").val() == "srchPhone" ? $("#cslist_tfSrchval").val().replace(/-/gi, "") : $("#cslist_tfSrchval").val(),  $("#cslist_selDtType").val(), $("#cslist_selCounselNm").val()),
				data : "pJson=" + getJsonStrCounselListCnt($("#cslist_tfSrchval").val(),  $("#cslist_selDtType").val(), $("#cslist_selCounselNm").val()),
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
	setSelectBoxWithUser();
//	$("#cslist_chkNotUse").bind("click", function()
//	{
//		setSelectBoxWithUser();
//	});
	
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