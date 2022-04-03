﻿﻿﻿// 조회 조건 및 조회 값
var g_type = "";
var g_resvDt = "";
var g_call = "";
var g_tell = "";
//콜백등록
var g_callBckTelNum = "";
// 콜백 테이블
var g_callBckNum = "";
var g_callBckAniNum = "";
var g_tryCnt = 0;
var g_almYn = "";
var g_imgCall = '&nbsp;&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="btnDialing_clickEvent('+"'T'"+')" class="icon_cal2" id="btnCallDialing"/>';
var g_imgResvCall = '&nbsp;&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="btnDialing_clickEvent('+"'R'"+')" class="icon_cal2" id="btnResvCallDialing"/>';
var saveActStCd = "";
var saveActTypeCd = "";
var suc = 0;
var startCallbckActStCd = "";
var g_comGridType = "";
var g_outTcktId = "";
var g_TcktId = "";

var rcvnCntNm = "";
var rcvnKtrNm = "";
var rcvnExtNm = "";
var rcvnCallNm = "";
var recUrl = "";
var g_chSndId = "";
var test1 = $("#asd").val("all");

var g_oldMainCont=new Object();
var g_oldSubCont=new Object();
var g_rtnArrCont=new Array();

var g_actStDisable=new Array();
g_actStDisable['010100']=[false,false];  // 콜센터대기     [처리유형,처리유형결과]
g_actStDisable['010200']=[false,true];  // 부서접수      
g_actStDisable['010300']=[true,true];  // 담당자지정     
g_actStDisable['020100']=[true,true];  // 담당자처리중    
g_actStDisable['020200']=[true,true];  // 처리완료      
g_actStDisable['030100']=[false,true];  // 담당자(재)지정요청
g_actStDisable['030200']=[false,true];  // 부서(재)지정요청 
 

var g_agentId = window.sessionStorage.getItem("USR_ID");
var g_popup = "";

var g_changedPassOver=""; // 민원이관 변경여부
var g_dataMainPassOver={};  // 민원이관 데이타 객체
var g_dataSubPassOver={};  // 민원이관 데이타 객체
var g_changedCont=""; // 내용 변경 여부
var g_dataObject={};

//hhs 20.06.10
var cmscsp_checkAddr="";
var cmscsp_popupAddr="";

//부서 자동완성
function getJsonOrgDeptUser_ccs(selectid)
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

//콜백 상태 임시저장
function setJsonStrUpdateCallBackActStCd(){
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y20wMDYuY2FsbGJja0NudFVwZGF0ZQ==",
			"map" : {
				"key" : "value",
				"callbck_act_st_cd": $("#cmscsp_callbckActStCd").val(),
				"callbck_act_rsn": $("#cmscsp_callbckActRsn").val(),
				"callbck_id" : $("#cmscsp_callBckId").val()
			}
		};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
 
}

/**
 * 민원이관 정보저장
 *  cm032.updateTransferInfo
 * @returns
 */
function getJsonStrUpdateCnslMinwonInfo(seoMooInfo) 
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y20wMzIudXBkYXRlVHJhbnNmZXJJbmZv",
			"map" : {
				"key" : "value",
				"tcktId" : $("#cmscsp_tcktId").val(),                                          // Ticket Id
				"rqsGb" : $("input:radio[name='rdoCnslReq']:checked").val(),                         // 요청구분 긴급,7일이내
				"custNm" : $("#cmscsp_tfActCounselText").val(),                                           // 민원인명
				"custTelNo" : $("#cmscsp_tfResvTelNo").val().replace(/-|(\s*)/gi, ""),                // 민원인 전화번호
				"trnrCont" : $("#cmscsp_trnrMinCont").val(),                                    // 이관내용
				"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                            // 센터코드
				"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                            // 팀코드
				"deptCd" : window.sessionStorage.getItem("DEPT_CD"),                            // 부서코드
				"mainTeamCd" : $("#cmscsp_cnslMainTeamCd").val(),                                          // 주관부서 팀코드
				"mainDeptCd" : $("#cmscsp_cnslMainDeptCd").val(),                                          // 주관부서 코드
				"mainAffsUsrId" : $("#cmscsp_cnslMainAffairUsrId").val(),                                  // 주관부서 서무 사용자ID
				"mainAffsUsrNm" : $("#cmscsp_cnslMainAffairUsrNm").val(),                                  // 주관부서 서무 사용자명
				"mainAffsTelNo" : $("#cmscsp_cnslMainAffairTelNo").val().replace(/-/gi, ""),               // 주관부서 서무 전화번호
				"ofceTelNo" : getPhoneNumFormat($("#cmscsp_cnslMainAffairTelNo").val()),               	   // 주관부서 서무 전화번호 하이픈 포함
				"seoMooUsrId" : seoMooInfo == null ? "" : seoMooInfo.AFFAIR_USR_ID,
				"seoMooUsrNm" : seoMooInfo == null ? "" : seoMooInfo.AFFAIR_USR_NM,
				"seoMooTelNo" : seoMooInfo == null ? "" : seoMooInfo.AFFAIR_TEL_NO.replace(/-/gi, ""),
				"subTeamCd" : $("#cmscsp_cnslSubTeamCd").val(),                                            // 보조부서 팀코드
				"subDeptCd" : $("#cmscsp_cnslSubDeptCd").val(),                                            // 보조부서 코드
				"subAffsUsrId" : $("#cmscsp_cnslSubAffairUsrId").val(),                                    // 보조부서 서부 사용자ID
				"subAffsUsrNm" : $("#cmscsp_cnslSubAffairUsrNm").val(),                                    // 보조부서 서무 사용자명
				"subAffsTelNo" : $("#cmscsp_cnslSubAffairTelNo").val().replace(/-/gi, ""),                  // 보조부서 서무 전화번호
				"resultRcv" : $("input:radio[name='rdoCnslResult']:checked").val(),                    // 처리결과
				"actMainProcSt" : $("#cmscsp_cnslMainProcSt").val(),             			// 민원처리상태1 '010100 부서이관'
				"actSubProcSt" : $("#cmscsp_cnslSubProcSt").val(),             			// 민원처리상태2 '010100 부서이관'
				"cnslMainProcCont" : $("#cmscsp_cnslMainProcCont").val(),             			// 처리민원1
				"cnslSubProcCont" : $("#cmscsp_cnslSubProcCont").val(),             			// 처리민원2
				"cnslMainRtnRsn" : $("#cmscsp_tfCnslMainRtnCont").val(),             		// 반송사유1
				"cnslSubRtnRsn" : $("#cmscsp_tfCnslSubRtnCont").val(),           			// 반송사유2
				"mainChange" : g_rtnArrCont[0],					// 이관민원 변경이력체크
				"subChange" : g_rtnArrCont[1]					// 이관민원 변경이력체크
			}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function checkTransferOldandNew(){
	var strTemp="";
	var chkTemp="";
	var rtnMain="";
	var rtnSub="";
	g_changedPassOver="";
	var comma="";
//	console.log(g_oldMainCont);
	
	$.each(g_oldMainCont,	function(key, val){
//			console.log(key + " : "+ val);
			if(g_changedPassOver==""){
				comma="";
			}else{
				comma=",";
			}
	
			strTemp=$("#"+key).val();
			switch(key){
//				case "rdoCnslReq":
//				{
//					strTemp=$("input:radio[name='rdoCnslReq']:checked").val();
//					if(val!=strTemp){
//						rtnMain +="요청구분|";
//					}
//					break;
//				}
//				case "rdoCnslResult":
//				{
//					strTemp=$("input:radio[name='rdoCnslResult']:checked").val();
//					if(val!=strTemp){
//						rtnMain +="결과수신|";
//					}
//					break;
//				}
				case "cmscsp_tfActCounselText":
				{
					if(val!=strTemp){
						g_changedPassOver+=comma+'"TRNR_RCVN_USR_NM":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_tfActCounselText").val() +'"}';
						//rtnMain +="민원인명|";
					}
					break;
				}
				case "cmscsp_tfResvTelNo":
				{
					if(val!=strTemp){
						g_changedPassOver+=comma+'"TRNR_RCVN_TEL_NO":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_tfResvTelNo").val() +'"}';
//						alert(val+":"+strTemp);
						//rtnMain +="민원인연락처|";
					}
					break;
				}
				case "cmscsp_trnrMinCont":
				{
					//이관내용
					if(val!=strTemp){
						g_changedPassOver+=comma+'"TNTR_CONT":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_trnrMinCont").val() +'"}';
						if($("#cmscsp_cnslMainAffairUsrId").val()!=""){
							rtnMain +="cmscsp_trnrMinCont|";
							if(g_oldSubCont["exist"]=="sub"){
								rtnSub +="cmscsp_trnrMinCont|";
							}
						}
					}
					break;
				}
				case "cmscsp_cnslMainProcSt":
				{
					var st_nm=g_dataMainPassOver.CVL_ACT_ST_NM;
					if(!g_dataMainPassOver.CVL_ACT_ST_NM){
						st_nm="";
						//old & new 없슴
						if($("#cmscsp_cnslMainAffairUsrId").val()=="") break;
					}
					//처리상태
					if(val!=strTemp){
						rtnMain +="cmscsp_cnslMainProcSt|";
						g_changedPassOver+=comma+'"CVL_ACT_ST_CD":{"ori":"'+ st_nm +'", "mod":"' + $("#cmscsp_cnslMainProcSt option:selected").text() +'"}';
					}
					break;
				}
				case "cmscsp_cnslMainAffairUsrId":
				{
					var usr_nm=g_dataMainPassOver.AFFS_USR_NM;
					if(!g_dataMainPassOver.AFFS_USR_NM){
						usr_nm="";
						//old & new 없슴
						if($("#cmscsp_cnslMainAffairUsrId").val()=="") break;
					}
					//부서담당자
					if(val!=strTemp){
						rtnMain +="cnslMainAffairUsrId|";
						g_changedPassOver+=comma+'"AFFS_ORG_USR_ID":{"ori":"'+ usr_nm +'", "mod":"' + $("#cmscsp_cnslMainAffairUsrNm").val() +'"}';
					}
					break;
				}
//				case "cnslMainProcCont":
//				{
//					if(val!=strTemp.length){
//						rtnMain +="담당부서처리민원|";
//					}
//					break;
//				}
//				case "tfCnslMainRtnCont":
//				{
//					if(val!=strTemp.length){
//						rtnMain +="담당부서반송사유|";
//					}
//					break;
//				}
			}
		}
	);
	
	$.each(g_oldSubCont,	function(key, val){
		//	console.log(key + " : "+ val);
			
			if(g_changedPassOver==""){
				comma="";
			}else{
				comma=",";
			}
	
		
			strTemp=$("#"+key).val();
			switch(key){
				 
				case "cmscsp_cnslSubProcSt":
				{
					var st_nm=g_dataSubPassOver.CVL_ACT_ST_NM;
					if(!g_dataSubPassOver.CVL_ACT_ST_NM){
						st_nm="";
						//old & new 없슴
						if($("#cmscsp_cnslSubAffairUsrId").val()=="") break;
					}
					
					//복합민원처리상태
					if(val!=strTemp){
						rtnSub +="cnslSubProcSt|";
						//g_changedPassOver+=comma+'"SUB_CVL_ACT_ST_CD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_cnslSubProcSt").val() +'"}';
						g_changedPassOver+=comma+'"SUB_CVL_ACT_ST_CD":{"ori":"'+ st_nm +'", "mod":"' + $("#cmscsp_cnslSubProcSt option:selected").text() +'"}';
					}
					break;
				}
				case "cmscsp_cnslSubAffairUsrId":
				{
					var usr_nm=g_dataSubPassOver.AFFS_USR_NM;
					if(!g_dataSubPassOver.AFFS_USR_NM){
						usr_nm="";
						//old & new 없슴
						if($("#cmscsp_cnslSubAffairUsrId").val()=="") break;
					}
					//복합민원담당자
					if(val!=strTemp){
						rtnSub +="cmscsp_cnslSubAffairUsrId|";
						//g_changedPassOver+=comma+'"SUB_AFFS_ORG_USR_ID":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_cnslSubAffairUsrId").val() +'"}';
						g_changedPassOver+=comma+'"SUB_AFFS_ORG_USR_ID":{"ori":"'+ usr_nm +'", "mod":"' + $("#cmscsp_cnslSubAffairUsrNm").val() +'"}';
					}
					break;
				}
//				case "cnslSubProcCont":
//				{
//					if(val!=strTemp.length){
//						rtnSub +="복합민원처리민원|";
//					}
//					break;
//				}
//				case "tfCnslSubRtnCont":
//				{
//					if(val!=strTemp.length){
//						rtnSub +="복합민원반송사유|";
//					}
//					break;
//				} 
			}
		}
	);
	
	g_rtnArrCont[0]=rtnMain;
	g_rtnArrCont[1]=rtnSub; 
}


