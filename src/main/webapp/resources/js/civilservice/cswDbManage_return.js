var checkInnerPopup = false;
var sendingOuCode = checkInnerPopup ? window.sessionStorage.getItem("CNTR_CD") : opener.sendingOuCode;
var processUid = checkInnerPopup ? window.sessionStorage.getItem("USR_ID") : opener.sendingUid;
var processCharger = opener.sendingUName;
var cdb_req_gb_cd = checkInnerPopup ? reqcd : opener.cdb_req_gb_cd;

function btnReturn_clickEvent(tbbs_id) {
	if($("#csdbpr_chargerJobPrvonsh").val()==""){	    
		alert("반송사유를 입력해주세요.");
		$("#csdbpr_chargerJobPrvonsh").focus();
		return;
	}
	
	if(btnId=="csdbch_deptJobBtnInsertRtn"){
		opener.clickProcessStats="020200";
		opener.$("#csdbch_deptJobPrvonsh").val($("#csdbpr_chargerJobPrvonsh").val());
		opener.deptBtnInsert_clickEvent();
		window.close();
	}else{
	var rowid = opener.$("#csdbpr_tblChargerProcesstList").jqGrid('getGridParam','selrow');
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + setJsonStrChargerInsert(),
		success : function(data){
			opener.$("#csdbpr_tblChargerProcesstList").trigger("reloadGrid");
			alert("반송 되었습니다.");
			self.close();
			opener.$("#csdbpr_tblChargerProcesstList").jqGrid("setSelection", rowid, true); // reload후 row다시 선택
			},
		error : function(data, status, err)
		{
		    networkErrorHandler(data, status, err);
		}
	    });
	}
}

function setJsonStrChargerInsert(){
	var complete="no";
    var statContent="";
    var clickProcessStats_Se="020200";
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTUuY2hhcmdlckluc2VydA==", //om015.chargerInsert
	    "map" : {
		"key" : "value",
		"req_id" :	reqId,
		"cdb_act_st_cd" : clickProcessStats_Se,
		"rtn_rsn" 	: $("#csdbpr_chargerJobPrvonsh").val(),
		"complete" 	: complete,
		"tbbs_id" 	: tbbsId,
		"org_usr_id" 	: processUid,				
		"rtn_rsn2" 	: statContent,
		"org_id"	: sendingOuCode,
//		"sendingUid"	: processUid,
		"cdb_req_gb_cd" : cdb_req_gb_cd //처리상태
	    }
    };
	
	loParam['map']['complete'] = "yes";
	loParam['map']['act_cont'] = "";
	loParam['map']['rtn_rsn2'] = processCharger+"님이 반송 하였습니다.";;
	
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 취소버튼 클릭이벤트
function btnCancel_clickEvent() {
	self.close();
}

// Init page
$(document).ready(function() {
	// 반송 버튼 클릭 이벤트 등록
	$("#returnBtn").bind("click", btnReturn_clickEvent);
	// 취소 버튼 클릭 이벤트 등록
	$("#cancleBtn").bind("click", btnCancel_clickEvent);
});