import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, doc, setDoc, getDocs, serverTimestamp } from "firebase/firestore";
import Card from '../Card'

export default function ListComponent({data, concluded}){
  let dataFil = (item) =>{

  }
  return (
    <div>
      {data.map((item) => (
        item.concluded === concluded ?

        <Card item={item}/>
        :<></>
      ))}
    </div>
  );
}

