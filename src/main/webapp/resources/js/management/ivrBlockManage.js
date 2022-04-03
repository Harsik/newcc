function getJsonStrBlockList(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTEuc2VsZWN0QmxvY2tMaXN0",
		"map" : {
			"key" : "value",
			"selUsrId" : $("#blockManage_optSrchUsr").val(),
			"selBlockType" : $("#blockManage_optSrchStatType").val(),
			"optSearchDt" : $("#blockManage_optSrchDateType").val(),
			"strtDt" : $("#blockManage_selStrtDate").val().replace(/-/g, ""),
			"endDt" : $("#blockManage_selEndDate").val().replace(/-/g, ""),
			"notuse" : $("#blockManage_useCategory").is(":checked")
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//엑셀버튼 클릭 이벤트
function btnExcel_clickEvent(){
	excelDownLoad(getContextPath() + "/excel/management/blockList.do", getJsonStrBlockListExcel());
}

//파라미터 셋팅 counselListExcel
function getJsonStrBlockListExcel()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTEuc2VsZWN0QmxvY2tMaXN0",
		"map" : {
			"key" : "value",
			"selUsrId" : $("#blockManage_optSrchUsr").val(),
			"selBlockType" : $("#blockManage_optSrchStatType").val(),
			"optSearchDt" : $("#blockManage_optSrchDateType").val(),
			"strtDt" : $("#blockManage_selStrtDate").val().replace(/-/g, ""),
			"endDt" : $("#blockManage_selEndDate").val().replace(/-/g, ""),
			"notuse" : $("#blockManage_useCategory").is(":checked"),
			
			"title" : "악성민원목록" + setDownLoadName($("#blockManage_selStrtDate").val(), $("#blockManage_selEndDate").val()),
			"colWidth" : [30, 20, 20, 20, 20, 20],
			"colName" : ["BLOCK_CD_NM", "CUST_TEL_NO", "START_DT", "END_DT", "CRT_DT", "CRT_USR_NM"],
			"colHeader" : ["차단유형", "전화번호", "차단시작일", "차단종료일", "생성일","상담사"],
			"colAlign" : ["center", "center", "center", "center", "center","center"],
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function initGrid(){
	$("#blockManage_tblBlockList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/management/ivrBlockList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrBlockList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["BLOCK_ID","BOCK_CD","차단유형","TCKT_ID","CUST_ID",
			"전화번호","차단시작일","차단종료일","메모","사용구분","생성일","생성시간","상담사","수정일","수정시간","수정인"],
		
	   	colModel :
	   	[
	   		{ name : "BLOCK_ID", index : "BLOCK_ID", hidden:true },
	   	 	{ name : "BOCK_CD", index : "BOCK_CD", hidden:true },
	   	 	{ name : "BLOCK_CD_NM", index : "BLOCK_CD_NM", align : "center", width: 100 },
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
	   	 	{ name : "CUST_ID", index : "CUST_ID", hidden:true },
	   	
	   	 	{ name : "CUST_TEL_NO", index : "CUST_TEL_NO", align : "center", width: 50 },
	   	 	{ name : "START_DT", index : "START_DT", align : "center", width: 50 },
	   	 	{ name : "END_DT", index : "END_DT", align : "center", width: 50 },
	   	 	{ name : "MEMO", index : "MEMO", hidden:true },
	   	 	{ name : "USE_YN", index : "USE_YN", hidden:true },
	   	 	{ name : "CRT_DT", index : "CRT_DT", align : "center", width: 50 },
	   	 	{ name : "CRT_TM", index : "CRT_TM", hidden:true },
	   	 	{ name : "CRT_USR_NM", index : "CRT_USR_ID", align : "center", width: 50 },
	   	 	{ name : "MOD_DT", index : "MOD_DT", hidden:true },
	   	 	{ name : "MOD_TM", index : "MOD_TM", hidden:true },
	   	 	{ name : "MOD_USR_NM", index : "MOD_USR_NM", hidden:true },
		],
	   	sortname : "CRT_DT",
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
	   	pager : "#blockManage_pgBlockList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	 	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		fnDetailInit();
	   		$("#blockManage_divBtn").show();
	   		
	   		var row = $("#blockManage_tblBlockList").getRowData(rowid);
	   		
	   		$("#blockManage_blockId").val(row.BLOCK_ID);
	   		$("#blockManage_tcktId").val(row.TCKT_ID);
	   		$("#blockManage_custTelNo").html(row.CUST_TEL_NO);
	   		$("#blockManage_startDt").html(row.START_DT);
	   		$("#blockManage_crtDttm").html(row.CRT_DT + "  " + row.CRT_TM + "  " + row.CRT_USR_NM);
	   		if(row.USE_YN == "Y"){
	   			$("input[name=consentType][value=Y]").prop("checked", true);
	   		}else{
	   			$("input[name=consentType][value=N]").prop("checked", true);
	   		}
	   		$("#blockManage_endDt").html(row.END_DT);
	   		$("#blockManage_modDttm").html(row.MOD_DT + "  " + row.MOD_TM + "  " + row.MOD_USR_NM);
	   		$("#blockManage_memo").val(row.MEMO);
	   		
	   	}
	}).jqGrid("navGrid", "#blockManage_pgBlockList", {edit : false, add : false, del : false, search : false});
}

