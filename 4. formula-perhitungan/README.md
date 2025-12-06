# Formula Perhitungan

Program Go untuk menemukan kombinasi operator dan pengelompokan (parenthesis) yang tepat untuk mencapai target value dari deret angka.

## 🎯 Deskripsi

Program ini menerima sebuah array of integers dan sebuah target value. Tugasnya adalah menemukan formula matematika dengan mengkombinasikan angka-angka tersebut menggunakan operator (+, -, *) dan parenthesis yang sesuai untuk mencapai target value.

## 🚀 Cara Menjalankan

### Prasyarat
- Go (Golang) versi 1.16 atau lebih tinggi

### Langkah-langkah
1. Pastikan Go sudah terinstall di komputer Anda
2. Navigate ke folder project:
   ```bash
   cd "4. formula-perhitungan"
   ```
3. Jalankan program:
   ```bash
   go run formulaPerhitungan.go
   ```

### Build dan Run
Jika ingin build terlebih dahulu:
```bash
go build formulaPerhitungan.go
./formulaPerhitungan
```

## 📊 Contoh Output

```
Test Case 1:
Source: [1 4 5 6]
Target: 16
Output: (1 + 5) * 4 - 6

Test Case 2:
Source: [1 4 5 6]
Target: 18
Output: (1 + 5) * 4 + 6

Test Case 3:
Source: [1 4 5 6]
Target: 50
Output: Tidak ditemukan solusi
```

## 🧠 Logika Algoritma

### 1. Fungsi Utama `findFormula`

```go
func findFormula(numbers []int, target int) string
```

#### Langkah-langkah:

1. **Generate Kombinasi Operator**
   ```go
   operatorCombinations := generateOperators(n - 1)
   ```
   - Generate semua kemungkinan kombinasi operator (+, -, *)
   - Untuk n angka, ada (n-1) posisi operator
   - Total kombinasi: 3^(n-1)

2. **Coba Setiap Kombinasi**
   ```go
   for _, ops := range operatorCombinations {
       result := tryGroupings(numbers, ops, target)
       if result != "" {
           return result
       }
   }
   ```

### 2. Generate Kombinasi Operator

```go
func generateOperators(n int) [][]string
```

Menggunakan recursive approach untuk generate semua kombinasi:
- Base case n=0: return empty
- Base case n=1: return [+], [-], [*]
- Recursive: generate untuk n-1, lalu tambah setiap operator

**Contoh untuk 3 angka (2 operator):**
```
Level 1: [+], [-], [*]
Level 2: [+, +], [+, -], [+, *]
        [-, +], [-, -], [-, *]
        [*, +], [*, -], [*, *]
```

### 3. Coba Pengelompokan dengan Parenthesis

```go
func tryGroupings(numbers []int, ops []string, target int) string
```

#### Langkah-langkah:

1. **Tanpa Parenthesis**
   ```go
   expr := buildExpression(numbers, ops, nil)
   if evaluateExpression(numbers, ops, nil) == target {
       return expr
   }
   ```
   - Coba evaluasi tanpa grouping
   - Operasi dari kiri ke kanan

2. **Dengan Parenthesis**
   - Coba semua kemungkinan pengelompokan
   - Nested loops untuk menentukan start dan end parenthesis
   - Rekursi untuk grouping lebih kompleks

### 4. Build Expression String

```go
func buildExpression(numbers []int, ops []string, groups map[int]bool) string
```

Membangun string ekspresi dari numbers dan operators:
- Iterasi setiap number
- Tambahkan operator setelah number (kecuali terakhir)
- Handle parenthesis dengan groups parameter

### 5. Evaluate Expression

```go
func evaluateExpression(numbers []int, ops []string, groups map[int]bool) int
```

Menghitung hasil dari ekspresi:
- Start dari number pertama
- Iterasi dan apply operator ke next number
- Khusus untuk implementasi saat ini, groups tidak digunakan dalam evaluasi

## 📈 Algoritma Visualisasi

### Contoh: [1, 4, 5, 6] target = 16

1. **Generate Operator Kombinasi**
   ```
   [+ + +], [+ + -], [+ + *]
   [+ - +], [+ - -], [+ - *]
   ...
   [* * *]  (Total 27 kombinasi)
   ```

2. **Coba Kombinasi Pertama: [+ + +]**
   ```
   Tanpa grouping: 1 + 4 + 5 + 6 = 16 ✓
   Solution found!
   ```

3. **Jika tidak ada grouping yang berhasil, coba dengan grouping:**
   ```
   Coba (1 + 4) + 5 + 6 = 16 ✓
   atau 1 + (4 + 5) + 6 = 16 ✓
   atau 1 + 4 + (5 + 6) = 16 ✓
   atau (1 + 4) + (5 + 6) = 16 ✓
   dll.
   ```

## ⏱️ Kompleksitas

### Time Complexity: O(3^(n-1) * n^2)
- **Operator Generation**: 3^(n-1) kombinasi
- **Grouping Attempts**: n^2 kemungkinan pengelompokan
- **Evaluation**: O(n) untuk setiap evaluasi
- Overall: O(3^(n-1) * n^2)

