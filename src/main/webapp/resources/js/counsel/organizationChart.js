var usr_id="";

// 글로벌 변수
var g_topFlag = false;
var g_mainFlag = false;
var g_counselSpecFlag = false;
var g_transferFlag = false;
var g_minwonFlag = "";
var g_mainDeptCd = "";

var corpOpenType = "";
var callType = window.sessionStorage.getItem("callType");
var fromFlag ="";

var gCurrentTab = "";

// 조회 조건 글로벌 변수
var gTfCallSrchVal = "";
var gTfExSrchVal = "";

// 고객지원팀_임시
var g_cntrFlag = "";

// 트리에서 선택 시 소속 정보 셋팅
var g_cntr_cd = "";
var g_team_cd = "";
var g_dept_cd = "64600000000";
var g_parent_cd = "";

// 상담DB 요청 
var g_Affair_chk = ""; 		// 서무 체크 변수
var g_ReqDb_DetpNm = "";	// 담당부서명
var g_ReqDb_DeptId = "";	// 담당부서코드
var g_ReqDb_UsrNm = "";		// 담당자명
var g_ReqDb_UsrId = "";		// 담당자ID
var g_ReqDb_OrgId = "";
var btn_Nm = "btnZip"
var zipcode="";

var isinitdivAdminAgencyTab = false;
var isinitdivCallCenterTab = false;
var isinitdivExternAgencyTab = false;

function goPopup(btnNm){
	tab_Nm  = btnNm;
//	var pop = window.open("/jusoPopup.jsp","pop","width=570,height=420, scrollbars=yes, resizable=yes");
//	var pop = window.open("http://www.juso.go.kr/","pop","width=570,height=420, scrollbars=yes, resizable=yes");
	var pop = window.open(getContextPath() + "/web/main/jusoPopup.do","pop","width=570,height=420, scrollbars=yes, resizable=yes");
}
function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn , detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm, buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo){
	
	if(tab_Nm =="btnZip"){
		zipcode=zipNo;
		$("#tfRd_nm_addr1").val(roadAddrPart1);
		$("#tfRd_nm_addr2").val(addrDetail);
	  }
	}

//파라미터 셋팅_getJsonResponsibleList
function getJsonResponsibleList()
{
	var loParam = {};
	
	if($("#tfSrchVal").val().trim() != "")
	{
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
			"map" : {
				"key" : "value",
				"tfCallSrchVal" : $("#tfSrchVal").val().trim(),
				"notuse" : false,
				"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
				"sord" : "asc",	
			}
		};
	}
	else
	{
		loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
			"map" : {
				"key" : "value",
				"or_cntr_cd" : g_cntr_cd == "" || g_cntr_cd == null ? "all" : g_cntr_cd,
				"or_team_cd" : g_team_cd == "" || g_team_cd == null ? "all" : g_team_cd,
				"or_dept_cd" : g_dept_cd == "" || g_dept_cd == null ? "all" : g_dept_cd,
				"notLowLev" : $("#chkNotLowLevDept").prop("checked"),
				"notuse" : false,
				"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
				"sord" : "asc",	
			}
		};
	}
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/**
 * 행정기관에 속한 사용자 목록 조회
 * 
 * @returns
 */
