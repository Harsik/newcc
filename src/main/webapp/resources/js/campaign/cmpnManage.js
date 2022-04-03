﻿﻿var obj010 = {};
var obj011 = {};
var obj014 = {};
var obj010_1 = {};
var obj015_1 = {};	//캠페인 진행률

var nonAsign;
var totCnt;
var stotCnt = 0;

var obj010RowId;

var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

var isinitsect1 = false;
var isinitsect2 = false;
var isinitsect3 = false;
var isinitsect4 = false;
var isinitsect5 = false;
var isinitsect11 = false;
var isinitsect12 = false;

function getCmpgId()
{
	return obj010.CMPG_ID;
}

var g_use_yn = new Array();
g_use_yn = [true];

// 캠페인 진행률 상담사 파라미터 셋팅 ProgramList
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	//var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	var cntrCd = "";
	var teamCd = "";
	
	if(usrGrdCd == "090100" || usrGrdCd == "060100")
	{
		cntrCd = "";
		teamCd = "";
	}
	else if(usrGrdCd == "020100" || usrGrdCd == "030100" || usrGrdCd == "050100")
	{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = "";
	}
	else
	{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = window.sessionStorage.getItem("TEAM_CD");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"team_cd" : teamCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function btnSearch_1_clickEvent()
{
	var strUsr_id = "";
	if (usrGrdCd == "010100") {
		strUsr_id = window.sessionStorage.getItem("USR_ID");  
	} else {
		strUsr_id = "all";
	}
	
	var frDt = $("#selFrDate_1").val();
	var toDt = $("#selToDate_1").val();
	var cmpgNm = $("#cmpgNm_1").val();
	var optSrchtype = $("#progressStatus_1").val();
	var cmpgtype = $("#cmpgtype_1").val();
	
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();
	
	$("#cmpgId_2").val("");
	$("#cmpgtype_2").val("1");
	$("#selProcSt").val("010000");
	$("#selFrDateC_2").val(getDate());
	$("#selToDateC_2").val(getDate());
	$("#surveyCnt_2").html("");
	$("#surveyNmCnt_2").html("");
	$("#survetName_2").val("");
	$("#surveyArea_2").val("");
	
	if(frDt != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if(toDt != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	$("#tbl010").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value",
		"fr_dt" : frDt,
		"to_dt" : toDt,
		"cmpg_nm" : cmpgNm,
		"opt_srchtype" : optSrchtype,
		"cmpg_type" : cmpgtype,
		"usr_id" : strUsr_id,
		"usrGrdCd" : usrGrdCd
	})} , page : 1, sortname : "STRT_DT", sortorder : "desc"});
	$("#tbl010").trigger("reloadGrid");
	
	obj010 = {};
	obj011 = {};
	obj014 = {};
	nonAsign = "";
	
//	initProgramSpec();
}

function beginning_event()//캠페인 선택 플래그
{
	if(obj010.CMPG_NM)
		return true;
	else
		return false;
}

function btnReset_1_clickEvent() 
{
	$("#cmpgNm_1").val("");
	$("#progressStatus_1").val("all");
	$("#cmpgtype_1").val("all");
	$("#selFrDate_1").val(getDate());
	$("#selToDate_1").val(getDate());
	$("#tbl010").resetSelection();
	
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();
	
	$("#cmpgId_2").val("");
	$("#cmpgtype_2").val("1");
	$("#selProcSt").val("010000");
	$("#selFrDateC_2").val(getDate());
	$("#selToDateC_2").val(getDate());
	$("#surveyCnt_2").html("");
	$("#surveyNmCnt_2").html("");
	$("#survetName_2").val("");
	$("#surveyArea_2").val("");
	
	btnSearch_1_clickEvent();
	
	//캠페인대상자, 상담사배정 초기화
	init_Tbl012Tbl014();
	//문항 초기화
	btnReset_3_clickEvent();
	$("#tbl011").jqGrid("clearGridData");
}

function btnReset_2_clickEvent()
{
	$("#tbl010").trigger("reloadGrid");
	
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();
	
	$("#cmpgId_2").val("");
	$("#cmpgtype_2").val("1");
	$("#selProcSt").val("010000");
	$("#selFrDateC_2").val(getDate());
	$("#selToDateC_2").val(getDate());
	$("#surveyCnt_2").html("");
	$("#surveyNmCnt_2").html("");
	$("#survetName_2").val("");
	$("#surveyArea_2").val("");
	
	//캠페인대상자, 상담사배정 초기화
	init_Tbl012Tbl014();
	//문항 초기화
	btnReset_3_clickEvent();
	$("#tbl011").jqGrid("clearGridData");
}

function btnReset_3_clickEvent()
{
	$("#btnInsert_3").show();
	$("#btnUpdate_3").hide();
	$("#btnDelete_3").hide();
	if(isinitsect12==true){$("#tbl011").resetSelection();}
	//$("#tbl011").resetSelection();//SCRIPT5007: 정의되지 않음 또는 null 참조인 'frozenColumns' 속성을 가져올 수 없습니다.의 오류가 발생 
	//그리드를 시작부터 선언에서 탭 누를시 선언으로 변경하여 아직 선언되지 않은 그리드를 참조하려 해 이러한 오류가 발생   
	//그리드 선언을 확인후 작동되도록 변경
	
	$("#survey_3").val("");
	$("#surveyCnt_3").val("");
	$("#surveyNum_3").val("");
	$("#survey_nm_1").val("");
	$("#survey_nm_2").val("");
	$("#survey_nm_3").val("");
	$("#survey_nm_4").val("");
	$("#survey_nm_5").val("");
	$("#surveyType_3 option:first").prop("selected", true);
	$("#surveyType_3").trigger("change");
}

// 캠페인 기본 > 캠페인 내용 > 삭제
function btnDelete_3_clickEvent()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/checkedAnswer.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l","Y20wMTUuY2hlY2tlZEFuc3dlcg==", {
			"cmpg_id" : obj010.CMPG_ID
		}),
		success : function(data)
		{
			if(data.CHECKCOUNT == '0')
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/campaign/deletecm011.do",
					data : "pJson=" + getJsonStr("ZGVsZXRl","Y20wMTEuZGVsZXRlTGlzdA==", {
						"qst_seq" : obj011.QST_SEQ,
						"cmpg_id" : obj010.CMPG_ID
					}),
					success : function(data)
					{			
						$("#tbl011").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {"key" : "value" , "cmpg_id" : obj010.CMPG_ID
							})} , page : 1, sortname : "QST_NO", sortorder : "desc"}).trigger("reloadGrid");
						
						$("#btnInsert_3").show();
						$("#btnUpdate_3").hide();
						$("#btnDelete_3").hide();
						$("#tbl011").resetSelection(); 
						
						$("#survey_3").val("");
						$("#surveyCnt_3").val("");
						$("#surveyNum_3").val("");
						$("#survey_nm_1").val("");
						$("#survey_nm_2").val("");
						$("#survey_nm_3").val("");
						$("#survey_nm_4").val("");
						$("#survey_nm_5").val("");
						
						alert("삭제되었습니다");
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
			else
			{
				alert("진행중인 해피콜은 삭제 할 수 없습니다");
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function surveyCnt_changeEvent()
{
	var checkCnt = $("#surveyCnt_3").val();
	
	$("#survey_nm_1").prop("readonly", false);
	$("#survey_nm_2").prop("readonly", false);
	$("#survey_nm_3").prop("readonly", false);
	$("#survey_nm_4").prop("readonly", false);
	$("#survey_nm_5").prop("readonly", false);
	
	if(checkCnt !=null && checkCnt !="")
	{
		for(checkCnt++; checkCnt <= 5; checkCnt++)
			$("#survey_nm_"+checkCnt).prop("readonly", true);
	}
	else
	{
		$("#survey_nm_1").prop("readonly", true);
		$("#survey_nm_2").prop("readonly", true);
		$("#survey_nm_3").prop("readonly", true);
		$("#survey_nm_4").prop("readonly", true);
		$("#survey_nm_5").prop("readonly", true);
	}
}

//문항 수정
function btnUpdate_3_clickEvent() {
	if(obj010.PROC_ST_CD && obj010.PROC_ST_CD === "010000") {	//미진행상태일때만 문항입력 가능
		var qt = "dXBkYXRl";
		var mi = "Y20wMTEudXBkYXRl";
		var ansCnt = parseInt($("#surveyCnt_3").val());
		var map = {
			"qst_no" : $("#surveyNum_3").val(),
			"cmpg_id" : obj010.CMPG_ID,
			"qst_nm" : $("#survey_3").val(),
			"qst_type_cd" : $("#surveyType_3").val(),
			"qst_seq" : obj011.QST_SEQ,
			"ans_cnt" : ansCnt
		};
		
		
		for(var i = 1; i <= ansCnt; i++) {
			console.log(i);
			console.log($("#survey_nm_" + i).val());
			console.log($("#survey_nm_" + i));
			if($("#survey_nm_" + i).val()) {
				map["xamp" + i] = $("#survey_nm_" + i).val();
			} else {
				alert(i + "번째 문항을 입력해주세요.");
				return;
			}
		}
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/insertSurvey.do",
			data : "pJson=" + getJsonStr(qt, mi, map),
			success : function(data) {				
				var frDt = $("#selFrDate_1").val();
				var toDt = $("#selToDate_1").val();
				var cmpgNm = $("#cmpgNm_1").val();
				var optSrchtype = $("#progressStatus_1").val();
				var cmpgtype = $("#cmpgtype_1").val();
				
				if(frDt != null)
					frDt = frDt.replace(/[-, :, \s]/g,"");
				if(toDt != null)
					toDt = toDt.replace(/[-, :, \s]/g,"");
				
				$("#tbl010").jqGrid("setGridParam", {
					postData : {
						pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
							"key" : "value",
							"fr_dt" : frDt,
							"to_dt" : toDt,
							"cmpg_nm" : cmpgNm,
							"opt_srchtype" : optSrchtype,
							"cmpg_type" : cmpgtype
						})
					}, 
					page : 1, 
					sortname : "STRT_DT", 
					sortorder : "desc"
				}).trigger("reloadGrid");
				
				 $("#tbl011").jqGrid("setGridParam", {
					 postData : {
						 pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {
							 "key" : "value" ,
							 "cmpg_id" : obj010.CMPG_ID
						 })
					 }, 
					 page : 1,
					 sortname : "QST_NO", 
					 sortorder : "desc"
				 }).trigger("reloadGrid");
				 
				
				$("#btnInsert_3").show();
				$("#btnUpdate_3").hide();
				$("#btnDelete_3").hide();
				$("#tbl011").resetSelection();
				
				$("#survey_3").val("");
				$("#surveyCnt_3").val("");
				$("#surveyNum_3").val("");
				$("#survey_nm_1").val("");
				$("#survey_nm_2").val("");
				$("#survey_nm_3").val("");
				$("#survey_nm_4").val("");
				$("#survey_nm_5").val("");
				$("#surveyType_3 option:first").prop("selected", true);
				$("#surveyType_3").trigger("change");
				
			 
				alert("수정되었습니다.");
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	} else {
		alert("진행상태가 '준비중'인 건만 수정 가능합니다.");
	}
}

