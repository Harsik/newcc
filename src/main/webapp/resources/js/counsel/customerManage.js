// 글로벌 변수
var gSelectCust = null;
var gModalFlag = false;
var gCntctInfm = "";
var gCustId = "";

// 조회조건 저장
var g_tfContact = "";
var g_optNm = "";
var g_tfNm = "";
var g_optCustmComp = "";
var g_optCustmType = "";
var g_tfMemo = "";
var g_tfModDtStr = "";
var g_tfModDtEnd = "";

var bOldSMS = false;
var bOldTel = false;
var bOldFAX = false;

var g_popup = "CHILD";
var g_gpopup = "CHILD";

//파라미터 셋팅_getJsonStrCustmList
function getJsonStrCustmList(tfContact, optNm, tfNm, optCustmComp, tfMemo, tfModDtStr, tfModDtEnd, optCustmType)
{	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuY3VzdG1MaXN0", //cm003.custmList
		"map" : {
			"key" : "value",
			"tfContact" : tfContact,
			"optNm" : optNm,
			"tfNm" : tfNm,
			"optCustmComp" : optCustmComp,
			"optCustmType" : optCustmType,
			"tfMemo" : tfMemo,
			"tfModDtStr" : tfModDtStr,
			"tfModDtEnd" : tfModDtEnd,
			"cntct_infm" : gCntctInfm,
			"custId" : window.localStorage.getItem("parentCustId")
		}
	};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrCustmListExcel
