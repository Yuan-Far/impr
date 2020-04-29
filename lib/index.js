"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("intersection-observer");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
// 视口暴露上下限，做适当延伸
const TOP_SCREEN_VIEWPORT = 800;
const BOTTOM_SCREEN_VIEWPORT = -200;
// 最小曝光时间
const MIN_IMPR_GAP = 300;
const THRESHOLD = 0.8;
class Impr extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.observer = null;
        this.DomNode = null;
        this.timer = null;
        this._provideOptions = () => {
            if (this.DomNode) {
                this.observer && this.observer.unobserve(this.DomNode);
            }
            this.DomNode = react_dom_1.default.findDOMNode(this);
            this.DomNode && this.registeryImprComponent();
        };
        this.registeryImprComponent = () => {
            const { root, rootMargin, threshold } = this.props;
            this.observer = new IntersectionObserver(this.observerCallback, {
                threshold: threshold || THRESHOLD,
                root: root || null,
                rootMargin
            });
            this.DomNode && this.observer.observe(this.DomNode);
        };
        this.observerCallback = (entries) => {
            entries.forEach(entry => {
                this.singleTracking(entry);
            });
        };
        this.singleTracking = (entry) => {
            // const {
            //   onEnter,
            //   onLeave,
            // } = this.props
            this._isItemCross(entry) && this.trackingAction();
        };
        this.trackingAction = () => {
            // 300ms最小驻留时间
            this.timer && clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                const top = this.DomNode && this.DomNode.getBoundingClientRect().top;
                if ((top || top === 0) && !(top < BOTTOM_SCREEN_VIEWPORT || top > TOP_SCREEN_VIEWPORT)) {
                    const { logger, trackingInfo } = this.props;
                    const imprTracking = { operation: 'view', ...trackingInfo };
                    logger && logger(imprTracking, () => {
                        this.observer && this.DomNode && this.observer.unobserve(this.DomNode);
                    });
                }
            }, MIN_IMPR_GAP);
        };
        this._isItemCross = (entry) => {
            // 判断是否超过打点阈值
            // const {
            //   threshold,
            // } = this.props
            return entry.isIntersecting && entry.intersectionRatio >= THRESHOLD;
        };
    }
    componentDidMount() {
        this._provideOptions();
    }
    componentWillUnmount() {
        this.timer = null;
        this.observer && this.DomNode && this.observer.unobserve(this.DomNode);
    }
    render() {
        const { children } = this.props;
        return react_1.default.cloneElement(children, { ref: this._provideOptions });
    }
}
exports.default = Impr;
Impr.defaultProps = {
    rootMargin: '0px',
    threshold: THRESHOLD
    // onEnter: () => {},
    // onLeave: () => {}
};
