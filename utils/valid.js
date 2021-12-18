export const validsignup = (username, email, password, cf_password) => {
    if(!username || !email || !password)
    return 'Please add all fields.'

    if(!validateUsername(username))
    return 'Invalid username'

    if(!validateEmail(email))
    return 'Invalid emails.'
    

    if(password.length < 8)
    return 'Password must be at least 8 characters.'

    if(password !== cf_password)
    return 'Confirm password did not match.'

if(!validatePassword(password))
return 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character'

}

export const validlogin = (username, password) => {
    if(!username || !password)
    return 'Please add all fields.'

    if(!validateUsername(username))
    return 'Invalid username'
}





function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUsername(username) {
    const re2 = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    return re2.test(username)
}

function validatePassword(password) {
    const re3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return re3.test(password)
}

function validateinput(username,email,password,cf_password) {

}

