//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";

var currRowid = "";
var currTbbsId = "";
var isModComm = false;

//파라미터셋팅 nofifyList
function getJsonStrGeneralList(srchtype, srchval) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"tbbs_cl_cd" : "030100",
			"showAll" : "all"
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 selectGeneral
function getJsonStrSelectGeneral(tbbsId) {
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

// 2020.02.26
function getJsonStrGeneralBoardUpdateInqr(tbbsId) {
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



//파라미터 셋팅 deleteGeneral
function getJsonStrDeleteGeneral(ids) {
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
			"comm_cntn" : $("#gnrBrd_taCommCntn").val()
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
			"comm_cntn" : $("#gnrBrd_taModCommCntn" + commId).val()
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
function getJsonGeneralBoardFileList(tbbsId) {		
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
function getJsonGeneralBoardFileDown(svr, loc) {		
	var loParam = {
			"svrFilePath" : svr,
			"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//초기화버튼 클릭이벤트
function btnInitClickEvent() {
	$("#gnrBrd_optSrchtype").val("ttl");
	$("#gnrBrd_tfSrchval").val("");
	
	g_srchtype = "ttl";
	g_srchval = "";
	
	isModComm = false;
	
	boardContentSlideup();
	$("#gnrBrd_tblGeneralList").trigger("reloadGrid");
}

//검색 조회버튼 클릭이벤트
function btnSearchClickEvent() {
	g_srchtype = $("#gnrBrd_optSrchtype").val();
	g_srchval = $("#gnrBrd_tfSrchval").val();
	
	//reload grid
	$("#gnrBrd_tblGeneralList").jqGrid("setGridParam", {postData : {pJson : getJsonStrGeneralList(g_srchtype, g_srchval)}, 
		page : 1, sortname : "TBBS_ID", sortorder : "desc"});
	$("#gnrBrd_tblGeneralList").trigger("reloadGrid");
}

//게시물 삭제버튼 클릭이벤트
function btnDeleteClickEvent() {
	//체크된 row들의 array
	var rows = $("#gnrBrd_tblGeneralList").jqGrid("getGridParam", "selarrrow");
	
	//체크확인
	if(rows == null || rows.length <= 0) {
		alert("선택된 게시글이 없습니다.");
		return;
	}
	
	if(confirm("선택된 게시글을 삭제하시겠습니까?")) {
		var ids = new Array();
		for(var i = 0; i < rows.length; i++) {
			var row = $("#gnrBrd_tblGeneralList").getRowData(rows[i]);
			ids[i] = row.TBBS_ID;
		}
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteGeneral.do",
			data : "pJson=" + getJsonStrDeleteGeneral(ids),
			success : function(data)
			{
				//reload grid
				$("#gnrBrd_tblGeneralList").jqGrid("setGridParam", {postData : {pJson : getJsonStrGeneralList("", "")}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
				$("#gnrBrd_tblGeneralList").trigger("reloadGrid");
				
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
function btnCntnDeleteClickEvent() {
	if(confirm("게시물을 삭제하시겠습니까?")) {
		var tbbsIdArr = [currTbbsId];
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteGeneral.do",
			data : "pJson=" + getJsonStrDeleteGeneral(tbbsIdArr),
			success : function(data) {
				//reload grid
				$("#gnrBrd_tblGeneralList").jqGrid("setGridParam", {postData : {pJson : getJsonStrGeneralList("", "")}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
				$("#gnrBrd_tblGeneralList").trigger("reloadGrid");
				
				boardContentSlideup();
				
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
function btnInsertClickEvent() {
	// 2016.11.15 jghwang 에디터 교체로 인한 화면사이즈 조정
	//var width = 800;
	//var height = 610;
	var width = 1020;
	var height = 870;	
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/board/generalForm.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	window.sessionStorage.setItem("BOARD_TYPE", "030100.insert");
	
	var newWindow = window.open(paramURL, "일반게시판 등록", option);
	newWindow.focus();
}

//게시물 수정버튼 등록이벤트
function btnCntnModifyClickEvent() {
	// 2016.11.15 jghwang 에디터 교체로 인한 화면사이즈 조정
	//var width = 800;
	//var height = 610;
	var width = 1020;
	var height = 870;
	
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/board/generalForm.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	window.sessionStorage.setItem("BOARD_TYPE", "030100.modify");
	window.sessionStorage.setItem("TBBS_ID", currTbbsId);
	
	var newWindow = window.open(paramURL, "일반게시판 수정", option);
	newWindow.focus();
}

//덧글 가져오기
function showComments(tbbsId) {
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/commentList.do",
		data : "pJson=" + getJsonStrCommentList(tbbsId),
		success : function(data) {
			//댓글테이블 초기화
			$("#gnrBrd_tblComments").empty();
			//댓글삽입
			for(var i in data) {
				var node = "<tr><td><ul>";
				node += "<li>" + data[i].USR_NM + "<img src='/resources/images/line.png' alt='라인' /></li>";
				node += "<li>" + data[i].MOD_DT_FORMAT + "&nbsp;" + data[i].MOD_TM_FORMAT + "</li>";
				if(data[i].IS_OWN === 'Y') {
					node += "<li class='c_btn'><div id='commOpt" + data[i].COMM_ID + "'>";
					node += "<img src='/resources/images/btn_add4.png' style='cursor: pointer;' alt='수정' class='icon_cal' id='mod" +
							data[i].COMM_ID + "' onClick='modifyCommentClickEvent(" +data[i].COMM_ID + ");' />";
					
					node += "<img src='/resources/images/btn_del.png' style='cursor: pointer; margin-left: 5px;' alt='삭제' class='icon_cal' id='del" + 
					data[i].COMM_ID + "' onClick='deleteCommentClickEvent(" +data[i].COMM_ID + ");'/></li>";
					//node += "<img src='/resources/images/btn_add3.png' style='cursor: pointer; margin-left: 5px;' alt='삭제' class='icon_cal' id='del" + 
					//		data[i].COMM_ID + "' onClick='deleteCommentClickEvent(" +data[i].COMM_ID + ");'/></li>";
				}
				node += "</ul>";
				node += "<ul><li class='c_text'><div id='gnrBrd_commCntn" + data[i].COMM_ID + "'>" + 
						data[i].COMM_CONT + "</li></div></ul></td></tr>";
				node += "</tr><td><ul><li class='line'></li></ul></td></tr>";
				
				$("#gnrBrd_tblComments").append(node);
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}
//덧글 저장버튼 클릭이벤트
function btnInsertCommentClickEvent() {
	var commCntn = $("#gnrBrd_taCommCntn").val();
	
	if(commCntn == "") {
		alert("댓글 내용이 없습니다.");
		return;
	}

	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/insertComment.do",
		data : "pJson=" + getJsonStrInsertComment(currTbbsId),
		success : function(data) {
			//현재 보고있는 게시물ID 가져오기
			showComments(currTbbsId);
			
			$("#gnrBrd_taCommCntn").val("");
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//댓글 수정 클릭이벤트
function modifyCommentClickEvent(commId) {
	//댓글 수정중인지 체크
	if(isModComm)
		return;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectComment.do",
		data : "pJson=" + getJsonStrSelectComment(commId),
		success : function(data) {
			var node = "<td><ul>";
			node += "<li style='width: 1000px; float: left;'><textarea id='gnrBrd_taModCommCntn" + data.COMM_ID + "' class='area_ol_comm' style='overflow: hidden; width: 1006px;'></textarea></li>";
			node += "<li style='float: left; margin-left: 25px; width: 100px;'>";
			node += "<img src='/resources/images/btn_save2.png' style='cursor: pointer;' onClick='btnModifyCommentClickEvent(" + data.COMM_ID + ")' />"; 
			node += "<img src='/resources/images/btn_cancel.png' style='cursor: pointer; margin-left: 5px' onClick='cancelModifyCommentClickEvent()' /></li>";
			node += "</ul></td>";
			
			$("#gnrBrd_commCntn" + data.COMM_ID).parent().parent().parent().parent().empty().append(node);
			
			$("#gnrBrd_taModCommCntn" + data.COMM_ID).val(data.COMM_CONT);
			
			isModComm = true;
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//덧글 수정버튼 클릭이벤트
function btnModifyCommentClickEvent(commId) {
	var commCntn = $("#gnrBrd_taModCommCntn" + commId).val();
	
	if(commCntn == "") {
		alert("댓글 내용이 없습니다.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectComment.do",
		data : "pJson=" + getJsonStrModifyComment(commId),
		success : function(data) {
			showComments(currTbbsId);
			
			isModComm = false;
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//덧글 수정취소 클릭이벤트
function cancelModifyCommentClickEvent() {
	//현재 보고있는 게시물ID 가져오기
	if(isModComm) {
		showComments(currTbbsId);
		isModComm = false;
	}
}

//덧글 삭제 클릭이벤트
function deleteCommentClickEvent(commId) {
	if(confirm("댓글을 삭제하시겠습니까?")) {
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteComment.do",
			data : "pJson=" + getJsonStrDeleteComment(commId),
			success : function(data) {
				showComments(currTbbsId);
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//목록보기버튼 클릭이벤트
function btnShowGeneralClickEvent() {
	boardContentSlideup();
}

//게시물 슬라이드업
function boardContentSlideup() {
		$("#gnrBrd_board_content").slideUp(function() {
			currRowid = "";
			currTbbsId = "";
			initBoardContent();
			
			var BoardPage= $("#input_pgGeneralList input").val();
			
			//reload grid
			$("#gnrBrd_tblGeneralList").jqGrid("setGridParam", {postData : {pJson : getJsonStrGeneralList(g_srchtype, g_srchval)}, 
				page : BoardPage, sortname : "TBBS_ID", sortorder : "desc"});
//			$("#gnrBrd_tblGeneralList").trigger("reloadGrid");
		});
}

//게시물 슬라이드다운
function boardContentSlidedown(rowid) {
		$("#gnrBrd_board_content").slideDown(function() {
			currRowid = rowid;
			currTbbsId = $("#gnrBrd_tblGeneralList").getRowData(currRowid).TBBS_ID;
			
			var BoardPage= $("#input_pgGeneralList input").val();
			
			$("#gnrBrd_tblGeneralList").jqGrid("setGridParam", {postData : {pJson : getJsonStrGeneralList(g_srchtype, g_srchval)}, 
				page : BoardPage, sortname : "TBBS_ID", sortorder : "desc"});
//			$("#gnrBrd_tblGeneralList").trigger("reloadGrid");
		});
}
	
//게시물 내용 초기화
function initBoardContent() {
	$("#gnrBrd_sTbbsTtl").empty();
	$("#gnrBrd_pCommNum").empty();
	$("#gnrBrd_sUsrNm").empty();
	$("#gnrBrd_sTbbsInQrCnt").empty();
	$("#sCrtDt").empty();
	$("#sCrtTm").empty();
	$("#gnrBrd_dTbbsCntn").empty();
	$("#gnrBrd_fileInfos").empty();
	$("#gnrBrd_tblComments").empty();
	$("#gnrBrd_taCommCntn").val("");
}

$(document).ready(function() {
	datePicker("#tfTbbsStrtDt");
	datePicker("#tfTbbsEndDt");

	var isMngr = false;
	var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	switch(usrGrdCd) {
		case '020100'://파트매니저
		case '030100'://그룹매니저
		case '050100'://센터장
		case '060100'://통합센터장
		case '090100'://시스템관리자
			isMngr = true;
			break;
		default:
			isMngr = false;
			break;
	}

//	010100 Agent
//	020100 PartManager
//	030100 GroupManager
//	050100 GeneralManager 
//	090100 시스템운영자

	$("#gnrBrd_tblGeneralList").jqGrid({
		url : getContextPath() + "/jqgrid/board/GeneralList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrGeneralList("", "")
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["번호", "제목", "작성자", "작성일", "첨부파일", "조회수"],
		colModel : [
		            { name : "TBBS_ID", index : "TBBS_ID", width : 100, align: "center", hidden : true},
		            { name : "TBBS_TTL", index : "TBBS_TTL", width : 300 },
		            { name : "MOD_USR_NM", index : "MOD_USR_NM", width : 100, align: "center" },
		            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 100, align: "center" },
		            { name : "FL_NUM", index : "FL_NUM", width : 100, align: "center" },
		            { name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", width : 100, align: "center" }			
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
		            rowList : [10, 20, 30],
		            autowidth : true,
		            pager : "#gnrBrd_pgGeneralList",
		            rownumbers : true,
		            rownumWidth : 30,
		            emptyrecords : "",
		            caption : "",
		            loadui : "enable",
		            viewrecords: true,
		            multiselect: isMngr ? true : false,
		            onCellSelect : function(rowid, iCol, cellContent, e) {
		            	if (iCol > 1) {
//		            		$("#gnrBrd_tblGeneralList").jqGrid("setSelection", rowid, false);
		            		var row = $("#gnrBrd_tblGeneralList").getRowData(rowid);

		            		if(rowid !== currRowid) {
		            			initBoardContent();

		            			//getJsonStrGeneralBoardUpdateInqr
		            			$.ajax({
		            				type : "post",
							    	dataType : "json",
							    	async : true,
							    	url : getContextPath() + "/ajax/board/boardAccess.do",
									data : "pJson=" + getJsonStrGeneralBoardUpdateInqr(row.TBBS_ID),
							    	success : function(data) {
							    		
							    		//게시물 조회시 조회수 업데이트
									    $.ajax({
									    	type : "post",
									    	dataType : "json",
									    	async : true,
									    	url : getContextPath() + "/ajax/board/boardAccess.do",
											data : "pJson=" + getJsonStrBoardAccess(row.TBBS_ID),
									    	success : function(data) {
									    		//게시물 가져오기
									    		$.ajax({
						            				type : "post",
						            				dataType: "json",
						            				async : true,
						            				url : getContextPath() + "/ajax/board/selectGeneral.do",
						            				data : "pJson=" + getJsonStrSelectGeneral(row.TBBS_ID),
						            				success : function(data) {
						            					$("#gnrBrd_sTbbsTtl").html(data.TBBS_TTL);
						            					$("#gnrBrd_sUsrNm").html(data.MOD_USR_NM);
						            					$("#gnrBrd_sTbbsInQrCnt").html(data.TBBS_INQR_CNT);
						            					$("#gnrBrd_sModDt").html(data.MOD_DT_FORMAT);
						            					$("#gnrBrd_sModTm").html(data.MOD_TM_FORMAT);
						            					$("#gnrBrd_dTbbsCntn").append(data.TBBS_CNTN);
						            					
						            					if(data.COMM_NUM !== 0) 
						            						$("#gnrBrd_pCommNum").html("[" + data.COMM_NUM + "]");
						            					
						            					if(data.IS_OWN === 'Y') {
						            						$("#gnrBrd_divModDel").show();
						            					} else {
						            						$("#gnrBrd_divModDel").hide();
						            					}
						            				},
						            				error : function(data, status, err) {
						            					networkErrorHandler(data, status, err);
						            				}
						            			});
									    		//첨부파일
									    		$.ajax({
						            				type : "post",
						            				dataType: "json",
						            				async : true,
						            				url : getContextPath() + "/ajax/board/generalBoardFileList.do",
						            				data : "pJson=" + getJsonGeneralBoardFileList(row.TBBS_ID),
						            				success : function(data) {
						            					if(data != null && data != "") {
						            						var tr ="<tr><th style='width: 80%;'>첨부파일이름</th>" +
						            									"<th style='width: 20%;'>용량</th></tr>";
							            					for(var i in data) {
							            						var url = getContextPath() 
							            						+ "/file/board/generalBoardFileDown.do?pJson=" 
							            						+ getJsonGeneralBoardFileDown(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
							            						tr += "<tr>";
							            						tr += "<td><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></td>";
							            						tr += "<td><span>" + data[i].FL_KB_SZ + " kb</span></td>";
							            						tr += "</tr>";
							            					}
							            					$("#gnrBrd_fileInfos").append(tr);
						            					}
						            				},
						            				error : function(data, status, err) {
						            					networkErrorHandler(data, status, err);
						            				}
									    		});
									    	},
									    	error : function(data, status, err) {
									    		networkErrorHandler(data, status, err);
									    	}
									    });
							    		
		            				},
		            				error : function(data, status, err) {
		            					networkErrorHandler(data, status, err);
		            				}
		            			});
		            			
		            			
		            			showComments(row.TBBS_ID);
		            			boardContentSlidedown(rowid);
		            			
		            		    $("#pop_body").animate({ scrollTop: 0 }, "fast");
		            		}
		            		else {
		            			boardContentSlideup();
		            		}
		            	}
		            },
		    		gridComplete : function() {
		    			var total = $(this).getGridParam("records");
		    			$("#gnrBrd_pTotal").html("총 " + total + "건");
		    		},
		            error : function(data, status, err) {
		            	networkErrorHandler(data, status, err);
		            }
	}).jqGrid("navGrid", "#gnrBrd_pgGeneralList", {edit : false, add : false, del : false, search : false});

	//직급에 따라 삭제버튼 표시유무
	if(isMngr) {
		$("#gnrBrd_divInsrtDel").show();
		$("#gnrBrd_divModDel").show();
	} else {
		$("#gnrBrd_btnDelete").hide();
	}
	
	
	//검색 조회버튼 클릭이벤트 등록
	$("#gnrBrd_btnSearch").bind("click", btnSearchClickEvent);
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#gnrBrd_tfSrchval").bind("keydown", function (key) {
		if (key.keyCode == 13)
			btnSearchClickEvent();
	});
	//초기화버튼 클릭이벤트 등록
	$("#gnrBrd_btnInit").bind("click", btnInitClickEvent);

	//게시물 삭제버튼 클릭이벤트 등록
	$("#gnrBrd_btnDelete").bind("click", btnDeleteClickEvent);
	//게시물 등록버튼 클릭이벤트 등록
	$("#gnrBrd_btnInsert").bind("click", btnInsertClickEvent);
	//게시물 수정버튼 클릭이벤트 등록
	$("#gnrBrd_btnCntnModify").bind("click", btnCntnModifyClickEvent);
	//조회중인 게시물 삭제버튼 클릭이벤트 등록
	$("#gnrBrd_btnCntnDelete").bind("click", btnCntnDeleteClickEvent);
	//목록보기버튼 클릭이벤트 등록
	$("#gnrBrd_btnShowGeneral").bind("click", btnShowGeneralClickEvent);
	//덧글 등록버튼 클릭이벤트 등록
	$("#gnrBrd_btnInsertComm").bind("click", btnInsertCommentClickEvent);
});