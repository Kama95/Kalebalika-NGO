console.log("JavaScript is working")

  //function to display modal when button is clicked
function displayDonateModal (){
 let donateModal = document.getElementById("donationModal")
 donateModal.style.display = "flex";
}


//add event listener to button
document.addEventListener('DOMContentLoaded', function(){
    let donateButton=document.getElementById('donateButton');
    donateButton.addEventListener('click', displayDonateModal)   
})

function closeModal(){
    let donateModal = document.getElementById('donationModal')
    donateModal.style.display= "none";
    console.log("Button has been clicked");
}

document.addEventListener('DOMContentLoaded', function(){
    let closeModalButton =document.getElementById('closeModal')
    closeModalButton.addEventListener('click', closeModal);
});