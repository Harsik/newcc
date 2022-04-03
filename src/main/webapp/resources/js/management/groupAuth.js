// 글로벌 변수
var gTpCd = "90006";
var gSelectAuth = null;
var gProgAuthCopy=[];

var gRowLength = 0;
var gUpdcnt = 0;

var g_use_yn = new Array();
g_use_yn = [true, true, true, true, true];
//파라미터 셋팅_getJsonStrAuthList
function getJsonStrAuthList(grpAth_optSrchType, grpAth_tfSrchVal, grpAth_chkNotUse)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuY29kZWxpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : gTpCd,
				"optSrchType" : grpAth_optSrchType,
				"tfSrchVal" : grpAth_tfSrchVal,
				"notuse" : grpAth_chkNotUse
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrProgList
function getJsonStrProgList()
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMTAucHJvZ3JhbWxpc3Q=",
			"map" : {
				"key" : "value",
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrProgAuthList
function getJsonStrProgAuthList(auth_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMTAucHJvZ0F1dGhMaXN0",
			"map" : {
				"key" : "value",
				"auth_cd" : auth_cd,
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrAjaxProgList
function getJsonStrAjaxProgList(auth_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMDMucHJvZ0xpc3Q=",
			"map" : {
				"key" : "value",
				"auth_cd" : auth_cd
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonStrUseProgListUpdate
function getJsonStrUseProgListUpdate(auth_cd, mnu_id, RD_YN, CRT_YN, UPD_YN, DLT_YN, FLDN_YN)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wMDMudXNlUHJvZ1VwZGF0ZQ==",
			"map" : {
				"key" : "value",
				"auth_cd" : auth_cd,
				"mnu_id" : mnu_id,
				"rd_yn" : RD_YN,
				"crt_yn" : CRT_YN,
				"upd_yn" : UPD_YN,
				"dlt_yn" : DLT_YN,
				"fldn_yn" : FLDN_YN
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 조회 버튼 클릭 이벤트
function btnSrch_clickEvent()
{
	
	var grpAth_optSrchType = $("#grpAth_optSrchType").val()
	, grpAth_tfSrchVal = $.trim($("#grpAth_tfSrchVal").val())
	, grpAth_chkNotUse = $("#grpAth_chkNotUse").prop("checked");
	
	$("#grpAth_tblGroup").jqGrid("setGridParam", { postData : { pJson : getJsonStrAuthList( grpAth_optSrchType, grpAth_tfSrchVal, grpAth_chkNotUse ) }, page : 1, sortname : "CD", sortorder : "asc" }).trigger("reloadGrid");
	
	initProgList();
}

function initAuthYn() 
{
	g_use_yn = [true, true, true, true, true];
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
	$("#grpAth_optSrchType").val("all");
	$("#grpAth_tfSrchVal").val("");
	$("#grpAth_tfSrchVal").prop("disabled",true);
	$("#grpAth_chkNotUse").prop("checked", false);
	gSelectAuth = null;
	
	btnSrch_clickEvent();
	initProgList();
}

// 미사용 포함 체크박스 클릭 이벤트
function chkNotUse_clickEvent() 
{
	var grpAth_optSrchType = $("#grpAth_optSrchType").val()
		, grpAth_tfSrchVal = $.trim($("#grpAth_tfSrchVal").val())
		, grpAth_chkNotUse = $("#grpAth_chkNotUse").prop("checked");
	
	$("#grpAth_tblGroup").jqGrid("setGridParam", { postData : { pJson : getJsonStrAuthList( grpAth_optSrchType, grpAth_tfSrchVal, grpAth_chkNotUse ) }, page : 1, sortname : "CD", sortorder : "asc"}).trigger("reloadGrid");
	
	initProgList();
}

// 프로그램 목록 초기화 함수
function initProgList() 
{
	$("#grpAth_btnProUp").hide();
	$("#grpAth_btnProCopy").hide();
	$("#grpAth_btnProPasty").hide();
	
	$("#chkNotPro").prop("disabled", true);
	$("#chkNotPro").prop("checked", true);
	
	$("#grpAth_tblPro").jqGrid("setGridParam", {postData : { pJson : getJsonStrProgList() }, page : 1, sortname : "MNU_ID", sortorder : "asc", }).trigger("reloadGrid");
	
	initAuthYn();
}

// 검색 타입 선택 이벤트
function optSrchType_changeEvent() 
{
	var grpAth_optSrchType = $("#grpAth_optSrchType").val();
	
	if(grpAth_optSrchType == "all")
		$("#grpAth_tfSrchVal").prop("disabled", true);
	else
		$("#grpAth_tfSrchVal").prop("disabled", false);
}

// 복사 버튼 클릭 이벤트
function btnProCopy_clickEvent() 
{
	gProgAuthCopy = [];
	$("#grpAth_btnProPasty").show();
	var rowNum =  $('#grpAth_tblPro').getGridParam('rowNum');
	
	for(var i = 1; i <= rowNum ; i++ )
	{
		var currentRow = $("#grpAth_tblPro").getRowData(i);
		if(jQuery.isEmptyObject(currentRow))
			return;
		
		gProgAuthCopy.push(
				{ 
					"CRT_YN" : currentRow.CRT_YN,
					"DLT_YN" : currentRow.DLT_YN,
					"FLDN_YN" : currentRow.FLDN_YN,
					"MNU_ID" : currentRow.MNU_ID,
					"MNU_NM" : currentRow.MNU_NM,
					"RD_YN" : currentRow.RD_YN,
					"UPD_YN" : currentRow.UPD_YN
				});
	}
	
}

// 붙여넣기 버튼 클릭 이벤트
function btnProPasty_clickEvent() 
{
	var rowNum =  $('#grpAth_tblPro').getGridParam('rowNum');
	
	for( var i = 0 ; i < gProgAuthCopy.length ; i++)
	{
		for(var j = 1; j <= rowNum ; j++ )
		{
			var currentRow = $("#grpAth_tblPro").getRowData(j);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			if(gProgAuthCopy[i].MNU_ID == currentRow.MNU_ID)
			{
				$("#grpAth_tblPro").setCell(j, 2, gProgAuthCopy[i].RD_YN);
				$("#grpAth_tblPro").setCell(j, 3, gProgAuthCopy[i].CRT_YN);
				$("#grpAth_tblPro").setCell(j, 4, gProgAuthCopy[i].UPD_YN);
				$("#grpAth_tblPro").setCell(j, 5, gProgAuthCopy[i].DLT_YN);
				$("#grpAth_tblPro").setCell(j, 6, gProgAuthCopy[i].FLDN_YN);
			}
			
		}
	}
	
}

// 권한 선택 전체 선택/해제 클릭 이벤트
function authYn_clickEvent(celId) 
{
	var rowNum = $('#grpAth_tblPro').getGridParam('rowNum');
	
	if(g_use_yn[celId.data-1])
	{
		for( var j = 1; j <= rowNum; j++)
			$("#grpAth_tblPro").setCell(j, celId.data+1, "1");
		
		g_use_yn[celId.data-1] = false;
	}
	else
	{
		for( var j = 1; j <= rowNum; j++)
			$("#grpAth_tblPro").setCell(j, celId.data+1, "0");
		
		g_use_yn[celId.data-1] = true;
	}
}

//업데이트 성공 시 Alert창 띄우는 함수
function updateAlert() 
{
	gUpdcnt++;
	
	if(gUpdcnt == gRowLength)
		alert("저장되었습니다.");
	
}

// 저장 버튼 클릭 이벤트
function btnProUp_clickEvent() 
{
	var rowNum = $("#grpAth_tblGroup").getGridParam("rowNum");
	var currentPageNum = $("#grpAth_tblGroup").getGridParam("page");
	
	gUpdcnt = 0;
	gRowLength = $("#grpAth_tblPro").getGridParam("reccount");
	
	if(confirm("저장 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#grpAth_tblPro").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			console.log(currentRow);
			
			var RD_YN = "N";
			var CRT_YN = "N";
			var UPD_YN = "N";
			var DLT_YN = "N";
			var FLDN_YN = "N";
			
			if(currentRow.RD_YN == "1")
				RD_YN = "Y";
			
			if(currentRow.CRT_YN == "1")
				CRT_YN = "Y";
			
			if(currentRow.UPD_YN == "1")
				UPD_YN = "Y";
			
			if(currentRow.DLT_YN == "1")
				DLT_YN = "Y";
			
			if(currentRow.FLDN_YN == "1")
				FLDN_YN = "Y";
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/groupUseUpdate.do",
				data : "pJson=" + getJsonStrUseProgListUpdate(gSelectAuth.CD, currentRow.MNU_ID, RD_YN, CRT_YN, UPD_YN, DLT_YN, FLDN_YN),
				success : function(data)
				{
					if(data != 0)
						updateAlert();
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
	}
}
function authProgList() 
{
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/authProgList.do",
		data : "pJson=" + getJsonStrAjaxProgList(gSelectAuth.CD),
		success : function(data)
		{
			if(data.length != 0)
			{
				$("#grpAth_tblPro").jqGrid("setGridParam", {postData : { pJson : getJsonStrProgAuthList(gSelectAuth.CD) }, page : 1, sortname : "MNU_ID", sortorder : "asc"}).trigger("reloadGrid");
			}
			else
			{
				$("#grpAth_tblPro").jqGrid("setGridParam", {postData : { pJson : getJsonStrProgList() }, page : 1, sortname : "MNU_ID", sortorder : "asc"}).trigger("reloadGrid");
				
				var rowNum = $('#grpAth_tblPro').getGridParam('rowNum');
				for( var j = 1; j <= rowNum; j++)
				{
					$("#grpAth_tblPro").setCell(j, 1, "0");
					$("#grpAth_tblPro").setCell(j, 2, "0");
					$("#grpAth_tblPro").setCell(j, 3, "0");
					$("#grpAth_tblPro").setCell(j, 4, "0");
					$("#grpAth_tblPro").setCell(j, 5, "0");
				}
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
}

$(document).ready(function()
{
	
	$("#grpAth_btnProUp").hide();
	$("#grpAth_btnProCopy").hide();
	$("#grpAth_btnProPasty").hide();
	
	$("#grpAth_tblGroup").jqGrid(
	{		
		url : getContextPath() + "/jqgrid/management/groupList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrAuthList("", "", $("input[id=grpAth_chkNotUse]:checkbox").prop("checked"))
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "그룹명", "사용여부", "코드" ],
		colModel : 
		[
            { name : "CD_NM", index : "CD_NM",width : 330, align : "left", classes : "grid-col" },
            { name : "USE_YN", index : "USE_YN",width : 80, resizable: false, align : "center" },
            { name : "CD", index : "CD", hidden:true, width : 60, align : "center" }
		],
		sortname : "CD",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "520",
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		pager : "#grpAth_innerGrpPager",
		onSelectRow : function(rowid) 
		{
			$("#grpAth_btnProUp").show();
			$("#grpAth_btnProCopy").show();
			
			$("#chkNotPro").prop("disabled", false);
			$("#chkNotPro").prop("checked", true);
			
			gSelectAuth = $("#grpAth_tblGroup").getRowData(rowid);
			
			authProgList();
			initAuthYn();
		},
		onPaging : function() {
			initProgList();
		}
	}).jqGrid("navGrid", "#grpAth_innerGrpPager", {edit : false, add : false, del : false, search : false});
	
	$("#grpAth_tblPro").jqGrid(
	{		
		url : getContextPath() + "/jqgrid/management/grpProgramList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrProgList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "메뉴명", "권한", "등록", "수정", "삭제", "내려받기", "메뉴아이디" ],
		colModel : [
            { name : "MNU_NM", index : "MNU_NM", width : 250, classes : "grid-col", sortable : false},
            { name : "RD_YN", index:"CRT_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 70, resizable: false, sortable : false },
            { name : "CRT_YN", index:"RD_YN", hidden : true,formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 70, resizable: false, sortable : false },
            { name : "UPD_YN", index:"UPD_YN", hidden : true,formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 70, resizable: false, sortable : false },
            { name : "DLT_YN", index:"DLT_YN", hidden : true,formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 70, resizable: false, sortable : false },
            { name : "FLDN_YN", index:"FLDN_YN", hidden : true,formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 70, resizable: false, sortable : false },
            { name : "MNU_ID", index : "MNU_ID", hidden : true}
		],
		sortname : "MNU_ID",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "520",
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		pager : "#grpAth_innerProPager",
       	onCellSelect : function( rowid, icol, cellcontent )
       	{
       		var selectColl = $("#grpAth_tblPro").getCell(rowid, icol);
       		
       		if(icol != 1)
       		{
	       		if(selectColl == 0 )
	       			$("#grpAth_tblPro").setCell(rowid, icol, "1");
	       		else
	       			$("#grpAth_tblPro").setCell(rowid, icol, "0");
       		}
		},
	}).jqGrid("navGrid", "#grpAth_innerProPager", {edit : false, add : false, del : false, search : false});
	
	// 그룹 미사용 포함 체크박스 클릭 이벤트 등록
	$("#grpAth_chkNotUse").bind("click", chkNotUse_clickEvent);
	
	// 조회버튼 클릭 이벤트 등록
	$("#grpAth_btnSrch").bind("click", btnSrch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#grpAth_btnInit").bind("click", btnInit_clickEvent);
	
	// 검색어 엔터 키 이벤트 등록
	$("#grpAth_tfSrchVal").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			btnSrch_clickEvent();
	});
	
	// 검색 타입 선택 이벤트 등록
	$("#grpAth_optSrchType").bind("change", optSrchType_changeEvent);
	
	// 저장 버튼 클릭 이벤트 등록
	$("#grpAth_btnProUp").bind("click", btnProUp_clickEvent);
	
	// 복사 버튼 클릭 이벤트 등록
	$("#grpAth_btnProCopy").bind("click", btnProCopy_clickEvent);
	
	// 붙여넣기 버튼 클릭 이벤트 등록
	$("#grpAth_btnProPasty").bind("click", btnProPasty_clickEvent);
	
	// 권한 선택 전체 선택/해제 클릭 이벤트 등록
	$("#tblPro_RD_YN").bind("click", 1, authYn_clickEvent);
	$("#tblPro_CRT_YN").bind("click", 2, authYn_clickEvent);
	$("#tblPro_UPD_YN").bind("click", 3, authYn_clickEvent);
	$("#tblPro_DLT_YN").bind("click",  4, authYn_clickEvent);
	$("#tblPro_FLDN_YN").bind("click", 5, authYn_clickEvent);
});