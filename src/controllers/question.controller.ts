import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db';
import { QuestionType } from '../enums/questionType.enum';

interface QuestionField {
    field: string;
    type: string;
    required?: boolean;
    options?: string[];
}

interface QuestionTypeConfig {
    type: QuestionType;
    displayName: string;
    fields: QuestionField[];
}

/* ================= CONFIG ================= */

const questionConfigs: QuestionTypeConfig[] = [
    {
        type: QuestionType.FILL_IN_BLANKS,
        displayName: 'Fill in Blanks',
        fields: [
            { field: 'questionContent', type: 'textarea', required: true },
            { field: 'points', type: 'number', required: true },
            { field: 'estimatedTime', type: 'number', required: true }
        ]
    },
    {
        type: QuestionType.MATCH_FOLLOWING,
        displayName: 'Match Following',
        fields: [
            { field: 'columnA', type: 'textarea', required: true },
            { field: 'columnB', type: 'textarea', required: true },
            { field: 'correctMatches', type: 'textarea', required: true },
            { field: 'points', type: 'number', required: true }
        ]
    },
    {
        type: QuestionType.DESCRIPTIVE,
        displayName: 'Descriptive',
        fields: [
            { field: 'questionContent', type: 'textarea', required: true },
            { field: 'points', type: 'number', required: true }
        ]
    },
    {
        type: QuestionType.PROGRAMMING,
        displayName: 'Programming',
        fields: [
            { field: 'language', type: 'select', options: ['JavaScript', 'Python', 'Java'], required: true },
            { field: 'starterCode', type: 'textarea' },
            { field: 'testCases', type: 'textarea' },
            { field: 'points', type: 'number', required: true }
        ]
    },
    {
        type: QuestionType.AUDIO_VIDEO,
        displayName: 'Audio/Video Question',
        fields: [
            { field: 'questionContent', type: 'textarea', required: true },
            { field: 'mediaFile', type: 'file', required: true }
        ]
    }
];

/* ================= GET CONFIG ================= */

export const getQuestionTypeConfig = (_req: Request, res: Response) => {
    res.json({ success: true, data: questionConfigs });
};

/* ================= POST QUESTION (FIXED LOGIC) ================= */

export const createQuestion = async (req: Request, res: Response) => {
    try {
        const {
            title,
            questionType,
            category,
            difficulty,
            visibility,
            tags,
            ...bodyFields
        } = req.body;

        if (!title || !questionType) {
            return res.status(400).json({
                message: 'Title and Question Type are required'
            });
        }

        // 🔥 FIND CONFIG BY QUESTION TYPE
        const config = questionConfigs.find(c => c.type === questionType);

        if (!config) {
            return res.status(400).json({
                message: 'Invalid Question Type'
            });
        }

        // 🔥 VALIDATE + FILTER FIELDS BASED ON TYPE
        const extraFields: Record<string, any> = {};

        for (const fieldConfig of config.fields) {
            const value = bodyFields[fieldConfig.field];

            if (fieldConfig.required && (value === undefined || value === '')) {
                return res.status(400).json({
                    message: `${fieldConfig.field} is required for ${config.displayName}`
                });
            }

            if (value !== undefined) {
                extraFields[fieldConfig.field] = value;
            }
        }

        // 🔥 HANDLE FILES
        const files = req.files as Express.Multer.File[] | undefined;
        const mediaFiles = files ? files.map(f => f.filename) : [];

        // 🔥 SAVE TO DB
        const id = uuidv4();

        const query = `
      INSERT INTO questions (
        id,
        title,
        question_type,
        category,
        difficulty,
        visibility,
        tags,
        extra_fields,
        media_files
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `;

        const values = [
            id,
            title,
            questionType,
            category,
            difficulty,
            visibility,
            JSON.stringify(tags || []),
            JSON.stringify(extraFields),
            JSON.stringify(mediaFiles)
        ];

        const { rows } = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: `${config.displayName} question created`,
            data: rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
