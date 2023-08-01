import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Votre API',
            version: '1.0.0',
            description: 'Description de votre API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['src/routes/index.js'], // Spécifiez ici le chemin vers vos fichiers de définition de route
};

const specs = swaggerJsdoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
