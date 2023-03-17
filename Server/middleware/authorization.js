module.exports.isTpr = (req, res, next) => {
    if(req.user.designation == "tpr" || req.user.designation == "admin") {
        return next();
    }
    throw new Error("Not Authorised.");
}

module.exports.isProf = (req, res, next) => {
    if(req.user.designation == "professor" || req.user.designation == "admin") {
        return next();
    }
    throw new Error("Not Authorised.");
}

module.exports.isRecruiter = (req, res, next) => {
    if(req.user.designation == "comp_representative" || req.user.designation == "admin") {
        return next();
    }
    throw new Error("Not Authorised.");
}

module.exports.isAdmin = (req, res, next) => {
    if(req.user.designation == "admin") {
        return next();
    }
    throw new Error("Not Authorised.");
}