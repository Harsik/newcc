var obj010 = {};
var obj012 = {};
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

var g_usrId = "";
var g_proc_st_cd = "";		//진행상태

var dt = new Date();
var year = dt.getFullYear();
var month = dt.getMonth() + 1;

/*
if (usrGrdCd == "010100") {
	g_usrId = window.sessionStorage.getItem("USR_ID");  
} else {
	g_usrId = "all";
}
*/

function getCallImg(callnum) {
	 return '&nbsp;<img src="/resources/images/btn_cphone.gif" alt="전화기" style="cursor:pointer" onclick="confirm_resv(this)" class="icon_cal2" id="' + callnum + '"/>';

}

// 그리드 셋팅 함수
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
	   	autowidth : false,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	ondblClickRow : window[pMap.dblClickEvent],
	   	onCellSelect : window[pMap.cellEvent],
	   	gridComplete : window[pMap.gridComplete]
	   	
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

// 상단 캠페인조회 그리드 셋팅
function cmpgtbl010_init_grid()
{ 		
	// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
	
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = "all";  
	}
	
	pMap = {};
	pMap.tblId = "tbl010";
	pMap.url   = "/jqgrid/campaign/tbl010Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value" ,
		"progressCmpn" : true,
		"fr_dt" : $("#selFrDate").val().replace(/-/gi, ""),
		"to_dt" : $("#selToDate").val().replace(/-/gi, ""),
		"cmpg_nm" : $("#cmpgNm").val(),
		"usrGrdCd" : usrGrdCd,
		"usr_id" : g_usrId,
	});
	pMap.colNames = ["해피콜명", "시작일자", "종료일자","해피콜유형", "진행상태", "대상자수", "배정건수","완료건수","미완료건수","진행률","해피콜아이디","평가문항갯수", "진행상태코드"];
	pMap.colModel =
   	[
   	 	{ name : "CMPG_NM", index : "CMPG_NM", align : "center", width : 310 },
   	 	{ name : "STRT_DT", index : "STRT_DT", align : "center", width : 90 },
   	 	{ name : "END_DT", index : "END_DT", align : "center", width : 90 },
   	 	{ name : "CMPG_TYPE_CD" , index : "CMPG_TYPE_CD", align : "center", width : 172 },
   	 	{ name : "PROC_ST", index : "PROC_ST", align : "center", width : 90, formatter:fnStatusFormatter },
   	 	{ name : "TRGT_CUST_CNT", index : "TRGT_CUST_CNT", align : "center", width : 90 },
   	 	{ name : "TOTCNT", index : "TOTCNT",  align : "center", width : 90 },
   	 	{ name : "COPCNT", index : "COPCNT",  align : "center", width : 90 },
   	 	{ name : "NONCOPCNT", index : "NONCOPCNT",  align : "center", width : 90,
	 		cellattr : function(rowId, tv, rowObject, cm, rdata) {
			    // rowObject 변수로 그리드 데이터에 접근
			    // ProjectCode값이 Momot라면 현재 Column부터 3칸을 셀병합하고 글자 정렬 가운데로 설정
			    if (rowObject.NONCOPCNT > 0 ) { return 'style="color:red;font-weight:bold"' }
			}
   	 	},
   	 	{ name : "PROGRESS", index : "PROGRESS",  align : "center", width : 90 },
   	 	{ name : "CMPG_ID", index : "CMPG_ID", hidden : true },
   	    { name : "VLTN_CNT", index : "VLTN_CNT", hidden : true },
   	    { name : "PROC_ST_CD", index : "PROC_ST_CD", hidden : true },
   	];
	pMap.rowNum = "2";
	pMap.sortname = "STRT_DT";
	pMap.width = "100%";
	pMap.height = "65";
	pMap.pager = "pg010";
	pMap.selectEvent = "tbl010_SelectRow";
	pMap.rowNumber = false;
	
	init_grid(pMap);
}

