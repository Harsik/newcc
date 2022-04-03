//var oEditors = [];
var deptArr = [];
var teamCds = [];
var tbbsClCd = "";
var cbMsg = "";
var boardType = [];
var tbbsId = "";
var file_num = 0;
var inputFile = [];
var CntnData=""


//공무원 업무 부서코드, uid 추가
var sendingOuCode = opener.sendingOuCode;
var sendingUid = opener.sendingUid;

var editor1 = null;

//파라미터 셋팅 select 
function getJsonStrSelectNotify(tbbsId) {
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAuY2l2aWxTZWxlY3Q=",
	    "map" : {
		"key" : "value",
		"tbbs_id" : tbbsId,
		"sendingUid" : sendingUid
	    }
    };
    
    return encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅 insertNotify  
function getJsonStrInsertNotify(tbbsId) {
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAuY2l2aWxJbnNlcnQ=",
	    "map" : {
		"key" : "value",
		"tbbs_ttl" : $("#tfTbbsTtl").val(),
		"tbbs_cntn" : editor1.GetEditorContent(), //DEXT5.getBodyValue("editor1"),
		"emrg_yn" : $("#optEmrgYN").val(),
		"tbbs_cl_cd" : tbbsClCd, //게시물 구분코드
		"tbbs_strt_dt" : $("#tfTbbsStrtDt").val().replace(/-/g, ""),
		"tbbs_end_dt" : $("#tfTbbsEndDt").val().replace(/-/g, ""),
		"tbl_nm" : "om010",
		"tbl_pk": tbbsId,
		"sendingUid": sendingUid, 
		"callback" : "cbInsert"
	    }
    };
   
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 updateNotify
function getJsonStrUpdateNotify(tbbsId) {
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTAuY2l2aWxVcGRhdGU=",
	    "map" : {
		"key" : "value",
		"tbbs_id" : tbbsId,
		"tbbs_ttl" : $("#tfTbbsTtl").val(),
		"tbbs_cntn" : editor1.GetEditorContent(), //DEXT5.getBodyValue("editor1"),
		"emrg_yn" : $("#optEmrgYN").val(),
		"tbbs_strt_dt" : $("#tfTbbsStrtDt").val().replace(/-/g, ""),
		"tbbs_end_dt" : $("#tfTbbsEndDt").val().replace(/-/g, ""),
		"tbl_nm" : "om010",
		"tbl_pk": tbbsId,
		"sendingUid": sendingUid,
		"callback" : "cbInsert"
	    }
    };
    
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 selectAuthList 
function getJsonStrSelectAuth(cds) {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "c20wMDIuc2VsZWN0QXV0aA==",
	    "map" : {
		"key" : "value",
		"cds" : cds
	    }
    };
    
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 checkGrdCd 
function getJsonCheckGrdCd() {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDIuY2hlY2tHcmRDZA==",
		"map" : {
			"key" : "value"
		}
	};
	
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 insertAuth
function getJsonStrInsertAuth(tbbsId, teamCd) {
    var loParam = {
	    "qt" : "aW5zZXJ0",
	    "mi" : "b20wMTIuaW5zZXJ0",
	    "map" : {
		"key" : "value",
		"tbbs_id" : tbbsId,
		"team_cd" : teamCd
	    }
    };
    
    return encodeURIComponent(JSON.stringify(loParam));
}

//게시글 권한 가져오기
function getJsonStrSelectAuthList(tbbsId) {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTIuc2VsZWN0TGlzdA==",
	    "map" : {
		"tbbs_id" : tbbsId
	    }
    };
    
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 deleteAuth
function getJsonStrDeleteAuth(tbbsId) {
    var loParam = {
	    "qt" : "ZGVsZXRl",
	    "mi" : "b20wMTIuZGVsZXRl",
	    "map" : {
		"tbbs_id" : tbbsId
	    }
    };
    
    return encodeURIComponent(JSON.stringify(loParam));
}

//공지사항 next value
function getNextValue() {
    var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b20wMTAubmV4dHZhbA==",
	    "map" : {}
    };
    
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 fileList
function getJsonNotifyBoardFileList(tbbsId) {		
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbl_nm" : "om010",
		"tbl_pk": tbbsId,
		"orderby": "crtTime"
	    }
    };
    
    return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 deleteFile
