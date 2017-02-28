function submitSignupForm() {
    if (validateSignup()) {
        var user_name = $('#signup_username').val();
        var pwd = $('#new_pwd1').val();
        
        var data = {
            username: user_name,
            password: pwd
        }

        $.ajax({
                url: "/api/signup",
                type: 'POST',
                data: data
            })
            .fail((data) => {
                console.log(JSON.stringify(data))
            })
            .done((data) => {
                console.log(JSON.stringify(data))
            });
    }
}

function submitLoginForm() {
    if (validateLogin()) {

        var user_name = $('#login_username').val();
        var pwd = $('#pwd').val();
        var data = {
            username: user_name,
            password: pwd
        }

        $.ajax({
                url: "/api/login",
                type: 'POST',
                data: data
            })
            .done(function(data) {
                console.log(JSON.stringify(data))
            })
            .fail((data) => {
                console.log(JSON.stringify(data))
            });
    }
}

function validateLogin() {
    var msg = $('#login_modal_message');
    var user_name = $('#login_username').val();
    var pwd = $('#pwd').val();

    msg.html('');

    if (!user_name)
        msg.html('Enter username.');
    else if (!pwd)
        msg.html('Enter password.');
    else
        return true;

    return false;
}

function validateSignup() {
    var msg = $('#signup_modal_message');
    var user_name = $('#signup_username').val();
    var pwd1 = $('#new_pwd1').val();
    var pwd2 = $('#new_pwd2').val();
    
    msg.html('');

    if (!user_name)
        msg.html('Enter username.')

    else if (!pwd1)
        msg.html('Enter a new password.')

    else if (!pwd2)
        msg.html('Re-enter new password.')

    else if (pwd1 != pwd2)
        msg.html('Passwords do not match.')

    // else if (pwd1.length < 8)
    //     msg.html('Password is too short.')

    else
        return true;

    return false;
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
            <br/><button onclick="submitLoginForm()" class="btn btn-warning givdo-btn modal-font givdo-btn-submit">Submit</button>\
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
            <br/><button onclick="submitSignupForm()" class="btn btn-warning givdo-btn modal-font givdo-btn-submit">Submit</button>\
            <div id="signup_modal_message" class="modal-font right modal-message"></div>\
        </form>';
    return getModal('signupModal', 'Sign Up', signupForm)
}
