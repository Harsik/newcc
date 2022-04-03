var enSearchValExist = false;
var enSearchStr;
var enSearchEnd;

var enResNumb;
var enCarNumb;
var b64enResNumb;
var b64enCarNumb;

var tckt_id = "";
if (window.sessionStorage.getItem("tcktId") != null) { 
	tckt_id = window.sessionStorage.getItem("tcktId");
};

function initdivEnvrnImprvTab() {
	$("#csEnvrnImprv_BtnHistory").hide();
	
	$("#csEnvrnImprv_btnSearch").bind("click", envrnImprvTabBtnSearch_clickEvent);
	
	$("#csEnvrnImprv_btnInit").bind("click", envrnImprvTabBtnInit_clickEvent);

	$("#csEnvrnImprv_btnSMS").bind("click", envrnImprvTabBtnSMS_clickEvent);

	$("#csEnvrnImprv_chk_junggi,#csEnvrnImprv_chk_chenap").click( function() {
		clickCheckBoxSumm(this.id, this.checked, "csEnvrnImprv");
	});
	
	$("#csEnvrnImprv_tblCsEnvrnImprvList").jqGrid({
		url : "http://172.17.100.101:8880/callAPI",
		datatype : "local",
		mtype : 'post',
		jsonReader :
		{
			repeatitems: true
		},
		colNames : [
			 "기분", "세목", "고지구분", "차량(시설물)번호", "차랑명(상호)", "납기내일자", "고지금액", "가산금", "납기후일자", "납기후금액", "납부할금액"
			,"소유자명" , "전화번호" , "휴대폰번호", "납부자주소", "배기량(용수량)", "소재지주소", "차종(총면적)", "차대번호(연료량)", "적용기간(적용일수)"
			, "고지차수", "고지금액", "부과징수결의일", "접수일자", "전자납부번호", "수납일자", "납기후일자", "납기후금액"
			, "가상계좌번호", "기존체납금", "송달번지주소1", "송달번지주소2", "송달번지주소3", "압류여부", "송달구분", "송달도로명주소1", "송달도로명주소2", "송달도로명주소3"
		],
		colModel :
		[
			
			{name : "PERD", index : "PERD", align : "center", sortable: false, width : 40, formatter:fnCellFmtter},
			{name : "TAX_CODE", index : "TAX_CODE", align : "center", sortable: false, width : 40, formatter:fnCellFmtter},
			{name : "LVY_GBN", index : "LVY_GBN", align : "center", sortable: false, width : 40, formatter:fnCellFmtter},
			{name : "BEA_MNEY_NO", index : "BEA_MNEY_NO", align : "center", sortable: false, width : 60},
			{name : "CNM", index : "CNM", align : "center", sortable: false, width : 90},
			{name : "PYMNT_DLN_YMD", index : "PYMNT_DLN_YMD", align : "center", sortable: false, width : 50, formatter:fnDateFmtter},
			{name : "LVY_MNEY", index : "LVY_MNEY", align : "center", sortable: false, width : 50, formatter:fnEnvCurrencyFmtter},
			{name : "HAD_MNEY", index : "HAD_MNEY", align : "center", sortable: false, width : 50, formatter:fnEnvCurrencyFmtter},
			{name : "DLVDT_YMD", index : "DLVDT_YMD", align : "center", sortable: false, width : 50, formatter:fnDateFmtter},
			{name : "DLVDT_AMT", index : "DLVDT_AMT", align : "center", sortable: false, width : 50, formatter:fnEnvCurrencyFmtter},
			{name : "TOTAL_MNEY", index : "TOTAL_MNEY", align : "center", sortable: false, width : 50, formatter:fnEnvCurrencyFmtter},
			
			//
			{name : "OWNR_NM", index : "OWNR_NM", align : "center", width : 50, hidden : true},
			{name : "TEL_NO", index : "TEL_NO", align : "center", width : 50, hidden : true},
			{name : "HP_NO", index : "HP_NO", align : "center", width : 50, hidden : true},
			{name : "OWNR_ADDR", index : "OWNR_ADDR", align : "center", width : 50, hidden : true},
			{name : "EXH_QUA", index : "EXH_QUA", align : "center", width : 50, hidden : true, formatter:fnCurrencyFmtter},
			{name : "USE_ADDR", index : "USE_ADDR", align : "center", width : 50, hidden : true},
			{name : "MTR_VEH_SORT", index : "MTR_VEH_SORT", align : "center", width : 50, hidden : true},
			{name : "ENGN_NO", index : "ENGN_NO", align : "center", width : 50, hidden : true},
			{name : "USE_DATE", index : "USE_DATE", align : "center", width : 50, hidden : true, formatter:fnCellFmtter}, // (DAYCNT)
			
			{name : "ANC_CHASU", index : "ANC_CHASU", align : "center", width : 50, hidden : true},
			{name : "LVY_MNEY", index : "LVY_MNEY", align : "center", width : 50, hidden : true, formatter:fnCurrencyFmtter},
			{name : "LVY_YMD", index : "LVY_YMD", align : "center", width : 50, hidden : true, formatter:fnDateFmtter},
			{name : "TAKE_YMD", index : "TAKE_YMD", align : "center", width : 50, hidden : true, formatter:fnDateFmtter},
			{name : "ELEC_NO", index : "ELEC_NO", align : "center", width : 50, hidden : true},
			{name : "RECPT_YMD", index : "RECPT_YMD", align : "center", width : 50, hidden : true, formatter:fnDateFmtter},
			{name : "DLVDT_YMD", index : "DLVDT_YMD", align : "center", width : 50, hidden : true, formatter:fnDateFmtter},
			{name : "DLVDT_AMT", index : "DLVDT_AMT", align : "center", width : 50, hidden : true, formatter:fnCurrencyFmtter},
			
			{name : "ACC_NO", index : "ACC_NO", align : "center", width : 50, hidden : true, formatter:fnCellFmtter},
			{name : "TOTAL_CHENAP", index : "TOTAL_CHENAP", align : "center", width : 50, hidden : true, formatter:fnCurrencyFmtter},
			{name : "SOND_BUNJI_1", index : "SOND_BUNJI_1", align : "center", width : 50, hidden : true},
			{name : "SOND_BUNJI_2", index : "SOND_BUNJI_2", align : "center", width : 50, hidden : true},
			{name : "SOND_BUNJI_3", index : "SOND_BUNJI_3", align : "center", width : 50, hidden : true},
			{name : "ATMT_YN", index : "ATMT_YN", align : "center", width : 50, hidden : true, formatter:fnCellFmtter},
			{name : "SOND_GBN", index : "SOND_GBN", align : "center", width : 50, hidden : true, formatter:fnCellFmtter},
			{name : "SOND_ROAD_1", index : "SOND_ROAD_1", align : "center", width : 50, hidden : true},
			{name : "SOND_ROAD_2", index : "SOND_ROAD_2", align : "center", width : 50, hidden : true},
			{name : "SOND_ROAD_3", index : "SOND_ROAD_3", align : "center", width : 50, hidden : true},
		],
		sortname : "TAKE_YMD",
	   	sortorder : "DESC",
	   	scroll : true,
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
//	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : "10000",
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#csEnvrnImprv_pagingCsEnvrnImprvList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,	
		onSelectRow : function(rowid) 
		{
			$("#csEnvrnImprv_cnNm").html("");
			$("#csEnvrnImprv_tbl").find("label").text("");
			
			var rowData = $("#csEnvrnImprv_tblCsEnvrnImprvList").jqGrid("getRowData", rowid);
			// console.log(rowData);
			
			if(rowData.ATMT_YN == "압류" && rowData.RECPT_YMD == ""){
				return;
			}
			
			$("#csEnvrnImprv_cnNm").html(rowData.OWNR_NM);
				
			$("#csEnvrnImprv_telNo").html(rowData.TEL_NO);
			$("#csEnvrnImprv_hpNo").html(rowData.HP_NO);
			$("#csEnvrnImprv_ownrAddr").html(rowData.OWNR_ADDR);
				
			$("#csEnvrnImprv_beaMneyNo").html(rowData.BEA_MNEY_NO);
			$("#csEnvrnImprv_exhQua").html(rowData.EXH_QUA);
			$("#csEnvrnImprv_useAddr").html(rowData.USE_ADDR);
			
			$("#csEnvrnImprv_cnm").html(rowData.CNM);
			$("#csEnvrnImprv_mtrVehSort").html(rowData.MTR_VEH_SORT);
			$("#csEnvrnImprv_engnNo").html(rowData.ENGN_NO);
			$("#csEnvrnImprv_useDate").html(rowData.USE_DATE);
				
			$("#csEnvrnImprv_taxCode").html(rowData.TAX_CODE);
			$("#csEnvrnImprv_ancChasu").html(rowData.ANC_CHASU);
			$("#csEnvrnImprv_lvyGbn").html(rowData.LVY_GBN);
			$("#csEnvrnImprv_lvyMney").html(rowData.LVY_MNEY);

			$("#csEnvrnImprv_lvyYmd").html(rowData.LVY_YMD);
			$("#csEnvrnImprv_takeYmd").html(rowData.TAKE_YMD);
			$("#csEnvrnImprv_pymntDlnYmd").html(rowData.PYMNT_DLN_YMD);
			$("#csEnvrnImprv_hadMney").html(rowData.HAD_MNEY);

			$("#csEnvrnImprv_elecNo").html(rowData.ELEC_NO);
			$("#csEnvrnImprv_recptYmd").html(rowData.RECPT_YMD);
			$("#csEnvrnImprv_dlvdtYmd").html(rowData.DLVDT_YMD);
			$("#csEnvrnImprv_dlvdtAmt").html(rowData.DLVDY_AMT);

			$("#csEnvrnImprv_accNo").html(rowData.ACC_NO);
			$("#csEnvrnImprv_totalChenap").html(rowData.TOTAL_CHENAP);
			$("#csEnvrnImprv_sondBunji").html(rowData.SOND_BUNJI_1 + rowData.SOND_BUNJI_2 + rowData.SOND_BUNJI_3);

			$("#csEnvrnImprv_atmtYn").html(rowData.ATMT_YN);
			$("#csEnvrnImprv_sondGbn").html(rowData.SOND_GBN);
			$("#csEnvrnImprv_sondRoad").html(rowData.SOND_ROAD_1 + rowData.SOND_ROAD_2 + rowData.SOND_ROAD_3);
		},
		loadComplete : function(data, status, err) {
			console.log("loadComplete");
		}
	}).jqGrid("navGrid", "#csEnvrnImprv_pagingCsEnvrnImprvList", {edit : false, add : false, del : false, search : false});
}

