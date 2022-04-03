function initdivStatMapViewTab(){
	
	datePicker("#srcCnslFrDate");
	datePicker("#srcCnslToDate");
	
	// 날짜 셋팅
	dateSetting();
	
	fnChangeState();
	
	// 전체민원
	fnTotCnt();
	
	// 상위 3개
	fnTopInfo();
	
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
    	fnTotCnt();
    	fnTopInfo();
    	fnTopCtgInfo();
    	fnMapDataLoad();
    });
    
    // 초기화버튼 클릭 이벤트
    $("#btnCnslInit").bind("click", init);
    
    // 엑셀다운버튼 클릭 이벤트
    $("#btnCnslExcel").bind("click", btnExcelClickEvent);
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
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
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
	// 날짜 세팅
	$("#srcCnslFrDate").val(getDate());
	$("#srcCnslToDate").val(getDate());
	$("#addrCnt").text("0");
}

function fnChangeState(){
  if($("#optState").val()==0) { // 실시간
	  $("#dvDate").hide();
	  $("#btnCnslSearch").hide();
	  $("#btnCnslInit").hide();
	  
	  $("#air_name").text( sigunguName );
	  $("#air_name2").text( sigunguName );
	  dateSetting();
	  $("#air_year,#air_time,#todayText").show();
	  
	  drawMap();
	  init();
	  refreshStart();
  } else { // 기간설정
	  $("#dvDate").show();
	  $("#btnCnslSearch").show();
	  $("#btnCnslInit").show();
	  
	  $("#air_year,#air_time,#todayText").hide();
	  var date = $("#srcCnslFrDate").val()+" ~ "+$("#srcCnslToDate").val();
	  $("#air_year,#air_time,#todayText").hide();
	  $("#air_date").text(date);
	  $("#air_name").text( sigunguName );
	  $("#air_name2").text( sigunguName );
	  
	  init();
	  refreshStop();
  }
}

var sigungu = '';
var sigunguName = '';
var sigunguArr = [];
var refreshId = null;
var initYn = "Y"; // load 초기 여부

// 지도 위에 마커 그리기
function drawMap() {
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrMapInfo(),
		success : function(data){
			console.log(data);
			sigunguArr = data;
//			getLoc(''); // 초기진입시 전체의 민원이 보이게 셋팅
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
	+ '<div onclick="javascript:btn_OnClick(\'$id\');" ondblclick="btn_OnDbClick();" style="position: relative; top: $yy2px; left: $xx2px; font-weight:bold; font-size: $fsizepx; color:black; text-align: center;">'
	+ '<p>$cnt</p></div>';
	
function getMarkerDiv(id, xx, yy, cnt) {
	var count = (cnt) ? cnt : '';
	
	if(count < 1) {
		return '';
	}
	if(count > 999) {
		return markerHtml.replace('$xx1', xx).replace('$yy1', yy-80 )
		.replace('$xx2', xx).replace('$yy2', yy-150 )
		.replace('$marker', 'r').replace('$id', id)
		.replace('$wid', 50).replace('$fsize', 17 )
		.replace('$cnt', (count > 999) ? '999+' : count);
	}
	else {
		return markerHtml.replace('$xx1', xx).replace('$yy1', yy-60 )
			.replace('$xx2', xx).replace('$yy2', yy-115 )
			.replace('$marker', 'w').replace('$id', id)
			.replace('$wid', 40).replace('$fsize', 17 )
			.replace('$cnt', (count > 999) ? '999+' : count);
	}
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
// 						var idx = sigunguArr.findIndex(obj => obj.NAME == data[j].H_ADDR);
						
 						// IE Version - IE에선 findIndex 지원하지 않는다.
						sigunguArr.some(function(el, i) {
						    if (el.NAME == data[j].H_ADDR) {
						        idx = i;
						        return true;
						    }else{
						    	idx = -1;
						    }
						});
 						
 						
						if(idx != -1) {sigunguArr[idx].CNT = data[j].CNT;}
					}
				}
				// Chrome Version
// 				var idx = sigunguArr.findIndex(obj => obj.ID == $("#subId").val()); 
 				
 				
 				// IE Version - IE에선 findIndex 지원하지 않는다.
				var idx2 = 0;
				sigunguArr.some(function(el, i) {
					if (el.Id == $("#subId").val()) {
						idx2 = i;
					    return true;
					}
				});
			} else {
				
			}
			showMarker();
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


