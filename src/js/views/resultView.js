import icons from 'url:../../img/icons.svg';
import View from './View';

class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found please try another one';
  _searchFieldValue = document.querySelector('.search__field').value;
  _message = '';

  isSearchFieldNotEmpty() {
    return this._searchFieldValue !== '';
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result, idx, array) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
          <a class="preview__link ${
            result.id === id ? 'preview__link--active' : ''
          }" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>`;
  }
}

export default new resultView();
