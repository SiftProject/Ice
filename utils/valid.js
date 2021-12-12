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


function validateinput(username,email,password,cf_password) {
    
}

