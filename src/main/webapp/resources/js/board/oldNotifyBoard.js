//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var currRowid = "";
var currTbbsId = "";
var g_content="";

//파라미터셋팅 nofifyList
function getJsonStrGeneralList(srchtype, srchval) {  //ok
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTguc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 selectGeneral -- ok
function getJsonStrSelectGeneral(tbbsId) {
	var loParam = {
		"qt" :	"c2VsZWN0T25l",
		"mi" : "b20wMTguc2VsZWN0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터셋팅 fileList    --ok
function getJsonGeneralBoardFileList(tbbsId) {		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om018",
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
	$("#oldNtfBrd_optSrchtype").val("ttl");
	$("#oldNtfBrd_tfSrchval").val("");
	g_srchtype = "ttl";
	g_srchval = "";
	boardContentSlideup();
	$("#oldNtfBrd_tblGeneralList").trigger("reloadGrid");
}

//검색 조회버튼 클릭이벤트
function btnSearchClickEvent() {
    $("#oldNtfBrd_tblGeneralList").jqGrid("setGridParam", {
	postData : {
	    pJson : getJsonStrGeneralList($("#oldNtfBrd_optSrchtype").val(), $("#oldNtfBrd_tfSrchval").val())
	}, 
	page : 1, 
	sortname : "TBBS_ID", 
	sortorder : "desc"
    }).trigger("reloadGrid");
}

//목록보기버튼 클릭이벤트
function btnShowGeneralClickEvent() {
	boardContentSlideup();
}

//게시물 슬라이드업
function boardContentSlideup() {
    $("#board_content").slideUp(function() {
	currRowid = "";
	currTbbsId = "";
	initBoardContent();
    });
}

//게시물 슬라이드다운
function boardContentSlidedown(rowid) {
    initBoardContent();
    $("#board_content").slideDown(function() { currRowid = rowid; });
}
	

//게시물 내용 초기화
function initBoardContent() {
	$("#oldNtfBrd_sTbbsTtl").empty();
	$("#pCommNum").empty();
	$("#oldNtfBrd_sUsrNm").empty();
	$("#sTbbsInQrCnt").empty();
	$("#sCrtDt").empty();
	$("#sCrtTm").empty();
	$("#oldNtfBrd_dTbbsCntn").empty();
	$("#oldNtfBrd_fileInfos").empty();
	$("#tblComments").empty();
	$("#taCommCntn").val("");
}

function attachment (tbbsid){
    //첨부파일
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/board/generalBoardFileList.do",
	data : "pJson=" + getJsonGeneralBoardFileList(tbbsid),
	success : function(data) {
	  
	    if(data != null && data != "") {
		var tr ="<tr><th style='width: 80%;'>첨부파일이름</th>" +"<th style='width: 20%;'>용량</th></tr>";
		
		for(var i in data) {
		    var url = getContextPath() + "/file/board/generalBoardFileDown.do?pJson=" 
		    + getJsonGeneralBoardFileDown(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
		    tr += "<tr>";
		    tr += "<td><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></td>";
		    tr += "<td><span>" + data[i].FL_KB_SZ + " kb</span></td>";
		    tr += "</tr>";
		}
		$("#oldNtfBrd_fileInfos").append(tr);
	    }
	},
	error : function(data, status, err) {
	  //  networkErrorHandler(data, status, err);
	}
    });
}

function selectContent(tbbsid){
    //게시물 가져오기
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/board/selectGeneral.do",
	data : "pJson=" + getJsonStrSelectGeneral(tbbsid),
	success : function(data) {
	    $("#oldNtfBrd_sTbbsTtl").html(data.TBBS_TTL);
	    $("#oldNtfBrd_sUsrNm").html(data.MOD_USR_NM);
	    //$("#sTbbsInQrCnt").html(data.TBBS_INQR_CNT);
	    $("#oldNtfBrd_sModDt").html(data.MOD_DT_FORMAT);
	    $("#oldNtfBrd_sModTm").html(data.MOD_TM_FORMAT);
	    $("#oldNtfBrd_dTbbsCntn").append(data.TBBS_CNTN);
	},
	error : function(data, status, err) {
	    //networkErrorHandler(data, status, err);
	}
    });
    
    //첨부파일추가	
    attachment(tbbsid);
}

