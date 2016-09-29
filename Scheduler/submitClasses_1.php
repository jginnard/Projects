<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "Scheduler";
$studentId = filter_var($_POST['studentId'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$term = filter_var($_POST['term'], FILTER_SANITIZE_STRING);


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
}
if(!empty($_POST['class1'])){
$sql .= ", ('".$studentId."', '".$_POST['class1']."', '".$term."')";
}
if(!empty($_POST['class2'])){
$sql .= ", ('".$studentId."', '".$_POST['class2']."', '".$term."')";
}
if(!empty($_POST['class3'])){
$sql .= ", ('".$studentId."', '".$_POST['class3']."', '".$term."')";
}
if(!empty($_POST['class4'])){
$sql .= ", ('".$studentId."', '".$_POST['class4']."', '".$term."')";
}
if(!empty($_POST['class5'])){
$sql .= ", ('".$studentId."', '".$_POST['class5']."', '".$term."')";
}
if(!empty($_POST['class6'])){
$sql .= ", ('".$studentId."', '".$_POST['class6']."', '".$term."')";
}
if(!empty($_POST['class7'])){
$sql .= ", ('".$studentId."', '".$_POST["class7"]."', '".$term."')";
}


if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
header("Location: emich_scheduler.html");
?>