function getJsonStrCnslNextWorkingDay(nextRangeDay, deadlineTm){
	var range=nextRangeDay==""?"20":nextRangeDay;  // 영업일 내일부터 ~20일
	var deadline=deadlineTm==""?"175000":deadlineTm; // 175000 : 5시50분
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDQubmV4dFdvcmtpbmdEYXk=",
		"map" : {
			"key" : "value",
			"range" : range,
			"deadline" : deadline,
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_SendSms_NURI
function getJsonStrRsltAlrmSendSmsCnsl(cont_seq, sendNum, distinct, distId){
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
function getJsonStrRsltAlrmSendSmsCnslContent(cont_seq, subject, sendMsg){
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
function minwonCnslAlrmSendSMS(reqview){
 
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
	var prefixMsgToUsr="";
	
	// 서무에게 발신
	if($("#cmscsp_cnslMainAffairYN").val()=="Y"){
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
		custTelno=$("#cmscsp_tfAcceptedPhoneNum").val(); // 민원인 전화번호
		mainOrgUsrNum=$("#cmscsp_mainAffairMobile").val(); //주관부서 휴대폰
		subOrgUsrNum=$("#cmscsp_subAffairMobile").val(); //주관부서 휴대폰
		mainDpt=$("#cmscsp_tfTransfDept_01").val().split('>');
	 	subDpt=$("#cmscsp_tfTransfDept_02").val().split('>');

	}else if(reqview=="tab"){ 
		custTelno=$("#cmscsp_tfResvTelNo").val(); // 민원인 전화번호
		mainOrgUsrNum=$("#cmscsp_cnslMainAffairMobile").val(); //주관부서 휴대폰
		subOrgUsrNum=$("#cmscsp_cnslSubAffairMobile").val(); //주관부서 휴대폰	
		mainOrgUsrTelno=$("#cmscsp_cnslMainAffairTelNo").val().trim().replace(/-/gi, ""); //주관부서 전화번호
		mainOrgUsrTelno=getPhoneNumFormat(mainOrgUsrTelno);
		subOrgUsrTelno=$("#cmscsp_cnslSubAffairTelNo").val().trim().replace(/-/gi, ""); //보조부서 전화번호
		subOrgUsrTelno=getPhoneNumFormat(subOrgUsrTelno);
		
		mainDpt=$("#cmscsp_cnslMainUsr").val().split('>');
	 	subDpt=$("#cmscsp_cnslSubUsr").val().split('>');
	}
	
	rltSendCheck=$("input:radio[name='rdoCnslResult']:checked").val();
	
	/* 2019.01.09 콜센터에서 이관민원 접수 완료 시 담당 공무원에게는 문자 발송 되도록, 시민에게는 문자 발송 안되도록 함. 
	 * 시민에게도 문자 발송하려면 밑의 주석 해제 할것.
	 * */
 	if((mainDpt[0] && custTelno) && rltSendCheck=="Y"){
 		mainDpt[0] = mainDpt[0].replace("전라남도 ", "");
		sendMsg[sendCount]=prefixMsgToCust+mainDpt[0]+"("+mainOrgUsrTelno+")"+suffixMsgToCust; //민원인 문자
		sendNum[sendCount]=custTelno;
		deptDist[sendCount]="cust";
		deptId[sendCount]=$("#cmscsp_custId").val()==""?"1":$("#cmscsp_custId").val();		
		sendSubject[sendCount]="전화상담접수안내[자동]";
		sendCount++;
	}
	
	if(mainOrgUsrNum){
		sendMsg[sendCount]=prefixMsgToUsr; //주관부서 문자
		sendNum[sendCount]=mainOrgUsrNum;
		deptDist[sendCount]="main";
		deptId[sendCount]=$("#cmscsp_cnslMainAffairUsrId").val()==""?"1":$("#cmscsp_cnslMainAffairUsrId").val();		
//		sendSubject[sendCount]="이관민원서무접수안내[자동]";
		sendSubject[sendCount]="이관문의접수안내[자동]";
		sendCount++;
	}
	
	if(subOrgUsrNum){
		sendMsg[sendCount]=prefixMsgToUsr; //보조부서 문자
		sendNum[sendCount]=subOrgUsrNum;
		deptDist[sendCount]="sub";
		deptId[sendCount]=$("#cmscsp_cnslSubAffairUsrId").val()==""?"1":$("#cmscsp_cnslSubAffairUsrId").val();		
//		sendSubject[sendCount]="이관민원서무접수안내[자동]";
		sendSubject[sendCount]="이관문의접수안내[자동]";
		sendCount++;
	}
	
	for(var i=0; i<sendCount; i++){
		console.log("----- comCounselSpec 오른쪽 상담이력 저장 sendMsg["+i+"]-----");
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
					data : "pJson=" +  getJsonStrRsltAlrmSendSmsCnsl(cont_seq, sendNum[i], deptDist[i], deptId[i]),
					success : function(data){
						
						// INSERT MMS_CONTENT
						$.ajax({
							type : "post",
							dataType: "json",
							async : false,
							url : getContextPath() + "/ajax/main/setRsltAlrmSendNuriContent.do",
							data : "pJson=" +  getJsonStrRsltAlrmSendSmsCnslContent(cont_seq, sendSubject[i], sendMsg[i]),
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

function getSeoMooInfoByCnslSpc() {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0U2VvTW9vSW5mbw==",
			"map" : {
				"key" : "value",
				"oucode" : $("#cmscsp_cnslMainTeamCd").val()
			}
	};
	
	return encodeURIComponent(JSON.stringify(loParam)); 
}

function fnSaveCnslMinwonInfo(e)
{
	var seoMooInfo; // 이관민원을 일반공무원에게 직접 이관할시 해당 공무원 부서의 서무 정보
	if ($("#cmscsp_cnslMainProcSt").val() == "010300") {
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + '/ajax/counsel/getSeoMooInfoByCnslSpc.do',
			data : "pJson=" + getSeoMooInfoByCnslSpc(),
			success : function(data) {
				seoMooInfo = data;
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	};
	
	//var jsonParam = getJsonStrUpdateCnslMinwonInfo(seoMooInfo);
	
	var old_ActTypeCd= $("#cmscsp_actTypeCd").val();
	var old_ActStCd= $("#cmscsp_actStCd").val();
	
	// 2021.10.01 insert 충돌 분리
	
	// merge cm032
	$.ajax({
		type : 'post',
		datatype : 'json',
		async : true,
		url : getContextPath() + '/ajax/counsel/cmscsp_step1.do',
		data : "pJson=" + cmscsp_step1(),
		success : function(data)
		{
			if($("#cmscsp_cnslMainAffairUsrId").val() != ""){ // 이관부서1
				
				// merge cd033
				$.ajax({
					type : 'post',
					datatype : 'json',
					async : true,
					url : getContextPath() + '/ajax/counsel/cmscsp_step2Main.do',
					data : "pJson=" + cmscsp_step2Main(seoMooInfo),
					success : function(data)
					{
						if(g_rtnArrCont[0] != ""){
							// insert ch034 
							$.ajax({
								type : 'post',
								datatype : 'json',
								async : true,
								url : getContextPath() + '/ajax/counsel/cmscsp_step3.do',
								data : "pJson=" + cmscsp_step3(true),
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
			
			if($("#cmscsp_cnslSubAffairUsrId").val() != ""){ // 이관부서2
				
				// merge cd033
				$.ajax({
					type : 'post',
					datatype : 'json',
					async : true,
					url : getContextPath() + '/ajax/counsel/cmscsp_step2Sub.do',
					data : "pJson=" + cmscsp_step2Sub(),
					success : function(data)
					{
						if(g_rtnArrCont[1] != ""){
							// insert ch034 
							$.ajax({
								type : 'post',
								datatype : 'json',
								async : true,
								url : getContextPath() + '/ajax/counsel/cmscsp_step3.do',
								data : "pJson=" + cmscsp_step3(false),
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
			
			//기존 상태가 같으면 문자발송 패스
			if(saveActTypeCd==old_ActTypeCd && saveActStCd==old_ActStCd){
				console.log("minwonCnslAlrmSendSMS Abort!");
			}else{
				 //상담결과  010000:미완료,  030400:완료 => 완료시에 민원이관 관련 문자발송
				if(old_ActStCd=="030400"){
					minwonCnslAlrmSendSMS("tab"); //이관민원접수 문자 알림 여기1
				}
			}
			
			counselSpecUpdate();
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
}


// Step1. MERGE CM032 
function cmscsp_step1(){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMzIubWVyZ2VUcmFuc2ZlckluZm8=", // cm032.mergeTransferInfo
		"map" : {
			"key" : "value",
			"tcktId" : $("#cmscsp_tcktId").val(),                                          	// Ticket Id
			"rqsGb" : $("input:radio[name='rdoCnslReq']:checked").val(),                    // 요청구분 긴급,7일이내
			"custNm" : $("#cmscsp_tfActCounselText").val(),                                 // 민원인명
			"custTelNo" : $("#cmscsp_tfResvTelNo").val().replace(/-|(\s*)/gi, ""),          // 민원인 전화번호
			"resultRcv" : $("input:radio[name='rdoCnslResult']:checked").val(),             // 처리결과
			"trnrCont" : $("#cmscsp_trnrMinCont").val(),                                    // 이관내용
			"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                            // 센터코드
			"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                            // 팀코드
			"deptCd" : window.sessionStorage.getItem("DEPT_CD"),                            // 부서코드
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// Step2. MERGE CD003_Main
function cmscsp_step2Main(seoMooInfo){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMzIubWVyZ2VUcmFuc2Zlck1haW5EZXB0SW5mbw==", //cm032.mergeTransferMainDeptInfo
		"map" : {
			"key" : "value",
			"tcktId" : $("#cmscsp_tcktId").val(),
			"mainTeamCd" : $("#cmscsp_cnslMainTeamCd").val(),                                          // 주관부서 팀코드
			"mainAffsUsrId" : $("#cmscsp_cnslMainAffairUsrId").val(),                                  // 주관부서 서무 사용자ID
			"mainAffsUsrNm" : $("#cmscsp_cnslMainAffairUsrNm").val(),                                  // 주관부서 서무 사용자명
			"mainAffsTelNo" : $("#cmscsp_cnslMainAffairTelNo").val().replace(/-/gi, ""),
			"seoMooUsrId" : seoMooInfo == null ? "" : seoMooInfo.AFFAIR_USR_ID,
			"seoMooUsrNm" : seoMooInfo == null ? "" : seoMooInfo.AFFAIR_USR_NM,
			"seoMooTelNo" : seoMooInfo == null ? "" : seoMooInfo.AFFAIR_TEL_NO.replace(/-/gi, ""),
			"actMainProcSt" : $("#cmscsp_cnslMainProcSt").val(),             							// 민원처리상태1 '010100 부서이관'
			"cnslMainProcCont" : $("#cmscsp_cnslMainProcCont").val(),             						// 처리민원1
			"cnslMainRtnRsn" : $("#cmscsp_tfCnslMainRtnCont").val(),             						// 반송사유1	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// Step2. MERGE CD003_Sub
function cmscsp_step2Sub(){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMzIubWVyZ2VUcmFuc2ZlclN1YkRlcHRJbmZv", //cm032.mergeTransferSubDeptInfo
		"map" : {
			"key" : "value",
			"tcktId" : $("#cmscsp_tcktId").val(),
			"subTeamCd" : $("#cmscsp_cnslSubTeamCd").val(),                             // 보조부서 팀코드
			"subAffsUsrId" : $("#cmscsp_cnslSubAffairUsrId").val(),                     // 보조부서 서부 사용자ID
			"subAffsUsrNm" : $("#cmscsp_cnslSubAffairUsrNm").val(),                     // 보조부서 서무 사용자명
			"subAffsTelNo" : $("#cmscsp_cnslSubAffairTelNo").val().replace(/-/gi, ""),  // 보조부서 서무 전화번호
			"actSubProcSt" : $("#cmscsp_cnslSubProcSt").val(),             				// 민원처리상태2 '010100 부서이관'	
			"cnslSubProcCont" : $("#cmscsp_cnslSubProcCont").val(),             		// 처리민원2
			"cnslSubRtnRsn" : $("#cmscsp_tfCnslSubRtnCont").val(),           			// 반송사유2	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// Step3. INSERT CH034
function cmscsp_step3(isMain){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y20wMzIuaW5zZXJ0VHJhbnNmZXJJbmZvSGlz", //cm032.insertTransferInfoHis
		"map" : {
			"key" : "value",
			"tcktId" 		: $("#cmscsp_tcktId").val(),
			"ord" 	 		: isMain == true ? 1 : 2,
			"actProcSt" 	: isMain == true ? $("#cmscsp_cnslMainProcSt").val() : $("#cmscsp_cnslSubProcSt").val(), 		// 민원처리상태
			"affsUsrId" 	: isMain == true ? $("#cmscsp_cnslMainAffairUsrId").val() : $("#cmscsp_cnslSubAffairUsrId").val(),	// 서무 사용자ID
			"affsUsrNm" 	: isMain == true ? $("#cmscsp_cnslMainAffairUsrNm").val() : $("#cmscsp_cnslSubAffairUsrNm").val(),	// 서무 사용자명
			"trnrCont"  	: $("#cmscsp_trnrMinCont").val(),         						// 이관내용
			"cnslProcCont"  : isMain == true ? $("#cmscsp_cnslMainProcCont").val() : $("#cmscsp_cnslSubProcCont").val(),       // 처리민원2
			"cnslRtnRsn" 	: isMain == true ? $("#cmscsp_tfCnslMainRtnCont").val() : $("#cmscsp_tfCnslSubRtnCont").val(),	// 반송사유
		}
	};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

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

/**
 * 민원정보
 * 
 * @param tcktId
 * @returns
 */
function getJsonStrMinwonSpec(tcktId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMzIuc2VsZWN0VHJhbnNmZXJJbmZvTGlzdA==",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustInfo
function getJsonStrCustInfoTab(custId)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm8=",
		"map" : {
			"key" : "value",
			"cust_id" : custId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UserInfo
function getJsonStrComUserInfo(usr_id)
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

function getJsonStrUpdateActStCd()
{
	var loParam = {};

	if($("#cmscsp_callbckActStCd").val() == "030000")
	{
		loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y20wMDYudXBkYXRlQWN0U3RDZA==",
			"map" : {
				"key" : "value",
				"callbckId" : $("#cmscsp_callBckId").val(),
				"callbckActStCd" : $("#cmscsp_callbckActStCd").val(),
				"compflag" : "true"
			}
		};
	}
	else
	{
		loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y20wMDYudXBkYXRlQWN0U3RDZA==",
			"map" : {
				"key" : "value",
				"callbckId" : $("#cmscsp_callBckId").val(),
				"callbckActStCd" : $("#cmscsp_callbckActStCd").val()
			}
		};
	}
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateCounsel
function getJsonStrUpdateCounsel()
{
	var actType = $("#cmscsp_actTypeCd option:selected").val();
	var resvTelNo = "";
	var trnrTelNo = "";
	var refId = "";
	
	if (actType == '040000') {  // 콜백등록
		resvTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/-/gi, "") : "";
	} else if (actType == '020000') { // 통화예약
		resvTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/-/gi, "") : "";
	} else if (actType == "030200" || actType == "030300" || actType == "030500") {
		trnrTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/-/gi, "") : "";
	}
	if(g_changedCont=="{}"){
		g_changedCont="";
	}
	
	var starate="4";
	if(fnvalidate($("[name='cmscsp_star_rating']").val())){
		starate=$("[name='cmscsp_star_rating']").val();
	}else{
		starate="4";
	}
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMDEuY291bnNlbFVwZGF0ZQ==",
		"map" : {
			"key" : "value",
			"rcvCont" : $("#cmscsp_rcvCont").val(),																			  // 문의내용
			"callGbCd" : $("#cmscsp_callGbCd").val(),																		  // 콜구분(인바운드/아웃아운드)
			"actStCd" : $("#cmscsp_actStCd").val(),                                                                           // 상담결과(완료/미완료)
			"refId" : $("#cmscsp_refId").val(),                                                                           				 		  // 참조ID
			"actTypeCd" :actType,                                                                         				 	  // 처리유형
			"actCont" : $("#cmscsp_actCont").val(),                                                                            // 응답내용
			"starate" : starate,
			"intvLgCd" : $("#cmscsp_intvLgCd").val() == null ? "all" : $("#cmscsp_intvLgCd").val(),                                                                         // 상담유형 - 대
			"intvMdCd" : $("#cmscsp_intvMdCd").val() == null ? "all" : $("#cmscsp_intvMdCd").val(),                                                                                // 상담유형 - 중
			"intvSmCd" : $("#cmscsp_intvSmCd").val() == null ? "all" : $("#cmscsp_intvSmCd").val(),                                  // 상담유형 - 소
			"clrmant" : $("#cmscsp_tfCnslClaimant").val(),
			"clrmant_telno" : $("#cmscsp_tfCnslClaimantPhoneNum").val().replace(/[-,\s]/g,""),
			"custId" : $("#cmscsp_custId").val(),                                                                                  // 민원인ID
			"holdCount" : "",
			"callbackId" : $("#cmscsp_callBckId").val(),                                                                         // callbakId
			"tcktId" : $("#cmscsp_tcktId").val(),                                                                            // 상담이력  Ticket ID
			"isChanged" : g_changedCont,
			
			/*
			"callbackId" : $("#cmscsp_callBckId").val(),
			"tcktId" : $("#cmscsp_tcktId").val(),                                                                                    // Ticket Id
			"custId" : $("#cmscsp_custId").val(),                                                                                    // 고객ID
			"custNm" : $("#cmscsp_custNm").html(),                                                                                   // 고객명
			"refId" : $("#cmscsp_refId").val(),                                                                                      // 참조ID
			"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                                                              // 센터코드
			"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                                                              // 팀코드
			"deptId" : window.sessionStorage.getItem("DEPT_CD"),                                                              // 부서코드
			"actTypeCd" : actType,                                                                              // 처리유형
			"rcvCont" : $("#cmscsp_rcvCont").val(),                                                                                  // 문의내용
			"callGbCd" : $("#cmscsp_callGbCd").val(),                                                                                // 콜구분(인바운드/아웃바운드)
			"actStCd" : $("#cmscsp_actStCd").val(),                                                                                  // 상담결과(완료/미완료)
			"actCont" : $("#cmscsp_actCont").val(),                                                                                  // 답변내용
			"starate" : starate,
			//"intvExCd" : $("#cmscsp_intvExCd").val(),                                                                                // 상담유형 - 대
			"intvLgCd" : $("#cmscsp_intvLgCd").val() == null ? "all" : $("#cmscsp_intvLgCd").val(),                                                                                // 상담유형 - 대
			"intvMdCd" : $("#cmscsp_intvMdCd").val() == null ? "all" : $("#cmscsp_intvMdCd").val(),                                                                                // 상담유형 - 중
			"intvSmCd" : $("#cmscsp_intvSmCd").val() == null ? "all" : $("#cmscsp_intvSmCd").val(),                                  // 상담유형 - 소
			"oldActTypeCd" : $("#cmscsp_oldActTypeCd").val(),                                                                        // 이전 처리유형
			"resvDt" : $("#cmscsp_tfResvDtm").val() != "" ? changeDateString(getResvDate($("#cmscsp_tfResvDtm").val())) : "",               // 얘약일
			"resvTm" : $("#cmscsp_tfResvDtm").val() != "" ? changeTimeString(getResvDate($("#cmscsp_tfResvDtm").val())) : "",     // 예약시간
			"clrmant" : $("#cmscsp_tfCnslClaimant").val(),
			"clrmant_telno" : $("#cmscsp_tfCnslClaimantPhoneNum").val().replace(/[-,\s]/g,""),
			"trnrCenterCd" : "",
			"trnrTarget" : $("#cmscsp_transferOrg").val(),
			"trnrTeamCd" :$("#cmscsp_trnrTeamCd").val(),                                                                             // 이관 / 호전환 대상 팀
			"trnrTeamNm" : $("#cmscsp_tfRcvnTeamNm").val(),                                                                          // 이관 / 호전환 대상 팀명
			"trnrDeptId" : $("#cmscsp_trnrDeptCd").val(),                                                                            // 이관 / 호전환 대상 부서
			"trnrUsrId" : $("#cmscsp_rcvnUserId").val(),                                                                             // 이관 / 호전환 대상 사용자 ID
			"trnrUsrNm" : $("#cmscsp_tfActCounselText").val(),                                                                       // 이관 / 호전환 대상 사용자명
			"extAgnId" : $("#cmscsp_extAgencyId").val(),                                                                             // 외부기관 ID
			"trnrTelNo" : trnrTelNo,
			"resvTelNo" : resvTelNo,
			"stay_drtn" : $("#cmscsp_stayDuration").val(),                                                                            // 체류기간
			"keyWord" : $("#cmscsp_selCnslKeyWord").val(),                                                                            // 체류기간
			"holdCount" : "",
			"isChanged" : g_changedCont
			*/
		}
	};	
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 변경사항 체크
function inputCompare()
{
	
	var actType = $("#cmscsp_actTypeCd").val();
	var resvTelNo = "";
	var trnrTelNo = "";
	var cbackTelNo = ""; 
	
	if (actType == '040000') {  // 콜백등록
		cbackTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/[-,\s]/g,"") : "";
	} else if (actType == '020000') { // 통화예약
		resvTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/[-,\s]/g,"") : "";
	} else if (actType == "030200" || actType == "030300" || actType == "030500") {
		trnrTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/[-,\s]/g,"") : "";
	}
	
	var strTemp="";
	g_changedCont=g_changedPassOver; //이관민원 카피
	var comma="";
	
 	$.each(g_dataObject, function(key, val) 
	{
		//console.log(key+", "+val);
		
		if(g_changedCont==""){
			comma="";
		}else{
			comma=",";
		}
		switch(key){
			case "CUST_ID":
				//고객ID
				//strTemp =$("#cmscsp_custId").val()==""?"":$("#cmscsp_custId").val();
				if(val!=$("#cmscsp_custId").val()){
					g_changedCont+=comma+'"CUST_ID":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_custId").val() +'"}';					
				}
				break; 
			case "CUST_NM":
				//고객명
				if(val!=$("#cmscsp_custNm").html()){
					g_changedCont+=comma+'"CUST_NM":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_custNm").html() +'"}';
				}
				break;
  			case "CST_TYPE_NM":
				//민원인구분
				if(val!=$("#cmscsp_cstType").html()){
					//alert("'"+val+"':'"+$("#cmscsp_cstType").html()+"'");
					g_changedCont+=comma+'"CST_TYPE_NM":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_cstType").html() +'"}';
				}
				break; 
 			case "CST_COMP_NM":
				//민원인성향
 				strTemp=val;
 				 if(g_dataObject.CST_COMP_NM2!="" && g_dataObject.CST_COMP_NM2!=undefined){
 					 strTemp += " &gt; "+g_dataObject.CST_COMP_NM2;
 				 }
				if(strTemp!=$("#cmscsp_cstComp").html()){
					g_changedCont+=comma+'"CST_COMP_NM":{"ori":"'+ strTemp +'", "mod":"' + $("#cmscsp_cstComp").html() +'"}';
				}
				break;					
			case "ACT_ST_NM":
				//처리결과
				if(val!=$("#cmscsp_actStCd option:selected").text()){
					g_changedCont+=comma+'"ACT_ST_CD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_actStCd option:selected").text() +'"}';
				}
				break;
			case "ACT_TYPE_NM":
				//처리유형
				if(val!=$("#cmscsp_actTypeCd option:selected").text()){ 
					g_changedCont+=comma+'"ACT_TYPE_CD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_actTypeCd option:selected").text() +'"}';
				}
				break;
			case "CALL_GB_NM":
				//민원구분
				if(val!=$("#cmscsp_callGbCd option:selected").text()){
					g_changedCont+=comma+'"CALL_GB_CD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_callGbCd option:selected").text() +'"}';
				}
				break;
			case "KEYWORDNM":
				//키워드
				if(val!=$("#cmscsp_selCnslKeyWord option:selected").text()){
					g_changedCont+=comma+'"KEYWORDCD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_selCnslKeyWord option:selected").text() +'"}';
				}
				break;
 			/*case "INTV_EX_NM":
				//기관코드
				if(val!=$("#cmscsp_intvExCd option:selected").text()){
					g_changedCont+=comma+'"INTV_EX_CD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_intvExCd option:selected").text() +'"}';
				}
				break;*/
 			case "INTV_LG_NM":
				//대분류
				if(val!=$("#cmscsp_intvLgCd option:selected").text()){
					g_changedCont+=comma+'"INTV_LG_CD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_intvLgCd option:selected").text()+'"}';
				}
				break;	
 			case "INTV_MD_NM":
				//중분류
				if(val!=$("#cmscsp_intvMdCd option:selected").text()){
					g_changedCont+=comma+'"INTV_MD_CD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_intvMdCd option:selected").text() +'"}';
				}
				break;	
 			case "INTV_SM_NM":
				//소분류
				if(val!=$("#cmscsp_intvSmCd option:selected").text()){
					g_changedCont+=comma+'"INTV_SM_CD":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_intvSmCd option:selected").text() +'"}';
				}
				break;	
			case "RCV_CONT":
				//문의내용
				if(val!=$("#cmscsp_rcvCont").val()){
					g_changedCont+=comma+'"RCV_CONT":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_rcvCont").val() +'"}';
				}
				break;			
 			case "ACT_CONT":
				//답변내용
				if(val!=$("#cmscsp_actCont").val()){
					g_changedCont+=comma+'"ACT_CONT":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_actCont").val() +'"}';
				}
				break;
 			case "MEMO":
				//메모
				if(val!=$("#cmscsp_tfCounselMemo").val()){
					g_changedCont+=comma+'"MEMO":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_tfCounselMemo").val() +'"}';
				}
				break; 
 			case "TRNR_RCVN_TEL_NO":
				//호전환 번호 
				if(val.trim().replace(/[-,\s]/g,"")!=trnrTelNo){
					g_changedCont+=comma+'"TRNR_RCVN_TEL_NO":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_tfResvTelNo").val() +'"}';
				}
				break;
 			case "RESV_CNTCT_INFM_FORMAT":
				//재통화번호 
				if(val.trim().replace(/[-,\s]/g,"")!=resvTelNo){
					g_changedCont+=comma+'"RESV_CNTCT_INFM_FORMAT":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_tfResvTelNo").val() +'"}';
				}
				break;
 			case "CALLBCK_TEL_NO_FORMAT":
				//콜백번호 
				if(val.trim().replace(/[-,\s]/g,"")!=cbackTelNo){
					g_changedCont+=comma+'"CALLBCK_TEL_NO_FORMAT":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_tfResvTelNo").val() +'"}';
				}
				break;				
  			case "RPT":
				//긴급정보 신고인
				if(val.trim()!=$("#cmscsp_tfCnslClaimant").val().trim()){
					g_changedCont+=comma+'"RPT":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_tfCnslClaimant").val() +'"}';
				}
				break;
  			case "RPT_CNTCT_INFM":
				//긴급정보 전화번호
  				strTemp=$("#cmscsp_tfCnslClaimantPhoneNum").val().trim().replace(/[-,\s]/g,"");
				if(val.trim().replace(/[-,\s]/g,"")!=$("#cmscsp_tfCnslClaimantPhoneNum").val().trim()){
					g_changedCont+=comma+'"RPT_CNTCT_INFM":{"ori":"'+ val +'", "mod":"' + $("#cmscsp_tfCnslClaimantPhoneNum").val() +'"}';
				}
				break;
		}
		
	});

// 	if(g_changedCont==""){
//		comma="";
//	}else{
//		comma=",";
//	}
// 	//이관민원 변경이력체크
// 	if(g_rtnArrCont[0]!="" && g_rtnArrCont[0]!=undefined){
// 		g_changedCont+=comma+'"TURNED_OVER":{"ori":"blank", "mod":"' + g_rtnArrCont[0] +'"}';
// 	}
// 	if(g_changedCont==""){
//		comma="";
//	}else{
//		comma=",";
//	}
// 	if( g_rtnArrCont[1]!="" && g_rtnArrCont[1]!=undefined){
// 		g_changedCont+=comma+'"TURNED_OVER":{"ori":"blank", "mod":"' + g_rtnArrCont[1] +'"}';
// 	}
 	
 	//민원이관 덧붙이기
 	g_changedCont='{'+g_changedCont;
 	g_changedCont+='}';

}


//파라미터 셋팅_resvExctYnUpdate
function getJsonStrUpdateResvExctYn()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDUucmVzdkV4Y3RZblVwZGF0ZQ==",
		"map" : {
			"key" : "value",
			"tcktId" : $("#cmscsp_tcktId").val(),
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateProgram
function getJsonStrDeleteCounsel()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMDEuY291bnNlbERlbGV0ZQ==",
		"map" : {
			"key" : "value",
			"tcktId" : $("#cmscsp_tcktId").val(),
			"actTypeCd" : $("#cmscsp_oldActTypeCd").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UserMenu
function getJsonStrSetSelectBox(codeType, parentType, parentCode)
{
	var loParam;
	
	if(parentType != "" && parentCode != "")
	{
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuY29kZWxpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : codeType,
				"parnt_tp_cd" : parentType,
				"parnt_cd" : parentCode
			}
		};
	}
	else
	{
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuY29kZWxpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : codeType
			}
		};
	}
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrResvUpdateListPopup(tcktId)
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

//파라미터 셋팅_actStUpdate
function getJsonStrActStUpdatePopup(tcktId, outTcktId)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMDEuYWN0VHlwZVVwZGF0ZQ==",
		"map" : {
			"key" : "value",
			"tcktId" : tcktId,
			"outTcktId" : outTcktId,
			"actStCd" : $("#cmscsp_actStCd").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrCallBackSpec(callbckId)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "Y20wMDYuY2FsbEJhY2tTcGVj",
			"map" : {
				"key" : "value",
				"callbckId" : callbckId,
			}
		};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrTrnrRcvnUsrNm(id, actTypeCd)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "Y20wMDYuY2FsbEJhY2tTcGVj",
			"map" : {
				"key" : "value",
				"id" : id,
				"actTypeCd" : actTypeCd
			}
		};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateCounsel
/*
function getJsonStrUpdateTryCnt(type, cd, tcktId, callbckId)
{
	if(callbckId == "")
		callbckId = $("#cmscsp_callBckId").val();
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDYudXBkYXRlVHJ5SW5mbw==",
		"map" : {
			"key" : "value",
			"callbckActStCd" : cd,
			"callbckId" : callbckId,
			"outTcktId" : tcktId,
			"tryCnt" :  Number(g_tryCnt) + 1,
			"type" : type
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
*/

function getJsonStrGetCounselInfo(tkct_id)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuZ2V0Q291bnNlbEluZm8=",
			"map" : {
				"key" : "value",
				"tckt_id" : tkct_id,
			}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrGetFileInfo(tkct_id, srvy_type_cd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "ch001",
			"tbl_pk" : tkct_id,
			"tbl_pk2" : srvy_type_cd,
			"orderby" : "crtTime"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function setSelectBoxWithCodeSync(code1, code2, code3){
	g_popup=$("#cmscsp_POPUP").val();
	if(g_popup=="CHILD"){
		setObjectSelectBoxWithCode2("cmscsp_intvLgCd", "선택", "1", g_popup, "00000000", code1, "");	// 상담유형 기관 셋팅
	}else{
		$("#cmscsp_intvLgCd").val(code1).trigger("change");
	}
    $("#cmscsp_intvMdCd").val(code2).trigger("change");
    $("#cmscsp_intvSmCd").val(code3);
}
 

function callbackInitInfo()
{
	$("#cmscsp_callbckReq").html("");
	$("#cmscsp_callbckDiv").html("");
	$("#cmscsp_rctTry").html("");
	$("#cmscsp_callbckActStCd").find("option:first").attr("selected", "selected");
	$("#cmscsp_callbckCustNm").html("");
	$("#cmscsp_callbckActRsn").val("");
	$("#cmscsp_callbckTelNo").html("");
	$("#cmscsp_callbckAni").html("");
	$("#cmscsp_textAutoRecl").html("");
	
	$("#cmscsp_counselComTable").css("display", "none");
}

function counselInitInfo(type,popuptype)
{	
	$("#cmscsp_selMainAddrDetail").html(""); //hhs 20.06.11 상세 주소 초기화
	
	g_type = type;
	recUrl = "";
	
	var argLen=arguments.length;
	if(argLen==2){
		 g_popup=popuptype;
	}
	 
	$("#cmscsp_cnslCopyCnslRcvCont").hide();	//com 문의내용 카피
	$("#cmscsp_cnslCopyTransferCont").hide();	// 
	 
	$("#cmscsp_btnSmsSpec").hide();
	$("#cmscsp_btnSmsSend").hide();
	$("#cmscsp_btnListenRec").hide();
	$("#cmscsp_callbckBase").hide();
	$("#cmscsp_btnOutBoundCall").hide();
	$("#cmscsp_btnDelete").hide();
	$("#cmscsp_btnUpdate").hide();
	//$("#cmscsp_btnJisikDbPopup").hide();
	$("#cmscsp_btnCnslHistoryPopup").hide();

	$("#cmscsp_btnMainHis").hide();  // 이관이력1
	$("#cmscsp_btnSubHis").hide();  // 이관이력2

	setObjSelectBoxWithActTypeCd("cmscsp_actTypeCd", "", "", g_popup,"90014",""); // 처리유형
	
	setObjSelectBoxWithCode("cmscsp_chGbCd", "", "",g_popup,"90009", "");	    // 채널구분 셋팅      
	setObjSelectBoxWithCode("cmscsp_callGbCd", "", "",g_popup,"90010", "");	    // 민원구분 셋팅	    
	setObjSelectBoxWithCode("cmscsp_actStCd", "", "",g_popup,"90013", "");	    // 처리상태 셋팅		
	setObjSelectBoxWithCode("cmscsp_rcvnId", "", "",g_popup,"90200", "");	    // 상담유형 대분류 셋팅	
	
	//setObjSelectBoxWithActTypeCd("cnslMainProcSt", "", "", g_popup,"90300",""); // 이관처리상태
	//setObjSelectBoxWithActTypeCd("cnslSubProcSt", "", "", g_popup,"90300",""); // 이관처리상태
	setObjSelectBoxWithCode("cmscsp_cnslMainProcSt", "", "",g_popup,"90300", "");	    // 이관처리상태
	setObjSelectBoxWithCode("cmscsp_cnslSubProcSt", "", "",g_popup,"90300", "");	    // 이관처리상태
	
	setObjSelectBoxWithCode("cmscsp_selCnslKeyWord", "", "",g_popup,"90025", "0");	// 키워드
	
	setObjSelectBoxWithCode("cmscsp_selMainAddrCd", "전체", "",g_popup,"98002", "");	// 주소검색 selectBox 추가 hhs 20.06.10
	
	//setObjSelectBoxWithCode("intvLgCd", "", "",g_popup,"90025", "0");
	// $("#cmscsp_instExCd option:eq(0)").attr("selected", "selected");
	$("#cmscsp_intvLgCd option:eq(0)").attr("selected", "selected");
	$("#cmscsp_intvMdCd option:eq(0)").attr("selected", "selected");
	$("#cmscsp_intvSmCd option:eq(0)").attr("selected", "selected");
	$("#cmscsp_counselText").html("");
	$("#cmscsp_rcvnId").find("option:first").attr("selected", "selected");
	
	$("#cmscsp_resvDt").hide();
	$("#cmscsp_rcvnUsr").hide();
	$("#cmscsp_rcvnId").hide();
	$("#cmscsp_resvTelText").html("");
	$("#cmscsp_tfResvTelNo").hide();
	$("#cmscsp_tfRcvnUsr").hide();
	$("#cmscsp_tfResvDtm").hide();
	$("#cmscsp_armText").html("");
	$("#cmscsp_armUseYn").html("");
	
	$("#cmscsp_imgMainResvPhone").hide();
	
	$("#cmscsp_cstComp").html("");
	$("#cmscsp_tcktId").val("");
	$("#cmscsp_custId").val("");
	$("#cmscsp_rcvUsrNm").html("");
	$("#cmscsp_rcvDt").html("");
	$("#cmscsp_tempTd").html("");
	$("#cmscsp_tempData").html("");
	$("#cmscsp_modUsrNm").html("");	
	$("#cmscsp_modDt").html("");
	$("#cmscsp_rcvCont").val("");
	$("#cmscsp_custNm").html("");
	$("#cmscsp_corpNm").html("");
	$("#cmscsp_cstType").html("");
	$("#cmscsp_cstComp").html("");
	$("#cmscsp_cntctInfm").html("");
	$("#cmscsp_actCont").val("");

	$("#cmscsp_gndr").html("");
	$("#cmscsp_agesCd").html("");
	$("#cmscsp_locYn").html("");
	$("#cmscsp_stayDuration").val("");
	
	$("#cmscsp_callBackRetryCnt").val("");	                                    // 콜백시도
	//호전환
	
	//긴급정보
	$("#cmscsp_tfCnslClaimant").hide();
	$("#cmscsp_tfCnslClaimantPhoneNum").hide();
	$("#cmscsp_tfCnslClaimant").val("");
	$("#cmscsp_tfCnslClaimantPhoneNum").val("");
	
	$("#cmscsp_cntctInform").html(""); // 통화번호
	$("#cmscsp_callTime").html("");    // 통화시간
	$("#cmscsp_tfCounselMemo").val("");    // 메모
	$("#cmscsp_crtUsrNm").html("");    // 등록/일시
	$("#cmscsp_chnlgb").html("");      // 채널구분
	
	$("#cmscsp_cnslCsVltn").val("1");
	$("#cmscsp_tryDt").hide();
	$("#cmscsp_lbCnslSpecTicketNum").html("");
	$("#cmscsp_tfRcvnTeamNm").hide();
	$("#cmscsp_tfActCounselText").hide();
	
	// 담당자 초기화
	$("#cmscsp_comSurveyResponsibleList").html("");
	$("#cmscsp_comSurveyFileList").html("");
	
	$("#cmscsp_comBusinessResponsibleList").html("");
	$("#cmscsp_comBusinessFileList").html("");
	
	// 민원관련 항목
	$("#cmscsp_minwonInfo1").hide();
	$("#cmscsp_minwonInfo2").hide();
	$("#cmscsp_minwonProcDeptInfo").hide();
	$("#cmscsp_minwonProcCont").hide();
	$("#cmscsp_minwonRtnCont").hide();
	$("#cmscsp_TrMinwonProcStatus").hide();
	$("#cmscsp_rdoCnslImmediate").hide();
	$("#cmscsp_rdoCnslSevenDays").hide();
	$("#cmscsp_labRdoCnslImmediateText").hide();
	$("#cmscsp_labRdoCnslSevenDaysText").hide();
	$("#cmscsp_rdoCnslYes").hide();
	$("#cmscsp_rdoCnslNo").hide();
	$("#cmscsp_labRdoYesText").hide();
	$("#cmscsp_labRdoNoText").hide();
	
	$("#cmscsp_btnTransfCont").hide();
	$("#cmscsp_trnrMinCont").hide();
}

//저장 및 수정 예외 처리
function checkUserSpec(queryType)
{
	var rMsg = "";	
	var modCallbckActStCd = "";
	if(g_listType != "callBack")
	{
		if($("#cmscsp_tcktId").val() == "")
		{
			rMsg = "선택되지 않았습니다.";
			return rMsg;
		}
	}
	else
	{
		if($("#cmscsp_callBckId").val() == "")
		{
			rMsg = "선택되지 않았습니다.";
			return rMsg;
		}
	}

	if(queryType != "delete")
	{
		if(g_listType != "callBack")
			modCallbckActStCd = "N";
		else
		{
			if(startCallbckActStCd != $("#cmscsp_callbckActStCd").val())
				modCallbckActStCd = "Y";
			else if(g_outTcktId != "")
				modCallbckActStCd = "";
			else
				modCallbckActStCd = "Y";
		}
		if(modCallbckActStCd != 'Y')
		{
			if($("#cmscsp_rcvCont").val() == "")
				rMsg += "\n\n문의내용을 입력 해 주세요.";
		}
	}
	return rMsg;
}

// 청취 버튼 클릭 이벤트
function btnListenRec_clickEvent()
{
	var pCallId=$("#cmscsp_hidCallId").val();
	
	if(pCallId == "" || pCallId == undefined){
		return;
	}
	
	listenRecPopup("","","",pCallId);	
	
}

//문자 버튼 클릭 이벤트
function btnSmsSpec_clickEvent()
{
	window.sessionStorage.setItem("smsSpecChSndId", g_chSndId);
	
	var width = 1200;
	var height = 400;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/smsSendSpec.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "SMSSPEC", option);
	newWindow.focus();
}

function getJsonStrUsrAffairsYN(usrId) {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0Y2NBZmZhaXJzWW4=",
			"map" : {
				"key" : "value",
				"uId" : usrId
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function setActStat(selId, selVal){
	
	var cnslActType=$("#cmscsp_actTypeCd option:selected").val(); // 처리유형
	var cnslProcSt=$("#cmscsp_cnslMainProcSt").val(); // 콜센터 대기 010100 
	var deptMainCd=$("#cmscsp_tfCnslMainDepartment").val(); // 주관부서코드
	var deptSubCd=$("#cmscsp_tfCnslSubDepartment").val(); // 보조부서코드
	var ccAffairs;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/main/comCounselSpec.do",
		data : "pJson=" + getJsonStrUsrAffairsYN($("#cmscsp_cnslMainAffairUsrId").val()),
		success : function(data){
			 	ccAffairs = data.CC_AFFAIRS_YN;
		},
		error : function(data, status, err) {								
			networkErrorHandler(data, status, err);
		}
	});

	//이관민원만 
	if (cnslActType!="030100") return;
	
	if (selId=="cmscsp_actStCd") { 
		if (selVal=="030400") { // 030400 완료인 경우
			if (deptMainCd=="") { // 주관부서 코드가 없으면
				$("#cmscsp_actStCd").val("010000"); //미완료로 변경
				$("#cmscsp_cnslMainProcSt").val("010100"); //콜센터대기로 변경
			} else { // 주관부서 코드가 있고
				if (ccAffairs == "Y") { // 이관부서 대상자가 서무면
					$("#cmscsp_cnslMainProcSt").val("010200"); //처리상태  (콜센터대기-> 부서접수로 변경)
					$("#cmscsp_cnslMainProcSt option[value=010300]").prop("disabled", true);
					$("#cmscsp_cnslMainProcSt option[value=020100]").prop("disabled", true);
					$("#cmscsp_cnslMainProcSt option[value=020200]").prop("disabled", true);
					$("#cmscsp_cnslMainProcSt option[value=030100]").prop("disabled", true);
					$("#cmscsp_cnslMainProcSt option[value=030200]").prop("disabled", true);
				} else if (ccAffairs != "Y") { // 이관부서 대상자가 서무가 아니면
					$("#cmscsp_cnslMainProcSt").val("010300"); //처리상태  (콜센터대기-> 담당자지정으로 변경)
					$("#cmscsp_cnslMainProcSt option[value=010200]").prop("disabled", true);
					$("#cmscsp_cnslMainProcSt option[value=020100]").prop("disabled", true);
					$("#cmscsp_cnslMainProcSt option[value=020200]").prop("disabled", true);
					$("#cmscsp_cnslMainProcSt option[value=030100]").prop("disabled", true);
					$("#cmscsp_cnslMainProcSt option[value=030200]").prop("disabled", true);
				};
			};
			 
			if (deptSubCd!="") {
				$("#cmscsp_cnslSubProcSt").val("010200"); //처리상태 (콜센터대기-> 부서접수로 변경)
			};
		} else if (selVal=="010000") { // 010000 미완료인 경우
			$("#cmscsp_cnslMainProcSt").val("010100"); //처리상태  (부서접수-> 콜센터대기로 변경)
			if (deptSubCd!="") {
				$("#cmscsp_cnslSubProcSt").val("010100"); //처리상태 (부서접수-> 콜센터대기로 변경)
			};
		};
	} else if (selId=="cmscsp_cnslMainProcSt" || selId=="cmscsp_cnslSubProcSt") {
		if (selVal=="010100") { 
			$("#cmscsp_actStCd").val("010000");
		} else {
			if (deptMainCd=="") {
				$("#cmscsp_actStCd").val("010000"); //미완료로변경
				$("#cmscsp_cnslMainProcSt").val("010100"); //콜센터대기로 변경
			} else {
				$("#cmscsp_actStCd").val("030400");
			};
		};
	};
}

// 상담유형 체크
function selCnslLMScdCheck(){
//  jjcc 체크안함.
//	var selExcd = $("#cmscsp_intvExCd").val();
//	var selLgcd = $("#cmscsp_intvLgCd").val()==""?"all":$("#cmscsp_intvLgCd").val();
//	var selMdcd = $("#cmscsp_intvMdCd").val()==""?"all":$("#cmscsp_intvMdCd").val();
//	var selSmcd = $("#cmscsp_intvSmCd").val()==""?"all":$("#cmscsp_intvSmCd").val();
//	
//	// 특이민원은 대분류까지
//	if(selExcd=="70000000" && selLgcd!="all"){
//		return true;
//	}
//		 
//	if (selLgcd=="all" || selMdcd == 'all' || selSmcd == 'all') { 
//		alert('상담유형을 선택하시기 바랍니다.');
//		selLgcd=="all"?$("#cmscsp_intvLgCd").focus():(selMdcd=="all"?$("#cmscsp_intvMdCd").focus():$("#cmscsp_intvSmCd").focus()); 
//		return false;
//	}
	
	return true;
}


/**
 * 상담저장시 필수 입력 항목 check
 * 
 * @returns {Boolean}
 */
function isValidateCheck() 
{
	var rcvContent = $("#cmscsp_rcvCont").val().trim();
	var bValid = true;
	
	var currActTypeCd = $("#cmscsp_actTypeCd option:selected").val();
    var selCnslLgCd = $("#cmscsp_intvLgCd").val();
    
	var custNm = $("#cmscsp_custNm").html();
	
	if(selCnslLMScdCheck() == false)
	{
		return false;
	}
	if(custNm==""){
		alert("민원인정보가 존재하지 않습니다. 수정후 저장 하세요.");
		bValid =  false;
	}else if (currActTypeCd == '060000' || currActTypeCd == null) {
		alert('처리유형을 변경하여야 합니다.');
		bValid =  false;
	} else if (currActTypeCd == '020000') { // 통화예약
		if ($("tfResvDtm").val() == '') { 		// 얘약일시 입력여부 check
			alert('예약일시를 입력하시기 바랍니다.');
			bValid = false;
		} else if ($("#cmscsp_tfResvTelNo").val() == '') {   // 예약전화번호 입력여부 Check 
			alert('얘약전화번호를 입력하시기 바랍니다.');
			bValid = false;
		}
//	} else if ($("#cmscsp_intvMdCd").val() == 'all' || $("#cmscsp_intvSmCd").val() == 'all') {
//		alert('상담유형을 선택하셔야 합니다.');
//		bValid = false;
	} else if ( rcvContent == '' || rcvContent == '강제저장') {
		alert('문의내용을 입력하시기 바랍니다.');
		$("#cmscsp_rcvCont").focus();
		bValid = false;
	} else if ( $("#cmscsp_actCont").val().trim() == "") {
		alert('답변내용을 입력하시기 바랍니다.');
		$("#cmscsp_actCont").focus();
		bValid = false;
	}
	
	//직접상담
	if(currActTypeCd=="010000"){ 
		// 긴급정보시 신고인 정보
		if(selCnslLgCd=="90000000"){
			if($("#cmscsp_tfCnslClaimant").val().trim() == "")
			{
				alert("신고인명을 입력 하셔야 합니다.");
				$("#cmscsp_tfCnslClaimant").focus(); 
				return false;
			}
			
			if($("#cmscsp_tfCnslClaimantPhoneNum").val().trim() == "")
			{
				alert("신고인 전화번호를 입력 하셔야 합니다.");
				$("#cmscsp_tfCnslClaimantPhoneNum").focus(); 
				return false;
			}	
		}
		 
	}else if(currActTypeCd=="020000"){ //재통화
		
		// 재통화
		if($("#cmscsp_tfResvDtm").val().trim() == "")
		{
			alert("재통화일시를 입력 하셔야 합니다.");
			$("#cmscsp_tfResvDtm").focus(); 
			return false;
		}
		
		if($("#cmscsp_tfResvTelNo").val().trim() == "")
		{
			alert("재통화 전화번호를 입력 하셔야 합니다.");
			$("#cmscsp_tfResvTelNo").focus(); 
			return false;
		}
		 
		 
	}else if(currActTypeCd=="030200" || currActTypeCd=="030300" || currActTypeCd=="030500"){ //호전환 , 상담후 호전화, 담당자 부재중
		
		// 호전환
//		if($("#cmscsp_tfRcvnTeamNm").val().trim() == "")
//		{
//			alert("담당부서를 입력 하셔야 합니다.");
//			$("#cmscsp_tfRcvnTeamNm").focus(); 
//			return false;
//		}
		
		if($("#cmscsp_tfResvTelNo").val().trim() == "")
		{
			alert("호전환 전화번호를 입력 하셔야 합니다.");
			$("#cmscsp_tfResvTelNo").focus(); 
			return false;
		}
		
//		if($("#cmscsp_tfActCounselText").val().trim() == "")
//		{
//			alert("호전환담당자를 입력 하셔야 합니다.");
//			$("#cmscsp_tfActCounselText").focus(); 
//			return false;
//		}
		 
		 
	}else if(currActTypeCd == '030100'){ //민원이관
		var chkText1=$("#cmscsp_cnslMainProcDtm").html();
		var chkText2=$("#cmscsp_cnslSubProcDtm").html();
		var chkInput1=$("#cmscsp_tfCnslMainDepartment").val();
		var chkInput2=$("#cmscsp_tfCnslSubDepartment").val();
		var chkStat1=$("#cmscsp_cnslMainProcSt").val(); //처리상태
		var chkStat2=$("#cmscsp_cnslSubProcSt").val();//처리상태
		var actStcd=$("#cmscsp_actStCd").val();
		
		if($("#cmscsp_tfResvTelNo").val()==""){
			alert("민원인 연락처를 입력해 주세요!");
			$("#cmscsp_tfResvTelNo").focus();
			return false;
		}
		
		if($("#cmscsp_tfActCounselText").val()==""){
			alert("민원인명을 입력해 주세요!");
			$("#cmscsp_tfActCounselText").focus();
			return false;
		}		

		
		if($("#cmscsp_trnrMinCont").val()==""){
			alert("이관내용을 입력해 주세요!");
			$("#cmscsp_trnrMinCont").focus();
			return false;
		}
		
		// 완료 030400
		if(actStcd=="030400"){
			if(chkInput1==""){
				alert("이관민원을 완료 하려면 담당부서를 입력하여야 합니다.");
				 $("#cmscsp_cnslMainUsr").focus();
				return false;
			}
			 
		}
		 
	}
	
	return bValid;
}

//수정 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	var actTypeCd=$("#cmscsp_actTypeCd").val();
	
	if($("#cmscsp_actStCd").val() =="030400"){
		if($("#cmscsp_intvLgCd").val()=="all"){
			alert("대분류를 선택하여 주세요.");
			$("#cmscsp_intvLgCd").focus();
			return false;
		}else if($("#cmscsp_intvMdCd").val()=="all"){
			alert("중분류를 선택하여 주세요.");
			$("#cmscsp_intvMdCd").focus();
			return false;
		}else if($("#cmscsp_intvSmCd").val()=="all"){
			alert("소분류를 선택하여 주세요.");
			$("#cmscsp_intvSmCd").focus();
			return false;
		}
		
		
//		if($("#cmscsp_selMainAddrCd").val() == "all" || $("#cmscsp_selMainAddrCd").val() == ""){
//			alert("행정동 주소를 선택하여 주세요.");
//			return false;
//		}
	}
	
	var rMsg = checkUserSpec("update");
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	/******* 콜백 업데이트 임시 ***********/
    var callbckcn= $("#cmscsp_callBackRetryCnt").val();
	if(callbckcn){
		//콜백처리 시도 2회면 완료전환
		var callbackRetryCount=parseInt(callbckcn);
		if(callbackRetryCount>1 && $("#cmscsp_callbckActStCd").val()=="030000"){
			callbackStatusUpdate(); //콜백 업데이트
			 return true;
		}else if(callbackRetryCount<2 && $("#cmscsp_callbckActStCd").val()=="030000" && $("#cmscsp_callbckActRsn").val().trim()==""){
			alert("2회이상 시도후 완료처리가 가능합니다.\r\n 처리완료는 메모에 사유를 입력해주세요.");
			return false;
		}else{
			callbackStatusUpdate(); //콜백 업데이트
			return true;
		}
		
	}
	
	if (isValidateCheck()) 
	{	
		if(saveActTypeCd == '020000')
		{
			if(saveActStCd != $("#cmscsp_actStCd").val() && $("#cmscsp_actStCd").val() == '030000')
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/main/resvUpdateList.do",
					data : "pJson=" + getJsonStrResvUpdateListPopup($("#cmscsp_tcktId").val()),
					success : function(data)
					{
						$.each(data, function(key, state)
						{
							if(state.OUT_TCKT_ID == null) 
							{
								resvCallStateUpdatePopup(state.TCKT_ID, "");
							} 
							else 
							{
								resvCallStateUpdatePopup(state.TCKT_ID, state.OUT_TCKT_ID);
							}
							if(g_type == "list") 
							{
								counselInitInfo(g_type);
							}
							comCounselMainReloadGridType();
						});
						if(suc != 0)
						{
							suc = 0;
							counselUpdate();
						}
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
			else
			{
				counselUpdate();
			}
		}
		else if(saveActTypeCd=='030100' || actTypeCd=='030100')
		{
			var iContLength = fn_strlen($("#cmscsp_trnrMinCont").val());
			if(iContLength > 3900){
				alert("이관내용의 길이가 너무 깁니다. (" + iContLength + " / " + 4000 + ")\r\n이관내용을  간략하게 정리해 주세요.");
				return false;
			}

			checkTransferOldandNew();
			
			console.log("minwon history: "+ g_rtnArrCont[0]+" : "+g_rtnArrCont[1]);
			
			//이관민원
			fnSaveCnslMinwonInfo();
		}
		else 
		{
			counselUpdate();
		}
	}
	
	// hhs 20.06.10 주소저장UPDATE
	cmscsp_popupAddr = $("#cmscsp_selMainAddrCd").val();
	if(cmscsp_popupAddr != "all" && cmscsp_checkAddr != cmscsp_popupAddr){
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/updateAddrInfo.do",
			data : "pJson=" + getJsonStrcmscspUpdateAddrInfo(),
			success : function(data)
			{
				console.log("=== COUNSEL : UPDATE CH010");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	
	refreshNotyetCnt(); //hhs 20.04.16 상담이력 저장시 iframe refresh
	
}

function getJsonStrcmscspUpdateAddrInfo(){
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMTAuYWRkclVwZGF0ZQ==",
			"map" : {
				"key" : "value",
				"tckt_id" : $("#cmscsp_tcktId").val(), 	//티켓ID
				"checkAddr" : $("#cmscsp_selMainAddrCd").val(),	//음성인식 결과
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateCounsel
function getJsonStrUpdateTryCnt(type, cd, tcktId, callbckId)
{
	if(callbckId == "")
		callbckId = $("#cmscsp_callBckId").val();
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMDYudXBkYXRlVHJ5SW5mbw==",
		"map" : {
			"key" : "value",
			"callbckActStCd" : cd,
			"callbckId" : callbckId,
			"outTcktId" : tcktId,
			"tryCnt" :  Number(g_tryCnt) + 1,
			"type" : type
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function callbackStatusUpdate(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateCallBackActStCd.do",
		data : "pJson=" + setJsonStrUpdateCallBackActStCd(),
		success : function(data)
		{
			alert("저장되었습니다");
			
			btnSearch_clickEvent();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function updateActStCd(type)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/updateActStCd.do",
		data : "pJson=" + getJsonStrUpdateActStCd(),
		success : function(data)
		{
			if(type == "Y")
			{
				comCounselMainReloadGridType();
				alert("저장되었습니다.");
			}
			else
				counselSpecUpdate();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function counselSpecUpdate()
{
		inputCompare();	
		
		if(g_changedCont=="{}"){
			g_changedCont="";
		}
		
		var oldActType = $("#cmscsp_oldActTypeCd").val();
		var actType = $("#cmscsp_actTypeCd option:selected").val();
		
//		//alert(g_changedCont);
//		console.log(g_changedCont);
//		var jObj=JSON.parse(g_changedCont);
//		$.each(jObj, function(key, val) 
//		{
//			console.log(key);
//			$.each(val, function(key, sVal) {
//				console.log(key+":"+sVal);
//			});
//			 
//		});
//		// 연속으로 저장시 변경이력 누적저장되어 버튼 숨기고 다시 선택후 재저장 
//		$("#cmscsp_btnUpdate").hide();
//		return;
 	
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/counselUpdate.do",
			data : "pJson=" + getJsonStrUpdateCounsel(),
			success : function(data)
			{	
				if(g_changedCont == ""){  //수정사항X
					if(actType != "010000" && actType != "030100" && actType != "030400" && actType != "070000" && actType != "010100"){ //여기1
						$.ajax({
							type : "post",
							dataType: "json",
							async : true,
							url : getContextPath() + "/ajax/counsel/counselUpdate.do",
							data : "pJson=" + getJsonStrUpdateCounselFisrt(),
							success : function(data)
							{
								saveCounselComplete();
							},
							error : function(data, status, err) 
							{
								networkErrorHandler(data, status, err);
							}
						});
					}
					else if(actType != "030100" && oldActType == "030100" && actType != "010100"){ //여기2
						$.ajax({
							type : "post",
							dataType: "json",
							async : true,
							url : getContextPath() + "/ajax/counsel/counselUpdate.do",
							data : "pJson=" + getJsonStrUpdateCounselFisrt(),
							success : function(data)
							{
								
								//이관민원 hhs 20.06.03
								$.ajax({
									type : "post",
									dataType: "json",
									async : true,
									url : getContextPath() + "/ajax/counsel/counselUpdate.do",
									data : "pJson=" + counselUpdateVoc(),
									success : function(data)
									{
										$.ajax({
											type : "post",
											dataType: "json",
											async : true,
											url : getContextPath() + "/ajax/counsel/counselUpdate.do",
											data : "pJson=" + counselInsertVoc(),
											success : function(data)
											{
												saveCounselComplete();
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
								
							},
							error : function(data, status, err) 
							{
								networkErrorHandler(data, status, err);
							}
						});
					}else{ //여기3
						saveCounselComplete();
					}
					
				}else{ //수정사항 있을때
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/counsel/counselUpdate.do",
						data : "pJson=" + getJsonStrUpdateCounselChange(),
						success : function(data)
						{
							if(actType != "010000" && actType != "030100" && actType != "030400" && actType != "070000" && actType != "010100"){
							$.ajax({
								type : "post",
								dataType: "json",
								async : true,
								url : getContextPath() + "/ajax/counsel/counselUpdate.do",
								data : "pJson=" + getJsonStrUpdateCounselFisrt(),
								success : function(data)
								{
									saveCounselComplete();
								},
								error : function(data, status, err) 
								{
									networkErrorHandler(data, status, err);
								}
							});
							}else if(actType != "030100" && oldActType == "030100" && actType != "010100"){
								$.ajax({
									type : "post",
									dataType: "json",
									async : true,
									url : getContextPath() + "/ajax/counsel/counselUpdate.do",
									data : "pJson=" + getJsonStrUpdateCounselFisrt(),
									success : function(data)
									{
											$.ajax({
												type : "post",
												dataType: "json",
												async : true,
												url : getContextPath() + "/ajax/counsel/counselUpdate.do",
												data : "pJson=" + counselUpdateVoc(),
												success : function(data)
												{
													$.ajax({
														type : "post",
														dataType: "json",
														async : true,
														url : getContextPath() + "/ajax/counsel/counselUpdate.do",
														data : "pJson=" + counselInsertVoc(),
														success : function(data)
														{
															saveCounselComplete();
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
									},
									error : function(data, status, err) 
									{
										networkErrorHandler(data, status, err);
									}
								});
							}else{
								saveCounselComplete();
							}
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

function saveCounselComplete(){
	if(g_type == "list") 
	{
		counselInitInfo(g_type);
	}
	
	comCounselMainReloadGridType();
		
	alert("저장되었습니다.");
		
	if(document.title == "상담이력"){
		opener.parent.refreshNotyetCnt();
		opener.parent.reloadGrid();
	} else if(document.title == "콜백이력"){
		opener.parent.refreshNotyetCnt();
		opener.parent.reloadGrid();	   			
	} else {
   	refreshNotyetCnt();
		reloadGrid();
	}
}

function counselUpdateVoc(){
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMDEuY291bnNlbFVwZGF0ZVZvYw==",	//ch001.counselUpdateVoc -- update cd033
			"map" : {
				"key" : "value",
				"tcktId" : $("#cmscsp_tcktId").val(),                                                                            // 상담이력  Ticket ID
				}
	};	
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function counselInsertVoc(){
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "Y2gwMDEuY291bnNlbEluc2VydFZvYw==",	//ch001.counselInsertVoc -- insert ch004
			"map" : {
				"key" : "value",
				"tcktId" : $("#cmscsp_tcktId").val(),                                                                            // 상담이력  Ticket ID
				}
	};	
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
	
}

function getJsonStrUpdateCounselFisrt(){
	var actType = $("#cmscsp_actTypeCd option:selected").val();
	var resvTelNo = "";
	var trnrTelNo = "";
	var refId = "";
	
	if (actType == '040000') {  // 콜백등록
		resvTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/-/gi, "") : "";
	} else if (actType == '020000') { // 통화예약
		resvTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/-/gi, "") : "";
	} else if (actType == "030200" || actType == "030300" || actType == "030500") {
		trnrTelNo = $("#cmscsp_tfResvTelNo").val().trim() != "" ? $("#cmscsp_tfResvTelNo").val().trim().replace(/-/gi, "") : "";
	}
	if(g_changedCont=="{}"){
		g_changedCont="";
	}
	
	var starate="4";
	if(fnvalidate($("[name='cmscsp_star_rating']").val())){
		starate=$("[name='cmscsp_star_rating']").val();
	}else{
		starate="4";
	}
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y2gwMDEuY291bnNlbFVwZGF0ZUZpcnN0",
		"map" : {
			"key" : "value",
			"resvDt" : $("#cmscsp_tfResvDtm").val() != "" ? changeDateString(getResvDate($("#cmscsp_tfResvDtm").val())) : "",   // 얘약일
			"resvTm" : $("#cmscsp_tfResvDtm").val() != "" ? changeTimeString(getResvDate($("#cmscsp_tfResvDtm").val())) : "",  	// 예약시간
			"custNm" : $("#cmscsp_custNm").html(),                                                                              // 고객명
			"oldActTypeCd" : $("#cmscsp_oldActTypeCd").val(),                                                                   // 이전 처리유형
			"actTypeCd" :actType,                                                                         				 	  	// 처리유형
			"callbackId" : $("#cmscsp_callBckId").val(),                                                                        // callbakId
			"tcktId" : $("#cmscsp_tcktId").val(),                                                                            	// 상담이력  Ticket ID
			"trnrTelNo" : trnrTelNo,
			"resvTelNo" : resvTelNo,
			"trnrCenterCd" : "",
			"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                                                             	// 센터코드
			"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                                                              	// 팀코드
			"deptId" : window.sessionStorage.getItem("DEPT_CD"),                                                             	// 부서코드
			"trnrTarget" : $("#cmscsp_transferOrg").val(),
			"trnrTeamCd" :$("#cmscsp_trnrTeamCd").val(),                                                                        // 이관 / 호전환 대상 팀
			"trnrTeamNm" : $("#cmscsp_tfRcvnTeamNm").val(),                                                                     // 이관 / 호전환 대상 팀명
			"trnrDeptId" : $("#cmscsp_trnrDeptCd").val(),                                                                       // 이관 / 호전환 대상 부서
			"trnrUsrId" : $("#cmscsp_rcvnUserId").val(),                                                                        // 이관 / 호전환 대상 사용자 ID
			"trnrUsrNm" : $("#cmscsp_tfActCounselText").val(),                                                                  // 이관 / 호전환 대상 사용자명
			"extAgnId" : $("#cmscsp_extAgencyId").val(),                                                                        // 외부기관 ID
			
			/*
			"callbackId" : $("#cmscsp_callBckId").val(),
			"tcktId" : $("#cmscsp_tcktId").val(),                                                                                    // Ticket Id
			"custId" : $("#cmscsp_custId").val(),                                                                                    // 고객ID
			"custNm" : $("#cmscsp_custNm").html(),                                                                                   // 고객명
			"refId" : $("#cmscsp_refId").val(),                                                                                      // 참조ID
			"cntrCd" : window.sessionStorage.getItem("CNTR_CD"),                                                              // 센터코드
			"teamCd" : window.sessionStorage.getItem("TEAM_CD"),                                                              // 팀코드
			"deptId" : window.sessionStorage.getItem("DEPT_CD"),                                                              // 부서코드
			"actTypeCd" : actType,                                                                              // 처리유형
			"rcvCont" : $("#cmscsp_rcvCont").val(),                                                                                  // 문의내용
			"callGbCd" : $("#cmscsp_callGbCd").val(),                                                                                // 콜구분(인바운드/아웃바운드)
			"actStCd" : $("#cmscsp_actStCd").val(),                                                                                  // 상담결과(완료/미완료)
			"actCont" : $("#cmscsp_actCont").val(),                                                                                  // 답변내용
			"starate" : starate,
			//"intvExCd" : $("#cmscsp_intvExCd").val(),                                                                                // 상담유형 - 대
			"intvLgCd" : $("#cmscsp_intvLgCd").val() == null ? "all" : $("#cmscsp_intvLgCd").val(),                                                                                // 상담유형 - 대
			"intvMdCd" : $("#cmscsp_intvMdCd").val() == null ? "all" : $("#cmscsp_intvMdCd").val(),                                                                                // 상담유형 - 중
			"intvSmCd" : $("#cmscsp_intvSmCd").val() == null ? "all" : $("#cmscsp_intvSmCd").val(),                                  // 상담유형 - 소
			"oldActTypeCd" : $("#cmscsp_oldActTypeCd").val(),                                                                        // 이전 처리유형
			"resvDt" : $("#cmscsp_tfResvDtm").val() != "" ? changeDateString(getResvDate($("#cmscsp_tfResvDtm").val())) : "",               // 얘약일
			"resvTm" : $("#cmscsp_tfResvDtm").val() != "" ? changeTimeString(getResvDate($("#cmscsp_tfResvDtm").val())) : "",     // 예약시간
			"clrmant" : $("#cmscsp_tfCnslClaimant").val(),
			"clrmant_telno" : $("#cmscsp_tfCnslClaimantPhoneNum").val().replace(/[-,\s]/g,""),
			"trnrCenterCd" : "",
			"trnrTarget" : $("#cmscsp_transferOrg").val(),
			"trnrTeamCd" :$("#cmscsp_trnrTeamCd").val(),                                                                             // 이관 / 호전환 대상 팀
			"trnrTeamNm" : $("#cmscsp_tfRcvnTeamNm").val(),                                                                          // 이관 / 호전환 대상 팀명
			"trnrDeptId" : $("#cmscsp_trnrDeptCd").val(),                                                                            // 이관 / 호전환 대상 부서
			"trnrUsrId" : $("#cmscsp_rcvnUserId").val(),                                                                             // 이관 / 호전환 대상 사용자 ID
			"trnrUsrNm" : $("#cmscsp_tfActCounselText").val(),                                                                       // 이관 / 호전환 대상 사용자명
			"extAgnId" : $("#cmscsp_extAgencyId").val(),                                                                             // 외부기관 ID
			"trnrTelNo" : trnrTelNo,
			"resvTelNo" : resvTelNo,
			"stay_drtn" : $("#cmscsp_stayDuration").val(),                                                                            // 체류기간
			"keyWord" : $("#cmscsp_selCnslKeyWord").val(),                                                                            // 체류기간
			"holdCount" : "",
			"isChanged" : g_changedCont
			*/
		}
	};	
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 2020.06.02 상담이력 
function getJsonStrUpdateCounselChange(){
	// 처리유형
	var actType = $("#cmscsp_actTypeCd option:selected").val();
	if(g_changedCont=="{}"){
		g_changedCont="";
	}
	
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMDEuY291bnNlbENoYW5nZVVwZGF0ZQ==",	//ch001.counselChangeUpdate -- insert ch004
			"map" : {
				"key" : "value",
				"rcvCont" : $("#cmscsp_rcvCont").val(),																			  // 문의내용
				"callGbCd" : $("#cmscsp_callGbCd").val(),																		  // 콜구분(인바운드/아웃아운드)
				"actStCd" : $("#cmscsp_actStCd").val(),                                                                           // 상담결과(완료/미완료)
				"actTypeCd" :actType,                                                                         				 	  // 처리유형
				"actCont" : $("#cmscsp_actCont").val(),                                                                            // 응답내용
				"intvLgCd" : $("#cmscsp_intvLgCd").val() == null ? "all" : $("#cmscsp_intvLgCd").val(),                                                                         // 상담유형 - 대
				"intvMdCd" : $("#cmscsp_intvMdCd").val() == null ? "all" : $("#cmscsp_intvMdCd").val(),                                                                                // 상담유형 - 중
				"intvSmCd" : $("#cmscsp_intvSmCd").val() == null ? "all" : $("#cmscsp_intvSmCd").val(),                                  // 상담유형 - 소
				"clrmant" : $("#cmscsp_tfCnslClaimant").val(),
				"clrmant_telno" : $("#cmscsp_tfCnslClaimantPhoneNum").val().replace(/[-,\s]/g,""),
				"custId" : $("#cmscsp_custId").val(),                                                                                  // 민원인ID
				"tcktId" : $("#cmscsp_tcktId").val(),                                                                            // 상담이력  Ticket ID
				"isChanged" : g_changedCont,
				}
	};	
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function counselUpdate()
{
	if(g_listType != "callBack") 
	{
		if ($("#cmscsp_callBckId").val() != "" ) {
			alert('콜백 처리 이력입니다.\n콜백이력 탭에서 처리하셔야 합니다.');
			return;
		}
		counselSpecUpdate();
	}
	else
	{
		if (g_outTcktId != "") 
		{
			if ($("#cmscsp_actStCd").val() == '030400')  // 상담결과가 완료인 경우 
			{
				if ($("#cmscsp_callbckActStCd").val() != "030000")   // 처리완료가 아닌 경우
				{
					alert('콜백처리상태와 상담결과를 확인하시기 바랍립니다.');
					return;
				}
			} else if ($("#cmscsp_callbckActStCd").val() == "030000") {
				alert('콜백처리상태와 상담결과를 확인하시기 바랍립니다.');
				return;
			}
		}
		if(startCallbckActStCd != $("#cmscsp_callbckActStCd").val()) 
		{
			updateActStCd("Y");
		}
		else if(g_outTcktId == "") 
		{
			updateActStCd("Y");
		}
		else if(g_outTcktId != "")
		{
			updateActStCd("N");
		}
	}
}

//var g_winObject=null;
////메뉴 id를 받아 팝업으로 메뉴를 화면에 표시
//function openMenuPopup_param(menuId)
//{
//	var width = 0;
//	var height = 0;
//	
//	// 메뉴 정보를 가져옴
//	$.ajax({
//		type : "post",
//		dataType: "json",
//		async : true,
//		url : getContextPath() + "/ajax/main/getMenuInfo.do",
//		data : "pJson=" + getJsonStrMenuInfo(menuId),
//		success : function(data)
//		{
//			if(data != null)
//			{
//				if(data.MNU_URL.substring(0, 4) == "http")
//				{
//					window.open(data.MNU_URL);
//				}
//				else
//				{
//					if(data.WDT_SZ != null)
//						width = parseInt(data.WDT_SZ);
//					else
//						width = 1200;
//					
//					if(data.WDT_SZ != null)
//						height = parseInt(data.HGHT_SZ);
//					else
//						height = 800;
//					
//					var top = window.screenTop + (screen.height - height) / 2;
//					var left = window.screenLeft + (screen.width - width) / 2;
//					
//					var paramURL = getContextPath() + "/web" + data.MNU_URL;
//					var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
//					
//					var ExCd=$("#cmscsp_intvExCd").val();
//					var LgCd=$("#cmscsp_intvLgCd").val();
//					var MdCd=$("#cmscsp_intvMdCd").val();
//					var SmCd=$("#cmscsp_intvSmCd").val();
//					var selPopupLv= $("#cmscsp_selPopupLv").val();
//					var sParam="?ExCd="+ExCd+"LgCd="+LgCd+"&MdCd="+MdCd+"&SmCd="+SmCd+"&PopLv="+selPopupLv;
//					paramURL += sParam;
//					g_winObject = window.open(paramURL, data.MNU_ID, option);
//					
//					g_winObject.focus();
//					setTimeout(function(){testDataPopupParam();}, 1000);
//					//setTimeout(function(){g_winObject.document.getElementById('optCounselKnd1_sc').options[1].selected = true;}, 2000);
//					
//				}
//			}
//		},
//		error : function(data, status, err) 
//		{
//			networkErrorHandler(data, status, err);
//		}
//	});
//}

//function btnJisikDbPopup_clickEvent(){
//	openMenuPopup_param("MI0001");
//}

function btnTransfOverHist_clickEvent(){
	 
	var valId=this.id;
	
	var tcktId=$("#cmscsp_tcktId").val();
	var tntrId="";
	var ord="";
	
	if(valId=="cmscsp_btnMainHis"){
		ord="1";
	}else if(valId=="cmscsp_btnSubHis"){
		ord="2";
	}
	
		var width = 1100;
		var height = 750;
		var left = 150;
		var top = 150;
		var paramURL = getContextPath() + "/web/civilservice/cswVocHistory.do";
		var option = "width=" + width + ", height=" + height + ", height=" + height + ", top=" + top + ", toolbar=no,directories=no,scrollbars=no,location=no,resizable=no,status=no,menubar=no";
 
		var sParam="?tckt_id="+tcktId+"&tntr_id="+tntrId+"&ord="+ord;
		paramURL += sParam;
		var owin = window.open(paramURL, "tranfOpen", option);
}

function btnCnslHistoryPopup_clickEvent(){
	var pTckId= $("#cmscsp_tcktId").val();
	 $("#cmscsp_histPopCallMe").val(pTckId);
	openMenuPopup("CM0242", pTckId);
}


function testDataPopupParam(){
	
	g_winObject.document.all.taCommTtl.value = $("#cmscsp_rcvCont").val();
	g_winObject.document.all.taCommCntn.value = $("#cmscsp_actCont").val();
					
	
//var obj = g_winObject.document.getElementById('optCounselKnd1_sc');
//	
//	for (var index = 0; index < obj.length; index++) 
//	{
//			if (obj.options[index].value ==  $("#cmscsp_intvLgCd").val()) 
//			{
//				var pdata=$("#cmscsp_intvLgCd").val();
//					obj.options[index].selected = true;
//					obj.trigger("change");
//					
//			}
//	}
	
}

//삭제 버튼 클릭 이벤트
function btnDelete_clickEvent2()
{
	var rMsg = checkUserSpec("delete");
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	if (confirm("삭제를 하시겠습니까?") == true)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/counselUpdate.do",
			data : "pJson=" + getJsonStrDeleteCounsel(),
			success : function(data)
			{
				counselInitInfo();
		   		
				comCounselMainReloadGridType();
				alert("삭제되었습니다.");
		   		
		   		if(document.title == "상담이력목록")
		   		{
		   			opener.parent.refreshNotyetCnt();
		   			opener.parent.reloadGrid();
		   		}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	{
		return;
	}
}

//jquery dateTimePicker
function counselDateTimePicker()
{
	$("#cmscsp_tfResvDtm").datetimepicker({
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
}

function callBackInitTable(callBackId, tryCnt, gridType)
{
	setSelectBoxWithCode("cmscsp_callbckActStCd", "", "90020", "CHILD", "", "");	// 처리유형 셋팅	

	callbackInitInfo();
	counselInitInfo();
	g_tryCnt = tryCnt;
	g_listType = "callBack";
	g_comGridType = gridType;
	$("#cmscsp_callbckBase").hide();
	$("#cmscsp_btnDelete").hide();
	if(window.sessionStorage.getItem("USR_GRD_CD") == "090100")
		$("#cmscsp_btnDelete").show();
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/resvUpdateList.do",
		data : "pJson=" + getJsonStrCallBackSpec(callBackId),
		success : function(data)
		{
			if(data.OUT_TCKT_ID != null)
			{
				g_outTcktId = data.OUT_TCKT_ID;
				if(data.REG_TCKT_ID != null)
				{
					$("#cmscsp_callbckBase").show();
					$("#cmscsp_reqTcktId").val(data.REG_TCKT_ID);
				}
				if(data.CALLBCK_ACT_ST_CD == "020000"){
					$("#cmscsp_btnOutBoundCall").show();
				} else {
					$("#cmscsp_btnOutBoundCall").hide();	
				}
//				$("#cmscsp_btnOutBoundCall").hide();
				$("#cmscsp_callBackTable").css("display", "block");
				$("#cmscsp_counselComTable").css("display", "block");
				counselInitTable(data.OUT_TCKT_ID, 'list', "callbck");
			}
			else
			{
				g_outTcktId = "";
				if(data.REG_TCKT_ID != null)
				{
					$("#cmscsp_callbckBase").show();
					$("#cmscsp_reqTcktId").val(data.REG_TCKT_ID);
				}
				$("#cmscsp_btnUpdate").show();
				$("#cmscsp_btnOutBoundCall").show();
				$("#cmscsp_btnListenRec").hide();
				$("#cmscsp_btnSmsSpec").hide();
				$("#cmscsp_tcktId").val(null);
				$("#cmscsp_callBackTable").css("display", "block");
				$("#cmscsp_counselComTable").css("display", "none");
			}
			
			$("#cmscsp_callBckId").val(data.CALLBCK_ID);
			$("#cmscsp_callbckReq").html(data.CALLBCK_REQ_FORMAT);
			$("#cmscsp_callbckDiv").html(data.CALLBCK_DIV_FORMAT);
			$("#cmscsp_rctTry").html(data.RCT_TRY_FORMAT);
			startCallbckActStCd = data.CALLBCK_ACT_ST_CD;
			$("#cmscsp_callbckActStCd").val(data.CALLBCK_ACT_ST_CD);
			$("#cmscsp_callbckActRsn").val(data.CALLBCK_ACT_RSN);
			
			if (!data.CALLBCK_CUST_NM){
				var tmpName ="민원인";
			}else {
				var tmpName =data.CALLBCK_CUST_NM;
			}
			$("#cmscsp_callbckCustNm").html(tmpName);
			$("#cmscsp_callBackRetryCnt").val(data.CALL_TRY_SCNT);
			
			g_callBckNum = data.CALLBCK_TEL_NO_FORMAT;
			if(data.CALLBCK_TEL_NO_FORMAT != ' ' && data.CALLBCK_TEL_NO_FORMAT != null){
				//$("#cmscsp_callbckTelNo").html(data.CALLBCK_TEL_NO_FORMAT + '&nbsp;&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="btnDialing_clickEvent('+"'CB'"+')" class="icon_cal2" id="btnCallDialing"/>');
				$("#cmscsp_callbckTelNo").html(data.CALLBCK_TEL_NO_FORMAT);
			}
			else
				$("#cmscsp_callbckTelNo").html(data.CALLBCK_TEL_NO_FORMAT);
			g_callBckAniNum = data.CALLBCK_ANI_FORMAT;
			if(data.CALLBCK_ANI_FORMAT != ' ' && data.CALLBCK_ANI_FORMAT != null)
				$("#cmscsp_callbckAni").html(data.CALLBCK_ANI_FORMAT);
			else
				$("#cmscsp_callbckAni").html(data.CALLBCK_ANI_FORMAT);
			$("#cmscsp_textAutoRecl").html(data.AUTO_RECL);
			$("#cmscsp_tryDt").val(data.rct_try_format);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function selectReqInfo()
{
	window.sessionStorage.setItem("tcktId", "");
	window.sessionStorage.setItem("reqTcktId", $("#cmscsp_reqTcktId").val());
	
	var width = 1200;
	var height = 414;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/counselSpec.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "counselSpec", option);
	newWindow.focus();
}
 

/**
 * Initialize
 */
function fnCounselInit() {
	setObjSelectBoxWithActTypeCd("cmscsp_actTypeCd", "", g_popup,"","90014",""); // 처리유형
	setObjSelectBoxWithCode("cmscsp_callGbCd", "", "",g_popup,"90010", "");	    // 민원구분 셋팅
	setObjSelectBoxWithCode("cmscsp_actStCd", "", "",g_popup,"90013", "");	//  처리상태 셋팅 
}

/**
 * Button/SelectBox Event 연결
 */
function fnCounselEvent() {
	//변경 사항 체크
	g_changedCont="";
	g_changedPassOver="";
	g_rtnArrCont=["",""];
}

function setOptionTagDisabled(ccAffrsYN) {
	if ($("#cmscsp_actStCd").val() == "030400") {
		$("#cmscsp_btnUpdate").hide();
		$("#cmscsp_cnslMainProcSt option[value=010200]").prop("disabled", true);
		$("#cmscsp_cnslMainProcSt option[value=010300]").prop("disabled", true);
		$("#cmscsp_cnslMainProcSt option[value=020100]").prop("disabled", true);
		$("#cmscsp_cnslMainProcSt option[value=020200]").prop("disabled", true);
		$("#cmscsp_cnslMainProcSt option[value=030100]").prop("disabled", true);
		$("#cmscsp_cnslMainProcSt option[value=030200]").prop("disabled", true);
	} else {
		if (ccAffrsYN == "Y") {
			$("#cmscsp_cnslMainProcSt option[value=010200]").prop("disabled", false);
			$("#cmscsp_cnslMainProcSt option[value=010300]").prop("disabled", true);
		} else {
			$("#cmscsp_cnslMainProcSt option[value=010200]").prop("disabled", true);
			$("#cmscsp_cnslMainProcSt option[value=010300]").prop("disabled", false);
		};
		$("#cmscsp_cnslMainProcSt option[value=020100]").prop("disabled", true);
		$("#cmscsp_cnslMainProcSt option[value=020200]").prop("disabled", true);
		$("#cmscsp_cnslMainProcSt option[value=030100]").prop("disabled", true);
		$("#cmscsp_cnslMainProcSt option[value=030200]").prop("disabled", true);
	};
}

/**
 * 호전환 조직정보 설정
 * 
 * @param objInfo
 */
function fnSetTransInfo(objInfo)
{
	var agencyCategory = objInfo.CATEGORY;
	// 처리유형
	var actTypeCd = $("#cmscsp_actTypeCd option:selected").val();
	
	if (actTypeCd == "030100") { // 민원이관
		if (objInfo.GUBUN == "M") { // 주관부서
			$("#cmscsp_tfCnslMainDepartment").val(objInfo.USR_ID + "|" + objInfo.DEPT_CD + "|" + objInfo.DEPT_CD + "|" + objInfo.USR_ID + "|" + objInfo.USR_NM+ "|" +objInfo.TEL_NO);
			$("#cmscsp_cnslMainUsr").val(objInfo.DEPT_NM.replace("순천시청 ", "") + " > " + objInfo.USR_NM);
			$("#cmscsp_cnslMainDeptCd").val(objInfo.DEPT_CD);
			$("#cmscsp_cnslMainTeamCd").val(objInfo.DEPT_CD);
			$("#cmscsp_cnslMainAffairUsrId").val(objInfo.USR_ID);
			$("#cmscsp_cnslMainAffairUsrNm").val(objInfo.USR_NM);
			$("#cmscsp_cnslMainAffairTelNo").val(objInfo.TEL_NO);
			$("#cmscsp_cnslMainAffairMobile").val(objInfo.MOBILE);
			$("#cmscsp_cnslMainAffairYN").val(objInfo.CC_AFFAIRS_YN);
			
			setOptionTagDisabled(objInfo.CC_AFFAIRS_YN);
		} else if (objInfo.GUBUN == 'S') { // 보조부서
			$("#cmscsp_tfCnslSubDepartment").val(objInfo.USR_ID + "|" + objInfo.DEPT_CD + "|" + objInfo.DEPT_CD + "|" + objInfo.USR_ID + "|" + objInfo.USR_NM+ "|" +objInfo.TEL_NO);
			$("#cmscsp_cnslSubUsr").val(objInfo.DEPT_NM.replace("순천시청 ", "") + " > " + objInfo.USR_NM);			
			$("#cmscsp_cnslSubDeptCd").val(objInfo.DEPT_CD);
			$("#cmscsp_cnslSubTeamCd").val(objInfo.DEPT_CD);
			$("#cmscsp_cnslSubAffairUsrId").val(objInfo.USR_ID);
			$("#cmscsp_cnslSubAffairUsrNm").val(objInfo.USR_NM);
			$("#cmscsp_cnslSubAffairTelNo").val(objInfo.TEL_NO);			
			$("#cmscsp_cnslSubAffairMobile").val(objInfo.MOBILE);			
			$("#cmscsp_cnslSubAffairYN").val(objInfo.CC_AFFAIRS_YN);			
		}
	} else {
		$("#cmscsp_transferOrg").val(agencyCategory);
		
		if (agencyCategory == "EA") {
			$("#cmscsp_extAgencyId").val(objInfo.USR_ID);
		} else {
			$("#cmscsp_rcvnUserId").val(objInfo.USR_ID);
		};
		
		console.log("trOrg:"+objInfo.CATEGORY+",TeamCd:"+ objInfo.TEAM_CD +",id:"+ objInfo.USR_ID + ", Telno:"+objInfo.TEL_NO+ ", DeptNm:"+objInfo.TEAM_NM+ ", Usr:"+objInfo.USR_NM);
		
		$("#cmscsp_trnrTeamCd").val(objInfo.TEAM_CD);
		$("#cmscsp_trnrDeptCd").val(objInfo.DEPT_CD);		
		$("#cmscsp_tfRcvnTeamNm").val(objInfo.TEAM_NM);
		$("#cmscsp_tfActCounselText").val(objInfo.USR_NM);
		$("#cmscsp_tfResvTelNo").val(objInfo.TEL_NO);
	}
}

/**
 * 이관정보 조회
 * 
 * @param tcktId
 */
function fnSetMinwonInformation(tcktId,bAsync)
{
	$("#cmscsp_cnslMainProcDtm").html("");
	g_dataMainPassOver={};
	g_dataSubPassOver={};
	
	// 이관정보 조회
	$.ajax({
		type : "post",
		dataType : "json",
		async : bAsync,
		url : getContextPath() + "/ajax/counsel/counselSpec.do",
		data : "pJson=" + getJsonStrMinwonSpec(tcktId),
		success : function(data) 
		{
			var tmp="";
			var trContLen=0;
			var contLen=0;
			var rsnLen=0;
			var szLength = data.length;
				if (szLength > 0) {
					 g_dataMainPassOver=data[0];
					 
					$("input[name='rdoCnslReq']").filter('[value=' + data[0].RQS_GB + ']').prop("checked", true);
					$("input[name='rdoCnslResult']").filter('[value=' + data[0].CVL_RSLT_RCV_YN + ']').prop("checked", true);
				
					$("#cmscsp_tfActCounselText").val(data[0].CTZN);
					$("#cmscsp_tfResvTelNo").val(getPhoneNumFormat(data[0].CTZN_TEL_NO));
					$("#cmscsp_trnrMinCont").val(data[0].TNTR_CONT);
					
					$("#cmscsp_cnslMainProcSt").prop("disabled",true);
					$("#cmscsp_cnslSubProcSt").prop("disabled",true);
					
					//처리유형) 민원이관과 직접상담만 가능
					$("#cmscsp_actTypeCd option:eq(1)").prop("disabled", true);
					$("#cmscsp_actTypeCd option:eq(3)").prop("disabled", true);
					$("#cmscsp_actTypeCd option:eq(4)").prop("disabled", true);
					$("#cmscsp_actTypeCd option:eq(5)").prop("disabled", true);
					
					// 민원이관상세 주관부서가 있는 경우
					if(data[0].ORG_ID){
						var name = data[0].USR_NM != '' ? data[0].USR_NM : data[0].AFFS_USR_NM;
						var id = data[0].ORG_USR_ID != '' ? data[0].ORG_USR_ID : data[0].AFFS_ORG_USR_ID;
						var tel = data[0].TEL_NO != '' ? data[0].TEL_NO : data[0].AFFS_OFCE_TEL_NO;
						g_oldMainCont["exist"]="main";
						$("#cmscsp_tfCnslMainDepartment").val(data[0].ORG_ID+"|"+id+"|"+name+"|"+tel);
						$("#cmscsp_cnslMainUsr").val(data[0].ORG_FUL_NM.replace("순천시청 ", "") +" > "+ name);
	
						$("#cmscsp_cnslMainProcDtm").html(data[0].MOD_DTM_FORMAT);
	
						$("#cmscsp_cnslMainProcCont").val(data[0].CVL_ACT_CONT); // 처리민원1
						$("#cmscsp_tfCnslMainRtnCont").val(data[0].RTN_RSN);     // 반송사유
	
						//hide
						$("#cmscsp_cnslMainAffairUsrId").val(data[0].AFFS_ORG_USR_ID);
						$("#cmscsp_cnslMainAffairTelNo").val(data[0].AFFS_OFCE_TEL_NO);
						$("#cmscsp_cnslMainAffairUsrNm").val(data[0].AFFS_USR_NM);
						$("#cmscsp_cnslMainTeamCd").val(data[0].ORG_ID);
						$("#cmscsp_cnslMainDeptCd").val(""); //사용안함  
						$("#cmscsp_cnslMainAffairMobile").val(data[0].AFFS_ORG_MOBILE);
						$("#cmscsp_cnslMainAffairYN").val(data[0].CC_AFFAIRS_YN);
						
						setOptionTagDisabled(data[0].CC_AFFAIRS_YN);
					}else{
						g_oldMainCont["exist"]="";
					}
					 
					if(!data[0].TNTR_CONT){
						trContLen=0;
					}else{ 
						trContLen=data[0].TNTR_CONT.length;
					}
					
					if(!data[0].CVL_ACT_CONT){
						contLen=0;
					}else{ 
						contLen=data[0].CVL_ACT_CONT.length;
					}
					
					if(!data[0].RTN_RSN){
						rsnLen=0;
					}else{ 
						rsnLen=data[0].RTN_RSN.length;
					}
					
					g_oldMainCont["rdoCnslReq"]=data[0].RQS_GB;
					g_oldMainCont["rdoCnslResult"]=data[0].CVL_RSLT_RCV_YN;
					if(!data[0].CTZN){
						tmp="";
					}else{ 
						tmp=data[0].CTZN;
					}
					g_oldMainCont["cmscsp_tfActCounselText"]=tmp;
					if(!data[0].CTZN_TEL_NO){
						tmp="";
					}else{ 
						tmp=data[0].CTZN_TEL_NO;
					}
					g_oldMainCont["cmscsp_tfResvTelNo"]=tmp;
					
					g_oldMainCont["trnrMinConttrnrMinCont"]=data[0].TNTR_CONT;
					if(!data[0].CVL_ACT_ST_CD){
						tmp="010100";
					}else{
						tmp=data[0].CVL_ACT_ST_CD;
						if(data[0].CVL_ACT_ST_CD > "010100"){ 
							//접수에서 대기로는 바꿀수 없게
							$("#cmscsp_cnslMainProcSt option:eq(0)").prop("disabled", true);
							$("#cmscsp_btnMainHis").show();  // 이관이력1
						}
					}
					
					var actStat=tmp;
					$("#cmscsp_cnslMainProcSt").val(actStat); 

					var usrGrade=window.sessionStorage.getItem("USR_GRD_CD");
					if (usrGrade < "030100" ){
						$("#cmscsp_actTypeCd").prop("disabled", true);
						$("#cmscsp_actStCd").prop("disabled", g_actStDisable[actStat][1]);
					}else{
						$("#cmscsp_actTypeCd").prop("disabled", g_actStDisable[actStat][0]);
						$("#cmscsp_actStCd").prop("disabled", g_actStDisable[actStat][1]);
						$("#cmscsp_cnslMainProcSt").prop("disabled",false);
						$("#cmscsp_cnslSubProcSt").prop("disabled",false);
					};
					
					if ($("#cmscsp_actStCd").val() == "030400") {
						$("#cmscsp_btnCnslMainDepartmentSearch").prop("disabled", g_actStDisable[actStat][1]);
						$("#cmscsp_btnCnslSubDepartmentSearch").prop("disabled", g_actStDisable[actStat][1]);
					} else {
						$("#cmscsp_btnCnslMainDepartmentSearch").prop("disabled", g_actStDisable[actStat][0]);
						$("#cmscsp_btnCnslSubDepartmentSearch").prop("disabled", g_actStDisable[actStat][0]);
					};
					
					$("#cmscsp_cnslMainUsr").prop("disabled", g_actStDisable[actStat][0]);
					$("#cmscsp_cnslMainProcCont").prop("disabled", g_actStDisable[actStat][0]);
					$("#cmscsp_tfCnslMainRtnCont").prop("disabled", g_actStDisable[actStat][0]);
					
					$("#cmscsp_cnslSubUsr").prop("disabled", g_actStDisable[actStat][0]);
					$("#cmscsp_cnslSubProcCont").prop("disabled", g_actStDisable[actStat][0]);
					$("#cmscsp_tfCnslSubRtnCont").prop("disabled", g_actStDisable[actStat][0]);
						
					console.log("Inform CVL_ACT_ST_CD :"+tmp);
					g_oldMainCont["cmscsp_cnslMainProcSt"]=tmp;
					if(!data[0].AFFS_ORG_USR_ID){
						tmp="";
					}else{ 
						tmp=data[0].AFFS_ORG_USR_ID;
					}
					g_oldMainCont["cmscsp_cnslMainAffairUsrId"]=tmp; 
					g_oldMainCont["cmscsp_cnslMainProcCont"]=contLen; 
					g_oldMainCont["cmscsp_tfCnslMainRtnCont"]=rsnLen;
					
					if (szLength > 1) {
						
						g_dataSubPassOver=data[1];
						g_oldSubCont["exist"]="sub";

						$("#cmscsp_cnslSubProcSt").val(data[1].CVL_ACT_ST_CD);
					
						$("#cmscsp_tfCnslSubDepartment").val(data[1].ORG_ID+"|"+data[1].AFFS_ORG_USR_ID+"|"+data[1].AFFS_USR_NM+"|"+data[1].AFFS_OFCE_TEL_NO);
						$("#cmscsp_cnslSubUsr").val(data[1].ORG_FUL_NM.replace("순천시청 ", "") +" > "+data[1].AFFS_USR_NM);
						
						$("#cmscsp_cnslSubProcDtm").html(data[1].MOD_DTM_FORMAT );

						$("#cmscsp_cnslSubProcCont").val(data[1].CVL_ACT_CONT);   // 처리민원
						$("#cmscsp_tfCnslSubRtnCont").val(data[1].RTN_RSN);       // 반송사유

						//hide
						$("#cmscsp_cnslSubAffairUsrId").val(data[1].AFFS_ORG_USR_ID);
						$("#cmscsp_cnslSubAffairTelNo").val(data[1].AFFS_OFCE_TEL_NO);
						$("#cmscsp_cnslSubAffairUsrNm").val(data[1].AFFS_USR_NM);
						$("#cmscsp_cnslSubTeamCd").val(data[1].ORG_ID);
						$("#cmscsp_cnslSubDeptCd").val(""); //사용안함
						$("#cmscsp_cnslSubAffairMobile").val(data[1].AFFS_ORG_MOBILE);

						
						if(!data[1].CVL_ACT_CONT){
							contLen=0;
						}else{ 
							contLen=data[1].CVL_ACT_CONT.length;
						}
						
						if(!data[1].RTN_RSN){
							rsnLen=0;
						}else{ 
							rsnLen=data[1].RTN_RSN.length;
						}
						
						if(!data[1].CVL_ACT_ST_CD){
							tmp="";
						}else{ 
							tmp=data[1].CVL_ACT_ST_CD;
							if(data[1].CVL_ACT_ST_CD > "010100"){
								$("#cmscsp_cnslSubProcSt option:eq(0)").prop("disabled", true);
								$("#cmscsp_btnSubHis").show();  // 이관이력2
							}
						}
						g_oldSubCont["cmscsp_cnslSubProcSt"]=tmp;
						
						if(!data[1].AFFS_ORG_USR_ID){
							tmp="";
						}else{ 
							tmp=data[1].AFFS_ORG_USR_ID;
						}
						g_oldSubCont["cmscsp_cnslSubAffairUsrId"]=tmp; 
						g_oldSubCont["cmscsp_cnslSubProcCont"]=contLen; 
						g_oldSubCont["cmscsp_tfCnslSubRtnCont"]=rsnLen;
					}
					else if(szLength==1){
						
						//보조부서가 없는 상태는 주관부서를 따라간다
						$("#cmscsp_cnslSubProcSt").val(g_oldMainCont["cmscsp_cnslMainProcSt"]);
						g_oldSubCont["exist"]="";
						g_oldSubCont["cmscsp_cnslSubProcSt"]="010100";
						g_oldSubCont["cmscsp_cnslSubAffairUsrId"]=""; 
						g_oldSubCont["cmscsp_cnslSubProcCont"]=0; 
						g_oldSubCont["cmscsp_tfCnslSubRtnCont"]=0;
					}
					
				}else{
					//신규이관
						g_oldMainCont["exist"]="";
						g_oldMainCont["cmscsp_cnslMainAffairUsrId"]="";
						g_oldMainCont["cmscsp_cnslMainProcCont"]=0;
						g_oldMainCont["cmscsp_cnslMainProcSt"]="";
						g_oldMainCont["rdoCnslReq"]="";
						g_oldMainCont["rdoCnslResult"]="";
						g_oldMainCont["cmscsp_tfActCounselText"]="";
						g_oldMainCont["cmscsp_tfCnslMainRtnCont"]=0;
						g_oldMainCont["cmscsp_tfResvTelNo"]="";
						g_oldMainCont["cmscsp_trnrMinCont"]=""; 
						
						g_oldSubCont["exist"]="";
						g_oldSubCont["cmscsp_cnslSubProcSt"]="010100";
						g_oldSubCont["cmscsp_cnslSubAffairUsrId"]=""; 
						g_oldSubCont["cmscsp_cnslSubProcCont"]=0; 
						g_oldSubCont["cmscsp_tfCnslSubRtnCont"]=0;
				}
			//}
		}
	});
}


function getJsonStrAddr(tcktId){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "Y2gwMTAuYWRkclNlbGVjdA==",
			"map" : {
				"key" : "value",
				"tcktId" : tcktId
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 상담정보 상세를 조회하여 화면에 표시한다.
 * 
 * @param tcktId
 * @param type
 * @param gridType
 */
function counselInitTable(tcktId, type, gridType, childType)
{	
	g_type = type;
	g_comGridType = gridType;
	recUrl = "";
	
	//hhs 20.06.10
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		cache : false,
		url : getContextPath() + "/ajax/counsel/counselSpec.do",
		data : "pJson=" + getJsonStrAddr(tcktId), 
		success : function(data) 
		{
//			0: 행정동 발화 (읍면포함), 1: 법정동 발화, 2: 도로명 발화, 3: 여러동 존재, 4: 순천시 외 지역, 5: 잘못된 주소 (STT 오인식/없는동/무의미한말 발화), 6: 아파트 동 호수 발성, 9: 상담사 저장
			
			$("#cmscsp_selMainAddrDetail").html("");
			$("#cmscsp_selMainAddrCd").val("all");
			$("#cmscsp_selMainAddrCd").prop("disabled",false);
			
			if(data != null){
				console.log(data);
				cmscsp_spchType = data.SPCH_TYPE;
				
				$("#cmscsp_selMainAddrCd").val(data.H_ADDR);
				
				if(cmscsp_spchType == "0" || cmscsp_spchType == "1" || cmscsp_spchType == "2") {
					$("#cmscsp_selMainAddrCd").prop("disabled",true);
				}
				else if(cmscsp_spchType == "3") {
					$("#cmscsp_selMainAddrCd").prop("disabled",false);
					$("#cmscsp_selMainAddrDetail").html(data.ADDR.split('&')[0]);
				}
				else if(cmscsp_spchType == "4" || cmscsp_spchType == "5") {
					$("#cmscsp_selMainAddrCd").prop("disabled",false);
					$("#cmscsp_selMainAddrDetail").html("인식실패");
				}
				else if(cmscsp_spchType == "9") {
					$("#cmscsp_selMainAddrCd").prop("disabled",false);
				}
				else {
					$("#cmscsp_selMainAddrCd").val("all");
					$("#cmscsp_selMainAddrCd").prop("disabled",false);
				}
			}
			
			cmscsp_checkAddr = $("#cmscsp_selMainAddrCd").val();
		} 
	});
	
	fnCounselEvent();
	
	if(g_type != "list")
	{		
		counselDateTimePicker();
		counselInitInfo("");
		counselButtonEvent();		
		$("#cmscsp_callBackTable").css("display", "none");
	}
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		cache : false,
		url : getContextPath() + "/ajax/counsel/counselSpec.do",
		data : "pJson=" + getJsonStrCounselspec(tcktId), 
		success : function(data) 
		{
			// 수정시 체크를 위해 전체객체 저장
			g_dataObject=data;
			
			//친절도
			if(data.ACT_TYPE_CD=="030200" || data.ACT_TYPE_CD=="030300" || data.ACT_TYPE_CD=="030500"){
				$("#cmscsp_tdkeyword").html("친절도");
				$("#cmscsp_selCnslKeyWord").hide();
				$("#cmscsp_star_rating").show();
				$("#cmscsp_star_rating").empty();
				//$.ratePicker("#cmscsp_star_rating",{cursor:false,stars:data.CNSL_CS_VLTN});	
				$.ratePicker("#cmscsp_star_rating",{stars:data.CNSL_CS_VLTN});
			}else{
				$("#cmscsp_tdkeyword").html("");
				$("#cmscsp_selCnslKeyWord").show();
				$("#cmscsp_star_rating").hide();
			}
			
			if(tcktId != ""){
				$("#cmscsp_tcktId").val(data.TCKT_ID);
			}else{
				$("#cmscsp_tcktId").val("");
			}
	
			$("#cmscsp_btnListenRec").show();
			$("#cmscsp_btnUpdate").hide();
			$("#cmscsp_btnDelete").hide();
			//$("#cmscsp_btnJisikDbPopup").show();
			
			$("#cmscsp_btnTabCustSearch").hide();                              // 고객정보 수정 버튼
			$("#cmscsp_cstType").prop("disabled", true);                       // 고객구분
			$("#cmscsp_cstComp").prop("disabled", true);                       // 고객성향
			
			$("#cmscsp_callGbCd").prop("disabled", false);                      // 콜구분
			$("#cmscsp_actTypeCd").prop("disabled", true);                     // 처리유형
			$("#cmscsp_actStCd").prop("disabled", true);                       // 상담결과
			
			//(처리유형) 민원이관 초기화
			$("#cmscsp_actTypeCd option:eq(0)").prop("disabled", false);
			$("#cmscsp_actTypeCd option:eq(1)").prop("disabled", false);
			$("#cmscsp_actTypeCd option:eq(2)").prop("disabled", false);
			$("#cmscsp_actTypeCd option:eq(3)").prop("disabled", false);
			$("#cmscsp_actTypeCd option:eq(4)").prop("disabled", false);
			$("#cmscsp_actTypeCd option:eq(5)").prop("disabled", false);
	
			$("#cmscsp_counselText").html("");		
			$("#cmscsp_tfResvDtm").hide();                                     // 통화예약일시
			$("#cmscsp_custNm").html("");	                                   // 고객명
			
			$("#cmscsp_callTime").html("");                                    // 통화시간
			$("#cmscsp_tfCounselMemo").val("");                                // 메모
			$("#cmscsp_resvTelText").html("");

			$("#cmscsp_tfRcvnUsr").hide();                                     // 등록대상
			$("#cmscsp_tfRcvnTeamNm").hide();
			$("#cmscsp_tfResvTelNo").hide();                                   // 통화예약번호
			$("#cmscsp_imgMainResvPhone").hide();
			$("#cmscsp_selCnslKeyWord").prop("disabled", true);                // 키워드
			$("#cmscsp_crtDt").html("");                                       // 등록일시
			$("#cmscsp_crtUsrNm").html("");                                    // 등록자
			$("#cmscsp_modDt").html("");                                       // 수정일시
			$("#cmscsp_modUsrNm").html("");                                    // 수정자
			//$("#cmscsp_intvExCd").prop("disabled", true);                    // 기관구분
			$("#cmscsp_intvLgCd").prop("disabled", true);                      // 상담유형 대
			$("#cmscsp_intvMdCd").prop("disabled", true);                      // 상담유형 중
			$("#cmscsp_intvSmCd").prop("disabled", true);                      // 상담유형 소
			$("#cmscsp_rcvCont").val("");                                      // 문의내용
			$("#cmscsp_actCont").val("");                                      // 처리내용
			
			$("#cmscsp_cstComp").html("");                                     // 민원인성향
			
			// 콜백 
			$("#cmscsp_callBackRetryCnt").val("");	                           // 콜백시도
			
			//호전환
			
			
			//긴급정보
			$("#cmscsp_tfCnslClaimant").hide();
			$("#cmscsp_tfCnslClaimantPhoneNum").hide();
			$("#cmscsp_tfCnslClaimant").val("");
			$("#cmscsp_tfCnslClaimantPhoneNum").val("");
			
			// 민원이관 관련 상세정보
			$("#cmscsp_minwonInfo1").hide();
			$("#cmscsp_minwonInfo2").hide();
			$("#cmscsp_minwonProcDeptInfo").hide();
			$("#cmscsp_minwonProcCont").hide();
			$("#cmscsp_minwonRtnCont").hide();
			$("#cmscsp_TrMinwonProcStatus").hide();
			
			$("#cmscsp_counselInfo").show();
			
			$("#cmscsp_actCounselText").html("");
			$("#cmscsp_tfActCounselText").val("");
			$("#cmscsp_tfActCounselText").hide();
			
						
			$("#cmscsp_rdoCnslImmediate").hide();
			$("#cmscsp_rdoCnslSevenDays").hide();
			$("#cmscsp_labRdoCnslImmediateText").hide();
			$("#cmscsp_labRdoCnslSevenDaysText").hide();
			
			$("#cmscsp_transfRsltText").html("");
			$("#cmscsp_rdoCnslYes").hide();
			$("#cmscsp_rdoCnslNo").hide();
			$("#cmscsp_labRdoYesText").hide();
			$("#cmscsp_labRdoNoText").hide(); 
			
			// 이관민원
			$("#cmscsp_tfActCounselText").val("");
			$("#cmscsp_tfResvTelNo").val(""); 	
			
			$("#cmscsp_cnslMainProcSt option:eq(0)").attr("selected", "selected");
			$("#cmscsp_cnslMainProcDtm").html("");
			
			$("#cmscsp_cnslSubProcSt option:eq(0)").attr("selected", "selected");
			$("#cmscsp_cnslSubProcDtm").html("");

			$("#cmscsp_tfCnslMainDepartment").val("");
			$("#cmscsp_cnslMainUsr").val("");
			$("#cmscsp_tfCnslSubDepartment").val("");
			$("#cmscsp_cnslSubUsr").val("");
			
			$("#cmscsp_cnslMainProcCont").val("");
			$("#cmscsp_cnslSubProcCont").val("");
			$("#cmscsp_tfCnslMainRtnCont").val("");
			$("#cmscsp_tfCnslSubRtnCont").val("");
			
			$("#cmscsp_rcvCont").css('height', '173px');
			$("#cmscsp_actCont").css('height', '173px');
			$("#cmscsp_btnTransfCont").hide();
			
			$("#cmscsp_trnrMinCont").val("");
			$("#cmscsp_trnrMinCont").hide();
			
			$("#cmscsp_cnslMainTeamCd").val("");                    // 주관부서 팀코드
			$("#cmscsp_cnslMainDeptCd").val("");                    // 주관부서 코드
			$("#cmscsp_cnslMainAffairUsrId").val("");               // 주관부서 서무 사용자ID
			$("#cmscsp_cnslMainAffairUsrNm").val("");               // 주관부서 서무 사용자명
			$("#cmscsp_cnslMainAffairTelNo").val("");               // 주관부서 서무 전화번호
			$("#cmscsp_cnslMainAffairMobile").val("");              // 주관부서 서무 휴대폰
			$("#cmscsp_tfCnslMainDepartment").val("");               

			$("#cmscsp_cnslSubTeamCd").val("");                     // 보조부서 팀코드
			$("#cmscsp_cnslSubDeptCd").val("");                     // 보조부서 코드
			$("#cmscsp_cnslSubAffairUsrId").val("");                // 보조부서 서부 사용자ID
			$("#cmscsp_cnslSubAffairUsrNm").val("");                // 보조부서 서무 사용자명
			$("#cmscsp_cnslSubAffairTelNo").val("");                // 보조부서 서무 전화번호   
			$("#cmscsp_cnslSubAffairMobile").val("");               // 보조부서 서무 휴대폰   
			$("#cmscsp_tfCnslSubDepartment").val("");               
			
			$("#cmscsp_cnslCopyCnslRcvCont").hide();
			$("#cmscsp_cnslCopyTransferCont").hide();
			
			$("#cmscsp_btnCnslHistoryPopup ").hide();  				// 변경이력
			$("#cmscsp_btnMainHis").hide();  						// 이관이력1
			$("#cmscsp_btnSubHis").hide();  						// 이관이력2
			
			$("#cmscsp_labNote").html("");
			
			$("#cmscsp_cnslMainProcSt").prop("disabled", false);	//이관민원 주관부서 처리상태
			$("#cmscsp_cnslSubProcSt").prop("disabled", false);  	//이관민원 보조부서 처리상태
			$("#cmscsp_cnslMainProcSt option:eq(0)").prop("disabled", false);
			$("#cmscsp_cnslSubProcSt option:eq(0)").prop("disabled", false);
			$("#cmscsp_btnCnslMainDepartmentSearch").prop("disabled",false);
			$("#cmscsp_btnCnslSubDepartmentSearch").prop("disabled",false);
			
			// 영상상담을 위한 colspan
//			$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(4,5).css("display","");
//			$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(3).attr("colspan",0);
			$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(2).html("");
			
			var deptChange="disabled";
			
			var temp_Rcv_usr_id= "";
			if(!data.RCV_USR_ID){
				temp_Rcv_usr_id= "";
			}else {
				temp_Rcv_usr_id=data.RCV_USR_ID;
			}
			
			if(data.B3_RCV_DT >= data.RCV_DT_FORMAT){
				$("#cmscsp_labNote").html("** 3일이상 경과한 이력을 수정하려면 관리자에게 요청 바랍니다.");
			}
			 
			if (window.sessionStorage.getItem("USR_GRD_CD") >= "030100" ) // 관리자
			{
				$("#cmscsp_btnUpdate").show();
				$("#cmscsp_btnDelete").show();
				if(data.CUST_ID != "" && data.CUST_ID != null)
					$("#cmscsp_btnTabCustSearch").show();                              // 고객정보 수정 버튼
				$("#cmscsp_cstType").prop("disabled", false);                      // 고객구분
				$("#cmscsp_cstComp").prop("disabled", false);                      // 고객성향
				$("#cmscsp_callGbCd").prop("disabled", false);                     // 콜구분
				$("#cmscsp_actTypeCd").prop("disabled", false);                    // 처리유형
				$("#cmscsp_actStCd").prop("disabled", false);                      // 처리상태
				//$("#cmscsp_intvExCd").prop("disabled", false);                   // 기관구분
				$("#cmscsp_intvLgCd").prop("disabled", false);                     // 상담유형 태
				$("#cmscsp_intvMdCd").prop("disabled", false);                     // 상담유형 중
				$("#cmscsp_intvSmCd").prop("disabled", false);                     // 상담유형 소
				$("#cmscsp_selCnslKeyWord").prop("disabled", false);               // 키워드
				
				$("#cmscsp_labNote").html("");
				deptChange="";       //부서버튼
			}
			else if ( g_agentId != temp_Rcv_usr_id) 
			{
				$("#cmscsp_btnUpdate").hide();
				$("#cmscsp_btnDelete").hide();
				$("#cmscsp_btnListenRec").hide();                              	  // 고객정보 수정 버튼
				$("#cmscsp_cstType").prop("disabled", true);                      // 고객구분
				$("#cmscsp_cstComp").prop("disabled", true);                      // 고객성향
				$("#cmscsp_callGbCd").prop("disabled", true);                     // 콜구분
				$("#cmscsp_actTypeCd").prop("disabled", true);                    // 처리유형
				$("#cmscsp_actStCd").prop("disabled", true);                      // 처리상태
				//$("#cmscsp_intvExCd").prop("disabled", true);                   // 기관구분
				$("#cmscsp_intvLgCd").prop("disabled", true);                     // 상담유형 대
				$("#cmscsp_intvMdCd").prop("disabled", true);                     // 상담유형 중
				$("#cmscsp_intvSmCd").prop("disabled", true);				      // 상담유형 소
				$("#cmscsp_selCnslKeyWord").prop("disabled", true);               // 키워드
				
				deptChange="disabled";       //부서버튼
			}
			else if (data.B3_RCV_DT <= data.RCV_DT_FORMAT +3) //hhs 20.04.10 3일 이상으로 수정 
			{
				$("#cmscsp_btnUpdate").show();
				//$("#cmscsp_btnDelete").show();
				if(data.CUST_ID != "" && data.CUST_ID != null)
					$("#cmscsp_btnTabCustSearch").show();                             // 고객정보 수정 버튼
				$("#cmscsp_cstType").prop("disabled", false);                     // 고객구분
				$("#cmscsp_cstComp").prop("disabled", false);                     // 고객성향
				$("#cmscsp_callGbCd").prop("disabled", false);                    // 콜구분
				$("#cmscsp_actTypeCd").prop("disabled", false);                   // 처리유형
				$("#cmscsp_actStCd").prop("disabled", false);                     // 처리상태
				//$("#cmscsp_intvExCd").prop("disabled", false);                  // 기관구분
				$("#cmscsp_intvLgCd").prop("disabled", false);                    // 상담유형 대
				$("#cmscsp_intvMdCd").prop("disabled", false);                    // 상담유형 중
				$("#cmscsp_intvSmCd").prop("disabled", false);				      // 상담유형 소
				$("#cmscsp_selCnslKeyWord").prop("disabled", false);              // 키워드
				
				$("#cmscsp_labNote").html("");
				deptChange="";       //부서버튼
			} 
			
			if(tcktId != ""){
				saveActTypeCd = data.ACT_TYPE_CD;
			}else{
				saveActTypeCd = "";
			}
			switch(saveActTypeCd) 
			{
			case "010100": // 영상상담
//				$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(4,5).css("display","none");
//				$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(3).attr("colspan",2);
				$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(2).html("이미지");
				break;
			case "020000":
				$("#cmscsp_counselText").html("재통화일시");
				$("#cmscsp_resvTelText").html("재통화번호");
				$("#cmscsp_tfResvDtm").show();				
				$("#cmscsp_tfResvTelNo").show();
				$("#cmscsp_tfResvDtm").val(data.RESV_DT_FORMAT + " " + data.RESV_TM_FORMAT);    // 예약일시
				$("#cmscsp_tfResvTelNo").width(130);
				$("#cmscsp_tfResvTelNo").css('text-align', 'center');
				$("#cmscsp_imgMainResvPhone").show();
				
				$("#cmscsp_tfResvTelNo").val(data.RESV_CNTCT_INFM_FORMAT);
				setPhoneNumFormat("cmscsp_tfResvTelNo");
				break;
			case "030100": // 민원이관
				$("#cmscsp_labNote").html(""); // 3일이상 문구
				$("#cmscsp_btnUpdate").show(); // 저장
//				$("#cmscsp_btnUpdate").hide(); // 저장
				$("#cmscsp_btnDelete").hide();//민원이관 삭제 안됨
				
				$("#cmscsp_counselText").html("처리기한");
				$("#cmscsp_actCounselText").html("민원인");
				$("#cmscsp_resvTelText").html("연락처");
				$("#cmscsp_transfRsltText").html("결과수신");				
				
				$("#cmscsp_tfActCounselText").show();
				$("#cmscsp_tfResvTelNo").show();
				$("#cmscsp_tfResvTelNo").width(130);
				$("#cmscsp_tfResvTelNo").css('text-align', 'center');
				
				$("#cmscsp_rdoCnslImmediate").show();
				$("#cmscsp_rdoCnslSevenDays").show();
				$("#cmscsp_labRdoCnslImmediateText").show();
				$("#cmscsp_labRdoCnslSevenDaysText").show();

				$("#cmscsp_rdoCnslYes").show();
				$("#cmscsp_rdoCnslNo").show();
				$("#cmscsp_labRdoYesText").show();
				$("#cmscsp_labRdoNoText").show();			
	 			
				$("#cmscsp_btnTransfCont").show();
				transfSizeControl();
				
				$("#cmscsp_trnrMinCont").show();
				
				$("#cmscsp_cnslCopyCnslRcvCont").show();
				$("#cmscsp_cnslCopyTransferCont").show();
				fnSetMinwonInformation(tcktId,true);
				setPhoneNumFormat("cmscsp_tfResvTelNo");
				break;
			case "030200": // 호전환
			case "030300": // 상담후 호전환
			case "030500": // 담당자 부재중
				$("#cmscsp_transferOrg").val(data.TRNR_CAT);
				if(deptChange==""){
					$("#cmscsp_counselText").html("<button type='button' id='btnDept' class='button' onclick='btnDeptCick();'>담당부서</button>");
					$("#cmscsp_tfRcvnTeamNm").prop("disabled",false);
					$("#cmscsp_tfActCounselText").prop("disabled",false);
					$("#cmscsp_tfResvTelNo").prop("disabled",false);
				}else{
					$("#cmscsp_counselText").html("담당부서");
					$("#cmscsp_tfRcvnTeamNm").prop("disabled",true);
					$("#cmscsp_tfActCounselText").prop("disabled",true);
					$("#cmscsp_tfResvTelNo").prop("disabled",true);
				}
				$("#cmscsp_tfRcvnTeamNm").show();
				$("#cmscsp_tfRcvnTeamNm").val(data.TRNR_RCVN_TEAM_NM);
				$("#cmscsp_actCounselText").html("담당자");
				$("#cmscsp_tfActCounselText").show();
				$("#cmscsp_tfActCounselText").val(data.TRNR_RCVN_USR_NM);
				$("#cmscsp_resvTelText").html("전화번호");
				$("#cmscsp_tfResvTelNo").show();
				$("#cmscsp_tfResvTelNo").width(130);
				$("#cmscsp_tfResvTelNo").css('text-align', 'center');
				$("#cmscsp_tfResvTelNo").val(getPhoneNumFormat(data.TRNR_RCVN_TEL_NO));
				setPhoneNumFormat("cmscsp_tfResvTelNo");
				break;
			case "030400": // ARS호전환
				break;
			case "040000": // 콜백등록
				$("#cmscsp_counselText").html("등록대상");
				$("#cmscsp_resvTelText").html("콜백번호");
				$("#cmscsp_callbackUsrId").val(data.CALLBCK_USR_ID);
				$("#cmscsp_tfRcvnUsr").show();
				$("#cmscsp_tfResvUsr").val(data.CALLBACK_USR_NM);
				$("#cmscsp_tfResvTelNo").show();
				$("#cmscsp_tfResvTelNo").width(130);
				$("#cmscsp_tfResvTelNo").css('text-align', 'center');
				$("#cmscsp_tfResvTelNo").val(data.CALLBCK_TEL_NO_FORMAT);
				// 조직도 팝업
				break;
			default:
				break;
			}
				
			if(tcktId != ""){
				//청취용
				//$("#cmscsp_hidCallId").val(data.CALL_ID);
				if(!data.CALL_ID){
					$("#cmscsp_btnListenRec").hide();
				}
				
				if(data.MOD_CONT=="Y"){
					$("#cmscsp_btnCnslHistoryPopup ").show();  // 변경이력
				}
				
				var rec_param = data.RCV_DT+"|"+data.CALL_ID+"|"+data.CTI_LGN_ID;
				$("#cmscsp_hidCallId").val(rec_param);
				
				$("#cmscsp_refId").val(data.REF_ID);                                                                            // 참조ID
				$("#cmscsp_rcvDt").html(data.RCV_DT_FORMAT + " " + data.RCV_TM_FORMAT);                                         // 접수일시
				$("#cmscsp_custId").val(data.CUST_ID);
				$("#cmscsp_custNm").html(data.CUST_NM);                                                                         // 고객명
				$("#cmscsp_cstType").html(data.CST_TYPE_NM);                                                                    // 고객구분
			
				// 고객성향
				if (data.CST_COMP_NM2 != undefined && data.CST_COMP_NM2 != "") {
					$("#cmscsp_cstComp").css("color", "red");
					$("#cmscsp_cstComp").html(data.CST_COMP_NM + " > " + data.CST_COMP_NM2);
				} else {
					$("#cmscsp_cstComp").css("color", "black");
					$("#cmscsp_cstComp").html(data.CST_COMP_NM);                                                                    
				} 
				
				$("#cmscsp_callGbCd").val(data.CALL_GB_CD);
				$("#cmscsp_cntctInform").html(data.CNTCT_INFM);                                                          		// 연결전화번호
				$("#cmscsp_actTypeCd").val(data.ACT_TYPE_CD);                                                                   // 처리유형
				$("#cmscsp_oldActTypeCd").val(data.ACT_TYPE_CD);			
	
				$("#cmscsp_callTime").html(data.CALL_TIME);                                                                     // 통화시간			
				$("#cmscsp_tfCounselMemo").val(data.MEMO);                                                                      // 메모
				$("#cmscsp_crtDt").html(data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT);                                         // 등록일시
				//$("#cmscsp_crtUsrNm").html(data.CRT_DT_FORMAT + " " + data.CRT_TM_FORMAT+ "<br>"+data.CRT_USR_NM);    		// 등록자
				$("#cmscsp_modDt").html("&nbsp; "+data.MOD_DT_FORMAT + " " + data.MOD_TM_FORMAT+ "<br>&nbsp; "+ data.MOD_USR_NM); // 최종수정
				//$("#cmscsp_modUsrNm").html(data.MOD_USR_NM);                                                                    // 최종수정자
				$("#cmscsp_chnlgb").html(data.CH_GB_NM);                                                                    	// 최종수정자
				$("#cmscsp_actStCd").val(data.ACT_ST_CD);                                                                       // 처리상태(상담결과)
				
				$("#cmscsp_gndr").html(data.GNDR);
				$("#cmscsp_agesCd").html(data.AGES_CD);
				$("#cmscsp_locYn").html(data.LOC_YN);
				$("#cmscsp_stayDuration").val(data.STAY_DRTN);
				
				//상담유형분류 
				//setSelectBoxWithCodeSync(data.INTV_EX_CD, data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);            		// 상담유형 object
				if(data.INTV_LG_CD==null || data.INTV_LG_CD==""){
					setSelectBoxWithCodeSync("all", data.INTV_MD_CD, data.INTV_SM_CD);          								// 상담유형 object
				}else{
					setSelectBoxWithCodeSync(data.INTV_LG_CD, data.INTV_MD_CD, data.INTV_SM_CD);      							// 상담유형 object
				}                
  
				// 긴급통화 코드  
				$("#cmscsp_tfCnslClaimant").val(data.RPT);
				$("#cmscsp_tfCnslClaimantPhoneNum").val(data.RPT_CNTCT_INFM);
				
				$("#cmscsp_rcvCont").val(data.RCV_CONT);
				$("#cmscsp_actCont").val(data.ACT_CONT);
				saveActStCd=data.ACT_ST_CD;
				
				$("#cmscsp_selCnslKeyWord").val(data.KEYWORDCD);
				
				//20.11.09
				if($("#cmscsp_cntctInform").html()=="" || $("#cmscsp_cntctInform").html().trim()==""){
					$("#btnTabCustSMS").hide();
				}else{
					$("#btnTabCustSMS").show();
				}
				
			}
			else
			{
				//$("#cmscsp_intvExCd").val("10000000").trigger("change")
                $("#cmscsp_intvLgCd").val("10000000").trigger("change")
				
			}
 
		} 
	});
	
	// 영상상담
	$("#cmscsp_tdVideo").empty();
	
	if($("#cmscsp_actTypeCd").val() == "010100"){
		$.ajax({
			type : "post",
			async : true,
			url : getContextPath() + "/ajax/main/getVideoInfo.do",
			data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==","Y2gwMTIuc2VsZWN0VmlkZW9DbnNs", { "tctk_id" : tcktId }),
			success : function(data)
			{
				data = JSON.parse(data);
				
				var str = "";
				
				for(var i=0; i<data.length; i++){
					str += "<div style = 'float: left; padding-right: 10px;'> ";
					str += "<a href='"+data[i].IMAGE_DIR+data[i].IMAGE_NAME+"' target='blank'>사진"+(i+1)+"</a>";
					str += "</div>";
				}
				
				$("#cmscsp_tdVideo").html(str);
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	
}

//조직도에서 사원 전화번호 클릭 이벤트
function usrTelClickTab(usrId, trnrType)
{
	if(usrId != "")
		trnrRcvnUsrNm(usrId, trnrType);
}

function trnrRcvnUsrNm(usrId, actTypeCd)
{
	$("#cmscsp_rcvnUsrId").val(usrId);
	switch(actTypeCd)
	{
		case "030100" :	// VOC 등록
		{
			/*
			// 상담사 정보를 얻어옴
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/getUserInfo.do",
				data : "pJson=" + getJsonStrComUserInfo(usrId),
				success : function(data)
				{
					if(data != null)
					{
						$("#cmscsp_rcvnUsr").val(data.USR_NM);
						rcvnCntNm = data.USR_NM;
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
			*/
			
			break;
		}
		case "040000" :	// 콜센터 이관
		{
			// 상담사 정보를 얻어옴
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/getUserInfo.do",
				data : "pJson=" + getJsonStrComUserInfo(usrId),
				success : function(data)
				{
					if(data != null)
					{
						$("#cmscsp_rcvnUsr").val(data.USR_NM);
						rcvnCallNm = data.USR_NM;
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
	
}

function btnDialing_clickEvent(type)
{
	if(type == 'R')
		confirm_resv(g_tell);
	else if(type == 'T')
		confirm_resv(g_call);
	else if(type == 'CB')
		confirm_callBack(g_callBckNum);
	else if(type == 'CR')
		confirm_callBack(g_callBckTelNum);
	else
		confirm_callBack(g_callBckAniNum);
	return;
}

function confirm_resv(phoneNum)
{
	if (confirm(phoneNum+"\n전화를 거시겠습니까?") == true)
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/main/resvExctYnUpdateList.do",
			data : "pJson=" + getJsonStrUpdateResvExctYn(),
			success : function(data)
			{
				phoneNum = phoneNum.replace(/[-,\s]/g,"");
				counselInitInfo();				
				if(document.title !="온누리콜센터")
				{
					opener.parent.resvCallSet($("#cmscsp_custId").val(), phoneNum, $("#cmscsp_tcktId").val(), document.title);
					self.close();
				}
				else
				{			
					resvCallSet($("#cmscsp_custId").val(), phoneNum, $("#cmscsp_tcktId").val(), document.title);
				}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
	else
	    return;
}

function confirm_callBack(phoneNum)
{	
	if (confirm(phoneNum+"\n전화를 거시겠습니까?") == true)
	{
		 
		if(document.title !="콜백이력")
		{ 
			var sStat=$("#cmscsp_AGENT_STATUS").val();
			if(sStat==""||sStat=="보류"||sStat=="통화중"||sStat=="3자통화"||sStat=="협의통화"){
				alert(sStat+" 상태에서는 전화연결을 할 수 없습니다."); 
				return ;
			}else if( sStat=="후처리" || sStat=="대기"
				   ||sStat=="준비"||sStat=="휴식"|| sStat == "식사"
				   || sStat=="교육"|| sStat=="기타" || sStat=="로그인" || sStat=="업무") {
					$("#cmscsp_AGENT_STATUS").val("업무");
					$("#cmscsp_labMainStatusNm").html("업무"); 
			}
		}else{
			var sStat=$("#cmscsp_AGENT_STATUS", opener.document).val();
			if(sStat==""||sStat=="보류"||sStat=="통화중"||sStat=="3자통화"||sStat=="협의통화"){
				alert(sStat+" 상태에서는 전화연결을 할 수 없습니다."); 
				return ;
			}else if( sStat=="후처리" || sStat=="대기"
				   ||sStat=="준비"||sStat=="휴식"|| sStat == "식사"
				   || sStat=="교육"|| sStat=="기타" || sStat=="로그인" || sStat=="업무") {
					$("#cmscsp_AGENT_STATUS", opener.document).val("업무");
					$("#cmscsp_labMainStatusNm", opener.document).html("업무"); 
			}
		}
		
		phoneNum = phoneNum.replace(/[-,\s]/g,"");

		if(document.title !="콜백이력")
		{
			callBackSet(phoneNum, $("#cmscsp_callBckId").val(), g_outTcktId);
		}
		else
		{
			opener.parent.callBackSet(phoneNum, $("#cmscsp_callBckId").val(), g_outTcktId);
			self.close();
		}

//		$.ajax({
//			type : "post",
//			dataType: "json",
//			async : true,
//			url : getContextPath() + "/ajax/main/updateTryInfo.do",
//			data : "pJson=" + getJsonStrUpdateTryCnt("call", "020000", "", ""),
//			success : function(data)
//			{
//				if(document.title !="콜백목록")
//				{
//					callBackSet(phoneNum, $("#cmscsp_callBckId").val());
//				}
//				else
//				{
//					opener.parent.callBackSet(phoneNum, $("#cmscsp_callBckId").val());
//					self.close();
//				}
//			},
//			error : function(data, status, err)
//			{
//				networkErrorHandler(data, status, err);
//			}
//		});
	}
	else
	    return;
}

function btnAcceptance_clickEvent()
{
	var firstTcktId = "";
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/resvUpdateList.do",
		data : "pJson=" + getJsonStrResvUpdateListPopup($("#cmscsp_tcktId").val()),
		success : function(data)
		{
			$.each(data, function(key, state)
			{				
				firstTcktId = state.TCKT_ID;
			});
			cnslSpecPopup(firstTcktId);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 접수 팝업
function cnslSpecPopup(tckt_id)
{
	window.sessionStorage.setItem("tcktId", tckt_id);
	
	var width = 1200;
	var height = 464;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/counselSpec.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "counselSpecPopup", option);
	newWindow.focus();
}

function resvCallStateUpdatePopup(tcktId, outTcktId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/actTypeCdUpdate.do",
		data : "pJson=" + getJsonStrActStUpdatePopup(tcktId, outTcktId),
		success : function(data)
		{
			suc + 1;
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function rcvnUsrClickEvent()
{
	window.sessionStorage.setItem("fromFlag", "fromMainTab");
	
	switch($("#cmscsp_actTypeCd").val().toString())
	{
		case "040000" :
		{
			window.sessionStorage.setItem("corpOpenType", "callCorp");
			break;
		}
		default:
			break;
	}
	
	openMenuPopup("CM0311");
}

//고객 정보 검색
function searchCustInfoTab()
{
	if($("#cmscsp_custId").val() != null || $("#cmscsp_custId").val() != "")
		window.localStorage.setItem("parentCustId", $("#cmscsp_custId").val());
		//window.sessionStorage.setItem("parentCustId", $("#cmscsp_custId").val());		
	else
		window.localStorage.setItem("parentCustId", "");
		//window.sessionStorage.setItem("parentCustId", "");
	
	window.sessionStorage.setItem("setCustInfoPopupType", "modal");
	window.sessionStorage.setItem("setCustInfoPopupSearchNm", "");
	window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", "");
	window.sessionStorage.setItem("setCustInfoType", "popup");
	
	var width = 1200;
	var height = 776;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/customerManage.do";
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "counselSpec", option);
	newWindow.focus();
	
	/*var custId = window.showModalDialog(paramURL, "modal", "dialogWidth:" + width + "px; dialogHeight:" + height + "px; center=yes; resizable=no; status=no; scroll=no; help=no; ");
	
	window.sessionStorage.setItem("parentCustId", "");
	
	if(custId != null)
		setCustInfoTab(custId);
	
	*/
}

function setCustPopInfo(custId)
{
	window.sessionStorage.setItem("parentCustId", "");
	
	if(custId != null)
		setCustInfoTab(custId);
}

//고객정보를 가져와 화면에 셋팅
function setCustInfoTab(custId)
{
	// 현재 연결되 발신번호로 등록되어 있는 고객의 정보를 가져옴
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/getCustInfo.do",
		data : "pJson=" + getJsonStrCustInfoTab(custId),
		success : function(data)
		{
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			
			if(jr != "")
			{
				$("#cmscsp_custId").val(jr[0].CUST_ID);
				$("#cmscsp_corpNm").html(jr[0].CORP_NM);
				$("#cmscsp_custNm").html(jr[0].CUST_NM);
				$("#cmscsp_cstType").html(jr[0].CST_TYPE_NM);
				$("#cmscsp_cstComp").html(jr[0].CST_COMP_NM);
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function comCounselMainReloadGridType()
{
	if(g_comGridType == "counsel")
	{
		// 메인화면 상담이력 탭 그리드 초기화
		$("#tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
		$("#tblCounselList").trigger("reloadGrid");
		// 상담이력 화면 그리드 초기화
		$("#cslist_tblCounselList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
		$("#cslist_tblCounselList").trigger("reloadGrid");
		counselInitInfo("list");
	}
	else if(g_comGridType == "resv")
	{
		$("#tblResvCallList").jqGrid("setGridParam", {postData : {pJson : getJsonStrResvCallList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
		$("#tblResvCallList").trigger("reloadGrid");
		counselInitInfo("list");
	}
	else
	{
		$("#clbkli_tblCallBackList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCallBackList(g_srchtype, g_srchval, g_srchDtType, g_usrId)}, page : 1, sortname : "CALLBCK_REQ_FORMAT", sortorder : "desc"});
		$("#clbkli_tblCallBackList").trigger("reloadGrid");
		callbackInitInfo();
		counselInitInfo("list");
	}
}

function counselButtonEvent()
{	
	$("#cmscsp_callbckBase").hide();
	$("#cmscsp_actTypeCd").bind("change", function(e)
	{
		$("#cmscsp_counselText").html("");
		$("#cmscsp_rcvnId").find("option:first").attr("selected", "selected");
		
		$("#cmscsp_tfResvDtm").hide();
		$("#cmscsp_rcvnUsr").hide();
		$("#cmscsp_rcvnId").hide();
		$("#cmscsp_resvTelText").html("");
		$("#cmscsp_tfResvTelNo").hide();
		$("#cmscsp_armText").html("");
		$("#cmscsp_armUseYn").html("");
		$("#cmscsp_tryDt").hide();
		$("#cmscsp_actCounselText").html("");
		$("#cmscsp_tfRcvnTeamNm").hide();
		$("#cmscsp_tfRcvnUsr").hide();
		$("#cmscsp_tfActCounselText").hide();
		
		$("#cmscsp_rdoCnslImmediate").hide();
		$("#cmscsp_rdoCnslSevenDays").hide();
		$("#cmscsp_labRdoCnslImmediateText").hide();
		$("#cmscsp_labRdoCnslSevenDaysText").hide();		
		
		$("#cmscsp_transfRsltText").html("");
		$("#cmscsp_rdoCnslYes").hide();
		$("#cmscsp_rdoCnslNo").hide();
		$("#cmscsp_labRdoYesText").hide();
		$("#cmscsp_labRdoNoText").hide();	
		
		//긴급정보
		$("#cmscsp_tfCnslClaimant").hide();
		$("#cmscsp_tfCnslClaimantPhoneNum").hide();
		$("#cmscsp_tfCnslClaimant").val("");
		$("#cmscsp_tfCnslClaimantPhoneNum").val("");
		
		$("#cmscsp_imgMainResvPhone").hide();
		
		$("#cmscsp_btnTransfCont").hide();
		$("#cmscsp_rcvCont").css('height', '173px');
		$("#cmscsp_actCont").css('height', '173px');
		$("#cmscsp_trnrMinCont").hide();
		
		$("#cmscsp_TrMinwonProcStatus").hide();
		$("#cmscsp_minwonProcDeptInfo").hide();
		$("#cmscsp_minwonProcCont").hide();
		$("#cmscsp_minwonRtnCont").hide();
		
		$("#cmscsp_cnslCopyCnslRcvCont").hide();
		$("#cmscsp_cnslCopyTransferCont").hide();
				
		var actTypeCd=$("#cmscsp_actTypeCd").val().toString();
		//재설정 안함 
		//if(actTypeCd!="010000"){
		//	$("#cmscsp_intvExCd").val("10000000").trigger("change");
		//}
		
		$("#cmscsp_tdkeyword").html("");
		$("#cmscsp_selCnslKeyWord").show();
		$("#cmscsp_star_rating").hide();
		
		// 영상상담을 위한 colspan
//		$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(4,5).css("display","");
//		$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(3).attr("colspan",0);
		$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(2).html("");
		
		switch(actTypeCd)
		{
			case "010000" : // 일반
				break;
			case "010100" : // 영상상담
			{
//				$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(4,5).css("display","none");
//				$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(3).attr("colspan",2);
				$("#cmscsp_counselComTable tbody tr:eq(2) td").eq(2).html("이미지");
				break;
			}
			case "020000" : // 통화예약
			{
				$("#cmscsp_counselText").html("재통화일시");
				$("#cmscsp_tfResvDtm").show();
				$("#cmscsp_resvTelText").html("재통화번호");
				//$("#cmscsp_tfResvTelNo").width(100);
				$("#cmscsp_tfResvTelNo").show();
				$("#cmscsp_tfResvTelNo").css('text-align', 'left');
				$("#cmscsp_armText").html("알람/실행");
				$("#cmscsp_armUseYn").html(g_almYn);
				break;
			}
			case "030100" : // 민원이관
			{
				$("#cmscsp_counselText").html("처리기한");
				$("#cmscsp_actCounselText").html("민원인");
				$("#cmscsp_resvTelText").html("연락처");
				$("#cmscsp_transfRsltText").html("결과수신");
				
				
				$("#cmscsp_tfActCounselText").show();
				$("#cmscsp_tfResvTelNo").show();
				
				$("#cmscsp_rdoCnslImmediate").show();
				$("#cmscsp_rdoCnslSevenDays").show();
				$("#cmscsp_labRdoCnslImmediateText").show();
				$("#cmscsp_labRdoCnslSevenDaysText").show();

				$("#cmscsp_rdoCnslYes").show();
				$("#cmscsp_rdoCnslNo").show();
				$("#cmscsp_labRdoYesText").show();
				$("#cmscsp_labRdoNoText").show();				
				
				$("#cmscsp_btnTransfCont").show();
				transfSizeControl();
				
				$("#cmscsp_trnrMinCont").show();
				$("#cmscsp_cnslCopyCnslRcvCont").show();
				$("#cmscsp_cnslCopyTransferCont").show();
				
				//기존에 이관내역이 있으면 가져오고 없으면 변경변수 초기화
				var p_tcktId=$("#cmscsp_tcktId").val();
				if(p_tcktId!=""){
					fnSetMinwonInformation(p_tcktId,false);
				}
			
				var actSt=$("#cmscsp_actStCd").val(); // 완료 030400
				setActStat("cmscsp_actStCd", actSt);

				break;
			}
			case "030200" : // 호전환
			case "030300" : // 상담 후 호전환
			case "030500" : // 담당자 부재중
			{
				//$("#cmscsp_counselText").html("담당부서");
				$("#cmscsp_counselText").html("<button type='button' id='btnDept' class='button' onclick='btnDeptCick();'>담당부서</button>");
				$("#cmscsp_tfRcvnTeamNm").show();
				$("#cmscsp_resvTelText").html("전화번호");
				$("#cmscsp_tfResvTelNo").show();
				$("#cmscsp_actCounselText").html("담당자");
				$("#cmscsp_tfActCounselText").show();
				
				$("#cmscsp_tdkeyword").html("친절도");
				$("#cmscsp_selCnslKeyWord").hide();
				$("#cmscsp_star_rating").show();
				$("#cmscsp_star_rating").empty();
				$.ratePicker("#cmscsp_star_rating",{stars:0});	
				
				window.sessionStorage.setItem("fromFlag", "fromCounselSpec");
				window.sessionStorage.setItem("corpOpenType", "doCorp");
			//	openMenuPopup("CM0311");
				break;
			}
			case "040000" : // 콜백등록
			{
				$("#cmscsp_counselText").html("콜백대상");
				$("#cmscsp_tfRcvnUsr").show();
				$("#cmscsp_tfRcvnUsr").val(rcvnCallNm);
				$("#cmscsp_resvTelText").html("콜백번호");
				$("#cmscsp_tfResvTelNo").show();
				break;
			}
			case "050000" : // 콜백처리
			{
				$("#cmscsp_counselText").html("처리일시");
				$("#cmscsp_tryDt").show();
			}
			default:
				break;
		}
		rcvnCntNm = "";
		rcvnKtrNm = "";
		rcvnExtNm = "";
		rcvnCallNm = "";
	});
	
	$("#cmscsp_actStCd").bind("change", function(e)
	{
		setActStat(this.id, e.target.value);
	});
	
	$("#cmscsp_cnslMainProcSt, #cmscsp_cnslSubProcSt").bind("change", function(e)
	{
		setActStat(this.id, e.target.value);
	});
		
	$("#cmscsp_btnTransfCont").bind("click", btnTransfCont_clickEvent);

	//항목 복사
	$("#cmscsp_copyCnslAttach, #cmscsp_copyCnslAttach2").bind("click", function() {
		if(this.id=="cmscsp_copyCnslAttach"){
			//문의내용 => 이관내용
			copyCont("cmscsp_rcvCont","cmscsp_trnrMinCont","attach");
		}else{
			//답변내용 => 이관내용
			copyCont("cmscsp_actCont","cmscsp_trnrMinCont","insert","\n\n[답변내용 : ");
		}
	});	
	
	//내용삭제
	$("#cmscsp_deleteCnslCont").bind("click", function() {
		 copyCont("cmscsp_trnrMinCont","","delete");
	});
	
	$("#cmscsp_btnListenRec").bind("click", btnListenRec_clickEvent);
	$("#cmscsp_btnSmsSpec").bind("click", btnSmsSpec_clickEvent);
	$("#cmscsp_btnUpdate").bind("click", btnUpdate_clickEvent);
	//$("#cmscsp_btnJisikDbPopup").bind("click", btnJisikDbPopup_clickEvent);
	
	$("#cmscsp_btnCnslHistoryPopup").bind("click", btnCnslHistoryPopup_clickEvent);
	$("#cmscsp_btnMainHis, #cmscsp_btnSubHis").bind("click", btnTransfOverHist_clickEvent);
	
	$("#cmscsp_btnDelete").bind("click", btnDelete_clickEvent2);
	
	$("#cmscsp_btnTabCustSearch").bind("click", searchCustInfoTab);

	//테스트데이타확인 
	$("#cmscsp_rcvDtText").bind("click", testDataPopup);
	
	$("#cmscsp_custCompText").bind("click", testDataPopupParam);
	
	// 아웃바운드 버튼 클릭 이벤트
	$("#cmscsp_btnOutBoundCall").bind("click", function(e)
	{
		btnDialing_clickEvent('CB');
	});
	
	// 통화예약 전화걸기 버튼
	$("#cmscsp_imgMainResvPhone").bind("click", function(e) 
	{
		
	});
	
	$("#cmscsp_btnCnslMainDepartmentSearch").bind("click", function(e)
	{
		window.sessionStorage.setItem("fromFlag", "fromCounselSpec");
		window.sessionStorage.setItem("corpOpenType", "doMinwon");
		window.sessionStorage.setItem("deptType", "M");
		openMenuPopup("CM0311");
	});
	
	$("#cmscsp_btnCnslSubDepartmentSearch, #cmscsp_cnslSubUsr").bind("click", function(e)
	{
		if ($("#cmscsp_actStCd option:selected").val() == "030400") {
			return;
		};
		
		if ($("#cmscsp_tfCnslMainDepartment").val() == "") {
	    	alert('주관부서를 먼저 지정해야 합니다.');
	    	$("#cmscsp_cnslMainUsr").focus();
	   	} else if(e.target.id!="cnslSubUsr"){
			window.sessionStorage.setItem("fromFlag", "fromCounselSpec");
			window.sessionStorage.setItem("corpOpenType", "doMinwon");
			window.sessionStorage.setItem("deptType", "S");
			window.sessionStorage.setItem("mainDeptCd", $("#cmscsp_cnslMainDeptCd").val());
			openMenuPopup("CM0311");
	   	};
	});
	
	$("#cmscsp_callbckBase").bind("click", selectReqInfo);
	
	$("#cmscsp_lbCnslSpecTicketNum").bind("click", function()
	{
		if($("#cmscsp_lbCnslSpecTicketNum").html() != "")
		{
			window.clipboardData.setData("Text", $("#cmscsp_lbCnslSpecTicketNum").html());
			alert("복사되었습니다.");
		}
	});
	
	//문자발신 버튼 클릭 이벤트
	$("#cmscsp_btnSmsSend").bind("click", function()
	{
		window.sessionStorage.setItem("cnslSmsSendNum", g_call.replace(/-/gi, ""));
		window.sessionStorage.setItem("cnslSmsTcktId", $("#cmscsp_lbCnslSpecTicketNum").html());
		window.sessionStorage.setItem("cnslSmsCustId", $("#cmscsp_custId").val());
		openMenuPopup("CM0017");
	});
	
	//이관부서 클리어
	$("#cmscsp_cnslMainUsr, #cmscsp_cnslSubUsr").bind("dblclick", function(e)
	{
		var mainProst= $("#cmscsp_cnslMainProcSt").val();
		var subProst= $("#cmscsp_cnslSubProcSt").val();
		
//010100">콜센터대기
//010200">부서접수
//010300">담당자지정
//020100">담당자처리중
//020200">처리완료
//030100">담당자(재)지정요청
//030200">부서(재)지정요청
		
		var selectID=$(this).attr("id");
		if((selectID=="cmscsp_cnslMainUsr" && mainProst!="010100") || (selectID=="cmscsp_cnslSubUsr" && subProst!="010100")){
			alert("처리상태가 접수가 아닌경우 부서 수정이 제한됩니다.");
			return;
		}
		
		$(this).val("");
		if(selectID=="cmscsp_cnslMainUsr"){
			$("#cmscsp_cnslMainTeamCd").val("");                                          // 주관부서 팀코드
			$("#cmscsp_cnslMainDeptCd").val("");                                          // 주관부서 코드
			$("#cmscsp_cnslMainAffairUsrId").val("");                                  // 주관부서 서무 사용자ID
			$("#cmscsp_cnslMainAffairUsrNm").val("");                                  // 주관부서 서무 사용자명
			$("#cmscsp_cnslMainAffairTelNo").val("");               // 주관부서 서무 전화번호
			$("#cmscsp_cnslMainAffairMobile").val("");               //  주관부서 서무 휴대폰
			$("#cmscsp_tfCnslMainDepartment").val("");               // 
        }else if(selectID=="cmscsp_cnslSubUsr"){
			$("#cmscsp_cnslSubTeamCd").val("");                                            // 보조부서 팀코드
			$("#cmscsp_cnslSubDeptCd").val("");                                            // 보조부서 코드
			$("#cmscsp_cnslSubAffairUsrId").val("");                                    // 보조부서 서부 사용자ID
			$("#cmscsp_cnslSubAffairUsrNm").val("");                                    // 보조부서 서무 사용자명
			$("#cmscsp_cnslSubAffairTelNo").val("");                  // 보조부서 서무 전화번호   
			$("#cmscsp_cnslSubAffairMobile").val("");               // 보조부서 서무 휴대폰  
			$("#cmscsp_tfCnslSubDepartment").val("");               // 
        }
	});
	
	//SMS버튼추가 20.11.09
	$("#btnTabCustSMS").bind("click", btnTabCustSMS_clickEvent);
	$("#btnTabCustSMS").hide();
}

//$(function(){
//	$("#cmscsp_cnslMainUsr, #cmscsp_cnslSubUsr").focus(function(){
//		var selectid=this.id;
//		
//		var mainProst= $("#cmscsp_cnslMainProcSt").val();
//		var subProst= $("#cmscsp_cnslSubProcSt").val();
//		
//		if((selectid=="cnslMainUsr" && mainProst!="010100") || (selectid=="cnslSubUsr" && subProst!="010100")){
//			alert("담당자 처리중으로 수정할 수 없습니다");
//			$("#cmscsp_"+selectid).blur();
//			return;
//		}
//	});
//}) 

// 부서 찾기
$(function(){
	var selectid;
	var selIdSeq;
    $("#cmscsp_cnslMainUsr, #cmscsp_cnslSubUsr").autocomplete({
    	position : {
//    		my : "left-500 top+4",
    		collision: "flip" 
    	},
        source : function( request, response ) {
        	if ($("#cmscsp_actStCd option:selected").val() == "030400") {
				return;
			};
			
        	selectid=$(this.element).prop("id");
        	
    		var mainProst= $("#cmscsp_cnslMainProcSt").val();
			var subProst= $("#cmscsp_cnslSubProcSt").val();
			
			if((selectid=="cmscsp_cnslMainUsr" && mainProst!="010100") || (selectid=="cmscsp_cnslSubUsr" && subProst!="010100")){
				alert("처리상태가 접수가 아닌경우 부서 수정이 제한됩니다.");
				return;
			};
				
         $.ajax({
                type: 'post',
                async : true,
                url: getContextPath() + "/ajax/main/getOrgDeptUser.do",
                dataType: "json",
                //request.term = $("#cmscsp_autocomplete").val()
                //data: { value : request.term },
                data : "pJson=" + getJsonOrgDeptUser_ccs(selectid),
                success: function(data) {
                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                    response(
                        $.map(data, function(item) {
                            return { 
                                label: (item.USERFULLNAME),
                                value: (item.ORGFULLNAME)+" > "+item.DISPLAYNAME,
                                hidVal: (item.UID_+"|"+item.OUCODE+"|"+item.PARENTOUCODE+"|"+item.SID+"|"+item.DISPLAYNAME+"|"+item.TELEPHONENUMBER+"|"+item.MOBILE)
                            };
                        })
                    );
                }
           });
        },
        //조회를 위한 최소글자수
        minLength: 2,
        select: function( event, ui ) {
        	var arItem=new Array();
        	var detpUser=ui.item.hidVal;
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	arItem=(ui.item.hidVal.toString()).split('|');
        	//alert(arItem[0]+":"+arItem[1]+":"+arItem[2]+":"+arItem[3]+":"+arItem[4]+":"+arItem[5]);
        	if(selectid=="cmscsp_cnslMainUsr"){
        		$("#cmscsp_tfCnslMainDepartment").val(detpUser);
				$("#cmscsp_cnslMainTeamCd").val(arItem[1]);                  // 주관부서 팀코드
				$("#cmscsp_cnslMainDeptCd").val(arItem[2]);                  // 주관부서 코드
				$("#cmscsp_cnslMainAffairUsrId").val(arItem[0]);             // 주관부서 서무 사용자ID
				$("#cmscsp_cnslMainAffairUsrNm").val(arItem[4]);             // 주관부서 서무 사용자명
				$("#cmscsp_cnslMainAffairTelNo").val(arItem[5]);             // 주관부서 서무 전화번호 
				$("#cmscsp_cnslMainAffairMobile").val(arItem[6]);             // 주관부서 서무 휴대폰 
	        }else if(selectid=="cmscsp_cnslSubUsr"){
	        	$("#cmscsp_tfCnslSubDepartment").val(detpUser);              // 
				$("#cmscsp_cnslSubTeamCd").val(arItem[1]);                   // 보조부서 팀코드
				$("#cmscsp_cnslSubDeptCd").val(arItem[2]);                   // 보조부서 코드
				$("#cmscsp_cnslSubAffairUsrId").val(arItem[0]);              // 보조부서 서부 사용자ID
				$("#cmscsp_cnslSubAffairUsrNm").val(arItem[4]);              // 보조부서 서무 사용자명
				$("#cmscsp_cnslSubAffairTelNo").val(arItem[5]);              // 보조부서 서무 전화번호   
				$("#cmscsp_cnslSubAffairMobile").val(arItem[6]);              // 보조부서 서무 휴대폰   
	        }
        },
       close: function () {
             //  alert($(this).attr("id"));
            	//$(this).val('');
       }
    });
}) 

function btnTabCustSMS_clickEvent(){
//	alert("SMS발신");
	var width = 900;
	var height = 890;
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + "/web/counsel/smsSend.do?tcktId="+$("#cmscsp_tcktId").val()+"&cntctInform="+$("#cmscsp_cntctInform").html();
//	var option = "width=" + width + ", height=" + height
//		+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
//		+ top + ",left=" + left +"";
//
//	var newWindow = window.open(paramURL, "SMS발신", option);
//	newWindow.focus();
	
	var newWindow = window.open(paramURL, "SMS발신", "resizable");
	newWindow.resizeTo(width,height);
	newWindow.focus();
}

function btnTransfCont_clickEvent(){
	//var fold= getCookie("trans>"); //쿠키사용 영구적
//	if(fold==">"){
//		setCookie("trans>", "<", 1000);
//	}else{
//		 
//		setCookie("trans>", ">", 1000);
//	}
	var foldtxt=$("#cmscsp_btnTransfCont").html();
	if(foldtxt=="이관내용&gt;"){
		$("#cmscsp_btnTransfCont").html("이관내용&lt;");
	}else{
		$("#cmscsp_btnTransfCont").html("이관내용&gt;");
	}
	
	transfSizeControl();
}

//부서팝업
function btnDeptCick(){
	window.sessionStorage.setItem("fromFlag", "fromCounselSpec");
	window.sessionStorage.setItem("corpOpenType", "doCorp");
	openMenuPopup("CM0311");
}

function transfSizeControl(){
			//var contSizeChk= getCookie("trans>");
			//var contSizeChk=$("#cmscsp_transfContSizeContinue").val();
	var contSizeChk=$("#cmscsp_btnTransfCont").html();
	
//			if(contSizeChk=="<"){
			if(contSizeChk=="이관내용&lt;"){
				$("#cmscsp_labTransfCont").html("&nbsp; &nbsp;");
				$("#cmscsp_btnTransfCont").html("이관내용&lt;");
				$("#cmscsp_TrMinwonProcStatus").show();
				$("#cmscsp_rcvCont").css('height', '60px');
				$("#cmscsp_actCont").css('height', '20px');
				$("#cmscsp_trnrMinCont").css('height', '25px');
				
				$("#cmscsp_minwonProcDeptInfo").show();
				$("#cmscsp_minwonProcCont").show();
				$("#cmscsp_minwonRtnCont").show();
			}
			else
			{
				$("#cmscsp_labTransfCont").html("<br><br>------------<br><br>");
				$("#cmscsp_btnTransfCont").html("이관내용&gt;");
				$("#cmscsp_TrMinwonProcStatus").hide();
				$("#cmscsp_rcvCont").css('height', '173px');
				$("#cmscsp_actCont").css('height', '82px');
				$("#cmscsp_trnrMinCont").css('height', '84px');
				
				$("#cmscsp_minwonProcDeptInfo").hide();
				$("#cmscsp_minwonProcCont").hide();
				$("#cmscsp_minwonRtnCont").hide();
				 
			}
}
	
	function testDataPopup(){
	var chk_cust_id = $("#cmscsp_tfCustId").val(); 
	var chk_tckt_id = $("#cmscsp_tfMainTicketId").val();
		if(g_popup=="CHILD"){
			alert( chk_cust_id+":"+chk_tckt_id+":"+ g_popup+":"+window.opener.g_arrObj_T[0]);
		}else{
			alert( chk_cust_id+":"+chk_tckt_id+":"+ g_popup+":"+g_arrObj_T[0]);
		}
	}
	
	function testGetTicketID(){
		var chk_cust_id = $("#cmscsp_tfCustId").val(); 
		var chk_tckt_id = $("#cmscsp_tfMainTicketId").val();
		if (confirm("TicketID를 생성하시겠습니까?") == true){    
				//확인
				fnGetTicketId();
			}else{
				if (confirm("TicketID를 삭제하시겠습니까?") == true){    
				//확인
					$("#cmscsp_tfMainTicketId").val("");
				}
				alert(chk_cust_id+":"+chk_tckt_id);
				//취소
			    return;
			}
	}
function completeVocInsertFromPopup()
{
	$("#cmscsp_actTypeCd").val("030100");
	$("#cmscsp_btnUpdate").trigger("click");
}


// 대중소 찾기
$(function(){
	var selectid;
	var selIdSeq;
    $("#cmscsp_tfLgMdSmSearch_02").autocomplete({
    	position : {
    		my: "left top", 
    		at: "left bottom"
//    		collision: "flip" 
    	},
        source : function( request, response ) {
//        	if ($("#cmscsp_actStCd option:selected").val() == "030400") {
//				return;
//			};
        	
        	selectid=$(this.element).prop("id");
        	arSelId=selectid.split('_');
        	selIdSeq=arSelId[1];
             $.ajax({
                    type: 'post',
                    async : true,
                    url: getContextPath() + "/ajax/main/getCodeList.do",
                    dataType: "json",
                    //request.term = $("#cmscsp_autocomplete").val()
                    //data: { value : request.term },
                    data : "pJson=" + getJsonCodeList(selectid),
                    success: function(data) {
   	 
                        //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                        response(
                            $.map(data, function(item) {
                            	
                                return { 
                                    //label: (item.XNAME+" > "+item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
                                    label: (item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
                                    value: $("#cmscsp_"+selectid).val(),
                                    //hidVal:  (item.XCODE+"|"+item.LCODE+"|"+item.MCODE+"|"+item.SCODE)
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
        	//var arItem=new Array(4);
            var arItem=new Array(3);
            // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
        	//alert(JSON.stringify(ui));
        	arItem=(ui.item.hidVal.toString()).split('|');
        	//alert(arItem[0]+":"+arItem[1]+":"+arItem[2]+":"+arItem[3]);
			/*
				$("#cmscsp_intvExCd").val(arItem[0]).trigger("change");
				$("#cmscsp_intvLgCd").val(arItem[1]).trigger("change");
				$("#cmscsp_intvMdCd").val(arItem[2]).trigger("change");
				$("#cmscsp_intvSmCd").val(arItem[3]);
			*/
        		$("#cmscsp_intvLgCd").val(arItem[0]).trigger("change");
        		$("#cmscsp_intvMdCd").val(arItem[1]).trigger("change");
        		$("#cmscsp_intvSmCd").val(arItem[2]);
        	 
        },
        focus : function() { // 포커스 자동 입력 해제
			return false;
		},
    });
})

// 공톨 이벤트
function comCounselSpecLoad(){
	g_popup=$("#cmscsp_POPUP").val();
	
	// common 에서 처리 해줌
	//setObjectSelectBoxWithCode2("intvExCd", "", "1", g_popup, "00000000", "10000000", "CHANGE");	// 상담유형 대분류 셋팅

	setObjectSelectBoxWithCode2("cmscsp_intvLgCd", "선택", "1", g_popup, "00000000", "", "CHANGE");	// 상담유형 대분류 셋팅
	setObjectSelectBoxWithCode2("cmscsp_intvMdCd", "선택", "2", g_popup, "", "", "CHANGE");	// 상담유형 대분류 셋팅
	setObjectSelectBoxWithCode2("cmscsp_intvSmCd", "선택", "3", g_popup, "", "", "CHANGE");	// 상담유형 대분류 셋팅
	//상담유형 대분휴
    //$("#cmscsp_intvExCd").bind("change", function(e) {
	$("#cmscsp_intvLgCd").bind("change", function(e) {
		var selval=e.target.value;
		//20.08.05
		setObjectSelectBoxWithCode2("cmscsp_intvMdCd", "", "1", g_popup, selval, "", "CHANGE");	// 상담유형 대분류 셋팅

		if(selval=="90000000"){
			if($("#cmscsp_actTypeCd").val()!="010000"){
				$("#cmscsp_actTypeCd").val("010000").trigger("change");
			}
			
			// 긴급통화 코드 
			$("#cmscsp_counselText").html("신고인");
			$("#cmscsp_resvTelText").html("신고인전화");
			$("#cmscsp_tfCnslClaimant").show();
			$("#cmscsp_tfCnslClaimantPhoneNum").show();
		}else{
			if($("#cmscsp_actTypeCd").val()=="010000"){
				console.log("010000:change");
				$("#cmscsp_actTypeCd").val("010000").trigger("change");
			}
		}
	});
/*
	$("#cmscsp_intvLgCd").bind("change", function(e) {
		setObjectSelectBoxWithCode2("intvMdCd", "선택", "3", g_popup, e.target.value, "", "");	// 상담유형 대분류 셋팅
	});

	$("#cmscsp_intvMdCd").bind("change", function(e) {
		setObjectSelectBoxWithCode2("intvSmCd", "선택", "4", g_popup, e.target.value, "", "");	// 상담유형 대분류 셋팅 
	});
	
*/

	//20.08.05
    $("#cmscsp_intvMdCd").bind("change", function(e) {
		setObjectSelectBoxWithCode2("cmscsp_intvSmCd", "", "2", g_popup, e.target.value, "", "CHANGE");	// 상담유형 대분류 셋팅
    });
}

function fnvalidate(obj)
{
 			if(typeof obj == "undefined" || obj == null || obj == '' || obj == "undefined") {
 				return false
 			}else{
 				return true;
 			}
 		
}
