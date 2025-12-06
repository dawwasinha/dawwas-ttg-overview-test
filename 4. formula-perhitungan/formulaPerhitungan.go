package main

import (
	"fmt"
	"strconv"
	"strings"
)

var operators = []string{"+", "-", "*"}

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

func tryGroupings(numbers []int, ops []string, target int) string {
	n := len(numbers)

	expr := buildExpression(numbers, ops, nil)
	if evaluateExpression(numbers, ops, nil) == target {
		return expr
	}

	for i := 0; i < n-1; i++ {
		for j := i + 1; j < n; j++ {
			groupedNumbers := make([]int, 0)
			groupedOps := make([]string, 0)

			for k := 0; k < i; k++ {
				groupedNumbers = append(groupedNumbers, numbers[k])
				if k < i {
					groupedOps = append(groupedOps, ops[k])
				}
			}

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

			groupedNumbers = append(groupedNumbers, groupValue)

			if j < len(ops) {
				groupedOps = append(groupedOps, ops[j])
			}

			for k := j + 1; k < n; k++ {
				groupedNumbers = append(groupedNumbers, numbers[k])
				if k < len(ops) {
					groupedOps = append(groupedOps, ops[k-1])
				}
			}

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

func buildGroupedExpression(numbers []int, ops []string, start, end int, rest string) string {
	var expr strings.Builder

	for i := 0; i < start; i++ {
		expr.WriteString(strconv.Itoa(numbers[i]))
		if i < len(ops) {
			expr.WriteString(" " + ops[i] + " ")
		}
	}

	expr.WriteString("(")
	for i := start; i <= end; i++ {
		expr.WriteString(strconv.Itoa(numbers[i]))
		if i < len(ops) && i <= end-1 {
			expr.WriteString(" " + ops[i] + " ")
		}
	}
	expr.WriteString(")")

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

func findFormula(numbers []int, target int) string {
	n := len(numbers)

	operatorCombinations := generateOperators(n - 1)

	for _, ops := range operatorCombinations {
		result := tryGroupings(numbers, ops, target)
		if result != "" {
			return result
		}
	}

	return "Tidak ditemukan solusi"
}

func main() {
	testCases := []struct {
		numbers []int
		target  int
	}{
		{[]int{1, 4, 5, 6}, 16},
		{[]int{1, 4, 5, 6}, 18},
		{[]int{1, 4, 5, 6}, 50},
	}

	for i, test := range testCases {
		fmt.Printf("Test Case %d:\n", i+1)
		fmt.Printf("Source: %v\n", test.numbers)
		fmt.Printf("Target: %d\n", test.target)
		fmt.Printf("Output: %s\n\n", findFormula(test.numbers, test.target))
	}
}