// 캠페인대상자 목록 그리드 셋팅
function cmpgtbl012_init_grid()
{ 		
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = "all";  
	}
	
	// tblId, url, postData, colNames, colModel, sortname, width, height, pager, selectEvent
	pMap = {};
	pMap.tblId = "cmpgtbl012";
	pMap.url   = "/jqgrid/campaign/tbl012Grid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {"key" : "value" ,
		"cmpg_id" : "00",
		"usr_id" : g_usrId
	});
	pMap.colNames = ["고객명", "전화번호", "핸드폰번호", "시도횟수", "진행상태", "해피콜아이디", "진행상태코드","미응답사유", "고객아이디"];
	pMap.colModel =
   	[
   	 	{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 125 },
   	 	{ name : "TEL", align : "center", width : 100 },
   	 	{ name : "MOBILE", align : "center", width : 100 },
   	 	{ name : "CALL_TRY_SCNT", index : "CALL_TRY_SCNT", align : "center", width : 100 },
   	 	{ name : "PROC_ST_NM" , index : "PROC_ST_NM", align : "center", width : 100, formatter:fnStatusFormatter },
   	 	{ name : "CMPG_CUST_SEQ", index : "CMPG_CUST_SEQ", hidden : true },
   	 	{ name : "PROC_ST_CD", index : "PROC_ST_CD", hidden : true },
   	 	{ name : "NONRSPN_RSN", index : "NONRSPN_RSN", hidden : true },
   	 	{ name : "CUST_ID", index : "CUST_ID", hidden : true }
   	];
	pMap.rowNum = "15";
	pMap.sortname = "CUST_NM";
	sortorder : "asc",
	pMap.width = "100%";
	pMap.height = "460";
	pMap.pager = "cmpgpg012";
	pMap.selectEvent = "tbl012_SelectRow";
	pMap.rowNumber = true;

	init_grid(pMap);
}

// 캠페인 목록 클릭
function tbl010_SelectRow(rowid)
{
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = $("#selAgent").val();  
	}
	
	$("#custQa").empty();
	
	obj010 = $("#tbl010").jqGrid('getRowData', rowid);
	
    $("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do",postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {"key" : "value" ,
		"cmpg_id" : parseInt(obj010.CMPG_ID),
		"procSt" : $("#selProcSt").val(),
		"usr_id" : g_usrId
	})} , page : 1, sortname : "CUST_NM", sortorder : "asc"}).trigger("reloadGrid");
    
    $("#campaignId").val(obj010.CMPG_ID);   
    
    g_proc_st_cd = obj010.PROC_ST_CD;
    
    //해피콜이 진행중(020000)일때만 전화걸기, 저장 가능하도록
    if (g_proc_st_cd == "020000") 
    	$("#btnInsert").show();
    else 
    	$("#btnInsert").hide();
    
    $("#cmpgCustBtnInit").trigger("click");
    
}

