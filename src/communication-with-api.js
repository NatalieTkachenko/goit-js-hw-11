const axios = require( 'axios' ).default;

const API_KEY = '30786866-3f5d93462a7f9cfec75d687d6';
const BASE_URL = 'https://pixabay.com/api/';


export default class RequestToServer
{
    constructor ()
    {
        this.requestedData = '';
        this.page = 1;
        this.hitsCount = 40;
    }

    async sendRequestToServer()
    {
        const url = `${BASE_URL}?key=${API_KEY}&q=${ this.requestedData }&image_type=photo&orientation=horizontal&safesearch=true&&per_page=40&page=${this.page}`;


        try {
            const response = await axios.get( url );
            this.page += 1;
            this.hitsCount += 40;
            return response;
        
            }
        
        catch ( error )
            {
            console.log( error );
            }
    }
    
    resetPage()
    {
        this.page = 1;
    }

    resetHitsCount()
    {
        this.hitsCount = 0;
    }

    set updateRequestedData( update )
    {
        this.requestedData = update;
    }

    get updateRequestedData()
    {
        return this.requestedData;
    }

    
}
