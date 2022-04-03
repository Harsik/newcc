var nowProcessStats_Se = "";
var clickProcessStats_Se = "";

var processUid = "";
var processCharger = "";
var cdb_req_gb_cd = "";
var hisTbbs_id2 = "all"
var rock2 = null;
//popup id
var clickReqId = "";
var clickTbbsId = "";

var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var sendingUid = window.sessionStorage.getItem("USR_ID");
//var usrNm = window.sessionStorage.getItem("USR_NM");
var sendingOuCode = usrGrdCd;
var checkInnerPopup = "ok";
// var inte="";
var intl = "";
var intm = "";
var ints = "";
var inigd = "";
var ninst = "";
var inittl = "";

var g_ListPopup = "CHILD";
var hisFileBox_idx = 0;
var hisGrfrstNm = "";

var taCommCntn=null;

//파라미터 셋팅 modifyCommnet
function getJsonStrModifyComment(commId) {

	var ccAffir = $("#jisikd_CCAffair").val() != null ? $("#jisikd_CCAffair").val() : "N";

//	var commCntn = DEXT5.getBodyValue("taCommCntn");
	var commCntn = taCommCntn.GetEditorContent();
	if (commCntn == "") {
		alert("요청내용이 없습니다.");
		return;
	}

	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTUudXBkYXRlY29tbWVudA==",
		"map" : {
			"key" : "value",
			"comm_id" : commId,
			"intv_lg_cd" : $("#jisikd_infosCounselKnd1").val(),
			"intv_md_cd" : $("#jisikd_infosCounselKnd2").val(),
			"intv_sm_cd" : $("#jisikd_infosCounselKnd3").val(),
			"cdb_gb_cd" : $("#jisikd_infosGbKnd").val(), //db구분
			"comm_ttl" : $("#jisikd_infosCommTtl").val(),
			"comm_cntn" : commCntn,
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"cdb_act_st_cd" : $("#jisikd_progKndCd").val(),
			"new_yn" : $("#jisikd_infosCommNew").val(), //요청구분
			"tbl_nm" : "om015",
			"tbl_pk" : commId,
			"org_id" : $("#jisikd_ChargerDeptId").val(),
			"affs_org_usr_id" : $("#jisikd_ChargerUsrId").val(), //기관사용자ID
			"ccaffir" : ccAffir,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//hhs 20.06.12 히스토리 저장
function getJsonStrCommentHistory() {
	var commCntn = taCommCntn.GetEditorContent();
	if (commCntn == "") {
		alert("요청내용이 없습니다.");
		return;
	}
	
	if (hisGrfrstNm == "" || hisGrfrstNm == null) {
		hisGrfrstNm = window.sessionStorage.getItem("USR_NM");
	}
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wMTUudXBkYXRlY29tbWVudEhpc3Rvcnk=",
			"map" : {
				"key" : "value",
				"tbbs_id" : clickTbbsId,
				"usr_id2" : $("#jisikd_ChargerUsrId").val(),
				"org_id2" : $("#jisikd_ChargerDeptId").val(),
				"comm_ttl" : $("#jisikd_infosCommTtl").val(),
				"comm_cntn" : commCntn,
				"org_usr_id2" : $("#jisikd_ChargerOrgUsrId").val(), //기관사용자id
				"org_ful_nm2" : $("#jisikd_ChargerOrgFulNm").val(), //기관사용자nm
				"cdb_gb_cd" : $("#jisikd_infosGbKnd").val(), //db구분
				"intv_lg_cd" : $("#jisikd_infosCounselKnd1").val(),
				"intv_md_cd" : $("#jisikd_infosCounselKnd2").val(),
				"intv_sm_cd" : $("#jisikd_infosCounselKnd3").val(),
				"cdb_act_st_cd" : $("#jisikd_progKndCd").val(),
				"new_yn" : $("#jisikd_infosCommNew").val(), //요청구분
				"login_usr_id" : window.sessionStorage.getItem("USR_ID"),
				"rtn_rsn2" : hisGrfrstNm + "님이 승인하였습니다.",
				"message" : "요청되었습니다."
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

// hhs 20.06.12 센터승인N 처리
function getJsonStrUpdateCommentUseN(){
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wMTUudXBkYXRlQ29tbWVudFVzZU4=",
			"map" : {
				"key" : "value",
				"tbbs_id" : clickTbbsId,
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}


//수정 이벤트
function btnModifyCommentClickEvent() {
	var commId = $("#jisikd_infosCommId").val();
	//if(document.writeHisForm.HISMANUAL.value != ""){
	if ($("#HISMANUAL").val()) {
		var nLimitSize = 0.30; //제한사이즈 MB
		var formName = $("#jisikd_writeForm input[name=HISMANUAL]");

		for (var i = 0; i < formName.length; i++) {
			if (formName[i].value != "") {
				var nRtn = fileCheck(formName[i], nLimitSize);
				if (nRtn > nLimitSize) {
					alert("[" + (i + 1) + "번 파일] : (" + nRtn + "MB) 첨부파일 사이즈는 " + nLimitSize + "MB 이내로 등록 가능합니다.");
					return;
				}
				//파일 확장자 체크
				if (fileExtnsCheck(formName[i]) == false) {
					alert("[" + (i + 1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!");
					return;
				}
			}
		}
	}
	gAppendHidden("jisikd_writeForm", "pJson", getJsonStrModifyComment(clickReqId));
	gSubmitPost("jisikd_writeForm", true);
	
	// hhs 20.06.12 insert충돌/쿼리분리
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonStrCommentHistory(),
		success : function(data) {
			
			if(clickTbbsId != null || clickTbbsId != ''){
				// useYn : N
				$.ajax({
					type : "post",
					dataType : "json",
					async : false,
					url : getContextPath() + "/ajax/civilservice/csw.do",
					data : "pJson=" + getJsonStrUpdateCommentUseN(),
					success : function(data) {
					},
					error : function(data, status, err) {
						networkErrorHandler(data, status, err);
					}
				});
			}
			
			/*
			// 20.06.18 SMS막음
			// 상담DB요청 - 문자발송
		    $.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/civilservice/csw.do",
				data : "pJson=" +  getJsonStrRsltAlrmSendSms(),
				success : function(data){
					 console.log("==> SMS발송 성공")
				},
				error : function(data, status, err) {								
					networkErrorHandler(data, status, err);
				}
			});	//ajax	
			*/
		},
		error : function(data, status, err) {
			alert("=== 히스토리저장 실패");
//			networkErrorHandler(data, status, err);
		}
	});
	
	chargerSrchInit_clickEvent();
	/*
	 * setTimeout(function(){ $("#jsrwhs_tblComments").trigger("reloadGrid"); }, 400)
	 */
}

//파라미터 셋팅_SendSms
function getJsonStrRsltAlrmSendSms(){
	var sndPhoneNum = "";
	var sndUserId = "";
	var sndUserNm = "";
	var callback="0617493114";
	
	// 010105 : 부서접수, 010200 : 담당자지정
	if($("#jisikd_progKndCd").val()=="010105"){
		sndPhoneNum = $("#jisikd_CCAffairMobile").val().replace(/-/gi, "");	
		sndUserId = $("#jisikd_CCAffairId").val();
		sndUserNm = $("#jisikd_CCAffairNm").val();
			
	}else if($("#jisikd_progKndCd").val()=="010200"){
		sndPhoneNum = $("#jisikd_OrgMobile").val().replace(/-/gi, "");
		sndUserId = $("#jisikd_ChargerOrgUsrId").val();
		sndUserNm = $("#jisikd_Charger").html();
	}
	
						
	if($("#jisikd_infosCommNew").val() == "010100"){
		sendMsg = "콜센터로부터 상담DB 신규요청이 접수되었습니다. 확인부탁드립니다."		 
	}else if($("#jisikd_infosCommNew").val() == "020100"){
		sendMsg = "콜센터로부터 상담DB 수정요청이 접수되었습니다. 확인부탁드립니다."	
	}else if($("#jisikd_infosCommNew").val() == "030100"){
		sendMsg = "콜센터로부터 상담DB 삭제요청이 접수되었습니다. 확인부탁드립니다."	
	}
	 
	var loParam = {
		 "qt" : "aW5zZXJ0",
		 "mi" : "c21zLnNlbmRTbXM=",
		 "map" : {
			 "key" : "value",
			 "user_id" : "SYSTEM",
			 "sms_msg" : sendMsg,
			 "callback" : callback,
			 "dest_info" : sndUserNm+"^"+sndPhoneNum,
//			 "dest_info" : "테스트^01049364152",
			 "cont_length" : parseInt(charByteSize(sendMsg)),
			 "org_fullNm" : $("#jisikd_ChargerOrgFulNm").val()+"^"+sndUserNm, 	// 부서^이름
			 "org_id" : sndUserId,		// 공무원ID
			 "tckt_id" : "",
			 "message" : "발송요청이 완료되었습니다."
		 }
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//insertComments 
function getJsonStrUpdateComment(req_id, tbbs_id) {
	/*
	 * var flag="";
	 * 
	 * //신규DB요청시 새로운 상담DB를 미리 생성 if($("#jisikd_counselDbNewRegist").prop('checked')){ flag="010100"; }else if($("#jisikd_counselDbModifyRegist").prop('checked')){ flag="020100";} else if($("#jisikd_counselDbDelete").prop('checked')){ flag="030100";} var actstcd = "010100"; if(ccAffir!="Y"){ actstcd = "010200"; }else{ actstcd = "010100"; }
	 */
	var tbl_pk = null;
	if (($("#HISMANUAL").val() != null && $("#HISMANUAL").val() != "") || ($("#jisikd_HISMANUAL").val() != null && $("#jisikd_HISMANUAL").val() != "")) {
		tbl_pk = req_id;
	}
	var ccAffir = $("#jisikd_CCAffair").val() != null ? $("#jisikd_CCAffair").val() : "N";
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTUudXBkYXRlY29tbWVudA==",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om015",
			"tbl_pk" : tbl_pk,
			"req_id" : req_id,
			"intv_lg_cd" : $("#jisikd_infosCounselKnd1").val(), //대분류
			"intv_md_cd" : $("#jisikd_infosCounselKnd2").val(), //중분류
			"intv_sm_cd" : $("#jisikd_infosCounselKnd3").val(), //소분류
			"cdb_gb_cd" : $("#jisikd_infosGbKnd").val(), //DB구분
			"comm_cntn" : taCommCntn.GetEditorContent(), //DEXT5.getBodyValue("taCommCntn"), //요청내용
			"comm_ttl" : $("#jisikd_infosCommTtl").val(), //제목부분
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"new_yn" : $("#jisikd_infosCommNew").val(),
			"cdb_act_st_cd" : $("#jisikd_progKndCd").val(),
			"org_id" : $("#jisikd_ChargerDeptId").val(),
			"affs_org_usr_id" : $("#jisikd_ChargerUsrId").val(), //기관사용자ID
			"comm_id" : req_id,
			"ccaffir" : ccAffir,

			/*
			 * "tbl_pk" : req_id, "req_id" : req_id, //sequence "tbbs_id" :$("#jisikd_tfTbbsId").val(), "org_id" : $("#jisikd_ChargerDeptId").val(), "affs_org_usr_id" : $("#jisikd_ChargerOrgUsrId").val(), //기관사용자ID "cdb_gb_cd" : $("#jisikd_optGbKnd_sc").val(), //DB구분 "intv_lg_cd" : $("#jisikd_optCounselKnd1_sc").val(), //대분류 "intv_md_cd" : $("#jisikd_optCounselKnd2_sc").val(), //중분류 "intv_sm_cd" : $("#jisikd_optCounselKnd3_sc").val(), //소분류 "comm_cntn" : DEXT5.getBodyValue("taCommCntn"), //요청내용 "comm_ttl" : $("#jisikd_taCommTtl").val(), //제목부분 "new_yn" : flag, //신규여부 "cdb_act_st_cd" : actstcd, //신규. "ccaffir" : ccAffir,
			 */
		}
	}
	/*
	 * //신규 요청일경우 if(flag=="010100"){ loParam['map']['tbbs_id']=jisikTbbsId; }else if(flag=="010100" && jisikTbbsId==null){ loParam['map']['tbbs_id']=""; }
	 */
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectComment mi select
function getJsonStrSelectComment(commId) {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMTUuc2VsZWN0",
		"map" : {
			"key" : "value",
			"comm_id" : commId
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//chargerlist
function getJsonStrChargerProcess() {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTUuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"frDt" : $("#jisikd_chargerSrchSelFrDate").val().replace(/[-, :, \s]/g, ""),
			"toDt" : $("#jisikd_chargerSrchSelToDate").val().replace(/[-, :, \s]/g, ""),
			"new_yn" : $("#jisikd_chargerSrchRequstSe").val(),
			"cdb_gb_cd" : $("#jisikd_chargerSrchDbSe").val(),
			"prog_knd_cd" : $("#jisikd_chargerSrchProgrsSttus").val() != null ? $("#jisikd_chargerSrchProgrsSttus").val() : "010100",
			//"sendingOuCode" : sendingOuCode,
			"ccauth" : "N"
		}
	};
	/*
	 * if(sendingOuCode=="030100" || sendingOuCode=="050100" || sendingOuCode=="090100"){ loParam['map']['sendingOuCode']="010000"; }
	 */
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//insert
function setJsonStrChargerInsert() {
	var complete = "no";
	var statContent = "";
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTUuY2hhcmdlckluc2VydA==",
		"map" : {
			"key" : "value",
			"req_id" : $("#jisikd_chargerTblReqid").val(),
			"cdb_act_st_cd" : clickProcessStats_Se,
			"rtn_rsn" : $("#jisikd_chargerJobPrvonsh").val(),
			"act_cont" : $("#jisikd_chargerJobProcessCtns").val(),
			"complete" : complete,
			"tbbs_id" : hisTbbs_id2,
			"org_usr_id" : processUid,
			"rtn_rsn2" : statContent,
			"org_id" : sendingOuCode,
			"sendingUid" : sendingUid,
			"cdb_req_gb_cd" : cdb_req_gb_cd
		}
	};
	if ($("#jisikd_chargerReassignment").prop('checked')) { //담당자 재지정.
		loParam['map']['rtn_rsn'] = "";
		loParam['map']['act_cont'] = "";
		loParam['map']['rtn_rsn2'] = processCharger + "님이 담장자(재)지정요청 하였습니다.";
	} else if ($("#jisikd_chargerJobProcess").prop('checked')) { //처리중
		loParam['map']['rtn_rsn'] = "";
		loParam['map']['rtn_rsn2'] = processCharger + "님이 처리중 입니다.";
		;
	} else if ($("#jisikd_chargerJobCompt").prop('checked')) { //완료
		loParam['map']['rtn_rsn'] = "";
		loParam['map']['complete'] = "yes";
		loParam['map']['rtn_rsn2'] = processCharger + "님이 처리완료 하였습니다.";
		;
	} else if ($("#jisikd_chargerJobRetrn").prop('checked')) { //반송
		loParam['map']['complete'] = "yes";
		loParam['map']['act_cont'] = "";
		loParam['map']['rtn_rsn2'] = processCharger + "님이 반송 하였습니다.";
		;
	} else {
	}

	if (sendingOuCode == "030100" || sendingOuCode == "050100" || sendingOuCode == "090100") {
		loParam['map']['org_id'] = "010000";
	}
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//부서접수목록 클릭시 내용   
function getJsonStrChargerRcepDetail(reqid, oucode, uid) {
	var map = {
		"comm_id" : reqid,
		"sendingOuCode" : oucode,
		"uid" : uid
	}
	console.log(JSON.stringify(map));
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonStr("c2VsZWN0", "b20wMTUuc2VsZWN0", map),
		success : function(row) {
			nowProcessStats_Se = row.PROG_KND_CD;
			//게시물에 대한 담당자uid. 담당자 이름
			processUid = row.AFFS_ORG_USR_ID;
			processCharger = row.AFFS_USR_NM;
			cdb_req_gb_cd = row.NEW_YN;
			submitUnRock2();

			if (row.NEW_YN == "010100" && row.PROG_KND_CD != "030100" && row.PROG_KND_CD != "020200") {
				$("#jisikd_chargerJobBtnDbNew").show();
				$("#jisikd_chargerJobBtnDbRegist").hide();
			} else if (row.NEW_YN == "020100" && row.PROG_KND_CD != "030100" && row.PROG_KND_CD != "020200") {
				$("#jisikd_chargerJobBtnDbNew").hide();
				$("#jisikd_chargerJobBtnDbRegist").show();
			} else if (row.NEW_YN == "030100" && row.PROG_KND_CD != "030100" && row.PROG_KND_CD != "020200") {
				$("#jisikd_chargerJobBtnDbNew").hide();
				$("#jisikd_chargerJobBtnDbRegist").show();
			} else {
				$("#jisikd_chargerJobBtnDbNew").hide();
				$("#jisikd_chargerJobBtnDbRegist").hide();
			}
			//init	
			$(
					"#jisikd_chargerJobRequstSe,#jisikd_chargerJobRqester,#jisikd_chargerJobCnsltTy,#jisikd_chargerJobCnsltTy2, #jisikd_chargerJobCtns,"
							+ "#jisikd_chargerJobProcessCtns,#jisikd_chargerJobChrg,#jisikd_chargerJobCharger,#jisikd_chargerradio," + "#jisikd_chargerJobPrvonsh,#jisikd_chargerJobRegist,#jisikd_chargerJobUpdt,#jisikd_chargerJobAtchFile")
					.empty();

			$("#jisikd_sendPopupRequSe").val(row.COMM_NEW);
			$("#jisikd_sendPopupChageRea").val(row.RTN_RSN);
			$("#jisikd_chargerJobPrvonsh").val(row.RTN_RSN);
			$("#jisikd_chargerJobRequstSe").html(row.COMM_NEW);
			$("#jisikd_chargerJobDbSe").val(row.CDB_GB_CD);
			$("#jisikd_chargerJobRqester").html(row.USR_NM);

			$("#jisikd_chargerJobCnsltTy").html(row.INTV_NM);
			$("#jisikd_chargerJobCnsltTy2").html(row.COMM_TTL);
			$("#jisikd_chargerJobProcessCtns").html(row.ACT_CONT);
			$("#jisikd_chargerJobChrg").html(row.DEPT_ID_NM);
			$("#jisikd_chargerJobCharger").html(row.ORG_USR_ID_NM);
			$("#jisikd_sendPopupRequSe").val(row.COMM_NEW);
			$("#jisikd_sendPopupChageRea").val(row.RTN_RSN);
			$("#jisikd_chargerJobRegist").html(row.CRT_DTTM);
			$("#jisikd_chargerJobUpdt").html(row.MOD_DTTM);
			$("#jisikd_chargerTblReqid").val(row.COMM_ID);
			$("#jisikd_chargerJobAtchFile").empty();
			$("#jisikd_chargerJobCtns").html(row.COMM_CNTN);
			//set radiobtn

			// inte=row.INTV_EX_CD;
			intl = row.INTV_LG_CD;
			intm = row.INTV_MD_CD;
			ints = row.INTV_SM_CD;
			inigd = row.CDB_GB_CD;
			inittl = row.COMM_TTL;

			window.sessionStorage.setItem("INTV_LG_CD", intl);
			window.sessionStorage.setItem("INTV_MD_CD", intm);
			window.sessionStorage.setItem("INTV_SM_CD", ints);

			$('input:radio[name=Vchargerradio]').prop('checked', false);
			$('input:radio[name=chargerradio]').prop('checked', false);
			$('input:radio[name=Vchargerradio]:radio[value=' + row.PROG_KND_CD + ']').prop('checked', true);
			showAttachFiles(row.COMM_ID, $("#jisikd_chargerJobAtchFile"), "om015");

			if (!row.TBBS_ID) {
				hisTbbs_id = "all";
			} else {
				hisTbbs_id2 = row.TBBS_ID;
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
};

//라디오 버튼 클릭 이벤트 
function radioBtn_clickEvent2(e) {
	$("#jisikd_chargerJobPrvonsh,#jisikd_chargerJobProcessCtns").attr("disabled", true);
	switch (e.target.id) {
	case "chargerReassignment":
		clickProcessStats_Se = "010400"; //담당자 재지정
		break;
	case "chargerJobProcess":
		clickProcessStats_Se = "020100"; //처리중
		$("#jisikd_chargerJobProcessCtns").attr('disabled', false);
		$("#jisikd_chargerJobProcessCtns").focus();
		break;
	case "chargerJobCompt":
		clickProcessStats_Se = "030100"; //완료
		$("#jisikd_chargerJobProcessCtns").attr('disabled', false);
		$("#jisikd_chargerJobProcessCtns").focus();
		break;
	case "chargerJobRetrn":
		clickProcessStats_Se = "020200"; //반송
		$("#jisikd_chargerJobPrvonsh").attr('disabled', false);
		$("#jisikd_chargerJobPrvonsh").focus();
		break;
	default:
		break;
	}
}

function submitRock2() {
	$("#jisikd_chargerJobBtnDbNew").hide();
	$("#jisikd_chargerJobBtnDbDetail").hide();
	$("#jisikd_chargerJobBtnDbRegist").hide();
	$("input:radio[name=chargerradio]").attr("disabled", true);
	$("#jisikd_chargerJobProcessCtns").attr('disabled', true);
	$("#jisikd_chargerJobPrvonsh").attr("disabled", true);
	rock2 = true;
}

function submitUnRock2() {
	if (nowProcessStats_Se != "020200" && nowProcessStats_Se != "030100") {
		$("input:radio[name=chargerradio]").attr("disabled", false);
		$("#jisikd_chargerJobProcessCtns").attr('disabled', true);
		$("#jisikd_chargerJobPrvonsh").attr("disabled", true);
	} else {
		$("input:radio[name=chargerradio]").attr("disabled", true);
		$("#jisikd_chargerJobProcessCtns").attr('disabled', true);
		$("#jisikd_chargerJobPrvonsh").attr("disabled", true);
	}
	rock2 = false;

}

//조회 버튼 클릭 이벤트    
function chargerSrchSearch_clickEvent() {
	$("#jisikd_tblChargerProcesstList").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrChargerProcess()
		},
		page : 1,
		sortname : "crt_dttm desc, mod_dttm",
		sortorder : "asc"
	});
	$("#jisikd_tblChargerProcesstList").trigger("reloadGrid");
}

//초기화 버튼 클릭 이벤트 
function chargerSrchInit_clickEvent() {
	rock2 = null;
	clickProcessStats_Se = "";
	initChargerDate();
	initChargerSelectData();
	initradio2();
	$("#jisikd_chargerJobBtnDbNew").hide();
	$("#jisikd_chargerJobBtnDbRegist").hide();
	$("#jisikd_chargerJobProcessCtns").attr('disabled', true);
	$("#jisikd_chargerJobPrvonsh").attr('disabled', true);
	$("#jisikd_deptSrchRequstSe, #jisikd_deptSrchProgrsSttus, #jisikd_deptSrchDbSe, #jisikd_deptJobDbSe").val('all');
	$("input:radio[name=chargerradio]").attr("checked", false);
	$(
			"#jisikd_chargerJobRequstSe,#jisikd_chargerJobRqester,#jisikd_chargerJobCnsltTy, " + "#jisikd_chargerJobProcessCtns,#jisikd_chargerJobChrg,#jisikd_chargerJobCharger,#jisikd_chargerradio,"
					+ "#jisikd_chargerJobPrvonsh,#jisikd_chargerJobRegist,#jisikd_chargerJobUpdt,#jisikd_chargerJobAtchFile,#jisikd_chargerJobCnsltTy2, #jisikd_chargerJobCtns").empty();

	$("#jisikd_tblChargerProcesstList").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrChargerProcess()
		},
		page : 1,
		sortname : "crt_dttm desc, mod_dttm",
		sortorder : "asc"
	});
//	$("#jisikd_tblChargerProcesstList").trigger("reloadGrid");
	$("#jisikd_infosCounselKnd1").val("all").trigger("change");
	$("#jisikd_progKndCd").val("all").trigger("change");
	$("#jisikd_infosCommNew").val("all").trigger("change");
	$("#jisikd_infosGbKnd").val("all").trigger("change");
	$("#jisikd_rewordUse").val("N").trigger("change");
	$("#jisikd_infosCommTtl").val("");
	//DEXT5.setHtmlValue("", 'taCommCntn');
	taCommCntn.SetEditorContent("");
	$("#jisikd_infosRespCntn").val("");
	$("#jisikd_MnnstDept").val("");
	$("#jisikd_Charger").html("");
	$("#jisikd_orgUser").html("");
	$("#jisikd_hisFileInfos").empty();

	$("#jisikd_hisFileInfos").empty().append(hisFileForm);
	$("#jisikd_tblChargerProcesstList").trigger("reloadGrid"); //hhs 20.04.01 저장 후 리로드
}

//저장 버튼 클릭 이벤트
function ChargerBtnInsert_clickEvent() {
	var rMsg = DivChargerValidatorRe();
	var check = null;

	if (clickProcessStats_Se == "030100" && cdb_req_gb_cd == "010100") {
		$.ajax({
			type : "post",
			dataType : "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/csw.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l", "b20wMTAuY2l2aWxjaGVja0NvbnRlbnQ=", {
				"tbbs_id" : hisTbbs_id2
			}),
			success : function(data) {
				check = data.TTL == null ? "err" : data.TTL;
			},
			error : function(data, status, err) {
				check = "err";
				//networkErrorHandler(data, status, err);
			}
		});
	}

	if (check == "1") {
		alert("신규DB를 등록해주세요.");
		return;
	}

	if (rMsg != "") {
		alert(rMsg);
		return;
	}

	if (check == "err") {
		return;
	}

	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/csw.do",
		data : "pJson=" + setJsonStrChargerInsert(),
		success : function(data) {
			submitRock2();
			alert("저장되었습니다.");
			$("#jisikd_tblChargerProcesstList").trigger("reloadGrid");
		},
		error : function(data, status, err) {
			// networkErrorHandler(data, status, err);
		}
	});
}

