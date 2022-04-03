// 전역변수 선언
var g_timer = null;		// 작업을 위한 타이머
var g_statusStrtTime = null;		// 사용자의 상태 시작시간
var g_logoutFlag = false;
var g_autoReadySec = 10;
var g_trnrFlag = false;

var bSaveBtnClick = false;

// 기존 수신동의 항목을 보관할 변수 
var bOldSMS = false;
var bOldTel = false;
var bOldFAX = false;
var oobj=null;

var g_constName="시민"; // 신규민원인시 셋팅 민원인명

//감정분석 솔루션 서버 정보
var gVocCrmIp = "172.16.4.26";
var gVocCrmPort = "8080";
var gUsrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var g_selMainActtypecd="010000"; //초기값 직접상담
//var gConstImmeExcd ="90000000"; // 긴급통화 특코드 
//var gConstImmeLgcd ="90010000"; // 긴급통화 대코드
//var gConstImmeMdcd ="90010100"; // 긴급통화 중코드
var gConstImmeLgcd ="90000000"; // 긴급통화 특코드 
var gConstImmeMdcd ="90010000"; // 긴급통화 대코드
var gConstImmeSdcd ="90010100"; // 긴급통화 중코드

//var gConstMaliExcd ="70000000"; // 특이민원
var gConstMaliLgcd ="70000000"; // 특이민원

var gConferDept ="온누리콜센터"; // 바로가기 3자통화 부서 
var gConferAccepted ="담당자"; // 바로가기 3자통화 담당자
var gConferPhoneNum ="0269215603"; // 바로가기 3자통화 전화번호 
var gConferUsrId ="1"; // 바로가기 3자통화 사용자ID 
var gConferDeptCd ="150000"; // 바로가기 3자통화 기관코드 


var g_objEmpolyInfo={};

var typeObj={
		"01":"010000",
		"02":"010000",
		"03":"010100",
		"04":"030200",
		"05":"010000"
	};

/*
var xlmsCd={
		"x01":"10000000",
		"x02":gConstMaliExcd,
		"x03":"20000000",
		"x04":"10000000",
		"x05":gConstImmeExcd,
		
		"l01":"10010000",
		"l02":"70010000",
		"l03":"20010000",
		"l04":"",
		"l05":gConstImmeLgcd,
		
		"m01":"10012000",
		"m02":"all",
		"m03":"20011200",
		"m04":"",
		"m05":gConstImmeMdcd,
		
		"s01":"10012004",
		"s02":"all",
		"s03":"20011201",
		"s04":"",
		"s05":"all",
	};
*/

var xlmsCd={
		"l01":"10000000",
		"l02":gConstMaliLgcd,
		"l03":"20000000",
		"l04":"10000000",
		"l05":gConstImmeLgcd,
		
		"m01":"10010000",
		"m02":"70010000",
		"m03":"20010000",
		"m04":"",
		"m05":gConstImmeMdcd,
		
		"s01":"10012000",
		"s02":"all",
		"s03":"20011200",
		"s04":"",
		//"s05":gConstImmeMdcd,
		"s05":"all",		
	};

var tObItem=new Object;
		
var popupAddr = "";
var checkAddr = "";
 
// 악성민원 코드
var ivrBlockCd = ["7021","7022","7023","7024"];

/**
 * 사용자 업무상태
 * 
 * @returns
 */
