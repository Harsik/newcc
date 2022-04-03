var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

// 조회
function btnSearch(){
	selectCallCtiTable();
	selectResultTable();
	selectCtgTable();
	selectHoliTable();
	selectActTable();
}

// 엑셀 다운로드 이벤트
function btnExcelSave(){
	var title = '운영상담현황'+ setDownLoadName($("#cslCntM_srcFrDate").val(), $("#cslCntM_srcToDate").val());
	
	var wb = XLSX.utils.book_new();

	var ws1 = XLSX.utils.table_to_sheet(document.getElementById('call_tbl'));
	XLSX.utils.book_append_sheet(wb, ws1, "콜현황(CTI기준)");

	var ws2 = XLSX.utils.table_to_sheet(document.getElementById('result_tbl'));
	XLSX.utils.book_append_sheet(wb, ws2, "이용실적종합");
	
	var ws3 = XLSX.utils.table_to_sheet(document.getElementById('ctg_tbl'), {type: 'string', raw: true});
	XLSX.utils.book_append_sheet(wb, ws3, "상담유형별현황");
	
	var ws4 = XLSX.utils.table_to_sheet(document.getElementById('holi_tbl'));
	XLSX.utils.book_append_sheet(wb, ws4, "시간대별상담실적");
	
	var ws5 = XLSX.utils.table_to_sheet(document.getElementById('act_tbl'), {type: 'string', raw: true});
	XLSX.utils.book_append_sheet(wb, ws5, "처리유형별현황");
	
	XLSX.writeFile(wb, title+'.xlsx');
}


// 콜현황(CTI)
function selectCallCtiTable(){
	$("#call_tbl tr td").empty();
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/selectCallCtiData.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y3RpLnN0c0NvdW5zZWxpbmdDbnRNb250aEN0aQ==", {
			"key" : "value",
			"strtDt": $("#cslCntM_srcFrDate").val().replace(/-/gi, ""),
			"endDt": $("#cslCntM_srcToDate").val().replace(/-/gi, "")
		}),
		success : function(data) {
			$.each(data, function(key, result)
			{	
				$("#CALL_"+key).html(result);
			});
		},
		error : function(data1, status, err) {
			networkErrorHandler(data1, status, err);
		}
	});
}

// 이용실적 종합
function selectResultTable(){
	$("#result_tbl tr th:eq(0)~").empty();
	$("#result_tbl tr td").empty();
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/selectResultData.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "Y2gwMDFfc3Quc2VsZWN0Q25zbFJlc3VsdA==", {
			"key" : "value",
			"strtDt": $("#cslCntM_srcFrDate").val().replace(/-/gi, ""),
			"endDt": $("#cslCntM_srcToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : usrGrdCd,
			"chkHoliday" : $("#cslCntM_chkHoliday").is(":checked") ? "Y" : "N"
		}),
		success : function(data) {
			if(data.length > 0)
			{
				$.each(data, function(key, result)
				{	
					$("#result_year"+result.RN).html(result.PERIOD);
					$("#result_tot_cnt"+result.RN).html(result.TOT_CNT+'건');
					$("#result_day_age_res"+result.RN).html(result.DAY_AGE+'건');
					if(result.WITH_RATE!=undefined){
						$("#result_with_rate"+result.RN).html(result.WITH_RATE+'% ' + result.GAP);
					}else{
						$("#result_with_rate"+result.RN).html(result.GAP);
					}
				});
			}
			else
			{
				console.log("이용실적	> NULL !!!");
			}
		},
		error : function(data1, status, err) {
			networkErrorHandler(data1, status, err);
		}
	});
}

// 상담유형별 현황
function selectCtgTable(){
	$("#statistics_tbl tr th").empty();
	$("#statistics_tbl tr td").empty();
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/selectCTGData.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "Y2gwMDFfc3Quc2VsZWN0Q25zbENURw==", {
			"key" : "value",
			"strtDt": $("#cslCntM_srcFrDate").val().replace(/-/gi, ""),
			"endDt": $("#cslCntM_srcToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : usrGrdCd,
			"chkHoliday" : $("#cslCntM_chkHoliday").is(":checked") ? "Y" : "N"
		}),
		success : function(data) {
			if(data.length > 0)
			{
				for(var i = 0 ; i < data.length; i++)
				{
					$("#ctg_nm"+i).html(data[i].CD_NM);
					$("#ctg_cnt"+i).html(data[i].CNT+'건');
					$("#ctg_rate"+i).html(data[i].CTG_RATE+'%');
				}
				
			}
			else
			{
				console.log("상담유형별	> NULL !!!");
			}
		},
		error : function(data1, status, err) {
			networkErrorHandler(data1, status, err);
		}
	});
}

