var g_popup = "GCHILD";
var fileBox_idx = 0;
var sendingOuCode = opener.sendingOuCode;
var sendingUid = opener.sendingUid;
var commCntn = null;

function getJsonStrShowDetailJisik(tbbsId){
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAuc2VsZWN0SmlzaWs=",
	    "map" : {
		"tbbs_id" : tbbsId,
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));	
}

//파라미터셋팅 첨부파일
function getJsonFileList(tbbsId){		
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbl_nm" : "om010",
		"tbl_pk": tbbsId,
		"orderby": "crtTime",
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStrDbProcessUpdate(){
    var loParam = {
	    "qt" : "dXBkYXRl",
	    "mi" : "b20wMTAudXBkYXRlSmlzaWs=",
	    "map" : {
		"key" : "value",
		"tbl_pk": opener.$("#sendPopupReq").val(), //id
		"tbl_nm" : "om010", 
		"tbbs_cntn" : commCntn.GetEditorContent(), //DEXT5.getBodyValue(), //내용
		"cdb_gb_cd" : $("#procsDbSe").val(), //상태코드
		"tbbs_ttl" : $("#ProcsJobName").val(), //제목
		// "intv_ex_cd" : $("#procsCnsltKnd1").val(), //기관분류
		// "intv_lg_cd" : $("#procsCnsltKnd2").val(), //대분류
		// "intv_md_cd" : $("#procsCnsltKnd3").val(), //중분류
		// "intv_sm_cd" : $("#procsCnsltKnd4").val(), //소분류
		"intv_lg_cd" : $("#procsCnsltKnd1").val(), //대분류
		"intv_md_cd" : $("#procsCnsltKnd2").val(), //중분류
		"intv_sm_cd" : $("#procsCnsltKnd3").val(), //소분류
		"sendingUid" : sendingUid
	    }
    }
    return encodeURIComponent(JSON.stringify(loParam));
}

function btnUpdateClickEvent(){
    if(!confirm("수정 하시겠습니까?"))
	return;
    gAppendHidden("writeForm", "pJson", getJsonStrDbProcessUpdate());			
    gSubmitPost("writeForm", true);
}

function procsCnsltKnd1_srchChangeEvent(){
    $("#procsCnsltKnd2, #procsCnsltKnd3, #procsCnsltKnd4").empty();
    setObjSelectBoxWithCodeM("procsCnsltKnd2", "전체", "2", g_popup, $("#procsCnsltKnd1").val(),"", "CHANGE");}
function procsCnsltKnd2_srchChangeEvent(){
    $("#procsCnsltKnd3, #procsCnsltKnd4").empty();
    setObjSelectBoxWithCodeM("procsCnsltKnd3", "전체", "3", g_popup, $("#procsCnsltKnd2").val(),"", "CHANGE");}
// function procsCnsltKnd3_srchChangeEvent(){
//     $("#procsCnsltKnd4").empty();
//     setObjSelectBoxWithCodeM("procsCnsltKnd4", "전체", "4", g_popup, $("#procsCnsltKnd3").val(),"", "CHANGE");}


// function setSelectBoxWithCnslCodeSync(code1, code2, code3, code4){
//     $("#procsCnsltKnd1").val(code1).trigger("change");
//     $("#procsCnsltKnd2").val(code2).trigger("change");
//     $("#procsCnsltKnd3").val(code3).trigger("change");
//     $("#procsCnsltKnd4").val(code4);
// }
function setSelectBoxWithCnslCodeSync(code1, code2, code3){
    $("#procsCnsltKnd1").val(code1).trigger("change");
    $("#procsCnsltKnd2").val(code2).trigger("change");
    $("#procsCnsltKnd3").val(code3);
}

function getJisikDetail(tbbsId){
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrShowDetailJisik(tbbsId),
	success : function(data){
	    //셀렉트 박스 동기화

	    // var intvExCd = data.INTV_EX_CD;
	    var intvLgCd = data.INTV_LG_CD;
	    var intvMdCd = data.INTV_MD_CD;
	    var intvSmCd = data.INTV_SM_CD;

        // $("#procsCnsltKnd1").val(intvExCd);
        // $("#procsCnsltKnd2").val(intvLgCd);
        // $("#procsCnsltKnd3").val(intvMdCd);
        // $("#procsCnsltKnd4").val(intvSmCd);
	    $("#procsCnsltKnd1").val(intvLgCd);
	    $("#procsCnsltKnd2").val(intvMdCd);
	    $("#procsCnsltKnd3").val(intvSmCd);
	    $("#ProcsJobName").val(data.TBBS_TTL); 																		//업무명
//	    DEXT5.setHtmlValue(data.TBBS_CNTN==null?" ":data.TBBS_CNTN, 'taCommCntn');									// 업무절차	
	    commCntn.SetEditorContent(data.TBBS_CNTN==null?" ":data.TBBS_CNTN);
	    $("#procsCharger").html(data.CNTR_NM +" "+data.RSPN_PRSN) 													// 담당자
	    $("#procsDbSe").val(data.CDB_GB_CD); 																		//DB 구분
	    $("#procsRsctDt").html(data.CRT_DT_FORMAT=="--"?"":data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT);			 //등록
	    $("#ProcsUpdtDt").html(data.MOD_DT_FORMAT=="--"?"":data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT); 			//수정
        // setSelectBoxWithCnslCodeSync(intvExCd, intvLgCd, intvMdCd, intvSmCd);
	    setSelectBoxWithCnslCodeSync(intvLgCd, intvMdCd, intvSmCd);
	    $("#procsRequstSe").html(opener.$("#sendPopupIngStat").val()); 							// 요청구분
	    $("#procsIngStat").html(opener.$("#sendPopupRequSe").val());	   						// 진행상태		
	    $("#procschangeRea").html(opener.$("#sendPopupChageRea").val()); 							// 변경사유

	    //파일첨부
	    showAttachFiles(tbbsId);
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}

function requstHis_popupEvent(){
    var width = 900;
    var height = 831;
    var top = 0;
    var left = Math.ceil((window.screen.width - width)/2);
    // var top = Math.ceil((window.screen.height - height)/2);

    var paramURL = "/web/civilservice/cswDbManage_processDetailHist.do"
    var option = "width=" + width + ", height=" + height
    + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
    + top + ",left=" + left +"";
    var newWindow = window.open(paramURL, "이관이력보기", option);
    newWindow.focus();	
}


//----------------------------------파일 관련-------------------------------------------------

//첨부파일 박스추가
function addFileBox(){
    if (fileBox_idx >= 2){
	alert("첨부파일은 최대 3개까지 가능합니다.");
    }else{
	var html = $("#fileadd tr").parent().html();
	html = html.replace(/XXX/g, "" + ++fileBox_idx);
	$("#procsFiles").append(html);
    }
}

//파라미터셋팅 첨부파일삭제
function getJsonDeleteFile(fileId){
    var loParam = {
	    "qt" : "ZGVsZXRl",
	    "mi" : "b20wMTkuZGVsZXRl",
	    "map" : {
		"key" : "value",
		"fl_id": fileId,
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

//첨부파일박스 삭제
function removeFileBox(i){
    var el = $("#procsFiles input[name=record_" + i + "]");
    el.parent().parent().remove();
    fileBox_idx--;
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc){
    var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
    };
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
//첨부파일 
function showAttachFiles(tbbsId){
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonFileList(tbbsId),
	success : function(data){
	    for(var i in data){
		var url = "/file/jisikManageFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);

		var tr = "<tr>";
		tr += "<td colspan='4'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
		tr += "<span><a href='" + url + "' title='"+ data[i].LOC_FL_NM +"'>" + data[i].LOC_FL_NM.substring(0,20); + "</a></span></td>";
		tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
		tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
		tr += "</tr>";

		fileBox_idx++;
		$("#procsFiles").prepend(tr);
	    }

	    if(fileBox_idx >= 3){
		$("#MANUAL").prop("disabled", true);
		$("#rmFilebox").prop("disabled", true);
	    }
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}
//eidt 로드 완료시 세부내용등록
//function dext_editor_loaded_event(editor) {
//    getJisikDetail(opener.$("#sendPopupReq").val());;    
//} 	

function Editor_Complete(){
  getJisikDetail(opener.$("#sendPopupReq").val());;  
}

function calledit(){
//    DEXT5.config.userFontSize = "10";
//    DEXT5.config.Width  = "100%";
//    DEXT5.config.Mode = 'edit';
//    DEXT5.config.Height  = "586px";
//    DEXT5.config.zStatusBar = "1";
//    DEXT5.config.zTopMenu = "1";
//    DEXT5.config.zToolBar  = "1";	
//    DEXT5.config.SkinName = "gray";
//    DEXT5.config.EditorHolder = "taCommCntn";
//    new Dext5editor("commCntn");
	commCntn = new KuKudocsEditor(
            /* ID 입력부 */
            'taCommCntn',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '100%',

                //Editor 세로크기
                height: '586px',
                
                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',

                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'editGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'
                	// image를 제외한 insertGroup 제거
                	,'link', 'unlink', 'bookmark', 'horizontal', 'date_format', 'background_image', 'video', 'file', 'symbol', 'emoticon', 'upper_lower', 'blockquote', 'layer'
                	], /* Menu Option Hidden list */
               
                //Editor Load 완료시 호출 Callback Function
                Editor_Complete: Editor_Complete,

                //Kaoni Cell Lock Attibute 설정 (Lock 기능 체크하기 위해서는 반드시 Attibute Name 설정)
                cell_lock_name: 'free',

                //사용할 Font Size 설정
                fontSize: [{name: "8pt", value: "8pt"}, {name: "9pt", value: "9pt"}],

                //사용할 Font Family 설정
                fontFamily: [{name: "굴림", value: "굴림"}, {name: "돋움", value: "돋움"}],

                //기본 Font Size
                defaultFontSize: '10pt',

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

                licPathURL : ['/resources/KukudocsEditor/kukudocs.lic']
            });
}

//특수문자 변환 - 미사용
function unhtmlspecialchars(value) { 
    var strr= value.replace(/&amp;/g, '&'); 
    strr = strr.replace( /&#039;/g, '\''); 
    strr =strr.replace( /&quot;/g, '\"'); 
    strr =strr.replace( /&lt;/g, '<'); 
    strr =strr.replace(/&gt;/g, '>'); 
    return strr 
} 

//init page
$(document).ready(function(){
    //셀렉트box 등록
    
    setObjSelectBoxWithCodeM("procsCnsltKnd1", "전체", "", g_popup, "00000000", "", "CHANGE");
    setSelectBoxWithCode2("procsDbSe", "전체", "90303", g_popup, "", "");	  
    //이벤트 등록
    $("#procsCnsltKnd1").bind("change", procsCnsltKnd1_srchChangeEvent);
    $("#procsCnsltKnd2").bind("change", procsCnsltKnd2_srchChangeEvent);
    // $("#procsCnsltKnd3").bind("change", procsCnsltKnd3_srchChangeEvent);
    $("#btnProsInsert").bind("click", btnUpdateClickEvent);
    $("#btnProcsDbRecode").bind("click", requstHis_popupEvent);
});


// common midi
function setObjSelectBoxWithCodeM(selectId, allText, codeType, parentType, parentCode, startValue) {
    var tempObj = {};
    if (parentType == "CHILD") {
	tempObj = g_IntvObectCode2[parentCode];
    } else if (parentType == "GCHILD") {
	tempObj = window.opener.g_IntvObectCode2[parentCode]; // 변경
    } else if (parentType == "G-GCHILD") {
	tempObj = window.opener.opener.g_IntvObectCode2[parentCode]; // 변경
    } else {
	tempObj = g_IntvObectCode[parentCode];
    }
    var localvarParent = "";
    var $selectId = $("#" + selectId);
    var value = "";

    if (!tempObj) {
	var parentChk = parentCode;
	if (codeType == "4") {
	    parentChk = "all";
	}
	if (parentChk == "all") {
	    $selectId.html("");
	    value += "<option value='all' selected>" + allText + "</option>";
	    $selectId.append(value);
	    $selectId.val(parentChk);
	    $selectId.trigger("change");
	    $selectId.trigger("load");
	}
	return;
    }
    if (tempObj == undefined) {
	value += "<option value='all' selected>미선택</option>";
	return;
    }
    $selectId.html("");
    $.each(tempObj, function(key, val) {
	if (localvarParent != parentCode) {
	    localvarParent = parentCode;
	    if (allText == "전체") {
		value += "<option value='all' selected>전체</option>";
	    } else if (allText == "미선택") {
		value += "<option value='all' selected>미선택</option>";
	    }
	}
	if (val.use_yn != "Y") {
	    value += "<option value='" + val.cd + "' disabled>" + val.cd_nm
	    + "</option>";
	} else {
	    value += "<option value='" + val.cd + "'>" + val.cd_nm
	    + "</option>";
	}
    });

    $selectId.append(value);
    if (startValue != "")
	$selectId.val(startValue);
    $selectId.trigger("change");
    $selectId.trigger("load");
}


