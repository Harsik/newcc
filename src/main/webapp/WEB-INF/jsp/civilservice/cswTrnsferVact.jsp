<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswTrnsferVact.js'/>"></script>

        <!-- 조회/검색 -->
        <div id="search">
          <table class="search_tbl" >
            <tr>

              <th>부서명</th>
              <td style="width: 200px;">
                <input type="text" id="cswSearchOrgVal" class="text_ol" placeholder=" 부서명을 입력해주세요!">
              </td> 
 
              <th style="width: 100px;">성명</th>
              <td class="nemo_30">
                <input type="text" id="cswSearchUsrNm" class="text_ol" placeholder=" 성명을 입력해주세요!">
              </td>               
                             
              <td class="btn">
                <button type="button" id="btnCswSearch" class="button">조회</button>
                <button type="button" id="btnCswTrnsfAccpInit" class="button">초기화</button>
              </td>
            </tr> 
          </table>
        </div><!--"조회/검색"-->
<br/>
<div>
	<input type="hidden" class="text_ol_half" style="width: 100px;" id="setUID" disabled>
	<input type="hidden" class="text_ol_half" style="width: 100px;" id="setAffrYN">
	
						
	<input type="text" class="text_ol_60" style="width: 470px;" placeholder="서무명 또는 부서명을 입력하여 선택하여주십시요!" id="setUserfullname" maxlength="30" >	
	<img width="20" height="20" class="icon_comm" id="cntrSearch" alt="찾기" src="/resources/images/search_img.png">
	&nbsp;&nbsp;&nbsp;
	<button type="button" id="btnCswInsert" class="button">휴가자 추가</button>
	&nbsp;&nbsp;&nbsp;* 이미 등록된 사람은 휴가자로 추가 할 수 없습니다.
</div>
          
        
		<!-- 그리드테이블 -->
		<table style="width: 100%; height: 180px;">
			<tr>
				<td>
					<table id="tblCAcceptList"></table>
					<div id="pagingCAcceptList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->
