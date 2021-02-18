import View from './View';
class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _errorMessage = 'No recipe find for your entry';
  _message = '';
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this.clearInput();
    return query;
  }
  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