//오류처리 이벤트
function DivChargerValidatorRe() {
	var rMsg = "";

	if (rock2 == null) {
		rMsg = "상담DB를 선택해주세요.";
		return rMsg;
	} else if (rock2 == true) {
		rMsg = "이미 저장완료 하였습니다.";
		return rMsg;
	}
	//radio check
	if (nowProcessStats_Se == "020200" || nowProcessStats_Se == "030100") {
		rMsg = "완료 또는 반송되었습니다.";
		return rMsg;
	}

	if (!$('input:radio[name=chargerradio]').is(':checked')) {
		rMsg = "처리상태변경을 선택해주세요.";
		return rMsg;
	}

	if ($("#jisikd_chargerReassignment").prop('checked')) { //담당자 재지정

	} else if ($("#jisikd_chargerJobProcess").prop('checked')) { //처리중
		if ($("#jisikd_chargerJobProcessCtns").val() == "" || $("#jisikd_chargerJobProcessCtns").val().length < 2) {
			rMsg = "처리내용을 입력하세요.";
			return rMsg;
		}
	} else if ($("#jisikd_chargerJobCompt").prop('checked')) { //완료
		if ($("#jisikd_chargerJobProcessCtns").val() == "" || $("#jisikd_chargerJobProcessCtns").val().length < 2) {
			rMsg = "처리내용을 입력하세요.";
			return rMsg;
		}
	} else if ($("#jisikd_chargerJobRetrn").prop('checked')) { //반송
		if ($("#jisikd_chargerJobPrvonsh").val() == "" || $("#jisikd_chargerJobPrvonsh").val().length < 2) {
			rMsg = "반송사유를 입력해주세요.";
			return rMsg;
		}
	} else {
		return rMsg;
	}
	return rMsg;
}