function getLoc(id) {
	sigungu = id;
	for(var i=0; i<sigunguArr.length; i++) {
		if(id == sigunguArr[i].id) {
			sigunguName = sigunguArr[i].name;
			break;
		}
	}
	dataLoad();
	$("#subId").val(id);
}

function btn_OnClick(id){
	alert(id);
}

var oldCnt = 0;
var nowCnt = 0;

// 숫자 증가 애니메이션
function totCntAnimate(){
	$({ val : oldCnt }).animate({ val : nowCnt }, {
		duration: 2000,
		step: function() {
			var num = numberFormat(Math.floor(this.val));
			$("#totCnt").text(num);
		},
		complete: function() {
			var num = numberFormat(Math.floor(this.val));
			$("#totCnt").text(num);
		}
	});
}

// 전체 민원수
/*
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
//			$("#totCnt").text(data.CNT);
			totCntAnimate();
		}
		, error: function(data) {
			console.log('> error ', data);
		}
    });
}
*/

var testCnt = 13;
function fnTotCnt(){
	console.log("oldCnt : "+oldCnt + ", nowCnt : "+nowCnt);
	oldCnt = nowCnt;
	nowCnt += testCnt;
	totCntAnimate();
	if(nowCnt > 500) {
		clearInterval(refreshTotCnt);
		return false;
	}
}

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
	$("#areaCnt").hide();
	$(".green-bg > table").remove();
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getJsonStrTopInfo.do",
		data : "pJson=" + getJsonStrTopInfo(),
		success : function(data){
			console.log('> 순천시 상위 3개 지역 ', data);
			var str = "";
			if(data.length > 0){ // data != null
				str += '<TABLE>';
				$.each(data , function(i){
					str += '<TR style="height: 33px;">';
					str += '<TD style="padding-top: 4px; font-size: 18px; font-weight: 600;">' + data[i].H_ADDR + '</TD>';
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
//				$("#air_name2").text("순천시");
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
	$("#topCtgInfo > tbody").html(""); // 분류 테이블 초기화
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/pcrm/getJsonTopCtgInfo.do",
		data : "pJson=" + getJsonTopCtgInfo(),
		success : function(data){
			console.log('> fnTopCtgInfo ', data);
			var str = "";
			if(data.length > 1) { // 합계 제외하고 나와야 하기 때문에 data>1
	            $.each(data , function(i){
	            	str += '<TR>';
					str += '<TD>' + data[i].CTG_LG_NM + '</TD>';
					str += '<TD style="width: 60px;">' + numberFormat(data[i].ADDRCNT) + '</TD>';
					str += '<TD>';
					str += '<div class="progress">';
					str += '<div class="progress-bar progress-bar-striped progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="color:#000000; width:'+data[i].ADDRPCNT+'%">';
					str += data[i].ADDRPCNT;
					str += '%</div></div>';
					str += '</TD>';
					str += '<TD style="width: 60px;">' + numberFormat(data[i].TOTCNT) + '</TD>';
					str += '<TD>';
					str += '<div class="progress">';
					str += '<div class="progress-bar progress-bar-striped progress-bar-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="color:#000000; width:'+data[i].TOTPCNT+'%">';
					str += data[i].TOTPCNT;
					str += '%</div></div>';
					str += '</TD>';
					str += '</TR>';
	           });
			} else {
				str += '<TR>';
				str += '<TD colspan="5" style="text-align: center;">';
				str += '데이터가 없습니다.';
				str += '</TD>';
				str += '</TR>';
			}
			
			$("#topCtgInfo").append(str); 
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

function refreshStart(){
	
	// 전체 민원 건수
	refreshTotCnt = setInterval(fnTotCnt, 2000);
	
	// 상위 3건 지역 정보
	refreshTopInfoCnt = setInterval(fnTopInfo, 10000);
	
	// 현재 시간
	refreshNowDateTime = setInterval(function() { $("#air_time").text(getTime()); }, 10000);
	
	// 하단 n건 카테고리별 정보
	refreshTopCtgInfo = setInterval(fnTopCtgInfo, 60000);
	
	// 지도 데이터 뿌리기
	refreshfnMapDataLoad = setInterval(fnMapDataLoad, 10000);
}

function refreshStop() {
	clearInterval(refreshTotCnt);
	clearInterval(refreshTopInfoCnt);
	clearInterval(refreshNowDateTime);
	clearInterval(refreshTopCtgInfo);
	clearInterval(refreshfnMapDataLoad);
}