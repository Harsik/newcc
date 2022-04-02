package kr.co.twoksystem.view;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.stereotype.Repository;

@Repository("CampaginExcelDownloadView")
public class CampaginExcelDownloadView extends AbstractExcelViewXssf
{
	private XSSFSheet hssfSheet;
	private XSSFSheet hssfSheet2;
//	private XSSFSheet hssfSheet3;
	private XSSFRow hssfRow;
	private XSSFRow hssfRow2;
//	private XSSFRow hssfRow3;
	private XSSFCell hssfCell;
	private XSSFCell hssfCell2;
//	private XSSFCell hssfCell3;
	
	private XSSFFont styleCmpgHeaderFont;						// 캠페인헤더폰트
	private XSSFFont styleCommonFont;							// 일반 폰트
	
	private XSSFCellStyle styleCmpgHeader;					// 캠페인헤더 셀서식
	private XSSFCellStyle styleCommon;						// 일반 셀서식
	private XSSFCellStyle styleQstHeaderLeft;					// 캠페인헤더 좌측정렬 셀서식
	private XSSFCellStyle styleQstHeaderCenter;				// 캠페인헤더 가운데정렬 셀서식
	private XSSFCellStyle styleQstLeft;						// 캠페인헤더 좌측정렬 셀서식
	private XSSFCellStyle styleQstCenter;						// 캠페인헤더 가운데정렬 셀서식
	private XSSFCellStyle styleQstRight;						// 캠페인헤더 우측정렬 셀서식
	
