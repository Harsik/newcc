/**
 * 
 */

var g_dmStrtDt = "";
var g_dmEndDt = "";

//파라미터셋팅 malignancyList
function getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuZGVwYXJ0bWVudGxpc3Q=",
		"map" : {
			"key" : "value",
			"g_dmStrtDt" : g_dmStrtDt,
			"g_dmEndDt" : g_dmEndDt,
			"department" : $("#optDepartmentList").val(),
			"chkHoliday" : $("#dpmTf_chkHoliday").is(":checked") ? "Y" : "N"
			
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function departmentalTransferListExcel(){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "Y2gwMDEuZGVwYXJ0bWVudGxpc3Q=",
	    "map" : {
		"key" : "value",
		"g_dmStrtDt" : g_dmStrtDt,
		"g_dmEndDt" : g_dmEndDt,
		"department" : $("#optDepartmentList").val(),
		"chkHoliday" : $("#dpmTf_chkHoliday").is(":checked") ? "Y" : "N",
		"sidx"  : "TRNR_RCVN_TEAM_NM",
		"sord"  : "ASC",
		"title" : "부서별_호전환_현황" + setDownLoadName(g_dmStrtDt, g_dmEndDt),
		"colWidth" : [40, 20, 20, 20],
		"colName" : ["TRNR_RCVN_TEAM_NM","TRANSFER", "TALKTRANSFER", "RESULT_TRASNFER"],
		"colHeader" : ["기관/부서명","호전환 건수","상담후 호전환 건수","합 계"],
		"colAlign" : ["left", "center", "center", "center"]
	    }
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//초기 셋팅함수
function init_Department(){
	//부서코드
	setObjectSelectBoxWithCode2("optDepartmentList", "전체", "1", "CHILD", "00000000", "all", "CHANGE");
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#dpmTf_tfDmStrtDt").val(getDate().substr(0, 8) + "01");
	$("#dpmTf_tfDmEndDt").val(getDate());
	
	g_dmStrtDt = $("#dpmTf_tfDmStrtDt").val().replace(/-/g,"");
	g_dmEndDt = $("#dpmTf_tfDmEndDt").val().replace(/-/g,"");		

	//날짜
	datePicker("#dpmTf_tfDmStrtDt");
	datePicker("#dpmTf_tfDmEndDt");
	
	$("#dpmTf_tbldepartmentList").jqGrid({
		url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["부서명","호전환 건수","상담후 호전환 건수","합 계"],
		colModel : [
		            { name : "TRNR_RCVN_TEAM_NM", index : "TRNR_RCVN_TEAM_NM", width : 30, align: "center"},
		            { name : "TRANSFER", index : "TRANSFER",align: "center" ,width :20 },
			        { name : "TALKTRANSFER", index : "TALKTRANSFER", width :20, align: "center" },
			        { name : "RESULT_TRASNFER", index : "RESULT_TRASNFER", width :20, align: "center" }
		            ],
		            loadComplete: function() {
		                var ids = $("#dpmTf_tbldepartmentList").getDataIDs() ;
		                $.each(ids, function(idx, rowId) {
		                	var rowData = $("#dpmTf_tbldepartmentList").getRowData(rowId) ;
		                	if(rowData.TRNR_RCVN_TEAM_NM =="합계"){
		                		$("#dpmTf_tbldepartmentList").setRowData( rowId ,false,{background:"#EAEAEA"});
		                	}
		                	
		                	
		               }) ;
		           },
        sortname : "TRNR_RCVN_TEAM_NM",
        sortorder : "asc",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "510",
        sortable: false,
        width : "80%",
        rowNum : 999999,
        rowList : [10, 20, 30, 50,70,20,20,20,20,20,20],
        autowidth : true,
//        pager : "#dpmTf_pgDepartmentList",
        autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,	 
        onCellSelect : function(rowid, iCol, cellContent, e){},
		gridComplete : function(){},
        error : function(data, status, err)
        {
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#dpmTf_pgDepartmentList", {edit : false, add : false, del : false, search : false});
	
	
}

//초기화 함수
function btnInit_ClicikEvent(){
	$("#optDepartmentList").val("all");
 	$("#dpmTf_tfDmStrtDt").val(getDate().substr(0, 8) + "01");
	$("#dpmTf_tfDmEndDt").val(getDate());

	//현재 월 1일부터 현재일까지 디폴트 셋팅
	g_dmStrtDt = $("#dpmTf_tfDmStrtDt").val().replace(/-/g,"");
	g_dmEndDt = $("#dpmTf_tfDmEndDt").val().replace(/-/g,"");
	
	//reload grid
	$("#dpmTf_tbldepartmentList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)}, 
		sortname : "TRNR_RCVN_TEAM_NM", sortorder : "asc"});
	$("#dpmTf_tbldepartmentList").trigger("reloadGrid");
}

//검색 함수
function btnSearch_ClicikEvent(){

	g_dmStrtDt = $("#dpmTf_tfDmStrtDt").val().replace(/-/g,"");
	g_dmEndDt = $("#dpmTf_tfDmEndDt").val().replace(/-/g,"");

	var rMsg = "";
	if(g_dmStrtDt != "" || g_dmEndDt != "") {
		if(g_dmStrtDt == "") {
			rMsg += "\n시작일자를 입력해주세요.";
		}
		if(g_dmEndDt == "") {
			rMsg += "\n종료일자를 입력해주세요.";
		} else {
			var d_dpStrtDt = new Date(g_dmStrtDt.substr(0, 4), g_dmStrtDt.substr(4, 2), g_dmStrtDt.substr(6, 2));
			var d_dpEndDt = new Date(g_dmEndDt.substr(0, 4), g_dmEndDt.substr(4, 2), g_dmEndDt.substr(6, 2));
			if(d_dpStrtDt > d_dpEndDt) {
				rMsg += "\n시작일이 종료일보다 큽니다.";
			}
		}
	}
	
	if(rMsg != "") {
		alert(rMsg);
		return;
	}
	
	//reload grid
	$("#dpmTf_tbldepartmentList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)}, 
		sortname : "TRNR_RCVN_TEAM_NM", sortorder : "asc"});
	$("#dpmTf_tbldepartmentList").trigger("reloadGrid");
}

function btnExcel_ClicikEvent(){
    excelDownLoad(getContextPath() + "/excel/statistics/departMentalTransfer.do", departmentalTransferListExcel());
}

//시작 함수
$(document).ready(function(){
	//초기 셋팅되는 함수
	init_Department();
	
	//초기화버튼
	$("#dpmTf_btnInit").bind("click",btnInit_ClicikEvent);
	//초기화버튼
	$("#dpmTf_btnExcel").bind("click",btnExcel_ClicikEvent);
	//검색버튼
	$("#dpmTf_btnSearch").bind("click",btnSearch_ClicikEvent);
});