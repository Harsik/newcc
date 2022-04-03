var obj010 = {};
var obj011 = {};
var obj014 = {};

var nonAsign;
var totCnt;
var stotCnt = 0;

var obj010RowId;

// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
function init_grid(pMap) {
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
	   	autowidth : false,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

function tbl010_init_grid() { 		
	// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
	pMap = {};
	pMap.tblId = "tbl010";
	pMap.url   = "/jqgrid/campaign/tbl010Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {"key" : "value" ,
		"cmpg_id": ""
	});
	pMap.colNames = ["설문명", "설문유형", "설문기간","대상자 수", "문항수", "진행상태", "캠페인아이디","","","","","",""];
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
	pMap.height = "258";
	pMap.pager = "pg010";
	pMap.selectEvent = "tbl010_SelectRow";
	pMap.rowNumber = true;
	
	init_grid(pMap);

}

function tbl011_init_grid() { 		
	// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
	pMap = {};
	pMap.tblId = "tbl011";
	pMap.url   = "/jqgrid/campaign/tbl011Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {
		"cmpg_id" : "0"
	});
	pMap.colNames = ["번호", "답안유형","설문","답안수","질문순번","답안코드"];
	pMap.colModel =
   	[	
   	 	{ name : "QST_NO", index : "QST_NO", align : "center", width : 50 },
   	 	{ name : "QST_TYPE", index : "QST_TYPE", align : "center", width : 100 },
   	 	{ name : "QST_NM", index : "QST_NM", align : "center", width : 300 },
   	 	{ name : "ANS_CNT", index : "ANS_CNT", align : "center", width : 50 },
   	 	{ name : "QST_SEQ", index : "QST_SEQ", hidden : true },
   	 	{ name : "QST_TYPE_CD", index : "QST_TYPE_CD", hidden : true }
   	];
	pMap.rowNum = "10";
	pMap.sortname = "QST_NO";
	pMap.width = "100%";
	pMap.height = "160"; 
	pMap.pager = "pg011";
	pMap.selectEvent = "tbl011_SelectRow";
	pMap.rowNumber = false;
	
	init_grid(pMap);
}

function tbl010_SelectRow(rowid) {
	
    obj010 = $("#tbl010").jqGrid('getRowData', rowid);

    $("#cmpgId_2").val(obj010.CMPG_ID);
    $("#cmpgtype_2").val(obj010.TYPE_CD);
    $("#surveyCnt_2").val(obj010.VLTN_CNT);
    $("#selFrDate_2").val(obj010.STRT_DT);
    $("#selToDate_2").val(obj010.END_DT);
    $("#survetName_2").val(obj010.CMPG_NM);
    $("#surveyArea_2").val(obj010.CMPG_DSC);
    $("#surveyNmCnt_2").html(obj010.TRGT_CUST_CNT);
    
    $("#surveyName_4").html(obj010.CMPG_NM);
    $("#surveyDay_4").html(obj010.STEND_DT);
    $("#cmpgType_4").html(obj010.CMPG_TYPE_CD);
    $("#surveyCnt_4").html(obj010.VLTN_CNT);
    select_cntEvent();
    
    $("#surveyName_5").html(obj010.CMPG_NM);
    $("#surveyDay_5").html(obj010.STEND_DT);
    $("#cmpgType_5").html(obj010.CMPG_TYPE_CD);
    $("#surveyCnt_5").html(obj010.VLTN_CNT);
   
	$("#btnUpdate_2").show();
	$("#btnDelete_2").show();
	$("#btnInsert_2").hide();
	$("#btnInsert_3").show();
	
    $("input:radio[name='90023']:input[value=" + obj010.PROC_ST_CD + "]").prop("checked", true);

    $("#tbl011").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {"key" : "value" ,
		"cmpg_id" : obj010.CMPG_ID
	})} , page : 1, sortname : "QST_NO", sortorder : "desc"}).trigger("reloadGrid");

	$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
		"cmpg_id":obj010.CMPG_ID,
		"check1" : $('input:checkbox[name=check1]').is(':checked'),
		"check2" : $('input:checkbox[name=check2]').is(':checked')
		
	})} , page : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");

	$("#tbl014").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTQuc2VsZWN0", { 
		"cmpg_id":obj010.CMPG_ID
	})} , page : 1, sortname : "USR_NM", sortorder : "asc"}).trigger("reloadGrid");
}

