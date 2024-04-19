class NewsDTO {
    constructor(
        {
            id,
            image_url,
            name,
            news_url,
            rating,
            source_site,
            value
        }
    ) {
        this.id = id;
        this.image_url = image_url;
        this.name = name;
        this.news_url = news_url;
        this.rating = rating;
        this.source_site = source_site;
        this.value = value;
    }
}
export default NewsDTO;