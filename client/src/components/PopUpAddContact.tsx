import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { CoordinateObject, MarkerType } from '../types/types';

type propsPopUpInfo = {
    visible: boolean,
    closePopUp: Function,
    coordinates: CoordinateObject | null,
    fctAdd: Function
}

const PopUpAddContact = ({ visible, closePopUp, coordinates, fctAdd }: propsPopUpInfo) => {
    const [errors, setErrors]: [string[], Function] = useState([]);
    const name = useRef<HTMLInputElement>(null);
    const desc = useRef<HTMLTextAreaElement>(null);
    const type = useRef<HTMLSelectElement>(null);
    const lat = useRef<HTMLInputElement>(null);
    const lng = useRef<HTMLInputElement>(null);

    const resetErrors = () => {
        setErrors([])
    }

    const handleClickSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: string[] = [];
        let latVal: number = parseFloat(lat.current?.value != undefined ? lat.current?.value : "x");
        let lngVal: number = parseFloat(lng.current?.value != undefined ? lng.current?.value : "x");
        if (!name || !desc || !type || !lat || !lng) {
            return;
        } else {
            if (name.current?.value === "") {
                newErrors.push("Vous devez choisir un nom.")
            }
            if (desc.current?.value === "") {
                newErrors.push("Vous devez choisir une description.")
            }
            if (type.current?.value === "") {
                newErrors.push("Vous devez choisir un type.")
            }
            if (type.current?.value !== "" && type.current?.value !== "entreprise" && type.current?.value !== "particulier" && type.current?.value !== "collectivite") {
                newErrors.push("Vous devez choisir un type de la liste. Petit hacker.")
            }
            if (isNaN(latVal)) {
                newErrors.push("Lattitude doit être un nombre !");
            }
            if (isNaN(lngVal)) {
                newErrors.push("Longitude doit être un nombre !");
            }
            if (latVal < -90 || latVal > 90) {
                newErrors.push("Lattitude doit être compris entre -90 et 90 !");
            }
            if (lngVal < -180 || lngVal > 180) {
                newErrors.push("Longitude doit être compris entre -90 et 90 !");
            }
        }
        console.log(newErrors)
        if (newErrors.length == 0) {
            let newMark: MarkerType = {
                id: -1,
                name: (name.current?.value) ? name.current?.value : "",
                description: (desc.current?.value) ? desc.current?.value : "",
                type: (type.current?.value) ? type.current?.value : "",
                longitude: lngVal,
                lattitude: latVal
            }
            fctAdd(newMark);
            closePopUp();
        } else {
            setErrors(newErrors);
        }
    }

    return (
        <Popup open={visible} onOpen={() => (resetErrors())} closeOnDocumentClick onClose={() => closePopUp()}>
            <div className='min-w-[200px] max-w-[500px] rounded-xl bg-[#f1f1f1] p-6 transition-all' >
                <h3 className='block text-center font-bold text-2xl bg-card_bg rounded-lg mb-6 p-3'>Add a contact</h3>
                {!coordinates && <p className='text-[#2c942c]'>Vous pouvez ajouter un contact en cliquant sur la carte pour renseigner automatiquement les coordonnées.</p>}
                <form className='relative' onSubmit={(e: React.FormEvent) => handleClickSubmit(e)}>
                    <table className='border-separate border-spacing-4 relative left-[50%] translate-x-[-50%] mt-3'>
                        <tbody>
                            <tr>
                                <td><label htmlFor="name">Name :</label></td>
                                <td><input ref={name} type="text" name='name' id='name' required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="description">Description :</label></td>
                                <td><textarea ref={desc} name='description' id='description' required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="type">Type : </label></td>
                                <td><select ref={type} name="type" id="pet-select" required>
                                    <option className='min-w-full' value="">Select a type</option>
                                    <option value="entreprise">Entreprise</option>
                                    <option value="particulier">Particulier</option>
                                    <option value="collectivite">Collectivité</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="lat">Lattitude :</label></td>
                                <td><input ref={lat} type="text" name='lat' defaultValue={coordinates !== null ? coordinates['lat'] : ''} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="lng">Longitude :</label></td>
                                <td><input ref={lng} type="text" name='lng' defaultValue={coordinates !== null ? coordinates['lng'] : ''} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" className='h-6 w-32 left-[50%] translate-x-[-50%] mt-9 relative bg-button px-[15px] rounded-[12px] font-bold transition-all hover:bg-button_hover hover:shadow-btn_shadow text-[#f3ffcf]'>Add</button>
                </form>
                <div className='mt-8'>
                    {errors.length != 0 && errors.map((value: string) => {
                        return (<p className='font-bold text-[#ff0000] mb-5 text-center'>{value}</p>)
                    })}
                </div>
            </div>

        </Popup>
    );
};

export default PopUpAddContact;