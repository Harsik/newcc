var g_usrGrdCd = getUserGrdCode();

function getLastWeek()
{
	var date = new Date(getDate());
	var week = new Date(date);
	week.setDate(week.getDate() - 6);
	var nw = new Date(week);
	
	var year = nw.getFullYear();
	var month = nw.getMonth() + 1;
	var day = nw.getDate();
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	
	return year + "-" + month + "-" + day;
}

//페이지 초기화
$(document).ready(function()
{	
	datePicker("#vocFrDate");
	datePicker("#vocToDate");
	datePicker("#limitTime");
	
	$("#vocFrDate").val(getLastWeek());
	$("#vocToDate").val(getDate());
	
	$("input[name=vocCodetype_term]").change(function()
	{
		var radioValue = $(this).val();
	
		if (radioValue == "today")
		{
			$("#vocFrDate").val(getDate());
		}
		else if (radioValue == "week")
		{
			var date = new Date(getDate());
			var week = new Date(date);
			week.setDate(week.getDate() - 6);
			var nw = new Date(week);
			
			var year = nw.getFullYear();
			var month = nw.getMonth() + 1;
			var day = nw.getDate();
			
			if(month < 10)
				month = "0"+month;
			if(day < 10)
				day = "0"+day;
			
			var newWeek = year + "-" + month + "-" + day;
			
			$("#vocFrDate").val(newWeek);
		}
		else if (radioValue == "month")
		{
			var date = new Date(getDate());
			var oneMonth = new Date(date);
			oneMonth.setDate(oneMonth.getDate() - 30);
			var nm = new Date(oneMonth);
			
			var year = nm.getFullYear();
			var month = nm.getMonth() + 1;
			var day = nm.getDate();
			
			if(month < 10)
				month = "0"+month;
			if(day < 10)
				day = "0"+day;
			
			var newMonth = year + "-" + month + "-" + day;
			
			$("#vocFrDate").val(newMonth);
		}
	});
	
	$("input:radio[name=vocCodetype_term]:input[value=week]").prop("checked", true);
	
	setSelectBoxWithCode("vocLastDepthCd", "", "90240", "", "", "");
	setSelectBoxWithCode("vocManager", "", "90250", "", "", "");
	setSelectBoxWithCode("vocSpec2", "", "90210", "", "", "");
	setSelectBoxWithCode("vocSpec3", "", "90220", "", "", "");
	setSelectBoxWithCode("vocSpec4", "", "90230", "", "", "");
	setSelectBoxWithCode("vocSrchType1", "전체", "90260", "", "", "all");
	setSelectBoxWithCode("vocSrchType4", "전체", "90220", "", "", "all");
	setSelectBoxWithCode("vocSrchType5", "전체", "90230", "", "", "all");
	setSelectBoxWithCode("vocSrchType6", "전체", "90210", "", "", "all");
	setSelectBoxWithCode("vocSpec9", "", "90280", "", "", "");

	$("#vocSpec10").bind("change", function()
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/user/userList.do",
			data : "pJson=" + getJsonStrUserListForVoc($("#vocSpec10").val(), ""),
			success : function(data)
			{
				$("#vocSpec11").html("");
				
				var value = "";
				
				$.each(data, function(key, state)
				{
					// 특정 아이디 추가 제외
					if(state.USR_ID != "mtrace" &&  state.USR_ID != "ekape" && state.USR_ID != "mtracej")
						value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				});
				
				$("#vocSpec11").append(value);
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	});
	
	$("#vocSpec8").bind("change", function()
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/user/userList.do",
			data : "pJson=" + getJsonStrUserListForVoc($("#vocSpec8").val(), "030100"),
			success : function(data)
			{
				$("#vocSpec8_1").html("");
				
				var value = "";
				
				$.each(data, function(key, state)
				{
					value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				});
				
				$("#vocSpec8_1").append(value);
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	});
	
	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrCenterSelectBox(),
		success : function(data)
		{
			$("#vocSpec10").html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$("#vocSpec10").append(value);
			$("#vocSpec10").val(window.sessionStorage.getItem("CNTR_CD"));

			if($("#vocSpec10").val() == null || $("#vocSpec10").val() == "")
				$("#vocSpec10").val($("#vocSpec10").find("option:first").val());
			
			$("#vocSpec10").trigger("change");
			
			$("#vocSpec8").html("");
			$("#vocSpec8").append(value);
			$("#vocSpec8").val(window.sessionStorage.getItem("CNTR_CD"));
			
			if($("#vocSpec8").val() == null || $("#vocSpec8").val() == "")
				$("#vocSpec8").val($("#vocSpec8").find("option:first").val());
			
			$("#vocSpec8").trigger("change");
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	setSelectBoxWithCode("vocSpec13", "", "90260", "", "", "");
	
	$("#vocListR").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/vocList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrVocList("", "", "", "", "", "", "", "", "")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["TCKT_IDID", "VOC_ID", "CUST_ID", "RST_CD_R", "접수일시", "회사/부서", "민원인", "연락처", "접수자", "이관구분", "이관부서", "담당자", "처리기한", "처리결과", "고객통보", "통보방식"],
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
	   	 	{ name : "VOC_ID", index : "VOC_ID", hidden:true },
	   	 	{ name : "CUST_ID", index : "CUST_ID", hidden:true },
	   	 	{ name : "RST_CD_R", index : "RST_CD_R", hidden:true },
			{ name : "RCV_TM_FORMAT", index : "RCV_TM_FORMAT", align : "center", width : 120 },
			{ name : "CORP_NM,", index : "CORP_NM", align : "center", width : 90 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 60 },
			{ name : "VOC_CALL", index : "VOC_CALL", align : "center", width : 90 },
			{ name : "CREAT_USR_ID", index : "CREAT_USR_ID", align : "center", width : 60 },
			{ name : "FAST_YN", index : "FAST_YN", align : "center", width : 60 },			
			{ name : "LAST_DEPT_CD", index : "LAST_DEPT_CD", align : "center", width : 80 },			
			{ name : "LAST_ID", index : "LAST_ID", align : "center", width : 50 },			
			{ name : "PROC_DELAY", index : "PROC_DELAY", align : "center", width : 80 },
			{ name : "RST_CD", index : "RST_CD", align : "center", width : 60 },
			{ name : "NOTICE_YN", index : "NOTICE_YN", align : "center", width : 60 },
			{ name : "NOTICE_METHOD_CD", index : "NOTICE_METHOD_CD", hidden:true }
	   	],
	   	sortname : "RCV_TM_FORMAT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#pgVocListR",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var row = $("#vocListR").getRowData(rowid);	
	   		
	   		vocInitTable(row.VOC_ID);
	   		vocHandleTable(row.VOC_ID, row.RST_CD_R);
	   		
	   		$("#vocHiddenId").val(row.VOC_ID);
	   		$("#noticeYn").val(row.NOTICE_YN);
	   		$("#noticeMethod").val(row.NOTICE_METHOD_CD);
	   	}
	}).jqGrid("navGrid", "#pgVocListR", {edit : false, add : false, del : false, search : false});
	
	// 검색타입 선택 이벤트 등록
	$("#vocSrchType3").bind("change", optSrchtype_changeEvent);
	// 조회 버튼 클릭 이벤트 등록
	$("#vocbtnSearch").bind("click", vocBtnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#vocbtnInit").bind("click", vocInitEvent);
	// 엑셀저장 버튼 클릭 이벤트 등록
	$("#btnExcelVocPopup").bind("click", btnExcelVocPopup_clickEvent);
	// 부서이관 버튼 클릭 이벤트 등록
	$("#btnTransfer").bind("click", btnTransfer_clickEvent);
	// 저장 버튼 이벤트 등록
	$("#handlingInsert").bind("click", handlingInsert_clickEvent);
	// 처리결과  고객통보 이벤트 등록
	$("#resultAlarm").bind("click", resultAlarmInsert_clickEvent);
	// 처리담당자 선택시 이벤트 등록
	$("#vocSpec11").bind("change", function(e)
	{
		if ($("#vocSpec11").val() == "all")
			$("#vocSpec13").val("90261");
		else
			$("#vocSpec13").val("90262");
	});
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#vocSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			vocBtnSearch_clickEvent();
	});
	
	$("#handlingInsert").hide();
	$("#btnTransfer").hide();
	$("#resultAlarm").hide();
});

