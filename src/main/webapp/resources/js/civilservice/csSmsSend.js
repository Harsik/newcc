var usr_id = window.sessionStorage.getItem("USR_ID");
var usr_nm = window.sessionStorage.getItem("USR_NM");
var sms_cd = window.sessionStorage.getItem("SMS_CD");

var smsSendContFooter = "-순천시3114온누리콜센터-";
var callback = "061-749-3114";
var custNum = opener.$("#hidTaxSpNumber").val();

function btnSend_clickEvent(){
	var telNo = $("#tfSendPhoneNum").val().replace(/-/gi, "");
	
	var contLength = charByteSize($("#tfSendCont").val()+"\n\n"+$("#sendContFooter").html());
	var smsCheck = 4; // SMS : 4, LMS or MMS : 6
	var smsType = "SMS";
	
	if(telNo.trim() == ""){
		alert("수신번호가 없습니다.");
		return;
	}
	
	if(telNo.length > 11 || telNo.substr(0,2) != "01"){ // 전화번호 체크
		alert("잘못된 수신번호 입니다.\n수신번호를 확인 해 주시기 바랍니다.");
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
	
	if(contLength <= 90){
		smsCheck = 4;
		smsType = "SMS";
	}else{
		smsCheck = 6;
		smsType = "LMS";
	}
	
	if(!confirm("전송 하시겠습니까?"))
		return;
	
	if(smsType == "SMS"){
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/civilservice/sendSms.do",
			data : "pJson=" + getJsonStrSendSms("",smsCheck,smsType),
			success : function(data){
				alert("발송요청이 완료되었습니다.");
				window.close();
			},
			error : function(data, status, err) {
				alert("행정정보 메세지 발송 오류 : SMS_SEND ERROR !!");
				networkErrorHandler(data, status, err);
			}
		});
		
	}else{ //  LMS
		
		// MMS CONTENTS SEQ
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/getMmsSeq.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l","c21zLm5leHR2YWw=", {
				
			}),
			success : function(data){
				var cont_seq = data.SMS_SEQ;
				
				// INSERT MSG_DATA
				$.ajax({
					type : "post",
					dataType: "json",
					async : false,
					url : getContextPath() + "/ajax/civilservice/getSendSms.do",
					data : "pJson=" +  getJsonStrSendSms(cont_seq,smsCheck,smsType),
					success : function(data){
						
						// INSERT MMS_CONTENT
						$.ajax({
							type : "post",
							dataType: "json",
							async : false,
							url : getContextPath() + "/ajax/civilservice/getMmsCont.do",
							data : "pJson=" +  getJsonStrSendMmsCont(cont_seq),
							success : function(data){
								alert("전송요청이 완료되었습니다.");
								window.close();
							},
							error : function(data, status, err) {								
								alert("행정정보 메세지 발송 오류 : MMS_CONTENT ERROR !!");
							}
						});	// MMS_CONTENT ajax End
						
					},
					error : function(data, status, err) {								
						alert("행정정보 메세지 발송 오류 : MSG_DATA ERROR !!");
					}
				});	// MSG_DATA ajax End
			
			},error : function(data, status, err) {
				alert("행정정보 메세지 발송 오류 : MMS_SEQ ERROR !!");
			}
		}); //MMS AJAX 
	}
	
}

function getJsonStrSendSms(cont_seq,smsCheck,smsType){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c21zLnNlbmRTbXM=",
		"map" : {
			"key" : "value",
			"cont_seq" : cont_seq,
			"usr_id" : usr_id,
			"usr_nm" : usr_nm,
			"smsCheck" : smsCheck,
			"smsType" : smsType,
			"sms_msg" : $("#tfSendCont").val()+"\n\n"+$("#sendContFooter").html(),
			"callback" : callback.replace(/-/gi, ""),
			"dest_info" :  $("#tfSendPhoneNum").val().replace(/-/gi, ""),
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrSendMmsCont(cont_seq){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "c21zLnNlbmRTbXNDb250ZW50",
			"map" : {
				"key" : "value",
				"cont_seq" : cont_seq,
				"file_cnt" : 1,
				"subject" : "",
				"content" : $("#tfSendCont").val()+"\n\n"+$("#sendContFooter").html(),
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function initContent(sms_cd){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/getContent.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "b20wMzUuc2VsZWN0TGlzdA==", { "sms_class" : sms_cd }),
		success : function(data){
			if(data != null){
				$("#tfSendCont").val(data.SMS_CONT);
				setContent(sms_cd)
			}else{
				$("#tfSendCont").val("SMS 템플릿 X");
			}
		},
		error : function(data, status, err) {								
			networkErrorHandler(data, status, err);
		}
	});
}

function setContent(sms_cd){
	if(totMoney == ""){
		totMoney = "0";
	}
	var content = $("#tfSendCont").val();
	
	switch(sms_cd) {
    case 'csEnvrnImprv':
    	content = content.replace("$name",custName);
    	content = content.replace("$money",totMoney);
    	content = content.replace("$account",account1);
    	break;
    case 'csLocaltax':
    	content = content.replace("$saemok",saemokNm);
    	content = content.replace("$money",totMoney);
    	content = content.replace("$account",account1);
    	break;
    case 'csNonTaxRcpt':
    	content = content.replace("$name",custName);
    	content = content.replace("$money",totMoney);
    	content = content.replace("$account",account1);
    	content = content.replace("$count",totCnt);
    	break;
    case 'csCar':
    	content = content.replace("$money",totMoney);
    	content = content.replace("$account",account1);
    	break;
    case 'csWater':
    	content = content.replace("$money",totMoney);
    	content = content.replace("$account1",account1);
    	content = content.replace("$account2",account2);
    	break;
	}
	
	$("#tfSendCont").val(content);
	$("#labFrqPrfContSz").html(charByteSize(content+"\n\n"+$("#sendContFooter").html()));
}

$(document).ready(function(){
	console.log("custName : " +custName+ ", totMoney : " +totMoney+ ", account1 : " +account1+ ", account2 : " +account2+ ", saemokNm : " +saemokNm);
	
	initContent(sms_cd);
	
	$("#labSendNum").html(callback);
	
	$("#tfSendPhoneNum").val(getPhoneNumFormat(custNum));
	// 상하수도의 경우 인입번호 셋팅
	if(sms_cd=="csWater"){
		$("#tfSendPhoneNum").val(opener.opener.$("#tfContactInform").val());
		$("#tfSendPhoneNum").prop("readonly", false);
	}
	
	setPhoneNumFormat("tfSendPhoneNum");
	
	$("#labSendUsrId").html(usr_nm);
	$("#sendContFooter").html(smsSendContFooter);
	
	$("#btnSend").bind("click", btnSend_clickEvent);
	
	// 문자내용 keyup 이벤트
	$("#tfSendCont").bind("keyup", function(e){
		$("#labFrqPrfContSz").html(charByteSize($("#tfSendCont").val()+"\n\n"+$("#sendContFooter").html()));
	});
});