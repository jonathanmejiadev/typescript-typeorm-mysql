import { getConnectionOptions, createConnection } from "typeorm";

export const typeormMysqlConnection = async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection({
        ...connectionOptions, name: "default", extra: {
            decimalNumbers: true
        }
    });
};