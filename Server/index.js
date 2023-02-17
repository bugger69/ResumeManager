if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoDBStore = require("connect-mongo");
const swaggerUi = require("swagger-ui-express");

const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
const specs = require("./config/swaggerJson");

const User = require("./models/user");
const bodyParser = require("body-parser");

//setting up express
const app = express();
const port = process.env.PORT || 4000;

const db_url = process.env.DB_URL || "mongodb://localhost:27017/ResumeManager";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Mongo connection open");
}

const secret = process.env.SECRET_KEY || "fuckOffIdiots";

const store = new MongoDBStore({
  mongoUrl: db_url,
  secret: secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("Session Store Error.", e);
});

const sessionConfig = {
  store,
  name: process.env.SESSION_NAME || "shutTheFuckUp",
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

const whitelist = ["http://localhost:3000", "chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld"];
const corsOptions = {
  credentials: true, // This is important.
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, api_key, Authorization"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api-docs", swaggerUi.setup(null, {
  swaggerOptions: {
      requestInterceptor: function(request){
          request.headers.Origin = `http://localhost:4000`;
          return request;
      },
      url: `http://localhost:4000/docs/api-doc`
  }
}))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api", userRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
