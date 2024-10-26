import React from 'react';

function Dropdown({data, defaultValue, onChange, value, disabled}) {
  return (
    <div>
            <select className="selectBox" value={value} onChange={(e)=>onChange(e.target.value)} disabled={disabled}>
                <option value={""}>{defaultValue}</option>
                {data.map((option)=>(
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
    </div>
  )
}

export default Dropdown;