document.addEventListener("DOMContentLoaded", function(){
    
    fetch(baseUrl+'questions/recent').then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        console.log(data);
        findDom('loading').style.visibility='hidden';
        findDom('featured-question-title').innerHTML=data[0]['question_title'];
        findDom('featured-question-body').innerHTML=data[0]['question_body'];
        findDom('featured-question-id').setAttribute('value', data[0]['id']);
        findDom('featured-question-user-id').setAttribute('value', data[0]['user_id']);
        console.log(data[0]['id']);
        findDom('answer-link').style.visibility='visible';
        id = data[0]['id'];
        fetchRecentQuestionAnswers(id);
        return data;
    }).catch(err => {
        console.log(err);
        // Do something for an error here
    });
});

function fetchRecentQuestionAnswers(id){
        console.log('recent question Id:'+id);
        console.log('lets fetch the answers to this question');

        const urlPostFix = 'questions/recent/'+id+'/answers';
        const url = baseUrl+urlPostFix;
        console.log(url);

        fetch(url).then(response => {
        return response.json();
    }).then(data =>{
            console.log('answers retrieved');
            console.log(data);
        }).catch(err=>{
            console.log('Failed to retrieve answers');
        });
}


function saveAnswer(questionId) {
 questionId = findDom('featured-question-id').value;
console.log(questionId);
 const userId = findDom('featured-question-user-id').value;
 console.log(userId);
 const answer = findDom('answer-body').value;
 console.log(answer);

 const answerUrl = baseUrl+'questions/answers';
const queryBody = 'question_id='+questionId+'&user_id='+userId+'&answer='+answer;
console.log(queryBody);

//check if valid characters are entered in answer text
 if (typeof answer === "string" && answer.trim().length >= 5) {


fetch(answerUrl,
        {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "authorization": localStorage.Authorization
            },
            body: queryBody
        })
        .then(response => {
            return response.json();
        }).then(data => {
            if (data['status'] === 200) {
            findDom('answer-body').value = '';
            findDom('answer-form').style.visibility='hidden';
            findDom('answer-again').style.visibility='visible';
            findDom('answer-title').style.visibility='hidden';
            const answerStatus = findDom('answer-status');
                    answerStatus.innerHTML = 'your Answer was saved succesfully';
                    answerStatus.style.color='green';  
                    answerStatus.style.visibility='visible';
            }else{
               findDom('answer-status').style.color='red';
               findDom('answer-body').style.border='1px solid red';
               const answerStatus = findDom('answer-status'); 
                        answerStatus.innerHTML = 'Failed to save! Login and try again';
                        answerStatus.style.visibility='visible';
            }
        // Work with JSON data here
        console.log(data['message']);
    }).catch(err => {
        console.log(err);
        // Do something for an error here
    });

console.log(answerUrl);

}else{
    console.log('invalid answer text');
    const answerStatus = findDom('answer-status');
            answerStatus.innerHTML = 'please type at least 5 characters';
            answerStatus.style.color='orange';
            answerStatus.style.visibility='visible';
}
}


function showAnswerForm(){
    findDom('answer-form').style.visibility='visible';
    findDom('answer-again').style.visibility='hidden';
}