function btnUpdate_2_clickEvent()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/cmpgUpdate.do",
		data : "pJson=" + getJsonStr("dXBkYXRl","Y20wMTAudXBkYXRl",{
			 "cmpg_nm" : $("#survetName_2").val(),
			 "cmpg_dsc" : $("#surveyArea_2").val(),
			 "cmpg_type_cd" : $("#cmpgtype_2").val(),
			 "cmpg_rsch_cd" : "1",
			 "cntr_cd" : "",
			 "team_cd" : "",
			 "grtn" : "",
			 "clsn" : "",
			 "trgt_cust_cnt" : $("#surveyNmCnt_2").html(),
			 "proc_st" : $("#selProcSt").val(),
			 "strt_dt" : $("#selFrDateC_2").val().replace(/[-, :]/g,""),
			 "end_dt" :  $("#selToDateC_2").val().replace(/[-, :]/g,""),
			 "use_yn" : "Y",
			 "login_usr_id" : window.sessionStorage.getItem("USR_ID"),
			 "cmpg_id" : obj010.CMPG_ID
		}),
		success : function(data) {				
			alert("저장되었습니다");
			$("#tbl010").trigger("reloadGrid");

			btnReset_2_clickEvent();		
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});	
}

//문항 입력
function btnInsert_3_clickEvent() {
	var rowid = $("#tbl010").jqGrid('getGridParam','selrow');
	if(obj010.PROC_ST_CD && obj010.PROC_ST_CD === "010000") {	//미진행상태일때만 문항입력 가능
		if(!$("#survey_3").val()) {
			alert("질문명을 입력해 주세요.");
		} else if(!$("#surveyNum_3").val()) {
				alert("문항번호를 입력해 주세요.");
		} else if(!$("#surveyType_3").val()) {
				alert("질문유형을 선택해 주세요.");
		} else {
			var ansCnt = parseInt($("#surveyCnt_3").val()); //문항수
			
			var qt = "aW5zZXJ0";
			var mi = "Y20wMTEuaW5zZXJ0";
			var map = {
				"qst_no" : $("#surveyNum_3").val(),
				"cmpg_id" : obj010.CMPG_ID,
				"qst_nm" : $("#survey_3").val(),
				"qst_type_cd" : $("#surveyType_3").val(),
				"ans_cnt" : ansCnt
			};
			
			//문항입력
			for(var i = 1; i <= ansCnt; i++) {
				if($("#survey_nm_" + i).val()) {
					map["xamp" + i] = $("#survey_nm_" + i).val();
				} else {
					alert(i + "번째 문항을 입력해주세요.");
					return;
				}
			}
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/campaign/insertSurvey.do",
				data : "pJson=" + getJsonStr(qt, mi, map),
				success : function(data) {				
					var frDt = $("#selFrDate_1").val();
					var toDt = $("#selToDate_1").val();
					var cmpgNm = $("#cmpgNm_1").val();
					var optSrchtype = $("#progressStatus_1").val();
					var cmpgtype = $("#cmpgtype_1").val();
					
					if(frDt != null)
						frDt = frDt.replace(/[-, :, \s]/g,"");
					if(toDt != null)
						toDt = toDt.replace(/[-, :, \s]/g,"");
//					$("#btnSearch_1").trigger("click"); //2020.01.02 hhs 주석 처리 (516행으로 내림)
					
					/*$("#tbl010").jqGrid("setGridParam", {
						postData : {
							pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
								"key" : "value",
								"fr_dt" : frDt,
								"to_dt" : toDt,
								"cmpg_nm" : cmpgNm,
								"opt_srchtype" : optSrchtype,
								"cmpg_type" : cmpgtype
							})
						}, 
						page : 1, 
						sortname : "STRT_DT", 
						sortorder : "desc"
							
					}).trigger("reloadGrid");*/
					
					 $("#tbl011").jqGrid("setGridParam", {
						 postData : {
							 pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {
								 "key" : "value" ,
								 "cmpg_id" : obj010.CMPG_ID
							 })
						 }, 
						 page : 1,
						 sortname : "QST_NO", 
						 sortorder : "desc"
					 }).trigger("reloadGrid");
					 $("#btnSearch_1").trigger("click"); //2020.01.02 hhs 486행에 있던 것 아래로 옮김(505~516행 CMPG_ID 인식때문에)
					
					$("#btnInsert_3").show();
					$("#btnUpdate_3").hide();
					$("#btnDelete_3").hide();
					$("#tbl011").resetSelection();
					
					$("#survey_3").val("");
					$("#surveyCnt_3").val("");
					$("#surveyNum_3").val("");
					$("#survey_nm_1").val("");
					$("#survey_nm_2").val("");
					$("#survey_nm_3").val("");
					$("#survey_nm_4").val("");
					$("#survey_nm_5").val("");
					$("#surveyType_3 option:first").prop("selected", true);
					$("#surveyType_3").trigger("change");
					
					alert("추가되었습니다.");
					 $("#tbl010").jqGrid("setSelection", rowid, true); //2020.01.02 hhs 해피콜 문항 등록 후, 해당 row다시 클릭
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});
		}
	}
	else {
		alert("진행중인 해피콜은 추가 할 수 없습니다");
	}
}

function btnExelDown_clickEvent()
{

	var loParam = {
//		"svrFilePath" : "/resources/xls/cmpg_cust_list_1001.xls",
		"svrFilePath" : "/resources/xls/cmpg_cust_list_210526.xls",
		"locFileName" : "설문대상자목록.xls"
	};
	
	var url = getContextPath() + "/file/cmpnManage/excelFormDown.do?pJson=" + encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	window.open(url);
	
}

function btnExelInsert_clickEvent()
{
	if(beginning_event() == true)
		gf_openDialog("/web/campaign/custUpload.do", 360, 200, "no", "no");
	else
		alert("해피콜을 선택해 주세요.");
}

