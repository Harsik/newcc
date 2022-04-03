var note_id = "";

//파라미터 셋팅 - 수신확인목록 조회
function getJsonStrRcvnList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMzAuY29uZmlybUxpc3Q=",
		"map" : {
			"key" : "value",
			"noteId" : note_id,
			//"noteId" : window.sessionStorage.getItem("messageNoteId"),
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//페이지 초기화
$(document).ready(function()
{		
	note_id = $("#tfNoteId").val();
	
	$("#rcvnConfirmList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/main/messageRcvnList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrRcvnList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["이름", "확인일시", "USR_ID"],
	   	colModel :
	   	[	   	 	
			{ name : "RCVN_USR_NM", index : "RCVN_USR_NM", align : "center", width : 90 },
			{ name : "RCVN_DTTM,", index : "RCVN_DTTM", align : "center", width : 120 },
			{ name : "RCVN_USR_ID", index : "RCVN_USR_ID", hidden:true }
	   	],
	   	sortname : "RCVN_USR_NM",
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
	   	pager : "#pgRcvnConfirmList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{

	   	}
	}).jqGrid("navGrid", "#pgRcvnConfirmList", {edit : false, add : false, del : false, search : false});

});

