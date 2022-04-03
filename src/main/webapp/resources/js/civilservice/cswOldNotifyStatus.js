
function getJsonStrOldNotifyStatus(){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTgub2xkTm90aWZ5U3RhdHVz",
	    "map" : {
		"key" 	: "value",
		"frDt" 	: $("#csodst_oldStatusFrDate").val().replace(/[-, :, \s]/g,""),
		"toDt" 	: $("#csodst_oldStatusToDate").val().replace(/[-, :, \s]/g,""),
		"oldStatusOrgVal"  : $("#csodst_oldStatusOrgVal").val(),
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}


function oldNotifyStatusListExcel(){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTgub2xkTm90aWZ5U3RhdHVz",
	    "map" : {
		"key" : "value",
		"frDt" 	: $("#csodst_oldStatusFrDate").val().replace(/[-, :, \s]/g,""),
		"toDt" 	: $("#csodst_oldStatusToDate").val().replace(/[-, :, \s]/g,""),
		"sidx"  : "TEAM_NM",
		"sord"  : "ASC",
		"title" : "부서별협력도" + setDownLoadName($("#csodst_oldStatusFrDate").val(), $("#csodst_oldStatusToDate").val()),
		"colWidth" : [40, 20, 20,20],
		"colName" : ["TEAM_NM","TOTAL"],
		"colHeader" : ["기관/부서명","등록건수"],
		"colAlign" : ["left","center"]
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}

function oldNotifyStatusGrid(){
    $("#csodst_oldStatusGrid").jqGrid({
	url : "/jqgrid/civilservice/cswOldNotifyStatus.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrOldNotifyStatus()
	},
	jsonReader :
	{
	    repeatitems: false
	},
	colNames : ["기관/부서명","등록건수"],
	colModel :
	    [
	     { name : "TEAM_NM",index : "TEAM_NM", align : "left", width : 300},					    	
	     { name : "TOTAL", 	index : "TOTAL",   align : "center", width : 200 },                   			  
	     ],
	     sortname : "TEAM_NM",																			  	
	     sortorder : "ASC",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "681", 
	     width : "100%",
	     rowNum : 25,
	     rowList : [8, 20, 30, 50, 100],
	     autowidth : true,
	     pager : "#csodst_pgOldStatusGrid",
	     pgbuttons : true,
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords : true,
	     onSelectRow : function(rowid){}
    }).jqGrid("navGrid", "#csodst_pgOldStatusGrid", {edit : false, add : false, del : false, search : false});   

}

function oldNotifyStatusSearch_clickEvent() {
    $("#csodst_oldStatusGrid").jqGrid("setGridParam", {
	postData : {
	    pJson : getJsonStrOldNotifyStatus()
	},
	page : 1,
	sortname : "TEAM_NM",
	sortorder : "ASC"
    }).trigger("reloadGrid");
}


function oldNotifyStatusExcel_clickEvent() {
    excelDownLoad("/excel/civilservice/cswOldNotifyStatus.do", oldNotifyStatusListExcel());
}


function oldNotifyStatusInitEvent(){
    $("#csodst_oldStatusSearch").bind("click", oldNotifyStatusSearch_clickEvent);
    $("#csodst_oldStatusExcel").bind("click", oldNotifyStatusExcel_clickEvent);
    $("#csodst_oldStatusOrgVal").on("click",function(){$("#csodst_oldStatusOrgVal").val("");});
    $("#csodst_oldStatusOrgVal").bind("keydown", function (key) { if (key.keyCode == 13) { oldNotifyStatusSearch_clickEvent(); } });
}


function oldNotifyStatusInitDate(){
    datePicker("#csodst_oldStatusFrDate");
    datePicker("#csodst_oldStatusToDate");
   
    $("#csodst_oldStatusFrDate").val('');    
    $("#csodst_oldStatusToDate").val('');
}


$(document).ready(function(){
    //init date
    oldNotifyStatusInitDate();
   
    // create grid
    oldNotifyStatusGrid();
   
    // create event
    oldNotifyStatusInitEvent();
});


