exports.isAuthenticated = function(req, res, next) {
    try {
        if(localStorage.getItem("token")== null){
            return next();
        }else{
            return res.redirect('/');
        }
    }catch(error) {
        return next(error);
    }
}

exports.isNotAuthenticated = function(req, res, next) {
    try {
        if(localStorage.getItem("token")!= null){
            return next();
        }else{
            return res.redirect('/signin');
        }
    }catch(error) {
        return next(error);
    }
}