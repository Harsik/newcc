var g_iFrameJobStart="0";


//check educationSchedule
function getJsonStrEducationSchedule(alarmTime) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDIuYWxhcm1FZHVjYXRpb25TY2hlZHVsZQ==",
		"map" : {
			"key" : "value",
			"alarmTime" : alarmTime
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}


//파라미터 셋팅_CheckMessage
function getJsonStrMessageCnt()
{

	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMzAuZ2V0TWVzc2FnZU5vdHlldENvdW50",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

//파라미터 셋팅_UpdateMessageCnt
function getJsonStrUpdateMessageCnt()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMzAudXBkYXRlUmVhZEFsZXJ0",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_UpdateResvCnslCnt
function getJsonStrUpdateResvCnslCnt()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDUudXBkYXRlUmVzdkNuc2w=",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_WaitingCount
//큐브리드 마이그레이션 작업으로 인해 임시 주석처리
function getJsonStrWaitingCount()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
//		"mi" : "Y2gwMDEuZ2V0V2FpdGluZw==", //ch001.getWaiting
		"mi" : "Y3RpLmdldFdhaXRpbmc===", //cti.getWaiting
		"map" : {
			"key" : "value",
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_NotyetCount
function getJsonStrNotyetCount() // 여기1
{
	var sUserCd = sessionStorage.getItem("USR_GRD_CD");
	
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuZ2V0Tm90eWV0Q250",
		"map" : {
			"key" : "value"
		}
	};
	
	if(sUserCd < "050100"){
	    loParam.map.usrid = sessionStorage.getItem("USR_ID");
	}
	
	if(sUserCd == "030100"){
		loParam.map.usrGrdCd = sessionStorage.getItem("USR_GRD_CD");
	}
	
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_ResvCnslCnt
function getJsonStrResvCnslCnt()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuZ2V0UmVzdkNuc2xDbnQ=",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_NoticeList
function getJsonStrNoticeList()
{
	var loParam =  {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuZ2V0Tm90aWNlTGlzdEZvck1haW4=",
		"map" : {
			"key" : "value",
			"usr_grd_cd" : window.sessionStorage.getItem("USR_GRD_CD"),
			"team_cd" : window.sessionStorage.getItem("TEAM_CD"),
			"usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


// VOC알람 체크
function getJsonStrVocAlam()
{
/*
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "Y20wMjEudm9jQWxhcm0=",
			"map" : {
				"key" : "value",
				"login_usr_id" : window.sessionStorage.getItem("USR_ID")
			}
		};
			
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
*/
}


//대기자 체크
function refreshWaitingCnt()
{
	if(g_iFrameJobStart=="0"){
	//한국어 - 26672
	//영어   - 26673
	//중국어 - 26674
	//일본어 - 26675	
	
//	var teamQueue;
//		var team_nm=window.sessionStorage.getItem("TEAM_NM");
//		if(team_nm=="영어상담팀"){
//			teamQueue="26673";
//		}else if(team_nm=="일어상담팀"){
//			teamQueue="26674";
//		}else if(team_nm=="중국어상담팀"){
//			teamQueue="26674";
//		}else{
//			teamQueue="";
//		}
		
		if(parent.g_getWaitStatus =="run" && g_iFrameJobStart === "0"){
			//window.parent.fnGetWaitCount("ON");
		}
	
	
	// 대기자 체크
	// 큐브리드 마이그레이션 작업으로 인해 임시 주석처리
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/getWaitingCount.do",
		data : "pJson=" + getJsonStrWaitingCount(),
		success : function(data)
		{
			if (data != null) {
				$("#labMainWaitingCustCount", parent.document).html(data.WAIT_COUNT);
				//hhs 20.04.19
//				if(data.WAIT_COUNT==0){
//					$("#labMainWaitingCustCount", parent.document).html("N");
//				}else{
//					$("#labMainWaitingCustCount", parent.document).html(data.WAIT_COUNT);
//				}
			} else if (data == null){
				$("#labMainWaitingCustCount", parent.document).html("0");
			}
		},
		error : function(data, status, err) 
		{
			//networkErrorHandler(data, status, err);
		}
	});
	
	}
}


/**
 * 화면하단 정보를 새로고침을 하는 함수
 */
function refreshNotyetCnt()
{
	if(g_iFrameJobStart=="0"){
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/getNotyetCount.do",
			data : "pJson=" + getJsonStrNotyetCount(),
			success : function(data)
			{	
				if(data != null)
				{
					$("#divUnderInOutCnt", parent.document).html(data.INOUTCNT);
					//$("#divUnderInboundCnt", parent.document).html(data.INCNT);
					//$("#divUnderOutboundCnt", parent.document).html(data.OUTCNT);
					//$("#divUnderCallTimeCnt", parent.document).html(data.CALLLTM + "(" + data.CALLLTMAVG + ")");
					$("#divUnderNotyetCnt", parent.document).html(data.NOTYET); //미완료
					$("#divUnderResvCnt", parent.document).html(data.RESV); //예약
					$("#divUnderMessageCnt", parent.document).html(data.NOTE); // 쪽지
//					$("#divUnderComplaintCnt", parent.document).html(data.SMSSND); //SMS
					$("#divUnderCallbackCnt", parent.document).html(data.CALLBCK); //콜백
					//$("#divUnderCmpgCnt", parent.document).html(data.CMPG); //해피콜(캠페인)
					$("#divUnderCmpgCnt", parent.document).html(data.EDU); //교육
					$("#civilComplaint", parent.document).html(data.CIVILCOMPLAINT); //이관대기 임시
					
					// 콜백 건수가 한건 이상 있을 경우 강조 표현
					if(parseInt(data.CALLBCK) > 0)
					{
						$("#divUnderCallbackCnt", parent.document).css("background-color", "#CD1039");
						$("#divUnderCallbackCnt", parent.document).css("color", "#FFFFFF");
					}
					else
					{
						$("#divUnderCallbackCnt", parent.document).css("background-color", "#FFFFFF");
						$("#divUnderCallbackCnt", parent.document).css("color", "#0467D1");
					}
					
					// 예약콜 건수가 한건 이상 있을 경우 강조 표현
					if(parseInt(data.RESV) > 0)
					{
						$("#divUnderResvCnt", parent.document).css("background-color", "#CD1039");
						$("#divUnderResvCnt", parent.document).css("color", "#FFFFFF");
					}
					else
					{
						$("#divUnderResvCnt", parent.document).css("background-color", "#FFFFFF");
						$("#divUnderResvCnt", parent.document).css("color", "#0467D1");
					}
				}
				else
				{
					$("#divUnderInOutCnt", parent.document).html("0");
					//$("#divUnderInboundCnt", parent.document).html("0");
					//$("#divUnderOutboundCnt", parent.document).html("0");
					//$("#divUnderCallTimeCnt", parent.document).html("00:00:00");
					$("#divUnderNotyetCnt", parent.document).html("0");
					$("#divUnderResvCnt", parent.document).html("0");
//					$("#divUnderMessageCnt", parent.document).html("0");
					$("#divUnderComplaintCnt", parent.document).html("0");
					$("#divUnderCallbackCnt", parent.document).html("0");
					$("#divUnderCmpgCnt", parent.document).html("0");
				}
			},
			error : function(data, status, err) 
			{
				//networkErrorHandler(data, status, err);
			}
		});
		
	}
}

function refreshSmsCnt() {
	if(g_iFrameJobStart=="0"){
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/getSMSCount.do",
			data : "pJson=" + getJsonStrSMSCount(),
			success : function(data)
			{	
				if(data != null){
					$("#divUnderComplaintCnt", parent.document).html(data.CNT); //SMS
				}else{
					$("#divUnderMessageCnt", parent.document).html("0");
				}
			},
			error : function(data, status, err) 
			{
				//networkErrorHandler(data, status, err);
			}
		});
	}
}

