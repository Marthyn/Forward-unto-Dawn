var callService = function (uri, successFunction) {
        $.ajax({
            cache: true,
            url: uri,
            data: "{}",
            type: "GET",
            contentType: "application/javascript",
            dataType: "jsonp",
            error: ajaxCallFailed,
            failure: ajaxCallFailed,
            success: successFunction
        });          
    };

var client;

function connectToDropbox() {
  client = new Dropbox.Client({
      key: "oRCWbwE5glA=|fmAZwnttubZRYWqrq4tEJjtjC4OuYf1/22v6QkmIQA=="
  });

  client.authDriver(new Dropbox.Drivers.Redirect({
      rememberUser: true
  }));

  client.authenticate(function(error, client) {
    if (error) {
      return showError(error);
    }
  });

  client.getUserInfo(HomeViewModel, function(error, userInfo) {
    if (error) {
      return showError(error);
    }

    HomeViewModel.userName(userInfo.name);
  });

  checkIfUsedBefore(client);
}
  function readdir(path, client) {
    client.readdir('/', function(error, result) {
      if(error) {
        return showError(error);
      }

      return result;
    });
  }

  function mkdir(path, client) {
    client.mkdir(path, function(error, callback){
      if(error) {
        return showError(error);
      }
      console.log(callback)
    })
  }

  function checkIfUsedBefore(client) {
    var valid = true;
    client.readdir('/dropnote', function(error, callback) {
      if(error) {
        if(error.status == Dropbox.ApiError.NOT_FOUND) {
          mkdir('/dropnote/', client);
          mkdir('/dropnote/images', client);
          mkdir('/dropnote/voice', client);
          mkdir('/dropnote/video', client);
          mkdir('/dropnote/text', client);
        }
      }
    });

  }

var showError = function(error) {
  switch (error.status) {
  case Dropbox.ApiError.INVALID_TOKEN:
    // If you're using dropbox.js, the only cause behind this error is that
    // the user token expired.
    // Get the user through the authentication flow again.
    break;

  case Dropbox.ApiError.NOT_FOUND:
    // The file or folder you tried to access is not in the user's Dropbox.
    // Handling this error is specific to your application.
    break;

  case Dropbox.ApiError.OVER_QUOTA:
    // The user is over their Dropbox quota.
    // Tell them their Dropbox is full. Refreshing the page won't help.
    break;

  case Dropbox.ApiError.RATE_LIMITED:
    // Too many API requests. Tell the user to try again later.
    // Long-term, optimize your code to use fewer API calls.
    break;

  case Dropbox.ApiError.NETWORK_ERROR:
    // An error occurred at the XMLHttpRequest layer.
    // Most likely, the user's network connection is down.
    // API calls will not succeed until the user gets back online.
    break;

  case Dropbox.ApiError.INVALID_PARAM:
  case Dropbox.ApiError.OAUTH_ERROR:
  case Dropbox.ApiError.INVALID_METHOD:
  default:
    // Caused by a bug in dropbox.js, in your application, or in Dropbox.
    // Tell the user an error occurred, ask them to refresh the page.
  }
};