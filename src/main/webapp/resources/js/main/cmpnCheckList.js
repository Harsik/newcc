var obj010 = {};
var obj012 = {};
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

var g_usrId = "";
if (usrGrdCd == "010100") {
	g_usrId = window.sessionStorage.getItem("USR_ID");  
} else {
	g_usrId = "all";
}

function getCallImg(callnum) {
	 return '&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="confirm_resv(this)" class="icon_cal2" id="' + callnum + '"/>';

}

//파라미터 셋팅 ProgramList
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	var cntrCd = "";
	var teamCd = "";
	
	if(usrGrdCd == "090100" || usrGrdCd == "060100")
	{
		cntrCd = "";
		teamCd = "";
	}
	else if(usrGrdCd == "050100")
	{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = "";
	}
	else
	{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = window.sessionStorage.getItem("TEAM_CD");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"team_cd" : teamCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 그리드 셋팅 함수
function init_grid(pMap)
{
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : false,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	ondblClickRow : window[pMap.dblClickEvent],
	   	onCellSelect : window[pMap.cellEvent],
	   	gridComplete : window[pMap.gridComplete]
	   	
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

// 상단 캠페인조회 그리드 셋팅
function cmpgtbl010_init_grid()
{ 		
	// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
	
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = "all";  
	}
	
	pMap = {};
	pMap.tblId = "tbl010";
	pMap.url   = "/jqgrid/campaign/tbl010Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value" ,
		"progressCmpn" : true,
		"fr_dt" : $("#selFrDate").val().replace(/-/gi, ""),
		"to_dt" : $("#selToDate").val().replace(/-/gi, ""),
		"cmpg_nm" : $("#cmpgNm").val(),
		"usrGrdCd" : usrGrdCd,
		"usr_id" : g_usrId
	});
	pMap.colNames = ["해피콜명", "시작일자", "종료일자","해피콜유형", "진행상태", "대상자수", "배정건수","완료건수","미완료건수","진행률","해피콜아이디","평가문항갯수", "진행상태코드"];
	pMap.colModel =
   	[
   	 	{ name : "CMPG_NM", index : "CMPG_NM", align : "center", width : 200 },
   	 	{ name : "STRT_DT", index : "STRT_DT", align : "center", width : 80 },
   	 	{ name : "END_DT", index : "END_DT", align : "center", width : 80 },
   	 	{ name : "CMPG_TYPE_CD" , index : "CMPG_TYPE_CD", align : "center", width : 80 },
   	 	{ name : "PROC_ST", index : "PROC_ST", align : "center", width : 80, formatter:fnStatusFormatter },
   	 	{ name : "TRGT_CUST_CNT", index : "TRGT_CUST_CNT", align : "center", width : 70 },
   	 	{ name : "TOTCNT", index : "TOTCNT",  align : "center", width : 70 },
   	 	{ name : "COPCNT", index : "COPCNT",  align : "center", width : 70 },
   	 	{ name : "NONCOPCNT", index : "NONCOPCNT",  align : "center", width : 70 },
   	 	{ name : "PROGRESS", index : "PROGRESS",  align : "center", width : 70 },
   	 	{ name : "CMPG_ID", index : "CMPG_ID", hidden : true },
   	    { name : "VLTN_CNT", index : "VLTN_CNT", hidden : true },
   	    { name : "PROC_ST_CD", index : "PROC_ST_CD", hidden : true },
   	];
	pMap.rowNum = "2";
	pMap.sortname = "STRT_DT";
	pMap.width = "100%";
	pMap.height = "65";
	pMap.pager = "pg010";
	pMap.selectEvent = "tbl010_SelectRow";
	pMap.rowNumber = false;
	
	init_grid(pMap);
	//화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    jQuery("#tbl010").setGridWidth($("#divRCTabHappyCall").width(), true);
	}).trigger('resize');
}

