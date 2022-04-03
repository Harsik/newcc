/*
 * 업무지식 테스트 관리
 * Table : om022 (업무지식기본), od022 (업무지식상세)
 */

// 조회 조건 및 조회 값
var objRowJsSuvy = {};
var g_Task_knwg_id = "";

var g_GrdType = "010100";		//사용자 권한(상담사만:010100)
var g_GrdTypeNm = "";			//사용자 권한 타입(AD:ADMIN, MN:MANAGER, AG:AGENT)

var fileForm = "";
var inputFile = [];
var fileBox_idx = 0;

var dt = new Date();
var year = dt.getFullYear();
var month = dt.getMonth() + 1;

var g_usrGrdCd =  window.sessionStorage.getItem("USR_GRD_CD");
var g_usrId = window.sessionStorage.getItem("USR_ID");

/*
 * 업무지식테스트 목록, 저장, 조회
 */
//업무지식테스트 next value
function getNextValue() {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMjIubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅 selectJisikSuvyList
function getJsonStrJisikSuvyList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjIuc2VsZWN0SmlzaWtTdXZ5TGlzdA==",
		"map" : {
			"key" : "value",
			"reg_Strt_Dt" : $("#edjssv_selFrDate").val().replace(/[-, :, \s]/g,""),
			"reg_End_Dt" : $("#edjssv_selToDate").val().replace(/[-, :, \s]/g,""),			
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertJisikSuvyInfo
function getJsonStrInsertJisikSuvy(task_knwg_id)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMjIuaW5zZXJ0SmlzaWtTdXZ5SW5mbw==",
		"map" : {
			"key" : "value",
			"tbl_pk": task_knwg_id,
			"tbl_nm" : "om022",
			
			"task_knwg_id" : task_knwg_id,
			"task_knwg_ttl" : $("#edjssv_task_Knwg_Ttl").val().trim(),						//업무지식제목
			"exec_pps" : $("#edjssv_exec_Pps").val().trim(),								//실시목적
			"reg_dt" : $("#edjssv_reg_Dt").val().replace(/[-, :, \s]/g,""),				//등록일자			
			"exam_strt_dt" : $("#edjssv_exam_Strt_Dt").val().replace(/[-, :, \s]/g,""),	//응시시작일자
			"exam_end_dt" : $("#edjssv_exam_End_Dt").val().replace(/[-, :, \s]/g,""),		//응시종료일자
			"use_yn" : 'Y',															//사용여부
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 updateJisikSuvyInfo
function getJsonStrUpdateJisikSuvy(task_knwg_id)
{
	var loParam = {
		"qt" : "aW5zZXJ0",//"dXBkYXRl",  // update로 하면 파일첨부 정보가 삭제되기 때문에 insert로 해야 함...
		"mi" : "b20wMjIudXBkYXRlSmlzaWtTdXZ5SW5mbw==",
		"map" : {
			"key" : "value",
			"tbl_pk": task_knwg_id,
			"tbl_nm" : "om022",
			
			"task_knwg_id" : task_knwg_id,
			"task_knwg_ttl" : $("#edjssv_task_Knwg_Ttl").val().trim(),						//업무지식제목
			"exec_pps" : $("#edjssv_exec_Pps").val().trim(),								//실시목적
			"reg_dt" : $("#edjssv_reg_Dt").val().replace(/[-, :, \s]/g,""),				//등록일자			
			"exam_strt_dt" : $("#edjssv_exam_Strt_Dt").val().replace(/[-, :, \s]/g,""),	//응시시작일자
			"exam_end_dt" : $("#edjssv_exam_End_Dt").val().replace(/[-, :, \s]/g,""),		//응시종료일자
			"use_yn" : 'Y',															//사용여부
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 getJsonStrDeleteJisikSuvy
function getJsonStrDeleteJisikSuvy(task_knwg_id)
{
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wMjIuZGVsZXRlSmlzaWtTdXZ5SW5mbw==",
		"map" : {
			"key" : "value",
			"tbl_pk": task_knwg_id,
			"tbl_nm" : "om022",
			"task_knwg_id" : task_knwg_id,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 selectJisikSuvyInfo
function getJsonStrSelectJisikSuvyInfo(task_knwg_id)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMjIuc2VsZWN0SmlzaWtTdXZ5SW5mbw==",
			"map" : {
				"key" : "value",
				"task_knwg_id" : task_knwg_id,
		}
	};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/*
 * 업무지식 대상 조회
 */
//파라미터 셋팅 selectJisikSuvyTrgtList
function getJsonStrSelectJisikSuvyTrgtList(task_knwg_id, team_cd, usr_id)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2QwMjIuc2VsZWN0SmlzaWtTdXZ5VHJndExpc3Q=",
		"map" : {
			"key" : "value",
			"task_knwg_id" : task_knwg_id,
			"team_cd" : team_cd,
			"usr_id" : usr_id,		
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/*
 * 업무지식결과 등록, 조회
 */
//파라미터 셋팅 jisikSuvyTrgtSave
function getJsonStrJisikSuvyTrgtSave(task_knwg_id, saveType)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2QwMjIuamlzaWtTdXZ5VHJndFNhdmU=",
		"map" : {
			"key" : "value",
			"task_knwg_id" : task_knwg_id,
			"usr_id" : $("#edjssv_usr_Id").val(),							//상담사
			"fst" : $("#edjssv_fst").val() != "" ? $("#edjssv_fst").val() : "0",	//1차점수
			"sec" : $("#edjssv_sec").val() != "" ? $("#edjssv_sec").val() : "0",	//2차점수			
			"dstb_tm" : $("#edjssv_dstb_Tm").val() != "" ? $("#edjssv_dstb_Tm").val() : "0",	//소요시간(시)
			"dstb_mm" : $("#edjssv_dstb_Mm").val() != "" ? $("#edjssv_dstb_Mm").val() : "0",	//소요시간(분)
			"rnk" : $("#edjssv_rnk").val(),								//순위
			"edu_cfm_dtm" : $(":input:radio[name=edu_Cfm_Dtm]:checked").val(),	//교육확인
			"use_yn" : saveType == "D" ? "N" : "Y",
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


/*
 * 상담사 불러오기
 */
//상담사 불러오기
function getJsonStrUserList(teamCd, agntId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			//"cntr_cd" : "010000",
			"cmpg_usr_id" : agntId,
			"team_cd" : teamCd,
			"gradeType" : g_GrdType,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/*
 * 첨부파일 관련 함수 모음 START ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//파라미터셋팅 fileList
function getJsonFileList(courseId) {		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om022",
			"tbl_pk": courseId,
			"orderby": "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 deleteFile
function getJsonDeleteFile(fileId) {
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
function addFileBox() {
	if (fileBox_idx >= 4) {
		alert("첨부파일은 최대 5개까지 가능합니다.");
	} else {
		var html = $("#edjssv_fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#edjssv_fileInfos").append(html);
	}
}

//첨부파일 박스삭제
function removeFileBox(i) {
//	var el = $("#edjssv_writeForm input[name=record_" + i + "]");
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
			url : getContextPath() + "/ajax/edu/deleteFile.do",
			data : "pJson=" + getJsonDeleteFile(fileId),
			success : function(data)
			{
				//파일폼 삭제
				//var el = $("#edjssv_writeForm input[name=record_" + fileId + "]");
				//2019.12.30 hhs 파일폼 삭제 수정
				var el = $("#writeForm input[name=record_" + fileId + "]");
				
				el.parent().parent().remove();
				
				if(--fileBox_idx < 5)
				{
					$("#edjssv_EDU_FILE").prop("disabled", false);
					$("#edjssv_btnRmFilebox").prop("disabled", false);
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//파일박스 내용삭제
function rmFileBoxEvent(){
	inputFile[1] = inputFile[0].clone(true);
	$("#edjssv_EDU_FILE").replaceWith(inputFile[1]);
}

//첨부파일 보기
function showAttachFiles(tbbsId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/fileList.do",
		data : "pJson=" + getJsonFileList(tbbsId),
		success : function(data)
		{
			for(var i in data)
			{
				var url = getContextPath() 
				+ "/file/eduJisikSuvyFileDown.do?pJson=" 
				+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
				
				var tr = "<tr>";
				tr += "<td colspan='4'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
				tr += "<span><a href='" + url + "' title='"+ data[i].LOC_FL_NM +"'>" + data[i].LOC_FL_NM.substring(0,20); + "</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				// 2020.01.20 hhs 매니저이상으로 파일 삭제 기능 추가
				if(g_usrGrdCd>="030100"){ 
				tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
				}
				tr += "</tr>";
				
				fileBox_idx++;
				$("#edjssv_fileInfos").prepend(tr);
				//$("#edjssv_fileInfos").parent().append(tr);
			}
			
			if(fileBox_idx >= 5)
			{
				$("#edjssv_EDU_FILE").prop("disabled", true);
				$("#edjssv_btnRmFilebox").prop("disabled", true);
			}
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});		
}
/*
 * 첨부파일 관련 함수 모음 END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

//tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
function init_grid(pMap)
{
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [15, 30, 60, 90, 120],
	   	autowidth : true,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	cellEdit : pMap.cellEdit,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	   	gridComplete : window[pMap.completeEvent],  
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

//교육대상 jqGrid Init
function tblTarget_init_grid()
{
	pMap = {};
	pMap.tblId = "edjssv_tblTargetList";
	pMap.url   = "/jqgrid/edu/tblTargetListGrid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b2QwMjIuc2VsZWN0SmlzaWtTdXZ5VHJndExpc3Q=", {
		"key" : "value" ,
		"notuse" : false,
		"chkRetire" : false,
		"task_knwg_id" : g_Task_knwg_id,
		"team_cd" : $("#edjssv_srchTeamCd").val(),
		"usr_id" : $("#edjssv_selSrchAgtId").val(),
	});
	pMap.colNames = ["팀", "상담사", "1차", "2차", "소요시간", "평균", "순위", "교육확인", "상담사ID", "팀CD", "확인일시", "수정자", "DSTB_TM"];
	pMap.colModel =
   	[
   	 	{ name : "TEAM_NM", index : "TEAM_NM", align : "center", width : 100 },
   	 	{ name : "USR_NM", index : "USR_NM", align : "center", width : 80 },
   	 	{ name : "FST", index : "FST", align : "center", width : 50 },
   	 	{ name : "SEC", index : "SEC", hidden : true },
	 	{ name : "DSTB_TM_FORMAT", index : "DSTB_TM_FORMAT", align : "center", width : 80 },
	 	{ name : "AVG_SCR", index : "AVG_SCR", hidden : true },
	 	{ name : "RNK", index : "RNK", align : "center", width : 50 },
	 	{ name : "EDU_CFM_NM", index : "EDU_CFM_NM", align : "center", width : 70, formatter:fnStatusFormatter },
   	 	{ name : "USR_ID", index : "USR_ID", hidden : true }, 	
   	 	{ name : "TEAM_CD", index : "TEAM_CD", hidden : true },
   	 	{ name : "EDU_CFM_DTM", index : "EDU_CFM_DTM", hidden : true },
   	 	{ name : "MOD_USR_NM", index : "MOD_USR_NM", hidden : true }, 
   	 	{ name : "DSTB_TM", index : "DSTB_TM", hidden : true },
   	];
	pMap.rowNum = "15";
	pMap.sortname = "USR_NM";
	pMap.width = "100%";
	pMap.height = "390";
	pMap.cellEdit = false;
	pMap.pager = "edjssv_pgTargetList";
	pMap.selectEvent = "tblTargetList_SelectRow";
	pMap.rowNumber = true;	
	
	init_grid(pMap);
}

//업무지식대상 jqGrid 선택
function tblTargetList_SelectRow(id)
{
    var objGrid = $("#edjssv_tblTargetList").jqGrid('getRowData', id);

    if (id == null)
    	return;
    
    objGrid.TEAM_CD != null ? $("#edjssv_team_Id").val(objGrid.TEAM_CD) : $("#edjssv_team_Id").val();
    
    $("#edjssv_team_Id").change();

    setTimeout(function(){							
    	objGrid.USR_ID != null ? $("#edjssv_usr_Id").val(objGrid.USR_ID) : $("#edjssv_usr_Id").val();			   		
	}, 300);
      
	//objGrid.USR_ID != null ? $("#edjssv_usr_Id").val(objGrid.USR_ID) : $("#edjssv_usr_Id").val();	
	objGrid.FST != null ? $("#edjssv_fst").val(objGrid.FST) : $("#edjssv_fst").val("");
	objGrid.SEC != null ? $("#edjssv_sec").val(objGrid.SEC) : $("#edjssv_sec").val();
	
	//objGrid.DSTB_TM != null ? $("#edjssv_dstb_Tm").val(objGrid.DSTB_TM) : $("#edjssv_dstb_Tm").val();
	
	var tmSplit = objGrid.DSTB_TM_FORMAT.split(':');
	$("#edjssv_dstb_Tm").val(tmSplit[1]);
	$("#edjssv_dstb_Mm").val(tmSplit[2]);
	
	objGrid.RNK != null ? $("#edjssv_rnk").val(objGrid.RNK) : $("#edjssv_rnk").val();
	
	if (objGrid.EDU_CFM_DTM.length > 5)
	{
		$("#edjssv_edu_Cfm_Dtm").html(objGrid.EDU_CFM_DTM + " " + objGrid.MOD_USR_NM);
		$("input:radio[name=edu_Cfm_Dtm]:input[value=Y]").prop("checked", true);
	} else
		$("input:radio[name=edu_Cfm_Dtm]:input[value=N]").prop("checked", true);
	
	if(g_GrdTypeNm != "AD" && g_GrdTypeNm != "MN")
	{
		if (g_usrId == objGrid.USR_ID) {
			$("#edjssv_btnUpdateRtn").show();
			$("#edjssv_btnDeleteRtn").hide();
		} else {
			$("#edjssv_btnUpdateRtn").hide();
			$("#edjssv_btnDeleteRtn").hide();
		}
	} else {
		//업무지식결과등록 저장버튼 비활성화
		$("#edjssv_btnInsertRtn").hide();
		$("#edjssv_btnUpdateRtn").show();
		$("#edjssv_btnDeleteRtn").show();
	}

}

//삼당원 불러오기
function setSelectBoxWithUser(selObj, teamCd, agntId)
{	
	$("#" + selObj).val("all");
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/userList.do",
		data : "pJson=" + getJsonStrUserList(teamCd, agntId),
		success : function(data)
		{
			//var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
			
			//g_usrGrdCd = usrGrdCd;
			
			$("#" + selObj).html("");
			// param값을 JSON으로 파싱
			var value = "";

			var selTxt = (selObj == "selSrchAgtId" ? "전체" : "미선택");

			value += "<option value='all'>" + selTxt + "</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#" + selObj).append(value);
			
			if(g_GrdTypeNm != "AD" && g_GrdTypeNm != "MN")
			{
				$("#edjssv_" + selObj).val(window.sessionStorage.getItem("USR_ID"));
				$("#edjssv_" + selObj).prop("disabled", true);
				
				$("#edjssv_srchTeamCd").prop("disabled", false);
				$("#edjssv_selSrchAgtId").prop("disabled", false);
				$("#edjssv_team_Id").prop("disabled", true);
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//업무지식테스트 목록 상세 초기화
function initJisikSuvy()
{
	if(g_GrdTypeNm != "AD" && g_GrdTypeNm != "MN") {
		$("#edjssv_btnInsert").hide();
		$("#edjssv_btnUpdate").hide();
		$("#edjssv_btnDelete").hide();
	} else {
		$("#edjssv_btnInsert").show();
		$("#edjssv_btnUpdate").hide();
		$("#edjssv_btnDelete").hide();
	}
	
	$("#edjssv_reg_Dt").val(getDate());
	$("#edjssv_exam_Strt_Dt").val(getDate());
	$("#edjssv_exam_End_Dt").val(getDate());
	
	$("#edjssv_task_Knwg_Ttl").val("");
	$("#edjssv_usr_Cnt").html("");	
	$("#edjssv_exec_Pps").val("");
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#edjssv_fileInfos").empty().append(fileForm);		
	
}

//업무지식결과등록 초기화
function initJisikSuvyResult()
{
	$("#edjssv_team_Id").val("all");
	$("#edjssv_usr_Id").val("all");	
	$("#edjssv_fst").val("");
	$("#edjssv_sec").val("");
	$("#edjssv_dstb_Tm").val("");
	$("#edjssv_dstb_Mm").val("");
	$("#edjssv_rnk").val("");
	$("#edjssv_edu_Cfm_Dtm").html("");	
	
	$("input:radio[name=edu_Cfm_Dtm]:input[value=N]").prop("checked", true);
}

// 저장 및 수정 예외 처리
function checkJisikSuvy()
{
	var rMsg = "";
	
	if($("#edjssv_task_Knwg_Ttl").val() == "")
		rMsg += "\n\n업무지식 제목을 입력 해 주세요.";
	
	if($("#edjssv_exec_Pps").val() == "")
		rMsg += "\n\n실시목적을 입력 해 주세요.";	
	
	//파일 업로드 용량 체크
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#edjssv_writeForm input[name=EDU_FILE]");
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

/*
 * 업무지식테스트관리 조회, 초기화 버튼 이벤트
 */
//업무지식 목록 조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	$("#edjssv_tblJskSuvyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikSuvyList()}, page : 1, sortname : "REG_DTM", sortorder : "desc"});
	$("#edjssv_tblJskSuvyList").trigger("reloadGrid");
	
	// 업무지식등록 초기화
	initJisikSuvy();

	objRowJsSuvy = {};
	g_Task_knwg_id = "";
}

//업무지식 목록 조회 초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	if (month.toString().length == 1)
		month = "0" + month;
	
	var frDate = year + "-" + month + "-" + "01";
	
	g_Task_knwg_id = "";
	
	//$("#edjssv_selFrDate").val(getDate());
	$("#edjssv_selFrDate").val(frDate);
	$("#edjssv_selToDate").val(getDate());	

	if(g_GrdTypeNm != "AD" && g_GrdTypeNm != "MN") {
		$("#edjssv_btnInsert").hide();
		$("#edjssv_btnUpdate").hide();
		$("#edjssv_btnDelete").hide();
	} else {
		$("#edjssv_btnInsert").show();
		$("#edjssv_btnUpdate").hide();
		$("#edjssv_btnDelete").hide();
	}
		
	$("#edjssv_tblJskSuvyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikSuvyList()}, page : 1, sortname : "REG_DTM", sortorder : "desc"});
	$("#edjssv_tblJskSuvyList").trigger("reloadGrid");

	// 업무지식등록 초기화
	initJisikSuvy();	
	// 업무지식대상자 초기화
	btnTrgtInit_clickEvent();
	// 업무지식결과등록 초기화
	btnResetRtn_clickEvent();
}

/*
 * 업무지식 등록 추가, 저장, 초기화 버튼 이벤트
 */
//업무지식 추가 버튼 클릭 이벤트
function btnInsert_clickEvent()
{
	var rMsg = checkJisikSuvy();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	//업무지식 데이터 넣기
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/edu/insertJisikSuvy.do",
		data : "pJson=" + getNextValue(),
		success : function(data) {
			
			//업무지식내용
			gAppendHidden("writeForm", "pJson", getJsonStrInsertJisikSuvy(data.KEY_ID));
			gSubmitPost("writeForm", true);		
			
			setTimeout(function(){
				$("#edjssv_tblJskSuvyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikSuvyList()}, page : 1, sortname : "REG_DTM", sortorder : "desc"});
				$("#edjssv_tblJskSuvyList").trigger("reloadGrid");
			}, 300);
			
			initJisikSuvy();
	   		alert("추가되었습니다.");						   		
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

}

//업무지식 수정 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	var rMsg = checkJisikSuvy();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	//업무지식내용
	gAppendHidden("writeForm", "pJson", getJsonStrUpdateJisikSuvy(g_Task_knwg_id));
	var rtnSubmit = gSubmitPost("writeForm", true);
	
	setTimeout(function(){
		$("#edjssv_tblJskSuvyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikSuvyList()}, page : 1, sortname : "REG_DTM", sortorder : "desc"});
		$("#edjssv_tblJskSuvyList").trigger("reloadGrid");
	}, 300);
	
	initJisikSuvy();				   		
	alert("저장되었습니다.");	

}

//업무지식 삭제 버튼 클릭 이벤트
function btnDelete_clickEvent()
{
	if(confirm("업무지식테스트 목록을 삭제하시겠습니까?")) {
	
		//업무지식내용
		gAppendHidden("writeForm", "pJson", getJsonStrDeleteJisikSuvy(g_Task_knwg_id));
		var rtnSubmit = gSubmitPost("writeForm", true);
		
		setTimeout(function(){
			$("#edjssv_tblJskSuvyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikSuvyList()}, page : 1, sortname : "REG_DTM", sortorder : "desc"});
			$("#edjssv_tblJskSuvyList").trigger("reloadGrid");
			
			//업무지식 대상 조회
			btnTrgtSearch_clickEvent();			
		}, 300);
		
		initJisikSuvy();				   		
		alert("삭제되었습니다.");	
	}

}

/*
 * 업무지식 대상 및 확인 조회, 초기화 버튼 이벤트
 */
//교육대상자 조회 버튼 클릭 이벤트
function btnTrgtSearch_clickEvent()
{	
	var teamCd = $("#edjssv_srchTeamCd").val();
	var agntId = $("#edjssv_selSrchAgtId").val();
	
	$("#edjssv_tblTargetList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectJisikSuvyTrgtList(g_Task_knwg_id, teamCd, agntId)}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#edjssv_tblTargetList").trigger("reloadGrid");
}

//교육대상자 조회 초기화 버튼 클릭 이벤트
function btnTrgtInit_clickEvent()
{
	$("#edjssv_srchTeamCd").val("all");
	$("#edjssv_selSrchAgtId").val("all");
	$('#edjssv_srchTeamCd').change(); 	
	
	$("#edjssv_tblTargetList").clearGridData();
	
	btnResetRtn_clickEvent();
}

// 출력 버튼 클릭 이벤트 등록
function btnPrint_clickEvent()
{
	
	if($("#edjssv_tblTargetList").getGridParam("reccount")<=0){
		alert("응시자가 존재하지 않습니다.");
		return;
	}
	//g_Task_knwg_id
	if(g_Task_knwg_id == null || g_Task_knwg_id == ""){
		alert("업무지식 목록에서 선택해 주세요");
		return;
	}
	
	window.open("http://172.17.100.100:8090/ClipReport4/eduJisikSuvy.jsp?taskKnwgId="+g_Task_knwg_id);


}

// 그래프 조회 버튼 클릭 이벤트 등록
function btnChart_clickEvent()
{
	// 평가실적현황 팝업(그래프 팝업) /web/edu/eduJisikSuvyUsrAct.do
	//openMenuPopup("ED0032_SUB1");
	
	
	var width = 1140;
	var height = 748;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/edu/eduJisikSuvyUsrAct.do";
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "업무지식테스트", option);
	newWindow.focus();
	
}

/*
 * 업무지식결과 등록 추가,저장,초기화 버튼 이벤트
 */
// 추가 버튼 클릭 이벤트 등록
function btnInsertRtn_clickEvent()
{
	saveJisikRtn("S");
}

// 수정 버튼 클릭 이벤트 등록
function btnUpdateRtn_clickEvent()
{
	saveJisikRtn("U");
}

// 삭제 버튼 클릭 이벤트 등록
function btnDeleteRtn_clickEvent()
{
	saveJisikRtn("D");
}

// 업무지식결과 등록
function saveJisikRtn(saveType)
{
	var msg =  "";
	
	if (saveType != "D") {
		if ($("#edjssv_usr_Id").val() == "all")
		{
			alert("상담사를 선택 해 주세요.");
			return;
		}
	
		if (g_Task_knwg_id == null || g_Task_knwg_id == "")
		{
			alert("업무지식 목록을 선택 해 주세요.");
			return;
		}
		
		msg = "저장되었습니다.";
	} else
		msg = "삭제되었습니다.";
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/eduJisikSuvySave.do",
		data : "pJson=" + getJsonStrJisikSuvyTrgtSave(g_Task_knwg_id, saveType),
		success : function(data)
		{
			alert(msg);
			btnResetRtn_clickEvent();
			btnTrgtSearch_clickEvent();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
});
}

// 초기화 버튼 클릭 이벤트 등록	
function btnResetRtn_clickEvent()
{
	// 초기 저장버튼 비활성화
	if(g_GrdTypeNm != "AD" && g_GrdTypeNm != "MN") {
		$("#edjssv_btnInsertRtn").hide();
		$("#edjssv_btnUpdateRtn").hide();	
		$("#edjssv_btnDeleteRtn").hide();
	} else {
		$("#edjssv_btnInsertRtn").show();
		$("#edjssv_btnUpdateRtn").hide();
		$("#edjssv_btnDeleteRtn").hide();
	}

	initJisikSuvyResult();
	$('#edjssv_team_Id').focus(); 	
}
/*
function isNumberKey(evt) 
{
    var charCode = (evt.which) ? evt.which : event.keyCode;

    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    // Textbox value       
    var _value = event.srcElement.value;       

    // 소수점(.)이 두번 이상 나오지 못하게
    var _pattern0 = /^\d*[.]\d*$/; // 현재 value값에 소수점(.) 이 있으면 . 입력불가

    if (_pattern0.test(_value)) {
        if (charCode == 46) {
            return false;
        }
    }

    // 1000 이하의 숫자만 입력가능
    var _pattern1 = /^\d{3}$/; // 현재 value값이 3자리 숫자이면 . 만 입력가능

    if (_pattern1.test(_value)) {
        if (charCode != 46) {
            alert("1000 이하의 숫자만 입력가능합니다");
            return false;
        }
    }

    // 소수점 둘째자리까지만 입력가능
    var _pattern2 = /^\d*[.]\d{2}$/; // 현재 value값이 소수점 둘째짜리 숫자이면 더이상 입력 불가

    if (_pattern2.test(_value)) {
        alert("소수점 둘째자리까지만 입력가능합니다.");
        return false;
    }     

    return true;

}
*/
function initEvent()
{
	// 업무지식 리스트 조회 =========================================
	// 조회 버튼 클릭 이벤트 등록
	$("#edjssv_btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#edjssv_btnInit").bind("click", btnInit_clickEvent);
	
	// 업무지식 등록  ===============================================
	// 추가 버튼 클릭 이벤트 등록
	$("#edjssv_btnInsert").bind("click", btnInsert_clickEvent);
	// 수정 버튼 클릭 이벤트 등록
	$("#edjssv_btnUpdate").bind("click", btnUpdate_clickEvent);
	// 삭제 버튼 클릭 이벤트 등록
	$("#edjssv_btnDelete").bind("click", btnDelete_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록	
	$("#edjssv_btnReset").bind("click", function(e)
	{
		initJisikSuvy();
	});	
	//파일삭제이벤트 등록
	$("#edjssv_btnRmFilebox").bind("click", rmFileBoxEvent);
	
	// 업무지식대상 조회 =============================================
	// 조회 버튼 클릭 이벤트 등록
	$("#edjssv_btnTrgtSearch").bind("click", btnTrgtSearch_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#edjssv_btnTrgtInit").bind("click", btnTrgtInit_clickEvent);
	// 출력 버튼 클릭 이벤트 등록
	$("#edjssv_btnPrint").bind("click", btnPrint_clickEvent);	
	// 그래프 조회 버튼 클릭 이벤트 등록
	$("#edjssv_btnChart").bind("click", btnChart_clickEvent);	
	
	// 센터 셀렉트 박스 변경 이벤트 등록
	$("#edjssv_srchTeamCd").bind("change", function()
	{
		var teamCd = $("#edjssv_srchTeamCd").val();
		var agntId = "all";
		//var agntId = $("#edjssv_selSrchAgtId").val();
		
		setSelectBoxWithUser("edjssv_selSrchAgtId", teamCd, agntId);
	});
	
	// 업무지식결과 등록 =============================================
	// 추가 버튼 클릭 이벤트 등록
	$("#edjssv_btnInsertRtn").bind("click", btnInsertRtn_clickEvent);
	// 수정 버튼 클릭 이벤트 등록
	$("#edjssv_btnUpdateRtn").bind("click", btnUpdateRtn_clickEvent);
	// 삭제 버튼 클릭 이벤트 등록
	$("#edjssv_btnDeleteRtn").bind("click", btnDeleteRtn_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록	
	$("#edjssv_btnResetRtn").bind("click", btnResetRtn_clickEvent);		
	// 센터 셀렉트 박스 변경 이벤트 등록
	$("#edjssv_team_Id").bind("change", function()
	{
		var teamCd = $("#edjssv_team_Id").val();
		var agntId = "all";
		//var agntId = $("#edjssv_usr_Id").val();
		
		setSelectBoxWithUser("edjssv_usr_Id", teamCd, agntId);
	});
	
	//숫자만 입력 가능
	$("#edjssv_fst").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#edjssv_sec").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#edjssv_rnk").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );

	$("#edjssv_dstb_Tm").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#edjssv_dstb_Mm").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
		
}

//초기화면 컨트롤 설정
function initControl()
{
	//조회일자
	datePicker("#edjssv_selFrDate");
	datePicker("#edjssv_selToDate");
	
	//등록일자, 응시일시
	datePicker("#edjssv_reg_Dt");
	datePicker("#edjssv_exam_Strt_Dt");
	datePicker("#edjssv_exam_End_Dt");

	//일반 상담사
	if(g_GrdTypeNm != "AD" && g_GrdTypeNm != "MN"){
		//팀, 상담사 셀렉트 비활성화
		$("#edjssv_srchTeamCd").prop("disabled", true);
		$("#edjssv_team_Id").prop("disabled", true);
		
		//업무지식등록 초기화, 추가, 저장버튼 비활성화
		$("#edjssv_btnReset").hide();
		$("#edjssv_btnInsert").hide();
		$("#edjssv_btnUpdate").hide();	
		$("#edjssv_btnDelete").hide();
	
		//업무지식결과등록 초기화, 추가, 저장버튼 비활성화
		$("#edjssv_btnResetRtn").hide();
		$("#edjssv_btnInsertRtn").hide();
		$("#edjssv_btnUpdateRtn").hide();	
		$("#edjssv_btnDeleteRtn").hide();
		//보고서 출력
		$("#edjssv_btnPrint").hide();	
		//그래프 조회
		$("#edjssv_btnChart").hide();	
		
		$("#edjssv_fst").prop("disabled", true);
		$("#edjssv_sec").prop("disabled", true);
		$("#edjssv_dstb_Tm").prop("disabled", true);
		$("#edjssv_dstb_Mm").prop("disabled", true);
		$("#edjssv_rnk").prop("disabled", true);
		
	} else {
		//관리자
		//팀, 상담사 셀렉트 활성화
		$("#edjssv_srchTeamCd").prop("disabled", false);
		$("#edjssv_team_Id").prop("disabled", false);
		
		//업무지식등록 저장버튼 비활성화
		$("#edjssv_btnInsert").show();
		$("#edjssv_btnUpdate").hide();	
		$("#edjssv_btnDelete").hide();
	
		//업무지식결과등록 저장버튼 비활성화
		$("#edjssv_btnInsertRtn").show();
		$("#edjssv_btnUpdateRtn").hide();	
		$("#edjssv_btnDeleteRtn").hide();
		//보고서 출력
		$("#edjssv_btnPrint").show();
		//그래프 조회
		$("#edjssv_btnChart").show();	
						
		$("#edjssv_fst").prop("disabled", false);
		$("#edjssv_sec").prop("disabled", false);
		$("#edjssv_dstb_Tm").prop("disabled", false);
		$("#edjssv_dstb_Mm").prop("disabled", false);
		$("#edjssv_rnk").prop("disabled", false);
	}	

}

//초기화면 데이터 설정
function initData()
{
	if (month.toString().length == 1)
		month = "0" + month;
	
	var frDate = year + "-" + month + "-" + "01";
	
	//$("#edjssv_selFrDate").val(getDate());
	$("#edjssv_selFrDate").val(frDate);
	$("#edjssv_selToDate").val(getDate());

	//등록일자, 응시일시
	$("#edjssv_reg_Dt").val(getDate());
	$("#edjssv_exam_Strt_Dt").val(getDate());	
	$("#edjssv_exam_End_Dt").val(getDate());
	
	// 센터 셀렉트 박스 셋팅(팀) - 업무지식 대상
	setObjSelectBoxWithCode("edjssv_srchTeamCd", "전체", "", "CHILD", "90003", "all");
	
	// 센터 셀렉트 박스 셋팅(팀) - 업무지식결과 등록
	setObjSelectBoxWithCode("edjssv_team_Id", "전체", "", "CHILD", "90003", "all");	
	
	g_Task_knwg_id = "";
	
}

// init Page
$(document).ready(function()
{
	inputFile.push($("#edjssv_EDU_FILE").clone());
	fileForm = $("#edjssv_fileInfos tr").parent().html();
	
	g_GrdTypeNm = getGradTypeNm(g_usrGrdCd);
	
	initEvent();
	initControl();
	initData();
		
	$("#edjssv_tblJskSuvyList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/edu/jisikSuvylist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrJisikSuvyList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["등록일시", "제목", "첨부", "등록자", "업무지식ID"],
	   	colModel :
	   	[
			{ name : "REG_DTM", index : "REG_DTM", width : 120, align : "center" },
			{ name : "TASK_KNWG_TTL", index : "TASK_KNWG_TTL", width : 200, align : "left" },
			{ name : "FL_NUM", index : "FL_NUM", width : 60, align : "center" },
			{ name : "CRT_USR_NM", index : "CRT_USR_NM", width : 60, align : "center" },
			{ name : "TASK_KNWG_ID", index : "TASK_KNWG_ID", width : 100, hidden : true }
	   	],
	   	sortname : "REG_DTM",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "390",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#edjssv_pgJskSuvyList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		//교육대상자 조회 초기화
	   		//btnTrgtInit_clickEvent();
	   		
	   		initJisikSuvy();
	   		
	   		g_Task_knwg_id = "";
	   		
	   		if (rowid == undefined || rowid == null)
	   			return;
	   		
	   		objRowJsSuvy = $("#edjssv_tblJskSuvyList").jqGrid('getRowData', rowid);
	   		
	   		g_Task_knwg_id = objRowJsSuvy.TASK_KNWG_ID
	   		$.ajax({
	   			type : "post",
	   			dataType: "json",
	   			async : true,
	   			url : getContextPath() + "/ajax/edu/selectJisikSuvyInfo.do",
	   			data : "pJson=" + getJsonStrSelectJisikSuvyInfo(g_Task_knwg_id),
	   			success : function(data)
	   			{
	   				if(g_GrdTypeNm != "AD" && g_GrdTypeNm != "MN") {
	   					$("#edjssv_btnInsert").hide();
	   					$("#edjssv_btnUpdate").hide();
	   					$("#edjssv_btnDelete").hide();
	   				} else {
	   					$("#edjssv_btnInsert").hide();
	   					$("#edjssv_btnUpdate").show();
	   					$("#edjssv_btnDelete").show();
	   				}
	   				
	   				$("#edjssv_reg_Dt").val(data.REG_DT);
	   				$("#edjssv_exam_Strt_Dt").val(data.EXAM_STRT_DT);
	   				$("#edjssv_exam_End_Dt").val(data.EXAM_END_DT);
	   				
	   				$("#edjssv_task_Knwg_Ttl").val(data.TASK_KNWG_TTL);
	   				$("#edjssv_usr_Cnt").html(data.USR_CNT);	
	   				$("#edjssv_exec_Pps").val(data.EXEC_PPS);
	   				
	   			},
	   			error : function(data, status, err) 
	   			{
	   				networkErrorHandler(data, status, err);
	   			}
	   		});	   
	   		
	   		//첨부파일 조회
			showAttachFiles(g_Task_knwg_id);
			//업무지식 대상 조회
			btnTrgtSearch_clickEvent();

	   	},
	   	onPaging : function(pgButton)
	   	{	   		
	   		//initJisikSuvy();
	   	}
	}).jqGrid("navGrid", "#edjssv_pgJskSuvyList", {edit : false, add : false, del : false, search : false});
	
	tblTarget_init_grid();	


});