<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>시스템 등록</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/tab.css" type="text/css"/>

	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
  <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery.gbTabs.js"></script>	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rsm/rsmSystemMaster.js"></script>

</head>
<body>
	<div id="h1">시스템 등록</div>
	<div id="pop_body" style="height: 615px;">
		<div class="stitle">시스템 현황</div>
		<div id="search">
			<table class="search_tbl">
				<tr>
					<th>시스템분류</th>
					<td class="sel" style="width: 100px;">
						<select id = "srchSysRole" class="select_al" ></select>
					</td>
					<!-- 
					<th>업무분류</th>
					<td class="sel">
						<select id = "srchUpmuType" class="select_al" ></select>
					</td>
           -->
          <th>시스템명</th>
          <td class="sel">
            <input type="text" class="text_ol" id="srchSystemNm" name="srchSystemNm" maxlength="167">
					</td>
					<!-- 
					<th>분류</th>
          <td class="sel">
            <select id = "srchType" class="select_al" ></select>
          </td>
           -->
					<td class="btn">
						<button type="button" id="btnSearch" class="button">조회</button>
						<button type="button" id="btnInit" class="button">초기화</button>
						<!-- <button type="button" id="btnExcel" class="button">엑셀저장</button> -->
					</td>
				</tr> 
			</table>
		</div>
		<div id="grid_all">
			<div id="grid1" style="clear: both;">
				<table id="tblSystemList" style="clear: both"></table>
				<div id="pgSystemList"></div>
			</div>
		</div>
		
		<!-- <br /> -->   
    <div class="grid_all" style="width:100%; height:36px; float:right;">
      <!-- 버튼 테이블 -->
      <table class="info_tbl_btn">
        <tr>
          <td>
           <button type="button" id="btnInfoInsert"  class="button">추가</button>
           <button type="button" id="btnInfoUpdate"  class="button">수정</button>
           <button type="button" id="btnInfoInit"  class="button">초기화</button>
           <button type="button" id="btnInfoDelete"  class="button">삭제</button>          
          </td>
        </tr>
      </table>  
      <!-- "버튼 테이블" -->
    </div>
   
    <div id="ctnt1">  
        <!-- 시스템 기본정보 시작 -->
        
          <!-- 기본정보 테이블 -->
          <input type="hidden" id="rsmSystemId">
          <table class="profile_tbl">
  
            <tr>
              <td class="line_rt">시스템</td>
              <td class="line_b">
                <input type="text" class="text_ol" id="rsmSystemNm">
              </td>
              <td class="line_c">소속센터</td>
              <td class="line_b">
                <select class="select_al" id="rsmCenterCd">
                </select>
              </td> 
              <td class="line_c">호스트</td>
              <td class="line_b"><input type="text" class="text_ol" id="rsmHostNm"></td>     
            </tr>
            <tr>
              <td class="line_rt">시스템분류</td>
              <td class="line_b">
                <select class="select_al" id="rsmSysRole">
                </select>
              </td>
              <td class="line_c">시스템구성</td>
              <td class="line_b">
                <select class="select_al" id="rsmSysconf">
                </select>
              </td>   
              <td class="line_c">마스터구분</td>
              <td class="line_b">
                <select class="select_al" id="rsmMasterGb">
                </select>              
              </td>                
            </tr>
            <tr>
              <td class="line_rt">시스템모델</td>
              <td class="line_b"><input type="text" class="text_ol" id="rsmSysModel"></td>
              <td class="line_c">IP주소1</td>
              <td class="line_b"><input type="text" class="text_ol" id="rsmIpAddr1"></td>
              <td class="line_c">IP주소2</td>
              <td class="line_b"><input type="text" class="text_ol" id="rsmIpAddr2"></td>
            </tr>
            <tr>
              <td class="line_rt">모니터링 여부</td>
              <td class="line_b" colspan="3">            
                <input type="checkbox" class="checkbox" id="chkRsmIcmpGb" value="1" checked="checked">ICMP &nbsp;
                <input type="checkbox" class="checkbox" id="chkRsmMoniGb" value="1" checked="checked">모니터링 &nbsp;
                <input type="checkbox" class="checkbox" id="chkRsmCallGb" value="1" checked="checked">호현황 &nbsp;
                <input type="checkbox" class="checkbox" id="chkRsmHiddenGb" value="1">숨김 &nbsp;
              </td>
              <td class="line_c">도입년도</td>
              <td class="line_b">
                <select class="select_al" id="rsmIntroYear">
                </select>              
              </td>
            </tr>
                        
            <tr>
              <td class="line_rt">CPU 타입</td>
              <td class="line_b"><input type="text" class="text_ol" id="rsmCputype"></td>
              <td class="line_c">OS 타입</td>
              <td class="line_b">
                <select class="select_al" id="rsmOsType">
                </select>
              </td>
              <td class="line_c">SNMP 버전</td>
              <td class="line_b">
                <select class="select_al" id="rsmSnmpVer">
                </select>
              </td>  
            </tr>
            <tr>
              <td class="line_rt">메모리합계</td>
              <td class="line_b"><input type="text" class="text_ol" id="rsmMemory"></td>
              <td class="line_c">OS 버전</td>
              <td class="line_b">
                <select class="select_al" id="rsmOsVer">
                </select>              
              </td> 
              <td class="line_c">COMMUNITY</td>
              <td class="line_b"><input type="text" class="text_ol" id="rsmCommunity"></td>                
            </tr>            
            
          </table><!-- 기본정보 테이블 -->            
        
        <!-- 시스템 기본정보 종료  -->
    </div>        
	</div>
</body>
</html>