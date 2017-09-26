var socket = io.connect('http://localhost:3000');
socket.on('message', function(message) {
  // alert('the server has a message: ' + message);
});

socket.on('sendUsername', function (username) {
    socket.username = username;
});
socket.on('sendName', function (name) {
    socket.name = name;
});
socket.on('sendProfileImg', function (profileImg) {
    socket.profileImg = profileImg;
});

$('#userTweet').on('click', function (e) {
  e.preventDefault();
  var inputMessage = $("#tweet-textarea").val();

  const userTweet = `<li>
                      <strong class="app--tweet--timestamp">Now</strong>
                      <a class="app--tweet--author">
                        <div class="app--avatar" style="background-image: url(' ${socket.profileImg}')">
                          <img src='${socket.profileImg}' />
                        </div>
                        <h4>${socket.name}</h4> @${socket.username}
                      </a>
                      <p>${inputMessage}</p>
                      <ul class="app--tweet--actions circle--list--inline">
                        <li>
                          <a class="app--reply">
                            <span class="tooltip">Reply</span>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 38 28" xml:space="preserve">
                              <path d="M24.9,10.5h-8.2V2.8c0-1.1-0.7-2.2-1.7-2.6c-1-0.4-2.2-0.2-3,0.6L0.8,12c-1.1,1.1-1.1,2.9,0,4L12,27.2
                              c0.5,0.5,1.2,0.8,2,0.8c0.4,0,0.7-0.1,1.1-0.2c1-0.4,1.7-1.5,1.7-2.6v-7.7h8.2c3.3,0,6,2.5,6,5.6v1.3c0,2,1.6,3.5,3.5,3.5
                              s3.5-1.6,3.5-3.5v-1.3C38,16.2,32.1,10.5,24.9,10.5z"/>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a class="app--retweet">
                            <span class="tooltip">Retweet</span>
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 28" xml:space="preserve">
                              <path d="M25.2,22.4H13.1v-9.3h4.7c1.1,0,2.2-0.7,2.6-1.7c0.4-1,0.2-2.3-0.6-3.1l-7.5-7.5c-1.1-1.1-2.9-1.1-4,0L0.8,8.3
                              c-0.8,0.8-1,2-0.6,3.1c0.4,1,1.5,1.7,2.6,1.7h4.7v12.1c0,1.5,1.3,2.8,2.8,2.8h14.9c1.5,0,2.8-1.3,2.8-2.8
                              C28,23.7,26.7,22.4,25.2,22.4z"/>
                              <path d="M49.8,16.7c-0.4-1-1.5-1.7-2.6-1.7h-4.7V2.8c0-1.5-1.3-2.8-2.8-2.8H24.8C23.3,0,22,1.3,22,2.8s1.3,2.8,2.8,2.8h12.1v9.3
                              h-4.7c-1.1,0-2.2,0.7-2.6,1.7c-0.4,1-0.2,2.3,0.6,3.1l7.5,7.5c0.5,0.5,1.3,0.8,2,0.8c0.7,0,1.4-0.3,2-0.8l7.5-7.5
                              C50,18.9,50.2,17.7,49.8,16.7z"/>
                            </svg>
                            <strong>0</strong>
                          </a>
                        </li>
                        <li>
                          <a class="app--like">
                            <span class="tooltip">Like</span>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 28" xml:space="preserve">
                              <path class="st0" d="M25.8,0c-3.6,0-6.8,2.1-8.3,5.1C16,2.1,12.9,0,9.2,0C4.1,0,0,4.1,0,9.2C0,21.4,17.3,28,17.3,28S35,21.3,35,9.2
                              C35,4.1,30.9,0,25.8,0L25.8,0z"/>
                            </svg>
                            <strong>0</strong>
                          </a>
                        </li>
                      </ul>
                    </li>`;

  if (inputMessage !== '') {
    if ($("#tweet-textarea").val().length <= 140) {
      $(".app--tweet--list").prepend(userTweet);
      $("#tweet-textarea").val('');
      socket.emit('message', inputMessage);

    } else {
      alert('Tweet must be 140 characters or less.')
    }

  } else if (inputMessage === '') {
    $("#tweet-textarea").attr("placeholder", "What's happening?");
  }

  socket.emit('message', inputMessage);
});

$("#tweet-textarea").keydown(function () {
    var maxCharacters = 140 - $("#tweet-textarea").val().length;
    $("#tweet-char").text(maxCharacters);
});
