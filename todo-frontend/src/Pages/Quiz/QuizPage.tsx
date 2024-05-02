import React, {useEffect, useState} from "react"
import {TabsController} from "@salutejs/plasma-ui";
import {Dialogue} from "./Dialogue/Dialogue.tsx";
import {useParams} from "react-router";
import {Theory} from "./Theory.tsx";
import {AnswersRow, DialogueState, PhraseEntity} from "./Entities.ts";
import {useRecoilState} from "recoil";
import {dialoguesStateAtom} from "../../RecoilStorage.ts";
import {from} from "linq-to-typescript";
import APIHelper from "../../APIHelper.js"

type QuizPageState = {
    totalTasks: number
    loaded: boolean
}

export const QuizPage = () => {
    let params = useParams();
    let topicId = params.id!;

    const [dialogues, setDialogues] = useRecoilState(dialoguesStateAtom);

    const [state, setState] = useState({
        totalTasks: from(dialogues).count(x=> x.topic == topicId),
        loaded: false,
    } as QuizPageState)

    const [pageState, setPageState] = useState({
        activePage: 0
    })


    useEffect(() => {
        if(!state.loaded && from(dialogues).count(x => x.topic == topicId) === 0) {
        APIHelper.getAll("quiz/" + topicId)
            .then(async (resp) => {
                let respArr = await resp as any[];
                let tasks = (respArr[0]['dialogues'] as any[]).map((e, index) => ({
                    topic: topicId,
                    id: index,
                    phrases: (e['phrases'].map(p => ({
                        question: p.question,
                        reply: p.reply,
                        answers: {answers: p.answers, answerIndex: p.answerIndex} as AnswersRow
                    } as PhraseEntity))) as PhraseEntity[]
                } as DialogueState))
                setDialogues(dialogues.filter(d => d.topic !== topicId).concat(tasks))
                setState({
                    ...state,
                    totalTasks: tasks.length,
                    loaded: true
                })
            })

        }
    })


    let items = [{label: "Теория"}].concat(Array.from(Array(state.totalTasks).keys()).map(i => ({label: `Диалог ${i + 1}`})));

    return (
        <>

            <div style={{
                overflowY: "scroll",
                overflowX: "hidden",
                height: "80vh",
            }}>
                <div hidden={pageState.activePage !== 0}>
                    <Theory></Theory>
                </div>
                {items.map((item, index) => (
                    <div hidden={pageState.activePage - 1 !== index}>
                        <Dialogue topic={topicId} id={index}></Dialogue>
                    </div>

                ))}
            </div>


            <div style={{zIndex: 0, position: 'relative'}}>
                <TabsController items={items} index={pageState.activePage}
                                onIndexChange={(i) => setPageState({...pageState, activePage: i})} autoscroll/>
            </div>

        </>
    )
}
