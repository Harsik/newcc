var ouCode = window.sessionStorage.getItem("ouCode")== null ? "": window.sessionStorage.getItem("ouCode");
var ou = window.sessionStorage.getItem("ou")== null ? "":window.sessionStorage.getItem("ou");
var usrId = window.sessionStorage.getItem("usrId")== null ? "":window.sessionStorage.getItem("usrId");
var usrNm = window.sessionStorage.getItem("usrNm")== null ? "":window.sessionStorage.getItem("usrNm");
var centerSendId ="";
var centerSendMobile ="";
var isinitVocDeptReceiptTab = false;
var isinitVocChargerProcessTab = false;
var isinitVocStatisticsTab = false;
var chDp = false;
var smsCheck="";

function fn_tblDeptReceipt_init() {
		
	// 날짜 세팅
	d_frDate = getPrvDay("M", 2, "-");	// 2020.01.09 3개월 데이터를 가져오도록 수정
	d_toDate = getDate();
	datePicker("#cstrvc_srcDeptFrDate");
	datePicker("#cstrvc_srcDeptToDate");
	$("#cstrvc_srcDeptFrDate").val(d_frDate);
	$("#cstrvc_srcDeptToDate").val(d_toDate);
	$("#cstrvc_selDeptRcptSrchtype option:eq(0)").attr("selected", "selected");

	// RadioBox
	setRadioBoxWithCode("cstrvc_rd_cvl_rqs_gb_cd","90016", "", "","");			
	setRadioBoxWithCode("cstrvc_rd_cvl_act_st_cd","90300", "", "","");				
	
	tblDeptReceiptList_init_grid();
	tblDeptReceiptList_init_input();
	
	// hhs 20.04.02
    $("#cswVocD_progressbar").progressbar({
	      value: 0
    });
	
	// 담당자지정 조회 버튼 클릭 이벤트 등록
	$("#cstrvc_btnDeptReceiptSearch").bind("click", DeptReceiptSearch_clickEvent);	
	
	// 담당자지정 초기화 버튼 클릭 이벤트
	$("#cstrvc_btnDeptReceiptInit").bind("click", DeptReceiptInit_clickEvent);
	
	// 담당자지정 엑셀 버튼 클릭 이벤트
	$("#cstrvc_btnDeptReceiptExcelDown").bind("click", DeptReceiptExcelDown_clickEvent);
	
	// 이력보기
	$("#cstrvc_DeptReceiptHistory").bind("click", DeptReceiptHistory_clickEvent);

	$("#cstrvc_DeptReceiptUsrSave").bind("click", DeptReceiptUsrSave_clickEvent);
	
	$("#cstrvc_selDeptRcptPassDayType").on("change", function() {
		if (this.value != "all") {
			$("#cstrvc_srcDeptFrDate").prop("disabled", true);
			$("#cstrvc_srcDeptFrDate").next(".ui-datepicker-trigger").prop("disabled", true);
			$("#cstrvc_srcDeptToDate").prop("disabled", true);
			$("#cstrvc_srcDeptToDate").next(".ui-datepicker-trigger").prop("disabled", true);
		} else {
			$("#cstrvc_srcDeptFrDate").prop("disabled", false);
			$("#cstrvc_srcDeptFrDate").next(".ui-datepicker-trigger").prop("disabled", false);
			$("#cstrvc_srcDeptToDate").prop("disabled", false);
			$("#cstrvc_srcDeptToDate").next(".ui-datepicker-trigger").prop("disabled", false);
		}
	});
	
	if (window.sessionStorage.getItem("CC_AFFAIRS_YN") != "Y") {
		if (window.sessionStorage.getItem("CC_AUTH") != "Y") {
			$("#cstrvc_cntrSearch1").hide();
			$("#cstrvc_DeptReceiptUsrSave").hide();
		};
		$("#cstrvc_tntr_cont").attr("disabled", true);
		$("#cstrvc_tfTransfUser").attr("disabled", true);
		$("#cstrvc_rd_cvlActSt_010300").attr("disabled", true);
		$("#cstrvc_rd_cvlActSt_010200").attr("disabled", true);
		$("select[name='cstrvc_selDeptRcptSrchtype'] option[value='030200']").remove();
	} else if (window.sessionStorage.getItem("CC_AUTH") != "Y") {
		$("select[name='cstrvc_selDeptRcptSrchtype'] option[value='030200']").remove();
	};
	
	if (window.sessionStorage.getItem("CC_AUTH") == null && window.sessionStorage.getItem("CC_AFFAIRS_YN") == null) {
		$("#cstrvc_cntrSearch1").show();
		$("#cstrvc_DeptReceiptUsrSave").show();
	};

	$("#cstrvc_srcKeyWord, #cstrvc_srcTntrCont").bind("keydown", function(key){
		if (key.keyCode == 13)
			DeptReceiptSearch_clickEvent();
	});
	
 	// 	콜센터담당자 지정 권한여부 확인
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonCodeList(),
		success : function(data){			
			if(data != null && data.RN == 1){
				centerSendId = data.CD_NM;
				centerSendMobile = data.EXT1_CD;
			}
		}
	});
	$("#cstrvc_changeStateCharger").bind("click",changeStateCharger);
}

function DeptReceiptExcelDown_clickEvent() {
	excelDownLoad("/excel/civilservice/cswSelectVocDeptReceipt.do", getJsonVocDeptReceiptExcel());
}

function getJsonVocDeptReceiptExcel() { 
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "Y20wMzIuc2VsZWN0Vm9jTGlzdEV4Y2Vs",
	    "map" : {
			"key" : "value",
			"srcDeptFrDate" : $("#cstrvc_srcDeptFrDate").val().replace(/-/gi, ""),
			"srcDeptToDate" : $("#cstrvc_srcDeptToDate").val().replace(/-/gi, ""),
			"srcDeptRcptType" : $("#cstrvc_selDeptRcptSrchtype option:selected").val(),
			"srcKeyWordType" : $("#cstrvc_selDeptRcptKeyWord option:selected").val(),
			"srcKeyWord" : $("#cstrvc_srcKeyWord").val().replace(/-/gi, ""),
			"srcTntrCont" : $("#cstrvc_srcTntrCont").val(),
			"chkUnsetYn" : $("#chkUnsetYn").prop("checked") ? "Yes" : "No",
			"chkAllDept" : $("#chkAllDeptReceipt").prop("checked") ? true : false,
			"cvlActStCds": chkshowTypeByUserStatus_trfVoc(), 
			"orgId" : ouCode,
			"orgUsrId" : usrId,
			"passedDay" : $("#cstrvc_selDeptRcptPassDayType").val() == "all" ? "all" : parseInt($("#cstrvc_selDeptRcptPassDayType").val()),
			"title" : "이관민원_부서민원_현황" + setDownLoadName($("#cstrvc_srcDeptFrDate").val(), $("#cstrvc_srcDeptToDate").val()),
			"colWidth" : [35, 35, 35, 35, 35, 35, 35, 35, 35, 60],
			"colName" : ["TRNR_RQS_DTM", "RQS_USR_NM", "CTZN_TEL_NO", "CVL_RQS_GB_NM", "CVL_RSLT_RCV_YN", "ORG_FUL_NM", "AFFS_USR_NM", "ORG_USR_NM", "CVL_ACT_ST_NM", "RTN_RSN"],
			"colHeader" : [ "접수시간", "접수자", "민원인연락처", "처리기한", "결과수신여부", "담당부서", "서무", "담당자", "민원처리상태", "재지정 요청사유"],
			"colAlign" : ["center","center", "center", "center", "center", "center", "center", "center", "center", "center"]
	    }
    };
    return  encodeURIComponent(JSON.stringify(loParam));
}

//부서 찾기
function initTransfatcom(){
   	var selectid;

       $("#cstrvc_tfTransfUser, #cstrvc_tfTransfDept, #cstrvc_p_tfTransfUser, #cstrvc_ch_tfTransfUser").autocomplete({
           source : function( request, response ) {
           	selectid=$(this.element).prop("id");
                $.ajax({
                       type: 'post',
                       async : true,
                       url: "/ajax/civilservice/cswOrgDeptUser.do",
                       dataType: "json",                       
                       data : "pJson=" + cswOrgDeptUser(selectid),
                       success: function(data) {
                           //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                           response(
                               $.map(data, function(item) {
                                   return { 
                                       label: (item.USERFULLNAME),
                                       value: (item.USERFULLNAME),
                                       hidVal: (item.UID_+"|"+item.DISPLAYNAME+"|"+item.USERFULLNAME+"|"+item.OUCODE+"|"+item.OU+"|"+item.ORGFULLNAME+"|"+item.TELEPHONENUMBER+"|"+item.MOBILE+"|"+item.CC_AFFAIRS_YN)
                                   };
                               })
                           );
                       }
                  });
               },
           //조회를 위한 최소글자수
           minLength: 1,
           select: function( event, ui ) {
           	var arItem=new Array(7);
           	var detpUser=ui.item.hidVal;
               // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
           	arItem=(ui.item.hidVal.toString()).split('|');
           	
           	if(selectid == "cstrvc_tfTransfUser"){
           		// 담당자지정
           		$("#cstrvc_r_org_id").val(arItem[3]); 
           		$("#cstrvc_r_org_ful_nm").val(arItem[5]);  
				$("#cstrvc_r_org_usr_id").val(arItem[0]);
				$("#cstrvc_r_org_usr_nm").val(arItem[1]); 
				$("#cstrvc_r_ofce_tel_no").val(arItem[6]);  
				$("#cstrvc_r_org_usr_mobile").val(arItem[7]);
				$("#cstrvc_r_ofce_cc_affairs_yn").val(arItem[8]);
				$("#cstrvc_tfTransfUser").val(arItem[2]);
				
				if(ouCode != arItem[3]){ //hhs
					$("#cstrvc_tr010200").attr("disabled", false);
					$("input[name=cstrvc_r_rtn_rsn]").attr("readonly", false);
					$("#cstrvc_cntrSearch1").show();
				}else{
					$("#cstrvc_r_rtn_rsn").val("");
					$("#cstrvc_tr010200").attr("disabled", true);
					$("input[name=cstrvc_r_rtn_rsn]").attr("readonly", true);
				}
           	}
           	if(selectid == "cstrvc_p_tfTransfUser"){
           		// 담당자지정
           		$("#cstrvc_p_org_id").val(arItem[3]); 
           		$("#cstrvc_p_org_ful_nm").val(arItem[5]);  
				$("#cstrvc_p_org_usr_id").val(arItem[0]);
				$("#cstrvc_p_org_usr_nm").val(arItem[1]); 
				$("#cstrvc_p_ofce_tel_no").val(arItem[6]);  
				$("#cstrvc_p_org_usr_mobile").val(arItem[7]);
				$("#cstrvc_p_ofce_cc_affairs_yn").val(arItem[8]);
				$("#cstrvc_p_tfTransfUser").val(arItem[2]);
           	}
           	if(selectid == "cstrvc_ch_tfTransfUser"){
           		// 담당자지정
           		$("#cstrvc_ch_org_id").val(arItem[3]); 
           		$("#cstrvc_ch_org_ful_nm").val(arItem[5]);  
				$("#cstrvc_ch_org_usr_id").val(arItem[0]);
				$("#cstrvc_ch_org_usr_nm").val(arItem[1]); 
				$("#cstrvc_ch_ofce_tel_no").val(arItem[6]);  
				$("#cstrvc_ch_org_usr_mobile").val(arItem[7]);
				$("#cstrvc_ch_ofce_cc_affairs_yn").val(arItem[8]);
				$("#cstrvc_ch_tfTransfUser").val(arItem[2]);
           	}
           },
          close: function () {
        	  
          }
       });
}

