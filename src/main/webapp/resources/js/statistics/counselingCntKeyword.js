var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;
 
if(currentMonth < 10)
currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;
 
var gUserArr = [];
var gUserNmArr = [];
var gKeywordCdArr = [];
var gKeywordNmArr = [];
 
// 그리드 설정 정보
var gColNames = [];
var gColModel = [];
var gGroupHeaders = [];
 
//엑셀 정보
var gColName = [];
var gColWidth = [];
var gColAlign = [];
var gGroupHeader = [];
var gColHeader = [];
 
 
// 관리자 여부
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");
 
//파라미터 셋팅 usrList
function getJsonStrUserList()
{
var loParam = {
"qt" : "c2VsZWN0TGlzdA==",
"mi" : "b20wMDEuc2VsZWN0TGlzdA==",//om001.selectList
"map" : {
"key" : "value", 
"cslCntKw_chkRetire" : $("#cslCntKw_chkRetire").prop("checked"), // 퇴사여부 
"cntr_cd" : "010000",
"notuse" : false,
"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
"sord" : "asc", 
}
}; 
console.log(JSON.stringify(loParam));
return  encodeURIComponent(JSON.stringify(loParam));
}
 
 
// Keyword 코드리스트
function getJsonKeywordCdList()
{
var loParam = {
"qt" : "c2VsZWN0TGlzdA==",
"mi" : "c20wMDIuY29kZWxpc3Q=",
"map" : {
"key" : "value",
"tp_cd" : "90025", 
"notuse" : false,
"sidx" : "cd_ord",
"sord" : "asc"
}
};
console.log(JSON.stringify(loParam));
return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
 
//파라미터 셋팅_getJsonStsCounselingCntKeyword
function getJsonStsCounselingCntKeyword() {
 
var termType = $("#cslCntKw_optTerm").val();
var schStartDt = "";
var schEndDt = "";
 
if(termType == "year") {
schStartDt = $("#cslCntKw_schYearStart").val();
schEndDt = $("#cslCntKw_schYearEnd").val();
}
else if(termType == "month") { 
schStartDt = $('#cslCntKw_schMonthStart').val();
schEndDt = $('#cslCntKw_schMonthEnd').val();
 
var schStartDt1 = new Date(schStartDt)  
var schEndDt1 = new Date(schEndDt)  
 
if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
alert("13개월 이상 검색할 수 없습니다.");
return false;
}
 
}
else if(termType == "day") { 
schStartDt = $("#cslCntKw_schDayStart").val();
schEndDt = $("#cslCntKw_schDayEnd").val();
var schStartDt1 = new Date(schStartDt)  
var schEndDt1 = new Date(schEndDt)  
 
if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
alert("31일 이상 검색할 수 없습니다.");
return false;
}
 
}
 
var loParam = {
"qt" : "c2VsZWN0TGlzdA==",
"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudEtleXdvcmQ=",//ch001.stsCounselingCntKeyword
"map" : {
"key" : "value" ,
"optTerm" : $("#cslCntKw_optTerm").val(), // year, month, day
"schStartDt" : schStartDt.replace(/-/g, ""),
"schEndDt" :schEndDt.replace(/-/g, ""), 
"gUserArr" : gUserArr,
"gKeywordCdArr" : gKeywordCdArr
}
};
 
console.log(JSON.stringify(loParam));
return  encodeURIComponent(JSON.stringify(loParam));
}
 
 
//파라미터 셋팅_getJsonStsCounselingCntKeywordExcel
function getJsonStsCounselingCntKeywordExcel() {
 
var termType = $("#cslCntKw_optTerm").val();
var schStartDt = "";
var schEndDt = "";
var titleType=""
 
if(termType == "year") { 
schStartDt = $("#cslCntKw_schYearStart").val();
schEndDt = $("#cslCntKw_schYearEnd").val();
titleType = "키워드별_상담현황_년도별";
}
else if(termType == "month") { 
schStartDt = $('#cslCntKw_schMonthStart').val();
schEndDt = $('#cslCntKw_schMonthEnd').val();
 
var schStartDt1 = new Date(schStartDt)  
var schEndDt1 = new Date(schEndDt)  
 
if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
alert("13개월 이상 검색할 수 없습니다.");
return false;
}
titleType = "키워드별-상담현황_월별";
}
else if(termType == "day") { 
schStartDt = $("#cslCntKw_schDayStart").val();
schEndDt = $("#cslCntKw_schDayEnd").val();
var schStartDt1 = new Date(schStartDt)  
var schEndDt1 = new Date(schEndDt)  
 
if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
alert("31일 이상 검색할 수 없습니다.");
return false;
}
titleType = "키워드별_상담현황_일별";
 
}
	titleType = titleType + setDownLoadName(schStartDt, schEndDt);
 
