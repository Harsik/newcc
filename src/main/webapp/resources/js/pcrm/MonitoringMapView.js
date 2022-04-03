$(document).ready(function(){
	
	datePicker("#srcCnslFrDate");
	datePicker("#srcCnslToDate");
	
	rMateChartH5.create("chart1", "chartHolder1", "", "100%", "100%");
	rMateChartH5.registerTheme(rMateChartH5.themes);
	
	// 지도그리기
	drawMap();
	
	// 날짜 셋팅
	dateSetting();
	
	fnChangeState();
	
	// 전체민원
	fnTotCnt();
	
	// 상위 3개
//	fnTopInfo();
	
	// 카테고리
	fnTopCtgInfo();
	
	// 지도 마커
	fnMapDataLoad();
	
	// 대분류 가져오기
	fnIntvLgCd();
	
  	// 조회조건 change 이벤트
    $("#optState").bind("change", fnChangeState);
    
    // 조회버튼 클릭 이벤트
    $("#btnCnslSearch").click(function(){
    	sigungu = "";
    	isInit = "Y";
    	
    	fnTotCnt();
//    	fnTopInfo();
    	fnTopCtgInfo();
    	fnMapDataLoad();
    });
    
    // 초기화버튼 클릭 이벤트
    $("#btnCnslInit").bind("click", init);
    
    // 엑셀다운버튼 클릭 이벤트
    $("#btnCnslExcel").bind("click", btnExcelClickEvent);
    
    $("#pcrmPopup .button").bind("click", goPcrmClickEvent);
});

//차트 데이터
var chartData =[];
var layoutStr = "";
var isInit = "Y";

function getLayout(){
	var visibleYn = "";
	if(isInit == "Y"){
		visibleYn = false; // 숨기기
	}else{
		visibleYn = true; // 보이기
	}
	
	layoutStr = 
	'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
		+'<Options>'
		   +'<Legend defaultMouseOverAction="false" useVisibleCheck="true"/>'
		+'</Options>'
     +'<Bar2DChart showDataTips="true" selectionMode="single" barWidthRatio="0.66">'
          +'<verticalAxis>'
             +'<CategoryAxis categoryField="CTG_LG_NM"/>'
          +'</verticalAxis>'
          +'<series>'
          +'<Bar2DSet type="clustered" showTotalLabel="true" totalLabelJsFunction="totalFunc" color="red" labelYOffset="2" labelXOffset="5">'
            +'<series>'
             +'<Bar2DSeries labelPosition="inside" labelAlign="left" visible="'+visibleYn+'" halfWidthOffset="1" xField="ADDRPCNT" displayName="지역 콜수" color="#000000" insideLabelYOffset="-2">'
             +'<showDataEffect>'
                       +'<SeriesInterpolate/>'
                   +'</showDataEffect>'
              +'</Bar2DSeries>'
             +'<Bar2DSeries labelPosition="inside" labelAlign="left" halfWidthOffset="1" xField="TOTPCNT" displayName="전체 콜수" color="#000000" insideLabelYOffset="-2">'
                    +'<showDataEffect>'
                       +'<SeriesInterpolate/>'
                   +'</showDataEffect>'
              +'</Bar2DSeries>'
         +'</series>'
         +'</Bar2DSet>'
         +'</series>'
      +'</Bar2DChart>'
  +'</rMateChart>';
	
	return layoutStr;
	
}

function totalFunc(index, data, value){
	console.log("total");
	 if(index == 5)
	      return insertComma(value);
	  return "";
	}

function seriesLabelFunc(seriesId, index, data, values){
	console.log("seriesId > " + seriesId);
	console.log("index > " + index);
	console.log("data");
	console.log(data);
	console.log("values > " + values);
	
	return "%";
}

function changeChart(w,h){
	 var ch = document.getElementById("chartHolder1")
	 ch.style.width = w+"px";
	    ch.style.height = h+"px";
	   document.getElementById("chart1").resize();
	}

function dateSetting(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hh = date.getHours();
	var mm = date.getMinutes();
	
	if(month < 10)
		month = "0"+month;
	if(day < 10)
		day = "0"+day;
	if (hh < 10) 
		hh = "0" + hh;
	if (mm < 10)
		mm = "0" + mm;
	
	$("#air_year").text(year+".");
	$("#air_date").text(month+"."+day);
	$("#air_time").text(hh+":"+mm);
	
}

// 카테고리 대분류
var intvLgCd = [];
var intvLgCdNm = [];