function getJsonStrCustmListExcel(tfContact, optNm, tfNm, optCustmComp, tfMemo, tfModDtStr, tfModDtEnd, optCustmType)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuY3VzdG1MaXN0RXhjZWw=",
		"map" : {
			"key" : "value",
			"tfContact" : tfContact,
			"optNm" : optNm,
			"tfNm" : tfNm,
			"optCustmComp" : optCustmComp,
			"optCustmType" : optCustmType,
			"tfMemo" : tfMemo,
			"tfModDtStr" : tfModDtStr,
			"tfModDtEnd" : tfModDtEnd,
			"cntct_infm" : gCntctInfm,
			"sidx" : $("#cstmng_tblCustm").getGridParam("sortname"),
			"sord" : $("#cstmng_tblCustm").getGridParam("sortorder"),
			"title" : "민원인관리" + setDownLoadName(tfModDtStr, tfModDtEnd),
			"colWidth" : [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
			//"colName" : ["CORP_NM", "CUST_NM", "TEL", "MOBILE", "CORP", "FAX", "EMAIL", "CST_TYPE", "CRT_DT", "MOD_DT", "MOD_USR_NM"],
			colName : ["CUST_NM","TEL", "MOBILE", "FAX", "AGES_CD","CST_COMP_NM","INFM_YN","MEMO","CRT_DT", "CRT_USR_NM", "MOD_DT", "MOD_USR_NM"],
			//"colHeader" : ["회사/부서", "민원인명", "일반전화", "핸드폰번호", "사무실번호", "FAX번호", "이메일주소", "민원구분", "등록일", "수정일", "수정자"],
			"colHeader" : ["민원인명", "일반전화", "핸드폰번호", "FAX번호", "연령대","민원성향","수신동의","메모","등록일", "등록자", "수정일", "수정자"],
			"colAlign" : ["left", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrInsertCustmInfo
//파라미터 셋팅_InsertCustInfo
function getJsonStrInsertCustInfo(mode)
{
	var qt = "";
	var mi = "";
	
	if(mode == "insert")
	{
		qt = "aW5zZXJ0";
		mi = "Y20wMDMuaW5zZXJ0Q3VzdEluZm8=";
	}
	else
	{
		qt = "dXBkYXRl";
		mi = "Y20wMDMudXBkYXRlQ3VzdEluZm8=";
	}
	
	var bSMS = $("#cstmng_chkDtSMS").is(":checked");
	var bTel = $("#cstmng_chkDtTel").is(":checked");
	var bFAX = $("#cstmng_chkDtFAX").is(":checked");
	
	var bAgreeChange = false;
	var infmYN = "Y";
	
	if (bSMS != bOldSMS || bOldTel != bTel || bOldFAX != bFAX) {
		bAgreeChange = true;
	}
	
	if (!bSMS && !bTel && !bFAX) {
		infmYN = null;
	} else if(bFAX){
		infmYN = "N";
	}
	 
	var loParam = {
		"qt" : qt,
		"mi" : mi,
		"map" : {
			"key" : "value",
			"cust_id" : gCustId,
			"cust_nm" : $("#cstmng_tfDtCustmNm").val(),
			//"gndr" : $("#cstmng_optDtGndr").val()=="all"?"":$("#cstmng_optDtGndr").val(),
			//"ages_cd" : $("#cstmng_optDtAgesCD").val(),
			"gndr" : "",
			"ages_cd" : "",
			"cust_gb_cd" : $("#cstmng_optDtCustmType").val(),
			"cst_comp" : $("#cstmng_optDtCustmComp").val(),
			"cst_comp2" : $("#cstmng_optDtCustmComp2").val(),
			"celphone_num" : $("#cstmng_tfDtMobile").val().replace(/-|(\s*)/gi, ""),
			"phone_num" : $("#cstmng_tfDtTel").val().replace(/-|(\s*)/gi, ""),
			"fax_no": $("#cstmng_tfDtFax").val().replace(/-|(\s*)/gi, ""),
			"infm_change" : bAgreeChange,
			"infm_yn" : infmYN,
			"memo" : $("#cstmng_tfDtMemo").val()
		}
	};
	//수신여부 
	if($("#cstmng_chkDtAll").is(":checked")) {
		loParam.map.tel_yn = "Y";
		loParam.map.sms_yn = "Y";
	} else {
		if($("#cstmng_chkDtTel").is(":checked")) loParam.map.tel_yn = "Y";
		if($("#cstmng_chkDtSMS").is(":checked")) loParam.map.sms_yn = "Y";
		if($("#cstmng_chkDtFAX").is(":checked")) loParam.map.fax_yn = "Y";
	}
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonStrGetCustInfo
function getJsonStrGetCustInfo(cust_id)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm8=",
		"map" : {
			"key" : "value",
			"cust_id" : cust_id
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonStrDeleteCustInfo
function getJsonStrDeleteCustInfo(cust_id)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDMudXBkYXRlQ3VzdEluZm8=",
		"map" : {
			"key" : "value",
			"cust_id" : cust_id,
			"use_yn" : "N"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_NewCustId
function getJsonStrNewCustId()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMDMuZ2V0Q3VzdElk",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 필드 초기화 이벤트
function custmInit() 
{
	$("#cstmng_tblCustm").jqGrid("clearGridData");
	
    	$("#cstmng_searchOneYear").prop("checked",false);
	$("#cstmng_tfModDtStr").attr("disabled",true);
	$("#cstmng_tfModDtEnd").attr("disabled",true);
	$("#cstmng_eventPrevent").css("pointer-events", "none");
	gSelectCust = null;
	$(".tfCntct").prop("disabled", true);
	
	$("#cstmng_tfContact").val("");
	$("#cstmng_optNm").val("custmNm");
	$("#cstmng_optContact").val("tel");
	$("#cstmng_tfNm").val("");
	$("#cstmng_tfMemo").val("");
	$("#cstmng_tfModDtStr").val("");
	$("#cstmng_tfModDtEnd").val("");
	
	$("#cstmng_tfDtCorpNm").val("");
	$("#cstmng_tfDtCustmNm").val("민원인");
	$("#cstmng_tfDtMemo").val("");
	
	$("#cstmng_txtCrt").html("");
	$("#cstmng_txtMod").html("");
	$("#cstmng_tfDtTel").val("");
	$("#cstmng_tfDtMobile").val("");
	$("#cstmng_tfDtCorp").val("");
	$("#cstmng_tfDtEmail").val("");
	$("#cstmng_tfDtFax").val("");
	$("#cstmng_tfDtFarmNo").val("");
	$("#cstmng_tfDtAddrNo").val("");

	$("#cstmng_dtPersonAgrmnt").html("");
	$("#cstmng_dtPosAgrmnt").html("");
	
	$("#cstmng_dtCrtDtm").html("");
	$("#cstmng_dtModDtm").html("");
	
	bOldSMS = false;
	bOldTel = false;
	bOldFAX = false;
	
	$("#cstmng_chkDtAll, #cstmng_chkDtTel, #cstmng_chkDtSMS, #cstmng_chkDtFAX").prop("checked", false);
	
	var obj = window.dialogArguments;
	if(obj=="modal"){
	 // 셀렉트박스 동적으로 받아오기
	    setSelectBoxWithCode2("cstmng_optDtCustmType", "", "90043",g_popup,"", "");
	    setSelectBoxWithCode2("cstmng_optDtCustmComp", "", "90048",g_popup,"", "");
		//setObjSelectBoxWithCode("optDtGndr", "미선택", "",g_popup,"90045", "");
	    setSelectBoxWithCode2("cstmng_optDtCustmComp2", "미선택", "90901",g_popup,"","");

	    setSelectBoxWithCode2("cstmng_optCustmType", "전체","90043" ,g_popup,"", "all");
	    setSelectBoxWithCode2("cstmng_optCustmComp", "전체","90048",g_popup, "", "all");
		//setObjSelectBoxWithCode("optDtAgesCD", "", "",g_popup,"90902", "99"); //연령대
	}else{
	    // 셀렉트박스 동적으로 받아오기
		setObjSelectBoxWithCode("cstmng_optDtCustmType", "", "",g_popup,"90043", "");
		setObjSelectBoxWithCode("cstmng_optDtCustmComp", "", "",g_popup,"90048", "");
		//setObjSelectBoxWithCode("optDtGndr", "미선택", "",g_popup,"90045", "");
		setObjSelectBoxWithCode("cstmng_optDtCustmComp2", "미선택", "",g_popup,"90901", "");

		setObjSelectBoxWithCode("cstmng_optCustmType", "전체", "",g_popup,"90043", "all");
		setObjSelectBoxWithCode("cstmng_optCustmComp", "전체", "",g_popup,"90048", "all");
		//setObjSelectBoxWithCode("optDtAgesCD", "", "",g_popup,"90902", "99"); //연령대
	}
	
	
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		$("#cstmng_optDtCustComp").prop("disabled", true);
		$("#cstmng_tfDtMemo").prop("disabled", true);
	} else {
		$("#cstmng_optDtCustComp").prop("disabled", false);
		$("#cstmng_tfDtMemo").prop("disabled", false);
	}
	
	$("#cstmng_optDtCustmComp2").prop("disabled", true);
	
	$("#cstmng_optDtCustmComp").bind("change", function(e) 
	{
		var code = $("#cstmng_optDtCustmComp").val();
		
		if (code != "010000" && code != "020000") 
		{
			$("#cstmng_optDtCustmComp2").prop("disabled", false);
		} else {
			$("#cstmng_optDtCustmComp2").prop("disabled", false);
			$("#cstmng_optDtCustmComp2").val("all");
			$("#cstmng_optDtCustmComp2").prop("disabled", true);
		}
	});
	
	g_tfContact = "";
	g_optNm = "";
	g_tfNm = "";
	g_optCustmComp = "";
	g_optCustmType = "";
	g_tfMemo = "";
	g_tfModDtStr = "";
	g_tfModDtEnd = "";
	g_optCustmType = "";
	gCustId = "";
}

function custmSpecInit()
{
	gSelectCust = null;
	
	$("#cstmng_tfDtCorpNm").val("");
	$("#cstmng_tfDtCustmNm").val("");
	$("#cstmng_tfDtMemo").val("");
	$("#cstmng_txtCrt").html("");
	$("#cstmng_txtMod").html("");
	$("#cstmng_tfDtTel").val("");
	$("#cstmng_tfDtMobile").val("");
	$("#cstmng_tfDtCorp").val("");
	$("#cstmng_tfDtEmail").val("");
	$("#cstmng_tfDtFax").val("");
	$("#cstmng_tfDtFarmNo").val("");
	$("#cstmng_tfDtAddrNo").val("");
	
	$("#cstmng_chkDtTel, #cstmng_chkDtSMS, #cstmng_chkDtFAX, #cstmng_chkDtAll").prop("checked", false);
	
	bOldSMS = false;
	bOldTel = false;
	bOldFAX = false;
	
	setSelectBoxWithCode("cstmng_optDtCustmType","","90043", "", "", "");
	setSelectBoxWithCode("cstmng_optDtCustmComp","","90048", "", "", "");
	setSelectBoxWithCode("cstmng_optDtCustmComp2","미선택","90901", "", "", "");
	//setSelectBoxWithCode("optDtGndr","미선택","90045", "", "", "");
}

// 조회 버튼 클릭 이벤트
function btnCustmSrch_clickEvent()
{
	gCntctInfm = "";
	
	var tfContact = $("#cstmng_tfContact").val().replace(/-/gi,""),
	optNm = $("#cstmng_optNm").val(),
	tfNm = $("#cstmng_tfNm").val(),
	optCustmComp = $("#cstmng_optCustmComp").val(),
	tfMemo = $("#cstmng_tfMemo").val(),
	tfModDtStr = $("#cstmng_tfModDtStr").val().replace(/-/g,""),
	tfModDtEnd = $("#cstmng_tfModDtEnd").val().replace(/-/g,""),
	optCustmType = $("#cstmng_optCustmType").val();
	
	if(tfNm == "")
		optNm = "";
	
	// 엑셀저장을 위한 조회조건 저장
	g_tfContact = tfContact;
	g_optNm = optNm;
	g_tfNm = tfNm;
	g_optCustmComp = optCustmComp;
	g_optCustmType = optCustmType;
	g_tfMemo = tfMemo;
	g_tfModDtStr = tfModDtStr;
	g_tfModDtEnd = tfModDtEnd;
	g_optCustmType = optCustmType;
	
	if(!g_tfContact && !g_tfNm && !g_tfMemo && !g_tfModDtStr && !g_tfModDtEnd){
	    $("#cstmng_searchOneYear").prop("checked",true);
	    $("#cstmng_tfModDtStr").attr("disabled",false);
	    $("#cstmng_tfModDtEnd").attr("disabled",false);

	    $("#cstmng_eventPrevent").css("pointer-events", "auto");
	    //excel
	    g_tfModDtStr = getPrvDay("M","3","-").replace(/-/gi,"");
	    g_tfModDtEnd = getDate().replace(/-/gi,"");
	    //search
	    tfModDtStr = getPrvDay("M","3","-").replace(/-/gi,"");
	    tfModDtEnd = getDate().replace(/-/gi,"");
	    
	    $("#cstmng_tfModDtStr").val(getPrvDay("M","3","-"));
	    $("#cstmng_tfModDtEnd").val(getDate());
	    
	    alert("최근 3개월 내 민원인을 검색합니다.\n");
	}

	
	$("#cstmng_tblCustm").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmList( tfContact, optNm, tfNm, optCustmComp, tfMemo, tfModDtStr, tfModDtEnd, optCustmType) }, page : 1, sortname : "CUST_NM", sortorder : "asc" })
	.trigger("reloadGrid");
}


function searchOneYear_clickEvent(e) {
    if($("#cstmng_searchOneYear").prop("checked")){
	$("#cstmng_eventPrevent").css("pointer-events", "auto");
	$("#cstmng_tfModDtStr").attr("disabled",false);
	$("#cstmng_tfModDtEnd").attr("disabled",false);
    }else{
	$("#cstmng_eventPrevent").css("pointer-events", "none");
	$("#cstmng_tfModDtStr").attr("disabled",true);
	$("#cstmng_tfModDtEnd").attr("disabled",true);
	$("#cstmng_tfModDtStr").val("");
	$("#cstmng_tfModDtEnd").val("");
    }
}



// 민원인 데이터 추가 이벤트
function btnCustmIns_clickEvent()
{
	if($("#cstmng_tfDtMobile").val() == "" && $("#cstmng_tfDtTel").val() == "") 
	{
		alert("핸드폰, 사무실, 집 중 하나 이상의 연락정보가 필요합니다.");
		return;
	}

	if($("#cstmng_tfDtCustmNm").val() == "") 
	{
		alert("민원인명을 넣어주세요");
		return;
	}
	
	if(confirm("저장 하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/management/newCustId.do",
			data : "pJson=" + getJsonStrNewCustId(),
			success : function(data)
			{
				gCustId = data.CUST_ID;
				
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/main/insertCustInfo.do",
					data : "pJson=" + getJsonStrInsertCustInfo("insert"),
					success : function(data)
					{
						alert("민원인정보가 저장되었습니다.");
						
						custmSpecInit();
						
						$("#cstmng_tblCustm").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmList( g_tfContact, g_optNm, g_tfNm, g_optCustmComp, g_tfMemo, g_tfModDtStr, g_tfModDtEnd, g_optCustmType) } })
						.trigger("reloadGrid");
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 민원인 데이터 수정 이벤트
function btnCustmMod_clickEvent()
{
	if($("#cstmng_tfDtMobile").val() == "" && $("#cstmng_tfDtTel").val() == "") 
	{
		alert("핸드폰, 사무실, 집 중 하나 이상의 연락정보가 필요합니다.");
		return;
	}
	else {
		if($("#cstmng_tfDtCustmNm").val() == "") 
		{
			alert("민원인명을 넣어주세요");
			return;
		}
		else {
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/insertCustInfo.do",
				data : "pJson=" + getJsonStrInsertCustInfo("update"),
				success : function(data)
				{
					alert("민원인정보가 저장되었습니다.");
					
					custmSpecInit();
					
					$("#cstmng_tblCustm").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmList( g_tfContact, g_optNm, g_tfNm, g_optCustmComp, g_tfMemo, g_tfModDtStr, g_tfModDtEnd, g_optCustmType) } })
					.trigger("reloadGrid");
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
	}


}

// 민원인 데이터 삭제 이벤트
function btnCustmDlt_clickEvent()
{
	if(confirm("삭제 하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/management/deleteCustInfo.do",
			data : "pJson=" + getJsonStrDeleteCustInfo(gSelectCust.CUST_ID),
			success : function(data)
			{
				if(data != 0)
				{
					alert("삭제되었습니다.");
					
					custmSpecInit();
					
					$("#cstmng_tblCustm").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmList( g_tfContact, g_optNm, g_tfNm, g_optCustmComp, g_tfMemo, g_tfModDtStr, g_tfModDtEnd, g_optCustmType) } })
					.trigger("reloadGrid");
				}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 엑셀저장 버튼 클릭 이벤트
function btnExelSave_clickEvent()
{	
	excelDownLoad(getContextPath() + "/excel/counsel/cusomerManage.do", getJsonStrCustmListExcel(g_tfContact, g_optNm, g_tfNm, g_optCustmComp, g_tfMemo, g_tfModDtStr, g_tfModDtEnd, g_optCustmType));
}

//민원인 선택 버튼 클릭 이벤트
function btnSelection_clickEvent()
{
//	if(window.dialogArguments != null && window.dialogArguments != "")
//	{
//		window.returnValue = gSelectCust.CUST_ID;
//		window.close();
//	}
	if(g_gpopup=="PCHILD"){	
		window.opener.setCustInfo("",gSelectCust.CUST_ID);
		//window.opener.setCustInfo(gSelectCust.CUST_ID);  
		window.close();
	}
	else
	{
		if(window.sessionStorage.getItem("setCustInfoType") != "popup")
		{
			opener.parent.setCustInfo("", gSelectCust.CUST_ID);
			//opener.parent.setCustInfo(gSelectCust.CUST_ID);
			self.close();
		}
		else
		{
			opener.parent.setCustPopInfo(gSelectCust.CUST_ID);
			self.close();
		}
	}
}

function init()
{
	g_gpopup =$("#cstmng_tfPopUp").val();
	g_popup = g_gpopup=="PCHILD"?"GCHILD":"CHILD";
console.log("custManager:"+g_popup);
	

	$("#cstmng_btnCustmDlt").hide();
	$("#cstmng_btnCustmMod").hide();
	$("#cstmng_btnCustmIns").show();
	$("#cstmng_btnSelection").hide();
	$(".tfCntct").prop("disabled", true);
	
	// 수정일 달력 사용
	datePicker("#cstmng_tfModDtStr");
	datePicker("#cstmng_tfModDtEnd");
	
	custmInit();
	
	//btnCustmSrch_clickEvent();
}

$(document).ready(function()
{
	init();
	
	
	if(window.sessionStorage.getItem("USR_GRD_CD") < 030100){
	   $("#cstmng_btnExelSave").css("display","none"); 
	}
	
	var paramSrchNm = "";	
	var paramSrchPhnnum = ""
	
	// 전화가 왔을 때 해당 전화번호를 가진 민원인이 두명이상이거나 민원인검색버튼 클릭 시
	if(window.sessionStorage.getItem("setCustInfoPopupType") != "")
	{
		gModalFlag = true;
		
		if(window.sessionStorage.getItem("setCustInfoPopupType") != "modal")
		{
			gCntctInfm = window.sessionStorage.getItem("setCustInfoPopupType");
			$("#cstmng_tfContact").val(g_tfContact);
		}
		else
		{
			paramSrchNm = window.sessionStorage.getItem("setCustInfoPopupSearchNm");
			paramSrchPhnnum = window.sessionStorage.getItem("setCustInfoPopupSearchPhnNum");
			
			if (paramSrchPhnnum != "" || paramSrchPhnnum != null)
			{
				g_tfContact = paramSrchPhnnum.replace(/-/gi, "");
				g_tfNm = "";
				$("#cstmng_tfContact").val(paramSrchPhnnum);
			}
			 else if (paramSrchNm != "")
			{
				g_tfNm = paramSrchNm;
				$("#cstmng_tfNm").val(paramSrchNm);
			}

		}
	}
	
	var custId = window.localStorage.getItem("parentCustId"); 
		
	$("#cstmng_tblCustm").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/customerManage.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			//pJson : (paramSrchNm != "" || gCntctInfm != "" || (custId != "" && custId != null)) ? getJsonStrCustmList("", "", paramSrchNm, "", "", "", "") : getJsonStrCustmList("", "", "홍길동", "", "", "", "")
			pJson : g_tfContact != "" ? getJsonStrCustmList(g_tfContact, "", "", "", "", "", "") : ((paramSrchNm != "" || gCntctInfm != "" || (custId != "" && custId != null)) ? getJsonStrCustmList("", "", paramSrchNm, "", "", "", "") :  getJsonStrCustmList("", "", "홍길동", "", "", "20180101", "20180101", "") )
//						function getJsonStrCustmList(tfContact, optNm, tfNm, optCustmComp, tfMemo, tfModDtStr, tfModDtEnd, optCustmType)

		},
		jsonReader :
		{
			repeatitems: false
		},
		//colNames : [ "회사/부서", "민원인명", "집전화번호", "핸드폰번호", "사무실번호", "FAX번호", "이메일주소", "민원구분", "등록일", "수정일", "수정자", "민원인ID"],
		colNames : ["민원인", "핸드폰번호", "전화번호", "팩스번호", "성별", "연령대", "민원성향코드", "민원성향", "위치동의", "메모", "수신동의", "등록일", "등록자", "수정일", "수정자", "민원인ID"],
		colModel : 
		[
			//{ name : "CORP_NM", index : "CORP_NM", width : "200" },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : "100" },
			{ name : "MOBILE", index : "MOBILE", align : "center", width : "105" },
			{ name : "TEL", index : "TEL", align : "center", width : "105" },
			{ name : "FAX", index : "FAX", align : "center", width : "105" },
			{ name : "GNDRNM", index : "GNDRNM", hidden : true},
			{ name : "AGES_CD", index : "AGES_CD", hidden : true},
			{ name : "CST_COMP_CD", index : "CST_COMP_CD", hidden : true},
			{ name : "CST_COMP", index : "CST_COMP", width : "100", align : "center"},
			{ name : "LOC_YN", index : "LOC_YN", hidden : true},
			{ name : "MEMO", index : "MEMO", width : "150", align : "center"},
			{ name : "INFOAGREE", index : "INFOAGREE", width : "100", align : "center"},
			{ name : "CRT_DT", index : "CRT_DT", width : "100", align : "center"},	
			{ name : "CRT_USR_NM", index : "CRT_USR_NM", hidden : true },
			{ name : "MOD_DT", index : "MOD_DT", width : "100", align : "center" },
			{ name : "MOD_USR_NM", index : "MOD_USR_NM", align : "center", width : "100" },
			{ name : "CUST_ID", index : "CUST_ID", hidden : true },
		],
		sortname : "CUST_NM",
		sortorder : "asc",
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
	   	pager : "#cstmng_innerCustm",
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onSelectRow : function(rowid)
		{
			$(".tfCntct").prop("disabled", false);
			
			$("#cstmng_tfDtTel").val("");
			$("#cstmng_tfDtMobile").val("");
			$("#cstmng_tfDtCorp").val("");
			$("#cstmng_tfDtEmail").val("");
			$("#cstmng_tfDtFax").val("");
			$("#cstmng_tfDtFarmNo").val("");
			$("#cstmng_tfDtAddrNo").val("");
			$("#cstmng_chkDtTel").prop("checked", false);
			$("#cstmng_chkDtSMS").prop("checked", false);
			$("#cstmng_chkDtFAX").prop("checked", false);
			$("#cstmng_chkDtAll").prop("checked", false);
			
			$("#cstmng_dtPersonAgrmnt").html("");
			$("#cstmng_dtPosAgrmnt").html("");
			
			gSelectCust = $("#cstmng_tblCustm").getRowData(rowid);
			gCustId = gSelectCust.CUST_ID;
			
			$("#cstmng_btnCustmDlt").show();
			$("#cstmng_btnCustmMod").show();
			$("#cstmng_btnCustmIns").hide();
			
			// 모달로 띄웠을 때만 버튼 표시
			if(gModalFlag)
				$("#cstmng_btnSelection").show();
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/counsel/getCustInfo.do",
				data : "pJson=" + getJsonStrGetCustInfo(gSelectCust.CUST_ID),
				success : function(data)
				{
					//$("#cstmng_tfDtCorpNm").val(data[0].CORP_NM);
					$("#cstmng_tfDtCustmNm").val(data[0].CUST_NM);
					$("#cstmng_tfDtMemo").val(data[0].MEMO);
					$("#cstmng_optDtCustmComp").val(data[0].CST_COMP).trigger("change");
					var comp2 ="";
						if(!data[0].CST_COMP2){
							comp2="all";
						}else {
							comp2=data[0].CST_COMP2;
						}
					$("#cstmng_optDtCustmComp2").val(comp2);
					$("#cstmng_optDtCustmType").val(data[0].CUST_GB_CD);
					//$("#cstmng_optDtGndr").val(data[0].GNDR);
					$("#cstmng_txtCrt").html((data[0].CRT_USR_NM == null ? "" : data[0].CRT_USR_NM) + " / " + dateFormat(data[0].CRT_DT) );
					$("#cstmng_txtMod").html((data[0].MOD_USR_NM == null ? "" : data[0].MOD_USR_NM) + " / " + dateFormat(data[0].MOD_DT) );
					$("#cstmng_tfDtMobile").val(getPhoneNumFormat(data[0].CELL_NUM));
					
					if (data[0].INFM_DTM) {
						$("#cstmng_dtPersonAgrmnt").html("확인일시 : " + fnConvertDateFormat(data[0].INFM_DTM));
						
						if (data[0].SMS_YN == 'Y') {
							$("#cstmng_chkDtSMS").prop("checked", true);
							bOldSMS = true;
						} else {
							$("#cstmng_chkDtSMS").prop("checked", false);
							bOldSMS = false;
						}					
						
						if (data[0].TEL_YN == 'Y') {
							$("#cstmng_chkDtTel").prop("checked", true);
							bOldTel = true;
						} else {
							$("#cstmng_chkDtTel").prop("checked", false);
							bOldTel = false;
						}
						
						if (data[0].FAX_YN == 'Y') {
							$("#cstmng_chkDtFAX").prop("checked", true);
							bOldFAX = true;
						} else {
							$("#cstmng_chkDtFAX").prop("checked", false);
							bOldFAX = false;
						}
						
						if ((data[0].SMS_YN == 'Y') && (data[0].TEL_YN == 'Y') && (data[0].FAX_YN == 'Y')) {
							$("#cstmng_chkDtAll").prop("checked", true);
						} else {
							$("#cstmng_chkDtAll").prop("checked", false);
						}						
					} else {
						$("#cstmng_dtPersonAgrmnt").html("");
					}
					
					if (data[0].LOC_DTM != undefined && data[0].LOC_YN=='Y') {
						$("#cstmng_dtPosAgrmnt").html("동의일시 : " + data[0].LOC_DTM);
					}
					
					
//					if(data[0].AGES_CD != null){
//						$("#cstmng_optDtAgesCD").val(data[0].AGES_CD);
//					}
					
 					$("#cstmng_dtCrtDtm").html( data[0].CRT_DTM+" / " + data[0].CRT_USR_NM);
					$("#cstmng_dtModDtm").html( data[0].MOD_DTM+" / " + data[0].MOD_USR_NM);
					
					//$("#cstmng_tfDtCorp").val(getPhoneNumFormat(data[0].CORPPHONE_NUM));
					//$("#cstmng_tfDtEmail").val(data[0].EMAIL_ADDR);
					$("#cstmng_tfDtFax").val(getPhoneNumFormat(data[0].FAX_NUM));
					$("#cstmng_tfDtTel").val(getPhoneNumFormat(data[0].PHONE_NUM));
					$("#cstmng_tfDtMobile").val(getPhoneNumFormat(data[0].CELL_NUM));
					//$("#cstmng_tfDtFarmNo").val(data[0].FARM_NO);
					//$("#cstmng_tfDtAddrNo").val(data[0].ADDR_NO);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		},
		ondblClickRow : function(rowid)
	   	{
	   		var row = $("#cstmng_tblCustm").getRowData(rowid);
	   		
	   		if(gModalFlag)
	   		{
	   			if(window.dialogArguments != null && window.dialogArguments != "")
	   			{
	   				window.returnValue = row.CUST_ID;
	   				window.close();
	   			}
	   			else
	   			{
	   				var custInfoType=window.sessionStorage.getItem("setCustInfoType") ;
	   				if( custInfoType != "popup")
	   				{
	   					if(custInfoType == "DUPSEL"){
	   						opener.parent.setDupCustInfo(row.CUST_ID);
	   					}else{
	   						opener.parent.setCustInfo("", row.CUST_ID);
	   					}
	   					
	   					self.close();
	   				}else{
	   					opener.parent.setCustPopInfo(row.CUST_ID);
	   					self.close();
	   				}
	   			}
	   		}
	   	},
		gridComplete : function()
		{
			var rowIdArr = $("#cstmng_tblCustm").getDataIDs();
			
			for(var i = 0; i < rowIdArr.length; i++)
			{
				$("#cstmng_tblCustm").setCell(rowIdArr[i], "TEL", getPhoneNumFormat($("#cstmng_tblCustm").getRowData(rowIdArr[i]).TEL));
				$("#cstmng_tblCustm").setCell(rowIdArr[i], "MOBILE", getPhoneNumFormat($("#cstmng_tblCustm").getRowData(rowIdArr[i]).MOBILE));
				$("#cstmng_tblCustm").setCell(rowIdArr[i], "CORP", getPhoneNumFormat($("#cstmng_tblCustm").getRowData(rowIdArr[i]).CORP));
				$("#cstmng_tblCustm").setCell(rowIdArr[i], "FAX", getPhoneNumFormat($("#cstmng_tblCustm").getRowData(rowIdArr[i]).FAX));
				
				
				var rowData = $("#cstmng_tblCustm").getRowData(rowIdArr[i]);
				if(rowData.CST_COMP_CD=="030000" || rowData.CST_COMP_CD=="040000"){
					//악성고객 색상			 
					$("#cstmng_tblCustm").setRowData(rowIdArr[i],false,{background:"#ffb3b3"});
				}
			}
			
		}
	}).jqGrid("navGrid", "#cstmng_innerCustm", {edit : false, add : false, del : false, search : false});
		
	if(custId != "")
	{
		var parentCustId = custId;
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/getCustInfo.do",
			data : "pJson=" + getJsonStrGetCustInfo(parentCustId),
			success : function(data)
			{
				$("#cstmng_tfDtCorpNm").val(data[0].CORP_NM);
				$("#cstmng_tfDtCustmNm").val(data[0].CUST_NM);
				$("#cstmng_tfDtMemo").val(data[0].MEMO);
				$("#cstmng_optDtCustmComp").val(data[0].CST_COMP);
				$("#cstmng_optDtCustmType").val(data[0].CUST_GB_CD);
				//$("#cstmng_optDtGndr").val(data[0].GNDR);
				$("#cstmng_txtCrt").html((data[0].CRT_USR_NM == null ? "" : data[0].CRT_USR_NM) + " / " + dateFormat(data[0].CRT_DT) );
				$("#cstmng_txtMod").html((data[0].MOD_USR_NM == null ? "" : data[0].MOD_USR_NM) + " / " + dateFormat(data[0].MOD_DT) );
				$("#cstmng_tfDtMobile").val(getPhoneNumFormat(data[0].CELL_NUM));
				$("#cstmng_tfDtCorp").val(getPhoneNumFormat(data[0].CORPPHONE_NUM));
				$("#cstmng_tfDtEmail").val(data[0].EMAIL_ADDR);
				$("#cstmng_tfDtFax").val(getPhoneNumFormat(data[0].FAX_NUM));
				$("#cstmng_tfDtTel").val(getPhoneNumFormat(data[0].PHONE_NUM));
				$("#cstmng_tfDtFarmNo").val(data[0].FARM_NO);
				$("#cstmng_tfDtAddrNo").val(data[0].ADDR_NO);
				
				if (data[0].INFM_DT_FORMAT != undefined && data[0].INFM_YN=='Y') {
						$("#cstmng_dtPersonAgrmnt").html("확인일시 : " + data[0].INFM_DT_FORMAT + ' ' + data[0].INFM_TM_FORMAT);
						
						if (data[0].SMS_YN == 'Y') {
							$("#cstmng_chkDtSMS").prop("checked", true);
							bOldSMS = true;
						} else {
							$("#cstmng_chkDtSMS").prop("checked", false);
							bOldSMS = false;
						}					
						
						if (data[0].TEL_YN == 'Y') {
							$("#cstmng_chkDtTel").prop("checked", true);
							bOldTel = true;
						} else {
							$("#cstmng_chkDtTel").prop("checked", false);
							bOldTel = false;
						}
						
						if (data[0].FAX_YN == 'Y') {
							$("#cstmng_chkDtFAX").prop("checked", true);
							bOldFAX = true;
						} else {
							$("#cstmng_chkDtFAX").prop("checked", false);
							bOldFAX = false;
						}
						
						if ((data[0].SMS_YN == 'Y') && (data[0].TEL_YN == 'Y') && (data[0].FAX_YN == 'Y')) {
							$("#cstmng_chkDtAll").prop("checked", true);
						} else {
							$("#cstmng_chkDtAll").prop("checked", false);
						}						
					} else {
						$("#cstmng_dtPersonAgrmnt").html("");
					}
					
					if (data[0].LOC_DTM != undefined && data[0].LOC_YN=='Y') {
						$("#cstmng_dtPosAgrmnt").html("동의일시 : " + data[0].LOC_DTM);
					}

//					if(data[0].AGES_CD != null){
//						$("#cstmng_optDtAgesCD").val(data[0].AGES_CD);
//					}
					 
					$("#cstmng_dtCrtDtm").html( data[0].CRT_DTM+" / " + data[0].CRT_USR_NM);
					$("#cstmng_dtModDtm").html( data[0].MOD_DTM+" / " + data[0].MOD_USR_NM);

			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	
	// 체크박스 체크 이벤트
	$("#cstmng_searchOneYear").bind("click", searchOneYear_clickEvent);
	
	// 조회버튼 클릭 이벤트 등록
	$("#cstmng_btnCustmSrch").bind("click", btnCustmSrch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#cstmng_btnCustmInit").bind("click", init);
	
	// 검색어 엔터 키 이벤트 등록
	$(".keyDown").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			btnCustmSrch_clickEvent();
	});
	
	// 민원인 데이터 추가 버튼 클릭 이벤트 등록
	$("#cstmng_btnCustmIns").bind("click", btnCustmIns_clickEvent);
	
	// 민원인 데이터 수정 버튼 클릭 이벤트 등록
	$("#cstmng_btnCustmMod").bind("click", btnCustmMod_clickEvent);
	
	//민원인 데이터 삭제 버튼 클릭 이벤트 등록
	$("#cstmng_btnCustmDlt").bind("click", btnCustmDlt_clickEvent);
	
	// 선택 버튼 클릭 이벤트 등록
	$("#cstmng_btnSelection").bind("click", btnSelection_clickEvent);
	
	// 엑셀저장 버튼 클릭 이벤트 등록
	$("#cstmng_btnExelSave").bind("click", btnExelSave_clickEvent);
	
	//수신동의 체크 이벤트
	$("#cstmng_chkDtTel, #cstmng_chkDtSMS").on("change", function(e) {
		var tel = $("#cstmng_chkDtTel").is(":checked");
		var sms = $("#cstmng_chkDtSMS").is(":checked");
		
		$("#cstmng_chkDtFAX").prop('checked', false);
		
		if(tel && sms) {
			$("#cstmng_chkDtAll").prop("checked", true);
		} else {
			$("#cstmng_chkDtAll").prop("checked", false);
			
			if ( sms == false && tel == false) {
				$("#cstmng_chkDtFAX").prop('checked', true);
			}
		}
	});
	
	$("#cstmng_chkDtAll").on("change", function(e) {
		var isChecked = $(this).is(":checked");
		if(isChecked) {
			$("#cstmng_chkDtTel, #cstmng_chkDtSMS").prop("checked", true);
			$("#cstmng_chkDtFAX").prop('checked', false);
		} else {
			$("#cstmng_chkDtTel, #cstmng_chkDtSMS").prop("checked", false);
			$("#cstmng_chkDtFAX").prop('checked', true);
		}
	});
	
	$("#cstmng_chkDtFAX").on("change", function(e) {
		var isChecked = $(this).is(":checked");
		if(isChecked) {
			$("#cstmng_chkDtAll, #cstmng_chkDtTel, #cstmng_chkDtSMS").prop("checked", false);
			$("#cstmng_chkDtFAX").prop('checked', true);
		} else {
			$("#cstmng_chkDtAll, #cstmng_chkDtTel, #cstmng_chkDtSMS").prop("checked", true);
			$("#cstmng_chkDtFAX").prop('checked', false);
		}
	});
	
	//민원인성향 제어 이벤트
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		$("#cstmng_optDtCustComp").prop("disabled", true);
	} else {
		$("#cstmng_optDtCustComp").prop("disabled", false);
	}
	
	$("#cstmng_optDtCustmComp").on("change", function(e) 
	{
		var code = $("#cstmng_optDtCustmComp").val();
		
		if (code != "010000" && code != "020000") 
		{
			$("#cstmng_optDtCustmComp2").prop("disabled", false);
		} else {
			$("#cstmng_optDtCustmComp2").prop("disabled", true);
		}
	});
	
	// 번호 - 붙이는 이벤트 등록
	setPhoneNumFormat("cstmng_tfDtTel");
	setPhoneNumFormat("cstmng_tfDtFax");
	setPhoneNumFormat("cstmng_tfDtMobile");
	setPhoneNumFormat("cstmng_tfDtCorp");
	
	//window.sessionStorage.setItem("parentCustId", "");
	window.localStorage.setItem("parentCustId", "");
});