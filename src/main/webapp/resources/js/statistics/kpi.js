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
	var price1 = eval($("#kpi_res_rate").val());
	var price2 = eval($("#kpi_serv_lv").val());
	var price3 = eval($("#kpi_fcr").val());
	var price4 = eval($("#kpi_trans_rate").val());
	var price5 = eval($("#kpi_delay_tm").val());
	var price6 = eval($("#kpi_mnt_cnt").val());
	var price7 = eval($("#kpi_mnt_scr").val());
	var price8 = eval($("#kpi_imp_act").val());
	var price9 = eval($("#kpi_miss_cnt").val());
	var price10 = eval($("#kpi_trans_job_rate").val());
	var price11 = eval($("#kpi_imp_job_rate").val());
	var price12 = eval($("#kpi_praise_scr").val());
	var price13 = eval($("#kpi_job_sppt").val());
	var price14 = eval($("#kpi_complain_rate").val());
	var price15 = eval($("#kpi_etc_miss_cnt").val());
	
	switch (count) {
	case 1: //응답율
		if (price1 >= 95) {
			$("#kpi_res_rateScore").html(10);
		} else if (price1 >= 90) {
			$("#kpi_res_rateScore").html(8);
		} else if (price1 >= 85) {
			$("#kpi_res_rateScore").html(6);
		} else {
			$("#kpi_res_rateScore").html(4);
		}
		totalScore();
		break;

	case 2: //Service Level
		if (price2 >= 90) {
			$("#kpi_serv_lvScore").html(10);
		} else if (price2 >= 85) {
			$("#kpi_serv_lvScore").html(8);
		} else if (price2 >= 80) {
			$("#kpi_serv_lvScore").html(6);
		} else {
			$("#kpi_serv_lvScore").html(4);
		}
		totalScore();
		break;
		
	case 3: //원콜처리율
		/*if (price3 >= 75) {
			$("#kpi_fcrScore").html(10);
		} else if (price3 >= 70) {
			$("#kpi_fcrScore").html(8);
		} else if (price3 >= 65) {
			$("#kpi_fcrScore").html(6);
		} else {
			$("#kpi_fcrScore").html(4);
		}
		totalScore();
		break;*/
		if (price3 >= 80) {
			$("#kpi_fcrScore").html(10);
		} else if (price3 >= 75) {
			$("#kpi_fcrScore").html(8);
		} else if (price3 >= 70) {
			$("#kpi_fcrScore").html(6);
		} else {
			$("#kpi_fcrScore").html(4);
		}
		totalScore();
		break;
		
	case 4: //콜이관율
		if (price4 < 15) {
			$("#kpi_trans_rateScore").html(10);
		} else if (price4 < 20) {
			$("#kpi_trans_rateScore").html(8);
		} else if (price4 < 25) {
			$("#kpi_trans_rateScore").html(6);
		} else {
			$("#kpi_trans_rateScore").html(4);
		}
		totalScore();
		break;
		
	case 5: //통화중대기시간
		if (price5 < 5) {
			$("#kpi_delay_tmScore").html(5);
		} else if (price5 < 10) {
			$("#kpi_delay_tmScore").html(3);
		} else {
			$("#kpi_delay_tmScore").html(1);
		}
		totalScore();
		break;
		
	case 6: //상담품질 모니터링 횟수(월)
		if (price6 >= 8) {
			$("#kpi_mnt_cntScore").html(10);
		} else if (price6 >= 6) {
			$("#kpi_mnt_cntScore").html(8);
		} else if (price6 >= 4) {
			$("#kpi_mnt_cntScore").html(6);
		} else {
			$("#kpi_mnt_cntScore").html(4);
		}
		totalScore();
		break;
		
	case 7: //상담품질 모니터링 점수(월평균)
		/*if (price7 >= 90) {
			$("#kpi_mnt_scrScore").html(10);
		} else if (price7 >= 85) {
			$("#kpi_mnt_scrScore").html(8);
		} else if (price7 >= 80) {
			$("#kpi_mnt_scrScore").html(6);
		} else {
			$("#kpi_mnt_scrScore").html(4);
		}
		totalScore();
		break;*/
		if (price7 >= 90) {
			$("#kpi_mnt_scrScore").html(10);
		} else if (price7 >= 85) {
			$("#kpi_mnt_scrScore").html(8);
		} else if (price7 >= 80) {
			$("#kpi_mnt_scrScore").html(6);
		} else if (price7 >= 75) {
			$("#kpi_mnt_scrScore").html(4);
		} else {
			$("#kpi_mnt_scrScore").html(2);
		}
		totalScore();
		break;
		
	case 8: //상담품질 개선활동
		if (price8 >= 2) {
			$("#kpi_imp_actScore").html(10);
		} else if (price8 >= 1) {
			$("#kpi_imp_actScore").html(7);
		} else {
			$("#kpi_imp_actScore").html(4);
		}
		totalScore();
		break;
		
	case 9: //오상담 발생 건수
		if (price9 == 0) {
			$("#kpi_miss_cntScore").html(5);
		} else if (price9 <= 2) {
			$("#kpi_miss_cntScore").html(3);
		} else {
			$("#kpi_miss_cntScore").html(1);
		}
		totalScore();
		break;
		
	case 10: //이직인원
		if (price10 == 0) {
			$("#kpi_trans_job_rateScore").html(10);
		} else if (price10 == 1) {
			$("#kpi_trans_job_rateScore").html(7);
		} else {
			$("#kpi_trans_job_rateScore").html(4);
		}
		totalScore();
		break;
		
	case 11: //업무개선 기여도 종합 경영 노력도
		if (price11 >=10) {
			$("#kpi_imp_job_rateScore").html(10);
		} else {
			$("#kpi_imp_job_rateScore").html(price11);
		}
		totalScore();
		break;
		
	case 12: //칭찬사례 접수
		if (price12 >= 4) {
			$("#kpi_praise_scrScore").html(10);
		} else if (price12 == 3) {
			$("#kpi_praise_scrScore").html(9);
		} else if (price12 == 2) {
			$("#kpi_praise_scrScore").html(6);
		} else if (price12 == 1) {
			$("#kpi_praise_scrScore").html(3);
		} else {
			$("#kpi_praise_scrScore").html(0);
		}
		totalScore();
		break;
		
	case 13: //업무지원도
		if (price13 >= 5) {
			$("#kpi_job_spptScore").html(10);
		} else if (price13 == 4) {
			$("#kpi_job_spptScore").html(8);
		} else if (price13 == 3) {
			$("#kpi_job_spptScore").html(6);
		} else if (price13 == 2) {
			$("#kpi_job_spptScore").html(4);
		} else if (price13 == 1) {
			$("#kpi_job_spptScore").html(2);
		} else {
			$("#kpi_job_spptScore").html(0);
		}
		totalScore();
		break;
		
	case 14: //상담민원 발생 수
		if (price14 >= 4) {
			$("#kpi_complain_rateScore").html(-10);
		} else if (price14 == 3) {
			$("#kpi_complain_rateScore").html(-9);
		} else if (price14 == 2) {
			$("#kpi_complain_rateScore").html(-6);
		} else if (price14 == 1) {
			$("#kpi_complain_rateScore").html(-3);
		} else {
			$("#kpi_complain_rateScore").html(0);
		}
		totalScore();
		break;
		
	case 15: //기타 오상담
		if (price15 >= 5) {
			$("#kpi_etc_miss_cntScore").html(-10);
		} else if (price15 == 4) {
			$("#kpi_etc_miss_cntScore").html(-8);
		} else if (price15 == 3) {
			$("#kpi_etc_miss_cntScore").html(-6);
		} else if (price15 == 2) {
			$("#kpi_etc_miss_cntScore").html(-4);
		} else if (price15 == 1) {
			$("#kpi_etc_miss_cntScore").html(-2);
		} else {
			$("#kpi_etc_miss_cntScore").html(0);
		}
		totalScore();
		break;
		
	default:
		break;
	}
}

