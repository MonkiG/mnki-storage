# MnkiStorage

MnkiStorage is a JavaScript library designed to extend the features provided by `LocalStorage` and `SessionStorage`, aiming to facilitate data handling and storage in web applications.

This project was created for educational purposes and as my first npm package, with the goal of learning about library development and contributing to the open-source community.

## Key Features

- **Feature Extension**: MnkiStorage adds additional functionalities to those offered by `LocalStorage` and `SessionStorage`, such as methods for getting storage length, removing items by key, getting all stored keys, etc.

- **Easy to Use**: MnkiStorage's API is simple and easy to understand, making it accessible even for beginners in JavaScript.


## Basic Usage

```javascript
import { MnkiLocal, MnkiSession } from '@monkig/mnki-storage';

// Create an instance of MnkiLocal to use localStorage
const localStore = new MnkiLocal();

// Store a value in localStorage
localStore.set({key: 'value'});

// Get a value from localStorage
const value = localStore.get('key');
console.log(value); // Output: {key: 'value'}

// Create an instance of MnkiSession to use sessionStorage
const sessionStore = new MnkiSession();

// Store a value in sessionStorage
sessionStore.set({key: 'value'});

// Get a value from sessionStorage
const value2 = sessionStore.get('key');
console.log(value2); // Output:  {key: 'value'}

// Set a complex object with nested data 
sessionStore.clear()
const complexObject = {
    key1: 'value1',
    key2: {
        subKey1: 123,
        subKey2: ['a', 'b', 'c'],
        subKey3: {
            nestedKey: true,
            nestedArray: [4, 5, 6],
            deeperNest: {
            innerKey1: 'innerValue1',
            innerArray: [
                { deepInnerKey1: null },
                { deepInnerKey2: 'deepInnerValue2' }
            ]
            }
        }  
    }
}

sessionStore.set(complexObject)
console.log(sessionStore.getData())

/*
 Output: 
    [
        {
            key2: {
                subKey1: 123,
                subKey2: ['a', 'b', 'c'],
                subKey3: {
                    nestedKey: true,
                    nestedArray: [4, 5, 6],
                    deeperNest: {
                    innerKey1: 'innerValue1',
                    innerArray: [
                        { deepInnerKey1: null },
                        { deepInnerKey2: 'deepInnerValue2' }
                    ]
                }
            }  
        }, 
        {
            key1: 'value1'
        }
    ]
*/
```

## Contribution

Contributions are welcome! If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push your changes (`git push origineature-name`).
5. Open a pull request.


## Todo

- Publish on NPM via GitHub Actions
- Handle Standard data structures: Set, Map, WeakSet, WeakMap
- Add before,after to the set method to get the data that was before or the data setted (this would be optional)