//부서 자동완성 
function cswOrgDeptUser(selectid)
{
	var auth = checkCCAuthNCCAffairs();
	var setoucode = "";
	var sttCheck = false;
	
	if (window.sessionStorage.getItem("CC_AUTH") == "Y") { // 부서(재)지정 : 본인 부서 포함 전체 부서 사용자 검색-90909
		setoucode = null;
		sttCheck = false;
	};
	
	if ($("#cstrvc_rd_cvlActSt_010300").is(":checked")) { // 담당자지정 : 본인 부서 사용자 검색
		setoucode = ouCode;
	}; 
	
	if ($("#cstrvc_rd_cvlActSt_010200").is(":checked")) { // 부서(재)지정 : 타 부서 사용자 검색
		setoucode = ouCode;
		sttCheck = true;
	}; 
	
	if ($("#cstrvc_rd_cvlActSt_c030100").is(":checked")) { // 담당자/부서(재)지정 : 본인 부서 포함 전체 부서 사용자 검색
		setoucode = null;
		sttCheck = false;
	};
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuY3N3T3JnRGVwdFVzZXI=",
		"map" : {
			"key" : "value", 
			"keyword" : $("#"+selectid).val().replace(/-/g, ''),			
			"cc_affairs_yn" : auth,
			"oucode" : setoucode,
			"sttCheck" : sttCheck
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

function getJsonCodeList(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "c20wMDIuc2VsQ29kZUxpc3Q=",  
			"map" : {
				"key" : "value",
				"tp_cd" : "90908"
			}
		};
		return encodeURIComponent(JSON.stringify(loParam));
}


function tblDeptReceiptList_init_input( )
{
	$("#cstrvc_trnr_rqs_dtm").html("");
	$("#cstrvc_rqs_usr_nm").html("");
	$("#cstrvc_ctzn").html("");	
	$("#cstrvc_ctzn_tel_no").html("");
	
	$("#cstrvc_tntr_cont").val("");
	
	$("#cstrvc_rd_cvl_rqs_gb_cd>input:radio[name='90016']").removeAttr("checked");
	$("input:radio[name='rd_cvl_rslt_rcv_yn']").removeAttr("checked");
	$("#cstrvc_rd_cvl_act_st_cd>input:radio[name='90300']").removeAttr("checked");
	
	
	$("#cstrvc_org_ful_nm").html("");	
	$("#cstrvc_affs_usr_nm").html("");	
	$("#cstrvc_rtn_rsn").html("");	
	
	$("#cstrvc_selDeptRcptSrchtype").val("all"); 
	$("#cstrvc_srcDeptFrDate").val(d_frDate); 
	$("#cstrvc_srcDeptToDate").val(d_toDate); 
	$("#cstrvc_selDeptRcptPassDayType").val("all") 
	$("#cstrvc_srcKeyWord").val(""); 
	$("#cstrvc_selDeptRcptKeyWord").val("all"); 
	$("#cstrvc_srcTntrCont").val(""); 
	$("#chkUnsetYn").prop("checked", true) 
	if (window.sessionStorage.getItem("CC_AUTH") == "Y") { 
		$("#chkAllDeptReceipt").prop("checked", true); 
	} else {
		$("#chkAllDeptReceipt").prop("checked", false);
	}
	
	
	//$("#cstrvc_DeptReceiptUsrSave").hide();
	$("#cstrvc_DeptReceiptOrgSave").hide();
	$("#cstrvc_DeptReceiptHistory").hide();
	
	/*담당자지정탭영역*/
	fnCvlActStChange("010200"); 
	$("#cstrvc_tr010200").attr("disabled", true); 
	$("input[name=cstrvc_r_rtn_rsn]").attr("readonly", true); 
	
	/*담당자처리탭영역*/
	fnCvlActStChangeC("030100");
	$("#cstrvc_trRtn_rsn").attr("disabled", true);
	$("input[name=cstrvc_r_rtn_rsn_c]").attr("readonly", true);
	
	$("#cstrvc_srcDeptFrDate").prop("disabled", false);
	$("#cstrvc_srcDeptFrDate").next(".ui-datepicker-trigger").prop("disabled", false);
	$("#cstrvc_srcDeptToDate").prop("disabled", false);
	$("#cstrvc_srcDeptToDate").next(".ui-datepicker-trigger").prop("disabled", false);
	
	
}

// 담당자 지정 처리상태변경 이벤트
function fnCvlActStChange(cvlActStChangeCd)
{
	 if(cvlActStChangeCd == "010300"){
		 $("#cstrvc_rd_cvlActSt_c020100").prop("checked", false);
		 $("#cstrvc_rd_cvlActSt_c020200").prop("checked", false);
		 $("#cstrvc_rd_cvlActSt_c030100").prop("checked", false);
		  $("#cstrvc_th010300").css("display","table-cell");
		  $("#cstrvc_td010300").css("display","table-cell");
		  
//		  $("#cstrvc_th010200").css("display","none");
//		  $("#cstrvc_td010200").css("display","none");
//		  $("#cstrvc_tr010200").css("display","none");
		  $("#cstrvc_r_rtn_rsn").val("");
		  $("#p_td010300").children().val("");
		  $("#cstrvc_r_rtn_rsn_c").val("");
		  
		  $("#cstrvc_tr010200").attr("disabled", true);
		  $("input[name=cstrvc_r_rtn_rsn]").attr("readonly", true);
		  $("#cstrvc_cntrSearch1").hide();
	 } 
	 if(cvlActStChangeCd == "010200") {
		 $("#cstrvc_rd_cvlActSt_c020100").prop("checked", false);
		 $("#cstrvc_rd_cvlActSt_c020200").prop("checked", false);
		 $("#cstrvc_rd_cvlActSt_c030100").prop("checked", false);
		  $("#cstrvc_th010300").css("display","none");
		  $("#cstrvc_td010300").css("display","none");
		  
		  $("#cstrvc_th010200").css("display","table-cell");
		  $("#cstrvc_td010200").css("display","table-cell");
		  $("#cstrvc_tr010200").css("display","table-row");
		  $("#p_td010300").children().val("");
		  $("#cstrvc_r_rtn_rsn_c").val("");
		  
		  $("#cstrvc_tr010200").attr("disabled", false);
		  $("input[name=cstrvc_r_rtn_rsn]").attr("readonly", false);
		  $("#cstrvc_cntrSearch1").show();
	 }
	
	$("#cstrvc_tfTransfUser").val("");
	$("#cstrvc_tfTransfDept").val("");
	   
	$("#cstrvc_r_org_usr_id").val("");
	$("#cstrvc_r_org_usr_nm").val("");
	$("#cstrvc_r_ofce_tel_no").val("");
	$("#cstrvc_r_org_usr_mobile").val("");
	
	
	$("#cstrvc_r_org_id").val("");
	$("#cstrvc_r_org_ful_nm").val("");  
	$("#cstrvc_r_affs_org_usr_id").val("");       
	$("#cstrvc_r_affs_usr_nm").val(""); 
	$("#cstrvc_r_affs_ofce_tel_no").val("");
	$("#cstrvc_r_affs_mobile").val("");
	
}

/**
 * 탭선택 이벤트
 */
/*
function TrnsferVocTab_clickEvent(event )
{
	
	var evId = event.target.id;
	
	if(evId == "cstrvc_VocDeptReceipt" ||evId == "cstrvc_VocChargerProcess" ||evId == "cstrvc_VocStatistics"){
		//탭을 선택여부
		$("#cstrvc_TrnsferVocTab > div").attr("class","").addClass("left_tab100_img_gray");
		$("#"+evId).attr("class","").addClass("left_tab100_img");
		$("#grid_all > div").css("display","none");//선택되지 않은 뷰를 제거
		$("#"+evId+"Tab").css("display","block");//선택된 뷰 출력	
		//$("#"+evId+"Search").trigger("click");		
	}

	
}
*/

function init_grid(pMap)
{
	
    $("#"+pMap.tblId).jqGrid({
		url : pMap.url,
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
	   	sortorder : pMap.sortorder,
//	   	multiSort: true
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true, /* RowWidth 설정 */
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 50, 100],
	   	autowidth : true,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	rownumWidth : 30,
	   	multiselect : pMap.multyselect,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	sortable: false,
	   	resizable:true,

	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	   	ondblClickRow : window[pMap.dblClickEvent],
	   	loadComplete : function(data) {
	   		var rId = $("#"+pMap.tblId).getDataIDs();
			for (var i = 0; i < rId.length; i++) {
				rowData = $("#"+pMap.tblId).getRowData(rId[i]);
				if (getDate().replace(/-/gi, "") - rowData.TRNR_RQS_DT > 7) {
					if (rowData.CVL_ACT_ST_CD != "020200") { // 처리상태가 처리완료 아닌 이관민원은 배경 색 변경
						$("#"+pMap.tblId).setRowData(rId[i], false, {background:"#FFB3B3"});
					};
				} 
			};
		}
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

// 사용자별 그리드에 보여줄 상태코드 체크 
function chkshowTypeByUserStatus_trfVoc() {
	/*010200:부서접수, 010300:담당자지정, 020100:담당자처리중,020200:처리완료,030100:담당자(재)지정요청, 030200:부서(재)지정요청*/
	var showType = ["010200","010300","020100","030100","020200"];
	var ca = window.sessionStorage.getItem("CC_AUTH");
	var caf = window.sessionStorage.getItem("CC_AFFAIRS_YN");
	
	if ($("#cstrvc_selDeptRcptPassDayType").val() != "all") {
		showType = showType.slice(0, 4);
	};
	
	if ((ca && caf == "N") || (ca == "N" && caf == "Y")) { 
		showType = showType.slice(0, 5);
		return showType;
	} else {
		return showType;
	};
	

}

/*
010100	콜센터대기
010200	부서접수
010300	담당자지정
020100	담당자처리중
020200	처리완료
030100	담당자(재)지정요청
030200	부서(재)지정요청
*/
//담당자지정 그리드
function tblDeptReceiptList_init_grid()
{
	pMap = {};
	pMap.tblId = "cstrvc_tblDeptReceiptList";
	pMap.url   = "/jqgrid/civilservice/cswSelectVocList.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMzIuc2VsZWN0Vm9jTGlzdA==", {
		"key" : "value" ,
		"srcDeptFrDate" : $("#cstrvc_srcDeptFrDate").val().replace(/-/gi, ""),
		"srcDeptToDate" : $("#cstrvc_srcDeptToDate").val().replace(/-/gi, ""),
		"srcDeptRcptType" : $("#cstrvc_selDeptRcptSrchtype option:selected").val(),
		"srcKeyWordType" : $("#cstrvc_selDeptRcptKeyWord option:selected").val(),
		"srcKeyWord" : $("#cstrvc_srcKeyWord").val().replace(/-/gi, ""),
		"srcTntrCont" : $("#cstrvc_srcTntrCont").val(),
		"chkUnsetYn" : $("#chkUnsetYn").prop("checked") ? "Yes" : "No",
		"chkAllDept" : $("#chkAllDeptReceipt").prop("checked") ? true : false,
		"cvlActStCds": chkshowTypeByUserStatus_trfVoc(), 
		"orgId" : ouCode,
		"orgUsrId" : usrId,
		"passedDay" : $("#cstrvc_selDeptRcptPassDayType").val() == "all" ? "all" : parseInt($("#cstrvc_selDeptRcptPassDayType").val())
	});
	
	pMap.colNames = ["선택", "TCKT_ID", "TNTR_ID", "ORD", "TRNR_RQS_DT", "접수시간", "TRNR_RQS_USR_ID", "접수자","민원인ID", "민원인", "민원인연락처","이관내용",
	                 "CVL_RQS_GB_CD", "처리기한", "결과수신여부", "ORG_ID","담당부서","AFFS_ORG_USR_ID","서무","AFFS_OFCE_TEL_NO",
	                 "ORG_USR_ID", "담당자","OFCE_TEL_NO", "CVL_ACT_ST_CD", "민원처리상태", "민원처리내용","재지정 요청사유","CC_AFFAIRS_YN"
	                ];
	pMap.colModel =
   	[
   		{ name : "CHECKBOX", index :"CHECKBOX", width:40, align:"center", edittype:"checkbox", editoptions: {value:"Y:N"}, formatter:"checkbox", formatoptions:{disabled:false}, sortable:false , hidden : true },
   	 	{ name : "TCKT_ID", index : "TCKT_ID", align : "center", hidden : true },
   	 	{ name : "TNTR_ID", index : "TNTR_ID", align : "center", hidden : true },
   	 	{ name : "ORD", index : "ORD", align : "center", hidden : true },
   	 	{ name : "TRNR_RQS_DT", index : "TRNR_RQS_DT", align : "center", hidden : true },
   	 	{ name : "TRNR_RQS_DTM" , index : "TRNR_RQS_DTM", align : "center", width : 150 },
   	 	
   	 	{ name : "TRNR_RQS_USR_ID", index : "TRNR_RQS_USR_ID", align : "center", hidden : true },
   	 	{ name : "RQS_USR_NM", index : "RQS_USR_NM", align : "center", hidden : false, width : 100 },
   	 	
   	 	{ name : "CUST_ID", index : "CUST_ID", align : "center", width : 100 , hidden : true},
   	 	{ name : "CTZN", index : "CTZN", align : "center", width : 100, hidden : true },
   	 	{ name : "CTZN_TEL_NO", index : "CTZN_TEL_NO", align : "center", width : 150 },
   	 	{ name : "TNTR_CONT", index : "TNTR_CONT", align : "left", width : 400 , hidden : true},
   	 	
   	 	

   	 	{ name : "CVL_RQS_GB_CD", index : "CVL_RQS_GB_CD", align : "center", hidden : true  },
	 	{ name : "CVL_RQS_GB_NM", index : "CVL_RQS_GB_NM", align : "center", hidden : false, width : 120 },
	 	
	 	{ name : "CVL_RSLT_RCV_YN", index : "CVL_RSLT_RCV_YN", align : "center", hidden : false , width : 100 },
	 	
	 	{ name : "ORG_ID", index : "ORG_ID", align : "center", hidden : true  },
	 	{ name : "ORG_FUL_NM", index : "ORG_FUL_NM", align : "center", hidden : false, width : 250 },
	 	{ name : "AFFS_ORG_USR_ID", index : "AFFS_ORG_USR_ID", align : "center", hidden : true  },
	 	{ name : "AFFS_USR_NM", index : "AFFS_USR_NM", align : "center", width : 150 },
	 	{ name : "AFFS_OFCE_TEL_NO", index : "AFFS_OFCE_TEL_NO", align : "center", hidden : true  },
	 	
	 	{ name : "ORG_USR_ID", index : "ORG_USR_ID", align : "center", hidden : true  },
	 	{ name : "ORG_USR_NM", index : "ORG_USR_NM", align : "center" },
	 	{ name : "OFCE_TEL_NO", index : "OFCE_TEL_NO", align : "center", hidden : true  },
	 	
	 	{ name : "CVL_ACT_ST_CD", index : "CVL_ACT_ST_CD", align : "center", hidden : true  },
	 	{ name : "CVL_ACT_ST_NM", index : "CVL_ACT_ST_NM", align : "center", width : 120 },
	 	{ name : "CVL_ACT_CONT", index : "CVL_ACT_CONT", align : "center", hidden : true },
	 	{ name : "RTN_RSN", index : "RTN_RSN", align : "center", hidden : false , width : 360 },
   	 	{ name : "CC_AFFAIRS_YN", index : "CC_AFFAIRS_YN", align : "center", hidden : true }   	 	
   	 	
   	];
	pMap.rowNum = "8";
	pMap.sortname = "TRNR_RQS_DTM";
	pMap.sortorder = "DESC";
	pMap.width = "99%";
	pMap.height = "220";
	pMap.pager = "cstrvc_pagingDeptReceiptList";
	pMap.selectEvent = "tblDeptReceiptList_SelectRow";
	pMap.rowNumber = true;
	if(window.sessionStorage.getItem("CC_AUTH")!="Y"){
		pMap.multyselect = false;
		$("#cstrvc_divCh").hide();
	}else{
		pMap.multyselect = true;
		$("#cstrvc_divCh").show();
	}
	//pMap.multyselect = true;
	init_grid(pMap);
}


function DeptReceiptInit_clickEvent(){
	tblDeptReceiptList_init_input();
	DeptReceiptSearch_clickEvent();
}

function DeptReceiptSearch_clickEvent(){ 
	$("#cstrvc_tblDeptReceiptList").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMzIuc2VsZWN0Vm9jTGlzdA==", {
		"key" : "value" ,
		"srcDeptFrDate" : $("#cstrvc_srcDeptFrDate").val().replace(/-/gi, ""),
		"srcDeptToDate" : $("#cstrvc_srcDeptToDate").val().replace(/-/gi, ""),
		"srcDeptRcptType" : $("#cstrvc_selDeptRcptSrchtype option:selected").val(),
		"srcKeyWordType" : $("#cstrvc_selDeptRcptKeyWord option:selected").val(),
		"srcKeyWord" : $("#cstrvc_srcKeyWord").val().replace(/-/gi, ""),
		"srcTntrCont" : $("#cstrvc_srcTntrCont").val(),
		"chkUnsetYn" : $("#chkUnsetYn").prop("checked")? "Yes" : "No",
		"chkAllDept" : $("#chkAllDeptReceipt").prop("checked") ? true : false,
		"cvlActStCds": chkshowTypeByUserStatus_trfVoc(),
		"orgId" : ouCode,
		"orgUsrId" : usrId,
		"passedDay" : $("#cstrvc_selDeptRcptPassDayType").val() == "all" ? "all" : parseInt($("#cstrvc_selDeptRcptPassDayType").val())
	})} , page : 1, sortname : "TRNR_RQS_DTM", sortorder : "DESC"});
	$("#cstrvc_tblDeptReceiptList").trigger("reloadGrid");
	
}

