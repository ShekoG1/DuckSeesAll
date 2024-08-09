let viewedPasswordCount = 0;

document.getElementById('view-passwords').addEventListener('click', async () => {
  if(viewedPasswordCount == 0){
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: togglePasswordVisibility,
    });
    viewedPasswordCount++;
  }else{
    alert("You can only view passwords once per session. Please refresh the page to view passwords again.");
  }
});

function togglePasswordVisibility() {
  const passwordFields = document.querySelectorAll('input[type="password"]');

  passwordFields.forEach(field => {
    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'View';
    toggleButton.style.padding = '5px';
    toggleButton.style.marginLeft = '5px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.backgroundColor = '#FFA500';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '3px';

    toggleButton.addEventListener('click', () => {
      field.type = field.type === 'password' ? 'text' : 'password';
    });

    field.parentNode.insertBefore(toggleButton, field.nextSibling);
  });
}
