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
        const recList = e.target.previousElementSibling
        e.target.remove()

        recList.innerHTML += `
        <form id="rec-form" class="row g-3">
            <div class="col">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="rec-title" required>
            </div>
            <div class="col">
                <label for="author" class="form-label">Author</label>
                <input type="text" class="form-control" id="rec-author" required>
            </div>
                <input type="submit" class="form-control btn btn-info" value="Add book">
        </form>
        `

        const recForm = document.getElementById('rec-form')
        recForm.addEventListener('submit', Recommendation.handleRecSubmit)
    }

    static handleRecSubmit(e){
        e.preventDefault()
        recommendationService.createRecommendation(e.target.parentElement)
        e.target.reset()
    }
    
    appendNewRecToDom(element){
        const li = document.createElement('li')
        li.innerHTML = `${this.title} - ${this.author}`
        element.appendChild(li)
    }


}