package kr.co.twoksystem.service;

import java.util.Map;

public interface IGlobeeService {
	public abstract Map<String, Object> service(Map<String, Object> pMap) throws Exception;
//	public abstract List<HashMap<String, Object>> selectList(String mapperId, Map<String, Object> pMap) throws Exception;
//	public abstract int selectListCount(String mapperId, Map<String, Object> pMap) throws Exception;
//	public abstract Map<String, Object> select(String mapperId, Map<String, Object> pMap) throws Exception;
//	public abstract int insert(String mapperId, Map<String, Object> pMap) throws Exception;
//	public abstract int update(String mapperId, Map<String, Object> pMap) throws Exception;
//	public abstract int delete(String mapperId, Map<String, Object> pMap) throws Exception;
//	public abstract List<Map<String, Object>> batch(List<Map<String, Object>> pList) throws Exception;
}
