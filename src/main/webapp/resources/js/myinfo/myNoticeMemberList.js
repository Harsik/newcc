
$(document).ready(function(){
	var uTbbs_id = window.sessionStorage.getItem("uTbbs_id");
	var utbbsStrtDt = window.sessionStorage.getItem("utbbs_strt_dt");
	var utbbsEndDt = window.sessionStorage.getItem("utbbs_end_dt");
	
	
	 $("#ptblNotifyList").jqGrid({
		url : getContextPath() + "/jqgrid/myinfo/myNotifyCountList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectNotifyList(uTbbs_id)
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["상담사", "조회 일시","읽음여부"], 
		colModel : [
		            { name : "USR_NM", index : "USR_NM", width : 30, align: "center"},
		            { name : "CRT_DT", index : "CRT_DT", width : 40, align: "center"},
		            { name : "USE_YN", index : "USE_YN", align: "center", hidden : true}
		            ],
		gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "260",
        width : "80%",
        rowNum : 10,
        rowList : [10,20,30],
        autowidth : true,
        pager : "#ppgNotifyList",
        rownumbers : false,
        rownumWidth : 30,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        viewrecords: true,
        multiselect: false,
        gridComplete : function(){
        	var total = $(this).getGridParam("records");
        },
        error : function(data, status, err)
        {
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#ppgNotifyList", {edit : false, add : false, del : false, search : false});
});




//파라미터셋팅 myNoticeReadMemberList
function getJsonStrSelectNotifyList(uTbbs_id) {
    	var msg = window.dialogArguments;
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTEuZ2V0Tm90aWNlVXNlcg==",
		"map" : {
			"key" : "value",
			"tbbs_cl_cd" : "020100",
			"tbbs_id" : uTbbs_id
		}
	};	
	if(msg == "notify"){
	    loParam['map']['tbbs_cl_two'] ="050100";
	}
  
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
