var g_popup = "GCHILD";
var fileBox_idx = 0;
var org_id = "";
var cdb_act = "";

var dbGrade ="user";				
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var usrId = window.sessionStorage.getItem("USR_ID");
var usrNm = window.sessionStorage.getItem("USR_NM");/*
var locfl_nm=null;
var svrfl_nm=null;
var svrfl_pth=null;
var fl_sz=null;*/
var checkProCd=false;
var flids = [];
var tbbsCont = null;

//요청DB 신규등록
function getJsonStrInsertManual(tbbsId) {
  var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAuaW5zZXJ0SmlzaWs=",
	    "map" : {
		"tbl_pk" : tbbsId,
		"tbl_nm" : "om010",
		"tbbs_cntn" : tbbsCont.GetEditorContent(), //DEXT5.getBodyValue("tbbsCont"),
		"cdb_gb_cd" : $("#csdbdt_optGbKnd").val(),
		"tbbs_ttl" : $("#csdbdt_tfTbbsTtl").val(),
		"intv_lg_cd" : $("#csdbdt_optCounselKnd1").val(),
		"intv_md_cd" : $("#csdbdt_optCounselKnd2").val(),
		"intv_sm_cd" : $("#csdbdt_optCounselKnd3").val(),
		"cntr_nm" : $("#csdbdt_tfCntrNm").html(),
		"rspn_prsn" : $("#csdbdt_charger").val(),//$("#csdbdt_charger").html(),
		"rspn_tel_no" : $("#csdbdt_tfResponTel").val(),//$("#csdbdt_tfResponTel").html(),		
		"use_yn" : $("#csdbdt_optUseYN").val(),
		"ntuse_desc" : $("#csdbdt_tfNtuseDesc").val(),
  		"sendingUid" : usrId,
  		"cc_appr_yn" :$("#csdbdt_chkNotUseYN").val()!=null?$("#csdbdt_chkNotUseYN").val():"N",
	    }
  };
  //상담AP에서 등록했을경우 사용여부
/*  if(checkInnerPopup){
	loParam['map']['cc_appr_yn']="Y";
  }*/
  return encodeURIComponent(JSON.stringify(loParam));
}