// 자동 합계 계산
function totalScore() 
{
	var priceTotal = 0;
	// (음수값 가능)
	if ($('#kpi_res_rateScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_res_rateScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_serv_lvScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_serv_lvScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_fcrScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_fcrScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_trans_rateScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_trans_rateScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_delay_tmScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_delay_tmScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_mnt_cntScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_mnt_cntScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_mnt_scrScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_mnt_scrScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_imp_actScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_imp_actScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_miss_cntScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_miss_cntScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_trans_job_rateScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_trans_job_rateScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_imp_job_rateScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_imp_job_rateScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_praise_scrScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_praise_scrScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_job_spptScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_job_spptScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_complain_rateScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_complain_rateScore').text().replace(/[^0-9-]/g,''));
	}
	if ($('#kpi_etc_miss_cntScore').text().replace(/[^0-9-]/g,'') != "") {
		priceTotal = priceTotal + parseInt($('#kpi_etc_miss_cntScore').text().replace(/[^0-9-]/g,''));
	}
	
	$('#kpi_tot_score').text(priceTotal);
}

//oz 버튼 클릭시 이벤트
function btnOz_clickEvent() {
	var year = $("#kpi_optYear1").val();
	var month = $("#kpi_months").val();
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/kpi.jsp?year="+year+"&month="+month+"&usr_nm="+encodeURI(encodeURIComponent(window.sessionStorage.getItem("USR_NM"))));
}

