// 조회 조건 및 조회 값
var g_listType = "counsel";
var g_srchtype = "all";
var g_srchval = "";
var g_usrId = window.sessionStorage.getItem("USR_ID");
var g_frDt = "";
var g_toDt = "";
var g_selCounselNm = "";
var g_selChGbCd = "";
var g_selActTypeCd = "";
var g_selActStCd = "";
var g_srchDtType = "dt";
// 파라미터 셋팅 ProgramList
function getJsonStrTransferList(srchtype, srchval, srchDtType)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDcudHJhbnNmZXJsaXN0",
		"map" : {
			"key" : "value",
			"callBack" : "Y",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"selUsrId" : g_usrId,
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
function getJsonStrTransferListExcel(srchtype, srchval, srchDtType, usrId)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDcudHJhbnNmZXJsaXN0",
		"map" : {
			"key" : "value",
			"callBack" : "Y",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"selUsrId" : g_usrId,
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchval,
			"srchDtType" : srchDtType,
			"sidx" : $("#tblTransferList").getGridParam("sortname"),
			"sord" : $("#tblTransferList").getGridParam("sortorder"),
			"title" : "이관목록" + setDownLoadName($("#selFrDate").val(), $("#selToDate").val()),
			"colWidth" : [25, 25, 20, 20, 20, 20, 20, 55, 20],
			"colName" : ["TRNR_RQS_DT_FORMAT", "CORP_NM,", "CUST_NM", "RQS_USR_NM", "RCVN_USR_NM", "CH_GB_NM", "ACT_TYPE_NM", "INTV_CD", "ACT_ST_NM"],
			"colHeader" : ["접수일시", "회사/부서", "민원인명", "상담사", "이관수신자", "채널구분", "처리유형", "상담유형", "처리상태"],
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 ProgramList
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var cntrCd = "";
	var teamCd = "";
	
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
			"chkRetire" : true,
			"cntr_cd" : cntrCd,
			"teamCd" : teamCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchtype = $("#optSrchtype").val();
	g_srchval = $("#tfSrchval").val();
	g_srchDtType = $("#selDtType").val();
	g_usrId = $("#selCounselNm").val();
	
	$("#tblTransferList").jqGrid("setGridParam", {postData : {pJson : getJsonStrTransferList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "TRNR_RQS_DT_FORMAT", sortorder : "desc"});
	$("#tblTransferList").trigger("reloadGrid");
	
	counselInitInfo("list");
}

//초기화 버튼 클릭 이벤트
function initEvent()
{
	g_srchtype = "custNm";
	g_srchval = "";
	g_srchDtType = "dt";
	g_usrId = window.sessionStorage.getItem("USR_ID");
	
	$("#optSrchtype").val("all");
	$("#tfSrchval").val("");
	
	$("#selCounselNm").val(g_usrId);
	$("#selChGbCd option:eq(0)").attr("selected", "selected");
	$("#selActStCd option:eq(0)").attr("selected", "selected");
	$("#selActTypeCd option:eq(0)").attr("selected", "selected");
	
	$("#tblTransferList").jqGrid("setGridParam", {postData : {pJson : getJsonStrTransferList("", "", "", g_usrId)}, page : 1, sortname : "TRNR_RQS_DT_FORMAT", sortorder : "desc"});
	$("#tblTransferList").trigger("reloadGrid");
	
	counselInitInfo("list");

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
			
			$("#selCounselNm").html("");			
			// param값을 JSON으로 파싱			
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#selCounselNm").append(value);
			$("#selCounselNm").trigger("change");
			$("#selCounselNm").val(window.sessionStorage.getItem("USR_ID"));
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}


//업무담당자 버튼 클릭 이벤트
function btnResponsibleReg_clickEvent()
{
	var width = 1200;
	var height = 800;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/management/responsibleReg.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "responsibleReg", option);
	newWindow.focus();
}

//엑셀저장 버튼 클릭 이벤트
function btnExcelPopup_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/counsel/transferList.do", getJsonStrTransferListExcel(g_srchtype, g_srchval, g_srchDtType, g_usrId));
	
	//var url = getContextPath() + "/excel/counsel/transferList.do?pJson=" + getJsonStrTransferListExcel(g_srchtype, g_srchval, g_srchDtType, g_usrId);
	//window.open(url);
}

// init Page
$(document).ready(function()
{	
	counselDateTimePicker();
	counselInitInfo("list");
	counselButtonEvent();
	
	datePicker("#selFrDate");
	datePicker("#selToDate");
	
	$("#optSrchtype").val("all");
	$("#tfSrchval").val("");	
	/*$("#selFrDate").val(getDate());*/	
	
	setSelectBoxWithUser();
	setSelectBoxWithCode("selChGbCd", "전체", "90009", "", "", "");	// 처리상태 셋팅
	setSelectBoxWithCode("selActStCd", "전체", "90013", "", "", "");	// 처리상태 셋팅
	setSelectBoxWithCode("selActTypeCd", "전체", "90014", "", "", "");	// 처리상태 셋팅
	
	$("#callBackTable").css("display", "none");
	
	$("#selDtType").html("");	
	$("#selDtType").append("<option value='dt'>접수일</option> <option value='sucDt'>완료일</option>");
	
	$("#tblTransferList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/transferList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrTransferList("", "", "", window.sessionStorage.getItem("USR_ID"))
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["ID", "접수일시", "회사/부서", "민원인명", "상담사", "이관수신자", "채널구분", "처리유형", "상담유형", "처리상태"],
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
			{ name : "TRNR_RQS_DT_FORMAT", index : "TRNR_RQS_DT_FORMAT", align : "center", width : 70 },
			{ name : "CORP_NM,", index : "CORP_NM", align : "center", width : 90 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 50 },
			{ name : "RQS_USR_NM", index : "RQS_USR_NM", align : "center", width : 50 },
			{ name : "RCVN_USR_NM", index : "RCVN_USR_NM", align : "center", width : 50 },
			{ name : "CH_GB_NM", index : "CH_GB_NM", align : "center", width : 40 },			
			{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 50 },			
			{ name : "INTV_CD", index : "INTV_CD", align : "center", width : 150 },			
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 50 },
	   	],
	   	sortname : "TRNR_RQS_DT_FORMAT",
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
	   	pager : "#pgTransferList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var row = $("#tblTransferList").getRowData(rowid);	   			   			   		
	   		counselInitTable(row.TCKT_ID, "list");
	   	},
	   	onPaging : function(pgButton)
	   	{	   		
	   		
	   	}
	}).jqGrid("navGrid", "#pgTransferList", {edit : false, add : false, del : false, search : false});

	// 조회 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", initEvent);
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	// 엑셀저장 버튼 클릭 이벤트 등록
	$("#btnExcelPopup").bind("click", btnExcelPopup_clickEvent);
});
