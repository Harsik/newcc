var obj010 = {};

// 상담DB 변수
var obj021 = {};
var obj022 = {};

var nonAsign;
var totCnt;
var stotCnt = 0;

var obj010RowId;

var g_use_yn = new Array();
g_use_yn = [true];

function btnSearch_1_clickEvent()
{
	var frDt = $("#selFrDate_1").val();
	var toDt = $("#selToDate_1").val();
	var cmpgNm = $("#txtSearch1").val();
	var optSrchtype = $("#progressStatus_1").val();
	var cmpgtype = $("#cmpgtype_1").val();
	
	$("#btnUpdate_1").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();
	
	$("#cmpgId_2").val("");
	$("#cmpgtype_2").val("");
	$("#selFrDate_2").val("");
	$("#selToDate_2").val("");
	$("#surveyCnt_2").html("");
	$("#surveyNmCnt_2").html("");
	$("#survetName_2").val("");
	$("#surveyArea_2").val("");
	
	if(frDt != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if(toDt != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	$("#tbl010").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value",
		"fr_dt" : frDt,
		"to_dt" : toDt,
		"cmpg_nm" : cmpgNm,
		"opt_srchtype" : optSrchtype,
		"cmpg_type" : cmpgtype
	})} , page : 1, sortname : "STRT_DT", sortorder : "desc"});
	$("#tbl010").trigger("reloadGrid");
	
	obj010 = {};


	nonAsign = "";
	
	
}



function btnReset_1_clickEvent() 
{
	$("#txtSearch1").val("");
	$("#progressStatus_1").val("all");
	$("#cmpgtype_1").val("all");
	$("#selFrDate_1").val(getDate());
	$("#selToDate_1").val(getDate());
	$("#tbl010").resetSelection();
	
	$("#btnUpdate_1").hide();
	$("#btnDelete_2").hide();
	$("#btnInsert_2").show();
	
	$("#cmpgId_2").val("");
	$("#cmpgtype_2").val("all");
	$("#selFrDate_2").val("");
	$("#selToDate_2").val("");
	$("#surveyCnt_2").html("");
	$("#surveyNmCnt_2").html("");
	$("#survetName_2").val("");
	$("#surveyArea_2").val("");
	
	btnSearch_1_clickEvent();
}


function btnUpdate_2_clickEvent()
{

}

function btnUpdate_1_clickEvent()
{

}


//============================================================================================
//상담DB 이벤트 등록

//부서DB목록 신규등록버튼 클릭이벤트
function btnAddCounselDB_clickEvent()
{
	var strTbbsId = obj022.TBBS_ID;
	var strCdbId = obj022.CDB_ID;

	if (strCdbId != "" && strCdbId != undefined)
	{
		var width = 1020;
		var height = 950;
		var top = (screen.height - height) / 2;
		var left = (screen.width - width) / 2;	
		
		var paramURL = getContextPath() + "/web/counsel/counseldbForm.do";
		var option = "width=" + width + ", height=" + height 
			+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
			+ top + ",left=" + left +"";
		
		//90039 (020100:공지사항, 030100:일반, 040100:지식검색, 050100:상담DB)
		window.sessionStorage.setItem("BOARD_TYPE", "050100.insert");
		window.sessionStorage.setItem("CDB_ID", strCdbId);		// 상담DB요청 key
		
		var newWindow = window.open(paramURL, "신규DB 등록", option);
		newWindow.focus();
	}
	else
	{
		alert("등록하고자 하는 부서DB를 선택해 주세요");
		return;				
	}		
		
}

//상담DB 이벤트 등록
//============================================================================================

// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
function init_grid(pMap)
{
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	   	ondblClickRow : window[pMap.dblClickEvent],
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

function tbl010_SelectRow(rowid)
{
    obj010 = $("#tbl010").jqGrid('getRowData', rowid);

    $("#cmpgId_2").val(obj010.CMPG_ID);
    $("#cmpgtype_2").val(obj010.TYPE_CD);
    $("#surveyCnt_2").html(obj010.VLTN_CNT);
    $("#selFrDate_2").val(obj010.STRT_DT);
    $("#selToDate_2").val(obj010.END_DT);
    $("#survetName_2").val(obj010.CMPG_NM);
    $("#surveyArea_2").val(obj010.CMPG_DSC);
    $("#surveyNmCnt_2").html(obj010.TRGT_CUST_CNT);
    
    $("#surveyName_4").html(obj010.CMPG_NM);
    $("#surveyDay_4").html(obj010.STEND_DT);
    $("#cmpgType_4").html(obj010.CMPG_TYPE_CD);
    $("#surveyCnt_4").html(obj010.VLTN_CNT);
    select_cntEvent();
    
    $("#surveyName_5").html(obj010.CMPG_NM);
    $("#surveyDay_5").html(obj010.STEND_DT);
    $("#cmpgType_5").html(obj010.CMPG_TYPE_CD);
    $("#surveyCnt_5").html(obj010.VLTN_CNT);
   
	$("#btnUpdate_1").show();
	$("#btnDelete_2").show();
	$("#btnInsert_2").hide();
	$("#btnInsert_3").show();
	$("#btnReset_3").trigger("click");
	
    $("input:radio[name='90023']:input[value=" + obj010.PROC_ST_CD + "]").prop("checked", true);

}


// 상담DB >> 요청DB목록
function tbl021_SelectRow(rowid)
{
	obj021 = $("#tbl021").jqGrid('getRowData', rowid);
	
	$("#cDbId_Tab1").val(obj021.CDB_ID);				// CDB ID
	$("#reqGbCd_Tab1").html(obj021.REQ_GB_NM);			// 요청구분
	$("#reqUsrNm_Tab1").html(obj021.REQ_USR_NM);		// 요청자
	$("#counselCd_Tab1").html(obj021.INTV_NM);			// 상담유형
	$("#reqCont_Tab1").html(obj021.REQ_CONT);			// 요청내용
	$("#deptNm_Tab1").html(obj021.ORGFULLNAME);			// 담당부서
	
	if (obj021.ACT_ST_CD != "")
		$("#actStCd_Tab1").val(obj021.ACT_ST_CD);		// 처리상태
	else
		$("#actStCd_Tab1").val("all");
	$("#cDbNm_Tab1").val(obj021.TBBS_NM);				// 상담DB
	$("#cTbbsId_Tab1").val(obj021.TBBS_ID);				// 상담DB ID	
	$("#rtnRsn_Tab1").val(obj021.RTN_RSN);				// 반송사유
	
	var str_dept_id = obj021.DEPT_ID;
	var str_orgusrid = obj021.ORG_USR_ID;
	
	if (str_dept_id != "")
	{	
		$('#orgUsrId_Tab1').empty();
		
		//담당자 selection
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/user/userList.do",
			data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNjEuc2VsZWN0Q291bnNlbERlcHRVc2Vy", {
				"deptId" : str_dept_id,
				 
			}),
			success : function(data)
			{
				var option = "<option value='all' selected>미선택</option>";
				
				for(var i in data)
					option += "<option value='" + data[i].USR_ID + "'>" + data[i].USR_NM + "</option>";
				
					$("#orgUsrId_Tab1").append(option);
					
					if (str_orgusrid != "")
						$("#orgUsrId_Tab1").val(str_orgusrid);			// 담당자
					else
						$("#orgUsrId_Tab1").val("all");
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}	
		});	
	}	
}

// 상담DB >> 부서DB목록
function tbl022_SelectRow(rowid)
{
	obj022 = $("#tbl022").jqGrid('getRowData', rowid);
	
	var strTbbsId = obj022.TBBS_ID;
	var strCdbId = obj022.CDB_ID;
	
	if (strTbbsId != "")
		$("#btnAddCounselDB").hide();
	else 
		$("#btnAddCounselDB").show();
}

//상담DB >> 부서DB목록(상담DB 상세조회 및 수정)
function tbl022_DblClickRow(rowid)
{
	obj022 = $("#tbl022").jqGrid('getRowData', rowid);
	
	var strTbbsId = obj022.TBBS_ID;
	var strCdbId = obj022.CDB_ID;
	
	if (strTbbsId != "")
	{
		var width = 1020;
		var height = 950;
		var top = (screen.height - height) / 2;
		var left = (screen.width - width) / 2;	
		
		var paramURL = getContextPath() + "/web/counsel/counseldbForm.do";
		var option = "width=" + width + ", height=" + height 
			+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
			+ top + ",left=" + left +"";
		
		//90039 (020100:공지사항, 030100:일반, 040100:지식검색, 050100:상담DB)
		window.sessionStorage.setItem("BOARD_TYPE", "050100.modify");
		window.sessionStorage.setItem("CDB_ID", strCdbId);		// 상담DB요청 key
		window.sessionStorage.setItem("TBBS_ID", strTbbsId);	// 게시물 key
		
		var newWindow = window.open(paramURL, "상담DB 수정", option);
		newWindow.focus();	
		
		$("#tbl022").trigger("reloadGrid");
	}
}

//담당자지정 / 담당자처리
function tbl010_init_grid()
{
	pMap = {};
	pMap.tblId = "tbl010";
	pMap.url   = "/jqgrid/campaign/tbl010Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value" ,
		"fr_dt" : $("#selFrDate_1").val().replace(/-/gi, ""),
		"to_dt" : $("#selToDate_1").val().replace(/-/gi, ""),
		"cmpg_nm" : $("#txtSearch1").val(),
		"opt_srchtype" : $("#progressStatus_1").val(),
		"cmpg_type" : $("#cmpgtype_1").val()
	});
	pMap.colNames = ["민원인", "전화번호","이관민원", "민원구분", "담당부서", "담당자","요청구분","진행상태"];
	pMap.colModel =
   	[
   	 	{ name : "CMPG_NM", index : "CMPG_NM", align : "center", width : 310 },
   	 	{ name : "CMPG_TYPE_CD", index : "CMPG_TYPE_CD", align : "center", width : 210 },
   	 	{ name : "STEND_DT", index : "STEND_DT", align : "center", width : 220 },
   	 	{ name : "TRGT_CUST_CNT" , index : "TRGT_CUST_CNT", align : "center", width : 103 },
   	 	{ name : "VLTN_CNT", index : "VLTN_CNT", align : "center", width : 103 },
   	 	{ name : "PROC_ST", index : "PROC_ST", align : "center", width : 160 },
   	 	{ name : "CMPG_ID", index : "CMPG_ID", align : "center", width : 160 },
   	 	{ name : "CMPG_DSC", index : "CMPG_DSC", align : "center", width : 160 }
   	];
	pMap.rowNum = "10";
	pMap.sortname = "STRT_DT";
	pMap.width = "100%";
	pMap.height = "230";
	pMap.pager = "pg010";
	pMap.selectEvent = "tbl010_SelectRow";
	pMap.rowNumber = true;
	
	init_grid(pMap);
}


