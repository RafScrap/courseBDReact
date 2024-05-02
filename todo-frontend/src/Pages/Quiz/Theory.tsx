import React, {useEffect, useState} from "react"
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

import APIHelper from "../../APIHelper.js";
import {Example, Examples} from "./Entities.js";

import {Simple} from "../../Theory/Theory/Simple.tsx";

// import {Results} from "../../Theory/Parts/Results"
// import {Request} from "../../Theory/Parts/Request"

type dataState = {
    data: Examples[],
    picture: String,
    loaded: boolean
}

export const Theory = () => {
    const navigate = useNavigate();
    let params = useParams();
    let id = params.id;

    const [state, setState] = useState({
        data: [] as Examples[],
        loaded: false,
        picture: ""
    } as dataState) 

    useEffect(() => {
        if(!state.loaded) {
                APIHelper.getAll("theory/" + id)
                .then(async (resp) => {
                    let res = await resp as any[]
                    let theories = (res[0]['theories'] as any[]).map((e) => ({
                        header: e['header'] as String,
                        text: e['text'] as String,
                        picture: e['picture'] as String,
                        examples: (e['examples'].map(p => ({
                            example: p.example as String,
                            note: p.note as String,
                            translation: p.translation as String
                        } as Example))) as Example[]
                    } as Examples))
                    setState({
                        data: theories,
                        loaded: true,
                        picture: (res[0]['picture'] as String)                   
                    })
                })
            //}
        }
    })

    const getTheory = (key: string | undefined) => {
        switch (key) {
            case '2':
                return <Simple name={"Present Simple"} data={state.data} picture={state.picture}/>
            case '4':
                return <Simple name={"Present Simple"} data={state.data} picture={state.picture}/>
            case '6':
                return <Simple name={"Future Simple"} data={state.data} picture={state.picture}/>
            default:
                return <></>
        }
        // switch (key) {
            // case 'past-continuous':
            //     return <PastContinuous name={"Past Continuous"}/>
            // case 'present-continuous':
            //     return <PresentContinuous name={"Present Continuous"}/>
            // case 'future-continuous':
            //     return <FutureContinuous name={"Future Continuous"}/>  
            // case 'past-perfect':
            //     return <PastPerfect name={"Past Perfect"}/>
            // case 'present-perfect':
            //     return <PresentPerfect name={"Present Perfect"}/>
            // case 'future-perfect':
            //     return <FuturePerfect name={"Future Perfect"}/> 
            // case 'past-perfect-continuous':
            //         return <PastPerfectContinuous name={"Past Perfect Continuous"}/>
            //     case 'present-perfect-continuous':
            //         return <PresentPerfectContinuous name={"Present Perfect Continuous"}/>
            //     case 'future-perfect-continuous':
            //         return <FuturePerfectContinuous name={"Future PerfectContinuous"}/>             
        //     default:
        //         return <></>
        // }
    }

    return (
        <>
            {getTheory(id)}
        </>
    )
}

