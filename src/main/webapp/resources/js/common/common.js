
function SetDivdext5Editor(w,h,vId,editNm){
//	DEXT5.configInitServerXml = "http://172.17.100.100:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
//	DEXT5.config.Mode = "view";
//	DEXT5.config.Height = h; //"200px";
//	DEXT5.config.Width = w;  //"100%";
//  	DEXT5.config.DevelopLangage = "JAVA";
//	DEXT5.config.Runtimes = "html5";
//	DEXT5.config.EditorHolder = vId;
//	new Dext5editor(editNm);
	editNm = new KuKudocsEditor(
            /* ID 입력부 */
            'vId',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: w,

                //Editor 세로크기
                height: h,
                
                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
                
                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'editGroup', 'headingGroup', 'fontFamilyGroup', 'fontSizeGroup', 'textFormatGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'
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

function writeLogFile(text)
{
	//fnLog(text);
	/*
	// 기본 경로 및 파일시스템 객체 생성
	var logpath = "C:\\twokcommlog";
	var fileObj = new ActiveXObject("Scripting.FileSystemObject");
	
	// 오늘 날짜 계산
	var today = new Date();
    var yearNow = String(today.getFullYear());
    var monthNow = fnLPAD(String((today.getMonth() + 1)), "0", 2);
    var dateNow = fnLPAD(String(today.getDate()), "0", 2);
    var dateStr = yearNow + monthNow + dateNow;

    // 로그 내용에 날짜, 시간 추가
	var result = "[" + yearNow + "-" + monthNow + "-" + dateNow + " " + 
	                      fnLPAD(String(today.getHours()), "0", 2) + ":" + fnLPAD(String(today.getMinutes()), "0", 2) + ":" + fnLPAD(String(today.getSeconds()), "0", 2) + "]_" + text;
	                      
    // 클라이언트 IP 주소 가져오기
    var ip = window.sessionStorage.getItem("IP_ADDRESS");
    
    if(ip == null || ip.length < 1 || ip == "0:0:0:0:0:0:0:1")
    	ip = "127.0.0.1";
    
    // 파일 이름 및 전체경로 생성
    var fileName = "twokcomm_[" + dateStr + "]_[" + ip + "].txt";
	var fullPath = logpath + "\\" + fileName;
	
	// 만약 기본 경로의 폴더가 존재하지 않는다면 생성
	if(!fileObj.FolderExists(logpath))
		fileObj.CreateFolder(logpath);
	
	if(!fileObj.FileExists(fullPath))
	{
		// 파일이 존재하지 않는다면 파일 생성
		var fwrite = fileObj.CreateTextFile(fullPath, true);
		fwrite.writeLine(result);
		fwrite.close();
	}
	else
	{
		// 파일이 존재한다면 파일을 열어 마지막에 쓰기
		var fwrite = fileObj.OpenTextFile(fullPath, 8, true);
		fwrite.writeLine(result);
		fwrite.close();
	}
	*/
}

/**
 * Date 형식으로 변환하여 리턴
 */
function fnConvertDateFormat(dateData) {
	var dateString = "";
	
	if (dateData != undefined && dateData != null) {
		if (dateData.length >= 8) {
			dateString = dateData.substr(0, 4) + "-" + dateData.substr(4, 2) + "-" + dateData.substr(6, 2);
		}
		
		if (dateData.length == 14) {
			dateString = dateString + " " + dateData.substr(8,2) + ":" + dateData.substr(10, 2) + ":" + dateData.substr(12, 2);
		}
	}
	
	return dateString;
}

/**
 * 문자열에서 숫자만 추출한다.
 * 
 * @param data
 * @returns
 */
function fnGetNumeric(data) {
	var val = new String(data);
	var num = val.replace(/[^0-9]/g, '');
	return num;
}

//날짜에 0채워서 반환
function fnLPAD(val, set, cnt)
{
     if(!set || !cnt || val.length >= cnt)
          return val;

     var max = (cnt - val.length)/set.length;

     for(var i = 0; i < max; i++)
          val = set + val;

     return val;
}

/**
 * 파일명의 날자 범위 셋팅
 * 
 * @param strtDate 검색 시작 일
 * @param endDate 검색 종료 일
 * @returns
 */
function setDownLoadName(strtDate, endDate){
	var sFindDate = "";
	
	if(strtDate == "" && endDate == ""){
		return sFindDate;
	}
	
	if(strtDate == ""){
		return "(" + endDate + ")";
	}
	
	if(endDate == ""){
		return "(" + strtDate + ")";
	}
	
	if(strtDate == endDate){
		sFindDate = "(" + strtDate + ")";
	} else {
		sFindDate = "(" + strtDate + "~" + endDate + ")";
	}
	return sFindDate;
}

// 엑셀 다운 공통함수
function excelDownLoad(url, param)
{
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "pJson");
	hiddenField.setAttribute("value", param);
	form.appendChild(hiddenField);
	document.body.appendChild(form);
	//document.createElement(form);
	form.submit();
	
	/*
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	var params = "pJson=" + param;
	http.send(params);
	http.onload = function() {////console.log("excel download");};
	*/
}

var savePopUpInfo; // 검색엔진팝업의 정보를 복사할 클론 객체

// 검색엔진 팝업
function searchPopupSubmit(url, param, target, option)
{
	if (savePopUpInfo == null || savePopUpInfo == undefined) { // 클론 객체에 아무 정보도 없으면(팝업이 띄워져 있지 않다면)
		var winn=window.open('', target, option);
		
		var form = winn.document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", url);
		form.setAttribute("target", target);
		
		var hiddenField1 = winn.document.createElement("input");
		hiddenField1.setAttribute("type", "hidden");
		hiddenField1.setAttribute("name", "pQuery");
		hiddenField1.setAttribute("value", param);
		
		var hiddenField2 = winn.document.createElement("input");
		hiddenField2.setAttribute("type", "hidden");
		hiddenField2.setAttribute("name", "pQuery_tmp");
		hiddenField2.setAttribute("value", param);
		
		form.appendChild(hiddenField1);
		form.appendChild(hiddenField2);
		winn.document.body.appendChild(form);
		
		savePopUpInfo = winn; // 클론 객체에 정보를 복사한다.
		form.submit();
	} else { // 클론 객체에 정보가 있으면(팝업이 띄워져 있으면)
		savePopUpInfo.close(); // 띄워져 있는 팝업을 닫고
		var winn=window.open('', target, option);
		
		var form = winn.document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", url);
		form.setAttribute("target", target);
		
		var hiddenField1 = winn.document.createElement("input");
		hiddenField1.setAttribute("type", "hidden");
		hiddenField1.setAttribute("name", "pQuery");
		hiddenField1.setAttribute("value", param);
		
		var hiddenField2 = winn.document.createElement("input");
		hiddenField2.setAttribute("type", "hidden");
		hiddenField2.setAttribute("name", "pQuery_tmp");
		hiddenField2.setAttribute("value", param);
		
		form.appendChild(hiddenField1);
		form.appendChild(hiddenField2);
		winn.document.body.appendChild(form);
		
		savePopUpInfo = winn; // 클론 객체에 새로 띄운 팝업의 정보를 담는다.
		form.submit();
	}
}

function noToolbarPopup(url, paraNm, paraVal, target, option)
{
	var winn=window.open('', target, option);

	var form = winn.document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	form.setAttribute("target", target);
	
	var hiddenField = "";
	var arParaNm =paraNm.split("^");
	var arParaVal =paraVal.split("^");
	for(var i=0; i < arParaNm.length ; i++){
		hiddenField = winn.document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", arParaNm[i]);
		hiddenField.setAttribute("value",arParaVal[i]);
		form.appendChild(hiddenField);
		winn.document.body.appendChild(form); 
		 
	}
		
//document.body.appendChild(form);

	form.submit();
	winn.focus();
}

// 숫자 스트링을 받아 ' , ' 포함된 형식으로 변환
function changeNumberFormat(str)
{
	if(str == null || str.trim() == "")
		return "";
	
	str = str.replace(/ /gi, "");
	str = str.replace(/,/gi, "");
	
	if(str.length > 3)
		return changeNumberFormat(str.substr(0, str.length - 3)) + "," + str.substr(str.length - 3, 3);
	else
		return str;
}

// 문자열을 받아 byte계산
function charByteSize(str)
{
	var resultSize = 0;
	
	if (str == null) {
		return 0;
	};

	for (var i = 0; i < str.length; i++)
	{
		var c = escape(str.charAt(i));
		
		if (c.length == 1)
			resultSize++;
		else if (c.indexOf("%u") != -1)
			resultSize += 2;
		else if (c.indexOf("%") != -1)
			resultSize += c.length / 3;
	}
	
	return resultSize;
}

// 예약일시가 맞는지 체크
function checkResvDate(date)
{
	date = date.replace(/-/gi, "").replace(/ /gi, "").replace(/:/gi, "");
	
	var year = date.substr(0,4);
    var month = date.substr(4,2) - 1;
    var day = date.substr(6,2);
    var hour = date.substr(8,2);
    var min = date.substr(10,2);

    var resvDate = new Date(year, month, day, hour, min);
    
	return resvDate > new Date();
}

//예약일시를 date 타입으로 반환
function getResvDate(date)
{
	date = date.replace(/-/gi, "").replace(/ /gi, "").replace(/:/gi, "");
	
	var year = date.substr(0,4);
    var month = date.substr(4,2) - 1;
    var day = date.substr(6,2);
    var hour = date.substr(8,2);
    var min = date.substr(10,2);

    var resvDate = new Date(year, month, day, hour, min);
    
	return resvDate;
}

// 이벤트를 받아 전화번호 중간에 '-' 삽입 
function setPhoneNumFormat(controlId)
{
	var $id = $("#" + controlId);
	
	$id.bind("keyup", function(e)
	{
		var regexp = /^([0-9]|-)*$/; // 숫자와 하이픈만 허용.
		var v = $(this).val();
		if( !regexp.test(v) ) {
			alert("숫자만 입력하세요.");
			$(this).val("");
		};
		
		var keycode = e.keyCode;
		if((keycode >=  48 && keycode <=  57) || (keycode >=  96 && keycode <= 105) || (keycode == 8)) {
			$id.val(getPhoneNumFormat($id.val().replace(/-/gi, "")));
		} else {
			e.returnValue = false;
		};
	});
}

//전화번호 형태로 변환
function getPhoneNumFormat(p_num)
{
	if(p_num == null || p_num == "") {
		return "";
	};
	
	if(p_num.length == 7) {
		return p_num.substr(0, 3) + "-" + p_num.substr(3, 7);
	} else if(p_num.length == 8){
		return p_num.substr(0, 4) + "-" + p_num.substr(4, 8);
	} else {
		return p_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3}|[0-9]{4})-?([0-9]{3,4})$/, "$1-$2-$3");
	};
}

