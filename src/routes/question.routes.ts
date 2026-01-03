import { Router } from 'express';
import { getQuestionTypeConfig, createQuestion } from '../controllers/question.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Get all question types
//router.get('/question-types', getQuestionTypes);

// Get template for a question type
router.get('/question-template/:type', getQuestionTypeConfig);

// Create a question
router.post('/questions', upload.any(), createQuestion);

export default router;
