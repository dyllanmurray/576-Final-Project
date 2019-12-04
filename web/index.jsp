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
                                <li class="active"><a href="#create_report" data-toggle="tab">Create Report</a></li>
                                <li><a href="#query_report" data-toggle="tab">Query</a></li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content ">
                                <!-- Create Report Tab Panel -->
                                <div class="tab-pane active" id="create_report">
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
                                                <div><label>Fire Severity:</label>
                                                        <select name="fire_severity">
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

                                <!-- Query Report Tab Panel -->
                                <div class="tab-pane" id="query_report">
                                        <form id = "query_report_form">
                                                <div><label>Report Type:</label>
                                                        <select onchange="onSelectReportType(this)" name="report_type">
                                                                <option value="">Choose the report type</option>
                                                                <option value="donation">Donation</option>
                                                                <option value="request">Request</option>
                                                                <option value="damage">Damage Report</option>
                                                        </select>
                                                </div>
                                                <div class="additional_msg_div" style="visibility: hidden"><label class="additional_msg"></label>
                                                        <select class="additional_msg_select" name="resource_or_damage"></select>
                                                </div>
                                                <div><label>Disaster Type:</label>
                                                        <select name="disaster_type">
                                                                <option value="">Choose the disaster type</option>
                                                                <option value="flood">flood</option>
                                                                <option value="wildfire">wildfire</option>
                                                                <option value="earthquake">earthquake</option>
                                                                <option value="tornado">tornado</option>
                                                                <option value="hurricane">hurricane</option>
                                                                <option value="other">other</option>
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