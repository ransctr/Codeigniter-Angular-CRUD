
$( document ).ready(function() {

});
    function fileSelected() {
        var file = document.getElementById('fileToUpload').files[0];

        // show file details
        document.getElementById('filename').innerHTML = 'File Name: ' + file.name;
        document.getElementById('filesize').innerHTML = 'File Size: ' + file.size;
        document.getElementById('filetype').innerHTML = 'File Type: ' + file.type;
    }

    function uploadFile() {
        fileSelected()
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        fd.append('fileToUpload', document.getElementById('fileToUpload').files[0]);

        // event listeners
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener('load', uploadComplete, false);
        xhr.addEventListener('error', uploadFailed, false);
        xhr.addEventListener('abort', uploadCanceled, false);

        // send xhr
        xhr.open('POST', './public/upload.php');
        xhr.send(fd);
        $(".loader_container").fadeIn();
    }

    function uploadProgress(e) {
        // works only on chrome
        if (e.lengthComputable) {
            document.getElementById('progressNumber').innerHTML = Math.round(e.loaded * 100 / e.total) + '%';
        } else {
            document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
    }

    function uploadComplete(e) {
        // when the server sends back a response

        //Somthing went wrong
        if(e.total==0){
            alert("Error - cant upload file")
            document.getElementById('filename').innerHTML = 'File Name: ';
            document.getElementById('filesize').innerHTML = 'File Size: ';
            document.getElementById('filetype').innerHTML = 'File Type: ';
            return
        }
        var d = new Date();
        var n = d.getTime();
        $('#theImage').show();
        $("#theImage").attr("src","public/upload/image.jpg?"+n);
        $(".loader_container").fadeOut();

    }

    function uploadFailed(e) {
        //alert('There were an error attempting to upload the file');
        alert("Error - cant upload file")
        $(".loader_container").fadeOut();

    }

    function uploadCanceled(e) {
        //alert('The upload has been canceled by the user');
        $("#loader").fadeOut();
    }