function getJsonDeleteNotifyBoardFile(fileId) {
    var loParam = {
	    "qt" : "ZGVsZXRl",
	    "mi" : "b20wMTkuZGVsZXRl",
	    "map" : {
		"key" : "value",
		"fl_id": fileId
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

//첨부파일 박스추가
var fileBox_idx = 0;
function addFileBox() {
    if (fileBox_idx >= 4) {
	alert("첨부파일은 최대 5개까지 가능합니다.");
    } else {
	var html = $("#fileadd tr").parent().html();
	html = html.replace(/XXX/g, "" + ++fileBox_idx);
	$("#fileInfos").append(html);
    }
}

//첨부파일 박스삭제
function removeFileBox(i) {
    var el = $("#writeForm input[name=record_" + i + "]");
    if (el.next().val() == "add") {
	el.parent().parent().remove();
	fileBox_idx--;
    } else {
	el.next().val("remove");
	el.parent().parent().hide();
    }
}

//첨부된 파일 삭제
function deleteFile(fileId)
{
    if(confirm("첨부된 파일을 삭제하시겠습니까?"))
    {
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : "/ajax/civilservice/csw.do",
	    data : "pJson=" + getJsonDeleteNotifyBoardFile(fileId),
	    success : function(data)
	    {
		//파일폼 삭제
		var el = $("#writeForm input[name=record_" + fileId + "]");
		el.parent().parent().remove();

		if(--fileBox_idx < 5)
		{
		    $("#BOARD").prop("disabled", false);
		    $("#btnRmFilebox").prop("disabled", false);
		}
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});
    }
}

//등록 콜백 함수
function cbInsert(){
    //alert(cbMsg);
    window.sessionStorage.removeItem("BOARD_TYPE");
    window.sessionStorage.removeItem("TBBS_ID");
    window.opener.btnNotifyInitClickEvent();
    //window.opener.reloadNoticeBar();		// 메인화면 하단 공지사항 올라오는 부분인것 같은데... notifyBoard.js엔 없음
    window.close();
}


//등록버튼 클릭이벤트
function btnInsertClickEvent()
{
    if (confirm("게시글을 등록 하시겠습니까?"))
    {
	var rMsg = validator();

	if(rMsg != "")
	{
	    alert(rMsg);
	    return;
	}

	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : "/ajax/civilservice/csw.do",
	    data : "pJson=" + getNextValue(),
	    success : function(data)
	    {
		gAppendHidden("writeForm", "pJson", getJsonStrInsertNotify(data.TBBS_ID));
		gSubmitPost("writeForm", true);
		alert(cbMsg);
		//alert("gSubmitPost : " + rtnSumit);			
		
		//alert(teamCds) 
		//게시물열람기본 권한정보 등록 권한 등록버튼을 통해서 teamCds를 가져옴
		/*for(var i = 0; i < teamCds.length; i++)
		{
		    $.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/insertAuth.do",
			data : "pJson=" + getJsonStrInsertAuth(data.TBBS_ID, teamCds[i]),
			success : function(data) { 
			},
			error : function(data, status, err)
			{
			    networkErrorHandler(data, status, err);
			}
		    });
		}*/
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});
    }
}

//수정버튼 클릭이벤트
function btnUpdateClickEvent() {
    if (confirm("게시글을 수정 하시겠습니까?")) {
	var rMsg = validator();

	if(rMsg != "") {
	    alert(rMsg);
	    return;
	}

	gAppendHidden("writeForm", "pJson", getJsonStrUpdateNotify(tbbsId));
	gSubmitPost("writeForm", true);
	alert(cbMsg);

	//게시물열람정보 수정
/*	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : false,
	    url : getContextPath() + "/ajax/civilservice/csw.do",
	    data : "pJson=" + getJsonStrDeleteAuth(tbbsId),
	    success : function(data)
	    {
		//수정 게시물열람기본 권한정보 등록
		for(var i = 0; i < teamCds.length; i++)
		{
		    $.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/civilservice/csw.do",
			data : "pJson=" + getJsonStrInsertAuth(tbbsId, teamCds[i]),
			success : function(data)
			{
			    //console.log(i + "번째 정보 등록!!"); 
			},
			error : function(data, status, err)
			{
			    networkErrorHandler(data, status, err);
			}
		    });
		}
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});*/
    }
}

//권한등록버튼 클릭이벤트
function btnRegBoardAuthClickEvent() {
    var width = 300;
    var height = 450;
    var paramURL = "/ajax/civilservice/csw.do";

    deptArr = window.showModalDialog(paramURL, teamCds, "dialogWidth:" + width + "px; dialogHeight:" + height + "px; center=yes; resizable=no; status=no; scroll=no; help=no;");
    
    //선택된 ID로 부서정보 가져오기
    if(deptArr != null && deptArr.length > 0) {
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : "/ajax/civilservice/csw.do",
	    data : "pJson=" + getJsonStrSelectAuth(deptArr),
	    success : function(data) {
		teamCds = [];
		var str = "";

		for(var i = 0; i < data.length; i++) {
		    if(i === data.length - 1) {
			str += data[i].CD_NM;
		    }
		    else{
			str += data[i].CD_NM + ", ";
		    }
		    teamCds.push(data[i].CD);
		}
		$("#tfRegBoardAuth").val(str);
	    },
	    error : function(data, status, err)
	    {
		networkErrorHandler(data, status, err);
	    }
	});
    } else {
	teamCds = [];
	$("#tfRegBoardAuth").val("");
    }
}

