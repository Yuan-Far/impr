# IMPR

## Introduction

### 1. Your components only report once

### 2. You can use other report function

``` javascript
const send = () => {
  fetch(url, {})
}

logger={send || other}
```

### 3

``` javascript
  return <Impr>
    <div>
      <Impr>
        {children}
      </Impr>
    </div>
  </Impr>
```

## how to use

``` javascript
import Impr from './Impr'

return <Impr logger={logger} trackingInfo={trackingInfo}>
  {children}
</Impr>
```

## params

``` json
{
  "logger"--->"how to report",
  "trackingInfo"-->"data",
  "threshold"-->"like this name"
}
```

:warning: **know**:

> You must be set `callback`(clear `Observer`)
