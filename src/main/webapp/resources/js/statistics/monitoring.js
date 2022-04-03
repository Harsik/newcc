// 조회 조건 및 조회 값
var g_usrId = window.sessionStorage.getItem("USR_ID");
var gMntId = "";
var mntListId = 0;
var inputFile = [];
var fileBox_idx = 0;
var fileForm = "";

var date = new Date(getDate());
var oneMonth = new Date(date);
oneMonth.setDate(oneMonth.getDate() - 30);
var nm = new Date(oneMonth);

var year = nm.getFullYear();
var month = nm.getMonth() + 1;
var day = nm.getDate();

if(month < 10)
	month = "0"+month;
if(day < 10)
	day = "0"+day;

var newMonth = year + "-" + month + "-" + day;

// 합계 자동계산
function calculateTotal() 
{
	var price1 = eval($("#intro").val());
	var price2 = eval($("#kindness").val());
	var price3 = eval($("#listen").val());
	var price4 = eval($("#pronoun").val());
	var price5 = eval($("#velocity").val());
	var price6 = eval($("#understand").val());
	var price7 = eval($("#solve").val());
	var price8 = eval($("#speed").val());
	var price9 = eval($("#good_manners").val());
	var price10 = eval($("#callback_etc").val());
	var price11 = eval($("#saygoodbye").val());
	var price12 = eval($("#praise").val());
	var price13 = eval($("#giveup").val());
	var price14 = eval($("#no_ment").val());
	
	$("#introScore").html(price1);
	$("#kindnessScore").html(price2);
	$("#listenScore").html(price3);
	$("#pronounScore").html(price4);
	$("#velocityScore").html(price5);
	$("#understandScore").html(price6);
	$("#solveScore").html(price7);
	$("#speedScore").html(price8);
	$("#good_mannersScore").html(price9);
	$("#callback_etcScore").html(price10);
	$("#saygoodbyeScore").html(price11);
	$("#praiseScore").html(price12);
	$("#giveupScore").html(price13);
	$("#no_mentScore").html(price14);
	
	$("#tot_score").html(price1 + price2 + price3 + price4 + price5 + price6 + price7 + price8 + price9 + price10 + price11 + price12 + price13 + price14);
}

// 점수 초기화
function resetTotalScore() {
	$("#intro").val(10);
	$("#kindness").val(10);
	$("#listen").val(10);
	$("#pronoun").val(5);
	$("#velocity").val(5);
	$("#understand").val(10);
	$("#solve").val(20);
	$("#speed").val(10);
	$("#good_manners").val(5);
	$("#callback_etc").val(5);
	$("#saygoodbye").val(10);
	$("#praise").val(0);
	$("#giveup").val(0);
	$("#no_ment").val(0);
	$("#tot_score").html(100);
}

// 모니터링평가 조회버튼 클릭 이벤트
function btnListSrch_clickEvent()
{
	$("#tblMntList").jqGrid("setGridParam", { postData : { pJson : getJsonStrMntList() }, page : 1, sortname : "TITLE", sortorder : "asc" });
	$("#tblMntList").trigger("reloadGrid");
}

// 모니터링평가조회 초기화 버튼 클릭 이벤트
function btnCustmInit_clickEvent()
{
	initTab();
}

// 모니터링평가목록 초기화 버튼 클릭 이벤트
function btnMntListInit_clickEvent()
{
	initMntTab();
}

// 모니터링평가조회 초기화
function initTab()
{
	$("#tblMntList").clearGridData();
	$("#tblMntTarget").clearGridData();
	
	$("#selFrDate1").val(getDate());
	$("#selToDate1").val(getDate());
	$("#note").val("");
	$("#mntId").val("");
	$("#selFrDate").val(newMonth);
	$("#selToDate").val(getDate());
	
	$("#btnUpdate").hide();
	$("#btnDelete").hide();
	$("#btnInsert").show();
	$("#btnCustmUdt").hide();
	$("#btnCustmDlt").hide();
	$("#btnCustmMod").show();
	
	$("#ozMonth").hide();
	$("#ozCounsel").hide();
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#monitoringFile").empty().append(fileForm);
	
	resetTotalScore();
	calculateTotal();
	
	btnListSrch_clickEvent();
}

