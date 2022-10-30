import { Notify } from 'notiflix/build/notiflix-notify-aio';
//const axios = require( 'axios' ).default;
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import GetFromApiService from './communication-with-api'

const getFromApiService = new GetFromApiService();





const form = document.querySelector( 'form' );
const submitBtn = document.querySelector( '[type = "submit"]' );
const input = document.querySelector( '[name="searchQuery"]' );
const galleryArea = document.querySelector( '.gallery' );
const loadMoreBtn = document.querySelector( '.load-more' );



console.log( form );
console.log( submitBtn );
console.log( input );
console.log( galleryArea );
console.log( loadMoreBtn );



form.addEventListener( 'submit', submitHandler );
loadMoreBtn.addEventListener( 'click', loadMoreHandler );

function submitHandler( event )

{
  event.preventDefault();

  getFromApiService.resetPage();
  galleryArea.innerHTML = '';


  const a = event.currentTarget.elements.searchQuery.value.trim();

  console.log( a );

  getFromApiService.updateRequestedData = a;
  console.log( getFromApiService );

  getFromApiService.sendRequestToServer().then( response =>

  {
     if ( response.data.totalHits === 0 )
     {
       
       Notify.failure( "Sorry, there are no images matching your search query. Please try again." );

       getFromApiService.resetHitsCount();



    } else
    {
       arrToRender = response.data.hits;

       Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

       galleryRenderer( arrToRender );
       
             
    }
  
  } )

    
  event.currentTarget.reset();
};

console.log( getFromApiService );


// //Функция для отрисовки галлереии по ключу поиска//

function galleryRenderer( arr )
{
    const gallaryToRender = arr.map( obj => `
<div class="photo-card">
  <div class="thumb"> 
      <img src="${ obj.webformatURL }" alt="${ obj.tags }" loading="lazy" />
  </div> 
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${ obj.likes }</span>
    </p>

    <p class="info-item">
      <b>Views</b>
      <span>${ obj.views }</span>
    </p>

    <p class="info-item">
      <b>Comments</b>
      <span>${ obj.comments }</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${ obj.downloads }</span>
    </p>

  </div>
</div>`)
        .join( '' );
    
  galleryArea.insertAdjacentHTML( "beforeend", gallaryToRender );
  
  loadMoreBtn.style.visibility = 'visible';
  
}




//Функция для загрузки большего числа изображений//

function loadMoreHandler( evt )
{
  getFromApiService.sendRequestToServer().then( response =>

  {
     if (response.data.totalHits - getFromApiService.hitsCount <= 0)
    {
       Notify.failure( "We're sorry, but you've reached the end of search results." ); 

       loadMoreBtn.style.visibility = 'hidden'


    } else
    {
       response.data.hits;
       galleryRenderer(response.data.hits);
       
    }
  
  } )

  console.log( getFromApiService );
}