function tbl011_SelectRow(rowid) {	
	obj011 = $("#tbl011").jqGrid('getRowData', rowid);
	
	$("#btnInsert_3").hide();
	$("#btnUpdate_3").show();
	$("#btnDelete_3").show();

	$("#survey_3").val(obj011.QST_NM);
	$("#surveyType_3").val(obj011.QST_TYPE_CD);
	$("#surveyCnt_3").val(obj011.ANS_CNT);
	$("#surveyNum_3").val(obj011.QST_NO);
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/cmpgAnswer.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==","Y20wMTUuc2VsZWN0Mg==",{
			"qst_seq" : obj011.QST_SEQ
		}),
		success : function(data)
		{		
			var cnt = 0;
			
			$.each(data, function(key, state) {
				cnt++;
//				$("#survey_nm_" + cnt).val("");
				$("#survey_nm_" + cnt).val(state.ANS_NM);
				
			});
//			cnt++;
			for(cnt++; cnt <= 5; cnt++) {
				$("#survey_nm_" + cnt).val("");
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
		
	surveyCnt_changeEvent();		
} 

function select_cntEvent(){
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
			
			stotCnt=data.TOT_CNT;
			
			nonAsign = nasgn_cnt;
			
			$("#surveyAssign_4").html(data.CMPL_CNT+"/"+data.TOT_CNT);
			$("#nonSurveyAssign_4").html(data.ASGN_CNT+"/"+nasgn_cnt);
			$("#surveyAssign_5").html(data.CMPL_CNT+"/"+data.TOT_CNT);
			$("#nonSurveyAssign_5").html(data.ASGN_CNT+"/"+nasgn_cnt);
			$("#surveyNmCnt_2").html(data.TOT_CNT);
			$("#tbl010").jqGrid('setCell', obj010RowId, 'TRGT_CUST_CNT', data.TOT_CNT);
			

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function btnSearch_1_clickEvent()
{
	var frDt = $("#selFrDate_1").val();
	var toDt = $("#selToDate_1").val();
	var cmpgNm = $("#cmpgNm_1").val();
	var	optSrchtype = $("#progressStatus_1").val();
	var	cmpgtype = $("#cmpgtype_1").val();
	
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();
	
	$("#cmpgId_2").val("");
	$("#cmpgtype_2").val("");
	$("#selFrDate_2").val("");
	$("#selToDate_2").val("");
	$("#surveyCnt_2").val("");
	$("#surveyNmCnt_2").html("");
	$("#survetName_2").val("");
	
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
		"cmpg_type" : cmpgtype
	})} , page : 1, sortname : "STRT_DT", sortorder : "desc"});
	$("#tbl010").trigger("reloadGrid");
	
	obj010 = {};
	obj011 = {};
	obj014 = {};
	nonAsign = "";
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
	$("#cmpgtype_2").val("");
	$("#selFrDate_2").val("");
	$("#selToDate_2").val("");
	$("#surveyCnt_2").val("");
	$("#surveyNmCnt_2").html("");
	$("#survetName_2").val("");	
}

