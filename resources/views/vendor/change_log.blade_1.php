@extends('layout')
@section('page_title', 'Change Log')
@section('content')

<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 50px;
    }

    td, th {
        border: 1px solid #000;
        text-align: center;
        padding: 8px;
    }
</style>
    
    <div class="panel panel-default">
        <div class="panel-body">
                <div id="printable" class="myDivToPrint">
                    <!-- TITLE -->
                    <h4 class="page-section-heading">Change Log</h4>

                    <!-- CHANGE LOG TABLE -->
                    
                        <!-- ALL APPROVED CHANGES ARE LISTED BELOW -->
                        <table>
                            <thead>
                                <th>Subject</th>
                                <th>Details</th>
                                <th>Date</th>
                            </thead>
                            <tbody>
                                @if($changeLogs->isNotEmpty())
                                    @foreach($changeLogs as $key => $changeLog)
                                    <tr>
                                        <td>{{ $changeLog->attribute_name }}</td>
                                        <td>{!! $changeLog->description !!}</td>
                                        <td>{{ date("Y-m-d h:i a", strtotime($changeLog->created_at)) }}</td>
                                    </tr>
                                    @endforeach
                                @else
                                    <tr>
                                        <td colspan="3">No result found</td>
                                    </tr>
                                @endif


                            </tbody>
                        </table> 
                </div>
                

                <!-- CONTROLS -->
                <div class="row text-center" style="padding-top: 50px;">
                    <button type="button" onclick="printDetails()" class="btn btn-info">Print</button>
                </div>
        </div>
    </div>
@endsection

@section('scripts')
<script>
    //FUNCTION TO PRINT VENDOR-DETAILS
    function printDetails(){
        $("#printable").printThis({
            importStyle: true,
            beforePrint: function(){
                $('#nonPrintables').hide();
            },
            afterPrint: function(){
                $('#nonPrintables').show();
            }      
        });
    }
</script>
@endsection