// 상담DB >> 요청DB목록
function tbl021_init_grid()
{
	pMap = {};
	pMap.tblId = "tbl021";
	pMap.url   = "/jqgrid/counsel/tbl021Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wMTUuc2VsZWN0TGlzdA==", {
		"key" : "value" ,
		"fr_dt" : $("#schReqFrDt_T1").val().replace(/-/gi, ""),
		"to_dt" : $("#schReqToDt_T1").val().replace(/-/gi, ""),
		"requsrid" : $("#schReqUsr_T1").val(),
		"actstcd" : $("#schActSt_T1").val(),
		"instcd" : $("#schInstCd").val(),
		"intvlgcd" : $("#schIntvLgCd").val(),
		"intvmdcd" : $("#schIntvMdCd").val(),
		"intvsmcd" : $("#schIntvSmCd").val()
	});
	pMap.colNames = ["요청일자", "요청자","요청구분", "상담유형", "요청내용", "담당부서","담당자","처리일자","처리상태", "전체부서명", "처리상태코드", "상담DB", "상담DB ID", 
	                 "INST_CD", "INTV_LG_CD", "INTV_MD_CD", "INTV_SM_CD", "반송사유", "부서ID", "담당자ID", "CDB_ID"];
	pMap.colModel =
   	[
   	 	{ name : "REQ_DT", index : "REQ_DT", align : "center", width : 80 },
   	 	{ name : "REQ_USR_NM", index : "REQ_USR_NM", align : "center", width : 80 },
   	 	{ name : "REQ_GB_NM", index : "REQ_GB_NM", align : "center", width : 80 },
   	 	{ name : "INTV_NM" , index : "INTV_NM", align : "center", width : 225 },
   	 	{ name : "REQ_CONT", index : "REQ_CONT", align : "left", width : 235 },
   	 	{ name : "DEPT_NM", index : "DEPT_NM", align : "center", width : 110 },
   	 	{ name : "ORG_USR_NM", index : "ORG_USR_NM", align : "center", width : 80 },
   	 	{ name : "ACT_DT", index : "ACT_DT", align : "center", width : 80 },
   	 	{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 80 },
   	 	{ name : "ORGFULLNAME", index : "ORGFULLNAME", hidden:true },
   	 	{ name : "ACT_ST_CD", index : "ACT_ST_CD", hidden:true },
   	 	{ name : "TBBS_NM", index : "TBBS_NM", hidden:true },
   	 	{ name : "TBBS_ID", index : "TBBS_ID", hidden:true },
   	 	{ name : "INST_CD", index : "INST_CD", hidden:true },
   	 	{ name : "INTV_LG_CD", index : "INTV_LG_CD", hidden:true },
   	 	{ name : "INTV_MD_CD", index : "INTV_MD_CD", hidden:true },
   	 	{ name : "INTV_SM_CD", index : "INTV_SM_CD", hidden:true },   	
   	 	{ name : "RTN_RSN", index : "RTN_RSN", hidden:true },
   	 	{ name : "DEPT_ID", index : "DEPT_ID", hidden:true },
   	 	{ name : "ORG_USR_ID", index : "ORG_USR_ID", hidden:true },
   	 	{ name : "CDB_ID", index : "CDB_ID", hidden:true }
   	];
	pMap.rowNum = "10";
	pMap.sortname = "REQ_DT";
	pMap.width = "100%";
	pMap.height = "230";
	pMap.pager = "pg021";
	pMap.selectEvent = "tbl021_SelectRow";
	pMap.rowNumber = true;
	
	init_grid(pMap);
}


