function minimumAbsoluteDifference(nums) {
    const n = nums.length / 2;
    const sums = [0, 0];
    
    const absDiffs = [];
    for (let i = 0; i < (1 << (2 * n)); i++) {
      let sum1 = 0, sum2 = 0;
      for (let j = 0; j < 2 * n; j++) {
        const bit = (i >> j) & 1;
        if (bit === 1) {
          sum1 += nums[j];
        } else {
          sum2 += nums[j];
        }
      }
      absDiffs.push(Math.abs(sum1 - sum2));
    }
  
    return Math.min(...absDiffs);
  }




//   2. You are given an integer array nums of 2 * n integers.
// You need to partition nums into two arrays of length n to
// minimize the absolute difference of the sums of the
// arrays. To partition nums, put each element of nums into
// one of the two arrays.
// Return the minimum possible absolute difference.