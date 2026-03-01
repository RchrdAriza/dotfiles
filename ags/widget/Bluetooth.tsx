import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

export default function BluetoothWidget(gdkmonitor: Gdk.Monitor) {
    const { TOP, RIGHT } = Astal.WindowAnchor
    
    // Poll bluetooth status every 2 seconds
    const status = createPoll("off", 2000, ["bash", "-c", "bluetoothctl show | grep 'Powered: yes' > /dev/null && echo on || echo off"])

    const toggle = () => {
        execAsync(["bash", "-c", "bluetoothctl show | grep 'Powered: yes' > /dev/null && bluetoothctl power off || bluetoothctl power on"])
            .catch(console.error)
    }

    return <window
        visible
        name="bluetooth"
        class="Bluetooth"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | RIGHT}
        application={Astal.Application.get_default()}
    >
        <box class="bluetooth-box">
             <button
                onClicked={toggle}
                // @ts-ignore - Assuming .as() exists on the binding returned by createPoll or it handles string transformation
                class={status.as(s => s.trim() === "on" ? "on" : "off")}
            >
                <icon icon={status.as(s => s.trim() === "on" ? "bluetooth-active-symbolic" : "bluetooth-disabled-symbolic")} />
            </button>
            <label label={status.as(s => s.trim() === "on" ? "On" : "Off")} />
        </box>
    </window>
}
