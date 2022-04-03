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
var usrSelect = window.sessionStorage.getItem("USR_GRD_CD");


//파라미터셋팅 nofifyAllList
function getJsonStrSelectNotifyListSearch(srchtype, srchval, tbbsStrtDt, tbbsEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"tbbs_strt_dt" : tbbsStrtDt,
			"tbbs_end_dt" : tbbsEndDt,
			"tbbs_cl_cd" : "020100",
			"usr_grd_cd" : window.sessionStorage.getItem("USR_GRD_CD")
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//보기 nofifyAllList
function getJsonStrSelectNotifyList(srchtype, srchval, tbbsStrtDt, tbbsEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"tbbs_strt_dt" : "",
			"tbbs_end_dt" : "",
			"tbbs_cl_cd" : "020100",
			"usr_grd_cd" : window.sessionStorage.getItem("USR_GRD_CD")
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//초기화버튼 클릭이벤트
function btnNotifyInitClickEvent() {
	$("#optSrchtypes").val("ttl");
	$("#tfSrchNt").val("");
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#tfTbbsEndDt").val(getDate());
	
	g_srchtype = "ttl";
	g_srchval = "";
	g_tbbsStrtDt = $("#tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#tfTbbsEndDt").val().replace(/-/g,"");
	
	isModComm = false;

	$("#tfTbbsStrtDt").attr("disabled",true); 
	$("#tfTbbsEndDt").attr("disabled",true);
	
	//reload grid
	$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyListSearch(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "TBBS_ID", sortorder : "desc"});
	$("#tblNotifyList").trigger("reloadGrid");
}

//검색 조회버튼 클릭이벤트
function btnNotifySearchClickEvent() {
	g_srchtype = $("#optSrchtypes").val();
	g_srchval = $("#tfSrchNt").val();
	g_tbbsStrtDt = $("#tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#tfTbbsEndDt").val().replace(/-/g,"");
	
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
	$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectNotifyListSearch(g_srchtype, g_srchval, g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "TBBS_ID", sortorder : "desc"});
	$("#tblNotifyList").trigger("reloadGrid");
}

