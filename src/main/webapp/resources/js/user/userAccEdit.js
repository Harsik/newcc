// 조회 조건 및 조회 값
var g_gradeType = "all";
var g_srchtype = "all";
var g_srchval = "";
var g_cntrCd = "90002";
var g_teamCd = "90003";
var g_deptCd = "90004";
var g_gradeCd = "90006";
var g_dtyCd = "90005";
var pwdMod = "N";

var usrGrdCd = getUserGrdCode();

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
function getJsonStrUpdateUser()
{
	var modYn = "";
	
	if($("#USR_IMG_PTH").val() != "")
		modYn = 'Y';
	
	pwdMod = "N";
	
	if($("#pwdNoEncCntn").val() != "********")
		pwdMod = "Y";
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMDEudXBkYXRl",
		"map" : {
			"key" : "value",
			"usr_id" : $("#usrIdText").val(),
			"usr_nm" : $("#usrNmText").val(),
			"pwdMod" : pwdMod,
			"pwd_no_enc_cntn" : SHA256($("#pwdNoEncCntn").val()),
			"ent_dt" : $("#entDt").val().replace(/-/g,""),
			"ret_dt" : $("#retDt").val().replace(/-/g,""),
			"cntr_cd" : $("#cntrCd").val(),
			"team_cd" : $("#teamCd").val(),
			"dept_cd" : $("#deptCd").val(),
			"usr_grd_cd" : $("#usrGrdCd").val(),
			"dty_cd" : $("#dtyCd").val(),
			"cti_usr_yn" : $(":radio[name='ctiUsrYn']:checked").val(),
//			"cti_lgn_id" : $("#ctiLgnId").val(),
			"extn_no" : $("#extnNo").val(),
			"tel_no" : $("#telNo").val().replace(/-/gi, ""),
			"cel_no" : $("#celNo").val().replace(/-/gi, ""),
			"eml_adr" : $("#emlAdr").val(),
			"pc_ip" : $("#pcIp").val(),
			"pc_mac" : $("#pcMac").val(),
			"fax_no" : $("#faxNo").val().replace(/-/gi, ""),
			"tbl_nm" : "om001",
		    "tbl_pk": $("#usrIdText").val(),
		    "modYn" : modYn,
		    "callback" : "cb_merge"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function setSelectBoxGrade(usrId, usrGrdCd) {
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
					if(usrGrdCd === data[i].AUTH_CD) isExist = true;
					$.ajax({
						type : "post",
						async : true,
						url : getContextPath() + "/ajax/main/setSelectBoxdtcode.do",
						dataType : "json",
						data : "pJson=" + getJsonStrUserspec(window.sessionStorage.getItem("USR_ID")),
						success : function(data) {
							setSelectBoxWithCode("dtyCd", "", g_dtyCd, "", "", data.DTY_CD);
						},
						error : function(data, status, err) {
							networkErrorHandler(data, status, err);
						}
					});
				}
				$("#usrGrdCd").prepend(options);
				$("#usrGrdCd").val(usrGrdCd);
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//프로그램 상세 초기화
function initUserSpec()
{	
	$("#usrIdText").prop("disabled", false);
	
	$("#usrIdText").val("");
	$("#usrNmText").val("");
	$("#pwdNoEncCntn").val("");
	$("#pwdNoEncCntnChk").val("");
	$("#entDt").val("");
	$("#retDt").val("");
	$("input:radio[name=ctiUsrYn]:input[value=Y]").prop("checked", true);
	$("#extnNo").val("");
	$("#telNo").val("");
	$("#celNo").val("");
	$("#emlAdr").val("");
	$("#pcIp").val("");
	$("#pcMac").val("");
	$("#faxNo").val("");
	$("#modDt").val("");
	$("#modUsrId").val("");
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userspec.do",
		data : "pJson=" + getJsonStrUserspec(window.sessionStorage.getItem("USR_ID")),
		success : function(data)
		{
			$("#usrIdText").prop("disabled", true);
			$("#usrIdText").val(data.USR_ID);
			$("#usrNmText").val(data.USR_NM);
			$("#pwdNoEncCntn").val("********");
			$("#entDt").val(data.ENT_DT_FORMAT);
			if(data.RET_DT_FORMAT != "--")
				$("#retDt").val(data.RET_DT_FORMAT);
			$("#cntrCd").val(data.CNTR_CD);
			getCodeNmList("teamCd", data.TEAM_CD, data.CNTR_CD, g_teamCd, g_cntrCd);
			getCodeNmList("deptCd", data.DEPT_CD, data.TEAM_CD, g_deptCd, g_teamCd);
			
//			setSelectBoxWithCode("dtyCd", "", g_dtyCd, "", "", data.DTY_CD);
			setSelectBoxGrade(data.USR_ID, data.USR_GRD_CD);
			
			$("input:radio[name=ctiUsrYn]:input[value=" + data.CTI_USR_YN + "]").prop("checked", true);	
			$("#extnNo").val(data.EXTN_NO);
			$("#telNo").val(getPhoneNumFormat(data.TEL_NO));
			$("#celNo").val(getPhoneNumFormat(data.CEL_NO));
			$("#emlAdr").val(data.EML_ADR);
			$("#pcIp").val(data.PC_IP);
			$("#pcMac").val(data.PC_MAC);
			$("#faxNo").val(getPhoneNumFormat(data.FAX_NO));
			
			if(data.SVRFL_PTH != null)
				$("#imgView").attr("src", getImgUrl() + replaceFileUrl(data.SVRFL_PTH));
			else
				$("#imgView").attr("src", "");
			
			$("#modDt").val(data.MOD_DT_FORMAT +" "+ data.MOD_TM_FORMAT);
			$("#modUsrId").val(data.MOD_USR_NM);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
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
		success : function(data)
		{
			var jr = JSON.parse(data);
			var value = "<option value='all' selected>미선택</option>";
		
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$input.html(value).val(cd).trigger("change").trigger("load");
		},
		error : function(data, status, err) { networkErrorHandler(data, status, err); }
	});
}

//저장 및 수정 예외 처리
function checkUserSpec()
{
	var rMsg = "";
	pwdMod = "N";
	if($("#pwdNoEncCntn").val() != "********")
		pwdMod = "Y";
	
	if($("#usrIdText").val() == "")
		rMsg += "\n\nID를 입력 해 주세요.";
	if($("#usrNmText").val() == "")
		rMsg += "\n\n이름을 입력 해 주세요.";
	if($("#entDt").val() == "")
		rMsg += "\n\n입사일을 입력 해 주세요.";
	if($("#usrGrdCd").val() == "" || $("#usrGrdCd").val() == null)
		rMsg += "\n\n등급을 선택 해 주세요.";
	if($("#dtyCd").val() == "" || $("#dtyCd").val() == null)
		rMsg += "\n\n직급을 선택 해 주세요.";
	
	if(pwdMod == "Y")
	{
		if($("#pwdNoEncCntn").val() == "")
			rMsg += "\n\n비밀번호를 입력 해 주세요.";
		if($("#pwdNoEncCntn").val() != $("#pwdNoEncCntnChk").val())
			rMsg += "\n\n입력 하신 비밀번호와 확인 입력하신 비밀번호가 다릅니다.";		
	}
	
	return rMsg;
}

//프로그램 수정 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	var rMsg = checkUserSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	if(confirm("저장 하시겠습니까?"))
	{
		gAppendHidden("userAccForm", "pJson", getJsonStrUpdateUser());
		gSubmitPost("userAccForm", true);
	}
	/*$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userUpdate.do",
		data : "pJson=" + getJsonStrUpdateUser(),
		success : function(data)
		{			
			initUserSpec();
	   		alert("수정되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});*/
}