// 캠페인 대상자 클릭
function tbl012_SelectRow(rowid)
{
	clearQuestion();
	
	$("#cmpgCustom6").html("");
	$("#cmpgTel6").html("");
	$("#cmpgHtel6").html("");
	
	obj012 = $("#cmpgtbl012").jqGrid('getRowData', rowid);
	
	$("#custQa").empty();
	
	//개인정보 출력
	$("#cmpgCustom6").html(obj012.CUST_NM);
	
    //해피콜이 진행중(020000)일때만 전화걸기, 저장 가능하도록
    if (g_proc_st_cd == "020000") {
    	if(obj012.TEL)
    		$("#cmpgTel6").html(obj012.TEL + getCallImg(obj012.TEL));
    	if(obj012.MOBILE)
    		$("#cmpgHtel6").html(obj012.MOBILE + getCallImg(obj012.MOBILE));
    } else {
    	if(obj012.TEL)
    		$("#cmpgTel6").html(obj012.TEL);
    	if(obj012.MOBILE)
    		$("#cmpgHtel6").html(obj012.MOBILE);
    }
    
	//질의 가져오기
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/campaign/cmpgAnswer.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTEuc2VsZWN0Q3VzdENtcGc=", {
			"cmpg_id" : obj010.CMPG_ID
		}),
		success : function(data) {		
		    var content = "";
		    
		    //문항생성
		    $.each(data, function(qusetionSeq, question) {
		    	if(++qusetionSeq != 1) {
		    		content += "<hr>";
		    	}
		    	content += "<br><label>" + qusetionSeq + "." + question.QST_NM + "</label><br>";
		    	for(var ansSeq = 1; ansSeq <= question.XAMP_SCNT; ansSeq++) {
		    		switch(question.QST_TYPE_CD) {
		    			case "1001" :	//객관식
		    				content +=  "&nbsp;&nbsp;&nbsp;&nbsp;" + 
			    			"<input type='radio' class='text_ol_40' id='" + question.QST_ID + "_" + qusetionSeq + "_" + ansSeq + "' name='" + qusetionSeq + "' value='"+ ansSeq + "' >" 
							+ "<label for='" + question.QST_ID + "_" + qusetionSeq + "_" + ansSeq + "'>" + question["XAMP" + ansSeq] + "</label><br>";
		    				break;
		    				
		    			case "1002":		//주관식
		    				content += "&nbsp;&nbsp;&nbsp;&nbsp;" +
		    				"주관식&nbsp;문항입니다.&nbsp;<input style='width: 70%;' type='text' id='" + question.QST_ID + "_" + qusetionSeq + "_" + ansSeq + "' name='" + qusetionSeq + "'><br>";
		    		}
		    	}
		    	content += "<br>";
		    });
		    
		    console.log(content);
			$("#custQa").append(content);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	//선택답안 체크
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/completeCmpg.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTUuc2VsZWN0", {
			"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
			"cmpg_id" : obj010.CMPG_ID
		}),
		success : function(data) {
			console.log(data);
			
			$.each(data, function(index, state) {
				if(state.QST_TYPE_CD == "1002") {
					$("input[name='" + state.QST_NO + "']").val(state.ANS_NM);
				} else {
					$("input:radio[name='" + state.QST_NO + "']:input[value='" + state.ANS_NO + "']").prop("checked", true);
				}
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	//대상고객정보
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/targetCustInfo.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y20wMTIuc2VsZWN0", {
			"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
		}),
		success : function(data) {
			$("#cmpgMemo").val(data.MEMO);
			$("#result").val(data.PROC_ST_CD);
			$("#unresponsiveness").val(data.NONRSPN_RSN);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	//고객정보
	if(obj012.CUST_ID!=""){
		$("#telyn,#smsyn,#faxyn").prop("disabled", false);
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/custInfo.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l", "Y20wMDMuZ2V0Q3VzdEluZm8=", {
				"cust_id" : obj012.CUST_ID,
			}),
			success : function(data) {
				
				if (data == null)
					return;
				
				data.TEL_YN == "Y" ? $("#telyn").prop("checked", true) : $("#telyn").prop("checked", false);					
				data.SMS_YN == "Y" ? $("#smsyn").prop("checked", true) : $("#smsyn").prop("checked", false);			
				data.FAX_YN == "Y" ? $("#faxyn").prop("checked", true) : $("#faxyn").prop("checked", false);
				
				if(data.GNDR) {
					$("input:radio[name='radioGndr']:input[value='" + data.GNDR + "']").prop("checked", true);
				} else {
					$("input:radio[name='radioGndr']:input[value='1']").prop("checked", false);
					$("input:radio[name='radioGndr']:input[value='2']").prop("checked", false);
				}
				
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}else{
		$("#telyn,#smsyn,#faxyn").prop("disabled", true);
	}
}

