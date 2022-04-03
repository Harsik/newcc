var tblMessageList = {};
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

var inputFile = [];
var fileBox_idx = 0;
var fileForm = "";

//파라미터 셋팅 ProgramList
function getJsonStrMsgUserList()
{
	// 권한에 따라 셋팅
	
	var cntrCd = "";
	var teamCd = "";
	
	if(usrGrdCd == "090100" || usrGrdCd == "060100")
	{
		cntrCd = "";
		teamCd = "";
	}
	else if(usrGrdCd == "050100")
	{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = "";
	}
	else
	{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = window.sessionStorage.getItem("TEAM_CD");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"team_cd" : teamCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 첨부파일
function getJsonFileList(noteId)
{		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om030",
			"tbl_pk": noteId,
			"orderby": "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc)
{
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//그리드 셋팅 함수
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
	    width : "100%",
	   	rowNum : pMap.rowNum,
	   	/*rowList : [14, 20, 30, 50, 100],*/
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
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

//그리드 셋팅 함수
function init_scroll_grid(pMap)
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
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	height : pMap.height,
	    width : "100%",
	   	rowNum : "9999",
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	});
}

//받은 쪽지리스트
function tblMessageList_init_grid()
{
	// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
	pMap = {};
	pMap.tblId = "tblMessageList";
	pMap.url   = "/jqgrid/main/tblMessageList.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wMzAuc2VsZWN0TGlzdA==", {"key" : "value" ,
		"optMsgList" : $('#optMsgList').val(),
		"msg_usr_id" : $("#selMsgCounselNm").val(),
		"tfStartDt" : $("#tfMsgStartDt").val().replace(/-/g, ""),
		"tfEndDt" : $("#tfMsgEndDt").val().replace(/-/g, ""),
		"tfMsg" : $("#tfMsg").val().trim(),
	});
	pMap.colNames = ["발신/수신","쪽지내용", "첨부", "발신일시", "발신자", "수신확인", "쪽지ID"];
	pMap.colModel =
   	[
   	 	{ name : "MSG_KIND", index : "msg_kind", align : "center", width : 100},		// 발신/수신
   	 	{ name : "NOTE_CNTN", index : "NOTE_CNTN", align : "left", width : 500},		// 쪽지내용
   	 	{ name : "FL_NUM", index : "FL_NUM", align : "center", width : 50},				// 첨부
   	 	{ name : "SND_DTTM", index : "SND_DTTM", align : "center", width : 150},		// 발신일시
   	 	{ name : "SND_USR_NM", index : "SND_USR_NM", align : "center", width : 100},	// 발신자
   	 	{ name : "RCVN_BUTTON", index : "RCVN_BUTTON", align : "center", width : 100},	// 수신확인(버튼)
   	    { name : "NOTE_ID", index : "NOTE_ID", hidden : true },							// 쪽지ID
   	 	//{ name : "NOTE_CNTN_HIDDEN", index : "NOTE_CNTN_HIDDEN", hidden :  true},		// 쪽지내용   	 	
   	];
	pMap.rowNum = "10";
	pMap.sortname = "SND_DTTM";
	pMap.height = "280";
	pMap.pager = "pagingMessageList";
	pMap.selectEvent = "tblMessageList_SelectRow";
	pMap.completeEvent = "tblMessageList_RcvnBtn";

	init_grid(pMap);	
}

//상담사 선택
function tblUsrList_init_grid()
{ 		
	// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
	pMap = {};
	pMap.tblId = "tblUsrList";
	pMap.url   = "/jqgrid/main/tblMessageList.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TWVzc2FnZVVzckxpc3Q=", {"key" : "value" ,
		"cntr_cd" : $("#selMsgUsrListCntr").val() == "all" ? "" : $("#selMsgUsrListCntr").val(),
		"srchval" : $("#tfMsgUsrListSrchVal").val().trim()
	});
	pMap.colNames = ["선택","센터명", "팀명", "상담사이름","상담사ID"];
	pMap.colModel =
	   	[
	   	 	{ name : "RD_YN", index:"RD_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, width : 30,align : "center", sortable : false},
	   	 	{ name : "CNTR_CD", index : "CNTR_CD", align : "center", width: 80},
	   	 	{ name : "TEAM_CD", index : "TEAM_CD", align : "center", width: 85},
	   	 	{ name : "USR_NM", index : "USR_NM", align : "center", width: 90},
	   	    { name : "USR_ID", index : "USR_ID", hidden : true }
	   	];
	
	pMap.sortname = "USR_NM";
	pMap.height = "323";
	//pMap.pager = "pgUsrList";
	pMap.rowNumber = true;
	pMap.width = "100%";
	pMap.autowidth = true;
	
	pMap.selectEvent = "tblUsrList_SelectRow";
	
	init_scroll_grid(pMap);
}

