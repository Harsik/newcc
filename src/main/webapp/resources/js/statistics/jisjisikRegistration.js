//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var g_tbbsStrtDt = "";
var g_tbbsEndDt = "";

var currRowid = "";
var currTbbsId = "";
var isModComm = false;

var g_rowId = "";
var g_showNoticeFlag = false;

var isMgr = false;
var usrSelect = window.sessionStorage.getItem("USR_GRD_CD");

// 그리드 셀 병합 변수
var chkcell_Col1={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크
var chkcell_Col2={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크
var chkcell_Col3={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크

function userSelect(){
	//select
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/user/userList.do",
	    data : "pJson=" + getJsonStrUserList(),
	    success : function(data)
	    {
	     $("#k").html("");
	     
	     // param값을 JSON으로 파싱
	     var value = "";
	     value += "<option value='all'>전체</option>";
	     
	     $.each(data, function(key, state)
	     {
	    	 if(state.USR_NM!='센터관리자')
	      value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
	     });
	     
	     $("#jskRgs_optUsrNmList").append(value);
	     $("#jskRgs_optUsrNmList").val("all");
	    },
	    error : function(data, status, err) 
	    {
	    	alert("상담사 리스트를 불러오지 못합니다\n담당자에게 문의해주세요.");
	    }
	   });
}

//파라미터 셋팅 UserList
function getJsonStrUserList()
{
	 var loParam = {
		  "qt" : "c2VsZWN0TGlzdA==",
		  "mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		  "map" : {
		  "key" : "value",
		  "notuse" : false,
		  "chkRetire" : false,
		  "cntr_cd" : "010000",
		  "sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
		  "sord" : "asc",	
	  }
	 };
	 console.log(JSON.stringify(loParam));
	 return  encodeURIComponent(JSON.stringify(loParam));
}


function malignancyCustomerListExcel()
{
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTAubWFsaWduYW5jeUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbbs_strt_dt" : g_tbbsStrtDt,
		"tbbs_end_dt" : g_tbbsEndDt,
		"usr_nm" : $("#jskRgs_optUsrNmList").val(),
		"sidx"  : "intv_nm",
		"sord"  : "ASC",
		"title" : "상담DB등록_현황" + setDownLoadName(g_tbbsStrtDt, g_tbbsEndDt),
		"colWidth" : [40, 40 ,40, 20, 20, 20, 20],
		"colName" : ["CTG_LG_NM", "CTG_MD_NM", "CTG_SM_NM","INSERT_CNT","UPDATE_CNT","NOTUSE_CNT","TOT_CNT"],
		"colHeader" : ["대분류", "중분류", "소분류", "신규건수", "수정건수","미사용 건수","총 건수"],
		"colAlign" : ["left","left","left", "center", "center", "center", "center"]		  
	    }
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}


//초기화 버튼
function btnInit_ClicikEvent(){
	$("#jskRgs_optUsrNmList").val("all");
	$("#jskRgs_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#jskRgs_tfTbbsEndDt").val(getDate());
	 
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	g_tbbsStrtDt = $("#jskRgs_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#jskRgs_tfTbbsEndDt").val().replace(/-/g,"");
	 
	//reload grid
	$("#jskRgs_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "intv_nm", sortorder : "asc"});
	$("#jskRgs_tblNotifyList").trigger("reloadGrid");
	
}
//검색버튼
function btnSearch_ClicikEvent(){
	

	g_tbbsStrtDt = $("#jskRgs_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#jskRgs_tfTbbsEndDt").val().replace(/-/g,"");

	var rMsg = "";
	if(g_tbbsStrtDt != "" || g_tbbsEndDt != "") {
		if(g_tbbsStrtDt == "") {
			rMsg += "\n시작일자를 입력해주세요.";
		}
		if(g_tbbsEndDt == "") {
			rMsg += "\n종료일자를 입력해주세요.";
		} else {
			var d_tbbsStrtDt = new Date(g_tbbsStrtDt.substr(0, 4), g_tbbsStrtDt.substr(4, 2), g_tbbsStrtDt.substr(6, 2));
			var d_tbbsEndDt = new Date(g_tbbsEndDt.substr(0, 4), g_tbbsEndDt.substr(4, 2), g_tbbsEndDt.substr(6, 2));
			if(d_tbbsStrtDt > d_tbbsEndDt) {
				rMsg += "\n시작일이 종료일보다 큽니다.";
			}
		}
	}
	
	if(rMsg != "") {
		alert(rMsg);
		return;
	}
	
	//reload grid
	$("#jskRgs_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)}, 
		page : 1, sortname : "intv_nm", sortorder : "asc"});
	$("#jskRgs_tblNotifyList").trigger("reloadGrid");
}
//다운로드버튼
function btnDown_ClicikEvent(){
	
	//오즈연동
	var strDay = $("#jskRgs_tfTbbsStrtDt").val().replace(/-/gi, "");
	var endDay = $("#jskRgs_tfTbbsEndDt").val().replace(/-/gi, "");
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/jisjisikRegistration.jsp?startDay="+strDay+"&endDay="+endDay+"&usr_nm="+encodeURI(encodeURIComponent(window.sessionStorage.getItem("USR_NM"))));
}


