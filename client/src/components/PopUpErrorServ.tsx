import React from 'react';
import Popup from 'reactjs-popup';

type propsPopUpErrorServ = {
    message: string,
    closable: boolean,
    closePopUpErrorServ:Function
}

const PopUpErrorServ = ({ message, closable, closePopUpErrorServ}: propsPopUpErrorServ) => {
    return (
        <Popup open={true} onClose={() => closePopUpErrorServ()} closeOnDocumentClick={closable}>
            <div className='min-w-[300px] h-14 text-center text-[red] font-bold'>
                <h3 className='bg-card_bg h-7 block'>Error serv</h3>
                <p className='block bg-[#f1f1f1]  w-[100%]'>
                    {message}
                </p>
            </div>
        </Popup>
    );
};

export default PopUpErrorServ;