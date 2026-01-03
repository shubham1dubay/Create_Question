import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    //console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📘 Swagger: http://localhost:${PORT}/api-docs`);
});
