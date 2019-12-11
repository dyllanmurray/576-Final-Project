package org.webproject.servlet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

/**
 * Servlet implementation class HttpServlet
 */
@WebServlet("/HttpServlet")
public class HttpServlet extends javax.servlet.http.HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     // @see javax.servlet.http.HttpServlet javax.servlet.http.HttpServlet()
     */
    public HttpServlet() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }


    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse
            response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String tab_id = request.getParameter("tab_id");

        // create wildfire report
        if (tab_id.equals("0")) {
            System.out.println("Your wildfire report has been submitted!");
            try {
                createReport(request, response);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        //create trail review
        else if (tab_id.equals("1")) {
            System.out.println("Your trail review has been submitted!");
            try {
                createReview(request, response);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // query wildfire reports
        else if (tab_id.equals("2")) {
            try {
                queryReport(request, response);
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        // query trail reviews
        else if (tab_id.equals("3")) {
            try {
                queryReview(request, response);
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    private void createReport(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        DBUtility dbutil = new DBUtility();
        String sql;
        // create user
        int user_id = 0;
        String fN = request.getParameter("fN");
        String lN = request.getParameter("lN");
        String tel = request.getParameter("tel");
        String email = request.getParameter("email");
        if (fN != null) {fN = "'" + fN + "'";}
        if (lN != null) {lN = "'" + lN + "'";}
        if (tel != null) {tel = "'" + tel + "'";}
        if (email != null) {email = "'" + email + "'";}

        // record user_id
        ResultSet res_2 = dbutil.queryDB("select last_value from person_id_seq");
        res_2.next();
        user_id = res_2.getInt(1);

        System.out.println("Success! User created.");

        // 3. create report
        int report_id = 0;
        String report_type = request.getParameter("report_type");
        String lon = request.getParameter("longitude");
        String lat = request.getParameter("latitude");
        String message = request.getParameter("message");
        String add_msg = request.getParameter("additional_message");
        if (report_type != null) {report_type = "'" + report_type + "'";}
        if (message != null) {message = "'" + message + "'";}
        if (add_msg != null) {add_msg = "'" + add_msg + "'";}

        sql = "insert into report (reportor_id, report_type, geom," +
                " message) values (" + user_id + "," + report_type + "," + ", ST_GeomFromText('POINT(" + lon + " " + lat
                + ")', 4326)" + "," + message + ")";
        dbutil.modifyDB(sql);

        // record report_id
        ResultSet res_3 = dbutil.queryDB("select last_value from report_id_seq");
        res_3.next();
        report_id = res_3.getInt(1);

        System.out.println("Success! Report created.");

        // 4. create specific report
        if (report_type.equals("'wildfire'")) {
            sql = "insert into wildfire_report (report_id, fire_type, burn_severity) values ('"
                    + report_id + "'," + add_msg + ")";
            System.out.println("Success! Wildfire report created.");
        }
        else {
            return;
        }
        dbutil.modifyDB(sql);

        // response that the report submission is successful
        JSONObject data = new JSONObject();
        try {
            data.put("status", "success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        response.getWriter().write(data.toString());
    }

    private void createReview(HttpServletRequest request, HttpServletResponse
            response) throws SQLException, IOException {
        DBUtility dbutil = new DBUtility();
        String sql;

        // create user
        int user_id = 0;
        String fN = request.getParameter("fN");
        String lN = request.getParameter("lN");
        String tel = request.getParameter("tel");
        String email = request.getParameter("email");
        if (fN != null) {fN = "'" + fN + "'";}
        if (lN != null) {lN = "'" + lN + "'";}
        if (tel != null) {tel = "'" + tel + "'";}
        if (email != null) {email = "'" + email + "'";}

        // record user_id
        ResultSet res_2 = dbutil.queryDB("select last_value from person_id_seq");
        res_2.next();
        user_id = res_2.getInt(1);

        System.out.println("Success! User created.");

        // 3. create report
        int report_id = 0;
        String report_type = request.getParameter("report_type");
        String lon = request.getParameter("longitude");
        String lat = request.getParameter("latitude");
        String message = request.getParameter("message");
        String add_msg = request.getParameter("additional_message");
        if (report_type != null) {report_type = "'" + report_type + "'";}
        if (message != null) {message = "'" + message + "'";}
        if (add_msg != null) {add_msg = "'" + add_msg + "'";}

        sql = "insert into report (reportor_id, report_type, geom," +
                " message) values (" + user_id + "," + report_type + "," + ", ST_GeomFromText('POINT(" + lon + " " + lat
                + ")', 4326)" + "," + message + ")";
        dbutil.modifyDB(sql);

        // record report_id
        ResultSet res_3 = dbutil.queryDB("select last_value from report_id_seq");
        res_3.next();
        report_id = res_3.getInt(1);

        System.out.println("Success! Review created.");

        // 4. create specific report
        if (report_type.equals("'review'")) {
            sql = "insert into review_report (report_id, ) values ('"
                    + report_id + "'," + add_msg + ")";
            System.out.println("Success! Review created.");
        } else {
            return;
        }
        dbutil.modifyDB(sql);

        // response that the report submission is successful
        JSONObject data = new JSONObject();
        try {
            data.put("status", "success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        response.getWriter().write(data.toString());

    }

    private void queryReport(HttpServletRequest request, HttpServletResponse
            response) throws JSONException, SQLException, IOException {
        JSONArray list = new JSONArray();

        String report_type = request.getParameter("report_type");
        String fire_type = request.getParameter("fire_type");
        String burn_severity = request.getParameter("burn_severity");

        // request report
        if (report_type == null || report_type.equalsIgnoreCase("wildfire")) {
            String sql = "select report.id, report_type, fire_type, " +
                    "burn_severity, first_name, last_name, time_stamp, ST_X(geom) as " +
                    "longitude, ST_Y(geom) as latitude, message from report, person, " +
                    "request_report where reportor_id = person.id and report.id = " +
                    "report_id";
            queryReportHelper(sql,list, fire_type,burn_severity);
        }
        response.getWriter().write(list.toString());
    }

    private void queryReview(HttpServletRequest request, HttpServletResponse response)
            throws JSONException, SQLException, IOException {
        JSONArray list = new JSONArray();

        String report_type = request.getParameter("report_type");
        String q_rating = request.getParameter("q_rating");
        String q_keyword = request.getParameter("q_keyword");
        String q_trail_head = request.getParameter("q_trail_head");

        // request report
        if (report_type == null || report_type.equalsIgnoreCase("wildfire")) {
            String sql = "select report.id, report_type, q_rating, " +
                    "q_keyword, q_trail_head, ST_X(geom) as " +
                    "longitude, ST_Y(geom) as latitude, message from report," +
                    "report_id";
            queryReviewHelper(sql,list, q_rating,q_keyword,q_trail_head);
        }
        response.getWriter().write(list.toString());
    }

    private void queryReportHelper(String sql, JSONArray list,
                                   String fire_type, String burn_severity) throws SQLException {
        DBUtility dbutil = new DBUtility();
        if (fire_type != null) {
            sql += " and fire_type = '" + fire_type + "'";
        }
        if (burn_severity != null) {
            sql += " and burn_severity = '" + burn_severity + "'";
        }
        ResultSet res = dbutil.queryDB(sql);
        while (res.next()) {
            // add to response
            HashMap<String, String> m = new HashMap<String,String>();
            m.put("report_id", res.getString("id"));
            m.put("report_type", res.getString("report_type"));

            if ("wildfire".equalsIgnoreCase("wildfire")) {
                m.put("fire_type", res.getString("fire_type"));
            }
            m.put("wildfire", res.getString("burn_severity"));
            m.put("first_name", res.getString("first_name"));
            m.put("last_name", res.getString("last_name"));
            m.put("time_stamp", res.getString("time_stamp"));
            m.put("longitude", res.getString("longitude"));
            m.put("latitude", res.getString("latitude"));
            m.put("message", res.getString("message"));
            list.put(m);
        }
    }

    private void queryReviewHelper(String sql, JSONArray list,
                                   String q_rating, String q_keyword, String q_trail_name) throws SQLException {
        DBUtility dbutil = new DBUtility();
        if (q_rating != null) {
            sql += " and q_rating = '" + q_rating + "'";
        }
        if (q_keyword != null) {
            sql += " and q_keyword = '" + q_keyword + "'";
        }
        if (q_trail_name != null) {
            sql += " and q_trail_name = '" + q_trail_name + "'";
        }
        ResultSet res = dbutil.queryDB(sql);
        while (res.next()) {
            // add to response
            HashMap<String, String> m = new HashMap<String,String>();
            m.put("report_id", res.getString("id"));
            m.put("report_type", res.getString("report_type"));
            if ("review".equalsIgnoreCase("review")) {
                m.put("q_rating", res.getString("q_rating"));
            }
            m.put("q_keyword", res.getString("q_keyword"));
            m.put("q_trail_name", res.getString("q_trail_name"));
            m.put("longitude", res.getString("longitude"));
            m.put("latitude", res.getString("latitude"));
            m.put("message", res.getString("message"));
            list.put(m);
        }
    }

    public void main() throws JSONException {
    }
}