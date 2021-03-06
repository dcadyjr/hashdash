require('dotenv').config();

var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	session = require("express-session"),
	path = require("path");

var port_number = server.listen(process.env.PORT || 3000);

require("./db/db");

app.use(session({
	secret: "hashdashhh",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false}
}));

var UserController = require("./controllers/UserController");
var HashtagController = require("./controllers/HashtagController");
app.use("/users", UserController);
app.use("/hashtags", HashtagController);


app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", function(req, res) {
	var renderObject = {
		session: req.session
	};
	if (req.session.loggedIn === true) {
		res.redirect("/users/" + req.session.myId);
	} else {
		res.render("homepage", renderObject);
	}
});

server.listen(port_number, function(){
	console.log("Listening on" + port_number)
});