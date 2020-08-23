import DBClient from "../db/DBClient";

export default class UserService {
    private dbClient:DBClient;
    constructor(dbClient: DBClient){
        this.dbClient = dbClient
    }
    public create(){
        this.dbClient.query("select * from User")
    }
    public login(){
        
    }
}