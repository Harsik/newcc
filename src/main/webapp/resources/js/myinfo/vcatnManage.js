var usrId = window.sessionStorage.getItem("USR_ID");
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var g_cntrCd = window.sessionStorage.getItem("CNTR_CD");
var messageUsrGrd = getUserGrdCode() >= 30100 ? true : false;

//파라미터 셋팅 VcatnList
function getJsonStrVcatnList(cntrCd)
{
	frDate = $("#vcatmn_selFrDate").val();
	toDate = $("#vcatmn_selToDate").val();
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNzUudmNhdG5MaXN0",
		"map" : {
			"key" : "value",
			"usr_id" : messageUsrGrd ? $("#vcatmn_optSrchType").val()==null?"all" : $("#vcatmn_optSrchType").val() : usrId,
			"vactGbCd" : $("#vcatmn_vcatnListType").val(),
			"startDate" : frDate.replace(/[-, :, \s]/g,""),
			"endDate" : toDate.replace(/[-, :, \s]/g,""),
			"usrGrdCd":usrGrdCd,
			"vactApprCd":($("#vcatmn_consentTypes").val()==null?"100000":$("#vcatmn_consentTypes").val()),
			"vactGbCd":($("#vcatmn_vcatnListType").val()==null?"all":$("#vcatmn_vcatnListType").val())
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
//파라미터 셋팅 시퀀스 값
function getNextValue(){
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b2gwMjEubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertVcatn
function getJsonStrInsertVcatn(pnct_id) {

	var loParam = {
		"qt" :	"aW5zZXJ0",
		"mi" : "b20wNzUudmNhdG5TYXZl",
		"map" : {
			"key" : "value",
			"pnct_id" : pnct_id,
			"app_dt" : $("#vcatmn_selRqStdt").val().replace(/[-, :, \s]/g,""),
			"usr_id" : usrId,
			"vact_gb_cd" :  $("#vcatmn_vcatnViewType").val(),
			"vact_appr_cd" : $("input[name=consentType]:checked").val(),
			"col3" :  $("#vcatmn_chgHy").val()==null?"":$("#vcatmn_chgHy").val(),
			"strt_dt" : $("#vcatmn_holStart").val().replace(/[-, :, \s]/g,""),
			"end_dt" : $("#vcatmn_holEnd").val().replace(/[-, :, \s]/g,""),
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"message" : "요청 되었습니다."
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertVcatn
function getJsonStrUpdateVcatn(pnct_id) {
	
	var loParam = {
		"qt" :	"aW5zZXJ0",
		"mi" : "b20wNzUudmNhdG5Nb2RmeQ==",
		"map" : {
			"key" : "value",
			"pnct_id" : pnct_id,
			"app_dt" : $("#vcatmn_selRqStdt").val().replace(/[-, :, \s]/g,""),
			"usr_id" : usrId,
			"vact_gb_cd" :  $("#vcatmn_vcatnViewType").val(),
			"vact_appr_cd" : $("input[name=consentType]:checked").val(),
			"col3" :  $("#vcatmn_chgHy").val()==null?"":$("#vcatmn_chgHy").val(),
			"strt_dt" : $("#vcatmn_holStart").val().replace(/[-, :, \s]/g,""),
			"end_dt" : $("#vcatmn_holEnd").val().replace(/[-, :, \s]/g,""),
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),			
			"message" : ($("input[name=consentType]:checked").val()!="300000"?$("#vcatmn_btnProp").text():"반려")+" 되었습니다."
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅 insertVcatn
function getJsonStrDeleteVcatn(pnct_id) {
	var loParam = {
		"qt" :	"aW5zZXJ0",
		"mi" : "b20wNzUudmNhdG5EaXN1c2U=",
		"map" : {
			"key" : "value",
			"pnct_id" : pnct_id,
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),			
			"message" : "삭제 되었습니다."
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 userInfoListExcel
function getJsonStrUserInfoListExcel(){	
	frDate = $("#vcatmn_selFrDate").val();
	toDate = $("#vcatmn_selToDate").val();
	
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNzUudmNhdG5MaXN0",
		"map" : {
			"key" : "value",	
			"usr_id" : $("#vcatmn_optSrchType").val(),
			"vactGbCd" : $("#vcatmn_vcatnListType").val(),
			"startDate" : frDate.replace(/[-, :, \s]/g,""),
			"endDate" : toDate.replace(/[-, :, \s]/g,""),
			"usrGrdCd": usrGrdCd,
			"vactApprCd":($("#vcatmn_consentTypes").val()==null?"100000":$("#vcatmn_consentTypes").val()),
			"vactGbCd":($("#vcatmn_vcatnListType").val()==null?"all":$("#vcatmn_vcatnListType").val()),
			"title" : "휴가_신청_이력" + setDownLoadName(frDate, toDate),
			"colWidth" : [20, 30, 15, 30 ,15, 10, 40],
			"colName" : ["APP_DT", "CNTR_NM", "USR_NM","VCANTN_DAY","VACT_GB_NM", "VACT_APPR_NM", "RTN_RSN"], 
			"colHeader" : ["신청일자", "소속", "상담사","휴가일자","휴가구분", "처리구분", "반려사유"],
			"colAlign" : ["center", "center", "center", "center", "center", "center","center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//2019.12.30 hhs sortname 수정
function btnSearch_clickEvent(isFlag){
	init_infoPanel();
	//$("#vcatmn_tblGroup").jqGrid("setGridParam", {postData : {pJson : getJsonStrVcatnList("")}, page : 1, sortname : "MOD_TM", sortorder : "DESC"});
	$("#vcatmn_tblGroup").jqGrid("setGridParam", {postData : {pJson : getJsonStrVcatnList("")}, page : 1, sortname : "app_dt", sortorder : "DESC"}); //일자 기준으로 정렬
	$("#vcatmn_tblGroup").trigger("reloadGrid");
	
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
	if(usrGrdCd != "010100"){
		$("#vcatmn_optSrchType").val("all");
	}
	$("#vcatmn_consentTypes").val("100000");
	$("#vcatmn_hdListTypes").val("all");
	$("#vcatmn_selFrDate").val(getDate());
	$("#vcatmn_selToDate").val(getDate());
	$("input[name=consentType][value=100000]").prop("checked", true);
	
	btnSearch_clickEvent();
	
}
//입력검증
function validator() {
	var rMsg = "";
	
	var vcatnTy = $("#vcatmn_vcatnViewType").val();
	var consty = $("input[name=consentType]:checked").val();
	var chgHy = $("#vcatmn_chgHy").val();
	
	
	var arrStDate = $("#vcatmn_holStart").val().split("-");
	var assLtDate = $("#vcatmn_holEnd").val().split("-");
	var stDate = new Date(arrStDate[0], arrStDate[1] - 1, arrStDate[2]);
	var ltDate = new Date(assLtDate[0], assLtDate[1] - 1, assLtDate[2]);
	var betweenDate = (ltDate.getTime() - stDate.getTime()) / 1000 / 60 / 60 / 24;
	
	if(betweenDate > 24)
	{
		rMsg += "\n 24일이 넘는 기간은 휴가신청 할수 없습니다."; 
	}
	
	if(vcatnTy == "all" || vcatnTy == null) {
		rMsg += "\n근태구분을 선택해 주세요."; 
	}
	

	
	if(consty == "300000" && chgHy =="") {
		rMsg += "반려사유를 입력 바랍니다.";
	}
	return rMsg;
}


function btnSave_clickEvent(){
	
	if(confirm("신청하신 내용을 확인 하셨습니까?")){
		
		var rMsg = validator();
		if(rMsg != "") {
			alert(rMsg);
			return;
		}
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/management/insertManual.do",
			data : "pJson=" + getNextValue(),
			success : function(data){
				gAppendHidden("vcatmn_writeForm", "pJson", getJsonStrInsertVcatn(data.PNCT_ID));
				gSubmitPostVcant("vcatmn_writeForm", true);
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});
	}
}

function btnProUp_clickEvent(){
	
	var rMsg = validator();
	if(rMsg != "") {
		alert(rMsg);
		return;
	}
	if(confirm($("#vcatmn_btnProp").text()+"을 하시겠습니까?")){
		gAppendHidden("vcatmn_writeForm", "pJson", getJsonStrUpdateVcatn($("#vcatmn_inpPnctId").val()));
		gSubmitPostVcant("vcatmn_writeForm", true);
	}
}

function btnDelete_clickEvent(){
	if(confirm("이력을 삭제하시겠습니까?")){
		gAppendHidden("vcatmn_writeForm", "pJson", getJsonStrDeleteVcatn($("#vcatmn_inpPnctId").val()));
		gSubmitPostVcant("vcatmn_writeForm", true);
	}
}

//엑셀저장버튼 클릭 이벤트
function btnExcel_clickEvent(){
	excelDownLoad(getContextPath() + "/excel/user/userInfoList.do", getJsonStrUserInfoListExcel());
}

function initControl() {
	
	$('#vcatmn_selFrDate').val(getDate());
	$('#vcatmn_selToDate').val(getDate());
	$('#vcatmn_selRqStdt').val(getDate());
	$('#vcatmn_holStart').val(getDate());
	$('#vcatmn_holEnd').val(getDate());
	
	datePicker("#vcatmn_selFrDate");
	datePicker("#vcatmn_selToDate");
	datePicker("#vcatmn_selRqStdt");
	datePicker("#vcatmn_holStart");
	datePicker("#vcatmn_holEnd");
	
	$("#vcatmn_tblGroup").jqGrid({
		url : getContextPath() + "/jqgrid/user/userInfo.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrVcatnList("")
		},
		jsonReader :{
			repeatitems: false
		},
		colNames : ["휴가아이디","일자", "소속", "상담사", "휴가구분", "처리구분",  "휴가기간","반려사유","휴가시작일자","휴가변경일자"],
	   	colModel :
	   	[
	   	 	{ name : "PNCT_ID", index : "PNCT_ID", align : "center", hidden : true  },
	   	 	{ name : "APP_DT", index : "APP_DT", align : "center", width : 40 },
			{ name : "CNTR_NM", index : "CNTR_NM", align : "center", width : 80 },
			{ name : "USR_NM", index : "USR_NM", align : "center", width : 40 },
			{ name : "VACT_GB_NM", index : "VACT_GB_NM", align : "center", width : 40 },
			{ name : "VACT_APPR_NM", index : "VACT_APPR_NM", align : "center", width : 30,edittype:'text',editrules:{required:true}
				, cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
			    if ( rowObject.VACT_APPR_NM == "승인" ) { return 'style="text-align:center;color:blue;"' }
			    if ( rowObject.VACT_APPR_NM == "반려" ) { return 'style="text-align:center;color:red;"' } } },
			{ name : "VCANTN_DAY", index : "VCANTN_DAY",align : "center", width : 70 },
			{ name : "RTN_RSN", index : "RTN_RSN", align : "center", width : 80 },
			{ name : "HOLSTART", index : "HOLSTART", hidden : true },
			{ name : "HOLEND", index : "HOLEND", hidden : true }
	   	],
	   	sortname : "MOD_TM",
	   	sortorder : "DESC",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "340",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#vcatmn_innerGrpPager",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)	{
	   		var row = $("#vcatmn_tblGroup").getRowData(rowid);	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/user/userCommuteSpec.do",
				data : "pJson=" + getJsonStr("c2VsZWN0T25l", "b20wNzUudmNhdG5JbmZv", {
					"key" : "value",
					"pnct_id" : row.PNCT_ID
				}), 
				success : function(data){
					$("#vcatmn_confmer").html("");
					$("#vcatmn_confmDt").html("");
					$("#vcatmn_inpPnctId").val(data.PNCT_ID);
					$("#vcatmn_inpUsrId").val(data.USR_ID);
					$("#vcatmn_selRqStdt").val(data.APP_DT);
					$("#vcatmn_vcatnViewType").val(data.VACT_GB_CD);
					$("#vcatmn_applcnt").html(data.USR_NM);
					$("#vcatmn_rqstDt").html(data.CRT_DTTM);
					$("#vcatmn_btnProp").html("수정");
					$("#vcatmn_confmer").html(data.MOD_USR_NM);
					$("#vcatmn_confmDt").html(data.MOD_DTTM);
					$("#vcatmn_chgHy").val(data.RTN_RSN);					
					$("#vcatmn_btnProp ,#vcatmn_btnDelete").show();
					$("#vcatmn_btnSave").hide();
					$("#vcatmn_holStart").val(data.HOLSTART);
					$("#vcatmn_holEnd").val(data.HOLEND);
					$("input[name=consentType][value="+data.VACT_APPR_CD+"]").prop("checked", true);
					
					//manager일경우 승인,반려권한
					if(messageUsrGrd){
					    $("input[name=consentType][value=200000], input[name=consentType][value=300000]").attr("disabled",false); 
					}
					//반려일경우 반려 사유
					var VactApprCd =data.VACT_APPR_CD;
					if(VactApprCd=='200000' || VactApprCd=='100000'){
					    $("#vcatmn_chgHy").prop("disabled", true);
					}else{
					    $("#vcatmn_chgHy").prop("disabled", false);
					}
					//상담사일경우 수정,삭제 숨김
					if((VactApprCd=='200000' && !messageUsrGrd) || (VactApprCd=='300000' && !messageUsrGrd)){
					    $("#vcatmn_btnProp").hide();
					    $("#vcatmn_btnDelete").hide();
					    $("#vcatmn_chgHy").prop("disabled", true);
					}else{
					    $("#vcatmn_btnProp").show();
					    $("#vcatmn_btnDelete").show();
					}
					
					
					
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	}).jqGrid("navGrid", "#vcatmn_innerGrpPager", {edit : false, add : false, del : false, search : false});
	}

function initEvent() {
	$("#vcatmn_btnSearch").bind("click", btnSearch_clickEvent);	
	$("#vcatmn_btnInit").bind("click",btnInit_clickEvent);
	$("#vcatmn_btnExcel").bind("click", btnExcel_clickEvent);
	
	$("#vcatmn_btnSave").bind("click", btnSave_clickEvent);
	$("#vcatmn_btnProp").bind("click", btnProUp_clickEvent);
	$("#vcatmn_btnDelete").bind("click", btnDelete_clickEvent);
	$("#vcatmn_btnViewInit").bind("click", init_infoPanel);
	
	$("input[name=consentType]").on("click", function(){
		if($(this).val()=="300000"){
		    $("#vcatmn_chgHy").prop("disabled", false);
		    $("#vcatmn_btnProp").html("반려");
		    $("#vcatmn_btnSave").hide();
		    $("#vcatmn_btnProp ,#vcatmn_btnDelete").show();
		}else if($(this).val()=="200000"){
		    $("#vcatmn_chgHy").prop("disabled", true);
		    $("#vcatmn_btnProp").html("승인");
		    $("#vcatmn_chgHy").val("");
		    $("#vcatmn_btnSave").hide();
		    $("#vcatmn_btnProp ,#vcatmn_btnDelete").show();
		}else{
		    $("#vcatmn_chgHy").prop("disabled", true);
		    $("#vcatmn_btnProp").html("수정");
		    $("#vcatmn_chgHy").val("");
		    $("#vcatmn_btnProp ,#vcatmn_btnDelete").show();
		}
	});
		
	$("#vcatmn_btnProp ,#vcatmn_btnDelete").hide();
	$("#vcatmn_btnSave").show();
}

function initData() {
	setObjSelectBoxWithCode("vcatmn_vcatnListType", "전체", "","CHILD","90064", "");
	setObjSelectBoxWithCode("vcatmn_vcatnViewType", "전체", "","CHILD","90064", "");
	setObjSelectBoxWithCode("vcatmn_consentTypes", "전체", "","CHILD","90063", "");
	$("#vcatmn_consentTypes").val("100000");
	$("#vcatmn_chgHy").prop("disabled", true);
	
	if(!messageUsrGrd){
	    $("#vcatmn_eventPrevent").css("pointer-events", "none");
	    $("#vcatmn_selRqStdt").prop("disabled",true);
	    $("input[name=consentType][value=100000],input[name=consentType][value=200000], input[name=consentType][value=300000]").attr("disabled",true);
	    $("#vcatmn_optSrchType").prop("disabled",true);
	    setSelectBoxWithAgent("vcatmn_optSrchType", "전체", "CHILD", usrId,"","","","","" );
	}
	else{
	    setSelectBoxWithAgent("vcatmn_optSrchType", "전체", "CHILD", "all","","","","","" );
	    $("input[name=consentType][value=200000],input[name=consentType][value=300000]").attr("disabled",true);	
	}

}

function init_infoPanel() {
	$("#vcatmn_inpPnctId ,#vcatmn_inpUsrId ,#vcatmn_applcnt, #vcatmn_rqstDt, #vcatmn_confmer, #vcatmn_confmDt, #vcatmn_chgHy").empty();
	$("#vcatmn_selRqStdt").val(getDate());
	$("#vcatmn_vcatnViewType").val("all");
	$("input[name=consentType][value=200000], input[name=consentType][value=300000]").attr("disabled",true);
	$("input[name=consentType][value=100000]").prop("checked", true);
	$("#vcatmn_chgHy").prop("disabled", true);
	$("#vcatmn_btnProp ,#vcatmn_btnDelete").hide();
	$("#vcatmn_chgHy").val("");
	$("#vcatmn_btnSave").show();
	$("#vcatmn_holStart").val(getDate());
	$("#vcatmn_holEnd").val(getDate());
	
}

$(function(){	
	initEvent();
	initControl();
	initData();
});


function gSubmitPostVcant(formId, isUpload) {
	var form = $("#" + formId);

	if (isUpload == true) {
		form.attr("encoding", "multipart/form-data");
	} else if (isUpload == false) {
		form.attr("encoding", "");
	}

	form.ajaxSubmit({
		type : 'post',
		debug : true,
		success : function(data){
		    try {
			var result = $.parseJSON(data);
			if (result.message && result.message != "") {
			    alert(result.message);
			}
			if (result.callback && result.callback != "") {
			    window[result.callback](result.data);
			}
			if (result.redirectUrl && result.redirectUrl != "") {
			    document.location.href = result.redirectUrl;
			}
		    } catch (e) {
			return ;
		    } finally{
			$("#vcatmn_tblGroup").jqGrid("setGridParam", {postData : {pJson : getJsonStrVcatnList("")}, page : 1, sortname : "MOD_TM", sortorder : "DESC"});
			$("#vcatmn_tblGroup").trigger("reloadGrid");
			init_infoPanel();
		    }
		},
		error : defaultErrorHandler
	});
}


