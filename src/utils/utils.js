/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { FOOTER_HEADER_ENDPOINTS, HOURS_BETWEEN_LOCALSTORAGE_UPDATE, YANDEX_API_URL } from './constants';

const findEndPoint = (currentLocation) => {
  const pathName = currentLocation.pathname;
  const lastSlashIndex = pathName.lastIndexOf('/');
  return pathName.substr(lastSlashIndex);
};

const isHeaderFooterVisible = (currentLocation, setVisibility) => {
  const endPoint = findEndPoint(currentLocation);
  if (FOOTER_HEADER_ENDPOINTS.includes(endPoint)) {
    setVisibility(true);
  } else {
    setVisibility(false);
  }
};

const defineImageLink = (isSavedRoute, film) => (isSavedRoute ? film?.image : `${YANDEX_API_URL}${film?.image?.url}`);

const defineTrailerLink = ({ trailer }) => (trailer || 'https://youtube.com');

const defineIsMovieLiked = (card, savedMoviesId) => {
  if (card.id) {
    return savedMoviesId.some((element) => element === card.id);
  }
};

const defineMovieQuantityParams = ({ windowWidth }) => {
  if (windowWidth <= 480) {
    return { initialQuantity: 5, addQuantity: 2 };
  }
  if (windowWidth <= 768) {
    return { initialQuantity: 8, addQuantity: 2 };
  }
  return { initialQuantity: 12, addQuantity: 3 };
};

const showError = (error) => {
  alert(`Error: ${error}`);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getFilmsFilteredByKey(key, films) {
  if (!films || !key.length) {
    return;
  }
  return films.filter((film) => {
    const hasKeyInRussianName = film?.nameRU && film?.nameRU.includes(key);
    const hasKeyInEnglishName = film?.nameEN && film?.nameEN.includes(key);
    const hasKeyInDescription = film?.description.includes(key);
    if (hasKeyInDescription || hasKeyInEnglishName || hasKeyInRussianName) {
      return film;
    }
  });
}

function getFilmsFilteredByDuration(timeLimit, filmFilteredByKey) {
  if (!filmFilteredByKey) {
    return;
  }
  return filmFilteredByKey.filter((film) => film.duration <= timeLimit);
}

function parseFilmDurationToView({ duration }) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  }
  return `${minutes}м`;
}

const isLocalStorageEmpty = () => {
  const updateTime = localStorage.getItem('updateTime');
  const beatFilms = localStorage.getItem('beatFilms');
  return !updateTime || !beatFilms;
};

const timeLocalStorageExpired = () => {
  const actualTime = new Date();
  const updateTime = localStorage.getItem('updateTime');
  const hoursDifference = (actualTime.getTime() - updateTime) / (1000 * 60 * 60);
  return hoursDifference > HOURS_BETWEEN_LOCALSTORAGE_UPDATE;
};

const checkIfShouldBeUpdated = () => isLocalStorageEmpty() || timeLocalStorageExpired();

export {
  isHeaderFooterVisible, findEndPoint, sleep,
  getFilmsFilteredByDuration, getFilmsFilteredByKey,
  parseFilmDurationToView, showError, checkIfShouldBeUpdated,
  defineImageLink, defineIsMovieLiked, defineTrailerLink,
  defineMovieQuantityParams,
};
