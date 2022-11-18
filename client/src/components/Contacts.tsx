import React, { useState, useRef } from 'react';
import { GrUserWorker } from 'react-icons/gr'
import { BsFillPeopleFill } from 'react-icons/bs'
import { CgCommunity } from 'react-icons/cg'
import { ImCross } from 'react-icons/im'
import PopUpInfo from './PopUpInfo';

type contactsProp = {
    name: string,
    type: string,
    id: number,
    openPopUp: Function,
    removeContact: Function
}

const getLogo = (type: string) => {
    switch (type) {
        case 'entreprise': return (<GrUserWorker className='ml-2' />)
        case 'particulier': return (<BsFillPeopleFill className='ml-2' />)
        case 'collectivite': return (<CgCommunity className='ml-2' />)
    }
}



const Contacts = ({ name, type, openPopUp, removeContact, id }: contactsProp) => {
    const [isPopUpInfoOpen, setPopUpInfoOpen] = useState(false);
    // const popUp: React.MutableRefObject<any> | null = useRef(null);


    return (
        <div onClick={() => openPopUp(name)} className={`w-[80%] flex shrink-0 h-9 bg-card_bg rounded-lg items-center justify-around cursor-pointer`}>
            {getLogo(type)}
            <h2 className='block grow ml-2'>{name}</h2>
            <ImCross className='mr-2' onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                removeContact(id)
            }} />
        </div>
    );
};

export default Contacts;