function btnInsert_2_clickEvent()
{
	if($("#selFrDateC_2").val() == null || $("#selFrDateC_2").val() == "")
	{
		alert("해피콜 시작기간을 선택해 주세요.");
	}
	else if(!$("#selProcSt").val())
	{
		alert("진행상태를 선택해 주세요.");
	}
	else if($("#selToDateC_2").val() == null || $("#selToDateC_2").val() == "")
	{
		alert("해피콜 종료기간을 선택해 주세요.");
	}
	else if($("#survetName_2").val() == null || $("#survetName_2").val() == "")
	{
		alert("해피콜명을 입력해 주세요.");
	}
	else
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/insertSurvey.do",
			data : "pJson=" + getJsonStr("aW5zZXJ0","Y20wMTAuaW5zZXJ0",{
				 "cmpg_nm" : $("#survetName_2").val(),
				 "cmpg_dsc" : $("#surveyArea_2").val(),
				 "cmpg_type_cd" : $("#cmpgtype_2").val(),
				 "cmpg_rsch_cd" : "1",
				 "cntr_cd" : "",
				 "team_cd" : "",
				 "grtn" : "",
				 "clsn" : "",
				 "trgt_cust_cnt" : $("#surveyNmCnt_2").html(),
				 "proc_st" : $("#selProcSt").val(),
				 "strt_dt" : $("#selFrDateC_2").val().replace(/[-, :]/g,""),
				 "end_dt" :  $("#selToDateC_2").val().replace(/[-, :]/g,""),
				 "use_yn" : "Y",
				 "login_usr_id" : window.sessionStorage.getItem("USR_ID")
			}),
			success : function(data)
			{
				btnReset_2_clickEvent();
				
				alert("저장되었습니다");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

function btnCusInsert_4_clickEvent()
{
	if(beginning_event() == true)
	{
		var pList1 = [];
		var checkedSeq = [];
		var j = 0;
		
		gUpdcnt = 0;
		gRowLength = $("#tbl012").getGridParam("reccount");
	
		var tbl012Rows = $("#tbl012").getRowData();
			
		for(var i = 0 ; i <= tbl012Rows.length; i++ )
		{	
			if(jQuery.isEmptyObject(tbl012Rows[i]))
				continue;
			
			console.log(tbl012Rows[i]);
			
			if (tbl012Rows[i].TARGET_YN == "1")
			{
				if(tbl012Rows[i].CUST_ID != null && tbl012Rows[i].CUST_ID !="")
				{
					pList1.push({"qt" : "aW5zZXJ0",
						"mi" : "Y20wMTIubWVyZ2U=",
						"map":	{
							"cmpg_id" : tbl012Rows[i].CMPG_ID,
							"cust_id" : tbl012Rows[i].CUST_ID,
							"cust_nm" : tbl012Rows[i].CUST_NM,
							"cmpg_cust_seq" : tbl012Rows[i].CMPG_CUST_SEQ,
							"tel_no" :  "0000000000"
					}});
				}
			}
			else
			{
				checkedSeq[j] =  tbl012Rows[i].CMPG_CUST_SEQ;
				j++;
			}
		}
		
		if(checkedSeq != null && checkedSeq != "")
		{
			pList1.unshift({"qt" : "ZGVsZXRl",
				"mi" : "Y20wMTIuZGVsZXRlQ3VzdA==",
				"map":	{
					"cmpg_id" : obj010.CMPG_ID,
					"acmpg_cust_seq" : checkedSeq
			}});
		}
			
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/insertSurvey.do",
			data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
			success : function(data)
			{
				$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
					"cmpg_id":obj010.CMPG_ID,
					"check1" : $('input:checkbox[name=check1]').is(':checked'),
					"check2" : $('input:checkbox[name=check2]').is(':checked')
				})} , page : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");
				
				select_cntEvent();
				
				$("#tbl010").jqGrid('setCell', obj010.id, 'TRGT_CUST_CNT', stotCnt);
				$("#surveyNmCnt_2").html(stotCnt);
				
				alert("해피콜이 완료된 고객을 제외하고 대상이 선정되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	{
		alert("해피콜을 선택해 주세요");
	}
}

// 캠페인 대상자 삭제하기
function btnCousDelete_4_clickEvent() {
	if(beginning_event() == true) {
		if(confirm("대상자를 삭제하시겠습니까?")) {
			var pList1 = [];
			var j =0;
			gUpdcnt = 0;
			gRowLength = $("#tbl012").getGridParam("reccount");
			
			var tbl012Rows = $("#tbl012").getRowData();
			
			for(var i = 0 ; i <= tbl012Rows.length; i++ ) {
				if(jQuery.isEmptyObject(tbl012Rows[i]))
					continue;
				
				//if(tbl012Rows[i].TARGET_YN == "1") {
				if($("#jqg_tbl012_"+(i*1+1)).prop("checked")) {
					if(tbl012Rows[i].CMPG_CUST_SEQ) {
						
						if(tbl012Rows[i].PROC_ST_CD !== "010000") {
							alert("해피콜 상태가 미진행인 고객만 대상자에서 제외하실 수 있습니다.");
							return;
						}
						
						pList1.push({
							"qt" : "ZGVsZXRl",
							"mi" : "Y20wMTIuZGVsZXRl",
							"map" : {
								"cmpg_cust_seq" : tbl012Rows[i].CMPG_CUST_SEQ,
								"cmpg_id" : obj010.CMPG_ID
							}
						});
						
						j++;
					}
				}
			}
			
			if(j <= 0) {
				alert("대상자를 선택해 주세요");
				return;
			}
				
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/campaign/deleteCustom.do",
				data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
				success : function(data) {
					btnSearch_7_clickEvent();
					
					$("#tbl014").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0Q291bnNlbG9y", { 
						"cmpg_id":obj010.CMPG_ID,
						"cntr_cd" : window.sessionStorage.getItem("USR_GRD_CD") > "060000" ? "" : window.sessionStorage.getItem("CNTR_CD")
					})} , page : 1, sortname : "USR_NM", sortorder : "asc"}).trigger("reloadGrid");
					
					//$("#tbl014").trigger("reloadGrid");
					alert("삭제되었습니다.");
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});
		}
	}
	else {
		alert("해피콜을 선택해 주세요");
	}
}

// 대상자 생성하기(상담이력)
function btnCousInsert_4_clickEvent()
{
	if(beginning_event() == true)
	{
		window.sessionStorage.setItem("cmpnId", obj010.CMPG_ID);
		var width = 1250;
		var height = 810;
		var top = window.screenTop + (screen.height - height) / 2;
		var left = window.screenLeft + (screen.width - width) / 2;
		var paramURL = getContextPath() + "/web/campaign/cmpnCustom.do";
		var option = "width=" + width + ", height=" + height
			+ ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
		
		var newWindow = window.open(paramURL, "cmpnCustom", option);
		newWindow.focus();
	}
	else
	{
		alert("해피콜을 선택해 주세요.");
	}
}

// 캠페인 대상자 선택 여부
function authYn_clickEvent1(celId) 
{
	var rowNum = $('#tbl012').getGridParam('rowNum');
	
	if(g_use_yn[celId.data-1])
	{
		for( var j = 1; j <= rowNum; j++)
			$("#tbl012").setCell(j, celId.data+1, "1");
		
		g_use_yn[celId.data-1] = false;
	}
	else
	{
		for( var j = 1; j <= rowNum; j++)
			$("#tbl012").setCell(j, celId.data+1, "0");
		
		g_use_yn[celId.data-1] = true;
	}
}

// 상담사 선택 여부
function authYn_clickEvent2(celId) 
{
	var rowNum = $('#tbl014').getGridParam('rowNum');
	
	if(g_use_yn[celId.data-1])
	{
		for( var j = 1; j <= rowNum; j++)
			$("#tbl014").setCell(j, celId.data+1, "1");
		
		g_use_yn[celId.data-1] = false;
	}
	else
	{
		for( var j = 1; j <= rowNum; j++)
			$("#tbl014").setCell(j, celId.data+1, "0");
		
		g_use_yn[celId.data-1] = true;
	}
}

// 캠페인 대상자 조회 버튼 
function btnSearch_4_clickEvent()
{
	$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
		"cmpg_id": obj010.CMPG_ID,
		"cust_nm" : $("#tfCustNm").val(),
		"tel_no" : $("#tfTel").val().replace(/-/gi, ""),
		"counselor" : $("#selCounselor").val(),
		"divAct" : $("#selDivAct").val(),
	})} , PAGE : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");
}

// 캠페인 대상자 초기화 버튼
function btnInit_4_clickEvent()
{
	$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
		"cmpg_id": obj010.CMPG_ID
	})} , page : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");
	
	$("#tfCustNm").val("");
	$("#tfTel").val("");
	$("#selDivAct option:first").prop("selected", true);
	$("#selDivAct").trigger("change");
	$("#selCounselor option:first").prop("selected", true);
}

function checkbox_4_changeEvent()
{
	$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
		"cmpg_id":obj010.CMPG_ID,
		"check1" : $('input:checkbox[name=check1]').is(':checked'),
		"check2" : $('input:checkbox[name=check2]').is(':checked')
	})} , page : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");
	
	if($('input:checkbox[name=check1]').is(':checked')==false && $('input:checkbox[name=check2]').is(':checked')==false)
	{
		alert("하나이상 체크해 주십시오.");
	}
	else
	{
		$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
			"cmpg_id":obj010.CMPG_ID,
			"check1" : $('input:checkbox[name=check1]').is(':checked'),
			"check2" : $('input:checkbox[name=check2]').is(':checked')
		})} , page : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");
	}
}

