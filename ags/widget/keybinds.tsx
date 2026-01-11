import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

type BindsData = {
  [category: string]: {
    [action: string]: string
  }
}

const binds: BindsData = {
  "window Management": {
    "Close window": "Mainmod + Q",
    Center: "Mainmod + W",
    "Toggle Fullscreen": "Mainmod + F",
    "Toggle Floating": "Super + Space",
  },
  Launcher: {
    Launcher: "Super + Space",
    "Run Command": "Alt + F2",
  },
  Workspaces: {
    "Next Workspace": "MainMod + Tab",
    "Prev Workspace": "Super + Scroll Up",
  },
}

export default function Keybinds(monitor: Gdk.Monitor) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

  const categories = Object.entries(binds)

  return (
    <window
      name="floating"
      class="Floating"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
      visible
    >
      <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
        <box
          class="floating-box"
          orientation={Gtk.Orientation.VERTICAL}
          css="padding: 24px; background-color: #1e1e2e; border-radius: 12px; border: 2px solid #585b70;"
        >
          {/* Título */}
          <label
            label="⌨ Atajos de Teclado"
            css="font-size: 1.4em; font-weight: bold; color: #cba6f7; margin-bottom: 16px;"
          />

          {/* Grilla de categorías */}
          <Gtk.Grid
            columnSpacing={32}
            rowSpacing={24}
            onRealize={(grid: Gtk.Grid) => {
              const cols = 3 // Número de columnas para las categorías
              categories.forEach(([category, actions], catIndex) => {
                const categoryBox = (
                  <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                    {/* Título de categoría */}
                    <label
                      class="category-title"
                      halign={Gtk.Align.START}
                      label={category}
                      css="font-weight: bold; font-size: 1.1em; color: #89b4fa; margin-bottom: 4px;"
                    />

                    {/* Lista de binds */}
                    {Object.entries(actions).map(([action, combo]) => (
                      <box spacing={16} css="min-width: 200px;">
                        <label
                          class="action"
                          label={action}
                          halign={Gtk.Align.START}
                          hexpand
                          css="color: #cdd6f4;"
                        />
                        <box spacing={4} halign={Gtk.Align.END}>
                          {combo.split("+").map((key) => (
                            <label
                              class="keycap"
                              label={key.trim()}
                              css={`
                                background-color: #313244;
                                color: #cdd6f4;
                                padding: 4px 10px;
                                border-radius: 6px;
                                font-weight: bold;
                                font-size: 0.9em;
                                border-bottom: 3px solid #181825;
                              `}
                            />
                          ))}
                        </box>
                      </box>
                    ))}
                  </box>
                ) as Gtk.Widget

                grid.attach(
                  categoryBox,
                  catIndex % cols,
                  Math.floor(catIndex / cols),
                  1,
                  1
                )
              })
            }}
          />
        </box>
      </box>
    </window>
  )
}
