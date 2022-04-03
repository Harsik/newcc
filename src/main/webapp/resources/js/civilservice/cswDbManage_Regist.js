var inputFile = [];
var fileBox_idx = 0;
var fileForm = "";
var g_rspnUsrId = "";
var checkInnerPopup = false;
var sendingOuCode = checkInnerPopup ? window.sessionStorage.getItem("CNTR_CD") : opener.sendingOuCode;
var sendingUid = checkInnerPopup ? window.sessionStorage.getItem("USR_ID") : opener.sendingUid;
var sendingUName = opener.sendingUName;
var sendingOu = opener.sendingOu;
var sendingOuName = opener.sendingOuName;
var sendingUTelNum = opener.sendingUTelNum;

//hhs 2020.03.12
var usrId = window.sessionStorage.getItem("USR_ID");

//요청DB setting

var clickReqId = checkInnerPopup ? reqid : opener.clickReqId;
var clickTbbsId = checkInnerPopup ? tbbsid : opener.clickTbbsId;
var cdb_req_gb_cd = checkInnerPopup ? reqcd : opener.cdb_req_gb_cd;
var g_confer_dept = checkInnerPopup ? reqcd : opener.gConferDept;

var inte = opener.inte;
var intl = opener.intl;
var intm = opener.intm;
var ints = opener.ints;
var inigd = opener.inigd;
var inittl = opener.inittl;
var checkFileBox = false;
var itmodi = false;
var wrkId = "";
var flids = [];
var temtbbs = "1"; //템플릿으로 사용할 상담DB tbbsid를 입력해주세요
var tbbsCont = null;
var fileCount = 0;

