<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Web Project</title>

        <!-- Custom styles -->
        <link rel="stylesheet" href="css/style.css">

        <!-- jQuery -->
        <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <!-- Google Map js libraries-->
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=AIzaSyBGtisrib48kcWMrl1_jc2q5JONciqgn8g&signed_in=true&libraries=geometry,places,visualization"></script>


</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
        <a class="navbar-brand">California Trails and Wildland Fire Application</a>
</nav>

<div class="container-fluid">
        <div class="row">
                <div class="sidebar col-xs-3">

                        <!-- Tab Navis-->
                        <ul class="nav nav-tabs">
                                <li><a href="#create_report" data-toggle="tab">Create Wildfire Report</a></li>
                                <li class="active"><a href="#review" data-toggle="tab">Add Trail Review</a></li>
                                <li><a href="#query_report" data-toggle="tab">Query Wildfires</a></li>
                                <li><a href="#query_trail" data-toggle="tab">Query Trails</a></li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content ">
                                <!-- Create Report Tab Panel -->
                                <div class="tab-pane" id="create_report">
                                        <form id = "create_report_form">
                                                <div><label>First Name:&nbsp</label><input placeholder="Enter your first name" name="fN"></div>
                                                <div><label>Last Name:&nbsp</label><input placeholder="Enter your last name" name="lN"></div>

                                                <div><label>Telephone:&nbsp</label><input placeholder="Enter telephone number" name="telephone"></div>
                                                <div><label>Email Acc:&nbsp</label><input placeholder="Enter your email address" name="email"></div>
                                                <div class="additional_msg_div" style="visibility: hidden"><label class="additional_msg"></label>
                                                        <select class="additional_msg_select" name="additional_message"></select>
                                                        //Spacing
                                                </div>

                                                <div><label>Type of Fire:</label>
                                                        <select name="fire_type">
                                                                <option value="">Choose the fire type</option>
                                                                //Crown fires burn trees up their entire length to the top. These are the most intense and dangerous wildland fires.
                                                                <option value="Crown">Crown</option>
                                                                //Surface fires burn only surface litter and duff. These are the easiest fires to put out and cause the least damage.
                                                                <option value="Surface">Surface</option>
                                                                //Ground fires move very slow but can become difficult to fully put out or suppress.
                                                                <option value="Ground">Ground</option>
                                                                //Option for other
                                                                <option value="Other">Other</option>
                                                        </select>
                                                </div>
                                                <div><label>Burn Severity:</label>
                                                        <select name="burn_type">
                                                                <option value="">Choose the burn severity</option>
                                                                <option value="Low">Low</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="High">High</option>
                                                        </select>
                                                </div>

                                                <div><label>Address:</label>
                                                        <input id="autocomplete" placeholder="Address" >
                                                </div>
                                                <div><label>Comment:&nbsp</label><input placeholder="Additional message" name="message"></div>
                                                <button type="submit" class="btn btn-default" id="report_submit_btn">
                                                        <span class="glyphicon glyphicon-star"></span> Submit
                                                </button>
                                        </form>
                                </div>

                                <!-- Add Review Panel -->
                                <div class="tab-pane active" id="review">
                                        <form id="review_form">
                                                <!--<div><label>Zoom to Location:</label>
                                                    <input id="autocomplete" placeholder="Location"></div> -->
                                                <div><label>Trail Name:&nbsp</label><input placeholder="Trail Name" name="trail_name"></div>
                                                <div><label>Date Hiked:&nbsp</label><input placeholder="Date mm/dd/yyyy" name="date_added"></div>
                                                <!--<div><label>Trail ID(Required):</label><input placeholder="Trail ID" name="trail_id"></div>-->
                                                <div>
                                                        <label><input type="radio" name="active" value="t">&nbspActive</label>
                                                        <label><input type="radio" name="active" value="f">&nbspInactive</label>
                                                </div>
                                                <div><label>Rating:</label>
                                                        <label><input type="radio" name="rating" value="1">&nbsp1</label>
                                                        <label><input type="radio" name="rating" value="2">&nbsp2</label>
                                                        <label><input type="radio" name="rating" value="3">&nbsp3</label>
                                                        <label><input type="radio" name="rating" value="4">&nbsp4</label>
                                                        <label><input type="radio" name="rating" value="5">&nbsp5</label>
                                                </div>
                                                <div>
                                                        <label>Click Map or enter</label><div><label> Latitude:</label>
                                                        <input type="text" id='lat' name="latitude"></div>
                                                        <div><label>Longitude:</label><input type="text" id='lon' name="longitude"></div>
                                                </div>
                                                <div><label>Comment:&nbsp</label><input placeholder="Comments" name="comments"></div>
                                                <button type="submit" class="btn btn-default" id="review_submit_btn">
                                                        <span class="glyphicon glyphicon-star"></span> Submit
                                                </button>
                                        </form>
                                </div>


                                <!-- Query Trail Panel -->
                                <div class="tab-pane" id="query_trail">
                                        <form id="query_review_form">
                                                <div><label>Trail Rating:</label>
                                                        <select name="q_rating">
                                                                <option value="">Choose Trail Rating</option>
                                                                <option value="1+">1+</option>
                                                                <option value="2+">2+</option>
                                                                <option value="3+">3+</option>
                                                                <option value="4+">4+</option>
                                                                <option value="5">5</option>
                                                        </select>
                                                </div>
                                                <div><label>Comment Key Word: </label>
                                                        <input type="text" name="q_keyword">
                                                </div>
                                                <div><label>Trail Name</label>
                                                        <input type="text" name="q_trail_name">
                                                </div>
                                                <button type="submit" class="btn btn-default" id="query_submit_btn">
                                                        <span class="glyphicon glyphicon-star"></span> Submit the query
                                                </button>
                                        </form>
                                </div>

                                <!-- Query Report Tab Panel -->
                                <div class="tab-pane" id="query_report">
                                        <form id = "query_report_form">
                                                <div><label>Burn Severity:</label>
                                                        <select name="burn_severity">
                                                                <option value="">Choose the fire intensity:</option>
                                                                <option value="low">Low</option>
                                                                <option value="medium">Medium</option>
                                                                <option value="high">High</option>
                                                                <option value="other">other</option>
                                                        </select>
                                                </div>
                                                <div><label>Type of Fire:</label>
                                                        <select name="fire_type">
                                                                <option value="">Choose the fire type</option>
                                                                //Crown fires burn trees up their entire length to the top. These are the most intense and dangerous wildland fires.
                                                                <option value="Crown">Crown</option>
                                                                //Surface fires burn only surface litter and duff. These are the easiest fires to put out and cause the least damage.
                                                                <option value="Surface">Surface</option>
                                                                //Ground fires move very slow but can become difficult to fully put out or suppress.
                                                                <option value="Ground">Ground</option>
                                                                //Option for other
                                                                <option value="Other">Other</option>
                                                        </select>
                                                </div>
                                                <button type="submit" class="btn btn-default">
                                                        <span class="glyphicon glyphicon-star"></span> Submit the query
                                                </button>
                                        </form>
                                </div>
                        </div>
                </div>

                <div id="map-canvas" class="col-xs-9"></div>

        </div>
</div>

<script src="js/loadform.js"></script>
<script src="js/loadmap.js"></script>

</body>
</html>