function getPassportDeptAffrsInfo() {
	var inf;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : "/ajax/civilservice/cswGetPassportDeptAffrsInfo.do",
		data : "pJson=" + getAffrsInfoByPassportDept(),
		success : function(data) {
			inf = data;
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	return inf;
}

function getAffrsInfoByPassportDept() {
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNjEuQWZmcnNJbmZvQnlQYXNzcG9ydERlcHQ=",
			"map" : {
				"key" : "value",
			}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

function changeStateCharger(){
	//hhs 20.04.02
	var cvl_act_st_cd = "";
	if(ouCode != $("#cstrvc_ch_org_id").val()){
		cvl_act_st_cd="010200" //부서접수
	}else{
		cvl_act_st_cd="010300" //담당자지정
	}
	
	var pList1 = [];
	var Rows = $("#cstrvc_tblDeptReceiptList").getRowData();
	for(var i = 0 ; i <= Rows.length; i++ )
	{	
		if(jQuery.isEmptyObject(Rows[i]))
			continue;
		
		if($("#jqg_cstrvc_tblDeptReceiptList_"+(i*1+1)).prop("checked")){
				pList1.push({
					"qt" : "aW5zZXJ0",
					"mi" : "Y20wMzIuY2hhbmdlc3RhdGVjaGFyZ2Vy",
					"map" : {
						"tntr_id" : Rows[i].TNTR_ID, 
						"ord" : Rows[i].ORD,
						"r_org_id" : $("#cstrvc_ch_org_id").val(), 
						"r_org_ful_nm" : $("#cstrvc_ch_org_ful_nm").val(),
						
						"r_org_usr_id" : $("#cstrvc_ch_org_usr_id").val(), 
						"r_org_usr_nm" : $("#cstrvc_ch_org_usr_nm").val(), 
						"r_ofce_tel_no" : $("#cstrvc_ch_ofce_tel_no").val(),
						"cvl_act_st_cd" : cvl_act_st_cd,
						"r_rtn_rsn" : $("#cstrvc_txtrtn_rsn").val().replace(/%/gi, "퍼센트"),
						"orgUsrId" : usrId == "" ? "시스템관리자" : usrId
					}
				});
			}
		
		if($("#jqg_cstrvc_tblDeptReceiptList_"+(i*1+1)).prop("checked")){
			pList1.push({
				"qt" : "aW5zZXJ0",
				"mi" : "Y20wMzIuY2hhbmdlc3RhdGVjaGFyZ2VySGlz",
				"map" : {
					"tckt_id" : Rows[i].TCKT_ID,
					"ord" : Rows[i].ORD,
					"r_org_ful_nm" : $("#cstrvc_ch_org_ful_nm").val(),
					
					"r_org_usr_nm" : $("#cstrvc_ch_org_usr_nm").val(), 
					"r_tntr_cont" : $("#cstrvc_tntr_cont").val().replace(/%/gi, "퍼센트"),
					"cvl_act_st_cd" : $("#cstrvc_ch_cvlActSt_010200").prop("checked") ? "010200" : "010300",
					"r_rtn_rsn" : $("#cstrvc_txtrtn_rsn").val().replace(/%/gi, "퍼센트"),
					"orgUsrId" : usrId == "" ? "시스템관리자" : usrId
				}
			});
		}
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/cswchangestatecharger.do",
		data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
		success : function(data) {
			
			alert("일괄 변경되었습니다.");
			$("#cstrvc_btnDeptReceiptSearch").trigger("click");
			
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

//휴일체크
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

//담당자지정 저장
function DeptReceiptUsrSave_clickEvent(){
	var cvlActSt;
	var seoMooInfo;
	var cc_affairs_yn = false;
	var chkDeptCode = true;
	var countDeptChanged;
	
	if($("#cstrvc_r_org_usr_id").val().trim() == ""){
		alert("지정하실 담당자를 선택하십시요.");
		return false;
	};
	
	if((ouCode != $("#cstrvc_r_org_id").val()) && $("#cstrvc_r_rtn_rsn").val().trim()==""){
		alert("재지정 사유를 입력해주세요.");
		$("#cstrvc_r_rtn_rsn").focus();
		return false;
	}
	
	//hhs 20.03.31
	if(ouCode==$("#cstrvc_r_org_id").val()){ //같은부서
		cvlActSt="010300"; //담당자지정
	}else{ //다른부서
		cvlActSt="010200"; //부서지정
	};
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : "/ajax/civilservice/cswGetCountDeptChangedByDptRcipt.do",
		data : "pJson=" + getCountDeptChangedByDptRcipt(),
		success : function(data) {
			countDeptChanged = data;
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	if (countDeptChanged.length >= 2) {
		if (window.sessionStorage.getItem("CC_AUTH") == "Y") {
//			alert("90909 등록된 사용자는 부서(재)지정 횟수 제한없음");
		} else {
			if ($("#cstrvc_r_org_id").val() == "40903530000" && $("#cstrvc_r_ofce_cc_affairs_yn").val() == "Y") {
//			alert("부서(재)지정 2회 초과했지만 대상자는 민여과 서무")
			} else if (ouCode == $("#cstrvc_r_org_id").val()) {
//				alert("부서(재)지정 2회 초과했지만 대상자는 본인과 사용자")
			} else {
				alert(" 부서 재지정은 2회만 가능합니다.\n 민원여권과 서무를 지정하여 부서 재지정 요청을 해주세요.")
				var pssprtAffrsInfo = getPassportDeptAffrsInfo();
				$("#cstrvc_r_org_usr_id").val(pssprtAffrsInfo[0].UID_);
				$("#cstrvc_r_org_id").val(pssprtAffrsInfo[0].OUCODE); 
        		$("#cstrvc_r_org_ful_nm").val(pssprtAffrsInfo[0].ORGFULLNAME);  
				$("#cstrvc_r_org_usr_nm").val(pssprtAffrsInfo[0].DISPLAYNAME); 
				$("#cstrvc_r_ofce_tel_no").val(pssprtAffrsInfo[0].TELEPHONENUMBER);  
				$("#cstrvc_r_org_usr_mobile").val(pssprtAffrsInfo[0].MOBILE);
				$("#cstrvc_r_ofce_cc_affairs_yn").val(pssprtAffrsInfo[0].CC_AFFAIRS_YN);
				$("#cstrvc_tfTransfUser").val(pssprtAffrsInfo[0].USERFULLNAME);
				return;
			};
		};
	};
	
	if (confirm("담당자 지정 하시겠습니까?") == true) {
		if ($("#cstrvc_r_ofce_cc_affairs_yn").val() == "Y") {
			cc_affairs_yn = true;
		};
		
		if (ouCode != $("#cstrvc_r_org_id").val()) {
			chkDeptCode = false;
		};
		
		if ($("#cstrvc_r_ofce_cc_affairs_yn").val() != "Y") {
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : "/ajax/civilservice/cswGetSeoMooInfoByDptRcpt.do",
				data : "pJson=" + getSeoMooInfoByDptRcpt(),
				success : function(data) {
					seoMooInfo = data;
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});
		};
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : "/ajax/civilservice/cswDeptReceiptUsrSave.do",
			data : "pJson=" + getDeptReceipt(cvlActSt, seoMooInfo, cc_affairs_yn, chkDeptCode), 
			success : function(data)
			{
				//hhs 20.04.08 이관민원 쪼개기
				$.ajax({
					type : "post",
					dataType: "json",
					async : false,
					url : "/ajax/civilservice/cswDeptReceiptUsrSave.do",
					data : "pJson=" + getDeptReceiptHis(cvlActSt, seoMooInfo, cc_affairs_yn, chkDeptCode), 
					success : function(data)
					{
						
						alert("담당자 지정을 완료하였습니다.");

						// 재지정시 다르게 보내려면 아래 주석 해제
//						if(smsCheck != "010200"){
//							cont = "온누리콜센터의 이관민원 처리 담당자로 재지정되셨습니다.";
//						}
						
						var sendMobile = $("#cstrvc_r_org_usr_mobile").val().replace(/-/gi, "").trim();
						if(sendMobile == ""){
							alert("지정한 담당자의 휴대폰번호가 없어 자동 문자 발송을 하지 못하였습니다.");
						}else{
							// SMS 발신
							fnSendSms($("#cstrvc_r_org_usr_id").val(),sendMobile);
						}
						
						tblDeptReceiptList_init_input();
						DeptReceiptSearch_clickEvent();
						
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				})
				
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	};
}

// 담당자 지정시 문자 발신
function fnSendSms(sendId,sendMobile){
//	console.log("[담당자정보] uid : " + sendId + ", pNum : " + sendMobile);
	
	var ttl = "이관문의 담당자지정안내[자동]";
	var cont = "순천시3114온누리콜센터입니다. 시민의 문의가 있어 내용을 이관하였으니 새올행정 콜센터 메뉴를 확인 후 처리바랍니다.";
	
	// MMS CONTENTS SEQ
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/getMmsSeq.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l","c21zLm5leHR2YWw=", {
			
		}),
		success : function(data){
			var cont_seq = data.SMS_SEQ;
			
			// INSERT MSG_DATA
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/civilservice/setRsltAlrmSendNuri.do",
				data : "pJson=" +  getJsonStrRsltAlrmSendSmsNuri(cont_seq, sendMobile, sendId),
				success : function(data){
					
					// INSERT MMS_CONTENT
					$.ajax({
						type : "post",
						dataType: "json",
						async : false,
						url : getContextPath() + "/ajax/civilservice/setRsltAlrmSendNuriContent.do",
						data : "pJson=" +  getJsonStrRsltAlrmSendSmsNuriContent(cont_seq, ttl, cont),
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
	
}

//파라미터 셋팅_SendSms_NURI
function getJsonStrRsltAlrmSendSmsNuri(cont_seq, sendNum, sendId){
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
				"uid" : sendId,	// 수신 공무원ID
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_SendSms_CONTENT_NURI
function getJsonStrRsltAlrmSendSmsNuriContent(cont_seq, subject, sendMsg){
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

function getCountDeptChangedByDptRcipt() {
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMzQuY291bnREZXB0Q2hhbmdlZA==",
			"map" : {
				"key" : "value",
				"tckt_id" : $("#cstrvc_tckt_id").val(),
				"ord" : $("#cstrvc_ord").val()
			}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

function getSeoMooInfoByDptRcpt() {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0U2VvTW9vSW5mbw==",
			"map" : {
				"key" : "value",
				"oucode" : $("#cstrvc_r_org_id").val()
			}
	};
	return encodeURIComponent(JSON.stringify(loParam)); 
}

function getDeptReceipt(cvlActSt, seoMooInfo, cc_affairs_yn, chkDeptCode){ 
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y20wMzIudXBkYXRlRGVwdFJlY2VpcHQ=",
			"map" : {
				"key" : "value",
				"cvl_act_st_cd" : !chkDeptCode && cc_affairs_yn ? "010200" : "010300", 
				"tntr_id" : $("#cstrvc_tntr_id").val(),
				
				"r_org_usr_id" : !chkDeptCode && cc_affairs_yn ? "" : $("#cstrvc_r_org_usr_id").val(), 
				"r_org_usr_nm" : !chkDeptCode && cc_affairs_yn ? "" : $("#cstrvc_r_org_usr_nm").val(), 
				"r_ofce_tel_no" : !chkDeptCode && cc_affairs_yn ? "" : $("#cstrvc_r_ofce_tel_no").val(),
				
				"r_org_id" : $("#cstrvc_r_org_id").val(), 
				"r_org_ful_nm" : $("#cstrvc_r_org_ful_nm").val(),
				
				"r_affs_org_usr_id" : cc_affairs_yn ? $("#cstrvc_r_org_usr_id").val() : seoMooInfo.AFFAIR_USR_ID,
				"r_affs_usr_nm" : cc_affairs_yn ? $("#cstrvc_r_org_usr_nm").val() : seoMooInfo.AFFAIR_USR_NM,
				"r_affs_ofce_tel_no" : cc_affairs_yn ? $("#cstrvc_r_ofce_tel_no").val() : seoMooInfo.AFFAIR_TEL_NO,
				
				"r_rtn_rsn" : $("#cstrvc_r_rtn_rsn").val().replace(/%/gi, "퍼센트"),
				"orgUsrId" : usrId == "" ? "시스템관리자" : usrId,
			}
		};
	
	if (window.sessionStorage.getItem("CC_AUTH") == "Y" && window.sessionStorage.getItem("CC_AFFAIRS_YN") == "N") {
		loParam.map.cvl_act_st_cd = cvlActSt;
		loParam.map.r_org_usr_id = cvlActSt == "010300" ? $("#cstrvc_r_org_usr_id").val() : "";
		loParam.map.r_org_usr_nm = cvlActSt == "010300" ? $("#cstrvc_r_org_usr_nm").val() : "";
		loParam.map.r_ofce_tel_no = cvlActSt == "010300" ? $("#cstrvc_r_ofce_tel_no").val() : "";
		return encodeURIComponent(JSON.stringify(loParam));
	} else {
		return  encodeURIComponent(JSON.stringify(loParam)); // 이어서 이력보기에 처리자 시스템관리자로 나오게 할것
	};
}

// hhs 20.04.08 이관민원 쪼개기
function getDeptReceiptHis(cvlActSt, seoMooInfo, cc_affairs_yn, chkDeptCode){ 
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "Y20wMzIudXBkYXRlRGVwdFJlY2VpcHRIaXM=",
			"map" : {
				"key" : "value",
				"cvl_act_st_cd" : !chkDeptCode && cc_affairs_yn ? "010200" : "010300", 
				"tckt_id" : $("#cstrvc_tckt_id").val(),
				"ord" : $("#cstrvc_ord").val(),
				
				"r_org_usr_nm_insrt" : $("#cstrvc_r_org_usr_nm").val(), 
				
				"r_org_ful_nm" : $("#cstrvc_r_org_ful_nm").val(),
				
				"r_tntr_cont" : $("#cstrvc_tntr_cont").val().replace(/%/gi, "퍼센트"),
				"r_rtn_rsn" : $("#cstrvc_r_rtn_rsn").val().replace(/%/gi, "퍼센트"),
				"orgUsrId" : usrId == "" ? "시스템관리자" : usrId,
			}
		};
	
	if (window.sessionStorage.getItem("CC_AUTH") == "Y" && window.sessionStorage.getItem("CC_AFFAIRS_YN") == "N") {
		loParam.map.cvl_act_st_cd = cvlActSt;
		loParam.map.r_org_usr_id = cvlActSt == "010300" ? $("#cstrvc_r_org_usr_id").val() : "";
		loParam.map.r_org_usr_nm = cvlActSt == "010300" ? $("#cstrvc_r_org_usr_nm").val() : "";
		loParam.map.r_ofce_tel_no = cvlActSt == "010300" ? $("#cstrvc_r_ofce_tel_no").val() : "";
		return encodeURIComponent(JSON.stringify(loParam));
	} else {
		return  encodeURIComponent(JSON.stringify(loParam)); // 이어서 이력보기에 처리자 시스템관리자로 나오게 할것
	};
}

// 2020.02.27
function getJsonStrGetSmsID(){

	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "Y2gwMjAuZ2V0Q2hTbmRJZA==",
		"map" : {
			"key" : "value",
			
		}
	};
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
	
}

function getJsonStrInsertSmsHis(snd_id, cust_id, sendMobile, ttl, cont, dayChk){
	
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuaW5zZXJ0U21zSGlzdG9yeQ==",
		"map" : {
			"key" : "value",
			"ch_snd_id" : snd_id,
			"tckt_id" : $("#cstrvc_tckt_id").val(),
			"cust_id" : cust_id,
			"ch_gb_cd" : "12000",
			"callback" : "0617493114",
			"rcv_cntct_infm" : sendMobile.replace(/-/gi, ""),
			"snd_ttl" : ttl,
			"snd_cont" : cont,
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : "sysmanager",
			"send_gb" : dayChk,
			"orgUsrId": usrId != "" ? usrId : cust_id 
		}
	};
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// sms전송 
//파라미터 셋팅_SendSms(수신자ID, 수신자전화번호, 제목, 문자내용, 발송시간체크여부)
function getJsonStrSendSms(snd_id, cust_id, sendMobile, ttl, cont, dayChk){
	
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "Y2gwMjAuc2VuZFNtc0F1dG8=",
		"map" : {
			"key" : "value",
			"ch_snd_id" : snd_id,
			"tckt_id" : $("#cstrvc_tckt_id").val(),
			"cust_id" : cust_id,
			"ch_gb_cd" : "12000",
			"rcv_cntct_infm" : sendMobile.replace(/-/gi, ""),
			"snd_ttl" : ttl,
			"snd_cont" : cont,
			
			"snd_rslt_cd" : "-1",
			"snd_req_usr_id" : "sysmanager",
			"cro_id" : "callcenter",

			"subject" : "순천시3114온누리콜센터",
			"callback" : "0617493114",
			"dest_info" : sendMobile.replace(/-/gi, ""),
			"cont_length" : charByteSize(cont),
			"send_gb" : dayChk,
			"orgUsrId": usrId != "" ? usrId : cust_id 
		}
	};
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
	
}

function tblDeptReceiptList_SelectRow(rowid)
{
	var selectRows = jQuery("#cstrvc_tblDeptReceiptList").jqGrid('getGridParam', 'selarrrow');
	
	var deptReceipt = $("#cstrvc_tblDeptReceiptList").jqGrid('getRowData', rowid);
	
	smsCheck = deptReceipt.CVL_ACT_ST_CD;
	
	if((deptReceipt.CC_AFFAIRS_YN == "Y") && (deptReceipt.CVL_ACT_ST_CD == "020200")){ 
		$("#cstrvc_tntr_cont").attr("disabled", true);
		$("#cstrvc_tfTransfUser").attr("disabled", true);
		$("#cstrvc_rd_cvlActSt_010300").attr("disabled", true);
		$("#cstrvc_rd_cvlActSt_010200").attr("disabled", true);
	} else {
		$("#cstrvc_tntr_cont").attr("disabled", false);
		$("#cstrvc_tfTransfUser").attr("disabled", false);
		$("#cstrvc_rd_cvlActSt_010300").attr("disabled", false);
		$("#cstrvc_rd_cvlActSt_010200").attr("disabled", false);	
	};
	
	if (deptReceipt.CC_AFFAIRS_YN == "N" && window.sessionStorage.getItem("CC_AUTH") == "N") { 
		$("#cstrvc_tntr_cont").attr("disabled", true);
		$("#cstrvc_tfTransfUser").attr("disabled", true);
		$("#cstrvc_rd_cvlActSt_010300").attr("disabled", true);
		$("#cstrvc_rd_cvlActSt_010200").attr("disabled", true);
	};
	
    $("#cstrvc_tckt_id").val(deptReceipt.TCKT_ID);
	$("#cstrvc_tntr_id").val(deptReceipt.TNTR_ID);
	$("#cstrvc_ord").val(deptReceipt.ORD);	
    
	$("#cstrvc_trnr_rqs_dtm").html(deptReceipt.TRNR_RQS_DTM);
	$("#cstrvc_rqs_usr_nm").html(deptReceipt.RQS_USR_NM);
	$("#cstrvc_cust_id").val(deptReceipt.CUST_ID);
	$("#cstrvc_ctzn").html(deptReceipt.CTZN);	
	$("#cstrvc_ctzn_tel_no").html(deptReceipt.CTZN_TEL_NO);
	
	$("#cstrvc_tntr_cont").val(deptReceipt.TNTR_CONT);	
	
	//$("input:radio[name='90300']").removeAttr("checked");
	

	$('#cstrvc_rd_cvl_rqs_gb_cd>input:radio[name=90016]:radio[value='+deptReceipt.CVL_RQS_GB_CD+']').prop('checked', true);
	
	$('input:radio[name=rd_cvl_rslt_rcv_yn]:input[value='+deptReceipt.CVL_RSLT_RCV_YN+']').prop('checked', true);
	
	
	$('#cstrvc_rd_cvl_act_st_cd>input:radio[name=90300]:radio[value='+deptReceipt.CVL_ACT_ST_CD+']').prop('checked', true);	
	
	
	$("#cstrvc_org_ful_nm").html(deptReceipt.ORG_FUL_NM);
	$("#cstrvc_affs_usr_nm").html(deptReceipt.AFFS_USR_NM);
	$("#cstrvc_rtn_rsn").html(deptReceipt.RTN_RSN);
	
	if(deptReceipt.CVL_ACT_ST_CD == "030200"){ // 부서재지정상태인경우
		$('input:radio[name=rd_cvlActSt]:input[value=010200]').prop('checked', true);	// 처리상태변경(부서재지정 선택)
		fnCvlActStChange("010200")
	}else{
		$('input:radio[name=rd_cvlActSt]:input[value=010300]').prop('checked', true);	// 처리상태변경(담당자지정 선택)
		fnCvlActStChange("010300")
	}
	
	$("#cstrvc_DeptReceiptHistory").show();
	$("#cstrvc_cntrSearch1").show();
	
	if (selectRows.length > 1) {
		$("#cstrvc_ch_cvlActSt_010200").prop("disabled", false);
		$("#cstrvc_ch_cvlActSt_010300").prop("checked", true);
		$("#cstrvc_ch_cvlActSt_010300").prop("disabled", false);
		$("#cstrvc_ch_tfTransfUser").prop("disabled", false);
		$("#cstrvc_txtrtn_rsn").prop("disabled", false);
		$("#cstrvc_changeStateCharger").show();
		
		$("#cstrvc_rd_cvlActSt_010200").prop("checked", false);
		$("#cstrvc_rd_cvlActSt_010200").prop("disabled", true);
		$("#cstrvc_rd_cvlActSt_010300").prop("checked", false);
		$("#cstrvc_rd_cvlActSt_010300").prop("disabled", true);
		$("#cstrvc_tfTransfUser").prop("disabled", true);
		$("#cstrvc_DeptReceiptUsrSave").hide();
	} 
	else if (selectRows.length <= 1) {
		$("#cstrvc_ch_cvlActSt_010200").prop("checked", false);
		$("#cstrvc_ch_cvlActSt_010200").prop("disabled", true);
		$("#cstrvc_ch_cvlActSt_010300").prop("checked", false);
		$("#cstrvc_ch_cvlActSt_010300").prop("disabled", true);
		$("#cstrvc_ch_tfTransfUser").prop("disabled", true);
		$("#cstrvc_txtrtn_rsn").prop("disabled", true);
		$("#cstrvc_changeStateCharger").hide();
		$("#cstrvc_DeptReceiptUsrSave").show();
	}
	
	//hhs
    var proval = 0;
		switch(deptReceipt.CVL_ACT_ST_CD){
		case "010200" :
   			proval = 25;
   			cswVocD_cssEvent(deptReceipt.CVL_ACT_ST_CD);
   		      break;
   		case "010300" :
   			proval = 50;
   			cswVocD_cssEvent(deptReceipt.CVL_ACT_ST_CD);
   		      break;
   		case "020100" :
   			proval = 75;
   			cswVocD_cssEvent(deptReceipt.CVL_ACT_ST_CD);
   		      break;
   		case "020200" :
   			$("#cswVocD_progressbar > *").css("color","#ffffff");
   			proval = 100;
   			break;
   		}
		$("#cswVocD_progressbar").progressbar({
			value : proval
		});
}

//hhs 20.04.02 progress-label css
function cswVocD_cssEvent(CVL_ACT_ST_CD) {
	switch (CVL_ACT_ST_CD) {
	case "010200": // 부서접수
		$("#cswVocD_progressbar > *").css("color", "#ffffff");
		$("#cswVocD_progressbar > *").eq(1).css("color", "#1a1a1a");
		$("#cswVocD_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#cswVocD_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	case "010300": // 담당자지정
		$("#cswVocD_progressbar > *").css("color", "#ffffff");
		$("#cswVocD_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#cswVocD_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	case "020100": // 처리중
		$("#cswVocD_progressbar > *").css("color", "#ffffff");
		$("#cswVocD_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	case "020200": // 완료
		$("#cswVocD_progressbar > *").css("color", "#ffffff");
		$("#cswVocD_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	}
}



function DeptReceiptHistory_clickEvent() {
	window.open("", "cswOpenSub", 'scrollbars=no,resizable=no,width=1200,height=750,left=150, top=150'); 
	
	document.hform.target ="cswOpenSub"; 
	document.hform.action="/web/civilservice/cswVocHistory.do"; 
	document.hform.submit();
}

function fn_tblChargerProcess_init() {
	
	// 날짜 세팅
	d_frDate = getPrvDay("M", 2, "-");	// 2020.01.09 3개월 데이터를 가져오도록 수정
	d_toDate = getDate();
	datePicker("#cstrvc_srcChargerFrDate");
	datePicker("#cstrvc_srcChargerToDate");
	$("#cstrvc_srcChargerFrDate").val(d_frDate);
	$("#cstrvc_srcChargerToDate").val(d_toDate);
	
//	$("#cstrvc_p_tfTransfUser").attr('disabled', true);
	$("#cstrvc_btnSmsSend").hide();
	
	//setSelectBoxWithCode2("srcChargerCvlActStCd", "전체", "90300", g_popup, "", "");	// 조회조건 - 처리상태
	
	// RadioBox
	setRadioBoxWithCode("cstrvc_rd_cvl_rqs_gb_cd_c","90016", "", "","");			// 요청구분
	setRadioBoxWithCode("cstrvc_rd_cvl_act_st_cd_c","90300", "", "","");			// 처리상태
	
	
	tblChargerProcess_init_grid();
	tblChargerList_init_input();
	
	// hhs 20.04.02
    $("#cswVocP_progressbar").progressbar({
	      value: 0
    });

	// 담당자처리 조회 버튼 클릭 이벤트 등록
	$("#cstrvc_btnChargerSearch").bind("click", ChargerSearch_clickEvent);		

	// 담당자처리 초기화 버튼 클릭 이벤트
	$("#cstrvc_btnChargerInit").bind("click", ChargerInit_clickEvent);
	
	// 담당자처리 엑셀다운 버튼 클릭 이벤트
	$("#cstrvc_btnChargerExcelDown").bind("click", btnChargerExcelDown_clickEvent);
	
	// 이력보기
	$("#cstrvc_ChargerHistory").bind("click", ChargerHistory_clickEvent);	
	
	// 상세보기
	$("#cstrvc_ChargerDetail").bind("click", ChargerDetail_clickEvent);
	
	// SMS발송
	$("#cstrvc_btnSmsSend").bind("click", ChargerSmsSend_clickEvent);
	
	$("#cstrvc_selChargerPassDayType").on("change", function() {
		if (this.value != "all") {
			$("#cstrvc_srcChargerFrDate").prop("disabled", true);
			$("#cstrvc_srcChargerFrDate").next(".ui-datepicker-trigger").prop("disabled", true);
			$("#cstrvc_srcChargerToDate").prop("disabled", true);
			$("#cstrvc_srcChargerToDate").next(".ui-datepicker-trigger").prop("disabled", true);
		} else {
			$("#cstrvc_srcChargerFrDate").prop("disabled", false);
			$("#cstrvc_srcChargerFrDate").next(".ui-datepicker-trigger").prop("disabled", false);
			$("#cstrvc_srcChargerToDate").prop("disabled", false);
			$("#cstrvc_srcChargerToDate").next(".ui-datepicker-trigger").prop("disabled", false);
		}
	});
	
	$("#cstrvc_srcChargerText").bind("keydown", function(key){
		if (key.keyCode == 13)
			ChargerSearch_clickEvent();
	});
	
	// 담당자처리 저장
//	$("#cstrvc_btnChargerSave").bind("click", ChargerSave_clickEvent);
	$("#cstrvc_btnChargerSave,#cstrvc_btnIng,#cstrvc_btnComplete").bind("click", ChargerSave_clickEvent); //hhs

}

function btnChargerExcelDown_clickEvent(){
    excelDownLoad("/excel/civilservice/cswSelectVocCharger.do", getJsonVocChargerExcel());
}

function getJsonVocChargerExcel() {
	var loParam = {
		    "qt" : "c2VsZWN0TGlzdA==",
		    "mi" : "Y20wMzIuc2VsZWN0Vm9jQ2hhcmdlckxpc3RFeGNlbA==",
		    "map" : {
				"key" : "value",
				"srcChargerFrDate" : $("#cstrvc_srcChargerFrDate").val().replace(/-/gi, ""),
				"srcChargerToDate" : $("#cstrvc_srcChargerToDate").val().replace(/-/gi, ""),
				"srcChargerCvlActStCd" : $("#cstrvc_srcChargerCvlActStCd").val(),
				"selChargerSrchtype" : $("#cstrvc_selChargerSrchtype").val(),
				"srcChargerText" : $("#cstrvc_srcChargerText").val().replace(/-/gi, ""),
				"chkFinishYn" : $("#cstrvc_chkFinishYn").prop("checked")?  "Yes" : "No",
				"cvlActStCds":["010300","020100","020200"],  /* '010300 : 담당자지정','020100 : 담당자처리중','020200 : 처리완료' */
				"orgId" : ouCode,
				"orgUsrId" : usrId,
				"title" : "이관민원_나의민원_현황" + setDownLoadName($("#cstrvc_srcChargerFrDate").val(), $("#cstrvc_srcChargerToDate").val()),
				"colWidth" : [35, 35, 35, 35, 35, 35, 35, 35, 35],
				"colName" : ["TRNR_RQS_DTM", "CTZN", "CTZN_TEL_NO", "CVL_RQS_GB_NM", "CVL_RSLT_RCV_YN", "ORG_FUL_NM", "AFFS_USR_NM", "ORG_USR_NM", "CVL_ACT_ST_NM"],
				"colHeader" : [ "접수시간", "민원인", "민원인연락처", "처리기한", "결과수신여부", "담당부서", "서무", "담당자", "민원처리상태"],
				"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center", "center"]
		    }
	    };
	    return  encodeURIComponent(JSON.stringify(loParam));
}

// 담당자처리 그리드
function tblChargerProcess_init_grid()
{
	pMap = {};
	pMap.tblId = "cstrvc_tblChargerList";
	pMap.url   = "/jqgrid/civilservice/cswSelectVocChargerList.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMzIuc2VsZWN0Vm9jQ2hhcmdlckxpc3Q=", {
		"key" : "value" ,
		"srcChargerFrDate" : $("#cstrvc_srcChargerFrDate").val().replace(/-/gi, ""),
		"srcChargerToDate" : $("#cstrvc_srcChargerToDate").val().replace(/-/gi, ""),
		"srcChargerCvlActStCd" : $("#cstrvc_srcChargerCvlActStCd").val(),
		"selChargerSrchtype" : $("#cstrvc_selChargerSrchtype").val(),
		"srcChargerText" : $("#cstrvc_srcChargerText").val().replace(/-/gi, ""),
		"chkAllDept" : $("#chkAllDeptChProcess").prop("checked") ? true : false,
		"chkFinishYn" : $("#cstrvc_chkFinishYn").prop("checked") ?  "Yes" : "No",
		"cvlActStCds":["010300","020100","020200"],  /* '010300 : 담당자지정','020100 : 담당자처리중','020200 : 처리완료' */
		"orgId" : ouCode,
		"orgUsrId" : usrId,
		"passedDay" : $("#cstrvc_selChargerPassDayType").val() == "all" ? "all" : parseInt($("#cstrvc_selChargerPassDayType").val())
	});
	pMap.colNames = ["TCKT_ID", "TNTR_ID", "ORD", "TRNR_RQS_DT", "접수시간", "TRNR_RQS_USR_ID", "접수자","민원인", "민원인연락처","이관내용",
	                 "CVL_RQS_GB_CD", "처리기한", "결과수신여부", "ORG_ID","담당부서","AFFS_ORG_USR_ID","서무","AFFS_OFCE_TEL_NO",
	                 "ORG_USR_ID", "담당자","OFCE_TEL_NO", "CVL_ACT_ST_CD", "민원처리상태", "민원처리내용","CHARGER_YN"
	                ];
	pMap.colModel =
   	[
   	 	{ name : "TCKT_ID", index : "TCKT_ID", align : "center", hidden : true},
   	 	{ name : "TNTR_ID", index : "TNTR_ID", align : "center", hidden : true },
   	 	{ name : "ORD", index : "ORD", align : "center", hidden : true },
   	 	{ name : "TRNR_RQS_DT", index : "TRNR_RQS_DT", align : "center", hidden : true },
   	 	{ name : "TRNR_RQS_DTM" , index : "TRNR_RQS_DTM", align : "center", width : 200 },
   	 	
   	 	{ name : "TRNR_RQS_USR_ID", index : "TRNR_RQS_USR_ID", align : "center", hidden : true },
   	 	{ name : "RQS_USR_NM", index : "RQS_USR_NM", align : "center", hidden : true },
   	 	
   	 	{ name : "CTZN", index : "CTZN", align : "center", width : 170, hidden : true },
   	 	{ name : "CTZN_TEL_NO", index : "CTZN_TEL_NO", align : "center", width : 200 },
   	 	{ name : "TNTR_CONT", index : "TNTR_CONT", align : "left", width : 400 , hidden : true },
   	 	
   	 	{ name : "CVL_RQS_GB_CD", index : "CVL_RQS_GB_CD", align : "center", hidden : true  },
	 	{ name : "CVL_RQS_GB_NM", index : "CVL_RQS_GB_NM", align : "center", hidden : false },

   	 	{ name : "CVL_RSLT_RCV_YN", index : "CVL_RSLT_RCV_YN", align : "center", hidden : false  },

	 	{ name : "ORG_ID", index : "ORG_ID", align : "center", hidden : true  },
	 	{ name : "ORG_FUL_NM", index : "ORG_FUL_NM", align : "center", hidden : false, width : 250 },
	 	{ name : "AFFS_ORG_USR_ID", index : "AFFS_ORG_USR_ID", align : "center", hidden : true  },
	 	{ name : "AFFS_USR_NM", index : "AFFS_USR_NM", align : "center", width : 160 },
	 	{ name : "AFFS_OFCE_TEL_NO", index : "AFFS_OFCE_TEL_NO", align : "center", hidden : true  },
	 	
	 	{ name : "ORG_USR_ID", index : "ORG_USR_ID", align : "center", hidden : true  },
	 	{ name : "ORG_USR_NM", index : "ORG_USR_NM", align : "center",  width : 160  },
	 	{ name : "OFCE_TEL_NO", index : "OFCE_TEL_NO", align : "center", hidden : true  },
	 	
	 	{ name : "CVL_ACT_ST_CD", index : "CVL_ACT_ST_CD", align : "center", hidden : true  },
	 	{ name : "CVL_ACT_ST_NM", index : "CVL_ACT_ST_NM", align : "center", width : 160 },
	 	{ name : "CVL_ACT_CONT", index : "CVL_ACT_CONT", align : "center", hidden : true },
   	 	
   	 	{ name : "CHARGER_YN", index : "CHARGER_YN", align : "center",  hidden : true }
   	];
	pMap.rowNum = "8";
	pMap.sortname = "TRNR_RQS_DTM";
	pMap.sortorder = "DESC";
	pMap.width = "99%";
	pMap.height = "251";
	pMap.pager = "cstrvc_pagingChargerList";
	pMap.selectEvent = "tblChargerList_SelectRow";
	pMap.rowNumber = true;
	
	init_grid(pMap);
}

function ChargerSearch_clickEvent(){
	$("#cstrvc_tblChargerList").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMzIuc2VsZWN0Vm9jQ2hhcmdlckxpc3Q=", {
		"key" : "value" ,
		"srcChargerFrDate" : $("#cstrvc_srcChargerFrDate").val().replace(/-/gi, ""),
		"srcChargerToDate" : $("#cstrvc_srcChargerToDate").val().replace(/-/gi, ""),
		"srcChargerCvlActStCd" : $("#cstrvc_srcChargerCvlActStCd").val(),
		"selChargerSrchtype" : $("#cstrvc_selChargerSrchtype").val(),
		"srcChargerText" : $("#cstrvc_srcChargerText").val().replace(/-/gi, ""),
		"chkAllDept" : $("#chkAllDeptChProcess").prop("checked") ? true : false,
		"chkFinishYn" : $("#cstrvc_chkFinishYn").prop("checked")?  "Yes" : "No",
		"cvlActStCds":["010300","020100","020200"],  /* '010300 : 담당자지정','020100 : 담당자처리중','020200 : 처리완료' */
		"orgId" : ouCode,
		"orgUsrId" : usrId,
		"passedDay" : $("#cstrvc_selChargerPassDayType").val() == "all" ? "all" : parseInt($("#cstrvc_selChargerPassDayType").val())
	})} , page : 1, sortname : "TRNR_RQS_DTM", sortorder : "DESC"});
	$("#cstrvc_tblChargerList").trigger("reloadGrid");
}

function tblChargerList_init_input()
{
	$("#cstrvc_trnr_rqs_dtm_c").html("");
	$("#cstrvc_rqs_usr_nm_c").html("");
	$("#cstrvc_ctzn_c").html("");	
	$("#cstrvc_ctzn_tel_no_c").html("");
	
	$("#cstrvc_tntr_cont_c").val("");
	$("#cstrvc_rd_cvl_rqs_gb_cd_c").attr("disabled");
	$("#cstrvc_rd_cvl_rqs_gb_cd_c>input:radio[name='90016']").removeAttr("checked");
	$("input:radio[name='rd_cvl_rslt_rcv_yn_c']").removeAttr("checked");
	$("#cstrvc_rd_cvl_act_st_cd_c>input:radio[name='90300']").removeAttr("checked");
	$("input:radio[name='rd_cvlActSt_c']").removeAttr("checked");
	
	
	$("#cstrvc_org_ful_nm_c").html("");	
	$("#cstrvc_affs_usr_nm_c").html("");	
	$("#cstrvc_org_usr_nm_c").html("");	
	
	$("#cstrvc_r_rtn_rsn_c").val("");
	$("#cstrvc_cvl_act_cont").val("");
	$("#cstrvc_p_org_usr_id").val("");
	$("#cstrvc_p_tfTransfUser").val("");
	
	
	$("#cstrvc_btnChargerSave").hide();	// 저장버튼 비활성
	$("#cstrvc_ChargerHistory").hide();	// 이력보기 비활성
	$("#cstrvc_ChargerDetail").hide();	// 상세보기 비활성
	
	$("#cstrvc_srcChargerCvlActStCd").val("all");
	$("#cstrvc_srcChargerFrDate").val(d_frDate);
	$("#cstrvc_srcChargerToDate").val(d_toDate);
	$("#cstrvc_selChargerPassDayType").val("all");
	$("#cstrvc_selChargerSrchtype").val("srchAll");
	$("#cstrvc_srcChargerText").val("");
	$("#cstrvc_chkFinishYn").prop("checked", true);
	$("#chkAllDeptChProcess").prop("checked", false);
	
	$("#cstrvc_srcChargerFrDate").prop("disabled", false);
	$("#cstrvc_srcChargerFrDate").next(".ui-datepicker-trigger").prop("disabled", false);
	$("#cstrvc_srcChargerToDate").prop("disabled", false);
	$("#cstrvc_srcChargerToDate").next(".ui-datepicker-trigger").prop("disabled", false);
}



function tblChargerList_SelectRow(rowid)
{
	var charger = $("#cstrvc_tblChargerList").jqGrid('getRowData', rowid);
	
	if (charger.CVL_ACT_ST_CD == "020200" && charger.CVL_RSLT_RCV_YN == "Y") { // 처리완료이고 결과수신여부  Y
		$("#cstrvc_btnSmsSend").show();
	} else {
		$("#cstrvc_btnSmsSend").hide();
	};

	if (ouCode != charger.ORG_ID) { // 나의민원 탭은 본인에게 지정된 민원건만 조작할 수 있음! 자신이 지정되지 않은 다른 공무원들의 민원건들은 조작 못함.
		$("#cstrvc_tntr_cont_c").prop('disabled', true);
		$("#cstrvc_rd_cvlActSt_c020100").parent().prop('disabled', true);
		$("#cstrvc_btnSmsSend").hide();
	};
	
	$("#cstrvc_p_org_usr_id,#cstrvc_p_tfTransfUser,#cstrvc_r_rtn_rsn_c").val("");
	
	$("#cstrvc_ofce_tel_no").val(charger.OFCE_TEL_NO);
    $("#cstrvc_tckt_id_c").val(charger.TCKT_ID);
	$("#cstrvc_tntr_id_c").val(charger.TNTR_ID);
	$("#cstrvc_ord_c").val(charger.ORD);	
    
	$("#cstrvc_trnr_rqs_dtm_c").html(charger.TRNR_RQS_DTM);
	$("#cstrvc_rqs_usr_nm_c").html(charger.RQS_USR_NM);
	$("#cstrvc_ctzn_c").html(charger.CTZN);	
	$("#cstrvc_ctzn_tel_no_c").html(charger.CTZN_TEL_NO);
	
	$("#cstrvc_tntr_cont_c").val(charger.TNTR_CONT);
	

	$('#cstrvc_rd_cvl_rqs_gb_cd_c>input:radio[name=90016]:radio[value='+charger.CVL_RQS_GB_CD+']').prop('checked', true);
	$('input:radio[name=rd_cvl_rslt_rcv_yn_c]:input[value='+charger.CVL_RSLT_RCV_YN+']').prop('checked', true);
	$('#cstrvc_rd_cvl_act_st_cd_c>input:radio[name=90300]:radio[value='+charger.CVL_ACT_ST_CD+']').prop('checked', true);
	
	
	$("#cstrvc_org_ful_nm_c").html(charger.ORG_FUL_NM);	
	$("#cstrvc_affs_usr_nm_c").html(charger.AFFS_USR_NM);	
	$("#cstrvc_org_usr_nm_c").html(charger.ORG_USR_NM);
		
	$("#cstrvc_cvl_act_cont").val(charger.CVL_ACT_CONT);	
	
	if(charger.CVL_ACT_ST_CD == "020200") { // 처리완료
		$("#cstrvc_btnChargerSave").hide();
		$("#cstrvc_btnIng").hide(); //hhs
		$("#cstrvc_btnComplete").hide(); //hhs
 		$("#cstrvc_cntrSearch2").hide(); //hhs
		$("#cstrvc_p_tfTransfUser").attr('disabled', true); //hhs
		$("#cstrvc_cvl_act_cont").attr('disabled', true); //hhs
		$("#cstrvc_r_rtn_rsn_c").attr('disabled', true); //hhs
		$("#cstrvc_trRtn_rsn").attr('disabled', true); //hhs
//		$('input:radio[name=rd_cvlActSt_c]').prop('disabled', true);
		$("input[name=cstrvc_r_rtn_rsn_c]").attr("readonly", true); //hhs
	}else{
		$("#cstrvc_btnChargerSave").show();
		$("#cstrvc_btnIng").show(); //hhs
		$("#cstrvc_btnComplete").show(); //hhs
 		$("#cstrvc_cntrSearch2").show(); //hhs
		if(charger.CHARGER_YN == 'N'){ //담당자 != 나 (관리자)
			$('input:radio[id=rd_cvlActSt_c020100]').prop('disabled', true);
			$('input:radio[id=rd_cvlActSt_c020200]').prop('disabled', true);
			$('input:radio[id=rd_cvlActSt_c030100]').removeAttr("disabled");
			$('input:radio[id=rd_cvlActSt_c030200]').removeAttr("disabled");
			$("#cstrvc_cvl_act_cont").attr('disabled', true); //hhs
			$("#cstrvc_p_tfTransfUser").attr('disabled', true); //hhs
			$("#cstrvc_r_rtn_rsn_c").attr('disabled', true); //hhs
			$("input[name=cstrvc_r_rtn_rsn_c]").attr("readonly", true);
			$("#cstrvc_btnChargerSave").hide(); //hhs
			$("#cstrvc_btnIng").hide(); //hhs
			$("#cstrvc_btnComplete").hide(); //hhs
	 		$("#cstrvc_cntrSearch2").hide(); //hhs
		}else{		//담당자 = 나
			$('input:radio[name=rd_cvlActSt_c]').removeAttr("disabled");
			$("#cstrvc_cvl_act_cont").attr('disabled', false); //hhs
			$("#cstrvc_p_tfTransfUser").attr('disabled', false); //hhs
			$("#cstrvc_r_rtn_rsn_c").attr('disabled', false); //hhs
			$("#cstrvc_trRtn_rsn").attr('disabled', false);
			$("input[name=cstrvc_r_rtn_rsn_c]").attr("readonly", false); //hhs
			$("#cstrvc_r_rtn_rsn_c").val("");
		}		
	}
	
	$("#cstrvc_ChargerHistory").show();	// 이력보기 활성
//	$("#cstrvc_ChargerDetail").show();	// 상세보기 활성
	
	//hhs
    var proval = 0;
		switch(charger.CVL_ACT_ST_CD){
		case "010200" :
   			proval = 25;
   			cswVocP_cssEvent(charger.CVL_ACT_ST_CD);
   		      break;
   		case "010300" :
   			proval = 50;
   			cswVocP_cssEvent(charger.CVL_ACT_ST_CD);
   		      break;
   		case "020100" :
   			proval = 75;
   			cswVocP_cssEvent(charger.CVL_ACT_ST_CD);
   		      break;
   		case "020200" :
   			$("#cswVocP_progressbar > *").css("color","#ffffff");
   			proval = 100;
   			break;
   		}
		$("#cswVocP_progressbar").progressbar({
			value : proval
		});
	
}

//hhs 20.04.06
function keyPressEvent(e){
	var clickId = e.id;
	var newValue;
	if(clickId=="cstrvc_cvl_act_cont"){
	$("#cstrvc_cvl_act_cont").on("propertychange change keyup paste input", function() {
        newValue = $(this).val();
        if(newValue.length == 0){
        	$("#cstrvc_p_tfTransfUser").attr('disabled', false); 
        	$("#cstrvc_r_rtn_rsn_c").attr('disabled', false);
        }else{
        	$("#cstrvc_p_tfTransfUser").attr('disabled', true);
        	$("#cstrvc_r_rtn_rsn_c").attr('disabled', true);
        	$("#cstrvc_r_rtn_rsn_c,#cstrvc_p_tfTransfUser").val("");
        }
     });
	}else if(clickId=="cstrvc_p_tfTransfUser" || clickId=="cstrvc_r_rtn_rsn_c"){
		$("#cstrvc_p_tfTransfUser,#cstrvc_r_rtn_rsn_c").on("propertychange change keyup paste input", function() {
	        newValue = $(this).val();
	        if(newValue.length == 0){
	        	$("#cstrvc_cvl_act_cont").attr('disabled', false);
	        }else{
	        	$("#cstrvc_cvl_act_cont").attr('disabled', true);
	        	$("#cstrvc_cvl_act_cont").val("");
	        }
	     });
	}else{}
}

//hhs 20.04.02 progress-label css
function cswVocP_cssEvent(CVL_ACT_ST_CD) {
	switch (CVL_ACT_ST_CD) {
	case "010200": // 부서접수
		$("#cswVocP_progressbar > *").css("color", "#ffffff");
		$("#cswVocP_progressbar > *").eq(1).css("color", "#1a1a1a");
		$("#cswVocP_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#cswVocP_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	case "010300": // 담당자지정
		$("#cswVocP_progressbar > *").css("color", "#ffffff");
		$("#cswVocP_progressbar > *").eq(2).css("color", "#1a1a1a");
		$("#cswVocP_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	case "020100": // 처리중
		$("#cswVocP_progressbar > *").css("color", "#ffffff");
		$("#cswVocP_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	case "020200": // 완료
		$("#cswVocP_progressbar > *").css("color", "#ffffff");
		$("#cswVocP_progressbar > *").eq(3).css("color", "#1a1a1a");
		break;
	}
}

function ChargerInit_clickEvent(){
	tblChargerList_init_input();
	ChargerSearch_clickEvent();
}

function ChargerSmsSend_clickEvent(){
	window.open("", "cswOpenSub", 'scrollbars=no,resizable=no,width=530,height=353,left=150, top=150'); 

	document.hform2.target ="cswOpenSub"; 
	document.hform2.action="/web/civilservice/cswVocSmsSend.do"; 
	document.hform2.submit();
}

function ChargerHistory_clickEvent(){	
	window.open("", "cswOpenSub", 'scrollbars=no,resizable=no,width=1200,height=750,left=150, top=150'); 
	
	document.hform2.target ="cswOpenSub"; 
	document.hform2.action="/web/civilservice/cswVocHistory.do"; 
	document.hform2.submit();
}

function ChargerDetail_clickEvent(){	
	window.open("", "cswOpenSub2", 'scrollbars=no,resizable=no,width=700,height=950,left=150, top=150'); 
	
	document.hform2.target ="cswOpenSub2"; 
	document.hform2.action="/web/civilservice/cswVocDetail.do"; 
	document.hform2.submit();
}

// 담당자처리 처리상태변경 이벤트
function fnCvlActStChangeC(cvlActStChangeCd){ 
	
	 if(cvlActStChangeCd == "030100" || cvlActStChangeCd == "030200"){
		  $("#cstrvc_rd_cvlActSt_010300").prop("checked", false);
		  $("#cstrvc_rd_cvlActSt_010200").prop("checked", false);
		  $("#cstrvc_trRtn_rsn").css("display","table-row");
		  $("#cstrvc_trRtn_rsn").attr("disabled", false);
		  $("input[name=cstrvc_r_rtn_rsn_c]").attr("readonly", false);
		  
		  $("#td010300").children().val("");
		  $("#cstrvc_r_rtn_rsn").val("");
		  
		  $("#cstrvc_p_tfTransfUser").attr('disabled', false);
		  $("#cstrvc_cvl_act_cont").attr('disabled', true);
		  $("#cstrvc_cvl_act_cont").val("");
		  $("#cstrvc_cntrSearch2").show();
	 }else{
//		 $("#cstrvc_trRtn_rsn").css("display","none");
		 $("#cstrvc_r_rtn_rsn_c").val("");
		 $("#cstrvc_trRtn_rsn").attr("disabled", true);
		 $("input[name=cstrvc_r_rtn_rsn_c]").attr("readonly", true);
		 
		 $("#cstrvc_rd_cvlActSt_010300").prop("checked", false);
		 $("#cstrvc_rd_cvlActSt_010200").prop("checked", false);
		 $("#td010300").children().val("");
		 $("#cstrvc_r_rtn_rsn").val("");
		 
		 $("#cstrvc_p_tfTransfUser").attr('disabled', true);
		 $("#cstrvc_cvl_act_cont").attr('disabled', false);
		 $("#p_td010300").children().val("");
		 $("#cstrvc_cntrSearch2").hide();
	 }
	 
}

// 담당자처리 저장
function ChargerSave_clickEvent(){
	var countDeptChanged;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : "/ajax/civilservice/cswGetCountDeptChangedByChrgPrcss.do",
		data : "pJson=" + getCountDeptChangedByChrgPrcss(),
		success : function(data) {
			countDeptChanged = data;
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	if (countDeptChanged.length >= 2 && $("#cstrvc_rd_cvlActSt_c030100").is(":checked")) {
		if (window.sessionStorage.getItem("CC_AUTH") == "Y") {
//			alert("90909 등록된 사용자는 부서(재)지정 횟수 제한없음");
		} else {
			if ($("#cstrvc_p_org_id").val() == "40903530000" && $("#cstrvc_p_ofce_cc_affairs_yn").val() == "Y") {
//			alert("부서(재)지정 2회 초과했지만 대상자는 민여과 서무")
			} else if (ouCode == $("#cstrvc_p_org_id").val()) {
//				alert("부서(재)지정 2회 초과했지만 대상자는 본인과 사용자")
			} else {
				alert(" 부서 재지정은 2회만 가능합니다.\n 민원여권과 서무를 지정하여 부서 재지정 요청을 해주세요.");
				var pssprtAffrsInfo = getPassportDeptAffrsInfo(); 
				$("#cstrvc_p_org_usr_id").val(pssprtAffrsInfo[0].UID_);
				$("#cstrvc_p_org_id").val(pssprtAffrsInfo[0].OUCODE); 
           		$("#cstrvc_p_org_ful_nm").val(pssprtAffrsInfo[0].ORGFULLNAME);  
				$("#cstrvc_p_org_usr_nm").val(pssprtAffrsInfo[0].DISPLAYNAME); 
				$("#cstrvc_p_ofce_tel_no").val(pssprtAffrsInfo[0].TELEPHONENUMBER);  
				$("#cstrvc_p_org_usr_mobile").val(pssprtAffrsInfo[0].MOBILE);
				$("#cstrvc_p_ofce_cc_affairs_yn").val(pssprtAffrsInfo[0].CC_AFFAIRS_YN);
				$("#cstrvc_p_tfTransfUser").val(pssprtAffrsInfo[0].USERFULLNAME);
				return;
			};
		};
	};
	
//	var rd_cvlActSt_c = $(':radio[name="rd_cvlActSt_c"]:checked').val();
	var clickBtn = $(this).attr("id"); //클릭한버튼 아이디 값
	switch (clickBtn) {
	case "cstrvc_btnIng" :			// 처리중
		rd_cvlActSt_c = "020100";
		break;
	case "cstrvc_btnComplete" :		// 처리완료
		rd_cvlActSt_c = "020200";
		break;
	case "cstrvc_btnChargerSave" : 	// 담당자지정
		rd_cvlActSt_c = "030100"
		break;
	default:
		break;
	};
	
	
	if(!rd_cvlActSt_c){
		alert("처리상태변경을 선택하십시요.");
		return false;
	}

	if((rd_cvlActSt_c == "020100" || rd_cvlActSt_c == "020200") && $("#cstrvc_cvl_act_cont").val().trim() == ""){
		alert("민원처리내용을 입력하십시요.");
		$("#cstrvc_cvl_act_cont").focus();
		return false;
	}

	if((rd_cvlActSt_c == "030100" || rd_cvlActSt_c == "030200") && $("#cstrvc_r_rtn_rsn_c").val().trim() == ""){
		alert("요청사유를 입력하십시요.");
		$("#cstrvc_r_rtn_rsn_c").focus();
		return false;
	}
	
	// 2020.02.25 hhs
   if(rd_cvlActSt_c == "030100" || rd_cvlActSt_c == "030200"){
	   if( $("#cstrvc_r_rtn_rsn_c").val().trim() == "" ){
		   alert("요청사유를 입력하십시요.");
		   $("#cstrvc_r_rtn_rsn_c").focus();
		   return false;
	   }
	   if( $("#cstrvc_p_tfTransfUser").val()=="" || $("#cstrvc_p_org_usr_id").val()=="" ){
		   alert("담당자를 입력하세요");
		   $("#cstrvc_p_tfTransfUser").focus();
		   return false
	   }
    }
	
	if (confirm("저장 하시겠습니까?") == true){
		
		var chkDeptCode;
		var seoMooInfo;
		var cvlActStCd;
		
		if (ouCode == $("#cstrvc_p_org_id").val()) {
			chkDeptCode = true; // 지정대상이 같은과
		} else {
			chkDeptCode = false; // 지정대상이 다른과
			if ($("#cstrvc_p_ofce_cc_affairs_yn").val() != "Y") {
				$.ajax({
					type : "post",
					dataType: "json",
					async : false,
					url : "/ajax/civilservice/cswGetSeoMooInfoByChrgPrcss.do",
					data : "pJson=" + getSeoMooInfoByChrgPrcss(),
					success : function(data) {
						seoMooInfo = data;
					},
					error : function(data, status, err) {
						networkErrorHandler(data, status, err);
					}
				});
			};
		};
		
		switch (clickBtn) {
		case "cstrvc_btnIng" :
			cvlActStCd = "020100"; // 처리중
			break;
		case "cstrvc_btnComplete" :
			cvlActStCd = "020200"; // 처리완료
			break;
		case "cstrvc_btnChargerSave" : // (재)지정
			if ($("#cstrvc_p_ofce_cc_affairs_yn").val() == "Y") {
				cvlActStCd = "010200"; // 부서접수
			} else {
				cvlActStCd = "010300"; // 담당자지정
			};
			
			fnSendSms($("#cstrvc_p_org_usr_id").val(),$("#cstrvc_p_org_usr_mobile").val()); // 담당자지정  - SMS 발송
			
			break;
		default:
			break;
		};
		
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : "/ajax/civilservice/cswChrgerProcess.do",
			data : "pJson=" + getChrgerProcess(seoMooInfo, chkDeptCode, cvlActStCd),
			success : function(data)
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : false,
					url : "/ajax/civilservice/cswChrgerProcess.do",
					data : "pJson=" + getChrgerProcessHis(seoMooInfo, chkDeptCode, cvlActStCd),
					success : function(data)
					{
						alert("저장을 완료하였습니다.");
						tblChargerList_init_input();
						ChargerSearch_clickEvent();
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
}

function getCountDeptChangedByChrgPrcss() {
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMzQuY291bnREZXB0Q2hhbmdlZA==",
			"map" : {
				"key" : "value",
				"tckt_id" : $("#cstrvc_tckt_id_c").val(),
				"ord" : $("#cstrvc_ord_c").val()
			}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

function getSeoMooInfoByChrgPrcss() {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0U2VvTW9vSW5mbw==",
			"map" : {
				"key" : "value",
				"oucode" : $("#cstrvc_p_org_id").val()
			}
	};
	return encodeURIComponent(JSON.stringify(loParam)); 
}

function getChrgerProcess(seoMooInfo, chkDeptCode, cvlActStCd){
	var loParam = {
				"qt" : "dXBkYXRl",
				"mi" : "Y20wMzIudXBkYXRlQ2hyZ2VyUHJvY2Vzcw==",
				"map" : {
					"key" : "value",
					"cvl_act_st_cd" : cvlActStCd,
					"r_org_usr_id" : $("#cstrvc_p_ofce_cc_affairs_yn").val() == "Y" ? "" : $("#cstrvc_p_org_usr_id").val(),
					"r_org_usr_nm" : $("#cstrvc_p_org_usr_nm").val() == "" ? $("#cstrvc_org_usr_nm_c").html() : $("#cstrvc_p_org_usr_nm").val(),
					"r_ofce_tel_no" : $("#cstrvc_p_ofce_cc_affairs_yn").val() == "Y" ? "" : $("#cstrvc_p_ofce_tel_no").val(),
					"cvl_act_cont" : $("#cstrvc_cvl_act_cont").val(), 
					"r_rtn_rsn" : $("#cstrvc_r_rtn_rsn_c").val().replace(/%/gi, "퍼센트"),
					"orgUsrId" : usrId,
					"tntr_id" : $("#cstrvc_tntr_id_c").val(),
					"affs_org_usr_id" : seoMooInfo != null ? seoMooInfo.AFFAIR_USR_ID : $("#cstrvc_p_org_usr_id").val(),
					"affs_usr_nm" : seoMooInfo != null ? seoMooInfo.AFFAIR_USR_NM : $("#cstrvc_p_org_usr_nm").val(),
					"affs_ofce_tel_no" : seoMooInfo != null ? seoMooInfo.AFFAIR_TEL_NO : $("#cstrvc_p_ofce_tel_no").val(),
					"chkDeptCode" : chkDeptCode,
					"orgId" : chkDeptCode ? ouCode : $("#cstrvc_p_org_id").val() == "" ? ouCode : $("#cstrvc_p_org_id").val(),
					"orgFulNm" : chkDeptCode ? $("#cstrvc_org_ful_nm_c").html() : $("#cstrvc_p_org_ful_nm").val() == "" ? $("#cstrvc_org_ful_nm_c").html() : $("#cstrvc_p_org_ful_nm").val(),
				}
		};
	
	return  encodeURIComponent(JSON.stringify(loParam));
}

//hhs 20.04.08 나의민원 담당자지정 분리
function getChrgerProcessHis(seoMooInfo, chkDeptCode, cvlActStCd){
	var loParam = {
				"qt" : "dXBkYXRl",
				"mi" : "Y20wMzIudXBkYXRlQ2hyZ2VyUHJvY2Vzc0hpcw==",
				"map" : {
					"key" : "value",
					"cvl_act_st_cd" : cvlActStCd,
					"r_org_usr_nm" : $("#cstrvc_p_org_usr_nm").val() == "" ? $("#cstrvc_org_usr_nm_c").html() : $("#cstrvc_p_org_usr_nm").val(),
					"cvl_act_cont" : $("#cstrvc_cvl_act_cont").val(), 
					"r_rtn_rsn" : $("#cstrvc_r_rtn_rsn_c").val().replace(/%/gi, "퍼센트"),
					"orgUsrId" : usrId,
					"tckt_id" : $("#cstrvc_tckt_id_c").val(),
					"ord" : $("#cstrvc_ord_c").val(), 
					"r_tntr_cont" : $("#cstrvc_tntr_cont_c").val().replace(/%/gi, "퍼센트"), 
					"orgFulNm" : chkDeptCode ? $("#cstrvc_org_ful_nm_c").html() : $("#cstrvc_p_org_ful_nm").val() == "" ? $("#cstrvc_org_ful_nm_c").html() : $("#cstrvc_p_org_ful_nm").val(),
				}
		};
	
	return  encodeURIComponent(JSON.stringify(loParam));
}

var statisticsGridPmapInfo; // 이관민원 통계현황 그리드 설정 정보

function fn_tblStatistics_init() {
	
	// 날짜 세팅
//	d_frDate = getDate1();						
//	d_toDate = getDate();
	datePicker("#cstrvc_srcStatsFrDate");
	datePicker("#cstrvc_srcStatsToDate");
	$("#cstrvc_srcStatsFrDate").val(getDate1());
	$("#cstrvc_srcStatsToDate").val(d_toDate);
	
	tblStatistics_init_grid();
	
	statisticsGridPmapInfo.tblId = "cstrvc_tblStatistics_Dept";
	statisticsGridPmapInfo.colNames.splice(2, 2);
	statisticsGridPmapInfo.colModel.splice(2, 2);
	statisticsGridPmapInfo.pager = "cstrvc_pagingStatistics_Dept";
	statisticsGridPmapInfo.sortname = "ORG_ID";
	statisticsGridPmapInfo.sortorder = "DESC";
	statisticsGridPmapInfo.rowNum = "25";
	statisticsGridPmapInfo.width = "100%";
	statisticsGridPmapInfo.height = "700";
	statisticsGridPmapInfo.rowNumber = true;
	statisticsGridPmapInfo.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMzIuc2VsZWN0Vm9jU3RhdGlzdGljcw==", {
		"key" : "value" ,
		"srcStatsFrDate" : $("#cstrvc_srcStatsFrDate").val().replace(/-/gi, ""),
		"srcStatsToDate" : $("#cstrvc_srcStatsToDate").val().replace(/-/gi, ""),
		"orgId" : ouCode,
		"ccAuth" : window.sessionStorage.getItem("CC_AUTH") == "Y" ? true : false,
		"checkboxYN" : true		
	});
	
	init_grid(statisticsGridPmapInfo);
	$("#deptStatistics").hide();
	
	// 통계현황 조회 버튼 클릭 이벤트 등록
	$("#cstrvc_btnStatisticsSearch").bind("click", StatisticsSearch_clickEvent);
	
	// 통계현황 초기화 버튼 클릭 이벤트 등록
	$("#cstrvc_StatsSrchInit").bind("click", StatisticsInit_clickEvent);
	
	// 통계현황 엑셀다운 버튼 클릭 이벤트 등록
	$("#cstrvc_btnStatisticsExcelDown").bind("click", StatisticsExcelDown_clickEvent);
	
	if (window.sessionStorage.getItem("CC_AUTH") != "Y") {
		$("#chkStaticsDeptAllCount").parent().hide();
	};
	
	// 부서별 통계 체크이벤트 등록
	$("#chkStaticsDeptAllCount").bind("change", chkStaticsDeptAllCount);
}

function chkStaticsDeptAllCount() {
	 if($("#chkStaticsDeptAllCount").is(":checked")) {
	    	$("#allStatistics").hide();
	    	$("#deptStatistics").show();
	 } else {
	    	$("#allStatistics").show();
	    	$("#deptStatistics").hide();
	 };
}

function StatisticsInit_clickEvent() {
	$("#cstrvc_srcStatsFrDate").val(getDate1());
	$("#cstrvc_srcStatsToDate").val(d_toDate);
	$("#cstrvc_StatsSrchRequstAt").val("");
	StatisticsSearch_clickEvent();
}

function tblStatistics_init_grid()
{
	pMap = {};
	pMap.tblId = "cstrvc_tblStatistics";
	pMap.url   = "/jqgrid/civilservice/cswSelectVocStatistics.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMzIuc2VsZWN0Vm9jU3RhdGlzdGljcw==", {
		"key" : "value" ,
		"srcStatsFrDate" : $("#cstrvc_srcStatsFrDate").val().replace(/-/gi, ""),
		"srcStatsToDate" : $("#cstrvc_srcStatsToDate").val().replace(/-/gi, ""),
		"orgId" : ouCode,
		"ccAuth" : window.sessionStorage.getItem("CC_AUTH") == "Y" ? true : false,
		"checkboxYN" : $("#chkStaticsDeptAllCount").is(":checked") ? true : false
	});
	pMap.colNames = ["ORG_ID", "담당부서", "ORG_USR_ID", "담당자", "총건수", "미지정", "미처리", "처리중","처리완료" ];
	pMap.colModel =
   	[
   	 	{ name : "ORG_ID", index : "ORG_ID", align : "center", hidden : true },
   	 	{ name : "ORG_FUL_NM", index : "ORG_FUL_NM", align : "center", width : 400},
   	 	{ name : "ORG_USR_ID", index : "ORG_USR_ID", align : "center", hidden : true },
   	 	{ name : "ORG_USR_NM" , index : "ORG_USR_NM", align : "center", width : 150 },
   	 	
   	 	{ name : "TOT_CNT", index : "TOT_CNT", align : "center", formatter:'integer'},
   	 	{ name : "CNT_010200", index : "CNT_010200", align : "center",  formatter:'integer'},
   	 	{ name : "CNT_010300", index : "CNT_010300", align : "center", formatter:'integer'},
   	 	{ name : "CNT_020100", index : "CNT_020100", align : "center", formatter:'integer'},
   	 	{ name : "CNT_020200", index : "CNT_020200", align : "center",  formatter:'integer'}
   	 	
   	];
	pMap.rowNum = "25";
	pMap.sortname = "ORG_ID";
	pMap.sortorder = "DESC";
	pMap.width = "100%";
	pMap.height = "700";
	pMap.pager = "cstrvc_pagingStatistics";	
	pMap.rowNumber = true;
	
	statisticsGridPmapInfo = pMap;
	
	init_grid(pMap);
	
	$("#cstrvc_StatsSrchRequstAt").bind("keydown", function(key) {
		if (key.keyCode == 13) StatisticsSearch_clickEvent();
	});
}

function StatisticsSearch_clickEvent(){
	var auth = checkCCAuthNCCAffairs();
	
	if ($("#chkStaticsDeptAllCount").is(":checked")) {
		$("#cstrvc_tblStatistics_Dept").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMzIuc2VsZWN0Vm9jU3RhdGlzdGljcw==", {
			"key" : "value" ,
			"srcStatsFrDate" : $("#cstrvc_srcStatsFrDate").val().replace(/-/gi, ""),
			"srcStatsToDate" : $("#cstrvc_srcStatsToDate").val().replace(/-/gi, ""),
			"orgId" : ouCode,
			"orgFulNm" : $("#cstrvc_StatsSrchRequstAt").val(),
			"ccAuth" : window.sessionStorage.getItem("CC_AUTH") == "Y" ? true : false,
			"checkboxYN" : true
		})} , page : 1, sortname : "ORG_FUL_NM", sortorder : "ASC"});
		$("#cstrvc_tblStatistics_Dept").trigger("reloadGrid");
	} else {
		$("#cstrvc_tblStatistics").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMzIuc2VsZWN0Vm9jU3RhdGlzdGljcw==", {
			"key" : "value" ,
			"srcStatsFrDate" : $("#cstrvc_srcStatsFrDate").val().replace(/-/gi, ""),
			"srcStatsToDate" : $("#cstrvc_srcStatsToDate").val().replace(/-/gi, ""),
			"orgId" : ouCode,
			"orgFulNm" : $("#cstrvc_StatsSrchRequstAt").val(),
			"ccAuth" : window.sessionStorage.getItem("CC_AUTH") == "Y" ? true : false,
			"checkboxYN" : $("#chkStaticsDeptAllCount").is(":checked") ? true : false
		})} , page : 1, sortname : "ORG_FUL_NM, ORG_USR_NM", sortorder : "ASC"});
		$("#cstrvc_tblStatistics").trigger("reloadGrid");
	};
	
	tblDeptReceiptList_init_input();
}

