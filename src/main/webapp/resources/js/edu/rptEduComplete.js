// 글로벌 변수
var g_frDate = "";
var g_toDate = "";

var gRowLength = 0;
var gUpdcnt = 0;

var g_GrdTypeNm = "";	//사용자 권한 타입(AD:ADMIN, MN:MANAGER, AG:AGENT)
var g_usrGrdCd =  window.sessionStorage.getItem("USR_GRD_CD");

//파라미터 셋팅 getJsonStrEduCmpltlCntList
function getJsonStrEduCmpltlCntList(srchfrdt, srchtodt, teamCd, usrId, crrcum)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDIuc2VsZWN0RWR1Q21wbHRsQ250TGlzdA==",
		"map" : {
			"key" : "value",
			"edu_Strt_Dt" : srchfrdt,
			"edu_End_Dt" : srchtodt,
			"team_cd" : teamCd,
			"Agt_Id" : usrId,
			"edu_Class_Cd" : crrcum,							
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrCmpltAgtList
function getJsonStrCmpltAgtList(edu_Id, teamCd, usrId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDMuc2VsZWN0RWR1Q21wbHRsQWd0TGlzdA==",
		"map" : {
			"key" : "value",
			"edu_Id" : edu_Id,
			"team_cd" : teamCd,
			"Agt_Id" : usrId,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//교육확인 체크
function getJsonStrCourseCmpltUpdate(edu_Id, usr_Id, trgt_Yn)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNDMudXBkYXRlQ21wbHQ=",
			"map" : {
				"key" : "value",
				"edu_Id" : edu_Id,
				"usr_Id": usr_Id,
				"cmplt_yn" : trgt_Yn,
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

/*
//파라미터 셋팅_cmpltListExcel
function getJsonStrCmpltListExcel()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDIuc2VsZWN0Q21wbHRFeGNlbA==",
		"map" : {
			"key" : "value",
			"edu_Strt_Dt" : $("#rpedcp_selFrDate").val().replace(/[-, :, \s]/g,""), 
			"edu_End_Dt" : $("#rpedcp_selToDate").val().replace(/[-, :, \s]/g,""), 
			"team_cd" : $("#rpedcp_srchTeamCd").val(), 			
			"crrcum" : $("#rpedcp_srchCrrcum").val(), 
			"sidx" : $("#rpedcp_tblCourseList").getGridParam("sortname"),
			"sord" : $("#rpedcp_tblCourseList").getGridParam("sortorder"),
			"title" : "교육이수현황",
			"colWidth" : [15, 25, 15, 20, 20, 10, 25, 25, 25, 15, 15],
			"colName" : ["COL3", "COL4", "COL5"],
			"colHeader" : ["교육과정명", "이수인원", "미이수인원"],
			"colAlign" : ["center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
*/
//파라미터 셋팅 사용자 List
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var cntrCd = "";
	if(g_GrdTypeNm == "AD") {
		cntrCd = "";
		$("#rpedcp_srchTeamCd").prop("disabled", false);
	} else if(g_GrdTypeNm == "MN") {
			cntrCd = window.sessionStorage.getItem("CNTR_CD");
			$("#rpedcp_srchTeamCd").prop("disabled", false);
			
			//2020.01.17 hhs QA 권한 분리
			if(g_usrGrdCd=="030100"){
				$("#rpedcp_srchTeamCd").prop("disabled", true);
			}
			
	} else {
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		$("#rpedcp_srchTeamCd").prop("disabled", true);
	}
	
	var teamCd = $("#rpedcp_srchTeamCd").val();
	
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


//상담사 리스트
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
			$("#rpedcp_selAgent").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#rpedcp_selAgent").append(value);
			$("#rpedcp_selAgent").trigger("change");

			if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
				$("#rpedcp_selAgent").prop("disabled", false);
			} else {
				$("#rpedcp_selAgent").val(window.sessionStorage.getItem("USR_ID"));
				$("#rpedcp_selAgent").prop("disabled", true);
			}			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//업데이트 성공 시 Alert창 띄우는 함수
function updateAlert() 
{
	gUpdcnt++;
	
	if(gUpdcnt == gRowLength)
		alert("저장되었습니다.");
	
}

// 교육보고서 등록 버튼 클릭 이벤트
function btnEduRpt_clickEvent()
{
	if ($("#rpedcp_getEduId").val() == "")
	{
		alert("교육과정을 선택해주세요.");
		return;
	}	
	
	var width = 1020;
	var height = 628;	
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/edu/eduRptComment.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "교육결과보고서 등록", option);
	newWindow.focus();
}

// 설문결과 등록 버튼 클릭 이벤트
function btnSuvySave_clickEvent()
{
	if ($("#rpedcp_getEduId").val() == "")
	{
		alert("교육과정을 선택 해 주세요.");
		return;
	}	
	
	if ($("#rpedcp_getSuvyId").val() == "")
	{
		alert("설문지가 지정되지 않았습니다.");
		return;
	}	
	
	var width = 1020;
	var height = 628;	
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/edu/eduSuvySrchResult.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "설문조사결과 등록", option);
	newWindow.focus();
}

// 조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{	
	g_frDate = $("#rpedcp_selFrDate").val().replace(/[-, :, \s]/g,"");
	g_toDate = $("#rpedcp_selToDate").val().replace(/[-, :, \s]/g,"");
	
	//교육ID
	$("#rpedcp_getEduId").val("");
	//설문여부
	$("#rpedcp_getSuvyId").val("");
	$("#rpedcp_getUsrId").val("");
	
	var usrId = $("#rpedcp_selAgent").val();	
	var teamCd = $("#rpedcp_srchTeamCd").val();
	var srchCrrcum = $("#rpedcp_srchCrrcum").val();

	$("#rpedcp_tblTarget").jqGrid("setGridParam", { postData : { pJson : getJsonStrEduCmpltlCntList(g_frDate, g_toDate, teamCd, usrId, srchCrrcum) }, page : 1, sortname : "EDU_CLASS_NM", sortorder : "asc" }).trigger("reloadGrid");

	$("#rpedcp_tblCmplt").clearGridData();
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
	$("#rpedcp_selFrDate").val(getDate());
	$("#rpedcp_selToDate").val(getDate());	
	
	//$("#rpedcp_srchCntrCd").val("all");
	
	// 2020.01.17 hhs 초기화시 팀코드 초기화 되는것 수정
//	$("#rpedcp_srchTeamCd").val("all");
	$("#rpedcp_srchCrrcum").val("all");
	
	
	// 2020.01.17 hhs 권한별 초기화 수정
	if(g_usrGrdCd=="090100" || g_usrGrdCd=="050100"){
		$("#rpedcp_srchTeamCd").val("all");
		$("#rpedcp_selAgent").val("all");
	}
	else{
		
	
	
	//교육ID
	$("#rpedcp_getEduId").val("");
	//설문여부
	$("#rpedcp_getSuvyId").val("");
	$("#rpedcp_getUsrId").val("");
	
	var usrId = $("#rpedcp_selAgent").val();	
	var teamCd = $("#rpedcp_srchTeamCd").val();
	var srchCrrcum = $("#rpedcp_srchCrrcum").val();
	
	g_frDate = $("#rpedcp_selFrDate").val().replace(/[-, :, \s]/g,"");
	g_toDate = $("#rpedcp_selToDate").val().replace(/[-, :, \s]/g,"");	
	
	$("#rpedcp_tblTarget").jqGrid("setGridParam", { postData : { pJson : getJsonStrEduCmpltlCntList(g_frDate, g_toDate, teamCd, usrId, srchCrrcum) }, page : 1, sortname : "EDU_CLASS_NM", sortorder : "asc" }).trigger("reloadGrid");
	
	$("#rpedcp_tblCmplt").clearGridData();
	}
}