function initChargerSelectData() {
	//$("#jisikd_ChargerJobChargerVal").val("");
	$("#jisikd_chargerTblReqid").val("");
	$("#jisikd_sendPopupReq").val("");
	//$("#jisikd_sendPopupIngStat").val("");
	$("#jisikd_sendPopupRequSe").val("");
	$("#jisikd_sendPopupChageRea").val("");
	clickReqId = "";
	clickTbbsId = "";
	cdb_req_gb_cd = "";
}

//init radio
function initradio2() {
	$("input:radio[name=Vchargerradio]").attr("disabled", true);
	$("input:radio[name=chargerradio]").attr("disabled", true);
	$("#jisikd_chargerJobBtnDbRegist").hide();
	$("#jisikd_chargerJobBtnDbNew").show();
	$("#jisikd_chargerJobBtnRequstHis").hide();
}

function initChargerDate() {
	datePicker("#jisikd_chargerSrchSelFrDate");
	datePicker("#jisikd_chargerSrchSelToDate");
	$("#jisikd_chargerSrchSelFrDate").val(getDate());
	$("#jisikd_chargerSrchSelToDate").val(getDate());
}

function reqPopupNew(regist) {
	opener.reqPopup("1710", "885", "/web/civilservice/cswDbManage_processRegist.do?ap=y&regist=" + regist + "&reqid=" + clickReqId + "&tbbsid=" + clickTbbsId + "&reqcd=" + cdb_req_gb_cd, "상담DB관리");
}

