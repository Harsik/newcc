var g_Edu_id = "";
var editor1 = null;

//파라미터 셋팅 getJsonStrCourseCmtSave
function getJsonStrCourseCmtSave()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNDIudXBkYXRlQ3JzQ210U2F2ZQ==",
		"map" : {
			"key" : "value",
			"edu_Id" : g_Edu_id,
			"edu_Cont_c" : editor1.GetEditorContent() //DEXT5.getBodyValue("editor1"),
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 getJsonStrSelectCourseCmt
function getJsonStrSelectCourseCmt()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wNDIuc2VsZWN0Q3JzQ210",
		"map" : {
			"key" : "value",
			"edu_Id" : g_Edu_id,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 출력 버튼 클릭 이벤트 등록
function btnPrint_clickEvent()
{
	//오즈
	var org_EDU_ID=window.sessionStorage.getItem("org_EDU_ID");
	window.open("http://172.17.100.100:8090/ClipReport4/eduCourse.jsp?eduId="+org_EDU_ID);
}

// 저장 버튼 클릭 이벤트 등록
function btnSave_clickEvent()
{
	if (g_Edu_id != undefined && g_Edu_id != "" && g_Edu_id != null)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/edu/eduCourseCmtSave.do",
			data : "pJson=" + getJsonStrCourseCmtSave(),
			success : function(data)
			{
				alert("저장되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	} else {
		alert("선택된 교육과정이 존재하지 않습니다.");
		selfClose();
	}	// if EDU_ORD
}

// 초기화 버튼 클릭 이벤트 등록
function btnInit_clickEvent()
{
//	DEXT5.setBodyValue("", "editor1");
	editor1.SetEditorContent("");
}

//닫기버튼 클릭이벤트 등록
function btnClose_ClickEvent() 
{
	 selfClose();
}

function initData()
{
	g_Edu_id = window.opener.document.getElementById("rpedcp_getEduId").value;
	
	if (g_Edu_id != undefined && g_Edu_id != "" && g_Edu_id != null)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/edu/eduSelectCourseCmt.do",
			data : "pJson=" + getJsonStrSelectCourseCmt(),
			success : function(data)
			{
//				data == null ? DEXT5.setHtmlContentsEw("", "editor1") : DEXT5.setHtmlContentsEw(data.EDU_CONT_C, "editor1");
				data == null ? editor1.SetEditorContent("") : editor1.SetEditorContent(data.EDU_CONT_C);
				
				
				//data == null ? DEXT5.setHtmlValue("", "editor1") : DEXT5.setHtmlValue(data.EDU_CONT_C, "editor1");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}
function initEdit(){
	editor1 = new KuKudocsEditor(
            /* ID 입력부 */
            'edrpcm_divRptEditor',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '992px',

                //Editor 세로크기
                height: '506px',
                
                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
                
                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'editGroup', 'headingGroup', 'fontFamilyGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'
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
$(document).ready(function()
{	
	// 출력 버튼 클릭 이벤트 등록
	$("#edrpcm_btnPrint").bind("click", btnPrint_clickEvent);	
	// 저장 버튼 클릭 이벤트 등록
	$("#edrpcm_btnSave").bind("click", btnSave_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#edrpcm_btnInit").bind("click", btnInit_clickEvent);
	//닫기버튼 클릭이벤트 등록
	$("#edrpcm_btnClose").bind("click", btnClose_ClickEvent);
	
	initData();
	initEdit();
	
	/*
	setTimeout(function(){
		initData();
	}, 400);
	*/
});

