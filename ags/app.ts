import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import Bart from "./widget/applauncher"
import Keybinds from "./widget/keybinds"

app.start({
  css: style,
  main() {
    // app.get_monitors().map(Bar)
    app.get_monitors().map(Bart)
    app.get_monitors().map(Keybinds)
  },
})
