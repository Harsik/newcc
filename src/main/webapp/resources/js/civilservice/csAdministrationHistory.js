$(document).ready(function() {
	if (window.sessionStorage.getItem("eTargetId") == "csNonTaxRcpt_arrTXBtnHistory") {
		getArrTXBtnHistoryList(); 
	} else if (window.sessionStorage.getItem("eTargetId") == "csLocaltax_BtnHistory") {
		getLocaltaxHistoryList();
	} else if (window.sessionStorage.getItem("eTargetId") == "csCar_BtnHistory") {
		getCarBtnHistoryList();
	};
});

function getArrTXBtnHistoryList() {
	var inqr_scr = window.sessionStorage.getItem("inqr_scr").split(",");
	var b64arrTXresNumb = window.sessionStorage.getItem("b64arrTXresNumb");
	var b64arrTXcitizenNM = window.sessionStorage.getItem("b64arrTXcitizenNM");
	var b64arrTXcitizenTelNumb = window.sessionStorage.getItem("b64arrTXcitizenTelNumb");
	
	var xMap = {};
	xMap.tblId = "tblNonTaxRcptHistory";
	xMap.pager = "pagingNonTaxRcptHistory";
	xMap.postData = getJsonStrAdministrationHistoryList(inqr_scr, b64arrTXresNumb, b64arrTXcitizenNM, b64arrTXcitizenTelNumb);
	
	commonTbl_init_grid(xMap);
}

function getLocaltaxHistoryList() {
	var inqr_scr = window.sessionStorage.getItem("inqr_scr").split(",");
	var b64lcTXresNumb = window.sessionStorage.getItem("b64lcTXresNumb");
	var b64lcTXeNapbuNumb = "";
	var b64lcTXcitizenNm = "";
	
	var xMap = {};
	xMap.tblId = "tblNonTaxRcptHistory";
	xMap.pager = "pagingNonTaxRcptHistory";
	xMap.postData = getJsonStrAdministrationHistoryList(inqr_scr, b64lcTXresNumb, b64lcTXeNapbuNumb, b64lcTXcitizenNm);
	
	commonTbl_init_grid(xMap);
}

function getCarBtnHistoryList() {
	var inqr_scr = window.sessionStorage.getItem("inqr_scr").split(",");
	var b64CarResNumb = window.sessionStorage.getItem("b64CarResNumb");
	var b64CarCitizenNm = window.sessionStorage.getItem("b64CarCitizenNm");
	var b64Car_carNumb = window.sessionStorage.getItem("b64Car_carNumb");
	
	var xMap = {};
	xMap.tblId = "tblNonTaxRcptHistory";
	xMap.pager = "pagingNonTaxRcptHistory";
	xMap.postData = getJsonStrAdministrationHistoryList(inqr_scr, b64CarResNumb, b64CarCitizenNm, b64Car_carNumb);
	
	commonTbl_init_grid(xMap);
}

function getJsonStrAdministrationHistoryList(inqr_scr, resNumb, citizenNM, citizenTelNumb) { 
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwNTEuc2VsZWN0QWRtaW5pc3RyYXRpb25IaXN0b3J5",
			"map" : {
				"key" : "value",
				"inqr_scr1" : inqr_scr[0],
				"inqr_scr2" : inqr_scr[1],
				"rslt1" : resNumb,
				"rslt2" : citizenNM,
				"rslt3" : citizenTelNumb
			}
	};
	return  encodeURIComponent(JSON.stringify(loParam));
}

function commonTbl_init_grid(xMap) {
	var customRslt = function(cellValue, options, rowObject) {
		var	srchOpt = new Array();
		var cvMain = cellValue.split(",");
		var cvSub;
		var customRsltValue;
		
		for (var i = 0; i < cvMain.length; i++) { 
			cvSub = cvMain[i].split(":");
			for (var j = 0; j < cvSub.length; j++) {
				srchOpt.push(cvSub[j]);
			};
		};
		
		for (var i = 0; i < srchOpt.length; i++) {
			if (i == 0) {
				customRsltValue = srchOpt[i] + " : ";
			} else if (i != 0 && i%2 == 0) {
				customRsltValue += srchOpt[i] + " : ";
			} else if (i != 0 && i%2 != 0) {
				if (srchOpt[i] != "") {
					srchOpt[i] = b64DecodeUnicode(srchOpt[i]);
					switch (srchOpt[i].replace(/-/gi, "").length) {
					case 13:
						srchOpt[i] = srchOpt[i].slice(0, 6) + " - " + srchOpt[i].slice(6,7) + "******";
						break;
					};
				};
				customRsltValue += srchOpt[i] + "\n"; 
			};
		};
		return customRsltValue;
	};
	
	$("#"+xMap.tblId).jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/csNonTaxRcptHistory.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : xMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [
			"조회ID", "티켓ID", "조회구분", "조회일자", "조회화면명", 
			"조회조건(본)", "응답시간", "결과코드", "조회조건", "조회구분", 
			"사용여부", "생성일자", "상담사ID", "수정일자", "수정사용자ID"
		],
	   	colModel : [
	   		{ name : "INQR_ID", index : "INQR_ID", width : 130, align : "center", hidden : true }, // 조회ID
	   		{ name : "TCKT_ID", index : "TCKT_ID", width : 130, align : "center", hidden : true }, // 티켓ID
	   		{ name : "LNK_STM_CD", index : "LNK_STM_CD", width : 130, align : "center" }, // 조회구분
	   		{ name : "REQ_DTM", index : "REQ_DTM", width : 130, align : "center" }, // 조회일자
	   		{ name : "INQR_SCR", index : "INQR_SCR", width : 130, align : "center", hidden : true }, // 조회화면명
	   		{ name : "INQR_COND", index : "INQR_COND", width : 130, align : "center", hidden : true }, // 조회조건(본)
	   		{ name : "ANS_TM", index : "ANS_TM", width : 130, align : "center", hidden : true }, // 응답시간
	   		{ name : "RSLT_CD", index : "RSLT_CD", width : 130, align : "center", hidden : true }, // 결과코드
	   		{ name : "RSLT", index : "RSLT", width : 130, align : "center", formatter : customRslt, multiLine : true }, // 조회조건
	   		{ name : "RSLT_GB", index : "RSLT_GB", width : 130, align : "center", hidden : true }, // 조회구분
	   		{ name : "USE_YN", index : "USE_YN", width : 130, align : "center", hidden : true }, // 사용여부
	   		{ name : "CRT_DTM", index : "CRT_DTM", width : 130, align : "center", hidden : true }, // 생성일자
	   		{ name : "CRT_USR_ID", index : "CRT_USR_ID", width : 130, align : "center" }, // 상담사ID
	   		{ name : "MOD_DTM", index : "MOD_DTM", width : 130, align : "center", hidden : true }, // 수정일자
	   		{ name : "MOD_USR_ID", index : "MOD_USR_ID", width : 130, align : "center", hidden : true }, // 수정사용자ID
	   	],
	   	sortname : "REQ_DTM",
	   	sortorder : "DESC",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "600",
	    width : "100%",
	    rowNum : 25,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#"+xMap.pager,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	loadComplete : function(data) {
	   		
		}
	}).jqGrid("navGrid", "#"+xMap.pager, {edit : false, add : false, del : false, search : false});
}