//insertComments 
function getJsonStrInsertComment(req_id) {
    var flag = "";
    /*
     * //신규DB요청시 새로운 상담DB를 미리 생성 if($("#csdbrg_counselDbNewRegist").prop('checked')){ flag="010100"; }else if($("#csdbrg_counselDbModifyRegist").prop('checked')){ flag="020100";} else if($("#csdbrg_counselDbDelete").prop('checked')){ flag="030100";}
     */

    /*
     * if(news){ flag="010100"; }else{
     */
    //flag="020100";
    //}
    flag = "010100";
    var ccAffir = $("#csdbrg_chkNotUseYN").val() != null ? $("#csdbrg_chkNotUseYN").val() : "N";
    var actstcd = "020100";
    var loParam = {
        "qt": "aW5zZXJ0",
        "mi": "b20wMTUuamlzaWtSZXdvcmRJbnNlcnQ=",
        "map": {
            "key": "value",
            "tbl_nm": "om015",
            "tbl_pk": req_id,
            "req_id": req_id, //sequence							
            "tbbs_id": tbbsid,
            "org_id": sendingOuCode,
            "login_usr_id": sendingUid,
            "login_usr_nm": sendingUName,
            "affs_org_usr_id": sendingUid, //기관사용자ID
            "cdb_gb_cd": "040101", //$("#csdbrg_optGbKnd").val(),						//DB구분
            "intv_lg_cd": $("#csdbrg_optCounselKnd1").val(),
            "intv_md_cd": $("#csdbrg_optCounselKnd2").val(),
            "intv_sm_cd": $("#csdbrg_optCounselKnd3").val(),
            
            // 21.02.25 김경진 주무관 요청으로 공무원 작성시 요청내용 공백으로 들어가도록 변경 
			"comm_cntn" : "",
//            "comm_cntn": $("#csdbrg_tfTbbsTtl").val(), //DEXT5.getBodyValue("commCntn"),					//요청내용
            "comm_ttl": $("#csdbrg_tfTbbsTtl").val(), //제목부분
            "new_yn": flag, //신규여부 
            "cdb_act_st_cd": actstcd, //신규.
            "ccaffir": "N",

        }
    };

    

    return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrInsertCommentHis(){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wMTUuamlzaWtSZXdvcmRJbnNlcnRIaXM=",
			"map" : {
				"key" : "value",
				"tbbs_id": tbbsid,
				"login_usr_id": sendingUid,
				"usr_id2": sendingUid,
		        "org_id2": sendingOuCode,
		        "comm_cntn": $("#csdbrg_tfTbbsTtl").val(), //DEXT5.getBodyValue("commCntn"),					//요청내용
	            "comm_ttl": $("#csdbrg_tfTbbsTtl").val(), //제목부분
	            "cdb_gb_cd": "040101", //$("#csdbrg_optGbKnd").val(),			//DB구분
	            "intv_lg_cd": $("#csdbrg_optCounselKnd1").val(),
	            "intv_md_cd": $("#csdbrg_optCounselKnd2").val(),
	            "intv_sm_cd": $("#csdbrg_optCounselKnd3").val(),
	            "org_usr_id2": sendingUid, //기관사용자id
		        "org_ful_nm2": sendingOuName, //기관사용자nm
		        "new_yn": "010100", //신규여부 
	            "cdb_act_st_cd": "020100", //신규.
		        "rtn_rsn2": sendingUName + "님이 신규생성하였습니다.",
		        "message": "요청되었습니다."
			}
		};

    /*
     * //신규 요청일경우 if(flag=="010100"){ loParam['map']['tbbs_id']=jisikTbbsId; }else if(flag=="010100" && jisikTbbsId==null){ loParam['map']['tbbs_id']=""; }
     */
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//요청DB 이력등록
function getJsonStrInsertDBHistory() {
    if (news) {
        var wrk_cl = "상담DB신규등록"
    } else {
        var wrk_cl = "상담DB수정등록"
    }
    var loParam = {
        "qt": "aW5zZXJ0",
        "mi": "b2gwMTQuaW5zZXJ0SmlzaWtIaXN0b3J5",
        "map": {
            "tbl_pk": tbbsid,
            "tbl_nm": "oh013",
            "req_id": reqid,
            "tbl_pk2": reqid,
            "tbbs_cntn": tbbsCont.GetEditorContent(), //DEXT5.getBodyValue("tbbsCont"),
            "cdb_gb_cd": "040101", //$("#csdbrg_optGbKnd").val(),	//상담DB
            "tbbs_ttl": $("#csdbrg_tfTbbsTtl").val(),
            "intv_lg_cd": $("#csdbrg_optCounselKnd1").val(),
            "intv_md_cd": $("#csdbrg_optCounselKnd2").val(),
            "intv_sm_cd": $("#csdbrg_optCounselKnd3").val(),
            "cntr_nm": $("#csdbrg_tfCntrNm").html() != "" ? $("#csdbrg_tfCntrNm").html() : sendingOu,
            "rspn_prsn": $("#csdbrg_txtRespNm").val() != "" ? $("#csdbrg_txtRespNm").val() : sendingUName,
            "rspn_tel_no": $("#csdbrg_txtResponTel").val() != "" ? $("#csdbrg_txtResponTel").val() : sendingUTelNum,
            "use_yn": $("#csdbrg_optUseYN").val(),
            "sendingUid": sendingUid,
            "wrk_cl": wrk_cl,
            "cc_appr_yn": "N"
        }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}
//요청DB 이력등록
function getJsonStrUpdateDBHistory() {
    if (news) {
        var wrk_cl = "상담DB신규등록"
    } else {
        var wrk_cl = "상담DB수정등록"
    }
    var loParam = {
        "qt": "aW5zZXJ0",
        "mi": "b2gwMTQudXBkYXRlSmlzaWtIaXN0b3J5",
        "map": {
            "tbl_pk": tbbsid,
            "tbl_nm": "oh013",
            "req_id": reqid,
            "tbl_pk2": reqid,
            "tbbs_cntn": tbbsCont.GetEditorContent(), //DEXT5.getBodyValue("tbbsCont"),
            "cdb_gb_cd": "040101", //$("#csdbrg_optGbKnd").val(),	//상담DB
            "tbbs_ttl": $("#csdbrg_tfTbbsTtl").val(),
            "intv_lg_cd": $("#csdbrg_optCounselKnd1").val(),
            "intv_md_cd": $("#csdbrg_optCounselKnd2").val(),
            "intv_sm_cd": $("#csdbrg_optCounselKnd3").val(),
            "cntr_nm": $("#csdbrg_tfCntrNm").html() != "" ? $("#csdbrg_tfCntrNm").html() : sendingOu,
            "rspn_prsn": $("#csdbrg_txtRespNm").val() != "" ? $("#csdbrg_txtRespNm").val() : sendingUName,
            "rspn_tel_no": $("#csdbrg_txtResponTel").val() != "" ? $("#csdbrg_txtResponTel").val() : sendingUTelNum,
            "use_yn": $("#csdbrg_optUseYN").val(),
            //hhs 2020.03.12
//            "sendingUid": sendingUid
            "sendingUid": sendingUid != ""? sendingUid : usrId,
            "wrk_cl": wrk_cl,
            "cc_appr_yn": "N"
        }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrShowDetailManual(tbbsId) {
    if (wrkId) {
        var loParam = {
            "qt": "c2VsZWN0T25l",
            "mi": "b2gwMTQuc2VsZWN0SmlzaWtIaXN0b3J5",
            "map": {
                "reqid": reqid
            }
        };
    } else {
        var loParam = {
            "qt": "c2VsZWN0T25l",
            "mi": "b20wMTAuc2VsZWN0SmlzaWs=",
            "map": {
                "tbbs_id": tbbsId
            }
        };
    }

    return encodeURIComponent(JSON.stringify(loParam));
}
//매뉴얼 상세보기
function showDetailManual(tbbsId) {
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: getContextPath() + "/ajax/civilservice/csw.do",
        data: "pJson=" + getJsonStrShowDetailManual(tbbsId),
        success: function (data) {
            if (data != null) {
                if (data.TBBS_ID != temtbbs) {
                    // setSelectBoxWithCodeSync2(data.INTV_EX_CD, data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);
                    setSelectBoxWithCodeSync2(data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);
                    
                    //hhs 20.03.18
//                    $("#csdbrg_optGbKnd").val(data.CDB_GB_CD);
                    //if($("#csdbrg_regist").val()!="y"){
                    $("#csdbrg_chkNotUseYN").val(data.CC_APPR_YN);
                    //$("#csdbrg_chkNotUseYN").val(data.ARR_YN);
                    $("#csdbrg_tfTbbsId").val(data.TBBS_ID);
//                    $("#csdbrg_optGbKnd").val(data.CDB_GB_CD);
                    $("#csdbrg_tfTbbsTtl").val(data.TBBS_TTL);
                    $("#csdbrg_tfCntrNm").html(data.CNTR_NM);
                    $("#csdbrg_txtRespNm").val(data.RSPN_PRSN);
                    $("#csdbrg_txtResponTel").val(data.RESPON_TEL);
                    $("#csdbrg_optUseYN").val(data.USE_YN);
                    if ($("#csdbrg_optUseYN").val() == "N") {
                        $("#csdbrg_tfNtuseDesc").prop("disabled", false);
                    }
                    $("#csdbrg_tfNtuseDesc").val(data.NTUSE_DESC);
                    g_rspnUsrId = data.RESPON_PRSN;

                    //	    DEXT5.setHtmlValue(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
//                    DEXT5.setHtmlContentsEw(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
                  tbbsCont.SetEditorContent(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN);
                    var crt = data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT + " / " + (data.CRT_USR_NM == null ? "" : data.CRT_USR_DEPT + " " + data.CRT_USR_NM);
                    var mod = data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT + " / " + (data.MOD_USR_NM == null ? "" : data.MOD_USR_DEPT + " " + data.MOD_USR_NM);
                    $("#csdbrg_lbCrtInfo").html(crt);
                    $("#csdbrg_lbModInfo").html(mod);
                } else {
//                    DEXT5.setHtmlContentsEw(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
                    tbbsCont.SetEditorContent(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN);
                }
            }
        },
        error: function (data, status, err) {
            networkErrorHandler(data, status, err);
        }
    });
}


//hhs 2020.03.18
//변경사항 입력 팝업
function popupEvent(clickTbbsId,clickReqId,news){
	var width = 500;
	var height = 180;
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + "/web/civilservice/cswDbManage_RegistPopup.do?tbbsId="+clickTbbsId+"&reqId="+clickReqId+"&news="+news;
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
		+ top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "처리사항", option);
	newWindow.focus();	
	
}

//초기화버튼 클릭이벤트
function btnInitClickEvent() {
    initSelectData();
    initContent();
    initDate();
    undisabled();
    checkFileBox = true;

    //요청없이 바로 등록 수정할경우(callcenter 신규,수정권한을 주기위해)
    if (news) {
        if (reqid && tbbsid) {
            showDetailManual(tbbsid);
            showAttachFiless(tbbsid);
        } else {
            showDetailManual(temtbbs);
        }
    } else {
        showDetailManual(tbbsid);
        showAttachFiless(tbbsid);
    }
}

//저장이 완료되면.
function initSaveAfterEvent(tbbs_id) {
//    opener.$("#csdbpr_chargerJobProcessCtns").val($("#csdbrg_chargerJobProcessCtns").val());
//    opener.$("#csdbpr_chargerJobCompt").prop('checked',true);
    opener.ChargerBtnInsert_clickEvent(); 
//    initContent();
//    disabled();
}

function optCounselKnd1ChangeEvent() {
    setObjectSelectBoxWithCode("csdbrg_optCounselKnd2", "전체", "2", "CHILD", $("#csdbrg_optCounselKnd1").val(), "", "CHANGE");
}
// function optCounselKnd2ChangeEvent() {
// 	setObjectSelectBoxWithCode("optCounselKnd3", "전체", "3", "CHILD", $("#csdbrg_optCounselKnd2").val(), "", "CHANGE");
// }
function optCounselKnd2ChangeEvent() {
    setObjectSelectBoxWithCode("csdbrg_optCounselKnd3", "전체", "3", "CHILD", $("#csdbrg_optCounselKnd2").val(), "", "");
}
// function optCounselKnd3ChangeEvent() {
// 	setObjectSelectBoxWithCode("optCounselKnd4", "전체", "4", "CHILD", $("#csdbrg_optCounselKnd3").val(), "", "");
// }

// function setSelectBoxWithCodeSync2(code1, code2, code3, code4) {
//     $("#csdbrg_optCounselKnd1").val(code1).trigger("change");
//     $("#csdbrg_optCounselKnd2").val(code2).trigger("change");
//     $("#csdbrg_optCounselKnd3").val(code3).trigger("change");
//     $("#csdbrg_optCounselKnd4").val(code4);
// }
function setSelectBoxWithCodeSync2(code1, code2, code3) {
    $("#csdbrg_optCounselKnd1").val(code1).trigger("change");
    $("#csdbrg_optCounselKnd2").val(code2).trigger("change");
    $("#csdbrg_optCounselKnd3").val(code3);
}

function getJsonStrDuplifile(i) {
    var loParam = {
        "qt": "aW5zZXJ0",
        "mi": "b20wMTkuZHVwbGljYXRl",
        "map": {
            "tbl_nm": "oh013",
            "tbl_pk": tbbsid,
            "tbl_pk2": reqid,
            "fl_id": flids[i].FL_ID,
            "loc_fl_nm" : flids[i].LOC_FL_NM,
            "svr_fl_nm" : flids[i].SVR_FL_NM,
            "svr_sv_pth" : flids[i].SVR_SV_PTH,
            "fl_sz" : flids[i].FL_KB_SZ.replace(/KB/gi, ""),
            "sendingUid": sendingUid,
            "check": "Y"
        }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

//사용여부 선택이벤트
function optUseYNChangeEvent() {
    if ($("#csdbrg_optUseYN").val() == "N") {
        $("#csdbrg_tfNtuseDesc").prop("disabled", false);
    } else {
        if (confirm("사용으로 설정하시겠습니까?")) {
            $("#csdbrg_tfNtuseDesc").val("").prop("disabled", true);
        } else {
            $("#csdbrg_optUseYN").val("N");
        }
    }
}

//insert clickevent
function btnInsertClickEvent() {
	// 21.03.17 김경진주무관 요청으로 등록할때 팝업창 제거
//    if (!confirm("등록하시겠습니까?"))
//        return;
    var rMsg = validator();
    if (rMsg != "") {
        alert(rMsg);
        return;
    }
    
    // 수정모드 일때
    if (itmodi) {
        gAppendHidden("csdbrg_writeForm", "pJson", getJsonStrUpdateDBHistory());
        gSubmitPost("csdbrg_writeForm", true);
        // file 시작
        if(fileCount>0){
			$.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/civilservice/csw.do",
				data : "pJson=" + getJsonStrDeletefile(),
				success : function(data) {	
					for(var i in flids){
					   if(flids[i]!=""){
						   $.ajax({
								type : "post",
								dataType : "json",
								async : true,
								url : getContextPath() + "/ajax/civilservice/csw.do",
								data : "pJson=" + getJsonStrDuplifile(i),
								success : function(data) {	
								},
								error : function(data, status, err) {
								    networkErrorHandler(data, status, err);
								}
							    });
						   }
					   }
				},
				error : function(data, status, err) {
				    networkErrorHandler(data, status, err);
				}
			});
        }
		//file 끝
        
//        alert('수정되었습니다.');
        //hhs 20.03.31 등록요청버튼 클릭시 '처리중'상태로 전환 되며, 수정상태를 입력하는 팝업창이 뜬다
        opener.clickProcessStats_Se="020100"; //처리중
        initSaveAfterEvent();
        popupEvent(clickTbbsId,clickReqId,news).focus;
    } else {
		if (news) {
			// 탭 이동 (나의처리목록)
			opener.$("#csdbmg_CnsltDbProcessManageTabs").tabs({active:"1"});
			if (reqid == "") {
				$.ajax({
					type: "post",
					dataType: "json",
					async: false,
					url: getContextPath() + "/ajax/civilservice/cswnextval.do",
					data: "pJson=" + getJsonStr("c2VsZWN0T25l", "b20wMTUubmV4dHZhbA==", {}),
					success: function (data) {
						reqid = data.REQ_ID;
						
						$.ajax({
							type: "post",
							dataType: "json",
							async: false,
							url: getContextPath() + "/ajax/civilservice/cswnextval.do",
							data: "pJson=" + getJsonStr("c2VsZWN0T25l", "b20wMTAubmV4dHZhbA==", {}),
							success: function (data) {
								tbbsid = data.TBBS_ID;
								
								$.ajax({
									type: "post",
									dataType: "json",
									async: false,
									url: getContextPath() + "/ajax/civilservice/cswnextval.do",
									data: "pJson=" + getJsonStrInsertComment(reqid),
									success: function (data) {
										
										$.ajax({
											type: "post",
											dataType: "json",
											async: false,
											url: getContextPath() + "/ajax/civilservice/cswnextval.do",
											data: "pJson=" + getJsonStrInsertCommentHis(),
											success: function (data) {
												gAppendHidden("csdbrg_writeForm", "pJson", getJsonStrInsertDBHistory());
												gSubmitPost("csdbrg_writeForm", true);
											},
											error : function(data, status, err) {
												networkErrorHandler(data, status, err);
											}
											});
										
									},
									error : function(data, status, err) {
										networkErrorHandler(data, status, err);
									}
								});
							},
							error : function(data, status, err) {
								networkErrorHandler(data, status, err);
							}
						});
					},
					error : function(data, status, err) {
					networkErrorHandler(data, status, err);
					}
				});
			} else {
				gAppendHidden("csdbrg_writeForm", "pJson", getJsonStrInsertDBHistory());
				gSubmitPost("csdbrg_writeForm", true);
			}
			
			alert("등록되었습니다.");
			
			// 21.01.21 최초 생성일때 수정내용 입력 안하고 바로 '처리완료'로 진행되도록 변경
	        opener.clickProcessStats_Se="030100"; //처리완료
	        opener.hisTbbs_id2="all";
	        // 21.02.02 신규생성일때 클릭한 uid제거
	        opener.processUid="";
	        // 21.03.08 신규생성일때 처리내용 제거
	        opener.$("#csdbpr_chargerJobProcessCtns").val("");
	        
	        opener.$("#csdbpr_chargerTblReqid").val(reqid);
	    	opener.$("#csdbpr_chargerTblTbbsid").val(tbbsid);
	        initSaveAfterEvent();
			
		} else {
			gAppendHidden("csdbrg_writeForm", "pJson", getJsonStrInsertDBHistory());
			gSubmitPost("csdbrg_writeForm", true);
			
			// file 시작
			if(fileCount>0){
				$.ajax({
					type : "post",
					dataType : "json",
					async : true,
					url : getContextPath() + "/ajax/civilservice/csw.do",
					data : "pJson=" + getJsonStrDeletefile(),
					success : function(data) {	
						for(var i in flids){
						   if(flids[i]!=""){
							   $.ajax({
									type : "post",
									dataType : "json",
									async : true,
									url : getContextPath() + "/ajax/civilservice/csw.do",
									data : "pJson=" + getJsonStrDuplifile(i),
									success : function(data) {	
									},
									error : function(data, status, err) {
									    networkErrorHandler(data, status, err);
									}
								    });
							   }
						   }
					},
					error : function(data, status, err) {
					    networkErrorHandler(data, status, err);
					}
				});
	        }
			
			//hhs 20.03.19 등록요청버튼 클릭시 '처리중'상태로 전환 되며, 수정상태를 입력하는 팝업창이 뜬다
	        opener.clickProcessStats_Se="020100"; //처리중
	        opener.hisTbbs_id2="all";
	        opener.$("#csdbpr_chargerTblReqid").val(reqid);
	    	opener.$("#csdbpr_chargerTblTbbsid").val(tbbsid);
	        initSaveAfterEvent();
	        popupEvent(tbbsid,reqid,news).focus;
			
		}
		
    }
    setTimeout(function(){window.close();}, 1000);
//    window.close();
}

//20.05.09 oh013파일 삭제
function getJsonStrDeletefile(){
	var loParam = {
		    "qt" : "ZGVsZXRl",
		    "mi" : "b20wMTkuZGVsZXRlTGlzdEFsbA==",
		    "map" : {
			"tbl_nm" : "oh013",
			"tbl_pk" : tbbsid,
			"tbl_pk2" : reqid
			}
	    };
	    console.log(JSON.stringify(loParam));
	    return encodeURIComponent(JSON.stringify(loParam));		
}

//셀렉트박스 데이터셋팅
function initSelectData() {

    setObjectSelectBoxWithCode2("csdbrg_optCounselKnd1", "전체", "1", "CHILD", "00000000", "", "CHANGE");

    if (checkInnerPopup) {
        setSelectBoxWithCode("csdbrg_optGbKnd", "", "90303", "CHILD", "", "");
    } else {
        setSelectBoxWithCode2("csdbrg_optGbKnd", "", "90303", "CHILD", "", "");
    }
    $("#csdbrg_tfSrchType").val("ttl");
}

function disabled() {
    // $("#csdbrg_optCounselKnd1,#csdbrg_optCounselKnd2,#csdbrg_optCounselKnd3,#csdbrg_optCounselKnd4,#csdbrg_optGbKnd").prop("disabled",true);
    $("#csdbrg_optCounselKnd1,#csdbrg_optCounselKnd2,#csdbrg_optCounselKnd3,#csdbrg_optGbKnd").prop("disabled", true);
    //$("#csdbrg_tfLgMdSmSearch_01,#csdbrg_tfTbbsTtl,#csdbrg_optUseYN").prop("disabled",true);
    $("#csdbrg_tfLgMdSmSearch_01,#csdbrg_tfTbbsTtl").prop("disabled", true);
//    DEXT5.setEditorMode('view', 'tbbsCont');
    tbbsCont.SetEditMode(3);
}

function undisabled() {
    // $("#csdbrg_optCounselKnd1,#csdbrg_optCounselKnd2,#csdbrg_optCounselKnd3,#csdbrg_optCounselKnd4,#csdbrg_optGbKnd").prop("disabled",false);
    $("#csdbrg_optCounselKnd1,#csdbrg_optCounselKnd2,#csdbrg_optCounselKnd3,#csdbrg_optGbKnd").prop("disabled", false);
    //$("#csdbrg_tfLgMdSmSearch_01,#csdbrg_tfTbbsTtl,#csdbrg_optUseYN").prop("disabled",false);
    $("#csdbrg_tfLgMdSmSearch_01,#csdbrg_tfTbbsTtl").prop("disabled", false);
//    DEXT5.setEditorMode('edit', 'tbbsCont');
    tbbsCont.SetEditMode(0);
}

//내용 초기화
function initContent() {
//    DEXT5.config.userFontFamily = "굴림";
//    DEXT5.config.userFontSize = 10;
//    DEXT5.setBodyValue('', 'tbbsCont');
    tbbsCont.SetEditorContent("");
    g_rspnUsrId = "";

    $("#csdbrg_optCounselKnd1").val("all");
    $("#csdbrg_tfSrchType").val("ttl");
    $("#csdbrg_tfSrchVal").val("");
    $("#csdbrg_tfNtuseDesc").val("").prop("disabled", true);
    $("#csdbrg_tfCntrNm, #csdbrg_tfRespId, #csdbrg_tfRespNm, #csdbrg_tfTbbsId, #csdbrg_tfTbbsTtl, #csdbrg_tfResponTel").val("");
    $("#csdbrg_lbCrtInfo, #csdbrg_lbModInfo").html("");
    $("#csdbrg_optUseYN").val("Y");

    rmFileBoxEvent();
    fileBox_idx = 0;
    $("#csdbrg_fileInfos").empty().append(fileForm);
}

function initDate() {
    datePicker("#csdbrg_selFrDate");
    datePicker("#csdbrg_selToDate");
    $("#csdbrg_selFrDate").val(getPrvDay("M", 1, "-"));
    //$("#csdbrg_selFrDate").val(getDate());
    $("#csdbrg_selToDate").val(getDate());
}

//eidt 로드 완료시 세부내용등록
function dext_editor_loaded_event() {
//    DEXT5.config.userFontFamily = "굴림";
//    DEXT5.config.userFontSize = 10;
    /*
     * //콜센터 신규등록 if (news) { } else { //요청DB 신규수정요청 if (clickReqId && clickTbbsId) { showDetailManual(clickTbbsId); showAttachFiless(clickTbbsId); //$("#csdbrg_optUseYN").val("Y"); checkFileBox = true; } else { //신규등록 checkFileBox = false; } }
     */
	if (tbbsid != null && news != 'y') {
        showDetailManual(tbbsid);
        showAttachFiless(tbbsid);
        document.title = '상담DB수정';
        $("#h1").html("상담DB수정");
    } else if (tbbsid != null && news == 'y') {
   		$("#csdbrg_btnDelete").hide();
        if (wrkId) {
            showDetailManual(tbbsid);
            showAttachFiless(tbbsid);
        } else {
            showDetailManual(temtbbs);
        }
    } else if (tbbsid == null && news == 'y') {
        showDetailManual(temtbbs);
    }

    if(cdb_req_gb_cd=="010100"){
    	$("#csdbrg_btnInsert").show();
    	$("#csdbrg_btnDelete").hide();
    }else if(cdb_req_gb_cd=="020100"){
    	$("#csdbrg_btnInsert").show();
    	$("#csdbrg_btnDelete").hide();    	
    }else if(cdb_req_gb_cd=="030100"){
    	$("#csdbrg_btnInsert").hide();
    	$("#csdbrg_btnDelete").show();  
    	$("#csdbrg_optUseYN").val("N");
    	$("#csdbrg_tfNtuseDesc").prop("disabled", false);
    	$("#csdbrg_tfNtuseDesc").val("사용하지 않아 미사용 처리 함");  	
    }
	
}

//입력검증
function validator() {
    var rMsg = "";

    if ($("#csdbrg_optCounselKnd1").val() == "all" || $("#csdbrg_optCounselKnd1").val() == null || $("#csdbrg_optCounselKnd2").val() == "all" || $("#csdbrg_optCounselKnd2").val() == null
        //|| $("#csdbrg_optCounselKnd3").val() == "all" || $("#csdbrg_optCounselKnd3").val() == null
    ) {
        rMsg += "\n\n상담유형을 선택해주세요.";
        return rMsg;
    }

    if ($("#csdbrg_tfTbbsTtl").val().trim() == "") {
        rMsg += "\n\n제목을 입력해 주세요.";
        return rMsg;
    }

    var tbbsCntn = tbbsCont.GetEditorContent(); // DEXT5.getBodyTextValue("tbbsCont");

    if (tbbsCntn.trim() == "") {
        rMsg += "\n\n내용을 입력해 주세요.";
        return rMsg;
    }
    /*
     * //바이트계산 최대4000byte byteLength = tbbsCntn.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,"$&$1$2").length; if(!(tbbsCntn == "" || tbbsCntn == null)) { if(byteLength > 4000) rMsg += "\n\n내용이 최대 4000byte까지 저장하실 수 있습니다."; } else rMsg += "\n\n내용을 입력해 주세요.";
     */
    // 파일 업로드 용량 체크
    var nLimitSize = 10; // 제한사이즈 MB
    var formName = $("#csdbrg_writeForm input[name=MANUAL]");
    for (var i = 0; i < formName.length; i++) {
        if (formName[i].value != "") {
            var nRtn = fileCheck(formName[i], nLimitSize);
            if (nRtn > nLimitSize) {
                rMsg += "\n\n(" + nRtn + "MB) 첨부파일 사이즈는 " + nLimitSize + "MB 이내로 등록 가능합니다.";
                return rMsg;
            }
            // 파일 확장자 체크
            if (fileExtnsCheck(formName[i]) == false) {
                rMsg += "\n\n[" + (i + 1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";
                return rMsg;
            }
        }
    }
    // 담당부서가 미선택일 경우 추가
    /*
     * if ($("#csdbrg_tfCntrNm").val() == "" || $("#csdbrg_tfCntrNm").val() == null) { rMsg += "\n\n담당부서를 선택해 주세요.";}
     */
    if ($("#csdbrg_optUseYN").val() == "N") {
        if ($("#csdbrg_tfNtuseDesc").val() == "") {
            rMsg += "\n\n미사용 선택 시 미사용사유가 필요합니다.";
            return rMsg;
        }
    }

    return rMsg;
}

function initEdit(){
	tbbsCont = new KuKudocsEditor(
            /* ID 입력부 */
            'csdbrg_divTbbsCntn',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '100%',

                //Editor 세로크기
                height: '562px',                

                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
                
                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'editGroup', 'toolGroup', 'viewGroup', 'helpGroup'
                	// image를 제외한 insertGroup 제거
                	,'link', 'unlink', 'bookmark', 'horizontal', 'date_format', 'background_image', 'video', 'file', 'symbol', 'emoticon', 'upper_lower', 'blockquote', 'layer'
                	], /* Menu Option Hidden list */
                
                //Editor Load 완료시 호출 Callback Function
                Editor_Complete: dext_editor_loaded_event,

                //Kaoni Cell Lock Attibute 설정 (Lock 기능 체크하기 위해서는 반드시 Attibute Name 설정)
                cell_lock_name: 'free',
               
                //사용할 Font Size 설정
                fontSize: [{name: "8pt", value: "8pt"}, {name: "9pt", value: "9pt"}, {name: "10pt", value: "10pt"}, {name: "11pt", value: "11pt"}, {name: "12pt", value: "12pt"}, {name: "13pt", value: "13pt"}, {name: "14pt", value: "14pt"}, {name: "16pt", value: "16pt"}, {name: "18pt", value: "18pt"}, {name: "20pt", value: "20pt"}, {name: "22pt", value: "22pt"}],

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
//initialzation page
$(document).ready(function () {
    initDate();
    initSelectData();
    initEdit();
    $("#csdbrg_btnInit").text("초기화");

    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: getContextPath() + "/ajax/civilservice/csw.do",
        data: "pJson=" + getJsonStr("c2VsZWN0T25l", "b2gwMTQuY291bnRIaXN0b3J5", {
            "req_id": reqid
        }),
        success: function (data) {
            if (data != null) {
                wrkId = data.WRK_ID;
                itmodi = true
            }
        },
        error: function (data, status, err) {
            networkErrorHandler(data, status, err);
        }
    });
    if (reqid == "") {
        $("#csdbrg_actRadio").prop("disabled", true);
        $("#csdbrg_txtRespNm").prop("disabled", true);
        $("#csdbrg_txtResponTel").prop("disabled", true);
        $("#csdbrg_tfCntrNm").prop("disabled", true);
    } else {
        $("#csdbrg_actRadio").prop("disabled", false);
        $("#csdbrg_txtRespNm").prop("disabled", false);
        $("#csdbrg_txtResponTel").prop("disabled", false);
        $("#csdbrg_tfCntrNm").prop("disabled", false);
    }
    inputFile.push($("#csdbrg_MANUAL").clone());
    fileForm = $("#csdbrg_fileInfos tr").parent().html();
    $("#csdbrg_tfNtuseDesc").prop("disabled", true);
    $("#csdbrg_optCounselKnd1").bind("change", optCounselKnd1ChangeEvent);
    $("#csdbrg_optCounselKnd2").bind("change", optCounselKnd2ChangeEvent);
    $("#csdbrg_optCounselKnd1").trigger("change");
    $("#csdbrg_optUseYN").bind("change", optUseYNChangeEvent);
    $("#csdbrg_tfSrchVal").bind("keydown", function (e) {
        if (e.keyCode == 13) {
            btnSearchClickEvent();
        }
    });
    $("#csdbrg_btnInit").bind("click", btnInitClickEvent);
    $("#csdbrg_btnInsert, #csdbrg_btnDelete").bind("click", btnInsertClickEvent);
    //파일삭제이벤트 등록
    $("#csdbrg_rmFilebox").bind("click", rmFileBoxEvent);

    if (window.sessionStorage.getItem("INTV_LG_CD") != null) {
        $("#csdbrg_optCounselKnd1").val(window.sessionStorage.getItem("INTV_LG_CD")).trigger("change");
        $("#csdbrg_optCounselKnd2").val(window.sessionStorage.getItem("INTV_MD_CD")).trigger("change");
        $("#csdbrg_optCounselKnd3").val(window.sessionStorage.getItem("INTV_SM_CD")).trigger("change");
    }
    /*if (tbbsid != null && news != 'y') {
        showDetailManual(tbbsid);
        showAttachFiless(tbbsid);
        document.title = '상담DB수정';
        $("#h1").html("상담DB수정");
    } else if (tbbsid != null && news == 'y') {
        if (wrkId) {
            showDetailManual(tbbsid);
            showAttachFiless(tbbsid);
        } else {
            showDetailManual(temtbbs);
        }
    } else if (tbbsid == null && news == 'y') {
        showDetailManual(temtbbs);
    }*/

    if (!checkInnerPopup) {
        //$("#csdbrg_chkNotUseYN").prop("disabled","disabled");
        //$("#csdbrg_chkNotUsetype").prop("disabled","disable");
        $("#csdbrg_btnExcelPopup").hide();
    }

});

$(function () {
    var selectid;
    var selIdSeq;
    $("#csdbrg_tfLgMdSmSearch_01").autocomplete({
        source: function (request, response) {
            selectid = $(this.element).prop("id");
            arSelId = selectid.split('_');
            selIdSeq = arSelId[1];
            $.ajax({
                type: 'post',
                async: true,
                url: getContextPath() + "/ajax/civilservice/csw.do",
                dataType: "json",
                data: "pJson=" + getJsonCodeList(selectid),
                success: function (data) {

                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                    response($.map(data, function (item) {

                        return {
                            // label: (item.XNAME+" > "+item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
                            label: (item.LNAME + " > " + item.MNAME + " > " + item.SNAME),
                            value: $("#csdbrg_" + selectid).val(),
                            // hidVal:  (item.XCODE+"|"+item.LCODE+"|"+item.MCODE+"|"+item.SCODE)
                            hidVal: (item.LCODE + "|" + item.MCODE + "|" + item.SCODE)
                        };
                    }));
                }
            });
        },
        //조회를 위한 최소글자수
        minLength: 2,
        select: function (event, ui) {
            ui.item.value = "";
            // var arItem=new Array(4);
            var arItem = new Array(3);
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
            arItem = (ui.item.hidVal.toString()).split('|');
            //if(selIdSeq=="01"){
            // $("#csdbrg_optCounselKnd1").val(arItem[0]).trigger("change");
            // $("#csdbrg_optCounselKnd2").val(arItem[1]).trigger("change");
            // $("#csdbrg_optCounselKnd3").val(arItem[2]).trigger("change");
            // $("#csdbrg_optCounselKnd4").val(arItem[3]);
            $("#csdbrg_optCounselKnd1").val(arItem[0]).trigger("change");
            $("#csdbrg_optCounselKnd2").val(arItem[1]).trigger("change");
            $("#csdbrg_optCounselKnd3").val(arItem[2]);
            //}
        }
    });
})

//------------------------------- file related ----------------------------------------------
//파라미터셋팅 첨부파일
function getJsonFileLists(tbbsId) {
    if (wrkId) {
        var loParam = {
            "qt": "c2VsZWN0TGlzdA==",
            "mi": "b20wMTkuZmlsZUxpc3Q=",
            "map": {
                "key": "value",
                "tbl_nm": "oh013",
                "tbl_pk": tbbsId,
                "tbl_pk2": reqid,
                "orderby": "crtTime",
            }
        };
    } else {
        var loParam = {
            "qt": "c2VsZWN0TGlzdA==",
            "mi": "b20wMTkuZmlsZUxpc3Q=",
            "map": {
                "key": "value",
                "tbl_nm": "om010",
                "tbl_pk": tbbsId,
                "orderby": "crtTime",
            }
        };
    }
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {
    var loParam = {
        "svrFilePath": svr,
        "locFileName": loc
    };
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//첨부파일 박스추가
function addFileBox() {
    if (fileBox_idx >= 2) {
        alert("첨부파일은 최대 3개까지 가능합니다.");
    } else {
        var html = $("#csdbrg_fileadd tr").parent().html();
        html = html.replace(/XXX/g, "" + ++fileBox_idx);
        $("#csdbrg_fileInfos").append(html);
    }
}

//첨부파일박스삭제
function removeFileBox(i) {
    var el = $("#csdbrg_writeForm input[name=record_" + i + "]");
    el.parent().parent().remove();
    fileBox_idx--;

    if (fileBox_idx > 2) {
        $("#csdbrg_fileInfos tr:last-child").css("display", "none");
    } else {
        $("#csdbrg_fileInfos").css("display", "block");
    }
}

//첨부된 파일 삭제
function deleteFile(fileId) {
    if (confirm("첨부된 파일을 삭제하시겠습니까?")) {
    	
    	var el = $("#csdbrg_writeForm input[name=record_" + fileId + "]");
        el.parent().parent().remove();
        flids.splice(this,1);

        if (--fileBox_idx < 3) {
	        $("#csdbrg_MANUAL").prop("disabled", false);
	        $("#csdbrg_rmFilebox").prop("disabled", false);
	    }
	
//	    if (fileBox_idx < 3) {
//	        $("#csdbrg_fileInfos tr:last-child").css("display", "table-cell");
//	    } else {
//	        $("#csdbrg_fileInfos tr:last-child").css("display", "none");
//	    }
	    
    }
}

//파일박스 내용삭제
function rmFileBoxEvent() {
    inputFile[1] = inputFile[0].clone(true);
    $("#csdbrg_MANUAL").replaceWith(inputFile[1]);
}

//첨부파일 보기
function showAttachFiless(tbbsId) {
    $.ajax({
        type: "post",
        dataType: "json",
        async: true,
        url: getContextPath() + "/ajax/civilservice/csw.do",
        data: "pJson=" + getJsonFileLists(tbbsId),
        success: function (data) {
            for (var i in data) {
            	fileCount++;
                var url = getContextPath() + "/file/jisikManageFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
                var tr = "<tr>";
                tr += "<td colspan='4'>" + "<input type='hidden' name='record_" + data[i].FL_ID + "' value='' />";
                tr += "<span><a href='" + url + "' title='" + data[i].LOC_FL_NM + "'>" + data[i].LOC_FL_NM.substring(0, 20) + "</a></span>" + " ";
                tr += "<span>" + data[i].FL_KB_SZ + "</span>";
                //요청 게시물일때
//                if (checkFileBox || news || itmodi) {
                    tr += "<a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'> <strong class='or_txt'>[삭제]</strong></a>";
//                }

                tr += "</td></tr>";
//                flids.push(data[i].FL_ID);
                flids.push(data[i]);
                fileBox_idx++;
                $("#csdbrg_fileInfos").prepend(tr);
            }
            if (fileBox_idx > 2) {
                $("#csdbrg_MANUAL").prop("disabled", true);
                $("#csdbrg_rmFilebox").prop("disabled", true);
                $("#csdbrg_fileInfos tr:last-child").css("display", "none");
            } else {}
        },
        error: function (data, status, err) {
            networkErrorHandler(data, status, err);
        }
    });
}
//-----------------------------------------------------------------------------