// 모니터링평가목록 초기화
function initMntTab()
{
	$("#tblMntList").clearGridData();
	$("#tblMntTarget").clearGridData();
	
	$("#selFrDate1").val(getDate());
	$("#selToDate1").val(getDate());
	$("#mntId").val("");
	$("#note").val("");
	
	$("#btnUpdate").hide();
	$("#btnDelete").hide();
	$("#btnInsert").show();
	
	$("#btnCustmUdt").hide();
	$("#btnCustmDlt").hide();
	$("#btnCustmMod").show();
	
	$("#ozMonth").hide();
	$("#ozCounsel").hide();
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#monitoringFile").empty().append(fileForm);
	
	resetTotalScore();
	calculateTotal();
	
	btnListSrch_clickEvent();
}

// 저장 후 초기화
function initMonitoring()
{
	$("#btnCustmMod").show();
	$("#btnCustmUdt").hide();
	$("#btnCustmDlt").hide();
	$("#mntUsrId").val("");
	$("#mntSeq").val("");
	$("#note").val("");
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#monitoringFile").empty().append(fileForm);
	
	$("#tblMntTarget").trigger("reloadGrid");
	resetTotalScore();
	calculateTotal();
}

// 첨부파일박스 내용삭제
function rmFileBoxEvent() {
	inputFile[1] = inputFile[0].clone(true);
	$("#monitoring").replaceWith(inputFile[1]);
}

// 첨부파일 박스추가
function addFileBox() {
	if (fileBox_idx >= 4) {
		alert("첨부파일은 최대 5개까지 가능합니다.");
	} else {
		var html = $("#fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#monitoringFile").append(html);
	}
}

// 첨부파일박스삭제
function removeFileBox(i) {
	var el = $("#writeForm input[name=record_" + i + "]");
	el.parent().parent().remove();
	fileBox_idx--;
}

// 첨부된 파일 삭제
function deleteFile(fileId) {
	if(confirm("첨부된 파일을 삭제하시겠습니까?")) {
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/board/deleteFile.do",
			data : "pJson=" + getJsonDeleteFile(fileId),
			success : function(data) {
				//파일폼 삭제
				var el = $("#writeForm input[name=record_" + fileId + "]");
					el.parent().parent().remove();
					if(--fileBox_idx < 5) {
						$("#monitoring").prop("disabled", false);
						$("#mntRmFilebox").prop("disabled", false);
					}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 첨부파일 보기
function showAttachFiles(mntTargetId) {
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/monitoringFileList.do",
		data : "pJson=" + getJsonFileList(mntTargetId),
		success : function(data) {
			for(var i in data) {
				var url = getContextPath() 
				+ "/file/monitoringFileDown.do?pJson=" 
				+ getJsonFileDownload(data[i].SVR_FL_PTH, data[i].LOC_FL_NM);
				
				var tr = "<tr>";
				tr += "<td><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
				tr += "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
				tr += "</tr>";
				
				fileBox_idx++;
				$("#monitoringFile").prepend(tr);
			}
			if(fileBox_idx >= 5) {
				$("#monitoring").prop("disabled", true);
				$("#mntRmFilebox").prop("disabled", true);
			}
		},
		error : function(data, status, err) {
			alert("" + err);
		}
	});
}

// 모니터링평가 목록 저장
function saveMntList()
{
	if ($("#selFrDate1").val().replace(/-/gi, "").trim() == "") {
		alert("시작일을 입력해주세요");
		$("#selFrDate1").focus();
		return;
	}
	if ($("#selToDate1").val().replace(/-/gi, "").trim() == "") {
		alert("종료일을 입력해주세요");
		$("#selToDate1").focus();
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/getMntId.do",
		data : "pJson=" + getMntId(),
		success : function(data)
		{
			gMntId = data.VLTN_ID;
			// 모니터링평가 목록 저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/mntListSave.do",
				data : "pJson=" + getJsonStrMntListSave(gMntId),
				success : function(data)
				{
					
				},
				error : function(data, status, err) 
				{
					alert("" +err);
				}
			});
			
			// 모니터링평가 대상자 저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/getMntTargetList.do",
				data : "pJson=" + getJsonStrMntTargetList(),
				success : function(data)
				{
					var pList = [];
					
					for(var i = 0; i < data.length; i++)
					{
						
						pList.push({"qt" : "aW5zZXJ0",
							"mi" : "b20wMjUuaW5zZXJ0TW50VGFyZ2V0",
							"map":	{
								"usrId" : data[i].USR_ID,
								"mntId" : gMntId,
								"creat_usr_id" : g_usrId
						}});
					}
					
					$.ajax({
						type : "post",
						async : true,
						url : getContextPath() + "/ajax/management/insertMntTarget.do",
						data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
						success : function(data){
							
						},
						error : function(data, status, err){
							networkErrorHandler(data, status, err);
						}	
					});
					
				},
				error : function(data, status, err) 
				{
					alert("" +err);
				}
			});
			
			alert("모니터링평가가 등록되었습니다.");
			
			$("#selFrDate1").val(getDate());
			$("#selToDate1").val(getDate());
			
			btnListSrch_clickEvent();
			
		},
		error : function(data, status, err) 
		{
			alert("" +err);
		}
	});
}

