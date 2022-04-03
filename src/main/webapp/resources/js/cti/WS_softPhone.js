﻿﻿var sSoftphoneType = "";
var arBtn = new Array(10);

//기능 버튼 ID 정의
arBtn["0"] = "softphone_1";		//대기
arBtn["1"] = "softphone_2";		//걸기
arBtn["2"] = "softphone_3";		//끊기
arBtn["3"] = "softphone_4";		//보류
arBtn["4"] = "softphone_5";		//협의
arBtn["5"] = "softphone_6";		//3자통화
arBtn["6"] = "softphone_7";		//업무
arBtn["7"] = "softphone_8";		//이석
arBtn["8"] = "softphone_9";		//재접속
arBtn["9"] = "softphone_10";	//로그아웃

var arBtnText = new Array(10);
arBtnText["0"] = "대기";
arBtnText["1"] = "걸기";
arBtnText["2"] = "끊기";
arBtnText["3"] = "보류";
arBtnText["4"] = "협의";
arBtnText["5"] = "3자통화";
arBtnText["6"] = "업무";
arBtnText["7"] = "이석";
arBtnText["8"] = "재접속";
arBtnText["9"] = "로그아웃";

var arBtnR = new Array(8);

arBtnR["0"] = "softphone_11";      // 버스정보
arBtnR["1"] = "softphone_12";      // 즐겨찾기
arBtnR["2"] = "softphone_13";      // 조직도
arBtnR["3"] = "softphone_14";      // 행정정보
arBtnR["4"] = "softphone_15";      // sms
arBtnR["5"] = "softphone_16";      // 팩스
arBtnR["6"] = "softphone_17";      // 우편번호

var arBtnRText = new Array(8);
arBtnRText["0"] = "버스정보";
arBtnRText["1"] = "즐겨찾기";
arBtnRText["2"] = "조직도";
arBtnRText["3"] = "행정정보";
arBtnRText["4"] = "sms";
arBtnRText["5"] = "팩스";
arBtnRText["6"] = "우편번호";

// not ready 상태 문구 정의
var arStateText = new Array();
arStateText["41"] = "식사";
arStateText["42"] = "교육";
arStateText["43"] = "채팅";
arStateText["44"] = "업무";
arStateText["45"] = "휴식";
arStateText["46"] = "기타";
arStateText["47"] = "미스콜";
arStateText["48"] = "콜백";

arStateText["0"] = "휴식"; //
arStateText["1"] = "준비"; //개인
arStateText["2"] = "식사"; //
arStateText["3"] = "티타임"; //삭제
arStateText["4"] = "교육"; //
arStateText["5"] = "문자상담"; //회의
arStateText["6"] = "상담"; //삭제
arStateText["7"] = "업무"; // 다른업무
arStateText["8"] = "기타"; // 개인업무
arStateText["9"] = "수리"; // 삭제
 
var thisdoc = document.all;
var thisform = document.forms[0];
var objState = document.getElementById( "AGENTSTATUS" );
var REASONCODE = "";
var RECKEY = "";                             // CTI에서 제공하는 Call Id

var INBOUND = "1";
var OUTBOUND = "2";
var IVR_Message = "1";  // IVR 언어별 서비스구분  1:한글, 2:영어, 3:중국어, 4:일어
var AGENT_HANGUP = "0";

var nMsgLine = 0;

var g_manualLogoutFlag = false;

var gCallStartTime = "";                      // 통화시작시간
var gCallReleaseTime = "";                    // 통화종료시간
var gCallConnectTime = "";                    // 통화연결시간

var gInitCallStartTime = "";                  // 초기 통화시작시간 

var bDialing = false;                         // Dialing 
var bCalling = false;                         // 통화중
var bReleased = true;                         // 통화종료여부

var bInter = false;                         // 내선

var g_autoReadyTimer = null;
var g_getWaitCountTest = "ON";   // 테스트시 "TEST"
var g_getWaitStatus = "";
var g_ArsAuthProcess = "";
var g_ArsAuthStatus = "";
var g_ArsAuthDateTime = "";
var g_agentId= window.sessionStorage.getItem("USR_ID");
var g_holdCount=0;
var g_happyCallgb="";
var g_readyFlag=true;
var g_connStat=""; // 전화연결시 최종이 'ESTABLISHED'

var g_prevEvent="";
var g_prevTelnum="";
var gjtelno  = "";
var g_arr_UEI=[];

var g_RecSvrIP="";

var g_location={
		"isVal":"0",
		"adt" : "",
		"atm" : "",
		"qdt" : "",
		"qtm" : "",
		"telno" : "",
		"addr" : "",
		"zip" : "",
		"x" : "",
		"y" : "",
		"type" : "",
		"telcom" : "",
		"result" : ""
}

// 업무상태코드
var LOGIN   = "11000";     // 로그인
var READY   = "12000";     // 대기
var CALLING = "13000";     // 통화중
var ABD     = "21046";     // Abandon Call/포기콜
var ACW     = "14000";     // 후처리

// NotReady 상태
var VAC  = "20000";       // 이석
var EAT  = "21041";       // 식사
var EDU  = "21042";       // 교육
var MEET = "21043";       // 미팅
var WORK = "21044";       // 업무
var REST = "21045";       // 휴식

var currStatus = "";

var arrAddr = []; // 행정동 주소를 담아 놓을 배열

/**
 * 소프트폰 연결
 * @returns null
 */
function openConn() {
	// 웹소켓 오브젝트 할당, 데몬 웹소켓 서버주소가 파라미터
	ws = new WebSocket("ws://127.0.0.1:9068");

	// 웹소켓 서버 연결 성공
	ws.onopen = function() {
		fnInitCTI();
	}
	
	// 웹소켓 서버 연결 종료
	ws.onclose = function() {
		//putMsg("websocket server connection is closed...");
	}
	
	// 웹소켓 에러 처리
	ws.onerror = function(evt){
		//putMsg(evt.data);
	}

	// 웹소켓 서버로부터 데이터 수신
	ws.onmessage = function(evt){
		fnGetEvent(evt.data);
	}
}

/**
 * 통화종료중인 지를 리턴한다.
 * @returns {Boolean}
 */
function isReleased() {
	return bReleased;
}

