import DetectLanguage from 'detectlanguage';


class languageMachine {
    #langCode = 'en'
    #detector = null

    constructor(langCode) {
        this.#langCode = langCode
        this.#detector = new DetectLanguage('04e8c373e35106363221792be6516d4e')
    }

    async isLanguage(message) {
        const res = await this.#detector.detect(message)
        // console.log(res[0])
        if (!res[0].isReliable) {
            return true
        }
        return res[0].language === this.#langCode
    }
}

export default languageMachine
