var gActCdArr = [];
var gActNmArr = [];
 
var gCtgCdArr = [];
var gCtgNmArr = [];

var gUsrCdArr = [];
var gUsrNmArr = [];
 
// 그리드 설정 정보
var gActColNames = [];
var gActColModel = [];
var gActGroupHeaders = [];
 
var gCtgColNames = [];
var gCtgColModel = [];
var gCtgGroupHeaders = [];

//엑셀
var eActColWidth = [];
var eActColNames = [];
var eActColAlign = [];
var eActGroupHeaders = [];

var eCtgColWidth = [];
var eCtgColNames = [];
var eCtgColAlign = [];
var eCtgGroupHeaders = [];

// 관리자 여부
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");
 
//파라미터 셋팅 usrList
function getJsonStrUserList()
{
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "b20wMDEuc2VsZWN0TGlzdA==",//om001.selectList
        "map" : {
            "key" : "value",
            "cntr_cd" : "010000",
            "notuse" : false,
            "sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
            "sord" : "asc", 
                }
    }; 
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}
 
// 처리유형코드리스트
function getJsonActCdList()
{
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
//        "mi" : "c3QwMjEuYWN0Q29kZUxpc3Q=", 	// st021.actCodeList
        "mi" : "c20wMDIuYWN0VHlwZUxpc3Q=", 	// sm002.actTypeList
        "map" : {
        "key" : "value",
//        "tp_cd" : "90014"
            }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
 
//상담유형코드리스트
function getJsonCtgCdList()
{
	/*
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMjIuY3RnQ29kZUxpc3Q=",
		"map" : {
			"key" : "value",
			"ctg_lvl" : "1"
		}
	};
	*/
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMjAuc2VsZWN0Q29kZUxpc3Q=",
			"map" : {
				"key" : "value",
				"schStartDt" : $("#cslCntD_schDay").val().replace(/-/g, ""),
				"schEndDt" :$("#cslCntD_schDay").val().replace(/-/g, ""),
			}
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
 
// 처리유형별 현황
function getJsonStsCounselingCntDayAct() {
 
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "Y2gwMDFfc3Quc3RzQ291bnNlbGluZ0NudERheUFjdA==",
        "map" : {
            "key" : "value" ,
            "seltDate" : $("#cslCntD_schDay").val().replace(/-/g, ""), 
            "gActCdArr" : gActCdArr,
            "usrGrdCd" : usr_grd_cd,
            "chkHoliday" : $("#cslCntD_chkHoliday").is(":checked") ? "Y" : "N"
        }
    };
     
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

// 상담유형별 현황
function getJsonStsCounselingCntDayCtg() {
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "Y2gwMDFfc3Quc3RzQ291bnNlbGluZ0NudERheUN0Zw==",
        "map" : {
            "key" : "value" ,
            "seltDate" : $("#cslCntD_schDay").val().replace(/-/g, ""), 
            "gCtgCdArr" : gCtgCdArr,
            "gGridType" : "Ctg",
            "usrGrdCd" : usr_grd_cd,
            "chkHoliday" : $("#cslCntD_chkHoliday").is(":checked") ? "Y" : "N"
        }
    };
     
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

// 콜백처리 현황
function getJsonStsCounselingCntDayCallback() {
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDFfc3Quc3RzQ291bnNlbGluZ0NudERheUN0Zw==",
			"map" : {
				"key" : "value" ,
				"seltDate" : $("#cslCntD_schDay").val().replace(/-/g, ""), 
				"gCtgCdArr" : gCtgCdArr,
	            "gGridType" : "Callback",
	            "usrGrdCd" : usr_grd_cd,
	            "chkHoliday" : $("#cslCntD_chkHoliday").is(":checked") ? "Y" : "N"
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 초기화 함수
function init(){
 
    $("#cslCntD_schDay").val(getAddDate(getDate(),-1)); 
    stsDaySearch();
}

function secondsToTime(seconds) {
	var isMinus = "Y";
	if(seconds.indexOf("-") == -1){ //양수 
		isMinus = "N";
	}
	
	seconds = seconds.replaceAll(",","").replaceAll("-","");
	
	var hour = parseInt(seconds/3600);
	var min = parseInt((seconds%3600)/60);
	var sec = seconds%60;
	
	if(hour < 10){
		hour = "0" + hour;
	}
	if(isMinus == "Y"){
		hour = "- " + hour;
	}
	if(min < 10){
		min = "0" + min;
	}
	if(sec < 10){
		sec = "0" + sec;
	}
	return hour+" : "+min+" : " + sec;
}

// 소수점 2자리 반올림 계산
function fnRound(num1,num2){
	var num1 = parseInt(num1.replaceAll(",",""));
	var num2 = parseInt(num2.replaceAll(",",""));
	var result = 0;
	if(num2 == 0){
		result = result.toFixed(1);
	}else{
		result=  ((num1/num2)*100).toFixed(1);
	}
	return result;
}

// 빼기 계산
function fnMinus(num1,num2,roundYN){
	var num1;
	var num2;
	var result = 0;
	if(roundYN == "N"){
		num1 = parseInt(num1.replaceAll(",",""));
		num2 = parseInt(num2.replaceAll(",",""));
		result = num1 - num2;
	}else{
		num1 = parseFloat(num1.replaceAll(",",""));
		num2 = parseFloat(num2.replaceAll(",",""));
		result = (num1 - num2).toFixed(1);
	}
	return numberFormat(result);
}

// CPH(1시간 1인당 응답호) 계산 : 총처리건수(인바운드 응답호 + 콜백 처리 건수)/상담인원/근무시간(8시간)
function fnCPH(num1,num2){
	var num1 = parseInt(num1.replaceAll(",",""));
	var num2 = parseInt(num2.replaceAll(",",""));
	var result = 0;
	if(num2 == 0){
		result = result.toFixed(1);
	}else{
		result = (num1 / num2 / 8).toFixed(1);
	}
	return numberFormat(result);
}

// CPD(1일 1인당 응답호) 계산 : 총처리건수(인바운드 응답호 + 콜백 처리 건수)/상담인원
function fnCPD(num1,num2){
	var num1 = parseInt(num1.replaceAll(",",""));
	var num2 = parseInt(num2.replaceAll(",",""));
	var result = 0;
	if(num2 == 0){
		result = result.toFixed(1);
	}else{
		result = (num1 / num2).toFixed(1);
	}
	return numberFormat(result);
}

// 더하기 계산
function fnPlus(num1,num2){
	var num1 = parseInt(num1.replaceAll(",",""));
	var num2 = parseInt(num2.replaceAll(",",""));
	var result = 0;
	result = num1 + num2;
	return numberFormat(result);
}

function setStatistics_tbl2(){
	$.ajax({
        type : "post",
        dataType: "json",
        async : false,
        url : getContextPath() + "/ajax/statistics/stsCounselingCntDay.do",
        data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "c3QwMjAuc3RzQ291bnNlbGluZ0NudERheQ==", {
        	"schDt" : $("#cslCntD_schDay").val().replace(/-/g, ""),
        	"chkHoliday" : $("#cslCntD_chkHoliday").is(":checked") ? "Y" : "N"
        }),
        success : function(data) {
        	
        	$.each(data, function(key, state) {
//        		console.log(state.GB+" ("+state.GBNM+")");
    			$("#cslCntD_"+state.GB+"_ivr_in_call").html(state.IVR_IN_CALL);
    			$("#cslCntD_"+state.GB+"_ivr_ans_call").html(state.IVR_ANS_CALL);
    	        $("#cslCntD_"+state.GB+"_ivr_abnd_call").html(fnMinus(state.IVR_IN_CALL,state.IVR_ANS_CALL,"N"));
    	        $("#cslCntD_"+state.GB+"_ivr_ans_rate").html(fnRound(state.IVR_ANS_CALL,state.IVR_IN_CALL));
    	        
    	        $("#cslCntD_"+state.GB+"_cti_in_call").html(state.CTI_IN_CALL);
    	        $("#cslCntD_"+state.GB+"_cti_ans_call").html(state.CTI_ANS_CALL);
    	        $("#cslCntD_"+state.GB+"_cti_ans_rate").html(fnRound(state.CTI_ANS_CALL,state.CTI_IN_CALL));
    	        $("#cslCntD_"+state.GB+"_cti_abnd_call").html(state.CTI_ABND_CALL);
    	        $("#cslCntD_"+state.GB+"_cti_callbck").html(state.CTI_CALLBCK);
    	        $("#cslCntD_"+state.GB+"_cti_sec20succ_call").html(state.CTI_SEC20SUCC_CALL);
    	        $("#cslCntD_"+state.GB+"_cti_sec20succ_rate").html(state.CTI_SEC20SUCC_RATE);
    	         
    	        $("#cslCntD_"+state.GB+"_in_call").html(state.IN_CALL);
    	        $("#cslCntD_"+state.GB+"_ans_call").html(state.ANS_CALL);
    	        $("#cslCntD_"+state.GB+"_ans_rate").html(fnRound(state.ANS_CALL,state.IN_CALL));
    	        $("#cslCntD_"+state.GB+"_abnd_call").html(state.ABND_CALL);
    	        $("#cslCntD_"+state.GB+"_tota_call_tm").html(secondsToTime(state.TOTA_CALL_TM));
    	        $("#cslCntD_"+state.GB+"_avrg_call_tm").html(secondsToTime(state.AVRG_CALL_TM));
    	        $("#cslCntD_"+state.GB+"_ob_succ_call_callback").html(state.OB_SUCC_CALL_CALLBACK);
    	        $("#cslCntD_"+state.GB+"_ob_succ_call").html(state.OB_SUCC_CALL);
    	        $("#cslCntD_"+state.GB+"_cnsl_prsn").html(state.CNSL_PRSN);
    	        $("#cslCntD_"+state.GB+"_cph").html(fnCPH(fnPlus(state.ANS_CALL,state.OB_SUCC_CALL),state.CNSL_PRSN));
    	        $("#cslCntD_"+state.GB+"_cpd").html(fnCPD(fnPlus(state.ANS_CALL,state.OB_SUCC_CALL),state.CNSL_PRSN)); 
    	        $("#cslCntD_"+state.GB+"_tota_act_scnt").html(fnPlus(state.ANS_CALL,state.OB_SUCC_CALL));
    	         
    	        $("#cslCntD_"+state.GB+"_call_tntr_scnt").html(state.CALL_TNTR_SCNT);
    	        $("#cslCntD_"+state.GB+"_call_tntr_rate").html(fnRound(state.CALL_TNTR_SCNT,state.ANS_CALL)); 
    	        
    	        $("#cslCntD_"+state.GB+"_callbck_rcv").html(state.CALLBCK_RCV);
    	        $("#cslCntD_"+state.GB+"_callbck_act").html(state.CALLBCK_ACT);
    	        $("#cslCntD_"+state.GB+"_callbck_act_rate").html(fnRound(state.CALLBCK_RCV,state.CALLBCK_ACT));
    	        
    	        $("#cslCntD_"+state.GB+"_sms_snd_scnt").html(state.SMS_SND_SCNT);
    	        
    	        $("#cslCntD_"+state.GB+"_fax_snd_succ").html(state.FAX_SND_SUCC); 
    	        $("#cslCntD_"+state.GB+"_fax_snd_fail").html(state.FAX_SND_FAIL);
    	        $("#cslCntD_"+state.GB+"_fax_rcv_succ").html(state.FAX_RCV_SUCC);
            });
        	
        	$("#cslCntD_TDYD_ivr_ans_rate").html(fnMinus($("#cslCntD_TD_ivr_ans_rate").html(), $("#cslCntD_YD_ivr_ans_rate").html()));
        	$("#cslCntD_TDYD_cti_ans_rate").html(fnMinus($("#cslCntD_TD_cti_ans_rate").html(), $("#cslCntD_YD_cti_ans_rate").html()));
        	$("#cslCntD_TDYD_ans_rate").html(fnMinus($("#cslCntD_TD_ans_rate").html(), $("#cslCntD_YD_ans_rate").html()));
        	$("#cslCntD_TDYD_cph").html(fnMinus($("#cslCntD_TD_cph").html(), $("#cslCntD_YD_cph").html()));
        	$("#cslCntD_TDYD_cpd").html(fnMinus($("#cslCntD_TD_cpd").html(), $("#cslCntD_YD_cpd").html()));
        	
        	$("#cslCntD_TDYM_ivr_ans_rate").html(fnMinus($("#cslCntD_TD_ivr_ans_rate").html(), $("#cslCntD_YM_ivr_ans_rate").html()));
        	$("#cslCntD_TDYM_cti_ans_rate").html(fnMinus($("#cslCntD_TD_cti_ans_rate").html(), $("#cslCntD_YM_cti_ans_rate").html()));
        	$("#cslCntD_TDYM_ans_rate").html(fnMinus($("#cslCntD_TD_ans_rate").html(), $("#cslCntD_YM_ans_rate").html()));
        	$("#cslCntD_TDYM_cph").html(fnMinus($("#cslCntD_TD_cph").html(), $("#cslCntD_YM_cph").html()));
        	$("#cslCntD_TDYM_cpd").html(fnMinus($("#cslCntD_TD_cpd").html(), $("#cslCntD_YM_cpd").html()));
        },
	    error : function(data, status, err) {
	        networkErrorHandler(data, status, err);
	    }
	});
}

function setStatistics_tbl(){
	$.ajax({
        type : "post",
        dataType: "json",
        async : false,
        url : getContextPath() + "/ajax/statistics/stsCounselingCntDay.do",
        data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "c3QwMjAuc3RzQ291bnNlbGluZ0NudERheQ==", {
        	"schDt" : $("#cslCntD_schDay").val().replace(/-/g, "")
        }),
        success : function(data) {
        	$.each(data, function(key, state) {
    	        $("#cslCntD_"+state.GB+"_ivr_in_call").html(state.IVR_IN_CALL);
    	        $("#cslCntD_"+state.GB+"_ivr_ans_call").html(state.IVR_ANS_CALL);
    	        $("#cslCntD_"+state.GB+"_ivr_abnd_call").html(state.IVR_ABND_CALL);
    	        $("#cslCntD_"+state.GB+"_ivr_ans_rate").html(state.IVR_ANS_RATE);
    	        
    	        $("#cslCntD_"+state.GB+"_cti_in_call").html(state.CTI_IN_CALL);
    	        $("#cslCntD_"+state.GB+"_cti_ans_call").html(state.CTI_ANS_CALL);
    	        $("#cslCntD_"+state.GB+"_cti_ans_rate").html(state.CTI_ANS_RATE);
    	        $("#cslCntD_"+state.GB+"_cti_abnd_call").html(state.CTI_ABND_CALL);
    	        $("#cslCntD_"+state.GB+"_cti_callbck").html(state.CTI_CALLBCK);
    	        $("#cslCntD_"+state.GB+"_cti_sec20succ_call").html(state.CTI_SEC20SUCC_CALL);
    	        $("#cslCntD_"+state.GB+"_cti_sec20succ_rate").html(state.CTI_SEC20SUCC_RATE);
    	         
    	        $("#cslCntD_"+state.GB+"_in_call").html(state.IN_CALL);
    	        $("#cslCntD_"+state.GB+"_ans_call").html(state.ANS_CALL);
    	        $("#cslCntD_"+state.GB+"_ans_rate").html(state.ANS_RATE);
    	        $("#cslCntD_"+state.GB+"_abnd_call").html(state.ABND_CALL);
    	        $("#cslCntD_"+state.GB+"_tota_call_tm").html(secondsToTime(state.TOTA_CALL_TM));
    	        $("#cslCntD_"+state.GB+"_avrg_call_tm").html(secondsToTime(state.AVRG_CALL_TM));
    	        $("#cslCntD_"+state.GB+"_ob_succ_call_callback").html(state.OB_SUCC_CALL_CALLBACK);
    	        $("#cslCntD_"+state.GB+"_ob_succ_call").html(state.OB_SUCC_CALL);
    	        $("#cslCntD_"+state.GB+"_cnsl_prsn").html(state.CNSL_PRSN);
    	        $("#cslCntD_"+state.GB+"_cph").html(state.CPH);
    	        $("#cslCntD_"+state.GB+"_cpd").html(state.CPD); 
    	        $("#cslCntD_"+state.GB+"_tota_act_scnt").html(state.TOTA_ACT_SCNT);
    	         
    	        $("#cslCntD_"+state.GB+"_call_tntr_scnt").html(state.CALL_TNTR_SCNT);
    	        $("#cslCntD_"+state.GB+"_call_tntr_rate").html(state.CALL_TNTR_RATE); 
    	        
    	        $("#cslCntD_"+state.GB+"_callbck_rcv").html(state.CALLBCK_RCV);
    	        $("#cslCntD_"+state.GB+"_callbck_act").html(state.CALLBCK_ACT);
    	        $("#cslCntD_"+state.GB+"_callbck_act_rate").html(state.CALLBCK_ACT_RATE);
    	        
    	        $("#cslCntD_"+state.GB+"_sms_snd_scnt").html(state.SMS_SND_SCNT);
    	        
    	        $("#cslCntD_"+state.GB+"_fax_snd_succ").html(state.FAX_SND_SUCC); 
    	        $("#cslCntD_"+state.GB+"_fax_snd_fail").html(state.FAX_SND_FAIL);
    	        $("#cslCntD_"+state.GB+"_fax_rcv_succ").html(state.FAX_RCV_SUCC);    
            });
        },
	    error : function(data, status, err) {
	        networkErrorHandler(data, status, err);
	    }
	});
}

// 시간대별 건수
function setTime_tbl(){
	$("#cslCntD_tblStsCounselingCntDayTime td").empty();
	
	$.ajax({
        type : "post",
        dataType: "json",
        async : false,
        url : getContextPath() + "/ajax/statistics/stsCounselingCntDay.do",
        data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y2gwMDFfc3Quc2VsZWN0Q25zbEhvbGk=", {
        	"strtDt" : $("#cslCntD_schDay").val().replace(/-/g, ""),
        	"endDt" : $("#cslCntD_schDay").val().replace(/-/g, ""),
        	"usrGrdCd" : usr_grd_cd,
        	"chkHoliday" : $("#cslCntD_chkHoliday").is(":checked") ? "Y" : "N"
        }),
        success : function(data) {
        	$.each(data, function(key, state) {
        		$("#day_"+key).html(state);
 	        });
        },
	    error : function(data, status, err) {
	        networkErrorHandler(data, status, err);
	    }
	});
}
 
