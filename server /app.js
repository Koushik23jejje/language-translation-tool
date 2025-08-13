import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => res.json({ ok: true }));

// POST /api/translate
// Expected body: { text, from, to, provider }
// provider can be "microsoft" or "google" (default: microsoft)
app.post("/api/translate", async (req, res) => {
  try {
    const { text, from, to, provider = "microsoft" } = req.body;

    // Validate input
    if (!text || !to) {
      return res.status(400).json({
        error: "Missing required fields: 'text' and 'to' language",
      });
    }

    // GOOGLE TRANSLATE API
    if (provider === "google") {
      const url = "https://translation.googleapis.com/language/translate/v2";

      const response = await axios.post(
        `${url}?key=${process.env.GOOGLE_API_KEY}`,
        {
          q: text,
          source: from || undefined,
          target: to,
          format: "text",
        }
      );

      const translated =
        response.data?.data?.translations?.[0]?.translatedText || "";
      return res.json({ provider: "google", translated });
    }

    // MICROSOFT TRANSLATOR API
    const endpoint = "https://api.cognitive.microsofttranslator.com/translate";

    const response = await axios.post(
      `${endpoint}?api-version=3.0${from ? `&from=${from}` : ""}&to=${to}`,
      [{ Text: text }],
      {
        headers: {
          "Ocp-Apim-Subscription-Key":
            process.env.MICROSOFT_TRANSLATOR_KEY,
          "Ocp-Apim-Subscription-Region":
            process.env.MICROSOFT_TRANSLATOR_REGION,
          "Content-Type": "application/json",
        },
      }
    );

    const translated =
      response.data?.[0]?.translations?.[0]?.text || "";
    return res.json({ provider: "microsoft", translated });

  } catch (err) {
    console.error("Translation error:", err.response?.data || err.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
