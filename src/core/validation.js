class ValidationResult {
    _errors = {};
    valid(){
        return Object.keys(this._errors).length == 0;
    }
    
    appendError(key, value){
        this._errors[key] = value;
    }

    errors(){
        return this._errors;
    }

    removeError(key){
        delete this._errors[key];
    }
}

class Validation{
    static regexes = {
        email: /^(?=.{5,100}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
        firstname : /^[A-Z][a-z]{1,14}(\s[A-Z][a-z]{1,14}){0,1}$/,
        lastname: /^[A-Z][a-z]{1,14}(\s[A-Z][a-z]{1,14}){0,1}$/,
        role: /^[A-Z][a-z]{2,19}$/,
    };

    static errorMessages = {
        email: "At least 5 and maximum 100 characters. It has to contain @ character",
        password: "At least one letter and number. Minimum length is 8 and maximum is 16.",
        firstname : "No numbers, no special characters, first letter is capitalized." ,
        lastname : "No numbers, no special characters, first letter is capitalized." ,
        username : "At least 3 characters and maximum is 20." ,
        role : "At least 2 characters and maximum is 19." ,
        country : "Country is required.",
        city : "City is required.",
    };
    
    static result = new ValidationResult();

    static validFirstname(val){
        if(val.match(Validation.regexes.firstname)) {
            return true;
        }
        Validation.result.appendError("firstname", Validation.errorMessages.firstname);
        return false;
    }

    static reset(){
        Validation.result = new ValidationResult();
    }
    static validLastname(val){
        
        if(val.match(Validation.regexes.lastname)) {
            return true;
        }
        Validation.result.appendError("lastname", Validation.errorMessages.lastname);
        return false;
    }

    static validEmail(val){
        
        if(val.match(Validation.regexes.email)) {
            return true;
        }
        Validation.result.appendError("email", Validation.errorMessages.email);
        return false;
    }

    static validPassword(val){
        
        if(val.match(Validation.regexes.password)) {
            return true;
        }
        Validation.result.appendError("password", Validation.errorMessages.password);
        return false;
    }

    static validPasswordAgain(val){
        
        if(val.match(Validation.regexes.password)) {
            return true;
        }
        Validation.result.appendError("passwordAgain", Validation.errorMessages.password);
        return false;
    }

    static validCountry(val){
        if(val > 0) {
            return true;
        }
        Validation.result.appendError("country", Validation.errorMessages.country);
        return false;
    }

    static validCity(val){
        if(val > 0) {
            return true;
        }
        Validation.result.appendError("city", Validation.errorMessages.city);
        return false;
    }
}


export default Validation;
