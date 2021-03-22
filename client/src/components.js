import blessed from 'blessed'

export default class ComponentsBuilder{
    #screen
    #layout
    #input
    #chat

    constructor(){}

    #baseComponent(){
        return{
            border: '',
            mouse: true,
            keys: true,
            top: 0,
            scrollbar: {
                ch: ' ',
                invese: true
            },
            tags: true
        }
    }

    setScreen({title}){
        this.#screen = blessed.screen({
            smartCSR:true,
            title
        })

        this.#screen.key(['escape', 'C-c'], process.exit(0))

        return this
    }

    setLayoutComponent(){
        this.#layout = blessed.layout({
            parent: this.#screen,
            width: '100%',
            height: '100%',
        })

        return this
    }

    setInputComponent(onEnterPressed){
        const input = blessed.textarea({
            parent: this.#screen,
            bottom: 0,
            height: '10%',
            inputOnFocus: true,
            padding:{
                top: 1,
                left: 2,
            },
            style: {
                fg: '#f6f6f6',
                bg: '#353535'
            }
        })

        input.key('enter', onEnterPressed)

        this.#input = input

        return this
    }

    setChatComponent(){
        this.#chat = blessed.list({
            ...this.#baseComponent,
            parent: this.#layout,
            align: 'left',
            width: '50%',
            height: '90%',
            items: ['{bold}Messanger{/}']
        })

        return this
    }

    build(){
        const components = {
            screen: this.#screen,
            input: this.#input,
            chat: this.#chat
        }

        return components
    }
}