// 캠페인 기본 > 캠페인 목록 삭제
function btnDelete_2_clickEvent()
{
	if(confirm("목록을 삭제하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/deleteCmpg.do",
			data : "pJson=" + getJsonStr("dXBkYXRl","Y20wMTAuZGVsZXRlWW4=", {
				"cmpg_id" : obj010.CMPG_ID
			}),
			success : function(data)
			{	
				alert("삭제되었습니다.");
				btnReset_2_clickEvent();
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 완료, 총, 배정, 미배정 건수
function select_cntEvent()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/selectCount.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l","Y20wMTIuc2VsZWN0Q250", {
			"cmpg_id" : obj010.CMPG_ID
		}),
		success : function(data)
		{	
			var num2 = data.ASGN_CNT;
			var nasgn_cnt = data.TOT_CNT - num2;
			
			stotCnt = data.TOT_CNT;
			nonAsign = nasgn_cnt;
			
			//$("#surveyAssign_4").html(data.CMPL_CNT+"/"+data.TOT_CNT);				//완료건수/총건수
			//$("#nonSurveyAssign_4").html(data.ASGN_CNT+"/"+nasgn_cnt);				//배정건수/미배정건수
			//$("#surveyAssign_5").html(data.CMPL_CNT+"/"+data.TOT_CNT);				//완료건수/총건수
			//$("#nonSurveyAssign_5").html(data.ASGN_CNT+"/"+nasgn_cnt);				//배정건수/미배정건수
			
			$("#surveyAssign_4").html(data.TOT_CNT);						//총대상건수		
			$("#surveyCnt_4").html(data.ASGN_CNT);							//배정건수
			if (data.ASGN_CNT > 0)
				$("#surveyCnt_4").css("color", "red");
			else
				$("#surveyCnt_4").css("color", "black");
			
			$("#nonSurveyAssign_4").html(nasgn_cnt);						//미배정건수
			if (nasgn_cnt > 0)
				$("#nonSurveyAssign_4").css("color", "blue");
			else
				$("#nonSurveyAssign_4").css("color", "black");
			
			$("#surveyAssign_5").html(data.TOT_CNT);						//총대상건수		
			$("#surveyCnt_5").html(data.ASGN_CNT);							//배정건수
			$("#nonSurveyAssign_5").html(nasgn_cnt)							//미배정건수
			;
			$("#surveyNmCnt_2").html(data.TOT_CNT);
			$("#tbl010").jqGrid('setCell', obj010RowId, 'TRGT_CUST_CNT', data.TOT_CNT);

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 상담사 배정, 회수 저장
function btnUpdate_5_clickEvent()
{
	if(beginning_event() == true) {
		var checkVal = $(':radio[name="celNo_5"]:checked').val();
		var totCnt = 0;
		var pList1 = [];
		var pList2 = [];
		
		gUpdcnt = 0;
		gRowLength = $("#tbl012").getGridParam("reccount");//대상자
		
		var tbl014Rows = $("#tbl014").getRowData();		//배정할 상담사
		
		for(var i = 0 ; i <= tbl014Rows.length; i++ ) {	
			if(jQuery.isEmptyObject(tbl014Rows[i]))
				continue;
			
			console.log(tbl014Rows[i]);
			
			// 배정/회수 상담사가 선택이 되어 있으면
			if (tbl014Rows[i].RD_YN != "0") {				
			
				//배정/회수건수 입력 시
				if(tbl014Rows[i].PROC_ST) {
					totCnt += parseInt(tbl014Rows[i].PROC_ST);
				}
			}
		}
		
		if (totCnt == "" || totCnt == "0") {
			alert("배정/회수 할 상담사를 선택하여 주십시오.");
			return;
		} 
			
		if(isNaN(totCnt)) {
			alert("숫자를 입력하고 엔터키를 눌러 주십시오.");
			return;
		}
		
		if(checkVal =="1")	//배정
		{
			if(totCnt <= nonAsign) {
				for(var i = 0 ; i <= tbl014Rows.length; i++ ) {
					if(jQuery.isEmptyObject(tbl014Rows[i]))
						continue;
					
					console.log(tbl014Rows[i]);
					
					if(tbl014Rows[i].PROC_ST) {
						pList1.push({
							"qt" : "aW5zZXJ0",
							"mi" : "Y20wMTIuaW5zZXJ0QXNzaWdu",
							"map":	{
								"cmpg_id" : obj010.CMPG_ID,
								"usr_id" : tbl014Rows[i].USR_ID,
								"asgn_cnt" : tbl014Rows[i].PROC_ST,
								"login_usr_id" : window.sessionStorage.getItem("USR_ID")
							}
						});
					}
				}
					
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/campaign/assignInsert.do",
					data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
					success : function(data)
					{			
						$("#tbl014").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0Q291bnNlbG9y", { 
							"cmpg_id":obj010.CMPG_ID,
							"cntr_cd" : window.sessionStorage.getItem("USR_GRD_CD") > "060000" ? "" : window.sessionStorage.getItem("CNTR_CD")
						})} , page : 1, sortname : "USR_NM", sortorder : "asc"}).trigger("reloadGrid");
						$("#tbl012").trigger('reloadGrid');
						
						// 대상 캠페인 정보 조회 (캠페인명, 기간, 유형, 총대상, 배정, 미배정 건수) 
						select_cntEvent();
						
						alert("배정되었습니다.");
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			} else {
				alert("배정건수를 확인바랍니다.");
			}
		} else {
			for(var i = 0 ; i <= tbl014Rows.length; i++ ) {	
				if(jQuery.isEmptyObject(tbl014Rows[i]))
					continue;
				
				console.log(tbl014Rows[i]);
				
				if(tbl014Rows[i].PROC_ST) {
					pList2.push({
						"qt" : "aW5zZXJ0",
						"mi" : "Y20wMTIuZGVsZXRlQXNzaWdu",
						"map":	{
							"cmpg_id" : obj010.CMPG_ID,
							"usr_id" : tbl014Rows[i].USR_ID,
							"asgn_cnt" : tbl014Rows[i].PROC_ST,
							"login_usr_id" : window.sessionStorage.getItem("USR_ID")
						}
					});	
				}
			}
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/campaign/assignDelete.do",
				data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList2),
				success : function(data)
				{			
					$("#tbl014").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0Q291bnNlbG9y", { 
						"cmpg_id":obj010.CMPG_ID,
						"cntr_cd" : window.sessionStorage.getItem("USR_GRD_CD") > "060000" ? "" : window.sessionStorage.getItem("CNTR_CD")
					})} , page : 1, sortname : "USR_NM", sortorder : "asc"}).trigger("reloadGrid");
					
					$("#tbl012").trigger("reloadGrid");
					
					select_cntEvent();
					
					alert("회수되었습니다.");
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
	}
	else
	{
		alert("해피콜을 선택해 주세요.");
	}
}

// 체크한 상담사에 자동 배정하기
function btnSearch_5_clickEvent()
{
	if(beginning_event() == true)
	{
		var totCnt = 0;
		var average = 0;
		var pList1 = [];
	
		gUpdcnt = 0;
		gRowLength = $("#tbl012").getGridParam("reccount");
	
		var tbl014Rows = $("#tbl014").getRowData();

		for(var i = 0 ; i <= tbl014Rows.length; i++ )
		{	
			if(jQuery.isEmptyObject(tbl014Rows[i]))
				continue;
		
			/*if(tbl014Rows[i].RD_YN == "1"){
				totCnt++;
			}*/
			if($("#jqg_tbl014_"+(i*1+1)).prop("checked")){
				totCnt++;
			}
		}
		//공통배분할 갯수
		average = parseInt(nonAsign / totCnt);
		//나머지
		var asignVal = nonAsign - (average * totCnt);
		
		for(var i = 0 ; i <= tbl014Rows.length; i++ )
		{	
			if(jQuery.isEmptyObject(tbl014Rows[i]))
				continue;

			//if(tbl014Rows[i].RD_YN == "1"){
			if($("#jqg_tbl014_"+(i*1+1)).prop("checked")){
				//console.log(tbl014Rows[i]);
				pList1.push({"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTIuaW5zZXJ0QXNzaWdu",
					"map":	{
						"cmpg_id" : obj010.CMPG_ID,
						"usr_id" : tbl014Rows[i].USR_ID,
						"asgn_cnt" : asignVal-- <= 0 ? average : average + 1,
						"login_usr_id" : window.sessionStorage.getItem("USR_ID")
				}});
			}
		}
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/assignInsert.do",
			data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
			success : function(data)
			{
				$("#tbl014").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0Q291bnNlbG9y", { 
					"cmpg_id":obj010.CMPG_ID,
					"cntr_cd" : window.sessionStorage.getItem("USR_GRD_CD") > "060000" ? "" : window.sessionStorage.getItem("CNTR_CD")
				})} , page : 1, sortname : "USR_NM", sortorder : "asc"}).trigger("reloadGrid");
				
				select_cntEvent();
				
				alert("배정되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	{
		alert("해피콜을 선택해 주세요.");
	}
}

// 캠페인 결과 조회 버튼
function btnSearch_6_clickEvent()
{
	var frDt = $("#selFrDate_6").val();
	var toDt = $("#selToDate_6").val();
	
	if(frDt != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if(toDt != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	$("#tbl010_1").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ1Jlc3VsdFNlbGVjdA==", { 
		"cmpg_nm":$("#cmpgNm_6").val(),
		"opt_srchtype" : $("#progressStatus_6").val(),
		"cmpg_type" : $("#cmpgtype_6").val(),
		"fr_dt" : frDt,
		"to_dt" : toDt
	})} , page : 1, sortname : "CMPG_NM", sortorder : "asc"}).trigger("reloadGrid");
	
	$("#cmpgStats").empty();
	
	$("#surveyName_6").html("");
	$("#surveyDay_6").html("");
	$("#cmpgType_6").html("");
	$("#surveyCnt_6").html("");
}

// 캠페인 결과 초기화 버튼
function btnReset_6_clickEvent()
{
	$("#cmpgStats").empty();
	
	$("#surveyName_6").html("");
	$("#surveyDay_6").html("");
	$("#cmpgType_6").html("");
	$("#surveyCnt_6").html("");
	
	$("#selFrDate_6").val("");
	$("#selToDate_6").val("");
	$("#cmpgNm_6").val("");
	$("#progressStatus_6").val("030000");
	$("#cmpgtype_6").val("all");
	
    $("#tbl010_1").trigger("reloadGrid");
}

