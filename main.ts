//Definir o grupo de rádio para comunicação entre carrinho e controle
radio.setGroup(77)

//Definir a conversão dos valores obtidos pelos eixos X e Y do acelerômetro para envio do controle para o carrinho.
basic.forever(function () {
    radio.sendValue("eixo", Math.map(input.acceleration(Dimension.X), -1023, 1023, 45, 135));
    radio.sendValue("motor", Math.map(input.acceleration(Dimension.Y), 1023, -1023, -255, 255));
})

//Definir o recebimento dos valores do controle pelo carrinho para uso no motor e no servo motor.
radio.onReceivedValue(function (name: string, value: number) {
    if(name === "eixo") {
        robotbit.Servo(robotbit.Servos.S1, value);
    } else if(name === "motor") {
        robotbit.MotorRun(robotbit.Motors.M1A, value);
    }
})