import 'intersection-observer';
import React from 'react';
interface IntersectionObserverProps extends IntersectionObserverInit {
    children: React.ReactChildren | React.ReactNode | any;
    imprOnce?: boolean;
    trackingInfo?: object;
    logger?: (opts: any, callback?: any) => void;
    onEnter?: (entry: IntersectionObserverEntry) => void;
    onLeave?: (entry: IntersectionObserverEntry) => void;
}
export default class Impr extends React.Component<IntersectionObserverProps> {
    static defaultProps: {
        rootMargin: string;
        threshold: number;
    };
    private observer;
    private DomNode;
    private timer;
    _provideOptions: () => void;
    componentDidMount(): void;
    registeryImprComponent: () => void;
    observerCallback: (entries: {
        forEach: (arg0: (entry: any) => void) => void;
    }) => void;
    singleTracking: (entry: {
        isIntersecting: any;
        intersectionRatio: number;
    }) => void;
    trackingAction: () => void;
    _isItemCross: (entry: {
        isIntersecting: any;
        intersectionRatio: number;
    }) => boolean;
    componentWillUnmount(): void;
    render(): React.FunctionComponentElement<{
        ref: () => void;
    }>;
}
export {};
