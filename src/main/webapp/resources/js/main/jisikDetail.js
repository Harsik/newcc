var oEditors = [];
var gd_editor;
var rspns = [];
var checkCharger = false;
//var checkCharger = true;



if(ref != null && ref=='search'){
	var sendingOuCode = "";
	var sendingUid = "";
	var sendingUName = "";
	var sendingOu = "";
	var sendingOuName = "";
}else{
	var sendingOuCode = opener.sendingOuCode!=null?opener.sendingOuCode:"";
	var sendingUid = opener.sendingUid!=null?opener.sendingUid:"";
	var sendingUName = opener.sendingUName!=null?opener.sendingUName:"";
	var sendingOu = opener.sendingOu!=null?opener.sendingOu:"";
	var sendingOuName = opener.sendingOuName!=null?opener.sendingOuName:"";
}

var reqid = "";
var tbbsCont = null;

//2020.05.07
var fileBox_idx = 0;
var flids = [];
var bEditMode = false;

//insertComments 
function getJsonStrInsertComment(req_id) {
	var flag = "";
	/*
	 * //신규DB요청시 새로운 상담DB를 미리 생성 if($("#jsdeta_counselDbNewRegist").prop('checked')){ flag="010100"; }else if($("#jsdeta_counselDbModifyRegist").prop('checked')){ flag="020100";} else if($("#jsdeta_counselDbDelete").prop('checked')){ flag="030100";}
	 */

	/*
	 * if(news){ flag="010100"; }else{
	 */
	flag = "020100";
	//}
	var ccAffir = $("#jsdeta_chkNotUseYN").val() != null ? $("#jsdeta_chkNotUseYN").val() : "N";
//	var actstcd = "030100"; //처리완료
	var actstcd = "020100"; //2021.01.22 hhs 처리중
	var complete = "yes"; //2020.05.07 hhs
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTUuamlzaWtSZXdvcmRJbnNlcnQ=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om015",
			"tbl_pk" : req_id,
			"req_id" : req_id, //sequence							
			"tbbs_id" : $("#jsdeta_tfTbbsId").val(),
			"org_id" : sendingOuCode,
			"login_usr_id" : sendingUid,
			"login_usr_nm" : sendingUName,
			"affs_org_usr_id" : sendingUid, //기관사용자ID
			"cdb_gb_cd" : "040101",//$("#jsdeta_optGbKnd").val(),						//DB구분
			"intv_lg_cd" : $("#jsdeta_prmIntvLgCd").val(),
			"intv_md_cd" : $("#jsdeta_prmIntvMdCd").val(),
			"intv_sm_cd" : $("#jsdeta_prmIntvSmCd").val(),
			
			// 21.02.25 김경진 주무관 요청으로 공무원 작성시 요청내용 공백으로 들어가도록 변경 
			"comm_cntn" : "",
//			"comm_cntn" : $("#jsdeta_tfTbbsTtl").val(),//DEXT5.getBodyValue("commCntn"),					//요청내용
			"comm_ttl" : $("#jsdeta_tfTbbsTtl").val(), //제목부분
			"new_yn" : flag, //신규여부 
			"cdb_act_st_cd" : actstcd, //상태코드
			"ccaffir" : "N",
		}
	};

	/*
	 * //신규 요청일경우 if(flag=="010100"){ loParam['map']['tbbs_id']=jisikTbbsId; }else if(flag=="010100" && jisikTbbsId==null){ loParam['map']['tbbs_id']=""; }
	 */

	return encodeURIComponent(JSON.stringify(loParam));
}

// 2019.12.12  파일 첨부기능 추가
function getJsonStrDuplifile(fl_id) {
    var loParam = {
        "qt": "aW5zZXJ0",
        "mi": "b20wMTkuZHVwbGljYXRl",
        "map": {
            "tbl_nm": "oh013",
            "tbl_pk": $("#jsdeta_tfTbbsId").val(),
            "tbl_pk2": reqid,
            "fl_id": fl_id,
            "sendingUid": sendingUid
        }
    };
    return encodeURIComponent(JSON.stringify(loParam));

}

