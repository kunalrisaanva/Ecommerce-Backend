import { Strategy as GoogleStrategy , StrategyOptions } from 'passport-google-oauth20';
import { User } from '../models/user.models.js';

const configureGoogleStrategy = async(passport:any) => {

const googleStrategyOptions: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:7000/google/callback', //fronted url 
	scope:["email","profile"],
  };

passport.use(
	new GoogleStrategy(
		googleStrategyOptions,
        async function (accessToken:string, refreshToken:string, profile:any, callback:any) {
			console.log('Profile Data')
			console.log(profile)
			callback(null, profile);

			await User.create({
				// add  date into db if it's existed then authenticate 
				
			})
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