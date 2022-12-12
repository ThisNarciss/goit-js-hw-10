import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
const listRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  const inputVal = evt.target.value.trim();

  fetchCountries(inputVal)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.length >= 2 && countries.length <= 10) {
        listRef.innerHTML = '';
        renderCountries(countries);
      }
    })
    .catch(
      error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      // console.log(error)
    );
}

function renderCountries(countries) {
  const countriesMarkUp = countries
    .map(country => {
      return `<li>${country.name.official}</li>`;
    })
    .join('');
  listRef.innerHTML = countriesMarkUp;
}
// Ukraine
