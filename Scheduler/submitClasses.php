<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "Scheduler";
$studentId = filter_var($_POST['studentId'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$term = filter_var($_POST['term'], FILTER_SANITIZE_STRING);

$class0 = filter_var($_POST['class0'] , FILTER_SANITIZE_STRING);
$class1 = filter_var($_POST['class1'] , FILTER_SANITIZE_STRING);
$class2 = filter_var($_POST['class2'] , FILTER_SANITIZE_STRING);
$class3 = filter_var($_POST['class3'] , FILTER_SANITIZE_STRING);
$class4 = filter_var($_POST['class4'] , FILTER_SANITIZE_STRING);
$class5 = filter_var($_POST['class5'] , FILTER_SANITIZE_STRING);
$class6 = filter_var($_POST['class6'] , FILTER_SANITIZE_STRING);
$class7 = filter_var($_POST['class7'] , FILTER_SANITIZE_STRING);

//Email Setup
$headers = "From: noreply@scheduler.me\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
// The Message
$msg = "You have created a schedule for the ".$term." semester.<br>";
$msg .= "CRN Numbers:<br>";

//Insert User to Student Table
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO students (eid, email)
VALUES ('".$studentId."', '".$email."'); ";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();

//Insert Selection Into Registration Table
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if($class0){
$sql = "INSERT INTO registration (eid, crn, term)
VALUES ('".$studentId."', '".$class0."', '".$term."')";
$msg .= $class0."<br>";
}
if($class1){
$sql .= ", ('".$studentId."', '".$class1."', '".$term."')";
$msg .= $class1."<br>";
}
if($class2){
$sql .= ", ('".$studentId."', '".$class2."', '".$term."')";
$msg .= $class2."<br>";
}
if($class3){
$sql .= ", ('".$studentId."', '".$class3."', '".$term."')";
$msg .= $class3."<br>";
}
if($class4){
$sql .= ", ('".$studentId."', '".$class4."', '".$term."')";
$msg .= $class4."<br>";
}
if($class5){
$sql .= ", ('".$studentId."', '".$class5."', '".$term."')";
$msg .= $class5."<br>";
}
if($class6){
$sql .= ", ('".$studentId."', '".$class6."', '".$term."')";
$msg .= $class6."<br>";
}
if($class7){
$sql .= ", ('".$studentId."', '".$class7."', '".$term."')";
$msg .= $class7."<br>";
}


if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


// send email
$msg .= "<br><a href=\"www.emich.edu/registrar/calendars/appointments.php\">See Registration Dates</a>";
$msg .= "<br><br><a href=\"my.emich.edu/student\">Register Now</a>";
$msg .= "<br><br><a href=\"jeremyginnard.me/Scheduler/emich_scheduler.html\">Create Another Schedule</a>";

mail($email,"EMU Schedule",$msg, $headers);

header("Location: emich_scheduler.html");
