package DaniloDev.message.socketmessage.controller;

import DaniloDev.message.socketmessage.dto.MensajeDTO;
import DaniloDev.message.socketmessage.service.MensajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MensajeController {

    @Autowired
    private MensajeService mensajeService;

    @MessageMapping("/envio")
    @SendTo("/tema/mensajes")
    public MensajeDTO envio(MensajeDTO mensaje){
        mensajeService.guardar(mensaje);
        return new MensajeDTO(mensaje.nombre(),mensaje.contenido());
    }
}
