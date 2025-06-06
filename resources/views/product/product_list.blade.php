@extends('layout')

@section('content')

<h4 class="page-section-heading">Product List</h4>



<div class="panel panel-default">
    <div class="row" style="text-align:center;">
        <!-- SHOW VALIDATION ERRORS IF ANY -->
        @if(count($errors))
        <div class="form-group">
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                    <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
        @endif

        @if (Session::has('message'))
        <div class="alert alert-success">{{ Session::get('message') }}</div>
        @endif
    </div>

    <!-- Data table -->
    <table class="table table-bordered data-table" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Date</th>
                <th>Product Code</th>
                <th>Product Type</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Retail Price</th>
                <th>Selling Price</th>
                <th>Status</th>
                <th width="300px">Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <!-- // Data table -->
</div>
<style>
    td.redText {
        font-weight: bold;
        color: red;
    }

    td.greenText {
        font-weight: bold;
        color: green;
    }

    td.blueText {
        font-weight: bold;
        color: blue;
    }

    .centerTextInDataTable {
        text-align: center;
    }
</style>
@section('scripts')
<script type="text/javascript">
    //DATA TABLE LOADING METHOD
    var dataTable;
    $(function() {
        dataTable = $('.data-table').DataTable({
            processing: true,
            serverSide: true,
            bAutoWidth: true,
            scrollX: true,
            ajax: "{{ route('product-list') }}",
            columns: [
                {
                    data: 'formatted_date',
                    name: 'formatted_date',
                    className: "centerTextInDataTable"
                },
                {
                    data: 'product_code',
                    name: 'product_code',
                    className: "centerTextInDataTable"
                },
                {
                    data: 'product_type',
                    name: 'product_type',
                    className: "centerTextInDataTable"
                },
                {
                    data: 'category',
                    name: 'category',
                    className: "centerTextInDataTable"
                },
                {
                    data: 'name',
                    name: 'name',
                    className: "centerTextInDataTable widthMax"
                },
                {
                    data: 'retail_price',
                    name: 'retail_price',
                    className: "centerTextInDataTable"
                },
                {
                    data: 'selling_price',
                    name: 'selling_price',
                    className: "centerTextInDataTable"
                },
                {
                    data: 'status',
                    name: 'status',
                    className: "centerTextInDataTable"
                },
                {
                    data: 'action',
                    name: 'action',
                    orderable: false,
                    searchable: false,
                    className: "centerTextInDataTable"
                },
            ],
            createdRow: function ( row, data, index ) {
                if ( data.status == 'inactive' ) 
                {
                    $('td', row).eq(7).addClass('redText');
                }
                else if( data.status == 'active' )
                {
                    $('td', row).eq(7).addClass('greenText');
                }
                else if( data.status == "pending" )
                {
                    $('td', row).eq(7).addClass('blueText');
                }
            },    
        });
    });


    //METHOD TO PUBLISH/UNPUBLISH A Category
    function changeStatus(itemID, newStatus) {
        var waitPopUp;
        var statusText = newStatus == 1 ? "active" : "inactive";

        $.ajax({
            type: 'POST',
            url: "{{ route('change-product-status') }}",
            data: {
                "itemId": itemID,
                "_token": "{{ csrf_token() }}",
                "status": statusText
            },
            beforeSend: function(){
                waitPopUp = $.alert({
                    title: '',
                    content: '<div class="text-center"><i class="fa fa-spinner fa-spin"></i></div>',
                    buttons:[],
                    closeIcon: false,
                });
            },
            success: function(data) {
                waitPopUp.close();
                dataTable.ajax.reload();
            },
            error: function(event){
                waitPopUp.close();
            }
        });
    }


    //METHOD TO DELETE Category
    function deleteIt( itemID, itemName ){
        $.confirm({
            title: `<strong>${itemName}</strong>`,
            icon: 'fa fa-warning',
            content: 'Sure to delete the product ?',
            type: 'red',
            buttons: {
                Cancel: {
                    text: 'Cancel',
                    btnClass: 'btn-red',
                },
                deleteIncome: {
                    text: 'Yes',
                    btnClass: 'btn-green',
                    action: function () {
                        runDelete( itemID );
                    }
                },
            }
        });
    }

    function runDelete( itemID ){
        $.ajax({
                type:'POST',
                url:"{{ route('delete-product') }}",
                data: { "itemId": itemID , "_token": "{{ csrf_token() }}" },
                dataType: 'JSON',
                success:function(data) {
                if(data.status == 1)
                {
                    dataTable.ajax.reload();
                }
                else
                {
                    $.alert({
                        title: 'Snap !!',
                        icon: 'fa fa-error',
                        content: 'Something went wrong, please try again !',
                        type: 'red'
                    });
                }
                
            }
        });
    }

    //METHOD TO CONFIRM RENEW OFFER
    function renewOffer(itemID, itemName){

        $.confirm({
            title: `<strong>${itemName}</strong>`,
            icon: 'fa fa-warning',
            content: 'Are you sure to renew product offer ?',
            type: 'red',
            buttons: {
                Cancel: {
                    text: 'Cancel',
                    btnClass: 'btn-red',
                },
                deleteIncome: {
                    text: 'Yes',
                    btnClass: 'btn-green',
                    action: function () {
                        applyRenew(itemID);
                    }

                },
            }
        });
    }

    //METHOD TO APPLY RENEW OFFER
    function applyRenew(itemID, newStatus) {

        $.ajax({
            type: 'POST',
            url: "{{ route('renew-product-offer') }}",
            data: {
                "itemId": itemID,
                "_token": "{{ csrf_token() }}"
            },
            beforeSend: function(){
                waitPopUp = $.alert({
                    title: '',
                    content: '<div class="text-center"><i class="fa fa-spinner fa-spin"></i></div>',
                    buttons:[],
                    closeIcon: false,
                });
            },
            success: function(data) {
                if (data.status == 1) {
                    waitPopUp.close();
                    dataTable.ajax.reload();
                } else {
                    waitPopUp.close();
                    $.alert({
                        title: 'Snap !!',
                        icon: 'fas fa-exclamation-triangle',
                        content: 'Something went wrong, please try again !',
                        type: 'red'
                    });
                }
            },
            error: function(event){
                waitPopUp.close();
                $.alert({
                    title: 'Snap !!',
                    icon: 'fas fa-exclamation-triangle',
                    content: 'Something went wrong, please try again !',
                    type: 'red'
                });
            }
        });
    }

</script>
@stop
@endsection