function setGrid(){
 
	gActCdArr = [];
	gActNmArr = [];
	 
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/code/actCodeList.do",
	    data : "pJson=" + getJsonActCdList(),
	    success : function(data) { 
	        // param값을 JSON으로 파싱
	 
	        $.each(data, function(key, state) {
	            gActCdArr.push(state.CD);
	            gActNmArr.push(state.CD_NM); 
	        });
	    },
	    error : function(data, status, err) {
	        networkErrorHandler(data, status, err);
	    }
	}); 
	 
	gCtgCdArr = [];
	gCtgNmArr = [];
	 
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/code/ctgCodeList.do",
	    data : "pJson=" + getJsonCtgCdList(),
	    success : function(data) { 
	        // param값을 JSON으로 파싱 
	        $.each(data, function(key, state) {
	            gCtgCdArr.push(state.CTG_CD);
	            gCtgNmArr.push(state.CTG_CD_NM);
	        });
//	        gCtgCdArr.push("999999999"); // 미입력건
//	        gCtgNmArr.push("미입력");
	    },
	    error : function(data, status, err) {
	        networkErrorHandler(data, status, err);
	    }
	}); 
	
	
	// 처리유형별
	// 그리드 설정 정보
	gActColNames = [];
	gActColModel = [];
	gActGroupHeaders = [];
	
	// 엑셀 설정 정보
	eActColWidth = [];
	eActColNames = [];
	eActColAlign = [];
	eActGroupHeaders = [];
	 
	gActColNames.push("날짜", "구분");
	gActColNames.push("계"); 
	gActColModel.push(
	        {"name" : "DAY", width : 80, align : "center", sortable : false},
	        {"name" : "GB", width : 50, align : "center", sortable : false},
	        {"name" : "TOT", width : 60, align : "right", sortable : false}
	);
	
	eActColWidth.push(10,10,10);
	eActColNames.push("DAY","GB","TOT");
	eActGroupHeaders.push("날짜","구분","계");
    eActColAlign.push("center","center","center");
	 
	for(var i = 0  ; i < gActCdArr.length; i++){ 
	 
	    if(gActNmArr[i]=="상담후호전환") gActColNames.push("상담후<br/>호전환");
	    else if(gActNmArr[i]=="담당자전환") gActColNames.push("담당자<br/>전환");
	    else gActColNames.push(gActNmArr[i]);
	    gActColModel.push( 
	            {"name" : gActCdArr[i], width : 65, align : "right", sortable : false}
	    );
	    
	    eActColWidth.push(10);
	    eActColNames.push(gActCdArr[i]);
	    eActGroupHeaders.push(gActNmArr[i]);
	    eActColAlign.push("center");
	}
	 
	
	// 상담유형별
	// 그리드 설정 정보
	gCtgColNames = [];
	gCtgColModel = [];
	gCtgGroupHeaders = [];
	
	// 엑셀 설정 정보
	eCtgColWidth = [];
	eCtgColNames = [];
	eCtgColAlign = [];
	eCtgGroupHeaders = [];
	 
	gCtgColNames.push("날짜", "구분");
	gCtgColNames.push("계"); 
	gCtgColModel.push(
	        {"name" : "DAY", width : 80, align : "center", sortable : false},
	        {"name" : "GB", width : 50, align : "center", sortable : false},
	        {"name" : "TOT", width : 60, align : "right", sortable : false}
	);
	
	eCtgColWidth.push(10,10,10);
	eCtgColNames.push("DAY","GB","TOT");
	eCtgGroupHeaders.push("날짜","구분","계");
    eCtgColAlign.push("center","center","center");
	 
	for(var i = 0  ; i < gCtgCdArr.length; i++){ 
	 
	    if(gCtgNmArr[i]=="문화체육관광") gCtgColNames.push("문화체육<br/>관광");
	    else gCtgColNames.push(gCtgNmArr[i]);
	    gCtgColModel.push( 
	        {"name" : gCtgCdArr[i].toUpperCase(), width : 75, align : "right", sortable : false}
	    );
	    
	    eCtgColWidth.push(10);
	    eCtgColNames.push(gCtgCdArr[i].toUpperCase());
	    eCtgGroupHeaders.push(gCtgNmArr[i]);
	    eCtgColAlign.push("center");
    }
	
}
 
