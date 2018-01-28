 $(document).ready(function(){
  $('.delete-user').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/adminsettings/'+id,
      success: function(response){
        alert('Deleting Registered Admin User');
        window.location.href='/adminsettings';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
