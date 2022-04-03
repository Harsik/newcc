<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csTax.js'/>"></script> 
      <!--
      <div id="search" style="margin-bottom: 3px;">
        <table class="search_tbl">
          <tr>
            <th style="width: 120px;"><button type="button" id="cstax_btnIvrCall" class="button">ARS인증</button> 주민번호</th>              
            
            <td>            
              <input type="text" id="cstax_tfSrchJuminNo" class="text_ol" value="" readonly>
              <input type="hidden" id="cstax_hidTaxSsNumber" value="" />
            </td> 
            <td class="btn">
              <button type="button" id="cstax_btnTaxSearch" class="button">조회</button>                
              <button type="button" id="cstax_btnTaxInit" class="button">초기화</button>
            </td>
          </tr> 
        </table>
      </div>	
      --> 
      <!--"조회/검색"--> 

<!--
	<table class="profile_tbl">
		
			<tr>
				<th class="line_thb">성명/상호</th>								
				<td class="line_b"><label id="cstax_reg_nm"></label></td>
									
				<th class="line_thb">주소</th>								
				<td class="line_b" style="width:70%"><label id="cstax_addr"></label></td>						
			</tr>
		
	</table>
		--> 
		
		<!-- 세무 그리드테이블-->
		<!-- <table style="width: 100%;">
			<tr>
				<td>
					<table id="cstax_tblCsTaxList"></table>
					<div id="cstax_pagingCsTaxList"></div>
				</td>
			</tr>
		</table> -->
		
		<div id="cstax_table">
			<ul id="cstax_gridtab">
				<li><a href="#i1">세무</a></li>
				<li><a href="#i2">고지현황</a></li>
				<li><a href="#i3">체납현황</a></li>
				<li><a href="#i4">지방세 압류현황</a></li>
				<li><a href="#i5">세외수입 압류현황</a></li>				
			</ul>
		
			<div id="i1">
		      <div id="search" style="margin-bottom: 3px;">
		        	<table class="search_tbl">
			          	<tr>
			            	<th style="width: 120px;"><button type="button" id="cstax_btnIvrCall" class="button">ARS인증</button> 주민번호</th>              
				            <td>            
				              <input type="text" id="cstax_tfSrchJuminNo" class="text_ol" value="" readonly>
				              <input type="hidden" id="cstax_hidTaxSsNumber" value="" />
				            </td> 
			            	<td class="btn">
				              	<button type="button" id="cstax_btnTaxSearch" class="button">조회</button>                
				              	<button type="button" id="cstax_btnTaxInit" class="button">초기화</button>
			            	</td>
			          	</tr> 
		        	</table>
		      </div>
	        
	          <table style="width: 100%;">
				<tr>
					<td>
						<table id="cstax_tblCsTaxList"></table>
						<div id="cstax_pagingCsTaxList"></div>
					</td>
				</tr>
			  </table>
			<!--"그리드테이블"-->
	
			  <div class="stitle" style="display: ruby-base;">상세내역조회</div><!--"타이틀"-->
			  <br/>
			 
			  <table class="profile_tbl">
				<colgroup>
					<col width="10%"/>
					<col width="23%"/>
					<col width="10%"/>
					<col width="23%"/>
					<col width="10%"/>
					<col width="23%"/>
				</colgroup>
				<tbody>
					<tr>
						<th class="line_thb"  style="height: 24px;">성명/상호</th>								
						<td class="line_b"><label id="cstax_cn_emp"></label></td>
											
						<th class="line_thb">과세년월</th>								
						<td class="line_b" ><label id="cstax_tax2"></label></td>	
						<th class="line_thb">부과일자</th>								
						<td class="line_b" ><label id="cstax_tax11"></label></td>	
					</tr>
					<tr>
						<th class="line_thb"  style="height: 24px;">회계세목명</th>								
						<td class="line_b" ><label id="cstax_tax1"></label></td>
						<th class="line_thb">과세구분</th>								
						<td class="line_b" ><label id="cstax_tax3"></label></td>
						<th class="line_thb">전자납부번호</th>								
						<td class="line_b" ><label id="cstax_tax13"></label></td>
					</tr>
					<tr>
						<th class="line_thb"  style="height: 24px;">최초납기</th>								
						<td class="line_b" ><label id="cstax_tax4"></label></td>	
						<th class="line_thb">납기</th>								
						<td class="line_b"><label id="cstax_tax5"></label></td>
						<th class="line_thb">납부일</th>								
						<td class="line_b" ><label id="cstax_tax6"></label></td>	
					</tr>				
								
					<tr>
						<th class="line_thb"  style="height: 24px;">미납액</th>								
						<td class="line_b"><label id="cstax_tax12"></label></td>
						
						<th class="line_thb">감액유무</th>								
						<td class="line_b" ><label id="cstax_tax7"></label></td>
						<!-- 
						<th class="line_thb">부과취소유무</th>								
						<td class="line_b" ><label id="cstax_tax8"></label></td>	 
						-->
						<th class="line_thb">징수결정일</th>								
						<td class="line_b"><label id="cstax_tax15"></label></td>					
					</tr>
					<tr>
						<th class="line_thb"  style="height: 24px;">가상계좌번호</th>								
						<td class="line_b" ><label id="cstax_tax16"></label></td>					
						<th class="line_thb">가상계좌은행</th>								
						<td class="line_b" ><label id="cstax_tax17"></label></td>	
						<th class="line_thb">예금주명</th>
						<td class="line_b" ><label id="cstax_tax18"></label></td>	
					</tr>							
				</tbody>
			  </table>	
	    	</div>
		
			<div id="i2"></div>
		
			<div id="i3">
			<div class="stitle" style="display: ruby-base;">상세내역조회</div><!--"타이틀"-->
				<table id="i3_List"></table>
				<div id="i3_pagingList"></div>
				<table class="profile_tbl">
					<colgroup>
						<col width="10%"/>
						<col width="23%"/>
						<col width="10%"/>
						<col width="23%"/>
						<col width="10%"/>
						<col width="23%"/>
					</colgroup>
					<tbody>
						<tr>
							<th class="line_thb"  style="height: 24px;">성명/상호</th>								
							<td class="line_b"><label id="i3_cn_emp"></label></td>
												
							<th class="line_thb">과세년월</th>								
							<td class="line_b" ><label id="i3_tax2"></label></td>	
							<th class="line_thb">부과일자</th>								
							<td class="line_b" ><label id="i3_tax11"></label></td>	
						</tr>
						<tr>
							<th class="line_thb"  style="height: 24px;">회계세목명</th>								
							<td class="line_b" ><label id="i3_tax1"></label></td>
							<th class="line_thb">과세구분</th>								
							<td class="line_b" ><label id="i3_tax3"></label></td>
							<th class="line_thb">전자납부번호</th>								
							<td class="line_b" ><label id="i3_tax13"></label></td>
						</tr>
						<tr>
							<th class="line_thb"  style="height: 24px;">최초납기</th>								
							<td class="line_b" ><label id="i3_tax4"></label></td>	
							<th class="line_thb">납기</th>								
							<td class="line_b"><label id="i3_tax5"></label></td>
							<th class="line_thb">납부일</th>								
							<td class="line_b" ><label id="i3_tax6"></label></td>	
						</tr>				
						<tr>
							<th class="line_thb"  style="height: 24px;">미납액</th>								
							<td class="line_b"><label id="i3_tax12"></label></td>
							
							<th class="line_thb">감액유무</th>								
							<td class="line_b" ><label id="i3_tax7"></label></td>
							<!-- 
							<th class="line_thb">부과취소유무</th>								
							<td class="line_b" ><label id="i3_tax8"></label></td>	 
							-->
							<th class="line_thb">징수결정일</th>								
							<td class="line_b"><label id="i3_tax15"></label></td>					
						</tr>
						<tr>
							<th class="line_thb"  style="height: 24px;">가상계좌번호</th>								
							<td class="line_b" ><label id="i3_tax16"></label></td>					
							<th class="line_thb">가상계좌은행</th>								
							<td class="line_b" ><label id="i3_tax17"></label></td>	
							<th class="line_thb">예금주명</th>
							<td class="line_b" ><label id="i3_tax18"></label></td>	
						</tr>							
					</tbody>
				</table>	
			  </div>
		  
			  <div id="i4">
				<table id="i4_List"></table>
				<div id="i4_pagingList"></div>
			  </div>
			  
			  <div id="i5"></div>
		  
		</div>
				