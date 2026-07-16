/**
 * Lightweight extractive text summarizer.
 *
 * Since the allowed backend stack is limited to Express + MongoDB (no
 * external AI/LLM API), summaries are generated locally using a classic
 * word-frequency extractive-summarization algorithm:
 *
 *   1. Split the text into sentences.
 *   2. Score each word by frequency (ignoring common stopwords).
 *   3. Score each sentence by summing its words' scores.
 *   4. Pick the top-N highest scoring sentences.
 *   5. Return them in their original order, so the summary still reads
 *      naturally.
 */

const STOPWORDS = new Set(
  [
    'the', 'a', 'an', 'and', 'or', 'but', 'if', 'then', 'else', 'of', 'to',
    'in', 'on', 'for', 'with', 'as', 'by', 'at', 'from', 'is', 'are', 'was',
    'were', 'be', 'been', 'being', 'this', 'that', 'these', 'those', 'it',
    'its', 'into', 'about', 'than', 'so', 'such', 'can', 'will', 'would',
    'should', 'could', 'may', 'might', 'not', 'no', 'do', 'does', 'did',
    'has', 'have', 'had', 'we', 'you', 'your', 'our', 'their', 'his', 'her',
    'i', 'he', 'she', 'they', 'them', 'us', 'also', 'which', 'who', 'whom',
    'what', 'when', 'where', 'why', 'how', 'all', 'each', 'other', 'some',
    'any', 'more', 'most', 'over', 'under', 'up', 'down', 'out', 'per',
  ],
)

function splitIntoSentences(text) {
  // Normalize whitespace first, then split on sentence-ending punctuation
  const normalized = text.replace(/\s+/g, ' ').trim()
  const rawSentences = normalized.match(/[^.!?]+[.!?]+(\s|$)/g) || [normalized]
  return rawSentences
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

function tokenizeWords(sentence) {
  return (sentence.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
    (word) => word.length > 2 && !STOPWORDS.has(word),
  )
}

/**
 * Generates an extractive summary from raw text.
 * @param {string} text - full extracted PDF text
 * @param {number} maxSentences - max number of sentences in the summary
 * @returns {string} generated summary
 */
function generateSummary(text, maxSentences = 5) {
  if (!text || !text.trim()) {
    return 'No readable text could be extracted from this PDF.'
  }

  const sentences = splitIntoSentences(text)

  if (sentences.length <= maxSentences) {
    return sentences.join(' ')
  }

  // Build word-frequency table
  const wordFrequency = {}
  sentences.forEach((sentence) => {
    tokenizeWords(sentence).forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1
    })
  })

  // Score each sentence
  const scoredSentences = sentences.map((sentence, index) => {
    const words = tokenizeWords(sentence)
    const score = words.reduce((sum, word) => sum + (wordFrequency[word] || 0), 0)
    // Normalize by length so long sentences don't win purely on word count
    const normalizedScore = words.length > 0 ? score / words.length : 0
    return { sentence, index, score: normalizedScore }
  })

  // Pick top-N sentences by score, then restore original order
  const topSentences = [...scoredSentences]
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .sort((a, b) => a.index - b.index)

  return topSentences.map((s) => s.sentence).join(' ')
}

module.exports = { generateSummary }
