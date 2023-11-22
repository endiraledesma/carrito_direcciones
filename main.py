estado = ""
prendido = 0
numSer = 0
direccion = ""
obstaculo = 0

def on_forever():
    global estado, prendido, numSer, direccion, obstaculo
    estado = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    if estado == "encender":
        images.icon_image(IconNames.GIRAFFE).show_image(0)
        prendido = 1
    if estado == "apagar":
        basic.clear_screen()
        prendido = 0
    numSer = parse_float(estado.substr(0, 3))
    if prendido == 1:
        direccion = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
        obstaculo = cuteBot.ultrasonic(cuteBot.SonarUnit.CENTIMETERS)
        if obstaculo > 8:
            if direccion == "arriba":
                cuteBot.move_time(cuteBot.Direction.FORWARD, numSer, 10)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0x00ffff)
            elif direccion == "abajo":
                cuteBot.move_time(cuteBot.Direction.BACKWARD, numSer, 10)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0xffff00)
            elif direccion == "derecha":
                cuteBot.motors(50, 0)
                cuteBot.motors(0, 0)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff8000)
            elif direccion == "izquierda":
                cuteBot.motors(0, 50)
                cuteBot.motors(0, 0)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff8000)
        else:
            direccion = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
            cuteBot.motors(10, 10)
            if direccion == "izquierda":
                cuteBot.motors(0, 50)
                cuteBot.motors(0, 0)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff8000)
            elif direccion == "derecha":
                cuteBot.motors(50, 0)
                cuteBot.motors(0, 0)
                cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff8000)
    else:
        cuteBot.color_light(cuteBot.RGBLights.ALL, 0xff0000)
basic.forever(on_forever)
