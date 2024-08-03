function runOnStart() {

    console.log("JavaScript is working")

    //global variables
     let donateModal =document.getElementById('donationModal');
     let donationForm = document.getElementById('donationForm');
     let closeModalButton =document.getElementById('closeModal')
     let donateButton=document.getElementById('donateButton');
     let confirmationMessage = document.getElementById('confirmationMessage')
     let signUpModal = document.getElementById('signUpModal')
     let signUpForm = document.getElementById('signUpForm')
     let signUpLink= document.getElementById('signUpLink')
     let closeSignUpModal = document. getElementById('closeSignUpModal')
      
      //function to display modal when button is clicked
    function displayDonateModal (){
     donateModal.style.display = "flex";
    }
    
    //add event listener to donate button
        
        donateButton.addEventListener('click', displayDonateModal)   
    
    //function to close modalS
    function closeModal(){
        donateModal.style.display= "none";
        signUpModal.style.display= "none";

        console.log("Button has been clicked");
        confirmationMessage.textContent = '';
    }
    
      closeModalButton.addEventListener('click', ()=>{
            closeModal();
        });    
    //event listener so that modal closes when click happens anywhere outside the modal
    window.addEventListener('click', function(event){
    if(event.target == donateModal || event.target == signUpModal){
            closeModal();
            signUpModal.style.display= "none";
        };
    });
    
    //handle form submission
    donationForm.addEventListener('submit', async function(event){
        event.preventDefault();
     console.log('form submission detected')
        //grab input values
        const donationAmount = document.getElementById('donationAmount').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const donorEmail =document.getElementById('donorEmail').value;
        const donationType = document.getElementById('donationType').value;
        const methodOfPayment = document.getElementById('paymentMethod').value;
        let phoneNumber = document.getElementById('phoneNumber').value;
        phoneNumber = parseInt(phoneNumber);

        console.log(donationAmount);
        console.log(firstName);
        console.log(donationType);
        console.log(methodOfPayment);
        console.log(typeof(phoneNumber));
        
    
        //validate form
        if (donationAmount > 0 && firstName && lastName && 
            donorEmail && donationType && methodOfPayment &&
            Number.isInteger(phoneNumber)){
                console.log("All forms filled in");
           try{
            const response = await fetch('http://localhost:3000/donate',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({firstName:firstName,
                    lastName:lastName,
                    email:donorEmail,
                    amount:donationAmount,
                    phone:phoneNumber,
                    donationType:donationType,
                    paymentMethod:methodOfPayment
                })
            });
            const data = await response.json();

            if (response.ok)
            {
                confirmationMessage.textContent = `Thank you ${firstName} ${lastName} for your generous donation`;
          donationForm.reset();
    
        } else{
            confirmationMessage.textContent=`There was an issue processing your request. Please try again`;
         }
            }
            catch(error){
             confirmationMessage.textContent ='There was an issue processing your request. Please try again';
            }
           } else {
            confirmationMessage = 'Please fill in our all details correctly'
           }
        })

        //Sign Up Feature Implementention
    

             //Display sign up form
        signUpLink.addEventListener('click', ()=>{
               signUpModal.style.display ='flex';
        })
              //close sign up form
        closeSignUpModal.addEventListener('click', ()=>{
            console.log ('This "x" was clicked');
            signUpModal.style.display= "none";
        })

        //Handle sign up Form inputs
        signUpForm.addEventListener('submit', async function(event){
            event.preventDefault();
         const userFirstName = document.getElementById('userFirstName').value;
         const userLastName = document.getElementById('userLastName').value;
         const userEmail = document.getElementById('userEmail').value;
         const password = document.getElementById('pwd').value;
         const passwordConfirm = document.getElementById('pwdConfirmation').value;
         let confirmationMessage = document.getElementById('SignUpConfirmationMessage');

          //validate Form data

          if( userFirstName && userLastName && userEmail && password == passwordConfirm){
              try{
                const response = await fetch ('http://localhost:3000/signup', {
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        firstName:userFirstName,
                        lastName:userLastName,
                        email:userEmail,
                        password:password
                    })
                });
                 const data = await response.json();
                 if (response.ok)
                 {confirmationMessage.textContent = 'Sign up successful!';
                    signUpForm.reset();
                   }else {
                    confirmationMessage.textContent ='There was an issue processing your request. Please try again';
                   }
              } catch(error){
                confirmationMessage.textContent = 'There was an issue processing your request. Please try again'
              }
              
            
          } else if (password!=passwordConfirm){
            confirmationMessage.textContent='Passwords do not match';
            password.textContent='';
            passwordConfirm.textContent='';
            console.log('Passwords do not match')
          } else{
            console.log('Please fill in all details correctly')
          }


        
        
        
        
        })





    }
if(document.readyState !== 'loading') {
runOnStart();
}
else {
document.addEventListener('DOMContentLoaded', function () {
    runOnStart()
});
}


