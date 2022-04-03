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
				/*"deptId" : "6520087" //$("#selInstClass").val()*/			
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
}
//SMS 수신그룹  저장
function btnInsert_clickEvent()
{	
	var qt = "";
	var mi = "";
	var name_by_id = document.getElementById('btnInsert').innerText;	
	
	//추가일때 insert
	if (name_by_id == "추가")
	{		
		qt = "aW5zZXJ0";
		mi = "cnNtX3JlY2Vpdmdyb3VwLmluc2VydA==";		
	}
	//저장일때 update
	else
	{
		qt = "dXBkYXRl";
		mi = "cnNtX3JlY2Vpdmdyb3VwLnVwZGF0ZQ==";				
	}	
	
	if($("#groupId").val() == null || $("#groupId").val() == "all")
	{
		alert("수신그룹을 선택해 주세요.");
		$("#groupId").focus;
		return;
	}
	else if($("#targetId").val() == null || $("#targetId").val() == "all")
	{
		alert("수신자를 선택해 주세요.");
		$("#targetId").focus;
		return;
	}
	else	
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/rsm/insertReceivGroup.do",
			data : "pJson=" + getJsonStr(qt,mi,{
				 "groupId" : $("#groupId").val(),
				 "targetId" : $("#targetId").val(),
				 "sendGubun" : $("input:checkbox[id='sendGbNm']").is(":checked") ? "1" : "0",
				 "moniPing" : $("input:checkbox[id='moni_Ping']").is(":checked") ? "1" : "0",
				 "moniResur" : $("input:checkbox[id='moni_Presur']").is(":checked") ? "1" : "0",
				 "moniProc" : $("input:checkbox[id='moni_Proc']").is(":checked") ? "1" : "0",
				 "moniCall" : $("input:checkbox[id='moni_Call']").is(":checked") ? "1" : "0",
				 "moniEvent" : $("input:checkbox[id='moni_Event']").is(":checked") ? "1" : "0"
			}),
			success : function(data)
			{	
				alert("저장되었습니다");
				$("#tblRcvGroup").trigger("reloadGrid");
				initSmsGroupData();
				
				if (name_by_id == "추가")
				{
					//버튼 설정
					$("#btnUpdate").hide();		
					$("#btnInsert").show();		
					$("#btnInsert").html("저장");
				} else {
					$("#btnDelete").hide();
					$("#btnInsert").html("추가");
				}
				
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}					
}

