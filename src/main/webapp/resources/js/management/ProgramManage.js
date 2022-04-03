// 조회 조건 및 조회 값
var g_srchtype = "all";
var g_srchval = "";

// 파라미터 셋팅 ProgramList
function getJsonStrProgramList(srchtype, srchval, notuse)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMTAucHJvZ3JhbWxpc3Q=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"notuse" : notuse
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 ProgramListExcel
function getJsonStrProgramListExcel(srchtype, srchval, notuse)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMTAucHJvZ3JhbWxpc3Q=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"notuse" : notuse,
			"sidx" : $("#prgrmMng_tblProgramList").getGridParam("sortname"),
			"sord" : $("#prgrmMng_tblProgramList").getGridParam("sortorder"),
			"title" : "메뉴관리",
			"colWidth" : [20, 20, 40, 20, 20, 20],
			"colName" : ["MNU_ID", "MNU_NM", "MNU_URL", "USE_YN", "MOD_DT_FORMAT", "MOD_USR_ID"],
			"colHeader" : ["메뉴 ID", "메뉴명", "메뉴 URL", "사용", "수정일자", "수정자"],
			"colAlign" : ["center", "left", "left", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 Programspec
function getJsonStrProgramspec(mnuId)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "c20wMTAucHJvZ3JhbXNwZWM=",
			"map" : {
				"key" : "value",
				"mnuId" : mnuId
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 InsertProgram
function getJsonStrInsertProgram()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c20wMTAuaW5zZXJ0UHJvZ3JhbQ==",
		"map" : {
			"key" : "value",
			"mnuId" : $("#prgrmMng_mnuId").val(),
			"mnuUrl" : $("#prgrmMng_mnuUrl").val(),
			"mnuNm" : $("#prgrmMng_mnuNm").val(),
			"parntMnuId" : $("#prgrmMng_parntMnuId").val(),
			"parntMnuUrl" : $("#prgrmMng_parntMnuUrl").val(),
			"wdtSz" : $("#prgrmMng_wdtSz").val(),
			"hghtSz" : $("#prgrmMng_hghtSz").val(),
			"tabOrd" : 0,
			"use_yn" : $(":radio[name='program_use_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateProgram
function getJsonStrUpdateProgram()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "c20wMTAudXBkYXRlUHJvZ3JhbQ==",
		"map" : {
			"key" : "value",
			"mnuId" : $("#prgrmMng_mnuId").val(),
			"mnuUrl" : $("#prgrmMng_mnuUrl").val(),
			"mnuNm" : $("#prgrmMng_mnuNm").val(),
			"parntMnuId" : $("#prgrmMng_parntMnuId").val(),
			"parntMnuUrl" : $("#prgrmMng_parntMnuUrl").val(),
			"wdtSz" : $("#prgrmMng_wdtSz").val(),
			"hghtSz" : $("#prgrmMng_hghtSz").val(),
			"tabOrd" : 0,
			"use_yn" : $(":radio[name='program_use_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//검색타입 선택 이벤트
function optSrchtype_changeEvent()
{
	if($("#prgrmMng_optSrchtype").val() == "all")
	{
		$("#prgrmMng_tfSrchval").prop("disabled", true);
		$("#prgrmMng_tfSrchval").val("");
	}
	else
		$("#prgrmMng_tfSrchval").prop("disabled", false);
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchtype = $("#prgrmMng_optSrchtype").val();
	g_srchval = $("#prgrmMng_tfSrchval").val();
	
	$("#prgrmMng_tblProgramList").jqGrid("setGridParam", {postData : {pJson : getJsonStrProgramList(g_srchtype, g_srchval, $("input[id=prgrmMng_chkNotUse]:checkbox").prop("checked"))}, page : 1, sortname : "mnu_id", sortorder : "asc"});
	$("#prgrmMng_tblProgramList").trigger("reloadGrid");
	
	initProgramSpec();
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	g_srchtype = "all";
	g_srchval = "";
	
	$("#prgrmMng_mnuId").prop("disabled", false);
	$("#prgrmMng_btnInsert").show();
	$("#prgrmMng_btnUpdate").hide();
	
	$("#prgrmMng_optSrchtype").val("all");
	$("#prgrmMng_tfSrchval").val("");
	$("#prgrmMng_tfSrchval").prop("disabled", true);
	$("input[id=chkNotUse]:checkbox").prop("checked", false) ;	
	
	$("#prgrmMng_tblProgramList").jqGrid("setGridParam", {postData : {pJson : getJsonStrProgramList("", "", $("input[id=prgrmMng_chkNotUse]:checkbox").prop("checked"))}, page : 1, sortname : "mnu_id", sortorder : "asc"});
	$("#prgrmMng_tblProgramList").trigger("reloadGrid");

	initProgramSpec();	
}

//메뉴 상세 초기화
function initProgramSpec()
{
	$("#prgrmMng_mnuId").prop("disabled", false);
	$("#prgrmMng_btnInsert").show();
	$("#prgrmMng_btnUpdate").hide();
	
	$("#prgrmMng_mnuId").val("");
	$("#prgrmMng_parntMnuId").val("");
	$("#prgrmMng_mnuUrl").val("");
	$("#prgrmMng_parntMnuUrl").val("");
	$("#prgrmMng_mnuNm").val("");
	$("input:radio[name=program_use_yn]:input[value=Y]").prop("checked", true);
	$("#prgrmMng_wdtSz").val("");
	$("#prgrmMng_hghtSz").val("");
	$("#prgrmMng_crtDt").html("");
	$("#prgrmMng_modDt").html("");
	$("#prgrmMng_crtUsrId").html("");
	$("#prgrmMng_modUsrId").html("");
}

// 저장 및 수정 예외 처리
function checkProgramSpec()
{
	var rMsg = "";
    
	if($("#prgrmMng_mnuId").val() == "")
		rMsg += "\n\n메뉴 ID를 입력 해 주세요.";
	
	if($("#prgrmMng_mnuUrl").val() == "")
		rMsg += "\n\n메뉴 URL을 입력 해 주세요.";
	
	if($("#prgrmMng_mnuNm").val() == "")
		rMsg += "\n\n메뉴 명을 입력 해 주세요.";
		
	return rMsg;
}

//추가버튼 클릭 이벤트
function btnInsert_clickEvent()
{
var rMsg = checkProgramSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/programspec.do",
		data : "pJson=" + getJsonStrProgramspec($("#prgrmMng_mnuId").val()),
		success : function(data)
		{
			if(data != null)
			{
				alert("중복된 메뉴 ID가 존재 합니다.");
				$("#prgrmMng_mnuId").focus();
			}
			else
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/management/insertProgram.do",
					data : "pJson=" + getJsonStrInsertProgram(),
					success : function(data)
					{

						$("#prgrmMng_tblProgramList").jqGrid("setGridParam", {postData : {pJson : getJsonStrProgramList("", "", $("input[id=prgrmMng_chkNotUse]:checkbox").prop("checked"))}, page : 1, sortname : "mnu_id", sortorder : "asc"});
						$("#prgrmMng_tblProgramList").trigger("reloadGrid");

				   		initProgramSpec();				   		
				   		alert("추가되었습니다.");
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//메뉴 수정 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	var rMsg = checkProgramSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/updateProgram.do",
		data : "pJson=" + getJsonStrUpdateProgram(),
		success : function(data)
		{
			$("#prgrmMng_tblProgramList").jqGrid("setGridParam", {
				postData : {
					pJson : getJsonStrProgramList("", "", $("input[id=chkNotUse]:checkbox").prop("checked"))
				}, 
				page : $(this).getGridParam("page"), 
				sortname : "mnu_id", 
				sortorder : "asc"
			}).trigger("reloadGrid");
	   					
			initProgramSpec();
	   		alert("저장되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 엑셀저장 버튼 클릭 이벤트
function btnExcel_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/management/programlist.do", getJsonStrProgramListExcel(g_srchtype, g_srchval, $("input[id=prgrmMng_chkNotUse]:checkbox").prop("checked")));
	
	//var url = getContextPath() + "/excel/management/programlist.do?pJson=" + getJsonStrProgramListExcel(g_srchtype, g_srchval, $("input[id=prgrmMng_chkNotUse]:checkbox").prop("checked"));
	//window.open(url);
}

// init Page
$(document).ready(function()
{
	// 초기 검색 입력 창 비활성화
	$("#prgrmMng_tfSrchval").prop("disabled", true);
	$("#prgrmMng_mnuId").prop("disabled", false);
	$("#prgrmMng_btnInsert").show();
	$("#prgrmMng_btnUpdate").hide();
		
	$("#prgrmMng_tblProgramList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/management/programlist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrProgramList("", "", $("input[id=prgrmMng_chkNotUse]:checkbox").prop("checked"))
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["메뉴 ID", "메뉴 명", "메뉴 URL", "사용", "수정일자", "수정자"],
	   	colModel :
	   	[
	   	 	{ name : "MNU_ID", index : "MNU_ID", width : 100, align : "center" },
			{ name : "MNU_NM", index : "MNU_NM", width : 100, sortable : false },
			{ name : "MNU_URL", index : "MNU_URL", width : 200 },
			{ name : "USE_YN", index : "USE_YN", width : 100, align : "center" },
			{ name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 100, align : "center" },
			{ name : "MOD_USR_ID", index : "MOD_USR_ID", width : 100, align : "center" }
	   	],
	   	sortname : "ORD",
	   	sortorder : "asc",
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
	   	pager : "#prgrmMng_pgProgramList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var row = $("#prgrmMng_tblProgramList").getRowData(rowid);	   		
	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/programspec.do",
				data : "pJson=" + getJsonStrProgramspec(row.MNU_ID),
				success : function(data)
				{					
					$("#prgrmMng_mnuId").val(data.MNU_ID);
					$("#prgrmMng_parntMnuId").val(data.PARNT_MNU_ID);
					$("#prgrmMng_mnuUrl").val(data.MNU_URL);
					$("#prgrmMng_parntMnuUrl").val(data.PARNT_MNU_URL);
					$("#prgrmMng_mnuNm").val(data.MNU_NM);
					$("input:radio[name=program_use_yn]:input[value=" + data.USE_YN + "]").prop("checked", true);
					$("#prgrmMng_wdtSz").val(data.WDT_SZ);
					$("#prgrmMng_hghtSz").val(data.HGHT_SZ);
					$("#prgrmMng_crtDt").html(data.CRT_DT_FORMAT);
					$("#prgrmMng_modDt").html(data.MOD_DT_FORMAT);
					$("#prgrmMng_crtUsrId").html(data.CRT_USR_NM);
					$("#prgrmMng_modUsrId").html(data.MOD_USR_NM);					
					$("#prgrmMng_mnuId").prop("disabled", true);
					$("#prgrmMng_btnUpdate").show();
					$("#prgrmMng_btnInsert").hide();					
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	   	onPaging : function(pgButton)
	   	{	   		
	   		initProgramSpec();
	   	}
	}).jqGrid("navGrid", "#prgrmMng_pgProgramList", {edit : false, add : false, del : false, search : false});
	
	// 검색타입 선택 이벤트 등록
	$("#prgrmMng_optSrchtype").bind("change", optSrchtype_changeEvent);	
	// 조회 버튼 클릭 이벤트 등록
	$("#prgrmMng_btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#prgrmMng_btnInit").bind("click", btnInit_clickEvent);
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#prgrmMng_tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	// 미사용 포함 체크 박스 클릭 이벤트 등록
	$("#prgrmMng_chkNotUse").bind("click", btnSearch_clickEvent);
	
	// 추가 버튼 클릭 이벤트 등록
	$("#prgrmMng_btnInsert").bind("click", btnInsert_clickEvent);
	// 수정 버튼 클릭 이벤트 등록
	$("#prgrmMng_btnUpdate").bind("click", btnUpdate_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록	
	$("#prgrmMng_btnReset").bind("click", function(e)
	{
		$("#prgrmMng_tblProgramList").trigger("reloadGrid");
		initProgramSpec();
	});
	
	// 엑셀저장 버튼 클릭 이벤트 등록
	$("#prgrmMng_btnExcel").bind("click", btnExcel_clickEvent);
});