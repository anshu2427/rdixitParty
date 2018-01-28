// deleting script

$(document).ready(function(){
  $('.delete-cover').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/shownews/'+id,
      success: function(response){
        alert('Deleting Cover ');
        window.location.href='/shownews';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});