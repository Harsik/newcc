<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.net.URLDecoder"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="UTF-8">
<title>온누리콜센터</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=172c3b9648320ecb5fd29ce1d5b2608b&libraries=services,clusterer,drawing"></script>
<style type="text/css">
	html, body {height: 100%;}
	#map {width: 100%; height: 100%;}
	#markerInfo {position:absolute; width: 500px; height: 82px; background-color: white; top:2%; right:1% ;z-index: 999; border: 1px gray solid;}
	.clientMarkerImg {width: 24px; height: 24px;}
	.poiMarkerImg {width: 21px; height: 25px;}
	.text_center {vertical-align: middle;}
	.wrap {position: absolute;left: 0;bottom: 30px; width: auto; height:auto; text-align: left; margin-left: -50%;}
	.wrap .info {width: auto;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;margin-left:-55%;margin-right: 45%;text-align: center;}
	.wrap .caption {width: auto;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;margin-left:-55%;margin-right: 45%;text-align: center;}
	.info:after {content: '';position: absolute;margin-left: -12px;left: 2px;top:90%;width: 22px;height: 12px;background: url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
	.caption:after {content: '';position: absolute;margin-left: -14px;left: 4px;top:96%;width: 22px;height: 12px;background: url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
	.ellipsis {padding-left: 5px; padding-right: 5px;}
	.caption > .title > label {padding:5px 0px 0px 5px;}
	
	.customoverlay {position:relative;bottom:30px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;}
  .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
  .customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
  .customoverlay {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
  .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
  .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}

/* 다운로드 select box  */

	div#select_box {position:relative;bottom:30px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;}
  .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
  .customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
  .customoverlay {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
  .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
  .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}


	/* 다운로드 select box  */
			div#select_box {
			    position: relative;
			    width: 310px;
			    height: 40px;
			    background: url(select_arrow.png) 180px center no-repeat; /* 화살표 이미지 */
			    border: 1px solid #E9DDDD;
			}
			div#select_box label {
			    position: absolute;
			    font-size: 17px;
			    color: #000000;
			    top: 13px;
			    left: 12px;
			    letter-spacing: 1px;
			}
			div#select_box select#item {
			    width: 100%;
			    height: 40px;
			    min-height: 40px;
			    line-height: 40px;
			    padding: 0 10px;
			    opacity: 0;
			    filter: alpha(opacity=0); /* IE 8 */
			}
			
</style>
<script type="text/javascript">
	
	var map;
	var arrMarker;
	var arrOverlay;
	var arrTitle;
	var num;
	var count;
	var xx; 
	var yy; 
	var strTemp; 

$(document).ready(function()
{
//	window.onload = function() {
		 xx = $("#tflocX").val()==""?"126.499262":$("#tflocX").val();
		 yy = $("#tflocY").val()==""?"33.486293":$("#tflocY").val();
		 strTemp = $("#tfstrTemp").val()==""?"고객위치":$("#tfstrTemp").val();
				 
		initDaumMap(xx, yy);

		getInfomation();
		
		lastMarkCustomOverlay();
//	}

   var select = $("select#item");
    
    select.change(function(){
     	var selUrl=this.value;
       
    	var select_name = $(this).children("option:selected").text();
         	$(this).siblings("label").text( $("#select_box option:eq(0)").text());
       
        if(selUrl=="#"){
        	return;
        } 
        
         goDownload(selUrl);
        
    });
    
});

