import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DbUtils {
    public static void close(Connection conn, PreparedStatement pstmt, ResultSet rs) {
        try {
            if(pstmt != null) {
                pstmt.close();
            }
            if(rs != null) {
                rs.close();
            }
            if(conn != null) {
                conn.close();
            }
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        }
    }
}
