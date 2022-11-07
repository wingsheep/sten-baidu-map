/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface BaiduMap {
        "ak": string;
        "autoResize": boolean;
        "center": any;
        "continuousZoom": boolean;
        "doubleClickZoom": boolean;
        "dragging": boolean;
        "highResolution": boolean;
        "inertialDragging": boolean;
        "keyboard": boolean;
        "mapClick": boolean;
        "mapStyle": object;
        "mapType": string;
        "maxZoom": number;
        "minZoom": number;
        "pinchToZoom": boolean;
        "scrollWheelZoom": boolean;
        "theme": any[];
        "zoom": number;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
}
declare global {
    interface HTMLBaiduMapElement extends Components.BaiduMap, HTMLStencilElement {
    }
    var HTMLBaiduMapElement: {
        prototype: HTMLBaiduMapElement;
        new (): HTMLBaiduMapElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "baidu-map": HTMLBaiduMapElement;
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface BaiduMap {
        "ak"?: string;
        "autoResize"?: boolean;
        "center"?: any;
        "continuousZoom"?: boolean;
        "doubleClickZoom"?: boolean;
        "dragging"?: boolean;
        "highResolution"?: boolean;
        "inertialDragging"?: boolean;
        "keyboard"?: boolean;
        "mapClick"?: boolean;
        "mapStyle"?: object;
        "mapType"?: string;
        "maxZoom"?: number;
        "minZoom"?: number;
        "pinchToZoom"?: boolean;
        "scrollWheelZoom"?: boolean;
        "theme"?: any[];
        "zoom"?: number;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface IntrinsicElements {
        "baidu-map": BaiduMap;
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "baidu-map": LocalJSX.BaiduMap & JSXBase.HTMLAttributes<HTMLBaiduMapElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}
