import React, { useState } from 'react'
// import axios from 'axios';
import { useNavigate } from 'react-router';


const Form = () => {

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [donation, setDonation] = useState()
  const [amount, setAmount] = useState()

  const navigate = useNavigate();
  // const navigateToPage = useNavigate();

  const handleSubmit = async (eventValue) => {
    eventValue.preventDefault();
    // axios.post('http://localhost:3001/donation-form', { firstName, lastName, email, phone, address, donation, amount })
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err))
    try {
      let data = await fetch('http://127.0.0.1:3001/donation-form', { method: "POST",headers:{"Content-Type": "application/json"}, body: JSON.stringify({ firstName, lastName, email, phone, address, donation, amount }) })
      console.log(data); 
    }
    catch(error) {
      console.log(error);
    }
  }

  //For quantity
  const [quantity,setQuantity] = useState(0)
  const minQuantity = (event) => {
    let q=event.target.value;
    setQuantity(q);
    
  }

  const handleQuantity = (event) => {
    if( quantity < 15 ){
        alert("Quantity Should be more then 15")
        event.preventDefault();
      }
      else
      {
        alert("Proceeding to Next Page")
        navigate("/NextPage")
      }
  }

  
  //For making choices in books ,clothes , shoes(pickup or courier)
  const [showChoice, setShowChoice] = useState("")
  const handleChoice = (e) => {
      setShowChoice(e.target.value)
  }


  const [mAmnt, setMinAmnt] = useState(0)
  const minAmnt = (eventMin) => {
    var amnt = eventMin.target.value;
    setMinAmnt(amnt)
    setAmount(amnt);

  }

  const [showhide, setShowHide] = useState("")

  

  const handleOnchange = (event) => {
    let value = event.target.value;
    setShowHide(value);
    setDonation(value);
    if (value !== "money") {
      setAmount(0); // Reset the amount state if donation type is not 'money'
    }
  }

  const handleMinAmount = (event) => {

    if (showhide === "money" && mAmnt <= 250) {
      alert("Money less then 250");
      event.preventDefault(); // This will prevent the form from being submitted

    }

    else if (showhide === "money" && mAmnt > 250) {
        alert("Proceeding To NextPage")
        // navigate("/NextPage")
      }
    else if (showhide === "shoes" || showhide === "clothes" || showhide === "books") {
          alert("Proceeding To NextPage");
          // navigateToPage("/NextPageCP")
        }



  }

  return (
    <>
      <div className="container">
        <h2>Donation Form</h2>
        <form id="donationForm" method="post" action="/submit-donation" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="name" name="firstName" onChange={(e) => setFirstName(e.target.value)} required />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="name" name="lastName" onChange={(e) => setLastName(e.target.value)} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="phone">Phone:</label>
          <input type="number" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)} required />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)} required />

          <label htmlFor="items">Select the donation:</label>
          <select name="donation" id="donation" onChange={handleOnchange}  >
            <option value="Select">Select the Donation</option>
            <option value="books">Books</option>
            <option value="clothes">Clothes</option>
            <option value="money">Money</option>
            <option value="shoes">Shoes</option>
          </select>
          <br />

          {
            showhide === "money" && (
              <div className="amount">
                <label htmlFor="Amount">Amount:</label>
                <input type="number" id='amount' name='amount' placeholder='Amount Should be greater Then 250' onChange={minAmnt} />
                <button type="submit" id="submitButton" onClick={(event) => handleMinAmount(event)}>Proceed to Payment</button>
              </div>
            )
          }

          {
            (showhide === "books" || showhide === "clothes" || showhide === "shoes") &&
            (
              <>
                <label htmlFor="choice">Make a choice:</label><br /><br />
                <input type="radio" name="choice" value="pickup" onChange={handleChoice}/>Pickup &nbsp; &nbsp; &nbsp; 
                <input type="radio" name="choice" value="courier" onChange={handleChoice} />Courier <br />
                {
                    showChoice==="pickup" && (
                      <>
                        <label htmlFor="qunatity">Quantity:</label><br />
                        <input type="number" name='pickup' id="pickup" placeholder='Number should be more then 15' onChange={minQuantity} />
                        <button type="submit" id="submitButton" onClick={handleQuantity}>Proceed to Next Page</button>
                        
                      </>
                    )
                }
                {
                    showChoice==="courier" && (
                      <>
                        <button type="submit" id="submitButton">Proceed to Next Page</button>
                      </>
                    )
                }
              </>
            )
          }


          {/* <button type="submit" id="submitButton" onClick={(event) => handleMinAmount(event)}>Proceed to Next Page</button> */}
        </form>

      </div>
    </>
  )
}

export default Form