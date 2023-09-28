import * as React from 'react';
import * as ReactDOM from 'react-dom';
// eslint-disable-next-line
// @ts-ignore
import { default as retargetEvents} from 'react-shadow-dom-retarget-events';
import CollapsibleReact from "./widget";

export default class ReviewSystem extends HTMLElement {
    static get observedAttributes() {
        return ['title'];
    }

    mountPoint!: HTMLSpanElement;
    title!: string;

    createCollapsed() {
        return React.createElement(CollapsibleReact, {}, React.createElement('slot'));
    }

    connectedCallback() {
        this.mountPoint = document.createElement('span');
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(this.mountPoint);

        const title = this.getAttribute('title');

        // eslint-disable-next-line
        ReactDOM.render(this.createCollapsed(), this.mountPoint);
        retargetEvents(shadowRoot);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'title') {
            // eslint-disable-next-line
            ReactDOM.render(this.createCollapsed(), this.mountPoint);
        }
    }
}

console.log('Custom element <review-system> added');
window.customElements.define('review-system', ReviewSystem);
