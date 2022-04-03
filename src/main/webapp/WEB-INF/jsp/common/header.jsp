<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!--슬라이딩 메뉴-->
<nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left"
	id="cbp-spmenu-s1">
	<div style="width: 100%; height: auto; overflow: hidden;">
		<div class="tree" id="trMainMenu"
			style="height: 850px; margin: 30px 13px 0px 10px; overflow-x: hidden; overflow-y: auto;">
		</div>
	</div>
	<div id="showLeft">
	<div id="s_icon"></div>
		<!-- <img id="s_icon" draggable="false" /> --> 
		<!-- <img>에서 <div>로 전환 크롬에서 이미지 테투리가 생기는 현상을 제거함 -->
	</div>
</nav>

<div style="display: none;" id="divSystemManager">
	&nbsp;&nbsp;이름 : <input type="text" id="USERNAME" value="" size="10" alt="이름" title="이름"/>
	&nbsp;&nbsp;내선번호 : <input type="text" id="EXT" value="" size="10" alt="내선번호" title="내선번호" />
	&nbsp;&nbsp;CTI아이디 : <input type="text" id="USERID" value="" size="10" alt="CTI아이디" title="CTI아이디" />
	&nbsp;&nbsp;사용자 등급 : <input type="text" id="USERTYPE" value="" size="10" alt="사용자 등급" title="사용자 등급" />
	&nbsp;&nbsp;사번 : <input type="text" id="EMPNO" value="" size="10" alt="사번" title="사번" />
	&nbsp;&nbsp;호전환 : <input type="text" id="TRANS_EXT" value="" size="10" alt="호전환" title="호전환" />
	&nbsp;&nbsp;상담사 상태 : <input type="text" id="AGENT_STATUS" value="" size="10" alt="상담사 상태" title="상담사 상태" />
	&nbsp;&nbsp;상담사 상태2 : <input type="text" id="AGENT_STATUS2" value="" size="10" alt="상담사 상태2" title="상담사 상태2" />
	&nbsp;&nbsp;현재통화번호 : <input type="text" id="CALLNO" value="" size="10" alt="현재통화번호" title="현재통화번호" />
	&nbsp;&nbsp;발신번호 : <input type="text" id="OUTDIAL" value="" size="10" alt="발신번호" title="발신번호" />
	&nbsp;&nbsp;cti 사용유무 : <input type="text" id="CTIUSRYN" value="" size="5" alt="CTI 사용유무" title="CTI 사용유무" />
	&nbsp;&nbsp;녹취url : <input type="text" id="RECURL" value="" size="10" alt="녹취URL" title="녹취URL" />
</div>

<header>
	<div class="logo_container">
	<img id="logo_img" src="<c:url value='/resources/images/logo.png'/>" alt="온누리콜센터" style="width:130px; margin-left: 50px; margin-right: 70px; margin-top: 12px;" draggable="false" />
		<div class="vCenter">
			<div class="item">
				<%-- <img id="logo_img" src="<c:url value='/resources/images/logo.png'/>" alt="온누리콜센터" style="margin-left: 50px; margin-right: 70px;" draggable="false" /> --%>
			</div>
		</div>
	</div>

	<div class="box_container">
		<div class="vCenter">
			<div class="item">
				<div id="after_work_info" style="width: 160px; text-align: center;">
					<label id="labMainStatusNm"></label> <label id="labMainStatusTime" style="color: #0000a0;"></label>&nbsp;
				</div>
			</div>
		</div>
	</div>
	<!-- 상단 버튼 그룹 시작 -->
	<div class="btn_container">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_1"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="btn_container">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_2"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="btn_container">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_4"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="btn_container">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_5"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="btn_container" style="display: none;">
		<!-- 3자통화버튼 - 사용하지 않음 -->
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_6"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="btn_container" style="display: none;">
				<div class="vCenter">
					<div class="item">
						<div class="btn_component">
							<div class="btn_image" id="softphone_7">
							</div>
						</div>
					</div>
				</div>
			</div> -->
	<div class="btn_container">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_8"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="btn_container">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_3"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="btn_container" style="display: none;">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_9"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container">
		<div class="vCenter">
			<div class="item">
				<div class="inbound-call">
					<ul>
						<li class="ction">CTI :
							<p id="mainTopCtiStatus">OFF</p>
						</li>
						<li class="inbound" id="labCallTypeStatus">인바운드상담 : I/B</li>
					</ul>
					<div class="sending-number">
						전화번호 : <label id="labCallNumStatus">010-000-0000</label>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right" style="margin-right: 5px;">
		<div class="vCenter">
			<div class="item">
				<div class="standby_container">
					<input type="hidden" id="tfMainWaitingCustCount" value="" alt="대기고객수" title="대기고객수" />
					<!-- 대기고객수 -->
					<input type="hidden" id="tfMainWaitingDate" value="" alt="대기날짜" title="대기날짜" />
					<!-- 대기고객수 -->
					<div class="standby_num">
						대기고객
						<p id="labMainWaitingCustCount">0</p>
					</div>
					<input type="hidden" id="hidTeamQueue" value="" alt="팀큐" title="팀큐" />
					<iframe id="iframePollData" class="standby_container" src="./iframePollData.do" width="138" height="42" style="position: absolute; top: 260px; left: 220px; visibility: hidden" title="실시간데이터"></iframe>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right"
		style="margin-right: 5px; display: none;">
		<!-- 최근열어본파일 -->
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_7"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right">
		<!-- 즐겨찾기버튼 - 사용하지 않음 -->
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_11"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right">
		<!-- 행정업무  -->
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_12"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_13"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_14">
						<!-- SMS  -->
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_15">
						<!-- FAX  -->
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_16"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_17">
						<!-- 평가관리 -->
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right" style="display: none;">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_18"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="btn_container_right" style="margin-right: 5px;">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<div class="btn_image" id="softphone_10"></div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- <div class="btn_container_right" style="margin-right: 5px;">
		<div class="vCenter">
			<div class="item">
				<div class="btn_component">
					<button type="button" id="btnRefresh" class="ui-button" onClick="popupRefresh();">새로고침</button>
				</div>
			</div>
		</div>
	</div> -->
	
	

	<!-- 감정분석 솔루션 
      <div class="btn_container_right"  style="margin-right: 5px; margin-left: 3px;">
        <div class="vCenter">
          <div class="item">
            <div class="btn_component">
              <table>
	              <td>
		              <iframe id="mers" src="" width="200" height="46" topmargin="0" scrolling="no" style="border:0; align:left; background-color: #17469E;"></iframe>
	              </td>
	              <td>
	                <button type="button" id="btnMersSwtch" class="button" style="width:40px;">ON</button>
		            </td>              
              </table>
            </div>
          </div>
        </div>
      </div>
      -->
	<!-- 상단 버튼 부분 끝 -->
</header>