var arrTXsearchValExist = false;
var arrTXsearchStr;
var arrTXresNumb
var arrTXcitizenNM;
var b64arrTXresNumb;
var b64arrTXcitizenNM;

var tckt_id = "";
if (window.sessionStorage.getItem("tcktId") != null) { 
	tckt_id = window.sessionStorage.getItem("tcktId");
};

function initdivNonTaxRcptTab() {
	var d_frDate = getPrvDay("Y", 5, "-");						
	var d_toDate = getDate();
	datePicker("#csNonTaxRcpt_arrTXtfSrchFrDate");
	datePicker("#csNonTaxRcpt_arrTXtfSrchToDate");
	$("#csNonTaxRcpt_arrTXtfSrchFrDate").val(d_frDate);
	$("#csNonTaxRcpt_arrTXtfSrchToDate").val(d_toDate);
	
	$("#csNonTaxRcpt_arrTXBtnHistory").hide(); 
	$("#csNonTaxRcpt_arrTXBtnHistory").bind("click", csNonTaxRcptHistory_clickEvent); 
	$("#csNonTaxRcpt_btnSMS").bind("click", csNonTaxRcptSMS_clickEvent); 
	
	nonTaxRcptArrearTaxTab();
	
	$("#csNonTaxRcpt_arrTXbtnTaxSearch").bind("click", arrTXbtnTaxSearch_clickEvent); 
	$("#csNonTaxRcpt_arrTXbtnTaxInit").bind("click", arrTXbtnTaxInit_clickEvent); 
	$("#csNonTaxRcpt_arrTXtfSrchCitizenNM").bind("keydown", function(key){ 
		if (key.keyCode == 13) 
			arrTXbtnTaxSearch_clickEvent();
	});
	
	$("#csNonTaxRcpt_chk_junggi,#csNonTaxRcpt_chk_chenap").click( function() {
		clickCheckBoxSumm(this.id, this.checked, "csNonTaxRcpt");
	});
}

function csNonTaxRcptSMS_clickEvent(){
	var width = "500";
	var height = "180";
	
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);
	
	var formCnt = 0;
	
	if($("#csNonTaxRcpt_chk_junggi").is(":checked") && $("#csNonTaxRcpt_chk_chenap").is(":checked")){
		formCnt = csNonTaxRcptTotalCnt;
	}else if($("#csNonTaxRcpt_chk_junggi").is(":checked")){
		formCnt = csNonTaxRcptMinabCnt;
	}else if($("#csNonTaxRcpt_chk_chenap").is(":checked")){
		formCnt = csNonTaxRcptChenabCnt;
	}
	
	window.sessionStorage.setItem("SMS_CD", "csNonTaxRcpt");
	
	var newWindow = window.open("", "csSmsSend", "resizable");
	newWindow.resizeTo("500","401");
	newWindow.moveTo(left, top);
	newWindow.focus();
	
	document.csNonTaxRcpt_Smsform.csNonTaxRcpt_totCnt.value = formCnt; 
	
	document.csNonTaxRcpt_Smsform.target ="csSmsSend"; 
	document.csNonTaxRcpt_Smsform.action="/web/civilservice/csSmsSend.do"; 
	document.csNonTaxRcpt_Smsform.submit();
}

function csNonTaxRcptHistory_clickEvent(e) {
	window.sessionStorage.setItem("eTargetId", e.currentTarget.id);
	window.sessionStorage.setItem("inqr_scr", "csNonTax,arrTX");
	window.sessionStorage.setItem("b64arrTXresNumb", b64arrTXresNumb);
	window.sessionStorage.setItem("b64arrTXcitizenNM", b64arrTXcitizenNM);
	
	window.open("", "csAdministrationOpenHistory", 'scrollbars=no, resizable=no, width=1200, height=750, left=150, top=150'); 
	document.csNonTaxRcpt_arrTXform.target ="csAdministrationOpenHistory"; 
	document.csNonTaxRcpt_arrTXform.action="/web/civilservice/csAdministrationHistory.do"; 
	document.csNonTaxRcpt_arrTXform.submit();
}