// 캠페인대상자 목록 그리드 셋팅
function cmpgtbl012_init_grid()
{ 		
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = "all";  
	}
	
	// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
	pMap = {};
	pMap.tblId = "cmpgtbl012";
	pMap.url   = "/jqgrid/campaign/tbl012Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {"key" : "value" ,
		"cmpg_id" : "00",
		"usr_id" : g_usrId
	});
	pMap.colNames = ["고객명", "전화1", "전화2", "시도횟수", "진행상태", "해피콜아이디", "진행상태코드","미응답사유", "고객아이디"];
	pMap.colModel =
   	[
   	 	{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 80 },
   	 	{ name : "TEL", align : "center", width : 98 },
   	 	{ name : "MOBILE", align : "center", width : 98 },
   	 	{ name : "CALL_TRY_SCNT", index : "CALL_TRY_SCNT", align : "center", width : 60 },
   	 	{ name : "PROC_ST_NM" , index : "PROC_ST_NM", align : "center", width : 60, formatter:fnStatusFormatter },
   	 	{ name : "CMPG_CUST_SEQ", index : "CMPG_CUST_SEQ", hidden : true },
   	 	{ name : "PROC_ST_CD", index : "PROC_ST_CD", hidden : true },
   	 	{ name : "NONRSPN_RSN", index : "NONRSPN_RSN", hidden : true },
   	 	{ name : "CUST_ID", index : "CUST_ID", hidden : true }
   	];
	pMap.rowNum = "15";
	pMap.sortname = "CUST_NM";
	sortorder : "asc",
	pMap.width = "100%";
	pMap.height = "440";
	pMap.pager = "cmpgpg012";
	pMap.selectEvent = "tbl012_SelectRow";
	pMap.rowNumber = true;

	init_grid(pMap);
	
	//화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    jQuery("#cmpgtbl012").setGridWidth($("#divRCTabHappyCall").width()*0.5, true);
	}).trigger('resize');
}

//캠페인 목록 클릭
function tbl010_SelectRow(rowid)
{
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = $("#selAgent").val();  
	}
	
	$("#custQa").empty();
	
	obj010 = $("#tbl010").jqGrid('getRowData', rowid);
	
    $("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do",postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {"key" : "value" ,
		"cmpg_id" : parseInt(obj010.CMPG_ID),
		"procSt" : $("#selProcSt").val(),
		"usr_id" : g_usrId
	})} , page : 1, sortname : "CUST_NM", sortorder : "asc"}).trigger("reloadGrid");
    
    $("#campaignId").val(obj010.CMPG_ID);
    
    $("#cmpgCustBtnInit2").trigger("click");
    
}

