const text = document.createElement('p');
text.innerText = 'this is the client-side';

document.querySelector('#svelte')?.appendChild(text);

export {};
