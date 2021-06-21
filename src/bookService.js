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

    createBook(){
        const book = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            description: document.getElementById('description').value,
            book_image: document.getElementById('book-image').value,
            amazon_product_url: document.getElementById('amazon-product-url').value
        }

        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }

        fetch(`${this.endpoint}/books`, configObj)
        .then(resp => resp.json())
        .then(book => {
            debugger
            const b = new Book(book)
            b.appendBookToDOM()
        })
    }
}