import { Pool } from 'pg';

export default class DBClient{
    private pool:Pool;
    private client:any;

    constructor(){
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT? process.env.DB_PORT : '5432'),
          });

    }

    public connect = async () => {
        try {
            this.client = await this.pool.connect();
        } catch (error) {
            console.error(error.stack);
        }
       
    }
    public query = async (queryText:string, params: any[]) => {
        try {
            return await this.client.query(queryText, params)
        } catch (error) {
            setImmediate(() => {
                throw error;
              })
        }
    }
}