 
//페이지 초기화
$(document).ready(function()
{
//AnsUtmX = 126499329
//AnsUtmY =  33487262
	var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
		var options = { //지도를 생성할 때 필요한 기본 옵션
//				center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
				center: new daum.maps.LatLng(33.487262, 126.499329), //지도의 중심좌표.
				level: 3 //지도의 레벨(확대, 축소 정도)
	};

	var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

	// 마커가 표시될 위치입니다 
	var markerPosition  = new daum.maps.LatLng(33.487262, 126.499329); 
	
	// 마커를 생성합니다
	var marker = new daum.maps.Marker({
	    position: markerPosition
	});
	
	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);

});

 
function custCountNameClick(){ 
 var tempQueue = $("#hidTeamQueue",parent.document).val();
 if(tempQueue != undefined){
	// alert(tempQueue);
 }
	//alert(" temp1: "+tempQueue);
	
	if(g_iFrameJobStart=="0"){
		$("#divUnderCallbackCnt", parent.document).css("color","red");
		//timeOutJobStart("stop");
		g_iFrameJobStart="1"; // 대기고객 stop

	}else{
//		g_iFrameJobStart="0"; // 리로드시 변경됨
		location.href = location.href;
	}
	

}

function mainTopCtiStatusClick(){
	window.parent.fnGetWaitCount("TEST");
}

function labCallTypeStatusClick(){
	 
}
