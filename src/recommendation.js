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
        <h4>Recommendations: </h4>
        <ul>
        <li>${this.title} - ${this.author}</li>
        </ul>
        `
        return this.element
    }

    appendRecommendationToBook(){
        const book = Book.all.find((book) => book.id === this.book_id )
        const bookDiv = document.querySelector(`#book-${book.id}`)
        bookDiv.append(this.recommendationHTML())
        debugger
        //append the recommendation to the book it belongs to
    }

}