//조회 버튼 클릭 이벤트 
function stsDaySearch(){
	// 일일업무현황 배치 만들기 전까지 0으로 셋팅
	$("#cslCntD_tblStsCounselingCntDay td").html("0");
	
	//setStatistics_tbl(); 	// 배치 완성되면 setStatistics_tbl2() 지우고 해당 함수 주석해제 
	setStatistics_tbl2();	// 배치 미완성으로 인해, 산술식 script에서 직접 계산
    setGrid();
    grid("Act", getJsonStsCounselingCntDayAct(), gActColNames, gActColModel, gActGroupHeaders);
    grid("Ctg", getJsonStsCounselingCntDayCtg(), gCtgColNames, gCtgColModel, gCtgGroupHeaders);
    grid("Callback", getJsonStsCounselingCntDayCallback(), gCtgColNames, gCtgColModel, gCtgGroupHeaders);
    setTime_tbl();	// 시간대별 건수
}
 
//그리드 동적으로 만들기 위한 함수
function grid(gb, jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
    if(gb=="Act"){
 
        $("#cslCntD_dvGridAreaAct").empty();
        var tb = "<table id = 'cslCntD_tblStsCounselingCntDayAct'></table>"; 
        $("#cslCntD_dvGridAreaAct").append(tb);
         
        $("#cslCntD_tblStsCounselingCntDayAct").jqGrid(
        {
            url : getContextPath() + "/ajax/statistics/counselingCntDay.do",
            datatype : "json",
            mtype : "POST",
            postData : {
            pJson : jsonValue
            },
            jsonReader :
            {
            repeatitems: false
            },
            colNames : colNamesValue,
            colModel : colModelValue,
            gridview : true,
            hidegrid : false,
            shrinkToFit : false,
            loadonce : false,
            scrollOffset : 0,
            height : "255",
            width : "100%",     
            autowidth : true,
            pgbuttons : true,
            rownumbers : false,
            rownumWidth : 30,
            rowNum : "10000",
            multiselect : false,
            emptyrecords : "0",
            caption : "",
            loadui : "enable",
            viewrecords : true,
            //footerrow  : true,
            //userDataOnFooter : true,
            loadComplete: function() {
            	var ids = $("#cslCntD_tblStsCounselingCntDayAct").getDataIDs() ;
            
                $.each(ids, function(idx, rowId) {
                	var rowData = $("#cslCntD_tblStsCounselingCntDayAct").getRowData(rowId) ;
                    if(rowData.GB =="합계"){
                    	$("#cslCntD_tblStsCounselingCntDayAct").setRowData( rowId ,false,{background:"#EAEAEA"});
                    }
                });
            },
        }).jqGrid('setGroupHeaders', 
        {
          useColSpanStyle : true, 
          groupHeaders : groupHeadersValue
        }).jqGrid('setFrozenColumns'); 
    }
 
    if(gb=="Ctg"){
 
	    $("#cslCntD_dvGridAreaCtg").empty();
	    var tb = "<table id = 'cslCntD_tblStsCounselingCntDayCtg'></table>"; 
	    $("#cslCntD_dvGridAreaCtg").append(tb);
	 
	    $("#cslCntD_tblStsCounselingCntDayCtg").jqGrid(
	    {
	        url : getContextPath() + "/ajax/statistics/counselingCntDay.do",
	        datatype : "json",
	        mtype : "POST",
	        postData : {
	        pJson : jsonValue
	        },
	        jsonReader :
	        {
	        repeatitems: false
	        },
	        colNames : colNamesValue,
	        colModel : colModelValue,
	        sortname : "RCV_DT",
	        sortorder : "ASC",
	        gridview : true,
	        hidegrid : false,
	        shrinkToFit : false,
	        loadonce : false,
	        scrollOffset : 0,
	        height : "261",
	        width : "100%",     
	        autowidth : true,
	        pgbuttons : true,
	        rownumbers : false,
	        rownumWidth : 30,
	        rowNum : "10000",
	        multiselect : false,
	        emptyrecords : "0",
	        caption : "",
	        loadui : "enable",
	        viewrecords : true,
	        //footerrow  : true,
	        //userDataOnFooter : true,
	        loadComplete: function() {
	        	var ids = $("#cslCntD_tblStsCounselingCntDayCtg").getDataIDs() ;
	                
	            $.each(ids, function(idx, rowId) {
	            	var rowData = $("#cslCntD_tblStsCounselingCntDayCtg").getRowData(rowId) ;
	                if(rowData.GB =="합계"){
	                	$("#cslCntD_tblStsCounselingCntDayCtg").setRowData( rowId ,false,{background:"#EAEAEA"});
	                }
	                }) ;
	             },
	        }).jqGrid('setGroupHeaders', 
	        {
	          useColSpanStyle : true, 
	          groupHeaders : groupHeadersValue
	        }).jqGrid('setFrozenColumns');
    }
    
    if(gb=="Callback"){
    	$("#cslCntD_dvGridAreaCallback").empty();
	    var tb = "<table id = 'cslCntD_tblStsCounselingCntDayCallback'></table>"; 
	    $("#cslCntD_dvGridAreaCallback").append(tb);
	 
	    $("#cslCntD_tblStsCounselingCntDayCallback").jqGrid(
	    {
	        url : getContextPath() + "/ajax/statistics/counselingCntDay.do",
	        datatype : "json",
	        mtype : "POST",
	        postData : {
	        pJson : jsonValue
	        },
	        jsonReader :
	        {
	        repeatitems: false
	        },
	        colNames : colNamesValue,
	        colModel : colModelValue,
	        sortname : "RCV_DT",
	        sortorder : "ASC",
	        gridview : true,
	        hidegrid : false,
	        shrinkToFit : false,
	        loadonce : false,
	        scrollOffset : 0,
	        height : "261",
	        width : "100%",     
	        autowidth : true,
	        pgbuttons : true,
	        rownumbers : false,
	        rownumWidth : 30,
	        rowNum : "10000",
	        multiselect : false,
	        emptyrecords : "0",
	        caption : "",
	        loadui : "enable",
	        viewrecords : true,
	        //footerrow  : true,
	        //userDataOnFooter : true,
	        loadComplete: function() {
	        	var ids = $("#cslCntD_tblStsCounselingCntDayCallback").getDataIDs() ;
	                
	            $.each(ids, function(idx, rowId) {
	            	var rowData = $("#cslCntD_tblStsCounselingCntDayCtg").getRowData(rowId) ;
	                if(rowData.GB =="합계"){
	                	$("#cslCntD_tblStsCounselingCntDayCallback").setRowData( rowId ,false,{background:"#EAEAEA"});
	                }
	                }) ;
	             },
	        }).jqGrid('setGroupHeaders', 
	        {
	          useColSpanStyle : true, 
	          groupHeaders : groupHeadersValue
	        }).jqGrid('setFrozenColumns');
    }
 
}
 