function btnInsert_2_clickEvent(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/insertSurvey.do",
		data : "pJson=" + getJsonStr("aW5zZXJ0","Y20wMTAuaW5zZXJ0",{
			 "cmpg_nm" : $("#survetName_2").val(),
			 "cmpg_dsc" : $("#surveyArea_2").val(),
			 "cmpg_type_cd" : $("#cmpgtype_2").val(),
			 "cmpg_rsch_cd" : "전화",
			 "cntr_cd" : "",
			 "team_cd" : "",
			 "grtn" : "",
			 "clsn" : "",
			 "vltn_cnt" : $("#surveyCnt_2").val(),
			 "trgt_cust_cnt" : $("#surveyNmCnt_2").html(),
			 "proc_st" : $(':radio[name="90023"]:checked').val(),
			 "strt_dt" : $("#selFrDate_2").val().replace(/[-, :]/g,""),
			 "end_dt" :  $("#selToDate_2").val().replace(/[-, :]/g,""),
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

function btnUpdate_2_clickEvent(){
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
			 "vltn_cnt" : $("#surveyCnt_2").val(),
			 "trgt_cust_cnt" : $("#surveyNmCnt_2").html(),
			 "proc_st" : $(':radio[name="90023"]:checked').val(),
			 "strt_dt" : $("#selFrDate_2").val().replace(/[-, :]/g,""),
			 "end_dt" :  $("#selToDate_2").val().replace(/[-, :]/g,""),
			 "use_yn" : "Y",
			 "login_usr_id" : window.sessionStorage.getItem("USR_ID"),
			 "cmpg_id" : obj010.CMPG_ID
		}),
			
		success : function(data)
		{				
			alert("저장되었습니다");
			$("#tbl010").trigger("reloadGrid");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});	
}

function btnReset_2_clickEvent(){
	$("#tbl010").trigger("reloadGrid");
	
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();
	
	$("#cmpgId_2").val("");
	$("#cmpgtype_2").val("");
	$("#selFrDate_2").val("");
	$("#selToDate_2").val("");
	$("#surveyCnt_2").val("");
	$("#surveyNmCnt_2").html("");
	$("#survetName_2").val("");
	$("#surveyArea_2").val("");
}