function envrnImprvTabBtnSMS_clickEvent(){
	var width = "500";
	var height = "180";
	
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);
	
	window.sessionStorage.setItem("SMS_CD", "csEnvrnImprv");
	
	var newWindow = window.open("", "csSmsSend", "resizable");
	newWindow.resizeTo("500","401");
	newWindow.moveTo(left, top);
	newWindow.focus();
	
	document.csEnvrnImprv_Smsform.target ="csSmsSend"; 
	document.csEnvrnImprv_Smsform.action="/web/civilservice/csSmsSend.do"; 
	document.csEnvrnImprv_Smsform.submit();
}

function envrnImprvTabBtnInit_clickEvent(){
	$("#csEnvrnImprv_BtnHistory").hide();
	$("#csEnvrnImprv_tblCsEnvrnImprvList").clearGridData();
	$("#csEnvrnImprv_tbl").find("label").text("");
	$("#csEnvrnImprv_tfSrchCarNumb").val("");
	$("#csEnvrnImprv_cnNm").html("");
	
	$("#csEnvrnImprv_chk_chenap,#csEnvrnImprv_chk_junggi").prop("checked", false);
	$("#csEnvrnImprv_summ_junggi,#csEnvrnImprv_summ_chenap,#csEnvrnImprv_summ_totMney").html("");
}

