var nowProcessStats_Se="";
var clickProcessStats_Se="";

var processUid="";
var cdb_req_gb_cd="";
//var processCharger="";

var check=false;
var processCharger=check?processCharger:sendingUName;

var hisTbbs_id2="all"
var rock2=null;
//popup id
var clickReqId="";
var clickTbbsId="";
var popupwindow;
var clickCommnew="";

// var inte="";
var intl="";
var intm="";
var ints="";
var inigd="";
var inittl="";
var newyn="";
var tddsid="";

var cdb_act_st_cd="";

var callCenterReturn="";
var chargerJobCtns=null;
//chargerlist
function getJsonStrChargerProcess(){
	var showType = !$("#csdbpr_chargerSrchProgrsSttus").val() ? ["010200","010400","020100"] : ["010200","020100","020200","020300","030100"];
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuc2VsZWN0TGlzdA==",
	    "map" : {
		"key" : "value",
		"frDt" : $("#csdbpr_chargerSrchSelFrDate").val().replace(/[-, :, \s]/g,""),
		"toDt" : $("#csdbpr_chargerSrchSelToDate").val().replace(/[-, :, \s]/g,""),
		"new_yn" : $("#csdbpr_chargerSrchRequstSe").val(),
		"cdb_gb_cd" : $("#csdbpr_chargerSrchDbSe").val(),
		"prog_knd_cd" : !$("#csdbpr_chargerSrchProgrsSttus").val()?"all":$("#csdbpr_chargerSrchProgrsSttus").val(),
		"sendingOuCode" : sendingOuCode==undefined?"":sendingOuCode,
		"sendingUid" : sendingUid==undefined?"":sendingUid,
		"cdbActStCds" : showType,
		"alldept" : $("#csdbpr_ALLDept").prop("checked"),
		"ccauth" : "N"
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}

//insert
function setJsonStrChargerInsert() {
	var hisTbbs_id = $("#csdbpr_chargerTblTbbsid").val();
	var processCharger = sendingUName;
//    var complete="no";
    var statContent="";
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTUuY2hhcmdlckluc2VydA==",
	    "map" : {
		"key" : "value",
		
		"cdb_act_st_cd" : clickProcessStats_Se,
		"tbbs_id" 	: hisTbbs_id2 =="all" ? hisTbbs_id : hisTbbs_id2,
		"org_usr_id" 	: processUid =="" ? sendingUid : processUid,				
		"rtn_rsn2" 	: statContent,
		"org_id"	: sendingOuCode,
		
//		"req_id" :	$("#csdbpr_chargerTblReqid").val(),
//		"rtn_rsn" 	: $("#csdbpr_chargerJobPrvonsh").val(),
//		"act_cont" 	: $("#csdbpr_chargerJobProcessCtns").val(),
//		"complete" 	: complete,
//		"sendingUid"	: sendingUid,
//		"cdb_req_gb_cd" : cdb_req_gb_cd
	    }
    };

	    
    if (clickProcessStats_Se == "020100") { // 처리중
//		loParam['map']['rtn_rsn'] = "";
		loParam['map']['rtn_rsn2'] = processCharger + "님이 처리중 입니다.";
	} else if (clickProcessStats_Se == "030100") { // 처리완료
//		loParam['map']['rtn_rsn'] = "";
//		loParam['map']['complete'] = "yes";
		loParam['map']['rtn_rsn2'] = processCharger + "님이 처리완료 하였습니다.";
	} else if (clickProcessStats_Se == "020200") { // 반송
//		loParam['map']['complete'] = "yes";
//		loParam['map']['act_cont'] = "";
		loParam['map']['rtn_rsn2'] = processCharger + "님이 반송 하였습니다.";
	} else {}
    
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//사용자별 그리드에 보여줄 상태코드 체크 
function chkshowTypeByUserStatus() {
	/*010105:부서접수, 010200:담당자지정, 020100:담당자처리중, 020300:재작성요청,030100:처리완료*/
	var showType = ["010105","010200","020100","020300","030100"];
	var ca = window.sessionStorage.getItem("CC_AUTH");
	var caf = window.sessionStorage.getItem("CC_AFFAIRS_YN");
	
	if ((ca && caf == "N") || (ca == "N" && caf == "Y")) { 
		showType = showType.slice(0, 3);
		return showType;
	} else {
		return showType;
	};
}

function getJsonStrChargerRcepDetail(reqid , oucode, uid){
    var map ={
	    "comm_id" : reqid,			
	    "sendingOuCode" : oucode,			
	    "uid" : uid}
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStr("c2VsZWN0", "b20wMTUuc2VsZWN0", map),
	success : function(row){
	    //클릭한 게시물 처리상태
	    nowProcessStats_Se=row.PROG_KND_CD;
	    //게시물 요청상태
	    cdb_req_gb_cd=row.NEW_YN;
	    //게시물에 담당자 UID, 이름
	    processUid = row.ORG_USR_ID;
	    processCharger = row.ORG_USR_ID_NM;
	    callCenterReturn = row.USR_NM;
	    submitUnRock2();
	    
	    //hhs 20.03.23
	    if(row.ORG_USR_ID == row.USR_ID && row.PROG_KND_CD=="020100"){ //최초 신규일때 삭제기능
			$("#csdbpr_chargerBtnDelete").show(); //hhs
		}else{
			$("#csdbpr_chargerBtnDelete").hide(); //hhs
		}
	  
	    if((row.NEW_YN == "010100" && row.PROG_KND_CD=="010200") || (row.NEW_YN == "010100" && row.PROG_KND_CD=="020100") || (row.NEW_YN == "010100" && row.PROG_KND_CD=="020300")){
	    	$("#csdbpr_chargerJobBtnDbNew").show();
			$("#csdbpr_chargerJobBtnDbRegist").hide();
			$("#csdbpr_chargerJobBtnDbDelete").hide();
			$("#csdbpr_chargerJobBtnRetrn").show(); //hhs
	    }else if((row.NEW_YN == "020100" && row.PROG_KND_CD=="010200") || (row.NEW_YN == "020100" && row.PROG_KND_CD=="020100") || (row.NEW_YN == "020100" && row.PROG_KND_CD=="020300")){
			$("#csdbpr_chargerJobBtnDbNew").hide();
			$("#csdbpr_chargerJobBtnDbRegist").show();
			$("#csdbpr_chargerJobBtnDbDelete").hide();
			$("#csdbpr_chargerJobBtnRetrn").show(); //hhs
	    }else if((row.NEW_YN == "030100" && row.PROG_KND_CD=="010200") || (row.NEW_YN == "030100" && row.PROG_KND_CD=="020100") || (row.NEW_YN == "030100" && row.PROG_KND_CD=="020300")){
			$("#csdbpr_chargerJobBtnDbNew").hide();
			$("#csdbpr_chargerJobBtnDbRegist").hide();
			$("#csdbpr_chargerJobBtnDbDelete").show();
			$("#csdbpr_chargerJobBtnRetrn").show(); //hhs
	    }else{
			$("#csdbpr_chargerJobBtnDbNew").hide();
			$("#csdbpr_chargerJobBtnDbRegist").hide();
			$("#csdbpr_chargerJobBtnDbDelete").hide();
			$("#csdbpr_chargerJobBtnRetrn").hide(); //hhs
	    }
	    
	    if(row.ORG_USR_ID == row.USR_ID){ //hhs 20.04.01 담장자랑 요청자가 같으면 반송버튼 숨기기
	    	$("#csdbpr_chargerJobBtnRetrn").hide(); 
	    }
	    
	    //init	
	    $("#csdbpr_chargerJobRequstSe,#csdbpr_chargerJobRqester,#csdbpr_chargerJobCnsltTy," +
		    "#csdbpr_chargerJobProcessCtns,#csdbpr_chargerJobChrg,#csdbpr_chargerJobCharger," +
		    "#csdbpr_chargerJobRegist,#csdbpr_chargerJobUpdt,#csdbpr_chargerJobAtchFile").empty();
		    $("#csdbpr_chargerJobPrvonsh").val("");
		    $("#csdbpr_chargerJobPrvonsh,#csdbpr_chargerJobCnsltTy2,#csdbpr_pgrfrsPrson,#csdbpr_pgrfrsPrson2").html("");
//		    DEXT5.setHtmlValue("", 'chargerJobCtns');
	    $("#csdbpr_pgrfrsPrson").html(row.AFFS_USR_NM);
	    $("#csdbpr_pgrfrsPrson2").html(row.ORG_USR_ID_NM);
	    $("#csdbpr_sendPopupRequSe").val(row.COMM_NEW);
	    $("#csdbpr_sendPopupChageRea").val(row.RTN_RSN);
	    $("#csdbpr_chargerJobPrvonsh").html(row.RTN_RSN);
	    $("#csdbpr_chargerJobRequstSe").html(row.COMM_NEW);			
	    $("#csdbpr_chargerJobDbSe").val(row.CDB_GB_CD);		 
	    $("#csdbpr_chargerJobRqester").html(row.USR_NM);
	    $("#csdbpr_chargerJobCnsltTy").html(row.INTV_NM);
	    $("#csdbpr_chargerJobCnsltTy2").html(row.COMM_TTL);
//	    DEXT5.setHtmlValue(row.COMM_CNTN==null?"":row.COMM_CNTN, 'chargerJobCtns');

//	    chargerJobCtns.SetEditorContent(row.COMM_CNTN==null?"":row.COMM_CNTN, function() {
//	    	chargerJobCtns.SetEditMode(3);
//		});
	    chargerJobCtns.SetEditorContent(row.COMM_CNTN==null?"":row.COMM_CNTN);
	    $("#csdbpr_chargerJobProcessCtns").html(row.ACT_CONT);
	    $("#csdbpr_chargerJobChrg").html(row.DEPT_ID_NM);	
	    $("#csdbpr_chargerJobCharger").html(row.ORG_USR_ID_NM);
	    $("#csdbpr_sendPopupRequSe").val(row.COMM_NEW);  				
	    $("#csdbpr_sendPopupChageRea").val(row.RTN_RSN);  				
	    $("#csdbpr_chargerJobRegist").html(row.CRT_DTTM);
	    $("#csdbpr_chargerJobUpdt").html(row.MOD_DTTM);
	    $("#csdbpr_chargerTblReqid").val(row.COMM_ID);
	    $("#csdbpr_tfReqRsn").html(row.RE_MOD_REQ_RSN);
	    $("#csdbpr_chargerJobAtchFile").empty();
	    
	    if(row.PROG_KND_CD=="020200"){
		    $("#csdbpr_chargerJobBtnInsert").hide();
	    }else{
	    	$("#csdbpr_chargerJobBtnInsert").show();
	    }
	    
	    // inte=row.INTV_EX_CD;
	    intl=row.INTV_LG_CD;
	    intm=row.INTV_MD_CD;
	    ints=row.INTV_SM_CD;
	    inigd=row.CDB_GB_CD;
	    inittl=row.COMM_TTL;
	    
	    window.sessionStorage.setItem("INTV_LG_CD",intl);
	    window.sessionStorage.setItem("INTV_MD_CD",intm);
	    window.sessionStorage.setItem("INTV_SM_CD",ints);
	    
	    //set radiobtn
	    $('input:radio[name=Vchargerradio]').prop('checked', false);
	    $('input:radio[name=Vchargerradio]:radio[value='+row.PROG_KND_CD+']').prop('checked', true);
	    showAttachFiles(row.COMM_ID,$("#csdbpr_chargerJobAtchFile"),"om015");

	    if(!row.TBBS_ID){
		hisTbbs_id="all";
	    }else{
		hisTbbs_id2 = row.TBBS_ID;
	    }
	    
	    //hhs
	    var proval = 0;
   		switch(nowProcessStats_Se){
   		case "010105" :
   			proval = 25;
   			csdpro_cssEvent(nowProcessStats_Se);
   		      break;
   		case "010200" :
   		case "020300" :
   			proval = 50;
   			csdpro_cssEvent(nowProcessStats_Se);
   		      break;
   		case "020100" :
   			proval = 75;
   			csdpro_cssEvent(nowProcessStats_Se);
   		      break;
   		case "020200" :
   		case "030100" :
   			$("#csdpro_progressbar > *").css("color","#ffffff");
   			$("#csdpro_progressbar > *").eq(1).html("담당자지정");
   			proval = 100;
   			break;
   		}
   		$("#csdpro_progressbar").progressbar({
   			value : proval
   		});
	    
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
};


//hhs 20.03.25 progress-label css
function csdpro_cssEvent(nowProcessStats_Se) {
	switch (nowProcessStats_Se) {
	case "010105": // 부서접수
		$("#csdpro_progressbar > *").css("color", "#ffffff");
		$("#csdpro_progressbar > *").eq(1).css("color", "#1a1a1a");
		$("#csdpro_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#csdpro_progressbar > *").eq(3).css("color", "#1a1a1a");
		$("#csdpro_progressbar > *").eq(1).html("담당자지정");
		break;
	case "010200": // 담당자지정
		$("#csdpro_progressbar > *").css("color", "#ffffff");
		$("#csdpro_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#csdpro_progressbar > *").eq(3).css("color", "#1a1a1a");
		$("#csdpro_progressbar > *").eq(1).html("담당자지정");
		break;
	case "020300": // 재작성요청
		$("#csdpro_progressbar > *").css("color", "#ffffff");
		$("#csdpro_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#csdpro_progressbar > *").eq(3).css("color", "#1a1a1a");
		$("#csdpro_progressbar > *").eq(1).html("재작성요청");
		break;
	case "020100": // 처리중
		$("#csdpro_progressbar > *").css("color", "#ffffff");
		$("#csdpro_progressbar > *").eq(3).css("color", "#1a1a1a");
		$("#csdpro_progressbar > *").eq(1).html("담당자지정");
		break;
	}
}


function submitUnRock2(){
    if(nowProcessStats_Se=="010200" || nowProcessStats_Se=="020100"){
//    $("#csdbpr_chargerJobProcessCtns").attr('disabled', true);
    $("#csdbpr_chargerJobPrvonsh").attr("disabled",true);
    }else{
//	$("#csdbpr_chargerJobProcessCtns").attr('disabled', true);
	$("#csdbpr_chargerJobPrvonsh").attr("disabled",true);
    }
    rock2=false;
    
}

//조회 버튼 클릭 이벤트    
function chargerSrchSearch_clickEvent(){
    $("#csdbpr_tblChargerProcesstList").jqGrid("setGridParam", {postData : {pJson : getJsonStrChargerProcess()}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#csdbpr_tblChargerProcesstList").trigger("reloadGrid");
}

//초기화 버튼 클릭 이벤트 
function chargerSrchInit_clickEvent(){
    rock2=null;
    clickProcessStats_Se="";
    initChargerDate();
    initradio2();
    clickReqId="";
	clickTbbsId="";
	cdb_req_gb_cd="";
    $("#csdbpr_chargerJobBtnRequstHis").hide();
    $("#csdbpr_chargerJobBtnDbNew").hide();
//    $("#csdbpr_chargerJobProcessCtns").attr('disabled', true);
    $("#csdbpr_chargerJobPrvonsh").attr('disabled', true);
    $("#csdbch_deptSrchRequstSe, #csdbch_deptSrchProgrsSttus, #csdbch_deptSrchDbSe, #csdbch_eptJobDbSe").val('all');	 
    $("input:radio[name=chargerradio]").attr("checked",false);
    $("#csdbpr_chargerJobRequstSe,#csdbpr_chargerJobRqester,#csdbpr_chargerJobCnsltTy," +
    "#csdbpr_chargerJobProcessCtns,#csdbpr_chargerJobChrg,#csdbpr_chargerJobCharger," +
    "#csdbpr_chargerJobRegist,#csdbpr_chargerJobUpdt,#csdbpr_chargerJobAtchFile").empty();
    $("#csdbpr_chargerJobPrvonsh").val("");
    $("#csdbpr_chargerJobPrvonsh,#csdbpr_chargerJobCnsltTy2,#csdbpr_pgrfrsPrson,#csdbpr_pgrfrsPrson2").html("");
//    DEXT5.setHtmlValue("", 'chargerJobCtns');	    
    chargerJobCtns.SetEditorContent("");
    $("#csdbpr_tblChargerProcesstList").jqGrid("setGridParam", {postData : {pJson : getJsonStrChargerProcess()}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#csdbpr_tblChargerProcesstList").trigger("reloadGrid");
}

//hhs 2020.03.16
//반송 팝업
function popupEvent(clickTbbsId,clickReqId){
	clickProcessStats_Se="020200"; 
	
	var width = 500;
	var height = 165;
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + "/web/civilservice/cswDbManage_return.do?tbbsId="+clickTbbsId+"&reqId="+clickReqId;
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
		+ top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "반송", option);
	newWindow.focus();	
	
}

//hhs 20.03.23
//삭제 버튼 클릭 이벤트
function ChargerBtnDelete_clickEvent(clickReqId) {
	if(!confirm("삭제하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonStrDeleteChargerDB(clickReqId),
		success : function(data) {
			$("#csdbpr_tblChargerProcesstList").trigger("reloadGrid");
			alert("삭제 되었습니다.");
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//hhs 20.03.23
//게시글 삭제
function getJsonStrDeleteChargerDB(clickReqId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTUuZGVsZXRlQ250REI=",
		"map" : {
			"key" : "value",
			"req_id" : clickReqId,
			"use_yn" : "N",
			"mod_usr_id" : sendingUid,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}


// 저장 버튼 클릭 이벤트
function ChargerBtnInsert_clickEvent(){
    var check = null;
    
    // 처리완료이고, 부서접수 일때
    if(clickProcessStats_Se == "030100" && cdb_req_gb_cd =="010105"){
		$.ajax({
		    type : "post",
		    dataType : "json",
		    async : false,
		    url : "/ajax/civilservice/csw.do",
		    data : "pJson=" + getJsonStr("c2VsZWN0T25l", "b20wMTAuY2l2aWxjaGVja0NvbnRlbnQ=", {"tbbs_id" : hisTbbs_id2 }),
		    success : function(data){
		    	check = data.TTL == null ? "err" : data.TTL;
		    },
		    error : function(data, status, err)
		    {
		    	check = "err";
			//networkErrorHandler(data, status, err);
		    }
		});
    }
    
    if(check=="1"){
		alert("신규DB를 등록해주세요.");
		return;
    }
    
//    console.log("ChargerBtnInsert_clickEvent [ hisTbbs_id ] : "+hisTbbs_id);
//    console.log("ChargerBtnInsert_clickEvent [ hisTbbs_id2] : "+hisTbbs_id2);
   
   // insert oh015
   $.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + setJsonStrChargerInsert(),
		success : function(data){
			
		},
		error : function(data, status, err)
		{
		    networkErrorHandler(data, status, err);
		}
    });
   
   // update om015
   $.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + setJsonStrChargerUpdate(),
		success : function(data){
			
		},
		error : function(data, status, err)
		{
		    networkErrorHandler(data, status, err);
		}
   });
   
   // 신규이고, 반송일때 : 해당 게시물 삭제
   if(cdb_req_gb_cd =="010100" && clickProcessStats_Se == "020200"){
	   $.ajax({
			type : "post",
			dataType : "json",
			async : false,
			url : "/ajax/civilservice/csw.do",
			data : "pJson=" + setJsonStrChargerDelete(),
			data : "pJson=" + getJsonStr("ZGVsZXRl", "b20wMTUuZGVsZXRl", {
				"tbbs_id" : hisTbbs_id2 =="all" ? hisTbbs_id : hisTbbs_id2 
			}),
			success : function(data){
				
			},
			error : function(data, status, err)
			{
			    networkErrorHandler(data, status, err);
			}
	   }); 
   }
   
   chargerSrchSearch_clickEvent();
   
}

function setJsonStrChargerUpdate(){
//	var hisTbbs_id = $("#csdbpr_chargerTblTbbsid").val();
	var processCharger = sendingUName;
    var complete="no";
    var loParam = {
	    "qt" : "dXBkYXRl",
	    "mi" : "b20wMTUudXBkYXRlQWN0",
	    "map" : {
		"key" : "value",
		"req_id" :	$("#csdbpr_chargerTblReqid").val(),
		"cdb_act_st_cd" : clickProcessStats_Se,
		"rtn_rsn" 	: $("#csdbpr_chargerJobPrvonsh").val(),
		"act_cont" 	: $("#csdbpr_chargerJobProcessCtns").val(),
		"complete" 	: complete,
		"org_usr_id" 	: processUid =="" ? sendingUid : processUid,
		
//		"tbbs_id" 	: hisTbbs_id2 =="all" ? hisTbbs_id : hisTbbs_id2,
//		"rtn_rsn2" 	: statContent,
//		"org_id"	: sendingOuCode,
//		"sendingUid"	: sendingUid,
//		"cdb_req_gb_cd" : cdb_req_gb_cd
	    }
    };

	    
    if (clickProcessStats_Se == "020100") { // 처리중
		loParam['map']['rtn_rsn'] = "";
//		loParam['map']['rtn_rsn2'] = processCharger + "님이 처리중 입니다.";
	} else if (clickProcessStats_Se == "030100") { // 처리완료
		loParam['map']['rtn_rsn'] = "";
		loParam['map']['complete'] = "yes";
//		loParam['map']['rtn_rsn2'] = processCharger + "님이 처리완료 하였습니다.";
	} else if (clickProcessStats_Se == "020200") { // 반송
		loParam['map']['complete'] = "yes";
		loParam['map']['act_cont'] = "";
//		loParam['map']['rtn_rsn2'] = processCharger + "님이 반송 하였습니다.";
	} else {}
    
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

function initChargerSelectData(){
    $("#csdbpr_chargerSrchDbSe, #csdbpr_chargerSrchDbSe, #csdbpr_StatsSrchDbSe").empty();	 
    setSelectBoxWithCode2("csdbpr_chargerSrchRequstSe", "전체", "90302", g_popup, "", "");		    // 요청구분 셋팅
    setSelectBoxWithCode3("csdbpr_chargerSrchProgrsSttus", "전체", "90301", g_popup, "", "");	    	    // 진행상태 셋팅
    setSelectBoxWithCode2("csdbpr_chargerSrchDbSe", "전체", "90303", g_popup, "", "");	   	            // DB구분 div2
    setSelectBoxWithCode2("csdbpr_chargerJobDbSe","전체", "90303", g_popup, "", "");	   		    // DB구분
}

//init radio
function initradio2(){
    $("input:radio[name=Vchargerradio]").attr("disabled",true);
    $("#csdbpr_chargerJobBtnDbRegist").hide();
	$("#csdbpr_chargerJobBtnDbDelete").hide();
    $("#csdbpr_chargerJobBtnDbNew").show();
}

function initChargerDate(){
    var date = new Date();
    var mo = moment(date).add(-1,'month'); 
    var d_frdate = moment(mo, 'DD/MM/YYYY', true).format().substr(0,10);
    datePicker("#csdbpr_chargerSrchSelFrDate");
    datePicker("#csdbpr_chargerSrchSelToDate");
    $("#csdbpr_chargerSrchSelFrDate").val(d_frdate);
    $("#csdbpr_chargerSrchSelToDate").val(getDate());
    
}


function reqPopupNew(regist){
	// 2020.02.28 hhs commnew 인코딩 에러(IE에서만 발생) 수정
	popupwindow=reqPopup2("1050","1050","/web/civilservice/cswDbManage_Regist.do?&regist="+regist+"&reqid="+clickReqId+"&tbbsid="+clickTbbsId+"&reqcd="+cdb_req_gb_cd+"&commnew="+encodeURI(clickCommnew),"상담DB관리");
    }

//initialization screen
function screenProcess(){
    initChargerSelectData();
    initradio2();
    initChargerDate();
    csdbpr_editerCall();
    // hhs
    $("#csdpro_progressbar").progressbar({
	      value: 0
    });

    $("#csdbpr_chargerJobBtnRequstHis").hide();
    $("#csdbpr_tblChargerProcesstList").jqGrid({
	url : "/jqgrid/civilservice/csw.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrChargerProcess()
	},
	jsonReader :
	{
	    repeatitems: false
	},
	colNames : ["번호","게시물ID","부서ID", "기관사용자ID","요청일", "요청구분", "상담유형", "제목", "처리일자", "부서명","서무", "담당자", "처리상태"],
	colModel :
	    [
	     { name : "COMM_ID", 	index : "COMM_ID", hidden : true },
	     { name : "TBBS_ID", 	index : "TBBS_ID", hidden : true },
	     { name : "ORG_ID", 	index : "ORG_ID",  hidden : true },
	     { name : "ORG_USR_ID", 	index : "ORG_USR_ID", hidden : true },
	     { name : "CRT_DTTM", 	index : "CRT_DTTM", 		align : "center", width : 50 },                   		//담당자   
	     { name : "COMM_NEW", 	index : "COMM_NEW", 		align : "center", width : 30 },					//요청구분								
	     { name : "INTV_NM", 	index : "INTV_NM", 		align : "left", width : 120 },					//상담유형
	     { name : "COMM_TTL", 	index : "COMM_TTL", 		align : "left", width : 80 },
	     { name : "ACT_DTTM", 	index : "ACT_DTTM", 		align : "center", width : 50 },					//처리일자
			{ name : "AFFS_DEPT_NM", index : "AFFS_DEPT_NM", 	align : "center", width : 50 },                   			//부서명
	     { name : "AFFS_USR_NM", index : "AFFS_USR_NM", 	align : "center", width : 30 },                   			//서무
	     { name : "ORG_USR_ID_NM", 	index : "ORG_USR_ID_NM", 	align : "center", width : 30 },                   		//담당자   
	     { name : "PROG_KND_NM", index : "PROG_KND_NM", 		align : "center", width : 35 },				  	 //처리상태 코드추가	
	     ],	
	     sortname : "CRT_DTTM",
	     sortorder : "desc",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "265",
	     width : "100%",
	     rowNum : 10,
		 rowList : [5, 10, 20, 50, 100],
	     autowidth : true,
	     pager : "#csdbpr_pgChargerProcesstList",
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
		 $("#csdbpr_chargerJobBtnRequstHis").show();
		 var row = $("#csdbpr_tblChargerProcesstList").getRowData(rowid);
		 getJsonStrChargerRcepDetail(row.COMM_ID, row.ORG_ID, row.ORG_USR_ID);
		 //팝업을 위한 SETTING
		 clickReqId=row.COMM_ID;
		 clickTbbsId=row.TBBS_ID;	
		 clickCommnew=row.COMM_NEW;
		 if(row.PROG_KND_NM=="완료"){
			 $("#csdbpr_trReqRsn").hide();
		 }else if(row.PROG_KND_NM=="재작성요청"){
			 $("#csdbpr_trReqRsn").show();
		 }else{
			 $("#csdbpr_trReqRsn").hide();
		 }
	     },
		 loadComplete : function(){
				$('#csdbpr_chargerSrchProgrsSttus option[value="010100"]').remove();
				$('#csdbpr_chargerSrchProgrsSttus option[value="010105"]').remove();
				$('#csdbpr_chargerSrchProgrsSttus option[value="010400"]').remove();
				$('#csdbpr_chargerSrchProgrsSttus option[value="020200"]').remove();
 		}
    }).jqGrid("navGrid", "#csdbpr_pgChargerProcesstList", {edit : false, add : false, del : false, search : false});
   
    $("#csdbpr_chargerJobBtnDbNew").hide();
    //add event to this
    $("#csdbpr_chargerSrchSearch").bind("click", chargerSrchSearch_clickEvent);
    $("#csdbpr_chargerSrchInit").bind("click", chargerSrchInit_clickEvent);
//    $("#csdbpr_chargerJobBtnInsert").bind("click", ChargerBtnInsert_clickEvent);
    $("#csdbpr_chargerJobBtnRequstHis").click(function(e) {requstHis_popupEvent(clickTbbsId);});
    $("#csdbpr_chargerJobBtnDbNew").bind("click", function(e) {reqPopupNew('y')});
    $("#csdbpr_chargerJobBtnDbRegist").bind("click", function(e) {reqPopupNew('')});	
    $("#csdbpr_chargerJobBtnDbDelete").bind("click", function(e) {reqPopupNew('')});	
    //$("#csdbpr_chargerJobBtnDbDetail").bind("click", reqPopupDetail);
    
    //hhs
    $("#csdbpr_chargerJobBtnRetrn").hide();
    $("#csdbpr_chargerBtnDelete").hide();
    $("#csdbpr_chargerJobBtnRetrn").click(function(e) {popupEvent(clickTbbsId,clickReqId);});
    $("#csdbpr_chargerBtnDelete").bind("click", function(e) {ChargerBtnDelete_clickEvent(clickReqId)});
    
	if (window.sessionStorage.getItem("CC_AUTH") == "Y") {
		$("#csdbpr_ALLDept").show();
		$("#csdbpr_ALLDept_th").html("전체부서");
	};
	
    window.onbeforeunload = function(){
	if(popupwindow){
	    popupwindow.close();
	}
    };
};


function getDateMonthAgo()
{
	var date = new Date();
	date.setMonth(date.getMonth()-1);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	
	return year + "-" + month + "-" + day; 
}

function csdbpr_editerCall() {
//	DEXT5.config.Mode = 'view';
//	DEXT5.config.Height = "100%";
//	DEXT5.config.Width = "100%;";
//	DEXT5.config.zStatusBar = "1";
//	DEXT5.config.zTopMenu = "1";
//	DEXT5.config.zToolBar = "1";
//	DEXT5.config.SkinName = "gray";
//	DEXT5.config.EditorHolder = "csdbpr_chargerJobCtns";
//	new Dext5editor("chargerJobCtns");
	chargerJobCtns = new KuKudocsEditor(
            /* ID 입력부 */
            'csdbpr_chargerJobCtns',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '99%',

                //Editor 세로크기
                height: '99%',
                
//                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',

                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'editGroup','insertGroup', 'headingGroup', 'fontFamilyGroup', 'fontSizeGroup', 'textFormatGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'], /* Menu Option Hidden list */

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
//                useEditorMenu : false,
                
                //HTML Menu 사용유무 지정
                useHtmlMode : false,
                
                //Text Menu 사용유무 지정
                useTextMode : false,

                //Preview Menu 사용유무 지정
                usePreviewMode : true,
                
                //Editor Resize Menu 사용유무 지정
                useEditorResize : false,

                //MenuBar 사용유무 지정
//                useMenuBar : true
            });
	
}