//입력 검증
function validator()
{
    var rMsg = "";

    if($("#tfTbbsTtl").val().trim() == "")
	rMsg += "\n제목을 입력해 주세요."; 

    // var cntn = oEditors.getById["taTbbsCntn"].getIR();
    var cntn = editor1.GetEditorContent(); //DEXT5.getBodyValue("editor1");

    if(cntn.trim() == "")
	rMsg += "\n내용을 입력해 주세요.";

    /*if(teamCds.length <= 0)
	rMsg += "\n하나 이상의 열람권한이 필요합니다.";*/

    if($("#tfTbbsStrtDt").val() == "")
	rMsg += "\n시작일자를 입력해주세요.";

    if($("#tfTbbsEndDt").val() == "")
	rMsg += "\n종료일자를 입력해주세요.";

    var d_tbbsStrtDt = new Date($("#tfTbbsStrtDt").val().substr(0, 4), $("#tfTbbsStrtDt").val().substr(4, 2), $("#tfTbbsStrtDt").val().substr(6, 2));
    var d_tbbsEndDt = new Date($("#tfTbbsEndDt").val().substr(0, 4), $("#tfTbbsEndDt").val().substr(4, 2), $("#tfTbbsEndDt").val().substr(6, 2));

    if(d_tbbsStrtDt > d_tbbsEndDt)
	rMsg += "\n시작일이 종료일보다 큽니다.";

    //파일 업로드 용량 체크
    var nLimitSize = 10; //제한사이즈 MB
    var formName = $("#writeForm input[name=BOARD]");
    for(var i=0; i<formName.length; i++){
	if(formName[i].value !=""){
	    //파일용량 체크
	    var nRtn=fileCheck(formName[i] , nLimitSize);
	    if(nRtn>nLimitSize){ 
		rMsg += "\n\n[" + (i+1) + "번 파일] : ("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.";
	    }

	    //파일 확장자 체크
	    if (fileExtnsCheck(formName[i]) == false)
		rMsg += "\n\n[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";						
	}
    }

    return rMsg;
}

//초기화버튼 클릭이벤트
function btnInitClickEvent()
{
    $("#tfTbbsTtl").val("");

//    DEXT5.setBodyValue('', 'editor1');
    editor1.SetEditorContent('');
    teamCds = [];
    $("#tfRegBoardAuth").val("");
    $("#optEmrgYN").val("N");
    $("#tfTbbsStrtDt").val(getDate());
    $("#tfTbbsEndDt").val(getDate());

    //파일첨부박스 관련 처리 추가필요
}

//닫기버튼 클릭이벤트 등록
function btnCloseClickEvent() {
    window.close();
    window.opener.$("#deptBbstblNotifyList").trigger("reloadGrid");
}

function initDate(){
    datePicker("#tfTbbsStrtDt");
    datePicker("#tfTbbsEndDt");
    $("#tfTbbsStrtDt").val(getDate());
    $("#tfTbbsEndDt").val(getDate());
}


/*function dext_editor_loaded_event(editor) {
    if (boardType[1] === "modify") {
//	DEXT5.setHtmlValue(CntnData, 'editor1');
	editor1.SetEditorContent(CntnData);
    }
    } 
*/
function Editor_Complete(){
    if (boardType[1] === "modify") {
    	editor1.SetEditorContent(CntnData);
    }
} 

