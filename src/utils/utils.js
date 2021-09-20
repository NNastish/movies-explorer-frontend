import {FOOTER_HEADER_ENDPOINTS} from "./constants";

const handleLocation = (currentLocation, setVisibility) => {
    const pathName = currentLocation.pathname;
    const lastSlashIndex = pathName.lastIndexOf('/');
    const endPoint = pathName.substr(lastSlashIndex);
    if (FOOTER_HEADER_ENDPOINTS.includes(endPoint)) {
        setVisibility(true);
    } else {
        setVisibility(false);
    }
}

export { handleLocation };
