package DaniloDev.message.socketmessage.repository;


import DaniloDev.message.socketmessage.model.Mensaje;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MensajeRepository extends MongoRepository<Mensaje,Long> {
}
