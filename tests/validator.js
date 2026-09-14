// Validator for fine‑tuning fallback entries
/**
 * Perform rule‑based validation of a generated entry.
 *
 * @param {Object} entry  The entry definition containing optional rules:
 *   - contains: Array<string>   // required keywords that must appear in the answer
 *   - maxLen:   number           // maximum allowed length of the answer (characters)
 * @param {string} answer The model‑generated answer to validate.
 * @param {Object} meta   Additional metadata (currently unused).
 * @returns {{ok: boolean, fails: string[], needLive: boolean}}
 */
function validate(entry, answer, meta) {
  const fails = []
  const lowerAns = (answer || "").toLowerCase()

  // Helper to add failure messages
  const addFail = (msg) => fails.push(msg)

  // 1. Keyword containment check
  if (Array.isArray(entry.contains)) {
    entry.contains.forEach((kw) => {
      if (!lowerAns.includes(String(kw).toLowerCase())) {
        addFail(`Missing required keyword: "${kw}"`)
      }
    })
  }

  // 2. Maximum length check
  if (typeof entry.maxLen === "number" && answer.length > entry.maxLen) {
    addFail(`Answer exceeds maxLen of ${entry.maxLen} characters (${answer.length})`)
  }

  // 3. Prohibited phrases (case‑insensitive)
  const prohibited = ["skill aktif", "google ai studio"]
  prohibited.forEach((phrase) => {
    if (lowerAns.includes(phrase)) {
      addFail(`Prohibited phrase detected: "${phrase}"`)
    }
  })

  const ok = fails.length === 0
  // needLive is true when any rule fails – the fallback forces a live query
  const needLive = !ok
  return { ok, fails, needLive }
}

module.exports = { validate }
