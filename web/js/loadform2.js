
//populate review table
function createReview(event) {
        event.preventDefault(); // stop form from submitting normally


        var a = $("#add_review_form").serializeArray();
        a.push({ name: "tab_id", value: "0"});
        //check array
        console.log(a);
        a = a.filter(function(item){return item.value != '';});

        $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: a,

        success: function(reports) {
        alert("Report was successfully submitted!"),
        showAllReports();
        document.getElementById("add_review_form").reset();

        },
        error: function (xhr, status, error) {
        alert("Status: " + status + "\nError: " + error);
        }
        });

        }
//placeholder for query reviews/trails
        function queryReviews(event) {
        event.preventDefault(); // stop form from submitting normally

        var a = $("#query_review_form").serializeArray();
        a.push({ name: "tab_id", value: "1" });
        a = a.filter(function(item){return item.value != '';});
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



        $("#add_review_form").on("submit",createReview); $("#report_submit_btn").on("click" ,createReview);
        $("#query_trail_form").on("submit",queryReviews); $("#query_submit_btn").on("click" ,queryReviews);