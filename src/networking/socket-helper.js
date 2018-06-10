import {BASE_URL} from "../constants";

/**
 * NOTE: an instance of this SocketHelper class is initialized in `App.js` upon
 * inovocation of `_performAsyncSetup`. It is then stored in redux, under the
 * name `networking.socketHelper`. The intent of this structure is for any
 * component in the application to be able to subscribe to a socket event in
 * `componentDidMount`, and then unsubscribe from the event in
 * `componentWillUnmount`. Reception of data/processing is handled at the
 * component level rather than by redux to avoid unneeded complexity, and
 * leverage the fact that each event will likely only be needed by a component
 * and its children, and not multiple sibling components, making redux an
 * unneeded layer of complexity.
 *
 * The socket helper is assuming events from the socket will be emitted with a
 * `type` attribute (the event name) and a `data` attribute, containing the
 * actual information of the event.
 */

/**
 * Class to aid with socket interaction
 * @type {Object}
 */
export default class SocketHelper {
    constructor() {
        this._handlers = {};
    }

    /**
     * Initialize the websocket
     * @param  {String} url the url to connect to
     */
    async connectAsync(url) {
        const success = await new Promise((resolve, reject) => {
            this.ws = new WebSocket(url);
            this.ws.addEventListener("open", () => resolve(true));
            this.ws.addEventListener("error", err => {
                console.log(err);
                resolve(false);
            });
        });


        if (success) {
            this.ws.addEventListener("message", this._onMessage.bind(this));
        }
        return success;
    }

    /**
     * Close the socket connection
     */
    close() {
        this.ws.close();
    }

    /**
     * Subscribe to a specific event and receive updates
     * @param  {String}   eName   the name of the event to subscribe to
     * @param  {Function} handler the function to be invoked upon receiving an update
     */
    subscribe(eName, handler) {
        if (!this._handlers[eName]) {
            this._handlers[eName] = [handler];
        } else {
            this._handlers[eName].push(handler);
        }
    }

    /**
     * Unsubscribe a handler for a specific event name
     * @param  {String}   eName   the name of the event to unsubscribe a handler from
     * @param  {Function} handler the handler function to remove
     * @return {Boolean}          whether or not the handler was present and removed
     */
    unsubscribe(eName, handler) {
        if (!this._handlers[eName]) {
            return false;
        }
        idx = this._handlers[eName].indexOf(handler);
        if (idx === -1) {
            return false;
        }
        this._handlers[eName].splice(idx, 1);
        return true;
    }

    /**
     * Helper function invoked on receiving data from the socket; invokes all the
     * applicable handler functions
     * @param  {Object} e the data from the socket
     */
    _onMessage(e) {
        const data = JSON.parse(e.data);
        // console.log(data);
        (this._handlers[data.type] || []).map(handler => {
            handler(data);
        });
    }
}
