import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets authentication
async function getGoogleSheetsClient() {
  const credentials = JSON.parse(
    await readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf-8')
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  
  return google.sheets({ version: 'v4', auth: client });
}

// POST /submit-lead endpoint
app.post('/submit-lead', async (req, res) => {
  try {
    const { name, phone, carModel, plan, date, time, address, landmark } = req.body;

    // Validate required fields
    if (!name || !phone || !carModel || !plan || !date || !time || !address || !landmark) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Get current timestamp
    const timestamp = new Date().toISOString();

    // Prepare row data
    const values = [[timestamp, name, phone, carModel, plan, date, time, address, landmark]];

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:I',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    res.status(200).json({
      success: true,
      message: 'Lead saved successfully',
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save lead',
      error: error.message,
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
