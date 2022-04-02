package kr.co.twoksystem.utils;

import java.io.File;
import java.io.FileInputStream;
//import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.CellStyle;
//import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.nodes.Element;
//import org.jsoup.select.Elements;
//import org.junit.Test;

public class GlobeeExcel {


//	private String getExtension(String fileName) {
//		int dot = fileName.lastIndexOf('.');
//		String base = (dot == -1) ? fileName : fileName.substring(0, dot);
//		String extension = (dot == -1) ? "" : fileName.substring(dot+1);
//		System.out.println("base : " + base + ", extension : " + extension);
//		return extension;
//	}

	@SuppressWarnings("resource")
	public void readExcelx(String fileName) throws Exception {
        // OPCPackage.open() 메써드로 파일 로드시 FileInputStream 클래스 대신 File 클래스를 사용하면 메모리 낭비를 줄일 수 있다.
		OPCPackage opcPackage = OPCPackage.open(new File(fileName));
		XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);
		XSSFRow row;
		XSSFCell cell;

		Map<Integer, String> xlsMap = new HashMap<Integer, String>();

		// sheet수 취득
		int sheetCn = workbook.getNumberOfSheets();
		System.out.println("sheet수 : " + sheetCn);

		for (int cn = 0; cn < sheetCn; cn++) {
			System.out.println("취득하는 sheet 이름 : " + workbook.getSheetName(cn));
			System.out.println(workbook.getSheetName(cn) + " sheet 데이터 취득 시작");

			// 0번째 sheet 정보 취득
			XSSFSheet sheet = workbook.getSheetAt(cn);

			// 취득된 sheet에서 rows수 취득
			int rows = sheet.getPhysicalNumberOfRows();
			System.out.println(workbook.getSheetName(cn) + " sheet의 row수 : " + rows);

			// 취득된 row에서 취득대상 cell수 취득
			int cells = sheet.getRow(cn).getPhysicalNumberOfCells(); //
			System.out.println(workbook.getSheetName(cn) + " sheet의 row에 취득대상 cell수 : " + cells);

			for (int r = 0; r < rows; r++) {
				row = sheet.getRow(r); // row 가져오기
				if (row != null) {
					for (int c = 0; c < cells; c++) {
						cell = row.getCell(c);
						if (cell != null) {
							String value = null;
							switch (cell.getCellType()) {
							case XSSFCell.CELL_TYPE_FORMULA:
								value = cell.getCellFormula();
								break;
							case XSSFCell.CELL_TYPE_NUMERIC:
								value = "" + cell.getNumericCellValue();
								break;
							case XSSFCell.CELL_TYPE_STRING:
								value = "" + cell.getStringCellValue();
								break;
							case XSSFCell.CELL_TYPE_BLANK:
								value = "[null 아닌 공백]";
								break;
							case XSSFCell.CELL_TYPE_ERROR:
								value = "" + cell.getErrorCellValue();
								break;
							default:
							}
							if (r == 0) {  // 첫번째줄이면
								xlsMap.put(c, value);
							}
							System.out.print(value + "\t");
						} else {
							System.out.print("[null]\t");
						}
					} // for(c) 문
					System.out.print("\n");
				}
			} // for(r) 문
			System.out.println(xlsMap.toString());
		}
	}

	@SuppressWarnings("resource")
	public void readExcel(String fileName) throws Exception {
		Map<Integer, String> xlsMap = new HashMap<Integer, String>();

		HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(new File(fileName)));
		HSSFSheet sheet = workbook.getSheetAt(0);

		HSSFRow row = null;
		HSSFCell cell = null;

		if (sheet != null) {
			// 기록물철의 경우 실제 데이터가 시작되는 Row지정
			int nRowStartIndex = 0;
			// 기록물철의 경우 실제 데이터가 끝 Row지정
			int nRowEndIndex = sheet.getLastRowNum();
			// 기록물철의 경우 실제 데이터가 시작되는 Column지정
			int nColumnStartIndex = 0;
			// 기록물철의 경우 실제 데이터가 끝나는 Column지정
			int nColumnEndIndex = sheet.getRow(2).getLastCellNum();
			String value = "";
			for(int r = nRowStartIndex; r <= nRowEndIndex; r++) {
				row = sheet.getRow(r);
				if (row != null) {
					for(int c = nColumnStartIndex; c <= nColumnEndIndex; c++) {
						cell = row.getCell(c);
						if (cell == null) {
							continue;
						}
						if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
							value = String.valueOf(cell.getNumericCellValue());
						} else {
							value = cell.getStringCellValue();
						}
						System.out.print(value);
						System.out.print("\t");
						if (r == 0) {  // 첫번째줄이면
							xlsMap.put(c, value);
						}
					}
					System.out.println();
				}
			}
			System.out.println(xlsMap.toString());
		} else {
			System.out.println("Sheet is null!!");
		}
	}

	/**
     * Creates a cell and aligns it a certain way.
     *
     * @param wb     the workbook
     * @param row    the row to create the cell in
     * @param column the column number to create the cell in
     * @param halign the horizontal alignment for the cell.
     */
    @SuppressWarnings("deprecation")
	public void createCell(HSSFWorkbook wb, HSSFRow row, short column, short halign, short valign, String cellVal) {
    	HSSFCell cell = row.createCell(column);
        cell.setCellValue(cellVal);
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setAlignment(halign);
        cellStyle.setVerticalAlignment(valign);
        cell.setCellStyle(cellStyle);
    }


}
