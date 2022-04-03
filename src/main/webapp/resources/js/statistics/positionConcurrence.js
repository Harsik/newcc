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
	     
	     
	     // param값을 JSON으로 파싱
	     var value = "";
	     value += "<option value='all'>전체</option>";
	     
	     $.each(data, function(key, state)
	     {
	    	 if(state.USR_NM!='센터관리자')
	      value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
	     });
	     
	     $("#pstCcr_optUsrNmList").append(value);
	     $("#pstCcr_optUsrNmList").val("all");
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
	 $("#pstCcr_optUsrNmList").val("all");
	 $("#pstCcr_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
		$("#pstCcr_tfTbbsEndDt").val(getDate());
		$("#telSearch").val("");

	//현재 월 1일부터 현재일까지 디폴트 셋팅
	 g_tbbsStrtDt = $("#pstCcr_tfTbbsStrtDt").val().replace(/-/g,"");
	 g_tbbsEndDt = $("#pstCcr_tfTbbsEndDt").val().replace(/-/g,"");
	 
	//reload grid
		$("#pstCcr_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : 1, sortname : "intv_nm", sortorder : "asc"});
		$("#pstCcr_tblNotifyList").trigger("reloadGrid");
	
}
//검색버튼
function btnSearch_ClicikEvent(){
	
	g_tbbsStrtDt = $("#pstCcr_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#pstCcr_tfTbbsEndDt").val().replace(/-/g,"");

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
	$("#pstCcr_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "intv_nm", sortorder : "asc"});
	$("#pstCcr_tblNotifyList").trigger("reloadGrid");
}
//다운로드버튼
function btnDown_ClicikEvent(){
	 
	//오즈연동
	var strDay = $("#pstCcr_tfTbbsStrtDt").val().replace(/-/gi, "");
	 var endDay = $("#pstCcr_tfTbbsEndDt").val().replace(/-/gi, "");
	 var usr_id=$("#pstCcr_optUsrNmList").val();
	 var usr_phone=$("#telSearch").val();
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/positionConcurrence.jsp?p_num="+usr_phone+"&talk_nm="+usr_id+"&startDay="+strDay+"&endDay="+endDay+"&usr_nm="+encodeURI(encodeURIComponent(window.sessionStorage.getItem("USR_NM"))));
}


//파라미터셋팅 malignancyList
function getJsonStrSelectmalignancyCustomerList(tbbsStrtDt, tbbsEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEubWFsaWduYW5jeUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbbs_strt_dt" : tbbsStrtDt,
			"tbbs_end_dt" : tbbsEndDt,
			"usr_nm" : $("#pstCcr_optUsrNmList").val(),
			"telSearch": $("#telSearch").val().replace(/-/g, "")
			
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//실행함수
$(document).ready(function(){
		
	$("#pstCcr_btnExcel").css("display","none");
	//권한
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100"){
			isMngr = true;
		$("#pstCcr_btnExcel").css("display","inline-block");
		}else{
			isMngr = false;
		$("#pstCcr_btnExcel").css("display","none");
		}
	}
	
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#pstCcr_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#pstCcr_tfTbbsEndDt").val(getDate());	
	
	//날짜
	datePicker("#pstCcr_tfTbbsStrtDt");
	datePicker("#pstCcr_tfTbbsEndDt");
	
	//사용자 리스트
	userSelect();
	
	//초기화버튼
		$("#pstCcr_btnInit").bind("click",btnInit_ClicikEvent);
	//검색버튼
		$("#pstCcr_btnSearch").bind("click",btnSearch_ClicikEvent);
	//다운로드버튼
		$("#pstCcr_btnExcel").bind("click",btnDown_ClicikEvent);
		
   //리스트
		//현재 월 1일부터 현재일까지 디폴트 셋팅
		$("#pstCcr_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
		$("#pstCcr_tfTbbsEndDt").val(getDate());	
		
		g_tbbsStrtDt = $("#pstCcr_tfTbbsStrtDt").val().replace(/-/g,"");
		g_tbbsEndDt = $("#pstCcr_tfTbbsEndDt").val().replace(/-/g,"");		
		
		$("#pstCcr_tblNotifyList").jqGrid({
			url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["위치동의 요청일시", "상담사","고객명","전화번호","동의여부","취득경로","제공받는자","위치 확인결과 일시","응답결과","제공서비스"],
			colModel : [
			            { name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", width : 30, align: "center"},
			            { name : "RCV_USR_NM", index : "RCV_USR_NM",align: "center" ,width :20 },
				        { name : "CUST_NM", index : "CUST_NM", width :20, align: "center" },
				        { name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", width :20, align: "center" },
			            { name : "LOC_YN", index : "LOC_YN",align: "center" ,width :14 },
			            { name : "SUPPLY", index : "SUPPLY",align: "center" ,width :26 },
			            { name : "COURSE", index : "COURSE",align: "center" ,width :20 },
			            { name : "RESULTDAY", index : "RESULTDAY",align: "center" ,width :30 },
			            { name : "RESULTCODEUSR", index : "RESULTCODEUSR", width :20, align: "center" },
			            { name : "JG_SERVICE", index : "JG_SERVICE",align: "center" ,width :30 }
			            ],
	        sortname : "intv_nm",
	        sortorder : "asc",
	        gridview : true,
	        hidegrid : false,
	        shrinkToFit : true,
	        loadonce : false,
	        scrollOffset : 0,
	        height : "510",
	        sortable: false,
	        width : "80%",
	        rowNum : 10,
	        rowList : [10, 20, 30, 50,70,20,20,20,20,20,20],
	        autowidth : true,
	        pager : "#pstCcr_pgNotifyList",
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
		}).jqGrid("navGrid", "#pstCcr_pgNotifyList", {edit : false, add : false, del : false, search : false});
		//fnSetExternSelectionInfo($("#telSearch").val());
});