/**
 * CTI 초기화
 * @returns null
 */
function ctiInit()
{
	try
	{
		// cti id와 내선번호를 셋팅 후 서버 연결 시도
		USERID = $("#USERID").val();
		EXT = $("#EXT").val();
			
		if(USERID != "" && EXT != "")
		{
			openConn();                                           // WebSocket 연결
		}
	}
	catch(e)
	{
		alert( "error = " + e.description);
	}
}

/**
 * 사용자 업무상태 저장
 * @returns null
 */
function fnSaveWorkStatus() 
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/insertWorkStatus.do",
		data : "pJson=" + getJsonStrWorkStatusUpdate(),
		success : function(data)
		{
			console.log(data);
			currStatus = data.USR_STAT_CD; // hhs 20.04.28
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/insertWorkStatus.do",
				data : "pJson=" + getJsonStrWorkStatusInsert(currStatus),
				success : function(data)
				{
					console.log(data);
				},
				error : function(data, status, err) 
				{
					alert("업무상태 저장 실패!!");
				}
			});
		},
		error : function(data, status, err) 
		{
			alert("업무상태 저장 실패!!");
		}
	});
}

function fnSaveWorkStatusLogin() 
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/insertWorkStatus.do",
		data : "pJson=" + getJsonStrWorkStatusLogin(),
		success : function(data)
		{
			console.log(data);
		},
		error : function(data, status, err) 
		{
			alert("업무상태 저장 실패!!");
		}
	});
}

/**
 * SoftPhone에서 수신된 메시지를 처리한다.
 * @param data CTI로 부터 수신받은 event
 * @returns null
 */
