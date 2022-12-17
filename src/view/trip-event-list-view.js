import { createElement } from '../render.js';
import dayjs from 'dayjs';
import {destinations} from '../mock/waypoints.js';

function createTripEventListTemplate(tripPoint) {
  const offers = tripPoint.point.offers;
  const type = tripPoint.point.type;
  const dateFrom = tripPoint.point.dateFrom;
  const dateTo = tripPoint.point.dateTo;
  const destination = tripPoint.point.destination;
  const basePrice = tripPoint.point.basePrice;
  const DATE_FORMAT_DATE = 'DD MMM';
  const DATE_FORMAT_TIME = 'HH:mm';
  const pointDestination = destinations.find((item) => destination === item.id);
  const checkedOffers = offers.map((element) => element.id);

  const offersTemplate = () => {
    if (!checkedOffers.length) {
      return `<li class="event__offer">
    <span class="event__offer-title">No additional offers</span>
    </li>`;
    } else {
      const template = offers.map((offer) => `
      <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');

      return template;
    }
  };

  const parceDateStart = dayjs(dateFrom);
  const parceDateEnd = dayjs(dateTo);

  return (`
  <ul class="trip-events__list">
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${parceDateStart.format(DATE_FORMAT_DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${parceDateStart.format(DATE_FORMAT_TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateFrom}">${parceDateEnd.format(DATE_FORMAT_TIME)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate()}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  </ul>`
  );
}

export default class TripEventListView {
  constructor(tripPoint) {
    this.tripPoint = tripPoint;
  }

  get template() {
    return createTripEventListTemplate(this.tripPoint);
  }

  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
