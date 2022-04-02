package kr.co.twoksystem.mapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface IGlobeeMapper {
	// selectList
	public abstract List<HashMap<String, Object>> selectList(String mapperId, Map<String, Object> pMap) throws Exception;
	// selectList
	public abstract List<HashMap<String, Object>> selectList(String mapperId, String codeType) throws Exception;
	// selectCount
	public abstract int selectListCount(String mapperId, Map<String, Object> pMap) throws Exception;
	// select
	public abstract Map<String, Object> selectOne(String mapperId, Map<String, Object> pMap) throws Exception;
	// service
	public abstract Map<String, Object> service(Map<String, Object> pMap) throws Exception;
	// insert
	public abstract int insert(String mapperId, Map<String, Object> pMap) throws Exception;
	// update
	public abstract int update(String mapperId, Map<String, Object> pMap) throws Exception;
	// delete
	public abstract int delete(String mapperId, Map<String, Object> pMap) throws Exception;
}
