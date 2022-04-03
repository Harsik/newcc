<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- Load icomsys-video.js, 파일 버전 확인 -->
<script type="text/javascript" src="<c:url value='/resources/js/lib/icomsys-video-1.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.zoom.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/main/Sample.js'/>" ></script>

<style>
	#videoImageList img {width: 200px; height: 170px; margin: 10px; }
	.btn_wrap .button {color: #fff;}

</style>
<title>영상상담</title>
</head>
<body>
	
	<div class="btn_wrap fl">
		<input type="text" placeholder="전화번호" id="video_telNo" style="margin-right: 10px;" readonly>
		<a onclick="#" class="button" id="video_btnSendSms">보내기</a>
		<a onclick="#" class="button" id="video_btnConnectOver">종료</a>
		<a onclick="#" class="button" id="video_bntRetrySendUrl">캡쳐한 이미지 가져오기</a>
	</div>
	
	<div id="container"></div>
	
	<div id="videoImageList" style="overflow-x: auto; height: 200px; white-space: nowrap;"></div>
</body>

</html>

