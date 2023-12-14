//Model
const sendBtn = document.querySelector('.send-btn');
const commentsSection = document.querySelector('.comments-section');
const replyBtns = document.querySelectorAll('.reply');

//View 
function upVoting(plus){
    //Selecting and numbering the voting value 
    const votingCounter = plus.nextElementSibling;
    const votingCounterValue = Number(votingCounter.textContent);
    //Increasing and applying the new voting value
    const incrementedValue = votingCounterValue + 1;
    votingCounter.textContent = incrementedValue;
}

function downVoting(minus){
    //Selecting and numbering the voting value 
    const votingCounter = minus.previousElementSibling;
    const votingCounterValue = Number(votingCounter.textContent);
    //Dealing with the voting value in two different conditions
    if(votingCounterValue === 0){
        //If the value < 0, do nothing
    } else {
        //Decreasing and applying the new voting value if it's > 0
        const decrementedValue = votingCounterValue - 1;
        votingCounter.textContent = decrementedValue;
    }
}

function sendComment(){
    //Handling the value of the send comment field
    const sendCommentField = document.getElementById('comment-field');
    const sendCommentFieldValue = sendCommentField.value;
    
    if(sendCommentFieldValue === ''){
        //If the value of the field is empty do nothing
    } else {
        //creating the HTML markup for the new comment
        const commentHTML = `
        <div class="voting">
            <div class="plus">
                <img src="imgs/icon-plus.svg" alt="Plus icon">
            </div>
            <div class="voting-counter">0</div>
            <div class="minus">
                <img src="imgs/icon-minus.svg" alt="Minus icon">
            </div>
        </div>
        <div class="comment-info">
            <div class="comment-header">
                <div class="user-info">
                    <img src="imgs/avatars/image-juliusomo.png" alt="user's profile picture">
                    <h2 class="username">juliusomo</h2>
                    <h3 class="you">you</h3>
                    <h3 class="time">2 days ago</h3>
                </div>
                <div class="edit-delete-container">
                    <div class="delete">
                        <img src="imgs/icon-delete.svg" alt="Delete icon">
                        <span class="delete-label">Delete</span>
                    </div>    
                    <div class="edit">
                        <img src="imgs/icon-edit.svg" alt="Edit icon">
                        <span class="edit-label">Edit</span>
                    </div>    
                </div>
            </div>
            <div>
                <p class="comment-text">${sendCommentFieldValue}</p>
            </div>
            <div class="update-btn-container">
                <button class="update-btn">Update</button>
            </div>
        </div>
    `;
    //Creating the parent element for the above markup
    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML = commentHTML;
    //Appending the new comment onto the page
    commentsSection.appendChild(comment);
    //Reseting the value of the field
    sendCommentField.value = '';
    //Handling the voting functionality of the new comment
    voting();
    //Delete comment functionality
    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach((deleteBtn)=>{
        deleteBtn.addEventListener('pointerdown', deleteComment.bind(null, deleteBtn));
    });
    //Edit comment functionality 
    const editBtns = document.querySelectorAll('.edit');
    editBtns.forEach((editBtn)=>{
        editBtn.addEventListener('pointerdown', edit.bind(null, editBtn));
    });
    //Update commment functionality
    const updateBtns = document.querySelectorAll('.update-btn');
    updateBtns.forEach((updateBtn)=>{
        updateBtn.addEventListener('pointerdown', update.bind(null, updateBtn));
    });
    }
}

function voting(){
    const upVotes = document.querySelectorAll('.plus');
    const downVotes = document.querySelectorAll('.minus');
    //A collective function for the whole functionality of voting
    upVotes.forEach((upVote)=>{
        upVote.addEventListener('pointerdown', upVoting.bind(null, upVote));
    });
    
    downVotes.forEach((downVote)=>{
        downVote.addEventListener('pointerdown', downVoting.bind(null, downVote));
    });
}

function reply(replyBtn){
    //Selecting the comment Element using the DOM
    const commentNode = replyBtn.parentElement.parentElement.parentElement;
    //Creating the markup for the reply
    const replyHTML = `
        <div class="your-image">
            <img src="imgs/avatars/image-juliusomo.png" alt="your profile picture">
        </div>
        <div class="comment-field">
            <textarea class="reply-comment-field" type="text" id="reply-comment-field" placeholder="Add a comment...." rows="4"></textarea>
        </div>
        <div class="reply-btn-container">
            <button class="reply-comment-btn">Reply</button>
        </div>
    `;
    //Creating the parent element for the above markup
    const replyComment = document.createElement('div');
    replyComment.className = 'reply-comment';
    replyComment.innerHTML = replyHTML;
    //Appending the new reply onto the page and in its proper place
    commentNode.parentNode.insertBefore(replyComment, commentNode.nextSibling);
    //Selecting the user name
    const userInfo = replyBtn.previousElementSibling;
    const userName = userInfo.children[1];
    //Setting to whose comment the reply is 
    const replyCommentFields = document.querySelectorAll('.reply-comment-field');
    replyCommentFields.forEach((replyCommentField)=>{
        replyCommentField.value = `@${userName.textContent} `;
    });

    //Sending the reply part
    const replyCommentBtns = document.querySelectorAll('.reply-comment-btn');
    replyCommentBtns.forEach((replyCommentBtn)=>{
        replyCommentBtn.addEventListener('pointerdown', sendReply.bind(null, replyCommentBtn, userName.textContent, replyComment));
    });
}

