<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Jeremy Ginnard</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link href="../jginnard/default.css" rel="stylesheet" type="text/css" media="all" />
<link href="../jginnard/fonts.css" rel="stylesheet" type="text/css" media="all" />

<!-- Latest compiled and minified Bootstrap CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="../jginnard/bootstrap-dialog.min.css">

<!--My Custom Stylesheet, overrides Bootstrap-->
<link rel="stylesheet" href="../jginnard/custom.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="../jginnard/bootstrap-dialog.min.js"></script>

<!--Sliders-->
<link rel="stylesheet" id="themeCSS" href="jQRangeSlider-5.7.2/css/classic.css">
<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
<script src="jQRangeSlider-5.7.2/lib/jquery.mousewheel.min.js"></script>
<script src="jQRangeSlider-5.7.2/jQAllRangeSliders-min.js"></script>
<script src="sliders.js"></script>

 <script src="code.js"></script>
 <script src="report.js"></script>
 <link href='fullcalendar-2.6.0/fullcalendar.css' rel='stylesheet' />
 <link href='fullcalendar-2.6.0/fullcalendar.print.css' rel='stylesheet' media='print' />
 <script src='fullcalendar-2.6.0/lib/moment.min.js'></script>
 <!-- <script src='fullcalendar-2.6.0/lib/jquery.min.js'></script> -->
 <script src='fullcalendar-2.6.0/fullcalendar.min.js'></script>

 <!--Autocomplete-->
 <script src="../jginnard/jquery-ui.js"></script>
 <style>
 .honors{
   display: none;
 }
 table {
     width: 100%;
     border-collapse: collapse;
 }
 table, td, th {
     border: 1px solid black;
     padding: 5px;
 }
 th {text-align: left;}
 </style>

</head>
<body>

 <nav class="navbar navbar-default">
   <div class="container-fluid">
     <!-- Brand and toggle get grouped for better mobile display -->
     <div class="navbar-header">
       <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
         <span class="sr-only">Toggle navigation</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
       </button>
     </div>

     <!-- Collect the nav links, forms, and other content for toggling -->
     <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
       <ul class="nav navbar-nav">
         <li><a href="../jginnard/index.html">Homepage</a></li>
         <li><a href="../jginnard/about.html">About Me</a></li>
         <li class="active"><a href="../jginnard/projects.html">Projects<span class="sr-only">(current)</span></a></li>
         <li><a href="../jginnard/contact.html">Contact Me</a></li>
       </ul>
     </div><!-- /.navbar-collapse -->
   </div><!-- /.container-fluid -->
 </nav>


 <!-- Page Content -->
 <div class="container-fluid">

   <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
     <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

   <div class="row">
     <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
     <div class="title">
       <h2>EMU Scheduler</h2>
       <span class="byline" >Anticipated Registration Report</span> </div>
     <p>Select subjects or courses</p>
   </div>
 </div>
 <div class="row" onload="makeAutoFillList()">
   <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
     <div class="ui-widget">
       <form action="reports.php" method="POST">
        Term: <select name="term">
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
                <option value="summer">Summer</option>
              </select>
        Year: <input name="year" size="4">
        Subject: <input name="subject" size="4" id="reportSubject">
        Course: <input name="course" size="4">
        <input type="submit" value="Submit">
       </form>
      </div>
    </div>
 </div>

 <div class="row">
   <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
     <br>
     <?php
     $servername = "localhost";
     $username = "username";
     $password = "password";
     $dbname = "Scheduler";

     $course = "";
     $term = filter_var($_POST['term'] . $_POST['year'], FILTER_SANITIZE_STRING);
     $subject = strtoupper(filter_var($_POST['subject'], FILTER_SANITIZE_STRING));
     $course = filter_var($_POST['course'], FILTER_SANITIZE_STRING);

     $con = mysqli_connect($servername,$username,$password,$dbname);
     if (!$con) {
         die('Could not connect: ' . mysqli_error($con));
     }

if($_POST['course'] == ""){
  $query = "SELECT courses.crn, courses.subject, courses.course, courses.title, courses.capacity, COUNT(*) AS count  FROM courses JOIN registration ON courses.crn = registration.crn  WHERE registration.term = '".$term."' AND courses.subject = '".$subject."'  GROUP BY registration.crn";
}
else{
     $query = "SELECT courses.crn, courses.subject, courses.course, courses.title, courses.capacity, COUNT(*) AS count  FROM courses JOIN registration ON courses.crn = registration.crn  WHERE registration.term = '".$term."' AND courses.subject = '".$subject."' AND courses.course = '".$course."'  GROUP BY registration.crn";
}

     if ($stmt = $con->prepare($query)) {
         $stmt->execute();
         $stmt->bind_result($crn, $subject, $course, $title, $capacity, $count);
         if($term != null){
           print("<table><tr><th>CRN</th><th>Subject</th><th>Course</th><th>Title</th><th>Capacity</th><th>Plan to Register</th>");
        }
         while ($stmt->fetch()) {
             print("<tr><td>".$crn."</td><td>".$subject."</td><td>".$course."</td><td>".$title."</td><td>".$capacity."</td><td>".$count."</td></tr>");
         }
         print("</table>");
         $stmt->close();
     }

     mysqli_select_db($con,$dbname);

     $result = mysqli_query($con,$query);


     mysqli_close($con);
     ?>
   </div>
   </div>
</div>
 <footer class="footer navbar-fixed-bottom">
     <div class="row text-center">
         <div class="col-lg-12">
             <p>Copyright &copy; Jeremy Ginnard 2016
         <a href="https://www.linkedin.com/pub/jeremy-ginnard/36/138/29b" target="_blank">Linkedin </a>
         <a href="https://github.com/jginnard/" target="_blank"> GitHub </a>
         </p>
         </div>
     </div>
 </footer>
</body>
</html>