//캠페인 대상자 조회 버튼 
function btnSearch_7_clickEvent()
{
	$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
		"cmpg_id":obj010.CMPG_ID,
	})} , page : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");
	
	select_cntEvent();
	
	$("#tbl010").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value" ,
		"fr_dt" : $("#selFrDate_1").val().replace(/-/gi, ""),
		"to_dt" : $("#selToDate_1").val().replace(/-/gi, ""),
		"cmpg_nm" : $("#cmpgNm_1").val(),
		"opt_srchtype" : $("#progressStatus_1").val(),
		"cmpg_type" : $("#cmpgtype_1").val(),
		"usr_id" : usrGrdCd=="010100"?window.sessionStorage.getItem("USR_ID"):"all",
		"usrGrdCd" : usrGrdCd
	})} , page : 1, sortname : "STRT_DT", sortorder : "desc"}).trigger("reloadGrid");
	
	$("#surveyNmCnt_2").html(stotCnt);
}

//캠페인 진행률 조회 버튼
function btnSearch_Sect5_clickEvent()
{
	var frDt = $("#selFrDate_Sect5").val();
	var toDt = $("#selToDate_Sect5").val();
	
	if(frDt != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if(toDt != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	$("#tbl015_1").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", { 
		"fr_dt" : frDt,
		"to_dt" : toDt,
		"cmpg_nm" : $("#cmpgNm_Sect5").val(),
		"usr_id" : $("#selAgent_Sect5").val(),
		"usrGrdCd" : usrGrdCd
	})} , page : 1, sortname : "STRT_DT", sortorder : "asc"}).trigger("reloadGrid");	
	
	$("#tbl015_2").jqGrid("clearGridData");
}

// 캠페인 진행률 초기화 버튼
function btnReset_Sect5_clickEvent()
{
	$("#selFrDate_Sect5").val(getDate());
	$("#selToDate_Sect5").val(getDate());
	$("#cmpgNm_Sect5").val("");
	$("#selAgent_Sect5").val("all");
	
    $("#tbl015_1").trigger("reloadGrid");
    $("#tbl015_2").jqGrid("clearGridData");
}

// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
function init_grid(pMap)
{
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	multiselect : pMap.multiselect,	   	
	   	rownumWidth : 30,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent]
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

function tbl010_SelectRow(rowid)
{
    obj010 = $("#tbl010").jqGrid('getRowData', rowid);

    $("#cmpgId_2").val(obj010.CMPG_ID);
    $("#cmpgtype_2").val(obj010.TYPE_CD);
    $("#surveyCnt_2").html(obj010.VLTN_CNT);
    $("#selFrDateC_2").val(obj010.STRT_DT);
    $("#selToDateC_2").val(obj010.END_DT);
    $("#survetName_2").val(obj010.CMPG_NM);
    $("#surveyArea_2").val(obj010.CMPG_DSC);
    $("#surveyNmCnt_2").html(obj010.TRGT_CUST_CNT);
    
    $("#surveyName_4").html(obj010.CMPG_NM);
    $("#surveyDay_4").html(obj010.STEND_DT);
    $("#cmpgType_4").html(obj010.CMPG_TYPE_CD);
    //$("#surveyCnt_4").html(obj010.VLTN_CNT);						//문항수
    select_cntEvent();
    
    $("#surveyName_5").html(obj010.CMPG_NM);
    $("#surveyDay_5").html(obj010.STEND_DT);
    $("#cmpgType_5").html(obj010.CMPG_TYPE_CD);
    //$("#surveyCnt_5").html(obj010.VLTN_CNT);						//문항수
   
	$("#btnUpdate_2").show();
	$("#btnDelete_2").show();
	$("#btnInsert_2").hide();
	$("#btnInsert_3").show();
	$("#btnReset_3").trigger("click");
	
    $("#selProcSt").val(obj010.PROC_ST_CD);

    $("#tbl011").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {"key" : "value" ,"cmpg_id" : obj010.CMPG_ID
	})} , page : 1, sortname : "QST_NO", sortorder : "desc"}).trigger("reloadGrid");

	$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {"key" : "value" , "cmpg_id": obj010.CMPG_ID,
	})} , page : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");

	$("#tbl014").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0Q291bnNlbG9y", { 
		"cmpg_id":obj010.CMPG_ID, "cntr_cd" : window.sessionStorage.getItem("USR_GRD_CD") > "060000" ? "" : window.sessionStorage.getItem("CNTR_CD")
	})} , page : 1, sortname : "USR_NM", sortorder : "asc"}).trigger("reloadGrid");
}

function init_Tbl012Tbl014() {
    $("#surveyName_4").empty();
    $("#surveyDay_4").empty();
    $("#cmpgType_4").empty();
    $("#surveyCnt_4").empty();
    $("#surveyAssign_4").empty();
    $("#nonSurveyAssign_4").empty();
    $("#tbl012").jqGrid("clearGridData");
    
    $("#surveyName_5").empty();
    $("#surveyDay_5").empty();
    $("#cmpgType_5").empty();
    $("#surveyCnt_5").empty();
    $("#surveyAssign_5").empty();
    $("#nonSurveyAssign_5").empty();
    $("#tbl014").jqGrid("clearGridData");
}

function tbl011_SelectRow(rowid)
{
	obj011 = $("#tbl011").jqGrid('getRowData', rowid);
	
	$("#btnInsert_3").hide();
	$("#btnUpdate_3").show();
	$("#btnDelete_3").show();
	
	$("#survey_3").val(obj011.QST_NM);
	$("#surveyType_3").val(obj011.QST_TYPE_CD);
	$("#surveyCnt_3").val(obj011.XAMP_SCNT);
	$("#surveyNum_3").val(obj011.QST_NO);
	
	console.log(parseInt(obj011.XAMP_SCNT));
	for(var i = 1; i <= parseInt(obj011.XAMP_SCNT); i++) {
		$("#survey_nm_" + i).val(obj011["XAMP" + i]);
		console.log(obj011["XAMP" + i]);
	}
	for(var i = parseInt(obj011.XAMP_SCNT) + 1; i <= 5; i++) {
		$("#survey_nm_" + i).val("");
	}
	
	surveyCnt_changeEvent();
} 


//상담사 배정 그리드 선택
function tbl014_SelectRow(id)
{
	var lastsel = "";
	
    obj014 = $("#tbl014").jqGrid('getRowData', id);
	
	if(id && id !== lastsel)
	{
		jQuery('#tbl014').jqGrid('restoreRow',lastsel);
		jQuery('#tbl014').jqGrid('editRow',id,true);
		lastsel=id;
	}	
	
	if(obj014.RD_YN == "0")
		$("#tbl014").jqGrid('setCell', id, 'RD_YN', '1');
	else
		$("#tbl014").jqGrid('setCell', id, 'RD_YN', '0');
}

function check_proc(event)
{
	if ((event.keyCode < 48) || (event.keyCode > 57))
		{event.returnValue = false;}
}

// 캠페인 결과 결과 표
function tbl010_1_SelectRow(rowid)
{
	obj010_1 = $("#tbl010_1").jqGrid('getRowData', rowid);
	
	$("#cmpgStats").empty();
	
	$("#surveyName_6").html(obj010_1.CMPG_NM);
	$("#surveyDay_6").html(obj010_1.STEND_DT);
	$("#cmpgType_6").html(obj010_1.CMPG_TYPE);
	$("#surveyCnt_6").html(obj010_1.VLTN_CNT);
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/cmpgAnswer.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==","Y20wMTEuc2VsZWN0Q3VzdENtcGc=",{
			"cmpg_id" : obj010_1.CMPG_ID,
			"isResult" : true
		}),
		success : function(data) {		
		    var value = "";
		    var percent = 0;
		    
			$.each(data, function(index, state) {
				if(++index != 1) {
					value += "<hr>";
				}
				value += "<br><label>" + state.QST_NO + "." + state.QST_NM + "</label><br><br>";
				value += "<table>";
				
				
				if(state.SHORTANS_CNT) {
					if(isNaN((state["SHORTANS_CNT"] / state["XAMP_TOT_CNT"]) * 100)) {	// 질문채택수/전체응답자수
						percent = 0;
					} else {
						percent = (state["SHORTANS_CNT"] / state["XAMP_TOT_CNT"]) * 100;
						percent = percent.toFixed(2);
					}
					
					value += "<tr style='height: 25px;'>";
					value += "<td style='width: 15%;'>&nbsp;&nbsp;&nbsp;&nbsp;1)&nbsp;&nbsp;" + state["XAMP1"] + "</td>";
					value += "<td style='width: 5%;'>|&nbsp;&nbsp;" + state["SHORTANS_CNT"] + "명</td>";
					value += "<td style='width: 40%;'>" + "<img alt='' src='/resources/images/popbtn_over_.png' height = '10px' width ='"+percent * 3.8 + "px'>&nbsp;&nbsp;" + percent + "%</td>";	//그래프
					value += "</tr>";
				} else {
					for(var i = 1; i <= state.XAMP_SCNT; i++) {
						if(isNaN((state["XAMP" + i + "_CNT"] / state["XAMP_TOT_CNT"]) * 100)) {	// 질문채택수/전체응답자수
							percent = 0;
						} else {
							percent = (state["XAMP" + i + "_CNT"] / state["XAMP_TOT_CNT"]) * 100;
							percent = percent.toFixed(2);
						}
						
						value += "<tr style='height: 25px;'>";
						value += "<td style='width: 15%;'>&nbsp;&nbsp;&nbsp;&nbsp;" + i + ")&nbsp;&nbsp;" + state["XAMP" + i] + "</td>";
						value += "<td style='width: 5%;'>|&nbsp;&nbsp;" + state["XAMP" + i + "_CNT"] + "명</td>";
						value += "<td style='width: 40%;'>" + "<img alt='' src='/resources/images/popbtn_over_.png' height = '10px' width ='"+percent * 3.8 + "px'>&nbsp;&nbsp;" + percent + "%</td>";	//그래프
						value += "</tr>";
					}
				}
				
				value += "</table><br>";
			});
			
			$("#cmpgStats").append(value);
			$("#cmpgStats").attr("disabled", false);	
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 캠페인 진행률 (상담사별 진행률)
function tbl015_1_SelectRow(rowid)
{
    obj015_1 = $("#tbl015_1").jqGrid('getRowData', rowid);
   
	$("#tbl015_2").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0FndFNlbGVjdExpc3Q=", {"key" : "value" ,
		"cmpg_id": obj015_1.CMPG_ID,	"usr_id": $("#selAgent_Sect5").val(),	"usrGrdCd" : usrGrdCd,
	})} , page : 1, sortname : "USR_NM", sortorder : "asc"}).trigger("reloadGrid");
}

