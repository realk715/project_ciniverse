module.exports = (req:any,res:any,next) => {
    if(req.session.userId){
        return res.redirect('/login')
    }
    next()
}