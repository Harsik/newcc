function initGrid(){
	$("#blockIvrPop_tb").jqGrid({
		url : getContextPath() + "/ajax/statistics/blockCstmrPopup.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrBlockIvrList(type,dt,tel)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["전화번호","인입날짜","인입시간"],
			colModel : [
				{ name : "CUST_TEL_NO", index : "CUST_TEL_NO", align : "center", width : 110 },
				{ name : "CRT_DT", index : "CRT_DT", align : "center", width : 100 },
				{ name : "CRT_TM", index : "CRT_TM", align : "center", width : 80 },
			],
			gridview : true,
		   	hidegrid : false,
		   	shrinkToFit : false,
		   	loadonce : false,
		   	scrollOffset : 0,
		   	height : "300",
		   	width : "100%",	
		   	rowNum : 999999,
		   	autowidth : true,
		   	pgbuttons : true,
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "0",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords : true,
	});
}

function getJsonStrBlockIvrList(type,dt,tel){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTEuYmxvY2tJdnJQb3B1cA==",
		"map" : {
			"key" : "value",
			"type" : type,
			"dt" : dt,
			"tel" : tel
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

$(document).ready(function()
{
	initGrid();
});