function btnUpdate_clickEvent()
{
	
	$("#tblRcvGroup").trigger("reloadGrid");
}
//SMS 수신그룹 삭제
function btnDelete_clickEvent()
{
	if($("#groupCd").val() == null || $("#groupCd").val() == "")
	{
		alert("삭제 대상 수신그룹을 선택해 주세요.");
	}
	else	
	{
		if(confirm("삭제 하시겠습니까?"))
		{
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/rsm/deleteSmsReceiveGroup.do",
				data : "pJson=" + getJsonStr("ZGVsZXRl","cnNtX3JlY2Vpdmdyb3VwLmRlbGV0ZQ==",{
					 "groupId" : $("#groupCd").val(),
					 "targetId" : $("#targetCd").val(),
				}),
				success : function(data)
				{
					alert("삭제되었습니다");
					$("#tblRcvGroup").trigger("reloadGrid");
					btnInit_clickEvent();				
							
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		} else
			return;
	}
	
	
}

function btnInit_clickEvent()
{
	initSmsGroupData();
	
	//버튼 설정
	$("#btnUpdate").hide();
	$("#btnDelete").hide();
	$("#btnInsert").show();    
	$("#btnInsert").html("추가");	
}

function targetId_changeEvent()
{
	if($("#targetId").val() == null || $("#targetId").val() == "")
	{
		$("#targetCd").val("");
		$("#phoneNo").val("");
		$("#jobTitle").val("");
		$("#dpetNm").val("");
		return;
	}
	else	
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/rsm/selectUsrInfo.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l","b20wNjEuc2VsZWN0QWRtaW5BZ2VuY3lVc2VySW5mbw==",{
				 "userId" : $("#targetId").val(),
				 /*"deptId" : "6500634",*/
			}),
			success : function(data)
			{
				$("#targetCd").val(data.ORG_USR_ID);
				$("#phoneNo").val(getPhoneNumFormat(data.TELEPHONENUMBER));
				$("#jobTitle").val(data.JOBTITLE);
				$("#dpetNm").val(data.DEPT_NM);			
						
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}	
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
			colNames : ["수신그룹<br>ID", "수신<br>그룹명", "수신자ID", "이름", "휴대폰", "담당업무", "소속", "발신구분", "Ping", "Resour", "Process", "Call", "Event"],
			colModel : [
	       	 	{ name : "GROUPID",   index : "GROUPID",    hidden:true },
	       	 	{ name : "GROUPNAME", index : "GROUPNAME",  align : "center", width : 55 },
	       	 	{ name : "TARGETID",  index : "TARGETID",   align : "center", width : 80 },
	       	 	{ name : "TARGETNM",  index : "TARGETNM",   align : "center", width : 60 },                    
	       		{ name : "PHONENO",   index : "PHONENO",    align : "center", width : 80 },
	       	 	{ name : "JOBTITLE",  index : "JOBTITLE",   align : "center", width : 140 },
	       	 	{ name : "DEPTNM",    index : "DEPTNM",     align : "left",   width : 120 },
	       	 	{ name : "SENDGUBUN", index : "SENDGUBUN",  align : "center", width : 65, formatter: "checkbox" },
	       	 	{ name : "MONI_PING", index : "MONI_PING",  align : "center", width : 55, formatter: "checkbox" },
	       	 	{ name : "MONI_RESUR",index : "MONI_RESUR", align : "center", width : 55, formatter: "checkbox" },
	    	   	{ name : "MONI_PROC", index : "MONI_PROC",  align : "center", width : 55, formatter: "checkbox" },
	    	   	{ name : "MONI_CALL", index : "MONI_CALL",  align : "center", width : 55, formatter: "checkbox" },
	    	   	{ name : "MONI_EVENT",index : "MONI_EVENT", align : "center", width : 55, formatter: "checkbox" },
			],
			sortname : "GROUPNAME",
			sortorder : "asc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "230",
		   	width : "100%",
		   	rowNum : 10,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#pgRcvGroup",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onSelectRow : function(rowid) {
		   		
		   		var row = $("#tblRcvGroup").getRowData(rowid);
		   		
		   		$("#groupId").val(row.GROUPID);
		   		$("#targetId").val(row.TARGETID);
		   		
		   		$("#groupCd").val(row.GROUPID);
		   		$("#targetCd").val(row.TARGETID);
		   		
		   		$("#phoneNo").val(getPhoneNumFormat(row.PHONENO));
		   		$("#jobTitle").val(row.JOBTITLE);
		   		$("#dpetNm").val(row.DEPTNM);
		   		
		   		//발신구분
		   		if (row.SENDGUBUN == "Yes")
		   			$("#sendGbNm").prop("checked", true);
		   		else
		   			$("#sendGbNm").prop("checked", false);
		   		
		   		//SMS 상세구분 Ping
		   		if (row.MONI_PING == "Yes")
		   			$("#moni_Ping").prop("checked", true);
		   		else
		   			$("#moni_Ping").prop("checked", false);
		   		
		   		//SMS 상세구분 Presur
		   		if (row.MONI_RESUR == "Yes")
		   			$("#moni_Presur").prop("checked", true);
		   		else
		   			$("#moni_Presur").prop("checked", false);
		   		
		   		//SMS 상세구분 Proc
		   		if (row.MONI_PROC == "Yes")
		   			$("#moni_Proc").prop("checked", true);
		   		else
		   			$("#moni_Proc").prop("checked", false);
		   		
		   		//SMS 상세구분 Call
		   		if (row.MONI_CALL == "Yes")
		   			$("#moni_Call").prop("checked", true);
		   		else
		   			$("#moni_Call").prop("checked", false);
		   		
		   		//SMS 상세구분 Event
		   		if (row.MONI_EVENT == "Yes")
		   			$("#moni_Event").prop("checked", true);
		   		else
		   			$("#moni_Event").prop("checked", false);
		   		
		   		$("#groupId option").not(":selected").attr("disabled", "disabled");
		   		
		   		$("#btnInsert").html("저장");	
		   		$("#btnDelete").show();
 		
		   	},
		   	onPaging : function(pgButton) {	   		
			   		
		   	},
			gridComplete : function()
			{
				var rowIdArr = $("#tblRcvGroup").getDataIDs();
				
				for(var i = 0; i < rowIdArr.length; i++)
				{
					$("#tblRcvGroup").setCell(rowIdArr[i], "PHONENO", getPhoneNumFormat($("#tblRcvGroup").getRowData(rowIdArr[i]).PHONENO));
				}
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

//상담사 컨트롤 셋팅
function setSelectBoxWithUser(objTarget)
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data)
		{
			$("#" +  objTarget).html("");
			// param값을 JSON으로 파싱
			var value = "";
			if (objTarget == "smsTargetId")
				value += "<option value='all'>전체</option>";
			else
				value += "<option value='all'>미선택</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});			
	
			$("#" + objTarget).append(value);
			$("#" + objTarget).trigger("change");
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}
//SMS 수신그룹 입력란 초기화
function initSmsGroupData()
{
	$("#groupCd").val("");
	$("#groupId").val("all");	
	$("#targetId").val("all");
	$("#targetCd").val("");
	$("#phoneNo").val("");
	$("#jobTitle").val("");
	$("#dpetNm").val("");

	//발신여부 여부 체크
	$("#sendGbNm").prop("checked", false);  		
	//ping 여부 체크
	$("#moni_Ping").prop("checked", false);
	//resource 여부 체크
	$("#moni_Presur").prop("checked", false);
	//process 여부 체크
	$("#moni_Proc").prop("checked", false);	
	//Call 여부 체크
	$("#moni_Call").prop("checked", false);	
	//Event 여부 체크
	$("#moni_Event").prop("checked", false);	
	
	$("#groupId option").not(":selected").removeAttr("disabled");
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

    $("#btnInsert").bind("click", btnInsert_clickEvent);
    $("#btnUpdate").bind("click", btnUpdate_clickEvent);
    $("#btnDelete").bind("click", btnDelete_clickEvent);
    $("#btnInit").bind("click", btnInit_clickEvent);
    
    $("#targetId").bind("change", targetId_changeEvent);
}

function initData()
{
	//SMS 발송이력
    setSelectBoxWithCode("sendGubun","전체","92019", "", "","all");
	setSelectBoxWithCode("smsKind","전체","92020", "", "","all");

	//SMS 수신그룹
	setSelectBoxWithCode("smsGroupId","전체","92010", "", "","all");
	setSelectBoxWithCode("groupId","미선택","92010", "", "","all");
	
	//SMS 수신그룹 수신자
	setSelectBoxWithUser("smsTargetId");
	setSelectBoxWithUser("targetId");
	
}

$(function()
{	
	initControl();
	initEvent();
	initData();
	
	//버튼설정
	$("#btnInsert").show();
	$("#btnUpdate").hide();
	$("#btnDelete").hide();	

});