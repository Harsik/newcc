<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswTrnsferAccept.js'/>"></script>

        <!-- 조회/검색 -->
        <div id="search">
          <table class="search_tbl" >
            <tr>
              <th>부서명</th>
              <td style="width: 200px;">
                <input type="text" id="cstrac_cswSearchOrgVal" class="text_ol" placeholder=" 부서명을 입력해주세요!">
              </td> 
 
              <th style="width: 100px;">성명</th>
              <td class="nemo_30">
                <input type="text" id="cstrac_cswSearchUsrNm" class="text_ol" placeholder=" 성명을 입력해주세요!">
              </td>               
                             
              <td class="btn">
                <button type="button" id="cstrac_btnCswSearch" class="button">조회</button>
                <button type="button" id="cstrac_btnCswTrnsfAccpInit" class="button">초기화</button>
              </td>
            </tr> 
          </table>
        </div><!--"조회/검색"-->
<br/>
<div>
	<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrac_setUID" disabled>
	<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrac_setAffrYN">
	
						
	<input type="text" class="text_ol_60" style="width: 470px;" placeholder="서무명 또는 부서명을 입력하여 선택하여주십시요!" id="cstrac_setUserfullname" maxlength="30" >	
	<img style="visibility: hidden;" width="20" height="20" class="icon_comm" id="cstrac_cntrSearch" alt="찾기" src="/resources/images/search_img.png">
	&nbsp;&nbsp;&nbsp;
	<button type="button" id="cstrac_btnCswInsert" class="button">콜센터담당자추가</button>
	&nbsp;&nbsp;&nbsp;* 이미 등록된 담당자는 콜센터담당자로 추가 할 수 없습니다.
</div>
		<!-- 그리드테이블 -->
		<table style="width: 100%; height: 180px;">
			<tr>
				<td>
					<table id="cstrac_tblCAcceptList"></table>
					<div id="cstrac_pagingCAcceptList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->