	@Override
	protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook, HttpServletRequest req, HttpServletResponse res) throws Exception
	{
		List<?> cmpgInfo = (List<?>)modelMap.get("cmpgInfo");
		List<?> qstInfo = (List<?>)modelMap.get("qstInfo");
		List<?> shrtQstInfo = (List<?>)modelMap.get("shrtQstInfo");
		List<?> cmpgCustInfo = (List<?>)modelMap.get("cmpgCustInfo");
		List<?> ansInfo = (List<?>)modelMap.get("ansInfo");
		
		String excelFileName = URLEncoder.encode("캠페인결과통계", "utf-8");		// 실제파일이름
		
		// 스타일 셋팅
		this.setStyle(workbook);

		// 엑셀파일 생성
		this.createExcel(workbook, cmpgInfo, qstInfo, shrtQstInfo, cmpgCustInfo, ansInfo);
		
		// 작성된 파일 다운로드
		this.tempFileDownload(workbook, res, excelFileName);
	}
	
	// 시트 스타일 생성
	private void setStyle(Workbook workbook)
	{
		// 캠페인 헤더 글자 서식
		styleCmpgHeaderFont = (XSSFFont)workbook.createFont();
		styleCmpgHeaderFont.setFontHeightInPoints((short)11);
		styleCmpgHeaderFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		styleCmpgHeaderFont.setFontName("맑은 고딕");

		// 캠페인 글자 서식
		styleCommonFont = (XSSFFont)workbook.createFont();
		styleCommonFont.setFontHeightInPoints((short)11);
		styleCommonFont.setFontName("맑은 고딕");
		
		// 캠페인 헤더 셀 서식
		styleCmpgHeader = (XSSFCellStyle)workbook.createCellStyle();
		styleCmpgHeader.setAlignment(XSSFCellStyle.ALIGN_CENTER);
		styleCmpgHeader.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleCmpgHeader.setFont(styleCmpgHeaderFont);
		styleCmpgHeader.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleCmpgHeader.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleCmpgHeader.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleCmpgHeader.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		styleCmpgHeader.setFillPattern((short) 1);
		styleCmpgHeader.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);

		// 캠페인 셀 서식
		styleCommon = (XSSFCellStyle)workbook.createCellStyle();
		styleCommon.setAlignment(XSSFCellStyle.ALIGN_LEFT);
		styleCommon.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleCommon.setFont(styleCommonFont);
		styleCommon.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleCommon.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleCommon.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleCommon.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		styleCommon.setWrapText(true);
		
		// 질문 헤더 셀 서식(좌측정렬)
		styleQstHeaderLeft = (XSSFCellStyle)workbook.createCellStyle();
		styleQstHeaderLeft.setAlignment(XSSFCellStyle.ALIGN_LEFT);
		styleQstHeaderLeft.setFont(styleCmpgHeaderFont);
		styleQstHeaderLeft.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleQstHeaderLeft.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleQstHeaderLeft.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleQstHeaderLeft.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		
		// 질문 헤더 셀 서식(가운데정렬)
		styleQstHeaderCenter = (XSSFCellStyle)workbook.createCellStyle();
		styleQstHeaderCenter.setAlignment(XSSFCellStyle.ALIGN_CENTER);
		styleQstHeaderCenter.setFont(styleCmpgHeaderFont);
		styleQstHeaderCenter.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleQstHeaderCenter.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleQstHeaderCenter.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleQstHeaderCenter.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		
		// 질문 셀 서식(좌측정렬)
		styleQstLeft = (XSSFCellStyle)workbook.createCellStyle();
		styleQstLeft.setAlignment(XSSFCellStyle.ALIGN_LEFT);
		styleQstLeft.setFont(styleCommonFont);
		styleQstLeft.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleQstLeft.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleQstLeft.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleQstLeft.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		
		// 질문 셀 서식(가운데정렬)
		styleQstCenter = (XSSFCellStyle)workbook.createCellStyle();
		styleQstCenter.setAlignment(XSSFCellStyle.ALIGN_CENTER);
		styleQstCenter.setFont(styleCommonFont);
		styleQstCenter.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleQstCenter.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleQstCenter.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleQstCenter.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		
		// 질문 셀 서식(우측정렬)
		styleQstRight = (XSSFCellStyle)workbook.createCellStyle();
		styleQstRight.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
		styleQstRight.setFont(styleCommonFont);
		styleQstRight.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleQstRight.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleQstRight.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleQstRight.setBorderLeft(XSSFCellStyle.BORDER_THIN);
	}
	
	// 엑셀파일 생성
	@SuppressWarnings("unchecked")
	private void createExcel(Workbook workbook, List<?> cmpgInfo, List<?> qstInfo, List<?> shrtQstInfo, List<?> cmpgCustInfo, List<?> ansInfo) throws UnsupportedEncodingException
	{
		hssfSheet = null;		// 시트1
		hssfSheet2 = null;		// 시트2
//		hssfSheet3 = null;		// 시트3
		hssfRow = null;			// 행
		hssfRow2 = null;		// 행2
//		hssfRow3 = null;		// 행3
		hssfCell = null;		// 열
		hssfCell2 = null;		// 열2
//		hssfCell3 = null;		// 열3
		
		HashMap<String, String> cmpg = (HashMap<String, String>)cmpgInfo.get(0); // 캠페인 정보
		
		// 캠페인 서식
		XSSFCellStyle cmpgStyleArr[][] =
		{
				{ styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon, styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon }
				, { styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon, styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon }
				, { styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon, styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon }
				, { styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon, styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon }
				, { styleCmpgHeader, styleCmpgHeader, styleCommon, styleCommon, styleCommon, styleCommon, styleCommon, styleCommon, styleCommon, styleCommon }
		};
		
		// 캠페인 내용
		String cmpgValueArr[][] =
		{
				{ "캠페인아이디", null, String.valueOf(cmpg.get("CMPG_ID")), null, null, "캠페인명", null, String.valueOf(cmpg.get("CMPG_NM")), null, null }
				, { "기간", null, String.valueOf(cmpg.get("STRT_DT")) + " ~ " + String.valueOf(cmpg.get("END_DT")), null, null, "유형", null, String.valueOf(cmpg.get("CMPG_TYPE_CD")), null, null }
				, { "진행상태", null, String.valueOf(cmpg.get("PROC_ST")), null, null, "대상자수", null, String.valueOf(cmpg.get("TRGT_CUST_CNT")), null, null }
				, { "응답자수", null, String.valueOf(cmpg.get("COMCNT")), null, null, "응답률", null, Math.round( ( Float.parseFloat(String.valueOf(cmpg.get("COMCNT"))) / Float.parseFloat(String.valueOf(cmpg.get("TRGT_CUST_CNT"))) ) * 10000 ) / 100.0 + "%", null, null }
				, { "캠페인소개", null, String.valueOf(cmpg.get("CMPG_DSC")), null, null, null, null, null, null, null }
		};
		
/*		
		String cmpgValueArr[][] =
		{
				{ "캠페인아이디", null, String.valueOf(cmpg.get("CMPG_ID")), null, null, "유형", null, String.valueOf(cmpg.get("CMPG_TYPE_CD")), null, null }
				, { "기간", null, String.valueOf(cmpg.get("STRT_DT")) + " ~ " + String.valueOf(cmpg.get("END_DT")), null, null, "진행상태", null, String.valueOf(cmpg.get("PROC_ST")), null, null }
				, { "대상자수", null, String.valueOf(cmpg.get("TRGT_CUST_CNT")), null, null, "응답자수", null, String.valueOf(cmpg.get("COMCNT")), null, null }
				, { null, null, null, null, null, "응답률", null, Math.round( ( Float.parseFloat(String.valueOf(cmpg.get("COMCNT"))) / Float.parseFloat(String.valueOf(cmpg.get("TRGT_CUST_CNT"))) ) * 10000 ) / 100.0 + "%", null, null }
				, { "캠페인소개", null, String.valueOf(cmpg.get("CMPG_DSC")), null, null, null, null, null, null, null }
		};
*/		
		
		// 문항 명 컬럼
		String cmpgQstNmArr[] = { "캠페인문항", null, null, null, null, null, null, null, "응답건수", "응답률" };
		// 시트1 문항 헤더 서식
		XSSFCellStyle qstHeaderStyleArr[] = { styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderCenter, styleQstHeaderCenter };
		// 시트1 문항 서식
		XSSFCellStyle qstStyleArr[] = { styleQstRight, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstCenter, styleQstCenter };
		
		// sheet2 답변 명 컬럼
		String ansNmArr[] = { "고객명", "핸드폰번호", "전화번호", "상태", "응답일시" };
		// sheet2 명 컬럼 내용
		String ansValueArr[] = { "CUST_NM", "HPTEL_NO", "TEL_NO", "PROC_ST", "CRT_DT_FORMAT" };
		
		// 시트3 문항 명 컬럼
//		String cmpgQstNmArr3[] = { "주관식목록", null, null, null, null, null, null, null, null, null };
		// 시트3 문항 헤더 서식
//		XSSFCellStyle qstHeaderStyleArr3[] = { styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft, styleQstHeaderLeft };
		// 시트3 문항 서식
//		XSSFCellStyle qstStyleArr3[] = { styleQstRight, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft, styleQstLeft }; 
		
		// 시트 이름
		String title = URLDecoder.decode(URLEncoder.encode("캠페인통계", "utf-8"), "utf-8");
		String title2 = URLDecoder.decode(URLEncoder.encode("답변목록", "utf-8"), "utf-8");
//		String title3 = URLDecoder.decode(URLEncoder.encode("주관식목록", "utf-8"), "utf-8");
		
		// 시트 생성
		hssfSheet = (XSSFSheet)workbook.createSheet(title);
		hssfSheet2 = (XSSFSheet)workbook.createSheet(title2);
		/*hssfSheet3 = (XSSFSheet)workbook.createSheet(title3);*/
		
		int cmpgEndRow = 5;
		
		// 캠페인 생성
		for(int i = 1; i <= cmpgEndRow; i++)
		{
			hssfRow = hssfSheet.createRow(i);
			
			for(int j = 1; j <= 10; j++)
			{
				hssfCell = hssfRow.createCell(j);
				hssfCell.setCellStyle(cmpgStyleArr[i-1][j-1]);
				hssfCell.setCellValue(cmpgValueArr[i-1][j-1]);
			}
			
			if(i == cmpgEndRow)
			{
				String[] dscSplit = String.valueOf(cmpg.get("CMPG_DSC")).split("\\n");
				hssfRow.setHeightInPoints(dscSplit.length * 19);
				hssfSheet.addMergedRegion(new CellRangeAddress(cmpgEndRow, cmpgEndRow, 1, 2));
				hssfSheet.addMergedRegion(new CellRangeAddress(cmpgEndRow, cmpgEndRow, 3, 10));
			}
			else
			{
				hssfSheet.addMergedRegion(new CellRangeAddress(i, i, 1, 2));
				hssfSheet.addMergedRegion(new CellRangeAddress(i, i, 3, 5));
				hssfSheet.addMergedRegion(new CellRangeAddress(i, i, 6, 7));
				hssfSheet.addMergedRegion(new CellRangeAddress(i, i, 8, 10));	
			}
		}
		
		int qstCnt = 7;  // 로우 값
		int qstNum = 0; // 질문 번호
		int ansNum = 1; // 답변 번호
		String crtQstSeq = "";	// 질문 고유값
		List<Integer> qstRow = new ArrayList<Integer>(); // 문항 로우 값
		List<String> qstSeq = new ArrayList<String>(); // 문항 시퀀스 값
		
		// 문항 생성
		hssfRow = hssfSheet.createRow(qstCnt);
		for(int i = 1; i <= 10; i++)
		{
			hssfCell = hssfRow.createCell(i);
			hssfCell.setCellStyle(styleCmpgHeader);
			hssfCell.setCellValue(cmpgQstNmArr[i-1]);
		}
		
		hssfSheet.addMergedRegion(new CellRangeAddress(qstCnt, qstCnt, 1, 8));
		
		// 문항 값 넣는 부분
		for(int i = 0; i < qstInfo.size(); i++)
		{
			HashMap<String, String> qst = (HashMap<String, String>)qstInfo.get(i);
			
			if(crtQstSeq.equals(String.valueOf(qst.get("QST_SEQ"))))
			{
				qstCnt += 1;
				ansNum++;
			}
			else
			{
				qstCnt += 2;
				qstRow.add(qstCnt - 1);
				qstNum++;
				ansNum = 1;
				crtQstSeq = String.valueOf(qst.get("QST_SEQ"));
				
				hssfRow = hssfSheet.createRow(qstCnt-1);
				
				for( int j = 1; j <= 10; j++)
				{
					hssfCell = hssfRow.createCell(j);
					hssfCell.setCellStyle(qstHeaderStyleArr[j-1]);
				}
				
				//문항 번호
				hssfCell = hssfRow.getCell(1);
				hssfCell.setCellValue(String.valueOf("문항 " + qstNum));
				//질문
				hssfCell = hssfRow.getCell(2);
				hssfCell.setCellValue(String.valueOf(qst.get("QST_NM")));
				//응답건수
				hssfCell = hssfRow.getCell(9);
				hssfCell.setCellValue(String.valueOf(qst.get("COMCNT")));
				//hssfCell.setCellValue(String.valueOf(qst.get("SELECTCNT")));
				hssfSheet.addMergedRegion(new CellRangeAddress(qstCnt-1, qstCnt-1, 2, 8));
				
				//응답률 (질문 문항 제목 옆에 들어가는 퍼센트)
				double perCnt = Math.round( ( Float.parseFloat(String.valueOf(qst.get("COMCNT"))) / Float.parseFloat(String.valueOf(cmpg.get("TRGT_CUST_CNT"))) ) * 10000 ) / 100.0;
				//double perCnt = Math.round( ( Float.parseFloat(String.valueOf(qst.get("COMCNT"))) / Float.parseFloat(String.valueOf(qst.get("SELECTCNT"))) ) * 10000 ) / 100.0;		
				//double perCnt = Math.round( ( Float.parseFloat(String.valueOf(qst.get("CMPLCNT"))) / Float.parseFloat(String.valueOf(qst.get("COMCNT"))) ) * 10000 ) / 100.0;
				hssfCell = hssfRow.getCell(10);
				hssfCell.setCellValue(perCnt + "%");
				
				qstSeq.add(String.valueOf(qst.get("QST_SEQ")));
			}
			
			hssfRow = hssfSheet.createRow(qstCnt);
			
			for( int j = 1; j <= 10; j++)
			{
				hssfCell = hssfRow.createCell(j);
				hssfCell.setCellStyle(qstStyleArr[j-1]);
			}
			
			//문항 예시 번호
			hssfCell = hssfRow.getCell(1);
			hssfCell.setCellValue(String.valueOf(ansNum));
			//문항 예시 답변
			hssfCell = hssfRow.getCell(2);
			hssfCell.setCellValue(String.valueOf(qst.get("ANS_NM")));
			//문항 예시 답변 건수
			hssfCell = hssfRow.getCell(9);
			hssfCell.setCellValue(String.valueOf(qst.get("CMPLCNT")));
			//hssfCell.setCellValue(String.valueOf(qst.get("SELECTCNT")));
			hssfSheet.addMergedRegion(new CellRangeAddress(qstCnt, qstCnt, 2, 8));
			
			//문항 예시 응답률
			//double perCnt = Math.round( ( Float.parseFloat(String.valueOf(qst.get("CMPLCNT"))) / Float.parseFloat(String.valueOf(cmpg.get("TRGT_CUST_CNT"))) ) * 10000 ) / 100.0;
			double perCnt = Math.round( ( Float.parseFloat(String.valueOf(qst.get("CMPLCNT"))) / Float.parseFloat(String.valueOf(qst.get("COMCNT"))) ) * 10000 ) / 100.0;
			//double perCnt = Math.round( ( Float.parseFloat(String.valueOf(qst.get("SELECTCNT"))) / Float.parseFloat(String.valueOf(qst.get("CMPLCNT"))) ) * 10000 ) / 100.0;
			hssfCell = hssfRow.getCell(10);
			hssfCell.setCellValue(perCnt + "%");
		}
		
		// 시트2 데이터 넣는 부분
		qstCnt = 1;
		// 답변 항목 명 입력
		hssfRow2 = hssfSheet2.createRow(qstCnt);
		for( int i = 1; i <= ansNmArr.length; i++ )
		{
			hssfCell2 = hssfRow2.createCell(i);
			hssfCell2.setCellValue(ansNmArr[i-1]);
			hssfCell2.setCellStyle(styleCmpgHeader);
		}
		for( int i = 1; i <= qstNum; i++)
		{
			hssfCell2 = hssfRow2.createCell(ansNmArr.length + i);
			hssfCell2.setCellValue("문항 " + i);
			hssfCell2.setCellStyle(styleCmpgHeader);
		}
		
		// 답변 내용 입력
		for(int i = 0; i < cmpgCustInfo.size(); i++)
		{
			HashMap<String, String> cmpgCust = (HashMap<String, String>)cmpgCustInfo.get(i);
			
			qstCnt++;
			hssfRow2 = hssfSheet2.createRow(qstCnt);
			for( int j = 0; j < ansNmArr.length+qstNum; j++ )
			{
				hssfCell2 = hssfRow2.createCell(j + 1);
				if( j < ansNmArr.length ) // 고객 정보 부분
				{
					hssfCell2.setCellValue(cmpgCust.get(ansValueArr[j]));
					//if( j == 0)
					//	hssfCell2.setCellStyle(styleQstRight);
					//else
						hssfCell2.setCellStyle(styleQstCenter);
				}
				else // 답변 문항 부분
				{
					for( int n = 0; n < ansInfo.size(); n++ )
					{
						HashMap<String, String> ans = (HashMap<String, String>)ansInfo.get(n);
						if( String.valueOf(cmpgCust.get("CMPG_CUST_SEQ")).equals(String.valueOf(ans.get("CMPG_CUST_SEQ"))) && qstSeq.get(j-ansNmArr.length).equals(String.valueOf(ans.get("QST_SEQ"))) )
						{
							if(ans.get("ANS_CNTN") != null)
								//hssfCell2.setCellValue(ans.get("ANS_CNTN"));
								hssfCell2.setCellValue(String.valueOf(ans.get("ANS_CNTN")));
							else
								hssfCell2.setCellValue(String.valueOf(ans.get("ANS_NO")));
							ans.remove(n);
						}
					}
					hssfCell2.setCellStyle(styleQstLeft);
				}
			}
		}
		for( int j = 0; j < ansNmArr.length+qstNum; j++ )
		{
			hssfSheet2.autoSizeColumn(j);
		}
		// 시트2 끝
		/*
		// 시트3 시작
		// 주관식 시트 시작
		int strtRowNum = 1;        // 주관식 로우 숫자
		String crtShrtQstSeq = "";  // 문제 고유 값
		
		// 주관식 문항 생성
		hssfRow3 = hssfSheet3.createRow(strtRowNum);
		for(int i = 1; i <= 2; i++)
		{
			hssfCell3 = hssfRow3.createCell(i);
			hssfCell3.setCellStyle(styleCmpgHeader);
			hssfCell3.setCellValue(cmpgQstNmArr3[i-1]);
		}
		hssfSheet3.addMergedRegion(new CellRangeAddress(strtRowNum, strtRowNum, 1, 2));
		// 시트3 데이터 넣는 부분
		for(int i = 0; i < shrtQstInfo.size(); i++)
		{
			HashMap<String, String> shrtQst = (HashMap<String, String>)shrtQstInfo.get(i);
			
			if(crtShrtQstSeq.equals(String.valueOf(shrtQst.get("QST_SEQ"))))
				strtRowNum += 1;
			else
			{
				strtRowNum += 2;
				crtShrtQstSeq = String.valueOf(shrtQst.get("QST_SEQ"));
				
				hssfRow3 = hssfSheet3.createRow(strtRowNum-1);
				
				for( int j = 1; j <= 2; j++)
				{
					hssfCell3 = hssfRow3.createCell(j);
					hssfCell3.setCellStyle(qstHeaderStyleArr3[j-1]);
				}
				
				hssfCell3 = hssfRow3.getCell(1);
				hssfCell3.setCellValue(String.valueOf("문항 " + String.valueOf(shrtQst.get("QST_NO"))));
				hssfCell3 = hssfRow3.getCell(2);
				hssfCell3.setCellValue(String.valueOf(shrtQst.get("QST_NM")));
			}
			
			hssfRow3 = hssfSheet3.createRow(strtRowNum);
			
			for( int j = 1; j <= 2; j++)
			{
				hssfCell3 = hssfRow3.createCell(j);
				hssfCell3.setCellStyle(qstStyleArr3[j-1]);
			}
			
			hssfCell3 = hssfRow3.getCell(2);
			hssfCell3.setCellValue(String.valueOf(shrtQst.get("ANS_CNTN")));
		}
		hssfSheet3.autoSizeColumn(2); // 컬럼 사이즈 오토로 설정
		// 시트3 끝
		*/
	}
	
	// 생성된 엑셀파일 다운로드 메소드
	private void tempFileDownload(Workbook workbook, HttpServletResponse response, String ps_file) throws Exception
	{
		response.setContentType("Application/Msexcel");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + ps_file + "_" + this.getSystemDate("yyyyMMdd") + ".xlsx\";");
    }
	
	// 현재 날짜 가져옴
	private String getSystemDate(String ps_fmt)
	{
        SimpleDateFormat fileFormat = new SimpleDateFormat(ps_fmt);
        return fileFormat.format(new Date());
    }
}