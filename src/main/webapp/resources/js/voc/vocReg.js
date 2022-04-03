var fileBox_idx = 0;
var g_from = "";

// 페이지 초기화
$(document).ready(function()
{
	$("#vocLastDepthCd").bind("change", function()
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/user/userList.do",
			data : "pJson=" + getJsonStrUserList($("#vocLastDepthCd").val()),
			success : function(data)
			{
				$("#vocManager").html("");
				
				var value = "";
				
				$.each(data, function(key, state)
				{
					value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				});
				
				$("#vocManager").append(value);
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	});
	
	setSelectBoxWithCode("vocType", "", "90210", "", "", "");		// 민원구분
	setSelectBoxWithCode("vocSystemType", "", "90220", "", "", "");	// 시스템구분
	setSelectBoxWithCode("vocErrorType", "", "90230", "", "", "");	// 오류유형
	
	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrCenterSelectBox(),
		success : function(data)
		{
			$("#vocLastDepthCd").html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$("#vocLastDepthCd").append(value);
			$("#vocLastDepthCd").val(window.sessionStorage.getItem("CNTR_CD"));

			if($("#vocLastDepthCd").val() == null || $("#vocLastDepthCd").val() == "")
				$("#vocLastDepthCd").val($("#vocLastDepthCd").find("option:first").val());
			
			$("#vocLastDepthCd").trigger("change");
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});

	vocReg();
	
	// 저장 버튼
	$("#vocSavebtn").bind("click", saveVocData);
	
	//파일박스취소버튼 클릭이벤트 등록
	$("#btnRmFilebox").bind("click", btnRmFileBoxClickEvent);
	
	if(window.sessionStorage.getItem("USR_GRD_CD") == null && window.sessionStorage.getItem("USR_GRD_CD") < "030100")
		$("#vocLastDepthCd").prop("disabled", true);
	
	g_from = window.sessionStorage.getItem("VOC_from");
});

// 파일박스 내용삭제
function btnRmFileBoxClickEvent()
{
	inputFile[1] = inputFile[0].clone(true);
	$("#vocAddFile").replaceWith(inputFile[1]);
}

// 첨부파일 박스추가
function addFileBox()
{
	if(fileBox_idx >= 4)
	{
		alert("첨부파일은 최대 5개까지 가능합니다.");
	}
	else
	{
		var html = $("#fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#vocFile").append(html);
	}
}

// 첨부파일 박스 삭제
function removeFileBox(i)
{
	var el = $("#writeForm input[name=record_" + i + "]");

	if (el.next().val() == "add")
	{
		el.parent().parent().remove();
		fileBox_idx--;
	}
	else
	{
		el.next().val("remove");
		el.parent().parent().hide();
	}
}

// 기본정보 세션에서 불러오기
function vocReg()
{
	var vocRday = window.sessionStorage.getItem("VOC_Rday");
	var vocRtime = window.sessionStorage.getItem("VOC_Rtime");
	var vocUserName = window.sessionStorage.getItem("VOC_UserName");
	var vocCorpNm = window.sessionStorage.getItem("VOC_CorpNm");
	var vocCustNm = window.sessionStorage.getItem("VOC_CustNm");
	var vocFarmDisNum = window.sessionStorage.getItem("VOC_FarmDisNum");
	var vocRcvCont = window.sessionStorage.getItem("VOC_RcvCont");
	var vocCelPhoneNum = window.sessionStorage.getItem("VOC_CelPhoneNum");
	var vocCelPhoneNumFormat = getPhoneNumFormat(vocCelPhoneNum);
	var vocChgbcd = window.sessionStorage.getItem("VOC_Chgbcd");
	
	$("#vocRcvDt").html(vocRday);
	$("#vocRcvTm").html(vocRtime);
	$("#vocReg1").html(vocUserName);
	$("#vocReg2").val(vocCustNm);
	$("#vocReg3").val(vocCorpNm);
	$("#vocReg4").val(vocCelPhoneNumFormat);
	$("#vocReg5").html(vocFarmDisNum);
	$("#vocContents").val(vocRcvCont);
	
	if(vocChgbcd == "11000")
		setSelectBoxWithCode("vocChgbcd", "", "90009", "", "", "11000");
	else if(vocChgbcd == "12000")
		setSelectBoxWithCode("vocChgbcd", "", "90009", "", "", "12000");
	else if(vocChgbcd == "13000")
		setSelectBoxWithCode("vocChgbcd", "", "90009", "", "", "13000");
}

