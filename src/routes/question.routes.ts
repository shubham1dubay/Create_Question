import express from 'express';
import {
    saveBasicInfo,
    saveContent,
    saveSettings,
    finalizeQuestion
} from '../controllers/question.controller';

const router = express.Router();

router.post('/questions/basic-info', saveBasicInfo);
router.post('/questions/content', saveContent);
router.post('/questions/settings', saveSettings);
router.post('/questions/review', finalizeQuestion);

export default router;
