var searchValExist = false;
var searchStr;
var searchEnd;

var carResNumb;
var carCitizenNm;
var car_carNumb;
var b64CarResNumb;
var b64CarCitizenNm;
var b64Car_carNumb;

var tckt_id = "";
if (window.sessionStorage.getItem("tcktId") != null) { 
	tckt_id = window.sessionStorage.getItem("tcktId");
};

function carTabBtnSearch_clickEvent() {
	$("#csCar_btnSMS").hide();
	
	if (checkIvrCall == false) {
		alert("ARS 인증을 먼저 해주셔야 됩니다.");
		return;
	};
	
	fnCarSummInfo();
	
	$("#csCar_tblCarList").jqGrid("setGridParam", {datatype : "json", postData : {pJson : getJsonStrCarInfoList()} , page : 1, sortname : "수납여부 DESC,위반일자", sortorder : "DESC"});
	$("#csCar_tblCarList").trigger("reloadGrid");
}

function carTabBtnInit_clickEvent() {
	searchValExist = false;
	$("#csCar_summ_junggi,#csCar_summ_chenap,#csCar_summ_totMney").html("");
	$("#csCar_tblCarList").clearGridData();
	$("#csCar_BtnHistory").hide();
	$("#csCar_btnSMS").hide();
	$("#csCar_tfSrchCitizenNm").val("");
	$("#csCar_tfSrchCarNumb").val("");
	$("#csCar_tbl").find("label").text("");
}

