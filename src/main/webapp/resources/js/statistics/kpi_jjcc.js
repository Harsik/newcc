/*
 * 성과지표, 운영실적
 * Table : st025 (성과지표통계)
 */

// 조회 조건 및 조회 값
var g_usrId = window.sessionStorage.getItem("USR_ID");
var gKpiId = "";
var inputFile = [];
var fileBox_idx = 0;
var fileForm = "";
var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

// 자동합계 계산
function calculate(count) {
	var vGoal = 0;				//목표
	var vThsmon_acmslt = 0;		//당월 실적
	var vLsmth_acmslt = 0;		//전월 실적
	
	var vThsmon_achiv = 0;		//당월 달성율
	var vLsmth_achiv = 0;		//전월 달성율
	var vIrds = 0;				//증감

	switch (count) {
	case 1: //고객응대율
		vGoal = parseFloat($("#cust_rspn_goal").html());
		vThsmon_acmslt = parseFloat($("#cust_rspn_rate").val());
		vLsmth_acmslt = parseFloat($("#cust_rspn_lsmth_acmslt").html());

		vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));
		vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));
		
		$("#cust_rspn_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#cust_rspn_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#cust_rspn_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");
		
		break;

	case 2: //콜센터 생산성
		vGoal = parseFloat($("#prdt_goal").html());
		vThsmon_acmslt = parseFloat($("#prdt").val());
		vLsmth_acmslt = parseFloat($("#prdt_lsmth_acmslt").html());
		
		vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));
		vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));
		
		$("#prdt_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#prdt_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#prdt_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");		
		
		break;
		
	case 3: //FCR
		vGoal = parseFloat($("#fcr_goal").html());
		vThsmon_acmslt = parseFloat($("#fcr").val());
		vLsmth_acmslt = parseFloat($("#fcr_lsmth_acmslt").html());
		
		vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));
		vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));
		
		$("#fcr_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#fcr_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#fcr_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");		

		break;
		
	case 4: //상담사 만족도
		vGoal = parseFloat($("#agt_stsfdg_goal").html());
		vThsmon_acmslt = parseFloat($("#agt_stsfdg").val());
		vLsmth_acmslt = parseFloat($("#agt_stsfdg_lsmth_acmslt").html());
		
		vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));
		vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));
		
		$("#agt_stsfdg_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#agt_stsfdg_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#agt_stsfdg_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");		

		break;
		
	case 5: //20초내 상담개시율
		vGoal = parseFloat($("#sec20_cnsl_goal").html());
		vThsmon_acmslt = parseFloat($("#sec20_cnsl_rate").val());
		vLsmth_acmslt = parseFloat($("#sec20_cnsl_lsmth_acmslt").html());
		
		vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));
		vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));
		
		$("#sec20_cnsl_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#sec20_cnsl_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#sec20_cnsl_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");		

		break;
		
	case 6: //상담사 이직인원
		vGoal = parseFloat($("#agt_ret_goal").html());						//목표
		vThsmon_acmslt = parseFloat($("#agt_ret_prsn").val());				//당월 실적
		vLsmth_acmslt = parseFloat($("#agt_ret_lsmth_acmslt").html());		//전월 실적
		
		//vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));		//당월 달성율
		//vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));		//전월 달성율
		vThsmon_achiv = (Math.round((vThsmon_acmslt / 35) * 100));			//당월 달성율 (정원 35명)
		vLsmth_achiv = (Math.round((vLsmth_acmslt / 35) * 100));			//전월 달성율 (정원 35명)
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));	//증감 (당월 실적 - 전월 실적) 
		
		$("#agt_ret_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#agt_ret_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#agt_ret_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");		

		break;
		
	case 7: //모니터링 평가
		vGoal = parseFloat($("#vltn_scr_goal").html());
		vThsmon_acmslt = parseFloat($("#vltn_scr").val());
		vLsmth_acmslt = parseFloat($("#vltn_scr_lsmth_acmslt").html());
		
		vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));
		vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));
		
		$("#vltn_scr_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#vltn_scr_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#vltn_scr_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");		

		break;
		
	case 8: //고객만족도
		vGoal = parseFloat($("#cust_stsfdg_goal").html());
		vThsmon_acmslt = parseFloat($("cust_stsfdg").val());
		vLsmth_acmslt = parseFloat($("#cust_stsfdg_lsmth_acmslt").html());
		
		vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));
		vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));
		
		$("#cust_stsfdg_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#cust_stsfdg_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#cust_stsfdg_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");		
		
		break;
		
	case 9: //상담사 업무지식평가
		vGoal = parseFloat($("#task_knwg_goal").html());
		vThsmon_acmslt = parseFloat($("#task_knwg_scr").val());
		vLsmth_acmslt = parseFloat($("#task_knwg_lsmth_acmslt").html());
		
		vThsmon_achiv = (Math.round((vThsmon_acmslt / vGoal) * 100));
		vLsmth_achiv = (Math.round((vLsmth_acmslt / vGoal) * 100));
		vIrds = parseFloat((vThsmon_acmslt - vLsmth_acmslt).toFixed(1));
		
		$("#task_knwg_thsmon_achiv").html(!isNaN(vThsmon_achiv) ? vThsmon_achiv + "%" : "");
		$("#task_knwg_lsmth_achiv").html(!isNaN(vLsmth_achiv) ? vLsmth_achiv + "%" : "");
		$("#task_knwg_irds").html(!isNaN(vIrds) ? (vIrds != 0 ? (vIrds > 0 ? vIrds : "("+Math.abs(vIrds)+")") : "-") : "");		

		break;
	
	default:
		break;
	}
	
	
}

