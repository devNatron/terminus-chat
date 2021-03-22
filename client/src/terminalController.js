import componentsBuilder from './components.js'

export default class terminalController{
    constructor(){

    }

    #onInputReceived(eventEmitter){
        return function(){
            const message = this.getValue()
            this.clearValue()
            console.log(message)
        }
    }

    #onMessageReceived({screen, chat}){
        return msg => {
            const {message, userName} = msg
            chat.addItem(`{bold}${userName}{/}: ${msg}`)
            screen.render()
        }
    }

    #registerEvents(eventEmitter, components){
        eventEmitter.on('message:received', this.#onMessageReceived(components))
    }

    async initializeTable(eventEmitter){
        const components = new componentsBuilder()
        .setScreen({title: 'Terminus Chat - Natron'})
        .setLayoutComponent()
        .setInputComponent(this.#onInputReceived(eventEmitter))
        .setChatComponent()
        .build()

        this.#registerEvents(eventEmitter, components)

        setInterval(() => {
            eventEmitter.emit('message:received', {message: 'alou', userName: 'Natron'})
        }, 2000);

        components.input.focus()
        components.screen.render()
    }
} 