/* 데이타가져오기 이벤트 */
function stsDayBatch() {
    if($("#cslCntD_schDay").val().trim() == ""){
        alert("데이타가져오기를 위한 조회일자를 입력하세요."); 
        return;
    }else if($("#cslCntD_schDay").val().replace(/-/gi, "").trim() < "20180311"){
        alert("2018년 3월 11일 이후의 데이타만 가져올 수 있습니다."); 
        return;
    }
 
    var jabDate = $("#cslCntD_schDay").val().replace(/-/gi, "");
    var loginID = window.sessionStorage.getItem("USR_ID");
     
 
////////////////////////////////
    if (confirm($("#cslCntD_schDay").val().trim()+" 데이타가 초기화됩니다. 데이타 가져오기를 실행하시겠습니까?") == true){
    $.ajax({
        type : "post",
        dataType: "json",
        async : false,
        url : getContextPath() + "/ajax/statistics/batchCounselingCntDay.do",
        data : "pJson=" + callOrgBatch(jabDate, loginID),  
        success : function(data){
         
            $.ajax({
            type : "post",
            dataType: "json",
            async : false,
            url : getContextPath() + "/ajax/counsel/orgJobDtm.do",
            data : "pJson=" + getJsonOrgJobData(),
            success : function(data){
                alert("배치실행을 " +data.PROC_ST_NM + "하였습니다."+"\n"+"["+data.ERR_MSG+"]" );
                stsDaySearch();
            },
            error : function(data, status, err) { 
                networkErrorHandler(data, status, err);
            }
        }); 
    },
    error : function(data, status, err) {
        alert("배치실행을 완료하지못하였습니다. 재실행하시기 바랍니다."); 
        networkErrorHandler(data, status, err);
    }
}); 
}
//////////////////////////// 
 
}

