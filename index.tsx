import 'intersection-observer'
import React from 'react'
import ReactDOM from 'react-dom'

interface IntersectionObserverProps extends IntersectionObserverInit {
  children: React.ReactChildren | React.ReactNode | any
  imprOnce?: boolean
  trackingInfo?: object // 上报信息
  logger?: (opts: any, callback?: any) => void // 上报方式
  onEnter?: (entry: IntersectionObserverEntry) => void
  onLeave?: (entry: IntersectionObserverEntry) => void
}

declare const IntersectionObserver: {
  prototype: IntersectionObserver
  new (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver
}
// 视口暴露上下限，做适当延伸
const TOP_SCREEN_VIEWPORT = 800
const BOTTOM_SCREEN_VIEWPORT = -200
// 最小曝光时间
const MIN_IMPR_GAP = 300
const THRESHOLD = 0.8

export default class Impr extends React.Component<IntersectionObserverProps> {
  public static defaultProps = {
    rootMargin: '0px',
    threshold: THRESHOLD
    // onEnter: () => {},
    // onLeave: () => {}
  }

  private observer: IntersectionObserver | null = null
  private DomNode: Element | any | null = null
  private timer: number | null = null

  public _provideOptions = () => {
    if (this.DomNode) {
      this.observer && this.observer.unobserve(this.DomNode)
    }
    this.DomNode = ReactDOM.findDOMNode(this)
    this.DomNode && this.registeryImprComponent()
  }

  public componentDidMount() {
    this._provideOptions()
  }

  public registeryImprComponent = () => {
    const { root, rootMargin, threshold } = this.props

    this.observer = new IntersectionObserver(this.observerCallback, {
      threshold: threshold || THRESHOLD,
      root: root || null,
      rootMargin
    })
    this.DomNode && this.observer.observe(this.DomNode)
  }

  public observerCallback = (entries: { forEach: (arg0: (entry: any) => void) => void }) => {
    entries.forEach(entry => {
      this.singleTracking(entry)
    })
  }

  public singleTracking = (entry: { isIntersecting: any; intersectionRatio: number }) => {
    // const {
    //   onEnter,
    //   onLeave,
    // } = this.props
    this._isItemCross(entry) && this.trackingAction()
  }

  public trackingAction = () => {
    // 300ms最小驻留时间
    this.timer && clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      const top = this.DomNode && this.DomNode.getBoundingClientRect().top
      if ((top || top === 0) && !(top < BOTTOM_SCREEN_VIEWPORT || top > TOP_SCREEN_VIEWPORT)) {
        const { logger, trackingInfo } = this.props
        const imprTracking = { operation: 'view', ...trackingInfo }
        logger && logger(imprTracking, () => {
          this.observer && this.DomNode && this.observer.unobserve(this.DomNode)
        })
      }
    }, MIN_IMPR_GAP)
  }

  public _isItemCross = (entry: { isIntersecting: any; intersectionRatio: number }) => {
    // 判断是否超过打点阈值
    // const {
    //   threshold,
    // } = this.props
    return entry.isIntersecting && entry.intersectionRatio >= THRESHOLD
  }

  public componentWillUnmount() {
    this.timer = null
    this.observer && this.DomNode && this.observer.unobserve(this.DomNode)
  }

  public render() {
    const { children } = this.props
    return React.cloneElement(children, { ref: this._provideOptions })
  }
}
