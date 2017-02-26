function getModal(id, title, content) {
    return '\
        <div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
          <div class="modal-dialog" role="document">\
            <div class="modal-content">\
              <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="glyphicon glyphicon-remove span-font modal-font"></span></button>\
                <h4 class="modal-title modal-font" id="myModalLabel">'+title+'</h4>\
              </div>\
              <div class="modal-body">'
                + content +
              '</div>\
            </div>\
          </div>\
        </div>';
}