// 상담DB >> 부서DB목록
function tbl022_init_grid()
{
	var chk_UseYn = $("input:checkbox[id='chkUse_T2']").is(":checked") ? "Y" : "N";
	var chk_ComYn = $("input:checkbox[id='chkComplete_T2']").is(":checked") ? "Y" : "N";	
	
	// 미사용포함
	if (chk_UseYn == "Y")
		chk_UseYn = "all";
	
	// 미완료포함
	if (chk_ComYn == "Y")
		chk_ComYn = "all";
	
	pMap = {};
	pMap.tblId = "tbl022";
	pMap.url   = "/jqgrid/counsel/tbl022Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wMTUuc2VsZWN0Q291bnNlbERlcHRMaXN0", {
		"key" : "value" ,
		"tbbsttl" : $("#txtJobNm_T2").val(),
		"deptnm"  : $("#schDept_T2").val(),
		"usrnm"   : $("#schOrgUsr_T2").val(),
		"reqgbcd" : $("#schRreqGb_T2").val(),
		"useyn"   : chk_UseYn,
		"actstcd" : chk_ComYn				
	});
	pMap.colNames = ["요청내용", "업무명", "담당부서","담당자", "등록일자", "수정자", "수정일자","사용구분","처리상태", "게시판ID", "상담DB ID"];
	pMap.colModel =
   	[
   	 	{ name : "REQ_CONT",   index : "REQ_CONT",   align : "left",   width : 140 },
   	 	{ name : "TBBS_TTL",   index : "TBBS_TTL",   align : "left",   width : 140 },
   	 	{ name : "DEPT_NM",    index : "DEPT_NM",    align : "left",   width : 100 },
   	 	{ name : "ORG_USR_NM", index : "ORG_USR_NM", align : "center", width : 70 },
   	 	{ name : "CRT_DT" ,    index : "CRT_DT",     align : "center", width : 80 },
   	 	{ name : "MOD_USR_NM", index : "MOD_USR_NM", align : "center", width : 70 },
   	 	{ name : "MOD_DT",     index : "MOD_DT",     align : "center", width : 80 },
   	 	{ name : "USE_NM",     index : "USE_NM",     align : "center", width : 70 },
   	    { name : "ACT_ST_NM",  index : "ACT_ST_NM",  align : "center", width : 70 },
   	    { name : "TBBS_ID",    index : "TBBS_ID",    hidden:true },
   	    { name : "CDB_ID",     index : "CDB_ID",     hidden:true }
   	];
	pMap.rowNum = "20";
	pMap.sortname = "CRT_DT";
	pMap.sortorder = "desc";
	pMap.width = "100%";
	pMap.height = "430";
	pMap.pager = "pg022";
	pMap.selectEvent = "tbl022_SelectRow";
	pMap.dblClickEvent = "tbl022_DblClickRow";
	pMap.rowNumber = true;
	
	init_grid(pMap);	
}

//상담DB > 요청DB목록 > 저장
function getJsonStrInsertCdReqinfo(cdbid) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTUudXBkYXRl",			/* om015.update */
		"map" : {
			"key" : "value",
			"org_usr_id" : $("#orgUsrId_Tab1").val(),
			"act_st_cd" : $("#actStCd_Tab1").val(),			
			"rtn_rsn" : $.trim($("#rtnRsn_Tab1").val()),
			"tbbs_id" : $("#cTbbsId_Tab1").val(),
			"cdb_id": cdbid
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_Category
function getJsonStrCategory()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjAuY2F0ZWdvcnlhbGw=",     /*om020.categoryall*/
		"map" : {
			"key" : "value"
		}		
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CategoryHeader
function getJsonStrCategorySearchLvl(categoryGb, categoryLvl, parntCd)
{
	var migb = "";
	
	if (categoryGb == "H")
		migb = "b20wMjAuY2F0ZWdvcnloZWFkZXI="; 		/*om020.categoryheader*/
	else
		migb = "b20wMjAuY2F0ZWdvcnlkZXRhaWw=";		/*om020.categorydetail*/

	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : migb,     
			"map" : {
				"key" : "value",
				"categoryGb" : categoryGb,
				"categoryLvl" : categoryLvl,
				"parntCd" : parntCd		
				
			}		
		};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/*
//파라미터 셋팅_CategoryHeader
function getJsonStrCategoryHeader()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjAuY2F0ZWdvcnloZWFkZXI=",     om020.categoryheader
		"map" : {
		"key" : "value"
		}		
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CategoryDetail
function getJsonStrCategoryDetail(categoryGb, parntCd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjAuY2F0ZWdvcnloZWFkZXI=",     om020.categorydetail
		"map" : {
		"key" : "value",
		"categoryGb" : categoryGb,
		"parntCd" : parntCd
		}		
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
*/
/*
//파라미터 셋팅_CategoryList
function getJsonStrCategoryList(categoryGb, parntCd, notuse)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjAuY2F0ZWdvcnlsaXN0", 	om020.categorylist
		"map" : {
			"key" : "value",
			"categoryGb" : categoryGb,
			"parntCd" : parntCd,
			"notuse" : notuse	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
*/
//상담DB > 요청DB목록 > 상담DB 등록
function fnSelectCnslDb(){
	// 요청DB 목록 저장
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/counselReqDbInfo.do",
		data : "pJson=" + getJsonStrInsertCdReqinfo($("#cDbId_Tab1").val()),
		success : function(data)
		{
			alert("요청하신 DB가 " + $("#actStCd_Tab1 option:selected").text() + " 되었습니다.");
			
			$("#tbl021").trigger("reloadGrid");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});	
}