//요청DB 수정등록
function getJsonStrUpdateManual() {
  var loParam = {
	    "qt" : "aW5zZXJ0",
		//"qt" : "dXBkYXRl",
	    "mi" : "b20wMTAudXBkYXRlSmlzaWs=",
	    "map" : {
		"tbl_pk" : tblId,
		"tbl_nm" : "om010",
		"tbbs_cntn" : tbbsCont.GetEditorContent(), //DEXT5.getBodyValue("tbbsCont"),
		"cdb_gb_cd" : $("#csdbdt_optGbKnd").val(),
		"tbbs_ttl" : $("#csdbdt_tfTbbsTtl").val(),
		"intv_lg_cd" : $("#csdbdt_optCounselKnd1").val(),
		"intv_md_cd" : $("#csdbdt_optCounselKnd2").val(),
		"intv_sm_cd" : $("#csdbdt_optCounselKnd3").val(),
		"use_yn" : $("#csdbdt_optUseYN").val(),
		"cntr_nm" : $("#csdbdt_tfCntrNm").html(),
		"rspn_prsn" : $("#csdbdt_charger").html(),
		"rspn_tel_no" : $("#csdbdt_tfResponTel").html(),
		"ntuse_desc" : $("#csdbdt_tfNtuseDesc").val(),
		"cc_appr_yn" :$("#csdbdt_chkNotUseYN").val()!=null?$("#csdbdt_chkNotUseYN").val():"N",
		"sendingUid" : usrId,
	    }
  };
  return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrCounselDbConfmDetail(reqId, tblId, wrkId){
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTUuY291bnNlbERiQ29uZm1EZXRhaWw=",
	    "map" : {
		"req_id" : reqId,
		"tbbs_id" : tblId,
		"wrk_id" : wrkId	     
		}
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));	
}
function setSelectBoxWithCodeSync2(code1, code2, code3) {
    $("#csdbdt_optCounselKnd1").val(code1).trigger("change");
    $("#csdbdt_optCounselKnd2").val(code2).trigger("change");
    $("#csdbdt_optCounselKnd3").val(code3);
}
function setJsonStrCounselDbConfmDetail(reqId, tblId, wrkId){
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : getContextPath() + "/ajax/management/counselDbConfmDetail.do",
	data : "pJson=" + getJsonStrCounselDbConfmDetail(reqId, tblId, wrkId),
	success : function(data){
		if(data!=null){
	        setSelectBoxWithCodeSync2(data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);
		    $("#csdbdt_optGbKnd").val(data.CDB_GB_CD);
		    $("#csdbdt_chkNotUseYN").val(data.CC_APPR_YN);
		    org_id = data.ORG_USR_ID;
		    cdb_act = data.CDB_ACT_ST_CD;	    	   
		    $("#csdbdt_tfTbbsId").val(data.TBBS_ID);
		    $("#csdbdt_requstSe").html(data.CDB_REQ_GB_NM);
		    $("#csdbdt_optGbKnd").val(data.CDB_GB_CD);
		    $("#csdbdt_tfTbbsTtl").val(data.TBBS_TTL);
		    $("#csdbdt_tfCntrNm").html(data.CNTR_NM);
		    //$("#csdbdt_charger").html(data.RSPN_PRSN);
		    $("#csdbdt_charger").val(data.RSPN_PRSN);
		    //$("#csdbdt_tfResponTel").html(data.RESPON_TEL);
		    $("#csdbdt_tfResponTel").val(data.RESPON_TEL);
		    $("#csdbdt_optUseYN").val(data.USE_YN);
		    if ($("#csdbdt_optUseYN").val() == "N") {$("#csdbdt_tfNtuseDesc").prop("disabled", false);}
		    $("#csdbdt_tfNtuseDesc").val(data.NTUSE_DESC);
		    // 20.09.07 수정내역 추가
		    $("#csdbdt_tbbsModiCont").val(data.ACT_CONT);
		    g_rspnUsrId = data.RESPON_PRSN;
//		    DEXT5.setHtmlContentsEw(data.COMM_CNTN == null ? "" : data.COMM_CNTN, 'tbbsCont');
		    
			tbbsCont.SetEditorContent(data.COMM_CNTN == null ? "" : data.COMM_CNTN, function() {
				tbbsCont.SetEditMode(3);
			});
			
		    var crt =  data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT +" / "+ (data.CRT_USR_NM == null ? "" : data.CRT_USR_DEPT+" "+ data.CRT_USR_NM);
		    var mod =  data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT +" / "+ (data.MOD_USR_NM == null ? "" : data.MOD_USR_DEPT+" "+ data.MOD_USR_NM);
		    $("#csdbdt_lbCrtInfo").html(crt);
		    $("#csdbdt_lbModInfo").html(mod);
		
	   
	    switch(data.CDB_ACT_ST_CD){
	    case "010100":
		$("#csdbdt_jobRcept").prop('checked', true);
		 checkProCd=false;
		break;
	    case "010200": 
		$("#csdbdt_jobChrgAppn").prop('checked', true);
		checkProCd=false;
		break;
	    case "010400": 
		$("#csdbdt_jobChrgAppn2").prop('checked', true);
		checkProCd=false;
		break;
	    case "020100":
		$("#csdbdt_jobProcess").prop('checked', true);
		checkProCd=false;
		break;
	    case "030100":
		$("#csdbdt_jobCompt").prop('checked', true);
		checkProCd=true;
		break;
	    case "020200":
		$("#csdbdt_jobRetrn").prop('checked', true);
		checkProCd=true;
		break;
	    case "020300":
			$("#csdbdt_jobReqRsn").prop('checked', true);
			$("#csdbdt_tfReqRsn").val(data.RE_MOD_REQ_RSN);
			checkProCd=true;
		break;
	    default: 
		break;
	    }
	    showAttachFiles(tblId);
		 }
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}
function getJsonStrDuplifile(fl_id){   
	var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTkuZHVwbGljYXRl",
	    "map" : {
		"tbl_nm" : "om010",
		"tbl_pk" : tblId,
		"tbl_pk2" : reqId,
		"fl_id" : fl_id,
		"sendingUid" : usrId
		}
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));	
	
}

function getJsonStrDeletefile(){
	var loParam = {
//		    "qt" : "dXBkYXRl", //update 업데이트로 할시 fileDelete가 일어나서 insert로 설정해줌
		    "qt" : "aW5zZXJ0", //insert
		    "mi" : "b20wMTkuZGVsZXRlRmlsZUxpc3Q=", //om019.deleteFileList
		    "map" : {
			"tbl_nm" : "om010",
			"tbl_pk" : tblId
			}
	    };
	    console.log(JSON.stringify(loParam));
	    return encodeURIComponent(JSON.stringify(loParam));		
}

