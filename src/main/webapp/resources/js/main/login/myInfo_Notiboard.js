
//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
//var g_tbbsStrtDt = (getDate().substr(0, 8) + "01").replace(/-/g,"");
var g_tbbsStrtDt = getDate().replace(/-/g,"");
var g_tbbsEndDt = getDate().replace(/-/g,"");

var currRowid = "";
var currTbbsId = "";
var isModComm = false;

var g_rowId = "";
var g_showNoticeFlag = false;

var isMngr = false;
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
//라디오박스 선택시날짜변경
var cDTTM = new Date();
var ShowAll="";

Number.prototype.settodays=function(){ 
	return (this<10?'0'+this:this);
}

Date.prototype.getYMD = function(){ 
	return this.getFullYear()+'-'+(this.getMonth()+1).settodays()+'-'+this.getDate().settodays();
} 

//파라미터셋팅 nofifyAllList
function getJsonStrSelectNotifyList(srchtype, srchval, tbbsStrtDt, tbbsEndDt) {
/*    if(window.sessionStorage.getItem("USR_GRD_CD") >= 030100){
	ShowAll ="all";
    }*/
    var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"tbbs_strt_dt" : tbbsStrtDt,
			"tbbs_end_dt" : tbbsEndDt,
//			"tbbs_cl_cd" : "020100",
			"tbbs_cl_cd_one" : "020100",
			"tbbs_cl_cd_two" : "050100",
			"usr_grd_cd" : usrGrdCd,
//			"showAll" : ShowAll
		}
	};	
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

//게시판읽음여부
function getJsonStrNoticeCnt(){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMTAuY2l2aWxHZXROb3RpY2VDb3VudA==",
		"map" : {
			"key" : "value",
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),			
			"tbbs_strt_dt" : g_tbbsStrtDt,
			"tbbs_end_dt" : g_tbbsEndDt,
//			"showAll" : ShowAll	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

//초기화버튼 클릭이벤트
function btnNotifyInitClickEvent() {
	$("#optSrchtypes").val("ttl");
	$("#tfSrchval").val("");
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#tfTbbsEndDt").val(getDate());
	
	g_srchtype = "ttl";
	g_srchval = "";
	g_tbbsStrtDt = $("#tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#tfTbbsEndDt").val().replace(/-/g,"");
	
	isModComm = false;
	
	boardContentSlideup();
	checkUserNoticeCnt();
	
	$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
	page : 1, sortname : "TBBS_ID", sortorder : "desc"}).trigger("reloadGrid");
	
	$("input:radio[name='serviceType']").removeAttr('checked');
	$("input:radio[name='serviceType']:radio[value='day']").prop("checked",true);
	//$("input[name='serviceType']:radio").attr("disabled",true); 
	$("#searchDay").attr('checked', false);
	$("#search_latenes").attr('checked', false);
	//$(".select_bl_my").attr("disabled",true); 
	//$("#tfTbbsStrtDt").attr("disabled",true); 
	//$("#tfTbbsEndDt").attr("disabled",true);
	//$("#tfSrchval").attr("disabled",true);
}

//덧글 가져오기
function showComments(tbbsId){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/commentList.do",
		data : "pJson=" + getJsonStrCommentList(tbbsId),
		success : function(data){
			//댓글테이블 초기화
			$("#tblComments").empty();
			
			//댓글삽입
			for(var i in data){
				var node = "<tr><td><ul>";
				node += "<li>" + data[i].USR_NM + "<img src='/resources/images/line.png' alt='라인' /></li>";
				node += "<li>" + data[i].MOD_DT_FORMAT + "&nbsp;" + data[i].MOD_TM_FORMAT + "</li>";
				
				if(data[i].IS_OWN === 'Y'){
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
		error : function(data, status, err){
			
			networkErrorHandler(data, status, err);
		}
	});
}
//덧글 저장버튼 클릭이벤트
function btnInsertCommentClickEvent(){
	var commCntn = $("#taCommCntn").val();
	
	if(commCntn === null || commCntn.trim().length <= 0){
		alert("댓글 내용이 없습니다.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/insertComment.do",
		data : "pJson=" + getJsonStrInsertComment(currTbbsId),
		success : function(data){
			//현재 보고있는 게시물ID 가져오기
			showComments(currTbbsId);
			$("#taCommCntn").val("");
		},
		error : function(data, status, err){
			
			networkErrorHandler(data, status, err);
		}
	});
}

//댓글 수정 클릭이벤트
function modifyCommentClickEvent(commId){
	//댓글 수정중인지 체크
	if(isModComm)
		return;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectComment.do",
		data : "pJson=" + getJsonStrSelectComment(commId),
		success : function(data){
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
		error : function(data, status, err){
			
			networkErrorHandler(data, status, err);
		}
	});
}