// 성과관리 조회버튼 클릭 이벤트
function btnListSrch_clickEvent()
{
	$("#kpi_tblKpiList").jqGrid("setGridParam", { postData : { pJson : getJsonStrKpiList() }, page : 1, sortname : "TITLE", sortorder : "asc" });
	$("#kpi_tblKpiList").trigger("reloadGrid");
}

// 성과관리 초기화 버튼 클릭 이벤트
function btnCustmInit_clickEvent()
{
	initTab();
}

// 성과관리목록 초기화 버튼 클릭 이벤트
function btnKpiListInit_clickEvent()
{
	initKpiTab();
}

// 성과관리조회 초기화
function initTab()
{
	$("#kpi_tblKpiList").clearGridData();
	
	$("#kpi_optYear").val(currentYear);
	$("#kpi_searchMonth").val("");
	$("#kpi_optYear1").val(currentYear);
	$("#kpi_months").val(currentMonth);
	$("#kpi_title").val("");
	$("#kpi_note").val("");
	$("#kpi_kpiId").val("");
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#kpi_kpiFile").empty().append(fileForm);
	
	btnListSrch_clickEvent();
	
	$("#kpi_btnInsert").show();
	$("#kpi_btnUpdate").hide();
	$("#kpi_btnDelete").hide();
	$("#kpi_btnOz").hide();
	
	resetTotalScore();
}

// 성과관리등록 초기화
function initKpiTab()
{
	$("#kpi_tblKpiList").clearGridData();
	
	$("#kpi_optYear1").val(currentYear);
	$("#kpi_months").val(currentMonth);
	$("#kpi_title").val("");
	$("#kpi_note").val("");
	$("#kpi_kpiId").val("");
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#kpi_kpiFile").empty().append(fileForm);
	
	btnListSrch_clickEvent();
	
	$("#kpi_btnUpdate").hide();
	$("#kpi_btnDelete").hide();
	$("#kpi_btnInsert").show();
	
	resetTotalScore();
	$("#kpi_btnOz").hide();
}

// 저장 후 초기화
function initKpi()
{
	$("#kpi_optYear1").val(currentYear);
	$("#kpi_months").val(currentMonth);
	$("#kpi_title").val("");
	$("#kpi_note").val("");
	$("#kpi_kpiId").val("");
	
	$("#kpi_btnInsert").show();
	$("#kpi_btnUpdate").hide();
	$("#kpi_btnDelete").hide();
	
	btnListSrch_clickEvent();	
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#kpi_kpiFile").empty().append(fileForm);
	
	resetTotalScore();
	$("#kpi_btnOz").hide();
}