function btnMsgSearch_clickEvent()
{
	$("#tblMessageList").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMzAuc2VsZWN0TGlzdA==", {
		"optMsgList" : $('#optMsgList').val(),
		"msg_usr_id" : $("#selMsgCounselNm").val(),
		"tfStartDt" : $("#tfMsgStartDt").val().replace(/-/g, ""),
		"tfEndDt" : $("#tfMsgEndDt").val().replace(/-/g, ""),
		"tfMsg" : $("#tfMsg").val().trim(),
	})} , page : 1, sortname : "SND_DTTM", sortorder : "desc"}).trigger("reloadGrid");
}

function optMsgList_changeEvent()
{
	btnMsgSearch_clickEvent();
}
	
function tblMessageList_SelectRow(rowid)
{
	tblMessageList = $("#tblMessageList").jqGrid('getRowData', rowid);

//	DEXT5.setBodyValueEx("", 'editor1');
	editor1.SetEditorContent("");

	//$("#tfSpecSndCont").val("");
	
	$("#btnMsgModify").hide();
	$("#btnMsgDelete").show();
	
	document.getElementById("con").style.display = "none"; // 숨김
	document.getElementById("con1").style.display = ""; // 숨김
	
	//$("#tfSpecSndCont").val(tblMessageList.NOTE_CNTN_HIDDEN);	
	//$("#tfSpecSndCont").prop("readOnly", true);
	//$("#labMsgCountTxt").html(charByteSize($("#tfSpecSndCont").val()) + " Byte");
	
	//DEXT5.setBodyValueEx("", 'editor1');
	//DEXT5.setBodyValueEx(tblMessageList.NOTE_CNTN_HIDDEN, 'editor1');
	//DEXT5.config.EditorBodyEditable = "false";

	if(tblMessageList.MSG_KIND == "발신")
	{
		// 발신일 경우 (상담사 선택 보임, 에디터 사이즈 작게 조절)
		document.getElementById("tfSelAgt").style.display = ""; 
		document.getElementById("tfEditbox").style.width = "59%"; 
		
		$("#btnMsgUpdate").hide();
		$("#btnMsgReply").hide();
		//$("#messageType").html("발신메세지");

		// 메시지그룹으로 조회하므로 개인이 수신 확인에 대한 내용이 없다.
		/*		
		if(tblMessageList.READ_YN == "")
		{
			$("#btnMsgUpdate").show();
			//$("#tfSpecSndCont").prop("readOnly", false);
			DEXT5.config.EditorBodyEditable = "true";
		}
		else
		{
			$("#btnMsgUpdate").hide();
		}
		*/		
		
		// 쪽지 수신자 조회
		$.ajax({
			type : "post",
			async : false,
			url : getContextPath() + "/ajax/message/messageInsert.do",
			dataType : "json",
			data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==","b20wMzAuY29uZmlybUxpc3Q=", {
				"noteId" : tblMessageList.NOTE_ID
			}),
			success : function(data)
			{
				for (var j = 1; j < $("#tblUsrList").getGridParam("reccount")+1; j++)				
				{
					for(var i = 0; i < data.length; i++)
					{
						if($("#tblUsrList").getCell(j, "USR_NM") == data[i].RCVN_USR_NM)
						{
							$("#tblUsrList").setCell(j, "RD_YN", 1);
							break;
						}
						else
							$("#tblUsrList").setCell(j, "RD_YN", 0);											
					}
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});			
	}
	else if(tblMessageList.MSG_KIND == "수신")
	{
		// 수신일 경우 (상담사 선택 안보임, 에디터 사이즈 크게 조절)
		document.getElementById("tfSelAgt").style.display = "none"; 
		document.getElementById("tfEditbox").style.width = "100%";
		
		//$("#messageType").html("수신메세지");
		$("#btnMsgUpdate").hide();
		$("#btnMsgReply").show();
		
		// 수신확인 Update
		//if(tblMessageList.READ_YN == "")
		//{
			$.ajax({
				type : "post",
				async : false,
				url : getContextPath() + "/ajax/message/messageInsert.do",
				data : "pJson=" + getJsonStr("dXBkYXRl","b20wMzAudXBkYXRlUmVhZA==", {
					"note_id" : tblMessageList.NOTE_ID
				}),
				success : function(data)
				{
					btnMsgSearch_clickEvent();
				},
				error : function(data, status, err)
				{
					networkErrorHandler(data, status, err);
				}
			});
		//}
		
		// 발신자 선택
		for(var i = 1; i < $("#tblUsrList").getGridParam("reccount"); i++)
		{
			if($("#tblUsrList").getCell(i, "USR_NM") == tblMessageList.SND_USR_NM)
				$("#tblUsrList").setCell(i, "RD_YN", 1);
			else
				$("#tblUsrList").setCell(i, "RD_YN", 0);
		}
	}

	if(tblMessageList.NOTE_ID != "")
	{
		// 쪽지 상세 내용 조회
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/message/notecntn.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l","b20wMzAuc2VsZWN0", {
				"note_id" : tblMessageList.NOTE_ID
			}),
			success : function(data)
			{				
//				DEXT5.setBodyValueEx(data.NOTE_CNTN, 'editor1');
				editor1.SetEditorContent(data.NOTE_CNTN);
				DEXT5.config.EditorBodyEditable = "false";	
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}	
		});	
			
		initContent();
		showAttachFiles(tblMessageList.NOTE_ID);
		
	}
	
	// 읽지 않은 쪽지 개수 다시 집계
	checkMessage();
}

