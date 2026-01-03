import { QuestionType } from '../enums/questionType.enum';

interface ValidationResult {
    valid: boolean;
    message?: string;
}

export const validateQuestionByType = (
    questionType: QuestionType,
    files?: Express.Multer.File[]
): ValidationResult => {

    switch (questionType) {

        case QuestionType.AUDIO_VIDEO:
            if (!files || files.length === 0) {
                return { valid: false, message: 'Audio or Video file is required' };
            }
            break;

        case QuestionType.IMAGE:
            if (!files || files.length === 0) {
                return { valid: false, message: 'Image file is required' };
            }
            break;

        default:
            break;
    }

    return { valid: true };
};