//조회조건 검색버튼 클릭이벤트
function btnSearch_clickEvent()
{
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	var cmpgNm = $("#cmpgNm").val();
	
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = $("#selAgent").val();  
	}	
	
	if(frDt != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if(toDt != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	$("#tbl010").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
		"key" : "value",
		"fr_dt" : frDt,
		"to_dt" : toDt,
		"cmpg_nm" : cmpgNm,
		"usrGrdCd" : usrGrdCd,
		"usr_id" : g_usrId	
	})} , page : 1, sortname : "STRT_DT", sortorder : "desc"});
	$("#tbl010").trigger("reloadGrid");
	
}

// 처리결과 저장버튼 클릭이벤트
function btnInsert_clickEvent() {
	var pList1 = [];

	for(var qusetionSeq = 1; qusetionSeq <= obj010.VLTN_CNT; qusetionSeq++) {
//		var $answer = $("input:radio[name='" + qusetionSeq + "']:checked");
		var $answer = $("input[name='" + qusetionSeq + "']");

		if($answer.val()) {
			if($answer.attr("type") =="radio") {
				var ansNo = $("input:radio[name='" + qusetionSeq + "']:checked").val();
				var qstSeq = $answer.attr("id");
				qstSeq = (qstSeq.split("_"))[0] + "_" + (qstSeq.split("_"))[1] + "_" + ansNo;
				
				var ansNm = $("label[for='" + qstSeq + "']").html();
				qstSeq = (qstSeq.split("_"))[0];
				
				if(!ansNo){
					alert("객관식 문항을 체크해 주세요.");
					return;
				}
				 
				pList1.push({
					"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map": {
						"qst_seq" : qstSeq,
						"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
						"ans_no" : ansNo,
						"ans_nm" : ansNm
					}});
			} else {
				var ansNm = $answer.val(); //주관식 답
				var qstSeq = $answer.attr("id");
				qstSeq = (qstSeq.split("_"))[0];
			
				pList1.push({
					"qt" : "aW5zZXJ0",
					"mi" : "Y20wMTUuaW5zZXJ0",
					"map": {
						"qst_seq" : qstSeq,
						"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
						"ans_no" : "0",
						"ans_nm" : ansNm
					}});
			}
		}else if($answer.attr("id")){
					alert("문항에 답변을 등록해 주세요.");
					return;
			//console.log($answer.attr("id"));
		}
	}
	
	var login_usr_id = window.sessionStorage.getItem("USR_ID");
	
	pList1.push({"qt" : "dXBkYXRl",
		"mi" : "Y20wMTIudXBkYXRlQ3VzdA==",
		"map":	{
			//cm012
			"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
			"proc_st_cd" : $("#result").val(),
			"not_ans_rson" : $("#unresponsiveness").val(),
			"etc_memo" : $("#cmpgMemo").val(),
			//cm003
			"cust_id" : obj012.CUST_ID,
			"gndr" : "",
			"telyn" : $("#telyn").is(":checked") ? "Y" : "N",
			"smsyn" : $("#smsyn").is(":checked") ? "Y" : "N",
			"faxyn" : $("#faxyn").is(":checked") ? "Y" : "N",
			"login_usr_id" : login_usr_id, 
	}});
	
	
	//console.log("pList1[0]>>>"+JSON.stringify(pList1[0]));
	//console.log("pList1[1]>>>"+JSON.stringify(pList1[1]));
	//console.log("pList1[1]>>>"+JSON.stringify(pList1[2]));

	if(obj010.PROC_ST_CD == "010000" && $("#result").val() == "010000") {
		alert("미진행인 해피콜은 저장 할 수 없습니다.");
		return;
	} else {
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/campaign/insertSelectReply.do",
			data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
				
			success : function(data) {			
				//$("#cmpgtbl012").trigger("reloadGrid");
				//$("#cmpgCustBtnInit").trigger("click");
				
				var main_Rec_Cont = "해피콜 설문";
				var strTicketId = opener.$("#tfMainTicketId").val();
				
				console.log("happycall TicketId:"+strTicketId);				
				
				//아웃바운드 상담 상태일때 메인 상담저장
				if(strTicketId != "") {//메인에 티켓아이디가 세팅됬을 경우
					
					// 통화중일때는 저장버튼을 누르지 못한다.
					if(opener.bCalling){
						alert("통화 완료 후 저장해 주세요.");
						return;
					}
					
					// 불응답사유(91001)가 통화불가(1002)이면 상담이력을 넣지 않는다.
					if ($("#unresponsiveness").val() != "1002") {
					
						//$("#tfMainRcvCont").val($("#unresponsiveness option:selected").html());	//불응답사유 -> 문의내용
						opener.$("#tfMainRcvCont").val(main_Rec_Cont);								//"캠페인 상담" -> 문의내용
						opener.$("#tfMainActCont").val($("#cmpgMemo").val());						//메모 -> 답변내용
						opener.$("#selMainActtypecd").val("070000");								//처리유형 (90014) -> 설문(070000) 으로 저장 한다. 
						opener.$("#selMainIntvLgCd").val("001000000").trigger("change");			//대분류 : 시정일반
						opener.$("#selMainIntvMdCd").val("001013000").trigger("change");			//중분류 : 해피콜
						opener.$("#selMainIntvSmCd").val("001013001");								//소분류 : 콜센터
						
						opener.$("#selMainActstcd").val($("#result").val());						//상담결과

						opener.$("#selMainAddrCd").val("기타");
						//opener.$("#btnCnslSave").trigger("click");
						
						//해피콜 아웃바운드 시, 행정동 주소 기타로 저장
						$.ajax({
							type : "post",
							dataType: "json",
							async : true,
							url : getContextPath() + "/ajax/main/updateAddrInfo.do",
							data : "pJson=" + getJsonStrUpdateAddrInfo(strTicketId),
							success : function(data)
							{
								console.log("=== UPDATE CH010 strTicketId >> " + strTicketId);
								opener.fnSaveCnsl("C");
							},
							error : function(data, status, err) 
							{
								networkErrorHandler(data, status, err);
							}
						});
					}
				}
				
				//return;
				
				//alert("저장이 완료되었습니다.");
				
				$("#tbl010").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTAuY21wZ0Jhc2lj", {
					"key" : "value",
					"fr_dt" : $("#selFrDate").val().replace(/[-, :, \s]/g,""),
					"to_dt" : $("#selToDate").val().replace(/[-, :, \s]/g,""),
					"cmpg_nm" : $("#cmpgNm").val().trim(),
					"usrGrdCd" : usrGrdCd,
					"usr_id" : $("#selAgent").val()	
				})} , page : 1, sortname : "STRT_DT", sortorder : "desc"});
				$("#tbl010").trigger("reloadGrid");

				$("#cmpgtbl012").trigger("reloadGrid");
				$("#cmpgCustBtnInit").trigger("click");

			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}

}