//파라미터 셋팅 getJsonStrKpiDataListExcel
/*
 * [colHeader 파라메터 설정]
 * 
 * "상담품질(40점), R, 3, 7" : 헤더타이틀, Row 병합, 시작위치, 병합 Cols 갯수
 * "USR_ID, C, 0, 3" : 셀 데이터 컬럼명, Col 병합, 시작위치, 병합 Rows 갯수
 */
function getJsonStrKpiDataListExcel()
{
	var rptTitle = "";
	
	
	rptTitle = $("#optYear1").val() + "년" + $("#months").val()  + "월_성과지표";
	 
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMjUuc2VsZWN0S3BpRXhjZWw=",
		"map" : {
			"key" : "value",
			"kpi_id" : $("#kpiId").val(),	
			"yyyymm" : $("#optYear1").val() + $("#months").val(),
			"title" : rptTitle,
			"colWidth" : [15, 20, 15, 15, 15, 15, 15, 15],
			"colName" : ["HDRNM", "COLNM", "GOAL_SCR", "THDATA", "THACHIV", "BFDATA", "BFACHIV", "IRDS"],
	        "colHeader1" : ["당월, R, 3, 2", "전월, R, 5, 2"],		           
			"colHeader3" : ["지표명, C, 0, 2", "지표세부명, C, 0, 2", "목표, C, 0, 2", "실적, C, 1, 1", "달성율, C, 1, 1", "실적, C, 1, 1", "달성율, C, 1, 1", "증감, C, 0, 2"],
			"colAlign" : ["center", "left", "center", "right", "right", "right", "right", "center"],
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/*
//oz 버튼 클릭시 이벤트
function btnOz_clickEvent() {
	var year = $("#optYear1").val();
	var month = $("#months").val();
	window.open("http://172.16.2.101:8090/oz70/ozhviewer/kpi.jsp?year="+year+"&month="+month+"&usr_nm="+encodeURI(encodeURIComponent(window.sessionStorage.getItem("USR_NM"))));
}
*/
// 성과관리 조회버튼 클릭 이벤트
function btnListSrch_clickEvent()
{
	$("#tblKpiList").jqGrid("setGridParam", { postData : { pJson : getJsonStrKpiList() }, page : 1, sortname : "TITLE", sortorder : "asc" });
	$("#tblKpiList").trigger("reloadGrid");
}

// 성과관리 초기화 버튼 클릭 이벤트
function btnCustmInit_clickEvent()
{
	initTab("N");		//N:New
}

// 성과관리목록 초기화 버튼 클릭 이벤트
function btnKpiListInit_clickEvent()
{
	initTab("D");	//D:Detail
}

// 엑셀저장버튼 클릭이벤트 등록
function btnExcel_clickEvent()
{
	if ($("#optYear1").val() == "" || $("#months").val() == "" || $("#months").val() == null)
	{
		alert("평가기간을 선택해 주세요");
		return;
	}
	
	excelDownLoad(getContextPath() + "/excel/mprows/mpRowsExcelDown.do", getJsonStrKpiDataListExcel());
    
}

// 성과관리조회 초기화 
// 조회초기화 (N:New), 상세초기화(D:Detail), 저장초기화(S:Save)
function initTab(btnType)
{
	if (btnType != "S")
		$("#tblKpiList").clearGridData();
	
	if(btnType == "N") {
		$("#optYear").val(currentYear);
		$("#searchMonth").val("");
	}
	
	$("#optYear1").val(currentYear);
	$("#months").val(currentMonth);
	
	$("#title").val("");
	$("#note").val("");
	$("#kpiId").val("");
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#kpiFile").empty().append(fileForm);
	
	btnListSrch_clickEvent();
	
	$("#btnInsert").show();
	$("#btnUpdate").hide();
	$("#btnDelete").hide();
	//$("#btnOz").hide();
	
	resetTotalScore();
}

// 성과지표 점수 초기화
function resetTotalScore() {

	//고객응대율
	$("#cust_rspn_rate").val("");
	$("#cust_rspn_thsmon_achiv").html("");
	$("#cust_rspn_lsmth_acmslt").html("");
	$("#cust_rspn_lsmth_achiv").html("");
	$("#cust_rspn_irds").html("");
	
	//콜센터 생산성
	$("#prdt").val("");
	$("#prdt_thsmon_achiv").html("");
	$("#prdt_lsmth_acmslt").html("");
	$("#prdt_lsmth_achiv").html("");
	$("#prdt_irds").html("");
	
	//FCR(1차 처리율)
	$("#fcr").val("");
	$("#fcr_thsmon_achiv").html("");
	$("#fcr_lsmth_acmslt").html("");
	$("#fcr_lsmth_achiv").html("");
	$("#fcr_irds").html("");
	
	//상담사 만족도
	$("#agt_stsfdg").val("");
	$("#agt_stsfdg_thsmon_achiv").html("");
	$("#agt_stsfdg_lsmth_acmslt").html("");
	$("#agt_stsfdg_lsmth_achiv").html("");
	$("#agt_stsfdg_irds").html("");
	
	//20초내 상담개시율
	$("#sec20_cnsl_rate").val("");
	$("#sec20_cnsl_thsmon_achiv").html("");
	$("#sec20_cnsl_lsmth_acmslt").html("");
	$("#sec20_cnsl_lsmth_achiv").html("");
	$("#sec20_cnsl_irds").html("");
	
	//상담사 이직인원
	$("#agt_ret_prsn").val("");
	$("#agt_ret_thsmon_achiv").html("");
	$("#agt_ret_lsmth_acmslt").html("");
	$("#agt_ret_lsmth_achiv").html("");
	$("#agt_ret_irds").html("");
	
	//모니터링 평가
	$("#vltn_scr").val("");
	$("#vltn_scr_thsmon_achiv").html("");
	$("#vltn_scr_lsmth_acmslt").html("");
	$("#vltn_scr_lsmth_achiv").html("");
	$("#vltn_scr_irds").html("");
	
	//고객만족도
	$("#cust_stsfdg").val("");
	$("#cust_stsfdg_thsmon_achiv").html("");
	$("#cust_stsfdg_lsmth_acmslt").html("");
	$("#cust_stsfdg_lsmth_achiv").html("");
	$("#cust_stsfdg_irds").html("");
	
	//상담사 업무지식평가
	$("#task_knwg_scr").val("");	
	$("#task_knwg_thsmon_achiv").html("");
	$("#task_knwg_lsmth_acmslt").html("");
	$("#task_knwg_lsmth_achiv").html("");
	$("#task_knwg_irds").html("");
	
	//$("#btnOz").hide();
}

// 첨부파일박스 내용삭제
function rmFileBoxEvent() {
	inputFile[1] = inputFile[0].clone(true);
	$("#kpi").replaceWith(inputFile[1]);
}

// 첨부파일 박스추가
function addFileBox() {
	if (fileBox_idx >= 4) {
		alert("첨부파일은 최대 5개까지 가능합니다.");
	} else {
		var html = $("#fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#kpiFile").append(html);
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
						$("#kpi").prop("disabled", false);
						$("#kpiRmFilebox").prop("disabled", false);
					}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 첨부파일 보기
function showAttachFiles(kpiId) {
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/kpiFileList.do",
		data : "pJson=" + getJsonFileList(kpiId),
		success : function(data) {
			for(var i in data) {
				var url = getContextPath() 
				+ "/file/kpiFileDown.do?pJson=" 
				+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
				
				var tr = "<tr>";
				tr += "<td><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
				tr += "<span><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
				tr += "</tr>";
				
				fileBox_idx++;
				$("#kpiFile").prepend(tr);
			}
			if(fileBox_idx >= 5) {
				$("#kpi").prop("disabled", true);
				$("#kpiRmFilebox").prop("disabled", true);
			}
		},
		error : function(data, status, err) {
			alert("" + err);
		}
	});
}

//파일 체크
function validatorRe(){
	var rMsg = "";
	
	//파일 업로드 용량 체크
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#writeForm input[name=KPI]");
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

// 성과관리 목록 저장
function saveKpiList()
{
	var rMsg = validatorRe();
	
	if(rMsg != ""){
		alert(rMsg);
		return;
	}
	
	if ($("#cust_rspn_rate").val() == "") {
		alert("성과지표 점수를 등록해주세요.");
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/getKpiId.do",
		data : "pJson=" + getKpiId(),
		success : function(data)
		{
			gKpiId = data.KPI_ID;
			
			gAppendHidden("writeForm", "pJson", getJsonStrKpiListSave(gKpiId));
			gSubmitPost("writeForm", true);
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/kpiListSave.do",
				data : "pJson=" + getJsonStrKpiList(),
				success : function(data)
				{
					initTab("S");
					
					alert("성과관리가 등록되었습니다.");
				},
				error : function(data, status, err) 
				{
					alert("" +err);
				}
			});
		},
		error : function(data, status, err) 
		{
			alert("" +err);
		}
	});
	
}

