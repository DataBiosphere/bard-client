/**
* @fileoverview Mixpanel source code, modified for DSP requirements
*
* Derived from code in https://github.com/mixpanel/mixpanel-js
*/

var Config = {
  DEBUG: false,
  LIB_VERSION: '0.0.3', // Ensure this matches package.json
  DSP_WEB_UI_ROOTS: [  // Domain name patterns for DSP web UIs
    // Matches app.terra.bio, etc.
    /terra\.bio/,

    // Matches singlecell.broadinstitute.org,
    // singlecell-staging.broadinstitute.org, etc.
    /singlecell.*\.broadinstitute\.org/,

    // Accounts for local development for at least SCP
    /localhost/
  ]
};

export default Config;