// 카테고리 대분류 추출
function fnIntvLgCd(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getCustInfo.do",
		data : "pJson=" + getJsonStrIntvCdSetSelectBox("",""),
		success : function(data){
			$.each(data , function(i){
				intvLgCd.push(data[i].CD);
				intvLgCdNm.push(data[i].CD_NM);
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 엑셀저장 버튼 클릭 이벤트
function btnExcelClickEvent(){
	if(nowCnt==0){
		alert("0건일때는 엑셀을 다운받을 수 없습니다.");
		return;
	}
	excelDownLoad(getContextPath() + "/excel/pcrm/ctgListExcel.do", getJsonStrCtgListExcel());
}

function getJsonStrCtgListExcel(){
	  
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cGNybS5zZWxlY3RFeGNlbExpc3Q=",
		"map" : {
			"key" : "value",
			"initLgCd" : intvLgCd,
			"initLgCdNm" : intvLgCdNm,
			"startDt" : $("#srcCnslFrDate").val().replace(/[-, :, \s]/g,""),
			"endDt" : $("#srcCnslToDate").val().replace(/[-, :, \s]/g,""),
			"title" : "지역별 민원현황" + setDownLoadName($("#srcCnslFrDate").val(), $("#srcCnslToDate").val()),
			"colWidth" 	: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			"colName"	: ["GB", "TOT_CNT"].concat(intvLgCd),
			"colHeader" : ["구분", "합계"].concat(intvLgCdNm),
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center", "center", "center", "center",
							"center", "center", "center", "center", "center", "center", "center", "center"]
		}
	};
		
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function init(){
	sigungu = "";
	isInit = "Y";
	
	// 날짜 세팅
	$("#srcCnslFrDate").val(getDate());
	$("#srcCnslToDate").val(getDate());
	
	oldCnt = 0;
	nowCnt = 0;
	$("#totCnt").text("0");
	$("#addrCnt").text("0");
	
	$("#air_name").text( "순천시" );
	$("#air_name2").text( "장천동" );
}

function fnChangeState(){
	
	if($("#optState").val()==0) { // 실시간
		$("#dvDate").hide();
		$("#btnCnslSearch").hide();
		$("#btnCnslInit").hide();
	  
		dateSetting();
		$("#air_year,#air_time,#todayText").show();

		refreshStart();
	} else { // 기간설정
		$("#dvDate").show();
		$("#btnCnslSearch").show();
		$("#btnCnslInit").show();
	  
		$("#air_year,#air_time,#todayText").hide();
		var date = $("#srcCnslFrDate").val()+" ~ "+$("#srcCnslToDate").val();
		$("#air_year,#air_time,#todayText").hide();
		$("#air_date").text(date);
	  
		refreshStop();
	}
  
	init();
//	$("#areaCnt").hide();
	$("#btnCnslSearch").trigger("click");
  
}

var sigungu = "";
var sigunguArr = [];
var refreshId = null;

// 지도 위에 마커 그리기
function drawMap() {
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getCustInfo.do",
		data : "pJson=" + getJsonStrMapInfo(),
		success : function(data){
			console.log(data);
			var str = "";
			for(var i=0; i<data.length; i++){
				str += '<div id='+data[i].ID+' name='+data[i].NAME+' style="position: absolute;"></div>'
			}
			$("#ptcityMap").append(str);
			sigunguArr = data;
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrMapInfo(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cGNybS5zZWxlY3RDb2RlTGlzdA==",
		"map" : {
			"key" : "value",
		}
	};
		
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

var idx = 0;
function showMarker() {
	$("#" + sigunguArr[idx].ID).append( 
			getMarkerDiv(sigunguArr[idx].ID, sigunguArr[idx].XX, sigunguArr[idx].YY, sigunguArr[idx].CNT )
	);
	idx ++;
	if(idx < sigunguArr.length) {
		setTimeout(function() {
			showMarker();
		}, 50);
	} 
	else {
		idx = 0;
	}
}

var markerHtml = '<div style="position: relative; top: $yy1px; left: $xx1px;">' 
	+ '<img src="/resources/pcrm/images/google-marker-$marker.png" style="width:$widpx"></img></div>'
	+ '<div onclick="javascript:btn_OnClick(\'$id\');" ondblclick="btn_OnDbClick(\'$id\');" style="position: relative; top: $yy2px; left: $xx2px; font-weight:bold; font-size: $fsizepx; color:black; text-align: center;">'
	+ '<p>$cnt</p></div>';
	
function getMarkerDiv(id, xx, yy, cnt) {
	var count = (cnt) ? cnt : '';
	
	if(count < 1) {
		return '';
	}
	if(count > 999) {
		return markerHtml.replace('$xx1', xx).replace('$yy1', yy-20 )
		.replace('$xx2', xx).replace('$yy2', yy-90 )
		.replace('$marker', 'r').replaceAll('$id', id)
		.replace('$wid', 50).replace('$fsize', 17 )
		.replace('$cnt', (count > 999) ? '999+' : count);
	}
	else {
		return markerHtml.replace('$xx1', xx).replace('$yy1', yy )
			.replace('$xx2', xx).replace('$yy2', yy-55 )
			.replace('$marker', 'w').replaceAll('$id', id)
			.replace('$wid', 40).replace('$fsize', 17 )
			.replace('$cnt', (count > 999) ? '999+' : count);
	}
}

function btn_OnDbClick(id){
	if(id == "a99") { // 기타는 상담이력을 보여주지 않는다.
		return;
	}
	
	popupEvent(id)
}

//상담이력 팝업
function popupEvent(id){
	
	var width = 1250;
	var height = 1000;
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);

 	var paramURL = getContextPath() + "/web/counsel/counselListPcrm.do?selAddr="+id;
// 	var paramURL = "http://" + window.location.hostname + ":9090/web/counsel/counselListPcrm.do?selAddr="+id+"&selAddrNm="+encodeURI(name);
 	
	var newWindow = window.open(paramURL, "상담이력", "resizable");
	newWindow.moveTo(left, top);
	newWindow.resizeTo(width,height);
	newWindow.focus();
	
}

//지도 데이터
function fnMapDataLoad(){
	for(var i=0; i<sigunguArr.length; i++) {
 		$("#" + sigunguArr[i].ID).empty();
 	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getJsonStrTopInfo.do",
		data : "pJson=" + getJsonStrMapData(),
		success : function(data){
			console.log('> 지역별 카운트 ', data);
			if(data.length > 0){ // data != null
				var idx = 0;
				for(var i=0; i<sigunguArr.length; i++){
					for(var j=0; j<data.length; j++){
						// Chrome Version
 						var idx = sigunguArr.findIndex(obj => obj.ID == data[j].H_ADDR);
						
						if(idx != -1) {sigunguArr[idx].CNT = data[j].CNT;}
					}
				}
				
				showMarker();
			} else {
				
			}
			
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
}

function getJsonStrMapData(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cGNybS5zZWxlY3RBZGRyQ291bnRMaXN0",
		"map" : {
			"key" : "value",
			"startDt" : $("#srcCnslFrDate").val().replace(/-/gi, ""),
			"endDt" : $("#srcCnslToDate").val().replace(/-/gi, "")
		}
	};
					
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function btn_OnClick(id){
	isInit = "N";
	var name = $('#'+id).attr('name');
	var cnt = $('#'+id+' > div > p').html();
	$("#air_name").html(name);
	$("#air_name2").html(name);
	
	$("#areaCnt").show();
	
	$("#addrCnt").html(cnt);
	
	sigungu = id;
	console.log("id = " + id + ", name = " + name);
	
	fnTopCtgInfo();
	
}

var oldCnt = 0;
var nowCnt = 0;

// 숫자 증가 애니메이션
function totCntAnimate(){
	$({ val : oldCnt }).animate({ val : nowCnt }, {
		duration: 3000,
		step: function() {
			var num = numberFormat(Math.floor(this.val));
			$("#totCnt").text(num);
		},
		complete: function() {
			var num = numberFormat(Math.floor(this.val));
			$("#totCnt").text(num);
			
			if($("#optState").val()==0){
				fnTotCnt();
			}
			
		}
	});
}

// 전체 민원수
function fnTotCnt(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getJsonTopCtgInfo.do",
		data : "pJson=" + getJsonTotCnt(),
		success : function(data){
			oldCnt = nowCnt;
			console.log('> totCnt ', data.CNT);
			nowCnt = data.CNT;
			totCntAnimate();
		}
		, error: function(data) {
			console.log('> error ', data);
		}
    });
}

//var testCnt = 13;
//function fnTotCnt(){
//	console.log("oldCnt : "+oldCnt + ", nowCnt : "+nowCnt);
//	oldCnt = nowCnt;
//	nowCnt += testCnt;
//	totCntAnimate();
//	if(nowCnt > 500) {
//		clearInterval(refreshTotCnt);
//		return false;
//	}
//}

function getJsonTotCnt(){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "cGNybS5zZWxldFRvdGFsQ250",
		"map" : {
			"key" : "value",
			"startDt" : $("#srcCnslFrDate").val().replace(/-/gi, ""),
			"endDt" : $("#srcCnslToDate").val().replace(/-/gi, "")
		}
	};
			
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 상단 Top 3개 지역별 정보
function fnTopInfo(){
	$(".green-bg > table").remove();
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getJsonStrTopInfo.do",
		data : "pJson=" + getJsonStrTopInfo(),
		success : function(data){
			console.log('> 상위 3개 지역 ', data);
			var str = "";
			if(data.length > 0){ // data != null
				$("#areaCnt").hide();
				
				str += '<TABLE>';
				$.each(data , function(i){
					str += '<TR style="height: 33px;">';
					str += '<TD style="padding-top: 4px; font-size: 18px; font-weight: 600;">' + data[i].CD_NM + '</TD>';
					str += '<TD style="text-align: left; color: black; font-size: 23px; font-weight: 700;">' + numberFormat(data[i].CNT) + '</TD>';
					str += '<TD>';
					str += '<div class="progress">';
					str += '<div class="progress-bar progress-bar-striped progress-bar-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="color:#000000; font-weight: bold; width:'+data[i].PCNT+'%">';
					str += data[i].PCNT;
					str += '%</div></div>';
					str += '</TD>';
					str += '</TR>';
				});
				str += '</TABLE>';
				$(".green-bg").append(str);
			} else {
				$("#areaCnt").show();
			}
			
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrTopInfo(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cGNybS5zZWxlY3RUb3BJbmZvTGlzdA==",
		"map" : {
			"key" : "value",
			"sigungu" : sigungu,
			"startDt" : $("#srcCnslFrDate").val().replace(/-/gi, ""),
			"endDt" : $("#srcCnslToDate").val().replace(/-/gi, "")
		}
	};
			
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 하단 n개 카테고리별 정보
function fnTopCtgInfo(){
	chartData = [];
	getLayout();

	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getJsonTopCtgInfo.do",
		data : "pJson=" + getJsonTopCtgInfo(),
		success : function(data){
			console.log('> fnTopCtgInfo ', data);
			if(data.length > 0) {
				chartData = data;
			} else {
				
			}
			rMateChartH5.calls("chart1", { "setLayout" : layoutStr, "setData" : chartData});
		}
		, error: function(data) {
			console.log('> error ', data);
		}
    });
}

function getJsonTopCtgInfo(){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cGNybS5zZWxlY3RDdGdMaXN0",
		"map" : {
			"key" : "value",
			"sigungu" : sigungu,
			"startDt" : $("#srcCnslFrDate").val().replace(/-/gi, ""),
			"endDt" : $("#srcCnslToDate").val().replace(/-/gi, "")
		}
	};
				
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function goPcrmClickEvent(){
	var clickId = this.value;
	var clickNm = this.innerText;
	var url = "";
	
	console.log(clickId + ", " + clickNm);
	
	switch(clickId) {
    case 'keywordSumm':
    	url = "/web/pcrm2/statKeywordSumm.do";
    	break;
    case 'counselType':
    	url = "/web/pcrm2/statCounselType.do";
    	break;
    case 'typeTrend':
    	url = "/web/pcrm2/statTypeTrend.do";
    	break;
    case 'keyword':
    	url = "/web/pcrm2/statKeyword.do";
    	break;
	}
	
	var width = 1800;
	var height = 1050;
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);

	var paramURL = getContextPath() + url;
	var newWindow = window.open(paramURL, clickNm, "resizable");
	
	newWindow.moveTo(left, top);
	newWindow.resizeTo(width,height);
	newWindow.focus();
}


var refreshTotCnt;
var refreshTopInfoCnt;
var refreshNowDateTime;
var refreshTopCtgInfo;
var refreshfnMapDataLoad;

function refreshStart(){
	
	// 전체 민원 건수
//	refreshTotCnt = setInterval(fnTotCnt, 2000);
	
	// 상위 3건 지역 정보
//	refreshTopInfoCnt = setInterval(fnTopInfo, 10000);
	
	// 현재 시간
	refreshNowDateTime = setInterval(function() { $("#air_time").text(getTime()); }, 10000);
	
	// 하단 n건 카테고리별 정보
	refreshTopCtgInfo = setInterval(fnTopCtgInfo, 60000);
	
	// 지도 데이터 뿌리기
	refreshfnMapDataLoad = setInterval(fnMapDataLoad, 10000);
}

function refreshStop() {
//	clearInterval(refreshTotCnt);
//	clearInterval(refreshTopInfoCnt);
	clearInterval(refreshNowDateTime);
	clearInterval(refreshTopCtgInfo);
	clearInterval(refreshfnMapDataLoad);
}