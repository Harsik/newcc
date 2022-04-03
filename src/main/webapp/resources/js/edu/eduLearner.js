// 조회 조건 및 조회 값
var gEduHm = "";	//총교육시간 (시간, 분)
var gEduMm = ""; //총교육시간 (분)

var g_usrId = window.sessionStorage.getItem("USR_ID");
var g_srchval = "";

var fileForm = "";
var inputFile = [];
var fileBox_idx = 0;

//파라미터 셋팅 CourseList
function getJsonStrCourseList(srchval)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDIuc2VsZWNFZHVMZWFybmVy",
		"map" : {
			"key" : "value",
			"edu_Class_Cd" : srchval,
			"edu_Strt_Dt" : $("#edulea_selFrDate").val().replace(/[-, :, \s]/g,""),
			"edu_End_Dt" : $("#edulea_selToDate").val().replace(/[-, :, \s]/g,""),
			"usr_Id" : g_usrId,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 Coursespec
function getJsonStrCoursespec(edu_Id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wNDIuc2VsZWN0Q3JzSW5mbw==",
		"map" : {
			"key" : "value",
			"edu_Id" : edu_Id,
			"usr_Id" : g_usrId,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
/*
//총교육시간 시간, 분표시
function setTotalEduTime_HourseMinutes(gStartH, gStartM, gEndH, gEndM)
{
	var minutes = 1000 * 60;
	var hours = minutes * 60;
	
	var strtTime = new Date("1910","1","1", gStartH, gStartM, "00", 1/1000);
	var endTime = new Date("1910","1","1", gEndH, gEndM, "00", 1/1000);

	var gHourse = parseInt((endTime - strtTime) / hours);
	var gMinutes = (endTime - strtTime) / minutes % 60;
	
	if (gHourse > 0 && gMinutes > 0)
		gEduHm = gHourse + "시간 " + gMinutes + "분";
	else if (gHourse > 0 && gMinutes == 0)
		gEduHm = gHourse + "시간";
	else if (gHourse == 0 && gMinutes > 0)
		gEduHm = gMinutes + "분";
	else if (gHourse < 0 || (gHourse == 0 && gMinutes == 0))
		gEduHm = ""
	
	gEduMm = (endTime - strtTime) / minutes;
	
	$("#edulea_tota_Edu_Tm").html(gEduHm);

}
*/
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
				+ getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
				
				var tr = "<tr>";
				tr += "<td colspan='4'><input type='hidden' name='record_" +data[i].FL_ID + "' value='' />";
				tr += "<span><a href='" + url + "' title='"+ data[i].LOC_FL_NM +"'>" + data[i].LOC_FL_NM.substring(0,20); + "</a></span></td>";
				tr += "<td><span>" +data[i].FL_KB_SZ  + "</span></td>";
				/*tr += "<td><a href='javascript:deleteFile(" + data[i].FL_ID + ")' style='text-decoration: none;'><strong class='or_txt'>[X]</strong></a></td>";*/
				tr += "</tr>";

				fileBox_idx++;
				$("#edulea_fileInfos").prepend(tr);
				//$("#edulea_fileInfos").parent().append(tr);
			}
			
			if(fileBox_idx >= 5)
			{
				$("#edulea_EDU_FILE").prop("disabled", true);
				$("#edulea_btnRmFilebox").prop("disabled", true);
			}
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});		
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

//파일박스 내용삭제
function rmFileBoxEvent(){
	inputFile[1] = inputFile[0].clone(true);
	$("#edulea_EDU_FILE").replaceWith(inputFile[1]);
}

