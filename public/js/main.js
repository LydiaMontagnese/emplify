$(document).ready(
    function() {
        $('#main').append(getLoginModal())
        $('#main').append(getSignUpModal())
        renderNotLoggedIn()
    }
)

function renderNotLoggedIn() {
    var links = '\
        <li><a class="clickable" data-toggle="modal" data-target="#signupModal">Sign Up</a></li>\
        <li><a class="clickable" data-toggle="modal" data-target="#loginModal">Login</a></li>';
    $('#navbar-right').html(links)
}

function renderLoggedIn() {
    
}