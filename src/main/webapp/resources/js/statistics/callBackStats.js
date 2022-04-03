//조회조건 및 조회값
var g_callBackStrtDt = "";
var g_callBackEndDt = "";

var usrSelect = window.sessionStorage.getItem("USR_GRD_CD");

//엑셀다운로드
function getJsondayCallBackStateExcel(callBackStrtDt, callBackEndDt){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuY2FsbGJhY2tzdGF0c2xpc3Q=",
			"map" : {
				"key" : "value",
				"title" : "콜백_현황" + setDownLoadName($("#cbSt_callBackStrtDt").val(), $("#cbSt_callBackEndDt").val()),
				"cbs_strt_dt" : callBackStrtDt,
				"cbs_end_dt" : callBackEndDt,
				"chkHoliday" : $("#cbSt_chkHoliday").is(":checked") ? "Y" : "N",
				"sidx" : 'TM_DESC',
				"sord" : "ASC",
				"colWidth" : [30,20,20,20],
				"colName" : ["TM_DESC", "COMP_CNT", "NOTYET_CNT","PCT"],
				"colHeader" : ["시간대","처리 건수","미처리 건수","비율"],
				"colAlign" : ["center","center", "center", "center"]
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터셋팅 callbackstatslist
function getJsonStrSelectCallBackList(callBackStrtDt, callBackEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY2FsbGJhY2tzdGF0c2xpc3Q=",
		"map" : {
			"key" : "value",
			"cbs_strt_dt" : callBackStrtDt,
			"cbs_end_dt" : callBackEndDt,
			"chkHoliday" : $("#cbSt_chkHoliday").is(":checked") ? "Y" : "N",
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//초기화 버튼
function btnInit_ClicikEvent(){
	
	 $("#cbSt_callBackStrtDt").val(getDate().substr(0, 8) + "01");
	 $("#cbSt_callBackEndDt").val(getDate());
	

	//현재 월 1일부터 현재일까지 디폴트 셋팅
	 g_callBackStrtDt = $("#cbSt_callBackStrtDt").val().replace(/-/g,"");
		g_callBackEndDt = $("#cbSt_callBackEndDt").val().replace(/-/g,"");
	 
	//reload grid
	$("#cbSt_callBackStatsList").jqGrid("setGridParam", {postData : {pJson :  getJsonStrSelectCallBackList(g_callBackStrtDt, g_callBackEndDt)}, 
			page : 1, sortname : "TM_DESC", sortorder : "asc"});
	$("#cbSt_callBackStatsList").trigger("reloadGrid");
	
}
//검색버튼
function btnSearch_ClicikEvent(){
	
	g_callBackStrtDt = $("#cbSt_callBackStrtDt").val().replace(/-/g,"");
	g_callBackEndDt = $("#cbSt_callBackEndDt").val().replace(/-/g,"");
	
	var rMsg = "";
	if(g_callBackStrtDt != "" || g_callBackEndDt != "") {
		if(g_callBackStrtDt == "") {
			rMsg += "\n시작일자를 입력해주세요.";
		}
		if(g_callBackEndDt == "") {
			rMsg += "\n종료일자를 입력해주세요.";
		} else {
			var d_callBackStrtDt = new Date(g_callBackStrtDt.substr(0, 4), g_callBackStrtDt.substr(4, 2), g_callBackStrtDt.substr(6, 2));
			var d_callBackEndDt = new Date(g_callBackEndDt.substr(0, 4), g_callBackEndDt.substr(4, 2), g_callBackEndDt.substr(6, 2));
			if(d_callBackStrtDt > d_callBackEndDt) {
				rMsg += "\n시작일이 종료일보다 큽니다.";
			}
		}
	}
	
	if(rMsg != "") {
		alert(rMsg);
		return;
	}
	//reload grid
	$("#cbSt_callBackStatsList").jqGrid("setGridParam", {postData : {pJson :  getJsonStrSelectCallBackList(g_callBackStrtDt, g_callBackEndDt)}, 
		page : 1, sortname : "TM_DESC", sortorder : "asc"});
	$("#cbSt_callBackStatsList").trigger("reloadGrid");
}
//다운로드버튼
function btnDown_ClicikEvent(){

	//현재 월 1일부터 현재일까지 디폴트 셋팅
	   g_callBackStrtDt = $("#cbSt_callBackStrtDt").val().replace(/-/g,"");
		g_callBackEndDt = $("#cbSt_callBackEndDt").val().replace(/-/g,"");
		
	excelDownLoad(getContextPath() + "/excel/statistics/callBackStats.do",getJsondayCallBackStateExcel(g_callBackStrtDt,g_callBackEndDt));
}

//실행함수
$(document).ready(function(){

	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#cbSt_callBackStrtDt").val(getDate().substr(0, 8) + "01");
	$("#cbSt_callBackEndDt").val(getDate());	

	//날짜
	datePicker("#cbSt_callBackStrtDt");
	datePicker("#cbSt_callBackEndDt");
	
	//초기화버튼
		$("#cbSt_btnInit").bind("click",btnInit_ClicikEvent);
	//검색버튼
		$("#cbSt_btnSearch").bind("click",btnSearch_ClicikEvent);
	//다운로드버튼
		$("#cbSt_btnExcel").bind("click",btnDown_ClicikEvent);
		
   //리스트
		//현재 월 1일부터 현재일까지 디폴트 셋팅
		$("#cbSt_callBackStrtDt").val(getDate().substr(0, 8) + "01");
		$("#cbSt_callBackEndDt").val(getDate());	
		
		g_callBackStrtDt = $("#cbSt_callBackStrtDt").val().replace(/-/g,"");
		g_callBackEndDt = $("#cbSt_callBackEndDt").val().replace(/-/g,"");		
		$("#cbSt_callBackStatsList").jqGrid({
			url : getContextPath() + "/jqgrid/statistics/callBackStats.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrSelectCallBackList(g_callBackStrtDt, g_callBackEndDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["시간대", "처리 건수","미처리 건수","비율"],
			colModel : [
			            { name : "TM_DESC", index : "TM_DESC", width : 20, align: "center"},
			            { name : "COMP_CNT", index : "COMP_CNT",align: "center" ,width :20 },
				        { name : "NOTYET_CNT", index : "NOTYET_CNT", width :20, align: "center" },
				        { name : "PCT", index : "PCT", width :20, align: "center" }
			            ],
	        sortname : "TM_DESC",
	        sortorder : "asc",
	        loadComplete: function() {
	            var ids = $("#cbSt_callBackStatsList").getDataIDs() ;
	           
	            $.each(ids, function(idx, rowId) {
	            	var rowData = $("#cbSt_callBackStatsList").getRowData(rowId) ;
	            	if(rowData.TM_DESC =="합계"){
	            		$("#cbSt_callBackStatsList").setRowData( rowId ,false,{background:"#EAEAEA"});
	            	}
	            	
	            	
	            	var selarrrow =  jQuery("#cbSt_callBackStatsList").jqGrid("getDataIDs");	//그리드의 id값들을 구해옴.
	            	for (var key in selarrrow) //자 순서대로 key 그리드 id값을 넘겨주고
	            	{
	            		var rowdata = jQuery("#cbSt_callBackStatsList").getRowData(key); //key에 맞는 로우값들을 가져옴.
	            		if(rowdata.COMP_CNT==null) //로우에 TEL 항목이 널이 아닌지 체크.

	            		{
	            			continue;
	            		}		
	            		$("#cbSt_callBackStatsList").setCell(key, "COMP_CNT",rowdata.COMP_CNT.replace(/&nbsp;/gi,"           "));	//특정 셀값을 변경하여줌.	

	            	}	
	            	
	           }) ;
	       },
	        gridview : true,
	        hidegrid : false,
	        shrinkToFit : true,
	        loadonce : false,
	        scrollOffset : 0,
	        height : "417",
	        sortable: false,
	        width : "60%",
	        rowNum : 999999,
	        rowList : [10, 20, 30, 50,70,80,90,100],
	        autowidth : true,
//	        pager : "#cbSt_pgcallBackStatsList",
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
		}).jqGrid("navGrid", "#cbSt_pgcallBackStatsList", {edit : false, add : false, del : false, search : false});
		//fnSetExternSelectionInfo($("#telSearch").val());
});