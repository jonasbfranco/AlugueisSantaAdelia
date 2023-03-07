const mongoose = require("mongoose");

async function main() {

    try {
        mongoose.set("strictQuery", true);

        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error(`Erro: ${error}`)
    }
}
    

module.exports = main;