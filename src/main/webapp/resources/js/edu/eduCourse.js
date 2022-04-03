/*
 * 교육과정관리
 * Table : OM042 : 교육과정기본(EDU_ID)
 *         OM043 : 교육대상자기본(EDU_ID)
 *         OD042 : 교육과정상세(EDU_ID)
 *         OR042 : 교육설문관계(설문결과보고)(EDU_ID)
 *         OM045 : 교육설문답변기본 (EDU_ID) 
 */

// 조회 조건 및 조회 값
var gEduHm = "";	//총교육시간 (시간, 분)
var gEduMm = ""; //총교육시간 (분)

var g_srchval = "";
var courseId = "";

var g_usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var g_GrdType = "";		//사용자 권한
var g_GrdTypeNm = "";			//사용자 권한 타입(AD:ADMIN, MN:MANAGER, AG:AGENT)

//교육차수 변수
var g_eduOrd = 0;		//교육차수
var gEduOrdVal = "";	//jqgrid selectbox 교육차수
var gArrEduOrd = {};

var fileForm = "";
var inputFile = [];
var fileBox_idx = 0;

var gRowLength = 0;
var gUpdcnt = 0;

var g_use_yn = new Array();
g_use_yn = [true];

/*//교육대상자구분("200000":신청자, "300000":이수자)
var g_edu_Prsn_Gb_Cd = "";	*/