// 캠페인 기본 > 캠페인 목록
function tbl010_init_grid()
{
	var strUsr_id = "";
	if (usrGrdCd == "010100") {
		strUsr_id = window.sessionStorage.getItem("USR_ID");  
	} else {
		strUsr_id = "all";
	}	
	
	pMap = {};
	pMap.tblId = "tbl010";
	pMap.url   = "/jqgrid/campaign/tbl010Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value" ,
		"fr_dt" : $("#selFrDate_1").val().replace(/-/gi, ""),
		"to_dt" : $("#selToDate_1").val().replace(/-/gi, ""),
		"cmpg_nm" : $("#cmpgNm_1").val(),
		"opt_srchtype" : $("#progressStatus_1").val(),
		"cmpg_type" : $("#cmpgtype_1").val(),
		"usr_id" : strUsr_id,
		"usrGrdCd" : usrGrdCd
	});
	pMap.colNames = ["해피콜명", "해피콜유형", "해피콜기간","대상자 수", "문항수", "진행상태", "해피콜아이디","CMPG_DSC","TYPE_CD","PROC_ST_CD","TYPE_CD","STRT_DT","END_DT"];
	pMap.colModel =
   	[
   	 	{ name : "CMPG_NM", index : "CMPG_NM", align : "center", width : 310 },
   	 	{ name : "CMPG_TYPE_CD", index : "CMPG_TYPE_CD", align : "center", width : 210 },
   	 	{ name : "STEND_DT", index : "STEND_DT", align : "center", width : 220 },
   	 	{ name : "TRGT_CUST_CNT" , index : "TRGT_CUST_CNT", align : "center", width : 103 },
   	 	{ name : "VLTN_CNT", index : "VLTN_CNT", align : "center", width : 103 },
   	 	{ name : "PROC_ST", index : "PROC_ST", align : "center", width : 160 },
   	 	{ name : "CMPG_ID", index : "CMPG_ID", hidden : true },
   	 	{ name : "CMPG_DSC", index : "CMPG_DSC", hidden : true },
   	 	{ name : "TYPE_CD", index : "TYPE_CD", hidden : true },
   	 	{ name : "PROC_ST_CD", index : "PROC_ST_CD", hidden : true },
   	 	{ name : "TYPE_CD", index : "TYPE_CD", hidden : true },
   	 	{ name : "STRT_DT" , index : "STRT_DT", hidden : true},
   	 	{ name : "END_DT" , index : "END_DT", hidden : true}
   	];
	pMap.rowNum = "10";
	pMap.sortname = "STRT_DT";
	pMap.width = "100%";
	pMap.height = "260";
	pMap.pager = "pg010";
	pMap.selectEvent = "tbl010_SelectRow";
	pMap.rowNumber = true;
	
	init_grid(pMap);
}

// 캠페인 문항 목록
function tbl011_init_grid()
{
	pMap = {};
	pMap.tblId = "tbl011";
	pMap.url   = "/jqgrid/campaign/tbl011Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {
		"cmpg_id" : "0"
	});
	pMap.colNames = ["번호", "답안유형","질문","답안수","질문순번","답안유형코드", "1번문항", "2번문항", "3번문항", "4번문항", "5번문항"];
	pMap.colModel =
   	[	
   	 	{ name : "QST_NO", index : "QST_NO", align : "center", width : 50 },
   	 	{ name : "QST_TYPE", index : "QST_TYPE", align : "center", width : 100 },
   	 	{ name : "QST_NM", index : "QST_NM", align : "left", width : 300 },
   	 	{ name : "XAMP_SCNT", index : "XAMP_SCNT", align : "center", width : 50 },
   	 	{ name : "QST_SEQ", index : "QST_SEQ", hidden : true },
   	 	{ name : "QST_TYPE_CD", index : "QST_TYPE_CD", hidden : true },
   	 	{ name : "XAMP1", index : "XAMP1", hidden : true },
   	 	{ name : "XAMP2", index : "XAMP2", hidden : true },
   	 	{ name : "XAMP3", index : "XAMP3", hidden : true },
   	 	{ name : "XAMP4", index : "XAMP4", hidden : true },
   	 	{ name : "XAMP5", index : "XAMP5", hidden : true }
   	];
	pMap.rowNum = "10";
	pMap.sortname = "QST_NO";
	pMap.width = "100%";
	pMap.height = "180";
	pMap.pager = "pg011";
	pMap.selectEvent = "tbl011_SelectRow";
	pMap.rowNumber = false;
	
	init_grid(pMap);
}

// 캠페인 대상자 목록
function tbl012_init_grid()
{
	pMap = {};
	pMap.tblId = "tbl012";
	pMap.url   = "/jqgrid/campaign/tbl012Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
		"cmpg_id" : obj010.CMPG_ID == null ? "0" : obj010.CMPG_ID,
		"check1"  : false,
	    "check2"  : true
	});
	pMap.colNames = ["선택", "고객명", "성별", "고객구분", "일반전화번호", "휴대전화번호", "진행상태", "배정여부", "해피콜고객순서", "고객ID", "해피콜번호", "진행상태코드"];
	pMap.colModel = [
	                { name : "TARGET_YN", index : "TARGET_YN", formatter : 'checkbox', editoptions : { value : "1:0", defaultVaule : "0" }, formatoptions : { disabled:false }, align : "center", width : 40, resizable: false, sortable : false,hidden:true},
	                { name : "CUST_NM", index : "CUST_NM", align : "center", width : 55 },
	                { name : "GNDR_NM", index : "GNDR_NM", align : "center", width : 55, hidden : true },
	                { name : "CUST_GB_NM", index : "CUST_GB_NM", align : "center", width : 55, hidden : true },
			   	 	{ name : "TEL", index : "TEL", align : "center", width : 100},
			   	 	{ name : "MOBILE", index : "MOBILE", align : "center", width : 100 },
			   	 	{ name : "PROC_ST_NM", index : "PROC_ST_NM", align : "center", width : 55 }, //진행상태
			   	 	{ name : "DIV_ST", index : "DIV_ST", align : "center", width : 55, formatter:fnStatusFormatter },	  //배정여부
			   	 	{ name : "CMPG_CUST_SEQ", index : "CMPG_CUST_SEQ", hidden : true },
			   	 	{ name : "CUST_ID", index : "CUST_ID", hidden : true },
			   	 	{ name : "CMPG_ID", index : "CMPG_ID", hidden : true },
			   	 	{ name : "PROC_ST_CD", index : "PROC_ST_CD", hidden : true }

   	];
	pMap.rowNum = "20";
	pMap.sortname = "CMPG_ID";
	pMap.width = "100%";
	pMap.height = "490";
	pMap.pager = "pg012";
	pMap.selectEvent = "";
	pMap.rowNumber = false;
	pMap.multiselect = true;
	
	init_grid(pMap);
}

