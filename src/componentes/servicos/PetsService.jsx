import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

export const getPetsFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'pets'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                raca: doc.data().raca,
                idade: doc.data().idade,
                peso: doc.data().peso,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getPetsUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "pets");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                raca: doc.data().raca,
                idade: doc.data().idade,
                peso: doc.data().peso,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deletePetsFirebase = async objeto => {
    try {
        const petDocRef = doc(db, 'pets', objeto.id)
        await deleteDoc(petDocRef);
    } catch (err) {
        throw err;
    }
}

export const addPetsFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'pets'),
            {
                nome: objeto.nome,
                raca: objeto.raca,
                idade: objeto.idade,
                peso: objeto.peso,
                uid: objeto.uid,
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updatePetsFirebase = async objeto => {
    try {
        const petDocRef = doc(db, 'pets', objeto.id)
        await updateDoc(petDocRef, {
            nome: objeto.nome,
            raca: objeto.raca,
            idade: objeto.idade,
            peso: objeto.peso,
            uid: objeto.uid,
        })
    } catch (err) {
        throw err;
    }
}



