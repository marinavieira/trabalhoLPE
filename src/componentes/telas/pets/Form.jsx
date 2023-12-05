import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PostsContext from "./PetsContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(PostsContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtNome" label="Nome"
                    tipo="text" name="nome" value={objeto.nome}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Titulo OK"
                    msginvalido="Informe o título" />
                <CampoEntradaTexto id="txtRaca" label="Raça"
                    rows={5}
                    tipo="text" name="raca"
                    value={objeto.raca}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Raça OK"
                    msginvalido="Informe a Raça" />
                <CampoEntrada id="txtIdade" label="idade"
                    tipo="text" name="idade"
                    value={objeto.idade}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Idade OK"
                    msginvalido="Informe a idade" />
                <CampoEntrada
                    id="selectPeso" label="Peso"
                    idLabel="labelPeso"
                    tipo="text" name="peso" value={objeto.peso}
                    onchange={handleChange} requerido={false}
                    msgvalido="Peso OK"
                    msginvalido="Informe o Peso">                                    
                </CampoEntrada>
            </Dialogo>
        </>
    )

}

export default Form;