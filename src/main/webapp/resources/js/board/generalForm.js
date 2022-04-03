//var oEditors = [];
var tbbsClCd = "";
var file_num = 0;
var cbMsg = "";
var inputFile = [];
var editor1 = null;

//파라미터 셋팅 selectGeneral
function getJsonStrSelectGeneral(tbbsId) {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTAuc2VsZWN0",
			"map" : {
				"key" : "value",
				"tbbs_id" : tbbsId,
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertGeneral
function getJsonStrInsertGeneral(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbbs_ttl" : $("#gnrFrm_tfTbbsTtl").val(),
			
			//"tbbs_cntn" : oEditors.getById["taTbbsCntn"].getIR(),
			"tbbs_cntn" : editor1.GetEditorContent(), //DEXT5.getBodyValue("editor1"),
			
			"tbbs_cl_cd" : tbbsClCd,
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 updateGeneral
function getJsonStrUpdateGeneral(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAudXBkYXRl",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"tbbs_ttl" : $("#gnrFrm_tfTbbsTtl").val(),
			//"tbbs_cntn" : oEditors.getById["taTbbsCntn"].getIR(),
			"tbbs_cntn" : editor1.GetEditorContent(), //DEXT5.getBodyValue("editor1"),
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 공지사항 next value
function getNextValue() {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTAubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 fileList
function getJsonGeneralBoardFileList(tbbsId) {		
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
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 deleteFile
function getJsonDeleteGeneralBoardFile(fileId) {
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

//첨부파일 박스추가
var fileBox_idx = 0;
function addFileBox() {
	if (fileBox_idx >= 4) {
		alert("첨부파일은 최대 5개까지 가능합니다.");
	} else {
		var html = $("#gnrFrm_fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#gnrFrm_fileInfos").append(html);
	}
}

//첨부파일박스삭제
function removeFileBox(i) {
	var el = $("#gnrFrm_writeForm input[name=record_" + i + "]");
	if (el.next().val() == "add") {
		el.parent().parent().remove();
		fileBox_idx--;
	} else {
		el.next().val("remove");
		el.parent().parent().hide();
	}
}

//첨부된 파일 삭제
function deleteFile(fileId) {
	if(confirm("첨부된 파일을 삭제하시겠습니까?")) {
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteFile.do",
			data : "pJson=" + getJsonDeleteGeneralBoardFile(fileId),
			success : function(data) {
				//파일폼 삭제
				var el = $("#gnrFrm_writeForm input[name=record_" + fileId + "]");
					el.parent().parent().remove();
					if(--fileBox_idx < 5) {
						$("#gnrFrm_BOARD").prop("disabled", false);
						$("#gnrFrm_btnRmFilebox").prop("disabled", false);
					}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 등록 게시판정보
function cbInsert() {
	alert(cbMsg);
 
	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	 
	 window.opener.location.reload(true);
	 selfClose();
}

// 등록버튼 클릭이벤트
function btnInsertClickEvent() {
	if (confirm("게시글을 등록 하시겠습니까?")) {
		var rMsg = validator();
		if(rMsg != "") {
			alert(rMsg);
			return;
		}
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/insertGenenral.do",
			data : "pJson=" + getNextValue(),
			success : function(data) {
				gAppendHidden("gnrFrm_writeForm", "pJson", getJsonStrInsertGeneral(data.TBBS_ID));
				gSubmitPost("gnrFrm_writeForm", true);
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//수정버튼 클릭이벤트
function btnUpdateClickEvent() {
	if(confirm("게시글을 수정 하시겠습니까?")) {
		var rMsg = validator();
		if(rMsg != "") {
			alert(rMsg);
			return;
		}
		var tbbsId = window.sessionStorage.getItem("TBBS_ID");
		gAppendHidden("gnrFrm_writeForm", "pJson", getJsonStrUpdateGeneral(tbbsId));
		gSubmitPost("gnrFrm_writeForm", true);
	}
}

//파일박스 내용삭제
function btnRmFileBoxClickEvent() {
	inputFile[1] = inputFile[0].clone(true);
	$("#gnrFrm_BOARD").replaceWith(inputFile[1]);
}

//입력검증
function validator() {
	var rMsg = "";
	
	var tbbsTtl = $("#gnrFrm_tfTbbsTtl").val();
	if(tbbsTtl.trim() == "") {
		rMsg += "\n제목을 입력해 주세요."; 
	}
	
	//var cntn = oEditors.getById["taTbbsCntn"].getIR();
	var cntn = editor1.GetEditorContent(); //DEXT5.getBodyValue("editor1");
	if(cntn.trim() == "") {
		rMsg += "\n내용을 입력해 주세요.";
	}
	
	//파일 업로드 용량 체크
	var nLimitSize = 300; //제한사이즈 MB
	var formName = $("#gnrFrm_writeForm input[name=gnrFrm_BOARD]");
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

// 초기화버튼 클릭이벤트
function btnInitClickEvent() {
	$("#gnrFrm_tfTbbsTtl").val("");
	
	//oEditors.getById["taTbbsCntn"].exec("SET_IR", [""]);
	//DEXT5.setBodyValue('', 'editor1');
	editor1.SetEditorContent('');
} 

//닫기버튼 클릭이벤트 등록
function btnCloseClickEvent() {
	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	 
	 window.opener.location.reload(true);
	 selfClose();
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {		
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function initEditor(){
	editor1 = new KuKudocsEditor(
            /* ID 입력부 */
            'gnrFrm_divTbbsCntn',

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

$(document).ready(function() {
	//파일폼 복사
	inputFile.push($("#gnrFrm_BOARD").clone());
	initEditor();
	
	//게시판정보 가져오기
	var boardType  = window.sessionStorage.getItem("BOARD_TYPE").split(".");
	
	//일반게시판 등록
	if(boardType[1] === "insert"){
		$("#gnrFrm_b_title").html("일반게시판 등록");
		$("#gnrFrm_b_usrNm").html("작성자");
		$("#gnrFrm_b_dt").html("작성일자");
		$("#gnrFrm_btnInsert").html("저장");
		cbMsg = "등록되었습니다.";
		tbbsClCd = boardType[0];
		
		//등록버튼 클릭이벤트 등록
		$("#gnrFrm_btnInsert").bind("click", btnInsertClickEvent);
		
	//일반게시판 수정
	} else if(boardType[1] === "modify") {
		$("#gnrFrm_b_title").html("일반게시판 수정");
		$("#gnrFrm_b_usrNm").html("수정자");
		$("#gnrFrm_b_dt").html("수정일자");
		$("#gnrFrm_btnInsert").html("저장");
		cbMsg = "수정되었습니다.";
		
		var currTbbsId = window.sessionStorage.getItem("TBBS_ID");
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/user/selectGeneral.do",
			data : "pJson=" + getJsonStrSelectGeneral(currTbbsId),
			success : function(data) {
				$("#gnrFrm_tfTbbsTtl").val(data.TBBS_TTL);
				//DEXT5.setHtmlContentsEw(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'editor1');
				editor1.SetEditorContent(data.TBBS_CNTN==null?"":data.TBBS_CNTN);
				//수정버튼 클릭이벤트 등록
				$("#gnrFrm_btnInsert").bind("click", btnUpdateClickEvent);
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/board/generalBoardFileList.do",
			data : "pJson=" + getJsonGeneralBoardFileList(currTbbsId),
			success : function(data) {
				for(var i in data) {
					var url = getContextPath() 
					+ "/file/notifyBoardFileDown.do?pJson=" 
					+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
					
					var tr = "<tr id='" + data[i].FL_ID + "'>";
					tr += "<td class='line_noline' colspan='3'>";
					tr += "<input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
					tr += "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span></td>";
					tr += "<td class='line_b_text' colspan='2'>";
					tr += "<span>" + data[i].FL_KB_SZ + "</span>&nbsp;";
					tr += "<a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong>X</strong></a></td>";
					tr += "</tr>";
					
					fileBox_idx++;
					$("#gnrFrm_fileInfos").parent().append(tr);
				}
				if(fileBox_idx >= 5) {
					$("#gnrFrm_BOARD").prop("disabled", true);
					$("#gnrFrm_btnRmFilebox").prop("disabled", true);
				}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	} else {
			alert("게시판 정보를 알수없습니다.");
			selfClose();
	}
	//작성자와 작성일 등록
	var usrNm = window.sessionStorage.getItem("USR_NM");
	var today = new Date().toISOString().substring(0, 10);
	$("#gnrFrm_tfCrtUsrNm").val(usrNm);
	$("#gnrFrm_tfCrtDt").val(today);
	
	//초기화버튼 클릭이벤트 등록
	$("#gnrFrm_btnInit").bind("click", btnInitClickEvent);
	//닫기버튼 클릭이벤트 등록
	$("#gnrFrm_btnClose").bind("click", btnCloseClickEvent);
	//파일박스취소버튼 클릭이벤트 등록
	$("#gnrFrm_btnRmFilebox").bind("click", btnRmFileBoxClickEvent);
});