// ExcelDown
function StatisticsExcelDown_clickEvent(){
    excelDownLoad("/excel/civilservice/cswSelectVocStatistics.do", getJsonVocStatisticsExcel());
}

//파라미터 셋팅
function getJsonVocStatisticsExcel(){
	var auth = checkCCAuthNCCAffairs();
	var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "Y20wMzIuc2VsZWN0Vm9jU3RhdGlzdGljcw==",
	    "map" : {
			"key" : "value",
			"srcStatsFrDate" : $("#cstrvc_srcStatsFrDate").val().replace(/-/gi, ""),
			"srcStatsToDate" : $("#cstrvc_srcStatsToDate").val().replace(/-/gi, ""),
			"orgId" : ouCode,
			"ccAuth" : auth,
			"orgFulNm" : $("#cstrvc_StatsSrchRequstAt").val(),
			"ccAuth" : window.sessionStorage.getItem("CC_AUTH") == "Y" ? true : false,
			"checkboxYN" : $("#chkStaticsDeptAllCount").is(":checked") ? true : false,
			"title" : "이관민원_전체_통계현황" + setDownLoadName($("#cstrvc_srcStatsFrDate").val(), $("#cstrvc_srcStatsToDate").val()),
			"colWidth" : [50, 20, 15, 15, 15, 15, 15],
			"colName" : ["ORG_FUL_NM","ORG_USR_NM", "TOT_CNT", "CNT_010200", "CNT_010300", "CNT_020100", "CNT_020200"],
			"colHeader" : [ "담당부서", "담당자", "총건수","미지정", "미처리", "처리중","처리완료"],
			"colAlign" : ["center","center", "right", "right", "right", "right", "right"]
	    }
    };
	
	if ($("#chkStaticsDeptAllCount").is(":checked")) {
		loParam.map.title = "이관민원 부서별 통계현황("+$("#cstrvc_srcStatsFrDate").val()+"~"+$("#cstrvc_srcStatsToDate").val()+")"
		loParam.map.colWidth.splice(1,1);
		loParam.map.colName.splice(1,1);
		loParam.map.colHeader.splice(1,1);
		loParam.map.colAlign.splice(1,1);
		return  encodeURIComponent(JSON.stringify(loParam));
	} else {
		return  encodeURIComponent(JSON.stringify(loParam));
	};
}