function readURL(input)
{
    if (input.files && input.files[0])
    {
	    var reader = new FileReader();
	
	    reader.onload = function (e)
	    {
	    	$("#imgView").attr("src", e.target.result);
		};
		
		reader.readAsDataURL(input.files[0]);
    }
}

function cb_merge()
{
	initUserSpec();
	alert("저장되었습니다.");
}

// init Page
$(document).ready(function()
{	
	//등급값 셋팅
	setSelectBoxWithCode("cntrCd", "", g_cntrCd, "", "", "");
	setSelectBoxWithCode("dtyCd", "", g_dtyCd, "", "", "");
	
	initUserSpec();

//TODO 권한관리 추가 후 삭제
//	센터장급 미만 시
//	if(usrGrdCd < 50000)
//	{
//		$("#cntrCd").prop("disabled", "true");
//		$("#teamCd").prop("disabled", "true");
//		$("#deptCd").prop("disabled", "true");
//		$("#usrGrdCd").prop("disabled", "true");
//		$("#dtyCd").prop("disabled", "true");
//	}
//	else
//	{
//		datePicker("#entDt");
//		datePicker("#retDt");
//	}
	
	// 사용자 상세 수정 버튼 클릭 이벤트 등록
	$("#btnUpdate").bind("click", btnUpdate_clickEvent);
	
	// 상담유형 대분류 선택 시 이벤트
	$("#cntrCd").bind("click", function(e)
	{
		setSelectBoxWithCode("teamCd", "미선택", g_teamCd, g_cntrCd, e.target.value, "");	// 상담유형 중분류 셋팅
		$("#deptCd").html("<option value='all' selected>미선택</option>");
	});
	
	$("#teamCd").bind("click", function(e)
	{
		setSelectBoxWithCode("deptCd", "미선택", g_deptCd, g_teamCd, e.target.value, "");
	});
	
	$("#USR_IMG_PTH").on('change', function()
	{
        readURL(this);
    });
	
	// 전화번호 입력 시 '-' 붙임
	setPhoneNumFormat("telNo");
	setPhoneNumFormat("celNo");
	setPhoneNumFormat("faxNo");
});