import express, { Request, Response } from "express"; // Import Express and its types (Request, Response)
import cors from "cors"; // Import CORS middleware to handle cross-origin requests
import "dotenv/config"; // Load environment variables from a .env file
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("Connected to the database");
}).catch((error) => {
    console.error("Error connecting to the database", error);
});

const app = express(); // Create an instance of an Express application

// When the frontend sends a request containing JSON data (e.g., via fetch or axios),
// the backend (Express.js) needs to extract and process that data. 
// However, by default, Node.js does not automatically parse JSON from incoming requests.
// That's why Express uses middleware to parse it.

app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
    res.send({message: "health Ok!"});
});

// Define a GET route at /test
app.use("/api/my/user",myUserRoute);


// Start the server and listen on port 7000
app.listen(7000, () => {
    console.log("Server started on Port 7000");
});