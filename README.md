# bard-client
JavaScript library for shared client-side analytics across DSP

# Overview

This library is designed to be imported by custom analytics code in Data
Sciences Platform (DSP) web UIs like Terra and Single Cell Portal.  It supplies
them with properties common across DSP, like "referrer", "browser",
"screen width", and more.

Those custom analytics modules post to
[Bard server](https://github.com/DataBiosphere/bard), which posts to Mixpanel.

# Installation

Install Bard client [from NPM](https://www.npmjs.com/package/@databiosphere/bard-client) like so:

```
yarn add @databiosphere/bard-client
```

# Usage

Below is a simplified custom analytics module.

With two extra lines for Bard client code, we can augment those custom
analytics with default properties shared across all DSP.

```
import { getDefaultProperties } from '@databiosphere/bard-client' // Extra line 1

function logToBard(name, customProps={}) {
  const appPath = trimPrivateData(window.location.pathname)

  props = Object.assign(customProps, {
    appId: 'awesome-dsp-web-ui',
    appPath
  }, getDefaultProperties()) // Extra line 2

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

  init = Object.assign(defaultInit, body)

  fetch(`${bardDomain}/api/event`, init)

```

