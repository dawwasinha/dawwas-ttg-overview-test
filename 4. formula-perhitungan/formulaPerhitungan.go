package main

import (
	"fmt"
	"strconv"
	"strings"
)

// Operator yang digunakan
var operators = []string{"+", "-", "*"}

// Fungsi untuk generate semua kombinasi operator
func generateOperators(n int) [][]string {
	if n == 0 {
		return [][]string{{}}
	}

	if n == 1 {
		result := make([][]string, len(operators))
		for i, op := range operators {
			result[i] = []string{op}
		}
		return result
	}

	subResults := generateOperators(n - 1)
	var result [][]string

	for _, sub := range subResults {
		for _, op := range operators {
			newComb := make([]string, len(sub)+1)
			copy(newComb, sub)
			newComb[len(sub)] = op
			result = append(result, newComb)
		}
	}

	return result
}

// Fungsi untuk mencoba semua pengelompokan dengan parenthesis
func tryGroupings(numbers []int, ops []string, target int) string {
	n := len(numbers)

	// Coba tanpa parenthesis (dari kiri ke kanan)
	expr := buildExpression(numbers, ops, nil)
	if evaluateExpression(numbers, ops, nil) == target {
		return expr
	}

	// Coba dengan berbagai pengelompokan
	for i := 0; i < n-1; i++ {
		for j := i + 1; j < n; j++ {
			// Kelompokkan dari i sampai j
			groupedNumbers := make([]int, 0)
			groupedOps := make([]string, 0)

			// Tambahkan angka sebelum grup
			for k := 0; k < i; k++ {
				groupedNumbers = append(groupedNumbers, numbers[k])
				if k < i {
					groupedOps = append(groupedOps, ops[k])
				}
			}

			// Hitung nilai grup
			groupValue := numbers[i]
			for k := i; k < j; k++ {
				switch ops[k] {
				case "+":
					groupValue += numbers[k+1]
				case "-":
					groupValue -= numbers[k+1]
				case "*":
					groupValue *= numbers[k+1]
				}
			}

			// Tambahkan grup sebagai satu nilai
			groupedNumbers = append(groupedNumbers, groupValue)

			// Tambahkan operator setelah grup
			if j < len(ops) {
				groupedOps = append(groupedOps, ops[j])
			}

			// Tambahkan angka setelah grup
			for k := j + 1; k < n; k++ {
				groupedNumbers = append(groupedNumbers, numbers[k])
				if k < len(ops) {
					groupedOps = append(groupedOps, ops[k-1])
				}
			}

			// Rekursi dengan angka yang sudah dikelompokkan
			if len(groupedNumbers) > 1 {
				newOps := make([]string, len(groupedNumbers)-1)
				for k := 0; k < len(newOps); k++ {
					if k < len(groupedOps) {
						newOps[k] = groupedOps[k]
					}
				}
				result := tryGroupings(groupedNumbers, newOps, target)
				if result != "" {
					return buildGroupedExpression(numbers, ops, i, j, result)
				}
			}
		}
	}

	return ""
}

// Fungsi untuk membangun ekspresi tanpa grouping
func buildExpression(numbers []int, ops []string, groups map[int]bool) string {
	var expr strings.Builder

	for i := 0; i < len(numbers); i++ {
		if groups != nil && groups[i] {
			expr.WriteString("(")
		}
		expr.WriteString(strconv.Itoa(numbers[i]))
		if groups != nil && groups[i] {
			expr.WriteString(")")
		}

		if i < len(ops) {
			expr.WriteString(" " + ops[i] + " ")
		}
	}

	return expr.String()
}

// Fungsi untuk membangun ekspresi dengan grouping
func buildGroupedExpression(numbers []int, ops []string, start, end int, rest string) string {
	var expr strings.Builder

	// Bagian sebelum grouping
	for i := 0; i < start; i++ {
		expr.WriteString(strconv.Itoa(numbers[i]))
		if i < len(ops) {
			expr.WriteString(" " + ops[i] + " ")
		}
	}

	// Bagian grouping
	expr.WriteString("(")
	for i := start; i <= end; i++ {
		expr.WriteString(strconv.Itoa(numbers[i]))
		if i < len(ops) && i <= end-1 {
			expr.WriteString(" " + ops[i] + " ")
		}
	}
	expr.WriteString(")")

	// Bagian setelah grouping
	if end < len(ops) {
		expr.WriteString(" " + ops[end] + " ")
	}
	for i := end + 1; i < len(numbers); i++ {
		expr.WriteString(strconv.Itoa(numbers[i]))
		if i < len(ops) {
			expr.WriteString(" " + ops[i] + " ")
		}
	}

	return expr.String()
}

// Fungsi untuk mengevaluasi ekspresi
func evaluateExpression(numbers []int, ops []string, groups map[int]bool) int {
	result := numbers[0]

	for i := 0; i < len(ops); i++ {
		switch ops[i] {
		case "+":
			result += numbers[i+1]
		case "-":
			result -= numbers[i+1]
		case "*":
			result *= numbers[i+1]
		}
	}

	return result
}

// Fungsi utama untuk mencari formula
func findFormula(numbers []int, target int) string {
	n := len(numbers)

	// Generate semua kombinasi operator
	operatorCombinations := generateOperators(n - 1)

	// Coba setiap kombinasi operator
	for _, ops := range operatorCombinations {
		result := tryGroupings(numbers, ops, target)
		if result != "" {
			return result
		}
	}

	return "Tidak ditemukan solusi"
}

func main() {
	// Test case 1
	fmt.Println("Test Case 1:")
	numbers1 := []int{1, 4, 5, 6}
	target1 := 16
	fmt.Printf("Source: %v\n", numbers1)
	fmt.Printf("Target: %d\n", target1)
	fmt.Printf("Output: %s\n\n", findFormula(numbers1, target1))

	// Test case 2
	fmt.Println("Test Case 2:")
	numbers2 := []int{1, 4, 5, 6}
	target2 := 18
	fmt.Printf("Source: %v\n", numbers2)
	fmt.Printf("Target: %d\n", target2)
	fmt.Printf("Output: %s\n\n", findFormula(numbers2, target2))

	// Test case 3
	fmt.Println("Test Case 3:")
	numbers3 := []int{1, 4, 5, 6}
	target3 := 50
	fmt.Printf("Source: %v\n", numbers3)
	fmt.Printf("Target: %d\n", target3)
	fmt.Printf("Output: %s\n\n", findFormula(numbers3, target3))
}