// Load native UI library.
var gui = require('nw.gui');
var request = require('request');
var fs = require('fs');

var tray = new gui.Tray({icon: 'icon.png' });
var win = gui.Window.get();
win.hide();
// Give it a menu
var menu = new gui.Menu();
menu.append(new gui.MenuItem({ label: 'Preferences' }));
tray.menu = menu;

var option = {
  key : "Ctrl+Shift+A",
  active : function() {

var child_process = require('child_process');

    // exec: spawns a shell.
    child_process.exec('bin/boxcutter testa.jpg', function(error, stdout, stderr){
        upload('testa.jpg');
    });
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

// Create a shortcut with |option|.
var shortcut = new gui.Shortcut(option);

// Register global desktop shortcut, which can work without focus.
gui.App.registerGlobalHotKey(shortcut);

var option2 = {
  key : "Ctrl+Shift+X",
  active : function() {
var child_process = require('child_process');

    // exec: spawns a shell.
    child_process.exec('bin/boxcutter testa.png', function(error, stdout, stderr){
        upload('testa.png');
    });
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

// Create a shortcut with |option|.
var shortcut2 = new gui.Shortcut(option2);

// Register global desktop shortcut, which can work without focus.
gui.App.registerGlobalHotKey(shortcut2);

// If register |shortcut| successfully and user struck "Ctrl+Shift+A", |shortcut|
// will get an "active" event.

// You can also add listener to shortcut's active and failed event.

function upload(name) {
    var request = require('request');
    var formData = {
      filedata: fs.createReadStream('./' + name),
    };
    request.post({url:'http://fileupo.herokuapp.com/files', formData: formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      body = JSON.parse(body)
      var clipboard = gui.Clipboard.get();

      clipboard.set(body.url);
      var options = {
  icon: "http://yourimage.jpg",
  body: body.url
 };

var notification = new Notification("Image Uploaded",options);
notification.onclick = function () {
  document.getElementById("output").innerHTML += "Notification clicked";
}
      fs.unlink('./' + name, function (err) {
        if (err) throw err;
      });
    });

}
