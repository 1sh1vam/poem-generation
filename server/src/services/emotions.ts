import NrcEmotionLexicon from '../data/NRC-emotion-lexicon.json';
const emotionLexicon = NrcEmotionLexicon as { [key: string]: { [key: string]: number } };

export function analyzeEmotionsUsingLexicon(text: string) {
    const words = text.toLowerCase().match(/\b\w+\b/g); // Split text into words

    const emotions: { [emotion: string]: number } = {};

    // Match words from the text with emotions in the lexicon
    if (words) {
        words.forEach(word => {
            if (emotionLexicon[word]) {
                for (const emotion in emotionLexicon[word]) {
                    if (emotionLexicon[word][emotion] === 1) {
                        emotions[emotion] = (emotions[emotion] || 0) + 1;
                    }
                }
            }
        });
    }

    return emotions;
}