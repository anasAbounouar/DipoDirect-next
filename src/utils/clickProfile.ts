export const clickOnProfilePhoto = () => {
  // Select the element directly by its unique ID
  const profileButton = document.getElementById('react-aria-:Rdekq:');

  // Check if the element exists
  if (profileButton) {
    // Perform the click action
    profileButton.click();
  } else {
    console.log('Profile button not found');
  }
};
