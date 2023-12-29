import express from 'express';
import { globalTopicTable } from '../../db/schema'; // Adjust the path based on your project structure
import { db } from "@/db"; // Adjust the path based on your project structure

const app = express();
const PORT = 3001;

import { QueryResultRow } from 'pg';
// ...

app.get('/api/topics', async (req, res) => {
    try {
        const topics: QueryResultRow[] = await db.any(`SELECT topic FROM ${globalTopicTable.name}`);
        res.json(topics);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
