const setIcon = (condition_slug) => {
    switch (condition_slug) {
        case "clear_day":
            return Skycons.CLEAR_DAY;
        case "clear_night":
            return Skycons.CLEAR_NIGHT; 
        case "cloudly_day":
         return Skycons.PARTLY_CLOUDY_DAY;
        case "cloudly_night":
            return Skycons.PARTLY_CLOUDY_NIGHT;
        case "cloud":
            return Skycons.CLOUDY;
        case "rain":
            return Skycons.RAIN;
        case "hail":
            return Skycons.SLEET;
        case "snow":
            return Skycons.SNOW;
        case "storm":
            return Skycons.RAIN;
        case "fog":
            return Skycons.FOG;
    }
}