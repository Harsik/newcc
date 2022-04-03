
$(document).ready(function(){
	var nullFormatter = function(cellValue, options, rowObject) {
		if (cellValue == undefined || cellValue == null) {
			cellValue = "시스템관리자";
		};
		return cellValue;
	};

	// 콜백목록 그리드
	$("#tblVocHistory").jqGrid({
		url : "/jqgrid/civilservice/cswVocHistory.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getVocHistory()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["작업ID","작업일시", "담당자 부서명", "담당자", "ORG_USR_DEPCODE", "진행상태", "변경사유", "처리내용", "처리자 부서명", "처리자", "MOD_USR_OUCODE"],
	   	colModel :
	   	[
	   		{ name : "WRK_ID", index : "WRK_ID", width : 130, align : "center",hidden : true },
	   	 	{ name : "WRK_DTM", index : "WRK_DTM", width : 130, align : "center" },
	   	 	{ name : "ORG_FUL_NM", index : "ORG_FUL_NM", width : 180, align : "center"},
			{ name : "ORG_USR_NM", index : "ORG_USR_NM", align : "center", width : 80 },
			{ name : "ORG_USR_DEPCODE", index : "ORG_USR_DEPCODE", align : "center", width : 80, hidden : true },
			{ name : "CVL_ACT_ST_NM", index : "CVL_ACT_ST_NM", align : "center", width : 80 },
			
			{ name : "RTN_RSN", index : "RTN_RSN", align : "center", width : 180 },
//			{ name : "TNTR_CONT", index : "TNTR_CONT", align : "center", width : 350 },			
			{ name : "CVL_ACT_CONT", index : "CVL_ACT_CONT", align : "center", width : 180 },
			{ name : "MOD_USR_ORGFULNM", index : "MOD_USR_ORGFULNM", align : "center", width : 180 },
			{ name : "MOD_USR_NM", index : "MOD_USR_NM", align : "center", width : 80, formatter : nullFormatter },
			{ name : "MOD_USR_OUCODE", index : "MOD_USR_OUCODE", align : "center", width : 80, hidden : true },
	   	],
	   	sortname : "WRK_ID",
	   	sortorder : "DESC",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "600",
	   	width : "100%",
	   	rowNum : "99999",
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	pager : "pagingVocHistory",
	   	rowNum : 25
	});
});

//파라미터 셋팅 CallBackList
function getVocHistory()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMzQuc2VsZWN0Vm9jSGlzdG9yeQ==",
		"map" : {
			"key" : "value",			
			"tckt_id" : $("#tckt_id").val(),
			"ord" : $("#ord").val()
		}
	};
	
	return  encodeURIComponent(JSON.stringify(loParam));
}