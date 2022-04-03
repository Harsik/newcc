//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var g_tbbsStrtDt = "";
var g_tbbsEndDt = "";

var currRowid = "";
var currTbbsId = "";
var isModComm = false;

var g_rowId = "";
var g_showNoticeFlag = false;

var isMgr = false;
var usrSelect = window.sessionStorage.getItem("USR_GRD_CD");

function userSelect(){
	//select
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/user/userList.do",
	    data : "pJson=" + getJsonStrUserList(),
	    success : function(data)
	    {
	     $("#k").html("");
	     
	     // param값을 JSON으로 파싱
	     var value = "";
	     value += "<option value='all'>전체</option>";
	     
	     $.each(data, function(key, state)
	     {
	    	 if(state.USR_NM!='센터관리자')
	      value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
	     });
	     
	     $("#optUsrNmList").append(value);
	     $("#optUsrNmList").val("all");
	    },
	    error : function(data, status, err) 
	    {
	    	alert("상담사 리스트를 불러오지 못합니다\n담당자에게 문의해주세요.");
	    }
	   });
}

//파라미터 셋팅 UserList
function getJsonStrUserList()
{
 var loParam = {
  "qt" : "c2VsZWN0TGlzdA==",
  "mi" : "b20wMDEuc2VsZWN0TGlzdA==",
  "map" : {
   "key" : "value",
   "notuse" : false,
   "chkRetire" : false,
   "cntr_cd" : "010000",
	"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
	"sord" : "asc",	
  }
 };
 console.log(JSON.stringify(loParam));
 return  encodeURIComponent(JSON.stringify(loParam));
}

