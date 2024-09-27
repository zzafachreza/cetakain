<?php 
//koneksi ke database
 $conn = mysqli_connect("127.0.0.1:4000", "root", "", "latihanphp");


 function query($query) {
    global $conn;
    $result = mysqli_query($conn, $query);
    $rows = [];
    while( $row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
 }

 function tambah($data) {
    global $conn;
$nim = htmlspecialchars($data["nim"]);
$nama = htmlspecialchars( $data["nama"]);
$email= htmlspecialchars($data["email"]);
$jurusan = htmlspecialchars($data["jurusan"]);

//upload gambar 
$gambar = upload();
if( !$gambar) {
   return false;
}

$query ="INSERT INTO mahasiswa
           VALUES
    ('','$nim', '$nama', '$email', '$jurusan', '$gambar') 
    ";
    mysqli_query($conn, $query); 

    return mysqli_affected_rows($conn);

 } 

 function upload() {
    $nameFile = $_FILES['gambar']['name'];
    $ukuranFile = $_FILES['gambar']['size'];
    $error = $_FILES['gambar']['error'];
    $tmpName = $_FILES['gambar']['tmp_name'];
 
    
    if( $error === 4) {
       echo "<script>
          alert('Pilih gambar terlebih dahulu!');
          </script>"; 
       return false;
    }
 
   
    $ekstensiGambarValid = ['jpg', 'jpeg', 'png'];
    $ekstensiGambar = explode('.', $nameFile); 
    $ekstensiGambar = strtolower(end($ekstensiGambar)); 
 
    if( !in_array($ekstensiGambar, $ekstensiGambarValid)) {
       echo "<script>
          alert('Yang Anda upload bukan gambar!');
          </script>"; 
       return false;
    }
 
  
    if( $ukuranFile > 1000000) {
       echo "<script>
          alert('Ukuran gambar terlalu besar!');
          </script>"; 
       return false;
    }
 
  
    $namaFileBaru = uniqid();
    $namaFileBaru .= '.';
    $namaFileBaru .= $ekstensiGambar;
 
  
    move_uploaded_file($tmpName, 'img/' . $namaFileBaru);
 
   
    return $namaFileBaru;
 }
 
 


 function hapus($id){
    global $conn;
    mysqli_query($conn, "DELETE FROM mahasiswa WHERE id = $id");

    return mysqli_affected_rows($conn);
 }

 
 function ubah ($data) {
   global $conn;

   $id = $data["id"];
$nim = htmlspecialchars($data["nim"]);
$nama = htmlspecialchars( $data["nama"]);
$email= htmlspecialchars($data["email"]);
$jurusan = htmlspecialchars($data["jurusan"]);
$gambar = htmlspecialchars($data["gambar"]);

$query ="UPDATE mahasiswa SET 
           nim = '$nim',
           nama = '$nama',
           email = '$email',
           jurusan = '$jurusan',
           gambar = '$gambar'
           WHERE id = $id
         ";


    mysqli_query($conn, $query); 

    return mysqli_affected_rows($conn);
 }

//  function n($id): int|string{
//     global $conn;
//     mysqli_query($conn, "DELETE FROM mahasiswa WHERE id = $id");

//     return mysqli_affected_rows($conn); 
//  }


 function cari($keyword){
   $query = "SELECT * FROM mahasiswa
   WHERE
   nama LIKE '%$keyword%' OR
   nim LIKE '%$keyword%' OR
   email LIKE '%$keyword%' OR
   jurusan LIKE '%$keyword%'
   
   ";
   return query($query);
 }
?>