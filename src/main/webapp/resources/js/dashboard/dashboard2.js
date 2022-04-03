var g_slideIntervalSecond=20;
var g_dataIntervalSecond=20;
var g_mode="real";
var g_left=188; //275
var g_groupWidth='60%';

//파라미터 셋팅 getJsonStrCTIdashBoardData
function getJsonStrCTIdashBoardData()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY3RpRGFzaEJvYXJk",
		"map" : {
			"key" : "value",
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_getJsonStrDashBoardData
function getJsonStrDashBoardData()
{
	    var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	if (month < 10) month = "0" + month;
	var curdate = today.getDate();
	if (curdate < 10) curdate = "0" + curdate;

	var toDate=year+month+curdate;
	var fromDate="";
	if(g_mode == "test"){
		fromDate="20170101";
	}else{
		fromDate=toDate;
	}

	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDEuZGFzaEJvYXJk",
		"map" : {
			"key" : "value",
			"from_date": fromDate,
			"to_date": toDate
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

var g_DashBoardArray01=[];
var g_DashBoardRate01=[];
var g_DashBoardArray02=[];
var g_DashBoardName02=[];
var g_DashBoardArray03=[];
var g_DashBoardName03=[];

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 화면하단 정보를 새로고침을 하는 함수
 */

function getDashBoardData()
{

		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/dashboard/getCtiDashBoardData.do",
			data : "pJson=" + getJsonStrCTIdashBoardData(),
			success : function(data)
			{

				var InOut=0;

					$("#agentLogin").html("0"); // 상담 로그인
					$("#agentReady").html("0"); // 상담 대기
					$("#agentBusy").html("0"); // 상담 통화
					$("#afterWork").html("0"); // 상담 후처리
					$("#custWait").html("0"); //고객 대기호
					$("#totalCall").html("0"); // 인입호
					$("#serviceLevel").html("0"); //서비스레벨
					$("#inbound").html("0"); // IB
					$("#abandon").html("0"); // 포기호
					$("#answerRate").html("0"); // 응답율
					$("#outbound").html("0"); // OB
					$("#IbObCall").html("0"); //총처리호  IB+OB
				// console.log(data);
					$.each(data, function(key, state)
					{
					   if(state.TYPE=="AGENTSTATE") {
						   // WAIT_COUNT
						   // TOTAL_COUNT
							$("#agentLogin").html(state.LOGON_COUNT); // 상담 로그인
							$("#agentReady").html(state.READY_COUNT); // 상담 대기
							$("#agentBusy").html(state.BUSY_COUNT); // 상담 통화
							$("#afterWork").html(state.ACW_COUNT); // 상담 후처리
						}else if(state.TYPE=="CALLSTATE") {
							$("#custWait").html(state.WAIT_COUNT); //고객 대기호
							$("#totalCall").html(numberWithCommas(state.TOTAL_COUNT)); // 인입호
							$("#serviceLevel").html(state.LOGON_COUNT); //서비스레벨
							$("#inbound").html(numberWithCommas(state.READY_COUNT)); // IB
							InOut += state.READY_COUNT;
							$("#abandon").html(state.BUSY_COUNT); // 포기호
							$("#answerRate").html(state.ACW_COUNT); // 응답율
						}else if(state.TYPE=="OUTBOUND"){
							InOut +=state.WAIT_COUNT;
							$("#outbound").html(numberWithCommas(state.WAIT_COUNT)); // OB
						}

					});

					$("#IbObCall").html(numberWithCommas(InOut)); //총처리호  IB+OB


			},
			error : function(data, status, err)
			{
				//networkErrorHandler(data, status, err);
			}
		});

		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/dashboard/getDashBoardData.do",
			data : "pJson=" + getJsonStrDashBoardData(),
			success : function(data)
			{
				if(data != null)
				{
					//============================ 상담분야변 page3
					 var data_etc=Number(data.TOTALCOUNT)-(Number(data.GREENPEACE)+Number(data.CULTURE)+Number(data.WELFARE)+Number(data.CITY)+Number(data.TRAFFIC)+Number(data.GE_ADMINIST)+Number(data.AGRIFISH));
					 var data_etc_rate=100-(Number(data.GREENPEACE_RATE)+Number(data.CULTURE_RATE)+Number(data.WELFARE_RATE)+Number(data.CITY_RATE)+Number(data.TRAFFIC_RATE)+Number(data.GE_ADMINIST_RATE)+Number(data.AGRIFISH_RATE));
					$("#cnslCount01").html(data_etc +"건");
					$("#cnslCount02").html(data.GREENPEACE+"건");
					$("#cnslCount03").html(data.CULTURE+"건");
					$("#cnslCount04").html(data.WELFARE+"건");
					$("#cnslCount05").html(data.CITY+"건");
					$("#cnslCount06").html(data.TRAFFIC+"건");
					$("#cnslCount07").html(data.GE_ADMINIST+"건");
					$("#cnslCount08").html(data.AGRIFISH+"건");
					
					$("#cnslCountt02").html(numberWithCommas(data.TOTALCOUNT)+"건");
					$("#cnslCountt03").html(numberWithCommas(data.TOTALCOUNT)+"건");

				 g_DashBoardRate01['분야']='건수';
				 g_DashBoardRate01['기타']=data_etc_rate==0?"":data_etc_rate+"%";
				 g_DashBoardRate01['청정환경']=data.GREENPEACE_RATE==0?"":data.GREENPEACE_RATE+"%";
				 g_DashBoardRate01['문화관광']=data.CULTURE_RATE==0?"":data.CULTURE_RATE+"%";
				 g_DashBoardRate01['보건복지']=data.WELFARE_RATE==0?"":data.WELFARE_RATE+"%";
				 g_DashBoardRate01['도시건설']=data.CITY_RATE==0?"":data.CITY_RATE+"%";
				 g_DashBoardRate01['교통']=data.TRAFFIC_RATE==0?"":data.TRAFFIC_RATE+"%";
				 g_DashBoardRate01['일반행정']=data.GE_ADMINIST_RATE==""?"":data.GE_ADMINIST_RATE+"%";
				 g_DashBoardRate01['농수축산']=data.AGRIFISH_RATE==""?"":data.AGRIFISH_RATE+"%";

		 g_DashBoardArray01['분야']='건수';
		 g_DashBoardArray01['기타']=data_etc;
		 g_DashBoardArray01['청정환경']=data.GREENPEACE;
		 g_DashBoardArray01['문화관광']=data.CULTURE;
		 g_DashBoardArray01['보건복지']=data.WELFARE;
		 g_DashBoardArray01['도시건설']=data.CITY;
		 g_DashBoardArray01['교통']=data.TRAFFIC;
		 g_DashBoardArray01['일반행정']=data.GE_ADMINIST;
		 g_DashBoardArray01['농수축산']=data.AGRIFISH;
					//============================ 상담요청  page2

		 			$("#reqCount01").html(data.JEJU_NATIVE +"건");
					$("#reqCount02").html(data.JEJU_TOURIST+"건");
					$("#reqCount03").html(data.JEJU_ETC+"건");

					 g_DashBoardArray02['구분']='건수';
					 g_DashBoardArray02['제주도민']=data.JEJU_NATIVE;
					 g_DashBoardArray02['관광객']=data.JEJU_TOURIST;
					 g_DashBoardArray02['기타']=data.JEJU_ETC;


					 g_DashBoardName02['구분']='구분';
					 g_DashBoardName02['제주도민']='제주도민   '+data.JEJU_NATIVE_RATE+'%';
					 g_DashBoardName02['관광객']='관광객  '+data.JEJU_TOURIST_RATE+'%';
					 g_DashBoardName02['기타']='기타 '+data.JEJU_ETC_RATE+'%';
					 //============================ 행정기관별 page2

		 			$("#administCount01").html(data.JEJU_DO +"건");
					$("#administCount02").html(data.JEJU_CI+"건");
					$("#administCount03").html(data.JEJU_SE+"건");
					$("#administCount04").html(data.JEJU_ET+"건");

					 g_DashBoardName03['분야']='분야';
					 g_DashBoardName03['제주도청']='제주도청 '+data.JEJU_DO_RATE+'%';
					 g_DashBoardName03['제주시청']='제주시 '+data.JEJU_CI_RATE+"%";
					 g_DashBoardName03['서귀포시청']='서귀포시 '+data.JEJU_SE_RATE+'%';
					 g_DashBoardName03['기타']='기타 '+data.JEJU_ET_RATE+'%';

					 g_DashBoardArray03['분야']='건수';
					 g_DashBoardArray03['제주도청']=data.JEJU_DO;
					 g_DashBoardArray03['제주시청']=data.JEJU_CI;
					 g_DashBoardArray03['서귀포시청']=data.JEJU_SE;
					 g_DashBoardArray03['기타']=data.JEJU_ET;

					 //============================ 상담요청, 행정기관별 page2
				}
				else
				{
					$("#administCount01").html("0건");
					$("#administCount02").html("0건");
					$("#administCount03").html("0건");
					$("#administCount04").html("0건");

					$("#cnslCount01").html("0건");
					$("#cnslCount02").html("0건");
					$("#cnslCount03").html("0건");
					$("#cnslCount04").html("0건");
					$("#cnslCount05").html("0건");
					$("#cnslCount06").html("0건");
					$("#cnslCount07").html("0건");
				}
			},
			error : function(data, status, err)
			{
				//networkErrorHandler(data, status, err);
			}
		});
}



