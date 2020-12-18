/**
 * @author Suruchi Kaur Sihra
 * @file Form Validaton Rules
 * @flow
 */
import * as Messages from '../constants/messages';

/**
 * @description  Rules for login Form
 */
export const LoginValidation = {
    email: {
        rules: [{
            test: value => {
                return value.trim();
            },
            message: Messages.VALIDATION.EMAIL_ERRORS.blankFieldError
        },
        {
            test: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: Messages.VALIDATION.EMAIL_ERRORS.nameFieldError
        },
        ],
        errors: [],
        valid: false,
        state: ""
    },
    password: {
        rules: [
            {
                test: value => {
                    return value.trim();
                },
                message: Messages.VALIDATION.PASSWORD_ERRORS.blankFieldError
            },
            {
                test: value => {
                    return value.length > 6;
                },
                message: Messages.VALIDATION.PASSWORD_ERRORS.maxLengthError
            }],
        errors: [],
        valid: false,
        state: ""
    }
};