function fnGetEvent(data) {
	var jsonObj = JSON.parse(data);
	var command = jsonObj["CMD"];
	if (jsonObj["TEL_NO"]) {
		gjtelno = jsonObj["TEL_NO"];
	}
	var resultCd = '';
	var callType = '';
	var textState = "";
	var prevStatus = currStatus;
	var prevEvent = g_prevEvent;
	var prevTelno = g_prevTelnum;
	g_prevTelnum = gjtelno;
	g_prevEvent = command;

	console.log(JSON.stringify(jsonObj));

	// 해피콜 전화연결됨
	if (g_happyCallgb == "happycall" && command == "ESTABLISHED") {
		g_happyCallPop.fromParentToHappyCall("count", "");
		g_happyCallgb = "";
	} else if (g_happyCallgb == "happycall" && prevEvent == "DIALING"
			&& command == "RELEASED") {
		g_happyCallPop.fromParentToHappyCall("unresponsiveness", "1002");
		g_happyCallPop.focus();
	}

	// 대기민원인은 아래값만 전달하고 패스
	if (command == "GETWAITCOUNT") {
		var QueCnt01 = jsonObj['QUEUE01'];
		var QueCnt02 = jsonObj['QUEUE02'];
		var Evnt_Tm = jsonObj['EVT_TIME'];
		var numCnt = parseInt(QueCnt01) + parseInt(QueCnt02);
		$("#labMainWaitingCustCount").html(numCnt);
		$("#tfMainWaitingCustCount").val(numCnt);
		$("#tfMainWaitingDate").val(Evnt_Tm);
		return;
	}
	g_getWaitStatus = "";
	g_ArsAuthDateTime = "";

	var arState = new Array("3", "3", "3", "3", "3", "3", "3", "3", "2", "2");

	switch (command) {
	case 'INITCTI': // 초기화 및 로그인
		resultCd = jsonObj['RESULT_CD'];
		if ('0' == resultCd) {
			// CTI 연결 성공
			textState = "로그인";
			arState = new Array("2", "2", "3", "3", "3", "3", "2", "2", "2", "2");
			$("#mainTopCtiStatus").html("ON");
			bDialing = false;
			bReleased = true;
			bCalling = false;
			currStatus = LOGIN;
			
			listenRecLogin();
//			fnSaveWorkStatus();
			fnSaveWorkStatusLogin();
		} else {
			alert("CTI 로그인 실패! \n\n담당자에게 문의하세요.");
			arState = new Array("3", "3", "3", "3", "3", "3", "3", "3", "3", "2");
		}
		break;
		
	case 'DIAL': // Dialing
		textState = "연결중";
		arState = new Array("3", "3", "2", "2", "3", "3", "3", "3", "3", "3");
		RECKEY = "";
		// 콜백 상태 및 시도횟수 업데이트 티켓ID 생성전 실행
		callBackTryCountUpdate("trycnt");

		var ticketId = $("#tfMainTicketId").val();

		// 협의콜인 경우에는 가져오지 않도록 수정필요
		if (ticketId == '' || ticketId == null) {
			fnGetTicketId();
		}
		break;
		
	case 'ESTABLISHED': // 통화연결됨
		bCalling = true;
		bDialing = true; // m20170705
		textState = "통화중";
		RECKEY = jsonObj['REC_KEY']; // 녹취키(인바운드/아웃바운드)
		var estbTelno = jsonObj['TEL_NO'];
		g_connStat = "ESTABLISHED";

		gCallStartTime = gCallObj.CallStartTime;
		if (gCallObj.CallGB == INBOUND) {
			// 발신번호 제한 고객인 경우
			if (!estbTelno) {
				estbTelno = "99999999";
				prevTelno = "99999999";
			}

			// 내선 호전환인경우 RING전화번호 변경.
			if (prevTelno != estbTelno) {
				estbTelno = prevTelno;
			}

			fnSetCallInfo();
			$("#labCallTypeStatus").html("인바운드상담");
		} else if (bInter == true) {
			$("#labCallTypeStatus").html("내선");
		} else if (gCallObj.CallGB == OUTBOUND) {
			fnSetCallInfo();
			$("#labCallTypeStatus").html("아웃바운드상담");

			// 콜백 시도 완료
			if ($("#callBckMainId").val() != "" && $("#refId").val() != "") {
				$("#selMainActstcd").val("030400");
				// 콜백 상태 및 시도횟수 업데이트 티켓ID 생성전 실행
				callBackTryCountUpdate("complete");
			}

		}

		gCallConnectTime = jsonObj['EVT_TIME'];
		arState = new Array("3", "3", "2", "2", "2", "3", "3", "3", "2", "2");
		$("#tfRecId").val(RECKEY);

		// 내선 수신
		if (bInter == true) {
			bInter = false;
			break;
		}

		currStatus = CALLING;

		var ticketId = $("#tfMainTicketId").val();

		if (ticketId == '' || ticketId == null) {
			fnGetTicketId();
		}
		
		// ch011 주소 저장
		$.ajax({
			type : "post",
			async : false,
			url : getContextPath() + "/ajax/main/custAddrInfo.do",
			data : "pJson=" + getJsonStrInsertAddr(arrAddr,"ch011"),
			success : function(data) {
				console.log("=== INSERT CH011 : 주소저장 성공");
				
				// ch010에도 같은 data 저장
				$.ajax({
					type : "post",
					async : false,
					url : getContextPath() + "/ajax/main/custAddrInfo.do",
					data : "pJson=" + getJsonStrInsertAddr(arrAddr,"ch010"),
					success : function(data) {
						console.log("=== INSERT CH010 : 주소저장 성공");
					},
					error : function(data, status, err) {
						console.log("=== CH010 : 주소저장 실패");
					}
				});
				
			},
			error : function(data, status, err) {
				console.log("=== CH011 : 주소저장 실패");
			}
		});
		
		

		var tmpTel = $("#CALLNO").val();
		if ((estbTelno) && (tmpTel != estbTelno)) {
			$("#CALLNO").val(estbTelno);
		}

		setCustInfo(estbTelno, "DoNotEmpty");
		
		// 2021.11.03
		// 빠른전화걸기에 적힌 번호를 셋팅하게 되면서 잘못된 번호 셋팅됨.
		if ($("#OUTDIAL").val() != "") {
			$("#tfContactInform").val($("#OUTDIAL").val());
		}
		
		fnSaveWorkStatus();
		setTimeout(fnSaveCnsl, 1000);
		
		fnGetWaitCount(g_getWaitCountTest);
		$("#btnCnslInit").prop("disabled", true);// 상담 초기화 비활성화
		break;
		
	case 'RELEASED': // 통화끊김
		textState = "후처리중";
		bReleased = true;

		bDialing = false;
		AGENT_HANGUP = jsonObj['AGENT_HANGUP']; // 상담사 Hang_up : "1"
		gCallReleaseTime = jsonObj['EVT_TIME'];
		console.log("RELEASED preTel:" + prevTelno + "," + g_prevTelnum + " ," + prevEvent);
		// 전화끊어짐
		if ((AGENT_HANGUP == "0" && prevEvent == "CONSULT") && prevTelno != "3000") {
				g_transFlag = false;
			if (g_prevTelnum == prevTelno) {
				fnConsultCancel("");
				$("#dialogMainConfirmPopup").dialog("close");
			} else {
				// 2018.11.12
				g_transFlag = false;
				bDialing = true;

				$("#popupMessageConfirmPopup").hide();

				// 협의통화 연결시 버튼 비활성화
				$(":button:contains('협의전달'), :button:contains('3자통화')").prop(
						"disabled", true).addClass('ui-state-disabled');
				$("#labTransferDialog").html("민원인이 전화를 끊었습니다.");
			}
		} else if (prevEvent == "DIAL") {
			if (prevTelno == "3000") {
				$("#labARSAuthDialog").html("민원인이 전화를 끊었습니다.");
				$("#dialogMainARSAuthPopup").dialog("close");
				fnHangup();
			} else if (g_prevTelnum != prevTelno) {
				$("#labTransferDialog").html("시도중 전화가 끊겼습니다.");
				// 2018.11.23
				bDialing = true;
			} else if (AGENT_HANGUP == 0) {
				// 2018.10.27
				fnConsultCancel("");
			}
		} else if (g_prevTelnum == "5000") {
			g_transFlag = false;
			fnConsultCancel("");
			$("#dialogMainARSAuthPopup").dialog("close");
		} else if (prevTelno == "3000" && (g_prevTelnum != prevTelno)) {
			console.log("preTel:" + prevTelno + "," + prevEvent);
			// ARS 인증시 고객이 먼저 전화를 끊음.
			$("#labARSAuthDialog").html("민원인이 전화를 끊었습니다.");
			$("#dialogMainARSAuthPopup").dialog("close");
			fnHangup();
		} else {
			bCalling = false; // 협의콜 중의 RELEASED는 무시
		}
		
		arState = new Array("2", "3", "3", "3", "3", "3", "2", "2", "2", "2");
		$("#labCallNumStatus").html("");
		$("#btnCnslInit").prop("disabled", false);// 상담 초기화 활성화
		break;
		
	case 'CONSULTCANCEL': // 통화끊김
		textState = "통화중";
		bCalling = true;
		bDialing = true;
		if (prevEvent == "DIAL") {
			if (g_prevTelnum != prevTelno) {
				$("#labTransferDialog").html("먼저온 전화가 끊겼습니다.");
			}
		}
		
		arState = new Array("3", "3", "2", "2", "2", "3", "3", "3", "2", "2");
		$("#labCallNumStatus").html($("#tfContactInform").val());
		break;
		
	case 'HELD': // 보류
		textState = "보류";
		g_holdCount++;
		console.log(g_holdCount);
		arState = new Array("3", "3", "3", "2", "2", "3", "3", "3", "2", "2");
		break;
		
	case 'UNHOLD': // 보류해제 a20170705
		textState = "통화중";
		arState = new Array("3", "3", "2", "2", "2", "3", "3", "3", "2", "2");
		break;
		
	case 'READY': // 대기
		// 알카텔 전화으면 통화전(READY) 상태로 갔다가 후처리 상태됨.
		if (prevEvent == "RELEASED" || prevEvent == "TRANSFER"
				|| prevEvent == "CONSULTCANCEL") {
			break;
		}

		$("#tfMainTicketId").val(""); // 대기상태로 변경할 경우 TicketId 초기화
		textState = "대기";
		currStatus = jsonObj['STATUS_CD'];
		g_connStat = "READY";

		arState = new Array("1", "2", "3", "3", "3", "3", "2", "2", "2", "2");
		fnSaveWorkStatus();
		break;
		
	case 'NOTREADY': // 이석
		// 알카텔 전화으면 통화전(NOTREADY) 상태로 갔다가 후처리 상태됨.
		if (prevEvent == "RELEASED") {
			break;
		}

		REASONCODE = jsonObj['REASON'];
		textState = arStateText[REASONCODE];
		// 업무
		if (REASONCODE == '7') {
			arState = new Array("2", "2", "3", "3", "3", "3", "3", "2", "2", "2");
			g_happyCallgb = "ready";
		} else {
			arState = new Array("2", "2", "3", "3", "3", "3", "2", "1", "2", "2");
		}
		currStatus = jsonObj['STATUS_CD'];

		fnSaveWorkStatus();

		fnGetWaitCount(g_getWaitCountTest);
		g_getWaitStatus = "run";
		g_readyFlag = true; // 대기버튼 바로동작
		break;
		
	case 'RINGING': // 호인입
		arState = new Array("3", "3", "3", "3", "3", "3", "3", "3", "2", "2");
		var telNo = ""; // 인입 전화번호
		var callGb = ""; // 콜구분
		var call_type = jsonObj['CALL_TYPE'];
		
		// call_type : 4 호전환인입
		if (call_type == "4") {
			callType = "1";
			if (!jsonObj['MESSAGE']) {
				telNo = "01000000000";
			} else {
				telNo = jsonObj['MESSAGE'];
				g_prevTelnum = telNo;
			}
			callGb = "내선 호전환";
		} else {
			callType = jsonObj['CALL_TYPE'];// Call Type 1:인바운드 , 2:아웃바운드 ,
											// 4:호전환인입
			telNo = jsonObj['TEL_NO'];

			if (!telNo) {
				// 발신번호 제한 고객, 번호없으므로 '99999999'변환
				telNo = "99999999";
			}
		}

		bCalling = true;
		bReleased = false;
		RECKEY = "";
		currStatus = CALLING;
		g_connStat = "RINGING";
		g_getWaitStatus = "";
		gCallObj = new Object();

		// 콜백 시도후 호인입이면 콜백 관련 초기화
		if ($("#callBckMainId").val() != "" || $("#refId").val() != "") {
			$("#callBckMainId").val("");
			$("#callBckTicketId").val("");
			$("#refId").val("");
		}

		if ($("#tfMainTicketId").val() != "") {
			fnSaveCnsl('S');
		}

		if (callType == "1") { // Inbound Call
			window.sessionStorage.setItem("setCustInfo", "false");
			textState = "전화옴";
			if (callGb == "내선 호전환") {
				textState = "내선전화 호전환";
			}

			gCallObj.TelNo = telNo;
			gCallObj.CallGB = INBOUND;
			gCallObj.CallStartTime = jsonObj['EVT_TIME'];

			/** >>**************** 기존 및 신규 고객 처리 ****************** */
			var custNm = "";
			var custTend = "010000";
			var memo = "";
			var custcomp = ""; // 민원인 구분
			var custcomp2 = ""; // 민원인 성향
			var newCust = "exist"; // 신규고객 구분
			var dnis = "3000";
			var intvLgcd = "all";
			// ARS 서비스코드로 각구분값 셋팅 g_ArsCustComp
			var cust = "1"; // 무조건 도민
			
			// 2020.01.14 추가. 인바운드의 경우 행정동 주소를 인식해서 들어온다.
			// 고객전화번호|결과코드|성공여부|주소리스트?|법정동 정제된 주소|행정동 정제된 주소|음성인식 결과|confidence_score|발성한횟수|음성파일경로
			// 성공여부|법정동 정제된 주소|행정동 정제된 주소|음성인식 결과
			// 결과코드 -> 0: 행정동 발화 (읍면포함), 1: 법정동 발화, 2: 도로명 발화, 3: 여러동 존재, 4: 순천시 외 지역, 5: 잘못된 주소 (STT 오인식/없는동/무의미한말 발화), 6: 아파트 동 호수 발성
			var orgMessage = jsonObj['MESSAGE'];
			arrAddr = jsonObj['MESSAGE'].split('^');	// 행정동 주소를 담아 놓을 배열
			
			console.log("==============주소=============");
			console.log(orgMessage);
			console.log(arrAddr);
			console.log("==============================");
			// 현재 연결된 발신번호로 등록되어 있는 민원인의 정보를 가져옴
			$.ajax({
				type : "post",
				async : false,
				url : getContextPath() + "/ajax/main/getCustInfo.do",
				data : "pJson=" + getJsonStrInstantCustInfo(telNo, ""),
				success : function(data) {
					// param값을 JSON으로 파싱
					var jr = JSON.parse(data);

					if (jr != "") {
						if (jr.length == 1) {
							custTend = jr[0].CST_COMP;
							custNm = jr[0].CUST_NM;

							if (jr[0].CST_COMP_NM2) {
								custcomp2 = " > " + jr[0].CST_COMP_NM2
							}

							custcomp = jr[0].CST_COMP_NM + custcomp2;

							memo = jr[0].MEMO;
						} else if (jr.length > 1)
							custcomp = "중복민원인";
					} else {
						console.log("신규고객!");
						newCust = "new";
					}
				},
				error : function(data, status, err) {
					memo = "민원인 정보 지연";
				}
			});

//			IVR_Message = "7001";

			if (jsonObj['MESSAGE'] != "") {
				if (call_type != "4") {
					
					// DNIS(순천) 콜센터 인입 : 7000 / 콜센터상담사 연결 : 7001 / 관광콜센터 인입 : 7003 / 테스트 : 7090
					g_arr_UEI = jsonObj['MESSAGE'].split('^'); // UEI : DNIS^ANI^고객성향, OLD => UEI:DNIS^ANI^고객성향^IVR서비스코드
					
					console.log("===g_arr_UEI===");
					console.log(g_arr_UEI);
					
					dnis = (g_arr_UEI[10] == undefined || g_arr_UEI[10] == "" ) ? "7000" : g_arr_UEI[10]; 
				}
				
//				intvLgcd = g_ArsSvrCode[dnis].ext1_cd; // 제주도에서 쓰던 코드
			}

			$("#selCustGbCd").val(cust); // 민원인 구분 1 도민, 2관광객, 9기타

			// 신규고객 등록 2018.02.12
			if (newCust == "new") {
				initCustInfo();
				$("#tfCustNm").val("민원인");
				if (telNo.substr(0, 2) == "01") {
					$("#tfCustCelPhoneNum").val(telNo);
				} else {
					$("#tfCustPhoneNum").val(telNo);
				}
				$("#selCustGbCd").val(cust);
				InsertCustInfo();
			}

			/****************** 기존 및 신규 고객 처리 ****************** */
			$("#tfDialogMainCallPopupGeneralAni").val(getPhoneNumFormat(telNo));
			$("#tfDialogMainCallPopupGeneralCustNm").val(custcomp);
			if(dnis == "7003"){ 
				// 관광콜 인입
				$("#tfDialogMainCallPopupGeneralCallgb").val("관광콜 인입");
			}else if(dnis == "7090"){ 
				// 테스트콜 인입
				$("#tfDialogMainCallPopupGeneralCallgb").val("테스트콜 인입");
			}else if(dnis == "7000"){ 
				// 일반 콜센터 7000, 7001
				$("#tfDialogMainCallPopupGeneralCallgb").val("콜센터 연결요청");
			}else{
				console.log("예외 ) DNIS : " + dnis);
				$("#tfDialogMainCallPopupGeneralCallgb").val("콜센터 연결요청");
			}
			$("#tfDialogMainCallPopupGeneralCustAddr").val("");
			$("#tfDialogMainCallPopupGeneralMemo").val(memo);

			// 결과코드 -> 0: 행정동 발화 (읍면포함), 1: 법정동 발화, 2: 도로명 발화, 3: 여러동 존재, 4: 순천시 외 지역, 5: 잘못된 주소 (STT 오인식/없는동/무의미한말 발화), 6: 아파트 동 호수 발성
			if(arrAddr[2] == "Y") { // 결콰코드 : 성공
				$("#tfDialogMainCallPopupGeneralCustAddr").val(arrAddr[5]); // 행정동 주소
				if(arrAddr[1] == "3"){ // 여러동 존재시
					$("#selMainAddrDetail").html(arrAddr[3].split('&')[0]); // 주소 리스트에서 행정동만 가져온다. 행정동&법정동
				}else{
					$("#selMainAddrDetail").html("");
				}
			}else { // 결과코드 : 실패
				$("#tfDialogMainCallPopupGeneralCustAddr").val("");
				$("#selMainAddrDetail").html("인식실패");
			}

			// 민원인 성향 셋팅
			if (custTend == "030000" || custTend == "040000" || custNm == "기자" || custNm == "시의원") {
				$("#btnDialogMainCallPopupGeneral").prop("src", getContextPath() + "/resources/images/btn_call2.png");
				$(".call_01").attr("class","call_03");
				$("#tfDialogMainCallPopupGeneralCustNm").css("color", "red");
			} else {
				$("#btnDialogMainCallPopupGeneral").prop("src", getContextPath() + "/resources/images/btn_call1.png");
				$(".call_03").attr("class","call_01");
				$("#tfDialogMainCallPopupGeneralCustNm").css("color", "black");
			}

			$("#tfDialogMainCallPopupGeneralCallgb").focus();
			$("#dialogMainCallPopupGeneral").dialog("open");
		} else if (callType == '2') { // Outbound Call
			textState = "연결중";
		} else if (callType == '3') { // Inner Call
			textState = "내선전화";
			bInter = true;
			if (prevEvent != "DIAL") {
				$("#tfDialogMainCallPopupGeneralAni").val(telNo);
				// 민원인명이 없을시 20170731
				$("#tfDialogMainCallPopupGeneralCustNm").val("");
				$("#tfDialogMainCallPopupGeneralCallgb").val(textState);
				window.focus();
				$("#dialogMainCallPopupGeneral").dialog("open");
			}
		} else if (callType == '4') { // Consult Call
			textState = "협의콜";
		} else if (callType == '5') { // Transfer Call
			textState = "호전환";
		} else if (callType == '6') { // Conference Call
			textState = "회의통화";
		}
		break;
		
	case 'DIALING': // Outbound
		arState = new Array("3", "3", "2", "2", "3", "3", "3", "3", "3", "3");
		callType = jsonObj['CALL_TYPE']; // Call Type
		var telNo = jsonObj['TEL_NO']; // Dialing 전화번호
		g_connStat = "DIALING";

		// TODO 인바운드후 호전환시 아웃바운도로 변경 되는현상 체크필요
		if (callType == '2') { // Outbound
			gCallObj = new Object();
			gCallObj.CallStartTime = jsonObj['EVT_TIME'];
			gCallObj.CallGB = OUTBOUND;
			gCallObj.TelNo = telNo;

			textState = "연결중";
			bDialing = true;
			bReleased = false;
			bCalling = false;

			fnGetTicketId();
			$("#CALLNO").val(telNo);
			$("#labCallNumStatus").html(getPhoneNumFormat(telNo));
			gCallStartTime = jsonObj['EVT_TIME'];
			$("#tfContactInform").val($("#OUTDIAL").val());

			$("#selMainCallgbcd").val(OUTBOUND);
			RECKEY = "";

			//****************** 기존 및 신규 고객 처리 //신규고객 등록 2018.03.07 
			var custNm = "";
			var newCust = "exist"; // 신규고객 구분
			// 현재 연결된 발신번호로 등록되어 있는 민원인의 정보를 가져옴
			$.ajax({
				type : "post",
				async : false,
				url : getContextPath() + "/ajax/main/getCustInfo.do",
				data : "pJson=" + getJsonStrInstantCustInfo(telNo, ""),
				success : function(data) {
					// param값을 JSON으로 파싱
					var jr = JSON.parse(data);

					if (jr != "") {
						if (jr.length == 1) {
							custNm = jr[0].CUST_NM;
						} else if (jr.length > 1)
							custNm = "중복민원인";
					} else {
						console.log("아웃바운드 신규고객!");
						newCust = "new";
					}
				},
				error : function(data, status, err) {
					alert("민원인정보 가져오기 실패!! [" + telNo + "]");
				}
			});

			// 신규고객 등록 2018.03.07
			if (newCust == "new") {
				$("#tfCustNm").val("민원인");
				if (telNo.substr(0, 2) == "01") {
					$("#tfCustCelPhoneNum").val(telNo);
				} else {
					$("#tfCustPhoneNum").val(telNo);
				}
				InsertCustInfo();
			}
			/****************** 기존 및 신규 고객 처리 ****************** */
		}
		break;
		
	case 'ACW': // 후처리
		textState = "후처리";
		bDialing = false; // 후처리 후 상태 변경 안되서 추가함
		arState = new Array("2", "2", "3", "3", "3", "3", "2", "2", "2", "2");
		currStatus = jsonObj['STATUS_CD']; // ACW
		if (prevEvent != "ACW") {
			fnSaveWorkStatus();
			fnGetWaitCount(g_getWaitCountTest);
		}
		g_getWaitStatus = "run";
		g_readyFlag = true; // 대기버튼 바로 갈수 있게
		$("#btnCnslInit").prop("disabled", false);
		break;
		
	case 'AFTERPROC': // 상담이력 저장에 대한 응답
		break;
		
	case 'CONSULT':
		// 대상 통화중이거나 연결 안됨
		g_transFlag = true;

		if (g_ArsAuthProcess == "StartJ" || g_ArsAuthProcess == "StartP") {
			textState = "ARS인증";
			arState = new Array("3", "3", "3", "3", "3", "3", "3", "3", "3", "3");
			fnConference();
		} else {
			// 협의통화 연결시 버튼 활성화
			$(":button:contains('협의전달'), :button:contains('3자통화')").prop(
					"disabled", false).removeClass('ui-state-disabled');
			textState = "협의통화";
			arState = new Array("3", "3", "3", "3", "3", "3", "3", "3", "3", "3");
		}
		break;
		
	case 'IVRAUTH':
		if (prevEvent == "RELEASED") {
			// 고객이 먼저 전화를 끊은 겨우
			break;
		}
		fnUnHold();
		$("#dialogMainARSAuthPopup").dialog("close");
		textState = "통화중";
		arState = new Array("3", "3", "2", "2", "2", "3", "3", "3", "2", "2");

		console.log(JSON.stringify(jsonObj));
		var rtnMsg = jsonObj['MESSAGE'];
		var ARSAuthStatus = ""; // 동의 문구
		var rtnDate = "";

		if (g_ArsAuthProcess == "StartJ") {
			if (rtnMsg) {
				try {
					$("#hidMainSsNumber").val(rtnMsg);
					g_taxPop.taxPopupSsNumSet();
					g_taxPop.focus();
					g_transFlag = false;
				} catch (err) {
					console.log("ArsAuth Error!" + err.message);
				}
			}
		} else if (g_ArsAuthProcess == "StartP") {
			// INSERT 위치정보 동의시 위치데이타 존재
			var locaData = rtnMsg; // 위치동의 및 위치정보
			if (locaData) {
				var tmpDate = yyyyMMddhhmmss("");

				g_location.isVal = "1";
				g_location.adt = locaData.substr(1, 8);
				g_location.atm = locaData.substr(9, 6);
				g_location.qdt = tmpDate.substr(0, 8);
				g_location.qtm = tmpDate.substr(8, 6);
				g_location.telno = locaData.substr(15, 12).trim();
				g_location.addr = fn_subString(locaData.substr(27, 50), 0, 50);
				var len = g_location.addr.length;
				g_location.zip = locaData.substr(27 + len, 7).trim();
				g_location.x = locaData.substr(27 + len + 7, 10).trim();
				g_location.y = locaData.substr(34 + len + 10, 10).trim();
				g_location.type = locaData.substr(44 + len + 10, 3).trim();
				g_location.telcom = locaData.substr(54 + len + 3, 4).trim();
				g_location.result = locaData.substr(57 + len + 4, 6).trim();

				console.log(JSON.stringify(g_location));
				g_ArsAuthStatus = "1";// 위치검색 동의
				ARSAuthStatus = g_ArsAuthStatus == "1" ? "위치동의" : "위치거부";
				rtnDate = fnConvertDateFormat((g_location.adt + g_location.atm));
				$('#btnMap').show();
				$("#labPersonInformAgree").html(
						"[" + ARSAuthStatus + "][" + rtnDate + "]");
			}
		}
		g_ArsAuthProcess = ""; // 초기화
		break;
		
	case 'CONFERENCE':
		textState = "3자통화";

		if (g_ArsAuthProcess == "StartJ" || g_ArsAuthProcess == "StartP") {
			textState = "ARS인증";
			fnHold();
		}
		arState = new Array("3", "3", "2", "3", "3", "3", "3", "3", "3", "3");

		var telNo = jsonObj['TEL_NO'];
		var extNo = jsonObj['EXT_NO'];
		RECKEY = "";
		break;
		
	case 'TRANSFER':
		// 내선 착신시 'TRANSFER' pass
		if (prevEvent == "ESTABLISHED") {
			arState = new Array("3", "3", "2", "2", "2", "3", "3", "3", "2", "2");
			break;
		}

		RECKEY = jsonObj['REC_KEY']; // 녹취키(인바운드/아웃바운드)
		$("#tfRecId").val(RECKEY);

		var telNo = jsonObj['TEL_NO'];
		var extNo = jsonObj['EXT_NO'];
		gCallReleaseTime = jsonObj['EVT_TIME'];
		bCalling = false;
		break;
		
	case 'LOGOUT': // 로그아웃
		arState = new Array("3", "3", "3", "3", "3", "3", "3", "3", "3", "2");
		currStatus = jsonObj['STATUS_CD'];
		$("#mainTopCtiStatus").html("OFF");
		break;
	default:
		alert("CTI와 연결이 끊겼습니다. 재로그인 하세요.");
		break;
	}

	$("#AGENT_STATUS").val(textState);
	// 현재 상태 셋팅 및 상태유지 시간 초기화
	$("#labMainStatusNm").html(textState);
	$("#labMainStatusTime").html("00:00:00");
	g_statusStrtTime = new Date();

	OnButtonProc(arBtn, arBtnText, arState);
}

