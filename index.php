<?php
header('Content-Type: application/json');

$servername = "sql208.infinityfree.com";
$username = "if0_36889250";
$password = "NothingKalyan";
$dbname = "if0_36889250_db_onyx";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

$sql = "SELECT * FROM favorites";
$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode(array("error" => "No results found"));
    }
} else {
    echo json_encode(array("error" => "Query error: " . $conn->error));
}

$conn->close();
?>
