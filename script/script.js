const toggleBtn = document.getElementById('toggleBtn');
const prefixSection = document.getElementById('prefixSection');
const postfixSection = document.getElementById('postfixSection');

toggleBtn.addEventListener('click', () => {
    prefixSection.classList.toggle('hidden');
    postfixSection.classList.toggle('hidden');
    
    toggleBtn.textContent = prefixSection.classList.contains('hidden') 
        ? 'Switch to Prefix' 
        : 'Switch to Postfix';
});