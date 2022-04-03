//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var currRowid = "";
var currTbbsId = "";
var lastsel2="";
//파라미터셋팅 nofifyList
function getJsonStrGeneralListOld(srchtype, srchval) {  
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTguc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
		}
	};	
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 selectGeneral 
function getJsonStrSelectGeneralOld(tbbsId) {
	var loParam = {
		"qt" :	"c2VsZWN0T25l",
		"mi" : "b20wMTguc2VsZWN0",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId
		}
	};	
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터셋팅 fileList   
function getJsonGeneralBoardFileListOld(tbbsId) {		
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
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 fileDown
function getJsonGeneralBoardFileDownOld(svr, loc) {		
	var loParam = {
			"svrFilePath" : svr,
			"locFileName" : loc
	};
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//초기화버튼 클릭이벤트
function btnInitClickEventOld() {
    $("#csodbd_optSrchtype").val("ttl");
    $("#csodbd_tfSrchval").val("");
    g_srchtype = "ttl";
    g_srchval = "";
    boardContentSlideupOld();
    $("#csodbd_tblGeneralList").jqGrid("setGridParam", {
	postData : {
	    pJson : getJsonStrGeneralListOld($("#csodbd_optSrchtype").val(), $("#csodbd_tfSrchval").val())
	}, 
	page : 1, 
	sortname : "TBBS_ID", 
	sortorder : "desc"
    }).trigger("reloadGrid");
}

//검색 조회버튼 클릭이벤트
function btnSearchClickEventOld() {
    $("#csodbd_tblGeneralList").jqGrid("setGridParam", {
	postData : {
	    pJson : getJsonStrGeneralListOld($("#csodbd_optSrchtype").val(), $("#csodbd_tfSrchval").val())
	}, 
	page : 1, 
	sortname : "TBBS_ID", 
	sortorder : "desc"
    }).trigger("reloadGrid");
}

//목록보기버튼 클릭이벤트
function btnShowGeneralClickEventOld() {
	boardContentSlideupOld();
}

//게시물 슬라이드업
function boardContentSlideupOld() {
    $("#csodbd_board_content").slideUp(function() {
	currRowid = "";
	currTbbsId = "";
	initBoardContentOld();
    });
}

//게시물 슬라이드다운
function boardContentSlidedownOld(rowid) {
    initBoardContentOld();
    $("#csodbd_board_content").slideDown(function() { currRowid = rowid; });
}
	

//게시물 내용 초기화
function initBoardContentOld() {
	$("#csodbd_sTbbsTtl").empty();
	$("#csodbd_pCommNum").empty();
	$("#csodbd_sUsrNm").empty();
	$("#csodbd_sTbbsInQrCnt").empty();
	$("#csodbd_sCrtDt").empty();
	$("#csodbd_sCrtTm").empty();
	$("#csodbd_dTbbsCntn").empty();
	$("#csodbd_fileInfos").empty();
	$("#csodbd_tblComments").empty();
	$("#csodbd_taCommCntn").val("");
}

function attachmentOld(tbbsid){
    //첨부파일
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonGeneralBoardFileListOld(tbbsid),
	success : function(data) {
	  
	    if(data != null && data != "") {
		var tr ="<tr><th style='width: 80%;'>첨부파일이름</th>" +"<th style='width: 20%;'>용량</th></tr>";
		
		for(var i in data) {
		    var url = "/file/board/generalBoardFileDown.do?pJson=" 
		    + getJsonGeneralBoardFileDownOld(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
		    tr += "<tr>";
		    tr += "<td><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></td>";
		    tr += "<td><span>" + data[i].FL_KB_SZ + " kb</span></td>";
		    tr += "</tr>";
		}
		$("#csodbd_fileInfos").append(tr);
	    }
	},
	error : function(data, status, err) {
	  //  networkErrorHandler(data, status, err);
	}
    });
}

function selectContentOld(tbbsid){
    //게시물 가져오기
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrSelectGeneralOld(tbbsid),
	success : function(data) {
	    $("#csodbd_sTbbsTtl").html(data.TBBS_TTL);
	    $("#csodbd_sUsrNm").html(data.MOD_USR_NM);
	    //$("#csodbd_sTbbsInQrCnt").html(data.TBBS_INQR_CNT);
	    $("#csodbd_sModDt").html(data.MOD_DT_FORMAT);
	    $("#csodbd_sModTm").html(data.MOD_TM_FORMAT);
	    $("#csodbd_dTbbsCntn").append(data.TBBS_CNTN);
	},
	error : function(data, status, err) {
	    //networkErrorHandler(data, status, err);
	}
    });
    
    //첨부파일추가	
    attachmentOld(tbbsid);
}

function searchTotalOld(tbbsid){
    //게시물 조회시 조회수 업데이트
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrBoardAccessOld(tbbsid),
	success : function(data) {
	},
	error : function(data, status, err) {
	    //networkErrorHandler(data, status, err);
	}
    });
}

