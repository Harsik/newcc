//파라미터 셋팅_InsertUserLogoutHistory
function getJsonStrInsertUserLogoutHistory()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b2gwMjAudXBkYXRlTG9nb3V0VG0=",
		"map" : {
			"key" : "value",
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"lgt_tm" : changeTimeString(new Date())
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_InsertUserLogoutStatus
function getJsonStrInsertUserLogoutStatus()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMjEubWVyZ2U=",
		"map" : {
			"key" : "value",
			"wrk_dt" : changeDateString(new Date()),
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"usr_nm" : window.sessionStorage.getItem("USR_NM"),
			"cntr_cd" : window.sessionStorage.getItem("CNTR_CD"),
			"team_cd" : window.sessionStorage.getItem("TEAM_CD"),			
			"lvof_time" : changeTimeString(new Date())
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 로그아웃 메소드
function fnLogout_newwindow()
{
	// 로그아웃 이력 저장
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/insertUserLogoutHistory.do",
		data : "pJson=" + getJsonStrInsertUserLogoutHistory(),
		success : function(data)
		{
			console.log("logout History save complete!!");
			
			// 근태현황 테이블에 저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/insertUserLogoutStatus.do",
				data : "pJson=" + getJsonStrInsertUserLogoutStatus(),
				success : function(data)
				{
					console.log("login status save complete!!");
					
					// 로그인 화면 open
					var paramURL = getContextPath() + "/web/user/login.do";
					window.open(paramURL, "login", "");

					// 현재 세션을 clear
					window.sessionStorage.clear();
					
					// 메인 창 닫음
					selfClose();
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

//페이지 초기화
$(document).ready(function()
{
	// 창 위치 및 크기 조절
	window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);
    
    // 로그아웃 과정 동작 후 로그인 화면 실행
	fnLogout_newwindow();
});