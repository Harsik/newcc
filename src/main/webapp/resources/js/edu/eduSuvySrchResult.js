// 조회 조건 및 조회 값
var g_Edu_Id = window.opener.document.getElementById("rpedcp_getEduId").value;
var g_Suvy_Id = window.opener.document.getElementById("rpedcp_getSuvyId").value;

//파라미터 셋팅 getJsonStrSaveSuvyInfm
function getJsonStrSaveSuvyInfm()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b3IwNDIuc2F2ZVN1dnlJbmZt",
		"map" : {
			"key" : "value",
			"edu_Id" : g_Edu_Id,
			"suvy_Id" : g_Suvy_Id,
			"suvy_Infm" : $("#edsvrs_suvy_Infm").val().trim(),
			"qst_Nm" : $("#edsvrs_qst_Nm").val().trim(),
			"ans_Nm" : $("#edsvrs_ans_Nm").val().trim(),
			"etc" : $("#edsvrs_etc").val().trim(),
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 getJsonStrSelectSuvyInfm
function getJsonStrSelectSuvyInfm()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b3IwNDIuc2VsZWN0U3V2eUluZm0=",
		"map" : {
			"key" : "value",
			"edu_Id" : g_Edu_Id,
			"suvy_Id" : g_Suvy_Id,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 출력 버튼 클릭 이벤트 등록
function btnPrint_clickEvent()
{

	window.open("http://172.17.100.100:8090/ClipReport4/eduSuvySrchResult.jsp?eduId="+g_Edu_Id+"&suvId="+g_Suvy_Id);
}

// 저장 버튼 클릭 이벤트 등록
function btnSave_clickEvent()
{

	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/eduSaveSuvyInfm.do",
		data : "pJson=" + getJsonStrSaveSuvyInfm(),
		success : function(data)
		{
			alert("저장되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});

}

// 초기화 버튼 클릭 이벤트 등록
function btnInit_clickEvent()
{
	initData();
	$("#edsvrs_suvy_Infm").focus();
}

//초기화면 데이터 설정
function initData()
{	
	$("#edsvrs_suvy_Infm").val("");
	$("#edsvrs_qst_Nm").val("");
	$("#edsvrs_ans_Nm").val("");
	$("#edsvrs_etc").val("");
}

function initEvent()
{
	// 출력 버튼 클릭 이벤트 등록
	$("#edsvrs_btnPrint").bind("click", btnPrint_clickEvent);	
	// 저장 버튼 클릭 이벤트 등록
	$("#edsvrs_btnSave").bind("click", btnSave_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#edsvrs_btnInit").bind("click", btnInit_clickEvent);
}

// init Page
$(document).ready(function()
{
	initData();
	initEvent();

	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/eduSelectSuvyInfm.do",
		data : "pJson=" + getJsonStrSelectSuvyInfm(),
		success : function(data)
		{
			if (data != null)
			{
		
				data.SUVY_INFM != null ? $("#edsvrs_suvy_Infm").val(data.SUVY_INFM) : $("#edsvrs_suvy_Infm").val("");	//설문정보
				data.QST_NM != null ? $("#edsvrs_qst_Nm").val(data.QST_NM) : $("#edsvrs_qst_Nm").val("");			//설문
				data.ANS_NM != null ? $("#edsvrs_ans_Nm").val(data.ANS_NM) : $("#edsvrs_ans_Nm").val("");			//응답
				data.ETC != null ? $("#edsvrs_etc").val(data.ETC) : $("#edsvrs_etc").val("");				//기타의견
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});

});