function createGridOld(){
	$("#csodbd_tblGeneralList").jqGrid({
		url : "/jqgrid/civilservice/csw.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrGeneralListOld("", "")
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["번호","기관","기관/부서", "제목", "작성자", "작성일","승인여부", "첨부파일"],
		colModel : [
		            { name : "TBBS_ID", index : "TBBS_ID", width : 100, align: "center", hidden : true},
		            { name : "CNTR_NM", index : "CNTR_NM", hidden : true},
		            { name : "TEAM_NM", index : "TEAM_NM", width : 300, formatter: function (cellvalue, options, rowobj) {
		        	 var str = rowobj.CNTR_NM==null?"":rowobj.CNTR_NM;
		        	 var str2 = rowobj.TEAM_NM==null?"":rowobj.TEAM_NM;
		        	 return str +" "+str2;}},
		            { name : "TBBS_TTL", index : "TBBS_TTL", width : 800 },
		            { name : "MOD_USR_NM", index : "MOD_USR_NM", width : 100, align: "center" },
		            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 100, align: "center" },
		   	    { name : "CC_APPR_YN", index : "CC_APPR_YN", align : "center", width : 100, editable: true, edittype: "select", 
	   	 		editoptions:{align : "center", value : initSelectOld , dataEvents : [{ type:"change", fn: changeEventOld}]}   	 	
		   	    },
		            { name : "FL_NUM", index : "FL_NUM", width : 100, align: "center" },
		            ],
		            sortname : "TBBS_ID",
		            sortorder : "desc",
		            gridview : false,
		            hidegrid : false,
		            shrinkToFit : true,
		            loadonce : false,
		            scrollOffset : 0,
		            height : "520",
		            width : "100%",
		            rowNum : 20,
		            rowList : [10, 20, 30],
		            autowidth : true,
		            pager : "#csodbd_pgGeneralList",
		            rownumbers : true,
		            rownumWidth : 30,
		            emptyrecords : "",
		            caption : "",
		            loadui : "enable",
		            viewrecords: true,
		            onCellSelect : function(rowid, iCol, cellContent, e) {		            
		        	
				if(rowid && rowid!==lastsel2){
					$('#csodbd_tblGeneralList').jqGrid('restoreRow',lastsel2);
					lastsel2=rowid;
				}
				
		        	if(iCol == 7){
		        	 $('#csodbd_tblGeneralList').jqGrid('editRow',rowid,true);  
		        	}
		       
		        	
		        	if(iCol != 7) {
			        	var row = $("#csodbd_tblGeneralList").getRowData(rowid);
			        	var rowTbbsId = row.TBBS_ID;

			        	if(rowid !== currRowid) {
			        	    //내용가져오기	
			        	    selectContentOld(rowTbbsId);	
			        	    //조회수update
//			        	    searchTotal(rowTbbsId);
			        	    //slidedown
			        	    boardContentSlidedownOld(rowid);
			        	} else {
			        	    boardContentSlideupOld();
			        	}
			        	
		        	}
		        	
		            },
		    		gridComplete : function() {
		    			var total = $(this).getGridParam("records"); $("#csodbd_pTotal").html("총 " + total + "건");
		    			
	
		    				var selectVal = "0";
		    				var tblLength = $("#csodbd_tblTargetList").getGridParam("reccount");
		    				for(var i = 1; i <= tblLength; i++)
		    				{
		    					if($("#csodbd_tblTargetList").getCell(i, "TRGT_YN") == "0")
		    						selectVal = "1";
		    				}
		    				
		    				for(var i = 1; i <= tblLength; i++){
		    				    $("#csodbd_tblTargetList").setCell(i, "TRGT_YN", selectVal);
		    				    jQuery('#csodbd_tblTargetList').jqGrid('editRow',i,true);
		    				}
		    			
		    			
		    			
		    			
		    		},
		            error : function(data, status, err) {
		            	//networkErrorHandler(data, status, err);
		            }
	}).jqGrid("navGrid", "#csodbd_pgGeneralList", {edit : false, add : false, del : false, search : false});
}

function initDateOld(){
    datePicker("#csodbd_tfTbbsStrtDt");
    datePicker("#csodbd_tfTbbsEndDt");
}


//jqgrid selectbox init
function initSelectOld()
{
 return "Y:Y;N:N"
}

function changeEventOld(e){
	//해당줄의 rowid를 가져온다  
	var selectedRowId =  $("#csodbd_tblGeneralList").getGridParam('selrow');	
	var tbbsid = $('#csodbd_tblGeneralList').getRowData(selectedRowId).TBBS_ID;
	var evalue = $(e.target).val();   
	var map ={ "tbbs_id" : tbbsid, cc_appr_yn :evalue, "sendingUid": sendingUid};
	
	//게시물 업데이트
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" +getJsonStr("dXBkYXRl", "b20wMTgudXBkYXRl", map),
		success : function(data) {
		    alert("변경되었습니다.");
		    $("#csodbd_tblGeneralList").trigger("reloadGrid");
		},
		error : function(data, status, err) {
		    //networkErrorHandler(data, status, err);
		    $("#csodbd_tblGeneralList").trigger("reloadGrid");
		}
	    });
}


$(document).ready(function() {
    	
    	//날짜 초기화
    	initDateOld();
	
    	//그리드 생성
	createGridOld();
	
	//검색 조회버튼 클릭이벤트 등록
	$("#csodbd_btnSearch").bind("click", btnSearchClickEventOld);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#csodbd_tfSrchval").bind("keydown", function (key) { if (key.keyCode == 13) { btnSearchClickEventOld(); } });
	
	//초기화버튼 클릭이벤트 등록
	$("#csodbd_btnInit").bind("click", btnInitClickEventOld);

	//목록보기버튼 클릭이벤트 등록
	$("#csodbd_btnShowGeneral").bind("click", btnShowGeneralClickEventOld);
});