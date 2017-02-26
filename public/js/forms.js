function submitSignupForm() {

}

function submitLoginForm() {

}

function getLoginModal() {
    var loginForm = '\
        <form onSubmit="return false;">\
            <div class="form-group">\
                <label class="modal-font" for="login_username">Username:</label>\
                <input type="text" class="form-control form-input" name="login_username" id="login_username">\
            </div>\
            <div class="form-group">\
                <label class="modal-font" for="pwd">Password:</label>\
                <input type="password" class="form-control form-input" name="login_pwd" id="pwd">\
            </div>\
            <br/><button onclick="submitSignupForm()" class="btn btn-warning givdo-btn modal-font givdo-btn-submit">Submit</button>\
            <div id="login_modal_message" class="modal-font right modal-message"></div>\
        </form>';
    return getModal('loginModal', 'Login', loginForm)
}

function getSignUpModal() {
    var signupForm = '\
        <form onSubmit="return false;">\
            <div class="form-group">\
                <label class="modal-font" for="signup_username">New username:</label>\
                <input type="text" class="form-control form-input" name="signup_username" id="signup_username">\
            </div>\
            <div class="form-group">\
                <label class="modal-font" for="signup_pwd1">New password:</label>\
                <input type="password" class="form-control form-input" name="signup_pwd1" id="new_pwd1">\
            </div>\
            <div class="form-group">\
                <label class="modal-font" for="signup_pwd2">Re-enter new password:</label>\
                <input type="password" class="form-control form-input" name="signup_pwd2" id="new_pwd2">\
            </div>\
            <br/><button onclick="submitLoginForm()" class="btn btn-warning givdo-btn modal-font givdo-btn-submit">Submit</button>\
            <div id="signup_modal_message" class="modal-font right modal-message"></div>\
        </form>';
    return getModal('signupModal', 'Sign Up', signupForm)
}