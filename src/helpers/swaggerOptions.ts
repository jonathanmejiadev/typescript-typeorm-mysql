export const swaggerOptions: any = {
    swaggerDefinition: {
        info: {
            title: 'Market API',
            description: 'User auth & products crud',
            contact: {
                name: 'Jonathan Mejia'
            },
            servers: ['http://localhost:3000']
        }
    },
    apis: ['src/routes/*.ts']
};