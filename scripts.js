const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB
let currentChunk = 0;
let fileChunks = [];

function getErrorMessageElement() {
    return document.getElementById('error-message');
}

function getProgressContainer() {
    return document.getElementById('progress-container');
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        updateProgress(0);
        getErrorMessageElement().style.display = 'none';
        getProgressContainer().style.display = 'block';
        uploadFile(file);
    }
}

function updateProgress(percentage) {
    document.getElementById('progress-bar').style.width = percentage + '%';
}

function displayError(message) {
    getErrorMessageElement().textContent = message;
    getErrorMessageElement().style.display = 'block';
}

function uploadFile(file) {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    fileChunks = Array.from({ length: totalChunks }, (_, i) => {
        const start = i * CHUNK_SIZE;
        const end = start + CHUNK_SIZE;
        return file.slice(start, end);
    });

    uploadChunk();
}

function uploadChunk() {
    if (currentChunk >= fileChunks.length) {
        setTimeout(() => getProgressContainer().style.display = 'none', 2000);
        updateProgress(100);
        return;
    }

    const formData = new FormData();
    formData.append("chunk", fileChunks[currentChunk]);
    formData.append("chunkNumber", currentChunk + 1);
    formData.append("totalChunks", fileChunks.length);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentChunk++;
                const percentage = (currentChunk / fileChunks.length) * 100;
                updateProgress(percentage);

                uploadChunk();
            } else {
                console.error("Error uploading chunk. Retrying...");
                displayError('Error during file chunk upload. Please retry.');
                setTimeout(uploadChunk, 2000);
            }
        })
        .catch(error => {
            console.error("Upload error:", error);
            displayError('Error during file upload. Please retry.');
            getProgressContainer().style.display = 'none';
            setTimeout(uploadChunk, 2000);
        });
}
