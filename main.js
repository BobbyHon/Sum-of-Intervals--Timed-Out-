function sumIntervals(intervals) {
    //console.log(intervals)
    let reduceIntervals = []
    let checkIntervalsIndex = 0
    
    function checkIntervals(array, index, testIndex = -1){
      for (let i = 0; i < reduceIntervals.length; i++){
        if (reduceIntervals[i][0] <= array[index] && array[index] <= reduceIntervals[i][1] && testIndex != i)
          {
            checkIntervalsIndex = i
            return true
          }
      }
      return false
    }
    function checkingBothIntervals(array, testIndex = -1){
      for (let i = 0; i < reduceIntervals.length; i++){
        if (reduceIntervals[i][0] <= array[0] && reduceIntervals[i][1] >= array[1] && testIndex != i) 
          {
            //console.log(reduceIntervals[i])
            return true
          }
      }
      return false
    }
    function checkWithinInvervals(){
    }
  
    let sumInt = intervals.reduce((sum, array) => {
      if (checkIntervals(array, 0))
        {
          if (reduceIntervals[checkIntervalsIndex][1] < array[1])
            {
              const differents = Math.abs(array[1] - reduceIntervals[checkIntervalsIndex][1])
              reduceIntervals[checkIntervalsIndex][1] = array[1]
              return sum + differents
            }
          return sum
        }
      else if (checkIntervals(array, 1))
        {
          if (reduceIntervals[checkIntervalsIndex][0] > array[0])
            {
              const differents = Math.abs(reduceIntervals[checkIntervalsIndex][0] - array[0])
              reduceIntervals[checkIntervalsIndex][0] = array[0]
              return sum + differents
            }
          return sum
        }
      else{
        const differents = Math.abs(array[1] - array[0])
        reduceIntervals.push(array)
        return sum + differents
      }
    }, 0)
    for (let j = 0; j < reduceIntervals.length; j++){
      if (checkIntervals(reduceIntervals[j], 0, j) || checkIntervals(reduceIntervals[j], 1, j))
        {
        if (checkingBothIntervals(reduceIntervals[j], j))
          {
            //console.log(`removing ${reduceIntervals[j]}`)
            reduceIntervals = reduceIntervals.slice(0,j).concat(reduceIntervals.slice(j + 1))
          }
          sumInt = sumIntervals(reduceIntervals)
          return sumInt
        }
    }
    return sumInt
  }