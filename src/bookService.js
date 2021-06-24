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
                b.appendRecommendationsToDOM()
                // b.getBookRecommendations()
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
            const b = new Book(book)
            b.appendBookToDOM()
        })
    }

    increaseLikes(bookId){
        let currentLikes = parseInt(document.getElementById('likes-count-1').innerText)
        fetch(`${this.endpoint}/books/${bookId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "likes": ++currentLikes
            })
        })
    }

    decreaseLikes(bookId){
        let currentLikes = parseInt(document.getElementById('likes-count-1').innerText)
        fetch(`${this.endpoint}/books/${bookId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "likes": --currentLikes
            })
        })
    }

}