// 모니터링평가 목록 수정
function updateMntList()
{
	if ($("#selFrDate1").val().replace(/-/gi, "").trim() == "") {
		alert("시작일을 입력해주세요");
		$("#selFrDate1").focus();
		return;
	}
	if ($("#selToDate1").val().replace(/-/gi, "").trim() == "") {
		alert("종료일을 입력해주세요");
		$("#selToDate1").focus();
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/updateMntList.do",
		data : "pJson=" + getJsonStrUpdateMntList(),
		success : function(data)
		{
			$("#selFrDate1").val(getDate());
			$("#selToDate1").val(getDate());
			$("#mntId").val("");
			
			$("#btnInsert").show();
			$("#btnUpdate").hide();
			$("#btnDelete").hide();
			
			$("#tblMntList").trigger("reloadGrid");
			
			$("#tblMntTarget").clearGridData();
			
			alert("수정되었습니다.");
		},
		error : function(data, status, err) 
		{
			alert("" +err);
		}
	});
}

// 모니터링평가 목록 삭제
function deleteMntList()
{
	if ($("#mntId").val() == "") {
		alert("목록을 선택해주세요.");
		return;
	} else {
		if(confirm("선택된 목록을 삭제하시겠습니까?(선택 목록 삭제시 등록된 모니터링 평가 점수 및 파일도 삭제됩니다.)")) {
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/deleteMntList.do",
				data : "pJson=" + getJsonStrDeleteMntList(),
				success : function(data)
				{
					$("#selFrDate1").val(getDate());
					$("#selToDate1").val(getDate());
					$("#mntId").val("");
					
					$("#btnInsert").show();
					$("#btnUpdate").hide();
					$("#btnDelete").hide();
					
					$("#tblMntList").trigger("reloadGrid");
					
					$("#tblMntTarget").clearGridData();
					
					alert("삭제되었습니다.");
				},
				error : function(data, status, err) 
				{
					alert("" +err);
				}
			});
		}
	}
}

//파일 체크
function validatorRe(){
	var rMsg = "";
	
	//파일 업로드 용량 체크
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#writeForm input[name=monitoring]");
	for(var i=0; i<formName.length; i++){
		if(formName[i].value !=""){
			var nRtn=fileCheck(formName[i] , nLimitSize);
			if(nRtn>nLimitSize){ 
				rMsg += "\n\n("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.";
			}
			
			//파일 확장자 체크
			if (fileExtnsCheck(formName[i]) == false)
				rMsg += "\n\n[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";
		}
	}
	return rMsg;
}

