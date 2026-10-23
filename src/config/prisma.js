import 'dotenv/config'
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("ERRRRRRRRRRRRRRRRRRRRR");

const adapter = new PrismaMariaDb(connectionString)
const prisma = new PrismaClient({
    adapter: adapter
})

export default prisma