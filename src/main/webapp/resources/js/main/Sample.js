var msg = "상담사의 안내에 따라 영상상담 링크를 클릭해 주세요.\n";
var callback = "0617493114";

var videoImgArr = []; 

var imgCnt = 0;

function initdivRCTabSample() {
	$("#videoImageList").empty();
	
	$('#video_btnSendSms').css("cursor", "no-drop");
	$('#video_btnConnectOver').css("cursor", "no-drop");
	$('#video_bntRetrySendUrl').css("cursor", "no-drop");

	$('#video_btnSendSms').attr('onclick','#');
	$('#video_btnConnectOver').attr('onclick','#');
	$('#video_bntRetrySendUrl').attr('onclick','#');
	
	videoSetting();
	
	if(window.sessionStorage.getItem("USR_ID")){
		$("#video_telNo").click(function (e){
			var result = prompt("(관리자용)휴대전호번호를 입력하세요.");
			
			if(result == null){
				return;
			}else{
				$("#video_telNo").val(result);
			}
			
		});
	}
}

// 왼쪽 이미지 체크
function saveVideoInfo(){
	var tctk_id = $("#tfMainTicketId").val(); // 티켓ID
	
	var seqArr = [];
	
	$(".videoImg").each(function (i) {
	   seqArr.push($(".videoImg").eq(i).attr("value"));
	});
	
	console.log(seqArr); // [1,3]
	
	var roomId = $("#tfVideoImageRoomUuid").val();
	
	var pList = [];
	
	// 이미지 파일 전체 조회
	$.ajax({
		type : "post",
		async : false,
		datatype : "json",
		url : getContextPath() + "/ajax/main/selectVideoInfo.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "dmlkZW9fY291bnNlbC5zZWxlY3RJbWFnZUxpc3RBbGw=", { "roomUuid" : roomId }),
		success: function(data) {
			data = JSON.parse(data);
			console.log(data);
			
			$(data).each(function (i) {
				pList.push({
					"qt" : "aW5zZXJ0",
					"mi" : "Y2gwMTIuaW5zZXJ0VmlkZW9JbmZv",
					"map":	{
						"room_uuid" : data[i].ROOM_UUID,
						"seq" : data[i].SEQ_ID,
						"tckt_id" : tctk_id,
						"room_name" : data[i].ROOM_NAME,
						"image_name" : data[i].IMAGE_NAME,
						"image_dir" : data[i].IMA_DIR,
						"insert_by" : data[i].INSERT_BY,
						"insert_dt" : data[i].INSERT_DT,
						"insert_tm" : data[i].INSERT_TM,
				}});
			});
			
			// INSERT
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/main/mergeVideoInfo.do",
				data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList),
				success : function(data) {
					
					// UPDATE
					$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/main/updateVideoUseYn.do",
						data : "pJson=" + getJsonStr("dXBkYXRl", "Y2gwMTIudXBkYXRlVmlkZW9Vc2VZbg==", {
							"room_uuid" : roomId,
							"seq" : seqArr
						}),
						success : function(data) {
							
						},
						error : function(data, status, err) {
							networkErrorHandler(data, status, err);
						}
					});
					
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});
			
			
		},error : function(data, status, err) {
			alert("selectVideoInfo ERROR");
		}
	});

}

function imageClick(e) {
    var imgId = $(e).attr('id');
    
    var clickYn = $(e).attr('value');
    
    var str = "";
    var divId = "div_"+imgId;
    var imgSeq = imgId.charAt(imgId.length-1); // imgfile Seq
    
    console.log("id = "+ imgId + ", imgSeq = " +imgSeq + ", clickYn = " + clickYn); // id = videoImg_1, imgSeq = 1 , clickYn = N
    
	if(clickYn == 'Y'){
		fnVideoDelete(imgSeq);
		return;
	}
	
	$("#"+imgId).attr('value','Y');
    imgCnt ++;
    
    $(e).css("border","2px solid #d41a1a");
    
    // seq 기준  - seq
    str += "<div id='div_videoImg_"+imgSeq+"' style='display:inline;'>";
    str += "<span>사진"+imgCnt+"</span>";
    str += "<input class='videoImg' type='hidden' value='"+imgSeq+"'>";
    str += '<img src="/resources/images/cont_delete.png" alt="삭제" style="cursor:pointer; padding-right:10px;" onclick="fnVideoDelete('+"'"+imgSeq+"'"+')" />';
    str += "</div>";
    
    $("#tfVideoImageList").append(str);
}

function videoSetting(){
	$("#tfVideoImageRoomUuid").val("");
	
	$('#video_btnSendSms').css("cursor", "pointer");
	$('#video_btnSendSms').attr('onclick', 'fnVideoBtnSendSms();');
	
	let container = document.getElementById("container");
	let company = "SCCC"; // 회사 코드 test: ICS / 운영 : SCCC
	let userid = window.sessionStorage.getItem("USR_ID"); // 로그인 아이디 test : agent001

	generate(container, company, userid);
	
	$("#tfVideoImageRoomUuid").val(getUuid());
}

// 왼쪽 이미지 Div 삭제 함수
function fnVideoDelete(seq){
	//seq 기준
	$("#div_videoImg_"+seq).remove();
	imgCnt --;
	$("#videoImg_"+seq).attr("value","N");
	$("#videoImg_"+seq).css("border","");
}

