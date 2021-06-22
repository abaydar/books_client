class RecommendationService {
    constructor(endpoint){
        this.endpoint = endpoint
    }

    getRecommendations(){
        fetch(`${this.endpoint}/recommendations`)
        .then(resp => resp.json())
        .then(recommendations => {
            for (const recommendation of recommendations){
                const r = new Recommendation(recommendation)
                // r.appendRecommendationToBook()
            }
        })
    }
}