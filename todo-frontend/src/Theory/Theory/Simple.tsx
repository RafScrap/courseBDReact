import React from 'react';
import { Image } from '@salutejs/plasma-ui';
import { TheoryListWithExamples } from "../Parts/TheoryList.tsx";

export const Simple = ({name, data, picture}) => {
    return (<>
        <Image src={"http://localhost:3000/" + picture}
                    width="320px"
                    height="320px"
         alt="Картинка"
        />
        <TheoryListWithExamples data={data}/>
    </>)
}