//메뉴 상세 초기화
function initCourseSpec()
{
	$("#edulea_getEduId").val("");
	$("#edulea_getSuvyId").val("");
	
	$("#edulea_crrcum").html("");
	
	$("input:radio[name=edu_Gb_Cd]:input[value=100000]").prop("checked", true);
	$("input:radio[name=ncss_Yn]:input[value=Y]").prop("checked", true);
	
	$("#edulea_edu_Cont").html("");
	$("#edulea_edu_Strt_Dt").html("");

	//교육시간
	//$("#edulea_edu_Strt_Tm").html("");

	$("#edulea_tota_Edu_Tm").html("");			// 총교육시간 화면표시값(시간, 분)  
	$("#edulea_tch_Id").html("");
	//$("#edulea_app_Strt_Dt").html("");
	//$("#edulea_app_End_Dt").val(getDate());
	$("#edulea_edu_Plc_Cd").html("");
	$("#edulea_edu_St_Cd").html("");	
	$("#edulea_tota_Edu_Trgt").html("");
	$("#edulea_tota_Edu_Prpsr").html("");
	
	$("input:radio[name=eduExp_Pay_Yn]:input[value=Y]").prop("checked", true);
	$("input:radio[name=lbrEpt_Yn]:input[value=Y]").prop("checked", true);
	
	$("#edulea_crd_Dt").html("");
	$("#edulea_mod_Dt").html("");	
	//$("#edulea_crt_usr_Id").html("");	
	$("#edulea_memo").html("");
	
	//설문조사 작성 버튼 숨기기
	/*$("#edulea_btnSuvy_Popup").hide();*/
	
	fileBox_idx = 0;
	rmFileBoxEvent();
	$("#edulea_fileInfos").empty().append(fileForm);		

}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchval = $("#edulea_srchCrrcum").val();
	
	$("#edulea_tblCourseList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCourseList(g_srchval)}, page : 1, sortname : "EDU_END_DT", sortorder : "desc"});
	$("#edulea_tblCourseList").trigger("reloadGrid");
	
	initCourseSpec();
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	g_srchval = "";

	$("#edulea_selFrDate").val(getDate());
	$("#edulea_selToDate").val(getDate());	
	
	$("#edulea_srchCrrcum").val("all");
	
	$("#edulea_tblCourseList").jqGrid("setGridParam", {postData : {pJson : getJsonStrCourseList(g_srchval)}, page : 1, sortname : "EDU_END_DT", sortorder : "desc"});
	$("#edulea_tblCourseList").trigger("reloadGrid");

	initCourseSpec();	
}
/*
//설문조사 작성 클릭 이벤트 등록
function btnSubyPopup_clickEvent()
{
	var width = 1020;
	var height = 583;	
	var top = (screen.height - height) / 2;
	var left = (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/edu/eduSuvySearch.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	
	//window.sessionStorage.setItem("BOARD_TYPE", "030100.insert");
	
	var newWindow = window.open(paramURL, "교육설문조사 작성", option);
	newWindow.focus();
}
*/
// init Page
$(document).ready(function()
{
	inputFile.push($("#edulea_EDU_FILE").clone());
	fileForm = $("#edulea_fileInfos tr").parent().html();
	
	datePicker("#edulea_selFrDate");
	datePicker("#edulea_selToDate");
	
//	$("#edulea_selFrDate").val(getDate()-30);	
	$("#edulea_selFrDate").val(getAddDate(getDate(),-30));
//	$("#edulea_selFrDate").val(getDate().substr(0, 8) + "01");	
	
	$("#edulea_selToDate").val(getDate());	
	
	$("#edulea_getUsrId").val(g_usrId);
	
	//교육과정명
	setSelectBoxWithCode("edulea_srchCrrcum","전체","90085", "CHILD", "", "all");
	
	//설문조사 작성 버튼 숨기기
	/*$("#edulea_btnSuvy_Popup").hide();*/
		
	$("#edulea_tblCourseList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/edu/courselist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCourseList("")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["교육과정명", "교육내용", "교육기간", "교육차수", "교육결과", "교육과정ID"],
	   	colModel :
	   	[
			{ name : "EDU_CLASS_NM", index : "EDU_CLASS_NM", width : 100, align : "left" },
			{ name : "EDU_CONT", index : "EDU_CONT", width : 200, align : "left" },
			{ name : "EDU_STED_DT", index : "EDU_STED_DT", width : 100, align : "center" },
			{ name : "EDU_ORD", index : "EDU_ORD", width : 50, align : "center" },
			{ name : "EDU_PRSN_GB_NM", index : "EDU_PRSN_GB_NM", width : 50, align : "center" },
			{ name : "EDU_ID", index : "EDU_ID", width : 100, hidden : true }
	   	],
	   	sortname : "EDU_END_DT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#edulea_pgCourseList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var row = $("#edulea_tblCourseList").getRowData(rowid);	   		
	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/edu/coursespec.do",
				data : "pJson=" + getJsonStrCoursespec(row.EDU_ID),
				success : function(data)
				{				
					initCourseSpec();

					$("#edulea_getEduId").val(data.EDU_ID);
					$("#edulea_getSuvyId").val(data.SUVY_ID);
					
					$("#edulea_crrcum").html(data.EDU_CLASS_NM);
					
					$('input:radio[name=edu_Gb_Cd]:input[value=' + data.EDU_GB_CD + ']').prop("checked", true);
					$('input:radio[name=ncss_Yn]:input[value=' + data.NCSS_YN + ']').prop("checked", true);
					
					$("#edulea_edu_Cont").html(data.EDU_CONT);
					$("#edulea_edu_Strt_Dt").html(data.EDU_STED_DT);

					//교육시간
					//$("#edulea_edu_Strt_Tm").html(data.EDU_STED_TM);
					
					//총교육시간
					//setTotalEduTime_HourseMinutes(data.EDU_STRT_TM, data.EDU_STRT_MM, data.EDU_END_TM, data.EDU_END_MM);
					$("#edulea_tota_Edu_Tm").html(data.TOTA_EDU_TM);

					$("#edulea_tch_Id").html(data.TCH_NM);
					//$("#edulea_app_Strt_Dt").html(data.APP_STED_DT);
					$("#edulea_edu_Plc").html(data.EDU_PLC);
					$("#edulea_edu_St_Cd").html(data.EDU_ST_NM);	
					$("#edulea_eduSuvy_Yn").html(data.SUVY_YN_NM);	
					
					/*
					//설문조사 작성 버튼 숨기기
					if (data.SUVY_YN == "Y" && data.SUVY_ID != null)
						$("#edulea_btnSuvy_Popup").show();
					else
						$("#edulea_btnSuvy_Popup").hide();
					*/
					
					$("#edulea_tota_Edu_Trgt").html(data.TRGT_CNT);
					$("#edulea_tota_Edu_Prpsr").html(data.CMPLT_CNT);
					
					//교육차수 개인에 할당된 교육시간만
					if (data.EDU_ORD != null && data.EDU_ORD != undefined) {
						switch(data.EDU_ORD) {
							case 1 : $("#edulea_edu_Ord_1").html(data.EDU_ORD1); break;
							case 2 : $("#edulea_edu_Ord_2").html(data.EDU_ORD2); break;
							case 3 : $("#edulea_edu_Ord_3").html(data.EDU_ORD3); break;
							case 4 : $("#edulea_edu_Ord_4").html(data.EDU_ORD4); break;
							case 5 : $("#edulea_edu_Ord_5").html(data.EDU_ORD5); break;
							default : break;
						}
						
					} else {
						$("#edulea_edu_Ord_1").html(data.EDU_ORD1);
						$("#edulea_edu_Ord_2").html(data.EDU_ORD2);
						$("#edulea_edu_Ord_3").html(data.EDU_ORD3);
						$("#edulea_edu_Ord_4").html(data.EDU_ORD4);
						$("#edulea_edu_Ord_5").html(data.EDU_ORD5);
					}
					
					$('input:radio[name=eduExp_Pay_Yn]:input[value=' + data.EDUEXP_PAY_YN + ']').prop("checked", true);
					$('input:radio[name=lbrEpt_Yn]:input[value=' + data.LBREPT_YN + ']').prop("checked", true);
					
					$("#edulea_crd_Dt").html(data.CRT_DT);
					$("#edulea_mod_Dt").html(data.MOD_DT);	
					//$("#edulea_crt_usr_Id").html(data.CRT_USR_NM);	
					$("#edulea_memo").html(data.MEMO);		
					
					//첨부파일 조회
					showAttachFiles(data.EDU_ID);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	   	onPaging : function(pgButton)
	   	{	   		
	   		initCourseSpec();
	   	}
	}).jqGrid("navGrid", "#edulea_pgCourseList", {edit : false, add : false, del : false, search : false});
	

	// 조회 버튼 클릭 이벤트 등록
	$("#edulea_btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#edulea_btnInit").bind("click", btnInit_clickEvent);
	// 설문조사 작성 클릭 이벤트 등록
	/*$("#edulea_btnSuvy_Popup").bind("click", btnSubyPopup_clickEvent);*/

});