// VOC등록
function saveVocData()
{
	if ($("#vocTitle").val().trim() == "")
	{
		alert("제목을 입력해주세요");
		$("#vocTitle").focus();
		return;
	}
	
	if ($("#vocContents").val().trim() == "")
	{
		alert("문의내용을 입력해주세요");
		$("#vocContents").focus();
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/voc/vocInsert.do",
		data : "pJson=" + getJsonStrVocId(),
		success : function(data)
		{
			gAppendHidden("writeForm", "pJson", getJsonStrVocInsert(data.VOC_ID));
			gSubmitPost("writeForm", true);
			
			window.sessionStorage.setItem("VOC_Contents", $("#vocContents").val()); 
			
			alert("voc가 등록되었습니다.");
			
			if(g_from == "main")
				opener.parent.setQuestionInfo(window.sessionStorage.getItem("VOC_Contents"));
			else
				opener.parent.completeVocInsertFromPopup();
				
			self.close();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 필드 초기화
function vocInsertInit()
{
	$("#vocRcvDt").val("");
	$("#vocRcvTm").val("");
	$("#vocReg1").val("");
	$("#vocReg2").val("");
	$("#vocReg3").val("");
	$("#vocReg4").val("");
	$("#vocReg5").val("");
	$("#vocTitle").val("");
	$("#vocContents").val("");
	$("#VOC_FILE_PTH").val("");
	$("input:radio[name=fast_yn]:input[value=N]").prop("checked", true);
	
	setSelectBoxWithCode("selMainChgbcd", "", "90009", "", "", "12000");
	setSelectBoxWithCode("vocType", "", "90210", "", "", "");
	setSelectBoxWithCode("vocSystemType", "", "90220", "", "", "");
	setSelectBoxWithCode("vocErrorType", "", "90230", "", "", "");
	
	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrCenterSelectBox(),
		success : function(data)
		{
			$("#vocLastDepthCd").html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$("#vocLastDepthCd").append(value);
			$("#vocLastDepthCd").val(window.sessionStorage.getItem("CNTR_CD"));

			if($("#vocLastDepthCd").val() == null || $("#vocLastDepthCd").val() == "")
				$("#vocLastDepthCd").val($("#vocLastDepthCd").find("option:first").val());
			
			$("#vocLastDepthCd").trigger("change");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//파라미터 셋팅 CenterSelectBox
function getJsonStrCenterSelectBox()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZWxpc3Q=",
		"map" : {
			"key" : "value",
			"tp_cd" : "90002",
			"ext6_cd" : "Y",
			"notuse" : false,
			"sidx" : "cd_seq",
			"sord" : "asc"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 UserList
function getJsonStrUserList(cntrCd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"gradeType" : "030100",
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// VOC 아이디 불러오기
function getJsonStrVocId()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMjEuZ2V0Vm9jSWQ=",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// VOC 등록
function getJsonStrVocInsert(vocId)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y20wMjEudm9jSW5zZXJ0",
		"map" : {
			"key" : "value",
			"voc_id" : vocId,
			"tckt_id" : $("#tfMainTicketId").val(),
			"cust_id" : $("#tfCustId").val(),
			"voc_call" : $("#vocReg4").val().replace(/-/gi, ""),
			"trans_depth" : "0",
			"voc_kind_cd" : $("#vocType").val(),
			"system_knd" : $("#vocSystemType").val(),
			"err_knd" : $("#vocErrorType").val(),
			"voc_title" : $("#vocTitle").val(),
			"voc_contents" : $("#vocContents").val(),
			"last_dept_cd" : $("#vocLastDepthCd").val(),
			"last_id" : $("#vocManager").val(),
			"fast_yn" : $(":radio[name='fast_yn']:checked").val(),
			"in_alam_on" : "Y",
			"creat_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"creat_dt" : $("#vocRcvDt").html().replace(/-/gi, ""),
			"creat_tm" : $("#vocRcvTm").html().replace(/:/gi, ""),
			"tbl_nm" : "cm021",
			"tbl_pk": vocId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}