import {FOOTER_HEADER_ENDPOINTS} from "./constants";

const isHeaderFooterVisible = (currentLocation, setVisibility) => {
    const endPoint = findEndPoint(currentLocation);
    if (FOOTER_HEADER_ENDPOINTS.includes(endPoint)) {
        setVisibility(true);
    } else {
        setVisibility(false);
    }
}

const findEndPoint = (currentLocation) => {
    const pathName = currentLocation.pathname;
    const lastSlashIndex = pathName.lastIndexOf('/');
    return pathName.substr(lastSlashIndex);
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
    } else {
        return `${minutes}м`;
    }
}

export { isHeaderFooterVisible, findEndPoint, sleep,
    getFilmsFilteredByDuration, getFilmsFilteredByKey,
parseFilmDurationToView};
