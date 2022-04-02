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

import org.apache.commons.lang.math.NumberUtils;
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

@Repository("mpRowsExcelDownloadView")
public class mpRowsExcelDownloadView extends AbstractExcelViewXssf
{
	private XSSFSheet hssfSheet;
	private XSSFRow hssfRow;
	private XSSFCell hssfCell;
	
	private XSSFFont styleTitleFont;				  // 타이틀폰트
	private XSSFFont styleHeaderFont;               // 헤더폰트
	private XSSFFont styleCommonFont;               // 일반 폰트
	private XSSFCellStyle styleTitle;	              // 타이틀 셀 스타일
	private XSSFCellStyle styleHeader;             // 헤더 셀 스타일
	private XSSFCellStyle styleCommonLeft;         // 일반 셀 스타일 - align left
	private XSSFCellStyle styleCommonCenter;       // 일반 셀 스타일 - align center
	private XSSFCellStyle styleCommonRight;		  // 일반 셀 스타일 - align right
	
	@SuppressWarnings("unchecked")
	@Override
	protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook, HttpServletRequest req, HttpServletResponse res) throws Exception
	{
		HashMap<String, Object> param = (HashMap<String, Object>)modelMap.get("param");	        // 파라미터
		ArrayList<?> data = (ArrayList<Object>)modelMap.get("result");							// 데이터
		
		String excelFileName = URLEncoder.encode((String)(param.get("title")), "utf-8");		// 실제파일이름
		String title = URLDecoder.decode(excelFileName, "utf-8");								// 코드에서 사용하기 위한 파일이름
		
		if(title == null || title.equals("") || param == null || data == null)
			return;
		
		// 스타일 셋팅
		this.setStyle(workbook);
		
		// 엑셀파일 생성
		this.createExcel(workbook, param, data);
		
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
		styleCommonLeft.setFont(styleCommonFont);
		
		// Cell Style - common center
		styleCommonCenter = (XSSFCellStyle)workbook.createCellStyle();
		styleCommonCenter.setAlignment(XSSFCellStyle.ALIGN_CENTER);
		styleCommonCenter.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleCommonCenter.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleCommonCenter.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		styleCommonCenter.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleCommonCenter.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleCommonCenter.setFont(styleCommonFont);
		
		// Cell Style - common right
		styleCommonRight = (XSSFCellStyle)workbook.createCellStyle();
		styleCommonRight.setAlignment(XSSFCellStyle.ALIGN_RIGHT);
		styleCommonRight.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);
		styleCommonRight.setBorderTop(XSSFCellStyle.BORDER_THIN);
		styleCommonRight.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		styleCommonRight.setBorderRight(XSSFCellStyle.BORDER_THIN);
		styleCommonRight.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		styleCommonRight.setFont(styleCommonFont);
	}
	
	// 엑셀파일 생성
	@SuppressWarnings("unchecked")
	private void createExcel(Workbook workbook, HashMap<String, Object> param, ArrayList<?> data) throws UnsupportedEncodingException
	{
		hssfSheet = null;
		hssfRow = null;
		hssfCell = null;
		int rowNum = 0;
		String[] arrHdInfo;
		String arrHdValue = null;
		
		ArrayList<Integer> colwidth = (ArrayList<Integer>)param.get("colWidth");
		ArrayList<String> colName = (ArrayList<String>)param.get("colName");
		ArrayList<String> colHeaderRow1 = (ArrayList<String>)param.get("colHeader1");
		ArrayList<String> colHeaderRow2 = (ArrayList<String>)param.get("colHeader2");
		ArrayList<String> colHeaderRow3 = (ArrayList<String>)param.get("colHeader3");
		ArrayList<String> colAlign = (ArrayList<String>)param.get("colAlign");
		String title = URLDecoder.decode(URLEncoder.encode((String)(param.get("title")), "utf-8"), "utf-8");
		
		try 
		{
    		// 시트 생성
    		hssfSheet = (XSSFSheet)workbook.createSheet(title);
    		
    		// 컬럼 넓이 설정
    		for(int i = 0; i < colwidth.size(); i++)
    			hssfSheet.setColumnWidth(i + 1, calcColumnWidth(colwidth.get(i)));
    		
    		/*    		 * 
    		 * 타이틀 생성하기 +++++++++++++++++++++++++++++++
    		 */
    		
    		// title row 생성
    		hssfRow = hssfSheet.createRow(++rowNum);
    		hssfRow.setHeight((short)700);
    		
    		// title 셀 병합 범위 설정
    		hssfSheet.addMergedRegion(new CellRangeAddress(rowNum, rowNum, 1, colwidth.size()));
    		
    		// title 셀생성
    		hssfCell = hssfRow.createCell(1);
    		hssfCell.setCellStyle(styleTitle);
    		hssfCell.setCellValue(new XSSFRichTextString(title));
    		
    		/*
    		 * 타이틀 생성하기 END +++++++++++++++++++++++++++++++
    		 */
    		
    		// title과 본문 사이 빈 cell 생성
    		for(int i = 2; i <= colwidth.size(); i++)
    			hssfCell = hssfRow.createCell(i);
    		
    		// title과 본문 사이 빈 row 생성
    		hssfRow = hssfSheet.createRow(++rowNum);
    		
    		
    		/*
    		 * 헤더 생성하기 ++++++++++++++++++++++++++++++++++++
    		 * Header 3 Rows
    		 */
    		
    		// header1 생성
    		hssfRow = hssfSheet.createRow(++rowNum);
    		hssfRow.setHeight((short)500);
    		
    		for(int i = 1; i <= colHeaderRow1.size(); i++)
    		{                
                //헤더 배열 값 가져오기
    		    arrHdValue = colHeaderRow1.get(i - 1);
    		    
    		    //배열넣기
    		    arrHdInfo = arrHdValue.split(",");

    		    String colTitle = arrHdInfo[0];                           // 셀 타이틀
    		    String spanType = arrHdInfo[1].trim();                    // 셀 병합 타입(R:row span, C:col span)
		        int colStrt = Integer.parseInt(arrHdInfo[2].trim()) + 1;  // 셀 시작 위치(엑셀파일 첫 COL은 공백이므로 +1)
		        int colCount = Integer.parseInt(arrHdInfo[3].trim());     // 셀 병합 갯수
		        int colEnd = colStrt + colCount - 1;                       // 셀 종료 위치
		        
		        
    		    // title 셀 병합 범위 설정 Row 병합
		        if(spanType.equals("R"))
		            hssfSheet.addMergedRegion(new CellRangeAddress(rowNum, rowNum, colStrt, colEnd));
            
		        for(int k = 0; k < colCount; k++)
		        {
        		    hssfCell = hssfRow.createCell(colStrt + k);   //셀 생성
                    hssfCell.setCellStyle(styleHeader);           //셀 헤더 스타일 
                    hssfCell.setCellValue(colTitle);              //헤더 타이틀
    		    }
    		}
    		
    		// header2 생성
    		if (colHeaderRow2 != null)
    		{
                hssfRow = hssfSheet.createRow(++rowNum);
                hssfRow.setHeight((short)500);
                
                for(int i = 1; i <= colHeaderRow2.size(); i++)
                {
                  //헤더 배열 값 가져오기
                    arrHdValue = colHeaderRow2.get(i - 1);
                    
                    //배열넣기
                    arrHdInfo = arrHdValue.split(",");
    
                    String colTitle = arrHdInfo[0];                           // 셀 타이틀
                    String spanType = arrHdInfo[1].trim();                    // 셀 병합 타입(R:row span, C:col span)
                    int colStrt = Integer.parseInt(arrHdInfo[2].trim()) + 1;  // 셀 시작 위치(첫 COL은 공백이므로 +1)
                    int colCount = Integer.parseInt(arrHdInfo[3].trim());     // 셀 병합 갯수
                    int colEnd = colStrt + colCount - 1;                       // 셀 종료 위치
                                    
                    // title 셀 병합 범위 설정 Row 병합
                    if(spanType.equals("R"))
                        hssfSheet.addMergedRegion(new CellRangeAddress(rowNum, rowNum, colStrt, colEnd));
                
                    for(int k = 0; k < colCount; k++)
                    {
                        hssfCell = hssfRow.createCell(colStrt + k);     //셀 생성
                        hssfCell.setCellStyle(styleHeader);             //셀 헤더 스타일
                        hssfCell.setCellValue(colTitle);                //헤더 타이틀
                    }
                }
    		}
    		
            // header3 생성
    		if (colHeaderRow3 != null)
    		{
                hssfRow = hssfSheet.createRow(++rowNum);
                hssfRow.setHeight((short)500);
                
                for(int i = 1; i <= colHeaderRow3.size(); i++)
                {
                    //헤더 배열 값 가져오기
                    arrHdValue = colHeaderRow3.get(i - 1);
                    
                    //배열넣기
                    arrHdInfo = arrHdValue.split(",");
    
                    String colTitle = arrHdInfo[0];                           // 셀 타이틀
                    
                    //헤더가 병합이 아닐경우
                    if(arrHdInfo.length == 1){
                        hssfCell = hssfRow.createCell(i);
                        hssfCell.setCellStyle(styleHeader);
                        hssfCell.setCellValue(colTitle);                    
                    } else{
                        //헤더가 병합일 경우
                        String spanType = arrHdInfo[1].trim();                    // 셀 병합 타입(R:row span, C:col span)
                        int rowStrt = Integer.parseInt(arrHdInfo[2].trim()) + 3;  // 셀 시작 위치(1, 3 Row은 공백, 2Row는 타이틀 이므로 +3)
                        int rowCount = Integer.parseInt(arrHdInfo[3].trim());     // 셀 병합 갯수
                        int rowEnd = rowStrt + rowCount - 1;                       // 셀 종료 위치
                        
                        //System.out.println(spanType.equals("C"));
                        
                        // title 셀 병합 범위 설정 Col 병합
                        if(spanType.equals("C"))
                            hssfSheet.addMergedRegion(new CellRangeAddress(rowStrt, rowEnd, i, i));
                        
                        for(int k = 0; k < rowCount; k++)
                        {
                            hssfRow = hssfSheet.getRow(rowStrt + k);        //셀 병합 첫번째 위치로 이동
                            hssfCell = hssfRow.createCell(i);               //셀 생성
                            hssfCell.setCellStyle(styleHeader);             //셀 헤더 스타일
                            hssfCell.setCellValue(colTitle);                //헤더 타이틀
                        } 
                    }
                    
                }
    		}
    		
    		/*
    		 * 헤더 생성하기 END ++++++++++++++++++++++++++++++++++++
    		 */
    		
    		
    		/*
    		 * 데이터 생성하기 +++++++++++++++++++++++++++++++++++++
    		 */
    		
    		// data 생성
    		for(int i = 0; i < data.size(); i++)
    		{
    			hssfRow = hssfSheet.createRow(++rowNum);
    			hssfRow.setHeight((short)400);
    			
    			HashMap<String, Object> rowData = (HashMap<String, Object>)data.get(i);
    			
    			for(int j = 1; j <= colName.size(); j++)
    			{
    				/*String tmp = (String)rowData.get(colName.get(j - 1));*/
    				
    				// 2020.01.16 큐브리드 컬럼명을 대문자를 사용한다. 
    				String tmp = String.valueOf(rowData.get(colName.get(j - 1).toUpperCase()));
    				
    				if (tmp == "null") {
    				    tmp = "";
    				    //continue;
    				}
    				
    				hssfCell = hssfRow.createCell(j);
    				
    				if(colAlign == null) {
    					hssfCell.setCellStyle(styleCommonCenter);
    				} else if(((String)colAlign.get(j - 1)).equals("left")) {
    					hssfCell.setCellStyle(styleCommonLeft);
    				} else if(((String)colAlign.get(j - 1)).equals("right")) {
    					hssfCell.setCellStyle(styleCommonRight);
    				} else {
    					hssfCell.setCellStyle(styleCommonCenter);
    				}
    				
        			if(NumberUtils.isNumber(tmp) && StringUtils.isNotBlank(tmp)) {
    					hssfCell.setCellType(Cell.CELL_TYPE_NUMERIC);
    					hssfCell.setCellValue(new BigDecimal(tmp).doubleValue());
    				} else {
    					hssfCell.setCellValue(new XSSFRichTextString(tmp));
    				}
    			}
    		}
    		
    		/*
    		 * 데이터 생성하기 END +++++++++++++++++++++++++++++++++++++
    		 */
    		
		} catch(ArrayIndexOutOfBoundsException e) {
		    System.out.println("배열 참조 에러 발생");
		}
		catch(Exception e) {
		    System.out.println(e.getMessage());
		}
	}
/*	
	private String setString(XSSFRichTextString txtHdTitle) {
        // TODO Auto-generated method stub
        return null;
    }
*/
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