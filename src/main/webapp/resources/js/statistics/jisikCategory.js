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
	 $("#tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
		$("#tfTbbsEndDt").val(getDate());
	 
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	 g_tbbsStrtDt = $("#tfTbbsStrtDt").val().replace(/-/g,"");
	 g_tbbsEndDt = $("#tfTbbsEndDt").val().replace(/-/g,"");
	 
	//reload grid
		$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : 1, sortname : "intv_nm", sortorder : "asc"});
		$("#tblNotifyList").trigger("reloadGrid");
	
}
//검색버튼
function btnSearch_ClicikEvent(){
	
	$("#tfTbbsStrtDt").attr("disabled",true); 
	$("#tfTbbsEndDt").attr("disabled",true);
	
	g_tbbsStrtDt = $("#tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#tfTbbsEndDt").val().replace(/-/g,"");

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
	
	//reload grid
	$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "intv_nm", sortorder : "asc"});
	$("#tblNotifyList").trigger("reloadGrid");
}
//다운로드버튼
function btnDown_ClicikEvent(){
	//오즈연동
	var strDay = $("#tfTbbsStrtDt").val().replace(/-/gi, "");
	 var endDay = $("#tfTbbsEndDt").val().replace(/-/gi, "");
	 window.open("http://" + window.location.hostname + ":8090/ClipReport4/jisikCategory.jsp?startDay="+strDay+"&endDay="+endDay+"&usr_nm="+window.sessionStorage.getItem('USR_NM'));
}


//파라미터셋팅 malignancyList
function getJsonStrSelectmalignancyCustomerList(tbbsStrtDt, tbbsEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEubXZpZXdMaXN0",
		"map" : {
			"key" : "value",
			"tbbs_strt_dt" : tbbsStrtDt,
			"tbbs_end_dt" : tbbsEndDt
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//실행함수
$(document).ready(function(){
	$("#btnExcel").css("display","none");
	//권한
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100"){
			isMngr = true;
		$("#btnExcel").css("display","inline-block");
		}else{
			isMngr = false;
		$("#btnExcel").css("display","none");
		}
	}
	
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#tfTbbsEndDt").val(getDate());	
	
	//날짜 삽입 방지
	$("#tfTbbsStrtDt").attr("disabled",true); 
	$("#tfTbbsEndDt").attr("disabled",true);
	//날짜
	datePicker("#tfTbbsStrtDt");
	datePicker("#tfTbbsEndDt");
	
	//사용자 리스트
	userSelect();
	
	//초기화버튼
		$("#btnInit").bind("click",btnInit_ClicikEvent);
	//검색버튼
		$("#btnSearch").bind("click",btnSearch_ClicikEvent);
	//다운로드버튼
		$("#btnExcel").bind("click",btnDown_ClicikEvent);
		
   //리스트
		//현재 월 1일부터 현재일까지 디폴트 셋팅
		$("#tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
		$("#tfTbbsEndDt").val(getDate());	
		
		g_tbbsStrtDt = $("#tfTbbsStrtDt").val().replace(/-/g,"");
		g_tbbsEndDt = $("#tfTbbsEndDt").val().replace(/-/g,"");		
		
		$("#tblNotifyList").jqGrid({
			url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["일자", "관광지","교통","숙박","음식","쇼핑","불편민원접수","현장출동","기타","계"],
			colModel : [
			            { name : "GIGAN", index : "GIGAN", width : 30, align: "center"},
			            { name : "DUTY", index : "DUTY",align: "center" ,width :20 },
				        { name : "CULTURE", index : "CULTURE", width :20, align: "center" },
				        { name : "WELFARE", index : "WELFARE", width :20, align: "center" },
			            { name : "UNDERGO", index : "UNDERGO",align: "center" ,width :20 },
			            { name : "MINWON", index : "MINWON",align: "center" ,width :30 },
				        { name : "TRAFFIC", index : "TRAFFIC", width :20, align: "center" },
				        { name : "SEWAGE", index : "SEWAGE", width :20, align: "center" },
				        { name : "ETC", index : "ETC", width :20, align: "center" },
				        { name : "TOTAL", index : "TOTAL", width :20, align: "center" }],
	        sortname : "intv_nm",
	        sortorder : "asc",
	        gridview : true,
	        hidegrid : false,
	        shrinkToFit : true,
	        loadonce : false,
	        scrollOffset : 0,
	        height : "308",
	        width : "80%",
	        rowNum : 10,
	        rowList : [10, 20, 30, 50,70,20,20,20],
	        autowidth : true,
	        pager : "#pgNotifyList",
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
		}).jqGrid("navGrid", "#pgNotifyList", {edit : false, add : false, del : false, search : false});
		
});