//파라미터셋팅 malignancyList
function getJsonStrSelectmalignancyCustomerList(tbbsStrtDt, tbbsEndDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMTAubWFsaWduYW5jeUxpc3Q=",
		"map" : {
			"key" : "value",
			"tbbs_strt_dt" : tbbsStrtDt,
			"tbbs_end_dt" : tbbsEndDt,
			"usr_nm" : $("#jskRgs_optUsrNmList").val()
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 그리드 셀 병합
function arrtSetting(rowid, val, rowObject, cm, rdata) {
    

    var result = "";
    
    if (cm.name == "CTG_LG_NM")
    {
	if(chkcell_Col1.chkval != val){ //check 값이랑 비교값이 다른 경우
	    var cellId = this.id + '_row_'+rowid+'-'+cm.name;
	    result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan"';
	    chkcell_Col1 = {cellId:cellId, chkval:val};
	}else{
	    result = 'style="display:none"  rowspanid="'+chkcell_Col1.cellId+'"'; //같을 경우 display none 처리
	}
	
    } else if (cm.name == "CTG_MD_NM")
    {
	if(chkcell_Col2.chkval != val){ //check 값이랑 비교값이 다른 경우
	    var cellId = this.id + '_row_'+rowid+'-'+cm.name;
	    result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan"';
	    chkcell_Col2 = {cellId:cellId, chkval:val};
	}else{
	    result = 'style="display:none"  rowspanid="'+chkcell_Col2.cellId+'"'; //같을 경우 display none 처리
	}
    }
    /*
    if (cm.name == "CTG_EX_NM")
    {
	if(chkcell_Col3.chkval != val){ //check 값이랑 비교값이 다른 경우
	    var cellId = this.id + '_row_'+rowid+'-'+cm.name;
	    result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan"';
	    chkcell_Col3 = {cellId:cellId, chkval:val};
	}else{
	    result = 'style="display:none"  rowspanid="'+chkcell_Col3.cellId+'"'; //같을 경우 display none 처리
	}
    } 
    */
    

    return result;

}

function btnExcel_ClicikEvent(){
    excelDownLoad(getContextPath() + "/excel/statistics/getJsonStrUserList.do", malignancyCustomerListExcel());
}


//실행함수
$(document).ready(function(){
	
	//날짜
	datePicker("#jskRgs_tfTbbsStrtDt");
	datePicker("#jskRgs_tfTbbsEndDt");
	
	$("#jskRgs_btnExcel").css("display","none");
	//권한
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100"){
			isMngr = true;
		$("#jskRgs_btnExcel").css("display","inline-block");
		}else{
			isMngr = false;
		$("#jskRgs_btnExcel").css("display","none");
		}
	}
		
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#jskRgs_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#jskRgs_tfTbbsEndDt").val(getDate());	
	

	
	//사용자 리스트
	userSelect();
	
	//초기화버튼
	$("#jskRgs_btnInit").bind("click",btnInit_ClicikEvent);

	$("#jskRgs_btnExcel2").bind("click",btnExcel_ClicikEvent);
	//검색버튼
	$("#jskRgs_btnSearch").bind("click",btnSearch_ClicikEvent);
	//다운로드버튼
	$("#btnExcel").bind("click",btnDown_ClicikEvent);
	
	g_tbbsStrtDt = $("#jskRgs_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#jskRgs_tfTbbsEndDt").val().replace(/-/g,"");		
	

			
	$("#jskRgs_tblNotifyList").jqGrid({
		url : getContextPath() + "/jqgrid/board/selectNotifyList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt, g_tbbsEndDt)
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : [/*"기관분류",*/"대분류", "중분류", "소분류", "신규건수", "수정건수","미사용 건수","총 건수"],
		colModel : [
		            /* name : "CTG_EX_NM", index : "CTG_EX_NM", width : 40, align: "left", cellattr: arrtSetting},*/
		            { name : "CTG_LG_NM", index : "CTG_LG_NM", width : 40, align: "left", cellattr: arrtSetting},
		            { name : "CTG_MD_NM", index : "CTG_MD_NM", width : 40, align: "left", cellattr: arrtSetting},
		            { name : "CTG_SM_NM", index : "CTG_SM_NM", width : 40, align: "left"},
		            { name : "INSERT_CNT", index : "INSERT_CNT", align: "center", width :20, formatter: 'integer', formatoptions:{thousandsSeparator:","}, summaryType:'sum'},
			    { name : "UPDATE_CNT", index : "UPDATE_CNT", align: "center", width :20, },
		            { name : "NOTUSE_CNT", index : "NOTUSE_CNT", align: "center", width :20, formatter: 'integer', formatoptions:{thousandsSeparator:","}, summaryType:'sum'},
			    { name : "TOT_CNT", index : "TOT_CNT", align: "center", width :20, formatter: 'integer', formatoptions:{thousandsSeparator:","}, summaryType:'sum'}],
        sortname : "intv_nm",
        sortorder : "asc",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "500",
        width : "80%",
        rowNum : 1000,
        rowList : [10, 20, 30, 50, 100, 150],
        autowidth : true,
        pager : "#jskRgs_pgNotifyList",
        rownumbers : true,
        rownumWidth : 30,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        footerrow: true, 
        userDataOnFooter : true,
        viewrecords: true,
        multiselect: false,
        onCellSelect : function(rowid, iCol, cellContent, e){},
	gridComplete : function() {  /** 데이터 로딩시 함수 **/		
            
	    //대분류, 중분류 셀 병합
	    var grid = this;
             
            $('td[name="cellRowspan"]', grid).each(function() {
                var spans = $('td[rowspanid="'+this.id+'"]',grid).length+1;
                if(spans>1){
                 $(this).attr('rowspan',spans);
                }
            });  
            
            chkcell_Col1={cellId:undefined, chkval:undefined};
            chkcell_Col2={cellId:undefined, chkval:undefined};
            chkcell_Col3={cellId:undefined, chkval:undefined};
            
            //신규건수 합계
            var insert_Sum = $("#jskRgs_tblNotifyList").jqGrid('getCol','INSERT_CNT', false, 'sum'); 
            $('#jskRgs_tblNotifyList').jqGrid('footerData', 'set', { CTG_LG_NM:'합계', INSERT_CNT:insert_Sum }); 
            //수정건수 합계
            var update_Sum = $("#jskRgs_tblNotifyList").jqGrid('getCol','UPDATE_CNT', false, 'sum'); 
            $('#jskRgs_tblNotifyList').jqGrid('footerData', 'set', { CTG_LG_NM:'합계', UPDATE_CNT:update_Sum }); 
            //미사용건수 합계
            var notuse_Sum = $("#jskRgs_tblNotifyList").jqGrid('getCol','NOTUSE_CNT', false, 'sum'); 
            $('#jskRgs_tblNotifyList').jqGrid('footerData', 'set', { CTG_LG_NM:'합계', NOTUSE_CNT:notuse_Sum }); 
            //총건수 합계
            var tot_Sum = $("#jskRgs_tblNotifyList").jqGrid('getCol','TOT_CNT', false, 'sum'); 
            $('#jskRgs_tblNotifyList').jqGrid('footerData', 'set', { CTG_LG_NM:'합계', TOT_CNT:tot_Sum }); 
            //합계 타이틀 가운데 정렬
            $("table.ui-jqgrid-ftable tr:first td:eq(1)").css("text-align", "center");
            //$('table.ui-jqgrid-ftable td:eq(2)').hide();
            //$('table.ui-jqgrid-ftable td:eq(3)').hide();	

        },          
        error : function(data, status, err)
        {
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#jskRgs_pgNotifyList", {edit : false, add : false, del : false, search : false});		
	
	// 멀티 헤더 설정 
	$("#jskRgs_tblNotifyList").setGroupHeaders({ useColSpanStyle: true, groupHeaders: [{ "numberOfColumns": 3, "titleText": "상담유형", "startColumnName": "CTG_LG_NM" }]});
	
	
	
	
	
});