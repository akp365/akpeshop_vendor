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
@if (session('success'))
    <div class="alert alert-success text-center">{{ session('success') }}</div>
@endif
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
                            <th>Sl No</th>
                            <th>Item Details</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>TAX</th>
                            <th>Final Price</th>
                            <th>Product Price</th>
                            <th>Commission</th>
                            <th>Promoter Fee</th>
                            <th>VAT on Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                            $totalTax = 0;
                            $totalPrice = 0;
                            $totalCommission = 0;
                            $totalPromoterFee = 0;
                            $totalVatOnFee = 0;
                        @endphp
                
                        @foreach($orderDetails as $key => $order)
                        @php
                            $totalTax += $order['tax'];
                            $totalPrice += $order['price'];
                            $totalCommission += $order['commison'];
                            $totalPromoterFee += $order['promoter_fee'];
                            $totalVatOnFee += $order['vat_on_fee'];
                        @endphp
                        <tr>
                            <td>{{ $key + 1 }}</td>
                            <td>{{ $order['items_details'] }}</td>
                            <td>{{ $order['qty'] }}</td>
                            <td>{{ $order['price'] }}</td>
                            <td>{{ $order['tax'] }} ({{ $order['tax_type'] }})</td>
                            <td>{{ $order['final_price'] }}</td>
                            <td>{{ $order['product_price'] }}</td>
                            <td>{{ $order['commison'] }}</td>
                            <td>{{ $order['promoter_fee'] }}</td>
                            <td>{{ $order['vat_on_fee'] }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4"><strong>Totals:</strong></td>
                            <td><strong>{{ number_format($totalTax, 2) }}</strong></td>
                            <td></td>
                            <td><strong>{{ number_format($totalPrice, 2) }}</strong></td>
                            <td><strong>{{ number_format($totalCommission, 2) }}</strong></td>
                            <td><strong>{{ number_format($totalPromoterFee, 2) }}</strong></td>
                            <td><strong>{{ number_format($totalVatOnFee, 2) }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
                
            </div>
        </main>
    </div>
</div>
@endsection

