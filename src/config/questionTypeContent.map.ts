export const questionTypeContentMap: Record<string, any> = {
    FILL_IN_BLANKS: { fields: ["title", "content"] },
    MATCH_FOLLOWING: { fields: ["title", "columnA", "columnB"] },
    DESCRIPTIVE: { fields: ["title", "content"] },
    PROGRAMMING: { fields: ["title", "content", "programmingLanguage", "testCases"] },
    IMAGE_BASED: { fields: ["title", "content", "imageOptions"] },
    AUDIO_VIDEO: { fields: ["title", "content", "mediaFile", "playbackSettings", "relatedQuestions"] },
    ASSERTION_REASON: { fields: ["title", "assertion", "reason", "correctAnswer"] },
    CASE_STUDY: { fields: ["title", "caseStudy", "subQuestions"] },
    NUMERICAL: { fields: ["title", "content", "expectedAnswer"] },
    DRAG_DROP: { fields: ["title", "itemsToOrder"] },
    CODE_OUTPUT: { fields: ["title", "code", "expectedOutput"] },
    SKETCH: { fields: ["title", "canvasSettings"] }
};