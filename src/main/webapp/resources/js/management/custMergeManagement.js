var g_targetSelectedList = [];
var g_sourceSelectedList = [];
var g_custId = "";
//var g_telNumList = [];
//var g_mobileList = [];
//var g_EmailList = [];

var initFlag = true;
var g_popup = "CHILD";

var isinitdivMerge = false;
var isinitdivCancel = false;

// 파라미터 셋팅_CustmList
function getJsonStrCustmList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuY3VzdG1MaXN0",
		"map" : {
			"key" : "value",
			"tfContact" : $("#cstMrgMng_tfContact").val().replace(/-/gi, ""),
			"tfNm" : $("#cstMrgMng_tfNm").val(),
			"optCustmComp" : $("#cstMrgMng_optCustmComp").val(),
			"optCustmType" : $("#cstMrgMng_optCustmType").val(),
			"tfMemo" : $("#cstMrgMng_tfMemo").val(),
			"tfModDtStr" : $("#cstMrgMng_tfModDtStr").val().replace(/-/gi, ""),
			"tfModDtEnd" : $("#cstMrgMng_tfModDtEnd").val().replace(/-/gi, "")
		}
	};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_CustmList
function getJsonStrCustmListRelease(mode, custId)
{
	var loParam = {};
	
	if(custId) {
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y20wMDMuY3VzdG1MaXN0",
			"map" : {
				"key" : "value",
				"mode" : mode,
				"mrg_cust_id" : custId
			}
		};
	} else {
		if(mode=="target"){
			loParam = {
				"qt" : "c2VsZWN0TGlzdA==",
				"mi" : "Y20wMDMuY3VzdG1MaXN0",
				"map" : {
					"key" : "value",
					"mode" : mode,
					"tfContact" : $("#cstMrgMng_tfContactRelease").val(),
					"tfNm" : $("#cstMrgMng_tfNmRelease").val(),
					"optCustmComp" : $("#cstMrgMng_optCustmCompRelease").val(),
					"optCustmType" : $("#cstMrgMng_optCustmTypeRelease").val(),
					"tfMemo" : $("#cstMrgMng_tfMemoRelease").val(),
					"tfModDtStr" : $("#cstMrgMng_tfModDtStrRelease").val().replace(/-/gi, ""),
					"tfModDtEnd" : $("#cstMrgMng_tfModDtEndRelease").val().replace(/-/gi, "")
				}
			};
		}
	}
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_getJsonStrGetCustInfo
function getJsonStrGetCustInfo(cust_id, use_yn)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm8=",
		"map" : {
			"key" : "value",
			"cust_id" : cust_id,
			"use_yn" : use_yn
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_getJsonStrGetCustCntctInfm(ajax)
function getJsonStrGetCustCntctInfm(cust_id, use_yn)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2QwMDQuZ2V0Q3VzdENudGN0SW5mbQ==",
		"map" : {
			"key" : "value",
			"cust_id" : cust_id,
			"use_yn" : use_yn
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_NewCustId
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

function getJsonStrReleaseMergeBegin()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMucmVsZWFzZU1lcmdlQmVnaW4=",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_ReleaseMerge
function getJsonStrReleaseMerge(custId, custArr)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDMucmVsZWFzZU1lcmdl",
		"map" : {
			"key" : "value",
			"mrg_cust_id" : custId,
			"custArr" : custArr
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 조회버튼 클릭 이벤트
function btnCustmSrch_clickEvent()
{
	$("#cstMrgMng_tblCustList").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmList() }, page : 1, sortname : "CORP_NM", sortorder : "asc" });
	$("#cstMrgMng_tblCustList").trigger("reloadGrid");
	
	initFirstTabSpec();
}

// 초기화 버튼 클릭 이벤트
function btnCustmInit_clickEvent()
{
	initFirstTab();
}

// 민원인병합 탭 초기화
function initFirstTab()
{
	g_sourceSelectedList = [];
	g_targetSelectedList = [];
	
	$("#cstMrgMng_tblCustMergeTarget").clearGridData();
	$("#cstMrgMng_tblCustMergeSource").clearGridData();
	
	$("#cstMrgMng_tfContact").val("");
	$("#cstMrgMng_tfNm").val("");
	setObjSelectBoxWithCode("cstMrgMng_optCustmType", "전체", "",g_popup,"90048", "all");
	setObjSelectBoxWithCode("cstMrgMng_optCustmComp", "전체", "",g_popup,"90043", "all");
	$("#cstMrgMng_tfMemo").val("");
//	$("#cstMrgMng_tfModDtStr").val(getDate());
	$("#cstMrgMng_tfModDtStr").val(getPrvDay('Y',1,'-'));
	$("#cstMrgMng_tfModDtEnd").val(getDate());
	
	$("#cstMrgMng_tblCustList").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmList() }, page : 1, sortname : "CORP_NM", sortorder : "asc" });
	$("#cstMrgMng_tblCustList").trigger("reloadGrid");
	
	initFirstTabSpec();
}

// 민원인병합 상세 셋팅
function setFirstTabSpec(custId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrGetCustInfo(custId, ""),
		success : function(data)
		{
			$("#tfDtCorpNm").val(data[0].CORP_NM);
			$("#cstMrgMng_tfDtCustmNm").val(data[0].CUST_NM);
			$("#cstMrgMng_tfDtMemo").val(data[0].MEMO);
			$("#cstMrgMng_optDtCustmComp").val(data[0].CST_COMP);
			$("#cstMrgMng_optDtCustmComp2").val(data[0].CST_COMP2);
			$("#cstMrgMng_optDtCustmType").val(data[0].CUST_GB_CD);
			$("#optDtGndr").val(data[0].GNDR);
			$("#cstMrgMng_txtCrt").html(data[0].CRT_USR_NM + " / " + dateFormat(data[0].CRT_DT) );
			$("#cstMrgMng_txtMod").html(data[0].MOD_USR_NM + " / " + dateFormat(data[0].MOD_DT) );
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "custMergeManagement.js : 197");
		}
	});
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/custCntctInfm.do",
		data : "pJson=" + getJsonStrGetCustCntctInfm(custId, "Y"),
		success : function(data)
		{
			$("#cstMrgMng_tfDtTel").val();
			$("#cstMrgMng_tfDtMobile").val();
			$("#cstMrgMng_tfDtFax").val();

			var tel = "11000";
			var mobile = "11003";
			var fax = "13000";
			
			for(var i = 0; i < data.length; i++) {
				switch(data[i].CH_GB_CD) {
				case tel:
					$("#cstMrgMng_tfDtTel").val(getPhoneNumFormat(data[i].CNTCT_INFM));
					break;
				case mobile:
					$("#cstMrgMng_tfDtMobile").val(getPhoneNumFormat(data[i].CNTCT_INFM));
					break;
				case fax:
					$("#cstMrgMng_tfDtFax").val(getPhoneNumFormat(data[i].CNTCT_INFM));
					break;
				default:
					console.log("invalid cntct_infm");
					break;
				}
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "custMergeManagement.js : 229");
		}
	});
}

