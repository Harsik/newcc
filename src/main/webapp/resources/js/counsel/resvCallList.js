// 조회 조건 및 조회 값
var g_listType = "counsel";
var g_srchtype = "all";
var g_srchval = "";
var g_frDt = "";
var g_toDt = "";
var g_usrId = window.sessionStorage.getItem("USR_ID");
var g_selCounselNm = "";
var g_selChGbCd = "";
var g_selActTypeCd = "";
var g_selActStCd = "";
var g_srchDtType = "dt";

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
			"resv" : "Y",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : $("#selCounselNm").val(),
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : '020000',
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchval,
			"srchDtType" : srchDtType,
			"intv_lg_cd" : $("#selCnslSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selCnslSrchIntvMdCd").val(),
			"call_gb_cd" : $("#selCnslSrchCallGbCd").val()
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
			"srchval" : srchval,
			"srchDtType" : srchDtType,
			"intv_lg_cd" : $("#selCnslSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selCnslSrchIntvMdCd").val(),
			"call_gb_cd" : $("#selCnslSrchCallGbCd").val(),
			"sidx" : $("#tblResvCallList").getGridParam("sortname"),
			"sord" : $("#tblResvCallList").getGridParam("sortorder"),
			"title" : "예약통화목록" + setDownLoadName($("#selFrDate").val(), $("#selToDate").val()),
			"colWidth" : [25, 25, 20, 20, 20, 25, 25, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
			"colName" : ["RCV_DT_FORMAT", "CORP_NM", "CUST_NM", "RCV_USR_NM", "ACT_TYPE_NM", "RESV_DT_FORMAT", "SEND_DT_FORMAT", "ACT_ST_NM", "INTV_LG_NM", "INTV_MD_NM", "CST_TYPE_NM", "CST_COMP_NM", "CH_GB_NM", "CALL_GB_NM_ENG", "CALL_TIME", "CNTCT_INFM_FORMAT", "RCV_CONT", "ACT_CONT", "MOD_USR_NM", "MOD_DT_FORMAT", "TCKT_ID"],
			"colHeader" : ["접수일시", "회사/부서", "고객명", "상담사", "처리유형", "예약일시", "발신일시", "처리상태", "상담대분류", "상담중분류", "민원인유형", "고객성향", "채널구분", "통화구분", "통화시간", "전화번호", "문의내용", "추가의견", "수정자", "수정일시", "접수번호"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center"]
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
	g_srchtype = $("#selSrchType").val();
	g_srchval = $("#tfSrchval").val();
	g_srchDtType = $("#selDtType").val();
	g_usrId = $("#selCounselNm").val();
	
	if (g_srchval == null || g_srchval == undefined) {
		g_srchval = '';
	}
	
	$("#tblResvCallList").jqGrid("setGridParam", {postData : {pJson : getJsonStrResvCallList(g_srchtype, g_srchval, g_srchDtType)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#tblResvCallList").trigger("reloadGrid");
	
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
	$("#selActTypeCd").val("020000");
	
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	setSelectBoxWithCodeIntvLgCd("selCnslSrchIntvLgCd", "전체", "90027", "", "", "all", window.sessionStorage.getItem("CNTR_CD"));
	setSelectBoxWithCode("selCnslSrchCallGbCd", "전체", "90010", "", "", "all");
	
	$("#tblResvCallList").jqGrid("setGridParam", {postData : {pJson : getJsonStrResvCallList(g_srchtype, g_srchval, g_srchDtType)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#tblResvCallList").trigger("reloadGrid");
	
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
	
	excelDownLoad(getContextPath() + "/excel/counsel/resvCalllist.do", getJsonStrResvCallListExcel(g_srchtype, g_srchval, g_srchDtType));
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

	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	//$("#selCnslSrchIntvLgCd").bind("change", function()
	//{
	//	setSelectBoxWithCode("selCnslSrchIntvMdCd", "전체", "90028", "90027", $("#selCnslSrchIntvLgCd").val(), "all");
	//});

	setSelectBoxWithUser();
	// 초기값을 미완료로 설정
	setSelectBoxWithCode("selActStCd", "전체", "90013", "", "", "010000");	// 처리상태 셋팅
	
	$("#callBackTable").css("display", "none");
	
	$("#selDtType").html("");
	$("#selDtType").append("<option value='rcvDt'>접수일</option> <option value='resvDt' selected>예약일</option>");
	
	$("#tblResvCallList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrResvCallList(g_srchtype, g_srchval, g_srchDtType)
		},
		jsonReader :
		{
			repeatitems: false
		},
		//colNames : ["ID", "접수일시", "회사/부서", "고객명", "상담사", "처리유형", "예약일시", "발신일시", "처리상태", "통화구분", "통화시간"],
		colNames : ["ID", "접수일시", "고객명", "예약번호", "예약일시", "발신일시", "상담사", "처리유형", "상담결과"],
	   	colModel :
	   	[	
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 130 },
			//{ name : "CORP_NM", index : "CORP_NM", align : "center", width : 150 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 80 },
			{ name : "RESV_TEL_NO", index : "RESV_TEL_NO", align : "center", width: 80 },
			{ name : "RESV_DT_FORMAT", index : "RESV_DT_FORMAT", align : "center", width : 130 },
			{ name : "SEND_DT_FORMAT", index : "SEND_DT_FORMAT", align : "center", width : 130 },
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 80 },
			{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 80 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 80, formatter:fnStatusFormatter }
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
	}).jqGrid("navGrid", "#pgResvCallList", {edit : false, add : false, del : false, search : false});	
	
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
