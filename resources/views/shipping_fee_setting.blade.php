@extends('layout')
@section('page_title', '')
@section('content')

<h4 class="page-section-heading">Add Shipping Fee</h4>
<div class="panel panel-default">
    <div class="panel-body">
        <form method="POST" action="{{ route('add-new-shipping-setting') }}" id="newShippingSettingForm">
            @csrf
            <!-- SHIPPING FEE -->
            <div class="content" style="box-shadow: 0px 0px 5px 2px #dcdcdc; padding:5px;">
                <div class="row">
                    <div class="col-md-6">
                        <input type="hidden" value="{{$shippingFeeSettings[0]['id'] ?? null}}" class="form-control" name="id" readonly>
                        <!-- WEIGHT RANGE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Weight Range</label>
                            <input type="text" value="1 to 1000 gm" class="form-control" readonly>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <!-- PRICE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Price</label>
                            <input type="text" name="shipping_fee_1_to_1000" value="{{ $shippingFeeSettings[0]['shipping_fee_1_to_1000'] ?? null}}" class="form-control" placeholder="shipping fee">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <!-- WEIGHT RANGE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Weight Range</label>
                            <input type="text" value="1001 to 3000 gm" class="form-control" readonly>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <!-- PRICE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Price</label>
                            <input type="text" name="shipping_fee_1001_to_3000" value="{{ $shippingFeeSettings[0]['shipping_fee_1001_to_3000'] ?? null }}" class="form-control" placeholder="shipping fee">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <!-- WEIGHT RANGE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Weight Range</label>
                            <input type="text" value="3001 to 5000 gm" class="form-control" readonly>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <!-- PRICE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Price</label>
                            <input type="text" name="shipping_fee_3001_to_5000" value="{{ $shippingFeeSettings[0]['shipping_fee_3001_to_5000'] ?? null }}" class="form-control" placeholder="shipping fee" value="">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <!-- WEIGHT RANGE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Weight Range</label>
                            <input type="text" value="5001 to 10000 gm" class="form-control" readonly>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <!-- PRICE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Price</label>
                            <input type="text" name="shipping_fee_5001_to_10000" value="{{ $shippingFeeSettings[0]['shipping_fee_5001_to_10000'] ?? null }}" class="form-control" placeholder="shipping fee" value="">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <!-- WEIGHT RANGE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Weight Range</label>
                            <input type="text" value="10001 to 15000 gm" class="form-control" readonly>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <!-- PRICE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Price</label>
                            <input type="text" name="shipping_fee_10001_to_15000" value="{{ $shippingFeeSettings[0]['shipping_fee_10001_to_15000'] ?? null }}" class="form-control" placeholder="shipping fee" value="">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <!-- WEIGHT RANGE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Weight Range</label>
                            <input type="text" value="15000 gm +" class="form-control" readonly>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <!-- PRICE -->
                        <div class="form-group form-control-default required">
                            <!-- LABEL -->
                            <label for="shippingFee">Price</label>
                            <input type="text" name="shipping_fee_above_15000" value="{{ $shippingFeeSettings[0]['shipping_fee_above_15000'] ?? null }}" class="form-control" placeholder="shipping fee" value="">
                        </div>
                    </div>
                </div>
            </div>

            <!-- CONTROLS -->
            <div class="row text-center nonPrintables" style="margin-top:10px;">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    </div>
</div>

@endsection