// 민원인병합 상세 초기화
function initFirstTabSpec()
{
	g_custId = "";
	g_telNumList = [];
	g_mobileList = [];
	g_EmailList = [];
	
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmType", "", "",g_popup,"90043", "");
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmComp", "", "",g_popup,"90048", "");
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmComp2", "미선택", "",g_popup,"90901", "");
	setObjSelectBoxWithCode("optDtGndr", "", "",g_popup,"90045", "1");
	
	$("#tfDtCorpNm").val("");
	$("#cstMrgMng_tfDtCustmNm").val("");
	$("#cstMrgMng_tfDtMemo").val("");
	$("#cstMrgMng_txtCrt").html("");
	$("#cstMrgMng_txtMod").html("");
	$("#cstMrgMng_tfDtTel").val("");
	$("#cstMrgMng_tfDtMobile").val("");
	$("#cstMrgMng_tfDtFax").val("");
	$("#wrapTel").html("");
	$("#wrapMobile").html("");
	$("#wrapEmail").html("");
}

// 병합해제 탭 초기화
function initSecondTab()
{
	$("#cstMrgMng_tfContactRelease").val("");
	$("#cstMrgMng_tfNmRelease").val("");
	setObjSelectBoxWithCode("cstMrgMng_optCustmTypeRelease", "전체", "",g_popup,"90048", "all");
	setObjSelectBoxWithCode("cstMrgMng_optCustmCompRelease", "전체", "",g_popup,"90043", "all");
	$("#cstMrgMng_tfMemoRelease").val("");
	$("#cstMrgMng_tfModDtStrRelease").val(getPrvDay('Y',1,'-'));
	$("#cstMrgMng_tfModDtEndRelease").val(getDate());
	$("#optMergeCondRelease").val("mergeTarget");

	$("#cstMrgMng_btnCustmSrchRelease").trigger("click");
	
	initSecondTabLeft();
	initSecondTabRight();
}

//TODO
// 병합해제 탭 왼쪽 상세 셋팅
function setSecondTabSpecLeft(custId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrGetCustInfo(custId, ""),
		success : function(data)
		{
			$("#cstMrgMng_tfDtCustmNmReleaseLeft").val(data[0].CUST_NM);
			$("#cstMrgMng_tfDtMemoReleaseLeft").val(data[0].MEMO);
			$("#cstMrgMng_optDtCustmCompReleaseLeft").val(data[0].CST_COMP);
			$("#cstMrgMng_optDtCustmComp2ReleaseLeft").val(data[0].CST_COMP2);
			$("#cstMrgMng_optDtCustmTypeReleaseLeft").val(data[0].CUST_GB_CD);
			$("#optDtGndrReleaseLeft").val(data[0].GNDR);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "custMergeManagement.js : 297");
		}
	});
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/custCntctInfm.do",
		data : "pJson=" + getJsonStrGetCustCntctInfm(custId, "Y"),
		success : function(data)
		{
			$("#cstMrgMng_tfDtLeftTel").val("");
			$("#cstMrgMng_tfDtLeftMobile").val("");
			$("#cstMrgMng_tfDtLeftFax").val("");
			
			var tel = "11000";
			var mobile = "11003";
			var fax = "13000";
			
			for(var i = 0; i < data.length; i++) {
				switch(data[i].CH_GB_CD) {
					case tel:
						$("#cstMrgMng_tfDtLeftTel").val(getPhoneNumFormat(data[i].CNTCT_INFM));
						break;
					case mobile:
						$("#cstMrgMng_tfDtLeftMobile").val(getPhoneNumFormat(data[i].CNTCT_INFM));
						break;
					case fax:
						$("#cstMrgMng_tfDtLeftFax").val(getPhoneNumFormat(data[i].CNTCT_INFM));
						break;
					default:
						console.log("invalid cntct_infm");
						break;
				}
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "custMergeManagement.js : 329");
		}
	});
}

// 병합해제 탭 왼쪽 상세 초기화
function initSecondTabLeft()
{
	//hhs 2020.02.20
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmTypeReleaseLeft", "", "",g_popup,"90043", "");
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmCompReleaseLeft", "", "",g_popup,"90048", "");
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmComp2ReleaseLeft", "미선택", "",g_popup,"90901", "");
	
	$("#tfDtCorpNmReleaseLeft").val("");
	$("#cstMrgMng_tfDtCustmNmReleaseLeft").val("");
	$("#cstMrgMng_tfDtMemoReleaseLeft").val("");

	$("#cstMrgMng_tfDtLeftTel").val("");
	$("#cstMrgMng_tfDtLeftMobile").val("");
	$("#cstMrgMng_tfDtLeftFax").val("");
}

