// // var socket = io();
// var isLogin = false;
// var nameUser = '';
// var passwordUser;
// var chatName = 'Guest';
//
// function changeUserName(newName) {
//     document.getElementById('chatName').innerHTML = "Welcome " + newName;
// }
//
// function loginUser() {
//     console.log('how how how');
//     nameUser = $('.usernameInput').val();
//     passwordUser = $('.passwordInput').val();
//     console.log(nameUser + passwordUser);
//     // chatName = nameUser;
//     // nameUser = cleanInput(nameUser);
//     // passwordUser = cleanInput(passwordUser);
//     // console.log(nameUser);
//     // console.log(passwordUser);
//     // console.log('Pressed Login Button');
//     // $.ajax({
//     //     url: 'login',
//     //     type: 'POST',
//     //
//     // })
//     // // io.emit('isLogin',isLogin);
//     // io.emit('nameUser', nameUser);
//     // io.emit('passwordUser', passwordUser);
// }
//
// window.onload = function () {
//     console.log('try send form');
//     var btn = document.getElementById('loginButton');
//
//
//     btn.addEventListener('click', function () {
//         var name = document.getElementById('usernameInput').value;
//         var pass = document.getElementById('passwordInput').value;
//         var xhr = new XMLHttpRequest();
//         console.log(name + pass);
//         var userData = {
//             usernameInput: name,
//             passwordInput: pass
//         };
//
//         console.log('name userData' + userData.username);
//
//
//         xhr.open('GET', '/login?username=' + name + '&password=' + pass, true);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         // xhr.responseType = 'json';
//         var data = JSON.stringify(userData);
//         console.log(data);
//
//         xhr.send(data);
//         xhr.onload = function () {
//             // alert(this.responseText);
//             console.log('response from server');
//         };
//
//         xhr.onerror = function () {
//             alert('server error');
//         };
//     });
//
// };
//
// function showRegisterForm() {
//     $('.loginFields').hide();
//     $('.registerFields').show();
//
// }
//
// function showLoginForm() {
//     $('.loginFields').show();
//     $('.registerFields').hide();
// }
//
//
// // $(function () {
//
//
// // var FADE_TIME = 150; // ms
// // var TYPING_TIMER_LENGTH = 400; // ms
// // var COLORS = [
// //     '#e21400', '#91580f', '#f8a700', '#f78b00',
// //     '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
// //     '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
// // ];
// //
// //
// // // Initialize variables
// // var $window = $(window);
// // var $usernameInput = $('.usernameInput'); // Input for username
// // var $passwordInput = $('.passwordInput');
// // var $messages = $('.messages'); // Messages area
// // var $inputMessage = $('.inputMessage'); // Input message input box
// //
// // var $loginPage = $('.login.page'); // The login page
// // var $chatPage = $('.chat.page'); // The chatroom page
// //
// // // Prompt for setting a username
// // var username;
// // var password;
// // var connected = false;
// // var typing = false;
// // var lastTypingTime;
// // var $currentInput = $usernameInput;
// //
// //
// // function addParticipantsMessage(data) {
// //     var message = '';
// //     if (data.numUsers === 1) {
// //         message += "there's 1 participant";
// //     } else {
// //         message += "there are " + data.numUsers + " participants";
// //     }
// //     log(message);
// // }
// //
// // // Sets the client's username and password
// // function setUsername() {
// //     username = cleanInput($usernameInput.val().trim());
// //     password = cleanInput($passwordInput.val().trim());
// //     if (username === '') {
// //         alert('Please enter User name');
// //         return;
// //     }
// //     if (password === '') {
// //         alert('Please enter password');
// //         return;
// //     }
// //
// //     console.log('userName and password is valid');
// //     // If the username is valid
// //     // if (username) {
// //     $loginPage.fadeOut();
// //     $chatPage.show();
// //     // $loginPage.off('click');
// //     $currentInput = $inputMessage;
// //
// //     // Tell the server your username
// //     socket.emit('add user', username);
// //     // }
// // }
// //
// // // Sends a chat message
// // function sendMessage() {
// //     var message = $inputMessage.val();
// //     // Prevent markup from being injected into the message
// //     message = cleanInput(message);
// //     // if there is a non-empty message and a socket connection
// //     if (message && connected) {
// //         $inputMessage.val('');
// //         addChatMessage({
// //             username: username,
// //             message: message
// //         });
// //         // tell server to execute 'new message' and send along one parameter
// //         socket.emit('new message', message);
// //     }
// // }
// //
// // // Log a message
// // function log(message, options) {
// //     var $el = $('<li>').addClass('log').text(message);
// //     addMessageElement($el, options);
// // }
// //
// // // Adds the visual chat message to the message list
// // function addChatMessage(data, options) {
// //     // Don't fade the message in if there is an 'X was typing'
// //     var $typingMessages = getTypingMessages(data);
// //     options = options || {};
// //     if ($typingMessages.length !== 0) {
// //         options.fade = false;
// //         $typingMessages.remove();
// //     }
// //
// //     var $usernameDiv = $('<span class="username"/>')
// //         .text(data.username)
// //         .css('color', getUsernameColor(data.username));
// //     var $messageBodyDiv = $('<span class="messageBody">')
// //         .text(data.message);
// //
// //     var typingClass = data.typing ? 'typing' : '';
// //     var $messageDiv = $('<li class="message"/>')
// //         .data('username', data.username)
// //         .addClass(typingClass)
// //         .append($usernameDiv, $messageBodyDiv);
// //
// //     addMessageElement($messageDiv, options);
// // }
// //
// // // Adds the visual chat typing message
// // function addChatTyping(data) {
// //     data.typing = true;
// //     data.message = 'is typing';
// //     addChatMessage(data);
// // }
// //
// // // Removes the visual chat typing message
// // function removeChatTyping(data) {
// //     getTypingMessages(data).fadeOut(function () {
// //         $(this).remove();
// //     });
// // }
// //
// // // Adds a message element to the messages and scrolls to the bottom
// // // el - The element to add as a message
// // // options.fade - If the element should fade-in (default = true)
// // // options.prepend - If the element should prepend
// // //   all other messages (default = false)
// // function addMessageElement(el, options) {
// //     var $el = $(el);
// //
// //     // Setup default options
// //     if (!options) {
// //         options = {};
// //     }
// //     if (typeof options.fade === 'undefined') {
// //         options.fade = true;
// //     }
// //     if (typeof options.prepend === 'undefined') {
// //         options.prepend = false;
// //     }
// //
// //     // Apply options
// //     if (options.fade) {
// //         $el.hide().fadeIn(FADE_TIME);
// //     }
// //     if (options.prepend) {
// //         $messages.prepend($el);
// //     } else {
// //         $messages.append($el);
// //     }
// //     $messages[0].scrollTop = $messages[0].scrollHeight;
// // }
// //
// // // Prevents input from having injected markup
// // function cleanInput(input) {
// //     return $('<div/>').text(input).html();
// // }
// //
// // // Updates the typing event
// // function updateTyping() {
// //     if (connected) {
// //         if (!typing) {
// //             typing = true;
// //             socket.emit('typing');
// //         }
// //         lastTypingTime = (new Date()).getTime();
// //
// //         setTimeout(function () {
// //             var typingTimer = (new Date()).getTime();
// //             var timeDiff = typingTimer - lastTypingTime;
// //             if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
// //                 socket.emit('stop typing');
// //                 typing = false;
// //             }
// //         }, TYPING_TIMER_LENGTH);
// //     }
// // }
// //
// // // Gets the 'X is typing' messages of a user
// // function getTypingMessages(data) {
// //     return $('.typing.message').filter(function (i) {
// //         return $(this).data('username') === data.username;
// //     });
// // }
// //
// // // Gets the color of a username through our hash function
// // function getUsernameColor(username) {
// //     // Compute hash code
// //     var hash = 7;
// //     for (var i = 0; i < username.length; i++) {
// //         hash = username.charCodeAt(i) + (hash << 5) - hash;
// //     }
// //     // Calculate color
// //     var index = Math.abs(hash % COLORS.length);
// //     return COLORS[index];
// // }
// //
// // // Keyboard events
// //
// // $window.keydown(function (event) {
// //     // Auto-focus the current input when a key is typed
// //     if (!(event.ctrlKey || event.metaKey || event.altKey)) {
// //         $currentInput;
// //     }
// //     // When the client hits ENTER on their keyboard
// //     if (event.which === 13) {
// //         if (username) {
// //             sendMessage();
// //             socket.emit('stop typing');
// //             typing = false;
// //         } else {
// //             setUsername();
// //         }
// //     }
// // });
// //
// // $inputMessage.on('input', function () {
// //     updateTyping();
// // });
// //
// // // Click events
// //
// // // Focus input when clicking anywhere on login page
// // $loginPage.click(function () {
// //     $currentInput;
// // });
// //
// // // Focus input when clicking on the message input's border
// // $inputMessage.click(function () {
// //     $inputMessage.focus();
// // });
// //
// // // Socket events
// //
// // // Whenever the server emits 'login', log the login message
// // socket.on('login', function (data) {
// //     connected = true;
// //     // Display the welcome message
// //     var message = "Welcome to WACh";
// //     log(message, {
// //         prepend: true
// //     });
// //     addParticipantsMessage(data);
// // });
// //
// // // Whenever the server emits 'new message', update the chat body
// // socket.on('new message', function (data) {
// //     addChatMessage(data);
// // });
// //
// // // Whenever the server emits 'user joined', log it in the chat body
// // socket.on('user joined', function (data) {
// //     log(data.username + ' joined');
// //     addParticipantsMessage(data);
// // });
// //
// // // Whenever the server emits 'user left', log it in the chat body
// // socket.on('user left', function (data) {
// //     log(data.username + ' left');
// //     addParticipantsMessage(data);
// //     removeChatTyping(data);
// // });
// //
// // // Whenever the server emits 'typing', show the typing message
// // socket.on('typing', function (data) {
// //     addChatTyping(data);
// // });
// //
// // // Whenever the server emits 'stop typing', kill the typing message
// // socket.on('stop typing', function (data) {
// //     removeChatTyping(data);
// // });
// //
// // socket.on('disconnect', function () {
// //     log('you have been disconnected');
// // });
// //
// // socket.on('reconnect', function () {
// //     log('you have been reconnected');
// //     if (username) {
// //         socket.emit('add user', username);
// //     }
// // });
// //
// // socket.on('reconnect_error', function () {
// //     log('attempt to reconnect has failed');
// // });
//
// // });