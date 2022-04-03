var today = new Date();
var yearNow = String(today.getFullYear());
var monthNow = fnLPAD(String((today.getMonth() + 1)), "0", 2);
var dateNow = fnLPAD(String(today.getDate()), "0", 2);
var dateStr = yearNow + "-" + monthNow + "-" + dateNow;

var week = new Date();
var sevenDay = new Date(week-(3600000*24*7));
var yearNow2 = String(sevenDay.getFullYear());
var monthNow2 = fnLPAD(String((sevenDay.getMonth() + 1)), "0", 2);
var dateNow2 = fnLPAD(String(sevenDay.getDate()), "0", 2); 
var weekStr = yearNow2 + "-" + monthNow2 + "-" + dateNow2; 
	
// 저장 전 체크
function getJsonStrDayReportNoteCheck()
{
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "c3QwMDAuY2hlY2s=",
		"map" : {
			"key" : "value",
			"day" : $("#searchYears").val().replace(/-/gi, "")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


// 민원 및 협조사항 저장
function getJsonStrDayReportNoteSave()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c3QwMDAuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"taskCont" : $("#dayReportNote").val(),
			"entr_st"  : $("#dayReportEntrSt").val(),
			"taskDt" : $("#searchYears").val().replace(/-/gi, ""),
			"login_usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 민원 및 협조사항 수정
function getJsonStrDayReportNoteUpdate()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "c3QwMDAudXBkYXRl",
		"map" : {
			"key" : "value",
			"taskSeq" : $("#taskSeq").val(),
			"contents" : $("#dayReportNote").val(),
			"mod_usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 민원 및 협조사항 불러오기
function getJsonStrDayReportNoteLoad()
{
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "c3QwMDAuc2VsZWN0",
		"map" : {
			"key" : "value",
			"day" : $("#searchYears").val().replace(/-/gi, "")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 민원 및 협조사항 저장
function dayReportNoteSave_clickEvent() {
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/dayReportNoteCheck.do",
		data : "pJson=" + getJsonStrDayReportNoteCheck(),
		success : function(data)
		{
			if (data.AT == 0) {
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/management/dayReportNoteSave.do",
					data : "pJson=" + getJsonStrDayReportNoteSave(),
					success : function(data)
					{
						alert("저장되었습니다.");
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			} else {
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/management/dayReportNoteUpdate.do",
					data : "pJson=" + getJsonStrDayReportNoteUpdate(),
					success : function(data)
					{
						alert("수정되었습니다.");
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

// 날짜 변경시 민원 및 협조사항 불러오기
function loadMemo() {
	$("#dayReportNote").val("");
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/dayReportNoteLoad.do",
		data : "pJson=" + getJsonStrDayReportNoteLoad(),
		success : function(data)
		{
			if(data == null)
			{
				$("#dayReportNote").val("");
				$("#taskSeq").val("");
			} else {
				$("#dayReportNote").val(data.CONTENTS);
				$("#taskSeq").val(data.TASK_SEQ);
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
}

// 일별 oz 버튼 클릭시 이벤트
function btnOz_clickEvent() {
	var day = $("#searchYears").val().replace(/-/gi, "");
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/dayReport.jsp?day="+day+"&usr_nm="+encodeURI(encodeURIComponent(window.sessionStorage.getItem("USR_NM"))));
}

// 기간별 oz 버튼 클릭시 이벤트
function btnOzDay_clickEvent() {
	var strDay = $("#strDay").val().split("-");
	var endDay = $("#endDay").val().split("-");


	var stDate = new Date(strDay[0], strDay[1] - 1, strDay[2]);
	var ltDate = new Date(endDay[0], endDay[1] - 1, endDay[2]);
	var betweenDate = (ltDate.getTime() - stDate.getTime()) / 1000 / 60 / 60 / 24;
	
	if(betweenDate > 7){
		alert("7일이 넘는 기간은  다운로드 하실 수 없습니다.");
		return;	
	}
	
	//window.open("http://172.16.2.35:8090/oz70/ozhviewer/dayReportDay.jsp?startDay="+strDay+"&endDay="+endDay+"&usr_nm="+encodeURI(encodeURIComponent(window.sessionStorage.getItem("USR_NM"))));
}

// 일일 초기화 버튼 클릭시 이벤트
function btnOzInit_clickEvent() {
	$("#searchYears").val(dateStr);
	$("#dayReportNote").html("");
	$("#dayReportEntrSt").html("");
}

// 기간별 초기화 버튼 클릭시 이벤트
function btnOzDayInit_clickEvent() {
	$("#strDay").val(weekStr);
	$("#endDay").val(dateStr);
}

// 콜현황 엑셀다운로드 이벤트
function btngigan_clickEvent(){
	var strDay = $("#giganstrDay").val().replace(/-/gi, "");
	var endDay = $("#giganendDay").val().replace(/-/gi, "");
}


// 운영상담 현황  다운로드 
function dayReportMonthList(){
	//문서출력
	alert("다운로드");
	/*var selectStatus=$("#callBound").val()=='all'?"전체":$("#callBound").val()=='in'?"인 바운드":"아웃 바운드";
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMDAuZGF5UmVwb3J0TW9udGhMaXN0",
			"map" : {
				"key" : "value",
				"srchVal" : $("#optDayYear").val()+$("#optDayMonth").val(),
				"title" : $("#optDayYear").val()+" 년도 "+$("#optDayMonth").val()+"월별 순천시3114온누리콜센터 업무내역 ( "+selectStatus+" )",
				"chkRetire" : $("input[id=chkNotUse]:checkbox").prop("checked"),
				"callbound":$("#callBound").val(),
				"sidx" : 'de',
				"sord" : "ASC",
				"colWidth" : [5,5,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
				"colName" : ["DE", "WEEK", "TRRSRT","SCHDUL","TOUR_BUS", "EXRPN","STAYNG","TRANSPORT","FD","PR","TEL_CNVRS","LC","WETHR","FSTVL","WHEEL_CHAIR","INCNVNNC_STTEMNT","ETC","LANG","RESULT_CALL"],
				"colHeader" : ["일자","요일","관광지","일정","투어버스", "체험", "숙박","교통","음식/쇼핑","홍보물","교환",
				               
				               "위치","날씨지리","축제행사","휠체어","불편신고","기타","외국인","합계"],
				"colAlign" : ["center","center", "center", "center","center", "center", "center","center","center","center","center","center","center","center","center","center","center","center","center","center"]
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));*/
}


function datePickers(id)
{
	$(function() {	    
	    $(id).datepicker({
	    	showOn: 'button',
	    	buttonImage : "/resources/images/icon_cal_drop.gif",
	    	buttonImageOnly: true,
	    	dateFormat : 'yy-mm-dd',
	    	monthNamesShort : ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	        dayNamesMin : ['일','월','화','수','목','금','토'],
	    	changeMonth : true,
	        changeYear : true,
	    	showMonthAfterYear : true,
	    	maxDate: "today"  
	      });
	    
	    $(".ui-datepicker-trigger").css("vertical-align","middle");
	});
}

//기간 셀렉트 박스별 상세 검색
function changeTerm()
{
	var d = new Date();
		var currentYear = d.getFullYear();
		var optYear =  "";
		var currentMonth = d.getMonth() + 1;
		optYear +=  "<select id = optDayYear style ='width : 100px; margin-left : 5px;'>";
		optYear +=  "<option value = 'all'> 미선택  </option>";
		for(var i = 2017; i <= currentYear; i++)
		{
			optYear +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
		}
		optYear +=  "</select>";
		
		var optMonth = "";
		optMonth += "<select id = optDayMonth style ='width : 100px; margin-left : 10px;'>";
		optMonth +=  "<option value = 'all'> 미선택  </option>";
		for(var i = 1; i <= 12; i++)
		{
			if(i<10) {
			optMonth +=  "<option value = '0" + i + "'> " + i + "월 </option>";
			} else{
			 optMonth +=  "<option value = '" + i + "'>" + i + "월 </option>";
			}
		}
		optMonth += "</select>";
		
		$("#termDetail").empty();
		$("#termDetail").append(optYear);
		$("#termDetail").append(optMonth);
		$("#optDayYear").val('all');
		$("#optDayMonth").val('all');
		
}

//기간별
function btnOzDayInit_cickEvent(){
	$("#strDay").val(weekStr);
	$("#endDay").val(getDate());
	
}

//검색날짜  초기화
function btn_changeTermInitClick(){
	$("#optDayYear").val("all");
	$("#optDayMonth").val("all");
}

// 초기 데이터 셋팅
function initData()
{
	datePickers("#searchYears");
	datePickers("#strDay");
	datePickers("#endDay");
	$("#searchYears").val(dateStr);
	$("#strDay").val(weekStr);
	$("#endDay").val(dateStr);
	$("#dayReportNote").val("");
	$("#taskSeq").val("");
	
	datePickers("#giganstrDay");
	datePickers("#giganendDay");
	$("#giganstrDay").val(weekStr);
	$("#giganendDay").val(dateStr);
	
	// 일별 oz 버튼 클릭시
	$("#ozDayReport").bind("click", btnOz_clickEvent);
	// 기간별 oz 버튼 클릭시
	$("#ozDayReportDay").bind("click", btnOzDay_clickEvent);
	// 초기화
	$("#ozDayReportInit").bind("click", btnOzInit_clickEvent);
	// 민원 및 협조사항 저장
	$("#dayReportNoteSave").bind("click", dayReportNoteSave_clickEvent);
	// 초기화
	$("#ozDayReportDayInit").bind("click", btnOzDayInit_cickEvent);
	
	//날짜 현재타입으로 초기화
	changeTerm();
	
	//월별검색 초기화 눌렀을때
	$("#excelReportYearInit").bind("click",btn_changeTermInitClick);//
	
	//엓셀 웗별 다운로드
	$("#excelReportYear").bind("click",dayReportMonthList);
}

$(document).ready(function(){
	initData();
});