// 이벤트를 받아 숫자일 경우에만 입력 허용
//function onlyNumber(event)
//{
//	event = event || window.event;
//	var keyID = (event.which) ? event.which : event.keyCode;
//	
//	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 9 ) 
//		return;
//	else
//		return false;
//}

/**
 * 완료되지 않은 건들은 글꼴 색이 빨간색으로 표시되도록 한다.
 * 
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns
 */
function fnStatusFormatter(cellvalue, options, rowObject) 
{
	if (cellvalue == undefined || cellvalue == null)
		return "";
	
	if (cellvalue == '완료' || cellvalue == '처리완료' || cellvalue == '배정'|| cellvalue == '발신' || cellvalue == '제출')
		return cellvalue;
	else if (cellvalue == '미완료' || cellvalue == '실패' || cellvalue == '반려' || cellvalue == '반송' || cellvalue == '미확인' || cellvalue == '미제출' || cellvalue == '이의제기')
		return '<span style="color:red;font-weight:bold">' + cellvalue + '</span>';
	else
		return '<span style="color:blue;font-weight:bold">' + cellvalue + '</span>';
}

/**
 * TicketId 요청
 * 
 * @returns
 */
function getJsonStrTicketId()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuZ2V0VGNrdElk",
		"map" : {
			"key" : "value",
			"login_usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 상담유형 테이블 조회
 * 
 * @param category
 * @param parentCode
 */
function getJsonStrIntvCdSetSelectBox(category, parentCode) {
	var loParam;
	
	loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMjAuY2F0ZWdvcnlsaXN0",
			"map" : {
				"key" : "value",
				"categoryGb" : category,
				"parntCd" : parentCode,
				"notuse" : false,
				"sidx" : "cd_ord",
				"sord" : "asc"
			}
	}
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UserMenu
function getJsonStrCommonSetSelectBox(codeType, parentType, parentCode, cntrCd)
{
	var loParam;
	var lcntrCd = cntrCd;
	
	if(window.sessionStorage.getItem("USR_GRD_CD") == "060100" || window.sessionStorage.getItem("USR_GRD_CD") == "090100")
		lcntrCd ="";
	
	if(parentType != "" && parentCode != "")
	{
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuY29kZWxpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : codeType,
				"parnt_tp_cd" : parentType,
				"parnt_cd" : parentCode,
				"ext1_cd" : lcntrCd,
				"notuse" : false,
				"sidx" : "cd_ord",
				"sord" : "asc"
			}
		};
	}
	else
	{
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuY29kZWxpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : codeType,
				"ext1_cd" : lcntrCd,
				"notuse" : false,
				"sidx" : "cd_ord",
				"sord" : "asc"
			}
		};
	}
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 처리유형 타입
 * 
 * @returns
 */
function getJsonStrActTypeSetSelectBox() {
	var loParam;
	
	loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuYWN0VHlwZUxpc3Q=",
		"map" : {
			"key" : "map"
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * ARS 호전환 서비스 목록 
 * 
 * @returns
 */
function getJsonStrArsServiceSelectBox() {
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuYXJzU2VydmljZUxpc3Q=",
			"map" : {
				"key" : "map"
			}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//대중소 자동완성  
function getJsonCodeList(selectid)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjAuY2F0ZWdvcnlEZXRhaWxBdXRv",
		"map" : {
			"key" : "value",
			"lvl" : "4",
			"keyword" : $("#"+selectid).val().replace(/-/g, '') 
		}
	};
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

/**
 * ARS호전환 목록 Setting
 * 
 * @param selectId
 * @param allText
 * @param displayType
 * @param startValue
 */
function setSelectedBoxWithArsService(selectId, allText, displayType, startValue) 
{
	var $selectId = $("#" + selectId);
	
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrArsServiceSelectBox(),
		success : function(data)
		{
			$selectId.html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			if (allText == "전체") {
				value += "<option value='all' selected>전체</option>";
			} else if (allText == "미선택") {
				value += "<option value='all' selected>미선택</option>";
			}
			
			var temp = "";
			
			$.each(jr, function(key, state)
			{
				if(displayType == "main") {					
					
					if (state.DISP_YN == 'Y') 
					{
						temp = state.TEL_NO.replace(/-/gi, "");
						value += "<option value='" + temp + "'> " + state.CD_NM + "</option>";
					}
				}
			});
			
			$selectId.append(value);
			
			if(startValue != "")
				$selectId.val(startValue);
			
			$selectId.trigger("change");
			$selectId.trigger("load");
		}
	});
}

/**
 * 처리유형 Select Box Setting
 * 
 * @param selectId     selectBox Id
 * @param allText  
 * @param displayType  main/search
 * @param startValue
 */
function setSelectBoxWithActTypeCd(selectId, allText, displayType, startValue) 
{
	setObjSelectBoxWithActTypeCd(selectId, allText, displayType,"","90014",startValue);
}


 //파라미터로 코드값을 받아와서 해당 셀렉트 박스 셋팅
function setSelectBoxWithCode(selectId, allText, codeType, parentType, parentCode, startValue)
{
	 setObjSelectBoxWithCode(selectId, allText, "",parentType, codeType, "");
}

/**
 * 상담유형   테이블 조회
 * 
 * @param category
 */
function getJsonStrCategoryOBJListSet(ctg_lv) {
	var loParam;
	
	loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMjAuY2F0ZWdvcnlPYmpMaXN0",
			"map" : {
				"key" : "value",
				"categoryGb" : ctg_lv
			}
	}
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_sm002
function getJsonStrCodeSelect()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZWxpc3RGb3JPYmplY3Q=",
		"map" : {
			"key" : "value",
			"notuse" : false
		}
	};
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 UserList
function getJsonStrAgentList()
{
 	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"chkRetire" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc"	
		}
	};
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

var g_UserObect={}; // 상담사 변수

