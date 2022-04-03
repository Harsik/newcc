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

g_changedCont=[];
g_changedCont["CUST_ID"]="민원인ID";
g_changedCont["CUST_NM"]="고객명";
g_changedCont["CST_TYPE_NM"]="민원인구분";
g_changedCont["CST_COMP_NM"]="민원인성향";
g_changedCont["ACT_ST_CD"]="처리결과";
g_changedCont["ACT_TYPE_CD"]="처리유형";
g_changedCont["CALL_GB_CD"]="민원구분";
g_changedCont["KEYWORDCD"]="키워드";
// g_changedCont["INTV_EX_CD"]="기관코드";
g_changedCont["INTV_LG_CD"]="대분류";
g_changedCont["INTV_MD_CD"]="중분류";
g_changedCont["INTV_SM_CD"]="소분류";
g_changedCont["RCV_CONT"]="문의내용";
g_changedCont["ACT_CONT"]="답변내용";
g_changedCont["MEMO"]="메모";
g_changedCont["TRNR_RCVN_TEL_NO"]="호전환번호";
g_changedCont["RESV_CNTCT_INFM_FORMAT"]="재통화번호";
g_changedCont["CALLBCK_TEL_NO_FORMAT"]="콜백번호";
g_changedCont["RPT"]="긴급정보 신고인";
g_changedCont["RPT_CNTCT_INFM"]="긴급정보 전화번호";
g_changedCont["TRNR_RCVN_USR_NM"]="민원인명";
g_changedCont["TRNR_RCVN_TEL_NO"]="민원인연락처";
g_changedCont["TNTR_CONT"]="이관내용";
g_changedCont["CVL_ACT_ST_CD"]="이관처리상태";
g_changedCont["AFFS_ORG_USR_ID"]="부서담당자";
g_changedCont["SUB_CVL_ACT_ST_CD"]="복합민원처리상태";
g_changedCont["SUB_AFFS_ORG_USR_ID"]="복합민원담당자"; 
 
