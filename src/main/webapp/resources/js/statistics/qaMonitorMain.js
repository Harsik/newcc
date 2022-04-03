/*
 * 상담품질, 1차 처리율 평가
 * Table : om025 : 평가기본
 *         om026 : 평가대상자기본
 * 		   od029 : 평가대상자품질평가점수상세
 *         od027 : 평가대상자품질상세
 *         od028 : 평가대상자품질평가상세
 *         od026 : 평가대상자처리율상세 
*/

// 조회 조건 및 조회 값
var g_usrId = window.sessionStorage.getItem("USR_ID");
var g_usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var g_usrTeamCd = window.sessionStorage.getItem("TEAM_CD")
var g_GrdTypeNm = "";			//사용자 권한 타입(AD:ADMIN, MN:MANAGER, AG:AGENT)

var g_MagamStat = "";			//마감여부 
//var g_GrdType = "";				//권한 Type (A:상담사, M:관리자)
var g_RecVltn_Id = "";			//평가ID
var g_RecUsrId = "";			//평가대상상담사
var g_RecOrd = "";				//평가차수

var g_ScrYn = "";				//차수별 평가점수 유무

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

//마감상태 버튼 설정
function initMagamStatus(mg_Type)
{
	//마감 일 경우 각 버튼 활성화, 비활성화 설정
	if (mg_Type == "Y"){
			$("#qamoni_btnMagam").html("마감취소");
			
			//버튼 비활성화
			$("#qamoni_btnInsert").prop("disabled", true);	//평가목록 저장
			$("#qamoni_btnUpdate").prop("disabled", true);	//평가목록 수정
			$("#qamoni_btnDelete").prop("disabled", true);	//평가목록 삭제

			//버튼 스타일 변경	
			$("#qamoni_btnInsert").addClass("disuse");	
			$("#qamoni_btnUpdate").addClass("disuse");	
			$("#qamoni_btnDelete").addClass("disuse");	

		}else {
			$("#qamoni_btnMagam").html("평가마감");
			
			//버튼 활성화
			$("#qamoni_btnInsert").prop("disabled", false);	//평가목록 저장
			$("#qamoni_btnUpdate").prop("disabled", false);	//평가목록 수정
			$("#qamoni_btnDelete").prop("disabled", false);	//평가목록 삭제			
			
			//버튼 스타일 변경		
			$("#qamoni_btnInsert").removeClass("disuse");	
			$("#qamoni_btnUpdate").removeClass("disuse");	
			$("#qamoni_btnDelete").removeClass("disuse");	

			//마감일자 초기화
			$("#qamoni_selMgmDt").val("");
		}	
}

//버튼 설정
function btnSetting(btnName, blnState)
{
	if (blnState == false) {
		$("#" + btnName).prop("disabled", true);
		$("#" + btnName).addClass("disuse");
	} else {
		$("#" + btnName).prop("disabled", false);
		$("#" + btnName).removeClass("disuse");
	}
}

// 모니터링평가조회 초기화
function initTab()
{
	$("#qamoni_selFrDate").val(newMonth);
	$("#qamoni_selToDate").val(getDate());	

	if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {	
		$("#qamoni_srchTeamCd").val("all");
		$("#qamoni_selSrchAgtId").val("all");
	} else {
		$("#qamoni_srchTeamCd").val(window.sessionStorage.getItem("TEAM_CD"));
		$("#qamoni_selSrchAgtId").val(g_usrId);
	}
	
		
	$("#qamoni_tblMntList").clearGridData();

	initMntTab();
}

// 모니터링평가목록 초기화
function initMntTab()
{	
	$("#qamoni_selFrDate1").val(getDate());
	$("#qamoni_selToDate1").val(getDate());
	$("#qamoni_selVltn_Ttl").val("");
	$("#qamoni_selMgmDt").val("");
	$("#qamoni_selSuvy_Id").val("all");
	
	$("#qamoni_tblMntTarget").clearGridData();
	
	//평가ID, 평가대상 usr_Id
	$("#qamoni_mntId").val("");
	$("#qamoni_mntTargetId").val("");
	$("#qamoni_mntUsrId").val("");
	$("#qamoni_mntTcktId").val("");
	g_RecVltn_Id = "";			//평가ID
	g_RecUsrId = "";			//평가대상상담사
	
	//권한이 상담사이면 끝...
	if (g_GrdTypeNm == "AG") {
		btnSetting("qamoni_btnPrcInsert", false);
		btnSetting("qamoni_btnPrcPrint", false);	//출력버튼
		btnSetting("qamoni_btnChart", false);		//그래프 조회
		return;
	}
	
	//$("#qamoni_btnUpdate").hide();
	//$("#qamoni_btnDelete").hide();
	//$("#qamoni_btnInsert").show();
	
	btnSearch_clickEvent();
	
	//마감버튼
	initMagamStatus("N");
	
	btnSetting("qamoni_btnUpdate", false);
	btnSetting("qamoni_btnDelete", false);
	btnSetting("qamoni_btnInsert", true);
	
	$("#qamoni_prc_Vltn_Opn1").prop("disabled", true);	//평가의견
	$("#qamoni_prc_Objct1").prop("disabled", true);	//이의제기
	$("#qamoni_prc_Ans1").prop("disabled", true);		//이의답변
	
	btnSetting("qamoni_btnChart", false);	 //그래프 조회 버튼
	btnSetting("qamoni_btnPrcPrint", false); //출력[1차처리율]
	
	initObjct();
}

