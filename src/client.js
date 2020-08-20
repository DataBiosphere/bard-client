import {_} from './utils'
import Config from './config'

/**
 * Removes full "referrer" in cases required by DSP
 *
 * If navigating from e.g.:
 *
 *   - A Terra workspace to another Terra page, or
 *   - An SCP study to another SCP page
 *
 * The "referrer" includes workspace name or study name.  DSP considers
 * these private data not suitable to log in Mixpanel.  So here we strip
 * referrer if the referring domain is for a DSP product.

 * Full referrer is still useful for external domains (and can be truncated
 * or omitted by them as they desire), so we retain it for those cases.
 *
 * @param {Object} defaultProps
 */
function filterReferrer(defaultProps) {
  const referringDomain = defaultProps['referring_domain'];
  if (Config.DSP_PORTALS.includes(referringDomain)) {
    delete defaultProps['referrer']
  }
  return defaultProps
}

/**
 * Gets properties shared across DSP that are suitable to log in Mixpanel
 */
function getDefaultProperties() {
  return filterReferrer(_.info.properties())
}

export {getDefaultProperties}
