var g_gridType = "";
var g_srchtype = "";
var g_srchval = "";
var g_srchDtType = "";
var g_usrId = window.sessionStorage.getItem("USR_ID");
var g_listType = "";
var g_usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var g_underSearch = "";

//파라미터 셋팅 UserList
//function getJsonStrUserList_Counsel()
//{
//	// 권한에 따라 셋팅
//	var cntrCd = g_usrGrdCd =="090100"?"":window.sessionStorage.getItem("CNTR_CD");
//	
//	
//	var loParam = {
//		"qt" : "c2VsZWN0TGlzdA==",
//		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
//		"map" : {
//			"key" : "value",
//			"notuse" : false,
//			"chkRetire" : $("input[id=chkNotUse]:checkbox").prop("checked"),
//			"cntr_cd" : cntrCd,
//		}
//	};
//	console.log(JSON.stringify(loParam));
//	return  encodeURIComponent(JSON.stringify(loParam));
//}

//파라미터 셋팅 CounselList
function getJsonStrCounselList(srchtype, srchval, srchDtType, usrId)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	//alert(frDt + "--" + toDt); 
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3Q=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,			
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : g_usrGrdCd,
			"selUsrId" : usrId==null?window.sessionStorage.getItem("USR_ID"):usrId,
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
			// "intv_ex_cd" : $("#selCnslSrchIntvExCd").val(),
			"intv_lg_cd" : $("#selCnslSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selCnslSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#selCnslSrchIntvSmCd").val(),
			"call_gb_cd" : $("#selCnslSrchCallGbCd").val(),
			"keyWord" : $("#selSrchKeyWordCd").val()
			
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CounselListCnt
function getJsonStrCounselListCnt(srchtype, srchval, srchDtType, usrId)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");

	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3RjbnQ=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : g_usrGrdCd,
			"selUsrId" : usrId,
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
//			"srchDtType" : 'dt',
			"selContType" : $("#selContType").val(),
			"selContTxt" : $("#selContTxt").val(),
			"selCnslCsVltn" : $("#selCnslCsVltn").val(),
			// "intv_ex_cd" : $("#selCnslSrchIntvExCd").val(),
			"intv_lg_cd" : $("#selCnslSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selCnslSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#selCnslSrchIntvSmCd").val(),
			"call_gb_cd" : $("#selCnslSrchCallGbCd").val(),
			"keyWord" : $("#selSrchKeyWordCd").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 counselListExcel
