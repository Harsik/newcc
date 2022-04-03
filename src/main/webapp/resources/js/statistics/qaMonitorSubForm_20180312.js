// 조회 조건 및 조회 값
var g_parnt_Suvy_Id = window.opener.document.getElementById("mntSuvyId").value;
var g_mntId = window.opener.document.getElementById("mntId").value;					//평가목록ID
var g_RecVltn_Id = window.opener.document.getElementById("mntTargetId").value;		//상담사평가ID
var g_RecUsrId = window.opener.document.getElementById("mntUsrId").value;			//평가대상상담사
var g_MagamStat = window.opener.g_MagamStat;
var g_GrdType = window.opener.g_GrdTypeNm;

var g_RecVltr_Id1 = "";	//1차평가자ID
var g_RecVltr_Id2 = "";	//2차평가자ID
var g_RecOrd = "";		//평가차수

var g_Chkbox_Cnt = 0;	//평가지 체크박스 갯수

var g_usrId = window.sessionStorage.getItem("USR_ID");

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


//평가이력생성 버튼 등록
function btnRecInsert_Event()
{
	if(($("#mntId").val() == "") && ($("#mntUsrId").val() == ""))
	{
		alert("평가대상자를 선택해주세요");
		return;
	}
	
	openMenuPopup("OM0028_1");	
	
	//$("#tblMntRecList").jqGrid("setGridParam", {postData : {pJson : getJsonStrRecTargetCounsel($("#mntTargetId").val(), $("#mntUsrId").val())}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "asc"});
	//$("#tblMntRecList").trigger("reloadGrid");
	
}
//평가이력삭제 버튼 등록
function btnRecDelete_Event()
{
	var rowNum = $("#tblMntRecList").getGridParam("rowNum");
	var currentPageNum = $("#tblMntRecList").getGridParam("page");
	var gRowLength = $("#tblMntRecList").getGridParam("reccount");
	
	if ($("#mntId").val() == "" || $("#mntUsrId").val() == "") {	
		alert("평가대상자를 선택해주세요.");
		return;
	}

	var trgt_Cnt = 0;
		
	for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
	{	
		var currentRowCnt = $("#tblMntRecList").getRowData(i);
		if(jQuery.isEmptyObject(currentRowCnt))
			continue;
				
		if(currentRowCnt.TRGT_YN == "1")
			trgt_Cnt = trgt_Cnt + 1;
	}
	
	if (trgt_Cnt == 0) {
		alert("평가이력을 선택해주세요.");
		return;		
	}
	
	
	if(confirm("평가이력을 삭제 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#tblMntRecList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var TRGT_YN = "N";
			
			var sVltn_Id = currentRow.VLTN_ID;
			var sVltn_Usr_Id = currentRow.VLTN_USR_ID;
			var sTck_Id = currentRow.TCKT_ID;
			
			if(currentRow.TRGT_YN == "1")
			{
				TRGT_YN = "Y";
				
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/qa/recCounselListDelete.do",
					data : "pJson=" + getJsonStrRecCounselListDelete(sVltn_Id, sVltn_Usr_Id,  sTck_Id),
					success : function(data)
					{
						initMonitoring();

					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
		}
	}	
}

//모니터링평가 출력 버튼
function btnPrint_clickEvent()
{
	
}
/*
//마감상태 버튼 설정
function initMagamStatus(mg_Type)
{
	//마감 일 경우 각 버튼 활성화, 비활성화 설정
	if (mg_Type == "Y"){
		$("#btnMagam").html("마감취소");
		
		//버튼 비활성화
		$("#btnRecInsert").prop("disabled", true);	//평가이력생성
		$("#btnRecDelete").prop("disabled", true);	//평가이력삭제	
		
		$("#btnCustmMod").prop("disabled", true);	//평가 저장
		//$("#btnCustmUdt").prop("disabled", true);	//평가 수정 === 이의제기 입력해야 함...
		$("#btnCustmDlt").prop("disabled", true);	//평가 삭제
		
		//버튼 스타일 변경
		$("#btnRecInsert").addClass("disuse");	
		$("#btnRecDelete").addClass("disuse");	
		
		$("#btnCustmMod").addClass("disuse");	
		//$("#btnCustmUdt").addClass("disuse");	
		$("#btnCustmDlt").addClass("disuse");	

	} else {
		$("#btnMagam").html("평가마감");
		
		//버튼 활성화
		$("#btnRecInsert").prop("disabled", false);	//평가이력생성
		$("#btnRecDelete").prop("disabled", false);	//평가이력삭제
		
		$("#btnCustmMod").prop("disabled", false);	//평가 저장
		$("#btnCustmUdt").prop("disabled", false);	//평가 수정
		$("#btnCustmDlt").prop("disabled", false);	//평가 삭제
		
		//버튼 스타일 변경
		$("#btnRecInsert").removeClass("disuse");
		$("#btnRecDelete").removeClass("disuse");	
		
		$("#btnCustmMod").removeClass("disuse");	
		//$("#btnCustmUdt").removeClass("disuse");	
		$("#btnCustmDlt").removeClass("disuse");	

		//마감일자 초기화
		$("#selMgmDt").val("");
	}	
}
*/
// 저장 후 초기화
function initMonitoring()
{
	$("#btnCustmMod").show();
	$("#btnCustmUdt").hide();
	$("#btnCustmDlt").hide();

	$("#mntTargetId").val("");
	//$("#mntUsrId").val("");
	$("#mntTcktId").val("");	
	//$("#mntSeq").val("");

	//상담품질 탭
	if ($("#mntTabType").val() == "rec") {
		$("#tblMntRecList").jqGrid("setGridParam", {postData : {pJson : getJsonStrRecTargetCounsel($("#mntId").val(), $("#mntUsrId").val())}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "asc"});
		$("#tblMntRecList").trigger("reloadGrid");
	} else if ($("#mntTabType").val() == "prc") {
		//1차처리율 탭
		$("#tblPrcList").jqGrid("setGridParam", {postData : {pJson : getJsonStrPrcTargetCounsel($("#mntId").val(), $("#mntUsrId").val())}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "asc"});
		$("#tblPrcList").trigger("reloadGrid");
	}
	
}

// 모니터링평가 점수 저장
function saveMntScore()
{
	if ($("#mntId").val() == "" || $("#mntUsrId").val() == "" || $("#mntTcktId").val() == "") {
		alert("평가대상이력을 선택해주세요.");
		return;
	}

	if(g_RecOrd == "") {
		alert("선택된 평가차수가 없습니다.");
		return;
	}
	
	var scrMsg = chkScr();
	
	if (scrMsg != "") {
		alert(scrMsg + " 항목을 확인하세요.");
		return;
	}
	
	//평가상세정보를 먼저 삭제 한후 다시 저장한다.	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/qa/deleteRecScore.do",
		data : "pJson=" + getJsonStrDeleteRecScore($("#mntId").val(), $("#mntUsrId").val(), $("#mntTcktId").val(), g_RecOrd),
		success : function(data)
		{
			var pList = [];
			var pSuvyId = "";
			var pSubyScr = 0;
			
			$(".checkbox:checked").each(function() {

				//alert(this.id + " : " + this.value );
				
				pSuvyId = this.id.split("_");
				pSubyScr = this.value;
				
				pList.push({"qt" : "dXBkYXRl",
					"mi" : "b2QwMjkudXBkYXRlUmVjU2NvcmU=",
					"map":	{
						"vltn_Id" : $("#mntId").val(),
						"usr_Id" : $("#mntUsrId").val(),
						"tckt_Id" : $("#mntTcktId").val(),
						"ord" : g_RecOrd,
						"suvy_Id" : pSuvyId[1],
						"scr" : pSubyScr,
						
				}});
				
			});
	
			$.ajax({
				type : "post",
				async : true,
				url : getContextPath() + "/ajax/qa/insertMntTarget.do",
				data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
				success : function(data){
					initMonitoring();
					initTab();
					alert("모니터링평가가 저장되었습니다.");
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

}

// 모니터링평가 점수 삭제
function deleteMntScore()
{
	if ($("#mntId").val() == "" || $("#mntUsrId").val() == "" || $("#mntTcktId").val() == "") {
		alert("평가대상이력을 선택해주세요.");
		return;
	}

	if(g_RecOrd == "") {
		alert("선택된 평가차수가 없습니다.");
		return;
	}

	if(confirm("선택된 목록을 삭제하시겠습니까?")) {
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/qa/deleteRecScore.do",
			data : "pJson=" + getJsonStrDeleteRecScore($("#mntId").val(), $("#mntUsrId").val(), $("#mntTcktId").val(), g_RecOrd),
			success : function(data)
			{
				initMonitoring();
				initTab();
				alert("모니터링평가가 삭제되었습니다.");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}

}

//모니터링평가 대상 상담이력
function getJsonStrRecTargetCounsel(vltn_Id, vltn_Usr_Id)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2QwMjcucmVjVGFyZ2V0Q291bnNlbA==",
		"map" : {
			"key" : "value",
			"vltn_Id" : vltn_Id,
			"vltn_Usr_Id" : vltn_Usr_Id,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//모니터링평가 대상 상담이력 삭제
function getJsonStrRecCounselListDelete(vltn_Id, vltn_Usr_Id,  tckt_Id)
{
	var loParam = {
			"qt" : "ZGVsZXRl",
			"mi" : "b2QwMjcuZGVsZXRlUmVjQ291bnNlbExpc3Q=",
			"map" : {
				"key" : "value",			
				"vltn_Id" : vltn_Id,
				"vltn_Usr_Id" : vltn_Usr_Id,
				"tckt_Id" : tckt_Id,
			}
		};	
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 대상 점수 조회
function getJsonStrMntTargetSpec(vltn_Id, vltn_Usr_Id, tckt_Id, vltr_Id, ord)
{
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2QwMjkucmVjdFRhcmdldFNwZWM=",
		"map" : {
			"key" : "value",			
			"vltn_Id" : vltn_Id,
			"vltn_Usr_Id" : vltn_Usr_Id,
			"tckt_Id" : tckt_Id,
			"vltr_Id" : vltr_Id,
			"ord" : ord,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 모니터링평가 점수 삭제
function getJsonStrDeleteRecScore(vltn_Id, vltn_Usr_Id, tckt_Id, g_RecOrd)
{
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b2QwMjkuZGVsZXRlUmVjU2NvcmU=",
		"map" : {
			"key" : "value",
			"vltn_Id" : vltn_Id,
			"vltn_Usr_Id" : vltn_Usr_Id,
			"tckt_Id" : tckt_Id,	
			"ord" : g_RecOrd,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//1차처리율 대상 상담이력
function getJsonStrPrcTargetCounsel(vltn_Id, vltn_Usr_Id)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2QwMjYucHJjVGFyZ2V0Q291bnNlbA==",
		"map" : {
			"key" : "value",
			"vltn_Id" : vltn_Id,
			"vltn_Usr_Id" : vltn_Usr_Id,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//1차처리율 대상 상담이력 삭제
function getJsonStrPrcCounselListDelete(vltn_Id, vltn_Usr_Id,  tckt_Id)
{
	var loParam = {
			"qt" : "ZGVsZXRl",
			"mi" : "b2QwMjYuZGVsZXRlUHJjQ291bnNlbExpc3Q=",
			"map" : {
				"key" : "value",			
				"vltn_Id" : vltn_Id,
				"vltn_Usr_Id" : vltn_Usr_Id,
				"tckt_Id" : tckt_Id,
			}
		};	
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//1차처리율 점수 저장, 삭제 dataType (D: 삭제, S:저장)
function getJsonStrSavePrcObjct(dataType, vltn_Id, vltn_Usr_Id,  tckt_Id)
{
	var p_vltn_Gb_Cd = $("#prc_Vltn_Gb_Cd").val() != "all" ? $("#prc_Vltn_Gb_Cd").val() : "100000";	//bestcall
	var p_crct = $("#prc_Crct").val() != "all" ? $("#prc_Crct").val() : "0";						//정확
	var p_incrct = $("#prc_Incrct").val() != "all" ? $("#prc_Incrct").val() : "0";					//부정확
	var p_wndgd = $("#prc_Wndgd").val() != "all" ? $("#prc_Wndgd").val() : "0";						//오안내
	
	if (dataType == "D") {
		p_vltn_Gb_Cd = "100000";
		p_crct = "0";
		p_incrct = "0";
		p_wndgd = "0";
	}
	
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b2QwMjYudXBkYXRlUHJjQ291bnNlbExpc3Q=",
			"map" : {
				"key" : "value",			
				"vltn_Id" : vltn_Id,
				"vltn_Usr_Id" : vltn_Usr_Id,
				"tckt_Id" : tckt_Id,
				"vltn_Gb_Cd" : p_vltn_Gb_Cd,
				"crct" : p_crct,
				"incrct" : p_incrct,
				"wndgd" : p_wndgd,
			}
		};	
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

// 평가대상 상담이력 조회
function tblMntRecList_reloadGrid(recVltn_Id, recUsrId)
{
		$("#tblMntRecList").jqGrid("setGridParam", {postData : {pJson : getJsonStrRecTargetCounsel(recVltn_Id, recUsrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "asc"});
		$("#tblMntRecList").trigger("reloadGrid");  
}

//1차처리율 상담이력 조회
function tblMntPrcList_reloadGrid(recVltn_Id, recUsrId)
{
		$("#tblPrcList").jqGrid("setGridParam", {postData : {pJson : getJsonStrPrcTargetCounsel(recVltn_Id, recUsrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "asc"});
		$("#tblPrcList").trigger("reloadGrid");  
}

//checkbox event
function chkScrCalculate(chkbox)
{
	/*
	 * 동적 체크박스 이벤트 참고
	 */
	//선택한 체크박스 value
	//alert("선택한 체크박스 value" + chkbox.value);

	//동일한 체크박스 name 갯수
	//var cnt = $("input[name="+ chkbox.name +"]").length;
	
	//class가 checkbox인 객체 중 체크한 갯수 가져오기
	//var checkedLength = $(".checkbox:checked").length;

	//체크한 자기자신 name 가져오기
	var chkNm = document.getElementsByName(chkbox.name);

	//동일한 체크박스 name index
	var cnt = chkNm.length;
	
	var qstNm = "";
	
	//동일한 체크박스 name unchecked
	for(var i = 0; i < cnt; i++)
	{
		//alert(chkNm[i].checked);
		chkNm[i].checked = false;
		
		qstNm = chkNm[i].id.replace('ans', 'qst');
		$("#" + qstNm).css("color", "black");
	}
	
	//체크한 본인 다시 체크하기
	chkbox.checked = true;
	
	
    //체크한 체크박스 평가점수 전체합계
	var result = 0;
	
	$(".checkbox:checked").each(function() {
		  result += eval($(this).val());
		  
		  //alert(this.id)
		  qstNm = this.id.replace('ans', 'qst');
		  $("#" + qstNm).css("color", "red");
	});
	
	//alert(result);
}

//평가점수 누락 체크
function chkScr()
{
	var sRtn = "";
	
	var resultArr = []; 
	
	//중복된 체크박스 name 제거
	$(".checkbox").each(function(key, value){ 
		if($.inArray(value.name, resultArr) === -1) resultArr.push(value.name); 	
	});

	//소분류 갯수(중복제거한 체크박스 name 갯수)
	var objCnt = resultArr.length;

	for(var i = 0; i < objCnt; i++)
	{
		//체크박스 name 가져오기
		var chkNm = document.getElementsByName(resultArr[i]);
		//같은 체크박스 name 갯수
		var cnt = chkNm.length;
		
		var bUnChk = false;
		
		//동일한 체크박스 name unchecked
		for(var j = 0; j < cnt; j++)
		{
			//alert(chkNm[i].checked);
			if (chkNm[j].checked == true){
				bUnChk = true;
				break;
			} 
		}
		
		if (bUnChk == false)
			sRtn = sRtn + "[" + $("input[name='"+resultArr[i]+"']").parent().prev().prev().prev().text() + "] \n";		
			
	}

	return sRtn;
}

//녹취버튼 새성 이벤트 등록
function fnReclisten()
{
	var name_by_id = $('#'+this.id).attr('name');
 		if( this.id == "btnListenRec")	{
 			name_by_id = $("#hidCallId").val;
 		}
 		//alert("fnReclisten() " + this.id + " : " + name_by_id);
 		listenRecPopup("","","",name_by_id);
}

//평가 대상 상담이력 조회
function initRecList(mntVltn_Id, mntAgtId) 
{
	$("#tblMntRecList").jqGrid(
		{
			url : getContextPath() + "/jqgrid/qa/mntRecList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrRecTargetCounsel(mntVltn_Id, mntAgtId)
			},
			jsonReader :
			{
				repeatitems: false
			},
			colNames : ["선택", "접수일시", "전화번호", "처리유형", "상담결과", "통화시간", "통화구분", "녹취듣기", 
			            "1차평가자ID","1차평가자", "1차점수", "2차평가자ID", "2차평가자", "2차점수",
			            "상담유형", "문의내용", "답변내용", "VLTN_ID", "VLTN_USR_ID", "TCKT_ID", "녹취경로","녹취ID","평가날짜", "RCV_DT", "RCV_USR_ID"],
			colModel :
			[
			 	{ name : "TRGT_YN", index : "TRGT_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 20, resizable: false, sortable : false },
				{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", width : 90, align : "center" },
				{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", width : 50, align : "center" },
				{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", width : 50, align : "center" },
				{ name : "ACT_ST_NM", index : "ACT_ST_NM", width : 50, align : "center" },
				{ name : "CALL_TIME", index : "CALL_TIME", width : 50, align : "center" },
				{ name : "CALL_GB_NM", index : "CALL_GB_NM", width : 50, align : "center" },
				{ name : "REC_BUTTON", align : "center", width: 50 },		
				{ name : "ORD1_VLTR_ID", index : "INTV_NM", hidden : true },
				{ name : "ORD1_VLTR_NM", index : "OBJCT__NM", width : 60, align : "center", 
		   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
					    if (rowObject.ORD1_VLTR_NM != "" ) { return 'style="color:blue;font-weight:bold;text-decoration:underline;cursor:pointer"title="1차 상담품질평가 [클릭]!!!"' }
					}
				},			
				{ name : "ORD1_SCR", index : "VLTN_TOTA_SCR", width : 50, align : "center", 
		   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
					    if (rowObject.ORD1_SCR >= 0 ) { return 'style="color:blue;font-weight:bold;text-decoration:underline;cursor:pointer"title="1차 상담품질평가 [클릭]!!!"' }
					}
				},
				{ name : "ORD2_VLTR_ID", index : "INTV_NM", hidden : true },
				{ name : "ORD2_VLTR_NM", index : "OBJCT__NM", width : 60, align : "center", 
		   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
					    if (rowObject.ORD2_VLTR_NM != "" ) { return 'style="color:green;font-weight:bold;text-decoration:underline;cursor:pointer"title="2차 상담품질평가 [클릭]!!!"' }
					}
				},			
				{ name : "ORD2_SCR", index : "VLTN_TOTA_SCR", width : 50, align : "center", 
		   	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
					    if (rowObject.ORD2_SCR >= 0 ) { return 'style="color:green;font-weight:bold;text-decoration:underline;cursor:pointer"title="2차 상담품질평가 [클릭]!!!"' }
					}
				},
				{ name : "INTV_NM", index : "INTV_NM", hidden : true },
				{ name : "QST_CONT", index : "QST_CONT", hidden : true },
				{ name : "ACT_CONT", index : "ACT_CONT", hidden : true },				
				{ name : "VLTN_ID", index : "VLTN_ID", hidden : true },
				{ name : "VLTN_USR_ID", index : "VLTN_USR_ID", hidden : true },
				{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
		   	 	{ name : "RECD_ID", index : "RECD_ID", hidden:true },
		   	 	{ name : "CALL_ID", index : "CALL_ID" ,hidden:true },
		   	 	{ name : "CRT_DT", index : "CRT_DT" ,hidden:true },
		   	 	{ name : "RCV_DT", index : "RCV_DT", hidden:true },
		   	 	{ name : "RCV_USR_ID", index : "RCV_USR_ID" ,hidden:true },
			],
			sortname : "RCV_DT_FORMAT",
			sortorder : "asc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
			height : "570",
			width : "100%",
			rowNum : 20,
			rowList : [20, 40, 80],
			autowidth : true,
			pager : "#pgTblMntRecList",
			rownumbers : true,
			rownumWidth : 30,
			multiselect : false,
			emptyrecords : "",
			caption : "",
			loadui : "enable",
			viewrecords: true,
			onSelectRow : function(rowid)
			{
				$("#mntTcktId").val("");
				
				var rows = $("#tblMntRecList").getRowData(rowid);
				
				$("#mntTcktId").val(rows.TCKT_ID);
				
				//전화번호, 통화구분, 처리유형, 처리결과
				$("#cntct_Infm_Format").html(rows.CNTCT_INFM_FORMAT);
				$("#call_Gb_Nm").html(rows.CALL_GB_NM);
				$("#act_Type_Nm").html(rows.ACT_TYPE_NM);
				$("#act_St_Nm").html(rows.ACT_ST_NM);

				//상담이력내용 (상담유형, 문의내용, 답변내용)
				$("#intv_Nm").html(rows.INTV_NM);
				$("#qst_Cont").val(rows.QST_CONT);
				$("#act_Cont").val(rows.ACT_CONT);
				
				
				//모든체크박스 초기화
   				$(".checkbox:checked").each(function() {
   					$("input:checkbox").prop("checked",false);
   				  
   					var qstNm = this.id.replace('ans', 'qst');
   					$("#" + qstNm).css("color", "black");
   				});
								
				//1차평가자ID
				g_RecVltr_Id1 = rows.ORD1_VLTR_ID != null ? rows.ORD1_VLTR_ID : "";
				//2차평가자ID
				g_RecVltr_Id2 = rows.ORD2_VLTR_ID != null ? rows.ORD2_VLTR_ID : "";
				//평가차수
				var recVltr_Id = "";
				if (g_RecOrd == "1") 
					recVltr_Id = g_RecVltr_Id1;
				else if (g_RecOrd == "2")
					recVltr_Id = g_RecVltr_Id2;
				else {
					recVltr_Id = "";
					
					$("#btnCustmMod").hide();
	   				$("#btnCustmUdt").hide();
	   				$("#btnCustmDlt").hide();
	   				
	   				return;
				}
				
				$("#btnPrcPrint").show();
   				
   				
				$.ajax({
			   		type : "post",
			   		dataType: "json",
			   		async : true,
			   		url : getContextPath() + "/ajax/qa/getMntTargetSpec.do",
			   		data : "pJson=" + getJsonStrMntTargetSpec(rows.VLTN_ID, rows.VLTN_USR_ID, rows.TCKT_ID, recVltr_Id, g_RecOrd),
			   		success : function(data)
			   		{
			   			if (data.length > 0) {
			   				$("#btnCustmMod").hide();
			   				$("#btnCustmUdt").show();
			   				$("#btnCustmDlt").show();
			   							   				
			   				$(data).each(function() {
			   					
			   					//alert($(this).attr("SUVY_ID"));
			   					
				   				for (var i = 0; i < g_Chkbox_Cnt; i++)
				   				{
				   					var chkNm =  document.getElementsByClassName('checkbox')[i].id;
				   					var dtColNm = "ans_" + $(this).attr("SUVY_ID");
				   					
				   					if (chkNm == dtColNm)
				   						$("#" + dtColNm).prop("checked", true);
				   					
				   					var qstNm = dtColNm.replace('ans', 'qst');
				   					$("#" + qstNm).css("color", "red");

				   				}
			   				});

			   			} else {
			   				$("#btnCustmMod").show();
			   				$("#btnCustmUdt").hide();
			   				$("#btnCustmDlt").hide();
			   				
			   				$(".checkbox:checked").each(function() {
			   					$("input:checkbox").prop("checked",false);
			   				});
			   				
			   			}

			   		},
			   		error : function(data, status, err) 
			   		{
			   			networkErrorHandler(data, status, err);
			   		}
			   	});
					
			},
		   	gridComplete : function()
		   	{
		   		if (g_GrdType == "AG") {
		   			$('#tblMntRecList').hideCol('ORD1_VLTR_NM');
		   			$('#tblMntRecList').hideCol('ORD2_VLTR_NM');

		   			jQuery("#tblMntRecList").jqGrid( 'setGridWidth', "859" );

		   		} else {
		   			$('#tblMntRecList').showCol('ORD1_VLTR_NM');
		   			$('#tblMntRecList').showCol('ORD2_VLTR_NM');

		   		}
		   		
		   		
		   		var ids = $(this).getDataIDs();
		   		
		   		// 녹취 버튼 표시
		   		for(var i = 0; i < ids.length; i++)
		   		{
		   			var rowId = ids[i];
		   			var row = $(this).getRowData(rowId);
		   			
		   			if(row.CALL_ID != null && row.CALL_ID != "")
		   			{
		   				//청취 키  (녹취날짜 + con_id + agentId)
						var rec_param=row.RCV_DT+"|"+row.CALL_ID+"|"+row.RCV_USR_ID;
						
			   			var recBtn = "<button class='button' style='width: 50px;' id='rec_" + row.TCKT_ID + "' " + "name='" + rec_param + "'>청취</button>";
			   			$(this).jqGrid("setRowData", rowId, { REC_BUTTON : recBtn });
			   			$("#rec_" + row.TCKT_ID).bind("click", fnReclisten);
			   				
		   			}
		   		}
		   	},
		   	onCellSelect: function(rowid, index, contents, event) 
	    	{    
		   		g_RecOrd = "";	//평가차수
		   		
	    		var cm = $(this).jqGrid('getGridParam','colModel');    
	    		var rows = $("#tblMntRecList").getRowData(rowid);
	    		var rowRcvDt = " 접수일시 : " + rows.RCV_DT_FORMAT;

	    		if(cm[index].name == "ORD1_VLTR_NM" || cm[index].name == "ORD1_SCR")
	    		{	
	    			g_RecOrd = "1";
	    			$("#txtRecMent").text("[1차 상담품질 평가]" + rowRcvDt);
	    			$("#txtRecMent").css("color", "blue");
	    		} else if(cm[index].name == "ORD2_VLTR_NM" || cm[index].name == "ORD2_SCR")
	    		{	
	    			g_RecOrd = "2";
	    			$("#txtRecMent").text("[2차 상담품질 평가]" + rowRcvDt);
	    			$("#txtRecMent").css("color", "green");
	    		} else {
	    			$("#txtRecMent").text("[평가 차수를 선택해주세요.]");
	    			$("#txtRecMent").css("color", "red");
	    		}
	    		
	    		
	    	},
		   	error : function(data, status, err) 
		   	{
		   		networkErrorHandler(data, status, err);
		   	},
			onPaging : function(pgButton)
			{
				
			}
		}).jqGrid("navGrid", "#pgTblMntRecList", {edit : false, add : false, del : false, search : false});

}

//1차 처리율 initjqGrid
function initPrcRtoList(mntVltn_Id, mntAgtId) 
{
	$("#tblPrcList").jqGrid(
		{
			url : getContextPath() + "/jqgrid/qa/mntPrcList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrPrcTargetCounsel(mntVltn_Id, mntAgtId)
			},
			jsonReader :
			{
				repeatitems: false
			},
			colNames : ["선택", "접수일시", "전화번호", "처리유형", "상담결과", "통화시간", "통화구분", "정확", "부정확", "오안내", "녹취듣기", 
			            "상담유형", "문의내용", "답변내용", "BESTCALL", "VLTN_ID", "VLTN_USR_ID", "VLTN_ORD", "ID", "녹취경로", "녹취ID","평가날짜", "RCV_DT", "RCV_USR_ID"],
			colModel :
			[
			 	{ name : "TRGT_YN", index : "TRGT_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 20, resizable: false, sortable : false },
				{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", width : 90, align : "center" },
				{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", width : 50, align : "center" },
				{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", width : 50, align : "center" },
				{ name : "ACT_ST_NM", index : "ACT_ST_NM", width : 50, align : "center" },
				{ name : "CALL_TIME", index : "CALL_TIME", width : 50, align : "center" },
				{ name : "CALL_GB_NM", index : "CALL_GB_NM", width : 50, align : "center" },				
				{ name : "CRCT", index : "CRCT", width : 50, align : "center", formatter: 'integer', formatoptions:{thousandsSeparator:","}, summaryType:'sum' },
				{ name : "INCRCT", index : "INCRCT", width : 50, align : "center", formatter: 'integer', formatoptions:{thousandsSeparator:","}, summaryType:'sum' },
				{ name : "WNDGD", index : "WNDGD", width : 50, align : "center", formatter: 'integer', formatoptions:{thousandsSeparator:","}, summaryType:'sum' },				
				{ name : "REC_BUTTON", align : "center", width: 50 },					
				{ name : "INTV_NM", index : "INTV_NM", hidden : true },
				{ name : "QST_CONT", index : "QST_CONT", hidden : true },
				{ name : "ACT_CONT", index : "ACT_CONT", hidden : true },	
				{ name : "VLTN_GB_CD", index : "VLTN_GB_CD", hidden : true },	
				{ name : "VLTN_ID", index : "VLTN_ID", hidden : true },
				{ name : "VLTN_USR_ID", index : "VLTN_USR_ID", hidden : true },
				{ name : "VLTN_ORD", index : "VLTN_ORD", hidden : true },
		   	 	{ name : "TCKT_ID", index : "TCKT_ID", hidden:true },
		   	 	{ name : "RECD_ID", index : "RECD_ID", hidden:true },
		   	 	{ name : "CALL_ID", index : "CALL_ID" ,hidden:true },
		   	 	{ name : "CRT_DT", index : "CRT_DT" ,hidden:true },
		   	 	{ name : "RCV_DT", index : "RCV_DT", hidden:true },
		   	 	{ name : "RCV_USR_ID", index : "RCV_USR_ID" ,hidden:true },
			],
			sortname : "RCV_DT_FORMAT",
			sortorder : "asc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
			height : "495",
			width : "1754",//"100%",
			rowNum : 15,
			rowList : [15, 30, 60],
			autowidth : false, //true,
			pager : "#pgtblPrcList",
			rownumbers : true,
			rownumWidth : 30,
			multiselect : false,
			emptyrecords : "",
			caption : "",
			loadui : "enable",
			footerrow: true, 
	        userDataOnFooter : true,
			viewrecords: true,
			onSelectRow : function(rowid)
			{
				$("#mntTcktId").val("");
				
				var rows = $("#tblPrcList").getRowData(rowid);
				
				$("#mntTcktId").val(rows.TCKT_ID);
				
				//전화번호, 통화구분, 처리유형, 상담결과
				$("#prc_Crct").val(rows.CRCT);					//정확
				$("#prc_Incrct").val(rows.INCRCT);				//부정확
				$("#prc_Wndgd").val(rows.WNDGD);				//오안내				
				$("#prc_Act_Type_Nm").html(rows.ACT_TYPE_NM);	//처리유형
				$("#prc_Act_St_Nm").html(rows.ACT_ST_NM);		//상담결과

				(rows.VLTN_GB_CD != null && rows.VLTN_GB_CD != "100000") ? $("#prc_Vltn_Gb_Cd").val(rows.VLTN_GB_CD) : $("#prc_Vltn_Gb_Cd").val("all");		//BestCall
				
				//상담이력내용 (상담유형, 문의내용, 답변내용)
				$("#prc_Intv_Nm").html(rows.INTV_NM);
				$("#prc_Qst_Cont").val(rows.QST_CONT);
				$("#prc_Act_Cont").val(rows.ACT_CONT);
				
				if(rows.CRCT == "1" || rows.INCRCT == "1" || rows.WNDGD == "1")
					$("#btnPrcDlt").show();
				else
					$("#btnPrcDlt").hide();

			},
		   	gridComplete : function()
		   	{
		   		var ids = $(this).getDataIDs();
		   		
		   		// 녹취 버튼 표시
		   		for(var i = 0; i < ids.length; i++)
		   		{
		   			var rowId = ids[i];
		   			var row = $(this).getRowData(rowId);
		   			
		   			if(row.CALL_ID != null && row.CALL_ID != "")
		   			{
		   				//청취 키  (녹취날짜 + con_id + agentId)
						var rec_param=row.RCV_DT+"|"+row.CALL_ID+"|"+row.RCV_USR_ID;
						
			   			var recBtn = "<button class='button' style='width: 50px;' id='prc_" + row.TCKT_ID + "' " + "name='" + rec_param + "'>청취</button>";
			   			$(this).jqGrid("setRowData", rowId, { REC_BUTTON : recBtn });
			   			$("#prc_" + row.TCKT_ID).bind("click", fnReclisten);
			   				
		   			}
		   		}
		   		
		   		//정확 합계
	            var crct_Sum = $("#tblPrcList").jqGrid('getCol','CRCT', false, 'sum'); 
	            $('#tblPrcList').jqGrid('footerData', 'set', { RCV_DT_FORMAT:'합계', CRCT:crct_Sum }); 
	            //부정확 합계
	            var incrct_Sum = $("#tblPrcList").jqGrid('getCol','INCRCT', false, 'sum'); 
	            $('#tblPrcList').jqGrid('footerData', 'set', { RCV_DT_FORMAT:'합계', INCRCT:incrct_Sum }); 
	            //오안내 합계
	            var wndgd_Sum = $("#tblPrcList").jqGrid('getCol','WNDGD', false, 'sum'); 
	            $('#tblPrcList').jqGrid('footerData', 'set', { RCV_DT_FORMAT:'합계', WNDGD:wndgd_Sum }); 
	            
		   	},			
		   	error : function(data, status, err) 
		   	{
		   		networkErrorHandler(data, status, err);
		   	},
			onPaging : function(pgButton)
			{
				
			}
		}).jqGrid("navGrid", "#pgtblPrcList", {edit : false, add : false, del : false, search : false});

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

//상담이력 상세 초기화
function initTab()
{
	//전화번호, 통화구분, 처리유형, 처리결과
	$("#cntct_Infm_Format").html("");
	$("#call_Gb_Nm").html("");
	$("#act_Type_Nm").html("");
	$("#act_St_Nm").html("");
	
	//상담유형, 문의내용, 답변내용
	$("#intv_Nm").html("");
	$("#qst_Cont").val("");
	$("#act_Cont").val("");	

	$("#btnCustmUdt").hide();
	$("#btnCustmDlt").hide();
	$("#btnCustmMod").show();
	
	//$("#btnPrint").hide();
	
	//마감버튼
	//initMagamStatus("N");
}

//1차처리율 상세 초기화
function initTab_Prc()
{
	$("#prc_Crct").val("all");			//정확
	$("#prc_Incrct").val("all");		//부정확
	$("#prc_Wndgd").val("all");			//오안내
	$("#prc_Vltn_Gb_Cd").val("all");		//BestCall
		
	$("#prc_Act_Type_Nm").html("");		//처리유형
	$("#prc_Act_St_Nm").html("");		//상담결과
	$("#prc_Intv_Nm").html("");			//상담유형
	$("#prc_Qst_Cont").val("");			//문의내용
	$("#prc_Act_Cont").val("");			//답변내용

	//$("#btnPrcMod").hide();
	//$("#btnPrcUdt").hide();
	//$("#btnPrcDlt").show();
	
	//$("#btnPrcPrint").hide();

}

//평가지 조회 및 DIV 화면에 뿌려주기
function initSuvyQa(parnt_Suvy_Id)
{
	var rowId = "";			//항목 ID
	var rowLv="";			//항목 레벨
	var rowSeq="";			//항목별 순번
	var rowAnsCd = "";		//항목 답변유형코드
	var rowValNm = "";		//항목 점수명
	var rowValCd = "";		//항목 점수
	
	var arrSpanCntLv1=new Array();
	var arrSpanCntLv2=new Array();
	var arrSpanCntLv3=new Array();
	var arrTrId=new Array();
	var arrText=new Array();
 
	//질의 가져오기
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/edu/eduSuvyAnswer.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNDQuc2VsZWN0U3V2eUFuc3dlcg==", {
			"parnt_Suvy_Id" : parnt_Suvy_Id
		}),
		success : function(data) {		
		     
		    var trNumLv1=0;
		    var trNumLv2=0;
		    var trNumLv3=0;
		    var rowNumLv1=0;
		    var rowNumLv2=0;
		    var rowNumLv3=0;
		    var totNum=0;
		    var rowType="";
		    
		     $.each(data, function(qusetionSeq, question) {
		    	rowLv = question.LV;
		    	rowSeq = question.SEQ;
		    	rowId = question.ID;
		    	rowAnsCd = question.ANS_TYPE_CD;
		    	rowValNm = question.CD_NM;
		    	rowValCd = question.CD;
		    	
		    	// span tr
		    	 if(Number(rowLv)==1){
		    		 arrSpanCntLv1[trNumLv1]=rowNumLv1;
		    		 console.log("trNumLv1:"+trNumLv1+" SpnCnt1:"+arrSpanCntLv1[trNumLv1])
		    		 trNumLv1++;
		    		 rowNumLv1=0;
		    		 arrSpanCntLv1[trNumLv1]=0; //초기화
		    	 }
		    	 else if(Number(rowLv)==2){
		    		 arrSpanCntLv2[trNumLv2]=rowNumLv2;
		    		 console.log("trNumLv2:"+trNumLv2+" SpnCnt2:"+arrSpanCntLv2[trNumLv2])
		    		 trNumLv2++;
		    		 rowNumLv2=0;
		    		 arrSpanCntLv2[trNumLv2]=0; //초기화
		    	 }
		    	 else if(Number(rowLv)==3){
		    		 arrSpanCntLv3[trNumLv3]=rowNumLv3;
		    		 console.log("trNumLv3:"+trNumLv3+" SpnCnt3:"+arrSpanCntLv3[trNumLv3])
		    		 trNumLv3++;
		    		 rowNumLv3=0;
		    		 arrSpanCntLv3[trNumLv3]=0; //초기화
		    	 }
		    	 else if(Number(rowLv)==4){
		    		//span count
		    		 rowNumLv1++;
		    		 rowNumLv2++;
		    		 rowNumLv3++;
		    	 }
		    	
		    	 if(question.QST_TYPE_CD=="1002"){
		    		 rowType="E"; // text box
		    	 }
		    	 else if(question.QST_TYPE_CD=="1001"){
		    		 rowType="M"; // 
		    	 }else{
		    		 rowType="M"; //
		    	 }
		    	 
		    	 if (data.length -1 == qusetionSeq) {
		    		 arrSpanCntLv1[trNumLv1]=rowNumLv1;
		    		 arrSpanCntLv2[trNumLv2]=rowNumLv2;
		    		 arrSpanCntLv3[trNumLv3]=rowNumLv3;
		    	 }
		    	 
		    	 //console.log("data length-1 : " + data.length -1 + " questionSeq : " + qusetionSeq)
		    	 
		    	 arrTrId[totNum]="tr_"+trNumLv1+"_"+trNumLv2+"_"+trNumLv3+"_"+rowLv+"_"+rowSeq+"_"+totNum+"_"+rowType+"_"+rowId+"_"+rowAnsCd+"_"+rowValNm+"_"+rowValCd;
		    	 arrText[totNum]=question.TEXT;
		    	 //g_ans_id[totNum] = rowId;
		    	 console.log(arrTrId[totNum]+ " totNum:"+totNum);

     	 		    	 
//		    	  console.log("trNumLv1:"+trNumLv1+" rowLv:"+rowLv+" rowSeq:"+rowSeq+" rowNum:"+rowNum+" totNum:"+totNum+" Type:"+rowType+" SpnCnt:"+arrSpanCntLv1[trNumLv1]); //trNum 아직 초기화
		    	 totNum++;
		    });
			
		  	$("#suvyQa").empty();   
		     
		  	 var content = "<table class='profile_tbl'>"+
							"<tr>"+
								"<th class='line_rt' style = 'width : 10%'>대분류</th>"+
								"<th class='line_rt' style = 'width : 10%'>중분류</th>"+
								"<th class='line_rt' style = 'width : 12%'>소분류</th>"+
								"<th class='line_rt' style = 'width : 45%'>세분류</th>"+
								"<th class='line_rt' style = 'width : 5%'>점수</th>"+
								"<th class='line_rt' style = 'width : 5%'>평가</th>"+
							"</tr>";
		  	
		  	var lineType = 0;
		  	var lineCss = "";
		  	
			for(var i = 0; i < totNum; i++){
				var arrTr = arrTrId[i].split('_');
				var trNumLv1 = arrTr[1];
				var trNumLv2 = arrTr[2];
				var trNumLv3 = arrTr[3];
				var rowLv = arrTr[4];
				var rowSeq = arrTr[5];
				var nRow = arrTr[6];
				var type = arrTr[7];
				var objId = arrTr[8];
				var objAnsCd = arrTr[9];
				var objValNm = arrTr[10];
				var objValCd = arrTr[11];
				
				var rowSpanLv1=arrSpanCntLv1[arrTr[1]];
				var rowSpanLv2=arrSpanCntLv2[arrTr[2]];
				var rowSpanLv3=arrSpanCntLv3[arrTr[3]];

			
				console.log("trNumLv1:"+arrTr[1]+ " trNumLv2:"+arrTr[2]+ " trNumLv3:"+arrTr[3]+ " rowLv:"+arrTr[4]+ " rowSeq:"+arrTr[5]+ " row:"+arrTr[6]+ " rowType:"+arrTr[7]+ " spCnt1:"+arrSpanCntLv1[arrTr[1]]+ " spCnt2:"+arrSpanCntLv1[arrTr[2]]+ " spCnt3:"+arrSpanCntLv1[arrTr[3]]+ " suvyID:"+arrTr[8])
				
				if(rowLv==1){
					content += "<tr id='tr_"+trNumLv1+"_"+rowLv+"_"+rowSeq+"_"+nRow+"'>";
					lineType = 0;
				}
				
				if(Number(rowLv)==1 && Number(rowSpanLv1)>0){
					 content += "<th class='line_rt' id='td_"+trNumLv1+"_"+rowLv+"_"+rowSeq+"_"+nRow+"_"+type+"' rowspan='"+rowSpanLv1+"'>"+arrText[i]+"</th>";
					 lineType = 0;
				}
				
				if(Number(rowLv)==2 && Number(rowSpanLv2)>0){
					 content += "<th class='line_rt' id='td_"+trNumLv2+"_"+rowLv+"_"+rowSeq+"_"+nRow+"_"+type+"' rowspan='"+rowSpanLv2+"'>"+arrText[i]+"</th>";
					 lineType = 0;
				}
				
				if(Number(rowLv)==3 && Number(rowSpanLv3)>0){
					 content += "<th class='line_rt' id='td_"+trNumLv3+"_"+rowLv+"_"+rowSeq+"_"+nRow+"_"+type+"' rowspan='"+rowSpanLv3+"'>"+arrText[i]+"</th>";
					 lineType = 0;
				}
				
				if(Number(rowLv)==4){	
					 lineType++;
					 
					 //alert("rowSpanLv3 : " + rowSpanLv3);
					 //alert("lineType : " + lineType);
					 
					 if(lineType == rowSpanLv3) 
						 lineCss = "line_b";
					 else
						 lineCss = "line_b_dot";
					
					 content += "<td class='" + lineCss + "' id='qst_" + objId + "'>"+arrText[i]+"</td>"+
				 				 "<td class='" + lineCss + "' id='sel_" + objId + "' style='text-align: right;'>" + objValNm + "</td>"+
				 				 "<td class='" + lineCss + "'><input type='checkbox' class='checkbox' id='ans_" + objId + "' name='ans_" + trNumLv1 + trNumLv2 + trNumLv3 + "' onClick='chkScrCalculate(this)' value='" + objValCd + "' ></td>"+
					 			 "</tr>";
				}	
				
				// 주관식
				if(type!="M"){
					 content += "<th class='line_rt'>"+arrText[i]+"</th>" +
						 		"<td class='line_b' colspan='3'>"+
						 		"<textarea rows='10' cols='110' id='ans_" + objId + "' maxlength='1800'></textarea>"+
						 		"</td>";
				}
						
			}
			
			$("#suvyQa").append(content);
						 
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});	

}

//1차처리율 버튼 이벤트
//1차처리율 저장 버튼 이벤트
function btnPrcMod_clickEvent()
{
	if ($("#mntId").val() == "" || $("#mntUsrId").val() == "" || $("#mntTcktId").val() == "") {
		alert("평가대상이력을 선택해주세요.");
		return;
	}
		
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/qa/savePrcObjct.do",
		data : "pJson=" + getJsonStrSavePrcObjct("S", $("#mntId").val(), $("#mntUsrId").val(), $("#mntTcktId").val()),
		success : function(data)
		{
			initMonitoring();
			initTab_Prc();
			alert("1차처리율평가가 저장되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}
/*
//1차처리율 수정 버튼 이벤트
function btnPrcUdt_clickEvent()
{
	
}
*/
//1차처리율 삭제 버튼 이벤트
function btnPrcDlt_clickEvent()
{
	if ($("#mntId").val() == "" || $("#mntUsrId").val() == "" || $("#mntTcktId").val() == "") {
		alert("평가대상이력을 선택해주세요.");
		return;
	}
		
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/qa/savePrcObjct.do",
		data : "pJson=" + getJsonStrSavePrcObjct("D", $("#mntId").val(), $("#mntUsrId").val(), $("#mntTcktId").val()),
		success : function(data)
		{
			initMonitoring();
			initTab_Prc();
			alert("1차처리율평가가 삭제되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});

}

//1차처리율 출력 버튼 이벤트
function btnPrcPrint_clickEvent()
{
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/qaMonitorSubUsr.jsp?vltnId="+$("#mntId").val()+"&vltnUsrId="+$("#mntUsrId").val());
}

/*
//1차처리율 평가이력생성 버튼 등록
function btnPrcRecInsert_Event()
{
	
}
*/
//1차처리율 평가이력삭제 버튼 등록
function btnPrcRecDelete_Event()
{
	var rowNum = $("#tblPrcList").getGridParam("rowNum");
	var currentPageNum = $("#tblPrcList").getGridParam("page");
	var gRowLength = $("#tblPrcList").getGridParam("reccount");
	
	if ($("#mntId").val() == "" || $("#mntUsrId").val() == "") {	
		alert("평가대상자를 선택해주세요.");
		return;
	}

	var trgt_Cnt = 0;
		
	for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
	{	
		var currentRowCnt = $("#tblPrcList").getRowData(i);
		if(jQuery.isEmptyObject(currentRowCnt))
			continue;
				
		if(currentRowCnt.TRGT_YN == "1")
			trgt_Cnt = trgt_Cnt + 1;
	}
	
	if (trgt_Cnt == 0) {
		alert("평가이력을 선택해주세요.");
		return;		
	}
	
	
	if(confirm("평가이력을 삭제 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#tblPrcList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var TRGT_YN = "N";
			
			var sVltn_Id = currentRow.VLTN_ID;
			var sVltn_Usr_Id = currentRow.VLTN_USR_ID;
			var sTck_Id = currentRow.TCKT_ID;
			
			if(currentRow.TRGT_YN == "1")
			{
				TRGT_YN = "Y";
				
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/qa/prcCounselListDelete.do",
					data : "pJson=" + getJsonStrPrcCounselListDelete(sVltn_Id, sVltn_Usr_Id,  sTck_Id),
					success : function(data)
					{
						initMonitoring();

					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
		}
	}	
}

//상담품질 탭 버튼
function divQaMonitorBtn_clickEvent()
{
	$("#divQaMonitorBtn").attr("class", "left_tab_img");
	$("#divPrcssRatioBtn").attr("class", "left_tab_img_gray");
	
	$("#divQaMonitor").css("display", "block");
	$("#divPrcssRatio").css("display", "none");
	
	$("#mntTabType").val("rec");		//상담품질 탭
	
	initData();
	initTab();
}

//1차처리율 탭 버튼
function divPrcssRatioBtn_clickEvent()
{
	$("#divQaMonitorBtn").attr("class", "left_tab_img_gray");
	$("#divPrcssRatioBtn").attr("class", "left_tab_img");
	
	$("#divQaMonitor").css("display", "none");
	$("#divPrcssRatio").css("display", "block");
	
	$("#mntTabType").val("prc");		//1차처리율 탭
	
	initData_Prc();
	initTab_Prc();

}

// 초기 이벤트 셋팅
function initEvent()
{
	// 모니터링평가 점수 저장 버튼
	$("#btnCustmMod, #btnCustmUdt").bind("click", saveMntScore);
	// 모니터링평가 점수 수정 버튼
	//$("#btnCustmUdt").bind("click", saveMntScore);
	// 모니터링평가 점수 삭제 버튼
	$("#btnCustmDlt").bind("click", deleteMntScore);
	// 모니터링평가 출력 버튼
	$("#btnPrint").bind("click", btnPrint_clickEvent);

	// 평가이력생성,1차처리율 평가이력생성 버튼 등록
	$("#btnRecInsert, #btnPrcRecInsert").bind("click", btnRecInsert_Event);
	// 평가이력삭제 버튼 등록
	$("#btnRecDelete").bind("click", btnRecDelete_Event);
	
	
	//모니터링평가 마감 버튼
	/*$("#btnMagam").bind("click", btnMagam_clickEvent);*/
	
	
	//상담품질 탭 버튼
	$("#divQaMonitorBtn").bind("click", divQaMonitorBtn_clickEvent);
	//1차처리율 탭 버튼
	$("#divPrcssRatioBtn").bind("click", divPrcssRatioBtn_clickEvent);
	
	//1차처리율 버튼 이벤트
	$("#btnPrcMod").bind("click", btnPrcMod_clickEvent);
	//$("#btnPrcUdt").bind("click", btnPrcUdt_clickEvent);
	$("#btnPrcDlt").bind("click", btnPrcDlt_clickEvent);
	$("#btnPrcPrint").bind("click", btnPrcPrint_clickEvent);	
	
	//1차처리율 평가이력생성 버튼 등록
	//$("#btnPrcRecInsert").bind("click", btnPrcRecInsert_Event);
	//1차처리율 평가이력삭제 버튼 등록
	$("#btnPrcRecDelete").bind("click", btnPrcRecDelete_Event);	
	
	$("#prc_Crct").bind("change", function()
	{
		if ($("#prc_Crct").val() == "1")
			$("#prc_Incrct").val("0");
	});
	
	$("#prc_Incrct").bind("change", function()
	{
		if ($("#prc_Incrct").val() == "1")
			$("#prc_Crct").val("0");
	});
	
}

// 초기 데이터 셋팅
function initData()
{	
	//평가지 조회 및 DIV 화면에 뿌려주기
	initSuvyQa(g_parnt_Suvy_Id);

	g_Chkbox_Cnt = $(".checkbox").length; //체크박스 전체갯수
	
	//상담품질에서 사용하는 공통변수
	$("#mntId").val(g_mntId);			//평가목록ID
	$("#mntTargetId").val("");			//상담사평가ID
	$("#mntUsrId").val(g_RecUsrId);		//평가대상상담사
	$("#mntTcktId").val("");	
	//$("#mntSeq").val("");	

	//상담품질 버튼 설정
	$("#btnCustmUdt").hide();
	$("#btnCustmDlt").hide();
	//$("#btnPrint").hide();

	//평가대상 상담이력 목록
	initRecList(g_mntId, g_RecUsrId); 
	
	//divQaMonitorBtn_clickEvent();
	
}

//1차처리율 초기 데이터 셋팅
function initData_Prc()
{
	//1차처리율에서 사용하는 공통변수
	$("#mntId").val(g_mntId);			//평가목록ID
	$("#mntTargetId").val("");			//상담사평가ID
	$("#mntUsrId").val(g_RecUsrId);		//평가대상상담사
	$("#mntTcktId").val("");	
	//$("#mntSeq").val("");	

	setObjSelectBoxWithCode("prc_Vltn_Gb_Cd", "미선택", "", "GCHILD", "90011", "");	//BESTCALL
	
	//1차처리율 버튼 설정
	//$("#btnPrcMod").hide();
	$("#btnPrcDlt").hide();
	//$("#btnPrint").hide();

	//1차처리율
	initPrcRtoList(g_mntId, g_RecUsrId);
}

//조회 초기화
function initControl() 
{
	//상담사권한
	if (g_GrdType == "AG") {
		//평가이력생성, 삭제버튼
		btnSetting("btnRecInsert", false);	
		btnSetting("btnRecDelete", false);	
		btnSetting("btnPrcRecInsert", false);	
		btnSetting("btnPrcRecDelete", false);	
		
		//상담품질 저장, 삭제, 출력버튼
		btnSetting("btnCustmMod", false);	
		btnSetting("btnCustmUdt", false);	
		btnSetting("btnCustmDlt", false);	
		btnSetting("btnPrint", false);	
		
		//1차처리율 저장, 삭제, 출력버튼
		btnSetting("btnPrcMod", false);	
		btnSetting("btnPrcDlt", false);	
		btnSetting("btnPrcPrint", false);	
	} else {
		//관리자권한
		//상담품질 마감일 경우
		if (g_MagamStat == "MG") {
			//평가이력생성, 삭제버튼
			btnSetting("btnRecInsert", false);	
			btnSetting("btnRecDelete", false);	
			btnSetting("btnPrcRecInsert", false);	
			btnSetting("btnPrcRecDelete", false);	
			
			//상담품질 저장, 삭제, 출력버튼
			btnSetting("btnCustmMod", false);	
			btnSetting("btnCustmUdt", false);	
			btnSetting("btnCustmDlt", false);	
			//btnSetting("btnPrint", true);	
			
			//1차처리율 저장, 삭제, 출력버튼
			btnSetting("btnPrcMod", false);	
			btnSetting("btnPrcDlt", false);	
			//btnSetting("btnPrcPrint", true);				
		} else {
			//평가이력생성, 삭제버튼
			btnSetting("btnRecInsert", true);	
			btnSetting("btnRecDelete", true);	
			btnSetting("btnPrcRecInsert", true);	
			btnSetting("btnPrcRecDelete", true);
			
			//상담품질 저장, 삭제, 출력버튼
			btnSetting("btnCustmMod", true);	
			btnSetting("btnCustmUdt", true);	
			btnSetting("btnCustmDlt", true);	
			//btnSetting("btnPrint", true);	
			
			//1차처리율 저장, 삭제, 출력버튼
			btnSetting("btnPrcMod", true);	
			btnSetting("btnPrcDlt", true);	
			//btnSetting("btnPrcPrint", true);				
		}
		
	}
		
}
		
$(document).ready(function()
{	
	$("#mntTabType").val("rec");		//상담품질 탭
	
	//상담품질 초기화
	initEvent();
	initData();
	initTab();
	initControl();
	
	//1차 처리율 초기화
	initData_Prc();
	initTab_Prc();
	

});