// 병합해제 탭 오른쪽 상세 셋팅
function setSecondTabSpecRight(custId)
{
	console.log(custId);
	
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrGetCustInfo(custId, "N"),
		success : function(data)
		{
			$("#cstMrgMng_tfDtCustmNmReleaseRight").val(data[0].CUST_NM);
			$("#cstMrgMng_tfDtMemoReleaseRight").val(data[0].MEMO);
			$("#cstMrgMng_optDtCustmCompReleaseRight").val(data[0].CST_COMP);
			$("#cstMrgMng_optDtCustmComp2ReleaseRight").val(data[0].CST_COMP2);
			$("#cstMrgMng_optDtCustmTypeReleaseRight").val(data[0].CUST_GB_CD);
			$("#optDtGndrReleaseRight").val(data[0].GNDR);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "custMergeManagement.js : 369");
		}
	});
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/custCntctInfm.do",
		data : "pJson=" + getJsonStrGetCustCntctInfm(custId, "N"),
		success : function(data)
		{
			$("#cstMrgMng_tfDtRightTel").val("");
			$("#cstMrgMng_tfDtRightMobile").val("");
//			$("#tfDtRightFax").val("");
			$("#cstMrgMng_tfDtRightFax").val("");
			
			var tel = "11000";
			var mobile = "11003";
			var fax = "13000";
			
			console.log(data);
			for(var i = 0; i < data.length; i++) {
				console.log(data[i].CNTCT_INFM);
				switch(data[i].CH_GB_CD) {
					case tel:
						$("#cstMrgMng_tfDtRightTel").val(getPhoneNumFormat(data[i].CNTCT_INFM));
						break;
					case mobile:
						$("#cstMrgMng_tfDtRightMobile").val(getPhoneNumFormat(data[i].CNTCT_INFM));
						break;
					case fax:
//						$("#tfDtRightFax").val(getPhoneNumFormat(data[i].CNTCT_INFM));
						$("#cstMrgMng_tfDtRightFax").val(getPhoneNumFormat(data[i].CNTCT_INFM));
						break;
					default:
						console.log("invalid cntct_infm");
						break;
				}
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "custMergeManagement.js : 401");
		}
	});
}

// 병합해제 탭 오른쪽 상세 초기화
function initSecondTabRight()
{
	//hhs 2020.02.20
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmTypeReleaseRight", "", "",g_popup,"90043", "");
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmCompReleaseRight", "", "",g_popup,"90048", "");
	setObjSelectBoxWithCode("cstMrgMng_optDtCustmComp2ReleaseRight", "미선택", "",g_popup,"90901", "");
	
	$("#tfDtCorpNmReleaseRight").val("");
	$("#cstMrgMng_tfDtCustmNmReleaseRight").val("");
	$("#cstMrgMng_tfDtMemoReleaseRight").val("");
	
	$("#cstMrgMng_tfDtRightTel").val("");
	$("#cstMrgMng_tfDtRightMobile").val("");
	$("#cstMrgMng_tfDtRightFax").val("");
}


// 병합기준등록 버튼 클릭 이벤트 등록
function btnMergeTarget_clickEvent()
{
	var allList = $("#cstMrgMng_tblCustList").getRowData();
	g_targetSelectedList = [];

	// 선택된 민원인 목록을 추출
	for(var i = 0; i < allList.length; i++)
	{
		if(allList[i].CHECK_YN == "1")
			g_targetSelectedList.push({"CUST_NM" : allList[i].CUST_NM, "TEL" : allList[i].TEL, "MOBILE" : allList[i].MOBILE, "FAX" : allList[i].FAX, "CUST_ID" : allList[i].CUST_ID});
	}
	
	// 선택된 민원인 수에 따른 분기
	if(g_targetSelectedList.length <= 0)
	{
		alert("적어도 한명의 민원인을 선택 하셔야 합니다.");
		return;
	}
	else if(g_targetSelectedList.length > 1)
	{
		alert("한명 이상의 민원인을 기준으로 등록 할 수 없습니다.");
		return;
	}
	else
	{
		// 상세 정보 셋팅
		initFirstTabSpec();
		setFirstTabSpec(g_targetSelectedList[0].CUST_ID);
		
		// 기준 그리드에 민원인 추가
		$("#cstMrgMng_tblCustMergeTarget").clearGridData();
		
		for(var i = 0; i < g_targetSelectedList.length; i++)
			$("#cstMrgMng_tblCustMergeTarget").addRowData(i + 1, g_targetSelectedList[i]);
		
		g_custId = g_targetSelectedList[0].CUST_ID;
		
		// 만약 대상 그리드에 대상이 있다면 대상 그리드에서 민원인 제외
		var newSourceList = [];
		
		for(var i = 0; i < g_sourceSelectedList.length; i++)
		{
			if(g_sourceSelectedList[i].CUST_ID != g_targetSelectedList[0].CUST_ID)
				newSourceList.push({"CUST_NM" : g_sourceSelectedList[i].CUST_NM, "TEL" : g_sourceSelectedList[i].TEL, "MOBILE" : g_sourceSelectedList[i].MOBILE, "FAX" : g_sourceSelectedList[i].FAX, "CUST_ID" : g_sourceSelectedList[i].CUST_ID});
		}
		
		// 새로운 목록으로 교체
		g_sourceSelectedList = newSourceList;
		
		$("#cstMrgMng_tblCustMergeSource").clearGridData();
		
		for(var i = 0; i < g_sourceSelectedList.length; i++)
			$("#cstMrgMng_tblCustMergeSource").addRowData(i + 1, g_sourceSelectedList[i]);
	}
}

