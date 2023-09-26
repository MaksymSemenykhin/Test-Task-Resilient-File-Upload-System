<?php
$uploadDir = 'uploads/';
$tempDir = $uploadDir . 'temp/';

// Create directories if they don't exist
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}
if (!is_dir($tempDir)) {
    mkdir($tempDir, 0755, true);
}

$chunkNumber = isset($_POST['chunkNumber']) ? intval($_POST['chunkNumber']) : 0;
$totalChunks = isset($_POST['totalChunks']) ? intval($_POST['totalChunks']) : 0;
$chunkFile = $tempDir . 'chunk_' . $chunkNumber;

// Move the uploaded chunk to the temp directory
if (move_uploaded_file($_FILES['chunk']['tmp_name'], $chunkFile)) {
    // If this was the last chunk, combine all chunks to create the final file
    if ($chunkNumber == $totalChunks) {
        $finalFile = $uploadDir . 'finalFile_' . time();
        for ($i = 1; $i <= $totalChunks; $i++) {
            $tempChunkFile = $tempDir . 'chunk_' . $i;
            file_put_contents($finalFile, file_get_contents($tempChunkFile), FILE_APPEND);
            unlink($tempChunkFile); // Remove chunk
        }
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to move uploaded chunk.']);
}
