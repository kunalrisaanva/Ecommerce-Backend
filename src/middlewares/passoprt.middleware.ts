// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");

// import { Strategy as GoogleStrategy , StrategyOptions } from "passport-google-oauth2"
import { Strategy as GoogleStrategy , StrategyOptions } from 'passport-google-oauth20';

// import passport from "passport";



const configureGoogleStrategy = async(passport:any) => {
 console.log("object");
const googleStrategyOptions: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:7000/google/callback', // Adjust the callback URL as per your application setup
	scope:["email","profile"],
  };
console.log("2");
passport.use(
	new GoogleStrategy(
		googleStrategyOptions,
        async function (accessToken:string, refreshToken:string, profile:any, callback:any) {
			console.log('Profile Data')
			console.log(profile)
			callback(null, profile);
		}
	)
);

passport.serializeUser((user:any, done:any) => {
	done(null, user);
});

passport.deserializeUser((user:any, done:any) => {
	done(null, user);
});
}



export {
	configureGoogleStrategy
}