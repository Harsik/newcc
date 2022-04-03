
function getJsonStrDeptCooperListList(){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wNjAuZGVwdENvb3Blckxpc3Q=",
	    "map" : {
		"key" 	: "value",
		"frDt" 	: $("#csdpcp_deptCooperFrDate").val().replace(/[-, :, \s]/g,""),
		"toDt" 	: $("#csdpcp_deptCooperToDate").val().replace(/[-, :, \s]/g,""),
		"tbbs_gb_cd" : "050100",
		"cdb_gb_cd" : "040101",
		"deptCooperOrgVal"  : $("#csdpcp_deptCooperOrgVal").val(),
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}


function deptCooperListExcel(){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wNjAuZGVwdENvb3Blckxpc3Q=",
	    "map" : {
		"key" : "value",
		"frDt" 	: $("#csdpcp_deptCooperFrDate").val().replace(/[-, :, \s]/g,""),
		"toDt" 	: $("#csdpcp_deptCooperToDate").val().replace(/[-, :, \s]/g,""),
		"tbbs_gb_cd" : "050100",
		"cdb_gb_cd" : "040101",
		"sidx"  : "CNTR_NM",
		"sord"  : "ASC",
		"title" : "부서별협력도" + setDownLoadName($("#csdpcp_deptCooperFrDate").val(), $("#csdpcp_deptCooperToDate").val()),
		"colWidth" : [40, 20, 20,20],
		"colName" : ["CNTR_NM","NOTI_CNT","DB_CNT","TOT_CNT"],
		"colHeader" : ["부서명","공지사항등록건수","상담DB등록건수","총건수"],
		"colAlign" : ["left","right","right","right"]
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}

function deptCooperCreateGrid(){
    $("#csdpcp_deptCooperationGrid").jqGrid({
	url : "/jqgrid/civilservice/cswDeptCooperation.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrDeptCooperListList()
	},
	jsonReader :
	{
	    repeatitems: false
	},
	colNames : ["부서명","공지사항등록건수","상담DB등록건수","총건수"],
	colModel :
	    [
	     { name : "CNTR_NM", 	index : "CNTR_NM",   align : "center", width : 300 },
	     { name : "NOTI_CNT", 	index : "NOTI_CNT",   align : "center", width : 150 },   
	     { name : "DB_CNT", 	index : "DB_CNT",   align : "center", width : 150 },   
	     { name : "TOT_CNT", 	index : "TOT_CNT",   align : "center", width : 150 }
	     ],
	     sortname : "CNTR_NM",																			  	
	     sortorder : "ASC",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "746", 
	     width : "100%",
	     rowNum : 25,
	     rowList : [10, 15, 25, 50, 100],
	     autowidth : true,
	     pager : "#csdpcp_pgDeptCooperationGrid",
	     pgbuttons : true,
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords : true,
	     onSelectRow : function(rowid){}
    }).jqGrid("navGrid", "#csdpcp_pgDeptCooperationGrid", {edit : false, add : false, del : false, search : false});   

}


/*function deptCooperCreateGrid_old(){
    $("#csdpcp_deptCooperationGrid").jqGrid({
	url : getContextPath() + "/jqgrid/civilservice/cswDeptCooperation.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrDeptCooperListList()
	},
	jsonReader :
	{
	    repeatitems: false
	},
	colNames : ["기관","기관/부서명","입력건수"],
	colModel :
	    [
	     { name : "CNTR_NM",  index : "CNTR_NM", hidden : true},
	     { name : "TEAM_NM",index : "TEAM_NM", align : "left", width : 1000, formatter: function (cellvalue, options, rowobj) {
        	 var str = rowobj.CNTR_NM==null?"":rowobj.CNTR_NM;
        	 var str2 = rowobj.TEAM_NM==null?"":rowobj.TEAM_NM;
        	 return str +" "+str2;}
	     },					    	
	     { name : "TOTAL", 	index : "TOTAL",   align : "center", width : 402 },                   			  
	  	 	
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
	     pager : "#csdpcp_pgDeptCooperationGrid",
	     pgbuttons : true,
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords : true,
	     onSelectRow : function(rowid){}
    }).jqGrid("navGrid", "#csdpcp_pgDeptCooperationGrid", {edit : false, add : false, del : false, search : false});   

}
*/

function deptCooperSearch_clickEvent() {
    $("#csdpcp_deptCooperationGrid").jqGrid("setGridParam", {
	postData : {
	    pJson : getJsonStrDeptCooperListList()
	},
	page : 1,
	sortname : "CNTR_NM",
	sortorder : "ASC"
    }).trigger("reloadGrid");
}

function deptCooperInit_clickEvent() {
    deptCooperInitDate();
    $("#csdpcp_deptCooperOrgVal").val("");
    $("#csdpcp_deptVal").val("");
    deptCooperSearch_clickEvent();
}


function deptCooperExcel_clickEvent() {
    excelDownLoad("/excel/civilservice/cswDeptCooperation.do", deptCooperListExcel());
}


function deptCooperInitEvent(){
    $("#csdpcp_deptCooperSearch").bind("click", deptCooperSearch_clickEvent);
    $("#csdpcp_deptCooperInit").bind("click", deptCooperInit_clickEvent);
    $("#csdpcp_deptCooperExcel").bind("click", deptCooperExcel_clickEvent);
    $("#csdpcp_deptCooperOrgVal").on("click",function(){$("#csdpcp_deptCooperOrgVal").val("");});
    $("#csdpcp_deptCooperOrgVal").bind("keydown", function (key) { if (key.keyCode == 13) { deptCooperSearch_clickEvent(); } });
}


function deptCooperInitDate(){
    datePicker("#csdpcp_deptCooperFrDate");
    datePicker("#csdpcp_deptCooperToDate");
   
    $("#csdpcp_deptCooperFrDate").val(getDate1());    
    $("#csdpcp_deptCooperToDate").val(getDate());
}

function deptCooper_DeptList_TextChangeEvent(){
    $( "#csdpcp_deptCooperOrgVal").autocomplete({
	maxShowItems: 5,
	source : function( request, response ) {
	    $.ajax({
		type: 'post',
		url: "/ajax/civilservice/csw.do",
		dataType: "json",
		data: "pJson=" +  getJsonStr("c2VsZWN0TGlzdA==", "b20wNjAuY25zbHREYlN0YXRpc3RpY3NEZXB0TGlzdA==", {
		    "key" : "value",
		    "deptname" :$("#csdpcp_deptCooperOrgVal").val()
		}),
		success: function(data) {	                   
		    response( 
			    $.map(data, function(item) {	                            
				return {
				    label: (item.OU),
				    value: item.OU,
				    id : item
				}
			    })
		    );
		}, error:function(e){  
		    alert("자동완성을 사용할 수 없습니다.");  
		}  
	    });
	},
	minLength: 1,
	focus: function( event, ui ) {
	    return false; 
	},
	select: function( event, ui ) {
	    //uid =ui.item.id.UID_;
		   deptCode =ui.item.id.OUCODE;
		   $("#csdpcp_deptVal").val(deptCode);
	   //$("#csdbch_deptJobChargerCheck").val(deptCharger);
	}
    });
}

function initDeptCorprDiv(){
	
	$("#csdpcp_deptCooperOrgVal").bind("keydown", deptCooper_DeptList_TextChangeEvent);
    //init date
    deptCooperInitDate();
   
    // create grid
    deptCooperCreateGrid();
   
    // create event
    deptCooperInitEvent();
}