var loParam = {
"qt" : "c2VsZWN0TGlzdA==",
"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudEtleXdvcmQ=", //ch001.stsCounselingCntKeyword
"map" : {
"key" : "value" , 
"optTerm" : $("#cslCntKw_optTerm").val(), // year, month, day
"schStartDt" : schStartDt.replace(/-/g, ""),
"schEndDt" :schEndDt.replace(/-/g, ""), 
"sidx" : $("#cslCntKw_tblStsCounselingCntKeyword").getGridParam("sortname"),
"sord" : $("#cslCntKw_tblStsCounselingCntKeyword").getGridParam("sortorder"),
"gUserArr" : gUserArr,
"gKeywordCdArr" : gKeywordCdArr,
"title" : titleType,
"colWidth" :gColWidth,
"colName" : gColName, 
"colAlign" :gColAlign, 
        "colHeader1" : gGroupHeader,
    "colHeader3" : gColHeader
 
}
}; 
 
console.log(JSON.stringify(loParam));
return  encodeURIComponent(JSON.stringify(loParam));
 
}
 
//상담사 셀렉트 박스 구성
function chkRetire(){ 
ulUserListSet();
init();
}
 
function ulUserListSet(){
var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='ulUserList'></ul></dd></dl>";
$("#cslCntKw_multiCheckbox").html(dropdownBoxHtml);
 
$.ajax({
type : "post",
dataType: "json",
async : false,
url : getContextPath() + "/ajax/user/userList.do",
data : "pJson=" + getJsonStrUserList(),
success : function(data) {
 
// param값을 JSON으로 파싱
var ulUserList = "";
$.each(data, function(key, state) {
var tempTxt="";
if(state.RET_YN != undefined) tempTxt = "("+state.RET_YN+")";
ulUserList += "<li><input type='checkbox' name='liUser' value='" + state.USR_ID + "' data='" + state.USR_NM + tempTxt + "' /> " + state.USR_NM + "<font color='red'>"+tempTxt + "</font>" + "</li>";
 
});
 
$("#ulUserList").html(ulUserList);
$("#cslCntKw_multiCheckbox").dropdownMultiCheckbox();
},
error : function(data, status, err) {
networkErrorHandler(data, status, err);
}
});
 
// 상담사 전체 선택 이벤트
$("#ulUserList .allmultichk").on('click', function(e){ 
gUserArr = [];
gUserNmArr = [];
var chk = $(this).is(':checked');
if(chk){
$("dd input[name='liUser']").each(function(){
gUserArr.push($(this).val());
gUserNmArr.push($(this).attr('data'));
});
} 
});
// 상담사 개별 선택 이벤트
$("dd input[name='liUser']").on('click',function(e){
 
var chk = $(this).is(':checked');
if(chk){
gUserArr.push($(this).val());
gUserNmArr.push($(this).attr('data'));
}else{
var pos = gUserArr.indexOf($(this).val());
gUserArr.splice(pos, 1); 
gUserNmArr.splice(pos, 1); 
} 
}); 
}
 
