// 조회 조건 및 조회 값
var g_listType = "counsel";
var g_srchtype = "all";
var g_srchval = "";
var g_usrId = "all";
var g_frDt = "";
var g_toDt = "";
var g_selCounselNm = "";
var g_selChGbCd = "";
var g_selActTypeCd = "";
var g_selActStCd = "";
var g_srchDtType = "dt";
var g_ListPopup = "CHILD";
var g_pTcktId="";
 
 
function getJsonStrCounselHistory(tcktId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbENoYW5nZUhpc3Rvcnk=",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function setJsonCounselConv(jobDate,agentId)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMDkuY291bnNlbGNvbnY=",
		"map" : {
			"key" : "value",
			"workdate" : jobDate,
			"agentId" : agentId,
			"login_usr_id" : window.sessionStorage.getItem("USR_ID") 
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function setJsonCounselDelete(jobDate,agentId)
{
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "Y2gwMDkudGVtcGRlbGV0ZQ==",
		"map" : {
			"key" : "value",
			"workdate" : jobDate,
			"agentId" : agentId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function setJsonCounselUseYNUpdate(jobDate, agentId) {
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMDkudGVtcFVwZGF0ZQ==",
			"map" : {
				"key" : "value",				
				"workdate" : jobDate,
				"agentId" : agentId,
				"login_usr_id" : window.sessionStorage.getItem("USR_ID")
			}
		};
		
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅 CounselList
function counselUploadlist(srchtype, srchval, srchDtType, usrId)
{
 
	 g_pTcktId= $("#histPopCallMe", opener.document).val();
	 
	if(g_pTcktId!=""){
		$("#histPopCallMe", opener.document).val("");
	}
	//alert(pTcktId+":"+$("#histPopCallMe", opener.document).val(""));
	
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();

	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDkudGVtcGxpc3Q=",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchDtType" : "rcvDt",
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
//			"intv_ex_cd" : $("#selSrchIntvExCd").val(),
			"intv_lg_cd" : $("#selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#selCallGb").val(),
			"keyWord" : $("#selSrchKeyWordCd").val(),
			"loc_yn" : "",
			"tcktId": g_pTcktId,
			"isChange" : $("#chkIsChange").is(':checked')?"Y":"N"
			
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
  

function counselConvlist(srchtype, srchval, srchDtType, usrId)
{
 
	 g_pTcktId= $("#histPopCallMe", opener.document).val();
	 
	if(g_pTcktId!=""){
		$("#histPopCallMe", opener.document).val("");
	}
	//alert(pTcktId+":"+$("#histPopCallMe", opener.document).val(""));
	
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();

	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDkuY291bnNlbENvbnZsaXN0",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchDtType" : "rcvDt",
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#selChGbCd").val(),
			"selActTypeCd" : $("#selActTypeCd").val(),
			"selActStCd" : $("#selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
//			"intv_ex_cd" : $("#selSrchIntvExCd").val(),
			"intv_lg_cd" : $("#selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#selCallGb").val(),
			"keyWord" : $("#selSrchKeyWordCd").val(),
			"loc_yn" : "" ,
			"agentid" : usrId
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchtype = $("#optSrchtype").val();
	g_srchval = $("#tfSrchval").val();
	g_srchDtType = $("#selDtType").val();
	g_usrId = $("#selCounselNm").val();
	
 
	$("#tblCounselList").jqGrid("setGridParam", {postData : {pJson : counselUploadlist(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "asc"});
	$("#tblCounselList").trigger("reloadGrid");
	
	$("#tblSubCounselList").jqGrid("setGridParam", {postData : {pJson : counselConvlist(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "asc"});
	$("#tblSubCounselList").trigger("reloadGrid");
	
	//counselInitInfo("list","CHILD");
}
 
//초기화 버튼 클릭 이벤트
function initEvent()
{
 
	g_srchtype = "custNm";
	g_srchval = "";

		//상담사 본인것만 조회
	/*if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");

	} else{
		g_usrId = "all";
	}*/
	g_usrId = "all";
	srchDtType = "dt";

	$("#optSrchtype").val("all");
	$("#tfSrchval").val("");
	$("#selCounselNm").val(g_usrId);
	
	$("#tfSrchval").show();
	$("#selSrchKeyWordCd").hide();
	
	$("#selChGbCd option:eq(0)").attr("selected", "selected");
	$("#selActStCd option:eq(0)").attr("selected", "selected");
	$("#selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#selContType option:eq(0)").attr("selected", "selected");
	$("#selContType option:eq(0)").attr("selected", "selected");
	$("#selContTxt").val("");
	
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
 
	$("#selSrchIntvLgCd").val("all").trigger("change");
	 
}
  
 
// init Page
$(document).ready(function()
{	
	 
	g_ListPopup = "CHILD";
	g_popup = "CHILD"; 
	//counselInitInfo("list");
	//counselButtonEvent();
	
	datePicker("#selFrDate");
	datePicker("#selToDate");
	datePicker("#resvFrDate");
	datePicker("#resvToDate");
	$("#optSrchtype").val("all");
	$("#tfSrchval").val("");
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	$("#tfSrchval").show();
	$("#selSrchKeyWordCd").hide();
	
		//상담사 본인것만 조회
	/*if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");
	 $("#selCounselNm").prop("disabled", true); 
	}*/ 	
	
//	setSelectBoxWithAgent("selCounselNm", "전체", g_ListPopup, window.sessionStorage.getItem("USR_ID"),"","","","","" );
	setSelectBoxWithAgent("selCounselNm", "전체", g_ListPopup, g_usrId,"","","","","" );
	

	//setObjSelectBoxWithCode("selChGbCd", "전체", "", g_ListPopup, "90009", "");	// 채널구분 셋팅
	setObjSelectBoxWithCode("selActStCd", "전체", "", g_ListPopup, "90013", "");	// 처리상태 셋팅
	setObjSelectBoxWithCode("selActTypeCd", "전체", "", g_ListPopup, "90014", "");	// 채널구분 셋팅
	setObjSelectBoxWithCode("selCallGb", "전체", "", g_ListPopup, "90010", "");	// 민원처리상태
	
	setObjSelectBoxWithCode("selSrchKeyWordCd", "", "",g_ListPopup,"90025", "0");	// 키워드

//	setSelectBoxWithCode("selTrnrActStCd", "전체", "90300", "", "", "");      // 민원처리상태
	
	setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "1", g_ListPopup, "00000000", "all", "CHANGE");

//	$("#selSrchIntvLgCd").bind("change", function()
//	{
//		setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "2", g_ListPopup, $("#selSrchIntvLgCd").val(), "", "CHANGE");
//	});
	
	$("#selSrchIntvLgCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "2", g_ListPopup, $("#selSrchIntvLgCd").val(), "", "CHANGE");
	});
	
	$("#selSrchIntvMdCd").bind("change", function() 
	{
		setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "3", g_ListPopup, $("#selSrchIntvMdCd").val(),"","CHANGE");
	});
 
	// 엑셀 업로드
    $("#btnCounselUpload").bind("click", btnCounselUpload_clickEvent);
    
    //변환 실행
    $("#btnCounselConv").bind("click", btnCounselConv_clickEvent);

    //엑셀 업로드 삭제
    $("#btnCounselDelete").bind("click", btnCounselDelete_clickEvent);
    
	//comCounsel 공통하단
	// comCounselSpecLoad();

	$("#selSrchIntvLgCd").trigger("change");
	 
	$("#selDtType").html("");	
	$("#selDtType").append("<option value='dt'>접수일</option> <option value='resvDt'>예약일</option><option value='divDt'>분배일</option><option value='sucDt'>완료일</option>");
	$("#selDtType").val("dt");
	
	$("#tblCounselList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselUploadList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : counselUploadlist($("#optSrchtype").val(), $("#tfSrchval").val(),  $("#selDtType").val(), g_usrId)
		},
		jsonReader :
		{
			repeatitems: false
		},
		/*colNames : ["ID","접수일자","접수일시", "발신자번호", "민원인명", "민원인ID", "문의내용", "답변내용", "인/아웃","처리유형", "기관분류","대분류","중분류","소분류","처리상태", "상담사ID", "상담사" ],*/
		colNames : ["ID","접수일자","접수일시", "발신자번호", "민원인명", "민원인ID", "문의내용", "답변내용", "인/아웃","처리유형","처리상태", "상담사ID", "상담사" ],
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },  
	   	 	{ name : "RCV_DT", index : "RCV_DT" ,hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 60 }, 
			{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 50 },
			{ name : "IN_CUST_NM", index : "IN_CUST_NM", align : "center", width : 30 },
			{ name : "DB_CUST_ID", index : "DB_CUST_ID", align : "center", width : 30 },
			{ name : "QST_CONT", index : "QST_CONT", align : "left", width : 120  },
	   		{ name : "ACT_CONT", index : "ACT_CONT", align : "left", width : 120  }, 
	   		{ name : "CALL_GB_CD", index : "CALL_GB_CD", align : "center", width : 20 },
	   		{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 30 },
	   		/*{ name : "INTV_EX_NM", index : "INTV_EX_NM", align : "left", width : 50 },
			{ name : "INTV_LG_NM", index : "INTV_LG_NM", align : "left", width : 50 },
			{ name : "INTV_MD_NM", index : "INTV_MD_NM", align : "left", width : 50 },
			{ name : "INTV_SM_NM", index : "INTV_SM_NM", align : "left", width : 50 },*/
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 30  },  	   		
			{ name : "RCV_USR_ID", index : "RCV_USR_ID", width : 30, hidden:true } ,
			{ name : "USR_NM", index : "USR_NM", width : 30 } 
	   	],
	   	sortname : "RCV_DT_FORMAT",
	   	sortorder : "asc",
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
	   	pager : "#pgCounselList",
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
	   	gridComplete : function()
	   	{
	   		
 	   		
	   	} 
	}).jqGrid("navGrid", "#pgCounselList", {edit : false, add : false, del : false, search : false});

	$("#tblSubCounselList").jqGrid(
	{ 
		url : getContextPath() + "/jqgrid/counsel/counselConversion.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : counselConvlist($("#optSrchtype").val(), $("#tfSrchval").val(),  $("#selDtType").val(), g_usrId)
		},
		jsonReader :
		{
			repeatitems: false
		},
		/*colNames : ["ID","접수일자","접수일시", "발신자번호", "민원인명", "문의내용", "답변내용", "인/아웃","처리유형", "기관분류","대분류","중분류","소분류","처리상태", "상담사ID", "상담사" ],*/
		colNames : ["ID","접수일자","접수일시", "발신자번호", "민원인명", "문의내용", "답변내용", "인/아웃","처리유형","처리상태", "상담사ID", "상담사" ],
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },  
	   	 	{ name : "RCV_DT", index : "RCV_DT" ,hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 60 }, 
			{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 50 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 30 },
			{ name : "RCV_CONT", index : "RCV_CONT", align : "left", width : 120  },
	   		{ name : "ACT_CONT", index : "ACT_CONT", align : "left", width : 120  }, 
	   		{ name : "CALL_GB_NM", index : "CALL_GB_NM", align : "center", width : 20 },
	   		{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 30 },
	   		/*{ name : "INTV_EX_NM", index : "INTV_EX_NM", align : "left", width : 50 },
			{ name : "INTV_LG_NM", index : "INTV_LG_NM", align : "left", width : 50 },
			{ name : "INTV_MD_NM", index : "INTV_MD_NM", align : "left", width : 50 },
			{ name : "INTV_SM_NM", index : "INTV_SM_NM", align : "left", width : 50 },*/
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 30  },  	   		
			{ name : "RCV_USR_ID", index : "RCV_USR_ID", width : 30, hidden:true } ,
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", width : 30 } 
	   	],
	   	sortname : "RCV_DT_FORMAT",
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "300",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30],
	   	autowidth : true,
	   	pager : "#pgSubCounselList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true, 
	   	gridComplete : function()
	   	{
	   		 
	   	}
	}).jqGrid("navGrid", "#pgSubCounselList", {edit : false, add : false, del : false, search : false});

	// 조회 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", initEvent);
	
	$("#optSrchtype").bind("change", function ()
	{
		var selval=$("#optSrchtype").val();
		if(selval=="srchKeyWord"){
			$("#tfSrchval").hide();
			$("#selSrchKeyWordCd").show();
		}else{
			$("#tfSrchval").show();
			$("#selSrchKeyWordCd").hide();
		}
		
	});
		
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	$("#selContTxt").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
 
});