//상담DB > 부서DB목록 > 상담유형 tree 조회(레벨2까지 가져오기)
function fnCategory(){
	
	$.jstree.destroy ();
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/counsel/getCategory.do",
		//data : "pJson=" + getJsonStrCategory(),
		data : "pJson=" + getJsonStrCategorySearchLvl("H", "", ""),
		success : function(data)
		{
			$("#categoryList").html("");
			
			if(jr != '')
			{
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
				$("#categoryList").jstree({ "core": { "data": jr,"multiple" : false } }).bind("loaded.jstree", function (event, data) { $(this).jstree("open_all"); });
				
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});

	$("#categoryList")
		.bind("loaded.jstree", function (event, data) {	
			console.log("loaded.jstree");	
			// load후 처리될 event를 적어줍니다.	
		})		
		.bind("select_node.jstree", function(event, data) {
			
			categoryGb = "D";
			categoryLvl = data.node.original.lv;
			categoryId = data.node.original.id;
			
			/*
			// 레벨이 2일때 하위 상담유형을 가져옴...
			if (categoryLvl > "2")
				fnCategorySearchLvl(categoryGb, categoryLvl, categoryId);
			*/
			
			$("#tbl022").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMTUuc2VsZWN0Q291bnNlbERlcHRMaXN0", 
					{"key" : "value", "lvl_cd": categoryLvl -1,"intv_cd" : categoryId})}, page : 1, sortname : "CRT_DT", sortorder : "desc"});
			$("#tbl022").trigger("reloadGrid");
			//tbl022_init_grid();		   
	   		
		})
		.bind("open_node.jstree", function (event, data) {	
			console.log("open_node.jstree");	
			// node가 open 될때 처리될 event를 적어줍니다.​	
		})	
		.bind("dblclick.jstree", function (event) {	
			console.log("dblclick.jstree");	
			// node가 더블클릭 될때 처리될 event를 적어줍니다.​​	
		})	
		.bind("create.jstree", function (e, data) {	
			console.log("create.jstree");	
			// node가 create 될때 처리될 event를 적어줍니다.​​	
		})	
		.bind("remove.jstree", function (e, data) {	
			console.log("remove.jstree");	
			// node가 remove 될때 처리될 event를 적어줍니다.​​	
		})	
		.bind("rename.jstree", function (e, data) {	
			console.log("rename.jstree");	
			// node가 rename 될때 처리될 event를 적어줍니다.​​	
		});	
	
}
/*
//상담DB > 부서DB목록 > 상담유형 tree 조회(선택한 노드의 자식들 가져오기)
function fnCategorySearchLvl(categoryGb, categoryLvl,  parntCd){
	//$.jstree.destroy ();
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCategory.do",
		//data : "pJson=" + getJsonStrCategory(),
		data : "pJson=" + getJsonStrCategorySearchLvl(categoryGb, categoryLvl, parntCd),
		success : function(data)
		{
			
			var jr = JSON.parse(data);

			var CurrentNode = jQuery("#categoryList").jstree("get_selected");
			
			
			$("#categoryList").jstree("create", CurrentNode, "inside", { "data":"new_node" }, false, false);
			
			//$("#categoryList").jstree().create_node(sel, jr, "first", function(){alert("done");}, true);
			
			
			
			//$("#categoryList").jstree({ "core": { "data": jr } });
			//$("#categoryList").jstree("create", sel, "last", {"attr": { "data": data1 } });
			//$("#categoryList").jstree("create", parntCd, "inside", { "data": jr }, false, false);
			//$("#categoryList").jstree("create_node", parntCd, "inside", { "data": jr }, false, false);
			
			//$("#demo").jstree("create", null, "last", { "attr" : { "rel" : "default" } });
			

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});	
}
*/
// 이관민원변경이력
function btnHistory_clickEvent()
{
	window.sessionStorage.setItem("VOC_from", "main");
	window.sessionStorage.setItem("VOC_id", $("#selMainChgbcd").val());
	
	
	
	var width = 1000;
	var height = 435;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/counsel/transferHistory.do";
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no,directories=no,scrollbars=no,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "vocHistory", option);
	newWindow.focus();
}


// 주관담당자 찾기
function btnManager_clickEvent()
{
	
	window.sessionStorage.setItem("fromFlag", "fromTranster");
	window.sessionStorage.setItem("corpOpenType","doCorp");
	
	openMenuPopup("CM0311");                                        // 조직도 화면 팝업
}

function fnManager(depart, id, nm)
{
	
	$("#depart").html(depart);
	$("#managerID").val(id);	
	$("#managerNM").val(nm);

}