function getJsonAdminAgencyUserList() 
{
	fnAdminAgencyUserInfoInit();
	/*
	var deptId = "6500000";
	
	
	if($("#tfSrchOrgVal").val().trim() == "") {
		deptId = g_dept_cd;
	}else if( !$("#tfSrchOrgVal").val().trim() == "" && $(':radio[name="rdOrgGrupCd"]:checked').val() == "do" ){
		
		deptId = "6500000";
	}else{
		deptId = $(':radio[name="rdOrgGrupCd"]:checked').val();
	}
	
	

	*/
	
		loParam = {
				"qt" : "c2VsZWN0TGlzdA==",
				"mi" : "b20wNjEuYWRtaW5BZ2VuY3lVc2VyTGlzdA==",
				"map" : {
					"key" : "value",
					"deptId" : g_dept_cd,
					"notLowLev" : $("#chkNotLowLevDept").prop("checked"),
					/*"orgGrupCd" : $(':radio[name="rdOrgGrupCd"]:checked').val(),*/
					//"srchOrgVal" : $("#tfSrchOrgVal").val(),
					"srchType" : $(':radio[name="rdSearchGb"]:checked').val(),
					"affairs" : (g_minwonFlag != "" )? true : false, 
					"srchVal" : $("#tfSrchVal").val(),
					"affairsYn" : $("#chkAffairsYn").prop("checked"),
					"includeYn" : $("#chkIncludeYn").prop("checked"),					
					"notuse" : false
				}
		}
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 전체 엑셀화
function btnExcelAdminAgency_clickEvent(){
	excelDownLoad(getContextPath() + "/excel/counsel/organizationAdminAgency.do",getJsonAdminAgencyUserListExcel());
}

function getJsonAdminAgencyUserListExcel(){
			
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNjEuYWRtaW5BZ2VuY3lFeGNlbExpc3Q=",
			"map" : {
				"key" : "value",
				"deptId" : g_dept_cd,
				"notLowLev" : $("#chkNotLowLevDept").prop("checked"),
				/*"orgGrupCd" : $(':radio[name="rdOrgGrupCd"]:checked').val(),*/
				//"srchOrgVal" : $("#tfSrchOrgVal").val(),
				"srchType" : $(':radio[name="rdSearchGb"]:checked').val(),
				"affairs" : (g_minwonFlag != "" )? true : false, 
				"srchVal" : $("#tfSrchVal").val(),
				"affairsYn" : $("#chkAffairsYn").prop("checked"),
				"includeYn" : $("#chkIncludeYn").prop("checked"),
				"notuse" : false,
				"title" : "조직도_순천시청",
				"sidx" : $("#tblInCorp").getGridParam("sortname"),
				"sord" : $("#tblInCorp").getGridParam("sortorder"),
				// 2020.01.29 hhs 직책 컬럼 수정
//				"colWidth" : [80, 20, 20, 20, 20,20, 10, 80,50,12,10],
//				"colName" : ["ORGFULLNAME", "POSITION", "TITLEORPOSITION", "USR_ID", "DISPLAYNAME", "TELEPHONENUMBER", "CC_AFFAIRS_YN", "JOBTITLE","CC_RSPNSB","ISSIDOONLY","ISOTHER_NM"],
				"colWidth" : [40, 20, 20, 20, 20,20, 10, 80,50,12,10],
				"colName" : ["ORGFULLNAME", "POSITION", "TITLE", "USR_ID", "DISPLAYNAME", "TELEPHONENUMBER", "CC_AFFAIRS_YN", "JOBTITLE","CC_RSPNSB","ISSIDOONLY","ISOTHER_NM"],
				"colHeader" : ["전체부서명","직급","직책","사원아이디", "사용자명", "전화번호","서무","담당업무","추가업무명","임시조직여부","근무형태"],
				"colAlign" : ["center","center", "center", "center","center", "center", "center", "left", "left", "center", "center"]
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅_getJsonTeamList
function getJsonTeamList(parentCd) //여기2
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjAuYWRtaW5BZ2VuY3lMaXN0",   // 조직에 속한 하위 부서만 조회
		"map" : {
			"key" : "value",
			"parentCd" : parentCd == '0' ? null : parentCd,
			"g_cntrFlag" : '010000'
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 콜센터 사용자목록
 * 
 */
function getJsonCallUserList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0QWdlbnRMaXN0",
		"map" : {
			"key" : "value",
			"srchcc_val" : $("#tfCCSearchValue").val(),
			"srchcc_type" : $(':radio[name="rdSearchGb"]:checked').val(),
			"notuse" : false
		}
	};
	
	console.log(getDateTime() + " :: " + JSON.stringify(loParam));
	console.log(getDateTime() + " :: " + encodeURIComponent(JSON.stringify(loParam)));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/**
 * 외부기관 목록
 */
function getJsonExternAgentList(inst_gb)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNTUuc2VsZWN0RXh0ZXJuQWdlbnRMaXN0",
			"map" : {
				"key" : "value",
				"inst_gb" : inst_gb,
				"srchExternVal" : $("#tfSrchExtrnVal").val(),
				"srchExternType" : $(':radio[name="rdSearchGb"]:checked').val(),
				"useYn" : ($("input:checkbox[id='selUseYn']").is(":checked")==true)?"all":"Y"//$("#selUseYn").val()
			}
		}
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_CtiStatus
function getJsonStrCtiStatus()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y3dfY2luZTA0LmdldFVzckN0aVN0YXR1cw==",
		"map" : {
			"key" : "value"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 행정기관 담당자 수정
 * 
 * @returns
 */
function getJsonStrAdminAgencyUserUpdate() 
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNjEudXBkYXRlQWRtaW5BZ2VuY3lVc2Vy",
			"map" : {
				"key" : "value",
				"userId" : $("#adminAgencyUserId").val(),				
				"ccJobTitle" : $("#taTask").val(),				
				"login_usr_id" : window.sessionStorage.getItem("USR_ID")				
			}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 행정기관 담당자 삭제
 * window.sessionStorage.getItem("USR_ID")
 * 
 * @returns
 */
function getJsonStrAdminAgencyUserDelete() 
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNjEuZGVsZXRlQWRtaW5BZ2VuY3lVc2Vy",
			"map" : {
				"key" : "value",
				"userId" : $("#adminAgencyUserId").val(),
				"useYn" :  "N",
				"ccJobTitle" : $("#taTask").val(),
				"login_usr_id" : window.sessionStorage.getItem("USR_ID")
			}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
/**
 * 행정기관 담당자 추가
 * window.sessionStorage.getItem("USR_ID")
 * 
 * @returns
 */
function getJsonStrAdminAgencyUserInsert(usr_id) 
{
	if(usr_id==null||usr_id==""){
		usr_id=getDate().replace(/-/g, "")+"_"+getsecondTime();
	}else{
		usr_id=$("#nid").val();
	}
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNjEuaW5zZXJ0",
			"map" : {
				"key" : "value",
				"ORG_USR_ID" : usr_id,
				"DEPT_NM" : $("#txtDeptName").val(),
				"ORG_FUL_NM" : $("#txtFullDeptName").val(),
				"DTY_CD" : $("#txtDeptName").val(),
				"TEL_NO" : $("#txtTelNo").val(),
				"FAX_NO" : $("#txtFaxNo").val(),
				"RSPNSB" : $("#txtWorkName").val(),
				"USR_NM" : $("#txtUsrName").val(),
				"CC_RSPNSB" : $("#taTask").val(),
				"login_usr_id" : window.sessionStorage.getItem("USR_ID")
			}
		}
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
/**
 * 선택된 사용자 정보(행정기관 사용자)
 * 
 * @param usrId
 */
function getJsonStrAdminAgencyUserInfo(usrId) 
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuc2VsZWN0QWRtaW5BZ2VuY3lVc2VySW5mbw==",
		"map" : {
			"key" : "value",
			"userId" : usrId
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 선택된 사용자정보(콜센터 사용자)
 * 
 * @param userId
 * @returns
 */
function getJsonStrCallUserInfo(userId)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMDEuc2VsZWN0",
			"map" : {
				"key" : "value",
				"usr_id" : userId
			}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CtiStatusNm
function getJsonStrCtiStatusNm(cd)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDIuY29kZXNwZWM=",
		"map" : {
			"key" : "value",
			"tp_cd" : "90400",
			"cd" : cd
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
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

//파라미터 셋팅 사용자검색
function getJsonStrUsrCheck()
{

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuc2VsZWN0VXNlckNoZWNr",
		"map" : {
			"key" : "value",
			"uCheck" : $("#nid").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}



/**
 * 콜센터 사용자목록
 * 
 */
function getJsonCallUserList2(UsrType,usrName)
{
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0QWdlbnRMaXN0",
		"map" : {
			"key" : "value",
			"srchcc_val" : UsrType,
			"srchcc_type" : usrName,
			"notuse" : false
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


/**
 * 연락처 정보 가져오기
 */
function getJsonCh_Gb_CdList(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTUuY2hHYmNkTGlzdA==",
		"map" : {
			"key" : "value"
		}
	}
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


/**
 * 유관기관사용자 검색
 * 
 * @returns
 */
function getJsonStrExternAgentUsrSearch2(extAgentId) 
{
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTUuc2VsZWN0VXNyTGlzdFNlYXJjaA==",
		"map" : {
			"key" : "value",
			"extAgentId" : (extAgentId == '')?'' : extAgentId,
			"srchExternVal" : $("#tfSrchExtrnVal2").val(),
			"srchExternType" : $(':radio[name="rdSearchGb2"]:checked').val(),
			"useYn" : $("#selUseYn2").val()		
			
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/**
 * 현장출동 정보 등록
 * 
 * @returns
 */
function getJsonStrExternAgentInsert2(inst_gb){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNTUuaW5zZXJ0RXh0ZXJuQWdlbnRJbmZv",
		"map" : {
			"key" : "value",
			"post_no":zipcode,
			"corpNm" : $("#tfInst_nm2").val(),                      // 기관명
			"jobNm" : $("#tfRd_nm_addr12").val(),                	// 주소1
			"agentNm" : $("#tfRd_nm_addr22").val(),                 // 주소2
			"desc" : $("#tfMemo2").val(),                 		// 메모
			"useYn" : $("#tfUSE_YN2").val(),     			// 사용여부
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),//사용자ID
			"inst_gb":inst_gb
			
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//현장출동 수정
function getJsonStrExternAgentUpdate2(){
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNTUudXBkYXRlRXh0ZXJuQWdlbnRJbmZv",
		"map" : {
			"key" : "value",
			"corpNm" : $("#tfInst_nm2").val(),                       // 기관명
			"jobNm" : $("#tfRd_nm_addr12").val(),                    // 주소1
			"desc" : $("#tfRd_nm_addr22").val(),
			"agentNm" : $("#tfMemo2").val(),                 	 // 메모
			"useYn" : $("#tfUSE_YN2").val(),    			 // 사용여부
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),//사용자ID
			"extAgentId" : $("#extAgencyId2").val(),
			"post_no":zipcode
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/**
 * 현장출동대기자 정보 등록
 * 
 * @returns
 */
function getJsonStrUsrExternAgentInsert2(){
	
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wNTUuaW5zZXJ0VXNyQWdlbnRJbmZv",
			"map" : {
				"key" : "value",
				"EXT_AGN_ID" : window.sessionStorage.getItem("EXT_AGN_ID2"),							//외부기관ID
				"CH_GB_CD" : $("#selectTel12").val(),										//연락정보1
				"DEPT_NM" : $("#udept_nm2").val(),										//부서명
				"RSPN_PRSN" : $("#urspn_prsn2").val(),										//사용자명
				"JOB_NM" : $("#ujob_nm2").val(),										//업무명
				"CNTCT_INFM" : ($("#tfTelNo12").length==0 || $("#tfTelNo12").val() == null)?"":$("#tfTelNo12").val().replace(/-/g, ""),		//전화번호1
				"MEMO" : $("#umemo2").val(),											//메모
				"USE_YN" : $("#uuse_yn2").val(),										//사용여부
				"CRT_USR_ID" : window.sessionStorage.getItem("USR_ID"),								//생성 사용자
				"MOD_USR_ID" : window.sessionStorage.getItem("USR_ID"),								//수정 사용자
				
				"CH_GB_CD2" : $("#selectTel22").val(),												//연락정보2
				"CNTCT_INFM2" : ($("#tfTelNo22").length==0 || $("#tfTelNo22").val() == null)?"":$("#tfTelNo22").val().replace(/-/g, ""),	//연락정보2
				"CH_GB_CD3" : $("#selectTel32").val(),												//연락정보3
				"CNTCT_INFM3" : ($("#tfTelNo32").length==0 || $("#tfTelNo32").val() == null)?"":$("#tfTelNo32").val().replace(/-/g, ""),	//연락정보3
				
				"FAX_NO" : ($("#ufax_no2").length==0 || $("#ufax_no2").val() == null)?"":$("#ufax_no2").val().replace(/-/g, ""),		//팩스
				"EML_ADR" : $("#ueml_adr2").val()																							//이메일					
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}


//현장출동 사용자 수정 관리하는곳
function getJsonStrUsrAgentUpdate2(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNTUudXBkYXRlVXNyQWdlbnRVcGRhdGU=",   
			"map" : {
				"key" : "value",
				"DEPT_NM" : $("#udept_nm2").val(),																								//부서명
				"EXT_AGN_ID" : window.sessionStorage.getItem("EXT_AGN_ID2"),
				"JOB_NM" : $("#ujob_nm2").val(),																								//업무명
				"RSPN_PRSN" : $("#urspn_prsn2").val(),																							//사용자명
				"CH_GB_CD" : $("#selectTel12").val(),																							//연락정보1
				"CNTCT_INFM" : ($("#tfTelNo12").length==0 || $("#tfTelNo12").val() == null)?"":$("#tfTelNo12").val().replace(/-/g, ""),			//전화번호
				"MEMO" : $("#umemo2").val(),																									//메모
				"USE_YN" : $("#uuse_yn2").val(),																								//사용여부
				"MOD_USR_ID" : window.sessionStorage.getItem("USR_ID"),
				
				"CH_GB_CD2" : $("#selectTel22").val(),										//연락정보2
				"CNTCT_INFM2" : ($("#tfTelNo22").length==0 || $("#tfTelNo22").val() == null)?"":$("#tfTelNo22").val().replace(/-/g, ""),	//연락정보2
				"CH_GB_CD3" : $("#selectTel32").val(),											//연락정보3
				"CNTCT_INFM3" : ($("#tfTelNo32").length==0 || $("#tfTelNo32").val() == null)?"":$("#tfTelNo32").val().replace(/-/g, ""),	//연락정보3
				"EXT_AGN_USR_ID" : window.sessionStorage.getItem("EXT_AGN_USR_ID2"),
				"FAX_NO" : ($("#ufax_no2").length==0 || $("#ufax_no2").val() == null)?"":$("#ufax_no2").val().replace(/-/g, ""),	//팩스
				"EML_ADR" : $("#ueml_adr2").val()																					//이메일
			}
		};
	
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 콜센터 조회 버튼 클릭 이벤트
function btnCallSearch_clickEvent2() 
{
	$("#tblInCallCenter").jqGrid("setGridParam", { postData :  {pJson : getJsonCallUserList2($("#tfCCSearchValue").val(),$(':radio[name="rdSearchGb"]:checked').val())}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#tblInCallCenter").trigger("reloadGrid");
}

// 콜센터 초기화 버튼 클릭 이벤트
function btnCallInit_clickEvent() 
{
	$("#btnCallSelection").css("display","none");
	$("#txtUserId").html("");
	$("#txtTeamName").html("");
	$("#txtUserName").html("");
	$("#txtGradeName").html("");
	$("#txtMobileNo").html("");
	$("#txtCtiNo").html("");
	$("#txtPosName").html("");
	
	 $('input[name="rdSearchGb"]').removeAttr('checked');
	 $('input[name="rdSearchGb"]:radio[value="EXTNAME"]').prop('checked',true);


	$("#tfCCSearchValue").val("");
	$("#tfCallNum2").val("");
	
	var $tfSrchVal = $.trim($("#tfCallSrchVal").val());tblInCallCenter
//	$("#tblCallCorp").jqGrid("setGridParam", { postData :  {pJson : getJsonCallUserList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
//	$("#tblCallCorp").trigger("reloadGrid");
	$("#tblInCallCenter").jqGrid("setGridParam", { postData :  {pJson : getJsonCallUserList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
	$("#tblInCallCenter").trigger("reloadGrid");
	
}

function fnAdminAgencyUserInfoInit() 
{
	$("#adminAgencyUserId").val("");
	$("#txtFullDeptName").val("");
	$("#adminAgencyDeptCd").val("");
	$("#txtDeptName").val("");
	$("#txtUsrName").val("");
	$("#txtPositionName").val("");
	$("#txtJobPositionName").val("");
	$("#txtTempOrg").val("");
		
	$("#txtTelNo").val("");
	$("#tfCallNum1").val("");	
	$("#txtFaxNo").val("");
	
	$("#chkAffair").prop("checked", false);
	
	$("#txtWorkType").val("");
	$("#txtWorkName").val("");
	$("#taTask").val("");
	
	$("#txtApplyDt").html("");
	$("#txtApplyTm").html("");
	$("#txtModName").html("");
	$("#txtModDtm").html("");
	
	//$("#btnSelection").hide();
	$("#btnUpdate").hide();
	if(window.sessionStorage.getItem("USR_GRD_CD") == "090100"){
		$("#selJabDate").val(getDate());
		datePicker("#selJabDate");
		$("#selJabDate").show();
		$("#btnOrgBatch").show();
		$("#orgJobDtm").css( "visibility", "visible" ); //배치시간 hidden 20.05.27
	}else{
		$("#selJabDate").hide();
		$("#btnOrgBatch").hide();
		$("#orgJobDtm").css( "visibility", "hidden" ); //배치시간 hidden 20.05.27
	}
}

function fnAdminAgencyInit() 
{
	fnAdminAgencyUserInfoInit();
	
	$("#tblInCorp").jqGrid({
		url : getContextPath() + "/jqgrid/counsel/adminAgencyList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {
			pJson : getJsonAdminAgencyUserList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		// 2020.01.28 hhs 컬럼명 수정
//		colNames : ["사용자ID", "부서명", "기관/부서명", "담당", "직급",  "성명", "전화번호","휴대폰","FAX", "서무여부", "민원 사무분장", "콜센터 추가업무", "근무형태", 
		colNames : ["사용자ID", "부서명", "기관/부서명", "직책", "직급",  "성명", "전화번호","휴대폰","FAX", "서무", "민원 사무분장", "콜센터 추가업무", "근무형태", 
		            "OUCODE", "ORGFULLNAME", "ISSIDOONLY", "NID", "CRT_DT","CRT_TM","MOD_DTM","MOD_USR_ID","MOBILE"],
		colModel :
		[
		 	{name : "USR_ID", hidden : true},
		 	{name : "OU", align : "center", width:"110px" , hidden : true},
		 	{name : "ORGFULLNAME2", align : "center", width:"80px"},	
		 	// 2020.01.28 hhs 직책명
//		 	{name : "TITLEORPOSITION", align:"center", width:"80px", hidden : false},
		 	{name : "TITLE", align:"center", width:"30px", hidden : false},
		 	{name : "POSITION",index:"[POSITION]", align : "center", width:"45px"},		 	
		 	{name : "DISPLAYNAME", align : "center", width:"30px"},
		 	{name : "TELEPHONENUMBER", align : "center", width:"30px", formatter:getPhoneFormat2},
		 	{name : "MOBILE", align : "center", width:"80px", formatter:getPhoneFormat , hidden : true},
		 	{name : "FAX", align : "center", width:"80px", formatter:getPhoneFormat , hidden : true},
		 	{name : "CC_AFFAIRS_YN", align : "center", width:"10px"},
		 	{name : "JOBTITLE", align : "left", width:"200px"},
		 	{name : "CC_RSPNSB", align : "left", width:"100px" , hidden : true},		 	
		 	{name : "ISOTHER_NM", align : "center", width:"50px", hidden : true},
		 	{name : "OUCODE", hidden : true},
		 	{name : "ORGFULLNAME", hidden : true},
		 	{name : "ISSIDOONLY", hidden : true},
		 	{name : "NID", hidden : true},
		 	{name : "CRT_DT", hidden : true},
		 	{name : "CRT_TM", hidden : true},
		 	{name : "MOD_DTM", hidden : true},
		 	{name : "MOD_USR_ID", hidden : true},
		 	{name : "MOBILE", hidden : true},
		],
//		sortname : "OUCODE ASC, CC_AFFAIRS_YN DESC , DISPLAYNAME",
		sortname : "TELEPHONENUMBER",
		sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "357",
	   	width : "100%",
	   	rowNum : 13,
	   	rowList : [10, 20, 50, 100],
	   	autowidth : true,
	   	pager : "#pagingInCorp",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onPaging : function(pgButton)
	   	{
	   		fnAdminAgencyUserInfoInit();
	   	},
		onSelectRow : function(rowid) 
		{
			fnAdminAgencyUserInfoInit();

			var row = $("#tblInCorp").getRowData(rowid);
			
			if(g_mainFlag){
				callType==null?$("#btnSelection").hide():$("#btnSelection").show();
			}else if(g_counselSpecFlag){
				callType==null?$("#btnSelection").hide():$("#btnSelection").show();	
			}else if(g_transferFlag){
				callType==null?$("#btnSelection").hide():$("#btnSelection").show();
				$("#taTask").prop("disabled", true);
			}else if(window.sessionStorage.getItem("fromFlag")=="fromJisik" ||
					 window.sessionStorage.getItem("fromFlag")=="fromDB" ||
					 window.sessionStorage.getItem("fromFlag")=="fromJisikReword"||
					 window.sessionStorage.getItem("fromFlag")=="fromJisikDbManage"  
					 ){
				callType==null?$("#btnSelection").hide():$("#btnSelection").show();
			}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTV1" ||
					 window.sessionStorage.getItem("fromFlag")=="fromcswTV2" ||
					 window.sessionStorage.getItem("fromFlag")=="fromcswTA"  ||
					 window.sessionStorage.getItem("fromFlag")=="fromcswVA"  ||
					 window.sessionStorage.getItem("fromFlag")=="fromcswDA"){
				//callType==null?$("#btnSelection").hide():$("#btnSelection").show();
				$("#btnSelection").show();
			}else{
				$("#btnSelection").hide();
				if(window.sessionStorage.getItem("USR_GRD_CD") > "030100"){
					
					//수정
					//$("#btnUpdate").show();
					
					/*
					$("#btnUpdate").html("수정");
					//삭제
					$("#btnDelete").val();
					$("#btnDelete").show();
					//등록
					$("#btnInsert").hide();	
					*/
				}

			}
			
			var row = $("#tblInCorp").getRowData(rowid);
	   		
	   		
	   		var bAffair = (row.CC_AFFAIRS_YN == "Y") ? true : false;
			
			// 상담DB 요청 서무인지 체크
			g_Affair_chk = bAffair;
			if (bAffair == true) 
			{							
				g_ReqDb_DetpNm = row.OU;
				g_ReqDb_DeptId = row.OUCODE;
				g_ReqDb_UsrId = row.USR_ID;
				g_ReqDb_UsrNm = row.DISPLAYNAME;
					
				$("#btnReqDB").show();
			}
			else
			{
				g_ReqDb_DetpNm = "";
				g_ReqDb_DeptId = "";
				g_ReqDb_UsrId = "";
				g_ReqDb_UsrNm = "";	
				
				$("#btnReqDB").hide();
			}
			
			$("#adminAgencyUserId").val(row.USR_ID);
			$("#txtFullDeptName").val(row.ORGFULLNAME);
			$("#adminAgencyDeptCd").val(row.OUCODE);
			$("#txtDeptName").val(row.OU);
			$("#txtUsrName").val(row.DISPLAYNAME);
			$("#txtPositionName").val(row.POSITION);
			// 2020.01.28 hhs 직책명
//			$("#txtJobPositionName").val(row.TITLEORPOSITION);
			$("#txtJobPositionName").val(row.TITLE);
			$("#txtTempOrg").val(row.ISSIDOONLY);
			$("#txtAFFAIRS").val(row.CC_AFFAIRS_YN);
			var organ_txtTelNo = row.TELEPHONENUMBER.replace(/(<([^>]+)>)/gi, "");

			$("#txtTelNo").val(organ_txtTelNo);
			$("#tfCallNum1").val(organ_txtTelNo);	
			$("#txtFaxNo").val(row.FAX);
			$("#adminAgencyMobile").val(row.MOBILE);
			
			$("#chkAffair").prop("checked", bAffair);			
			
			(row.CC_AFFAIRS_YN == "Y") ? $("#mobile").html(row.MOBILE) : $("#mobile").html("") ;
			
			$("#txtWorkType").val(row.ISOTHER_NM);
			$("#txtWorkName").val(row.JOBTITLE);
			$("#taTask").val(row.CC_RSPNSB);
			
			$("#txtApplyDt").html(row.CRT_DT);
			$("#txtApplyTm").html(row.CRT_TM);
			$("#txtModName").html(row.MOD_USR_ID);
			$("#txtModDtm").html(row.MOD_DTM);
			
		},
		/*
		// 더블클릭시 전화연결 되는부분
		ondblClickRow: function (rowid, iRow, iCol, e) {
			if((window.sessionStorage.getItem("corpOpenType")=="doMinwon"&&window.sessionStorage.getItem("fromFlag")=="fromCounselSpec")||
			   (window.sessionStorage.getItem("corpOpenType")=="doMinwon"&&window.sessionStorage.getItem("fromFlag")=="fromMain")||
			    window.sessionStorage.getItem("fromFlag")=="fromJisik" ||
			    window.sessionStorage.getItem("fromFlag")=="fromDB" ||
			    window.sessionStorage.getItem("fromFlag")=="fromJisikReword"||
			    window.sessionStorage.getItem("fromFlag")=="fromJisikDbManage"||
			    window.sessionStorage.getItem("fromFlag")=="fromcswTV1" ||
				 window.sessionStorage.getItem("fromFlag")=="fromcswTV2" ||
				 window.sessionStorage.getItem("fromFlag")=="fromcswTA"  ||
				 window.sessionStorage.getItem("fromFlag")=="fromcswDA"	){//이관민원일 경우나 기타 다른 전화 기능이 필요 없는 경우
				$("#btnSelection").trigger("click");
			} else{
			var row = $("#tblInCorp").getRowData(rowid);
			var organ_tfCallNum1 = row.TELEPHONENUMBER.replace(/(<([^>]+)>)/gi, "");
			$("#tfCallNum1").val(organ_tfCallNum1);
			$("#btnCall1").trigger("click");
			}
		},
		*/
		gridComplete : function ()
		{
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/counsel/orgJobDtm.do",
				data : "pJson=" + getJsonOrgJobDtm(),
				success : function(data){
					if (data == null) {
						$("#orgJobDtm").html("최종 배치 시간 : '00:00:00'");
					} else {
						$("#orgJobDtm").html("최종 배치 시간 : " + data.END_DTM);
					}
				},
				error : function(data, status, err) {							
					networkErrorHandler(data, status, err);
				}
			});	
			
		},
	
	}).jqGrid("navGrid", "#pagingInCorp", {edit : false, add : false, del : false, search : false});
	
	fn_TeamList(g_cntrFlag);
}

//파라미터 셋팅_CustInfo
function getJsonOrgJobDtm(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b2gwNTAuam9iRGF0YQ==",
			"map" : {
				"key" : "value",
				"wrk_nm" : "PR_LDAPDATA",
				"proc_st_cd" : "030000"
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

function fnCallCenterUserInfoInit() 
{
	$("#txtUserId").html("");                                         // 사용자ID
	$("#txtUserName").html("");                                       // 사용자명
	$("#txtCtiNo").html("");                                          // 내선번호
	$("#txtTeamName").html("");                                       // 팀명
	$("#txtGradeName").html("");                                      // 등급
	$("#txtPosName").html("");                                        // 직급
	$("#txtTelNo").val("");                                          // 전화번호
	$("#txtMobileNo").html("");                                       // 휴대전화
	$("#txtStatus").html("");                                         // 상담
	
	$("#rdSrchCCGb_cn").prop("checked", true);                        // 초기 검색 조건
	
	$("#btnCallSelection").show();
}

//콜센터 초기화

function fnCallCenterInit() 
{
	fnCallCenterUserInfoInit();
	
	$("#tfCCSearchValue").bind("click", function(key) {
		if (key.keyCode == 13)
			$("#btnCallCenterSearch").trigger("click");
	});
	
	$("#btnCallSelection").hide();
	
	$("#tblInCallCenter").jqGrid({
		url : getContextPath() + "/ajax/counsel/CallAgentList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {
			pJson : getJsonCallUserList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["ID", "성명", "내선번호", "상담사상태", "팀", "등급", "직급", "CTI사용여부", "CTI_LOGIN_ID"],
		colModel :
		[
		 	{name : "USR_ID", align : "center", width : "200px"},
		 	{name : "USR_NM", align:"center", width : "200px"},
		 	{name : "EXTN_NO", align : "center", width : "200px", formatter:function (cellValue, options, rowdata, action){
		 	    return !cellValue?"":"<span style='text-decoration: underline; cursor:pointer;'>"+cellValue+"</span>";} },
		 	{name : "STATUS", align : "center", width : "200px"},
		 	{name : "TEAM_NM", align : "center", width : "200px"},
		 	{name : "USR_GRD_NM", align : "center", width : "165px"},
		 	{name : "DTY_NM", align : "center", width : "165px"},
		 	{name : "CTI_USE_YN", align : "center"},
		 	{name : "CTI_LGN_ID", align : "center", width : "100px"}
		],
		sortname : "USR_NM",
		sortorder : "asc",
		scroll : true,
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	height : "550",
	   	width : "100%",
	   	rowNum : "10000",
	   	autowidth : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onSelectRow : function(rowid) 
		{
			if(g_mainFlag){
				callType==null?$("#btnCallSelection").hide():$("#btnCallSelection").show();
			}else if(g_counselSpecFlag){
				callType==null?$("#btnCallSelection").hide():$("#btnCallSelection").show();
			}else if(g_transferFlag){
				callType==null?$("#btnCallSelection").hide():$("#btnCallSelection").show();
			}else if(window.sessionStorage.getItem("fromFlag")=="fromJisik" ||
					 window.sessionStorage.getItem("fromFlag")=="fromDB" ||
					 window.sessionStorage.getItem("fromFlag")=="fromJisikReword" 
					 ){
				callType==null?$("#btnCallSelection").hide():$("#btnCallSelection").show();
			}
			
			var selectUser = $("#tblInCallCenter").getRowData(rowid);
			
			$.ajax({
				type : "post",
				async : true,
				url : getContextPath() + "/ajax/counsel/adminAgencyUserInfo.do",
				data : "pJson=" + getJsonStrCallUserInfo(selectUser.USR_ID),
				success : function(data) {
					console.log(data);
					
					fnCallCenterUserInfoInit();
					
					var jr = JSON.parse(data);
					
					if (jr != null) {
						if (jr.length == 1) {
							$("#txtUserId").html(jr[0].USR_ID+" ("+jr[0].EXTN_NO+")");                                         // 사용자ID
							$("#txtUserName").html(jr[0].USR_NM);                                       // 사용자명
							$("#txtCtiNo").html(jr[0].CTI_LGN_ID);      
							$("#tfCallNum2").val(jr[0].EXTN_NO);                                   // 내선번호
							//$("#tfCallNum2").val(jr[0].CTI_LGN_ID);
							$("#txtTeamName").html(jr[0].TEAM_NM);                                      // 팀명
							$("#txtGradeName").html(jr[0].USR_GRD_NM);                                  // 등급
							$("#txtPosName").html(jr[0].DTY_NM);                                        // 직급
							$("#txtTelNo").val(getPhoneNumFormat(jr[0].TEL_NO));                       // 전화번호
							$("#txtStatus").html(jr[0].USR_ST_NM);                               // 상태
							
							var rowdata = $("#tblInCallCenter").getRowData(rowid);
							
							if(rowdata.STATUS!=jr[0].USR_ST_NM){
								$("#tblInCallCenter").setCell(rowid, "STATUS", jr[0].USR_ST_NM);
							}
							
							$("#txtMobileNo").html(getPhoneNumFormat(jr[0].CEL_NO));                    // 휴대전화
							$("#tfCallCenterTeamCd").val(jr[0].TEAM_CD);                                // 팀코드
							$("#tfCallCenterDeptCd").val(jr[0].DEPT_CD);                                // 부서코드
							$("#tfCtiLoginId").val(jr[0].CTI_LGN_ID);                                // 부서코드
							
							if(callType =="consult" || callType =="makecall"){
								$("#tfCallNum2").val(jr[0].EXTN_NO);
								//$("#tfCallNum2").val(jr[0].CTI_LGN_ID);
							}///호전환시 번호 저장
							// 사용여부
							if (jr[0].USE_YN == 'Y') {
								$("#rdUseYN_Y").prop("checked", true);
							} else {
								$("#rdUseYN_N").prop("checked", true);
							}
							
						}
					}
				}
			});
		},
		ondblClickRow: function (rowid, iRow, iCol, e) {
			var agentState=$("#txtStatus").html();
			if(agentState!="대기"){
				alert("상담사상태가 '대기'에 연결이 가능합니다.");
				return;
			}
			var row = $("#tblInCallCenter").getRowData(rowid);
			//var organ_tfCallNum2 = row.CTI_LGN_ID.replace(/(<([^>]+)>)/gi, "");
			var organ_tfCallNum2 = row.EXTN_NO.replace(/(<([^>]+)>)/gi, "");
			$("#tfCallNum2").val(organ_tfCallNum2);
			$("#btnCall2").trigger("click");
		},
		loadComplete : function (data) {
		    var ids = $("#tblInCallCenter").getDataIDs();
		    
		    $.each(ids, function(idx, rowId){
			var rowData= $("#tblInCallCenter").getRowData(rowId);
			if(rowData.STATUS=="대기"){
			    $("#tblInCallCenter").setRowData(rowId, false, {background:"rgba(210, 110, 185, 1)"});
			}	
		    })
		}
	});
}

/**
 * 외부기관 상세정보 그룹초기화
 */
function fnGroupExternAgencyAgentInfoInit() {
	$("#btnRelatedInsert").css("display","inline-block");
	$("#btnRelatedUpdate").css("display","none");
	
	fnUserExternAgencyAgentInfoInit();
	$("#btnExternSelection").hide(); //선택버튼
	$("#extAgencyId").val("");                              	// 외부기관ID
	$("#tfInst_nm").val("");                               		// 기관명
	$("#tfInst_url").val("");                               		// 기관명
	$("#tfRd_nm_addr1").val("");                               	// 주소1
	$("#tfRd_nm_addr2").val("");                               	// 주소2
	$("#tfMemo").val("");                               		// 메모
	$("#crt_dt").html("");                               		// 등록
	$("#mod_dt").html("");                               		// 수정
	$("#tfUSE_YN").val("Y");                               		// 사용여부
	//$("#tfInst_Url").val("");                               	// 유관기관 홈페이지
	$("#tblInExternAgeny").jqGrid("setGridParam", { postData :  {pJson : getJsonExternAgentList("")}, page : 1, sortname : "INST_NM", sortorder : "asc"});
	$("#tblInExternAgeny").trigger("reloadGrid");
}	



/**
 * 외부기관 초기화
 */
function fnExternAgencyInit() 
{
	fnGroupExternAgencyAgentInfoInit();
	
	$("#tfSrchExtrnVal").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			$("#btnExternSearch").trigger("click");
	});	
	
	$("#tblInExternAgeny").jqGrid({
		url : getContextPath() + "/jqgrid/counsel/ExternAgencyList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonExternAgentList("")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["기관명","URL","등록일자", "사용여부","EXT_AGN_ID","메모","외부기관코드","우편번호","사용여부2","작성자","수정일자","수정자","주소1","주소2"],
		colModel :
		[
		 	{name : "INST_NM", align : "center", width : "410px"},
		 	{name : "URL_NM", align:"center", width : "410px",
		 	    formatter:function (cellValue, options, rowdata, action){
		 	    return !cellValue?"":"<span style='text-decoration: underline; cursor:pointer;'>"+cellValue+"</span>";}
		 	},
		 	{name : "CRT_DT", align:"center", width : "210px"},
		 	{name : "USE_YN", align : "center", width : "120px"},
		 	{name : "EXT_AGN_ID", hidden : true},
		 	
		 	{name : "MEMO", hidden : true},
		 	{name : "INST_GB", hidden : true},
		 	{name : "POST_NO", hidden : true},
		 	{name : "USEYN", hidden : true},
		 	{name : "CRT_USR_ID", hidden : true},
		 	{name : "MOD_DT", hidden : true},
		 	{name : "MOD_USR_ID", hidden : true},
		 	{name : "RD_NM_ADDR1", hidden : true},
		 	{name : "RD_NM_ADDR2", hidden : true}
		],
		sortname : "INST_NM",
		sortorder : "asc",
		//scroll : true,
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	height : "350",
	   	width : "100%",
		rowNum : 13,
	   	rowList : [10, 20, 50, 100],
	  // 	rowNum : "10000",
	   	autowidth : true,
	   	pager : "#pagingInExternAgeny",
	   	rownumbers : true,	   
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onSelectRow : function(rowid) {
			
			var selectUser = $("#tblInExternAgeny").getRowData(rowid);
			
			$("#extAgencyId").val(selectUser.EXT_AGN_ID); 						 //외부기관ID
			$("#tfInst_nm").val(selectUser.INST_NM);        					 //기관명
			$("#tfInst_url").val(selectUser.URL_NM.replace(/(<([^>]+)>)/gi, ""));        		 //기관명
			$("#tfRd_nm_addr1").val(selectUser.RD_NM_ADDR1);       					 //주소          
			$("#tfRd_nm_addr2").val(selectUser.RD_NM_ADDR2);    					 //WNTH2              
			$("#tfMemo").val(selectUser.MEMO); 							 //ETC(기타)
			
			$("#crt_dt").html(selectUser.CRT_DT+" "+selectUser.CRT_USR_ID);				//작성일
			$("#mod_dt").html(selectUser.MOD_DT+" "+selectUser.MOD_USR_ID);				//수정일
			$("#tfUSE_YN").val(selectUser.USEYN);							//사용여부
			/*$("#tfInst_Url").val(selectUser.INST_URL);						//유관기관 홈페이지
*/			
			var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
			
			if(usrGrdCd == "030100" || usrGrdCd == "050100" || usrGrdCd == "090100") {
			    $("#btnRelatedUpdate").css("display","inline-block");
			    $("#btnRelatedInsert").css("display","none");    
			} else {
			    $("#btnRelatedUpdate").css("display","none");
			    $("#btnRelatedInsert").css("display","none");      
			}
			
			//사용자표시
			$("#tblInExternAgenyCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrExternAgentUsr(selectUser.EXT_AGN_ID)}, page : 1, sortname : "DEPT_NM", sortorder : "asc"});
			$("#tblInExternAgenyCode").trigger("reloadGrid");
			window.sessionStorage.setItem("EXT_AGN_ID",selectUser.EXT_AGN_ID);
			fnUserExternAgencyAgentInfoInit();
		},
		ondblClickRow: function (rowid, iRow, iCol, e) {
		    var row = $("#tblInExternAgeny").getRowData(rowid);
		    var paramURL = row.URL_NM.replace(/(<([^>]+)>)/gi, "");
		    var expUrl = /^http[s]?\:\/\//i;
		    
		    if(!expUrl.test(paramURL)){
			alert("유효하지 않은 URL 형식입니다.");
			return;
		    }
		    var newWindow = window.open(paramURL, "","scrollbars=yes, resizable=yes, menubar=yes, toolbar=yes, location=yes, status=yes, resizable=yes");
			newWindow.focus();
		}
	}).jqGrid("navGrid", "#pagingInExternAgeny", {edit : false, add : false, del : false, search : false});
}

// 내부 조회 버튼 클릭 이벤트
function btnSearch_clickEvent() 
{
	//console.log(gCurrentTab);
	
	
	/*if( $(':radio[name="rdOrgGrupCd"]:checked').val() == "do" ){
		
		g_dept_cd = "6500000";
	}else{
		g_dept_cd = $(':radio[name="rdOrgGrupCd"]:checked').val();
	}*/
	
	if (gCurrentTab == "adminAgency") {		
		$("#tblInCorp").jqGrid("setGridParam", { postData :  {pJson : getJsonAdminAgencyUserList()}, page : 1, sortname : "TELEPHONENUMBER", sortorder : "asc"});
		$("#tblInCorp").trigger("reloadGrid");
	}
	
}

// 등록 초기화버튼 이벤트
function btnReset_clickEvent(){
	
	//제이큐 그리드 초기화
	fnAdminAgencyInit();

	
	//등록내용 초기화
	$("#nid").val("");
	$("#txtFullDeptName").val("");
	$("#txtDeptName").val("");
	$("#txtUsrName").val("");
	$("#txtPositionName").val("");
	$("#txtTelNo").val("");
	$("#txtFaxNo").val("");
	$("#txtWorkName").html("");
	$("#taTask").html("");
	$("#txtApplyDt").html("");
	$("#txtApplyTm").html("");
	$("#txtModName").html("");
	$("#txtModDtm").html("");
	
	//버튼내용초기화
	/*
	$("#btnRest").show();
	$("#btnInsert").show();
	$("#btnUpdate").hide();
	$("#btnDelete").hide();
	$("#btnSelection").show();
	*/
	$("#btnUpdate").hide();
}

// 내부 초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
	 $('input[name="rdSearchGb"]').removeAttr('checked');
	 $('input[name="rdSearchGb"]:radio[value="ALL"]').prop('checked',true);
	 
	$("#tfCallNum1").val("");	 
	$("#tfSrchVal").val("");
	
	$("#tblInCorp").jqGrid("setGridParam", { postData :  {pJson : getJsonAdminAgencyUserList()}, page : 1, sortname : "TELEPHONENUMBER", sortorder : "asc"});
	$("#tblInCorp").trigger("reloadGrid");
	
	//기본내용 초기화
	$("#nid").val("");
	$("#txtFullDeptName").val("");
	$("#txtDeptName").val("");
	$("#txtUsrName").val("");
	$("#txtPositionName").val("");
	$("#txtTelNo").val("");
	$("#txtFaxNo").val("");
	$("#txtWorkName").html("");
	$("#taTask").html("");
	$("#tfSrchVal").val("");
	//$("#tfSrchOrgVal").val("");	
	$("#txtApplyDt").html("");
	$("#txtApplyTm").html("");
	$("#txtModName").html("");
	$("#txtModDtm").html("");
}


// 상담DB 팝업 요청 버튼 클릭 이벤트
function btnReqDB_clickEvent()
{
	//if($("#chkAffair").is(":checked")) {
	if(g_Affair_chk) {
		window.sessionStorage.setItem("setReqDbDetpNm", "");
		window.sessionStorage.setItem("setReqDbDeptId", "");
		window.sessionStorage.setItem("setReqDbUsrNm", "");
		window.sessionStorage.setItem("setReqDbUsrId", "");
		window.sessionStorage.setItem("setReqDbOrgId", "");
		
		window.sessionStorage.setItem("setReqDbDetpNm", g_ReqDb_DetpNm);
		window.sessionStorage.setItem("setReqDbDeptId", g_ReqDb_DeptId);
		window.sessionStorage.setItem("setReqDbUsrNm", g_ReqDb_UsrNm);
		window.sessionStorage.setItem("setReqDbUsrId", g_ReqDb_UsrId);	
		window.sessionStorage.setItem("setReqDbOrgId", g_ReqDb_OrgId);	
		
//		openMenuPopup("JS0001");
		opener.jisikRewordPopup();
	}
	else {
		alert('서무 담당자만 DB요청을 할 수 있습니다.');
	}
	
}

/**
 * 행정기관 조회
 * 하위부서 포함 CheckBox 선택시 처리
 */
function chkNotLowLevDept_clickEvent() 
{
	$("#tblInCorp").jqGrid("setGridParam", { postData :  {pJson : getJsonAdminAgencyUserList()}, sortname : "TELEPHONENUMBER", sortorder : "asc"});
	$("#tblInCorp").trigger("reloadGrid");
}

/* 배치실행 이벤트 */
function btnOrgBatch_clickEvent() {
	var tpCd = "97001";
	var cd = "SYNC";
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/consel/getCallSaeolSyncUrl.do",
		data : "pJson=" + getJsonStrCodeSpec(tpCd, cd),  
		success : function(data){
			var url = data.EXT1_CD;
			$.ajax({
				type : "post",
				dataType: "text",
				async : false,
				url : url,
				data : null,  
				success : function(data){
					alert("배치실행을 완료하였습니다.");
				},
				error : function(data, status, err) {
					alert("배치실행을 완료하지못하였습니다. 재실행하시기 바랍니다.");							
					networkErrorHandler(data, status, err);
				}
			});
		},
		error : function(data, status, err) {
			alert("배치실행을 완료하지못하였습니다. 재실행하시기 바랍니다.");							
			networkErrorHandler(data, status, err);
		}
	});
	
	/*
	if($("#selJabDate").val().trim() == ""){
		alert("배치시작일자를 입력하세요.");		
		return;
	}
	var jabDate = $("#selJabDate").val().replace(/-/gi, "");
	var loginID = window.sessionStorage.getItem("USR_ID");
	

	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/consel/callOrgBatch.do",
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
					btnSearch_clickEvent();
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
	*/						
				
	
}

// 배치실행
function callOrgBatch(jabDate, loginID){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwNTAuY2FsbE9yZ0JhdGNo",
			"map" : {
				"key" : "value",				
				"jabDate": jabDate,
				"loginID": loginID,
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}



//파라미터 셋팅_CustInfo
function getJsonOrgJobData(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b2gwNTAuam9iRGF0YQ==",
			"map" : {
				"key" : "value",
				"wrk_nm" : "PR_LDAPDATA"
			}
		};
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}


/**
 * 외부기관 조회 버튼 이벤트
 */
function btnExternSearch_clickEvent() 
{
	$("#tblInExternAgeny").jqGrid("setGridParam", { postData :  {pJson : getJsonExternAgentList("")}, page : 1, sortname : "INST_NM", sortorder : "asc"});
	$("#tblInExternAgeny").trigger("reloadGrid");
	
	if($("#tfSrchExtrnVal").val()!=""){
		$("#tblInExternAgenyCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrExternAgentUsrSearch((window.sessionStorage.getItem("EXT_AGN_ID")==null)?'':window.sessionStorage.getItem("EXT_AGN_ID"))}, sortname : "dept_nm", sortorder : "asc"});
		$("#tblInExternAgenyCode").trigger("reloadGrid");
	}
}



/**
 * 탭선택 이벤트
 */
function divCorpTab_clickEvent(event )
{
	var evId = event.target.id;
	
	//탭을 선택여부
	$("#divCorpTab > div").attr("class","").addClass("left_tab100_img_gray");
	$("#"+evId).attr("class","").addClass("left_tab100_img");
	$("#grid_all > div").css("display","none");//선택되지 않은 뷰를 제거
	$("#"+evId+"Tab").css("display","block");//선택된 뷰 출력
	
	switch (evId) {
		case "divAdminAgency":
			$("#rdSearchGb_al").prop("checked", true);
			//fnSetExternSelectionInfo($("#txtTelNo").val());
			//corpOpenType = "adminAgency";// 행정기관
	    	fnAdminAgencyInit();// 행정기관용자리스트 출력
			break;
		
		case "divCallCenter":
			$("#rdSrchCCGb_cn").prop("checked", true);
			//corpOpenType = "callCenter";//콜센터
	    	fnCallCenterInit();//콜센터 보여주기
	    	break;
		
		case "divExternAgency":
			$("#rdSearchGb_ec").prop("checked", true);
			$("#btnRelatedUpdate").css("display","none");
			
			$("#btnuUpdate").css("display","none");
			corpOpenType = "externAgency";//유관기관
	    	fnExternAgencyInit();//유관기관초기화(그리드뷰)
	    	fnExternAgencyUsrInit("");//외부기관 사용자
	    	//phoneSelect();
	    	
	    	/*setObjSelectBoxWithCode("selUseYn", "전체", "","CHILD","90007", "");*/
	    	
	    	$("#tfUSE_YN").val("Y");
	    	$("#uuse_yn").val("Y");
	    	
			break;
			
		default:
			break;
	}
}


// 전화걸기 이벤트  수정 20170706
function btnCall_clickEvent(){
	
	var num = this.id.replace(/[^0-9]/g,"");
	var tfCallNum = $("#tfCallNum"+num).val().replace(/-|(\s*)/g, "");
	if(tfCallNum == null || tfCallNum == ""){
		alert("전화번호를 입력해주세요.");
		$("#tfCallNum"+num).focus();
		return;
	}

//btnSelection   tfCallNum1
//btnCallSelection  tfCallNum2
//btnExternSelection  tfCallNum3
	
		if(callCheckandValInit()==1){
		  
			if(num=="1" && ($("#tfCallNum"+num).val()==$("#txtTelNo").val())){
					btnSelection_clickEvent(); // 행정기관
			}else if(num=="2" &&  ($("#tfCallNum"+num).val()==$("#txtCtiNo").html())){
					btnCallSelection_clickEvent(); // 콜센터
			}else if(num=="3" && ($("#tfCallNum"+num).val()==$("#tfTelNo1").val())){
					//위의 change안되서 이벤트 강제로 일으켜서 값을 바꿈
					fnSetExternSelectionInfo(tfCallNum); //외부기관
			}
		}else if(callCheckandValInit()==2){
			//통화 안됨
			return;
		}
	
	//=========
	var chkNum=areaNumber(tfCallNum,num);
	
	if(chkNum){
		if(num=="2"){
			window.opener.makeCall(chkNum,"popupOrg");  // 콜센터 전화번호 체크 안함
		}else{
			window.opener.makeCall(chkNum);  // 부모창의 함수를 호출
		}
		if(!g_topFlag){
			self.close();
		}
	}
}

function callCheckandValInit(){
	
	var sStat=$("#AGENT_STATUS", opener.document).val();
	if(sStat=="보류"||sStat=="통화중"){
		opener.window.sessionStorage.setItem("callType","consult");
	}else if( sStat=="후처리" || sStat=="대기"
		   ||sStat=="준비"||sStat=="휴식"|| sStat == "식사"
		   || sStat=="교육"|| sStat=="기타" || sStat=="로그인" || sStat=="업무") {
			$("#AGENT_STATUS", opener.document).val("업무");
			$("#labMainStatusNm", opener.document).html("업무");
		opener.window.sessionStorage.setItem("callType","makecall");
	}else if(sStat=="3자통화" || sStat=="협의통화") { 
		alert(sStat+" 상태에서는 전화연결을 할 수 없습니다.");
		console.log(sStat+" 상태에서는 전화연결을 할 수 없습니다.");
		return 2;
	}
	
	var calltype=opener.window.sessionStorage.getItem("callType"); // "consult" "makecall" 
	var fromFlag=opener.window.sessionStorage.getItem("fromFlag");
	var corpType=opener.window.sessionStorage.getItem("corpOpenType");

	if(corpType=="callCorp"){
			 g_topFlag=true; // 탑메뉴에서 호출됨 창을 닫지 않는다. 
	 }
	 //======== 협의버튼이면  메인화면 호전환으로 셋팅
	if((calltype=="consult"&&fromFlag=="fromTop")||(calltype=="consult"&&fromFlag=="fromMain")){
		g_mainFlag=true; //메인화면 셋팅
		
		//$("#selMainActtypecd", opener.document).val("030200").trigger("change"); //처리유형 호전환으로 셋팅 
		//위의 change안되서 이벤트 강제로 일으켜서 값을 바꿈
		  $("#btnShortcuts_04", opener.document).click();
		
		  $("#responsibleUsrId", opener.document).val("");  // 행정기관, 콜센터
		  $("#tfMainExtAgencyId", opener.document).val("");  // 외부기관
		  $("#tfManAccepted", opener.document).val("");
		  $("#tfMainOrganization", opener.document).val("");
		  $("#tfAcceptedPhoneNum", opener.document).val("");
		  $("#tfMainTrnrRcvTeamCd", opener.document).val("");
		  $("#tfMainTrnrRcvDeptCd", opener.document).val("");
		  
		  return 1;
	}else{
		return 0;
	}
		  
}

/**
 * 행정기관 정보수정
 */
function btnUpdate_clickEvent() 
{
	$.ajax({
		type : "post",
		aync : true,
		url : getContextPath() + "/ajax/counsel/adminAgencyUserUpdate.do",
		data : "pJson=" + getJsonStrAdminAgencyUserUpdate(),
		success : function(data) 
		{
			if (data != 0 ) {
				alert("수정되었습니다.");
				$("#tblInCorp").jqGrid("setGridParam", {postData : {pJson : getJsonAdminAgencyUserList()}, sortname : "TELEPHONENUMBER", sortorder : "asc"});
				$("#tblInCorp").trigger("reloadGrid");
			}
		}
	});
}

/**
 * 행정기관 사용자 사원번호 검색
 */
function btncheck_clickEvent() 
{
	if($("#nid").val()==null||$("#nid").val()==""){
		alert("사원번호를 입력해주세요.");
	}else{
		$.ajax({
			type : "post",
			aync : true,
			url : getContextPath() + "/ajax/counsel/usr_check.do",
			data : "pJson=" + getJsonStrUsrCheck(),
			success : function(data) 
			{
				if(data != 0 ){
					var jr = JSON.parse(data);
					if (jr != null) {
						if (jr.length == 1) {
							alert(jr[0].USR_NM+" 님이 사용하시는 번호입니다.");
							return;
						}
					}
				}
				alert("등록되지 않은 사원 번호입니다.\n사용하셔도  괜찮습니다.");
			}
		});
	  }
}
//현재 초
function getsecondTime() 
{
	var date = new Date();
	var ss = date.getSeconds();
	if (ss < 10)
		ss = "0" + ss;
	return ss;
}
/**
 * 행정기관 정보추가
 */

function btnInsert_clickEvent() 
{
	$.ajax({
		type : "post",
		aync : true,
		url : getContextPath() + "/ajax/counsel/adminAgencyUserInsert.do",
		data : "pJson=" + getJsonStrAdminAgencyUserInsert($("#nid").val()),
		success : function(data) 
		{
			if (data != 0 ) {
				alert("저장되었습니다.");
				$("#tblInCorp").jqGrid("setGridParam", {postData : {pJson : getJsonAdminAgencyUserList()}, sortname : "TELEPHONENUMBER", sortorder : "asc"});
				$("#tblInCorp").trigger("reloadGrid");
			}
		}
	});
}

/**
 * 행정기관 정보삭제
 */
function btnDelete_clickEvent() 
{
	if(confirm("삭제하시겠습니까?")){
	$.ajax({
		type : "post",
		aync : true,
		url : getContextPath() + "/ajax/counsel/adminAgencyUserUpdate.do",
		data : "pJson=" + getJsonStrAdminAgencyUserDelete(),
		success : function(data) 
		{
			if (data != 0 ) {
				alert("수정되었습니다.");
				$("#tblInCorp").jqGrid("setGridParam", {postData : {pJson : getJsonAdminAgencyUserList()}, sortname : "TELEPHONENUMBER", sortorder : "asc"});
				$("#tblInCorp").trigger("reloadGrid");
			}
		}
	});
	}
}

// 전화 아이콘 누르면 실행되는 이벤트
function telIcon_clickEvent(telNum, usrId, trnrType)
{
	if(window.sessionStorage.getItem("fromFlag") == "fromMain")
	{
		opener.parent.usrTelClick(telNum, usrId, trnrType);
		self.close();
	}
	else if(window.sessionStorage.getItem("fromFlag") == "fromTop")
	{
		opener.parent.usrTelClick(telNum, "", "");
		self.close();
	}
	else
	{
		opener.parent.usrTelClickTab(usrId, trnrType);
		self.close();
	}
}

// tel num delete
function txtTelNumDel_clickEvent() {
	$("#"+this.parentNode.id).remove();
}

//엑셀저장 버튼 클릭 이벤트
function btnExelSave_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/counsel/organizationChart.do", getJsonStrExternalCorpListExcel());
}

/**
 * 행정기관 화면에서 선택버튼 클릭시 처리
 */
function btnSelection_clickEvent(){
	
	var objInfo = new Object();
	objInfo.CATEGORY = "AA";                                   // 조직구분  - 행정기관 
	//objInfo.USR_ID = $("#nid").val();            // 사원번호
	objInfo.USR_ID = $("#adminAgencyUserId").val();            // 사용자ID
	objInfo.TEAM_NM = $("#txtDeptName").val();                // 팀명
	objInfo.TEAM_CD = "";                                      // 팀코드
	objInfo.DEPT_NM = $("#txtFullDeptName").val();           // 부서명
	objInfo.DEPT_CD = $("#adminAgencyDeptCd").val();           // 부서코드
	objInfo.USR_NM = $("#txtUsrName").val();                  // 사용자명
	objInfo.TEL_NO = $("#txtTelNo").val();                    // 전화번호
	objInfo.MOBILE = $("#adminAgencyMobile").val();          // 휴대폰
	objInfo.CC_AFFAIRS_YN = $("#txtAFFAIRS").val() == "Y" ? $("#txtAFFAIRS").val() : "N";			// 서무여부
	
	
	if (g_minwonFlag != "") {
		objInfo.GUBUN = g_minwonFlag;
	}
	
	if (g_transferFlag){
		opener.parent.fnManager(1,2,3);
		self.close();
	} else if (g_mainFlag){
		if (g_minwonFlag == 'S' && g_mainDeptCd == objInfo.DEPT_CD) {
			alert('주관부서로 선택된 부서를 보조부서로 선택할 수 없습니다.');
		} else {
			opener.fnSetTransferInfo(objInfo);
			g_mainDeptCd = "";
			if(!g_topFlag){
				self.close();
			}
		}
	} else if (g_counselSpecFlag) {
		if (g_minwonFlag == 'S' && g_mainDeptCd == objInfo.DEPT_CD) {
			alert('주관부서로 선택된 부서를 보조부서로 선택할 수 없습니다.');
		} else {
			opener.fnSetTransInfo(objInfo);
			g_mainDeptCd = "";
			self.close();
		}
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisik"){
		opener.fnSetOrgChartTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromDB"){
		opener.fnSetOrgRewordTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisikReword"){
		opener.fnSetOrgJisikRewordTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisikDbManage"){
		opener.fnSetOrgJisikDbManageTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTV1"){
		opener.fnSetOrgcswTV1Trans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTV2"){
		opener.fnSetOrgcswTV2Trans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTA"){
		opener.fnSetOrgcswTATrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswVA"){
		opener.fnSetOrgcswVATrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswDA"){
		opener.fnSetOrgcswDATrans(objInfo);
		self.close();
	}
	
	// 선택 버튼 안보이게
	$("#btnSelection").show();
	//$("#btnInsert").hide();
	
	if(window.sessionStorage.getItem("USR_GRD_CD") > "030100"){
	//	$("#btnUpdate").show();
	//	$("#btnDelete").show();
	//	$("#btnReset").show();
	}else{
		$("#btnUpdate").hide();
	//	$("#btnDelete").hide();
	//	$("#btnReset").hide();
	}
}

/**
 * 콜센터 화면에서 선택버튼 클릭시 처리
 */
function btnCallSelection_clickEvent() 
{
	var objInfo = new Object();
	objInfo.CATEGORY = "CC";
	objInfo.USR_ID = $("#txtUserId").html();                     // 상담사ID
	objInfo.USR_NM = $("#txtUserName").html();                   // 상담사명
	objInfo.TEAM_NM = $("#txtTeamName").html();                  // 팀명
	objInfo.TEAM_CD = $("#tfCallCenterTeamCd").val();            // 팀코드
	objInfo.DEPT_CD = $("#tfCallCenterDeptCd").val();            // 부서코드
//	objInfo.TEL_NO = $("#txtCtiNo").html();                      // 내선번호
	objInfo.TEL_NO = $("#tfCallNum2").val();                      // 내선번호
	objInfo.MOBILE = $("#tfCallCenterMobile").val();             // 휴대폰
	
	if (g_mainFlag) {
		opener.fnSetTransferInfo(objInfo);                           // 메인화면에 선택정보 설정
	} else if (g_counselSpecFlag) {
		opener.fnSetTransInfo(objInfo);
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisik"){
		opener.fnSetOrgChartTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromDB"){
		opener.fnSetOrgRewordTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisikReword"){
		opener.fnSetOrgJisikRewordTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisikDbManage"){
		opener.fnSetOrgJisikDbManageTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTV1"){
		opener.fnSetOrgcswTV1Trans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTV2"){
		opener.fnSetOrgcswTV2Trans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTA"){
		opener.fnSetOrgcswTATrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswVA"){
		opener.fnSetOrgcswVATrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswDA"){
		opener.fnSetOrgcswDATrans(objInfo);
		self.close();
	}
	
	if(!g_topFlag){
		self.close();
	}
}

/**
 * 외부기관 선택시 처리
 * 
 * @param telno
 */
function fnSetExternSelectionInfo(telno) 
{
//	if(!telno){
//		alert("전화번호가 존재하지 않습니다. 확인바랍니다.");
//		return;
//	}
	var objInfo = new Object();
	objInfo.CATEGORY = "EA";                                                        // 조직구분 - 외부기관
	objInfo.USR_ID = $("#hid_urspn_id").val();               
	objInfo.USR_NM = $("#urspn_prsn").val();                                    // 담당자명
	objInfo.TEAM_CD = "";
	objInfo.TEAM_NM = $("#udept_nm").val();                                 // 부서명
	objInfo.DEPT_CD = $("#hid_udept_id").val();  // $("#extAgencyId").val();   // 외부기관ID
	objInfo.TEL_NO = telno;
	objInfo.MOBILE = $("#extAgencyMobile").val();
	
	if (g_mainFlag) 
	{
		opener.fnSetTransferInfo(objInfo);
		if(!g_topFlag){
			self.close();
		}
	} else if (g_counselSpecFlag) {
		opener.fnSetTransInfo(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisik"){
		opener.fnSetOrgChartTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromDB"){
		opener.fnSetOrgRewordTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisikReword"){
		opener.fnSetOrgJisikRewordTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromJisikDbManage"){
		opener.fnSetOrgJisikDbManageTrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTV1"){
		opener.fnSetOrgcswTV1Trans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTV2"){
		opener.fnSetOrgcswTV2Trans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswTA"){
		opener.fnSetOrgcswTATrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswVA"){
		opener.fnSetOrgcswVATrans(objInfo);
		self.close();
	}else if(window.sessionStorage.getItem("fromFlag")=="fromcswDA"){
		opener.fnSetOrgcswDATrans(objInfo);
		self.close();
	}
}

function fn_TeamList(g_cntrFlag){ // 여기1
	$.jstree.destroy ();
	// 팀 리스트 트리 구조
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/counsel/teamUsrList.do",
		data : "pJson=" + getJsonTeamList('0'),
		success : function(data)
		{
			$("#listTeam").html("");			
			
			if(jr != '')
			{
				
				var jr = JSON.parse(data);
				
				// 조직도 부분 jstree 오류 수정 필요함
				$("#listTeam").jstree({ "core": { "data": jr, "multiple" : false } }).bind(
						"loaded.jstree", 
						function (event, data) {
								$("#listTeam").jstree("select_node", "#6500000"); 
//								$("#listTeam").jstree("open_node", "#6500000"); 
								$("#listTeam").jstree("open_node", "#48200000000"); 
//								$("#listTeam").jstree("open_all");
						}
				);
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	// tree node select event
	$("#listTeam").bind("select_node.jstree", function(event, data)
	{
		g_dept_cd = data.node.id; 
		g_parent_cd = data.node.parent;
				
		$("#tfSrchVal").val("");
		//$("#tfSrchOrgVal").val("");
		/*$('input[name="rdOrgGrupCd"]:radio[value="6500000"]').prop('checked',true);*/
		$('input[name="rdSearchGb"]:radio[value="ALL"]').prop('checked',true);
		
		data.instance.toggle_node(data.node);
		
		$("#tblInCorp").jqGrid("setGridParam", {postData : {pJson : getJsonAdminAgencyUserList()}, sortname : "TELEPHONENUMBER", sortorder : "asc"});
		$("#tblInCorp").trigger("reloadGrid");
	});	
}


function getPhoneFormat(cellValue, options, rowdata, action) 
{
	var formatString = fnGetTelNoFormat(cellValue);
	
	return formatString;
} 

function getPhoneFormat2(cellValue, options, rowdata, action) 
{
	var formatString = fnGetTelNoFormat(cellValue);

	return  "<span style='text-decoration: underline; cursor:pointer;'>"+formatString+"</span>";
} 

$(document).ready(function(){
	$("body").show();
	
	var ortabs = $("#search_el").tabs();
    ortabs.tabs({
		  activate : function (event, ui){
			  var id = ui.newPanel.attr('id');
			  initTabs(id);	
		  }
	});
    
	$("#tfSrchVal").focus();
	//setSelectBoxWithCode("selOrgGrupCd", "전체", "90905", "", "", "");	// 기관구분 셋팅 !!!코드확인하고 코드변경할것!!
	//setObjSelectBoxWithCode("selOrgGrupCd", "전체", "","CHILD", "90905", "");
	/*
	//모든 조직도 창에서 체크박스가 활성화 되도록 적용함  
	if (window.sessionStorage.getItem("corpOpenType") == "doMinwon" || window.sessionStorage.getItem("fromFlag") == "fromJisikReword" || window.sessionStorage.getItem("fromFlag") == "fromcswDA") { 
		$("#chkAffairsYn").prop("checked", true);  
		$("#chkAffairsYn").prop("disabled", true);
		$("#chkIncludeYn").prop("checked", true);  
		$("#chkIncludeYn").prop("disabled", true);
	}
	*/
	//상담DB요청에만 적용
/*	if (window.sessionStorage.getItem("fromFlag") == "fromJisikReword") { 
		$("#chkAffairsYn").prop("checked", true);  
	}
	*/
	// 기관구분이벤트
	/*$("input[name=rdOrgGrupCd]").change(function() {  
	   btnSearch_clickEvent();
	});*/ 
	
	// 배치실행 이벤트
	$("#btnOrgBatch").bind("click",btnOrgBatch_clickEvent);
	

	phoneSelect();//연락처
	
	//유관기관 전화번호 삭제1
	$("#delTel2").bind("click",remove_oneTel);
	
	//유관기관 전화번호 삭제2
	$("#delTel3").bind("click",remove_twoTel);

	//사원번호 검색
	$("#usrSeach").bind("click",btncheck_clickEvent);
	
	corpOpenType = window.sessionStorage.getItem("corpOpenType");
	gCurrentTab = "adminAgency";
	g_minwonFlag = "";

	fnAdminAgencyInit();
	
	// 콜센터 검색 버튼 클릭 이벤트 등록
	$("#btnCallCenterSearch").bind("click", btnCallSearch_clickEvent2);
	
	// 콜센터 초기화 버튼 클릭 이벤트 등록
	$("#btnCallCenterInit").bind("click", btnCallInit_clickEvent);
	
	// 콜센터 검색어 엔터 키 이벤트 등록
	$("#tfCCSearchValue").bind("keydown", function(key){
		if (key.keyCode == 13)
			btnCallSearch_clickEvent2();
	});
	
	$("#btnCallSelection").bind("click", btnCallSelection_clickEvent);
	
	// 내부 검색 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	// 내부 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	// 내부 검색어 엔터 키 이벤트 등록

	$("#tfSrchVal").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	/*	 
	$("#tfSrchVal, #tfSrchOrgVal").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	*/
	//DB요청 버튼 보이지 않게
	$("#btnReqDB").hide();
	
	//DB요청 버튼 클릭 이벤트 등록
	$("#btnReqDB").bind("click", btnReqDB_clickEvent);

	// 탭 이벤트 등록
	//$("#divCorpTab").bind("click", event, divCorpTab_clickEvent);
	
	// 전화걸기 이벤트 등록 수정 탭별 버튼 이벤트
	$("#btnCall1, #btnCall2, #btnCall3, #btnCall4").bind("click", btnCall_clickEvent);
	
	$("#btnUpdate").bind("click", btnUpdate_clickEvent);
	/*
	$("#btnDelete").bind("click", btnDelete_clickEvent);
	$("#btnInsert").bind("click", btnInsert_clickEvent);
	$("#btnReset").bind("click", btnReset_clickEvent);
	*/
	$("#btnExternSearch").bind("click", btnExternSearch_clickEvent);
	
	//	조직도 검색이나 기관 검색 버튼 클릭 시 세션 스토리지에 저장된 값을 불러와 어느 걸 먼저 보여줄 지 결정
	var corpOpenType = window.sessionStorage.getItem("corpOpenType");
	
	if (corpOpenType == "adminAgency"||corpOpenType == "doMinwon") {$('a[href="#divAdminAgencyTab"]').trigger("click");}//행정기관
	else if(corpOpenType == "callCenter"){$('a[href="#divCallCenterTab"]').trigger("click");}//콜센터
	else if(corpOpenType == "externAgency"){$('a[href="#divExternAgencyTab"]').trigger("click");}//외부기관
	
	// 상담접수 화면에서 접근 했는지 체크 (조직도)
	if(window.sessionStorage.getItem("fromFlag") == "fromTop"){
		$("#chkAffairsYn").prop('checked', false);
		
	}
	//민원이관
	if(window.sessionStorage.getItem("fromFlag") == "fromMain"){		
		g_mainFlag = true; 
	}
	//상담이력
	if(window.sessionStorage.getItem("fromFlag") == "fromCounselSpec"){
		g_counselSpecFlag = true;
		if(corpOpenType!="doMinwon"){ 
			$("#chkAffairsYn").prop('checked',false);		
		}
	}


	if(window.sessionStorage.getItem("fromFlag") == "fromTranster" || window.sessionStorage.getItem("fromFlag") == "fromTransterSec"){
		g_transferFlag = true;
		$("#chkAffairsYn").prop('checked', false);
	}
		
	if (window.sessionStorage.getItem("corpOpenType") == "doMinwon") {
		g_minwonFlag = window.sessionStorage.getItem("deptType");
		window.sessionStorage.setItem("deptType", "");
		g_mainDeptCd = window.sessionStorage.getItem("mainDeptCd");
		window.sessionStorage.setItem("mainDeptCd", "");
	}
	
	// 각 항목 선택 버튼 클릭 이벤트
	$("#btnSelection").bind("click", btnSelection_clickEvent );
	
	$("#btnExternSelection").bind("click", function(e) 
	{
		fnSetExternSelectionInfo($("#tfTelNo1").val());
	});
	
	$("#imgTelNo1").bind("click", function(e)
	{
		fnSetExternSelectionInfo($("#tfTelNo1").val());
	});
	
	$("#imgTelNo2").bind("click", function(e)
	{
		fnSetExternSelectionInfo($("#tfTelNo2").val());
	});
	
	$("#imgTelNo3").bind("click", function(e)
	{
		fnSetExternSelectionInfo($("#tfTelNo3").val());
	});
	
	// 선택 버튼 안보이게
	$("#btnSelection").show();
	$("#btnUpdate").hide();
	/*
	$("#btnDelete").hide();
	$("#btnInsert").show();
	$("#btnReset").show();
	*/
	// 통합센터장 이상만 엑셀 다운로드 가능
	if(window.sessionStorage.getItem("USR_GRD_CD") > "030100"){
		//$("#btnExcelDown").show(); 존재 하지 않는 버튼
		$("#btnExcel").show();
		$("#taTask").prop("disabled", false);
		/*
			$("#btnInsert,#btnReset").css("display","inline-block");
			$("#nid").prop("disabled", false);
			$("#txtFullDeptName").prop("disabled", false);
			$("#txtDeptName").prop("disabled", false);
			$("#txtUsrName").prop("disabled", false);
			$("#txtPositionName").prop("disabled", false);
			$("#txtTelNo").prop("disabled", false);
			$("#txtFaxNo").prop("disabled", false);
			$("#txtWorkName").prop("disabled", false);
			$("#taTask").prop("disabled", false);
			$("#usrSeach").css("display","inline-block");	
		*/
	}else{
		//$("#btnExcelDown").hide();
		$("#btnExcel").hide();
		//$("#btnInsert,#btnUpdate,#btnDelete,#btnReset").css("display","none");
		$("#btnUpdate").css("display","none");
	}
	
	// 하위부서 포함 체크박스 클릭 이벤트 등록
	$("#chkNotLowLevDept").bind("click", chkNotLowLevDept_clickEvent);
	
	// 전화걸기 키 이벤트 등록
	$("#tfCallNum").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
		{
			opener.parent.makeCall($("#tfCallNum").val().replace(/-/g, ""));
			self.close();
		}
	});
	
	// 전화걸기 전화번호 입력 부분 - 붙이는 이벤트 등록
	setPhoneNumFormat("tfCallNum");
	
	// 외부기관 전화번호 입력 부분 - 붙이는 이벤트 등록
	setPhoneNumFormat("tfTelNum");
	
	// 2차 상담사만 보기 버튼 클릭 이벤트
	$("#chkSecondCnslUsr").bind("click", function(e){
		$("#tblCallCorp").jqGrid("setGridParam", { postData :  {pJson : getJsonCallUserList(gTfCallSrchVal)}, page : 1, sortname : "USR_NM", sortorder : "asc"});
		$("#tblCallCorp").trigger("reloadGrid");
	});
	// Excel Down
	$("#btnExcel").bind("click", btnExcelAdminAgency_clickEvent);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------유동기관
	
	//var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	
	//if(usrGrdCd == "030100" || usrGrdCd == "050100" || usrGrdCd == "090100"){
	if(window.sessionStorage.getItem("USR_GRD_CD") > "030100"){
		$("#btnRelatedInsert").show();
		$("#btnRelatedUpdate").show();
		$("#btnRelatedReset").show();
		$("#btnuInsert").show();
		$("#btnuUpdate").show();
		$("#btnuReset").show();
		
	}else{
		$("#btnRelatedInsert").hide();
		$("#btnRelatedUpdate").hide();
		$("#btnRelatedReset").hide();
		$("#btnuInsert").hide();
		$("#btnuUpdate").hide();
		$("#btnuReset").hide();		
	}
	
	//유관기관 초기화 버튼
	$("#btnRelatedReset").bind("click",fnGroupExternAgencyAgentInfoInit);
	
	//유관기관 추가 버튼
	$("#btnRelatedInsert").bind("click",btnExternSave_clickEvent);
	
	//유관기관 수정 버튼
	$("#btnRelatedUpdate").bind("click", btnExternUpdate_clickEvent);
	
	//전화번호 추가시
	$("#btnaddCompany").bind("click", addCompany);
	
	//유명기관사용자 추가
	$("#btnuInsert").bind("click", btnUsrExternSave_clickEvent);
	
	//유관기관 사용자  수정
	$("#btnuUpdate").bind("click",btnusrUpdate_clickEvent);
	
	//유관기관사용자 초기화
	$("#btnuReset").bind("click", fnUserExternAgencyAgentInfoInit2);

	//유관열기
	$("#btn_url").bind("click", fnUserExternAgencyPopup);	
	
	//전체초기화
	$("#btnExternInit").bind("click", allInfoInit);
	
	//유관기관 엑셀 다운로드
	$("#btnExternExcelA").bind("click", btnExcelAgency_clickEvent);
	
	$("#btnCallCenterExcel").bind("click",btn_ExcelCallcenter);
	
	$("#btnZip").bind("click", function(){goPopup($(this).attr("id"))});
	
    initTabs("divAdminAgencyTab");

});

function initTabs(id){  
		switch(id){
		case "divAdminAgencyTab":
			if(isinitdivAdminAgencyTab == false){
				$("#rdSearchGb_al").prop("checked", true);
				//fnSetExternSelectionInfo($("#txtTelNo").val());
				//corpOpenType = "adminAgency";// 행정기관
				fnAdminAgencyInit();// 행정기관사용자리스트 출력
				isinitdivAdminAgencyTab=true;
				}
			break;
		case "divCallCenterTab":
			if(isinitdivCallCenterTab == false){ 
				$("#rdSrchCCGb_cn").prop("checked", true);
				//corpOpenType = "callCenter";//콜센터
				fnCallCenterInit();//콜센터 보여주기 
				isinitdivCallCenterTab=true;
				}
			break;
		case "divExternAgencyTab":
			if(isinitdivExternAgencyTab == false){
				$("#rdSearchGb_ec").prop("checked", true);
				//corpOpenType = "externAgency";//유관기관
				fnExternAgencyInit();//유관기관초기화(그리드뷰)
				fnExternAgencyUsrInit("");//외부기관 사용자
				isinitdivExternAgencyTab=true;
				}
			break;
		}
}

//유관기관 엑셀다운로드
function btnExcelAgency_clickEvent(){
	excelDownLoad(getContextPath() + "/excel/counsel/organizationSceneMove.do",getJsonExternAgencyUserListExcel("유관기관"));//
}

//유관기관
function getJsonExternAgencyUserListExcel(CH_GB_CD){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNTUuZXh0ZXJuQWdlbmN5TGlzdA==",
			"map" : {
				"key" : "value",
				"srchType" : $(':radio[name="rdSearchGb"]:checked').val(),
				"srchVal" : $("#tfSrchVal").val(),
				"inst_gb" : CH_GB_CD,
				"title" : "조직도_" + CH_GB_CD,
				"sidx" : $("#tblInExternAgenyCode").getGridParam("sortname"),
				"sord" : $("#tblInExternAgenyCode").getGridParam("sortorder")+", A.RSPN_PRSN ASC",
				"colWidth" : [30,40,40,40,50,20,20,30,30,30,40,40,40,40],
				"colName" : ["INST_NM","URL_NM","RD_NM_ADDR1", "RD_NM_ADDR2", "ETC", "DEPT_NM","RSPN_PRSN","JOB_NM","CNTCT_INFM","MEMO","CNTCT_INFM2","CNTCT_INFM3","FAX_NO","EML_ADR"],
				"colHeader" : ["기관명","URL","주소1","주소2","기타","부서명", "담당자", "업무명","전화번호","메모","전화번호2","전화번호3","팩스번호","이메일"],
				"colAlign" : ["center","center","center", "center", "center","center", "center", "center","center","center","center","center","center","center"]
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//유관기관 전체초기화
	function allInfoInit(){
		$("#btnExternSelection").hide();
		$("#tfCallNum3").val("");
		$("#selUseYn").attr('checked', false);
		window.sessionStorage.removeItem("EXT_AGN_USR_ID");
		window.sessionStorage.removeItem("EXT_AGN_ID");
		$("#tfSrchExtrnVal").val("");
		fnUserExternAgencyAgentInfoInit();
		fnGroupExternAgencyAgentInfoInit();
		 $('input[name="rdSearchGb"]').removeAttr('checked');
		 $('input[name="rdSearchGb"]:radio[value="INST_NM"]').prop('checked',true);
		 
		 $("#tblInExternAgeny").jqGrid("setGridParam", { postData :  {pJson : getJsonExternAgentList("")}, page : 1, sortname : "INST_NM", sortorder : "asc"});
			$("#tblInExternAgeny").trigger("reloadGrid");
			
			if($("#tfSrchExtrnVal").val()!=""){
				$("#tblInExternAgenyCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrExternAgentUsrSearch((window.sessionStorage.getItem("EXT_AGN_ID")==null)?'':window.sessionStorage.getItem("EXT_AGN_ID"))}, sortname : "dept_nm", sortorder : "asc"});
				$("#tblInExternAgenyCode").trigger("reloadGrid");
			}
	}


function btn_ExcelCallcenter(){
	excelDownLoad(getContextPath() + "/excel/counsel/organizationCellcenterUserListExcel.do",getJsonCellcenterUserListExcel());
}
function getJsonCellcenterUserListExcel(){
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMDEuc2VsZWN0QWdlbnRMaXN0",
			"map" : {
				"key" : "value",
				"srchcc_val" : $("#tfCCSearchValue").val(),
				"srchcc_type" : $(':radio[name="rdSearchGb"]:checked').val(),
				"title" : "조직도_콜센터",
				"notuse" : false,
				"colWidth" : [40, 12, 20, 20,20,80,50,10],
				"colName" : ["USR_ID", "USR_NM", "EXTN_NO", "STATUS", "TEAM_NM","USR_GRD_NM","DTY_NM","CTI_USE_YN"],
				"colHeader" : ["아이디","성명","내선번호", "상담사상태", "팀","등급","직급","CTI사용여부"],
				"colAlign" : ["center","center", "center", "center","center", "center", "center", "center"]

			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//----------------------------------------------------------------------------------------유관기관

//유관기관연락처 제어컨트롤
function phoneSelect(){
	//select
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/user/userList.do",
	    data : "pJson=" + getJsonCh_Gb_CdList(),
	    success : function(data)
	    {
	     
	     // param값을 JSON으로 파싱
	     var value = "";
	     value += "<option value='all'>전체</option>";
	     
	     $.each(data, function(key, state){
	      if(state.CD<12000) //문자보다 다 작아야 함
	       value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
	     });
	    
	     //전화번호 1
	     $("#selectTel1").append(value);
	     $("#selectTel1").val("all");
	    },
	    error : function(data, status, err) 
	    {
	    	alert("연락정보 리스트를 불러오지 못합니다\n담당자에게 문의해주세요.");
	    }
	   });
}



/**
 * 유관기관정보 조회
 * 
 * @returns
 */
function getJsonStrExternAgentInfo(extAgentId) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTUuc2VsZWN0RXh0ZXJuQWdlbnRJbmZv",
		"map" : {
			"key" : "value",
			"extAgentId" : extAgentId
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


/**
 * 유관기관 저장 버튼 클릭
 */
function btnExternSave_clickEvent(){
    $.ajax({
	type : 'post',
	async : true,
	url : getContextPath() + "/ajax/counsel/externAgentInsert.do",
	data : "pJson=" + getJsonStrExternAgentInsert("유관기관"),
	success : function(data) {
	    if(data != 0){
		alert('저장되었습니다.');
		$("#tblInExternAgeny").jqGrid("setGridParam", { postData :  {pJson : getJsonExternAgentList("")}, page : 1, sortname : "INST_NM", sortorder : "asc"});
		$("#tblInExternAgeny").trigger("reloadGrid");
		fnGroupExternAgencyAgentInfoInit();
	    }
	}
    });	
}

/**
 * 외부기관 정보 등록
 * 
 * @returns
 */
function getJsonStrExternAgentInsert(inst_gb){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNTUuaW5zZXJ0RXh0ZXJuQWdlbnRJbmZv",
		"map" : {
			"key" : "value",
			"post_no":zipcode,
			"corpNm" : $("#tfInst_nm").val(),                      		// 기관명
			"corpUrl" : $("#tfInst_url").val(),                      	// URL
			"jobNm" : $("#tfRd_nm_addr1").val(),                		// 주소1
			"agentNm" : $("#tfRd_nm_addr2").val(),                  	// 주소2
			"desc" : $("#tfMemo").val(),                 			// 메모
			"useYn" : $("#tfUSE_YN").val(),     				// 사용여부
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),	//사용자ID
			"inst_gb":inst_gb
			
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/**
 * 외부기관 수정 버튼 클릭
 */
function btnExternUpdate_clickEvent(){
    // Update
    $.ajax({
	type : 'post',
	async : true,
	url : getContextPath() + "/ajax/counsel/externAgentUpdate.do",
	data : "pJson=" + getJsonStrExternAgentUpdate(),
	success : function(data){
	    if(data != 0){
		alert('저장되었습니다.');
		$("#tblInExternAgeny").jqGrid("setGridParam", { postData :  {pJson : getJsonExternAgentList("")}, page : 1, sortname : "INST_NM", sortorder : "asc"});
		$("#tblInExternAgeny").trigger("reloadGrid");
		fnGroupExternAgencyAgentInfoInit();
	    }
	}
    }); 
}

//외부기관정보 수정
function getJsonStrExternAgentUpdate(){
	
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNTUudXBkYXRlRXh0ZXJuQWdlbnRJbmZv",
		"map" : {
			"key" : "value",
			"corpNm" : $("#tfInst_nm").val(), 			// 기관명
			"corpUrl" : $("#tfInst_url").val(),  			// URL
			"addr" : $("#tfRd_nm_addr1").val(),  			// 주소1
			"addrDt" : $("#tfRd_nm_addr2").val(), 			//주소2
			"memo" : $("#tfMemo").val(),                 		// 메모
			"useYn" : $("#tfUSE_YN").val(),    							// 사용여부
			"login_usr_id" : window.sessionStorage.getItem("USR_ID"),				// 사용자ID
			"extAgentId" : $("#extAgencyId").val(),
			"post_no":zipcode,
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------유관기관_사용자
/**
 * 유관기관 사용자 리스트
 */
function fnExternAgencyUsrInit(extAgentId){
	
	fnUserExternAgencyAgentInfoInit();
	
	setPhoneNumFormat("tfTelNo1");     // 전화번호1
	setPhoneNumFormat("tfTelNo2");     // 전화번호2
	setPhoneNumFormat("tfTelNo3");     // 전화번호3
	setPhoneNumFormat("ufax_no");     // 팩스번호
	
	$("#tfSrchExtrnVal").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			$("#btnExternSearch").trigger("click");
	});	
	
	$("#tblInExternAgenyCode").jqGrid({
		url : getContextPath() + "/ajax/counsel/ExternAgencyGroupUsr.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrExternAgentUsr(extAgentId)
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["부서담자자ID","부서명", "담당자", "업무명","메모","외부기관ID","채널구분코드","연락정보","사용여부","생성일자","수정일자","수정사용자ID","사용여부코드","생성사용자ID","팩스번호","이메일","채널구분코드2","연락정보2","채널구분코드3","연락정보3"],
		colModel :
		[
		 	{name : "EXT_AGN_USR_ID", hidden : true},
		 	{name : "DEPT_NM", align : "center", width : "300px"},
		 	{name : "RSPN_PRSN", align:"center", width : "250px"},
		 	{name : "JOB_NM", align : "left", width : "270px"},
		 	{name : "MEMO", align : "left", width : "200px"},
		 	{name : "EXT_AGN_ID", hidden : true},
		 	{name : "CH_GB_CD", hidden : true},
		 	{name : "CNTCT_INFM", hidden : true},
		 	{name : "USE_YN", hidden : true},
		 	{name : "CRT_DT", hidden : true},
		 	{name : "MOD_DT", hidden : true},
		 	{name : "MOD_USR_ID", hidden : true},
		 	{name : "USEYN", hidden : true},
		 	{name : "CRT_USR_ID", hidden : true},
		 	//------------------------------------- ?
		 	{name : "FAX_NO", hidden : true},
		 	{name : "EML_ADR", hidden : true},
		 	{name : "CH_GB_CD2", hidden : true},
		 	{name : "CNTCT_INFM2", hidden : true},
		 	{name : "CH_GB_CD3", hidden : true},
		 	{name : "CNTCT_INFM3", hidden : true},
		],
		sortname : "DEPT_NM",
		sortorder : "asc",
		scroll : true,
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	height : "350",
	   	width : "100%",
	   	rowNum : "10000",
	   	autowidth : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		onSelectRow : function(rowid) {
			
			if(g_mainFlag){
				callType==null?$("#btnExternSelection").hide():$("#btnExternSelection").show();
			}else if(g_counselSpecFlag){
				callType==null?$("#btnExternSelection").hide():$("#btnExternSelection").show();
			}else if(g_transferFlag){
				callType==null?$("#btnExternSelection").hide():$("#btnExternSelection").show();
			}else if(window.sessionStorage.getItem("fromFlag")=="fromJisik" ||
					 window.sessionStorage.getItem("fromFlag")=="fromDB" ||
					 window.sessionStorage.getItem("fromFlag")=="fromJisikReword" 
					 ){
				callType==null?$("#btnExternSelection").hide():$("#btnExternSelection").show();
			}
			
			//값 세팅
			var uEXT_AGN_USR_ID=$("#tblInExternAgenyCode").getCell(rowid, "EXT_AGN_USR_ID");
			var uEXT_AGN_ID=$("#tblInExternAgenyCode").getCell(rowid, "EXT_AGN_ID");
			var uDEPT_NM=$("#tblInExternAgenyCode").getCell(rowid, "DEPT_NM");
			var uRSPN_PRSN=$("#tblInExternAgenyCode").getCell(rowid, "RSPN_PRSN");
			var uJOB_NM=$("#tblInExternAgenyCode").getCell(rowid, "JOB_NM");
			var uMEMO=$("#tblInExternAgenyCode").getCell(rowid, "MEMO");
			var uCNTCT_INFM=$("#tblInExternAgenyCode").getCell(rowid, "CNTCT_INFM");
			var uCRT_DT=$("#tblInExternAgenyCode").getCell(rowid, "CRT_DT");
			var uMOD_DT=$("#tblInExternAgenyCode").getCell(rowid, "MOD_DT");
			var uMOD_USR_ID=$("#tblInExternAgenyCode").getCell(rowid, "MOD_USR_ID");
			var uCRT_USR_ID=$("#tblInExternAgenyCode").getCell(rowid, "CRT_USR_ID");
			var uUSEYN=$("#tblInExternAgenyCode").getCell(rowid, "USEYN");
			var uCH_GB_CD=$("#tblInExternAgenyCode").getCell(rowid, "CH_GB_CD");
			//----------------------추가정보
			var uFAX_NO=$("#tblInExternAgenyCode").getCell(rowid, "FAX_NO");
			var uEML_ADR=$("#tblInExternAgenyCode").getCell(rowid, "EML_ADR");
			var uCH_GB_CD2=$("#tblInExternAgenyCode").getCell(rowid, "CH_GB_CD2");
			var uCNTCT_INFM2=$("#tblInExternAgenyCode").getCell(rowid, "CNTCT_INFM2");
			var uCH_GB_CD3=$("#tblInExternAgenyCode").getCell(rowid, "CH_GB_CD3");
			var uCNTCT_INFM3=$("#tblInExternAgenyCode").getCell(rowid, "CNTCT_INFM3");
			
			var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
			
			if(usrGrdCd == "030100" || usrGrdCd == "050100" || usrGrdCd == "090100") {
			    $("#btnuInsert").css("display","none");
			    $("#btnuUpdate").css("display","inline-block");  
			} else {
			    $("#btnuInsert").css("display","none");
			    $("#btnuUpdate").css("display","none");      
			}
			
			
			
			window.sessionStorage.setItem("EXT_AGN_USR_ID",uEXT_AGN_USR_ID);
			//부서명
			$("#udept_nm").val(uDEPT_NM);
			$("#hid_udept_id").val(uEXT_AGN_ID);
			//담당자
			$("#urspn_prsn").val(uRSPN_PRSN);
			$("#hid_urspn_id").val(uEXT_AGN_USR_ID);
			//전화걸기
			$("#tfCallNum3").val(fnGetTelNoFormat(uCNTCT_INFM));
			//업무명
			$("#ujob_nm").val(uJOB_NM);
			//메모
			$("#umemo").val(uMEMO);
			//등록
			$("#ucrt_dt").html(uCRT_DT+" "+uCRT_USR_ID);
			//수정
			$("#umod_dt").html(uMOD_DT+" "+uMOD_USR_ID);
			//사용여부
			$("#uuse_yn").val(uUSEYN);
			
			//팩스
			$("#ufax_no").val(fnGetTelNoFormat(uFAX_NO));
			//이메일
			$("#ueml_adr").val(uEML_ADR);
			$("#selectTel1").val(uCH_GB_CD);
			//채널구분 1
			$("#tfTelNo1").val(fnGetTelNoFormat(uCNTCT_INFM));
			if(uCNTCT_INFM2!=""){
			//채널구분2
				$("#devlNo2").css("display","inline-block");
				$("#tfTelNo2").val(fnGetTelNoFormat(uCNTCT_INFM2));
				(uCH_GB_CD2 == "") ? $("#selectTel2").val("all") : $("#selectTel2").val(uCH_GB_CD2);
			}else{
				$("#devlNo2").css("display","none");
				$("#tfTelNo2").val("");
				$("#selectTel2").val("all");
			}
			if(uCNTCT_INFM3!=""){
			 //채널구분3
				$("#devlNo3").css("display","inline-block");
				$("#tfTelNo3").val(fnGetTelNoFormat(uCNTCT_INFM3));
				(uCH_GB_CD3 == "") ? $("#selectTel3").val("all") : $("#selectTel3").val(uCH_GB_CD3);
				
			}else{
				$("#devlNo3").css("display","none");
				$("#tfTelNo3").val("");
				$("#selectTel3").val("all");
			}
		},
		ondblClickRow: function (rowid, iRow, iCol, e) {
			var row = $("#tblInExternAgenyCode").getRowData(rowid);
			$("#tfCallNum3").val(row.CNTCT_INFM);
			$("#btnCall3").trigger("click");
		}
	});
}

/**
 * 유관기관사용자 조회
 * 
 * @returns
 */
function getJsonStrExternAgentUsr(extAgentId) 
{
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTUuc2VsZWN0VXNyTGlzdA==",
		"map" : {
			"key" : "value",
			"extAgentId" : (extAgentId == '')?'' : extAgentId,
					"srchExternVal" : $("#tfSrchExtrnVal").val(),
					"srchExternType" : $(':radio[name="rdSearchGb"]:checked').val(),
					"useYn" : ($("input:checkbox[id='selUseYn']").is(":checked")==true)?"all":"Y"//$("#selUseYn").val()		
			
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


/**
 * 유관기관사용자 검색
 * 
 * @returns
 */
function getJsonStrExternAgentUsrSearch(extAgentId) 
{
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTUuc2VsZWN0VXNyTGlzdFNlYXJjaA==",
		"map" : {
			"key" : "value",
			"extAgentId" : (extAgentId == '')?'' : extAgentId,
			"srchExternVal" : $("#tfSrchExtrnVal").val(),
			"srchExternType" : $(':radio[name="rdSearchGb"]:checked').val(),
			"useYn" : ($("input:checkbox[id='selUseYn']").is(":checked")==true)?"all":"Y"//$("#selUseYn").val()		
			
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//유관기관 전화번호 추가
var divid = 1;
var id=1;
var selectId=1;
function addCompany() {
	++id;
	
	//if (id >3) {
	if ($("#devlNo2").css("display") == "inline-block"&&$("#devlNo3").css("display") == "inline-block"){
		alert("3개 이상의 전화번호를 추가 할수 없습니다.");
		id=1;
		return;
	}
	if(id==3){
		$("#devlNo2").css("display","inline-block");
		
	}
	if(id==4){
		$("#devlNo3").css("display","inline-block");
	}
}


function remove_oneTel(){
	$("#devlNo2").css("display","none");
	$("#selectTel2").val("all");
	$("#tfTelNo2").val("");
    id=1;
}
function remove_twoTel(){
	$("#devlNo3").css("display","none");
	$("#selectTel3").val("all");
	$("#tfTelNo3").val("");
	id=2;
}

/**
 * 유관기관 저장 버튼 클릭
 */
function btnUsrExternSave_clickEvent(){

	if ($("#udept_nm").val().trim() == "" || $("#urspn_prsn").val().trim() == "")
	{
		alert("부서명, 담당자를 입력 해 주시기 바랍니다.");
		return;		
	}
	
	$.ajax({
			type : 'post',
			async : true,
			url : getContextPath() + "/ajax/counsel/externAgentInsert.do",
			data : "pJson=" + getJsonStrUsrExternAgentInsert(),
			success : function(data) {
				if(data != 0){
					alert('저장되었습니다.');
					
					$("#tblInExternAgenyCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrExternAgentUsr("")}, page : 1, sortname : "DEPT_NM", sortorder : "asc"});
					$("#tblInExternAgenyCode").trigger("reloadGrid");
					fnUserExternAgencyAgentInfoInit();
					
					//숨기기
					remove_oneTel();
					remove_twoTel();
				}
			}
		});	
	remove_oneTel();
	remove_twoTel();
}

/**
 * 외부기관사용자 정보 등록
 * 
 * @returns
 */
function getJsonStrUsrExternAgentInsert(){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNTUuaW5zZXJ0VXNyQWdlbnRJbmZv",
		"map" : {
			"key" : "value",
			"EXT_AGN_ID" : window.sessionStorage.getItem("EXT_AGN_ID"),																	//외부기관ID
			"CH_GB_CD" : $("#selectTel1").val(),																						//연락정보1
			"DEPT_NM" : $("#udept_nm").val(),																							//부서명
			"RSPN_PRSN" : $("#urspn_prsn").val(),																						//사용자명
			"JOB_NM" : $("#ujob_nm").val(),																								//업무명
			"CNTCT_INFM" : ($("#tfTelNo1").length==0 || $("#tfTelNo1").val() == null)?"":$("#tfTelNo1").val().replace(/-/g, ""),		//전화번호1
			"MEMO" : $("#umemo").val(),																									//메모
			"USE_YN" : $("#uuse_yn").val(),																								//사용여부
			"CRT_USR_ID" : window.sessionStorage.getItem("USR_ID"),																		//생성 사용자
			"MOD_USR_ID" : window.sessionStorage.getItem("USR_ID"),																		//수정 사용자
			
			"CH_GB_CD2" : $("#selectTel2").val(),	//연락정보2
			"CNTCT_INFM2" : ($("#tfTelNo2").length==0 || $("#tfTelNo2").val() == null)?"":$("#tfTelNo2").val().replace(/-/g, ""),		//연락정보2
			"CH_GB_CD3" : $("#selectTel3").val(),	//연락정보3
			"CNTCT_INFM3" : ($("#tfTelNo3").length==0 || $("#tfTelNo3").val() == null)?"":$("#tfTelNo3").val().replace(/-/g, ""),		//연락정보3
			
			"FAX_NO" : ($("#ufax_no").length==0 || $("#ufax_no").val() == null)?"":$("#ufax_no").val().replace(/-/g, ""),				//팩스
			"EML_ADR" : $("#ueml_adr").val()																							//이메일
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//유관기관 사용자 수정
function btnusrUpdate_clickEvent(){
	$.ajax({
	type : "post",
	aync : true,
	url : getContextPath() + "/ajax/counsel/adminRelatedGroupInsert.do",
	data : "pJson=" + getJsonStrUsrAgentUpdate(),
	success : function(data) 
	{
		if (data != 0 ) {
			alert("저장되었습니다.");
			$("#tblInExternAgenyCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrExternAgentUsr("")}, sortname : "dept_nm", sortorder : "asc"});
			$("#tblInExternAgenyCode").trigger("reloadGrid");
		}
		fnUserExternAgencyAgentInfoInit();
		
	},error : function(data, status, err) 
	{
		networkErrorHandler(data, status, err);
	}
	});
	remove_oneTel();
	remove_twoTel();
}

//유관기관 사용자 수정 관리하는곳
function getJsonStrUsrAgentUpdate(){

	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNTUudXBkYXRlVXNyQWdlbnRVcGRhdGU=",  						// 유관 기관 저장명
			"map" : {
				"key" : "value",
				"DEPT_NM" : $("#udept_nm").val(),									//부서명
				"EXT_AGN_ID" : window.sessionStorage.getItem("EXT_AGN_ID"),
				"JOB_NM" : $("#ujob_nm").val(),										//업무명
				"RSPN_PRSN" : $("#urspn_prsn").val(),								//사용자명
				"CH_GB_CD" : $("#selectTel1").val(),								//연락정보1
				"CNTCT_INFM" : ($("#tfTelNo1").length==0 || $("#tfTelNo1").val() == null)?"":$("#tfTelNo1").val().replace(/-/g, ""),		//전화번호
				"MEMO" : $("#umemo").val(),											//메모
				"USE_YN" : $("#uuse_yn").val(),										//사용여부
				"MOD_USR_ID" : window.sessionStorage.getItem("USR_ID"),
				
				"CH_GB_CD2" : $("#selectTel2").val(),	//연락정보2
				"CNTCT_INFM2" : ($("#tfTelNo2").length==0 || $("#tfTelNo2").val() == null)?"":$("#tfTelNo2").val().replace(/-/g, ""),		//연락정보2
				"CH_GB_CD3" : $("#selectTel3").val(),	//연락정보3
				"CNTCT_INFM3" : ($("#tfTelNo3").length==0 || $("#tfTelNo3").val() == null)?"":$("#tfTelNo3").val().replace(/-/g, ""),		//연락정보3
				"EXT_AGN_USR_ID" : window.sessionStorage.getItem("EXT_AGN_USR_ID"),
				"FAX_NO" : ($("#ufax_no").length==0 || $("#ufax_no").val() == null)?"":$("#ufax_no").val().replace(/-/g, ""),				//팩스
				"EML_ADR" : $("#ueml_adr").val()//이메일
			}
		};
		
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/**
 * 외부기관 상세정보 사용자초기화
 */
function fnUserExternAgencyAgentInfoInit() {
	 
	$("#udept_nm").val("");                                   // 부서명
	$("#hid_udept_id").val("");                               // 부서ID
	$("#urspn_prsn").val("");                                 // 담당자
	$("#hid_urspn_id").val("");                               // 담당자ID
	$("#tfTelNo1").val("");                                   // 전화번호1
	$("#tfTelNo2").val("");                                   // 전화번호2
	$("#tfTelNo3").val("");                                   // 전화번호3
	$("#ujob_nm").val("");                                    // 업무명
	$("#umemo").val("");                                      // 메모
	$("#ucrt_dt").html("");                                   // 등록
	$("#umod_dt").html("");                                   // 수정
	$("#uuse_yn").val("Y");                               	  // 사용여부
	
	$("#ueml_adr").val("");                               	   // 이메일
	$("#ufax_no").val("");                               	   // 이메일
	$("#selectTel1").val("all");                               // 연락정보1
	$("#selectTel2").val("all");                               // 연락정보2
	$("#selectTel3").val("all");                               // 연락정보3
	$("#btnuInsert").css("display","inline-block");
	$("#btnuUpdate").css("display","none");
	
	$("#tblInExternAgenyCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrExternAgentUsr("")}, sortname : "dept_nm", sortorder : "asc"});
	$("#tblInExternAgenyCode").trigger("reloadGrid");
	remove_oneTel();
	remove_twoTel();
}

function fnUserExternAgencyAgentInfoInit2() {
	 
	$("#udept_nm").val("");                               // 부서명
	$("#hid_udept_id").val("");                               // 부서ID
	$("#urspn_prsn").val("");                               // 담당자
	$("#hid_urspn_id").val("");                               // 담당자ID
	$("#tfTelNo1").val("");                               // 전화번호1
	$("#tfTelNo2").val("");                               // 전화번호2
	$("#tfTelNo3").val("");                               // 전화번호3
	$("#ujob_nm").val("");                               // 업무명
	$("#umemo").val("");                               // 메모
	$("#ucrt_dt").html("");                               // 등록
	$("#umod_dt").html("");                               // 수정
	$("#uuse_yn").val("Y");                               // 사용여부
	
	$("#ueml_adr").val("");                               // 이메일
	$("#ufax_no").val("");                               // 이메일
	$("#selectTel1").val("all");                               // 연락정보1
	$("#selectTel2").val("all");                               // 연락정보2
	$("#selectTel3").val("all");                               // 연락정보3
	$("#btnuInsert").css("display","inline-block");
	$("#btnuUpdate").css("display","none");
	
	$("#tblInExternAgenyCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrExternAgentUsr((window.sessionStorage.getItem("EXT_AGN_ID")==null)?'':window.sessionStorage.getItem("EXT_AGN_ID"))}, sortname : "dept_nm", sortorder : "asc"});
	$("#tblInExternAgenyCode").trigger("reloadGrid");
	remove_oneTel();
	remove_twoTel();
}



function fnUserExternAgencyPopup(){
    var paramURL = $("#tfInst_url").val();	
    var expUrl = /^http[s]?\:\/\//i;
    if(!expUrl.test(paramURL)){
	alert("유효하지 않은 URL 형식입니다.");
	return;
    }
    var newWindow = window.open(paramURL, "","scrollbars=yes, resizable=yes, menubar=yes, toolbar=yes, location=yes, status=yes, resizable=yes");
	newWindow.focus();
}


function btnExternSave_clickEvent2(){//현장출동 저장 버튼 클릭
	
	$.ajax({
			type : 'post',
			async : true,
			url : getContextPath() + "/ajax/counsel/siteMoveInsert.do",
			data : "pJson=" + getJsonStrExternAgentInsert2("현장출동"),
			success : function(data) {
				if(data != 0){
					alert('저장되었습니다.');
					$("#tblInExternAgeny2").jqGrid("setGridParam", { postData :  {pJson : getJsonExternAgentList2("현장출동")}, page : 1, sortname : "INST_NM", sortorder : "asc"});
					$("#tblInExternAgeny2").trigger("reloadGrid");
					fnGroupExternAgencyAgentInfoInit();
				}
			}
		});	
}