// 엑셀 업로드
function btnCounselUpload_clickEvent()
{ 
// 만들 팝업창 좌우 크기의 1/2 만큼 보정값으로 빼주었음
var popupX = (window.screen.width / 2) - (200 / 2);
// 만들 팝업창 상하 크기의 1/2 만큼 보정값으로 빼주었음
var popupY= (window.screen.height /2) - (300 / 2);

	var openWin = window.open("/web/counsel/counselXlsUPopup.do","win","width=360,height=165,scrollbars=no,resizable=no,copyhistory=no,toolbar=no,status=no,"+"left="+ popupX + ", top="+ popupY + ", screenX="+ popupX + ", screenY= "+ popupY);
	openWin.focus();
}


function btnCounselConv_clickEvent(){
	var gridResultCount=$("#tblCounselList").getGridParam("records");
	if(gridResultCount < 1){
		alert("먼저 이력으로 변환할 엑셀을 업로드 해야합니다.");
		return;
	} 
	   		 
	  rowData = $("#tblCounselList").getRowData(1);
	 
	  //alert(rowData.RCV_USR_ID+" 상담사 의 "+ rowData.RCV_DT_FORMAT +"부터의 상담대장을 이력으로 변환합니다.");
	  alert("상담대장을 이력으로 변환합니다.");
	   				 
	  var jobdate=rowData.RCV_DT;
	  var agentid=rowData.RCV_USR_ID;
	 
	  // 엑셀업로드 이력으로 변환 ch009 -> ch001
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/updateCustInfo.do",
			data : "pJson=" +  setJsonCounselConv(jobdate, agentid),
			success : function(data)
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/main/updateCustInfo.do",
					data : "pJson=" +  setJsonCounselUseYNUpdate(jobdate, agentid),
					success : function(data)
					{
						 alert("이력으로 변환 되었습니다.");
						 btnSearch_clickEvent();
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
		
}

function btnCounselDelete_clickEvent(){
	var gridResultCount=$("#tblCounselList").getGridParam("records");
	if(gridResultCount < 1){
		alert("먼저 이력으로 변환할 엑셀을 업로드 해야합니다.");
		return;
	} 
	   		 
	  rowData = $("#tblCounselList").getRowData(1);
	 
	  alert("업로드 된 임시 상담대장을 삭제합니다.");
	   				 
	  var jobdate=rowData.RCV_DT;
	  var agentid=rowData.RCV_USR_ID;
	 
	  // 엑셀업로드 이력으로 변환 ch009 -> ch001
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/updateCustInfo.do",
			data : "pJson=" +  setJsonCounselDelete(jobdate, agentid),
			success : function(data)
			{
				 alert("임시 상담대장이 삭제 되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
}
 
 