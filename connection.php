<?php
$username = $_POST['username'];
$password = $_POST['password'];

$conn = new mysqli('localhost','root','','avinash');
if ($conn -> connect_error){
    echo "$conn->connect_error";
    die("Registeration fail?".$conn ->connect_error);
}else{
    $stmt = $conn -> prepare("insert into register(username,password)values(?,?)");
    $stmt-> bind_param("ss",$username,$password);
    $execval = $stmt ->execute();
    echo $execval;
    echo'<script>
    alert("Registration suceessfully");
    window.location = "home.html";
    </script>';
     $stmt ->close();
     $conn ->close();

}
?>