function initEdit(){
	editor1 = new KuKudocsEditor(
            /* ID 입력부 */
            'divNotiEditor',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '100%',

                //Editor 세로크기
//                height: '250px',
                
                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
                
                //Hidden Menu 설정
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

//Init page
$(document).ready(function() {

    initDate();    
    initEdit();
    boardType = window.sessionStorage.getItem("BOARD_TYPE").split(".");    // 게시판정보 가져오기
    
    //================================== 부서게시판 등록시==============================================
    if (boardType[1] === "insert") {
	$("#b_title").html("공지게시판 등록");
	//$("#b_usrNm").html("작성자");
	$("#b_dt").html("작성일자");
	$("#btnInsert").html("저장");
	cbMsg = "등록되었습니다.";
	tbbsClCd = boardType[0]; //게시판 구분코드임  050100

	
	
	// 등급코드 확인하여 팀장급 이하일경우 팀정보 가져오기 자신이 속한부서
/*	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : getContextPath()+ "/ajax/civilservice/csw.do",
	    data : "pJson=" + getJsonCheckGrdCd(),
	    success : function(data) {
		if (data != null) {  //자신이 속한팀정보를 가져옴
		    deptArr.push(data.CD);
		    teamCds.push(data.CD); 
		    $("#tfRegBoardAuth").val(data.CD_NM);
		    $("#btnRegBoardAuth").hide(); 
		} else{
		    $("#btnRegBoardAuth").show(); //그렇지 않으면 보여줌
		} },
	    error : function(data, status, err) {
		networkErrorHandler(data, status, err);
	    }
	});*/

	//등록권한 없음 .. 권한없이 글쓰기.. manager가보고 결정
	
	
	// 등록버튼 클릭이벤트 등록
	$("#btnInsert").bind("click", btnInsertClickEvent);
	
    } 
    //================================== 부서게시판 수정시==============================================
    else if (boardType[1] === "modify")
    {
	$("#b_title").html("공지게시판 수정");
	$("#b_usrNm").html("수정자");
	$("#b_dt").html("수정일자");
	$("#btnInsert").html("저장");
	cbMsg = "수정되었습니다.";
	tbbsId = window.sessionStorage.getItem("TBBS_ID");
	
	// content setting
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : "/ajax/civilservice/csw.do",
	    data : "pJson=" + getJsonStrSelectNotify(tbbsId),
	    success : function(data) {
		$("#tfTbbsTtl").val(data.TBBS_TTL);
		$("#optEmrgYN").val(data.EMRG_YN === '긴급' ? 'Y' : 'N');
		$("#tfTbbsStrtDt").val(data.TBBS_STRT_DT_FORMAT);
		$("#tfTbbsEndDt").val(data.TBBS_END_DT_FORMAT);
		CntnData=data.TBBS_CNTN;
	    },
	    error : function(data, status, err) {
		networkErrorHandler(data, status, err);
	    }
	});

	
	// 권한정보
/*	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : getContextPath()+ "/ajax/civilservice/csw.do",
	    data : "pJson=" + getJsonStrSelectAuthList(tbbsId),		//게시물에 대한 권한가져오기
	    success : function(data) {
		var str = "";

		for (var i = 0; i < data.length; i++) {
		    if (i === data.length - 1) {
			str += data[i].CD_NM;
		    }
		    else {
			str += data[i].CD_NM + ", ";
		    }
		    teamCds.push(data[i].TEAM_CD);
		}
		$("#tfRegBoardAuth").val(str);
	    },
	    error : function(data, status, err) {
		networkErrorHandler(data, status, err);
	    }
	});*/

	
	//첨부파일 가져오기
	$.ajax({
	    type : "post",
	    dataType : "json",
	    async : true,
	    url : "/ajax/civilservice/csw.do",
	    data : "pJson="+ getJsonNotifyBoardFileList(tbbsId),
	    success : function(data) {
		for ( var i in data) {
		    var url = "/file/notifyBoardFileDown.do?pJson="+ getJsonFileDownload(data[i].SVR_SV_PTH,data[i].LOC_FL_NM);
		    var tr = "<tr id='" + data[i].FL_ID+ "'>";
		    tr += "<td class='line_noline' colspan='3'>";
		    tr += "<input type='hidden' name='record_"+ data[i].FL_ID + "' value='' />";
		    tr += "<span><a href='" + url+ "'>" + data[i].LOC_FL_NM+ "</a></span></td>";
		    tr += "<td class='line_b_text' colspan='2'>";
		    tr += "<span>" + data[i].FL_KB_SZ+ "</span>&nbsp;";
		    tr += "<a href='javascript:deleteFile("+ data[i].FL_ID+ ")' style='text-decoration: none;'><strong>X</strong></a></td>";
		    tr += "</tr>";

		    fileBox_idx++;
		    $("#fileInfos").parent().append(tr);
		}

		if (fileBox_idx >= 5) {
		    $("#BOARD").prop("disabled", true);
		    $("#btnRmFilebox").prop("disabled",true);
		}
	    },
	    error : function(data, status, err) {
		networkErrorHandler(data, status, err);
	    }
	});

	//수정버튼 클릭이벤트 등록
	$("#btnInsert").bind("click", btnUpdateClickEvent);
    } else {
	alert("게시판 정보를 알수없습니다.");
	window.close();
    }

    //작성자와 작성일 등록
    var usrNm = window.sessionStorage.getItem("USR_NM");
    var today = new Date().toISOString().substring(0, 10);
    $("#tfUsrNm").val(usrNm);
    $("#tfDt").val(today);

    window.sessionStorage.removeItem("BOARD_TYPE");
    window.sessionStorage.removeItem("TBBS_ID");

    //초기화버튼 클릭이벤트 등록
    //권한등록버튼 클릭이벤트 등록
    //닫기버튼 클릭이벤트 등록
    $("#btnInit").bind("click", btnInitClickEvent);
    $("#btnRegBoardAuth").bind("click", btnRegBoardAuthClickEvent);
    $("#btnClose").bind("click", btnCloseClickEvent);
    
    //자식창이 닫힐때 
    window.onbeforeunload = btnCloseClickEvent;
});

