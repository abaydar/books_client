class Recommendation {

    static all = []

    constructor({id, title, author, book_id}){
        this.id = id
        this.title = title
        this.author = author
        this.book_id = book_id

        Recommendation.all.push(this)
    }


    static filterRecommendations(bookId){
        return this.all.filter((r) => {
            return r.book_id === bookId
        })

    }


    static handleRecClick(e){
        const bookDiv = e.target.parentElement
        e.target.remove()

        bookDiv.innerHTML += `
        <form id="rec-form">
            Title: <input type="text" id="rec-title"><br>
            Author: <input type="text" id="rec-author"><br>
            <input type="submit" value="Add Recommendation">
        </form>
        `

        const recForm = document.getElementById('rec-form')
        recForm.addEventListener('submit', Recommendation.handleRecSubmit)
    }

    static handleRecSubmit(e){
        e.preventDefault()
        recommendationService.createRecommendation(e.target.previousElementSibling)
    }
    
    appendNewRecToDom(element){
        const li = document.createElement('li')
        li.innerHTML = `${this.title} - ${this.author}`
        element.appendChild(li)
    }

}