function cstrvc_initTabs(id){  
		switch(id){
			case "cstrvc_VocDeptReceiptTab":
				if(isinitVocDeptReceiptTab==false){ 
					fn_tblDeptReceipt_init();
					isinitVocDeptReceiptTab=true;
					}
				  break;
			case "cstrvc_VocChargerProcessTab":
				if(isinitVocChargerProcessTab==false){
					fn_tblChargerProcess_init(); 
					isinitVocChargerProcessTab=true;
					}
				  break;
			case "cstrvc_VocStatisticsTab":
				 if(isinitVocStatisticsTab==false){
					fn_tblStatistics_init(); 
					isinitVocStatisticsTab=true;
					}	
				  break;
		}
	}

function fnSetOrgcswTV1Trans(objInfo) {
	var agencyCategory = objInfo.CATEGORY;
	var srchImgClickId = window.sessionStorage.getItem("srchImgClickId");
	
	if (agencyCategory == "AA") {
		if (srchImgClickId == "cstrvc_cntrSearch1") {
			$("#cstrvc_r_org_id").val(objInfo.DEPT_CD);
			$("#cstrvc_r_org_ful_nm").val(objInfo.DEPT_NM);
			$("#cstrvc_r_org_usr_id").val(objInfo.USR_ID);
			$("#cstrvc_r_org_usr_nm").val(objInfo.USR_NM);
			$("#cstrvc_r_ofce_tel_no").val(objInfo.TEL_NO);
			$("#cstrvc_r_ofce_cc_affairs_yn").val(objInfo.CC_AFFAIRS_YN);	
			$("#cstrvc_tfTransfUser").val(objInfo.DEPT_NM+" "+objInfo.USR_NM);
		} else if (srchImgClickId == "cstrvc_cntrSearch2") {
			$("#cstrvc_p_org_id").val(objInfo.DEPT_CD);
			$("#cstrvc_p_org_ful_nm").val(objInfo.DEPT_NM);
			$("#cstrvc_p_org_usr_id").val(objInfo.USR_ID);
			$("#cstrvc_p_org_usr_nm").val(objInfo.USR_NM);
			$("#cstrvc_p_ofce_tel_no").val(objInfo.TEL_NO);
			$("#cstrvc_p_ofce_cc_affairs_yn").val(objInfo.CC_AFFAIRS_YN);	
			$("#cstrvc_p_tfTransfUser").val(objInfo.DEPT_NM+" "+objInfo.USR_NM);
		}
	} else if (agencyCategory == "CC"){
		$("#cstrvc_r_org_id").val(objInfo.TEAM_CD);
		$("#cstrvc_r_org_ful_nm").val(objInfo.TEAM_NM);
		$("#cstrvc_r_org_usr_id").val(objInfo.USR_ID);
		$("#cstrvc_r_org_usr_nm").val(objInfo.USR_NM);
		$("#cstrvc_r_ofce_tel_no").val(objInfo.TEL_NO);
		$("#cstrvc_r_ofce_cc_affairs_yn").val(objInfo.CC_AFFAIRS_YN);	
		$("#cstrvc_tfTransfUser").val(objInfo.TEAM_NM+" "+objInfo.USR_NM);
	} else if (agencyCategory == "EA") {
		$("#cstrvc_r_org_id").val("externAgency");
		$("#cstrvc_r_org_ful_nm").val(objInfo.TEAM_NM);
		$("#cstrvc_r_org_usr_id").val(objInfo.USR_ID);
		$("#cstrvc_r_org_usr_nm").val(objInfo.USR_NM);
		$("#cstrvc_r_ofce_tel_no").val(objInfo.TEL_NO);
		$("#cstrvc_r_ofce_cc_affairs_yn").val(objInfo.CC_AFFAIRS_YN);	
		$("#cstrvc_tfTransfUser").val(objInfo.TEAM_NM+" "+objInfo.USR_NM);
	}
}

