package kr.co.twoksystem.service;

import java.util.Map;

public interface IExcelService {
	public abstract Map<String, Object> xlService(Map<String, Object> pMap) throws Exception;
}
