const apiConfig = {
    baseURL: "https://api.themoviedb.org/3/",
    apiKey: "e99fca9c769513c653a9cf740c04a492",
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`, 
};

export default apiConfig;