function fnSetOrgcswTV2Trans(objInfo) {
	var agencyCategory = objInfo.CATEGORY;
	if (agencyCategory == "AA") {
		$("#cstrvc_r_org_id").val(objInfo.DEPT_CD);
		$("#cstrvc_r_org_ful_nm").val(objInfo.DEPT_NM);
		$("#cstrvc_r_affs_org_usr_id").val(objInfo.USR_ID);
		$("#cstrvc_r_affs_usr_nm").val(objInfo.USR_NM);
		$("#cstrvc_r_affs_ofce_tel_no").val(objInfo.TEL_NO);
		$("#cstrvc_tfTransfDept").val(objInfo.DEPT_NM+" "+objInfo.USR_NM);
	} else if (agencyCategory == "CC"){
		$("#cstrvc_r_org_id").val(objInfo.TEAM_CD);
		$("#cstrvc_r_org_ful_nm").val(objInfo.TEAM_NM);
		$("#cstrvc_r_affs_org_usr_id").val(objInfo.USR_ID);
		$("#cstrvc_r_affs_usr_nm").val(objInfo.USR_NM);
		$("#cstrvc_r_affs_ofce_tel_no").val(objInfo.TEL_NO);
		$("#cstrvc_tfTransfDept").val(objInfo.TEAM_NM+" "+objInfo.USR_NM);
	} else if (agencyCategory == "EA") {
		$("#cstrvc_r_org_id").val("externAgency");
		$("#cstrvc_r_org_ful_nm").val(objInfo.TEAM_NM);
		$("#cstrvc_r_affs_org_usr_id").val(objInfo.USR_ID);
		$("#cstrvc_r_affs_usr_nm").val(objInfo.USR_NM);
		$("#cstrvc_r_affs_ofce_tel_no").val(objInfo.TEL_NO);
		$("#cstrvc_tfTransfDept").val(objInfo.TEAM_NM+" "+objInfo.USR_NM);
	}
}


