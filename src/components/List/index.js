import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, doc, setDoc, getDocs, serverTimestamp } from "firebase/firestore";
import Card from '../Card'

export default function ListComponent({data}){
  
  return (
    <div>
      {data.map((item) => (
        <Card item={item}/>
      ))}
    </div>
  );
}

