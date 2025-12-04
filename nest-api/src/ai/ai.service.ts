import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import configuration from 'src/config/configuration';

@Injectable()
export class AIService {
  private readonly ai;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: configuration().geminiAPI,
    });
  }

  private sanitizeJSON(text: string): string {
    let cleanedText = text.trim().replace(/^```json\s*/, '');

    cleanedText = cleanedText.replace(/\s*```$/, '');
    return cleanedText;
  }

  async generateJSON(prompt: string): Promise<any> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
        },
      });

      const sanitizeText = this.sanitizeJSON(response.text);

      return JSON.parse(sanitizeText);
    } catch (error) {
      return { error: 'Resposta não é JSON' + error };
    }
  }
}
