import React from 'react';
import Popup from 'reactjs-popup';
import { MarkerType } from '../types/types';

type propsPopUpInfo = {
    visible:boolean,
    marksData:MarkerType[],
    infoPopUp:string,
    closePopUp: Function
}


const PopUpInfo = ({visible, marksData, infoPopUp, closePopUp}:propsPopUpInfo) => {

    
      const getInfoPopUp = () => {
        let markData: MarkerType | null = null;
        for (const data of marksData) {
          if (data.name === infoPopUp) {
            console.log("found")
            markData = data;
            break;
          }
        }
        if (markData !== null) {
          return (
            <div className=' text-button '>
                <h3 className='block text-center font-bold text-2xl bg-card_bg rounded-lg mb-6 p-3'>{markData['name']}</h3>
    
              <p><span className='font-bold'>Description : </span>{markData['description']}</p>
              <p><span className='font-bold'>Type : </span>{markData['type']}</p>
              <p><span className='font-bold'>Coordonnées : </span>{'{'+markData['longitude']+','+ markData['lattitude']+'}'}</p>
            </div>
          )
        } else {
          return (
            <div>
              <p>ERROR</p>
            </div>
          )
        }
      }

    return (
        <Popup open={visible} closeOnDocumentClick onClose={() => closePopUp()}>
        <div className='min-w-[200px] rounded-xl bg-[#f1f1f1] p-6 transition-all' >
          {getInfoPopUp()}
        </div>
      </Popup>
    );
};

export default PopUpInfo;