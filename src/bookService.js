class BookService{
    constructor(endpoint){
        this.endpoint = endpoint
    }

    getBooks(){
        fetch(`${this.endpoint}/books`)
        .then(resp => resp.json())
        .then(books => {
            for (const book of books){
                const b = new Book(book)
                b.appendBookToDOM()
            }
        })
    }
}