function getJsonStrUpdateAddrInfo(tcktId){
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y2gwMTAuYWRkclVwZGF0ZQ==",
			"map" : {
				"key" : "value",
				"tckt_id" : tcktId, 	//티켓ID
				"checkAddr" : opener.$("#selMainAddrCd").val(),	//음성인식 결과
				"sndr_cntct_infm" : opener.$("#tfCustCelPhoneNum").val().replace(/-/gi, "")
			}
		};
		
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 전화걸기
//function confirm_resv(obj) {
//	var tel = $(obj).attr("id");
//	
//	//var g_usrId = "";
//	if (usrGrdCd == "010100") {
//		g_usrId = window.sessionStorage.getItem("USR_ID");  
//	} else {
//		g_usrId = $("#selAgent").val();  
//	}	
//	
//	if (confirm(tel + "\n전화를 거시겠습니까?")) {
//		$.ajax({
//			type : "post",
//			dataType: "json",
//			async : true,
//			url : getContextPath() + "/ajax/campaign/updateCallCnt.do",
//			data : "pJson=" + getJsonStrUpdateCallCnt(),
//			success : function(data) {
//				$("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do", postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {
//					"cmpg_id": parseInt(obj010.CMPG_ID),
//					"procSt" : $("#selProcSt").val(),
//					"usr_id" : g_usrId
//				})} , page : $("#cmpgtbl012").getGridParam("page"), sortname : "CUST_NM", sortorder : "desc"}).trigger("reloadGrid");
//				tel = tel.replace(/[-,\s]/g,"");
//				
////				opener.resvCallSet(obj012.CUST_ID, tel, "", document.title);
//				opener.window.sessionStorage.setItem("setCustInfo", "true");
//				opener.window.sessionStorage.setItem("callType", "makecall");
//				opener.makeCall(areaNumber(tel),"happycall");
//				opener.setCustInfo(tel, obj012.CUST_ID);
//				
//				
//			},
//			error : function(data, status, err) {
//				networkErrorHandler(data, status, err);
//			}
//		});
//	}
//}