function getJsonStrCounselListExcel(srchtype, srchval, srchDtType, usrId)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
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
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
			"srchDtType" : srchDtType,
			"selContType" : $("#selContType").val(),
			"selContTxt" : $("#selContTxt").val(),
			"selCnslCsVltn" : $("#selCnslCsVltn").val(),
			// "intv_ex_cd" : $("#selCnslSrchIntvExCd").val(),
			"intv_lg_cd" : $("#selCnslSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selCnslSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#selCnslSrchIntvSmCd").val(),
			"call_gb_cd" : $("#selCnslSrchCallGbCd").val(),
			"keyWord" : $("#selSrchKeyWordCd").val(),
			"sidx" : $("#tblCounselList").getGridParam("sortname"),
			"sord" : $("#tblCounselList").getGridParam("sortorder"),
			"title" : "상담이력목록" + setDownLoadName($("#selFrDate").val(), $("#selToDate").val()),
			"colWidth" : [25, 20, 20, 20, 20, 20, 15, 30, 20, 20],
			"colName" : ["RCV_DT_FORMAT", "CORP_NM", "CUST_NM", "RCV_USR_NM", "CNTCT_INFM_FORMAT", "ACT_TYPE_NM", "ACT_ST_NM", "RCV_CONT", "CALL_GB_NM_ENG", "CALL_TIME"],
			"colHeader" : ["접수일시", "회사/부서", "민원인명", "상담사", "전화번호", "처리유형", "처리상태", "문의내용", "통화구분", "통화시간"],
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 ProgramList
function getJsonStrResvCallList(srchtype, srchval, srchDtType)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();

	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3Q=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,			
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : g_usrGrdCd,
			"selUsrId" : $("#selCounselNm").val(),
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
			"srchDtType" : 'dt',
			"selContType" : $("#selContType").val(),
			"selContTxt" : $("#selContTxt").val(),
			"selCnslCsVltn" : $("#selCnslCsVltn").val(),
			// "intv_ex_cd" : $("#selCnslSrchIntvExCd").val(),
			"intv_lg_cd" : $("#selCnslSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selCnslSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#selCnslSrchIntvSmCd").val(),
			"call_gb_cd" : $("#selCnslSrchCallGbCd").val(),
			"keyWord" : $("#selSrchKeyWordCd").val()
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 resvListExcel
function getJsonStrResvCallListExcel(srchtype, srchval, srchDtType)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();

	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3Q=",
		"map" : {
			"key" : "value",
			"resv" : "Y",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : $("#selCounselNm").val(),
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
			"srchDtType" : srchDtType,
			// "intv_ex_cd" : $("#selCnslSrchIntvExCd").val(),
			"intv_lg_cd" : $("#selCnslSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selCnslSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#selCnslSrchIntvSmCd").val(),
			"call_gb_cd" : $("#selCnslSrchCallGbCd").val(),
			"keyWord" : $("#selSrchKeyWordCd").val(),
			"sidx" : $("#tblResvCallList").getGridParam("sortname"),
			"sord" : $("#tblResvCallList").getGridParam("sortorder"),
			"title" : "예약통화목록" + setDownLoadName($("#selFrDate").val(), $("#selToDate").val()),
			"colWidth" : [25, 25, 20, 20, 20, 25, 25, 20],
			"colName" : ["RCV_DT_FORMAT", "CORP_NM", "CUST_NM", "RCV_USR_NM", "ACT_TYPE_NM", "RESV_DT_FORMAT", "SEND_DT_FORMAT", "ACT_ST_NM"],
			"colHeader" : ["접수일시", "회사/부서", "민원인명", "상담사", "처리유형", "예약일시", "발신일시", "처리상태"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 CallBackList
function getJsonStrCallBackList(srchtype, srchval, srchDtType)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDYuY2FsbEJhY2tsaXN0",
		"map" : {
			"key" : "value",
			"callBack" : "Y",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : $("#selCounselNm").val(),
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchval,
			"srchDtType" : srchDtType
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 counselListExcel
function getJsonStrCallBackListExcel(srchtype, srchval, srchDtType)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDYuY2FsbEJhY2tsaXN0",
		"map" : {
			"key" : "value",
			"callBack" : "Y",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"selUsrId" : $("#selCounselNm").val(),
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selCallbckActStCd" : $("#selCallbckActStCd").val(),
			"srchval" : srchval,
			"srchDtType" : srchDtType,
			"sidx" : $("#tblCallBackList").getGridParam("sortname"),
			"sord" : $("#tblCallBackList").getGridParam("sortorder"),
			"title" : "콜백목록" + setDownLoadName($("#selFrDate").val(), $("#selToDate").val()),
			"colWidth" : [25, 25, 20, 20, 20, 25, 25, 20, 20],
			"colName" : ["CALLBCK_REQ_FORMAT", "CALLBCK_CUST_NM", "CALLBCK_ANI_FORMAT", "CALLBCK_TEL_NO_FORMAT", "CALLBCK_DIV_FORMAT", "RCT_TRY_FORMAT", "TRY_CNT", "CALLBCK_ACT_ST_NM", "CALLBCK_USR_NM"],
			"colHeader" : ["접수일시", "민원인명", "발신자번호", "콜백번호", "분배일시", "처리일시", "시도횟수", "처리상태", "상담사"]
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//function setSelectBoxWithUserCounsel()
//{
//	$.ajax({
//		type : "post",
//		dataType: "json",
//		async : false,
//		url : getContextPath() + "/ajax/user/userList.do",
//		data : "pJson=" + getJsonStrUserList_Counsel(),
//		success : function(data)
//		{
//			$("#selCounselNm").html("");
//			
//			// param값을 JSON으로 파싱
//			var value = "";
//			value += "<option value='all'>전체</option>";
//			
//			$.each(data, function(key, state)
//			{
//				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
//			});
//			
//			$("#selCounselNm").append(value);
//			$("#selCounselNm").trigger("change");
//			if(g_gridType != "counselList")
//				$("#selCounselNm").val(window.sessionStorage.getItem("USR_ID"));
//		},
//		error : function(data, status, err) 
//		{
//			networkErrorHandler(data, status, err);
//		}
//	});
//}

function counselMainInitEvent()
{
	$("#tfSrchval").show();
	$("#selSrchKeyWordCd").hide();
			
	datePicker("#selFrDate");
	datePicker("#selToDate");
	
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	$("#optSrchtype").val("all");
	$("#tfSrchval").val("");
	$("#selContTxt").val("");
	
	//상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{ 
		$("#selCounselNm").prop("disabled", true); 
	} 	

	if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100"){
		setSelectBoxWithAgent("selCounselNm", "전체", "main","","","","","","" );
	}else{
		setSelectBoxWithAgent("selCounselNm", "전체", "main",window.sessionStorage.getItem("USR_ID"),"","","","","" );
	}
	//setSelectBoxWithUserCounsel();
	setSelectBoxWithCode("selChGbCd", "전체", "90009", "", "", "");	// 처리상태 셋팅
	setSelectBoxWithCode("selActStCd", "전체", "90013", "", "", "");	// 처리상태 셋팅	
	setSelectBoxWithCode("selCnslSrchCallGbCd", "전체", "90010", "", "", "all");
	
}

//조회 버튼 클릭 이벤트
function btnSearchCnsl_clickEvent()
{
	//alert('searchCnsl Click ' + g_gridType);
	g_srchtype = $("#optSrchtype").val();
	g_srchval = $("#optSrchtype").val().trim() == "srchPhone" ? $("#tfSrchval").val().replace(/-/gi, "").trim() : $("#tfSrchval").val().trim();
	//g_srchDtType = $("#selDtType").val();
	g_usrId = $("#selCounselNm").val();
	
	$("#labCnslListInOutCnt").html("IN : 0, OUT : 0");
	
	counselMainReloadGridType(g_gridType);
}


//초기화 버튼 클릭 이벤트
function initSearchOpt()
{
	g_srchtype = "custNm";
	//if(g_gridType == "counselList")
	if(window.sessionStorage.getItem("USR_GRD_CD") != "010100"){
		g_usrId = "all";
	}else{
		g_usrId = window.sessionStorage.getItem("USR_ID");
	}
		
	$("#optSrchtype").val("all");
	$("#tfSrchval").val("");
	$("#selCounselNm").val(g_usrId);

	$("#selActStCd").val("all");
	
	$("#tfSrchval").show();
	$("#selSrchKeyWordCd").hide();
	
	//$("#selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#selActTypeCd").val("all");
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	 $("#optSrchtype").val("all"); 	
	
	$("#copyCnslRcvCont").hide();	//문의내용 카피
	$("#btnDelete").hide();
	$("#btnUpdate").hide();
	$("#btnListenRec").hide();
	$("#btnTabCustSMS").hide();		//sms아이콘
	$("#cmscsp_btnTabCustSearch").hide();		//민원인 수정버튼

    // setObjectSelectBoxWithCode("selCnslSrchIntvExCd", "전체", "1", "", "","","CHANGE");
	setObjectSelectBoxWithCode("selCnslSrchIntvLgCd", "전체", "1", "", "","","CHANGE");
	setObjectSelectBoxWithCode2("cmscsp_intvLgCd", "선택", "1", g_popup, "00000000", "", "CHANGE");	// 상담유형 대분류 셋팅
	$("#selCnslSrchCallGbCd").val("all");
	
	g_srchtype = $("#optSrchtype").val();
	g_srchval = $("#optSrchtype").val() == "srchPhone" ? $("#tfSrchval").val().replace(/-/gi, "") : $("#tfSrchval").val();
	g_usrId = $("#selCounselNm").val();
	 
	$("#labCnslListInOutCnt").html("IN : 0, OUT : 0");
	
	counselMainReloadGridType(g_gridType);
	
	//counselInitTable("", "list", "counsel");
	counselInitInfo("list");
}

//초기화 버튼 클릭 이벤트
function initReloadEvent()
{
	g_srchtype = "custNm";
	if(g_gridType == "counselList")
		g_usrId = "all";
	else
		g_usrId = window.sessionStorage.getItem("USR_ID");
	
	$("#optSrchtype").val("all");
	$("#tfSrchval").val("");
	$("#selCounselNm").val(g_usrId);
	$("#selChGbCd option:eq(0)").attr("selected", "selected");
	
	if(g_gridType == "resvCallList")
		$("#selActStCd").val("010000");
	else
		$("#selActStCd").val("all");
	
	$("#selContType option:eq(0)").attr("selected", "selected");
	$("#selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#selCallbckActStCd option:eq(0)").attr("selected", "selected");
	
	$("#selContType option:eq(0)").attr("selected", "selected");
	$("#selContTxt").val("");
	
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	g_srchtype = $("#optSrchtype").val();
	g_srchval = $("#optSrchtype").val() == "srchPhone" ? $("#tfSrchval").val().replace(/-/gi, "") : $("#tfSrchval").val();
	g_srchDtType = $("#selDtType").val();
	g_usrId = $("#selCounselNm").val();
	
	counselMainReloadGridType(g_gridType);
	
	counselInitInfo("list");
	
	$("#copyCnslRcvCont").hide();	//문의내용 카피
	$("#btnDelete").hide();
	$("#btnUpdate").hide();
	$("#callbckBase").hide();
	$("#btnListenRec").hide();
	$("#btnSmsSpec").hide();
	$("#btnOutBoundCall").hide();
	
	//setSelectBoxWithCodeIntvLgCd("selCnslSrchIntvLgCd", "전체", "90027", "", "", "all", window.sessionStorage.getItem("CNTR_CD"));
	setSelectBoxWithCode("selCnslSrchCallGbCd", "전체", "90010", "", "", "all");
	
}

function searInitEvent()
{
	g_srchtype = "custNm";
	
	//if(g_gridType == "counselList") 
	if (window.sessionStorage.getItem("USR_GRD_CD") != "010100"){
		//상담사는 자기것만
		g_usrId = "all";
		//g_usrId = window.sessionStorage.getItem("USR_ID");
	}else{
		g_usrId = window.sessionStorage.getItem("USR_ID");
		//$("#selCounselNm").prop("disabled", true);
	}
	
	$("#optSrchtype").val("all");
	$("#tfSrchval").val("");
	$("#selCounselNm").val(g_usrId);
	$("#selChGbCd option:eq(0)").attr("selected", "selected");
	
	if(g_gridType == "resvCallList")
		$("#selActStCd").val("010000");
	else
		$("#selActStCd").val("all");
	
	$("#selContType option:eq(0)").attr("selected", "selected");
	$("#selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#selCallbckActStCd option:eq(0)").attr("selected", "selected");
	
	$("#selContType option:eq(0)").attr("selected", "selected");
	$("#selContTxt").val("");
	
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	g_srchtype = $("#optSrchtype").val();
	g_srchval = $("#optSrchtype").val() == "srchPhone" ? $("#tfSrchval").val().replace(/-/gi, "") : $("#tfSrchval").val();
	g_srchDtType = $("#selDtType").val();
	g_usrId = $("#selCounselNm").val();
}

function counselMainBtnEvent()
{
	g_srchtype = $("#optSrchtype").val();
	g_srchval = $("#optSrchtype").val() == "srchPhone" ? $("#tfSrchval").val().replace(/-/gi, "") : $("#tfSrchval").val();
	g_srchDtType = $("#selDtType").val();
	g_usrId = $("#selCounselNm").val();
	
	// 조회 버튼 클릭 이벤트 등록
	$("#btnSearchCnsl").bind("click", btnSearchCnsl_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInitCnsl").bind("click", initReloadEvent);

	$("#optSrchtype").bind("change", function ()
	{
		var selval=$("#optSrchtype").val();
		if(selval=="srchKeyWord"){
			$("#tfSrchval").hide();
			$("#selSrchKeyWordCd").show();
		}else{
			$("#tfSrchval").show();
			$("#selSrchKeyWordCd").hide();
		}
		
	});
		
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearchCnsl_clickEvent();
	});
	
	$("#selContTxt").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearchCnsl_clickEvent();
	});
	
	$("#btnExcel").hide();
	$("#btnExcel").bind("click", btnExcel_clickEvent);
	/*
	$("#chkNotUse").bind("click", function()
	{
		setSelectBoxWithUser();
	});
	*/
}

