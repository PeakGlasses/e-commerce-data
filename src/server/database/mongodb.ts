import dotenv from "dotenv";
dotenv.config();
import { MongoClient, Db, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let db: Db | null = null;

export const connectToDatabase = async (): Promise<Db> => {
    if (db) {
        return db;
    }

    const client = new MongoClient(uri || "", {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await mongoose.connect(uri || "", {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        db = client.db(dbName);
        console.log(`Successfully connected to database: ${dbName}`);
        return db;
    } catch (error) {
        console.error("Failed to connect to the database", error);
        throw error;
    } finally {
        await client.close();
    }
};