// 모니터링평가 점수 저장
function saveMntScore()
{
	var rMsg = validatorRe();
	
	if(rMsg != ""){
		alert(rMsg);
		return;
	}
	
	if ($("#mntUsrId").val() == "") {
		alert("대상자를 선택해주세요.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/management/getNextValue.do",
		data : "pJson=" + getNextValue(),
		success : function(data) 
		{
			gAppendHidden("writeForm", "pJson", getJsonStrInsertMntScore(data.MNT_SEQ));
			gSubmitPost("writeForm", true);
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/insertMntScore.do",
				data : "pJson=" + getJsonStrMntTarget(data.MNT_SEQ),
				success : function(data)
				{
					initMonitoring();
					
					alert("모니터링평가가 저장되었습니다.");
				},
				error : function(data, status, err) 
				{
					alert("" +err);
				}
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 모니터링평가 점수 수정
function updateMntScore()
{
	var rMsg = validatorRe();
	
	if(rMsg != ""){
		alert(rMsg);
		return;
	}
	
	if ($("#mntUsrId").val() == "") {
		alert("대상자를 선택해주세요.");
		return;
	}
	
	if(!confirm("수정 하시겠습니까?"))
		return;
	
	gAppendHidden("writeForm", "pJson", getJsonStrUpdateMntScore());
	gSubmitPost("writeForm", true);
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/updateMntScore.do",
		data : "pJson=" + getJsonStrMntTargetList(),
		success : function(data)
		{
			initMonitoring();
			
			alert("모니터링평가가 수정되었습니다.");
		},
		error : function(data, status, err) 
		{
			alert("" +err);
		}
	});
}

// 모니터링평가 점수 삭제
function deleteMntScore()
{
	if ($("#mntUsrId").val() == "") {
		alert("대상자를 선택해주세요.");
		return;
	} else {
		if(confirm("선택된 목록을 삭제하시겠습니까?(첨부파일이 있을 경우 등록된 첨부파일도 함께 삭제됩니다.)")) {
			gAppendHidden("writeForm", "pJson", getJsonStrDeleteMntScore());
			gSubmitPost("writeForm", true);
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/deleteMntScore.do",
				data : "pJson=" + getJsonStrMntTargetList(),
				success : function(data)
				{
					initMonitoring();
					
					alert("모니터링평가가 삭제되었습니다.");
				},
				error : function(data, status, err) 
				{
					alert("" +err);
				}
			});
		}
	}
}

// 월별 출력 오즈 통계
function ozMonthEvent()
{
	var month = $("#month").val();
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/monitoringMonth.jsp?month="+month);
}

// 상담사별 출력 오즈 통계
function ozCounselEvent()
{
	var id = $("#mntUsrId").val();
	var month = $("#month").val();
	
	//경용
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/monitoring.jsp?id="+id+"&month="+month);
}

