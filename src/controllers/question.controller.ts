import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// 🔥 TEMP STORE (replace with DB/Redis later)
const questionDrafts: Record<string, any> = {};

/**
 * STEP 1 – BASIC INFO
 */
export const saveBasicInfo = (req: Request, res: Response) => {
    const tempId = uuidv4();

    questionDrafts[tempId] = {
        tempId,
        basicInfo: req.body
    };

    return res.status(200).json({
        message: 'Basic info saved',
        tempId
    });
};

/**
 * STEP 2 – CONTENT (DYNAMIC BY QUESTION TYPE)
 */
export const saveContent = (req: Request, res: Response) => {
    const { tempId, content, matching, programming } = req.body;

    if (!questionDrafts[tempId]) {
        return res.status(404).json({ message: 'Invalid tempId' });
    }

    questionDrafts[tempId].content =
        content || matching || programming;

    return res.status(200).json({
        message: 'Content saved'
    });
};

/**
 * STEP 3 – SETTINGS
 */
export const saveSettings = (req: Request, res: Response) => {
    const { tempId } = req.body;

    if (!questionDrafts[tempId]) {
        return res.status(404).json({ message: 'Invalid tempId' });
    }

    questionDrafts[tempId].settings = req.body;

    return res.status(200).json({
        message: 'Settings saved'
    });
};

/**
 * STEP 4 – FINALIZE
 */
export const finalizeQuestion = (req: Request, res: Response) => {
    const { tempId, confirm } = req.body;

    if (!confirm) {
        return res.status(400).json({ message: 'Confirmation required' });
    }

    const draft = questionDrafts[tempId];

    if (!draft) {
        return res.status(404).json({ message: 'Invalid tempId' });
    }

    const finalQuestion = {
        id: uuidv4(),
        ...draft.basicInfo,
        content: draft.content,
        settings: draft.settings,
        createdAt: new Date()
    };

    // 🧹 cleanup
    delete questionDrafts[tempId];

    return res.status(201).json({
        message: 'Question created successfully',
        data: finalQuestion
    });
};
