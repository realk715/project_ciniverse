import user from '../model/user'

module.exports = (req:any,res:any,next) => {
    user.findById(req.session.UserId).
    then( (user) => {
        if(user){
            console.log('user login successfully')
            next()
        }else{
            res.redirect('/')
        }
    }).catch(error => {
        console.error(error)
    })
}