//보조담당자 찾기
function btnManagerSec_clickEvent()
{
	window.sessionStorage.setItem("fromFlag", "fromTransterSec");
	window.sessionStorage.setItem("corpOpenType","doCorp");
	
	openMenuPopup("CM0311");  	
}
function fnManagerSec(depart, id, nm)
{
	
	$("#secDepart").html(depart);
	$("#secManagerID").val(id);	
	$("#secManagerNM").val(nm);
	
}
//이관민원 하단 탭 이벤트
function tabs2_clickEvent(event )
{
	
	switch (event.target.id) 
	{
		case "sect11":
		{
			$("#top1").css("display","block");
			$("#top2").css("display","none");
			
			$("#btnUpdate_1").show();
			$("#btnUpdate_2").hide();
			
			$("#managerNM").prop("disabled", false);
			$("#btnManager").prop("disabled", false);
			$("#secManagerNM").prop("disabled", false);
			$("#btnManagerSec").prop("disabled", false);	
			
			break;
		}
		case "sect12":
		{
			$("#top1").css("display","block");
			$("#top2").css("display","none");
			
			$("#btnUpdate_1").hide();
			$("#btnUpdate_2").show();
			
			$("#managerNM").prop("disabled", true);
			$("#btnManager").prop("disabled", true);
			$("#secManagerNM").prop("disabled", true);
			$("#btnManagerSec").prop("disabled", true);	
			
			break;
		}
		case "sect13":
		{
			$("#top1").css("display","none");
			$("#top2").css("display","block");
			
			$("#btnUpdate_1").hide();
			$("#btnUpdate_2").hide();
			
			break;
		}
		
		default:
			break;
	}
	
}

//상담DB 하단 탭 이벤트
function tabs3_clickEvent(event )
{
	switch (event.target.id) 
	{
		//요청DB목록
		case "sect21":
		{
		

			break;
		}	
		
		//부서DB목록
		case "sect22":
		{		
			fnCategory();
			//getJsonStrCategory();
			tbl022_init_grid();	
			
			break;
		}		
		
		//통계현황
		case "sect23":
		{
			
			break;
		}
		
		default:
			break;
	}
}

//상담DB >> 요청DB목록 조회 버튼 이벤트
function btnSearch_21_clickEvent()
{
	$("#tbl021").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMTUuc2VsZWN0TGlzdA==", {
		"key" : "value",
		"fr_dt" : $("#schReqFrDt_T1").val().replace(/-/gi, ""),
		"to_dt" : $("#schReqToDt_T1").val().replace(/-/gi, ""),
		"requsrid" : $("#schReqUsr_T1").val(),
		"actstcd" : $("#schActSt_T1").val(),
		"instcd" : $("#schInstCd").val(),
		"intvlgcd" : $("#schIntvLgCd").val(),
		"intvmdcd" : $("#schIntvMdCd").val(),
		"intvsmcd" : $("#schIntvSmCd").val()
	})} , page : 1, sortname : "REQ_DT", sortorder : "desc"});
	$("#tbl021").trigger("reloadGrid");
		
}

//상담DB >> 요청DB목록 초기화 버튼 이벤트
function btnReset_21_clickEvent()
{
	$("#schReqFrDt_T1").val(getDate());
	$("#schReqToDt_T1").val(getDate());
	$("#schReqUsr_T1").val("all");
	$("#schActSt_T1").val("all");
	$("#schInstCd").val("all");
	$("#schIntvLgCd").val("all");
	$("#schIntvMdCd").val("all");
	$("#schIntvSmCd").val("all");

}

//상담DB >> 요청DB목록 처리상태 Selectbox Change 이벤트
function actStCd_Tab1_changeEvent()
{
	// 상담DB 처리상태 (010100:접수,010200:할당,010300:회수,020100:처리중,020200:반송,030100:처리완료)
	switch($("#actStCd_Tab1").val()) 
	{
		case "020200":		// 반송
			$("#rtnRsn_Tab1").attr("readonly",false);	
			break;
		default:
			$("#rtnRsn_Tab1").val("");
			$("#rtnRsn_Tab1").attr("readonly",true);
			break;				
	}
}

//상담DB >> 요청DB목록 저장 버튼 이벤트
function btnSave_21_clickEvent()
{
	var selRow = $('#tbl021').getGridParam('selrow');
	var req_gb_nm = $("#tbl021").getCell(selRow, "REQ_GB_NM");
	
	if ($("#orgUsrId_Tab1").val() == "all")
	{
		alert("담당자를 선택해 주세요");
		$("#orgUsrId_Tab1").focus();
		return;
	}
	else
	{
		// 상담DB 처리상태 (010100:접수,010200:할당,010300:회수,020100:처리중,020200:반송,030100:처리완료)
		switch($("#actStCd_Tab1").val()) 
		{
			case "all":			// 미선택
				alert("처리상태를 선택해 주세요");
				$("#actStCd_Tab1").focus();
				break;
			case "020200":		// 반송
				if ($.trim($("#rtnRsn_Tab1").val()) == "")
				{
					alert("반송사유를 입력해 주세요");
					$("#rtnRsn_Tab1").focus();
				}
				break;
			case "030100":		// 처리완료
				if ($.trim($("#cDbNm_Tab1").val()) == "")
				{
					alert("상담DB를 선택해 주세요");
					$("#counselDB").focus();
				}
				else
				{
					if (req_gb_nm == "미사용") {
						var retVal = confirm("요청구분이 변경으로 전환됩니다.");
						
					   if( retVal == true ){
						   fnSelectCnslDb();
					   }else{
						   $("#cDbNm_Tab1").val("");
						   $("#cTbbsId_Tab1").val("");
					      return;
					   }
					}
				}
				break;
			default:
				// 요청DB 목록 저장
				fnSelectCnslDb();
				break;				
		}	
	}
}

