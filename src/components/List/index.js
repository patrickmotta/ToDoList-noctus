import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, doc, setDoc, getDocs, serverTimestamp } from "firebase/firestore";


export default function ListComponent(){
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "todoList"));
      const newData = [];

      querySnapshot.forEach((doc) => {
        const dc = doc.data();
        newData.push(dc);
      });

      setData(newData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item.title}</p>
      ))}
    </div>
  );
}