// 성과지표 점수 초기화
function resetTotalScore() {
	$("#kpi_res_rate").val("");
	$("#kpi_serv_lv").val("");
	$("#kpi_fcr").val("");
	$("#kpi_trans_rate").val("");
	$("#kpi_delay_tm").val("");
	$("#kpi_mnt_cnt").val("");
	$("#kpi_mnt_scr").val("");
	$("#kpi_imp_act").val("");
	$("#kpi_miss_cnt").val("");
	$("#kpi_trans_job_rate").val("");
	$("#kpi_imp_job_rate").val("");
	$("#kpi_praise_scr").val("");
	$("#kpi_job_sppt").val("");
	$("#kpi_complain_rate").val("");
	$("#kpi_etc_miss_cnt").val("");
	
	$("#kpi_res_rateScore").html("");
	$("#kpi_serv_lvScore").html("");
	$("#kpi_fcrScore").html("");
	$("#kpi_trans_rateScore").html("");
	$("#kpi_delay_tmScore").html("");
	$("#kpi_mnt_cntScore").html("");
	$("#kpi_mnt_scrScore").html("");
	$("#kpi_imp_actScore").html("");
	$("#kpi_miss_cntScore").html("");
	$("#kpi_trans_job_rateScore").html("");
	$("#kpi_imp_job_rateScore").html("");
	$("#kpi_praise_scrScore").html("");
	$("#kpi_job_spptScore").html("");
	$("#kpi_complain_rateScore").html("");
	$("#kpi_etc_miss_cntScore").html("");
	
	$('#kpi_tot_score').html("");
	
	$("#kpi_btnOz").hide();
}

// 첨부파일박스 내용삭제
function rmFileBoxEvent() {
	inputFile[1] = inputFile[0].clone(true);
	$("#kpi_kpi").replaceWith(inputFile[1]);
}

// 첨부파일 박스추가
function addFileBox() {
	if (fileBox_idx >= 4) {
		alert("첨부파일은 최대 5개까지 가능합니다.");
	} else {
		var html = $("#kpi_fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#kpi_kpiFile").append(html);
	}
}

