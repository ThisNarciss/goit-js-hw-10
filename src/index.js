import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  const inputVal = evt.target.value.trim();

  deleteRenderMarkUp();

  if (inputVal) {
    fetchCountries(inputVal)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (countries.length >= 2) {
          renderCountryList(countries);
          console.log(countries);
        }
        if (countries.length === 1) {
          renderCountryInfo(countries);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

function deleteRenderMarkUp() {
  listRef.innerHTML = '';
  infoRef.innerHTML = '';
}

function renderCountryList(countries) {
  const countriesMarkUp = countries
    .map(({ flags: { svg }, name: { common } }) => {
      return `<li><img src="${svg}" width=40><h2>${common}</h2></li>`;
    })
    .join('');
  listRef.innerHTML = countriesMarkUp;
}

function renderCountryInfo(countries) {
  const countriesMarkUp = countries
    .map(
      ({
        flags: { svg },
        name: { official },
        capital,
        population,
        languages,
      }) => {
        return `<img src="${svg}" width=150><h2>${official}</h2><p><b>Capital:</b> ${
          capital[0]
        }</><p><b>Population:</b> ${population}</p><p><b>Languages:</b> ${Object.values(
          languages
        )}</p>`;
      }
    )
    .join('');
  infoRef.innerHTML = countriesMarkUp;
}
