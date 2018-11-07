/* eslint-disable */
$(function(){
  var $searchBar = $('#searchBar'),
    $searchText = $('#searchText'),
    $searchInput = $('#searchInput'),
    $searchClear = $('#searchClear'),
    $searchCancel = $('#searchCancel');

  function hideSearchResult(){
    $searchInput.val('');
  }

  function cancelSearch(){
    hideSearchResult();
    $searchBar.removeClass('search-bar_focusing');
    $searchText.show();
  }

  $searchText.on('click', function(){
    $searchBar.addClass('search-bar_focusing');
    $searchInput.focus();
  });

  $searchInput
    .on('blur', function () {
      if(!this.value.length) cancelSearch();
    });

  $searchClear.on('click', function(){
    hideSearchResult();
    $searchInput.focus();
  });

  $searchCancel.on('click', function(){
    cancelSearch();
    $searchInput.blur();
  });
});