// 병합대상등록 버튼 클릭 이벤트 등록
function btnMergeSource_clickEvent()
{
	var allList = $("#cstMrgMng_tblCustList").getRowData();
	var sourceSelectedList = [];

	// 선택된 민원인 목록을 추출
	for(var i = 0; i < allList.length; i++)
	{
		if(allList[i].CHECK_YN == "1")
			sourceSelectedList.push({"CUST_NM" : allList[i].CUST_NM, "TEL" : allList[i].TEL, "MOBILE" : allList[i].MOBILE, "FAX" : allList[i].FAX, "CUST_ID" : allList[i].CUST_ID});
	}
	
	// 선택된 민원인 수에 따른 분기
	if(sourceSelectedList.length == 0)
	{
		alert("적어도 한명의 민원인을 선택 하셔야 합니다.");
		return;
	}
	else
	{
		// 대상으로 추가 할 민원인 중 기준 민원인이 포함되어 있는 경우 기준 민원인에서 제외
		if(g_targetSelectedList.length == 1)
		{
			for(var i = 0; i < sourceSelectedList.length; i++)
			{
				if(sourceSelectedList[i].CUST_ID == g_targetSelectedList[0].CUST_ID)
				{
					initFirstTabSpec();
					
					$("#cstMrgMng_tblCustMergeTarget").clearGridData();
					g_targetSelectedList = [];
					
					break;
				}
			}
		}
		
		// 추가 할 민원인이 현재 대상으로 등록 되어 있다면 제외 하고 추가
		for(var i = 0; i < sourceSelectedList.length; i++)
		{
			var flag = true;
			
			for(var j = 0; j < g_sourceSelectedList.length; j++)
			{
				if(sourceSelectedList[i].CUST_ID == g_sourceSelectedList[j].CUST_ID)
				{
					flag = false;
					break;
				}
			}
			
			// 이미 추가되어 있지 않은 경우 추가
			if(flag)
				$("#cstMrgMng_tblCustMergeSource").addRowData(i + 1, sourceSelectedList[i]);
		}
		
		// 그리드에 민원인 추가 후 현재 민원인 대상 목록 갱신
		g_sourceSelectedList = $("#cstMrgMng_tblCustMergeSource").getRowData();
		
		$("#cstMrgMng_tblCustMergeSource").clearGridData();
		
		for(var i = 0; i < g_sourceSelectedList.length; i++)
			$("#cstMrgMng_tblCustMergeSource").addRowData(i + 1, g_sourceSelectedList[i]);
	}
}

// 대상삭제 버튼 클릭 이벤트
function btnCustMergeDelete_clickEvent()
{
	var allList = $("#cstMrgMng_tblCustMergeSource").getRowData();
	var sourceSelectedList = [];
	
	// 선택되지 않은 민원인 목록을 추출
	for(var i = 0; i < allList.length; i++)
	{
		if(allList[i].CHECK_YN == "0")
			sourceSelectedList.push({"CUST_NM" : allList[i].CUST_NM, "TEL" : allList[i].TEL, "MOBILE" : allList[i].MOBILE, "FAX" : allList[i].FAX, "CUST_ID" : allList[i].CUST_ID});
	}
	
	// 선택되지 않은 민원인만을 다시 그리드에 추가 후 현재 그리드 목록 갱신
	$("#cstMrgMng_tblCustMergeSource").clearGridData();
	
	for(var i = 0; i < sourceSelectedList.length; i++)
		$("#cstMrgMng_tblCustMergeSource").addRowData(i + 1, sourceSelectedList[i]);
	
	g_sourceSelectedList = $("#cstMrgMng_tblCustMergeSource").getRowData();
}

// 민원인병합 버튼 클릭 이벤트
function btnMergeRun_clickEvent()
{
	var newCustId = "";
	
	if(g_sourceSelectedList.length == 0 || g_targetSelectedList.length == 0)
	{
		alert("병합기준민원인과 병합대상민원인을 먼저 선택 해 주시기 바랍니다.");
		return;
	}
	
	if(confirm("병합 하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/management/newCustId.do",
			data : "pJson=" + getJsonStrNewCustId(),
			success : function(data)
			{
				newCustId = data.CUST_ID;
				
				var pList = [];
				
				// 병합된 민원인 정보 생성
				pList.push({
					"qt" : "aW5zZXJ0",
					"mi" : "Y20wMDMuaW5zZXJ0Q3VzdEluZm8=",
					"map" : {
						"key" : "value",
						"cust_nm" : $("#cstMrgMng_tfDtCustmNm").val(),
						"cust_gb_cd" : $("#cstMrgMng_optDtCustmType").val(),
						"cst_comp" : $("#cstMrgMng_optDtCustmComp").val(),
						"cst_comp2" : $("#cstMrgMng_optDtCustmComp2").val(),
						"memo" : $("#cstMrgMng_tfDtMemo").val(),
						"gndr" : "", // $("#optDtGndr").val(),
						"cust_id" : newCustId,
						"mrg_yn" : "Y"
				}});
				
				// 민원인의 연락처 정보 생성
				//전화
				if($("#cstMrgMng_tfDtTel").val().trim()) {
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "Y2QwMDQuaW5zZXJ0Q250Y3Q=",
						"map" : {
							"key" : "value",
							"cust_id" : newCustId,
							"ch_gb_cd" : "11000",
							"cntct_infm" : $("#cstMrgMng_tfDtTel").val().replace(/-/gi, "")
					}});
				}
				//핸드폰
				if($("#cstMrgMng_tfDtMobile").val().trim()) {
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "Y2QwMDQuaW5zZXJ0Q250Y3Q=",
						"map" : {
							"key" : "value",
							"cust_id" : newCustId,
							"ch_gb_cd" : "11003",
							"cntct_infm" : $("#cstMrgMng_tfDtMobile").val().replace(/-/gi, "")
					}});
				}
				//팩스
				if($("#cstMrgMng_tfDtFax").val().trim()) {
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "Y2QwMDQuaW5zZXJ0Q250Y3Q=",
						"map" : {
							"key" : "value",
							"cust_id" : newCustId,
							"ch_gb_cd" : "13000",
							"cntct_infm" : $("#cstMrgMng_tfDtFax").val().replace(/-/gi, "")
					}});
				}
			
				// 병합 기준 및 병합 대상 민원인 정보 변경
				for(var i = 0; i < g_targetSelectedList.length; i++)
				{
					pList.push({"qt" : "dXBkYXRl",
						"mi" : "Y20wMDMudXBkYXRlQ3VzdEluZm8=",
						"map" : {
							"key" : "value",
							"mrg_cust_id" : newCustId,
							"use_yn" : "N",
							"cust_id" : g_targetSelectedList[i].CUST_ID
					}});
				}
				
				for(var i = 0; i < g_sourceSelectedList.length; i++)
				{
					pList.push({"qt" : "dXBkYXRl",
						"mi" : "Y20wMDMudXBkYXRlQ3VzdEluZm8=",
						"map" : {
							"key" : "value",
							"mrg_cust_id" : newCustId,
							"use_yn" : "N",
							"cust_id" : g_sourceSelectedList[i].CUST_ID
					}});
				}
				
				// 병합 작업 수행
				$.ajax({
					type : "post",
					async : true,
					url : getContextPath() + "/ajax/custMerge/custMerge.do",
					data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
					success : function(data)
					{
						$("#cstMrgMng_btnCustmInit").trigger("click");
						
						alert("병합되었습니다.");
					},
					error : function(data, status, err)
					{
						networkErrorHandler(data, status, err, "custMergeManagement.js : 791");
					}
				});
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "custMergeManagement.js : 797");
			}
		});
	}
}

