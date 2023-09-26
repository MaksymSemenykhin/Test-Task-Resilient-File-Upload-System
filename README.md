# Resilient File Upload System

## Description

This is a test assignment project that provides a resilient file upload system. The system can handle large file uploads and is capable of resuming the upload in case of interruptions due to network issues.

The system utilizes a client-side JavaScript logic to break the file into smaller chunks, which are then sent to the server individually. This chunking approach ensures that even in the face of connectivity issues, the upload can be resumed from the last successfully uploaded chunk.

## Features

- **Chunked Upload**: Large files are divided into smaller chunks for easier upload.
- **Resumable**: In case of network interruptions, the upload resumes from the last successful chunk.
- **Progress Bar**: Real-time feedback to the user about the upload progress.
- **Error Handling**: Displays error messages in case of any upload failures.

## Setup

1. Clone the repository.
2. Set up a local/remote server with PHP support.
3. Make sure the `upload.php` is properly configured to handle file chunks.
4. Access the `index.html` through your server to use the upload system.

## Usage

1. Click on the "Choose a file" button to select a file for upload.
2. Once the file is selected, the upload will begin automatically.
3. Monitor the progress via the progress bar.
4. If any error occurs, an error message will be displayed.

## Future Improvements

- Implement backend validation for security purposes.
- Add support for concurrent uploads of multiple files.
- Enhance UI/UX for better user experience.

