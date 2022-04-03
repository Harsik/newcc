<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
      
        
		<div class="stitle" style="display: ruby-base;">누적 목록</div><!--"타이틀"-->
		<br/>
		

		
		<!-- 수도요금 체납 목록 그리드테이블 -->
		<table style="width: 100%; height: 318px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="tblWaterAccrueList"></table>
					<div id="pagingWaterAccrueList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->			
		