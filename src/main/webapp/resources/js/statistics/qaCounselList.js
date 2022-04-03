// 조회 조건 및 조회 값
var recUrl = "";
var g_usrId = "all";
var g_popup = "GGCHILD";
var g_Vltn_Id = "";				//평가ID
var g_GrdTypeNm = "";			//사용자 권한 타입(AD:ADMIN, MN:MANAGER, AG:AGENT)
var g_TabType = window.opener.document.getElementById("mntTabType").value;	//Tab Type (rec:상담품질, prc:1차처리율 탭)

//파라미터 셋팅 CounselList
function getJsonStrCounselList(usrId)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();

	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var frSec = ($("#selFrTime").val() != "" ? eval($("#selFrTime").val()) * 60 : eval("0")) + ($("#selFrSec").val() != "" ? eval($("#selFrSec").val()) : eval("0"))
	var toSec = ($("#selToTime").val() != "" ? eval($("#selToTime").val()) * 60 : eval("0")) + ($("#selToSec").val() != "" ? eval($("#selToSec").val()) : eval("0"))

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3Q=",
		"map" : {
			"key" : "value",
			"srchDtType" : "rcvDt",											/*접수일자 조회 구분코드*/
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,												/*선택상담사*/
			"selActTypeCd" : $("#selActTypeCd").val(),						/*처리유형(일반,호전환...)*/
			// "intv_ex_cd" : $("#selSrchIntvExCd").val(),						/*기관구분*/
			"intv_lg_cd" : $("#selSrchIntvLgCd").val(),						/*상담유형(대)*/
			"intv_md_cd" : $("#selSrchIntvMdCd").val(),						/*상담유형(중)*/
			"intv_sm_cd" : $("#selSrchIntvSmCd").val(),						/*상담유형(소)*/
			"call_gb_cd" : $("#selCallGb").val(),							/*통화구분(인,아웃)*/
			//"call_Cnnct_Tm" : $("#selFrTime").val(),						//통화시간(from)
			//"call_End_Tm" : $("#selToTime").val(),							//통화시간(to)
			"call_Cnnct_Tm" : frSec,						//통화시간(from)
			"call_End_Tm" : toSec,							//통화시간(to) 
			"tel_num" : $("#selTelNum").val().replace(/[-, :, \s]/g,""),
			"rdy_Scnt_Frm" : $("#selRdyFrmScnt").val() != "" ? $("#selRdyFrmScnt").val().replace(/[-, :, \s]/g,"") : "0",	//보류횟수
			"rdy_Scnt_To" : $("#selRdyToScnt").val() != "" ? $("#selRdyToScnt").val().replace(/[-, :, \s]/g,"") : "0",	//보류횟수
			"srch_mode" : g_TabType == "rec" ? "rec" : "prc",
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CounselListCnt
function getJsonStrCounselListCnt(usrId)
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var frSec = ($("#selFrTime").val() != "" ? eval($("#selFrTime").val()) * 60 : eval("0")) + ($("#selFrSec").val() != "" ? eval($("#selFrSec").val()) : eval("0"))
	var toSec = ($("#selToTime").val() != "" ? eval($("#selToTime").val()) * 60 : eval("0")) + ($("#selToSec").val() != "" ? eval($("#selToSec").val()) : eval("0"))
	
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuY291bnNlbGxpc3RjbnQ=",
		"map" : {
			"key" : "value",
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selActTypeCd" : $("#selActTypeCd").val(),
			"srchDtType" : "rcvDt",
			// "intv_ex_cd" : $("#selSrchIntvExCd").val(),						/*기관구분*/
			"intv_lg_cd" : $("#selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#selCallGb").val(),
			//"call_Cnnct_Tm" : $("#selFrTime").val(),						//통화시간(from)
			//"call_End_Tm" : $("#selToTime").val(),							//통화시간(to)
			"call_Cnnct_Tm" : frSec,						//통화시간(from)
			"call_End_Tm" : toSec,							//통화시간(to) 
			"tel_num" : $("#selTelNum").val().replace(/[-, :, \s]/g,""),
			"rdy_Scnt_Frm" : $("#selRdyFrmScnt").val() != "" ? $("#selRdyFrmScnt").val().replace(/[-, :, \s]/g,"") : "0",	//보류횟수
			"rdy_Scnt_To" : $("#selRdyToScnt").val() != "" ? $("#selRdyToScnt").val().replace(/[-, :, \s]/g,"") : "0",	//보류횟수
			"srch_mode" : g_TabType == "rec" ? "rec" : "prc",
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrCounselspec(tcktId)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuY291bnNlbFNwZWM=",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 상담정보 상세를 조회하여 화면에 표시한다.
 * 
 * @param tcktId
 * @param type
 * @param gridType
 */
function counselInitTable(tcktId)
{	
	recUrl = "";

	counselInitInfo();
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		cache : false,
		url : getContextPath() + "/ajax/counsel/counselSpec.do",
		data : "pJson=" + getJsonStrCounselspec(tcktId),
		success : function(data) 
		{
			//$("#tcktId").val(data.TCKT_ID);

			$("#custNm").html(data.CUST_NM);                                        // 고객명
			$("#agtNm").html(data.RCV_USR_NM);										/*상담사*/
			$("#rdyScnt").html(data.RDY_SCNT);										/*보류횟수*/
			
			// 고객성향
			if (data.CST_COMP_NM2 != undefined && data.CST_COMP_NM2 != "") {
				$("#cstComp").css("color", "red");
				$("#cstComp").html(data.CST_COMP_NM + " > " + data.CST_COMP_NM2);
			} else {
				$("#cstComp").css("color", "black");
				$("#cstComp").html(data.CST_COMP_NM);                                                                    
			} 
			
			$("#callGbCd").html(data.CALL_GB_NM);								/*통화구분*/
			$("#cntctInform").html(data.CNTCT_INFM_FORMAT);		                /*연결전화번호*/
			$("#actTypeCd").html(data.ACT_TYPE_NM);                             /*처리유형*/
			$("#callTime").html(data.CALL_TIME);                                /*통화시간*/			

			$("#instClass").html(data.INTV_NM);									/*상담유형*/
			$("#actStCd").html(data.ACT_ST_NM);                                 /*처리상태(상담결과)*/

			$("#rcvCont").val(data.RCV_CONT);
			$("#actCont").val(data.ACT_CONT);
		}
	});
 
}