function getJsonStrWorkStatusUpdate() 
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMjIudXBkYXRlV29ya1N0YXR1cw==",
		"map" : {
			"key" : "value",
			"usr_stat_cd" : currStatus
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrWorkStatusInsert(currStatus) 
{
	var ticketId = $("#tfMainTicketId").val();
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMjIuaW5zZXJ0V29ya1N0YXR1cw==",
		"map" : {
			"key" : "value",
			"usr_stat_cd" : currStatus,
			"tckt_id" : ticketId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrWorkStatusLogin() 
{
	var ticketId = $("#tfMainTicketId").val();
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMjIuaW5zZXJ0V29ya1N0YXR1c0xvZ2lu",
		"map" : {
			"key" : "value",
			"usr_stat_cd" : currStatus,
			"tckt_id" : ticketId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_UserInfo
function getJsonStrUserInfo(usr_id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMDEuc2VsZWN0",
		"map" : {
			"key" : "value",
			"usr_id" : usr_id
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UserInfo
function getJsonStrUserExtUpdate(ext)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMDEudXBkYXRlRXh0",
		"map" : {
			"key" : "value",
			"extn_no" : ext
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UserMenu
function getJsonStrUserMenu()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMTAuZ2V0VXNlck1lbnU=",
		"map" : {
			"key" : "value"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_NotReadyMenu
function getJsonStrNotReadyMenu()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZWxpc3Q=",
		"map" : {
			"key" : "value",
			"tp_cd" : "90008",
			"notuse" : false
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_FavoritMenu
function getJsonStrFavoritMenu()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZWxpc3Q=",
		"map" : {
			"key" : "value",
			"tp_cd" : "90090",
			"notuse" : false
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_InsertUserLogoutHistory
function getJsonStrInsertUserLogoutHistory()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b2gwMjAudXBkYXRlTG9nb3V0VG0=",
		"map" : {
			"key" : "value",
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"lgt_tm" : changeTimeString(new Date())
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_InsertUserLogoutStatus
function getJsonStrInsertUserLogoutStatus()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMjEubWVyZ2U=",
		"map" : {
			"key" : "value",
			"wrk_dt" : changeDateString(new Date()),
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"lvof_time" : changeTimeString(new Date())
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

//파라미터 셋팅_CustInfo
function getJsonStrCustInfo(phoneNum, custId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm8=",
		"map" : {
			"key" : "value",
			"cntct_infm" : phoneNum.replace(/-/gi, ""),
			"cust_id" : custId,
			"farm_uniqe_no" : ""
			//"farm_uniqe_no" : window.sessionStorage.getItem("farm_uniqe_no")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustInfo
function getJsonStrInstantCustInfo(phoneNum, custId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0SW5zdGFudEN1c3RJbmZv",
		"map" : {
			"key" : "value",
			"cntct_infm" : phoneNum.replace(/-/gi, ""),
			"cust_id" : custId,
			"farm_uniqe_no" : ""
			//"farm_uniqe_no" : window.sessionStorage.getItem("farm_uniqe_no")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//

//파라미터 셋팅_CustCntctInfm
function getJsonStrCustCntctInfm(custId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2QwMDQuZ2V0Q3VzdENudGN0SW5mbQ==",
		"map" : {
			"key" : "value",
			"cust_id" : custId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustCntctInfmView
function getJsonStrCustCntctInfmView(phonenum)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm9WaWV3", //cm003.getCustInfoView
		"map" : {
			"key" : "value",
			"phonenum" : phonenum
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_NewCustId
function getJsonStrNewCustId()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMDMuZ2V0Q3VzdElk",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_resvCallInfo
function getJsonStrCounselspec(tcktId)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "Y2gwMDEuY291bnNlbFNwZWM=",
			"map" : {
				"key" : "value",
				"tcktId" : tcktId
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_actStUpdate
function getJsonStrActStUpdate(tcktId, outTcktId, callbckId)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMDEuYWN0VHlwZVVwZGF0ZQ==",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId,
			"outTcktId" : outTcktId,
			"callbckId" : callbckId,
			"actStCd" : $("#selMainActstcd").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrResvUpdateList(tcktId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDUucmVzdlVwZGF0ZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 민원인정보 저장 데이터 설정
 * 
 * @param mode
 */
function getJsonStrInsertCustInfo(mode)
{
	var qt = "";
	var mi = "";
	
	if(mode == "insert")
	{
		qt = "aW5zZXJ0"; 									//insert
		mi = "Y20wMDMuaW5zZXJ0Q3VzdEluZm8="; 	//cm003.insertCustInfo
	}
	else
	{
		qt = "dXBkYXRl";
		mi = "Y20wMDMudXBkYXRlQ3VzdEluZm8=";
	}
	
	// SMS수신동의
	var bSMS = $("#chkSMS").is(':checked');
	// 전화수신동의
	var bPhone = $("#chkPhone").is(':checked');
	// FAX수신동의
	var bFAX = $("#chkFAX").is(':checked');
	
	// 개인정보수집동의 
	var bAgreeChange = false;
	var infmYN = "Y";
	
	if (!bSMS && !bPhone && !bFAX) {
		infmYN = null;
	} else if(bFAX){
		infmYN = "N";
	}
	
	if (bOldSMS != bSMS || bOldTel != bPhone || bOldFAX != bFAX ) {
		bAgreeChange = true;
	}
	
	var loParam = {
		"qt" : qt,
		"mi" : mi,
		"map" : {
			"key" : "value",
			"cust_id" : $("#tfCustId").val(),
			"cust_nm" : $("#tfCustNm").val(),
			"corp_nm" : "",
			"cust_gb_cd" : $("#selCustGbCd").val(),                                                 // 국가 (민원인구분)
			"celphone_num" : $("#tfCustCelPhoneNum").val().replace(/-/gi, ""),                      // 휴대전화
			"phone_num" : $("#tfCustPhoneNum").val().replace(/-/gi, ""),                            // 전화번호
			"memo" : $("#tfCustMemo").val(),
			"home_tel_num": "",                                                                     // 집전화
			"email_addr": "",                                                                       // EMail주소
			"fax_no": $("#tfCustFaxNum").val().replace(/-/gi, ""),                                  // FAX번호
			//"farm_no" : $("#tfFarmDisNum").val(),  
			"cst_comp" : $("#tfCustCstComp").val(),                                                 // 민원인성향
			"cst_comp2" : "",
			"addr_no" : "", //$("#tfAddrNo").val()
			"eml_yn" : "",
			"infm_yn" : infmYN,                                             // 수신동의
			"infm_change" : bAgreeChange,                                                        // 수신동의 변경여부
			"sms_yn" : bSMS == true ? "Y" : null,
			"tel_yn" : bPhone == true ? "Y" : null,
			"fax_yn" : bFAX == true ? "Y" : null,
			"loc_yn" : g_ArsAuthStatus=="1"?"Y":"N"
					
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getSeoMooInfo_custArea() {
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "b20wNjEuZ2V0U2VvTW9vSW5mbw==",
		"map" : {
			"key" : "value",
			"oucode" : $("#mainTeamCd").val()
		}
	};
	
	return encodeURIComponent(JSON.stringify(loParam));
}

/**
 * 민원이관 정보
 * 
 * @returns
 */
function getJsonStrUpdateMinwonInfo() 
{
	var actStat=$("#selMainActstcd option:selected").val(); //처리유형상태 - 010000:미완료, 030400:완료;
	var affYN = $("#mainAffairYN").val();
	var subTeam=$("#subTeamCd").val();//보조부서
	var seoMooInfo;
	var sttcode;
	
	if (affYN == "N") {
		$.ajax({
			type : 'post',
			dataType : 'json',
			async : false,
			url : getContextPath() + '/ajax/main/getSeoMooInfo.do',
			data : "pJson=" + getSeoMooInfo_custArea(),
			success : function(data)
			{	
				seoMooInfo = data;
			},	
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
			
		});
	};
	
	if (affYN == "N") {
		sttcode = "010300"; // 지정
	} else {
		sttcode = "010200"; // 접수
	};
	
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y20wMzIudXBkYXRlVHJhbnNmZXJJbmZv",
			"map" : {
				"key" : "value",
				"tcktId" : $("#tfMainTicketId").val(),                                          // Ticket Id
				"rqsGb" : $("input:radio[name='rbReq']:checked").val(),                         // 민원처리구분
				"custNm" : $("#tfManAccepted").val(),                                           // 민원인명
				"custTelNo" : $("#tfAcceptedPhoneNum").val().replace(/-/gi, ""),                // 민원인 전화번호
				"trnrCont" : $("#tfMainTransferCont").val(),                                    // 이관내용
				"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                            // 센터코드
				"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                            // 팀코드
				"deptCd" : window.sessionStorage.getItem("DEPT_CD"),                            // 부서코드
				"mainTeamCd" : $("#mainTeamCd").val(),                                          // 주관부서 팀코드
				"mainDeptCd" : $("#mainDeptCd").val(),                                          // 주관부서 코드
				"mainAffsUsrId" : $("#mainAffairUsrId").val(),                                  // 주관부서 서무 사용자ID
				"mainAffsUsrNm" : $("#mainAffairUsrNm").val(),                                  // 주관부서 서무 사용자명
				"mainAffsTelNo" : $("#mainAffairTelNo").val().replace(/-/gi, ""),               // 주관부서 서무 전화번호
				"ofceTelNo" : $("#mainAffairTelNo").val().replace(/-/gi, ""),
				"seoMooUsrId" : affYN == "N" ? seoMooInfo.AFFAIR_USR_ID : $("#mainAffairUsrId").val(),
				"seoMooUsrNm" : affYN == "N" ? seoMooInfo.AFFAIR_USR_NM : $("#mainAffairUsrNm").val(),
				"seoMooTelNo" : affYN == "N" ? seoMooInfo.AFFAIR_TEL_NO : $("#mainAffairTelNo").val().replace(/-/gi, ""),
				"subTeamCd" : $("#subTeamCd").val(),                                            // 보조부서 팀코드
				"subDeptCd" : $("#subDeptCd").val(),                                            // 보조부서 코드
				"subAffsUsrId" : $("#subAffairUsrId").val(),                                    // 보조부서 서부 사용자ID
				"subAffsUsrNm" : $("#subAffairUsrNm").val(),                                    // 보조부서 서무 사용자명
				"subAffsTelNo" : $("#subAffairTelNo").val().replace(/-/gi, ""),                  // 보조부서 서무 전화번호
				"resultRcv" : $("input:radio[name='rbResult']:checked").val(),                    // 처리결과
//				"actMainProcSt" : actStat=="010000"?"010100":"010200",      // 민원처리상태1 '010100 콜센터대기, 010200 부서접수'
				"actMainProcSt" : actStat == "010000" ? "010100" : sttcode,      // 민원처리상태1 '010100 콜센터대기, 010200 부서접수, 010300담당자지정'
				"actSubProcSt" : actStat=="010000"?"010100":(subTeam!=""?"010200":"010100"),             			// 민원처리상태2 '010100 콜센터대기, 010200 부서접수'
				"cnslMainProcCont" : "",             			// 처리민원1
				"cnslSubProcCont" : "",             			// 처리민원2
				"cnslMainRtnRsn" : "",             		// 반송사유1
				"cnslSubRtnRsn" : "",             			// 반송사유2
				"mainChange" : $("#tfTransfDept_01").val(),					// 이관민원 변경이력체크
				"subChange" : $("#tfTransfDept_02").val()					// 이관민원 변경이력체크
				
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 통화중에 상담저장버튼 클릭시 사용 
 */
function getJsonStrUpdateCnslInfo(mode) 
{
	var currentDate = new Date();
	//var intvExCd = $("#selMainIntvExCd").val();
	var intvLgCd = $("#selMainIntvLgCd").val();
	var intvMdCd = $("#selMainIntvMdCd").val();
	var intvSmCd = $("#selMainIntvSmCd").val();
	var actType = $("#selMainActtypecd").val();
	var keyWord = $("#selMainKeyword").val()=="all"?"":$("#selMainKeyword").val();
	var resvTelNo = "";
	var trnrTelNo = "";
	var refId = "";
	
	// 캠페인 상담이력을 위한 변수

	
	//캠페인의 경우 셋팅 다르게 변경
	if (mode == "C"){
		actType = "070000";			// 처리유형  (90014) -> 설문(070000)
		intvLgCd = "001000000";		// 대분류 시정일반
		intvMdCd = "001013000";		// 중분류 해피콜
		intvSmCd = "001013001";		// 소분류 콜센터
	}
	
	if (actType == '040000') {  // 콜백등록
		resvTelNo = $("#tfMainCallbckRegPhoneNum").val().trim() != "" ? $("#tfMainCallbckRegPhoneNum").val().replace(/-/gi, "") : "";
	} else if (actType == '020000') {  // 통화예약
		resvTelNo = $("#tfMainResvPhoneNum").val().trim() != "" ? $("#tfMainResvPhoneNum").val().trim().replace(/-/gi, "") : "";
	} else if (actType == "030200" || actType == "030300" || actType == "030500") {  // 호전환 / 상담후 호전환 / 담당자 부재중
		trnrTelNo = $("#tfAcceptedPhoneNum").val().trim() != "" ? $("#tfAcceptedPhoneNum").val().trim().replace(/-/gi, "") : "";  
	} 
	
	if (actType == '050000' || $("#callBckMainId").val() != "") {
		refId = $("#callBckMainId").val();
	}
	
	if (gCallStartTime == "") 
		gCallStartTime = changeTimeString(currentDate);

	if (gCallReleaseTime == "") 
		gCallReleaseTime = changeTimeString(currentDate);
	
	if (gCallConnectTime == "") 
		gCallConnectTime = gCallReleaseTime;

	var starate="4";
	if(fnvalidate($("[name='star_rating']").val())){
		starate=$("[name='star_rating']").val();
	}else{
		starate="4";
	}
	
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMDEuY291bnNlbFVwZGF0ZQ==", //여기1
			"map" : {
				"key" : "value",
				// MERGE INSERT 추가
				"sndr_cntct_infm" : $("#tfContactInform").val().replace(/-/gi, ""),
				"call_id" : RECKEY,
				"recd_id" : $("#USERID").val(),                            //$("#EXT").val(),	// 녹취플레이어 호출시 통화당시의  CTI_ID //내선번호가 필요함.
				"suvy_yn" : "N",
				//
				"rcvCont" : $("#tfMainRcvCont").val(),																			  // 문의내용
				"callGbCd" : $("#selMainCallgbcd").val(),																		  // 콜구분(인바운드/아웃아운드)
				"actStCd" : $("#selMainActstcd").val(),                                                                           // 상담결과(완료/미완료)
				"refId" : refId,                                                                           				 		  // 참조ID
				"actTypeCd" :actType,                                                                         				 	  // 처리유형
				"actCont" : $("#tfMainActCont").val(),                                                                            // 응답내용
				"call_strt_tm" : gCallStartTime,                                                                                  // 통화시작시간
				"call_cnnct_tm" : gCallConnectTime,                                                                               // 통화연결시간
				"call_end_tm" : gCallReleaseTime,                                                                                 // 통화종료시간
				"starate" : starate,
				"intvLgCd" : intvLgCd == 'all' ? "" : intvLgCd,                                                                   // 상담유형 - 대
				"intvMdCd" : intvMdCd == 'all' ? "" : intvMdCd,                                                                   // 상담유형 - 중
				"intvSmCd" : intvSmCd == "all" ? "" : intvSmCd,                             									  // 상담유형 - 소
				"clrmant" : $("#tfClaimant").val(),
				"clrmant_telno" : $("#tfClaimantPhoneNum").val(),
				"custId" : $("#tfCustId").val(),                                                                                  // 민원인ID
				"holdCount" : g_holdCount,
				"callbackId" : $("#callBckMainId").val(),                                                                         // callbakId
				"tcktId" : $("#tfMainTicketId").val(),                                                                            // 상담이력  Ticket ID
				
				/*
				"tcktId" : $("#tfMainTicketId").val(),                                                                            // 상담이력  Ticket ID
				"custId" : $("#tfCustId").val(),                                                                                  // 민원인ID
				"custNm" : $("#tfCustNm").val(),                                                                                  // 민원인명
				"refId" : refId,                                                                           				 		  // 참조ID
				"actTypeCd" :actType,                                                                         				 	  // 처리유형
				"rcvCont" : $("#tfMainRcvCont").val(),                                                                            // 문의내용
				"chGbCd" : "11000",                                                                                                // 채널구분 ('전화')
				"callGbCd" : $("#selMainCallgbcd").val(),                                                                         // 콜구분(인바운드/아웃아운드)
				"actStCd" : $("#selMainActstcd").val(),                                                                           // 상담결과(완료/미완료)
				"actCont" : $("#tfMainActCont").val(),                                                                            // 응답내용
				"starate" : starate,
				//"intvExCd" : intvExCd,                                                                                             // 기관구분
				"intvLgCd" : intvLgCd == 'all' ? "" : intvLgCd,                                                                                           // 상담유형 - 대
				"intvMdCd" : intvMdCd == 'all' ? "" : intvMdCd,                                                                   // 상담유형 - 중
				"intvSmCd" : intvSmCd == "all" ? "" : intvSmCd,                             // 상담유형 - 소
				//"lang_cd" :  $("#selMainLang").val(),																			  // 언어코드
				//"pps_cd" : "", //목적코드// 목적코드
				"oldActTypeCd" : "060000", // $("#oldActTypeCd").val(),                                                                        // 이전 처리유형
				"resvDt" : $("#tfMainRescDtm").val() != "" ? changeDateString(getResvDate($("#tfMainRescDtm").val())) : "",       // 예약일자
				"resvTm" : $("#tfMainRescDtm").val() != "" ? changeTimeString(getResvDate($("#tfMainRescDtm").val())) : "",       // 예약시간
				"call_strt_tm" : gCallStartTime,                                                                                  // 통화시작시간
				"call_cnnct_tm" : gCallConnectTime,                                                                               // 통화연결시간
				"call_end_tm" : gCallReleaseTime,                                                                                 // 통화종료시간
				"callbackId" : $("#callBckMainId").val(),                                                                         // callbakId
				"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                                                              // 센터코드
				"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                                                              // 팀코드
				"deptId" : window.sessionStorage.getItem("DEPT_CD"),                                                              // 부서코드				
				"trnrCenterCd" : "",
				"trnrTarget" : $("#tfMainTransferOrg").val(),
				"trnrTeamCd" : $("#tfMainTrnrRcvTeamCd").val(),                                                                   // 이관/호전환 대상 팀
				"trnrTeamNm" : $("#tfMainOrganization").val(),                                                                    // 이관/호전환 대상 팀명
				"trnrDeptId" : $("#tfMainTrnrRcvDeptCd").val(),                                                                   // 이관/호전환 대상 부서 
				"trnrUsrId" : $("#responsibleUsrId").val(),                                                                       // 이관/호전환/콜백 대상 사용자
				"trnrUsrNm" : $("#tfManAccepted").val(),
				"extAgnId" : $("#tfMainExtAgencyId").val(),
				"trnrTelNo" : trnrTelNo,                                                                                          // 호전환 전화번호
				"resvTelNo" : resvTelNo, // 체류기간
				"clrmant" : $("#tfClaimant").val(),
				"clrmant_telno" : $("#tfClaimantPhoneNum").val(),
				"keyWord" : keyWord ,
				"holdCount" : g_holdCount,
				"isChanged" : ""
				*/
			}
		};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

function fnvalidate(obj)
{
 			if(typeof obj == "undefined" || obj == null || obj == '' || obj == "undefined") {
 				return false
 			}else{
 				return true;
 			}
 		
}

/**
 * 상담이력 저장데이터 생성
 * 
 * 주) 녹취청취플레이어 호출시 통화일자, callid, 통화당시의 내선번호가 필요하여 녹취키항목에 내선번호설정처리. 
 */
function getJsonStrInsertCnslInfo() 
{
	console.log("강제저장 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	var currentDate = new Date();

	//var intvExCd = $("#selMainIntvExCd").val();
	var intvLgCd = $("#selMainIntvLgCd").val();
	var intvMdCd = $("#selMainIntvMdCd").val();
	var intvSmCd = $("#selMainIntvSmCd").val();
	
	var keyWord = $("#selMainKeyword").val()=="all"?"":$("#selMainKeyword").val();
	
	var ContactInform = $("#tfContactInform").val();
	
	if (ContactInform == null) {
		ContactInform = "";
	} 
 
	var actTypeCd=$("#selMainActtypecd").val();
	var actStCd=$("#selMainActstcd").val();
	var deptMainUsr=$("#tfOrgDeptUser_01").val();
	//이관민원
	if(actTypeCd=="030100" && deptMainUsr==""){
		actStCd="010000"; //미완료
	}
	
	/*
	if(intvLgCd.substring(0, 2) != intvMdCd.substring(0, 2))
		intvMdCd = intvLgCd.substring(0, 2) + intvMdCd.substring(2, 6);
	*/
	
	if (gCallStartTime == "") 
		gCallStartTime = changeTimeString(currentDate);

	if (gCallReleaseTime == "") 
		gCallReleaseTime = changeTimeString(currentDate);
	
	if (gCallConnectTime == "") 
		gCallConnectTime = gCallReleaseTime;
	
	var starate="4";
	if(fnvalidate($("[name='star_rating']").val())){
		starate=$("[name='star_rating']").val();
	}else{
		starate="4";
	}
	
	//insert //ch001.saveCnslInfo 
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : (bCalling?"Y2gwMDEuaW5zZXJ0Q25zbEluZm8=":"Y2gwMDEuc2F2ZUNuc2xJbmZv"),
		"map" : {
			"key" : "value",
			"cust_id" : $("#tfCustId").val(), 
			"tckt_id" : $("#tfMainTicketId").val(),
			"call_id" : RECKEY,                                        // CTI에서 제공하는 Call Id
			"recd_id" : $("#USERID").val(),                            //$("#EXT").val(),	// 녹취플레이어 호출시 통화당시의  CTI_ID //내선번호가 필요함.
			"ref_id" : "",
			"rcv_dt" : $("#labMainRcvDt").html().replace(/-/gi, ""),
			"rcv_tm" : $("#labMainRcvTm").html().replace(/:/gi, ""),
			"rcv_usr_id" : window.sessionStorage.getItem("USR_ID"),
			"ch_gb_cd" : "11000",                                       // 채널구분 확인 필요. 
			"sndr_cntct_infm" : ContactInform.replace(/-/gi, ""),
			"callback_cntct_infm" : $("#tfMainCallbckRegPhoneNum").val().trim() != "" ? $("#tfMainCallbckRegPhoneNum").val().replace(/-/gi, "") : "", 
			"call_gb_cd" : $("#selMainCallgbcd").val(),
			"act_st_cd" : actStCd,
			"act_type_cd" : actTypeCd,
			"tckt_end_dt" : "",
			"tckt_end_tm" : "",
			"trnr_yn" : $("#selMainActtypecd").val() == "030100" ? "Y" : "N",
			"resv_yn" : $("#selMainActtypecd").val() == "020000" ? "Y" : "N",
			"act_lmt_dt" : "",
			"intv_lg_cd" : intvLgCd,
			"intv_md_cd" : intvMdCd,
			"intv_sm_cd" : intvSmCd,
			"agt_req_tm" : "",
			"suvy_yn" : "N",
			"cnsl_cs_vltn" : starate, //친절도
			"rcv_cont" : $("#tfMainRcvCont").val(),
			"act_cont" : $("#tfMainActCont").val(),
			"call_strt_tm" : gCallStartTime,
			"call_cnnct_tm" : gCallConnectTime,
			"call_end_tm" : gCallReleaseTime,
			"acw_tm" : getDiffSecond(g_statusStrtTime, currentDate),
			"resv_dt" : $("#tfMainRescDtm").val() != "" ? changeDateString(getResvDate($("#tfMainRescDtm").val())) : "",
			"resv_tm" : $("#tfMainRescDtm").val() != "" ? changeTimeString(getResvDate($("#tfMainRescDtm").val())) : "",
			"resv_cntct_infm" : $("#tfMainResvPhoneNum").val().trim() != "" ? $("#tfMainResvPhoneNum").val().trim().replace(/-/gi, "") : "",
			"cust_nm" : $("#tfCustNm").val(),
			"centerCd" : window.sessionStorage.getItem("CNTR_CD"),
			"teamCd" : window.sessionStorage.getItem("TEAM_CD"),
			"deptCd" : window.sessionStorage.getItem("DEPT_CD"),
			"callbacUsrId" : "N",
			"keyWord" : keyWord,
			"holdCount" : g_holdCount
		}
	};
	
	//if (bCalling && bSaveBtnClick) {
	//	loParam.mi = "";         // 상담정보 수정처리 Query
	//}
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 중복고객 팝업에서 호출되어짐
 */
function setDupCustInfo(custID){
	 
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/instantUpdateCnslInfo.do",
		data : "pJson=" + instantInsertCustCnslInfo(custID),
		success : function(data)
		{
			 //상담이력에 중복고객정보 업데이크
		},
		error : function(data, status, err) 
		{
			alert("setDupCustInfo() Fail!");
			//networkErrorHandler(data, status, err);
		}
	});
	
	setCustInfo("",custID); //중복객중 선택된 고객정보 업데이트
	
	//$("#btnSearchCnsl").trigger("click");
}

/**
 * 상담이력 선택된 고객정보 업데이트 
  
 */ 
function instantInsertCustCnslInfo(custID)
{
	var custId = custID==""?$("#tfCustId").val():custID;
	var ticketId=$("#tfMainTicketId").val();
	//insert //ch001.updateAutoCnslInfo 
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMDEudXBkYXRlQXV0b0Nuc2xJbmZv",
		"map" : {
			"key" : "value",
			"cust_id" : custId, 
			"tckt_id" : ticketId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_CnslList
function getJsonStrCnslList(gridtype)
{
	var custId = "";
	var sndrCntctInfm = "";
	
	if($("#tfCustId").val() != "")
		custId = $("#tfCustId").val();
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY25zbExpc3RNYWlu",
		"map" : {
			"key" : "value",
			"cust_id" : custId,
			"sndr_cntct_infm" : sndrCntctInfm,
			"gridtype" : gridtype
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_FaxSendList
function getJsonStrFaxList()
{
	/*
	var fax_no = "";
	
	if($("#tfCustId").val() != "" && $("#tfCustFaxNum").val().trim().replace(/-/gi, "") != "")
		fax_no = $("#tfCustFaxNum").val().trim().replace(/-/gi, "");
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuZmF4TGlzdA==",
		"map" : {
			"key" : "value",
			"fax_no" : fax_no
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
	*/
}

/**
 * 문자전송 목록 조회요청
 */
function getJsonStrSmsSendList()
{
	var srchType = "";
	var srchVal = "";
	
	if($("#tfCustId").val() != "" && $("#tfCustCelPhoneNum").val().trim().replace(/-/gi, "") != "")
	{
		srchType = "cntct_infm";
		srchVal = $("#tfCustCelPhoneNum").val().trim().replace(/-/gi, "");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMjAuY2hTZW5kTGlzdA==",
		"map" : {
			"key" : "value",
			"ch_gb_cd" : "12000",
			"srchUsr" : window.sessionStorage.getItem("USR_ID"),
			"srchType" : srchType,
			"srchVal" : srchVal
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_CodeSpec
function getJsonStrCodeSpec(tp_cd, cd)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDIuY29kZXNwZWM=",
		"map" : {
			"key" : "value",
			"tp_cd" : tp_cd,
			"cd" : cd
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_NotyetCount
function getJsonStrNotyetCount()
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

//파라미터 셋팅_WaitingCount
function getJsonStrWaitingCount()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y3dfY2luZTA0LmdldFdhaXRpbmc=",
		"map" : {
			"key" : "value",
			"routeCode" : window.sessionStorage.getItem("CNTR_CD") == "010000" ? "1" : ""
		}
	};
	
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

/*
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
*/
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

//파라미터 셋팅_getJsonStrDeleteElement
function getJsonStrDeleteElement(param)
{
	var loParam = param;
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_LmtCnslCnt
function getJsonStrLmtCnslCnt()
{
	var loParam =  {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuZ2V0TG10Q25zbENudA==",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_OrgUsrInfo
function getJsonStrOrgUsrInfo(userId)
{
	var loParam =  {
		"qt" : "c2VsZWN0T25l",
		"mi" : "dl9vcmdkZXB0ZW1wLmVtcEluZm8=",
		"map" : {
			"key" : "value",
			"emp_id" : userId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_OrgInfo
function getJsonStrOrgInfo(userId)
{
	var loParam =  {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wNTEuZXh0ZXJuYWxDb3JwSW5mbw==",
		"map" : {
			"key" : "value",
			"ext_agn_id" : userId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_NoticeList
function getJsonStrNoticeList()
{
	var loParam =  {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAuZ2V0Tm90aWNlTGlzdEZvck1haW4=",
		"map" : {
			"key" : "value",
			"usr_grd_cd" : window.sessionStorage.getItem("USR_GRD_CD")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


/**
 * 위치검색동의 생성
 * 
 */
function setARSAuthInsert(splitObj)
{
	var agr_yn= g_ArsAuthStatus=="1"?"Y":"N";
  
	//insert //oh023.saveCnslInfo
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMjMuaW5zZXJ0TG9jYXRpb25JbmZv",
		"map" : {
			"key" : "value",
			"cust_id" : $("#tfCustId").val(), 
			"tckt_id" : $("#tfMainTicketId").val(),
			"agr_dt" : splitObj.adt,
			"agr_tm" : splitObj.atm,
			"agr_yn" : agr_yn ,
			"req_dt" : splitObj.qdt,
			"req_tm" : splitObj.qtm,
			"loc_dtmn_cd" : splitObj.type,
			"rslt_cd" : splitObj.result
		}
	};
 
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


// VOC접수 문의 내용을 가져와 화면에 세팅
function setQuestionInfo(question)
{
	$("#tfMainRcvCont").val(question);
	$("#selMainActtypecd").val("030100");
	$("#btnVoc").css("background", "red");
	$("#btnVoc").css("border", "solid 1px red");
	$("#btnVoc").attr("disabled", "disabled");
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

/**
 * 민원인정보를 조회하여 화면에 설정한다.
 */
function setCustInfo(phoneNum, custId)
{
	var popupItem="";
	if(custId=="DoNotEmpty"){
		popupItem="DUPCUST";
		custId="";
	}
	
	if(phoneNum == "" && custId == "")
		return;
	
	if (phoneNum != undefined && phoneNum != "") {
		$("#tfContactInform").val(getPhoneNumFormat(phoneNum));                                           // 연결전화번호
		$("#video_telNo").val(getPhoneNumFormat(phoneNum)); // 영상상담 번호 셋팅 
	}
	
	// 현재 연결된 발신번호로 등록되어 있는 민원인의 정보를 가져옴
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/getCustInfo.do",
		data : "pJson=" + getJsonStrCustInfo(phoneNum, custId),
		success : function(data)
		{
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			
	 
			if(jr != "")
			{
				if(jr.length == 1)
				{
					$("#tfCustId").val(jr[0].CUST_ID);
					$("#tfCustNm").val(jr[0].CUST_NM);
					
					if (jr[0].CST_COMP_NM2 != undefined && jr[0].CST_COMP_NM2 != "") {
						$("#tfCustCstCompNm").css("color", "red");
						$("#tfCustCstCompNm").val(jr[0].CST_COMP_NM + " > " + jr[0].CST_COMP_NM2);
					} else {
						$("#tfCustCstCompNm").css("color", "black");
						$("#tfCustCstCompNm").val(jr[0].CST_COMP_NM);
					}
					$("#tfCustCstComp").val(jr[0].CST_COMP);					
					$("#tfCustCelPhoneNum").val(getPhoneNumFormat(jr[0].CELL_NUM));
					$("#tfCustPhoneNum").val(getPhoneNumFormat(jr[0].PHONE_NUM));
					$("#tfCustFaxNum").val(getPhoneNumFormat(jr[0].FAX_NUM));
					$("#tfCustMemo").val(jr[0].MEMO);
					$("#selCustGbCd").val(jr[0].CUST_GB_CD);
					
					if($("#tfCustCelPhoneNum").val().trim() != "")
						$("#imgMainCellPhoneNum").show();
					
					if($("#tfCustPhoneNum").val().trim() != "")
						$("#imgMainPhoneNum").show();
		
					if($("#tfCustFaxNum").val().trim() != "")
						$("#imgCustFaxNum").show();
					
					if (jr[0].SMS_YN == 'Y') {
						$("#chkSMS").prop('checked', true);
						bOldSMS = true;
					} else {
						$("#chkSMS").prop('checked', false);
						bOldSMS = false;
					}
										
					if (jr[0].TEL_YN == 'Y') {
						$("#chkPhone").prop('checked', true);
						bOldTel = true;
					} else {
						$("#chkPhone").prop('checked', false);
						bOldTel = false;
					}
					
					if (jr[0].FAX_YN == 'Y') {
						$("#chkFAX").prop('checked', true);
						bOldFAX = true;
					} else {
						$("#chkFAX").prop('checked', false);
						bOldFAX = false;
					}
					
					if (jr[0].SMS_YN == 'Y' && jr[0].TEL_YN == 'Y' && jr[0].FAX_YN == 'Y') {
						$("#chkAll").prop('checked', true);
					} else {
						$("#chkAll").prop('checked', false);
					}
					
					
//					if (jr[0].INFM_DTM || jr[0].LOC_DTM) {
					if (jr[0].INFM_DTM) {
						var strAuth ="";
						if (jr[0].INFM_YN=='Y' ){
							strAuth="수신 ";
						}else if (jr[0].INFM_YN=='N'){
							strAuth="수신거부 ";
						}
						// 21.06.01 위치 주석
						/*
						else if (jr[0].LOC_YN=='Y' ){
							strAuth="위치 ";
						}else if (jr[0].LOC_YN=='N'){
							strAuth="위치거부 ";
						}
						*/
						if(jr[0].INFM_DTM){
							$("#labPersonInformAgree").html("["+strAuth +": " + fnConvertDateFormat(jr[0].INFM_DTM)+"]");					
						}
						/*
						else if(jr[0].LOC_DTM){
							$("#labPersonInformAgree").html("["+strAuth +": " + fnConvertDateFormat(jr[0].LOC_DTM)+"]");					
						}
						*/
					} 

					$("#btnCustSave").show();
					$("#btnCustSaveIns").hide();
					
				//	setSelectBoxWithCodeLoad($("#selMainIntvLgCd").val(), $("#selMainIntvMdCd").val(), "all");
					
					// 하단 그리드 리로드
					reloadGrid();
				 
				}
				else if(jr.length > 1)
				{
					if(popupItem=="DUPCUST"){
						window.sessionStorage.setItem("setCustInfoType", "DUPSEL");
					}else{
						window.sessionStorage.setItem("setCustInfoType", "main");
					}
					// 인입번호를 셋팅하여 민원인 선택 창 팝업
					window.sessionStorage.setItem("setCustInfoPopupType", phoneNum);
					window.sessionStorage.setItem("setCustInfoPopupSearchNm", "");
					
					window.sessionStorage.setItem("parentCustId", "");
					window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", ""); 
					openMenuPopup("CM0121");
				}
			}
			else
			{
				// 상담AP에 민원인정보가 없는 경우
				$("#labCustNewCustomer").show();
				$("#tfCustNm").val(g_constName);
				
				if (phoneNum != "" && phoneNum.length > 9) 
				{
					// 후대폰  번호 Check
					if (phoneNum.indexOf('010') == 0 || 
						phoneNum.indexOf('011') == 0 ||
						phoneNum.indexOf('016') == 0 || 
						phoneNum.indexOf('017') == 0 ||
						phoneNum.indexOf('018') == 0 || 
						phoneNum.indexOf('019') == 0 )
					{
						$("#tfCustCelPhoneNum").val(getPhoneNumFormat(phoneNum));
					} else {
						$("#tfCustPhoneNum").val(getPhoneNumFormat(phoneNum));
					}
				}else if(phoneNum != "" && phoneNum.length < 6){
					$("#tfCustPhoneNum").val(phoneNum);
				} else {
					$("#tfCustPhoneNum").val(getPhoneNumFormat(phoneNum));
				}
			}
		},
		error : function(data, status, err) 
		{
			alert("민원인정보 저장 실패!! ["+phoneNum+", "+custId+"]");
			//networkErrorHandler(data, status, err);
		}
	});
}

//레디 클릭 시 상담준비를 위한 메소드
function CallReadyFunc()
{
	window.sessionStorage.setItem("callType", "");
	window.sessionStorage.setItem("setCustInfo", "false");
	
	// 통화시간 관련 변수 초기화
	gCallStartTime   = "";            // 통화시작시간
	gCallReleaseTime = "";            // 통화종료시간
	gCallConnectTime = "";            // 통화연결시간
	
	// 통화상태 관련 Flag
	g_holdFlag    = false;            // 보류여부                 
	g_trnrFlag    = false;            // 호전환상태여부
	g_transFlag   = false;
	
	$("#CALLNO").val("");
	$("#OUTDIAL").val("");
	$("#RECURL").val("");
	
	$("#labCallTypeStatus").html("&nbsp;");
	$("#labCallNumStatus").html("");
	$("#labMainCntctInfm").val("");
	
	initCustInfo();
	initCnslInfo();
	
	//refreshNotyetCnt();
	

}

// 로그아웃 메소드
function fnLogout()
{
	g_logoutFlag = true;
	
	// cti logout
	if($("#CTIUSRYN").val() == "Y")
	{
		//CT_LOGOUT($("#EXT").val(), $("#USERID").val());
		//fnLog("Request [fnLogoutCTI]");		
		fnLogoutCTI();
		currStatus = "10000";
		fnSaveWorkStatus();
	}
	
	// 로그아웃 이력 저장
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/insertUserLogoutHistory.do",
		data : "pJson=" + getJsonStrInsertUserLogoutHistory(),
		success : function(data)
		{
			console.log("logout History save complete!!");
			
			// 근태현황 테이블에 저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/insertUserLogoutStatus.do",
				data : "pJson=" + getJsonStrInsertUserLogoutStatus(),
				success : function(data)
				{
					console.log("login status save complete!!");
					
					// 로그인 화면 open
//					location.href=getContextPath() + "/web/logout.do";
					var paramURL = getContextPath() + "/web/logout.do";
					window.open(paramURL, "logout", "");
					
//					var paramURL = getContextPath() + "/web/user/login.do";
//					window.open(paramURL, "login", "");

					// 현재 세션을 clear
					window.sessionStorage.clear();
					
					// 메인 창 닫음
					selfClose();
				},
				error : function(data, status, err) 
				{
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

/**
 * 현재상태 지속시간 표시 타이머
 */
function timerFunc()
{
	$("#labMainStatusTime").html(getDiffTime(g_statusStrtTime, new Date()));
}

//대기자 체크
function refreshWaitingCnt()
{
	/*
	// 대기자 체크
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/getWaitingCount.do",
		data : "pJson=" + getJsonStrWaitingCount(),
		success : function(data)
		{
			$("#labMainWaitingCustCount").html(data.WAIT);
		},
		error : function(data, status, err) 
		{
			//console.log("code:"+data.status+"\n"+"message:"+data.responseText+"\n"+"error:"+err);
			//networkErrorHandler(data, status, err);
		}
	});
	*/
}

/**
 * 화면하단 정보를 새로고침을 하는 함수
 */
function refreshNotyetCnt()
{
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
//				$("#divUnderInboundCnt").html(data.INCNT);
//				$("#divUnderOutboundCnt").html(data.OUTCNT);
//				$("#divUnderCallTimeCnt").html(data.CALLLTM + "(" + data.CALLLTMAVG + ")");
				$("#divUnderNotyetCnt").html(data.NOTYET); // 미완료
				$("#divUnderResvCnt").html(data.RESV);  //예약
				$("#divUnderMessageCnt").html(data.NOTE); // 쪽지
				$("#divUnderComplaintCnt").html(data.SMSSND); //SMS
				$("#divUnderCallbackCnt").html(data.CALLBCK); //콜백
				$("#divUnderCmpgCnt").html(data.CMPG); //해피콜(캠페인)
				
				// 콜백 건수가 한건 이상 있을 경우 강조 표현
				if(parseInt(data.CALLBCK) > 0)
				{
					$("#divUnderCallbackCnt").css("background-color", "#CD1039");
					$("#divUnderCallbackCnt").css("color", "#FFFFFF");
				}
				else
				{
					$("#divUnderCallbackCnt").css("background-color", "#FFFFFF");
					$("#divUnderCallbackCnt").css("color", "#0467D1");
				}
			}
			else
			{
				//$("#divUnderInboundCnt").html("0");
				//$("#divUnderOutboundCnt").html("0");
				//$("#divUnderCallTimeCnt").html("00:00:00");
				$("#divUnderNotyetCnt").html("0"); // 미완료
				$("#divUnderResvCnt").html("0");  //예약
				$("#divUnderMessageCnt").html("0"); // 쪽지
				$("#divUnderComplaintCnt").html("0"); //SMS
				$("#divUnderCallbackCnt").html("0"); //콜백
				$("#divUnderCmpgCnt").html("0"); //해피콜(캠페인)
			}
		},
		error : function(data, status, err) 
		{
			//networkErrorHandler(data, status, err);
		}
	});
	 
}

/**
 * 예약통화여부 Check
 */
function checkResvCnsl()
{
	/*
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
					$("#labSlideAlertMsg").html("30분 안에<br /><label style='color:red; font-size: 18pt; font-weight: bold;'>" + data.RESV_CNT + "</label> 건의 예약이<br />존재합니다.");
					$("#divSlideAlert").toggle(1000);
					setTimeout(function(){$("#divSlideAlert").toggle(1000);}, 5000);
					
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
	*/
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

//쪽지 알림 설정
function checkMessage()
{
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
				// 쪽지 알람 표시 후 알람 여부 업데이트
				if(parseInt(data.NOTARLMCNT) > 0)
				{
					$("#labSlideAlertMsgMessage").html("읽지않은 쪽지가<br /><label style='color:red; font-size: 18pt; font-weight: bold;'>" + data.NOTREADMCNT + "</label> 건 존재합니다.");
					$("#divSlideAlertMessage").toggle(1000);
					setTimeout(function(){$("#divSlideAlertMessage").toggle(1000);}, 5000);
					
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
//					$("#labMainMessageTitleText").html("(" + data.NOTREADMCNT + ")");
					$("#labMainMessageTitleText").html("");
				else
					$("#labMainMessageTitleText").html("");
			}
		},
		error : function(data, status, err) 
		{
			//networkErrorHandler(data, status, err);
		}
	});
}

// 메인 하단 공지사항 reload
function reloadNoticeBar()
{	
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/getNoticeList.do",
		data : "pJson=" + getJsonStrNoticeList(),
		success : function(data)
		{
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var ii=0;
			var value = "";
			$("#mrqNoticeBar").html("");
			if(jr != "")
			{
				$.each(jr, function(key, state)
				{
					if(state.EMRG_YN == "Y")
						value += "<li style='color: #fdef16; height:18px;' onclick='showNoticeDetail(" + state.TBBS_ID + ")'>[긴급]" + state.TBBS_TTL + "</li>";
					else
						value += "<li style='height:18px;' onclick='showNoticeDetail(" + state.TBBS_ID + ")'>[일반]" + state.TBBS_TTL + "</li>";
				   ii++;
				});
			}
			$("#mrqNoticeBar").append(value);
			if(ii > 1){
				fn_article("notice5", "", true);
			}
		},
		error : function(data, status, err) 
		{
			//networkErrorHandler(data, status, err);
		}
	});
}

// 공지사항 클릭 시 공지사항 팝업
function showNoticeDetail(tbbsId)
{
	window.sessionStorage.setItem("notice_tbbs_id", tbbsId);
	openMenuPopup("OM0002");
}

// 하단 그리드 reload
function reloadGrid()
{
	// 하단 그리드 리로드
	$("#tblCnslHistoryTabMain").jqGrid("setGridParam", {postData : {pJson : getJsonStrCnslList("")}, page : 1, sortname : "RCV_DTM", sortorder : "desc"});
	$("#tblCnslHistoryTabMain").trigger("reloadGrid");
	
	$("#tblCnslHistoryTabNotComplete").jqGrid("setGridParam", {postData : {pJson : getJsonStrCnslList("notyet")}, page : 1, sortname : "RCV_DTM", sortorder : "desc"});
	$("#tblCnslHistoryTabNotComplete").trigger("reloadGrid");
	
	$("#tblCnslHistoryTabFax").jqGrid("setGridParam", {postData : {pJson : getJsonStrFaxList()}, page : 1, sortname : "RSDATE", sortorder : "desc"});
	$("#tblCnslHistoryTabFax").trigger("reloadGrid");
	
//	$("#tblCnslHistoryTabSMS").jqGrid("setGridParam", {postData : {pJson : getJsonStrSmsSendList()}, page : 1, sortname : "CH_SND_ID", sortorder : "desc"});
//	$("#tblCnslHistoryTabSMS").trigger("reloadGrid");
}

//unloade page event
function unloadPage()
{
	// 로그아웃 처리용 화면 open
	if(!g_logoutFlag){
		fnLogout(); //로그아웃
//		window.open(getContextPath() + "/web/user/logout.do", "logout", "");
	}
}

function unload(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/web/logout.do",
		success : function(data)
		{
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 전화걸기 버튼이나 협의통화, 호전환 버튼 클릭 시 팝업 표시
function createOutboundPopup(callType)
{
	window.sessionStorage.setItem("callType", callType);
	window.sessionStorage.setItem("fromFlag", "fromTop");
	window.sessionStorage.setItem("corpOpenType","callCorp");
	
	openMenuPopup("CM0311");                                        // 조직도 화면 팝업
}

/**
 * 전화걸기 함수
 * (상황에 따른 callType 셋팅 필요)
 * 
 * @param p_phoneNum
 */
function makeCall(p_phoneNum)
{
	var argumVal="";
	var pLength = arguments.length;
	var calltype="";
	var phonNum=p_phoneNum;

	if(!phonNum){
		alert("전화번호를 입력해 주세요.");
		return;
	}
	
	if(pLength == 2){
		argumVal=arguments[1];
	}
	
	if(argumVal=="popupOrg"){
		pLength =1;
	}else {
		phonNum=areaNumber(p_phoneNum);
		if(!phonNum){
			alert("전화번호를 입력해 주세요.");
			return;
		}
	}
//	if(pLength==2){
//		alert("예외호출!");
//		return;
//	}
	
	// cti 사용유무를 체크하여 통화연결
	if($("#CTIUSRYN").val() == "N")
	{
		console.log(phonNum);
	
		alert("cti를 사용하지 않는 사용자는 전화연결을 할 수 없습니다.");
		return;
	}
	
	var sStat=$("#AGENT_STATUS").val();
	// 보류상태일 경우 전화 연결 불가
	if( sStat=="후처리" || sStat=="대기"
	   ||sStat=="준비"||sStat=="휴식"|| sStat == "식사"
	   || sStat=="교육"|| sStat=="기타" || sStat=="3자통화" || sStat=="협의통화"|| sStat=="로그인") 
	{
		alert(sStat+"상태에서는 전화연결을 할 수 없습니다.");
		return;
	}
	 
	if(pLength == 1){
			calltype = window.sessionStorage.getItem("callType");
		 				window.sessionStorage.setItem("callType", "");
		$("#OUTDIAL").val(phonNum);
	}else if(pLength == 2){
		 
		if(argumVal == "happycall"){
			//해피콜 팝업에서호출
			g_happyCallgb=argumVal;
			calltype = "makecall";
		}else{
			 //location:위치검색, ssnumber:주민번호
			calltype=argumVal;
		}
		$("#OUTDIAL").val(phonNum);
	}

	if(calltype == "consult")
	{
		//협의시도시 보류, 전화걸기시 보류풀고 걸기 시도
		fnUnHold();
		g_holdFlag = false;
					
		if( ( $("#OUTDIAL").val() !="" || $("#tfCustCelPhoneNum").val() !="" || $("#tfCustPhoneNum").val() !="") && (gCallStartTime != null && gCallReleaseTime != null))
		{
			var arState = new Array( "3", "3", "3", "3", "3", "3", "3", "3", "3", "2");
			OnButtonProc(arBtn, arBtnText, arState);
	
			//  초기화 ARS 인증 오류시 남아 있을수 있슴.
			g_ArsAuthProcess="";
			
			// 협의통화일경우
			//CT_TRANSFERINIT($("#OUTDIAL").val(), $("#CALLNO").val());
			//fnLog("Request [fnConsult]");
			fnConsult("CONSULT", $("#OUTDIAL").val(), $("#tfCustId").val(), $("#CALLNO").val());
			
			//실제로 협의 연결시 값 true로 변경
		//	g_transFlag = true;
			
			$("#popupMessageConfirmPopup").show();
			$("#labTransferDialog").html("");
			// 호전환 확인 팝업 표시
			$("#dialogMainConfirmPopup").dialog("open");
			// 협의통화 연결시 버튼 비활성화
			$(":button:contains('협의전달'), :button:contains('3자통화')").prop("disabled", true).addClass( 'ui-state-disabled' );
		}else{
			console.log("gCallStartTime:"+gCallStartTime);
			alert("통화중에만 협의통화를 할 수 있습니다.");
		}
		 
	}
	else if(calltype == "transfer")
	{
		// 호전환일 경우
		//CT_BLINDTRANSFER($("#EXT").val(), $("#OUTDIAL").val());
		//fnLog("Request [fnSingleStepTransfer]");
		fnSingleStepTransfer( $("#OUTDIAL").val(), $("#tfCustId").val(), $("#CALLNO").val());
	}
	else if(calltype == "makecall")
	{
		if((gCallStartTime == null && gCallReleaseTime == null) || (gCallStartTime != null && gCallReleaseTime != null))
		{
			// 이석상태일 경우만 발신통화 가능
			if($("#labMainStatusNm").html() == "식사" || $("#labMainStatusNm").html() == "교육" || $("#labMainStatusNm").html() == "미팅" || 
					$("#labMainStatusNm").html() == "업무" || $("#labMainStatusNm").html() == "휴식")
			{
				var tmpOutDIAL=$("#OUTDIAL").val();
				var tmpCustId=$("#tfCustId").val();
				var tmpCALLNO=$("#CALLNO").val();
				var tmpCustNm=$("#tfCustNm").val();
				$("#tfMainTicketId").val(""); //티켓ID  초기화
				
				var callBackId=$("#callBckMainId").val();
				var refId=$("#refId").val();
				//이전 콜 정보 삭제(초기화)
				CallReadyFunc();
				
				//초기화된 ID 재설정
				$("#callBckMainId").val(callBackId);
				$("#refId").val(refId);
				//2018.11.20
				$("#OUTDIAL").val(getPhoneNumFormat(p_phoneNum));
				
				// 통화중이 아닐경우
				$("#labCallTypeStatus").html("아웃바운드상담");
				//CT_MAKECALL($("#OUTDIAL").val());
				//fnLog("Request [MakeCall]");
				fnMakeCall(tmpOutDIAL, tmpCustId, tmpCALLNO, tmpCustNm);
			}
			else
			{
				alert("발신통화는 업무 상태로 시도 해 주시기 바랍니다.");
				
				//해피콜이면 팝업포커스
				if(g_happyCallgb=="happycall") {
					g_happyCallPop.focus();
				}					
				return;
			}
		}
		else if(gCallStartTime != null && gCallReleaseTime == null)
		{
			// 통화중일 경우
			alert("통화중에는 전화를 걸 수 없습니다.");
		}
	}
	else if(calltype=="location"||calltype=="ssnumber")
	{
		//alert(gCallStartTime+" : "+gCallReleaseTime);
		if( ( $("#OUTDIAL").val() !="" || $("#tfCustCelPhoneNum").val() !="") && (gCallStartTime != null && gCallReleaseTime != null))
		{
			$("#labARSAuthDialog").html("");
			$("#dialogMainARSAuthPopup").dialog("open");
			// 통화중일 경우
			//fnConsult("TRANSFER", phonNum , $("#USERID").val(), $("#CALLNO").val());
			var typeflag="";
			if(calltype=="location"){
				typeflag="P";
				g_ArsAuthProcess="StartP";
			}else{
				typeflag="J";
				g_ArsAuthProcess="StartJ";
			}
				
			var sendUEI=typeflag+"^"+phonNum+"^"+$("#USERID").val();
			// 3000 : 평택 ( LG )
			// 1997 : 김포/순천 (alcatel )
			fnConsult("AUTH", "1997" , $("#USERID").val(), sendUEI); 
		}
		else
		{
			alert("통화중에만 인증받을 수 있습니다.");
		}
	}
	else
	{
		if((gCallStartTime == null && gCallReleaseTime == null) || (gCallStartTime != null && gCallReleaseTime != null))
		{
			// 이석상태일 경우만 발신통화 가능
			if($("#labMainStatusNm").html() == "식사" || $("#labMainStatusNm").html() == "교육" || $("#labMainStatusNm").html() == "미팅" || 
					$("#labMainStatusNm").html() == "업무" || $("#labMainStatusNm").html() == "휴식")
			{
				// 통화중이 아닐경우
				$("#labCallTypeStatus").html("아웃바운드상담");
				//CT_MAKECALL($("#OUTDIAL").val());
				//fnLog("Request [MakeCall]");
				fnMakeCall($("#OUTDIAL").val(), $("#tfCustId").val(), $("#CALLNO").val(), $("#tfCustNm").val());
			}
			else
			{
				alert("발신통화는 업무 상태로 시도 해 주시기 바랍니다.");
				return;
			}
		}
		else if(gCallStartTime != null && gCallReleaseTime == null)
		{
			// 통화중일 경우
			//CT_TRANSFERINIT($("#OUTDIAL").val(), $("#CALLNO").val());
			//fnLog("Request [fnConsult]");
			fnConsult("TRANSFER", $("#OUTDIAL").val(), $("#tfCustId").val(), $("#CALLNO").val());
			g_holdFlag = true;
			
			// 호전환 확인 팝업 표시
			$("#dialogMainConfirmPopup").dialog("open");
		}
	}
}

/**
 * 상담정보 저장 Validation Check 
 */
function valCnslSave()
{
	// 민원인정보가 선택되지 않은 경우
	if($("#tfCustId").val() == "")
		return false;
	
	// 문의내용이 입력되지 않은 경우
	if($("#tfMainRcvCont").val().trim() == "")
		return false;
	
	// 처리내용이 입력되지 않은 경우
	if($("#tfMainActCont").val().trim() == "")
		return false;
	
	// 처리유형이 예약통화일 경우
	if($("#selMainActtypecd").val() == "020000")
	{
		if($("#tfMainRescDtm").val().length != 16)
			return false;
		
		if(!checkResvDate($("#tfMainRescDtm").val()))
			return false;
		
		if($("#tfMainResvPhoneNum").val().trim() == "")
			return false;
	}
	
	return true;
}

// 자동대기 시간 흐른 후 호출되는 함수
//function execAutoReady()
//{
//	if($("#CALLNO").val() != "")
//	{
//		if(valCnslSave())
//		{
//			// 만약 상담 저장 할 수 있는경우라면 상담 저장 후 ready 실행
//			$("#btnCnslSave").trigger("click");
//			
//			setTimeout(function(){
//				//CT_READY($("#EXT").val(), $("#USERID").val());
//				//fnLog("Request [fnReady]");
//				fnAgentReady();
//			}, 200);
//			
//			g_autoReadyTimer = null;
//		}
//		else
//		{
//			// 상담 저장 할 수 없는 경우라면 메시지 출력 후 자동대기 off 로 변경
//			alert("상담내용을 자동으로 저장 할 수 없습니다.\n\n수동으로 저장 해 주시기 바랍니다.");
//			
//			// 상담내용을 저장 할 수 없는 경우 한번 더 자동 대기 수행
//			g_autoReadyTimer = setTimeout(execAutoReady, 1000 * g_autoReadySec);
//		}
//	}
//	
//	g_runAutoReadyFlag = false;
//}

/**
 * 민원인정보 검색
 */
function searchCustInfo()
{
	window.sessionStorage.setItem("setCustInfoPopupType", "modal");
	window.sessionStorage.setItem("parentCustId", "");
	window.sessionStorage.setItem("setCustInfoType", "main");
	
	window.sessionStorage.setItem("setCustInfoPopupSearchNm", "");
	window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", "");
	
	if($("#tfCustCelPhoneNum").val().trim() != "")
		window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", $("#tfCustCelPhoneNum").val().trim());
	else if($("#tfCustPhoneNum").val().trim() != "")
		window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", $("#tfCustPhoneNum").val().trim());
	else if($("#tfCustNm").val().trim() != "")
		window.sessionStorage.setItem("setCustInfoPopupSearchNm", $("#tfCustNm").val().trim());
	else 
		window.sessionStorage.setItem("setCustInfoPopupSearchNm", "");
	
	openMenuPopup("CM0121");
}

// 목록에서 선택된 민원인 정보를 화면에 셋팅
function setCustInfoFromView(cust_nm, corp_nm, htel_no, tel_no, farm_no, addr_no)
{
	$("#tfCustId").val("");
	
	if(cust_nm == null || cust_nm == "")
		$("#tfCustNm").val(corp_nm);
	else
	{
		$("#tfCustNm").val(cust_nm);
		$("#tfCorpNm").val(corp_nm);
	}
	
	$("#tfCustCelPhoneNum").val(htel_no);
	$("#tfCustPhoneNum").val(tel_no);
	$("#tfFarmDisNum").val(farm_no);
	$("#tfAddrNo").val(addr_no);
}

 

/**
 * 민원인정보 수정
 */
function saveCustInfo()
{
	//입력값 확인
	if($("#tfCustNm").val().trim() == null || $("#tfCustNm").val().trim() == "")
	{
		alert("민원인명을 입력 하세요.");
		return;
	}
	
	if($("#tfCustCelPhoneNum").val().trim() == "" && $("#tfCustPhoneNum").val().trim() == "" ) 
	{
		alert("핸드폰, 전화번호 중 하나 이상의 연락정보가 필요합니다.");
		return;
	}
	
	if($("#selCustGbCd").val() == null || $("#selCustGbCd").val() == "")
	{
		alert("민원인 유형을 선택 해 주세요.");
		return;
	}
	
	if($("#tfCustCstComp").val() == null || $("#tfCustCstComp").val() == "")
	{
	//	alert("민원인 성향을 선택 해 주세요.");
	//	return;
		/*
		 * 민원인성향코드
		 * 
		 *   010000 일반
		 *   020000 관계자
		 *   030000 악성
		 *   040000 특이민원
		 */
		$("#tfCustCstComp").val("010000");   
		
	}
	
	if($("#tfCustId").val() != "")
	{
		// 민원인정보저장
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/updateCustInfo.do",
			data : "pJson=" + getJsonStrInsertCustInfo("update"),
			success : function(data)
			{
				if(arguments.length==0){
					alert("민원인정보가 저장되었습니다.");
				}
				setCustInfo("", $("#tfCustId").val());
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	{
		alert("수정할 민원인을 선택 하세요.");
		return;
	}
}

/**
 * 민원인정보 신규저장
 */
function InsertCustInfo()
{
	//입력값 확인
	if($("#tfCustNm").val().trim() == null || $("#tfCustNm").val().trim() == "")
	{
		alert("민원인명을 입력 하세요.");
		return;
	}
	
	if($("#tfCustCelPhoneNum").val().trim() == "" && $("#tfCustPhoneNum").val().trim() == "" ) 
	{
		alert("핸드폰, 사무실, 집 중 하나 이상의 연락정보가 필요합니다.");
		return;
	}
	
	if($("#selCustGbCd").val() == null || $("#selCustGbCd").val() == "")
	{
		alert("민원인구분을 선택 해 주세요.");
		return;
	}
	
	//if($("#selCustCstComp").val() == null || $("#selCustCstComp").val() == "")
	if ($("#tfCustCstComp").val() == null || $("#tfCustCstComp").val() == "")
	{   // 민원인성향값이 없을 경우 '일반'으로 설정한다.
		/*
		 * 민원인성향코드
		 * 
		 *   010000 일반
		 *   020000 관계자
		 *   030000 악성
		 *   040000 특이민원
		 */
		$("#tfCustCstComp").val("010000");
		//alert("민원인 성향을 선택 해 주세요.");
		//return;
	}

	// 민원인정보저장
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/getNewCustId.do",
		data : "pJson=" + getJsonStrNewCustId(),
		success : function(data)
		{
			$("#tfCustId").val(data.CUST_ID);
			
			// 민원인정보저장
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/insertCustInfo.do",
				data : "pJson=" + getJsonStrInsertCustInfo("insert"),
				success : function(data)
				{
					if(arguments.length==0){
						alert("민원인정보가 저장되었습니다.");
					}
					setCustInfo("", $("#tfCustId").val());
				},
				error : function(data, status, err) 
				{
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

/**
 * 민원인정보 초기화 
 */
function initCustInfo()
{
	$("#tfCustId").val("");                                         // 민원인
	$("#tfCustNm").val("");                                         // 민원인명
	$("#selCustCstComp").val("1");
	$("#tfCustPhoneNum").val("");
	$("#tfCustCelPhoneNum").val("");
	$("#tfCustMemo").val("");
	$("#tfCustFaxNum").val("");

	$("#labArsService").html(""); //ARS서비스명
	
	$("#labCustNewCustomer").hide();
	$("#imgMainCellPhoneNum").hide();
	$("#imgMainPhoneNum").hide();
	$("#imgMainHomeNum").hide();
	$("#imgCustFaxNum").hide();
	
	$("#btnCustSaveIns").show();
	$("#btnCustSave").hide();
	$("#btnCnslSave").prop("disabled", false);
	
	if(gUsrGrdCd < '030100'){
		$("#tfCustMemo").prop("disabled", true);
	}else{
		$("#tfCustMemo").prop("disabled", false);
	}
	
	$("#chkAll").prop('checked', false);
	$("#chkSMS").prop('checked', false);
	$("#chkPhone").prop('checked', false);
	$("#chkFAX").prop('checked', false);
	
	bOldSMS = false;
	bOldTel = false;
	bOldFAX = false;
	
	//setSelectBoxWithCode("selCustGbCd", "", "90043", "", "", "1");	    // 민원인구분 셋팅
	setObjSelectBoxWithCode("selCustGbCd", "", "","main","90043", "1");	// 민원인구분 셋팅 
	
	$("#tfCustCstCompNm").val("");                   // 민원인성향
	$("#tfCustCstComp").val("");                     // 민원인성향코드
	$("#labPersonInformAgree").html("");             // 수신동의 일시
	g_ArsAuthStatus="";								 // 수신동의인증 동의여부 전역변수
	
	// 하단 그리드 리로드
	reloadGrid();
}

var gCallObj;

/**
 * 콜정보 설정
 * 
 */
function fnSetCallInfo()
{	
	popupAddr = $("#tfDialogMainCallPopupGeneralCustAddr").val().replace(/ /gi, "");
	$("#labCallNumStatus").html(getPhoneNumFormat(gCallObj.TelNo));
	$("#CALLNO").val(gCallObj.TelNo);
	$("#labMainCntctInfm").val(getPhoneNumFormat(gCallObj.TelNo));
	$("#selMainCallgbcd").val(gCallObj.CallGB);
//	$("#labCustAddr").html($("#tfDialogMainCallPopupGeneralCustAddr").val());
	
	if(popupAddr != ""){
		
		// c20wMDIuc2VsSnVzb0Nk : sm002.selJusoCd
		$.ajax({
			type : "post",
			dataType : "json",
			async : false,
			url : getContextPath() + "/ajax/main/getJusoCd.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l", "c20wMDIuc2VsSnVzb0Nk", { "cd_nm" : popupAddr }),
			success : function(data) {
				console.log("주소 ID 값 가져오기 > " + data.CD);
				
				popupAddr = data.CD;
				$("#selMainAddrCd").val(data.CD);
				
				if($("#selMainAddrDetail").html() == ""){
					$("#selMainAddrCd").prop("disabled", true);
				}else{
					$("#selMainAddrCd").prop("disabled", false);
				}
				
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
		
	}else{
		$("#selMainAddrCd").val("all");
		$("#selMainAddrCd").prop("disabled", false);
	}
	
}

function fnActStValidate(){
//	010000	일반
//	010100	통화중단
//	020000	재통화
//	030100	민원이관
//	030200	호전환
//	030300	상담후호전환
//	030400	ARS호전환
//	030500	담당자부재중
//	040000	콜백등록
//	050000	콜백처리
//	060000	자동저장
//	070000	설문/캠페인
	
// 	10000000 순천시청
//  60000000 타기관
//  70000000 특인민원
//  90000000 긴급정보
	
	if(selMainLMScdCheck() == false)
	{
		return false;
	}
	
	var actTypeStcd = $("#selMainActtypecd").val(); 
	console.log(actTypeStcd)
	
	var actStcd = $("#selMainActstcd").val(); 
	var deptUser = $("#tfOrgDeptUser_01").val();
	//var selMainExCd = $("#selMainIntvExCd").val();
	
		// 문의내용
//	if($("#tfMainRcvCont").val().trim() == "")
//	{
//		alert("문의내용을 입력 하셔야 합니다.");
//		$("#tfMainRcvCont").focus();
//		return false;
//	}
//
//		// 답변내용
//	if($("#tfMainActCont").val().trim() == "")
//	{
//		alert("답변내용을 입력 하셔야 합니다.");
//		$("#tfMainActCont").focus();
//		return false;
//	}
	
	
	//직접상담
	if(actTypeStcd=="010000"){ 
		
		// 긴급정보시 신고인 정보
		/*if(selMainLgCd=="90000000"){
			if($("#tfClaimant").val().trim() == "")
			{
				alert("신고인명을 입력 하셔야 합니다.");
				$("#tfClaimant").focus(); 
				return false;
			}
			
			if($("#tfClaimantPhoneNum").val().trim() == "")
			{
				alert("신고인 전화번호를 입력 하셔야 합니다.");
				$("#tfClaimantPhoneNum").focus(); 
				return false;
			}	
		}*/
		 
	}else if(actTypeStcd=="020000"){ //재통화
		
		// 재통화
		if($("#tfMainRescDtm").val().trim() == "")
		{
			alert("재통화일시를 입력 하셔야 합니다.");
			$("#tfMainRescDtm").focus(); 
			return false;
		}
		
		if($("#tfMainResvPhoneNum").val().trim() == "")
		{
			alert("재통화 전화번호를 입력 하셔야 합니다.");
			$("#tfMainResvPhoneNum").focus(); 
			return false;
		}
		 
		 
	}else if(actTypeStcd=="030200" || actTypeStcd=="030300" || actTypeStcd=="030500"){ //호전환, 상담후호전환, 담당자부재중
		if($("#tfAcceptedPhoneNum").val().trim() == "")
		{
			alert("담당자 전화번호를 입력 하셔야 합니다.");
			$("#tfAcceptedPhoneNum").focus(); 
			return false;
		}
		 
	}else if(actTypeStcd=="030100"){
		
		if($("#tfManAccepted").val().trim() == "")
		{
			alert("민원인 이름을  입력 하셔야 합니다.");
			$("#tfManAccepted").focus(); 
			return false;
		}
		
		if($("#tfAcceptedPhoneNum").val().trim() == "")
		{
			alert("민원인 전화번호를 입력 하셔야 합니다.");
			$("#tfAcceptedPhoneNum").focus(); 
			return false;
		}
		
		// 민원이관
		if($("#tfMainTransferCont").val().trim() == "")
		{
			alert("이관내용을 입력 하셔야 합니다.");
			$("#tfMainTransferCont").focus();
			return false;
		}
		
		if(deptUser=="") { // 이관부서를 지정하지 않았을경우
			alert("이관민원을 저장하려면 담당부서를 지정해야 합니다.");
			 $("#tfTransfDept_01").focus();
			return false;
		}
	}
	
	return true;
}

function fnSaveMinwonInfo(mode)
{
	/*
	var jsonParam = getJsonStrUpdateMinwonInfo();
	
	$.ajax({
		type : 'post',
		datatype : 'json',
		async : true,
		url : getContextPath() + '/ajax/main/updateMinwonInfo.do',
		data : "pJson=" + jsonParam,
		success : function(data)
		{	
			//상담결과  010000:미완료,  030400:완료 => 완료시에 민원이관 관련 문자발송
			if($("#selMainActstcd").val()=="030400"){
				// 2020.06.18 SMS기능 막음
//				minwonAlrmSendSMS("main"); //이관민원접수 문자 알림
			}
			fnSaveCnslComplete(mode);
		},	
		error : function(data, status, err) 
		{
			alert("fnSaveMinwonInfo() Fail! ["+mode+"]");
			//networkErrorHandler(data, status, err);
		}
		
	});
	*/
	var tcktId = $("#tfMainTicketId").val();
	
	var actStat=$("#selMainActstcd option:selected").val(); //처리유형상태 - 010000:미완료, 030400:완료;
	var affYN = $("#mainAffairYN").val();
	var subTeam=$("#subTeamCd").val();//보조부서
	var seoMooInfo;
	var sttcode;
	
	if (affYN == "N") {
		$.ajax({
			type : 'post',
			dataType : 'json',
			async : false,
			url : getContextPath() + '/ajax/main/getSeoMooInfo.do',
			data : "pJson=" + getSeoMooInfo_custArea(),
			success : function(data)
			{	
				seoMooInfo = data;
			},	
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
			
		});
	};
	
	if (affYN == "N") {
		sttcode = "010300"; // 지정
	} else {
		sttcode = "010200"; // 접수
	};
	
	// 2021.10.01 insert 충돌 분리
	
	// merge cm032
	$.ajax({
		type : 'post',
		datatype : 'json',
		async : false,
		url : getContextPath() + '/ajax/counsel/step1.do',
		data : "pJson=" + step1(tcktId),
		success : function(data)
		{
			if($("#mainAffairUsrId").val() != ""){ // 이관부서1
				// merge cd033
				$.ajax({
					type : 'post',
					datatype : 'json',
					async : false,
					url : getContextPath() + '/ajax/counsel/step2Main.do',
					data : "pJson=" + step2Main(tcktId,affYN,actStat,sttcode,seoMooInfo),
					success : function(data)
					{
						if($("#tfTransfDept_01").val() != ""){
							// insert ch034 
							$.ajax({
								type : 'post',
								datatype : 'json',
								async : false,
								url : getContextPath() + '/ajax/counsel/step3.do',
								data : "pJson=" + step3(tcktId,true,affYN,actStat,sttcode),
								success : function(data)
								{
									
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
			
			if($("#subAffairUsrId").val() != ""){ // 이관부서2
				// merge cd033
				$.ajax({
					type : 'post',
					datatype : 'json',
					async : false,
					url : getContextPath() + '/ajax/counsel/step2Sub.do',
					data : "pJson=" + step2Sub(tcktId,actStat,subTeam),
					success : function(data)
					{
						if($("#tfTransfDept_02").val() != ""){
							// insert ch034 
							$.ajax({
								type : 'post',
								datatype : 'json',
								async : false,
								url : getContextPath() + '/ajax/counsel/step3.do',
								data : "pJson=" + step3(tcktId,false,affYN,actStat,sttcode),
								success : function(data)
								{
									
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
			
			if($("#selMainActstcd").val()=="030400"){
				minwonAlrmSendSMS("main"); //이관민원접수 문자 알림
			}
			
			fnSaveCnslComplete(mode);
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//Step1. MERGE CM032 
function step1(tcktId){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMzIubWVyZ2VUcmFuc2ZlckluZm8=", // cm032.mergeTransferInfo
		"map" : {
			"key" : "value",
			"tcktId" : tcktId,
			"rqsGb" : $("input:radio[name='rbReq']:checked").val(),                    		// 요청구분 긴급,7일이내
			"custNm" : $("#tfManAccepted").val(),                                 			// 민원인명
			"custTelNo" : $("#tfAcceptedPhoneNum").val().replace(/-|(\s*)/gi, ""),          // 민원인 전화번호
			"resultRcv" : $("input:radio[name='rbResult']:checked").val(),             		// 처리결과
			"trnrCont" : $("#tfMainTransferCont").val(),                                    // 이관내용
			"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                            // 센터코드
			"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                            // 팀코드
			"deptCd" : window.sessionStorage.getItem("DEPT_CD"),                            // 부서코드
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// Step2. MERGE CD003_Main
function step2Main(tcktId,affYN,actStat,sttcode,seoMooInfo){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMzIubWVyZ2VUcmFuc2Zlck1haW5EZXB0SW5mbw==", //cm032.mergeTransferMainDeptInfo
		"map" : {
			"key" : "value",
			"tcktId" : tcktId,
			"mainTeamCd" : $("#mainTeamCd").val(),                                          // 주관부서 팀코드
			"mainAffsUsrId" : $("#mainAffairUsrId").val(),                                  // 주관부서 서무 사용자ID
			"mainAffsUsrNm" : $("#mainAffairUsrNm").val(),                                  // 주관부서 서무 사용자명
			"mainAffsTelNo" : $("#mainAffairTelNo").val().replace(/-/gi, ""),               // 주관부서 서무 전화번호
			"seoMooUsrId" : affYN == "N" ? seoMooInfo.AFFAIR_USR_ID : $("#mainAffairUsrId").val(),
			"seoMooUsrNm" : affYN == "N" ? seoMooInfo.AFFAIR_USR_NM : $("#mainAffairUsrNm").val(),
			"seoMooTelNo" : affYN == "N" ? seoMooInfo.AFFAIR_TEL_NO : $("#mainAffairTelNo").val().replace(/-/gi, ""),
			"actMainProcSt" : actStat == "010000" ? "010100" : sttcode,      // 민원처리상태1 '010100 콜센터대기, 010200 부서접수, 010300담당자지정'
			"cnslMainProcCont" : "",             						// 처리민원1
			"cnslMainRtnRsn" : "",             						// 반송사유1	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// Step2. MERGE CD003_Sub
function step2Sub(tcktId,actStat,subTeam){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMzIubWVyZ2VUcmFuc2ZlclN1YkRlcHRJbmZv", //cm032.mergeTransferSubDeptInfo
		"map" : {
			"key" : "value",
			"tcktId" : tcktId,
			"subTeamCd" : $("#subTeamCd").val(),                             // 보조부서 팀코드
			"subAffsUsrId" : $("#subAffairUsrId").val(),                     // 보조부서 서부 사용자ID
			"subAffsUsrNm" : $("#subAffairUsrNm").val(),                     // 보조부서 서무 사용자명
			"subAffsTelNo" : $("#subAffairTelNo").val().replace(/-/gi, ""),  // 보조부서 서무 전화번호
			"actSubProcSt" : actStat=="010000"?"010100":(subTeam!=""?"010200":"010100"),             				// 민원처리상태2 '010100 부서이관'	
			"cnslSubProcCont" : "",             		// 처리민원2
			"cnslSubRtnRsn" : "",           			// 반송사유2	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// Step3. INSERT CH034
function step3(tcktId,isMain,affYN,actStat,sttcode){
	var actMainProcSt = actStat == "010000" ? "010100" : sttcode;
	var actSubProcSt = actStat=="010000"?"010100":($("#subTeamCd").val()!=""?"010200":"010100");
			
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y20wMzIuaW5zZXJ0VHJhbnNmZXJJbmZvSGlz", //cm032.insertTransferInfoHis
		"map" : {
			"key" : "value",
			"tcktId" 		: tcktId,
			"ord" 	 		: isMain == true ? 1 : 2,
			"actProcSt" 	: isMain == true ? actMainProcSt : actSubProcSt, 		// 민원처리상태
			"affsUsrId" 	: isMain == true ? $("#mainAffairUsrId").val() : $("#subAffairUsrId").val(),	// 서무 사용자ID
			"affsUsrNm" 	: isMain == true ? $("#mainAffairUsrNm").val() : $("#subAffairUsrNm").val(),	// 서무 사용자명
			"trnrCont"  	: $("#tfMainTransferCont").val(),         						// 이관내용
			"cnslProcCont"  : "",       // 처리민원2
			"cnslRtnRsn" 	: "",	// 반송사유
		}
	};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//상담정보 저장완료
function fnSaveCnslComplete(mode) 
{
	if (mode != 'C' && ( !bCalling || mode == 'U')) {
		if(mode == 'CB'){
			return;
		}
		alert("상담정보가 저장되었습니다.");
	}

//저장시 무조건 초기화
//	if (!bCalling || mode == 'U') {
//		//** 상태저장 후 초기화 2018.03.10
//		alert("상담정보가 저장되었습니다.");
//		// 상담정보 저장 후 상태 초기화
//		$("#tfMainTicketId").val("");
//		CallReadyFunc();
//		//****************************
//	}	
	
	// 통화중이 아니면 상담정보 저장 후 Ticket Id 초기화
 	if (!bCalling) {
		$("#tfMainTicketId").val("");
		$("#btnCnslSave").prop("disabled", false);
		
		// 상담정보 저장 후 상태 초기화
		CallReadyFunc();
		
		// 자동대기 ON 상태면 현재 실행중인 타이머 종료 후 바로 대기
		if($("#spanUnderAutoRcv").html() == "ON" && $("#CTIUSRYN").val() == "Y")
		{
			//CT_READY($("#EXT").val(), $("#USERID").val());
			//fnLog("Request [fnAgentReady]");
			fnAgentReady();
			clearTimeout(g_autoReadyTimer);
		}
	} else if (mode == 'S') {
		$("#tfMainTicketId").val("");
		CallReadyFunc();
	} else {
		$("#btnCnslSave").prop("disabled", false);
	} 
 	
	// 저장 후 상담이력탭 자동 선택됨 , 이후 조회버튼 클릭 자동저장시엔 자동조회 안됨.
 	if(mode){
 		//$("#divRCTabCnslListBtn").trigger("click");
 		var index = $('a[href="#divRCTabCnslList"]').parent('li').index();
		rtabs.tabs({
			active : index
		});
 		$("#btnSearchCnsl").trigger("click");
 	}
 	$("#tblCounselList").trigger("reloadGrid");
}

function fnSaveCnsl(mode) {
	var jsonParam = "";
	var seoMooIsExist;
	
	if ($("#selMainActtypecd").val() == "030100" && $("#mainTeamCd").val()!="") { 
		$.ajax({
			type : 'post',
			dataType : 'json',
			async : false,
			url : getContextPath() + '/ajax/main/getSeoMooInfo.do',
			data : "pJson=" + getSeoMooInfo_custArea(),
			success : function(data)
			{	
				if (data == null) {
					seoMooIsExist = false;
				};
			},	
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
			
		});
	};
	
	if (seoMooIsExist == false) {
		alert("해당 부서에 서무가 없습니다.\n행정실에 서무지정을 요청해주세요.");
		$("#btnCnslSave").prop("disabled", false);
		return;
	} 
	
	if (mode == 'U' || mode == 'S' || mode == 'C') {
		jsonParam = getJsonStrUpdateCnslInfo(mode);
	} else if (bCalling) {
		jsonParam = getJsonStrInsertCnslInfo();
	} else {
		jsonParam = getJsonStrInsertCnslInfo();
	};
	
	var actTypeCd = $("#selMainActtypecd").val();
	
	// 상담정보저장
	// hhs 2020.06.01 insert 충돌 2개로 나눔
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/insertCnslInfo.do",
		data : "pJson=" + jsonParam,
		success : function(data)
		{	
			if(actTypeCd != "010000" && actTypeCd != "030100" && actTypeCd != "030400" && actTypeCd != "070000" && actTypeCd != "010100"){
				if (mode == 'U' || mode == 'S' || mode == undefined) {
					
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/main/insertCnslInfo.do",
						data : "pJson=" + SaveCnslFirsrt(mode),
						success : function(data)
						{
							fnSaveCnslComplete(mode);
						},
						error : function(data, status, err) 
						{
							alert("SaveCnslFirsrt() ==> 상담정보 저장 실패! [mode : " + mode + "]");
						}
					});
				}else{
					fnSaveCnslComplete(mode);
				}
			}else{
				if (actTypeCd == "030100") {
					fnSaveMinwonInfo(mode);
				} else {
					if(actTypeCd == "010100"){ // 영상상담
						saveVideoInfo();
					}
					fnSaveCnslComplete(mode);
				}
			}
		},
		error : function(data, status, err) 
		{
			alert("UPDATE CH001 ==> 상담정보 저장 실패! [mode : " + mode + "]");
		}
	});
	
}

/*
 * hhs 2020.06.01
 * 상담이력 저장 
 */
function SaveCnslFirsrt(mode){
	var currentDate = new Date();
	//var intvExCd = $("#selMainIntvExCd").val();
	var intvLgCd = $("#selMainIntvLgCd").val();
	var intvMdCd = $("#selMainIntvMdCd").val();
	var intvSmCd = $("#selMainIntvSmCd").val();
	var actType = $("#selMainActtypecd").val();
	var keyWord = $("#selMainKeyword").val()=="all"?"":$("#selMainKeyword").val();
	var resvTelNo = "";
	var trnrTelNo = "";
	var refId = "";
	
	if (actType == '040000') {  // 콜백등록
		resvTelNo = $("#tfMainCallbckRegPhoneNum").val().trim() != "" ? $("#tfMainCallbckRegPhoneNum").val().replace(/-/gi, "") : "";
	} else if (actType == '020000') {  // 통화예약
		resvTelNo = $("#tfMainResvPhoneNum").val().trim() != "" ? $("#tfMainResvPhoneNum").val().trim().replace(/-/gi, "") : "";
	} else if (actType == "030200" || actType == "030300" || actType == "030500") {  // 호전환 / 상담후 호전환 / 담당자부재중
		trnrTelNo = $("#tfAcceptedPhoneNum").val().trim() != "" ? $("#tfAcceptedPhoneNum").val().trim().replace(/-/gi, "") : "";  
	} 
	
	if (actType == '050000' || $("#callBckMainId").val() != "") {
		refId = $("#callBckMainId").val();
	}
	
	if (gCallStartTime == "") 
		gCallStartTime = changeTimeString(currentDate);

	if (gCallReleaseTime == "") 
		gCallReleaseTime = changeTimeString(currentDate);
	
	if (gCallConnectTime == "") 
		gCallConnectTime = gCallReleaseTime;

	var starate="4";
	if(fnvalidate($("[name='star_rating']").val())){
		starate=$("[name='star_rating']").val();
	}else{
		starate="4";
	}
	
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMDEuY291bnNlbFVwZGF0ZUZpcnN0", //ch001.counselUpdateFirst
			"map" : {
				"key" : "value",
				"tcktId" : $("#tfMainTicketId").val(),                                                                            // 상담이력  Ticket ID
				"oldActTypeCd" : "060000",
				"custNm" : $("#tfCustNm").val(),                                                                                  // 민원인명
				"callbackId" : $("#callBckMainId").val(),                                                                         // callbakId
				"resvDt" : $("#tfMainRescDtm").val() != "" ? changeDateString(getResvDate($("#tfMainRescDtm").val())) : "",       // 예약일자
				"resvTm" : $("#tfMainRescDtm").val() != "" ? changeTimeString(getResvDate($("#tfMainRescDtm").val())) : "",       // 예약시간
				"resvTelNo" : resvTelNo, 																						  // 체류기간
				"trnrTarget" : $("#tfMainTransferOrg").val(),
				"trnrCenterCd" : "",
				"trnrTeamCd" : $("#tfMainTrnrRcvTeamCd").val(),                                                                   // 이관/호전환 대상 팀
				"trnrTeamNm" : $("#tfMainOrganization").val(),                                                                    // 이관/호전환 대상 팀명
				"trnrDeptId" : $("#tfMainTrnrRcvDeptCd").val(),                                                                   // 이관/호전환 대상 부서 
				"trnrUsrId" : $("#responsibleUsrId").val(),                                                                       // 이관/호전환/콜백 대상 사용자
				"trnrUsrNm" : $("#tfManAccepted").val(),
				"trnrTelNo" : trnrTelNo,                                                                                          // 호전환 전화번호
				"extAgnId" : $("#tfMainExtAgencyId").val(),
				"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                                                              // 센터코드
				"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                                                              // 팀코드
				"deptId" : window.sessionStorage.getItem("DEPT_CD"),                                                              // 부서코드	
				"actTypeCd" :actType,                                                                         				 	  // 처리유형
			}
		};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

/**
 * 상담이력을 저장하기전 입력값을 검사한다.
 */
function isValidate() 
{
	// 민원인정보가 선택되지 않은 경우
	if($("#tfCustId").val() == "")
	{
		alert("먼저 민원인정보를 저장하거나 선택하여 주세요.");
		$("#btnCnslSave").prop("disabled", false);
		return false;
	}
	
	if(($("#tfCustNm").val()=="") && ($("#tfCustCelPhoneNum").val()=="" && $("#tfCustPhoneNum").val()==""))
	{
		alert("먼저 민원인정보를 저장하거나 선택하여 주세요.");
		$("#btnCnslSave").prop("disabled", false);
		return false;
	}
	
//	// 문의내용이 입력되지 않은 경우
//	if($("#tfMainRcvCont").val().trim() == "")
//	{
//		alert("문의내용을 입력 해 주세요.");
//		$("#tfMainRcvCont").focus();
//		$("#btnCnslSave").prop("disabled", false);
//		return false;
//	}
//	
//	if ($("#tfMainActCont").val().trim() == "") {
//		alert("답변내용을 입력 해 주세요.");
//		$("#tfMainActCont").focus();
//		$("#btnCnslSave").prop("disabled", false);
//		return false;
//	}
	
	// 처리유형이 예약통화일 경우
	if($("#selMainActtypecd").val() == "020000")
	{
		if($("#tfMainRescDtm").val().length != 16)
		{
			alert("예약일시를 입력 해 주세요.");
			$("#btnCnslSave").prop("disabled", false);
			return false;
		}
		
		if(!checkResvDate($("#tfMainRescDtm").val()))
		{
			alert("이미 지난 시간은 예약일시로 설정 하실 수 없습니다.");
			$("#btnCnslSave").prop("disabled", false);
			return false;
		}
		
		if($("#tfMainResvPhoneNum").val().trim() == "")
		{
			alert("예약번호를 입력 하셔야 합니다.");
			$("#tfMainResvPhoneNum").focus();
			$("#btnCnslSave").prop("disabled", false);
			return false;
		}
	} 
	else if ($("#selMainActtypecd").val() == "040000") 
	{
		
	}
	else if ($("#selMainActtypecd").val() == "030100") 
	{
		// 민원이관
		if($("#tfMainTransferCont").val().trim() == "")
		{
			alert("이관내용을 입력 하셔야 합니다.");
			$("#tfMainTransferCont").focus();
			$("#btnCnslSave").prop("disabled", false);
			return false;
		}
		
	}
	
	if (selMainLMScdCheck() == false) { 
		return false;
	}
	
	return true;
}

function selMainLMScdCheck(){
//jjcc 상담유형 체크안함.
//	var selExcd = $("#selMainIntvExCd").val();
//	var selLgcd = $("#selMainIntvLgCd").val()==""?"all":$("#selMainIntvLgCd").val();
//	var selMdcd = $("#selMainIntvMdCd").val()==""?"all":$("#selMainIntvMdCd").val();
//	var selSmcd = $("#selMainIntvSmCd").val()==""?"all":$("#selMainIntvSmCd").val();
//	
//	// 특이민원은 대분류까지
//	if(selExcd=="70000000"){
//		return true;
//	}
//		 
//	if ( selExcd=="all" || selLgcd=="all" || selMdcd=="all" || selSmcd=="all") { 
//		alert('상담유형을 선택하시기 바랍니다.');
//		if(selExcd=="all"){
//			$("#selMainIntvExCd").focus();
//		}else if(selLgcd=="all"){
//			$("#selMainIntvLgCd").focus();
//		}else if(selMdcd=="all"){
//			$("#selMainIntvMdCd").focus();
//		}else if(selSmcd=="all"){
//			$("#selMainIntvSmCd").focus();
//		}
//		
//		$("#btnCnslSave").prop("disabled", false);
//		return false;
//	}
	
	return true;
}

/**
 * 상담정보 저장
 * 민원접수 영역 저장 버튼 클릭 이벤트
 */
function saveCnslData() 
{	
	//처리완료 체크
	if(!fnActStValidate()){
		$("#btnCnslSave").prop("disabled", false);
		return;
	};
	
	if($("#selMainActstcd").val() =="030400"){
		if($("#selMainIntvLgCd").val()=="all"){
			alert("대분류를 선택하여 주세요.");
			$("#selMainIntvLgCd").focus();
			return false;
		}else if($("#selMainIntvMdCd").val()=="all"){
			alert("중분류를 선택하여 주세요.");
			$("#selMainIntvMdCd").focus();
			return false;
		}else if($("#selMainIntvSmCd").val()=="all"){
			alert("소분류를 선택하여 주세요.");
			$("#selMainIntvSmCd").focus();
			return false;
		}
	}
	
	// 영상상담 파일 체크
	if($("#selMainActtypecd").val() == "010100"){
		if($(".videoImg").length == 0){ // 파일이 없을때
			alert("선택된 이미지가 없습니다.\n영상상담 탭에서 하나 이상의 파일을 선택해주세요.");
			return false;
		}
	}
	
	// 저장 버튼 클릭 시 저장 버튼 비활성화
	$("#btnCnslSave").prop("disabled", true);
	
	// 후처리시간
	var acwTm = "0";
	
	//if(g_call_start_time == null && g_call_end_time == null)		// 통화를 하지 않고 수동으로 저장하는 경우
	if (gCallStartTime == "" && gCallReleaseTime == "")             // 통화하지 않고 수동으로 저장하는 경우
	{
		var current = new Date();
		gCallStartTime = changeTimeString(current);
		gCallConnectTime = changeTimeString(current);
		gCallReleaseTime = changeTimeString(current);
	}
	 
	//통화중이 안일떄만 체크?
	if (!bCalling) {
		if (isValidate() == false) {
			return;
		}
	}else{
		//jjcc 상담유형 체크 안함
		if (selMainLMScdCheck() == false) {
			return;
		}
	}
	
	bSaveBtnClick = true;
	
	// 민원인정보가 선택되지 않은 경우
	if($("#tfCustId").val() == "")
	{
//		alert("먼저 민원인정보를 저장하거나 선택하여 주세요.");
//		$("#btnCnslSave").prop("disabled", false);
//		return;
		
		//신규민원인 자동등록
		InsertCustInfo();
		
		$("#btnCustSave").show();
		$("#btnCustSaveIns").hide();
	}
	
	//예약통화 통화상태 update
	if($("#tfMainResvTicketId").val() != "")
	{
		if($("#selMainActstcd").val() !='010000')
		{
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/resvUpdateList.do",
				data : "pJson=" + getJsonStrResvUpdateList($("#tfMainResvTicketId").val()),
				success : function(data)
				{
					var callbckId = "";
					$.each(data, function(key, state)
					{
						callbckId = data.CALLBCK_ID;
						if(state.OUT_TCKT_ID == null)
							resvCallStateUpdate(state.TCKT_ID, $("#tfMainTicketId").val());						
						else
							resvCallStateUpdate(state.TCKT_ID, state.OUT_TCKT_ID);
					});
					
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/main/updateTryInfo.do",
						data : "pJson=" + getJsonStrUpdateTryCnt("", "030000", "", callbckId),
						success : function(data)
						{
							
						},
						error : function(data, status, err) 
						{
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
		else
		{
			resvCallStateUpdate($("#tfMainResvTicketId").val(), $("#tfMainTicketId").val());
		}
	}
	
//	if(g_connStat=="ESTABLISHED"){ 
//		//콜백통화 통화상태 update
//		callBackTryCountUpdate("");
//	}else{
//		//전화연결 안된 콜백건은 콜백 아이디 초기화
//		$("#callBckMainId").val("");
//		$("#refId").val("");
//	}
	
	var ticketId = $("#tfMainTicketId").val();
	
	bSaveBtnClick = true;
	
	if (ticketId == "" || ticketId == null) {
		var nRtn = fnGetTicketId();
		//fnLog("fnSaveCnsl [saveCnslData]");
		
		// hhs 20.06.11 인입없이 주소 저장
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/updateAddrInfo.do",
			data : "pJson=" + getJsonStrInsertAddrInfo(),
			success : function(data)
			{
				console.log("=== INSERT CH011");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
		
		fnSaveCnsl();
		//setTimeout(fnSaveCnsl, 500);
		
	} else if($("#callBckMainId").val() != ""){
		var cbTicketId = $("#callBckTicketId").val();
		if (cbTicketId == "" || cbTicketId == null){
			fnSaveCnsl('CB');	
			setTimeout(function(){ fnSaveCnsl('U') }, 1000);
		} else {
			counselInitTable(cbTicketId, "list", "counsel");
			$("#cmscsp_actTypeCd").val($("#selMainActtypecd").val());
			$("#cmscsp_actStCd").val($("#selMainActstcd").val());
			$("#cmscsp_intvLgCd").val($("#selMainIntvLgCd").val());
			$("#cmscsp_intvMdCd").val($("#selMainIntvMdCd").val());
			$("#cmscsp_intvSmCd").val($("#selMainIntvSmCd").val());
			$("#cmscsp_rcvCont").val($("#tfMainRcvCont").val());
			$("#cmscsp_actCont").val($("#tfMainActCont").val());
			btnUpdate_clickEvent();
			$("#tfMainTicketId").val("");
			CallReadyFunc();
		}
	} else {
		//fnLog("fnSaveCnsl 'U' [saveCnslData]"); 
		fnSaveCnsl('U');
	}
	
	checkAddr = $("#selMainAddrCd").val();
	//hhs 20.06.09 주소 직접저장
	if(checkAddr != "all" && popupAddr != checkAddr){
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/updateAddrInfo.do",
			data : "pJson=" + getJsonStrUpdateAddrInfo(),
			success : function(data)
			{
				console.log("=== UPDATE CH010");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	
	// 2020.01.16 행정동 주소 초기화
	$("#selMainAddrCd").prop("disabled",false); //hhs 20.06.10
	$("#selMainAddrDetail").html(""); //hhs 20.06.11 상세 주소 초기화
	refreshNotyetCnt(); //hhs 20.04.16 상담이력 저장시 iframe refresh
}

function getJsonStrInsertAddrInfo(){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "Y2gwMTAuYWRkckluc2VydA==",
			"map" : {
				"key" : "value",
				"tckt_id" : $("#tfMainTicketId").val(), 	//티켓ID
				"spch_type" : "8",							//인입없이 저장시 8로 저장 
				"stt_rcg_rst" : $("#selMainAddrCd").val(),	//음성인식 결과
				"sndr_cntct_infm" : $("#tfCustCelPhoneNum").val().replace(/-/gi, ""),
				
				"succ_yn" : null,
				"b_addr" : null,
				"h_addr" : null,
				"addr" : null,
				"rcg_scr" : null,
				"ORD" : null,
				"fl_pth" : null
			}
		};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


function getJsonStrUpdateAddrInfo(){
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMTAuYWRkclVwZGF0ZQ==",
			"map" : {
				"key" : "value",
				"tckt_id" : $("#tfMainTicketId").val(), 	//티켓ID
				"checkAddr" : $("#selMainAddrCd").val(),	//음성인식 결과
				"sndr_cntct_infm" : $("#tfCustCelPhoneNum").val().replace(/-/gi, ""),
			}
		};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 콜백 상태 및 시도횟수 업데이트 
 */
function callBackTryCountUpdate(job){

	//콜백통화 통화상태 update
	if($("#callBckMainId").val() !="" && $("#refId").val() !="")
	{
		var tktId=$("#tfMainTicketId").val();
		if(job=="trycnt"){
			tktId="";
		}
		var callbackStat="020000";
		var type="call";
		//상담결과  010000:미완료,  030400:완료 => 콜백완료
		if($("#selMainActstcd").val()=="010000"){
			 callbackStat="020000"; //콜백 시도중
			 type="call";
		}else{
			 callbackStat="030000"; //콜백 처리완료
			 type="save";
		}
		
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/updateTryInfo.do",
				//data : "pJson=" + getJsonStrUpdateTryCnt("save", "030000", $("#tfMainTicketId").val(), ""),
				data : "pJson=" + getJsonStrUpdateTryCnt(type, callbackStat, tktId, $("#callBckMainId").val()),
				success : function(data)
				{
					if(type=="save"){
						$("#callBckMainId").val("");
						$("#callBckTicketId").val("");
					}
				},
				error : function(data, status, err)
				{
					networkErrorHandler(data, status, err);
				}
			});
		 
	}
}
	

/**
 * 상담이력 Ticket ID 가져오기
 */
function fnGetTicketId() {
	g_holdCount=0; // 보류 누적횟수 초기화
	var getDateTime=yyyyMMddhhmmss("");
	var userId=window.sessionStorage.getItem("USR_ID");
	var ticketid=getDateTime+userId;
//	console.log("fnGetTicketId caller:"+fnGetTicketId.caller);	

	$("#tfMainTicketId").val(ticketid);
//	$("#labMainTicktId").html(ticketid);
	
	// 티켓아이디를 얻어옴
//	$.ajax({
//		type : "post",
//		dataType: "json",
//		async : false,
//		url : getContextPath() + "/ajax/main/getTicketId.do",
//		data : "pJson=" + getJsonStrTicketId(),
//		success : function(data)
//		{
//			$("#tfMainTicketId").val(data.TCKT_ID);
//			$("#labMainTicktId").html(data.TCKT_ID);
//		},
//		error : function(data, status, err) 
//		{
//			alert("티켓ID를 생성하지 못했습니다.");
//			//networkErrorHandler(data, status, err);
//		}
//	});
	
	return 0;
	//fnSleep(500);
}

// 초기화버튼
function btnCnslInitClick(){
	initCnslInfo();
}

/**
 * 상담정보 초기화
 */
function initCnslInfo()
{

	// 티켓ID가 있는 경우 최종저장이 안된 경우이므로 초기화를 할 것인지 여부를 확인한다.
	if ($("#tfMainTicketId").val() != "") {
		if (confirm("상담정보를 초기화 하시겠습니까?") == false) {
			return;
		}
	}
	
	// 초기화 버튼 클릭시 TicketID 삭제
	$("#tfMainTicketId").val("");
	$("#labMainTicktId").html("");
	// 연결전화번호 삭제 처리
	$("#CALLNO").val("");
	$("#tfContactInform").val("");

	$("#labArsService").html(""); //ARS서비스명
	
	$("#rbReqImmediate").prop("checked", true); //7일
	$("#rbReqYes").prop("checked", true);
	
	$("#imgMainAcctypecdText").hide();
	$("#labMainActtypecdText").html("");
	$("#tfMainRescDtm").val("");
	$("#tfMainResvPhoneNum").val("");
	$("#tfMainTrnrRcvnUsr").val("");
	$("#tfMainOrganization").val(""); //담당부서
	$("#responsibleUsrId").val("");
	$("#tfManAccepted").val("");
	$("#tfAcceptedPhoneNum").val("");
	
	$("#tfClaimant").val("");
	$("#tfClaimantPhoneNum").val("");
	
	$("#tfMainResvTicketId").val("");
	$("#callBckMainId").val("");
	$("#callBckTicketId").val("");
	$("#refId").val("");
	$("#responsibleUsrId").val("");
	$("#regCallbckTargetUsrId").val("");
	
	$("#tfMainRcvCont").val("");
	$("#tfMainActCont").val("");
	
	$("#tfMainRescDtm").hide();
	$("#tfMainRescDtm").hide();
	
	$("#imgMainResvPhoneNumText").hide();
	$("#tfMainResvPhoneNum").hide();
	$("#tfMainCallbckRegPhoneNum").hide();
	$("#tfMainCallbckRegPhoneNum").val("");
	
	$("#selMainArsService").hide();
	
	$("#imgMainHidePhoneNum").hide();

	$("#selMainCallgbcd").prop("disabled",false);
	
	$("#labKind").hide();
	$("#star_rating").hide();
	
	$("#tfLgMdSmSearch_01").val("");  //  
	$("#tfOrgDeptUser_01").val("");  // 부서1
	$("#tfTransfDept_01").val("");  // 
	$("#tfOrgDeptUser_02").val("");  // 
	$("#tfTransfDept_02").val("");  // 부서1
	
	$("#tfMainTransferCont").val("");  // 이관내용
	
	setObjSelectBoxWithCode("selMainChgbcd", "", "","main","90009", "");	// 채널구분 셋팅
	setObjSelectBoxWithCode("selMainCallgbcd", "", "","main","90010", "");	    // 통화구분 셋팅
 
	setSelectBoxWithActTypeCd("selMainActtypecd", "", "main", "");          // 처리유형
	//setObjectSelectBoxWithCode2("selMainIntvExCd", "선택", "1", "", "00000000", "", "CHANGE");//
    setObjectSelectBoxWithCode2("selMainIntvLgCd", "선택", "1", "", "00000000", "", "CHANGE");//
//	$("#selMainIntvLgCd").val("20010000").trigger("change");
//	$("#selMainIntvMdCd").val("20011200").trigger("change");
//	$("#selMainIntvSmCd").val("20011201");
	
	setObjSelectBoxWithCode("selMainActstcd", "", "","main","90013", "010000");	// 처리상태 셋팅  미완료:010000,  완료:030400  
	setObjSelectBoxWithCode("selMainChnl", "", "","main","90009", "11000");	// 채널구분
	setObjSelectBoxWithCode("selMainKeyword", "", "","main","90025", "0");	// 키워드
	
	setObjSelectBoxWithCode("selMainAddrCd", "전체", "","main","98002", "");	// 주소검색 selectBox 추가 hhs 20.06.09
//selMainActTypeAndActSt
	setSelectedBoxWithArsService("selMainArsService", "", "main", "");     // ARS호전환 유형

	$("#tfMainDepartment").val("");
	$("#mainDeptCd").val("");
	$("#mainTeamCd").val("");
	$("#mainAffairUsrId").val("");
	$("#mainAffairUsrNm").val("");
	$("#mainAffairTelNo").val("");
	$("#mainAffairMobile").val("");

	$("#tfSubDepartment").val("");
	$("#subDeptCd").val("");
	$("#subTeamCd").val("");
	$("#subAffairUsrId").val("");
	$("#subAffairUsrNm").val("");
	$("#subAffairTelNo").val("");
	$("#subAffairMobile").val("");
	
    var usrId=window.sessionStorage.getItem("USR_ID");
	if(gUsrGrdCd !="090100"){  // usrId !="2035" && usrId !="2034")
		$('#btnMap').hide();
	}
	
	// 2020.01.16 행정동 주소 초기화
	$("#labCustAddr").html("");
	$("#selMainAddrDetail").html(""); //hhs 20.06.11 상세 주소 초기화
	
	// 하단 그리드 리로드
	reloadGrid();
}

// 상담상세 팝업
function popupCnslSpec(tckt_id)
{
	window.sessionStorage.setItem("POPUP","CHILD");
	window.sessionStorage.setItem("reqTcktId", "");
	window.sessionStorage.setItem("tcktId", tckt_id);
	window.sessionStorage.setItem("type", "list");
	window.sessionStorage.setItem("gridType", "counsel");
	
	var width = 1200;
	var height = 452;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/counselSpec.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL+"?POPUP=CHILD", "counselSpec", option);
	newWindow.focus();
}

// 조직도에서 사원 전화번호 클릭 이벤트
function usrTelClick(p_phoneNum, usrId, trnrType)
{
	g_trnrFlag = true;
	
	if(trnrType != "")
	{
		$("#selMainActtypecd").val(trnrType);
		$("#selMainActtypecd").trigger("change");
	}
	
	if(p_phoneNum != "")
	{
		window.sessionStorage.setItem("callType", "");
		makeCall(p_phoneNum);
		$("#tfAcceptedPhoneNum").val(getPhoneNumFormat(p_phoneNum));
	}
	
	if($("#AGENT_STATUS").val() == "보류" || $("#AGENT_STATUS").val() == "후처리")
		return;
	
	if(usrId != "")
		setTrnrUsrInfo(usrId);
}

// 조직도에서 선택된 사용자를 메인에 셋팅
function setTrnrUsrInfo(usrId)
{
	switch($("#selMainActtypecd").val().toString())
	{
		case "040000" :	// 콜백등록
		{
			// 상담사 정보를 얻어옴
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/getUserInfo.do",
				data : "pJson=" + getJsonStrUserInfo(usrId),
				success : function(data)
				{
					if(data != null)
					{
						$("#regCallbckTargetUsrId").val(usrId);
						$("#tfMainTrnrRcvnUsr").val(data.USR_NM);
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
			
			break;
		}
		default:
			break;
	}
	
	g_trnrFlag = false;
}

// 그리드 초기 셋팅
function initGrid()
{
	// 메인화면 상담이력 jqgrid
	$("#tblCnslHistoryTabMain").jqGrid(
	{
		url : getContextPath() + "/jqgrid/callMain/cnslList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCnslList("")
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	//colNames : ["접수일시", "회사/부서", "민원인명", "전화번호", "상담사", "처리유형", "처리상태", "통화구분", "통화시간", "티켓번호", "접수일시"],
        // colNames : ["EXCD", "접수일시", "상담사", "상담유형", "처리유형", "상담결과", "총통화시간", "구분", "티켓번호", "접수일시"],
		colNames : ["LGCD", "접수일시", "상담사", "상담유형", "처리유형", "상담결과", "총통화시간", "구분", "티켓번호", "접수일시"],
	   	colModel :
	   	[
	   	 	// { name : "INTV_EX_CD", index : "INTV_EX_CD", hidden:true },
            { name : "INTV_LG_CD", index : "INTV_LG_CD", hidden:true },
	   		{ name : "RCV_DTM_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 120 },
	   		{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 70 },
	   		{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 310 },
	   		{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 60 },
	   		{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 60, formatter:fnStatusFormatter },
	   		{ name : "CALL_TIME", index : "CALL_TIME", align : "center", width : 70 },
	   		{ name : "CALL_GB_NM_ENG", index : "CALL_GB_NM_ENG", align : "center", width : 40 },
	   		{ name : "TCKT_ID", index : "TCKT_ID", hidden : true },
	   		{ name : "RCV_DTM", index : "RCV_DTM", hidden : true }
	   	],
	   	sortname : "RCV_DTM",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "215",
	   	width : "100%",
	   	rowNum : 8,
	   	rowList : [8, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#pagingCnslHistoryTabMain",
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	ondblClickRow : function(rowid)
	   	{
	   		var row = $("#tblCnslHistoryTabMain").getRowData(rowid);
	   		popupCnslSpec(row.TCKT_ID);
	   	},
	   	gridComplete : function()
	   	{
	   		//특이민원 색상 //고쳐야됨
	   		var ids = $("#tblCnslHistoryTabMain").getDataIDs();
	   		$.each(ids,	function(idx, rowId){
	   				rowData = $("#tblCnslHistoryTabMain").getRowData(rowId);
                	// if(rowData.INTV_EX_CD=="70000000"){
	   				if(rowData.INTV_LG_CD=="70000000"){
	   					 $("#tblCnslHistoryTabMain").setRowData(rowId,false,{background:"#ffb3b3"});
	   				}
	   			}
	   		);
	   	 
		}
	}).jqGrid("navGrid", "#pagingCnslHistoryTabMain", {edit : false, add : false, del : false, search : false});
	
	// 메인화면 미처리이력 jqgrid
	/*
	$("#tblCnslHistoryTabNotComplete").jqGrid(
	{
		url : getContextPath() + "/jqgrid/callMain/cnslList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCnslList("notyet")
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	//colNames : ["접수일시", "회사/부서", "민원인명", "전화번호", "상담사", "처리유형", "처리상태", "통화구분", "통화시간", "티켓번호", "접수일시"],
		colNames : ["접수일시", "상담사", "상담유형", "처리유형", "상담결과", "총통화시간", "구분", "티켓번호", "접수일시"],
	   	colModel :
	   	[
	   		{ name : "RCV_DTM_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 120 },
	   		{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 80 },
	   		{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 300 },
	   		{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 60 },
	   		{ name : "ACT_ST_NM", index : "ACT_ST_NM", align : "center", width : 60 },
	   		{ name : "CALL_TIME", index : "CALL_TIME", align : "center", width : 70 },
	   		{ name : "CALL_GB_NM_ENG", index : "CALL_GB_NM_ENG", align : "center", width : 40 },
	   		{ name : "TCKT_ID", index : "TCKT_ID", hidden : true },
	   		{ name : "RCV_DTM", index : "RCV_DTM", hidden : true }
	   	],
	   	sortname : "RCV_DTM",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "313",
	   	width : "100%",
	   	rowNum : 12,
	   	rowList : [12, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#pagingCnslHistoryTabNotComplete",
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	ondblClickRow : function(rowid)
	   	{
	   		var row = $("#tblCnslHistoryTabNotComplete").getRowData(rowid);
	   		
	   		popupCnslSpec(row.TCKT_ID);
	   	}
	}).jqGrid("navGrid", "#pagingCnslHistoryTabNotComplete", {edit : false, add : false, del : false, search : false});
	*/
	/*
	// 메인화면 FAX jqgrid
	$("#tblCnslHistoryTabFax").jqGrid(
	{
		url : getContextPath() + "/jqgrid/callMain/FaxList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrFaxList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["유형", "제목", "일시", "회사/부서", "민원인명", "전송자", "FAX 번호", "FAX 키"],
	   	colModel :
	   	[
	   		{ name : "FAX_TYPE", index : "FAX_TYPE", align : "center", width : 80 },
	   		{ name : "SUBJECT", index : "SUBJECT", align : "center", width : 150 },
	   		{ name : "RS_DTM", index : "RS_DTM", align : "center" },
	   		{ name : "TARGET_CORP_NM", index : "TARGET_CORP_NM", align : "center" },
	   		{ name : "TARGET_USR_NM", index : "TARGET_USR_NM", align : "center" },
	   		{ name : "USER_NM", index : "USER_NM", align : "center", width : 80 },
	   		{ name : "FAX_NO_FORMAT", index : "FAX_NO_FORMAT", align : "center", width : 120 },
	   		{ name : "TIFFFILE_NAME", index : "TIFFFILE_NAME", hidden : true }
	   	],
	   	sortname : "RSDATE",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "313",
	   	width : "100%",
	   	rowNum : 12,
	   	rowList : [12, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#pagingCnslHistoryTabFax",
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	ondblClickRow : function(rowid)
	   	{
	   		var row = $("#tblCnslHistoryTabFax").getRowData(rowid);
	   		var paramURL = "http://172.16.1.58/e2faxview_kape.aspx?faxImageFile=" + row.TIFFFILE_NAME;
	   		var option = "toolbar=no,directories=no,scrollbars=auto,location=no,resizable=yes,status=no,menubar=no";
	   		
	   		var newWindow = window.open(paramURL, "FAXPOPUP", option);
	   		newWindow.focus();
	   	}
	}).jqGrid("navGrid", "#pagingCnslHistoryTabFax", {edit : false, add : false, del : false, search : false});
	*/
	
	// sms발송목록 jqgrid
	/*
	$("#tblCnslHistoryTabSMS").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/smsSendList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSmsSendList()
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["상담사", "회사/부서", "민원인명", "전화번호", "문자유형", "발신일시", "처리상태", "채널발신ID"],
	   	colModel :
	   	[
	   		{ name : "USR_NM", index : "USR_NM", width : 80, align : "center" },
	   		{ name : "CORP_NM", index : "CORP_NM", width : 200, align : "center" },
	   		{ name : "CUST_NM", index : "CUST_NM", width : 80, align : "center" },
	   		{ name : "CNTCT_INFM", index : "CNTCT_INFM", width : 120, align : "center" },
	   		{ name : "SMS_TYPE", index : "SMS_TYPE", width : 80, align : "center" },
	   		{ name : "TRAN_RSLTDATE", index : "TRAN_RSLTDATE", width : 140, align : "center" },
	   		{ name : "TRAN_STATUS_NM", index : "TRAN_STATUS_NM", width : 80, align : "center" },
	   		{ name : "CH_SND_ID", index : "CH_SND_ID", hidden : true }
	   	],
	   	sortname : "CH_SND_ID",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "313",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [12, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#pagingCnslHistoryTabSMS",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	ondblClickRow : function(rowid)
	   	{
	   		var row = $("#tblCnslHistoryTabSMS").getRowData(rowid);
	   		
	   		window.sessionStorage.setItem("smsSpecChSndId", row.CH_SND_ID);
	   		
	   		var width = 1200;
	   		var height = 400;
	   		var top = (screen.height - height) / 2;
	   		var left = (screen.width - width) / 2;
	   		
	   		var paramURL = getContextPath() + "/web/counsel/smsSendSpec.do";
	   		var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	   		
	   		var newWindow = window.open(paramURL, "SMSSPEC", option);
	   		newWindow.focus();
	   	}
	}).jqGrid("navGrid", "#pagingCnslHistoryTabSMS", {edit : false, add : false, del : false, search : false});
	*/
	// 탭 숨김
	//$("#divCnslTabNotComplete").css("display", "none");
	//$("#divCnslTabFax").css("display", "none");
	//$("#divCnslTabSMS").css("display", "none");
	
	//$("#divRCTabCnslList").css("display", "none");
	//$("#divRCTabResvCallList").css("display", "none");
	//$("#divRCTabCallbackList").css("display", "none");
	//$("#divRCTabMemo").css("display", "none");
	//$("#divRCTabBoard").css("display", "none");
}

/**
 * 영상상담 항목 활성화/비활성화
 */
function fnYoungSangItemsControl(bEnable) {
	if(bEnable == true){
		$("#tfMainRcvCont").css('height', '130px');
		$("#tfMainActCont").css('height', '130px');
		
		$("#youngsang").show();
		
	}else{
		$("#tfMainRcvCont").css('height', '220px');
		$("#tfMainActCont").css('height', '220px');
		
		$("#youngsang").hide();
	}
}

/**
 * 민원관련 항목 활성화/비활성화
 */
function fnMinwonItemsControl(bEnable) {
	if (bEnable == true) {
		$("#copyRcvCont").show();
		$("#copyRcvCont2").show();
		
		$("#selMainActstcd").val("010000"); //미완료:010000, 완료:030400
		//$("#imgMainAcctypecdText").show();
		$("#labMainImmText").html("처리기한");
		
		$("#imgManAcceptedText").show();
		$("#labManAcceptedText").html("민원인");
		
		$("#rbReqImmediate").show();
		$("#rbReqSevenDays").show();
		$("#labRboImmediateText").show();
		$("#labRboSevenDaysText").show();
		
		$("#tfManAccepted").show();
		$("#tfManAccepted").val($("#tfCustNm").val());
		
		$("#imgMainResvPhoneNumText").show();
		$("#labMainResvPhoneNumText").html("연락처");
		$("#tfAcceptedPhoneNum").show();
		
		if ($("#tfCustCelPhoneNum").val() != null && $("#tfCustPhoneNum").val() == null) {
			$("#tfAcceptedPhoneNum").val(getPhoneNumFormat($("#tfCustCelPhoneNum").val()));
		} else if ($("#tfCustCelPhoneNum").val() == null && $("#tfCustPhoneNum").val() != null) {
			$("#tfAcceptedPhoneNum").val(getPhoneNumFormat($("#tfCustPhoneNum").val()));
		} else {
			$("#tfAcceptedPhoneNum").val(getPhoneNumFormat($("#tfCustCelPhoneNum").val()));
		};
		
		$("#imgMainDepartmentText").show();
		$("#labMainDepartmentText").html("주관부서");
		$("#tfMainDepartment").show();
		
		$("#imgSubDepartmentText").show();
		$("#labSubDepartmentText").html("보조부서");
		$("#tfSubDepartment").show();		
		$("#imgMainDepartmentSearch").show();
		$("#imgSubDepartmentSearch").show();

		$("#tfMainTransferCont").show();
		
		$("#tfMainRcvCont").css('height', '130px');
		$("#tfMainActCont").css('height', '130px');
		 
		$("#TrTransfer01").css("display", "");
		$("#TrTransfer02").css("display", "");
		$("#TrTransfer03").css("display", "");
		
	} else {
		$("#copyRcvCont").hide();
		$("#copyRcvCont2").hide();
		
		$("#rbReqImmediate").hide();
		$("#rbReqSevenDays").hide();
		$("#labRboImmediateText").hide();
		$("#labRboSevenDaysText").hide();
		
		$("#tfManAccepted").hide();
		$("#tfAcceptedPhoneNum").hide();
		
		$("#imgMainDepartmentText").hide();
		$("#labMainDepartmentText").html("");
		$("#tfMainDepartment").hide();		
		
		$("#imgSubDepartmentText").hide();
		$("#labSubDepartmentText").html("");
		$("#tfSubDepartment").hide();
		$("#imgMainDepartmentSearch").hide();
		$("#imgSubDepartmentSearch").hide();
		
		$("#tfMainTransferCont").hide();
		
		$("#tfMainRcvCont").css('height', '220px');
		$("#tfMainActCont").css('height', '220px');
		 
		$("#TrTransfer01").css("display", "none");
		$("#TrTransfer02").css("display", "none");
		$("#TrTransfer03").css("display", "none");
	}
}

/**
 * 이벤트 등록
 */
function initEvent()
{
	 
	// x버튼으로 창닫을 때 이벤트 등록
	$(window).bind("beforeunload", unloadPage);
	
	window.addEventListener('unload', (event) => {
		unload();
	});
	

	// f5 눌렸을 때 이벤트
	$(window).bind("keydown", function(e)
	{
		var keycode = e.keyCode;
		
		if(keycode == 116)
		{
			g_logoutFlag = true;
			
			e.keyCode = 0;
			e.cancelBubble = true;
			e.returnValue = false;
			
			return false;
		}
	});
	$("#logo_img").on("click", function(e){
		g_logoutFlag = true;
		location.reload();		
	}); //새로고침 기능 추가
	// 이석메뉴 없애기 위한 이벤트 등록
	$(document).bind("mousedown", function(e)
	{
		var targetId = e.target.id;
		
		if(!targetId.match("liNotReadyMenu"))
			$("#divNotReadyMenu").hide();
		
		if(!targetId.match("liFavoritMenu"))
			$("#divFavoritMenu").hide();

		if(!targetId.match("liRecentMenu"))
			$("#divRecentMenu").hide();
		
		if(!targetId.match("liPhoneMenu"))
			$("#divPhoneMenu").hide();

	});
	
	// tree node select event
	$("#trMainMenu").bind("select_node.jstree", function(event, data)
	{
		if(data.node.original.value != "#")
		{
			window.sessionStorage.setItem("setCustInfoPopupType", "");
			window.sessionStorage.setItem("setCustInfoPopupSearchNm", "");
			window.sessionStorage.setItem("parentCustId", "");
			window.sessionStorage.setItem("setCustInfoType", "main");
			window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", "");		
			
			openMenuPopup(data.node.original.id);
			
			$("#showLeft").trigger("click");
			classie.toggle(showLeft, "disabled");
		}
	});
	
	// 상담유형 대분류 선택 시 이벤트
	$("#selMainIntvLgCd").bind("change", function(e)
	{	
		var eXid=e.target.value;
		
		setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "1", "", e.target.value, "", "CHANGE");
		
		// 기타(긴급정보)시 skip
		if(eXid==gConstImmeLgcd){
		/*if(eXid==gConstImmeExcd){*/
			if($("#selMainActtypecd").val()!="010000"){
				$("#selMainActtypecd").val("010000").trigger("change");
			}
			
		//	$("#selMainActtypecd").attr('disabled', true);
			
			$("#imgManAcceptedText").show();
			$("#labManAcceptedText").html("신고인");
			$("#tfClaimant").show();
			$("#imgMainResvPhoneNumText").show();
			$("#labMainResvPhoneNumText").html("신고인전화");
			$("#tfClaimantPhoneNum").show();
			
			$("#tfClaimant").val($("#tfCustNm").val());
			$("#tfClaimantPhoneNum").val(getPhoneNumFormat($("#CALLNO").val()));
		}else{
			if($("#selMainActtypecd").val()=="010000"){ 
				// 21.06.23 처리유형 본인이 선택한값으로 가지고 있도록 변경
				//$("#selMainActtypecd").val("010000").trigger("change");
			}else if($("#selMainActtypecd").is(":disabled")){ 
				// 기타에서 일반으로 풀기
				$("#selMainActtypecd").attr('disabled', false);
				
				$("#selMainActtypecd").val("010000");
				$("#selMainActtypecd").trigger("change");
			} 
			
		}
	
	});

	// 상담유형 대분류 선택 시 이벤트

	$("#selMainIntvMdCd").bind("change", function(e)
	{		
		setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "2", "", e.target.value, "", "CHANGE");
		
	});

	// 상담유형 중분류 선택 시 이벤트
//
//	$("#selMainIntvMdCd").bind("change", function(e)
//	{
//		setObjectSelectBoxWithCode2("selMainIntvSmCd", "선택", "3", "", e.target.value, "", "");
//		
//	});

	// 민원인관련 버튼 이벤트
	$("#btnCustSearch").bind("click", searchCustInfo);
	$("#btnCustSave").bind("click", saveCustInfo);
	$("#btnCustSaveIns").bind("click", InsertCustInfo);
	$("#btnCustInit").bind("click", initCustInfo);
	$("#btnRequestAgree").bind("click", fnRequestAgree);
	$("#btnAuthCust").bind("click", fnRequestAgree);
	$("#btnMap").bind("click", fnSearchPos);
	
	// 민원인동의 관련
	$("#chkAll").bind("click", fnCheckAll);
	$("#chkSMS").bind("click", fnCheckBox);
	$("#chkPhone").bind("click", fnCheckBox);
	$("#chkFAX").bind("click", fnFaxChekBox);
	
	$("#tfManAccepted").hide();
	$("#tfAcceptedPhoneNum").hide();
	
	$("#imgMainDepartmentText").hide();
	$("#labMainDepartmentText").html("");
	$("#tfMainDepartment").hide();
	
	$("#imgSubDepartmentText").hide();
	$("#labSubDepartmentText").html("");
	$("#tfSubDepartment").hide();
	
	//$("#tfClaimant").hide();
	//$("#tfClaimantPhoneNum").hide(); 
		
	//캡쳐명령  보이기
	$("#toggleCmd").bind("click", fnCmdToggle);
	$("#btnSendCmd").hide();
	$("#btRegCmd").hide();
	$("#tfMainExeFileName").hide();
	//캡쳐명령 등록
	$("#btRegCmd").bind("click", fnCmdReg);
	//캡쳐명령 실행
	$("#btnSendCmd").bind("click", fnCmdSend);
	
	// 민원인정보 연락처 '-' 붙이기
	setPhoneNumFormat("tfCustPhoneNum");
	
	// 민원인정보 휴대전화번호 '-' 붙이기
	setPhoneNumFormat("tfCustCelPhoneNum");

	// 민원인정보 집전화번호 '-' 붙이기
	setPhoneNumFormat("tfCustHomeNum");
	
	// 민원인정보 팩스번호 '-' 붙이기
	setPhoneNumFormat("tfCustFaxNum");
	
	// 예약전화번호 '-' 붙이기
	setPhoneNumFormat("tfMainResvPhoneNum");
	
	// 콜백전화번호 '-' 붙이기
	setPhoneNumFormat("tfMainCallbckRegPhoneNum");
	
	// 상담정보 관련 버튼 이벤트
	//$("#btnCustInit").hide();
	
	// 2020.01.20 주소검색버튼 추가
	$("#btnCustAddrSearch").bind("click", CustAddrSearch);
	
	$("#btnCnslSave").bind("click", saveCnslData);
	$("#btnCnslInit").bind("click", btnCnslInitClick);

	//테스트값 확인
	$("#hid_value").bind("click", testDataPopup);
	$("#hid_getTicketId").bind("click", testGetTicketID);
	
	// 이관 대상자 텍스트 창 클릭 이벤트
	$("#tfMainTrnrRcvnUsr").bind("click", function(e)
	{
		$("#selMainActtypecd").trigger("change");
	});
	
	// 민원관련 기능 disable
	fnMinwonItemsControl(false);
	
	$("#imgMainDepartmentSearch, #btnDept01").bind("click", function(e)
	{
		window.sessionStorage.setItem("fromFlag", "fromMain");
		window.sessionStorage.setItem("corpOpenType", "doMinwon");
		window.sessionStorage.setItem("deptType", "M");
		openMenuPopup("CM0311");
	});
	
	$("#imgSubDepartmentSearch, #btnDept02, #tfTransfDept_02").bind("click", function(e)
	{
	    if ($("#mainDeptCd").val() == "") {
	    	alert('주관부서를 먼저 지정해야 합니다.');
	    	$("#tfTransfDept_01").focus();
	   	} else {
			window.sessionStorage.setItem("fromFlag", "fromMain");
			window.sessionStorage.setItem("corpOpenType", "doMinwon");
			window.sessionStorage.setItem("deptType", "S");
			window.sessionStorage.setItem("mainDeptCd", $("#mainDeptCd").val());
			
			if(this.id=="btnDept02"){
				openMenuPopup("CM0311");
			}
	   	}
	});

	// 처리유형 변경 이벤트
	$("#selMainActtypecd").bind("change", function(e)
	{
		var actMainTypeCd=e.target.value;
		//이전 선택이 호전환이나 상담후 호전환이면 입력된 값 그대로 유지
		if((actMainTypeCd=="030200" || actMainTypeCd=="030300" || actMainTypeCd=="030500") && (g_selMainActtypecd=="030200" || g_selMainActtypecd=="030300" || g_selMainActtypecd=="030500")){
			return true;
		} 
						
		$("#imgMainAcctypecdText").hide();
		$("#labMainActtypecdText").html("");
		$("#tfMainRescDtm").val("");
		$("#tfMainTrnrRcvnUsr").val("");
		$("#tfMainTrnrRcvnUsr").hide();
		$("#responsibleUsrId").val("");
		$("#imgManAcceptedText").hide();
		$("#labManAcceptedText").html("");
		$("#tfManAccepted").val("");		
		$("#tfAcceptedPhoneNum").val("");		
		$("#tfAcceptedPhoneNum").hide();
		
		$("#tfMainOrganization").val("");
		$("#tfMainOrganization").hide();
		
		// 민원관련 항목 disable
		fnMinwonItemsControl(false);
		
		$("#imgMainResvPhoneNumText").hide();
		$("#labMainResvPhoneNumText").html("");
		
		$("#tfMainCallbckRegPhoneNum").hide();
		$("#tfMainCallbckRegPhoneNum").val("");
		
		$("#selMainArsService").hide();
		
		$("#tfMainResvPhoneNum").hide();
		$("#tfMainCallbckRegPhoneNum").hide();
		$("#tfMainRescDtm").hide();
		$("#tfMainCallBackUsr").hide();
		$("#btnArsTransfer").hide();
		$("#labMainRcvCont").html("");
		
		$(".main_tbl_con .mainAccepted").attr("colSpan", 0);
		
		$("#tfClaimant").hide();
		$("#tfClaimantPhoneNum").hide();
		$("#imgMainHidePhoneNum").hide();
		
		var rcvCont=$("#tfMainRcvCont").val();
		var actCont=$("#tfMainActCont").val();
		if(rcvCont=="특이민원" || rcvCont=="착오전화"){
			$("#tfMainRcvCont").val(""); //문의내용 
			$("#tfMainActCont").val(""); //답변내용 	
		}
		
		$("#selMainActstcd").val("010000"); //미완료:010000, 완료:030400
		
		if(actMainTypeCd!="010000"){
//			$("#selMainIntvExCd").val("20000000").trigger("change");
//			$("#selMainIntvLgCd").val("20010000").trigger("change");
//			$("#selMainIntvMdCd").val("20011200").trigger("change");
//			$("#selMainIntvSmCd").val("20011201");
			
			/*$("#selMainIntvExCd").val("all").trigger("change");*/
			$("#selMainIntvLgCd").val("all").trigger("change");
			$("#selMainIntvMdCd").val("all").trigger("change");
			$("#selMainIntvSmCd").val("all");
		}

		var ImmeStatus=$("#selMainIntvLgCd").val();
		
//		if($("#selMainActtypecd").is(":disabled")){
//			console.log("already "+gConstImmeExcd);
//			return;
//		}
		
//		if(ImmeStatus==gConstImmeExcd){
//			console.log(ImmeStatus+">> 긴급정보시(기타:"+gConstImmeExcd+") Skip!");
//			$("#selMainActtypecd").val("010000");
//			//alert("상담유형이 기타(긴급정보)일 경우, 처리유형을 변경할 수 없습니다.");
//			return;
//		}
		$("#labKind").hide();
		$("#star_rating").hide();
		
		// 영상상담 이미지 hide
		$("#tfVideoImage,#tfVideoImageList").hide();
		
		switch(actMainTypeCd)
		{
			case "010000" : // 일반상담
			case "050000" : // 콜백
			{
				//$("#selMainActstcd").val("030400"); //미완료:010000, 완료:030400
				break;
			}
			case "010100" :
			{
				$("#tfMainRcvCont").val("영상상담 문의내용"); //문의내용 
				$("#tfMainActCont").val("영상상담 답변내용"); //답변내용 
				$("#tfVideoImage,#tfVideoImageList").show();
				break;
			}
			case "060000" :		// 임시저장
				break;
			case "020000" :		// 예약통화
			{
				$("#imgMainAcctypecdText").show();
				$("#labMainActtypecdText").html("재통화일시");
				$("#tfMainRescDtm").show();
				$("#tfMainRescDtm").val(getDate()+" "+getTime());
				$("#imgMainResvPhoneNumText").show();
				$("#labMainResvPhoneNumText").html("재통화번호");
				$("#tfMainResvPhoneNum").show(); 
				$("#selMainActstcd").val("010000");
				// 현재통화중인 전화번호
				$("#tfMainResvPhoneNum").val(getPhoneNumFormat($("#CALLNO").val()));
				setPhoneNumFormat("tfMainResvPhoneNum");
				
				break;
			}
			case "030100" :		// 이관민원
			{
				fnMinwonItemsControl(true);
				setPhoneNumFormat("tfAcceptedPhoneNum");
				break;
			} 
			case "030400" :     // ARS호전환
				//$("#imgMainAcctypecdText").show();
				//$("#labMainActtypecdText").html("ARS대상");
				//$("#mainAcceptContent").hide();
				$(".main_tbl_con .mainAccepted").attr("colSpan", 2);
				$("#selMainArsService").show();
				$("#btnArsTransfer").show();
				$("#selMainActstcd").val("030400"); //미완료:010000, 완료:030400
				
				if (!bCalling) {
					//alert('호전환은 통화중에만 가능합니다.');
					//break;
				}
				
				break;
			case "030200" :     // 호전환
			case "030300" :     // 상담 후 호 전환
			case "030500" :     // 담당자 부재중
			{
				$("#labKind").show();
				$("#star_rating").show();
				$("#star_rating").empty();
				$.ratePicker("#star_rating",{rate:function(){},
				rgbOff : "#ffffff",stars:4
				});	
				$("#imgMainAcctypecdText").show();
				$("#labMainActtypecdText").html("<button type='button' style='font-size: 11px;font-weight: normal;' class='button' onclick='btnMainDeptCick();'>담당부서</button>");
				$("#tfMainOrganization").show();
				$("#imgManAcceptedText").show();
				$("#labManAcceptedText").html("담당자");
				$("#tfManAccepted").show();
				$("#imgMainResvPhoneNumText").show();
				$("#labMainResvPhoneNumText").html("전화번호");
				$("#tfAcceptedPhoneNum").show();
				$("#imgMainHidePhoneNum").show();
				$("#tfAcceptedPhoneNum").val();
				setPhoneNumFormat("tfAcceptedPhoneNum");
				$("#selMainActstcd").val("030400"); //미완료:010000, 완료:030400
				if(!g_trnrFlag)
				{
					if (!bCalling) {
						//alert('호전환은 통화중에만 가능합니다.');
						//break;
					}
					
			//		window.sessionStorage.setItem("fromFlag", "fromMain");
			//		window.sessionStorage.setItem("corpOpenType", "doCorp");
					//조직도에서 사용
				//	openMenuPopup("CM0311");
				}
				break;
			}
			case "040000" :		// 콜백등록
			{
				$("#imgMainAcctypecdText").show();
				$("#labMainActtypecdText").html("등록대상");
				$("#tfMainCallBackUsr").show();
				$("#imgMainResvPhoneNumText").show();
				$("#labMainResvPhoneNumText").html("콜백번호");
				$("#tfMainCallbckRegPhoneNum").show(); 
				$("#selMainActstcd").val("010000");
				$("#tfMainCallbckRegPhoneNum").val(getPhoneNumFormat($("#CALLNO").val()));
				setPhoneNumFormat("tfMainCallbckRegPhoneNum");
				
				if(!g_trnrFlag)
				{
					window.sessionStorage.setItem("fromFlag", "fromMain");
					window.sessionStorage.setItem("corpOpenType", "callCorp");
					openMenuPopup("CM0311");
				}
				
				break;
			}
			default:
				break;
		}
		
		// 호전환, 상담후 호전환
		//이전 선택이 호전환이나 상담후 호전환이면 입력된 값 그대로 유지
		g_selMainActtypecd = actMainTypeCd;
			
	});

	// 처리상태 로드 이벤트
//	$("#selMainActstcd").bind("load", function(e)
//	{
//		$("#selMainActstcd").val("010000");
//	});
	
	$("#btnArsTransfer").bind("click", function(e) 
	{
		// 호전환처리
		var arsNumber = $("#selMainArsService").val();
//		var arsNumber = "7021";
		
		// function fnSingleStepTransfer(dialNumber, custNo, contents)
		// 전화번호, 
		//fnSingleStepTransfer(arsNumber, '', '');
		
		fnSingleStepTransfer("SINGLE_STEP_TRANSFER", arsNumber, $("#tfCustId").val(), $("#CALLNO").val());
		
		// 악성민원 호전환 - 22.02.25
		if(ivrBlockCd.includes(arsNumber)){
			insertBlockInfo(arsNumber);
		}
		
		alert(arsNumber + ' ARS호전환처리되었습니다.');
	});
	
	// 하단 자동대기 클릭 이벤트
	$("#spanUnderAutoRcv").bind("click", function(e)
	{
		g_runAutoReadyFlag = false;
		
		if(g_autoReadyTimer != null)
		{
			clearTimeout(g_autoReadyTimer);
			g_autoReadyTimer = null;
		}
		
		if($("#spanUnderAutoRcv").html() == "ON")
		{
			$("#spanUnderAutoRcv").html("OFF");
		}
		else
		{
			$("#spanUnderAutoRcv").html("ON");
		}
	});
	
	// 하단 미처리 클릭 이벤트
	$("#divUnderInOutCnt").bind("click", function(e)
	{ 
	    	g_underSearch = "call";
	    	//$("#divRCTabCnslListBtn").trigger("click");
	    	$('a[href="#divRCTabCnslList"]').trigger("click");
	    	counselMainGridType2("counselList"); //hhs 20.04.09
	});
	
	// 하단 IN 클릭 이벤트
	$("#divUnderInboundCnt").bind("click", function(e)
	{
		//$("#divCnslTabMainBtn").trigger("click");
    	$('a[href="#divRCTabCnslList"]').trigger("click");
	});
	
	// 하단 OUT 클릭 이벤트
	$("#divUnderOutboundCnt").bind("click", function(e)
	{
		//$("#divCnslTabMainBtn").trigger("click");
    	$('a[href="#divRCTabCnslList"]').trigger("click");
	});
	
	// 하단 통화시간 클릭 이벤트
	$("#divUnderCallTimeCnt").bind("click", function(e)
	{
		//$("#divCnslTabMainBtn").trigger("click");
    	$('a[href="#divRCTabCnslList"]').trigger("click");
	});
	
	// 하단 미처리 클릭 이벤트
	$("#divUnderNotyetCnt").bind("click", function(e)
	{
    	g_underSearch = "No";
    	$('a[href="#divRCTabCnslList"]').trigger("click");
		counselMainGridType2("counselList");
	});
	
	// 하단 콜백 클릭 이벤트
	$("#divUnderCallbackCnt").bind("click", function(e)
	{
		openMenuPopup("CM0021");
		//$("#divRCTabCallbackListBtn").trigger("click");
	});
	
	// 하단 예약 클릭 이벤트
	$("#divUnderResvCnt").bind("click", function(e)
	{
		g_underSearch = "Resv";
		//$("#divRCTabCnslListBtn").trigger("click");
    	$('a[href="#divRCTabCnslList"]').trigger("click");
    	counselMainGridType2("counselList"); //hhs 20.04.09
	});
	
	// 하단 쪽지 클릭 이벤트
	$("#divUnderMessageCnt").bind("click", function(e)
	{
		//$("#divRCTabMessageBtn").trigger("click");
    	$('a[href="#divRCTabMessage"]').trigger("click");
	});
	
	//하단 캠페인 클릭 이벤트
	//$("#divUnderCmpgCnt").bind("click", function(e)
	//{
	//	openMenuPopup("CM0202");
	//});
	
	// 화면 하단 반송민원 -> SMS
	$("#divUnderComplaintCnt").bind("click", function(e) 
	{
		//openMenuPopup("CM0032");
	    	$("#btnInit").trigger("click");
		//$("#divRCTabSMSListBtn").trigger("click");
	    	$('a[href="#divRCTabSMSList"]').trigger("click");
	});
	
	// 반송DB -> BIS
	$("#divUnderRetDBCnt").bind("click", function(e)
	{
		alert("서비스 준비중입니다.");
		//openMenuPopup("CM0032");
	});

	// 화면 하단 해피콜 -> 해피콜
	$("#divUnderCmpgCnt").bind("click", function(e) 
	{
//		openMenuPopup("CM0202");
	    openMenuPopup('ED0022');
		//$("#divRCTabHappyCallBtn").trigger("click");
	});
	
	// 하단 이관대기
	$("#civilComplaint").bind("click", function(e) 
	{
	    g_underSearch = "civilComplaint";
	    counselMainGridType2("counselList");
    	$('a[href="#divRCTabCnslList"]').trigger("click");
	    
	});	
	
	
	// 민원인 휴대전화번호 전화기 클릭 이벤트
	$("#imgMainCellPhoneNum").bind("click", function(e)
	{
		window.sessionStorage.setItem("setCustInfo", "true");
		window.sessionStorage.setItem("callType", "makecall");
		makeCall($("#tfCustCelPhoneNum").val().replace(/-/gi, ""));
	});
	
	// 민원인 사무실번호 전화기 클릭 이벤트
	$("#imgMainPhoneNum").bind("click", function(e)
	{
		window.sessionStorage.setItem("setCustInfo", "true");
		window.sessionStorage.setItem("callType", "makecall");
		makeCall($("#tfCustPhoneNum").val().replace(/-/gi, ""));
	});
	
	// 민원인 집전화번호 전화기 클릭 이벤트
	$("#imgMainHomeNum").bind("click", function(e)
	{
		window.sessionStorage.setItem("setCustInfo", "true");
		window.sessionStorage.setItem("callType", "makecall");
		makeCall($("#tfCustHomeNum").val().replace(/-/gi, ""));
	});
	
	// 민원인 FAX 클릭 이벤트
	$("#imgCustFaxNum").bind("click", function(e)
	{
		var faxNum=$("#tfCustFaxNum").val().replace(/-/gi, "");
		 webFaxLogin('/fax_send_form_new.php',faxNum);
	});
	
	// 호전환 전화기 클릭 이벤트
	$("#imgMainHidePhoneNum").bind("click", function(e)
	{
		
		var telnum=$("#tfAcceptedPhoneNum").val().replace(/-/gi, "");
		if(telnum==""){
			alert("전화번호를 입력해 주세요.");
			$("#tfAcceptedPhoneNum").focus();
			return;
		}
		window.sessionStorage.setItem("setCustInfo", "true");
		window.sessionStorage.setItem("callType", "consult"); // 협의콜
		makeCall(telnum);
	});	
	
	$("#tfCustNm").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			$("#btnCustSearch").trigger("click");
	});
	
	//핸드폰번호 Enter
	$("#tfCustCelPhoneNum").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			$("#btnCustSearch").trigger("click");
	});
	
	//전화번호 Enter
	$("#tfCustPhoneNum").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			$("#btnCustSearch").trigger("click");
	});	
	
	// 전화받기 팝업 전화받기 버튼 이벤트
	$("#btnDialogMainCallPopupGeneral").bind("click", function(e)
	{
		//fnLog("Request [fnAnswer]");
		fnAnswer();
		$("#dialogMainCallPopupGeneral").dialog("close");
	});
	
	//전화번호  인입시  Enter
	$("#tfDialogMainCallPopupGeneralCallgb").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			$("#btnDialogMainCallPopupGeneral").trigger("click");
	});	
	
	// 전화받기 팝업 전화받기 버튼 이벤트
	$("#btnDialogMainCallPopupCustom").bind("click", function(e)
	{
		//fnLog("Request [fnAnswer]");
		fnAnswer();
		$("#dialogMainCallPopupCustom").dialog("close");
	});
	
		// 전화받기 팝업 전화받기 버튼 이벤트
	$("#btnDialogMainARSAuthPopup").bind("click", function(e)
	{
		$("#dialogMainARSAuthPopup").dialog("close");
	});
	
	
	// 예약알림 클릭 이벤트
	/*
	$("#divSlideAlert").bind("click", function(e)
	{
		$("#divCnslTabNotCompleteBtn").trigger("click");
		$("#divRCTabResvCallListBtn").trigger("click");
	});
	*/
	
	// 쪽지알림 클릭 이벤트
	/*
	$("#divSlideAlertMessage").bind("click", function(e)
	{
		$("#divRCTabMemoBtn").trigger("click");
	});
	*/
	
	// 사무실 번호 클릭 시 해당 번호 복사
	$("#labMainCustPhoneNum").bind("click", function()
	{
		if($("#tfCustPhoneNum").val() != "")
		{
			window.clipboardData.setData("Text", $("#tfCustPhoneNum").val());
			alert("복사되었습니다.");
		}
	});
	// 통합 검색
	$("#cntrSearch").bind("click ", function(){
		if($("#searchTotal").val().trim() == ""){
			alert("검색어를 입력하세요");
			return;
		}else{
			var width = 1224;
			var height = 1004;
			var top = 0;
			var left = (screen.width - width) / 2;
//			var encText = encodeURI($("#searchTotal").val());
			var encText = $("#searchTotal").val();
			var paramURL = "http://172.17.100.101:8088/search/search.jsp";
			var option = "width=" + width + ", height=" + height
				+ ", toolbar=no, directories=no, scrollbars=yes, location=no, resizable=no, status=no,menubar=no, top="
				+ top + ",left=" + left +"";
			var winPopTarget="통합 검색";
			searchPopupSubmit(paramURL, encText, winPopTarget, option);
			$("#searchTotal").val("");

///////////////////////////
//			var encText = encodeURI($("#searchTotal").val());
//			var paramURL = "http://172.17.100.101:8088/search/search.jsp?query=" + encText;
//			var option = "width=" + width + ", height=" + height
//				+ ", toolbar=no, directories=no, scrollbars=yes, location=no, resizable=no, status=no,menubar=no, top="
//				+ top + ",left=" + left +"";
//			
//			alert("검색어 : " + encText);
//			var newWindow = window.open(paramURL, "통합 검색", option);
//			newWindow.focus();
///////////////////////////

		}
	});
	$("#searchTotal").bind("keydown", function(key) {
		if (key.keyCode == 13)
			$("#cntrSearch").trigger("click");
	});
	
	//항목 복사
	$("#copyChange").bind("click", function() {
		 copyCont("tfMainRcvCont","tfMainTransferCont","change");
	});

	//항목 복사
	$("#copyAttach, #copyAttach2").bind("click", function() {
		if(this.id=="copyAttach"){
			//문의내용 => 이관내용
			copyCont("tfMainRcvCont","tfMainTransferCont","attach");
		}else{
			//답변내용 => 이관내용
			copyCont("tfMainActCont","tfMainTransferCont","insert","\n\n[답변내용 : ");
		}
	});

	//내용삭제
	$("#deleteCont").bind("click", function() {
		 copyCont("tfMainTransferCont","","delete");
	});
		
		// 바로가기 클릭 이벤트
	$("#btnShortcuts_01, #btnShortcuts_02, #btnShortcuts_03, #btnShortcuts_04, #btnShortcuts_05").bind("click", function(e)
	{
		initShortCutData()
		var selectID=$(this).attr("id");
		var arrSeq=selectID.split("_");
		
		var iObj=tObItem[arrSeq[1]];
		
		// 조직도 팝업없이 값만 셋팅
		if(arrSeq[1]=="04"){
			g_trnrFlag = true;
		}
		
		$("#selMainActtypecd").val(iObj.type_cd).trigger("change");
		/*if(iObj.ex_cd!="") $("#selMainIntvExCd").val(iObj.ex_cd).trigger("change");*/
		if(iObj.lg_cd!="") $("#selMainIntvLgCd").val(iObj.lg_cd).trigger("change");
		if(iObj.md_cd!="") $("#selMainIntvMdCd").val(iObj.md_cd).trigger("change");
		if(iObj.sm_cd!="") $("#selMainIntvSmCd").val(iObj.sm_cd);
		
		iObj.func();
			
		g_trnrFlag = false;
 
	});
//jqgrid를 화면 크기에 따라 바뀌도록 기능을 추가
	$(window).bind('resize', function() {
	    jQuery("#tblCnslHistoryTabMain").setGridWidth($("#divCnslTabMain").width(), true);
	}).trigger('resize');
	$(window).bind('resize', function() {
	    jQuery("#tblCnslHistoryTabNotComplete").setGridWidth($("#divCnslTabNotComplete").width(), true);
	}).trigger('resize');
	$(window).bind('resize', function() {
	    jQuery("#tblCnslHistoryTabFax").setGridWidth($("#divCnslTabFax").width(), true);
	}).trigger('resize');
	$(window).bind('resize', function() {
	    jQuery("#tblCnslHistoryTabSMS").setGridWidth($("#divCnslTabSMS").width(), true);
	}).trigger('resize');
	
	
} //initEvent
	
//부서팝업
function btnMainDeptCick(){
	window.sessionStorage.setItem("fromFlag", "fromMain");
	window.sessionStorage.setItem("corpOpenType", "doCorp");
	window.sessionStorage.setItem("callType","consult");
	openMenuPopup("CM0311");
}


function initShortCutData(){
	
	$.each(typeObj, function(key, val)
	{
		 tObItem[key]={
				 "key" : key,
				 "type_cd": typeObj[key],
				 //"ex_cd"  : xlmsCd["x"+key],
		 		 "lg_cd"  : xlmsCd["l"+key],
				 "md_cd"  : xlmsCd["m"+key],
		 		 "sm_cd"  : xlmsCd["s"+key],
		 		 "func"   : function() {}
		 }
		 
		 //객체 함수 구현
		 
		switch(key)
		{
			case "02" :
			{
				tObItem[key].func =function() { 
					$("#tfMainRcvCont").val("특이민원"); //특이민원 
					$("#tfMainActCont").val("특이민원"); //특이민원 
				}
				break;
			}
			case "03" :
			{
				
				break;
			}
			case "04" : 
			{	//3자통화
				 tObItem[key].func =function() { 
	   
						  $("#tfMainExtAgencyId").val(gConferUsrId);
						  $("#tfManAccepted").val(gConferAccepted);
						  $("#tfMainOrganization").val(gConferDept);
						  $("#tfAcceptedPhoneNum").val(gConferPhoneNum);
						  $("#tfMainTrnrRcvTeamCd").val("");
						  $("#tfMainTrnrRcvDeptCd").val(gConferDeptCd);	
			   }
				 break;
			}		
			case "05" : 
			{	//긴급정보
				 tObItem[key].func =function() { 
					 $("#tfClaimant").val($("#tfCustNm").val());
					 $("#tfClaimantPhoneNum").val(getPhoneNumFormat($("#CALLNO").val()));
			   }
				 break;
			}		
			default :
			{
				break;
			}
		}
		 
	});
}

// 초기 데이터 셋팅
function initData()
{

	// 이석 상태 정보를 가져와 셋팅
//	$.ajax({
//		type : "post",
//		async : true,
//		url : getContextPath() + "/ajax/main/getNotReadyMenu.do",
//		data : "pJson=" + getJsonStrNotReadyMenu(),
//		success : function(data)
//		{
//			$("#ulNotReadyMenu").html("");
//			
//			if(jr != '')
//			{
//				// param값을 JSON으로 파싱
//				var jr = JSON.parse(data);
//				var value = "";
//				
//				$.each(jr, function(key, state)
//				{
//					if((state.CD).match("210")){
//						value += "<li value='" + (state.CD).substring(3, 5) + "' id='liNotReadyMenu_" + (state.CD).substring(3, 5) + "'>" + state.CD_NM + "</li>";
//					}
//				});
//				
//				$("#ulNotReadyMenu").append(value);
//				$("#ulNotReadyMenu").menu();
//			}
//		},
//		error : function(data, status, err) 
//		{
//			networkErrorHandler(data, status, err);
//		}
//	});
	
	// 즐겨찾기 정보를 가져와 셋팅
//	$.ajax({
//		type : "post",
//		async : true,
//		url : getContextPath() + "/ajax/main/getFavoritMenu.do",
//		data : "pJson=" + getJsonStrFavoritMenu(),
//		success : function(data)
//		{
//			$("#ulFavoritMenu").html("");
//			
//			// param값을 JSON으로 파싱
//			var jr = JSON.parse(data);
//			var value = "";
//			
//			if(jr != '')
//			{
//				$.each(jr, function(key, state)
//				{
//					value += "<li value='" + (state.EXT1_CD).toString() + "' id='liFavoritMenu_" + state.CD + "'>" + state.CD_NM + "</li>";
//				});
//				
//				$("#ulFavoritMenu").append(value);
//				$("#ulFavoritMenu").menu();
//			}
//		},
//		error : function(data, status, err) 
//		{
//			networkErrorHandler(data, status, err);
//		}
//	});
	
	// 사용자 정보를 가져와 셋팅
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/getUserInfo.do",
		data : "pJson=" + getJsonStrUserInfo(window.sessionStorage.getItem("USR_ID")),
		success : function(data)
		{
			// 오른쪽 하단 정보 셋팅
			$("#labMainStatusUserNm").html(data.USR_NM);
			
			if(window.sessionStorage.getItem("EXTN_NO") == null || window.sessionStorage.getItem("EXTN_NO") == "")
			{
				$("#labMainRightDown1").hide();
				$("#labMainRightDown2").hide();
			}
			else
				$("#labMainStatusExtnNo").html(window.sessionStorage.getItem("EXTN_NO"));
			
			// cti사용을 위한 hidden value 셋팅
			$("#USERNAME").val(data.USR_NM);
			$("#EXT").val(window.sessionStorage.getItem("EXTN_NO"));
			$("#USERID").val(window.sessionStorage.getItem("CTI_LGN_ID"));
			$("#CTIUSRYN").val(window.sessionStorage.getItem("CTI_USE_YN"));
			// Added by jnkim 2016.10.05 
			$("#EMPNO").val(data.EMP_NO);

			if(window.sessionStorage.getItem("CNTR_CD") == "010000" && window.sessionStorage.getItem("CHANGE_EXTN_NO") == "Y")
			{
				// 사용자 내선번호를 셋팅
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/main/getUserExtUpdate.do",
					data : "pJson=" + getJsonStrUserExtUpdate($("#EXT").val()),
					success : function(data)
					{
						
					},
					error : function(data, status, err) 
					{
						console.log("에러발생: 코드- " + err);
					}
				});
			}
			
			$.ajax({
				type : "get",
				async : true,
				url : "http://172.17.0.17:8081/interface/rec_proc.jsp",
				data : "rec_type=REC3&local_no=" + $("#EXT").val() + "&agentid=" + $("#USERID").val(),
				success : function(data)
				{
					
				},
				error : function(data, status, err) 
				{
					console.log("에러발생: 코드- " + err);
				}
			});
						
			// alert('CTI사용유무 : ' + window.sessionStorage.getItem("CTI_USE_YN"));
			// cti 사용 유무에 따라 cti 연결 설정
			if(window.sessionStorage.getItem("CTI_USE_YN") == "Y")
				ctiInit();		// cti 초기 설정
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
     //상담유형 미리 로드
  // setCategoryCodeListToObject("selMainInstClass","","11000000");
    
//	initCustInfo();
//	initCnslInfo();
}

function callBackSet(phoneNum, callbckId, ticketId)
{	
	//setCustInfo(phoneNum, "");
	window.sessionStorage.setItem("callType", "makecall"); 
	$("#refId").val(callbckId);
	$("#callBckMainId").val(callbckId);
	$("#callBckTicketId").val(ticketId);
//	$("#selMainActtypecd").val("010000");		//순천시청 - "직접상담"으로 셋팅
	$("#selMainActstcd").val("010000");		//상담결과 - "미완료"으로 셋팅   030400:완료
	$("#selMainActtypecd").val("050000");		//콜백처리
	$("#selMainCallgbcd").val("2"); //아웃바운드
	makeCall(areaNumber(phoneNum));
}

// 예약통화 아웃바운드
function resvCallSet(custId, phoneNum, tcktId, title)
{
	if(title == "예약통화목록")
		$("#showLeft").trigger("click");
	
	$("#tfMainResvTicketId").val(tcktId);
	classie.toggle( showLeft, 'disabled' );
	//window.sessionStorage.setItem("setCustInfo", "true");
	//setCustInfo(phoneNum, custId);
	window.sessionStorage.setItem("callType", "makecall");
	usrTelClick(phoneNum, custId, "");
	//makeCall(phoneNum);
	setResvCallInfo(phoneNum);
}

// 예약 통화 기본 정보 셋팅
function setResvCallInfo(phoneNum)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/counselSpec.do",
		data : "pJson=" + getJsonStrCounselspec($("#tfMainResvTicketId").val()),
		success : function(data)
		{
			if(data != null)
			{
				$("#selMainChgbcd").val(data.CH_GB_CD);
				$("#labMainCntctInfm").val(phoneNum);
				$("#selMainCallgbcd").val("2");
				$("#selMainActtypecd").val("010000");
				$("#tfMainRcvCont").val(data.RCV_CONT);
				$("#selMainActstcd").val(data.ACT_ST_CD);
				/*$("#selMainIntvExCd").val(data.INTV_EX_CD);*/
				$("#selMainIntvLgCd").val(data.INTV_LG_CD);
				$("#selMainIntvMdCd").val(data.INTV_MD_CD);
				$("#selMainIntvSmCd").val(data.INTV_SM_CD);
				$("#tfMainActCont").val(data.ACT_CONT);
			}
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function resvCallStateUpdate(tcktId, outTcktId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/actTypeCdUpdate.do",
		data : "pJson=" + getJsonStrActStUpdate(tcktId, outTcktId, $("#callBckMainId").val()),
		success : function(data)
		{
			$("#tfMainResvTicketId").val("");
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function changeText()
{
	var $activeText = $(".slide_container .slide_active_text"); 
   
	var $nextText = $activeText.next(); 
	if($activeText.next().length == 0) $nextText = $('.slide_container .slide_flying_text:first');
   
	$activeText.animate({opacity:0}, 1000);
	$activeText.animate({marginLeft: "-100px"});
    
	$nextText.css({opacity: 0}).addClass("slide_active_text").animate({opacity:1, marginLeft: "350px"}, 4000, function(){
		$activeText.removeClass("slide_active_text");                       
	});
}

// VOC접수 버튼 팝업창
function vocPopup_clickEvent()
{
	window.sessionStorage.setItem("VOC_from", "main");
	window.sessionStorage.setItem("VOC_Chgbcd", $("#selMainChgbcd").val());
	window.sessionStorage.setItem("VOC_Rday", $("#labMainRcvDt").text());
	window.sessionStorage.setItem("VOC_Rtime", $("#labMainRcvTm").text());
	window.sessionStorage.setItem("VOC_CorpNm", $("#tfCorpNm").val());
	window.sessionStorage.setItem("VOC_CustNm", $("#tfCustNm").val());
	window.sessionStorage.setItem("VOC_UserName", $("#USERNAME").val());
	window.sessionStorage.setItem("VOC_FarmDisNum", $("#tfFarmDisNum").val());
	window.sessionStorage.setItem("VOC_RcvCont", $("#tfMainRcvCont").val());
	
	window.sessionStorage.setItem("VOC_CelPhoneNum", $("#tfCustCelPhoneNum").val());
	
	if($("#tfCustCelPhoneNum").val() == "")
		window.sessionStorage.setItem("VOC_CelPhoneNum", $("#tfCustPhoneNum").val());
	
	if($("#tfCustCelPhoneNum").val() == "" && $("#tfCustPhoneNum").val() == "")
		window.sessionStorage.setItem("VOC_CelPhoneNum", $("#tfCustHomeNum").val());

	if($("#tfCustCelPhoneNum").val() == "" && $("#tfCustPhoneNum").val() == "" && $("#tfCustHomeNum").val() == "")
		window.sessionStorage.setItem("VOC_CelPhoneNum", $("#tfCustCelPhoneNum").val());
	
	if($("#tfCustCelPhoneNum").val() == "" && $("#tfCustPhoneNum").val() == "" && $("#tfCustHomeNum").val() == "" && $("#tfCustCelPhoneNum").val() == "")
		window.sessionStorage.setItem("VOC_CelPhoneNum", $("#tfCustPhoneNum").val());

	if($("#tfCustCelPhoneNum").val() == "" && $("#tfCustPhoneNum").val() == "" && $("#tfCustHomeNum").val() == "" && $("#tfCustCelPhoneNum").val() == "" && $("#tfCustPhoneNum").val() == "")
		window.sessionStorage.setItem("VOC_CelPhoneNum", $("#tfCustHomeNum").val());
	
	var width = 1000;
	var height = 435;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/voc/vocReg.do";
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no,directories=no,scrollbars=no,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "vocReg", option);
	newWindow.focus();
}

var g_noticeTimer = null;

// 공지사항 아래 위 스크롤 스크립트
function fn_article(containerID, buttonID, autoStart)
{
	var $element = $('#'+containerID).find('.notice-list');
	var autoPlay = autoStart;
	var auto = null;
	var speed = 5000;

	var move = $element.children().outerHeight();
	var first = false;
	var lastChild;

	lastChild = $element.children().eq(-1).clone(true);
	lastChild.prependTo($element);
	$element.children().eq(-1).remove();

	if($element.children().length==1)
		$element.css('top','0px');
	else
		$element.css('top','-'+move+'px');

	if(g_noticeTimer != null)
	{
		clearInterval(g_noticeTimer);
		g_noticeTimer = null;
	}
	
	if(autoPlay)
	{
		g_noticeTimer = setInterval(moveNextSlide, speed);
		auto = true;
	}

	$element.find('>li').bind(
	{
		'mouseenter': function()
		{
			if(auto)
				clearInterval(g_noticeTimer);
		},
		'mouseleave': function()
		{
			if(auto)
				g_noticeTimer = setInterval(moveNextSlide, speed);
		}
	});

	function movePrevSlide()
	{
		$element.each(function(idx)
		{
			if(!first)
			{
				$element.eq(idx).animate({'top': '0px'},'normal',function()
				{
					lastChild = $(this).children().eq(-1).clone(true);
					lastChild.prependTo($element.eq(idx));
					$(this).children().eq(-1).remove();
					$(this).css('top','-'+move+'px');
				});
				
				first = true;
				return false;
			}

			$element.eq(idx).animate({'top': '0px'},'normal',function()
			{
				lastChild = $(this).children().filter(':last-child').clone(true);
				lastChild.prependTo($element.eq(idx));
				$(this).children().filter(':last-child').remove();
				$(this).css('top','-'+move+'px');
			});
		});
	}

	function moveNextSlide()
	{
		$element.each(function(idx)
		{
			var firstChild = $element.children().filter(':first-child').clone(true);
			firstChild.appendTo($element.eq(idx));
			$element.children().filter(':first-child').remove();
			$element.css('top','0px');

			$element.eq(idx).animate({'top':'-'+move+'px'},2000);
		});
	}
}

/**
 * 위치검색
 */
function fnSearchPos() {
	var telno = ($("#tfCustCelPhoneNum").val()).replace(/-|(\s*)/gi, "");
	if(telno.length < 10 ){
		alert("휴대폰 번호를 확인해 주세요!");
		return;
	}
	
	if($("#tfCustId").val() == ""){
		alert("민원인ID가 존재하지 않습니다. 민원인정보를 추가하거나 조회하여 주세요.");
		return;
	}
	
//	alert("위치조회는 시스템 상태에 따라 30초정도 소요됩니다.");

//	$("#btnMap").addClass("blinkcss");
//	$("#btnMap").removeClass("button");
	
	//위치동의이력 update
	fnSetARSAuthInsert(g_location);
			
//	$("#btnMap").addClass("button");
//	$("#btnMap").removeClass("blinkcss");
	
	if(g_location.result!="S00000"){
		alert("민원인 위치검색 오류! \n관리자에게 문의바랍니다.\n\n"+"메세지: "+ errCodeObj[g_location.result] );
	}else{
		var AnsUtmX=g_location.x;
		var AnsUtmY=g_location.y;
		var newX=AnsUtmX.substr(0,(AnsUtmX.length-6))+"."+AnsUtmX.substr((AnsUtmX.length-6));
		var newY=AnsUtmY.substr(0,(AnsUtmY.length-6))+"."+AnsUtmY.substr((AnsUtmY.length-6));

		openWindowMap(newX, newY, g_location.type, g_location.addr.trim());
	}
			//alert("Zip:"+AnsZipCode+",Addr:"+AnsAddress+", X:"+AnsUtmX+", Y:"+AnsUtmY+", Time:"+AnsTime+", Rlt:"+AnsResult+", TYPE:"+MS_TYPE+", TelCom:"+TelCom );
	 
	 
	var errCodeObj ={
		"S00000":"성공",
		"E00100":"전원꺼짐/통화권이탈",
		"E00200":"단말기형식오류",
		"E00300":"메시지OVERFLOW",
		"E00400":"위치요청거부",
		"E00500":"비가입자,결번,서비스정지",
		"E00700":"이동통신사장애",
		"E00800":"원격통신오류",
		"E00900":"결과수신오류",
		"E90000":"기타",
		"E99999":"서버통신오류"
	}
	
}

function openWindowMap(x, y, c, addr){
 
	var mLvl={
		"C":"측위구분(Cell)",
		"G":"측위구분(Gps)",
		"W":"측위구분(Wifi)",
		"P":"측위구분(PCell)"
	 }
	 
	var strTemp=addr +" , "+mLvl[c];
//	var url="http://map.daum.net/link/map/"+strTemp+","+y+","+x;
//	var newWindow = window.open(url,'ot');

//  var paramURL = getContextPath() + "/web/main/popupMap.do?LOCX="+x+"&LOCY="+y+"&PARASTR="+escape(encodeURIComponent(strTemp));
  var paramURL = getContextPath() + "/web/main/daumMap.do?LOCX="+x+"&LOCY="+y+"&PARASTR="+escape(encodeURIComponent(strTemp));
  var newWin = window.open(paramURL,'apimap');

}

/**
 * 위치검색동의 DB등록
 */
function fnSetARSAuthInsert(paramObj) {
 
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/main/setARSAuthInsert.do",
		data : "pJson=" + setARSAuthInsert(paramObj),
		success : function(data)
		{
			//alert($("#tfCustCelPhoneNum").val()+" 등록 되었습니다.");
		},
		error : function(data, status, err) 
		{
			alert("위치동의 내역를 DB에 등록하지 못했습니다.");
			//networkErrorHandler(data, status, err);
		}
	});

}

/**
 * 위치검색동의요청
 */
function fnRequestAgree() {
	//alert("서비스 준비중입니다.");
	//return;

	var fID=this.id; 

	var jobName="";
	if(fID=="btnRequestAgree"){
		jobName="location";
	}else if(fID=="btnAuthCust"||fID==undefined){
		jobName="ssnumber";
	}
	
	var custPhoneNum=$("#tfCustPhoneNum").val();
	var cellPhoneNum=$("#tfCustCelPhoneNum").val();
	if(custPhoneNum=="" && cellPhoneNum==""){
		alert("민원인 전화번호가 없습니다.");
		return;
	}
	
	var sStat=$("#AGENT_STATUS").val();
	// 보류상태일 경우 전화 연결 불가
	if( sStat!="통화중") 
	{
		alert("통화중 상태에서만 인증할 수 있습니다.");
		return;
	}
	
	$("#btnRequestAgree").css("color","black");
	$("#btnRequestAgree").attr('disabled', true);

	var pTelnum=cellPhoneNum==""?custPhoneNum:cellPhoneNum;
			
	makeCall(pTelnum, jobName);

	$("#btnRequestAgree").css("color","white");
	$("#btnRequestAgree").attr('disabled', false);

}

//파라미터 셋팅_SendSms_NURI
function getJsonStrRsltAlrmSendSmsNuri(cont_seq, sendNum, distinct, distId){
	console.log("AlrmSendSms["+cont_seq+"] : "+ sendNum+", "+ distinct+", "+ distId);
	
	var callback="0617493114"; // 발신번호
	var callTo = ""; // 수신번호
	callTo = sendNum.trim().replace(/-/gi, "");
	
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "c21zLnNlbmRTbXM=",
			"map" : {
				"key" : "value",
				"usr_id" : "SYSTEM",
				"usr_nm" : "SYSTEM",
				"callback" : callback,
				"dest_info" : callTo,
				"smsCheck" : 6,
				"smsType" : "LMS",
				"cont_seq" : cont_seq,
				"uid" : distinct != "cust" ? distId : "",	// 공무원ID
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_SendSms_CONTENT_NURI
function getJsonStrRsltAlrmSendSmsNuriContent(cont_seq, subject, sendMsg){
	console.log("AlrmSendContent["+cont_seq+"] : "+ subject+", "+ sendMsg);
	
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "c21zLnNlbmRTbXNDb250ZW50",
			"map" : {
				"key" : "value",
				"cont_seq" : cont_seq,
				"file_cnt" : 1,
				"subject" : subject,
				"content" : sendMsg,
				"login_usr_id" : "SYSTEM",
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//이관민원 접수 문자알람
function minwonAlrmSendSMS(reqview){
 
	var custTelno=""; //민원인 전화번호 
	var mainAffairUsrId=""; //주관부서 직원ID 
	var subAffairUsrId=""; //보조부서  직원ID 
	var mainOrgUsrNum=""; //주관부서 휴대폰 
	var subOrgUsrNum=""; //보조부서 휴대폰 
	var mainOrgUsrTelno=""; //주관부서 전화번호 
	var subOrgUsrTelno=""; //보조부서 전화번호
	var mainDpt=["",""];
	var subDpt=["",""];
	var prefixMsgToCust="안녕하십니까? 순천시3114온누리콜센터입니다. 귀하께서 문의하신 내용을 ";
	var suffixMsgToCust="로 전달하였습니다. 감사합니다.";
	var prefixMsgToUsr= "";
	
	// 서무에게 발신
	if($("#mainAffairYN").val()=="Y"){
//		prefixMsgToUsr="순천시3114온누리콜센터로부터 민원이 이관 됐습니다. 새올행정 콜센터 메뉴에서 업무담당자를 지정하여 주시기 바랍니다.";
		prefixMsgToUsr="순천시3114온누리콜센터입니다. 시민의 문의가 있어 내용을 이관하였으니 새올행정 콜센터 메뉴에서 업무담당자에게 지정하여 주시기 바랍니다.";
	}else{ // 처리 담당자에게 발신
//		prefixMsgToUsr="순천시3114온누리콜센터로부터 민원이 이관 됐습니다. 새올행정 콜센터 메뉴를 확인 후 처리바랍니다.";
		prefixMsgToUsr="순천시3114온누리콜센터입니다. 시민의 문의가 있어 내용을 이관하였으니 새올행정 콜센터 메뉴를 확인 후 처리바랍니다.";
	}
	
	var sendMsg=["","",""];
	var sendNum=["","",""];
	var deptDist=["","",""];
	var deptId=["","",""];
	var sendSubject=["","",""];
	var sendCount=0;
	var rltSendCheck="Y";
	
	if(reqview=="main"){
		custTelno=$("#tfAcceptedPhoneNum").val(); // 민원인 전화번호
		mainOrgUsrNum=$("#mainAffairMobile").val(); //주관부서 휴대폰
		subOrgUsrNum=$("#subAffairMobile").val(); //보조부서 휴대폰
		mainOrgUsrTelno=$("#mainAffairTelNo").val().trim().replace(/-/gi, ""); //주관부서 전화번호
		mainOrgUsrTelno=getPhoneNumFormat(mainOrgUsrTelno);
		subOrgUsrTelno=$("#subAffairTelNo").val().trim().replace(/-/gi, ""); //보조부서 전화번호
		subOrgUsrTelno=getPhoneNumFormat(subOrgUsrTelno);
		
		mainDpt=$("#tfTransfDept_01").val().split('>');
	 	subDpt=$("#tfTransfDept_02").val().split('>');

	}else if(reqview=="tab"){
		custTelno=$("#tfActCounselText").val(); // 민원인 전화번호
		mainOrgUsrNum=$("#cnslMainAffairMobile").val(); //주관부서 휴대폰
		subOrgUsrNum=$("#cnslSubAffairMobile").val(); //주관부서 휴대폰
		mainDpt=$("#cnslMainUsr").val().split('>');
	 	subDpt=$("#cnslSubUsr").val().split('>');
	}
	
	rltSendCheck=$("input:radio[name='rbResult']:checked").val();
	
	/* 2019.01.09 콜센터에서 이관민원 접수 완료 시 담당 공무원에게는 문자 발송 되도록, 시민에게는 문자 발송 안되도록 함. 
	 * 시민에게도 문자 발송하려면 밑의 주석 해제 할것.
	 * */
 	if((mainDpt[0] && custTelno) && rltSendCheck=="Y"){
 		mainDpt[0] = mainDpt[0].replace("전라남도 ", "");
		sendMsg[sendCount]=prefixMsgToCust+mainDpt[0]+"("+mainOrgUsrTelno+")"+suffixMsgToCust; //민원인 문자
		sendNum[sendCount]=custTelno;
		deptDist[sendCount]="cust";
		deptId[sendCount]=$("#tfCustId").val()==""?"1":$("#tfCustId").val();
		sendSubject[sendCount]="전화상담접수안내[자동]";
		sendCount++;
	}
	
	if(mainOrgUsrNum){
		sendMsg[sendCount]=prefixMsgToUsr; //주관부서 문자
		sendNum[sendCount]=mainOrgUsrNum;
		deptDist[sendCount]="main";
		deptId[sendCount]=$("#mainAffairUsrId").val()==""?"1":$("#mainAffairUsrId").val();
//		sendSubject[sendCount]="이관민원서무접수안내[자동]";
		sendSubject[sendCount]="이관문의접수안내[자동]";
		sendCount++;
	}
	
	if(subOrgUsrNum){
		sendMsg[sendCount]=prefixMsgToUsr; //보조부서 문자
		sendNum[sendCount]=subOrgUsrNum;
		deptDist[sendCount]="sub";
		deptId[sendCount]=$("#subAffairUsrId").val()==""?"1":$("#subAffairUsrId").val();
		sendSubject[sendCount]="이관문의접수안내[자동]";
		sendCount++;
	}
	
	console.log(sendCount+"건 민원인문자:"+custTelno+","+sendMsg[0]+" 주관문자:"+sendNum[1]+" 보조문자:"+sendNum[2]);
	
	for(var i=0; i<sendCount; i++){
		console.log("----- CallMain 왼쪽 상담이력 저장 sendMsg["+i+"]-----");
//		console.log("sendMsg     >> " + sendMsg[i]);
//		console.log("sendNum     >> " + sendNum[i]);
//		console.log("deptDist    >> " + deptDist[i]);
//		console.log("deptId      >> " + deptId[i]);
//		console.log("sendSubject >> " + sendSubject[i]);

		// MMS CONTENTS SEQ
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/main/getMmsSeq.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l","c21zLm5leHR2YWw=", {
				
			}),
			success : function(data){
				var cont_seq = data.SMS_SEQ;
				
				// INSERT MSG_DATA
				$.ajax({
					type : "post",
					dataType: "json",
					async : false,
					url : getContextPath() + "/ajax/main/setRsltAlrmSendNuri.do",
					data : "pJson=" +  getJsonStrRsltAlrmSendSmsNuri(cont_seq, sendNum[i], deptDist[i], deptId[i]),
					success : function(data){
						
						// INSERT MMS_CONTENT
						$.ajax({
							type : "post",
							dataType: "json",
							async : false,
							url : getContextPath() + "/ajax/main/setRsltAlrmSendNuriContent.do",
							data : "pJson=" +  getJsonStrRsltAlrmSendSmsNuriContent(cont_seq, sendSubject[i], sendMsg[i]),
							success : function(data){
								
							},
							error : function(data, status, err) {								
								alert("이관 메세지 발송 오류 : MMS_CONTENT ERROR !!");
							}
						});	// MMS_CONTENT ajax End
						
					},
					error : function(data, status, err) {								
						alert("이관 메세지 발송 오류 : MSG_DATA ERROR !!");
					}
				});	// MSG_DATA ajax End
			
			},error : function(data, status, err) {
				alert("이관 메세지 발송 오류 : MMS_SEQ ERROR !!");
			}
		}); //MMS AJAX 
			
	} //for
}

// 캡쳐명령어 보이기  
function fnCmdToggle(){
	if($("#btnSendCmd").css("display") == "none"){
		$("#btnSendCmd").show();
		$("#btRegCmd").show();
		$("#tfMainExeFileName").show();
	}else{
		$("#btnSendCmd").hide();
		$("#btRegCmd").hide();
		$("#tfMainExeFileName").hide();
	}
}

// 명령어 전송
function fnCmdSend(job){
   var pjob = job=="U"?"U":"";
	var strCmd=$("#tfMainExeFileName").val();
	var cmdSplit = strCmd.split('.');
	 var UpStr=cmdSplit[1].toUpperCase();
	if(strCmd=="" || UpStr != "EXE"){
		alert("실행파일명을 입력해주세요!");
		return;
	}
	fnProcStart(strCmd,pjob);
}

// 명령어 등록
function fnCmdReg(){
	fnCmdSend("U");
}

function fnSetTransferInfo(objInfo)
{
	// 조직정보 구분 
	var agencyCategory = objInfo.CATEGORY;
	// 처리유형
	var actTypeCd = $("#selMainActtypecd").val();
	
	$("#tfMainTransferOrg").val(agencyCategory);

	if (actTypeCd == "030100") { // 민원이관
		if (objInfo.GUBUN == 'M') { // 주관부서
			
			$("#tfOrgDeptUser_01").val(objInfo.USR_ID + "|" + objInfo.DEPT_CD + "|" + objInfo.DEPT_CD + "|" + objInfo.USR_ID + "|" + objInfo.USR_NM+ "|" +objInfo.TEL_NO);
			$("#tfTransfDept_01").val((objInfo.DEPT_NM).replace("순천시청 ", "") + " > " + objInfo.USR_NM);
			$("#mainDeptCd").val(objInfo.DEPT_CD);
			$("#mainTeamCd").val(objInfo.DEPT_CD);
			$("#mainAffairUsrId").val(objInfo.USR_ID);
			$("#mainAffairUsrNm").val(objInfo.USR_NM);
			$("#mainAffairTelNo").val(objInfo.TEL_NO);
			$("#mainAffairMobile").val(objInfo.MOBILE);
			$("#mainAffairYN").val(objInfo.CC_AFFAIRS_YN);
		} else if (objInfo.GUBUN == 'S') { // 보조 부서
			$("#tfOrgDeptUser_02").val(objInfo.USR_ID + "|" + objInfo.DEPT_CD + "|" + objInfo.DEPT_CD + "|" + objInfo.USR_ID + "|" + objInfo.USR_NM+ "|" +objInfo.TEL_NO);
			$("#tfTransfDept_02").val((objInfo.DEPT_NM).replace("순천시청 ", "") + " > " + objInfo.USR_NM);
			$("#subDeptCd").val(objInfo.DEPT_CD);
			$("#subTeamCd").val(objInfo.DEPT_CD);
			$("#subAffairUsrId").val(objInfo.USR_ID);
			$("#subAffairUsrNm").val(objInfo.USR_NM);
			$("#subAffairTelNo").val(objInfo.TEL_NO);
			$("#subAffairMobile").val(objInfo.MOBILE);
		}
	} else if (actTypeCd == "040000") { // 콜백등록
		$("#tfMainCallBackUsr").val(objInfo.USR_NM);
		$("#responsibleUsrId").val(objInfo.USR_ID);
		$("#tfMainTrnrRcvTeamCd").val(objInfo.TEAM_CD);
		$("#tfMainTrnrRcvDeptCd").val(objInfo.DEPT_CD);
	} else if (actTypeCd == "030200" || actTypeCd == "030300" || actTypeCd == "030500") { // 호전환/상담후 호전환/담당자 부재중
		if (agencyCategory == "CC") { // 콜센터
			$("#responsibleUsrId").val(objInfo.USR_ID);
			$("#tfManAccepted").val(objInfo.USR_NM);
			$("#tfMainOrganization").val(objInfo.TEAM_NM);
			$("#tfAcceptedPhoneNum").val(objInfo.TEL_NO);
			$("#tfMainTrnrRcvTeamCd").val(objInfo.TEAM_CD);
			$("#tfMainTrnrRcvDeptCd").val(objInfo.DEPT_CD);
		} else if (agencyCategory == "AA"){ // 행정기관
			$("#responsibleUsrId").val(objInfo.USR_ID);
			$("#tfManAccepted").val(objInfo.USR_NM);
			$("#tfMainOrganization").val(objInfo.TEAM_NM);
			$("#tfAcceptedPhoneNum").val(objInfo.TEL_NO);
			$("#tfMainTrnrRcvTeamCd").val(objInfo.TEAM_CD);
			$("#tfMainTrnrRcvDeptCd").val(objInfo.DEPT_CD);
		} else if (agencyCategory == "EA") { // 외부기관
			//$("#responsibleUsrId").val(objInfo.USR_ID);
			$("#tfMainExtAgencyId").val(objInfo.USR_ID);
			$("#tfManAccepted").val(objInfo.USR_NM);
			$("#tfMainOrganization").val(objInfo.TEAM_NM);
			$("#tfAcceptedPhoneNum").val(objInfo.TEL_NO);
			$("#tfMainTrnrRcvTeamCd").val(objInfo.TEAM_CD);
			$("#tfMainTrnrRcvDeptCd").val(objInfo.DEPT_CD);		
		}
	}
}

/**
 * 동의항목 전체 Check
 */
function fnCheckAll() {
	var value = $("#chkAll").is(':checked');
	if (value == true) {
		$("#chkSMS").prop('checked', true);
		$("#chkPhone").prop('checked', true);
		$("#chkFAX").prop('checked', false);
	} else {
		$("#chkSMS").prop('checked', false);
		$("#chkPhone").prop('checked', false);
		$("#chkFAX").prop('checked', true);
	}
}

function fnCheckBox() {
	var bSMS = $("#chkSMS").is(':checked');
	var bPhone = $("#chkPhone").is(':checked');
	
	//var temp = bSMS + "," + bPhone;
	//alert(temp);
	$("#chkFAX").prop('checked', false);
	
	if ( bSMS == true && bPhone == true) {
		$("#chkAll").prop('checked', true);
	} else {
		$("#chkAll").attr('checked', false);
		if ( bSMS == false && bPhone == false) {
			$("#chkFAX").prop('checked', true);
		}
	}
}

function fnFaxChekBox(){
	var bFax = $("#chkFAX").is(':checked');
	
	if(bFax){
		$("#chkAll,#chkSMS,#chkPhone").prop('checked', false);
		$("#chkFAX").prop('checked', true);
	}else{
		$("#chkAll,#chkSMS,#chkPhone").prop('checked', true);
		$("#chkFAX").prop('checked', false);
	}
}

//감정분석 솔루션
function flag_ck(gAgtId, gCustNum, gCallType){

	//gAgtId = "sysmanager";
	//gCustNum = "01034567890";
	//gCallType = "1"; //"1": 인바운드, "2":아웃바운드
	
	//alert ("http://" + gVocCrmIp + ":" + gVocCrmPort + "/progress/progress_link?agent_id=" + gAgtId + "&indicator_name=Angry&custom_num=" + gCustNum + "&call_type=" + gCallType);
	
	document.getElementById("mers").src = "http://" + gVocCrmIp + ":" + gVocCrmPort + "/progress/progress_link?agent_id=" + gAgtId + "&indicator_name=Angry&custom_num=" + gCustNum + "&call_type=" + gCallType ;
	
	console.log("감정분석 솔루션=========================================================================="); 
	console.log("gAgtId : " + gAgtId); 
	console.log("감정분석 솔루션=========================================================================="); 
 
	//파라메터 로그 저장	
	if (gAgtId != null && gAgtId != "")
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/mers/insertMersLog.do",
			data : "pJson=" + getJsonStrInsertMersLog(gAgtId, gCustNum, gCallType),
			success : function(data)
			{
				console.log("mers log insert");
	
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});	
	}
		
}

//파라미터 셋팅 getJsonStrInsertMersLog
function getJsonStrInsertMersLog(gAgtId, gCustNum, gCallType)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwNDAuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"usr_id" : gAgtId,
			"cust_tel_no" : gCustNum,
			"call_gb_cd" : gCallType
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

//다이 퀘스트 통합검색
function showFindDiquest(){

	var width = 1215;
	var height = 1004;
	var top = 0;
	var left = (screen.width - width) / 2;

	var encText = encodeURI($("#searchTotal").val());
	var paramURL = "http://172.17.100.101:8088/search/search.jsp?query=" + encText;
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no, directories=no, scrollbars=yes, location=no, resizable=no, status=no,menubar=no, top="
		+ top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "통합 검색", option);
	newWindow.focus();
}

//부서 자동완성
function getJsonOrgDeptUser(selectid) 
{
	 
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEub3JnRGVwdFVzZXJBdXRv",
		"map" : {
			"key" : "value", 
			"keyword" : $("#"+selectid).val().replace(/-/g, ''),
//			"cc_affairs_yn" : "Y"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

//직원 조회 자동완성
function getJsonSearchUser(selectid, searchBehind) 
{
	var lastFourDigit="";
	if($("#lastFourDigit").attr("src")=="/resources/images/pop_calldot_2.png"){
		lastFourDigit="lastf";
	}
	 
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuc2VhcmNoVXNlckF1dG8=",
		"map" : {
			"key" : "value", 
			"keyword" : $("#"+selectid).val().replace(/-/g, ''),
			"cc_affairs_yn" : $("#chkAff").is(':checked')==true?"Y":"N",
			"searchBehind" : lastFourDigit=="lastf"?searchBehind:"",
			"detail" : $("#chkAff").is(':checked')==true?"서무":""
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

function modalPhone(){

	// 좌표 새로 설정
	$("#modalLayer").css({
	   "top" : "68px",
	   "left" : "203px"
	});

	if($(".modalContent").css("display") == "none"){
	  	$(".modalContent").show();
	  	$("#popupCollapse").attr("src","/resources/images/sel_dub_arrow2.png");
	}  
	
	$("#modalLayer").fadeIn("slow");
    $("#modalCallNum").focus(); 

    return;
}

// 직원조회정보 초기화
function initAutoEmpoly(){
	//$("#modalCallNum").val(""); //화면 
	$("#hidDBCallNum").val("");   //db 
	$("#hidKeyInput").val(""); //입력 값 
	g_objEmpolyInfo=null;
}

// 악성민원 저장 - 22.02.25
function insertBlockInfo(type){
	// type : 7021 ..
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/main/insertBlockInfo.do",
		data : "pJson=" + getJsonStrInsertBlockInfo(type),
		success : function(data)
		{
			consloe.log("악성민원 저장");
		},
		error : function(data, status, err) 
		{
			alert("악성민원 저장 실패");
		}
	});
}

function getJsonStrInsertBlockInfo(type){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNTEuaW5zZXJ0QmxvY2tJbmZv",
		"map" : {
			"key" : "value", 
			"blockCd" : type,
			"tcktId" : $("#tfMainTicketId").val(),
			"custId" : $("#tfCustId").val(),
			"callNo" : $("#CALLNO").val(),
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

function teleModalCondition(){
  //********************* 전화걸기 모달 ****************************
  var modalLayer = $("#modalLayer");
  var modalLayerheader = $("#modalLayerheader");
  var modalLink = $(".modalLink");
  var modalCont = $(".modalContent");
  var marginLeft = modalCont.outerWidth()/2;
  var marginTop = modalCont.outerHeight()/2;
  //로딩시 숨기기
//  modalLayer.hide();
  
//  $("#imgShorcutCall").click(function(){
//    modalLayer.fadeIn("slow");
//   // modalLayerheader.css({"margin-top" : -marginTop+10, "margin-left" : -marginLeft+10});
//   // modalCont.css({"margin-top" : -marginTop, "margin-left" : -marginLeft});
//    //$(this).blur();
//    $("#modalCallNum").focus(); 
//    return false;
//  });

  	$("#modalCallNum").bind("keydown", function(key) 
	{
	  	var len=$("#modalCallNum").val().length;
			if (key.keyCode == 13 && len > 4){
				$("#btnModalCall").trigger("click");
				return false;
			}
	});
  	
  	// 호전환 전화 끊기 클릭 이벤트
	$("#btnModalHangUp").bind("click", function(e)
	{
		if(g_transFlag)
		{
			fnConsultCancel("");
			g_transFlag = false;
			$("#dialogMainConfirmPopup").dialog("close");
		}
		else
		{
			fnHangup();
		}
	});
	
 	// 호전환 전화기 클릭 이벤트
	$("#btnModalCall").bind("click", function(e)
	{
		var textbox=$("#modalCallNum").val(); //화면 
		var hidDB=areaNumber($("#hidDBCallNum").val());   //db 
		var strKeyIn=areaNumber($("#hidKeyInput").val()); //입력 값 
		var pureNum="";
		
		if(textbox=="" && hidDB=="" && textbox.length<4){
			alert("직원정보 또는 전화번호를 정확하게 입력해 주세요.");
			$("#modalCallNum").focus();
			return;
		}
		 
		console.log("DB:"+hidDB+" , strKeyIn:"+strKeyIn+" , textbox:"+textbox);
		
		if(hidDB==""){
			//일반 아웃바운드
			pureNum=textbox;
		}else if(hidDB!=""){
			// 검색 전화번호 
			pureNum=hidDB;
		}
  
		var sStat=$("#AGENT_STATUS").val();
		
		// 상태를 확인하고 조정후  바로 연결
		if( sStat=="후처리" || sStat=="대기"
		   ||sStat=="준비"||sStat=="휴식"|| sStat == "식사"
		   || sStat=="교육"|| sStat=="기타" || sStat=="3자통화" 
		   || sStat=="협의통화" || sStat=="로그인" || sStat=="업무") 
		{
			$("#AGENT_STATUS").val("업무");
			$("#labMainStatusNm").html("업무");
			window.sessionStorage.setItem("setCustInfo", "true");
			window.sessionStorage.setItem("callType", "makecall"); // 아웃바운드
			makeCall(pureNum);
		}else if(sStat=="보류"||sStat=="통화중"){
			//호전화 셋팅
			if(hidDB!=""){
				g_trnrFlag = true;
				$("#selMainActtypecd").val("030200").trigger("change");
					
				if (g_objEmpolyInfo.CAT == "CC") { // 콜센터
					$("#responsibleUsrId").val(g_objEmpolyInfo.UID_);
					$("#tfManAccepted").val(g_objEmpolyInfo.DISPLAYNAME);
					$("#tfMainOrganization").val(g_objEmpolyInfo.OU);
					$("#tfAcceptedPhoneNum").val(g_objEmpolyInfo.TELEPHONENUMBER);
					$("#tfMainTrnrRcvTeamCd").val(g_objEmpolyInfo.OUCODE);
					$("#tfMainTrnrRcvDeptCd").val(g_objEmpolyInfo.PARENTOUCODE);
				} else if (g_objEmpolyInfo.CAT == "AA"){ // 행정기관
					$("#responsibleUsrId").val(g_objEmpolyInfo.UID_);
					$("#tfManAccepted").val(g_objEmpolyInfo.DISPLAYNAME);
					$("#tfMainOrganization").val(g_objEmpolyInfo.OU);
					$("#tfAcceptedPhoneNum").val(g_objEmpolyInfo.TELEPHONENUMBER);
					$("#tfMainTrnrRcvTeamCd").val(g_objEmpolyInfo.OUCODE);
					$("#tfMainTrnrRcvDeptCd").val(g_objEmpolyInfo.PARENTOUCODE);
				} else if (g_objEmpolyInfo.CAT == "EA") { // 외부기관
					//$("#responsibleUsrId").val(objInfo.USR_ID);
					$("#tfMainExtAgencyId").val(g_objEmpolyInfo.UID_);
					$("#tfManAccepted").val(g_objEmpolyInfo.DISPLAYNAME);
					$("#tfMainOrganization").val(g_objEmpolyInfo.OU);
					$("#tfAcceptedPhoneNum").val(g_objEmpolyInfo.TELEPHONENUMBER);
					$("#tfMainTrnrRcvTeamCd").val(g_objEmpolyInfo.OUCODE);
					$("#tfMainTrnrRcvDeptCd").val(g_objEmpolyInfo.PARENTOUCODE);		
				}
				
				g_trnrFlag = false;
				
			}
			window.sessionStorage.setItem("setCustInfo", "true");
			window.sessionStorage.setItem("callType", "consult"); // 협의콜
			makeCall(pureNum);
		}else{
			alert("전화기 상태를 확인해 주세요.");
			$("#modalCallNum").focus();
			return;
		}
		
	});	 
	
	  $("#popupCollapse").click(function(){
		if($(".modalContent").css("display") == "none"){
			$(".modalContent").show();
			$("#popupCollapse").attr("src","/resources/images/sel_dub_arrow2.png");
			$("#popupCollapse").attr("alt","화살표");
			$("#modalCallNum").val("");
			$("#modalCallNum").focus();
		} else {  
		    $(".modalContent").hide();
		    $("#popupCollapse").attr("src","/resources/images/sel_dub_arrow.png");
		    $("#popupCollapse").attr("alt","화살표");
	    }
	  });
  
  	$("#lastFourDigit").click(function(){
		if($("#lastFourDigit").attr("src") == "/resources/images/pop_calldot_2.png"){
	  		$("#lastFourDigit").attr("src","/resources/images/pop_calldot_3.png");
	  		$("#lastFourDigit").attr("alt","도트");
	    } else {  
	        $("#lastFourDigit").attr("src","/resources/images/pop_calldot_2.png");
	        $("#lastFourDigit").attr("alt","도트");
	    }  
	
  	});

  
  $("#popupClose").click(function(){
    modalLayer.fadeOut("slow");
    modalLink.focus();
  });		

	// 클리어
	$("#modalCallNum").bind("dblclick", function(e)
	{
		$("#modalCallNum").val(""); //화면 
		initAutoEmpoly();
	});

//  $(".modalContent").resizable({
//      maxHeight: 250,
//      maxWidth: 450,
//      minHeight: 30,
//      minWidth: 450
//    });

  	//Make the DIV element draggagle:
	dragElement(document.getElementById(("modalLayer")));
  //*********************** 전화걸기 모달 **************************
	modalLayer.hide();
}


//페이지 초기화
$(document).ready(function()
{
	
	//빠른전화걸기 모달창
	teleModalCondition();
	
	$("#divSlideAlert").hide();
	$("#divSlideAlertMessage").hide();
	
//	var teamQueue;
//	var team_nm=window.sessionStorage.getItem("TEAM_NM");
//	if(team_nm=="영어상담팀"){
//		teamQueue="26673";
//	}else if(team_nm=="일어상담팀"){
//		teamQueue="26674";
//	}else if(team_nm=="중국어상담팀"){
//		teamQueue="26674";
//	}else{
//		teamQueue="";
//	}

//	$("#hidTeamQueue").val(teamQueue);
	$("body").show();
	initEvent();    // 이벤트 등록
	initData();		// 초기 데이터 셋팅
	initGrid();		// 그리드 초기 셋팅
	counselMainGridType('counselList'); //상담 패널 초기화
	
	// 상담관련 탭 공통 초기화
	counselDateTimePicker();
	counselInitInfo("list"); 
	counselButtonEvent();
	
	// 상단 버튼 셋팅
	var arState = new Array( "3", "3", "3", "3", "3", "3", "3", "3", "3", "2");
	OnButtonProc(arBtn, arBtnText, arState);
	
	arState = new Array( "2", "2", "2", "2", "2", "2", "2", "1");
	OnButtonProc(arBtnR, arBtnRText, arState);
	
	//감정분석 솔루션
//	flag_ck("", "", "");

	// 전화걸기버튼 클릭 시 표시될 메뉴 설정
	$("#divPhoneMenu").hide();
	$('#ulPhoneMenu').bind("click", function(e)
	{
		var selVal = $("#" + e.target.id).attr("value");
		if(selVal=="100000"){
			createOutboundPopup("makecall"); // 조직도에서 전화걸기
		}else if(selVal=="200000"){
			modalPhone();  // 빠른 전화 걸기
		}
		
		$("#divPhoneMenu").hide();
	});
	
	// 이석버튼 클릭 시 표시될 메뉴 설정
	$("#divNotReadyMenu").hide();
	$('#ulNotReadyMenu').bind("click", function(e)
	{
		//AgentStatus(parseInt(e.target.value));
		//fnLog("Request [NotReady(" + e.target.value + ")]");
	    fnAgentNotReady(parseInt(e.target.value));
 
	     if(parseInt(e.target.value)==5){
	    	// $("#divRCTabCnsSmsBtn").trigger("click");
	    		var index = $('a[href="#divRCTabSMSList"]').parent('li').index();
	    		rtabs.tabs({
	    			active : index
	    		});
	     } 
		//fnClientProc("NotReady", parseInt(e.target.value), $("#USERID").val(), $("#EXT").val());
		$("#divNotReadyMenu").hide();
	});
	
	// 즐겨찾기버튼 클릭 시 표시될 메뉴 설정
	$("#divFavoritMenu").hide();
	$('#ulFavoritMenu').bind("click", function(e)
	{
		var paramURL = $("#" + e.target.id).attr("value");
		var newWindow = window.open(paramURL, e.target.value, "");
		newWindow.focus();
		
		$("#divFavoritMenu").hide();
	});

	// 최근파일 클릭시 표시될 메뉴 설정
	$("#divRecentMenu").hide();
	$('#ulRecentMenu').bind("click", function(e)
	{
		var wObj=new Object();
		var sObj=new Object();
		var mnu= e.target.id;
		
		var paramURL = $("#" +mnu).attr("value");
		
		sObj= g_OpenPopupObject[paramURL];
		
		wObj=sObj.win_obj;
		
		//if(wObj==null || wObj==undefined){
			openMenuPopup(paramURL);
		//}else{
		//	wObj.focus();
		//}		
		
		$("#divRecentMenu").hide();
	});
	
	
	// 현재 시간 설정
	g_statusStrtTime = new Date();
	g_timer = setInterval(timerFunc, 1000);
	
	// tree 설정
	$.jstree.defaults.core.themes.responsive = true;
	
	// 예약통화일시 datetimepicker 설정
	$("#tfMainRescDtm").datetimepicker({
		lang : "ko",
		format : "Y-m-d H:i",
		allowTimes : [
		              "08:00", "08:10", "08:20", "08:30", "08:40", "08:50",
		              "09:00", "09:10", "09:20", "09:30", "09:40", "09:50",
		              "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
		              "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
		              "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
		              "13:00", "13:10", "13:20", "13:30", "13:40", "13:50",
		              "14:00", "14:10", "14:20", "14:30", "14:40", "14:50",
		              "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
		              "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
		              "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
		              "18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
		              "19:00", "19:10", "19:20", "19:30", "19:40", "19:50"
		              ],
		step : 10
	});
	
	// 메뉴 셋팅
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/getUserMenu.do",
		data : "pJson=" + getJsonStrUserMenu(),
		success : function(data)
		{
			$("#trMainMenu").html("");
			var jr = JSON.parse(data);
			if(jr != '')
			{
				// param값을 JSON으로 파싱
						$("#trMainMenu").jstree({
							"core" : {
								"data" : jr
							}
						}).bind("loaded.jstree", function(event, data) {
							/**
							 * 메뉴 일부 닫기 20170929 LeeKJ
							 * */
							var menuOpen = ["CM","ED","MI","OM","JS"]; //앞 2자리까지
							for(var cnt in menuOpen){
								$(this).jstree("open_node","#"+menuOpen[cnt]+"0000",false,true);
							}
						//$(this).jstree("open_all"); 
				});
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	/*
	// 대기 민원인 숫자 갱신 타이머 등록_로컬에서 작업 시 주석 처리 필요
	refreshWaitingCnt();
	setInterval(refreshWaitingCnt, 1000 * 3);
	*/

	// 하단 숫자 목록 갱신 타이머 등록
//	refreshNotyetCnt();
// var loop = (function looper (i) {
//		setTimeout(function() {	refreshNotyetCnt(); if(i==0) {  i=0; looper(i) }	}, 1000*60  ) })(0);
 

	// 예약통화 여부 체크 2017.09.05
//	checkResvCnsl();
//	setInterval(checkResvCnsl, 1000 * 60);
	
	// VOC 미처리 여부 체크
	//checkVoc();
	//setInterval(checkVoc, 1000 * 60);
	
	// 쪽지읽음 여부 체크  2017.09.05
//	checkMessage();
//	setInterval(checkMessage, 1000 * 30);
 
	// 공지사항 갱신 2017.09.05
//	reloadNoticeBar();
//   loop = (function looper (k) {
//	setTimeout(function() {	reloadNoticeBar(); if(k==0) {  k=0; looper(k) }	}, 1000*60  ) })(0);

	// 처리한도 미완료 상담이력 알림
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getLmtCnslCnt.do",
		data : "pJson=" + getJsonStrLmtCnslCnt(),
		success : function(data)
		{
			if(data != null)
			{
				if(parseInt(data.CNT) > 0)
					alert("오늘까지 완료하셔야 할 상담 건수가 " + data.CNT + " 건 존재합니다.");
			}
		},
		error : function(data, status, err)
		{
			//networkErrorHandler(data, status, err);
		}
	});
	
	// 자동대기 시간 셋팅
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/codespec.do",
		data : "pJson=" + getJsonStrCodeSpec("90305", "010000"),
		success : function(data)
		{
			g_autoReadySec = parseInt(data.EXT1_CD);
		},
		error : function(data, status, err)
		{
			g_autoReadySec = 0;
		}
	});
	
	CallReadyFunc();
	
	// 팝업 다이얼로그 설정
	$("#dialogMainConfirmPopup").dialog({
		autoOpen: false,
		resizable: false,
		position: {my: "left+600 top+100", at: "left+30 top+30", of: document},
		width: 350, 
    	dialogClass:'dialogMainConfirmPopupClass',
		buttons: [
			{
				text: "협의전달",
				click: function()
				{
					//CT_TRANSFERCOMPLET($("#OUTDIAL").val(), $("#CALLNO").val());
					//fnLog("Request [fnTransfer]");
					fnTransfer();
					g_transFlag = false;
					
					$(this).dialog("close");
				}
			},
			{
				text: "3자통화", 
				click: function()
				{
					//fnLog("Request [fnConference]");
					fnConference();
					g_transFlag = false;
					
					$(this).dialog("close");
				}
			},
			{
				text: "협의취소",
				click: function()
				{
					$("#popupMessageConfirmPopup").show();
					$("#labTransferDialog").html("");
					//CT_TRANSFERCANCEL();
					//fnLog("Request [fnTransferCancel]");
					//fnLog("Request [fnConsultCancel]");
					//fnTransferCancel();
					if(g_transFlag){
							if(g_holdFlag== true){
								fnUnHold();
								g_holdFlag = false;
							}
						fnConsultCancel(""); 
					}else{
						fnHangup();
					}
					
					g_transFlag = false;
					
					/*
					// 만약 취소 했다면 0.2초 후 언홀드
					setTimeout(function(){
						CT_UNHOLDCALL($("#EXT").val());
						g_holdFlag = false;
					}, 200);
					*/
					$(this).dialog("close");
				}
			} 
		]
	});
	
	// 일반전화용 인입 팝업 다이얼로그 설정
	$("#dialogMainCallPopupGeneral").dialog({
		autoOpen: false,
	    resizable: false,
	    height: 373,
	    width: 425,
	    modal: true,
	    draggable: true,
	    closeOnEscape: false,
	    open: function(event, ui)
	    {
	    	$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
	    	$("#btnDialogMainCallPopupGeneral").focus();
    	}
	});
	
	// 특수전화용 인입 팝업 다이얼로그 설정
	$("#dialogMainCallPopupCustom").dialog({
		autoOpen: false,
	    resizable: false,
	    height: 340,
	    width: 425,
	    modal: true,
	    draggable: true,
	    closeOnEscape: false,
	    open: function(event, ui)
	    {
	    	$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
	    	$("#btnDialogMainCallPopupCustom").focus();
    	}
	});

	// ARS인증 팝업 다이얼로그 설정
	$("#dialogMainARSAuthPopup").dialog({
		autoOpen: false,
	    resizable: false,
	    height: 150,
	    width: 425,
	    modal: true,
	    draggable: true,
	    closeOnEscape: false,
	    open: function(event, ui)
	    {
	    	$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
	    	$("#dialogMainARSAuthPopup").focus();
    	}
	});
		
	// VOC접수 체크 시
	//$("#btnVoc").bind("click", vocPopup_clickEvent);
	
	if(screen.width < 1900)
		window.document.body.scroll = "auto";
	
//alert("divRCTabSearchBtn");
//	$("#divRCTabSearchBtn").trigger("click");
//	$("#divRCTabMessageBtn").trigger("click");
	// 로딩시 탭 선택
	//$("#divRCTabCnslListBtn").trigger("click");
	 
//	if(window.sessionStorage.getItem("TEAM_CD") != "020100" || window.sessionStorage.getItem("USR_GRD_CD") != "010100")
//		$("#btnVoc").hide();
	
	//감성분석 솔루션 ON,OFF 버튼
	$("#btnMersSwtch").bind("click", function(e)
	{
		if ($("#btnMersSwtch").html() == "ON") 
		{		
			$("#btnMersSwtch").addClass("button_2");	
			$("#btnMersSwtch").html("OFF");
		}else {
			$("#btnMersSwtch").removeClass("button_2");
			$("#btnMersSwtch").html("ON");
		}
	});
	
	//이관부서 클리어
	$("#tfTransfDept_01, #tfTransfDept_02, #tfLgMdSmSearch_01, #tfOrgDeptUser_01, #tfOrgDeptUser_02").bind("dblclick", function(e)
	{
		$(this).val("");
		var selectID=$(this).attr("id");
		//alert(selectID);
		if(selectID=="tfTransfDept_01"){
			$("#mainTeamCd").val("");                                          // 주관부서 팀코드
			$("#mainDeptCd").val("");                                          // 주관부서 코드
			$("#mainAffairUsrId").val("");                                  // 주관부서 서무 사용자ID
			$("#mainAffairUsrNm").val("");                                  // 주관부서 서무 사용자명
			$("#mainAffairTelNo").val("");               // 주관부서 서무 전화번호
			$("#mainAffairMobile").val("");               // 주관부서 서무 휴대폰
			$("#tfOrgDeptUser_01").val("");               // 
        }else if(selectID=="tfTransfDept_02"){
			$("#subTeamCd").val("");                                            // 보조부서 팀코드
			$("#subDeptCd").val("");                                            // 보조부서 코드
			$("#subAffairUsrId").val("");                                    // 보조부서 서부 사용자ID
			$("#subAffairUsrNm").val("");                                    // 보조부서 서무 사용자명
			$("#subAffairTelNo").val("");                  // 보조부서 서무 전화번호   
			$("#subAffairMobile").val("");                  // 보조부서 서무 휴대폰   
			$("#tfOrgDeptUser_02").val("");               // 
        }
	});
	
	
});

function numkeyCheck(e) {
	var keyValue = event.keyCode; 
	if( ((keyValue >= 48) && (keyValue <= 57)) ){ 
		return true; 
	}else{
		return false;
	}
}

function objectOpener(){
	alert(g_arrObj_T[0]); 
}
//화면 넓이에 따라 그리드 넓이 조절
$(window).load(function() {
	//setCategoryCodeListToObject("selMainInstClass","","11000000", "M");
});


// 대중소 찾기
$(function(){
	var selectid;
	var selIdSeq;
    $("#tfLgMdSmSearch_01").autocomplete({
        source : function( request, response ) {
        	selectid=$(this.element).prop("id");
        	arSelId=selectid.split('_');
        	selIdSeq=arSelId[1];
             $.ajax({
                    type: 'post',
                    async : true,
                    url: getContextPath() + "/ajax/main/getCodeList.do",
                    dataType: "json",
                    data : "pJson=" + getJsonCodeList(selectid),
                    success: function(data) {
   	 
                        //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                        response(
                            $.map(data, function(item) {
                            	
                                return { 
                                    label: (item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
                                    value: $("#"+selectid).val(),
                                    hidVal:  (item.LCODE+"|"+item.MCODE+"|"+item.SCODE)
                                };
                            })
                        );
                    }
               });
            },
        //조회를 위한 최소글자수
        minLength: 2,
        select: function( event, ui ) {
        	ui.item.value="";
        	var arItem=new Array(4);
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	//alert(JSON.stringify(ui));
        	arItem=(ui.item.hidVal.toString()).split('|');
        	//alert(arItem[0]+":"+arItem[1]+":"+arItem[2]+":"+arItem[3]);
        	if(selIdSeq=="01"){
        		/*$("#selMainIntvExCd").val(arItem[0]).trigger("change");*/
        		$("#selMainIntvLgCd").val(arItem[0]).trigger("change");
        		$("#selMainIntvMdCd").val(arItem[1]).trigger("change");
        		$("#selMainIntvSmCd").val(arItem[2]);
        	}else if(selIdSeq=="02"){
        		/*$("#intvExCd").val(arItem[0]).trigger("change");*/
        		$("#intvLgCd").val(arItem[0]).trigger("change");
        		$("#intvMdCd").val(arItem[1]).trigger("change");
        		$("#intvSmCd").val(arItem[2]);
        	}
        }
    });
}) 

// 부서 찾기
$(function(){
	var selectid;
	var selIdSeq;
    $("#tfTransfDept_01, #tfTransfDept_02").autocomplete({
        source : function( request, response ) {
        	selectid=$(this.element).prop("id");
        	arSelId=selectid.split('_');
        	selIdSeq=arSelId[1];
        	var thisVal=$(this.element).val();

        	if(thisVal=="01"||thisVal=="016"||thisVal=="011"||thisVal=="010"||thisVal=="061"||thisVal=="749"||thisVal=="0617"||thisVal=="06174"||thisVal=="061749"){
        		return;
        	};
        	
            $.ajax({
                    type: 'post',
                    async : true,
                    url: getContextPath() + "/ajax/main/getOrgDeptUser.do",
                    dataType: "json",
                    data : "pJson=" + getJsonOrgDeptUser(selectid),
                    success: function(data) {
                        //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                        response(
                            $.map(data, function(item) {
                                return { 
                                    label: (item.USERFULLNAME),
                                    value: (item.ORGFULLNAME).replace("순천시청 ", "")+" > "+item.DISPLAYNAME,
                                    hidVal: (item.UID_+"|"+item.OUCODE+"|"+item.PARENTOUCODE+"|"+item.SID+"|"+item.DISPLAYNAME+"|"+item.TELEPHONENUMBER+"|"+item.MOBILE+"|"+item.CC_AFFAIRS_YN)
                                };
                            })
                        );
                    }
               });
            },
        //조회를 위한 최소글자수
        minLength: 2,
        select: function( event, ui ) {
        	var arItem=new Array(8);
        	var detpUser=ui.item.hidVal;
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	arItem=(ui.item.hidVal.toString()).split('|');
        	//alert(arItem[0]+":"+arItem[1]+":"+arItem[2]+":"+arItem[3]+":"+arItem[4]+":"+arItem[5]);
        	$("#tfOrgDeptUser_"+selIdSeq).val(detpUser);
       	
        	if(selIdSeq=="01"){
				$("#mainTeamCd").val(arItem[1]);                                          // 주관부서 팀코드
				$("#mainDeptCd").val(arItem[2]);                                          // 주관부서 코드
				$("#mainAffairUsrId").val(arItem[0]);                                  // 주관부서 서무 사용자ID
				$("#mainAffairUsrNm").val(arItem[4]);                                  // 주관부서 서무 사용자명
				$("#mainAffairTelNo").val(arItem[5]);               // 주관부서 서무 전화번호
				$("#mainAffairMobile").val(arItem[6]);              	 // 주관부서 서무 휴대폰
				$("#mainAffairYN").val(arItem[7]);              	 // 주관부서 서무 여부
        	}else if(selIdSeq=="02"){
				$("#subTeamCd").val(arItem[1]);                                            // 보조부서 팀코드
				$("#subDeptCd").val(arItem[2]);                                            // 보조부서 코드
				$("#subAffairUsrId").val(arItem[0]);                                    // 보조부서 서부 사용자ID
				$("#subAffairUsrNm").val(arItem[4]);                                    // 보조부서 서무 사용자명
				$("#subAffairTelNo").val(arItem[5]);                  // 보조부서 서무 전화번호        	
				$("#subAffairMobile").val(arItem[6]);                  // 보조부서 서무 휴대폰        	
        	}

        },
       close: function () {
             //  alert($(this).attr("id"));
            	//$(this).val('');
       }
    });
}) 



// 직원 찾기
$(function(){
	var rtnObj={};
	var selectid;
	var selIdSeq;
	var thisVal;
	
	var useModalCallNum = false;
	
	// 빠른전화걸기 제어 추가
	if(useModalCallNum){
	    $("#modalCallNum").autocomplete({
	        source : function( request, response ) {
	        	selectid=$(this.element).prop("id");
	        	thisVal=$(this.element).val();
	        	var len=thisVal.length;
	        	var srchBehind="";
	        	if(len==4){
	        		srchBehind=thisVal;
	        	}
	        	switch (thisVal){
		        	case "01" : 
		        	case "016" : 
		        	case "011" : 
		        	case "010" : 
		        	case "061" : 
		        	case "749" : 
		        	case "0617" :
		        	case "06174" :
		        	case "061749" :
		        	{
		        		return;
		        		break;
		        	}
		        	default :
		        		
		        		break;
	        	}
	        	
	        	//alert(selectid);
	             $.ajax({
	                    type: 'post',
	                    async : true,
	                    url: getContextPath() + "/ajax/main/autoCompleteSeachUser.do",
	                    dataType: "json",
	                    data : "pJson=" + getJsonSearchUser(selectid, srchBehind),
	                    success: function(data) {
	                        //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
	                        response(
	                            $.map(data, function(item) {
	                          		rtnObj=item;
	                                return { 
	                                    label: ("("+item.TELEPHONENUMBER+") "+item.USERFULLNAME),
	                                    value: ("("+item.TELEPHONENUMBER+") "+item.USERFULLNAME),
	                                     hidVal: rtnObj
	                                };
	                            })
	                        );
	                        
	                        //검색 결과 없을때
	                        if(!data[0]){
	                        	// 결과였던 폼 초기화
	                        	initAutoEmpoly(); 
	                        }
	                        
	                    }
	               });
	        },
	        //조회를 위한 최소글자수
	        minLength: 3,
	        select: function( event, ui ) {
	   
	        	  g_objEmpolyInfo=ui.item.hidVal;
	        	  console.log("AutoEmpoly:"+JSON.stringify(g_objEmpolyInfo));     	
	
	        	  //실제 아운드 전화번호
	        	  if(g_objEmpolyInfo.TELEPHONENUMBER){
	        		  $("#hidDBCallNum").val(g_objEmpolyInfo.TELEPHONENUMBER);
	        		  $("#hidKeyInput").val(thisVal);
	        	  }else{
	        		  //일반번호 DB에서 검출 안될경우
	        		  $("#hidDBCallNum").val("");
	        		  $("#hidKeyInput").val(thisVal);
	        	  }
	        	  
	        },
	        focus: function(event, ui){ 
	        	return false;
	        },
	        close: function () {
	             //  alert($(this).attr("id"));
	            	//$(this).val('');
	       },
	        error: function(xhr, ajaxOptions, thrownError){ alert(thrownError);  alert(xhr.responseText); }
	
	    });
	}
	// 빠른전화걸기 END
	
	initcontenttab();
}) 


function getHappyCallState(){
	return g_happyCallgb;
}
 
var webFaxLogin = function(goPage, rcv_fax_num){
	
	var usrId = window.sessionStorage.getItem("USR_ID") ;
	var usrNm = window.sessionStorage.getItem("USR_NM") ;
	var deptCd = window.sessionStorage.getItem("TEAM_CD") ;
	var deptNm = window.sessionStorage.getItem("TEAM_NM") ;

	var pop_window;
	if (goPage=="/fax_send_form.php" || goPage=="/fax_send_form_new.php"){  
		var winl = (screen.width - 710) / 2; //  뛰울 창의 폭
		var wint = (screen.height - 745) / 2; //  뛰울 창의 높이
		winprops = "width=710,height=745,top="+wint+",left="+winl+",scrollbars=yes,resizable=no,status=no,toolbar=no,location=no";
	}else{
		var winl = (screen.width - 1250) / 2; //  뛰울 창의 폭
		var wint = (screen.height - 800) / 2; //  뛰울 창의 높이
		winprops = "width=1250,height=800,top="+wint+",left="+winl+",scrollbars=yes,resizable=no,status=no,toolbar=no,location=no";
	}
//	pop_window = window.open("http://172.17.10.33/login_ok.php?goPage="+goPage+"&usrId="+usrId+"&usrNm="+encodeURI(encodeURIComponent(usrNm))+"&deptCd="+deptCd+"&deptNm="+encodeURI(encodeURIComponent(deptNm)) +"&rcv_fax_num="+rcv_fax_num,"opnWebFax",winprops);
	pop_window = window.open("http://172.17.0.19:8080/WebFax/ext/index?uri=rcv&userid="+usrId,"opnWebFax",winprops);
	//pop_window.focus();  
}
 

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



function MainCheckEduSchedule() {
    openMenuPopup('ED0022');
}

function mainCheckMessage(){
    //$("#divRCTabMessageBtn").trigger("click");
	var index = $('a[href="#divRCTabMessage"]').parent('li').index();
	rtabs.tabs({
		active : index
	});
}

function delMessage(e){
  /*	alarm 아에 끄기
   *   document.frames['iframePollData'].alarmScheduler.iterateClose(0);
    document.frames['iframePollData'].alarmScheduler.setAlarmStat(false);*/
    
    document.frames['iframePollData'].sessionStorage.setItem('alarmMessage',false);
    $("#divSlideAlertMessage").hide(1000);
    $("#alarmSwitch input[type='checkbox']").prop("checked",false)
}

function CustAddrSearch(){
//	var paramURL = getContextPath() + "/web/main/jusoPopup.do"; 
//	var newWindow = window.open(paramURL, "zipcode", "width=570,height=420, scrollbars=yes, resizable=yes");
//	newWindow.focus();
	
	var pop = window.open("/web/main/jusoPopupOut.do","pop","width=0,height=0, scrollbars=yes, resizable=yes, menubar=no, status=no, titlebar=no, toolbar=no");
	   pop.blur();
	
}

function jusoCallBack(roadFullAddr,roadAddrPart1){
	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
//	document.form.roadAddrPart1.value = roadAddrPart1;
//	document.form.roadAddrPart2.value = roadAddrPart2;
//	document.form.addrDetail.value = addrDetail;
//	document.form.zipNo.value = zipNo;
	$("#labCustAddr").html(roadFullAddr);
}


