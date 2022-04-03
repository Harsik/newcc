<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>분류검색이력</title>
		
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/categoryRecord.js'/>"></script> 
		
		<style>
			div.dsc_scrollable
			{
			    width: 100%;
			    height: 100px;
			    margin: 0;
			    padding: 0;
			    overflow: auto;
			}
		</style>
	</head>
	
	<!-- 크롬도 되려면 onBeforeUnload -->	
	<body onUnload = "closeIt()">
		<div id="h1">분류검색이력</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				분류검색이력
			</div>
			<!--"타이틀"-->
			<br/><br/>
			
    		<!-- 분류 그리드-->
			<div id="grid_all" class = "divCatSrchTabBody">
				<div id = "divCatRcdList">
					<table id="tblCategoryRcd"></table>
					<div id="pgCategoryRcd"></div>
				</div>
				<div id = "divCatDetailRcd">
					<!-- <div style = "text-align: right;">
						<button type="button" id="btnCatInitRcd"  class="button">초기화</button>
					</div> -->
					<!-- 뷰 테이블 -->
					<table class="profile_tbl" id = "tblCatViewRcd">
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
								<label id = "txtCatLvRcd"></label>
							</td>
							<td class="line_c" rowspan = "2">
								<label>분류코드</label>
							</td>
							<td class="line_b" rowspan = "2">
								<label id = "txtCatCdRcd"></label>
							</td>
						</tr>
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "3">
								<label>분류명</label>
							</td>
							<td class="line_b" rowspan = "3" colspan = "3">
								<div id = "divCatNmRcd" class = "cd_nm_scrollable"></div>
							</td>
						</tr>
						<tr></tr>	
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "2">
								<label>링크</label>
							</td>
							<td class="line_b" rowspan = "2" colspan = "3">
								<div id = "divCatLinkRcd"></div>
							</td>
						</tr>
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "2">
								<label>HS코드</label>
							</td>
							<td class="line_b" rowspan = "2" colspan = "3">
								<div id = "txtCatHsCdRcd"></div>
							</td>
						</tr>
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "5">
								<label>설명</label>
							</td>
							<td class="line_b" rowspan = "5" colspan = "3">
								<div class = "dsc_scrollable">
									<pre id = "txtCatDscRcd"></pre>
								</div>
							</td>
						</tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
						<!-- <tr>
							<td class="line_c" rowspan = "5">
								<label>색인어</label>
							</td>
							<td class="line_b" rowspan = "5" colspan = "3">
								<label id = "txtCatIndxRcd"></label>
							</td>
						</tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
						<tr></tr> -->
						<tr>
							<td class="line_c" rowspan = "5">
								<label>파일</label>
							</td>
							<td class="line_b" rowspan = "5" colspan = "3">
								<div id = "divCatFileRcd" class="dsc_scrollable">
								</div>
							</td>
						</tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
					</table>
					<!-- 뷰 테이블 -->
				</div>
     		</div><!--"그리드"-->
     		
     		<!-- 제품 그리드 -->
     		<div id="grid_all" class = "divProdTabBody" style = "display: none;">
				<div id = "divProdListRcd">
					<table id="tblProductRcd"></table>
					<div id="pgProductRcd"></div>
				</div>
				<div id = "divProdDetailRcd" style = "display : none; height: 100%;">
					<table class="profile_tbl" id = "tblProdViewRcd">
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
								<label id = "txtProdLvRcd"></label>
							</td>
							<td class="line_c" rowspan = "2">
								<label>분류코드</label>
							</td>
							<td class="line_b" rowspan = "2">
								<label id = "txtProdCdRcd"></label>
							</td>
						</tr>
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "3">
								<label>분류명</label>
							</td>
							<td class="line_b" rowspan = "3" colspan = "3">
								<div id = "divProdNmRcd" class = "cd_nm_scrollable"></div>
							</td>
						</tr>
						<tr></tr>	
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "2">
								<label>HS코드</label>
							</td>
							<td class="line_b" rowspan = "2" colspan = "3">
								<div id = "txtProdHsCdRcd"></div>
							</td>
						</tr>
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "5">
								<label>설명</label>
							</td>
							<td class="line_b" rowspan = "5" colspan = "3">
								<label id = "txtProdDscRcd" class = "dsc_scrollable"></label>
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
							<td class="line_b" rowspan = "5" colspan = "3">
								<label id = "txtProdIndxRcd"></label>
							</td>
						</tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
						<tr>
							<td class="line_c" rowspan = "5">
								<label>파일</label>
							</td>
							<td class="line_b" rowspan = "5" colspan = "3">
								<div id = "divProdFileRcd" class="dsc_scrollable">
								</div>
							</td>
						</tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
						<tr></tr>
					</table>
					<!-- 뷰 테이블 -->
				</div>
     		</div>
     		<!-- 제품 그리드 -->
     		
		</div>
	</body>
</html>