function startTime() {
	// 오늘 날짜 구하기
    var today = new Date();
    var year = today.getFullYear();
	var month = today.getMonth()+1;
	var date = today.getDate();
	var day = getTodayLabel(1);
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    $("#curDate1").html(year + ". " + month + ". " + date +"("+day+") &nbsp; ");
    $("#curTime1").html(h + ":" + m + ":" + s);
    $("#curDate2").html(year + ". " + month + ". " + date +"("+day+") &nbsp; ");
    $("#curTime2").html(h + ":" + m + ":" + s);
    $("#curDate3").html(year + ". " + month + ". " + date +"("+day+") &nbsp; ");
    $("#curTime3").html(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}; // 숫자가 10보다 작을 경우 앞에 0을 붙여줌
    return i;
}


function drawChart() {

	// 차트 데이터 설정
	var data1 = google.visualization.arrayToDataTable([
			 ['분야' ,g_DashBoardArray01['분야'], { role:'style'}, {role: 'annotation'}],
			 ['',g_DashBoardArray01['기타'], '#8deaff', g_DashBoardRate01['기타']] ,
			 ['',g_DashBoardArray01['청정환경'], '#3ee7ee', g_DashBoardRate01['청정환경']],
			 ['',g_DashBoardArray01['문화관광'], '#10c0dd', g_DashBoardRate01['문화관광']],
			 ['',g_DashBoardArray01['보건복지'], '#1474ff', g_DashBoardRate01['보건복지']],
			 ['',g_DashBoardArray01['농수축산'], '#0479cc', g_DashBoardRate01['농수축산']],
			 ['',g_DashBoardArray01['도시건설'], '#0192ff', g_DashBoardRate01['도시건설']],
			 ['',g_DashBoardArray01['교통'], '#13a1ea', g_DashBoardRate01['교통']],
			 ['',g_DashBoardArray01['일반행정'], '#0479cc', g_DashBoardRate01['일반행정']]
		 ]);


	// 그래프 옵션
	var options1 = {
			bar : 'horizontal',
		title : '', // 제목
		width : '100%', // 가로 px   //1580
		height : 650, // 세로 px
		backgroundColor: {'fill': '' },
	    chartArea:{left:g_left,top:150,width:1460,height:'75%'},
		bar : {
			groupWidth : g_groupWidth // 그래프 너비 설정 % 60%
		},
		legend : {
			position : 'none' // 항목 표시 여부 (현재 설정은 안함)
		},
		 animation: { //차트가 뿌려질때 실행될 애니메이션 효과
                 startup: true,
                 duration: 1000,
                 easing: 'out' },
       annotations: {
    	   alwaysOutside : true,
           textStyle: {
             fontSize: 15,
             bold: true,
             italic: true,
             color : '#1c0000',
           }
       }
	};

	//#1c0000
	var chart1 = new google.visualization.ColumnChart(document.getElementById('chart_div'));
	chart1.draw(data1, options1);
}

