<?php
require 'functions.php';

// ambil data di url
$id = $_GET["id"];
//query data mahasiswa berdasarkan id 
$mhs = query("SELECT * FROM mahasiswa WHERE id = $id")[0];

if( isset($_POST["submit"])){

    //cek apakah data berhasil di ubah atau tidak
    if(ubah($_POST) > 0 ) {
    echo "
    <script>
        alert('data berhasil diubah!!');
        document.location.href = 'index.php';
    </script
    ";
} else {
    echo "
    <script>
        alert('data gagal diubah!!');
        document.location.href = 'index.php';
    </script>
    ";
}
    

}
?>


<!DOCTYPE html>  
<html>
<head>
<title>ubah data mahasiswa</title>
</head>
<body>

<h1>ubah data mahasiswa</h1>

<form action="" method="post">
    <input type="hidden" name="id"value="<?= $mhs["id"]; ?>"
    <ul>
        <li> 
            <label for="nim">NIM : </label>
            <input type="text" name="nim" id="nim" 
            required value="<?= $mhs["nim"]; ?>">
        </li>
        <li> 
        <label for="nama">NAMA : </label>
        <input type="text" name="nama" id="nama" 
        required value="<?= $mhs["nama"]; ?>">
        </li>
        <li>
        <label for="email">EMAIL : </label>
        <input type="text" name="email" id="email"
        required value="<?= $mhs["email"]; ?>">
        </li>
        <li>
        <label for="nim">JURUSAN : </label>
        <input type="text" name="jurusan" id="jurusan"
        required value="<?= $mhs["jurusan"]; ?>">
        </li>
        <li>
        <label for="gambar">GAMBAR : </label>
        <img  img="<?= $mhs['gambar']; ?>">  
        <input type="file" name="gambar" id="gambar">
        </li> 
        <li>
            <button type="submit" name="submit">ubah data!</button>
        </li>
    </ul>
</form>

</body>
</html>