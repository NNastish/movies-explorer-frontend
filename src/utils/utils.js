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

export { isHeaderFooterVisible, findEndPoint, sleep };
