$(document).ready(function(){
  $('.delete-contact').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/showcontacts/'+id,
      success: function(response){
        alert('Deleting Contactus List User');
        window.location.href='/users/showcontact';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
