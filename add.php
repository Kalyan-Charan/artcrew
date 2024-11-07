<?php
header('Content-Type: application/json');

// Database connection details
$servername = "sql208.infinityfree.com";
$username = "if0_36889250";
$password = "NothingKalyan";
$dbname = "if0_36889250_db_onyx";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

// Handle API requests
$requestMethod = $_SERVER["REQUEST_METHOD"];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

switch ($requestMethod) {
    case 'GET':
        handleGetRequest($conn, $endpoint);
        break;
    case 'POST':
        handlePostRequest($conn);
        break;
    case 'PUT':
        handlePutRequest($conn);
        break;
    case 'DELETE':
        handleDeleteRequest($conn, $endpoint);
        break;
    default:
        http_response_code(405);
        echo json_encode(array("error" => "Method not allowed"));
        break;
}

$conn->close();

function handleGetRequest($conn, $endpoint) {
    if ($endpoint == 'favorites') {
        $sql = "SELECT * FROM favorites";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        } else {
            echo json_encode(array("error" => "No records found"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid endpoint"));
    }
}

function handlePostRequest($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $product_id = $data['product_id'] ?? null;
    $user_id = 1; // Replace with actual user ID

    if ($product_id) {
        $stmt = $conn->prepare("INSERT INTO favorites (user_id, product_id) VALUES (?, ?)");
        $stmt->bind_param("ii", $user_id, $product_id);

        if ($stmt->execute()) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("error" => "Error: " . $stmt->error));
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid input"));
    }
}

function handlePutRequest($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;
    $product_id = $data['product_id'] ?? null;
    $user_id = $data['user_id'] ?? null;

    if ($id && $product_id && $user_id) {
        $stmt = $conn->prepare("UPDATE favorites SET user_id=?, product_id=? WHERE id=?");
        $stmt->bind_param("iii", $user_id, $product_id, $id);

        if ($stmt->execute()) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("error" => "Error: " . $stmt->error));
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid input"));
    }
}

function handleDeleteRequest($conn, $endpoint) {
    $id = (int)$endpoint;

    if ($id) {
        $stmt = $conn->prepare("DELETE FROM favorites WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("error" => "Error: " . $stmt->error));
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid input"));
    }
}
?>