function envrnImprvTabBtnSearch_clickEvent() {
	if (checkIvrCall == false) {
		alert("ARS 인증을 먼저 해주셔야 됩니다.");
		return;
	};
	
	var ownrSid = $("#hidTaxSsNumber").val();
	
	fnEnvrnImprvSummInfo(ownrSid);
	
	$("#csEnvrnImprv_tbl").find("label").text("");
	$("#csEnvrnImprv_tblCsEnvrnImprvList").clearGridData();
	$("#csEnvrnImprv_tblCsEnvrnImprvList").jqGrid("setGridParam", {datatype : "json", postData : getJsonStrEnvrnImprvInfoList(ownrSid), page : 1, sortname : "TAKE_YMD", sortorder : "DESC"});
	
	/*
	// ERROR 415
	$("#csEnvrnImprv_tblCsEnvrnImprvList").trigger("reloadGrid");
	*/
}

// 금액 합계 리스트 
function fnEnvrnImprvSummInfo(ownrSid){
	$("#csEnvrnImprv_chk_chenap,#csEnvrnImprv_chk_junggi").prop("checked", false);
	
	var query = "";
	
	query = "and OWNR_SID = fc_cmm_enc('"+ownrSid+"', 'ENV', '1', 'T') and LVY_GBN != 1 and RECPT_YMD is null"; 
	
	$.ajax({
		type : "post",
		dataType: "json",
		contentType : "application/json",
		async : true,
		url : "http://172.17.100.101:8880/callAPI",
		data : JSON.stringify({
			"IN_PAGE" : "1",
			"QUERY" : query
		}),
		success : function(data)
		{
//			console.log(data);
			
			var junggi = "0";
			var chenap = "0";
			
			for(var i=0; i<data.length; i++){
				if(data[i].LVY_GBN == "2"){
					junggi = data[i].LVY_MNEY;
				}else{
					if(data[i].TOTAL_CHENAP != ""){
						chenap = data[i].TOTAL_CHENAP;
					}
				}
			}
			
			$("#csEnvrnImprv_summ_junggi").html(changeNumberFormat(junggi));
			$("#csEnvrnImprv_summ_chenap").html(changeNumberFormat(chenap));
			$("#csEnvrnImprv_summ_totMney").html("0");
		},
		error : function(data, status, err) 
		{
			alert("환경개선부담금 데이터 가져오기 실패 ::: " + data.responseText);
		}
	});
}

