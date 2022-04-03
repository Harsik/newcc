/**
 * 
 */

var g_dmStrtDt = "";
var g_dmEndDt = "";

//파라미터셋팅 malignancyList
function getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuYXRlbnRDc3Rtckxpc3Q=",
		"map" : {
			"key" : "value",
			"g_dmStrtDt" : g_dmStrtDt,
			"g_dmEndDt" : g_dmEndDt
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//엑셀다운로드
function getJsondayReportMonthListExcel(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuYXRlbnRDc3Rtckxpc3Q=",
			"map" : {
				"key" : "value",
				"title" : "특이_민원_현황" + setDownLoadName(g_dmStrtDt, g_dmEndDt),
				"g_dmStrtDt" : g_dmStrtDt,
				"g_dmEndDt" : g_dmEndDt,
				"sidx" : 'T1.CTG_LG_CD',
				"sord" : "ASC",
				"colWidth" : [10,60,10,20],
				"colName" : ["COLNUMS","CTG_LG_CD", "GUNSU"],
				"colHeader" : ["구분","특이 민원 구분","건수"],
				"colAlign" : ["center","center","CENTER"]
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//초기 셋팅함수
function init_Department(){

	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#tfDmStrtDt").val(getDate().substr(0, 8) + "01");
	$("#tfDmEndDt").val(getDate());
	
	g_dmStrtDt = $("#tfDmStrtDt").val().replace(/-/g,"");
	g_dmEndDt = $("#tfDmEndDt").val().replace(/-/g,"");		

	//날짜
	datePicker("#tfDmStrtDt");
	datePicker("#tfDmEndDt");
	
	
	$("#tblatentCstmrList").jqGrid({
		url : getContextPath() + "/jqgrid/statistics/atentCstmr.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["특이민원구분","상담건수"],
		colModel : [
		            { name : "CTG_LG_CD", index : "CTG_LG_CD", width : 30, align: "center"},
		            { name : "GUNSU", index : "GUNSU",align: "center" ,width :20 }
		            ],
        sortname : "T1.CTG_LG_CD",
        sortorder : "asc",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "510",
        sortable: false,
        width : "80%",
        rowNum : 80,
        rowList : [10, 20, 30,40, 50,60,70,80,90,100],
        autowidth : true,
        pager : "#pgatentCstmrList",
        rownumbers : true,
        rownumWidth : 30,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        viewrecords: true,
        multiselect: false,
        onCellSelect : function(rowid, iCol, cellContent, e){},
		gridComplete : function(){},
        error : function(data, status, err)
        {
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#pgatentCstmrList", {edit : false, add : false, del : false, search : false});
	
	
}

//초기화 함수
function btnInit_ClicikEvent(){
	 	$("#tfDmStrtDt").val(getDate().substr(0, 8) + "01");
		$("#tfDmEndDt").val(getDate());

	//현재 월 1일부터 현재일까지 디폴트 셋팅
	 g_dmStrtDt = $("#tfDmStrtDt").val().replace(/-/g,"");
	 g_dmEndDt = $("#tfDmEndDt").val().replace(/-/g,"");
	
	//reload grid
		$("#tblatentCstmrList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)}, 
			page : 1, sortname : "T1.CTG_LG_CD", sortorder : "asc"});
		$("#tblatentCstmrList").trigger("reloadGrid");
}

//검색 함수
function btnSearch_ClicikEvent(){
	
	g_dmStrtDt = $("#tfDmStrtDt").val().replace(/-/g,"");
	g_dmEndDt = $("#tfDmEndDt").val().replace(/-/g,"");

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
	$("#tblatentCstmrList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)}, 
		page : 1, sortname : "T1.CTG_LG_CD", sortorder : "asc"});
	$("#tblatentCstmrList").trigger("reloadGrid");
}

//엑셀출력
function btn_ExceEduClick(){
	excelDownLoad(getContextPath() + "/excel/statistics/atentCstmr.do",getJsondayReportMonthListExcel());
}

//시작 함수
$(document).ready(function(){
	//초기 셋팅되는 함수
	init_Department();
	
	//초기화버튼
	$("#btnInit").bind("click",btnInit_ClicikEvent);
    
	//검색버튼
	$("#btnSearch").bind("click",btnSearch_ClicikEvent);
	
	//엑셀다운로드버튼
	$("#btnExcel").bind("click",btn_ExceEduClick);
	
});