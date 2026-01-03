import { Request, Response, NextFunction } from 'express';
import { validateQuestionByType } from '../utils/questionValidation.util';
import { QuestionType } from '../enums/questionType.enum';

export const validateQuestion = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { questionType } = req.body;

    const result = validateQuestionByType(
        questionType as QuestionType,
        req.files as Express.Multer.File[]
    );

    if (!result.valid) {
        return res.status(400).json({
            success: false,
            message: result.message
        });
    }

    next();
};
