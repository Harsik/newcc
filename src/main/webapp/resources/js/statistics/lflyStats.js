/**
 * 
 */

var currentYear = "";
var chkcell={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크

//엑셀다운로드
function getJsonStrSelectlflyStatsListExcel(){
	var g_entStartDt=$('#startYear').val();
	var g_entEndDt=$('#endYear').val();
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMDEubGZseVN0YXRzTGlzdEV4Y2Vs",
			"map" : {
				"key" : "value",
				"title" : "이직율현황" + setDownLoadName(g_entStartDt, g_entEndDt),
				"g_entStartDt" : g_entStartDt,//g_entStartDt,g_entEndDt
				"g_entEndDt" : g_entEndDt,//g_entStartDt,g_entEndDt
				"g_retStartDt" : g_entStartDt,//g_entStartDt,g_entEndDt
				"g_retEndDt" : g_entEndDt,//g_retStartDt,g_retEndDt
				"sidx" : 'YEAR1',
				"sord" : "ASC",
				"colWidth" : [14,14,10,10,10,10,10,10,10,10,10,10,10,10,14,14,20],
				"colName" : ["YEAR1", "TYP", "CNT_01","CNT_02", "CNT_03","CNT_04", "CNT_05","CNT_06", "CNT_07","CNT_08", "CNT_09","CNT_10", "CNT_11","CNT_12","TOT","AVGS","CNT_USR"],
				"colHeader" : ["일자","구분","1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월","계","평균인력","스탭/상담사"],
				"colAlign" : ["center","center", "center", "center","center","center", "center", "center","center","center", "center", "center","center","center", "center", "center", "center"]
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

///파라미터셋팅 malignancyList
function getJsonStrSelectlflyStatsList() {
	var g_entStartDt=$('#startYear').val() + "0101";
	var g_entEndDt=$('#endYear').val() + "1231";
	chkcell={cellId:undefined, chkval:undefined};  //chkcell 초기화 추가..
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEubGZseVN0YXRzTGlzdA==",
		"map" : {
			"key" : "value",
			"g_entStartDt" : g_entStartDt,//g_entStartDt,g_entEndDt
			"g_entEndDt" : g_entEndDt,//g_entStartDt,g_entEndDt
			"g_retStartDt" : g_entStartDt,//g_entStartDt,g_entEndDt
			"g_retEndDt" : g_entEndDt//g_retStartDt,g_retEndDt
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//년도 컨트롤 하는 함수
function changeYear(optYear,termDetail){
	currentYear =  new Date().getFullYear();
	var selectBox = "";
	selectBox +=  "<select id = '"+optYear+"' style ='width : 100px; margin-left : 5px;' >";
/*	selectBox +=  "<option value='all'>전체</option>";*/
	for(var i = 2017; i <= currentYear; i++)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	selectBox +=  "</select>";
	
	$("#"+termDetail).empty();
	$("#"+termDetail).append(selectBox);
	$("#"+optYear).val('all');
}

//init함수
function init_data(){

	//년도 자동 셋팅
	changeYear("startYear","lfSt_termStart");
	changeYear("endYear","lfSt_termEnd");
	
	$("#startYear").val($('#startYear option:eq(0)').val());
	$("#endYear").val($("#endYear option:last").val());
	
	
	//버튼을 눌렀을때
	$("#lfSt_btnSearch").bind("click",btnSearch_ClicikEvent);
	$("#lfSt_btnInit").bind("click",btnInit_ClicikEvent);
	$("#lfSt_btnExelDown").bind("click",btnDown_ClicikEvent);
	
	//jqgrid
	$("#lfSt_tbllflyStatsList").jqGrid({
		url : getContextPath() + "/jqgrid/statistics/atentCstmr.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectlflyStatsList() 
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["일자","구분","1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월","계","평균인력","스탭/상담사"],
		colModel : [
		          
		            { name : "YEAR1", index : "YEAR1", width : 30, align: "center", cellattr:jsFormatterCell},
		            { name : "TYP", index : "TYP",align: "center" ,width :20 },
		            { name : "CNT_01", index : "CNT_01",align: "center" ,width :20 },
		            { name : "CNT_02", index : "CNT_02", width : 20, align: "center"},
		            { name : "CNT_03", index : "CNT_03",align: "center" ,width :20 },
		            { name : "CNT_04", index : "CNT_04",align: "center" ,width :20 },
		            { name : "CNT_05", index : "CNT_05", width : 20, align: "center"},
		            { name : "CNT_06", index : "CNT_06",align: "center" ,width :20 },
		            { name : "CNT_07", index : "CNT_07",align: "center" ,width :20 },
		            { name : "CNT_08", index : "CNT_08",align: "center" ,width :20 },
		            { name : "CNT_09", index : "CNT_09",align: "center" ,width :20 },
		            { name : "CNT_10", index : "CNT_10", width : 20, align: "center"},
		            { name : "CNT_11", index : "CNT_11",align: "center" ,width :20 },
		            { name : "CNT_12", index : "CNT_12",align: "center" ,width :20 },
		            { name : "TOT", index : "TOT", width : 30, align: "center"},
		            { name : "AVGS", index : "AVGS", width : 30, align: "center",cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
	            		if ( rowObject.TYP == "1.ENT" ) { 
	            			return 'rowspan=3' ;
	            		}else{
	            			return 'style="display:none;"'
	            		 }
	            	   }},
		            { name : "CNT_USR", index : "CNT_USR", width : 50, align: "center",cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
	            		if ( rowObject.TYP == "1.ENT" ) { 
	            			return 'rowspan=3' ;
	            		}else{
	            			return 'style="display:none;"'
	            		 }
	            	   }}
		            ],
        sortname : "YEAR1, TYP",
        sortorder : "asc",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "510",
        sortable: false,
        width : "80%",
        rowNum : 90,
        rowList : [10, 20, 30,40, 50,60,70,80,90,100],
        autowidth : true,
        pager : "#lfSt_pglflyStatsList",
        rownumbers : true,
        rownumWidth : 30,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        viewrecords: true,
        loadComplete: function() {
            var ids = $("#lfSt_tbllflyStatsList").getDataIDs() ;
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#lfSt_tbllflyStatsList").getRowData(rowId) ;
            	if(rowData.YEAR1 !=""){
            		$("#lfSt_tbllflyStatsList").setRowData( rowId ,false,{background:"#FFFFFF"});
            	}
            	if(rowData.TYP=='1.ENT'){
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'TYP', '정원');
            	}
            	if(rowData.TYP=='2.RET'){
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'TYP', '퇴사');
            	}
            	if(rowData.TYP=='3.AVGS'){
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'TYP', '이직율');
            		$("#lfSt_tbllflyStatsList").setRowData( rowId ,false,{background:"#EAEAEA"});
            		
            	
            		
            		if(rowData.CNT_01=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_01', '0.0%');
            		
            		if(rowData.CNT_02=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_02', '0.0%');
            		
            		if(rowData.CNT_03=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_03', '0.0%');
            		
            		if(rowData.CNT_04=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_04', '0.0%');
            		
            		if(rowData.CNT_05=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_05', '0.0%');
            		
            		if(rowData.CNT_06=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_06', '0.0%');
            		
            		if(rowData.CNT_07=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_07', '0.0%');
            		
            		if(rowData.CNT_08=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_08', '0.0%');
            		
            		if(rowData.CNT_09=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_09', '0.0%');
            		
            		if(rowData.CNT_10=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_10', '0.0%');
            		
            		if(rowData.CNT_11=='0')
                		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_11', '0.0%');
            		
            		if(rowData.CNT_12=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'CNT_12','0.0%');
            		
            		if(rowData.TOT=='0')
            		$("#lfSt_tbllflyStatsList").jqGrid('setCell', rowId , 'TOT','0.0%');
            		
            	}
            	
           }) ;
       },
        multiselect: false,
        onCellSelect : function(rowid, iCol, cellContent, e){},
        gridComplete: function() {  /** 데이터 로딩시 함수 **/
        	 var grid = this;
        	 $('td[name="cellRowspan"]', grid).each(function() {
        	                    var spans = $('td[rowspanid="'+this.id+'"]',grid).length+1;
        	                    if(spans>1){
        	                     $(this).attr('rowspan',spans);
        	                    }
        	                });     
        	},
        error : function(data, status, err)
        {
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#lfSt_pglflyStatsList", {edit : false, add : false, del : false, search : false});
	
}

//같을경우 합치는 녀석
function jsFormatterCell(rowid, val, rowObject, cm, rdata){
	$("#lfSt_tbllflyStatsList").clearGridData(); 
    var result = "";
    $("#lfSt_tbllflyStatsList").trigger("reloadGrid");
    if(chkcell.chkval != val){ //check 값이랑 비교값이 다른 경우
        var cellId = this.id + '_row_'+rowid+'-'+cm.name;
        result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan" style="background:#FFFFFF"';
        chkcell = {cellId:cellId, chkval:val};
    }else{
    	result = 'style="display:none"  rowspanid="'+chkcell.cellId+'"'; //none때문에 년도가 사라짐
    }
    return result; 
}

//초기화 함수
function btnInit_ClicikEvent(){
	
	$("#startYear").val($('#startYear option:eq(0)').val());
	$("#endYear").val($("#endYear option:last").val());
	//reload grid
		$("#lfSt_tbllflyStatsList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectlflyStatsList()}, 
			page : 1, sortname : "YEAR1, RESULTS.TYP", sortorder : "asc"});
		$("#lfSt_tbllflyStatsList").trigger("reloadGrid");
		
		$("#lfSt_tbllflyStatsList").jqGrid('GridUnload');
	location.reload();
}

//검색 함수
function btnSearch_ClicikEvent(){
	var rMsg = "";
	var d_tbbsStrtDt = new Date($("#startYear").val(), getDate().substr(5, 2), getDate().substr(8, 2));
	var d_tbbsEndDt = new Date($("#endYear").val(), getDate().substr(5, 2), getDate().substr(8, 2));
	if(d_tbbsStrtDt > d_tbbsEndDt) {
		rMsg += "\n시작년도가 종료년도보다 큽니다.";
	}
	
	if(rMsg != "") {
		alert(rMsg);
		return;
	}
	$("#lfSt_tbllflyStatsList").clearGridData(); 
	//reload grid
	$("#lfSt_tbllflyStatsList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectlflyStatsList()}, 
		page : 1, sortname : "YEAR1, RESULTS.TYP", sortorder : "asc"});
	$("#lfSt_tbllflyStatsList").trigger("reloadGrid");
}

//엑셀저장 함수
function btnDown_ClicikEvent(){
	//엑셀출력
	excelDownLoad(getContextPath() + "/excel/statistics/lflyStatsExcel.do",getJsonStrSelectlflyStatsListExcel());
}

//실행 함수
$(function(){ 
	init_data();
	
});