// 병합해제 버튼 클릭 이벤트
function btnMergeRelease_clickEvent()
{
	var row_id = $("#cstMrgMng_tblCustListTarget").jqGrid("getGridParam", "selrow");
	var cust_id = $("#cstMrgMng_tblCustListTarget").getCell(row_id, "CUST_ID");
	
	if(confirm("병합을 해제 하시겠습니까?"))
	{
		$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/management/releaseMergeBegin.do",
		data : "pJson=" + getJsonStrReleaseMergeBegin(),
		success : function(data)
		{
			var custArr = [];
			for(var i = 0; i < data.length; i++) {
			    	custArr[i] = data[i].CUST_ID;
			}			
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/management/newCustId.do",
			data : "pJson=" + getJsonStrReleaseMerge(cust_id, custArr),
			success : function(data)
			{
				alert("병합해제 되었습니다.");
				
				btnCustmInitRelease_clickEvent();
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "custMergeManagement.js : 825");
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
/*
//민원인병합 탭 클릭 이벤트
function divMerge_clickEvent()
{
	$("#cstMrgMng_divMergeBtn").attr("class", "left_tab_img");
	$("#cstMrgMng_divCancelBtn").attr("class", "left_tab_img_gray");
	
	$("#cstMrgMng_divMerge").css("display", "block");
	$("#cstMrgMng_divCanel").css("display", "none");
}
*/
//병합해제 탭 클릭 이벤트
function divCanel_clickEvent()
{
	if(initFlag)
	{
		$("#cstMrgMng_tblCustListSource").clearGridData();
		initFlag = false;
	}
	
	//$("#cstMrgMng_divMergeBtn").attr("class", "left_tab_img_gray");
	//$("#cstMrgMng_divCancelBtn").attr("class", "left_tab_img");
	
	//$("#cstMrgMng_divMerge").css("display", "none");
	//$("#cstMrgMng_divCanel").css("display", "block");
}

// 병합해제 탭 조회버튼 클릭 이벤트
function btnCustmSrchRelease_clickEvent()
{
	$("#cstMrgMng_tblCustListTarget").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmListRelease("target", "") }, page : 1, sortname : "CORP_NM", sortorder : "asc" });
	$("#cstMrgMng_tblCustListTarget").trigger("reloadGrid");
	
	$("#cstMrgMng_tblCustListSource").clearGridData();
	/*if($("#optMergeCondRelease").val() == "mergeTarget")
	{
		$("#cstMrgMng_tblCustListTarget").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmListRelease("target", "") }, page : 1, sortname : "CORP_NM", sortorder : "asc" });
		$("#cstMrgMng_tblCustListTarget").trigger("reloadGrid");
		
		$("#cstMrgMng_tblCustListSource").clearGridData();
	}
	else
	{
		$("#cstMrgMng_tblCustListSource").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmListRelease("source", "") }, page : 1, sortname : "CORP_NM", sortorder : "asc" });
		$("#cstMrgMng_tblCustListSource").trigger("reloadGrid");
		
		$("#cstMrgMng_tblCustListTarget").clearGridData();
	}*/
	
	initSecondTabLeft();
	initSecondTabRight();
}

// 병합해제 탭 초기화 버튼 클릭 이벤트
function btnCustmInitRelease_clickEvent()
{
	initSecondTab();
}

