var sendingOuCode = opener.sendingOuCode!=null?opener.sendingOuCode:"";
var sendingUid = opener.sendingUid!=null?opener.sendingUid:"";
var sendingUName = opener.sendingUName!=null?opener.sendingUName:"";
var sendingOu = opener.sendingOu!=null?opener.sendingOu:"";
var sendingOuName = opener.sendingOuName!=null?opener.sendingOuName:"";
var sendingUTelNum = opener.sendingUTelNum!=null?opener.sendingUTelNum:"";

//파라미터 셋팅_SendSms
function getJsonStrSendSms(ch_snd_id){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFNtcw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : ch_snd_id,
			"tckt_id" : $("#cssdsm_tfTcktId").val(),
			"cust_id" : $("#cssdsm_tfCustId").val()==""?"1":$("#cssdsm_tfCustId").val(),
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : $("#cssdsm_tfSendPhoneNum").val().replace(/-/gi, ""),
			"snd_ttl" : "",
			"snd_cont" : $("#cssdsm_tfSendCont").val()+"\n"+$("#cssdsm_sendContFooter").html(),
			"snd_resv_dt" : $("#cssdsm_tfResvDtm").val().trim() == "" ? "" : changeDateString(getResvDate($("#cssdsm_tfResvDtm").val().trim())),
			"snd_resv_tm" : $("#cssdsm_tfResvDtm").val().trim() == "" ? "" : changeTimeString(getResvDate($("#cssdsm_tfResvDtm").val().trim())),
			"snd_end_dt" : "",
			"snd_end_tm" : "",
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"cro_id" : "2ksys_test",
			"schedule_type" : $("#cssdsm_tfResvDtm").val().trim() == "" ? "0" : "1",
			"subject" : "순천시3114온누리콜센터",
			"callback" : $("#cssdsm_labSendNum").html().replace(/-/gi, ""),
			"dest_info" : $("#cssdsm_tfSendPhoneNum").val().replace(/-/gi, ""),
			"cont_length" : parseInt($("#cssdsm_labCountTxt").html()),
			"p_param" : makeSmsSendParam(ch_snd_id),
			
			"tbl_nm" : "ch020",
			"tbl_pk": ch_snd_id,
			"send_img" : $("#cssdsm_tfSendImg").val().trim()
			//"message" : "발송요청이 완료되었습니다."
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_SendSms
function getJsonStrSendVms(ch_snd_id ,svr_sv_pth){
	//svr_sv_pth = svr_sv_pth.replace("/shared","shared");
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFZtcw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : ch_snd_id,
			"tckt_id" : $("#cssdsm_tfTcktId").val(),
			"cust_id" : $("#cssdsm_tfCustId").val()==""?"1":$("#cssdsm_tfCustId").val(),
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : $("#cssdsm_tfSendPhoneNum").val().replace(/-/gi, ""),
			"snd_ttl" : "",
			"snd_cont" : $("#cssdsm_tfSendCont").val()+"\n"+$("#cssdsm_sendContFooter").html(),
			"snd_resv_dt" : $("#cssdsm_tfResvDtm").val().trim() == "" ? "" : changeDateString(getResvDate($("#cssdsm_tfResvDtm").val().trim())),
			"snd_resv_tm" : $("#cssdsm_tfResvDtm").val().trim() == "" ? "" : changeTimeString(getResvDate($("#cssdsm_tfResvDtm").val().trim())),
			"snd_end_dt" : "",
			"snd_end_tm" : "",
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"cro_id" : "callcenter",
			"schedule_type" : $("#cssdsm_tfResvDtm").val().trim() == "" ? "0" : "1",
			"subject" : "순천시3114온누리콜센터",
			"callback" : $("#cssdsm_labSendNum").html().replace(/-/gi, ""),
			"dest_info" : $("#cssdsm_tfSendPhoneNum").val().replace(/-/gi, ""),
			"cont_length" : parseInt($("#cssdsm_labCountTxt").html()),
			"p_param" : makeSmsSendParam(ch_snd_id),
//			"cont_data" : svr_sv_pth+"^1^0",
			"cont_data" : svr_sv_pth,
			"tbl_nm" : "ch020",
			"tbl_pk": ch_snd_id,
			"send_img" : $("#cssdsm_tfSendImg").val().trim(),
			"message" : "발송요청이 완료되었습니다."
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//sms 전송 프로시저 호출을 위한 파라미터 제작
function makeSmsSendParam(ch_snd_id){
	var rsltStr = "";
	var arrParam = {};
	
	arrParam[0] = window.sessionStorage.getItem("IP_ADDRESS");			// 전송자 IP
	arrParam[1] = window.sessionStorage.getItem("USR_ID");			// 전송자 ID
	arrParam[2] = $("#cssdsm_tfSendPhoneNum").val().replace(/-/gi, "");			// 수신자 전화번호
	arrParam[3] = $("#cssdsm_labSendNum").html().replace(/-/gi, "");			// 발신자 전화번호
	arrParam[4] = "";			// 제목
	arrParam[5] = $("#cssdsm_tfSendCont").val()+"\n"+$("#cssdsm_sendContFooter").html();			// 내용
	arrParam[6] = $("#cssdsm_tfResvDtm").val().trim() == "" ? "N" : "Y";			// 예약여부
	arrParam[7] = $("#cssdsm_tfResvDtm").val().trim() == "" ? "" : changeDateString(getResvDate($("#cssdsm_tfResvDtm").val().trim())) + changeTimeString(getResvDate($("#cssdsm_tfResvDtm").val().trim()));			// 예약일자
	arrParam[8] = "044009";			// 메시지구분(044009)
	arrParam[9] = window.sessionStorage.getItem("USR_NM");			// 전송자명
	arrParam[10] = "0099";		// 전송작업장코드(0099)
	arrParam[11] = $("#cssdsm_tfCustFarmNo").val();		// 식별번호
	arrParam[12] = "tmp.txt";		// 첨부파일
	arrParam[13] = $("#cssdsm_tfCustId").val();		// 수신자 주소록번호
	arrParam[14] = $("#cssdsm_tfCustId").val();		// 수신자아이디
	arrParam[15] = $("#cssdsm_labCustNm").html();		// 수신자명
	arrParam[16] = "";		// 기타
	arrParam[17] = "";		// 옵션1
	arrParam[18] = ch_snd_id;		// 옵션2
	arrParam[19] = $("#cssdsm_tfTcktId").val();		// 옵션3_접수번호
	arrParam[20] = window.sessionStorage.getItem("CNTR_CD") == "010000" ? "GRADE" : "MTRACE";		// 사업구분_GRADE or MTRACE
	
	for(var i = 0; i < 21; i++){
		if(i == 20)
			rsltStr += arrParam[i];
		else
			rsltStr += arrParam[i] + "|";
	}
	
	return rsltStr;
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent(){
	$("#cssdsm_tfSendPhoneNum").val("");
	$("#cssdsm_tfSendPhoneNum").show();
	//$("#cssdsm_tfResvDtm").val("");
	$("#cssdsm_tfTcktId").val("");
	$("#cssdsm_labCountTxt").html("0");
	$("#cssdsm_tfSendCont").val("");
	$("#cssdsm_tfCustId").val("");
	//$("#cssdsm_tfCustFarmNo").val("");
	//$("#cssdsm_tfSendImg").val("");
}

//2020.02.27
function getJsonStrGetSmsID(){

	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "Y2gwMjAuZ2V0Q2hTbmRJZA==",
		"map" : {
			"key" : "value",
			
		}
	};
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
	
}

function getJsonStrInsertSmsHis(snd_id, cust_id, sendMobile, ttl, cont, dayChk){
	
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuaW5zZXJ0U21zSGlzdG9yeQ==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : snd_id,
			"tckt_id" : $("#cstrvc_tckt_id").val(),
			"cust_id" : cust_id,
			"ch_gb_cd" : "12000",
			"callback" : "0617493114",
			"rcv_cntct_infm" : sendMobile.replace(/-/gi, ""),
			"snd_ttl" : ttl,
			"snd_cont" : cont,
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : "sysmanager",
			"send_gb" : dayChk,
			"orgUsrId": usrId != "" ? usrId : cust_id 
		}
	};
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// sms전송 
//파라미터 셋팅_SendSms(수신자ID, 수신자전화번호, 제목, 문자내용, 발송시간체크여부)
function getJsonStrSendSms(snd_id, cust_id, sendMobile, ttl, cont, dayChk){
	
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFNtc0F1dG8=",
		"map" : {
			"key" : "value",
			"ch_snd_id" : snd_id,
			"tckt_id" : $("#cstrvc_tckt_id").val(),
			"cust_id" : cust_id,
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : sendMobile.replace(/-/gi, ""),
			"snd_ttl" : ttl,
			"snd_cont" : cont,
			
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : "sysmanager",
			"cro_id" : "callcenter",

			"subject" : "순천시3114온누리콜센터",
			"callback" : "0617493114",
			"dest_info" : sendMobile.replace(/-/gi, ""),
			"cont_length" : charByteSize(cont),
			"send_gb" : dayChk,
			"orgUsrId": usrId != "" ? usrId : cust_id 
		}
	};
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
	
}

