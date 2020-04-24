# IMPR

**曝光上报组件**

## 介绍

### 1. 默认支持单次曝光（不允许多次重复上报）

### 2. 支持不同上报方式

``` javascript
const send = () => {
  fetch(url, {})
}
const bridge = () => {
  window.createHandler.wrapper()
}
logger={bridge || send}
```

### 3. 支持嵌套元素上报

``` javascript
  return <Impr>
    <div>
      <Impr>
        {children}
      </Impr>
    </div>
  </Impr>
```

## 使用方式

``` javascript
import Impr from './Impr'

return <Impr logger={logger} trackingInfo={trackingInfo}>
  {children}
</Impr>
```

## 参数

``` json
{
  "logger": "上报方式",
  "trackingInfo": "上报数据",
  "threshold": "曝光阈值"
}
```

:warning: **上报方式须知**:

> 1. 如果只允许元素在单次pv场景中曝光一次， 上报方法必须支持callback（用于清除当前的`observer`）

待办：
-[ ]: 可以增加离开或者进入的时候触发的回调
