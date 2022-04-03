/**
 * 
 */

var g_dmStrtDt = "";
var g_dmEndDt = "";

//파라미터셋팅 malignancyList
function getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wNDIuY29tcGxldGlvbkVkdXN0YXRlTGlzdA==",
		"map" : {
			"key" : "value",
			"g_dmStrtDt" : g_dmStrtDt,
			"g_dmEndDt" : g_dmEndDt,
			"edu_Class_Cd" : $("#optDepartmentList").val()
			
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//엑셀다운로드
function getJsondayReportMonthListExcel(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNDIuY29tcGxldGlvbkVkdXN0YXRlTGlzdA==",
			"map" : {
				"key" : "value",
				"title" : "교육_이수_현황" + setDownLoadName(g_dmStrtDt, g_dmEndDt),
				"g_dmStrtDt" : g_dmStrtDt,
				"g_dmEndDt" : g_dmEndDt,
				"edu_Class_Cd" : $("#optDepartmentList").val(),
				"sidx" : 'EDU_ID',
				"sord" : "ASC",
				"colWidth" : [40,40,50,20],
				"colName" : ["EDU_CLASS_NM", "EDU_DT", "EDU_CONT","TRGT_CNT"],
				"colHeader" : ["교육명","교육기간","내용","참석자"],
				"colAlign" : ["center","center", "center", "center"]
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 UserList
function getJsonStreduList()
{
 var loParam = {
  "qt" : "c2VsZWN0TGlzdA==",
  "mi" : "c20wMDIuZWR1TGlzdFNlbGVjdA==",
  "map" : {
   "key" : "value"
  }
 };
 console.log(JSON.stringify(loParam));
 return  encodeURIComponent(JSON.stringify(loParam));
}

function eduSelect(){
	//select
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/statistics/eduList.do",
	    data : "pJson=" + getJsonStreduList(),
	    success : function(data)
	    {
	     // param값을 JSON으로 파싱
	     var value = "";
	     value += "<option value='all'>전체</option>";
	     
	     $.each(data, function(key, state)
	     {
	      value += "<option value='" + state.CODE + "'>" + state.EDU_NM + "</option>";
	     });
	     
	     $("#optDepartmentList").append(value);
	     $("#optDepartmentList").val("all");
	    },
	    error : function(data, status, err) 
	    {
	    	alert("상담사 리스트를 불러오지 못합니다\n담당자에게 문의해주세요.");
	    }
	   });
}

//초기 셋팅함수
function init_Department(){
	//교육명
	eduSelect();
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#cmpltnEdst_tfDmStrtDt").val(getDate().substr(0, 8) + "01");
	$("#cmpltnEdst_tfDmEndDt").val(getDate());
	
	g_dmStrtDt = $("#cmpltnEdst_tfDmStrtDt").val().replace(/-/g,"");
	g_dmEndDt = $("#cmpltnEdst_tfDmEndDt").val().replace(/-/g,"");		
	
	
	//날짜
	datePicker("#cmpltnEdst_tfDmStrtDt");
	datePicker("#cmpltnEdst_tfDmEndDt");
	
	
	$("#cmpltnEdst_tbldepartmentList").jqGrid({
		url : getContextPath() + "/jqgrid/statistics/completionEdustate.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["교육명","교육기간","내용","참석자"],
		colModel : [
		            { name : "EDU_CLASS_NM", index : "EDU_CLASS_NM", width : 30, align: "center"},
		            { name : "EDU_DT", index : "EDU_DT",align: "center" ,width :20 },
			        { name : "EDU_CONT", index : "EDU_CONT", width :20, align: "center" },
			        { name : "TRGT_CNT", index : "TRGT_CNT", width :20, align: "center" }
		            ],
		/*20191016 sortname t1.EDU_ID -> EDU_ID 변경*/            
        sortname : "EDU_ID",
        sortorder : "asc",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "510",
        sortable: false,
        width : "80%",
        rowNum : 100,
        rowList : [10, 20, 30, 50,70,20,20,20,20,20,20],
        autowidth : true,
        pager : "#cmpltnEdst_pgDepartmentList",
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
	}).jqGrid("navGrid", "#cmpltnEdst_pgDepartmentList", {edit : false, add : false, del : false, search : false});
	
	
}

//초기화 함수
function btnInit_ClicikEvent(){
	 $("#optDepartmentList").val("");
	 	$("#cmpltnEdst_tfDmStrtDt").val(getDate().substr(0, 8) + "01");
		$("#cmpltnEdst_tfDmEndDt").val(getDate());

	//현재 월 1일부터 현재일까지 디폴트 셋팅
	 g_dmStrtDt = $("#cmpltnEdst_tfDmStrtDt").val().replace(/-/g,"");
	 g_dmEndDt = $("#cmpltnEdst_tfDmEndDt").val().replace(/-/g,"");
	
	//reload grid
		$("#cmpltnEdst_tbldepartmentList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)}, 
			page : 1, sortname : "EDU_ID", sortorder : "asc"});
		$("#cmpltnEdst_tbldepartmentList").trigger("reloadGrid");
}

//검색 함수
function btnSearch_ClicikEvent(){

	$("#cmpltnEdst_tfDmStrtDt").attr("disabled",true); 
	$("#cmpltnEdst_tfDmEndDt").attr("disabled",true);
	
	g_dmStrtDt = $("#cmpltnEdst_tfDmStrtDt").val().replace(/-/g,"");
	g_dmEndDt = $("#cmpltnEdst_tfDmEndDt").val().replace(/-/g,"");

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
	$("#cmpltnEdst_tbldepartmentList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectdepartmentalTransferList(g_dmStrtDt, g_dmEndDt)}, 
		page : 1, sortname : "EDU_ID", sortorder : "asc"});
	$("#cmpltnEdst_tbldepartmentList").trigger("reloadGrid");
}

//엑셀출력
function btn_ExceEduClick(){
	excelDownLoad(getContextPath() + "/excel/statistics/completionEdustateList.do",getJsondayReportMonthListExcel());
}

//시작 함수
$(document).ready(function(){
	//초기 셋팅되는 함수
	init_Department();
	
	//초기화버튼
	$("#cmpltnEdst_btnInit").bind("click",btnInit_ClicikEvent);
    
	//검색버튼
	$("#cmpltnEdst_btnSearch").bind("click",btnSearch_ClicikEvent);
	
	//엑셀다운로드버튼
	$("#cmpltnEdst_btnExcel").bind("click",btn_ExceEduClick);
	
});