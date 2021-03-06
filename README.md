# bard-client
JavaScript library for shared client-side analytics across DSP

# Overview

This library is designed to be imported by custom analytics code in Data
Sciences Platform (DSP) web UIs like Terra and Single Cell Portal.  It supplies
them with properties common across DSP, like "referrer", "browser",
"screen width", and more.

Those custom analytics modules post to
[Bard server](https://github.com/DataBiosphere/bard), which posts to Mixpanel.

Eventually, this library may be expanded to also include both a utility `logToBard`
function, and or default instrumentation of events, but for now its focus is on
standardizing a set of event properties.

# Installation

Install Bard client [from NPM](https://www.npmjs.com/package/@databiosphere/bard-client) like so:

```
yarn add @databiosphere/bard-client
```

# Usage

Below is a simplified custom analytics module.

By adding two lines for Bard client code--an import and a call to getDefaultProperties-- we can augment those custom
analytics with default properties shared across all DSP.

```
import { getDefaultProperties } from '@databiosphere/bard-client' // Import the function from Bard client

function logToBard(name, customProps={}) {
  const appPath = trimPrivateData(window.location.pathname)

  const props = Object.assign(customProps, {
    appId: 'awesome-dsp-web-ui',
    appPath
  }, getDefaultProperties()) // Append the default properties to the payload sent to Bard

  const body = {
    body: JSON.stringify({
      event: name,
      properties: props
    })
  }

  const defaultInit = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  }

  const init = Object.assign(defaultInit, body)

  fetch(`${bardDomain}/api/event`, init)

```
