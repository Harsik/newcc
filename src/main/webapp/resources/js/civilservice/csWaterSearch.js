var suy_no = "";

function fnBtnSearch(){
	
	$("#cswterSearch_tblWaterList").jqGrid("setGridParam", {datatype : "json", postData : {pJson : getJsonStrWaterSearchList()} , page : 1, sortname : "SUY_NAME1", sortorder : "ASC"});
	$("#cswterSearch_tblWaterList").trigger("reloadGrid");
	
}

function getJsonStrWaterSearchList(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "bG9jYWxfc3Vkby5maW5kU3V5b25nZ2E=",
			"map" : {
				"key" : "value",
				"suy_addr1" : $("#suy_addr1").val(), // 구주소
				"suy_addr2" : $("#suy_addr2").val(), // 신주소
				"suy_name1" : $("#searchNm").val()  // 성명
			}
	};
	
	return  encodeURIComponent(JSON.stringify(loParam));
}

function fnBtnCheck(){
	if(suy_no == ""){
		alert("수용가를 선택해주세요.");
		return;
	}
	opener.$("#cvsvif_mkey").val(suy_no);
	opener.fnBtnCsWaterList();
	window.close();
}

function fnBtnReset(){
	suy_no = "";
	
	$("#suy_addr1,#suy_addr2").val("");
	$("#searchNm").val("");
	$("#cswterSearch_tblWaterList").clearGridData();
}

function setGrid(){
	$("#cswterSearch_tblWaterList").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/csWaterSearchList.do",
		datatype : "local",
		mtype : 'POST',
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [
			"수용가번호", "성명", "구주소", "신주소"
		],
		colModel :
		[
			{name : "FSUYNO", index : "FSUYNO", align : "center", width : "15%"},
			{name : "SUY_NAME1", index : "SUY_NAME1", align : "center", width : "25%"},
			{name : "SUY_ADDR1", index : "SUY_ADDR1", align : "center", width : "30%"},
			{name : "SUY_ADDR2", index : "SUY_ADDR2", align : "center", width : "30%"},
			
		],
		sortname : "SUY_NAME1",
	   	sortorder : "ASC",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "390",
	   	width : "100%",
	   	rowNum : 15,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#cswterSearch_pg",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,	
		onSelectRow : function(rowid) 
		{
			var rowData = $("#cswterSearch_tblWaterList").jqGrid("getRowData", rowid);
			suy_no = rowData.FSUYNO;
			
			console.log("onSelectRow >> "+suy_no);
		},
		ondblClickRow : function(rowid)
	   	{
			fnBtnCheck();
	   	},
		
		loadError : function(data, status, err) {
			
		}
	}).jqGrid("navGrid", "#cswterSearch_pg", {edit : false, add : false, del : false, search : false});
}

$(function() {
	setGrid();
	
	$("#btnSearch").bind("click", fnBtnSearch);
	$("#btnCheck").bind("click", fnBtnCheck);
	$("#btnReset").bind("click", fnBtnReset);
	
	$("#suy_addr1,#suy_addr2,#searchNm").bind("keydown", function(key){
		if (key.keyCode == 13)
			fnBtnSearch();
	});
});