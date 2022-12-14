import {render} from '../render.js';
import {getRandomArrayElement} from '../utils.js';
import SortView from '../view/list-sort-view.js';
import AddNewPoint from '../view/new-point-create-view.js';
import PointEdit from '../view/point-edit-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import TripListView from '../view/trip-list-view.js';

export default class TripPresenter {
  tripPoints = [];
  tripComponent = new TripListView();

  constructor({tripContainer, waypointModel}) {
    this.tripContainer = tripContainer;
    this.waypointModel = waypointModel;
  }

  init() {
    this.tripPoints = [...this.waypointModel.getWaypoints()];
    render(new SortView(), this.tripComponent.getElement());
    render(this.tripComponent, this.tripContainer);
    const randAddNewPoint = getRandomArrayElement(this.tripPoints);
    render(new PointEdit(getRandomArrayElement(this.tripPoints)), this.tripComponent.getElement());
    render(new AddNewPoint(randAddNewPoint), this.tripComponent.getElement());
    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new TripEventListView({point: this.tripPoints[i]}), this.tripComponent.getElement());
    }
  }
}
