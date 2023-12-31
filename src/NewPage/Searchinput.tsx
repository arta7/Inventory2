import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from './searchFilter';
import './styles.css';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';


interface DataType {
    list: [],
    PlaceHolder:"",value:"",onChange:null,setAllData:[],AllData:[],CurrentId:""
  }

const Searchinput  : React.FC<DataType> = ({ list,PlaceHolder="",value="",onChange,setAllData,AllData,CurrentId }) =>{
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  // click away listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, []);

  const handleClick = e => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  const handleChange = e => {
        console.log('E value : ',e.target.value)
        
     setSearchValue(e.target.value);
     const myNextList = [...AllData];
     const artwork = myNextList.find(
       a => a.Id == CurrentId
     );
     console.log('AllData : ',AllData)
     artwork.Name = e.target.value;
     setAllData(myNextList);
     
    if (!visible) {
      setVisible(true);
    }
  };

  const selectItem = item => {
    console.log('item : ',item)
    const myNextList = [...AllData];
    const artwork = myNextList.find(
      a => a.Id == CurrentId
    );
    console.log('AllData : ',AllData)
    artwork.Name = item.Title;
    artwork.Code = item.Code;
    artwork.UnitsRef = item.UnitRef;
    artwork.Units = item.UnitTitle;
    artwork.ProductId = item.Id
    setAllData(myNextList);
    setVisible(false);
  };

  const selectChange = e => {
    console.log(e.target.value);
    
  };
  return (
    <div className="container">
         <Auth.FormInput 
      type="text"
      placeholder={PlaceHolder}
      style={{ textAlign: 'center' }}
      value={value}
      onChange=
      //{onChange}
       {handleChange}
      onFocus={() => {
          // if (searchValue) {
        setVisible(true);
          // };
      }}
    />
      {/* </div> */}
     
      <div ref={dropdownRef} className={`dropdown ${visible ? 'v' : ''}`}>
      {visible &&(
          <ul>
            {!list && (
              <li key="zxc" className="dropdown_item">
            
              </li>
            )}
            {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
            {list &&
              searchFilter(searchValue, list).map(x => (
                <li
                  key={x.Id}
                  onClick={() => selectItem(x)}
                  className="dropdown_item"
                >
                  <div className="item_text1">{x.Title}</div>
                 
                </li>
              ))}
          </ul>
      )}
      </div>
    
    </div>
  );
};

export default Searchinput;
