import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Question Management API (Step Based)',
        version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:5000' }],

    paths: {
        '/api/questions/basic-info': {
            post: {
                summary: 'Step 1: Save basic info',
                tags: ['Question - Step Form'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/BasicInfo' }
                        }
                    }
                },
                responses: {
                    200: { description: 'Basic info saved' }
                }
            }
        },

        '/api/questions/content': {
            post: {
                summary: 'Step 2: Save question content',
                tags: ['Question - Step Form'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Content' }
                        }
                    }
                },
                responses: {
                    200: { description: 'Content saved' }
                }
            }
        },

        '/api/questions/settings': {
            post: {
                summary: 'Step 3: Save settings',
                tags: ['Question - Step Form'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Settings' }
                        }
                    }
                },
                responses: {
                    200: { description: 'Settings saved' }
                }
            }
        },

        '/api/questions/review': {
            post: {
                summary: 'Step 4: Finalize question',
                tags: ['Question - Step Form'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Finalize' }
                        }
                    }
                },
                responses: {
                    201: { description: 'Question created successfully' }
                }
            }
        }
    },

    components: {
        schemas: {
            BasicInfo: {
                type: 'object',
                required: ['title', 'questionType'],
                properties: {
                    tempId: { type: 'string', example: 'uuid-temp-id' },
                    title: { type: 'string', example: 'Fill in the blanks' },
                    questionType: {
                        type: 'string',
                        enum: [
                            'FILL_IN_BLANKS',
                            'MATCH_FOLLOWING',
                            'DESCRIPTIVE',
                            'PROGRAMMING'
                        ]
                    },
                    category: { type: 'string', example: 'English' },
                    difficulty: { type: 'string', example: 'Easy' }
                }
            },

            Content: {
                type: 'object',
                required: ['tempId'],
                properties: {
                    tempId: { type: 'string' },

                    content: {
                        type: 'object',
                        example: {
                            text: 'I ___ to school',
                            answers: ['go']
                        }
                    },

                    matching: {
                        type: 'object',
                        example: {
                            left: ['India', 'USA'],
                            right: ['Delhi', 'Washington']
                        }
                    },

                    programming: {
                        type: 'object',
                        example: {
                            language: 'JavaScript',
                            starterCode: 'function test(){}',
                            testCases: []
                        }
                    }
                }
            },

            Settings: {
                type: 'object',
                required: ['tempId'],
                properties: {
                    tempId: { type: 'string' },
                    points: { type: 'number', example: 5 },
                    negativeMarks: { type: 'number', example: 1 },
                    estimatedTime: { type: 'number', example: 60 },
                    visibility: {
                        type: 'string',
                        enum: ['Draft', 'Published'],
                        example: 'Draft'
                    }
                }
            },

            Finalize: {
                type: 'object',
                required: ['tempId'],
                properties: {
                    tempId: { type: 'string' },
                    confirm: {
                        type: 'boolean',
                        example: true
                    }
                }
            }
        }
    }
};

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
