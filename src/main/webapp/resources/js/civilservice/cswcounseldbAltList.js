var s_strtDt = "";
var s_endDt = "";
var tbbs_Id = "";
var g_ListPopup = "GGGCHILD"
var tbbsCont = null;

//파라미터셋팅 commonList
function getJsonStrHistoryList(tbbs_Id, s_strtDt, s_endDt)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMTQuc2VsZWN0SGlzdG9yeUxpc3Q=",			// oh014.selectHistoryList
		"map" : {
			"key" : "value",
			"tbbsId" : tbbs_Id,
			"frDt" : s_strtDt,
			"toDt" : s_endDt
		}
	};
	//console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//detail
function getJsonStrShowDetailManual(reqId){
  var loParam = {
	    "qt" : "c2VsZWN0T25l",
	    "mi" : "b2gwMTQuc2VsZWN0SmlzaWtIaXN0b3J5",
	    "map" : {
		"reqid" : reqId			
	    }
  };
  //console.log(JSON.stringify(loParam));
  return encodeURIComponent(JSON.stringify(loParam));	
}

function setSelectBoxWithCnslCodeSync(code1, code2, code3){
  $("#csdbalt_optCounselKnd1").val(code1).trigger("change");
  $("#csdbalt_optCounselKnd2").val(code2).trigger("change");
  $("#csdbalt_optCounselKnd3").val(code3);
}


//file list
function getJsonFileList(reqId){
  var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbl_nm" : "oh013", //hhs 20.04.01
		"tbl_pk": tbbs_Id,
		"tbl_pk2": reqId,
		"orderby": "crtTime",
	    }
  };
  //console.log(JSON.stringify(loParam));
  return encodeURIComponent(JSON.stringify(loParam));
}

//file download 
function getJsonFileDownload(svr, loc){
  var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
  };
  //console.log(JSON.stringify(loParam));
  return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//attached file
function showAttachFiles(reqId){
 $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : getContextPath() + "/ajax/civilservice/cswfileList.do",
	data : "pJson=" + getJsonFileList(reqId),
	success : function(data){
	    $("#csdbalt_tblFiles").html(""); 
	    if(data != null && data != ""){
		var tr ="";
		for(var i in data){
		    var url = getContextPath() + "/file/civilservice/cswjisikSearchFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
		    tr += "<tr>";
		    tr += "<td><span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a>" +" "+ data[i].FL_KB_SZ + "</span></td>";
		    tr += "</tr>";
		}
		$("#csdbalt_tblFiles").append(tr); 					
	    }
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
 });
}

function showDetailManual(reqId){
  $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : getContextPath() + "/ajax/civilservice/cswjisikDetail.do",
	data : "pJson=" + getJsonStrShowDetailManual(reqId),
	success : function(data){	
	    var intvLgCd = data.INTV_LG_CD;
	    var intvMdCd = data.INTV_MD_CD;
	    var intvSmCd = data.INTV_SM_CD;
	    
	    $("#csdbalt_tfTbbsTtl").html(data.TBBS_TTL);   
//	    DEXT5.setBodyValue(data.TBBS_CNTN==null?"":data.TBBS_CNTN, 'tbbsCont');
		tbbsCont.SetEditMode(0);
		tbbsCont.SetEditorContent(data.TBBS_CNTN==null?"":data.TBBS_CNTN, function() {
			tbbsCont.SetEditMode(3);
		});
	    $("#csdbalt_tfCntrNm").html(data.CNTR_NM);
	    //$("#csdbalt_tfRespNm").html(data.RSPN_PRSN);
	    $("#csdbalt_tfRespNm").val(data.RSPN_PRSN);
	    $("#csdbalt_chkNotUseYN").val(data.CC_APPR_YN);
	    //$("#csdbalt_tfResponTel").html("");
	    //$("#csdbalt_tfResponTel").html(data.RESPON_TEL);
	    $("#csdbalt_tfResponTel").val("");
	    $("#csdbalt_tfResponTel").val(data.RESPON_TEL);
	    var crt =data.CRT_USR_NM?data.CRT_USR_NM:"";
	    var mod =data.MOD_USR_NM?data.MOD_USR_NM:"";
	    $("#csdbalt_RsctDt").html(data.CRT_DT_FORMAT +" " + data.CRT_TM_FORMAT+" "+crt);
	    $("#csdbalt_UpdtDt").html(data.MOD_DT_FORMAT +" " + data.MOD_TM_FORMAT+" "+mod);
	    //sync
  	    setSelectBoxWithCnslCodeSync(intvLgCd, intvMdCd, intvSmCd);
  	  showAttachFiles(reqId);
	},
	error : function(data, status, err)
	{
	    networkErrorHandler(data, status, err);
	}
  });
}

