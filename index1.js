const express = require('express');
const fs = require('fs');
const path = require('path');
const process = require('process');

const app = express();
const HostName = '127.0.0.1';
const PORT = process.env.PORT || 8000;

// Serve video file in chunks
app.get('/', (req, res) => {
    const videoPath = path.join(__dirname, 'video1.mp4'); // Path to your video file
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

app.listen(PORT, HostName, () => {
    console.log(`Server running at http://${HostName}:${PORT}/`);
});
