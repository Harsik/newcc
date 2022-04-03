var isinitdivWaterTab = false;
var isinitdivTaxTab = false;
var isinitdivCarTab = false;
var isinitdivNonTaxRcptTab = false;
var isinitdivEnvrnImprvTab = false;

var sCurrentTabID = "";
var sCurrentInOutTaxID = "";

var checkIvrCall = false;

$(document).ready(function(){
	$("body").show();
	//datePicker("#cvsvif_selFrDate");
	//datePicker("#cvsvif_selToDate");		
	
	var cvtabs = $("#pop_body").tabs();
	cvtabs.tabs({
		  activate:function (event, ui){
			  var id = ui.newPanel.attr('id');
			  initTabs(id);	
		  }
	});
	
	initTabs("cvsvif_envrnImprvTab");
	
	// IVR검증
	$("#cvsvif_btnIvrCall").bind("click", btnIvrCall_clickEvent); // 미완성
	$("#h1").bind("click", btnIvrCheck_clickEvent);
	$("#devJumin").bind("click", btnDevJumin_clickEvent);
});

function btnIvrCheck_clickEvent(){
	var id = window.sessionStorage.getItem("USR_ID");
	if(id == "sysmanager" || id == "agentest"){
		if(checkIvrCall){
			checkIvrCall = false;
			$("#devJumin").hide();
		}else{
			checkIvrCall = true;
			$("#devJumin").show();
		}
		alert("IvrCheck ::: " + checkIvrCall);
	}
}

function btnDevJumin_clickEvent(){
	var result = prompt("주민번호를 입력하세요.");
	var result2 = prompt("휴대전호번호를 입력하세요.");
	console.log(result+", "+result2);
	
	if(result != ""){
		opener.$("#hidMainSsNumber").val(result);
	}
	if(result2 != ""){
		opener.$("#tfContactInform").val(result2);
	}
	
	if(result == null || result == "") return;		
	
	taxPopupSsNumSet();
	
}

function initTabs(id){
	switch(id){
	case "cvsvif_divWaterTab":
		$("#cvsvif_btnIvrCall").hide();
		if(isinitdivWaterTab == false){ initdivWaterTab(); isinitdivWaterTab=true;}
		break;
	case "cvsvif_divLocalTaxTab":
		$("#cvsvif_btnIvrCall").show();
		if(isinitdivTaxTab == false){ initdivLocalTaxTab(); isinitdivTaxTab=true;}
		break;
	case "cvsvif_divCarTab":
		$("#cvsvif_btnIvrCall").show();
		if(isinitdivCarTab == false){ initdivCarTab(); isinitdivCarTab=true;}
		break;
	case "cvsvif_divNonTaxReceiptTab":
		$("#cvsvif_btnIvrCall").show();
		if(isinitdivNonTaxRcptTab == false){ initdivNonTaxRcptTab(); isinitdivNonTaxRcptTab=true;}
		break;
	case "cvsvif_envrnImprvTab":
		$("#cvsvif_btnIvrCall").show();
		if(isinitdivEnvrnImprvTab == false){ initdivEnvrnImprvTab(); isinitdivEnvrnImprvTab=true;}
		break;
	}
}

function btnIvrCall_clickEvent()
{
	$("#hidTaxSsNumber").val("");
	$("#hidTaxSpNumber").val("");
	
	$("#juminSpan").html("");

	$("#envrnImprvCnt,#localTaxsCnt,#carCnt,#nonTaxReceiptCnt").html("0");
	
	window.opener.fnRequestAgree();
}

function taxPopupinit(){
	console.log("행정정보 팝업 전체 초기화");
	checkIvrCall = false;
	
	$("#hidTaxSsNumber").val("");
	$("#hidTaxSpNumber").val("");
	
	$("#juminSpan").html("");

	$("#localTaxsCnt,#carCnt,#nonTaxReceiptCnt").html("0");
	
//	btnLocalTaxInit_clickEvent(); 	// 지방세 초기화
//	carTabBtnInit_clickEvent();		// 주정차 초기화
//	carTabBtnInit_clickEvent();		// 환경개선부담금 초기화
//	carTabBtnInit_clickEvent();		// 상하수도 초기화
//	carTabBtnInit_clickEvent();		// 세외수입 초기화
	
	
	// 각 그리드 클리어 함수
}

function taxPopupSsNumSet()
{ 
	var mainSsNum= $("#hidMainSsNumber", opener.document).val();
	var mainSphoneNum = $("#tfContactInform", opener.document).val();
	
	if(mainSsNum.length == 12){
		checkIvrCall = false;
		alert("잘못된 주민번호 입니다. 다시 인증 받아주세요. (12자리 입력 되었음)");
		return false;
	}
	
	if(mainSsNum){
		checkIvrCall = true;
		//var ssNum = mainSsNum.substr(0,6)+"-*******";
		$("#hidTaxSsNumber").val(mainSsNum);
		$("#hidTaxSpNumber").val(mainSphoneNum);
		
		var ssNum = mainSsNum.substr(0,6)+" - "+ mainSsNum.substr(6,1) +"******";
		
		$("#juminSpan").html(ssNum);
		
		// 체납+미납 건수 표시
		chenabCheck(mainSsNum);
		
		// 압류여부 체크 (압류 + 수납일자 없을때 상담 문자발신 버튼 제외) 
		seizureCheck(mainSsNum);
	}
}

