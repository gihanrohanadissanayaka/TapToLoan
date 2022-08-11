import axios from "axios";

class GetPredictionService {


    getPrediction(userInputs) {
        //console.log(userInputs);
        return axios.post('https://fyp-model-test.herokuapp.com/predict_api', userInputs)
    }


}

export default new GetPredictionService;