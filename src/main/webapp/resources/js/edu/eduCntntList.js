// 조회 조건 및 조회 값
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");		//권한

// 파라미터 셋팅 CntntList 교육콘텐츠 리스트 조회
function getJsonStrCntntList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuZWR1Q250bnRMaXN0",
		"map" : {
			"key" : "value",
			"cdb_gb_cd" : $("#srchGubun").val(),
			"team_nm" : $("#srchTeam").val(),
			"tbbs_ttl" : $("#srchTtl").val(),
			"usrGrdCd" : usrGrdCd				//권한(관리자, 상담사)
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅 CntntList 교육콘텐츠 삭제
function getJsonStrCntntListDelete(ids)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wMTAudXBkYXRl",
			"map" : {
				"key" : "value",			
				"ids" : ids,
				"use_yn" : "N",
			}
		};	
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{	
	$("#tblCntntList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCntntList()}, page : 1, sortname : "MOD_DT", sortorder : "desc"});
	$("#tblCntntList").trigger("reloadGrid");

}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	initVar();	//변수초기화
	
	$("#srchGubun").val("all");
	$("#srchTeam").val("all");
	$("#srchTtl").val("");
	
	$("#btnInsert").show();
	
	$("#tblCntntList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCntntList()}, page : 1, sortname : "MOD_DT", sortorder : "desc"});
	$("#tblCntntList").trigger("reloadGrid");

}

//교육콘텐츠 등록버튼 클릭이벤트
function btnInsert_clickEvent()
{	
	var width = 1020;
	var height = 870;
	
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;	
	
	var paramURL = getContextPath() + "/web/edu/eduCntntDtl.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	$("#boardType").val("92022.insert");	//게시물구분 (92022)
	$("#eduTbbsId").val("");				//게시판ID
	$("#eduCdbGbCd").val("");				//게시물구분 (1:평가문제지, 2:교육자료)
	$("#eduTeamNm").val("");				//대상팀
   		
	//window.sessionStorage.setItem("BOARD_TYPE", "92022.insert");
	
	var newWindow = window.open(paramURL, "교육콘텐츠 등록", option);
	newWindow.focus();
}

//교육콘텐츠 삭제버튼 클릭이벤트
function btnDelete_ClickEvent()
{
	// 체크된 콘텐츠 가져와 use_yn ='N' 저장
	var checkedDatas = $("#tblCntntList").getRowData();
	var ids = [];
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].TRGT_YN == "1")
			ids.push(checkedDatas[i].TBBS_ID);
	}
	
	if(ids.length < 1)
	{
		alert("교육콘텐츠를 선택해주세요");
		return;
	}
	else
	{
		// 체크된 콜백건 회수 처리
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/edu/eduCntntListDelete.do",
			data : "pJson=" + getJsonStrCntntListDelete(ids),
			success : function(data)
			{
				$("#tblCntntList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCntntList()}, page : 1, sortname : "MOD_DT", sortorder : "desc"});
				$("#tblCntntList").trigger("reloadGrid");
				
				alert("선택한 교육콘텐츠 중 " + ids.length + " 건의 교육콘텐츠가 삭제 되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	
/*	var rowNum = $("#tblCntntList").getGridParam("rowNum");
	var currentPageNum = $("#tblCntntList").getGridParam("page");
	var gRowLength = $("#tblCntntList").getGridParam("reccount");
	
	var trgt_Cnt = 0;
	
	for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
	{	
		var currentRowCnt = $("#tblCntntList").getRowData(i);
		if(jQuery.isEmptyObject(currentRowCnt))
			continue;
				
		if(currentRowCnt.TRGT_YN == "1")
			trgt_Cnt = trgt_Cnt + 1;
	}
	
	if (trgt_Cnt == 0) {
		alert("교육콘텐츠를 선택해주세요.");
		return;		
	}
	
	if(confirm("교육콘텐츠를 삭제 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#tblCntntList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var sTbbs_Id = currentRow.TBBS_ID;
			
			if(currentRow.TRGT_YN == "1")
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/edu/eduCntntListDelete.do",
					data : "pJson=" + getJsonStrCntntListDelete(sTbbs_Id),
					success : function(data)
					{
						$("#tblCntntList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCntntList()}, page : 1, sortname : "MOD_DT", sortorder : "desc"});
						$("#tblCntntList").trigger("reloadGrid");
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
		}

	}*/
	
}

//initVar
function initVar()
{
	$("#boardType").val("");	//게시물구분 (92022)
	$("#eduTbbsId").val("");	//게시판ID
	$("#eduCdbGbCd").val("");	//게시물구분 (1:평가문제지, 2:교육자료)
	$("#eduTeamNm").val("");	//대상팀
}

//initData()
function initData()
{
	//setSelectBoxWithCode("srchGubun","전체","92022", "", "", "all");		
	//setSelectBoxWithCode("srchCntr", "전체", "90002", "", "", window.sessionStorage.getItem("CNTR_CD"));
	setSelectBoxWithCode("srchTeam", "전체", "90003", "", "", window.sessionStorage.getItem("TEAM_CD"));
	
	if(usrGrdCd == "010100")
	{
		setSelectBoxWithCode("srchGubun","전체","92022", "", "", "2");		//상담사는 교육자료만 조회
		$("#srchGubun").prop("disabled", true);
		$("#srchTeam").prop("disabled", true);
		$("#btnInsert").hide();		
		$("#btnDelete").hide();
	}
	else
	{
		setSelectBoxWithCode("srchGubun","전체","92022", "", "", "all");				
		$("#srchGubun").prop("disabled", false);
		$("#srchTeam").prop("disabled", false);
		$("#btnInsert").show();	
		$("#btnDelete").show();
	}
}

//init Event()
function initEvent()
{
	// 조회 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", btnInit_clickEvent);
	// 추가 버튼 클릭 이벤트 등록
	$("#btnInsert").bind("click", btnInsert_clickEvent);	
	// 삭제 버튼 클릭 이벤트 등록
	$("#btnDelete").bind("click", btnDelete_ClickEvent);
}

// init Page
$(document).ready(function()
{
	
	initEvent();
	initData();
	initVar();
	
	//$("#btnInsert").show();
	
	$("#tblCntntList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/edu/cntntlist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCntntList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["선택", "제목", "구분", "대상자", "등록일자", "구분코드", "ID", "팀코드"],
	   	colModel :
	   	[
	   	 	{ name : "TRGT_YN", index : "TRGT_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 20, resizable: false, sortable : false },
	   	 	{ name : "TBBS_TTL", index : "TBBS_TTL", width : 200, align : "left" },
			{ name : "CDB_GB_NM", index : "CDB_GB_NM", width : 100, align : "center" },
			{ name : "TEAM_NM", index : "TEAM_NM", width : 100, align : "center" },
			{ name : "MOD_DT", index : "MOD_DT", width : 100, align : "center" },
			{ name : "CDB_GB_CD", index : "CDB_GB_CD", hidden:true },
			{ name : "TBBS_ID", index : "TBBS_ID", hidden:true },
			{ name : "TEAM_CD", index : "TEAM_CD", hidden:true }
	   	],
	   	sortname : "MOD_DT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "450",
	   	width : "100%",
	   	rowNum : 15,
	   	rowList : [15, 30, 50, 70, 100],
	   	autowidth : true,
	   	pager : "#pgCntntList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{

	   	},
	   	ondblClickRow : function(rowid)
	   	{
	   		
	   		var row = $("#tblCntntList").getRowData(rowid);
	   		var width = 1020;
	   		var height = 870;
	   		var top = (screen.height - height) / 2;
	   		var left = (screen.width - width) / 2;	
	   		
	   		var paramURL = getContextPath() + "/web/edu/eduCntntDtl.do";
	   		var option = "width=" + width + ", height=" + height 
	   			+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
	   			+ top + ",left=" + left +"";
	   		
	   		$("#boardType").val("92022.modify");	//게시물구분 (92022)
	   		$("#eduTbbsId").val(row.TBBS_ID);		//게시판ID
	   		$("#eduCdbGbCd").val(row.CDB_GB_CD);	//게시물구분 (1:평가문제지, 2:교육자료)
	   		$("#eduTeamNm").val(row.TEAM_CD);		//대상팀
	   		
/*	   		window.sessionStorage.setItem("BOARD_TYPE", "92022.modify");
	   		window.sessionStorage.setItem("TBBS_ID", row.TBBS_ID);
	   		window.sessionStorage.setItem("EDU_TEAM", row.TEAM_NM);
	   		window.sessionStorage.setItem("EDU_GB_CD", row.CDB_GB_CD);*/
	   		
	   		var newWindow = window.open(paramURL, "교육콘텐츠 수정", option);
	   		newWindow.focus();
	   	},	   	
	   	onPaging : function(pgButton)
	   	{	   		

	   	}
	}).jqGrid("navGrid", "#pgCntntList", {edit : false, add : false, del : false, search : false});


});