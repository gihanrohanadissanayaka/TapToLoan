import axios from "axios";
import React, { useState } from 'react';


class ContextProvider {

    setPredictionState(res){
        const [prediction, setPrediction ] = useState({name:'', age:''});
        setPrediction(res);
        return prediction;
    }
}

export default new ContextProvider;