// 초기화 함수
function init(){
gUserArr = [];
gUserNmArr = []; 
 
$("#cslCntKw_optTerm").val("day");
 
$("#ulUserList .allmultichk").prop('checked', true);
 
$("dd input[name='liUser']").each(function(){
$(this).prop('checked', true);
gUserArr.push($(this).val());
gUserNmArr.push($(this).attr('data'));
});
$("#cslCntKw_multiCheckbox").setCheckedCnt(); 
//alert(gUserArr.toString());
 
// 조회조건 기간 체인지 이벤트 등록
changeTerm();
 
 
// 그리드
stsKeywordSearch();
}
 
 
//기간 셀렉트 박스별 상세 검색
function changeTerm() {
 
var termType = $("#cslCntKw_optTerm").val();
 
if(termType == "year") {
$("#cslCntKw_dvYear").show();
$("#cslCntKw_dvMonth").hide();
$("#cslCntKw_dvDay").hide();
 
 
$("#cslCntKw_schYearStart").val(currentYear);
$("#cslCntKw_schYearEnd").val(currentYear);
}
else if(termType == "month") { 
$("#cslCntKw_dvYear").hide();
$("#cslCntKw_dvMonth").show();
$("#cslCntKw_dvDay").hide();
    
$('#cslCntKw_schMonthStart').val( currentYM );
$('#cslCntKw_schMonthEnd').val( currentYM ); 
}
else if(termType == "day") { 
$("#cslCntKw_dvYear").hide();
$("#cslCntKw_dvMonth").hide();
$("#cslCntKw_dvDay").show();
 
$("#cslCntKw_schDayStart").val(getDate1());
$("#cslCntKw_schDayEnd").val(getDate());
}
}
 
 
// 엑셀다운 버튼 클릭 이벤트
function stsKeywordExelDown() {
setGrid();
param = getJsonStsCounselingCntKeywordExcel();
url = getContextPath() + "/excel/mprows/mpRowsExcelDown.do"; 
excelDownLoad(url, param);
    
}
 
 
function setGrid(){
 
if(gUserArr.length == 0){
alert("선택하신 상담사가 없습니다.");
return false; 
}
 
 
 
 
 
// 그리드 설정 정보
gColNames = [];
gColModel = [];
gGroupHeaders = [];
 
//엑셀 정보 
gColName = [];
gColWidth = [];
gColAlign = [];
gGroupHeader = [];
gColHeader = [];
 
gKeywordCdArr = [];
gKeywordNmArr = [];
 
$.ajax({
type : "post",
dataType: "json",
async : false,
url : getContextPath() + "/ajax/code/codelist.do",
data : "pJson=" + getJsonKeywordCdList(),
success : function(data) { 
// param값을 JSON으로 파싱 
$.each(data, function(key, state) {
gKeywordCdArr.push(state.CD);
gKeywordNmArr.push(state.CD_NM);
});
},
error : function(data, status, err) {
networkErrorHandler(data, status, err);
}
}); 
 
 
var positionS=0;
 
gColNames.push("날짜", "구분");
gColModel.push(
{"name" : "RCV_DT", width : 100, align : "center", frozen : true, sortable : false, hidden:true}, 
{"name" : "GB", width : 50, align : "center", frozen : true, sortable : false}
);
 
 
gColName.push( "GB");
gColWidth.push(5);
gColAlign.push("center");
 
positionS = positionS + 1;
gColHeader.push("구분, C, 0, 2");
 
for(var i = 0  ; i < gKeywordCdArr.length; i++){ 
 
gColNames.push("건수", "비율");
 
gColModel.push(
{"name" : "CNT_"+gKeywordCdArr[i], width : 80, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'},
{"name" : "RATE_"+gKeywordCdArr[i], width : 80, align : "right", sortable : false, hidden:false}
);
gGroupHeaders.push({startColumnName: "CNT_"+gKeywordCdArr[i], numberOfColumns : 2, titleText : gKeywordNmArr[i]});
 
gColName.push( "CNT_"+gKeywordCdArr[i], "RATE_"+gKeywordCdArr[i]);
gColWidth.push(8, 7);
gColAlign.push("right", "right");
 
gGroupHeader.push(gKeywordNmArr[i]+", R," + positionS +", 2"); 
positionS = positionS + 2;
gColHeader.push("건수, C, 1, 1","비율, C, 1, 1");
}
 
gColNames.push("합계");
gColModel.push( 
{"name" : "TOT", width : 60, align : "right", formatter: 'integer', sortable : false, summaryType:'sum'}
);
 
 
gColName.push( "TOT");
gColWidth.push(7);
gColAlign.push("right");
gColHeader.push("합계, C, 0, 2");
 
}
 
//조회 버튼 클릭 이벤트 
function stsKeywordSearch(){
setGrid();
grid(getJsonStsCounselingCntKeyword(), gColNames, gColModel, gGroupHeaders);
}
 
//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
$("#cslCntKw_dvGridArea").empty();
var tb = "<table id = 'cslCntKw_tblStsCounselingCntKeyword'></table>"; 
$("#cslCntKw_dvGridArea").append(tb);
 
$("#cslCntKw_tblStsCounselingCntKeyword").jqGrid(
{
url : getContextPath() + "/ajax/statistics/counselingCntKeyword.do",
datatype : "json",
mtype : "POST",
postData : {
pJson : jsonValue
},
jsonReader :
{
repeatitems: false
},
colNames : colNamesValue,
colModel : colModelValue,
sortname : "RCV_DT",
sortorder : "ASC",
gridview : true,
    hidegrid : false,
    shrinkToFit : false,
    loadonce : false,
    scrollOffset : 0,
    height : "660",
    width : "100%",     
    autowidth : true,
    pgbuttons : true,
    rownumbers : true,
    rownumWidth : 30,
    rowNum : "10000",
    multiselect : false,
    emptyrecords : "0",
    caption : "",
    loadui : "enable",
    viewrecords : true,
    //footerrow  : true,
    //userDataOnFooter : true,
    loadComplete: function() {
    
            var ids = $("#cslCntKw_tblStsCounselingCntKeyword").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
             var rowData = $("#cslCntKw_tblStsCounselingCntKeyword").getRowData(rowId) ;
             if(rowData.GB =="합계"){
             $("#cslCntKw_tblStsCounselingCntKeyword").setRowData( rowId ,false,{background:"#EAEAEA"});
             }
             
              
           }) ;
           
    
       },
       
}).jqGrid('setGroupHeaders', 
{
  useColSpanStyle : true, 
  groupHeaders : groupHeadersValue
}).jqGrid('setFrozenColumns');
 
 
}
 
 
$(document).ready(function(){
 
var isMngr= false;
switch(usr_grd_cd) {
      case '020100'://파트매니저
      case '030100'://그룹매니저
      case '050100'://센터장
      case '060100'://통합센터장
      case '090100'://시스템관리자
         isMngr = true;
         break;
      default:
         isMngr = false;
         break;
}
 
if(isMngr){
$("#cslCntKw_btnStsKeywordExelDown").show();
}else{
$("#cslCntKw_btnStsKeywordExelDown").hide();
}
 
 
var selectBox = ""; 
for(var i = currentYear; i >= currentYear-10; i--)
{
selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
}
 
$("#cslCntKw_schYearStart").html(selectBox);
$("#cslCntKw_schYearEnd").html(selectBox);
 
$("#cslCntKw_schMonthStart").MonthPicker({
MaxMonth: 0
    });
 
$("#cslCntKw_schMonthEnd").MonthPicker({
MaxMonth: 0
    });
 
 
 
$("#cslCntKw_schDayStart").bind("change",  function () {
$( "#cslCntKw_schDayEnd" ).datepicker( "option", "minDate", $("#cslCntKw_schDayStart").val() );
var toDay = new Date(getDate());
var maxDay = new Date(getAddDate($("#cslCntKw_schDayStart").val(), 31));
 
if((toDay.getTime() - maxDay.getTime()) < 0){
// 현재 날짜가 작은경우
$( "#cslCntKw_schDayEnd" ).datepicker( "option", "maxDate",getDate());
}else{
$( "#cslCntKw_schDayEnd" ).datepicker( "option", "maxDate", getAddDate($("#cslCntKw_schDayStart").val(), 31) );
}
$( "#cslCntKw_schDayStart" ).datepicker( "option", "maxDate",getDate()); 
 
$(".ui-datepicker-trigger").css("vertical-align","middle");
});
 
$("#cslCntKw_schDayEnd").bind("change",  function () {
//$( "#cslCntKw_schDayStart" ).datepicker( "option", "minDate", getAddDate($("#cslCntKw_schDayEnd").val(), -31) );
//$( "#cslCntKw_schDayStart" ).datepicker( "option", "maxDate", $("#cslCntKw_schDayEnd").val() );
$( "#cslCntKw_schDayStart" ).datepicker( "option", "maxDate",getDate());
$( "#cslCntKw_schDayEnd" ).datepicker( "option", "maxDate",getDate());
$(".ui-datepicker-trigger").css("vertical-align","middle");
 
});
 
 
datePicker("#cslCntKw_schDayStart");
datePicker("#cslCntKw_schDayEnd"); 
 
// 상담사 셀렉트 박스 세팅
ulUserListSet();
// 초기화
init(); 
 
 
 
// 퇴사자포함 체크 클릭 이벤트 등록
$("#cslCntKw_chkRetire").on("click", chkRetire);
 
 
// 기간 조회조건 change 이벤트
$("#cslCntKw_optTerm").bind("change", changeTerm); 
 
// 초기화 버튼 클릭 이벤트 등록
$("#cslCntKw_btnStsKeywordInit").bind("click", init);
 
// 조회 버튼 클릭 이벤트 등록
$("#cslCntKw_btnStsKeywordSearch").bind("click", stsKeywordSearch);
 
// 엑셀다운 버튼 클릭 이벤트 등록
$("#cslCntKw_btnStsKeywordExelDown").bind("click", stsKeywordExelDown);
});