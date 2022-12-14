import {capitalize} from './utils';

export class DOMListener {
    constructor($root, listeners=[]) {
        if (!$root) {
            throw new Error('No root provided')
        }
        this.$root = $root;
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                // eslint-disable-next-line max-len
                throw new Error(`Method ${method} not implemented in ${this.name} Component!`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName, prefix='on') {
    return prefix+capitalize(eventName)
}