// 저장 버튼 클릭 이벤트
function btnSave_clickEvent()
{
	var rowNum = $("#rpedcp_tblCmplt").getGridParam("rowNum");
	var currentPageNum = $("#rpedcp_tblCmplt").getGridParam("page");
	
	var vEdu_Id = $("#rpedcp_getEduId").val();
	
	if (vEdu_Id == "") {
		alert("교육과정을 먼저 선택해주세요.");
		return;
	}
	
	gUpdcnt = 0;
	gRowLength = $("#rpedcp_tblCmplt").getGridParam("reccount");
	
	if(confirm("교육확인을 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#rpedcp_tblCmplt").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var TRGT_YN = "N";
			
			if(currentRow.TRGT_YN == "1")
				TRGT_YN = "Y";
				
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/edu/courseCmpltUpdate.do",
				data : "pJson=" + getJsonStrCourseCmpltUpdate(vEdu_Id, currentRow.USR_ID, TRGT_YN),
				success : function(data)
				{
					if(data != 0) {
						updateAlert();
						setTimeout(function(){	
							btnSearch_clickEvent();
						}, 300);
					}
					

				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
	}	
}

/*
//엑셀저장 버튼 클릭 이벤트
function btnExcel_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/edu/courseList.do", getJsonStrCmpltListExcel());
}
*/
//초기화면 데이터 설정
function initData()
{
	$("#rpedcp_selFrDate").val(getDate());
	$("#rpedcp_selToDate").val(getDate());	
	
	// 센터 셀렉트 박스 셋팅(팀)
	if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
		setObjSelectBoxWithCode("rpedcp_srchTeamCd", "전체", "", "CHILD", "90003", "");
		
		//2020.01.17 hhs QA 권한 분리
		if(g_usrGrdCd=="030100"){
			setObjSelectBoxWithCode("rpedcp_srchTeamCd", "전체", "", "CHILD", "90003", window.sessionStorage.getItem("TEAM_CD"));
		}
		
	} else {
		setObjSelectBoxWithCode("rpedcp_srchTeamCd", "전체", "", "CHILD", "90003", window.sessionStorage.getItem("TEAM_CD"));
	}	
	//상담사 리스트
	setSelectBoxWithUser();
	
	//교육과정명
	//setSelectBoxWithCode("srchCrrcum","전체","90085", "CHILD", "", "all");
	//2019.12.30 hhs 교육과정명 불러오기 수정
	setSelectBoxWithCode("rpedcp_srchCrrcum","전체","90085", "CHILD", "", "all");
}

