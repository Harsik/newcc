//var oEditors = [];

var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");		//권한

var tbbsClCd = "";
var cbMsg = "";
var boardType = [];
var file_num = 0;
var inputFile = [];

var g_BoardType = "";
var g_TbbsId = "";
var g_CdbGbCd = "";
var g_TeamNm = "";

var editor1 = null;
//파라미터 셋팅 selectCntnt
function getJsonStrSelectCntnt(tbbsId) {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTAuc2VsZWN0RWR1Q250bnQ=",
			"map" : {
				"key" : "value",
				"tbbs_id" : tbbsId,
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertCntnt
function getJsonStrInsertCntnt(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAuaW5zZXJ0RWR1Q250bnQ=",
		"map" : {
			"key" : "value",
			"tbbs_ttl" : $("#txtTbbsTtl").val(),
			"tbbs_cntn" : editor1.GetEditorContent(), // DEXT5.getBodyValue("editor1"),
			"tbbs_cl_cd" : tbbsClCd,
			"cntr_nm" : window.sessionStorage.getItem("CNTR_CD"),
			"team_nm" : $("#optTeamNm").val(),
			"cdb_gb_cd" : $("#optCdbGbCd").val(),
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 updateCntnt
function getJsonStrUpdateCntnt(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAudXBkYXRlRWR1Q250bnQ=",
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"tbbs_ttl" : $("#txtTbbsTtl").val(),
			"tbbs_cntn" : editor1.GetEditorContent(), //DEXT5.getBodyValue("editor1"),
			"team_nm" : $("#optTeamNm").val(),
			"cdb_gb_cd" : $("#optCdbGbCd").val(),			
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
function getJsonCntntBoardFileList(tbbsId) {		
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
function getJsonDeleteCntntBoardFile(fileId) {
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

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {		
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
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
	var el = $("#writeFormEdu input[name=record_" + i + "]");
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
			url : getContextPath() + "/ajax/edu/deleteFile.do",
			data : "pJson=" + getJsonDeleteCntntBoardFile(fileId),
			success : function(data)
			{
				//파일폼 삭제
				var el = $("#writeFormEdu input[name=record_" + fileId + "]");
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

// 등록 콜백 함수
function cbInsert()
{
/*	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	window.sessionStorage.removeItem("EDU_TEAM");
	window.sessionStorage.removeItem("EDU_GB_CD");	*/
	 
	window.opener.btnInit_clickEvent();
	//window.opener.reloadNoticeBar();		// 메인화면 하단 공지사항 올라오는 부분인것 같은데... notifyBoard.js엔 없음
	window.close();
}

//사용자 권한에 따른 컨트롤 설정
function initGrantSetting(gType)
{
	setSelectBoxWithCode("optTeamNm", "전체", "90003", "", "", window.sessionStorage.getItem("TEAM_CD"));
	setSelectBoxWithCode("optCdbGbCd","전체","92022", "", "", "all");		
		
	//상담사 모드
	if(usrGrdCd == "010100")
	{	
		$("#optCdbGbCd").val("2");					//교육자료만 조회
		$("#optCdbGbCd").prop("disabled", true);
		$("#optTeamNm").prop("disabled", true);
		$("#btnInsert").hide();
		$("#btnInit").hide();
	}
	//관리자 모드
	else
	{	
		if (gType == "insert")
		{
			$("#optCdbGbCd").val("all");
			$("#optTeamNm").val("all");
		}
		else if (gType == "modify")
		{
			$("#optCdbGbCd").val(g_CdbGbCd); 
			$("#optTeamNm").val(g_TeamNm);
			
			//$("#optCdbGbCd").prop("disabled", false);
			//$("#optTeamNm").prop("disabled", false);			
		}

		$("#btnInsert").show();	
		$("#btnInit").show();
	}	
	
}

// 등록버튼 클릭이벤트
function btnInsertClickEvent()
{
	if (confirm("교육콘텐츠를 등록 하시겠습니까?"))
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
			url : getContextPath() + "/ajax/edu/insertCntnt.do",
			data : "pJson=" + getNextValue(),
			success : function(data)
			{
				gAppendHidden("writeFormEdu", "pJson", getJsonStrInsertCntnt(data.TBBS_ID));
				gSubmitPost("writeFormEdu", true);
				
				alert(cbMsg);
				//alert("gSubmitPost : " + rtnSumit);			
			
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//수정버튼 클릭이벤트
function btnUpdateClickEvent()
{
	if (confirm("교육콘텐츠를 수정 하시겠습니까?"))
	{
		var rMsg = validator();
		
		if(rMsg != "")
		{
			alert(rMsg);
			return;
		}
		
		gAppendHidden("writeFormEdu", "pJson", getJsonStrUpdateCntnt(g_TbbsId));
		gSubmitPost("writeFormEdu", true);
		alert(cbMsg);
		
	}
}

//입력 검증
function validator()
{
	var rMsg = "";
	
	if($("#txtTbbsTtl").val().trim() == "")
		rMsg += "\n제목을 입력해 주세요."; 

	var cntn = editor1.GetEditorContent(); //DEXT5.getBodyValue("editor1");
	
	if(cntn.trim() == "")
		rMsg += "\n내용을 입력해 주세요.";

	if ($("#optCdbGbCd").val() == "all")
		rMsg += "\n구분을 선택해 주세요."; 
	
	//파일 업로드 용량 체크
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#writeFormEdu input[name=BOARD]");
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
function btnInitClickEvent()
{
	$("#txtTbbsTtl").val("");
	$("#optCdbGbCd").val("all");
	$("#optTeamNm").val("all");

//	DEXT5.setBodyValue('', 'editor1');
	editor1.SetEditorContent('');
	//파일첨부박스 관련 처리 추가필요
}

//닫기버튼 클릭이벤트 등록
function btnCloseClickEvent()
{
	 window.close();
}

$(document).ready(function()
{
	//파일폼 복사
	inputFile.push($("#BOARD").clone());
	
	//게시판정보 가져오기
	g_BoardType = window.opener.document.getElementById("boardType").value;	//게시물구분
	g_TbbsId = window.opener.document.getElementById("eduTbbsId").value;	//게시판ID
	g_CdbGbCd = window.opener.document.getElementById("eduCdbGbCd").value;	//게시물구분 1:평가문제지, 2:교육자료
	g_TeamNm = window.opener.document.getElementById("eduTeamNm").value;	//대상팀
	
	boardType = g_BoardType.split(".");
	//boardType  = window.sessionStorage.getItem("BOARD_TYPE").split(".");

	
	//화면 컨트롤 설정
	initGrantSetting(boardType[1]);	
	
	//교육콘텐츠 등록
	if(boardType[1] === "insert")
	{
		$("#b_title").html("교육콘텐츠 등록");
		$("#btnInsert").html("저장");
		
		cbMsg = "등록되었습니다.";
		
		tbbsClCd = boardType[0];

		//등록버튼 클릭이벤트 등록
		$("#btnInsert").bind("click", btnInsertClickEvent);
	}
	else if(boardType[1] === "modify")	//교육콘텐츠 수정
	{
		$("#b_title").html("교육콘텐츠 수정");
		$("#btnInsert").html("저장");
		
		cbMsg = "수정되었습니다.";
	
		//tbbsId = window.sessionStorage.getItem("TBBS_ID");		
					
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/edu/selectCntnt.do",
			data : "pJson=" + getJsonStrSelectCntnt(g_TbbsId),
			success : function(data)
			{
				$("#txtTbbsTtl").val(data.TBBS_TTL);
				
				if(usrGrdCd == "010100")
					DEXT5.setEditorMode('view', 'editor1');			//상담사 view mode
				else
					DEXT5.setEditorMode('edit', 'editor1');			//관리자 edit mode

				
				if (data.TBBS_CNTN == "" || data.TBBS_CNTN ==  null)
					//DEXT5.setHtmlValue("", 'editor1');
					editor1.SetEditorContent("");
				else
//					DEXT5.setHtmlValue(data.TBBS_CNTN, 'editor1');
					editor1.SetEditorContent(data.TBBS_CNTN);
			
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/edu/CntntBoardFileList.do",
			data : "pJson=" + getJsonCntntBoardFileList(g_TbbsId),
			success : function(data)
			{
				for(var i in data)
				{
					var url = getContextPath() 
					+ "/file/CntntBoardFileDown.do?pJson=" 
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
					$("#fileInfos").parent().append(tr);
				}
				
				if(fileBox_idx >= 5)
				{
					$("#BOARD").prop("disabled", true);
					$("#btnRmFilebox").prop("disabled", true);
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		//수정버튼 클릭이벤트 등록
		$("#btnInsert").bind("click", btnUpdateClickEvent);
	}
	else
	{
		alert("교육콘텐츠 정보를 알수없습니다.");
		window.close();
	}
	
/*	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	window.sessionStorage.removeItem("EDU_TEAM");
	window.sessionStorage.removeItem("EDU_GB_CD");*/
	
	//초기화버튼 클릭이벤트 등록
	$("#btnInit").bind("click", btnInitClickEvent);
	//닫기버튼 클릭이벤트 등록
	$("#btnClose").bind("click", btnCloseClickEvent);
});