function confirm_resv(obj) {
	var tel = $(obj).attr("id");
	 
	tel = tel.replace(/[-,\s]/g,"");
	
	var happyStat=opener.getHappyCallState();
	
	if( happyStat !="ready"){
		 if (confirm($(obj).attr("id") + "\n전화를 거시겠습니까?")) {
			 opener.fnAgentNotReady(7);
			 $("#divNotReadyMenu", opener.document).hide();
		 }else{
			 return;
		 }
	}

	 setTimeout(function() {
		  console.log('happy Call!');
		opener.window.sessionStorage.setItem("setCustInfo", "true");
		opener.window.sessionStorage.setItem("callType", "makecall");
		opener.makeCall(areaNumber(tel),"happycall");
		opener.setCustInfo(tel, obj012.CUST_ID);
	 }, 1500);
	
}

function fromParentToHappyCall(comm,val){
	if(comm=="count"){
		if (usrGrdCd == "010100") {
			g_usrId = window.sessionStorage.getItem("USR_ID");  
		} else {
			g_usrId = $("#selAgent").val();  
		}	
		
		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/campaign/updateCallCnt.do",
				data : "pJson=" + getJsonStrUpdateCallCnt(),
				success : function(data) {
					
					$("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do", postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {
						"cmpg_id": parseInt(obj010.CMPG_ID),
						"procSt" : $("#selProcSt").val(),
						"usr_id" : g_usrId
					})} , page : $("#cmpgtbl012").getGridParam("page"), sortname : "CUST_NM", sortorder : "desc"}).trigger("reloadGrid");
					 
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});	
	}else if(comm=="unresponsiveness"){
		
		$("#unresponsiveness").val(val);
	}
}