function fnCarSummInfo(){
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/selectCarSumm.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y2FyX2ZpbmUuY2FyU3VtbQ==", { "vmJno" : $("#hidTaxSsNumber").val() }),
		success : function(data) {
			
			var junggi = 0;
			var chenap = 0;
			
			if(data != null){
				$("#csCar_summ_junggi").html(data.미납금액);
				$("#csCar_summ_chenap").html(data.체납금액);
				$("#csCar_summ_totMney").html(data.총금액);
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrCarInfoList() {
	carResNumb = SHA256($("#hidTaxSsNumber").val());
	carCitizenNm = SHA256($("#csCar_tfSrchCitizenNm").val());
	car_carNumb = SHA256($("#csCar_tfSrchCarNumb").val());
	
	b64CarResNumb = b64EncodeUnicode($("#hidTaxSsNumber").val());
	b64CarCitizenNm = b64EncodeUnicode($("#csCar_tfSrchCitizenNm").val());
	b64Car_carNumb = b64EncodeUnicode($("#csCar_tfSrchCarNumb").val());
	if ($("#hidTaxSsNumber").val().length == 13 
			|| $("#csCar_tfSrchCitizenNm").val().length >= 1
			|| $("#csCar_tfSrchCarNumb").val().length >= 1) { // 검색 조건이 있을 경우
		searchValExist = true;
		searchStr = new Date(); // 검색 시작 순간 Date 정보 세팅
	};
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2FyX2ZpbmUuY2FyRmluZXNlbGVjdExpc3Q=",
			"map" : {
				"key" : "value",
				"vmJno" : $("#hidTaxSsNumber").val(),
				"vmName" : $("#csCar_tfSrchCitizenNm").val(),
				"vmCarNo" : $("#csCar_tfSrchCarNumb").val(),
				"vmFrDate" : $("#csCar_tfSrchFrDate").val().replace(/-/gi, ""),
				"vmToDate" : $("#csCar_tfSrchToDate").val().replace(/-/gi, "")
			}
	};
	return  encodeURIComponent(JSON.stringify(loParam));
}

function csCarHistory_clickEvent(e) {
	window.sessionStorage.setItem("eTargetId", e.currentTarget.id);
	window.sessionStorage.setItem("inqr_scr", "csCar");
	window.sessionStorage.setItem("b64CarResNumb", b64CarResNumb);
	window.sessionStorage.setItem("b64CarCitizenNm", b64CarCitizenNm);
	window.sessionStorage.setItem("b64Car_carNumb", b64Car_carNumb);
	
	window.open("", "csAdministrationOpenHistory", 'scrollbars=no, resizable=no, width=1200, height=750, left=150, top=150'); 
	document.csCar_TXform.target ="csAdministrationOpenHistory"; 
	document.csCar_TXform.action="/web/civilservice/csAdministrationHistory.do"; 
	document.csCar_TXform.submit();
}

function insertObjcarHistory(status, err) {
	if (searchValExist == true) {
		searchEnd = new Date(); // 검색 종료 순간 Date 정보 세팅
		var ans_tm = searchEnd.getTime() - searchStr.getTime();
		ans_tm = Math.floor(ans_tm/1000);
		
//		var inqr_cond = "주민번호:" + carResNumb + ",소유자명:" + carCitizenNm + ",차량번호:" + car_carNumb;
//		var rslt = "주민번호:" + b64CarResNumb + ",소유자명:" + b64CarCitizenNm + ",차량번호:" + b64Car_carNumb;
		
		var inqr_cond = "소유자명:" + carCitizenNm + ",차량번호:" + car_carNumb;
		var rslt = "소유자명:" + b64CarCitizenNm + ",차량번호:" + b64Car_carNumb;
		
		var loParam_car = {
				"qt" : "aW5zZXJ0",
				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
				"map" : {
					"key" : "value",
					"tckt_id" : tckt_id,
					"lnk_stm_cd" : "300000",  
					"inqr_scr" : "csCar", 
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
			url : getContextPath() + "/ajax/civilservice/insertCarHistory.do",
			data : "pJson=" + encodeURIComponent(JSON.stringify(loParam_car)),
			success : function(data) {
				searchValExist = false;
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	};
}

function csCarSMS_clickEvent(){
	var width = "500";
	var height = "180";
	
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);
	
	window.sessionStorage.setItem("SMS_CD", "csCar");
	
	var newWindow = window.open("", "csSmsSend", "resizable");
	newWindow.resizeTo("500","401");
	newWindow.moveTo(left, top);
	newWindow.focus();
	
	document.csCar_Smsform.target ="csSmsSend"; 
	document.csCar_Smsform.action="/web/civilservice/csSmsSend.do"; 
	document.csCar_Smsform.submit();
}

// 압류일때 금액 "압류" 로 보이도록 포맷 
function fnCarCellFmtter(cellvalue, options, rowObject){
	if(rowObject.압류여부 == "Y" && rowObject.수납일자 == undefined){
		return "압류";
	}else{
		return cellvalue;
	}
}

function initdivCarTab() {
	$("#csCar_BtnHistory").hide(); 
	$("#csCar_btnCarSearch").bind("click", carTabBtnSearch_clickEvent);
	$("#csCar_btnCarInit").bind("click", carTabBtnInit_clickEvent);
	$("#csCar_BtnHistory").bind("click", csCarHistory_clickEvent);
	$("#csCar_btnSMS").bind("click", csCarSMS_clickEvent);
	$("#csCar_tfSrchCitizenNm, #csCar_tfSrchCarNumb").bind("keydown", function(key){ 
		if (key.keyCode == 13) 
			carTabBtnSearch_clickEvent();
	});
	
	var d_frDate = getPrvDay("Y", 5, "-");						
	var d_toDate = getDate();
	datePicker("#csCar_tfSrchFrDate");
	datePicker("#csCar_tfSrchToDate");
	$("#csCar_tfSrchFrDate").val(d_frDate);
	$("#csCar_tfSrchToDate").val(d_toDate);
	
	$("#csCar_tblCarList").jqGrid({ 
		url : getContextPath() + "/jqgrid/civilservice/csCarList.do",
		datatype : "local",
		mtype : "post",
		postData : {
			pJson : getJsonStrCarInfoList()
		},
		jsonReader : {
			repeatitems : false
		},
		colNames : ["차량번호", "성명", "고지일자", "고지금액", "가산금", "감액금", "잔액(미납액)", "압류일자", "고지구분", "위반일시", "위반장소",
					"고지번호", "수납여부", "수납일자", "수납금액", "압류여부", "압류해제일자", "대체차량번호", "가상계좌번호", "부과일자", "소인일자", "납기일자"],
		colModel : [
			{name : "차량번호", index : "차량번호", align : "center", width : 80},
			{name : "성명", index : "성명", align : "center", width : 60},
			{name : "고지일자", index : "고지일자", align : "center", width : 70}, 
			{name : "고지금액", index : "고지금액", align : "center", width : 60, formatter:fnCarCellFmtter},
			{name : "가산금", index : "가산금", align : "center", width : 60, formatter:fnCarCellFmtter}, 
			{name : "감액금", index : "감액금", align : "center", width : 60, formatter:fnCarCellFmtter},
			{name : "미납액", index : "미납액", align : "center", width : 70, formatter:fnCarCellFmtter},
			{name : "압류일자", index : "압류일자", align : "center", width : 70},
			{name : "고지구분", index : "고지구분", align : "center", width : 60},
			{name : "위반일시", index : "위반일시", align : "center", width : 90},
			{name : "위반장소명", index : "위반장소명", align : "center", width : 120},
			
			{name : "고지번호", index : "고지번호", align : "center", width : 80, hidden : true},
			{name : "수납여부", index : "수납여부", align : "center", width : 80, hidden : true}, 
			{name : "수납일자", index : "수납일자", align : "center", width : 80, hidden : true}, 
			{name : "수납금액", index : "수납금액", align : "center", width : 80, hidden : true},
			{name : "압류여부", index : "압류여부", align : "center", width : 80, hidden : true},
			{name : "압류해제일자", index : "압류해제일자", align : "center", width : 80, hidden : true},
			{name : "대체차량번호", index : "대체차량번호", align : "center", width : 80, hidden : true},
			{name : "가상계좌번호", index : "가상계좌번호", align : "center", width : 80, hidden : true},
			{name : "부과일자", index : "부과일자", align : "center", width : 80, hidden : true},
			{name : "소인일자", index : "소인일자", align : "center", width : 80, hidden : true},
			{name : "납기일자", index : "납기일자", align : "center", width : 80, hidden : true},
		],
		sortname : "수납여부 DESC,위반일자",
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
	   	pager : "#csCar_pagingCarList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		$("#csCar_tbl").find("label").text("");
	   		
	   		var rowData = $("#csCar_tblCarList").jqGrid("getRowData", rowid);
	   		
	   		if(rowData.압류여부 == "Y"){
	   			return;
	   		}
	   		
	   		if(rowData.미납액.replace("원","").trim() != "0"){
	   			$("#csCar_btnSMS").show();
	   		}else{
	   			$("#csCar_btnSMS").hide();
	   		}
	   		
//	   		$("#csCar_BtnHistory").show();
	   			
	   		$("#csCar_vmCarNo").html(rowData.차량번호);
	   		$("#csCar_vmName").html(rowData.성명);
	   		$("#csCar_vmDateTime").html(rowData.위반일시);

	   		$("#csCar_vmGojiNo").html(rowData.고지번호);
	   		$("#csCar_vmGojiDate").html(rowData.고지일자);
	   		$("#csCar_vmGojiAmt").html(rowData.고지금액);

	   		$("#csCar_vmAddAmt").html(rowData.가산금);
	   		$("#csCar_vmRpAmt").html(rowData.감액금);
	   		$("#csCar_vmMiAmt").html(rowData.미납액);

	   		$("#csCar_vmSuYn").html(rowData.수납여부);
	   		$("#csCar_vmSuDate").html(rowData.수납일자);
	   		$("#csCar_vmSuAmt").html(rowData.수납금액);

	   		$("#csCar_vmSzDate").html(rowData.압류일자);
	   		$("#csCar_vmHjDate").html(rowData.압류해제일자);
	   		$("#csCar_vmDCarNo").html(rowData.대체차량번호);

	   		$("#csCar_vmGoGb").html(rowData.고지구분);
	   		$("#csCar_vmJanso").html(rowData.위반장소명);
	   		$("#csCar_vmAccount").html(rowData.가상계좌번호);

	   		$("#csCar_vmBuDate").html(rowData.부과일자);
	   		$("#csCar_vmSoDate").html(rowData.소인일자);
	   		$("#csCar_vmNabDate").html(rowData.납기일자);
	   		
	   		//SMS Form
	   		$("#csCar_totMney").val(rowData.미납액);
	   		$("#csCar_account").val(rowData.가상계좌번호);
	   	},
	   	loadComplete : function(data, status, err) {
	   		var ids = $("#csCar_tblCarList").getDataIDs();
			$.each(ids,function(idx, rowId){
				rowData = $("#csCar_tblCarList").getRowData(rowId);
				if(rowData.미납액.replace("원","").trim() != "0"){
					$("#csCar_tblCarList #"+rowId+" td:eq(0)~").css("color","red");
				}
			});
			
			insertObjcarHistory(status, err);
		},
		loadError : function(data, status, err) {
			insertObjcarHistory(status, err);
		}
	}).jqGrid("navGrid", "#csCar_pagingCarList", {edit : false, add : false, del : false, search : false});
}
