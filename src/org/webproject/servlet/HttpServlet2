package org.webproject.servlet;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


/** Servlet implementation class HttpServlet*/


@WebServlet("/HttpServlet")
public class HttpServlet extends javax.servlet.http.HttpServlet {
    private static final long serialVersionUID = 1L;


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

        // submit a new trail review
        if (tab_id.equals("0")) {
            System.out.println("Your Trail review has been submitted!");
            try {
                createNewReview(request, response);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        // query reports
        if (tab_id.equals("1")) {
            try {
                queryReviews(request, response);
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    private void createNewReview(HttpServletRequest request, HttpServletResponse
            response) throws SQLException, IOException {
        DBUtility dbutil = new DBUtility();
        String sql;

        // create new trail review

        review_id = 0;
        String trail_name = request.getParameter("trail_name");

        //String trail_id = request.getParameter("trail_id");
        String longitude = request.getParameter("longitude");
        String latitude = request.getParameter("latitude");

        String comments = request.getParameter("comments");
        String date_added = request.getParameter("date_added");
        String active = request.getParameter("active");
        String rating = request.getParameter("rating");
        //String user = request.getParameter("user");



        if (trail_name != null) {trail_name = "'" + trail_name + "'";}
        //if (trail_id != null) {trail_id = "'" + trail_id + "'";}
        if (comments != null) {comments = "'" + comments + "'";}
        if (date_added != null) {date_added = "'" + date_added + "'";}
        if (active != null) {active = "'" + active + "'";}
        if (rating != null) {rating = "'" + rating + "'";}
        if (longitude != null) {longitude = "'" + longitude + "'";}
        if (latitude != null) {latitude = "'" + latitude + "'";}
        // if (user != null) {user = "'" + user + "'";}


        //sql statement to add to db
        sql = "insert into trail_review (date_added, active, rating, comments, longitude, latitude, trail_name) "//, user) "
                + "values (" + date_added + "," + active  + "," + rating + "," + comments + "," + longitude + "," + latitude + "," + trail_name + ")";//"," + user + ")";


        dbutil.modifyDB(sql);

        // record report_id
        ResultSet res_1 = dbutil. queryDB("select last_value from trail_review_id_seq");
        res_1.next();
        review_id = res_1.getInt(1);

        System.out.println("Success! Review created.");

        System.out.println(sql);

        // response that the report submission is successful
        JSONObject data = new JSONObject();
        try {
            data.put("status", "success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        response.getWriter().write(data.toString());


    } //end of create


    private void queryReviews(HttpServletRequest request, HttpServletResponse
            response) throws JSONException, SQLException, IOException {
        JSONArray list = new JSONArray();
        DBUtility dbutil = new DBUtility();

        String rating = request.getParameter("q_rating");
        String keyword = request.getParameter("q_keyword");
        String trailName = request.getParameter("q_trail_name");
        String sql = "Select * from Trail_Review ";

        //count keeps track of the query
        //  0 = rating only
        //  1 = keyword only,
        //  2 = trailname only,
        //  3 = keyword and trailname
        //  -1 = all null
        int count = -1;

        String whererating = "";
        String wherekeyword = "";
        String wheretrailname = "";

        if (rating != null){
            whererating = "cast(rating as int) >= " + rating.substring(0,1);
            count = 0;
        }
        else {
            whererating = "cast(rating as int) >= 0";
        }

        if (keyword != null){
            wherekeyword = "lower(comments) like '%" + keyword.toLowerCase() + "%'";
            count = 1;
        }

        if (trailName != null){
            wheretrailname = "lower(trail_name) like '%" + trailName.toLowerCase() + "%'";
            if (count == 1) {
                count = 3;
            }
            else count = 2;
        }

        String where = "";

        if (count == -1){
            where = "";
        }
        else if (count == 0){
            where = "Where " + whererating;
        }
        else if (count == 1) {
            where = "Where " + whererating + " and " + wherekeyword;
        }
        else if (count == 2) {
            where = "Where " + whererating + " and " + wheretrailname;
        }
        else if (count == 3) {
            where = "Where " + whererating + " and " + wherekeyword + " and " + wheretrailname;
        }

        sql += where;

        System.out.println(sql);

        ResultSet res = dbutil.queryDB(sql);

        while (res.next()) {
            // this is where we list the data we want to get back
            HashMap<String, String> m = new HashMap<String,String>();
            m.put("trail_id", res.getString("trail_id"));

            m.put("trail_name", res.getString("trail_name"));

            m.put("longitude", res.getString("longitude"));
            m.put("latitude", res.getString("latitude"));

            m.put("comments", res.getString("comments"));
            m.put("date_added", res.getString("date_added"));

            m.put("active", res.getString("active"));
            m.put("rating", res.getString("rating"));
            list.put(m);
        }

        response.getWriter().write(list.toString());

    }

    // Method to allow the user to add a new trail head not on the map
    //let's hold off on this till we know the rest works
//    private void addTrailHead(HttpServletRequest request, HttpServletResponse
//            response) throws JSONException, SQLException, IOException {
//
//
//
//    }

    // Method to allow the user to query Trails based on criteria
//    private void queryTrails(HttpServletRequest request, HttpServletResponse
//            response) throws JSONException, SQLException, IOException {
//
//        JSONArray list = new JSONArray();
//        DBUtility dbutil = new DBUtility();
//        String sql = "select * from trailheads";
//
//        ResultSet res = dbutil.queryDB(sql);
//        while (res.next()) {
//            // this is where we list the data we want to get back
//            HashMap<String, String> m = new HashMap<String, String>();
//            m.put("trailhead_ID", res.getString("trailhead_ID"));
//
//            m.put("name", res.getString("primaryname"));
//            m.put("comments", res.getString("comments"));
//            m.put("longitude", res.getString("lon"));
//            m.put("latitude", res.getString("lat"));
//            list.put(m);
//        }
//        response.getWriter().write(list.toString());
//
//    }

    private void queryHistoricWildfire(HttpServletRequest request, HttpServletResponse
            response) throws JSONException, SQLException, IOException {

        //TODO
    }

    public void main() throws JSONException {
    }
}