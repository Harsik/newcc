var g_ch_snd_id = "";

// 파라미터 셋팅_SmsSendSpec
function getJsonStrSmsSendSpec(chSndId)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMjAuY2hTZW5kU3BlYw==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : chSndId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateSendSpec
function getJsonStrUpdateSendSpec(isDelete)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMjAudXBkYXRl",
		"map" : {
			"key" : "value",
			"ch_snd_id" : g_ch_snd_id,
			"rcv_cntct_infm" : isDelete == "Y" ? "" : $("#tfSpecChCntctInfm").val().trim().replace(/-/gi, ""),
			"snd_cont" : isDelete == "Y" ? "" : $("#tfSpecSndCont").val(),
			"snd_resv_dt" : isDelete == "Y" ? "" : changeDateString(getResvDate($("#tfSpecSndResvDtm").val())),
			"snd_resv_tm" : isDelete == "Y" ? "" : changeTimeString(getResvDate($("#tfSpecSndResvDtm").val())),
			"use_yn" : isDelete == "Y" ? "N" : "",
			"cro_id" : "2ksys_test",
			"schedule_type" : $("#tfSpecSndResvDtm").val().trim() == "" ? "0" : "1",
			"subject" : "",
			"callback" : "120",
			"dest_info" : $("#tfSpecChSndId").val() + "^" + $("#tfSpecChCntctInfm").val().replace(/-/gi, ""),
			"cont_length" : parseInt($("#labSpecCountTxtNum").html())
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//저장 버튼 클릭 이벤트
function btnModify_clickEvent()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateChSendSpec.do",
		data : "pJson=" + getJsonStrUpdateSendSpec("N"),
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

// 삭제 버튼 클릭 이벤트
function btnDelete_clickEvent()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateChSendSpec.do",
		data : "pJson=" + getJsonStrUpdateSendSpec("Y"),
		success : function(data)
		{
			alert("삭제되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 상세정보 부분 초기화
function initSpec()
{
	$("#btnModify").hide();
	$("#btnDelete").hide();
	
	$("#tfSpecChSndId").val("");
	$("#labSpecUsrNm").html("");
	$("#tfSpecSndCont").val("");
	$("#labSpecCountTxtNum").html("0");
	$("#labSpecCorpNm").html("");
	$("#labSpecCustNm").html("");
	$("#labSpecSendFrom").html("");
	$("#tfSpecChCntctInfm").val("");
	$("#labSpecSndReqDtm").html("");
	$("#tfSpecSndResvDtm").val("");
	$("#labSpecSndEndDtm").html("");
	$("#labSpecSndRsltNm").html("");
	$("#labSpecTcktId").html();
	
	$("#tfSpecSndCont").prop("disabled", true);
	$("#tfSpecChCntctInfm").prop("disabled", true);
	$("#tfSpecSndResvDtm").prop("disabled", true);
}

// 문자 상세 정보를 가져와 화면에 표시
function viewSpec()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getSmsSendSpec.do",
		data : "pJson=" + getJsonStrSmsSendSpec(g_ch_snd_id),
		success : function(data)
		{
			$("#btnModify").hide();
	   		$("#btnDelete").hide();
	   		
		   	$("#tfSpecSndCont").prop("disabled", true);
			$("#tfSpecChCntctInfm").prop("disabled", true);
			$("#tfSpecSndResvDtm").prop("disabled", true);
			
			$("#tfSpecChSndId").val(data.CH_SND_ID);
			$("#labSpecUsrNm").html(data.USR_NM);
			$("#tfSpecSndCont").val(data.SND_CONT);
			$("#labSpecCountTxtNum").html(charByteSize(data.SND_CONT));
			$("#labSpecCorpNm").html(data.CORP_NM);
			$("#labSpecCustNm").html(data.CUST_NM);
			$("#labSpecSendFrom").html(data.SND_CNTCT_INFM);
			$("#tfSpecChCntctInfm").val(data.CNTCT_INFM);
			$("#labSpecSndReqDtm").html(data.SND_REQ_DTM);
			$("#tfSpecSndResvDtm").val(data.SND_RESV_DTM);
			$("#labSpecSndEndDtm").html(data.TRAN_RSLTDATE);
			$("#labSpecSndRsltNm").html(data.TRAN_STATUS_NM);
			$("#labSpecTcktId").html(data.TCKT_ID);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});	
}

//init page
$(document).ready(function()
{
	initSpec();
	
	g_ch_snd_id = window.sessionStorage.getItem("smsSpecChSndId");
	
	// 예약일시 datetimepicker 설정
	$("#tfSpecSndResvDtm").datetimepicker({
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
	
	// 저장 버튼 클릭 이벤트
	$("#btnModify").bind("click", btnModify_clickEvent);
	
	// 삭제 버튼 클릭 이벤트
	$("#btnDelete").bind("click", btnDelete_clickEvent);
	
	// 문자내용 keyup 이벤트
	$("#tfSpecSndCont").bind("keyup", function(e)
	{
		$("#labSpecCountTxtNum").html(charByteSize($("#tfSpecSndCont").val()));
	});
	
	viewSpec();
});