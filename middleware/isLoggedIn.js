module.exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }else{
        console.log("this is running");
        req.session.returnTo= req.originalUrl;
        console.log(req.session.returnTo);
        req.flash("error","You need to login first");
        res.redirect("/login");
    }
}