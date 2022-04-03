var searchValExist = false;
var searchStr;
var searchEnd;

var lcTXresNumb;
var lcTXeNapbuNumb;
var lcTXcitizenNm;
var b64lcTXresNumb;
var b64lcTXeNapbuNumb;
var b64lcTXcitizenNm;

var tckt_id = "";
if (window.sessionStorage.getItem("tcktId") != null) { 
	tckt_id = window.sessionStorage.getItem("tcktId");
};

function btnLocalTaxSearch_clickEvent() {
	if (checkIvrCall == false) {
		alert("ARS 인증을 먼저 해주셔야 됩니다.");
		return;
	};
	
	fnLocalTaxSummInfo();
	
	$("#csLocaltax_tblCsLocalTaxList").jqGrid("setGridParam", {datatype : "json", postData : {pJson : getJsonStrLocalTaxList()} , page : 1, sortname : "미납액 DESC, 과세년월", sortorder : "DESC"});
	$("#csLocaltax_tblCsLocalTaxList").trigger("reloadGrid");
}

// 고지,체납 합계 금액 셋팅
function fnLocalTaxSummInfo(){
	$("#csLocaltax_chk_chenap,#csLocaltax_chk_junggi").prop("checked", false);
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/selectLocalTaxSumm.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "bG9jYWx0YXgubG9jYWxUYXhzU3VtbQ==", { "tpr_no" : $("#hidTaxSsNumber").val() }),
		success : function(data) {
			console.log(data);
			
			var junggi = 0;
			var chenap = 0;
			
			if(data != null){
				for(var i=0; i<data.length; i++){
					if(data[i].구분 == "체납"){
						chenap += data[i].미납액;
					}else{
						junggi += data[i].미납액;
					}
				}
				
				$("#csLocaltax_summ_junggi").html(changeNumberFormat(String(junggi)));
				$("#csLocaltax_summ_chenap").html(changeNumberFormat(String(chenap)));
				$("#csLocaltax_summ_totMney").html("0");
				
				$("#csLocaltax_saemokNm").val(data[0].대표세목명);
				$("#csLocaltax_account").val(data[0].계좌번호);
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function btnLocalTaxInit_clickEvent() {
	searchValExist = false;
	$("#csLocaltax_chk_chenap,#csLocaltax_chk_junggi").prop("checked", false);
	$("#csLocaltax_summ_junggi,#csLocaltax_summ_chenap,#csLocaltax_summ_totMney").html("");
	$("#csLocaltax_tblCsLocalTaxList").clearGridData();
	$("#csLocaltax_tbl").find("label").text("");
	$("#csLocaltax_cnNm").text("");
	$("#csLocaltax_BtnHistory").hide();
}

function csLocaltaxHistory_clickEvent(e) {
	window.sessionStorage.setItem("eTargetId", e.currentTarget.id);
	window.sessionStorage.setItem("inqr_scr", "csLocalTax");
	window.sessionStorage.setItem("b64lcTXresNumb", b64lcTXresNumb);
	
	window.open("", "csAdministrationOpenHistory", 'scrollbars=no, resizable=no, width=1200, height=750, left=150, top=150'); 
	document.csLocaltax_lcTXform.target ="csAdministrationOpenHistory"; 
	document.csLocaltax_lcTXform.action="/web/civilservice/csAdministrationHistory.do"; 
	document.csLocaltax_lcTXform.submit();
}
function insertObjLocalTaxHistory(status, err) {
	if (searchValExist == true) {
		searchEnd = new Date(); // 검색 종료 순간 Date 정보 세팅
		var ans_tm = searchEnd.getTime() - searchStr.getTime();
		ans_tm = Math.floor(ans_tm/1000);
		
		var inqr_cond = "주민번호:" + lcTXresNumb;
		var rslt = "주민번호:" + b64lcTXresNumb;
		
		var loParam_localTax = {
				"qt" : "aW5zZXJ0",
				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
				"map" : {
					"key" : "value",
					"tckt_id" : tckt_id,
					"lnk_stm_cd" : "200000",  
					"inqr_scr" : "csLocalTax",
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
			data : "pJson=" + encodeURIComponent(JSON.stringify(loParam_localTax)),
			success : function(data) {
				searchValExist == false;
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	};
}

function getJsonStrLocalTaxList() {
	lcTXresNumb = SHA256($("#hidTaxSsNumber").val());
	
	b64lcTXresNumb = b64EncodeUnicode($("#hidTaxSsNumber").val());
	
	if ($("#hidTaxSsNumber").val().length == 13) { // 검색 조건이 있을 경우
		searchValExist = true;
		searchStr = new Date(); // 검색 시작 순간 Date 정보 세팅
	};
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "bG9jYWx0YXgubG9jYWxUYXhzZWxlY3RMaXN0",
		"map" : {
			"key" : "value",
			"tpr_no" : $("#hidTaxSsNumber").val(),
			"strtDt" : $("#csLocaltax_tfSrchFrDate").val().replace(/-/gi, ""),
			"endDt" : $("#csLocaltax_tfSrchToDate").val().replace(/-/gi, ""),
		}
	};
	return  encodeURIComponent(JSON.stringify(loParam));
}

function csLocaltax_BtnSmsSend_clickEvent(){
	var width = "500";
	var height = "180";
	
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);
	
	window.sessionStorage.setItem("SMS_CD", "csLocaltax");
	
	var newWindow = window.open("", "csSmsSend", "resizable");
	newWindow.resizeTo("500","401");
	newWindow.moveTo(left, top);
	newWindow.focus();
	
	document.csLocaltax_lcTXSmsform.target ="csSmsSend"; 
	document.csLocaltax_lcTXSmsform.action="/web/civilservice/csSmsSend.do"; 
	document.csLocaltax_lcTXSmsform.submit();
}

//압류일때 금액 "압류" 로 보이도록 포맷 
function fnTaxCellFmtter(cellvalue, options, rowObject){
	if(rowObject.압류 == "압류"){
		return "압류";
	}else{
		return cellvalue;
	}
}

function initdivLocalTaxTab() {
	var d_frDate = getPrvDay("Y", 5, "-");						
	var d_toDate = getDate();
	datePicker("#csLocaltax_tfSrchFrDate");
	datePicker("#csLocaltax_tfSrchToDate");
	$("#csLocaltax_tfSrchFrDate").val(d_frDate);
	$("#csLocaltax_tfSrchToDate").val(d_toDate);
	
	$("#csLocaltax_BtnHistory").hide(); 
	$("#csLocaltax_btnSearch").bind("click", btnLocalTaxSearch_clickEvent);
	$("#csLocaltax_btnInit").bind("click", btnLocalTaxInit_clickEvent);
	$("#csLocaltax_BtnHistory").bind("click", csLocaltaxHistory_clickEvent); 
	$("#csLocaltax_btnSMS").bind("click", csLocaltax_BtnSmsSend_clickEvent); 
	$("#csLocaltax_chk_junggi,#csLocaltax_chk_chenap").click( function() {
		clickCheckBoxSumm(this.id, this.checked, "csLocaltax");
	});
	
	$("#csLocaltax_tblCsLocalTaxList").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/csLocalTaxList.do",
		datatype : "local",
		mtype : 'POST',
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [
			"과세년월", "과세번호","전자납부번호", "성명/상호", "과세구분",
			"대표세목명", "수납", "미납액", "체납", "압류", "최초납기", "납기일", "과세물건",
			"당초본세", "징수결정일", "본세", "가산금", "부과일자", "납부일",
			"가상계좌번호", "가상계좌은행", "가상계좌번호2", "가상계좌은행2",
			"가상계좌번호3", "가상계좌은행3", "가상계좌번호4", "가상계좌은행4", "예금주명",
			"결손여부", "자동이체여부"
		],
		colModel :
		[
			{name : "과세년월", index : "과세년월", align : "center", width : 100},
			{name : "과세번호2", index : "과세번호2", align : "center", width : 150, hidden : true},
			{name : "전자납부번호", index : "전자납부번호", align : "center", width : 150},
			{name : "CN_EMP", index : "CN_EMP", align : "center", width : 100, hidden : true},
			{name : "과세구분", index : "과세구분", align : "center", width : 80},
			{name : "대표세목명", index : "대표세목명", align : "center", width : 150},
			{name : "수납", index : "수납", align : "center", width : 50},
			{name : "미납액", index : "미납액", align : "center", width : 100, formatter:fnTaxCellFmtter},
			{name : "체납", index : "체납", align : "center", width : 50},
			{name : "압류", index : "압류", align : "center", width : 50},
			{name : "최초납기", index : "최초납기", align : "center", width : 100, hidden : true},
			{name : "납기", index : "납기", align : "center", width : 100},
			{name : "과세물건", index : "과세물건", align : "center", width : 100, hidden : true},
			{name : "당초본세", index : "당초본세", align : "center", width : 100, hidden : true},
			{name : "징수결정일", index : "징수결정일", align : "center", width : 100, hidden : true},
			{name : "본세", index : "본세", align : "center", width : 100, hidden : true},
			{name : "가산금", index : "가산금", align : "center", width : 100, hidden : true},
			{name : "부과일자", index : "부과일자", align : "center", width : 100, hidden : true},
			{name : "납부일", index : "납부일", align : "center", width : 100, hidden : true},
			{name : "가상계좌번호", index : "가상계좌번호", align : "center", width : 100, hidden : true},
			{name : "가상계좌은행", index : "가상계좌번호", align : "center", width : 100, hidden : true},
			{name : "가상계좌번호2", index : "가상계좌번호2", align : "center", width : 100, hidden : true},
			{name : "가상계좌은행2", index : "가상계좌번호2", align : "center", width : 100, hidden : true},
			{name : "가상계좌번호3", index : "가상계좌번호3", align : "center", width : 100, hidden : true},
			{name : "가상계좌은행3", index : "가상계좌번호3", align : "center", width : 100, hidden : true},
			{name : "가상계좌번호4", index : "가상계좌번호4", align : "center", width : 100, hidden : true},
			{name : "가상계좌은행4", index : "가상계좌번호4", align : "center", width : 100, hidden : true},
			{name : "예금주명", index : "예금주명", align : "center", width : 100, hidden : true},
			{name : "결손여부", index : "결손여부", align : "center", width : 100, hidden : true},
			{name : "자동이체여부", index : "자동이체여부", align : "center", width : 100, hidden : true},
		],
		sortname : "미납액 DESC, 과세년월",
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
	   	pager : "#csLocaltax_pagingCsLocalTaxList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,	
		onSelectRow : function(rowid) 
		{
			$("#csLocaltax_tbl").find("label").text("");
			
//			$("#csLocaltax_BtnHistory").show();
			
			var rowData = $("#csLocaltax_tblCsLocalTaxList").jqGrid("getRowData", rowid);
			
			if(rowData.압류 == "압류"){
				return;
			}
			
			// 평택의 경우 압류일 경우 내용이 보이지 않지만, 순천은 별 다른 말이 없었으므로 보이도록 함.
			$("#csLocaltax_cnNm").text(rowData.CN_EMP);
			$("#csLocaltax_cnGawseGb").text(rowData.과세구분);
			$("#csLocaltax_cnGawseNumb").text(rowData.과세번호2);
			$("#csLocaltax_cnENapbuNumb").text(rowData.전자납부번호);
			$("#csLocaltax_cnCarNumb").text(rowData.차량번호);
			$("#csLocaltax_cnGwaseYMD").text(rowData.과세년월);
			$("#csLocaltax_cnChenapYN").text(rowData.체납여부);
			$("#csLocaltax_cnSaemokNm").text(rowData.대표세목명);
			$("#csLocaltax_cnMenapPrice").text(rowData.미납액);
			$("#csLocaltax_cnBonse").text(rowData.본세);
			$("#csLocaltax_cnGasanPrice").text(rowData.가산금);
			$("#csLocaltax_cnBugwaYMD").text(rowData.부과일자);
			$("#csLocaltax_cnFirstNapYMD").text(rowData.최초납기);
			$("#csLocaltax_cnNapYMD").text(rowData.납기);
			$("#csLocaltax_cnNapbuYMD").text(rowData.납부일);
			$("#csLocaltax_cnSunapYn").text(rowData.수납);
			$("#csLocaltax_cnJadongYn").text(rowData.자동이체여부);
			$("#csLocaltax_cnGamExstYN").text(rowData.결손여부);
			$("#csLocaltax_cnNapbuYMD").text(rowData.납부일);
			$("#csLocaltax_cnGwaseObj").text(rowData.과세물건);
			$("#csLocaltax_cnChenapYN").text(rowData.체납);
				
			if (rowData.가상계좌번호 != null && rowData.가상계좌번호 != "") {
				$("#csLocaltax_cnGaccountNumb1").text(rowData.가상계좌번호 + "(" + rowData.가상계좌은행 + ")");
			}
			
			$("#csLocaltax_cnYegmjuNm").text(rowData.예금주명);
		},
		loadComplete : function(data, status, err) {
			var ids = $("#csLocaltax_tblCsLocalTaxList").getDataIDs();
			$.each(ids,function(idx, rowId){
				rowData = $("#csLocaltax_tblCsLocalTaxList").getRowData(rowId);
				if(rowData.수납 != "완납"){
					$("#csLocaltax_tblCsLocalTaxList #"+rowId+" td:eq(0)~").css("color","red");
				}
			});
			insertObjLocalTaxHistory(status, err);
		},
		loadError : function(data, status, err) {
			insertObjLocalTaxHistory(status, err);
			networkErrorHandler(data, status, err);
		}
	}).jqGrid("navGrid", "#csLocaltax_pagingCsLocalTaxList", {edit : false, add : false, del : false, search : false});
}
