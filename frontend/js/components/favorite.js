import apiService from '../api/apiService.js';

$(document).on('click', '.btn-add-favorite', function () {
  const disableScroll = () => {
    $(window).on('scroll.disableScroll', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.scrollTo(0, 0);
    });
  };

  const enableScroll = () => {
    $(window).off('scroll.disableScroll');
  };

  $('#loader-wrapper').removeClass('is-hidden');
  disableScroll();

  const meal_id = $(this).find('.hidden-id').text().trim();

  apiService
    .get(`api/meals/${meal_id}`)
    .done((response) => {
      apiService
        .post(`api/meals/${meal_id}/favorite`)
        .done((response) => {
          $('#loader-wrapper').addClass('is-hidden');
          enableScroll();
          console.log(response);
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          $('#loader-wrapper').addClass('is-hidden');
          enableScroll();
          if (jqXHR.status === 401) {
            location.replace('login.html');
            alert('Unauthorized');
          } else {
            alert('Error Fetch', textStatus, errorThrown);
          }
        });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      $('#loader-wrapper').addClass('is-hidden');
      enableScroll();
      if (jqXHR.status === 401) {
        location.replace('login.html');
        alert('Unauthorized');
      } else {
        alert('Error Fetch', textStatus, errorThrown);
      }
    });
});

/* 

  before using this function please this components inside your content 

  - add
    <div class="btn-add-favorite" style="cursor: pointer">
      <i class="fa fa-heart" aria-hidden="true"></i>
      <i class="fa fa-heart hidden-id" aria-hidden="true" style="display: none">1</i>
    </div>
  - delete
    <div id="btn-delete-favorite" style="cursor: pointer">
      <i class="fa fa-close" aria-hidden="true"></i>
    </div>


  */