function insertObjNonTaxRcptHistory(status, err, pId) {
	var searchValExist = arrTXsearchValExist;
	var searchStr = arrTXsearchStr;
	var searchEnd;
	var lnk_stm_cd = "400001";
	var inqr_scr = "arrTX";;
	var inqr_cond = "주민번호:" + arrTXresNumb + ",납부자명:" + arrTXcitizenNM;
	var rslt = "주민번호:" + b64arrTXresNumb + ",납부자명:" + b64arrTXcitizenNM;
	
	if (searchValExist == true) {
		searchEnd = new Date(); // 검색 종료 순간 Date 정보 세팅
		var ans_tm = searchEnd.getTime() - searchStr.getTime();
		ans_tm = Math.floor(ans_tm/1000);
		
		var loParam_nonTaxRcpt = {
				"qt" : "aW5zZXJ0",
				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
				"map" : {
					"key" : "value",
					"tckt_id" : tckt_id,
					"lnk_stm_cd" : lnk_stm_cd,  
					"inqr_scr" : "csNonTax" + inqr_scr, 
					"inqr_cond" : inqr_cond, 
					"ans_tm" : ans_tm, 
					"rslt_cd" : status != "error" ? "00000" : "00001", 
					"rslt" : status != "error" ? rslt : err 
				}
		};
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/insertLocalTaxHistory.do",
			data : "pJson=" + encodeURIComponent(JSON.stringify(loParam_nonTaxRcpt)),
			success : function(data) {
				arrTXsearchValExist == false;
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	};
}

// 세외수입 건수
var csNonTaxRcptMinabCnt = 0;
var csNonTaxRcptChenabCnt = 0;
var csNonTaxRcptTotalCnt = 0;

function fnNonTaxSummInfo(){
	$("#csNonTaxRcpt_chk_chenap,#csNonTaxRcpt_chk_junggi").prop("checked", false);
	
	csNonTaxRcptMinabCnt = 0;
	csNonTaxRcptChenabCnt = 0;
	csNonTaxRcptTotalCnt = 0;
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/selectNonTaxRcptSumm.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "bm9uX3RheC5ub25UYXhSZWNlaXB0U3VtbQ==", { "perId" : $("#hidTaxSsNumber").val() }),
		success : function(data) {
			console.log(data);
			
			var junggi = 0;
			var chenap = 0;
			
			if(data != null){
				$("#csNonTaxRcpt_summ_junggi").html(data.미납금액);
				$("#csNonTaxRcpt_summ_chenap").html(data.체납금액);
				$("#csNonTaxRcpt_summ_totMney").html("0");

				$("#csNonTaxRcpt_custNm").val(data.납부자명);
				$("#csNonTaxRcpt_account").val(data.계좌번호);
				
				csNonTaxRcptMinabCnt = data.미납건수;
				csNonTaxRcptChenabCnt = data.체납건수;
				csNonTaxRcptTotalCnt = data.전체건수;
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function arrTXbtnTaxSearch_clickEvent() {
	if (checkIvrCall == false) {
		alert("ARS 인증을 먼저 해주셔야 됩니다.");
		return;
	};
	
	fnNonTaxSummInfo();
	
	$("#csNonTaxRcpt_arrTXtblList").jqGrid("setGridParam", {datatype : "json", postData : {pJson : getJsonStrNonTaxRcptArrearTax()} , page : 1, sortname : "LVY_YMD", sortorder : "DESC"});
	$("#csNonTaxRcpt_arrTXtblList").trigger("reloadGrid");
}

function arrTXbtnTaxInit_clickEvent() {
	arrTXsearchValExist = false;
	$("#csNonTaxRcpt_chk_chenap,#csNonTaxRcpt_chk_junggi").prop("checked", false);
	$("#csNonTaxRcpt_summ_junggi,#csNonTaxRcpt_summ_chenap,#csNonTaxRcpt_summ_totMney").html("");
	$("#csNonTaxRcpt_arrTXtblList").jqGrid("clearGridData");
	$("#csNonTaxRcpt_arrTXBtnHistory").hide();
	$("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val("");
	$("#csNonTaxRcpt_arrTXtbl").find("label").text("");
}


function getJsonStrNonTaxRcptArrearTax() {
	arrTXresNumb = SHA256($("#hidTaxSsNumber").val());
	arrTXcitizenNM = SHA256($("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val());
	
	b64arrTXresNumb = b64EncodeUnicode($("#hidTaxSsNumber").val());
	b64arrTXcitizenNM = b64EncodeUnicode($("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val());
	
	if ($("#hidTaxSsNumber").val().length == 13 
			|| $("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val().length >= 1) { // 검색 조건이 있을 경우
		arrTXsearchValExist = true;
		arrTXsearchStr = new Date(); // 검색 시작 순간 Date 정보 세팅
	};
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "bm9uX3RheC5hcnJUYXhzZWxlY3RMaXN0",
			"map" : {
				"key" : "value",
				"perId" : $("#hidTaxSsNumber").val(), 
				"perNm" : $("#csNonTaxRcpt_arrTXtfSrchCitizenNM").val(),
				"strtDt" : $("#csNonTaxRcpt_arrTXtfSrchFrDate").val().replace(/-/gi, ""),
				"endDt" : $("#csNonTaxRcpt_arrTXtfSrchToDate").val().replace(/-/gi, ""),
			}
	};
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 압류일때 금액 "압류" 로 보이도록 포맷 
function fnNonTaxCellFmtter(cellvalue, options, rowObject){
	if(rowObject.ATT_GBN == "압류"){
		return "압류";
	}else{
		return cellvalue;
	}
}

function nonTaxRcptArrearTaxTab() {
	$("#csNonTaxRcpt_arrTXtblList").jqGrid({ 
		url : getContextPath() + "/jqgrid/civilservice/csNonTaxReceiptList.do",
		datatype : "local",
		mtype : "post",
		postData : {
			pJson : getJsonStrNonTaxRcptArrearTax()
		},
		jsonReader : {
			repeatitems : false
		},
		colNames : ["전자납부번호", "구분", "세목명", "납부자명", "전화번호", "휴대폰번호", "부과구분", "수납구분", "압류구분", "납부자주소", "부과일자", "최초부과금액", "가산금", "납기금액", "최초납기일자", "납기일자", "은행명", "가상계좌번호"],
		colModel : [
			{name : "ERC_NO", index : "ERC_NO", align : "center", width : 30, hidden : true},
			{name : "LVY_NM", index : "LVY_NM", align : "center", width : 50}, 
			{name : "SEMOK_NM", index : "SEMOK_NM", align : "center", width : 100}, 
			{name : "PER_NM", index : "PER_NM", align : "center", width : 100}, 
			{name : "PER_TEL", index : "PER_TEL", align : "center", width : 40, hidden : true}, 
			{name : "PER_CELL", index : "PER_CELL", align : "center", width : 40, hidden : true}, 
			{name : "LVY_STT_GBN", index : "LVY_STT_GBN", align : "center", width : 40}, 
			{name : "PAY_GBN", index : "PAY_GBN", align : "center", width : 100, hidden : true}, 
			{name : "ATT_GBN", index : "ATT_GBN", align : "center", width : 40}, 
			{name : "PER_ADDR", index : "PER_ADDR", align : "center", width : 80, hidden : true}, 
			{name : "LVY_YMD", index : "LVY_YMD", align : "center", width : 80}, 
			{name : "FST_AMT", index : "FST_AMT", align : "center", width : 80, formatter:fnNonTaxCellFmtter}, 
			{name : "LST_ADD_AMT", index : "LST_ADD_AMT", align : "center", width : 80, formatter:fnNonTaxCellFmtter}, 
			{name : "PAT_AMT", index : "PAT_AMT", align : "center", width : 80, formatter:fnNonTaxCellFmtter}, 
			{name : "FST_NAP_YMD", index : "FST_NAP_YMD", align : "center", width : 80, hidden : true}, 
			{name : "LST_NAP_YMD", index : "LST_NAP_YMD", align : "center", width : 80}, 
			{name : "BANK_NM", index : "BANK_NM", align : "center", width : 80, hidden : true}, 
			{name : "ACCOUNT_NO", index : "ACCOUNT_NO", align : "center", width : 80, hidden : true}, 
		],
		sortname : "LVY_YMD",
	   	sortorder : "DESC",
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
	   	pager : "#csNonTaxRcpt_arrTXpagingList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		$("#csNonTaxRcpt_arrTXtbl").find("label").text("");
	   		
	   		var rowData = $("#csNonTaxRcpt_arrTXtblList").jqGrid("getRowData", rowid);
   			
	   		if(rowData.ATT_GBN == "압류"){
	   			return;
	   		}
	   		
//	   		$("#csNonTaxRcpt_arrTXBtnHistory").show();
			$("#csNonTaxRcpt_arrTXsemokNm").html(rowData.SEMOK_NM);
			$("#csNonTaxRcpt_arrTXperNm").html(rowData.PER_NM);
			$("#csNonTaxRcpt_arrTXercNo").html(rowData.ERC_NO);
			$("#csNonTaxRcpt_arrTXlvyNm").html(rowData.LVY_NM);
			$("#csNonTaxRcpt_arrTXpayGbn").html(rowData.PAY_GBN);
			$("#csNonTaxRcpt_arrTXattGbn").html(rowData.ATT_GBN);
			$("#csNonTaxRcpt_arrTXperAddr").html(rowData.PER_ADDR);
			$("#csNonTaxRcpt_arrTXperTel").html(rowData.PER_TEL);
			$("#csNonTaxRcpt_arrTXperCell").html(rowData.PER_CELL);
			$("#csNonTaxRcpt_arrTXfstAmt").html(rowData.FST_AMT);
			$("#csNonTaxRcpt_arrTXlstAddAmt").html(rowData.LST_ADD_AMT);
			$("#csNonTaxRcpt_arrTXpatAmt").html(rowData.PAT_AMT);
			$("#csNonTaxRcpt_arrTXlvyYMD").html(rowData.LVY_YMD);
			$("#csNonTaxRcpt_arrTXfstNapYMD").html(rowData.FST_NAP_YMD);
			$("#csNonTaxRcpt_arrTXlstNapYMD").html(rowData.LST_NAP_YMD);
			$("#csNonTaxRcpt_arrTXbankNm").html(rowData.BANK_NM);
			$("#csNonTaxRcpt_arrTXaccountNo").html(rowData.ACCOUNT_NO);
	   	},
	   	loadComplete : function(status, err) {
	   		var ids = $("#csNonTaxRcpt_arrTXtblList").getDataIDs();
			$.each(ids,function(idx, rowId){
				rowData = $("#csNonTaxRcpt_arrTXtblList").getRowData(rowId);
				if(rowData.LVY_STT_GBN == "체납" || rowData.LVY_STT_GBN == "부과"){
					$("#csNonTaxRcpt_arrTXtblList #"+rowId+" td:eq(0)~").css("color","red");
				}
			});
			
			insertObjNonTaxRcptHistory(status, err, "arrTX");
		},
		loadError : function(status, err) {
			insertObjNonTaxRcptHistory(status, err, "arrTX");
		}
	}).jqGrid("navGrid", "#csNonTaxRcpt_arrTXpagingList", {edit : false, add : false, del : false, search : false});
}