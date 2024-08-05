function isAdmin(req, res, next){
    if(req.user.userRole === "ADMIN_ROLE"){
        next();
    } else {
        res.status(400).send({
            ok: false,
            message: "No puede acceder a estas funciones."
        })
    }
}
module.exports = isAdmin;