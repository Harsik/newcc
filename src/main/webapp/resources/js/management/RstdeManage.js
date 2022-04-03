/**
 * 
 */
var HDY_NM="";
var HDY_ID="";
var HD_USE_YN="";
var STRT_DT="";
var moveMonth="";
var title="";
var c_strt_day="";
var c_end_day="";
var searchYear="";

//파라미터 셋팅 스케쥴 리스트
function getJsonScheduleList(){
	 var moment = $('#rstdeMng_calendar').fullCalendar('getDate');
	 var date = new Date(moment);
	  moveMonth=date.yyyymmdd().replace(/-/g,"");
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDQucmVzdGRFaGxkeUxpc3Q=",
		"map" : {
			"key" : "value",
			"startDate" :  moveMonth.substring(0,6),
			"endDate" :   moveMonth.substring(0,6),
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//스케쥴 카운트
function getJsonScheduleListCount(startYear,endYear){
	
	 var moment = $('#rstdeMng_calendar').fullCalendar('getDate');
	 var date = new Date(moment);
	  moveMonth=date.yyyymmdd().replace(/-/g,"");
	  
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDQucmVzdGRFaGxkeUxpc3RDb3VudA==",
		"map" : {
			"key" : "value",
			"startDate" :startYear,
			"endDate" :  endYear,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//달력 복사 함수
function getJsonScheduleCopyList(yearDate){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDQucmVzdGRFaGxkeUxpc3Q=",
		"map" : {
			"key" : "value",
			"startDate" :  yearDate,
			"endDate" :   yearDate,
			"sidx":"HD_STRT_DT",
			"sord":"desc"
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//공휴일 저장
function getJsonStrInseHoliDay(){
	   var loParam = {
			      "qt" : "dXBkYXRl",
			      "mi" : "b20wMDQuaW5zZXJ0aGRDb2Rl",
			      "map" : {
			    	  "key" : "value",
						"hdy_nm" : $("#rstdeMng_HldyNm").val(),
						"strt_dt" : $("#rstdeMng_HldyUsr").val().replace(/-/g,""),
						"end_dt" :  $("#rstdeMng_HldyUsr").val().replace(/-/g,""),
						"cntr_cd" :  window.sessionStorage.getItem("CNTR_CD"),
						"hdy_type" : '',
						"hdy_dsc" : '',
						"use_yn" : "Y",
						"login_usr_id" : window.sessionStorage.getItem("USR_ID")	
			      }
			   };
			   
			   console.log(JSON.stringify(loParam));
			   return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));   
}

//공휴일 저장
function getJsonStrCopySave(title,startDay,endDay){
	   var loParam = {
			      "qt" : "dXBkYXRl",
			      "mi" : "b20wMDQuaW5zZXJ0aGRDb2Rl",
			      "map" : {
			    	  "key" : "value",
						"hdy_nm" : title,
						"strt_dt" :startDay,
						"end_dt" :  endDay,
						"cntr_cd" :  window.sessionStorage.getItem("CNTR_CD"),
						"hdy_type" : '',
						"hdy_dsc" : '',
						"use_yn" : "Y",
						"login_usr_id" : window.sessionStorage.getItem("USR_ID")	
			      }
			   };
			   
			   console.log(JSON.stringify(loParam));
			   return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));   
}

//공휴일 수정
function getJsonStrUpdateHoliDay(){
	   var loParam = {
			      "qt" : "aW5zZXJ0",
			      "mi" : "b20wMDQudXBkYXRlaGRDb2Rl",
			      "map" : {
			    	  "key" : "value",
						"hdy_nm" : $("#rstdeMng_HldyNm").val(),
						"strt_dt" : $("#rstdeMng_HldyUsr").val().replace(/-/g,""),
						"end_dt" :  $("#rstdeMng_HldyUsr").val().replace(/-/g,""),
						"use_yn" : "Y",
						"hdy_id" : HDY_ID,
						"login_usr_id" : window.sessionStorage.getItem("USR_ID")
			      }
			   };
			   
			   console.log(JSON.stringify(loParam));
			   return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));   
}

