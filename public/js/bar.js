function getBar(data) {
    var percentage = (data.total / data.goal * 100).toFixed(0)
    var actual_percentage = percentage
    if (data.total > data.goal)
        percentage = 100

    var test = '\
        <div class="progress">\
            <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="' + percentage + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentage + '%;">\
            ' + actual_percentage + '%\
            </div>\
        </div>';
    return test
}