/*
//전송 버튼 클릭 이벤트 
function SendSMS(cust_id, sendMobile, ttl, cont, dayChk){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : "/ajax/civilservice/cswSMS.do",
		data : "pJson=" + getJsonStrSendSms(cust_id, sendMobile, ttl, cont, dayChk),
		success : function(data){
//			alert("문자발송 완료.");
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}*/
//전송 버튼 클릭 이벤트
function btnSend_clickEvent(){
	
	var sSendID = '';
	
	console.log("0. SendSMS - Start");
	
	// 1. get ch_snd_id
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : "/ajax/civilservice/cswSMS.do",
		data : "pJson=" + getJsonStrGetSmsID(),
		success : function(data){
			sSendID = data.CH_SND_ID;
			
			console.log("1. SendSMS - get ch_snd_id");
			
			// 2. INSERT INTO ch020
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : "/ajax/civilservice/cswSMS.do",
				data : "pJson=" + getJsonStrInsertSmsHis(sSendID, cust_id, sendMobile, ttl, cont, dayChk),
				success : function(data){
					
					console.log("2. SendSMS - INSERT INTO ch020");
					
					// 3. INSERT INTO T_SMS_SD or INSERT INTO T_LMS_SD
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : "/ajax/civilservice/cswSMS.do",
						data : "pJson=" + getJsonStrSendSms(sSendID, cust_id, sendMobile, ttl, cont, dayChk),
						success : function(data){
							console.log("3. SendSMS - INSERT INTO T_SMS_SD or INSERT INTO T_LMS_SD");
							alert("발송되었습니다.");
						},
						error : function(data, status, err) {
							console.log("3. SendSMS - INSERT INTO T_SMS_SD or INSERT INTO T_LMS_SD Error");
							networkErrorHandler(data, status, err);
						}
					});
					
				},
				error : function(data, status, err) {
					console.log("2. SendSMS - INSERT INTO ch020 Error");
					networkErrorHandler(data, status, err);
				}
			});
			
		},
		error : function(data, status, err) {
			console.log("1. SendSMS - get ch_snd_id Error");
			networkErrorHandler(data, status, err);
		}
	});
	
}
// init page
$(document).ready(function(){
	// 상담사정보를 셋팅
	/*$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/cswgetUsrInfo.do",
		data : "pJson=" + getJsonStrUsrInfo(),
		success : function(data){
			$("#cssdsm_labSendUsrId").html(data.USR_NM);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});*/
	
	
	// 발신번호 셋팅

	// 수신번호 '-' 붙이기
	setPhoneNumFormat("tfSendPhoneNum");	
	  
	//$("#cssdsm_sendContFooter").html(smsSendContFooter);
	
	// 문자내용 keyup 이벤트

	$("#cssdsm_labSendUsrId").html(sendingUName);
	$("#cssdsm_labSendNum").html(sendingUTelNum);
	// 초기화 버튼 클릭 이벤트
	$("#cssdsm_btnInit").bind("click", btnInit_clickEvent);
	
	// 전송 버튼 클릭 이벤트
	$("#cssdsm_btnSend").bind("click", btnSend_clickEvent);
	
	// 고객선택 버튼 클릭 이벤트
	
	/*
	 	if(document.smsSendForm.tfSendImg.value != ""){
		var nLimitSize = 0.30; //제한사이즈 MB
		var formName = $("#cssdsm_smsSendForm input[name=tfSendImg]");
		for(var i=0; i<formName.length; i++){
			if(formName[i].value !=""){
				var nRtn=fileCheck(formName[i] , nLimitSize);
				if(nRtn>nLimitSize){ 
					alert( "("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.");
					return;
				}
				
				//파일 확장자 체크
				if (fileSmsCheck(formName[i]) == false){
					alert("JPG 파일만 업로드 하실 수 있습니다!");
					return;
				}
			}
		}
	}
	 * 
	 */
});