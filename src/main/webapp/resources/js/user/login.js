//파라미터 셋팅_getJsonStrUpdateUserUseYn
function getJsonStrUpdateUserUseYn(usrId)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMDEudXNyVXNlWW4=",
		"map" : {
			"key" : "value",
			"usr_id" : usrId,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅
function getJsonStrLoginFromErp(usrId, pwd)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMDEubG9naW4=",
		"map" : {
			"key" : "value",
			"usr_id" : usrId,
			"pwd_no_enc_cntn" : SHA256(pwd)		// 로컬
			//"pwd_no_enc_cntn" : pwd				// 배포
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStr(usrId)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMDEubG9naW5Gcm9tRXJw",
		"map" : {
			"key" : "value",
			"usr_id" : usrId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonUserCheckStr(workDt, usrId) {	
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b2gwMjEudXNlckNoZWNr",
		"map" : {
			"key" : "value",
			"workDate" : workDt,
			"usr_id" : usrId
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_InsertUserLoginHistory
function getJsonStrInsertUserLoginHistory(usr_id, lgn_tm, extn_no, lgn_pc_ip, cti_lgn_id)
{	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b2gwMjAuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"usr_id" : usr_id,
			"lgn_tm" : lgn_tm,
			"extn_no" : extn_no == null ? "" : extn_no,
			"lgn_pc_ip" : lgn_pc_ip,
			"cti_lgn_id" : cti_lgn_id == null ? "" : cti_lgn_id
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_InsertUserLoginStatus
function getJsonStrInsertUserLoginStatus()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b2gwMjEubWVyZ2U=",
		"map" : {
			"key" : "value",
			"wrk_dt" : changeDateString(new Date()),
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"usr_nm" : window.sessionStorage.getItem("USR_NM"),
			"cntr_cd" : window.sessionStorage.getItem("CNTR_CD"),
			"team_cd" : window.sessionStorage.getItem("TEAM_CD"),
			"aaw_time" : changeTimeString(new Date()),
			"lvof_time" : ""
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CtiStatus
function getJsonStrCtiStatus()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y3dfY2luZTA0LmdldFVzckN0aVN0YXR1cw==",
		"map" : {
			"key" : "value",
			"c_user_id" : window.sessionStorage.getItem("EXTN_NO")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_PgsqlUsrYn
function getJsonStrPgsqlUseYn()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDIuY29kZXNwZWM=",
		"map" : {
			"key" : "value",
			"tp_cd" : "90500",
			"cd" : "1"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_dgtDeptList
function getJsonStrGetDeptList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20xMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//연속된 문자 카운트
function stck(str, limit) {
    var o, d, p, n = 0, l = limit == null ? 4 : limit;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (i > 0 && (p = o - c) > -2 && p < 2 && (n = p == d ? n + 1 : 0) > l - 3) return false;
        d = p, o = c;
    }
    return true;
}

//개인정보 변경하는 함수
function getJsonStrUserselect()
{
	var loParam = {
			  "qt" : "c2VsZWN0T25l",
			  "mi" : "b20wMDEucHdkTGlzdA==",
			  "map" : {
			   "key" : "value",
			   "usr_id" : window.sessionStorage.getItem("USR_ID")
			  }
			 };
			 
			 console.log(JSON.stringify(loParam));
			 return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 로그인 버튼 클릭
function btnLogin_clickEvent()
{
	//6~20자리 문자열 숫자와 문자와 같이 있어야 함
	/*var regexPw = /^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
	var input = $("#tfUserPass").val().trim();
	if (regexPw.test(input)) {
	    //연속된 숫자 테스트
	    var regexNo = /(\w)\1\1/;
	    if (!regexNo.test(input)) {
	        if (!stck(input, 3)) {
	            alert("연속된 3자리 문자는 사용할 수 없습니다."); return;
	        }
	    }
	    else {
	        alert("3개 이상의 동일한 문자는 사용할 수 없습니다."); return;
	    }
	} else {
	    alert("비밀번호는 8 ~ 20자리 이내 영문, 특수문자, 숫자를 포함해서\n 입력해주세요."); return;
	}*/

	
	var isErp = $("#isErp").val() == "Y" ? true : false;
	
	if($("#tfUserId").val() == "")
	{
		alert("아이디를 입력 해 주세요");
		$("#tfUserId").focus();
		return;
	}
	if(!isErp && $("#tfUserPass").val() == "")
	{
		alert("비밀번호를 입력 해 주세요");
		$("#tfUserPass").focus();
		return;
	}
	
	var usrInfo = null;
	
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/login.do",
		data : "pJson=" + (isErp ? getJsonStr($("#tfUserId").val()) : getJsonStrLoginFromErp($("#tfUserId").val(), $("#tfUserPass").val())),
		success : function(data)
		{
			var resultCode = data.LOGIN_CODE;
			
			// 로그인 성공시 메인 open
			if(resultCode === "200")
			{
				//로그인 비밀번호 5회 오류
				//window.sessionStorage.setItem("PW_ERR_CNT", 0);
				
				if(!isErp)
				{
					// 아이디 저장 체크박스 체크 여부에 따라 로컬스토리지에 저장
					if($("input[id=chkSave]:checkbox").prop("checked") == true)
						window.localStorage.setItem("loginId", $("#tfUserId").val());
					else
						window.localStorage.setItem("loginId", "");
				}
				
				usrInfo = data;
				
				 
				
				var extn_no="";
				
				window.sessionStorage.setItem("CHANGE_EXTN_NO", "N");
				if($("#tfExtnNo").val() !=""){
					
					if (confirm("입력한  내선번호("+$("#tfExtnNo").val()+")를 사용하시겠습니까?") == true){    //확인
					    extn_no = $("#tfExtnNo").val();
					    window.sessionStorage.setItem("CHANGE_EXTN_NO", "Y");
					}else{   //취소
					     extn_no ="";
					}
				}

				// 지역지원일 경우 입력 받은 내선번호 정보를 사용
				if(data.CNTR_CD == "030000")
				{
					if($("#tfExtnNo").val() != "" && $("#tfExtnNo").val().substring(0, 2) != "76")
					{
						alert("올바른 내선번호가 아닙니다.");
						return;
					}
					
					// 세션스토리지에 로그인 사용자 정보
					window.sessionStorage.setItem("USR_ID", data.USR_ID);
					window.sessionStorage.setItem("USR_NM", data.USR_NM);
					window.sessionStorage.setItem("IP_ADDRESS", data.IPADDR);
					window.sessionStorage.setItem("CNTR_CD", data.CNTR_CD);
					window.sessionStorage.setItem("TEAM_CD", data.TEAM_CD);
					window.sessionStorage.setItem("DEPT_CD", data.DEPT_CD);
					window.sessionStorage.setItem("TEAM_NM", data.TEAM_NM);
					window.sessionStorage.setItem("USR_GRD_CD", data.USR_GRD_CD);
					window.sessionStorage.setItem("forcedctilogout", "false");
					
					window.sessionStorage.setItem("CTI_LGN_ID", data.CTI_LGN_ID);
					window.sessionStorage.setItem("EXTN_NO", $("#tfExtnNo").val().trim());
					window.sessionStorage.setItem("CTI_USE_YN", $("#tfExtnNo").val().trim() == "" ? "N" : "Y");
				}
				else
				{
					// 세션스토리지에 로그인 사용자 정보
					window.sessionStorage.setItem("USR_ID", data.USR_ID);
					window.sessionStorage.setItem("USR_NM", data.USR_NM);
					window.sessionStorage.setItem("IP_ADDRESS", data.IPADDR);
					window.sessionStorage.setItem("CNTR_CD", data.CNTR_CD);
					window.sessionStorage.setItem("TEAM_CD", data.TEAM_CD);
					window.sessionStorage.setItem("DEPT_CD", data.DEPT_CD);
					window.sessionStorage.setItem("TEAM_NM", data.TEAM_NM);
					window.sessionStorage.setItem("USR_GRD_CD", data.USR_GRD_CD);
					window.sessionStorage.setItem("forcedctilogout", "false");
					
					window.sessionStorage.setItem("CTI_LGN_ID", data.CTI_LGN_ID);
					window.sessionStorage.setItem("EXTN_NO", data.EXTN_NO == null || data.EXTN_NO == "" ? "" : data.EXTN_NO);
					window.sessionStorage.setItem("CTI_USE_YN", data.EXTN_NO == null || data.EXTN_NO == "" ? "N" : data.CTI_USE_YN);
				}
				
				
				
				
				
				if(extn_no != ""){
					data.EXTN_NO = extn_no;
					window.sessionStorage.setItem("EXTN_NO",extn_no);
				}
				
				// 임시코드
				//window.sessionStorage.setItem("PGSQLUSE", "N");
				//updateLoginHistory(usrInfo);
				
				// pgsql 사용여부 체크
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/main/getPgsqlUseYn.do",
					data : "pJson=" + getJsonStrPgsqlUseYn(),
					success : function(pgsqlData)
					{
						window.sessionStorage.setItem("PGSQLUSE", pgsqlData.EXT1_CD);
						
						// CTI 미사용자일 경우 해당 사항 없음
						if(window.sessionStorage.getItem("CTI_USE_YN") == "N")
						{
							updateLoginHistory(usrInfo);
							return;
						}
						/*
						if(pgsqlData.EXT1_CD == "Y")
						{
							$.ajax({
								type : "post",
								dataType: "json",
								async : true,
								url : getContextPath() + "/ajax/main/getCtiStatus.do",
								data : "pJson=" + getJsonStrCtiStatus(),
								success : function(ctiData)
								{
									if(ctiData != null)
									{
										if(ctiData.C_AGENT_STATUS == 0 || ctiData.C_AGENT_STATUS == 2)
											updateLoginHistory(usrInfo);
										else
										{
											if(confirm("이미 CTI ID가 로그인 되어 있습니다.\n기존 연결을 해제 한 후 로그인 하시겠습니까?"))
											{
												window.sessionStorage.setItem("forcedctilogout", "true");
												updateLoginHistory(usrInfo);
											}
										}
									}
									else
										updateLoginHistory(usrInfo);
								},
								error : function(data, status, err) 
								{
									window.sessionStorage.setItem("PGSQLUSE", "N");
									updateLoginHistory(usrInfo);
								}
							});
						}
						else
						*/
							updateLoginHistory(usrInfo);
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
			else {
				
				//로그인 비밀번호 5회 오류
 				var rtnMsg = fPwErrCntCheck();
				
				if (rtnMsg != "")
				{
					// 상담사관리 테이블 USE_YN = 'N' 처리
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/user/updateUseCheck.do",
						data : "pJson=" + getJsonStrUpdateUserUseYn($("#tfUserId").val()),
						success : function(data)
						{					
							alert(rMsg);
							return;
						},
						error : function(data, status, err)
						{
							networkErrorHandler(data, status, err);
						}
					});	
					
					rtnMsg = data.LOGIN_DESC + "\n\n" + rtnMsg;
					alert(rtnMsg);
					
					return;

				}	
				else
					alert(data.LOGIN_DESC);
				
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}


//비밀번호 5번 오류 체크(로컬스토리지로 처리)
function fPwErrCntCheck()
{
	var rMsg = ""
	var gPwErrCnt = window.sessionStorage.getItem("PW_ERR_CNT");
	
	//값이 없을때
	if (gPwErrCnt == null || gPwErrCnt == undefined)
	{
		gPwErrCnt = 1;
		window.sessionStorage.setItem("PW_ERR_CNT", gPwErrCnt);

	} else if(gPwErrCnt == 4)
	{
		rMsg = "비밀번호 오류가 5회 났습니다.";
		rMsg += "\n\n관리자에게 문의하세요.";
		
	} else {
		gPwErrCnt = parseInt(gPwErrCnt) + 1;
		window.sessionStorage.setItem("PW_ERR_CNT", gPwErrCnt);
	}
	
	return rMsg;
}

// 로그인 이력 및 근태 저장
function updateLoginHistory(usrInfo)
{
	 $.ajax({
		  type : "post",
		  dataType: "json",
		  async : true,
		  url : getContextPath() + "/ajax/counsel/counselSpec.do",
		  data : "pJson=" + getJsonStrUserselect(),
		  success : function(data)
		  {
		   if(data != null)
		   {
		    //var readDate =data.MOD_DT_FORMAT.split("-");//저장날짜
			var readDate =data.PW_MOD_DT_FORMAT.split("-");//저장날짜
		    var todayDate = getDate().split("-");//현재날짜
		    var stDate = new Date(readDate[0], readDate[1] - 1, readDate[2]);
		    var ltDate = new Date(todayDate[0], todayDate[1] - 1, todayDate[2]);
		    var giganDate = (ltDate.getTime() - stDate.getTime()) / 1000 / 60 / 60 / 24;
		    var d=new Date(readDate[0], readDate[1],readDate[2]);
	    	  d.setDate(d.getDate());
	    	  var dd=d.getDate();
		    
		    if(giganDate > 30)
			{
		    	
		    	 alert("비빌번호가 만료됐습니다. 만료일이 ("+d.getFullYear()+"년 "+(d.getMonth()+1)+"월 "+dd+"일) 도래 되었습니다.\n비밀번호를 만료일 전에 변경 하시기 바랍니다.");
			    	
				return;	
			}
		    if(giganDate > 25&&giganDate < 30){
		    	alert("비밀번호 만료일("+d.getFullYear()+"년 "+(d.getMonth()+1)+"월 "+dd+"일) 도래 되었습니다.\n만료일 이후는 로그인 할 수 없습니다.\n비밀번호를 변경 하시기 바랍니다.");
		    	
		    	
		    }
		 // 로그인 이력 저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/insertUserLoginHistory.do",
				data : "pJson=" + getJsonStrInsertUserLoginHistory(usrInfo.USR_ID, changeTimeString(new Date()), usrInfo.EXTN_NO, usrInfo.IPADDR, usrInfo.CTI_LGN_ID),
				success : function(data)
				{
					// 근태현황 테이블에 저장
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/main/insertUserLoginStatus.do",
						data : "pJson=" + getJsonStrInsertUserLoginStatus(),
						success : function(data)
						{
							openMainWindow();
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
		  },
		  error : function(data, status, err)
		  {
		   networkErrorHandler(data, status, err);
		  }
		 });
	
	
}

//메인화면 오픈
function openMainWindow()
{	
	var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	var first = moment().startOf('month');	   
	var current = moment();
	var day = first.day() % 6 === 0 ? first.add(1, 'day').day(1) : first;
	
	if(usrGrdCd == "050100" || usrGrdCd == "030100" || usrGrdCd == "090100") {
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/userCheck.do",
			data : "pJson=" + getJsonUserCheckStr(current.format('YYYYMMDD'), window.sessionStorage.getItem("USR_ID")),
			success : function(data) {
				if(data!=null){
					if(!isEmpty(data.USE_YN)) { 
						if(current.format('YYYY-MM-DD') == day.format('YYYY-MM-DD')) {
							alert(current.format('MM월') + '첫번째 업무일 입니다. \n 상담지식을 점검하시기 바랍니다.'); 
						}
					}
				}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
	
	$("#dialog").dialog({
        modal: true,
        title: "알림",
        width: 1200,        
        draggable: false,
        resizable: false,
        //height: 768,
        position: { my: "center", at: "center", of: window },
        resize: function( event, ui ) {        	
        },
        open: function (event, ui) {
        	//$(".ui-dialog-titlebar").hide();
            $(this).load("/web/main/login/loginAfter.do", function(response, status, xhr){
                if(status == "success") {
                	/*$(function() {
                   		tab = $("#myMain").tabs({ 
                   					heightStyle: "content",
                   					activate: function( event, ui ) {
                   						$("#dialog").dialog( "option", "position", { my: "center", at: "center", of: window } );
                   					},
                   					show: function() {
                   						$("#dialog").dialog( "option", "position", { my: "center", at: "center", of: window } );
                   					}
                   				});*/
                   		$("#dialog").dialog( "option", "position", { my: "center bottom", at: "center top", of: window, collision: 'fit' } );
                   		$(".loginButton").focus();
                 	//});
                } else if(status == "error") { 
                    alert("오류: " + xhr.status + ": " + xhr.statusText);
                }
            });
        },
        buttons: [
			{
				text: "확인",
				class: "loginButton",
				click: function() {
					$(this).dialog("close");
					// 메인화면 open
					var width = 1920;
					var height = 1080;
					//var top = window.screenTop + (screen.height - height) / 2 - 95;
					//var left = window.screenLeft + (screen.width - width) / 2 - 10;
					
					var num = parseInt(Math.random() * 1000);
					var paramURL = getContextPath() + "/web/main/CallMain.do";
					var option = "width=" + width + ", height=" + height +
						", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=yes,status=no,menubar=no, top=0 ,left=0";
					
//					window.open(paramURL, "CallMain" + num, option);
					var newWindow = window.open(paramURL, "CallMain" + num, "resizable");
					newWindow.resizeTo(width,height);
					newWindow.focus();
					
					// 로그인 창 닫음
					window.open('about:blank', '_self');
//			        parent.close();
					selfClose();
				}
			},
			
		],
		close: function(){
			
			$("#tfUserId").val('');
			$("#tfUserPass").val('');
			
			if(window.localStorage.getItem("loginId") != null && window.localStorage.getItem("loginId") != "") {
		    	$("input[id=chkSave]:checkbox").prop("checked", true);
		    	$("#tfUserId").val(window.localStorage.getItem("loginId"));
		    	$("#tfUserPass").focus();
		    } else {
				$("#tfUserId").focus();
			}
			
			$(this).dialog("destroy");
			//location.reload();
	    }
    });
	
}

//엔터 키 입력
function it_enterEvent(key)
{
	if (key.keyCode == 13)
		btnLogin_clickEvent();
}

//페이지 초기화
$(document).ready(function()
{
	// 창 위치 및 크기 조절
	window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);
    // 아이디 저장이 있을 경우
	if(window.localStorage.getItem("loginId") != null && window.localStorage.getItem("loginId") != "")
    {
    	$("input[id=chkSave]:checkbox").prop("checked", true);
    	$("#tfUserId").val(window.localStorage.getItem("loginId"));
    	$("#tfUserPass").focus();
    }
	else
		$("#tfUserId").focus();
	
	// 엔터 키 이벤트 등록
	$("#tfUserId").keydown(function (key)
	{
		if (key.keyCode == 13)
    		btnLogin_clickEvent();
	});
	
	// 엔터 키 이벤트 등록
	$("#tfUserPass").keydown(function (key)
	{
		if (key.keyCode == 13)
    		btnLogin_clickEvent();
	});
	
	// 엔터 키 이벤트 등록
	$("#tfExtnNo").keydown(function (key)
	{
		if (key.keyCode == 13)
    		btnLogin_clickEvent();
	});
	
	// 로그인 버튼 클릭 이벤트 등록
    $("#btnLogin").bind("click", btnLogin_clickEvent);
    
    if($("#isErp").val() == "Y")
    	btnLogin_clickEvent();
    
    
    var select = $("select#item");
    
    select.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
 
        goDownload(this.value);
        
    });
    
//    window.kukuEditor = new KuKudocsEditor(
//            /* ID 입력부 */
//            'editor',
//
//            /* Option 입력부 */
//            {
//
//                //에디터 최소 높이설정
//                minHeight: 0,
//                maxHeight: 0,
//
//                //Editor 가로크기
//                width: '100%',
//
//                //Editor 세로크기
//                height: '100%',
//
//                //Hidden Menu 설정
//                hiddenMenu: ['fileGroup', 'editGroup', 'insertGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'], /* Menu Option Hidden list */
//                
//
//                //Editor Load 완료시 호출 Callback Function
//                Editor_Complete: Editor_Complete,
//
//                //Event 발생시 Callback Function
//                Key_event: {keydown: Key_down_event, keyup: Key_up_event},
//                Mouse_event: {mousedown: Mouse_Down_event, mouseup: Mouse_Up_event},
//
//                //Kaoni Cell Lock Attibute 설정 (Lock 기능 체크하기 위해서는 반드시 Attibute Name 설정)
//                cell_lock_name: 'free',
//
//                //Template 양식 Items
//                templateList: [
//                    {
//                        name: '부서양식',
//                        items: [
//                            {name: '회의록', type: 'url', value: '/resources/KukudocsEditor/template/meeting_log.html'},
//                            {name: '보고서', type: 'url', value: '/resources/KukudocsEditor/template/report.html'}
//                        ]
//                    },
//                    {
//                        name: '인사',
//                        items: [
//                            {name: '휴가신청서', type: 'url', value: '/resources/KukudocsEditor/template/vacation.html'},
//                            {name: 'Sample', type: 'html', value: '<p><span>test sample</span></p>'}
//                        ]
//                    }
//                ],
//
//                //사용할 Font Size 설정
//                fontSize: [{name: "8pt", value: "8pt"}, {name: "9pt", value: "9pt"}],
//
//                //사용할 Font Family 설정
//                fontFamily: [{name: "굴림", value: "굴림"}, {name: "돋움", value: "돋움"}],
//
//                //기본 Font Size
//                defaultFontSize: '11pt',
//
//                //기본 Font Family 설정
//                defaultFontFamily: '맑은 고딕',
//
//                //Language Resource 위치 URL
//                languagePathURL: '/resources/KukudocsEditor/lang/',
//
//                //사용할 Language 설정
//                defaultLanguage: 'kr',
//
//                //Custom Button Menu 아이템 설정
//                customButtonMenuItem: [
//                    {
//                        id: "customButton1",
//                        name: "customButton1",
//                        style: "background:url('/resources/KukudocsEditor/images/drag_table.png'); background-size:20px 18px;",
//                        action: function () {
//                            alert('Custom Menu1 !!');
//                        }
//                    },
//                    {
//                        id: "customButton2",
//                        name: "customButton2",
//                        style: "background:url('/resources/KukudocsEditor/images/drag_table.png'); background-size:20px 18px;",
//                        action: function () {
//                            alert('Custom Menu2 !!');
//                        }
//                    }
//                ],
//
//                //표 위아래 문단 추가 버튼의 스타일 지정
//                customMagicLineStyle: 'background-color:#0000ff;',
//
//                //표 생성시 기본 가로 사이즈 지정
//                defaultTableWidth: 500,
//
//
//
//                /*///////////////// New Options ///////////////// */
//
//                //표 전체 선택을 위한 이미지 URL 지정 (변경 지양)
//                tableSelectImageURL : 'images/cross_arrow.png',
//
//                //표 이동시 사용할 이미지 URL 지정 (변경 지양)
//                tableMoveHandlerImageURL : 'images/movehandler.png',
//
//                //표 드래그시 사용할 이미지 URL 지정 (변경 지양)
//                tableMoveImageURL : 'images/drag_table.png',
//
//                //Editor 내부에서 사용할 Style 지정 CSS 파일 (지양)
//                defaultEditorStylePath : '../stylesheets/editor_style.css',
//
//
//                //xhtml1.1 Doc Type 지정 예  (default null [Doctype 없음] )
//                defaultDocType : null, //{docType : 'xhtml1.1', publicId : '-//W3C//DTD XHTML 1.1//EN', systemId : 'http://www.w3c.org/TR/xhtml11/DTD/xhtml11.dtd'},
//
//                //Default Character Set 지정 예 (default utf-8)
//                defaultCharset : 'utf-8',
//
//                //Script Tag 제거 (script, vbscript) (default true)
//                useSecurityScript : true,
//
//                //DOM의 on-Event 제거 (false시 on-event들을 전체를 제거안함)
//                useSecurityEvent : true,
//
//                //제거하지 않을 Event의 Type들 지정 예 [ Array로 입력되는 on-Event는 제거되지 않습니다 ]
//                notRemoveEventTypes : [], // ['onclick','mousedown' .... n];
//
//                //Tab Size 지정 (Default 4)
//                tabSpaceSize : 4,
//
//                //Chrome Filter Paste Options (default true)
//                usePasteFilterForChrome : true,
//
//                //HTML & Image Confirm Option (default true)
//                usePasteConfirmForChrome : true,
//
//                //Editor Load시 Focus 주입 여부 적용 (default true)
//                useFirstFocus : false,
//                
////                userMenuBar : true,
//
//
//                //Toolbar에 Table/Cell Lock 기능 사용 설정
//                useLockMenu : true,
//
//                //Table / Cell Lock Image URL 설정
//                lockImageURL : 'images/lock.png',
//
//                //Color Picker 값 수정
//                colorPicker : {
//                    simpleColor :   ["ffffff", "000000", "eeece1", "1f497d", "4f81bd", "c0504d", "9bbb59", "8064a2", "4bacc6", "f79646"],
//                    standardColor : ["f2f2f2", "808080", "ddd9c3", "c6d9f1", "dce6f2", "f2dcdb", "ebf1de", "e6e0ec", "dbeee0", "fdeada",
//                        "d9d9d9", "595959", "c4bd97", "8eb4e3", "b9cde5", "e6b9b8", "d7e4bd", "ccc1da", "b7dee8", "fcd5b5",
//                        "bfbfbf", "404040", "948a54", "558ed5", "95b3d7", "d99694", "c3d69b", "b3a2c7", "93cddd", "fac090",
//                        "a6a6a6", "262626", "4a452a", "17375e", "376092", "953735", "77933c", "604a7b", "31859c", "e46c0a",
//                        "808080", "0d0d0d", "1e1c11", "10243f", "254061", "632523", "4f6228", "403152", "215968", "984807"],
//                    normalColor   : ["c00000", "ff0000", "ffc000", "ffff00", "92d050", "00b050", "00b0f0", "0000ff", "002060", "7030a0"]
//                },
//
//                useAdjustForChrome : false,
//
//                //Cell None Border Visualize
//                useNoneBorderVisualize : false, //Default : false
//
//                //사용할 Line Height 설정
//                lineHeight : [{name: "0.5", value: "0.5"}, {name: "1.5", value: "1.5"}],
//
//                //HTML Mode에서 Text Content를 별도의 Indent 처리 할지 여부 설정 [Default : true]
//                useHtmlModeTextIndent : true,
//
//                // Dialog의 이동범위를 Editor 영역 안으로 지정 여부 [Default : true]
//                useDialogMoveConfineEditor : false,
//
//                licPathURL : ['/resources/KukudocsEditor/kukudocs.lic'],
//            });
  
});

function Editor_Complete() { console.log("Editor Load Complete !!!");}
function Key_down_event(e) { console.log("Key_Down_event Call !!!"); }
function Key_up_event(e) { console.log("Key_Up_event Call !!!"); }
function Mouse_Down_event(e) { console.log("Mouse_Down_event Call !!!"); }
function Mouse_Up_event(e) {console.log("Mouse_Up_event Call !!!");}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc){
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

  
function goDownload(pUrl) { 
	//0클라이언트 부분에서의 에러검증 코드 자리
 	
	 if( pUrl=="http://172.17.100.100:8080/SoftPhone/config.ini"){
	   //text파일은 예외처리
        var configfile_Url= getContextPath()
        	    + "/file/message/messageFileDown.do?pJson="  
				+ getJsonFileDownload("/shared/AgentApp/uploads/config.ini", "config.ini");
 
        location.href=configfile_Url;		 
	 }else{
		 location.href=pUrl;
	 }
	 
}



function isEmpty(value) { 
	if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ) { 
		return true 
	}else { 
		return false 
	} 
}