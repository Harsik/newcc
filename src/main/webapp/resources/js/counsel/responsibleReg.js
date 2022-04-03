// 글로벌 변수
var gSelectUser = ""; // 현재 선택된 사원 정보
var gTeamId = "ktr";	// 부서아이디
var gSrvyTypeCd = ""; // 조사유형코드
var gTicketId = ""; // 티켓아이디
var gCurrentTeam = "";

//파라미터 셋팅_getJsonResponsibleList
function getJsonResponsibleList(optSrchType, tfSrchVal, isParent, dept_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "dl9vcmdkZXB0ZW1wLmVtcExpc3Q=",
			"map" : {
				"key" : "value",
				"optSrchType" : optSrchType,
				"tfSrchVal" : tfSrchVal,
				"dept_cd" : dept_cd,
				"notLowLev" : $("#chkNotLowLevDept").prop("checked"),
				"isParent" : isParent
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonTeamList
function getJsonTeamList()
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "dl9vcmdkZXB0ZW1wLnRlYW1MaXN0",
			"map" : {
				"key" : "value",
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonResponsibleRegList
function getJsonResponsibleRegList(tckt_id, srvy_type_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y20wMDgucmVzTGlzdA==",
			"map" : {
				"key" : "value",
				"tckt_id" : tckt_id,
				"srvy_type_cd" : srvy_type_cd
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonResponsibleRegInsert
function getJsonResponsibleRegInsert()
{
	console.log(gSrvyTypeCd);
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "Y20wMDgucmVzUmVn",
			"map" : {
				"key" : "value",
				"ticket_id" : gTicketId,
				"srvy_type_cd" : gSrvyTypeCd,
				"emp_id" : gSelectUser.EMP_ID,
				"dpt_nm" : gSelectUser.DPT_NM,
				"ps_nm" : gSelectUser.POSITION,
				"usr_nm" : gSelectUser.USR_NM,
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonResponsibleRegDelete
function getJsonResponsibleRegDelete(gTicketId, gSrvyTypeCd, emp_id)
{
	var loParam = {
			"qt" : "ZGVsZXRl",
			"mi" : "Y20wMDgucmVzRGVsZXRl",
			"map" : {
				"key" : "value",
				"tckt_id" : gTicketId,
				"srvy_type_cd" : gSrvyTypeCd,
				"emp_id" : emp_id,
				"use_yn" : "N"
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonCompleteDateMerge
function getJsonCompleteDateMerge(tckt_id, act_lmt_dt, emp_id)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMDEuY21wdER0TWVyZ2U=",
			"map" : {
				"key" : "value",
				"tckt_id" : tckt_id,
				"act_lmt_dt" : act_lmt_dt,
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_insertFile
function getJsonStrInsertFile()
{		
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTkuZHVteVNlbGVjdA==",
		"map" : {
			"key" : "value",
			"tbl_nm" : "ch001",
		    "tbl_pk": gTicketId,
		    "tbl_pk2" : gSrvyTypeCd,
		    "callback" : "cb_merge"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_selectFile
function getJsonResponsibleRegFileList()
{		
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMTkuZmlsZUxpc3Q=",
			"map" : {
				"key" : "value",
				"tbl_nm" : "ch001",
				"tbl_pk": gTicketId,
				"tbl_pk2" : gSrvyTypeCd,
				"orderby": "crtTime",
			}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_fileDown
function getJsonResponsibleRegFileDown(svr, loc)
{		
	var loParam = {
			"svrFilePath" : svr,
			"locFileName" : loc
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_fileDelete
function getJsonResponsibleRegFileDelete(fl_id)
{		
	var loParam = {
			"qt" : "ZGVsZXRl",
			"mi" : "b20wMTkuZGVsZXRlRmlsZVVzZVlu",
			"map" : {
				"key" : "value",
				"use_yn" : "N",
				"fl_id" : fl_id,
			}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 조회 버튼 클릭 이벤트
function btnSearch_clickEvent() 
{
	var $optSrchType = $("#optSrchType").val()
	,	$tfSrchVal = $.trim($("#tfSrchVal").val());
	
	$("#tblEmp").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleList($optSrchType, $tfSrchVal, false, "")}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#tblEmp").trigger("reloadGrid");
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
	tfInit();
	
	var $optSrchType = $("#optSrchType").val()
	,	$tfSrchVal = $.trim($("#tfSrchVal").val());
	
	$("#tblEmp").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleList($optSrchType, $tfSrchVal, false, gTeamId)}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#tblEmp").trigger("reloadGrid");
}

//하위부서포함 체크박스 클릭 이벤트
function chkNotLowLevDept_clickEvent() 
{
	var $optSrchType = $("#optSrchType").val()
	,	$tfSrchVal = $.trim($("#tfSrchVal").val());
	
	if(gTeamId != "ktr" && gCurrentTeam.children.length != 0)
	{
		$("#tblEmp").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleList($optSrchType, $tfSrchVal, $("#chkNotLowLevDept").prop("checked"), gTeamId)}, sortname : "USR_NM", sortorder : "asc"});
		$("#tblEmp").trigger("reloadGrid");
	}
}

// 담당자 등록 버튼 클릭 이벤트
function btnReg_clickEvent() 
{
	var $tfCompDt = $.trim($("#tfCompDt").val().replace(/-/g,""));
	var $tfResposible = $.trim($("#tfResposible").val());
	var rowLength = $("#tblRespon").getGridParam("reccount");
	
	if(rowLength > 4)
	{
		alert("담당자를 5명 이상 입력할 수 없습니다.");
		return;
	}
	else if( $tfResposible == "")
	{
		alert("담당자를 선택해 주세요.");
		return;
	}
	else if( $tfCompDt == "" )
	{
		alert("완료예정일을 선택해 주세요.");
		return;
	}
	else
	{
		for( var i = 1; i <= rowLength; i++ )
		{
			var responInfo = $("#tblRespon").getRowData(i);
			if(gSelectUser.EMP_ID == responInfo.EMP_ID )
			{
				alert("이미 등록된 사원입니다.");
				return;
			}
		}
		
		if(confirm("등록 하시겠습니까?")) 
		{
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/counsel/responsibleRegInsert.do",
				data : "pJson=" + getJsonResponsibleRegInsert($tfCompDt),
				success : function(data)
				{
					if(data != 0)
					{
						alert("등록되었습니다.");
						$("#tfResposible").val("");
						
						$("#tblRespon").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleRegList(gTicketId, gSrvyTypeCd)}});
						$("#tblRespon").trigger("reloadGrid");
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
			
			var $cmptDt = $("#tfCompDt").val().replace(/-/g,"");
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/counsel/responsibleRegInsert.do",
				data : "pJson=" + getJsonCompleteDateMerge(gTicketId, $cmptDt),
				success : function(data)
				{
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
	}
}

// 닫기 버튼 클릭 이벤트 
function btnResponClose_clickEvent() 
{
	var responRowCount = $("#tblRespon").getGridParam("reccount");
	var fileRowCount = $("#tblFile").getGridParam("reccount");
	
	var responData = [];
	var fileData = [];
	for(var i = 1; i <= responRowCount; i++ )
	{
		var responPushData = $("#tblRespon").getRowData(i); 
		responData.push(responPushData);
	}
	
	for(var i = 1; i <= fileRowCount; i++ )
	{
		var filePushData = $("#tblFile").getRowData(i);
		fileData.push(filePushData);
	}
	
	// 담당자 테이블에 데이터가 있을경우
	if( responRowCount != "0")
	{
		// 담당자테이블, 첨부파일 테이블에 데이터가 있을 경우
		if(fileRowCount != "0")
		{	
			var $returnValue = 
			{ 
					"cmptDt" : $("#tfCompDt").val(), 
					"responData" : responData,
					"fileData" : fileData,
					"srvy_type_cd" : gSrvyTypeCd,
					"tckt_id" : gTicketId,
			};
			window.returnValue = $returnValue;
			window.close();
		}
		else	// 담당자 테이블에 데이터가 있고 첨부파일 테이블에 데이터가 없을 경우
		{
			var $returnValue = {};
			$returnValue = 
			{
					"cmptDt" : $("#tfCompDt").val(),
					"responData" : responData,
					"fileData" : "",
					"srvy_type_cd" : gSrvyTypeCd,
					"tckt_id" : gTicketId,
			};
			window.returnValue = $returnValue;
			window.close();
		}
	}
	else if(fileRowCount != "0")	// 담당자 테이블엔 데이터가 없고 첨부파일 테이블에 데이터가 있을 경우
	{	
		var $returnValue = 
		{
				"cmptDt" : "",
				"responData" : "",
				"fileData" : fileData,
				"srvy_type_cd" : gSrvyTypeCd,
				"tckt_id" : "",
		};
		window.returnValue = $returnValue;
		window.close();
	}
	else	// 담당자, 파일 데이터가 없을 경우
	{
		window.returnValue = 
		{
				"cmptDt" : "",
				"responData" : "",
				"fileData" : "",
				"srvy_type_cd" : gSrvyTypeCd,
				"tckt_id" : "",
		};
		window.close();
	}
}

// 텍스트 필드 초기화 함수
function tfInit() 
{
	$("#txtName").html("");
	$("#txtTeam").html("");
	$("#txtGrade").html("");
	$("#txtTel").html("");
	$("#txtFax").html("");
	$("#txtMail").html("");
	$("#txtWorkYn").html("");
	
	$("#tfSrchVal").val("");
	$("#tfResposible").val("");
	$("#tfCompDt").val("");
	
	$("#optSrchType").val("usrNm");
	
	$("#chkNotLowLevDept").prop("checked", false);
	gTeamId = "ktr";
}

// 파일 등록 버튼 클릭 이벤트
function btnFileSearch_clickEvent() 
{
	
	var rowLength = $("#tblFile").getGridParam("reccount");
	
	if(rowLength > 4)
	{
		alert("파일을 5개 이상 등록할 수 없습니다.");
		return;
	}
	
	if(confirm("등록 하시겠습니까?")) 
	{
		gAppendHidden("frm1", "pJson", getJsonStrInsertFile());
		gSubmitPost("frm1", true);
	}
}

// 파일 입력 시 수행되는 함수
function cb_merge()
{
	
	$("#tblFile").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleRegFileList()}});
	$("#tblFile").trigger("reloadGrid");
	$("#JOB").replaceWith( $("#JOB").clone(true) );
	alert("등록되었습니다.");
}

// 완료예정일 지정
function getCmptDate(cmptDt) {
	
	// main에 완료예정일이 있으면 수정
	if(cmptDt != "")
	{
		$("#tfCompDt").val(window.dialogArguments.cmptDt);
	}
	else	// main에 값 없으면 생성
	{
		var d = new Date();
		var dt = "";
		var year = d.getFullYear();
		var month = d.getMonth() +1;
		var date = d.getDate();
		var day = d.getDay();
		var nextDate = date + 1;
		var nextDay = day + 1;
		
		var lastDay = ( new Date( year, month, 0) ).getDate();
		var count = 0;
		
		if( nextDay != 6 && nextDay != 7 )
		{
			if(nextDate > lastDay)	// 마지막날이 넘을 경우
			{
				if(( month +1 ) > 12)	// 마지막 달이 넘을 경우
				{
					year = year + 1;
					month = 1 ;
					date = 1;
				}
				else
				{
					month = month +1 ;
					date = 1;
				}
			}
			else
			{
				date = date + 1;
			}
		}
		else
		{
			while( nextDay == 6 || nextDay == 7 || nextDay == 8 )	//주말일 경우
			{
				count++;
				if(nextDate > lastDay)	// 마지막날이 넘을 경우
				{
					if(( month +1 ) > 12)	// 마지막 달이 넘을 경우
					{
						year = year + 1;
						month = 1 ;
						date = 1;
						nextDay = 0;
					}
					else
					{
						month = month +1 ;
						date = 1;
						nextDay = 0;
					}
				}
				else
				{
					date = nextDate;
					day = nextDay;
					nextDate = date + 1;
					nextDay = day + 1;
				}
			}
		}
		
		// 달과 일수가 한자리일 경우 앞에 0 붙임
		if(date < 10)
			date = "0" + date;
		
		if(month < 10)
			month = "0" + month;
		
		dt += year;
		dt += "-" + month;
		dt += "-" + date;
		
		$("#tfCompDt").val(dt);
	}
	
}

$(document).ready(function()
{
	datePicker("#tfCompDt");
	
	// 이관업무구분코드 등록
	gSrvyTypeCd = window.dialogArguments.srvy_type_cd;
	
	// 티켓아이디 등록
	gTicketId = window.dialogArguments.ticket_id;
	
	// 완료예정일 지정
	getCmptDate(window.dialogArguments.cmptDt);
	
	// 팀 리스트 트리 구조
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/counsel/teamUsrList.do",
		data : "pJson=" + getJsonTeamList(),
		success : function(data)
		{
			$("#listTeam").html("");
			
			var jr = JSON.parse(data);
			
			jr.unshift({"id" : "ktr", "parent" : "#", "text" : "순천시청", "state" : { opened : true, disabled : true }});
			
			$("#listTeam").jstree({ "core": { "data": jr } });
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	// 담당자 리스트 그리드
	$("#tblEmp").jqGrid({
		url : getContextPath() + "/ajax/counsel/responsibleList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonResponsibleList("", "", false, gTeamId)
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "사번", "성명", "직위", "사진경로", "팀","내선전화", "직통전화", "휴대전화", "팩스", "이메일", "입사일", "퇴사일", "직급", "부서명", "직급" ],
		colModel : 
		[
			{ name : "EMP_ID", align : "center" },
			{ name : "USR_NM" },
			{ name : "POSITION" },
			{ name : "USR_IMG_PTH", hidden : true },
			{ name : "TEAM_NM", hidden : true },
			{ name : "EXTENSION_NUM", hidden : true },
			{ name : "DIRECT_NUM", hidden : true },
			{ name : "MOBILE_NUM", hidden : true },
			{ name : "FAX_NUM", hidden : true },
			{ name : "EML_ADR", hidden : true },
			{ name : "ENT_DT", hidden : true },
			{ name : "RET_DT", hidden : true },
			{ name : "RANK", hidden : true },
			{ name : "DPT_NM", hidden : true },
			{ name : "POSITION", hidden : true },
		],
		sortname : "USR_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	height : "260",
	   	width : "100%",
	   	rowNum : "",
	   	autowidth : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onSelectRow : function(rowid) 
		{
			$("#imgPerson").attr("src", "");
			$("#txtName").html("");
			$("#txtTeam").html("");
			$("#txtGrade").html("");
			$("#txtTel").html("");
			$("#txtFax").html("");
			$("#txtMail").html("");
			$("#txtWorkYn").html("");
			
			gSelectUser = $("#tblEmp").getRowData(rowid);
			
			$("#tfResposible").val(gSelectUser.USR_NM);
			
			if(gSelectUser.USR_IMG_PTH != "")
			{
				$("#imgPerson").prop("src", "data:image/jpeg;base64," + gSelectUser.USR_IMG_PTH);
				$("#imgPerson").css("width", "70%");
			}
			
			if(gSelectUser.USR_NM != "")
				$("#txtName").html(gSelectUser.USR_NM);
			
			if(gSelectUser.TEAM_NM != "")
				$("#txtTeam").html(gSelectUser.TEAM_NM);
			
			if(gSelectUser.RANK != "")
				$("#txtGrade").html(gSelectUser.RANK);
			
			if(gSelectUser.EXTENSION_NUM != "")
			{
				var value = gSelectUser.EXTENSION_NUM;
				$("#txtExtensionNum").html(value);
			}
			
			if(gSelectUser.DIRECT_NUM != "")
			{
				var value = gSelectUser.DIRECT_NUM;
				$("#txtDirectNum").html(value);
			}
			
			if(gSelectUser.MOBILE_NUM != "")
			{
				var value = gSelectUser.MOBILE_NUM;
				$("#txtMobileNum").html(value);
			}
			
			if(gSelectUser.FAX_NUM != "")
			{
				var value = gSelectUser.FAX_NUM;
				$("#txtFaxNum").html(value);
			}
			
			if(gSelectUser.EML_ADR != "")
				$("#txtMail").html(gSelectUser.EML_ADR);
			
			if(gSelectUser.RET_DT == "")
			{
				var value = "재직";
				$("#txtWorkYn").html(value);
			}
		},
		gridComplete : function () {
			var total = $("#tblEmp").getGridParam("records");
			$("#totalRow").html("현재 인원 : " + total + " 명");
		}
		
	});
	
	// 담당자 등록 그리드
	$("#tblRespon").jqGrid({
		url : getContextPath() + "/ajax/counsel/responsibleRegList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonResponsibleRegList(gTicketId, gSrvyTypeCd)
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "사번", "부서", "직위", "성명", "삭제" ],
		colModel : 
		[
			{ name : "EMP_ID", align : "center" },
			{ name : "DPT_NM" },
			{ name : "PS_NM" },
			{ name : "USR_NM" },
			{ name : "RESPONSIBLE_DEL", align : "center", classes : "grid_del"},
		],
		sortname : "USR_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "130",
	   	width : "100%",
	   	rowNum : 5,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onCellSelect : function(rowid, iCol, cellcontent, e) {
			var currentRow = $("#tblRespon").getRowData(rowid);
			console.log(currentRow);
			console.log(iCol);
			if(iCol == "5")
			{
				// 담당자 삭제 ajax
				$.ajax({
					type : "post",
					async : true,
					url : getContextPath() + "/ajax/counsel/responsibleRegDelete.do",
					data : "pJson=" + getJsonResponsibleRegDelete(gTicketId, gSrvyTypeCd, currentRow.EMP_ID),
					success : function(data)
					{
						if(data != 1)
						{
							alert("삭제되었습니다.");
							$("#tblRespon").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleRegList(gTicketId, gSrvyTypeCd)}});
							$("#tblRespon").trigger("reloadGrid");
						}
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
				
			}
		}
	});
	
	// 첨부파일 그리드
	$("#tblFile").jqGrid({
		url : getContextPath() + "/ajax/counsel/responsibleRegFileList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonResponsibleRegFileList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "파일명", "크기", "삭제", "테이블이름", "테이블키", "조사유형코드", "파일ID", "파일경로" ],
		colModel : 
		[
			{ name : "LOCFL_NM", classes : "grid_cursor" },
			{ name : "FL_KB_SZ", align : "right" },
			{ name : "FILE_DELETE", classes : "grid_cursor", align : "center" },
			{ name : "TBL_NM", hidden : true },
			{ name : "TBL_PK", hidden : true },
			{ name : "TBL_PK2", hidden : true },
			{ name : "FL_ID", hidden : true },
			{ name : "SVRFL_PTH", hidden : true },
		],
		sortname : "LOCFL_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "130",
	   	width : "100%",
	   	rowNum : 5,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	onCellSelect : function(rowid, iCol, cellcontent, e) 
	   	{
	   		var currentRow = $("#tblFile").getRowData(rowid);
	   		if(iCol == "1")
	   		{
	   			/*
	   			// 파일 다운로드
	   	        */
				var url = getContextPath() + "/file/counsel/responsibleRegFileDown.do?pJson=" + getJsonResponsibleRegFileDown(currentRow.SVRFL_PTH, currentRow.LOCFL_NM);
				window.open(url);
	   		}
	   		else if(iCol == "3")
			{
				// 파일 삭제 ajax
				$.ajax({
					type : "post",
					async : true,
					url : getContextPath() + "/ajax/counsel/responsibleRegFileDelete.do",
					data : "pJson=" + getJsonResponsibleRegFileDelete(currentRow.FL_ID),
					success : function(data)
					{
						if(data != 1)
						{
							alert("삭제되었습니다.");
							
							$("#tblFile").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleRegFileList()}});
							$("#tblFile").trigger("reloadGrid");
							
						}
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
		}
	});
	
	// tree node select event
	$("#listTeam").bind("select_node.jstree", function(event, data)
	{
		gTeamId = data.node.id;
		$("#tfSrchVal").val("");
		data.instance.toggle_node(data.node);
		gCurrentTeam = data.node;
		
		var $optSrchType = $("#optSrchType").val()
		,	$tfSrchVal = $.trim($("#tfSrchVal").val());
		
		if(Boolean($("#chkNotLowLevDept").prop("checked")))
		{
			console.log($("#chkNotLowLevDept").prop("checked"));
			if(data.node.parent == "ktr")
			{
				$("#tblEmp").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleList($optSrchType, $tfSrchVal, true, gTeamId)}, sortname : "USR_NM", sortorder : "asc"});
				$("#tblEmp").trigger("reloadGrid");

			}
			else if(data.node.parent != "ktr")
			{
				$("#tblEmp").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleList($optSrchType, $tfSrchVal, false, gTeamId)}, sortname : "USR_NM", sortorder : "asc"});
				$("#tblEmp").trigger("reloadGrid");
			}
		}
		else
		{
			$("#tblEmp").jqGrid("setGridParam", { postData :  {pJson : getJsonResponsibleList($optSrchType, $tfSrchVal, false, gTeamId)}, sortname : "USR_NM", sortorder : "asc"});
			$("#tblEmp").trigger("reloadGrid");
		}
	});
	
	// 검색 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	// 검색어 엔터 키 이벤트 등록
	$("#tfSrchVal").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	// 담당자 추가 버튼 이벤트 등록
	$("#btnReg").bind("click", btnReg_clickEvent);
	
	// 담당자 페이지 닫기 버튼 이벤트 등록
	$("#btnResponClose").bind("click", btnResponClose_clickEvent);
	
	// 파일 등록 버튼 클릭 이벤트
	$("#btnFileSearch").bind("click", btnFileSearch_clickEvent);
	
	// 하위부서 포함 체크박스 클릭 이벤트 등록
	$("#chkNotLowLevDept").bind("click", chkNotLowLevDept_clickEvent);
});