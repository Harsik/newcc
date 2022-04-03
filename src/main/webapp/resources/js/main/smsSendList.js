// 조회조건 저장
var g_srchType = "";
var g_srchVal = "";
var g_srchUsr = "";
var g_srchActstcd = "";
var g_srchDateType = "";
var g_srchDate = "";
var g_srchDateEn = "";
var smsUsrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

//파라미터 셋팅_UsrList
function getJsonStrUsrList(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"cntr_cd" : smsUsrGrdCd =="090100"?"":window.sessionStorage.getItem("CNTR_CD"),
			"chkRetire" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_SmsSendList
function getJsonStrSmsSendList(){
	g_srchType = $("#selSrchtype").val();
	g_srchVal = $("#search_smsSandList #tfSrchVal").val().trim();
	g_srchUsr = $("#selSrchUsr").val() == "all" ? "" : $("#selSrchUsr").val();
	g_srchActstcd = $("#selSrchActStCd").val() == "all" ? "" : $("#selSrchActStCd").val();
	g_srchDateType = $("#selSrchDateType").val();
	g_srchDate = $("#tfSrchDate").val().replace(/-/gi, "");
	g_srchDateEn = $("#tfSrchDateEn").val().replace(/-/gi, "");
	
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
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"srchDate" : g_srchDate,
			"srchDateEn" : g_srchDateEn
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//첨부파일 보기
function showAttachSmsFiles(data){
	
	console.log("FILE DATA >");
	console.log(data);
	
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
	
	$("#smsFileInfos").prepend(tr);
}

/* 조회검색 버튼 ======================================================== */

// 조회버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	$("#tblSmsSendList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSmsSendList()}, page : 1, sortname : "CRT_DATE", sortorder : "desc"});
	$("#tblSmsSendList").trigger("reloadGrid");
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	$("#selSrchtype").val("cntct_infm");			// 수신번호, 내용 선택 (기준 : 수신번호)
	$("#search_smsSandList #tfSrchVal").val("");	// 검색(수신번호, 내용)
	$("#selSrchUsr").val("all");					// 상담사
	$("#selSrchActStCd").val("all");				// 처리상태
	$("#selSrchDateType").val("req");				// 요청일, 예약일, 발신일 선택 (기준 : 발신일)
	$("#tfSrchDate").val(getDate());				// 검색일자 (요청일, 예약일, 발신일)
	$("#tfSrchDateEn").val(getDate());				// 검색일자 (요청일, 예약일, 발신일)
	
	$("#tblSmsSendList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSmsSendList()}, page : 1, sortname : "CRT_DATE", sortorder : "desc"});
	$("#tblSmsSendList").trigger("reloadGrid");
	
	initSpec();
}


// 상세정보 부분 초기화 (SMS 발신 Tab)
function initSpec()
{
	$("#labSpecUsrNm").html("");			// 발신자
	$("#tfSpecSndCont").val("");			// 발신내용
	$("#labSpecCountTxtNum").html("0");		// 전송메시지 byte 수
	$("#labSpecCustNm").html("");			// 고객명
	$("#labSpecSendFrom").html("");			// 발신자번호
	$("#tfSpecChCntctInfm").html("");		// 수신자번호
	$("#labSpecSndReqDtm").html("");		// 요청일시
	$("#tfSpecSndResvDtm").val("");			// 예약일시
	$("#labSpecSndEndDtm").html("");		// 발신일시
	$("#labSpecSndRsltNm").html("");		// 발신결과
	$("#smsFileInfos").empty();				// 이미지첨부
}

//전화번호 형식
function getPhoneFormat(cellValue, options, rowdata, action) 
{
	var formatString = fnGetTelNoFormat(cellValue);
	
	return formatString;
}

// init page
// 메인화면 로딩 시 부하 감소를 위한 function 변경
function initdivRCTabSMSList()
{
	initSpec();			// SMS 발신 Tab
	
	$("#tfSrchDate").val(getDate());				// 검색일자 (요청일, 예약일, 발신일)
	$("#tfSrchDateEn").val(getDate());	
	
	// sms발송목록 jqgrid
	$("#tblSmsSendList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/smsSendList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSmsSendList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["문자ID", "상담사", "수신번호", "발신번호", "고객명", "요청일시", "예약일시", "발신일시", "전송메세지", "유형", "전송결과", "전송결과상세",
	   				"파일ID", "파일개수", "파일경로1", "파일경로2", "파일경로2", "파일명1", "파일명2", "파일명3", "파일크기1", "파일크기2", "파일크기3"],
	   	colModel :
	   	[
	   		{ name : "MSG_SEQ", index : "MSG_SEQ", width : 0, align : "center", hidden : true },
	   		{ name : "CRT_USR_NM", index : "CRT_USR_NM", width : 40, align : "center" },	   		
	   		{ name : "CALL_TO", index : "CALL_TO", width : 40, align : "center", formatter:getPhoneFormat},
	   		{ name : "CALL_FROM", index : "CALL_FROM", width : 0, align : "center", formatter:getPhoneFormat, hidden : true },
	   		{ name : "DISPLAYNAME", index : "DISPLAYNAME", width : 0, align : "center", hidden : true },
	   		{ name : "CRT_DATE", index : "CRT_DATE", width : 60, align : "center"},
	   		{ name : "REQ_DATE", index : "REQ_DATE", width : 0, align : "center", hidden : true },
	   		{ name : "RSLT_DATE", index : "RSLT_DATE", width : 0, align : "center", hidden : true },
	   		{ name : "CONTENT", index : "CONTENT", width : 130, align : "left" },
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
	   	pager : "#pagingSmsSendList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	// 전송실패시 row 배경색 변경
	   	loadComplete : function(data){
	   		var ids = $("#tblSmsSendList").getDataIDs();
	   		var rowId = $("#tblSmsSendList").jqGrid('getGridParam','selrow');
	   		$.each(ids,function(idx, rowId){
	   			rowData = $("#tblSmsSendList").getRowData(rowId);
	   			if(rowData.RSLT_STATE == "실패"){
	   				$("#tblSmsSendList"+" #"+rowId+" td").css("font-weight","bold");
	   				$("#tblSmsSendList"+" #"+rowId+" td:eq(0)~").css("color","#FF007F");
	   			}
	   		})
	   	},
	   	onSelectRow : function(rowid)
	   	{
	   		initSpec();
	   		
	   		var row = $("#tblSmsSendList").getRowData(rowid);
	   		
	   		$("#labSpecUsrNm").html(row.CRT_USR_NM);					// 발신자
	   		$("#labSpecCountTxtNum").html(charByteSize(row.CONTENT));	// 전송메시지 byte 수
	   		$("#tfSpecSndCont").val(row.CONTENT);						// 발신내용
	   		$("#labSpecSendFrom").html(row.CALL_FROM);					// 발신자번호
	   		$("#tfSpecChCntctInfm").html(row.CALL_TO);					// 수신자번호
	   		$("#labSpecCustNm").html(row.DISPLAYNAME);					// 고객명
	   		$("#labSpecSndReqDtm").html(row.CRT_DATE);					// 요청일시
	   		$("#tfSpecSndResvDtm").html(row.REQ_DATE);					// 예약일시
	   		$("#labSpecSndEndDtm").html(row.RSLT_DATE);					// 발신일시
	   		$("#labSpecSndRsltNm").html(row.RSLT_CODE_NM);				// 발신결과
	   		
	   		showAttachSmsFiles(row);
	   	},
	   	onPaging : function(pgButton)
	   	{
	   		initSpec();
	   	}
	}).jqGrid("navGrid", "#pagingSmsSendList", {edit : false, add : false, del : false, search : false});
	
	//화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    jQuery("#tblSmsSendList").setGridWidth($("#divRCTabSMSList").width(), true);
	}).trigger('resize');
	
	
	// 상담사 셀렉트 박스를 채움
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/counsel/getUsrList.do",
		data : "pJson=" + getJsonStrUsrList(),
		success : function(data)
		{
			$("#selSrchUsr").html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			value += "<option value='all'>전체</option>";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#selSrchUsr").append(value);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	// datepicker
	datePicker("#tfSrchDate");
	datePicker("#tfSrchDateEn");
	
	// 검색어 필드 엔터 키 이벤트
	$("#search_smsSandList #tfSrchVal").bind("keydown", function(key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});


	/* 조회검색 버튼 ======================================================== */	
	
	// 조회버튼 클릭 이벤트
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	/* 조회검색 버튼 ======================================================== */


}