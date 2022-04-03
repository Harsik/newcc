// 글로벌 변수
var gSelectCnslDb = null;
var gTbbsId = "";
var gTbbsTtl = "";

// 조회조건 저장
var g_tfTbbsTtl = "";
var g_chkUseYn = "";
var g_instCd = "";
var g_intvLgCd = "";
var g_intvMdCd = "";
var g_intvSmCd = "";

//파라미터 셋팅_getJsonStrCnslDbList
function getJsonStrCnslDbList(tfTbbsTtl, chkUseYn, instCd, intvLgCd, intvMdCd, intvSmCd)
{	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuc2VsZWN0Q25zbExpc3RWaWV3", 		/* om010.selectCnslListView */
		"map" : {
			"key" : "value",
			"tbbs_ttl" : tfTbbsTtl,
			"use_yn" : chkUseYn,
			"inst_cd" : instCd,
			"intv_lg_cd" : intvLgCd,
			"intv_md_cd" : intvMdCd,
			"intv_sm_cd" : intvSmCd
		}
	};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 조회 버튼 클릭 이벤트
function btnCnslDbSrch_clickEvent()
{
	g_tfTbbsTtl = $("#tfTbbsTtl").val();
	g_chkUseYn = $("input:checkbox[id='chkUseYn']").is(":checked") ? "Y" : "N";
	
	// 미사용포함
	if (g_chkUseYn == "Y")
		g_chkUseYn = "all";
	
	$("#tblCnslDbList").jqGrid("setGridParam", { postData : { pJson : getJsonStrCnslDbList(g_tfTbbsTtl, g_chkUseYn, g_instCd, g_intvLgCd, g_intvMdCd, g_intvSmCd) }, page : 1, sortname : "TBBS_TTL", sortorder : "asc" })
	.trigger("reloadGrid");
}

//고객 선택 버튼 클릭 이벤트
function btnSelection_clickEvent()
{
	var selRow = $('#tblCnslDbList').getGridParam('selrow');

	gTbbsId = $("#tblCnslDbList").getCell(selRow, "TBBS_ID");
	gTbbsTtl = $("#tblCnslDbList").getCell(selRow, "TBBS_TTL"); 
	
	opener.setChildValue("cTbbsId_Tab1", gTbbsId);
	opener.setChildValue("cDbNm_Tab1", gTbbsTtl);
	
	window.close();
}

function init()
{
	gSelectCnslDb = null;
	
	g_instCd = $("#tfInstCd").val();
	g_intvLgCd = $("#tfIntvLgCd").val();
	g_intvMdCd = $("#tfIntvMdCd").val();
	g_intvSmCd = $("#tfIntvSmCd").val();
	
	$("#tfTbbsTtl").val("");
	$("#chkUseYn").prop("checked", true);
	
	btnCnslDbSrch_clickEvent();
}

$(document).ready(function()
{
	init();
	
	//alert($("#tfInstCd").val() + ":" + $("#tfIntvNm").val());
		
	$("#tblCnslDbList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselDbListView.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCnslDbList(g_tfTbbsTtl, g_chkUseYn, g_instCd, g_intvLgCd, g_intvMdCd, g_intvSmCd) 
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "업무명", "등록일시", "등록자", "사용여부", "미사용사유", "TBBS ID"],
		colModel : 
		[
			{ name : "TBBS_TTL", index : "TBBS_TTL", align : "left", width : "230" },
			{ name : "MOD_DT_FORMAT", index : "MOD_DT", align : "center", width : "105" },
			{ name : "MOD_USER_NM", index : "MOD_USR_ID", align : "center", width : "105" },
			{ name : "USE_YN", index : "USE_YN", align : "center", width : "105" },
			{ name : "NTUSE_DESC", index : "NTUSE_DESC", width : "370", align : "left"},
			{ name : "TBBS_ID", index : "TBBS_ID", hidden : true },
		],
		sortname : "TBBS_TTL",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 100,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#innerCnslDbList",
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onSelectRow : function(rowid)
		{
		},
		ondblClickRow : function(rowid)
	   	{
			gSelectCnslDb = $("#tblCnslDbList").getRowData(rowid);
			gTbbsId = gSelectCnslDb.TBBS_ID;
			gTbbsTtl = gSelectCnslDb.TBBS_TTL;
			
			opener.setChildValue("cTbbsId_Tab1", gTbbsId);
			opener.setChildValue("cDbNm_Tab1", gTbbsTtl);
			
			window.close();
	   	},
		gridComplete : function()
		{
		}
	}).jqGrid("navGrid", "#innerCnslDbList", {edit : false, add : false, del : false, search : false});
		
	
	// 조회버튼 클릭 이벤트 등록
	$("#btnCnslDbSrch").bind("click", btnCnslDbSrch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnCnslDbInit").bind("click", init);
	
	// 검색어 엔터 키 이벤트 등록
	$(".keyDown").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			btnCnslDbSrch_clickEvent();
	});
	
	// 선택 버튼 클릭 이벤트 등록
	$("#btnSelection").bind("click", btnSelection_clickEvent);

	window.localStorage.setItem("parentCustId", "");
});