//공휴일 삭제
function getJsonStrDeleteHoliDay(){
	   var loParam = {
			      "qt" : "aW5zZXJ0",
			      "mi" : "b20wMDQuZGVsZXRlaGRDb2Rl",
			      "map" : {
			    	  "key" : "value",
						"use_yn" : "N",
						"hdy_id" : HDY_ID,
						"login_usr_id" : window.sessionStorage.getItem("USR_ID")
			      }
			   };
			   
			   console.log(JSON.stringify(loParam));
			   return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));   
}

//문자상담
function getJsonStrsmsInit(){
   var loParam = {
      "qt" : "c2VsZWN0TGlzdA==",
      "mi" : "c20wMDIuY29kZWxpc3RHcnQ=",
      "map" : {
         "key" : "value",
      }
   };
   
   console.log(JSON.stringify(loParam));
   return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));   
}

//시간일정
function initEvent(){
	$("#rstdeMng_HldyUsr").val(getDate());
	datePicker("#rstdeMng_HldyUsr");
	$("#rstdeMng_HldyUsr").attr("readonly",true);
   $("#rstdeMng_schTimeSt, #rstdeMng_schTimeEn,#rstdeMng_hdschTimeSt, #rstdeMng_hdschTimeEn").timepicki({
       reset: true,
      show_meridian:false,
      min_hour_value:0,
      max_hour_value:23,
      step_size_minutes:15,
      overflow_minutes:false
   });
	 $("#rstdeMng_checkBoxId").change(function(){
	    if($("#rstdeMng_checkBoxId").is(":checked")){
	       $("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList("")},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
		   $("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
	    }else{
	    	var searchDate = $("#rstdeMng_calendar").fullCalendar("getDate");
	    	var date = new Date(searchDate);
	    	var gomoveMonth=date.yyyymmdd();
	    	$("#rstdeMng_HldyUsr").val(gomoveMonth);
	    	$("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList(gomoveMonth.replace(/-/g,""))},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
	      	$("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
	    }
	});
}

//인사말 코드 저장
function getJsonStrInsertsmsCodeRm(tpcd,code){
	
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMDQuaW5zZXJ0U21zQ29kZQ==",
		"map" : {
			"key" : "value",
			"tp_cd" : tpcd,
			"cd" : code,
			"ext1_cd" : $("#rstdeMng_rm_prologue").val(),
			"ext2_cd" : $("#rstdeMng_rm_remarks").val(),
			"ext3_cd" : "",
			"login_usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//근무시간 코드정리
function getJsonStrInsertsmsCode(tpcd,code,radioCode,startClock,endClock){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMDQuaW5zZXJ0U21zQ29kZQ==",
		"map" : {
			"key" : "value",
			"tp_cd" : tpcd,
			"cd" : code,
			"ext1_cd" : radioCode,
			"ext2_cd" : fnGetNumeric(startClock)+"00",
			"ext3_cd" :  fnGetNumeric(endClock)+"00",
			"login_usr_id" : window.sessionStorage.getItem("USR_ID")
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터셋팅 RstdeList
function getJsonStrRstdeList(getCalendar) {
	var dates="";
	if(getCalendar){
		dates=getCalendar.substring(0,6);
	}else{
		dates=(($("#optDayMonth").val()>10)?$("#optDayYear").val()+$("#optDayMonth").val():$("#optDayYear").val()+"0"+$("#optDayMonth").val());
	}
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "b20wMDQuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"strt_dt" :dates,
			"end_dt" : dates,
			"hdy_type":(($("input[id=rstdeMng_checkBoxId]:checkbox").is(":checked")==true)?"010000":"020000")
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//jgrid 저장
function jqgrid_Rstde(){
	$("#rstdeMng_tblRstdeManageList").jqGrid({
		url : getContextPath() + "/jqgrid/statistics/RstdeManaeList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrRstdeList("")
		},
		jsonReader : {
			repeatitems: false
		},
		colNames : ["공휴일명","공휴일자","공휴일아이디","휴일시작","휴일종료","휴일타입","휴일종류","사용여부"],
		colModel : [
		            { name : "HDY_NM", index : "HDY_NM", width : 10, align: "center"},
		            { name : "HD_STRT_DT", index : "HD_STRT_DT",align: "center" ,width :10 },
		            { name : "HDY_ID", index : "HDY_ID", width : 30, align: "center",hidden:true},
		            { name : "STRT_DT", index : "STRT_DT", width : 30, align: "center",hidden:true},
		            { name : "HD_END_DT", index : "HD_END_DT", width : 30, align: "center",hidden:true},
		            { name : "HD_HDY_TYPE", index : "HD_HDY_TYPE", width : 30, align: "center",hidden:true},
		            { name : "HD_HDY_DSC", index : "HD_HDY_DSC", width : 30, align: "center",hidden:true},
		            { name : "HD_USE_YN", index : "HD_USE_YN", width : 30, align: "center",hidden:true}
		            ],
        sortname : "HD_STRT_DT",
        sortorder : "ASC",
        gridview : true,
        hidegrid : false,
        shrinkToFit : true,
        loadonce : false,
        scrollOffset : 0,
        height : "430",
        sortable: false,
        width : "80%",
        rowNum : 20,
        rowList : [10, 20, 30, 50,60,70,80,90,100],
        autowidth : true,
        pager : "#rstdeMng_pgRstdeManageList",
        rownumbers : true,
        rownumWidth : 10,
        emptyrecords : "",
        caption : "",
        loadui : "enable",
        viewrecords: true,
        multiselect: false,
	   	onSelectRow : function(rowid){
	   		 HDY_NM=$("#rstdeMng_tblRstdeManageList").getCell(rowid, "HDY_NM");
	   		STRT_DT=$("#rstdeMng_tblRstdeManageList").getCell(rowid, "HD_STRT_DT");
	   		 HDY_ID=$("#rstdeMng_tblRstdeManageList").getCell(rowid, "HDY_ID");
	   		 HD_USE_YN=$("#rstdeMng_tblRstdeManageList").getCell(rowid, "HD_USE_YN");
	   		 var moveCalendr=$("#rstdeMng_tblRstdeManageList").getCell(rowid, "HD_USE_YN");
				 $("#rstdeMng_HldyNm").val(HDY_NM);
				 $("#rstdeMng_HldyUsr").val(STRT_DT);
	           $("#rstdeMng_btnlbSave").hide();
	           $("#rstdeMng_btnlbUpdate").show();
	           $("#rstdeMng_btnlbDelete").show();
	       	   $("#rstdeMng_calendar").fullCalendar('gotoDate',STRT_DT);
	       	   $("#rstdeMng_calendar").fullCalendar("refetchEvents");
	   	},
		gridComplete : function(){},
        error : function(data, status, err)
        {
        	networkErrorHandler(data, status, err);
        }
	}).jqGrid("navGrid", "#rstdeMng_pgRstdeManageList", {edit : false, add : false, del : false, search : false});
}

//sms 리스트
function RstdeManaeSmsTalk(){
      $.ajax({
         type : "post",
         dataType: "json",
         async : true,
         url : getContextPath() + "/ajax/management/smsTalkList.do",
         data : "pJson=" + getJsonStrsmsInit(),
         success : function(data){
            $.each(data, function(key, state){	
               if(state.GUBUN=="90034"){
                    $("#rstdeMng_schTimeSt").val(state.C_REMARKS);
                    $("#rstdeMng_schTimeEn").val(state.J_TIME);
                    $("#rstdeMng_hdschTimeSt").val(state.C_REMARKS);
                    $("#rstdeMng_hdschTimeEn").val(state.J_TIME);
                    if(state.CD=="100000")
                    $("input[name=wd_Gb_Cd][value=" + state.PROLOGUE + "]").prop("checked", true); //휴일
                    if(state.CD=="200000")
                    $("input[name=hd_Gb_Cd][value=" + state.PROLOGUE + "]").prop("checked", true);  //평일
               }if(state.GUBUN=="90035"){
                  $("#rstdeMng_rm_prologue").val(state.PROLOGUE);
                  $("#rstdeMng_rm_remarks").val(state.C_REMARKS);
               }
            });
         },
         error : function(data, status, err) {
            networkErrorHandler(data, status, err);
         }
      });
}

//문자상담 추가
function ClickSave_smsTalk(){
	if(!confirm("등록하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/statistics/insertsmsTalk.do",
		data : "pJson=" + getJsonStrInsertsmsCodeRm("90035","100000"),
		success : function(data){},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
		
	});

	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/myinfo/insertSchedule.do",
		data : "pJson=" + getJsonStrInsertsmsCode("90034","100000",$("input[name=wd_Gb_Cd]:checked").val(),$("#rstdeMng_schTimeSt").val(),$("#rstdeMng_schTimeEn").val()),
		success : function(data){},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
		
	});
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/myinfo/insertSchedule.do",
		data : "pJson=" + getJsonStrInsertsmsCode("90034","200000", $("input[name=hd_Gb_Cd]:checked").val(),$("#rstdeMng_hdschTimeSt").val(),$("#rstdeMng_hdschTimeEn").val()),
		success : function(data){},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
	});
	alert("저장되었습니다.");
}

//기간 셀렉트 박스별 상세 검색
function changeTerm(optDayYear,rstdeMng_termDetail,optDayMonth)
{
      var d = new Date();
   
      var currentYear = d.getFullYear(); 
      var optYear =  "";
      var currentMonth = d.getMonth() + 1;
      optYear +=  "<select id = "+optDayYear+" style ='border: currentColor; border-image: none; width: 100px; margin-top: 4px; margin-bottom: 4px; margin-left: 5px;'>";
      
      for(var i = 2011; i <= (currentYear+5); i++)
      {
         optYear +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
      }
      optYear +=  "</select>";
      
      var optMonth = "";
      optMonth += "<select id = "+optDayMonth+" style ='border: currentColor; border-image: none; width: 100px; margin-top: 4px; margin-bottom: 4px; margin-left: 5px;'>";
      for(var i = 1; i <= 12; i++)
      {
         optMonth +=  "<option value = '" + i + "'>" + i + "월"+"</option>";
      }
      optMonth += "</select>";
      
      $("#"+rstdeMng_termDetail).empty();
      $("#"+rstdeMng_termDetail).append(optYear);
      
      if(optDayYear!="saveDayYear"){
      $("#"+optDayYear).val(currentYear);
      }else{
    	  $("#"+optDayYear).val(currentYear+1);  
      }
      
      if(optDayMonth){
    	  $("#"+rstdeMng_termDetail).append(optMonth);
    	  $("#"+optDayMonth).val(currentMonth);
      }else{
    	  $("#"+optDayMonth).empty();
    	  $("#"+optDayMonth).css("display","none");
    	  $("#"+optDayYear).css({'width':'90%', 'height': '14px' });
      }
}

//달력초기화 버튼 눌렀을때
function click_CalInfo(){
	 ScheduleListCount(getDate().substring(0,4),getDate().substring(0,4));
	
	fullCalendar();
	click_hdInit();
	
	$("button.fc-today-button").click();//달력 초기화
	$("#rstdeMng_calendar").fullCalendar("refetchEvents");
	 $("#yearId").html(getDate().substr(0,4));
	 $("#optDayYear").val(getDate().substr(0,4));
     $("#optDayMonth").val(getDate().substr(6,1));
     
     $("#copyDayYear").val($("#optDayYear").val());
    $("#saveDayYear").val(parseInt($("#optDayYear").val())+1);
    
}

//일정등록초기화
function click_hdInit(){
    
	$("#rstdeMng_btnlbSave").show();
    $("#rstdeMng_btnlbUpdate").hide();
    $("#rstdeMng_btnlbDelete").hide();
    $("#rstdeMng_HldyNm").val("");
    $("#rstdeMng_HldyUsr").val(getDate());

    $("#copyDayYear").val(getDate().substr(0,4));
    $("#saveDayYear").val(parseInt(getDate().substr(0,4))+1);
}


//일정 삭제
function click_hdSave(){
	if(!confirm("등록하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/statistics/insertHoliDay.do",
		data : "pJson=" + getJsonStrInseHoliDay(),
		success : function(data){
			alert("등록 되었습니다.");
			$("#rstdeMng_HldyNm").val("");
			$("#rstdeMng_btnlbSave").show();
		    $("#rstdeMng_btnlbUpdate").hide();
		    $("#rstdeMng_btnlbDelete").hide();
		    click_CalInfo();
		    var searchDate = $("#rstdeMng_calendar").fullCalendar("getDate");
		    var date = new Date(searchDate);
			var gomoveMonth=date.yyyymmdd();
			$("#rstdeMng_HldyUsr").val(gomoveMonth);
			$("#rstdeMng_calendar").fullCalendar("refetchEvents");
			 $("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList(gomoveMonth.replace(/-/g,""))},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
				$("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
		
	});
   
	
}
//일정 수정
function click_hdUpdate(){
	if(!confirm("수정하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/statistics/updateHoliDay.do",
		data : "pJson=" + getJsonStrUpdateHoliDay(),
		success : function(data){
			alert("수정 되었습니다.");
			$("#rstdeMng_HldyNm").val("");
			$("#rstdeMng_btnlbSave").show();
		    $("#rstdeMng_btnlbUpdate").hide();
		    $("#rstdeMng_btnlbDelete").hide();
		    click_CalInfo();
		    var searchDate = $("#rstdeMng_calendar").fullCalendar("getDate");
		    var date = new Date(searchDate);
			var gomoveMonth=date.yyyymmdd();
			$("#rstdeMng_HldyUsr").val(gomoveMonth);
			$("#rstdeMng_calendar").fullCalendar("refetchEvents");
			 $("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList(gomoveMonth.replace(/-/g,""))},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
				$("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
			
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
		
	});
}

//일정삭제
function click_hdDelete(){
	if(!confirm("삭제하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/statistics/deleteHoliDay.do",
		data : "pJson=" + getJsonStrDeleteHoliDay(),
		success : function(data){
			alert("삭제 되었습니다.");
			$("#rstdeMng_HldyNm").val("");
			$("#rstdeMng_btnlbSave").show();
		    $("#rstdeMng_btnlbUpdate").hide();
		    $("#rstdeMng_btnlbDelete").hide();
		    click_CalInfo();
		    var searchDate = $("#rstdeMng_calendar").fullCalendar("getDate");
		    var date = new Date(searchDate);
			var gomoveMonth=date.yyyymmdd();
			$("#rstdeMng_HldyUsr").val(gomoveMonth);
			$("#rstdeMng_calendar").fullCalendar("refetchEvents");
			 $("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList(gomoveMonth.replace(/-/g,""))},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
				$("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
		
	});
}

function fullCalendar(){
	$("#rstdeMng_calendar").fullCalendar({
		viewRender:function(view,element){
	        var moment = $('#rstdeMng_calendar').fullCalendar('getDate');
	        var prev = moment.clone().add(-1,'month');
	        $("button.fc-prev-button").html( prev.format('YYYY년 MM월'));
	        var next = moment.clone().add(1,'month');
	        $("button.fc-next-button").html( next.format('YYYY년 MM월'));
	     },
		
		header: {
			left: 'prev',
			center: 'title',
			right: 'next,today'
		},
		defaultDate: getDate(),
		locale: "ko",
		width: "100%",
		height: 580,
		editable: false,
		navLinks: false, 
		eventLimit: true, 
		eventRender: function(event, element ,view) {
	         $('#rstdeMng_calendar').find("[data-date='" + event.start._i + "']").find('.fc-day-number').css({color:'red'});
	     }, 
		events: function(start, end, timezone, callback) {  
			$.ajax({
				type : "post",
				url :  "/ajax/counsel/getUsrList.do",
				data : "pJson=" + getJsonScheduleList(),
				dataType: "json",
				 
				success : function(data){
					var events =[];
					$(data).each(function(){
						  events.push({
								id : $(this).attr("SCHD_ID"),
	                            title: $(this).attr("TITLE"),
	                            start: $(this).attr("STRT_DTTM"),
	                            end: $(this).attr("END_DTTM"),
	                            allDay:  $(this).attr("ALL_DAY")
	                        });
					});
					callback(events);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
	});
}

//왼쪽버튼을 눌ㄹㅆ을때
function click_prev(){
	var moment = $('#rstdeMng_calendar').fullCalendar('getDate');

    var prev = moment.clone().add(-1,'month');
    $("button.fc-prev-button").html( prev.format('YYYY년 MM월'));
    $("#rstdeMng_HldyNm").val("");
	var searchDate = $("#rstdeMng_calendar").fullCalendar("getDate");
	var date = new Date(searchDate);
	var gomoveMonth=date.yyyymmdd();
	
	$("#rstdeMng_HldyUsr").val(gomoveMonth.substring(0,7)+"-"+getDate().substr(8,10));
    $("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList(gomoveMonth.replace(/-/g,""))},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
	$("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
	
	$("#yearId").html(gomoveMonth.substring(0,4));
	ScheduleListCount(gomoveMonth.substring(0,4),gomoveMonth.substring(0,4));
	
  }
//오른쪽 버튼을 누렀ㅇ때
function click_next(){
	 $("#rstdeMng_HldyNm").val("");
	  var moment = $('#rstdeMng_calendar').fullCalendar('getDate');
      var next = moment.clone().add(1,'month');
      $("button.fc-next-button").html( next.format('YYYY년 MM월'));
	var searchDate = $("#rstdeMng_calendar").fullCalendar("getDate");
	var date = new Date(searchDate);
	var gomoveMonth=date.yyyymmdd();
	$("#rstdeMng_HldyUsr").val(gomoveMonth.substring(0,7)+"-"+getDate().substr(8,10));
	$("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList(gomoveMonth.replace(/-/g,""))},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
  	$("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
	
  	$("#yearId").html(gomoveMonth.substring(0,4));
	ScheduleListCount(gomoveMonth.substring(0,4),gomoveMonth.substring(0,4));
}

//받은 날짜값을 YYYY-MM-DD 형태로 출력하기위한 함수.
Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
}

function click_RmSearch(){
	ScheduleListCount($("#optDayYear").val(),$("#optDayYear").val());
	 $("#rstdeMng_HldyNm").val("");
	var searchDate = $("#rstdeMng_calendar").fullCalendar("getDate");
	var date = new Date(searchDate);
	moveMonth=date.yyyymmdd();
	$("#rstdeMng_calendar").fullCalendar("refetchEvents");
	var moveMonth=($("#optDayMonth").val()>9)?$("#optDayYear").val()+"-"+$("#optDayMonth").val()+"-"+getDate().substr(8,10):$("#optDayYear").val()+"-"+"0"+$("#optDayMonth").val()+"-"+getDate().substr(8,10)
	$("#rstdeMng_calendar").fullCalendar( 'gotoDate',moveMonth);
    $("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList(moveMonth.replace(/-/g,""))},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
	$("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
	var moveMonth=($("#optDayMonth").val()>9)?$("#optDayYear").val()+"-"+$("#optDayMonth").val()+"-"+getDate().substr(8,10):$("#optDayYear").val()+"-"+"0"+$("#optDayMonth").val()+"-"+getDate().substr(8,10)
	$("#rstdeMng_HldyUsr").val(moveMonth);
	$("#yearId").html($("#optDayYear").val());
}

//복사하는 달력 저장하기  함수
function copySaveCalendar(){
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/statistics/getJsonScheduleCopyList.do",
	    data : "pJson=" + getJsonScheduleCopyList($("#copyDayYear").val()),
	    success : function(data)
	    {
	    	var jr=data;
	    	 if($("#copyDayYear").val()==$("#saveDayYear").val()){
	    			alert("같은 년도의 데이터는 복사할수 없습니다.");
	    			return;
	    		}else if($("#copyDayYear").val()>$("#saveDayYear").val()){
	    			alert("이전년도보다 작으면 복사 할수 없습니다.");
	    			return;
	    		} if(confirm("등록하시겠습니까?")){
	    			$.ajax({
	    			    type : "post",
	    			    dataType: "json",
	    			    async : false,
	    			    url : getContextPath() + "/ajax/statistics/getJsonScheduleCopyList.do",
	    			    data : "pJson=" + getJsonScheduleCopyList($("#saveDayYear").val()),
	    			    success : function(data)
	    			    {
	    			    	if(data!=""){
	    			    		alert($("#saveDayYear").val()+" 년도는 이미 생생 되어있습니다");
	    			    		return false;
	    			    	}else{
	    			    		  $.each(jr, function(key, state)
	    			     			     {
	    			     			    	 title=state.TITLE;
	    			     			    	 c_strt_day=$("#saveDayYear").val()+(state.STRT_DTTM.replace(/-/g,"").substring(4,8));
	    			     			    	 c_end_day=$("#saveDayYear").val()+(state.END_DTTM.replace(/-/g,"").substring(4,8));
	    			    			 
	    			     			     $.ajax({
	    			     			    			type : "post",
	    			     			    			dataType : "json",
	    			     			    			async : true,
	    			     			    			url : getContextPath() + "/ajax/statistics/insertHoliDay.do",
	    			     			    			data : "pJson=" + getJsonStrCopySave(title,c_strt_day,c_end_day),
	    			     			    			success : function(data){},
	    			     			    			error : function(data, status, err){
	    			     			    				networkErrorHandler(data, status, err);
	    			     			    			}
	    			     			    			
	    			     			    		});
	    			     			    });	 
	    			     			     	alert("저장되었습니다.");
	    			     					var moveMonth=($("#optDayMonth").val()>9)?$("#saveDayYear").val()+"-"+$("#optDayMonth").val()+"-"+getDate().substr(8,10):$("#saveDayYear").val()+"-"+"0"+$("#optDayMonth").val()+"-"+getDate().substr(8,10);
	    			     					$("#rstdeMng_tblRstdeManageList").jqGrid("setGridParam", { postData :  { pJson : getJsonStrRstdeList(moveMonth.replace(/-/g,""))},page : 1,sortname : "HD_STRT_DT",sortorder : "asc"});
	    			     					$("#rstdeMng_tblRstdeManageList").trigger("reloadGrid");
	    			     					$("#rstdeMng_calendar").fullCalendar( 'gotoDate',moveMonth);
	    			    	}
	    			    },
	    			    error : function(data, status, err) 
	    			    {
	    			    	alert("상담사 리스트를 불러오지 못합니다\n담당자에게 문의해주세요.");
	    			    }
	    			   });
	    		} 
	    },
	    error : function(data, status, err) 
	    {
	    	alert("상담사 리스트를 불러오지 못합니다\n담당자에게 문의해주세요.");
	    }
	   });
	
}
//스케쥴 카운트 함수
function ScheduleListCount(strt,end){
	$("#s_date").empty();
	  $.ajax({
			type : "post",
			dataType : "json",
			async : true,
			url : getContextPath() + "/ajax/statistics/ScheduleListCount.do",
			data : "pJson=" + getJsonScheduleListCount(strt,end),
			success : function(data){
				$("#s_date").text(data[0].S_COUNT);
				$("#s_date").css({'color':'red','font-weight':'bold','font-size':'14pt'});
			},
			error : function(data, status, err){
				alert("에러 입니다.");
			}
			
		});
}

//버튼 관리하는 함수
function buttonController(){
 //달력정보 복사하기
  $("#rstdeMng_btnCopty").bind("click",copySaveCalendar);
	
$("button.fc-today-button").css("display","none");//초기화 버튼 투명화
  //문자상담설정 초기화 버튼
  $("#rstdeMng_btnstInit").bind("click",RstdeManaeSmsTalk);
 //문자상담설정 저장 버튼
  $("#rstdeMng_btnStSave").bind("click",ClickSave_smsTalk);
 //달력초기화
  $("#rstdeMng_btnRmInit").bind("click",click_CalInfo);
  //일정 초기화
  $("#rstdeMng_btnlbInit").bind("click",click_hdInit);
  //일저저장
  $("#rstdeMng_btnlbSave").bind("click",click_hdSave);
  //일저수정
  $("#rstdeMng_btnlbUpdate").bind("click",click_hdUpdate);
  //일정삭제
  $("#rstdeMng_btnlbDelete").bind("click",click_hdDelete);
  //이전달ㄴ
  $("button.fc-prev-button").bind("click",click_prev);
  //일정삭제
  $("button.fc-next-button").bind("click",click_next);
  //조회
  $("#rstdeMng_btnRmSearch").bind("click",click_RmSearch);
}

$(document).ready(function(){
   //화면셋팅 select
   changeTerm("optDayYear","rstdeMng_termDetail","optDayMonth");
   
   changeTerm("copyDayYear","rstdeMng_copyDetail","");
   
   changeTerm("saveDayYear","rstdeMng_saveDetail","");
   
   //초기화할때 불러오는 기본 이벤트
   initEvent();
   //하단 sms셋팅
   RstdeManaeSmsTalk();
   //오른쪽 jq그리드 셋팅
   jqgrid_Rstde();
	//달력
   fullCalendar();
   //버튼관리함수
   buttonController();
   
   $("#yearId").html(getDate().substring(0,4));
   ScheduleListCount(getDate().substring(0,4),getDate().substring(0,4));
});