function goDownload(pUrl) { 
	var target ="about:blank";
	 var openNewWindow = window.open(target,"");
	openNewWindow.location.href = pUrl;
}
 

	// 다음맵 초기화
	function initDaumMap(x, y) {
		var container = document.getElementById("map"); 					//지도를 담을 영역의 DOM 레퍼런스
		
		var zoom = 3;
		if (map != null) {
			zoom = map.getLevel();
		}
		var options = { 												 	//지도를 생성할 때 필요한 기본 옵션
				center: new daum.maps.LatLng(y, x), 	//지도의 중심좌표.
				level: zoom //지도의 레벨(확대, 축소 정도)
			};
		map = new daum.maps.Map(container, options); 						//지도 생성 및 객체 리턴
		
		daum.maps.event.addListener(map, 'dragend', function() {
			if (arrMarker != undefined) {
				arrMarker = new Array(0);
				arrOverlay = new Array(0);
				arrTitle = new Array(0);
				num = undefined;
				count = 0;
				
				// 지도의 중심 좌표를 반환한다.
				var x = map.getCenter().ib;	// 126
				var y = map.getCenter().jb; // 33
				initDaumMap(x, y);
				createClientMarker(getClientLocation().x, getClientLocation().y);
				getPOIs(x, y);
				var moveLatLon = new daum.maps.LatLng(y, x);
				createCircle(x, y);
				// 지도 중심을 부드럽게 이동시킵니다
				map.panTo(moveLatLon);
				moveScene();
				lastMarkCustomOverlay();
			}
		});
		
		daum.maps.event.addListener(map, 'zoom_changed', function() {
			if (arrMarker != undefined) {
				var length = arrTitle.length;
				var zoom = map.getLevel();
				if (zoom <= 3) {
					for (var i=0; i<length; i++) {
						arrTitle[i].setMap(map);
					}
			    } else if (zoom > 3) {
					for (var i=0; i<length; i++) {
						arrTitle[i].setMap(null);
					}
			    }
			}
		});
	}
	
	// 사용자와 주변의 정보를 가져와라
	function getInfomation() {
		arrMarker = new Array(0);
		arrOverlay = new Array(0);
		arrTitle = new Array(0);
		count = 0;
		var location = getClientLocation();
		initDaumMap(location.x, location.y);
		createClientMarker(location.x, location.y);
		getPOIs(location.x, location.y);
		createCircle(location.x, location.y);
		//////////////
		//	update	// ajax 다녀와서 200개 찍어라
		//////////////
		moveScene();
		
		
	}
	
	// 고객의 위치를 받아왔다고 가정한다.
	function getClientLocation() {
		var location = {"x" : xx, "y" : yy};
		return location;
	}
	
	// 고객 위치에 marker를 그린다.
	function createClientMarker(x, y) {
		var imageSrc = '/resources/images/mark.png', // 마커이미지의 주소입니다    
	    imageSize = new daum.maps.Size(32, 35), // 마커이미지의 크기입니다
	    imageOption = {offset: new daum.maps.Point(13, 35)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
		
	    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
		var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
			markerPosition = new daum.maps.LatLng(y, x); // 마커가 표시될 위치입니다
	
		// 마커를 생성합니다
		var marker = new daum.maps.Marker({
			  title : strTemp,
		    position: markerPosition, 
		    image: markerImage, // 마커이미지 설정 
		    zIndex: 5
		});
	
		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);
	 
	}
	
	// 마지막으로 커스텀 오버레이
	function lastMarkCustomOverlay(){
	    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        var url1="http://bus.jeju.go.kr/search/line";
        var url2="http://www.ev.or.kr/portalmonitor?gugun=%EC%A0%9C%EC%A3%BC%EC%8B%9C&sido=%EC%A0%9C%EC%A3%BC%ED%8A%B9%EB%B3%84%EC%9E%90%EC%B9%98%EB%8F%84";
        //var url2="http://map.daum.net/link/map/"+strTemp+","+yy+","+xx;
        var url3="http://map.daum.net/?urlX="+xx+"&urlY"+yy+"&name="+strTemp;  // ?urlX=523954.0&urlY=1084098.0&name=우리회사
       
//        var strContent = '<div class="customoverlay">' +
//        '  <a href="'+url+'" target="_blank">' +
//        '    <span class="title">'+ strTemp+ '</span>' +
//        '  </a>' +
//        '</div>';
      
     var strContent = 
			'<div  id="select_box">' +
			'   <label  for="item">'+strTemp+'</label>' +
			'    <select id="item" title="'+strTemp+'">' +
			'       <option value="#" selected="selected">'+strTemp+'</option>'+
			'       <option value="'+url1+'">경기도버스정보시스템</option>' +
			'       <option value="'+url2+'">환경부 전기충전소</option>' +
			'       <option value="'+url3+'">다음 길찾기</option>' +
			'    </select>' +
			'</div>';
        
   // 커스텀 오버레이가 표시될 위치입니다 
      var position = new daum.maps.LatLng(yy, xx);
   
   // 커스텀 오버레이를 생성합니다
      var customOverlay = new daum.maps.CustomOverlay({
          map: map,
          position: position,
          content: strContent,
          zIndex: 4,
          yAnchor: 1 
      });
	}
 
 ////////////////////////////////////////////////////////////////
	
	function getPOIs(x, y) {
		var category = ["AT4", "AD5", "FD6"];
		var places = new daum.maps.services.Places();
		var callback = function(result, status, pagination) {
		    if (status === daum.maps.services.Status.OK) {
		    	createPOIMarker(result);
				if (pagination.hasNextPage) {
		        	pagination.nextPage();
				}
		    } else if (status == null) {
		    	alert("문제가 발생하였습니다.\n다시 시도해주세요.");
		    }
		};
        
		// 코드 검색
		var length = category.length;
		for (var i = 0; i < length; i++) {
			places.categorySearch(category[i], callback, {
			    // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
			    location: new daum.maps.LatLng(y, x),
				radius: 1000
			});
		}
	}
	
	function createPOIMarker(pois) {
		var length = pois.length;
		var category = pois[0].category_group_name;
		var markerImg = getMarkerImg(category);
		
		for (var i=0; i<length; i++) {
		    // 마커 이미지의 이미지 크기 입니다
		    var imageSize = new daum.maps.Size(21, 25); 
		    
		    // 마커 이미지를 생성합니다    
		    var markerImage = new daum.maps.MarkerImage(markerImg, imageSize); 
		    
		    // 마커를 생성합니다
		    var marker = new daum.maps.Marker({
		        map: map, // 마커를 표시할 지도
		        position: new daum.maps.LatLng(pois[i].y, pois[i].x), // 마커를 표시할 위치
		        //title : pois[i].place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
		        image : markerImage // 마커 이미지 
		    });
		    
		    setTitle(marker, pois[i]);
			setOverlay(marker, pois[i], count);
		    arrMarker.push(marker);
		    count++;
		}
	}
	
	function getMarkerImg(category) {
		var imgUrl;
		if (category == "관광명소") {
			imgUrl = "/resources/images/legend_icon04.png";
		} else if (category == "숙박") {
			imgUrl = "/resources/images/legend_icon03.png";
		} else if (category == "음식점") {
			imgUrl = "/resources/images/legend_icon01.png";
		} else if (category == "현장출동") {
			imgUrl = "/resources/images/legend_icon02.png";
		}
		return imgUrl;
	}
	
	function setTitle(marker, poi) {
		var content = '<div class="wrap">' + 
        			'    <div class="info">' + 
			        '     	<div class="title">' + 
			        			poi.place_name +
			        '    	 </div>' +
			        '     </div>' +
			        '  </div>';
		
		var overlay = new daum.maps.CustomOverlay({
		    content: content,
		    map: map,
		    position: marker.getPosition()
		});
		
		var zoom = map.getLevel();
		if (zoom > 3) {
			overlay.setMap(null);
		} else if (zoom <= 3) {
			overlay.setMap(map);
		}
		
		// 마커에 마우스오버 이벤트를 등록합니다
		daum.maps.event.addListener(marker, 'mouseover', function() {
			overlay.setMap(map);
		});
		
		daum.maps.event.addListener(marker, 'mouseout', function() {
			var zoom = map.getLevel();
			if (zoom > 3) {
		    	// 마커에 마우스아웃 이벤트가 발생하면 오버레이를 제거합니다
				overlay.setMap(null);
		    }
		});
		
		arrTitle.push(overlay);
	}
	
	function setOverlay(marker, poi, cnt) {
		// 커스텀 오버레이에 표시할 컨텐츠 입니다
		// 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
		// 별도의 이벤트 메소드를 제공하지 않습니다 
		var content = '<div class="wrap">' + 
		            '    <div class="caption">' + 
		            '        <div class="title"><label>' + 
		            			poi.place_name + '  ' + poi.phone +
		            '        </label></div>' + 
		            '        <div class="body">' + 
		            '            <div class="desc">' + 
		            '                <div class="ellipsis">'+poi.road_address_name+'</div>' + 
		            '                <div class="jibun ellipsis">'+poi.address_name+'</div>' +  
		            '            </div>' + 
		            '        </div>' + 
		            '    </div>' +    
		            '</div>';

		// 마커 위에 커스텀오버레이를 표시합니다
		// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
		var overlay = new daum.maps.CustomOverlay({
		    content: content,
		    map: map,
		    position: marker.getPosition(),
		    zIndex: 10
		});
		
		overlay.setMap(null);
		
		// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
		daum.maps.event.addListener(marker, 'click', function() {
			if (num == undefined) {
				overlay.setMap(map);
				num = cnt;
			} else if (num != undefined && num != cnt) {
				if (arrOverlay[num] != undefined) {
					arrOverlay[num].setMap(null);
					overlay.setMap(map);
					num = cnt;
				}
			} else if (num != undefined && num == cnt) {
				if (overlay.getMap() == null) {
					overlay.setMap(map);
				} else if (overlay.getMap() != null) {
					overlay.setMap(null);
				}
			}			
		});
		
		arrOverlay.push(overlay);
	}
	
	function createCircle(x, y) {
		var circle = new daum.maps.Circle({
		    map: map,
		    center : new daum.maps.LatLng(y, x),
		    radius: 1000,
		    strokeWeight: 2,
		    strokeColor: '#FF0000',
		    strokeOpacity: 0.1,
		    strokeStyle: 'dashed',
		    fillColor: '#FF0000',
		    fillOpacity: 0.1 
		});
	}
	
	function moveScene() {
		// 해당 메소드는 ajax를 사용하여 데이터를 가져왔다고 가정한다.
		var result = [{'category_group_name' : '현장출동', 'place_name' : 'place_name', 'road_address_name' : 'road_address_name', 'address_name' : 'address_name', 'x' : '126.493457', 'y' : '33.507641'},
		            {'category_group_name' : '현장출동', 'place_name' : 'place_name', 'road_address_name' : 'road_address_name', 'address_name' : 'address_name', 'x' : '126.897030', 'y' : '33.492492'},
		            {'category_group_name' : '현장출동', 'place_name' : 'place_name', 'road_address_name' : 'road_address_name', 'address_name' : 'address_name', 'x' : '126.177391', 'y' : '33.304117'},
		            {'category_group_name' : '현장출동', 'place_name' : 'place_name', 'road_address_name' : 'road_address_name', 'address_name' : 'address_name', 'x' : '126.396816', 'y' : '33.241157'},
		            {'category_group_name' : '현장출동', 'place_name' : 'place_name', 'road_address_name' : 'road_address_name', 'address_name' : 'address_name', 'x' : '126.570157', 'y' : '33.370960'},
		            {'category_group_name' : '현장출동', 'place_name' : 'place_name', 'road_address_name' : 'road_address_name', 'address_name' : 'address_name', 'x' : '126.482261', 'y' : '33.413673'},
		            {'category_group_name' : '현장출동', 'place_name' : 'place_name', 'road_address_name' : 'road_address_name', 'address_name' : 'address_name', 'x' : '126.626978', 'y' : '33.437564'},
		            {'category_group_name' : '현장출동', 'place_name' : 'place_name', 'road_address_name' : 'road_address_name', 'address_name' : 'address_name', 'x' : '126.474248', 'y' : '33.309895'}];
		
		createPOIMarker(result);
	}
	
