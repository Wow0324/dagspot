import { DB } from "../config/db"
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(false);
SQLite.enablePromise(true);
export default class SqliteUtils {
    static db = null;
    
    static getCurrentDatabase = async () =>{
        if(this.db == null) {
            await this.init();
        }
        return this.db;
    }

    static init = async()=>{
        this.db = await SQLite.openDatabase({ name: DB.name });
        const promise = new Promise((resolve, reject)=>{
            this.db.transaction( (txn)=>{
                txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS t_tokens(id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT)',
                    [],
                    (tx, res)=>{
                        console.log('create table ', res);
                        resolve();
                    },
                    (tx, error)=>{
                        console.log('create tble error', error);
                        reject(error);
                    }
                );
            });
        })
        return promise;
    }

    static getToken = async (callBack) => {
        let _db = await this.getCurrentDatabase();
        _db.transaction((txn) => {
            txn.executeSql(
                "SELECT * FROM t_tokens limit 1",
                [],
                (tx, res) => {
                    callBack(tx, res);
                },
                (t, error) =>{
                    console.log('getToken error ===>', error);
                }
            )
        })
    }

    static truncateToken = async (photo, callBack) => {
        let _db = await this.getCurrentDatabase();
        _db.transaction((txn)=>{
            txn.executeSql("TRUNCATE t_tokens", [], (tx, res) => callBack(tx, res));
        })
    }

    static addToken = async (token, callBack) => {
        let _db = await this.getCurrentDatabase();
        _db.transaction( (txn)=>{
            txn.executeSql("INSERT INTO t_tokens (token) VALUES(?)",
                [token],
                (tx, res) => {
                    // resolve(res);
                    callBack(tx, res);
                },
                (t, error)=>{
                    console.log('addPhoto error', error);
                }
            )
        })
    }
}