function initTrnsferVocDiv(){
	// 탭 이벤트 등록
	var cstrvc_tabs = $("#cstrvc_TrnsferVocTab").tabs();
	cstrvc_tabs.tabs({
		  activate:function (event, ui){
			  var id = ui.newPanel.attr('id');
			  cstrvc_initTabs(id);
		  }
	});
	
	initTransfatcom();
	
	var ccAuth = window.sessionStorage.getItem("CC_AUTH") == null ? "N" : window.sessionStorage.getItem("CC_AUTH");
	
	if (ccAuth == "N") { 
		$("#chkAllDeptReceipt").parent().hide();
		$("#chkAllDeptChProcess").parent().hide();
		if (window.sessionStorage.getItem("USR_ID") == "sysmanager") {
			$("#chkAllDeptReceipt").parent().show();
			$("#chkAllDeptChProcess").parent().show();
		};
	} else {
		$("#chkAllDeptReceipt").trigger("click");
	};
	
	$("#cstrvc_cntrSearch1, #cstrvc_cntrSearch2").on("click", function(e) { // 돋보기 아이콘 클릭 이벤트
			window.sessionStorage.setItem("srchImgClickId", e.target.id);
			window.sessionStorage.setItem("fromFlag", "fromcswTV1");
			window.sessionStorage.setItem("corpOpenType", "adminAgency");
			//var paramURL = getContextPath() + "/web/counsel/organizationChart.do";
			//gf_openDialog(paramURL,1600,1000,"no","no",0,0);
		openMenuPopup("CM0311");
	});
	
	if(window.sessionStorage.getItem("CC_AUTH")=="Y"){
		//$("#cstrvc_cntrSearch1").show();
	}else if(window.sessionStorage.getItem("CC_AFFAIRS_YN")=="Y"){
		//$("#cstrvc_cntrSearch1").hide();
	} else {	
		//$("#cstrvc_cntrSearch1").hide();
		$("#cstrvc_DeptReceiptUsrSave").hide();
		$("#csdbch_deptJobBtnInsert").hide();
	}
	
	$("#cstrvc_rd_cvlActSt_010200").on("click",checkMinwon);
	
	cstrvc_initTabs("cstrvc_VocDeptReceiptTab");
}


