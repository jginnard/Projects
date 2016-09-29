<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "Scheduler";
$studentId = filter_var($_POST['studentId'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$term = filter_var($_POST['term'], FILTER_SANITIZE_STRING);


//Email Setup
// the message
$headers = "From: noreply@scheduler.me\r\n";
//$headers .= "Reply-To: ". strip_tags($_POST['req-email']) . "\r\n";
//$headers .= "CC: susan@example.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

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

if(!empty($_POST['class0'])){
$sql = "INSERT INTO registration (eid, crn, term)
VALUES ('".$studentId."', '".$_POST['class0']."', '".$term."')";
$msg .= $_POST['class0']."<br>";
}
if(!empty($_POST['class1'])){
$sql .= ", ('".$studentId."', '".$_POST['class1']."', '".$term."')";
$msg .= $_POST['class1']."<br>";
}
if(!empty($_POST['class2'])){
$sql .= ", ('".$studentId."', '".$_POST['class2']."', '".$term."')";
$msg .= $_POST['class2']."<br>";
}
if(!empty($_POST['class3'])){
$sql .= ", ('".$studentId."', '".$_POST['class3']."', '".$term."')";
$msg .= $_POST['class3']."<br>";
}
if(!empty($_POST['class4'])){
$sql .= ", ('".$studentId."', '".$_POST['class4']."', '".$term."')";
$msg .= $_POST['class4']."<br>";
}
if(!empty($_POST['class5'])){
$sql .= ", ('".$studentId."', '".$_POST['class5']."', '".$term."')";
$msg .= $_POST['class5']."<br>";
}
if(!empty($_POST['class6'])){
$sql .= ", ('".$studentId."', '".$_POST['class6']."', '".$term."')";
$msg .= $_POST['class6']."<br>";
}
if(!empty($_POST['class7'])){
$sql .= ", ('".$studentId."', '".$_POST["class7"]."', '".$term."')";
$msg .= $_POST['class7']."<br>";
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
// use wordwrap() if lines are longer than 70 characters
//$msg = wordwrap($msg,70);

mail($email,"EMU Schedule",$msg, $headers);

header("Location: emich_scheduler.html");
?>
