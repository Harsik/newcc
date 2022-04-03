﻿﻿﻿// 조회 조건 및 조회 값
var g_type = "";
var g_resvDt = "";
var g_call = "";
var g_tell = "";
//콜백등록
var g_callBckTelNum = "";
// 콜백 테이블
var g_callBckNum = "";
var g_callBckAniNum = "";
var g_tryCnt = 0;
var g_almYn = "";
var g_imgCall = '&nbsp;&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="btnDialing_clickEvent('+"'T'"+')" class="icon_cal2" id="btnCallDialing"/>';
var g_imgResvCall = '&nbsp;&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="btnDialing_clickEvent('+"'R'"+')" class="icon_cal2" id="btnResvCallDialing"/>';
var saveActStCd = "";
var saveActTypeCd = "";
var suc = 0;
var startCallbckActStCd = "";
var g_comGridType = "";
var g_outTcktId = "";
var g_TcktId = "";

var rcvnCntNm = "";
var rcvnKtrNm = "";
var rcvnExtNm = "";
var rcvnCallNm = "";
var recUrl = "";
var g_chSndId = "";
var test1 = $("#asd").val("all");

var g_oldMainCont=new Object();
var g_oldSubCont=new Object();
var g_rtnArrCont=new Array();

var g_actStDisable=new Array();
g_actStDisable['010100']=[false,false];  // 콜센터대기     [처리유형,처리유형결과]
g_actStDisable['010200']=[false,true];  // 부서접수      
g_actStDisable['010300']=[true,true];  // 담당자지정     
g_actStDisable['020100']=[true,true];  // 담당자처리중    
g_actStDisable['020200']=[true,true];  // 처리완료      
g_actStDisable['030100']=[false,true];  // 담당자(재)지정요청
g_actStDisable['030200']=[false,true];  // 부서(재)지정요청 
 

var g_agentId = window.sessionStorage.getItem("USR_ID");
var g_popup = window.sessionStorage.getItem("POPUP");

var g_changedPassOver=""; // 민원이관 변경여부
var g_dataMainPassOver={};  // 민원이관 데이타 객체
var g_dataSubPassOver={};  // 민원이관 데이타 객체
var g_changedCont=""; // 내용 변경 여부
var g_dataObject={};

//파라미터 셋팅_UserInfo
function getJsonStrComUserInfo(usr_id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMDEuc2VsZWN0",
		"map" : {
			"key" : "value",
			"usr_id" : usr_id
		}
	};
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrCounselspec(tcktId)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "Y2gwMDEuY291bnNlbFNwZWM=",
			"map" : {
				"key" : "value",
				"tcktId" : tcktId
			}
		};
		
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateCounsel
function getJsonStrUpdateCounsel()
{
	var smcd = $("#intvSmCd").val()=="all"?"":$("#intvSmCd").val();
	
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMDEuY291bnNlbFVwZGF0ZQ==",
			"map" : {
				"key" : "value",
				"tcktId" : $("#tcktId").val(),
				"custId" : $("#custId").val(),
				"custNm" : $("#custNm").html(),
				"refId" : $("#refId").val(),
				"actTypeCd" : $("#actTypeCd").val(),
				"rcvCont" : $("#rcvCont").val(),
				"chGbCd" : $("#chGbCd").val(),
				"callGbCd" : $("#callGbCd").val(),
				"actStCd" : $("#actStCd").val(),
				"actCont" : $("#actCont").val(),
//				"intvExCd" : $("#intvExCd").val(),
				"intvLgCd" : $("#intvLgCd").val(),
				"intvMdCd" : $("#intvMdCd").val(),
				"intvSmCd" : smcd,
				"oldActTypeCd" : $("#oldActTypeCd").val(),
				"resvDt" : $("#tfResvDtm").val() != "" ? changeDateString(getResvDate($("#tfResvDtm").val())) : "",
				"resvTm" : $("#tfResvDtm").val() != "" ? changeTimeString(getResvDate($("#tfResvDtm").val())) : "",
				"resvTelNo" : $("#tfResvPhoneNumber").val().replace(/-/gi, "")				
				//"login_usr_id" : window.sessionStorage.getItem("USR_ID")
			}
		};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_resvExctYnUpdate
