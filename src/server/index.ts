import app from "./App";
import { connectToDatabase } from "./database/mongodb";

const PORT = process.env.LOCAL_API_PORT || 8000;

app.listen(PORT, async () => {
    await connectToDatabase();
    console.log("MongoDB connected successfully");
    console.log(`Server is running on http://localhost:${PORT}`);
});