// 상세 테이블 초기화
function fnDetailInit(){
	$("#blockManage_blockId").val("");
	$("#blockManage_tcktId").val("");
	$("#blockManage_custTelNo").html("");
	$("#blockManage_startDt").html("");
	$("#blockManage_crtDttm").html("");
	$("input[name=consentType][value=Y]").prop("checked", true);
	$("#blockManage_endDt").html("");
	$("#blockManage_modDttm").html("");
	$("#blockManage_memo").val("");
	
	$("#blockManage_divBtn").hide();
}

// 조회조건 초기화
function fnSearchInit(){
	$("#blockManage_optSrchUsr").val("all");
	$("#blockManage_optSrchStatType").val("all");
	$("#blockManage_optSrchDateType").val("crtDt");
	$("#blockManage_selStrtDate").val(getDate1());
	$("#blockManage_selEndDate").val(getDate());
	$("#blockManage_useCategory").prop("checked", false);
}

// 상담상세 클릭 이벤트
function btnHistory_clickEvent()
{
	var tckt_id = $("#blockManage_tcktId").val();
	window.sessionStorage.setItem("POPUP","GCHILD");
	window.sessionStorage.setItem("reqTcktId", "");
	window.sessionStorage.setItem("tcktId", tckt_id);
	window.sessionStorage.setItem("type", "");
	window.sessionStorage.setItem("gridType", "counsel");
	
	var width = 1200;
	var height = 452;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/counselSpec.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL+"?POPUP=GCHILD", "counselSpec", option);
	newWindow.focus();
}

// 수정버튼 클릭 이벤트
function btnUpdate_clickEvent(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/blockUpdate.do",
		data : "pJson=" + getJsonStrBlockUpdate(),
		success : function(data)
		{
			alert("수정되었습니다.");
			fnDetailInit();
			$("#blockManage_tblBlockList").trigger("reloadGrid");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrBlockUpdate(){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNTEuYmxvY2tVcGRhdGU=",
		"map" : {
			"key" : "value",
			"useYn" : $("input[name=consentType]:checked").val(),
			"memo" : $("#blockManage_memo").val(),
			"blockId" : $("#blockManage_blockId").val(),
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 초기화버튼 클릭 이벤트
function btnInit_clickEvent(){
	fnDetailInit();
	fnSearchInit();
	btnSearch_clickEvent();
}

// 조회버튼 클릭 이벤트
function btnSearch_clickEvent(){
	fnDetailInit();
	$("#blockManage_tblBlockList").jqGrid("setGridParam", {postData : {pJson : getJsonStrBlockList()}, page : 1, sortname : "CRT_DT", sortorder : "desc"});
	$("#blockManage_tblBlockList").trigger("reloadGrid");
}

// init Page
$(document).ready(function(){
	datePicker("#blockManage_selStrtDate");
	datePicker("#blockManage_selEndDate");
	
	$("#blockManage_selStrtDate").val(getDate1());
	$("#blockManage_selEndDate").val(getDate());
	
	setSelectBoxWithAgent("blockManage_optSrchUsr", "전체", "CHILD", "all","","","","","" );
	
	initGrid();
	
	$("#blockManage_btnHistory").bind("click", btnHistory_clickEvent);
	
	$("#blockManage_btnUpdate").bind("click", btnUpdate_clickEvent);
	
	$("#blockManage_btnSearch").bind("click", btnSearch_clickEvent);
	
	$("#blockManage_btnInit").bind("click", btnInit_clickEvent);

	$("#blockManage_btnExcel").bind("click", btnExcel_clickEvent);
});