function drawPieChart1() {

	// 차트 데이터 설정
	var data1 = google.visualization.arrayToDataTable([
		[g_DashBoardName02['구분'],  g_DashBoardArray02['구분']], // 항목 정의
		[g_DashBoardName02['제주도민'], g_DashBoardArray02['제주도민']], // 항목, 값
		[g_DashBoardName02['관광객'], g_DashBoardArray02['관광객']],
		[g_DashBoardName02['기타'], g_DashBoardArray02['기타']]
	]);

	// 파이 옵션
	var options1 = {
			title: '',
			'backgroundColor': {
		        'fill': ''
		     },
		     legend: {position: 'labeled'},
		    pieSliceText: 'label',
		    showLabels: 'true',
		     pieSliceTextStyle : {
		    	color: 'black',
		    	fontName: 'Arial Black',
		    	fontSize: 11,
		    },
		    chartArea:{left:110,top:20,width:'70%',height:'70%'},
		    legend : 'none',
		    pieStartAngle: 100,
			width:940,
            height:750,
			pieHole: 0.4,
			slices: {
            0: { color: '#045fb3' },
            1: { color: '#0778e7' },
            2: { color: '#27c4e1' }
			}
	};


	var chart1 = new google.visualization.PieChart(document.getElementById('pie_div'));
	chart1.draw(data1, options1);
}