function btnDelete_2_clickEvent(){
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

function btnInsert_3_clickEvent() {
	if($("#survey_3").val() == null || $("#survey_3").val() == ""){
		alert("설문명을 입력해 주세요.");
	}else if($("#surveyNum_3").val() == null || $("#surveyNum_3").val() == ""){
		alert("문항번호를 입력해 주세요.");
	}else if($("#surveyType_3").val() == null || $("#surveyType_3").val() == ""){
		alert("질문유형을 선택해 주세요.");
	}
	else{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/selectNextval.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y20wMTEubmV4dHZhbA==",{}),
			success : function(data)
			{		
				//var qst_seq = data[0].NEXTVAL;
				var pList = [];
				var qst_seq = String(data.NEXTVAL);
				var ansCnt = 0;
				
				
				
				pList.push({"qt" : "ZGVsZXRl",
					"mi" : "Y20wMTUuZGVsZXRlTGlzdA==",
					"map" : {
						"qst_seq" : obj011.QST_SEQ
					}});
		
				if ($("#survey_nm_1").val() !== null && $("#survey_nm_1").val() !== "") {
					ansCnt++;
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "Y20wMTUuaW5zZXJ0",
						"map" : {
							"qst_seq" : data.NEXTVAL,
							"ans_no" : ansCnt,
							"ans_nm" : $("#survey_nm_1").val()
						}});  // cm015.insert
				}
				if ($("#survey_nm_2").val() !== null && $("#survey_nm_2").val() !== "") {
					ansCnt++;
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "Y20wMTUuaW5zZXJ0",
						"map" : {
							"qst_seq" : data.NEXTVAL,
							"ans_no" : ansCnt,
							"ans_nm" : $("#survey_nm_2").val()
						}});  // cm015.insert
				}
				if ($("#survey_nm_3").val() !== null && $("#survey_nm_3").val() !== "") {
					ansCnt++;
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "Y20wMTUuaW5zZXJ0",
						"map" : {
							"qst_seq" : data.NEXTVAL,
							"ans_no" : ansCnt,
							"ans_nm" : $("#survey_nm_3").val()
						}});  // cm015.insert
				}
				if ($("#survey_nm_4").val() !== null && $("#survey_nm_4").val() !== "") {
					ansCnt++;
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "Y20wMTUuaW5zZXJ0",
						"map" : {
							"qst_seq" : data.NEXTVAL,
							"ans_no" : ansCnt,
							"ans_nm" : $("#survey_nm_4").val()
						}});  // cm015.insert
				}
				if ($("#survey_nm_5").val() !== null && $("#survey_nm_5").val() !== "") {
					ansCnt++;
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "Y20wMTUuaW5zZXJ0",
						"map" : {
							"qst_seq" : data.NEXTVAL,
							"ans_no" : ansCnt,
							"ans_nm" : $("#survey_nm_5").val()
						}});  // cm015.insert
				}
				pList.unshift({"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTEuaW5zZXJ0",
					"map" : {
						"qst_seq" : data.NEXTVAL,
						"ans_cnt" : ansCnt,
						"qst_no" : $("#surveyNum_3").val(),
						"cmpg_id" : obj010.CMPG_ID,
						"qst_nm" : $("#survey_3").val(),
						"qst_type_cd" : $("#surveyType_3").val()
		
				}});  // cm011.insert
				
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/campaign/insertSurvey.do",
					data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
						
					success : function(data)
					{				
						
						$("#tbl011").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {"key" : "value" ,
								"cmpg_id" : obj010.CMPG_ID
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
						alert("추가되었습니다.");
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
}

function btnUpdate_3_clickEvent(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/selectNextval.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y20wMTEubmV4dHZhbA==",{}),
		success : function(data)
		{
			var pList = [];
			var ansCnt = 0;
			
			pList.push({"qt" : "ZGVsZXRl",
				"mi" : "Y20wMTUuZGVsZXRlTGlzdA==",
				"map" : {
					"qst_seq" : obj011.QST_SEQ
				}});

			if ($("#survey_nm_1").val() != null && $("#survey_nm_1").val() != "") {
				ansCnt++;
				pList.push({"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map" : {
						"qst_seq" : obj011.QST_SEQ,
						"ans_no" : ansCnt,
						"ans_nm" : $("#survey_nm_1").val()
					}});  // cm015.insert
			}
			if ($("#survey_nm_2").val() != null && $("#survey_nm_2").val() != "") {
				ansCnt++;
				pList.push({"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map" : {
						"qst_seq" : obj011.QST_SEQ,
						"ans_no" : ansCnt,
						"ans_nm" : $("#survey_nm_2").val()
					}});  // cm015.insert
			}
			if ($("#survey_nm_3").val() != null && $("#survey_nm_3").val() != "") {
				ansCnt++;
				pList.push({"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map" : {
						"qst_seq" : obj011.QST_SEQ,
						"ans_no" : ansCnt,
						"ans_nm" : $("#survey_nm_3").val()
					}});  // cm015.insert
			}
			if ($("#survey_nm_4").val() != null && $("#survey_nm_4").val() != "") {
				ansCnt++;
				pList.push({"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map" : {
						"qst_seq" : obj011.QST_SEQ,
						"ans_no" : ansCnt,
						"ans_nm" : $("#survey_nm_4").val()
					}});  // cm015.insert
			}
			if ($("#survey_nm_5").val() != null && $("#survey_nm_5").val() != "") {
				ansCnt++;
				pList.push({"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map" : {
						"qst_seq" : obj011.QST_SEQ,
						"ans_no" : ansCnt,
						"ans_nm" : $("#survey_nm_5").val()
						
					}});  // cm015.insert
			}
			pList.unshift({"qt" : "dXBkYXRl",
				"mi" : "Y20wMTEudXBkYXRl",
				"map" : {
					"qst_seq" : obj011.QST_SEQ,
					"ans_cnt" : ansCnt,
					"qst_no" : $("#surveyNum_3").val(),
					"cmpg_id" : obj010.CMPG_ID,
					"qst_nm" : $("#survey_3").val(),
					"qst_type_cd" : $("#surveyType_3").val()
					//"ans_cnt" : $("#surveyCnt_3").val()

			}});  // cm011.insert
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/campaign/insertSurvey.do",
				data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
				success : function(data)
				{			
					$("#tbl011").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {"key" : "value" ,
							"cmpg_id" : obj010.CMPG_ID
						})} , page : 1, sortname : "QST_NO", sortorder : "desc"}).trigger("reloadGrid");
					alert("수정되었습니다");
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