function btnExcel_clickEvent()
{
	var arrStDate = $("#selFrDate").val().split("-");
	var assLtDate = $("#selToDate").val().split("-");
	var stDate = new Date(arrStDate[0], arrStDate[1] - 1, arrStDate[2]);
	var ltDate = new Date(assLtDate[0], assLtDate[1] - 1, assLtDate[2]);
	var betweenDate = (ltDate.getTime() - stDate.getTime()) / 1000 / 60 / 60 / 24;
	
	if(betweenDate > 30)
	{
		alert("30일이 넘는 기간은 엑셀로 다운로드 하실 수 없습니다.");
		return;	
	}
	
	if(g_gridType == "counselList")
	{
		//excelDownLoad(getContextPath() + "/excel/counsel/counsellist.do", getJsonStrCounselListExcel(g_srchtype, g_srchval, g_srchDtType, g_usrId));
		
		var url = getContextPath() + "/excel/counsel/counsellist.do?pJson=" + getJsonStrCounselListExcel(g_srchtype, g_srchval, g_srchDtType, g_usrId);
		window.open(url);
	}
	else if(g_gridType == "resvCallList")
	{
		//excelDownLoad(getContextPath() + "/excel/user/userList.do", getJsonStrResvCallListExcel(g_srchtype, g_srchval, g_srchDtType));
		
		var url = getContextPath() + "/excel/user/userList.do?pJson=" + getJsonStrResvCallListExcel(g_srchtype, g_srchval, g_srchDtType);
		window.open(url);
	}
	else
	{
		//excelDownLoad(getContextPath() + "/excel/counsel/callBackList.do", getJsonStrCallBackListExcel(g_srchtype, g_srchval, g_srchDtType));
		
		var url = getContextPath() + "/excel/counsel/callBackList.do?pJson=" + getJsonStrCallBackListExcel(g_srchtype, g_srchval, g_srchDtType);
		window.open(url);
	}
}

