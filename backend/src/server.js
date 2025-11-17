import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from 'path';
dotenv.config();
const app=express();
const __dirname=path.resolve();
const PORT=process.env.PORT || 5000;

app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use('/api/auth',authRoutes)
app.use ('/api/message',messageRoutes)

// --- DEPLOYMENT ---
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'../frontend/dist')));
    
    // For any route that is not an API route, serve the frontend's index.html file
    app.get("*", (_,res) => {
        res.sendFile(path.join(__dirname,'../frontend','dist','index.html'))
    });
} else {
    // Provide a default route for development mode
    app.get("/", (_, res) => {
        res.send("API is running in development mode.");
    });
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});