//파라미터 셋팅 SMSCount
function getJsonStrSMSCount() 
{
	var sUserCd = sessionStorage.getItem("USR_GRD_CD");
	var usrCd = "AG";
	if(sUserCd >= "030100"){
		usrCd = "all";
	}
	
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "c21zLnNtc0NvdW50",
			"map" : {
				"key" : "value",
				"usrCd" : usrCd
			}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


/**
 * 예약통화여부 Check
 */
function checkResvCnsl()
{
	if(g_iFrameJobStart=="0"){	 
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/getResvCnslCnt.do",
			data : "pJson=" + getJsonStrResvCnslCnt(),
			success : function(data)
			{
				if(data != null)
				{
					if(parseInt(data.RESV_CNT) > 0)
					{
						//$("#labSlideAlertMsg", parent.document).html("30분 안에<br /><label style='color:red; font-size: 18pt; font-weight: bold;'>" + data.RESV_CNT + "</label> 건의 예약이<br />존재합니다.");
						$("#labSlideAlertMsg", parent.document).html("5분 안에<br /><label style='color:red; font-size: 18pt; font-weight: bold;'>" + data.RESV_CNT + "</label> 건의 예약이<br />존재합니다.");
						$("#divSlideAlert", parent.document).toggle(1000);
						setTimeout(function(){$("#divSlideAlert", parent.document).toggle(1000);}, 5000);
						
						//alert("30분 안에 " + data.RESV_CNT + " 건의 예약이 존재합니다.");
						
						//$("#divCnslTabNotCompleteBtn").trigger("click");
						//$("#divRCTabResvCallListBtn").trigger("click");
						
						// 현재 알림으로 보여줬던 예약건 업데이트
						$.ajax({
							type : "post",
							dataType: "json",
							async : true,
							url : getContextPath() + "/ajax/main/updateResvCnslCnt.do",
							data : "pJson=" + getJsonStrUpdateResvCnslCnt(),
							success : function(data)
							{
								
							},
							error : function(data, status, err) 
							{
								//networkErrorHandler(data, status, err);
							}
						});
					}
				}
			},
			error : function(data, status, err) 
			{
				//networkErrorHandler(data, status, err);
			}
		});
	}
}

