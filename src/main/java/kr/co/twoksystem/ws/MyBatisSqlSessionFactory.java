package kr.co.twoksystem.ws;

import java.io.IOException;
import java.io.InputStream;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.util.Properties;

//import org.apache.ibatis.datasource.DataSourceFactory;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MyBatisSqlSessionFactory {
	private static SqlSessionFactory sqlSessionFactory;
	
	public static SqlSessionFactory getSqlSessionFactory() {
		if (sqlSessionFactory==null) {
			try (InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml")) {
				sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
			} catch (IOException e) {
				throw new RuntimeException(e.getCause());
			}
		}
		return sqlSessionFactory;
	}
	
	public static SqlSession getSqlSession() {
		return getSqlSessionFactory().openSession();
	}
	
/*	
	private static final Properties PROPERTIES = new Properties();
	static {
		try {
			InputStream is = DataSourceFactory.class.getResourceAsStream("/egovframework/property/globals.properties");
			PROPERTIES.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static Connection getConnection() {
		String driver = PROPERTIES.getProperty("driverClassName");
		String url = PROPERTIES.getProperty("url");
		String username = PROPERTIES.getProperty("username");
		String password = PROPERTIES.getProperty("password");
		Connection connection = null;
		try {
			Class.forName(driver);
			connection = DriverManager.getConnection(url, username, password);
		} catch (Exception e) {
			throw new RuntimeException(e);
		} 
		return connection;
	}
*/	
}