function sendReply(replyCommentBtn, username, replyComment){
    //Selecting the reply field
    const replyCommentField = replyCommentBtn.parentElement.previousElementSibling.firstElementChild;
    //Checking whether the user enter any reply or not and reacting to both scenarios
    if(replyCommentField.value === `@${username} `){

    } else {
        //Setting the html for the reply comment
        const replyCommentHTML = `
        <div class="voting">
            <div class="plus">
                <img src="imgs/icon-plus.svg" alt="Plus icon">
            </div>
            <div class="voting-counter">0</div>
            <div class="minus">
                <img src="imgs/icon-minus.svg" alt="Minus icon">
            </div>
        </div>
        <div class="comment-info">
            <div class="comment-header">
                <div class="user-info">
                    <img src="imgs/avatars/image-juliusomo.png" alt="user's profile picture">
                    <h2 class="username">juliusomo</h2>
                    <h3 class="you">you</h3>
                    <h3 class="time">2 days ago</h3>
                </div>
                <div class="edit-delete-container">
                    <div class="delete">
                        <img src="imgs/icon-delete.svg" alt="reply icon">
                        <span class="delete-label">Delete</span>
                    </div>    
                    <div class="edit">
                        <img src="imgs/icon-edit.svg" alt="reply icon">
                        <span class="edit-label">Edit</span>
                    </div>    
                </div>
            </div>
            <div>
                <p class="comment-text">
                    <span class="replied-username">@${username}</span>
                    ${replyCommentField.value.slice(username.length+1, replyCommentField.value.length)}
                </p>
            </div>
            <div class="update-btn-container">
                <button class="update-btn">Update</button>
            </div>
        </div>
    `;
    //Replacing the old reply comment markup with the new markup
    replyComment.innerHTML = replyCommentHTML;
    replyComment.classList.add('replied-comment');
    //Handling the voting functionality for the new reply
    voting();
    //Deleting the comment
    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach((deleteBtn)=>{
        deleteBtn.addEventListener('pointerdown', deleteComment.bind(null, deleteBtn));
    });
    //Edit comment functionality 
    const editBtns = document.querySelectorAll('.edit');
    editBtns.forEach((editBtn)=>{
        editBtn.addEventListener('pointerdown', edit.bind(null, editBtn));
    });
    //Update commment functionality
    const updateBtns = document.querySelectorAll('.update-btn');
    updateBtns.forEach((updateBtn)=>{
        updateBtn.addEventListener('pointerdown', update.bind(null, updateBtn));
    });
    }
}

function deleteComment(deleteBtn){
    //Selecting the comment element
    const commentRemove = deleteBtn.parentElement.parentElement.parentElement.parentElement;
    //Selecting the delete message and displaying it
    const deleteMessageContainer = document.querySelector('.delete-message-container');
    deleteMessageContainer.classList.add('delete-message-show');
    //Selecting the cancel button and hiding the delete message
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('pointerdown', ()=>{
        deleteMessageContainer.classList.remove('delete-message-show');
    });
    //Selecting the delete button and hiding the delete message
    const deleteMessageBtn = document.getElementById('delete-btn');
    deleteMessageBtn.addEventListener('pointerdown', ()=>{
        commentRemove.remove();
        deleteMessageContainer.classList.remove('delete-message-show');
    });
}

function edit(editBtn){
    //Selecting the text comment element and its parent and saving its value
    const commentText = editBtn.parentElement.parentElement.nextElementSibling.firstElementChild;
    const commentTextContainer = editBtn.parentElement.parentElement.nextElementSibling;
    const updateFieldHTML = `
        <textarea type="text" id="update-field" placeholder="Add a comment...." rows="4"></textarea>
    `;
    const commentTextValue = commentText.textContent;
    //updating the markup for the comment container
    commentTextContainer.innerHTML = updateFieldHTML;
    const updateField = editBtn.parentElement.parentElement.nextElementSibling.firstElementChild;
    updateField.value = commentTextValue;
    //Showing the update button
    const updateBtn = editBtn.parentElement.parentElement.nextElementSibling.nextElementSibling;
    updateBtn.classList.add('update-btn-container-show');
}

function update(updateBtn){
    const updatedComment = updateBtn.parentElement.previousElementSibling.firstElementChild;
    const updatedCommentValue = updatedComment.value;
    const commentContainer = updateBtn.parentElement.previousElementSibling;
    const updatedCommentHTML = `
        <p class="comment-text">${updatedCommentValue}</p>
    `;
    commentContainer.innerHTML = updatedCommentHTML;
    updateBtn.parentElement.classList.remove('update-btn-container-show');
}
//Controller
voting();
sendBtn.addEventListener('pointerdown', sendComment);

replyBtns.forEach((replyBtn)=>{
    replyBtn.addEventListener('pointerdown', reply.bind(null, replyBtn));
});