function getJsonCCAuthInfo() {
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "c20wMDIuc2VsQ0NBdXRoSW5mbw==",
		"map" : {
			"key" : "value"
		}
	};
	return encodeURIComponent(JSON.stringify(loParam));
}

function checkMinwon(){
	if(chDp){
		$.ajax({
		    type : "post",
		//	async : true,
		    url : "/ajax/civilservice/CCAuthInfo.do",
		    dataType : "json",                       
		    data : "pJson=" + getJsonCCAuthInfo(),
		    success: function(data) {
		    	if( (data!=null) && (data != []) && (data != "")){
		       	$("#cstrvc_tfTransfUser").val(data.USERFULLNAME);
		    	$("#cstrvc_r_org_id").val(data.OUCODE); 
		    	$("#cstrvc_r_org_ful_nm").val(data.ORGFULLNAME);  
		    	$("#cstrvc_r_org_usr_id").val(data.UID_);
		    	$("#cstrvc_r_org_usr_nm").val(data.DISPLAYNAME); 
		    	$("#cstrvc_r_ofce_tel_no").val(data.TELEPHONENUMBER);  
		    	$("#cstrvc_r_org_usr_mobile").val(data.MOBILE);
		    	} else {
		    		alert("지정된 서무의 정보가 없습니다");
		    	}
		    },
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 그리드 조회 권한 체크
function checkCCAuthNCCAffairs() {
	var ccAuth = window.sessionStorage.getItem("CC_AUTH") == null ? "N" : window.sessionStorage.getItem("CC_AUTH");
	var ccAffairs = window.sessionStorage.getItem("CC_AFFAIRS_YN") == null ? "N" : window.sessionStorage.getItem("CC_AFFAIRS_YN");
	var boolean;
	
	if ((ccAuth == "Y" && ccAffairs == "N") || (ccAuth == "Y" && ccAffairs == "Y")) {
		boolean = true;
	} else if ((ccAuth == "N" && ccAffairs == "Y") || (ccAuth == "N" && ccAffairs == "N")) {
		boolean = false;
	};
	
	return boolean;
}