// 조회 조건 및 조회 값
var recUrl = "";
var g_usrId = "all";
var g_Vltn_Id = "";				//평가ID
var g_GrdTypeNm = "";			//사용자 권한 타입(AD:ADMIN, MN:MANAGER, AG:AGENT)

//파라미터 셋팅 CounselList
function getJsonStrCounselList()
{
	var frDt = $("#qabcli_selFrDate").val();
	var toDt = $("#qabcli_selToDate").val();

	if($("#qabcli_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#qabcli_selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2QwMjcuY291bnNlbGxpc3Q=",
		"map" : {
			"key" : "value",
			"srchDtType" : "rcvDt",								/*접수일자 조회 구분코드*/
			"frDt" : frDt,
			"toDt" : toDt,
			"selUsrId" : $("#qabcli_selCounselNm").val(),				/*선택상담사*/
			"vltn_gb_cd" : $("#qabcli_selBestCall").val(),			
			"chkRetire" : $("#qabcli_chkNotUse").is(":checked"),
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CounselListCnt
function getJsonStrCounselListCnt()
{
	var frDt = $("#qabcli_selFrDate").val();
	var toDt = $("#qabcli_selToDate").val();
	
	if($("#qabcli_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#qabcli_selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b2QwMjcuY291bnNlbGxpc3RjbnQ=",
		"map" : {
			"key" : "value",
			"srchDtType" : "rcvDt",
			"frDt" : frDt,
			"toDt" : toDt,
			"selUsrId" : $("#qabcli_selCounselNm").val(),
			"vltn_gb_cd" : $("#qabcli_selBestCall").val(),
			"chkRetire" : $("#qabcli_chkNotUse").is(":checked"),
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
			//$("#qabcli_tcktId").val(data.TCKT_ID);

			$("#qabcli_custNm").html(data.CUST_NM);                                        // 고객명
			$("#qabcli_gndr").html(data.GNDR);												/*성별*/
			$("#qabcli_agesCd").html(data.AGES_CD);										/*연령대*/
			
			// 고객성향
			if (data.CST_COMP_NM2 != undefined && data.CST_COMP_NM2 != "") {
				$("#qabcli_cstComp").css("color", "red");
				$("#qabcli_cstComp").html(data.CST_COMP_NM + " > " + data.CST_COMP_NM2);
			} else {
				$("#qabcli_cstComp").css("color", "black");
				$("#qabcli_cstComp").html(data.CST_COMP_NM);                                                                    
			} 
			
			$("#qabcli_callGbCd").html(data.CALL_GB_NM);								/*통화구분*/
			$("#qabcli_cntctInform").html(data.CNTCT_INFM_FORMAT);		                 	/*연결전화번호*/
			$("#qabcli_actTypeCd").html(data.ACT_TYPE_NM);                                 /*처리유형*/
			$("#qabcli_callTime").html(data.CALL_TIME);                                   	/*통화시간*/			

			$("#qabcli_instClass").html(data.INTV_NM);										/*상담유형*/
			$("#qabcli_actStCd").html(data.ACT_ST_NM);                                     /*처리상태(상담결과)*/

			$("#qabcli_rcvCont").val(data.RCV_CONT);
			$("#qabcli_actCont").val(data.ACT_CONT);
		}
	});
 
}

//데이터 초기화
function counselInitInfo()
{
	recUrl = "";
	
	$("#qabcli_custNm").html("");				//고객명
	$("#qabcli_gndr").html("");				//성별
	$("#qabcli_agesCd").html("");				//연령대
	$("#qabcli_cstComp").html("");				//고객성향
	
	$("#qabcli_callGbCd").html("");			//통화구분
	$("#qabcli_cntctInform").html("");			//통화번호
	$("#qabcli_actTypeCd").html("");			//처리유형
	$("#qabcli_callTime").html("");			//통화시간
	
	$("#qabcli_instClass").html("");			//상담유형
	$("#qabcli_actStCd").html("");				//상담결과	
	$("#qabcli_actCont").val("");				//답변내용
	$("#qabcli_rcvCont").val("");				//문의내용
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
			"notuse" : false,
			"chkRetire" : $("input[id=chkNotUse]:checkbox").prop("checked"),
			"cntr_cd" : cntrCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_usrId = $("#qabcli_selCounselNm").val();
	
	$("#qabcli_labCnslListInOutCnt").html("IN : 0, OUT : 0");
	
	$("#qabcli_tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#qabcli_tblCounselList").trigger("reloadGrid");
	
	counselInitInfo();
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
	$("#qabcli_selFrDate").val(getDate());
	$("#qabcli_selToDate").val(getDate());
	$("#qabcli_selCounselNm").val("all");
	$("#qabcli_selBestCall").val("all");
	$("#qabcli_chkNotUse").prop("checked", false);
	
	$("#qabcli_tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#qabcli_tblCounselList").trigger("reloadGrid");
	
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
			$("#qabcli_selCounselNm").html("");
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
			
			$("#qabcli_selCounselNm").append(value);
			$("#qabcli_selCounselNm").trigger("change");
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
	counselInitInfo();
	
	datePicker("#qabcli_selFrDate");
	datePicker("#qabcli_selToDate");

	$("#qabcli_selFrDate").val(getDate());
	$("#qabcli_selToDate").val(getDate());
	
	g_GrdTypeNm = getGradTypeNm("");
	
/*		//상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");
		 $("#qabcli_selCounselNm").prop("disabled", true);
	     $("#qabcli_btnExcelPopup").hide();
	} 	
*/		
	setSelectBoxWithUser();

	//g_usrId = window.opener.document.getElementById("mntUsrId").value;
	
	//$("#qabcli_selCounselNm").prop("disabled", true);
	
	if (g_usrId == "")
		$("#qabcli_selCounselNm").val("all");
	else
		$("#qabcli_selCounselNm").val(g_usrId);	
	
	setSelectBoxWithCode("qabcli_selBestCall","전체","90011", "CHILD", "", "all");		//BEST CALL
	
	$("#qabcli_tblCounselList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCounselList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["ID", "녹취경로","녹취ID", "접수일시", "상담사", "고객명", "전화번호", "상담유형", "처리유형", "상담결과", "통화구분", "통화시간","BEST CALL", "녹취듣기"],
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
	   	 	{ name : "RECD_ID", index : "RECD_ID", hidden:true },
	   	 	{ name : "CALL_ID", index : "CALL_ID" ,hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 110 },
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 60 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 70, hidden:true },
			{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 80 },
			{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 210 },
			{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 50 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 60, formatter:fnStatusFormatter },
			{ name : "CALL_GB_NM", index : "CALL_GB_NM", align : "center", width : 50 },
			{ name : "CALL_TIME", index : "CALL_TIME", align : "center", width : 50 },
	   		{ name : "BESTCALL_NM", index : "BESTCALL_NM", align : "center", width : 60 },
			{ name : "REC_BUTTON", align : "center", width: 50 }
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
	   	pager : "#qabcli_pgCounselList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		/*$("#qabcli_POPUP").val("CHILD");*/
	   		var row = $("#qabcli_tblCounselList").getRowData(rowid);	   			   			   		
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
	   			
	   			if(row.RECD_ID != null && row.RECD_ID != "")
	   			{
		   			var recBtn = "<button class='button' style='width: 50px;' id='rec_" + row.TCKT_ID + "' " + "name='" + row.CALL_ID + "'>청취</button>";
		   			$(this).jqGrid("setRowData", rowId, { REC_BUTTON : recBtn });
		   			$("#qabcli_rec_" + row.TCKT_ID).bind("click", fnReclisten);
		   				
	   			}
	   		}
	   		
	   		// in, out 건수 표시
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/counsel/externalCorpInsert.do",
				data : "pJson=" + getJsonStrCounselListCnt(),
				success : function(data)
				{
					if(data != 0)
					{
						$("#qabcli_labCnslListInOutCnt").html("IN : " + data.INCNT.toString() + ", OUT : " + data.OUTCNT.toString());
					}
				},
				error : function(data, status, err) 
				{
					
				}
			});
	   	}
	}).jqGrid("navGrid", "#qabcli_pgCounselList", {edit : false, add : false, del : false, search : false});
		
	// 조회 버튼 클릭 이벤트 등록
	$("#qabcli_btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#qabcli_btnInit").bind("click", initEvent);

	$("#qabcli_chkNotUse").bind("click", function()
	{
		setSelectBoxWithUser();
	});

	
});

function fnReclisten()
{
	var name_by_id = $('#qabcli_'+this.id).attr('name');
 		if( this.id == "btnListenRec")	{
 			name_by_id = $("#qabcli_hidCallId").val;
 		}
 		//alert("fnReclisten() " + this.id + " : " + name_by_id);
 		listenRecPopup("","","",name_by_id);
}