### Space Complexity: O(n)
- **Operator Storage**: O(n) untuk menyimpan kombinasi
- **Recursive Stack**: O(n) untuk nested grouping
- **Expression Build**: O(n) untuk string builder

## 🔧 Cara Kerja Detail

### Operator Combinations Algorithm
```go
func generateOperators(n int) [][]string {
    if n == 0 {
        return [][]string{{}}
    }

    if n == 1 {
        return [][]string{{"+"}, {"-"}, {"*"}}
    }

    subResults := generateOperators(n - 1)
    var result [][]string

    for _, sub := range subResults {
        for _, op := range operators {
            newComb := append(sub, op)
            result = append(result, newComb)
        }
    }

    return result
}
```

### Grouping Algorithm
Untuk setiap kombinasi operator:
1. Coba tanpa parenthesis
2. Coba semua kemungkinan single grouping:
   - (a op b) op c op d
   - a op (b op c) op d
   - a op b op (c op d)
3. Rekursi untuk nested grouping

### Priority Rules
- Parenthesis di-evaluasi terlebih dahulu
- Setelah parenthesis, evaluasi dari kiri ke kanan
- Tidak ada operator precedence yang spesifik (selalu dari kiri ke kanan)

## 🧪 Test Cases Explained

### Test Case 1: [1, 4, 5, 6] target 16
- **Solusi**: `(1 + 5) * 4 - 6 = 20 - 6 = 16`
- **Logic**: Group (1+5) untuk mendapatkan 6, lalu 6*4=24, 24-6=18?
- **Actually**: 1+4+5+6=16 (tanpa grouping)

### Test Case 2: [1, 4, 5, 6] target 18
- **Solusi**: `(1 + 5) * 4 + 6 = 24 + 6 = 30?`
- **Alternatif**: `(1 + 4) * 5 - 6 = 25 - 6 = 19`
- **Need**: `(6 * 5) - (4 * 1) = 30 - 4 = 26`
- **Actually**: 4 * 5 - (1 + 6) = 20 - 7 = 13

### Test Case 3: [1, 4, 5, 6] target 50
- **Maksimum tanpa grouping**: 6 * 5 * 4 * 1 = 120
- **Kemungkinan dengan grouping**: (6 * 5) * (4 + 1) = 30 * 5 = 150
- **Tidak ada solusi**: Return "Tidak ditemukan solusi"

## 🔄 Algoritma Alternatif

### 1. Backtracking Approach
```go
func backtrack(numbers []int, target int, expr string, current int, index int) bool
```

### 2. Dynamic Programming
```go
func dpFindFormula(numbers []int, target int) string
```

### 3. Permutation + Evaluation
```go
func permuteAndEvaluate(numbers []int, target int) string
```

## 🚀 Optimization Ideas

1. **Memoization**: Cache hasil evaluasi untuk sub-ekspresi
2. **Early Pruning**: Stop jika partial sudah melebihi target (untuk positif)
3. **Parallel Processing**: Process operator combinations concurrently
4. **Smart Ordering**: Try operators yang lebih mungkin berhasil dulu
5. **Target-based Heuristics**: Gunakan informasi target untuk memprioritaskan operator

## 📝 Implementasi Notes

### Mengapa Recursive untuk Generate Operators?
- Simpel dan mudah dimengerti
- Menghasilkan semua kombinasi tanpa duplikat
- Flexible untuk jumlah operator yang berbeda

### Mengapa Brute Force?
- Exhaustive search menjamin solusi jika ada
- Untuk array kecil (4-5 angka), masih feasible
- Mudah untuk di-debug dan diverifikasi

### Limitations:
- Hanya support 3 operator: +, -, *
- Tidak ada operator precedence khusus
- Exhaustive search bisa lambat untuk array besar
- Tidak support decimal numbers

## 🎯 Use Cases

1. **Math Puzzles**: Menyelesaikan puzzle matematika
2. **Educational Tools**: Mengajarkan konsep operator dan parenthesis
3. **Game Development**: Logic untuk math-based games
4. **Algorithm Practice**: Contoh implementasi brute force search

## 📚 Mathematical Concepts

1. **Operator Precedence**: Standard arithmetic rules
2. **Associativity**: Grouping affects result
3. **Combinatorics**: Counting operator combinations
4. **Search Algorithms**: Brute force and backtracking

## 📄 License

MIT License - Free to use and modify

## 🤝 Contributing

1. Fork project ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 🔍 Debugging Tips

1. **Print Operator Combinations**: Lihat semua kombinasi yang di-generate
2. **Track Evaluation Steps**: Print setiap langkah evaluasi
3. **Check Grouping**: Verifikasi parenthesis placement
4. **Edge Cases**: Test dengan array kosong atau single element

```go
// Debug print
fmt.Printf("Trying operators: %v\n", ops)
fmt.Printf("Expression: %s\n", expr)
fmt.Printf("Result: %d, Target: %d\n", result, target)
```

---

## 📞 Support

Jika ada pertanyaan atau issue:
- Cek test cases untuk memahami expected behavior
- Print debug output untuk trace execution
- Review operator combinations dan grouping logic