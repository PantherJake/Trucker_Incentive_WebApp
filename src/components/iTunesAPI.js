export const mediaTypes = [
    "movie",
    "podcast",
    "music",
    "musicVideo",
    "audiobook",
    "shortFilm",
    "tvShow",
    "software",
    "ebook",
    "all",
];

export async function itunesApiRequestSong(term, media = "music") {
    const url = new URL("https://itunes.apple.com/search");
    const params = {
        country: "US",
        lang: "en_us",
        explicit: "no",
        limit: 50,
        term,
        media,
    };
    try {
        url.search = new URLSearchParams(params);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function itunesApiRequestMovie(term, media = "movie") {
    const url = new URL("https://itunes.apple.com/search");
    const params = {
        country: "US",
        lang: "en_us",
        explicit: "no",
        limit: 50,
        term,
        media,
    };
    try {
        url.search = new URLSearchParams(params);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}