var g_schdId = null;
var g_usrId = window.sessionStorage.getItem("USR_ID");
var g_cntrCd = window.sessionStorage.getItem("CNTR_CD");
var g_usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
//next value
function getNextValue(){
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wNzEubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectSchedule
function getJsonStrSelectSchedule(schdId, startDt, endDt) {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wNzEuc2NoZWR1bGVWaWV3",
			"map" : {
				"key" : "value",
				"schd_id" : schdId,
				"strt_dt" : startDt,
				"end_dt" : endDt
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_InsertSchedule
function getJsonStrInsertSchedule(schdId){

	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNzEuc2NoZWR1bGVTYXZl",
		"map" : {
			"key" : "value",
			"schd_id" : schdId,
			"usr_id" : $("#optCounselNm").val(),
			"strtDt" : $("#schDate").val()==null?"":fnGetNumeric($("#schDate").val()),
			"endDt" : $("#schDate").val()==null?"":fnGetNumeric($("#schDate").val()),
			"strtTm" : $("#schTimeSt").val()==null?"":fnGetNumeric($("#schTimeSt").val()),
			"endTm" : $("#schTimeEn").val()==null?"":fnGetNumeric($("#schTimeEn").val()),
			"schdGbCd" : $("input:radio[name=optCdbKnd]:checked").val(),
			"cont" : $("#tfCont").val()==null?"":$("#tfCont").val(),
					
			"message" : "등록 되었습니다.",		
			"redirectUrl" : "/web/myinfo/scheduleList.do"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_UpdateSchedule
function getJsonStrUpdateSchedule(schdId){

	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNzEuc2NoZWR1bGVNb2RmeQ==",
		"map" : {
			"key" : "value",
			"schd_id" : schdId,
			"usr_id" : $("#optCounselNm").val(),
			"strtDt" : $("#schDate").val()==null?"":fnGetNumeric($("#schDate").val()),
			"endDt" : $("#schDate").val()==null?"":fnGetNumeric($("#schDate").val()),
			"strtTm" : $("#schTimeSt").val()==null?"":fnGetNumeric($("#schTimeSt").val()),
			"endTm" : $("#schTimeEn").val()==null?"":fnGetNumeric($("#schTimeEn").val()),
			"schdGbCd" : $("input:radio[name=optCdbKnd]:checked").val(),
			"cont" : $("#tfCont").val()==null?"":$("#tfCont").val(),
					
			"message" : "수정 되었습니다.",		
			"redirectUrl" : "/web/myinfo/scheduleForm.do?id="+schdId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_DeleteSchedule
function getJsonStrDeleteSchedule(schdId){

	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b20wNzEuc2NoZWR1bGVEZWw=",
		"map" : {
			"key" : "value",
			"schd_id" : schdId,
			"message" : "삭제 되었습니다.",	
			"redirectUrl" : "/web/myinfo/scheduleList.do"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function chkScheduleSpec(){
	
	var rMsg = "";
	var cntMsg = 0;
	if($("#schDate").val() == ""){
		rMsg += "일자을 입력해주세요.";
		cntMsg++;
	}
	
	if($("#tfMainRcvCont").val() == ""){
		if(cntMsg > 0){
			rMsg += "\n\n";
		}
		rMsg += "내용을 입력해주세요.";
		cntMsg++;
	}
	
	if($("input:radio[name=optCdbKnd]:checked").val() == "all"){
		if(cntMsg > 0){
			rMsg += "\n\n";
		}
		rMsg += "구분을 선택하시기 바랍니다.";
		cntMsg++;
	}
	
	return rMsg;
}

function btnSchList_clickEvent(){
	location.href= getContextPath() + "/web/myinfo/scheduleList.do";
}

function btnSave_clickEvent(){
	
	var rMsg = chkScheduleSpec();
	
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	if(!confirm("등록하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/myinfo/insertSchedule.do",
		data : "pJson=" + getNextValue(),
		success : function(data){
			
			gAppendHidden("writeForm", "pJson", getJsonStrInsertSchedule(data.SCHD_ID));
			var rtnSubmit = gSubmitPost("writeForm", false);		
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
		
	});
}

function btnMod_clickEvent(){
	var rMsg = chkScheduleSpec();
	
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	if(!confirm("수정하시겠습니까?"))
		return;
	gAppendHidden("writeForm", "pJson", getJsonStrUpdateSchedule($("#tfId").val()));
	var rtnSubmit = gSubmitPost("writeForm", false);		
		
}

function btnDel_clickEvent(){
	if(!confirm("삭제하시겠습니까?"))
		return;
	gAppendHidden("writeForm", "pJson", getJsonStrDeleteSchedule($("#tfId").val()));
	var rtnSubmit = gSubmitPost("writeForm", false);		
		
}
/**
 * 기능 추가
 */
function initEvent(){
	datePicker("#schDate");
	 
	$("#schTimeSt, #schTimeEn").timepicki({
	 	reset: true,
		show_meridian:false,
		min_hour_value:0,
		max_hour_value:23,
		step_size_minutes:15,
		overflow_minutes:false
	});
}
/**
 * 상세보기
 */
function schView(){
	$("#btnMod, #btnSave, #btnDel").hide();
	$("#schTimeSt, #schTimeEn, #optCdbKnd,#tfCont").attr("disabled",true);
}


$(document).ready(function() {
    	$('input:radio[name="optCdbKnd"]').filter('[value="020000"]').attr('checked', true);
	$("#schDate").val(getDate());
	
	$("#schTimeSt").val("07:00");
	$("#schTimeEn").val("22:00");
	
	$("#btnSchList").bind("click",btnSchList_clickEvent);
	g_schdId = $("#tfId").val();
	
	setObjSelectBoxWithCode("optCdbKnd", "전체", "","CHILD","90075", "");
	
	//setSelectBoxWithMsgUser();
	
	$("#btnMod").hide();
	$("#btnDel").hide();
	$("#btnSave").hide();
	
	
	if(g_usrGrdCd <"030100"){
		$("#optCdbKnd").val("010000");
		$("#optCdbKnd").attr("disabled",true);
		$("#optCounselNm").attr("disabled",true);
		
	}
	
	if(g_schdId == ""){
		initEvent();
		
		$("#btnMod").hide();
		$("#btnDel").hide();
		$("#btnSave").show().bind("click",btnSave_clickEvent);
	}else{
	    	$("#optCounselNm").prop("disabled",true);
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/myinfo/updateSchedule.do",
			data : "pJson=" + getJsonStrSelectSchedule(g_schdId, sessionStorage.getItem("schdStartDt"), sessionStorage.getItem("schdEndDt")),
			success : function(data){
			        if(data.FDISPLAY=='010000')
				    $('input:radio[name="optCdbKnd"]').filter('[value="010000"]').attr('checked', true);
				else if(data.FDISPLAY=='020000')
				    $('input:radio[name="optCdbKnd"]').filter('[value="020000"]').attr('checked', true);
				/*else
				    $('input:radio[name="optCdbKnd"]').filter('[value="all"]').attr('checked', true);*/
				
			    	setSelectBoxWithAgent("optCounselNm", "전체", "CHILD",data.CRT_USR_ID,"","","","","" );
				if(data.CRT_USR_ID == g_usrId){
				    
				    	
					if(data.FDISPLAY=="200000"){
						schView();
						/*$("#btnMod").html("변경하기");
						$("#btnMod").show().bind("click",function(){
							location.href= getContextPath() + "/web/myinfo/vcatnManage.do";
						});*/
						$("#btnMod").hide();
						$("#btnDel").hide();
					}else{
					initEvent();
					$("#btnSave").hide();
					
					$("#btnMod").show().bind("click",btnMod_clickEvent);
					$("#btnDel").show().bind("click",btnDel_clickEvent);
					if(g_usrGrdCd>010100)
					$("#optCounselNm").attr("disabled",false);
					}
				}else{
					schView();
				}
				$("#schDate").val(data.STRT_DT);
				if(data.STRT_TM != null){
					
					$("#schTimeSt").val(timeFormat(data.STRT_TM).substring(0,5));
				}
				if(data.END_TM != null){
					$("#schTimeEn").val(timeFormat(data.END_TM).substring(0,5));
				}
				$("#optCdbKnd").val(data.SCHD_GB_CD);
				$("#tfCont").val(data.CONT);
			},
			error : function(data, status, err){
				networkErrorHandler(data, status, err);
			}
		});
	}
	setSelectBoxWithAgent("optCounselNm", "전체", "CHILD",g_usrId,"","","","","" );
});