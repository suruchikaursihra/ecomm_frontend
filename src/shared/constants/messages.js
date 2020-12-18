/**
 * @author SURUCHI KAUR SIHRA
 * @return {Objects} common validation messages 
 */

module.exports = {
    VALIDATION: {
        VALUE_ERROR: {
            blankFieldError: "Please enter value",
            numberFieldError: "Please enter a valid number"
        },
        EMAIL_ERRORS: {
            blankFieldError: "Please enter Email",
            nameFieldError: "Please enter correct Email Id."
        },
        PASSWORD_ERRORS: {
            maxLengthError: "Password must not be less than 6 characters",
            confirmPasswordError: "Password does not match",
            blankFieldError: "Please enter password",
        },
    }
}