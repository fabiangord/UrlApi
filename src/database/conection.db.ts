import mongoose from "mongoose";

async function databaseInit() {
    try {
        await mongoose.connect(process.env.DB!)
        console.log('Database working')
    } catch (error) {
        console.log('Database not working', error)
    }
}

databaseInit()