//데이터 초기화
function counselInitInfo()
{
	recUrl = "";
	
	$("#custNm").html("");				//고객명
	$("#agtNm").html("");				//성별
	$("#rdyScnt").html("");				//보류횟수
	$("#cstComp").html("");				//고객성향
	
	$("#callGbCd").html("");			//통화구분
	$("#cntctInform").html("");			//통화번호
	$("#actTypeCd").html("");			//처리유형
	$("#callTime").html("");			//통화시간
	
	$("#instClass").html("");			//상담유형
	$("#actStCd").html("");				//상담결과	
	$("#actCont").val("");				//답변내용
	$("#rcvCont").val("");				//문의내용
}

//파라미터 셋팅 ProgramList
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var cntrCd = "";
	
	if (g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN")
		cntrCd = "";
	else
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : true,
			"chkRetire" : $("input[id=chkNotUse]:checkbox").prop("checked"),
			"cntr_cd" : cntrCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//선택 평가대상 상담이력정보 저장
function getJsonStrRecCounselListInsert(vltn_Id, usr_Id, tckt_Id)
{
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b2QwMjcucmVjQ291bnNlbExpc3Q=",
			"map" : {
				"key" : "value",
				"vltn_Id" : vltn_Id,
				"usr_Id" : usr_Id,
				"tckt_Id" : tckt_Id,
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//선택 1차처리율 평가대상 상담이력정보 저장
function getJsonStrPrcCounselListInsert(vltn_Id, usr_Id, tckt_Id)
{
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b2QwMjYucHJjQ291bnNlbExpc3Q=",
			"map" : {
				"key" : "value",
				"vltn_Id" : vltn_Id,
				"usr_Id" : usr_Id,
				"tckt_Id" : tckt_Id,
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_usrId = $("#selCounselNm").val();
	
	$("#labCnslListInOutCnt").html("IN : 0, OUT : 0");
	
	$("#tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#tblCounselList").trigger("reloadGrid");
	
	counselInitInfo();
}
//선택 녹취정보 리스트 가져오기
function saveRecCounselList()
{
	var rowNum = $("#tblCounselList").getGridParam("rowNum");
	var currentPageNum = $("#tblCounselList").getGridParam("page");

	var gRowLength = $("#tblCounselList").getGridParam("reccount");
	
	if(confirm("평가이력을 생성 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#tblCounselList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var TRGT_YN = "N";
			
			if(currentRow.TRGT_YN == "1")
			{
				TRGT_YN = "Y";
			
				//g_Vltn_Id :평가ID, TCKT_ID

				//상담품질 탭
				if (g_TabType == "rec") {		
					
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/qa/recCounselListUpdate.do",
						data : "pJson=" + getJsonStrRecCounselListInsert(g_Vltn_Id, g_usrId,  currentRow.TCKT_ID),
						success : function(data)
						{				
							opener.parent.tblMntRecList_reloadGrid(g_Vltn_Id, g_usrId);							
							self.close();						
							
						},
						error : function(data, status, err) 
						{
							networkErrorHandler(data, status, err);
						}
					});
					
				} else if (g_TabType == "prc")	{	
					//1차처리율 탭
					
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/qa/recCounselListUpdate.do",
						data : "pJson=" + getJsonStrPrcCounselListInsert(g_Vltn_Id, g_usrId,  currentRow.TCKT_ID),
						success : function(data)
						{				
							opener.parent.tblMntPrcList_reloadGrid(g_Vltn_Id, g_usrId);				
							self.close();						
							
						},
						error : function(data, status, err) 
						{
							networkErrorHandler(data, status, err);
						}
					});
					
				}
				
			}
		}
	}		
}
//초기화 버튼 클릭 이벤트
function initEvent()
{
/*		//상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");

	} else{
		g_usrId = "all";
	}
*/	
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	$("#selCounselNm").val(g_usrId);

	$("#selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#selCallGb option:eq(0)").attr("selected", "selected");
	
	$("#selSrchIntvLgCd").val("all");
	$("#selSrchIntvLgCd").trigger("change");

	//통화시간 
	$("#selFrTime").val("0");
	$("#selFrSec").val("00");
	$("#selToTime").val("10");
	$("#selToSec").val("00");
	
	$("#selRdyFrmScnt").val("0");
	$("#selRdyToScnt").val("0");

	$("#tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#tblCounselList").trigger("reloadGrid");
	
	$("#selTelNum").val("");
	
	counselInitInfo();

}

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
			$("#selCounselNm").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
		
				if(g_usrId==state.USR_ID){
					//상담사 본인것만 조회
					value += "<option selected value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				}else{
					value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				}
			});
			
			$("#selCounselNm").append(value);
			$("#selCounselNm").trigger("change");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// init Page
