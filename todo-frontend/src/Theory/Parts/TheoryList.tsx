
import {render} from "react-dom";
import React from "react";
import {MarkedList, MarkedItem, TextS, TextXS, Image} from "@salutejs/plasma-ui"
import { IconInfo} from '@salutejs/plasma-icons';
import {Example, Examples} from '../../Pages/Quiz/Entities.ts'
import {MarginTopBottom, Em} from "./Styles.tsx"

export const TheoryListWithExamples = ({ data }) => {    
    var Style = {fontSize: '0.9rem', fontWeight: 700}
    return (
        <MarginTopBottom>
        <MarkedList>
            {data.map((item : Examples) => 
            <>
                <MarkedItem text={item.text} style={Style}    >
                    <IconInfo size="xs"/>
                </MarkedItem>
                <ExamplesList data={item.examples}/>
                {item.picture == "" ? <></> : <Image src = {"http://localhost:3000/" + item.picture}
                        width="320px"
                        height="320px"
                        alt="Картинка"
                />}
            </>
            )}
        </MarkedList>
        </MarginTopBottom>
    )
}

export const ExamplesList = ({ data }) => {    
    return (
        <>
            {data.map((i:Example) => 
                <>
                 <MarginTopBottom><TextS>{i.example}</TextS></MarginTopBottom>
                <MarginTopBottom><TextXS>{i.translation}</TextXS></MarginTopBottom>
                <MarginTopBottom><TextXS><Em>{" " + i.note}</Em></TextXS></MarginTopBottom>
                </>
            )}
        </>
    )
}