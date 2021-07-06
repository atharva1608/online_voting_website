import React,{useState} from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
   const [fullname,setFullname]=  useState("");
   const [aadharcardno,setAadharCardNo] = useState("");
   const [voterid,setVoterId]= useState("");
   const [mobilenumber,setMobileNumber] = useState("");
   const [otp, setOtp] = useState(new Array(6).fill(""));

   function validateForm() {
    if(!fullname){
      alert("Please enter your name")
    }
    if(!aadharcardno){
        alert("Please enter your valid email")
      }
      if(!voterid){
        alert("Please enter your Mobile Number")
      }   
    if(!mobilenumber){
      alert("Please enter your Mobile Number")
    }    
    
};

function handleSubmit (event) {
    event.preventDefault();
    validateForm();
    const voter = {
      fullname: fullname,
      aadharcardno: aadharcardno,
      voterid: voterid,
      mobilenumber: mobilenumber,
     }
      axios.post('http://localhost:8080/api/voter',voter)
      .then(response =>{
        if(response.data.error==='Voter not found!!! Please enter correct name as per Aadhar Card to vote')
        {
          alert("Please enter correct name as per Aadhar Card to Vote")
        }
        else if(response.data.error==='Voter not found!!! Please enter correct aadhar card number to vote'){
          alert("Please enter correct Aadhar Card Number to Vote")
        }
        else if(response.data.error==='Voter not found!!! Please enter correct voter id number to vote'){
          alert("Please enter correct Voter Id to Vote")
        }
        else if(response.data.error==='Voter not found!!! Please enter correct mobile number to vote'){
          alert("Please enter correct mobile number to vote and to verify OTP")
        }
        else{
          alert("Please Verify OTP send on your Mobile Number")
          console.log(response.data)
        }
      })
      .catch(error=>console.log(error))
       
}

const handleChange = (element,index) =>{
if(isNaN(element.value)) return false;
setOtp([...otp.map((d,idx) =>(idx ===index) ? element.value : d)]);

if(element.nextSibling){
  element.nextSibling.focus()
}
}

function verifyOtp (event) {
  event.preventDefault()
  const otpVerify = {
    mobilenumber: mobilenumber,
    otp : otp.join("")
  }
  axios.post('http://localhost:8080/api/verify',otpVerify)
  .then(response =>{
    alert("User is Verified!!!")
    console.log(response.data)
    window.location = '/votingpage'
  })
  .catch(error=>console.log(error))
}

    return(
        <>
      
        <form className='form'>
        
          <div className='form-control'>
            
          <div class="signuptext">Full Name *</div>
         
         
                  <label htmlFor="username"></label>
                  <input 
                  class="inputtext"
                  type='text' 
                  id='fullname' 
                  name='fullname'
                  required='required'
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}>

                  </input>
                </div>
               
                <div className='form-control'>
                <div  class="signuptext1">Aadhar Card Number *</div>
                  <label htmlFor="aadharcardno"> </label>
                  <input 
                   class="inputtext"
                  type='text'
                   id='aadharcardno' 
                   name='aadharcardno'
                   required='required'
                   value={aadharcardno}
              onChange={(e) => setAadharCardNo(e.target.value)}>

                   </input>
                </div>
                
                <div className='form-control'>
                <div class="signuptext2">Voter ID *</div>
                  <label htmlFor="voterid"></label>
                  <input 
                   class="inputtext"
                  type='text'
                   id='voterid' 
                   name='voterid'
                   required='required'
                   value={voterid}
              onChange={(e) => setVoterId(e.target.value)}>

                   </input>
                </div>
                
                <div className='form-control'>
                <div class="signuptext3">Mobile Number *</div>
                  <label htmlFor="mobilenumber"></label>
                  <input
                   class="inputtext" 
                  type='text'
                   id='mobilenumber' 
                   name='mobilenumber'
                   required='required'
                   value={mobilenumber}
              onChange={(e) => setMobileNumber(e.target.value)}>

                   </input>
                </div>
              <div>
                Press Continue to get OTP
              </div>
              <div>
                Fill OTP
                </div>
                {otp.map((data,index) =>{
                  return(
                    <input
                    className="otp-field"
                    type="text"
                    name = "otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={e =>handleChange(e.target,index)}
                    onFocus={e => e.target.select()}
                    ></input>
                  )
                })}

                <div>
                  <button type="submit" class="submitbtn" onClick={verifyOtp}>Verify OTP</button>
                </div>

                <div>
                 <button type="submit" class="submitbtn" onClick={handleSubmit}>Continue</button>
                </div>
          </form>
        </>
    );
}

export default Login