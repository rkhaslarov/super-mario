const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
     constructor() {
         this.keyStates = new Map();
         this.keyMap = new Map();
     }

     addMapping(keyCode, callback) {
         this.keyMap.set(keyCode, callback);
     }

     handleEvent(event) {
         const {keyCode} = event;

         if (!this.keyMap.has(keyCode)) {
             return;
         }

         event.preventDefault();

         const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

         if (this.keyStates.get(keyCode) === keyState) {
             return;
         }

         this.keyStates.set(keyCode, keyState);
         this.keyMap.get(keyCode)(keyState);
     }

     listenTo(global) {
         ['keyup', 'keydown'].forEach(eventName => {
             global.addEventListener(eventName, (e) => {
                 this.handleEvent(e);
             });
         });
     }
}
