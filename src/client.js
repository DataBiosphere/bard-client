/**
* @fileoverview Bard client library for shared DSP client-side analytics
*/

import {_} from './utils'
import Config from './config'

/**
 * Truncates "referrer" in cases required by DSP
 *
 * If navigating from e.g.:
 *
 *   - A Terra workspace to another Terra page, or
 *   - An SCP study to another SCP page
 *
 * The "referrer" includes workspace name or study name.  DSP considers
 * these private data not suitable to log in Mixpanel.  So here we truncate
 * referrer if the referring domain is for a DSP product.

 * Full referrer is still useful for external domains (and can be truncated
 * or omitted by them as they desire), so we retain it for those cases.
 *
 * @param {Object} defaultProps - Default DSP properties for Mixpanel
 * @param {Array} dspRoots - Domain patterns for which referrer should be
 *  truncated.  Useful if current DSP domain is absent from config.js.
 */
function filterReferrer(defaultProps, dspRoots=[]) {
  let hasDspReferrer = false;

  const referringDomain = defaultProps['referring_domain'];

  if (typeof referringDomain === 'undefined') return defaultProps;

  // Test whether referring domain matches DSP domain patterns
  dspRoots = dspRoots.concat(Config.DSP_WEB_UI_ROOTS)
  dspRoots.forEach(root => {
    const rootRE = new RegExp(root);
    const match = referringDomain.match(rootRE);
    if (match) hasDspReferrer = true;
  });

  if (hasDspReferrer) {
    defaultProps['referrer'] = new URL(defaultProps['referrer']).hostname
  }
  return defaultProps
}

/**
 * @param {Array} dspRoots - Domains to filter referrer from.  Useful if
 *                           current DSP domain is absent from config.js.
 *
 * @return {Object} Default DSP properties for Mixpanel
 */
function getDefaultProperties(dspRoots=[]) {
  return filterReferrer(_.info.properties(), dspRoots)
}

export {getDefaultProperties}
