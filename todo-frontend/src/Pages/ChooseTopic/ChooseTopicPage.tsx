import {Col, RectSkeleton, Row} from "@salutejs/plasma-ui";
import React, {useEffect, useState} from "react";
import {Topic} from "./Topic.tsx";
import APIHelper from "../../APIHelper.js"

type Topic = {
    topic: string,
    id: string,
    text: string
}

export const ChooseTopicPage = () => {

    const [state, setState] = useState({
        loaded: false,
        topics: [] as Topic[]
    });
    useEffect(() => {
        if (!state.loaded) {
            APIHelper.getAll("topics")
                .then(async (data) => {
                    const themes = (await data) as Topic[]
                     setState({
                         ...state,
                         topics: themes,
                         loaded: true
                     })
                })
            }
    }, [state])

    return (
        <>
            <Row>
                {state.loaded ? state.topics.map((topic) => (
                    <Col sizeS={4} sizeM={3} sizeL={4} sizeXL={3}>
                        <Topic name={topic.topic} id={topic.id} text={topic.text}/>
                    </Col>
                )) :
                    <RectSkeleton width={"100%"} height={"300px"}/>
                }
            </Row>
        </>
    )

}