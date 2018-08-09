
$.uiAlert = function (options) {
  var setUI = $.extend({
    textHead: 'Your user registration was successful.',
    text: 'You may now log-in with the username you have chosen',
    colors: 'blue',
    position: 'top-right',
    icon: '',
    time: 5,
    permanent: false
  }, options);

  var ui_alert = 'ui-alert-content';
  ui_alert += '-' + setUI.position;

  if (!$('body > .' + ui_alert).length) {
    $('body').append('<div class="ui-alert-content ' + ui_alert + '"></div>');
  }

  var message = $('<div id="messages" class="ui-alert ui icon message ' + setUI.colors + '" style="opacity: 0;">\
    <i class="close icon" id="messageclose"></i>\
    <i class="' + setUI.icon + ' icon"></i>\
    <div style="margin-right: 20px;">\
      <div class="header">' + setUI.textHead + '</div>\
      <p> ' + setUI.text + '</p>\
    </div>\
  </div>');

  $('.' + ui_alert).prepend(message);

  message.animate({
    opacity: '1',
  }, 500);

  if (setUI.permanent === false) {
    var timer = 0;
    $(message).mouseenter(function () {
      clearTimeout(timer);
    }).mouseleave(function () {
      uiAlertHide();
    });
    uiAlertHide();
  }

  function uiAlertHide() {
    timer = setTimeout(function () {
      message.animate({
        opacity: '0',
      }, 500, function () {
        message.remove();
      });
    }, (setUI.time * 1000));
  }

  $('#messageclose').on('click', function () {
    $(this)
      .closest('#messages')
      .transition('fade');
  });

};
