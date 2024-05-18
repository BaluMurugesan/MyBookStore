import React, {createContext, useState} from 'react';

const ArrayContext = createContext();

const ArrayProvider = ({children}) => {
  const [dataArray, setDataArray] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');

  const addItem = item => {
    setDataArray(prevArray => [...prevArray, item]);
  };
  const removeItem = index => {
    setDataArray(prevArray => prevArray.filter((_, i) => i !== index));
  };

  return (
    <ArrayContext.Provider value={{dataArray, addItem, removeItem}}>
      {children}
    </ArrayContext.Provider>
  );
};

export {ArrayContext, ArrayProvider};