// 캠페인 대상자 클릭
function tbl012_SelectRow(rowid)
{
	$("#cmpgCustom6").html("");
	$("#cmpgTel6").html("");
	$("#cmpgHtel6").html("");
	
	obj012 = $("#cmpgtbl012").jqGrid('getRowData', rowid);
	
	$("#custQa").empty();
	
	//개인정보 출력
	$("#cmpgCustom6").html(obj012.CUST_NM);
	if(obj012.TEL)
		$("#cmpgTel6").html(obj012.TEL + getCallImg(obj012.TEL));
	if(obj012.MOBILE)
		$("#cmpgHtel6").html(obj012.MOBILE + getCallImg(obj012.MOBILE));
	
	//질의 가져오기
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/campaign/cmpgAnswer.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuc2VsZWN0Q3VzdENtcGc=", {
			"cmpg_id" : obj010.CMPG_ID
		}),
		success : function(data) {		
		    var content = "";
		    
		    //문항생성
		    $.each(data, function(qusetionSeq, question) {
		    	if(++qusetionSeq != 1) {
		    		content += "<hr>";
		    	}
		    	content += "<br><label>" + qusetionSeq + "." + question.QST_NM + "</label><br>";
		    	for(var ansSeq = 1; ansSeq <= question.XAMP_SCNT; ansSeq++) {
		    		switch(question.QST_TYPE_CD) {
		    			case "1001" :	//객관식
		    				content +=  "&nbsp;&nbsp;&nbsp;&nbsp;" + 
			    			"<input type='radio' class='text_ol_40' id='" + question.QST_ID + "_" + qusetionSeq + "_" + ansSeq + "' name='" + qusetionSeq + "' value='"+ ansSeq + "' >" 
							+ "<label for='" + question.QST_ID + "_" + qusetionSeq + "_" + ansSeq + "'>" + question["XAMP" + ansSeq] + "</label><br>";
		    				break;
		    				
		    			case "1002":		//주관식
		    				content += "&nbsp;&nbsp;&nbsp;&nbsp;" +
		    				"주관식&nbsp;문항입니다.&nbsp;" +
		    				"<br>&nbsp;&nbsp;&nbsp;&nbsp;<input style='width: 90%;' type='text' id='" + question.QST_ID + "_" + qusetionSeq + "_" + ansSeq + "' name='" + qusetionSeq + "'><br>";
		    		}
		    	}
		    	content += "<br>";
		    });
		    
		    console.log(content);
			$("#custQa").append(content);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	//선택답안 체크
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/completeCmpg.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTUuc2VsZWN0", {
			"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
			"cmpg_id" : obj010.CMPG_ID
		}),
		success : function(data) {
			console.log(data);
			
			$.each(data, function(index, state) {
				if(state.QST_TYPE_CD == "1002") {
					$("input[name='" + state.QST_NO + "']").val(state.ANS_NM);
				} else {
					$("input:radio[name='" + state.QST_NO + "']:input[value='" + state.ANS_NO + "']").prop("checked", true);
				}
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	//대상고객정보
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/targetCustInfo.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y20wMTIuc2VsZWN0", {
			"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
		}),
		success : function(data) {
			$("#cmpgMemo").val(data.MEMO);
			$("#result").val(data.PROC_ST_CD);
			$("#unresponsiveness").val(data.NONRSPN_RSN);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	//고객정보
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/custInfo.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y20wMDMuZ2V0Q3VzdEluZm8=", {
			"cust_id" : obj012.CUST_ID,
		}),
		success : function(data) {
			if(data.TEL_YN === "Y") 
				$("#telyn").prop("checked", true);
			else
				$("#telyn").prop("checked", false);
					
			if(data.SMS_YN === "Y")  
				$("#smsyn").prop("checked", true);
			else
				$("#smsyn").prop("checked", false);
			
			if(data.GNDR) {
				$("input:radio[name='radioGndr']:input[value='" + data.GNDR + "']").prop("checked", true);
			} else {
				$("input:radio[name='radioGndr']:input[value='1']").prop("checked", false);
				$("input:radio[name='radioGndr']:input[value='2']").prop("checked", false);
			}
			
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
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
			$("#selAgent").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
				//value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				
				if(g_usrId==state.USR_ID){
					//상담사 본인것만 조회
					value += "<option selected value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				}else{
					value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				}
				
			});			
	
			$("#selAgent").append(value);
			$("#selAgent").trigger("change");
			
/*			if (usrGrdCd == "010100") {
				$("#selAgent option:first").prop("disabled", true);;
			} else {
				$("#selAgent option:first").prop("disabled", false);
			}	*/			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//전화걸기
function confirm_resv(obj) {
	var tel = $(obj).attr("id");
	
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = $("#selAgent").val();  
	}	
	
	if (confirm(tel + "\n전화를 거시겠습니까?")) {
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/updateCallCnt.do",
			data : "pJson=" + getJsonStrUpdateCallCnt(),
			success : function(data) {
				$("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do", postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {
					"cmpg_id": parseInt(obj010.CMPG_ID),
					"procSt" : $("#selProcSt").val(),
					"usr_id" : g_usrId
				})} , page : $("#cmpgtbl012").getGridParam("page"), sortname : "CUST_NM", sortorder : "desc"}).trigger("reloadGrid");
				tel = tel.replace(/[-,\s]/g,"");
				
//				opener.resvCallSet(obj012.CUST_ID, tel, "", document.title);

				window.sessionStorage.setItem("setCustInfo", "true");
				window.sessionStorage.setItem("callType", "makecall");
				makeCall(areaNumber(tel));
				setCustInfo(tel, obj012.CUST_ID);
				
/*				
				opener.window.sessionStorage.setItem("setCustInfo", "true");
				opener.window.sessionStorage.setItem("callType", "makecall");
				opener.makeCall(tel);
				opener.setCustInfo(tel, obj012.CUST_ID);
*/				
				
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 시도 횟수 업데이트
function getJsonStrUpdateCallCnt()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMTIudXBkYXRlQ2FsbENudA==",
		"map" : {
			"key" : "value",
			"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//고객정보 초기화
function clearCustInfo() {
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = "all";  
	}	
	
	$("#cmpgCustom6").html("");
	$("#cmpgTel6").html("");
	$("#cmpgHtel6").html("");
	
	$("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do", postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {
		"cmpg_id": parseInt(obj010.CMPG_ID),
		"procSt" : $("#selProcSt").val(),
		"usr_id" : g_usrId
	})} , page : $("#cmpgtbl012").getGridParam("page"), sortname : "CUST_NM", sortorder : "asc"}).trigger("reloadGrid");
	
	obj012 = {};
}

