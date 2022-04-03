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

/**
 * om010 - 게시물 테이블
 * om011 - 조회수 테이블
 * om013 - 덧글 테이블
 * om019 - 파일 테이블
 * **/


//게시판 리스트 om010.selectList  
function getJsonStrSelectNotifyList(srchtype, srchval, tbbsStrtDt, tbbsEndDt) {
	if (window.sessionStorage.getItem("CC_AUTH") == "Y") {
		sendingOuCode = null;
	};
	
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTAuY2l2aWxTZWxlY3RMaXN0",  
	    "map" : {
		"key" : "value",
		"srchtype" : srchtype,  		//제목
		"srchval" : srchval,    		//내용
		"tbbs_strt_dt" : tbbsStrtDt,  		//시작
		"tbbs_end_dt" : tbbsEndDt,	  	//종료
		"tbbs_cl_cd" : "050100",      		//변경요망050100
		"sendingOuCode" : sendingOuCode,
		"sendingUid" : sendingUid
	    }
    };	
   

   if($("#csdpbd_cvilMyNotice").prop("checked")){
	loParam.map.sendingOuCode="";
    }
   
    return  encodeURIComponent(JSON.stringify(loParam));
}

//선택 게시물  om010.select --ok
function getJsonStrSelectNotify(tbbsId) {
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAuY2l2aWxTZWxlY3Q=",
	    "map" : {
		"key" : "value",
		"tbbs_id" : tbbsId,
		"sendingOuCode" : sendingOuCode,
		"sendingUid" : sendingUid
	    }
    };	
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 boardAccess om011.insertUpdate 조회수   
function getJsonStrBoardAccess(tbbsId) {
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTEuaW5zZXJ0VXBkYXRl",
	    "map" : {
		"key" : "value",
		"tbbs_id" : tbbsId,
		"sendingOuCode" : sendingOuCode,
		"sendingUid" : sendingUid
	    }
    };	
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 deleteNotify //om010.update  
function getJsonStrDeleteNotify(ids) {  
    var loParam = {
	    "qt" : "dXBkYXRl",
	    "mi" : "b20wMTAuY2l2aWxVcGRhdGU=",
	    "map" : {
		"key" : "value",
		"ids" : ids,			//게시물 id
		"use_yn" : "N",
		"sendingUid" : sendingUid
	    }
    };	
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CommentList om013.selectList  
function getJsonStrCommentList(tbbsId) {
    var loParam = {
	    "qt" :	"c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTMuY2l2aWxTZWxlY3RMaXN0",
	    "map" : {
		"key" : "value",
		"tbbs_id" : tbbsId,
		"sendingUid" : sendingUid
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertComment om013.insert  
function getJsonStrInsertComment(tbbsId) {
    var loParam = {
	    "qt" :	"aW5zZXJ0",
	    "mi" : "b20wMTMuY2l2aWxJbnNlcnQ=",
	    "map" : {
		"key" : "value",
		"tbbs_id" : tbbsId,
		"comm_cntn" : $("#csdpbd_deptBbstaCommCntn").val(),
		"sendingUid" : sendingUid
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectComment om013.select  
function getJsonStrSelectComment(commId) {
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTMuc2VsZWN0",
	    "map" : {
		"key" : "value",
		"comm_id" : commId
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 modifyCommnet om013.update  
function getJsonStrModifyComment(commId) {
    var loParam = {
	    "qt" : "dXBkYXRl",
	    "mi" : "b20wMTMuY2l2aWxVcGRhdGU=",
	    "map" : {
		"key" : "value",
		"comm_id" : commId,
		"comm_cntn" : $("#csdpbd_taModCommCntn" + commId).val(),
		"sendingUid" : sendingUid
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 deleteComment om013.delete
function getJsonStrDeleteComment(commId) {
    var loParam = {
	    "qt" : "dXBkYXRl",
	    "mi" : "b20wMTMudXBkYXRl",
	    "map" : {
		"key" : "value",
		"comm_id" : commId,
		"use_yn" : 'N',
		"sendingUid" : sendingUid
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 fileList om019.fileList  
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
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 fileDown
function getJsonNotifyBoardFileDown(svr, loc) {		
    var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
    };
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//초기화버튼 클릭이벤트  --ok
function btnNotifyInitClickEvent() {
    $("#csdpbd_deptBbsoptSrchtype").val("ttl"); 	//제목
    $("#csdpbd_deptBbstfSrchval").val("");		//내용
    //현재 월 1일부터 현재일까지 디폴트 셋팅
    $("#csdpbd_deptBbstfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
    $("#csdpbd_deptBbstfTbbsEndDt").val(getDate());
    g_srchtype = "ttl";
    g_srchval = "";
    g_tbbsStrtDt = $("#csdpbd_deptBbstfTbbsStrtDt").val().replace(/-/g,"");
    g_tbbsEndDt = $("#csdpbd_deptBbstfTbbsEndDt").val().replace(/-/g,"");
    isModComm = false;
    boardContentSlideup();
    
    $("#csdpbd_cvilMyNotice").attr("checked",false);
    $("#csdpbd_cvilMyNotice2").attr("checked",false);
    $("#csdpbd_deptBbstblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
    $("#csdpbd_deptBbstblNotifyList").trigger("reloadGrid");
}

//검색 조회버튼 클릭이벤트
function btnNotifySearchClickEvent() {
    g_srchtype = $("#csdpbd_deptBbsoptSrchtype").val();
    g_srchval = $("#csdpbd_deptBbstfSrchval").val();
    g_tbbsStrtDt = $("#csdpbd_deptBbstfTbbsStrtDt").val().replace(/-/g,"");
    g_tbbsEndDt = $("#csdpbd_deptBbstfTbbsEndDt").val().replace(/-/g,"");
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
    $("#csdpbd_deptBbstblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
    $("#csdpbd_deptBbstblNotifyList").trigger("reloadGrid");
}

//게시물 삭제버튼 클릭이벤트
function btnDeleteMainNotifyClickEvent(){
    //체크된 row들의 array
    var rows = $("#csdpbd_deptBbstblNotifyList").jqGrid("getGridParam", "selarrrow");

    //체크확인
    if(rows == null || rows.length <= 0){
	alert("선택된 게시글이 없습니다.");
	return;
    }

    if(confirm("선택된 게시글을 삭제하시겠습니까?")){
	var ids = new Array();
	for(var i = 0; i < rows.length; i++){
	    var row = $("#csdpbd_deptBbstblNotifyList").getRowData(rows[i]);
	    ids[i] = row.TBBS_ID;
	}

	g_tbbsStrtDt = $("#csdpbd_deptBbstfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#csdpbd_deptBbstfTbbsEndDt").val().replace(/-/g,"");			

	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : true,
	    url :  "/ajax/civilservice/csw.do", 
	    data : "pJson=" + getJsonStrDeleteNotify(ids),
	    success : function(data){
		//reload grid
		$("#csdpbd_deptBbstblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
		$("#csdpbd_deptBbstblNotifyList").trigger("reloadGrid");

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
function btnCntnDeleteClickEvent(){
    if(confirm("게시물을 삭제하시겠습니까?")){
	var tbbsIdArr = [currTbbsId];	
	g_tbbsStrtDt = $("#csdpbd_deptBbstfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#csdpbd_deptBbstfTbbsEndDt").val().replace(/-/g,"");		

	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : true,
//	    url :  "/ajax/board/deleteNotify.do",
	    url :  "/ajax/civilservice/csw.do",
	    data : "pJson=" + getJsonStrDeleteNotify(tbbsIdArr),
	    success : function(data)
	    {
		//reload grid
		$("#csdpbd_deptBbstblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)}, page : 1, sortname : "TBBS_ID", sortorder : "desc"});
		$("#csdpbd_deptBbstblNotifyList").trigger("reloadGrid");
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
function btnInsertMainNotifyClickEvent()
{	
    var width = 1020;
    var height = 955;
    var top = (screen.height - height) / 2;
    var left = (screen.width - width) / 2;	

    var paramURL = "/web/civilservice/cswDeptBoardForm.do"; 
    var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";

    window.sessionStorage.setItem("BOARD_TYPE", "050100.insert");
    var newWindow = window.open(paramURL, "부서게시판 등록", option);
    newWindow.focus();
}

//게시물 수정버튼 등록이벤트
function btnCntnModifyClickEvent()
{
    var width = 1020;
    var height = 955;
    var top = (screen.height - height) / 2;
    var left = (screen.width - width) / 2;	

    var paramURL =  "/web/civilservice/cswDeptBoardForm.do";
    var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";

    window.sessionStorage.setItem("BOARD_TYPE", "050100.modify");  
    window.sessionStorage.setItem("TBBS_ID", currTbbsId);

    var newWindow = window.open(paramURL, "부서게시판 수정", option);
    newWindow.focus();
}

//덧글 가져오기
function showComments(tbbsId){
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
//	url :  "/ajax/board/commentList.do",
	url :  "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrCommentList(tbbsId),
	success : function(data)
	{
	    //댓글테이블 초기화
	    $("#csdpbd_deptBbstblComments").empty();

	    //댓글삽입
	    for(var i in data)
	    {
		var node = "<tr><td><ul>";
		node += "<li>" + data[i].USR_NM + "<img src='/resources/images/line.png' alt='라인' /></li>";
		node += "<li>" + data[i].MOD_DT_FORMAT + "&nbsp;" + data[i].MOD_TM_FORMAT + "</li>";

		if(data[i].IS_OWN === 'Y')
		{
		    node += "<li class='c_btn'><div id='commOpt" + data[i].COMM_ID + "'>";
		    node += "<img src='/resources/images/btn_add4.png' style='cursor: pointer;' alt='수정' class='icon_cal' id='mod" + data[i].COMM_ID + "' onClick='modifyCommentClickEvent(" +data[i].COMM_ID + ");' />";
		    node += "<img src='/resources/images/btn_del.png' style='cursor: pointer; margin-left: 5px;' alt='삭제' class='icon_cal' id='del" + data[i].COMM_ID + "' onClick='deleteCommentClickEvent(" +data[i].COMM_ID + ");'/></li>";
		}

		node += "</ul>";
		node += "<ul><li class='c_text'><div id='commCntn" + data[i].COMM_ID + "'>" + 
		data[i].COMM_CONT + "</li></div></ul></td></tr>";
		node += "</tr><td><ul><li class='line'></li></ul></td></tr>";

		$("#csdpbd_deptBbstblComments").append(node);
	    }
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
}

//덧글 저장버튼 클릭이벤트
function btnInsertCommentClickEvent(){
    var commCntn = $("#csdpbd_deptBbstaCommCntn").val();

    if(commCntn === null || commCntn.trim().length <= 0){
	alert("댓글 내용이 없습니다.");
	return;
    }

    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
//	url :  "/ajax/board/insertComment.do",
	url :  "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrInsertComment(currTbbsId),
	success : function(data){
	    //현재 보고있는 게시물ID 가져오기
	    showComments(currTbbsId);		
	    $("#csdpbd_deptBbstaCommCntn").val("");
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
//	url :  "/ajax/board/selectComment.do",
	url :  "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrSelectComment(commId),
	success : function(data){
	    var node = "<td><ul>";
	    node += "<li style='width: 762px; float: left;'><textarea id='taModCommCntn" + data.COMM_ID + "' class='area_ol_comm' style='overflow: hidden;'></textarea></li>";
	    node += "<li style='float: left; margin-left: 25px; width: 90px;'>";
	    node += "<img src='/resources/images/btn_save2.png' style='cursor: pointer;' onClick='btnModifyCommentClickEvent(" + data.COMM_ID + ")' />"; 
	    node += "<img src='/resources/images/btn_cancel.png' style='cursor: pointer; margin-left: 5px' onClick='cancelModifyCommentClickEvent()' /></li>";
	    node += "</ul></td>";

	    $("#csdpbd_commCntn" + data.COMM_ID).parent().parent().parent().parent().empty().append(node);
	    $("#csdpbd_taModCommCntn" + data.COMM_ID).val(data.COMM_CONT);
	    isModComm = true;
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
}

//덧글 수정버튼 클릭이벤트
function btnModifyCommentClickEvent(commId){
    var commCntn = $("#csdpbd_taModCommCntn" + commId).val();

    if(commCntn === null || commCntn.trim().length <= 0){
	alert("댓글 내용이 없습니다.");
	return;
    }

    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
//	url :  "/ajax/board/selectComment.do",
	url :  "/ajax/civilservice/csw.do",
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
    if(confirm("댓글을 삭제하시겠습니까?"))
    {
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : true,
//	    url :  "/ajax/board/deleteComment.do",
	    url :  "/ajax/civilservice/csw.do",
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
function btnShowNotifyClickEvent(){
    boardContentSlideup();
}

//게시물 슬라이드업
function boardContentSlideup(){
    $("#csdpbd_deptBbsboard_content").slideUp(function() {
	currRowid = "";
	currTbbsId = "";
	initBoardContent();
	
	//reload grid
//	$("#csdpbd_deptBbstblNotifyList")
//	$("#csdpbd_deptBbstblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
//	    page : nowPage, sortname : "TBBS_ID", sortorder : "desc"}).trigger("reloadGrid");
	
    });
}

//게시물 슬라이드다운
function boardContentSlidedown(rowid){
    $("#csdpbd_deptBbsboard_content").slideDown(function() {
	currRowid = rowid;
	currTbbsId = $("#csdpbd_deptBbstblNotifyList").getRowData(currRowid).TBBS_ID;
	//reload grid
//	$("#csdpbd_deptBbstblNotifyList").trigger("reloadGrid");
//	$("#csdpbd_deptBbstblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyList(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
//	    page : nowPage, sortname : "TBBS_ID", sortorder : "desc"}).trigger("reloadGrid");
    });
    
}

//게시물 내용 초기화
function initBoardContent(){
    $("#csdpbd_deptBbssTbbsTtl").empty();
    $("#csdpbd_deptBbspCommNum").empty();
    $("#csdpbd_deptBbssEmrgYN").empty();
    $("#csdpbd_deptBbssTbbsStrtDt").empty();
    $("#csdpbd_deptBbssTbbsEndDt").empty();
    $("#csdpbd_deptBbssUsrNm").empty();
    $("#csdpbd_deptBbssTbbsInQrCnt").empty();
    $("#csdpbd_deptBbssCrtDt").empty();
    $("#csdpbd_deptBbssCrtTm").empty();
//    $("#csdpbd_deptBbsdTbbsCntn").empty();
    deptBbsdCnts.SetEditorContent("");
    $("#csdpbd_deptBbsfileInfos").empty();
    $("#csdpbd_deptBbstblComments").empty();
    $("#csdpbd_deptBbstaCommCntn").val("");
}

//게시물을 화면에 표시
function showBoardContents(tbbsId){
    initBoardContent();
    
    $(".kk_editor").css("border","0px");
	$(".kk_editor .kk_editor_toolbar").css("border-bottom","0px");
	
    //게시물 가져오기
	    $.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url :  "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonStrSelectNotify(tbbsId),
		success : function(data){
			
			deptBbsdCnts.SetEditMode(0);
		    
		    if(data.CRT_USR_ID==sendingUid){
			$("#csdpbd_deptBbsbtnCntnModify").show();
			$("#csdpbd_deptBbsbtnCntnDelete").show();
		    }
		    
		    $("#csdpbd_deptBbssTbbsTtl").html(data.TBBS_TTL);
		    $("#csdpbd_deptBbssEmrgYN").html(data.EMRG_YN);
		    $("#csdpbd_deptBbssTbbsStrtDt").html(data.TBBS_STRT_DT_FORMAT);
		    $("#csdpbd_deptBbssTbbsEndDt").html(data.TBBS_END_DT_FORMAT);
		    $("#csdpbd_deptBbssUsrNm").html(data.MOD_USR_NM);
		    $("#csdpbd_deptBbssTbbsInQrCnt").html(data.TBBS_INQR_CNT);
		    $("#csdpbd_deptBbssModDt").html(data.MOD_DT_FORMAT);
		    $("#csdpbd_deptBbssModTm").html(data.MOD_TM_FORMAT);
//		    $("#csdpbd_deptBbsdTbbsCntn").append(data.TBBS_CNTN);
		    deptBbsdCnts.SetEditorContent(data.TBBS_CNTN==null?"":data.TBBS_CNTN, function() {
		    	deptBbsdCnts.SetEditMode(3);
			});
		    if(data.COMM_NUM !== 0) 
			$("#csdpbd_deptBbspCommNum").html("[" + data.COMM_NUM + "]");
		},
		error : function(data, status, err){
		    networkErrorHandler(data, status, err);
		}
	    });
	    
	    $.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url :  "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonNotifyBoardFileList(tbbsId),
		success : function(data)
		{
		    if(data != null && data != "") {
			var tr ="<tr><th style='width: 80%;'>첨부파일이름</th>" +
			"<th style='width: 20%;'>용량</th></tr>";
			for(var i in data) {
			    var url = "/file/board/notiftyBoardFileDown.do?pJson=" + getJsonNotifyBoardFileDown(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
			    tr += "<tr>";
			    tr += "<td><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></td>";
			    tr += "<td><span>" + data[i].FL_KB_SZ + " kb</span></td>";
			    tr += "</tr>";
			}
			$("#csdpbd_deptBbsfileInfos").append(tr);
		    }
		},
		error : function(data, status, err)
		{

		}
	    });
    showComments(tbbsId);
    if(g_rowId != "") {
	boardContentSlidedown(g_rowId);
    }
    else {
	$("#csdpbd_deptBbsboard_content").slideDown();
    }
    $("#csdpbd_pop_body").animate({ scrollTop: 0 }, "fast");
}


function deptBbsJqgridClickEvent(){
    datePicker("#csdpbd_deptBbstfTbbsStrtDt");
    datePicker("#csdpbd_deptBbstfTbbsEndDt");

    //현재 월 1일부터 현재일까지 디폴트 셋팅
    $("#csdpbd_deptBbstfTbbsStrtDt").val(getDate1());
    $("#csdpbd_deptBbstfTbbsEndDt").val(getDate());
    
    g_tbbsStrtDt = $("#csdpbd_deptBbstfTbbsStrtDt").val().replace(/-/g,"");
    g_tbbsEndDt = $("#csdpbd_deptBbstfTbbsEndDt").val().replace(/-/g,"");		


    $("#csdpbd_deptBbstblNotifyList").jqGrid({
	url :  "/jqgrid/civilservice/csw.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)
	},
	jsonReader : {
	    repeatitems: false
	},
	colNames : ["번호", "긴급여부", "제목",'부서', "작성자", "시작일시", "종료일시", "작성일시", "첨부파일", "조회수"],
	colModel : [
	            { name : "TBBS_ID", index : "TBBS_ID", width : 100, align: "center", hidden : true},
	            { name : "EMRG_YN", index : "EMRG_YN", width : 40, align: "center" },
	            { name : "TBBS_TTL", index : "TBBS_TTL", width : 200, align: "center" },
	            { name : "CIVILORGNM", index : "TBBS_TTL", width : 200, align: "center" },
	            { name : "MOD_USR_NM", index : "MOD_USR_NM", width : 60, align: "center" },
	            { name : "TBBS_STRT_DT_FORMAT", index : "TBBS_STRT_DT_FORMAT", width : 60, align: "center" },
	            { name : "TBBS_END_DT_FORMAT", index : "TBBS_END_DT_FORMAT", width : 60, align: "center" },
	            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 60, align: "center" },
	            { name : "FL_NUM", index : "FL_NUM", width : 50, align: "center" },
	            { name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", width : 50, align: "center" /*, cellattr: function ( rowId , tv , rowObject , cm , rdata){
		            	return 'style="text-decoration: underline;cursor:pointer;"' 
		            } */}			
	            ],
	            sortname : "TBBS_ID",
	            sortorder : "desc",
	            gridview : true,
	            hidegrid : false,
	            shrinkToFit : true,
	            loadonce : false,
	            scrollOffset : 0,
	            height : "130",
	            width : "100%",
	            rowNum : 5,
	            rowList : [10, 15, 25, 50, 100],
	            autowidth : true,
	            pager : "#csdpbd_deptBbspgNotifyList",
	            rownumbers : true,
	            rownumWidth : 30,
	            emptyrecords : "",
	            caption : "",
	            loadui : "enable",
	            viewrecords: true,
	            multiselect: false,
	        	onCellSelect : function(rowid, iCol, cellContent, e) {
	        		
	        		if (window.sessionStorage.getItem("CC_AFFAIRS_YN") == "Y") {
	        			$("#csdpbd_deptBbsbtnCntnModify").show();
		        		$("#csdpbd_deptBbsbtnCntnDelete").show();
					} else {
		        		$("#csdpbd_deptBbsbtnCntnModify").hide();
		        		$("#csdpbd_deptBbsbtnCntnDelete").hide();
					};

	        	
	        		var row = $("#csdpbd_deptBbstblNotifyList").getRowData(rowid);
	        		if (iCol > 1) {
	        			// $("#csdpbd_deptBbstblNotifyList").jqGrid("setSelection", rowid, false); //특정행 선택

	        		    if(rowid !== currRowid){
	        			g_rowId = rowid;
	        			showBoardContents(row.TBBS_ID);
	        		    }
	        		    else{
	        			boardContentSlideup();
	        		    }
	        		}
	        	    },
	        	    gridComplete : function(){ //그리드가 표시된후에 실행
	        		var total = $(this).getGridParam("records"); //서버로부터 전달받은 레코드수
	        		$("#csdpbd_deptBbspTotal").html("총 " + total + "건");

	        	    },
	        	    error : function(data, status, err){
	        		networkErrorHandler(data, status, err);
	        	    }
    }).jqGrid("navGrid", "#csdpbd_deptBbspgNotifyList", {edit : false, add : false, del : false, search : false});

    //$("#csdpbd_deptBbstblNotifyList").setGridWidth($(window).width()-37);
    
    //검색 조회버튼 클릭이벤트 등록
    $("#csdpbd_deptBbsbtnNotifySearch").bind("click", btnNotifySearchClickEvent);

    // 검색어 텍스트인풋 엔터 키 이벤트 등록
    $("#csdpbd_csdpbd_deptBbstfSrchval").bind("keydown", function (key){
	if (key.keyCode == 13)
	    btnNotifySearchClickEvent();
    });
}


//init page
function initNoticeDiv(){
	deptBbsdTbbsCntn_editerCall();
	deptBbsJqgridClickEvent();
    $("#csdpbd_deptBbsbtnCntnModify").hide();
    $("#csdpbd_deptBbsbtnCntnDelete").hide();
    
    if (window.sessionStorage.getItem("CC_AUTH") != "Y") {
		$("#csdpbd_cvilMyNotice").parent().hide();
	};

    //jqrid 등록
    $("#cvsvwk_Notice").bind("click", deptBbsJqgridClickEvent);
    //초기화버튼 클릭이벤트 등록
    $("#csdpbd_deptBbsbtnNotifyInit").bind("click", btnNotifyInitClickEvent);
    //게시물 삭제버튼 클릭이벤트 등록
    $("#csdpbd_deptBbsbtnDeleteMainNotify").bind("click", btnDeleteMainNotifyClickEvent);
    //게시물 등록버튼 클릭이벤트 등록
    $("#csdpbd_deptBbsbtnInsertMainNotify").bind("click", btnInsertMainNotifyClickEvent);
    //게시물 수정버튼 클릭이벤트 등록
    $("#csdpbd_deptBbsbtnCntnModify").bind("click", btnCntnModifyClickEvent);
    //조회중인 게시물 삭제버튼 클릭이벤트 등록
    $("#csdpbd_deptBbsbtnCntnDelete").bind("click", btnCntnDeleteClickEvent);
    //목록보기버튼 클릭이벤트 등록
    $("#csdpbd_deptBbsbtnShowNotify").bind("click", btnShowNotifyClickEvent);
    //덧글 등록버튼 클릭이벤트 등록
    $("#csdpbd_deptBbsbtnInsertComm").bind("click", btnInsertCommentClickEvent);
}

function deptBbsdTbbsCntn_editerCall() {
	deptBbsdCnts = new KuKudocsEditor(
	            /* ID 입력부 */
	            'csdpbd_deptBbsdTbbsCntn',

	            /* Option 입력부 */
	            {

	                //에디터 최소 높이설정
	                minHeight: 0,
	                maxHeight: 0,

	                //Editor 가로크기
	                width: '99%',

	                //Editor 세로크기
	                //height: '99%',
	                height: '400px',

	                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
	                
	                //Hidden Menu 설정
	                hiddenMenu: ['fileGroup', 'editGroup', 'headingGroup', 'fontFamilyGroup', 'fontSizeGroup', 'textFormatGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'
	                	// image를 제외한 insertGroup 제거
	                	,'link', 'unlink', 'bookmark', 'horizontal', 'date_format', 'background_image', 'video', 'file', 'symbol', 'emoticon', 'upper_lower', 'blockquote', 'layer'
	                	], /* Menu Option Hidden list */
	                
	                //Kaoni Cell Lock Attibute 설정 (Lock 기능 체크하기 위해서는 반드시 Attibute Name 설정)
	                cell_lock_name: 'free',

	                //사용할 Font Size 설정
	                fontSize: [{name: "8pt", value: "8pt"}, {name: "9pt", value: "9pt"}],

	                //사용할 Font Family 설정
	                fontFamily: [{name: "굴림", value: "굴림"}, {name: "돋움", value: "돋움"}],

	                //기본 Font Size
	                defaultFontSize: '11pt',

	                //기본 Font Family 설정
	                defaultFontFamily: '맑은 고딕',

	                //Language Resource 위치 URL
	                languagePathURL: '/resources/KukudocsEditor/lang/',

	                //사용할 Language 설정
	                defaultLanguage: 'kr',

	                //표 위아래 문단 추가 버튼의 스타일 지정
	                customMagicLineStyle: 'background-color:#0000ff;',

	                //표 생성시 기본 가로 사이즈 지정
	                defaultTableWidth: 500,



	                /*///////////////// New Options ///////////////// */

	                //표 전체 선택을 위한 이미지 URL 지정 (변경 지양)
	                tableSelectImageURL : 'images/cross_arrow.png',

	                //표 이동시 사용할 이미지 URL 지정 (변경 지양)
	                tableMoveHandlerImageURL : 'images/movehandler.png',

	                //표 드래그시 사용할 이미지 URL 지정 (변경 지양)
	                tableMoveImageURL : 'images/drag_table.png',

	                //Editor 내부에서 사용할 Style 지정 CSS 파일 (지양)
	                defaultEditorStylePath : '../stylesheets/editor_style.css',


	                //xhtml1.1 Doc Type 지정 예  (default null [Doctype 없음] )
	                defaultDocType : null, //{docType : 'xhtml1.1', publicId : '-//W3C//DTD XHTML 1.1//EN', systemId : 'http://www.w3c.org/TR/xhtml11/DTD/xhtml11.dtd'},

	                //Default Character Set 지정 예 (default utf-8)
	                defaultCharset : 'utf-8',

	                //Script Tag 제거 (script, vbscript) (default true)
	                useSecurityScript : true,

	                //DOM의 on-Event 제거 (false시 on-event들을 전체를 제거안함)
	                useSecurityEvent : true,

	                //제거하지 않을 Event의 Type들 지정 예 [ Array로 입력되는 on-Event는 제거되지 않습니다 ]
	                notRemoveEventTypes : [], // ['onclick','mousedown' .... n];

	                //Tab Size 지정 (Default 4)
	                tabSpaceSize : 4,

	                //Chrome Filter Paste Options (default true)
	                usePasteFilterForChrome : true,

	                //HTML & Image Confirm Option (default true)
	                usePasteConfirmForChrome : true,

	                //Editor Load시 Focus 주입 여부 적용 (default true)
//	                useFirstFocus : true,
	                useFirstFocus : false,

	                //Toolbar에 Table/Cell Lock 기능 사용 설정
	                useLockMenu : true,

	                //Table / Cell Lock Image URL 설정
	                lockImageURL : 'images/lock.png',

	                //Color Picker 값 수정
	                colorPicker : {
	                    simpleColor :   ["ffffff", "000000", "eeece1", "1f497d", "4f81bd", "c0504d", "9bbb59", "8064a2", "4bacc6", "f79646"],
	                    standardColor : ["f2f2f2", "808080", "ddd9c3", "c6d9f1", "dce6f2", "f2dcdb", "ebf1de", "e6e0ec", "dbeee0", "fdeada",
	                        "d9d9d9", "595959", "c4bd97", "8eb4e3", "b9cde5", "e6b9b8", "d7e4bd", "ccc1da", "b7dee8", "fcd5b5",
	                        "bfbfbf", "404040", "948a54", "558ed5", "95b3d7", "d99694", "c3d69b", "b3a2c7", "93cddd", "fac090",
	                        "a6a6a6", "262626", "4a452a", "17375e", "376092", "953735", "77933c", "604a7b", "31859c", "e46c0a",
	                        "808080", "0d0d0d", "1e1c11", "10243f", "254061", "632523", "4f6228", "403152", "215968", "984807"],
	                    normalColor   : ["c00000", "ff0000", "ffc000", "ffff00", "92d050", "00b050", "00b0f0", "0000ff", "002060", "7030a0"]
	                },

	                useAdjustForChrome : true,

	                //Cell None Border Visualize
	                useNoneBorderVisualize : true, //Default : false

	                //사용할 Line Height 설정
	                lineHeight : [{name: "0.5", value: "0.5"}, {name: "1.5", value: "1.5"}],

	                //HTML Mode에서 Text Content를 별도의 Indent 처리 할지 여부 설정 [Default : true]
	                useHtmlModeTextIndent : true,

	                // Dialog의 이동범위를 Editor 영역 안으로 지정 여부 [Default : true]
	                useDialogMoveConfineEditor : false,

	                licPathURL : ['/resources/KukudocsEditor/kukudocs.lic'],
	                
	                //Footer Menu 사용유무 지정
	                useFooterMenu : false,

	                //Editor Menu 사용유무 지정 기능이 아에 없음
//	                useEditorMenu : false,
	                useEditorMenu : true,
	                
	                //HTML Menu 사용유무 지정
	                useHtmlMode : false,
	                
	                //Text Menu 사용유무 지정
	                useTextMode : false,

	                //Preview Menu 사용유무 지정
	                usePreviewMode : true,
	                
	                //Editor Resize Menu 사용유무 지정
	                useEditorResize : false,

	                //MenuBar 사용유무 지정
//	                useMenuBar : true
	            });
}