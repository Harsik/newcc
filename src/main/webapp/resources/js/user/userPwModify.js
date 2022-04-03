var tfUserId = window.sessionStorage.getItem("USR_ID");
var logins = "";

// 파라미터 셋팅
function getJsonStrLoginFromErp(pwd)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMDEubG9naW4=",
		"map" : {
			"key" : "value",
			"usr_id" : tfUserId,
			"pwd_no_enc_cntn" : SHA256(pwd)		// 로컬
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅
function getJsonStrLoginChangeView(usrId)
{
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "b20wMDEuc2VsZWN0VXNy",
		"map" : {
			"key" : "value",
			"usrId" : usrId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_UpdateProgram
function getJsonStrUpdateUser(){
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMDEudXBkYXRlUHdk",
		"map" : {
			"key" : "value",
			"pwd_no_enc_cntn" : SHA256($("#uspwmd_new_Pw").val())
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//프로그램 수정 버튼 클릭 이벤트
function btnUpdate_clickEvent(){
	
	var passwordRules =  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

	
	var rMsg = "";
	
	// 2020.01.08 체크로직 위치 변경. agax 내부 -> 외부
	if($("#uspwmd_new_Pw").val() == "")
		rMsg += "\n\n 신규 비밀번호를 입력 해 주세요.";
	if($("#uspwmd_new_Pw").val() != $("#uspwmd_new_Pw_Chk").val())
		rMsg += "\n\n 입력 하신 비밀번호와 확인 입력하신 비밀번호가 다릅니다.";		
	if(!passwordRules.test($("#uspwmd_new_Pw").val()))
		rMsg += "\n\n 비밀번호는 8 ~ 20자리 이내 영문, 특수문자, 숫자를 포함해서 입력해주세요.";
	
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userPwModify.do",
		data : "pJson=" + (getJsonStrLoginFromErp($("#uspwmd_old_Pw").val())),
		success : function(data){
			var resultCode = data.LOGIN_CODE;
			// 로그인 성공시 메인 open
			if(resultCode != "200"){
				rMsg += data.LOGIN_DESC;
			}
			
			if(rMsg !== ""){
				alert(rMsg);
				return;
			}
			
			if(confirm("저장 하시겠습니까?")){
				gAppendHidden("uspwmd_userPwForm", "pJson", getJsonStrUpdateUser());
				gSubmitPost("uspwmd_userPwForm", true);
				alert('패스워드가 수정 되었습니다.');
				selfClose();
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//사용자 패스워드 변경일
function ChangeView(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/ChangeView.do",
		data : "pJson=" +getJsonStrLoginChangeView(window.sessionStorage.getItem("USR_ID")),
		success : function(data){
			$("#uspwmd_chPwd").html(data.CH_PWD);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}


$(document).ready(function(){	
	ChangeView();
	$("#uspwmd_btnUpdate").bind("click", btnUpdate_clickEvent);
	
});