// 시도 횟수 업데이트
function getJsonStrUpdateCallCnt()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "Y20wMTIudXBkYXRlQ2FsbENudA==",
		"map" : {
			"key" : "value",
			"cmpg_cust_seq" : obj012.CMPG_CUST_SEQ,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 ProgramList
function getJsonStrUserList()
{
	// 권한에 따라 셋팅
	var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	var cntrCd = "";
	var teamCd = "";
	
	if(usrGrdCd == "090100" || usrGrdCd == "060100")
	{
		cntrCd = "";
		teamCd = "";
	}
	else if(usrGrdCd == "050100")
	{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = "";
	}
	else
	{
		cntrCd = window.sessionStorage.getItem("CNTR_CD");
		teamCd = window.sessionStorage.getItem("TEAM_CD");
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"team_cd" : teamCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/*
// 엑셀저장
function getJsonStrCmpnCheckListExcel()
{			
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMTIuc2VsZWN0RXhjZWw=",
		"map" : {
			"key" : "value",
			"cmpg_id" : obj010.CMPG_ID,
			"sidx" : $("#cmpgtbl012").getGridParam("sortname"),
			"sord" : $("#cmpgtbl012").getGridParam("sortorder"),
			"title" : "캠페인명단",
			"colWidth" : [20, 20, 20, 20, 20, 20, 20, 20],
			"colName" : ["CUST_NM", "TEL_NO", "HTEL", "CALL_TRY_SCNT", "PROC_ST", "CORP_NM", "PROVINCE", "ADDR"],
			"colHeader" : ["고객명", "전화번호", "핸드폰번호", "시도횟수", "결과", "상호", "지역", "주소"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
*/
// 스크립트 보기
function custBtnScript_clickEvent()
{
	if(!obj010.CMPG_ID) {
		alert("해피콜을 선택해 주세요.");
		return;
	}
	
	window.sessionStorage.setItem("campaignId", obj010.CMPG_ID);

	var width = 975;
	var height = 758;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/campaign/openScript.do";
	var option = "width=" + width + ", height=" + height
		+ ", toolbar=no,directories=no,scrollbars=yes,location=no,resizable=auto,status=no,menubar=no, top=" + top + ",left=" + left +"";
	
	var newWindow = window.open(paramURL, "campScript", option);
	newWindow.focus();
}
/*
// 엑셀저장
function custBtnCmpnExcel_clickEvent() {
	
	if(!obj010.CMPG_ID) {
		alert("캠페인을 선택해 주세요.");
		return;
	}
	
	excelDownLoad(getContextPath() + "/excel/campaign/cmpnCheckList.do", getJsonStrCmpnCheckListExcel());
}
*/
 
//초기 컨트롤 셋팅
function initControl()
{
	datePicker("#selFrDate");
	datePicker("#selToDate");
	
	if (month.toString.length == 1)
		month = "0" + month;
	
	var frDate = year + "-" + month + "-" + "01";	
	
	$("#selFrDate").val(frDate);
	//$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	if (window.sessionStorage.getItem("USR_GRD_CD") == "010100") 
	{
		g_usrId = window.sessionStorage.getItem("USR_ID");
	 $("#selAgent").prop("disabled", true);
	} 
	 
	setSelectBoxWithAgent("selAgent", "전체", "CHILD",window.sessionStorage.getItem("USR_ID"),"","","","","" );
	
	setObjSelectBoxWithCode("result", "", "","CHILD", "90013", "");
	setObjSelectBoxWithCode("selProcSt", "전체", "","CHILD", "90013", "010000");
	setObjSelectBoxWithCode("unresponsiveness", "", "","CHILD", "91001", ""); 
	
/*	
	if(window.sessionStorage.getItem("USR_GRD_CD") != "060100" && window.sessionStorage.getItem("USR_GRD_CD") != "090100")
		$("#selSrchCntrCd").prop("disabled", true);
*/	
	
	cmpgtbl010_init_grid();
	cmpgtbl012_init_grid();
}

// 초기 이벤트 셋팅
function initEvent()
{
	$("#btnInsert").bind("click", btnInsert_clickEvent);
	$("#btnScript").bind("click", custBtnScript_clickEvent);
	/*$("#btnCmpnExcel").bind("click", custBtnCmpnExcel_clickEvent);*/

/*	
	$("#selSrchCntrCd").bind("change", function()
	{
		setSelectBoxWithCode("selSrchTeamCd", "전체", "90003", "90002", $("#selSrchCntrCd").val(), "all");
		
		if(window.sessionStorage.getItem("USR_GRD_CD") < "050100")
		{
			$("#selSrchTeamCd").val(window.sessionStorage.getItem("TEAM_CD") == "" ? "all" : window.sessionStorage.getItem("TEAM_CD"));
			$("#selSrchTeamCd").prop("disabled", true);
		}
		
		setSelectBoxWithUser();
	});
	
	$("#selSrchTeamCd").bind("change", function()
	{
		setSelectBoxWithCode("selSrchDeptCd", "전체", "90004", "90003", $("#selSrchTeamCd").val(), "all");
		
		if(window.sessionStorage.getItem("USR_GRD_CD") < "030100")
		{
			$("#selSrchDeptCd").val(window.sessionStorage.getItem("DEPT_CD") == "" ? "all" : window.sessionStorage.getItem("DEPT_CD"));
			$("#selSrchDeptCd").prop("disabled", true);
		}
		
		setSelectBoxWithUser();
	});
	
	$("#selSrchDeptCd").bind("change", function()
	{
		setSelectBoxWithUser();
		
		if(window.sessionStorage.getItem("USR_GRD_CD") < "030100")
		{
			$("#counsType1").val(window.sessionStorage.getItem("USR_ID"));
			$("#counsType1").prop("disabled", true);
		}
	});
*/
	
	//초기화 버튼
	$("#cmpgCustBtnInit").on("click", function() {
		clearQuestion();
		clearCustInfo();
	});
	
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = "all";  
	}		
	
	//대상자 필터링
	$("#selProcSt").on("change", function(e) {
	    $("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do", postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {"key" : "value" ,
			"cmpg_id" : parseInt(obj010.CMPG_ID),
			"procSt" : $("#selProcSt").val(),
			"usr_id" : g_usrId
		})} , page : 1, sortname : "CUST_NM", sortorder : "asc"}).trigger("reloadGrid");
	});
	
	//조회조건 초기화버튼
	$("#btnReset").on("click", function() {
		initData_Search();
		//해피콜 상담사리스트 초기화
		$("#cmpgCustom6").html("");
		$("#cmpgTel6").html("");
		$("#cmpgHtel6").html("");
		//설문지 초기화
		clearQuestion();
	});
	
	//조회조건 조회버튼
	$("#btnSearch").bind("click", btnSearch_clickEvent);
}