//질의 초기화
function clearQuestion() {
	$("#custQa").empty();
	$("input:radio[name='radioGndr']").prop("checked", false);
	$("#telyn").prop("checked", false); 
	$("#smsyn").prop("checked", false);
	$("#result option:first").prop("selected", true);
	$("#unresponsiveness option:first").prop("selected", true);
	$("#cmpgMemo").val("");
}

//초기 컨트롤 셋팅
function initCmpnTabControl()
{
	datePicker("#selCmpnFrDate");
	datePicker("#selCmpnToDate");
	
	setSelectBoxWithCode("result","","90013", "", "","");
	setSelectBoxWithCode("selProcSt","전체","90013", "", "","010000");
	setSelectBoxWithCode("unresponsiveness","","91001", "", "","");
	
	cmpgtbl010_init_grid();
	cmpgtbl012_init_grid();

}

//초기 데이터 셋팅
function initCmpnTabData()
{
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");
	 $("#selAgent").prop("disabled", true);
	} 
	
	setSelectBoxWithUser();

	initTabData_Search();
}

//조회조건 초기 데이터 셋팅
function initTabData_Search()
{
	$("#selCmpnFrDate").val(getDate());
	$("#selCmpnToDate").val(getDate());
	
	$("#cmpgNm").val("");
	$("#selAgent").val("all");
	
	//고객정보, 설문지문항
	//clearQuestion();
	//clearCustInfo();
	
	$("#cmpgtbl012").clearGridData();	//고객 그리드
	$("#tbl010").clearGridData();		//해피콜 그리드
	
	

}

//초기 이벤트 셋팅
function initCmpnTabEvent()
{
	$("#btnCmpnTabInsert").bind("click", btnCmpnTabInsert_clickEvent);
	$("#btnScript").bind("click", custBtnScript_clickEvent);
	
	//초기화 버튼
	$("#cmpgCustBtnInit").on("click", function() {
		clearQuestion();
		clearCustInfo();
	});
	
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = "all";  
	}		
	
	//대상자 필터링
	$("#selProcSt").on("change", function(e) {
	    $("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do", postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {"key" : "value" ,
			"cmpg_id" : parseInt(obj010.CMPG_ID),
			"procSt" : $("#selProcSt").val(),
			"usr_id" : g_usrId
		})} , page : 1, sortname : "CUST_NM", sortorder : "asc"}).trigger("reloadGrid");
	});
	
	//조회조건 초기화버튼
	$("#btnCmpnTabReset").on("click", function() {
		initTabData_Search();
		//해피콜 상담사리스트 초기화
		$("#cmpgCustom6").html("");
		$("#cmpgTel6").html("");
		$("#cmpgHtel6").html("");
		//설문지 초기화
		clearQuestion();
		
	});
	
	//조회조건 조회버튼
	$("#btnCmpnTabSearch").bind("click", btnCmpnTabSearch_clickEvent);
}

//조회조건 검색버튼 클릭이벤트
function btnCmpnTabSearch_clickEvent()
{
	var frDt = $("#selCmpnFrDate").val();
	var toDt = $("#selCmpnToDate").val();
	var cmpgNm = $("#cmpgNm").val();
	
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = $("#selAgent").val();  
	}	
	
	if(frDt != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if(toDt != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	$("#tbl010").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value",
		"fr_dt" : frDt,
		"to_dt" : toDt,
		"cmpg_nm" : cmpgNm,
		"usrGrdCd" : usrGrdCd,
		"usr_id" : g_usrId	
	})} , page : 1, sortname : "STRT_DT", sortorder : "desc"});
	$("#tbl010").trigger("reloadGrid");
	
}

