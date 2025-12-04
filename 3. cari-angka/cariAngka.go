package main

import (
	"fmt"
	"sort"
)

func findMissingNumber(arr []int) int {
	// Create a copy and sort the array
	sortedArr := make([]int, len(arr))
	copy(sortedArr, arr)
	sort.Ints(sortedArr)

	// Iterate through the sorted array
	for i := 0; i < len(sortedArr)-1; i++ {
		// Check if the next number is not consecutive
		if sortedArr[i+1]-sortedArr[i] != 1 {
			// Return the missing number
			return sortedArr[i] + 1
		}
	}

	// Return -1 if no missing number found within the array bounds
	return -1
}

func main() {
	// Test case 1
	test1 := []int{3, 0, 2, 4}
	fmt.Println("Test 1:")
	fmt.Println("Input:", test1)
	fmt.Println("Output:", findMissingNumber(test1)) // Expected: 1

	// Test case 2
	test2 := []int{3106, 3102, 3104, 3105, 3107}
	fmt.Println("\nTest 2:")
	fmt.Println("Input:", test2)
	fmt.Println("Output:", findMissingNumber(test2)) // Expected: 3103

	// Additional test cases
	test3 := []int{1, 2, 3, 5}
	fmt.Println("\nTest 3:")
	fmt.Println("Input:", test3)
	fmt.Println("Output:", findMissingNumber(test3)) // Expected: 4

	test4 := []int{100, 101, 103, 104}
	fmt.Println("\nTest 4:")
	fmt.Println("Input:", test4)
	fmt.Println("Output:", findMissingNumber(test4)) // Expected: 102
}