//덧글 수정버튼 클릭이벤트
function btnModifyCommentClickEvent(commId){
	var commCntn = $("#taModCommCntn" + commId).val();
	
	if(commCntn === null || commCntn.trim().length <= 0){
		alert("댓글 내용이 없습니다.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/selectComment.do",
		data : "pJson=" + getJsonStrModifyComment(commId),
		success : function(data){
			showComments(currTbbsId);
			isModComm = false;
		},
		error : function(data, status, err){
			
			networkErrorHandler(data, status, err);
		}
	});
}

//덧글 수정취소 클릭이벤트
function cancelModifyCommentClickEvent(){
	//현재 보고있는 게시물ID 가져오기
	if(isModComm){
		showComments(currTbbsId);
		isModComm = false;
	}
}

//덧글 삭제 클릭이벤트
function deleteCommentClickEvent(commId){
	if(confirm("댓글을 삭제하시겠습니까?")){
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteComment.do",
			data : "pJson=" + getJsonStrDeleteComment(commId),
			success : function(data){
				showComments(currTbbsId);
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//목록보기버튼 클릭이벤트
function btnShowNotifyClickEvent(){
	boardContentSlideup();
}

//게시물 슬라이드업
function boardContentSlideup(){
	$("#board_content").slideUp(function(){
		currRowid = "";
		currTbbsId = "";
		initBoardContent();
		//reload grid
	/*	$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : 1, sortname : "TBBS_ID", sortorder : "desc"});*/
		//$("#tblNotifyList").trigger("reloadGrid");
	});
}

//게시물 슬라이드다운
function boardContentSlidedown(rowid){
	$("#board_content").slideDown(function(){
		currRowid = rowid;
		currTbbsId = $("#tblNotifyList").getRowData(currRowid).TBBS_ID;
		
		//reload grid
	/*	$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
			page : 1, sortname : "TBBS_ID", sortorder : "desc"});*/
		//$("#tblNotifyList").trigger("reloadGrid");
	});
}
	
//게시물 내용 초기화
function initBoardContent(){
	$("#sTbbsTtl").empty();
	$("#pCommNum").empty();
	$("#sEmrgYN").empty();
	$("#sTbbsStrtDt").empty();
	$("#sTbbsEndDt").empty();
	$("#sUsrNm").empty();
	$("#sTbbsInQrCnt").empty();
	$("#sCrtDt").empty();
	$("#sCrtTm").empty();
	$("#dTbbsCntn").empty();
	//DEXT5.setBodyValue('', 'tbCntn');
	$("#fileInfos").empty();
	$("#tblComments").empty();
	$("#taCommCntn").val("");
}

//게시물을 화면에 표시
function showBoardContents(tbbsId){
	initBoardContent();
	
	//게시물 조회시 조회수 업데이트
	$.ajax({
		type : "post",
    	dataType : "json",
    	async : true,
    	url : getContextPath() + "/ajax/board/boardAccess.do",
		data : "pJson=" + getJsonStrBoardUpdateInqr(tbbsId),
    	success : function(data){

		    $.ajax({
		    	type : "post",
		    	dataType : "json",
		    	async : true,
		    	url : getContextPath() + "/ajax/board/boardAccess.do",
				data : "pJson=" + getJsonStrBoardAccess(tbbsId),
		    	success : function(data){
		    		//게시물 가져오기
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/board/selectNotify.do",
						data : "pJson=" + getJsonStrSelectNotify(tbbsId),
						success : function(data){
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
						error : function(data, status, err){
							networkErrorHandler(data, status, err);
						}
					});
					
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/board/notifyBoardFileList.do",
						data : "pJson=" + getJsonNotifyBoardFileList(tbbsId),
						success : function(data){
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
						error : function(data, status, err){
						}
		    		});
		    	},
		    	error : function(data, status, err){
		    		networkErrorHandler(data, status, err);
		    	}    	
		    });
    
    	},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
    
	showComments(tbbsId);
	
	if(g_rowId != ""){
		//editerCall();
		//boardContentSlidedown(g_rowId);
	}else
		$("#board_content").slideDown();
	
	//$("#pop_body").animate({ scrollTop: 0 }, "fast");
	//
}

function checkUserNoticeCnt(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/board/miNotifyBoardCnt.do",
		data : "pJson=" + getJsonStrNoticeCnt(),
		success : function(data){
			if(data != null){
				 $("#upTotal").html(data.TOTAL+" 건");//전체
				 $("#rTotal").html(data.NOTREADNOTICE+" 건");//읽은것
				 $("#nTotal").html(data.READNOTICE+" 건");//안읽은것

			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

$(document).ready(function(){

	if(usrGrdCd != null && usrGrdCd != ""){
		if(usrGrdCd >= "030100")
			isMngr = true;
		else
			isMngr = false;
	}		
	
	
	$("#tblNotifyList").jqGrid({
		url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
		datatype : "json",
		mtype : "POST",
		autowidth:true,
		postData : {
			pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)
		},
		jsonReader : {
			repeatitems: false
		},
//		colNames : ["번호","부서구분","부서명","긴급여부", "제목", "작성자", "시작일시", "종료일시", "작성일시", "첨부파일", "조회수","읽음여부"],
		colNames : ["번호","부서구분","부서명","긴급여부", "제목", "작성자", "작성일시", "첨부파일", "조회수","읽음여부"],
		colModel : [
			            { name : "TBBS_ID", index : "TBBS_ID", width : 20, align: "center", hidden : true},
			            { name : "TBBS_GB_CD_NM", index : "TBBS_GB_CD_NM", width : 60, align: "center",cellattr: function ( rowId , tv , rowObject , cm , rdata){
			        	if(rowObject.TBBS_GB_CD_NM =="공무원공지"){
			   		 return 'style="color:red;"' 
			   	            }
			            }},
			            { name : "CNTR_NM", index : "CNTR_NM", width : 60, align: "center" },
			            { name : "EMRG_YN", index : "EMRG_YN", width : 40, align: "center" ,edittype:'text',editrules:{required:true}
			            ,cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
			            	if ( rowObject.EMRG_YN == "긴급" ) { return 'style="text-align:center;color:blue;"' }
			              }
			            },
			            { name : "TBBS_TTL", index : "TBBS_TTL",align: "left" ,width : 120 },
			            { name : "MOD_USR_NM", index : "MOD_USR_NM", width :40, align: "center" },
//			            { name : "TBBS_STRT_DT_FORMAT", index : "TBBS_STRT_DT_FORMAT", width : 40, align: "center" },
//			            { name : "TBBS_END_DT_FORMAT", index : "TBBS_END_DT_FORMAT", width : 40, align: "center" },
			            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 40, align: "center" },
			            { name : "FL_NUM", index : "FL_NUM", width : 40, align: "center" },
						{ name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", width : 40, align : "center", 
			            	cellattr : isMngr ? function(rowId, tv, rowObject, cm, rdata) { return 'style="text-decoration: underline;cursor:pointer;"' } : ''
						},
			            { name : "USR_RD", index : "USR_RD", width : 40, align: "center",
							cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
								if ( rowObject.USR_RD == "미확인" ) { return 'style="text-align:center;color:red;"' }
								}
						}
						],
        sortname : "TBBS_ID",
        sortorder : "desc",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "130",
        //width : "60%",
        rowNum : 5,
//        rowList : [5, 10],
        autowidth : true,
        pager : "#pgNotifyList",
        rownumbers : false,
        //rownumWidth : 30,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        viewrecords: true,
        multiselect: isMngr ? true : false,
        onCellSelect : function(rowid, iCol, cellContent, e){
        	//관리자가 들어와서 클릭할때 
        	var row = $("#tblNotifyList").getRowData(rowid);
        	var uTbbs_listNum = window.sessionStorage.setItem("uTbbs_id",row.TBBS_ID);
        	var uTbbs_listSday= window.sessionStorage.setItem("utbbs_strt_dt",$("#tfTbbsStrtDt").val());
        	var uTbbs_listEday= window.sessionStorage.setItem("utbbs_end_dt",$("#tfTbbsEndDt").val());
        	if (iCol > 1) {
        		$("#tblNotifyList").jqGrid("setSelection", rowid, false);
        		
        		if(rowid !== currRowid&&iCol!=9){
        			boardContentSlidedown(rowid);
        			//setTimeout(function(){
        			showBoardContents(row.TBBS_ID);
        			//}, 200);
        		}else{
        			boardContentSlideup();
        		}
        	}
        	if(iCol==9){
        			gf_openModalDialog("/web/main/login/myNotifyCountList.do", "공지조회", 300, 385, "no");
        	}
        },
        error : function(data, status, err){
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#pgNotifyList", {edit : false, add : false, del : false, search : false});
	
	//직급에 따라 등록삭제버튼 표시유무
	if(isMngr){
		$("#divInsrtDel").show();
		$("#divModDel").show();
	}else{
		$("#divInsrtDel").hide();
		$("#divModDel").hide();
	}
	
	//초기화버튼 클릭이벤트 등록
	$("#btnNotifyInit").bind("click", btnNotifyInitClickEvent);
	//목록보기버튼 클릭이벤트 등록
	$("#btnShowNotify").bind("click", btnShowNotifyClickEvent);
	//덧글 등록버튼 클릭이벤트 등록
	$("#btnInsertComm").bind("click", btnInsertCommentClickEvent);
	
	checkUserNoticeCnt();
	
	/*
	var search_today=$("#searchDay");//체크박스 게시일자
	var search_choice=$("#search_latenes");//체크박스 기타조건
	
	var search_select=$(".select_bl_my");//셀렉트박스 조건
	var search_textVal=$("#tfSrchval");
	
	var sh_fday=$("#tfTbbsStrtDt"); 
	var sh_lday=$("#tfTbbsEndDt");//날짜
	var radio_indolence=$("input[name='serviceType']:radio");//검색일자
	/*
	//날짜 비활성화
	sh_fday.attr("disabled",true);
	sh_lday.attr("disabled",true);
	radio_indolence.attr("disabled",true);
	
	//검색 비활서오하
	search_select.attr("disabled",true); 
	search_textVal.attr("disabled",true); 
	
	
	search_today.change(function(){//날짜이벤트
    	if(search_today.is(":checked")){
    		sh_fday.attr("disabled",false);
    		sh_lday.attr("disabled",false);
    		radio_indolence.attr("disabled",false); 
    	}else{
    		sh_fday.attr("disabled",true);
    		sh_lday.attr("disabled",true);
    		radio_indolence.attr("disabled",true); 
    	}
    });
	
	search_choice.change(function(){//검색내용
    	if(search_choice.is(":checked")){
    		search_select.attr("disabled",false);
    		search_textVal.attr("disabled",false);
    	}else{
    		search_select.attr("disabled",true);
    		search_textVal.attr("disabled",true);
    	}
    });
    */
	//라디오버튼 이벤트
	$("input[name='serviceType']:radio").change(function(){
	      var serviceType = this.value;
	      if(serviceType == "day"){
	    	prt(serviceType);
          } 
          else if(serviceType == "week") 
          {
        	  prt(serviceType);
          } 
          else if(serviceType == "month")
          {
        	  prt(serviceType);
          }  
	});

});

function prt(v){ 
	 var tDTTM = new Date(); 
	 if(v=="day"){
   	 tDTTM.setDate(cDTTM.getDate());
	 }if(v=="week"){
		 tDTTM.setDate(cDTTM.getDate()-7); 
	 }if(v=="month"){
		 tDTTM.setMonth(cDTTM.getMonth()-1);
	 }	 
	 	$("#tfTbbsStrtDt").val(tDTTM.getYMD());
	}