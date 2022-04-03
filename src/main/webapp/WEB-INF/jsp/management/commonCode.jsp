<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>시스템코드 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
        
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/management/commonCode.js'/>"></script>
    </head>

    <body>
    
        <!--BODY-->
        <div id="h1">
            시스템코드 관리
        </div>
        <div id="pop_body" style="float: left;">
            <!--타이틀-->
            <div class="stitle">
                시스템코드 조회
            </div>
            <!--"타이틀"-->
            <!-- 조회/검색 -->
            <div id="search">
                <table class="search_tbl">
                    <tr>
                        <th>검색어</th>
                        <td class="sel">
                            <select class="select_al" id="cmCd_optSrchtype">
                                <option value="all">전체</option>
                                <option value="tp_cd">타입</option>
                                <option value="tp_nm">타입명</option>
                            </select>
                        </td>
                        <td class="nemo_30">
                            <input type="text" class="text_ol" id="cmCd_tfSrchval" maxlength="20">
                        </td>
                        <td class="btn">
                            <button type="button" id="cmCd_btnSearch" class="button">조회</button>
                            <button type="button" id="cmCd_btnInit" class="button">초기화</button>
                        </td>
                    </tr> 
                </table>
            </div>
            <!--"조회/검색"-->
   
            <!--그리드-->
            <div id="grid_all">
    
                <!--왼쪽그리드-->
                <div id="code_admin_left">
       
                    <!--타이틀-->
                    <div class="stitle">
                        코드타입
                    </div>
                    <!--"타이틀"-->

                    <!-- 미사용/버튼 테이블 -->
                    <table class="info_tbl">
                        <tr>
                            <th></th>
                            <td>
                                <input type="checkbox" class="checkbox" id="cmCd_chkNotUseCodetype"><label for="chkNotUseCodetype">미사용 포함</label>
                            </td>
                        </tr>
                    </table>
                    <!--"미사용/버튼 테이블"-->

                    <!-- 그리드테이블 -->
                    <div class="grid_tbl">       
                        <table style="width:100%; height:318px; background-image:url('./img/sam.gif');">
                            <tr>
                                <td>
                                    <table id="cmCd_tblCodetype"></table>
                                    <div id="cmCd_pagingCodetype"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--"그리드테이블"-->

                    <!-- 버튼 테이블 -->
                    <table class="info_tbl_btn">
                        <tr>
                            <th></th>
                            <td>
                                <button type="button" id="cmCd_btnAddCodetype" class="button">추가</button>
                                <button type="button" id="cmCd_btnModCodetype" class="button">수정</button>
                                <button type="button" id="cmCd_btnInitCodetype" class="button">초기화</button>
                            </td>
                        </tr>
                    </table>
                    <!--"버튼 테이블"-->

                    <table class="profile_tbl">
                        <tr>
                            <td class="line_rt">코드타입</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_tp_cd" maxlength="6" onkeydown="return onlyNumber(event)">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">코드타입명</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_tp_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">사용여부</td>
                            <td class="line_b">
                                <input type="radio" class="radio" name="rdCodetype_use_yn" id="rdCodetype_use_yn_y" value="Y" checked="checked"><label for="rdCodetype_use_yn_y">사용</label>
                                <input type="radio" name="rdCodetype_use_yn" id="rdCodetype_use_yn_n" value="N"><label for="rdCodetype_use_yn_n">미사용</label>
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">매니저권한부여</td>
                            <td class="line_b">
                                <input type="radio"  class="radio"name="tfCodetype_ext9_nm" id="tfCodetype_ext9_nm_y" value="Y" checked="checked"><label for="tfCodetype_ext9_nm_y">사용</label>
                                <input type="radio" name="tfCodetype_ext9_nm" id="rtfCodetype_ext9_nm_n" value="N" checked="checked"><label for="rtfCodetype_ext9_nm_n">미사용</label>
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드명1</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_ext1_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드명2</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_ext2_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드명3</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_ext3_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드명4</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_ext4_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드명5</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_ext5_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드명6</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_ext6_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드명7</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_ext7_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rb">확장코드명8</td>
                            <td class="line_wb">
                                <input type="text" class="text_ol" id="cmCd_tfCodetype_ext8_nm" maxlength="20">
                            </td>
                        </tr>
                    </table>
                </div>
                <!--"왼쪽그리드"-->

                <!--오른쪽그리드-->
                <div id="code_admin_right">
       
                    <!--타이틀-->
                    <div class="stitle">
                        상세코드명
                    </div>
                    <!--"타이틀"-->

                    <!-- 미사용/버튼 테이블 -->
                    <table class="info_tbl">
                        <tr>
                            <th></th>
                            <td>
                                <input type="checkbox" class="checkbox" id="cmCd_chkNotUseCode"><label for="chkNotUseCode">미사용 포함</label>
                            </td>
                        </tr>
                    </table>
                    <!--"미사용/버튼 테이블"-->

                    <!-- 그리드테이블 -->
                    <div class="grid_tbl">       
                        <table style="width:100%; height:318px; background-image:url('./img/sam.gif');">
                            <tr>
                                <td>
                                    <table id="cmCd_tblCode"></table>
                                    <div id="cmCd_pagingCode"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--"그리드테이블"-->

                    <!-- 버튼 테이블 -->
                    <table class="info_tbl_btn">
                        <tr>
                            <th></th>
                            <td>
                                <button type="button" id="cmCd_btnAddCode" class="button">추가</button>
                                <button type="button" id="cmCd_btnModCode" class="button">수정</button>
                                <button type="button" id="cmCd_btnInitCode" class="button">초기화</button>
                            </td>
                        </tr>
                    </table>
                    <!--"버튼 테이블"-->

                    <table class="profile_tbl">
                        <tr>
                            <td class="line_rt">코드</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCode_cd" maxlength="6" onkeydown="return onlyNumber(event)">
                            </td>
                            <td class="line_c">코드명</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCode_cd_nm" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">순서</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCode_cd_seq" maxlength="3" onkeydown="return onlyNumber(event)">
                            </td>
                            <td class="line_c">사용여부</td>
                            <td class="line_b">
                                <input type="radio" class="radio" name="rdCode_use_yn" id="rdCode_use_yn_y" value="Y" checked="checked"><label for="rdCode_use_yn_y">사용</label>
                                <input type="radio" name="rdCode_use_yn" id="rdCode_use_yn_n" value="N"><label for="rdCode_use_yn_n">미사용</label>
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">부모타입</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCode_parnt_tp_cd" maxlength="10" onkeydown="return onlyNumber(event)">
                            </td>
                            <td class="line_c">부모코드</td>
                            <td class="line_b">
                                <input type="text" class="text_ol" id="cmCd_tfCode_parnt_cd" maxlength="10" onkeydown="return onlyNumber(event)">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드1</td>
                            <td class="line_b" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext1_cd" maxlength="40">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드2</td>
                            <td class="line_b" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext2_cd" maxlength="40">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드3</td>
                            <td class="line_b" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext3_cd" maxlength="40">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드4</td>
                            <td class="line_b" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext4_cd" maxlength="40">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드5</td>
                            <td class="line_b" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext5_cd" maxlength="40">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드6</td>
                            <td class="line_b" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext6_cd" maxlength="40">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드7</td>
                            <td class="line_b" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext7_cd" maxlength="40">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">확장코드8</td>
                            <td class="line_b" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext8_cd" maxlength="40">
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rb">확장코드9</td>
                            <td class="line_wb" colspan="3">
                                <input type="text" class="text_ol" id="cmCd_tfCode_ext9_cd" maxlength="40">
                            </td>
                        </tr>
                    </table>
                </div>
                <!--"오른쪽그리드"-->
            </div>
            <!--"그리드"-->
        </div>
        <!--"BODY"-->
    </body>
</html>