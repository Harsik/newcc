
//파라미터 셋팅 tbldivUsrList
function getJsonCnsSmsDivUsrList()
{
	// 권한에 따라 셋팅
	var cntrCd = "";
	
	if(window.sessionStorage.getItem("USR_GRD_CD") == "060100" || window.sessionStorage.getItem("USR_GRD_CD") == "090100")
		cntrCd = "";
	else
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMjEuY25zU21zRGl2VXNyTGlzdA==",
		"map" : {
			"key" : "value",
			"srchDtType" : "dt",
			"frDt" : $("#cnsmma_selFrDate").val().replace(/-/gi, ""),
			"toDt" : $("#cnsmma_selToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : parseInt(window.sessionStorage.getItem("USR_GRD_CD")),
			"cntr_cd" : cntrCd
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CallBackList
function getJCnsSmsRcvList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMjEuY25zU21zUmN2TGlzdA==",
		"map" : {
			"key" : "value",
			"srchDtType" : "dt",
			"frDt" : $("#cnsmma_selFrDate").val().replace(/-/gi, ""),
			"toDt" : $("#cnsmma_selToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : parseInt(window.sessionStorage.getItem("USR_GRD_CD")),
			"selUsrId" : $("#cnsmma_selCounselNm").val(),
			"selRcvActStCd" : $("#cnsmma_selRcvActStCd").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅 CallbckListCnt
function getJsonCnsSmsListCnt()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMjEuY25zU21zTGlzdENudA==",
		"map" : {
			"key" : "value",
			"srchDtType" : "dt",
			"frDt" : $("#cnsmma_selFrDate").val().replace(/-/gi, ""),
			"toDt" : $("#cnsmma_selToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : parseInt(window.sessionStorage.getItem("USR_GRD_CD")),
			"selUsrId" : $("#cnsmma_selCounselNm").val(),
			"selRcvActStCd" : $("#cnsmma_selRcvActStCd").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/* 90020
010000	접수
011000	할당
012000	회수
020000	처리중
030000	처리완료
030100	해결
 */
// 회수 이벤트
function getJsonReleaseCnsSms(cnsSmsIds)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMjEudXBkYXRlQ25zU21zTGlzdA==",
		"map" : {
			"key" : "value",
			"cnsSmsIds" : cnsSmsIds,
			"rcv_act_st_cd" : "012000",
			"releaseYn" : "Y"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 삭제 이벤트 : 상태값(해결:030100), 사용여부:N
function getJsonDeleteCnsSms(cnsSmsIds)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMjEudXBkYXRlQ25zU21zTGlzdA==",
			"map" : {
				"key" : "value",
				"cnsSmsIds" : cnsSmsIds,
				"rcv_act_st_cd" : "030100",
				"use_yn" : "N"
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



// 각 그리드 reload
function reloadGrid()
{
	$("#cnsmma_tblcnsSmaRcvList").jqGrid("setGridParam", {postData : {pJson : getJCnsSmsRcvList()}, page : 1, sortname : "CH_SND_ID", sortorder : "desc"});
	$("#cnsmma_tblcnsSmaRcvList").trigger("reloadGrid");
	
	$("#cnsmma_tbldivUsrList").jqGrid("setGridParam", {postData : {pJson : getJsonCnsSmsDivUsrList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#cnsmma_tbldivUsrList").trigger("reloadGrid");
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
	// 체크된 문자수신건 가져와 콜백ID 저장
	var checkedDatas = $("#cnsmma_tblcnsSmaRcvList").getRowData();
	var cnsSmsIds = [];
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].RD_YN == "1" && (checkedDatas[i].RCV_ACT_ST_CD == "011000" || checkedDatas[i].RCV_ACT_ST_CD == "020000"))
			cnsSmsIds.push(checkedDatas[i].CH_SND_ID);
	}
	
	if(cnsSmsIds.length < 1)
	{
		alert("선택 하신 문자수신건 중 회수 가능한 문자수신건이 존재하지 않습니다.\n\n- 회수가능상태 : 할당, 처리중");
		return;
	}
	else
	{
		
		// 체크된 문자수신건 회수 처리
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/counsel/updateReleaseCnsSms.do",
			data : "pJson=" + getJsonReleaseCnsSms(cnsSmsIds),
			success : function(data)
			{
				reloadGrid();
				
				alert("선택한 문자수신건 중 회수가능한 " + cnsSmsIds.length + " 건의 문자수신건이 회수 되었습니다.");
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
	// 체크된 문자수신건 가져와 콜백ID 저장
	var checkedDatas = $("#cnsmma_tblcnsSmaRcvList").getRowData();
	var cnsSmsIds = [];
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].RD_YN == "1")
			cnsSmsIds.push(checkedDatas[i].CH_SND_ID);
	}
	
	if(cnsSmsIds.length < 1)
	{
		alert("선택 하신 문자수신건 중 삭제 가능한 문자수신건이 존재하지 않습니다");
		return;
	}
	else
	{
		// 체크된 문자수신건 삭제 처리
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/counsel/deleteCnsSms.do",
			data : "pJson=" + getJsonDeleteCnsSms(cnsSmsIds),
			success : function(data)
			{
				reloadGrid();
				
				alert("선택한 문자수신건 중 삭제가능한 " + cnsSmsIds.length + " 건의 문자수신건이 삭제 되었습니다.");
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
	// 체크된 문자수신건 가져와 콜백ID 저장
	var checkedDatas = $("#cnsmma_tblcnsSmaRcvList").getRowData();
	var cnsSmsIds = [];
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].RD_YN == "1" && (checkedDatas[i].RCV_ACT_ST_CD == "010000" || checkedDatas[i].RCV_ACT_ST_CD == "012000"))
			cnsSmsIds.push(checkedDatas[i].CH_SND_ID);
	}
	
	// 분배 대상 건 체크
	if(cnsSmsIds.length < 1)
	{
		alert("선택 하신 문자수신건중 중 분배 가능한 분자수신건이 존재하지 않습니다.\n\n- 분배가능상태 : 접수, 회수");
		return;
	}
	
	// 체크된 사용자 가져와 사용자ID 저장
	var checkedUsers = $("#cnsmma_tbldivUsrList").getRowData();
	var usrIds = [];
	
	for(var i = 0 ; i < checkedUsers.length; i++)
	{
		if(checkedUsers[i].RD_YN == "1")
			usrIds.push(checkedUsers[i].USR_ID);
	}

	// 분배 대상 상담사 체크
	if(usrIds.length < 1)
	{
		alert("분배할 상담사을 선택 해 주세요.");
		return;
	}
	
	// 선택된 상담사에게 선택된 문자수신건을 균등분배
	var j = 0;
	var pList = [];
	
	for(var i = 0; i < cnsSmsIds.length; i++)
	{
		pList.push({"qt" : "dXBkYXRl",
			"mi" : "Y2gwMjEudXBkYXRlQ25zU21zRGl2",
			"map":	{
					 "ch_snd_id" : cnsSmsIds[i],
					 "rcv_div_usr_id" : usrIds[j++],
					 "rcv_act_st_cd" : "011000"		
		}});
		
		if(j >= usrIds.length)
			j = 0;
	}
	
	// 할당 요청
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateCnsSmsDiv.do",
		data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
		success : function(data)
		{
			reloadGrid();
			
			alert("선택한 문자수신건 중 분배가능한 " + cnsSmsIds.length + " 건의 문자수신건이 분배 되었습니다.");
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
	var tblLength = $("#cnsmma_tblcnsSmaRcvList").getGridParam("reccount");
	
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#cnsmma_tblcnsSmaRcvList").getCell(i, "RD_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++)
		$("#cnsmma_tblcnsSmaRcvList").setCell(i, "RD_YN", selectVal);
}

// 전체 선택 해제 함수_상담사목록
function divUsrListSelectAll_clickEvent()
{
	var selectVal = "0";
	var tblLength = $("#cnsmma_tbldivUsrList").getGridParam("reccount");
	
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#cnsmma_tbldivUsrList").getCell(i, "RD_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++)
		$("#cnsmma_tbldivUsrList").setCell(i, "RD_YN", selectVal);
}

// 그리드 초기화
function initGrid()
{
	// 콜백목록 그리드
	$("#cnsmma_tblcnsSmaRcvList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/cnsSmsRcvList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJCnsSmsRcvList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["수신ID", "선택", "접수일시", "발신자번호", "분배일시", "처리상태코드", "처리상태", "RCV_DIV_USR_ID", "상담사"],
	   	colModel :
	   	[
	   	 	{ name : "CH_SND_ID", index : "CH_SND_ID", hidden : true },
	   	 	{ name : "RD_YN", index : "RD_YN", formatter : 'checkbox', editoptions : {value : "1:0", defaultVaule : "0"}, formatoptions : {disabled:false}, width : 30, align : "center", sortable : false},
			{ name : "RCV_DTM", index : "RCV_DTM", align : "center", width : 90 },
			{ name : "RCVR_CNTCT_INFM", index : "RCVR_CNTCT_INFM", align : "center", width : 60 },
			
			{ name : "RCV_DIV_DTM", index : "RCV_DIV_DTM", align : "center", width : 80 },
			{ name : "RCV_ACT_ST_CD", index : "RCV_ACT_ST_CD", hidden : true  },
			{ name : "RCV_ACT_ST_NM", index : "RCV_ACT_ST_NM", align : "center", width : 50 },
			{ name : "RCV_DIV_USR_ID", index : "RCV_DIV_USR_ID", hidden : true },			
			{ name : "USR_NM", index : "USR_NM", align : "center", width : 50 },
	   	],
	   	sortname : "CH_SND_ID",
	   	sortorder : "DESC",
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
	   		var rd_yn = $("#cnsmma_tblcnsSmaRcvList").getCell(rowid, "RD_YN");
	   		
	   		if(rd_yn == 1)
	   			$("#cnsmma_tblcnsSmaRcvList").setCell(rowid, "RD_YN", 0);
	   		else
	   			$("#cnsmma_tblcnsSmaRcvList").setCell(rowid, "RD_YN", 1);
	   	},
		gridComplete : function()
	   	{
			// 상단 수치 셋팅
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/counsel/cnsSmsListCnt.do",
				data : "pJson=" + getJsonCnsSmsListCnt(),
				success : function(data)
				{
					if(data != null)
					{
						$("#cnsmma_labTotalCnt").html(data.TOTAL_CNT);
						$("#cnsmma_labRcvCnt").html(data.RCV_CNT);
						$("#cnsmma_labNoDivCnt").html(data.REDIV_CNT);
						$("#cnsmma_labDivCnt").html(data.DIV_CNT);
						$("#cnsmma_labNotCompCnt").html(data.NOTYET_CNT);
						$("#cnsmma_labCompCnt").html(data.COMP_CNT);
					}
					else
					{
						$("#cnsmma_labTotalCnt").html("0");
						$("#cnsmma_labRcvCnt").html("0");
						$("#cnsmma_labNoDivCnt").html("0");
						$("#cnsmma_labDivCnt").html("0");
						$("#cnsmma_labNotCompCnt").html("0");
						$("#cnsmma_labCompCnt").html("0");
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
	$("#cnsmma_tblcnsSmaRcvList_RD_YN").bind("click", callbckListSelectAll_clickEvent);
	
	// 상담사목록
	$("#cnsmma_tbldivUsrList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/cnsSmsDivUsrList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonCnsSmsDivUsrList()
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
			{ name : "DIV_CNT", index : "DIV_CNT", align : "center", width : 60 },
			{ name : "COMP_CNT", index : "COMP_CNT", align : "center", width : 60 },
			{ name : "NOTYET_CNT", index : "NOTYET_CNT", align : "center", width : 60 },
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
	   		var rd_yn = $("#cnsmma_tbldivUsrList").getCell(rowid, "RD_YN");
	   		
	   		if(rd_yn == 1)
	   			$("#cnsmma_tbldivUsrList").setCell(rowid, "RD_YN", 0);
	   		else
	   			$("#cnsmma_tbldivUsrList").setCell(rowid, "RD_YN", 1);
	   	}
	});
	
	// 상단 선택 컬럼 클릭 이벤트 등록
	$("#cnsmma_tbldivUsrList_RD_YN").bind("click", divUsrListSelectAll_clickEvent);
}

// 이벤트 등록
function initEvent()
{
	$("#cnsmma_btnSearch").bind("click", btnSearch_clickEvent);			// 조회 버튼 클릭 이벤트 등록
	$("#cnsmma_btnInit").bind("click", btnInit_clickEvent);				// 초기화 버튼 클릭 이벤트 등록
	$("#cnsmma_btnRelease").bind("click", btnRelease_clickEvent);		// 회수 버튼 클릭 이벤트 등록
	$("#cnsmma_btnDivToUser").bind("click", btnDivToUser_clickEvent);	// 분배 버튼 클릭 이벤트 등록
	$("#cnsmma_btnDelete").bind("click", btnDelete_clickEvent);	// 삭제 버튼 클릭 이벤트 등록
}

// 각 컨트롤 초기화
function initControlls()
{
	$("#cnsmma_selFrDate").val(getPrevDate());
	$("#cnsmma_selToDate").val(getDate());
			
	setObjSelectBoxWithCode("cnsmma_selRcvActStCd", "전체", "","CHILD", "90020", "");	// 처리상태 셋팅
	setSelectBoxWithAgent("cnsmma_selCounselNm", "전체", "CHILD","","","","","","" );
	
	
	$("#cnsmma_labTotalCnt").html("");
	$("#cnsmma_labRcvCnt").html("");
	$("#cnsmma_labNoDivCnt").html("");
	$("#cnsmma_labDivCnt").html("");
	$("#cnsmma_labNotCompCnt").html("");
	$("#cnsmma_labCompCnt").html("");
}

// init Page
$(document).ready(function()
{
	datePicker("#cnsmma_selFrDate");
	datePicker("#cnsmma_selToDate");
	
	initEvent();
	initControlls();
	initGrid();
});