function counselMainGridType(typeId)
{
	g_gridType = typeId;
	searInitEvent();
	
	var dt = "<option value='dt'>접수일</option>";
	var resvDt = "<option value='resvDt'>예약일</option>";
	var divDt = "<option value='divDt'>분배일</option>";
	var sucDt = "<option value='sucDt'>완료일</option>";
	
	//$("#selDtType").html("");
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());

	//$("#selCnslCsVltn option:eq(0)").attr("selected", "selected");
	$("#selChGbCd option:eq(0)").attr("selected", "selected");
	$("#selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#selActStCd option:eq(0)").attr("selected", "selected");
	$("#selCallbckActStCd option:eq(0)").attr("selected", "selected");

//select obj data	
//setSelectBoxWithCodeIntvLgCd("selCnslSrchInstClass", "전체", "1", "", "", "all", window.sessionStorage.getItem("CNTR_CD"));
	//setSelectBoxWithCode("selCnslSrchCallGbCd", "전체", "90010", "", "", "all");
	setObjSelectBoxWithCode("selCnslSrchCallGbCd", "전체", "","PARENT","90010", "");
	setObjSelectBoxWithCode("selSrchKeyWordCd", "", "","main","90025", "0");	// 키워드
	
	$("#searchNm").html("상담사");
	$("#tfPetitioner").hide();
	$("#selCounselNm").show();
	
	if(g_gridType == "counselList")
	{
		counselMainCounselListGrid();
	}
	else if(g_gridType == "resvCallList")
	{
		//$("#selDtType").append(dt + resvDt);
		counselMainResvCallGrid();
	}
	else if (g_gridType == "transferList")
	{
		$("#searchNm").html("민원인");
		$("#selCounselNm").hide();
		$("#tfPetitioner").show();
		//counselMainTransferListGrid();
	}
	else if (g_gridType == "callbackList")
	{
		//$("#selDtType").append(dt + divDt + sucDt);
		counselMainCallBackListType();
	} 
}