function searchTotal(tbbsid){
    //게시물 조회시 조회수 업데이트
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : getContextPath() + "/ajax/board/boardAccess.do",
	data : "pJson=" + getJsonStrBoardAccess(tbbsid),
	success : function(data) {
	},
	error : function(data, status, err) {
	    //networkErrorHandler(data, status, err);
	}
    });
}

function createGrid(){
	$("#oldNtfBrd_tblGeneralList").jqGrid({
		url : getContextPath() + "/jqgrid/board/GeneralList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrGeneralList("", "")
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["번호", "제목", "작성자", "작성일", "첨부파일"],
		colModel : [
		            { name : "TBBS_ID", index : "TBBS_ID", width : 100, align: "center", hidden : true},
		            { name : "TBBS_TTL", index : "TBBS_TTL", width : 400 },
		            { name : "MOD_USR_NM", index : "MOD_USR_NM", width : 60, align: "center" },
		            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 60, align: "center" },
		            { name : "FL_NUM", index : "FL_NUM", width : 50, align: "center" },
//		            { name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", width : 100, align: "center" }			
		            ],
		            sortname : "crt_dt_format",
		            sortorder : "desc",
		            gridview : true,
		            hidegrid : false,
		            shrinkToFit : true,
		            loadonce : false,
		            scrollOffset : 0,
		            height : "520",
		            width : "100%",
		            rowNum : 20,
		            rowList : [10, 20, 30],
		            autowidth : true,
		            pager : "#oldNtfBrd_pgGeneralList",
		            rownumbers : true,
		            rownumWidth : 30,
		            emptyrecords : "",
		            caption : "",
		            loadui : "enable",
		            viewrecords: true,
		            onCellSelect : function(rowid, iCol, cellContent, e) {		            
		        	var row = $("#oldNtfBrd_tblGeneralList").getRowData(rowid);
		        	var rowTbbsId = row.TBBS_ID;
		        	
		        	if(rowid !== currRowid) {
		        	    //내용가져오기	
		        	    selectContent(rowTbbsId);	
		        	    //조회수update
//		        	    searchTotal(rowTbbsId);
		        	    //slidedown
		        	    boardContentSlidedown(rowid);
		        	    
		        	} else {
		        	    boardContentSlideup();
		        	}
		            	
		            },
		    		gridComplete : function() {
		    			var total = $(this).getGridParam("records"); $("#oldNtfBrd_pTotal").html("총 " + total + "건");
		    		},
		            error : function(data, status, err) {
		            	//networkErrorHandler(data, status, err);
		            }
	}).jqGrid("navGrid", "#oldNtfBrd_pgGeneralList", {edit : false, add : false, del : false, search : false});
}

function initDate(){
    datePicker("#tfTbbsStrtDt");
    datePicker("#tfTbbsEndDt");
}

$(document).ready(function() {
    	
    	//날짜 초기화
    	initDate();
	
    	//그리드 생성
	createGrid();
	
	//검색 조회버튼 클릭이벤트 등록
	$("#oldNtfBrd_btnSearch").bind("click", btnSearchClickEvent);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#oldNtfBrd_tfSrchval").bind("keydown", function (key) { if (key.keyCode == 13) { btnSearchClickEvent(); } });
	
	//초기화버튼 클릭이벤트 등록
	$("#oldNtfBrd_btnInit").bind("click", btnInitClickEvent);

	//목록보기버튼 클릭이벤트 등록
	$("#oldNtfBrd_btnShowGeneral").bind("click", btnShowGeneralClickEvent);
});