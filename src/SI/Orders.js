import React, { useState } from 'react';
import TableComponent1 from './TableComponent1';
import TableComponent2 from './TableComponent2';
import TableComponent3 from './TableComponent3';
import { useNavigate } from 'react-router-dom';
const DropdownTableSelector = () => {
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderSelectedTable = () => {
    switch (selectedOption) {
      case 'Option 1':
        return <TableComponent1 />;
      case 'Option 2':
        return <TableComponent2 />;
      case 'Option 3':
        return <TableComponent3 />;
      default:
        return null;
    }
  };
const handleadd=()=>{
    navigate('/OrdersPage');
}
  return (
    <div>
    <div>
      <h2>FIR Analysis</h2>
      <h2 style={{paddingLeft:"900px"}}>ADD FIR: <button onClick={handleadd}>ADD</button></h2>
    </div>
      <select value={selectedOption} onChange={handleChange}>
        <option value="Option 1">Un Traced</option>
        <option value="Option 2">Under Investigation</option>
        <option value="Option 3">Pending Trial</option>
      </select>
      <div>
        {renderSelectedTable()}
      </div>
    </div>
  );
};

export default DropdownTableSelector;