function counselMainGridType2(typeId)
{
	/*
	$("#divEmrgncyInfoBtn").attr("class", "tab_img_gray");
	$("#divRCTabSearchBtn").attr("class", "tab_img_gray");
	$("#divRCTabCnslListBtn").attr("class", "tab_img");
	$("#divRCTabCallbackListBtn").attr("class", "tab_img_gray");
	$("#divRCTabSMSListBtn").attr("class", "tab_img_gray");
	$("#divRCTabMessageBtn").attr("class", "tab_img_gray");
	$("#divRCTabHappyCallBtn").attr("class", "tab_img_gray");
	$("#divRCTabCnsSmsBtn").attr("class", "tab_img_gray"); // 문자상담
	
	$("#divRCTabEmrgncyInfo").css("display", "none");
	$("#divRCTabSearch").css("display", "none");
	$("#divRCTabCnslList").css("display", "block");
	$("#divRCTabSMSList").css("display", "none");
	$("#divRCTabMessage").css("display", "none");
	$("#divRCTabHappyCall").css("display", "none");
	$("#divRCTabCnsSms").css("display", "none");
    */
    g_gridType = typeId;
	searInitEvent();
	
	var dt = "<option value='dt'>접수일</option>";
	var resvDt = "<option value='resvDt'>예약일</option>";
	var divDt = "<option value='divDt'>분배일</option>";
	var sucDt = "<option value='sucDt'>완료일</option>";
	
	// 메인하단 미처리 날짜, 이관대기 날짜 변경
	$("#selFrDate").val(getDate());
	if(g_underSearch=="civilComplaint"){
	    $("#selFrDate").val(getPrvDay("D", 1, "-"));
	}else if(g_underSearch=="call" || g_underSearch=="Resv"){//hhs 20.04.09
		$("#selFrDate").val(getDate());
	}
	else{
	    $("#selFrDate").val(getPrvDay("M", 1, "-"));
	}
	
	$("#selChGbCd option:eq(0)").attr("selected", "selected");
	$("#selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#selActStCd option:eq(0)").attr("selected", "selected");
	$("#selCallbckActStCd option:eq(0)").attr("selected", "selected");

	setObjSelectBoxWithCode("selCnslSrchCallGbCd", "전체", "","PARENT","90010", "");
	setObjSelectBoxWithCode("selSrchKeyWordCd", "", "","main","90025", "0");	// 키워드
	
	$("#searchNm").html("상담사");
	$("#tfPetitioner").hide();
	$("#selCounselNm").show();
	
	if(g_gridType == "counselList")
	{
		counselMainCounselListGrid();
	}
}


function counselMainReloadGridType(typeId)
{
	if(typeId == "counselList")
	{
		$("#tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
		$("#tblCounselList").trigger("reloadGrid");
		counselInitInfo(typeId);
	}
	else if(typeId == "resvCallList")
	{
		$("#tblResvCallList").jqGrid("setGridParam", {postData : {pJson : getJsonStrResvCallList(null, g_srchval, g_srchDtType)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
		$("#tblResvCallList").trigger("reloadGrid");
		counselInitInfo(typeId);
	}
	else
	{
		$("#tblCallBackList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCallBackList(null, g_srchval, g_srchDtType)}, page : 1, sortname : "CALLBCK_REQ_FORMAT", sortorder : "desc"});
		$("#tblCallBackList").trigger("reloadGrid");
		callbackInitInfo();
		counselInitInfo(typeId);
	}
}

function counselMainCounselListGrid()
{
	g_listType = "counsel";
	$("#cnslType").show();
	$("#divCounselList").css("display", "block");
	$("#labCnslListInOutCnt").show();
	$("#divResvCallList").css("display", "none");
	$("#divCallBackList").css("display", "none");
	$("#cmscsp_callBackTable").css("display", "none");
	$("#cmscsp_counselComTable").css("display", "block");
	//$("#cnslCsVltnTxt").show();
	//$("#selCnslCsVltn").show();
	
	$("#chgb").hide();
	$("#selChGbCd").hide();
	$("#actType").show();
	$("#selActTypeCd").show();
	$("#selActStCd").show();
	$("#selCallbckActStCd").hide();
	setSelectBoxWithCode("selActTypeCd", "전체", "90014", "", "", "");	// 처리유형 셋팅
	
	// 상담결과 초기상태를 '전체'로 설정
	$("#selActStCd").val('all');
	
	//$("#btnDelete").hide();    // 탭변경시 버튼 숨기지 않음
	//$("#btnUpdate").hide();    // 탭변경시 버튼 숨기지 않음
	//$("#btnListenRec").hide(); // 탭변경시 버튼 숨기지 않음
	$("#callbckBase").hide();
	$("#btnSmsSpec").hide();
	$("#selContType").show();
	$("#selContTxt").show();
	$("#btnOutBoundCall").hide();
	
	if (g_underSearch == 'No') 
	{
	    //$("#selFrDate").val(getPrvDay("M", 1, "-"));
		$("#selActStCd").val('010000');
		counselMainReloadGridType("counselList");
	} else if (g_underSearch == 'Resv') {
		$("#selActTypeCd").val("020000");
		$("#selActStCd").val('010000');
		counselMainReloadGridType("counselList");
	}else if(g_underSearch == "call"){
    	$("#selActStCd").val('all');
    	counselMainReloadGridType("counselList");
	}else if(g_underSearch == 'civilComplaint') {
    	$("#selActTypeCd").val("030100");
    	$("#selActStCd").val("030400");
    	counselMainReloadGridType("counselList");
	}

	
	$("#tblCounselList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCounselList($("#optSrchtype").val(), $("#tfSrchval").val(), 'dt', $("#selCounselNm").val())
		},
		jsonReader :
		{
			repeatitems: false
		},
		//colNames : ["ID", "접수일시", "회사/부서", "민원인명", "상담사", "전화번호", "처리유형", "처리상태", "문의내용", "통화구분", "통화시간"],
        // colNames : ["ID", "EXCD", "접수일시", "상담사", "전화번호", "민원인명", "처리유형", "상담결과", "문의내용", "통화구분", "통화시간"],
		colNames : ["ID", "LGCD", "접수일시", "상담사", "전화번호", "민원인명", "처리유형", "상담결과", "문의내용", "통화구분", "통화시간"],
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
	   	 	{ name : "INTV_LG_CD", index : "INTV_LG_CD", align : "center", width : 60, hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 90 },
			//{ name : "CORP_NM", index : "CORP_NM", align : "center", width : 100 },
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 70 },
			{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 70 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 70 },
			{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 60 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 60, formatter:fnStatusFormatter },
			{ name : "RCV_CONT_TTL", index : "RCV_CONT_TTL", align : "left", width : 150 },
			{ name : "CALL_GB_NM_ENG", index : "CALL_GB_NM_ENG", align : "center", width : 50 },
	   		{ name : "CALL_TIME", index : "CALL_TIME", align : "center", width : 50 }
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
	   	pager : "#pgCounselList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var row = $("#tblCounselList").getRowData(rowid);  
	   		counselInitTable(row.TCKT_ID, "list", "counsel");
	   	},
	   	gridComplete : function()
	   	{
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/counsel/externalCorpInsert.do",
				data : "pJson=" + getJsonStrCounselListCnt($("#optSrchtype").val(), $("#optSrchtype").val() == "srchPhone" ? $("#tfSrchval").val().replace(/-/gi, "") : $("#tfSrchval").val(),  $("#selDtType").val(), $("#selCounselNm").val()),
				success : function(data)
				{
					if(data != 0)
					{
						$("#labCnslListInOutCnt").html("IN : " + data.INCNT.toString() + ", OUT : " + data.OUTCNT.toString());
					}
				},
				error : function(data, status, err) 
				{
					
				}
			});
	   		
	   		//특이민원 색상 //고쳐야함
	   		var ids = $("#tblCounselList").getDataIDs();
	   		$.each(ids,	function(idx, rowId){
	   				rowData = $("#tblCounselList").getRowData(rowId);
                	// if(rowData.INTV_EX_CD=="70000000"){
	   			//	if(rowData.INTV_LG_CD=="70000000"){
		   			if(rowData.INTV_LG_CD=="90000000"){
	   					 $("#tblCounselList").setRowData(rowId,false,{background:"#ffb3b3"});
	   				}
	   			}
	   		);
	   	 
		}
	}).jqGrid("navGrid", "#pgCounselList", {edit : false, add : false, del : false, search : false});
	
}