//초기화 버튼
function btnInit_ClicikEvent(){
	 $("#optUsrNmList").val("all");
	 $("#jskDm_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
		$("#jskDm_tfTbbsEndDt").val(getDate());
	 
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	 g_tbbsStrtDt = $("#jskDm_tfTbbsStrtDt").val().replace(/-/g,"");
	 g_tbbsEndDt = $("#jskDm_tfTbbsEndDt").val().replace(/-/g,"");
	 
	//reload grid
		$("#jskDm_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : 1, sortname : "USR_NM", sortorder : "desc"});
		$("#jskDm_tblNotifyList").trigger("reloadGrid");
	
}
//검색버튼
function btnSearch_ClicikEvent(){

	g_tbbsStrtDt = $("#jskDm_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#jskDm_tfTbbsEndDt").val().replace(/-/g,"");

	var rMsg = "";
	if(g_tbbsStrtDt != "" || g_tbbsEndDt != "") {
		if(g_tbbsStrtDt == "") {
			rMsg += "\n시작일자를 입력해주세요.";
		}
		if(g_tbbsEndDt == "") {
			rMsg += "\n종료일자를 입력해주세요.";
		} else {
			var d_tbbsStrtDt = new Date(g_tbbsStrtDt.substr(0, 4), g_tbbsStrtDt.substr(4, 2), g_tbbsStrtDt.substr(6, 2));
			var d_tbbsEndDt = new Date(g_tbbsEndDt.substr(0, 4), g_tbbsEndDt.substr(4, 2), g_tbbsEndDt.substr(6, 2));
			if(d_tbbsStrtDt > d_tbbsEndDt) {
				rMsg += "\n시작일이 종료일보다 큽니다.";
			}
		}
	}
	
	if(rMsg != "") {
		alert(rMsg);
		return;
	}
	
	//reload gridW
	$("#jskDm_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "USR_NM", sortorder : "desc"});
	$("#jskDm_tblNotifyList").trigger("reloadGrid");
}

//엑셀다운로드
function getJsonjisikDemandExcel(callBackStrtDt, callBackEndDt){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMTUuZHNlbGVjdExpc3Q=", //om015.dselectList
			"map" : {
				"key" : "value",
				"title" : "상담_DB수정요청" + setDownLoadName($("#jskDm_tfTbbsStrtDt").val(), $("#jskDm_tfTbbsEndDt").val()),
				"tbbs_strt_dt" : callBackStrtDt,
				"tbbs_end_dt" : callBackEndDt,
				"usr_nm" : $("#optUsrNmList").val(),
				"sidx" : 'USR_NM',
				"sord" : "ASC",
				"colWidth" : [30,20,20,20],
				"colName" : ["USR_NM", "NEW_IS", "NEW_UP","NEW_DL"],
				"colHeader" : ["상담사", "신규  요청건수", "수정 요청건수","삭제 요청건수"/*,"등록건수"*/],
				"colAlign" : ["center","center", "center", "center"]
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//다운로드버튼
function btnDown_ClicikEvent(){
	//오즈연동
	var strDay = $("#jskDm_tfTbbsStrtDt").val().replace(/-/gi, "");
	 var endDay = $("#jskDm_tfTbbsEndDt").val().replace(/-/gi, "");
	 
	 excelDownLoad(getContextPath() + "/excel/statistics/jisikDemand.do",getJsonjisikDemandExcel(strDay,endDay));
}


//파라미터셋팅 nofifyAllList
function getJsonStrSelectNotifyList(srchtype, srchval, tbbsStrtDt, tbbsEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTUuZHNlbGVjdExpc3Q=", //om015.dselectList
		"map" : {
			"key" : "value",
			"tbbs_strt_dt" : tbbsStrtDt,
			"tbbs_end_dt" : tbbsEndDt,
			"usr_nm" : $("#optUsrNmList").val()
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//실행함수
$(document).ready(function(){
	$("#jskDm_btnExcel").css("display","none");
	//권한
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100"){
			isMngr = true;
		$("#jskDm_btnExcel").css("display","inline-block");
		}else{
			isMngr = false;
		$("#jskDm_btnExcel").css("display","none");
		}
	}
	
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#jskDm_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#jskDm_tfTbbsEndDt").val(getDate());	
	
	//날짜
	datePicker("#jskDm_tfTbbsStrtDt");
	datePicker("#jskDm_tfTbbsEndDt");
	
	//사용자 리스트
	userSelect();
	
	//초기화버튼
		$("#jskDm_btnInit").bind("click",btnInit_ClicikEvent);
	//검색버튼
		$("#jskDm_btnSearch").bind("click",btnSearch_ClicikEvent);
	//다운로드버튼
		$("#jskDm_btnExcel").bind("click",btnDown_ClicikEvent);
		
   //리스트
		//현재 월 1일부터 현재일까지 디폴트 셋팅
		$("#jskDm_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
		$("#jskDm_tfTbbsEndDt").val(getDate());	
		
		g_tbbsStrtDt = $("#jskDm_tfTbbsStrtDt").val().replace(/-/g,"");
		g_tbbsEndDt = $("#jskDm_tfTbbsEndDt").val().replace(/-/g,"");		
		
		$("#jskDm_tblNotifyList").jqGrid({
			url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["상담사", "신규  요청건수", "수정 요청건수","삭제 요청건수"/*,"등록건수"*/],
			colModel : [
			            { name : "USR_NM", index : "USR_NM", width : 30, align: "center"},
			            { name : "NEW_IS", index : "NEW_IS",align: "center" ,width :30 },
			            { name : "NEW_UP", index : "NEW_UP",align: "center" ,width :30 },
			            { name : "NEW_DL", index : "NEW_DL",align: "center" ,width :30 }/*,
				        { name : "NEW_TOTAL", index : "NEW_YNALL", width :30, align: "center" }*/],
	        sortname : "USR_NM",
	        sortorder : "desc",
	        gridview : true,
	        hidegrid : false,
	        shrinkToFit : true,
	        loadonce : false,
	        scrollOffset : 0,
	        height : "510",
	        width : "80%",
	        rowNum : 90,
	        rowList : [10, 20, 30, 50,70,20,20,20],
	        autowidth : true,
	        pager : "#jskDm_pgNotifyList",
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
		}).jqGrid("navGrid", "#jskDm_pgNotifyList", {edit : false, add : false, del : false, search : false});
		
});