// 그리드 초기화
function initGridFirstTab()
{
	// 민원인 목록 그리드
	$("#cstMrgMng_tblCustList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/cusomerManage.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCustmList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "선택", "민원구분", "민원인명", "성별", "핸드폰번호", "일반전화", "팩스번호",  "민원성향", "메모", "등록일", "수정일", "수정자", "민원인ID"],
		colModel : 
		[
		 	{ name : "CHECK_YN", index : "CHECK_YN", formatter : "checkbox", editoptions : {value : "1:0", defaultVaule : "0"}, formatoptions : {disabled:false}, width : "30", align : "center", sortable : false},
			{ name : "CST_TYPE", index : "CST_TYPE", align : "center", width : "80" },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : "100" },
			{ name : "GNDR_NM", index : "GNDR_NM", align : "center", width : "50" , hidden : true},
			{ name : "MOBILE", index : "MOBILE", width : "100", align : "center" },
			{ name : "TEL", index : "TEL", width : "100", align : "center" },
			{ name : "FAX", index : "FAX", width : "100", align : "center" },
			{ name : "CST_COMP", index : "CST_COMP", width : "80", align : "center" },
			{ name : "MEMO", index : "MEMO", width : "220" },
			{ name : "CRT_DT", index : "CRT_DT", width : "80", align : "center"},
			{ name : "MOD_DT", index : "MOD_DT", width : "80", align : "center" },
			{ name : "MOD_USR_NM", index : "MOD_USR_NM", align : "center", width : "90" },
			{ name : "CUST_ID", index : "CUST_ID", hidden : true },
		],
		sortname : "CUST_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "277",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30],
	   	autowidth : true,
	   	pager : "#cstMrgMng_pgCustList",
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
			var check_yn = $("#cstMrgMng_tblCustList").getCell(rowid, "CHECK_YN");
	   		
	   		if(check_yn == 1)
	   			$("#cstMrgMng_tblCustList").setCell(rowid, "CHECK_YN", 0);
	   		else
	   			$("#cstMrgMng_tblCustList").setCell(rowid, "CHECK_YN", 1);
		},
		gridComplete : function()
		{
			var rowIdArr = $("#cstMrgMng_tblCustList").getDataIDs();
			
			for(var i = 0; i < rowIdArr.length; i++)
			{
				$("#cstMrgMng_tblCustList").setCell(rowIdArr[i], "TEL", getPhoneNumFormat($("#cstMrgMng_tblCustList").getRowData(rowIdArr[i]).TEL));
				$("#cstMrgMng_tblCustList").setCell(rowIdArr[i], "MOBILE", getPhoneNumFormat($("#cstMrgMng_tblCustList").getRowData(rowIdArr[i]).MOBILE));
				$("#cstMrgMng_tblCustList").setCell(rowIdArr[i], "FAX", getPhoneNumFormat($("#cstMrgMng_tblCustList").getRowData(rowIdArr[i]).FAX));
			}
		}
	}).jqGrid("navGrid", "#cstMrgMng_pgCustList", {edit : false, add : false, del : false, search : false});
	
	// 상단 선택 컬럼 클릭 이벤트 등록
	$("#tblCustList_CHECK_YN").bind("click", custListSelectAll_clickEvent);
	
	// 병합 기준 그리드
	$("#cstMrgMng_tblCustMergeTarget").jqGrid(
	{
		datatype : "local",
		colNames : [ "민원인명", "일반전화", "핸드폰번호", "팩스번호", "민원인ID" ],
		colModel : 
		[
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : "80" },
			{ name : "TEL", index : "TEL", width : "100" },
			{ name : "MOBILE", index : "MOBILE", width : "100" },
			{ name : "FAX", index : "FAX" },
			{ name : "CUST_ID", index : "CUST_ID", hidden : true },
		],
		sortname : "CORP_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true	,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "36",
	   	width : "100%",
	   	rowNum : "99999",
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : false,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onSelectRow : function(rowid)
		{
			
		},
		gridComplete : function()
		{
			var rowIdArr = $("#cstMrgMng_tblCustMergeTarget").getDataIDs();
			
			for(var i = 0; i < rowIdArr.length; i++)
			{
				$("#cstMrgMng_tblCustMergeTarget").setCell(rowIdArr[i], "TEL", getPhoneNumFormat($("#cstMrgMng_tblCustMergeTarget").getRowData(rowIdArr[i]).TEL));
				$("#cstMrgMng_tblCustMergeTarget").setCell(rowIdArr[i], "MOBILE", getPhoneNumFormat($("#cstMrgMng_tblCustMergeTarget").getRowData(rowIdArr[i]).MOBILE));
				$("#cstMrgMng_tblCustMergeTarget").setCell(rowIdArr[i], "FAX", getPhoneNumFormat($("#cstMrgMng_tblCustMergeTarget").getRowData(rowIdArr[i]).FAX));
			}
		}
	});
	
	// 병합 대상 그리드
	$("#cstMrgMng_tblCustMergeSource").jqGrid(
	{
		datatype : "json",
		colNames : [ "선택", "민원인명", "일반전화", "핸드폰번호", "팩스번호", "민원인ID" ],
		colModel : 
		[
		 	{ name : "CHECK_YN", index : "CHECK_YN", formatter : "checkbox", editoptions : {value : "1:0", defaultVaule : "0"}, formatoptions : {disabled:false}, width : "30", align : "center", sortable : false},
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : "80" },
			{ name : "TEL", index : "TEL", width : "100" },
			{ name : "MOBILE", index : "MOBILE", width : "100" },
			{ name : "FAX", index : "FAX", width : "125" },
			{ name : "CUST_ID", index : "CUST_ID", hidden : true },
		],
		sortname : "CORP_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "95",
	   	width : "100%",
	   	rowNum : "99999",
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : false,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onSelectRow : function(rowid)
		{
			var check_yn = $("#cstMrgMng_tblCustMergeSource").getCell(rowid, "CHECK_YN");
	   		
	   		if(check_yn == 1)
	   			$("#cstMrgMng_tblCustMergeSource").setCell(rowid, "CHECK_YN", 0);
	   		else
	   			$("#cstMrgMng_tblCustMergeSource").setCell(rowid, "CHECK_YN", 1);
		},
		gridComplete : function()
		{
			var rowIdArr = $("#cstMrgMng_tblCustMergeSource").getDataIDs();
			
			for(var i = 0; i < rowIdArr.length; i++)
			{
				$("#cstMrgMng_tblCustMergeSource").setCell(rowIdArr[i], "TEL", getPhoneNumFormat($("#cstMrgMng_tblCustMergeSource").getRowData(rowIdArr[i]).TEL));
				$("#cstMrgMng_tblCustMergeSource").setCell(rowIdArr[i], "MOBILE", getPhoneNumFormat($("#cstMrgMng_tblCustMergeSource").getRowData(rowIdArr[i]).MOBILE));
				$("#cstMrgMng_tblCustMergeSource").setCell(rowIdArr[i], "FAX", getPhoneNumFormat($("#cstMrgMng_tblCustMergeSource").getRowData(rowIdArr[i]).FAX));
			}
		}
	});
	
	// 상단 선택 컬럼 클릭 이벤트
	$("#tblCustMergeSource_CHECK_YN").bind("click", custMergeSourceListAll_clickEvent);
}

