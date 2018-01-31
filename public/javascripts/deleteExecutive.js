// deleting script

$(document).ready(function(){
  $('.delete-executive').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/showexecutives/'+id,
      success: function(response){
        alert('Deleting Member ');
        window.location.href='/showexecutives';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});