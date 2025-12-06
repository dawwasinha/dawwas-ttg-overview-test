package main

import (
	"fmt"
	"sort"
)

func findMissingNumber(arr []int) int {
	sortedArr := make([]int, len(arr))
	copy(sortedArr, arr)
	sort.Ints(sortedArr)

	for i := 0; i < len(sortedArr)-1; i++ {
		if sortedArr[i+1]-sortedArr[i] != 1 {
			return sortedArr[i] + 1
		}
	}

	return -1
}

func main() {
	testCases := [][]int{
		{3, 0, 2, 4},
		{3106, 3102, 3104, 3105, 3107},
		{1, 2, 3, 5},
		{100, 101, 103, 104},
	}

	for i, test := range testCases {
		fmt.Printf("Test Case %d:\n", i+1)
		fmt.Printf("Input: %v\n", test)
		fmt.Printf("Missing Number: %d\n\n", findMissingNumber(test))
	}
}