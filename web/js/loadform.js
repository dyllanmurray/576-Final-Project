// function to reset form after a create report is entered
function resetForm(){
    document.getElementById("create_report_form").reset(); //reset form
    $('#create_report_form').find(".additional_msg_div").css("visibility", "hidden"); //change hidden message back to hidden
}

// create report when button is pressed
function createReport(event){
    event.preventDefault();// // stop form from submitting normally
    //create variable and assign as a serialized array
    var a = $("#create_report_form").serializeArray();
    a.push({name: "tab_id", value: "0"});//push the items to make sure create a report is ran in the servlett
    // push to a the long and lat of the location selected by user
    a.push({name: "longitude", value: place.geometry.location.lng()});
    a.push({name: "latitude", value: place.geometry.location.lat()});
    a = a.filter(function(item){return item.value !='';}); //filter out items that do not have values
    $.ajax({//ajax command to get data together
        url: 'HttpServlet',
        type: 'POST',
        data: a,
        success: function (reports){
            alert("The Report is successfully submitted!");
            //mapInitialiazion(reports);
            //reset the form
            resetForm();
            $.ajax({// this ajax will query all reports to zoom out and show on main map
                url: 'HttpServlet',
                type: 'POST',
                data: { "tab_id": "1"},
                success: function(reports) {
                    mapInitialization(reports);
                    // BONUS QUESTION #4.6
                    onPlaceChanged(reports);
                    // showAllReports()
                },

                error: function(xhr, status, error) {
                    alert("An AJAX error occured: " + status + "\nError: " + error);
                }
            });
        },
        error: function(xhr, status, error){
            alert("Status: " + status+"\nError: "+error);
        }
    });
}
$("#create_report_form").on("submit",createReport);

function createReview(event){
    event.preventDefault();// // stop form from submitting normally
    //create variable and assign as a serialized array
    var a = $("#review_form").serializeArray();
    a.push({name: "tab_id", value: "1"});//push the items to make sure create a report is ran in the servlett
    // push to a the long and lat of the location selected by user
    a.push({name: "longitude", value: place.geometry.location.lng()});
    a.push({name: "latitude", value: place.geometry.location.lat()});
    a = a.filter(function(item){return item.value !='';}); //filter out items that do not have values
    $.ajax({//ajax command to get data together
        url: 'HttpServlet',
        type: 'POST',
        data: a,
        success: function (reports){
            alert("The Report is successfully submitted!");
            //mapInitialiazion(reports);
            //reset the form
            resetForm();
            $.ajax({// this ajax will query all reports to zoom out and show on main map
                url: 'HttpServlet',
                type: 'POST',
                data: { "tab_id": "1"},
                success: function(reports) {
                    mapInitialization(reports);
                    // BONUS QUESTION #4.6
                    onPlaceChanged(reports);
                    // showAllReports()
                },

                error: function(xhr, status, error) {
                    alert("An AJAX error occured: " + status + "\nError: " + error);
                }
            });
        },
        error: function(xhr, status, error){
            alert("Status: " + status+"\nError: "+error);
        }
    });
}
$("#review_form").on("submit",createReview);

//run query when button is pressed
function queryReport(event) {
    event.preventDefault(); // stop form from submitting normally

    var a = $("#query_report_form").serializeArray();
    a.push({ name: "tab_id", value: "2" });// call to query the database
    a = a.filter(function(item){return item.value != '';});//remove items with no values
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: a,
        success: function(reports) {
            mapInitialization(reports);
        },
        error: function(xhr, status, error) {
            alert("Status: " + status + "\nError: " + error);
        }
    });
}

$("#query_report_form").on("submit",queryReport);

//run query when button is pressed
function queryReview(event) {
    event.preventDefault(); // stop form from submitting normally

    var a = $("#query_review_form").serializeArray();
    a.push({ name: "tab_id", value: "3" });// call to query the database
    a = a.filter(function(item){return item.value != '';});//remove items with no values
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: a,
        success: function(reports) {
            mapInitialization(reports);
        },
        error: function(xhr, status, error) {
            alert("Status: " + status + "\nError: " + error);
        }
    });
}

$("#query_review_form").on("submit",queryReview);

