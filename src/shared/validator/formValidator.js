/**
 * @author Suruchi Kaur Sihra
 * @file Form Validator
 * @flow
 */
import React from "react";
import Typography from '@material-ui/core/Typography';

/**
 * @description  This method checks to see if the validity of all validators are true
 * @param {array} validators array containing validation data
 * @return {Boolean} status validity of form
 */
const isFormValid = validators => {
    let status = true;
    Object.keys(validators).forEach(field => {
        if (!validators[field].valid) {
            status = false;
        }
    });
    return status;
};

/**
 * @description  This function resets all validators for this form to the default state
 * @param {array} validators array containing validation data
 * @return {null} doesnot return anything
 */
const resetValidators = validators => {
    Object.keys(validators).forEach(fieldName => {
        validators[fieldName].errors = [];
        validators[fieldName].state = "";
        validators[fieldName].valid = false;
    });
};

/**
 * @description This function updates the state of the validator
 * for the specified validator
 * @param {string} fieldName input name for which validator is to be updated
 * @param {string} value changed value for fieldName
 * @param {array} validators array containing validation data
 * @param {array} language language contain current selected language
 * @return {null} call the reducer
 */
const updateValidators = (fieldName, value, validators) => {
    validators[fieldName].errors = [];
    validators[fieldName].state = value;
    validators[fieldName].valid = true;
    validators[fieldName].rules.forEach(rule => {
        if (rule.test instanceof RegExp) {
            if (!rule.test.test(value)) {
                validators[fieldName].errors.push(rule.message);
                validators[fieldName].valid = false;
            }
        } else if (typeof rule.test === "function") {
            if (!rule.test(value)) {
                validators[fieldName].errors.push(rule.message);
                validators[fieldName].valid = false;
            }
        }
    });
};

/**
 * @description  This function displays the validation errors for a given input field
 * @param {string} fieldName input name for which validator is to be updated
 * @param {array} validators validators array containing validation data
 * @return {string} result html element showing errors
 */
const displayValidationErrors = (fieldName, validators) => {
    const validator = validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
        const errors = <Typography component="span" color={"error"} variant="subtitle1">{validator.errors[0] === undefined ? validator.errors[0] : validator.errors[0]}</Typography>;
        return <Typography>{errors}</Typography>;
    }
    return result;
};


export {
    isFormValid,
    resetValidators,
    updateValidators,
    displayValidationErrors
};