// Grid List
function getJsonStrEnvrnImprvInfoList(ownrSid){
	enResNumb = SHA256(ownrSid);
	enCarNumb = SHA256($("#csEnvrnImprv_tfSrchCarNumb").val());
	b64enResNumb = b64EncodeUnicode(ownrSid);
	b64enCarNumb = b64EncodeUnicode($("#csEnvrnImprv_tfSrchCarNumb").val());
	
	enSearchValExist = true;
	enSearchStr = new Date(); // 검색 시작 순간 Date 정보 세팅
	
	var carNo = $("#csEnvrnImprv_tfSrchCarNumb").val().trim();
	var query = "";
	
	if(ownrSid != ""){ // default
		query = "and OWNR_SID = fc_cmm_enc('"+ownrSid+"', 'ENV', '1', 'T')"; 
		query += " and LVY_GBN != 1"; // 미고지 제외
	}
	
	if(carNo ){
		query += " and BEA_MNEY_NO = '"+carNo+"'";
	}
	
//	console.log("query > " + query);

	$.ajax({
		type : "post",
		dataType: "json",
		contentType : "application/json",
		async : true,
		url : "http://172.17.100.101:8880/callAPI",
		data : JSON.stringify({
			"IN_PAGE" : "1",
			"QUERY" : query
		}),
		success : function(data)
		{
//			console.log(data);
			if(data.length > 0){
				$("#csEnvrnImprv_account").val(fnEnvAccountFmtter(data[0].ACC_NO));
				$("#csEnvrnImprv_custName").val(data[0].OWNR_NM);
				$("#csEnvrnImprv_cnNm").html(data[0].OWNR_NM);
			}
			
			$("#csEnvrnImprv_tblCsEnvrnImprvList")[0].addJSONData(data);
			
			var ids = $("#csEnvrnImprv_tblCsEnvrnImprvList").getDataIDs();
			$.each(ids,function(idx, rowId){
				rowData = $("#csEnvrnImprv_tblCsEnvrnImprvList").getRowData(rowId);
				if(rowData.LVY_MNEY != "0" && rowData.RECPT_YMD == ""){ // 고지금액이 0이 아니고 수납일이 없을때
					$("#csEnvrnImprv_tblCsEnvrnImprvList #"+rowId+" td:eq(0)~").css("color","red");
				}
				if(rowData.PERD.slice(-1) == "0"){ // ex) 0:연납, 1:1분기, 2:2분기
					$("#csEnvrnImprv_tblCsEnvrnImprvList").jqGrid("delRowData", rowId);
				}
			});
			
			// 검색 이력 저장
			insertObjEnvrnImprvHistory();
		},
		error : function(data, status, err) 
		{
			alert("환경개선부담금 데이터 가져오기 실패 ::: " + data.responseText);
			insertObjEnvrnImprvHistory(status, err);
			
			$("#csEnvrnImprv_tblCsEnvrnImprvList").clearGridData();
			$("#csEnvrnImprv_tbl").find("label").text("");
			$("#csEnvrnImprv_cnNm").html("");
		}
	});
}