$(document).ready(function()
{
	if(usrSelect >= "030100")
		isMgr = true;
	 else 
		isMgr = false;

	if(usrGrdCd != null && usrGrdCd != "")
	{
		if(usrGrdCd >= "030100")
			isMngr = true;
		else
			isMngr = false;
	}
	
	datePicker("#tfTbbsStrtDt");
	datePicker("#tfTbbsEndDt");
	
	
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#tfTbbsEndDt").val(getDate());	
	
	g_tbbsStrtDt = $("#tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#tfTbbsEndDt").val().replace(/-/g,"");		
	
	$("#tblNotifyList").jqGrid({
		url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson :getJsonStrSelectNotifyListSearch("", "", g_tbbsStrtDt, g_tbbsEndDt)
			/*pJson : getJsonStrSelectNotifyList("", "", g_tbbsStrtDt, g_tbbsEndDt)*/
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["번호", "긴급여부", "제목", "작성자", "시작일시", "종료일시", "작성일시", "첨부파일", "조회수","읽음여부"],
		colModel : isMgr ? [
		            { name : "TBBS_ID", index : "TBBS_ID", align: "center", hidden : true},
		            { name : "EMRG_YN", index : "EMRG_YN", width : 80, align: "center" ,edittype:'text',editrules:{required:true}
		            ,cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
		            	if ( rowObject.EMRG_YN == "긴급" ) { return 'style="text-align:center;color:blue;"' }
		              }
		            },
		            { name : "TBBS_TTL", index : "TBBS_TTL",align: "left" ,width : isMngr ? 360 : 360 },
		            { name : "MOD_USR_NM", index : "MOD_USR_NM", width :60, align: "center" },
		            { name : "TBBS_STRT_DT_FORMAT", index : "TBBS_STRT_DT_FORMAT", width : 80, align: "center" },
		            { name : "TBBS_END_DT_FORMAT", index : "TBBS_END_DT_FORMAT", width : 80, align: "center" },
		            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 80, align: "center" },
		            { name : "FL_NUM", index : "FL_NUM", width : 80, align: "center" },
		            { name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", width : 60, align: "center" ,edittype:'text',editrules:{required:true}
		            ,cellattr: function ( rowId , tv , rowObject , cm , rdata){
		            	return 'style="text-decoration: underline;cursor:pointer;"' 
		            }},
		            { name : "USR_RD", index : "USR_RD", hidden : true, width : 40, align: "center",cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
		            	if ( rowObject.USR_RD == "미확인" ) { return 'style="text-align:center;color:red;"' }
		              }}
		            ]: [
			            { name : "TBBS_ID", index : "TBBS_ID", width : 20, align: "center", hidden : true},
			            { name : "EMRG_YN", index : "EMRG_YN", width : 60, align: "center" ,edittype:'text',editrules:{required:true}
			            ,cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
			            	if ( rowObject.EMRG_YN == "긴급" ) { return 'style="text-align:center;color:blue;"' }
			              }
			            },
			            { name : "TBBS_TTL", index : "TBBS_TTL",align: "center" ,width : isMngr ? 390 : 390 },
			            { name : "MOD_USR_NM", index : "MOD_USR_NM", width :60, align: "center" },
			            { name : "TBBS_STRT_DT_FORMAT", index : "TBBS_STRT_DT_FORMAT", width : 80, align: "center" },
			            { name : "TBBS_END_DT_FORMAT", index : "TBBS_END_DT_FORMAT", width : 80, align: "center" },
			            { name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", width : 80, align: "center" },
			            { name : "FL_NUM", index : "FL_NUM", width : 75, align: "center" },
			            { name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", width : 60, align: "center" },//읽음여부
			            { name : "USR_RD", index : "USR_RD", width : 40, hidden : true, align: "center",cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
			            	if ( rowObject.USR_RD == "미확인" ) { return 'style="text-align:center;color:red;"' }
			              }}
			            ],
        sortname : "TBBS_ID",
        sortorder : "desc",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "660",
        width : "80%",
        rowNum : 10,
        rowList : [10, 20, 30, 40,50,60,70,80],
        autowidth : true,
        pager : "#pgNotifyList",
        rownumbers : false,
        rownumWidth : 30,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        viewrecords: true,
        multiselect: false,
        onCellSelect : function(rowid, iCol, cellContent, e)
        {
        	//관리자가 들어와서 클릭할때 
        	var g_usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
        	var row = $("#tblNotifyList").getRowData(rowid);
        	var uTbbs_listNum = window.sessionStorage.setItem("uTbbs_id",row.TBBS_ID);
        	var uTbbs_listSday= window.sessionStorage.setItem("utbbs_strt_dt",$("#tfTbbsStrtDt").val());
        	var uTbbs_listEday= window.sessionStorage.setItem("utbbs_end_dt",$("#tfTbbsEndDt").val());

	
        	if (iCol > 1) {
        		$("#tblNotifyList").jqGrid("setSelection", rowid, false);
        		
        		
        	}
        	if(iCol==2){
        		//row.TBBS_ID
        		var width = 1110;
        		var height = 670;
        		var top = (screen.height - height) / 2;
        		var left = (screen.width - width) / 2;
        		var ntbbsId=window.sessionStorage.getItem("uTbbs_id");
        		var paramURL = getContextPath() + "/web/main/mnoticeSelect.do?NTBBS_ID=" + ntbbsId;
        		var option = "width=" + width + ", height=" + height
        			+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
        			+ top + ",left=" + left +"";
        		var newWindow = window.open(paramURL, "공지게시판", option);
        		newWindow.focus();
        		
        	}
        	if(iCol==8){
        		if(g_usrGrdCd >= "030100")
        			gf_openModalDialog("/web/myinfo/myNotifyCountList.do", 420, 370, "no", "no");
        			
        	}
        },
		gridComplete : function()
		{
			
			/*// 메인 하단에서 클릭 했을 경우
			if(g_showNoticeFlag == false && window.sessionStorage.getItem("notice_tbbs_id") != null && window.sessionStorage.getItem("notice_tbbs_id") != "")
			{
				g_showNoticeFlag = true;
				//currTbbsId = window.sessionStorage.getItem("notice_tbbs_id");//
				
				//showBoardContents(window.sessionStorage.getItem("notice_tbbs_id"));
			}*/
		},
        error : function(data, status, err)
        {
        	
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#pgNotifyList", {edit : false, add : false, del : false, search : false});
	

	//검색 조회버튼 클릭이벤트 등록
	$("#btnNotifySearch").bind("click", btnNotifySearchClickEvent);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnNotifySearchClickEvent();
	});
	
	//초기화버튼 클릭이벤트 등록
	$("#btnNotifyInit").bind("click", btnNotifyInitClickEvent);

	var sh_fday=$("#tfTbbsStrtDt"); 
	var sh_lday=$("#tfTbbsEndDt");//날짜

	//날짜 비활성화
	sh_fday.attr("disabled",true);
	sh_lday.attr("disabled",true);
	
});