//처리결과 저장버튼 클릭이벤트
function btnCmpnTabInsert_clickEvent() {
	var pList1 = [];
	
	for(var qusetionSeq = 1; qusetionSeq <= obj010.VLTN_CNT; qusetionSeq++) {
//		var $answer = $("input:radio[name='" + qusetionSeq + "']:checked");
		var $answer = $("input[name='" + qusetionSeq + "']");
		if($answer.val()) {
			if($answer.attr("type") =="radio") {
				var ansNo = $("input:radio[name='" + qusetionSeq + "']:checked").val();
				var qstSeq = $answer.attr("id");
				qstSeq = (qstSeq.split("_"))[0] + "_" + (qstSeq.split("_"))[1] + "_" + ansNo;
				var ansNm = $("label[for='" + qstSeq + "']").html();
				qstSeq = (qstSeq.split("_"))[0];
				
				pList1.push({
					"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map": {
						"qst_seq" : qstSeq,
						"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
						"ans_no" : ansNo,
						"ans_nm" : ansNm
					}});
			} else {
				var ansNm = $answer.val(); //주관식 답
				var qstSeq = $answer.attr("id");
				qstSeq = (qstSeq.split("_"))[0];
				
				pList1.push({
					"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map": {
						"qst_seq" : qstSeq,
						"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
						"ans_no" : "0",
						"ans_nm" : ansNm
					}});
			}
		}
	}
	
	var login_usr_id = window.sessionStorage.getItem("USR_ID");
	
	pList1.push({"qt" : "dXBkYXRl",
		"mi" : "Y20wMTIudXBkYXRlQ3VzdA==",
		"map":	{
			//cm012
			"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
			"proc_st_cd" : $("#result").val(),
			"not_ans_rson" : $("#unresponsiveness").val(),
			"etc_memo" : $("#cmpgMemo").html(),
			//cm003
			"cust_id" : obj012.CUST_ID,
			"gndr" : $("input:radio[name='radioGndr']:checked").val(),
			"telyn" : $("#telyn").is(":checked") ? "Y" : "N",
			"smsyn" : $("#smsyn").is(":checked") ? "Y" : "N",						
			"login_usr_id" : login_usr_id, 
	}});
	
	if(obj010.PROC_ST_CD == "010000" && $("#result").val() == "010000") {
		alert("미진행인 해피콜은 저장 할 수 없습니다.");
		return;
	} else {
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/insertSelectReply.do",
			data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
				
			success : function(data) {			
				//$("#cmpgtbl012").trigger("reloadGrid");
				//$("#cmpgCustBtnInit").trigger("click");
				
				var main_Rec_Cont = "해피콜 설문";
				var strTicketId = $("#tfMainTicketId").val();
				
				//아웃바운드 상담 상태일때 메인 상담저장
				if(strTicketId != "") {//메인에 티켓아이디가 세팅됬을 경우
					
					// 불응답사유(91001)가 통화불가(1002)이면 상담이력을 넣지 않는다.
					if ($("#unresponsiveness").val() != "1002") {
					
						//$("#tfMainRcvCont").val($("#unresponsiveness option:selected").html());	//불응답사유 -> 문의내용
						opener.$("#tfMainRcvCont").val(main_Rec_Cont);								//"캠페인 상담" -> 문의내용
						opener.$("#tfMainActCont").val($("#cmpgMemo").val());						//메모 -> 답변내용
						opener.$("#selMainActtypecd").val("070000");								//처리유형 (90014) -> 설문(070000) 으로 저장 한다. 
						opener.$("#selMainActstcd").val($("#result").val());						//상담결과

						opener.fnSaveCnsl("C");
						//opener.$("#btnCnslSave").trigger("click");
									
					}
				}
				
				//return;
				
				//alert("저장이 완료되었습니다.");
				
				$("#cmpgtbl010").trigger("reloadGrid");
				$("#cmpgtbl012").trigger("reloadGrid");
				$("#cmpgCustBtnInit").trigger("click");

			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//스크립트 보기
function custBtnScript_clickEvent()
{
	if(!obj010.CMPG_ID) {
		alert("해피콜을 선택해 주세요.");
		return;
	}
	
	window.sessionStorage.setItem("campaignId", obj010.CMPG_ID);

	var width = 975;
	var height = 758;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/campaign/openScript.do";
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "campScript", option);
	newWindow.focus();
}

// 메인화면 로딩시 부하를 줄이기 위해 초기셋팅을 function으로 변환 이후 탭 메뉴를 클릭시 사용함
function initdivRCTabHappyCall()
{
	initCmpnTabEvent();
	initCmpnTabData();
	initCmpnTabControl();
	
	$("#btnCmpnTabSearch").trigger("click");

}