function counselDbconfmDetailUpdateClickEvent() {
	// 21.07.12 상담유형 체크
	var selLgcd = $("#csdbdt_optCounselKnd1").val()=="all";
	var selMdcd = $("#csdbdt_optCounselKnd2").val()=="all";
	var selSmcd = $("#csdbdt_optCounselKnd3").val()=="all";
	
	if ( selLgcd || selMdcd || selSmcd) { 
		alert('상담유형을 선택하시기 바랍니다.');
		if(selLgcd){
			$("#csdbdt_optCounselKnd1").focus();
		}else if(selMdcd){
			$("#csdbdt_optCounselKnd2").focus();
		}else if(selSmcd){
			$("#csdbdt_optCounselKnd3").focus();
		}
		return false;
	}
	
	//hhs 2020.03.09
    if(!checkProCd){
//	alert("요청DB 처리가 완료되지 않았습니다.");
	alert("공무원이 '처리중' 상태입니다.\n'완료' 상태 변경 후 승인할 수 있습니다.");
	return;
    }
    
    //hhs 2020.03.09
    if(cdb_act=="020300"){
    	alert("공무원이 '재작성중' 상태입니다.\n'완료' 상태 변경 후 승인할 수 있습니다.");
    	return;
    }
    
    //hhs 2020.06.19
    if($("#csdbdt_chkNotUseYN").val()=="N" && $("#csdbdt_tfReqRsn").val()==""){
    	alert("재작성요청 사유를 입력해주세요.");
    	return;
    }
    
    var appr = "";
   /* if($("input:radio[name=radio]:checked").val()=="Y"){*/
    if($("#csdbdt_chkNotUseYN").val()=="Y"){
	appr = usrNm+ "님이 승인하였습니다.";
    }else{
	appr = usrNm+ "님이 미승인(재작성요청)하였습니다.";
	cdb_act = "020300";
    }

    var map = {
	    "key" : "value",
	    "cc_appr_yn" :$("input:radio[name=radio]:checked").val(),
	    "tbbs_id" : tblId,
	    "tbbs_id" :tblId,
	    "org_usr_id" : usrId,				
	    "cdb_act_st_cd" :cdb_act,
	    "rtn_rsn" : appr
    };
   var req = $("#csdbdt_requstSe").html(); 
   $.ajax({
	type : "post",
	dataType : "json",
	async : false,
	url : getContextPath() + "/ajax/management/insertManual.do",
	data : "pJson=" + getJsonStr("dXBkYXRl", "b20wMTAuY291bnNlbERiY29uZm1EZXRhaWw=",map),
	success : function(data) {
		if($("#csdbdt_chkNotUseYN").val()=="Y"){
		if(req=="신규"){
			gAppendHidden("csdbdt_writeForm", "pJson", getJsonStrInsertManual(tblId));
		    gSubmitPost("csdbdt_writeForm", true);
		    
		    //oh013 update
		    $.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/management/UpdateManual.do",
				data : "pJson=" + getJsonStr("dXBkYXRl","b20wMTAudXBkYXRlSmlzaWtPbmFwcHI=", {
					"req_id" : reqId,
					"cc_appr_yn" :$("#csdbdt_chkNotUseYN").val()!=null?$("#csdbdt_chkNotUseYN").val():"N"
				}),
				success : function(data) {
					console.log("UPDATE oh013");
					
					//첨부파일
				    for(var i in flids){
						if(flids[i]!=""){
							$.ajax({
								
								type : "post",
								dataType : "json",
								async : true,
								url : getContextPath() + "/ajax/management/insertManualFile.do",
								data : "pJson=" + getJsonStrDuplifile(flids[i]),
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
		}else if(req=="수정"||req=="삭제"){			
			gAppendHidden("csdbdt_writeForm", "pJson", getJsonStrUpdateManual(tblId));
		    gSubmitPost("csdbdt_writeForm", true); 
		    
		    //oh013 update
		    $.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/management/UpdateManual.do",
				data : "pJson=" + getJsonStr("dXBkYXRl","b20wMTAudXBkYXRlSmlzaWtPbmFwcHI=", {
					"req_id" : reqId,
					"cc_appr_yn" :$("#csdbdt_chkNotUseYN").val()!=null?$("#csdbdt_chkNotUseYN").val():"N"
				}),
				success : function(data) {
					console.log("UPDATE oh013");
					
					//첨부파일
				    $.ajax({
						type : "post",
						dataType : "json",
						async : true,
						url : getContextPath() + "/ajax/management/DeleteManualFile.do",
						data : "pJson=" + getJsonStrDeletefile(),
						success : function(data) {	
							for(var i in flids){
							   if(flids[i]!=""){
								   $.ajax({
										type : "post",
										dataType : "json",
										async : true,
										url : getContextPath() + "/ajax/management/insertManualFile.do",
										data : "pJson=" + getJsonStrDuplifile(flids[i]),
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
				},
				error : function(data, status, err) {
				    networkErrorHandler(data, status, err);
				}
			});
		    
		   }
		}else if($("#csdbdt_chkNotUseYN").val()=="N"){
			  $.ajax({
					type : "post",
					dataType : "json",
					async : true,
					url : getContextPath() + "/ajax/management/updateReqRsn.do",
					data : "pJson=" + getJsonStr("aW5zZXJ0", "b20wMTUudXBkYXRlUmVxUnNu", {
						    "req_id" : reqId,
						    "req_rsn" : $("#csdbdt_tfReqRsn").val(),
						    }),
					success : function(data) {
					},
					error : function(data, status, err) {
					    networkErrorHandler(data, status, err);
					}
				    });
		}else{
			alert("예외상황 발생");
		}
	},
	error : function(data, status, err) {
	    networkErrorHandler(data, status, err);
	}
    });
   
	    alert("저장되었습니다.");
	    //hhs 20.04.01 저장 후 리로드/닫기
	    opener.$("#cscfmg_tblCounselDbComfm").trigger("reloadGrid");
	    window.close(); 
}
function requstHis_popupEvent(tbbsId){
	var width = 900;
	var height = 831;
	var top = 0;
	var left = Math.ceil((window.screen.width - width)/2);
	// var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + "/web/civilservice/cswDbManage_processDetailHist.do?tbbsId="+tbbsId;
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
		+ top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "이관이력보기", option);
	newWindow.focus();	
}

//-----------------------------------------file related -------------------------------------------------

//파라미터셋팅 첨부파일
function getJsonFileList(tbbsId){		
  var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		//hhs 2020.03.09
		"tbl_nm" : "oh013",
		"tbl_pk": tbbsId,
		"tbl_pk2": reqId,
		"orderby": "crtTime",
	    }
  };
  console.log(JSON.stringify(loParam));
  return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc){
    var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
//첨부파일 
function showAttachFiles(tbbsId){
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/board/fileList.do",
	data : "pJson=" + getJsonFileList(tbbsId),
	success : function(data){

		var tr = "";
	    /*for(var i in data){
		var url = getContextPath() 
		+ "/file/jisikManageFileDown.do?pJson=" 
		+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

		var tr = "<tr>";
		tr += "<td colspan='4'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
		tr += "<span><a href='" + url + "' title='"+ data[i].LOC_FL_NM +"'>" + data[i].LOC_FL_NM.substring(0,20); + "</a></span></td>";
		tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
//		tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
		tr += "</tr>";

		fileBox_idx++;
		$("#csdbdt_Files").prepend(tr);
	    }

	    if(fileBox_idx >= 3){
		$("#csdbdt_MANUAL").prop("disabled", true);
		$("#csdbdt_rmFilebox").prop("disabled", true);
	    }*/
		for ( var i in data) {
			var url = getContextPath() + "/file/jisikManageFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

			tr += "<tr>";
			tr += "<td colspan='3'>" + "<input type='hidden' name='record_" + data[i].FL_ID + "' value='' />" + "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span>" + "<span>" + data[i].FL_KB_SZ + "</span>";
			
			
			flids.push(data[i].FL_ID);
			fileBox_idx++;
		}	
		$("#csdbdt_Files").empty();
		$("#csdbdt_Files").prepend(tr);
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}

function initEdit(){
//	DEXT5.config.Mode = 'view';
//	//DEXT5.config.Mode = 'edit'; //임시적 mode 처리
//	DEXT5.config.Height  = "562px";
//	DEXT5.config.Width  = "100%";
//	DEXT5.config.zStatusBar = "0";
//	DEXT5.config.zTopMenu = "1";
//	DEXT5.config.zToolBar  = "1";	
//	DEXT5.config.SkinName = "gray";
//	DEXT5.config.EditorHolder = "csdbdt_tbbsCont";
//	var editor = new Dext5editor("tbbsCont");		

	tbbsCont = new KuKudocsEditor(
            /* ID 입력부 */
            'csdbdt_tbbsCont',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '99%',

                //Editor 세로크기
//                height: '562px',
                height: '500px',
                
//                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
                
                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'insertGroup','editGroup', 'headingGroup', 'fontFamilyGroup', 'fontSizeGroup', 'textFormatGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'
                	// image를 제외한 insertGroup 제거
//                	,'link', 'unlink', 'bookmark', 'horizontal', 'date_format', 'background_image', 'video', 'file', 'symbol', 'emoticon', 'upper_lower', 'blockquote', 'layer'
                	], /* Menu Option Hidden list */

                //Editor Load 완료시 호출 Callback Function
                Editor_Complete: dext_editor_loaded_event,

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


//eidt 로드 완료시 세부내용등록
//function dext_editor_loaded_event(editor) {
//    setJsonStrCounselDbConfmDetail(reqId, tblId, wrkId);
//} 
function dext_editor_loaded_event() {
setJsonStrCounselDbConfmDetail(reqId, tblId, wrkId);
} 	

function fn_onClose(){
    window.opener.$("#csdbdt_tblCounselDbComfm").trigger("reloadGrid");   
}

function optCounselKnd1ChangeEvent() {
	setObjectSelectBoxWithCode("csdbdt_optCounselKnd2", "전체", "2", "GCHILD", $("#csdbdt_optCounselKnd1").val(), "", "CHANGE");
}
function optCounselKnd2ChangeEvent() {
    setObjectSelectBoxWithCode("csdbdt_optCounselKnd3", "전체", "3", "GCHILD", $("#csdbdt_optCounselKnd2").val(), "", "");
}

//요청DB 이력등록
function getJsonStrInsertJisik() {
	if(news){
		var wrk_cl = "상담DB신규등록"
	}else{
		var wrk_cl = "상담DB수정등록"	
	}
var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAuY291bnNlbERiaW5zZXJ0RGV0YWls",
	    "map" : {
		"tbl_pk" : tbbsid,
		"tbl_nm" : "oh013", //hhs 20.04.01
		"req_id" : reqid,
		"tbbs_cntn" : tbbsCont.GetEditorContent(), // DEXT5.getBodyValue("tbbsCont"),
		"cdb_gb_cd" : $("#csdbdt_optGbKnd").val(),
		"tbbs_ttl" : $("#csdbdt_tfTbbsTtl").val(),
		"intv_lg_cd" : $("#csdbdt_optCounselKnd1").val(),
		"intv_md_cd" : $("#csdbdt_optCounselKnd2").val(),
		"intv_sm_cd" : $("#csdbdt_optCounselKnd3").val(),
		"use_yn" : $("#csdbdt_optUseYN").val(),
		"sendingUid" : usrId,
		"wrk_cl" : wrk_cl,
		"cc_appr_yn" : "Y"
	    }
};
//상담AP에서 등록했을경우 사용여부
/*  if(checkInnerPopup){
	loParam['map']['cc_appr_yn']="Y";
}*/
return encodeURIComponent(JSON.stringify(loParam));
}

/*
function btnInsertClickEvent() {
}
			    gAppendHidden("csdbdt_writeForm", "pJson", getJsonStrInsertJisik());
			    gSubmitPost("csdbdt_writeForm", true);
			    //alert('등록되었습니다.');
}*/
//file related end------------------------------------------------------------------------------------------------

//init page
$(document).ready(function(){
    initEdit();

    //add event
	setSelectBoxWithCode("csdbdt_optGbKnd", "전체", "90303", "GCHILD", "", "");	 
	setObjectSelectBoxWithCode2("csdbdt_optCounselKnd1", "전체", "1", "GCHILD", "00000000", "", "CHANGE");	
    $("#csdbdt_optCounselKnd1").bind("change", optCounselKnd1ChangeEvent);
    $("#csdbdt_optCounselKnd2").bind("change", optCounselKnd2ChangeEvent);
    $("#csdbdt_optCounselKnd1").trigger("change");
    
    $("#csdbdt_btnInsert").bind("click", counselDbconfmDetailUpdateClickEvent);
    $("#csdbdt_btnDbRecode").click(function(e) {requstHis_popupEvent(tblId);});
    
    window.onbeforeunload = fn_onClose;
});