function drawPieChart2() {

// 차트 데이터 설정
	var data2 = google.visualization.arrayToDataTable([
		[ '분야', '건수'],
		[g_DashBoardName03['제주도청'], g_DashBoardArray03['제주도청']],
		[g_DashBoardName03['제주시청'], g_DashBoardArray03['제주시청']],
		[g_DashBoardName03['서귀포시청'], g_DashBoardArray03['서귀포시청']],
		[g_DashBoardName03['기타'], g_DashBoardArray03['기타']]
	]);

	// 파이 옵션
	var options2 = {
			title: '',
			'backgroundColor': {
		        'fill': ''
		     },
		     legend: {position: 'labeled'},
		    pieSliceText: 'label',
		    showLabels: 'true',
		     pieSliceTextStyle : {
		    	color: 'black',
		    	fontName: 'Arial Black',
		    	fontSize: 11,
		    },
		    chartArea:{left:110,top:20,width:'70%',height:'70%'},
		    legend : 'none',
		    pieStartAngle: 120,
			width:940,
            height:750,
			pieHole: 0.4,
			slices: {
	            0: { color: '#045fb3' },
	            1: { color: '#0778e7' },
	            2: { color: '#27c4e1' },
	            3: { color: '#71dff0' }
			}
	};

	var chart2 = new google.visualization.PieChart(document.getElementById('pie_div2'));
	chart2.draw(data2, options2);
}

function reLoadData(){

// 데이타 가져오기
getDashBoardData();

// 로딩 완료시 함수 실행하여 차트 생성
google.charts.setOnLoadCallback(drawChart);
//google.charts.setOnLoadCallback(drawPieChart1);
google.charts.setOnLoadCallback(drawPieChart2);

//	$(".slidesjs-container").css("width", "100%");
//	$(".slidesjs-container").css("height", "100%");
//	$(".slidesjs-control").css("width", "1920");
//	$(".slidesjs-control").css("height", "1080");
//	$(".slidesjs-slide").css("height", "90%");

}

	// 차트를 사용하기 위한 준비입니다.
	google.charts.load('current', {packages:['corechart']});
	//google.charts.load('current', {packages:['piechart']});
	 //load the Google Visualization API and the chart
    //google.charts.load('visualization', '1', {'packages':['columnchart']});

