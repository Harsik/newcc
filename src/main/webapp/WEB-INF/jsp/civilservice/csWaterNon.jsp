<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
      
      
     
        
        
		<div class="stitle" style="display: ruby-base;">현재 체납 정보</div><!--"타이틀"-->
		<br/>
		
		<table class="profile_tbl">
			<colgroup>
								<col width="8%"/>
								<col width="16%"/>
								<col width="8%"/>
								<col width="16%"/>
								<col width="8%"/>
								<col width="16%"/>
								<col width="8%"/>
								<col width="16%"/>							
			</colgroup>
			<tbody>
				<tr>
					<th class="line_thb">체납건수</th>								
					<td class="line_b"><label id="no"></label></td>
					<th class="line_thb">체납금액</th>								
					<td class="line_b" ><label id="actContFooter"></label></td>
					<th class="line_thb">상수도</th>								
					<td class="line_b" ><label id="fineCarNo"></label></td>
					<th class="line_thb">하수도</th>								
					<td class="line_b"><label id="b"></label></td>					
				</tr>
			</tbody>
		</table>
		
		<br/>
		<div class="stitle" style="display: ruby-base;">체납 목록</div><!--"타이틀"-->
		<br/>
					<div id="search" style="margin-bottom: 3px;border-radius: 5px;">
						<table class="btn">
							<tr >
								<td><select class="select_bl" id="selWaterNon" style="width: 100px; height:22px;"></select> </td>
							 	<th><input type="checkbox" id="chkCommon" class="checkbox"><label for="chkCommon">과거체납목록 포함</label></th>
							</tr>
						</table>
					</div>
							
		
		<!-- 수도요금 체납 목록 그리드테이블 -->
		<table style="width: 100%; height: 180px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="tblWaterNonList"></table>
					<div id="pagingWaterNonList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->			
		