package kr.co.twoksystem.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("globeeMapper")
public class GlobeeMapper implements IGlobeeMapper
{
	private Logger logger = LoggerFactory.getLogger(getClass());
	private SqlSessionTemplate mSqlSession = null;
	private SqlSessionTemplate mSqlSessionSecond = null;
	private SqlSessionTemplate mSqlSessionThird = null;
	private SqlSessionTemplate mSqlSessionFourth = null;
	private SqlSessionTemplate mSqlSessionFifth = null;
	private SqlSessionTemplate mSqlSessionSixth = null;
	private SqlSessionTemplate mSqlSessionSeventh = null;
	private String secondDb;
	private String thirdDb;
	private String fourthDb;
	private String fifthDb;
	private String sixthDb;
	private String seventhDb;

	public void setSqlSession(SqlSessionTemplate sqlSession)
	{
		mSqlSession = sqlSession;
	}
	
	// 지방세 시스템 연계
	public void setSqlSessionSecond(SqlSessionTemplate sqlSession)
	{
		mSqlSessionSecond = sqlSession;
	}

	public void setSecondDb(String secondDb)
	{
		this.secondDb = secondDb;
	}

	
	// 상하수도 연계
	public void setSqlSessionThird(SqlSessionTemplate sqlSession)
	{
		mSqlSessionThird = sqlSession;
	}

	public void setThirdDb(String thirdDb)
	{
		this.thirdDb = thirdDb;
	}
	
	// 주정차 연계
	public void setSqlSessionFourth(SqlSessionTemplate sqlSession)
	{
		mSqlSessionFourth = sqlSession;
	}
	
	public void setFourthDb(String fourthDb)
	{
		this.fourthDb = fourthDb;
	}

	// 세외수입 연계
	public void setSqlSessionFifth(SqlSessionTemplate sqlSession)
	{
		mSqlSessionFifth = sqlSession;
	}
	
	public void setFifthDb(String fifthDb)
	{
		this.fifthDb = fifthDb;
	}
	
	// cti 연계
	public void setSqlSessionSixth(SqlSessionTemplate sqlSession) {
		mSqlSessionSixth = sqlSession;
	}

	public void setSixthDb(String sixthDb) {
		this.sixthDb = sixthDb;
	}
	
	// 영상상담 연계
	public void setSqlSessionSeventh(SqlSessionTemplate sqlSession) {
		mSqlSessionSeventh = sqlSession;
	}
	
	public void setSeventhDb(String seventhDb) {
		this.seventhDb = seventhDb;
	}
	
	public List<HashMap<String, Object>> selectList(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("SelectList By Search Value :{}", "GlobeeMapper.selectList");

		
		if(mapperId.indexOf(thirdDb) != -1) {
			return mSqlSessionThird.selectList(mapperId, pMap);
		}
		else if(mapperId.indexOf(fourthDb) != -1) {
			return mSqlSessionFourth.selectList(mapperId, pMap);
		}
		else if(mapperId.indexOf(fifthDb) != -1) {
			return mSqlSessionFifth.selectList(mapperId, pMap);
		}
		else if(mapperId.indexOf(sixthDb) != -1) {
			return mSqlSessionSixth.selectList(mapperId, pMap);
		}
		else if(mapperId.indexOf(seventhDb) != -1) {
			return mSqlSessionSeventh.selectList(mapperId, pMap);
		}
		else if(mapperId.indexOf(secondDb) != -1) {
				return mSqlSessionSecond.selectList(mapperId, pMap);
		} 
		else {
			return mSqlSession.selectList(mapperId, pMap);
		}
	}

	public List<HashMap<String, Object>> selectList(String mapperId, String codeType) throws Exception
	{
		logger.debug("SelectList By Code Value :{}", "GlobeeMapper.selectList");
		Map<String, Object> pMap = new HashMap<String, Object>();
		pMap.put("codeTy", codeType);
		return selectList(mapperId, pMap);
	}