// 체납+미납 건수 체크
function chenabCheck(mainSsNum){
	// 환경개선부담금
	$.ajax({
		type : "post",
		dataType: "json",
		contentType : "application/json",
		async : true,
		url : "http://172.17.100.101:8880/callAPI",
		data : JSON.stringify({
			"IN_PAGE" : "1",
			"QUERY" : "and OWNR_SID = fc_cmm_enc('"+mainSsNum+"', 'ENV', '1', 'T') and LVY_GBN = 3 and RECPT_YMD is null"
		}),
		success : function(data)
		{
			console.log("환경개선부담금 CNT > " + data.length);
			$("#envrnImprvCnt").html(data.length);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	// 지방세
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/getChenapCnt.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "bG9jYWx0YXgubG9jYWxUYXhzQ250", { "vmJno" : mainSsNum }),
		success : function(data) {
			console.log("지방세 CNT > " + data.CNT);
			$("#localTaxsCnt").html(data.CNT);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 주정차
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/getChenapCnt.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y2FyX2ZpbmUuY2FyQ250", { "vmJno" : mainSsNum }),
		success : function(data) {
			console.log("주정차 CNT > " + data.CNT);
			$("#carCnt").html(data.CNT);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 세외수입
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/getChenapCnt.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "bm9uX3RheC5ub25UYXhSZWNlaXB0Q250", { "vmJno" : mainSsNum }),
		success : function(data) {
			console.log("세외수입 CNT > " + data.CNT);
			$("#nonTaxReceiptCnt").html(data.CNT);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 압류 체크
function seizureCheck(mainSsNum){
	// 환경개선부담금
	$.ajax({
		type : "post",
		dataType: "json",
		contentType : "application/json",
		async : false,
		url : "http://172.17.100.101:8880/callAPI",
		data : JSON.stringify({
			"IN_PAGE" : "1",
			"QUERY" : "and OWNR_SID = fc_cmm_enc('"+mainSsNum+"', 'ENV', '1', 'T') and LVY_GBN = 3 and RECPT_YMD is null and ATMT_YN = 1"
		}),
		success : function(data)
		{
			console.log("환경개선부담금 압류 CNT > " + data.length);
			if(data.length > 0){
				$("#csEnvrnImprv_btnSMS").css( "visibility", "hidden" );
			}else{
				$("#csEnvrnImprv_btnSMS").css( "visibility", "visible" );
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	// 지방세
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/getAbluCnt.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "bG9jYWx0YXgubG9jYWxUYXhzU0NudA==", { "vmJno" : mainSsNum }),
		success : function(data) {
			console.log("지방세 압류 CNT > " + data.CNT);
			if(data.CNT > 0){
				$("#csLocaltax_btnSMS").css( "visibility", "hidden" );
			}else{
				$("#csLocaltax_btnSMS").css( "visibility", "visible" );
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 주정차
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/getAbluCnt.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y2FyX2ZpbmUuY2FyU0NudA==", { "vmJno" : mainSsNum }),
		success : function(data) {
			console.log("주정차 압류 CNT > " + data.CNT);
			if(data.CNT > 0){
				$("#csCar_btnSMS").css( "visibility", "hidden" );
			}else{
				$("#csCar_btnSMS").css( "visibility", "visible" );
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 세외수입
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/getAbluCnt.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "bm9uX3RheC5ub25UYXhSZWNlaXB0U0NudA==", { "vmJno" : mainSsNum }),
		success : function(data) {
			console.log("세외수입 압류 CNT > " + data.CNT);
			if(data.CNT > 0){
				$("#csNonTaxRcpt_btnSMS").css( "visibility", "hidden" );
			}else{
				$("#csNonTaxRcpt_btnSMS").css( "visibility", "visible" );
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 합계 체크박스 공통
function clickCheckBoxSumm(clickId, clickYn, id){
	var totmney= parseInt($("#"+id+"_summ_totMney").html().replaceAll(",",""));
	var junggi = parseInt($("#"+id+"_summ_junggi").html().replaceAll(",",""));
	var chenap = parseInt($("#"+id+"_summ_chenap").html().replaceAll(",",""));

	if(clickId == id+"_chk_junggi"){
		if(clickYn){
			totmney += junggi;
		}else{
			totmney -= junggi;
		}
	}else{
		if(clickYn){
			totmney += chenap;
		}else{
			totmney -= chenap;
		}
	}
	
	$("#"+id+"_totMney").val(changeNumberFormat(String(totmney)));
	$("#"+id+"_summ_totMney").html(changeNumberFormat(String(totmney)));
}

//파라미터 셋팅_CnslList
function getJsonStrCnslList(gridtype)
{
	var custId = "";
	var sndrCntctInfm = "";
	
	if($("#cvsvif_tfCustId").val() != "")
		custId = $("#cvsvif_tfCustId").val();
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY25zbExpc3RNYWlu",
		"map" : {
			"key" : "value",
			"cust_id" : custId,
			"sndr_cntct_infm" : sndrCntctInfm,
			"gridtype" : gridtype
		}
	};
	
	return encodeURIComponent(JSON.stringify(loParam));
}