//고객정보 초기화
function clearCustInfo() {
	//var g_usrId = "";
	if (usrGrdCd == "010100") {
		g_usrId = window.sessionStorage.getItem("USR_ID");  
	} else {
		g_usrId = "all";  
	}	
	
	$("#cmpgCustom6").html("");
	$("#cmpgTel6").html("");
	$("#cmpgHtel6").html("");
	
	$("#cmpgtbl012").jqGrid("setGridParam", {url : "/jqgrid/campaign/tbl012Grid.do", postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {
		"cmpg_id": parseInt(obj010.CMPG_ID),
		"procSt" : $("#selProcSt").val(),
		"usr_id" : g_usrId
	})} , page : $("#cmpgtbl012").getGridParam("page"), sortname : "CUST_NM", sortorder : "asc"}).trigger("reloadGrid");
	
	obj012 = {};
}

//질의 초기화
function clearQuestion() {
	$("#custQa").empty();
	$("input:radio[name='radioGndr']").prop("checked", false);
	$("#telyn").prop("checked", false); 
	$("#smsyn").prop("checked", false);
	$("#faxyn").prop("checked", false);
	$("#result option:first").prop("selected", true);
	$("#unresponsiveness option:first").prop("selected", true);
	$("#cmpgMemo").val("");
}

// 초기 데이터 셋팅
function initData()
{
	//$("#cmpgId").val("");

	initData_Search();
}

//조회조건 초기 데이터 셋팅
function initData_Search()
{
	if (month.toString.length == 1)
		month = "0" + month;
	
	var frDate = year + "-" + month + "-" + "01";

	$("#selFrDate").val(frDate);	
	//$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	$("#cmpgNm").val("");
	
	$("#selAgent").val(g_usrId);
	
	$("#cmpgtbl012").clearGridData();	//고객 그리드
	//$("#tbl010").clearGridData();		//해피콜 그리드
	// 21.06.24 초기화 버튼 클릭시, 그리드내용을 지우고 있어서 조회 버튼 누르는 이벤트로 변경
	btnSearch_clickEvent();
}

// 초기셋팅
$(function()
{
	initEvent();
	initData();
	initControl();
	
	$("#btnSearch").trigger("click");
});