	public int selectListCount(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("SelectCount By Search Value :{}", "GlobeeMapper.selectCount");

		if(mapperId.indexOf(thirdDb) != -1)  {
			return mSqlSessionThird.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(fourthDb) != -1) {
			return mSqlSessionFourth.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(fifthDb) != -1) {
			return mSqlSessionFifth.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(sixthDb) != -1) {
			return mSqlSessionSixth.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(seventhDb) != -1) {
			return mSqlSessionSeventh.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.selectOne(mapperId, pMap);
		} 
		else {
			return mSqlSession.selectOne(mapperId, pMap);
		}
	}

	public Map<String, Object> selectOne(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("Select By ID :{}", "GlobeeMapper.select");

		if(mapperId.indexOf(thirdDb) != -1) {
			return mSqlSessionThird.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(fourthDb) != -1) {
			return mSqlSessionFourth.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(fifthDb) != -1) {
			return mSqlSessionFifth.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(sixthDb) != -1) {
			return mSqlSessionSixth.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(seventhDb) != -1) {
			return mSqlSessionSeventh.selectOne(mapperId, pMap);
		}
		else if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.selectOne(mapperId, pMap);
		} 
		else {
			return mSqlSession.selectOne(mapperId, pMap);
		}
	}

	public Map<String, Object> service(Map<String, Object> pMap) throws Exception
	{
		Map<String, Object> rMap = new HashMap<String, Object>();
		logger.debug("Service By Request :{}", "GlobeeMapper.service");
		return rMap;
	}

	public int insert(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("Insert By parameter Map :{}", "GlobeeMapper.insert");

		if(mapperId.indexOf(thirdDb) != -1) {
			return mSqlSessionThird.insert(mapperId, pMap);
		}
		else if(mapperId.indexOf(fourthDb) != -1) {
			return mSqlSessionFourth.insert(mapperId, pMap);
		}
		else if(mapperId.indexOf(fifthDb) != -1) {
			return mSqlSessionFifth.insert(mapperId, pMap);
		}
		else if(mapperId.indexOf(sixthDb) != -1) {
			return mSqlSessionSixth.insert(mapperId, pMap);
		}
		else if(mapperId.indexOf(seventhDb) != -1) {
			return mSqlSessionSeventh.insert(mapperId, pMap);
		}
		else if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.insert(mapperId, pMap);
		} 
		else {
			return mSqlSession.insert(mapperId, pMap);
		}
	}

	public int update(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("Update By parameter Map :{}", "GlobeeMapper.update");

		if(mapperId.indexOf(thirdDb) != -1) {
			return mSqlSessionThird.update(mapperId, pMap);
		}
		else if(mapperId.indexOf(fourthDb) != -1) {
			return mSqlSessionFourth.update(mapperId, pMap);
		}
		else if(mapperId.indexOf(fifthDb) != -1) {
			return mSqlSessionFifth.update(mapperId, pMap);
		}
		else if(mapperId.indexOf(sixthDb) != -1) {
			return mSqlSessionSixth.update(mapperId, pMap);
		}
		else if(mapperId.indexOf(seventhDb) != -1) {
			return mSqlSessionSeventh.update(mapperId, pMap);
		}
		else if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.update(mapperId, pMap);
		} 
		else {
			return mSqlSession.update(mapperId, pMap);
		}
	}

	public int delete(String mapperId, Map<String, Object> pMap) throws Exception
	{
		logger.debug("Delete By parameter Map :{}", "GlobeeMapper.delete");

		if(mapperId.indexOf(thirdDb) != -1) {
			return mSqlSessionThird.delete(mapperId, pMap);
		}
		else if(mapperId.indexOf(fourthDb) != -1) {
			return mSqlSessionFourth.delete(mapperId, pMap);
		} 
		else if(mapperId.indexOf(fifthDb) != -1) {
			return mSqlSessionFifth.delete(mapperId, pMap);
		} 
		else if(mapperId.indexOf(sixthDb) != -1) {
			return mSqlSessionSixth.delete(mapperId, pMap);
		}
		else if(mapperId.indexOf(seventhDb) != -1) {
			return mSqlSessionSeventh.delete(mapperId, pMap);
		}
		else if(mapperId.indexOf(secondDb) != -1) {
			return mSqlSessionSecond.delete(mapperId, pMap);
		} 
		else {
			return mSqlSession.delete(mapperId, pMap);
		}
	}
}