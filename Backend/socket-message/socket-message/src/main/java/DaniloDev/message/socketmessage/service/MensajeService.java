package DaniloDev.message.socketmessage.service;

import DaniloDev.message.socketmessage.dto.MensajeDTO;
import DaniloDev.message.socketmessage.model.Mensaje;
import DaniloDev.message.socketmessage.repository.MensajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class MensajeService {

    @Autowired
    private MensajeRepository mensajeRepository;

    public MensajeDTO guardar(MensajeDTO mensaje){
        mensajeRepository.save(new Mensaje(new Random().nextLong(),mensaje.nombre(),mensaje.contenido()));
        return new MensajeDTO(mensaje.nombre(),mensaje.contenido());
    }
}