// 상담사 배정 상담사 목록
function tbl014_init_grid()
{
	pMap = {};
	pMap.tblId = "tbl014";
	pMap.url   = "/jqgrid/campaign/tbl014Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0Q291bnNlbG9y", { "cntr_cd" : window.sessionStorage.getItem("USR_GRD_CD") > "060000" ? "" : window.sessionStorage.getItem("CNTR_CD")});
	pMap.colNames = ["선택", "상담사", "배정된건수", "완료건수", "미완료건수", "회수가능건수","배정/회수건수",""];
	pMap.colModel =
   	[
   	 	{ name : "RD_YN", index:"RD_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 30, resizable: false, sortable : false,hidden:true},
   	 	{ name : "USR_NM", index : "USR_NM", align : "center", width : 180},
   	 	{ name : "TOTAL_CNT", index : "TOTAL_CNT", align : "center", width : 180, 
   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
			    // rowObject 변수로 그리드 데이터에 접근
			    // ProjectCode값이 Momot라면 현재 Column부터 3칸을 셀병합하고 글자 정렬 가운데로 설정
   	 			//if (rowObject.ProjectCode == 'Momot' ) { return 'colspan=3 , style="text-align:center;"' }
			    if (rowObject.TOTAL_CNT > 0 ) { return 'style="color:blue;font-weight:bold"' }
			}
   	 	},
   	 	{ name : "COMPLETE_CNT", index : "COMPLETE_CNT", align : "center", width : 180},
   	 	{ name : "NON_COMPLETE_CNT", index : "NON_COMPLETE_CNT", align : "center", width : 190, 
   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
			    // rowObject 변수로 그리드 데이터에 접근
			    // ProjectCode값이 Momot라면 현재 Column부터 3칸을 셀병합하고 글자 정렬 가운데로 설정
			    if (rowObject.NON_COMPLETE_CNT > 0 ) { return 'style="color:red;font-weight:bold"' }
			}
   	 	},
   	 	{ name : "COLLECTIBLE_CNT", index : "COLLECTIBLE_CNT", align : "center", width : 190},
   	 	{ name : "PROC_ST", index : "PROC_ST", align : "center", width : 185,editable: true, editoptions:{size:"20",maxlength:"5"} },
   	 	{ name : "USR_ID", index : "USR_ID", hidden : true}
   	];
	pMap.rowNum = "20";
	pMap.sortname = "USR_NM";
	pMap.width = "100%";
	pMap.height = "540";
	pMap.pager = "pg014";
	pMap.selectEvent = "tbl014_SelectRow";
	pMap.rowNumber = false;
	pMap.multiselect = true;
	
	init_grid(pMap);
}

// 캠페인 결과 > 설문결과 목록
function tbl010_1_init_grid()
{
	pMap = {};
	pMap.tblId = "tbl010_1";
	pMap.url   = "/jqgrid/campaign/tbl010_1Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ1Jlc3VsdFNlbGVjdA==", {
		"key" : "value" ,
		"fr_dt" : $("#selFrDate_6").val().replace(/-/gi, ""),
		"to_dt" : $("#selToDate_6").val().replace(/-/gi, ""),		
		"opt_srchtype" : "030000" 				//진행상태(완료), $("#progressStatus_6").val()
	});
	pMap.colNames = ["해피콜명", "상태", "대상자", "응답자","", "", "",""];
	pMap.colModel =
   	[
   	 	{ name : "CMPG_NM", index : "CMPG_NM", align : "center", width : 280},
   	 	{ name : "PROC_ST", index : "PROC_ST", align : "center", width : 80},
   	 	{ name : "TRGT_CUST_CNT", index : "TRGT_CUST_CNT", align : "center", width : 50},
   	 	{ name : "COMCNT", index : "COMCNT", align : "center", width : 50},
   	 	{ name : "STEND_DT", index : "STEND_DT", hidden : true},
   	 	{ name : "CMPG_TYPE", index : "CMPG_TYPE", hidden : true},
   	 	{ name : "VLTN_CNT", index : "VLTN_CNT", hidden : true},
   	 	{ name : "CMPG_ID", index : "CMPG_ID", hidden : true}
   	];
	pMap.rowNum = "10";
	pMap.sortname = "CMPG_NM";
	pMap.width = "100%";
	pMap.height = "580";
	pMap.pager = "pg010_1";
	pMap.selectEvent = "tbl010_1_SelectRow";
	pMap.rowNumber = false;
	
	init_grid(pMap);
}

//캠페인 진행률 > 전체 진행률
function tbl015_1_init_grid()
{
	var strUsr_id = "";
	if (usrGrdCd == "010100") {
		strUsr_id = window.sessionStorage.getItem("USR_ID");  
	} else {
		strUsr_id = "all";
	}
	
	pMap = {};
	pMap.tblId = "tbl015_1";
	pMap.url   = "/jqgrid/campaign/tbl015_1Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value" ,
		//"progressCmpn" : true,
		"fr_dt" : $("#selFrDate_Sect5").val().replace(/-/gi, ""),
		"to_dt" : $("#selToDate_Sect5").val().replace(/-/gi, ""),
		"cmpg_nm" : $("#cmpgNm_Sect5").val(),
		"usr_id" : strUsr_id,
		"usrGrdCd" : usrGrdCd
	});
	pMap.colNames = ["해피콜명", "진행상태", "대상자건수", "배정건수", "미배정건수", "담당배정건수", "완료건수", "미완료건수","진행률","해피콜아이디"];
	pMap.colModel =
   	[
   	 	{ name : "CMPG_NM", index : "CMPG_NM", align : "center", width : 293 },
   	 	{ name : "PROC_ST", index : "PROC_ST", align : "center", width : 100 },
   	 	{ name : "TRGT_CUST_CNT", index : "TRGT_CUST_CNT", align : "center", width : 100 },
   	 	{ name : "DIVCNT", index : "DIVCNT", align : "center", width : 100 },
   		{ name : "NONDIVCNT", index : "NONDIVCNT", align : "center", width : 100 },
   	 	{ name : "TOTCNT", index : "TOTCNT",  align : "center", width : 100 },
   	 	{ name : "COPCNT", index : "COPCNT",  align : "center", width : 100 },
   	 	{ name : "NONCOPCNT", index : "NONCOPCNT",  align : "center", width : 100 },
   	 	{ name : "PROGRESS", index : "PROGRESS",  align : "center", width : 100 },
   	 	{ name : "CMPG_ID", index : "CMPG_ID", hidden : true },
   	];
	pMap.rowNum = "10";
	pMap.sortname = "STRT_DT";
	pMap.width = "100%";
	pMap.height = "200";
	pMap.pager = "pg015_1";
	pMap.selectEvent = "tbl015_1_SelectRow";
	pMap.rowNumber = true;	
	
	init_grid(pMap);
}

//캠페인 진행률 > 상담사별 진행률
function tbl015_2_init_grid()
{
	pMap = {};
	pMap.tblId = "tbl015_2";
	pMap.url   = "/jqgrid/campaign/tbl015_2Grid.do";
	//pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0FndFNlbGVjdExpc3Q=", {
		//"key" : "value" ,
		//"usr_id" : g_usrId,
		//"usrGrdCd" : usrGrdCd,
		//"cmpgid" : tbl015Rows[i].CMPG_ID
	//});
	pMap.colNames = ["상담사", "대상자건수", "배정건수", "미배정건수", "완료건수", "미완료건수", "진행률", "상담사ID"],
	pMap.colModel =
   	[
		{ name : "USR_NM", index : "USR_NM", align : "center", width : "328"},
		{ name : "TOTCNT", index : "TOTCNT", align : "center", width : "135" },
		{ name : "DIVCNT", index : "DIVCNT", align : "center", width : "135" },
		{ name : "NONDIVCNT", index : "NONDIVCNT", align : "center", width : "135", 
	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
			    // rowObject 변수로 그리드 데이터에 접근
			    // ProjectCode값이 Momot라면 현재 Column부터 3칸을 셀병합하고 글자 정렬 가운데로 설정
			    if (rowObject.NONDIVCNT > 0 ) { return 'style="color:blue;font-weight:bold"' }
			}	
		},
		{ name : "COPCNT", index : "COPCNT", align : "center", width : "135" },
		{ name : "NONCOPCNT", index : "NONCOPCNT", align : "center", width : "135",  
	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
			    // rowObject 변수로 그리드 데이터에 접근
			    // ProjectCode값이 Momot라면 현재 Column부터 3칸을 셀병합하고 글자 정렬 가운데로 설정
			    if (rowObject.NONCOPCNT > 0 ) { return 'style="color:red;font-weight:bold"' }
			}	
		},
		{ name : "PROGRESS", index : "PROGRESS", align : "center", width : "135"},
		{ name : "USR_ID", index : "USR_ID", hidden : true }
   	];
	pMap.rowNum = "10";
	pMap.sortname = "USR_NM";
	pMap.width = "100%";
	pMap.height = "280";
	pMap.pager = "pg015_2";
	//pMap.selectEvent = "tbl015_2_SelectRow";
	pMap.rowNumber = false;
	
	init_grid(pMap);
}

