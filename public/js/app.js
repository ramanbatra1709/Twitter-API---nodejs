const search = document.getElementById('search');
const button = document.getElementById('getTweets');
const output = document.getElementById('output');
const publishTweet = document.getElementById('publishTweet');

publishTweet.addEventListener('submit', function()  {
    event.preventDefault();
    let newTweet = {
        'tweet': document.getElementById('newTweet' ).value
    };
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/tweet/', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4 || xhr.status != 200)
            return;
        console.log(xhr.responseText);
    }
    xhr.send(JSON.stringify(newTweet));
});

button.addEventListener('click', function() {
    const url = `/tweets/${search.value}`;
    fetch(url).then(function(response)  {
        return response.json();
    }).then(function(data)  {
        outputData(data.statuses);
    }).catch(function(error)    {
        console.error(error);
    });
});

function outputData(tweets)   {
    output.innerHTML = '';
    tweets.forEach(function(tweet)    {
        let link = `<a href='https://twitter.com/i/web/status/${tweet.id_str}' target='_blank'>${tweet.text}</a>`;
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.innerHTML = `${link}<small>${tweet.user.name}</small> | Retweets: ${tweet.retweet_count}`;
        li.appendChild(span);
        output.appendChild(li);
    });
}
