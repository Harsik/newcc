// PW 변경일
function changePWdate() {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/user/changePWdate.do",
		data : "pJson=" + getJsonStrLoginChangeView($("#mdfUsrPw_usrId").val()),
		success : function(data) {
			if (data.CH_PWD.length != 11) {
				alert(data.CH_PWD.substring(1, 20));
				$("#chPwd").html(data.CH_PWD);
			};
		}, 
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrLoginChangeView(mdfUsrPw_usrId) {
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "b20wMDEuc2VsZWN0VXNy",
		"map" : {
			"key" : "value",
			"usrId" : mdfUsrPw_usrId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 저장 버튼 클릭
function btnUpdate_clickEvent() {
	var passwordRules = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*|'";:₩/?]).*$/;
	var rMsg = "";
	var mdfUsrPw_usrId = $("#mdfUsrPw_usrId").val();
	
	if($("#mdfUsrPw_newPw").val() == "")
		rMsg += "\n\n 신규 비밀번호를 입력 해 주세요.";
	if($("#mdfUsrPw_newPw").val() != $("#mdfUsrPw_newPwChk").val())
		rMsg += "\n\n  신규 비밀번호와 신규 비밀번호 확인의 입력 값이 다릅니다.";		
	if(!passwordRules.test($("#mdfUsrPw_newPw").val()))
		rMsg += "\n\n 비밀번호는 8 ~ 20자리 이내 영문, 특수문자, 숫자를 포함해서 입력해주세요.";
	
	if (rMsg !== "") {
		alert(rMsg);
		return;
	} else {
		if (confirm("저장 하시겠습니까?")) {
			$.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/user/userPwModify.do",
				data : "pJson=" + getJsonStrUpdateUser(mdfUsrPw_usrId),
				success : function() {
//					2020.01.08 이미 패스워드 업데이트 후 다시한번 업데이트 하는 로직 제거
//					gAppendHidden("mdfUsrPw_userPwForm", "pJson", getJsonStrUpdateUser(mdfUsrPw_usrId));
//					gSubmitPost("mdfUsrPw_userPwForm", true);
					alert('패스워드가 수정 되었습니다.');
					opener.btnInit_clickEvent();
					selfClose();
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});
		}
	}
}

function getJsonStrUpdateUser(mdfUsrPw_usrId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMDEudXBkYXRlUHdkQWRtaW5Nb2Q=",
		"map" : {
			"key" : "value",
			"pwd_no_enc_cntn" : SHA256($("#mdfUsrPw_newPw").val()),
			"usr_Id" : mdfUsrPw_usrId
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


function chkAllAgent_clickEvent(){
	if($("#chkAllAgent").is(":checked")){
		$("#mdfUsrPw_usrId").val("all");
	}else{
		$("#mdfUsrPw_usrId").val(opener.document.getElementById("usrMngmnt_usrIdText").value);
	}
}

$(document).ready(function() {
	document.getElementById("mdfUsrPw_usrId").value = opener.document.getElementById("usrMngmnt_usrIdText").value;
	
	changePWdate();
	
	$("#mdfUsrPw_btnExit").bind("click", function() {
		window.close();
	});
	
	$("#mdfUsrPw_btnUpdate").bind("click", btnUpdate_clickEvent);
	
	$("#chkAllAgent").bind("click", chkAllAgent_clickEvent);
});