<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value='/resources/js/main/TabSetting.js'/>" ></script>
<div id="tabSetting" title="업무영역 탭 켜기/끄기" style="display:none;">
<table>
<tr>
<td><button class="button" id="btn_tabSearch">지식검색</button></td>
<td><button class="button" id="btn_tabCnslList">상담이력</button></td>
<td><button class="button" id="btn_tabSMSList">SMS이력</button></td>
</tr>
<tr>
<!-- <td><button class="button" id="btn_tabEmrgncyInfo">긴급정보</button></td> -->
<!-- <td><button class="button" id="btn_tabCnsSms">문자상담</button></td> -->
<td><button class="button" id="btn_tabMessage">쪽지</button></td>
<!-- <td><button class="button" id="btn_tabHappyCall">해피콜</button></td> -->
</tr>
</table>
</div>