function btnReset_3_clickEvent()
{
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
}

function btnDelete_3_clickEvent(){
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
		
			$("#tbl011").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuY21wZ0Jhc2lj", {"key" : "value" ,
					"cmpg_id" : obj010.CMPG_ID
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

function surveyCnt_changeEvent() {
	var checkCnt = $("#surveyCnt_3").val();
	
	$("#survey_nm_1").prop("readonly", false);
	$("#survey_nm_2").prop("readonly", false);
	$("#survey_nm_3").prop("readonly", false);
	$("#survey_nm_4").prop("readonly", false);
	$("#survey_nm_5").prop("readonly", false);

	if(checkCnt !=null && checkCnt !=""){
		for(checkCnt++; checkCnt <= 5; checkCnt++) {
			$("#survey_nm_"+checkCnt).prop("readonly", true);
		}
	}else{
		$("#survey_nm_1").prop("readonly", true);
		$("#survey_nm_2").prop("readonly", true);
		$("#survey_nm_3").prop("readonly", true);
		$("#survey_nm_4").prop("readonly", true);
		$("#survey_nm_5").prop("readonly", true);
	}
}

function initControlTab() {

	$("#tabs2").gbTabs("#ctnt2");
	
	datePicker("#selFrDate_1");
	datePicker("#selToDate_1");
	datePicker("#selFrDate_2");
	datePicker("#selToDate_2");
	$("#selFrDate_1").val(getDate());
	$("#selToDate_1").val(getDate());
	
	tbl010_init_grid();
	tbl011_init_grid();
}

function initEventTab() {
	$("#btnSearch_1"     ).bind("click" , btnSearch_1_clickEvent   );
	$("#btnReset_1"      ).bind("click" , btnReset_1_clickEvent    );
	$("#btnInsert_2"     ).bind("click" , btnInsert_2_clickEvent   );
	$("#btnUpdate_2"     ).bind("click" , btnUpdate_2_clickEvent   );
	$("#btnReset_2"      ).bind("click" , btnReset_2_clickEvent    );
	$("#btnDelete_2"     ).bind("click" , btnDelete_2_clickEvent   );
	$("#btnInsert_3"     ).bind("click" , btnInsert_3_clickEvent   );
    $("#btnDelete_3"     ).bind("click" , btnDelete_3_clickEvent   );
    $("#btnUpdate_3"     ).bind("click" , btnUpdate_3_clickEvent   );
    $("#btnReset_3"      ).bind("click" , btnReset_3_clickEvent    );
}

function initDataTab() {
    setSelectBoxWithCode("progressStatus_1","전체","90023", "", "","all");
	setSelectBoxWithCode("cmpgtype_1","전체","90115", "", "","all");
	setSelectBoxWithCode("cmpgtype_2","전체","90115", "", "","all");
	setSelectBoxWithCode("surveyType_3","","90117", "", "","all");
	setRadioBoxWithCode("radioBox","90023", "", "", "010000");
	
	$("#btnUpdate_2").hide();
	$("#btnDelete_2").hide();
	
	$("#btnUpdate_3").hide();
	$("#btnDelete_3").hide();
}

$(function() {
	initControlTab();
	initEventTab();
	initDataTab();
	
	/*var resizeWidthTab = $('#gridMain').width();*/
	$('#tbl010').setGridWidth(922, true);
	
	resizeWidthTab = $('#grid_50').width();
	$('#tbl011').setGridWidth(440, true);
	
});