function counselMainResvCallGrid()
{
	g_listType = "counsel";
	$("#cnslType").show();
	$("#divCounselList").css("display", "none");
	$("#labCnslListInOutCnt").hide();
	$("#divResvCallList").css("display", "block");
	$("#divCallBackList").css("display", "none");
	$("#cmscsp_callBackTable").css("display", "none");
	$("#cmscsp_counselComTable").css("display", "block");
	$("#cnslCsVltnTxt").hide();
	$("#selCnslCsVltn").hide();
	$("#chgb").show();
	$("#selChGbCd").show();
	$("#actType").show();
	$("#selActTypeCd").show();
	$("#selActStCd").show();
	$("#selCallbckActStCd").hide();
	$("#selActTypeCd").val("020000");	// 처리상태 셋팅
	
	$("#copyCnslRcvCont").hide();	//com 문의내용 카피
	
	$("#selContType").hide();
	$("#selContTxt").hide();
	$("#btnDelete").hide();
	$("#btnUpdate").hide();
	$("#callbckBase").hide();
	$("#btnListenRec").hide();
	$("#btnSmsSpec").hide();
	$("#btnOutBoundCall").hide();
		
	$("#tblResvCallList").jqGrid(
		{
			url : getContextPath() + "/jqgrid/counsel/counselList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrResvCallList($("#optSrchtype").val(), $("#optSrchtype").val() == "srchPhone" ? $("#tfSrchval").val().replace(/-/gi, "") : $("#tfSrchval").val(),  $("#selDtType").val())
			},
			jsonReader :
			{
				repeatitems: false
			},
			colNames : ["ID", "접수일시", "회사/부서", "민원인명", "상담사", "처리유형", "예약일시", "발신일시", "처리상태", "통화구분", "통화시간"],
		   	colModel :
		   	[
		   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
				{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 130 },
				{ name : "CORP_NM", index : "CORP_NM", align : "center", width : 150 },
				{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 80 },
				{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 80 },
				{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 80 },			
				{ name : "RESV_DT_FORMAT", index : "RESV_DT_FORMAT", align : "center", width : 130 },			
				{ name : "SEND_DT_FORMAT", index : "SEND_DT_FORMAT", align : "center", width : 130 },			
				{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 80 },
				{ name : "CALL_GB_NM_ENG", index : "CALL_GB_NM_ENG", align : "center", width : 70 },
		   		{ name : "CALL_TIME", index : "CALL_TIME", align : "center", width : 80 }
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
		   	pager : "#pgResvCallList",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onSelectRow : function(rowid)
		   	{
		   		var row = $("#tblResvCallList").getRowData(rowid);	   			   			   		
		   		counselInitTable(row.TCKT_ID, "list", "resv");
		   	},
		   	onPaging : function(pgButton)
		   	{
		   		
		   	}
		}).jqGrid("navGrid", "#pgResvCallList", {edit : false, add : false, del : false, search : false
	});
//	counselMainReloadGridType(g_gridType);
}