// 버튼 상태 제어 메소드
function OnButtonProc(arButton, arButtonText, arState)
{
	var preImg = new Array(); 
	try
	{
		for(var i = 0; i < arState.length; i++ )
		{
			switch(arState[i])
			{
				case "1" : // display ( using img )
					try {
						eval("document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<a onclick=\"fnProcButton(  \\\'"+ arButton[i] + "\\\')\"><img id=\"" + arButton[i] + "_img\"src=\"" + getContextPath() + "/resources/images/" + arButton[i] + ".png\" alt=\"" + arButtonText[i] + "\" style=\"cursor: pointer; width:58px; height:49px;\" draggable=\"false\">';");
						eval("document.getElementById( '"+ arButton[i] + "' ).style.display = '';");
						
						var $softPhoneImg = $("#" + arButton[i] + "_img");
						$softPhoneImg.mouseover(function(e) {
							var imgSrc = e.target.id;
							imgSrc = imgSrc.replace("_img", "");
	
							var $btnImg = $("#" + (e.target.id));
							$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + ".png"); // _over
							$btnImg.css("height", "10px;");
						});
	
						// mouseout event
						$softPhoneImg.mouseout(function(e) {
							var imgSrc = e.target.id;
							imgSrc = imgSrc.replace("_img", "");
							var $btnImg = $("#" + (e.target.id));
							$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + ".png"); // .png
						});
	
						// mousedown event
						$softPhoneImg.mousedown(function(e) {
							var imgSrc = e.target.id;
							imgSrc = imgSrc.replace("_img", "");
	
							var $btnImg = $("#" + (e.target.id));
							$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + "_over.png"); // _click
						});
	
						// mouseup event
						$softPhoneImg.mouseup(function(e) {
							var imgSrc = e.target.id;
							imgSrc = imgSrc.replace("_img", "");
	
							var $btnImg = $("#" + (e.target.id));
							$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + ".png"); // _over
						});
	
					} catch (err) {
						console.log("OnButtonProc Error :" + err.message);
					}
					break;
				
				case "2" : // dispay ( state img )
					// 이미지 셋팅 및 클릭 이벤트 삽입
					if(arBtn[i]==arButton[i]){
						if(arButton[i] != "softphone_10"){
							preImg="_over"; //로그아웃 제외 softphone_10
						}else{
							preImg="";
						}
					}
					eval("document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<a onclick=\"fnProcButton(  \\\'"+ arButton[i] + "\\\')\"><img id=\"" + arButton[i] + "_img\"src=\"" + getContextPath() + "/resources/images/" + arButton[i] +preImg +".png\" alt=\"" + arButtonText[i] + "\" style=\"cursor: pointer; width:58px; height:49px;\" draggable=\"false\">';");
					eval("document.getElementById( '"+ arButton[i] + "' ).style.display = '';");
					
					var $softPhoneImg = $("#" + arButton[i] + "_img");
					// mouseover event
					$softPhoneImg.mouseover(function(e)
					{
						var imgSrc = e.target.id;
						imgSrc = imgSrc.replace("_img", "");
						
						var $btnImg = $("#" + (e.target.id));
						$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + "_over.png"); // _over
						$btnImg.css("height","10px;");
					});
					
					// mouseout event
					$softPhoneImg.mouseout(function(e)
					{   var preImgg="";
						var imgSrc = e.target.id;
						imgSrc = imgSrc.replace("_img", "");
						var $btnImg = $("#" + (e.target.id));
						var arImg=imgSrc.split("_");
						if(Number(arImg[1]) < 10 ) preImgg ="_over"; 
						console.log(imgSrc+ ":"+ arImg[1]);
						$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + preImgg+ ".png"); // .png
					});
				
					// mousedown event
					$softPhoneImg.mousedown(function(e)
					{
						var imgSrc = e.target.id;
						imgSrc = imgSrc.replace("_img", "");
						
						var $btnImg = $("#" + (e.target.id));
						$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc +  "_click.png"); // _click
					});
					
					// mouseup event
					$softPhoneImg.mouseup(function(e)
					{
						var imgSrc = e.target.id;
						imgSrc = imgSrc.replace("_img", "");
						
						var $btnImg = $("#" + (e.target.id));
						$btnImg.prop("src", getContextPath() + "/resources/images/" + imgSrc + "_over.png"); // _over
					});
					break;
				
				case "3" : // display ( disable img )
					eval("document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<img src=\"" + getContextPath() + "/resources/images/" + arButton[i] + "_off.png\" draggable=\"false\" alt=\"" + arButtonText[i] + "\" style=\" width:58px; height:49px;\">';");
					eval("document.getElementById( '"+ arButton[i] + "' ).style.display = '';");
					break;
					
				case "4" : // none display
					eval("document.getElementById( '"+ arButton[i] + "' ).innerHTML = '<img src=\"" + getContextPath() + "/resources/images/" + arButton[i] + "_off.png\" draggable=\"false\" alt=\"" + arButtonText[i] + "\" style=\" width:58px; height:49px;\">';");
					eval("document.getElementById( '"+ arButton[i] + "' ).style.display = 'none';");
					break;
			}
		}
	}
	catch ( e )
	{
		alert("error = " + e.description);
	}
}

