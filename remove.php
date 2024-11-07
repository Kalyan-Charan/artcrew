<?php
header('Content-Type: application/json');
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != 'DELETE') {
    http_response_code(405);
    echo json_encode(array("error" => "Method not allowed"));
    exit;
}

$servername = "sql208.infinityfree.com";
$username = "if0_36889250";
$password = "NothingKalyan";
$dbname = "if0_36889250_db_onyx";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

$data = json_decode(file_get_contents("php://input"), true);
$product_id = $data['product_id'] ?? null;
$user_id = 1; // Replace with actual user ID

if ($product_id) {
    $stmt = $conn->prepare("DELETE FROM favorites WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("ii", $user_id, $product_id);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("error" => "Error: " . $stmt->error));
    }

    $stmt->close();
} else {
    echo json_encode(array("error" => "Invalid input"));
}

$conn->close();
?>
