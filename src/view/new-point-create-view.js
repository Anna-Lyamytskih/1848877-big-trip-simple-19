import dayjs from 'dayjs';
import { destinations, offersType } from '../mock/waypoints.js';
import AbstractView from '../framework/view/abstract-view.js';

const DATE_FORMAT = 'DD/MM/YY HH:mm';

function createEventTypeItemTemplate(offers) {
  const elementTypes = offers.map((element) => `
  <div class="event__type-item">
    <input id="event-type-${element.type}-${element.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.type}">
      <label class="event__type-label  event__type-label--${element.type}" for="event-type-${element.type}-${element.id}">${element.type}</label>
  </div>`).join('');

  return elementTypes;
}

function getPicturesListTemplate(picture) {
  let template = '';
  if (picture) {
    template = picture.pictures.map((elem) => `<img class="event__photo" src=${elem.src} alt="${elem.description}">`
    ).join('');
  }
  return template;
}

function createSectionOffersTemplate(offers, offer) {
  let template = '';
  if(offers){
    template = offers.offers.map((element) => ( `
  <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${element.type}-${element.id}" type="checkbox" name=${element.title} ${offer.includes(element.id) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-$${element.type}-${element.id}">
    <span class="event__offer-title">${element.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${element.price}</span>
  </label>
</div>`)).join('');
  }
  return template;
}

const chooseDestination = destinations.map((element) => `<option value="${element.name}"></option>`).join('');

function createAddNewPointTemplate(tripPoint) {
  const { offers, type, dateFrom, dateTo, destination, basePrice, id } = tripPoint;

  const parceDateStart = dayjs(dateFrom);
  const parceDateEnd = dayjs(dateTo);
  const pointDestination = destinations.find((item) => destination === item.id);
  const pointTypeOffer = offersType .find((offer) => offer.type === type);

  return (`
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeItemTemplate(offersType)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value='${pointDestination ? pointDestination.name : ''}' list="destination-list-${id}">
        <datalist id="destination-list-${id}">
          ${chooseDestination}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value='${parceDateStart.format(DATE_FORMAT)}'>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value='${parceDateEnd.format(DATE_FORMAT)}'>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${createSectionOffersTemplate(pointTypeOffer, offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">'${pointDestination ? pointDestination.description : ''}'</p>

       <div class="event__photos-container">
          <div class="event__photos-tape">
          ${getPicturesListTemplate(pointDestination)}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`
  );
}

export default class NewPointCreateView extends AbstractView {
  #tripPoint = null;


  constructor(tripPoint) {
    super();
    this.#tripPoint = tripPoint;
  }

  get template() {
    return createAddNewPointTemplate(this.#tripPoint);
  }

}