//버튼 클릭 시 실행 메소드
function fnProcButton(szButton)
{
	try
	{
		switch(szButton)
		{
			case "softphone_1" :		// 대기
				writeLogFile("on Button Click [READY]");
				 
				if(g_readyFlag)
				{
					g_readyFlag = false;
					fnAgentReady();
					CallReadyFunc();
					writeLogFile("Request [CT_READY]");
					// 행정정보 팝업이 열려있으면 해당 정보 초기화, 21.04.20
					if(g_taxPop != undefined && !g_taxPop.closed){
//						g_taxPop.btnLocalTaxInit_clickEvent();
						console.log("행정정보 안내 후 상담원이 대기를 눌렀을 때, 값 초기화 시키는 함수 들어가야함.");
//						g_taxPop.taxPopupinit(); // 초기화 미완성
						g_taxPop.window.close(); // 팝업 닫기
						
					}
				}
				else
				{ 
					g_readyFlag = true;
					fnAgentNotReady("7"); 
				}
				break;
				
			case "softphone_2" :		// 걸기
				writeLogFile("on Button Click [MAKECALL]");
				
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 80; 
				$("#divPhoneMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				break;
				
			case "softphone_3" :		// 끊기 x
				 writeLogFile("on Button Click [DROPCALL]");
				if(g_transFlag)
				{
					fnConsultCancel("");
					writeLogFile("Request [CT_TRANSFERCANCEL]");
					
					var arState = new Array( "2", "3", "3", "3", "3", "3", "3", "2", "2", "2");
					OnButtonProc(arBtn, arBtnText, arState);
					
					document.getElementById("AGENT_STATUS2").value = "AfterCallWork";
					$("#labMainStatusNm").html("후처리중");
					
					g_transFlag = false;
				}
				else
				{
					fnHangup();
					writeLogFile("Request [CT_DROPCALL]");
				}
				break;
				
			case "softphone_4" :		// 보류 x
				writeLogFile("on Button Click [DROPCALL]");
				
				if(g_holdFlag)
				{
					console.log("unhold");
					fnUnHold();
					writeLogFile("Request [CT_UNHOLDCALL]");
					g_holdFlag = false;
				}
				else
				{
					console.log("hold");
					fnHold();
					writeLogFile("Request [CT_HOLDCALL]");
					g_holdFlag = true;
				}
				
				break;
				
			case "softphone_5" :		// 협의 x
				//jjcc 협의시 보류음
				fnHold(); 
				g_holdFlag = true;
				
				writeLogFile("on Button Click [TRANSFERINIT]");
				
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 80; 
				$("#divPhoneMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				
				break;
				
			case "softphone_6" :		// 3자통화
				break;
			
			case "softphone_7" :		// 업무
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 150;
				$("#divRecentMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				
				break;
			
			case "softphone_8" :		// 이석 x
				writeLogFile("on Button Click [NOT READY]");
				
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 80;
				$("#divNotReadyMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				
				break;
				
			case "softphone_9" :		// 재접속
				writeLogFile("on Button Click [RECONNECT]");
				
				$("#mainTopCtiStatus").html("OFF");
				writeLogFile("Request [CT_CONNECTSERVER]");
					
				fnInitCTI();
					initData();		// 초기 데이터 셋팅
					initGrid();		// 그리드 초기 셋팅
				break;
			
			case "softphone_10" :	// 로그아웃
				writeLogFile("on Button Click [LOG OUT]");
				
				g_manualLogoutFlag = true;
				fnLogout();
				break;
			
			case "softphone_11" :	// 조직도 - 버스정보
				var paramURL = "http://bis.sc.go.kr:8282/internet/bisRouteSearch.view";
				var newWindow = window.open(paramURL, "버스정보", "width=1670,height=960,left=70,top=30, scrollbars=yes, resizable=yes, menubar=yes, toolbar=yes, location=yes, status=yes, resizable=yes");
				
				break;
			
			case "softphone_12" : // 행정정보 - 즐겨찾기
				var $btnId = $("#" + szButton);
				var divTop = $btnId.offset().top + 43;
				var divLeft = $btnId.offset().left + 150;
				$("#divFavoritMenu").css({ "top": divTop, "left": divLeft, "position": "absolute" }).show();
				
				break;
			
			case "softphone_13" :	// 즐겨찾기 - 조직도
				window.sessionStorage.setItem("fromFlag", "fromTop");
				window.sessionStorage.setItem("corpOpenType","callCorp");
				var paramURL = getContextPath() + "/web/counsel/organizationChart.do";
				gf_openDialog(paramURL,screen.width,982,"yes","yes",0,0);

				break;
			
			case "softphone_14" :	// SMS 발송 -행정정보
				openMenuPopup("CS0003");
				break;
			
			case "softphone_15" :	// FAX - sms
				window.sessionStorage.setItem("cnslSmsSendNum", "");
				window.sessionStorage.setItem("cnslSmsTcktId", "");
				openMenuPopup("CM0017");
				break;
			
			case "softphone_16" :	// 우편번호 검색 -sms
				webFaxLogin('/fax_send_list.php','');
				break;
			
			case "softphone_17" :	// 콜센터 운영관리 - 우편번호
				var paramURL = getContextPath() + "/web/main/jusoPopup.do"; 
				var newWindow = window.open(paramURL, "zipcode", "width=570,height=420, scrollbars=yes, resizable=yes");
				newWindow.focus();
				break;
			
			default :
				break;
		}
	}
	catch(e)
	{
		
		alert("WS_softPhone fnProcButton Error : " + e.message);
	}
}

function getJsonStrInsertAddr(arrAddr,tableNm){
	/*
	고객전화번호|결과코드|성공여부|주소리스트?|법정동 정제된 주소|행정동 정제된 주소|음성인식 결과|confidence_score|발성한횟수|음성파일경로
	결과코드 -> 0: 행정동 발화 (읍면포함), 1: 법정동 발화, 2: 도로명 발화, 3: 여러동 존재, 4: 순천시 외 지역, 5: 잘못된 주소 (STT 오인식/없는동/무의미한말 발화), 6: 아파트 동 호수 발성
	*/
	var mi = "";
	var h_addr = arrAddr[5];
	
	if(tableNm=="ch011"){
		mi = "Y2gwMTAuYWRkckluc2VydA==";		//ch010.addrInsert
		h_addr = arrAddr[5];
	}else{
		mi = "Y2gwMTAuYWRkclJldkluc2VydA=="; 	//ch010.addrRevInsert
		h_addr = $("#selMainAddrCd").val();
	}
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : mi,
			"map" : {
				"key" : "value",
				"tckt_id" : $("#tfMainTicketId").val(), //티켓ID
				"sndr_cntct_infm" : arrAddr[0],			//고객전화번호
				"spch_type" : arrAddr[1],				//결과코드 -> 0: 행정동 발화 (읍면포함), 1: 법정동 발화, 2: 도로명 발화, 3: 여러동 존재, 4: 순천시 외 지역, 5: 잘못된 주소 (STT 오인식/없는동/무의미한말 발화), 6: 아파트 동 호수 발성
				"succ_yn" : arrAddr[2],					//성공여부
				"addr" : arrAddr[3],					//주소 리스트
				"b_addr" : arrAddr[4],					//법정동 정제된 주소
				"h_addr" : h_addr,						//행정동 정제된 주소
				"stt_rcg_rst" : arrAddr[6],				//음성인식 결과
				"rcg_scr" : arrAddr[7],					//confidence_score
				"ORD" : arrAddr[8],						//발화순서
				"fl_pth" : arrAddr[9],					//음성파일경로
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
 