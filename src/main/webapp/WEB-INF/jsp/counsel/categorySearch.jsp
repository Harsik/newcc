<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>분류검색</title>
		
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/categorySearch.js'/>"></script> 
		<style>
			div.scrollable 
			{
			    width: 100%;
			    height: 560px;
			    margin: 0;
			    padding: 0;
			    overflow: auto;
			}
			
			div.cd_nm_scrollable
			{
			    width: 100%;
			    height: 50px;
			    margin: 0;
			    padding: 0;
			    overflow: auto;
			}
			
			div.dsc_scrollable
			{
			    width: 100%;
			    height: 180px;
			    margin : 0;
			    padding: 0;
			    overflow : auto;
			}
						
			div.indx_scrollable
			{
			    width: 100%;
			    height: 75px;
			    margin: 0;
			    padding: 0;
			    overflow: auto;
			}
			
			div.file_scrollable
			{
			    width: 100%;
			    height: 90px;
			    margin: 0;
			    padding: 0;
			    overflow: auto;
			}
			
			pre
			{
				white-space : pre-line;
			}
			
		</style>
	</head>
	
	<body>
		<div id="h1">분류검색</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				분류검색	    
			</div>
			<!--"타이틀"-->
			<br/><br/>
			<!-- 탭 -->
			<div id="search_el" >
				<div class="s_item">
					<div id = "divCatTab" class="left_tab_top_sm">
						<div id = "divCatSrchTab" class="left_tab_img" style = "cursor: pointer;">인증</div>
						<div id = "divProdTab" class="left_tab_img_gray" style = "cursor: pointer;">제품</div>
					</div>
				</div>
			</div>
			
    		<!-- 분류 그리드-->
			<div id="grid_all" class = "divCatSrchTabBody">
			
		 		<!-- 조회/검색 -->
				<div id="search">
					<table class="search_tbl">
						<tr>
							<th>
								<label>차수</label>
							</th>
							<td style = "width: 100px;">
								<select id = "optCatLv">
								</select>
							</td>
							<th>
								<label>구분</label>
							</th>
							<td style = "width: 100px;">
								<select id ="optCatType">
									<option value = "all">전체</option>
									<option value = "tp_cd">분류코드</option>
									<option value = "tp_nm">분류항목명</option>
									<option value = "indx">색인어</option>
								</select>
							</td>
							<th>
								<label>조건</label>			
							</th>
							<td style = "width: 100px;">
								<select id = "optCatCond">
									<option value = "and">and</option>
									<option value = "or">or</option>
								</select>						
							</td>
							<th>
								<label>검색어</label>
							</th>
							<td style = "width: 100px;">
								<input type = "text" id ="tfCatSrchVal"/>
							</td>
							<td style = "float:right">
								<button type = "button" id = "btnCatSearch" class = "button">조회</button>
								<button type = "button" id = "btnCatInit" class = "button">초기화</button>
								<button type = "button" id = "btnCatInsert" class = "button">하위분류추가</button>
							</td>
						</tr> 
					</table>
				</div>
				<!--"조회/검색"-->

				<table style = "width:100%">
					<tr>
						<td valign=top  style = "width: 35%; text-align: left; height : 260px; border: 1px solid #acacac;">
			        		<div id = "divDummyCatTree" style = "display: none;">Loading...</div>
			        		<div id = "divCatTree" class = "scrollable"></div>
			        	</td>
						<td style = "width: 65%; height : 580px;">
							<div id = "divDummyCatList">
								<table id="tblDummyCategory"></table>
								<div id="pgDummyCategory"></div>
							</div>
							<div id = "divCatList">
								<table id="tblCategory"></table>
								<div id="pgCategory"></div>
							</div>
							<div id = "divCatDetail" style = "display : none; height: 100%;">
								<div style = "text-align: right;">
									<button type="button" id="btnCatMod"  class="button">수정</button>
									<button type="button" id="btnCatAdd"  class="button">추가</button>
									<button type="button" id="btnCatSave"  class="button">저장</button>
									<button type="button" id="btnCatDel"  class="button">삭제</button>
									<button type="button" id="btnCatSelect" class="button">선택</button>
									<button type="button" id="btnCatList" class="button">수정이력</button>
									<button type="button" id="btnCatBack" class="button">목록</button>
								</div>
								<!-- 뷰 테이블 -->
								<table class="profile_tbl" id = "tblCatView">
									<tr>
										<td class="line_c" colspan = "4" rowspan = "2" >
											<label>분류 내용 보기</label>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td class="line_c" rowspan = "2" >
											<label>차수</label>
										</td>
										<td class="line_b" rowspan = "2">
											<label id = "txtCatLv"></label>
										</td>
										<td class="line_c" rowspan = "2">
											<label>분류코드</label>
										</td>
										<td class="line_b" rowspan = "2">
											<label id = "txtCatCd"></label>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td class="line_c" rowspan = "3">
											<label>분류명</label>
										</td>
										<td class="line_b" rowspan = "3" colspan = "3">
											<div id = "divCatNm" class = "cd_nm_scrollable"></div>
										</td>
									</tr>
									<tr></tr>	
									<tr></tr>
									<tr>
										<td class="line_c" rowspan = "2">
											<label>링크</label>
										</td>
										<td class="line_b" rowspan = "2" colspan = "3">
											<div id = "divCatLink"></div>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td class="line_c">
											<label>설명</label>
										</td>
										<td class="line_b" colspan = "3" style = "padding-right : 0;">
											<div class = "dsc_scrollable">
												<pre id = "txtCatDsc"></pre>
											</div>
										</td>
									</tr>
									<tr>
										<td class="line_c">
											<label>색인어</label>
										</td>
										<td class="line_b" colspan = "3" style = "padding-right : 0;">
											<div class = "indx_scrollable">
												<label id = "txtCatIndx"></label>
											</div>
										</td>
									</tr>
									<tr>
										<td class="line_c">
											<label>파일</label>
										</td>
										<td class="line_b" colspan = "3" style = "padding-right : 0;">
											<div class = "file_scrollable">
												<div id = "divCatFile">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td class="line_c">
											<label>수정일시</label>
										</td>
										<td class="line_b">
											<label id = "txtCatModDt"></label>
										</td>
										<td class="line_c">
											<label>수정자</label>
										</td>
										<td class="line_b">
											<label id = "txtCatModUsrNm"></label>
										</td>
									</tr>
								</table>
								<!-- 뷰 테이블 -->
								<!-- 수정 테이블 -->
								<form id="frm1" name="frm1" action="/ajax/category/category.do" method="post">
									<table class="profile_tbl" id = "tblCatMod">
										<tr>
											<td class="line_c" colspan = "4" rowspan = "2" >
												<label>분류 내용 보기</label>
											</td>
										</tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "2" >
												<label>차수</label>
											</td>
											<td class="line_b" rowspan = "2">
												<input type = "text" id = "tfCatModLv" style = "width: 100%; ime-mode:disabled;" onkeydown = "return onlyNumber(event)"/>
												<label id = "txtCatModLv"></label>
											</td>
											<td class="line_c" rowspan = "2">
												<label>분류코드</label>
											</td>
											<td class="line_b" rowspan = "2">
												<label id = "txtCatModCd"></label>
												<select id = "optCatModCd" style = "width: 100%;">
												</select>
											</td>
										</tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "2">
												<label>분류명(한국어)</label>
											</td>
											<td class="line_b" rowspan = "2" colspan = "3">
												<textarea rows="" cols="" style="width: 100%; height: 100%; padding :0px;" id="tfCatModKorNm"></textarea>
											</td>
										</tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "2">
												<label>분류명(영어)</label>
											</td>
											<td class="line_b" rowspan = "2" colspan = "3">
												<textarea rows="" cols="" style="width: 100%; height: 100%; padding :0px;" id="tfCatModEngNm"></textarea>
											</td>
										</tr>
										<tr></tr>	
										<tr>
											<td class="line_c" rowspan = "2">
												<label>링크</label>
											</td>
											<td class="line_b" rowspan = "2" colspan = "3">
												<input type = "text" id = "tfCatModLink" style = "width: 100%;"/>
											</td>
										</tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "7">
												<label>설명</label>
											</td>
											<td class="line_b" rowspan = "7" colspan = "3">
												<textarea rows="" cols="" style="width: 100%; height: 100%; padding :0px;" id="tfCatModDsc"></textarea>
											</td>
										</tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "5">
												<label>색인어</label>
											</td>
											<td class="line_b" rowspan = "5" colspan = "3" style = "vertical-align: top;">
												<div>
													<input type = "text" id = "tfIndxVal" /> <button type ="button" class = "button" id = "btnIndxAdd">추가</button>
												</div>
												<label id = "txtCatModIndx"></label>
											</td>
										</tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan="5">첨부파일</td>
											<td class="" rowspan = "5" colspan = "3"  style = "vertical-align: top;">
												<table id="CatfileInfos" style="margin-left: 5px; margin-right: 6px;">
													<tr id = "catFileBase">
														<td>
															<input type="file" id="CATEGORY" name="CATEGORY" class="file_board" style="width:300px;" />
														</td>
														<td style="width: 50%; text-align: right; ">
															<img src="/resources/images/btn_fileadd.png" alt="파일추가" onclick = "btnCatFileAdd()" class="icon_add" style="cursor: pointer"/>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
									</table>
								</form>
								<!-- 수정 테이블 -->
							</div>
						</td>
					</tr>
				</table>
     		</div><!--"그리드"-->
     		
     		<!-- 제품 그리드 -->
     		<div id="grid_all" class = "divProdTabBody" style = "display: none;">
		 		<!-- 조회/검색 -->
				<div id="search">
					<table class="search_tbl">
						<tr>
							<th>
								<label>차수</label>
							</th>
							<td style = "width: 100px;">
								<select id = "optProdLv">
								</select>
							</td>
							<th>
								<label>구분</label>
							</th>
							<td style = "width: 100px;">
								<select id ="optProdType">
									<option value = "all">전체</option>
									<option value = "tp_cd">분류코드</option>
									<option value = "tp_nm">분류항목명</option>
								</select>
							</td>
							<th>
								<label>조건</label>			
							</th>
							<td style = "width: 100px;">
								<select id = "optProdCond">
									<option value = "and">and</option>
									<option value = "or">or</option>
								</select>						
							</td>
							<th>
								<label>검색어</label>
							</th>
							<td style = "width: 100px;">
								<input type = "text" id ="tfProdSrchVal"/>
							</td>
							<td style = "float:right">
								<button type = "button" id = "btnProdSearch" class = "button">조회</button>
								<button type = "button" id = "btnProdInit" class = "button">초기화</button>
								<button type = "button" id = "btnProdInsert" class = "button">하위분류추가</button>
							</td>
						</tr> 
					</table>
				</div>
				<!--"조회/검색"-->

				<table style = "width:100%">
					<tr>
						<td valign=top  style = "width: 35%; text-align: left; height : 260px; border: 1px solid #acacac;">
							<div id = "divDummyProdTree" style = "display: none;">Loading...</div>
			        		<div id = "divProdTree" class = "scrollable"></div>
			        	</td>
						<td style = "width: 65%; height : 580px;">
							<div id = "divDummyProdList">
								<table id="tblDummyProduct"></table>
								<div id="pgDummyProduct"></div>
							</div>
							<div id = "divProdList">
								<table id="tblProduct"></table>
								<div id="pgProduct"></div>
							</div>
							<div id = "divProdDetail" style = "display : none; height: 100%;">
								<div style = "text-align: right;">
									<button type="button" id="btnProdMod"  class="button">수정</button>
									<button type="button" id="btnProdAdd"  class="button">추가</button>
									<button type="button" id="btnProdSave"  class="button">저장</button>
									<button type="button" id="btnProdDel"  class="button">삭제</button>
									<button type="button" id="btnProdSelect" class="button">선택</button>
									<button type="button" id="btnProdList" class="button">수정이력</button>
									<button type="button" id="btnProdBack" class="button">목록</button>
								</div>
								<!-- 뷰 테이블 -->
								<table class="profile_tbl" id = "tblProdView">
									<tr>
										<td class="line_c" colspan = "4" rowspan = "2" >
											<label>분류 내용 보기</label>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td class="line_c" rowspan = "2" >
											<label>차수</label>
										</td>
										<td class="line_b" rowspan = "2">
											<label id = "txtProdLv"></label>
										</td>
										<td class="line_c" rowspan = "2">
											<label>분류코드</label>
										</td>
										<td class="line_b" rowspan = "2">
											<label id = "txtProdCd"></label>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td class="line_c" rowspan = "3">
											<label>분류명</label>
										</td>
										<td class="line_b" rowspan = "3" colspan = "3">
											<div id = "divProdNm" class = "cd_nm_scrollable"></div>
										</td>
									</tr>
									<tr></tr>	
									<tr></tr>
									<tr>
										<td class="line_c" rowspan = "2">
											<label>HS코드</label>
										</td>
										<td class="line_b" rowspan = "2" colspan = "3">
											<div id = "txtProdHsCd"></div>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td class="line_c">
											<label>설명</label>
										</td>
										<td class="line_b" colspan = "3" style = "padding-right : 0;">
											<div class = "dsc_scrollable">
												<pre id = "txtProdDsc"></pre>
											</div>
										</td>
									</tr>
									<tr>
										<td class="line_c">
											<label>색인어</label>
										</td>
										<td class="line_b" colspan = "3" style = "padding-right : 0;">
											<div class = "indx_scrollable">
												<label id = "txtProdIndx"></label>
											</div>
										</td>
									</tr>
									<tr>
										<td class="line_c">
											<label>파일</label>
										</td>
										<td class="line_b" colspan = "3" style = "padding-right : 0;">
											<div class = "file_scrollable">
												<div id = "divProdFile">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td class="line_c">
											<label>수정일시</label>
										</td>
										<td class="line_b">
											<label id = "txtProdModDt"></label>
										</td>
										<td class="line_c">
											<label>수정자</label>
										</td>
										<td class="line_b">
											<label id = "txtProdModUsrNm"></label>
										</td>
									</tr>
								</table>
								<!-- 뷰 테이블 -->
								<!-- 수정 테이블 -->
								<form id="frm2" name="frm2" action="/ajax/category/category.do" method="post">
									<table class="profile_tbl" id = "tblProdMod">
										<tr>
											<td class="line_c" colspan = "4" rowspan = "2" >
												<label>분류 내용 보기</label>
											</td>
										</tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "2" >
												<label>차수</label>
											</td>
											<td class="line_b" rowspan = "2">
												<input type = "text" id = "tfProdModLv" style = "width: 100%; ime-mode:disabled;" onkeydown = "return onlyNumber(event)"/>
												<label id = "txtProdModLv"></label>
											</td>
											<td class="line_c" rowspan = "2">
												<label>분류코드</label>
											</td>
											<td class="line_b" rowspan = "2">
												<label id = "txtProdModCd"></label>
												<select id = "optProdModCd" style = "width: 100%;">
												</select>
											</td>
										</tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "2">
												<label>분류명(한국어)</label>
											</td>
											<td class="line_b" rowspan = "2" colspan = "3">
												<textarea rows="" cols="" style="width: 100%; height: 100%; padding :0px;" id="tfProdModKorNm"></textarea>
											</td>
										</tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "2">
												<label>분류명(영어)</label>
											</td>
											<td class="line_b" rowspan = "2" colspan = "3">
												<textarea rows="" cols="" style="width: 100%; height: 100%; padding :0px;" id="tfProdModEngNm"></textarea>
											</td>
										</tr>
										<tr></tr>	
										<tr>
											<td class="line_c" rowspan = "2">
												<label>HS코드</label>
											</td>
											<td class="line_b" rowspan = "2" colspan = "3">
												<input type = "text" id = "tfProdModHsCd" style = "width: 100%;"/>
											</td>
										</tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "5">
												<label>설명</label>
											</td>
											<td class="line_b" rowspan = "5" colspan = "3">
												<textarea rows="" cols="" style="width: 100%; height: 100%; padding :0px;" id="tfProdModDsc"></textarea>
											</td>
										</tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan = "5">
												<label>색인어</label>
											</td>
											<td class="line_b" rowspan = "5" colspan = "3" style = "vertical-align: top;">
												<div>
													<input type = "text" id = "tfProdIndxVal" /> <button type ="button" class = "button" id = "btnProdIndxAdd">추가</button>
												</div>
												<label id = "txtProdModIndx"></label>
											</td>
										</tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr>
											<td class="line_c" rowspan="5">첨부파일</td>
											<td class="" rowspan = "5" colspan = "3"  style = "vertical-align: top;">
												<table id="prodfileInfos" style="margin-left: 5px; margin-right: 6px;">
													<tr id = "prodFileBase">
														<td>
															<input type="file" id="PRODUCT" name="PRODUCT" class="file_board" style="width:300px;" />
														</td>
														<td style="width: 50%; text-align: right; ">
															<img src="/resources/images/btn_fileadd.png" alt="파일추가" onclick = "btnProdFileAdd()" class="icon_add" style="cursor: pointer"/>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
										<tr></tr>
									</table>
								</form>
								<!-- 수정 테이블 -->
							</div>
						</td>
					</tr>
				</table>
     		</div>
     		<!-- 제품 그리드 -->
     		
     		<div id = "catFooter">
	     		<div style = "text-align: right;">
					<button type="button" id="btnCatConfirm"  class="button">완료</button>
					<button type="button" id="btnCatCancel"  class="button">취소</button>
				</div>
	     		
	     		<!-- 무역분류, 제품 분류 -->
	     		<div>
	     			<table class="profile_tbl">
	     				<tr>
							<td class="line_c" style = "width : 5%;" rowspan = "3">
								<label>한국표준무역분류</label>
							</td>
							<td class="line_b" rowspan = "3">
								<div id = "divKorCatList" style = "overflow-y:auto; height : 40px;"></div>
							</td>
						</tr>
						<tr></tr>
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "3">
								<label>국가별 제품 분류</label>
							</td>
							<td class="line_b" rowspan = "3">
								<div id = "divCountryProdList" style = "overflow-y:auto; height : 40px;"></div>
							</td>
						</tr>
						<tr></tr>
						<tr></tr>
	     			</table>
	     		</div>
     		</div>
		</div>
		<input type = "hidden" id = "hdCategoryCd"/>
	</body>
</html>