function openWindowMap(){
  
	var url="http://map.daum.net/link/map/"+strTemp+","+yy+","+xx;
		 
	var newWindow = window.open(url,'map');
 
}	
 
    
</script>
</head>
<body >
<% String locX = request.getParameter("LOCX"); %>
	<% String locY = request.getParameter("LOCY"); %>
	<% 
		String strTemp = request.getParameter("PARASTR"); 
    // 문자 디코딩
      strTemp = URLDecoder.decode(strTemp, "UTF-8") ;
	%>
	<input type="hidden" id="tflocX" value="<%= locX %>" alt="x좌표" title="x좌표">
	<input type="hidden" id="tflocY" value="<%= locY %>" alt="y좌표" title="y좌표">
	<input type="hidden" id="tfstrTemp" value="<%= strTemp %>" alt="파라미터문자열" title="파라미터문자열">
<div id="map">
	<div id="markerInfo">
		<table class="table table-bordered">
			<colgroup>
				<col width="10%">
				<col width="18%">
				<col width="18%">
				<col width="18%">
				<col width="18%">
				<col width="18%">
			</colgroup>
			<tr>
				<th class="text-center warning" rowspan="2" style="vertical-align: middle;">범<br><br>주</th>
				<th class="text-center warning">고객위치</th>
				<th class="text-center warning">관광명소</th>
				<th class="text-center warning">숙박</th>
				<th class="text-center warning">음식점</th>
			</tr>
			<tr>
				<td class="text-center "><img class="clientMarkerImg" src="/resources/images/mark.png" alt="핀"></td>
				<td class="text-center "><img class="poiMarkerImg" src="/resources/images/legend_icon04.png" alt="핀"></td>
				<td class="text-center "><img class="poiMarkerImg" src="/resources/images/legend_icon03.png" alt="핀"></td>
				<td class="text-center "><img class="poiMarkerImg" src="/resources/images/legend_icon01.png" alt="핀"></td>
			</tr>
		</table>
	</div>
</div>
<!-- 
<button type="button" onclick="openWindowMap()">길찾기</button>
 -->
</body>
</html>