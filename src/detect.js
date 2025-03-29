import 'dotenv/config'
import DetectLanguage from 'detectlanguage';


class languageMachine {
    #langCode = 'en'
    #detector = null

    constructor(langCode) {
        this.#langCode = langCode
        this.#detector = new DetectLanguage(process.env.DETECT_API_TOKEN)
    }

    async isLanguage(message) {
        const res = await this.#detector.detect(message)
        console.log(res[0])
        if (!res[0].isReliable) {
            return true
        }
        return res[0].language === this.#langCode
    }
}

export default languageMachine