// 첨부파일박스삭제
function removeFileBox(i) {
	var el = $("#kpi_writeForm input[name=record_" + i + "]");
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
				var el = $("#kpi_writeForm input[name=record_" + fileId + "]");
					el.parent().parent().remove();
					if(--fileBox_idx < 5) {
						$("#kpi_kpi").prop("disabled", false);
						$("#kpi_kpiRmFilebox").prop("disabled", false);
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
				$("#kpi_kpiFile").prepend(tr);
			}
			if(fileBox_idx >= 5) {
				$("#kpi_kpi").prop("disabled", true);
				$("#kpi_kpiRmFilebox").prop("disabled", true);
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
	var formName = $("#kpi_writeForm input[name=KPI]");
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
	
	if ($("#kpi_res_rate").val() == "") {
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
			
			gAppendHidden("kpi_writeForm", "pJson", getJsonStrKpiListSave(gKpiId));
			gSubmitPost("kpi_writeForm", true);

			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/kpiListSave.do",
				data : "pJson=" + getJsonStrKpiList(),
				success : function(data)
				{
					initKpi();
					
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
	
	gAppendHidden("kpi_writeForm", "pJson", getJsonStrUpdateKpiList());
	gSubmitPost("kpi_writeForm", true);
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/kpiListupdate.do",
		data : "pJson=" + getJsonStrKpiList(),
		success : function(data)
		{
			initKpi();
			
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
	if ($("#kpi_kpiId").val() == "") {
		alert("목록을 선택해주세요.");
		return;
	} else {
		if(confirm("선택된 목록을 삭제하시겠습니까?(첨부파일이 있을 경우 등록된 첨부파일도 함께 삭제됩니다.)")) {
			gAppendHidden("kpi_writeForm", "pJson", getJsonStrDeleteKpiList());
			gSubmitPost("kpi_writeForm", true);
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/deleteKpiList.do",
				data : "pJson=" + getJsonStrKpiList(),
				success : function(data)
				{
					initKpi();
					
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
			"searchYear" : $("#kpi_optYear").val(),
			"searchMonth" : $("#kpi_searchMonth").val()
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
			"title" : $("#kpi_title").val(),
			"year" : $("#kpi_optYear1").val().replace(/-/gi, ""),
			"month" : $("#kpi_months").val().replace(/-/gi, ""),
			"creat_usr_id" : g_usrId,
			"note" : $("#kpi_note").val(),
			"res_rate" : $("#kpi_res_rate").val(),
			"serv_lv" : $("#kpi_serv_lv").val(),
			"fcr" : $("#kpi_fcr").val(),
			"trans_rate" : $("#kpi_trans_rate").val(),
			"delay_tm" : $("#kpi_delay_tm").val(),
			"mnt_cnt" : $("#kpi_mnt_cnt").val(),
			"mnt_scr" : $("#kpi_mnt_scr").val(),
			"imp_act" : $("#kpi_imp_act").val(),
			"miss_cnt" : $("#kpi_miss_cnt").val(),
			"trans_job_rate" : $("#kpi_trans_job_rate").val(),
			"imp_job_rate" : $("#kpi_imp_job_rate").val(),
			"praise_scr" : $("#kpi_praise_scr").val(),
			"job_sppt" : $("#kpi_job_sppt").val(),
			"complain_rate" : $("#kpi_complain_rate").val(),
			"etc_miss_cnt" : $("#kpi_etc_miss_cnt").val(),
			"tot_score" : $("#kpi_tot_score").text(),
			"tbl_pk": gKpiId,
			"tbl_nm" : "om024"
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
			"kpiId" : $("#kpi_kpiId").val(),
			"title" : $("#kpi_title").val(),
			"year" : $("#kpi_optYear1").val(),
			"month" : $("#kpi_months").val(),
			"mod_usr_id" : g_usrId,
			"note" : $("#kpi_note").val(),
			"res_rate" : $("#kpi_res_rate").val(),
			"serv_lv" : $("#kpi_serv_lv").val(),
			"fcr" : $("#kpi_fcr").val(),
			"trans_rate" : $("#kpi_trans_rate").val(),
			"delay_tm" : $("#kpi_delay_tm").val(),
			"mnt_cnt" : $("#kpi_mnt_cnt").val(),
			"mnt_scr" : $("#kpi_mnt_scr").val(),
			"imp_act" : $("#kpi_imp_act").val(),
			"miss_cnt" : $("#kpi_miss_cnt").val(),
			"trans_job_rate" : $("#kpi_trans_job_rate").val(),
			"imp_job_rate" : $("#kpi_imp_job_rate").val(),
			"praise_scr" : $("#kpi_praise_scr").val(),
			"job_sppt" : $("#kpi_job_sppt").val(),
			"complain_rate" : $("#kpi_complain_rate").val(),
			"etc_miss_cnt" : $("#kpi_etc_miss_cnt").val(),
			"tot_score" : $("#kpi_tot_score").html(),
			"tbl_pk": $("#kpi_kpiId").val(),
			"tbl_nm" : "om024"
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
			"kpiId" : $("#kpi_kpiId").val(),
			"use_yn" : 'N',
			"login_usr_id" : g_usrId
			
			/*20191015 파라미터 안맞음*/
			/*"mod_usr_id" : g_usrId,
			"tbl_pk": $("#kpi_kpiId").val(),
			"tbl_nm" : "om024"*/
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터셋팅 첨부파일		om019
function getJsonFileList(kpiId) {		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om024",
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

// 파라미터셋팅 첨부파일삭제		om019
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
		"qt" : "c2VsZWN0T25l",
		"mi" : "c3QwMjUuc2VsZWN0S3BpU3BlYw==",
		"map" : {
			"key" : "value",
			"kpi_id" : kpi_id
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 성과관리 대상 목록
function getJsonStrKpiTarget(kpiListId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMjUua3BpVGFyZ2V0",
		"map" : {
			"key" : "value",
			"kpiId" : kpiListId
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 성과관리 대상 점수
function getJsonStrKpiTargetSpec(kpi_usr_id, kpi_id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c3QwMjUua3BpVGFyZ2V0U3BlYw==",
		"map" : {
			"key" : "value",
			"kpiUsrId" : kpi_usr_id,
			"kpiId" : kpi_id,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 조회 초기화
function initControl() {
	// 성과관리목록 jqgrid
	$("#kpi_tblKpiList").jqGrid(
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
	   	pager : "#kpi_pgTblKpiList",
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
	   		$("#kpi_kpiFile").empty().append(fileForm);
	   		
	   		var row = $("#kpi_tblKpiList").getRowData(rowid);
	   		$("#kpi_kpiId").val(row.KPI_ID);
	   		$("#kpi_year").val(row.YEAR);
	   		$("#kpi_month").val(row.MONTH);
	   		showAttachFiles(row.KPI_ID);
	   		
	   		$.ajax({
	   			type : "post",
	   			dataType: "json",
	   			async : true,
	   			url : getContextPath() + "/ajax/management/getKpiList.do",
	   			data : "pJson=" + getJsonStrKpiListSpec(row.KPI_ID),
	   			success : function(data)
	   			{
	   				$("#kpi_optYear1").val(data.YEAR);
	   				$("#kpi_months").val(data.MONTH);
	   				$("#kpi_title").val(data.KPI_TTL);
	   				$("#kpi_note").val(data.MEMO);
	   				$("#kpi_res_rate").val(data.ANS_RATE);
	   				$("#kpi_serv_lv").val(data.SVC_LVL);
	   				$("#kpi_fcr").val(data.FCR);
	   				$("#kpi_trans_rate").val(data.TNTR_RATE);
	   				$("#kpi_delay_tm").val(data.CALL_WT_TM);
	   				$("#kpi_mnt_cnt").val(data.VLTN_SCNT);
	   				$("#kpi_mnt_scr").val(data.VLTN_SCR);
	   				$("#kpi_imp_act").val(data.IMPV_ACT);
	   				$("#kpi_miss_cnt").val(data.WNG_CNSL_SCNT);
	   				$("#kpi_trans_job_rate").val(data.RTRM_RATE);
	   				$("#kpi_imp_job_rate").val(data.CNTB);
	   				$("#kpi_praise_scr").val(data.PRS_CS_SCR);
	   				$("#kpi_job_sppt").val(data.TASK_SPPT);
	   				$("#kpi_complain_rate").val(data.CVL_OCCR_SCNT);
	   				$("#kpi_etc_miss_cnt").val(data.ETC_WNG_CNSL);
	   				$("#kpi_tot_score").html(data.TOTA_SCR);
	   				
	   				for (var int = 1; int < 16; int++) {
	   					calculate(int);
					}
	   				
	   				$("#kpi_btnInsert").hide();
	   				$("#kpi_btnUpdate").show();
	   				$("#kpi_btnDelete").show();
	   				$("#kpi_btnOz").show();
	   				
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
	}).jqGrid("navGrid", "#kpi_pgTblKpiList", {edit : false, add : false, del : false, search : false});
}

// 초기 이벤트 셋팅
function initEvent()
{
	//oz 버튼 클릭시
	$("#kpi_btnOz").bind("click", btnOz_clickEvent);
	// 성과관리 조회 버튼
	$("#kpi_btnSearch").bind("click", btnListSrch_clickEvent);
	// 성과관리 조회 초기화 버튼
	$("#kpi_btnInit").bind("click", btnCustmInit_clickEvent);
	// 성과관리 목록 저장 버튼
	$("#kpi_btnInsert").bind("click", saveKpiList);
	// 성과관리 목록 수정 버튼
	$("#kpi_btnUpdate").bind("click", updateKpiList);
	// 성과관리 목록 삭제 버튼
	$("#kpi_btnDelete").bind("click", deleteKpiList);
	// 성과관리 목록 초기화 버튼
	$("#kpi_btnReset").bind("click", btnKpiListInit_clickEvent);
	// 파일박스취소버튼 클릭이벤트 등록
	$("#kpi_kpiRmFilebox").bind("click", rmFileBoxEvent);
}

// 초기 데이터 셋팅
function initData()
{
	var selectBox = "";
	var selectBox1 = "";
	selectBox +=  "<select id = 'kpi_optYear' style ='width : 100px; margin-left : 5px;' >";
	for(var i = 2015; i <= currentYear; i++)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	selectBox +=  "</select>";
	
	$("#kpi_searchYear").empty();
	$("#kpi_searchYear").append(selectBox);
	$("#kpi_optYear").val(currentYear);
	
	selectBox1 +=  "<select id = 'kpi_optYear1' style ='width : 100px; margin-left : 5px;' >";
	for(var i = 2015; i <= currentYear; i++)
	{
		selectBox1 +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	selectBox1 +=  "</select>";
	
	$("#kpi_years").empty();
	$("#kpi_years").append(selectBox1);
	$("#kpi_optYear1").val(currentYear);
	$("#kpi_months").val(currentMonth);
	
	inputFile.push($("#kpi_kpi").clone());
	fileForm = $("#kpi_kpiFile tr").parent().html();
	
	$("#kpi_btnUpdate").hide();
	$("#kpi_btnDelete").hide();
	$("#kpi_btnOz").hide();
}

$(document).ready(function()
{
	initEvent();
	initData();
	initControl();
});