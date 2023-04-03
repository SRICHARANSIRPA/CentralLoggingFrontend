import React, { useState } from 'react';


function InputWithDropdown() {
  const [selectedOption, setSelectedOption] = useState('Option 1');
 const [showsecondpage,setShowsecondpage]=useState(false)

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Selected option: ${selectedOption}`);
    setShowsecondpage(true)
    // Do whatever you want to do with the selected option here
    // Change the URL to '/new-page'
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dropdown">Select an option:</label>
        <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
        </select>
      </div>
      {showsecondpage&&(
 <div>
 <label htmlFor="dropdown2">Select an option:</label>
 <select id="dropdow2n" value={selectedOption} onChange={handleOptionChange}>
   <option value="Option 12">Option 12</option>
   <option value="Option 22">Option 22</option>
 </select>
</div>
      )}
     
      

      <button type="submit">Submit</button>
      

      
    </form>
  );
}

export default InputWithDropdown;
