import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import Button from "../../components/button";
import TopBackground from "../../components/TopBackground";
import Trash from "../../assets/trash.svg";
import {
  Container,
  ContainerUsers,
  CardsUsers,
  TrashIcon,
  Title,
  AvatarUser,
} from "./styles";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      const { data } = await api.get("/usuarios");

      setUsers(data);
    }
    getUsers();
  }, []);

  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`);
  
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
    }
  }
  
  return (
    <Container>
      <TopBackground />
      <Title>Lista de Usuários</Title>

      <ContainerUsers>
        {users.map((user) => (
          <CardsUsers key={user.id}>
            <AvatarUser
              src={`https://avatar.iran.liara.run/public/?username=${user.id}`}
            />
            <div>
              <h3>{user.name}</h3>
              <p>{user.age}</p>
              <p>{user.email}</p>
            </div>
            <TrashIcon src={Trash} alt="icone-lixo" onClick={() => deleteUsers(user.id)}/>
          </CardsUsers>
        ))}
      </ContainerUsers>

      <Button type="button" onClick={() => navigate("/")}>
        Voltar
      </Button>
    </Container>
  );
}
export default ListUsers;
//Opcão de colocar os itens na tela como um array =
/*
{users.map((user) => (
  <div>
    <p>{user.name}</p>  
    <p>{user.email}</p>  
    <p>{user.age}</p>  
  </div>
  ))}
*/