// 수신확인 버튼 생성 및 이벤트 연결
function tblMessageList_RcvnBtn()
{
	// 상담사이 아닌 경우에만 버튼 생성
	if (usrGrdCd != "010100") 
	{
		var ids = $("#tblMessageList").getDataIDs();
		
		// 수신확인 버튼 표시
		for(var i = 0; i < ids.length; i++)
		{
			var rowid = ids[i];
			var row = $("#tblMessageList").getRowData(rowid);
			
			if(row.NOTE_ID != null && row.NOTE_ID != "")
			{
				var rcvnBtn = "<button class='button' style='width: 70px;' id='rcvn_" + row.NOTE_ID + "'>수신확인</button>";
				$("#tblMessageList").jqGrid("setRowData", rowid, { RCVN_BUTTON : rcvnBtn });		
				$("#rcvn_" + row.NOTE_ID).bind("click", fnRcvnList);			
			}
		}	
	}
}

// 수신확인 버튼 실행
function fnRcvnList()
{
		var name_by_id = this.id.substring(5);
		
		//alert(this.id + " : " + name_by_id);
		rcvnListPopup(name_by_id);
}

// 수신자 리스트 선택 해제
function tblUsrList_SelectRow(rowid)
{
	var rd_yn = $("#tblUsrList").getCell(rowid, "RD_YN");
	
	if(rd_yn == 1)
		$("#tblUsrList").setCell(rowid, "RD_YN", 0);
	else
		$("#tblUsrList").setCell(rowid, "RD_YN", 1);
}

