# Cari Angka Hilang

Program Go sederhana untuk mencari angka yang hilang dari sebuah array. Program ini menggunakan pendekatan sorting untuk menemukan angka yang tidak berurutan dalam deret bilangan.

## 🎯 Deskripsi

Program ini menerima sebuah array of integers yang seharusnya berisi deret bilangan berurutan, namun ada satu angka yang hilang. Tugas program adalah menemukan dan mengembalikan angka yang hilang tersebut.

## 🚀 Cara Menjalankan

### Prasyarat
- Go (Golang) versi 1.16 atau lebih tinggi

### Langkah-langkah
1. Pastikan Go sudah terinstall di komputer Anda
2. Navigate ke folder project:
   ```bash
   cd "3. cari-angka"
   ```
3. Jalankan program:
   ```bash
   go run cariAngka.go
   ```

### Build dan Run
Jika ingin build terlebih dahulu:
```bash
go build cariAngka.go
./cariAngka
```

## 📊 Contoh Output

```
Test Case 1:
Input: [3 0 2 4]
Missing Number: 1

Test Case 2:
Input: [3106 3102 3104 3105 3107]
Missing Number: 3103

Test Case 3:
Input: [1 2 3 5]
Missing Number: 4

Test Case 4:
Input: [100 101 103 104]
Missing Number: 102
```

## 🧠 Logika Algoritma

### 1. Fungsi `findMissingNumber`

```go
func findMissingNumber(arr []int) int
```

#### Langkah-langkah:

1. **Membuat Salinan Array**
   ```go
   sortedArr := make([]int, len(arr))
   copy(sortedArr, arr)
   ```
   - Membuat salinan array untuk menghindari modifikasi array asli
   - Penting untuk menjaga integritas data input

2. **Mengurutkan Array**
   ```go
   sort.Ints(sortedArr)
   ```
   - Mengurutkan array dari nilai terkecil ke terbesar
   - Contoh: `[3, 0, 2, 4]` menjadi `[0, 2, 3, 4]`

3. **Iterasi dan Cari Gap**
   ```go
   for i := 0; i < len(sortedArr)-1; i++ {
       if sortedArr[i+1]-sortedArr[i] != 1 {
           return sortedArr[i] + 1
       }
   }
   ```
   - Melakukan perulangan dari index pertama hingga kedua terakhir
   - Memeriksa selisih antara elemen saat ini dengan elemen berikutnya
   - Jika selisih tidak sama dengan 1, berarti ada angka yang hilang
   - Mengembalikan angka yang hilang (elemen saat ini + 1)

4. **Return -1 Jika Tidak Ada yang Hilang**
   ```go
   return -1
   ```
   - Jika loop selesai tanpa menemukan gap
   - Menandakan array sudah lengkap (tidak ada angka hilang)

### 2. Fungsi `main`

```go
func main() {
    testCases := [][]int{
        {3, 0, 2, 4},
        {3106, 3102, 3104, 3105, 3107},
        {1, 2, 3, 5},
        {100, 101, 103, 104},
    }
```

- Menyediakan beberapa test case
- Setiap test case merepresentasikan skenario berbeda:
  - Test Case 1: Angka kecil dengan urutan acak
  - Test Case 2: Angka besar dengan jarak lebar
  - Test Case 3: Angka berurutan di awal
  - Test Case 4: Angka berurutan di tengah

## 📈 Algoritma Visualisasi

### Contoh Proses dengan Input `[3, 0, 2, 4]`

1. **Input Awal**
   ```
   Array: [3, 0, 2, 4]
   ```

2. **Salin Array**
   ```
   Copy: [3, 0, 2, 4]
   Original: [3, 0, 2, 4] (tetap tidak berubah)
   ```

3. **Sort Array**
   ```
   Setelah Sort: [0, 2, 3, 4]
   ```

4. **Iterasi Pencarian Gap**

   ```
   Index 0: 0 dan 2
   Selisih: 2 - 0 = 2 ≠ 1
   Gap ditemukan!
   Missing number = 0 + 1 = 1
   ```

