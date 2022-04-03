// 조회 조건 및 조회 값
var g_srchtype = "all";
var g_srchval = "";
var g_srchCntrCd = "all";
var g_srchTeamCd = "all";
var g_srchDeptCd = "all";
var g_cntrCd = "90002";
var g_teamCd = "90003";
var g_deptCd = "90004";
var g_gradeCd = "90006";
var g_dtyCd = "90005";
var g_cntrFirstCd = "";
var g_teamFirstCd = "empty";
var g_gradeFirstCd = "";
var g_dtyFirstCd = "";
var pwdMod = "N";

//감정분석 솔루션 서버 정보
var gVocCrmIp = "172.16.4.26";
var gVocCrmPort = "8080";

// 파라미터 셋팅 ProgramList
function getJsonStrUserList(srchtype, srchval, notuse)
{			
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"optSrchType" : srchtype,
			"tfSrchVal" : srchval,
			"chkRetire" : notuse,
			"cntr_cd" : g_srchCntrCd,
			"team_cd" : g_srchTeamCd,
			"dept_cd" : g_srchDeptCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 ProgramListExcel
function getJsonStrUserListExcel(srchtype, srchval, notuse)
{			
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdEV4Y2Vs",
		"map" : {
			"key" : "value",
			"optSrchType" : srchtype,
			"tfSrchVal" : srchval,
			"chkRetire" : notuse,
			"cntr_cd" : g_srchCntrCd,
			"team_cd" : g_srchTeamCd,
			"dept_cd" : g_srchDeptCd,
			"sidx" : $("#usrMngmnt_tblUserList").getGridParam("sortname"),
			"sord" : $("#usrMngmnt_tblUserList").getGridParam("sortorder"),
			"title" : "사용자관리",
			"colWidth" : [20, 20, 20, 20, 20, 20, 20, 20],
			"colName" : ["USR_ID", "USR_NM", "CD_NM", "CEL_NO_FORMAT", "EXTN_NO", "PC_IP", "RET_YN", "MOD_DT_FORMAT"],
			"colHeader" : ["아이디", "이름", "등급", "핸드폰번호", "내선번호", "IP주소", "퇴사여부", "수정일"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 Programspec
function getJsonStrUserspec(usrId)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMDEuc2VsZWN0",
			"map" : {
				"key" : "value",
				"usr_id" : usrId
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateProgram
function getJsonStrInsertUser()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMDEuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"usr_id" : $("#usrMngmnt_usrIdText").val(),
			"usr_nm" : $("#usrMngmnt_usrNmText").val(),
			"pwd_no_enc_cntn" : SHA256($("#usrMngmnt_usrIdText").val() + "!"), // 사용자 신규 추가시 default 비밀번호는 "아이디+!"
			"ent_dt" : $("#usrMngmnt_entDt").val().replace(/-/g,""),
			"ret_dt" : $("#usrMngmnt_retDt").val().replace(/-/g,""),
			"cntr_cd" : $("#usrMngmnt_cntrCd").val(),
			"team_cd" : $("#usrMngmnt_teamCd").val(),
			"dept_cd" : $("#usrMngmnt_deptCd").val(),
			"usr_grd_cd" : $("#usrMngmnt_usrGrdCd").val(),
			"dty_cd" : $("#usrMngmnt_dtyCd").val(),
			"cti_use_yn" : $(":radio[name='ctiUsrYn']:checked").val(),
			"cti_lgn_id" : $("#usrMngmnt_ctiLgnId").val(),
			"cti_usr_yn" : "Y",
			"extn_no" : $("#usrMngmnt_extnNo").val(),
			"tel_no" : $("#usrMngmnt_telNo").val().replace(/-/gi, ""),
			"cel_no" : $("#usrMngmnt_celNo").val().replace(/-/gi, ""),
			"eml_adr" : $("#usrMngmnt_emlAdr").val(),
			"pc_ip" : $("#usrMngmnt_pcIp").val(),
//			"pc_mac" : $("#pcMac").val(),
//			"fax_no" : $("#usrMngmnt_faxNo").val().replace(/-/gi, ""),
			"tbl_nm" : "om001",
		    "tbl_pk": $("#usrMngmnt_usrIdText").val(),
//		    "modYn" : modYn,
		    "callback" : "cb_merge"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateProgram
function getJsonStrUpdateUser()
{
	var modYn = "";
	if($("#usrMngmnt_USR_IMG_PTH").val() != "")
		modYn = 'Y';
	
	pwdMod = "N";
//	if($("#usrMngmnt_pwdNoEncCntn").val() != "********")
//		pwdMod = "Y";
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMDEudXBkYXRl",
		"map" : {
			"key" : "value",
			"usr_id" : $("#usrMngmnt_usrIdText").val(),
			"usr_nm" : $("#usrMngmnt_usrNmText").val(),
			"pwdMod" : pwdMod,
//			"pwd_no_enc_cntn" : SHA256($("#usrMngmnt_pwdNoEncCntn").val()),
			"ent_dt" : $("#usrMngmnt_entDt").val().replace(/-/g,""),
			"ret_dt" : $("#usrMngmnt_retDt").val().replace(/-/g,""),
			"cntr_cd" : $("#usrMngmnt_cntrCd").val(),
			"team_cd" : $("#usrMngmnt_teamCd").val(),
			"dept_cd" : $("#usrMngmnt_deptCd").val(),
			"usr_grd_cd" : $("#usrMngmnt_usrGrdCd").val(),
			"dty_cd" : $("#usrMngmnt_dtyCd").val(),
			"cti_use_yn" : $(":radio[name='ctiUsrYn']:checked").val(),
			"cti_lgn_id" : $("#usrMngmnt_ctiLgnId").val(),
			"extn_no" : $("#usrMngmnt_extnNo").val(),
			"tel_no" : $("#usrMngmnt_telNo").val().replace(/-/gi, ""),
			"cel_no" : $("#usrMngmnt_celNo").val().replace(/-/gi, ""),
			"eml_adr" : $("#usrMngmnt_emlAdr").val(),
			"pc_ip" : $("#usrMngmnt_pcIp").val(),
//			"pc_mac" : $("#pcMac").val(),
//			"fax_no" : $("#usrMngmnt_faxNo").val().replace(/-/gi, ""),
			"tbl_nm" : "om001",
		    "tbl_pk": $("#usrMngmnt_usrIdText").val(),
		    "tbl_pk2": $("#usrMngmnt_usrIdText").val(),
		    "modYn" : modYn,
		    "callback" : "cb_merge",
		    "ret_rsn" : $("#usrMngmnt_usrGrdRetire").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//검색타입 선택 이벤트
function optSrchtype_changeEvent()
{
	if($("#usrMngmnt_optSrchtype").val() == "all")
	{
		$("#usrMngmnt_tfSrchval").prop("disabled", true);
		$("#usrMngmnt_tfSrchval").val("");
	}
	else
		$("#usrMngmnt_tfSrchval").prop("disabled", false);
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchtype = $("#usrMngmnt_optSrchtype").val();
	g_srchval = $("#usrMngmnt_tfSrchval").val();
	g_srchCntrCd = $("#usrMngmnt_selCenter").val();
	g_srchTeamCd = $("#usrMngmnt_selTeam").val();
	g_srchDeptCd = $("#usrMngmnt_selDept").val();
	
	$("#usrMngmnt_tblUserList").jqGrid("setGridParam", {postData : {pJson : getJsonStrUserList(g_srchtype, g_srchval, $("input[id=usrMngmnt_chkNotUse]:checkbox").prop("checked"))}, page : 1, sortname : "usr_id", sortorder : "asc"});
	$("#usrMngmnt_tblUserList").trigger("reloadGrid");
	
	initUserSpec();
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	g_srchtype = "all";
	g_srchval = "";
	g_srchCntrCd = "all";
	g_srchTeamCd = "all";
	g_srchDeptCd = "all";
	
	//센터 코드
	$("#usrMngmnt_selCenter").val("all");
	$("#usrMngmnt_selTeam option[value!='all'],#usrMngmnt_selDept option[value!='all']").remove();
	
	initSelectBoxGrade();
	
	g_srchCntrCd = $("#usrMngmnt_selCenter").val();
	g_srchTeamCd = $("#usrMngmnt_selTeam").val();
	g_srchDeptCd = $("#usrMngmnt_selDept").val();
	
	$("#usrMngmnt_btnInsert").show();
	$("#usrMngmnt_btnModifyPw").hide();
	$("#usrMngmnt_btnUpdate").hide();
	
	$("#usrMngmnt_optSrchtype").val("all");
	$("#usrMngmnt_tfSrchval").val("");
	//$("#usrMngmnt_tfSrchval").prop("disabled", true);
	$("input[id=usrMngmnt_chkNotUse]:checkbox").prop("checked", false) ;	
	
	$("#usrMngmnt_tblUserList").jqGrid("setGridParam", {postData : {pJson : getJsonStrUserList("", "", $("input[id=usrMngmnt_chkNotUse]:checkbox").prop("checked"))}, page : 1, sortname : "usr_id", sortorder : "asc"});
	$("#usrMngmnt_tblUserList").trigger("reloadGrid");

	initUserSpec();
}

//프로그램 상세 초기화
function initUserSpec()
{	
	$("#usrMngmnt_btnInsert").show();
	$("#usrMngmnt_btnUpdate").hide();
	$("#usrMngmnt_btnModifyPw").hide();
	
	$("#usrMngmnt_usrIdText").prop("disabled", false);
	
	$("#usrMngmnt_usrIdText").val("");
	$("#usrMngmnt_usrNmText").val("");
	$("#usrMngmnt_pwdNoEncCntn").val("");
	$("#usrMngmnt_pwdNoEncCntnChk").val("");
	$("#pwdNoEncCntnChk").val("");
	
	$("#usrMngmnt_dtyCd").val("all");
	$("#usrMngmnt_cntrCd").val("all");
	$("#usrMngmnt_teamCd").val("all");
	$("#usrMngmnt_deptCd").val("all");
	
	//initSelectBoxGrade();

	//그룹목록에서 등급을 가져옴
	//$("#usrMngmnt_usrGrdCd").empty();
	
	
	setSelectBoxWithCode("usrMngmnt_dtyCd", "", g_dtyCd, "", "", "");
	$("#usrMngmnt_entDt").val("");
	$("#usrMngmnt_retDt").val("");
	$("input:radio[name=ctiUsrYn]:input[value=Y]").prop("checked", true);
	$("#usrMngmnt_extnNo").val("");
	$("#usrMngmnt_telNo").val("");
	$("#usrMngmnt_celNo").val("");
	$("#usrMngmnt_emlAdr").val("");
	$("#usrMngmnt_pcIp").val("");
	$("#pcMac").val("");
	$("#usrMngmnt_ctiLgnId").val("");
	$("#usrMngmnt_faxNo").val("");
	$("#usrMngmnt_modDt").val("");
	$("#usrMngmnt_modUsrId").val("");
	$("#usrMngmnt_USR_IMG_PTH").val("");
	$("#usrMngmnt_imgView").attr("src", "");
}

//저장 및 수정 예외 처리
function checkUserSpec()
{
    var rMsg = "";
    
//    var checkPassWord =chkPwd($.trim($('#usrMngmnt_pwdNoEncCntn').val()));
//    if(checkPassWord!=""){
//	    $('#usrMngmnt_pwdNoEncCntn').val('');
//	    //$('#pwdNoEncCntnChk').val('');	    
//	    $('#usrMngmnt_pwdNoEncCntn').focus();
//	    return checkPassWord;
//	}
    
    	
	pwdMod = "N";
//	if($("#usrMngmnt_pwdNoEncCntn").val() != "********")
//		pwdMod = "Y";
	
	if($("#usrMngmnt_usrIdText").val() == "")
		rMsg += "\n\nID를 입력 해 주세요.";
	if($("#usrMngmnt_usrIdText").val() != $("#usrMngmnt_usrIdText").val().toLowerCase())
		rMsg += "\n\nID는 소문자만 입력 해 주세요.";
	if($("#usrMngmnt_usrNmText").val() == "")
		rMsg += "\n\n이름을 입력 해 주세요.";
	if($("#usrMngmnt_entDt").val() == "")
		rMsg += "\n\n입사일을 입력 해 주세요.";
	if($("#usrMngmnt_usrGrdCd").val() == "" || $("#usrMngmnt_usrGrdCd").val() == null)
		rMsg += "\n\n등급을 선택 해 주세요.";
	if($("#usrMngmnt_dtyCd").val() == "" || $("#usrMngmnt_dtyCd").val() == null)
		rMsg += "\n\n직급을 선택 해 주세요.";
	if($("#usrMngmnt_cntrCd").val() == "all" || $("#usrMngmnt_cntrCd").val() == "" || $("#usrMngmnt_cntrCd").val() == null||$("#usrMngmnt_cntrCd").val() == "all")
		rMsg += "\n\n센터를 선택 해 주세요.";
//	if($("#usrMngmnt_pcIp").val() == "" || $("#usrMngmnt_pcIp").val() == null)
//	{
//		rMsg += "\n\n전화기IP주소를 입력 해 주세요.";	
//		rMsg += "\n[잘못된 전화기IP주소는 감정분석을 할 수 없습니다.]";
//	}
	if($("#usrMngmnt_extnNo").val() == "" || $("#usrMngmnt_extnNo").val() == null)
		rMsg += "\n\n내선번호를 입력 해 주세요.";
	
//	if(pwdMod == "Y")
//	{
//		if($("#usrMngmnt_pwdNoEncCntn").val() == "")
//			rMsg += "\n\n비밀번호를 입력 해 주세요.";
//		if($("#usrMngmnt_pwdNoEncCntn").val() != $("#usrMngmnt_pwdNoEncCntnChk").val())
//			rMsg += "\n\n입력하신 비밀번호와  비밀번호확인 번호가 서로 다릅니다.";		
//	}
	
	return rMsg;
}

//추가버튼 클릭 이벤트
function btnInsert_clickEvent()
{		
	var rMsg = checkUserSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	if (confirm("저장 하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/user/userspec.do",
			data : "pJson=" + getJsonStrUserspec($("#usrMngmnt_usrIdText").val()),
			success : function(data)
			{
				
				if(data != null) {
					alert("중복된 ID가 존재 합니다.");
					$("#usrMngmnt_usrIdText").focus();
				} else {
					gAppendHidden("usrMngmnt_frm1", "pJson", getJsonStrInsertUser());
					gSubmitPost("usrMngmnt_frm1", true);
					
					//그룹권한등록
					$.ajax({
						type : "post",
						async : true,
						url : getContextPath() + "/ajax/main/setSelectBoxGrade.do",
						dataType : "json",
						data : "pJson=" + getJsonStr("dXBkYXRl", "b3IwMDIudXNlckF1dGhVcGRhdGU=", {
							"key" : "value",
							"usr_id" : $("#usrMngmnt_usrIdText").val(),
							"cd" : $("#usrMngmnt_usrGrdCd").val(),
							"use_yn" : "Y"
						}),
						error : function(data, status, err) {
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
	
	//=======================================================================================
	/*	// 감성분석 솔루션 상담사정보 삭제
	var obj = new Object();
	obj.agentId = "admin";//$("#usrMngmnt_usrIdText").val();
	
	var jsonData = JSON.stringify(obj);

	$.ajax({
		type : "DELETE",
		async : true,
		url : "http://" + gVocCrmIp + ":" + gVocCrmPort + "/REST/agent/repr",
		processData : true,
		contentType: "application/json; charset=utf-8",
		data : jsonData,    	            	
		success : function(data, textStatus, jqXHR)
		{
			//alert(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			networkErrorHandler(jqXHR, textStatus, errorThrown);
		}
	});			
*/	
/*	
	// 감성분석 솔루션 상담사정보 생성
	var obj = new Object();
	obj.agentId = "825015";
	obj.agentName = "효성공석01";
	obj.agentNumber = "47409";
	obj.agentIp = "10.1.220.109";		
	
	var jsonData = JSON.stringify(obj);

	$.ajax({
		type : "POST",
		async : true,
		url : "http://" + gVocCrmIp + ":" + gVocCrmPort + "/REST/agent/repr",
		processData : true,
		contentType: "application/json; charset=utf-8",
		data : jsonData,    	            	
		success : function(data, textStatus, jqXHR)
		{
			//alert(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			networkErrorHandler(jqXHR, textStatus, errorThrown);
		}
	});		
*/		
	
	//=======================================================================================
	
	
/*
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userspec.do",
		data : "pJson=" + getJsonStrUserspec($("#usrMngmnt_usrIdText").val()),
		success : function(data)
		{
			if(data != null)
			{
				alert("중복된 ID가 존재 합니다.");
				$("#usrMngmnt_usrIdText").focus();
			}
			else
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/user/insertUser.do",
					data : "pJson=" + getJsonStrInsertUser(),
					success : function(data)
					{

						$("#usrMngmnt_tblUserList").jqGrid("setGridParam", {postData : {pJson : getJsonStrUserList("", "", "", $("input[id=usrMngmnt_chkNotUse]:checkbox").prop("checked"))}, page : 1, sortname : "usr_id", sortorder : "asc"});
						$("#usrMngmnt_tblUserList").trigger("reloadGrid");
				   					
						initUserSpec();
				   		alert("추가되었습니다.");
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
*/	
}

// insert,update callback
function cb_merge()
{
	$("#usrMngmnt_tblUserList").jqGrid("setGridParam", {postData : {pJson : getJsonStrUserList("", "", $("input[id=usrMngmnt_chkNotUse]:checkbox").prop("checked"))}, page : 1, sortname : "usr_id", sortorder : "asc"});
	$("#usrMngmnt_tblUserList").trigger("reloadGrid");
					
	initUserSpec();
	alert("저장되었습니다.");
}

//프로그램 수정 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	if($("#usrMngmnt_retDt").val()!=""){
		if($("#usrMngmnt_usrGrdRetire").val()=="all"){
			alert("퇴사사유를 선택 바랍니다");
			return;
		}
	}
	
	var rMsg = checkUserSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	if(confirm("저장 하시겠습니까?"))
	{
		gAppendHidden("usrMngmnt_frm1", "pJson", getJsonStrUpdateUser());
		gSubmitPost("usrMngmnt_frm1", true);		
		
		// 감성분석 솔루션 상담사정보 수정
		var obj = new Object();
		var agentId = $("#usrMngmnt_usrIdText").val();
		
		//obj.agentId = $("#usrMngmnt_usrIdText").val();
		obj.agentName = $("#usrMngmnt_usrNmText").val();
		obj.agentNumber = $("#usrMngmnt_extnNo").val().replace(/-/gi, "");
		obj.agentIp = $("#usrMngmnt_pcIp").val();	
			
		var jsonData = JSON.stringify(obj);
		
		$("#usrMngmnt_tblUserList").trigger("reloadGrid");
//		btnInit_clickEvent()
		//20171212
		//감정솔루션 에러처리.
		/*
		$.ajax({
			type : "PATCH",
			async : true,
			url : "http://" + gVocCrmIp + ":" + gVocCrmPort + "/REST/agent/repr/" + agentId,
			processData : true,
			contentType: "application/json; charset=utf-8",
			data : jsonData,    	            	
			success : function(data, textStatus, jqXHR)
			{
				//alert(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				networkErrorHandler(jqXHR, textStatus, errorThrown);
				alert("cc");
			}
		});	
		*/
	}
}

// 비밀번호 변경 버튼 클릭 이벤트
function btnModifyPw_clickEvent() {
	openPwModifyPopup("OM0108");
}

// 비밀번호 변경 팝업
function openPwModifyPopup(menuId) {
	var width = 0;
	var height = 0;
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/main/getMenuInfo.do",
		data : "pJson=" + getJsonStrMenuInfo(menuId),
		success : function(data) {
			if (data != null) {
				if (data.WDT_SZ != null) { width = parseInt(data.WDT_SZ);} 
				else { width = 1200; }
				
				if (data.WDT_SZ != null) { height = parseInt(data.HGHT_SZ); } 
				else { height = 800; }
				
				var top = ((screen.height - height) / 2) / 2;
				var left = (screen.width - width) / 2;
				var paramURL = getContextPath() + "/web" + data.MNU_URL;
				var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
				var newWindow;
				
				newWindow = window.open(paramURL, data.MNU_ID, option);
				newWindow.focus();
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 엑셀저장 버튼 클릭 이벤트
function btnExcel_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/user/userList.do", getJsonStrUserListExcel(g_srchtype, g_srchval, $("input[id=usrMngmnt_chkNotUse]:checkbox").prop("checked")));
	
	//var url = getContextPath() + "/excel/user/userList.do?pJson=" + getJsonStrUserListExcel(g_gradeType, g_srchtype, g_srchval, $("input[id=usrMngmnt_chkNotUse]:checkbox").prop("checked"));
	//window.open(url);
}

function readURL(input)
{
    if (input.files && input.files[0])
    {
    	
    	//alert(input.files[0]);
	    var reader = new FileReader();
	
	    reader.onload = function (e)
	    {
	    	$("#usrMngmnt_imgView").attr("src", e.target.result);
		};
	
		reader.readAsDataURL(input.files[0]);
		
    }
}

function getCodeNmList(id, cd, parntCd, tpCd, parntTpCd)
{
	var $input = $("#" + id);
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "c20wMDIuY29kZWxpc3Q=", 
				{ 
					"key" : "value", "tp_cd" : tpCd,"parnt_tp_cd" : parntTpCd, 
					"parnt_cd" : parntCd, "ext1_cd" : "", "notuse" : false
				}
		),
		success : function(data) {
			var jr = JSON.parse(data);
			var value = "<option value='all' selected>미선택</option>";
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			$input.html(value).val(cd).trigger("change").trigger("load");
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		   }
	});
}

function initSelectBoxGrade() {
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/setSelectBoxGrade.do",
		dataType : "json",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b3IwMDIudXNyQXV0aExpc3Q=", {
			"key" : "value",
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"grdMode" : "Y"
		}),
		success : function(data) {
			var options = "";
			
			if(data) {
				for(var i = 0; i < data.length; i++) {
					options += "<option value='" + data[i].AUTH_CD + "'>" + data[i].CD_NM + "</option>";
				}
				$("#usrMngmnt_usrGrdCd").empty().prepend(options);
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function setSelectBoxGrade(usrId, usrMngmnt_usrGrdCd) {
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/setSelectBoxGrade.do",
		dataType : "json",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b3IwMDIudXNyQXV0aExpc3Q=", {
			"key" : "value",
			"usr_id" : usrId,
			"chkNotUse" : false
		}),
		success : function(data) {
			var options = "";
			var isExist = false;
			
			if(data) {
				for(var i = 0; i < data.length; i++) {
					options += "<option value='" + data[i].AUTH_CD + "'>" + data[i].CD_NM + "</option>";
					if(usrMngmnt_usrGrdCd === data[i].AUTH_CD) isExist = true;
				}
				$("#usrMngmnt_usrGrdCd").empty().prepend(options).val(usrMngmnt_usrGrdCd);
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function selAffiliation(){//head 셀렉트박스
	setObjSelectBoxWithCode("usrMngmnt_usrGrdRetire", "미선택", "","CHILD", "90060", "");
	//센터 코드 선택했을때
	$("#usrMngmnt_selCenter").bind("change", function(){
		if($("#usrMngmnt_selCenter").val()=="010000"){
			setObjSelectBoxWithCode("usrMngmnt_selTeam", "전체", "", "CHILD", "90003", "");
		}
		if($("#usrMngmnt_selCenter").val()=="990000"){
			$("#usrMngmnt_selTeam option[value!='all'],#usrMngmnt_selDept option[value!='all']").remove();
		}
		
	});
	// 조회 부분 소속 정보 셋팅
	setObjSelectBoxWithCode("usrMngmnt_selCenter", "전체", "", "CHILD", "90002", "");
	$("#usrMngmnt_selTeam,#usrMngmnt_selDept").append("<option value='all'>전체</option>");
}

function usrAffiliation(){
	
	//센터 코드 선택했을때
	$("#usrMngmnt_cntrCd").bind("change", function(){
//		$("#usrMngmnt_deptCd option[value='all']").remove();
		
		if($("#usrMngmnt_cntrCd").val()=="010000"){
			setObjSelectBoxWithCode("usrMngmnt_teamCd", "미선택", "", "CHILD", "90003", "");
		}
		if($("#usrMngmnt_cntrCd").val()=="990000"){
			$("#usrMngmnt_teamCd option[value!='all'],#usrMngmnt_deptCd option[value!='all']").remove();
		}
		
	});
	// 조회 부분 소속 정보 셋팅
	setObjSelectBoxWithCode("usrMngmnt_cntrCd", "미선택", "", "CHILD", "90002", "");
	$("#usrMngmnt_teamCd,#usrMngmnt_deptCd").append("<option value='all'>미선택</option>");
	setObjSelectBoxWithCode("usrMngmnt_dtyCd", "미선택", "", "CHILD", "90005", "");
}


function chkPwd(str){
    var pw = str;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/ig);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
     

    if(pw.length < 8 || pw.length > 20){
	return "비밀번호는 8 ~ 20자리 이내 영문, 특수문자, 숫자를 포함해서\n 입력해주세요.";

    }

    if(pw.search(/₩s/) != -1){
	return "비밀번호는 공백없이 입력해주세요.";
    } 
    
    if(num < 0 || eng < 0 || spe < 0 ){
	return "영문,숫자, 특수문자를 혼합하여 입력해주세요.";
    }
    return "";
}


// init Page
$(document).ready(function()
{
	$("#usrMngmnt_usrGrdRetire").attr("disabled",true); 
	if($("#usrMngmnt_retDt").val!=""){
		$("#usrMngmnt_usrGrdRetire").attr("disabled",false); 
	}
	//$("input:radio[name=ctiUsrYn]:input[value='Y']").prop("checked", true);	
	//소속 셀렉트 셋팅
	selAffiliation();
	
	//소속 상세보기 셀렉트 셋팅
	usrAffiliation();
	
	//등급코드
	initSelectBoxGrade();
	
	g_srchCntrCd = $("#usrMngmnt_selCenter").val();
	g_srchTeamCd = $("#usrMngmnt_selTeam").val();
	g_srchDeptCd = $("#usrMngmnt_selDept").val();
	
	// 조회 권한 셋팅
	if(window.sessionStorage.getItem("USR_GRD_CD") < "030100")
	{
		$("#usrMngmnt_selCenter").prop("disabled", true);
		$("#usrMngmnt_selTeam").prop("disabled", true);
	}
/*	else if(window.sessionStorage.getItem("USR_GRD_CD") < "050100")
		$("#usrMngmnt_selCenter").prop("disabled", true);*/
	
	// 센터 선택 이벤트
	
	datePicker("#usrMngmnt_entDt");
	datePicker("#usrMngmnt_retDt");
	
	// 초기 검색 입력 창 비활성화
	//$("#usrMngmnt_tfSrchval").prop("disabled", true);
	$("#usrMngmnt_btnUpdate").hide();
	$("#usrMngmnt_btnModifyPw").hide();
	$("#usrMngmnt_btnInsert").show();
	
	$("#usrMngmnt_tblUserList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/user/userList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrUserList("", "", $("input[id=usrMngmnt_chkNotUse]:checkbox").prop("checked"))
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["아이디", "이름", "등급", "핸드폰번호", "내선번호", "CTI ID", "퇴사여부", "수정일", "PW수정일"],
	   	colModel :
	   	[
	   	 	{ name : "USR_ID", index : "USR_ID", width : 100, align : "center" },
			{ name : "USR_NM", index : "USR_NM", width : 100, align : "center" },
			{ name : "CD_NM", index : "CD_NM", width : 100, align : "center" },
			{ name : "CEL_NO_FORMAT", index : "CEL_NO_FORMAT", width : 100, align : "center" },
			{ name : "EXTN_NO", index : "EXTN_NO", width : 100, align : "center" },
			{ name : "CTI_LGN_ID", index : "CTI_LGN_ID", width : 100, align : "center" },
			{ name : "RET_YN", index : "RET_YN", width : 100, align : "center" },
			{ name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 100, align : "center" },
			{ name : "PW_MOD_DT_FORMAT", index : "PW_MOD_DT_FORMAT", width : 100, align : "center" }
	   	],
	   	sortname : "USR_ID",
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#usrMngmnt_pgUselList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		usrAffiliation();
	   		var row = $("#usrMngmnt_tblUserList").getRowData(rowid);
	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/user/userspec.do",
				data : "pJson=" + getJsonStrUserspec(row.USR_ID),
				success : function(data)
				{
					initUserSpec();
					$("#usrMngmnt_usrIdText").prop("disabled", true);
					$("#usrMngmnt_usrIdText").val(data.USR_ID);
					$("#usrMngmnt_usrNmText").val(data.USR_NM);
					$("#usrMngmnt_pwdNoEncCntn").val("********");
					$("#usrMngmnt_entDt").val(data.ENT_DT_FORMAT);
					
					if(data.RET_DT_FORMAT != "--"){
						$("#usrMngmnt_retDt").val(data.RET_DT_FORMAT);
					};
					
					$("#usrMngmnt_cntrCd").val(data.CNTR_CD);
					$("#usrMngmnt_usrGrdCd").val(data.USR_GRD_CD);
					$("#usrMngmnt_usrGrdRetire").val(data.RET_RSN);
					
					setObjSelectBoxWithCode("usrMngmnt_teamCd", "미선택", "", "CHILD", "90003", "");
					
					$("#usrMngmnt_deptCd").val(data.DEPT_CD);
					$("#usrMngmnt_teamCd").val(data.TEAM_CD);
					$("#usrMngmnt_dtyCd").val(data.DTY_CD);
					$("input[name=ctiUsrYn][value=" + data.CTI_USE_YN + "]").prop("checked", true); 
					$("#usrMngmnt_ctiLgnId").val(data.CTI_LGN_ID);
					$("#usrMngmnt_extnNo").val(data.EXTN_NO);
					$("#usrMngmnt_telNo").val(getPhoneNumFormat(data.TEL_NO));
					$("#usrMngmnt_celNo").val(getPhoneNumFormat(data.CEL_NO));
					$("#usrMngmnt_emlAdr").val(data.EML_ADR);
					$("#usrMngmnt_pcIp").val(data.PC_IP);
					$("#pcMac").val(data.PC_MAC);
					$("#usrMngmnt_faxNo").val(getPhoneNumFormat(data.FAX_NO));
					$("#usrMngmnt_modDt").val(data.MOD_DT_FORMAT +" "+ data.MOD_TM_FORMAT);
					$("#usrMngmnt_modUsrId").val(data.MOD_USR_NM);
					if(data.SVRFL_PTH != null)
						$("#usrMngmnt_imgView").attr("src", getImgUrl() + replaceFileUrl(data.SVRFL_PTH));
					else
						$("#usrMngmnt_imgView").attr("src", "");
					$("#usrMngmnt_btnUpdate").show();
					$("#usrMngmnt_btnInsert").hide();
					$("#usrMngmnt_btnModifyPw").show();
				},
				error : function(data, status, err) 
				{
					alert(1)
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	   	onPaging : function(pgButton)
	   	{	   		
	   		initUserSpec();
	   	}
	}).jqGrid("navGrid", "#usrMngmnt_pgUselList", {edit : false, add : false, del : false, search : false});	
	
	// 검색타입 선택 이벤트 등록
	//$("#usrMngmnt_optSrchtype").bind("change", optSrchtype_changeEvent);
	// 조회 버튼 클릭 이벤트 등록
	$("#usrMngmnt_btnSearch").bind("click", btnSearch_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#usrMngmnt_btnInit").bind("click", btnInit_clickEvent);
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#usrMngmnt_tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	// 미사용 포함 체크 박스 클릭 이벤트 등록
	$("#usrMngmnt_chkNotUse").bind("click", btnSearch_clickEvent);
	
	// 사용자 상세 수정 버튼 클릭 이벤트 등록
	$("#usrMngmnt_btnInsert").bind("click", btnInsert_clickEvent);
	
	// 사용자 상세 수정 버튼 클릭 이벤트 등록
	$("#usrMngmnt_btnUpdate").bind("click", btnUpdate_clickEvent);
	
	// 비밀번호 변경 버튼 클릭 이벤트 등록
	$("#usrMngmnt_btnModifyPw").bind("click", btnModifyPw_clickEvent);
	
	// 사용자 상세  초기화 버튼 클릭 이벤트 등록
	$("#usrMngmnt_btnReset").bind("click", function(e)
	{
		$("#usrMngmnt_tblUserList").trigger("reloadGrid");
		initUserSpec();
		$("#usrMngmnt_usrGrdCd").empty();
		initSelectBoxGrade();
	});
	
	
	// 엑셀저장 버튼 클릭 이벤트 등록
	$("#usrMngmnt_btnExcel").bind("click", btnExcel_clickEvent);
	
	$("#usrMngmnt_USR_IMG_PTH").on('change', function(){
        readURL(this);
       // alert($(this).val());
    });
	
	// 전화번호 입력 시 '-' 붙임
	setPhoneNumFormat("usrMngmnt_telNo");
	setPhoneNumFormat("usrMngmnt_celNo");
	setPhoneNumFormat("usrMngmnt_faxNo");
	


});