//첨부파일 보기
function showAttachFiles(noteId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/message/fileList.do",
		data : "pJson=" + getJsonFileList(noteId),
		success : function(data)
		{
			for(var i in data)
			{
				var url = getContextPath() 
				+ "/file/message/messageFileDown.do?pJson=" 
				+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
				
				var tr = "<tr>";
				tr += "<td><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
				tr += "<span><a href='" + url + "' title='" + data[i].LOC_FL_NM + "'>" + data[i].LOC_FL_NM.substring(0, 20)+"</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
				tr += "</tr>";
				
				fileBox_idx++;
				//$("#fileInfos").prepend(tr);
				$("#tblFiles").prepend(tr);			
			}
			
/*			if(fileBox_idx >= 5)
			{
				$("#MESSAGE").prop("disabled", true);
				$("#rmFilebox").prop("disabled", true);
			}*/
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//파라미터 셋팅 insertMessage
function getJsonStrInsertMessage(noteId, noteCntn) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMzAuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tbl_pk": noteId,
			"tbl_nm" : "om030",
			"note_id" : noteId,
			"note_cntn" : noteCntn,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function btnMsgModify_clickEvent()
{
	var tblUsrList = $("#tblUsrList").getRowData();
	var pList = [];
	var cnt = 0;
	//var msgTxt = charByteSize($("#tfSpecSndCont").val());
	var msgTxt = editor1.GetEditorContent(); //DEXT5.getBodyTextValue("editor1");
	
	
/*	
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/user/useInfo.do",			// om030.nextval
		data : "pJson=" + getJsonStr("c2VsZWN0T25l","b20wMzAubmV4dHZhbA==", {	
			
		}),
		success : function(data)
		{
			var jr = JSON.parse(data);
			
			// om030.insert
			pList.push({"qt" : "aW5zZXJ0",
				"mi" : "b20wMzAuaW5zZXJ0",
				"map":	{
					     "note_id" : jr.NOTE_ID,
					     "note_cntn" : DEXT5.getBodyValue("editor1")
					     //"note_cntn" : $("#tfSpecSndCont").val().replace(/%/g, "%25")
			}});
			
			for(var i = 0 ; i <= tblUsrList.length; i++ )
			{	
				if(jQuery.isEmptyObject(tblUsrList[i]))
					continue;
				
				if(tblUsrList[i].RD_YN == "1")
				{
					cnt++;
					
					// om030.insertBatch
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "b20wMzAuaW5zZXJ0QmF0Y2g=",
						"map":	{
								 "note_id" : jr.NOTE_ID,
								 "rcvn_usr_id" : tblUsrList[i].USR_ID,
								 "rcvn_usr_nm" : tblUsrList[i].USR_NM,
								 "cntr_nm" : tblUsrList[i].CNTR_CD,
								 "team_nm" : tblUsrList[i].TEAM_CD
					}});
				}
			}
			
			if(cnt == 0)
				alert("수신 상담사를 선택해 주세요.");
			else if(msgTxt.trim() == "")
				alert("메세지 내용을 입력해 주세요.");
			//else if($("#tfSpecSndCont").val()==null || $("#tfSpecSndCont").val()=="")
			//	alert("메세지 내용을 입력해 주세요.");
			//else if(msgTxt > 4000)
			//	alert("메시지 내용은 4000 Byte를 초과 할 수 없습니다.");
			else
			{						
				$.ajax({
					type : "post",
					async : true,
					url : getContextPath() + "/ajax/message/messageInsert.do",
					data : "pJson=" + getJsonStr("YmF0Y2g=",null, pList),
					success : function(data)
					{
						btnMsgInit_clickEvent();
						alert("전송이 완료되었습니다.");
					},
					error : function(data, status, err){
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
	
	
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/user/useInfo.do",			// om030.nextval
		data : "pJson=" + getJsonStr("c2VsZWN0T25l","b20wMzAubmV4dHZhbA==", {	
			
		}),
		success : function(data)
		{  
			var jr = JSON.parse(data);
			
			var noteId_usr = jr.NOTE_ID;
/*			
			// om030.insert
			gAppendHidden("writeForm", "pJson", getJsonStrInsertMessage(jr.NOTE_ID, DEXT5.getBodyValueEx("editor1")));
			var rtnSubmit = gSubmitPost("writeForm", true);			
			
			alert(rtnSubmit);
*/			
			for(var i = 0 ; i <= tblUsrList.length; i++ )
			{	
				if(jQuery.isEmptyObject(tblUsrList[i]))
					continue;
				
				if(tblUsrList[i].RD_YN == "1")
				{
					cnt++;
					
					// om030.insertBatch
					pList.push({"qt" : "aW5zZXJ0",
						"mi" : "b20wMzAuaW5zZXJ0QmF0Y2g=",
						"map":	{
								 "note_id" : noteId_usr,
								 "rcvn_usr_id" : tblUsrList[i].USR_ID,
								 "rcvn_usr_nm" : tblUsrList[i].USR_NM,
								 "cntr_nm" : tblUsrList[i].CNTR_CD,
								 "team_nm" : tblUsrList[i].TEAM_CD
					}});
				}
			}
			
			if(cnt == 0)
				alert("수신 상담사를 선택해 주세요.");
			else if(msgTxt.trim() == "")
				alert("메세지 내용을 입력해 주세요.");
			else
			{	
				// om030.insert
				gAppendHidden("writeForm", "pJson", getJsonStrInsertMessage(jr.NOTE_ID, editor1.GetEditorContent())); //DEXT5.getBodyValueEx("editor1")
				var rtnSubmit = gSubmitPost("writeForm", true);			
				
				alert("전송이 완료되었습니다.");		
				
				
				$.ajax({
					type : "post",
					async : true,
					url : getContextPath() + "/ajax/message/messageInsert.do",
					data : "pJson=" + getJsonStr("YmF0Y2g=",null, pList),
					success : function(data)
					{
						btnMsgInit_clickEvent();
						//alert("전송이 완료되었습니다.");
						
						initContent();
					},
					error : function(data, status, err){
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

function btnMsgDelete_clickEvent()
{
	if(tblMessageList.MSG_KIND == "수신")
	{
		if(confirm("수신메세지를 삭제하시겠습니까?"))
		{
			$.ajax({
				type : "post",
				async : true,
				url : getContextPath() + "/ajax/message/messagedelete1.do",
				data : "pJson=" + getJsonStr("dXBkYXRl","b20wMzAuZGVsZXRlUmVjZWl2ZQ==", {
					"note_id" : tblMessageList.NOTE_ID
				}),
				success : function(data)
				{
					//$("#tfSpecSndCont").val("");
					//DEXT5.setBodyValueEx("", 'editor1');
					editor1.SetEditorContent("");
					tblMessageList = {};
					btnMsgInit_clickEvent();
					
					alert("삭제되었습니다.");
				},
				error : function(data, status, err)
				{
					networkErrorHandler(data, status, err);
				}	
			});
		}
	}
	else if(tblMessageList.MSG_KIND == "발신")
	{
		if(confirm("발신메세지를 삭제하시겠습니까?"))
		{
			$.ajax({
				type : "post",
				async : true,
				url : getContextPath() + "/ajax/message/messagedelete2.do",
				data : "pJson=" + getJsonStr("dXBkYXRl","b20wMzAuZGVsZXRl", {
					"note_id" : tblMessageList.NOTE_ID
				}),
				success : function(data)
				{
					//$("#tfSpecSndCont").val("");
//					DEXT5.setBodyValueEx("", 'editor1');
					editor1.SetEditorContent("");
					
					tblMessageList = {};
					
					btnMsgInit_clickEvent();
					
					alert("삭제되었습니다.");
				},
				error : function(data, status, err)
				{
					networkErrorHandler(data, status, err);
				}	
			});
		}
	}
}

function btnMsgUpdate_clickEvent()
{
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/message/messageInsert.do",
		data : "pJson=" + getJsonStr("dXBkYXRl","b20wMzAudXBkYXRl", {
			"note_id" : tblMessageList.NOTE_ID,
			"note_cntn" : editor1.GetEditorContent() //DEXT5.getBodyValueEx("editor1")
			//"note_cntn" : $("#tfSpecSndCont").val().replace(/%/gi, "%25")
		}),
		success : function(data){
			btnMsgInit_clickEvent();
			alert("수정되었습니다.");
			
			initContent();
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}	
	});
}

function btnMsgReset_clickEvent()
{
	tblMessageList = {};
	
	//$("#messageType").html("전송메세지"); 
	//$("#labMsgCountTxt").html("0 Byte"); 
	//$("#tfSpecSndCont").val("");

//	DEXT5.setBodyValueEx("", 'editor1');
	editor1.SetEditorContent("");
	$("#btnMsgModify").show();
	$("#btnMsgDelete").hide();
	$("#btnMsgUpdate").hide();
	//$("#tfSpecSndCont").prop("readOnly", false);
	DEXT5.config.EditorBodyEditable = "true";
	$("#btnMsgReply").hide();
	
	initContent();
	document.getElementById("con").style.display = ""; // 보여줌
	document.getElementById("con1").style.display = "none"; // 숨김
	
	// 상담사 선택 보임, 에디터 사이즈 작게 조절
	document.getElementById("tfSelAgt").style.display = ""; 
	document.getElementById("tfEditbox").style.width = "59%"; 
	
	$("#tblUsrList").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TWVzc2FnZVVzckxpc3Q=", {"key" : "value",
		"cntr_cd" : $("#selMsgUsrListCntr").val() == "all" ? "" : $("#selMsgUsrListCntr").val(),
		"srchval" : $("#tfMsgUsrListSrchVal").val().trim()
	})}}).trigger("reloadGrid");
}

