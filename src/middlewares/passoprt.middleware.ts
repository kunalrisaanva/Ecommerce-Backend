// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');




// // Passport Local Strategy for username/password authentication
// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         // Find user by username
//         const user = users.find(user => user.username === username);
//         if (!user) {
//             return done(null, false, { message: 'Incorrect username.' });
//         }
//         // Validate password
//         if (user.password !== password) {
//             return done(null, false, { message: 'Incorrect password.' });
//         }
//         // Authentication succeeded
//         return done(null, user);
//     }
// ));


// // Serialize user to store in session
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// // Deserialize user from session
// passport.deserializeUser(function (id, done) {
//     const user = users.find(user => user.id === id);
//     done(null, user);
// });


// // Middleware to check if user is authenticated
// function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// }



// export { isAuthenticated }