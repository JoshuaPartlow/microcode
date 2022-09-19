namespace microcode {

    const STORED_SAMPLES =
        ["{\"progdef\":{\"P\":[{\"R\":[{\"S\":[\"S2\"],\"A\":[\"A5\"],\"F\":[\"F4\"],\"M\":[\"M15(1111110001100011000111111)\"]}]},{},{},{},{}]}}",
            "{\"progdef\":{\"P\":[{\"R\":[{\"S\":[\"S2\"],\"A\":[\"A5\"],\"F\":[\"F4\"],\"M\":[\"M15(1000101010001000101010001)\"]}]},{},{},{},{}]}}"]
    
    export class Samples extends Scene{
    
        constructor(app: App) {
            super(app, "samples")
        }

        startup() {
            super.startup()

            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id,
                () => {
                    settings.writeString(SAVESLOT_AUTO, STORED_SAMPLES[0])
                    this.app.popScene()
                    this.app.pushScene(new Editor(this.app))
                }
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.B.id,
                () => {
                    settings.writeString(SAVESLOT_AUTO, STORED_SAMPLES[1])
                    this.app.popScene()
                    this.app.pushScene(new Editor(this.app))
                }
            )
        }

        draw() {
            const TOOLBAR_HEIGHT = 18
            const LINE_HEIGHT = 9
            const toolbarTop = Screen.BOTTOM_EDGE - TOOLBAR_HEIGHT
            Screen.fillRect(
                Screen.LEFT_EDGE,
                toolbarTop,
                Screen.WIDTH,
                TOOLBAR_HEIGHT,
                11
            )
            const icn_dpad_left = icons.get("dpad_left")
            const dpadTop =
                toolbarTop + (TOOLBAR_HEIGHT >> 1) - (icn_dpad_left.height >> 1)
            Screen.print(
                "Select sample A or B",
                Screen.LEFT_EDGE + 2,
                dpadTop + (LINE_HEIGHT >> 1)
            )
/*             Screen.drawTransparentImage(
                icn_dpad_left,
                Screen.LEFT_EDGE + 32,
                dpadTop
            ) */
            super.draw()
        }
    }
}