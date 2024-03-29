import {Router} from "express"
import passport from "passport"

import { Request, Response} from "express";

const router = Router();

router.get("/login/success", async(req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});




router.get("/login/failed", async(req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});




router.get("/google", passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
}));




router.get("/google/callback", passport.authenticate("google", {
	successRedirect: process.env.CLIENT_URL,
	failureRedirect: "/login/failed",
  }));




router.get("/logout", (req, res ,next) => {

    req.logout(err => {
		console.log(err);
		if(err) return res.redirect("/login")
	})
	res.redirect("/Home");
})


export default router