function insertObjEnvrnImprvHistory(status, err){
	if (enSearchValExist == true) {
		var enSearchEnd = new Date(); // 검색 종료 순간 Date 정보 세팅
		var ans_tm = enSearchEnd.getTime() - enSearchStr.getTime();
		ans_tm = Math.floor(ans_tm/1000);
		
		var inqr_cond = "주민번호:" + enResNumb + ",차량번호:" + enCarNumb;
		var rslt = "주민번호:" + b64enResNumb + ",차량번호:" + b64enCarNumb;
		
		var loParam_envrnImprv = {
				"qt" : "aW5zZXJ0",
				"mi" : "b2gwNTEuaW5zZXJ0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
				"map" : {
					"key" : "value",
					"tckt_id" : tckt_id,
					"lnk_stm_cd" : "500000",  
					"inqr_scr" : "csEnvrnImprv",
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
			url : getContextPath() + "/ajax/civilservice/insertEnvrnImprvHistory.do",
			data : "pJson=" + encodeURIComponent(JSON.stringify(loParam_envrnImprv)),
			success : function(data) {
				enSearchValExist = false;
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	};
}

// 환경개선부담금 농협 계좌 포맷
function fnEnvAccountFmtter(num){
	if(num != null || num != ""){
		return num.slice(0,5) + "-" + num.slice(5,9) + "-" + num.slice(9);
	}else{
		return "";
	}
}

//코드 포맷
function fnCellFmtter(cellvalue, options, rowObject) {
	var index = options.colModel.index;
	
	// 기분
	if(index == "PERD"){
		return cellvalue.slice(0,4) + "-" + cellvalue.slice(-1);
	}
    
	// 세목
	if(index == "TAX_CODE"){
		if(cellvalue == "12595921"){
			return "자동차";
		}else{ //12595922
			return "시설물";
		}
	}
	
	// 고지 구분
	if(index == "LVY_GBN"){
		if(cellvalue == "1"){
			return "미고지";
		}else if(cellvalue == "2"){
			return "고지(미체납)";
		}else{ // 3
			return "체납";
		}
	}
	
	// 적용기간
	if(index == "USE_DATE"){
		cellvalue = cellvalue.split("-");
		return dateFormat(cellvalue[0]) + " ~ " + dateFormat(cellvalue[1]);
	}
	
	// 가상계좌
	if(index == "ACC_NO"){
		return fnEnvAccountFmtter(cellvalue);
	}
	
	// 압류 여부
	if(index == "ATMT_YN"){
		if(cellvalue == "0"){
			return "미압류";
		}else{
			return "압류";
		}
	}
	
	// 송당 구분
	if(index == "SOND_GBN"){
		if(cellvalue == "1"){
			return "우편송달";
		}else if(cellvalue == "2"){
			return "재송달";
		}else if(cellvalue == "3"){
			return "공시송달";
		}else if(cellvalue == "4"){
			return "부과철회";
		}else if(cellvalue == "5"){
			return "직접수령";
		}else if(cellvalue == "6"){
			return "사송";
		}else if(cellvalue == "7"){
			return "이체";
		}else if(cellvalue == "8"){
			return "상계";
		}else if(cellvalue == "9"){
			return "등기송달";
		}else if(cellvalue == "A"){
			return "자동이체";
		}else if(cellvalue == "E"){
			return "전자고지";
		}else if(cellvalue == "X"){
			return "송달제외";
		}else if(cellvalue == "Z"){
			return "기타";
		}else{
			return "기타";
		}
	}
}

// 금액 포맷
function fnEnvCurrencyFmtter(cellvalue, options, rowObject) {
	var index = options.colModel.index;
	
	if(rowObject.ATMT_YN == "1" && rowObject.RECPT_YMD == ""){
		return "압류";
	}
	
	// 고지금액
	if(index == "LVY_MNEY"){
		if(cellvalue == ""){
	    	return "0"
	    }else{
	    	return changeNumberFormat(String(cellvalue));
	    }
	}
	
	// 가산금
	if(index == "HAD_MNEY"){
		if(rowObject.LVY_GBN == "2"){ // 미체납
			return "0";
		}else{
			return changeNumberFormat(String(cellvalue));
		}
	}
	
	// 납기후금액
	if(index == "DLVDT_AMT"){
		if(cellvalue == ""){
	    	return "0"
	    }else{
	    	return changeNumberFormat(String(cellvalue));
	    }
	}
	
	// 납부할금액
	if(index == "TOTAL_MNEY"){
		if(rowObject.LVY_GBN == "3"){ // 체납
			return changeNumberFormat(String(rowObject.DLVDT_AMT));
		}else{
			return changeNumberFormat(String(rowObject.LVY_MNEY));
		}
	}
}

// 날짜 포맷
function fnDateFmtter(cellvalue, options, rowObject){
	return dateFormat(cellvalue);
}