// VOC 미처리 체크
function checkVoc()
{
	/*
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/voc/vocAlarm.do",
		data : "pJson=" + getJsonStrVocAlam(),
		success : function(data)
		{
			if(data != null)
			{
				// 현재 처리되지 않은 VOC 갯수 체크
				if(parseInt(data.CNT) > 0)
					$("#labMainVocTitleText").html("(" + data.CNT + ")");
				else
					$("#labMainVocTitleText").html("");
			}
		},
		error : function(data, status, err) 
		{
			//networkErrorHandler(data, status, err);
		}
	});
	*/
}


function checkEducationSchedule() {
    if(g_iFrameJobStart=="0"){
		$.ajax({
		    type : "post",
		    dataType: "json",
		    async : true,
		    url : getContextPath() + "/ajax/main/getEducationSchedule.do",
		    data : "pJson=" + getJsonStrEducationSchedule('30'),
		    success : function(data)
		    {
				if(data[0] != null)
				{
				    var eduContent = "<span style='font-size: 18pt;' onclick='MainCheckEduSchedule();'>등록된 교육이 <label style='color:red; font-size: 18pt; font-weight: bold;'>"+data.length+"</label>건 있습니다.<br></span>";
//					eduContent += "<P style='font-size: 10pt;'><br>1. [교육내용]" + data[0].EDU_CONT+"</P>";
					$("#labSlideAlertMsgMessage", parent.document).html(eduContent);
					$("#divSlideAlertMessage", parent.document).show(1000);
					setTimeout(function(){$("#divSlideAlertMessage", parent.document).hide(1000);}, 5000);
				}  
		    },
		    error : function(data, status, err) 
		    {
			networkErrorHandler(data, status, err);
		    }
		});
    }
}



//쪽지 알림 설정
function checkMessage()
{	
    //console.log("쪽지"+sessionStorage.getItem('alarmMessage'))
    if(sessionStorage.getItem('alarmMessage')!='false'){
	if(g_iFrameJobStart=="0"){
	    $.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/getCheckMessage.do",
		data : "pJson=" + getJsonStrMessageCnt(),
		success : function(data)
		{
		    if(data != null)
		    {
			// 	쪽지 알람 표시 후 알람 여부 업데이트
				if(parseInt(data.NOTREADMCNT) > 0)
				{
				    $("#labSlideAlertMsgMessage", parent.document).html("<span style='font-size: 18pt;' onclick='mainCheckMessage();'>읽지않은 쪽지가<br /><label style='color:red; font-size: 18pt; font-weight: bold;'>" + data.NOTREADMCNT + "</label> 건 존재합니다.</span>"+
				    "<br> <span style='position:absolute; top:167px; left:180px;' onclick='delMessage();' onMouseOver=this.style.color='#00F' onMouseOut=this.style.color='#000'>알람 Off</span>");
				    $("#divSlideAlertMessage", parent.document).show(1000);
	
				    setTimeout(function(){$("#divSlideAlertMessage", parent.document).hide(1000);}, 5000);
	
				    // 현재 알림으로 보여줬던 쪽지 업데이트
				    $.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/main/updateMessageCnt.do",
						data : "pJson=" + getJsonStrUpdateMessageCnt(),
						success : function(data)
						{
		
						},
						error : function(data, status, err) 
						{
						    //networkErrorHandler(data, status, err);
						}
				    });
				}

			// 현재 읽지 않은 쪽지 갯수 체크
			if(parseInt(data.NOTREADMCNT) > 0)
//			    $("#labMainMessageTitleText", parent.document).html("(" + data.NOTREADMCNT + ")");
			    $("#labMainMessageTitleText", parent.document).html("");
			else
			    $("#labMainMessageTitleText", parent.document).html("");
		    }
		},
		error : function(data, status, err) 
		{
		    //networkErrorHandler(data, status, err);
		}
	    });
	}
    }
}