// 종료버튼 클릭 이벤트 - 새로운 connection 생성
function fnVideoBtnConnectOver(){
	videoImgArr = [];
	$("#tfVideoImageRoomUuid").val("");
	
	$("#videoImageList").empty();
	
	$('#container').empty();
	
	$('#video_telNo').val('');
	
	$('#video_btnSendSms').css("cursor", "pointer");
	$('#video_btnConnectOver').css("cursor", "no-drop");
	$('#video_bntRetrySendUrl').css("cursor", "no-drop");
	
	$('#video_btnSendSms').attr('onclick', 'fnVideoBtnSendSms();');
	$('#video_btnConnectOver').attr('onclick','#');
	$('#video_bntRetrySendUrl').attr('onclick','#');
	
	let container = document.getElementById("container");
	let company = "SCCC"; // 회사 코드 test: ICS / 운영 : SCCC
	let userid = window.sessionStorage.getItem("USR_ID"); // 로그인 아이디
	
	connectOver(container, company, userid);
	
	$("#tfVideoImageRoomUuid").val(getUuid());
}

// 캡쳐한 이미지 가져오기 버튼 클릭 이벤트
function fnVideoBtnRetrySendUrl(){
	videoImgArr = [];
	
	var roomId = getUuid();
	
	if(roomId == ''){
		alert('영상상담 종료가 제대로 되지 않았습니다. 종료 버튼을 눌러주세요.');
		return false;
	}
	
	$("#videoImageList").empty();
	
	$.ajax({
		type : "post",
		async : false,
		datatype : "json",
		url : getContextPath() + "/ajax/main/videoConnectTest.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "dmlkZW9fY291bnNlbC5ub3dJbWFnZUxpc3Q=", { "roomUuid" : roomId }),
		success: function(data) {
			videoImgArr = JSON.parse(data);
			console.log(videoImgArr);
			
			var str = "";
			var imgNo = "";
			
			if(videoImgArr.length > 0){
				for(var i=0; i<videoImgArr.length; i++){
					str += "<img onClick='imageClick(this);' src='"+videoImgArr[i].IMA_URL+"' id='videoImg_"+videoImgArr[i].SEQ_ID+"' value='N'/>";
				}
			}else{
				str += "<div style='text-align: center; padding-top: 10%;'>";
				str += "캡쳐된 이미지 파일이 없습니다. 캡쳐 후 클릭해주세요.";
				str += "</div>"; 
			}
			
			$("#videoImageList").append(str);
		},error : function(data, status, err) {								
			alert("영상상담 이미지 데이터를 불러오지 못했습니다.\n다시한번 버튼을 클릭해주세요.");
		}
	});
}

// SMS 보내기
function fnVideoBtnSendSms(){
	if($("#video_btnConnectOver").attr('onclick') != '#'){
   		alert("기존 상담의 연결을 종료해 주세요.");
		return;
	}

	var strTelNo = $('#video_telNo').val();
	if ( strTelNo == "" || strTelNo == "undefined" ){
		alert("핸드폰 번호를 입력해 주세요.");
		return;
   	} else {
		$('#video_btnSendSms').css("cursor", "no-drop");
		$('#video_btnConnectOver').css("cursor", "pointer");
		$('#video_bntRetrySendUrl').css("cursor", "pointer");

		$('#video_btnSendSms').attr('onclick','#');
		$('#video_btnConnectOver').attr('onclick','fnVideoBtnConnectOver();');
		$('#video_bntRetrySendUrl').attr('onclick','fnVideoBtnRetrySendUrl();');
		
		// MMS CONTENTS SEQ
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/civilservice/getMmsSeq.do",
			data : "pJson=" + getJsonStr("c2VsZWN0T25l","c21zLm5leHR2YWw=", {
				
			}),
			success : function(data){
				var cont_seq = data.SMS_SEQ;
				
				// INSERT MSG_DATA
				$.ajax({
					type : "post",
					dataType: "json",
					async : false,
					url : getContextPath() + "/ajax/civilservice/getSendSms.do",
					data : "pJson=" +  getJsonStrSendSms(cont_seq),
					success : function(data){
						
						// INSERT MMS_CONTENT
						$.ajax({
							type : "post",
							dataType: "json",
							async : false,
							url : getContextPath() + "/ajax/civilservice/getMmsCont.do",
							data : "pJson=" +  getJsonStrSendMmsCont(cont_seq),
							success : function(data){
								alert("SMS로 URL이 전송되었습니다.");
							},
							error : function(data, status, err) {								
								alert("영상상담 메세지 발송 오류 : MMS_CONTENT ERROR !!");
							}
						});	// MMS_CONTENT ajax End
						
					},
					error : function(data, status, err) {								
						alert("영상상담 메세지 발송 오류 : MSG_DATA ERROR !!");
					}
				});	// MSG_DATA ajax End
			
			},error : function(data, status, err) {
				alert("영상상담 메세지 발송 오류 : MMS_SEQ ERROR !!");
			}
		}); //MMS AJAX 
	
   	}
	
}

function getJsonStrSendSms(cont_seq){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c21zLnNlbmRTbXM=",
		"map" : {
			"key" : "value",
			"usr_id" : window.sessionStorage.getItem("USR_ID"),
			"usr_nm" : window.sessionStorage.getItem("USR_NM"),
			"callback" : callback.replace(/-/gi, ""),
			"dest_info" : $("#video_telNo").val().trim().replace(/-/gi, ""),
			"smsCheck" : 6,
			"smsType" : "LMS",
			"cont_seq" : cont_seq,
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrSendMmsCont(cont_seq){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c21zLnNlbmRTbXNDb250ZW50",
		"map" : {
			"key" : "value",
			"cont_seq" : cont_seq,
			"file_cnt" : 1,
			"subject" : "",
			"content" : msg + getTextUrl()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}