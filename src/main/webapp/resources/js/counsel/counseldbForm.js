//var oEditors = [];
//var deptArr = [];
//var teamCds = [];
var tbbsClCd = "";
var cbMsg = "";
var boardType = [];
var tbbsId = "";
var cdbId = "";
var file_num = 0;
var inputFile = [];

// edxt5 editor 초기화
function dext_editor_loaded_event() {
	//DEXT5.showTopMenu(0, 'editor1');	// 에디터의 메뉴 바를 표시하거나 숨기는 기능("0" : 숨김, "1" : 표시)   
} 	       

//파라미터 셋팅 selectCounselDb
function getJsonStrSelectCounselDbInfo(cdbId) {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTUuc2VsZWN0",						// om015.select
			"map" : {
				"key" : "value",
				"cdb_id" : cdbId,
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectCounselDb
function getJsonStrSelectCounselDb(tbbsId) {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTAuc2VsZWN0Q291bnNlbERi",			// om010.selectCounselDb
			"map" : {
				"key" : "value",
				"tbbs_id" : tbbsId,
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertCounselDb
function getJsonStrInsertCounselDb(tbbsId) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTAuaW5zZXJ0Q291bnNlbERC",				// om010.insertCounselDB
		"map" : {
			"key" : "value",
			"tbbs_ttl" : $("#tfTbbsTtl").val(),				// 업무명
			"tbbs_cntn" : editor1.GetEditorContent(), //DEXT5.getBodyValue("editor1"),	// 업무절차
			"cntr_cd" : "090000",							// 센터명(090000: 본청) -> 확인해야 함...
			"inst_cd" : $("#instClass").val(),				// 기관구분
			"intv_lg_cd" : $("#intvLgCd").val(),			// 상담유형 대
			"intv_md_cd" : $("#intvMdCd").val(),			// 상담유형 중
			"intv_sm_cd" : $("#intvSmCd").val(),			// 상담유형 소
			"dept_id" : $("#departCd").val(),				// 담당부서
			"org_usr_id" : $("#managerID").val(),			// 담당자
			"tbbs_cl_cd" : tbbsClCd,						// 게시물구분(050100)
			"reg_gb_cd" : $("#sel_req_gb").val(),			// 요청구분
			"act_st_cd" : $("#sel_act_st").val(),			// 처리상태
			"ntuse_desc" : $.trim($("#tfNtUseDesc").val()),	// 미사용사유
			"mod_cont" : $("#sel_act_st").val() + "," + $.trim($("#tfNtUseDesc").val()), 	// 처리상태 + 미사용사유
			"cdb_id" : cdbId, 
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 updateCounselDb
function getJsonStrUpdateCounselDb(tbbsId) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTAudXBkYXRlQ291bnNlbERC",				// om010.updateCounselDB
		"map" : {
			"key" : "value",
			"tbbs_id" : tbbsId,
			"tbbs_ttl" : $("#tfTbbsTtl").val(),
			"tbbs_cntn" : editor1.GetEditorContent(), // DEXT5.getBodyValue("editor1"),	
			"cntr_cd" : "090000",							// 센터명(090000: 본청) -> 확인해야 함...
			"inst_cd" : $("#instClass").val(),				// 기관구분
			"intv_lg_cd" : $("#intvLgCd").val(),			// 상담유형 대
			"intv_md_cd" : $("#intvMdCd").val(),			// 상담유형 중
			"intv_sm_cd" : $("#intvSmCd").val(),			// 상담유형 소
			//"dept_id" : $("#departCd").val(),				// 담당부서
			"org_usr_id" : $("#managerID").val(),			// 담당자
			//"tbbs_cl_cd" : tbbsClCd,						// 게시물구분(050100)
			"reg_gb_cd" : $("#sel_req_gb").val(),			// 요청구분
			"act_st_cd" : $("#sel_act_st").val(),			// 처리상태
			"ntuse_desc" : $.trim($("#tfNtUseDesc").val()), // 미사용사유
			"mod_cont" : $("#sel_act_st").val() + "," + $.trim($("#tfNtUseDesc").val()), 	// 처리상태 + 미사용사유
			"cdb_id" : cdbId, 
			"tbl_nm" : "om010",
			"tbl_pk": tbbsId,
			"callback" : "cbInsert"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
/*
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
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
*/
/*
//파라미터셋팅 checkGrdCd
function getJsonCheckGrdCd() {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDIuY2hlY2tHcmRDZA==",
		"map" : {
			"key" : "value",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
*/
/*
//파라미터셋팅 insertAuth
function getJsonStrInsertAuth(tbbsId, teamCd) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTIuaW5zZXJ0",
		"map" : {
			"tbbs_id" : tbbsId,
			"team_cd" : teamCd
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
*/
/*//파라미터셋팅 selectAuth
function getJsonStrSelectAuthList(tbbsId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTIuc2VsZWN0TGlzdA==",
		"map" : {
			"tbbs_id" : tbbsId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
*/
/*
//파라미터셋팅 deleteAuth
function getJsonStrDeleteAuth(tbbsId) {
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wMTIuZGVsZXRl",
		"map" : {
			"tbbs_id" : tbbsId,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
*/
// 상담DB next value
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
function getJsonCounselDbFileList(tbbsId) {		
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
function getJsonDeleteCounselDbFile(fileId) {
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
/*
//파라미터 셋팅 ProgramListExcel
function getJsonStrUserListExcel(srchtype, srchval, notuse)
{			
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"optSrchType" : srchtype,
			"tfSrchVal" : srchval,
			"chkRetire" : notuse,
			"cntr_cd" : g_srchCntrCd,
			"team_cd" : g_srchTeamCd,
			"dept_cd" : g_srchDeptCd,
			"sidx" : $("#tblUserList").getGridParam("sortname"),
			"sord" : $("#tblUserList").getGridParam("sortorder"),
			"title" : "사용자관리",
			"colWidth" : [20, 20, 20, 20, 20, 20, 20, 20],
			"colName" : ["USR_ID", "USR_NM", "CD_NM", "CEL_NO_FORMAT", "EXTN_NO", "PC_IP", "RET_YN", "MOD_DT_FORMAT"],
			"colHeader" : ["아이디", "이름", "등급", "핸드폰번호", "내선번호", "IP주소", "퇴사여부", "수정일"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
*/
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
			url : getContextPath() + "/ajax/counsel/deleteFile.do",
			data : "pJson=" + getJsonDeleteCounselDbFile(fileId),
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

// 등록 콜백 함수
function cbInsert()
{
	alert(cbMsg);
	 
	window.sessionStorage.removeItem("BOARD_TYPE");
	window.sessionStorage.removeItem("TBBS_ID");
	window.sessionStorage.removeItem("CDB_ID");
	 
	window.opener.btnNotifyInitClickEvent();
	window.opener.reloadNoticeBar();
	window.close();
}

// 등록버튼 클릭이벤트
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
			url : getContextPath() + "/ajax/counsel/insertCounselDb.do",
			data : "pJson=" + getNextValue(),
			success : function(data)
			{
				gAppendHidden("writeForm", "pJson", getJsonStrInsertCounselDb(data.TBBS_ID));
				gSubmitPost("writeForm", true);

				window.close();
				
				/*
				//게시물열람기본 권한정보 등록
				for(var i = 0; i < teamCds.length; i++)
				{
					$.ajax({
						type : "post",
						dataType : "json",
						async : true,
						url : getContextPath() + "/ajax/board/insertAuth.do",
						data : "pJson=" + getJsonStrInsertAuth(data.TBBS_ID, teamCds[i]),
						success : function(data) { },
						error : function(data, status, err)
						{
							networkErrorHandler(data, status, err);
						}
					});
				}
				*/
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
	if (confirm("게시글을 수정 하시겠습니까?"))
	{
		var rMsg = validator();
		
		if(rMsg != "")
		{
			alert(rMsg);
			return;
		}
		
		gAppendHidden("writeForm", "pJson", getJsonStrUpdateCounselDb(tbbsId));
		gSubmitPost("writeForm", true);

		window.close();
		
		/*
		//게시물열람정보 삭제
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteAuth.do",
			data : "pJson=" + getJsonStrDeleteAuth(tbbsId),
			success : function(data)
			{
				//새 게시물열람기본 권한정보 등록
				for(var i = 0; i < teamCds.length; i++)
				{
					$.ajax({
						type : "post",
						dataType : "json",
						async : true,
						url : getContextPath() + "/ajax/board/insertAuth.do",
						data : "pJson=" + getJsonStrInsertAuth(tbbsId, teamCds[i]),
						success : function(data)
						{
							console.log(i + "번째 정보 등록!!"); 
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
		});
		*/
	}
}

/*//권한등록버튼 클릭이벤트
function btnRegBoardAuthClickEvent()
{
	var width = 300;
	var height = 400;

	var paramURL = getContextPath() + "/web/board/regBoardAuth.do";
	
	deptArr = window.showModalDialog(paramURL, teamCds, "dialogWidth:" + width 
				+ "px; dialogHeight:" + height + "px; center=yes; resizable=no; status=no; scroll=no; help=no;");
	
	//선택된 ID로 부서정보 가져오기
	if(deptArr != null && deptArr.length > 0)
	{
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/selectAuth.do",
			data : "pJson=" + getJsonStrSelectAuth(deptArr),
			success : function(data)
			{
				teamCds = [];
				var str = "";
				
				for(var i = 0; i < data.length; i++)
				{
					if(i === data.length - 1)
						str += data[i].CD_NM;
					else
						str += data[i].CD_NM + ", ";

					teamCds.push(data[i].CD);
				}
				
				$("#tfRegBoardAuth").val(str);
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	{
		teamCds = [];
		$("#tfRegBoardAuth").val("");
	}
}*/

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
	
/*	
	if(teamCds.length <= 0)
		rMsg += "\n하나 이상의 열람권한이 필요합니다.";
	
	if($("#tfTbbsStrtDt").val() == "")
		rMsg += "\n시작일자를 입력해주세요.";
	
	if($("#tfTbbsEndDt").val() == "")
		rMsg += "\n종료일자를 입력해주세요.";
	
	var d_tbbsStrtDt = new Date($("#tfTbbsStrtDt").val().substr(0, 4), $("#tfTbbsStrtDt").val().substr(4, 2), $("#tfTbbsStrtDt").val().substr(6, 2));
	var d_tbbsEndDt = new Date($("#tfTbbsEndDt").val().substr(0, 4), $("#tfTbbsEndDt").val().substr(4, 2), $("#tfTbbsEndDt").val().substr(6, 2));
	
	if(d_tbbsStrtDt > d_tbbsEndDt)
		rMsg += "\n시작일이 종료일보다 큽니다.";
*/	
	return rMsg;
}

//상담DB 변경이력 조회버튼 클릭이벤트 등록
function btnCnslAltListClickEvent()
{
	
	var width = 1000;
	var height = 725;
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;		
	
	var paramURL = getContextPath() + "/web/counsel/counseldbAltList.do?TBBS_ID=" + tbbsId;
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	//window.sessionStorage.setItem("BOARD_TYPE", "020100.insert");
	
	var newWindow = window.open(paramURL, "counseldbAltList", option);
	newWindow.focus();
}
/*
//엑셀저장버튼 클릭이벤트 등록
function btnExelSaveClickEvent()
{
	excelDownLoad(getContextPath() + "/excel/counsel/counseldbForm.do", getJsonStrUserListExcel(g_srchtype, g_srchval, $("input[id=chkNotUse]:checkbox").prop("checked")));

}
*/
// 초기화버튼 클릭이벤트
function btnInitClickEvent()
{
	$("#tfTbbsTtl").val("");			// 업무명

//	DEXT5.setBodyValue('', 'editor1');	// 업무절차
	editor1.SetEditorContent('');
	
	//teamCds = [];
	//$("#departCd").val("");				// 담당부서
	//$("#departNm").html("");			// 담당부서
	//$("#managerNM").val("all");		// 담당자
	$("#managerID").val("all");			// 담당자
	$("#tfUpdateDt").html("");			// 수정일시
	$("#tfUpdateNm").html("");			// 수정자
	$("#tfSearchCnt").html("");			// 조회수
	$("#tfNtUseDesc").val("");			// 미사용사유
	$("#sel_req_gb").val("all");		// 요청구분
	$("#sel_act_st").val("all");		// 처리상태
	
	//파일첨부박스 관련 처리 추가필요
}

//닫기버튼 클릭이벤트 등록
function btnCloseClickEvent()
{
	window.close();
}

//요청구분 SelectBox Change 이벤트
function selReqGb_ChangeEvent()
{
	var idxReqGb =	$("#sel_req_gb").val();		
	
	//요청구분이 미사용이면 미사용사유 입력 가능
	if (idxReqGb == "030100") 
	{
		$("#tfNtUseDesc").prop("disabled", false);		
	}
	else
	{
		$("#tfNtUseDesc").val("");
		$("#tfNtUseDesc").prop("disabled", true);
	}
	
}

// 상담DB요청 조회
function initCounselDBSelect(cdb_Id)
{
	// 요청DB 정보 가져오기
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/selectCounselDbInfo.do",
		data : "pJson=" + getJsonStrSelectCounselDbInfo(cdb_Id),
		success : function(data)
		{
			$("#instClass").val(data.INST_CD);						// 기관코드		
			$("#departCd").val(data.DEPT_ID);						// 담당부서
			$("#departNm").html(data.DEPT_NM);						// 담당부서			

			$("#instClass").prop("disabled", true);
			
			var instClass = data.INST_CD;
			var intvLgCd = data.INTV_LG_CD;
			var intvMdCd = data.INTV_MD_CD;
			var intvSmCd = data.INTV_SM_CD;
			var strDetpCd = data.DEPT_ID;
			var strReqCd = data.REQ_GB_CD;
			var strActCd = data.ACT_ST_CD;
			var strOrgUsrId = data.ORG_USR_ID;

			// 요청구분
			if (strReqCd != "" && strReqCd != undefined)
				$("#sel_req_gb").val(strReqCd);				
			else
				$("#sel_req_gb").val("all");	
			
			// 처리상태
			if (strActCd != "" && strActCd != undefined)
				$("#sel_act_st").val(strActCd);				
			else
				$("#sel_act_st").val("all");				
			
			// 상담유형 대, 중, 소분류 넣기
			$.ajax({
				type : "post",
				dataType : "json",
				async : true,
				url : getContextPath() + "/ajax/main/counselList.do",
				data : "pJson=" + getJsonStrIntvCdSetSelectBox("2", instClass),
				success : function(data)
				{
					$("#intvLgCd").empty();
					var option = "";
					//option += "<option value='all'>전체</option>";
					
					for(var i in data)
						option += "<option value='" + data[i].CD + "'>" + data[i].CD_NM + "</option>";
					
					//$("#intvLgCd").append(option).prop("disabled", false);
					$("#intvLgCd").append(option).prop("disabled", true);
					$("#intvLgCd").val(intvLgCd);
													
					$.ajax({
						type : "post",
						dataType : "json",
						async : true,
						url : getContextPath() + "/ajax/main/counselList.do",
						data : "pJson=" + getJsonStrIntvCdSetSelectBox("3", intvLgCd),
						success : function(data)
						{
							$("#intvMdCd").empty();
							var option = "";
							//option += "<option value='all'>전체</option>";
							
							for(var i in data)
								option += "<option value='" + data[i].CD + "'>" + data[i].CD_NM + "</option>";
							
							//$("#intvMdCd").append(option).prop("disabled", false);
							$("#intvMdCd").append(option).prop("disabled", true);
							$("#intvMdCd").val(intvMdCd);
							
							$.ajax({
								type : "post",
								dataType : "json",
								async : true,
								url : getContextPath() + "/ajax/main/counselList.do",
								data : "pJson=" + getJsonStrIntvCdSetSelectBox("4", intvMdCd),
								success : function(data)
								{
									$("#intvSmCd").empty();
									var option = "";
									//option += "<option value='all'>전체</option>";
									
									for(var i in data)
										option += "<option value='" + data[i].CD + "'>" + data[i].CD_NM + "</option>";
									
									//$("#intvSmCd").append(option).prop("disabled", false);
									$("#intvSmCd").append(option).prop("disabled", true);
									$("#intvSmCd").val(intvSmCd);

								},
								error : function(data, status, err)
								{
									networkErrorHandler(data, status, err);
								}	
							});								

						},
						error : function(data, status, err)
						{
							networkErrorHandler(data, status, err);
						}	
					});											
				},
				error : function(data, status, err)
				{
					networkErrorHandler(data, status, err);
				}	
			});				
			
			//담당자 selection
			if (strDetpCd != "")
			{	
				$('#managerID').empty();

				$.ajax({
					type : "post",
					dataType : "json",
					async : true,
					url : getContextPath() + "/ajax/user/userList.do",
					data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNjEuc2VsZWN0Q291bnNlbERlcHRVc2Vy", {
						"deptId" : strDetpCd,
						 
					}),
					success : function(data)
					{
						var option = "<option value='all' selected>미선택</option>";
						
						for(var i in data)
							option += "<option value='" + data[i].USR_ID + "'>" + data[i].USR_NM + "</option>";
						
							$("#managerID").append(option);
							
							if (strOrgUsrId != "" && strOrgUsrId != undefined)
								$("#managerID").val(strOrgUsrId);					// 담당자
							else
								$("#managerID").val("all");
							
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
	});	
}

//데이터 초기화
function initData()
{	
	setSelectBoxWithCodeIntvLgCd("instClass", "", "1", "", "", "11000000", window.sessionStorage.getItem("CNTR_CD"));		// 기관구분 셋팅
	
	setSelectBoxWithCode("sel_req_gb", "미선택", "90302", "", "","all");			// 요청구분
	setSelectBoxWithCode("sel_act_st", "미선택", "90301", "", "","all");			// 처리상태
	
	//작성자와 작성일 등록
	var usrNm = window.sessionStorage.getItem("USR_NM");
	var today = new Date().toISOString().substring(0, 10);
	$("#tfUsrNm").html(usrNm);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
	$("#tfDt").html(today);	
}
/*
//상담대분류 선택이벤트
function instClass_ChangeEvent()
{
	setSelectBoxWithCodeIntvLgCd("intvLgCd", "", "2", "", $("#instClass").val(), "", "");
}

//상담중분류 선택이벤트
function intvLgCd_ChangeEvent()
{
	setSelectBoxWithCodeIntvLgCd("intvMdCd", "", "3", "", $("#intvLgCd").val(), "", "");	// 상담유형 중분류 셋팅
}

//상담소분류 선택이벤트
function intvMdCd_ChangeEvent()
{
	setSelectBoxWithCodeIntvLgCd("intvSmCd", "", "4", "", $("#intvMdCd").val(), "", "");	// 상담유형 소분류 셋팅
}
*/
//이벤트 등록
function initEvent()
{
	//$("#instClass").bind("change", instClass_ChangeEvent);
	//$("#intvLgCd").bind("change", intvLgCd_ChangeEvent);
	//$("#intvMdCd").bind("change", intvMdCd_ChangeEvent);	
	
	//상담DB 변경이력 조회버튼 클릭이벤트 등록
	$("#btnCnslAltList").bind("click",btnCnslAltListClickEvent);	
	
	//엑셀저장버튼 클릭이벤트 등록
	/*$("#btnExelSave").bind("click", btnExelSaveClickEvent);	*/
	
	//초기화버튼 클릭이벤트 등록
	$("#btnInit").bind("click", btnInitClickEvent);

	//닫기버튼 클릭이벤트 등록
	$("#btnClose").bind("click", btnCloseClickEvent);
	
	//요청구분 SelectBox Change 이벤트 등록
	$("#sel_req_gb").bind("change", selReqGb_ChangeEvent);	

}

$(document).ready(function()
{
	//파일폼 복사
	inputFile.push($("#BOARD").clone());
	
	//게시판정보 가져오기
	boardType  = window.sessionStorage.getItem("BOARD_TYPE").split(".");
	cdbId = window.sessionStorage.getItem("CDB_ID");
	
	initData();						//데이터 초기화
	initEvent();					//이벤트 등록
	initCounselDBSelect(cdbId);		//상담DB요청 조회
	selReqGb_ChangeEvent();
	
	//공지게시판 등록
	if(boardType[1] === "insert")
	{
		$("#b_title").html("상담DB 등록");
		$("#btnInsert").html("등록");
		
		cbMsg = "등록되었습니다.";
		
		tbbsClCd = boardType[0];
		
		// dext5 editor 초기화
		dext_editor_loaded_event;
		/*
		//등급코드 확인하여 팀장급 이하일경우 팀정보 가져오기
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/checkGrdCd.do",
			data : "pJson=" + getJsonCheckGrdCd(),
			success : function(data)
			{
				if(data != null)
				{
					deptArr.push(data.CD);
					teamCds.push(data.CD);
					//$("#tfRegBoardAuth").val(data.CD_NM);
					//$("#btnRegBoardAuth").hide();
				}
				//else
					//$("#btnRegBoardAuth").show();
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
		*/
		//등록버튼 클릭이벤트 등록
		$("#btnInsert").bind("click", btnInsertClickEvent);
	}
	else if(boardType[1] === "modify")	//상담DB 수정
	{
		$("#b_title").html("상담DB 수정");
		$("#btnInsert").html("수정");
		
		cbMsg = "수정되었습니다.";
		
		tbbsId = window.sessionStorage.getItem("TBBS_ID");
		
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/selectCounselDb.do",
			data : "pJson=" + getJsonStrSelectCounselDb(tbbsId),
			success : function(data)
			{
				$("#tfTbbsTtl").val(data.TBBS_TTL);
				
				// dext5 editor 초기화
				dext_editor_loaded_event;
//				DEXT5.setHtmlValue(data.TBBS_CNTN, 'editor1');
				editor1.SetEditorContent(data.TBBS_CNTN);
							
				//$("#departCd").val("");						// 담당부서
				//$("#departNm").html("");						// 담당부서
				//$("#managerNM").val("all");					// 담당자
				$("#tfUpdateDt").html(data.MOD_DT_FORMAT);		// 수정일시
				$("#tfUpdateNm").html(data.MOD_USR_NM);			// 수정자
				$("#tfUsrNm").html(data.CRT_USR_NM);        	// 등록자                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
				$("#tfDt").html(data.CRT_DT_FORMAT);			// 등록일시	
				$("#tfSearchCnt").html(data.TBBS_INQR_CNT);		// 조회수
				$("#tfNtUseDesc").val(data.NTUSE_DESC);			// 미사용사유				
				
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
			url : getContextPath() + "/ajax/counsel/CounselDbFileList.do",
			data : "pJson=" + getJsonCounselDbFileList(tbbsId),
			success : function(data)
			{
				for(var i in data)
				{
					var url = getContextPath() 
					+ "/file/notifyBoardFileDown.do?pJson=" 
					+ getJsonFileDownload(data[i].SVRFL_PTH, data[i].LOCFL_NM);
					
					var tr = "<tr id='" + data[i].FL_ID + "'>";
					tr += "<td class='line_noline' colspan='3'>";
					tr += "<input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
					tr += "<span><a href='" + url + "'>" + data[i].LOCFL_NM + "</a></span></td>";
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
		alert("게시판 정보를 알수없습니다.");
		window.close();
	}
	
	//window.sessionStorage.removeItem("BOARD_TYPE");
	//window.sessionStorage.removeItem("TBBS_ID");
	//window.sessionStorage.removeItem("CDB_ID");
	

});