function initComment(){
	$("#jisikd_infosCounselKnd1").val("all").trigger("change");
	$("#jisikd_progKndCd").val("all").trigger("change");
	$("#jisikd_infosCommNew").val("all").trigger("change");
	$("#jisikd_infosGbKnd").val("all").trigger("change");
	$("#jisikd_rewordUse").val("N").trigger("change");
	$("#jisikd_infosCommTtl").val("");
//	DEXT5.setHtmlValue("", 'taCommCntn');
	taCommCntn.SetEditorContent("")
	$("#jisikd_infosRespCntn").val("");
	$("#jisikd_MnnstDept").val("");
	$("#jisikd_Charger").html("");
	$("#jisikd_orgUser").html("");
	$("#jisikd_hisFileInfos").empty();

	$("#jisikd_hisFileInfos").empty().append(hisFileForm);
}

//수정요청 상세 보기
function showCommentDetail(commId) {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/myinfo/selectComment.do",
		data : "pJson=" + getJsonStrSelectComment(commId),
		success : function(data) {
			initComment();

			$("#jisikd_infosCounselKnd1").val(data.INTV_LG_CD).trigger("change");
			$("#jisikd_infosCounselKnd2").val(data.INTV_MD_CD).trigger("change");
			$("#jisikd_infosCounselKnd3").val(data.INTV_SM_CD);

			$("#jisikd_rewordUse").val(data.USE_YN);
			$("#jisikd_progKndCd").val(data.PROG_KND_CD);
			$("#jisikd_infosCommNew").val(data.NEW_YN);
			$("#jisikd_infosGbKnd").val(data.CDB_GB_CD);
			$("#jisikd_infosCommTtl").val(data.COMM_TTL);
//			DEXT5.setHtmlValue(data.COMM_CNTN == null ? "" : data.COMM_CNTN, 'taCommCntn');
			taCommCntn.SetEditorContent(data.COMM_CNTN == null ? "" : data.COMM_CNTN)
			$("#jisikd_infosRespCntn").val(data.ACT_CONT);
			$("#jisikd_MnnstDept, #jisikd_ChargerOrgFulNm").val(data.DEPT_ID_NM);
			$("#jisikd_Charger").html(data.ORG_USR_ID_NM);
			//$("#jisikd_Charger").html(data.AFFS_USR_NM);
			//$("#jisikd_orgUser").html(data.ORG_USR_ID_NM);
			
			$("#jisikd_CCAffairNm").val(data.AFFS_USR_NM);
			$("#jisikd_CCAffairId").val(data.AFFS_ORG_USR_ID);
			$("#jisikd_CCAffairMobile").val(data.AFFS_MOBILE);
			$("#jisikd_OrgMobile").val(data.ORG_MOBILE);
			$("#jisikd_ChargerDeptId").val(data.ORG_ID);
			//$("#jisikd_MnnstDept, #jisikd_ChargerOrgFulNm").val(objInfo.DEPT_NM);
			if (data.ORG_USR_ID != null) {
				$("#jisikd_ChargerUsrId, #jisikd_ChargerOrgUsrId").val(data.ORG_USR_ID);
				$("#jisikd_CCAffair").val("N");
			} else {
				$("#jisikd_ChargerUsrId, #jisikd_ChargerOrgUsrId").val(data.AFFS_ORG_USR_ID);
				$("#jisikd_CCAffair").val("Y");
			}
			$("#jisikd_hisFileInfos").css("display", "block");

			showAttachHisFiles(data.COMM_ID, data.PROG_KND_CD);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//파라미터셋팅 첨부파일
function getJsonHisFileList(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om015",
			"tbl_pk" : tbbsId,
			"orderby" : "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일삭제
function getJsonDeleteHisFile(fileId) {
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wMTkuZGVsZXRl",
		"map" : {
			"key" : "value",
			"fl_id" : fileId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//첨부파일 박스추가- .JSP 
function addHisFileBox() {
	if (hisFileBox_idx >= 2) {
		alert("첨부파일은 최대 3개까지 가능합니다.");
	} else {
		var html = $("#jisikd_hisfileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++hisFileBox_idx);
		$("#jisikd_hisFileInfos").append(html);
	}
}

//첨부파일박스삭제- .JSP
function removeHisFileBox(i) {
	var el = $("#jisikd_writeForm input[name=record_" + i + "]");
	el.parent().parent().remove();
	hisFileBox_idx--;

	if (hisFileBox_idx > 2) {
		$("#jisikd_hisFileInfos tr:last-child").css("display", "none");
	} else {
		$("#jisikd_hisFileInfos").css("display", "block");
	}
}

//첨부된 파일 삭제
function deleteHisFile(fileId) {
	if (confirm("첨부된 파일을 삭제하시겠습니까?")) {
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/management/deleteFile.do",
			data : "pJson=" + getJsonDeleteHisFile(fileId),
			success : function(data) {
				//파일폼 삭제
				var el = $("#jisikd_writeForm input[name=record_" + fileId + "]");
				el.parent().parent().remove();

				if (--hisFileBox_idx < 3) {
					$("#HISMANUAL").prop("disabled", false);
					$("#jisikd_rmHisFilebox").prop("disabled", false);
				}

				if (hisFileBox_idx < 3) {
					$("#jisikd_hisFileInfos tr:last-child").css("display", "table-cell");
				} else {
					$("#jisikd_hisFileInfos tr:last-child").css("display", "none");
				}

			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//첨부파일 보기
function showAttachHisFiles(tbbsId, deletebtn) {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/board/fileList.do",
		data : "pJson=" + getJsonHisFileList(tbbsId),
		success : function(data) {
			var tr = "";
			hisFileBox_idx = 0;
			for ( var i in data) {
				var url = getContextPath() + "/file/jisikManageFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

				tr += "<tr>";
				/*
				 * tr += "<td colspan='3'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />"; tr += "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span></td>"; tr += "<td><span>" +data[i].FL_KB_SZ + "</span></td>"; tr += "<td><a href='javascript:deleteHisFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
				 */
				tr += "<td colspan='3'>" + "<input type='hidden' name='record_" + data[i].FL_ID + "' value='' />" + "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span>" + "<span>" + data[i].FL_KB_SZ + "</span>";
				"<a class='deletebtn' href='javascript:deleteHisFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[delete]</strong></a>"
				if (deletebtn == "010100") {
					tr += "<a class='deletebtn' href='javascript:deleteHisFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[삭제]</strong></a></td>"
				} else {
					tr += "</td>";
				}
				tr += "</tr>";

				hisFileBox_idx++;
			}
			tr += "<tr>" + "<td colspan='4'>" + "<input type='hidden' name='record_XXX' value='' />" + "<input type='file' id='HISMANUAL' name='MANUAL' style='width: 80%;'/>" + "</td>" + "<td>"
					+ "<img src='/resources/images/btn_del.png'  alt='삭제' class='icon_add'  id='rmHisFilebox' style='cursor: pointer;'  />"
					+ "<img src='/resources/images/btn_fileadd.png' onClick='addHisFileBox()' alt='파일폼추가' class='icon_add' style='cursor: pointer;'/>" + "</td>" + "</tr>"

			$("#jisikd_hisFileInfos").empty();
			$("#jisikd_hisFileInfos").prepend(tr);

			if (hisFileBox_idx > 3) {
				$("#HISMANUAL").prop("disabled", true);
				$("#rmHisFilebox").prop("disabled", true);
			} else {
				$("#HISMANUAL").prop("disabled", false);
				$("#rmHisFilebox").prop("disabled", false);
			}

			if (hisFileBox_idx > 2) {
				$("#jisikd_hisFileInfos tr:last-child").css("display", "none");
			} else {
				$("#jisikd_hisFileInfos tr:last-child").css("display", "table-cell");
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}
//첨부파일 다운로드
function getJsonFileDownload(svr, loc) {
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function validatorRe() {
	var rMsg = "";
	if ($("#jisikd_infosGbKnd").val() == "all") {
		return rMsg = "상담DB를 선택해주세요.";
	}
	if ($("#jisikd_progKndCd").val() == "all") {
		return rMsg = "진행상태를 선택해주세요.";
	}
	if ($("#jisikd_infosCommNew").val() == "all") {
		return rMsg = "요청구분을 선택해주세요.";
	}

	if ($("#jisikd_infosCounselKnd1").val() == "all" || $("#jisikd_infosCounselKnd1").val() == null || $("#jisikd_infosCounselKnd2").val() == "all" || $("#jisikd_infosCounselKnd2").val() == null
	// || $("#jisikd_optCounselKnd3_sc").val() == "all" || $("#jisikd_optCounselKnd3_sc").val() == null || $("#jisikd_optCounselKnd4_sc").val() == "all" || $("#jisikd_optCounselKnd4_sc").val() == null ){
	|| $("#jisikd_infosCounselKnd3").val() == "all" || $("#jisikd_infosCounselKnd3").val() == null) {
		rMsg += "\n상담유형을 선택해주세요.";
		return rMsg;
	}

	if ($("#jisikd_infosCommTtl").val() == "") {
		rMsg += "제목을 입력해 주세요.";
		return rMsg;
	}
	/*
	 * if($("#jisikd_optCounselKnd1_sc").val() == "all" || $("#jisikd_optCounselKnd1_sc").val() == null || $("#jisikd_optCounselKnd2_sc").val() == "all" || $("#jisikd_optCounselKnd2_sc").val() == null // || $("#jisikd_optCounselKnd3_sc").val() == "all" || $("#jisikd_optCounselKnd3_sc").val() == null || $("#jisikd_optCounselKnd4_sc").val() == "all" || $("#jisikd_optCounselKnd4_sc").val() == null ){ || $("#jisikd_optCounselKnd3_sc").val() == "all" || $("#jisikd_optCounselKnd3_sc").val() == null ){ rMsg += "\n상담유형을 선택해주세요."; return rMsg;}
	 */
	if ($("#jisikd_Charger").text() == '' || $("#jisikd_Charger").text() == null || $("#jisikd_Charger").text() == undefined || $("#jisikd_Charger").text() == 0 || $("#jisikd_Charger").text() == NaN) {
		rMsg += "\nDB 서무를 지정해주세요.";
		return rMsg;
	}

//	var taCommCntn = DEXT5.getBodyTextValue("taCommCntn");
	var taCommCntn1 = taCommCntn.GetEditorContent();

	if (taCommCntn1 == "") {
		rMsg += "\n내용이 없습니다.";
		return rMsg;
	}

	//file upload capacity check
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#jisikd_writeForm input[name=MANUAL]");
	for (var i = 0; i < formName.length; i++) {
		if (formName[i].value != "") {
			var nRtn = fileCheck(formName[i], nLimitSize);
			if (nRtn > nLimitSize) {
				rMsg += "\n\n(" + nRtn + "MB) 첨부파일 사이즈는 " + nLimitSize + "MB 이내로 등록 가능합니다.";
			}
			//file extension check
			if (fileExtnsCheck(formName[i]) == false)
				rMsg += "\n\n[" + (i + 1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";
		}
	}
	return rMsg;
}
//insert. db request
function btnUpdateCommentClickEvent() {
	var rMsg = validatorRe();
	if (rMsg != "") {
		alert(rMsg);
		return;
	}/*
		 * if($("#jisikd_counselDbNewRegist").prop("checked")){ $.ajax({ type : "post", dataType : "json", async : false, url : getContextPath() + "/ajax/civilservice/csw.do", data : "pJson=" + getNextValue2(), success : function(data) { jisikTbbsId = data.TBBS_ID+""; gAppendHidden("writeForm", "pJson", getJsonStrInsertManual(data.TBBS_ID)); gSubmitPost("writeForm", true); }, error : function(data, status, err) { jisikTbbsId=null; //networkErrorHandler(data, status, err); } }); }else{ jisikTbbsId==true; }
		 * 
		 * if(jisikTbbsId==null){ alert("요청할수 없습니다."); return; }
		 *//*
		 * $.ajax({ type : "post", dataType : "json", async : false, url : getContextPath() + "/ajax/management/insertManual.do", data : "pJson=" + getNextValue(), success : function(data){ gAppendHidden("jisikd_writeForm", "pJson", getJsonStrInsertComment(data.REQ_ID)); //req id를 받고 gSubmitPost("jisikd_writeForm", true); //보내버려 btnInitClickEvent(); $("#jisikd_tfLgMdSmSearch_01").prop("disabled",false); // $("#jisikd_taCommTtl, #jisikd_optGbKnd_sc, #jisikd_optCounselKnd1_sc, #jisikd_optCounselKnd2_sc, #jisikd_optCounselKnd3_sc, #jisikd_optCounselKnd4_sc").prop("disabled", false); $("#jisikd_taCommTtl, #jisikd_optGbKnd_sc, #jisikd_optCounselKnd1_sc, #jisikd_optCounselKnd2_sc, #jisikd_optCounselKnd3_sc").prop("disabled", false); }, error : function(data, status, err) { networkErrorHandler(data, status, err); } });
		 */
	gAppendHidden("jisikd_writeForm", "pJson", getJsonStrUpdateComment(clickReqId, clickTbbsId)); //req id를 받고 
	gSubmitPost("jisikd_writeForm", true);
	
	// hhs 20.06.12 insert충돌/쿼리분리
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonStrCommentHistory(),
		success : function(data) {
			
			if(clickTbbsId != null || clickTbbsId != ''){
				// useYn : N
				$.ajax({
					type : "post",
					dataType : "json",
					async : false,
					url : getContextPath() + "/ajax/civilservice/csw.do",
					data : "pJson=" + getJsonStrUpdateCommentUseN(),
					success : function(data) {
					},
					error : function(data, status, err) {
						networkErrorHandler(data, status, err);
					}
				});
			}
			
		},
		error : function(data, status, err) {
			alert("=== 히스토리저장 실패");
//			networkErrorHandler(data, status, err);
		}
	});
}

$(document).ready(function() {

	hisFileForm = $("#jisikd_hisFileInfos tr").parent().html();

	initChargerSelectData();
	initradio2();
	initChargerDate();
	$("#jisikd_chargerJobBtnDbNew").hide();
	$("#jisikd_chargerJobBtnDbRegist").hide();

	$("#jisikd_tblChargerProcesstList").jqGrid({
		url : getContextPath() + "/jqgrid/myinfo/jisikDbMange.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrChargerProcess()
		},
		jsonReader : {
			repeatitems : false
		},
		colNames : [ "번호", "게시물ID", "부서ID", "기관사용자ID", "승인구분", "요청구분", "DB구분", "PROG_KND_CD", "요청일", "요청구분", "상담유형", "제목", "처리일자", "서무", "담당자", "요청자", "처리상태" ],
		colModel : [ {
			name : "COMM_ID",
			index : "COMM_ID",
			hidden : true
		}, {
			name : "TBBS_ID",
			index : "TBBS_ID",
			hidden : true
		}, {
			name : "ORG_ID",
			index : "ORG_ID",
			hidden : true
		}, {
			name : "ORG_USR_ID",
			index : "ORG_USR_ID",
			hidden : true
		}, {
			name : "USE_YN",
			index : "USE_YN",
			hidden : true
		}, {
			name : "CDB_GB_CD",
			index : "CDB_GB_CD",
			hidden : true
		}, {
			name : "CDB_REQ_GB_CD",
			index : "CDB_REQ_GB_CD",
			hidden : true
		}, {
			name : "PROG_KND_CD",
			index : "PROG_KND_CD",
			hidden : true
		}, {
			name : "CRT_DTTM",
			index : "CRT_DTTM",
			align : "center",
			width : 50
		},
		{
			name : "COMM_NEW",
			index : "COMM_NEW",
			align : "center",
			width : 30
		}, //요청구분								
		{
			name : "INTV_NM",
			index : "INTV_NM",
			align : "left",
			width : 120
		}, //상담유형
		{
			name : "COMM_TTL",
			index : "COMM_TTL",
			align : "left",
			width : 80
		}, {
			name : "ACT_DTTM",
			index : "ACT_DTTM",
			align : "center",
			width : 50
		}, //처리일자
		{
			name : "AFFS_USR_NM",
			index : "AFFS_USR_NM",
			align : "center",
			width : 30,
			hidden : true
		}, //서무   
		{
			name : "ORG_USR_ID_NM",
			index : "ORG_USR_ID_NM",
			align : "center",
			width : 30
		}, //담당자   
		{
			name : "USR_NM",
			index : "USR_NM",
			align : "center",
			width : 30
		}, //요청자  
		{
			name : "PROG_KND_NM",
			index : "PROG_KND_NM",
			align : "center",
			width : 35,
			cellattr : function(rowId, tv, rowObject, cm, rdata) {
				if (rowObject.PROG_KND_NM == "접수") {
					return 'style="color:blue;"'
				} else if (rowObject.PROG_KND_NM == "반송") {
					return 'style="color:red;"'
				} else {
					return 'style="color:black;"'
				}
			}
		}, //처리상태 코드추가	
		],
		sortname : "crt_dttm desc, mod_dttm",
		sortorder : "desc",
		gridview : true,
		hidegrid : false,
		shrinkToFit : true,
		loadonce : false,
		scrollOffset : 0,
		height : "195",
		width : "100%",
		rowNum : 7,
		rowList : [ 5, 20, 30, 50, 100 ],
		autowidth : true,
		pager : "#jisikd_pgChargerProcesstList",
		pgbuttons : true,
		rownumbers : true,
		rownumWidth : 30,
		multiselect : false,
		emptyrecords : "",
		caption : "",
		loadui : "enable",
		viewrecords : true,
		onSelectRow : function(rowid) {
			$("#jisikd_chargerJobBtnRequstHis").show();
			var row = $("#jisikd_tblChargerProcesstList").getRowData(rowid);
			//getJsonStrChargerRcepDetail(row.COMM_ID, row.ORG_ID, row.ORG_USR_ID);
			showCommentDetail(row.COMM_ID);
			if(row.ORG_USR_ID_NM==""){
			$('#jisikd_progKndCd option[value="010200"]').prop("disabled",true);
			}else{			
			$('#jisikd_progKndCd option[value="010200"]').prop("disabled",false);	
			}
			//신규등록용

			clickReqId = row.COMM_ID;
			clickTbbsId = row.TBBS_ID;
		},
		 loadComplete : function(){
				$('#jisikd_progKndCd option[value="010400"]').remove();
		}
	}).jqGrid("navGrid", "#jisikd_pgChargerProcesstList", {
		edit : false,
		add : false,
		del : false,
		search : false
	});
	//add event to this
	$("#jisikd_chargerSrchSearch").on("click", chargerSrchSearch_clickEvent);
	$("#jisikd_chargerSrchInit").on("click", chargerSrchInit_clickEvent);
	$("input:radio[name=chargerradio]").on("click", radioBtn_clickEvent2);
	//$("#jisikd_btnInsert").on("click", btnUpdateCommentClickEvent);
	$("#jisikd_btnInsert").on("click", btnModifyCommentClickEvent);
	$("#jisikd_chargerJobBtnRequstHis").click(function(e) {
		requstHis_popupEvent(clickTbbsId);
	});
	/*
	 * //신규등록 $("#jisikd_chargerJobBtnDbNewSr").on("click", function(e) { reqPopupNew("y"); }); //요청DB신규수정 $("#jisikd_chargerJobBtnDbNew").on("click", function(e) { reqPopupNew("y"); }); $("#jisikd_chargerJobBtnDbRegist").on("click", function(e) { reqPopupNew("n"); });
	 */
	//$("#jisikd_optCounselKnd1_srch, #jisikd_optCounselKnd2_srch, #jisikd_optCounselKnd3_srch").empty();
	$("#jisikd_infosCounselKnd1").on("change", function() {
		setObjectSelectBoxWithCode2("jisikd_infosCounselKnd2", "전체", "2", g_ListPopup, $("#jisikd_infosCounselKnd1").val(), "", "CHANGE");
	});
	$("#jisikd_infosCounselKnd2").on("change", function() {
		setObjectSelectBoxWithCode2("jisikd_infosCounselKnd3", "전체", "3", g_ListPopup, $("#jisikd_infosCounselKnd2").val(), "", "CHANGE");
	});
	$("#jisikd_cntrSearch").on("click", function(e) {
		window.sessionStorage.setItem("fromFlag", "fromJisikDbManage");
		window.sessionStorage.setItem("corpOpenType", "adminAgency");
		openMenuPopup("CM0311");
	});
	setObjectSelectBoxWithCode2("jisikd_infosCounselKnd1", "전체", "1", g_ListPopup, "00000000", "all", "CHANGE");
	setObjSelectBoxWithCode("jisikd_chargerSrchProgrsSttus", "전체", "", g_ListPopup, "90301", "");
	setObjSelectBoxWithCode("jisikd_progKndCd", "", "", g_ListPopup, "90301", "");
	setObjSelectBoxWithCode("jisikd_infosCommNew", "", "", g_ListPopup, "90302", "");
	setObjSelectBoxWithCode("jisikd_chargerSrchRequstSe", "전체", "", g_ListPopup, "90302", "");
	setObjSelectBoxWithCode("jisikd_chargerSrchDbSe", "전체", "", g_ListPopup, "90303", "");
	setObjSelectBoxWithCode("jisikd_infosGbKnd", "", "", g_ListPopup, "90303", "");
	editerCall();
});

function fnSetOrgJisikDbManageTrans(objInfo) {
	var agencyCategory = objInfo.CATEGORY;
	hisGrfrstNm = objInfo.DEPT_NM + ">" + objInfo.USR_NM;
	if (agencyCategory == "AA") {
		$("#jisikd_ChargerDeptId").val(objInfo.DEPT_CD);
		$("#jisikd_MnnstDept, #jisikd_ChargerOrgFulNm").val(objInfo.DEPT_NM);
		$("#jisikd_ChargerUsrId, #jisikd_ChargerOrgUsrId").val(objInfo.USR_ID);
		$("#jisikd_Charger").html(objInfo.USR_NM);
		$("#jisikd_CCAffair").val(objInfo.CC_AFFAIRS_YN);
		//$("#tfResponTel").val(objInfo.TEL_NO);
	} else if (agencyCategory == "CC") {
		$("#jisikd_ChargerDeptId").val(objInfo.TEAM_CD);
		$("#jisikd_MnnstDept").val(objInfo.TEAM_NM);
		$("#jisikd_ChargerUsrId, #jisikd_ChargerOrgUsrId").val(objInfo.USR_ID);
		$("#jisikd_Charger").html(objInfo.USR_NM);
		//$("#tfResponTel").val(objInfo.TEL_NO);
	} else if (agencyCategory == "EA") {
		$("#jisikd_ChargerDeptId").val("externAgency");
		$("#jisikd_MnnstDept, #jisikd_ChargerOrgFulNm").val(objInfo.TEAM_NM);
		$("#jisikd_ChargerUsrId, #jisikd_ChargerOrgUsrId").val(objInfo.USR_ID);
		$("#jisikd_Charger").html(objInfo.USR_NM);
		//	$("#tfResponTel").val(objInfo.TEL_NO);
	}
}
/*
function reqPopup(width, height, url, title) {
	var width = width;
	var height = height;
	var top = 0;
	var left = Math.ceil((window.screen.width - width) / 2);
	// var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + url;
	var option = "width=" + width + ", height=" + height + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top=" + top + ",left=" + left + "";

	var newWindow = window.open(paramURL, title, option);
	newWindow.focus();
}
*/
function editerCall() {
//	DEXT5.config.Mode = 'edit';
//	DEXT5.config.Height = "100%";
//	DEXT5.config.Width = "100%;";
//	DEXT5.config.zStatusBar = "1";
//	DEXT5.config.zTopMenu = "1";
//	DEXT5.config.zToolBar = "1";
//	DEXT5.config.SkinName = "gray";
//	DEXT5.config.EditorHolder = "jisikd_taCommCntn";
//	new Dext5editor("taCommCntn");
	taCommCntn = new KuKudocsEditor(
            /* ID 입력부 */
            'jisikd_taCommCntn',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '99%',

                //Editor 세로크기
                height: '150px',
                
                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
                
                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'editGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'
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
            });
	
}