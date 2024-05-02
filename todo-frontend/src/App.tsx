import React, {memo} from "react";
import {Container} from '@salutejs/plasma-ui/components/Grid';
import "./App.css";
import {Header} from "@salutejs/plasma-ui";
import {Route, Routes} from "react-router-dom";

import {ChooseTopicPage} from "./Pages/ChooseTopic/ChooseTopicPage.tsx";
import {QuizPage} from "./Pages/Quiz/QuizPage.tsx";

import {useNavigate} from 'react-router'

export const App = memo(() => {
    const navigate = useNavigate();

    return (
        <>
            <Container style={{
                minHeight: '100vh'
            }}>
                <Header title={``} back={true} onBackClick={() => {
                    if (window.location.pathname !== '/')
                        navigate(-1)
                }}>
                </Header>
                <Routes>
                    <Route path="/" element={
                            <ChooseTopicPage/>
                    }/>
                    <Route path="/:id" element={
                            <QuizPage/>
                    }/>
                </Routes>
            </Container>
        </>
    )
})