// 메인 하단 공지사항 reload
function reloadNoticeBar()
{
	if(g_iFrameJobStart=="0"){
		$.ajax({
			type : "post",
			async : true,
			url : getContextPath() + "/ajax/main/getNoticeList.do",
			data : "pJson=" + getJsonStrNoticeList(),
			success : function(data)
			{
				// param값을 JSON으로 파싱
				console.log("reloadNoticeBar data : " + data); //간헐적인 유효하지 않은 문자 오류 발생 data확인 하기 위한 console.log 추가 2018.12.03
				var jr = JSON.parse(data); 
				var ii = 0;
				var value = "";
				$("#mrqNoticeBar", parent.document).html("");
				if(jr != "")
				{
				    $.each(jr, function(key, state)
					{
						if(state.EMRG_YN == "Y"){
    					    value += "<li style='color: #fdef16; height:18px;' onclick='showNoticeDetail(" + state.TBBS_ID + ")'>";
    					    if(state.TBBS_GB_CD=="020100") {
    						value +="[콜센터공지]";
    					    }else if(state.TBBS_GB_CD=="050100") {
    						value +="[공무원공지]";
    					    }
    					    value += "[긴급]" + state.TBBS_TTL + "</li>";
    					}else{
    					    value += "<li style='height:18px;' onclick='showNoticeDetail(" + state.TBBS_ID + ")'>";
    					    if(state.TBBS_GB_CD=="020100") {
    						value +="[콜센터공지]";
    					    }else if(state.TBBS_GB_CD=="050100"){
    						value +="[공무원공지]";
    					    }
    					    value +="[일반]" + state.TBBS_TTL + "</li>";
    					}
					ii++;
				    });
				}
				$("#mrqNoticeBar", parent.document).append(value);
				if(ii > 1){
					window.parent.fn_article("notice5", "", true);
				}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}
 
function timeOutJobStart(pjob){
  
//	alert(pjob);
	 
	// 대기 고객 숫자 갱신 타이머 등록_로컬에서 작업 시 주석 처리 필요
	//refreshWaitingCnt();
	var loop1 = (function looper (i) {
			setTimeout(function() {	refreshWaitingCnt(); if(i==0) {  i=0; looper(i) }	}, 1000*5  ) })(0); 
		
	// 하단 숫자 목록 갱신 타이머 등록  20170904
	//refreshNotyetCnt();
//	var loop2 = (function looper (i) {
//			setTimeout(function() {	refreshNotyetCnt(); if(i==0) {  i=0; looper(i) }	}, 1000*60*3  ) })(0);
	 
	 
	// 20,04.17 hhs 팀장 이상일때 타이마 5초씩
	var loop2 = (function looper(i) {
		if(window.sessionStorage.getItem('USR_GRD_CD')>='030100'){
			setTimeout(function() {	refreshNotyetCnt();	if (i == 0) {	i = 0;	looper(i)	}	}, 1000 * 5)
		}else{
			setTimeout(function() {	refreshNotyetCnt();	if (i == 0) {	i = 0;	looper(i)	}	}, 1000 * 60 * 3)
		}
	})(0);
	
	// refreshSmsCnt
	var loop3 = (function looper (i) {
			setTimeout(function() {	refreshSmsCnt(); if(i==0) {  i=0; looper(i) }	}, 1000*5  ) })(0);
	
	// VOC 미처리 여부 체크 
	//checkVoc();
	//setInterval(checkVoc, 1000 * 60);
		
	 
	// 공지사항 갱신 20170904
	//reloadNoticeBar();
	var loop4 = (function looper (k) {
			setTimeout(function() {	reloadNoticeBar(); if(k==0) { k=0; looper(k) }	}, 1000*60  ) })(0);

	 //if
	//	clearTimeout(loop1);
	//	clearTimeout(loop2);
	//	clearTimeout(loop3);
	//	clearTimeout(loop4);
	 
}



var alarmScheduler = (function() {
    var shedules = [];
    var alarmStat=false; 			//alarm use
    var loopers=[]; 				//schedule name, timeout

    return {
	contains: function(shedule) { 		//스케줄이 포함되있는지
	    return shedules.indexOf(shedule) > -1;
	},
	add: function (shedule) {  		//스케줄 추가
	    if(!this.contains(shedule)){
		shedules.push(shedule);
	    }
	},
	remove: function(shedule) {  		//스케줄 삭제
	    var index = shedules.indexOf(shedule);
	    if(index > -1) {
		shedules.splice(index,1);
	    }
	},
	getCount : function(){ 			//등록된 스케줄 길이
	    return shedules.length;
	},
	getLoopers : function (){  	
	    return loopers;
	},
	setAlarmStat : function (stats){  	
	    alarmStat=stats;
	},
	getAlarmStat : function (){  	
	    return alarmStat;
	},
	iterateClose : function(i){  				//interval 종료
		clearInterval(loopers[i]);
	},
	iterate : function() {  				//interval 시작
	    shedules.forEach(function(schedule, index, Shcedules){
		loopers[index] = setInterval(function(){
		  
		    //현재 알람중일때
		    if(alarmStat==true){
			(function delaylooper(i){
			    setTimeout(function() {
				if(alarmStat==false) {
				    console.log("oops! true 사용"+"["+index+"]")
				    alarmStat=true; 	//알람사용
				    schedule[0](); 	//함수실행
				    setTimeout(function() { alarmStat=false;  console.log("oops! false 반환**"+"["+index+"]"); }, 9000);  //알람반환
				} else {
				    // 실패시 재귀호출
				    if(i++ < 20){  	//지연실행
					delaylooper(i);
				    }
				}
			    }, 2000); 	
			})(0);
			
		    //알람이 없을때
		    }else{
			console.log("true 사용**"+"["+index+"]");
			alarmStat=true; 	//알람 사용
			schedule[0](); 		//함수 실행
			setTimeout(function() { alarmStat=false;  console.log("false 반환**"+"["+index+"]"); }, 9000); 	//알람반환
		    };
		    
		}, schedule[1]);

	    }); //foreach
	}  //iterate;
    };  //return;
})();

//페이지 초기화
$(document).ready(function()
{
	sessionStorage.setItem('alarmMessage',true);	
	       // 대기 고객 숫자 갱신 타이머 등록_로컬에서 작업 시 주석 처리 필요
	refreshWaitingCnt();
	
	// smsCount
	refreshSmsCnt();
	
	// 하단 숫자 목록 갱신 타이머 등록  20170904
		refreshNotyetCnt();		 
	 
		// 예약통화 여부 체크 20170904
	checkResvCnsl();
	
	// 쪽지읽음 여부 체크 20170904
		checkMessage();
	 
		// 공지사항 갱신 20170904
	reloadNoticeBar();
	
	// setTimeout 모음
	timeOutJobStart("start");   
	
	//스케줄 등록 & 시작 
	alarmScheduler.add([checkMessage, 1000*60*1]);		  //쪽지 		
	alarmScheduler.add([checkResvCnsl, 1000*60*3]); 	  //예약
	alarmScheduler.add([checkEducationSchedule, 1000*70*3]);  //교육		
	alarmScheduler.iterate();
	
	// 상담정보 관련 버튼 이벤트
	//$("#labMainWaitingCustCount", parent.document).bind("click", custCountNameClick);
	$("#mainTopCtiStatus", parent.document).bind("click", mainTopCtiStatusClick);
	$("#labCallTypeStatus", parent.document).bind("click", labCallTypeStatusClick);
	
});

 
function custCountNameClick(){
// var tempQueue = $("#hidTeamQueue",parent.document).val();
// if(tempQueue != undefined){
//	// alert(tempQueue);
// }
//	
//	if(g_iFrameJobStart=="0"){
//		$("#divUnderCallbackCnt", parent.document).css("color","red");
//		//timeOutJobStart("stop");
//		g_iFrameJobStart="1"; // 대기고객 stop
//
//	}else{
//		location.href = location.href;
//	}
//	
	
		// 프로그램 실행 (기본형) ini 참조
		window.parent.fnProcStart("","");
	
}

function mainTopCtiStatusClick(){
	// 대기 고객수 테스트
	//window.parent.fnGetWaitCount("TEST");
	
	if($("#mainTopCtiStatus").html() == "ON"){
		var strCmd=$("#tfMainExeFileName", parent.document).val();
		// 프로그램 실행 
		window.parent.fnProcStart(strCmd,"");
	}
}

function labCallTypeStatusClick(){
	
	if(window.sessionStorage.getItem("USR_ID") == "sysmanager" || window.sessionStorage.getItem("USR_ID") == "agentest"){
		if(g_iFrameJobStart == "0"){
			g_iFrameJobStart = "1";
			alert("iFrame Job Stop");
		}else{
			g_iFrameJobStart = "0";
			alert("iFrame Job Start");
		}
	}
}