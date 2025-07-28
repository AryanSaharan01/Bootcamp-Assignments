const articleButton = document.querySelector("#article-btn");
const talkButton = document.querySelector("#talk-btn");

const articlePage = document.querySelector("#article");
const talkPage = document.querySelector("#talk")

const handleClick = (e) => {
    if(e.target == articleButton){
        articlePage.classList.remove("hide");
        articleButton.classList.add("active");
        talkPage.classList.add("hide");
        talkButton.classList.remove("active");
    } else if (e.target == talkButton){
        talkPage.classList.remove("hide");
        talkButton.classList.add("active");
        articlePage.classList.add("hide");
        articleButton.classList.remove("active")
    }
}