class Recommendation {

    static all = []

    constructor({id, title, author, book_id}){
        this.id = id
        this.title = title
        this.author = author
        this.book_id = book_id

        Recommendation.all.push(this)
    }

    // recommendationHTML(){
    //     this.element.innerHTML += `
    //     <h4>People who enjoyed this book also recommend: </h4>
    //     <ul>
    //     <li>${this.title} - ${this.author}</li>
    //     </ul>
    //     `
    //     return this.element
    // }

    static filterRecommendations(bookId){
        return this.all.filter((r) => {
            return r.book_id === bookId
        })

    }

    // appendRecommendationToBook(){
        // let books = Book.all
        // let recs = Recommendation.all

        // let result = books.forEach((b) => {
        //     return recs.filter((r) => {
        //         r.book_id === b.id
        //     })
        // })

        // book.all and recommendation.all match them through the ids
        // const book = books.forEach((book) => {
        //     return recs.find(rec => {
        //         rec.book_id === book.id
        //     });
            
        // })

    // }

    static handleRecClick(e){
        debugger
    }

}