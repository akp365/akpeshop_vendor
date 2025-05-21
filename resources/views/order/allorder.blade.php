@extends('layout')
@push('styles')
<style>
    body {
        background-color: #f8f9fa;
    }
    .sidebar {
        height: 100vh;
        background-color: #343a40;
        color: #fff;
    }
    .sidebar a {
        color: #adb5bd;
        text-decoration: none;
        padding: 10px 15px;
        display: block;
    }
    .sidebar a:hover {
        background-color: #495057;
        color: #fff;
    }
    .table-wrapper {
        margin-top: 20px;
    }
    .status-active {
        color: green;
        font-weight: bold;
    }
</style>
@endpush
@section('content')
<div class="container-fluid">
    <div class="row">
        <!-- Sidebar -->
        <nav class="col-md-2 d-none d-md-block sidebar">
            <div class="p-3">
                <h4>Seller Dashboard</h4>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a href="#">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a href="#">Orders</a>
                    </li>
                    <li class="nav-item">
                        <a href="#">Products</a>
                    </li>
                    <li class="nav-item">
                        <a href="#">Shipping</a>
                    </li>
                    <li class="nav-item">
                        <a href="#">Settings</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="col-md-12 ms-sm-auto col-lg-12 px-md-4">
            <h2 class="mt-4">Order Management</h2>

            <div class="table-wrapper">
                <table class="table table-bordered data-table" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>Invoice No</th>
                            <th>Customer Name</th>
                            <th>Order Details</th>
                            <th>Payment Status</th>
                            <th>Payment Method</th>
                            <th>Currency</th>
                            <th>Subtotal</th>
                            <th>Shipping Fee</th>
                            <th>Total</th>
                            <th>Created At</th>
                            <th>Checkout Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

            </div>
        </main>
    </div>
</div>
@endsection
@section('scripts')
<script type="text/javascript">
$(function () {
    $('.data-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: "{{ route('order-list') }}",
        columns: [
            { data: 'invoice_no', name: 'invoice_no' },
            { data: 'customer_name', name: 'customer_name' },
            { data: 'order_details', name: 'order_details' },
            { data: 'payment_status', name: 'payment_status' },
            { data: 'payment_method', name: 'payment_method' },
            { data: 'currency', name: 'currency' },
            { data: 'subtotal', name: 'subtotal' },
            { data: 'shipping_fee', name: 'shipping_fee' },
            { data: 'total', name: 'total' },
            { data: 'created_at', name: 'created_at' },
            { data: 'checkout_status', name: 'checkout_status' }
        ]
    });
});

</script>





@endsection