//엑셀 다운 버튼 클릭 이벤트
function btnCmpnExcelDown_clickEvent()
{
	if(obj010_1.CMPG_ID !== undefined)
	{	
		//excelDownLoad(getContextPath() + "/excel/campaign/cmpnCheckList.do", getJsonStrCmpnCheckListExcel());		
		pList = [];
		
		// 캠페인 정보 셀렉트
		pList.push({"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y20wMTAuZXhjZWxDbXBnQmFzaWM=",/*cm010.excelCmpgBasic 파라미터 존재*/
			"map":	{
				"cmpg_id" : obj010_1.CMPG_ID
		}});
		
		// 질문 문항 정보 셀렉트
		pList.push({"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y20wMTEuZXhjZWxTZWxlY3RDdXN0Q21wZw==",/*cm011.excelSelectCustCmpg 파라미터 존재*/
			"map":	{
				"cmpg_id" : obj010_1.CMPG_ID
		}});
		
		// 주관식 정보 셀렉트
		pList.push({"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y20wMTUuc2VsZWN0U2hvcnRBbnM=",/*cm015.selectShortAns 파라미터 존재*/
			"map":	{
				"cmpg_id" : obj010_1.CMPG_ID
				, "qst_type_cd" : "1002"
		}});
		
		// 대상 정보 셀렉트
		pList.push({"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y20wMTIuZXhjZWxTZWxlY3RMaXN0",/*cm012.excelSelectList*/
			"map":	{
				"cmpg_id" : obj010_1.CMPG_ID,
				"chkCmpl" : true,
				"chkNotCmpl" : true,
		}});
		
		// 질문 답변 정보 셀렉트
		pList.push({"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y20wMTUuc2VsZWN0U2hvcnRBbnM=",/*cm015.selectShortAns*/
			"map":	{
				"cmpg_id" : obj010_1.CMPG_ID,
		}});
		
		excelDownLoad(getContextPath() + "/excel/campagin/campaginExcelDown.do", getJsonStr("YmF0Y2g=", null, pList));
	}
	else
	{
		alert("엑셀파일로 다운로드할 설문을 선택해주세요.");
	}
}

//상담사 컨트롤 셋팅
function setSelectBoxWithUser()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data)
		{
			$("#selAgent_Sect5").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});			
	
			$("#selAgent_Sect5").append(value);
			$("#selAgent_Sect5").trigger("change");
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function initControl()
{	
	datePicker("#selFrDate_1");
	datePicker("#selToDate_1");
	datePicker("#selFrDateC_2");
	datePicker("#selToDateC_2");
	datePicker("#selFrDate_6");
	datePicker("#selToDate_6");
	
	//캠페인 진행률
	datePicker("#selFrDate_Sect5");
	datePicker("#selToDate_Sect5");
	
	$("#selFrDate_1").val(getDate());
	$("#selToDate_1").val(getDate());
	$("#selFrDateC_2").val(getDate());
	$("#selToDateC_2").val(getDate());
	$("#selFrDate_6").val(getDate());
	$("#selToDate_6").val(getDate());

	//캠페인 진행률
	$("#selFrDate_Sect5").val(getDate());
	$("#selToDate_Sect5").val(getDate());
	
}

function initEvent()
{
    $("#btnReset_1").bind("click", btnReset_1_clickEvent);
    $("#btnSearch_1").bind("click", btnSearch_1_clickEvent);
    $("#btnInsert_3").bind("click", btnInsert_3_clickEvent);
    $("#btnDelete_3").bind("click", btnDelete_3_clickEvent);
    $("#btnUpdate_3").bind("click", btnUpdate_3_clickEvent);
    $("#btnReset_3").bind("click", btnReset_3_clickEvent);
    $("#surveyCnt_3").bind("change", surveyCnt_changeEvent);
    $("#btnExelDown_4").bind("click", btnExelDown_clickEvent);
    $("#btnExelInsert_4").bind("click", btnExelInsert_clickEvent);
    $("#btnInsert_2").bind("click", btnInsert_2_clickEvent);
    $("#btnReset_2").bind("click", btnReset_2_clickEvent);
    $("#btnCusInsert_4").bind("click", btnCusInsert_4_clickEvent);
    
    $("#btnCousInsert_4").bind("click", btnCousInsert_4_clickEvent); // 대상자 생성하기(상담이력)
    $("#btnCousDelete_4").bind("click", btnCousDelete_4_clickEvent);
    $("#tbl012_TARGET_YN").bind("click", -1 , authYn_clickEvent1);
    $("#tbl014_RD_YN").bind("click", -1 , authYn_clickEvent2);
    $("#btnSearch_4").bind("click", btnSearch_4_clickEvent);
    $("#btnInit_4").bind("click", btnInit_4_clickEvent);
    $("#btnUpdate_5").bind("click", btnUpdate_5_clickEvent);
    $("#btnDelete_2").bind("click", btnDelete_2_clickEvent);
    $("#btnSearch_5").bind("click", btnSearch_5_clickEvent);
    $("#btnUpdate_2").bind("click", btnUpdate_2_clickEvent);
    $("#btnSearch_6").bind("click", btnSearch_6_clickEvent);
    $("#btnReset_6").bind("click", btnReset_6_clickEvent);
    
    //캠페인 진행률
    $("#btnSearch_Sect5").bind("click", btnSearch_Sect5_clickEvent);
    $("#btnReset_Sect5").bind("click", btnReset_Sect5_clickEvent);
           
    //검색키워드 엔터로 조회
    $("#cmpgNm_1").on("keydown", function(e) {
    	if(e.keyCode == 13) btnSearch_1_clickEvent();
    });
    $("#province_4, #corpNm_4, #surveyCus_4, #telNo_4, #hTel_4, #tfCustNm, #tfTel").on("keydown", function(e) {
    	if(e.keyCode == 13) btnSearch_4_clickEvent();
    });
    $("#cmpgNm_6").on("keydown", function(e) {
    	if(e.keyCode == 13) btnSearch_6_clickEvent();
    });
    
    //캠페인기본, 캠페인결과 날짜 동기화
	$("#selFrDate_1").on("change", function() {
		$("#selFrDate_6").val($(this).val());
	});
	$("#selToDate_1").on("change", function() {
		$("#selToDate_6").val($(this).val());
	});
	$("#selFrDate_6").on("chanage", function() {
		$("#selFrDate_1").val($(this).val());
	});
	$("#selToDate_6").on("change", function() {
		$("#selToDate_1").val($(this).val());
	});
	
	//분배 상담사 검색 조건
	$("#selDivAct").on("change", function(event) {
		if(event.target.value === "div") {
			$(".counselor").show();
		} else {	//nondiv or all
			$(".counselor").hide();
		}
	})
	
	
	//주관식 선택 시 이벤트
	$("#surveyType_3").on("change", function(event) {
		//모든 문항 삭제
		for(var i = 1; i <= 5; i++) {
			$("#survey_nm_" + i).val("");
		}
		
		if(event.target.value == "1002") {//선택 타입이 주관식일시
			$("#surveyCnt_3").val("1").trigger("change").prop("readonly", true);
		} else {
			$("#surveyCnt_3").val("").trigger("change").prop("readonly", false);
			
		}
		
	});
	
	
	setPhoneNumFormat("tfTel");
    
    
    // 엑셀 다운 버튼 클릭 이벤트
    $("#btnCmpnExcelDown").bind("click", btnCmpnExcelDown_clickEvent);
    
    var cmtabs = $("#pop_body").tabs();
    cmtabs.tabs({
		  activate:function (event, ui){
			  var id = ui.newPanel.attr('id');
			  initTabs(id);	
		  }
	});
    initTabs("sect1");
    
    var pntabs =$("#ctnt2").tabs();
    pntabs.tabs({
		  activate:function (event, ui){
			  var id = ui.newPanel.attr('id');
			  initTabs(id);	
		  }
	});
    initTabs("sect11");
    
}

function initTabs(id){  
		switch(id){
		case "sect1":
			if(isinitsect1 == false){ tbl010_init_grid(); isinitsect1=true;}
			break;
		case "sect2":
			if(isinitsect2 == false){ tbl012_init_grid(); isinitsect2=true;}
			break;
		case "sect3":
			if(isinitsect3 == false){ tbl014_init_grid(); isinitsect3=true;}
			break;
		case "sect4":
			if(isinitsect4 == false){ tbl010_1_init_grid(); isinitsect4=true;}
			break;
		case "sect5":
			if(isinitsect5 == false){ tbl015_1_init_grid();	tbl015_2_init_grid(); setSelectBoxWithUser(); isinitsect5=true;}
			break;
		case "sect11":
			if(isinitsect11 == false){isinitsect11=true;}
			break;
		case "sect12":
			if(isinitsect12 == false){ tbl011_init_grid(); isinitsect12=true;}
			break;
		}
	}
function initData()
{
    setSelectBoxWithCode("progressStatus_1","전체","90023", "CHILD", "","all");
	setSelectBoxWithCode("cmpgtype_1","전체","90115", "CHILD", "","all");
	setSelectBoxWithCode("cmpgtype_2","","90115", "CHILD", "","all");
	setSelectBoxWithCode("surveyType_3","","90117", "CHILD", "","");
//	setRadioBoxWithCode("radioBox","90023", "", "","");
	
	setSelectBoxWithCode("selProcSt", "", "90023", "CHILD", "");
	
	setSelectBoxWithCode("progressStatus_6","전체","90023", "CHILD", "","030000");
	setSelectBoxWithCode("cmpgtype_6","전체","90115", "CHILD", "", "all");
	
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	
	$("#btnUpdate_3").hide();
	$("#btnDelete_3").hide();
	
	btnReset_2_clickEvent();
	
	$("#cmpgtype_2").val("1");
	$("#selProcSt").val("010000");
	
	//캠페인 진행률 상담사 컨트롤 셋팅
	//setSelectBoxWithUser();
}

$(function()
{
	initControl();
	initEvent();
	initData();
	
	$("#tbl012").jqGrid("setGridWidth", "1170");
});