//상담DB >> 요청DB목록 등록 버튼 이벤트
function btnCounselDB_clickEvent()
{
	var selRow = $('#tbl021').getGridParam('selrow');
	var tbbs_id = $("#tbl021").getCell(selRow, "TBBS_ID");
	
	if (selRow == null)
	{
		alert("요청건을 선택 해 주시기 바랍니다.");
		return;
	}
	
	if (tbbs_id != "")
	{
		if (confirm("상담DB를 재등록 하시겠습니까?"))
		{
			popupCnslViewList(selRow);
		}
		else
		{
			return;
		}
	}
	else
	{
		popupCnslViewList(selRow);
	}	
}

function popupCnslViewList(rowid)
{
	obj021 = $("#tbl021").jqGrid('getRowData', rowid);
	
	var strInstCd = obj021.INST_CD;
	var strIntvLgCd = obj021.INTV_LG_CD;
	var strIntvMdCd = obj021.INTV_MD_CD;
	var strIntvSmCd = obj021.INTV_SM_CD;
	var strIntvNm = obj021.INTV_NM;
	
	if (strInstCd != "")
	{
		var width = 1020;
		var height = 487;
		var top = (screen.height - height) / 2;
		var left = (screen.width - width) / 2;	
		
		var paramURL = getContextPath() + "/web/counsel/counselDbListView.do?INST_CD=" + strInstCd + "&INTV_LG_CD=" + strIntvLgCd
			+ "&INTV_MD_CD=" + strIntvMdCd + "&INTV_SM_CD=" + strIntvSmCd + "&INTV_NM=" + strIntvNm;
		var option = "width=" + width + ", height=" + height 
			+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
			+ top + ",left=" + left +"";
		
		var newWindow = window.open(paramURL, "상담DB List", option);
		newWindow.focus();	
	}
}

function setChildValue(gObjName, gObjValue){
	$("#"+ gObjName).val(gObjValue);
}

//상담DB >> 부서DB목록 조회 버튼 이벤트
function btnSearch_22_clickEvent()
{
	var chk_UseYn = $("input:checkbox[id='chkUse_T2']").is(":checked") ? "Y" : "N";
	var chk_ComYn = $("input:checkbox[id='chkComplete_T2']").is(":checked") ? "Y" : "N";	
	
	// 미사용포함
	if (chk_UseYn == "Y")
		chk_UseYn = "all";
	
	// 미완료포함
	if (chk_ComYn == "Y")
		chk_ComYn = "all";

	$("#tbl022").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMTUuc2VsZWN0Q291bnNlbERlcHRMaXN0", {
		"key" : "value",
		"tbbsttl" : $("#txtJobNm_T2").val(),
		"deptnm" : $("#schDept_T2").val(),
		"usrnm" : $("#schOrgUsr_T2").val(),
		"reqgbcd" : $("#schRreqGb_T2").val(),
		"useyn" : chk_UseYn,
		"actstcd" : chk_ComYn		
	})} , page : 1, sortname : "CRT_DT", sortorder : "desc"});
	$("#tbl022").trigger("reloadGrid");
		
}

//상담DB >> 부서DB목록 초기화 버튼 이벤트
function btnReset_22_clickEvent()
{
	$("#txtJobNm_T2").val("");						// 업무명
	$("#schDept_T2").val("");						// 담당부서
	$("#schOrgUsr_T2").val("");						// 담당자
	$("#schRreqGb_T2").val("all");					// 요청구분
	$("#chkUse_T2").prop("checked", false);			// 미사용포함
	$("#chkComplete_T2").prop("checked", true);		// 미완료포함

}

function initControl()
{
    $("#tabs1").gbTabs("#ctnt1");    
    
	/* 이관민원 */
    $("#tabs2").gbTabs("#ctnt2");
    
	datePicker("#selFrDate_1");
	datePicker("#selToDate_1");
	datePicker("#selFrDate_2");
	datePicker("#selToDate_2");
	
	$("#selFrDate_1").val(getDate());
	$("#selToDate_1").val(getDate());
	
	$("#top1").css("display","block");
	$("#top2").css("display","none");	
	
	tbl010_init_grid();
	
	
	
	
	//============================================================================================
	/* 상담DB */
	/* 요청DB목록 ++++++++++++++++++++++++++++++++++*/
	$("#tabs3").gbTabs("#ctnt3");
	
	datePicker("#schReqFrDt_T1");
	datePicker("#schReqToDt_T1");
	//$("#schReqFrDt_T1").val(getDate());
	$("#schReqFrDt_T1").val(getDate().substr(0, 8) + "01");
	$("#schReqToDt_T1").val(getDate());
	tbl021_init_grid();
	
	
	/* 부서DB목록 ++++++++++++++++++++++++++++++++++*/
	
	
	
	
	/* 상담DB */
	//============================================================================================
	
}