function setObjAgentList(maingb)
{
	var UserObectCode={}; // 코드 변수	
	 var value = "";
	 
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/agentList.do",
		data : "pJson=" + getJsonStrAgentList(),
		success : function(data)
		{
				// param값을 JSON으로 파싱
				//var jr = JSON.parse(data);
				
				var arrVal=new Array();
				var obectDetail=new Object();
				var objKey ="";
				
				$.each(data, function(key, val)
				{
					var i =0;
					
					if(objKey != val.CNTR_CD){
						obectDetail={};
					}
					 objKey =val.CNTR_CD;
					
							var objCildkey =val.USR_ID;
							var objCildCntrCd=val.CNTR_CD;
							var arrObjDtail = {};
							var objDtail = {};
							 
									objDtail={
										"cntr_cd" : val.CNTR_CD,
										"usr_id" : val.USR_ID,
										"usr_nm" : val.USR_NM,
										"cntr_nm" : val.CNTR_NM,
										"team_cd" : val.TEAM_CD,
										"dept_cd" : val.DEPT_CD,
										"usr_grd_cd" : val.USR_GRD_CD,
										"dty_cd" : val.DTY_CD, 
										"use_yn" : val.USE_YN
									};
	
								
					obectDetail[objCildkey]= objDtail;
					UserObectCode[objKey]=obectDetail;
								 
				});
					
			g_UserObect=UserObectCode;
			
			if(maingb=="Main"){
					var usrId=window.sessionStorage.getItem("USR_ID");
					var usrId2=usrId;
					var cntrCd=window.sessionStorage.getItem("CNTR_CD");
					var teamCd=window.sessionStorage.getItem("TEAM_CD");
				setSelectBoxWithAgent("selCounselNm", "전체", "main",usrId,"","","","","" );
				//setSelectBoxWithAgent("selemrgncylNm", "전체", "main",window.sessionStorage.getItem("USR_ID"),"","","","","" );
				setSelectBoxWithAgent("selemrgncylNm", "전체", "main","all","","","","","" );
			}
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}
 
// 상담사 셀렉트박스
function setSelectBoxWithAgent(selectId, allText, parentType, startid, cntrcd, teamcd, deptcd, usrid, grdcd, useyn )
{
	var tempObj={};
	if(parentType.toUpperCase()=="CHILD"){
		if(cntrcd==""||cntrcd=="all") 
		{
			tempObj=window.opener.g_UserObect;
		}else{
			tempObj=window.opener.g_UserObect[cntrcd]; 
		}
	}else if(parentType.toUpperCase() =="GCHILD"){
		if(cntrcd==""||cntrcd=="all") 
		{
			tempObj=window.opener.opener.g_UserObect;
		}else{
			tempObj=window.opener.opener.g_UserObect[cntrcd];
		}
	}else{
		if(cntrcd==""||cntrcd=="all") 
		{
			tempObj=g_UserObect;
		}else{
			tempObj=g_UserObect[cntrcd]; 
		}
	}
	
	if(!tempObj){
		return;
	}
	
	var use_yn="";
	if(!useyn){
		use_yn="";
	}else {
		use_yn=useyn;
	}
	
	
	var localvarParent="";
	var $selectId;
	$selectId = $("#" + selectId);
	 
	var value = "";
	$selectId.html("");

	if(usrid==""){
		if (allText == "전체") {
			value += "<option value='all' >전체</option>";
		} else if (allText == "미선택") {
			value += "<option value='all' >미선택</option>";
		}
	}
	
	var usrId = window.sessionStorage.getItem("USR_ID");

	$.each(tempObj, function(key, val)
	{ 
		if(cntrcd==""||cntrcd=="all") {	
			var subObj={};
			if(localvarParent!=key){
				localvarParent=key;
				subObj=tempObj[key];
			}
			$.each(subObj, function(keys, state)
			{ 	
				if (window.sessionStorage.getItem("USR_GRD_CD") == "090100") { //시스템관리자
					value += "<option value='" + state.usr_id + "'>" + state.usr_nm + "</option>";
				}else if (window.sessionStorage.getItem("USR_GRD_CD") == "050100" || window.sessionStorage.getItem("USR_GRD_CD") == "030100") { //센터장,팀장
					if(state.cntr_cd == window.sessionStorage.getItem("CNTR_CD")){
						value += "<option value='" + state.usr_id + "'>" + state.usr_nm + "</option>";
					}
				}else { //상담사
					if(usrId==state.usr_id || teamcd==state.team_cd){
						value += "<option value='" + state.usr_id + "'>" + state.usr_nm + "</option>";
					};
				};
			});
		} else {
			if (usrId != "sysmanager" && usrId != "generalmanager" && usrId != "manager001") {
				if(usrId==val.usr_id || teamcd==val.team_cd){
					value += "<option value='" + val.usr_id + "'>" + val.usr_nm + "</option>";
				};
			} else {
				value += "<option value='" + val.usr_id + "'>" + val.usr_nm + "</option>";
			};
		};
	});

	$selectId.append(value);

	if(startid!="") $selectId.val(startid); 
			
	$selectId.trigger("change");
	$selectId.trigger("load");
  
}

var g_IntvObectCode={}; // 상담유형코드 변수
var g_ObectCode={}; // 코드 변수
var g_ArsSvrCode={}; // ARS 서비스코드
var g_ArsCustComp={}; // ARS 고객성향

function initCodeBook(maingb){
var parentObectCode={}; // 코드 변수	
	 var value = "";
	// 초기 코드 가져오기
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/extra/getStrCodeSelect.do",
		data : "pJson=" + getJsonStrCodeSelect(),
		success : function(data)
		{
			if(jr != '')
			{
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
				
				var arrVal=new Array();
				var obectDetail=new Object();
				var objKey ="";
				
				$.each(jr, function(key, val)
				{
					var i =0;
					
					if(objKey != val.TP_CD){
						obectDetail={};
					}
					 objKey =val.TP_CD;
					
							var objCildkey =val.CD;
							var objCildTp_cd=val.TP_CD;
							var arrObjDtail = {};
							var objDtail = {};
							 
									objDtail={
										"tp_cd" : val.TP_CD,
										"cd" : val.CD,
										"cd_nm" : val.CD_NM,
										"use_yn" : val.USE_YN,
										"ext1_cd" : val.EXT1_CD,
										"ext2_cd" : val.EXT2_CD,
										"ext3_cd" : val.EXT3_CD,
										"ext4_cd" : val.EXT4_CD
									};
	
								
					obectDetail[objCildkey]= objDtail;
					parentObectCode[objKey]=obectDetail;
								 
				});
					
			}
			g_ObectCode=parentObectCode;
			if(maingb=="Main"){
				setObjSelectBoxWithActTypeCd("selMainActtypecd", "", "main","","90014","");
				
				setObjSelectBoxWithCode("selMainChgbcd", "", "","main","90009", "");	// 채널구분 셋팅
				setObjSelectBoxWithCode("selMainCallgbcd", "", "","main","90010", "");	    // 통화구분 셋팅
				setObjSelectBoxWithCode("selMainActstcd", "", "","main","90013", "030400");	// 처리상태 셋팅  미완료:010000,  완료:030400  
				setObjSelectBoxWithCode("selMainChnl", "", "","main","90009", "11000");	// 채널구분
				setObjSelectBoxWithCode("selCustGbCd", "", "","main","90043", "1");	// 고객구분  
				
				setObjSelectBoxWithCode("selMainKeyword", "", "","main","90025", "0");	// 키워드
				
				setObjSelectBoxWithCode("PhoneMenu", "", "ul","main","96001", "");	// 걸기구분
				setObjSelectBoxWithCode("NotReadyMenu", "", "ul","main","90008", "");	// 이석구분
				setObjSelectBoxWithCode("FavoritMenu", "", "ul","main","90090", "");	// 즐겨찾기
				
				setObjSelectBoxWithCode("optCdbKnd", "전체", "","main","90303", "");	//상담DB구분  
	
				setObjSelectBoxWithCode("selChGbCd", "전체", "","main", "90009", "");	// 처리상태 셋팅
				setObjSelectBoxWithCode("selActStCd", "전체", "","main", "90013", "");	// 처리상태 셋팅	
				setObjSelectBoxWithCode("selCnslSrchCallGbCd", "전체", "","main", "90010", "");
 	
				setObjSelectBoxWithActTypeCd("actTypeCd", "", "", "","90014","");         // 처리유형
				setObjSelectBoxWithCode("callGbCd", "", "", "main", "90010", "");	// 통화구분 셋팅
				setObjSelectBoxWithCode("actStCd", "", "", "main", "90013", "");	// 처리상태 셋팅
				
				g_ArsSvrCode=getObjWithCode("main", "90047", ""); // ARS 서비스코드
				g_ArsCustComp=getObjWithCode("main", "90048", ""); // ARS 고객성향
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

var g_OpenPopupObject= new Object();

// 파라미터로 코드값을 받아와서 해당 셀렉트 박스 셋팅 (개체)
function setObjSelectBoxWithCode(selectId, allText, codeType, parentType, parentCode, startValue) // 여기2
{
	var tempObj={};
	if(parentType.toUpperCase()=="PCHILD"){
		 tempObj=window.parent.g_ObectCode[parentCode]; 
	}else if(parentType.toUpperCase()=="CHILD"){
		 tempObj=window.opener.g_ObectCode[parentCode]; 
	}else if(parentType.toUpperCase()=="GCHILD"){
		tempObj=window.opener.opener.g_ObectCode[parentCode];
	}else if(parentType.toUpperCase()=="GGCHILD"){
		tempObj=window.opener.opener.opener.g_ObectCode[parentCode];
	}else if(parentType.toUpperCase()=="GGGCHILD"){
		tempObj=window.opener.opener.opener.opener.g_ObectCode[parentCode];
	}else{
		 tempObj=g_ObectCode[parentCode]; 
	}
	
	if(!tempObj){
		return;
	};
	
	var localvarParent="";
	var $selectId;
	if(codeType != "ul"){
		$selectId = $("#" + selectId);
	}else{
		$selectId = $("#" + codeType+selectId);
	}
	var value = "";
	var tempVal="";
	$selectId.html("");
	$.each(tempObj, function(key, val)
	{
		if(codeType != "ul"){
		
			if (localvarParent != parentCode) {
				localvarParent =parentCode;
			if (allText == "전체") {
				value += "<option value='all' selected>전체</option>";
				} else if (allText == "미선택") {
					value += "<option value='all' selected>미선택</option>";
				}
			}
		 
			if(val.use_yn=="Y")
			{
			  value += "<option value='" + val.cd + "'>" + val.cd_nm + "</option>";
			}
		}else{
			if(val.use_yn=="Y" && selectId=="NotReadyMenu"){
				if(val.cd_nm=="문자상담"){
					tempVal="<li value='" + (val.cd).substring(3, 5) + "' id='li"+selectId+"_" + (val.cd).substring(3, 5) + "'>" + val.cd_nm + "</li>";
				}else{
					value += "<li value='" + (val.cd).substring(3, 5) + "' id='li"+selectId+"_" + (val.cd).substring(3, 5) + "'>" + val.cd_nm + "</li>";
				}
			}else if(val.use_yn=="Y" && selectId=="FavoritMenu"){
				value += "<li value='" + val.ext1_cd + "' id='li"+selectId+"_" + val.cd + "'>" + val.cd_nm + "</li>";
			}else if(val.use_yn=="Y" && selectId=="PhoneMenu"){
				value += "<li value='" + val.ext1_cd + "' id='li"+selectId+"_" + val.cd + "'>" + val.cd_nm + "</li>";
			}
		}
		 
	});
	 
	value+=tempVal; // NotReadyMenu 마지막에 문자상담 추가
	
	if(codeType != "ul"){
		$selectId.append(value);
	
		if(startValue) $selectId.val(startValue);
		else $selectId.prop("selected", true);
				
		$selectId.trigger("change");
		$selectId.trigger("load");
	}else{
		$selectId.append(value);
		$selectId.menu();
	}
}


// 파라미터로 코드값을 받아와서 해당 코드값 셋팅 (개체)
function getObjWithCode( parentType, parentCode, selVal)
{
	var tempObj={};
	if(parentType.toUpperCase()=="PCHILD"){
		 tempObj=window.parent.g_ObectCode[parentCode]; 
	}else if(parentType.toUpperCase()=="CHILD"){
		 tempObj=window.opener.g_ObectCode[parentCode]; 
	}else if(parentType.toUpperCase()=="GCHILD"){
		tempObj=window.opener.opener.g_ObectCode[parentCode];
	}else if(parentType.toUpperCase()=="GGCHILD"){
		tempObj=window.opener.opener.opener.g_ObectCode[parentCode];
	}else{
		 tempObj=g_ObectCode[parentCode]; 
	}

	if(!tempObj){
		return "";
	}
	
	var rtnObj={};
 
	
	rtnObj=tempObj;
	return rtnObj;
//	$.each(tempObj, function(key, val)
//	{
//		if( startValue == val.cd ){
//			return val.cd_nm;
//		}
//  
//	});
	 
}

function setObjSelectBoxWithActTypeCd(selectId, allText, displayType, parentType, tp_cd, startValue) 
{
	var tempObj={};
	if(parentType =="CHILD"){
		 tempObj=window.opener.g_ObectCode[tp_cd]; 
	}else if(parentType =="GCHILD"){
		tempObj=window.opener.opener.g_ObectCode[tp_cd];
	}else{
		 tempObj=g_ObectCode[tp_cd]; 
	}
		  
	if(!tempObj){
		return;
	}
	
	var $selectId = $("#" + selectId);
	var value = "";
	$selectId.html("");
	$.each(tempObj, function(key, val)
	{ 
		if (allText == "전체") {
			value += "<option value='all' selected>전체</option>";
		} else if (allText == "미선택") {
			value += "<option value='all' selected>미선택</option>";
		}
		 
			if(val.use_yn=="Y"){
			
				if (displayType == "main") {
					if (val.ext1_cd == "Y") {
						
						if (val.ext2_cd != "Y") {
							value += "<option value='" + val.cd + "' disabled>" + val.cd_nm + "</option>";
						} else {
							value += "<option value='" + val.cd + "'>" + val.cd_nm + "</option>";
						}
					}
				} else {
					 
					if (val.ext3_cd == "Y") {
						if (val.ext4_cd != "Y") {
							value += "<option value='" + val.cd + "' disabled>" + val.cd_nm + "</option>";
						} else {
							value += "<option value='" + val.cd + "'>" + val.cd_nm + "</option>";
						}
						
					}
				}
					
			}
		 
	});
	 
		$selectId.append(value);
	
	if(startValue != "")
		$selectId.val(startValue);
	
	$selectId.trigger("change");
	$selectId.trigger("load");
	
}

// 대중소코드
function setCategoryCodeListToObject2(fID, allText, startValue, maingb)
{
var parentObectCode={}; // 코드 변수		
	var value = "";
	// 초기 코드 가져오기
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/CommonSetObjList.do",
		data : "pJson=" + getJsonStrCategoryOBJListSet("allseq"),
		success : function(data)
		{
			if(jr != '')
			{
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
				
				var arrVal=new Array();
				var obectDetail=new Object();
				var objKey ="";
				
				$.each(jr, function(key, val)
				{
					var i =0;
					
					if(objKey != val.PARNT_CD){
						obectDetail={};
					}
					 objKey =val.PARNT_CD;
					
							var objCildkey =val.CTG_CD;
							var objCildTp_cd=val.PARNT_CD;
							var arrObjDtail = {};
							var objDtail = {};
							 
									objDtail={
										"parnt_cd" : val.PARNT_CD,
										"cd"    : val.CTG_CD,
										"cd_nm" : val.CD_NM,
										"ctg_lvl" : val.CTG_LVL,
										"cd_ord" : val.CD_ORD,
										"use_yn" : val.USE_YN 
									};
	
					obectDetail[objCildkey]= objDtail;
					parentObectCode[objKey]=obectDetail;
								 
				});
					
			}
			g_IntvObectCode=parentObectCode;
			if(maingb=="Main"){
	 			setObjectSelectBoxWithCode2("selMainIntvLgCd", "선택", "1", "", "00000000", "", "CHANGE");	// 상담유형 대분류 셋팅 20000000
	 			//$("#selMainIntvLgCd").val("20010000").trigger("change");
	 			//$("#selMainIntvMdCd").val("20011200").trigger("change");
	 			//$("#selMainIntvSmCd").val("20011201");

                //setObjectSelectBoxWithCode2("selCnslSrchIntvExCd", "전체", "1", "", "00000000", "","CHANGE");	// 상담유형 대분류 셋팅
	 			setObjectSelectBoxWithCode2("selCnslSrchIntvLgCd", "전체", "1", "", "00000000", "","CHANGE");	// 상담유형 대분류 셋팅
	 			setObjectSelectBoxWithCode2("optCounselKnd1", "전체", "1", "", "00000000", "", "CHANGE");	// 상담유형 대분류 셋팅
                //setObjectSelectBoxWithCode2("intvExCd", "선택", "1", "", "00000000", "", "CHANGE");	// 상담유형 대분류 셋팅
	 			setObjectSelectBoxWithCode2("intvLgCd", "선택", "1", "", "00000000", "", "CHANGE");	// 상담유형 대분류 셋팅
	 			setObjectSelectBoxWithCode2("cslist_selSrchIntvLgCd", "선택", "1", "", "00000000", "", "CHANGE");	 // 상담유형 대분류 셋팅
	 			setObjectSelectBoxWithCode2("cmscsp_intvLgCd", "선택", "1", "", "00000000", "", "CHANGE");	 // 상담유형 대분류 셋팅
	 		}else if(maingb=="N"){
				setObjectSelectBoxWithCode2(fID, allText, "1", "", "", startValue, "");	// 상담유형 대분류 셋팅
 			}
			  
		},
		error : function(data, val, err) 
		{
			networkErrorHandler(data, val, err);
		}
	});
 
}

//셀렉트 박스를 쿼리에서 변수로 처리; 
function setObjectSelectBoxWithCode(selectId, allText, codeType, parentType, parentCode, startValue, cntrCd) 
{
	if(codeType=="1"){
		parentCode="00000000";
		if(allText==""){
			startValue="10000000";
		}
	}
	setObjectSelectBoxWithCode2(selectId, allText, codeType, parentType, parentCode, startValue, cntrCd)
}

//상담유형 셀렉트 박스를 쿼리에서 변수로 처리; 
function setObjectSelectBoxWithCode2(selectId, allText, codeType, parentType, parentCode, startValue, cntrCd) // 여기1
{	
	var tempObj={};
	if(parentType =="CHILD"){
		 tempObj=window.opener.g_IntvObectCode[parentCode]; 
	}else if(parentType =="GCHILD"){
		tempObj=window.opener.opener.g_IntvObectCode[parentCode];
	}else if(parentType =="GGCHILD"){
		tempObj=window.opener.opener.opener.g_IntvObectCode[parentCode];
	}else if(parentType =="GGGCHILD"){
		tempObj=window.opener.opener.opener.opener.g_IntvObectCode[parentCode];
	}else{
		tempObj=g_IntvObectCode[parentCode]; 
	}
	
	var localvarParent="";
	var $selectId = $("#" + selectId);
	var value = "";
	
	if(!tempObj){
		var parentChk=parentCode;
		//if(codeType=="4" || codeType=="3"){parentChk="all";}
		if(codeType=="3" || codeType=="2" || codeType=="1") {
			parentChk = "all";
		};
		
		if(parentChk == "all"){
			var alltext = allText == "" ? "선택" : allText;
			$selectId.html("");
			value += "<option value='all' selected>"+alltext+"</option>";
			$selectId.append(value);
			$selectId.val(parentChk);
			$selectId.trigger("change");
			$selectId.trigger("load");
		}
		return;
	};
	
	if(tempObj==undefined){
		value += "<option value='all' selected>미선택</option>";
		return;
	};
	
	$selectId.html("");
	
	$.each(tempObj, function(key, val)
	{
		if (localvarParent != parentCode) {
			localvarParent =parentCode;
			if (allText == "전체") {
				value += "<option value='all' selected>전체</option>";
			} else if (allText == "선택") {
				value += "<option value='all' selected>선택</option>";
			} else if (allText == "미선택") {
				value += "<option value='all' selected>미선택</option>";
			}
		}
		
		if (val.use_yn=="Y") {
			value += "<option value='" + val.cd + "'>" + val.cd_nm + "</option>";
		} else {
			if(selectId == "cmscsp_intvLgCd" | selectId == "cmscsp_intvMdCd" | selectId == "cmscsp_intvSmCd" 
				| selectId == "intvLgCd" | selectId == "intvMdCd" | selectId == "intvSmCd" 
					| selectId == "cswDb_dbSrchCounselKnd1" | selectId == "cswDb_dbSrchCounselKnd2" | selectId == "cswDb_dbSrchCounselKnd3") {
				value += "<option value='" + val.cd + "' disabled>" + val.cd_nm + "</option>";
			}
		}
		
	});
	 
	$selectId.append(value);
	
	if(startValue != "") {
		$selectId.val(startValue);
	};
	
	$selectId.trigger("change");
	$selectId.trigger("load");
}

// 메인화면 코드
function getCodeListToObject(ObjectId, codeType, parentType, parentCode)
{

var codeObj_C = new Object();

var array_codeObj = new Array();
var codeObj_L = new Array();
var codeObj_M = new Array();
var codeObj_S = new Array();
 

	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/CommonCodeObjList.do",
		data : "pJson=" + getJsonStrCommonSetSelectBox(codeType, parentType, parentCode, ""),	
		success : function(data)
		{
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			
			var i=0;
			
			$.each(jr, function(key, state)
			{
				 array_codeObj[i]= {
				   code : state.CD,
				   codenm : state.CD_NM
				 };
				 
				 i++;
			});
			
		},
		error : function(data, val, err) 
		{
			networkErrorHandler(data, val, err);
		}
	});
}



