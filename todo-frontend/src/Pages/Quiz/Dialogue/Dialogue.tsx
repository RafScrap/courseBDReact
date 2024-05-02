import {
    Col,
    Row
} from "@salutejs/plasma-ui";
import React from "react";
import {useRecoilValue} from 'recoil'
import {from} from 'linq-to-typescript'
import {PhraseQuestion, PhraseReply} from "./Phrase.tsx";
import {getDialogByTopicAndId} from "../../../RecoilStorage.ts";

export type DialogueProps = {
    topic: string,
    id: number
}

export const Dialogue = ({topic, id}: DialogueProps) => {

    const dialoguesState = useRecoilValue(getDialogByTopicAndId({id, topic}))

    let showPhrasesCount = from(dialoguesState?.phrases ?? []).count(x => x.answers.selected !== undefined) + 1;

    return (
        <>
            {
                dialoguesState?.phrases.slice(0, showPhrasesCount).map((p, index) => (
                    <Row>
                        <Col sizeS={3} sizeM={5} sizeL={6} sizeXL={9}>
                            <PhraseQuestion topic={topic} dialogueId={id} index={index}/>
                        </Col>
                        <Col sizeS={1} sizeM={1} sizeL={2} sizeXL={3}>

                        </Col>
                        <Col sizeS={1} sizeM={1} sizeL={2} sizeXL={3}>

                        </Col>
                        <Col sizeS={3} sizeM={5} sizeL={6} sizeXL={9}>
                            <PhraseReply topic={topic} dialogueId={id} index={index}/>
                        </Col>
                    </Row>
                ))
            }


        </>
    )
}

