import express from 'express';
import axios from 'axios';

const router = express.Router();

// POST /api/translate
router.post('/', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    // Call translation API here
    const translatedText = `Translated "${text}" to ${targetLanguage}`;

    res.json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

export default router;