function btnMsgInit_clickEvent()
{
	$("#optMsgList").val("all");
	$("#selMsgCounselNm").val("all");
	$("#tfMsg").val("");
	
	var d = new Date();
	var cMonth = d.getMonth() + 1;
	if(cMonth < 10)
		cMonth = "0" + cMonth;
	var currentDate = d.getFullYear() + "-" + cMonth + "-01";
	$("#tfMsgStartDt").val(currentDate);
	$("#tfMsgEndDt").val(getDate());
	
	btnMsgSearch_clickEvent();
	btnMsgReset_clickEvent();
}

function btnMsgReply_clickEvent()
{
	//$("#tfSpecSndCont").prop("readOnly", false);
	DEXT5.config.EditorBodyEditable = "true";
	var text = "";
	/*text += "\n------------------------------수신내용-----------------------------------\n";
	text += $("#tfSpecSndCont").html() + "\n";
	text += "----------------------------------------------------------------------------\n";*/
	//$("#messageType").html("전송메세지");
	//$("#tfSpecSndCont").html(text);
//	DEXT5.setBodyValueEx("", 'editor1');
	editor1.SetEditorContent("");
	$("#btnMsgReply").hide();
	$("#btnMsgDelete").hide();
	$("#btnMsgModify").show();
}

// 하단 상담사 검색 버튼 클릭 이벤트
function btnMsgUsrListSrch_clickEvent()
{
	$("#tblUsrList").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TWVzc2FnZVVzckxpc3Q=", {"key" : "value",
		"cntr_cd" : $("#selMsgUsrListCntr").val() == "all" ? "" : $("#selMsgUsrListCntr").val(),
		"srchval" : $("#tfMsgUsrListSrchVal").val().trim()
	})}}).trigger("reloadGrid");
}