//요청DB 이력등록
function getJsonStrInsertDBHistory(reqid) {/*
											 * if (news) { var wrk_cl = "상담DB신규등록" } else {
											 */
	var wrk_cl = "상담DB수정등록"
	//}

	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMTQuaW5zZXJ0SmlzaWtIaXN0b3J5",
		"map" : {
			"tbl_pk" : $("#jsdeta_tfTbbsId").val(),
			"tbl_nm" : "oh013",
			"req_id" : reqid,
			"tbbs_cntn" : tbbsCont.GetEditorContent(), //DEXT5.getBodyValue("tbbsCont"),//DEXT5.getHtmlValue("tbbsCont")
			"cdb_gb_cd" : "040101",
//			"tbbs_ttl" : $("#jsdeta_tfTbbsTtl").html(), 05.07 hhs
			"tbbs_ttl" : $("#jsdeta_tfTbbsTtl").val(),
			"intv_lg_cd" : $("#jsdeta_prmIntvLgCd").val(),
			"intv_md_cd" : $("#jsdeta_prmIntvMdCd").val(),
			"intv_sm_cd" : $("#jsdeta_prmIntvSmCd").val(),
			"cntr_nm" : $("#jsdeta_tfCntrNm").html(),
			"rspn_prsn" : $("#jsdeta_txtRespNm").val(),
			"rspn_tel_no" : $("#jsdeta_txtResponTel").val(),
			"use_yn" : "Y",
			"sendingUid" : sendingUid,
			"wrk_cl" : wrk_cl,
			"cc_appr_yn" : "N",
			"tbl_pk2": reqid
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}
//파라미터셋팅 지식검색 상세보기
function getJsonStrShowDetailJisik(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMTAuc2VsZWN0SmlzaWs=",
		"map" : {
			"tbbs_id" : tbbsId
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 조회수 업데이트
function getJsonStrAddInqrCnt(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTEuaW5zZXJ0SmlzaWtVcGRhdGU=",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"login_usr_id" : window.sessionStorage.getItem("USR_ID") == null ? window.sessionStorage.getItem("usrId") : window.sessionStorage.getItem("USR_ID"),
			"usr_id" : window.sessionStorage.getItem("USR_ID") == null ? window.sessionStorage.getItem("usrId") : window.sessionStorage.getItem("USR_ID"),
			"usr_nm" : window.sessionStorage.getItem("USR_NM") == null ? "" : window.sessionStorage.getItem("USR_NM")
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일
function getJsonFileList(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om010",
			"tbl_pk" : tbbsId,
			"orderby" : "crtTime"
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//조회수 업데이트
function getJsonStrUpdateInqrCnt(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTEudXBkYXRlSW5xckNudA==",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

//조회수 업데이트
function addInqrCnt(tbbsId) {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/main/addInqrCnt.do",
		data : "pJson=" + getJsonStrUpdateInqrCnt(tbbsId),
		success : function(data) {
			
			$.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/main/addInqrCnt.do",
				data : "pJson=" + getJsonStrAddInqrCnt(tbbsId),
				success : function(data) {
					/*
					 * setTimeout(function(){ getJisikDetail(tbbsId); }, 500*1);
					 */

					//조회수반영, *부하시 사용안함
					//window.opener.btnJisikSearchClickEvent2();
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
}

//지식검색 가져오기
function getJisikDetail(tbbsId) {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/main/jisikDetail.do",
		data : "pJson=" + getJsonStrShowDetailJisik(tbbsId),
		success : function(data) {
			//팝업 호출 체크			
			//	    var paraJob = $("#jsdeta_tfJob").val();
			//	    if(paraJob=="" || paraJob =="null"){
			//	    $("#jsdeta_selMainIntvLgCd", opener.document).val(data.INTV_LG_CD);
			//	    window.opener.setObjectSelectBoxWithCode("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "");
			//	    window.opener.setObjectSelectBoxWithCode("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "");
			//	    }

			$("#jsdeta_tfTbbsintvNM").html(data.INTV_NM);
			$("#jsdeta_tfTbbsinqrCnt").html(data.TBBS_INQR_CNT);
			$("#jsdeta_tfTbbsTtl").val(data.TBBS_TTL);
			document.title = data.TBBS_TTL; // 타이틀 변경
			$("#jsdeta_tfCdbGbNm").html(data.CDB_GB_NM);
			//DEXT5.setHtmlValue(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
//			DEXT5.setHtmlContentsEw(data.TBBS_CNTN == null ? "" : data.TBBS_CNTN, 'tbbsCont');
			//DEXT5.setHtmlValue(data.DTLS==null?"":data.DTLS, 'dtls');
			tbbsCont.SetEditorContent(data.TBBS_CNTN==null?"":data.TBBS_CNTN, function() {
				tbbsCont.SetEditMode(3);
			});
			//	    $("#jsdeta_responUsrNm").html(data.CNTR_NM);
			//	    $("#jsdeta_responTelno").html(data.RESPON_TEL);
			//	    $("#jsdeta_modUsrNm").html(data.MOD_USR_NM);
			//	    $("#jsdeta_modDtm").html(data.MOD_DT_FORMAT=="--"?"":data.MOD_DT_FORMAT);

			$("#jsdeta_appr_yn").html(data.ARR_YN);

			if (data.ARR_YN == '미승인') {
				$("#jsdeta_appr_yn").css("color", "red");
			} else {
				$("#jsdeta_appr_yn").css("color", "black");
			}

			$("#jsdeta_tfCntrNm").html(data.CNTR_NM);
			if((data.CNTR_NM==sendingOu) || (window.sessionStorage.getItem("CC_AUTH")=="Y")){
//			if(data.CNTR_NM==sendingOu){
				checkCharger=true;
				$("#jsdeta_btChEdit").show();
				$("#jsdeta_btChView").hide();
				$("#jsdeta_txtRespNm").prop("disabled",false);
				$("#jsdeta_txtResponTel").prop("disabled",false);
				$("#jsdeta_tfTbbsTtl").prop("disabled", false);
				$("input:radio[name=chargerradio]").attr("disabled",false);
			}else{
				checkCharger=false;
				$("#jsdeta_btChEdit").hide();
				$("#jsdeta_btChView").hide();
				$("#jsdeta_txtRespNm").prop("disabled",true);
				$("#jsdeta_txtResponTel").prop("disabled",true);
				$("#jsdeta_tfTbbsTtl").prop("disabled", true);
				$("input:radio[name=chargerradio]").attr("disabled",true);
			}
			
			/*$("#jsdeta_tfRespNm").html(data.RSPN_PRSN);*/
			$("#jsdeta_txtRespNm").val(data.RSPN_PRSN);
			
			/*$("#jsdeta_tfResponTel").html("");
			$("#jsdeta_tfResponTel").html(data.RESPON_TEL);*/
			$("#jsdeta_txtResponTel").val(data.RESPON_TEL);
			var crt = data.CRT_USR_NM ? data.CRT_USR_NM : "";
			var mod = data.MOD_USR_NM ? data.MOD_USR_NM : "";
			$("#jsdeta_RsctDt").html(data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT + " " + crt);
			$("#jsdeta_UpdtDt").html(data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT + " " + mod);

			//상담DB수정요청으로 파라메터 넘기기
			setSelectBoxWithCodeSync2(data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);
			$("#jsdeta_prmCdbGbCd").val(data.CDB_GB_CD);
			$("#jsdeta_prmTbblTtl").val(data.TBBS_TTL);

			/*
			 * if(opener) { $(opener.document).find("#selMainIntvLgCd").val(data.INTV_LG_CD); opener.setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "CHANGE"); opener.setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "CHANGE");
			 * 
			 * 
			 * 
			 * if($("#jsdeta_tfSearch").val() == "total") { if(search == null || typeof(search) == 'undefined' || search == "") { search = parent.opener; } $(search.do).find("#selMainIntvLgCd").val(data.INTV_LG_CD); opener.opener.setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "CHANGE"); opener.opener.setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "CHANGE"); }
			 * 
			 * 
			 * 
			 * if(opener.opener) { $(opener.opener.document).find("#selMainIntvLgCd").val(data.INTV_LG_CD); opener.opener.setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "CHANGE"); opener.opener.setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "CHANGE"); } else if (opener.opener.opener) { $(opener.opener.opener.document).find("#selMainIntvLgCd").val(data.INTV_LG_CD); opener.opener.opener.setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", data.INTV_LG_CD, data.INTV_MD_CD, "CHANGE"); opener.opener.opener.setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", data.INTV_MD_CD, data.INTV_SM_CD, "CHANGE"); }
			 */
			
			//첨부파일 보기
			showAttachFiles($("#jsdeta_tfTbbsId").val());
			
			// 에디터툴바 hidden
			$("ul.menus li").css("display","none");
			$(".kk_editorArea").css("height","540px")
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
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
	var el = $("#jsdeta_writeForm input[name=record_" + i + "]");
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
	
	if(!bEditMode){
		alert("파일 삭제는 수정모드에서만 가능합니다.");
		return;
	}
	
	if (confirm("첨부된 파일을 삭제하시겠습니까?")) {
		
		 var el = $("#jsdeta_writeForm input[name=record_" + fileId + "]");
         el.parent().remove();
         flids.splice(flids.indexOf(fileId),1);

         if (--fileBox_idx < 3) {
             $("#csdbrg_MANUAL").prop("disabled", false);
             $("#csdbrg_rmFilebox").prop("disabled", false);
         }

         if (fileBox_idx < 3) {
             $("#csdbrg_fileInfos tr:last-child").css("display", "table-cell");
         } else {
             $("#csdbrg_fileInfos tr:last-child").css("display", "none");
         }
	}
	
	
}

//파일박스 내용삭제
function rmFileBoxEvent() {
	inputFile[1] = inputFile[0].clone(true);
	$("#csdbrg_MANUAL").replaceWith(inputFile[1]);
}


//첨부파일 보기
function showAttachFiles(tbbsId) {
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/management/fileList.do",
		data : "pJson=" + getJsonFileList(tbbsId),
		success : function(data) {
			if (data != null && data != "") {
				//var tr ="<tr><th class='line_rt' style='width: 80%;'>첨부파일이름</th>" +"<th class='line_rt' style='width: 20%;'>용량</th></tr>";
				var tr = "";
				for ( var i in data) {
					var url = getContextPath() + "/file/board/jisikSearchFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

					tr += "<tr>";
					tr += "<input type='hidden' name='record_" + data[i].FL_ID + "' value='' >"; //hhs 20.04.07
					tr += "<td class='line_wb'><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a> <span>" + data[i].FL_KB_SZ + "</span>";
					/* tr += "<td class='line_wb'></td>"; */
					if(checkCharger){
						tr += " <a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'> <strong class='or_txt'>[삭제]</strong></a>";
					}
					tr += "</td></tr>";
					
					// 219.12.11  파일 첨부기능 추가
					flids.push(data[i].FL_ID);
	                fileBox_idx++;
				}

				$("#jsdeta_tblFiles").append(tr);
				$(".or_txt").hide(); //hhs
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function initContent() {
//	DEXT5.setHtmlValue("", 'tbbsCont');
	tbbsCont.SetEditorContent("");
//	DEXT5.setHtmlValue("", 'dtls');

	$("#jsdeta_tfTbbsintvNM").html("");
	$("#jsdeta_tfTbbsinqrCnt").html("");
	$("#jsdeta_tfTbbsTtl").val("");
	$("#jsdeta_tfCdbGbNm").html("");
	$("#jsdeta_responUsrNm").html("");
	$("#jsdeta_responTelno").html("");
	$("#jsdeta_modUsrNm").html("");
	$("#jsdeta_modDtm").html("");

	//상담DB수정요청으로 파라메터 넘기기
	// $("#jsdeta_prmIntvLgCd").val("");
	$("#jsdeta_prmIntvMdCd").val("");
	$("#jsdeta_prmIntvSmCd").val("");
	$("#jsdeta_prmCdbGbCd").val("");
	$("#jsdeta_prmTbblTtl").val("");
}

//eidt 로드 완료시 세부내용등록
function dext_editor_loaded_event(editor) {
	getJisikDetail($("#jsdeta_tfTbbsId").val());
}
function btnInsertClickEvent() {
	// 김경진 주무관 : 등록시 alert 제거 요청
//	if (!confirm("등록하시겠습니까?"))
//		return;
	
	var selLgcd = $("#jsdeta_prmIntvLgCd").val()=="all";
	var selMdcd = $("#jsdeta_prmIntvMdCd").val()=="all";
	var selSmcd = $("#jsdeta_prmIntvSmCd").val()=="all";
	
	if ( selLgcd || selMdcd || selSmcd) { 
		alert('상담유형을 선택하시기 바랍니다.');
		if(selLgcd){
			$("#jsdeta_prmIntvLgCd").focus();
		}else if(selMdcd){
			$("#jsdeta_prmIntvMdCd").focus();
		}else if(selSmcd){
			$("#jsdeta_prmIntvSmCd").focus();
		}
		return false;
	}
	
	// 21.03.18 중복클릭 방지
	$("#jsdeta_btnUpdate").prop("disabled", true);
	opener.jQuery("#csdbmg_CnsltDbProcessManageTabs").tabs({active:"1"});
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/cswnextval.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "b20wMTUubmV4dHZhbA==", {}),
		success : function(data) {
			reqid = data.REQ_ID;
			$("#jsdeta_tfReqId").val(reqid);
			$.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getContextPath() + "/ajax/civilservice/cswnextval.do",
				data : "pJson=" + getJsonStrInsertComment(reqid),
				success : function(data) {
					
					$.ajax({
						type: "post",
						dataType: "json",
						async: false,
						url: getContextPath() + "/ajax/civilservice/cswnextval.do",
						data: "pJson=" + getJsonStrInsertCommentHis(),
						success: function (data) {
							gAppendHidden("jsdeta_writeForm", "pJson", getJsonStrInsertDBHistory(reqid));
		                     gSubmitPost("jsdeta_writeForm", true);
						},
						error : function(data, status, err) {
							networkErrorHandler(data, status, err);
						}
					});
					
                     
                     //hhs 05.08
                     if (flids[i] != []) {
 		                for (var i in flids) {
 		                    $.ajax({
 		                        type: "post",
 		                        dataType: "json",
 		                        async: true,
 		                        url: getContextPath() + "/ajax/civilservice/cswinsertManualFile.do",
 		                        data: "pJson=" + getJsonFileReInsert(flids[i]),
 		                        success: function (data) {},
 		                        error: function (data, status, err) {
 		                            networkErrorHandler(data, status, err);
 		                        }
 		                    });
 		                }
 		            }
                     
				}
			});
		}
	});
	
	opener.$("#csdbpr_tblChargerProcesstList").trigger("reloadGrid");
	opener.hisTbbs_id2="all";
    opener.$("#csdbpr_chargerTblReqid").val(reqid);
	opener.$("#csdbpr_chargerTblTbbsid").val($("#jsdeta_tfTbbsId").val());
	popupEvent($("#jsdeta_tfTbbsId").val(),reqid,"N").focus;
//	alert('등록되었습니다.');
	window.close();
}

//hhs 21.01.22
//저장이 완료되면
function initSaveAfterEvent(tbbs_id) {
    opener.ChargerBtnInsert_clickEvent(); 
}

//hhs 21.01.22
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

function getJsonStrInsertCommentHis(){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wMTUuamlzaWtSZXdvcmRJbnNlcnRIaXM=",
			"map" : {
				"key" : "value",
				"tbbs_id": $("#jsdeta_tfTbbsId").val(),
				"login_usr_id": sendingUid,
				"usr_id2" : sendingUid,
				"org_id2" : sendingOuCode,
				"org_usr_id2" : sendingUid, //기관사용자id
				"org_ful_nm2" : sendingOuName, //기관사용자nm
				
				"cdb_gb_cd" : "040101",//$("#jsdeta_optGbKnd").val(),						//DB구분
				"intv_lg_cd" : $("#jsdeta_prmIntvLgCd").val(),
				"intv_md_cd" : $("#jsdeta_prmIntvMdCd").val(),
				"intv_sm_cd" : $("#jsdeta_prmIntvSmCd").val(),
				"comm_cntn" : $("#jsdeta_tfTbbsTtl").val(),//DEXT5.getBodyValue("commCntn"),					//요청내용
				"comm_ttl" : $("#jsdeta_tfTbbsTtl").val(), //제목부분
				"new_yn" : "020100", //신규여부 
				// 21.01.22 hhs 처리중 단계 생성
//				"cdb_act_st_cd" : "030100", //처리완료
				"cdb_act_st_cd" : "020100", //처리중
				
				"rtn_rsn2" : sendingUName + "님이 처리중 입니다.",
//				"rtn_rsn2" : sendingUName + "님이 처리완료 하였습니다.",
//				"message" : "요청되었습니다."
			}
		};

    /*
     * //신규 요청일경우 if(flag=="010100"){ loParam['map']['tbbs_id']=jisikTbbsId; }else if(flag=="010100" && jisikTbbsId==null){ loParam['map']['tbbs_id']=""; }
     */
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 20.05.07 om010 file복사
function getJsonFileReInsert(fl_id){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wMTkuY3BJbnNlcnQ=",
			"map" : {
				"tbl_pk" : $("#jsdeta_tfTbbsId").val(),
				"tbl_pk2" : reqid,
				"fl_id" : fl_id,
				"tbl_nm" : "oh013"
			}
		};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}


//상담DB 변경이력 조회버튼 클릭이벤트 등록
function btnCnslAltListClickEvent()
{
	
	var width = 1500;
	var height = 900;
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;		
	var tbbsId = $("#jsdeta_tfTbbsId").val();
	var paramURL = getContextPath() + "/web/civilservice/cswcounseldbAltList.do?TBBS_ID=" + tbbsId;
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	//window.sessionStorage.setItem("BOARD_TYPE", "020100.insert");
	
	var newWindow = window.open(paramURL, "counseldbAltList", option);
	newWindow.focus();
}

function getJsonStrchangeRespNm(){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wMTAuY2hhbmdlRGVwdENoYXJnZXI=",
			"map" : {
				"tbbs_id" : $("#jsdeta_tfTbbsId").val(),
				"rspn_prsn" : $("#jsdeta_inRespNm").val(),
				"sendingUid" : sendingUid
			}
		};
		return encodeURIComponent(JSON.stringify(loParam));
}

function btnchangeRespNm(){
	$.ajax({
		type : "post",
		dataType : "json",
		url : getContextPath() + "/ajax/civilservice/cswnextval.do",
		data : "pJson=" + getJsonStrchangeRespNm(),
		success : function(data) {
			alert("담당자가 변경되었습니다.")
		}
	});
}

function getJsonStrCCApprYn(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wMTAuc2VsZWN0Q0NBcHByWW4=",
			"map" : {
				"tbbs_id" : $("#jsdeta_tfTbbsId").val(),
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

function getSeoMooInfoCheck() {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0U2VvTW9vSW5mbw==",
			"map" : {
				"key" : "value",
				"oucode" : sendingOuCode
			}
	};
	return encodeURIComponent(JSON.stringify(loParam)); 
}

function btnChangeEditMode(){
	// 22.03.17 해당 부서에 서무 있는지 체크
	var seomooCheck = true;
	
	if(window.sessionStorage.getItem("CC_AFFAIRS_YN") != "Y"){
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : "/ajax/civilservice/cswGetSeoMooInfoCheck.do",
			data : "pJson=" + getSeoMooInfoCheck(),
			success : function(data) {
				if(data == null){
					alert("부서에 서무가 없습니다. \n 콜센터 담당자에게 서무지정 요청을 해주세요.");
					seomooCheck = false;
				}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
	
	if(seomooCheck){
		// 20.08.07 처리 진행중인 상담DB가 있을때 수정 막기 추가 
		$.ajax({
			type : "post",
			dataType : "json",
			url : getContextPath() + "/ajax/civilservice/cswnextval.do",
			data : "pJson=" + getJsonStrCCApprYn(),
			success : function(data) {
				if(data!=null && data.CC_APPR_YN == "N"){
					alert("확인대기 상태 혹은 재작성요청 상태에 있는 상담DB입니다.\n\n확인대기 인 경우 콜센터 확인 완료 후 상담DB 수정이 가능하며\n\n재작성요청 인경우 나의처리목록 에서 재작성이 가능합니다.");
				}else{
					if(window.sessionStorage.getItem("CC_AUTH")=="Y"){
						$("#jsdeta_optCounselKnd").show();
						$("#jsdeta_tfTbbsintvNM").hide();
					}
					
	//				DEXT5.setEditorMode('edit', 'tbbsCont');
					tbbsCont.SetEditMode(0);
					$("#jsdeta_btnUpdate").show();
					$("#jsdeta_actRadio").show();
					$("#jsdeta_inRespNm").show();
					$("#jsdeta_btRespNm").show();
					$("#jsdeta_btChView").show();
					$("#jsdeta_btChEdit").hide();
					$("#jsdeta_txtRespNm").prop("disabled",false);
					$("#jsdeta_txtResponTel").prop("disabled",false);
					$("#jsdeta_tfTbbsTtl").prop("disabled", false);
				
					// 20.04.07 hhs 수정모드일때만 삭제 가능
					$(".or_txt").show();
					// 2019.12.12 파일 첨부기능 추가
					$("#csdbrg_fileInfos").show();
					bEditMode = true;
					
					// 에디터툴바 show
					$("ul.menus li").css("display","inline-block");
					$(".kk_editorArea").css("height","435px")
				}
			}
		});
	}
}
function btnChangeViewMode(){
	if(window.sessionStorage.getItem("CC_AUTH")=="Y"){
		$("#jsdeta_optCounselKnd").hide();
		$("#jsdeta_tfTbbsintvNM").show();
	}
	
//	DEXT5.setEditorMode('view', 'tbbsCont');
	tbbsCont.SetEditMode(3);
	$("#jsdeta_btnUpdate").hide();
	$("#jsdeta_actRadio").hide();
	$("#jsdeta_inRespNm").hide();
	$("#jsdeta_btRespNm").hide();
	$("#jsdeta_btChView").hide();
	$("#jsdeta_btChEdit").show();
	$("#jsdeta_txtRespNm").prop("disabled",true);
	$("#jsdeta_txtResponTel").prop("disabled",true);
	$("#jsdeta_tfTbbsTtl").prop("disabled", true);
	
	$(".or_txt").hide();
	// 2019.12.12 파일 첨부기능 추가
	$("#csdbrg_fileInfos").hide();
	bEditMode = false;
	
	// 에디터툴바 hidden
	$("ul.menus li").css("display","none");
	$(".kk_editorArea").css("height","540px")
}

function Editor_Complete() {	
	getJisikDetail($("#jsdeta_tfTbbsId").val());
}
function initEditor(){
	tbbsCont = new KuKudocsEditor(
            /* ID 입력부 */
            'jsdeta_divTbbsCntn',

            /* Option 입력부 */
            {
                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '100%',

                //Editor 세로크기
                height: '550px',
                
                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',

                //Hidden Menu 설정
//                hiddenMenu: ['fileGroup', 'editGroup', 'paragraphFormatGroup','insertGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'], /* Menu Option Hidden list */
                hiddenMenu: ['fileGroup', 'editGroup', 'toolGroup', 'viewGroup', 'helpGroup'
                	// image를 제외한 insertGroup 제거
                	,'link', 'unlink', 'bookmark', 'horizontal', 'date_format', 'background_image', 'video', 'file', 'symbol', 'emoticon', 'upper_lower', 'blockquote', 'layer'
                	], /* Menu Option Hidden list */
                
                //Editor Load 완료시 호출 Callback Function
                Editor_Complete: Editor_Complete,

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
                useFirstFocus : true,

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

function optCounselKnd1ChangeEvent() {
	setObjectSelectBoxWithCode("jsdeta_prmIntvMdCd", "전체", "2", "CHILD", $("#jsdeta_prmIntvLgCd").val(), "", "CHANGE");
}

function optCounselKnd2ChangeEvent() {
    setObjectSelectBoxWithCode("jsdeta_prmIntvSmCd", "전체", "3", "CHILD", $("#jsdeta_prmIntvMdCd").val(), "", "");
}


function setSelectBoxWithCodeSync2(code1, code2, code3) {
    $("#jsdeta_prmIntvLgCd").val(code1).trigger("change");
    $("#jsdeta_prmIntvMdCd").val(code2).trigger("change");
    $("#jsdeta_prmIntvSmCd").val(code3);
}

$(document).ready(
		function(e) {
			$("#jsdeta_optCounselKnd").hide();
			if(ref!='search'){
				setObjectSelectBoxWithCode2("jsdeta_prmIntvLgCd", "전체", "1", "CHILD", "00000000", "", "CHANGE");
			    $("#jsdeta_prmIntvLgCd").bind("change", optCounselKnd1ChangeEvent);
			    $("#jsdeta_prmIntvMdCd").bind("change", optCounselKnd2ChangeEvent);
			    $("#jsdeta_prmIntvLgCd").trigger("change");
			}else{
				$("#jsdeta_btnCnslAltList").hide();
			}
//			
			//SetDivdext5Editor("100%", "600px", "jsdeta_divTbbsCntn", "tbbsCont");
			initEditor();

			if (window.sessionStorage.getItem("USR_ID") == null) { // 콜센터 상담사가 아닌 공무원이 요청한 화면이면 상담DB요청등록 버튼 숨김
				$("#jsdeta_btnJisikDbPopup").hide();
				window.sessionStorage.setItem("usrId", sendingUid);
				
			}

			var login_usr_id = window.sessionStorage.getItem("USR_ID") == null ? window.sessionStorage.getItem("usrId") : window.sessionStorage.getItem("USR_ID");

			if (login_usr_id = '' || login_usr_id == null) {
				alert('로그인후 이용하실 수 있습니다.');
				self.close();
			}

			//팝업 호출 체크
			/*
			 * var paraJob = $("#jsdeta_tfJob").val();
			 * 
			 * if(paraJob=="" || paraJob =="null"){ $("#jsdeta_btnJisikDbPopup").hide(); }
			 */
			//조회수 업데이트
			addInqrCnt($("#jsdeta_tfTbbsId").val());

			$("#jsdeta_btnJisikDbPopup").bind(
					"click",
					function() {
						// opener.jisikRewordPopupQuery($("#jsdeta_prmIntvExCd").val(),$("#jsdeta_prmIntvLgCd").val(),$("#jsdeta_prmIntvMdCd").val(),$("#jsdeta_prmIntvSmCd").val(),$("#jsdeta_prmCdbGbCd").val(),encodeURIComponent(encodeURIComponent($("#jsdeta_prmTbblTtl").val())),$("#jsdeta_tfpopup").val());
						opener.jisikRewordPopupQuery($("#jsdeta_prmIntvLgCd").val(), $("#jsdeta_prmIntvMdCd").val(), $("#jsdeta_prmIntvSmCd").val(), $("#jsdeta_prmCdbGbCd").val(), encodeURIComponent(encodeURIComponent($(
								"#jsdeta_prmTbblTtl").val())), $("#jsdeta_tfpopup").val());
					});

			//닫기버튼 클릭이벤트 등록
			$("#jsdeta_btnClose").bind("click", function() {
				window.close();
			});
			$("#jsdeta_btnUpdate").bind("click", btnInsertClickEvent);
			$("#jsdeta_btnCnslAltList").bind("click",btnCnslAltListClickEvent);
			$("#jsdeta_btRespNm").bind("click",btnchangeRespNm);
			$("#jsdeta_btChEdit").bind("click",btnChangeEditMode);
			$("#jsdeta_btChView").bind("click",btnChangeViewMode);
			
			// 2020.05.07 파일 첨부기능 추가
			$("#csdbrg_fileInfos").hide();
			
		});