namespace microcode {
    export class Samples extends Scene{
        public cursor: Cursor
        public picker: Picker

        constructor(app: App) {
            super(app, "samples")
            this.color = 11
        }

        startup() {
            super.startup()
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.right.id,
                () => this.cursor.move(CursorDir.Right)
            )
            control.onEvent(
                ControllerButtonEvent.Repeated,
                controller.right.id,
                () => this.cursor.move(CursorDir.Right)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.up.id,
                () => this.cursor.move(CursorDir.Up)
            )
            control.onEvent(
                ControllerButtonEvent.Repeated,
                controller.up.id,
                () => this.cursor.move(CursorDir.Up)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.down.id,
                () => this.cursor.move(CursorDir.Down)
            )
            control.onEvent(
                ControllerButtonEvent.Repeated,
                controller.down.id,
                () => this.cursor.move(CursorDir.Down)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.left.id,
                () => this.cursor.move(CursorDir.Left)
            )
            control.onEvent(
                ControllerButtonEvent.Repeated,
                controller.left.id,
                () => this.cursor.move(CursorDir.Left)
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.A.id,
                () => this.cursor.click()
            )
            control.onEvent(
                ControllerButtonEvent.Pressed,
                controller.B.id,
                () => {
                    if (!this.cursor.cancel()) this.cursor.move(CursorDir.Back)
                }
            )
        }
    }
}