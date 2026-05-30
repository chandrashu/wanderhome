require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError");
const { MAX_IMAGE_SIZE_MB } = require("./utils/cloudinary");

const session = require("express-session");     
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");          

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

const listings = require("./routes/listing");
const reviews = require("./routes/review");
const userRoutes = require("./routes/user");   
const bookingRoutes = require("./routes/booking");



const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderhome";
const PORT = process.env.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET || "wanderhome-secret";
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && SESSION_SECRET === "wanderhome-secret") {
        throw new Error("SESSION_SECRET must be set to a strong value in production.");
}

main()
.then(() => {
        console.log("connected to DB");
})
.catch((err) => {
        console.error("DB connection error:", err.message);
});

async function main() {
      await mongoose.connect(MONGO_URL)  
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

if (isProduction) {
        app.set("trust proxy", 1);
}

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.get("/healthz", (req, res) => {
  res.status(200).send("ok");
});

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    collectionName: "sessions",
  }),
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// make user & flash available in all views
app.use((req, res, next) => {

  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  // CATEGORY ACTIVE
  res.locals.currentCategory = req.query.category || "";

  // CURRENT PAGE PATH
  res.locals.currentPath = req.path;

  next();
});

app.use("/", userRoutes);
app.use("/", bookingRoutes);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.use( (req, res, next) => {
     next(new ExpressError(404, "Page Not Found!"));   
});

app.use((err, req, res, next) => {
        if (err.name === "MulterError") {
                err.statusCode = 400;
                if (err.code === "LIMIT_FILE_SIZE") {
                        err.message = `Image must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`;
                } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
                        err.message = "Upload up to 3 images for this field.";
                }
        }

        let {statusCode = 500, message = "Something went wrong!"} = err;
        res.status(statusCode).render("error.ejs", {message})
        // res.status(statusCode).send(message);
});

app.listen(PORT, "0.0.0.0", () => {
        console.log(`server is listening to port ${PORT}`);
});