var g_frDt = "";
var g_toDt = "";
var g_srchtype = "";
var g_srchval = "";
var g_vocSrchType1 = "";
var g_vocSrchType2 = "";
var g_vocSrchType4 = "";
var g_vocSrchType5 = "";
var g_vocSrchType6 = "";

// 파라미터 셋팅 - VOC목록 조회
function getJsonStrVocList(frDt, toDt, vocSrchType1, vocSrchType2, srchtype, srchval, vocSrchType4, vocSrchType5, vocSrchType6)
{
	var frDt = $("#vocFrDate").val();
	var toDt = $("#vocToDate").val();
	
	if($("#vocFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#vocToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	g_frDt = frDt;
	g_toDt = toDt;
	g_srchtype = srchtype;
	g_srchval = srchval;
	g_vocSrchType1 = vocSrchType1;
	g_vocSrchType2 = vocSrchType2;
	g_vocSrchType4 = vocSrchType4;
	g_vocSrchType5 = vocSrchType5;
	g_vocSrchType6 = vocSrchType6;
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMjEudm9jTGlzdA==",
		"map" : {
			"key" : "value",
			"frDt" : frDt,
			"toDt" : toDt,
			"optSrchType" : srchtype,
			"idSrchVal" : srchval,
			"vocSrch1" : vocSrchType1,
			"vocSrch2" : vocSrchType2,
			"vocSrch4" : vocSrchType4,
			"vocSrch5" : vocSrchType5,
			"vocSrch6" : vocSrchType6,
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 - 엑셀다운로드
function getJsonStrVocListExcel()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMjEudm9jTGlzdA==",
		"map" : {
			"key" : "value",
			"frDt" : g_frDt,
			"toDt" : g_toDt,
			"optSrchType" : g_srchtype,
			"idSrchVal" : g_srchval,
			"vocSrch1" : g_vocSrchType1,
			"vocSrch2" : g_vocSrchType2,
			"vocSrch4" : g_vocSrchType4,
			"vocSrch5" : g_vocSrchType5,
			"vocSrch6" : g_vocSrchType6,
			"sidx" : $("#vocListR").getGridParam("sortname"),
			"sord" : $("#vocListR").getGridParam("sortorder"),
			"title" : "VOC이관목록" + setDownLoadName(g_frDt, g_toDt),
			"colWidth" : [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
			"colName" : ["RCV_TM_FORMAT", "CORP_NM", "CUST_NM", "VOC_CALL", "CREAT_USR_ID", "FAST_YN", "LAST_DEPT_CD", "LAST_ID", "PROC_DELAY", "RST_CD", "NOTICE_YN"],
			"colHeader" : ["접수일시", "회사/부서", "민원인", "연락처", "접수자", "이관구분", "이관부서", "담당자", "처리기한", "처리결과", "고객통보"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 이관목록 클릭시(접수내용)
function getJsonStrVOCspec(vocId)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMjEudm9jU3BlYw==",
		"map" : {
			"key" : "value",
			"vocId" : vocId
		}
	};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 이관목록 클릭시(처리이력)
function getJsonStrVOCResultspec(vocId, rstCd)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMjEudm9jUmVzdWx0U3BlYw==",
		"map" : {
			"key" : "value",
			"vocId" : vocId,
			"rstStatus" : rstCd
		}
	};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 부서이관 버튼 클릭시
function getJsonStrUpdateTransfer(vocSpec8, vocSpec8_1, voc_id)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMjEudXBkYXRlVHJhbnNmZXI=",
		"map" : {
			"key" : "value",
			"transfer" : vocSpec8,
			"last_id" : vocSpec8_1,
			"voc_id" : voc_id,
			"trans_alam_on" : "Y",
			"login_usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 처리결과 고객통보 버튼 클릭시
function getJsonStrUpdateResultAlarm(vocSpec9, voc_id)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMjEudXBkYXRlUmVzdWx0QWxhcm0=",
		"map" : {
			"key" : "value",
			"resultAlarm" : vocSpec9,
			"voc_id" : voc_id,
			"login_usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 첨부파일 불러오기
function getJsonFileList(vocId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "cm021",
			"tbl_pk": vocId,
			"orderby": "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 첨부파일 다운로드
function getJsonVocListFileDown(svr, loc)
{
	var loParam = {
			"svrFilePath" : svr,
			"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 첨부파일 삭제
function getJsonDeleteFile(fileId)
{
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wMTkuZGVsZXRl",
		"map" : {
			"key" : "value",
			"fl_id": fileId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CenterSelectBox
function getJsonStrCenterSelectBox()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZWxpc3Q=",
		"map" : {
			"key" : "value",
			"tp_cd" : "90002",
			"ext6_cd" : "Y",
			"notuse" : false,
			"sidx" : "cd_seq",
			"sord" : "asc"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 UserList
function getJsonStrUserListForVoc(cntrCd, gradeType)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"gradeType" : gradeType,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 첨부파일 삭제
function deleteFile(fileId)
{
	if(confirm("첨부된 파일을 삭제하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/deleteFile.do",
			data : "pJson=" + getJsonDeleteFile(fileId),
			success : function(data)
			{
				//파일폼 삭제
				var el = $("#writeForm input[name=record_" + fileId + "]");
				el.parent().parent().remove();
				
				if(--fileBox_idx < 5)
				{
					$("#BOARD").prop("disabled", false);
					$("#btnRmFilebox").prop("disabled", false);
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 목록 클릭시(접수내용, 처리결과 등록)
function vocInitTable(vocId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/vocSpec.do",
		data : "pJson=" + getJsonStrVOCspec(vocId),
		success : function(data)
		{
			$("#vocSpec1").html(data.FAST_YN);
			$("input:radio[name=vocSpec1]:input[value=" + data.FAST_YN + "]").prop("checked", true);
			$("#vocSpec2").val(data.VOC_KIND_CD);
			$("#vocSpec3").val(data.SYSTEM_KND);
			$("#vocSpec4").val(data.ERR_KND);
			$("#vocSpec5").val(data.VOC_TITLE);
			$("#vocSpec6").val(data.VOC_CONTENTS);
			
			if (data.LAST_DEPT_CD == "" || data.LAST_DEPT_CD == undefined)
			{
				// 셀렉트 박스 셋팅
				$.ajax({
					type : "post",
					async : false,
					url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
					data : "pJson=" + getJsonStrCenterSelectBox(),
					success : function(data)
					{
						$("#vocSpec8").html("");
						
						// param값을 JSON으로 파싱
						var jr = JSON.parse(data);
						var value = "";
						
						$.each(jr, function(key, state)
						{
							value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
						});
						
						$("#vocSpec8").append(value);
						$("#vocSpec8").val(window.sessionStorage.getItem("CNTR_CD"));
						
						if($("#vocSpec8").val() == null || $("#vocSpec8").val() == "")
							$("#vocSpec8").val($("#vocSpec8").find("option:first").val());
						
						$("#vocSpec8").trigger("change");
					},
					error : function(data, status, err)
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
			else
				$("#vocSpec8").val(data.LAST_DEPT_CD);
			
			if (data.NOTICE_METHOD_CD != undefined)
				$("#vocSpec9").val(data.NOTICE_METHOD_CD);
			else
				$("#vocSpec9").val("90281");
			
			if (data.LAST_DEPT_CD == "" || data.LAST_DEPT_CD == undefined)
			{
				// 셀렉트 박스 셋팅
				$.ajax({
					type : "post",
					async : false,
					url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
					data : "pJson=" + getJsonStrCenterSelectBox(),
					success : function(data)
					{
						$("#vocSpec10").html("");
						
						// param값을 JSON으로 파싱
						var jr = JSON.parse(data);
						var value = "";
						
						$.each(jr, function(key, state)
						{
							value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
						});
						
						$("#vocSpec10").append(value);
						$("#vocSpec10").val(window.sessionStorage.getItem("CNTR_CD"));
						
						if($("#vocSpec10").val() == null || $("#vocSpec10").val() == "")
							$("#vocSpec10").val($("#vocSpec10").find("option:first").val());
						
						$("#vocSpec10").trigger("change");
					},
					error : function(data, status, err)
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
			else
			{
				$("#vocSpec10").val(data.LAST_DEPT_CD);
				$("#vocSpec10").trigger("change");
			}
			
			if (data.LAST_ID == "" || data.LAST_ID == undefined)
				$("#vocSpec11").val("all");
			else
				$("#vocSpec11").val(data.LAST_ID);
			
			$("#vocSpec12").val(data.VOC_RST_CONTENTS);
			
			if ($("#vocSpec11").val() == "all")
				$("#vocSpec13").val("90261");
			else
				$("#vocSpec13").val(data.RST_CD);
			
			if (data.NOTICE_METHOD_CD != undefined)
				$("#resultAlarm").attr("disabled", true);
			else
				$("#resultAlarm").removeAttr("disabled");
			
			if (data.OVER_DAY > 0 && data.RST_CD != "90263")
				$("#overDay").html(("<span style='color : red'>"+data.OVER_DAY + "일초과"+"</span>"));
			else
				$("#overDay").html("");

			if (data.PROC_DELAY ==' ' || data.PROC_DELAY == undefined)
				$("#limitTime").val("");
			else
				$("#limitTime").val(data.GET_PROC_DELAY);

			$("input:radio[name=customAlam]:input[value=" + data.NOTICE_YN + "]").prop("checked", true);
			$("#noticeYn").val(data.NOTICE_YN);
			$("#resultCode").val(data.RST_CD);
			$("#noticeMethod").val(data.NOTICE_METHOD_CD);
			
			if(data.LAST_ID == window.sessionStorage.getItem("USR_ID") || window.sessionStorage.getItem("USR_GRD_CD") == "090100")
			{
				$("#handlingInsert").show();
				$("#btnTransfer").show();
				$("#resultAlarm").show();
				
				if(data.RST_CD != "90261")
					$("#btnTransfer").hide();
				
				if(data.RST_CD == "90263")
					$("#resultAlarm").hide();
			}
			else
			{
				$("#handlingInsert").hide();
				$("#btnTransfer").hide();
				$("#resultAlarm").hide();
			}
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/vocFileList.do",
		data : "pJson=" + getJsonFileList(vocId),
		beforeSend : function()
		{
			$("#vocFile").html("");
		},
		success : function(data)
		{
			for(var i in data)
			{
				var url = getContextPath() 
				+ "/file/counsel/voc" +
						"listFileDown.do?pJson=" 
				+ getJsonVocListFileDown(data[i].SVRFL_PTH, data[i].LOCFL_NM);
				
				var str = "<tr>";
				str += "<td><a href='" + url + "'target='_blank'>" + data[i].LOCFL_NM + "</a></td>";
				str += "<td><span>" +"&nbsp&nbsp&nbsp" + data[i].FL_KB_SZ + "</span></td>";
				str += "</tr>";
				
				$("#vocFile").append(str);
			}
		},
		error : function(data, status, err)
		{
			
		}
	});
	
}

// 목록 클릭시(처리이력)
function vocHandleTable(vocId, rstCd)
{
	// 매니저 접수시
	if (rstCd == "" || rstCd == undefined)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/vocSpec.do",
			data : "pJson=" + getJsonStrVOCspec(vocId),
			success : function(data)
			{
				$("#receipt1").html(data.CREAT_DT);
				$("#receipt2").html("");
				$("#receipt3").html("");
				$("#handle1").html("");
				$("#handle2").html("");
				$("#handle3").html("");
				$("#handle4").html("");
				$("#complete1").html("");
				$("#complete2").html("");
				$("#complete3").html("");
				$("#complete4").html("");
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	{
		// 매니저가 부서이관시(접수)
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/vocResultSpec.do",
			data : "pJson=" + getJsonStrVOCResultspec(vocId, "90261"),
			beforeSend : function()
			{
				$("#receipt1").html("");
				$("#receipt2").html("");
				$("#receipt3").html("");
				$("#handle1").html("");
				$("#handle2").html("");
				$("#handle3").html("");
				$("#handle4").html("");
				$("#complete1").html("");
				$("#complete2").html("");
				$("#complete3").html("");
				$("#complete4").html("");
			},
			success : function(data)
			{
				$("#receipt1").html(data.TRANS_DT);
				$("#receipt2").html(data.GET_LAST_DEPT_CD);
				$("#receipt3").html(data.GET_LAST_ID);
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		// 처리담당자가 선정시(처리중)
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/vocResultSpec.do",
			data : "pJson=" + getJsonStrVOCResultspec(vocId, "90262"),
			beforeSend : function()
			{
				$("#complete1").html("");
				$("#complete2").html("");
				$("#complete3").html("");
				$("#complete4").html("");
			},
			success : function(data)
			{
				$("#handle1").html(data.TRANS_DT);
				$("#handle2").html(data.GET_LAST_DEPT_CD);
				$("#handle3").html(data.GET_LAST_ID);
				
				if (data.PROC_DELAY == ' ' || data.PROC_DELAY == undefined)
					$("#handle4").html("");
				else
					$("#handle4").html(data.GET_PROC_DELAY);
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		// 처리내용 등록시(완료)
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/vocResultSpec.do",
			data : "pJson=" + getJsonStrVOCResultspec(vocId, "90263"),
			success : function(data)
			{
				$("#complete1").html(data.TRANS_DT);
				$("#complete2").html(data.GET_LAST_DEPT_CD);
				$("#complete3").html(data.GET_LAST_ID);
				
				if (data.PROC_DELAY == "" || data.PROC_DELAY == undefined)
					$("#complete4").html("");
				else
					$("#complete4").html(data.GET_PROC_DELAY);

				if (data.NOTICE_METHOD_CD != undefined)
					$("#resultAlarm").attr("disabled", true);
				else
					$("#resultAlarm").removeAttr("disabled");
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}	

// 처리결과 저장
function getJsonStrupdateHandling(vocSpec10, vocSpec11, vocSpec12, vocSpec13, limitTime, customAlam, voc_id)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMjEudXBkYXRlSGFuZGxpbmc=",
		"map" : {
			"key" : "value",
			"handlingDept" : vocSpec10,
			"handling" : vocSpec11,
			"contents" : vocSpec12,
			"result" : vocSpec13,
			"limitTime" : limitTime,
			"customAlam" : customAlam,
			"voc_id" : voc_id,
			"login_usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};

	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 검색타입 선택 이벤트
function optSrchtype_changeEvent()
{
	if($("#vocSrchType3").val() == "all")
	{
		$("#vocSrchval").prop("disabled", true);
		$("#vocSrchval").val("");
	}
	else
		$("#vocSrchval").prop("disabled", false);
}

// 조회 버튼 클릭 이벤트
function vocBtnSearch_clickEvent()
{
	var vocSrchType1 = $("#vocSrchType1").val();
	var vocSrchType2 = $("#vocSrchType2").val();
	var srchtype = $("#vocSrchType3").val();
	var srchval = $("#vocSrchval").val();
	var vocSrchType4 = $("#vocSrchType4").val();
	var vocSrchType5 = $("#vocSrchType5").val();
	var vocSrchType6 = $("#vocSrchType6").val();
	var frDt = $("#vocFrDate").val().replace(/-/g,"");
	var toDt = $("#vocToDate").val().replace(/-/g,"");
	
	$("#vocListR").jqGrid("setGridParam", {postData : {pJson : getJsonStrVocList(frDt, toDt, vocSrchType1, vocSrchType2, srchtype, srchval, vocSrchType4, vocSrchType5, vocSrchType6)}, page : 1, sortname : "RCV_TM_FORMAT", sortorder : "desc"});
	$("#vocListR").trigger("reloadGrid");
}

// 부서이관 버튼 클릭 이벤트
function btnTransfer_clickEvent()
{
	if ($("#vocHiddenId").val() == "" || $("#vocHiddenId").val() == null)
	{
		alert("목록을 선택해주세요.");
		return;
	}
	
	var vocSpec8 = $("#vocSpec8").val();
	var vocSpec8_1 = $("#vocSpec8_1").val();
	var voc_id = $("#vocHiddenId").val();
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateTransfer.do",
		data : "pJson=" + getJsonStrUpdateTransfer(vocSpec8, vocSpec8_1, voc_id),
		success : function(data)
		{
			if(data != 0)
			{
				$("#vocListR").jqGrid("setGridParam", {postData : {pJson : getJsonStrVocList("", "", "", "", "", "", "", "", "")}, page : 1, sortname : "RCV_TM_FORMAT", sortorder : "desc"})
				.trigger("reloadGrid");
				
				$("#vocbtnInit").trigger("click");
				
				alert("이관되었습니다.");
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 처리결과 고객통보 버튼 클릭 이벤트
function resultAlarmInsert_clickEvent()
{
	var vocSpec9 = $("#vocSpec9").val();
	var voc_id = $("#vocHiddenId").val();
	
	if ($("#resultCode").val() == "90261" || $("#resultCode").val() == "")
	{
		alert("접수중인 VOC는 고객통보를 할 수 없습니다.");
		return;
	}
	
	if ($("#resultCode").val() == "90262" || $("#resultCode").val() == "")
	{
		alert("처리중인 VOC는 고객통보를 할 수 없습니다.");
		return;
	}
	
	if ($("#noticeYn").val() == "" || $("#noticeYn").val() == "N")
	{
		alert("고객통보가 필요 없습니다.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateResultAlarm.do",
		data : "pJson=" + getJsonStrUpdateResultAlarm(vocSpec9, voc_id),
		success : function(data)
		{
			if(data != 0)
			{
				$("#vocListR").jqGrid("setGridParam", {postData : {pJson : getJsonStrVocList("", "", "", "", "", "", "", "", "")}, page : 1, sortname : "RCV_TM_FORMAT", sortorder : "desc"})
				.trigger("reloadGrid");
				
				$("#vocbtnInit").trigger("click");
				
				alert("저장되었습니다.");
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 처리결과 등록
function handlingInsert_clickEvent()
{
	if ($("#vocHiddenId").val() == "" || $("#vocHiddenId").val() == null)
	{
		alert("목록을 선택해주세요.");
		return;
	}
	
	var vocSpec10 = $("#vocSpec10").val();
	var vocSpec11 = $("#vocSpec11").val();
	var vocSpec12 = $("#vocSpec12").val();
	var vocSpec13 = $("#vocSpec13").val();
	var limitTime = "";
	
	if ($("#limitTime").val() != "" || $("#limitTime").val() != null)
		limitTime = $("#limitTime").val().replace(/-/gi, "");
	else
		limitTime = $("#limitTime").val("");

	var customAlam = $(":radio[name='customAlam']:checked").val();
	var voc_id = $("#vocHiddenId").val();
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateHandling.do",
		data : "pJson=" + getJsonStrupdateHandling(vocSpec10, vocSpec11, vocSpec12, vocSpec13, limitTime, customAlam, voc_id),
		success : function(data)
		{
			if(data != 0)
			{
				$("#vocListR").jqGrid("setGridParam", {postData : {pJson : getJsonStrVocList("", "", "", "", "", "", "", "", "")}, page : 1, sortname : "RCV_TM_FORMAT", sortorder : "desc"})
				.trigger("reloadGrid");
				
				$("#vocbtnInit").trigger("click");
				
				alert("저장되었습니다.");
				
				if(document.title != "온누리콜센터")
					opener.parent.checkVoc();
				else
					checkVoc();
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 처리결과 등록 초기화
function initResult()
{
	$("#receipt1").html("");
	$("#receipt2").html("");
	$("#receipt3").html("");
	$("#handle1").html("");
	$("#handle2").html("");
	$("#handle3").html("");
	$("#handle4").html("");
	$("#complete1").html("");
	$("#complete2").html("");
	$("#complete3").html("");
	$("#complete4").html("");

	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrCenterSelectBox(),
		success : function(data)
		{
			$("#vocSpec10").html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$("#vocSpec10").append(value);
			$("#vocSpec10").val(window.sessionStorage.getItem("CNTR_CD"));

			if($("#vocSpec10").val() == null || $("#vocSpec10").val() == "")
				$("#vocSpec10").val($("#vocSpec10").find("option:first").val());
			
			$("#vocSpec10").trigger("change");
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	$("#vocSpec12").val("");
	setSelectBoxWithCode("vocSpec13", "", "90260", "", "", "");
	$("#limitTime").val("");
	$("input:radio[name=customAlam]:input[value=Y]").prop("checked", true);
	$("#overDay").html("");
	$("#vocHiddenId").val("");
}

// 이관목록 검색 초기화
function vocInitEvent()
{
	$("#handlingInsert").hide();
	$("#btnTransfer").hide();
	$("#resultAlarm").hide();
	
	$("#vocFrDate").val(getLastWeek());
	$("#vocToDate").val(getDate());
	
	$("input:radio[name=vocCodetype_term]:input[value=week]").prop("checked", true);
	
	setSelectBoxWithCode("vocLastDepthCd", "", "90240", "", "", "");
	setSelectBoxWithCode("vocManager", "", "90250", "", "", "");
	setSelectBoxWithCode("vocSpec2", "", "90210", "", "", "");
	setSelectBoxWithCode("vocSpec3", "", "90220", "", "", "");
	setSelectBoxWithCode("vocSpec4", "", "90230", "", "", "");
	setSelectBoxWithCode("vocSrchType1", "전체", "90260", "", "", "all");
	setSelectBoxWithCode("vocSrchType4", "전체", "90220", "", "", "all");
	setSelectBoxWithCode("vocSrchType5", "전체", "90230", "", "", "all");
	setSelectBoxWithCode("vocSrchType6", "전체", "90210", "", "", "all");
	setSelectBoxWithCode("vocSpec9", "", "90280", "", "", "");
	
	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrCenterSelectBox(),
		success : function(data)
		{
			$("#vocSpec10").html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$("#vocSpec10").append(value);
			$("#vocSpec10").val(window.sessionStorage.getItem("CNTR_CD"));
			
			if($("#vocSpec10").val() == null || $("#vocSpec10").val() == "")
				$("#vocSpec10").val($("#vocSpec10").find("option:first").val());
			
			$("#vocSpec10").trigger("change");
			
			$("#vocSpec8").html("");
			$("#vocSpec8").append(value);
			$("#vocSpec8").val(window.sessionStorage.getItem("CNTR_CD"));
			
			if($("#vocSpec8").val() == null || $("#vocSpec8").val() == "")
				$("#vocSpec8").val($("#vocSpec8").find("option:first").val());
			
			$("#vocSpec8").trigger("change");
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	setSelectBoxWithCode("vocSpec13", "", "90260", "", "", "");
	
	$("#vocSrchType2").val("all");
	$("#vocSrchType3").val("all");
	$("#vocSrchval").val("");
	$("#vocSrchval").prop("disabled", true);
	
	$("input:radio[name=vocSpec1]:input[value=N]").prop("checked", true);
	$("#vocSpec5").val("");
	$("#vocSpec6").val("");
	$("#vocSpec7").val("");
	$("#vocFile").html("");
	
	$("#receipt1").html("");
	$("#receipt2").html("");
	$("#receipt3").html("");
	$("#handle1").html("");
	$("#handle2").html("");
	$("#handle3").html("");
	$("#handle4").html("");
	$("#complete1").html("");
	$("#complete2").html("");
	$("#complete3").html("");
	$("#complete4").html("");
	
	$("#vocSpec12").val("");
	$("#limitTime").val("");
	$("input:radio[name=customAlam]:input[value=Y]").prop("checked", true);
	$("#overDay").html("");
	
	$("#vocHiddenId").val("");
	$("#noticeYn").val("");
	$("#resultCode").val("");
	$("#noticeMethod").val("");
	
	$("#vocListR").jqGrid("setGridParam", {postData : {pJson : getJsonStrVocList("", "", "", "", "", "", "", "", "")}, page : 1, sortname : "RCV_TM_FORMAT", sortorder : "desc"})
	.trigger("reloadGrid");
}

// 엑셀저장 버튼 클릭 이벤트
function btnExcelVocPopup_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/voc/voclist.do", getJsonStrVocListExcel());
}