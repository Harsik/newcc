var frDate = getPrvDay("Y",1,"-");
var toDate = getDate();
var hisFileForm = "";
var hisFileBox_idx = 0;
var g_popup="CHILD";

//권한관리
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");              //사용자 등급코드
var usrId = window.sessionStorage.getItem("USR_ID");
//var doTitle = document.title;
var infosCommCntn = null;

//DEXT5 에디터 환경셋팅
function editerCall(){	
//    DEXT5.config.userFontSize = "10";
//    DEXT5.config.Mode = 'view';
//    DEXT5.config.Height  = "148px";
//    DEXT5.config.Width  = "948px;";
//    DEXT5.config.zStatusBar = "1";
//    DEXT5.config.zTopMenu = "1";
//    DEXT5.config.zToolBar  = "1";	
//    DEXT5.config.SkinName = "gray";
//    DEXT5.config.EditorHolder = "jsrwhs_infosCommCntn";
//    new Dext5editor("infosCommCntn");	
	infosCommCntn = new KuKudocsEditor(
            /* ID 입력부 */
            'jsrwhs_infosCommCntn',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '948px',

                //Editor 세로크기
                height: '148px',
                
//                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
                
                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'editGroup', 'headingGroup', 'fontFamilyGroup', 'fontSizeGroup', 'textFormatGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup','insertGroup'
                	// image를 제외한 insertGroup 제거
//                	,'link', 'unlink', 'bookmark', 'horizontal', 'date_format', 'background_image', 'video', 'file', 'symbol', 'emoticon', 'upper_lower', 'blockquote', 'layer'
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

//파라미터 셋팅 
function getJsonStrCommentList(TbbsId) {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuc2VsZWN0TGlzdA==",
	    "map" : {
		"key" : "value",
		"frDt" : frDate.replace(/[-, :, \s]/g,""),
		"toDt" : toDate.replace(/[-, :, \s]/g,""),
		"usr_id" : $("#jsrwhs_selJisikCounselNm").val(),
		// "intv_ex_cd" : $("#jsrwhs_commentCounselKnd1").val(),
		// "intv_lg_cd" : $("#jsrwhs_commentCounselKnd2").val(),
		// "intv_md_cd" : $("#jsrwhs_commentCounselKnd3").val(),
		// "intv_sm_cd" : $("#jsrwhs_commentCounselKnd4").val(),
		"intv_lg_cd" : $("#jsrwhs_commentCounselKnd1").val(),
		"intv_md_cd" : $("#jsrwhs_commentCounselKnd2").val(),
		"intv_sm_cd" : $("#jsrwhs_commentCounselKnd3").val(),
		"cdb_gb_cd" : $("#jsrwhs_optGbKnd_his").val(),              //구분
		//"prog_knd_cd" : $("#jsrwhs_progKndCd1").val(),				 //진행상태
		"prog_knd_cd" : !$("#jsrwhs_progKndCd1").val()?"all":$("#jsrwhs_progKndCd1").val(),
		"usr_id" : $("#jsrwhs_selJisikCounselNm").val()==null? usrId : $("#jsrwhs_selJisikCounselNm").val(),
		"srch_type" : $("#jsrwhs_tfSrchType").val(),
		"srch_val" : $("#jsrwhs_progSrchVal").val(),
		"jisikTtl" : jisikTtl,
		"jisikTbbsId": TbbsId, 
		"ccauth" : "N"
	    }
    };
    if(!($("#jsrwhs_checkbox").prop("checked"))){
	loParam["map"]["frDt"]="";
	loParam["map"]["toDt"]="";
    }
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
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

//파라미터 셋팅 counselListExcel
function getJsonStrCommentListExcel(srchtype, srchval, srchDtType, usrId){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuc2VsZWN0TGlzdA==",
	    "map" : {
		"key" : "value",
		"frDt" : frDate.replace(/[-, :, \s]/g,""),
		"toDt" : toDate.replace(/[-, :, \s]/g,""),
		"usr_id" : $("#jsrwhs_selJisikCounselNm").val(),
		// "intv_ex_cd" : $("#jsrwhs_commentCounselKnd1").val(), 				// 기관코드 추가
		// "intv_lg_cd" : $("#jsrwhs_commentCounselKnd2").val(),
		// "intv_md_cd" : $("#jsrwhs_commentCounselKnd3").val(),
		// "intv_sm_cd" : $("#jsrwhs_commentCounselKnd4").val(),
		"intv_lg_cd" : $("#jsrwhs_commentCounselKnd1").val(),
		"intv_md_cd" : $("#jsrwhs_commentCounselKnd2").val(),
		"intv_sm_cd" : $("#jsrwhs_commentCounselKnd3").val(),
		"cdb_gb_cd" : $("#jsrwhs_optGbKnd_his").val(),
		"prog_knd_cd" : $("#jsrwhs_progKndCd1").val(),
		"usr_grd_cd" : usr_grd_cd,
		"usr_id" : $("#jsrwhs_selJisikCounselNm").val(),
		"title" : "상담DB요청처리현황" + setDownLoadName(frDate, toDate),
		//"colWidth" : [15, 20, 50, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20],
		//2019.12.30 hhs 컬럼 넓이 수정
		"colWidth" : [15, 20, 20, 50, 20, 20, 20, 20, 20, 20, 20, 20, 20],
		// "colName" : ["INTV_EX_NM","INTV_LG_NM", "INTV_MD_NM", "INTV_SM_NM", "COMM_TTL", "COMM_NEW", "CRT_DT_FORMAT","CRT_USR_NM","PROG_KND_NM", "MOD_DT_FORMAT", "MOD_USR_NM"],
		// "colHeader" : ["기관분류","상담유형(대)", "상담유형(중)", "상담유형(소)", "제목", "신규여부", "요청일", "요청자","상태", "처리일", "처리자"],
		//"colName" : ["INTV_LG_NM", "INTV_MD_NM", "INTV_SM_NM", "COMM_TTL", "COMM_NEW", "CRT_DT_FORMAT","CRT_USR_NM","PROG_KND_NM", "MOD_DT_FORMAT", "MOD_USR_NM"],
		//"colHeader" : ["상담유형(대)", "상담유형(중)", "상담유형(소)", "제목", "신규여부", "요청일", "요청자","상태", "처리일", "처리자"],
		"colName" : ["INTV_LG_NM", "INTV_MD_NM", "INTV_SM_NM", "COMM_TTL", "COMM_NEW", "CRT_DT_FORMAT","CRT_USR_NM","AFFS_DEPT_NM","AFFS_USR_NM","ORG_USR_ID_NM","PROG_KND_NM", "MOD_DT_FORMAT", "MOD_USR_NM"],
		"colHeader" : ["상담유형(대)", "상담유형(중)", "상담유형(소)", "제목", "신규여부", "요청일", "요청자","담당부서","서무","담당자","상태", "처리일", "처리자"],
		"colAlign" : ["left", "left", "left", "left", "center", "center", "center", "center", "center", "center", "center", "center", "center"],
		"ccauth" : "N",
		"sidx" : $("#jsrwhs_tblComments").getGridParam("sortname"),	// 2020.02.06 엑셀 다운로드 시 정렬방식 수정
		"sord" : $("#jsrwhs_tblComments").getGridParam("sortorder")
	    }
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 modifyCommnet
function getJsonStrModifyComment(commId) {
//    var commCntn =  DEXT5.getBodyValue("infosCommCntn");
    var commCntn =  infosCommCntn.GetEditorContent();
    if(commCntn == "") {
	alert("요청내용이 없습니다.");
	return;
    }
    
    console.log($("#jsrwhs_infosCommNew").val());
    var loParam = {
//	    "qt" : "dXBkYXRl",
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTUudXBkYXRl",
	    "map" : {
		"key" : "value",
		"comm_id" : commId,
		// "intv_ex_cd" : $("#jsrwhs_infosCounselKnd1").val(),
		// "intv_lg_cd" : $("#jsrwhs_infosCounselKnd2").val(),
		// "intv_md_cd" : $("#jsrwhs_infosCounselKnd3").val(),
		// "intv_sm_cd" : $("#jsrwhs_infosCounselKnd4").val(),
		"intv_lg_cd" : $("#jsrwhs_infosCounselKnd1").val(),
		"intv_md_cd" : $("#jsrwhs_infosCounselKnd2").val(),
		"intv_sm_cd" : $("#jsrwhs_infosCounselKnd3").val(),
		"cdb_gb_cd" : $("#jsrwhs_infosGbKnd").val(),		//db구분
		"comm_ttl" : $("#jsrwhs_infosCommTtl").val(),
		"comm_cntn" : commCntn,
		"new_yn" : $("#jsrwhs_infosCommNew").val(), 		//요청구분
		"tbl_nm" : "om015",
		"tbl_pk": commId,
		"message" : "요청 되었습니다."
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 modifyCommnet
/*function getJsonStrSaveComment(commId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTUuc2F2ZQ==",
		"map" : {
			"key" : "value",
			"comm_id" : commId,
			"resp_cntn" : $("#jsrwhs_infosRespCntn").val(),
			"prog_knd_cd" : $("#jsrwhs_progKndCd").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}*/

//파라미터 셋팅 전체리스트
function getJsonStrJisikUserList(){
    // 권한에 따라 셋팅
    var cntrCd = "";
    var teamCd = "";

    //시스템 관리자 or 센터
    if(usrGrdCd == "090100" || usrGrdCd == "060100"){
	cntrCd = "";
	teamCd = "";
    }else{
	cntrCd = window.sessionStorage.getItem("CNTR_CD");
	teamCd = "";
    }

    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMDEuc2VsZWN0TGlzdA==",
	    "map" : {
		"key" : "value",
		"chkRetire" : false,
		"cntr_cd" : cntrCd,
		"team_cd" : teamCd,
		"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
		"sord" : "asc",	
	    }
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//요청자
function setSelectBoxWithMsgUser(){	
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/user/userList.do",
	data : "pJson=" + getJsonStrJisikUserList(),
	success : function(data){
	    $("#jsrwhs_selJisikCounselNm").html("");

	    var value = "";
	    value += "<option value='all'>전체</option>";
	    $.each(data, function(key, state)
		    {
		value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
		    });

	    $("#jsrwhs_selJisikCounselNm").append(value);
	    $("#jsrwhs_selJisikCounselNm").trigger("change");

	    if(usrGrdCd < "030100"){
		$("#jsrwhs_selJisikCounselNm").val(usrId).prop("disabled", true);
	    }else{
		$("#jsrwhs_selJisikCounselNm").val(usrId).prop("disabled", false);
	    }

		if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100"){
			$("#jsrwhs_selJisikCounselNm option:eq(0)").prop("selected",true);
		}
	},
	error : function(data, status, err) {
	    networkErrorHandler(data, status, err);
	}
    });
}


//파라미터셋팅 첨부파일
function getJsonHisFileList(tbbsId){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbl_nm" : "om015",
		"tbl_pk": tbbsId,
		"orderby": "crtTime",
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일삭제
function getJsonDeleteHisFile(fileId)
{
    var loParam = {
	    "qt" : "ZGVsZXRl",
	    "mi" : "b20wMTkuZGVsZXRl",
	    "map" : {
		"key" : "value",
		"fl_id": fileId,
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));
}


//radio click event
function radioBtn_clickEvent(e) {
    switch (e) {
    case "010100":
	// $("#jsrwhs_infosGbKnd, #jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4").prop("disabled", false);
	$("#jsrwhs_infosGbKnd, #jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3").prop("disabled", false);
	$("#jsrwhs_infosCommTtl").prop("readonly", false);
	$("#jsrwhs_infosCommTtl").css("color", "black");
	break;
    case "020100":
	// $("#jsrwhs_infosGbKnd, #jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4").prop("disabled", true);
	$("#jsrwhs_infosGbKnd, #jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3").prop("disabled", true);
	$("#jsrwhs_infosCommTtl").prop("readonly", true);
	$("#jsrwhs_infosCommTtl").css("color", "#6D6D6D");
	break;
    case "030100":
	// $("#jsrwhs_infosGbKnd, #jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4").prop("disabled", true);
	$("#jsrwhs_infosGbKnd, #jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3").prop("disabled", true);
	$("#jsrwhs_infosCommTtl").prop("readonly", true);
	$("#jsrwhs_infosCommTtl").css("color", "#6D6D6D");
	break;
    default:
	break;
    }
}

//셀렉트박스 데이터셋팅
function initHisSelectData(){
/*    $("#jsrwhs_HISMANUAL").prop("disabled", true);
    $("#jsrwhs_rmHisFilebox").prop("disabled", true);*/
    $("#jsrwhs_hisFileInfos").css("display","none");
    setSelectBoxWithMsgUser();
    datePicker("#jsrwhs_selFrDate");
    datePicker("#jsrwhs_selToDate");
    $("#jsrwhs_selFrDate").val(frDate);
    $("#jsrwhs_selToDate").val(toDate);
    // $("#jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4, #jsrwhs_infosCommTtl ,#jsrwhs_infosCommCntn, #jsrwhs_infosGbKnd").attr("disabled",true);
    $("#jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCommTtl ,#jsrwhs_infosCommCntn, #jsrwhs_infosGbKnd").attr("disabled",true);

    // $("#jsrwhs_commentCounselKnd1, #jsrwhs_commentCounselKnd2, #jsrwhs_commentCounselKnd3, #jsrwhs_commentCounselKnd4").empty();
    // $("#jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4").empty();
    $("#jsrwhs_commentCounselKnd1, #jsrwhs_commentCounselKnd2, #jsrwhs_commentCounselKnd3").empty();
    $("#jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3").empty();

    setObjectSelectBoxWithCode2("jsrwhs_commentCounselKnd1", "전체", "1", g_popup, "00000000", "", "CHANGE");
    setObjectSelectBoxWithCode2("jsrwhs_infosCounselKnd1", "전체", "1", g_popup, "00000000", "", "CHANGE");

    setSelectBoxWithCode("jsrwhs_infosCommNew", "전체", "90302", g_popup, "", "");	    // 고객구분 셋팅
    setSelectBoxWithCode("jsrwhs_progKndCd", "전체", "90301", g_popup, "", "");	    // 고객구분 셋팅
    setSelectBoxWithCode("jsrwhs_progKndCd1", "전체", "90301", g_popup, "", "");	    // 고객구분 셋팅
    setSelectBoxWithCode("jsrwhs_optGbKnd_his", "전체", "90303", g_popup, "90303", "");	    // 상담DB구분
    setSelectBoxWithCode("jsrwhs_infosGbKnd", "", "90303", g_popup, "90303", "");	    // 상담DB구분
}

//내용 초기화
function initComment(){
    $("#jsrwhs_btnUpdate").hide();
    $("#jsrwhs_infosCrtUsrNm, #jsrwhs_infosCrtDt, #jsrwhs_infosModUsrNm , #jsrwhs_infosModDt,#jsrwhs_infosRespDept,#jsrwhs_infosMotDt,#jsrwhs_infosProDt, #jsrwhs_infosRespCntn").html("");
    $("#jsrwhs_infosCommId, #jsrwhs_infosCommTtl,#jsrwhs_infosCommNew").val("");
//    DEXT5.setBodyValue('', 'infosCommCntn');
    infosCommCntn.SetEditorContent('');
    hisFileBox_idx = 0;
    $("#jsrwhs_hisFileInfos").empty().append(hisFileForm);
}

function commentCounselKnd1_ChangeEvent(){
    $("#jsrwhs_commentCounselKnd2, #jsrwhs_commentCounselKnd3, #jsrwhs_commentCounselKnd4").empty();
    setObjectSelectBoxWithCode2("jsrwhs_commentCounselKnd2", "전체", "2", g_popup, $("#jsrwhs_commentCounselKnd1").val(), "", "CHANGE");
}
function commentCounselKnd2_ChangeEvent(){
    $("#jsrwhs_commentCounselKnd3, #jsrwhs_commentCounselKnd4").empty();
    setObjectSelectBoxWithCode2("jsrwhs_commentCounselKnd3", "전체", "3", g_popup, $("#jsrwhs_commentCounselKnd2").val(), "", "CHANGE");
}
// function commentCounselKnd3_ChangeEvent(){
//     $("#jsrwhs_commentCounselKnd4").empty();
//     setObjectSelectBoxWithCode2("commentCounselKnd4", "전체", "4", g_popup, $("#jsrwhs_commentCounselKnd3").val(), "", "CHANGE");
// }


function infosCounselKnd1_ChangeEvent(){
    $("#jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4").empty();
    setObjectSelectBoxWithCode2("jsrwhs_infosCounselKnd2", "전체", "2", g_popup, $("#jsrwhs_infosCounselKnd1").val(), "", "CHANGE");
}
function infosCounselKnd2_ChangeEvent(){
    $("#jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4").empty();
    setObjectSelectBoxWithCode2("jsrwhs_infosCounselKnd3", "전체", "3", g_popup, $("#jsrwhs_infosCounselKnd2").val(), "", "CHANGE");
}
// function infosCounselKnd3_ChangeEvent(){
//     $("#jsrwhs_infosCounselKnd4").empty();
//     setObjectSelectBoxWithCode2("infosCounselKnd4", "전체", "4", g_popup, $("#jsrwhs_infosCounselKnd3").val(), "", "CHANGE");
// }

//셀렉트 박스 싱크 
// function setSelectBoxWithCnslCodeSyncHis(code1, code2, code3, code4){
//     $("#jsrwhs_infosCounselKnd1").val(code1).trigger("change");
//     $("#jsrwhs_infosCounselKnd2").val(code2).trigger("change");
//     $("#jsrwhs_infosCounselKnd3").val(code3).trigger("change");
//     $("#jsrwhs_infosCounselKnd4").val(code4);
// }
function setSelectBoxWithCnslCodeSyncHis(code1, code2, code3){
    $("#jsrwhs_infosCounselKnd1").val(code1).trigger("change");
    $("#jsrwhs_infosCounselKnd2").val(code2).trigger("change");
    $("#jsrwhs_infosCounselKnd3").val(code3);
}

//수정요청 상세 보기
function showCommentDetail(commId) {
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/board/selectComment.do",
	data : "pJson=" + getJsonStrSelectComment(commId),
	success : function(data) {
	    initComment();
	    // var intvExCd = data.INTV_EX_CD;
	    var intvLgCd = data.INTV_LG_CD;
	    var intvMdCd = data.INTV_MD_CD;
	    var intvSmCd = data.INTV_SM_CD;
        // setSelectBoxWithCnslCodeSyncHis(intvExCd,intvLgCd, intvMdCd, intvSmCd);
	    setSelectBoxWithCnslCodeSyncHis(intvLgCd, intvMdCd, intvSmCd);
	    $("#jsrwhs_infosCommId").val("");
/*	    $("#jsrwhs_progKndCd").val("");
	    $("#jsrwhs_infosCommNew").val("");
	    $("#jsrwhs_infosGbKnd").val("");*/
	    $("#jsrwhs_infosCommTtl").val("");
	    $("#jsrwhs_infosRespCntn").html("");
	    $("#jsrwhs_infosCrtUsrNm").html("");
	    $("#jsrwhs_infosCrtDt").html("");
	    $("#jsrwhs_infosModUsrNm").html("");
	    $("#jsrwhs_infosMotDt").html("");
	    $("#jsrwhs_infosProDt").html("");
	    $("#jsrwhs_infosRespDept").html("");
	    
	    
	    $("#jsrwhs_infosCommId").val(data.COMM_ID);
	    $("#jsrwhs_progKndCd").val(data.PROG_KND_CD);
	    $("#jsrwhs_infosGbKnd").val(data.CDB_GB_CD);
	    $("#jsrwhs_infosCommTtl").val(data.COMM_TTL);
	    $("#jsrwhs_infosRespCntn").html(data.RESP_CNTN);
	    
	    $("#jsrwhs_infosCrtUsrNm").html(data.CRT_USR_NM);
	    $("#jsrwhs_infosCrtDt").html(data.CRT_DTTM);
	    $("#jsrwhs_infosCommNew").val(data.NEW_YN);
	    $("#jsrwhs_infosMotDt").html(data.MOD_DTTM);
	    $("#jsrwhs_infosProDt").html(data.PRO_DTTM);
	    $("#jsrwhs_infosRespDept").html(data.DEPT_ID_NM);
	    $("#jsrwhs_hisFileInfos").css("display","block");
	    showAttachHisFiles(data.COMM_ID, data.PROG_KND_CD);
	    
	    if(data.PROG_KND_CD == "020200"){
		$(".profile_tbl tr:eq(5) >td:eq(1) ~ ").css("display","none");
		$(".profile_tbl tr:eq(5) >td:eq(1)").attr("colspan","3");
		$(".profile_tbl tr:eq(5) >th:eq(1)").text("반송사유");
		$("#jsrwhs_infosModUsrNm").html(data.RTN_RSN);
	    }else{
		$(".profile_tbl tr:eq(5) >td:eq(1) ~ ").css("display","table-cell");
		$(".profile_tbl tr:eq(5) >td:eq(1)").attr("colspan","1");
		$(".profile_tbl tr:eq(5) >th:eq(1)").text("처리담당자");
		$("#jsrwhs_infosModUsrNm").html(data.ORG_USR_ID_NM);
	    }
	    //접수일때만 변경
	    if(data.PROG_KND_CD == "010100"){
		$("#jsrwhs_btnUpdate").show();				
		//if(dbGrade == "user"){
//		    DEXT5.setEditorMode('edit', 'infosCommCntn');
	    infosCommCntn.SetEditMode(0);
		//}
		$("#jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4, #jsrwhs_infosCommTtl ,#jsrwhs_infosCommCntn, #jsrwhs_infosGbKnd").attr("disabled",false);
		 radioBtn_clickEvent(data.NEW_YN)
	    }else{
		$("#jsrwhs_btnUpdate").hide();
		//DEXT5.setEditorMode('view', 'infosCommCntn');
	    infosCommCntn.SetEditMode(3);		
		$("#jsrwhs_infosCounselKnd1, #jsrwhs_infosCounselKnd2, #jsrwhs_infosCounselKnd3, #jsrwhs_infosCounselKnd4, #jsrwhs_infosCommTtl ,#jsrwhs_infosCommCntn, #jsrwhs_infosGbKnd").attr("disabled",true);

	    }
//	    DEXT5.setHtmlValue(data.COMM_CNTN==null?"":data.COMM_CNTN, 'infosCommCntn');
//	    DEXT5.setHtmlContentsEw(data.COMM_CNTN==null?"":data.COMM_CNTN, 'infosCommCntn');

	    infosCommCntn.SetEditMode(0);
	    infosCommCntn.SetEditorContent(data.COMM_CNTN==null?"":data.COMM_CNTN, function() {
	    	infosCommCntn.SetEditMode(3);
		});
	},
	error : function(data, status, err) {
	    networkErrorHandler(data, status, err);
	}
    });
}

//수정 이벤트
function btnModifyCommentClickEvent() {
    var commId = $("#jsrwhs_infosCommId").val();
    if(document.writeHisForm.HISMANUAL.value != ""){
	var nLimitSize = 0.30; //제한사이즈 MB
	var formName = $("#jsrwhs_writeHisForm input[name=HISMANUAL]");

	for(var i=0; i<formName.length; i++){
	    if(formName[i].value !=""){
		var nRtn=fileCheck(formName[i] , nLimitSize);
		if(nRtn>nLimitSize){ 
		    alert( "[" + (i+1) + "번 파일] : ("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.");
		    return;
		}
		//파일 확장자 체크
		if (fileExtnsCheck(formName[i]) == false) {
		    alert("[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!");
		    return;
		}
	    }
	}
    }	
    gAppendHidden("jsrwhs_writeHisForm", "pJson", getJsonStrModifyComment(commId));
    gSubmitPost("jsrwhs_writeHisForm", true);
    btnInitCommentClickEvent();
/*    setTimeout(function(){
	$("#jsrwhs_tblComments").trigger("reloadGrid");
    }, 400)*/
}

//검색버튼 클릭이벤트
function btnSearchCommentClickEvent(){
    frDate = $("#jsrwhs_selFrDate").val();
    toDate = $("#jsrwhs_selToDate").val();

    $("#jsrwhs_tblComments").jqGrid("setGridParam", {postData : {pJson : getJsonStrCommentList("")}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#jsrwhs_tblComments").trigger("reloadGrid");
}

//초기화 버튼 클릭이벤트
function btnInitCommentClickEvent(){
    $("#jsrwhs_checkbox").attr("checked",false);
    checkboxEvent();
    jisikTtl=null;
    jisikTbbsId=null;
    $("#jsrwhs_progSrchVal").val("");
    frDate = getPrvDay("Y",1,"-");
    toDate = getDate();
    
    initComment();
    initHisSelectData();
    $("#jsrwhs_tblComments").jqGrid("setGridParam", {postData : {pJson : getJsonStrCommentList("")}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
    $("#jsrwhs_tblComments").trigger("reloadGrid")
}

//엑셀저장 버튼 클릭 이벤트
function btnExcelPopup_clickEvent(){
    excelDownLoad(getContextPath() + "/excel/myinfo/jisikRewordHis.do", getJsonStrCommentListExcel("", "", "", ""));
}


//첨부파일 박스추가- .JSP 
function addHisFileBox(){
    if (hisFileBox_idx >= 2){
	alert("첨부파일은 최대 3개까지 가능합니다.");
    }else{
	var html = $("#jsrwhs_hisfileadd tr").parent().html();
	html = html.replace(/XXX/g, "" + ++hisFileBox_idx);
	$("#jsrwhs_hisFileInfos").append(html);
    }
}

//첨부파일박스삭제- .JSP
function removeHisFileBox(i)
{
    var el = $("#jsrwhs_writeHisForm input[name=record_" + i + "]");
    el.parent().parent().remove();
    hisFileBox_idx--;
    
    if(hisFileBox_idx > 2){
	 $("#jsrwhs_hisFileInfos tr:last-child").css("display","none");
   }else{
	$("#jsrwhs_hisFileInfos").css("display","block");
   }
}

//첨부된 파일 삭제
function deleteHisFile(fileId)
{
    if(confirm("첨부된 파일을 삭제하시겠습니까?"))
    {
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : getContextPath() + "/ajax/management/deleteFile.do",
	    data : "pJson=" + getJsonDeleteHisFile(fileId),
	    success : function(data)
	    {
		//파일폼 삭제
		var el = $("#jsrwhs_writeHisForm input[name=record_" + fileId + "]");
		el.parent().parent().remove();

		if(--hisFileBox_idx < 3)
		{
		    $("#jsrwhs_HISMANUAL").prop("disabled", false);
		    $("#jsrwhs_rmHisFilebox").prop("disabled", false);
		}
		
		if(hisFileBox_idx < 3){
			$("#jsrwhs_hisFileInfos tr:last-child").css("display","table-cell");
		    }else{
			$("#jsrwhs_hisFileInfos tr:last-child").css("display","none");
		    }
		
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});
    }
}

//첨부파일 보기
function showAttachHisFiles(tbbsId, deletebtn)
{
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/board/fileList.do",
	data : "pJson=" + getJsonHisFileList(tbbsId),
	success : function(data)
	{
	    var tr="";
	    for(var i in data)
	    {
		var url = getContextPath() 
		+ "/file/jisikManageFileDown.do?pJson=" 
		+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

		tr += "<tr>";
		/*tr += "<td colspan='3'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
		tr += "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span></td>";
		tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
		tr += "<td><a href='javascript:deleteHisFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";*/
		tr += "<td colspan='3'>" +
			"<input type='hidden' name='record_" +data[i].FL_ID + "' value='' />"+
			"<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span>" +
			"<span>" +data[i].FL_KB_SZ  + "</span>";
			"<a class='deletebtn' href='javascript:deleteHisFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[delete]</strong></a>"
			 if(deletebtn == "010100"){
			     tr += "<a class='deletebtn' href='javascript:deleteHisFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[삭제]</strong></a></td>"
			 }else{
			     tr += "</td>";
			 }	
		tr += "</tr>";

		hisFileBox_idx++;
	    }
	    	tr += "<tr>"+
		"<td colspan='4'>"+
			"<input type='hidden' name='record_XXX' value='' />"+
			"<input type='file' id='HISMANUAL' name='MANUAL' style='width: 80%;'/>"+
		"</td>"+
		"<td>" +
			"<img src='/resources/images/btn_del.png'  alt='삭제' class='icon_add'  id='rmHisFilebox' style='cursor: pointer;'  />"+
			"<img src='/resources/images/btn_fileadd.png' onClick='addHisFileBox()' alt='파일폼추가' class='icon_add' style='cursor: pointer;'/>"+
		"</td>"+
	     "</tr>" 
	
		
	    $("#jsrwhs_hisFileInfos").empty();
	    $("#jsrwhs_hisFileInfos").prepend(tr);

/*	    if(hisFileBox_idx > 3)
	    {
		$("#jsrwhs_HISMANUAL").prop("disabled", true);
		$("#jsrwhs_rmHisFilebox").prop("disabled", true);
	    }else{
		    $("#jsrwhs_HISMANUAL").prop("disabled", false);
		    $("#jsrwhs_rmHisFilebox").prop("disabled", false);
	    }*/
	    
	    if(hisFileBox_idx > 2){
		 $("#jsrwhs_hisFileInfos tr:last-child").css("display","none");
	    }else{
		//$("#jsrwhs_hisFileInfos tr:last-child").css("display","table-cell");
	    }
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
    });
}
//첨부파일 다운로드
function getJsonFileDownload(svr, loc)
{
    var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


function checkboxEvent(){
    if($("#jsrwhs_checkbox").prop("checked")){ 
    	$("#jsrwhs_selFrDate").attr("disabled",false);
    	$("#jsrwhs_selToDate").attr("disabled",false);
    }else{
	$("#jsrwhs_selFrDate").attr("disabled",true);
	$("#jsrwhs_selToDate").attr("disabled",true);
    } 
}


//INIT PAGE
$(document).ready(function(){
   // alert(jisikTtl)
	g_popup=jisikTbbsId!=""?"GCHILD":"CHILD";
    if(jisikTtl){
	   $("#jsrwhs_progSrchVal").val(jisikTtl);
	   $("#jsrwhs_checkbox").attr("checked",true);
	   
    }else{
 	   $("#jsrwhs_checkbox").attr("checked",false);
 	  checkboxEvent();
    }
    
    //권한관리
    var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");
    var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");              //사용자 등급코드
    var usrId = window.sessionStorage.getItem("USR_ID");
    
    if(usr_grd_cd == "090100")
    {
	$("#jsrwhs_selJisikCounselNm").prop("disabled", false);
    }
    
    editerCall();
    initHisSelectData();	
    hisFileForm = $("#jsrwhs_hisFileInfos tr").parent().html();
    var tbbsid = jisikTbbsId!=null?jisikTbbsId:"";
	
    $("#jsrwhs_tblComments").jqGrid({
	url : getContextPath() + "/jqgrid/myinfo/comments.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrCommentList(tbbsid)
	},
	colNames : ["번호", "상담유형", "제목", "요청구분","담당부서","서무", "상  태", "요청일", "처리일"],
	colModel :
	    [
	     { name : "COMM_ID", index : "COMM_ID", hidden : true },
	     { name : "INTV_NM", index : "INTV_NM", align : "left", width : 110 },
	     { name : "COMM_TTL", index : "COMM_TTL", align : "left", width : 110 },
	     { name : "COMM_NEW", index : "COMM_NEW", align : "center", width : 30 },
	     { name : "AFFS_DEPT_NM", index : "AFFS_DEPT_NM", align : "center", width : 50 },
	     { name : "AFFS_USR_NM", index : "AFFS_USR_NM", align : "center", width : 40 },
	     { name : "PROG_KND_NM", index : "PROG_KND_NM", align : "center", width : 50 },
	     { name : "CRT_DTTM", index : "CRT_DTTM", align : "center", width : 50 },
	     { name : "ACT_DTTM", index : "ACT_DTTM", align : "center", width : 50 }
	     ],
	     sortname : "CRT_DTTM",
	     sortorder : "desc",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "130",
	     width : "600",
	     rowNum : 5,
	     rowList : [5, 20, 50],
	     autowidth : true,
	     pager : "#jsrwhs_pgTblComments",
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords: true,
	     onSelectRow : function(rowid){
		 var row = $("#jsrwhs_tblComments").getRowData(rowid);
		 showCommentDetail(row.COMM_ID);
	     },
	     onPaging : function(pgButton) { }
    }).jqGrid("navGrid", "#jsrwhs_pgTblComments", {edit : false, add : false, del : false, search : false});
    
    //add event
    $("#jsrwhs_commentCounselKnd1").bind("change", commentCounselKnd1_ChangeEvent);
    $("#jsrwhs_commentCounselKnd2").bind("change", commentCounselKnd2_ChangeEvent);
    // $("#jsrwhs_commentCounselKnd3").bind("change", commentCounselKnd3_ChangeEvent);
    $("#jsrwhs_infosCounselKnd1").bind("change", infosCounselKnd1_ChangeEvent);
    $("#jsrwhs_infosCounselKnd2").bind("change", infosCounselKnd2_ChangeEvent);
    // $("#jsrwhs_infosCounselKnd3").bind("change", infosCounselKnd3_ChangeEvent);
    $("#jsrwhs_commentCounselKnd1").trigger("change");
    $("#jsrwhs_infosCounselKnd1").trigger("change");
    $("#jsrwhs_btnCommentSearch").bind("click", btnSearchCommentClickEvent);
    $("#jsrwhs_btnCommentInit").bind("click", btnInitCommentClickEvent);
    $("#jsrwhs_btnExcel").bind("click", btnExcelPopup_clickEvent);
    $("#jsrwhs_btnUpdate").bind("click", btnModifyCommentClickEvent);
//    $('#jsrwhs_btnCommentInit').bind('click', function() {DEXT5.setEditorMode('view', 'infosCommCntn');});
    $('#jsrwhs_btnCommentInit').bind('click', function() {infosCommCntn.SetEditMode(3)});
    $("#jsrwhs_checkbox").bind('click',checkboxEvent);

    // 로딩시 숨김버튼, #jsrwhs_btnSave
    $("#jsrwhs_btnUpdate, #jsrwhs_btnSave").hide();
    if(window.sessionStorage.getItem("TBBS_ID")!=null){
        $("#jsrwhs_tblComments").jqGrid("setGridParam", {postData : {pJson : getJsonStrCommentList(window.sessionStorage.getItem("TBBS_ID"))}, page : 1, sortname : "CRT_DTTM", sortorder : "desc"});
        $("#jsrwhs_tblComments").trigger("reloadGrid");
    }
    
});