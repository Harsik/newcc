//파라미터 셋팅 UserList
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var cntrCd = "";
	
	if(window.sessionStorage.getItem("USR_GRD_CD") == "060100" || window.sessionStorage.getItem("USR_GRD_CD") == "090100")
		cntrCd = "";
	else
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CallBackList
function getJsonStrCallBackList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDYuY2FsbEJhY2tsaXN0",
		"map" : {
			"key" : "value",
			"srchDtType" : "dt",
			"frDt" : $("#clbkdv_selFrDate").val().replace(/-/gi, ""),
			"toDt" : $("#clbkdv_selToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : parseInt(window.sessionStorage.getItem("USR_GRD_CD")),
			"selUsrId" : $("#clbkdv_selCounselNm").val(),
			"selCallbckActStCd" : $("#clbkdv_selCallbckActStCd").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CallBackUsrList
function getJsonStrCallBackUsrList()
{
	// 권한에 따라 셋팅
	var cntrCd = "";
	
	if(window.sessionStorage.getItem("USR_GRD_CD") == "060100" || window.sessionStorage.getItem("USR_GRD_CD") == "090100")
		cntrCd = "";
	else
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDYuY2FsbEJhY2tVc3JMaXN0",
		"map" : {
			"key" : "value",
			"srchDtType" : "dt",
			"frDt" : $("#clbkdv_selFrDate").val().replace(/-/gi, ""),
			"toDt" : $("#clbkdv_selToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : parseInt(window.sessionStorage.getItem("USR_GRD_CD")),
			"selUsrId" : $("#clbkdv_selCounselNm").val(),
			"selCallbckActStCd" : $("#clbkdv_selCallbckActStCd").val(),
			"cntr_cd" : cntrCd
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CallbckListCnt
function getJsonStrCallbckListCnt()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMDYuY2FsbEJhY2tMaXN0Q250",
		"map" : {
			"key" : "value",
			"srchDtType" : "dt",
			"frDt" : $("#clbkdv_selFrDate").val().replace(/-/gi, ""),
			"toDt" : $("#clbkdv_selToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : parseInt(window.sessionStorage.getItem("USR_GRD_CD")),
			"selUsrId" : $("#clbkdv_selCounselNm").val(),
			"selCallbckActStCd" : $("#clbkdv_selCallbckActStCd").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 ReleaseCallbck
function getJsonStrReleaseCallbck(callbckIds)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDYucmVsZWFzZUNhbGxiY2s=",
		"map" : {
			"key" : "value",
			"callbckIds" : callbckIds
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 DeleteCallbck
function getJsonStrDeleteCallbck(callbckIds)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDYuZGVsZXRlQ2FsbGJjaw==",
		"map" : {
			"key" : "value",
			"callbckIds" : callbckIds
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 이전 날짜를 가져옴
function getPrevDate()
{
	var date = new Date(getDate());
	var oneMonth = new Date(date);
	oneMonth.setDate(oneMonth.getDate() - 3);
	var nm = new Date(oneMonth);
	
	var year = nm.getFullYear();
	var month = nm.getMonth() + 1;
	var day = nm.getDate();
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	
	return year + "-" + month + "-" + day;
}

// 상담사 데이터 셋팅
function setSelectBoxWithUser()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data)
		{
			$("#clbkdv_selCounselNm").html("");			

			// param값을 JSON으로 파싱			
			var value = "";
			value += "<option value='all'>전체</option>";

			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#clbkdv_selCounselNm").append(value);
			//$("#clbkdv_selCounselNm").val(window.sessionStorage.getItem("USR_ID"));
			$("#clbkdv_selCounselNm").val("all");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 각 그리드 reload
function reloadGrid()
{
	$("#clbkdv_tblcallbckList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCallBackList()}, page : 1, sortname : "CALLBCK_REQ_FORMAT", sortorder : "desc"});
	$("#clbkdv_tblcallbckList").trigger("reloadGrid");
	
	$("#clbkdv_tbldivUsrList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCallBackUsrList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#clbkdv_tbldivUsrList").trigger("reloadGrid");
}

// 조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	reloadGrid();
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	initControlls();
	reloadGrid();
}

// 회수 버튼 클릭 이벤트
function btnRelease_clickEvent()
{
	// 체크된 콜백건 가져와 콜백ID 저장
	var checkedDatas = $("#clbkdv_tblcallbckList").getRowData();
	var callbckIds = [];
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].RD_YN == "1" && (checkedDatas[i].CALLBCK_ACT_ST_CD == "011000" || checkedDatas[i].CALLBCK_ACT_ST_CD == "020000"))
			callbckIds.push(checkedDatas[i].CALLBCK_ID);
	}
	
	if(callbckIds.length < 1)
	{
		alert("선택 하신 콜백건 중 회수 가능한 콜백건이 존재하지 않습니다.\n\n- 회수가능상태 : 할당, 처리중");
		return;
	}
	else
	{
		// 체크된 콜백건 회수 처리
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/counsel/updateReleaseCallbck.do",
			data : "pJson=" + getJsonStrReleaseCallbck(callbckIds),
			success : function(data)
			{
				reloadGrid();
				
				alert("선택한 콜백건 중 회수가능한 " + callbckIds.length + " 건의 콜백건이 회수 되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//삭제 버튼 클릭 이벤트
function btnDelete_clickEvent()
{
	// 체크된 콜백건 가져와 콜백ID 저장
	var checkedDatas = $("#clbkdv_tblcallbckList").getRowData();
	var callbckIds = [];
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].RD_YN == "1")
			callbckIds.push(checkedDatas[i].CALLBCK_ID);
	}
	
	if(callbckIds.length < 1)
	{
		alert("선택 하신 콜백건 중 삭제 가능한 콜백건이 존재하지 않습니다");
		return;
	}
	else
	{
		// 체크된 콜백건 삭제 처리
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/counsel/deleteCallbck.do",
			data : "pJson=" + getJsonStrDeleteCallbck(callbckIds),
			success : function(data)
			{
				reloadGrid();
				
				alert("선택한 콜백건 중 삭제가능한 " + callbckIds.length + " 건의 콜백건이 삭제 되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 분배 버튼 클릭 이벤트
function btnDivToUser_clickEvent()
{
	// 체크된 콜백건 가져와 콜백ID 저장
	var checkedDatas = $("#clbkdv_tblcallbckList").getRowData();
	var callbckIds = [];
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].RD_YN == "1" && (checkedDatas[i].CALLBCK_ACT_ST_CD == "010000" || checkedDatas[i].CALLBCK_ACT_ST_CD == "012000"))
			callbckIds.push(checkedDatas[i].CALLBCK_ID);
	}
	
	// 분배 대상 건 체크
	if(callbckIds.length < 1)
	{
		alert("선택 하신 콜백건 중 분배 가능한 콜백건이 존재하지 않습니다.\n\n- 분배가능상태 : 접수, 회수");
		return;
	}
	
	// 체크된 사용자 가져와 사용자ID 저장
	var checkedUsers = $("#clbkdv_tbldivUsrList").getRowData();
	var usrIds = [];
	
	for(var i = 0 ; i < checkedUsers.length; i++)
	{
		if(checkedUsers[i].RD_YN == "1")
			usrIds.push(checkedUsers[i].USR_ID);
	}

	// 분배 대상 상담사 체크
	if(usrIds.length < 1)
	{
		alert("분배할 상담사를 선택 해 주세요.");
		return;
	}
	
	// 선택된 상담사에게 선택된 콜백건을 균등분배
	var j = 0;
	var pList = [];
	
	for(var i = 0; i < callbckIds.length; i++)
	{
		pList.push({"qt" : "dXBkYXRl",
			"mi" : "Y20wMDYuZGl2Q2FsbGJjaw==",
			"map":	{
					 "callbck_id" : callbckIds[i],
					 "callbck_usr_id" : usrIds[j++],
					 "at_div_yn" : "N"
		}});
		
		if(j >= usrIds.length)
			j = 0;
	}
	
	// 할당 요청
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateCallbckDiv.do",
		data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
		success : function(data)
		{
			reloadGrid();
			
			alert("선택한 콜백건 중 분배가능한 " + callbckIds.length + " 건의 콜백건이 분배 되었습니다.");
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}	
	});
}

// 전체 선택 해제 함수_콜백목록
function callbckListSelectAll_clickEvent()
{
	var selectVal = "0";
	var tblLength = $("#clbkdv_tblcallbckList").getGridParam("reccount");
	
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#clbkdv_tblcallbckList").getCell(i, "RD_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++)
		$("#clbkdv_tblcallbckList").setCell(i, "RD_YN", selectVal);
}

// 전체 선택 해제 함수_상담사목록
function divUsrListSelectAll_clickEvent()
{
	var selectVal = "0";
	var tblLength = $("#clbkdv_tbldivUsrList").getGridParam("reccount");
	
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#clbkdv_tbldivUsrList").getCell(i, "RD_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++)
		$("#clbkdv_tbldivUsrList").setCell(i, "RD_YN", selectVal);
}

// 그리드 초기화
function initGrid()
{
	// 콜백목록 그리드
	$("#clbkdv_tblcallbckList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/callbckList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCallBackList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["콜백ID", "선택", "접수일시", "발신자번호", "콜백번호"/*, "콜백그룹"*/, "분배일시", "처리일시", "시도횟수", "처리상태코드", "처리상태", "상담사"],
	   	colModel :
	   	[
	   	 	{ name : "CALLBCK_ID", index : "CALLBCK_ID", hidden : true },
	   	 	{ name : "RD_YN", index : "RD_YN", formatter : 'checkbox', editoptions : {value : "1:0", defaultVaule : "0"}, formatoptions : {disabled:false}, width : 30, align : "center", sortable : false},
			{ name : "CALLBCK_REQ_FORMAT", index : "CALLBCK_REQ_FORMAT", align : "center", width : 90 },
			{ name : "CALLBCK_ANI_FORMAT", index : "CALLBCK_ANI_FORMAT", align : "center", width : 60 },
			{ name : "CALLBCK_TEL_NO_FORMAT", index : "CALLBCK_TEL_NO_FORMAT", align : "center", width : 60 },			
//			{ name : "CALLBCK_GRP_NM", index : "CALLBCK_GRP_NM", align : "center", width : 60 },			
			{ name : "CALLBCK_DIV_FORMAT", index : "CALLBCK_DIV_FORMAT", align : "center", width : 80 },
			{ name : "RCT_TRY_FORMAT", index : "RCT_TRY_FORMAT", align : "center", width : 80 },
			{ name : "TRY_CNT", index : "TRY_CNT", align : "center", width : 40 },
			{ name : "CALLBCK_ACT_ST_CD", index : "CALLBCK_ACT_ST_CD", hidden : true },
			{ name : "CALLBCK_ACT_ST_NM", index : "CALLBCK_ACT_ST_NM", align : "center", width : 40, formatter:function(cellValue, options, rowdata, action){			  
			    if(rowdata.CALLBCK_ACT_ST_NM == "할당" && rowdata.AUTO_ASSIGN =="Y"){
				return "<span style='color:blue;'>자동할당</span>";
			    }else if(rowdata.CALLBCK_ACT_ST_NM == "할당" && rowdata.AUTO_ASSIGN =="N"){
				return "<span style='color:blue;'>수동할당</span>";
			    }else if(rowdata.CALLBCK_ACT_ST_NM == "처리중"){
				return "<span style='color:red;'>처리중</span>";
			    }else {
				return cellValue==null?"":cellValue;
			    }			    
			}},
			{ name : "CALLBCK_USR_NM", index : "CALLBCK_USR_NM", align : "center", width : 40 }
	   	],
	   	sortname : "CALLBCK_REQ_FORMAT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	height : "500",
	        width : "100%",
	   	rowNum : "99999",
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var rd_yn = $("#clbkdv_tblcallbckList").getCell(rowid, "RD_YN");
	   		
	   		if(rd_yn == 1)
	   			$("#clbkdv_tblcallbckList").setCell(rowid, "RD_YN", 0);
	   		else
	   			$("#clbkdv_tblcallbckList").setCell(rowid, "RD_YN", 1);
	   	},
		gridComplete : function()
	   	{
			// 상단 수치 셋팅
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/counsel/callbckListcnt.do",
				data : "pJson=" + getJsonStrCallbckListCnt(),
				success : function(data)
				{
					if(data != null)
					{
						$("#clbkdv_labTotalCnt").html(data.TOTAL);
						$("#clbkdv_labRcvCnt").html(data.RCV_CNT);
						$("#clbkdv_labNoDivCnt").html(data.REDIV_CNT);
						$("#clbkdv_labDivCnt").html(data.DIV_CNT);
						$("#clbkdv_labNotCompCnt").html(data.NOTYET_CNT);
						$("#clbkdv_labCompCnt").html(data.COMP_CNT);
					}
					else
					{
						$("#clbkdv_labTotalCnt").html("0");
						$("#clbkdv_labRcvCnt").html("0");
						$("#clbkdv_labNoDivCnt").html("0");
						$("#clbkdv_labDivCnt").html("0");
						$("#clbkdv_labNotCompCnt").html("0");
						$("#clbkdv_labCompCnt").html("0");
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
	   	}
	});
	
	// 상단 선택 컬럼 클릭 이벤트 등록
	$("#clbkdv_tblcallbckList_RD_YN").bind("click", callbckListSelectAll_clickEvent);
	
	// 상담사목록
	$("#clbkdv_tbldivUsrList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/usrList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCallBackUsrList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["상담사ID", "선택", "상담사", "분배", "처리", "미처리"],
	   	colModel :
	   	[
	   	 	{ name : "USR_ID", index : "USR_ID", hidden : true },
	   	 	{ name : "RD_YN", index : "RD_YN", formatter : 'checkbox', editoptions : {value : "1:0", defaultVaule : "0"}, formatoptions : {disabled:false}, width : 30, align : "center", sortable : false},
			{ name : "USR_NM", index : "USR_NM", align : "center", width : 60 },
			{ name : "CALLBCK_DIV_CNT", index : "CALLBCK_DIV_CNT", align : "center", width : 60 },
			{ name : "CALLBCK_COMP_CNT", index : "CALLBCK_COMP_CNT", align : "center", width : 60, formatter:function(cellValue, options, rowdata, action){			  
			    return "<span style='color:blue;'>"+cellValue+"</span>";
			} },
			{ name : "CALLBCK_NOTYET_CNT", index : "CALLBCK_NOTYET_CNT", align : "center", width : 60, formatter:function(cellValue, options, rowdata, action){			  
			    return "<span style='color:red;'>"+cellValue+"</span>";
			} },
	   	],
	   	sortname : "USR_NM",
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	height : "500",
	    width : "100%",
	   	rowNum : "99999",
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var rd_yn = $("#clbkdv_tbldivUsrList").getCell(rowid, "RD_YN");
	   		
	   		if(rd_yn == 1)
	   			$("#clbkdv_tbldivUsrList").setCell(rowid, "RD_YN", 0);
	   		else
	   			$("#clbkdv_tbldivUsrList").setCell(rowid, "RD_YN", 1);
	   	}
	});
	
	// 상단 선택 컬럼 클릭 이벤트 등록
	$("#clbkdv_tbldivUsrList_RD_YN").bind("click", divUsrListSelectAll_clickEvent);
}

// 이벤트 등록
function initEvent()
{
	$("#clbkdv_btnSearch").bind("click", btnSearch_clickEvent);			// 조회 버튼 클릭 이벤트 등록
	$("#clbkdv_btnInit").bind("click", btnInit_clickEvent);				// 초기화 버튼 클릭 이벤트 등록
	$("#clbkdv_btnRelease").bind("click", btnRelease_clickEvent);		// 회수 버튼 클릭 이벤트 등록
	$("#clbkdv_btnDivToUser").bind("click", btnDivToUser_clickEvent);	// 분배 버튼 클릭 이벤트 등록
	$("#clbkdv_btnDelete").bind("click", btnDelete_clickEvent);	// 삭제 버튼 클릭 이벤트 등록
}

// 각 컨트롤 초기화
function initControlls()
{
//	$("#clbkdv_selFrDate").val(getPrevDate());
	$("#clbkdv_selFrDate").val(getDate());
	$("#clbkdv_selToDate").val(getDate());
	
	//setSelectBoxWithCode("selCallbckActStCd", "전체", "90020", "", "", "");	// 콜백처리상태 셋팅
	//setSelectBoxWithUser();

	if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100"){
		setSelectBoxWithAgent("clbkdv_selCounselNm", "전체", "CHILD","","","","","","" );
	}else{
		setSelectBoxWithAgent("clbkdv_selCounselNm", "전체", "CHILD",window.sessionStorage.getItem("USR_ID"),"","","","","" );
	}
	
	//setSelectBoxWithAgent("clbkdv_selCounselNm", "전체", "CHILD", window.sessionStorage.getItem("USR_ID"),"","","","","" );
	setObjSelectBoxWithCode("clbkdv_selCallbckActStCd",  "전체", "","CHILD", "90020", ""); // 콜백처리상태 셋팅 
	
	$("#clbkdv_labTotalCnt").html("");
	$("#clbkdv_labRcvCnt").html("");
	$("#clbkdv_labNoDivCnt").html("");
	$("#clbkdv_labDivCnt").html("");
	$("#clbkdv_labNotCompCnt").html("");
	$("#clbkdv_labCompCnt").html("");
}

// init Page
$(document).ready(function()
{
	datePicker("#clbkdv_selFrDate");
	datePicker("#clbkdv_selToDate");
	
	initEvent();
	initControlls();
	initGrid();
});