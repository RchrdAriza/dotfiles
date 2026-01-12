import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

type BindsData = {
  [category: string]: {
    [action: string]: string
  }
}

const binds: BindsData = {
  general: {
    killActive: "$mainMod, Q",
    forceKillActive: "$mainMod SHIFT, Q,",
    exitHyprland: "$mainMod SHIFT, M",
    openBrowser: "$mainMod, B, exec",
    openFileManager: "$mainMod, E, exec",
    toggleFloating: "$mainMod, V",
    openLauncher: "$mainMod, SPACE, exec",
    togglePseudo: "$mainMod, P, ",
    toggleSplit: "$mainMod SHIFT, J",
    fullscreen: "$mainMod, F",
    fullscreenAlt: "$mainMod SHIFT, F",
    screenshotWindow: "Print, exec",
    screenshotRegion: "SHIFT, print",
    openVSCode: "$mainMod SHIFT, C",
  },

  focus: {
    focusLeft: "$mainMod, h",
    focusRight: "$mainMod, l",
    focusUp: "$mainMod, k",
    focusDown: "$mainMod, j",
  },

  workspaces: {
    ws1: "$mainMod, 1",
    ws2: "$mainMod, 2",
    ws3: "$mainMod, 3",
    ws4: "$mainMod, 4",
    ws5: "$mainMod, 5",
    ws6: "$mainMod, 6",
    ws7: "$mainMod, 7",
    ws8: "$mainMod, 8",
    ws9: "$mainMod, 9",
    ws10: "$mainMod, 0",
    moveToWs1: "$mainMod SHIFT, 1",
    moveToWs4: "$mainMod SHIFT, 4",
    moveToWs5: "$mainMod SHIFT, 5",
    moveToWs6: "$mainMod SHIFT, 6",
    moveToWs7: "$mainMod SHIFT, 7",
    moveToWs8: "$mainMod SHIFT, 8",
    moveToWs9: "$mainMod SHIFT, 9",
    moveToWs10: "$mainMod SHIFT, 0",
  },

  lockAndSpecial: {
    lock: "$mainMod, ESCAPE",
    toggleMagicWs: "$mainMod, S",
    moveToMagicWs: "$mainMod SHIFT, S",
  },

  scrollWorkspaces: {
    scrollNext: "$mainMod, mouse_down",
    scrollPrev: "$mainMod, mouse_up",
  },

  mouseMoveResize: {
    moveWindow: "$mainMod, mouse",
    resizeWindow: "$mainMod, mouse",
  },

  custom: {
    mediaController: "$mainMod, M",
    wsPrev: "$mainMod SHIFT, LEFT",
    wsNext: "$mainMod SHIFT, RIGHT",
    wsNextMon: "$mainMod, tab",
    wsPrevMon: "$mainMod SHIFT, tab",
    openTerminal: "$mainMod, T",
    toggleNotifications: "SUPER, N",
  },

  resize: {
    resizeRight: "$mainMod CTRL, right",
    resizeLeft: "$mainMod CTRL, left",
    resizeUp: "$mainMod CTRL, up",
    resizeDown: "$mainMod CTRL, down",
    centerWindow: "$mainMod, W",
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
          css="padding: 24px; background-color: #1e1e2e; border-radius: 12px; border: 2px solid #585b70; max-width: 1200px; max-height: 800px;"
        >
          {/* Título */}
          <label
            label="⌨ Atajos de Teclado"
            css="font-size: 1.4em; font-weight: bold; color: #cba6f7; margin-bottom: 16px;"
          />

          {/* Grilla inteligente de categorías */}
          <Gtk.FlowBox
            homogeneous={false}
            columnSpacing={32}
            rowSpacing={24}
            maxChildrenPerLine={4}
            minChildrenPerLine={1}
            selectionMode={Gtk.SelectionMode.NONE}
          >
            {categories.map(([category, actions]) => (
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
            ))}
          </Gtk.FlowBox>
        </box>
      </box>
    </window>
  )
}