//엑셀 다운로드 이벤트
function btnAllExcelSave(){
	var title = '일일업무현황('+ $("#cslCntD_schDay").val() +')';
	
	var wb = XLSX.utils.book_new();

	var ws1 = XLSX.utils.table_to_sheet(document.getElementById('cslCntD_tblStsCounselingCntDay'));
	XLSX.utils.book_append_sheet(wb, ws1, "일일업무현황");

	var ws2 = XLSX.utils.table_to_sheet(document.getElementById('gbox_cslCntD_tblStsCounselingCntDayAct'));
	XLSX.utils.book_append_sheet(wb, ws2, "처리유형별 상담실적");
	
	var ws3 = XLSX.utils.table_to_sheet(document.getElementById('gbox_cslCntD_tblStsCounselingCntDayCtg'));
	XLSX.utils.book_append_sheet(wb, ws3, "상담유형별현황");
	
	var ws4 = XLSX.utils.table_to_sheet(document.getElementById('gbox_cslCntD_tblStsCounselingCntDayCallback'));
	XLSX.utils.book_append_sheet(wb, ws4, "콜백처리현황");
	
	var ws5 = XLSX.utils.table_to_sheet(document.getElementById('cslCntD_tblStsCounselingCntDayTime'));
	XLSX.utils.book_append_sheet(wb, ws5, "시간대별 상담현황");
	
	XLSX.writeFile(wb, title+'.xlsx');
}
	
