<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
				<!-- 조회/검색 -->
				<div id="search" style="margin-bottom:10px;">
					<table class="search_tbl">
						<tr>
							<th style="width: 150px;">
								<input type="radio" class="radio" name="rdSearchGb" id="rdSrchCCGb_cn" value="EXTNAME">성명
								<input type="radio" class="radio" name="rdSearchGb" id="rdSrchCCGb_ct" value="EXTNO">내선번호
							</th>
							<td class="nemo_30">
								<input type="text" id="tfCCSearchValue" class="text_ol" style="width:200px;">
							</td> 
							<td class="btn">
								<button type="button" id="btnCallCenterSearch" class="button">조회</button>
								<button type="button" id="btnCallCenterExcel" class="button">엑셀저장</button>
								<button type="button" id="btnCallCenterInit" class="button">초기화</button>
							</td>
						</tr> 
					</table>
				</div><!--"조회/검색"-->

			<div>
				<div class="stitle" style="margin-left : 0px;">전화걸기</div><br>
			</div>
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th>
							<label>전화번호</label>
						</th>
						<td class="nemo_30">
							<input type="text" id="tfCallNum2" class="text_ol" maxlength="50">
						</td> 
						<td class="btn">
							<button type="button" id="btnCall2" class="button">전화걸기</button>
						</td>
					</tr> 
				</table>
			</div>

				<!-- 그리드테이블 -->
				<div class="grid_tbl" style="width:100%;">
					<table style="width:100%; height:320px;">
						<tr>				  
							<td id="listGrid" >
								<table id="tblInCallCenter"></table>
							</td>
						</tr>
					</table>
				</div>
				<!-- 그리드테이블 -->
				
				<table class="info_tbl_btn" style="width:100%; height: 25px;">
					<tr>
						<td style="text-align: right;">
							<button type="button" id="btnCallSelection" class="button">선택</button>
							<!-- <button type="button" id="btnUpdate"  class="button">저장</button> -->	
						</td>
					</tr>
				</table>
				
				<input type="hidden" id="tfCallCenterTeamCd" />
				<input type="hidden" id="tfCallCenterDeptCd" />
				<input type="hidden" id="tfCallCenterMobile" />
				<input type="hidden" id="tfCtiLoginId" />
				
				<table class="profile_tbl">
						<tr>
							<td class="line_rt">아이디</td>
							<td class="line_b">
								<span id="txtUserId"></span>
							</td>
							<td class="line_c">성명</td>
							<td class="line_b">
								<span id="txtUserName"></span>
							</td>
							<td class="line_c">CTI LOGIN ID</td>
							<td class="line_b">
								<span id="txtCtiNo"></span>
							</td>
						</tr>
						<tr>
							<td class="line_c">팀</td>
							<td class="line_b">
								<span id="txtTeamName"></span>
							</td>
							<td class="line_c">등급</td>
							<td class="line_b">
								<span id="txtGradeName"></span>
							</td>
							<td class="line_c">직급</td>
							<td class="line_b">
								<span id="txtPosName"></span>
							</td>
						</tr>
						<tr>
							<td class="line_rt">전화번호</td>
							<td class="line_b">
								<span id="txtTelNo"></span>
							</td>
							<td class="line_c">핸드폰번호</td>
							<td class="line_b">
								<span id="txtMobileNo"></span>
							</td>
							<td class="line_c">상담사상태</td>
							<td class="line_b">
								<span id="txtStatus"></span>
							</td>
						</tr>											
				</table>