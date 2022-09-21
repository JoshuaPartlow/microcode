namespace microcode {
    const STORED_SAMPLES = [
        "{\"progdef\":{\"P\":[{\"R\":[{\"S\":[\"S4\"],\"A\":[\"A5\"],\"M\":[\"M15(0101010101100010101000100)\",\"M15(0000000000000000000000000)\"]},{\"S\":[],\"A\":[]}]},{\"R\":[{\"S\":[],\"A\":[]}]},{\"R\":[{\"S\":[],\"A\":[]}]},{\"R\":[{\"S\":[],\"A\":[]}]},{\"R\":[{\"S\":[],\"A\":[]}]}]}}",
        "{\"progdef\":{\"P\":[{\"R\":[{\"S\":[\"S2\"],\"A\":[\"A5\"],\"F\":[\"F3\"],\"M\":[\"M15(1101111011000001000101110)\"]},{\"S\":[\"S2\"],\"A\":[\"A5\"],\"F\":[\"F4\"],\"M\":[\"M15(1101111011000000111010001)\"]}]},{\"R\":[{\"S\":[],\"A\":[]}]},{\"R\":[{\"S\":[],\"A\":[]}]},{\"R\":[{\"S\":[],\"A\":[]}]},{}]}}"
    ]
    const CAROUSEL_NAMES = [
        "editor",
        "flashing heart sample",
        "smiley buttons sample"
    ]
    const CAROUSEL_ICON_NAMES = [
        "paint",
        "flashing_heart",
        "smiley_buttons"
    ]

    export class Home extends CursorScene {
        sampleBtn: Button
        selectBtnL: Button
        selectBtnR: Button
        carouselCounter: number
    
        constructor(app: App) {
            super(app)
            this.compileProgram()
        }

        public compileProgram() {
            const progdef = this.app.load(SAVESLOT_AUTO)
            if (!progdef) return

            new jacs.TopWriter().emitProgram(progdef)
        }

        /* override */ startup() {
            super.startup()
            this.carouselCounter = 0

            this.selectBtnL = new Button({
                parent: null,
                style: ButtonStyles.BorderedPurple,
                icon: "prev_page",
                ariaId: "previous sample button",
                x: -32,
                y: 40,
                onClick: () => {
                    if (this.carouselCounter > 0) {
                        this.carouselCounter--
                    }
                    this.sampleBtn.setIcon(CAROUSEL_ICON_NAMES[this.carouselCounter])
                }
            })
            this.sampleBtn = new Button({
                parent: null,
                style: ButtonStyles.FlatWhite,
                icon: CAROUSEL_ICON_NAMES[this.carouselCounter],
                ariaId: CAROUSEL_NAMES[this.carouselCounter],
                x: 0,
                y: 40,
                onClick: () => {
                    if (this.carouselCounter === 0) {
                        this.app.popScene()
                        this.app.pushScene(new Editor(this.app))
                    }
                    else {
                        settings.writeString(SAVESLOT_AUTO, STORED_SAMPLES[this.carouselCounter-1])
                        this.app.popScene()
                        this.app.pushScene(new Editor(this.app))
                    }

                },
            })
            this.selectBtnR = new Button({
                parent: null,
                style: ButtonStyles.BorderedPurple,
                icon: "next_page",
                ariaId: "next sample button",
                x: 32,
                y: 40,
                onClick: () => {
                    if (this.carouselCounter < CAROUSEL_NAMES.length-1) {
                        this.carouselCounter++
                    }
                    this.sampleBtn.setIcon(CAROUSEL_ICON_NAMES[this.carouselCounter])
                }
            })

            this.navigator.addButtons([this.selectBtnL, this.sampleBtn, this.selectBtnR])
        }

        /* override */ shutdown() {
            super.shutdown()
        }

        /* override */ activate() {
            super.activate()
            this.color = 15
            let progdef = this.app.load(SAVESLOT_AUTO)
            if (!progdef) {
                progdef = new ProgramDefn()
                this.app.save(SAVESLOT_AUTO, progdef)
            }

            // this.log("program started", 1)
        }

        /* override */ deactivate() {}

        /* override */ update() {
            super.update()
        }

        private yOffset = -Screen.HEIGHT >> 1
        /* override */ draw() {
            Screen.fillRect(
                Screen.LEFT_EDGE,
                Screen.TOP_EDGE,
                Screen.WIDTH,
                Screen.HEIGHT,
                0xc
            )
            this.yOffset = Math.min(0, this.yOffset + 2)
            const t = control.millis()
            const dx = this.yOffset == 0 ? (((t / 800) | 0) % 2) - 1 : 0
            Screen.drawTransparentImage(
                wordLogo,
                Screen.LEFT_EDGE + ((Screen.WIDTH - wordLogo.width) >> 1) + dx,
                Screen.TOP_EDGE + 50 + dx + this.yOffset
            )
            Screen.drawTransparentImage(
                microbitLogo,
                Screen.LEFT_EDGE +
                    ((Screen.WIDTH - microbitLogo.width) >> 1) +
                    dx,
                Screen.TOP_EDGE + 50 - wordLogo.height + dx + this.yOffset
            )
            this.selectBtnL.draw()
            this.sampleBtn.draw()
            this.selectBtnR.draw()
            super.draw()
        }
    }
}
