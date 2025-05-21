@extends('layout')
@push('styles')
    {{-- C:\xampp\htdocs\akp\admin.akpeshop.com\public\js\jquery.tableToExcel.js --}}

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

    <style>
        .date-filter-form {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: fit-content;
            width: 100%;
        }

        .date-label {
            font-weight: bold;
        }

        .date-input {
            padding: 5px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        .filter-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
        }

        .filter-btn:hover {
            background-color: #0056b3;
        }
    </style>
@endpush
@section('content')
    @if (session('success'))
        <div class="alert alert-success text-center">{{ session('success') }}</div>
    @endif

   

    <div class="container-fluid">

        <div class="row">
            <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-5 pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">My Earnings</h1>
        </div>
        <!-- Stats Cards -->
        <div class="row">
            <div class="col-md-3">
                <div class="card text-white bg-primary mb-3" style="border-radius: 5px;">
                    <div class="card-body"
                        style="padding: 10px; display: flex; flex-direction: column; justify-content: center;align-items:center; border-radius: 5px;">
                        <h5 class="card-title" style="color: white; font-size: 20px;">Total Earnings</h5>
                        <p class="card-text" id="total_sells_amnt_all_currency" style="font-size: 25px;">
                            {{$formatted_total_current_currency_earnings .  " " .$seller_current_currency_name}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white bg-danger mb-3" style="border-radius: 5px;">
                    <div class="card-body"
                        style="padding: 10px; display: flex; flex-direction: column; justify-content: center;align-items:center; border-radius: 5px;">
                        <h5 class="card-title" style="color: white; font-size: 20px;">Total Withdraw</h5>
                        <p class="card-text" style="color: white;font-size: 25px;">{{$withdraw .  " " . $seller_current_currency_name}}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white bg-warning mb-3" style="border-radius: 5px;">
                    <div class="card-body"
                        style="padding: 10px; display: flex; flex-direction: column; justify-content: center;align-items:center; border-radius: 5px;">
                        <h5 class="card-title" style="color: white; font-size: 20px;">Total Balance</h5>
                        <p class="card-text" style="color: white;font-size: 25px;">{{$total_balance_data .  " " .$seller_current_currency_name}}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white bg-dark mb-3" style="border-radius: 5px; background: black!important">
                    <div class="card-body"
                        style="padding: 10px; display: flex; flex-direction: column; justify-content: center;align-items:center; border-radius: 5px;">
                        <h5 class="card-title" style="color: white; font-size: 20px;">Withdraw Request</h5>
                        <p class="card-text" style="color: white;font-size: 25px;">{{$withdraw_request .  " " .$seller_current_currency_name}}</p>
                    </div>
                </div>
            </div>



        </div>


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





            <button id="openModal" class="btn" style="margin-top: 25px;">Request Withdraw</button>

            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Request for withdraw</h5>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form action="{{route('vendor.withdraw_request')}}" method="POST" class="row">
                            @csrf
                            <div class="col-md-12">
                                <div class="form-group form-control-default required" aria-required="true">
                                    <!-- LABEL -->
                                    <label for="productName">Withdrawable Amount</label>
        
                                    <!-- INPUT BOX -->
                                    <input type="text" disabled value="{{$total_balance_data . " " . $seller_current_currency_name}}" class="form-control" id="productName" placeholder="product name" value="" required="" aria-required="true">

                                    <input type="hidden" id="seller_hidden_price" value="{{ str_replace(',', '', $total_balance_data) }}"/>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group form-control-default required" aria-required="true">
                                    <!-- LABEL -->
                                    <label for="productName">Withdraw Amount</label>
        
                                    <!-- INPUT BOX -->
                                    <input type="text" name="amount" class="form-control" id="productName" placeholder="product name" value="" required="" aria-required="true">
                                </div>
                            </div>
                            <input type="hidden" name="currency" value="{{$seller_current_currency_name}}" id="">
                            <div class="col-md-12">
                                <button id="closeModal" class="btn">Submit</button>

                            </div>
                        </form>
                    </div>
             
                </div>
            </div>
            
            <style>
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                justify-content: center;
                align-items: center;
            }
            
            .modal-content {
                background: white;
                padding: 20px;
                border-radius: 8px;
                width: 500px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .close {
                cursor: pointer;
                font-size: 24px;
            }
            
            .btn {
                padding: 10px;
                background-color: blue;
                color: white;
                border: none;
                cursor: pointer;
                border-radius: 5px;
            }
            
            .btn:hover {
                background-color: darkblue;
            }
            </style>
            
            <script>
                const modal = document.getElementById('myModal');
                const openModal = document.getElementById('openModal');
                const closeModal = document.getElementById('closeModal');
                const closeSpan = document.querySelector('.close');
            
                openModal.addEventListener('click', () => {
                    modal.style.display = 'flex';
                });
            
                closeModal.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            
                closeSpan.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            
                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            </script>




            <!-- Main Content -->
            <main class="col-md-12 ms-sm-auto col-lg-12 px-md-4">
                <h2 class="mt-4" style="display: flex; justify-content: center;">
                    <span>Widthdraw Management</span>
                </h2>






                <div class="table-wrapper">
                    <!-- Data table -->
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Admin Note</th>
                                    <th>Request Date</th>
                                    <th>Approve Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                @php
                                    $sl = 1;
                                @endphp
                                @foreach ($allWithdraw as $data)
                                <tr>
                                    <td>{{$sl++}}</td>
                                    <td>{{$data->amount . " " . $seller_current_currency_name}}</td>
                                    <td>{{$data->status}}</td>
                                    <td>{{$data->admin_note }}</td>
                                    <td>{{$data->created_at->format('d-m-Y')}}</td>
                                    <td>{{$data->updated_at->format('d-m-Y')}}</td>
                                </tr>
                                @endforeach
                           
                            </tbody>
                        </table>

                    </div>


                </div>
            </main>
        </div>
    </div>




@endsection
@section('scripts')


@endsection