// 성과관리 목록 수정
function updateKpiList()
{
	var rMsg = validatorRe();
	
	if(rMsg != ""){
		alert(rMsg);
		return;
	}
	
	if(!confirm("수정 하시겠습니까?"))
		return;
	
	gAppendHidden("writeForm", "pJson", getJsonStrUpdateKpiList());
	gSubmitPost("writeForm", true);
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/kpiListupdate.do",
		data : "pJson=" + getJsonStrKpiList(),
		success : function(data)
		{
			initTab("S");
			
			alert("수정되었습니다.");
			
		},
		error : function(data, status, err) 
		{
			alert("" +err);
		}
	});
		
}

// 성과관리 목록 삭제
function deleteKpiList()
{
	if ($("#kpiId").val() == "") {
		alert("목록을 선택해주세요.");
		return;
	} else {
		if(confirm("선택된 목록을 삭제하시겠습니까?(첨부파일이 있을 경우 등록된 첨부파일도 함께 삭제됩니다.)")) {
			gAppendHidden("writeForm", "pJson", getJsonStrDeleteKpiList());
			gSubmitPost("writeForm", true);
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/deleteKpiList.do",
				data : "pJson=" + getJsonStrKpiList(),
				success : function(data)
				{
					initTab("S");
					
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

// 성과관리 목록
function getJsonStrKpiList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMjUua3BpTGlzdA==",
		"map" : {
			"key" : "value",
			"searchYear" : $("#optYear").val(),
			"searchMonth" : $("#searchMonth").val()
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// kpi ID 불러오기
function getKpiId()
{
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "c3QwMjUuZ2V0S3BpSWQ=",
			"map" : {"key" : "value"}
		};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 성과관리 목록 등록
function getJsonStrKpiListSave(gKpiId)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c3QwMjUuaW5zZXJ0S3BpTGlzdA==",
		"map" : {
			"key" : "value",
			"kpiId" : gKpiId,
			"title" : $("#title").val(),
			"year" : $("#optYear1").val().replace(/-/gi, ""),
			"month" : $("#months").val().replace(/-/gi, ""),

			"cust_rspn_rate" : $("#cust_rspn_rate").val(),
			"prdt" : $("#prdt").val(),
			"fcr" : $("#fcr").val(),
			"agt_stsfdg" : $("#agt_stsfdg").val(),
			"sec20_cnsl_rate" : $("#sec20_cnsl_rate").val(),
			"agt_ret_prsn" : $("#agt_ret_prsn").val(),
			"vltn_scr" : $("#vltn_scr").val(),
			"cust_stsfdg" : $("#cust_stsfdg").val(),
			"task_knwg_scr" : $("#task_knwg_scr").val(),
			"note" : $("#note").val(),

			"tbl_pk": gKpiId,
			"tbl_nm" : "st025"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 성과관리 목록 수정
function getJsonStrUpdateKpiList()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c3QwMjUudXBkYXRlS3BpTGlzdA==",
		"map" : {
			"key" : "value",
			"kpiId" : $("#kpiId").val(),
			"title" : $("#title").val(),
			"year" : $("#optYear1").val(),
			"month" : $("#months").val(),

			"cust_rspn_rate" : $("#cust_rspn_rate").val(),
			"prdt" : $("#prdt").val(),
			"fcr" : $("#fcr").val(),
			"agt_stsfdg" : $("#agt_stsfdg").val(),
			"sec20_cnsl_rate" : $("#sec20_cnsl_rate").val(),
			"agt_ret_prsn" : $("#agt_ret_prsn").val(),
			"vltn_scr" : $("#vltn_scr").val(),
			"cust_stsfdg" : $("#cust_stsfdg").val(),
			"task_knwg_scr" : $("#task_knwg_scr").val(),
			"note" : $("#note").val(),
			
			"tbl_pk": $("#kpiId").val(),
			"tbl_nm" : "st025"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 성과관리 목록 삭제
function getJsonStrDeleteKpiList()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "c3QwMjUuZGVsZXRlS3BpTGlzdA==",
		"map" : {
			"key" : "value",
			"kpiId" : $("#kpiId").val(),
			"use_yn" : 'N',
			"tbl_pk": $("#kpiId").val(),
			"tbl_nm" : "st025"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터셋팅 첨부파일
function getJsonFileList(kpiId) {		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "st025",
			"tbl_pk": kpiId,
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

// 성과관리 목록 선택
function getJsonStrKpiListSpec(kpi_id)
{
	var loParam = {
		//"qt" : "c2VsZWN0T25l",		//selectOne
		"qt" : "c2VsZWN0TGlzdA==",		//selectList
		"mi" : "c3QwMjUuc2VsZWN0S3BpU3BlYw==",
		"map" : {
			"key" : "value",
			"kpi_id" : kpi_id
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 조회 초기화
function initControl() {
	// 성과관리목록 jqgrid
	$("#tblKpiList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/management/kpiList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrKpiList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["목록", "KPI_ID", "년", "월"],
	   	colModel :
	   	[
	   		{ name : "TITLE", index : "TITLE", width : 240},
	   		{ name : "KPI_ID", index : "KPI_ID", hidden : true },
	   		{ name : "YEAR", index : "YEAR", hidden : true },
	   		{ name : "MONTH", index : "MONTH", hidden : true }
	   	],
	   	sortname : "TITLE",
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "114",
	   	width : "100%",
	   	rowNum : 4,
	   	rowList : [4, 8, 12],
	   	autowidth : true,
	   	pager : "#pgTblKpiList",
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
	   		$("#kpiFile").empty().append(fileForm);
	   		
	   		var row = $("#tblKpiList").getRowData(rowid);
	   		$("#kpiId").val(row.KPI_ID);
	   		$("#year").val(row.YEAR);
	   		$("#month").val(row.MONTH);
	   		showAttachFiles(row.KPI_ID);
	   		
	   		$.ajax({
	   			type : "post",
	   			dataType: "json",
	   			async : true,
	   			url : getContextPath() + "/ajax/management/getKpiList.do",
	   			data : "pJson=" + getJsonStrKpiListSpec(row.KPI_ID),
	   			success : function(data)
	   			{
	   				resetTotalScore();
	   				
	   				if (data.length <= 0)
	   					return;
	   				
	   				$.each(data, function(index, state) {
		   				//당월
		   				if (state.KPI_ID == row.KPI_ID) { 
		   					if (state)
		   						initDataDisplay(state, "0")
		   				} else {
		   					//전월
		   					if (state)
		   						initDataDisplay(state, "1");
		   				}

	   				});
	   				
	   				for (var int = 1; int <= 9; int++) {
	   					calculate(int);
					}
	   				
	   				$("#btnInsert").hide();
	   				$("#btnUpdate").show();
	   				$("#btnDelete").show();
	   				//$("#btnOz").show();
	   				
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
	}).jqGrid("navGrid", "#pgTblKpiList", {edit : false, add : false, del : false, search : false});
}

//데이터 뿌려주기
function initDataDisplay(pData, rowNum)
{
	switch(rowNum){
		case "0":	//당월 데이터
			$("#optYear1").val(pData.YEAR);
			$("#months").val(pData.MONTH);
			$("#title").val(pData.KPI_TTL);
			$("#note").val(pData.MEMO);
			
			$("#cust_rspn_rate").val(pData.CUST_RSPN_RATE);
			$("#prdt").val(pData.PRDT);
			$("#fcr").val(pData.FCR);
			$("#agt_stsfdg").val(pData.AGT_STSFDG);
			$("#sec20_cnsl_rate").val(pData.SEC20_CNSL_STRT_RATE);
			$("#agt_ret_prsn").val(pData.AGT_RET_PRSN);
			$("#vltn_scr").val(pData.VLTN_SCR);
			$("#cust_stsfdg").val(pData.CUST_STSFDG);
			$("#task_knwg_scr").val(pData.TASK_KNWG_VLTN_SCR);
			break;
		case "1":	//전월 데이터
			$("#cust_rspn_lsmth_acmslt").html(pData.CUST_RSPN_RATE);		//고객응대율
			$("#prdt_lsmth_acmslt").html(pData.PRDT);						//콜센터 생산성
			$("#fcr_lsmth_acmslt").html(pData.FCR);							//FCR(1차 처리율)
			$("#agt_stsfdg_lsmth_acmslt").html(pData.AGT_STSFDG);			//상담사 만족도
			$("#sec20_cnsl_lsmth_acmslt").html(pData.SEC20_CNSL_STRT_RATE);	//20초내 상담개시율
			$("#agt_ret_lsmth_acmslt").html(pData.AGT_RET_PRSN);			//상담사 이직인원
			$("#vltn_scr_lsmth_acmslt").html(pData.VLTN_SCR);				//모니터링 평가
			$("#cust_stsfdg_lsmth_acmslt").html(pData.CUST_STSFDG);			//고객만족도
			$("#task_knwg_lsmth_acmslt").html(pData.TASK_KNWG_VLTN_SCR);	//상담사 업무지식평가
			break;
	default:
		
	}
}

// 초기 이벤트 셋팅
function initEvent()
{
	//oz 버튼 클릭시
	//$("#btnOz").bind("click", btnOz_clickEvent);
	// 성과관리 조회 버튼
	$("#btnSearch").bind("click", btnListSrch_clickEvent);
	// 성과관리 조회 초기화 버튼
	$("#btnInit").bind("click", btnCustmInit_clickEvent);
	// 성과관리 목록 저장 버튼
	$("#btnInsert").bind("click", saveKpiList);
	// 성과관리 목록 수정 버튼
	$("#btnUpdate").bind("click", updateKpiList);
	// 성과관리 목록 삭제 버튼
	$("#btnDelete").bind("click", deleteKpiList);
	// 성과관리 목록 초기화 버튼
	$("#btnReset").bind("click", btnKpiListInit_clickEvent);
	// 파일박스취소버튼 클릭이벤트 등록
	$("#kpiRmFilebox").bind("click", rmFileBoxEvent);
	
	// 엑셀저장버튼 클릭이벤트 등록
	$("#btnExcel").bind("click",btnExcel_clickEvent);
	
	// 당월실적 입력 숫자, 소수점 체크
	$("#cust_rspn_rate, #prdt, #cr, #agt_stsfdg, #sec20_cnsl_rate, #agt_ret_prsn, #vltn_scr, #cust_stsfdg, #task_knwg_scr").keyup(
			function(){ChkRegNum($(this).val(), this.id);} 
	);
}

// 초기 데이터 셋팅
function initData()
{
	var selectBox = "";
	var selectBox1 = "";
	selectBox +=  "<select id = 'optYear' style ='width : 100px; margin-left : 5px;' >";
	for(var i = 2015; i <= currentYear; i++)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	selectBox +=  "</select>";
	
	$("#searchYear").empty();
	$("#searchYear").append(selectBox);
	$("#optYear").val(currentYear);
	
	selectBox1 +=  "<select id = 'optYear1' style ='width : 100px; margin-left : 5px;' >";
	for(var i = 2015; i <= currentYear; i++)
	{
		selectBox1 +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	selectBox1 +=  "</select>";
	
	$("#years").empty();
	$("#years").append(selectBox1);
	$("#optYear1").val(currentYear);
	$("#months").val(currentMonth);
	
	inputFile.push($("#kpi").clone());
	fileForm = $("#kpiFile tr").parent().html();
	
	$("#btnUpdate").hide();
	$("#btnDelete").hide();
	//$("#btnOz").hide();
}

$(document).ready(function()
{
	initEvent();
	initData();
	initControl();
});