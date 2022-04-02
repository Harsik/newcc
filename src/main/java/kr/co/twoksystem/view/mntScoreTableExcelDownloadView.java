package kr.co.twoksystem.view;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.stereotype.Repository;

import com.ibm.icu.math.BigDecimal;

@Repository("mntScoreTableExcelDownloadView")
public class mntScoreTableExcelDownloadView extends AbstractExcelViewXssf
{
	private XSSFSheet hssfSheet;
	private XSSFRow hssfRow;
	private XSSFCell hssfCell;
	
	private XSSFFont styleTitleFont;				  // 타이틀폰트
	private XSSFFont styleAgentFont;				  // 상담사폰트
	private XSSFFont styleHeaderFont;               // 헤더폰트
	private XSSFFont styleCommonFont;               // 일반 폰트
	
	private XSSFCellStyle styleTitle;	              // 타이틀 셀 스타일
	private XSSFCellStyle styleAgent;	              // 상담사 셀 스타일
	private XSSFCellStyle styleHeader;             // 헤더 셀 스타일
	private XSSFCellStyle styleCommonLeft;         // 일반 셀 스타일 - align left
	private XSSFCellStyle styleCommonCenter;       // 일반 셀 스타일 - align center
	private XSSFCellStyle styleCommonRight;		  // 일반 셀 스타일 - align right
	