$(document).ready(function()
{
	g_popup = "GGCHILD";
	counselInitInfo();
	
	datePicker("#selFrDate");
	datePicker("#selToDate");

	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	g_GrdTypeNm = getGradTypeNm("");
	
/*		//상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");
		 $("#selCounselNm").prop("disabled", true);
	     $("#btnExcelPopup").hide();
	} 	
*/		
	setSelectBoxWithUser();

	g_usrId = window.opener.document.getElementById("mntUsrId").value;
	
	$("#selCounselNm").prop("disabled", true);
	
	if (g_usrId == "")
		$("#selCounselNm").val("all");
	else
		$("#selCounselNm").val(g_usrId);	
		
	g_Vltn_Id = window.opener.document.getElementById("mntId").value;		//평가ID
	
	//통화시간 
	$("#selFrTime").val("0");
	$("#selFrSec").val("00");
	$("#selToTime").val("10");
	$("#selToSec").val("00");
	
	$("#selRdyFrmScnt").val("0");
	$("#selRdyToScnt").val("3");

	setObjSelectBoxWithCode("selActTypeCd", "전체", "", g_popup, "90014", "");	// 채널구분 셋팅
	setObjSelectBoxWithCode("selCallGb", "전체", "", g_popup, "90010", "");	// 민원처리상태
 
	// setObjectSelectBoxWithCode2("selSrchIntvExCd", "전체", "1", g_popup, "00000000", "all", "CHANGE");
    //
    // $("#selSrchIntvExCd").bind("change", function()
    // {
		// setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "2", g_popup, $("#selSrchIntvExCd").val(), "", "CHANGE");
	// });

	// $("#selSrchIntvLgCd").bind("change", function()
	// {
	// 	setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "3", g_popup, $("#selSrchIntvLgCd").val(), "", "CHANGE");
	// });

	// $("#selSrchIntvMdCd").bind("change", function()
	// {
	// 	setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "4", g_popup, $("#selSrchIntvMdCd").val(),"","CHANGE");
	// });

    setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "1", g_popup, "00000000", "all", "CHANGE");

    $("#selSrchIntvLgCd").bind("change", function()
    {
        setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "2", g_popup, $("#selSrchIntvLgCd").val(), "", "CHANGE");
    });

    $("#selSrchIntvMdCd").bind("change", function()
    {
        setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "3", g_popup, $("#selSrchIntvMdCd").val(),"","CHANGE");
    });
	
	
	$("#tblCounselList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCounselList(g_usrId)
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["선택", "ID", "녹취경로","녹취ID", "접수일시", "상담사", "고객명", "언어", "전화번호", "상담유형", "처리유형", "상담결과", "통화구분", "통화시간","민원처리결과", "녹취듣기", "보류횟수", "RCV_DT", "RCV_USR_ID"],
	   	colModel :
	   	[
	   	 	{ name : "TRGT_YN", index : "TRGT_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 25, resizable: false, sortable : false },
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
	   	 	{ name : "RECD_ID", index : "RECD_ID", hidden:true },
	   	 	{ name : "CALL_ID", index : "CALL_ID" ,hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 110 },
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 60 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 70, hidden:true },
			{ name : "LANG_NM", index : "LANG_NM", align : "center", width : 50 },
			{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 80 },
			{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 210 },
			{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 50 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 60, formatter:fnStatusFormatter },
			{ name : "CALL_GB_NM", index : "CALL_GB_NM", align : "center", width : 50 },
			{ name : "CALL_TIME", index : "CALL_TIME", align : "center", width : 50 },
	   		{ name : "TRNR_ACT_ST_NM", index : "TRNR_ACT_ST_NM", align : "center", width : 80, hidden:true },
			{ name : "REC_BUTTON", align : "center", width: 50 },
			{ name : "RDY_SCNT", index : "RDY_SCNT", align : "center", width: 50 },
			{ name : "RCV_DT", index : "RCV_DT", hidden:true },
	   	 	{ name : "RCV_USR_ID", index : "RCV_USR_ID" ,hidden:true },
	   	],
	   	sortname : "RCV_DT_FORMAT",
	   	sortorder : "desc",
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
	   	pager : "#pgCounselList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		/*$("#POPUP").val("CHILD");*/
	   		var row = $("#tblCounselList").getRowData(rowid);	   			   			   		
	   		counselInitTable(row.TCKT_ID);
	   	},
	   	gridComplete : function()
	   	{
	   		var ids = $(this).getDataIDs();
	   		
	   		// 녹취 버튼 표시
	   		for(var i = 0; i < ids.length; i++)
	   		{
	   			var rowId = ids[i];
	   			var row = $(this).getRowData(rowId);
	   			
	   			if(row.CALL_ID != null && row.CALL_ID != "")
	   			{
	   				//청취 키  (녹취날짜 + con_id + agentId)
					var rec_param=row.RCV_DT+"|"+row.CALL_ID+"|"+row.RECD_ID;
					
		   			var recBtn = "<button class='button' style='width: 50px;' id='rec_" + row.TCKT_ID + "' " + "name='" + rec_param + "'>청취</button>";
		   			$(this).jqGrid("setRowData", rowId, { REC_BUTTON : recBtn });
		   			$("#rec_" + row.TCKT_ID).bind("click", fnReclisten);
		   				
	   			}
	   		}
	   		
	   		// in, out 건수 표시
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/counsel/externalCorpInsert.do",
				data : "pJson=" + getJsonStrCounselListCnt($("#selCounselNm").val()),
				success : function(data)
				{
					if(data != 0)
					{
						$("#labCnslListInOutCnt").html("IN : " + data.INCNT.toString() + ", OUT : " + data.OUTCNT.toString());
					}
				},
				error : function(data, status, err) 
				{
					
				}
			});
	   	}
	}).jqGrid("navGrid", "#pgCounselList", {edit : false, add : false, del : false, search : false});
		
	// 조회 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", initEvent);

	$("#chkNotUse").bind("click", function()
	{
		setSelectBoxWithUser();
	});
	
	// 추가 버튼 클릭 이벤트 등록
	$("#btnRecAdd").bind("click", saveRecCounselList);
	
	$("#selFrTime").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#selToTime").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#selFrSec").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#selToSec").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#selTelNum").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#selRdyFrmScnt").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );		//보류횟수
	$("#selRdyToScnt").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );		//보류횟수
	
});

function fnReclisten()
{
	var name_by_id = $('#'+this.id).attr('name');
 		if( this.id == "btnListenRec")	{
 			name_by_id = $("#hidCallId").val;
 		}
 		//alert("fnReclisten() " + this.id + " : " + name_by_id);
 		listenRecPopup("","","",name_by_id);
}