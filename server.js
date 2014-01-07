var net  = require("net"),
    fs   = require("fs"),
    path = require("path");

var cmds = {};

cmds.help = function(socket, args) {
  socket.write("exit - closes the connection\nls - list files\nmore FILE - show FILE\n\nHave fun :)");
};

cmds.ls = function(socket, args) {
  socket.write(fs.readdirSync("content").join("\t"));
}

cmds.exit = function(socket, args) {
  socket.write("Good bye :)\n");
  socket.destroy();
};

cmds.more = function(socket, args) {
  try {
    socket.write(fs.readFileSync("content/" + path.basename(args[1])));
  } catch(e) {
    socket.write("I'm sorry dave, I'm afraid I can't do that...");
  }
};

console.log("Gonna listen on ", process.env.PORT || 2342)

net.createServer(function(client) {
  client.write("Welcome to \x1b[32;49;1mGeekonaut.de\x1b[39;49;0m!\nLogging in... \x1b[32;49msuccess\x1b[39;49m\nType \"help\" to get started.\n$ ");

  client.on("data", function(data) {
    var args = data.toString("utf8").replace(/^\s+|\s+$/g, "").split(" ");
    console.log(args, args.length);
    if(args.length < 2) args = [args];

    if(cmds[args[0]]) cmds[args[0]](client, args);
    if(client.writable) client.write("\n$ ");
  });
}).listen(process.env.PORT || 2342);