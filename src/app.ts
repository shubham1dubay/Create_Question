import express from 'express';
import questionRoutes from './routes/question.routes';
import questionTypeRoutes from './routes/question.routes'; // ✅ new
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';

const app = express();

app.use(express.json());

// Existing question CRUD API
app.use('/api', questionRoutes);

// New Question Type config API
app.use('/api/question-types', questionTypeRoutes); // ✅

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
