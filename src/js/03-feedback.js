
import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = "feedback-form-state";
let dataStorage = {email: '', message: ''};

function clearForm(event) {
    event.preventDefault();

    if (formElement.elements.email.value === '' && formElement.elements.message.value === '') {
        return;
    }

    dataStorage.email = formElement.elements.email.value;
    dataStorage.message = formElement.elements.message.value;

    console.log('Submit data: ', dataStorage);

    localStorage.removeItem(LOCALSTORAGE_KEY);
    formElement.reset();
}

function saveDataInput(event) {
    const keyLocalStorage = event.target.name;
    const valueLocalStorage = event.target.value;

    dataStorage[keyLocalStorage] = valueLocalStorage;
    console.log(dataStorage);

    save(LOCALSTORAGE_KEY, dataStorage);
}

const load = key => {
    try {
        let dataRestore = localStorage.getItem(key);
        return dataRestore === null ? undefined : JSON.parse(dataRestore);
    } catch (error) {
        console.error(error.name, error.message);
    }
};

const save = (key, value) => {
    try {
        // console.log('save value:', value);
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error.name, error.message);
    }
};

const dataFormInit = load(LOCALSTORAGE_KEY);

if (dataFormInit) {
    console.log(dataFormInit);
    const { email, message } = dataFormInit;

    dataStorage.email = email;
    dataStorage.message = message;

    formElement.elements.email.value = email;
    formElement.elements.message.value = message;
    
    formElement.addEventListener('input', throttle(saveDataInput, 500));
} else {
    formElement.addEventListener('input', throttle(saveDataInput, 500));  
}

formElement.addEventListener('submit', clearForm);