/**
 * 콜백
 */
function counselMainCallBackListType()
{
	g_listType = "callBack";
	$("#cnslType").hide();
	$("#divCounselList").css("display", "none");
	$("#labCnslListInOutCnt").hide();
	$("#divResvCallList").css("display", "none");
	$("#divCallBackList").css("display", "block");
	$("#cmscsp_callBackTable").css("display", "block");
	$("#actType").hide();
	$("#selCallbckActStCd").show();
	setSelectBoxWithCode("selActTypeCd", "전체", "90014", "", "", "");	// 처리유형  셋팅
	
	// 상담결과 초기상태를 '미완료'로 설정
	$("#selActStCd").val('010000');
	
	//$("#selFrDate").val("");
	//$("#selToDate").val("");
	
	$("#selContType").hide();
	$("#selContTxt").hide();
	$("#btnDelete").hide();
	$("#btnUpdate").hide();
	$("#callbckBase").hide();
	$("#btnListenRec").hide();
	$("#btnSmsSpec").hide();
	$("#btnOutBoundCall").hide();
		
	$("#cmscsp_counselComTable").css("display", "none");

	$("#tblCallBackList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/callBackList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCallBackList("","","")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["ID", "접수일시", "상담사", "발신자번호", "콜백번호", "분배일시", "처리일시", "시도횟수", "상담결과", "처리상태"],
	   	colModel :
	   	[
	   	 	{ name : "CALLBCK_ID", index : "CALLBCK_ID", hidden:true },
			{ name : "CALLBCK_REQ_FORMAT", index : "CALLBCK_REQ_FORMAT", align : "center", width : 90 },
			{ name : "CALLBCK_USR_NM", index : "CALLBCK_USR_NM", align : "center", width : 40 },
			//{ name : "CALLBCK_CUST_NM", index : "CALLBCK_CUST_NM", align : "center", width : 50 },
			{ name : "CALLBCK_ANI_FORMAT", index : "CALLBCK_ANI_FORMAT", align : "center", width : 60 },
			{ name : "CALLBCK_TEL_NO_FORMAT", index : "CALLBCK_TEL_NO_FORMAT", align : "center", width : 60 },
			{ name : "CALLBCK_DIV_FORMAT", index : "CALLBCK_DIV_FORMAT", align : "center", width : 80 },
			{ name : "RCT_TRY_FORMAT", index : "RCT_TRY_FORMAT", align : "center", width : 80 },			
			{ name : "TRY_CNT", index : "TRY_CNT", align : "center", width : 40 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 40, formatter:fnStatusFormatter},
			{ name : "CALLBCK_ACT_ST_NM", index : "CALLBCK_ACT_ST_NM", align : "center", width : 40, formatter:fnStatusFormatter },			
	   	],
	   	sortname : "CALLBCK_REQ_FORMAT",
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
	   	pager : "#pgCallBackList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var row = $("#tblCallBackList").getRowData(rowid);
	   		callBackInitTable(row.CALLBCK_ID, row.TRY_CNT, "callbck");
	   	},
	   	onPaging : function(pgButton)
	   	{
	   		
	   	}
	}).jqGrid("navGrid", "#pgCallBackList", {edit : false, add : false, del : false, search : false});
//	counselMainReloadGridType(g_gridType);
}

function initbutton(){
	$("#btnSearchCnsl").button();
	$("#btnSearchCnsl").addClass("button");
}



