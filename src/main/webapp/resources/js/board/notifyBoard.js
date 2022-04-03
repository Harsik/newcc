﻿//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var g_tbbsStrtDt = "";
var g_tbbsEndDt = "";

var currRowid = "";
var currTbbsId = "";
var isModComm = false;

var g_rowId = "";
var g_showNoticeFlag = false;
var ShowAll="";
var parentboard="notify";


var g_tbbs_id="";
var g_teamCds="";

var sysCds="";
//파라미터셋팅 nofifyList
function getJsonStrSelectNotifyList(srchtype, srchval, tbbsStrtDt, tbbsEndDt) {
    //manager급 이상 모두 출력
    if(window.sessionStorage.getItem("USR_GRD_CD") >= 030100){
	ShowAll ="all";
    }
   var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"tbbs_strt_dt" : tbbsStrtDt,
			"tbbs_end_dt" : tbbsEndDt,
			"tbbs_cl_cd_one" : "020100", 
			"tbbs_cl_cd_two" : "050100", 
			"usr_grd_cd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"showAll" : ShowAll
		}
	};	
   	if($("#ntfBrd_deptDivision").val() == 'all'){
   	}else if($("#ntfBrd_deptDivision").val() == 'N'){
   	    loParam['map']['tbbs_cl_cd_one'] = "020100";
   	    loParam['map']['tbbs_cl_cd_two'] = "020100";
   	}else if($("#ntfBrd_deptDivision").val() == 'Y'){
   	   loParam['map']['tbbs_cl_cd_one'] = "050100";
  	   loParam['map']['tbbs_cl_cd_two'] = "050100";
   	}
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 selectNotify
function getJsonStrSelectNotify(tbbsId) {
	var loParam = {
		"qt" :	"c2VsZWN0T25l",
		"mi" : "b20wMTAuc2VsZWN0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 boardAccess
function getJsonStrBoardAccess(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTEuaW5zZXJ0VXBkYXRl",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//2020.02.26
function getJsonStrBoardUpdateInqr(tbbsId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTEudXBkYXRlR2VuZXJhbEJvYXJkSW5xckNudA==",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 deleteNotify
function getJsonStrDeleteNotify(ids) {
	var loParam = {
		"qt" :	"dXBkYXRl",
		"mi" : "b20wMTAudXBkYXRl",
		"map" : {
			"key" : "value",
			"ids" : ids,
			"use_yn" : "N"
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CommentList
function getJsonStrCommentList(tbbsId) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTMuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertComment
function getJsonStrInsertComment(tbbsId) {
	var loParam = {
		"qt" :	"aW5zZXJ0",
		"mi" : "b20wMTMuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"comm_cntn" : $("#ntfBrd_taCommCntn").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectComment
function getJsonStrSelectComment(commId) {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMTMuc2VsZWN0",
		"map" : {
			"key" : "value",
			"comm_id" : commId
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 modifyCommnet
function getJsonStrModifyComment(commId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTMudXBkYXRl",
		"map" : {
			"key" : "value",
			"comm_id" : commId,
			"comm_cntn" : $("#taModCommCntn" + commId).val()
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 deleteComment
function getJsonStrDeleteComment(commId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTMudXBkYXRl",
		"map" : {
			"key" : "value",
			"comm_id" : commId,
			"use_yn" : 'N'
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 fileList
function getJsonNotifyBoardFileList(tbbsId) {		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"orderby": "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 fileDown
function getJsonNotifyBoardFileDown(svr, loc) {		
	var loParam = {
			"svrFilePath" : svr,
			"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//초기화버튼 클릭이벤트
function btnNotifyInitClickEvent() {
	$("#ntfBrd_optSrchtype").val("ttl");
	$("#ntfBrd_tfSrchval").val("");
	//$("#ntfBrd_tfTbbsStrtDt").val("");
	//$("#ntfBrd_tfTbbsEndDt").val("");
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#ntfBrd_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#ntfBrd_tfTbbsEndDt").val(getDate());
	
	g_srchtype = "ttl";
	g_srchval = "";
	g_tbbsStrtDt = $("#ntfBrd_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#ntfBrd_tfTbbsEndDt").val().replace(/-/g,"");
	
	isModComm = false;
	boardContentSlideup();
	$("#ntfBrd_tblNotifyList").trigger("reloadGrid");
} 

//검색 조회버튼 클릭이벤트
function btnNotifySearchClickEvent() {
	g_srchtype = $("#ntfBrd_optSrchtype").val();
	g_srchval = $("#ntfBrd_tfSrchval").val();
	g_tbbsStrtDt = $("#ntfBrd_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#ntfBrd_tfTbbsEndDt").val().replace(/-/g,"");
	
	var rMsg = "";
	if(g_tbbsStrtDt != "" || g_tbbsEndDt != "") {
		if(g_tbbsStrtDt == "") {
			rMsg += "\n시작일자를 입력해주세요.";
		}
		if(g_tbbsEndDt == "") {
			rMsg += "\n종료일자를 입력해주세요.";
		} else {
			var d_tbbsStrtDt = new Date(g_tbbsStrtDt.substr(0, 4), g_tbbsStrtDt.substr(4, 2), g_tbbsStrtDt.substr(6, 2));
			var d_tbbsEndDt = new Date(g_tbbsEndDt.substr(0, 4), g_tbbsEndDt.substr(4, 2), g_tbbsEndDt.substr(6, 2));
			if(d_tbbsStrtDt > d_tbbsEndDt) {
				rMsg += "\n시작일이 종료일보다 큽니다.";
			}
		}
	}
	
	if(rMsg != "") {
		alert(rMsg);
		return;
	}
	
	//reload grid
	$("#ntfBrd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "TBBS_ID", sortorder : "desc"});
	$("#ntfBrd_tblNotifyList").trigger("reloadGrid");
}

//게시물 삭제버튼 클릭이벤트
function btnDeleteMainNotifyClickEvent()
{
	//체크된 row들의 array
	var rows = $("#ntfBrd_tblNotifyList").jqGrid("getGridParam", "selarrrow");
	
	//체크확인
	if(rows == null || rows.length <= 0)
	{
		alert("선택된 게시글이 없습니다.");
		return;
	}
	
	var deleteCivil=false;
	for(var i = 0; i < rows.length; i++)
	{
		var row = $("#ntfBrd_tblNotifyList").getRowData(rows[i]);
		if(row.TBBS_GB_CD=="050100"){
		    deleteCivil=true;
		}
	}
	
	if(deleteCivil){
	    alert("공무원공지는 삭제할수 없습니다.");
	    return;
	}
	
	
	if(confirm("선택된 게시글을 삭제하시겠습니까?"))
	{
		var ids = new Array();
		for(var i = 0; i < rows.length; i++)
		{
			var row = $("#ntfBrd_tblNotifyList").getRowData(rows[i]);
			ids[i] = row.TBBS_ID;
		}
	
		g_tbbsStrtDt = $("#ntfBrd_tfTbbsStrtDt").val().replace(/-/g,"");
		g_tbbsEndDt = $("#ntfBrd_tfTbbsEndDt").val().replace(/-/g,"");			
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteNotify.do",
			data : "pJson=" + getJsonStrDeleteNotify(ids),
			success : function(data)
			{
				//reload grid
				$("#ntfBrd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
				$("#ntfBrd_tblNotifyList").trigger("reloadGrid");
				
				//reloadNoticeBar();
				
				alert("삭제되었습니다.");
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//조회중인 게시물 삭제버튼 클릭이벤트
function btnCntnDeleteClickEvent()
{
	if(confirm("게시물을 삭제하시겠습니까?"))
	{
		var tbbsIdArr = [currTbbsId];
		
		g_tbbsStrtDt = $("#ntfBrd_tfTbbsStrtDt").val().replace(/-/g,"");
		g_tbbsEndDt = $("#ntfBrd_tfTbbsEndDt").val().replace(/-/g,"");		
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteNotify.do",
			data : "pJson=" + getJsonStrDeleteNotify(tbbsIdArr),
			success : function(data)
			{
				//reload grid
				$("#ntfBrd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
				$("#ntfBrd_tblNotifyList").trigger("reloadGrid");
				
				boardContentSlideup();
				
				reloadNoticeBar();
				
				alert("삭제되었습니다.");
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}


//게시물 등록버튼 클릭이벤트
function btnInsertMainNotifyClickEvent()
{
	// 2016.11.15 jghwang 에디터 교체로 인한 화면사이즈 조정
	var width = 1020;
	var height = 895;
	//var top = window.screenTop + (screen.height - height) / 2;
	//var left = window.screenLeft + (screen.width - width) / 2;
/*	
	var width = 1020;
	var height = 895;
*/	
	window.sessionStorage.setItem("BOARD_TYPE", "020100.insert");
	
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;	
	
	var paramURL = getContextPath() + "/web/board/notifyForm.do";
	var newWindow = window.open(paramURL, "공지게시판 등록", "resizable");
	newWindow.moveTo(left, top);
	newWindow.resizeTo(width,height);
	newWindow.focus();
}

//게시물 수정버튼 등록이벤트
function btnCntnModifyClickEvent()
{
	// 2016.11.15 jghwang 에디터 교체로 인한 화면사이즈 조정
	var width = 1020;
	var height = 895;
	
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;	
	
	window.sessionStorage.setItem("BOARD_TYPE", "020100.modify");
	window.sessionStorage.setItem("TBBS_ID", currTbbsId);
	
	var paramURL = getContextPath() + "/web/board/notifyForm.do";
	var newWindow = window.open(paramURL, "공지게시판 수정", "resizable");
	newWindow.moveTo(left, top);
	newWindow.resizeTo(width,height);
	newWindow.focus();
}

//덧글 가져오기
function showComments(tbbsId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/commentList.do",
		data : "pJson=" + getJsonStrCommentList(tbbsId),
		success : function(data)
		{
			//댓글테이블 초기화
			$("#ntfBrd_tblComments").empty();
			
			//댓글삽입
			for(var i in data)
			{
				var node = "<tr><td><ul>";
				node += "<li>" + data[i].USR_NM + "<img src='/resources/images/line.png' alt='라인' /></li>";
				node += "<li>" + data[i].MOD_DT_FORMAT + "&nbsp;" + data[i].MOD_TM_FORMAT + "</li>";
				
				if(data[i].IS_OWN === 'Y')
				{
					node += "<li class='c_btn'><div id='commOpt" + data[i].COMM_ID + "'>";
					node += "<img src='/resources/images/btn_add4.png' style='cursor: pointer;' alt='수정' class='icon_cal' id='mod" +
							data[i].COMM_ID + "' onClick='modifyCommentClickEvent(" +data[i].COMM_ID + ");' />";
					node += "<img src='/resources/images/btn_del.png' style='cursor: pointer; margin-left: 5px;' alt='삭제' class='icon_cal' id='del" + 
							data[i].COMM_ID + "' onClick='deleteCommentClickEvent(" +data[i].COMM_ID + ");'/></li>";
				}
				
				node += "</ul>";
				node += "<ul><li class='c_text'><div id='commCntn" + data[i].COMM_ID + "'>" + 
						data[i].COMM_CONT + "</li></div></ul></td></tr>";
				node += "</tr><td><ul><li class='line'></li></ul></td></tr>";
				
				$("#ntfBrd_tblComments").append(node);
			}
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}
//덧글 저장버튼 클릭이벤트
function btnInsertCommentClickEvent()
{
	var commCntn = $("#ntfBrd_taCommCntn").val();
	
	if(commCntn === null || commCntn.trim().length <= 0)
	{
		alert("댓글 내용이 없습니다.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/insertComment.do",
		data : "pJson=" + getJsonStrInsertComment(currTbbsId),
		success : function(data)
		{
			//현재 보고있는 게시물ID 가져오기
			showComments(currTbbsId);
			
			$("#ntfBrd_taCommCntn").val("");
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//댓글 수정 클릭이벤트
function modifyCommentClickEvent(commId)
{
	//댓글 수정중인지 체크
	if(isModComm)
		return;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectComment.do",
		data : "pJson=" + getJsonStrSelectComment(commId),
		success : function(data)
		{
			var node = "<td><ul>";
			node += "<li style='width: 762px; float: left;'><textarea id='taModCommCntn" + data.COMM_ID + "' class='area_ol_comm' style='overflow: hidden;'></textarea></li>";
			node += "<li style='float: left; margin-left: 25px; width: 90px;'>";
			node += "<img src='/resources/images/btn_save2.png' style='cursor: pointer;' onClick='btnModifyCommentClickEvent(" + data.COMM_ID + ")' />"; 
			node += "<img src='/resources/images/btn_cancel.png' style='cursor: pointer; margin-left: 5px' onClick='cancelModifyCommentClickEvent()' /></li>";
			node += "</ul></td>";
			
			$("#commCntn" + data.COMM_ID).parent().parent().parent().parent().empty().append(node);
			
			$("#taModCommCntn" + data.COMM_ID).val(data.COMM_CONT);
			
			isModComm = true;
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//덧글 수정버튼 클릭이벤트
function btnModifyCommentClickEvent(commId)
{
	var commCntn = $("#taModCommCntn" + commId).val();
	
	if(commCntn === null || commCntn.trim().length <= 0)
	{
		alert("댓글 내용이 없습니다.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectComment.do",
		data : "pJson=" + getJsonStrModifyComment(commId),
		success : function(data)
		{
			showComments(currTbbsId);
			
			isModComm = false;
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//덧글 수정취소 클릭이벤트
function cancelModifyCommentClickEvent()
{
	//현재 보고있는 게시물ID 가져오기
	if(isModComm)
	{
		showComments(currTbbsId);
		isModComm = false;
	}
}

//덧글 삭제 클릭이벤트
function deleteCommentClickEvent(commId)
{
	if(confirm("댓글을 삭제하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteComment.do",
			data : "pJson=" + getJsonStrDeleteComment(commId),
			success : function(data)
			{
				showComments(currTbbsId);
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//목록보기버튼 클릭이벤트
function btnShowNotifyClickEvent()
{
	boardContentSlideup();
}

//게시물 슬라이드업
function boardContentSlideup()
{
	$("#board_content").slideUp(function()
	{
		currRowid = "";
		currTbbsId = "";
		initBoardContent();
		
		var BoardPage= $("#input_pgNotifyList input").val();
		//reload grid
		$("#ntfBrd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : BoardPage, sortname : "TBBS_ID", sortorder : "desc"});
//		$("#ntfBrd_tblNotifyList").trigger("reloadGrid");
		
	});
}

//게시물 슬라이드다운
function boardContentSlidedown(rowid)
{
	$("#board_content").slideDown(function()
	{
		currRowid = rowid;
		currTbbsId = $("#ntfBrd_tblNotifyList").getRowData(currRowid).TBBS_ID;
		var BoardPage= $("#input_pgNotifyList input").val();
		//reload grid
		$("#ntfBrd_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : BoardPage, sortname : "TBBS_ID", sortorder : "desc"});
//		$("#ntfBrd_tblNotifyList").trigger("reloadGrid");
	});
}
	
//게시물 내용 초기화
function initBoardContent()
{
	$("#ntfBrd_sTbbsTtl").empty();
	$("#ntfBrd_pCommNum").empty();
	$("#ntfBrd_sEmrgYN").empty();
	$("#ntfBrd_sTbbsStrtDt").empty();
	$("#ntfBrd_sTbbsEndDt").empty();
	$("#ntfBrd_sUsrNm").empty();
	$("#sTbbsInQrCnt").empty();
	$("#sCrtDt").empty();
	$("#sCrtTm").empty();
	$("#ntfBrd_dTbbsCntn").empty();
	$("#ntfBrd_fileInfos").empty();
	
	$("#ntfBrd_tblComments").empty();
	$("#ntfBrd_taCommCntn").val("");
}

//게시물을 화면에 표시
function showBoardContents(tbbsId)
{
	initBoardContent();
	
	$.ajax({
		type : "post",
    	dataType : "json",
    	async : true,
    	url : getContextPath() + "/ajax/board/boardAccess.do",
		data : "pJson=" + getJsonStrBoardUpdateInqr(tbbsId),
    	success : function(data){
	
			//게시물 조회시 조회수 업데이트
		    $.ajax({
		    	type : "post",
		    	dataType : "json",
		    	async : true,
		    	url : getContextPath() + "/ajax/board/boardAccess.do",
				data : "pJson=" + getJsonStrBoardAccess(tbbsId),
		    	success : function(data)
		    	{
		    		//게시물 가져오기
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/board/selectNotify.do",
						data : "pJson=" + getJsonStrSelectNotify(tbbsId),
						success : function(data)
						{
							$("#ntfBrd_sTbbsTtl").html(data.TBBS_TTL);
							$("#ntfBrd_sEmrgYN").html(data.EMRG_YN);
							$("#ntfBrd_sTbbsStrtDt").html(data.TBBS_STRT_DT_FORMAT);
							$("#ntfBrd_sTbbsEndDt").html(data.TBBS_END_DT_FORMAT);
							$("#ntfBrd_sUsrNm").html(data.MOD_USR_NM);
							$("#sTbbsInQrCnt").html(data.TBBS_INQR_CNT);
							$("#ntfBrd_sModDt").html(data.MOD_DT_FORMAT);
							$("#sModTm").html(data.MOD_TM_FORMAT);
							
							$("#ntfBrd_dTbbsCntn").html(data.TBBS_CNTN);
		
							if(data.COMM_NUM !== 0) 
								$("#ntfBrd_pCommNum").html("[" + data.COMM_NUM + "]");
							
						},
						error : function(data, status, err)
						{
							networkErrorHandler(data, status, err);
						}
					});
					
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/board/notifyBoardFileList.do",
						data : "pJson=" + getJsonNotifyBoardFileList(tbbsId),
						success : function(data)
						{
							if(data != null && data != "") {
								var tr ="<tr><th style='width: 80%;'>첨부파일이름</th>" +"<th style='width: 20%;'>용량</th></tr>";
		    					for(var i in data) {
		    						var url = getContextPath() 
		    						+ "/file/board/notiftyBoardFileDown.do?pJson=" + getJsonNotifyBoardFileDown(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
		    						tr += "<tr>";
		    						tr += "<td><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></td>";
		    						tr += "<td><span>" + data[i].FL_KB_SZ + " kb</span></td>";
		    						tr += "</tr>";
		    					}
		    					$("#ntfBrd_fileInfos").append(tr);
							}
						},
						error : function(data, status, err)
						{
							
						}
		    		});
					
					window.sessionStorage.removeItem("notice_tbbs_id");
		    	},
		    	error : function(data, status, err)
		    	{
		    		networkErrorHandler(data, status, err);
		    	}
		    });
    
    	},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
    
	showComments(tbbsId);
	
	if(g_rowId != "")
		boardContentSlidedown(g_rowId);
	else
		$("#board_content").slideDown();
	
	$("#pop_body").animate({ scrollTop: 0 }, "fast");
	
	opener.sessionStorage.removeItem("notice_tbbs_id");
}

function getJsonSysCodes()
{
		var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuY29kZWxpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : "90003",
				"notuse" : false
			}
		};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
$(document).ready(function()
{
	
	var isMngr = false;
	var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

	if(usrGrdCd != null && usrGrdCd != "")
	{
		if(usrGrdCd >= "030100")
			isMngr = true;
		else
			isMngr = false;
		
	}
	
	datePicker("#ntfBrd_tfTbbsStrtDt");
	datePicker("#ntfBrd_tfTbbsEndDt");
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#ntfBrd_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#ntfBrd_tfTbbsEndDt").val(getDate());	
	
	g_tbbsStrtDt = $("#ntfBrd_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#ntfBrd_tfTbbsEndDt").val().replace(/-/g,"");		
	
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : false,
	    url : getContextPath() + "/ajax/board/getSysCodes.do",
	    data : "pJson=" + getJsonSysCodes(),
	    success : function(data)
	    {
	    	sysCds=data;
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});	
	
	$("#ntfBrd_tblNotifyList").jqGrid({
		url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["게시물구분코드","번호","부서구분","부서명", "긴급여부", "제목", "작성자", "시작일시", "종료일시", "작성일시", "첨부파일", "조회수",],
		colModel : [
		            { name : "TBBS_GB_CD", index : "TBBS_GB_CD", width : 100, align: "center", hidden : true},
		            { name : "TBBS_ID", index : "TBBS_ID", width : 100, align: "center", hidden : true},
		            { name : "TBBS_GB_CD_NM", index : "TBBS_GB_CD_NM", width : 80, align: "center",
		            cellattr: function ( rowId , tv , rowObject , cm , rdata){
		        	if(rowObject.TBBS_GB_CD_NM =="공무원공지"){return 'style="color:red;"' }
		            }, 
		            formatter: function (cellvalue, options, rowobj) {
		        	if(rowobj.TBBS_GB_CD_NM =="공무원공지")
		        	    var str=rowobj.NOTIFY =='0'?'공무원공지(N)':'공무원공지(Y)';
		        	else str ='콜센터공지';
		        	return str;
		            }
		            },
		            { name : "CNTR_NM", index : "CNTR_NM", width : 85, align: "center" },
		            { name : "EMRG_YN", index : "EMRG_YN", width : 60, align: "center" },
		            { name : "TBBS_TTL", index : "TBBS_TTL", width : isMngr ? 300 : 320 },
		            { name : "MOD_USR_NM", index : "MOD_USR_NM", width : 90, align: "center" },
		            { name : "TBBS_STRT_DT_FORMAT", index : "TBBS_STRT_DT_FORMAT", width : 80, align: "center" },
		            { name : "TBBS_END_DT_FORMAT", index : "TBBS_END_DT_FORMAT", width : 80, align: "center" },
		            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 80, align: "center" },
		            { name : "FL_NUM", index : "FL_NUM", width : 60, align: "center" },
		            { name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", width : 50, align: "center" ,cellattr: function ( rowId , tv , rowObject , cm , rdata){
		            	return 'style="text-decoration: underline;cursor:pointer;"' 
		            } }			
		            ],
        sortname : "TBBS_ID",
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
        pager : "#ntfBrd_pgNotifyList",
        rownumbers : true,
        rownumWidth : 30,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        viewrecords: true,
        subGrid: isMngr ? true : false,
        subGridRowExpanded: function(subgrid_id, row_id) {
            
            var row = $("#ntfBrd_tblNotifyList").getRowData(row_id);
            var teamCds=[];
            var teamNms=[];
			var colname=[];
            var colmodel=[];            
            var mydata = [{}];
            var subgrid_table_id = subgrid_id+"_t";
            $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table>");     
	   
          //게시물 읽기 권한 SETTING
           $.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectAuthList.do",
		data : "pJson=" + getJsonStrSelectAuthList(row.TBBS_ID),
		success : function(data)
		{
			var str = "";
			teamNms.push("전체선택");
			for(var i = 0; i < data.length; i++)
			{
				if(i === data.length - 1)
					str += data[i].CD_NM;
				else
					str += data[i].CD_NM + ", ";

				teamCds.push(data[i].TEAM_CD);
				teamNms.push(data[i].CD_NM);
			}
			teamNms.push("등록");

			 colname.push("전체선택");
			 for(var i=0; i<sysCds.length; i++){
				 colname.push(sysCds[i].CD_NM);
			 }
			 colname.push("등록");
			 
			 for(var i=0; i<teamCds.length; i++){
				 for(var j=0; j<sysCds.length; j++){
					     if(teamCds[i]==sysCds[j].CD) mydata[0]['data'+(j+1)]=1;					     
				 }
			 }
			 
			 //$("#"+subgrid_table_id).jqGrid("setGridParam", {data:mydata, colNames: teamNms}).trigger("reloadGrid");
			 colmodel.push({ name: "total", index: "total", width : 90, align: "center",formatter:function(cellvalue, options, rowobj) {
		        	var rowobjstr = JSON.stringify(rowobj);
		        	var subgridt =JSON.stringify(subgrid_table_id);    
		        	var chk = "<input type='checkbox' id='total' onclick='totalSelect("+row.TBBS_ID+","+rowobjstr+","+subgridt+")'    />";     
		        	     return chk; 
			 }});
			 var l;
			 for(l=1;l<=sysCds.length;l++){
				 colmodel.push({ name: "data"+l, index: "data"+l, width : 90, align: "center",formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}});			            
	         }
			 colmodel.push({ name: "data"+l, index: "data"+l, width : 90, align: "center",formatter:function(cellvalue, options, rowobj){
		        	var rowobjstr = JSON.stringify(rowobj);
		        	var subgridt =JSON.stringify(subgrid_table_id);
			            return "<button type='button' id='btnInsertMainNotify2' onclick='btnInsertMainNotifyClickEvent2("+row.TBBS_ID+","+rowobjstr+","+subgridt+")' class='button'>저장</button>";
			        }});
			 $("#"+subgrid_table_id).empty();
			 $("#"+subgrid_table_id).jqGrid({
	               datatype : "local",
	               data : mydata,
	               //colNames: ["전체선택","일반팀","교육생팀","관리팀","테스트팀","등록"],
	               colNames: colname,
	               colModel : colmodel,
	               height: '100%',
	               width: '100%',
	               cellEdit:true,
	               rowNum:1,
	               sortname: 'TBBS_ID',
	               sortorder: "asc"
	               });   
			 //그룹헤더 추가
	           jQuery("#"+subgrid_table_id).jqGrid('setGroupHeaders', {
	               useColSpanStyle: false, 
	               groupHeaders:[
	             	{startColumnName: 'total', numberOfColumns: sysCds.length+2, titleText: '온누리콜센터 게시물 읽기권한'},
	               ]
	             });
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
       });
        },
        multiselect: isMngr ? true : false,
        beforeSelectRow: function (rowid, e) {  //체크박스를 선택했을때만
        	var $myGrid = $(this);
            i = $.jgrid.getCellIndex($(e.target).closest('td')[0]);
            cm = $myGrid.jqGrid('getGridParam', 'colModel'); 
            return (cm[i].name === 'cb'); 
            },

        onCellSelect : function(rowid, iCol, cellContent, e)
        {

            	var tempiCol=14;
    		if(!isMngr)
    			 tempiCol=12;
            
            	//관리자가 들어와서 클릭할때 
        	var g_usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
        	var row = $("#ntfBrd_tblNotifyList").getRowData(rowid);
        	var uTbbs_listNum = window.sessionStorage.setItem("uTbbs_id",row.TBBS_ID);
        	var uTbbs_listSday= window.sessionStorage.setItem("utbbs_strt_dt",$("#ntfBrd_tfTbbsStrtDt").val());
        	var uTbbs_listEday= window.sessionStorage.setItem("utbbs_end_dt",$("#ntfBrd_tfTbbsEndDt").val());

        	if(row.TBBS_GB_CD=="050100"){
        	    $("#ntfBrd_btnCntnModify").hide();	
        	    $("#ntfBrd_btnCntnDelete").hide();	
        	}else{
        	    $("#ntfBrd_btnCntnModify").show();	
        	    $("#ntfBrd_btnCntnDelete").show();	
        	}
        	
        	if (iCol > 1 && iCol < tempiCol) {
        		$("#ntfBrd_tblNotifyList").jqGrid("setSelection", rowid, false);
        		

        		if(rowid !== currRowid)
        		{
        			g_rowId = rowid;
        			showBoardContents(row.TBBS_ID);
        		}
        		else
        		{
        			boardContentSlideup();
        		}
        	}
        	
        	
        	
        	if(iCol==tempiCol){
    			//gf_openModalDialog("/web/myinfo/myNotifyCountList.do", 420, 370, "no", "no");
        	    gf_openModalDialog("/web/myinfo/myNotifyCountList.do","notify", 400, 385, "no");
        	}
        },
		gridComplete : function()
		{
			var total = $(this).getGridParam("records");
			$("#ntfBrd_pTotal").html("총 " + total + "건");
			
			// 메인 하단에서 클릭 했을 경우
			if(g_showNoticeFlag == false && opener.window.sessionStorage.getItem("notice_tbbs_id") != null && opener.window.sessionStorage.getItem("notice_tbbs_id") != "")
			{
				g_showNoticeFlag = true;
				currTbbsId = opener.window.sessionStorage.getItem("notice_tbbs_id");
				
				showBoardContents(opener.window.sessionStorage.getItem("notice_tbbs_id"));
				
				

			}
		},
        error : function(data, status, err)
        {
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#ntfBrd_pgNotifyList", {edit : false, add : false, del : false, search : false});
	
	//직급에 따라 등록삭제버튼 표시유무
	if(isMngr)
	{
		$("#ntfBrd_divInsrtDel").show();
		$("#divModDel").show();
	}
	else
	{
		$("#ntfBrd_divInsrtDel").hide();
		$("#divModDel").hide();
	}

	//검색 조회버튼 클릭이벤트 등록
	$("#ntfBrd_btnNotifySearch").bind("click", btnNotifySearchClickEvent);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#ntfBrd_tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnNotifySearchClickEvent();
	});
	
	//초기화버튼 클릭이벤트 등록
	$("#ntfBrd_btnNotifyInit").bind("click", btnNotifyInitClickEvent);
	//게시물 삭제버튼 클릭이벤트 등록
	$("#ntfBrd_btnDeleteMainNotify").bind("click", btnDeleteMainNotifyClickEvent);
	//게시물 등록버튼 클릭이벤트 등록
	$("#ntfBrd_btnInsertMainNotify").bind("click", btnInsertMainNotifyClickEvent);
	//게시물 수정버튼 클릭이벤트 등록
	$("#ntfBrd_btnCntnModify").bind("click", btnCntnModifyClickEvent);
	//조회중인 게시물 삭제버튼 클릭이벤트 등록
	$("#ntfBrd_btnCntnDelete").bind("click", btnCntnDeleteClickEvent);
	//목록보기버튼 클릭이벤트 등록
	$("#btnShowNotify").bind("click", btnShowNotifyClickEvent);
	//덧글 등록버튼 클릭이벤트 등록
	$("#ntfBrd_btnInsertComm").bind("click", btnInsertCommentClickEvent);

	
	
});

function totalSelect(TBBS_ID,rowobjstr,subgridt){
    var row = $('#'+subgridt).getRowData(1);
    if($("#total").prop("checked")){
    	for(var i=1;i<=sysCds.length;i++){
    		$("#"+subgridt).jqGrid('setCell', 1, 'data'+i, '1');
    	}
    }else{
    	for(var i=1;i<=sysCds.length;i++){
    		$("#"+subgridt).jqGrid('setCell', 1, 'data'+i, '0');
    	}
    }
}

//게시물 등록버튼 클릭이벤트
function btnInsertMainNotifyClickEvent2(tbbsId, rowobjstr, subgridt)
{
    var row = $('#'+subgridt).getRowData(1);
    var teamcd=[];
    
	for(var i=0;i<sysCds.length;i++){
	    if(row["data"+(i+1)]=='1') teamcd.push(sysCds[i].CD);
	}
    
    if (confirm("게시글을 수정 하시겠습니까?"))
    {
	//게시물열람정보 삭제
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : false,
	    url : getContextPath() + "/ajax/board/deleteAuth.do",
	    data : "pJson=" + getJsonStrDeleteAuth(tbbsId),
	    success : function(data)
	    {
		//새 게시물열람기본 권한정보 등록
		for(var i = 0; i < teamcd.length; i++)
		{
		    $.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/insertAuth.do",
			data : "pJson=" + getJsonStrInsertAuth(tbbsId, teamcd[i]),
			success : function(data)
			{
			    console.log(i + "번째 정보 등록!!"); 
			},
			error : function(data, status, err)
			{
			    networkErrorHandler(data, status, err);
			}
		    });
		}
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});
	$("#ntfBrd_tblNotifyList").trigger("reloadGrid");
    }

}
//파라미터셋팅 deleteAuth
function getJsonStrDeleteAuth(tbbsId) {
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wMTIuZGVsZXRl",
		"map" : {
			"tbbs_id" : tbbsId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 insertAuth
function getJsonStrInsertAuth(tbbsId, teamCd) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTIuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"team_cd" : teamCd,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}


function getJsonStrSelectAuthList(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTIuc2VsZWN0TGlzdA==",
		"map" : {
			"tbbs_id" : tbbsId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
	}

