import SwiftUI

struct ContentView: View {
    var display_pixels_progress = 0
    var display_pixels_max = 0
    var W_Counted = 0
    var H_Counted = 0
    var TimerMS = 0
    var TimerStopped = false
    var FPS_Limit = 60

    func prt(message: String) {
        print (message)
    }

    func AddTimer () {
        if TimerStopped {

        } else {
            TimerMS += 1
            AddTimer()
        }
    }

    func StartTimer () {
        TimerStopped = false
        TimerMS = 0
        AddTimer()
    }

    func StopTimer () {
        TimerStopped = true
    }

    func ResetTimer () {
        TimerStopped = true
        TimerMS = 0
    }

    func StartRenderingPixels (usb_connected_device: USB_Device, resolutionX: Int, resolutionY: Int, maxPixels: Int, pixels: Array) {
        if USB_Device.getStatus() == "Online" {
            var current_selected_pixel = pixels[display_pixels_max]
            var PC_Pixel = current_selected_pixel
            if H_Counted > resolutionY {
                DrawPixel(x: PC_Pixel.sizeX + W_Counted, y: PC_Pixel.sizeY + H_Counted, sizeX: PC_Pixel.sizeX, sizeY: PC_Pixel.sizeY, RGB: PC_Pixel.RGBConfig)
                W_Counted += 1
                if W_Counted > resolutionX - 1 {
                    W_Counted = 0
                    H_Counted += 1
                }
                print("PC Viewer: Pixel Rendered!")
                StartRenderingPixels(usb_connected_device: usb_connected_device, resolutionX: resolutionX, resolutionY: resolutionY, maxPixels: maxPixels, pixels: pixels)
            } else {
                StopTimer()
                print("Rendered PC Screen In \(TimerMS / 1000) seconds")
                FinishedRenderingPixels(usb: usb_connected_device)
            }
        } else {
            ResetTimer()
            print("Failed To Render PC Screen")
            Render_Crashed(reason: "USB device is currently Offline")
        }
    }

    func FinishedRenderingPixels (usb: USB_Device) {
        DispatchQueue.main.asyncAfter(deadline: .now() + ((FPS_Limit / 60) / 60)) {
            Render(device: usb)
        }
    }

    func Render (device) {
        InitRenderPixels(device: device)
    }

    func InitRenderPixels (device: USB_Device) {
        display_pixels_progress = 0
        display_pixels_max = USB_Device.getDisplay().pixels.count
        H_Counted = 0
        W_Counted = 0
        var Pixels = USB_Device.getDisplay().pixels
        var resX = USB_Device.getDisplay().resX
        var resY = USB_Device.getDisplay().resY
        var res = "\(USB_Device.getDisplay().resX)x\(USB_Device.getDisplay().resY)"
        print("Rendering A Screen: \(res) pixels of resolution.")
        StartTimer()
        StartRenderingPixels(usb_connected_device: device, resolutionX: resX, resolutionY: resY, maxPixels: display_pixels_max, pixels: Pixels)
    }

    func Render_Crashed(reason: String) {
        if reason == "USB device is currently Offline" {
            PCView.Exit()
        }
    }

    var body: some View {
        VStack {
            Image(systemName: "globe").imageScale(.large).foregroundStyle(.tint)
            Text("Hellom world!")
        }
        .padding()
    }
}

#preview {
    ContentView()
}