const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import cors package
const rangeParser = require('range-parser'); // Optional for handling Range requests

const app = express();

const PORT = process.env.PORT || 8000;


app.use(cors()); // Add this line to enable CORS for all routes

app.get('/', (req, res) => {
    const videoPath = path.join(__dirname, 'video2.mp4');
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    // Optional: Handle Range requests for video seeking
    const range = req.headers.range;
    if (range) {
        const parts = rangeParser(fileSize, range); // Parse Range header
        if (parts === -1) {
            // Range not satisfiable
            res.status(416).send('Requested Range Not Satisfiable');
            return;
        }

        const start = parts[0].start;
        const end = parts[0].end;
        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);
        file.pipe(res);
    } else {
        // No Range header, stream entire video
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
    }
});


app.get('/', (req, res) => {
    const videoPath = path.join(__dirname, 'video1.mp4');
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    // Optional: Handle Range requests for video seeking
    const range = req.headers.range;
    if (range) {
        const parts = rangeParser(fileSize, range); // Parse Range header
        if (parts === -1) {
            // Range not satisfiable
            res.status(416).send('Requested Range Not Satisfiable');
            return;
        }

        const start = parts[0].start;
        const end = parts[0].end;
        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);
        file.pipe(res);
    } else {
        // No Range header, stream entire video
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
    }
});



app.get('/video2', (req, res) => {
    const videoPath = path.join(__dirname, 'video2.mp4');
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    // Optional: Handle Range requests for video seeking
    const range = req.headers.range;
    if (range) {
        const parts = rangeParser(fileSize, range); // Parse Range header
        if (parts === -1) {
            // Range not satisfiable
            res.status(416).send('Requested Range Not Satisfiable');
            return;
        }

        const start = parts[0].start;
        const end = parts[0].end;
        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);
        file.pipe(res);
    } else {
        // No Range header, stream entire video
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
    }
});


app.get('/video3', (req, res) => {
    const videoPath = path.join(__dirname, 'video3.mp4');
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    // Optional: Handle Range requests for video seeking
    const range = req.headers.range;
    if (range) {
        const parts = rangeParser(fileSize, range); // Parse Range header
        if (parts === -1) {
            // Range not satisfiable
            res.status(416).send('Requested Range Not Satisfiable');
            return;
        }

        const start = parts[0].start;
        const end = parts[0].end;
        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);
        file.pipe(res);
    } else {
        // No Range header, stream entire video
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
    }
});


app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
