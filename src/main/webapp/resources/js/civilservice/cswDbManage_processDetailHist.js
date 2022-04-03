var g_frDate = "";						
var g_toDate = "";

var  sendingUid =  opener.sendingUid;
var  sendingOuCode =  opener.sendingOuCode;


//파라미터셋팅 지식검색리스트
function getJsonStrHisList() {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b2gwMTUuc2VsZWN0SGlzTGlzdA==",
	    "map" : {
/*		"frDate" : g_frDate.replace(/[-, :, \s]/g,""),
		"toDate" : g_toDate.replace(/[-, :, \s]/g,""),*/
		"tbbsId" : tbbsId,
		"use_yn" : "Y"	
	    }
    };
    if(sendingOuCode=="030100" || sendingOuCode=="050100" || sendingOuCode=="090100"){
	loParam['map']['sendingOuCode']="010000";
    }
    return encodeURIComponent(JSON.stringify(loParam));	
}


//조회버튼 클릭이벤트  
function btnHisSearch_ClickEvent(){
    g_frDate=$("#cdmpdh_hisSrchSelFrDate").val();
    g_toDate=$("#cdmpdh_hisSrchSelToDate").val(); 
    $("#cdmpdh_tblHisSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrHisList()}, sortname : "CRT_DT desc, CRT_TM", sortorder : "desc"});
    $("#cdmpdh_tblHisSearch").trigger("reloadGrid");
}

//날짜 초기화
function initDate(){
    g_frDate=getDate();	
    g_toDate=getDate();	
    datePicker("#cdmpdh_hisSrchSelFrDate");
    datePicker("#cdmpdh_hisSrchSelToDate");
    $("#cdmpdh_hisSrchSelFrDate").val(g_frDate);
    $("#cdmpdh_hisSrchSelToDate").val(g_toDate);
}

//상담DB 변경이력 조회버튼 클릭이벤트 등록
function btnCnslAltListClickEvent()
{
	
	var width = 1500;
	var height = 900;
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;		
	
	var paramURL = getContextPath() + "/web/civilservice/cswcounseldbAltList.do?TBBS_ID=" + tbbsId;
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	//window.sessionStorage.setItem("BOARD_TYPE", "020100.insert");
	
	var newWindow = window.open(paramURL, "counseldbAltList", option);
	newWindow.focus();
}

$(document).ready(function(){
    initDate();
    $("#cdmpdh_tblHisSearch").jqGrid({
	url : "/jqgrid/civilservice/cswcounselDbHist.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrHisList()
	},
	jsonReader : {
	    repeatitems: false
	},
	colNames : ["번호","사용자ID","조직사용자ID","일시","부서명","담당자","처리상태","사유"],
	colModel :
	    [
	     
	     { name : "REQ_ID", index : "REQ_ID", hidden : true },
	     { name : "USR_ID", index : "USR_ID", hidden : true },
	     { name : "ORG_USR_ID", index : "ORG_USR_ID", hidden : true },
	     { name : "CRT_DTTM", index : "CRT_DTTM", align : "center", width : 60 },
	     { name : "ORG_FUL_NM", index : "ORG_FUL_NM", width : 80},
	     { name : "USR_NM", index : "USR_NM", align : "center", width : 30 },
	     { name : "PROCSTATS", index : "PROCSTATS", align : "center", width : 50},
	     { name : "RTN_RSN", index : "RTN_RSN", align : "left"}
	     ],		
//	     sortname : "CRT_DT desc, CRT_TM",
	     sortname : "CRT_DT desc,HIST_ORD desc, CRT_TM",
	     sortorder : "desc",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "677",
	     width : "100%",
	     rowNum : 26,
	     rowList : [25, 50, 70, 100],
	     autowidth : true,
	     pager : "#cdmpdh_pgHisSearch",
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords: true
	     /*onSelectRow : function(rowid){	}*/
    }).jqGrid("navGrid", "#cdmpdh_pgHisSearch", {edit : false, add : false, del : false, search : false});

	//상담DB 변경이력 조회버튼 클릭이벤트 등록
	$("#btnCnslAltList").bind("click",btnCnslAltListClickEvent);

    //------------------------이벤트 등록------------------------------//
    //조회버튼 클릭이벤트 등록
    //$("#cdmpdh_btnHisSearch").bind("click", btnHisSearch_ClickEvent);

});

