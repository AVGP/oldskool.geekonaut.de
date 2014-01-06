var net = require("net");

var cmds = {};

cmds.exit = function(socket, args) {
  socket.write("Good bye :)\n");
  socket.destroy();
};

net.createServer(function(client) {
  client.write("Welcome to \x1b[32;40;1mGeekonaut.de\x1b[39;49;0m!\nLogging in... \x1b[32;40msuccess\x1b[39;49m\nType \"help\" to get started.\n$ ");

  client.on("data", function(data) {
    var args = data.toString("utf8").replace(/^\s+|\s+$/g, "").split(" ");
    console.log(args, args.length);
    if(args.length < 2) args = [args];

    if(cmds[args[0]]) cmds[args[0]](client, args);
    if(client.writable) client.write("\n$ ");
  });
}).listen(2342);
