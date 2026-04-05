const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Access Denied: Role not found" });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied: You don't have enough permissions" });
        }
        
        next();
    };
};

module.exports = authorizeRoles;
