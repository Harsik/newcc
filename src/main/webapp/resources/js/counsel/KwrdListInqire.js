/**
 * 
 */
var usrId = window.sessionStorage.getItem("USR_ID");
var g_tbbsStrtDt="", g_tbbsEndDt="";
//파라미터셋팅 keyworList
function getJsonStrSelectKeywordList(keycheck) {
	var frDt = $("#kwliqi_tfKeywordStrtDt").val();
	var toDt = $("#kwliqi_tfKeywordEndDt").val();
	
	if($("#kwliqi_tfKeywordStrtDt").val() != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if($("#kwliqi_tfKeywordEndDt").val() != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");

	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEua3dyZExpc3Q=",
		"map" : {
			"key" : "value",
			"tbbs_strt_dt" : frDt,
			"tbbs_end_dt" : toDt,
			"selUsrId" : $("#kwliqi_selkeywordNm").val(),
			"chkRetire" : (keycheck == true) ? "Y" : "N"
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 keyworldExcel
function getJsonStrkeyworldExcel(arrStDate,assLtDate)
{
	
   var loParam = {
      "qt" : "c2VsZWN0TGlzdA==",
      "mi" : "Y2gwMDEua3dyZExpc3Q=",
      "map" : {
         "key" : "value",
         "tbbs_strt_dt" : arrStDate.replace(/[-, :, \s]/g,""),
         "tbbs_end_dt" : assLtDate.replace(/[-, :, \s]/g,""),
         "chkRetire" : ($("input[id=chkNotUse]:checkbox").is(":checked") == true) ? "Y" : "N",
         "title" : "키워드_목록_이력" + setDownLoadName(arrStDate, assLtDate),
         "colWidth" : [8,56,14,10],
         "colName" : ["COLNUMS","KEYWORD_TTL", "GUNSU", "USE_YN"],
         "colHeader" : ["순번","키워드", "관련민원건수", "사용여부"],
         "colAlign" : ["center","center", "center", "center"]
      }
   };
   console.log(JSON.stringify(loParam));
   return  encodeURIComponent(JSON.stringify(loParam));
}


//excel다운로드
function keywordExcelDownload(){
   var arrStDate = $("#kwliqi_tfKeywordStrtDt").val();
   var assLtDate = $("#kwliqi_tfKeywordEndDt").val();
   excelDownLoad(getContextPath() + "/excel/counsel/keywordExcellist.do", getJsonStrkeyworldExcel(arrStDate,assLtDate));
}
//초기화
function keywordReset(){
	g_tbbsStrtDt=$("#kwliqi_tfKeywordStrtDt").val(getDate().substr(0, 8) + "01");
	g_tbbsEndDt=$("#kwliqi_tfKeywordEndDt").val(getDate());
   $("#kwliqi_selkeywordNm").val("all");
   $("#kwliqi_chkNotUse").attr("checked",false);
	$("#kwliqi_tblKeywordList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectKeywordList($("input[id=chkNotUse]:checkbox").is(":checked"))}, 
		page : 1, sortname : "COLNUMS", sortorder : "ASC"});
	$("#kwliqi_tblKeywordList").trigger("reloadGrid");
}
//intitData
function keywordInitData(){
   //tfKeywordStrtDt 시작
   //tfKeywordEndDt 끝
   datePicker("#kwliqi_tfKeywordStrtDt");
   datePicker("#kwliqi_tfKeywordEndDt");
   g_tbbsStrtDt= $("#kwliqi_tfKeywordStrtDt").val(getDate().substr(0, 8) + "01");
   g_tbbsEndDt= $("#kwliqi_tfKeywordEndDt").val(getDate());
   //셀렉트 원상태
   $("#kwliqi_selkeywordNm").val("all");
   
   //jqgrid초상태
   $("#kwliqi_tblKeywordList").jqGrid({
		url : getContextPath() + "/jqgrid/counsel/selectKeywordList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectKeywordList($("input[id=chkNotUse]:checkbox").is(":checked"))
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["키워드 제목", "관련 민원건수", "사용여부"],
		colModel : [
			            { name : "KEYWORD_TTL", index : "KEYWORD_TTL", width : 340, align: "center" },
			            { name : "GUNSU", index : "GUNSU", width : 50, align: "center" },
			            { name : "USE_YN", index : "USE_YN", width : 30, align: "center",
							cellattr: function ( rowId , tv , rowObject , cm , rdata ) { 
								if ( rowObject.USE_YN == "미사용" ) { return 'style="text-align:center;color:blue;"' }
								}
						}
						],
       sortname : "COLNUMS",
       sortorder : "ASC",
       gridview : true,
       hidegrid : false,
       shrinkToFit : true,
       loadonce : false,
       scrollOffset : 0,
       height : "540",
       width : "80%",
       rowNum : 10,
       rowList : [10, 20, 30, 50,70],
       autowidth : true,
       pager : "#kwliqi_pgKeywordList",
       rownumbers : true,
       rownumWidth : 30,
       emptyrecords : "",
       caption : "",
       loadui : "enable",
       viewrecords: true,
       multiselect: false,
       onCellSelect : function(rowid, iCol, cellContent, e){},
       error : function(data, status, err){
       	networkErrorHandler(data, status, err);
       }
	}).jqGrid("navGrid", "#kwliqi_pgKeywordList", {edit : false, add : false, del : false, search : false});
   
   
  
}
//검색
function keywordSearch(){
	//reload grid
   g_tbbsStrtDt= $("#kwliqi_tfKeywordStrtDt").val().replace(/-/g,"");
   g_tbbsEndDt= $("#kwliqi_tfKeywordEndDt").val().replace(/-/g,"");
   
	$("#kwliqi_tblKeywordList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectKeywordList($("input[id=chkNotUse]:checkbox").is(":checked"))}, 
		page : 1, sortname : "COLNUMS", sortorder : "ASC"});
	$("#kwliqi_tblKeywordList").trigger("reloadGrid");
}

$(document).ready(function(){
   keywordInitData();

   //취소버튼을 눌렀을때
   $("#kwliqi_btnKyInit").bind("click",keywordReset);
   
   // 엑셀버튼을 눌렀을때
   $("#kwliqi_btnKyExcel").bind("click",keywordExcelDownload);
   
   // 검색버튼을 눌렀을때
   $("#kwliqi_btnKySearch").bind("click",keywordSearch);
   setObjSelectBoxWithCode("kwliqi_selkeywordNm", "전체", "", "CHILD", "90025", "");	// 처리상태 셋팅
});