//파라미터셋팅 첨부파일
function getJsonFileList(mntTargetId) {		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om025",
			"tbl_pk": mntTargetId,
			"orderby": "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {		
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터셋팅 첨부파일삭제
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

// 모니터링평가 목록
function getJsonStrMntList()
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
	if($("#selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjUubW50TGlzdA==",
		"map" : {
			"key" : "value",
			"frDt" : frDt,
			"toDt" : toDt
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// mnt ID 불러오기
function getMntId()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMjUuZ2V0TW50SWQ=",
		"map" : {
			"key" : "value",
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 모니터링평가 목록 등록
function getJsonStrMntListSave(gMntId)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMjUuaW5zZXJ0TW50TGlzdA==",
		"map" : {
			"key" : "value",
			"mntId" : gMntId,
			"fromDt" : $("#selFrDate1").val().replace(/-/gi, ""),
			"toDt" : $("#selToDate1").val().replace(/-/gi, ""),
			"creat_usr_id" : g_usrId,
			"title" : "모니터링_평가" + setDownLoadName($("#selFrDate1").val(), $("#selToDate1").val())
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 목록 수정
function getJsonStrUpdateMntList()
{
	var from_dt = $("#selFrDate1").val().replace(/[-, :, \s]/g,"");;
	var to_dt = $("#selToDate1").val().replace(/[-, :, \s]/g,"");;
	var mnt_id = $("#mntId").val();
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMjUudXBkYXRlTW50TGlzdA==",
		"map" : {
			"key" : "value",
			"mntId" : mnt_id,
			"fromDt" : from_dt,
			"toDt" : to_dt,
			"mod_usr_id" : g_usrId,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 목록 삭제
function getJsonStrDeleteMntList()
{
	var mnt_id = $("#mntId").val();
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMjUuZGVsZXRlTW50TGlzdA==",
		"map" : {
			"key" : "value",
			"mntId" : mnt_id,
			"use_yn" : 'N',
			"mod_usr_id" : g_usrId,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 등록할 대상자 불러오기
function getJsonStrMntTargetList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjUuc2VsZWN0VGFyZ2V0TGlzdA==",
		"map" : {
			"key" : "value",
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 모니터링평가 목록 선택
function getJsonStrMntListSpec(mnt_id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMjUuc2VsZWN0TW50U3BlYw==",
		"map" : {
			"key" : "value",
			"mnt_id" : mnt_id
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 모니터링평가 대상 목록
function getJsonStrMntTarget(mntListId)
{
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjUubW50VGFyZ2V0",
		"map" : {
			"key" : "value",
			"mntId" : mntListId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 대상 점수
function getJsonStrMntTargetSpec(mnt_usr_id, mnt_id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMjUubW50VGFyZ2V0U3BlYw==",
		"map" : {
			"key" : "value",
			"mntUsrId" : mnt_usr_id,
			"mntId" : mnt_id,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링 next value
function getNextValue() {
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMjUubmV4dHZhbA==",
		"map" : {
			"key" : "value"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 점수 등록
function getJsonStrInsertMntScore(mntSeq)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMjUuaW5zZXJ0TW50U2NvcmU=",
		"map" : {
			"key" : "value",
			"intro" : $("#intro").val(),
			"kindness" : $("#kindness").val(),
			"listen" : $("#listen").val(),
			"pronoun" : $("#pronoun").val(),
			"velocity" : $("#velocity").val(),
			"understand" : $("#understand").val(),
			"solve" : $("#solve").val(),
			"speed" : $("#speed").val(),
			"good_manners" : $("#good_manners").val(),
			"callback_etc" : $("#callback_etc").val(),
			"saygoodbye" : $("#saygoodbye").val(),
			"praise" : $("#praise").val(),
			"giveup" : $("#giveup").val(),
			"no_ment" : $("#no_ment").val(),
			"tot_score" : $("#tot_score").text(),
			"note" : $("#note").val(),
			"crt_usr_id" : g_usrId,
			"mntId" : $("#mntId").val(),
			"mntSeq" : mntSeq,
			"mntUsrId" : $("#mntUsrId").val(),
			"tbl_nm" : "om025",
			"tbl_pk": mntSeq
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 점수 수정
function getJsonStrUpdateMntScore()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMjUudXBkYXRlTW50U2NvcmU=",
		"map" : {
			"key" : "value",
			"intro" : $("#intro").val(),
			"kindness" : $("#kindness").val(),
			"listen" : $("#listen").val(),
			"pronoun" : $("#pronoun").val(),
			"velocity" : $("#velocity").val(),
			"understand" : $("#understand").val(),
			"solve" : $("#solve").val(),
			"speed" : $("#speed").val(),
			"good_manners" : $("#good_manners").val(),
			"callback_etc" : $("#callback_etc").val(),
			"saygoodbye" : $("#saygoodbye").val(),
			"praise" : $("#praise").val(),
			"giveup" : $("#giveup").val(),
			"no_ment" : $("#no_ment").val(),
			"note" : $("#note").val(),
			"tot_score" : $("#tot_score").text(),
			"mod_usr_id" : g_usrId,
			"mntId" : $("#mntId").val(),
			"mntUsrId" : $("#mntUsrId").val(),
			"tbl_nm" : "om025",
			"tbl_pk": $("#mntSeq").val()
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 점수 삭제
function getJsonStrDeleteMntScore()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMjUuZGVsZXRlTW50U2NvcmU=",
		"map" : {
			"key" : "value",
			"fin_flag" : 'N',
			"mod_usr_id" : g_usrId,
			"mntId" : $("#mntId").val(),
			"mntUsrId" : $("#mntUsrId").val(),
			"tbl_nm" : "om025",
			"tbl_pk": $("#mntSeq").val()
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 조회 초기화
function initControl() {
	// 모니터링평가목록 jqgrid
	$("#tblMntList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/management/mntList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrMntList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["목록", "VLTN_ID", "MONTH"],
	   	colModel :
	   	[
	   		{ name : "TITLE", index : "TITLE", width : 240, align : "center" },
	   		{ name : "VLTN_ID", index : "VLTN_ID", hidden : true },
	   		{ name : "MONTH", index : "MONTH", hidden : true }
	   	],
	   	sortname : "TITLE",
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "140",
	   	width : "100%",
	   	rowNum : 5,
	   	rowList : [5, 10, 15],
	   	autowidth : true,
	   	pager : "#pgTblMntList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		fileBox_idx = 0;
	   		rmFileBoxEvent();
	   		$("#monitoringFile").empty().append(fileForm);
	   		
	   		var row = $("#tblMntList").getRowData(rowid);
	   		$("#mntId").val(row.VLTN_ID);
	   		$("#month").val(row.MONTH);
	   		
	   		$.ajax({
	   			type : "post",
	   			dataType: "json",
	   			async : true,
	   			url : getContextPath() + "/ajax/management/getMntList.do",
	   			data : "pJson=" + getJsonStrMntListSpec(row.VLTN_ID),
	   			success : function(data)
	   			{
	   				$("#selFrDate1").val(data.STRT_DT);
	   				$("#selToDate1").val(data.END_DT);
	   				$("#btnInsert").hide();
	   				$("#btnUpdate").show();
	   				$("#btnDelete").show();
	   				$("#ozMonth").show();
	   				$("#ozCounsel").hide();
	   				mntListId = data.VLTN_ID;
	   				initMntList(mntListId);
	   			},
	   			error : function(data, status, err) 
	   			{
	   				networkErrorHandler(data, status, err);
	   			}
	   		});
	   		
	   	},
	   	onPaging : function(pgButton)
	   	{
	   	}
	}).jqGrid("navGrid", "#pgTblMntList", {edit : false, add : false, del : false, search : false});
}

// 모니터링평가 대상
function initMntList(mntListId) 
{
	$("#tblMntTarget").jqGrid(
		{
			url : getContextPath() + "/jqgrid/management/mntTarget.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrMntTarget(mntListId)
			},
			jsonReader :
			{
				repeatitems: false
			},
			colNames : ["대상자", "평가유무", "총점", "VLTN_ID", "VLTN_USR_ID", "VLTN_ORD"],
			colModel :
			[
				{ name : "USR_NM", index : "USR_NM", width : 80, align : "center" },
				{ name : "ANS_GB_CD", index : "ANS_GB_CD", width : 80, align : "center" },
				{ name : "VLTN_TOTA_SCR", index : "VLTN_TOTA_SCR", width : 80, align : "center" },
				{ name : "VLTN_ID", index : "VLTN_ID", hidden : true },
				{ name : "VLTN_USR_ID", index : "VLTN_USR_ID", hidden : true },
				{ name : "VLTN_ORD", index : "VLTN_ORD", hidden : true }
			],
			sortname : "USR_NM",
			sortorder : "asc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
			height : "287",
			width : "100%",
			rowNum : 11,
			rowList : [11, 22, 33],
			autowidth : true,
			pager : "#pgTblMntTarget",
			rownumbers : true,
			rownumWidth : 30,
			multiselect : false,
			emptyrecords : "",
			caption : "",
			loadui : "enable",
			viewrecords: true,
			onSelectRow : function(rowid)
			{
				var rows = $("#tblMntTarget").getRowData(rowid);
				
				$("#ozCounsel").show();
					
				$.ajax({
			   		type : "post",
			   		dataType: "json",
			   		async : true,
			   		url : getContextPath() + "/ajax/management/getMntTargetSpec.do",
			   		data : "pJson=" + getJsonStrMntTargetSpec(rows.VLTN_USR_ID, rows.VLTN_ID),
			   		success : function(data)
			   		{
			   			var mntTargetId = data.VLTN_ID;
			   			var mntUsrId = data.VLTN_USR_ID;
			   			var mntSeq = data.VLTN_ORD;
			   			
			   			fileBox_idx = 0;
				   		rmFileBoxEvent();
				   		$("#monitoringFile").empty().append(fileForm);
			   				
			   			if(data.ANS_GB_CD == 'Y')
			   			{
			   				showAttachFiles(mntSeq);
			   				
			   				$("#btnCustmMod").hide();
			   				$("#btnCustmUdt").show();
			   				$("#btnCustmDlt").show();
			   					
			   				$("#intro").val(data.GRET);
			   				$("#kindness").val(data.KNDN);
			   				$("#listen").val(data.LSTN);
			   				$("#pronoun").val(data.PRNC);
			   				$("#velocity").val(data.SPD);
			   				$("#understand").val(data.QST_UNDRS);
			   				$("#solve").val(data.ACT_RSLT);
			   				$("#speed").val(data.QCKNS);
			   				$("#good_manners").val(data.RDY_MNR);
			   				$("#callback_etc").val(data.CALLBCK_TNTR);
			   				$("#saygoodbye").val(data.END_GRET);
			   				$("#praise").val(data.CUST_PRS);
			   				$("#giveup").val(data.RDY_ABND);
			   				$("#no_ment").val(data.MENT_MISS);
			   				$("#note").val(data.MEMO),
			   				$("#tot_score").html(data.VLTN_TOTA_SCR);
			   				
			   				calculateTotal();
			   					
				   			$("#mntTargetId").val(mntTargetId);
			   				$("#mntUsrId").val(mntUsrId);
			   				$("#mntSeq").val(mntSeq);
			   			}
			   			else
			   			{
			   				$("#btnCustmMod").show();
			   				$("#btnCustmUdt").hide();
			   				$("#btnCustmDlt").hide();
			   				
			   				$("#note").val("");
			   				$("#mntTargetId").val(mntTargetId);
			   				$("#mntUsrId").val(mntUsrId);
			   				$("#mntSeq").val(mntSeq);
			   					
			   				resetTotalScore();
			   				calculateTotal();
			   			}
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
		   	},
			onPaging : function(pgButton)
			{
				
			}
		}).jqGrid("navGrid", "#pgTblMntTarget", {edit : false, add : false, del : false, search : false});
	$("#tblMntTarget").jqGrid("setGridParam", {postData : {pJson : getJsonStrMntTarget(mntListId)}, page : 1, sortname : "VLTN_USR_ID", sortorder : "asc"});
	$("#tblMntTarget").trigger("reloadGrid");
}

// 초기 이벤트 셋팅
function initEvent()
{
	// 모니터링평가 조회 버튼
	$("#btnSearch").bind("click", btnListSrch_clickEvent);
	// 모니터링평가 조회 초기화 버튼
	$("#btnInit").bind("click", btnCustmInit_clickEvent);
	// 모니터링평가 목록 저장 버튼
	$("#btnInsert").bind("click", saveMntList);
	// 모니터링평가 목록 수정 버튼
	$("#btnUpdate").bind("click", updateMntList);
	// 모니터링평가 목록 삭제 버튼
	$("#btnDelete").bind("click", deleteMntList);
	// 모니터링평가 목록 초기화 버튼
	$("#btnReset").bind("click", btnMntListInit_clickEvent);
	// 모니터링평가 점수 저장 버튼
	$("#btnCustmMod").bind("click", saveMntScore);
	// 모니터링평가 점수 수정 버튼
	$("#btnCustmUdt").bind("click", updateMntScore);
	// 모니터링평가 점수 삭제 버튼
	$("#btnCustmDlt").bind("click", deleteMntScore);
	// 파일박스취소버튼 클릭이벤트 등록
	$("#mntRmFilebox").bind("click", rmFileBoxEvent);
	// 월별출력 버튼 등록
	$("#ozMonth").bind("click", ozMonthEvent);
	// 상담사별출력 버튼 등록
	$("#ozCounsel").bind("click", ozCounselEvent);
}

// 초기 데이터 셋팅
function initData()
{
	inputFile.push($("#monitoring").clone());
	fileForm = $("#monitoringFile tr").parent().html();
	
	datePicker("#selFrDate");
	datePicker("#selToDate");
	
	datePicker("#selFrDate1");
	datePicker("#selToDate1");
	
	$("#selFrDate").val(newMonth);
	$("#selToDate").val(getDate());
	$("#selFrDate1").val(getDate());
	$("#selToDate1").val(getDate());
	
	$("#mntUsrId").val("");
	$("#mntSeq").val("");
	$("#btnUpdate").hide();
	$("#btnDelete").hide();
	$("#btnCustmUdt").hide();
	$("#btnCustmDlt").hide();
	$("#ozMonth").hide();
	$("#ozCounsel").hide();
	
	resetTotalScore();
	calculateTotal();
	
	initMntList(mntListId);
}

$(document).ready(function()
{
	initEvent();
	initData();
	initControl();
});