import React, { useState, useRef, useEffect } from 'react';
import { searchFilter } from './searchFilter';
import './styles.css';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';


interface DataType {
    list: [],
    PlaceHolder:"",value:"",onChange:null,setvalue:null,setId:null,setAllData:null
  }

const SearchinputKardex  : React.FC<DataType> = ({ list,PlaceHolder="",value="",setvalue,setId,setAllData }) =>{
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

        setvalue(e.target.value);
        
     
    if (!visible) {
      setVisible(true);
    }
  };

  const selectItem = item => {
    console.log('item : ',item)
        setvalue(item.Title)
        setId(item.Id)
        setAllData([])
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
      onChange={handleChange}
       
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

export default SearchinputKardex;