//수신확인 버튼 클릭 이벤트
function rcvnListPopup(note_Id)
{    
	if(note_Id != null && note_Id != "")
	{
		//window.sessionStorage.setItem("messageNoteId", note_Id);
		
		var width = 300;
		var height = 390;
		var top = window.screenTop + (screen.height - height) / 2;
		var left = window.screenLeft + (screen.width - width) / 2;
		
		var paramURL = getContextPath() + "/web/main/messageRcvnList.do?NOTE_ID=" + note_Id;
		var option = "width=" + width + ", height=" + height
			+ ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
		
		var newWindow = window.open(paramURL, "수신확인", option);
		newWindow.focus();
		
/*		
		var paramURL = getContextPath() + "/web/main/messageRcvnList.do";
		var option = "help=no;dialogWidth=420px;dialogHeight:394px; center:yes; status:no; resizable:no; scrollbar:no";
		var newWindow = window.showModalDialog(paramURL, "수신확인", option);
*/		
	}	
}

function setSelectBoxWithMsgUser()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userList.do",
		data : "pJson=" + getJsonStrMsgUserList(),
		success : function(data)
		{
			$("#selMsgCounselNm").html("");
			// param값을 JSON으로 파싱
			var value = "";
			value += "<option value='all'>전체</option>";
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#selMsgCounselNm").append(value);
			$("#selMsgCounselNm").trigger("change");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 전체 선택 해제 함수
function rdYn_clickEvent()
{
	var selectVal = "0";
	var tblLength = $("#tblUsrList").getGridParam("reccount");
	
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#tblUsrList").getCell(i, "RD_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++)
	{
		$("#tblUsrList").setCell(i, "RD_YN", selectVal);
	}
}

/* 첨부파일 업로드 ================================================================== */
/*
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
*/
/*
//첨부파일박스삭제
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
*/
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
				var el = $("#writeForm input[name=record_" + fileId + "]");
					el.parent().parent().remove();
					if(--fileBox_idx < 5) {
						$("#BOARD").prop("disabled", false);
						$("#btnRmFilebox").prop("disabled", false);
					}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

/* 첨부파일 업로드 ================================================================== */

//초기 컨트롤 셋팅
function initMsgControl()
{
	$("#btnMsgUpdate").hide();
	$("#btnMsgDelete").hide();
	$("#btnMsgReply").hide();
}

//초기 이벤트 셋팅
function initMsgEvent()
{
	$("#btnMsgModify").bind("click", btnMsgModify_clickEvent);
	$('#optMsgList').bind("change", optMsgList_changeEvent);
	$("#btnMsgDelete").bind("click", btnMsgDelete_clickEvent);
	$("#btnMsgReset").bind("click", btnMsgReset_clickEvent);
	$("#btnMsgUpdate").bind("click", btnMsgUpdate_clickEvent);
	
	//메세지 엑셀화
	$("#btnMsgExcel").bind("click", btnMsgExcel_clickEvent);
	
	$("#btnMsgSearch").bind("click", btnMsgSearch_clickEvent);
	$("#btnMsgInit").bind("click", btnMsgInit_clickEvent);
	$("#btnMsgReply").bind("click", btnMsgReply_clickEvent);
	$("#btnMsgUsrListSrch").bind("click", btnMsgUsrListSrch_clickEvent);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfMsg").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnMsgSearch_clickEvent();
	});
	
	// 하단 사용자 조회 텍스트인풋 엔터 키 이벤트
	$("#tfMsgUsrListSrchVal").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			$("#btnMsgUsrListSrch").trigger("click");
	});
