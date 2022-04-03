var usrId = window.sessionStorage.getItem("usrId");
var usrNm = window.sessionStorage.getItem("usrNm");
var ou = window.sessionStorage.getItem("ou");


var ttl = "[순천시 문의 접수건에 대한 처리내용]";


$(document).ready(function() {
	var x = opener.document.getElementById("cstrvc_ctzn_tel_no_c").textContent; 
	document.getElementById("cstrvc_tfSendPhoneNum").value = x;
	
	var y = opener.document.getElementById("cstrvc_ofce_tel_no").value;
	if(y == '') { // 사무실 번호가 공백일때, 발신번호도 공백처리로 됌.
		$("#cstrvc_labSendNum").prop("disabled", false);
	}else{
		document.getElementById("cstrvc_labSendNum").value = y;
	}
	
	var z = opener.document.getElementById("cstrvc_tckt_id_c").value;
	document.getElementById("cstrvc_tfTcktId").value = z;
	
	var c = opener.document.getElementById("cstrvc_cvl_act_cont").value;;
	document.getElementById("cstrvc_tfSendCont").value = c;
	$("#cstrvc_labCountTxt").html(charByteSize(c));
	
	// 예약일시 datetimepicker 설정
	$("#cstrvc_tfResvDtm").datetimepicker({
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
	
	// 문자내용 keyup 이벤트
	$("#cstrvc_tfSendCont").bind("keyup", function(e){
		$("#cstrvc_labCountTxt").html(charByteSize($("#cstrvc_tfSendCont").val()));
	});
	
	// 초기화 버튼 클릭 이벤트
	$("#cstrvc_btnInit").bind("click", btnInit_clickEvent);
	
	// 전송 버튼 클릭 이벤트
	$("#cstrvc_btnSend").bind("click", btnSend_clickEvent);
});

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent(){
	$("#tfResvDtm").val("");
	$("#cstrvc_tfSendCont").val("");
	$("#cstrvc_labCountTxt").html("0");
}

//전송 버튼 클릭 이벤트 
function btnSend_clickEvent(){
	var send_date = $("#cstrvc_tfResvDtm").val().trim(); //예약일시 (2021-09-30 15:40)
	var nowDateTime = getDateTime(); //현재일시 (2021-09-30 14:51:30)
	var contLength = charByteSize($("#cstrvc_tfSendCont").val());
	var smsCheck = 4; // SMS : 4, LMS or MMS : 6
	var smsType = "SMS";
	
	if(send_date != "" && (send_date<nowDateTime)){ //예약 날짜 체크
		alert("잘못된 예약일시 입니다.\n예약일시를 확인 해 주시기 바랍니다.");
		$("#cstrvc_tfResvDtm").focus();
		return;
	}
	
	if($("#cstrvc_labSendNum").val() == ""){
		alert("발신번호를 입력해주세요.");
		$("#cstrvc_labSendNum").focus();
		return;
	}
	
	if(contLength > 2000){
		alert("전송 메시지는 2000byte를 넘길수 없습니다.");
		$("#cstrvc_tfSendCont").focus();
		return;
	}
	
	if(contLength <= 90){
		smsCheck = 4;
		smsType = "SMS";
	}else{
		smsCheck = 6;
		smsType = "LMS";
	}
	
	if(smsType == "SMS"){
	
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/civilservice/sendSms.do",
			data : "pJson=" + getJsonStrSendSms("",smsCheck,smsType,send_date),
			success : function(data){
				alert("발송요청이 완료되었습니다.");
				window.close();
			},
			error : function(data, status, err) {
				alert("이관 메세지 발송 오류 : SMS_SEND ERROR !!");
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
					url : getContextPath() + "/ajax/civilservice/setRsltAlrmSendNuri.do",
					data : "pJson=" +  getJsonStrSendSms(cont_seq,smsCheck,smsType,send_date),
					success : function(data){
						
						// INSERT MMS_CONTENT
						$.ajax({
							type : "post",
							dataType: "json",
							async : false,
							url : getContextPath() + "/ajax/civilservice/setRsltAlrmSendNuriContent.do",
							data : "pJson=" +  getJsonStrSmsContent(cont_seq),
							success : function(data){
								alert("발송요청이 완료되었습니다.");
								window.close();
							},
							error : function(data, status, err) {								
								alert("이관 메세지 발송 오류 : MMS_CONTENT ERROR !!");
							}
						});	// MMS_CONTENT ajax End
						
					},
					error : function(data, status, err) {								
						alert("이관 메세지 발송 오류 : MSG_DATA ERROR !!");
					}
				});	// MSG_DATA ajax End
			
			},error : function(data, status, err) {
				alert("이관 메세지 발송 오류 : MMS_SEQ ERROR !!");
			}
		}); //MMS AJAX
		
	} // IF END
}

//파라미터 셋팅_SendSms
function getJsonStrSendSms(cont_seq,smsCheck,smsType,send_date){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c21zLnNlbmRTbXM=",
		"map" : {
			"key" : "value",
			"cont_seq" : cont_seq,
			"usr_id" : usrId,
			"usr_nm" : "(공)"+usrNm,
			"smsCheck" : smsCheck,
			"smsType" : smsType,
			"send_date" : send_date,
			"sms_msg" : $("#cstrvc_tfSendCont").val(),
			"callback" : $("#cstrvc_labSendNum").val().replace(/-/gi, ""),
			"dest_info" :  $("#cstrvc_tfSendPhoneNum").val().replace(/-/gi, ""),
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_SendSmsContent
function getJsonStrSmsContent(cont_seq){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c21zLnNlbmRTbXNDb250ZW50",
		"map" : {
			"key" : "value",
			"cont_seq" : cont_seq,
			"subject" : ttl,
			"content" : $("#cstrvc_tfSendCont").val(),
			"file_cnt": 1,
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

