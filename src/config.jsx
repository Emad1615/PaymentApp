export const config = {
    API_BASE_URL: "http://localhost:5190/api",
    // API_BASE_URL: process.env.REACT_APP_API_BASE_URL,  
};
export const arabicRegex = /^[\u0600-\u06FF0-9\s-=_)(*&^%$#@!]*$/;

export const englishRegex = /^[a-zA-Z0-9\s-=_)(*&^%$#@!]*$/;