function resetForm(selectId){
	var $selectId = $("#" + selectId);
	$selectId[0].reset();
       // var validator = $selectId.validate();
       // validator.resetForm();
}

//파라미터로 코드값을 받아와서 해당 셀렉트 박스 셋팅_상담유형 사용 센터만
function setSelectBoxWithCodeIntvLgCd(selectId, allText, codeType, parentType, parentCode, startValue, cntrCd)
{
	var $selectId = $("#" + selectId);
	
	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		//data : "pJson=" + getJsonStrCommonSetSelectBox(codeType, parentType, parentCode, cntrCd),
		data : "pJson=" + getJsonStrIntvCdSetSelectBox(codeType, parentCode),			
		success : function(data)
		{
			$selectId.html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			if(allText == "전체")
				value += "<option value='all'>전체</option>";
			else if(allText == "미선택")
				value += "<option value='all'>미선택</option>";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$selectId.append(value);
			
			if(startValue != "")
				$selectId.val(startValue);
			
			$selectId.trigger("change");
			$selectId.trigger("load");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//파라미터로 코드값을 받아와서 해당 셀렉트 박스 셋팅_상담유형 사용 센터만
function setSelectBoxWithCode2(selectId, allText, codeType, parentType, parentCode, startValue, cntrCd)
{
	var $selectId = $("#" + selectId);
	
	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrCommonSetSelectBox(codeType, parentType, parentCode, cntrCd),
		success : function(data)
		{
			$selectId.html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			if(allText == "전체")
				value += "<option value='all'>전체</option>";
			else if(allText == "미선택")
				value += "<option value='all'>미선택</option>";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$selectId.append(value);
			
			if(startValue != "")
				$selectId.val(startValue);
			
			$selectId.trigger("change");
			$selectId.trigger("load");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//라디오 박스 셋팅
function setRadioBoxWithCode(selectId, codeType, parentType, parentCode, startValue)
{
	var $selectId = $("#" + selectId);
	
	// 라디오 박스 셋팅
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrCommonSetSelectBox(codeType, parentType, parentCode),
		success : function(data)
		{
			$selectId.html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";			
			
			$.each(jr, function(key, state)
			{
				value += "<input type='radio' class='text_ol_40' name='"+codeType+"'" + "id ='"+state.CD+"' value='"+state.CD+"'/>" +state.CD_NM;
			});
			
			$selectId.append(value);
			
			if(startValue != "")
				$("#"+startValue).attr("checked", true);
			
			$selectId.trigger("change");
			$selectId.trigger("load");
			
			if(startValue != "")
				$selectId.val(startValue);			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//파라미터 셋팅_MenuInfo
function getJsonStrMenuInfo(menuId)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMTAucHJvZ3JhbXNwZWM=",
		"map" : {
			"key" : "value",
			"mnuId" : menuId
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

var g_happyCallPop="";
var g_taxPop;

//메뉴 id를 받아 팝업으로 메뉴를 화면에 표시
function openMenuPopup(menuId, pTckId)
{
	var width = 0;
	var height = 0;
	
	// 메뉴 정보를 가져옴
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/getMenuInfo.do",
		data : "pJson=" + getJsonStrMenuInfo(menuId),
		success : function(data)
		{
			if(data != null)
			{
				if(data.MNU_URL.substring(0, 4) == "http")
				{
					window.open(data.MNU_URL);
				}
				else
				{
					if(data.WDT_SZ != null)
						width = parseInt(data.WDT_SZ);
					else
						width = 1200;
					
					if(data.WDT_SZ != null)
						height = parseInt(data.HGHT_SZ);
					else
						height = 800;
					
					var top = ((screen.height - height) / 2) / 2;
					var left = (screen.width - width) / 2;
					
					//var top = window.screenTop + (screen.height - height) / 2;
					//var left = window.screenLeft + (screen.width - width) / 2;
					
					var paramURL = getContextPath() + "/web" + data.MNU_URL;
					var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
					
					if((!g_happyCallPop.closed && g_happyCallPop) && menuId=="CM0202"){
						g_happyCallPop.focus();
						return;
					}
					
					if(data.MNU_ID=="OM0201"){
						paramURL += "?ap=y&regist=y";
					}
//					if(data.MNU_ID=="JS0001" && g_OpenPopupObject[data.MNU_ID]){
//						var oldPopup=g_OpenPopupObject[data.MNU_ID].win_obj;
//						oldPopup.close();
//					}
					
					var newWindow;
					if(menuId=="CS0003"){
//						g_taxPop=window.open(paramURL, data.MNU_ID, option);
						
						g_taxPop = window.open(paramURL, data.MNU_ID, "resizable");
						g_taxPop.resizeTo(width,height);
						g_taxPop.focus();
					}else{
						if (pTckId != null) {
//							newWindow=window.open(paramURL+"?tckId="+pTckId, data.MNU_ID, option);
							newWindow=window.open(paramURL+"?tckId="+pTckId, data.MNU_ID, "resizable");
						} else {
//							newWindow=window.open(paramURL, data.MNU_ID, option);
							newWindow=window.open(paramURL, data.MNU_ID, "resizable");
						}
						newWindow.resizeTo(width,height);
						newWindow.focus();
					}

					//해피콜팝업
					if(menuId=="CM0202"){
						g_happyCallPop=newWindow;
						g_happyCallgb="popup";
					} 
					
					var popupListObj = new Object();
					if(newWindow != null){
						var objTemp = {
								"mnu_id" : data.MNU_ID,
								"mnu_nm" : data.MNU_NM,
								"mnu_url" : data.MNU_URL,
								"use_yn" : data.USE_YN,
								"win_obj" : newWindow
							}
							
						popupListObj[data.MNU_ID]= objTemp;
											
						// 열리는 팝업창 인스턴스를 배열에 삽입
						getOpenPopupList(data.MNU_ID, popupListObj);

					}
					
					if(menuId=="CS0003"){
						g_taxPop.focus();
					}else{
						newWindow.focus();
					}
					
				}
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function getOpenPopupList( menuID, popupObj){
 
	// 중복등록 체크
	if(g_OpenPopupObject[menuID]){
		return;
	}

	g_OpenPopupObject[menuID]=popupObj[menuID];
	 
	var value=""; 
	
	$("#ulRecentMenu").html("");
  
	$.each(g_OpenPopupObject, function(key, val)
	{
		value += "<li value='" + val.mnu_id + "' class='ui-menu-item' id='liRecentMenu_" +(val.mnu_id).substring(2, 6)+ "'>" + val.mnu_nm + "</li>";
	});
	 
	$("#ulRecentMenu").append(value);
	$("#ulRecentMenu").menu();

}
//json 개행문자 치환
function jsonEscape(str)  {
    return str.replace(/\n/g, "<br>").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

//(한글)바이트 단위로 자를기
function cutByLen(str, maxByte) {

	for(b=i=0;c=str.charCodeAt(i);) {
		b+=c>>7?2:1;
		
		if (b > maxByte)
		break;
	
		i++;
	}

	return str.substring(0,i);
}

// 문자열의 길이를 구하는 함수 
function fn_strlen(str) { 
  var len = 0;
  for(var i=0;i<str.length;i++) {
    len += (str.charCodeAt(i) > 128) ? 2 : 1;
  }
  return len;
}

// 문자열에서 시작위치와 길이를 주면 substring 하여 리턴한다. 
function fn_subString(str,start,size) {
  
  var lim = 0;
  var pos = 0;
  var beg = 0;
  var minus = 0;
  var len = fn_strlen(str);
  
// 시작위치까지 skip하는 로직 
  for(var i=0;pos<start;i++) {
    pos += (str.charCodeAt(i) > 128) ? 2 : 1;
  }
  
  beg = i;
  
  // 시작위치에서 길이만큼 잘라내는 로직
  for (var i=beg; i<len; i++) {
    lim += (str.charCodeAt(i) > 128) ? 2 : 1;
    
    if (lim > size) { 
      return str.substring(beg,i);  
    }
  }
}


//입력문자 복제
function copyText(obj,target) {
   	
   	var curText=$(obj).val();
   	$("#"+target).val("");
   	$("#"+target).val(curText);
   	
}

//입력문자 복제
function copyCont(dest,target,cont,filler){
	 
   	var curText=$("#"+dest).val();
   	if(cont=="change"){
   		$("#"+target).val("");
   		$("#"+target).val(curText);
   	}else if(cont=="attach"){
   		  var oldTxt=$("#"+target).val();
   		  $("#"+target).val(oldTxt+" "+curText);
   	}else if(cont=="insert"){
   		  var oldTxt=$("#"+target).val();
   		  $("#"+target).val(oldTxt+filler+curText+"]");
   	}else if(cont=="delete"){
   		   
   		  $("#"+dest).val("");
   	}
   	
}

// 현재 날짜
function getDate()
{
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	
	return year + "-" + month + "-" + day; 
}

//현재월 1일
function getDate1()
{
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = "1";
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	
	return year + "-" + month + "-" + day; 
}

//입력한 값의  1일
function getInputDate01(d)
{
	var date = new Date(d);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = "1";
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	
	return year + "-" + month + "-" + day; 
}

// 현재 시간
function getTime()
{
	var date = new Date();
	var hh = date.getHours();
	var mm = date.getMinutes();
	
	if (hh < 10) 
		hh = "0" + hh;
	if (mm < 10)
		mm = "0" + mm;
	
	return hh + ":" + mm;
}

/**
 * Return curent date time of client PC
 * @returns {String}
 */
function getDateTime() 
{
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hh = date.getHours();
	var mm = date.getMinutes();
	var ss = date.getSeconds();
	
	if (month < 10)
		month = "0"+month;
	if (day < 10)
		day = "0"+day;
	if (hh < 10) 
		hh = "0" + hh;
	if (mm < 10)
		mm = "0" + mm;
	if (ss < 10)
		ss = "0" + ss;
	
	return year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
}

// yyyymmdd 형태리턴
function yyyyMMddhhmmss(job) {
	var date = new Date();
	var rtnDate="";
   var yyyy = date.getFullYear();
   var mm = (date.getMonth()+1)<10?"0"+""+(date.getMonth()+1):(date.getMonth()+1); // getMonth() is zero-based
   var dd  = date.getDate()<10?"0"+""+date.getDate():date.getDate();
	var hh = date.getHours()<10?"0"+""+date.getHours():date.getHours();
	var mi = date.getMinutes()<10?"0"+""+date.getMinutes():date.getMinutes();
	var ss = date.getSeconds()<10?"0"+""+date.getSeconds():date.getSeconds();
	rtnDate=yyyy+""+mm+""+dd+""+hh+""+mi+""+ss;
   return rtnDate;
}
 

//현재 시간
function getTimeTenMin()
{
	var date = new Date();
	var hh = date.getHours() + 0;
	var mm = date.getMinutes() + 0;
	
	return hh + ":" + Math.floor(mm / 10)+"0";
}

// 현재시간과의 시간차이를 디지털 시간 형태로 반환
function getDiffTime(p_oldTime, p_newTime)
{
	if(p_oldTime != null)
	{
		var diffSecond= parseInt((p_newTime.getTime() - p_oldTime.getTime()) / 1000);
		
		if(diffSecond < 0)
			return "00:00:00";
		else
		{
			var hour = parseInt(diffSecond / 3600);
			var minute = parseInt(parseInt(diffSecond % 3600) / 60);
			var second = parseInt(parseInt(diffSecond % 3600) % 60);
			var returnStr = "";
			
			returnStr += hour.toString().length == 1 ? "0" + hour.toString() : hour.toString();
			returnStr += ":";
			returnStr += minute.toString().length == 1 ? "0" + minute.toString() : minute.toString();
			returnStr += ":";
			returnStr += second.toString().length == 1 ? "0" + second.toString() : second.toString();
			
			return returnStr;
		}
	}
	else
	{
		return "00:00:00";
	}
}

//현재시간과의 시간차이를 초로반환
function getDiffSecond(p_oldTime, p_newTime)
{
	if(p_oldTime != null)
	{
		var diffSecond = Math.round(((p_newTime.getTime() - p_oldTime.getTime()) / 1000) * 10) / 10;
		if(diffSecond < 0)
			return 0;
		else
			return diffSecond;
	}
	else 
		return 0;
}

/**
 * 전화번호 포맷으로 변환하여 리턴한다.
 * 
 * @param telNo
 */
function fnGetTelNoFormat(telNo) 
{
	var formatTelNo = "";
	
	if (telNo != null && telNo != undefined) {
		var nLen = telNo.length;
		if (nLen <= 4) {
			formatTelNo = telNo;
		} else {
			if (nLen == 7) {
				formatTelNo = telNo.substring(0, 3) + "-" + telNo.substring(3);
			} else if (nLen == 8) {
				formatTelNo = telNo.substring(0, 4) + "-" + telNo.substring(4);
			} else {
				if (telNo.indexOf("02") == 0) {
					if (nLen == 9) {
						formatTelNo = telNo.substring(0, 2) + "-" + telNo.substring(2, 5) + "-" + telNo.substring(5);
					} else if (nLen == 10){
						formatTelNo = telNo.substring(0, 2) + "-" + telNo.substring(2, 6) + "-" + telNo.substring(6);
					} else {
						
					}
				} else if (telNo.indexOf("010") == 0) {
					if (nLen == 10) {
						formatTelNo = telNo.substring(0, 3) + "-" + telNo.substring(3, 6) + "-" + telNo.substring(6);
					} else {
						formatTelNo = telNo.substring(0, 3) + "-" + telNo.substring(3, 7) + "-" + telNo.substring(7);
					}
				} else {
					if (nLen == 10) {
						formatTelNo = telNo.substring(0, 3) + "-" + telNo.substring(3, 6) + "-" + telNo.substring(6);
					} else {
						formatTelNo = telNo.substring(0, 3) + "-" + telNo.substring(3, 7) + "-" + telNo.substring(7);
					}
				}
			}
		}
	} else {
		formatTelNo = "";
	}
	
	return formatTelNo;
}

/**
 * Sleep 함수
 * 
 * @param ms milliseconds
 */
function fnSleep(ms){
  ts1 = new Date().getTime() + ms;
  do ts2 = new Date().getTime(); while (ts2<ts1);
}

//Date형식 객체를 날짜형태로 반환
function changeDateString(p_date)
{
	var year = p_date.getFullYear();
	var month = p_date.getMonth() + 1;
	var day = p_date.getDate();

    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;

    return year + "" + month + "" + day;
}

// Date형식 객체를 시간형태로 반환
function changeTimeString(p_date)
{
	var hours = p_date.getHours() < 10 ? "0" + p_date.getHours() : p_date.getHours();
	var minutes = p_date.getMinutes() < 10 ? "0" + p_date.getMinutes() : p_date.getMinutes();
	var seconds = p_date.getSeconds() < 10 ? "0" + p_date.getSeconds() : p_date.getSeconds();
    
    return hours + "" + minutes + "" + seconds;
}

//자기 자신 창 닫기
function selfClose()
{
    var version = navigator.appVersion;
    
    if(version.indexOf("Chrome") >= 0){ 		// Chrome
    	window.open('about:blank', '_self');
        parent.close();
//        window.open('about:blank','_self').self.close();
    }
    else if(version.indexOf("Edge") >= 0)		// Edge
    {
        window.open('about:blank', '_self');
        parent.close();
    }
    else if(version.indexOf("Firefox") >= 0)	// Firefox
    {
        window.open('about:blank', '_self');
        parent.close();
    }
    else if (version.indexOf("MSIE") <= 0)		// IE
    {
        window.open('about:blank', '_self');
        parent.close();

    }  
    else
    {
        // IE 6.0에서
        window.opener = self;
        self.close();
    }
    return;
}

// 현재 컨텍스트를 반환
function getContextPath()
{
	// context path 존재 하지 않는 프로젝트일 경우
	var ctxPath = "http://" + location.host;
//	var ctxPath = "";
	
	return ctxPath;
    
	/*
	if(location.host.match("/"))
	{
		// context path 존재 하는 프로젝트일 경우
	    var offset = location.href.indexOf(location.host) + location.host.length;
	    var ctxPath = location.href.substring(offset, location.href.indexOf('/', offset + 1));
	    
	    //alert("if getContextPath() " + ctxPath);
	    return ctxPath;
	}
	else
	{
		// context path 존재 하지 않는 프로젝트일 경우
		var ctxPath = "http://" + location.host;
		//alert("else getContextPath() " + ctxPath);
		
		return ctxPath;
	}
	*/
}

// 날짜 변환 yyyymmdd -> yyyy-mm-dd
function dateFormat(date)
{
	var dateForm = "";
	
	if(date != null && date != '')
	{
		var sDate = String(date);
		var sYear = sDate.substring(0,4);
		var sMonth = sDate.substring(4,6);
		var sDay = sDate.substring(6,8);
		dateForm = sYear + "-" + sMonth + "-" + sDay; 
	}
	
	return dateForm;
}

//시간 변환 hhmmss -> hh:mm:ss
function timeFormat(time)
{
	var timeForm = "";
	
	if(time != null && time != '')
	{
		var sTime = String(time);
		var sHour = sTime.substring(0,2);
		var sMinute = sTime.substring(2,4);
		var sSecond = sTime.substring(4,6);
		timeForm = sHour + ":" + sMinute + ":" + sSecond; 
	}
	
	return timeForm;
}

// 오늘 날짜 요일 구하기
function getTodayLabel(vv) {
	var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'); 
	
	var week2 = new Array('일', '월', '화', '수', '목', '금', '토'); 
	
	var today = new Date().getDay(); 
	var todayLabel="";
	if(vv=="1"){
		todayLabel = week2[today]; 
	}else{
		todayLabel = week[today]; 
	}
	return todayLabel; 
} 

/* 
 * 특정 날짜 요일 구하기
 * getTodayLabel2("2021-11-08") -> 월요일
 * getTodayLabel2("2021-11-08","1") -> 월
*/
function getTodayLabel2(date,vv) {
	var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'); 
	
	var week2 = new Array('일', '월', '화', '수', '목', '금', '토'); 
	
	var today = new Date(date).getDay(); 
	var todayLabel="";
	if(vv=="1"){
		todayLabel = week2[today]; 
	}else{
		todayLabel = week[today]; 
	}
	return todayLabel; 
} 

/*
 * 해당 일이 주말이면 다음날 날짜 반환
 * date : 날짜
 * format : "-" 넣으면 - 붙여서 반환
 */
function getWorkDay(date,format){ //20120331 주말
	if(date.length == 8){
		date = dateFormat(date); // 닐짜 계산을 위해 2021-01-01 형식으로 변환
	}
	
	var day = new Date(date);
	
	if(getTodayLabel2(date,"1") == "토" || getTodayLabel2(date,"1") == "일"){
		day.setDate(day.getDate() + 1);
	}
	
	day = changeDateString(day); // 20210101 반환
	
	if(format == "-"){
		day = dateFormat(day);	// 2021-01-01 반환
	}
	
	return day;
}

//jquery datepicker
function datePicker(id)
{
	$(function() {	    
	    $(id).datepicker({
	    	showOn: 'button',
	    	buttonImage : "/resources/images/icon_cal_drop.gif",
	    	buttonImageOnly: true,
	    	dateFormat : 'yy-mm-dd',
	    	monthNamesShort : ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	        dayNamesMin : ['일','월','화','수','목','금','토'],
	    	changeMonth : true,
	        changeYear : true,
	    	showMonthAfterYear : true,
	      });
	    
	    $(".ui-datepicker-trigger").css("vertical-align","middle");
	});
}

//요소 생성
function createElement(targetId, createId, createValue)
{
	var $targetId = $("#"+targetId)	// 요소 생성할 위치
	,	$createId = createId	// 생성할 요소를 구분할 값
	,	$createValue = createValue; // 생성할 요소에 보여줄 값
	
	$targetId.append("<label id = '"+ $createId +"'>"+$createValue+"</label>");
	
	return $targetId;
}

//업무담당자 엘리먼트 삭제 이벤트
function mainElementDelete(regType)
{
	var $tckt_id = this.getAttribute("tckt_id");
	var $srvy_type_cd = this.getAttribute("srvy_type_cd");
	var $emp_id = this.getAttribute("emp_id");
	
	var $fl_id = this.getAttribute("fl_id");
	var loParam = {};
	if(regType.data == "responsible")
	{
		loParam ={
			"qt" : "ZGVsZXRl",
			"mi" : "Y20wMDgucmVzRGVsZXRl",
			"map" : {
				"key" : "value",
				"tckt_id" : $tckt_id,
				"srvy_type_cd" : $srvy_type_cd,
				"emp_id" : $emp_id,
				"use_yn" : "N"
			}
		};
	}
	else if(regType.data == "file")
	{
		loParam ={
				"qt" : "ZGVsZXRl",
				"mi" : "b20wMTkuZGVsZXRlRmlsZVVzZVlu",
				"map" : {
					"key" : "value",
					"use_yn" : "N",
					"fl_id" : $fl_id
				}
		};
	}
	
	//파라미터 셋팅_getJsonStrDeleteElement
	function getJsonStrDeleteElement(param)
	{
		var loParam = param;
		
		return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
	}
	
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/deleteElement.do",
		data : "pJson=" + getJsonStrDeleteElement(loParam),
		success : function(data)
		{
			if(data != 0)
				alert("삭제되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	if(regType.data != "file" && this.parentNode.parentNode.childNodes.length == "2" )
	{
		$("#"+this.parentNode.parentNode.childNodes[0].id).remove();
		$("#"+this.parentNode.parentNode.childNodes[0].id).remove();
	}
	else
		$("#"+this.parentNode.getAttribute("id")).remove();
}

/*--------------------  Globee Append begin --------------------------*/
//function getJsonStr(qt, mi, map) {
//    var pObj = {
//    	"qt" : qt,
//    	"mi" : mi,
//    	"map" : map
//	};
//	return encodeURIComponent(JSON.stringify(pObj));
//}
function getJsonStr(qt, mi, map) {
    var pObj = {};
	if (mi === null) {
		if (qt === null) {
		    pObj = map;
		} else {
		    pObj["qt"] = qt;
		    pObj["pList"] = map;
		}
	} else {
	    pObj["qt"] = qt;
	    pObj["mi"] = mi;
	    pObj["map"] = map;
	}
	
	return encodeURIComponent(JSON.stringify(pObj));
}

//2019.12.30 hhs 소문자->대문자로 변경
function defaultSuccessHandler(data) {
	try {
		var result = $.parseJSON(data);
		if (result.MESSAGE && result.MESSAGE != "") {
			alert(result.MESSAGE);
		}
		if (result.CALLBACK && result.CALLBACK != "") {
			window[result.CALLBACK](result.data);
		}
		if (result.REDIRECTURL && result.REDIRECTURL != "") {
			document.location.href = result.REDIRECTURL;
		}
		return true;
	} catch (e) {
		return false;
	}
}

function defaultErrorHandler(data) {
	alert("에러가 발생하였습니다.");
}

function gSubmitPost(formId, isUpload) { //여기2
	var form = $("#" + formId);

	if (isUpload == true) {
		form.attr("encoding", "multipart/form-data");
	} else if (isUpload == false) {
		form.attr("encoding", "");
	}

	form.ajaxSubmit({
		type : 'post',
		debug : true,
		success : defaultSuccessHandler,
		error : defaultErrorHandler
	});
}

function gAppendHidden(p_form, p_name, p_val) { //여기1
	if (!p_form)
		return;
	// Hidden 항목을 생성합니다.
	var o_hidden = document.createElement("input");
	o_hidden.type = "hidden";
	o_hidden.name = p_name;
	o_hidden.value = p_val;
	// 폼에 히든항목을 붙입니다.
	var form = $("#" + p_form);
	form.append(o_hidden);
}

//window open
function gf_openDialog(argPage, argWidth, argHeight, argScroll, argResizable,top,left) {
	var openWin = window.open(argPage,"win","width="+argWidth+",height="+argHeight+",scrollbars="+argScroll+",resizable="+argResizable+",top="+top+",left="+left+",copyhistory=no,toolbar=no,status=no");
	openWin.focus();
}

// window modal open
function gf_openModalDialog(argPage, argVal, argWidth, argHeight, argScroll) {
	var openWin = window.showModalDialog(argPage, argVal,"dialogWidth:"+argWidth+"px; dialogHeight:"+argHeight+"px; center=yes; location:no; directories:no; resizable:no; status:no; help:no; scroll:" + argScroll+ "; ");
	return openWin;
}

function onlyNumeric(lsVal) {
    if( /[^0-9]/.test(lsVal) ) {
       return false;
    }
    return true;     
}

function onlyAlphaNumeric(lsVal) {
    if( /[^a-zA-Z0-9]/.test(lsVal) ) {
       return false;
    }
    return true;     
}

/*--------------------  Globee Append end --------------------------*/

/**
 * 앞자리 번호 넣기
 * @param tfCallNum
 * @returns {String}
 */
function areaNumber(tfCallNum){
	
//	tfCallNum=tfCallNum.trim();
	var filtNum=tfCallNum.replace(/[^0-9]/g,"");
	
	var pLength = arguments.length;
	if(pLength==2){
		return filtNum;
	}
	if(!filtNum) return "";
	
	//숫자체크
	if(isNaN(filtNum) == true) {
		 return "";
	};
	// 0617774444(10), 0617494444(10-시청), 7494444(7-시청), 77774444(8), 027774444(9), 0277774444(10), 0317774444(10), 03177774444(11)
	// 0107774444(10), 01077774444(11)
	// 2021.10.18 기준 수정
	if(filtNum.length >= 9){
		//휴대폰, 지역번호
		if(filtNum.substring(0,1)!="0"){
			alert(filtNum+" 전화번호를 확인해 주세요.");
			return;
		}else if(filtNum.substring(0,6) == "061749"){
			// 지자체 내선
			// ex) 8 + 내선번호 4자리
			filtNum = "8"+filtNum.substring(6,10);
		}else{
			// 일반 지역전화 (0617729999)
			filtNum = "9"+filtNum;	// ex) 9 + 7221111 or 9 + 111222
		}
	}else if(filtNum.length>=7){
		if(filtNum.substring(0,1) == "0"){
			alert(filtNum+" 전화번호를 확인해 주세요.");
			return;
		}else if(filtNum.substring(0,3) == "749"){ // ex) 7494242
			// 지자체 내선번호로 들어올때
			filtNum = "8"+filtNum.substring(3,7); // ex) 84242
		}else{
			// 지자체 아닌 일반 지역전화
			filtNum = "9"+filtNum;	// ex) 9 + 11112222 or 9 + 111222
		}
	}else if(filtNum.length <= 6){
		if(filtNum.substring(0,1) != "9" && filtNum.length ==5){
			alert(filtNum+" 전화번호(내선)를 확인해 주세요.");
			return;
		}else if(filtNum.length < 4 || filtNum.length==6){
			alert(filtNum+" 전화번호(내선)를 확인해 주세요.");
			return;
		}else if(filtNum.length == 4){
			
			// 콜센터는 '9'를 붙이지 않는다. 1xxx
			// 공무원 내선으로 가기 때문에 8을 붙인다.
			if(filtNum.substring(0,1)!="1"){
				filtNum = "8"+filtNum; // ex) 84242
			}
		}
	}
	console.log("MAKECALL ==> " + filtNum);
	return filtNum;
}

// 업로드  파일 사이즈 체크 
function fileCheck( fileFormName , limitSize )
{
        // 사이즈체크
        var maxSize  = 5 * 1024 * 1024    //30MB
        var fileSize = 0;

	// 브라우저 확인
	var browser=navigator.appName;
	// 익스플로러일 경우
	if (browser=="Microsoft Internet Explorer")
	{
		var oas = new ActiveXObject("Scripting.FileSystemObject");
		fileSize = oas.getFile( fileFormName.value ).size;
	}
	// 익스플로러가 아닐경우
	else
	{
		fileSize = fileFormName.files[0].size;
	}

	//alert("파일사이즈 : "+ fileSize/1000000 +"MB, 최대파일사이즈 : "+limitSize+"MB");
	return (fileSize/1000000).toFixed(2);
//        if(fileSize > maxSize)
//        {
//            alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.    ");
//            return;
//        }
}

//파일 확장자 체크
function fileExtnsCheck(fileFormName) 
{   
	var file = fileFormName.value;  								// 폼.파일이름.value
	var fileExt = file.substring(file.lastIndexOf('.')+1); 	//파일의 확장자를 구합니다.
	var bSubmitCheck = true;

	if( !file )
	{ 
		alert( "파일을 선택하여 주세요!");
		return false;
	}

	if(fileExt.toUpperCase() == "EXE" || fileExt.toUpperCase() == "DLL" || fileExt.toUpperCase() == "JSP" || 
			fileExt.toUpperCase() == "JS" || fileExt.toUpperCase() == "ASP" || fileExt.toUpperCase() == "PHP" || 
			fileExt.toUpperCase() == "HTML" || fileExt.toUpperCase() == "HTM" )
	{
		//alert("EXE, DLL, JSP, JS, ASP, PHP, HTML, HTM 파일은 업로드 하실 수 없습니다!");
		return false;
	}
	else
		return true;

}

//사용자등급코드를 int값으로 반환(15-10-16 추가)
function getUserGrdCode() {
	var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	return !isNaN(usrGrdCd) ? parseInt(usrGrdCd) : 0;
}

//숫자만 입력
function onlyNumber(obj) {
   	$(obj).keyup(function(){
    	 $(this).val($(this).val().replace(/[^0-9]/g,""));
	}); 
}

function getImgUrl()
{
   return "http://172.17.100.100:8080/";
   //return "http://119.207.41.62:8989/"; //IP_2
}

function replaceFileUrl(localUrl)
{
   var url = localUrl.replace("/shared/","");
   return url;
}

// ajax 콜 에러 시 alert 표시
function networkErrorHandler(data, status, err)
{
//	alert("네트워크 연결을 확인 해 주세요.");
	alert("요청을 처리하지 못했습니다.\n 잠시 후 다시 확인 해 주세요.");
}

/**
 * 초를 시간으로 변환
 * 
 * @param seconds
 * @returns hour + ":" + min + ":" + sec
 */
function getSecToTime(seconds) 
{
	var hour = parseInt(seconds / 3600);
	var min = parseInt((seconds % 3600) / 60);
	var sec = seconds % 60;

	return hour + ":" + min + ":" + sec;
}

/*
 * 해당 일자가 속한 주의 시작일자를 구한다.
 * @param : 'YYYYMMDD'
 */
function commWeekStartDay(pStrDate){
    
    var sDate = pStrDate.replace(/[-, :, \s]/g, "");
    
    var year = sDate.substr(0,4);
    var month = sDate.substr(4,2);
    var day = sDate.substr(6,2);
    
    var iDay = parseInt(new Date(year, month-1, day).getDay());
    var sStartDate = new Date(year, parseInt(month)-1, parseInt(day) - iDay); //선택한 요일의 시작일을 구한다.
    
    var sStartYear = sStartDate.getFullYear();
    var sStartMonth = parseInt(sStartDate.getMonth() + 1);
    var sStartDay = sStartDate.getDate();
    
    var weekStartDay = '' + sStartYear + (sStartMonth < 10 ? '0' + sStartMonth : sStartMonth) + (sStartDay < 10 ? '0' + sStartDay : sStartDay);
    
    return weekStartDay;
}


/*
 * 해당 일자가 속한 주의 종료일자를 구한다.
 * @param : 'YYYYMMDD'
 */
function commWeekEndDay(pStrDate){
    
    var sDate = pStrDate.replace(/[-, :, \s]/g, "");
    
    var year = sDate.substr(0,4);
    var month = sDate.substr(4,2);
    var day = sDate.substr(6,2);
    
    var iDay = parseInt(new Date(year, month-1, day).getDay());
    
    var diffDay = 6 - iDay;
    
    
    var sEndDate = new Date(year, parseInt(month)-1, parseInt(day) + diffDay); //선택한 요일의 종료일을 구한다.
    
    var sEndYear = sEndDate.getFullYear();
    var sEndMonth = parseInt(sEndDate.getMonth() + 1);
    var sEndDay = sEndDate.getDate();
    
    var weekEndDay = '' + sEndYear + (sEndMonth < 10 ? '0' + sEndMonth : sEndMonth) + (sEndDay < 10 ? '0' + sEndDay : sEndDay);

    return weekEndDay;
}

/**
 * 일자 계산
 * 
 * @param datetype : "Y"(년), "M"(월), "D"(일)
 * @param vday : 가감 숫자
 * @param opr : 연산기호 ("+", "-") 
 * @returns year + ":" + month + ":" + date
 * 예상치 못한 변수가 발생할 수도 있음...
 */
function getPrvDay(datetype, vday, opr)
{
	var dDate = getDate();
	var arr = dDate.split('-');
	var dat = new Date(dDate);
	var rtnDate = new Date();
	
	//년도 가감
	if (datetype.toUpperCase(datetype) == "Y")
	{
		if (opr == "+")
			rtnDate = (dat.getFullYear() + vday) + "-" + dat.getMonth() + "-" + dat.getDate();
		else if (opr == "-")
			rtnDate = (dat.getFullYear() - vday) + "-" + (dat.getMonth() + 1) + "-" + dat.getDate();

	}
	//월 가감
	else if (datetype.toUpperCase(datetype) == "M")
	{
		if (opr == "+")
		{
			//12월을 넘어 갈 경우
			if ((dat.getMonth() + vday) > 12)
			{
				rtnDate = (dat.getFullYear() + 1) + "-" + ((dat.getMonth() + vday) - 12) + "-" + dat.getDate();
			}
			else 
				rtnDate = dat.getFullYear() + "-" + (dat.getMonth() + vday) + "-" + dat.getDate();
		}
		else if (opr == "-")
		{
			//계산월이 "-"일 경우 전년도, 계산된 월
			if ((dat.getMonth() - vday) < 1)
			{
				rtnDate = (dat.getFullYear() - 1) + "-" + (12 + (dat.getMonth() - vday)) + "-" + dat.getDate();
			}
			else {
				rtnDate = dat.getFullYear() + "-" + (dat.getMonth() + 1 - vday) + "-" + dat.getDate();
			};
		};

	}
	//일 가감
	else if (datetype.toUpperCase(datetype) == "D")
	{
		if (opr == "+")
		{
			//해당월의 마지막 날을 넘을 경우
			if ((dat.getDate() + vday) > getLastDate(dat))
			{				
				rtnDate = dat.getFullYear() + "-" + (dat.getMonth() + 1) + "-" + ((dat.getDate() + vday) - getLastDate(dat));
			}
			else
				rtnDate = dat.getFullYear() + "-" + dat.getMonth() + "-" + (dat.getDate() + vday);
		}
		else if (opr == "-")
		{
			//일이 "0"일 경우 전월과 전월의 마지막일
			if ((dat.getDate() - vday) == 0)
			{
				rtnDate = dat.getFullYear() + "-" + (dat.getMonth() - 1) + "-" + getLastDate(dat);
			}
			//일이 "-"일 경우 전월과 전월의 마지막일 + 현재월일 - 계산일자
			else if ((dat.getDate() - vday) < 0)
			{
				rtnDate = dat.getFullYear() + "-" + (dat.getMonth() + 1 - 1) + "-" + (getLastDate(dat) + dat.getDate() - vday);
			}
			else {
				rtnDate = dat.getFullYear() + "-" + dat.getMonth() + "-" + (dat.getDate() - vday);
			}
		}
	
	}
	
	var arrRtn = rtnDate.split('-');
	
	if (arrRtn[1] < 10)
		arrRtn[1] = ("0" + arrRtn[1]);
	
	if (arrRtn[2] < 10)
		arrRtn[2] = ("0" + arrRtn[2]);
	
	rtnDate = arrRtn[0] + "-" + arrRtn[1] + "-" + arrRtn[2]
	
	return rtnDate;
}

/**
 * 해당월의 마지막 일자
 * 
 * @param vdate : new Date(arr[0], arr[1], arr[2])
 * @returns 마지막일자
 */
function getLastDate(vdate)
{
	return new Date(vdate.getFullYear(), vdate.getMonth() + 1, 0).getDate();
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

/**
 * Secure Hash Algorithm (SHA256) http://www.webtoolkit.info/
 * Original code by Angel Marin, Paul Johnston.
 */
function SHA256(s)
{
	var chrsz = 8;
	var hexcase = 0;
 
	function safe_add (x, y)
	{
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		
		return (msw << 16) | (lsw & 0xFFFF);
	}
 
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	function R (X, n) { return ( X >>> n ); }
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
 
	function core_sha256 (m, l)
	{
		var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
		var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
		var W = new Array(64);
		var a, b, c, d, e, f, g, h;
		var T1, T2;
		 
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;
		 
		for ( var i = 0; i<m.length; i+=16 )
		{
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
			 
			for ( var j = 0; j<64; j++)
			{
				if (j < 16)
					W[j] = m[j + i];
				else
					W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
				 
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
				 
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
			 
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		
		return HASH;
	}
	 
	function str2binb (str)
	{
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		
		for(var i = 0; i < str.length * chrsz; i += chrsz)
		{
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
		}
		
		return bin;
	}
	 
	function Utf8Encode(string)
	{
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		 
		for (var n = 0; n < string.length; n++)
		{
			var c = string.charCodeAt(n);
		 
			if (c < 128)
			{
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048))
			{
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else
			{
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		 
		return utftext;
	}
	 
	function binb2hex (binarray)
	{
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		
		for(var i = 0; i < binarray.length * 4; i++)
		{
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
		}
		
		return str;
	}
	 
	s = Utf8Encode(s);
	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}


// 쿠키 생성
function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    }
 
// 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

// 해당날짜에 +,- 된 날짜 가져오기
function getAddDate(date, day){
	
	var myDate = new Date(date)  
	myDate.setDate(myDate.getDate() + day)
	
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	
	return year + "-" + month + "-" + day;
}


// dropdownMultiCheckbox
$.extend($.fn,{
	dropdownMultiCheckbox : function(){
		
		var topParent = this;
		// 전체선택 input 생성
		this.find("dd>ul").prepend("<li><input type='checkbox' class='allmultichk' /> 전체선택</li>");
		
		this.setCheckedCnt();
		// multi select box click시 dropdownBox 열기/닫기
		this.find("dt").on('click',function(){
			// 다른 셀렉트박스가 열렸을 경우 닫기
			$(".dropdownBox dt").not(this).nextAll().filter("dd").hide();
			$(this).nextAll().filter("dd").slideToggle('fast');
		});
		
		// 전체 선택 체크/해제 시
		this.find(".allmultichk").on('click', function(e){
			var chk = $(this).is(':checked');
			
			if(chk){					
				$(this).parent().nextAll().find("input[type='checkbox'][class!='allmultichk']").prop('checked', true);					
			}else{
				$(this).parent().nextAll().find("input[type='checkbox'][class!='allmultichk']").prop('checked', false);	
			}
			topParent.setCheckedCnt();
		});
		
		// 항목 체크박스 체크 시 선택된 개수 update
		this.find("dd input[type='checkbox'][class!='allmultichk']").on('click',function(e){
			
			topParent.setCheckedCnt();
		});
		
		// dropbox에 포커스가 나간경우 닫기
		$('body').mousedown(function(e){
			$('.dropdownBox').each(function(){
				if($(this).find("dd").css('display') == 'block'){
					if(!$(this).has(e.target).length){
						$(this).find("dd").hide();
					}
				}
			});
		});
	},
	
	// 체크된 cnt 세팅
	setCheckedCnt : function(){
		var chk_cnt = this.find("dd input[type='checkbox'][class!='allmultichk']:checked").length;
		var all_cnt = this.find("dd input[type='checkbox'][class!='allmultichk']").length;
		
		if(chk_cnt == all_cnt){
			this.find(".multiCheckValues").html("전체선택");
			this.find("input[type='checkbox'][class='allmultichk']").prop('checked', true);				
		}else{
			this.find(".multiCheckValues").html("선택 "+chk_cnt+"/총 " + all_cnt+"");
			this.find("input[type='checkbox'][class='allmultichk']").prop('checked', false);			
		}
	}
});

/*
 * 사용자등급코드 권한 가져오기 
 * sm002 tp_cd = '90006'	
 * 
 * 센터 등급 코드
	000100	교육생
	010100	agent
	030100	manager
	030200	CS강사
	030300	QA강사
	050100	groupmanager
	060100	통합센터장
	090100	시스템운영자
*/	
function getGradTypeNm(usrGrdCd) {
	// AD:ADMIN, MN:MANAGER, AG:AGENT
	var grdTypeNm = "";
	
	if (usrGrdCd == "") {
		usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	}
		
	switch (usrGrdCd) {
		case "090100": 
			grdTypeNm = "AD";
			break;
		case "060100": case "050100": case "030300": case "030200": case "030100": case "020100":
			grdTypeNm = "MN";
			break;
		default:
			grdTypeNm = "AG";
	}
	
	return grdTypeNm;
}

/*
 * 숫자, 소수점만 입력 체크
 * val : 입력 값
 * objNm : 입력 객체명 (예시 : "inputName") 
 */
function ChkRegNum(val, objNm) { 
	if ((event.keyCode >= 48 && event.keyCode <= 57) || 
			(event.keyCode >= 96 && event.keyCode <= 105) || 
			event.keyCode == 110 || event.keyCode == 190 || 
			event.keyCode == 8 || event.keyCode == 9 || 
			event.keyCode == 13 || event.keyCode == 46){

            return true; 
        } else { 
            alert('숫자만 입력!'); 
            $("#" + objNm).val("");        	
            return false; 
        } 
}

//------------child function to solve codebook problem ---------------


function showDetailJisik2(tbbsId){
	var width = 1050;
	var height = 900;
	var top = 0;
	var left = (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/main/jisikDetail.do?TBBS_ID=" + tbbsId+"&JOB=main" + "&popup=CHILD";
	var option = "width=" + width + ", height=" + height+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top=" + top + ",left=" + left +"";
	window.sessionStorage.setItem("TBBS_ID", tbbsId);
	var newWindow = window.open(paramURL, "지식 검색", option);
	newWindow.focus();
}
function jisikRewordPopup(){
    openMenuPopup("JS0001");
}
// function jisikRewordPopupQuery(ExCd,LgCd,MdCd,SmCd,CdbGb,TbblTbl,PopLv){
function jisikRewordPopupQuery(LgCd,MdCd,SmCd,CdbGb,TbblTbl,PopLv){
	var width = 1710;
	var height = 910;
	var top = 0;
	var left = (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/myinfo/jisikReword.do?"
	// +"ExCd=" + ExCd
	// +"&LgCd=" + LgCd
	+"LgCd=" + LgCd
	+ "&MdCd=" + MdCd 
	+ "&SmCd=" + SmCd 
	+ "&CdbGb=" + CdbGb 
	+ "&TbblTbl=" + TbblTbl  //게시물 제목
	+ "&PopLv="+PopLv;
	var option = "width=" + width + ", height=" + height + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
	+ top + ",left=" + left +"";
	var newWindow = window.open(paramURL, "JS0001", option);
	newWindow.focus();		
}
function jisikRewordHis(jisikTbbsId, jisikTtl){
    	
	var width = 1100;
	var height = 868;
	var top = 0;
	var left = Math.ceil((window.screen.width - 1100)/2);
	// var top = Math.ceil((window.screen.height - 863)/2);
	/*if(jisikTtl) var paramURL = getContextPath() + "/web//myinfo/jisikRewordHis.do?jisikTtl="+encodeURIComponent(encodeURIComponent(jisikTtl))+"&jisikTbbsId="+jisikTbbsId;*/
	if(jisikTbbsId) var paramURL = getContextPath() + "/web/myinfo/jisikRewordHis.do?jisikTbbsId="+jisikTbbsId;
	else  var paramURL = getContextPath() + "/web/myinfo/jisikRewordHis.do";
	
	/*var paramURL = getContextPath() + "/web/myinfo/jisikRewordHis.do";*/
	var option = "width=" + width + ", height=" + height+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="+ top + ",left=" + left +"";
	var newWindow = window.open(paramURL, "JS0005", option);
	newWindow.focus();
}

function reqPopup(width, height, url, title){
    var width = width;
    var height = height;
    var top = 0;
    var left = Math.ceil((window.screen.width - width)/2);
    // var top = Math.ceil((window.screen.height - height)/2);

    var paramURL = getContextPath() + url;
    var option = "width=" + width + ", height=" + height
    + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
    + top + ",left=" + left +"";

    var newWindow = window.open(paramURL, title, option);
    newWindow.focus();	
}

function numberFormat(inputNumber) {
	if(inputNumber == undefined){
		inputNumber = 0;
	} 
	return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*
 * separator check
 * 입력한 separator 기준으로 검색할수있도록 처리
 * 
 * return arr;
 */
function separatorCheck(str,checkStr){
	var strArr 	= [];
	if(str == undefined) str = "";
	
	strArr = str.split(checkStr);
	strArr = strArr.filter(function(item)
	{
		return item !== null && item !== undefined && item !== '';
	});
	
	return strArr;
}

function getWindowSize(){
	/*
		window.innerWidth : 브라우저 화면의 너비
		window.innerHeight : 브라우저 화면의 높이
		window.outerWidth : 브라우저 전체의 너비
		window.outerHeight : 브라우저 전체의 높이
	 */
	console.log("브라우저 화면 너비" + window.innerWidth);
	console.log("브라우저 화면 높이" + window.innerHeight);
	console.log("브라우저 전체 너비" + window.outerWidth);
	console.log("브라우저 전체 높이" + window.outerHeight);
	console.log("메뉴관리에 너비/높이 셋팅시, outer size로 넣어야함");
}

/**
 * 테이블 HTML 복사 (클립보드)
 * @param tableId
 * @returns html
 */
function getHtmlCopy(tableId){
	if(document.body.createTextRange){
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(document.getElementById(tableId));
		textRange.execCommand("Copy");
	}else{
		window.getSelection().selectAllChildren(document.getElementById(tableId));
		document.execCommand("Copy");
	}
}