function initEvent()
{
	/* 이관민원 */	
	// 탭 이벤트 등록
	$("#tabs2").bind("click", event, tabs2_clickEvent);

	// 이관민원변경이력
	$("#btnHistory").bind("click", btnHistory_clickEvent);
	
	$("#btnManager").bind("click", btnManager_clickEvent);
	$("#btnManagerSec").bind("click", btnManagerSec_clickEvent);

	
	
	//============================================================================================
	/* 상담DB */
	
	/* 요청DB 목록 ++++++++++++++++++++++++++++++++++*/
	$("#tabs3").bind("click", event, tabs3_clickEvent);
	
	// 조회버튼
	$("#btnSearch_21").bind("click", btnSearch_21_clickEvent);
	
	// 초기화버튼
	$("#btnReset_21").bind("click", btnReset_21_clickEvent);
	
	// 저장버튼
	$("#btnSave_21").bind("click", btnSave_21_clickEvent);
	
	// 기관구분 선택 시 이벤트
	$("#schInstCd").bind("change", function(e) 
	{		
		setSelectBoxWithCodeIntvLgCd("schIntvLgCd", "전체", "2", "", $("#schInstCd").val(), "all", "");
	});
	
	// 상담유형 대분류 선택 시 이벤트
	$("#schIntvLgCd").bind("change", function(e)
	{
		setSelectBoxWithCodeIntvLgCd("schIntvMdCd", "전체", "3", "",  $("#schIntvLgCd").val(), "all", "");	// 상담유형 중분류 셋팅
	});
	
	// 상담유형 중분류 선택 시 이벤트
	$("#schIntvMdCd").bind("change", function(e)
	{
		setSelectBoxWithCodeIntvLgCd("schIntvSmCd", "전체", "4", "", $("#schIntvMdCd").val(), "all", "");	// 상담유형 소분류 셋팅
	});		
	
	// 처리상태 Select
	$("#actStCd_Tab1").bind("change", actStCd_Tab1_changeEvent);
	
	// 등록버튼
	$("#counselDB").bind("click", btnCounselDB_clickEvent);
	
	
	/* 부서 DB 목록 ++++++++++++++++++++++++++++++++++*/
	// 조회버튼
	$("#btnSearch_22").bind("click", btnSearch_22_clickEvent);
	
	// 초기화버튼
	$("#btnReset_22").bind("click", btnReset_22_clickEvent);
	
	//부서DB목록 신규등록버튼 클릭이벤트
	$("#btnAddCounselDB").bind("click", btnAddCounselDB_clickEvent);	

	
	/* 상담DB */
	//============================================================================================
}

function initData()
{
	/* 이관민원 */
    setSelectBoxWithCode("search_act_st1","전체","90013", "", "","all"); // 검색-처리상태    
    
    setRadioBoxWithCode("rd_act_result","90260", "", "","");			// 처리결과
	setRadioBoxWithCode("rd_voc_gb","90210", "", "","");				// 민원구분
	setRadioBoxWithCode("rd_request_gb","90016", "", "","");			// 요청구분
	setRadioBoxWithCode("rd_act_st","90013", "", "","");				// 처리상태
	

	$("#btnUpdate_1").show();	
	$("#btnUpdate_2").hide();
	
	
	
	//============================================================================================
	/* 상담DB */
	/* 요청DB목록 ++++++++++++++++++++++++++++++++++*/
	setSelectBoxWithCodeIntvLgCd("schInstCd", "전체", "1","","","all", "");		//기관구분
	setSelectBoxWithCode("schActSt_T1", "전체", "90301", "", "","all");			// 처리상태(검색조건)
	setSelectBoxWithCode("actStCd_Tab1", "미선택", "90301", "", "","all");		// 처리상태(상세조회)
	
	//요청자
	var map = {};
	if(window.sessionStorage.getItem("USR_GRD_CD") == '090100')
	{
		map = 
		{
			"key" : "value",
			"orderBy" : "usr_nm",
		};
	}
	else
	{
		map = 
		{
			"key" : "value",
			"orderBy" : "usr_nm",
			"team_cd" : "010100"
		};
	}
	
	//상담사 selection
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TGlzdA==", map),
		success : function(data)
		{
			var option = "<option value='all' selected>전체</option>";
			
			for(var i in data)
				option += "<option value='" + data[i].USR_ID + "'>" + data[i].USR_NM + "</option>";
			
				$("#schReqUsr_T1").append(option);
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}	
	});
	
	/* 부서DB목록 ++++++++++++++++++++++++++++++++++*/
	setSelectBoxWithCode("schRreqGb_T2", "전체", "90302", "", "","all");		// 요청구분
	$("#chkComplete_T2").prop("checked", true);									// 미완료포함
	
	
	map = 
	{
		"key" : "value",
	};	
	
	//담당부서 selection
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/dept/deptrList.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNTEuYWRtaW5BZ2VuY3lMaXN0", map),
		success : function(dData)
		{
			var deptOption = "<option value='all' selected>전체</option>";
			
			for(var j in dData)
				deptOption += "<option value='" + dData[j].ID + "'>" + dData[j].TEXT + "</option>";
			
				$("#schDept_T2").append(deptOption);
		},
		error : function(dData, status, err)
		{
			networkErrorHandler(dData, status, err);
		}	
	});
	
	
	
	
	/* 상담DB */
	//============================================================================================
	
	
}

$(function()
{
	initControl();
	initEvent();
	initData();
	
});