//TODO
//그리드 초기화
function initGridSecondTab()
{
	// 병합후민원인 목록 그리드
	$("#cstMrgMng_tblCustListTarget").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/cusomerManage.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCustmListRelease("target", "")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["민원인명", "성별", "민원구분", "일반전화", "핸드폰번호", "팩스번호", "민원성향", "메모", "등록일", "수정일", "수정자", "민원인ID"],
		colModel : 
		[
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : "100" },
			{ name : "GNDR_NM", index : "GNDR_NM", align : "center", width : "50", hidden : true },
			{ name : "CST_TYPE", index : "CST_TYPE", align : "center", width : "80" },
			{ name : "TEL", index : "TEL", width : "100" },
			{ name : "MOBILE", index : "MOBILE", width : "100" },
			{ name : "FAX", index : "FAX", width : "100" },
			{ name : "CST_COMP", index : "CST_COMP", width : "70", align : "center" },
			{ name : "MEMO", index : "MEMO", width : "200" },
			{ name : "CRT_DT", index : "CRT_DT", width : "80", align : "center"},
			{ name : "MOD_DT", index : "MOD_DT", width : "80", align : "center" },
			{ name : "MOD_USR_NM", index : "MOD_USR_NM", align : "center", width : "80" },
			{ name : "CUST_ID", index : "CUST_ID", hidden : true },
		],
		sortname : "CORP_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "277",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30],
	   	autowidth : true,
	   	pager : "#cstMrgMng_pgCustListTarget",
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
			var mrg_cust_id = $("#cstMrgMng_tblCustListTarget").getCell(rowid, "CUST_ID");
			
			$("#cstMrgMng_tblCustListSource").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmListRelease("source", mrg_cust_id) }, page : 1, sortname : "CORP_NM", sortorder : "asc" });
			$("#cstMrgMng_tblCustListSource").trigger("reloadGrid");
			
			setSecondTabSpecLeft(mrg_cust_id);
			initSecondTabRight();
		},
		onPaging : function(pgButton)
		{
			initSecondTabLeft();
		},
		gridComplete : function()
		{
			console.log("gridcompleteCall");
			var rowIdArr = $("#cstMrgMng_tblCustListTarget").getDataIDs();
			
			for(var i = 0; i < rowIdArr.length; i++)
			{
				$("#cstMrgMng_tblCustListTarget").setCell(rowIdArr[i], "TEL", getPhoneNumFormat($("#cstMrgMng_tblCustListTarget").getRowData(rowIdArr[i]).TEL));
				$("#cstMrgMng_tblCustListTarget").setCell(rowIdArr[i], "MOBILE", getPhoneNumFormat($("#cstMrgMng_tblCustListTarget").getRowData(rowIdArr[i]).MOBILE));
				$("#cstMrgMng_tblCustListTarget").setCell(rowIdArr[i], "FAX", getPhoneNumFormat($("#cstMrgMng_tblCustListTarget").getRowData(rowIdArr[i]).FAX));
			}
		}
	}).jqGrid("navGrid", "#cstMrgMng_pgCustListTarget", {edit : false, add : false, del : false, search : false});
	
	// 병합전민원인 목록 그리드
	$("#cstMrgMng_tblCustListSource").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/cusomerManage.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCustmListRelease("source", "")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["민원인명", "성별", "민원구분", "일반전화", "핸드폰번호", "팩스번호", "민원성향", "메모", "등록일", "수정일", "수정자", "민원인ID", "병합된민원인ID" ],
		colModel : 
		[
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : "100" },
			{ name : "GNDR_NM", index : "GNDR_NM", align : "center", width : "50", hidden : true },
			{ name : "CST_TYPE", index : "CST_TYPE", align : "center", width : "80" },
			{ name : "TEL", index : "TEL", width : "100" },
			{ name : "MOBILE", index : "MOBILE", width : "100" },
			{ name : "FAX", index : "FAX" , width : "100"},
			{ name : "CST_COMP", index : "CST_COMP", width : "70", align : "center" },
			{ name : "MEMO", index : "MEMO", width : "200" },
			{ name : "CRT_DT", index : "CRT_DT", width : "80", align : "center"},
			{ name : "MOD_DT", index : "MOD_DT", width : "80", align : "center" },
			{ name : "MOD_USR_NM", index : "MOD_USR_NM", align : "center", width : "80" },
			{ name : "CUST_ID", index : "CUST_ID", hidden : true },
			{ name : "MRG_CUST_ID", index : "MRG_CUST_ID", hidden : true }
		],
		sortname : "CORP_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "277",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30],
	   	autowidth : true,
	   	pager : "#cstMrgMng_pgCustListSource",
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
			if($("#cstMrgMng_tblCustListTarget").jqGrid("getGridParam", "selrow") == null) {
				var mrg_cust_id = $("#cstMrgMng_tblCustListSource").getCell(rowid, "MRG_CUST_ID");
				
				$("#cstMrgMng_tblCustListTarget").jqGrid("setGridParam", { postData : { pJson : getJsonStrCustmListRelease("target", mrg_cust_id) }, page : 1, sortname : "CORP_NM", sortorder : "asc" });
				$("#cstMrgMng_tblCustListTarget").trigger("reloadGrid");
			}
			
			setSecondTabSpecRight($("#cstMrgMng_tblCustListSource").getCell(rowid, "CUST_ID"));
		},
		onPaging : function(pgButton)
		{
			initSecondTabRight();
		},
		gridComplete : function()
		{
			var rowIdArr = $("#cstMrgMng_tblCustListSource").getDataIDs();
			
			for(var i = 0; i < rowIdArr.length; i++)
			{
				$("#cstMrgMng_tblCustListSource").setCell(rowIdArr[i], "TEL", getPhoneNumFormat($("#cstMrgMng_tblCustListSource").getRowData(rowIdArr[i]).TEL));
				$("#cstMrgMng_tblCustListSource").setCell(rowIdArr[i], "MOBILE", getPhoneNumFormat($("#cstMrgMng_tblCustListSource").getRowData(rowIdArr[i]).MOBILE));
				$("#cstMrgMng_tblCustListSource").setCell(rowIdArr[i], "FAX", getPhoneNumFormat($("#cstMrgMng_tblCustListSource").getRowData(rowIdArr[i]).FAX));
			}
		}
	}).jqGrid("navGrid", "#cstMrgMng_pgCustListSource", {edit : false, add : false, del : false, search : false});
}

// 그리드 선택 버튼 클릭 이벤트
function custListSelectAll_clickEvent()
{
	var selectVal = "0";
	var tblLength = $("#cstMrgMng_tblCustList").getGridParam("reccount");
	
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#cstMrgMng_tblCustList").getCell(i, "CHECK_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++)
		$("#cstMrgMng_tblCustList").setCell(i, "CHECK_YN", selectVal);
}

//그리드 선택 버튼 클릭 이벤트
function custMergeSourceListAll_clickEvent()
{
	var selectVal = "0";
	var tblLength = $("#cstMrgMng_tblCustMergeSource").getGridParam("reccount");
	
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#cstMrgMng_tblCustMergeSource").getCell(i, "CHECK_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++)
		$("#cstMrgMng_tblCustMergeSource").setCell(i, "CHECK_YN", selectVal);
}