	@SuppressWarnings("unchecked")
	@Override
	protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook, HttpServletRequest req, HttpServletResponse res) throws Exception
	{

	    HashMap<String, Object> param1 = (HashMap<String, Object>)modelMap.get("param1");	             // 파라미터1
		ArrayList<?> dataSet1 = (ArrayList<Object>)modelMap.get("result1");							 // 데이터1
		
        HashMap<String, Object> param2 = (HashMap<String, Object>)modelMap.get("param2");             // 파라미터2
        ArrayList<?> dataSet2 = (ArrayList<Object>)modelMap.get("result2");                          // 데이터2
        
        //엑셀파일 헤더
		String excelFileName = URLEncoder.encode((String)(param1.get("title")), "utf-8");		// 실제파일이름
		//String title = URLDecoder.decode(excelFileName, "utf-8");								// 코드에서 사용하기 위한 파일이름
		
		// 스타일 셋팅
		this.setStyle(workbook);
		
		// 엑셀파일 생성
		this.createExcel(workbook, param1, dataSet1, param2, dataSet2);
		
		// 작성된 파일 다운로드
		this.tempFileDownload(workbook, res, excelFileName);
	}
	
	// 엑셀파일 width 계산
	private int calcColumnWidth(int pi_width)
	{
		if (pi_width > 254)
			return 65280;
		
		if (pi_width > 1)
		{
			int li_floor = (int) (Math.floor(((double)pi_width) / 5));
			int li_factor = 30 * li_floor;
			int li_value = 450 + li_factor + ((pi_width - 1) * 250);
			return li_value;
		}
		else
		{
			return 450;
		}
    }
	
	// 시트 스타일 생성
	@SuppressWarnings("static-access")
	private void setStyle(Workbook workbook)
	{
		// Font Style - title
		styleTitleFont = (XSSFFont)workbook.createFont();
		styleTitleFont.setFontHeightInPoints((short)20);
		styleTitleFont.setFontName("맑은 고딕");
		
		styleAgentFont = (XSSFFont)workbook.createFont();
		styleAgentFont.setFontHeightInPoints((short)10);
		styleAgentFont.setBoldweight((short)styleTitleFont.BOLDWEIGHT_BOLD);
		styleAgentFont.setFontName("맑은 고딕");
		
		// Font Style - header
		styleHeaderFont = (XSSFFont)workbook.createFont();
		styleHeaderFont.setFontHeightInPoints((short)10);
		styleHeaderFont.setBoldweight((short)styleTitleFont.BOLDWEIGHT_BOLD);
		styleHeaderFont.setFontName("맑은 고딕");
		
		// Font Style - common
		styleCommonFont = (XSSFFont)workbook.createFont();
		styleCommonFont.setFontHeightInPoints((short)10);
		styleCommonFont.setFontName("맑은 고딕");

		// Cell Style - title
		styleTitle = (XSSFCellStyle)workbook.createCellStyle();
		styleTitle.setAlignment(XSSFCellStyle.ALIGN_CENTER);
		styleTitle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleTitle.setFont(styleTitleFont);
		
		// Cell Style - styleAgent
		styleAgent = (XSSFCellStyle)workbook.createCellStyle();
		styleAgent.setAlignment(XSSFCellStyle.ALIGN_LEFT);
		styleAgent.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleAgent.setFont(styleAgentFont);
		
		// Cell Style - header
		styleHeader = (XSSFCellStyle)workbook.createCellStyle();
		styleHeader.setAlignment(XSSFCellStyle.ALIGN_CENTER);
		styleHeader.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleHeader.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleHeader.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		styleHeader.setBorderRight(XSSFCellStyle.BORDER_THIN);
		//styleHeader.setBorderBottom(XSSFCellStyle.BORDER_DOUBLE);
		styleHeader.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleHeader.setFillPattern((short) 1);
		styleHeader.setFillForegroundColor(HSSFColor.PALE_BLUE.index);
		styleHeader.setFont(styleHeaderFont);

		// Cell Style - common left
		styleCommonLeft = (XSSFCellStyle)workbook.createCellStyle();
		styleCommonLeft.setAlignment(XSSFCellStyle.ALIGN_LEFT);
		styleCommonLeft.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleCommonLeft.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleCommonLeft.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		styleCommonLeft.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleCommonLeft.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleCommonLeft.setWrapText(true);       // 자동줄바꿈
		styleCommonLeft.setFont(styleCommonFont);
		
		// Cell Style - common center
		styleCommonCenter = (XSSFCellStyle)workbook.createCellStyle();
		styleCommonCenter.setAlignment(XSSFCellStyle.ALIGN_CENTER);
		styleCommonCenter.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleCommonCenter.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleCommonCenter.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		styleCommonCenter.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleCommonCenter.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleCommonCenter.setWrapText(true);       // 자동줄바꿈
		styleCommonCenter.setFont(styleCommonFont);
		
		// Cell Style - common right
		styleCommonRight = (XSSFCellStyle)workbook.createCellStyle();
		styleCommonRight.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
		styleCommonRight.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleCommonRight.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleCommonRight.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		styleCommonRight.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleCommonRight.setBorderBottom(XSSFCellStyle.BORDER_THIN);		
		styleCommonRight.setWrapText(true);       // 자동줄바꿈
		styleCommonRight.setFont(styleCommonFont);
	}
	
	// 엑셀파일 생성
	@SuppressWarnings("unchecked")
	private void createExcel(Workbook workbook, HashMap<String, Object> param1, ArrayList<?> data1, HashMap<String, Object> param2, ArrayList<?> data2) throws UnsupportedEncodingException
	{
		hssfSheet = null;
		hssfRow = null;
		hssfCell = null;
		int rowNum = 0;
		
		ArrayList<Integer> colwidth1 = (ArrayList<Integer>)param1.get("colWidth");
		ArrayList<String> colName1 = (ArrayList<String>)param1.get("colName");
		ArrayList<String> colHeader1 = (ArrayList<String>)param1.get("colHeader");
		ArrayList<String> colAlign1 = (ArrayList<String>)param1.get("colAlign");
		String title = URLDecoder.decode(URLEncoder.encode((String)(param1.get("title")), "utf-8"), "utf-8");
		
        ArrayList<Integer> colwidth2 = (ArrayList<Integer>)param2.get("colWidth");
        ArrayList<String> colName2 = (ArrayList<String>)param2.get("colName");
        ArrayList<String> colHeader2 = (ArrayList<String>)param2.get("colHeader");
        ArrayList<String> colAlign2 = (ArrayList<String>)param2.get("colAlign");
		 
		//int rowNumHdr = 0;
		
		try 
		{
    		// 시트 생성
    		hssfSheet = (XSSFSheet)workbook.createSheet(title);
    		
    		// 컬럼 넓이 설정
    		for(int i = 0; i < colwidth1.size(); i++)
    			hssfSheet.setColumnWidth(i + 1, calcColumnWidth(colwidth1.get(i)));
    		
    		// title row 생성  ***************************
    		hssfRow = hssfSheet.createRow(++rowNum);
    		hssfRow.setHeight((short)700);
    		
    		// title 셀 병합 범위 설정
    		if (colwidth1.size() > colwidth2.size())
    		    hssfSheet.addMergedRegion(new CellRangeAddress(rowNum, rowNum, 1, colwidth1.size()));
    		else
    		    hssfSheet.addMergedRegion(new CellRangeAddress(rowNum, rowNum, 1, colwidth2.size()));
    		
    		//rowNumHdr = rowNum;
    		
    		// title 셀생성
    		hssfCell = hssfRow.createCell(1);
    		hssfCell.setCellStyle(styleTitle);
    		hssfCell.setCellValue(new XSSFRichTextString(title));
    		
    		for(int i = 2; i <= colwidth1.size(); i++)
    			hssfCell = hssfRow.createCell(i);
			
    		// AGENT과 본문 사이 빈 row 생성
    		hssfRow = hssfSheet.createRow(++rowNum);
    		
    		// header 생성
    		hssfRow = hssfSheet.createRow(++rowNum);
    		hssfRow.setHeight((short)500);
    		
    		for(int i = 1; i <= colHeader1.size(); i++)
    		{
    			hssfCell = hssfRow.createCell(i);
    			hssfCell.setCellStyle(styleHeader);
    			hssfCell.setCellValue(new XSSFRichTextString(colHeader1.get(i - 1)));
    		}
    		
    		// data 생성
    		for(int i = 0; i < data1.size(); i++)
    		{
    			hssfRow = hssfSheet.createRow(++rowNum);
    			hssfRow.setHeight((short)400);
    			
    			HashMap<String, Object> rowData1 = (HashMap<String, Object>)data1.get(i);
    			
    			for(int j = 1; j <= colName1.size(); j++)
    			{
    				/*String tmp = (String)rowData.get(colName.get(j - 1));*/
    				
    				String tmp = String.valueOf(rowData1.get(colName1.get(j - 1)));
    				
    				if (tmp == "null") {
    				    tmp = "";
    				    //continue;
    				}
    				
    				hssfCell = hssfRow.createCell(j);
    				
    				if(colAlign1 == null) {
    					hssfCell.setCellStyle(styleCommonCenter);
    				} else if(((String)colAlign1.get(j - 1)).equals("left")) {
    					hssfCell.setCellStyle(styleCommonLeft);
    				} else if(((String)colAlign1.get(j - 1)).equals("right")) {
    					hssfCell.setCellStyle(styleCommonRight);
    				} else {
    					hssfCell.setCellStyle(styleCommonCenter);
    				}
    				
    				if(StringUtils.isNumeric(tmp) && StringUtils.isNotBlank(tmp)) {
    					hssfCell.setCellType(Cell.CELL_TYPE_NUMERIC);
    					hssfCell.setCellValue(new BigDecimal(tmp).doubleValue());
    				} else {
    					hssfCell.setCellValue(new XSSFRichTextString(tmp));
    				}
    			}
    		}
    		

    		
            try 
            {
                // 시트 생성
                //hssfSheet = (XSSFSheet)workbook.createSheet(title);
                
                // 컬럼 넓이 설정
                for(int i = 0; i < colwidth2.size(); i++)
                    hssfSheet.setColumnWidth(i + 1, calcColumnWidth(colwidth2.get(i)));
                
                // title row 생성  ***************************
                hssfRow = hssfSheet.createRow(++rowNum);
                hssfRow.setHeight((short)200);

                for(int i = 2; i <= colwidth2.size(); i++)
                    hssfCell = hssfRow.createCell(i);               
                
                // header 생성
                hssfRow = hssfSheet.createRow(++rowNum);
                hssfRow.setHeight((short)500);
                
                for(int i = 1; i <= colHeader2.size(); i++)
                {
                    hssfCell = hssfRow.createCell(i);
                    hssfCell.setCellStyle(styleHeader);
                    hssfCell.setCellValue(new XSSFRichTextString(colHeader2.get(i - 1)));
                }
                
                int rowCnt1 = 0;
                int rowCnt2 = 0;
                int rowCnt3 = 0;
                int rowCnt4 = 0;
                
                int rowStrNum = 0;                  // 현재 Row 위치
                int dataCount = data2.size() - 1;   // 두번째 데이터 갯수
                int strRow = rowNum + 1;            //두번째 데이터가 시작되는 Row 위치
                

                // data 생성
                for(int i = 0; i < data2.size(); i++)
                {
                    rowStrNum = ++rowNum;
                    hssfRow = hssfSheet.createRow(rowStrNum);
                    hssfRow.setHeight((short)550);
                    
                    HashMap<String, Object> rowData2 = (HashMap<String, Object>)data2.get(i);
                    
                    
                    for(int j = 1; j <= colName2.size(); j++)
                    {                                            
                        
                        String tmp = String.valueOf(rowData2.get(colName2.get(j - 1)));
                        String colName = String.valueOf(colName2.get(j - 1));
                        
                        if (tmp == "null") tmp = "";
                        
                        
                        if (colName.equals("SECTION")) {
                            if (!tmp.equals("")) {
                               if (rowStrNum != strRow) 
                                   hssfSheet.addMergedRegion(new CellRangeAddress(rowStrNum - 1, rowStrNum - rowCnt1, j, j));

                               rowCnt1 = 1;
                            } else 
                                rowCnt1 = rowCnt1 + 1; 
                            
                            if (i == dataCount)
                                hssfSheet.addMergedRegion(new CellRangeAddress(rowStrNum, rowStrNum +1 - rowCnt1, j, j));
                             
                        } else if (colName.equals("ITEM")) {
                            if (!tmp.equals("")) {
                                if (rowStrNum != strRow) 
                                    hssfSheet.addMergedRegion(new CellRangeAddress(rowStrNum - 1, rowStrNum - rowCnt2, j, j));

                                rowCnt2 = 1;
                             } else 
                                 rowCnt2 = rowCnt2 + 1; 
                            
                            if (i == dataCount)
                                hssfSheet.addMergedRegion(new CellRangeAddress(rowStrNum, rowStrNum +1 - rowCnt2, j, j));
                            
                        } else if (colName.equals("CONTENTS")) {
                            if (!tmp.equals("")) {
                                if (rowStrNum != strRow) 
                                    hssfSheet.addMergedRegion(new CellRangeAddress(rowStrNum - 1, rowStrNum - rowCnt3, j, j));

                                rowCnt3 = 1;
                             } else 
                                 rowCnt3 = rowCnt3 + 1; 
                            
                            if (i == dataCount)
                                hssfSheet.addMergedRegion(new CellRangeAddress(rowStrNum, rowStrNum +1 - rowCnt3, j, j));
                            
                        } else if (colName.equals("POINT")) {
                            if (!tmp.equals("")) {
                                if (rowStrNum != strRow) 
                                    hssfSheet.addMergedRegion(new CellRangeAddress(rowStrNum - 1, rowStrNum - rowCnt4, j, j));

                                rowCnt4 = 1;
                             } else 
                                 rowCnt4 = rowCnt4 + 1; 
                            
                            if (i == dataCount)
                                hssfSheet.addMergedRegion(new CellRangeAddress(rowStrNum, rowStrNum +1 - rowCnt4, j, j));
                        }
                                                
                        hssfRow = hssfSheet.getRow(rowStrNum);                       
                        hssfCell = hssfRow.createCell(j);
                        
                        if(colAlign2 == null)
                            hssfCell.setCellStyle(styleCommonCenter);
                        else if(((String)colAlign2.get(j - 1)).equals("left"))
                            hssfCell.setCellStyle(styleCommonLeft);
                        else if(((String)colAlign2.get(j - 1)).equals("right"))
                            hssfCell.setCellStyle(styleCommonRight);
                        else
                            hssfCell.setCellStyle(styleCommonCenter);
                        
                        hssfCell.setCellValue(new XSSFRichTextString(tmp));
                        
                    }

                }            
               
            } catch(ArrayIndexOutOfBoundsException e) {
                System.out.println("배열 참조 에러 발생");
            }
            catch(Exception e) {
                System.out.println(e.getMessage());
            }
    		
		} catch(ArrayIndexOutOfBoundsException e) {
		    System.out.println("배열 참조 에러 발생");
		}
		catch(Exception e) {
		    System.out.println(e.getMessage());
		}
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