package egovframework.com.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.co.twoksystem.mapper.IGlobeeMapper;
import kr.co.twoksystem.service.IExcelService;
//import kr.co.twoksystem.ws.WsMapper;





import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("excelService")
public class ExcelService extends EgovAbstractServiceImpl implements IExcelService
{
	@Autowired
	private IGlobeeMapper globeeMapper;

	/*
	 * String[] pKey : XML 전달 파라메터 Key
	 * String[] pVal : XML 전달 파라메터 값
	 * String[] tKey : XML 연결 테이블명
	 * String[] tVal : XML 연결 id
	 * String[] hVal : 엑셀파일 헤더 갯수
	 */
	private void excelProcesse(String svrFilePath, String[] pKey, String[] pVal, String[] tKey, String[] tVal, String[] hKey, String[] hVal) throws Exception
	{
		try(FileInputStream fis = new FileInputStream(svrFilePath))
		{
            Workbook workbook = null;
            /*
           * 파일의 확장자를 체크해서 .XLS 라면 HSSFWorkbook에
           * .XLSX라면 XSSFWorkbook에 각각 초기화 한다.
           */
          if(svrFilePath.toUpperCase().endsWith(".XLS")) {
              try {
                   workbook = new HSSFWorkbook(fis);
              } catch (IOException e) {
                  throw new RuntimeException(e.getMessage(), e);
              }
          }
          else if(svrFilePath.toUpperCase().endsWith(".XLSX")) {
              try {
                   workbook = new XSSFWorkbook(fis); 
              } catch (IOException e) {
                  throw new RuntimeException(e.getMessage(), e);
              }
          } 
		    
          //시트 수 (첫번째에만 존재하므로 0을 준다)
          //만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
          Sheet sheet = workbook.getSheetAt(0);
          String tSvcName = tKey[0]+"."+tVal[0];
          //행의 수
          //int rows = sheet.getPhysicalNumberOfRows();
          int rows = sheet.getLastRowNum();     //유효한 마지막 행의 수(공백이 있는 행은 포함 안됨)

          Map<String, Object> dMap = new HashMap<String, Object>();
          
          for(int i = 0; i < pKey.length; i++)
              dMap.put(pKey[i], pVal[i]);

          //globeeMapper.delete("cm012.deleteXL", dMap);          
/*
          egovLogger.debug("tkey : " + tKey[0] + " tVal : " + tVal[0]);
          String tDelSvcName = tKey[0]+"."+tVal[0];
          globeeMapper.delete(tDelSvcName, dMap);          
*/
          // Row Header Count
          int rowHeaderCount = 0;
          
          if(hVal[0] != null)
              rowHeaderCount = Integer.parseInt(hVal[0]) - 1;  // row index가 0부터 시작하므로 -1
          
          // 컬럼수
          int columnCount = 0;
          
          //for(int rowindex = 0; rowindex < rows; rowindex++)
          for(int rowindex = rowHeaderCount; rowindex <= rows; rowindex++)
          {
              //행을 읽는다
              Row row = sheet.getRow(rowindex);

              //첫번째 로우(헤더)
              //if(rowindex == 0)
              if(rowindex <= rowHeaderCount)
              {
                  // 데이터의경우 빈값이 존재할수있으므로 헤더에서 컬럼수 체크.
                  columnCount = row.getPhysicalNumberOfCells();
                  continue;
              }

              if(row != null)
              {
                  Map<String, Object> map = new HashMap<String, Object>();
                  map.putAll(dMap);

                  // Col Header Count
                  int colHeaderCount = 0;
                  
                  if(hVal[1] != null) {
                      colHeaderCount = Integer.parseInt(hVal[1]);  // row index가 0부터 시작
                  }

                  //Col Header 위치와 xml파라메터 index와 다르기 때문에 변수 추가
                  int colIndex = 0;
                  
                  /*상담이력업로드 수정 부분*/
                  String value= this.getCellValue(row.getCell(0));                  
                  
                  /*상담이력업로드 수정 부분*/
                  if(StringUtils.isBlank(value)){continue;}
                  
                  for(int columnindex = 0; columnindex < columnCount; columnindex++)
//                  for(int columnindex = colHeaderCount; columnindex < columnCount + colHeaderCount; columnindex++)
                  {
                      
                      //실행여부
                      //Boolean exeChk = true;  
                      
                      //셀값을 읽는다                      
                      Cell cell = row.getCell((short)columnindex, Row.CREATE_NULL_AS_BLANK);
                      
                      //셀이 빈값일경우를 위한 널체크
                      if(cell == null)
                      {
                          //map.put("COL" + (columnindex + 1), "");
                          map.put("COL" + (colIndex + 1), "");
                          continue;
                      }
                      else
                      {
                          
                          //타입별로 내용 읽기
                          switch(cell.getCellType())
                          {
                              case Cell.CELL_TYPE_FORMULA:
                                  //함수가 들어갔을때 함수식이 아닌 값을 불러와서 넣는다.
                                  //map.put("COL" + (colIndex + 1), cell.getCellFormula());
                                  map.put("COL" + (colIndex + 1), (double)cell.getNumericCellValue());
                                  break;
                              case Cell.CELL_TYPE_NUMERIC:
                            	  if(DateUtil.isCellDateFormatted(cell)) {
                            		  Date date = cell.getDateCellValue();
                            		  map.put("COL" + (colIndex + 1), new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date));
                            	  } else {
                            		  map.put("COL" + (colIndex + 1), (int)cell.getNumericCellValue());
                            	  }
                                      
                                  break;
                              case Cell.CELL_TYPE_STRING:
                                  map.put("COL" + (colIndex + 1), cell.getStringCellValue());
                                  break;
                              case Cell.CELL_TYPE_BLANK:
                            	  //map.put("COL" + (colIndex + 1), cell.getBooleanCellValue());
                                  map.put("COL" + (colIndex + 1), "");
                                  break;
                              case Cell.CELL_TYPE_ERROR:
                                  map.put("COL" + (colIndex + 1), cell.getErrorCellValue()+"");
                                  break;
                          }       
                          
                      }
                      
                      colIndex++;
                  }
                          
                  //globeeMapper.insert("cm012.insertXLFile", map);
                  egovLogger.debug("tkey : " + tKey[0] + " tVal : " + tVal[0]);
                  globeeMapper.insert(tSvcName, map); 
                  
              }
          }	    
		    
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw new Exception();
		}
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public Map<String, Object> xlService(Map<String, Object> tMap) throws Exception
	{
		ObjectMapper objectMapper = new ObjectMapper();
		egovLogger.debug(objectMapper.writeValueAsString(tMap));

		List<Map<String, Object>> fList = (List<Map<String, Object>>)tMap.get("fMap");
		Map<String, Object> qMap = (Map<String, Object>)tMap.get("qMap");

		String colNm = (String)qMap.get("COLUMN_NAME");       // 현재 로그인한 사람의 접속정보등 추가칼럼 명 (예:'login_usr_id,login_usr_nm')
		String colVal = (String)qMap.get("COLUMN_VALUE");     // 현재 로그인한 사람의 접속정보등 추가칼럼 값 (예:'sysmanager,홍길동')
		
		String tblNm = (String)qMap.get("MAPPER_NAME");       // XML 연결 테이블명
        String tblId = (String)qMap.get("SERVICE_NAME");      // XML 연결 id
        
        String hdrNm = (String)qMap.get("HEADER_NAME");       // 엑셀파일 헤더명
        String hdrCnt = (String)qMap.get("HEADER_COUNT");     // 엑셀파일 헤더 갯수

        // XML 전달 파라메터
		String[] pKey = {};
		String[] pVal = {};
		
		// XML 연결 테이블명, id
		String[] tKey = {};
        String[] tVal = {};
        
        // 엑셀파일 헤더 갯수
        String[] hKey = {};
        String[] hVal = {};
		
		if(colNm != null && colVal != null)
		{
			pKey = colNm.split(",");
			pVal = colVal.split(",");
		}
		
		if(tblNm != null && tblId != null)
        {
            tKey = tblNm.split(",");
            tVal = tblId.split(",");
        }
		
		if(hKey != null && hdrCnt != null)
        {
		    hKey = hdrNm.split(",");
		    hVal = hdrCnt.split(",");
        }

		Map<String, Object> fMap = fList.get(0);
		excelProcesse((String)fMap.get("svrfl_pth"), pKey, pVal, tKey, tVal, hKey, hVal);

		return qMap;
	}
	
	/*상담이력업로드 수정부분*/
	public String getCellValue(Cell cell) {
		if(cell == null) {
			return "";
		}
		int type = cell.getCellType();
		switch(type) {
		case Cell.CELL_TYPE_NUMERIC: 
			return Integer.toString((int)cell.getNumericCellValue());
		case Cell.CELL_TYPE_STRING:
			return cell.getStringCellValue();
		case Cell.CELL_TYPE_FORMULA:
			return Double.toString(cell.getNumericCellValue());
		case Cell.CELL_TYPE_BLANK:
			return "";
		case Cell.CELL_TYPE_BOOLEAN:
			return Boolean.toString(cell.getBooleanCellValue());
		case Cell.CELL_TYPE_ERROR:
			return Byte.toString(cell.getErrorCellValue());
		default:
			return "";
		}
	}
}