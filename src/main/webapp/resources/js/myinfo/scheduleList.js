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
				  value += "<span class='colorCode' style='background-color:"+bgColor+";'></span><span>" + state.CD_NM + "</span>";
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
	$("#scheli_calendar").fullCalendar({
		viewRender:function(view,element){
	        var moment = $('#scheli_calendar').fullCalendar('getDate');
	        var prev = moment.clone().add(-1,'month');
	        $("button.fc-prev-button").html( prev.format('YYYY년 MM월'));
	        var next = moment.clone().add(1,'month');
	        $("button.fc-next-button").html( next.format('YYYY년 MM월'));
	     },
		header: {
			left: 'prev, today',
			center: 'title',
			right: 'next'
		},
		defaultDate: getDate(),
		locale: "ko",
		width: "100%",
		height: 580,
		editable: false,
		navLinks: false, // can click day/week names to navigate views
		eventLimit: true, // allow "more" link when too many events
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
		eventClick: function(calEvent, jsEvent, view) {
			var startDt;
			var endDt;
			
			if (calEvent.start != null && calEvent.end == null) {
				startDt = calEvent.start._i.replace(/-/g, "").substr(0, 8);
				endDt = startDt;
			} else if(calEvent.start != null && calEvent.end != null) {
				startDt = calEvent.start._i.replace(/-/g, "").substr(0, 8);
				endDt = calEvent.end._i.replace(/-/g, "").substr(0, 8);
			};
			
			sessionStorage.setItem("schdStartDt", startDt);
			sessionStorage.setItem("schdEndDt", endDt);
			
			btnModify(calEvent.id)
		}
	});
}

function btnInit_clickEvent(){
	$("button.fc-today-button").click();
	 $('input[name="optCdbKnd"]').removeAttr('checked');
	 $('input[name="optCdbKnd"]:radio[value="all"]').prop('checked',true);
	 $("#scheli_calendar").fullCalendar("refetchEvents");
}

$(document).ready(function() {
	
	  /*setObjSelectBoxWithCode("optCdbKnd", "전체", "","CHILD","90075", "");*/
	 $("input:radio[name=optCdbKnd]").click(function(){ 
		 $("#scheli_calendar").fullCalendar("refetchEvents");
		}) 
	 
	  setSpanColorCode("optColor","90075");	//구분
	
	$("#scheli_inpPnctId ,#scheli_inpUsrId ,#scheli_applcnt, #scheli_rqstDt, #scheli_confmer, #scheli_confmDt, #scheli_chgHy").empty();
	
	$("#scheli_btnModify").bind("click",btnModify_clickEvent);
	
	$("#scheli_btnInit").bind("click", btnInit_clickEvent);
	
	fullCalendar();
});