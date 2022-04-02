import org.apache.commons.lang3.StringUtils;

import java.sql.*;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class IPCCFunction {
    private final static String EMPTY = "";

    private static String getResultString(String sql, Map<Integer, String> params){
        String result = EMPTY;

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            Class.forName("cubrid.jdbc.driver.CUBRIDDriver");
            conn = DriverManager.getConnection("jdbc:default:connection:");
            pstmt = conn.prepareStatement(sql);
            for(int key : params.keySet()) {
                pstmt.setString(key, params.get(key));
            }

            rs = pstmt.executeQuery();
            if (rs.next()) {
                result = rs.getString(1);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        } finally {
            DbUtils.close(conn, pstmt, rs);
        }

        return result;
    }

    public static String changeNumberFormat(String p_num) {
        if(p_num == null || p_num.isEmpty()) {
            return EMPTY;
        } else {
            return NumberFormat.getInstance(Locale.KOREA).format(Long.parseLong(p_num));
        }
    }

    public static String getCodeNm(String p_cd, String p_tp_cd) {
        String sql = "SELECT CD_NM FROM SM002 WHERE TP_CD = ? AND CD = ?";
        Map<Integer, String> params = new HashMap<Integer, String>();
        params.put(1, p_tp_cd);
        params.put(2, p_cd);

        return getResultString(sql, params);
    }

    public static String getFormatDate(String p_date) {
        if(StringUtils.isBlank(p_date)) {
            return EMPTY;
        } else {
            return p_date.substring(0, 4) + "-" + p_date.substring(4, 6) + "-" + p_date.substring(6, 8);
        }
    }

    public static String getFormatPhoneNum(String p_pn) {
    	String result = EMPTY;
    	if(StringUtils.isBlank(p_pn)) {
            return EMPTY;
        } else if (p_pn.length() == 8) {
            result = p_pn.substring(0, 4) + "-" + p_pn.substring(4, 8);
        } else {
            result = p_pn.replaceFirst("(^02|010\\d{0}|\\d{3})(\\d+)(\\d{4})", "$1-$2-$3");
        }
        return result;
    }

    public static String getFormatTime(String p_time) {
        return p_time.substring(0, 2) + ":" + p_time.substring(2, 4);
    }

    public static String getFormatHMS(int second) {
        return getTimeFormatString(second, 0);
    }

    public static String getSecondToTime(int second) {
        return getTimeFormatString(second, 1);
    }

    private static String getTimeFormatString(final int second, final int type) {
        int hour, min, sec;

        String join = type == 0 ? " :" : ":";

        sec = second;
        min = sec / 60;
        hour = min / 60;
        sec = sec % 60;
        min = min % 60;


        DecimalFormat df1 = new DecimalFormat("#,###");
        DecimalFormat df2 = new DecimalFormat("00");

        return df1.format(hour) + join + df2.format(min) + join + df2.format(sec);
    }

    public static String getTypeCode(String parnt, String lvl) {
        String sql = "SELECT ";

        switch (lvl) {
            case "1" : sql += "LPAD(MAX(SUBSTR(CTG_CD,1,2))+1,2,'0')||'000000' "; break;
            case "2" : sql += "SUBSTR(GET_PARNT,1,2)|| LPAD(COUNT(*)+1,2,'0')||'0000'" ; break;
            case "3" : sql += "SUBSTR(GET_PARNT,1,4)|| LPAD(COUNT(*)+1,2,'0')||'00' "; break;
            case "4" : sql += "SUBSTR(GET_PARNT,1,6)|| LPAD(COUNT(*)+1,2,'0') "; break;
            default: sql = EMPTY; break;
        }

        if(!EMPTY.equals(sql)) {
            sql += "FROM OM020 WHERE CTG_LVL = " + lvl + " AND PARNT_CD = ?";
        }

        Map<Integer, String> params = new HashMap<Integer, String>();
        params.put(1, parnt);

        return getResultString(sql, params);
    }

    public static String getTypeNm(String cd, String lvl) {
        String sql = "SELECT CTG_CD_NM FROM OM020 WHERE CTG_LVL = ? AND CTG_CD = ?";

        Map<Integer, String> params = new HashMap<Integer, String>();
        params.put(1, lvl);
        params.put(2, cd);

        return getResultString(sql, params);
    }

    public static String getUserNm(String org, String usrId) {
        String sql = "SELECT ";

        switch (org) {
            case "CC" : sql += "NVL(USR_NM,'') "; break;
            case "AAO" : sql += "NVL(ORGFULLNAME,'') " ; break;
            case "AAU" : sql += "NVL(USERFULLNAME,'') "; break;
            case "AAD" : sql += "NVL(DISPLAYNAME,'') "; break;
            default: sql = EMPTY; break;
        }

        if(!EMPTY.equals(sql)) {
            if("CC".equals(org)) {
                sql += "FROM OM001 WHERE USR_ID = ?";
            } else {
                sql += "FROM OM061 WHERE UID_ = ?";
            }
        }

        Map<Integer, String> params = new HashMap<Integer, String>();
        params.put(1, usrId);

        return getResultString(sql, params);
    }

    public static String getWorkDate(String vstdDt, int days) {
        String sql = EMPTY;

        sql += "SELECT YMD FROM ( ";
        sql += " SELECT A.YMD ";
        sql += " FROM ";
        sql += " ( ";
        sql += "  SELECT TO_CHAR(X.YMD_DATE - 1 + LEVEL, 'YYYYMMDD') AS YMD ";
        sql += "  FROM (SELECT TO_DATE(?, 'YYYYMMDD') AS YMD_DATE) X ";
        sql += "  WHERE (X.YMD_DATE - 1 + LEVEL) <= X.YMD_DATE + 30 ";
        sql += "   AND TO_CHAR((X.YMD_DATE - 1 + LEVEL), 'D') <> '1' AND TO_CHAR((X.YMD_DATE - 1 + LEVEL), 'D') <> '7' ";
        sql += "   CONNECT BY LEVEL <= 20 ";
        sql += " ) A ";
        sql += " WHERE ROWNUM < " + days + " + 1 ";
        sql += " ORDER BY YMD DESC ";
        sql += ") ";
        sql += "WHERE ROWNUM = 1 ";

        Map<Integer, String> params = new HashMap<Integer, String>();
        params.put(1, vstdDt);

        return getResultString(sql, params);
    }

    public static void main(String[] args) {
        System.out.println(getFormatPhoneNum(null));
        System.out.println(getFormatPhoneNum("0215441544"));
    }
}