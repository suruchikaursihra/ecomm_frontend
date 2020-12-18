/**
 * @author suruchi kaur sihra
 * @description  This method checks to see if the user is authenticated or not
 * @return {Boolean} status validity of form
 */
export const isAuthenticated = () => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
        return true;
    } else {
        return false;
    }
};