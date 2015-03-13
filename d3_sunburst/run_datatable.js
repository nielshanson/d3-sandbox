
var csv = null;
var filter_csv = null;
var my_data_table = null;
d3.text("Sample_Reference.csv", function(text) {
  csv = d3.csv.parseRows(text);
  $(document).ready(function() {
    $('#demo').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );
    my_data_table = $('#example').dataTable( {
          "data": csv,
          "columns": [
              { "title": "id" },
              { "title": "file_name" },
              { "title": "project" },
              { "title": "link", "class": "center" },
          ]
      } );   
} );
});

