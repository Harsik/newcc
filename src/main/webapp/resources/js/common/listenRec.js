 
function listenRecPopup(dn, agentId, agentNm, recCallId)
{
	//청취 플레이어  키 (녹취날짜 + con_id)
	var REC_URL="http://172.17.0.17:18088/provider/key/play";
	var recParam=recCallId.split("|"); // '20210901|17582826|2016'
	var connectDt = recParam[0].replace(/[-, :, \s]/g,"");
	openPopup(REC_URL+"?startDate="+connectDt+"&endDate="+connectDt+"&callKey="+recParam[1]+"&SaveFlag=0","_player","556","590","yes","center");
}

// 21.09.07 녹취 연결
function listenRecLogin()
{
//	var agentId = window.sessionStorage.getItem("USR_ID");
	var ctiLgnId = window.sessionStorage.getItem("CTI_LGN_ID");
	
	var num = $("#EXT").val();
	
	$.ajax({
		type : "post",
		async : false,
		url : "http://172.17.0.17:18080/callServer/logon/alcatel",
		data : "station="+num+"&agent_id="+ctiLgnId,
		error: function() {
			alert('error');
		}
	});
	
	$.ajax({
		type : "post",
		async : false,
		url : "http://172.17.0.18:18080/callServer/logon/alcatel",
		data : "station="+num+"&agent_id="+ctiLgnId,
		error: function() {
			alert('error');
		}
	});
}
 
// open popup
var openPopup = function (mypage,myname,w,h,scroll,pos){
	var win=null;
	if(pos=='random'){LeftPosition=(screen.width)?Math.floor(Math.random()*(screen.width-w)):100;TopPosition=(screen.height)?Math.floor(Math.random()*((screen.height-h)-75)):100;}
	if(pos=='center'){LeftPosition=(screen.width)?(screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h-100)/2:100;}
	else if((pos!='center' && pos!='random') || pos==null){LeftPosition=0;TopPosition=0}
	
	settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
	win=window.open(mypage,myname,settings);
	
	//if(win==null){ alert("팝업 차단기능을 해제한 후 다시 시도해 주십시오."); }
	//if(win.focus){win.focus();}
};