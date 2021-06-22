class Recommendation {

    static all = []

    constructor({title, author, book_id}){
        this.title = title
        this.author = author
        this.book_id = book_id

        this.element = document.createElement('span')
        this.element.dataset.id = this.id
        this.element.id = `recommendation-${this.id}`

    }

    recommendationHTML(){
        this.element.innerHTML += `
        <ul>
        <li>${this.title} - ${this.author}</li>
        </ul>
        `
    }

    appendRecommendationToBook(){
        //append the recommendation to the book it belongs to
    }

}