var gGroupValue = "";
var gUserValue = "";
var gArrGroup = {};
var gArrUser = {};


//파라미터셋팅 sms 발송이력
function getJsonStrSmsSendHistory()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cnNtX3Ntc19oaXN0b3J5LnNtc0hpc3RvcnlMaXN0",
		"map" : {
			"key" : "value",
			"sendFrDt" : $("#selFrDate").val().replace(/[-, :, \s]/g,""),
			"sendToDt" : $("#selToDate").val().replace(/[-, :, \s]/g,""),
			"sendGb" : $("#sendGubun").val(),
			"smsKind" : $("#smsKind").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 sms 수신그룹
function getJsonStrSmsRcvGroup()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cnNtX3JlY2Vpdmdyb3VwLnNtc1Jjdkdyb3VwTGlzdA==",
		"map" : {
			"key" : "value",
			"groupId" : $("#smsGroupId").val(),
			"targetId" : $("#smsTargetId").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrUserList() 
{	
	var loParam = {};

		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNjEuc2VsZWN0Q291bnNlbERlcHRVc2Vy",
			"map" : {
				"key" : "value",
				/*"deptId" : $("#selInstClass").val()*/
			}
		}
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrGroupList() 
{	
	var loParam = {};

		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuc2VsZWN0Q291bnNlbEtuZA==",
			"map" : {
				"key" : "value",
				"tp_cd" : "92010"		//장애시스템분류
			}
		}
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//jqGrid selectbox 사용자ID 설정
function getGridUserList()
{
	$.ajax({
		type : "post",
		//dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/user/userList.do",
		/*data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==","b20wNjEuc2VsZWN0Q291bnNlbERlcHRVc2Vy",{
			 "deptId" : $("#selInstClass").val()
		}),*/
		data : "pJson=" + getJsonStrUserList(),
		success : function(data)
		{
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			var arrValue = {};

			// "id1:name1;id2:name2" 
			$.each(jr, function(key, state){
				value += state.USR_ID + ":" + state.USR_NM + ";";
				arrValue[state.USR_NM]=state.USR_ID;
				
			});

			gUserValue=value.substr(0,value.length-1);
			gArrUser=arrValue;

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});	
}

//jqGrid selectbox groupID 설정
function getGridGroupList()
{
	$.ajax({
		type : "post",
		//dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/user/groupList.do",
		data : "pJson=" + getJsonStrGroupList(),
		success : function(data)
		{
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			var arrValue = {};

			// "id1:name1;id2:name2" 
			$.each(jr, function(key, state){
				value += state.CD + ":" + state.CD_NM + ";";
				arrValue[state.CD_NM]=state.CD;
				
			});

			gGroupValue=value.substr(0,value.length-1);
			gArrGroup=arrValue;

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});	
}

//SMS 발송이력 조회
function btnSearch_1_clickEvent()
{	
	$("#tblSendHistory").jqGrid("setGridParam", {postData : {pJson : getJsonStrSmsSendHistory()
		} , page : 1, sortname : "SENDDATE", sortorder : "desc"});
	$("#tblSendHistory").trigger("reloadGrid");
	
}

//SMS 발송이력 초기화
function btnReset_1_clickEvent() 
{
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	$("#smsKind").val("all");
	$("#sendGubun").val("all");
	
	//btnSearch_1_clickEvent();

}

//SMS 수신그룹 조회
function btnSearch_2_clickEvent()
{
	//버튼설정
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();
	
	$("#tblRcvGroup").jqGrid("setGridParam", {postData : {pJson : getJsonStrSmsRcvGroup()
		} , page : 1, sortname : "GROUPNAME", sortorder : "asc"});
	$("#tblRcvGroup").trigger("reloadGrid");

}

//SMS 수신그룹  초기화 버튼
function btnReset_2_clickEvent()
{
	$("#smsGroupId").val("all");
	$("#smsTargetId").val("all");
	
    $("#tblRcvGroup").trigger("reloadGrid");
    
	//버튼 설정
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();    
	$("#btnInsert_2").html("추가");
}

//SMS 수신그룹  jqGrid Row추가
function btnInsert_2_clickEvent()
{
	var name_by_id = document.getElementById('btnInsert_2').innerText;	
	
	//추가일때
	if (name_by_id == "추가")
	{
	
		var rowCount = $("#tblRcvGroup").getGridParam("reccount");
	
		if (rowCount != 0)
		{		
			for (var i in rowCount) {
				
					var rowData = $("#tblRcvGroup").getRowData(i);
					
					if (rowData.GROUPID == null || rowData.GROUP == "")
						return;
			}
		}
	
		$('#tblRcvGroup').addRowData("addRow", {});
		
		//버튼 설정
		$("#btnUpdate_2").hide();
		//$("#btnDelete_2").hide();
		$("#btnInsert_2").show();
		
		$("#btnInsert_2").html("저장");
	}
	//저장일때
	else
	{
		
		
		$("#btnInsert_2").html("추가");
	}
}    

//SMS 수신그룹  저장
function btnUpdate_2_clickEvent()
{
/*	$("#selFrDate_Sect5").val(getDate());
	$("#selToDate_Sect5").val(getDate());
	$("#cmpgNm_Sect5").val("");
	$("#selAgent_Sect5").val("all");
	*/
    $("#tblRcvGroup").trigger("reloadGrid");
}

//SMS 수신그룹 삭제
function btnDelete_2_clickEvent()
{	
	var rowCount = $("#tblRcvGroup").getGridParam("reccount");

	//if (rowCount == 0)
	//	return;
	//else {		
		for (var i in rowCount) {
			
				var rowData = $("#tblRcvGroup").getRowData(i);
				
				alert("rowData : " + rowData);
				
				
				//if (rowData.GROUPID == null || rowData.GROUP == "")
				//	return;
	//	}
	}
	
	
/*	$("#selFrDate_Sect5").val(getDate());
	$("#selToDate_Sect5").val(getDate());
	$("#cmpgNm_Sect5").val("");
	$("#selAgent_Sect5").val("all");*/
	
    $("#tblRcvGroup").trigger("reloadGrid");
}

//SMS 발송이력
function tblSendHistory_init_grid()
{
	$("#tblSendHistory").jqGrid({
		url : getContextPath() + "/jqgrid/rsm/SendHistory.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrSmsSendHistory()
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["발송일자", "시스템명", "IP ADDRESS","시간","발송상태", "수신그룹", "구분", "내용"],
			colModel : [
	       	 	{ name : "SENDDATE",      index : "SENDDATE",      align : "center", width : 80 },
	       	 	{ name : "SYSTNAME",      index : "SYSTNAME",      align : "left",   width : 80 },
	       	 	{ name : "IP_ADDR_1",     index : "IP_ADDR_1",     align : "center", width : 100 },
	       	 	{ name : "SENDTIME",      index : "SENDTIME",      align : "center", width : 60 },
	       	 	{ name : "SEND_GUBUN_NM", index : "SEND_GUBUN_NM", align : "center", width : 80 },
	       	 	{ name : "GROUPNM",       index : "GROUPNM",       align : "center", width : 80 },
	       	 	{ name : "SMS_KIND_NM",   index : "SMS_KIND_NM",   align : "center", width : 80 },
	       	 	{ name : "SMS_TEXT",      index : "SMS_TEXT",      align : "left",   width : 370 }
			],
			sortname : "SENDDATE",
			sortorder : "desc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "435",
		   	width : "100%",
		   	rowNum : 10,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#pgSendHistory",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onSelectRow : function(rowid) {
		   		
		   	},
		   	onPaging : function(pgButton) {	   		
			   		
		   	}
	}).jqGrid("navGrid", "#pgSendHistory", {edit : false, add : false, del : false, search : false});
	
	// 멀티 헤더 설정
	$("#tblSendHistory").setGroupHeaders(
    {
        useColSpanStyle: true,
        groupHeaders: [
            { "numberOfColumns": 5, "titleText": "SMS 발송내용", "startColumnName": "SEND_TIME" }]
    });
}

//SMS 수신그룹
function tblRcvGroup_init_grid()
{
	//jqGrid SelectBox Init
	getGridUserList();
	getGridGroupList();
	
	$("#tblRcvGroup").jqGrid({
		url : getContextPath() + "/jqgrid/rsm/SmsRcvGroup.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrSmsRcvGroup()
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["수신그룹<br>ID", "수신그룹<br>명", "수신자ID", "이름", "휴대폰", "담당업무", "소속", "발신구분", "Ping", "Resour", "Process", "Call", "Event"],
			colModel : [
	       	 	{ name : "GROUPID",   index : "GROUPID",    align : "center", width : 60, editable: true, edittype: "select", 
	       	 		editoptions: { value: gGroupValue, 
	       	 			//dataEvent:[{type: "change", fn: function(e) {fn_SelGroupId(this); $("#tblRcvGroup").jqGrid("setCell", $("#tblRcvGroup").getGridParam('selrow'), "GROUPNAME", "asas")}}] }},
	       	 			fdataEvent:[{type: "change", fn: function(e) {fn_SelGroupId(this)}}] }},
	       	 	{ name : "GROUPNAME", index : "GROUPNAME",  align : "center", width : 45 },
	       	 	{ name : "TARGETID",  index : "TARGETID",   align : "center", width : 60 },
	       	 	{ name : "TARGETNM",  index : "TARGETNM",   align : "center", width : 60, editable: true, edittype: "select", editoptions: { value: gUserValue }},                    
	       		{ name : "PHONENO",   index : "PHONENO",    align : "center", width : 80 },
	       	 	{ name : "JOBTITLE",  index : "JOBTITLE",   align : "center", width : 100 },
	       	 	{ name : "DEPTNM",    index : "DEPTNM",     align : "left",   width : 100 },
	       	 	{ name : "SENDGBNM",  index : "SENDGBNM",   align : "center", width : 65, editable : true, edittype: 'checkbox', editoptions: { value: "Y:N", defaultValue :"Y"} },
	       	 	{ name : "MONI_PING", index : "MONI_PING",  align : "center", width : 55, editable : true, edittype: 'checkbox', editoptions: { value: "Y:N", defaultValue :"Y"} },
	       	 	{ name : "MONI_RESUR",index : "MONI_RESUR", align : "center", width : 55, editable : true, edittype: 'checkbox', editoptions: { value: "Y:N", defaultValue :"Y"} },
	    	   	{ name : "MONI_PROC", index : "MONI_PROC",  align : "center", width : 55, editable : true, edittype: 'checkbox', editoptions: { value: "Y:N", defaultValue :"Y"} },
	    	   	{ name : "MONI_CALL", index : "MONI_CALL",  align : "center", width : 55, editable : true, edittype: 'checkbox', editoptions: { value: "Y:N", defaultValue :"Y"} },
	    	   	{ name : "MONI_EVENT",index : "MONI_EVENT", align : "center", width : 55, editable : true, edittype: 'checkbox', editoptions: { value: "Y:N", defaultValue :"Y"} },
			],
			sortname : "GROUPNAME",
			sortorder : "asc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "410",
		   	width : "100%",
		   	rowNum : 10,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#pgRcvGroup",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : true,		//false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onSelectRow : function(rowid) {
		   		var lastSelection;
		   		
                if (rowid && rowid !== lastSelection) {
                    var grid = $("#tblRcvGroup");
                    grid.jqGrid('restoreRow',lastSelection);
                    grid.jqGrid('editRow',rowid, true);
                    lastSelection = rowid;
                }		   		
		   	},
		   	onPaging : function(pgButton) {	   		
			   		
		   	}
	}).jqGrid("navGrid", "#pgRcvGroup", {edit : false, add : false, del : false, search : false});
	
	// 멀티 헤더 설정
	$("#tblRcvGroup").setGroupHeaders(
    {
        useColSpanStyle: true,
        groupHeaders: [
            { "numberOfColumns": 5, "titleText": "SMS 상세구분", "startColumnName": "MONI_PING" }]
    });	
}

function fn_SelGroupId()
{
	$("#tblRcvGroup").jqGrid("setCell", $("#tblRcvGroup").getGridParam('selrow'), "GROUPNAME", "asas");
}

//상담사 컨트롤 셋팅
function setSelectBoxWithUser()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data)
		{
			$("#smsTargetId").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});			
	
			$("#smsTargetId").append(value);
			$("#smsTargetId").trigger("change");
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function initControl()
{
    $("#tabs1").gbTabs("#ctnt1");
	
	datePicker("#selFrDate");
	datePicker("#selToDate");
	
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	//SMS 발송이력
	tblSendHistory_init_grid();
		
	//SMS 수신그룹
	tblRcvGroup_init_grid();

}

function initEvent()
{
	//SMS 발송이력
	$("#btnSearch_1").bind("click", btnSearch_1_clickEvent);
    $("#btnReset_1").bind("click", btnReset_1_clickEvent);    
 
    //SMS 수신그룹
    $("#btnSearch_2").bind("click", btnSearch_2_clickEvent);
    $("#btnReset_2").bind("click", btnReset_2_clickEvent);
    $("#btnInsert_2").bind("click", btnInsert_2_clickEvent);
    $("#btnUpdate_2").bind("click", btnUpdate_2_clickEvent);
    $("#btnDelete_2").bind("click", btnDelete_2_clickEvent);


}

function initData()
{
	//SMS 발송이력
    setSelectBoxWithCode("sendGubun","전체","92019", "", "","all");
	setSelectBoxWithCode("smsKind","전체","92020", "", "","all");

	//SMS 수신그룹
	setSelectBoxWithCode("smsGroupId","전체","92010", "", "","all");
	
	//SMS 수신그룹 수신자
	setSelectBoxWithUser();
	
}

$(function()
{	
	initControl();
	initEvent();
	initData();
	
	//버튼설정
	$("#btnInsert_2").show();
	$("#btnUpdate_2").hide();
	//$("#btnDelete_2").hide();		

});