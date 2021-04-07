export const swaggerOptions: any = {
    swaggerDefinition: {
        info: {
            title: 'API REST TypeORM MySQL',
            description: 'User auth & products crud',
            contact: {
                name: 'Jonathan Mejia'
            },
            servers: ['http://localhost:3000']
        }
    },
    apis: ['src/api/routes/*.ts']
};