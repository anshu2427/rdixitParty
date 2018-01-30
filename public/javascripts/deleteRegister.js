// deleting script

$(document).ready(function(){
  $('.delete-register').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/registers/'+id,
      success: function(response){
        alert('Deleting Registered User');
        window.location.href='/user/showregisters';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
  });