function getJsonStrUpdateResvExctYn()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDUucmVzdkV4Y3RZblVwZGF0ZQ==",
		"map" : {
			"key" : "value",
			"tcktId" : $("#tcktId").val(),
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateProgram
function getJsonStrDeleteCounsel()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMDEuY291bnNlbERlbGV0ZQ==",
		"map" : {
			"key" : "value",
			"tcktId" : $("#tcktId").val(),
			"useYn" : "N",
			"callbckId" : $("#callBckId").val(),
			"listType" : g_listType
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrResvUpdateListPopup(tcktId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDUucmVzdlVwZGF0ZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId,
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_actStUpdate
function getJsonStrActStUpdatePopup(tcktId, outTcktId)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMDEuYWN0VHlwZVVwZGF0ZQ==",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId,
			"outTcktId" : outTcktId,
			"actStCd" : $("#actStCd").val()
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrCallBackSpec(callbckId)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "Y20wMDYuY2FsbEJhY2tTcGVj",
			"map" : {
				"key" : "value",
				"callbckId" : callbckId,
			}
		};
		
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustInfo
function getJsonStrCustInfoTab(custId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm8=",
		"map" : {
			"key" : "value",
			"cust_id" : custId
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * TicketId 가져옴.
 */
function fnGetRefTicketId() {
	// 티켓아이디를 얻어옴
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/getTicketId.do",
		data : "pJson=" + getJsonStrTicketId(),
		success : function(data)
		{
			$("#refId").val(data.TCKT_ID);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function setSelectBoxWithCnslCode(selBox, lvl, parentCode, defaultValue) {
	var $selBox = $("#" + selBox);
		
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrIntvCdSetSelectBox(lvl, parentCode),
		success : function (data) 
		{
			$selBox.html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
		
			$.each(jr, function(key, state) 
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$selBox.append(value);
			
			if (defaultValue != null && defaultValue != "") {
				$selBox.val(defaultValue);
			}
			
			$selBox.trigger("change");
		}
	});
}

function setSelectBoxWithCnslCodeSync(code1, code2, code3){
    g_popup = window.sessionStorage.getItem("POPUP");
    setObjectSelectBoxWithCode2("intvLgCd", "선택", "1", g_popup, "00000000", code1, "");
    $("#intvLgCd").val(code1);
    setObjectSelectBoxWithCode("intvMdCd", "", "2", g_popup, code1, code2, "");	// 상담유형 대분류 셋팅
    setObjectSelectBoxWithCode("intvSmCd", "", "3", g_popup, code2, code3, "");	// 상담유형 중분류 셋팅
}

//파라미터 셋팅_UpdateCounsel
function getJsonStrUpdateTryCnt(type, cd, tcktId, callbckId)
{
	if(callbckId == "")
		callbckId = $("#callBckId").val();
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDYudXBkYXRlVHJ5SW5mbw==",
		"map" : {
			"key" : "value",
			"callbckActStCd" : '020000',
			"callbckId" : callbckId,
			"outTcktId" : tcktId,
			"tryCnt" :  Number(g_tryCnt) + 1,
			"type" : type
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrGetCounselInfo(tkct_id)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuZ2V0Q291bnNlbEluZm8=",
			"map" : {
				"key" : "value",
				"tckt_id" : tkct_id,
			}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrGetFileInfo(tkct_id, srvy_type_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMTkuZmlsZUxpc3Q=",
			"map" : {
				"key" : "value",
				"tbl_nm" : "ch001",
				"tbl_pk" : tkct_id,
				"tbl_pk2" : srvy_type_cd,
				"orderby" : "crtTime"
			}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function callbackInitInfo()
{
	$("#callbckReq").html("");
	$("#callbckDiv").html("");
	$("#rctTry").html("");
	$("#callbckActStCd").find("option:first").attr("selected", "selected");
	$("#callbckCustNm").html("");
	$("#callbckTelNo").html("");
	$("#callbckAni").html("");
	$("#textAutoRecl").html("");
	
	$("#counselComTable").css("display", "none");
}

function counselInitInfo_M(type, popuptype)
{
	g_type = type;
	recUrl = "";
	
	var argLen=arguments.length;
	if(argLen==2){
		 g_popup=popuptype;
	};
	
	$("#cnslCopyCnslRcvCont").hide();	//com 문의내용 카피
	$("#cnslCopyTransferCont").hide();	// 
	 
	$("#btnSmsSpec").hide();
	$("#btnSmsSend").hide();
	$("#btnListenRec").hide();
	$("#callbckBase").hide();
	$("#btnOutBoundCall").hide();
	$("#btnDelete").hide();
	$("#btnUpdate").hide();
	//$("#btnJisikDbPopup").hide();
	$("#btnCnslHistoryPopup").hide();

	$("#btnMainHis").hide();  // 이관이력1
	$("#btnSubHis").hide();  // 이관이력2

	setObjSelectBoxWithActTypeCd("actTypeCd", "", "", g_popup,"90014",""); // 처리유형
	
	setObjSelectBoxWithCode("chGbCd", "", "",g_popup,"90009", "");	    // 채널구분 셋팅      
	setObjSelectBoxWithCode("callGbCd", "", "",g_popup,"90010", "");	    // 민원구분 셋팅	    
	setObjSelectBoxWithCode("actStCd", "", "",g_popup,"90013", "");	    // 처리상태 셋팅		
	setObjSelectBoxWithCode("rcvnId", "", "",g_popup,"90200", "");	    // 상담유형 대분류 셋팅	
	
	//setObjSelectBoxWithActTypeCd("cnslMainProcSt", "", "", g_popup,"90300",""); // 이관처리상태
	//setObjSelectBoxWithActTypeCd("cnslSubProcSt", "", "", g_popup,"90300",""); // 이관처리상태
	setObjSelectBoxWithCode("cnslMainProcSt", "", "",g_popup,"90300", "");	    // 이관처리상태
	setObjSelectBoxWithCode("cnslSubProcSt", "", "",g_popup,"90300", "");	    // 이관처리상태
	
	setObjSelectBoxWithCode("selCnslKeyWord", "", "",g_popup,"90025", "0");	// 키워드
	
	//setObjSelectBoxWithCode("intvLgCd", "", "",g_popup,"90025", "0");
	// $("#instExCd option:eq(0)").attr("selected", "selected");
	$("#intvLgCd option:eq(0)").attr("selected", "selected");
	$("#intvMdCd option:eq(0)").attr("selected", "selected");
	$("#intvSmCd option:eq(0)").attr("selected", "selected");
	$("#counselText").html("");
	$("#rcvnId").find("option:first").attr("selected", "selected");
	
	$("#resvDt").hide();
	$("#rcvnUsr").hide();
	$("#rcvnId").hide();
	$("#resvTelText").html("");
	$("#tfResvTelNo").hide();
	$("#tfRcvnUsr").hide();
	$("#tfResvDtm").hide();
	$("#armText").html("");
	$("#armUseYn").html("");
	
	$("#imgMainResvPhone").hide();
	
	$("#cstComp").html("");
	$("#tcktId").val("");
	$("#custId").val("");
	$("#rcvUsrNm").html("");
	$("#rcvDt").html("");
	$("#tempTd").html("");
	$("#tempData").html("");
	$("#modUsrNm").html("");	
	$("#modDt").html("");
	$("#rcvCont").val("");
	$("#custNm").html("");
	$("#corpNm").html("");
	$("#cstType").html("");
	$("#cstComp").html("");
	$("#cntctInfm").html("");
	$("#actCont").val("");

	$("#gndr").html("");
	$("#agesCd").html("");
	$("#locYn").html("");
	$("#stayDuration").val("");
	
	$("#callBackRetryCnt").val("");	                                    // 콜백시도
	//호전환
	
	//긴급정보
	$("#tfCnslClaimant").hide();
	$("#tfCnslClaimantPhoneNum").hide();
	$("#tfCnslClaimant").val("");
	$("#tfCnslClaimantPhoneNum").val("");
	
	$("#cntctInform").html(""); // 통화번호
	$("#callTime").html("");    // 통화시간
	$("#tfCounselMemo").val("");    // 메모
	$("#crtUsrNm").html("");    // 등록/일시
	$("#chnlgb").html("");      // 채널구분
	
	$("#cnslCsVltn").val("1");
	$("#tryDt").hide();
	$("#lbCnslSpecTicketNum").html("");
	$("#tfRcvnTeamNm").hide();
	$("#tfActCounselText").hide();
	
	// 담당자 초기화
	$("#comSurveyResponsibleList").html("");
	$("#comSurveyFileList").html("");
	
	$("#comBusinessResponsibleList").html("");
	$("#comBusinessFileList").html("");
	
	// 민원관련 항목
	$("#minwonInfo1").hide();
	$("#minwonInfo2").hide();
	$("#minwonProcDeptInfo").hide();
	$("#minwonProcCont").hide();
	$("#minwonRtnCont").hide();
	$("#TrMinwonProcStatus").hide();
	$("#rdoCnslImmediate").hide();
	$("#rdoCnslSevenDays").hide();
	$("#labRdoCnslImmediateText").hide();
	$("#labRdoCnslSevenDaysText").hide();
	$("#rdoCnslYes").hide();
	$("#rdoCnslNo").hide();
	$("#labRdoYesText").hide();
	$("#labRdoNoText").hide();
	
	$("#btnTransfCont").hide();
	$("#trnrMinCont").hide();
}

//저장 및 수정 예외 처리
function checkUserSpec(queryType)
{
	var rMsg = "";	
	
	if(g_listType != "callBack")
	{
		if($("#tcktId").val() == "")
		{
			rMsg = "선택되지 않았습니다.";
			return rMsg;
		}
	}
	else
	{
		if($("#callBckId").val() == "")
		{
			rMsg = "선택되지 않았습니다.";
			return rMsg;
		}
	}
	if(queryType != "delete")
	{
		if($("#rcvCont").val() == "")
			rMsg += "\n\n문의내용을 입력 해 주세요.";
	}
	return rMsg;
}

// 청취 버튼 클릭 이벤트
function btnListenRecPopup_clickEvent()
{
	var pCallId=$("#hidCallId").val();
	// alert("pCallId : " + pCallId);
	
	if(pCallId == "" || pCallId == undefined){
		return;
	}
	
	listenRecPopup("","","",pCallId);
	
}

//문자 버튼 클릭 이벤트
function btnSmsSpecPopup_clickEvent()
{
	window.sessionStorage.setItem("smsSpecChSndId", g_chSndId);
	
	var width = 1200;
	var height = 400;
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/smsSendSpec.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "SMSSPEC", option);
	newWindow.focus();
}

//수정 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	var rMsg = checkUserSpec("update");
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	/*
	if(saveActTypeCd == '020000')
	{
		if(saveActStCd != $("#actStCd").val() && $("#actStCd").val() == '030000') //처리상태 완료로 저장시
		{
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/resvUpdateList.do",
				data : "pJson=" + getJsonStrResvUpdateListPopup($("#tcktId").val()),
				success : function(data)
				{
					$.each(data, function(key, state)
					{
						if(state.OUT_TCKT_ID == null) 
						{
							resvCallStateUpdatePopup(state.TCKT_ID, "");
						} 
						else 
						{
							resvCallStateUpdatePopup(state.TCKT_ID, state.OUT_TCKT_ID); 
						}
					});
					if(suc != 0)
					{
						suc = 0;
						counselUpdate();
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
		else
		{
			counselUpdate();
		}
	}
	else
	*/
	//{
		//counselUpdate();
		fnSaveCounsel();
	//}
}

function fnSaveCounsel() 
{
	var refId = $("#refId").val();
	
	if (refId == null || refId == '') {
		fnGetRefTicketId();
		setTimeOut(counselUpdate, 500);
	} else {
		counselUpdate();
	}
}

function counselUpdate()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/counselUpdate.do",
		data : "pJson=" + getJsonStrUpdateCounsel(),
		success : function(data)
		{
			if(g_type == "list")
				counselInitInfo_M(g_type);
			
			opener.parent.refreshNotyetCnt();
   			opener.parent.reloadGrid();
   			
	   		alert("저장 되었습니다.");

	   		/*
	   		if(document.title == "상담이력목록")
	   		{
	   			opener.parent.refreshNotyetCnt();
	   			opener.parent.reloadGrid();
	   		}
	   		*/
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//삭제 버튼 클릭 이벤트
function btnDelete_clickEvent()
{
	var rMsg = checkUserSpec("delete");
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	if (confirm("삭제를 하시겠습니까?") == true)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/counselUpdate.do",
			data : "pJson=" + getJsonStrDeleteCounsel(),
			success : function(data)
			{
				counselInitInfo_M();
		   		alert("삭제되었습니다.");
		   		
		   		if(document.title == "상담이력목록")
		   		{
		   			opener.parent.refreshNotyetCnt();
		   			opener.parent.reloadGrid();
		   		}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	{
		return;
	}
}

//jquery dateTimePicker
function counselDateTimePicker_M()
{
	$("#tfResvDtm").datetimepicker({
		lang : "ko",
		format : "Y-m-d H:i",
		allowTimes : [
		              "08:00", "08:10", "08:20", "08:30", "08:40", "08:50",
		              "09:00", "09:10", "09:20", "09:30", "09:40", "09:50",
		              "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
		              "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
		              "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
		              "13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
		              "14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
		              "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
		              "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
		              "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
		              "18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
		              "19:00", "19:10", "19:20", "19:30", "19:40", "19:50"
		              ],
		step : 10
	});
}

function callBackInitTable(callBackId, tryCnt)
{
	setSelectBoxWithCode("callbckActStCd", "", "90020", "", "", "");	// 처리유형 셋팅	
	callbackInitInfo();
	counselInitInfo_M();
	g_tryCnt = tryCnt;
	g_listType = "callBack";
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/resvUpdateList.do",
		data : "pJson=" + getJsonStrCallBackSpec(callBackId),
		success : function(data)
		{
			if(data.CALLBCK_ACT_ST_CD == '030000' && data.OUT_TCKT_ID != null)
			{
				$("#btnOutBoundCall").hide();
				$("#callBackTable").css("display", "block");
				$("#counselComTable").css("display", "block");
				counselInitTable_M(data.OUT_TCKT_ID, 'list');
			}
			else
			{
				$("#btnOutBoundCall").show();
				$("#callBackTable").css("display", "block");
				$("#counselComTable").css("display", "none");
			}
			
			$("#callBckId").val(data.CALLBCK_ID);
			$("#callbckReq").html(data.CALLBCK_REQ_FORMAT);
			$("#callbckDiv").html(data.CALLBCK_DIV_FORMAT);
			$("#rctTry").html(data.RCT_TRY_FORMAT);
			$("#callbckActStCd").val(data.CALLBCK_ACT_ST_CD);
			$("#callbckCustNm").html(data.CALLBCK_CUST_NM);
			g_callBckNum = data.CALLBCK_TEL_NO_FORMAT;
			if(data.CALLBCK_ACT_ST_CD != null && data.CALLBCK_ACT_ST_CD != " ")
				$("#callbckTelNo").html(data.CALLBCK_TEL_NO_FORMAT + '&nbsp;&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="btnDialing_clickEvent('+"'CB'"+')" class="icon_cal2" id="btnCallDialing"/>');
			else
				$("#callbckTelNo").html(data.CALLBCK_TEL_NO_FORMAT);
			g_callBckAniNum = data.CALLBCK_ANI_FORMAT;
			if(data.CALLBCK_ACT_ST_CD != null && data.CALLBCK_ACT_ST_CD != " ")
				$("#callbckAni").html(data.CALLBCK_ANI_FORMAT + '&nbsp;&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="btnDialing_clickEvent('+"'ANI'"+')" class="icon_cal2" id="btnCallDialing"/>');
			else
				$("#callbckAni").html(data.CALLBCK_ANI_FORMAT);
			$("#textAutoRecl").html(data.AUTO_RECL);
			$("#tryDt").val(data.rct_try_format);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

/**
 * 상담상세
 * 
 * 1. 처리유형에 따라 항목변경
 * 2. 상담내용 수정
 *    - 관리자의 경우는 항상수정 가능
 *    - 상담사의 경우는 상담당일에만 수정가능. 
 *    
 * @param tcktId
 * @param type
 */
function fnCounselInit(tcktId, type) {
	var fTcktId = tcktId;
	var fType = type;
	
	try {
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/counselSpec.do",
			data : "pJson=" + getJsonStrCounselspec(tcktId),
			success : function(data) 
			{
				$("#btnOutBoundCall").hide();                                               // 콜백인 경우만 보여지도록 처리한다.
				$("#counselText").html("");
				$("#resvTelText").html("");
				$("#tfResvDtm").hide();                                                     // 예약일시
				$("#tfRcvnUsr").hide();
				$("#tfResvPhoneNumber").hide();                                             // 예약전화번호
				
				var recUrl = data.RECD_ID;
				
				// 녹취청취 버튼
				if(recUrl == null || recUrl == "")
					$("#btnListenRecPopup").hide();
				else
					$("#btnListenRecPopup").show();
				
				//2018.11.19
				if(window.sessionStorage.getItem("USR_GRD_CD") == "010100" &&
	   					window.sessionStorage.getItem("USR_ID") != data.MOD_USR_ID){
	   				$("#btnListenRecPopup").hide();
	   			}
				
				$("#rcvDt").html(data.RCV_DT_FORMAT + " " + data.RCV_TM_FORMAT);            // 접수일시
				
				$("#cntctInfm").html(data.CNTCT_INFM);

                setSelectBoxWithCnslCodeSync(data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);
				
				$("#rcvCont").val(data.RCV_CONT);
				$("#actCont").val(data.ACT_CONT);
				$("#cstType").html(data.CST_TYPE_NM);
				$("#cstComp").html(data.CST_COMP_NM);
				$("#custNm").html(data.CUST_NM);				
				$("#actTypeCd").val(data.ACT_TYPE_CD);            // 처리유형 코드
				$("#oldActTypeCd").val(data.ACT_TYPE_CD);         // 처리유형 코드변경시 기존 데이터 처리를 위해 사용.
				$("#custId").val(data.CUST_ID);
				$("#tcktId").val(data.TCKT_ID);	
				$("#refId").val(data.REF_ID);
				
				var rec_param = data.RCV_DT+"|"+data.CALL_ID+"|"+data.CTI_LGN_ID;
				$("#hidCallId").val(rec_param);
								
				switch(data.ACT_TYPE_CD)
				{
				case "020000": // 통화예약
					$("#counselText").html("예약일시");
					$("#resvTelText").html("예약번호");
					
					$("#tfResvDtm").show();
					$("#tfResvPhoneNumber").show();
					
					$("#tfResvDtm").val(data.RESV_DT_FORMAT + " " + data.RESV_TM_FORMAT);
					$("#tfResvPhoneNumber").val(data.RESV_CNTCT_INFM_FORMAT);
					break;
				case "030100": // 민원이관
					// 조직도 팝업
					break;
				case "030200": // 호전환
				case "030300": // 상담후 호전환
				case "030500": // 담당자부재중
					break;
				case "030400": // ARS호전환
					break;
				case "040000": // 콜백등록
					$("#counselText").html("등록대상");
					$("#resvTelText").html("콜백번호");
					
					$("#tfRcvnUsr").show();
					$("#tfRcvnUsr").val(data.CALLBACK_USR_NM);
					$("#callbackUsrId").val(data.CALLBCK_USR_ID);
					$("#tfResvPhoneNumber").show();
					$("#tfResvPhoneNumber").val(data.CALLBCK_TEL_NO_FORMAT);
					// 조직도 팝업
					break;
				default:
					break;
				}
				
				$("#tcktId").val(data.TCKT_ID);
				$("#callGbCd").val(data.CALL_GB_CD);
				$("#actStCd").val(data.ACT_ST_CD);
				$("#callTime").html(data.CALL_TIME);
				
				$("#actTypeCd").prop("disabled", true);
				$("#intvLgCd").prop("disabled", true);
				$("#intvMdCd").prop("disabled", true);
				$("#intvSmCd").prop("disabled", true);
				$("#chGbCd").prop("disabled", true);
				$("#callGbCd").prop("disabled", true);
				$("#actStCd").prop("disabled", true);
				$("#rcvCont").prop("disabled", true);
				$("#actCont").prop("disabled", true);
				
				$("#btnTabCustSearch").hide();
				$("#btnUpdate").hide();				
				
				if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100" ) // 팀장이상
				{
					$("#actTypeCd").prop("disabled", false);
					$("#intvLgCd").prop("disabled", false);
					$("#intvMdCd").prop("disabled", false);
					$("#intvSmCd").prop("disabled", false);
					$("#chGbCd").prop("disabled", false);
					$("#callGbCd").prop("disabled", false);
					$("#actStCd").prop("disabled", false);
					$("#rcvCont").prop("disabled", false);
					$("#actCont").prop("disabled", false);
					
					$("#btnTabCustSearch").show();
					//$("#btnUpdate").show();
				} 
				else if (data.RCV_DT_FORMAT == getDate()) 
				{
					$("#actTypeCd").prop("disabled", false);
					$("#intvLgCd").prop("disabled", false);
					$("#intvMdCd").prop("disabled", false);
					$("#intvSmCd").prop("disabled", false);
					$("#chGbCd").prop("disabled", false);
					$("#callGbCd").prop("disabled", false);
					$("#actStCd").prop("disabled", false);
					$("#rcvCont").prop("disabled", false);
					$("#actCont").prop("disabled", false);
				}
				
				if (window.sessionStorage.getItem("USR_GRD_CD") >= "050100" ) // 센터장 이상
				{
					$("#btnUpdate").show();
				}
				
				$("#crtDt").html(data.CRT_DT_FORMAT + " " +data.CRT_TM_FORMAT);
				$("#crtNm").html(data.CRT_USR_NM);
				$("#modDt").html(data.MOD_DT_FORMAT + " " +data.MOD_TM_FORMAT);
				$("#modNm").html(data.MOD_USR_NM);
			}
		});
	} catch (e) {
		//fnCounselInit(fTcktId, fType);
		alert("eeer");
	}
}

function fnCounselEvent_M() {
	//변경 사항 체크
	g_changedCont="";
	g_changedPassOver="";
	g_rtnArrCont=["",""];
}

function counselInitTable_M(tcktId, type, gridType) {	
	g_type = type; // list
	g_comGridType = gridType; // counsel
	recUrl = "";
	
	fnCounselEvent_M();
	
	if(g_type != "list")
	{		
		counselDateTimePicker_M();
		counselInitInfo_M("");
		counselButtonEvent_M();		
		$("#callBackTable").css("display", "none");
	};
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		cache : false,
		url : getContextPath() + "/ajax/counsel/counselSpec.do",
		data : "pJson=" + getJsonStrCounselspec(tcktId), 
		success : function(data)
		{
			// 수정시 체크를 위해 전체객체 저장
			g_dataObject=data;
			
			var usrGrdCd = parseInt(window.sessionStorage.getItem("USR_GRD_CD"), 10);
			var usrId = window.sessionStorage.getItem("USR_ID");
			
			$("#btnListenRecPopup").hide();

//			if (usrGrdCd >= 50100) {
			if (usrGrdCd >= 30100) {
				$("#btnListenRecPopup").show();
			} else if (usrId == data.RCV_USR_ID) {
				$("#btnListenRecPopup").show();
			}
			
			//친절도
			if(data.ACT_TYPE_CD=="030200" || data.ACT_TYPE_CD=="030300" || data.ACT_TYPE_CD=="030500"){
				$("#tdkeyword").html("친절도");
				$("#selCnslKeyWord").hide();
				$("#star_rating").show();
				$("#star_rating").empty();
				$.ratePicker("#star_rating",{cursor:false,stars:data.CNSL_CS_VLTN});	
			}else{
				$("#tdkeyword").html("");
				$("#selCnslKeyWord").show();
				$("#star_rating").hide();
			};
			
			if(tcktId != ""){
				$("#tcktId").val(data.TCKT_ID);
			}else{
				$("#tcktId").val("");
			};
	
			$("#btnListenRec").show();
			$("#btnUpdate").hide();
			$("#btnDelete").hide();
			//$("#btnJisikDbPopup").show();
			
			$("#btnTabCustSearch").hide();                              // 고객정보 수정 버튼
			$("#cstType").prop("disabled", true);                       // 고객구분
			$("#cstComp").prop("disabled", true);                       // 고객성향
			
			$("#callGbCd").prop("disabled", false);                      // 콜구분
			$("#actTypeCd").prop("disabled", true);                     // 처리유형
			$("#actStCd").prop("disabled", true);                       // 상담결과
			
			//(처리유형) 민원이관 초기화
			$("#actTypeCd option:eq(0)").prop("disabled", false);
			$("#actTypeCd option:eq(1)").prop("disabled", false);
			$("#actTypeCd option:eq(2)").prop("disabled", false);
			$("#actTypeCd option:eq(3)").prop("disabled", false);
			$("#actTypeCd option:eq(4)").prop("disabled", false);
			$("#actTypeCd option:eq(5)").prop("disabled", false);
	
			$("#counselText").html("");		
			$("#tfResvDtm").hide();                                     // 통화예약일시
			$("#custNm").html("");	                                   // 고객명
			
			$("#callTime").html("");                                    // 통화시간
			$("#tfCounselMemo").val("");                                // 메모
			$("#resvTelText").html("");

			$("#tfRcvnUsr").hide();                                     // 등록대상
			$("#tfRcvnTeamNm").hide();
			$("#tfResvTelNo").hide();                                   // 통화예약번호
			$("#imgMainResvPhone").hide();
			$("#selCnslKeyWord").prop("disabled", true);                // 키워드
			$("#crtDt").html("");                                       // 등록일시
			$("#crtUsrNm").html("");                                    // 등록자
			$("#modDt").html("");                                       // 수정일시
			$("#modUsrNm").html("");                                    // 수정자
			//$("#intvExCd").prop("disabled", true);                    // 기관구분
			$("#intvLgCd").prop("disabled", true);                      // 상담유형 대
			$("#intvMdCd").prop("disabled", true);                      // 상담유형 중
			$("#intvSmCd").prop("disabled", true);                      // 상담유형 소
			$("#rcvCont").val("");                                      // 문의내용
			$("#actCont").val("");                                      // 처리내용
			
			$("#cstComp").html("");                                     // 민원인성향
			
			// 콜백 
			$("#callBackRetryCnt").val("");	                           // 콜백시도
			
			//호전환
			
			//긴급정보
			$("#tfCnslClaimant").hide();
			$("#tfCnslClaimantPhoneNum").hide();
			$("#tfCnslClaimant").val("");
			$("#tfCnslClaimantPhoneNum").val("");
			
			// 민원이관 관련 상세정보
			$("#minwonInfo1").hide();
			$("#minwonInfo2").hide();
			$("#minwonProcDeptInfo").hide();
			$("#minwonProcCont").hide();
			$("#minwonRtnCont").hide();
			$("#TrMinwonProcStatus").hide();
			
			$("#counselInfo").show();
			
			$("#actCounselText").html("");
			$("#tfActCounselText").val("");
			$("#tfActCounselText").hide();
						
			$("#rdoCnslImmediate").hide();
			$("#rdoCnslSevenDays").hide();
			$("#labRdoCnslImmediateText").hide();
			$("#labRdoCnslSevenDaysText").hide();
			
			$("#transfRsltText").html("");
			$("#rdoCnslYes").hide();
			$("#rdoCnslNo").hide();
			$("#labRdoYesText").hide();
			$("#labRdoNoText").hide();
			
			// 이관민원
			$("#tfActCounselText").val("");
			$("#tfResvTelNo").val(""); 	
			
			$("#cnslMainProcSt option:eq(0)").attr("selected", "selected");
			$("#cnslMainProcDtm").html("");
			
			$("#cnslSubProcSt option:eq(0)").attr("selected", "selected");
			$("#cnslSubProcDtm").html("");

			$("#tfCnslMainDepartment").val("");
			$("#cnslMainUsr").val("");
			$("#tfCnslSubDepartment").val("");
			$("#cnslSubUsr").val("");
			
			$("#cnslMainProcCont").val("");
			$("#cnslSubProcCont").val("");
			$("#tfCnslMainRtnCont").val("");
			$("#tfCnslSubRtnCont").val("");
			
			$("#rcvCont").css('height', '173px');
			$("#actCont").css('height', '173px');
			$("#btnTransfCont").hide();
			
			$("#trnrMinCont").val("");
			$("#trnrMinCont").hide();
			
			$("#cnslMainTeamCd").val("");                    // 주관부서 팀코드
			$("#cnslMainDeptCd").val("");                    // 주관부서 코드
			$("#cnslMainAffairUsrId").val("");               // 주관부서 서무 사용자ID
			$("#cnslMainAffairUsrNm").val("");               // 주관부서 서무 사용자명
			$("#cnslMainAffairTelNo").val("");               // 주관부서 서무 전화번호
			$("#cnslMainAffairMobile").val("");              // 주관부서 서무 휴대폰
			$("#tfCnslMainDepartment").val("");               

			$("#cnslSubTeamCd").val("");                     // 보조부서 팀코드
			$("#cnslSubDeptCd").val("");                     // 보조부서 코드
			$("#cnslSubAffairUsrId").val("");                // 보조부서 서부 사용자ID
			$("#cnslSubAffairUsrNm").val("");                // 보조부서 서무 사용자명
			$("#cnslSubAffairTelNo").val("");                // 보조부서 서무 전화번호   
			$("#cnslSubAffairMobile").val("");               // 보조부서 서무 휴대폰   
			$("#tfCnslSubDepartment").val("");               
			
			$("#cnslCopyCnslRcvCont").hide();
			$("#cnslCopyTransferCont").hide();
			
			$("#btnCnslHistoryPopup ").hide();  				// 변경이력
			$("#btnMainHis").hide();  						// 이관이력1
			$("#btnSubHis").hide();  						// 이관이력2
			
			$("#labNote").html("");
			
			$("#cnslMainProcSt").prop("disabled", false);	//이관민원 주관부서 처리상태
			$("#cnslSubProcSt").prop("disabled", false);  	//이관민원 보조부서 처리상태
			$("#cnslMainProcSt option:eq(0)").prop("disabled", false);
			$("#cnslSubProcSt option:eq(0)").prop("disabled", false);
			$("#btnCnslMainDepartmentSearch").prop("disabled",false);
			$("#btnCnslSubDepartmentSearch").prop("disabled",false);
					
			var deptChange="disabled";
			
			var temp_Rcv_usr_id= "";
			if(!data.RCV_USR_ID){
				temp_Rcv_usr_id= "";
			}else {
				temp_Rcv_usr_id=data.RCV_USR_ID;
			};
			
			if(data.B3_RCV_DT > data.RCV_DT_FORMAT){
				$("#labNote").html("** 3일이상 경과한 이력을 수정하려면 관리자에게 요청 바랍니다.");
			};
			
			if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100" ) // 관리자
			{
				$("#btnUpdate").show();
				$("#btnDelete").show();
				$("#btnTabCustSearch").show();                              // 고객정보 수정 버튼
				$("#cstType").prop("disabled", false);                      // 고객구분
				$("#cstComp").prop("disabled", false);                      // 고객성향
				$("#callGbCd").prop("disabled", false);                     // 콜구분
				$("#actTypeCd").prop("disabled", false);                    // 처리유형
				$("#actStCd").prop("disabled", false);                      // 처리상태
				//$("#intvExCd").prop("disabled", false);                   // 기관구분
				$("#intvLgCd").prop("disabled", false);                     // 상담유형 태
				$("#intvMdCd").prop("disabled", false);                     // 상담유형 중
				$("#intvSmCd").prop("disabled", false);                     // 상담유형 소
				$("#selCnslKeyWord").prop("disabled", false);               // 키워드
				
				$("#labNote").html("");
				deptChange="";       //부서버튼
			} else if ( g_agentId != temp_Rcv_usr_id) {
				$("#btnUpdate").hide();
				$("#btnDelete").hide();
				$("#btnListenRec").hide();                              	  // 고객정보 수정 버튼
				$("#cstType").prop("disabled", true);                      // 고객구분
				$("#cstComp").prop("disabled", true);                      // 고객성향
				$("#callGbCd").prop("disabled", true);                     // 콜구분
				$("#actTypeCd").prop("disabled", true);                    // 처리유형
				$("#actStCd").prop("disabled", true);                      // 처리상태
				//$("#intvExCd").prop("disabled", true);                   // 기관구분
				$("#intvLgCd").prop("disabled", true);                     // 상담유형 대
				$("#intvMdCd").prop("disabled", true);                     // 상담유형 중
				$("#intvSmCd").prop("disabled", true);				      // 상담유형 소
				$("#selCnslKeyWord").prop("disabled", true);               // 키워드
				
				deptChange="disabled";       //부서버튼
			} else if (data.B3_RCV_DT <= data.RCV_DT_FORMAT) {
				$("#btnUpdate").show();
				//$("#btnDelete").show();
				$("#btnTabCustSearch").show();                             // 고객정보 수정 버튼
				$("#cstType").prop("disabled", false);                     // 고객구분
				$("#cstComp").prop("disabled", false);                     // 고객성향
				$("#callGbCd").prop("disabled", false);                    // 콜구분
				$("#actTypeCd").prop("disabled", false);                   // 처리유형
				$("#actStCd").prop("disabled", false);                     // 처리상태
				//$("#intvExCd").prop("disabled", false);                  // 기관구분
				$("#intvLgCd").prop("disabled", false);                    // 상담유형 대
				$("#intvMdCd").prop("disabled", false);                    // 상담유형 중
				$("#intvSmCd").prop("disabled", false);				      // 상담유형 소
				$("#selCnslKeyWord").prop("disabled", false);              // 키워드
				
				$("#labNote").html("");
				deptChange="";       //부서버튼
			}; 
			
			if(tcktId != ""){
				saveActTypeCd = data.ACT_TYPE_CD;
			}else{
				saveActTypeCd = "";
			};
			
			switch(saveActTypeCd) {
			case "020000":
				$("#counselText").html("재통화일시");
				$("#resvTelText").html("재통화번호");
				$("#tfResvDtm").show();				
				$("#tfResvTelNo").show();
				$("#tfResvDtm").val(data.RESV_DT_FORMAT + " " + data.RESV_TM_FORMAT);    // 예약일시
				$("#tfResvTelNo").width(130);
				$("#tfResvTelNo").css('text-align', 'center');
				$("#imgMainResvPhone").show();
				
				$("#tfResvTelNo").val(data.RESV_CNTCT_INFM_FORMAT);
				setPhoneNumFormat("tfResvTelNo");
				break;
			case "030100": // 민원이관
				$("#labNote").html(""); // 3일이상 문구
				$("#btnUpdate").show(); // 저장
//					$("#btnUpdate").hide(); // 저장
				$("#btnDelete").hide();//민원이관 삭제 안됨
				
				$("#counselText").html("처리기한");
				$("#actCounselText").html("민원인");
				$("#resvTelText").html("연락처");
				$("#transfRsltText").html("결과수신");				
				
				$("#tfActCounselText").show();
				$("#tfResvTelNo").show();
				$("#tfResvTelNo").width(130);
				$("#tfResvTelNo").css('text-align', 'center');
				
				$("#rdoCnslImmediate").show();
				$("#rdoCnslSevenDays").show();
				$("#labRdoCnslImmediateText").show();
				$("#labRdoCnslSevenDaysText").show();

				$("#rdoCnslYes").show();
				$("#rdoCnslNo").show();
				$("#labRdoYesText").show();
				$("#labRdoNoText").show();			
	 			
				$("#btnTransfCont").show();
				transfSizeControl(); // 1
				
				$("#trnrMinCont").show();
				
				$("#cnslCopyCnslRcvCont").show();
				$("#cnslCopyTransferCont").show();
				fnSetMinwonInformation(tcktId,true);
				setPhoneNumFormat("tfResvTelNo");
				break;
			case "030200": // 호전환
			case "030300": // 상담후 호전환
			case "030500": // 담당자 부재중
				$("#transferOrg").val(data.TRNR_CAT);
				if(deptChange==""){
					$("#counselText").html("담당부서");
					$("#tfRcvnTeamNm").prop("disabled",false);
					$("#tfActCounselText").prop("disabled",false);
					$("#tfResvTelNo").prop("disabled",false);
				}else{
					$("#counselText").html("담당부서");
					$("#tfRcvnTeamNm").prop("disabled",true);
					$("#tfActCounselText").prop("disabled",true);
					$("#tfResvTelNo").prop("disabled",true);
				}
				$("#tfRcvnTeamNm").show();
				$("#tfRcvnTeamNm").val(data.TRNR_RCVN_TEAM_NM);
				$("#actCounselText").html("담당자");
				$("#tfActCounselText").show();
				$("#tfActCounselText").val(data.TRNR_RCVN_USR_NM);
				$("#resvTelText").html("전화번호");
				$("#tfResvTelNo").show();
				$("#tfResvTelNo").width(130);
				$("#tfResvTelNo").css('text-align', 'center');
				$("#tfResvTelNo").val(getPhoneNumFormat(data.TRNR_RCVN_TEL_NO));
				setPhoneNumFormat("tfResvTelNo");
				break;
			case "030400": // ARS호전환
				break;
			case "040000": // 콜백등록
				$("#counselText").html("등록대상");
				$("#resvTelText").html("콜백번호");
				$("#callbackUsrId").val(data.CALLBCK_USR_ID);
				$("#tfRcvnUsr").show();
				$("#tfResvUsr").val(data.CALLBACK_USR_NM);
				$("#tfResvTelNo").show();
				$("#tfResvTelNo").width(130);
				$("#tfResvTelNo").css('text-align', 'center');
				$("#tfResvTelNo").val(data.CALLBCK_TEL_NO_FORMAT);
				// 조직도 팝업
				break;
			default:
				break;
			};
			
			if (tcktId != "") {
				//청취용
				if(!data.CALL_ID){
					$("#btnListenRec").hide();
				};
				
				if(data.MOD_CONT=="Y"){
					$("#btnCnslHistoryPopup ").show();  // 변경이력
				};
				
				var rec_param = data.RCV_DT+"|"+data.CALL_ID+"|"+data.CTI_LGN_ID;
				$("#hidCallId").val(rec_param);
				
				$("#refId").val(data.REF_ID);                                                                            // 참조ID
				$("#rcvDt").html(data.RCV_DT_FORMAT + " " + data.RCV_TM_FORMAT);                                         // 접수일시
				$("#custId").val(data.CUST_ID);
				$("#custNm").html(data.CUST_NM);                                                                         // 고객명
				$("#cstType").html(data.CST_TYPE_NM);                                                                    // 고객구분
			
				// 고객성향
				if (data.CST_COMP_NM2 != undefined && data.CST_COMP_NM2 != "") {
					$("#cstComp").css("color", "red");
					$("#cstComp").html(data.CST_COMP_NM + " > " + data.CST_COMP_NM2);
				} else {
					$("#cstComp").css("color", "black");
					$("#cstComp").html(data.CST_COMP_NM);                                                                    
				}; 
				
				$("#callGbCd").val(data.CALL_GB_CD);
				$("#cntctInform").html(data.CNTCT_INFM);                                                          		// 연결전화번호
				$("#actTypeCd").val(data.ACT_TYPE_CD);                                                                   // 처리유형
				$("#oldActTypeCd").val(data.ACT_TYPE_CD);			
	
				$("#callTime").html(data.CALL_TIME);                                                                     // 통화시간			
				$("#tfCounselMemo").val(data.MEMO);                                                                      // 메모
				$("#crtDt").html(data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT);                                         // 등록일시
				$("#modDt").html("&nbsp; "+data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT+ "<br>&nbsp; "+ data.MOD_USR_NM); // 최종수정
				$("#chnlgb").html(data.CH_GB_NM);                                                                    	// 최종수정자
				$("#actStCd").val(data.ACT_ST_CD);                                                                       // 처리상태(상담결과)
				
				$("#gndr").html(data.GNDR);
				$("#agesCd").html(data.AGES_CD);
				$("#locYn").html(data.LOC_YN);
				$("#stayDuration").val(data.STAY_DRTN);
				
				//상담유형분류 
				if (data.INTV_LG_CD==null || data.INTV_LG_CD=="") {
					setSelectBoxWithCodeSync_M("all", data.INTV_MD_CD, data.INTV_SM_CD);          								// 상담유형 object
				} else {
					setSelectBoxWithCodeSync_M(data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);      							// 상담유형 object
				};                
  
				// 긴급통화 코드  
				$("#tfCnslClaimant").val(data.RPT);
				$("#tfCnslClaimantPhoneNum").val(data.RPT_CNTCT_INFM);
				
				$("#rcvCont").val(data.RCV_CONT);
				$("#actCont").val(data.ACT_CONT);
				saveActStCd=data.ACT_ST_CD;
				
				$("#selCnslKeyWord").val(data.KEYWORDCD);
			} else {
                $("#intvLgCd").val("10000000").trigger("change")
			};
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//부서팝업
function btnDeptCick(){
	window.sessionStorage.setItem("fromFlag", "fromCounselSpec");
	window.sessionStorage.setItem("corpOpenType", "doCorp");
	openMenuPopup("CM0311");
}

function fnSetMinwonInformation(tcktId,bAsync)
{
	$("#cnslMainProcDtm").html("");
	g_dataMainPassOver={};
	g_dataSubPassOver={};
	
	// 이관정보 조회
	$.ajax({
		type : "post",
		dataType : "json",
		async : bAsync,
		url : getContextPath() + "/ajax/counsel/counselSpec.do",
		data : "pJson=" + getJsonStrMinwonSpec(tcktId),
		success : function(data) 
		{
			var tmp="";
			var trContLen=0;
			var contLen=0;
			var rsnLen=0;
			var szLength = data.length;
				if (szLength > 0) {
					 g_dataMainPassOver=data[0];
					 
					$("input[name='rdoCnslReq']").filter('[value=' + data[0].RQS_GB + ']').prop("checked", true);
					$("input[name='rdoCnslResult']").filter('[value=' + data[0].CVL_RSLT_RCV_YN + ']').prop("checked", true);
				
					$("#tfActCounselText").val(data[0].CTZN);
					$("#tfResvTelNo").val(getPhoneNumFormat(data[0].CTZN_TEL_NO));
					$("#trnrMinCont").val(data[0].TNTR_CONT);
					
					$("#cnslMainProcSt").prop("disabled",true);
					$("#cnslSubProcSt").prop("disabled",true);
					
					//처리유형) 민원이관과 직접상담만 가능
					$("#actTypeCd option:eq(1)").prop("disabled", true);
					$("#actTypeCd option:eq(3)").prop("disabled", true);
					$("#actTypeCd option:eq(4)").prop("disabled", true);
					$("#actTypeCd option:eq(5)").prop("disabled", true);
					
					// 민원이관상세 주관부서가 있는 경우
					if(data[0].ORG_ID){
						var name = data[0].USR_NM != '' ? data[0].USR_NM : data[0].AFFS_USR_NM;
						var id = data[0].ORG_USR_ID != '' ? data[0].ORG_USR_ID : data[0].AFFS_ORG_USR_ID;
						var tel = data[0].TEL_NO != '' ? data[0].TEL_NO : data[0].AFFS_OFCE_TEL_NO;
						g_oldMainCont["exist"]="main";
						$("#tfCnslMainDepartment").val(data[0].ORG_ID+"|"+id+"|"+name+"|"+tel);
						$("#cnslMainUsr").val(data[0].ORG_FUL_NM.replace("순천시청 ", "") +" > "+ name);
	
						$("#cnslMainProcDtm").html(data[0].MOD_DTM_FORMAT);
	
						$("#cnslMainProcCont").val(data[0].CVL_ACT_CONT); // 처리민원1
						$("#tfCnslMainRtnCont").val(data[0].RTN_RSN);     // 반송사유
	
						//hide
						$("#cnslMainAffairUsrId").val(data[0].AFFS_ORG_USR_ID);
						$("#cnslMainAffairTelNo").val(data[0].AFFS_OFCE_TEL_NO);
						$("#cnslMainAffairUsrNm").val(data[0].AFFS_USR_NM);
						$("#cnslMainTeamCd").val(data[0].ORG_ID);
						$("#cnslMainDeptCd").val(""); //사용안함  
						$("#cnslMainAffairMobile").val(data[0].AFFS_ORG_MOBILE);
						$("#cnslMainAffairYN").val(data[0].CC_AFFAIRS_YN);
						
						setOptionTagDisabled(data[0].CC_AFFAIRS_YN);
					}else{
						g_oldMainCont["exist"]="";
					}
					 
					if(!data[0].TNTR_CONT){
						trContLen=0;
					}else{ 
						trContLen=data[0].TNTR_CONT.length;
					}
					
					if(!data[0].CVL_ACT_CONT){
						contLen=0;
					}else{ 
						contLen=data[0].CVL_ACT_CONT.length;
					}
					
					if(!data[0].RTN_RSN){
						rsnLen=0;
					}else{ 
						rsnLen=data[0].RTN_RSN.length;
					}
					
					g_oldMainCont["rdoCnslReq"]=data[0].RQS_GB;
					g_oldMainCont["rdoCnslResult"]=data[0].CVL_RSLT_RCV_YN;
					if(!data[0].CTZN){
						tmp="";
					}else{ 
						tmp=data[0].CTZN;
					}
					g_oldMainCont["tfActCounselText"]=tmp;
					if(!data[0].CTZN_TEL_NO){
						tmp="";
					}else{ 
						tmp=data[0].CTZN_TEL_NO;
					}
					g_oldMainCont["tfResvTelNo"]=tmp;
					
					g_oldMainCont["trnrMinConttrnrMinCont"]=data[0].TNTR_CONT;
					if(!data[0].CVL_ACT_ST_CD){
						tmp="010100";
					}else{
						tmp=data[0].CVL_ACT_ST_CD;
						if(data[0].CVL_ACT_ST_CD > "010100"){ 
							//접수에서 대기로는 바꿀수 없게
							$("#cnslMainProcSt option:eq(0)").prop("disabled", true);
							$("#btnMainHis").show();  // 이관이력1
						}
					}
					
					var actStat=tmp;
					$("#cnslMainProcSt").val(actStat); 

					var usrGrade=window.sessionStorage.getItem("USR_GRD_CD");
					if (usrGrade < "030100" ){
						$("#actTypeCd").prop("disabled", true);
						$("#actStCd").prop("disabled", g_actStDisable[actStat][1]);
					}else{
						$("#actTypeCd").prop("disabled", g_actStDisable[actStat][0]);
						$("#actStCd").prop("disabled", g_actStDisable[actStat][1]);
						$("#cnslMainProcSt").prop("disabled",false);
						$("#cnslSubProcSt").prop("disabled",false);
					};
					
					if ($("#actStCd").val() == "030400") {
						$("#btnCnslMainDepartmentSearch").prop("disabled", g_actStDisable[actStat][1]);
						$("#btnCnslSubDepartmentSearch").prop("disabled", g_actStDisable[actStat][1]);
					} else {
						$("#btnCnslMainDepartmentSearch").prop("disabled", g_actStDisable[actStat][0]);
						$("#btnCnslSubDepartmentSearch").prop("disabled", g_actStDisable[actStat][0]);
					};
					
					$("#cnslMainUsr").prop("disabled", g_actStDisable[actStat][0]);
					$("#cnslMainProcCont").prop("disabled", g_actStDisable[actStat][0]);
					$("#tfCnslMainRtnCont").prop("disabled", g_actStDisable[actStat][0]);
					
					$("#cnslSubUsr").prop("disabled", g_actStDisable[actStat][0]);
					$("#cnslSubProcCont").prop("disabled", g_actStDisable[actStat][0]);
					$("#tfCnslSubRtnCont").prop("disabled", g_actStDisable[actStat][0]);
						
					g_oldMainCont["cnslMainProcSt"]=tmp;
					if(!data[0].AFFS_ORG_USR_ID){
						tmp="";
					}else{ 
						tmp=data[0].AFFS_ORG_USR_ID;
					}
					g_oldMainCont["cnslMainAffairUsrId"]=tmp; 
					g_oldMainCont["cnslMainProcCont"]=contLen; 
					g_oldMainCont["tfCnslMainRtnCont"]=rsnLen;
					
					if (szLength > 1) {
						
						g_dataSubPassOver=data[1];
						g_oldSubCont["exist"]="sub";

						$("#cnslSubProcSt").val(data[1].CVL_ACT_ST_CD);
					
						$("#tfCnslSubDepartment").val(data[1].ORG_ID+"|"+data[1].AFFS_ORG_USR_ID+"|"+data[1].AFFS_USR_NM+"|"+data[1].AFFS_OFCE_TEL_NO);
						$("#cnslSubUsr").val(data[1].ORG_FUL_NM.replace("순천시청 ", "") +" > "+data[1].AFFS_USR_NM);
						
						$("#cnslSubProcDtm").html(data[1].MOD_DTM_FORMAT );

						$("#cnslSubProcCont").val(data[1].CVL_ACT_CONT);   // 처리민원
						$("#tfCnslSubRtnCont").val(data[1].RTN_RSN);       // 반송사유

						//hide
						$("#cnslSubAffairUsrId").val(data[1].AFFS_ORG_USR_ID);
						$("#cnslSubAffairTelNo").val(data[1].AFFS_OFCE_TEL_NO);
						$("#cnslSubAffairUsrNm").val(data[1].AFFS_USR_NM);
						$("#cnslSubTeamCd").val(data[1].ORG_ID);
						$("#cnslSubDeptCd").val(""); //사용안함
						$("#cnslSubAffairMobile").val(data[1].AFFS_ORG_MOBILE);

						
						if(!data[1].CVL_ACT_CONT){
							contLen=0;
						}else{ 
							contLen=data[1].CVL_ACT_CONT.length;
						}
						
						if(!data[1].RTN_RSN){
							rsnLen=0;
						}else{ 
							rsnLen=data[1].RTN_RSN.length;
						}
						
						if(!data[1].CVL_ACT_ST_CD){
							tmp="";
						}else{ 
							tmp=data[1].CVL_ACT_ST_CD;
							if(data[1].CVL_ACT_ST_CD > "010100"){
								$("#cnslSubProcSt option:eq(0)").prop("disabled", true);
								$("#btnSubHis").show();  // 이관이력2
							}
						}
						g_oldSubCont["cnslSubProcSt"]=tmp;
						
						if(!data[1].AFFS_ORG_USR_ID){
							tmp="";
						}else{ 
							tmp=data[1].AFFS_ORG_USR_ID;
						}
						g_oldSubCont["cnslSubAffairUsrId"]=tmp; 
						g_oldSubCont["cnslSubProcCont"]=contLen; 
						g_oldSubCont["tfCnslSubRtnCont"]=rsnLen;
					}
					else if(szLength==1){
						
						//보조부서가 없는 상태는 주관부서를 따라간다
						$("#cnslSubProcSt").val(g_oldMainCont["cnslMainProcSt"]);
						g_oldSubCont["exist"]="";
						g_oldSubCont["cnslSubProcSt"]="010100";
						g_oldSubCont["cnslSubAffairUsrId"]=""; 
						g_oldSubCont["cnslSubProcCont"]=0; 
						g_oldSubCont["tfCnslSubRtnCont"]=0;
					}
					
				}else{
					//신규이관
						g_oldMainCont["exist"]="";
						g_oldMainCont["cnslMainAffairUsrId"]="";
						g_oldMainCont["cnslMainProcCont"]=0;
						g_oldMainCont["cnslMainProcSt"]="";
						g_oldMainCont["rdoCnslReq"]="";
						g_oldMainCont["rdoCnslResult"]="";
						g_oldMainCont["tfActCounselText"]="";
						g_oldMainCont["tfCnslMainRtnCont"]=0;
						g_oldMainCont["tfResvTelNo"]="";
						g_oldMainCont["trnrMinCont"]=""; 
						
						g_oldSubCont["exist"]="";
						g_oldSubCont["cnslSubProcSt"]="010100";
						g_oldSubCont["cnslSubAffairUsrId"]=""; 
						g_oldSubCont["cnslSubProcCont"]=0; 
						g_oldSubCont["tfCnslSubRtnCont"]=0;
				}
		}
	});
}

function setOptionTagDisabled(ccAffrsYN) {
	if ($("#actStCd").val() == "030400") {
		$("#btnUpdate").hide();
		$("#cnslMainProcSt option[value=010200]").prop("disabled", true);
		$("#cnslMainProcSt option[value=010300]").prop("disabled", true);
		$("#cnslMainProcSt option[value=020100]").prop("disabled", true);
		$("#cnslMainProcSt option[value=020200]").prop("disabled", true);
		$("#cnslMainProcSt option[value=030100]").prop("disabled", true);
		$("#cnslMainProcSt option[value=030200]").prop("disabled", true);
	} else {
		if (ccAffrsYN == "Y") {
			$("#cnslMainProcSt option[value=010200]").prop("disabled", false);
			$("#cnslMainProcSt option[value=010300]").prop("disabled", true);
		} else {
			$("#cnslMainProcSt option[value=010200]").prop("disabled", true);
			$("#cnslMainProcSt option[value=010300]").prop("disabled", false);
		};
		$("#cnslMainProcSt option[value=020100]").prop("disabled", true);
		$("#cnslMainProcSt option[value=020200]").prop("disabled", true);
		$("#cnslMainProcSt option[value=030100]").prop("disabled", true);
		$("#cnslMainProcSt option[value=030200]").prop("disabled", true);
	};
}

function getJsonStrMinwonSpec(tcktId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMzIuc2VsZWN0VHJhbnNmZXJJbmZvTGlzdA==",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function transfSizeControl(){
var contSizeChk=$("#btnTransfCont").html();

	if(contSizeChk=="이관내용&lt;"){
		$("#labTransfCont").html("&nbsp; &nbsp;");
		$("#btnTransfCont").html("이관내용&lt;");
		$("#TrMinwonProcStatus").show();
		$("#rcvCont").css('height', '60px');
		$("#actCont").css('height', '20px');
		$("#trnrMinCont").css('height', '25px');
		
		$("#minwonProcDeptInfo").show();
		$("#minwonProcCont").show();
		$("#minwonRtnCont").show();
	}
	else
	{
		$("#labTransfCont").html("<br><br>------------<br><br>");
		$("#btnTransfCont").html("이관내용&gt;");
		$("#TrMinwonProcStatus").hide();
		$("#rcvCont").css('height', '173px');
		$("#actCont").css('height', '82px');
		$("#trnrMinCont").css('height', '84px');
		
		$("#minwonProcDeptInfo").hide();
		$("#minwonProcCont").hide();
		$("#minwonRtnCont").hide();
	};
};

// 오늘 날짜 체크하여 오늘 이력만 수정/삭제가능
//function notTodayCheck(pDay){
//	  var now = new Date();
//      var year= now.getFullYear();
//      var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
//      var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
//              
//      var chan_val = year + '-' + mon + '-' + day;
//      
//      // alert(pDay +"=="+ chan_val);
//      if(pDay == chan_val){
//    	 
//    	  $("#btnDelete").hide();
//    	  $("#btnUpdate").hide();
//      }else{ 
//    	  $("#btnDelete").show();
//    	  $("#btnUpdate").show();
//      }
//}

function btnDialing_clickEvent(type)
{
	if(type == 'R')
		confirm_resv(g_tell);
	else if(type == 'T')
		confirm_resv(g_call);
	else if(type == 'CB')
		confirm_callBack(g_callBckNum);
	else if(type == 'CR')
		confirm_callBack(g_callBckTelNum);
	else
		confirm_callBack(g_callBckAniNum);
	return;
}

function confirm_resv(phoneNum)
{
	if (confirm(phoneNum+"\n전화를 거시겠습니까?") == true)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/resvExctYnUpdateList.do",
			data : "pJson=" + getJsonStrUpdateResvExctYn(),
			success : function(data)
			{
				phoneNum = phoneNum.replace(/[-,\s]/g,"");
				counselInitInfo_M();				

				opener.parent.resvCallSet($("#custId").val(), phoneNum, $("#tcktId").val(), document.title);
				self.close();
			},
			error : function(data, status, err) 
			{
				alert("counselSpec 862 " + err);
			}
		});
	}
	else
	    return;
}

function confirm_callBack(phoneNum)
{	
	if (confirm(phoneNum+"\n전화를 거시겠습니까?") == true)
	{
		phoneNum = phoneNum.replace(/[-,\s]/g,"");
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/updateTryInfo.do",
			data : "pJson=" + getJsonStrUpdateTryCnt("call", $("#callbckActStCd").val(), "", ""),
			success : function(data)
			{
					opener.parent.callBackSet(phoneNum, $("#callBckId").val());
					self.close();
			},	
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	    return;
}

function btnAcceptance_clickEvent()
{
	var firstTcktId = "";
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/resvUpdateList.do",
		data : "pJson=" + getJsonStrResvUpdateListPopup($("#tcktId").val()),
		success : function(data)
		{
			$.each(data, function(key, state)
			{				
				firstTcktId = state.TCKT_ID;
			});
			cnslSpecPopup(firstTcktId);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 접수 팝업
function cnslSpecPopup(tckt_id)
{
	window.sessionStorage.setItem("tcktId", tckt_id);
	
	var width = 1200;
	var height = 464;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/counselSpec.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "counselSpecPopup", option);
	newWindow.focus();
}

function resvCallStateUpdatePopup(tcktId, outTcktId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/actTypeCdUpdate.do",
		data : "pJson=" + getJsonStrActStUpdatePopup(tcktId, outTcktId),
		success : function(data)
		{
			suc + 1;
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function rcvnUsrClickEvent()
{
	window.sessionStorage.setItem("fromFlag", "fromMainTab");
	switch($("#actTypeCd").val().toString())
	{
		case "040000" :
		{
			window.sessionStorage.setItem("corpOpenType", "callCorp");
			break;
		}
		default:
			break;
	}
	
	openMenuPopup("CM0311");
}

function actTypeCdChangeEvent()
{
	$("#counselText").html("");
	$("#rcvnId").find("option:first").attr("selected", "selected");
	
	$("#tfResvDtm").hide();
	$("#rcvnUsr").hide();
	$("#rcvnId").hide();
	$("#resvTelText").html("");
	$("#tfRcvnUsr").hide();
	$("#tfResvPhoneNumber").hide();
	$("#armText").html("");
	$("#armUseYn").html("");
	$("#tryDt").hide();
		
	switch($("#actTypeCd").val().toString())
	{
		case "010000" :			
		case "060000" :
		{
			break;
		}
		case "020000" : 
		{
			$("#counselText").html("예약일시");
			$("#tfResvDtm").show();
			$("#resvTelText").html("예약번호");
			$("#tfResvPhoneNumber").show();
			$("#tfResvPhoneNumber").val($("#cntctInfm").html());			
			$("#armText").html("알람/실행");
			$("#armUseYn").html(g_almYn);
			
			break;
		}
		case "030100" :
		{
			//$("#counselText").html("이관대상");
			//$("#rcvnUsr").show();
			//$("#rcvnUsr").val(rcvnCntNm);
			break;
		}
		case "040000" :
		{
			$("#counselText").html("등록대상");
			$("#tfRcvnUsr").show();
			$("#tfRcvnUsr").val(rcvnCallNm);
			$("#resvTelText").html("콜백번호");
			$("#tfResvPhoneNumber").val($("#cntctInfm").html());
			$("#tfResvPhoneNumber").show();
//			if(g_callBckTelNum != null && g_callBckTelNum != " ")
//				$("#resvTelInfo").html(g_callBckTelNum + '<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="btnDialing_clickEvent('+"'CR'"+')" class="icon_cal2" id="btnCallDialing"/>');
//			else
//				$("#resvTelInfo").html(g_callBckTelNum);
			// 조직도 팝업
			break;
		}
		case "050000" :
		{
			$("#counselText").html("처리일시");
			$("#tryDt").show();
		}
		default:
			break;
	}
	rcvnCntNm = "";
	rcvnKtrNm = "";
	rcvnExtNm = "";
	rcvnCallNm = "";
}

function counselButtonEvent_M()
{
	$("#actTypeCd").bind("change", function(e)
	{
		try
		{		
			actTypeCdChangeEvent();
		}
		catch(e)
		{
			if(StcktId != "" && StcktId != null)
				counselInitTable_M(StcktId, "");
			else if(SreqTcktId != "" && SreqTcktId != null)
				counselInitTable_M(SreqTcktId, "");
		}
	});
	
	/*// 상담유형 기관구분 선택
	$("#intvExCd").bind("change", function(e) {
		var selval=e.target.value;
		if(selval=="90000000"){  
		   // 긴급통화 코드 
			$("#actTypeCd").val("010000").trigger("change");
		}
		setObjectSelectBoxWithCode("intvLgCd", "", "2", g_popup, $("#intvExCd").val(), "", "CHANGE");	// 상담유형 중분류 셋팅
	});*/

	// 상담유형 대분휴
	$("#intvLgCd").bind("change", function(e) {
		setObjectSelectBoxWithCode("intvMdCd", "", "3", g_popup, $("#intvLgCd").val(), "", "CHANGE");	// 상담유형 중분류 셋팅
	});

	// 상담유형 중분류 선택
	$("#intvMdCd").bind("change", function(e) {
		setObjectSelectBoxWithCode("intvSmCd", "", "4", g_popup, $("#intvMdCd").val(), "", "CHANGE");	// 상담유형 중분류 셋팅
	});
	
	$("#btnListenRecPopup").bind("click", btnListenRecPopup_clickEvent);
	$("#btnSmsSpecPopup").bind("click", btnSmsSpecPopup_clickEvent);
	$("#btnUpdate").bind("click", btnUpdate_clickEvent);
	$("#btnDelete").bind("click", btnDelete_clickEvent);
	$("#btnTransfCont").bind("click", btnTransfCont_clickEvent);
	$("#btnMainHis, #btnSubHis").bind("click", btnTransfOverHist_clickEvent);
	
	// 아웃바운드 버튼 클릭 이벤트
	$("#btnOutBoundCall").bind("click", function(e)
	{
		btnDialing_clickEvent('CB');
	});

	$("#btnTabCustSearch").bind("click", searchCustInfoTab);
	
	$("#lbCnslSpecTicketNum").bind("click", function()
	{
		if($("#lbCnslSpecTicketNum").html() != "")
		{
			window.clipboardData.setData("Text", $("#lbCnslSpecTicketNum").html());
			alert("복사되었습니다.");
		}
	});
	
	//문자발신 버튼 클릭 이벤트
	$("#btnSmsSendPopup").bind("click", function()
	{
		window.sessionStorage.setItem("cnslSmsSendNum", g_call.replace(/-/gi, ""));
		window.sessionStorage.setItem("cnslSmsTcktId", $("#lbCnslSpecTicketNum").html());
		window.sessionStorage.setItem("cnslSmsCustId", $("#custId").val());
		openMenuPopup("CM0017");
	});
	
	// voc 접수 버튼 클릭 이벤트
	/*
	$("#btnVocInsertInCnslSpec").bind("click", function()
	{
		window.sessionStorage.setItem("VOC_from", "cnslSpec");
		window.sessionStorage.setItem("VOC_Chgbcd", $("#chGbCd").val());
		window.sessionStorage.setItem("VOC_Rday", $("#rcvDt").html().substring(0, 10));
		window.sessionStorage.setItem("VOC_Rtime", $("#rcvDt").html().substring(11, 19));
		window.sessionStorage.setItem("VOC_CorpNm", $("#corpNm").html());
		window.sessionStorage.setItem("VOC_CustNm", $("#custNm").html());
		window.sessionStorage.setItem("VOC_UserName", $("#rcvUsrNm").html());
		window.sessionStorage.setItem("VOC_FarmDisNum", "");
		window.sessionStorage.setItem("VOC_RcvCont", $("#rcvCont").val());
		window.sessionStorage.setItem("VOC_CelPhoneNum", g_call);
		
		var width = 1000;
		var height = 435;
		var top = window.screenTop + (screen.height - height) / 2;
		var left = window.screenLeft + (screen.width - width) / 2;
		var paramURL = getContextPath() + "/web/voc/vocReg.do";
		var option = "width=" + width + ", height=" + height
			+ ", toolbar=no,directories=no,scrollbars=no,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
		
		var newWindow = window.open(paramURL, "vocReg", option);
		newWindow.focus();
	});
	*/
}

function btnTransfOverHist_clickEvent(){
	 
	var valId=this.id;
	
	var tcktId=$("#tcktId").val();
	var tntrId="";
	var ord="";
	
	if(valId=="btnMainHis"){
		ord="1";
	}else if(valId=="btnSubHis"){
		ord="2";
	}
	
		var width = 1100;
		var height = 750;
		var left = 150;
		var top = 150;
		var paramURL = getContextPath() + "/web/civilservice/cswVocHistory.do";
		var option = "width=" + width + ", height=" + height + ", height=" + height + ", top=" + top + ", toolbar=no,directories=no,scrollbars=no,location=no,resizable=no,status=no,menubar=no";
 
		var sParam="?tckt_id="+tcktId+"&tntr_id="+tntrId+"&ord="+ord;
		paramURL += sParam;
		var owin = window.open(paramURL, "tranfOpen", option);
}

function btnTransfCont_clickEvent(){
	var foldtxt=$("#btnTransfCont").html();
	if(foldtxt=="이관내용&gt;"){
		$("#btnTransfCont").html("이관내용&lt;");
	}else{
		$("#btnTransfCont").html("이관내용&gt;");
	}
	
	transfSizeControl();
}

function completeVocInsertFromPopup()
{
	$("#actTypeCd").val("030100");
	$("#btnUpdate").trigger("click");
}

//고객 정보 검색
function searchCustInfoTab()
{
	if($("#custId").val() != null || $("#custId").val() != "")
		window.localStorage.setItem("parentCustId", $("#custId").val());
		//window.sessionStorage.setItem("parentCustId", $("#custId").val());
	else
		window.localStorage.setItem("parentCustId","");
		//window.sessionStorage.setItem("parentCustId", "");
	
	window.sessionStorage.setItem("setCustInfoPopupType", "modal");
	window.sessionStorage.setItem("setCustInfoPopupSearchNm", "");
	window.sessionStorage.setItem("setCustInfoType", "popup");
	window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", "");
	
	var width = 1200;
	var height = 672;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/customerManage.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "customerManage", option);
	newWindow.focus();
	
	/*var custId = window.showModalDialog(paramURL, "modal", "dialogWidth:" + width + "px; dialogHeight:" + height + "px; center=yes; resizable=no; status=no; scroll=no; help=no; ");
	
	window.sessionStorage.setItem("parentCustId", "");
	
	if(custId != null)
		setCustInfoTab(custId);
	*/
}

function setCustPopInfo(custId)
{
	window.sessionStorage.setItem("parentCustId", "");
	
	if(custId != null)
		setCustInfoTab(custId);
}

//고객정보를 가져와 화면에 셋팅
function setCustInfoTab(custId)
{
	// 현재 연결되 발신번호로 등록되어 있는 고객의 정보를 가져옴
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/getCustInfo.do",
		data : "pJson=" + getJsonStrCustInfoTab(custId),
		success : function(data)
		{
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			
			if(jr != "")
			{
				$("#custId").val(jr[0].CUST_ID);
				$("#corpNm").html(jr[0].CORP_NM);
				$("#custNm").html(jr[0].CUST_NM);
				$("#cstType").html(jr[0].CST_TYPE_NM);
				$("#cstComp").html(jr[0].CST_COMP_NM);
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//조직도에서 사원 전화번호 클릭 이벤트
function usrTelClickTab(usrId, trnrType)
{
	if(usrId != "")
		trnrRcvnUsrNm(usrId, trnrType);
}

function trnrRcvnUsrNm(usrId, actTypeCd)
{
	$("#rcvnUsrId").val(usrId);
	switch(actTypeCd)
	{
		case "030100" :	// VOC 등록
		{
			/*
			// 상담사 정보를 얻어옴
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/getUserInfo.do",
				data : "pJson=" + getJsonStrComUserInfo(usrId),
				success : function(data)
				{
					if(data != null)
					{
						$("#rcvnUsr").val(data.USR_NM);
						rcvnCntNm = data.USR_NM;
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
			*/
			
			break;
		}
		case "040000" :	// 콜센터 이관
		{
			// 상담사 정보를 얻어옴
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/getUserInfo.do",
				data : "pJson=" + getJsonStrComUserInfo(usrId),
				success : function(data)
				{
					if(data != null)
					{
						$("#rcvnUsr").val(data.USR_NM);
						rcvnCallNm = data.USR_NM;
					}
				},
				error : function(data, status, err)
				{
					networkErrorHandler(data, status, err);
				}
			});
			
			break;
		}
		default:
			break;
	}
}

function setSelectBoxWithCodeSync_M(code1, code2, code3){
	g_popup = window.sessionStorage.getItem("POPUP");  
    setObjectSelectBoxWithCode2("intvLgCd", "선택", "1", g_popup, "00000000", code1, "");
    $("#intvLgCd").val(code1);
    setObjectSelectBoxWithCode("intvMdCd", "", "2", g_popup, code1, code2, "");	// 상담유형 대분류 셋팅
    setObjectSelectBoxWithCode("intvSmCd", "", "3", g_popup, code2, code3, "");	// 상담유형 중분류 셋팅
}

// init Page
$(document).ready(function()
{
	startInit = 0;
	StcktId = opener.window.sessionStorage.getItem("tcktId");
	SreqTcktId = window.sessionStorage.getItem("reqTcktId");
	var type = window.sessionStorage.getItem("type");
	var gridType = window.sessionStorage.getItem("gridType");
	
	counselDateTimePicker_M();
	counselInitInfo_M("");
	counselButtonEvent_M();
	
	$("#btnListenRecPopup").hide();
	
	if(StcktId != "" && StcktId != null) {
		counselInitTable_M(StcktId, type, gridType);
	} else if(SreqTcktId != "" && SreqTcktId != null) {
		counselInitTable_M(SreqTcktId, type, gridType);
	};
	
	$("#btnSmsSpecPopup").hide();
	$("#btnSmsSendPopup").hide();
	$("#btnUpdate").hide();
	$("#btnCnslMainDepartmentSearch").attr("disabled", true);
	$("#btnCnslMainDepartmentSearch").attr("disabled", true);
});