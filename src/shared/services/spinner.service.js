/**
 * @author SURUCHI KAUR SIHRA
 * @description config url afor backend apis
 * @file Spinner Service
 * @flow
 */

export class SpinnerService {

    constructor() {
      this.spinnerCache = new Set();
    }
  
    // Register the spinner
    _register(spinner) {
      this.spinnerCache.add(spinner);
    }
  
    // Removes the registered spinner
    _unregister(spinnerToRemove) {
      this.spinnerCache.forEach(spinner => {
        if (spinner === spinnerToRemove) {
          this.spinnerCache.delete(spinner);
        }
      });
    }
  
    // Removes the entire group of registered spinners
    _unregisterGroup(spinnerGroup) {
      this.spinnerCache.forEach(spinner => {
        if (spinner.group === spinnerGroup) {
          this.spinnerCache.delete(spinner);
        }
      });
    }
  
    // Removes all the registered spinners
    _unregisterAll() {
      this.spinnerCache.clear();
    }
  
    // Shows spinner with the spinner info message
    show(spinnerName, msg='') {
      this.spinnerCache.forEach(spinner => {
        if (spinner.name === spinnerName) {
          spinner.show = true;
          spinner.msg = msg
        }
      });
    }
  
    // Hides the spinner
    hide(spinnerName) {
      this.spinnerCache.forEach(spinner => {
        if (spinner.name === spinnerName) {
          spinner.show = false;
        }
      });
    }
  
    // Shows group of spinners
    showGroup(spinnerGroup) {
      this.spinnerCache.forEach(spinner => {
        if (spinner.group === spinnerGroup) {
          spinner.show = true;
        }
      });
    }
  
    // Hides group of spinners
    hideGroup(spinnerGroup) {
      this.spinnerCache.forEach(spinner => {
        if (spinner.group === spinnerGroup) {
          spinner.show = false;
        }
      });
    }
  
    // Shows all available spinners.
    showAll() {
      this.spinnerCache.forEach(spinner => spinner.show = true);
    }
  
    // Hides all the spinners.
    hideAll() {
      this.spinnerCache.forEach(spinner => spinner.show = false);
    }
  
    // Checks if spinner is still on showing or not.
    isShowing(spinnerName) {
      let showing;
      this.spinnerCache.forEach(spinner => {
        if (spinner.name === spinnerName) {
          showing = spinner.show;
        }
      });
      return showing;
    }
  }
  
  const spinnerService = new SpinnerService();
  export { spinnerService }