$(document).ready(function()
{
	datePicker("#rpedcp_selFrDate");
	datePicker("#rpedcp_selToDate");
	
	g_GrdTypeNm = getGradTypeNm(g_usrGrdCd);
	
	//교육ID
	$("#rpedcp_getEduId").val("");
	//설문여부
	$("#rpedcp_getSuvyId").val("");
	$("#rpedcp_getUsrId").val("");
	
	//상담사일경우 교육보고서, 설문결과 버튼 보이지 않기
	if(g_GrdTypeNm == "AG") {
		$("#rpedcp_btnEduRpt").hide();
		$("#rpedcp_btnSuvySave").hide();
	} else {
		$("#rpedcp_btnEduRpt").show();
		$("#rpedcp_btnSuvySave").show();
	}
	
	initData();
	
	
	g_frDate = $("#rpedcp_selFrDate").val().replace(/[-, :, \s]/g,"");
	g_toDate = $("#rpedcp_selToDate").val().replace(/[-, :, \s]/g,"");
	
	var usrId = $("#rpedcp_selAgent").val();	
	var teamCd = $("#rpedcp_srchTeamCd").val();
	var srchCrrcum = $("#rpedcp_srchCrrcum").val();
	
	
	$("#rpedcp_tblTarget").jqGrid(
	{		
		url : getContextPath() + "/jqgrid/edu/courseList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrEduCmpltlCntList(g_frDate, g_toDate, usrId, teamCd, srchCrrcum)
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "교육과정명", "교육내용", "이수인원", "미이수인원", "설문확인", "교육확인", "교육ID", "설문지ID" ],
		colModel : 
		[
            { name : "EDU_CLASS_NM", index : "EDU_CLASS_NM",width : 120, align : "left" },
            { name : "EDU_CONT", index : "EDU_CONT",width : 330, align : "left" },
            { name : "CMPLT_CNT", index : "CMPLT_CNT",width : 100, align : "center" },
            { name : "NCMPLT_CNT", index : "NCMPLT_CNT", width : 100, align : "center" },
            { name : "SUVY_RTN", index : "SUVY_RTN", width : 100, align : "center" ,cellattr : function(rowId, tv, rowObject, cm, rdata) {
		    if (rowObject.SUVY_RTN == '미완료' ) { return 'style="color:red;font-weight:bold"'; }
		}},
            { name : "CMPLT_RTN", index : "CMPLT_RTN", width : 100, align : "center",cellattr : function(rowId, tv, rowObject, cm, rdata) {
		    if (rowObject.CMPLT_RTN == '미완료' ) { return 'style="color:red;font-weight:bold"'; }
		}},
            { name : "EDU_ID", index : "EDU_ID", hidden : true },
            { name : "SUVY_ID", index : "SUVY_ID", hidden : true }
		],
		sortname : "EDU_CLASS_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "500",		
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		pager : "#rpedcp_pgTarget",
		onSelectRow : function(rowid) 
		{
			var objGrid_Row = $("#rpedcp_tblTarget").jqGrid('getRowData', rowid);
			window.sessionStorage.setItem("org_EDU_ID",objGrid_Row.EDU_ID);
		
			$("#rpedcp_getEduId").val(objGrid_Row.EDU_ID);
			$("#rpedcp_getSuvyId").val(objGrid_Row.SUVY_ID);
			
			if (objGrid_Row.SUVY_ID != null && objGrid_Row.SUVY_ID != "") {
				//$("#rpedcp_btnEduRpt").hide();
				if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
					$("#rpedcp_btnSuvySave").show();
				}
				
				//설문 작성 할때에도 교육확인 하기로 함.
				//$("#rpedcp_btnSave").hide();
			} else {
				//$("#rpedcp_btnEduRpt").show();
				if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
					$("#rpedcp_btnSuvySave").hide();
				}
				
				//설문 작성 할때에도 교육확인 하기로 함.
				//$("#rpedcp_btnSave").show();
			}
			
			$("#rpedcp_tblCmplt").jqGrid("setGridParam", {postData : { pJson : getJsonStrCmpltAgtList(objGrid_Row.EDU_ID, $("#rpedcp_srchTeamCd").val(), $("#rpedcp_selAgent").val()) }, page : 1, sortname : "USR_NM", sortorder : "asc", }).trigger("reloadGrid");			
		},

	}).jqGrid("navGrid", "#rpedcp_pgTarget", {edit : false, add : false, del : false, search : false});
	
	$("#rpedcp_tblCmplt").jqGrid(
	{		
		url : getContextPath() + "/jqgrid/edu/cmpltAgentList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCmpltAgtList("", "", "")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "상담사", "이수/미이수", "설문제출", "교육확인", "상담사ID" ],
		colModel : [
            { name : "USR_NM", index:"USR_NM", align : "center", width : 120 },
            { name : "EDU_PRSN_GB_NM", index:"EDU_PRSN_GB_NM", align : "center", width : 120 },
            { name : "SUVY_SEND", index : "SUVY_SEND", align : "center", width : 120, 
        	cellattr : function(rowId, tv, rowObject, cm, rdata) {
        	    // rowObject 변수로 그리드 데이터에 접근
        	    if (rowObject.SUVY_SEND == '없음' ) { return 'style="color:blue;font-weight:bold"' }
        	    else if (rowObject.SUVY_SEND == '완료' ) { return 'style="color:green;font-weight:bold;text-decoration:underline;cursor:pointer"' }
        	}, formatter:function(value,option,data,action){
        	    // 설문지 제출이 있을시 내용변경
        	    if ($("#rpedcp_getSuvyId").val() != "" && data.SUVY_SEND=="없음") return "미제출";
        	    else return value;
        	}
            },
            /*{ name : "SUVY_SEND", index : "SUVY_SEND", align : "center", width : 120, formatter:fnStatusFormatter },*/
            { name : "TRGT_YN", index : "TRGT_YN", formatter:'checkbox', 
            	editoptions:{value : "1:0", defaultVaule : "0"}, 
            	formatoptions:{disabled:false}, align : "center", width : 100, resizable: false, sortable : false },
            { name : "USR_ID", index:"USR_ID", hidden : true },
		],
		sortname : "USR_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "500",		
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		pager : "#rpedcp_pgCmplt",
       	onCellSelect : function(rowid, icol, cellcontent)
       	{

		},
		ondblClickRow: function (rowid, iRow, iCol, e) 
		{			
			var objGrid_Row = $("#rpedcp_tblCmplt").jqGrid('getRowData', rowid);

			$("#rpedcp_getUsrId").val(objGrid_Row.USR_ID);	
			
			if ($("#rpedcp_getSuvyId").val() != "")
			{
				var width = 1020;
				var height = 583;	
				var top = (screen.height - height) / 2;
				var left = (screen.width - width) / 2;
				
				var paramURL = getContextPath() + "/web/edu/eduSuvySearch.do";
				var option = "width=" + width + ", height=" + height 
					+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
					+ top + ",left=" + left +"";
				
				//window.sessionStorage.setItem("BOARD_TYPE", "030100.insert");
				
				var newWindow = window.open(paramURL, "교육설문조사 작성", option);
				newWindow.focus();			
								
			}
		},
		gridComplete : function() 
		{			                    
            
		},
		loadComplete: function (jsondata) {
			//설문 작성 할때에도 교육확인 하기로 함.
			/*
			var idArry = $("#rpedcp_tblCmplt").jqGrid('getDataIDs'); //grid의 id 값을 배열로 가져옴
                       
			for(var i=0 ; i < idArry.length; i++){
				//설문지가 있다면 체크박스 선택안되게 한다.
				if ($("#rpedcp_getSuvyId").val() != "") 
					$('input:checkbox').prop("disabled", true);
				else
					$('input:checkbox').prop("disabled", false);
			}
			*/
		}

	}).jqGrid("navGrid", "#rpedcp_pgCmplt", {edit : false, add : false, del : false, search : false});

	// 조회버튼 클릭 이벤트 등록
	$("#rpedcp_btnSearch").bind("click", btnSearch_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#rpedcp_btnInit").bind("click", btnInit_clickEvent);
	// 저장 버튼 클릭 이벤트
	$("#rpedcp_btnSave").bind("click", btnSave_clickEvent);
	/*
	// 엑셀저장 버튼 클릭 이벤트
	$("#rpedcp_btnExcel").bind("click", btnExcel_clickEvent);
	*/
	// 팀선택, 상담사 불러오기
	$("#rpedcp_srchTeamCd").bind("change", setSelectBoxWithUser);
	
	// 교육보고서 등록 버튼 클릭 이벤트
	$("#rpedcp_btnEduRpt").bind("click", btnEduRpt_clickEvent);
	// 설문결과 등록 버튼 클릭 이벤트
	$("#rpedcp_btnSuvySave").bind("click", btnSuvySave_clickEvent);
	
});