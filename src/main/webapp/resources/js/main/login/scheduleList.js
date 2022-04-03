var g_usrId = window.sessionStorage.getItem("USR_ID");

function getJsonColorCode(codeType){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNzEuc2NoQ29sb3JMaXN0",
			"map" : {
				"key" : "value",
				"tpCd" : codeType,
			}
		};
		
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_SmsSendList
function getJsonScheduleList(start,end){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNzEuc2NoZWR1bGVMaXN0",
		"map" : {
			"key" : "value",
			"schdGbCd" : $("input:radio[name=optCdbKnd]:checked").val()==null?"all":$("input:radio[name=optCdbKnd]:checked").val(),
			"startDate" : start,
			"endDate" : end
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectSchedule
function getJsonStrSelectSchedule(schdId) {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wNzEuc2NoZWR1bGVWaWV3",
			"map" : {
				"key" : "value",
				"schd_id" : schdId,
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function setSpanColorCode(selectId, codeType){
	var $selectId = $("#" + selectId);
	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonColorCode(codeType),
		success : function(data){
			$selectId.html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			$.each(jr, function(key, state){
				var bgColor =""
				if(state.EXT1_CD != undefined){
					bgColor =state.EXT1_CD;
				}
				  value += "<div class='colorCode' style='background-color:"+bgColor+"; width:15px;height:15px;float:left;'></div><div style='float:left;'><span>" + state.CD_NM + "</span></div>";
			});
					
			$selectId.append(value);
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
	});
}

function btnModify_clickEvent(){
	location.href= getContextPath() + "/web/myinfo/scheduleForm.do";
}

function btnModify(id){
	location.href= getContextPath() + "/web/myinfo/scheduleForm.do?id="+id;
}


function fullCalendar(){
	$("#calendar").fullCalendar({
		viewRender:function(view,element){
	        var moment = $('#calendar').fullCalendar('getDate');
	        var prev = moment.clone().add(-1,'month');
	        $("button.fc-prev-button").html( prev.format('YYYY년 MM월'));
	        var next = moment.clone().add(1,'month');
	        $("button.fc-next-button").html( next.format('YYYY년 MM월'));
	     },
	     views: {
	    	 month: {
	    		 titleFormat: 'YYYY년 MM월'
	    	 },	    	 
	     },
		header: {
			left: 'prev, today',
			center: 'title',
			right: 'next'
		},
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		theme: true,
		defaultDate: getDate(),
		locale: "ko",
		width: "100%",
		height: 468,
		editable: false,
		navLinks: false, // can click day/week names to navigate views
		eventLimit: true, // allow "more" link when too many events
		eventRender: function(eventObj, $el) {			
			/*
			$el.popover({
				//title: eventObj.title,
		        content: eventObj.title,
		        trigger: "hover",
		        placement: "top",
		        container: "body"
		      });
		      */
		      
		},
		events: function(start, end, timezone, callback) {  
			var startStr = start.format("YYYYMMDD");
			var endStr = end.format("YYYYMMDD");
			$.ajax({
				type : "post",
				url :  "/ajax/counsel/getUsrList.do",
				data : "pJson=" + getJsonScheduleList(startStr,endStr),
				dataType: "json",
				success : function(data){
					var date2 =data.filter(function(value){
					    return ( data.SCHDGBCD = '020000' || data.CRT_USR_ID==g_usrId);
					})
				    
				    	var events =[];
					$(date2).each(function(index, element){
					    if(element.VACT_APPR_NM!="200000"){
						return true; //non-false is the same as a continue statement in a for loop;
					    }
					    events.push({
						id : $(this).attr("SCHD_ID"),
						title: $(this).attr("TITLE")=="휴무"? $(this).attr("USR_NM")+" "+  $(this).attr("TITLE"):$(this).attr("TITLE") ,
						start: $(this).attr("STRT_DTTM"),
						end: $(this).attr("END_DTTM"),
						allDay:  $(this).attr("ALL_DAY"),
						color : $(this).attr("COLORS")
					    });
					   
					});
					callback(events);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		},
		timeFormat: 'HH:mm',
	});
}

	function btnInit_clickEvent(){
		$("button.fc-today-button").click();
		 $('input[name="optCdbKnd"]').removeAttr('checked');
		 $('input[name="optCdbKnd"]:radio[value="all"]').prop('checked',true);
		 $("#calendar").fullCalendar("refetchEvents");
	}
function initscheduleList(){
	
	  //setObjSelectBoxWithCode("optCdbKnd", "전체", "","CHILD","90075", "");
	 $("input:radio[name=optCdbKnd]").click(function(){ 
		 $("#calendar").fullCalendar("refetchEvents");
		}) 
	 
	  setSpanColorCode("optColor","90075");	//구분
	
	$("#inpPnctId ,#inpUsrId ,#applcnt, #rqstDt, #confmer, #confmDt, #chgHy").empty();
	
	$("#btnModify").bind("click",btnModify_clickEvent);
	
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	//fullCalendar();
}