// 이벤트 초기화
function initEventFirstTab()
{
	// 민원인병합 탭 클릭 이벤트
	//$("#cstMrgMng_divMergeBtn").bind("click", divMerge_clickEvent);
	
	// 조회버튼 클릭 이벤트 등록
	$("#cstMrgMng_btnCustmSrch").bind("click", btnCustmSrch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#cstMrgMng_btnCustmInit").bind("click", btnCustmInit_clickEvent);
	
	// 검색어 엔터 키 이벤트 등록
	$(".keyDown").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			btnCustmSrch_clickEvent();
	});
	
	// 병합기준등록 버튼 클릭 이벤트 등록
	$("#cstMrgMng_btnMergeTarget").bind("click", btnMergeTarget_clickEvent);
	
	// 병합대상등록 버튼 클릭 이벤트 등록
	$("#cstMrgMng_btnMergeSource").bind("click", btnMergeSource_clickEvent);
	
	// 대상삭제 버튼 클릭 이벤트 등록
	$("#cstMrgMng_btnCustMergeDelete").bind("click", btnCustMergeDelete_clickEvent);
	
	// 민원인병합 버튼 클릭 이벤트 등록
	$("#cstMrgMng_btnMergeRun").bind("click", btnMergeRun_clickEvent);
	
	$("#cstMrgMng_optDtCustmComp2").prop("disabled", true);
	//민원성향 하분류 이벤트
	$("#cstMrgMng_optDtCustmComp").on("change", function(e) {
		var code = $("#cstMrgMng_optDtCustmComp").val();
		//악성, 특이민원일때만 하위분류 disable false처리
		if (code != "010000" && code != "020000") {
			$("#cstMrgMng_optDtCustmComp2").prop("disabled", false);
		} else {
			$("#cstMrgMng_optDtCustmComp2").prop("disabled", true);
			$("#cstMrgMng_optDtCustmComp2 option:first").prop("selected", true);
		}
	});
	
	//전화번호 포맷팅
	setPhoneNumFormat("cstMrgMng_tfDtTel");
	setPhoneNumFormat("cstMrgMng_tfDtMobile");
	setPhoneNumFormat("cstMrgMng_tfDtFax");
}

//이벤트 초기화
function initEventSecondTab()
{
	// 병합해제 탭 클릭 이벤트
	$("#cstMrgMng_divCancelBtn").bind("click", divCanel_clickEvent);
	
	// 조회버튼 클릭 이벤트 등록
	$("#cstMrgMng_btnCustmSrchRelease").bind("click", btnCustmSrchRelease_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#cstMrgMng_btnCustmInitRelease").bind("click", btnCustmInitRelease_clickEvent);
	
	// 검색어 엔터 키 이벤트 등록
	$(".keyDownRelease").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			btnCustmSrch_clickEvent();
	});
	
	// 병합해제 버튼 클릭 이벤트 등록
	$("#btnMergeRelease").bind("click", btnMergeRelease_clickEvent);
}

// init Page
$(document).ready(function()
{	
	var csttab = $("#pop_body").tabs();
	csttab.tabs({
		  activate:function (event, ui){
			  var id = ui.newPanel.attr('id');
			  initTabs(id);	
		  }
	});
	initTabs("cstMrgMng_divMerge");	
});

function initTabs(id){  
		switch(id){
		case "cstMrgMng_divMerge":
			if(isinitdivMerge == false){
				// 민원인병합 탭 초기화
				datePicker("#cstMrgMng_tfModDtStr");
				datePicker("#cstMrgMng_tfModDtEnd");
				//hhs 2020.02.21 1년전 단위로 검색
//				$("#cstMrgMng_tfModDtStr").val(getDate());
				$("#cstMrgMng_tfModDtStr").val(getPrvDay('Y',1,'-'));
				$("#cstMrgMng_tfModDtEnd").val(getDate());
				
				setObjSelectBoxWithCode("cstMrgMng_optCustmType", "전체", "",g_popup,"90043", "");
				setObjSelectBoxWithCode("cstMrgMng_optCustmComp", "전체", "",g_popup,"90048", "");				
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmType", "", "",g_popup,"90043", "");
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmComp", "", "",g_popup,"90048", "");
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmComp2", "미선택", "",g_popup,"90901", "");
				//setObjSelectBoxWithCode("optDtGndr", "", "",g_popup,"90045", "1");
				
				initEventFirstTab();
				initGridFirstTab();
				
				isinitdivMerge=true;
				}
			break;
		case "cstMrgMng_divCancel":
			if(isinitdivCancel == false){ 				
				// 병합해제 탭 초기화
				datePicker("#cstMrgMng_tfModDtStrRelease");
				datePicker("#cstMrgMng_tfModDtEndRelease");
				//hhs 2020.02.21 1년단위로 검색
//				$("#cstMrgMng_tfModDtStrRelease").val(getDate());
				$("#cstMrgMng_tfModDtStrRelease").val(getPrvDay('Y',1,'-'));
				$("#cstMrgMng_tfModDtEndRelease").val(getDate());
				
				setObjSelectBoxWithCode("cstMrgMng_optCustmTypeRelease", "전체", "",g_popup,"90043", "all");
				setObjSelectBoxWithCode("cstMrgMng_optCustmCompRelease", "전체", "",g_popup,"90048", "all");				
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmTypeReleaseLeft", "", "",g_popup,"90043", "");
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmCompReleaseLeft", "", "",g_popup,"90048", "");
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmComp2ReleaseLeft", "미선택", "",g_popup,"90901", "");
				//hhs
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmTypeReleaseRight", "", "",g_popup,"90043", "");
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmCompReleaseRight", "", "",g_popup,"90048", "");
				setObjSelectBoxWithCode("cstMrgMng_optDtCustmComp2ReleaseRight", "미선택", "",g_popup,"90901", "");
				
				initEventSecondTab();
				initGridSecondTab();
				
				isinitdivCancel=true;
				}
			break;
	}
}