// 시간대별 상담실적
function selectHoliTable(){
	$("#holi_tbl tr td").empty();
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/selectHoliData.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "Y2gwMDFfc3Quc2VsZWN0Q25zbEhvbGk=", {
			"key" : "value",
			"strtDt": $("#cslCntM_srcFrDate").val().replace(/-/gi, ""),
			"endDt": $("#cslCntM_srcToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : usrGrdCd,
			"chkHoliday" : $("#cslCntM_chkHoliday").is(":checked") ? "Y" : "N"
		}),
		success : function(data) {
			
			if(data.length > 0)
			{	
				$("#holi_H08").html(data[0].H08+'건');
				$("#holi_H09").html(data[0].H09+'건');
				$("#holi_H10").html(data[0].H10+'건');
				$("#holi_H11").html(data[0].H11+'건');
				$("#holi_H12").html(data[0].H12+'건');
				$("#holi_H13").html(data[0].H13+'건');
				$("#holi_H14").html(data[0].H14+'건');
				$("#holi_H15").html(data[0].H15+'건');
				$("#holi_H16").html(data[0].H16+'건');
				$("#holi_H17").html(data[0].H17+'건');
				$("#holi_H18").html(data[0].H18+'건');
				$("#holi_TOT_CNT").html(data[0].TOT_CNT+'건');
				$("#holi_DAY_AVG").html(data[0].DAY_AVG+'건');
			}
			else
			{
				console.log("시간대별	> NULL !!!");
			}
		},
		error : function(data1, status, err) {
			networkErrorHandler(data1, status, err);
		}
	});
}

// 처리유형별 현황
function selectActTable(){
	$("#act_tbl").empty();
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/statistics/selectActData.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "Y2gwMDFfc3Quc2VsZWN0Q25zbEFjdFR5cGU=", {
			"key" : "value",
			"strtDt": $("#cslCntM_srcFrDate").val().replace(/-/gi, ""),
			"endDt": $("#cslCntM_srcToDate").val().replace(/-/gi, ""),
			"usrGrdCd" : usrGrdCd,
			"chkHoliday" : $("#cslCntM_chkHoliday").is(":checked") ? "Y" : "N"
		}),
		success : function(data) {
			
			var str = "";
			
			if(data.length > 0)
			{	
				str += '<tr>';
				$.each(data , function(i){
					str += '<th class="line_rb_g">'+data[i].NM+'</th>'
				});
				str += '</tr>';
				
				str += '<tr>';
				$.each(data , function(i){
					str += '<td class="line_rb_r">'+data[i].CNT+'건</th>'
				});
				str += '</tr>';
				
				str += '<tr>';
				$.each(data , function(i){
					str += '<td class="line_rb_r">'+data[i].RATE+'%</td>'
				});
				str += '</tr>';
				
				$("#act_tbl").append(str);
			}
			else
			{
				console.log("처리유형별	> NULL !!!");
			}
		},
		error : function(data1, status, err) {
			networkErrorHandler(data1, status, err);
		}
	});
}

// 날짜 init
function dataInit(){
	datePicker("#cslCntM_srcFrDate");
	datePicker("#cslCntM_srcToDate");
	
	$("#cslCntM_srcFrDate").val(getDate());
	$("#cslCntM_srcToDate").val(getDate());
	
	$("#cslCntM_srcFrDate").bind("change",  function () {
		$( "#cslCntM_srcToDate" ).datepicker( "option", "minDate", $("#cslCntM_srcFrDate").val() );
		var toDay = new Date(getDate());
		var maxDay = new Date(getAddDate($("#cslCntM_srcFrDate").val(), 31));
		
		if((toDay.getTime() - maxDay.getTime()) < 0){
			// 현재 날짜가 작은경우
			$( "#cslCntM_srcToDate" ).datepicker( "option", "maxDate",getDate());
		}else{
			$( "#cslCntM_srcToDate" ).datepicker( "option", "maxDate", getAddDate($("#cslCntM_srcFrDate").val(), 93) );
		}
		$( "#cslCntM_srcFrDate" ).datepicker( "option", "maxDate",getDate());			

		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	$("#cslCntM_srcToDate").bind("change",  function () {
		$( "#cslCntM_srcFrDate" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntM_srcToDate" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
		
	});
	
}


$(document).ready(function(){
	dataInit();
	
	btnSearch();
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntM_btnSearch").bind("click", btnSearch);
	
	// 엑셀 버튼 클릭 이벤트 등록
	$("#cslCntM_btnExcelSave").bind("click",btnExcelSave);	
});