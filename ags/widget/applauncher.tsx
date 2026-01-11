import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

type DockApp = {
  name: string
  icon: string
  cmd: string
}

const apps: DockApp[] = [
  { name: "Browser", icon: "brave", cmd: "brave" },
  { name: "Files", icon: "org.gnome.Nautilus", cmd: "nautilus" },
  { name: "Terminal", icon: "foot", cmd: "foot" },
  { name: "Spotify", icon: "spotify", cmd: "spotify" },
]

export default function Dock(monitor: Gdk.Monitor) {
  const { BOTTOM } = Astal.WindowAnchor
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="dock"
      class="Dock"
      gdkmonitor={monitor}
      // anchor={TOP | LEFT | RIGHT}
      anchor={BOTTOM}
      exclusivity={Astal.Exclusivity.IGNORE}
      layer={Astal.Layer.BACKGROUND}
      application={app}
      visible
    >
      <box class="dock-box" spacing={8}
      halign={Gtk.Align.CENTER}
      >
        {apps.map((app) => (
          <button
            class="dock-item"
            tooltipText={app.name}
            onClicked={() => execAsync(app.cmd)}
          >
            <image iconName={app.icon} pixelSize={22} />
          </button>
        ))}
      </box>
    </window>
  )
}
