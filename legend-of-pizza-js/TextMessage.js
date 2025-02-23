class TextMessage {
    constructor ({ text, onComplete }) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }
    createElement() {
        // Create the element
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
        <p class="TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>
        `)

        this.element.querySelector("button").addEventListener("click", () => {
            // Close the text message
            this.done();
        });

        // Button 'ENTER' Key Listener
        this.actionListener = new KeyPressListener("Enter", () => {
            console.log("Enter pressed");
            this.actionListener.unbind();
            this.done();
        });
    }

    done () {
        this.element.remove();
        this.onComplete();
    }

    init (container) {
        this.createElement();
        container.appendChild(this.element); 
    }
}