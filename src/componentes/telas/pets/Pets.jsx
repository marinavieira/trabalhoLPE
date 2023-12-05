import { useState, useEffect } from "react";
import PetsContext from "./PetsContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from '../../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import { deletePetsFirebase, addPetsFirebase, updatePetsFirebase, getPetsUIDFirebase } from '../../servicos/PetsService';
import { Navigate } from "react-router-dom";

function   Pets() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "", titulo: "", texto: "", tipo: "", url: "",
        uid: user?.uid, usuario: user?.displayName, email: user?.email
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: "", titulo: "", texto: "", tipo: "", url: "",
            uid: user?.uid, usuario: user?.displayName, email: user?.email
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                await updatePetsFirebase(objeto);
                setAlerta({ status: "success", message: "Pet atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o Pet:" + err });
            }
        } else { // novo 
            try {
                setObjeto(await addPetsFirebase(objeto));
                setEditar(true);
                setAlerta({ status: "success", message: "Pet criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o pet:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deletePetsFirebase(objeto);
                setAlerta({ status: "success", message: "Pet removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }


    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getPetsUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, [user]);

    if (user) {
        return (
            <PetsContext.Provider value={{
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                remover,
                objeto, setObjeto,
                editarObjeto, novoObjeto, acaoCadastrar,
                handleChange, abreDialogo, setAbreDialogo
            }}>
                <Carregando carregando={carregando}>
                    <Tabela />
                </Carregando>
                <Form />
            </PetsContext.Provider>
        )
    } else {
        return <Navigate to="/" />;
    }

}

export default Pets;