/*	
	// 문자내용 keyup 이벤트
	$("#tfSpecSndCont").bind("keyup", function(e)
	{
		var byteCount = charByteSize($("#tfSpecSndCont").val());
		
		if(byteCount > 4000)
		{
			$("#labMsgCountTxt").css("color","red");
		}
		else
		{
			$("#labMsgCountTxt").css("color","");
		}
		
		$("#labMsgCountTxt").html(byteCount + " Byte");
	});
*/	
	setSelectBoxWithMsgUser();
	
	datePicker("#tfMsgStartDt");
	datePicker("#tfMsgEndDt");
	
	setSelectBoxWithCode("selMsgUsrListCntr", "전체", "90002", "", "", window.sessionStorage.getItem("CNTR_CD"));
	
	if(window.sessionStorage.getItem("USR_GRD_CD") == "060100" || window.sessionStorage.getItem("USR_GRD_CD") == "090100")
		$("#selMsgUsrListCntr").prop("disabled", false);
	else
		$("#selMsgUsrListCntr").prop("disabled", true);
}

//초기 데이터 셋팅
function initMsgData()
{
	var d = new Date();
	var cMonth = d.getMonth() + 1;
	if(cMonth < 10)
		cMonth = "0" + cMonth;
	var currentDate = d.getFullYear() + "-" + cMonth + "-01";
	$("#tfMsgStartDt").val(currentDate);
	$("#tfMsgEndDt").val(getDate());
	
	tblMessageList_init_grid();
	tblUsrList_init_grid();
	
	$("#tblUsrList_RD_YN").bind("click", 1, rdYn_clickEvent);
	
	// jqgrid width 크기 맞추는 기능
	//var resizeWidth = $('.divClassMessageTbl').width();
	$('#tblMessageList').setGridWidth(920, true);
}

//내용 초기화
function initContent()
{
	fileBox_idx = 0;
	$("#tblFiles").empty().append(fileForm);
	//$("#fileInfos").empty().append(fileForm);
}

//초기셋팅
$(function()
{   
	inputFile.push($("#MESSAGE").clone());
	fileForm = $("#tblFiles tr").parent().html();
	//fileForm = $("#fileInfos tr").parent().html();
	
	initMsgEvent();
	initMsgData();
	initMsgControl();
	


});



//엑셀 문서화
function btnMsgExcel_clickEvent(){
	//alert("되냐");
	excelDownLoad(getContextPath() + "/excel/message/tblMessageList.do", getJsonStrMsgExcelList());
}

//파라미터 셋팅 엑셀문서화
function getJsonStrMsgExcelList(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMzAuZXhjZWxMaXN0",
			"map" : {
				"key" : "value",
				"optMsgList" : $('#optMsgList').val(),
				"msg_usr_id" : $("#selMsgCounselNm").val(),
				"tfStartDt" : $("#tfMsgStartDt").val().replace(/-/g, ""),
				"tfEndDt" : $("#tfMsgEndDt").val().replace(/-/g, ""),
				"tfMsg" : $("#tfMsg").val().trim(),
				"title" : "쪽지발송내역" + setDownLoadName($("#tfMsgStartDt").val(), $("#tfMsgEndDt").val()),
				"sidx" : "SND_DTTM",
				"sord" : "ASC",
				"colWidth" : [10,50,10, 20,20,20],
				"colName" : ["MSG_KIND", "NOTE_CNTN", "FL_NUM", "SND_DTTM", "SND_USR_NM","READ_YN"],
				"colHeader" : ["발신/수신","쪽지내용","첨부", "발신일시", "발신자","수신확인"],
				"colAlign" : ["center","center", "center", "center","center", "center"]//,
				//"rows" : "10"
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}