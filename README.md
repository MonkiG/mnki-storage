# MnkiStorage

MnkiStorage is a JavaScript library designed to extend the features provided by `LocalStorage` and `SessionStorage`, aiming to facilitate data handling and storage in web applications.

This project was created for educational purposes and as my first npm package, with the goal of learning about library development and contributing to the open-source community.

## Key Features

- **Feature Extension**: MnkiStorage adds additional functionalities to those offered by `LocalStorage` and `SessionStorage`, such as methods for getting storage length, removing items by key, getting all stored keys, etc.

- **Easy to Use**: MnkiStorage's API is simple and easy to understand, making it accessible even for beginners in JavaScript.


## Basic Usage

```javascript
import { MnkiLocal, MnkiSession } from 'mnki-storage';

// Create an instance of MnkiLocal to use localStorage
const localStore = new MnkiLocal();

// Store a value in localStorage
localStore.set('key', 'value');

// Get a value from localStorage
const value = localStore.get('key');
console.log(value); // Output: 'value'

// Create an instance of MnkiSession to use sessionStorage
const sessionStore = new MnkiSession();

// Store a value in sessionStorage
sessionStore.set('key', 'value');

// Get a value from sessionStorage
const value2 = sessionStore.get('key');
console.log(value2); // Output: 'value'
```

## Contribution

Contributions are welcome! If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push your changes (`git push origineature-name`).
5. Open a pull request.


## Todo

- Publish on NPM: Just as I mentioned before, I would like to publish this package on NPM. However, I'm still in the process of learning how to do it and it will be there soon.

- Handle Standard data structures: Set, Map, WeakSet, WeakMap
- Add before,after to the set method to get the data that was before or the data setted (this would be optional)