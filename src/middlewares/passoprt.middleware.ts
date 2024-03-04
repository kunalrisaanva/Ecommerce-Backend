import { Strategy as GoogleStrategy , StrategyOptions } from 'passport-google-oauth20';
import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from "bcrypt"


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
			console.log(profile._json)
			
			const randomPassword = Math.random().toString(36).slice(-8); // Generate a random password
            const hashedPassword = await bcrypt.hash(randomPassword, 10); // Hash the password
		    let user =  await User.findOne({email:profile._json.email});

			if(!user){
				user = await User.create({
					email:profile?._json.email || "",
					username:profile?._json.given_name,
					userImage:profile._json.picture,
					refreshToken:refreshToken,
					password:hashedPassword
				});
			}

			callback(null,user)

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