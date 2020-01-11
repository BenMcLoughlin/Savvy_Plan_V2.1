export const logslider = (value, max) => {
    var minp = 0;
    var maxp = 100;
  
    // The result should be between 100 an 10000000
    var minv = Math.log(100);
    var maxv = Math.log(1000000);
  
    // calculate adjustment factor
    var scale = (maxv-minv) / (maxp-minp);
  
    return Math.exp(minv + scale*(value-minp));
  }

  

export const inverseLogslider = (value) => {
    // position will be between 0 and 100
    var minp = 0;
    var maxp = 100;
  
    // The result should be between 100 an 10000000
    var minv = Math.log(100);
    var maxv = Math.log(1000000);
  
    // calculate adjustment factor
    var scale = (maxv-minv) / (maxp-minp);
  
    return (Math.log(value)-minv) / scale + minp;
  }


  export const roundNumber = (total) => {
    return total < 1000 ? Math.round(total/10) * 10 :
                          total < 50000 && total > 1000 ? Math.round(total/100) * 100 :
                         total < 100000 && total > 5000 ? Math.round(total/1000) * 1000
                         : Math.round(total/10000) * 10000
     
   }