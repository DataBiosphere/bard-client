/**
* @fileoverview Mixpanel source code, modified for DSP requirements
*
* Derived from code in https://github.com/mixpanel/mixpanel-js
*/

var Config = {
  DEBUG: false,
  LIB_VERSION: '0.0.1',
  DSP_WEB_UI_ROOTS: [
    // Fully-qualified domain names for production DSP web UIs
    'terra.bio',
    'singlecell.broadinstitute.org'
  ]
};

export default Config;
