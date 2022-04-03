var nowProcessStats=null;
var clickProcessStats="010200";
var callCenterReturn="";        		//요청자
var hisTbbs_id="";
var deptCharger ="";
var hiddenAffr="";
var uid="";//nm
var rock=null;					//rock
var appn_gb_cd="";  

//hhs
var btnId="";

//selectlist			
function getJsonStrDeptRceptList(){
	var allDept = $("#csdbch_ALLDept").prop("checked");
	var ccAuth; 	
	if (window.sessionStorage.getItem("CC_AUTH")=="Y") {
		ccAuth="y";	
	}else{
		ccAuth="n"
	}

	var showType = !$("#csdbch_deptSrchProgrsSttus").val() ? ["010105","010200","020100","020300"] : ["010105","010200","020100","020200","030100"];
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuc2VsZWN0TGlzdA==",
	    "map" : {
		"key" 		: "value",
//		"frDt" 		: $("#csdbch_deptSrchSelFrDate").val().replace(/[-, :, \s]/g,""),
//		"toDt" 		: $("#csdbch_deptSrchSelToDate").val().replace(/[-, :, \s]/g,""),
		"new_yn" 	: $("#csdbch_deptSrchRequstSe").val(),
		"cdb_gb_cd"   	: $("#csdbch_deptSrchDbSe").val(),
		"prog_knd_cd"   : !$("#csdbch_deptSrchProgrsSttus").val()?"all":$("#csdbch_deptSrchProgrsSttus").val(),
		"sendingOuCode" : sendingOuCode==undefined?"":sendingOuCode,
		"cdbActStCds" : showType,
		"alldept" : $("#csdbch_ALLDept").prop("checked"),
		"ccauth" :  ccAuth
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}

//insert 
function setJsonStrDeptInsert() {
    var seDdeptCharger="";
    
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTUuZGVwdEluc2VydA==",
	    "map" : {
		"key" : "value",
		"req_id" 	: $("#csdbch_DepttblReqid").val(),
		"cdb_act_st_cd" : clickProcessStats,
		"org_usr_id" 	: $("#csdbch_deptJobChargerVal").val(), 
		"rtn_rsn"   	: $("#csdbch_deptJobPrvonsh").val(),
		"tbbs_id" 	: hisTbbs_id,
		"cdb_act_st_cd" : clickProcessStats,	 	
		"rtn_rsn2" 	: seDdeptCharger,
		"org_id" 	: sendingOuCode,
		"appn_gb_cd"    : appn_gb_cd,
		"sendingUid"    : sendingUid
	    }
    };
    
    if(clickProcessStats=="020200"){
    	loParam['map']['org_usr_id'] = hiddenAffr;
    	// 20.11.10 이력에서 발신자 컬럼을 지워서 누가 발신했는지가 안나옴. 발신자 표시되게 변경
//    	loParam['map']['rtn_rsn2'] = callCenterReturn+"님에게 반송 되었습니다.";
    	loParam['map']['rtn_rsn2'] = sendingUName +"님이 "+ callCenterReturn+"님에게 반송 하였습니다.";
    }else{
    	loParam['map']['rtn_rsn'] = "";
//    	loParam['map']['rtn_rsn2'] = deptCharger+"님에게 담당자지정 되었습니다.";
    	loParam['map']['rtn_rsn2'] = sendingUName +"님이 "+ deptCharger+"님을 담당자로 지정하였습니다.";
    }
    
    return  encodeURIComponent(JSON.stringify(loParam));
}

