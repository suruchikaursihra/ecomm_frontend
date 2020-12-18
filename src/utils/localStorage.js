const STATE_STORAGE_KEY = "state";

/**
 * @description copy state stored in local storage to redux store
 * @return {object} stored state
 */
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(STATE_STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

/**
 * @description persists redux store state in local storage
 * @param {object} state current state
 * @return {null} returns null
 */
export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STATE_STORAGE_KEY, serializedState);
    } catch (error) {
        // Ignore error prevents app from crashing
    }
};

/**
 * @description clear local storage state
 * @return {null} returns null
 */
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        // Ignore error prevents app from crashing
    }
};
