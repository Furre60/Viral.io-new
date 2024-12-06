// Wait for the DOM to fully load before accessing elements
document.addEventListener("DOMContentLoaded", () => {
  // Get the element
  const myButton = document.getElementById('myButton');
  
  // Check if the element exists
  if (myButton) {
    // Add event listener to button
    myButton.addEventListener('click', () => {
      alert("Button clicked!");
    });
  } else {
    console.error("Button not found");
  }
});
