//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var g_tbbsStrtDt = "";
var g_tbbsEndDt = "";

var currRowid = "";
var currTbbsId = "";
var isModComm = false;

var g_rowId = "";
var g_showNoticeFlag = false;

var isMgr = false;

//닫기버튼 클릭 이벤트
function btnCloseClickEvent()
{
	window.close();
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

//게시판리스트
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
//파라미터 셋팅 insertComment
function getJsonStrInsertComment(tbbsId) {
	var loParam = {
		"qt" :	"aW5zZXJ0",
		"mi" : "b20wMTMuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"comm_cntn" : $("#taCommCntn").val()
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

//파라미터 셋팅 fileDown
function getJsonNotifyBoardFileDown(svr, loc) {		
	var loParam = {
			"svrFilePath" : svr,
			"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
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
			$("#tblComments").empty();
			
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
				
				$("#tblComments").append(node);
			}
		},
		error : function(data, status, err)
		{
			
			networkErrorHandler(data, status, err);
		}
	});
}

//게시물을 화면에 표시
function showBoardContents(tbbsId)
{
	//initBoardContent();

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
					$("#sTbbsTtl").html(data.TBBS_TTL);
					$("#sEmrgYN").html(data.EMRG_YN);
					$("#sTbbsStrtDt").html(data.TBBS_STRT_DT_FORMAT);
					$("#sTbbsEndDt").html(data.TBBS_END_DT_FORMAT);
					$("#sUsrNm").html(data.MOD_USR_NM);
					$("#sTbbsInQrCnt").html(data.TBBS_INQR_CNT);
					$("#sModDt").html(data.MOD_DT_FORMAT);
					$("#sModTm").html(data.MOD_TM_FORMAT);
					
					$("#dTbbsCntn").append(data.TBBS_CNTN);
					
					if(data.COMM_NUM !== 0) 
						$("#pCommNum").html("[" + data.COMM_NUM + "]");
					
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
						var tr ="<tr><th style='width:80%; padding-right:650px; position:relative;'>첨부파일이름</th>" +
									"<th style='width:20%; right:6px; float:left; position:relative;'>용량</th></tr>";
    					for(var i in data) {
    						var url = getContextPath() 
    						+ "/file/board/notiftyBoardFileDown.do?pJson=" 
    						+ getJsonNotifyBoardFileDown(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
    						tr += "<tr>";
    						tr += "<td><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></td>";
    						tr += "<td><span>" + data[i].FL_KB_SZ + " kb</span></td>";
    						tr += "</tr>";
    					}
    					$("#fileInfos").append(tr);
					}
				},
				error : function(data, status, err)
				{
					alert("게시물을 볼수없습니다.\n담당자에게 문의해주세요!");
				}
    		});
    	},
    	error : function(data, status, err)
    	{
    		
    		networkErrorHandler(data, status, err);
    	}
    });
    
	showComments(tbbsId);
	
	$("#pop_body").animate({ scrollTop: 0 }, "fast");
	//
	
}
//덧글 저장버튼 클릭이벤트
function btnInsertCommentClickEvent()
{
	currTbbsId=$("#ntfTbbsId").val();
	var commCntn = $("#taCommCntn").val();
	
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
			
			$("#taCommCntn").val("");
			
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

//파라미터셋팅 boardAccess(조회수업데이트)
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
				alert("삭제되었습니다.");
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//메인
$(document).ready(function()
{
	$("#btnInsertComm").bind("click", btnInsertCommentClickEvent);
		showBoardContents($("#ntfTbbsId").val());
		$("#btnShowNotify").bind("click", btnCloseClickEvent);//파업창 종료
});