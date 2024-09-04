$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": { url: '/Admin/Product/getall' },
        "columns": [
            { data: 'title', "width": "15%" },
            { data: 'isbn', "width": "15%" },
            { data: 'listPrice', "width": "15%" },
            { data: 'author', "width": "15%" },
            { data: 'category.name', "width": "15%" },
            {
                data: 'id', 
                "render": function (data, type, row) {
                    return `
                        <a href="/Admin/Product/Upsert?id=${data}" class="btn btn-primary btn-sm mx-1">
                            <i class="bi bi-pencil-square"></i> Edit
                        </a>
                        <a onClick="Delete('/Admin/Product/Delete/${data}')" class="btn btn-danger btn-sm mx-1">
                            <i class="bi bi-trash"></i> Delete
                        </a>
                    `;
                },
                "orderable": false
            }
        ]
    });
}

function Delete(url) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url, // Ensure this URL is correct
                type: 'DELETE', // DELETE method is correct here
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        $('#tblData').DataTable().ajax.reload(); // Reload the DataTable
                    } else {
                        toastr.error(data.message);
                    }
                },
                error: function (err) {
                    toastr.error("An error occurred while trying to delete the product.");
                }
            });
        }
    });
}



