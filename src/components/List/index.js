import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";


export default function ListComponent(){
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
         // const collectionRef = collection(db,'todoList');
         // const snapshot = await collectionRef.get();
         // const firebaseData = snapshot.docs.map(doc => doc.data());
         // setData(firebaseData);
         const querySnapshot = await getDocs(collection(db, "todoList"));
         querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         console.log(doc.id, " => ", doc.data());
         });
       };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

