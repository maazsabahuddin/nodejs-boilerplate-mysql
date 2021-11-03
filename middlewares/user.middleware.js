

exports.hasRequiredFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.name)
            errors.push('Missing name field');
        
        if (!req.body.email_address) 
            errors.push('Missing email field');
        
        if (!req.body.phonenumber) 
            errors.push('Missing phonenumber field');
        
        if (!req.body.password)
            errors.push('Missing password field');
        
        if (errors.length)
            return res.status(400).send({errors: errors.join(',')});
        else 
            return next();
        
    } else 
        return res.status(400).send({errors: 'Missing body'});
}

exports.hasLoginRequiredFields = (req, res, next, _list) => {
    let errors = [];
    if (req.body) {
        if (!req.body.email_address) 
            errors.push('Missing email field');
        if (!req.body.password)
            errors.push('Missing password field');
        
        if (errors.length)
            return res.status(400).send({errors: errors.join(',')});
        else 
            return next();
        
    } else 
        return res.status(400).send({errors: 'Missing body'});
}