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
            }
        })
    }

    createRecommendation(element){
        const rec = {
            title: document.getElementById('rec-title').value,
            author: document.getElementById('rec-author').value,
            book_id: parseInt(document.querySelector(".book-img-show").dataset.id)
        }

        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rec)
        }

        fetch(`${this.endpoint}/recommendations`, configObj)
        .then(resp => resp.json())
        .then(recommendation => {
            const r = new Recommendation(recommendation)
            r.appendNewRecToDom(element)
            document.getElementById('rec-form').remove()
        })
    }

    
}