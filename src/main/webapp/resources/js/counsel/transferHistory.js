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




//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{

	
	$("#tblTransferList").jqGrid("setGridParam", {postData : {pJson : getJsonStrTransferList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "TRNR_RQS_DT_FORMAT", sortorder : "desc"});
	$("#tblTransferList").trigger("reloadGrid");
	

}


// init Page
$(document).ready(function()
{	

	datePicker("#selFrDate");
	datePicker("#selToDate");
	

	
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
		colNames : ["ID", "접수일시", "회사/부서", "고객명", "상담사", "이관수신자", "채널구분", "처리유형", "상담유형", "처리상태"],
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
	   	height : "235",
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
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	
});