//일반리스트
function getHistoryList()
{
	$("#csdbalt_tblAltList").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/cswcounseldbAltList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrHistoryList(tbbs_Id, s_strtDt, s_endDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["REQ_ID", "일시", "작업자"/*, "진행상태", "사유"*/],
			colModel : [
				{ name : "REQ_ID", index : "REQ_ID", align : "center", width : 40, hidden : true },
				{ name : "WRK_DTTM_FORMAT", index : "WRK_DTTM_FORMAT", align : "center", width : 40 },
				{ name : "MOD_USER_NM", index : "MOD_USER_NM", align : "center", width : 30 }/*,
				{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 30 },
				{ name : "RTN_RSN", index : "RTN_RSN", align : "left", width : 100 }*/
			],
			sortname : "WRK_DTTM_FORMAT",
			sortorder : "desc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "710",
		   	width : "100%",
		   	rowNum : 20,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#csdbalt_pgAltList",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onSelectRow : function(rowid) {
		   		var row = $("#csdbalt_tblAltList").getRowData(rowid);
		   		showDetailManual(row.REQ_ID)		   		
		   	},
		   	onPaging : function(pgButton) {	   		
			   		
		   	}
	}).jqGrid("navGrid", "#csdbalt_pgAltList", {edit : false, add : false, del : false, search : false});
}

//조회버튼 클릭이벤트
function btnSearchClickEvent()
{
	s_strtDt = $("#csdbalt_selStrtDate").val();
	s_endDt = $("#csdbalt_selEndDate").val();
	
	var rMsg = "";
	
	if(s_strtDt == "" || s_endDt == "")
	{
		rMsg += "날짜가 선택되지않았습니다.";
	}
	else
	{
		s_strtDt = s_strtDt.replace(/[-, :, \s]/g,"");
		s_endDt = s_endDt.replace(/[-, :, \s]/g,"");
	}
	
	if(rMsg != "")
	{
		alert(rMsg);
		return;
	}
	
	$("#csdbalt_tblAltList").jqGrid("setGridParam", {postData : {pJson : getJsonStrHistoryList(tbbs_Id, s_strtDt, s_endDt)}, 
		page : 1, sortname : "WRK_DTTM_FORMAT", sortorder : "DESC"}).trigger("reloadGrid");

}

//초기화버튼 클릭이벤트
function btnInitClickEvent()
{
	initDatePicker();
	
	$("#csdbalt_tblAltList").jqGrid("setGridParam", {postData : {pJson : getJsonStrHistoryList(tbbs_Id, s_strtDt, s_endDt)}, 
		page : 1, sortname : "WRK_DTTM_FORMAT", sortorder : "DESC"}).trigger("reloadGrid");

}

//datePicker 날짜초기화
function initDatePicker()
{
	var today = new Date().toISOString().substring(0, 10);
	
	$("#csdbalt_selStrtDate").val(getPrvDay("Y",5,"-"));
	$("#csdbalt_selEndDate").val(today);
	
	s_strtDt = $("#csdbalt_selStrtDate").val().replace(/-/g,"");
	s_endDt = $("#csdbalt_selEndDate").val().replace(/-/g,"");
}

function initEdit(){
    // DEXT5 에디터 환경셋팅
//    DEXT5.config.Width  = "100%";
//    DEXT5.config.Mode = 'view';
//    DEXT5.config.Height  = "568px";
//    DEXT5.config.EditorHolder = "csdbalt_taTbbsCntn";
//    new Dext5editor("tbbsCont");
	tbbsCont = new KuKudocsEditor(
            /* ID 입력부 */
            'csdbalt_taTbbsCntn',

            /* Option 입력부 */
            {

                //에디터 최소 높이설정
                minHeight: 0,
                maxHeight: 0,

                //Editor 가로크기
                width: '100%',

                //Editor 세로크기
                height: '568px',

//                fileUploadURL : '/resources/KukudocsEditor/Upload.jsp',
                
                //Hidden Menu 설정
                hiddenMenu: ['fileGroup', 'insertGroup', 'editGroup', 'headingGroup', 'fontFamilyGroup', 'fontSizeGroup', 'textFormatGroup', 'paragraphFormatGroup', 'tableGroup', 'toolGroup', 'viewGroup', 'helpGroup'
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

            });
}

function optCounselKnd1ChangeEvent() {
	setObjectSelectBoxWithCode("csdbalt_optCounselKnd2", "전체", "2", g_ListPopup, $("#csdbalt_optCounselKnd1").val(), "", "CHANGE");
}
function optCounselKnd2ChangeEvent() {
    setObjectSelectBoxWithCode("csdbalt_optCounselKnd3", "전체", "3", g_ListPopup, $("#csdbalt_optCounselKnd2").val(), "", "");
}
$(document).ready(function()
{
	if(opener.opener.document.title == "공무원 업무" || opener.opener.document.title == "온누리콜센터" || opener.document.title == "상담DB"){
		g_ListPopup="GCHILD"
	}
	datePicker("#csdbalt_selStrtDate");
	datePicker("#csdbalt_selEndDate");
	
	tbbs_Id = $("#csdbalt_tfTbbsId").val();

	//당일날짜 셋팅
	initDatePicker();
	//리스트 셋팅
	getHistoryList();
	initEdit();	
	setObjectSelectBoxWithCode("csdbalt_optCounselKnd1", "전체", "1", g_ListPopup, "", "", "");	
    $("#csdbalt_optCounselKnd1").bind("change", optCounselKnd1ChangeEvent);
    $("#csdbalt_optCounselKnd2").bind("change", optCounselKnd2ChangeEvent);
    $("#csdbalt_optCounselKnd1").trigger("change");
    
	//검색버튼 클릭이벤트 등록
	$("#csdbalt_btnSearch").bind("click", btnSearchClickEvent);
	//초기화버튼 클릭이벤트 등록
	$("#csdbalt_btnInit").bind("click", btnInitClickEvent);

});
