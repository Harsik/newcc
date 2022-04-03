// 조회 조건 및 조회 값
var g_listType = "callBack";
var g_srchtype = "all";
var g_srchval = "";
var g_frDt = "";
var g_toDt = "";
var g_usrId = window.sessionStorage.getItem("USR_ID");
var g_selCounselNm = "";
//var g_selChGbCd = "";
//var g_selActTypeCd = "";
var g_selCallbckActStCd = "";
var g_srchDtType = "dt";

function getJsonStrCallBackList(srchtype, srchval, srchDtType)
{
	var frDt = $("#clbkli_selFrDate").val();
	var toDt = $("#clbkli_selToDate").val();
	
	if($("#clbkli_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#clbkli_selToDate").val() != null)
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
			"usrGrdCd" : parseInt(window.sessionStorage.getItem("USR_GRD_CD")),
			"selUsrId" : $("#clbkli_selCounselNm").val(),
			"chkWorkTm" : $("#chkWorkTm").prop("checked"),
			
			//"selChGbCd" : $("#clbkli_selChGbCd").val(),
			//"selActTypeCd" : $("#clbkli_selActTypeCd").val(),
			"selCallbckActStCd" : $("#clbkli_selCallbckActStCd").val(),
			"srchval" : srchval.replace(/-/g,""),
			"srchDtType" : srchDtType
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 counselListExcel
function getJsonStrCallBackListExcel(srchtype, srchval, srchDtType)
{
	var frDt = $("#clbkli_selFrDate").val();
	var toDt = $("#clbkli_selToDate").val();
	
	if($("#clbkli_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#clbkli_selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDYuY2FsbEJhY2tsaXN0RXhjZWw=",
		"map" : {
			"key" : "value",
			"callBack" : "Y",
			"srchtype" : srchtype,
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : parseInt(window.sessionStorage.getItem("USR_GRD_CD")),
			"selUsrId" : $("#clbkli_selCounselNm").val(),
			//"selChGbCd" : $("#clbkli_selChGbCd").val(),
			//"selActTypeCd" : $("#clbkli_selActTypeCd").val(),
			"selCallbckActStCd" : $("#clbkli_selCallbckActStCd").val(),
			"srchval" : srchval,
			"srchDtType" : srchDtType,
			"sidx" : $("#clbkli_tblCallBackList").getGridParam("sortname"),
			"sord" : $("#clbkli_tblCallBackList").getGridParam("sortorder"),
			"title" : "콜백목록" + setDownLoadName($("#clbkli_selFrDate").val(), $("#clbkli_selToDate").val()),
			"colWidth" : [25, 25, 20, 20, 20, 25, 25, 20, 20],
			"colName" : ["CALLBCK_REQ_FORMAT", "CALLBCK_CUST_NM", "CALLBCK_ANI_FORMAT", "CALLBCK_TEL_NO_FORMAT", "CALLBCK_DIV_FORMAT", "RCT_TRY_FORMAT", "TRY_CNT", "CALLBCK_ACT_ST_NM", "CALLBCK_USR_NM"],
			"colHeader" : ["접수일시", "민원인명", "발신자번호", "콜백번호", "분배일시", "처리일시", "시도횟수", "처리상태", "상담사"]
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 UserList
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
			"notuse" : false,
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
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
	g_srchtype = $("#clbkli_optSrchtype").val();
	g_srchval = $("#clbkli_tfSrchval").val();
	g_srchDtType = $("#clbkli_selDtType").val();
	g_usrId = $("#clbkli_selCounselNm").val();
	
	$("#clbkli_tblCallBackList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCallBackList(g_srchtype, g_srchval, g_srchDtType)}, page : 1, sortname : "CALLBCK_REQ_FORMAT", sortorder : "desc"});
	$("#clbkli_tblCallBackList").trigger("reloadGrid");
	
	counselInitInfo("list","CHILD");
	callbackInitInfo();
}

//초기화 버튼 클릭 이벤트
function initEvent()
{
	g_srchtype = "custNm";
	g_srchval = "";
	g_srchDtType = "dt";
	g_usrId = window.sessionStorage.getItem("USR_ID");
	
	$("#clbkli_optSrchtype").val("all");
	$("#clbkli_tfSrchval").val("");
	$("#clbkli_selCounselNm").val(g_usrId);
	
//	$("#clbkli_selCallbckActStCd option:eq(0)").attr("selected", "selected");
	$("#clbkli_selCallbckActStCd").val("all");

	//$("#clbkli_selActTypeCd").val("050000");
//	$("#clbkli_selFrDate").val(getPrevDate());
	$("#clbkli_selFrDate").val(getDate());
	$("#clbkli_selToDate").val(getDate());
	$("#clbkli_tblCallBackList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCallBackList(g_srchtype, g_srchval, g_srchDtType)}, page : 1, sortname : "CALLBCK_REQ_FORMAT", sortorder : "desc"});
	$("#clbkli_tblCallBackList").trigger("reloadGrid");
	
	counselInitInfo("list");
	callbackInitInfo();
}

function setSelectBoxWithUser()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data)
		{
			$("#clbkli_selCounselNm").html("");			

			// param값을 JSON으로 파싱			
			var value = "";
			value += "<option value='all'>전체</option>";

			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#clbkli_selCounselNm").append(value);
			$("#clbkli_selCounselNm").val(window.sessionStorage.getItem("USR_ID"));
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//엑셀저장 버튼 클릭 이벤트
function btnExcelPopup_clickEvent()
{
	var arrStDate = $("#clbkli_selFrDate").val().split("-");
	var assLtDate = $("#clbkli_selToDate").val().split("-");
	var stDate = new Date(arrStDate[0], arrStDate[1] - 1, arrStDate[2]);
	var ltDate = new Date(assLtDate[0], assLtDate[1] - 1, assLtDate[2]);
	var betweenDate = (ltDate.getTime() - stDate.getTime()) / 1000 / 60 / 60 / 24;
	
	if(betweenDate > 30)
	{
		alert("30일이 넘는 기간은 엑셀로 다운로드 하실 수 없습니다.");
		return;	
	}
	
	excelDownLoad(getContextPath() + "/excel/counsel/callBackList.do", getJsonStrCallBackListExcel(g_srchtype, g_srchval, g_srchDtType));
}

// 이전 날짜를 가져옴
function getPrevDate()
{
	var date = new Date(getDate());
	var oneMonth = new Date(date);
	oneMonth.setDate(oneMonth.getDate() - 3);
	var nm = new Date(oneMonth);
	
	var year = nm.getFullYear();
	var month = nm.getMonth() + 1;
	var day = nm.getDate();
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	
	return year + "-" + month + "-" + day;
}

// init Page
$(document).ready(function()
{	
	g_popup = "CHILD";
	counselDateTimePicker();
	counselInitInfo("list","CHILD");
	callbackInitInfo();
	counselButtonEvent();
	
	datePicker("#clbkli_selFrDate");
	datePicker("#clbkli_selToDate");
	
	$("#clbkli_optSrchtype").val("all");
	$("#clbkli_tfSrchval").val("");	
//	$("#clbkli_selFrDate").val(getPrevDate());
	$("#clbkli_selFrDate").val(getDate());
	$("#clbkli_selToDate").val(getDate());

	if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100"){
		setSelectBoxWithAgent("clbkli_selCounselNm", "전체", "CHILD","","","","","","" );
	}else{
		setSelectBoxWithAgent("clbkli_selCounselNm", "전체", "CHILD",window.sessionStorage.getItem("USR_ID"),"","","","","" );
	}
	
	//setSelectBoxWithUser(); //selCounselNm
	//setSelectBoxWithAgent("clbkli_selCounselNm", "전체", "CHILD", window.sessionStorage.getItem("USR_ID"),"","","","","" );
	//setSelectBoxWithCode("selChGbCd", "전체", "90009", "", "", "");	// 처리상태 셋팅
	//setSelectBoxWithCode("selActTypeCd", "전체", "90014", "", "", "");	// 처리상태 셋팅
	setObjSelectBoxWithCode("clbkli_selCallbckActStCd",  "전체", "","CHILD", "90020", ""); // 콜백처리상태 셋팅 
	
	$("#cmscsp_counselComTable").css("display", "none");
	
	$("#clbkli_selDtType").html("");
	$("#clbkli_selDtType").append("<option value='dt'>접수일</option>");
	//$("#clbkli_selDtType").append("<option value='dt'>접수일</option> <option value='resvDt'>예약일</option>");
	$("#clbkli_btnDelete").hide();

	//comCounsel 공통하단
	 comCounselSpecLoad();
	
	$("#clbkli_tblCallBackList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCallBackList("","","dt")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["ID", "접수일시", "민원인명", "발신자번호", "콜백번호", "분배일시", "처리/시도일시", "시도횟수", "처리상태", "상담사"],
	   	colModel :
	   	[
	   	 	{ name : "CALLBCK_ID", index : "CALLBCK_ID", hidden:true },
			{ name : "CALLBCK_REQ_FORMAT", index : "CALLBCK_REQ_FORMAT", align : "center", width : 90 },
			{ name : "CALLBCK_CUST_NM", index : "CALLBCK_CUST_NM", align : "center", width : 50 },
			{ name : "CALLBCK_ANI_FORMAT", index : "CALLBCK_ANI_FORMAT", hidden:true },
			{ name : "CALLBCK_TEL_NO_FORMAT", index : "CALLBCK_TEL_NO_FORMAT", align : "center", width : 60 },
			{ name : "CALLBCK_DIV_FORMAT", index : "CALLBCK_DIV_FORMAT", align : "center", width : 80 },
			{ name : "RCT_TRY_FORMAT", index : "RCT_TRY_FORMAT", align : "center", width : 80 },			
			{ name : "TRY_CNT", index : "TRY_CNT", align : "center", width : 40 },			
			{ name : "CALLBCK_ACT_ST_NM", index : "CALLBCK_ACT_ST_NM", align : "center", width : 40, formatter:function(cellValue, options, rowdata, action){
			    if(rowdata.CALLBCK_ACT_ST_NM == "할당" && rowdata.AUTO_ASSIGN =="Y"){
				return "<span style='color:blue;'>자동할당</span>";
			    }else if(rowdata.CALLBCK_ACT_ST_NM == "할당" && rowdata.AUTO_ASSIGN =="N"){
				return "<span style='color:blue;'>수동할당</span>";
			    }else if(rowdata.CALLBCK_ACT_ST_NM == "처리중"){
				return "<span style='color:red;'>처리중</span>";
			    }else{
				return cellValue==null?"":cellValue;
			    }			    
			}
			},			
			{ name : "CALLBCK_USR_NM", index : "CALLBCK_USR_NM", align : "center", width : 40 },
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
	   	pager : "#clbkli_pgCallBackList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		$("#cmscsp_POPUP").val("CHILD");
	   		var row = $("#clbkli_tblCallBackList").getRowData(rowid);
	   		callBackInitTable(row.CALLBCK_ID, row.TRY_CNT);
	   		
	   		$("#clbkli_callBckId").val(row.CALLBCK_ID);
	   	},
	   	onPaging : function(pgButton)
	   	{
	   		counselInitInfo("list");
	   		callbackInitInfo();
	   	}
	}).jqGrid("navGrid", "#clbkli_pgCallBackList", {edit : false, add : false, del : false, search : false});

	// 조회 버튼 클릭 이벤트 등록
	$("#clbkli_btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#clbkli_btnInit").bind("click", initEvent);
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#clbkli_tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	// 엑셀저장 버튼 클릭 이벤트 등록
	$("#clbkli_btnExcelPopup").bind("click", btnExcelPopup_clickEvent);
});