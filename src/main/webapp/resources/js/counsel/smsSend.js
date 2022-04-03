var g_sndrCntct = "";
var rMsg = "";
var smsSendContFooter = "-순천시3114온누리콜센터-"
var isMngr = false;
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
switch(usrGrdCd) {
	case '030100'://팀장
	case '050100'://센터장
	case '060100'://통합센터장
	case '090100'://시스템관리자
		isMngr = true;
		break;
	default:
		isMngr = false;
		break;
}

//파라미터 셋팅_UsrInfo
function getJsonStrUsrInfo(){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMDEuc2VsZWN0",
		"map" : {
			"key" : "value",
			"usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_ChSndId
function getJsonStrChSndId(){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMjAuZ2V0Q2hTbmRJZA==",
		"map" : {
			"key" : "value"
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_SendSms hhs 20.04.21
function getJsonStrSendSms(cont_seq,smsCheck,smsType,send_date){
	var content = $("#tfSendCont").val().trim() == "" ? "" : $("#tfSendCont").val()+"\n"+$("#sendContFooter").html();
	
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c21zLnNlbmRTbXM=",
		"map" : {
			"key" : "value",
			"cont_seq" : cont_seq,
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"usr_nm" : window.sessionStorage.getItem("USR_NM"),
			"smsCheck" : smsCheck,
			"smsType" : smsType,
			"send_date" : send_date,
			"sms_msg" : content,
			"callback" : $("#labSendNum").html().replace(/-/gi, ""),
			"dest_info" :  $("#tfSendPhoneNum").val().replace(/-/gi, ""),
			
			// file
			"subject" : "",
			"content" : content,
			"file_cnt": content != "" ? fileCount+1 : fileCount,
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustInfo
function getJsonStrCustInfo(custId){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm8=",
		"map" : {
			"key" : "value",
			"cust_id" : custId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustCntctInfm
function getJsonStrCustCntctInfm(custId){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2QwMDQuZ2V0Q3VzdENudGN0SW5mbQ==",
		"map" : {
			"key" : "value",
			"cust_id" : custId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustInfo
function getJsonStrFindFile(custId){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wMTkuZmlsZUxpc3Q=",
			"map" : {
				"key" : "value",
				"tbl_nm" : "ch020",
				"tbl_pk": custId,
				"orderby": "crtTime",
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

/** 자주쓰는 문자 파라미터 Set Start */

function getJsonStrSmsFrqntList(){
	
//	if($("#chkCommon").prop("checked") == true)
//	{		
//		$("#chkCommon").prop("value", "Y");		
//	}else {		
//		$("#chkCommon").prop("value", "");
//	}
	
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMzUuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			/*"sms_class" : $("#selFrqntType").val()*/
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"chkCommon" : "Y" // $("#chkCommon").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrSmsFrqntDetails(smsTmpId){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMzUuc2VsZWN0RGV0YWlscw==",
		"map" : {
			"key" : "value",
			"sms_tmplt_id" : smsTmpId
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_FrqntSaveSms
function getJsonStrFrqntSave(){
	/*
	if($("#chkPrfCommon").prop("checked") == true)
	{		
		$("#chkPrfCommon").prop("value", "Y");		
	}else {		
		$("#chkPrfCommon").prop("value", "N");
	}
	*/
	
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMzUuaW5zZXJ0RnJxbnQ=",
		"map" : {
			"key" : "value",
			/*"sms_class" : $("#selFrqPrfType").val(),*/
			"common_yn" : "Y" ,	// $("#chkPrfCommon").val(),
			"ord" : $("#tfFrqPrfOrd").val(),
			"tfFrqPrfTtl" : $("#tfFrqPrfTtl").val(),
			"sms_cont" : $("#tfFrqPrfCont").val(),
			"sms_sz" : $("#labFrqPrfContSz").html()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_FrqntModiSms
function getJsonStrFrqntModi(){
	/*
	if($("#chkPrfCommon").prop("checked") == true)
	{		
		$("#chkPrfCommon").prop("value", "Y");
	}else {		
		$("#chkPrfCommon").prop("value", "N");
	}
	*/
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMzUudXBkYXRlRnJxbnQ=",
		"map" : {
			"key" : "value",
			"sms_tmplt_id" : $("#tfFrqTmpltId").val(),
			/*"sms_class" : $("#selFrqPrfType").val(),*/
			"common_yn" : "Y",//$("#chkPrfCommon").val(),
			"ord" : $("#tfFrqPrfOrd").val(),
			"tfFrqPrfTtl" : $("#tfFrqPrfTtl").val(),
			"sms_cont" : $("#tfFrqPrfCont").val(),
			"sms_sz" : $("#labFrqPrfContSz").html()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
//파라미터 셋팅_FrqntModiHide
function getJsonStrFrqntHide(){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMzUuZGVsZXRlRnJxbnQ=",
		"map" : {
			"key" : "value",
			"sms_tmplt_id" : $("#tfFrqTmpltId").val(),
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/** 자주쓰는 문자 파라미터 Set End */

//sms 전송 프로시저 호출을 위한 파라미터 제작
function makeSmsSendParam(ch_snd_id){
	var rsltStr = "";
	var arrParam = {};
	
	arrParam[0] = window.sessionStorage.getItem("IP_ADDRESS");			// 전송자 IP
	arrParam[1] = window.sessionStorage.getItem("USR_ID");			// 전송자 ID
	arrParam[2] = $("#tfSendPhoneNum").val().replace(/-/gi, "");			// 수신자 전화번호
	arrParam[3] = $("#labSendNum").html().replace(/-/gi, "");			// 발신자 전화번호
	arrParam[4] = "";			// 제목
	arrParam[5] = $("#tfSendCont").val()+"\n"+$("#sendContFooter").html();			// 내용
	arrParam[6] = $("#tfResvDtm").val().trim() == "" ? "N" : "Y";			// 예약여부
	arrParam[7] = $("#tfResvDtm").val().trim() == "" ? "" : changeDateString(getResvDate($("#tfResvDtm").val().trim())) + changeTimeString(getResvDate($("#tfResvDtm").val().trim()));			// 예약일자
	arrParam[8] = "044009";			// 메시지구분(044009)
	arrParam[9] = window.sessionStorage.getItem("USR_NM");			// 전송자명
	arrParam[10] = "0099";		// 전송작업장코드(0099)
	arrParam[11] = $("#tfCustFarmNo").val();		// 식별번호
	arrParam[12] = "tmp.txt";		// 첨부파일
	arrParam[13] = $("#tfCustId").val();		// 수신자 주소록번호
	arrParam[14] = $("#tfCustId").val();		// 수신자아이디
	arrParam[15] = $("#labCustNm").html();		// 수신자명
	arrParam[16] = "";		// 기타
	arrParam[17] = "";		// 옵션1
	arrParam[18] = ch_snd_id;		// 옵션2
	arrParam[19] = $("#tfTcktId").val();		// 옵션3_접수번호
	arrParam[20] = window.sessionStorage.getItem("CNTR_CD") == "010000" ? "GRADE" : "MTRACE";		// 사업구분_GRADE or MTRACE
	
	for(var i = 0; i < 21; i++){
		if(i == 20)
			rsltStr += arrParam[i];
		else
			rsltStr += arrParam[i] + "|";
	}
	
	return rsltStr;
}

//고객정보를 가져와 화면에 셋팅
function setCustInfo(sPhoneNum, custId){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrCustInfo(custId),
		success : function(data){
			$("#tfCustId").val(data.CUST_ID);
			//$("#tfCustFarmNo").val(data.FARM_NO); 필요 없는것 삭제 필요
			
			// 해당 고객의 연락정보를 가져옴
			$.ajax({
				type : "post",
				async : true,
				url : getContextPath() + "/ajax/main/getCustCntctInfm.do",
				data : "pJson=" + getJsonStrCustCntctInfm(data.CUST_ID),
				success : function(custCntctInfmData){
					// param값을 JSON으로 파싱
					var jr2 = JSON.parse(custCntctInfmData);
					if(jr2 != ""){
						$("#tfSendPhoneNum").val("");
						
						// 채널별로 셀렉트 박스에 추가
						$.each(jr2, function(key, state){
							if(state.CH_GB_CD == "11003")
								$("#tfSendPhoneNum").val(getPhoneNumFormat(state.CNTCT_INFM));
						});
						
						// 휴대전화번호 존재 유무 판단
						if($("#tfSendPhoneNum").val() == "" && g_sndrCntct != "")
							$("#tfSendPhoneNum").val(getPhoneNumFormat(g_sndrCntct));
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent(){
	$("#tfSendPhoneNum").val("");
	$("#tfSendPhoneNum").show();
	$("#tfResvDtm").val("");
	$("#tfTcktId").val("");
	$("#labCountTxt").html("0");
	$("#tfSendCont").val("");
	$("#tfCustId").val("");
	$("#tfCustFarmNo").val("");
	$("#smsSendImg").MultiFile("reset");
}

//전송 버튼 클릭 이벤트
function btnSend_clickEvent(){
	var send_date = $("#tfResvDtm").val().trim(); //예약일시 (2021-09-30 15:40)
	var nowDateTime = getDateTime(); //현재일시 (2021-09-30 14:51:30)
	var contLength = charByteSize($("#tfSendCont").val()+"\n"+$("#sendContFooter").html());
	var smsCheck = 4; // SMS : 4, LMS or MMS : 6
	var smsType = "SMS";
	
	if($("#tfSendPhoneNum").val().trim() == ""){
		alert("수신번호를 입력 해 주시기 바랍니다.");
		$("#tfSendPhoneNum").focus();
		return;
	}
	
	if($("#tfSendPhoneNum").val().replace(/-/gi, "").length > 11){ //전화번호 자릿수 체크
		alert("잘못된 수신번호 입니다.\n수신번호를 확인 해 주시기 바랍니다.");
		$("#tfSendPhoneNum").focus();
		return;
	}
	
	if(send_date != "" && (send_date<nowDateTime)){ //예약 날짜 체크
		alert("잘못된 예약일시 입니다.\n예약일시를 확인 해 주시기 바랍니다.");
		$("#tfResvDtm").focus();
		return;
	}
	
	if($("#tfSendCont").val().trim() == ""){
		alert("전송 메시지를 입력 해 주시기 바랍니다.");
		$("#tfSendCont").focus();
		return;
	}
	
	if(contLength > 2000){
		alert("전송 메시지는 2000byte를 넘길수 없습니다.");
		$("#tfSendCont").focus();
		return;
	}
	
	if(contLength <= 90 && fileCount == 0){
		smsCheck = 4;
		smsType = "SMS";
	}else{
		smsCheck = 6;

		if(fileCount == 0){
			smsType = "LMS";
		}else{
			smsType = "MMS";
		}
	}
	
	if(smsType == "SMS"){
	
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/sendSms.do",
			data : "pJson=" + getJsonStrSendSms("",smsCheck,smsType,send_date),
			success : function(data){
				alert("발송요청이 완료되었습니다.");
				window.close();
				opener.$("#tblSmsSendList").trigger("reloadGrid");
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
		
	}else{ //  LMS or MMS
		
		// MMS CONTENTS SEQ
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/getMmsSeq.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l","c21zLm5leHR2YWw=", {	
				
			}),
			success : function(data){
				var cont_seq = data.SMS_SEQ;
				
				// INSERT MSG_DATA, MMS_CONTENT
				gAppendHidden("smsSendForm", "pJson", getJsonStrSendSms(cont_seq,smsCheck,smsType,send_date));
				gSubmitPost("smsSendForm", true);
				
				alert("발송요청이 완료되었습니다.");
				window.close();
				opener.$("#tblSmsSendList").trigger("reloadGrid");
				
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
		
	}
}

//고객선택 버튼 클릭 이벤트
function btnCustSelect_clickEvent(){
	window.sessionStorage.setItem("setCustInfoPopupType", "modal");
	window.sessionStorage.setItem("parentCustId", "");
	window.sessionStorage.setItem("setCustInfoType", "main");
	window.sessionStorage.setItem("setCustInfoPopupSearchNm", "");
	window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", "");
	
	var width = 1200;
	var height = 673;
	var paramURL = getContextPath() + "/web/counsel/customerManage.do?popup=PCHILD";
	
//	var custId = window.showModalDialog(paramURL, "modal", "dialogWidth:" + width + "px; dialogHeight:" + height + "px; center=yes; resizable=no; status=no; scroll=no; help=no; ");
	var custId = window.open(paramURL, "modal", "width="+width+",height="+height+",left=70,top=30, scrollbars=yes, resizable=no, menubar=no, toolbar=no, location=no, status=no, resizable=no");
//	if(custId != null)
//		setCustInfo("", custId);
//	openMenuPopup("CM0121");
}

/** 자주쓰는 문자 기능 Set Start */
function initSpec(){
	$("#btnFrqntModi, #btnFrqntHide").hide();
	$("#btnFrqntSave").show();
	//$("#selFrqntType").val("all");
	//$("#selFrqPrfType").val("100000");
	$("#tfFrqTmpltId, #tfFrqPrfOrd, #tfFrqPrfTtl ,#tfFrqPrfCont").val("");
	$("#labFrqPrfCrtNm, #labFrqPrfCrtDh").html("");
	
	$("#chkPrfCommon").prop("checked", false);
	//관리자인 경우만 활성 처리
	if(!isMngr) {
		$("#chkPrfCommon").prop("disabled",true);
	}	
}

function checkFrqntSpec(){
	
	var rMsg = "";
	if($("#tfFrqPrfOrd").val() == "")
		rMsg += "\n\n순서 입력해주세요.";
	
	if($("#tfFrqPrfCont").val() == "")
		rMsg += "\n\n내용을 입력해주세요.";
	
	return rMsg;
}

function sms_Frequently_Set(){
	initSpec();
	//setSelectBoxWithCode("selFrqntType", "전체", "90033", "", "", "");	    // LIST 문자템플릿 구분
	//setSelectBoxWithCode("selFrqPrfType", "", "90033", "", "", "");	    // VIEW 문자템플릿 구분
	
	// sms자주쓰는 문자 jqgrid
	$("#tblSmsFrqntList").jqGrid({
		url : getContextPath() + "/jqgrid/counsel/smsFrqntList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSmsFrqntList()
		},
		jsonReader :
		{
			repeatitems: false
		},
//	   	colNames : [ "채널발신ID","COMMON_YN", "구분", "제목", "글자수", "선택"],
	   	colNames : [ "채널발신ID", "순서", "제목", "글자수", "선택"],
	   	colModel :
	   	[
	   	 	{ name : "SMS_TMPLT_ID", index : "SMS_TMPLT_ID", hidden : true },
	   		/*{ name : "CLASS_NM", index : "SMS_CLASS", width : 80, align : "center" },	   		*/
//	   	 	{ name : "COMMON_YN", index : "COMMON_YN", width : 80, align : "center", hidden : true},
	   	 	{ name : "ORD", index : "ORD", width : 30, align : "center"},	   	 	
//	   	 	{ name : "COMMON_NM", index : "COMMON_NM", width : 80, align : "center"},	   	 	
//	   		{ name : "SMS_CONT", index : "SMS_CONT", width : 180, align : "center" 
//	   			, cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
//   					return 'style="white-space :nowrap;"' 
//	   			}
//	   		},
	   		{ name : "SMS_TTL", index : "SMS_TTL", width : 180, align : "left" 
	   		    , cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
	   			return 'style="white-space :nowrap;"' 
	   		    }
	   		},
	   		{ name : "SMS_SZ", index : "SMS_SZ", width : 60, align : "center" },
	   		{ name : "RCVN_BUTTON", index : "RCVN_BUTTON", width : 60, align : "center"}
	   	],
	   	sortname : "ord",
	   	sortorder : "asc",
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	autowidth : true,
	   	pager : "#pagingSmsFrqntList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	loadui : "enable",
	   	viewrecords: false,
	   	gridview     : false,
	   	afterInsertRow : function(rowId, rowData, rowElem){
	   		
	   		if (rowData.COMMON_YN == 'Y') { 
	   			$('#tblSmsFrqntList').jqGrid('setCell',rowId,'COMMON_NM',"공통");
	   		}else{
	   			$('#tblSmsFrqntList').jqGrid('setCell',rowId,'COMMON_NM',"개별");
	   		}
	   	},
	   	onSelectRow : function(rowid)	{
	   		smsFrqntList_SelectRow("onSelect",rowid);
	   	},
	   	gridComplete : function(){
	   		smsFrqntList_Complete();
	   	}
	}).jqGrid("navGrid", "#pagingSmsFrqntList", {edit : false, add : false, del : false, search : false});	
}

// jqgrid onSelectRow
function smsFrqntList_SelectRow(type,rowid){
	initSpec();
	$("#btnFrqntModi, #btnFrqntHide").show();
	$("#btnFrqntSave").hide();
	var row = $("#tblSmsFrqntList").getRowData(rowid);
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getSmsSendSpec.do",
		data : "pJson=" + getJsonStrSmsFrqntDetails(row.SMS_TMPLT_ID),
		success : function(data){   
			if(type=="onSelect"){
				$("#tfFrqTmpltId").val(data.SMS_TMPLT_ID);
				/*$("#selFrqPrfType").val(data.SMS_CLASS);*/
				
				if(data.COMMON_YN=="Y"){
					$("#chkPrfCommon").prop("checked", true);
					if(!isMngr) {
						$("#btnFrqntSave, #btnFrqntModi, #btnFrqntHide").hide();
					}
				}else{
					$("#chkPrfCommon").prop("checked", false);
				}
				
				$("#tfFrqPrfOrd").val(data.ORD);
				$("#tfFrqPrfTtl").val(data.SMS_TTL);
				$("#tfFrqPrfCont").val(data.SMS_CONT);
				$("#labFrqPrfCrtNm").html(data.MOD_USR_NM);
				$("#labFrqPrfCrtDh").html(data.MOD_DH);
				$("#labFrqPrfContSz").html(data.SMS_SZ);
			}else if(type=="choose"){
				$("#tfSendCont").val(data.SMS_CONT);
				$("#labCountTxt").html(data.SMS_SZ);
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//jqgrid gridComplete
function smsFrqntList_Complete(){
	var ids = $("#tblSmsFrqntList").getDataIDs();
		for(var i = 0; i < ids.length; i++){
			var rowid = ids[i];
		var row = $("#tblSmsFrqntList").getRowData(rowid);
		
		if(row.SMS_TMPLT_ID != null && row.SMS_TMPLT_ID != ""){
			var rcvnBtn = "<button type='button' class='button' id='rcvn_" + row.SMS_TMPLT_ID + "' onclick='fnRcvnList("+rowid+ "); return false;'>선택</button>";
			$("#tblSmsFrqntList").jqGrid("setRowData", rowid, { RCVN_BUTTON : rcvnBtn });		
			//$("#rcvn_" + row.SMS_TMPLT_ID).bind("click", fnRcvnList(rowid));		
		}
	}
}

//수신확인 버튼 실행
function fnRcvnList(rowid){
	smsFrqntList_SelectRow("choose",rowid);
}

/** 자주쓰는 문자 기능 Set End */


/** 자주쓰는 문자 버튼 Set End */
function frqntListSrch_Event(){
	
	$("#tblSmsFrqntList").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrSmsFrqntList()
		},
		page : 1,
		sortname : "ord",
		sortorder : "asc",
		loadComplete : function(){
			initSpec();
		}
	}).trigger("reloadGrid");
}

function frqntSave_Event(){
	var rMsg = checkFrqntSpec();
	
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	
	if(confirm("저장 하시겠습니까?")){
		gAppendHidden("smsFrqntForm", "pJson", getJsonStrFrqntSave());
		gSubmitPost("smsFrqntForm", true);
		setTimeout(function(){
			frqntListSrch_Event();
		}, 300);
	}
}

function frqntModi_Event(){
	var rMsg = checkFrqntSpec();
	
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	
	if(confirm("수정 하시겠습니까?")){
		gAppendHidden("smsFrqntForm", "pJson", getJsonStrFrqntModi());
		gSubmitPost("smsFrqntForm", true);
		
		setTimeout(function(){
			frqntListSrch_Event();
		}, 300);
	}
}

function frqntHide_Event(){
	if(confirm("삭제 하시겠습니까?")){
		gAppendHidden("smsFrqntForm", "pJson", getJsonStrFrqntHide());
		gSubmitPost("smsFrqntForm", true);
		
		setTimeout(function(){
			frqntListSrch_Event();
		}, 300);
	}
}

function sms_Frequently_btn(){
	// 문자내용 keyup 이벤트
	$("#tfFrqPrfCont").bind("keyup", function(e){
		$("#labFrqPrfContSz").html(charByteSize($("#tfFrqPrfCont").val()));
	});
	
	// 순서 숫자만 입력
	$("#tfFrqPrfOrd").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	
	// 조회, 초기화 버튼 클릭 이벤트 , 공통포함 체크 이벤트
	$("#btnFrqntListSrch, #btnFrqntReset, #chkCommon").bind("click", frqntListSrch_Event);
	
	// 등록 버튼 클릭 이벤트
	$("#btnFrqntSave").bind("click", frqntSave_Event);
	
	// 수정 버튼 클릭 이벤트
	$("#btnFrqntModi").bind("click", frqntModi_Event);
	
	// 삭제 버튼 클릭 이벤트
	$("#btnFrqntHide").bind("click", frqntHide_Event);
}
/** 자주쓰는 문자 버튼 Set End */

////////////////////////////////////////////

/* file upload start */

var fileCount = 0;

// 파일 테스트
function fnMultiFileCheck(){
	$('#smsSendImg').MultiFile({
        max: 3, 				//업로드 최대 파일 갯수 (지정하지 않으면 무한대)
        accept: 'jpg',			//허용할 확장자(지정하지 않으면 모든 확장자 허용)
//        maxfile: 30,			//각 파일 최대 업로드 크기
        maxsize: 300,  			//전체 파일 최대 업로드 크기
        STRING: { 				//Multi-lingual support : 메시지 수정 가능
            remove : "제거",		//추가한 파일 제거 문구, 이미태그를 사용하면 이미지사용가능
            duplicate : "$file 은 이미 선택된 파일입니다.", 
            denied : "$ext 는(은) 업로드 할수 없는 파일확장자입니다.",
            selected:'$file 을 선택했습니다.', 
            toomuch: "업로드할 수 있는 최대크기를 초과하였습니다.($size)", 
            toomany: "업로드할 수 있는 최대 갯수는 $max개 입니다.",
            toobig: "$file 은 크기가 매우 큽니다.\n(max $size)"
        },
        afterFileSelect: function(element, value, master_element) {
        	fileCount ++;
//        	console.log("fileCount >> "+fileCount);
  	    },
  	    afterFileRemove: function(element, value, master_element) {
  	    	fileCount --;
//  	    	console.log("fileCount >> "+fileCount);
	    },
        list:"#fileList" //파일목록을 출력할 요소 지정가능
    });
	
}
/* file upload end */

// init page
$(document).ready(function(){
	
	fnMultiFileCheck();
	
	if(tcktId!=""||tcktId!=null){
		$("#tfSendPhoneNum").val(cntctInform);
	}
	
	// 상담사정보를 셋팅
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/getUsrInfo.do",
		data : "pJson=" + getJsonStrUsrInfo(),
		success : function(data){
			$("#labSendUsrId").html(data.USR_NM);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	// 예약일시 datetimepicker 설정
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
	
	// 발신번호 셋팅
	$("#labSendNum").html("061-749-3114");
	
	// 수신번호 '-' 붙이기
	setPhoneNumFormat("tfSendPhoneNum");	
	  
	$("#sendContFooter").html(smsSendContFooter);
	
	// 문자내용 keyup 이벤트
	$("#tfSendCont").bind("keyup", function(e){
		$("#labCountTxt").html(charByteSize($("#tfSendCont").val()+"\n"+$("#sendContFooter").html()));
	});
	
	// 초기화 버튼 클릭 이벤트
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	// 전송 버튼 클릭 이벤트
	$("#btnSend").bind("click", btnSend_clickEvent);
	
	// 고객선택 버튼 클릭 이벤트
	$("#btnCustSelect").bind("click", btnCustSelect_clickEvent);
	
	if(window.sessionStorage.getItem("cnslSmsSendNum") != null && window.sessionStorage.getItem("cnslSmsSendNum") != "")
		g_sndrCntct = window.sessionStorage.getItem("cnslSmsSendNum");
	
	if(window.sessionStorage.getItem("cnslSmsTcktId") != null && window.sessionStorage.getItem("cnslSmsTcktId") != "")
		$("#tfTcktId").val(window.sessionStorage.getItem("cnslSmsTcktId"));
	
	if(window.sessionStorage.getItem("cnslSmsCustId") != null && window.sessionStorage.getItem("cnslSmsCustId") != "")
		setCustInfo("", window.sessionStorage.getItem("cnslSmsCustId"));
	
	/** 자주쓰는 문자 기능 Set */
	sms_Frequently_Set();
	sms_Frequently_btn();
});