// 모니터링평가 목록 저장
function saveMntList()
{
	if ($("#qamoni_selFrDate1").val().replace(/-/gi, "").trim() == "") {
		alert("시작일을 입력 해 주세요");
		$("#qamoni_selFrDate1").focus();
		return;
	}
	if ($("#qamoni_selToDate1").val().replace(/-/gi, "").trim() == "") {
		alert("종료일을 입력 해 주세요");
		$("#qamoni_selToDate1").focus();
		return;
	}
	if ($("#qamoni_selVltn_Ttl").val().trim() == "") {
		alert("제목을 입력 해 주세요");
		$("#qamoni_selVltn_Ttl").focus();
		return;
	}
	if ($("#qamoni_selSuvy_Id").val().trim() == "all") {
		alert("평가지를 선택 해 주세요");
		$("#qamoni_selSuvy_Id").focus();
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/qa/getMntId.do",
		data : "pJson=" + getMntId(),
		success : function(data)
		{
			g_RecVltn_Id = data.VLTN_ID;
			// 모니터링평가 목록 저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/qa/mntListSave.do",
				data : "pJson=" + getJsonStrMntListSave(g_RecVltn_Id),
				success : function(data)
				{
					
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
			
			// 모니터링평가 대상자 저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/qa/getMntTargetList.do",
				data : "pJson=" + getJsonStrMntTargetList(),
				success : function(data)
				{
					var pList = [];
					
					for(var i = 0; i < data.length; i++)
					{
						
						pList.push({"qt" : "aW5zZXJ0",
							"mi" : "b20wMjYuaW5zZXJ0UmVjVGFyZ2V0",
							"map":	{
								"usrId" : data[i].USR_ID,
								"mntId" : g_RecVltn_Id,
						}});
					}
					
					$.ajax({
						type : "post",
						async : true,
						url : getContextPath() + "/ajax/qa/insertMntTarget.do",
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
					networkErrorHandler(data, status, err);
				}
			});
			
			alert("모니터링평가가 등록되었습니다.");
			
			btnInit_clickEvent();
			
			//$("#qamoni_selFrDate1").val(getDate());
			//$("#qamoni_selToDate1").val(getDate());
			
			//btnSearch_clickEvent();
			
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
	if ($("#qamoni_selFrDate1").val().replace(/-/gi, "").trim() == "") {
		alert("시작일을 입력해주세요");
		$("#qamoni_selFrDate1").focus();
		return;
	}
	if ($("#qamoni_selToDate1").val().replace(/-/gi, "").trim() == "") {
		alert("종료일을 입력해주세요");
		$("#qamoni_selToDate1").focus();
		return;
	}
	if ($("#qamoni_selVltn_Ttl").val().trim() == "") {
		alert("제목을 입력 해 주세요");
		$("#qamoni_selVltn_Ttl").focus();
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/qa/updateMntList.do",
		data : "pJson=" + getJsonStrUpdateMntList(),
		success : function(data)
		{
			// 모니터링평가 대상자 저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/qa/getMntTargetList.do",
				data : "pJson=" + getJsonStrMntTargetList(),
				success : function(data)
				{
					var pList = [];
					
					for(var i = 0; i < data.length; i++)
					{
						
						pList.push({"qt" : "aW5zZXJ0",
							"mi" : "b20wMjYuaW5zZXJ0UmVjVGFyZ2V0",
							"map":	{
								"usrId" : data[i].USR_ID,
								"mntId" : g_RecVltn_Id,
						}});
					}
					
					$.ajax({
						type : "post",
						async : true,
						url : getContextPath() + "/ajax/qa/insertMntTarget.do",
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
					networkErrorHandler(data, status, err);
				}
			});
			
			$("#qamoni_selFrDate1").val(getDate());
			$("#qamoni_selToDate1").val(getDate());
			$("#qamoni_mntId").val("");
			
			//$("#qamoni_btnInsert").show();
			//$("#qamoni_btnUpdate").hide();
			//$("#qamoni_btnDelete").hide();
			btnSetting("qamoni_btnInsert", true);
			btnSetting("qamoni_btnUpdate", false);
			btnSetting("qamoni_btnDelete", false);
						
			alert("수정되었습니다.");
			
			btnInit_clickEvent();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 모니터링평가 목록 삭제
function deleteMntList()
{
	if ($("#qamoni_mntId").val() == "") {
		alert("목록을 선택해주세요.");
		return;
	} else {
		if(confirm("선택된 목록을 삭제하시겠습니까?")) {
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/qa/deleteMntList.do",
				data : "pJson=" + getJsonStrDeleteMntList(),
				success : function(data)
				{
					$("#qamoni_selFrDate1").val(getDate());
					$("#qamoni_selToDate1").val(getDate());
					$("#qamoni_mntId").val("");
					
					//$("#qamoni_btnInsert").show();
					//$("#qamoni_btnUpdate").hide();
					//$("#qamoni_btnDelete").hide();
					btnSetting("qamoni_btnInsert", true);
					btnSetting("qamoni_btnUpdate", false);
					btnSetting("qamoni_btnDelete", false);
					
					alert("삭제되었습니다.");
					
					btnInit_clickEvent();
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
	}
}


// 모니터링평가 목록 조회
function getJsonStrMntList()
{
	var frDt = $("#qamoni_selFrDate").val();
	var toDt = $("#qamoni_selToDate").val();
	
	if($("#qamoni_selFrDate").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#qamoni_selToDate").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjUubW50TGlzdA==",
		"map" : {
			"key" : "value",
			"frDt" : frDt,
			"toDt" : toDt,
			"team_cd" : $("#qamoni_srchTeamCd").val(),
			"usr_Id" : $("#qamoni_selSrchAgtId").val(),
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
			"fromDt" : $("#qamoni_selFrDate1").val().replace(/-/gi, ""),
			"toDt" : $("#qamoni_selToDate1").val().replace(/-/gi, ""),
			"title" : $("#qamoni_selVltn_Ttl").val().trim(),
			"suvy_Id" : $("#qamoni_selSuvy_Id").val() != "all" ? $("#qamoni_selSuvy_Id").val() : "",  
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 목록 수정
function getJsonStrUpdateMntList()
{
	var from_dt = $("#qamoni_selFrDate1").val().replace(/[-, :, \s]/g,"");
	var to_dt = $("#qamoni_selToDate1").val().replace(/[-, :, \s]/g,"");
	var mnt_id = $("#qamoni_mntId").val();
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMjUudXBkYXRlTW50TGlzdA==",
		"map" : {
			"key" : "value",
			"mntId" : mnt_id,
			"fromDt" : from_dt,
			"toDt" : to_dt,
			"title" : $("#qamoni_selVltn_Ttl").val().trim(),
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 목록 삭제
function getJsonStrDeleteMntList()
{
	var mnt_id = $("#qamoni_mntId").val();
	
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

//모니터링평가 마감등록, 마감취소
function getJsonStrUpdateMagamMnt(mg_Type)
{
	var mnt_id = $("#qamoni_mntId").val();
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMjUudXBkYXRlTWFnYW1NbnQ=",
		"map" : {
			"key" : "value",
			"mntId" : mnt_id,
			"cls_dt" : mg_Type == "Y" ? $("#qamoni_selMgmDt").val().replace(/-/g, "") : "",
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 등록할 대상자 불러오기 (상담사만 조회함 usr_grd_cd = '010100')
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
function getJsonStrRecTargetAgt(mntListId)
{	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjYuc2VsZWN0UmVjVGFyZ2V0QWd0",
		"map" : {
			"key" : "value",
			"mntId" : mntListId,
			"team_cd" : g_usrGrdCd=="030100" ? "all" : $("#qamoni_srchTeamCd").val(),
			"usr_Id" : g_usrGrdCd=="030100" ? "all" :  $("#qamoni_selSrchAgtId").val(),
			//"notuse" : false,
			"notuse" : true,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//설문/평가지 불러오기
function getJsonStrEduSuvyList()
{	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDQuc2VsZWN0Ym94U3V2eUxpc3Q=",
		"map" : {
			"key" : "value",

		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//평가의견, 이의제기, 이의답변 저장 및 삭제
function getJsonStrSaveRecObjct(dataType, ordIndex)
{
	var p_Vltn_Opn = "";	//평가의견
	var p_Objct = "";		//이의제기
	var p_Ans = "";			//이의답변
	
	if (ordIndex == "1") {
		p_Vltn_Opn = $("#qamoni_prc_Vltn_Opn1").val().trim();
		p_Objct = $("#qamoni_prc_Objct1").val().trim();
		p_Ans = $("#qamoni_prc_Ans1").val().trim();
	} else if (ordIndex == "2") {
		p_Vltn_Opn = $("#qamoni_prc_Vltn_Opn2").val().trim();
		p_Objct = $("#qamoni_prc_Objct2").val().trim();
		p_Ans = $("#qamoni_prc_Ans2").val().trim();
	} else
		return;
	
	if (dataType == "D") {
		p_Vltn_Opn = "";
		p_Objct = "";
		p_Ans = "";
	}	
	
	p_Vltn_Opn = p_Vltn_Opn.replace(/%/gi, '%25');
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b2QwMjgudXBkYXRlUmVjT2JqY3Q=",
		"map" : {
			"key" : "value",
			"vltn_Id" : $("#qamoni_mntId").val(),
			"vltn_Usr_Id" : $("#qamoni_mntUsrId").val(),
			"ord" : ordIndex,
			"vltn_Opn" : p_Vltn_Opn,
			"objct" : p_Objct,
			"ans" : p_Ans,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

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
			"cntr_cd" : "010000",
			"cmpg_usr_id" : agntId,
			"team_cd" : teamCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//설문/평가지 불러오기
function setSelectBoxWithSuvyList()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/eduSuvyList.do",
		data : "pJson=" + getJsonStrEduSuvyList(),
		success : function(data)
		{
			$("#qamoni_selSuvy_Id").html("");
			
			// param값을 JSON으로 파싱
			var value = "";
			
			value += "<option value='all'>미선택</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.ID + "'>" + state.TEXT + "</option>";
			});
			
			$("#qamoni_selSuvy_Id").append(value);

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//모니터링평가 조회버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	btnSetting("qamoni_btnChart", false);	 //그래프 조회 버튼
	btnSetting("qamoni_btnPrcPrint", false); //출력[1차처리율]
	
	$("#qamoni_tblMntList").jqGrid("setGridParam", { postData : { pJson : getJsonStrMntList() }, page : 1, sortname : "STRT_END_DT", sortorder : "desc" });
	$("#qamoni_tblMntList").trigger("reloadGrid");
	
	$("#qamoni_tblMntTarget").clearGridData();
}

// 모니터링평가 목록 조회 초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	initTab();
}

// 상담사 모니터링평가 초기화 버튼 클릭 이벤트
function btnReset_clickEvent()
{
	initMntTab();
}

//모니터링평가 마감 버튼 클릭 이벤트
function btnMagam_clickEvent() 
{
	var msg = ""
	var mg_Type = ""
		
	if ($("#qamoni_btnMagam").html() == "마감취소") {		
		msg = "마감취소";
		mg_Type = "N";		
			
	}else {
		msg = "평가마감";
		mg_Type = "Y";
		
		if ($("#qamoni_selMgmDt").val() == "") {
			alert("마감일자를 입력해주세요");
			return;
		}		
	}
	
	if ($("#qamoni_mntId").val() == "") {
		alert("목록을 선택해주세요.");
		return;
	} else {
		if(confirm("선택된 목록을 " + msg + "하시겠습니까?")) {
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/qa/magamMntList.do",
				data : "pJson=" + getJsonStrUpdateMagamMnt(mg_Type),
				success : function(data)
				{
					initMagamStatus(mg_Type)
					
					alert(msg + "되었습니다.");
					
					btnInit_clickEvent();
				},
				error : function(data, status, err) 
				{
					alert("" + err);
				}
			});
		}
	}	
}

//1차평가 탭 버튼
function divOnePrcBtn_clickEvent()
{
	$("#qamoni_divOnePrcBtn").attr("class", "left_tab_img");
	$("#qamoni_divTwoPrcBtn").attr("class", "left_tab_img_gray");
	
	$("#qamoni_divOnePrc").css("display", "block");
	$("#qamoni_divTwoPrc").css("display", "none");

	if ($("#qamoni_mntTcktId").val() == "")
		return;
	
	if (g_ScrYn == "ONE") {
		btnSetting("qamoni_btnPrcInsert", false);
		btnSetting("qamoni_btnPrcDelete", false);
	} else {
		btnSetting("qamoni_btnPrcInsert", true);
		
		if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN")
			btnSetting("qamoni_btnPrcDelete", true);
	}
}

//2차평가 탭 버튼
function divTwoPrcBtn_clickEvent()
{
	$("#qamoni_divOnePrcBtn").attr("class", "left_tab_img_gray");
	$("#qamoni_divTwoPrcBtn").attr("class", "left_tab_img");
	
	$("#qamoni_divOnePrc").css("display", "none");
	$("#qamoni_divTwoPrc").css("display", "block");

	if ($("#qamoni_mntTcktId").val() == "")
		return;
	
	if (g_ScrYn == "TWO") {
		btnSetting("qamoni_btnPrcInsert", false);
		btnSetting("qamoni_btnPrcDelete", false);
	} else {
		btnSetting("qamoni_btnPrcInsert", true);
		
		if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN")
			btnSetting("qamoni_btnPrcDelete", true);
	}
}

//평가의견, 이의제기, 이의답변 버튼
//저장 버튼
function btnPrcInsert_clickEvent()
{
	fnSaveRecObject("S");
}

//삭제 버튼
function btnPrcDelete_clickEvent()
{
	fnSaveRecObject("D");
}

//평가의견, 이의제기, 이의답변 저장, 삭제
function fnSaveRecObject(dataType){
	var tabIndex = checkTab_Disabled();
 	
	if ($("#qamoni_mntId").val() == "" && $("#qamoni_mntUsrId").val() == "" && $("#qamoni_mntTcktId").val() == "" && g_ScrYn != "") {
		alert("입력대상을 선택해주세요");
		return;
	}

	//평가의견, 이의제기, 이의답변 저장
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/qa/saveRecObjct.do",
		data : "pJson=" + getJsonStrSaveRecObjct(dataType, tabIndex),
		success : function(data)
		{
			$("#qamoni_tblMntTarget").jqGrid("setGridParam", {postData : {pJson : getJsonStrRecTargetAgt(g_RecVltn_Id)}, page : 1, sortname : "USR_NM", sortorder : "asc"});
			$("#qamoni_tblMntTarget").trigger("reloadGrid");
			
			$("#qamoni_mntTcktId").val("");	
			
			initObjct();
			alert("처리되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});

}
/*
//초기화 버튼
function btnPrcReset_clickEvent()
{
	divOnePrcBtn_clickEvent();
	initObjct();
}
*/

// 1차처리율 출력버튼 이벤트
function btnPrcPrint_clickEvent()
{	if($("#qamoni_mntId").val().trim() == ""){
		alert("출력하실 평가목록을 선택하십시요.");
	}else{
		window.open("http://" + window.location.hostname + ":8090/ClipReport4/vltn.jsp?vltnId="+$("#qamoni_mntId").val());
	}
	
}

//그래프 조회 버튼 이벤트
function btnChart_clickEvent()
{
	var width = 1140;
	var height = 748;
	
	var top = (screen.height - height) / 10;
	var left = (screen.width - width) / 2;
	
	//var top = window.screenTop + (screen.height - height) / 2;
	//var left = window.screenLeft + (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/statistics/qaMonitorUsrAct.do";
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "모니터링평가 현황", option);
	newWindow.focus();
}

//평가의견, 이의제기, 이의답변 초기화
function initObjct()
{
	//1차평가
	$("#qamoni_prc_Vltn_Opn1").val("");
	$("#qamoni_prc_Objct1").val("");
	$("#qamoni_prc_Ans1").val("");
	
	//2차평가
	$("#qamoni_prc_Vltn_Opn2").val("");
	$("#qamoni_prc_Objct2").val("");
	$("#qamoni_prc_Ans2").val("");	

	btnSetting("qamoni_btnPrcInsert", false);
	btnSetting("qamoni_btnPrcDelete", false);
	
	//차수별 평가점수가 있는지 여부
	g_ScrYn = "";
}

//평가의견 탭 활성화 체크
function checkTab_Disabled()
{
	var tabIndex = "";
	
	 if( document.all["qamoni_divOnePrc"].style.display == "block" ){
		 tabIndex = "1";
	 }else{
		 tabIndex = "2";
	 }	
	 
	 return tabIndex;
}

//삼당원 불러오기
function setSelectBoxWithUser(teamCd, agntId)
{	
	$("#qamoni_selSrchAgtId").val("all");
	
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
			
			$("#qamoni_selSrchAgtId").html("");
			// param값을 JSON으로 파싱
			var value = "";
			
			if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN")
				value += "<option value='all'>전체</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#qamoni_selSrchAgtId").append(value);
			
			if(g_GrdTypeNm == "AG")
			{
				$("#qamoni_selSrchAgtId").val(window.sessionStorage.getItem("USR_ID"));
				$("#qamoni_srchTeamCd").prop("disabled", true);
				$("#qamoni_selSrchAgtId").prop("disabled", true);
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//모니터링평가 대상
function initMntList(mntListId) 
{
	$("#qamoni_tblMntTarget").jqGrid(
		{
			url : getContextPath() + "/jqgrid/qa/mntTarget.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrRecTargetAgt(mntListId)
			},
			jsonReader :
			{
				repeatitems: false
			},
			colNames : ["상담사", "평가유무", 
			            "1차평가", "이의제기", "1차평가자",
			            "2차평가", "이의제기", "2차평가자",
			            "계", "평균", "평가갯수", "평가점수", 
			            "VLTN_ID", "VLTN_USR_ID", "TCKT_ID", "1차평가의견", "1차이의제기", "1차이의답변", "2차평가의견", "2차이의제기", "2차이의답변"],
			colModel :
			[
				{ name : "USR_NM", index : "USR_NM", width : 80, align : "center" },
				{ name : "EVL_YN", index : "EVL_YN", width : 80, align : "center" },
				
				{ name : "ORD1_SCR", index : "ORD1_SCR", width : 80, align : "center", 
		   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
				    	if (g_usrId == rowObject.ORD1_VLTR_ID) { return 'style="color:blue;font-weight:bold;text-decoration:underline;cursor:pointer"title="1차 상담품질평가 [클릭]!!!"' }
				    	else { return 'style="color:green;font-weight:bold;text-decoration:underline;cursor:pointer"title="1차 상담품질평가 [클릭]!!!"' }
					}
				},
				{ name : "ORD1_OBJCT_NM", index : "ORD1_OBJCT_NM", width : 80, align : "center", formatter:fnStatusFormatter, 
		   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
				    	{ return 'style="color:red;font-weight:bold;text-decoration:underline;cursor:pointer"title="1차 상담품질평가 [클릭]!!!"' }
					}
				},
				{ name : "ORD1_VLTR_ID", index : "ORD1_VLTR_ID", hidden : true },
				
				{ name : "ORD2_SCR", index : "ORD2_SCR", width : 80, align : "center", 
		   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
				    	if (g_usrId == rowObject.ORD2_VLTR_ID) { return 'style="color:blue;font-weight:bold;text-decoration:underline;cursor:pointer"title="1차 상담품질평가 [클릭]!!!"' }
				    	else { return 'style="color:green;font-weight:bold;text-decoration:underline;cursor:pointer"title="1차 상담품질평가 [클릭]!!!"' }
					}	
				},
				{ name : "ORD2_OBJCT_NM", index : "ORD2_OBJCT_NM", width : 80, align : "center", formatter:fnStatusFormatter, 
		   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
				    	{ return 'style="color:red;font-weight:bold;text-decoration:underline;cursor:pointer"title="1차 상담품질평가 [클릭]!!!"' }
					}
				},
				{ name : "ORD2_VLTR_ID", index : "ORD2_VLTR_ID", hidden : true },
				
				{ name : "TOT_SCR", index : "TOT_SCR", width : 80, align : "center" },
				{ name : "AVG_SCR", index : "AVG_SCR", width : 80, align : "center" },
				{ name : "PRC_CNT", index : "PRC_CNT", width : 80, align : "center" },
				{ name : "CRCT_CNT", index : "CRCT_CNT", width : 80, align : "center" },
				{ name : "VLTN_ID", index : "VLTN_ID", hidden : true },
				{ name : "VLTN_USR_ID", index : "VLTN_USR_ID", hidden : true },	
				{ name : "TCKT_ID", index : "TCKT_ID", hidden : true },	
				{ name : "ORD1_VLTN_OPN", index : "ORD1_VLTN_OPN", hidden : true },
				{ name : "ORD1_OBJCT", index : "ORD1_OBJCT", hidden : true },
				{ name : "ORD1_ANS", index : "ORD1_ANS", hidden : true },
				{ name : "ORD2_VLTN_OPN", index : "ORD2_VLTN_OPN", hidden : true },
				{ name : "ORD2_OBJCT", index : "ORD2_OBJCT", hidden : true },
				{ name : "ORD2_ANS", index : "ORD2_ANS", hidden : true },
			],
			sortname : "USR_NM",
			sortorder : "asc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
			height : "420",
			width : "100%",
			rowNum : 15,
			rowList : [15, 30, 45],
			autowidth : true,
			pager : "#qamoni_pgTblMntTarget",
			rownumbers : true,
			rownumWidth : 30,
			multiselect : false,
			emptyrecords : "",
			caption : "",
			loadui : "enable",
			viewrecords: true,
			onSelectRow : function(rowid)
			{
		   		var row = $("#qamoni_tblMntTarget").getRowData(rowid);
		   		$("#qamoni_mntUsrId").val(row.VLTN_USR_ID);
		   		row.TCKT_ID != null ? $("#qamoni_mntTcktId").val(row.TCKT_ID) : $("#qamoni_mntTcktId").val("");
		   		
		   		initObjct();
		   		
		   		
		   		//관리자이면
		   		if (g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
			   		//1차평가점수가 없다면 평가의견, 이의제기, 이의답변 비활성화
			   		if(row.ORD1_SCR == ""){
						//버튼 비활성화
						$("#qamoni_prc_Vltn_Opn1").prop("disabled", true);	//평가의견
						$("#qamoni_prc_Objct1").prop("disabled", true);	//이의제기
						$("#qamoni_prc_Ans1").prop("disabled", true);		//이의답변
						
						g_ScrYn = "ONE";
			   		} else {
						$("#qamoni_prc_Vltn_Opn1").prop("disabled", false);	//평가의견
						$("#qamoni_prc_Objct1").prop("disabled", true);		//이의제기
						$("#qamoni_prc_Ans1").prop("disabled", false);			//이의답변
			   		}
			   		
			   		//2차평가점수가 없다면 평가의견, 이의제기, 이의답변 비활성화
			   		if(row.ORD2_SCR == ""){
						//버튼 비활성화
						$("#qamoni_prc_Vltn_Opn2").prop("disabled", true);	//평가의견
						$("#qamoni_prc_Objct2").prop("disabled", true);	//이의제기
						$("#qamoni_prc_Ans2").prop("disabled", true);		//이의답변
						
						g_ScrYn = "TWO";
			   		} else {
						$("#qamoni_prc_Vltn_Opn2").prop("disabled", false);	//평가의견
						$("#qamoni_prc_Objct2").prop("disabled", true);		//이의제기
						$("#qamoni_prc_Ans2").prop("disabled", false);			//이의답변
			   		} 		   		
		   		} else {
		   			//상담사이면
		   			
			   		//1차평가점수가 없다면 평가의견, 이의제기, 이의답변 비활성화
			   		if(row.ORD1_SCR == ""){
						//버튼 비활성화
						$("#qamoni_prc_Vltn_Opn1").prop("disabled", true);	//평가의견
						$("#qamoni_prc_Objct1").prop("disabled", true);	//이의제기
						$("#qamoni_prc_Ans1").prop("disabled", true);		//이의답변
						
						g_ScrYn = "ONE";
			   		} else {
						$("#qamoni_prc_Vltn_Opn1").prop("disabled", true);	//평가의견
						$("#qamoni_prc_Objct1").prop("disabled", false);		//이의제기
						$("#qamoni_prc_Ans1").prop("disabled", true);			//이의답변
			   		}
			   		
			   		//2차평가점수가 없다면 평가의견, 이의제기, 이의답변 비활성화
			   		if(row.ORD2_SCR == ""){
						//버튼 비활성화
						$("#qamoni_prc_Vltn_Opn2").prop("disabled", true);	//평가의견
						$("#qamoni_prc_Objct2").prop("disabled", true);	//이의제기
						$("#qamoni_prc_Ans2").prop("disabled", true);		//이의답변
						
						g_ScrYn = "TWO";
			   		} else {
						$("#qamoni_prc_Vltn_Opn2").prop("disabled", true);	//평가의견
						$("#qamoni_prc_Objct2").prop("disabled", false);		//이의제기
						$("#qamoni_prc_Ans2").prop("disabled", true);			//이의답변
			   		} 
		   		}
		   		
		   		//1차평가, 2차평가 점수가 없으면 저장, 삭제버튼 비활성화
		   		if(row.ORD1_SCR == "" && row.ORD2_SCR == ""){
		   			btnSetting("qamoni_btnPrcInsert", false);
		   			btnSetting("qamoni_btnPrcDelete", false);
		   			
		   			g_ScrYn = "BOTH";
		   		} else {
		   			var tabIndex = checkTab_Disabled();
		   			
		   			//상담사일 경우
		   			if (g_GrdTypeNm == "AG") {
		   				if ((tabIndex == "1" && row.ORD1_SCR != "") || (tabIndex == "2" && row.ORD2_SCR != "")) {
			   				btnSetting("qamoni_btnPrcInsert", true);
			   				btnSetting("qamoni_btnPrcDelete", false);
		   				}
		   			} else {
		   			// 관리자일 경우
			   			if (tabIndex == "1" && row.ORD1_SCR != "") {
			   				if (g_usrId == row.ORD1_VLTR_ID) {
			   					btnSetting("qamoni_btnPrcInsert", true);
			   					btnSetting("qamoni_btnPrcDelete", true);
			   				}
			   				/*if (g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN")
			   					btnSetting("btnPrcDelete", true);
			   				else
			   					btnSetting("btnPrcDelete", false);*/
			   			} else if (tabIndex == "2" && row.ORD2_SCR != "") {
			   				if (g_usrId == row.ORD2_VLTR_ID) {
			   					btnSetting("qamoni_btnPrcInsert", true);
			   					btnSetting("qamoni_btnPrcDelete", true);
			   				}
			   			}
		   			}
	
		   		}
		   		
		   		
		   		//g_usrId
		   		
		   		
		   		//1차평가
		   		row.ORD1_VLTN_OPN != null ? $("#qamoni_prc_Vltn_Opn1").val(row.ORD1_VLTN_OPN) : $("#qamoni_prc_Vltn_Opn1").val("");
		   		row.ORD1_OBJCT != null ? $("#qamoni_prc_Objct1").val(row.ORD1_OBJCT) : $("#qamoni_prc_Objct1").val("");
		   		row.ORD1_ANS != null ? $("#qamoni_prc_Ans1").val(row.ORD1_ANS) : $("#qamoni_prc_Ans1").val("");
		   		
		   		//2차평가
		   		row.ORD2_VLTN_OPN != null ? $("#qamoni_prc_Vltn_Opn2").val(row.ORD2_VLTN_OPN) : $("#qamoni_prc_Vltn_Opn2").val("");
		   		row.ORD2_OBJCT != null ? $("#qamoni_prc_Objct2").val(row.ORD2_OBJCT) : $("#qamoni_prc_Objct2").val("");
		   		row.ORD2_ANS != null ? $("#qamoni_prc_Ans2").val(row.ORD2_ANS) : $("#qamoni_prc_Ans2").val("");   		

			},
			ondblClickRow: function (rowid, iRow, iCol, e) 
			{
				if ($("#qamoni_mntId").val() == "" && $("#qamoni_mntUsrId").val() == "") {
					alert("평가대상자를 선택 해 주세요");
					return;
				}
				
				if ($("#qamoni_mntSuvyId").val() == "all") {
					alert("선택된 평가지가 없습니다.");
					return;
				}
				
				openMenuPopup("OM0029");
				/*
				var width = 1400;
				var height = 985;
				//var top = window.screenTop + (screen.height - height) / 2;
				//var left = window.screenLeft + (screen.width - width) / 2;
				var top = (screen.height - height) / 10;
				var left = (screen.width - width) / 2;
				
				var paramURL = getContextPath() + "/web/statistics/qaMonitorSubForm.do";
				var option = "width=" + width + ", height=" + height
					+ ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
				
				var newWindow = window.open(paramURL, "상담품질", option);
				newWindow.focus();
				*/
			},
		   	onCellSelect: function(rowid, index, contents, event) 
	    	{    
		   		g_RecOrd = "";	//평가차수
		   		
				//$("#qamoni_divOnePrc").css("display", "none");
				//$("#qamoni_divTwoPrc").css("display", "none");
		   		
	    		var cm = $(this).jqGrid('getGridParam','colModel');    
	    		var rows = $("#qamoni_tblMntTarget").getRowData(rowid);

	    		if (cm[index].name == "ORD1_SCR" || cm[index].name == "ORD1_OBJCT_NM")
	    		{
	    			if (rows.ORD1_SCR > 0) {
	    				g_RecOrd = "1";
	    				divOnePrcBtn_clickEvent()
	    				//$("#qamoni_divOnePrc").css("display", "block");
	    				//$("#qamoni_divTwoPrc").css("display", "none");
	    			}

	    		} else if (cm[index].name == "ORD2_SCR" || cm[index].name == "ORD2_OBJCT_NM")
	    		{
	    			if (rows.ORD2_SCR > 0) {
	    				g_RecOrd = "2";
	    				divTwoPrcBtn_clickEvent()
	    				//$("#qamoni_divOnePrc").css("display", "none");
	    				//$("#qamoni_divTwoPrc").css("display", "block");
	    			}
	    		}
	    		
	    	},
		   	error : function(data, status, err) 
		   	{
		   		networkErrorHandler(data, status, err);
		   	},
			onPaging : function(pgButton)
			{

			}
		}).jqGrid("navGrid", "#qamoni_pgTblMntTarget", {edit : false, add : false, del : false, search : false});

	// 멀티 헤더 설정 
	$("#qamoni_tblMntTarget").setGroupHeaders(
    {
        useColSpanStyle: true,
        groupHeaders: [
            { "numberOfColumns": 6, "titleText": "상담품질", "startColumnName": "ORD1_SCR" },
            { "numberOfColumns": 2, "titleText": "1차 처리율", "startColumnName": "PRC_CNT" }]
    });	
	
}

// 조회 초기화
function initControl() {
	
	//권한에 따른 평가의견, 이의답변, 이의제기 비활성화 
	if(g_GrdTypeNm == "AG")
	{
		$("#qamoni_prc_Vltn_Opn1").prop("disabled", true);		//평가의견
		$("#qamoni_prc_Objct1").prop("disabled", true);		//이의제기
		$("#qamoni_prc_Ans1").prop("disabled", true);			//이의답변
		
		$("#qamoni_prc_Vltn_Opn2").prop("disabled", true);		//평가의견
		$("#qamoni_prc_Objct2").prop("disabled", true);		//이의제기
		$("#qamoni_prc_Ans2").prop("disabled", true);			//이의답변
		
		btnSetting("qamoni_btnInsert", false);		//평가 저장
		btnSetting("qamoni_btnUpdate", false);		//평가 수정
		btnSetting("qamoni_btnDelete", false);		//평가 삭제
		btnSetting("qamoni_btnMagam", false);		//평가 마감
		btnSetting("qamoni_btnReset", false);		//평가 초기화	
		btnSetting("qamoni_btnChart", false);		//그래프 조회
	} else {
		$("#qamoni_prc_Vltn_Opn1").prop("disabled", true);	//평가의견
		$("#qamoni_prc_Objct1").prop("disabled", true);		//이의제기
		$("#qamoni_prc_Ans1").prop("disabled", true);			//이의답변
		
		$("#qamoni_prc_Vltn_Opn2").prop("disabled", true);	//평가의견
		$("#qamoni_prc_Objct2").prop("disabled", true);		//이의제기
		$("#qamoni_prc_Ans2").prop("disabled", true);			//이의답변
	}
	
	btnSetting("qamoni_btnPrcInsert", false);
	btnSetting("qamoni_btnPrcDelete", false);
	

	// 모니터링평가목록 jqgrid
	$("#qamoni_tblMntList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/qa/mntList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrMntList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["평가기간", "제목", "등록자", "마감여부", "VLTN_ID"],
	   	colModel :
	   	[
	   		{ name : "STRT_END_DT", index : "STRT_END_DT", width : 120, align : "center" },
	   		{ name : "VLTN_TTL", index : "VLTN_TTL", width : 240, align : "left" },
	   		{ name : "MOD_USR_NM", index : "MOD_USR_NM", width : 80, align : "center" },
	   		{ name : "CLS_DT", index : "CLS_DT", width : 80, align : "center" },
	   		{ name : "VLTN_ID", index : "VLTN_ID", hidden : true },
	   	],
	   	sortname : "STRT_END_DT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "150",
	   	width : "100%",
	   	rowNum : 5,
	   	rowList : [5, 10, 15],
	   	autowidth : true,
	   	pager : "#qamoni_pgTblMntList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{   
	   		if(g_GrdTypeNm == "AG"){
	   			btnSetting("qamoni_btnChart", false);	 //그래프 조회 버튼
	   			btnSetting("qamoni_btnPrcPrint", false); //출력[1차처리율]
	   		}else{
	   			btnSetting("qamoni_btnChart", true);	 //그래프 조회 버튼
				btnSetting("qamoni_btnPrcPrint", true); //출력[1차처리율]
	   		}
			
	   		//이의제기 초기화
	   		initObjct();
	   		
	   		var row = $("#qamoni_tblMntList").getRowData(rowid);

	   		$("#qamoni_mntId").val(row.VLTN_ID);
	   		
	   		$.ajax({
	   			type : "post",
	   			dataType: "json",
	   			async : true,
	   			url : getContextPath() + "/ajax/qa/getMntList.do",
	   			data : "pJson=" + getJsonStrMntListSpec(row.VLTN_ID),
	   			success : function(data)
	   			{
	   				$("#qamoni_selFrDate1").val(data.STRT_DT);
	   				$("#qamoni_selToDate1").val(data.END_DT);
	   				$("#qamoni_selVltn_Ttl").val(data.VLTN_TTL);
	   				
	   				//마감일자
	   				$("#qamoni_selMgmDt").val(data.CLS_DT);
	   				$("#qamoni_selSuvy_Id").val(data.SUVY_ID);
	   				data.SUVY_ID != null ? $("#qamoni_mntSuvyId").val(data.SUVY_ID) : $("#qamoni_mntSuvyId").val("all") ;
	   					   				
	   				g_MagamStat = ($("#qamoni_selMgmDt").val() != "" ? "MG" : "NG");
	   				
	   				if (g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN") {
		   				//마감 상태에 따른 버튼 활성화 설정
		   				initMagamStatus($("#qamoni_selMgmDt").val() != "" ? 'Y' : 'N');
		   				
		   				btnSetting("qamoni_btnInsert", false);
	   					//btnSetting("btnUpdate", true);
	   					//btnSetting("btnDelete", true);
	   				} 
	   				
	   				g_RecVltn_Id = data.VLTN_ID;

	   				if (g_MagamStat != "MG" && g_GrdTypeNm == "AG"){
	   					$("#qamoni_tblMntTarget").clearGridData();
	   					return;
	   				}
	   				
	   				$("#qamoni_tblMntTarget").jqGrid("setGridParam", {postData : {pJson : getJsonStrRecTargetAgt(g_RecVltn_Id)}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	   				$("#qamoni_tblMntTarget").trigger("reloadGrid");   		   				
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
	}).jqGrid("navGrid", "#qamoni_pgTblMntList", {edit : false, add : false, del : false, search : false});
}

// 초기 이벤트 셋팅
function initEvent()
{
	$("#qamoni_srchTeamCd").bind("change", function()
	{
		var teamCd = $("#qamoni_srchTeamCd").val();
		var agntId = $("#qamoni_selSrchAgtId").val();

		setSelectBoxWithUser(teamCd, agntId);
	});
	
	// 모니터링평가 목록 조회 버튼
	$("#qamoni_btnSearch").bind("click", btnSearch_clickEvent);
	// 모니터링평가 목록 초기화 버튼
	$("#qamoni_btnInit").bind("click", btnInit_clickEvent);
	
	// 모니터링평가 목록 저장 버튼
	$("#qamoni_btnInsert").bind("click", saveMntList);
	// 모니터링평가 목록 수정 버튼
	$("#qamoni_btnUpdate").bind("click", updateMntList);
	// 모니터링평가 목록 삭제 버튼
	$("#qamoni_btnDelete").bind("click", deleteMntList);
	// 상담사 모니터링평가 초기화 버튼
	$("#qamoni_btnReset").bind("click", btnReset_clickEvent);	
	//모니터링평가 마감 버튼
	$("#qamoni_btnMagam").bind("click", btnMagam_clickEvent);
	
	//1차상담품질 탭 버튼
	$("#qamoni_divOnePrcBtn").bind("click", divOnePrcBtn_clickEvent);
	//2차상담품질 탭 버튼
	$("#qamoni_divTwoPrcBtn").bind("click", divTwoPrcBtn_clickEvent);
	
	//평가의견, 이의제기, 이의답변 버튼
	//저장 버튼
	$("#qamoni_btnPrcInsert").bind("click", btnPrcInsert_clickEvent);
	//삭제 버튼
	$("#qamoni_btnPrcDelete").bind("click", btnPrcDelete_clickEvent);
	//초기화 버튼
	//$("#qamoni_btnPrcReset").bind("click", btnPrcReset_clickEvent);
	
	//출력[1차처리율]
	$("#qamoni_btnPrcPrint").bind("click", btnPrcPrint_clickEvent);
	//그래프 조회 버튼
	$("#qamoni_btnChart").bind("click", btnChart_clickEvent);
	
}

// 초기 데이터 셋팅
function initData()
{
/*	if(g_GrdTypeNm == "AD" && g_GrdTypeNm == "MN")
		g_GrdType = "M";
	else
		g_GrdType = "A"
*/	
	datePicker("#qamoni_selFrDate");
	datePicker("#qamoni_selToDate");
	
	datePicker("#qamoni_selFrDate1");
	datePicker("#qamoni_selToDate1");
	datePicker("#qamoni_selMgmDt");
	
	$("#qamoni_selFrDate").val(newMonth);
	$("#qamoni_selToDate").val(getDate());
	$("#qamoni_selFrDate1").val(getDate());
	$("#qamoni_selToDate1").val(getDate());
	
	$("#qamoni_mntUsrId").val("");
	/*$("#qamoni_mntSeq").val("");*/
	
	//$("#qamoni_btnUpdate").hide();
	//$("#qamoni_btnDelete").hide();
	btnSetting("qamoni_btnUpdate", false);
	btnSetting("qamoni_btnDelete", false);
	
	var usrTeamCd = (g_GrdTypeNm == "AG" ? g_usrTeamCd : "all");
	
	// 팀 셀렉트 박스 셋팅  
	setObjSelectBoxWithCode("qamoni_srchTeamCd", "전체", "", "CHILD", "90003", usrTeamCd);

	//설문/평가지
	setSelectBoxWithSuvyList();

	//모니터링평가 대상
	initMntList("0");

}

/*
 * 사용자등급코드 권한 가져오기 
	000100	교육생
	010100	agent
	030100	manager(팀장,QA)
	050100	센터장
	080100	관리자(admin)
	090100	시스템운영자
*/
function getGridTypeNm(usrGrdCd) {
	// AD:ADMIN, MN:MANAGER, AG:AGENT
	var grdTypeNm = "";
	
	if (usrGrdCd == "") {
		usrGrdCd = g_usrGrdCd;
	}
	
	if(usrGrdCd=="090100"){
		grdTypeNm = "AD";
	}else if(usrGrdCd=="030100"||usrGrdCd=="050100"){
		if(g_usrId=="manager001"||g_usrId=="generalmanager"){
			grdTypeNm = "MN";
		}else{
			grdTypeNm = "AG";
		}
	}else{
		grdTypeNm = "AG";
	}
	
	return grdTypeNm;
}

$(document).ready(function()
{
	g_GrdTypeNm = getGridTypeNm(g_usrGrdCd);
	
	initEvent();
	initData();
	initControl();
	
	btnSetting("qamoni_btnChart", false);	 //그래프 조회 버튼
	btnSetting("qamoni_btnPrcPrint", false); //출력[1차처리율]
});