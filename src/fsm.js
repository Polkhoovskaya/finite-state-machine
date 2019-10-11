class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        if(config){
            this.state = config.initial;
            this.previousStates = [];
            this.canceledState = [];
            this.config = config;
            
        } else{
            throw new Error('no config object')
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.previousStates.push(this.state);
            this.state = state;
        } else {
            throw new Error('state is absent');
        }
        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        const nextState = this.config.states[this.state].transitions[event];
        if(nextState) {
            this.previousStates.push(this.state);
            this.state = nextState;
        } else {
            throw new Error('no this state');
        }
               
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.previousStates = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        if (event) {
            for (let key in this.config.states) {
                if (this.config.states[key].transitions[event]) {
                    states.push(key);
                }
            } 
            return states; 
        } else {
            for (let key in this.config.states) {
                states.push(key);
            }
            return states;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.state === this.config.initial) {
            return false;
        } else {
            this.canceledState.push(this.state);
            this.state = this.previousStates[this.previousStates.length - 1];
            this.previousStates.pop;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.state = this.config.initial && this.canceledState === []) {
            return false;
        } else if (this.state = this.config.initial) {
            const canceledStateLength = this.canceledState.length - 1;
        
            // for (let i = canceledStateLength; i >= 0; i--) {
                this.previousStates.push(this.state);
                this.state = this.canceledState[canceledStateLength];
                this.canceledState.pop();
            // }

            return false;
        } else {
            const canceledStateLength = this.canceledState.length - 1;
        
            // for (let i = canceledStateLength; i >= 0; i--) {
                this.previousStates.push(this.state);
                this.state = this.canceledState[canceledStateLength];
                this.canceledState.pop();
            // }

            return true;
        }
            
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = this.config.initial;
        this.previousStates = [];
        this.canceledState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
