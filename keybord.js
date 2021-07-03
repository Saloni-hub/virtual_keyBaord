const keyboard = {
    elements:{
        main:null,
        keysContainer: null,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null,
    },
    properties: {
        value: '',
        capsLock: false,
    },
    init(){
        // create main
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // setup main
        this.elements.main.classList.add("keybord","keybord--hidden");
        this.elements.keysContainer.classList.add("keybord_keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keybord__key")

        // add to dom
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // automatically usekeybord 
        document.querySelectorAll(".use-keybord-input").forEach(element => {
            element.addEventListener('focus',()=>{
                this.open(element.value,cuurVal => {
                    element.value = cuurVal;
                })
            })
        })

    },
    _createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLAyout = [
            "1","2","3","4","5","6","7","8","9","0","backspace",
            "q","w","e","r","t","y","u","i","o","p",
            "caps","a","s","d","f","g","h","j","k","l","enter",
            "done","z","x","c","v","b","n","m",",",".","?",
            "space"
        ];

        // create html font icon
        const creteHtmlIcon = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        }
        keyLAyout.forEach(key=>{
            const btnElement = document.createElement('button');
            const insertLineBreak = ["backspace","p","enter","?"].indexOf(key) !== -1;

            //add attribute
            btnElement.setAttribute("type","button");
            btnElement.classList.add("keybord__key");

            switch(key){
                case "backspace": 
                      btnElement.classList.add("keybord__key__wide");
                      btnElement.innerHTML = creteHtmlIcon('backspace');

                      btnElement.addEventListener('click',()=>{
                          this.properties.value = this.properties.value.substring(0,this.properties.value.length-1);
                          this._tiggerEvent("oninput");
                      })
                      break;
                case "caps": 
                      btnElement.classList.add("keybord__key__wide","keybord__key--activetable");
                      btnElement.innerHTML = creteHtmlIcon('keyboard_capslock');

                      btnElement.addEventListener('click',()=>{
                          this._toggleCapslock();
                          btnElement.classList.toggle("keybord__key--active",this.properties.capsLock)
                      })
                      break;
                case "enter": 
                      btnElement.classList.add("keybord__key__wide");
                      btnElement.innerHTML = creteHtmlIcon('keyboard_return');

                      btnElement.addEventListener('click',()=>{
                          this.properties.value += "\n";
                          this._tiggerEvent("oninput")
                      })
                      break;
                case "space": 
                      btnElement.classList.add("keybord__key__extrawide");
                      btnElement.innerHTML = creteHtmlIcon('space_bar');

                      btnElement.addEventListener('click',()=>{
                          this.properties.value += " ";
                          this._tiggerEvent("oninput")
                      })
                      break;          
                case "done": 
                      btnElement.classList.add("keybord__key__wide","keybord__key--dark");
                      btnElement.innerHTML = creteHtmlIcon('check_circle');

                      btnElement.addEventListener('click',()=>{
                          this.close();
                          this._tiggerEvent("onclose")
                      })
                      break;
                
                default:
                      btnElement.textContent = key.toLowerCase();
                      btnElement.addEventListener('click',()=>{
                          this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                          this._tiggerEvent("oninput")
                      });
                      break;
            }
            fragment.appendChild(btnElement)
            if(insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            }

        })
        return fragment;
    },
    _tiggerEvent(handleName){
        if(typeof this.eventHandlers[handleName] === "function"){
            this.eventHandlers[handleName](this.properties.value)
        }

    },
    _toggleCapslock(){
        this.properties.capsLock = !this.properties.capsLock;
        for(const key of this.elements.keys){
            if(key.childElementCount === 0){
                key.textContent=this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }

        }
    },
    open(initialValue,oninput,onclose){
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keybord--hidden");
    },
    close(){
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keybord--hidden")
    }
}

window.addEventListener("DOMContentLoaded",function(){
    keyboard.init();
    keyboard.open('decode',function(currVal){
        console.log("value changed here it is:"+currVal);
    },function(currVal){
        console.log('keybord close! Finishing value' + currVal);
    })
})