// 파라미터 셋팅 CourseList
function getJsonStrCourseList(srchval)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDIuc2VsZWN0Q3JzTGlzdA==",
		"map" : {
			"key" : "value",
			"edu_Class_Cd" : srchval,
			"edu_Strt_Dt" : $("#educou_selFrDate").val().replace(/[-, :, \s]/g,""),
			"edu_End_Dt" : $("#educou_selToDate").val().replace(/[-, :, \s]/g,""),			
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 Coursespec	교육중복조회
function getJsonStrCoursespec(edu_Id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wNDIuc2VsZWN0Q3JzSW5mbw==",
		"map" : {
			"key" : "value",
			"edu_Id" : edu_Id
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//공지사항 next value
function getNextValue() {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wNDIubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_courseListExcel
function getJsonStrCourseListExcel()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDIuc2VsZWN0Q3JzRXhjZWw=",
		"map" : {
			"key" : "value",
			"edu_Class_Cd" : $("#educou_srch_Edu_Class_Cd").val(), 
			"edu_Strt_Dt" : $("#educou_selFrDate").val().replace(/[-, :, \s]/g,""),		//신청시작일자(교육시작일자)
			"edu_End_Dt" : $("#educou_selToDate").val().replace(/[-, :, \s]/g,""),		//신청종료일자(교육종료일자)
			"sidx" : "EDU_STED_DT",
			"sord" : "desc",
			"title" : "교육과정목록" + setDownLoadName($("#educou_selFrDate").val(), $("#educou_selToDate").val()),
			"colWidth" : [35, 50, 30, 15, 15, 15, 15, 15, 15, 15, 15, 50],
			"colName" : ["EDU_CLASS_NM", "EDU_TTL", "EDU_STED_DT", "TOTA_EDU_TM", "EDU_GB_NM", "NCSS_NM", "TCH_NM", "EDU_PLC", "EDU_ST_NM", "EDUEXP_PAY_NM", "LBREPT_NM", "MEMO"],
			"colHeader" : ["교육유형", "교육과정명", "교육기간", "총교육시간", "내/외부 구분", "필수여부", "강사", "교육장소", "교육상태", "교육비지급", "노동부신고", "비고"],
			"colAlign" : ["left", "left", "center", "center", "center", "center", "center", "center", "center", "center", "center", "left"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 InsertCourse	교육과정 Insert
function getJsonStrInsertCourse(edu_Id)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNDIuaW5zZXJ0Q3JzSW5mbw==",
		"map" : {
			"key" : "value",
			"tbl_pk": edu_Id,
			"tbl_nm" : "om042",
			
			"edu_Id" : edu_Id,
			/*"crrcum" : $("#educou_crrcum").val(),											//교육과정명*/
			"edu_Class_Cd" : $("#educou_edu_Class_Cd").val(),								//교육과정명
			"edu_Gb_Cd" : $(":input:radio[name=edu_Gb_Cd]:checked").val(),			//내외구분
			"ncss_Yn" : $(":input:radio[name=ncss_Yn]:checked").val(),				//필수여부
//			"edu_Cont" : $("#educou_edu_Cont").val(),										//교육내용			
			"edu_ttl" : $("#educou_edu_ttl").val(),										//교육내용			
			"edu_Strt_Dt" : $("#educou_app_Strt_Dt").val().replace(/[-, :, \s]/g,""),		//신청시작일자(교육시작일자)
			"edu_End_Dt" : $("#educou_app_End_Dt").val().replace(/[-, :, \s]/g,""),		//신청종료일자(교육종료일자)
			"tota_Edu_Tm" : $("#educou_tota_Edu_Minutes").val(),							//총교육시간
			"tch_Id" : $("#educou_tch_Id").val(),											//강사아이디
			"app_Strt_Dt" : $("#educou_app_Strt_Dt").val().replace(/[-, :, \s]/g,""),		//신청시작일자(교육시작일자)
			"app_End_Dt" : $("#educou_app_End_Dt").val().replace(/[-, :, \s]/g,""),		//신청종료일자(교육종료일자)
			"edu_Plc" : $("#educou_edu_Plc").val(),										//교육장소
			"edu_St_Cd" : $("#educou_edu_St_Cd").val(),									//교육상태
			"eduExp_Pay_Yn" : $(":input:radio[name=eduExp_Pay_Yn]:checked").val(),	//교육비지급
			"lbrEpt_Yn" : $(":input:radio[name=lbrEpt_Yn]:checked").val(),			//노동부신고
			"memo" : $("#educou_memo").val(),												//비고
			"use_yn" : 'Y',															//사용여부
			"suvy_Yn" : $("#educou_eduSuvy_Yn").val() != "null" ? $("#educou_eduSuvy_Yn").val() : "N" , //설문여부
			"eduSuvy_Id" : $("#educou_eduSuvy_Yn").val() == "Y" ? $("#educou_eduSuvy_Id").val() : "",	//설문지ID
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateCourse	교육과정 Update
function getJsonStrUpdateCourse()
{
	var loParam = {
		"qt" : "aW5zZXJ0",//"dXBkYXRl",  // update로 하면 파일첨부 정보가 삭제되기 때문에 insert로 해야 함...
		"mi" : "b20wNDIudXBkYXRlQ3JzSW5mbw==",
		"map" : {
			"key" : "value",
			"tbl_pk": $("#educou_edu_Id").val(),
			"tbl_nm" : "om042",
			
			"edu_Id" : $("#educou_edu_Id").val(),
			"edu_Class_Cd" : $("#educou_edu_Class_Cd").val(),											//교육과정명
			"edu_Gb_Cd" : $(":input:radio[name=edu_Gb_Cd]:checked").val(),			//내외구분
			"ncss_Yn" : $(":input:radio[name=ncss_Yn]:checked").val(),				//필수여부
			"edu_ttl" : $("#educou_edu_ttl").val(),										//교육내용			
			"edu_Strt_Dt" : $("#educou_app_Strt_Dt").val().replace(/[-, :, \s]/g,""),		//신청시작일자(교육시작일자)
			"edu_End_Dt" : $("#educou_app_End_Dt").val().replace(/[-, :, \s]/g,""),		//신청종료일자(교육종료일자)					
			"tota_Edu_Tm" : $("#educou_tota_Edu_Minutes").val(),							//총교육시간
			"tch_Id" : $("#educou_tch_Id").val(),											//강사아이디
			"app_Strt_Dt" : $("#educou_app_Strt_Dt").val().replace(/[-, :, \s]/g,""),		//신청시작일자(교육시작일자)
			"app_End_Dt" : $("#educou_app_End_Dt").val().replace(/[-, :, \s]/g,""),		//신청종료일자(교육종료일자)
			"edu_Plc" : $("#educou_edu_Plc").val(),										//교육장소
			"edu_St_Cd" : $("#educou_edu_St_Cd").val(),									//교육상태
			"eduExp_Pay_Yn" : $(":input:radio[name=eduExp_Pay_Yn]:checked").val(),	//교육비지급
			"lbrEpt_Yn" : $(":input:radio[name=lbrEpt_Yn]:checked").val(),			//노동부신고
			"memo" : $("#educou_memo").val(),												//비고
			"use_yn" : 'Y',															//사용여부
			"suvy_Yn" : $("#educou_eduSuvy_Yn").val() != "null" ? $("#educou_eduSuvy_Yn").val() : "N" ,										//설문여부
			"eduSuvy_Id" : $("#educou_eduSuvy_Yn").val() == "Y" ? $("#educou_eduSuvy_Id").val() : "",	//설문지ID
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//getJsonStrInsertEduOrd(data.EDU_ID)	교육과정차수 Insert
function getJsonStrInsertEduOrd(edu_Id)
{
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b2QwNDIudXBkYXRlRWR1T3Jk",
			"map" : {
				"key" : "value",
				
				"tbl_pk": edu_Id,
				"tbl_nm" : "od042",
				
				"edu_Id" : edu_Id,
				"edu_ord" : g_eduOrd,												//교육차수
				//1차교육
				"strt_dt_1" : $("#educou_edu_Strt_Dt1").val().replace(/[-, :, \s]/g,""),	//교육시작일자
				"end_dt_1" : $("#educou_edu_End_Dt1").val().replace(/[-, :, \s]/g,""),		//교육종료일자
				"strt_tm_1" : ($("#educou_edu_Strt_Tm1").val() != "all" && $("#educou_edu_Strt_Mm1").val() != "all") ? $("#educou_edu_Strt_Tm1").val() + $("#educou_edu_Strt_Mm1").val() + "00" : "",								//교육시작시간
				"end_tm_1" : ($("#educou_edu_End_Tm1").val() != "all" && $("#educou_edu_End_Mm1").val() != "all") ? $("#educou_edu_End_Tm1").val() + $("#educou_edu_End_Mm1").val() + "00" : "",								//교육종료시간
				//2차교육
				"strt_dt_2" : $("#educou_edu_Strt_Dt2").val().replace(/[-, :, \s]/g,""),	//교육시작일자
				"end_dt_2" : $("#educou_edu_End_Dt2").val().replace(/[-, :, \s]/g,""),		//교육종료일자
				"strt_tm_2" : ($("#educou_edu_Strt_Tm2").val() != "all" && $("#educou_edu_Strt_Mm2").val() != "all") ? $("#educou_edu_Strt_Tm2").val() + $("#educou_edu_Strt_Mm2").val() + "00" : "",								//교육시작시간
				"end_tm_2" : ($("#educou_edu_End_Tm2").val() != "all" && $("#educou_edu_End_Mm2").val() != "all") ? $("#educou_edu_End_Tm2").val() + $("#educou_edu_End_Mm2").val() + "00" : "",								//교육종료시간
				//3차교육
				"strt_dt_3" : $("#educou_edu_Strt_Dt3").val().replace(/[-, :, \s]/g,""),	//교육시작일자
				"end_dt_3" : $("#educou_edu_End_Dt3").val().replace(/[-, :, \s]/g,""),		//교육종료일자
				"strt_tm_3" : ($("#educou_edu_Strt_Tm3").val() != "all" && $("#educou_edu_Strt_Mm3").val() != "all") ? $("#educou_edu_Strt_Tm3").val() + $("#educou_edu_Strt_Mm3").val() + "00" : "",								//교육시작시간
				"end_tm_3" : ($("#educou_edu_End_Tm3").val() != "all" && $("#educou_edu_End_Mm3").val() != "all") ? $("#educou_edu_End_Tm3").val() + $("#educou_edu_End_Mm3").val() + "00" : "",								//교육종료시간
				//4차교육
				"strt_dt_4" : $("#educou_edu_Strt_Dt4").val().replace(/[-, :, \s]/g,""),	//교육시작일자
				"end_dt_4" : $("#educou_edu_End_Dt4").val().replace(/[-, :, \s]/g,""),		//교육종료일자
				"strt_tm_4" : ($("#educou_edu_Strt_Tm4").val() != "all" && $("#educou_edu_Strt_Mm4").val() != "all") ? $("#educou_edu_Strt_Tm4").val() + $("#educou_edu_Strt_Mm4").val() + "00" : "",								//교육시작시간
				"end_tm_4" : ($("#educou_edu_End_Tm4").val() != "all" && $("#educou_edu_End_Mm4").val() != "all") ? $("#educou_edu_End_Tm4").val() + $("#educou_edu_End_Mm4").val() + "00" : "",								//교육종료시간
				//5차교육
				"strt_dt_5" : $("#educou_edu_Strt_Dt5").val().replace(/[-, :, \s]/g,""),	//교육시작일자
				"end_dt_5" : $("#educou_edu_End_Dt5").val().replace(/[-, :, \s]/g,""),		//교육종료일자
				"strt_tm_5" : ($("#educou_edu_Strt_Tm5").val() != "all" && $("#educou_edu_Strt_Mm5").val() != "all") ? $("#educou_edu_Strt_Tm5").val() + $("#educou_edu_Strt_Mm5").val() + "00" : "",								//교육시작시간
				"end_tm_5" : ($("#educou_edu_End_Tm5").val() != "all" && $("#educou_edu_End_Tm5").val() != "all") ? $("#educou_edu_End_Tm5").val() + $("#educou_edu_End_Mm5").val() + "00" : "",								//교육종료시간
				"use_yn" : "Y"

			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 Coursespec	교육차수조회
function getJsonStrSelectEduOrd(edu_Id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b2QwNDIuc2VsZWN0RWR1T3Jk",
		"map" : {
			"key" : "value",
			"edu_Id" : edu_Id
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//상담사 불러오기
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var teamCd = $("#educou_srchTeamCd").val();
	var agntId = $("#educou_selSrchAgtId").val() != null ? $("#educou_selSrchAgtId").val() : "";
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			"cntr_cd" : "010000",
			"cmpg_usr_id" : agntId,
			"team_cd" : teamCd,
			"gradeType" : g_GrdType,
			"prjctType" : "EDU",
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",			
/*			"dept_cd" : deptCd*/
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//교육강사 불러오기
function getJsonStrEduLctrList()
{	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDEuc2VsZWN0VGNoTGlzdA==",
		"map" : {
			"key" : "value",

		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//설문/평가지 불러오기
function getJsonStrEduSuvyList()
{	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDQuc2VsZWN0Ym94U3V2eUxpc3Q=",
		"map" : {
			"key" : "value",

		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 교육대상자
function getJsonStrCourseTrgtUpdate(usr_Id, trgt_Yn, edu_ord)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNDMudXBkYXRlRWR1VHJndEluZm8=",
			"map" : {
				"key" : "value",
				"edu_Id" : $("#educou_edu_Id").val(),
				"usr_Id": usr_Id,
				"use_yn" : trgt_Yn,
				"edu_ord" : edu_ord,
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//교육대상자
function getJsonStrCourseCnfrmUpdate(usr_Id, trgt_Yn, scr, edu_ord)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNDMudXBkYXRlRWR1Q25mcm1JbmZv",
			"map" : {
				"key" : "value",
				"edu_Id" : $("#educou_edu_Id").val(),
				"usr_Id": usr_Id,
				"use_yn" : trgt_Yn,
				"scr" : scr,
				"edu_ord" : edu_ord,
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//교육대상자
function getJsonStrCourseCnfrmDelete(usr_Id, edu_ord)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNDMuZGVsZXRlRWR1VHJndA==",
			"map" : {
				"key" : "value",
				"edu_Id" : $("#educou_edu_Id").val(),
				"usr_Id": usr_Id,
				"use_yn" : "N",
				"edu_ord" : edu_ord,
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//교육신청자, 이수자 List
function getJsonStrConfirmList()
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNDMuc2VsZWN0Q29uZmlybUxpc3Q=",
			"map" : {
				"key" : "value",
				"edu_Id" : $("#educou_edu_Id").val(),
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//교육신청자 List
function getJsonStrApplyList()
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNDMuc2VsZWN0QXBwbHlMaXN0",
			"map" : {
				"key" : "value",
				"edu_Id" : $("#educou_edu_Id").val(),
			}
		};
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 fileList
function getJsonFileList(courseId) {		
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMTkuZmlsZUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om042",
			"tbl_pk": courseId,
			"orderby": "crtTime",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터셋팅 deleteFile
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

//파라미터셋팅 파일다운로드
function getJsonFileDownload(svr, loc) {		
	var loParam = {
		"svrFilePath" : svr,
		"locFileName" : loc
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//첨부파일 박스추가
function addFileBox() {
	if (fileBox_idx >= 4) {
		alert("첨부파일은 최대 5개까지 가능합니다.");
	} else {
		var html = $("#educou_fileadd tr").parent().html();
		html = html.replace(/XXX/g, "" + ++fileBox_idx);
		$("#educou_fileInfos").append(html);
	}
}

//첨부파일 박스삭제
function removeFileBox(i) {
	var el = $("#educou_writeForm input[name=record_" + i + "]");
	if (el.next().val() == "add") {
		el.parent().parent().remove();
		fileBox_idx--;
	} else {
		el.next().val("remove");
		el.parent().parent().hide();
	}
}

//첨부된 파일 삭제
function deleteFile(fileId)
{
	if(confirm("첨부된 파일을 삭제하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/edu/deleteFile.do",
			data : "pJson=" + getJsonDeleteFile(fileId),
			success : function(data)
			{
				//파일폼 삭제
				var el = $("#educou_writeForm input[name=record_" + fileId + "]");
				el.parent().parent().remove();
				
				if(--fileBox_idx < 5)
				{
					$("#educou_EDU_FILE").prop("disabled", false);
					$("#educou_btnRmFilebox").prop("disabled", false);
				}
			},
			error : function(data, status, err)
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

//파일박스 내용삭제
function rmFileBoxEvent(){
	inputFile[1] = inputFile[0].clone(true);
	$("#educou_EDU_FILE").replaceWith(inputFile[1]);
}

//첨부파일 보기
function showAttachFiles(tbbsId)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/fileList.do",
		data : "pJson=" + getJsonFileList(tbbsId),
		success : function(data)
		{
			for(var i in data)
			{
				var url = getContextPath() 
				+ "/file/eduCourseFileDown.do?pJson=" 
				+ getJsonFileDownload(data[i].SVRFL_PTH, data[i].LOCFL_NM);
				
				var tr = "<tr>";
				tr += "<td colspan='4'><input type='hidden' name='record_" +data[i].FL_ID + "' value='" +data[i].FL_ID + "' />";
				tr += "<span><a href='" + url + "' title='"+ data[i].LOC_FL_NM +"'>" + data[i].LOC_FL_NM.substring(0,20); + "</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";
				tr += "</tr>";
				
				fileBox_idx++;
				$("#educou_fileInfos").prepend(tr);
				//$("#educou_fileInfos").parent().append(tr);
			}
			
			if(fileBox_idx >= 5)
			{
				$("#educou_EDU_FILE").prop("disabled", true);
				$("#educou_btnRmFilebox").prop("disabled", true);
			}
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});		
}

//tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
function init_grid(pMap)
{
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	cellEdit : pMap.cellEdit,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	   	gridComplete : window[pMap.completeEvent],
	   	beforeSelectRow : window[pMap.beforeEvent],
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}
//교육대상 jqGrid Init
function tblTarget_init_grid()
{
	pMap = {};
	pMap.tblId = "educou_tblTargetList";
	pMap.url   = "/jqgrid/edu/tblTargetListGrid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TGlzdA==", {
		"key" : "value" ,
		/*
		"notuse" : false,
		"chkRetire" : false,
		"cntr_cd" : "010000",
		"cmpg_usr_id" : $("#educou_selSrchAgtId").val() != null ? $("#educou_selSrchAgtId").val() : "",
		"team_cd" : $("#educou_srchTeamCd").val(),
		"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
		"sord" : "asc",	
		 */
		"cntr_cd" : "X", // 초기 화면 셋팅, 위에 주석 풀면 해당 데이터들이 나옴
	});
	pMap.colNames = ["선택", "팀", "상담사", "교육차수", "상담사ID"];
	pMap.colModel =
   	[
   	 	{ name : "TRGT_YN", index : "TRGT_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 40, resizable: false, sortable : false },
   	 	{ name : "TEAM_NM", index : "TEAM_NM", align : "center", width : 120 },
   	 	{ name : "USR_NM", index : "USR_NM", align : "center", width : 100 },
   	 	/*{ name : "EDU_ORD", index : "EDU_ORD", align : "center", width : 100, editable: true, edittype: "select", formatter:"select", editoptions: {value: initSelectEduOrd} },*/
   	 	{ name : "EDU_ORD", index : "EDU_ORD", align : "center", width : 100, editable: true, edittype: "select", formatter:"select", 
   	 		editoptions:{value : initSelectEduOrd, 
   	 					 dataEvents : [{ type:"change", fn: function(e){
   	 						 				var evalue = $(e.target).val();   	

   	 						 				//$("#educou_tblTargetList").jqGrid('setCell', e.target.id.substring(0, 1), 'EDU_ORD', evalue);
   	 						 				//alert (evalue);
   	 					 }}]
   	 		}   	 	
   	 	},   	 	 	
   	 	{ name : "USR_ID", index : "USR_ID", hidden : true }, 	
   	];
	pMap.rowNum = "10";
	pMap.sortname = "USR_NM";
	pMap.width = "100%";
	pMap.height = "240";
	pMap.cellEdit = false;
	pMap.pager = "educou_pgTargetList";
	pMap.selectEvent = "tblTargetList_SelectRow";
//	pMap.completeEvent = "tblTargetList_GridComplete";
	pMap.rowNumber = true;	
	pMap.beforeEvent="tblTargetList_SelectCheckBox";
	
	init_grid(pMap);
}

// 20.05.18 체크박스 선택 이벤트
function tblTargetList_SelectCheckBox(id,e){
	var $myGrid = $(this);
    var i = $.jgrid.getCellIndex($(e.target).closest('td')[0]);
    var cm = $myGrid.jqGrid('getGridParam', 'colModel');
    var lastsel = "";
    var objGrid = $("#educou_tblTargetList").jqGrid('getRowData', id);
    if(id && id !== lastsel)
	{
		jQuery('#educou_tblTargetList').jqGrid('restoreRow',lastsel);
		jQuery('#educou_tblTargetList').jqGrid('editRow',id,true);
		lastsel=id;
	}	
	
	if(objGrid.TRGT_YN == "0")
		$("#educou_tblTargetList").jqGrid('setCell', id, 'TRGT_YN', '0');
	else
		$("#educou_tblTargetList").jqGrid('setCell', id, 'TRGT_YN', '1');

}

//교육대상 jqGrid 선택
function tblTargetList_SelectRow(id)
{
	var lastsel = "";
	
    var objGrid = $("#educou_tblTargetList").jqGrid('getRowData', id);
	
	if(id && id !== lastsel)
	{
		jQuery('#educou_tblTargetList').jqGrid('restoreRow',lastsel);
		jQuery('#educou_tblTargetList').jqGrid('editRow',id,true);
		lastsel=id;
	}	
	
	if(objGrid.TRGT_YN == "0")
		$("#educou_tblTargetList").jqGrid('setCell', id, 'TRGT_YN', '1');
	else
		$("#educou_tblTargetList").jqGrid('setCell', id, 'TRGT_YN', '0');
}

/*
//교육대상 jqGrid 완성
function tblTargetList_GridComplete()
{
	var ids = $(this).getDataIDs();
	
	// 교육차수 표시
	for(var i = 0; i < ids.length; i++)
	{
		var rowId = ids[i];
		var row = $(this).getRowData(rowId);
		
		if(g_eduOrd != null && g_eduOrd != 0)
		{
			var rtnBtn = "<select class='select_bl'  style='width:100px;' id='edu_Ord_" + i + "'>";
			
			for (var j = 1; j <= g_eduOrd; j++)
			{			
				rtnBtn += "<option value='" + j + "'>" + j + "차교육</option>";   			
			}	
			
			rtnBtn += "</select>";			
			
			$(this).jqGrid("setRowData", rowId, { EDU_ORD : rtnBtn });
			$("#educou_edu_Ord_" + i).bind("change", fnEduOrdSelect);
		}
	}
}
*/

//jqgrid selectbox init
function initSelectEduOrd()
{
	var arrValue = {};
	var value = "";
	
//	if(g_eduOrd != null && g_eduOrd != 0)
	if(g_eduOrd)
	{	
		for (var j = 1; j <= g_eduOrd; j++)
		{			
			value += j + ":" + j + "차교육" + ";";
			arrValue[j + "차교육"]= j; 			
		}	
	
		gEduOrdVal = value.substr(0, value.length-1);
		gArrEduOrd = arrValue;
	}else{
	    return "none: ";
	}
	return gEduOrdVal;
}

//교육 신청자 jqGrid Init
function tblApply_init_grid()
{
	pMap = {};
	pMap.tblId = "educou_tblApplyList";
	pMap.url   = "/jqgrid/edu/tblApplyListGrid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wNDMuc2VsZWN0QXBwbHlMaXN0", {
		"key" : "value" ,
		"edu_Id" : "X",
	});
	pMap.colNames = ["선택", "팀", "상담사", "교육차수", "과목점수", "이수여부", "상담사ID", "EDU_ORD"],
	/*pMap.colNames = ["팀", "상담사", "교육차수", "과목점수", "이수여부","삭제", "상담사ID", "EDU_ORD"],*/
	pMap.colModel =
   	[
   	 	{ name : "RD_YN", index : "RD_YN", formatter : 'checkbox', editoptions : {value : "1:0", defaultVaule : "0"}, formatoptions : {disabled:false}, width : 40, align : "center", sortable : false},
		{ name : "TEAM_NM", index : "TEAM_NM", align : "center", width : 130},
		{ name : "USR_NM", index : "USR_NM", align : "center", width : 100 },
		{ name : "EDU_ORD_NM", index : "EDU_ORD_NM", align : "center", width : 100 },
		{ name : "SCR", index: "SCR", width: 130, align: 'center',  
			formatter: function (cellValue, option) {
                      		return '<input type="text" style="width:80px; text-align:center;" name="txtBox" id="txt_' +  option.rowId + '" value="' + cellValue + '" />';
            }
        },
		{ name : "TRGT_YN", index : "TRGT_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 100, resizable: false, sortable : false }, 
		/*
		{ name : "EDU_ID", index : "EDU_ID", width : 80, align : "center", 
			formatter: function (value,option,data,action) {
		    	var rcvnBtn = "<button type='button' class='button' onclick='educationRemove("+JSON.stringify(value)+","+JSON.stringify(data.USR_ID)+","+JSON.stringify(data.EDU_ORD)+")'>삭제</button>";
          		return rcvnBtn;
	        } 
		}, 	
		*/
	    { name : "USR_ID", index : "USR_ID", hidden : true }, 	
		{ name : "EDU_ORD", index : "EDU_ORD", hidden : true },
   	];
	pMap.rowNum = "10";
	pMap.sortname = "USR_NM";
	pMap.width = "100%";
	pMap.height = "275";
	//pMap.cellEdit = true;
	pMap.pager = "educou_pgApplyList";
	pMap.selectEvent = "tblApply_SelectRow";
	pMap.rowNumber = true;
	//hhs
	pMap.completeEvent = "tblApply_GridComplete";
	
	init_grid(pMap);

}

function tblApply_GridComplete(){
	// 이수자
	var ConfirmListData = $("#educou_tblConfirmList").getRowData();
		// 대상자
	var ApplyListData = $("#educou_tblApplyList").getRowData();
	
	for (var j = 1; j < ApplyListData.length+1; j++){
		// 이수자가 있을때
		if(ConfirmListData.length > 0){
			for(var i = 1; i < ConfirmListData.length+1; i++){
				var ConfirmCurrentData = $("#educou_tblConfirmList").getRowData(i);
				if($("#educou_tblApplyList").getCell(j, "USR_ID") == ConfirmCurrentData.USR_ID){
					$("#educou_tblApplyList").setCell(j, "TRGT_YN", 1);
					break;
				}else{
					$("#educou_tblApplyList").setCell(j, "TRGT_YN", 0);
				}
			}
		}else{
			$("#educou_tblApplyList").setCell(j, "TRGT_YN", 0);
		}
	}
}

//전체 선택
function tblApply_SelectRow(id)
{
	var rd_yn = $("#educou_tblApplyList").getCell(id, "RD_YN");
	
	if(rd_yn == 1)
		$("#educou_tblApplyList").setCell(id, "RD_YN", 0);
	else
		$("#educou_tblApplyList").setCell(id, "RD_YN", 1);
}

//교육대상자 리스트 선택 체크
function checkSelectList()
{
	var checkedDatas = $("#educou_tblApplyList").getRowData();
	var selCnt = 0;
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].RD_YN == "1")
			selCnt = selCnt + 1;
	}
	return selCnt;
}

/*
function educationRemove(EDU_ID, USR_ID, EDU_ORD){
   
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNDMuZGVsZXRlRWR1VHJndA==",
		"map" : {
			"key" : "value",
			"edu_Id" : EDU_ID,
			"usr_Id": USR_ID,
			"use_yn" : "N",
			"edu_ord" : EDU_ORD,
		}
	};
	console.log(JSON.stringify(loParam));
    
    if(confirm("삭제 하시겠습니까?")){
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : true,
	    url : getContextPath() + "/ajax/edu/courseCnfrmUpdate.do",
	    data : "pJson=" + encodeURIComponent(JSON.stringify(loParam)),
	    success : function(data)
	    {
			$("#educou_tblApplyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrApplyList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
			$("#educou_tblApplyList").trigger("reloadGrid");
	    },
	    error : function(data, status, err) 
	    {
	    	networkErrorHandler(data, status, err);
	    }
	});
    }
}
*/
//교육 이수자 jqGrid Init
function tblConfirm_init_grid()
{
	pMap = {};
	pMap.tblId = "educou_tblConfirmList";
	pMap.url   = "/jqgrid/edu/tblConfirmListGrid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "b20wNDMuc2VsZWN0Q29uZmlybUxpc3Q=", {
		"key" : "value" ,
		"edu_Id" : "X",
	});
	pMap.colNames = ["팀", "상담사", "교육차수", "과목점수", "상담사ID", "EDU_ORD"],
	pMap.colModel =
   	[
		{ name : "TEAM_NM", index : "TEAM_NM", align : "center", width : 150},
		{ name : "USR_NM", index : "USR_NM", align : "center", width : 100 },
		{ name : "EDU_ORD_NM", index : "EDU_ORD_NM", align : "center", width : 100 },
		{ name : "SCR", index : "SCR", align : "center", width : 100 },
		{ name : "USR_ID", index : "USR_ID", hidden : true },
		{ name : "EDU_ORD", index : "EDU_ORD", hidden : true },
   	];
	pMap.rowNum = "10";
	pMap.sortname = "USR_NM";
	pMap.width = "100%";
	pMap.height = "307";
	pMap.cellEdit = false;
	pMap.pager = "educou_pgConfirmList";
	pMap.selectEvent = "tblDetailList_SelectRow";
	pMap.rowNumber = true;
	
	init_grid(pMap);
}

//삼당원 불러오기
function setSelectBoxWithUser()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/userList.do",
		data : "pJson=" + getJsonStrUserList(),
		success : function(data)
		{			
			$("#educou_selSrchAgtId").html("");
			// param값을 JSON으로 파싱
			var value = "";
			
			if(g_GrdTypeNm == "AD" || g_GrdTypeNm == "MN")
				value += "<option value='all'>전체</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
			});
			
			$("#educou_selSrchAgtId").append(value);
			
			if(g_GrdTypeNm == "AG")
				$("#educou_selSrchAgtId").val(window.sessionStorage.getItem("USR_ID"));
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	$("#educou_tblTargetList").clearGridData();	
}

//교육강사 불러오기
function setSelectBoxWithEduLctr()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/eduLctrList.do",
		data : "pJson=" + getJsonStrEduLctrList(),
		success : function(data)
		{
			$("#educou_tch_Id").html("");
			
			// param값을 JSON으로 파싱
			var value = "";
			
			value += "<option value='all'>미선택</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.TCH_ID + "'>" + state.TCH_NM + "</option>";
			});
			
			$("#educou_tch_Id").append(value);

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//설문/평가지 불러오기
function setSelectBoxWithSuvyList()
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/eduSuvyList.do",
		data : "pJson=" + getJsonStrEduSuvyList(),
		success : function(data)
		{
			$("#educou_eduSuvy_Id").html("");
			
			// param값을 JSON으로 파싱
			var value = "";
			
			value += "<option value='all'>미선택</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.ID + "'>" + state.TEXT + "</option>";
			});
			
			$("#educou_eduSuvy_Id").append(value);

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//교육과정 상세 초기화
function initCourseSpec()
{
	$("#educou_btnInsert").show();
	$("#educou_btnUpdate").hide();
	
	$("#educou_edu_Id").val("");
	$("#educou_edu_Class_Cd").val("");
	
	$("input:radio[name=edu_Gb_Cd]:input[value=100000]").prop("checked", true).change();
	$("input:radio[name=ncss_Yn]:input[value=Y]").prop("checked", true);
	
	$("#educou_edu_ttl").val("");
	
	/*
	//1차교육
	$("#educou_edu_Strt_Dt1").val("");
	$("#educou_edu_End_Dt1").val("");	
	$("#educou_edu_Strt_Tm1").val("all");
	$("#educou_edu_Strt_Mm1").val("all");
	$("#educou_edu_End_Tm1").val("all");
	$("#educou_edu_End_Mm1").val("all");
	*/

	//교육차수 초기화
	for (var i = 1; i < 6; i++)
	{
		$("#educou_edu_Strt_Dt" + i).val(""); 
		$("#educou_edu_End_Dt" + i).val(""); 
		$("#educou_edu_Strt_Tm" + i).val("all");
		$("#educou_edu_Strt_Mm" + i).val("all");
		$("#educou_edu_End_Tm" + i).val("all");
		$("#educou_edu_End_Mm" + i).val("all");
	}	
	$("#educou_edu_Strt_Dt1").val(getDate()); 
	$("#educou_edu_End_Dt1").val(getDate()); 
	
	$("#educou_tota_Edu_Minutes").val("");		// 총교육시간 테이블값(분단위)
	$("#educou_tota_Edu_Tm").html("");			// 총교육시간 화면표시값(시간, 분)  
	$("#educou_tch_Id").val("all");
	$("#educou_app_Strt_Dt").val(getDate());
	$("#educou_app_End_Dt").val(getDate());
	$("#educou_edu_Plc").val("");
	$("#educou_edu_St_Cd").val("all");
	$("#educou_eduSuvy_Yn").val("N");				// 설문여부
	$("#educou_eduSuvy_Id").val("all");	
	$("#educou_tota_Edu_Trgt").html("");
	/*$("#educou_tota_Edu_Prpsr").html("");*/		//신청자
	
	$("input:radio[name=eduExp_Pay_Yn]:input[value=Y]").prop("checked", true);
	$("input:radio[name=lbrEpt_Yn]:input[value=Y]").prop("checked", true);
	
	$("#educou_crd_Dt").html("");
	$("#educou_mod_Dt").html("");	
	$("#educou_memo").val("");
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#educou_fileInfos").empty().append(fileForm);		
	
	$("#educou_tblApplyList").clearGridData();			//교육신청자
	$("#educou_tblConfirmList").clearGridData();		//교육이수자
	
}

// 저장 및 수정 예외 처리
function checkCourseSpec()
{
	var rMsg = "";
	g_eduOrd = 0;
	
	if ($("#educou_edu_Class_Cd").val() == "all")
		rMsg += "\n\n교육과정명을 선택 해 주세요.";
	
	if ($("#educou_edu_St_Cd").val() == "all")
		rMsg += "\n\n교육상태를 입력 해 주세요.";	
	
	if ($("#educou_eduSuvy_Yn").val() == "Y") {
		if ($("#educou_eduSuvy_Id").val() == "all")
			rMsg += "\n\n설문지를 선택 해 주세요.";	
	}
	/*	
	if ($("#educou_tota_Edu_Minutes").val() == "" || $("#educou_tota_Edu_Minutes").val() == "0")
		rMsg += "\n\n교육시간을 확인 해 주세요.";
	*/
	//교육차수 일자, 시간체크
	for (var i = 1; i < 6; i++)
	{
		//교육일정, 시간 모두 빈값이 아니라면
		if ($("#educou_edu_Strt_Dt" + i).val() != "" && $("#educou_edu_End_Dt" + i).val() != "" 
				&& $("#educou_edu_Strt_Tm" + i).val() != "all" && $("#educou_edu_Strt_Mm" + i).val() != "all"
				&& $("#educou_edu_End_Tm" + i).val() != "all" && $("#educou_edu_End_Mm" + i).val() != "all")
		{
			if (($("#educou_edu_Strt_Dt" + i).val() > $("#educou_edu_End_Dt" + i).val()) 
					|| ($("#educou_edu_Strt_Tm" + i).val() + $("#educou_edu_Strt_Mm" + i).val() >= $("#educou_edu_End_Tm" + i).val() + $("#educou_edu_End_Mm" + i).val()))
			{
				rMsg += "\n\n" + i + "차교육 일정을 확인 해 주세요.";
				break;
			} else
				g_eduOrd++

		} else {
			$("#educou_edu_Strt_Dt" + i).val(""); 
			$("#educou_edu_End_Dt" + i).val(""); 
			$("#educou_edu_Strt_Tm" + i).val("all");
			$("#educou_edu_Strt_Mm" + i).val("all");
			$("#educou_edu_End_Tm" + i).val("all");
			$("#educou_edu_End_Mm" + i).val("all");
		}
	}
	
	//교육차수가 하나도 등록이 안되어있으면
	if (g_eduOrd == 0)
		rMsg += "\n\n교육차수 일정을 확인 해 주세요.";
	
	//파일 업로드 용량 체크
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#educou_writeForm input[name=EDU_FILE]");
	for(var i=0; i<formName.length; i++){
		if(formName[i].value !=""){
			//파일용량 체크
			var nRtn=fileCheck(formName[i] , nLimitSize);
			if(nRtn>nLimitSize){ 
				rMsg += "\n\n[" + (i+1) + "번 파일] : ("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.";
			}
			
			//파일 확장자 체크
			if (fileExtnsCheck(formName[i]) == false)
				rMsg += "\n\n[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";
		}
	}	
	
	return rMsg;
}

//교육시간 시간 넣기
function setSeletBoxWithTime(objSel, objType)
{
	var value = "";
	
	$("#"+ objSel).html("");
	
	switch (objType){
		case "T":
			value += "<option selected value='all'>선택</option>";
			value += "<option value='07'>07 시</option>";
			value += "<option value='08'>08 시</option>";
			value += "<option value='09'>09 시</option>";
			value += "<option value='10'>10 시</option>";
			value += "<option value='11'>11 시</option>";
			value += "<option value='12'>12 시</option>";
			value += "<option value='13'>13 시</option>";
			value += "<option value='14'>14 시</option>";
			value += "<option value='15'>15 시</option>";
			value += "<option value='16'>16 시</option>";
			value += "<option value='17'>17 시</option>";
			value += "<option value='18'>18 시</option>";
			value += "<option value='19'>19 시</option>";	
			value += "<option value='20'>20 시</option>";	
			value += "<option value='21'>21 시</option>";	
			value += "<option value='22'>22 시</option>";	
		
			break;
		case "M":
			value += "<option selected value='all'>선택</option>";
			value += "<option value='00'>00 분</option>";
			value += "<option value='15'>15 분</option>";
			value += "<option value='30'>30 분</option>";
			value += "<option value='45'>45 분</option>";
			value += "<option value='50'>50 분</option>";
	
			break;
		default:
	
	} 
	
	$("#"+ objSel).append(value);	
}

// 총교육시간 시간, 분표시
function setTotalEduTime_HourseMinutes(gStartH, gStartM, gEndH, gEndM)
{
	if (gStartH == "all" || gStartM == "all" || gEndH == "all" || gEndM == "all")
	{
		$("#educou_tota_Edu_Tm").html("");
		$("#educou_tota_Edu_Minutes").val("");		// 총교육시간 테이블값(분단위)
		return;
	}
	
	var minutes = 1000 * 60;
	var hours = minutes * 60;
	
	var strtTime = new Date("1910","1","1", gStartH, gStartM, "00", 1/1000);
	var endTime = new Date("1910","1","1", gEndH, gEndM, "00", 1/1000);

	var gHourse = parseInt((endTime - strtTime) / hours);
	var gMinutes = (endTime - strtTime) / minutes % 60;
	
	if (gHourse > 0 && gMinutes > 0)
		gEduHm = gHourse + "시간 " + gMinutes + "분";
		//$("#educou_tota_Edu_Tm").html(gHourse + "시간 " + gMinutes + "분");
	else if (gHourse > 0 && gMinutes == 0)
		gEduHm = gHourse + "시간";
		//$("#educou_tota_Edu_Tm").html(gHourse + "시간");
	else if (gHourse == 0 && gMinutes > 0)
		gEduHm = gMinutes + "분";
		//$("#educou_tota_Edu_Tm").html(gMinutes + "분");
	else if (gHourse < 0 || (gHourse == 0 && gMinutes == 0))
		gEduHm = ""
		//$("#educou_tota_Edu_Tm").html("");
	
	gEduMm = (endTime - strtTime) / minutes;
	
	$("#educou_tota_Edu_Tm").html(gEduHm);
	$("#educou_tota_Edu_Minutes").val(gEduMm);		// 총교육시간 테이블값(분단위)
	
	//alert (parseInt((endTime - strtTime) / hours) + ":" + (endTime - strtTime) / minutes % 60);
	//alert ((endTime - strtTime) / minutes);	//분으로 변환 표시	
}

//교육과정 조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchval = $("#educou_srch_Edu_Class_Cd").val();
	
	$("#educou_tblCourseList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCourseList(g_srchval)}, page : 1, sortname : "EDU_END_DT", sortorder : "desc"});
	$("#educou_tblCourseList").trigger("reloadGrid");
	
	initCourseSpec();
}

//교육과정 조회 초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	g_srchval = "all";
	
	$("#educou_selFrDate").val(getPrvDay("M", 1, "-"));
	$("#educou_selToDate").val(getDate());	

	$("#educou_btnInsert").show();
	$("#educou_btnUpdate").hide();
	
	$("#educou_srch_Edu_Class_Cd").val("all");
	
	$("#educou_tblCourseList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCourseList(g_srchval)}, page : 1, sortname : "EDU_END_DT", sortorder : "desc"});
	$("#educou_tblCourseList").trigger("reloadGrid");

	initCourseSpec();	
}

//엑셀저장 버튼 클릭 이벤트
function btnExcel_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/edu/courseList.do", getJsonStrCourseListExcel());
}

//교육과정 추가버튼 클릭 이벤트
function btnInsert_clickEvent()
{
	var rMsg = checkCourseSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	//교육과정 중복 조회
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/coursespec.do",
		data : "pJson=" + getJsonStrCoursespec($("#educou_edu_Id").val()),
		success : function(data)
		{
			if(data != null)
			{
				alert("중복된 교육과정 ID가 존재 합니다.");
				initCourseSpec();	
				$("#educou_edu_Class_Cd").focus();
			}
			else
			{
				//교육과정 데이터 넣기
				$.ajax({
					type : "post",
					dataType : "json",
					async : true,
					url : getContextPath() + "/ajax/edu/insertCourse.do",
					data : "pJson=" + getNextValue(),
					success : function(data) {
						
						//교육과정내용
						gAppendHidden("educou_writeForm", "pJson", getJsonStrInsertCourse(data.EDU_ID));
						gSubmitPost("educou_writeForm", true);		
						
						setTimeout(function(){							
							//교육과정차수
							gAppendHidden("educou_writeForm", "pJson", getJsonStrInsertEduOrd(data.EDU_ID));
							gSubmitPost("educou_writeForm", true);	
							
							$("#educou_tblCourseList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCourseList("")}, page : 1, sortname : "EDU_END_DT", sortorder : "desc"});
							$("#educou_tblCourseList").trigger("reloadGrid");
							
							initCourseSpec();
					   		alert("추가되었습니다.");	
					   		
					   		btnSearch_clickEvent();
					   		
						}, 300);
						/*
						//교육과정차수
						gAppendHidden("educou_writeForm", "pJson", getJsonStrInsertEduOrd(data.EDU_ID));
						gSubmitPost("educou_writeForm", true);		

				   		initCourseSpec();				   		
				   		alert("추가되었습니다.");	
				   		
						$("#educou_tblCourseList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCourseList("")}, page : 1, sortname : "EDU_END_DT", sortorder : "desc"});
						$("#educou_tblCourseList").trigger("reloadGrid");
						*/

					},
					error : function(data, status, err) {
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

//교육과정 수정 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	var rMsg = checkCourseSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	//교육과정내용
	gAppendHidden("educou_writeForm", "pJson", getJsonStrUpdateCourse());
	var rtnSubmit = gSubmitPost("educou_writeForm", true);
	
	setTimeout(function(){
		//교육과정차수
		gAppendHidden("educou_writeForm", "pJson", getJsonStrInsertEduOrd($("#educou_edu_Id").val()));
		gSubmitPost("educou_writeForm", true);	
		
		$("#educou_tblCourseList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCourseList("")}, page : 1, sortname : "EDU_END_DT", sortorder : "desc"});
		$("#educou_tblCourseList").trigger("reloadGrid");

		initCourseSpec();				   		
		alert("저장되었습니다.");	
		
		btnSearch_clickEvent();
		
	}, 300);
	/*
	//교육과정차수
	gAppendHidden("educou_writeForm", "pJson", getJsonStrInsertEduOrd($("#educou_edu_Id").val()));
	gSubmitPost("educou_writeForm", true);		
	
	$("#educou_tblCourseList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCourseList("")}, page : 1, sortname : "EDU_END_DT", sortorder : "desc"});
	$("#educou_tblCourseList").trigger("reloadGrid");

	initCourseSpec();				   		
	alert("저장되었습니다.");		
	*/
}

function btnDelete_clickEvent(){
    var ConfirmList=null;
    
    //교육대상자 확인 있으면 삭제 no 
    $.ajax({
	type : "post",
	dataType: "json",
	async : false,
	url : getContextPath() + "/ajax/edu/*.do",
	data : "pJson=" + getJsonStrApplyList(),
	success : function(data){
	    ConfirmList=data.length;
	},
	error : function(data, status, err) {
	    ConfirmList=null;
	    networkErrorHandler(data, status, err);
	}
    });
    
    if(ConfirmList==null || ConfirmList > 0) {
		alert("교육 대상자가 있습니다.");
		return;
    }
    if(confirm("삭제 하시겠습니까?")){
	    var loParam = {
		    "qt" : "ZGVsZXRl",
		    "mi" : "b20wNDIuZGVsZXRl",
		    "map" : {
			"key" : "value",
			"edu_id": $("#educou_edu_Id").val(),
		    }
	    };    	
	    console.log(JSON.stringify(loParam));
	   
	    gAppendHidden("educou_writeForm", "pJson", encodeURIComponent(encodeURIComponent(JSON.stringify(loParam))));
	    gSubmitPost("educou_writeForm", true);
	   
	    setTimeout(function(){    
	    $("#educou_btnReset").trigger("click");
	    $("#educou_tblCourseList").trigger("reloadGrid");}, 300);
    }
}

//코드등록 버튼 클릭 이벤트 등록
function btnCodePop_clickEvent()
{
	openMenuPopup("SM0003");	
}

//교육대상자 조회 초기화 버튼 클릭 이벤트
function btnTrgtInit_clickEvent()
{
	$("#educou_srchTeamCd").val("all");
	$("#educou_selSrchAgtId").val("all");
	$('#educou_srchTeamCd').change(); 	
	
	$("#educou_tblTargetList").clearGridData();
}

//교육대상자 조회 버튼 클릭 이벤트
function btnTrgtSearch_clickEvent()
{	
	$("#educou_tblTargetList").jqGrid("setGridParam", {postData : {pJson : getJsonStrUserList()}, page : 1, sortname : "CNTR_CD, CD_ORD, USR_NM", sortorder : "asc"});
	$("#educou_tblTargetList").trigger("reloadGrid");
}

/*
//업데이트 성공 시 Alert창 띄우는 함수
function updateAlert(dataType) 
{	
	if (dataType == "D") {
		alert("삭제 되었습니다.");
	} else {
		gUpdcnt++;
		
		if(gUpdcnt == gRowLength)
			alert("저장 되었습니다.");
	}
	
}
*/

//교육대상자 리스트 선택 체크
function tblTarget_checkSelectList()
{
	var checkedDatas = $("#educou_tblTargetList").getRowData();
	var selCnt = 0;
	
	for(var i = 0 ; i < checkedDatas.length; i++)
	{
		if(checkedDatas[i].TRGT_YN == "1")
			selCnt = selCnt + 1;
	}
	return selCnt;
}

// 교육신청자 등록 버튼 클릭 이벤트 등록
function btnSave_clickEvent()
{
	var rowid = $("#educou_tblCourseList").jqGrid('getGridParam','selrow');
	var rowNum = $("#educou_tblTargetList").getGridParam("rowNum");
	var currentPageNum = $("#educou_tblTargetList").getGridParam("page");
	
	var vEdu_Id = $("#educou_edu_Id").val();
	
	if (vEdu_Id == "") {
		alert("교육과정을 먼저 선택해주세요.");
		return;
	}
	
	if (tblTarget_checkSelectList() == 0) {
		alert("대상자를 선택해 주세요");
		return;
	}
	
	if (g_eduOrd == 0 || g_eduOrd == null || g_eduOrd == undefined) {
		alert("교육차수를 등록해 주세요.");
		return;		
	}
	
	gUpdcnt = 0;
	gRowLength = $("#educou_tblTargetList").getGridParam("reccount");
	if(confirm("교육 신청자로 등록 하시겠습니까?"))
	{
		var pList = [];
		for(var i = 1 ; i <= gRowLength; i++ ){
			var currentRow = $("#educou_tblTargetList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
					
			var EDU_ORD = $("#" + i + "_EDU_ORD").val();
					
			if(EDU_ORD != undefined && EDU_ORD != "" && EDU_ORD != null){
				if(currentRow.TRGT_YN == "1"){
					pList.push({"qt" : "dXBkYXRl",
						"mi" : "b20wNDMudXBkYXRlRWR1VHJndEluZm8=",
						"map":	{
							"edu_Id" : $("#educou_edu_Id").val(),
							"usr_Id": currentRow.USR_ID,
							"edu_ord" : EDU_ORD
					}});
				}
			}
		} // for end
			
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/edu/courseCnfrmUpdate.do",
			data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
			success : function(data){
				alert("저장 되었습니다.");
				$("#educou_tblApplyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrApplyList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
				$("#educou_tblApplyList").trigger("reloadGrid");
				
				//교육과정 목록 reload 후 선택
				$("#educou_tblCourseList").trigger("reloadGrid");
				$("#educou_tblCourseList").jqGrid("setSelection", rowid, true); // reload후 row다시 선택
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}	// if confirm
	
	
	////////////
	/*
	if(confirm("교육 신청자로 등록 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#educou_tblTargetList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var TRGT_YN = "N";
			
			if(currentRow.TRGT_YN == "1")
				TRGT_YN = "Y";

			var EDU_ORD = $("#" + i + "_EDU_ORD").val();
			
			if (EDU_ORD != undefined && EDU_ORD != "" && EDU_ORD != null)
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/edu/courseCnfrmUpdate.do",
					data : "pJson=" + getJsonStrCourseTrgtUpdate(currentRow.USR_ID, TRGT_YN, EDU_ORD),
					success : function(data){},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}	// if EDU_ORD
		} // for i
		
		alert("저장 되었습니다.");
		$("#educou_tblApplyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrApplyList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
		$("#educou_tblApplyList").trigger("reloadGrid");
		
	}	// if confirm	
	*/	

}

//교육이수자 저장 버튼 클릭 이벤트 등록
function btnConfirm_clickEvent()
{
	var rowid = $("#educou_tblCourseList").jqGrid('getGridParam','selrow');
	var rowNum = $("#educou_tblApplyList").getGridParam("rowNum");
	var currentPageNum = $("#educou_tblApplyList").getGridParam("page");
	
	var vEdu_Id = $("#educou_edu_Id").val();
	
	if (vEdu_Id == "") {
		alert("교육과정을 먼저 선택해주세요.");
		return;
	}
	
	if (checkSelectList() == 0) {
		alert("대상자를 선택해 주세요");
		return;
	}
	
	gUpdcnt = 0;
	gRowLength = $("#educou_tblApplyList").getGridParam("reccount");
	if(confirm("교육 이수자로 등록 하시겠습니까?"))
	{
		
		var pList = [];
		for(var i = 1 ; i <= gRowLength; i++ ){
			var currentRow = $("#educou_tblApplyList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var TRGT_YN = "N";
			
			if(currentRow.TRGT_YN == "1") //이수여부 체크
				TRGT_YN = "Y";
			
			var scr = $("#txt_" + i).val();
			var EDU_ORD = currentRow.EDU_ORD;
			
			if(currentRow.RD_YN == "1"){
				pList.push({"qt" : "dXBkYXRl",
					"mi" : "b20wNDMudXBkYXRlRWR1Q25mcm1JbmZv",
					"map":	{
						"edu_Id" : $("#educou_edu_Id").val(),
						"usr_Id": currentRow.USR_ID,
						"use_yn" : TRGT_YN,
						"scr" : scr,
						"edu_ord" : EDU_ORD
				}});
			}
		} // for end
			
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/edu/courseCnfrmUpdate.do",
			data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
			success : function(data){
				alert("저장 되었습니다.");
				$("#educou_tblConfirmList").jqGrid("setGridParam", {postData : {pJson : getJsonStrConfirmList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
				$("#educou_tblConfirmList").trigger("reloadGrid");
				
				//교육과정 목록 reload 후 선택
				$("#educou_tblCourseList").trigger("reloadGrid");
				$("#educou_tblCourseList").jqGrid("setSelection", rowid, true); // reload후 row다시 선택
				
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
		
	}	// if confirm
	
	
	/*
	if(confirm("교육 이수자로 등록 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#educou_tblApplyList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var TRGT_YN = "N";
			
			if(currentRow.TRGT_YN == "1")
				TRGT_YN = "Y";
			
			//var scr = currentRow.SCR;
			var scr = $("#txt_" + i).val();
			
			if (TRGT_YN == "N" || scr == "")
				scr = 0
			var EDU_ORD = currentRow.EDU_ORD;
				
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/edu/courseCnfrmUpdate.do",
				data : "pJson=" + getJsonStrCourseCnfrmUpdate(currentRow.USR_ID, TRGT_YN, scr, EDU_ORD),
				success : function(data)
				{
//					if(data != 0)
//						updateAlert("S");

//						$("#educou_tblConfirmList").jqGrid("setGridParam", {postData : {pJson : getJsonStrConfirmList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
//						$("#educou_tblConfirmList").trigger("reloadGrid");

				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
		
		alert("저장 되었습니다.");
		$("#educou_tblConfirmList").jqGrid("setGridParam", {postData : {pJson : getJsonStrConfirmList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
		$("#educou_tblConfirmList").trigger("reloadGrid");
	}
//	*/		
	
}

// 교육이수자 삭제 버튼 클릭 이벤트 등록
function btnDelConfirm_clickEvent()
{
	var rowid = $("#educou_tblCourseList").jqGrid('getGridParam','selrow');
	var rowNum = $("#educou_tblApplyList").getGridParam("rowNum");
	var currentPageNum = $("#educou_tblApplyList").getGridParam("page");
	
	var vEdu_Id = $("#educou_edu_Id").val();
	
	if (vEdu_Id == "") {
		alert("교육과정을 먼저 선택해주세요.");
		return;
	}
	
	if (checkSelectList() == 0) {
		alert("대상자를 선택해 주세요");
		return;
	}
	
	gUpdcnt = 0;
	gRowLength = $("#educou_tblApplyList").getGridParam("reccount");
	if(confirm("교육 대상자를 삭제 하시겠습니까?"))
	{
		var pList = [];
		for(var i = 1 ; i <= gRowLength; i++ ){
			var currentRow = $("#educou_tblApplyList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var EDU_ORD = currentRow.EDU_ORD;
					
			if(currentRow.RD_YN == "1"){
				pList.push({"qt" : "dXBkYXRl",
					"mi" : "b20wNDMuZGVsZXRlRWR1VHJndA==",
					"map":	{
						"edu_Id" : $("#educou_edu_Id").val(),
						"usr_Id": currentRow.USR_ID,
						"use_yn" : "N",
						"edu_ord" : EDU_ORD
				}});
			}
		} // for end
			
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/edu/courseCnfrmDelete.do",
			data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
			success : function(data){
				alert("삭제 되었습니다.");
				//교육대상자
				$("#educou_tblApplyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrApplyList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
				$("#educou_tblApplyList").trigger("reloadGrid");
				//교육이수자
				$("#educou_tblConfirmList").jqGrid("setGridParam", {postData : {pJson : getJsonStrConfirmList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
				$("#educou_tblConfirmList").trigger("reloadGrid");
				//교육과정 목록 reload 후 선택
				$("#educou_tblCourseList").trigger("reloadGrid");
				$("#educou_tblCourseList").jqGrid("setSelection", rowid, true); // reload후 row다시 선택
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}	// if confirm
	
	/*
	if(confirm("교육 대상자를 삭제 하시겠습니까?"))
	{
		for(var i = 1 ; i <= rowNum * currentPageNum; i++ )
		{	
			var currentRow = $("#educou_tblApplyList").getRowData(i);
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var RD_YN = "N";
			
			if(currentRow.RD_YN == "1")
			{
				RD_YN = "Y";

				var EDU_ORD = currentRow.EDU_ORD;
					
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/edu/courseCnfrmDelete.do",
					data : "pJson=" + getJsonStrCourseCnfrmDelete(currentRow.USR_ID, EDU_ORD),
					success : function(data)
					{
//						updateAlert("D");
	
//						$("#educou_tblApplyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrApplyList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
//						$("#educou_tblApplyList").trigger("reloadGrid");
	
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
		}
		alert("삭제 되었습니다.");
		$("#educou_tblApplyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrApplyList()}, page : 1, sortname : "USR_NM", sortorder : "asc"});
		$("#educou_tblApplyList").trigger("reloadGrid");
	}		
	*/

}

//상담사 선택 여부
function targetYn_clickEvent(celId) 
{
	var rowNum = $('#educou_tblTargetList').getGridParam('rowNum');
	
	if(g_use_yn[celId.data])
	{
		for( var j = 1; j <= rowNum; j++)
			$("#educou_tblTargetList").setCell(j, celId.data+4, "1");
		
		g_use_yn[celId.data] = false;
	}
	else
	{
		for( var j = 1; j <= rowNum; j++)
			$("#educou_tblTargetList").setCell(j, celId.data+4, "0");
		
		g_use_yn[celId.data] = true;
	}
}

//교육(1차~5차) 일자 선택 교육기간 범위내 체크
function checkEduDate(pObjNm, pDate)
{
	if ($("#educou_app_Strt_Dt").val() > pDate || $("#educou_app_End_Dt").val() < pDate)
	{
		alert("교육기간 범위를 벗어났습니다.");
		$("#" + pObjNm).val("");
	}
}

//초기화면 컨트롤 설정
function initControl()
{
	datePicker("#educou_selFrDate");
	datePicker("#educou_selToDate");
	
	datePicker("#educou_edu_Strt_Dt1");		//1차교육
	datePicker("#educou_edu_End_Dt1");
	$("#educou_edu_Strt_Dt1").val(getDate());
	$("#educou_edu_End_Dt1").val(getDate());
	datePicker("#educou_edu_Strt_Dt2");		//2차교육
	datePicker("#educou_edu_End_Dt2");
	datePicker("#educou_edu_Strt_Dt3");		//3차교육
	datePicker("#educou_edu_End_Dt3");
	datePicker("#educou_edu_Strt_Dt4");		//4차교육
	datePicker("#educou_edu_End_Dt4");
	datePicker("#educou_edu_Strt_Dt5");		//5차교육
	datePicker("#educou_edu_End_Dt5");
	
	datePicker("#educou_app_Strt_Dt");
	datePicker("#educou_app_End_Dt");
		
	$("#tabs1").gbTabs("#ctnt1");
	
	// 초기 검색 입력 창 비활성화
	$("#educou_btnInsert").show();
	$("#educou_btnUpdate").hide();	
	
}
//초기화면 데이터 설정
function initData()
{
	$("#educou_selFrDate").val(getPrvDay("M", 1, "-"));
	$("#educou_selToDate").val(getDate());
	
	//교육과정명
	setSelectBoxWithCode("educou_srch_Edu_Class_Cd","전체","90085", "CHILD", "", "all");	
	
/*	$("#educou_edu_Strt_Dt1").val(getDate());		//1차교육
	$("#educou_edu_End_Dt1").val(getDate());	
	$("#educou_edu_Strt_Dt1").val(getDate());		//2차교육
	$("#educou_edu_End_Dt1").val(getDate());	
	$("#educou_edu_Strt_Dt1").val(getDate());		//3차교육
	$("#educou_edu_End_Dt1").val(getDate());	
	$("#educou_edu_Strt_Dt1").val(getDate());		//4차교육
	$("#educou_edu_End_Dt1").val(getDate());	
	$("#educou_edu_Strt_Dt1").val(getDate());		//5차교육
	$("#educou_edu_End_Dt1").val(getDate());	*/
	
	//교육기간(신청기간)
	$("#educou_app_Strt_Dt").val(getDate());
	$("#educou_app_End_Dt").val(getDate());	
	
	//1차교육	
	setSeletBoxWithTime("educou_edu_Strt_Tm1", "T");
	setSeletBoxWithTime("educou_edu_Strt_Mm1", "M");
	setSeletBoxWithTime("educou_edu_End_Tm1", "T");
	setSeletBoxWithTime("educou_edu_End_Mm1", "M");
	//2차교육
	setSeletBoxWithTime("educou_edu_Strt_Tm2", "T");
	setSeletBoxWithTime("educou_edu_Strt_Mm2", "M");
	setSeletBoxWithTime("educou_edu_End_Tm2", "T");
	setSeletBoxWithTime("educou_edu_End_Mm2", "M");
	//3차교육
	setSeletBoxWithTime("educou_edu_Strt_Tm3", "T");
	setSeletBoxWithTime("educou_edu_Strt_Mm3", "M");
	setSeletBoxWithTime("educou_edu_End_Tm3", "T");
	setSeletBoxWithTime("educou_edu_End_Mm3", "M");
	//4차교육
	setSeletBoxWithTime("educou_edu_Strt_Tm4", "T");
	setSeletBoxWithTime("educou_edu_Strt_Mm4", "M");
	setSeletBoxWithTime("educou_edu_End_Tm4", "T");
	setSeletBoxWithTime("educou_edu_End_Mm4", "M");
	//5차교육
	setSeletBoxWithTime("educou_edu_Strt_Tm5", "T");
	setSeletBoxWithTime("educou_edu_Strt_Mm5", "M");
	setSeletBoxWithTime("educou_edu_End_Tm5", "T");
	setSeletBoxWithTime("educou_edu_End_Mm5", "M");

	//교육과정명
	setSelectBoxWithCode("educou_edu_Class_Cd","미선택","90085", "CHILD", "", "all");	
	
	//교육상태
	setSelectBoxWithCode("educou_edu_St_Cd","미선택","90081", "CHILD", "", "all");	

	//교육강사
	setSelectBoxWithEduLctr();
	
	//설문/평가지
	setSelectBoxWithSuvyList();
	$("#educou_eduSuvy_Yn").change();
	
	// 센터 셀렉트 박스 셋팅(팀)
	setObjSelectBoxWithCode("educou_srchTeamCd", "전체", "", "CHILD", "90003", window.sessionStorage.getItem("TEAM_CD"));
	
}

function initEvent()
{
	// 센터 셀렉트 박스 변경 이벤트 등록
	$("#educou_srchTeamCd").bind("change", function()
	{
		$("#educou_selSrchAgtId").val("all");
		
		setSelectBoxWithUser();
		
		if(g_GrdTypeNm == "AG")
		{
			$("#educou_selSrchAgtId").val(window.sessionStorage.getItem("USR_ID"));
			$("#educou_selSrchAgtId").prop("disabled", true);
		}
	});
		
	// 설문여부 셀렉트 박스 변경 이벤트 등록
	$("#educou_eduSuvy_Yn").bind("change", function()
	{
		$("#educou_eduSuvy_Id").val("all");
		$("#educou_eduSuvy_Yn").val() == "N" ?	$("#educou_eduSuvy_Id").prop("disabled", true) : $("#educou_eduSuvy_Id").prop("disabled", false);
		
	});
		
	// 교육과정 리스트 조회
	// 조회 버튼 클릭 이벤트 등록
	$("#educou_btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#educou_btnInit").bind("click", btnInit_clickEvent);
	
	// 교육과정 상세 조회
	// 추가 버튼 클릭 이벤트 등록
	$("#educou_btnInsert").bind("click", btnInsert_clickEvent);
	// 수정 버튼 클릭 이벤트 등록
	$("#educou_btnUpdate").bind("click", btnUpdate_clickEvent);
	// 삭제 버튼 클릭 이벤트 등록
	$("#educou_btnDelete").bind("click", btnDelete_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록	
	$("#educou_btnReset").bind("click", function(e)
	{
		$("#educou_tblCourseList").trigger("reloadGrid");
		initCourseSpec();
		$("#educou_btnDelete").hide();
	});	
	
	//코드등록 버튼 클릭 이벤트 등록
	$("#educou_btnCodePop").bind("click", btnCodePop_clickEvent);
	
	// 엑셀저장 버튼 클릭 이벤트
	$("#educou_btnExcel").bind("click", btnExcel_clickEvent);
	
	// 교육대상 조회
	// 조회 버튼 클릭 이벤트 등록
	$("#educou_btnTrgtSearch").bind("click", btnTrgtSearch_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#educou_btnTrgtInit").bind("click", btnTrgtInit_clickEvent);
	
	// 교육신청자 등록
	// 교육신청자 등록 버튼 클릭 이벤트 등록
	$("#educou_btnSave").bind("click", btnSave_clickEvent);
	
	// 교육이수자 등록
	// 교육이수자 등록 버튼 클릭 이벤트 등록
	$("#educou_btnConfirm").bind("click", btnConfirm_clickEvent);
	
	// 교육이수자 삭제 버튼 클릭 이벤트 등록
	$("#educou_btnDelConfirm").bind("click", btnDelConfirm_clickEvent);

	// 초기화 버튼 클릭 이벤트 등록	
	$("#educou_edu_Strt_Tm1, #educou_edu_Strt_Mm1, #educou_edu_End_Tm1, #educou_edu_End_Mm1").bind("change", function(e)
	{
		setTotalEduTime_HourseMinutes($("#educou_edu_Strt_Tm1").val(), $("#educou_edu_Strt_Mm1").val(), $("#educou_edu_End_Tm1").val(), $("#educou_edu_End_Mm1").val())
		
		//$("#educou_tota_Edu_Tm").html(gEduHm);
		//$("#educou_tota_Edu_Minutes").val(gEduMm);		

	});	
	
	// 교육(1차~5차) 일자 선택 이벤트 등록	
	$("#educou_edu_Strt_Dt1, #educou_edu_End_Dt1, #educou_edu_Strt_Dt2, #educou_edu_End_Dt2, #educou_edu_Strt_Dt3, #educou_edu_End_Dt3, #educou_edu_Strt_Dt4, #educou_edu_End_Dt4, #educou_edu_Strt_Dt5, #educou_edu_End_Dt5").bind("change", function(e)
	{
		checkEduDate(this.id, $(this).val());
	});		
	
	//교육 내부/외부 구분 (내부교육은 상담사만:010100, 외부교육은 전체)
	$("#educou_edu_Gb_Cd_In, #educou_edu_Gb_Cd_Out").bind("change", function(e)
	{
		if ($(':radio[name="edu_Gb_Cd"]:checked').val() == "100000")
			g_GrdType = "010100"
		else
			g_GrdType = "";
		
		setSelectBoxWithUser();
		
	});
	
	//파일삭제이벤트 등록
	$("#educou_btnRmFilebox").bind("click", rmFileBoxEvent);
	
	$("#educou_tblTargetList_TRGT_YN").bind("click", -1 , targetYn_clickEvent);
	

}

//전체 선택 해제 함수_교육대상자 목록
function tblTargetListSelectAll_clickEvent()
{
	var selectVal = "0";
	var tblLength = $("#educou_tblTargetList").getGridParam("reccount");
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#educou_tblTargetList").getCell(i, "TRGT_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++){
	    $("#educou_tblTargetList").setCell(i, "TRGT_YN", selectVal);
	    jQuery('#educou_tblTargetList').jqGrid('editRow',i,true);
	}
}

function tblApplyListSelectAll_clickEvent()
{
	var selectVal = "0";
	var tblLength = $("#educou_tblApplyList").getGridParam("reccount");
	for(var i = 1; i <= tblLength; i++)
	{
		if($("#educou_tblApplyList").getCell(i, "RD_YN") == "0")
			selectVal = "1";
	}
	
	for(var i = 1; i <= tblLength; i++){
	    $("#educou_tblApplyList").setCell(i, "RD_YN", selectVal);
	    jQuery('#educou_tblApplyList').jqGrid('editRow',i,true);
	}	
}

// init Page
$(document).ready(function()
{
	inputFile.push($("#educou_EDU_FILE").clone());
	fileForm = $("#educou_fileInfos tr").parent().html();
	
	g_GrdTypeNm = getGradTypeNm(g_usrGrdCd);
	
	initEvent();
	
	initControl();
	initData();
	$("#educou_srchTeamCd").val("all");
	$("#educou_btnDelete").hide();
	$("#educou_tblCourseList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/edu/courselist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCourseList("all")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["교육유형", "교육과정명", "교육기간", "교육시간", "대상인원", "이수인원", "교육과정ID", "교육과정명CD", "설문ID"],
	   	colModel :
	   	[
			{ name : "EDU_CLASS_NM", index : "EDU_CLASS_NM", width : 100, align : "left" },
			{ name : "EDU_TTL", index : "EDU_TTL", width : 200, align : "left" },
			{ name : "EDU_STED_DT", index : "EDU_STED_DT", width : 120, align : "center" },
			{ name : "TOTA_EDU_TM", index : "TOTA_EDU_TM", width : 60, align : "center" },
			{ name : "TRGT_CNT", index : "TRGT_CNT", width : 60, align : "center" },
			{ name : "CMPLT_CNT", index : "CMPLT_CNT", width : 60, align : "center" },
			{ name : "EDU_ID", index : "EDU_ID", hidden : true },
			{ name : "EDU_CLASS_CD", index : "EDU_CLASS_CD", hidden : true },
			{ name : "SUVY_ID", index : "SUVY_ID", hidden : true },
	   	],
	   	sortname : "EDU_END_DT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "240",	/*"260",*/
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#educou_pgCourseList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   	    $("#educou_btnDelete").show();
	   	    	//교육대상자 조회 초기화
	   		btnTrgtInit_clickEvent();
	   		
	   		var row = $("#educou_tblCourseList").getRowData(rowid);	   		
	   		
	   		// 교육과정 상세정보 조회
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/edu/coursespec.do",
				data : "pJson=" + getJsonStrCoursespec(row.EDU_ID),
				success : function(data)
				{					
					initCourseSpec();
					
					$("#educou_edu_Id").val(data.EDU_ID);
					$("#educou_edu_Class_Cd").val(data.EDU_CLASS_CD);
					
					$('input:radio[name=edu_Gb_Cd]:input[value=' + data.EDU_GB_CD + ']').prop("checked", true).change();					
					$('input:radio[name=ncss_Yn]:input[value=' + data.NCSS_YN + ']').prop("checked", true);
					
					$("#educou_edu_ttl").val(data.EDU_TTL);
					/*
					$("#educou_edu_Strt_Dt1").val(data.EDU_STRT_DT);
					$("#educou_edu_End_Dt1").val(data.EDU_END_DT);
					
					//교육시간
					$("#educou_edu_Strt_Tm1").val(data.EDU_STRT_TM);
					$("#educou_edu_Strt_Mm1").val(data.EDU_STRT_MM);
					$("#educou_edu_End_Tm1").val(data.EDU_END_TM);
					$("#educou_edu_End_Mm1").val(data.EDU_END_MM);
					*/
					//setTotalEduTime_HourseMinutes(data.EDU_STRT_TM, data.EDU_STRT_MM, data.EDU_END_TM, data.EDU_END_MM);
						
					//$("tota_Edu_Minutes").val(data.TOTA_EDU_TM);		// 총교육시간 테이블값(분단위)
					//$("#educou_tota_Edu_Tm").html(data.TOTA_EDU_TM);			// 총교육시간 화면표시값(시간, 분)
					$("#educou_tch_Id").val(data.TCH_ID);
					$("#educou_app_Strt_Dt").val(data.APP_STRT_DT);			// 교육시작일자(신청시작일자)
					$("#educou_app_End_Dt").val(data.APP_END_DT);				// 교육종료일자(신청종료일자)
					$("#educou_edu_Plc").val(data.EDU_PLC);
					$("#educou_edu_St_Cd").val(data.EDU_ST_CD);	
					$("#educou_eduSuvy_Yn").val(data.SUVY_YN);	
					$("#educou_eduSuvy_Yn").change();
					
					setTimeout(function(){							
						data.SUVY_ID != null ? $("#educou_eduSuvy_Id").val(data.SUVY_ID) : $("#educou_eduSuvy_Id").val("all");
				   		
					}, 300);

					$("#educou_tota_Edu_Trgt").html(data.TRGT_CNT);
					/*$("#educou_tota_Edu_Prpsr").html(data.CMPLT_CNT);*/		//신청자
					
					$('input:radio[name=eduExp_Pay_Yn]:input[value=' + data.EDUEXP_PAY_YN + ']').prop("checked", true);
					$('input:radio[name=lbrEpt_Yn]:input[value=' + data.LBREPT_YN + ']').prop("checked", true);
					
					$("#educou_crd_Dt").html(data.CRT_DT + " " + data.CRT_USR_NM);
					$("#educou_mod_Dt").html(data.MOD_DT + " " + data.MOD_USR_NM);	
					$("#educou_memo").val(data.MEMO);

					$("#educou_btnUpdate").show();
					$("#educou_btnInsert").hide();		
					// 교육대상자 조회
					btnTrgtSearch_clickEvent();
					// 교육신청자 조회
					$("#educou_tblApplyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrApplyList()}, page : 1, sortname : "TEAM_NM, USR_NM", sortorder : "asc"});
					$("#educou_tblApplyList").trigger("reloadGrid");
					// 교육이수자 조회
					$("#educou_tblConfirmList").jqGrid("setGridParam", {postData : {pJson : getJsonStrConfirmList()}, page : 1, sortname : "TEAM_NM, USR_NM", sortorder : "asc"});
					$("#educou_tblConfirmList").trigger("reloadGrid");
					
					//첨부파일 조회
					showAttachFiles(data.EDU_ID);
					
					// 교육과정차수 조회
			   		$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/edu/selectEduOrd.do",
						data : "pJson=" + getJsonStrSelectEduOrd(row.EDU_ID),
						success : function(dataset)
						{	
							if (dataset != null)
							{
								//1차교육
								$("#educou_edu_Strt_Dt1").val(dataset.STRT_DT_1 != undefined || dataset.STRT_DT_1 != null ? dataset.STRT_DT_1 : ""); 
								$("#educou_edu_End_Dt1").val(dataset.END_DT_1 != undefined || dataset.STRT_DT_1 != null ? dataset.END_DT_1 : ""); 
								$("#educou_edu_Strt_Tm1").val(dataset.STRT_TM_1 != undefined || dataset.STRT_TM_1 != null ? dataset.STRT_TM_1.substr(0,2) : "all");
								$("#educou_edu_Strt_Mm1").val(dataset.STRT_TM_1 != undefined || dataset.STRT_TM_1 != null ? dataset.STRT_TM_1.substr(2,2) : "all");
								$("#educou_edu_End_Tm1").val(dataset.END_TM_1 != undefined || dataset.END_TM_1 != null ? dataset.END_TM_1.substr(0,2) : "all");
								$("#educou_edu_End_Mm1").val(dataset.END_TM_1 != undefined || dataset.END_TM_1 != null ? dataset.END_TM_1.substr(2,2) : "all");	
								//2차교육
								$("#educou_edu_Strt_Dt2").val(dataset.STRT_DT_2 != undefined || dataset.STRT_DT_2 != null ? dataset.STRT_DT_2 : ""); 
								$("#educou_edu_End_Dt2").val(dataset.END_DT_2 != undefined || dataset.STRT_DT_2 != null ? dataset.END_DT_2 : ""); 
								$("#educou_edu_Strt_Tm2").val(dataset.STRT_TM_2 != undefined || dataset.STRT_TM_2 != null ? dataset.STRT_TM_2.substr(0,2) : "all");
								$("#educou_edu_Strt_Mm2").val(dataset.STRT_TM_2 != undefined || dataset.STRT_TM_2 != null ? dataset.STRT_TM_2.substr(2,2) : "all");
								$("#educou_edu_End_Tm2").val(dataset.END_TM_2 != undefined || dataset.END_TM_2 != null ? dataset.END_TM_2.substr(0,2) : "all");
								$("#educou_edu_End_Mm2").val(dataset.END_TM_2 != undefined || dataset.END_TM_2 != null ? dataset.END_TM_2.substr(2,2) : "all");
								//3차교육
								$("#educou_edu_Strt_Dt3").val(dataset.STRT_DT_3 != undefined || dataset.STRT_DT_3 != null ? dataset.STRT_DT_3 : ""); 
								$("#educou_edu_End_Dt3").val(dataset.END_DT_3 != undefined || dataset.STRT_DT_3 != null ? dataset.END_DT_3 : ""); 
								$("#educou_edu_Strt_Tm3").val(dataset.STRT_TM_3 != undefined || dataset.STRT_TM_3 != null ? dataset.STRT_TM_3.substr(0,2) : "all");
								$("#educou_edu_Strt_Mm3").val(dataset.STRT_TM_3 != undefined || dataset.STRT_TM_3 != null ? dataset.STRT_TM_3.substr(2,2) : "all");
								$("#educou_edu_End_Tm3").val(dataset.END_TM_3 != undefined || dataset.END_TM_3 != null ? dataset.END_TM_3.substr(0,2) : "all");
								$("#educou_edu_End_Mm3").val(dataset.END_TM_3 != undefined || dataset.END_TM_3 != null ? dataset.END_TM_3.substr(2,2) : "all");
								//4차교육
								$("#educou_edu_Strt_Dt4").val(dataset.STRT_DT_4 != undefined || dataset.STRT_DT_4 != null ? dataset.STRT_DT_4 : ""); 
								$("#educou_edu_End_Dt4").val(dataset.END_DT_4 != undefined || dataset.STRT_DT_4 != null ? dataset.END_DT_4 : ""); 
								$("#educou_edu_Strt_Tm4").val(dataset.STRT_TM_4 != undefined || dataset.STRT_TM_4 != null ? dataset.STRT_TM_4.substr(0,2) : "all");
								$("#educou_edu_Strt_Mm4").val(dataset.STRT_TM_4 != undefined || dataset.STRT_TM_4 != null ? dataset.STRT_TM_4.substr(2,2) : "all");
								$("#educou_edu_End_Tm4").val(dataset.END_TM_4 != undefined || dataset.END_TM_4 != null ? dataset.END_TM_4.substr(0,2) : "all");
								$("#educou_edu_End_Mm4").val(dataset.END_TM_4 != undefined || dataset.END_TM_4 != null ? dataset.END_TM_4.substr(2,2) : "all");
								//5차교육
								$("#educou_edu_Strt_Dt5").val(dataset.STRT_DT_5 != undefined || dataset.STRT_DT_5 != null ? dataset.STRT_DT_5 : ""); 
								$("#educou_edu_End_Dt5").val(dataset.END_DT_5 != undefined || dataset.STRT_DT_5 != null ? dataset.END_DT_5 : ""); 
								$("#educou_edu_Strt_Tm5").val(dataset.STRT_TM_5 != undefined || dataset.STRT_TM_5 != null ? dataset.STRT_TM_5.substr(0,2) : "all");
								$("#educou_edu_Strt_Mm5").val(dataset.STRT_TM_5 != undefined || dataset.STRT_TM_5 != null ? dataset.STRT_TM_5.substr(2,2) : "all");
								$("#educou_edu_End_Tm5").val(dataset.END_TM_5 != undefined || dataset.END_TM_5 != null ? dataset.END_TM_5.substr(0,2) : "all");
								$("#educou_edu_End_Mm5").val(dataset.END_TM_5 != undefined || dataset.END_TM_5 != null ? dataset.END_TM_5.substr(2,2) : "all");
								
								g_eduOrd = dataset.EDU_ORD;
								
								//총교육시간 계산
								setTotalEduTime_HourseMinutes($("#educou_edu_Strt_Tm1").val(), $("#educou_edu_Strt_Mm1").val(), $("#educou_edu_End_Tm1").val(), $("#educou_edu_End_Mm1").val());
							} else {
/*								//교육차수 초기화
								for (var i = 1; i < 6; i++)
								{
									$("#educou_edu_Strt_Dt" + i).val(""); 
									$("#educou_edu_End_Dt" + i).val(""); 
									$("#educou_edu_Strt_Tm" + i).val("all");
									$("#educou_edu_Strt_Mm" + i).val("all");
									$("#educou_edu_End_Tm" + i).val("all");
									$("#educou_edu_End_Mm" + i).val("all");
								}	*/
							}
						},
						error : function(dataset, status, err) 
						{
							networkErrorHandler(dataset, status, err);
						}
						
					});
					
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
				
			});
	   		//btnTrgtSearch_clickEvent();
			
	   	},
	   	onPaging : function(pgButton)
	   	{	   		
	   		initCourseSpec();
	   	}
	}).jqGrid("navGrid", "#educou_pgCourseList", {edit : false, add : false, del : false, search : false});
	
	tblTarget_init_grid();
	tblApply_init_grid();
	tblConfirm_init_grid();	
	
	//initEvent();
	// 상단 선택 컬럼 클릭 이벤트 등록 (교육대상자 선택)
	$("#educou_tblTargetList_TRGT_YN").bind("click", tblTargetListSelectAll_clickEvent);
	
	// 상단 선택 컬럼 클릭 이벤트 등록(교육대상자 조회)
	$("#educou_tblApplyList_RD_YN").bind("click", tblApplyListSelectAll_clickEvent);
});