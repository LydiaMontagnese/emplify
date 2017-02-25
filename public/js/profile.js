$(document).ready(
    () => {
        test_data.forEach((data, i) => {
            appendUserProfile(data, i)
        })
    }
)

function appendUserProfile(data, n) {
    var layout = '\
            <div class="row user-profile" id="user-profile_' + n + '">\
                <div class="col-md-6 left" id="profile-left_' + n + '">\
                </div>\
                <div class="col-md-6 left" id="profile-right_' + n + '">\
                </div>\
            </div>\
        ';
    $('#main').append(layout)

    //left
    var profile_image = '\
            <img class="profile-image left" id="profile_image_' + n + '" src="http://www.givdo.com/images/g-orange-icon.png"/>\
        ';

    var text = '<div class="left left-info"><div class="user-profile-name">' + data.name + '</div><br>'
    text += '<div class="gray-text">City: ' + data.location + '<br/>'
    text += 'Status: ' + data.status + '</div><br/>'
    text += '<br>'
    text += '<div class="about-text">' + data.about + '</div></div>'
    $('#profile-left_' + n).append(profile_image)
    $('#profile-left_' + n).append(text)

    //right
    var amountLabel = '<div class="middle progress-label">Raised: $' + data.total + '</div>';
    var progressBar = getBar(data)
    var giveButton = '<button class="btn btn-warning give-button">Give 2X through ' + data.name + '</button>';
    var progressLabels = '<div classs>\
            <div class="left progress-label">$0</div>\
            <div class="right-div"><div class="right progress-label">$' + data.goal + '</div></div></div><br><br>';

    $('#profile-right_' + n).append(amountLabel)
    $('#profile-right_' + n).append(progressBar)
    $('#profile-right_' + n).append(progressLabels)
    $('#profile-right_' + n).append(giveButton)
}
