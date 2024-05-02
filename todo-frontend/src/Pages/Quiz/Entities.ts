export type DialogueState = {
    topic: string,
    id: number,
    phrases: PhraseEntity[]
}

export type PhraseEntity = {
    question: string,
    reply: string,
    answers: AnswersRow
}

export type AnswersRow = {
    answers: string[],
    answerIndex: number
    selected?: number[]
}

export type Examples = {
    header?: string,
    text: string,
    picture?: string,
    examples: Example[]
}

export type Example = {
    example: string,
    note?: string,
    translation: string
}