function initdivRCTabCnslList()
{
				
	//$("#btnControlCounsel").css("height","30px"); 
	//initbutton();
	counselMainInitEvent();
	counselMainBtnEvent();
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnOptInit").bind("click", initSearchOpt);

    // $("#selCnslSrchIntvExCd").bind("change", function()
    // {
    //     setObjectSelectBoxWithCode("selCnslSrchIntvLgCd", "전체", "2", "", $("#selCnslSrchIntvExCd").val(),"","CHANGE");
    // });
    //
    // $("#selCnslSrchIntvLgCd").bind("change", function()
    // {
    //     setObjectSelectBoxWithCode("selCnslSrchIntvMdCd", "전체", "3", "", $("#selCnslSrchIntvLgCd").val(),"","CHANGE");
    // });
    //
    // $("#selCnslSrchIntvMdCd").bind("change", function()
    // {
    //     setObjectSelectBoxWithCode("selCnslSrchIntvSmCd", "전체", "4", "", $("#selCnslSrchIntvMdCd").val(),"","CHANGE");
    // });

	setObjectSelectBoxWithCode("selCnslSrchIntvLgCd", "전체", "1", "", "","","");
	
	$("#selCnslSrchIntvLgCd").bind("change", function()
	{
		setObjectSelectBoxWithCode("selCnslSrchIntvMdCd", "전체", "2", "", $("#selCnslSrchIntvLgCd").val(),"","CHANGE");
	});
	
	$("#selCnslSrchIntvMdCd").bind("change", function()
	{
		setObjectSelectBoxWithCode("selCnslSrchIntvSmCd", "전체", "3", "", $("#selCnslSrchIntvMdCd").val(),"","CHANGE");
	});

	$("#selCnslSrchIntvLgCd").trigger("change");
	comCounselSpecLoad();
//	//상담유형 대분휴
//	$("#intvExCd").bind("change", function(e) {
//		var selval=e.target.value;
//		if(selval=="90000000"){  
//		   // 긴급통화 코드 
//			$("#actTypeCd").val("010000").trigger("change");
//			$("#tfCnslClaimant").show();
//			$("#tfCnslClaimantPhoneNum").show();
//		}else{
//			
//		}
//		setObjectSelectBoxWithCode("intvLgCd", "미선택", "2", "", $("#intvExCd").val(), "", "CHANGE");
//	});
//
//	$("#intvLgCd").bind("change", function() {
//		setObjectSelectBoxWithCode("intvMdCd", "미선택", "3", "", $("#intvLgCd").val(), "", "CHANGE");
//	});
//
//	$("#intvMdCd").bind("change", function() {
//		setObjectSelectBoxWithCode("intvSmCd", "미선택", "4", "", $("#intvMdCd").val(), "", "");
//	});	
	$(window).bind('resize', function() {
	    jQuery("#tblCounselList").setGridWidth($("#divRCTabCnslList").width(), true);
	}).trigger('resize');
	
	$("#cmscsp_btnTabCustSearch").hide();                              // 고객정보 수정 버튼
	
	/*
	 * 20.11.05 : 상담이력 그리드에서 엔터 클릭시 한칸씩 내려가도록 수정
	 * 21.02.19 : 방향키(위/아래) 가능하도록 추가
	 * 21.03.15 : 복사기능이 막히는 현상이 있어서 제어키일때만 scroll lock 되도록 변경
	 * 
	 */
	$("#tblCounselList").keydown(function(key) {
		var rowid = $("#tblCounselList").jqGrid("getGridParam","selrow");		// 선택한 rownum, default : 1
		var rownum = $("#tblCounselList").jqGrid("getGridParam","rowNum");		// 한페이지에 보여주는 total 갯수
		var page = $("#tblCounselList").jqGrid("getGridParam","page");			// 현재 페이지
		var lastpage = $("#tblCounselList").jqGrid("getGridParam","lastpage");	// 마지막 페이지
		var totrec = $("#tblCounselList").jqGrid("getGridParam","reccount");	// 현재 페이지 total record
		
		if (key.keyCode == 13 || key.keyCode == 40 || key.keyCode == 32) { // 엔터, 방향키 down, 스페이스바
			
			if(lastpage == page && totrec == rowid){
				// 맨 마지막 값에 대해서는 동작X
				return false;
			}else{
				rowid++;
				if(rowid==parseInt(rownum)+1){ // ex) 1 == 11 -> 다음페이지로 넘어갔을때 rowid 1로 초기화 
					rowid=1;
					$("#tblCounselList").setGridParam({
				        page : page+1,
						rowNum : rownum,
				        gridComplete : function() {
				        	if(rownum>10) $("#tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop(0);	//스크롤 맨 위로 이동
				            $("#tblCounselList").jqGrid("setSelection", rowid, true);
				            $("#tblCounselList").focus();
				        }
				    }).trigger("reloadGrid");
				}else{
					if(rownum>10) $("#tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop($("#tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop() + 25); //스크롤 아래로 한칸씩 이동
					$("#tblCounselList").jqGrid("setSelection", rowid, true);
				}
			}
			var row = $("#tblCounselList").getRowData(rowid);
			counselInitTable(row.TCKT_ID, "list", "counsel");
			key.preventDefault(); // scroll lock
			
		}else if(key.keyCode == 38){ // 방향키 up
			
			if(rowid==1 && page==1){ // 첫번째페이지 && 첫번째row
				// 맨 첫번째 값에 대해서는 동작X
				return false;
			}else{
				if(rowid==1 && page!=1){
					rowid=parseInt(rownum); //이전페이지 맨 마지막 값으로 이동
					$("#tblCounselList").setGridParam({
				        page : page-1,
						rowNum : rownum,
				        gridComplete : function() {
				            $("#tblCounselList").jqGrid("setSelection", rowid, true);
				            $("#tblCounselList").focus();
				            if(rownum>10) $("#tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop($("#tblCounselList").css("height").replace(/px/g, ""));	//스크롤 맨 아래로 이동
				        }
				    }).trigger("reloadGrid");
				}else{
					rowid--;
					if(rownum>10) $("#tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop($("#tblCounselList").closest(".ui-jqgrid-bdiv").scrollTop() - 25); //스크롤 위로한칸씩 이동
					$("#tblCounselList").jqGrid("setSelection", rowid, true);
				}
			}
			var row = $("#tblCounselList").getRowData(rowid);
			counselInitTable(row.TCKT_ID, "list", "counsel");
			key.preventDefault(); // scroll lock
		}
		
	});
	
}