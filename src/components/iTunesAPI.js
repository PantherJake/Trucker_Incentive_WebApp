export async function itunesApiRequestMedia(term, media) {
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
        const dataObj = JSON.stringify(data)
        console.log(data);
        return dataObj;
    } catch (error) {
        console.error(error);
    }
}
