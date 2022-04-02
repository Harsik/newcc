package kr.co.twoksystem.ws;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
//import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WsMapper {

	private Logger logger = LoggerFactory.getLogger(getClass());

//	private SqlSessionFactory factory;
//	public WsMapper(SqlSessionFactory factory) {
//		this.factory = factory;
//	}
	
	public List<HashMap<String, Object>> selectList(String mapperId, Map<String, Object> pMap) throws Exception {
		logger.debug("SelectList By Search Value :{}", "WsMapper.selectList");
		
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSession()) {
			return sqlSession.selectList(mapperId, pMap);
		}
	}

	public int selectListCount(String mapperId, Map<String, Object> pMap) throws Exception {
		logger.debug("SelectCount By Search Value :{}", "WsMapper.selectCount");
		
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSession()) {
			return sqlSession.selectOne(mapperId, pMap);
		}
	}

	public Map<String, Object> selectOne(String mapperId, Map<String, Object> pMap) throws Exception {
		logger.debug("Select By ID :{}", "WsMapper.select");
		
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSession()) {
			return sqlSession.selectOne(mapperId, pMap);
		}
	}

	public int insert(String mapperId, Map<String, Object> pMap) throws Exception {
		logger.debug("Insert By parameter Map :{}", "WsMapper.insert");
		
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSession()) {
			int rInt = sqlSession.insert(mapperId, pMap);
			sqlSession.commit();
			return rInt;
		}
	}

	public int update(String mapperId, Map<String, Object> pMap) throws Exception {
		logger.debug("Update By parameter Map :{}", "WsMapper.update");
		
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSession()) {
			int rInt = sqlSession.update(mapperId, pMap);
			sqlSession.commit();
			return rInt;
		}
	}

	public int delete(String mapperId, Map<String, Object> pMap) throws Exception {
		logger.debug("Delete By parameter Map :{}", "WsMapper.delete");
		
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSession()) {
			int rInt = sqlSession.delete(mapperId, pMap);
			sqlSession.commit();
			return rInt;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<Object> batch(List<Map<String, Object>> pList) throws Exception {
		logger.debug("SelectList By Search Value :{}", "WsMapper.selectList");
		
		try (SqlSession sqlSession = MyBatisSqlSessionFactory.getSqlSession()) {
			List<Object> rList = new ArrayList<Object>();
			Iterator<Map<String, Object>> itr = pList.iterator();
			Map<String, Object> pMap = new HashMap<String, Object>();
			while (itr.hasNext()) {
				pMap = itr.next();
				String qryType = (String) pMap.get("qt");  
				String mapperId = (String) pMap.get("mi");
				Map<String, Object> map = (Map<String, Object>) pMap.get("map");
				switch (qryType) {
				case "selectList" :
					rList.add(sqlSession.selectList(mapperId, map));
					break;
				case "select" :
				case "selectOne" :
					rList.add(sqlSession.selectOne(mapperId, map));
					break;
				case "insert" :
					rList.add(sqlSession.insert(mapperId, map));
					break;
				case "update" :
					rList.add(sqlSession.update(mapperId, map));
					break;
				case "delete" :
					rList.add(sqlSession.delete(mapperId, map));
					break;
				}
			}
			sqlSession.commit();
			return rList;
		}
	}

}
