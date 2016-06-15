( function() {

    // setup socket object
    var socket = io.connect();

    // setup our namespace
    window._mf = window._mf || {};


    /*
    --------------------------------------------------------------------------------------------------------------------
        EVENT LISTENERS
    --------------------------------------------------------------------------------------------------------------------
    */

    document.getElementById("chatUsernameBtn").onclick = function () {
        updateUsername();
    };

    document.getElementById("chatTextBtn").onclick = function () {
        updateChat();
    };

    document.addEventListener("keydown", function(event) {
        var key = event.which;
        var element = document.activeElement;

        // check if key is ENTER
        if(key == 13) {
            // check if username box has focus
            if(element.id == "chatUsername") {
                updateUsername();
            }
            // else, check if chat box has focus
            else if(element.id == "chatText") {
                updateChat();
            }
        }
    });


    /*
    --------------------------------------------------------------------------------------------------------------------
        SOCKET EVENTS
    --------------------------------------------------------------------------------------------------------------------
    */

    socket.on("new-message", function(data) {
       writeToChat(data.user, data.message);
    });


    /*
    --------------------------------------------------------------------------------------------------------------------
        FUNCTIONS
    --------------------------------------------------------------------------------------------------------------------
    */

    function updateUsername() {
        var username = document.getElementById("chatUsername").value;

        // check if username is empty, if its not then update username
        if( username.length == 0 ) {
            alert("Please enter a username, then select 'Submit Username'.")
        } else {
            window._mf.username = username;
        }
    }

    function updateChat() {
        var text = document.getElementById("chatText").value;

        // check if text isn't empty
        if( text.length != 0) {
            // check if the user has a username
            if (!window._mf.username ) {
                alert("You must enter a username before you can talk in this chat!")
            } else {
                writeToChat( window._mf.username, text);
                socket.emit("message", {user: window._mf.username, message: text} );
                document.getElementById("chatText").value = "";
            }
        }
    }

    function writeToChat(user, message) {
        var newMessage = "\n" + user + ":" + message;

        document.getElementById("chatWindow").innerHTML += newMessage;
    }



})();