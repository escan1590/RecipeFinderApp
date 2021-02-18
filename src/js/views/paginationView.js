import icons from 'url:../../img/icons.svg';
import View from './View';
import { RESULT_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / RESULT_PER_PAGE);
    if (this._data.page === 1 && numPages > 1) {
      return this._generateNextPageBtn();
    }

    if (this._data.page === numPages && numPages !== 1) {
      return this._generatePreviousPageBtn();
    }

    if (this._data.page < numPages) {
      return `${this._generatePreviousPageBtn()}${this._generateNextPageBtn()}`;
    }

    if (this._data.page === numPages && numPages === 1) {
      return ``;
    }
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = Number.parseInt(btn.dataset.goto);
      handler(gotoPage);
    });
  }

  _generateNextPageBtn() {
    return `<button class="btn--inline pagination__btn--next" data-goto = "${
      this._data.page + 1
    }">
    <span>Page ${this._data.page + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  _generatePreviousPageBtn() {
    return `<button class="btn--inline pagination__btn--prev" data-goto = "${
      this._data.page - 1
    }>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._data.page - 1}</span>
  </button>`;
  }
}

export default new PaginationView();