//부서접수목록 클릭시 내용   
function getJsonStrDeptRcepDetail(reqid , oucode, uid){
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStr("c2VsZWN0", "b20wMTUuc2VsZWN0", {"comm_id" : reqid}),
	success : function(row){
		$("#csdbch_deptJobBtnRequstHis").show();
	    initcharger();
	    nowProcessStats=row.PROG_KND_CD;
	    callCenterReturn = row.USR_NM;

	    if(nowProcessStats=="030100" || nowProcessStats=="020200"){
	    	$("#csdbch_deptJobBtnInsert").hide();
    		$("#csdbch_deptJobBtnInsertRtn").hide();
	    }else{
	    	if (window.sessionStorage.getItem("CC_AFFAIRS_YN")=="Y"||window.sessionStorage.getItem("CC_AUTH")=="Y") {
		    	$("#csdbch_deptJobBtnInsert").show();
	    		$("#csdbch_deptJobBtnInsertRtn").show();
	    	}else{
	    		$("#csdbch_deptJobBtnInsert").hide();
	    		$("#csdbch_deptJobBtnInsertRtn").hide();
	    	}
	    }
	    
	    if(window.sessionStorage.getItem("CC_AFFAIRS_YN")=="Y"||window.sessionStorage.getItem("CC_AUTH")=="Y"){
	    	submitUnRock();
	    }
	    
	    $("#csdbch_deptJobRequstSe,#csdbch_deptJobRqester,#csdbch_deptJobCnsltTy,#csdbch_deptJobCnsltTy,#csdbch_grfrsPrson" +
	     ", #csdbch_deptJobChrg,#csdbch_deptJobCharger,#csdbch_deptJobPrvonsh,#csdbch_deptJobProcessCtns" +
	     ",#csdbch_grfrsPrson2,#csdbch_deptJobCnsltTy2,#csdbch_deptJobRegist,#csdbch_deptJobUpdt,#csdbch_deptJobAtchFile").empty();

	    appn_gb_cd =row.NEW_YN;
	    $("#csdbch_grfrsPrson").html(row.AFFS_USR_NM);
	    $("#csdbch_grfrsPrson2").html(row.ORG_USR_ID_NM);
	    $("#csdbch_deptJobPrvonsh").val(row.RTN_RSN);			
	    $("#csdbch_deptJobPrvonsh").html(row.RTN_RSN);			
	    $("#csdbch_deptJobRequstSe").html(row.COMM_NEW);			
	    $("#csdbch_deptJobDbSe").val(row.CDB_GB_CD);		 
	    $("#csdbch_deptJobRqester").html(row.USR_NM);
	    $("#csdbch_deptJobCnsltTy").html(row.INTV_NM);
	    $("#csdbch_deptJobCnsltTy2").html(row.COMM_TTL);
	    
	    $("#csdbch_deptJobProcessCtns").html(row.ACT_CONT);
	    $("#csdbch_deptJobChrg").html(row.DEPT_ID_NM);	
	    
	    deptJobCtns.SetEditorContent(row.COMM_CNTN==null?"":row.COMM_CNTN);
	    $("#csdbch_deptJobRegist").html(row.CRT_DTTM);
	    $("#csdbch_deptJobUpdt").html(row.MOD_DTTM);
	    $("#csdbch_DepttblReqid").val(row.COMM_ID);
	    $("#csdbch_deptJobChargerVal").val("");
	    $("#csdbch_deptJobAtchFile").empty();
	    hiddenAffr=row.AFFS_ORG_USR_ID;
	    hisTbbs_id = row.TBBS_ID;
	    if(row.PROG_KND_CD=="020200"){
	    	$("#csdbch_deptJobBtnInsert").hide();
	    }else{
	    	$("#csdbch_chargerJobBtnInsert").show();
	    }
	    showAttachFiles(row.COMM_ID,$("#csdbch_deptJobAtchFile"),"om015");

	    var proval = 0;
   		switch(nowProcessStats){
   		case "010105" :
   			proval = 25;
   			cssEvent(nowProcessStats);
   		      break;
   		case "010200" :
   		case "020300" :
   			proval = 50;
   			cssEvent(nowProcessStats);
   		      break;
   		case "020100" :
   			proval = 75;
   			cssEvent(nowProcessStats);
   		      break;
   		case "020200" :
   		case "030100" :
   			$("#csdbch_progressbar > *").css("color","#ffffff");
   			$("#csdbch_progressbar > *").eq(1).html("담당자지정");
   			proval = 100;
   			break;
   		}
   		$("#csdbch_progressbar").progressbar({
   			value : proval
   		});
   		
   		if(nowProcessStats=="020200"){
   			$("#csdbch_HDeptJobPrvonsh").text("반송사유");
   	    	$("#csdbch_deptJobProcessCtns").css("display","none");
   	    	$("#csdbch_deptJobPrvonsh").show();
   		}else{
   			$("#csdbch_HDeptJobPrvonsh").text("처리내용");
   	    	$("#csdbch_deptJobPrvonsh").css("display","none"); 
   	    	$("#csdbch_deptJobProcessCtns").show();
   		}
   		
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
}

//hhs 20.03.31 progress-label css
function cssEvent(nowProcessStats){
	switch (nowProcessStats) {
	case "010105": // 부서접수
		$("#csdbch_progressbar > *").css("color", "#ffffff");
		$("#csdbch_progressbar > *").eq(1).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(3).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(1).html("담당자지정");
		break;
	case "010200": // 담당자지정
		$("#csdbch_progressbar > *").css("color", "#ffffff");
		$("#csdbch_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(3).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(1).html("담당자지정");
		break;
	case "020300": // 재작성요청
		$("#csdbch_progressbar > *").css("color", "#ffffff");
		$("#csdbch_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(3).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(1).html("재작성요청");
		break;
	case "020100": // 처리중
		$("#csdbch_progressbar > *").css("color", "#ffffff");
		$("#csdbch_progressbar > *").eq(3).css("color", "#1a1a1a");
		$("#csdbch_progressbar > *").eq(1).html("담당자지정");
		break;
	}
}

// autocomplete
function ChargerList_TextChangeEvent(){
    $("#csdbch_deptJobCharger").autocomplete({
	maxShowItems: 5,
	source : function( request, response ) {
	    $.ajax({
		type: 'post',
		url: "/ajax/civilservice/csw.do",
		dataType: "json",
		data: "pJson=" +  getJsonStr("c2VsZWN0TGlzdA==", "b20wNjEuY25zbHREYlByb2Nlc3NDaGFyZ2VyTGlzdA==", {
		    "key" : "value",
		    "userfullname" :$("#csdbch_deptJobCharger").val(),
		    "org_id" : window.sessionStorage.getItem("CC_AUTH") == "Y" ? "" : sendingOuCode
		}),
		success: function(data) {	                   
		    response( 
			    $.map(data, function(item) {	                            
				return {
				    label: (item.USERFULLNAME),
				    value: item.USERFULLNAME,
				    id : item
				}
			    })
		    );
		}, error:function(e){  
		    alert("자동완성을 사용할 수 없습니다.");  
		}  
	    });
	},
	minLength: 1,
	focus: function( event, ui ) {
	    return false; 
	},
	select: function( event, ui ) {
	    uid =ui.item.id.UID_;
	    deptCharger =ui.item.id.DISPLAYNAME;
	    $("#csdbch_deptJobChargerVal").val(uid);
	    $("#csdbch_deptJobChargerCheck").val(deptCharger);

	}
    });
}

//저장 버튼 클릭 이벤트
function deptBtnInsert_clickEvent(){
	var rowid = $("#csdbch_tblDeptRceptList").jqGrid('getGridParam','selrow');
	var rMsg = DivDeptValidatorRe();
	if(rMsg != ""){
	    alert(rMsg);
	    return;
	}
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + setJsonStrDeptInsert(),
		success : function(data){
			submitRock();
			$("#csdbch_tblDeptRceptList").trigger("reloadGrid");
			$("#csdbch_tblDeptRceptList").jqGrid("setSelection", rowid, true); // reload후 row다시 선택
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	alert("처리되었습니다.");
}


//오류처리 이벤트
function DivDeptValidatorRe(){
	var rMsg = "";
	
	//duplicate prevent
	if(rock==null){
	    rMsg ="상담DB를 선택해주세요.";
		return rMsg;
	}else if(rock==true){
	    rMsg ="저장완료 하였습니다.";
	    return rMsg;
	}
	
	//radio check
	if(/*nowProcessStats == "010200" || nowProcessStats == "020100" || */nowProcessStats =="020200" || nowProcessStats=="030100"){
	    rMsg="접수DB를 선택해주세요.";
		return rMsg;}
	
	return rMsg;
}


function initcharger(){
    $("#csdbch_deptJobCharger").val("");
    $("#csdbch_deptJobChargerCheck").val("");
}

function submitRock(){
//    $("#csdbch_deptJobPrvonsh").attr("disabled",true);
    $("#csdbch_deptJobCharger").attr("disabled",true);
    rock=true;
}

function submitUnRock(){
	   
	if(nowProcessStats != "030100"){
		$("#csdbch_deptJobCharger").attr("disabled",false);
	}
    
    rock=false;
}

//조회 버튼 클릭 이벤트   
function deptSrchSearch_clickEvent(){
    $("#csdbch_tblDeptRceptList").jqGrid("setGridParam", {postData : {pJson : getJsonStrDeptRceptList()}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#csdbch_tblDeptRceptList").trigger("reloadGrid");
}

//초기화 버튼 클릭 이벤트
function deptSrchInit_clickEvent(){
    rock=null;
    nowProcessStats="";
    initDate();

    $("#csdbch_deptSrchRequstSe, #csdbch_deptSrchProgrsSttus, #csdbch_deptSrchDbSe, #csdbch_deptJobDbSe").val("all");
    $("#csdbch_deptJobRequstSe,#csdbch_deptJobRqester,#csdbch_deptJobCnsltTy,#csdbch_deptJobCnsltTy,#csdbch_grfrsPrson" +
     ",#csdbch_deptJobChrg,#csdbch_deptJobCharger,#csdbch_deptJobPrvonsh" +
     ",#csdbch_grfrsPrson2,#csdbch_deptJobCnsltTy2,#csdbch_deptJobRegist,#csdbch_deptJobUpdt,#csdbch_deptJobAtchFile").empty();
//	DEXT5.setHtmlValue("", 'deptJobCtns');
	deptJobCtns.SetEditorContent("");
    $("#csdbch_tblDeptRceptList").jqGrid("setGridParam", {postData : {pJson : getJsonStrDeptRceptList()}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#csdbch_tblDeptRceptList").trigger("reloadGrid");

}


//init selectbox
function initSelectBox(){
	$("#csdbch_deptSrchDbSe, #csdbch_chargerSrchDbSe, #csdbch_StatsSrchDbSe").empty();	 
	setSelectBoxWithCode2("csdbch_deptSrchRequstSe", "전체", "90302", g_popup, "", "");	    		// 요청구분 셋팅
	setSelectBoxWithCode3("csdbch_deptSrchProgrsSttus", "전체", "90301", g_popup, "", "");	    	// 진행상태 셋팅 시스템코드 처리결과
	setSelectBoxWithCode2("csdbch_deptSrchDbSe", "전체", "90303", g_popup, "", "");	    	// DB구분 div1
	setSelectBoxWithCode2("csdbch_deptJobDbSe","전체", "90303", g_popup, "", "");	   			// DB구분 
	
}

//init  date
function initDate(){
	datePicker("#csdbch_deptSrchSelFrDate");
	datePicker("#csdbch_deptSrchSelToDate");
	$("#csdbch_deptSrchSelFrDate").val(getDate());
	$("#csdbch_deptSrchSelToDate").val(getDate());
}

function fnSetOrgcswDATrans(objInfo) {
	var agencyCategory = objInfo.CATEGORY;
	if (agencyCategory == "AA") {	
		$("#csdbch_deptJobCharger").val(objInfo.DEPT_NM);
		$("#csdbch_deptJobChargerVal").val(objInfo.USR_ID);	
		$("#csdbch_deptJobChargerCheck").val(objInfo.USR_NM);
	} else if (agencyCategory == "CC"){
		$("#csdbch_deptJobCharger").val(objInfo.TEAM_NM);
		$("#csdbch_deptJobChargerVal").val(objInfo.USR_ID);	
		$("#csdbch_deptJobChargerCheck").val(objInfo.USR_NM);
	} else if (agencyCategory == "EA") {
		$("#cstrvc_r_org_id").val("externAgency");
		$("#csdbch_deptJobCharger").val(objInfo.TEAM_NM);
		$("#csdbch_deptJobChargerVal").val(objInfo.USR_ID);	
		$("#csdbch_deptJobChargerCheck").val(objInfo.USR_NM);
	}
}

function allDept_checkEvent(){
	sendingOuCode = null;
}

//initialization screen
function screenChargerAppn(){
	$("#csdbch_deptJobBtnInsertRtn").hide(); //20.06.09 처음 로드시 반송버튼 안보이게
	initDate();
	initSelectBox();
	csdbch_editerCall();
	$("#csdbch_deptJobBtnRequstHis").hide();
	$("#csdbch_progressbar").progressbar({
	      value: 0
    });
	
	/*
	var progressbar = $( "#csdbch_progressbar" ),
    progressLabel = $( ".progress-label" );
	progressLabel.text( "     " );*/
/*
  progressbar.progressbar({
    value: false,
    change: function() {
      //progressLabel.text( progressbar.progressbar( "value" ) + "%" );
    },
    complete: function() {
      //progressLabel.text( "Complete!" );
    }
  });
*/

  //setTimeout( progress, 2000 );
	$("#csdbch_tblDeptRceptList").jqGrid({
		url : "/jqgrid/civilservice/csw.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrDeptRceptList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["번호","게시물ID","기관ID","부서ID","기관사용자ID","요청일","요청구분", "상담유형", "제목","처리일자","부서명", "서무", "담당자", "처리상태"],
		colModel :
	   	[
	   	 	{ name : "COMM_ID", 	index : "COMM_ID", 	hidden : true },
	   	 	{ name : "TBBS_ID", 	index : "TBBS_ID", hidden : true },
	   	 	{ name : "ORG_ID", 	index : "ORG_ID", 	hidden : true },
	   	 	{ name : "DEPT_ID", 	index : "DEPT_ID", 	hidden : true },
	   	 	{ name : "ORG_USR_ID", 	index : "ORG_USR_ID", 	hidden : true },
	   	 	{ name : "CRT_DTTM", 	index : "CRT_DTTM", 	align : "center", width : 50 },					    	//처리일자
	   	 	{ name : "COMM_NEW", 	index : "COMM_NEW", 	align : "center", width : 30 },					   	//요청구분								
			{ name : "INTV_NM", 	index : "INTV_NM", 	align : "left", width : 120 },						//상담유형
			{ name : "COMM_TTL", 	index : "COMM_TTL", 	align : "left", width : 80 },
			{ name : "ACT_DTTM", 	index : "ACT_DTTM", 	align : "center", width : 50 },					    	//처리일자
			{ name : "AFFS_DEPT_NM", index : "AFFS_DEPT_NM", 	align : "center", width : 50 },                   			//부서명
			{ name : "AFFS_USR_NM", index : "AFFS_USR_NM", 	align : "center", width : 30 },                   			//서무
			{ name : "ORG_USR_ID_NM", index : "ORG_USR_ID_NM", align : "center", width : 30 },		// 담당자
			{ name : "PROG_KND_NM", index : "PROG_KND_NM", 	align : "center", width : 35 },				  	 	//처리상태 코드추가	
	   	],
	   	sortname : "CRT_DTTM",																			  	
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "267",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [5, 10, 20, 50, 100],
	   	autowidth : true,
	   	pager : "#csdbch_pgDeptRceptList",
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	onSelectRow : function(rowid)
	   	{
	   	    $("#csdbch_deptJobBtnRequstHis").show();
	   		var row = $("#csdbch_tblDeptRceptList").getRowData(rowid);
	   		getJsonStrDeptRcepDetail(row.COMM_ID);
	   		
	   		//hhs
	   		//팝업을 위한 SETTING
			clickReqId=row.COMM_ID;
			clickTbbsId=row.TBBS_ID;
		  
	   	},
		loadComplete : function(){
			$('#csdbch_deptSrchProgrsSttus option[value="010100"]').remove();
			$('#csdbch_deptSrchProgrsSttus option[value="010400"]').remove();
			$('#csdbch_deptSrchProgrsSttus option[value="020200"]').remove();
		}
	}).jqGrid("navGrid", "#csdbch_pgDeptRceptList", {edit : false, add : false, del : false, search : false});
	
	// add event to this
	$("#csdbch_deptSrchSearch").bind("click", deptSrchSearch_clickEvent);
	//hhs
//	$("#csdbch_deptJobBtnInsert").bind("click", deptBtnInsert_clickEvent);
	$("#csdbch_deptJobBtnInsert").click(function(e) {
		if($("#csdbch_deptJobCharger").val()==""){	    
			alert("담당자를 지정해주세요.");
			$("#csdbch_deptJobCharger").focus();
			return;
		}
		clickProcessStats="010200"; //담당자지정
		deptBtnInsert_clickEvent();
	});
	
	//hhs 20.03.31
	$("#csdbch_deptJobBtnInsertRtn").bind("click", function(e) {deptBtnReturn_popupEvent('csdbch_deptJobBtnInsertRtn');});
	
	$("#csdbch_deptJobBtnRequstHis").click(function(e) {requstHis_popupEvent(hisTbbs_id);});
	$("#csdbch_deptSrchInit").bind("click", deptSrchInit_clickEvent);
	$("#csdbch_deptJobCharger").click(function(e) {initcharger();});
	$("#csdbch_deptJobCharger").bind("keydown", ChargerList_TextChangeEvent);

	$("#csdbch_cntrSearch").on("click", function(e) {
		window.sessionStorage.setItem("fromFlag", "fromcswDA");
		window.sessionStorage.setItem("corpOpenType", "adminAgency");
		//var paramURL = getContextPath() + "/web/counsel/organizationChart.do";
		//gf_openDialog(paramURL,1600,1000,"no","no",0,0);
		openMenuPopup("CM0311");
	});	

	$("#csdbch_cntrSearch").hide();
	if (window.sessionStorage.getItem("CC_AUTH")=="Y") {
		$("#csdbch_ALLDept").show();
		$("#csdbch_ALLDept").trigger("click");
		$("#csdbch_ALLDept_th").html("전체부서");
		if(sendingOuCode==''){
			$("#csdbch_cntrSearch").show();			
		}
	}else if(window.sessionStorage.getItem("CC_AFFAIRS_YN")=="Y"){
		/*$("#csdbch_cntrSearch").hide();*/
	} else{
		/*$("#csdbch_cntrSearch").hide();*/
		$("#csdbch_deptJobBtnInsert").hide();		
	}
	

};

function csdbch_editerCall() {
//	DEXT5.config.Mode = 'view';
//	DEXT5.config.Height = "100%";
//	DEXT5.config.Width = "100%;";
//	DEXT5.config.zStatusBar = "1";
//	DEXT5.config.zTopMenu = "1";
//	DEXT5.config.zToolBar = "1";
//	DEXT5.config.SkinName = "gray";
//	DEXT5.config.EditorHolder = "csdbch_deptJobCtns";
//	new Dext5editor("deptJobCtns");
	deptJobCtns = new KuKudocsEditor(
	            /* ID 입력부 */
	            'csdbch_deptJobCtns',

	            /* Option 입력부 */
	            {

	                //에디터 최소 높이설정
	                minHeight: 0,
	                maxHeight: 0,

	                //Editor 가로크기
	                width: '99%',

	                //Editor 세로크기
	                height: '99%',

//	                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
	                
	                //Hidden Menu 설정
	                hiddenMenu: ['fileGroup', 'editGroup', 'headingGroup', 'fontFamilyGroup','insertGroup', 'fontSizeGroup', 'textFormatGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'], /* Menu Option Hidden list */
	                
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

//hhs 2020.03.31
//반송 팝업
function deptBtnReturn_popupEvent(btnId){
	var width = 500;
	var height = 165;
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + "/web/civilservice/cswDbManage_return.do?tbbsId="+clickTbbsId+"&reqId="+clickReqId+"&btnId="+btnId;
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
		+ top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "반송", option);
	newWindow.focus();	
	
}