5. **Return Result**
   ```
   Output: 1
   ```

## ⏱️ Kompleksitas

### Time Complexity: O(n log n)
- **Sorting**: O(n log n) - Dominating factor
- **Iteration**: O(n) - Single pass through sorted array
- Overall: O(n log n)

### Space Complexity: O(n)
- **Copy Array**: O(n) - Additional space for sorted copy
- **Sorting**: O(log n) - Additional space for sort algorithm
- Overall: O(n)

## 🔧 Cara Kerja Detail

### Edge Cases yang Ditangani:
1. **Array dengan 1 elemen**: Akan return -1 (tidak ada yang bisa dibandingkan)
2. **Array sudah lengkap**: Akan return -1 (tidak ada gap)
3. **Array dengan angka negatif**: Tetap bekerja normal
4. **Array dengan nilai besar**: Tidak ada batasan maksimal

### Limitations:
- Hanya menemukan **satu** angka yang hilang
- Diasumsikan hanya ada **satu** gap dalam array
- Tidak menangani duplicate values
- Return -1 jika tidak ada angka yang hilang atau array kosong

## 🧪 Test Cases

### Test Case 1: Basic
- **Input**: `[3, 0, 2, 4]`
- **Expected**: `1`
- **Alasan**: Urutan lengkapnya adalah [0, 1, 2, 3, 4]

### Test Case 2: Large Numbers
- **Input**: `[3106, 3102, 3104, 3105, 3107]`
- **Expected**: `3103`
- **Alasan**: Urutan lengkapnya adalah [3102, 3103, 3104, 3105, 3106, 3107]

### Test Case 3: Missing at End
- **Input**: `[1, 2, 3, 5]`
- **Expected**: `4`
- **Alasan**: Urutan lengkapnya adalah [1, 2, 3, 4, 5]

### Test Case 4: Missing in Middle
- **Input**: `[100, 101, 103, 104]`
- **Expected**: `102`
- **Alasan**: Urutan lengkapnya adalah [100, 101, 102, 103, 104]

## 🔄 Alternatif Algoritma

### 1. Mathematical Approach (O(n))
```go
func findMissingNumberMath(arr []int) int {
    n := len(arr) + 1
    expectedSum := n * (arr[0] + arr[len(arr)-1]) / 2
    actualSum := 0
    for _, num := range arr {
        actualSum += num
    }
    return expectedSum - actualSum
}
```

### 2. Hash Map Approach (O(n))
```go
func findMissingNumberMap(arr []int) int {
    numMap := make(map[int]bool)
    for _, num := range arr {
        numMap[num] = true
    }
    for i := arr[0]; i <= arr[len(arr)-1]; i++ {
        if !numMap[i] {
            return i
        }
    }
    return -1
}
```

## 📝 Catatan Implementasi

1. **Mengapa perlu copy array?**
   - Untuk menghindari side effects
   - Menjaga data input tetap original
   - Good practice dalam functional programming

2. **Mengapa return -1?**
   - Konvensi untuk "not found"
   - Berbeda dari 0 karena 0 bisa jadi valid number
   - Memudahkan error handling

3. **Mengapa menggunakan sort.Ints()?**
   - Built-in Go function yang efficient
   - Implements quicksort algorithm
   - Stable dan reliable

## 🚀 Improvement Ideas

1. **Multiple Missing Numbers**: Modifikasi untuk mencari semua angka yang hilang
2. **Range Validation**: Tambahkan validasi untuk range yang diharapkan
3. **Custom Range**: Support untuk range yang tidak berawal dari 0
4. **Performance**: Implementasi O(n) tanpa sorting
5. **Error Handling**: Return error daripada -1 untuk clarity

## 📚 Resources

- [Go Sorting Documentation](https://golang.org/pkg/sort/)
- [Time Complexity Guide](https://www.bigocheatsheet.com/)
- [Go Slice Tutorial](https://gobyexample.com/slices)

---

## 📄 License

MIT License - Free to use and modify

## 🤝 Contributing

1. Fork project ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request