// 데이타가져오기
function callOrgBatch(jabDate, loginID){
    var loParam = {
            "qt" : "c2VsZWN0TGlzdA==",
            "mi" : "b2gwNTAuYmF0Y2hDb3Vuc2VsaW5nQ250RGF5",
            "map" : {
                "key" : "value", 
                "jabDate": jabDate,
                "loginID": loginID,
            }
        };
        console.log(JSON.stringify(loParam));
        return encodeURIComponent(JSON.stringify(loParam));
}
 
function getJsonOrgJobData(){
    var loParam = {
            "qt" : "c2VsZWN0",
            "mi" : "b2gwNTAuam9iRGF0YQ==",
            "map" : {
                "key" : "value",
                "wrk_nm" : "PR_DAILY_COUNSELING"
            }
        };
        console.log(JSON.stringify(loParam));
        return encodeURIComponent(JSON.stringify(loParam));
}
 
// 출력 이벤트 
function sayPrint(){
    window.open("http://" + window.location.hostname + ":8090/ClipReport4/stsCounselingCntDay.jsp?schDt="+$("#cslCntD_tdate").val().replace(/-/g, ""));
}
 
$(document).ready(function(){
 
    var isMngr= false;
    switch(usr_grd_cd) {
      //case '020100'://파트매니저
      case '030100'://그룹매니저
      case '050100'://센터장
      case '060100'://통합센터장
      case '090100'://시스템관리자
         isMngr = true;
         break;
      default:
         isMngr = false;
         break;
	}
	 
	if(isMngr){
	    $("#btnStsDayBatch").show();
	    $("#btnStsDayPrint").show();
	}else{
	    $("#btnStsDayBatch").hide();
	    $("#btnStsDayPrint").hide();
	}
	 
	 
	$("#cslCntD_schDay").val(getAddDate(getDate(),-1));
	datePicker("#cslCntD_schDay");
	 
	if($("#cslCntD_schDay").val().replace(/-/gi, "").trim() < "20180311"){
	 
	    $("#btnStsDayBatch").css("display","none");
	}else{
	    $("#btnStsDayBatch").css("display","inline-block");
	}
	 
	$("#cslCntD_schDay").bind("change",  function () { 
	    $( "#cslCntD_schDay" ).datepicker( "option", "maxDate",getAddDate(getDate(),-1));
	    $(".ui-datepicker-trigger").css("vertical-align","middle");
	     
	    if($("#cslCntD_schDay").val().replace(/-/gi, "").trim() < "20180311"){
	 
	        $("#btnStsDayBatch").css("display","none");
	    }else{
	        $("#btnStsDayBatch").css("display","inline-block");
	    }
	});
	 
	 
	$("#cslCntD_tday").html('');
	$("#cslCntD_yday").html('');
	 
	$("#cslCntD_task_cont").val('');
	$("#cslCntD_entr_st").val('');
	 
	// 조회
	stsDaySearch();
	 
	// 초기화 버튼 클릭 이벤트 등록
	$("#cslCntD_btnStsDayInit").bind("click", init);
	 
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntD_btnStsDaySearch").bind("click", stsDaySearch);
	 
	// 데이타가져오기 이벤트 등록
	$("#cslCntD_btnStsDayBatch").bind("click",stsDayBatch); 
	 
	// 출력 버튼 클릭 이벤트 등록
	$("#cslCntD_btnStsDayPrint").bind("click",sayPrint); 
	
	// 엑셀 다운로드 클릭 이벤트 등록
	$("#cslCntD_btnStsDayAllExcel").bind("click", btnAllExcelSave);
});