import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";//Atenção, o typeorm, também tem um connection, mas tem que importar do lugar certo

@EntityRepository(Connection)
class ConnectionsRepository extends Repository<Connection> {

}

export { ConnectionsRepository };