function getJsonStrCounselHistory(tcktId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbENoYW5nZUhpc3Rvcnk=",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId == null ? "" : tcktId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅 CounselList
function counselChangeHistorylist(srchtype, srchval, srchDtType, usrId, pTcktId)
{
	g_pTcktId = pTcktId;
	 
	if(g_pTcktId!=""){
		$("#cschhi_histPopCallMe", opener.document).val("");
	}
	
	var frDt = $("#cschhi_selFrDate").val();
	var toDt = $("#cschhi_selToDate").val();

	if($("#cschhi_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#cschhi_selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY291bnNlbENoYW5nZUhpc3RvcnlsaXN0",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchDtType" : "rcvDt",
			"frDt" : frDt,
			"toDt" : toDt,
			"usrGrdCd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"selUsrId" : usrId,
			"selChGbCd" : $("#cschhi_selChGbCd").val(),
			"selActTypeCd" : $("#cschhi_selActTypeCd").val(),
			"selActStCd" : $("#cschhi_selActStCd").val(),
			"srchval" : srchtype=="srchKeyWord"?"temp":srchval.replace(/-/g,""),
			// "intv_ex_cd" : $("#cschhi_selSrchIntvExCd").val(),
			"intv_lg_cd" : $("#cschhi_selSrchIntvLgCd").val(),
			"intv_md_cd" : $("#cschhi_selSrchIntvMdCd").val(),
			"intv_sm_cd" : $("#cschhi_selSrchIntvSmCd").val(),
			"call_gb_cd" : $("#cschhi_selCallGb").val(),
			"keyWord" : $("#cschhi_selSrchKeyWordCd").val(),
			"loc_yn" : "",
			"tcktId": g_pTcktId == undefined ? "" : pTcktId,
			"isChange" : $("#cschhi_chkIsChange").is(':checked')?"Y":"N"
			
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
  
//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchtype = $("#cschhi_optSrchtype").val();
	g_srchval = $("#cschhi_tfSrchval").val();
	g_srchDtType = $("#cschhi_selDtType").val();
	g_usrId = $("#cschhi_selCounselNm").val();
	
 
	$("#cschhi_tblCounselList").jqGrid("setGridParam", {postData : {pJson : counselChangeHistorylist(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#cschhi_tblCounselList").trigger("reloadGrid");
	
	$("#cschhi_tblSubCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselHistory("")}, page : 1, sortname : "MOD_HIST_ID", sortorder : "asc"});
	$("#cschhi_tblSubCounselList").trigger("reloadGrid");
	
	//counselInitInfo("list","CHILD");
}
 
//초기화 버튼 클릭 이벤트
function initEvent()
{
 
	g_srchtype = "custNm";
	g_srchval = "";

		//상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");

	} else{
		g_usrId = "all";
	}
	srchDtType = "dt";

	$("#cschhi_optSrchtype").val("all");
	$("#cschhi_tfSrchval").val("");
	$("#cschhi_selCounselNm").val(g_usrId);
	
	$("#cschhi_tfSrchval").show();
	$("#cschhi_selSrchKeyWordCd").hide();
	
	$("#cschhi_selChGbCd option:eq(0)").attr("selected", "selected");
	$("#cschhi_selActStCd option:eq(0)").attr("selected", "selected");
	$("#cschhi_selActTypeCd option:eq(0)").attr("selected", "selected");
	$("#cschhi_selContType option:eq(0)").attr("selected", "selected");
	$("#cschhi_selContType option:eq(0)").attr("selected", "selected");
	$("#cschhi_selContTxt").val("");
	
	$("#cschhi_selFrDate").val(getDate());
	$("#cschhi_selToDate").val(getDate());
	
	$("#cschhi_tblCounselList").jqGrid("setGridParam", {postData : {pJson : counselChangeHistorylist(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#cschhi_tblCounselList").trigger("reloadGrid");
	
	//$("#cschhi_selSrchIntvExCd").val("all").trigger("change");
	$("#cschhi_selSrchIntvLgCd").val("all").trigger("change");
	//재조회
	//setTimeout(function(){$("#cschhi_btnSearch").trigger("click");}, 100);
	$("#cschhi_btnSearch").trigger("click");
}
  
 
// init Page
$(document).ready(function()
{	
	var pTcktId;
	
	if (window.location.href.indexOf("?tckId") > 0) {
		var href = window.location.href;
		var h_TcktId = href.substr(href.indexOf("=")+1, href.length);
		pTcktId = h_TcktId;
		history.replaceState({}, null, location.pathname);
	}
	
	g_ListPopup = "CHILD";
	g_popup = "CHILD"; 
	//counselInitInfo("list");
	//counselButtonEvent();
	
	datePicker("#cschhi_selFrDate");
	datePicker("#cschhi_selToDate");
	datePicker("#cschhi_resvFrDate");
	datePicker("#cschhi_resvToDate");
	$("#cschhi_optSrchtype").val("all");
	$("#cschhi_tfSrchval").val("");
	$("#cschhi_selFrDate").val(getDate());
	$("#cschhi_selToDate").val(getDate());
	
	$("#cschhi_tfSrchval").show();
	$("#cschhi_selSrchKeyWordCd").hide();
	
		//상담사 본인것만 조회
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");
	 $("#cschhi_selCounselNm").prop("disabled", true); 
	} 	

	if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100"){
		setSelectBoxWithAgent("cschhi_selCounselNm", "전체", g_ListPopup,"","","","","","" );
	}else{
		setSelectBoxWithAgent("cschhi_selCounselNm", "전체", g_ListPopup,window.sessionStorage.getItem("USR_ID"),"","","","","" );
	}
	
	//setSelectBoxWithAgent("cschhi_selCounselNm", "전체", g_ListPopup, window.sessionStorage.getItem("USR_ID"),"","","","","" );
	

	//setObjSelectBoxWithCode("selChGbCd", "전체", "", g_ListPopup, "90009", "");	// 채널구분 셋팅
	setObjSelectBoxWithCode("cschhi_selActStCd", "전체", "", g_ListPopup, "90013", "");	// 처리상태 셋팅
	setObjSelectBoxWithCode("cschhi_selActTypeCd", "전체", "", g_ListPopup, "90014", "");	// 채널구분 셋팅
	setObjSelectBoxWithCode("cschhi_selCallGb", "전체", "", g_ListPopup, "90010", "");	// 민원처리상태
	
	setObjSelectBoxWithCode("cschhi_selSrchKeyWordCd", "", "",g_ListPopup,"90025", "0");	// 키워드

//	setSelectBoxWithCode("selTrnrActStCd", "전체", "90300", "", "", "");      // 민원처리상태

    //setObjectSelectBoxWithCode2("selSrchIntvExCd", "전체", "1", g_ListPopup, "00000000", "all", "CHANGE");
	setObjectSelectBoxWithCode2("cschhi_selSrchIntvLgCd", "전체", "1", g_ListPopup, "00000000", "all", "CHANGE");

	/*
	$("#cschhi_selSrchIntvExCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "2", g_ListPopup, $("#cschhi_selSrchIntvExCd").val(), "", "CHANGE");
	});

	$("#cschhi_selSrchIntvLgCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "3", g_ListPopup, $("#cschhi_selSrchIntvLgCd").val(), "", "CHANGE");
	});

	$("#cschhi_selSrchIntvMdCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "4", g_ListPopup, $("#cschhi_selSrchIntvMdCd").val(),"","CHANGE");
	});
	*/

	$("#cschhi_selSrchIntvLgCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("cschhi_selSrchIntvMdCd", "전체", "2", g_ListPopup, $("#cschhi_selSrchIntvLgCd").val(), "", "CHANGE");
	});
	
	$("#cschhi_selSrchIntvMdCd").bind("change", function() 
	{
		setObjectSelectBoxWithCode2("cschhi_selSrchIntvSmCd", "전체", "3", g_ListPopup, $("#cschhi_selSrchIntvMdCd").val(),"","CHANGE");
	});
 
	//comCounsel 공통하단
	// comCounselSpecLoad();

	//$("#cschhi_selSrchIntvExCd").trigger("change");
    $("#cschhi_selSrchIntvLgCd").trigger("change");
	 
	$("#cschhi_selDtType").html("");	
	$("#cschhi_selDtType").append("<option value='dt'>접수일</option> <option value='resvDt'>예약일</option><option value='divDt'>분배일</option><option value='sucDt'>완료일</option>");
	$("#cschhi_selDtType").val("dt");
	
	$("#cschhi_tblCounselList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/counselChangeList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : counselChangeHistorylist($("#cschhi_optSrchtype").val(), $("#cschhi_tfSrchval").val(),  $("#cschhi_selDtType").val(), g_usrId, pTcktId)
		},
		jsonReader :
		{
			repeatitems: false
		},
        // colNames : ["ID", "녹취경로","녹취ID","접수일자","접수인", "특분류","접수일시", "상담사", "민원인", "전화번호", "상담유형", "처리유형", "상담결과", "통화구분", "문의내용", "답변내용","변경여부", "청취"],
		colNames : ["ID", "녹취경로","녹취ID","접수일자","접수인", "대분류","접수일시", "상담사", "민원인", "전화번호", "상담유형", "처리유형", "상담결과", "통화구분", "문의내용", "답변내용","변경여부", "청취"],
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
	   	 	{ name : "RECD_ID", index : "RECD_ID", hidden:true },
	   	 	{ name : "CALL_ID", index : "CALL_ID" ,hidden:true },
	   	 	{ name : "RCV_DT", index : "RCV_DT" ,hidden:true },
	   	 	{ name : "RCV_USR_ID", index : "RCV_USR_ID" ,hidden:true },
            // { name : "INTV_EX_CD", index : "INTV_EX_CD" ,hidden:true },
	   	 	{ name : "INTV_LG_CD", index : "INTV_LG_CD" ,hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 60 },
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 40 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 30 },
			{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 50 },
			{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 120 },
			{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 40 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 30, formatter:fnStatusFormatter },
			//{ name : "RCV_CONT_TTL", index : "RCV_CONT_TTL", align : "left", width : 180 },
			{ name : "CALL_GB_NM_ENG", index : "CALL_GB_NM_ENG", align : "center", width : 30 },
			{ name : "RCV_CONT_TTL", index : "RCV_CONT_TTL", align : "left", width : 70  },
	   		{ name : "ACT_CONT_TTL", index : "ACT_CONT_TTL", align : "left", width : 70  },
			{ name : "MOD_CONT", index : "MOD_CONT", align : "center", width : 30 },
			{ name : "REC_BUTTON", align : "center", width: 20 }
	   	],
	   	sortname : "RCV_DT_FORMAT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "160",
	   	width : "100%",
	   	rowNum : 6,
	   	rowList : [6, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#cschhi_pgCounselList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var row = $("#cschhi_tblCounselList").getRowData(rowid);	   			   			   		
	   		subGridLoard(row.TCKT_ID);
	   	},
	   	gridComplete : function()
	   	{
	   		var ids = $(this).getDataIDs();
	   		
	   		// 녹취 버튼 표시
	   		for(var i = 0; i < ids.length; i++)
	   		{
	   			var rowId = ids[i];
	   			var row = $(this).getRowData(rowId);
 
	   			if(row.MOD_CONT=="Y")
	   			{
	   				$("#cschhi_tblCounselList").setRowData(rowId,false,{background:"#d3efdf"});
	   			}
	   			
	   			if(row.CALL_ID != null && row.CALL_ID != "")
	   			{
	   				//청취 키  (녹취날짜 + con_id + agentId)
					var rec_param=row.RCV_DT+"|"+row.CALL_ID+"|"+row.RCV_USR_ID;
		   			var recBtn = "<button class='button' style='width: 30px;' id='rec_" + row.TCKT_ID + "' " + "name='" + rec_param + "'>청취</button>";
		   			$(this).jqGrid("setRowData", rowId, { REC_BUTTON : recBtn });
		   			$("#cschhi_rec_" + row.TCKT_ID).bind("click", fnReclisten);
		   				
	   			}
	   				   			
	   		}
	   	} 
	}).jqGrid("navGrid", "#cschhi_pgCounselList", {edit : false, add : false, del : false, search : false});
	
	
	$("#cschhi_tblSubCounselList").jqGrid(
	{ 
		url : getContextPath() + "/jqgrid/counsel/counselChangeHistory.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCounselHistory(g_pTcktId)
		},
		jsonReader :
		{
			repeatitems: false
		},
        // colNames : ["ID", "녹취경로","녹취ID", "특분류","접수일시", "접수자", "수정일시","수정자","민원인","변경내역","상담유형","처리유형","상담결과"],
		colNames : ["ID", "녹취경로","녹취ID", "대분류","접수일시", "접수자", "수정일시","수정자","민원인","변경내역","상담유형","처리유형","상담결과"],
	   	colModel :
	   	[
	   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
	   	 	{ name : "RECD_ID", index : "RECD_ID", hidden:true },
	   	 	{ name : "CALL_ID", index : "CALL_ID" ,hidden:true },
            // { name : "INTV_EX_CD", index : "INTV_EX_CD" ,hidden:true },
	   	 	{ name : "INTV_LG_CD", index : "INTV_LG_CD" ,hidden:true },
			{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 60 },
			{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 40 },
			{ name : "CRT_DT_FORMAT", index : "CRT_DT_FORMAT", align : "center", width : 60 },
			{ name : "CRT_USR_NM", index : "CRT_USR_NM", align : "center", width : 40 },
			{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 40 }, 
			{ name : "MOD_CONT2", index : "MOD_CONT2", align : "center", width : 30,hidden:true },
			{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 130 },
			{ name : "ACT_TYPE_CD_NM", index : "ACT_TYPE_CD_NM", align : "center", width : 40 },
			{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 40 }
	   	],
	   	sortname : "RCV_DT_FORMAT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "430",
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30],
	   	autowidth : true,
	   	pager : "#cschhi_pgSubCounselList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	subGrid: true,
		subGridRowExpanded: function(subgrid_id, row_id) {
			// we pass two parameters
			// subgrid_id is a id of the div tag created whitin a table data
			// the id of this elemenet is a combination of the "sg_" + id of the row
			// the row_id is the id of the row
			// If we wan to pass additinal parameters to the url we can use
			// a method getRowData(row_id) - which returns associative array in type name-value
			// here we can easy construct the flowing
				console.log(subgrid_id+":"+row_id); // tblSubCounselList_1:1
			var subgrid_table_id, pager_id;
			subgrid_table_id = subgrid_id+"_t";
			pager_id = "p_"+subgrid_table_id;
			$("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+pager_id+"' class='scroll'></div>");
			jQuery("#"+subgrid_table_id).jqGrid({
				url:"",
				datatype: "local",
				colNames: ['변경항목','변경전','변경후'],
				colModel: [
					{name:"item",index:"item",width:150,align:"center"},
					{name:"ori",index:"ori",width:350,align:"left"},
					{name:"mod",index:"mod",width:350,align:"left"} 
				],
			   	rowNum:20, 
			    height: '100%',
			    rownumbers : true,
			    rownumWidth : 30
			});
			jQuery("#"+subgrid_table_id).jqGrid('navGrid',"#"+pager_id,{edit:false,add:false,del:false})
			
			
			var row = $("#cschhi_tblSubCounselList").getRowData(row_id);
	   		 
	   			var arrayTemp=[];
	   			var oriTemp="";
	   			var modTemp="";
	   			var strTitle="";
	   			var j=1; 
	   			var jObj;
	   		console.log("row:"+row.MOD_CONT2);
	   			try{
	   				
	   				jObj=JSON.parse(jsonEscape(row.MOD_CONT2));
	   			}catch(e){
	   				//중간에 "따옴표 들어간 경우
	   				var regExp=/TNTR_CONT|RCV_CONT|ACT_CONT/gi;
	   				var rtext=row.MOD_CONT2;
	   				var arMatch=rtext.match(regExp);
					 
		   			 var ntext="";
		   			 var start_ori = 0;
		   			 var end_ori = 0;
		   			 var start_mod =0;
		   			 var end_mod =0;
		   			 
		   			for(var i=0; i<arMatch.length; i++){
	   					console.log(arMatch[i]+"/////////////////////////////////////// \n");
		   				var start_word=arMatch[i];
		   				var start_newori = rtext.indexOf(start_word);
		   					start_ori = rtext.indexOf("ori", start_newori);
		   				var instr=rtext.substring(end_mod, start_ori);
		   				 
		   					end_ori = rtext.indexOf("mod", start_ori+6); // {"RCV_CONT":{"ori":"
	
		   				var list_ori = rtext.substring(start_ori+6, end_ori-4);  // ori":"...", "mod":"
		   					list_ori =list_ori.replace(/\"/g,"`"); //특정문자 제거
		   				ntext =ntext+instr+'ori":"'+list_ori+'", "'; //{"RCV_CONT":{"ori":" +
	 
		   					start_mod = rtext.indexOf("mod",end_ori-4); // ", "mod":"
		   					end_mod = rtext.indexOf("\"}", start_mod+6); // ..."},"
	
		   				var list_mod = rtext.substring(start_mod+6, end_mod-1);  // ..."},"
	
		   					list_mod =list_mod.replace(/\"/g,"`"); //특정문자 제거
		   				var textend=rtext.lenth;
		   				
		   				ntext = ntext+ 'mod":"'+ list_mod; //
		   				
		   				//console.log(ntext+" \n");
		   			} //for	
		   				var textail=rtext.substring(end_mod); // "}}
		   				 ntext = ntext + textail;
		   				
		   				 try{
		   					jObj=JSON.parse(jsonEscape(ntext));
		   				}catch(e){
		   					console.log("message: "+e.message);
		   					console.log("text: "+ntext);
		   					return;
		   				}
	   			
	   			}
	   				$.each(jObj, function(key, val) 
					{
	   					strTitle=g_changedCont[key];

						$.each(val, function(skey, sVal) {
							 	
							//console.log(strTitle+"row"+row_id+":"+j+">"+skey+":"+sVal );
							if(skey=="ori"){
								oriTemp=sVal;
								
							}else if(skey=="mod"){
								modTemp=sVal;
							}
						});
							   
					 	arrayTemp={"item":strTitle,"ori":oriTemp,"mod":modTemp};
						$("#"+subgrid_table_id).jqGrid('addRowData', j, arrayTemp , 'first');
 
	   					j++;
					});
	   				 			
		},
	   	subGridOptions: {
	        "plusicon"  : "ui-icon-triangle-1-e",
	        "minusicon" : "ui-icon-triangle-1-s",
	        "openicon"  : "ui-icon-arrowreturn-1-e",
			//expand all rows on load
			"expandOnLoad" : true
	   	},
	   	gridComplete : function()
	   	{
	   		$('.ui-icon-triangle-1-e').trigger('click');
	   	}
	}).jqGrid("navGrid", "#cschhi_pgSubCounselList", {edit : false, add : false, del : false, search : false});

	// 조회 버튼 클릭 이벤트 등록
	$("#cschhi_btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#cschhi_btnInit").bind("click", initEvent);
	
	$("#cschhi_optSrchtype").bind("change", function ()
	{
		var selval=$("#cschhi_optSrchtype").val();
		if(selval=="srchKeyWord"){
			$("#cschhi_tfSrchval").hide();
			$("#cschhi_selSrchKeyWordCd").show();
		}else{
			$("#cschhi_tfSrchval").show();
			$("#cschhi_selSrchKeyWordCd").hide();
		}
		
	});
		
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#cschhi_tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	$("#cschhi_selContTxt").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
 
});


function subGridLoard(pTckId){
//	alert("");
	$("#cschhi_tblSubCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselHistory(pTckId)}, page : 1, sortname : "MOD_HIST_ID", sortorder : "asc"});
	$("#cschhi_tblSubCounselList").trigger("reloadGrid");
}

function fnReclisten()
{
	var name_by_id = $('#cschhi_'+this.id).attr('name');
 		if( this.id == "btnListenRec")	{
 			name_by_id = $("#cschhi_hidCallId").val();
 		}
 		//alert("fnReclisten() " + this.id + " : " + name_by_id);
 		listenRecPopup("","","",name_by_id);
}
 