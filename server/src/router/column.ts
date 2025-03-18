import { Response, Request, Router } from "express";
import { Column, IColumn } from "../models/Column";

const router: Router = Router();

// Get all columns
router.get("/columns", async (req: Request, res: Response) => {
  try {
    const columns = await Column.find();
    res.status(200).json(columns);
  } catch (error: any) {
    console.error("Error fetching columns:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Save or update columns
router.post("/columns", async (req: Request, res: Response) => {
  try {
    // Ensure request body is valid
    if (!req.body || !Array.isArray(req.body.columns)) {
      res
        .status(400)
        .json({ error: "Invalid data input. Expecting an array of columns." });
    } else {
      // Wipe out existing entry before inserting new columns
      await Column.deleteMany({});

      const columns = await Column.insertMany(req.body.columns);

      res
        .status(201)
        .json({ message: "ColabBoard saved successfully!", columns });
    }
  } catch (error: any) {
    console.error("Error saving columns:", error);
    // Method to precent multiple response attempts
    if (!res.headersSent) {
      try {
        res.status(500).json({ error: error.message });
      } catch (err) {
        console.error("Failed to send error response:", err);
      }
    }
  }
});

export default router;
