let estado = ""
let prendido = 0
let numSer = 0
let direccion = ""
let obstaculo = 0
basic.forever(function () {
    estado = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (estado == "encender") {
        images.iconImage(IconNames.Giraffe).showImage(0)
        prendido = 1
    }
    if (estado == "apagar") {
        basic.clearScreen()
        prendido = 0
    }
    numSer = parseFloat(estado.substr(0, 3))
    if (prendido == 1) {
        direccion = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        obstaculo = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
        if (obstaculo > 8) {
            if (direccion == "arriba") {
                cuteBot.moveTime(cuteBot.Direction.forward, numSer, 10)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x00ffff)
            } else if (direccion == "abajo") {
                cuteBot.moveTime(cuteBot.Direction.backward, numSer, 10)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffff00)
            } else if (direccion == "derecha") {
                cuteBot.motors(50, 0)
                cuteBot.motors(0, 0)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff8000)
            } else if (direccion == "izquierda") {
                cuteBot.motors(0, 50)
                cuteBot.motors(0, 0)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff8000)
            }
        } else {
            direccion = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
            cuteBot.motors(10, 10)
            if (direccion == "izquierda") {
                cuteBot.motors(0, 50)
                cuteBot.motors(0, 0)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff8000)
            } else if (direccion == "derecha") {
                cuteBot.motors(50, 0)
                cuteBot.motors(0, 0)
                cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff8000)
            }
        }
    } else {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
    }
})
