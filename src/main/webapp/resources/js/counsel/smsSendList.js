var g_srchType = "";
var g_srchVal = "";
var g_srchUsr = "";
var g_srchActstcd = "";
var g_srchDateType = "";
var g_srchDate = "";
var g_srchDateEn = "";
var smsUsrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

// 파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_UsrList
function getJsonStrUsrList() {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_SmsSendList
function getJsonStrSmsSendList() {
	g_srchType = $("#smlist_selSrchtype").val();
	g_srchVal = $("#smlist_tfSrchVal").val().trim();
	g_srchUsr = $("#smlist_selSrchUsr").val() == "all" ? "" : $("#smlist_selSrchUsr").val();
	g_srchActstcd = $("#smlist_selSrchActStCd").val() == "all" ? "" : $("#smlist_selSrchActStCd").val();
	g_srchDateType = $("#smlist_selSrchDateType").val();
	g_srchDate = $("#smlist_tfSrchDate").val().replace(/-/gi, "");
	g_srchDateEn = $("#smlist_tfSrchDateEn").val().replace(/-/gi, "");

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c21zLnNtc0xpc3Q=",
		"map" : {
			"key" : "value",
			"srchType" : g_srchType,
			"srchVal" : g_srchVal,
			"srchUsr" : g_srchUsr,
			"srchActstcd" : g_srchActstcd,
			"srchDateType" : g_srchDateType,
			"srchDate" : g_srchDate,
			"srchDateEn" : g_srchDateEn
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_SmsSendListExcel
function getJsonStrSmsSendListExcel() {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c21zLnNtc0xpc3Q=",
		"map" : {
			"key" : "value",
			"srchType" : g_srchType,
			"srchVal" : g_srchVal,
			"srchUsr" : g_srchUsr,
			"srchActstcd" : g_srchActstcd,
			"srchDateType" : g_srchDateType,
			"srchDate" : g_srchDate,
			"srchDateEn" : g_srchDateEn,
			"sidx" : $("#smlist_tblSmsSendList").getGridParam("sortname"),
			"sord" : $("#smlist_tblSmsSendList").getGridParam("sortorder"),
			"title" : "SMS발송목록" + setDownLoadName(g_srchDate, g_srchDateEn),
			"colWidth" : [ 15, 15, 20, 10, 25, 15, 15 ],
			"colName" : [ "USR_NM", "CUST_NM", "CNTCT_INFM", "SMS_TYPE", "SND_END_DTM", "SND_RSLT_NM" ],
			"colHeader" : [ "상담사", "고객명", "수신자번호", "문자유형", "요청일시", "발신결과" ],
			"colAlign" : [ "center", "center", "center", "center", "center", "center" ]
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 조회버튼 클릭 이벤트
function btnSearch_clickEvent() {
	$("#smlist_tblSmsSendList").jqGrid("setGridParam", { postData : { pJson : getJsonStrSmsSendList() }, page : 1, sortname : "CRT_DATE", sortorder : "desc"});
	$("#smlist_tblSmsSendList").trigger("reloadGrid");
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent() {
	$("#smlist_selSrchtype").val("cntct_infm");
	$("#smlist_tfSrchVal").val("");
	$("#smlist_selSrchUsr").val("all");
	$("#smlist_selSrchActStCd").val("all");
	$("#smlist_selSrchDateType").val("req");
	$("#smlist_tfSrchDate").val(getDate()); // 검색일자 (요청일, 예약일, 발신일)
	$("#smlist_tfSrchDateEn").val(getDate()); // 검색일자 (요청일, 예약일, 발신일)

	$("#smlist_tblSmsSendList").jqGrid("setGridParam", { postData : { pJson : getJsonStrSmsSendList() }, page : 1, sortname : "CRT_DATE", sortorder : "desc"});
	$("#smlist_tblSmsSendList").trigger("reloadGrid");

	initSpec();
}

// 엑셀저장 버튼 클릭 이벤트
function btnExcel_clickEvent() {
	excelDownLoad(getContextPath() + "/excel/counsel/smsSendList.do",
			getJsonStrSmsSendListExcel());
}

//전화번호 형식
function getPhoneFormat(cellValue, options, rowdata, action) 
{
	var formatString = fnGetTelNoFormat(cellValue);
	
	return formatString;
}

//첨부파일 보기
function showAttachSmsFiles(data){
	
	var url = "";
	var tr = "";
	
	if(data.FILE_NAME1 != ""){
	url = getContextPath() 
	+ "/file/sms/smsFileDown.do?pJson=" 
	+ getJsonFileDownload(data.FILE_NAME1, data.LOC_FL_NM1);
	
	tr = "<tr>";
	tr += "<td align='left' style='width: 85%;'>";
	tr += "<span style='width: 320px;'><a href='" + url + "' download>" + data.LOC_FL_NM1 + "</a></span></td>";
	tr += "<td><span>" +data.FL_SZ1  + "</span></td>";
	tr += "</tr>";
	}
	
	if(data.FILE_NAME2 != ""){
		url = getContextPath() 
		+ "/file/sms/smsFileDown.do?pJson=" 
		+ getJsonFileDownload(data.FILE_NAME2, data.LOC_FL_NM2);
		
		tr += "<tr>";
		tr += "<td align='left' style='width: 85%;'>";
		tr += "<span style='width: 320px;'><a href='" + url + "' download>" + data.LOC_FL_NM2 + "</a></span></td>";
		tr += "<td><span>" +data.FL_SZ2  + "</span></td>";
		tr += "</tr>";
	}
	
	if(data.FILE_NAME3 != ""){
		url = getContextPath() 
		+ "/file/sms/smsFileDown.do?pJson=" 
		+ getJsonFileDownload(data.FILE_NAME3, data.LOC_FL_NM3);
		
		tr += "<tr>";
		tr += "<td align='left' style='width: 85%;'>";
		tr += "<span style='width: 320px;'><a href='" + url + "' download>" + data.LOC_FL_NM3 + "</a></span></td>";
		tr += "<td><span>" +data.FL_SZ3  + "</span></td>";
		tr += "</tr>";
	}
	
	$("#smlist_smsFileInfos").prepend(tr);
}


// 상세정보 부분 초기화
function initSpec() {
	$("#smlist_labSpecUsrNm").html("");			// 발신자
	$("#smlist_tfSpecSndCont").val("");			// 발신내용
	$("#smlist_labSpecCountTxtNum").html("0");	// 전송메시지 byte 수
	$("#smlist_labSpecCustNm").html("");		// 고객명
	$("#smlist_labSpecSendFrom").html("");		// 발신자번호
	$("#smlist_tfSpecChCntctInfm").html("");	// 수신자번호
	$("#smlist_labSpecSndReqDtm").html("");		// 요청일시
	$("#smlist_tfSpecSndResvDtm").html("");		// 예약일시
	$("#smlist_labSpecSndEndDtm").html("");		// 발신일시
	$("#smlist_labSpecSndRsltNm").html("");		// 발신결과
	$("#smlist_smsFileInfos").empty();			// 이미지첨부
}

$(document).ready(function(){

	$("#smlist_tfSrchDate").val(getDate()); // 검색일자 (요청일, 예약일, 발신일)
	$("#smlist_tfSrchDateEn").val(getDate());

	initSpec();
	
	$("#smlist_tblSmsSendList").jqGrid(
			{
				url : getContextPath() + "/jqgrid/counsel/smsSendList.do",
				datatype : "json",
				mtype : "POST",
				postData : {
					pJson : getJsonStrSmsSendList()
				},
				jsonReader : {
					repeatitems : false
				},
				colNames : ["문자ID", "상담사", "수신번호", "발신번호", "고객명", "요청일시", "예약일시", "발신일시", "전송메세지", "유형", "전송결과", "전송결과상세",
	   				"파일ID", "파일개수", "파일경로1", "파일경로2", "파일경로2", "파일명1", "파일명2", "파일명3", "파일크기1", "파일크기2", "파일크기3"],
			   	colModel :
			   	[
			   		{ name : "MSG_SEQ", index : "MSG_SEQ", width : 0, align : "center", hidden : true },
			   		{ name : "CRT_USR_NM", index : "CRT_USR_NM", width : 40, align : "center" },	   		
			   		{ name : "CALL_TO", index : "CALL_TO", width : 30, align : "center", formatter:getPhoneFormat},
			   		{ name : "CALL_FROM", index : "CALL_FROM", width : 0, align : "center", formatter:getPhoneFormat, hidden : true },
			   		{ name : "DISPLAYNAME", index : "DISPLAYNAME", width : 0, align : "center", hidden : true },
			   		{ name : "CRT_DATE", index : "CRT_DATE", width : 50, align : "center"},
			   		{ name : "REQ_DATE", index : "REQ_DATE", width : 0, align : "center", hidden : true },
			   		{ name : "RSLT_DATE", index : "RSLT_DATE", width : 0, align : "center", hidden : true },
			   		{ name : "CONTENT", index : "CONTENT", width : 150, align : "left" },
			   		{ name : "MSG_NAME", index : "MSG_NAME", width : 20, align : "center" },
			   		{ name : "RSLT_STATE", index : "RSLT_STATE", width : 30, align : "center" },
			   		{ name : "RSLT_CODE_NM", index : "RSLT_CODE_NM", width : 0, align : "center", hidden : true },
			   		{ name : "CONT_SEQ", index : "CONT_SEQ", width : 0, align : "center", hidden : true },
			   		{ name : "FILE_CNT", index : "FILE_CNT", width : 0, align : "center", hidden : true },
			   		{ name : "FILE_NAME1", index : "FILE_NAME1", width : 0, align : "center", hidden : true },
			   		{ name : "FILE_NAME2", index : "FILE_NAME2", width : 0, align : "center", hidden : true },
			   		{ name : "FILE_NAME3", index : "FILE_NAME3", width : 0, align : "center", hidden : true },
			   		{ name : "LOC_FL_NM1", index : "LOC_FL_NM1", width : 0, align : "center", hidden : true },
			   		{ name : "LOC_FL_NM2", index : "LOC_FL_NM2", width : 0, align : "center", hidden : true },
			   		{ name : "LOC_FL_NM3", index : "LOC_FL_NM3", width : 0, align : "center", hidden : true },
			   		{ name : "FL_SZ1", index : "FL_SZ1", width : 0, align : "center", hidden : true },
			   		{ name : "FL_SZ2", index : "FL_SZ2", width : 0, align : "center", hidden : true },
			   		{ name : "FL_SZ3", index : "FL_SZ3", width : 0, align : "center", hidden : true }
			   	],
			   	sortname : "CRT_DATE",
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
				pager : "#smlist_pagingSmsSendList",
				rownumbers : true,
			   	rownumWidth : 30,
			   	multiselect : false,
			   	emptyrecords : "",
			   	caption : "",
			   	loadui : "enable",
			   	viewrecords: true,
			   	// 전송실패시 row 배경색 변경
			   	loadComplete : function(data){
			   		var ids = $("#smlist_tblSmsSendList").getDataIDs();
			   		var rowId = $("#smlist_tblSmsSendList").jqGrid('getGridParam','selrow');
			   		$.each(ids,function(idx, rowId){
			   			rowData = $("#smlist_tblSmsSendList").getRowData(rowId);
			   			if(rowData.RSLT_STATE == "실패"){
			   				$("#smlist_tblSmsSendList"+" #"+rowId+" td").css("font-weight","bold");
			   				$("#smlist_tblSmsSendList"+" #"+rowId+" td:eq(0)~").css("color","#FF007F");
			   			}
			   		})
			   	},
				onSelectRow : function(rowid) {
					initSpec();

					var row = $("#smlist_tblSmsSendList").getRowData(rowid);
					
					$("#smlist_labSpecUsrNm").html(row.CRT_USR_NM);					// 발신자
			   		$("#smlist_labSpecCountTxtNum").html(charByteSize(row.CONTENT));	// 전송메시지 byte 수
			   		$("#smlist_tfSpecSndCont").val(row.CONTENT);						// 발신내용
			   		$("#smlist_labSpecSendFrom").html(row.CALL_FROM);					// 발신자번호
			   		$("#smlist_tfSpecChCntctInfm").html(row.CALL_TO);					// 수신자번호
			   		$("#smlist_labSpecCustNm").html(row.DISPLAYNAME);					// 고객명
			   		$("#smlist_labSpecSndReqDtm").html(row.CRT_DATE);					// 요청일시
			   		$("#smlist_tfSpecSndResvDtm").html(row.REQ_DATE);					// 예약일시
			   		$("#smlist_labSpecSndEndDtm").html(row.RSLT_DATE);					// 발신일시
			   		$("#smlist_labSpecSndRsltNm").html(row.RSLT_CODE_NM);				// 발신결과
			   		
			   		showAttachSmsFiles(row);

				},
				onPaging : function(pgButton) {
					initSpec();
				}
			}).jqGrid("navGrid", "#smlist_pagingSmsSendList", {edit : false, add : false, del : false, search : false});
	
	
	
	// 상담사 셀렉트 박스를 채움
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/counsel/getUsrList.do",
		data : "pJson=" + getJsonStrUsrList(),
		success : function(data) {
			$("#smlist_selSrchUsr").html("");

			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";

			value += "<option value='all'>전체</option>";

			$.each(jr, function(key, state) {
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM
						+ "</option>";
			});
			$("#smlist_selSrchUsr").append(value);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// datepicker
	datePicker("#smlist_tfSrchDate");
	datePicker("#smlist_tfSrchDateEn");

	// 예약일시 datetimepicker 설정
	$("#smlist_tfSpecSndResvDtm").datetimepicker({
		
		lang : "ko",
		format : "Y-m-d H:i",
		allowTimes : 
			[ "08:00", "08:10", "08:20", "08:30", "08:40",
				"08:50", "09:00", "09:10", "09:20", "09:30", "09:40",
				"09:50", "10:00", "10:10", "10:20", "10:30", "10:40",
				"10:50", "11:00", "11:10", "11:20", "11:30", "11:40",
				"11:50", "12:00", "12:10", "12:20", "12:30", "12:40",
				"12:50", "13:00", "13:10", "13:20", "13:30", "13:40",
				"13:50", "14:00", "14:10", "14:20", "14:30", "14:40",
				"14:50", "15:00", "15:10", "15:20", "15:30", "15:40",
				"15:50", "16:00", "16:10", "16:20", "16:30", "16:40",
				"16:50", "17:00", "17:10", "17:20", "17:30", "17:40",
				"17:50", "18:00", "18:10", "18:20", "18:30", "18:40",
				"18:50", "19:00", "19:10", "19:20", "19:30", "19:40",
				"19:50"
			],
		step : 10
	});

	// 검색어 필드 엔터 키 이벤트
	$("#smlist_tfSrchVal").on("keydown", function(key) {
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});

	// 조회버튼 클릭 이벤트
	$("#smlist_btnSearch").on("click", btnSearch_clickEvent);

	// 초기화 버튼 클릭 이벤트
	$("#smlist_btnInit").on("click", btnInit_clickEvent);

	// 엑셀저장 버튼 클릭 이벤트
	$("#smlist_btnExcel").on("click", btnExcel_clickEvent);
	
});