$(document).ready(function()
{

		var agent = navigator.userAgent.toLowerCase();

if (agent.indexOf("safari") != -1) {
//   alert('safari');
   g_groupWidth='60%'
}

if (agent.indexOf("mobile") != -1) {
  // g_left=screen.width-375;   // 375=>425 - 50
   //g_left=$(window).width()-($(window).width()*0.82);
	alert(1);
	var width=$(window).width();
	if(width>2450){
		g_left='23.1%';
	}else if(width==2223){
		g_left='20.0%';
	}else if(width==2133){
		g_left='19.0%';
	}
   //alert($(window).width()+":"+screen.width+":"+$(document).width()+":"+g_left);
}
//	var window.screenLeft;
//	var scrwidth=screen.width;
//	if(scrwidth){
//
//	}



	g_mode= $("#tfMode").val();

	 var cookConf= getCookie("dashconf"); //쿠키사용 영구적
	 if(cookConf!=""){
		 var confval= cookConf.split("|");
		g_slideIntervalSecond=Number(confval[0]);
		g_dataIntervalSecond=Number(confval[1]);
	 }

	startTime();

	reLoadData();

	// 5초 주기
	 var loop1 = (function looper (i) {
			setTimeout(function() {	reLoadData(); if(i==0) {  i=0; looper(i) }	}, g_dataIntervalSecond*1000 ) })(0);


	 $("#tfDashConfig").val(g_slideIntervalSecond+"|"+g_dataIntervalSecond);

	 $('#centerName').bind("click", function(e)
	{
		  if($("#tfDashConfig").val()==""){
			 return;
		 }

		 if($("#tfDashConfig").css("display") == "none"){
			 	$("#tfDashConfig").show();
			 	$("#spanDashConfig").show();
			}else{
				var confval= $("#tfDashConfig").val().split("|");
				g_slideIntervalSecond=Number(confval[0]);
		 		g_dataIntervalSecond=Number(confval[1]);
				setCookie("dashconf", $("#tfDashConfig").val(), 1000);
				$("#tfDashConfig").hide();
				$("#spanDashConfig").hide();
			}

	});

	$('#imgConfSet').bind("click", function(e)
	{
		  location.reload();
	});

});


$(function() {
      $('#slides').slidesjs({
        width: 1920,
        height: 1080,
        start: 3,
/*		 navigation: {
	     active: true,
	    // [boolean] Generates next and previous buttons.
	    // You can set to false and use your own buttons.
	    // User defined buttons must have the following:
	    // previous button: class="slidesjs-previous slidesjs-navigation"
	    // next button: class="slidesjs-next slidesjs-navigation"
	     effect: "fade"
	    // [string] Can be either "slide" or "fade".
	    },
        pagination: {
		      active: true,
		        // [boolean] Create pagination items.
		        // You cannot use your own pagination. Sorry.
		      effect: "fade"
		        // [string] Can be either "slide" or "fade".
		},*/
	    play: {
          active: true,
          effect: 'fade',
          auto: true,
          interval: g_slideIntervalSecond*1000,
          swap: true,
         pauseOnHover: false,
         /*  restartDelay: 2500*/
        },
       /* effect: {
        		slide: {
        			// Slide effect settings.
        			speed: 200
		      // [number] Speed in milliseconds of the slide animation.
		     },
		      fade: {
		        speed: 600,
		          // [number] Speed in milliseconds of the fade animation.
		        crossfade: true
		          // [boolean] Cross-fade the transition.
		      }
		 }*/
      });
    });

