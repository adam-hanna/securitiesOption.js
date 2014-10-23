# securitiesOption.js


securitiesOption.js is a javascript library for evaluating option prices. To increase accuracy, all monetary arguments should be input as whole integers in the smallest denomination possible (e.g. cents and not dollars: 10050 cents rather than 100.50 dollars).

The structure of this readme is:
<dl>
  <dd>
  <ol>
    <li><b>Classes</b> - object classes that can be constructed with this library</li>
    <li><b>Methods</b> - methods that can be run on included classes. Note: all methods are included within the classes' prototype object!</li>
    <li><b>Functions</b> - functions that can be run outside of the classes</li>
    <li><b>Examples</b></li>
    <li><b>Licenses</b></li>
 </ol>
</dl>

## Classes:

<dl>
  <dt><h3>1. securitiesOption(oConstructor)</h3>
  <dd>This is an object that represents a securities option.
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>oConstructor.Strike</b>: strike price of  the option</li>
    <li><b>oConstructor.CorP</b>: "call" or "put" ; case-insensitive</li>
  </ul>
  <dd><h6>Additional Properties</h6> 
  <ul>
    <li>None; same as arguments</li>
  </ul>
  <dt><h3>2. compoundInterest(oConstructor)</h3>
  <dd>This is an object that represents a compound interest rate.
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>oConstructor.R</b>: interest rate (i.e. nominal APR or annual nominal interest rate)</li>
    <li><b>oConstructor.Freq</b>: frequency of compounding (e.g. 1 = annually; 12 = monthly)</li>
  </ul>
  <dd><h6>Additional Properties</h6>
  <ul>
    <li><b>Rcont</b>: the continuous interest rate</li>
    <li><b>Reff</b>: the effective interest rate</li>
  </ul>
</dl>

## Methods:
<dl>
  <dt><h3>1. securitiesOption.binomialCRR(Spot, Sigma, Rf, Rd, Days, Nodes)</h3>
  <dd>source (modified from original): http://en.wikipedia.org/wiki/Binomial_options_pricing_model
  <dd>This method calculates the Cox Ross Rubinstein binomial tree model value of an American option. European options will be supported in future releases. Please note that this method takes continuously compounded interest rates as arguments and therefore might yield inaccurate results near an ex-dividend date!
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>Spot</b>: spot price of the underlying</li>
    <li><b>Sigma</b>: volatility of the underlying</li>
    <li><b>Rf</b>: continuously compounded risk free rate</li>
    <li><b>Rd</b>: continuously compounded dividend rate</li>
    <li><b>Days</b>: days until expiry</li>
    <li><b>Nodes</b>: [OPTIONAL] the number of binomial nodes to generate (i.e. the height of the tree; Default = 800 i.e. 800 steps)</li>
  </ul>
  <dt><h3>2. securitiesOption.trinomialTree(Spot, Sigma, Rf, Rd, Days, Nodes)</h3>
  <dd>This method calculates the trinomial tree value of an American option. European options will be supported in future releases. Please note that this method takes continuously compounded interest rates as arguments and therefore might yield inaccurate results near an ex-dividend date!
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>Spot</b>: spot price of the underlying</li>
  <li><b>Sigma</b>: volatility of the underlying</li>
    <li><b>Rf</b>: continuously compounded risk free rate</li>
    <li><b>Rd</b>: continuously compounded dividend rate</li>
    <li><b>Days</b>: days until expiry</li>
    <li><b>Nodes</b>: [OPTIONAL] the number of trinomial nodes to generate (i.e. the height of the tree; Default = 801 i.e. 800 steps)</li>
  </ul>
  <dt><h3>3. securitiesOption.BS(Spot, Sigma, Rf, Rd, Days)</h3>
  <dd>This method calculates the Black-Scholes value of the option. Please note that this method takes continuously compounded interes rates as inputs!
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>Spot</b>: spot price of the underlying</li>
  <li><b>Sigma</b>: volatility of the underlying</li>
    <li><b>Rf</b>: continuously compounded risk free rate</li>
    <li><b>Rd</b>: continuously compounded dividend rate</li>
    <li><b>Days</b>: days until expiry</li>
  </ul>
  <dt><h3>4. securitiesOption.impVol(Method, aMethodParams, Price, Tol, maxIter)</h3>
  <dd>This method numerically calculates the implied volatility of an option using a modified secant algorithm. Unlike a normal secant method, this algorithm only approaches the correct volatility from a value greater than the goal.
  <dd>NOTE 1: in aMethodParams, a guess for the value of sigma must be provided. The guess should be greater than the actual value of sigma. If the guess is lower, the algorithm will automatically increase sigma to an acceptably higher value.
  <dd>NOTE 2: the algorithm uses a linear estimate for the slope of the volatility curve. In other words, Vega is not used when the Black-Scholes input method is specified.
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>Method</b>: the method to be used in calculating the option's price. Note the example carefully!</li>
    <li><b>aMethodParams</b>: the inputs to the pricing method as an array.</li>
    <li><b>Price</b>: the current trading price of the option</li>
    <li><b>Tol</b>: [OPTIONAL] the allowed error from the target price. The default is 0.1% of the option price.</li>
    <li><b>maxIter</b>: [OPTIONAL] the maximum number of iterations. The default is 1,000.</li>
  </ul>
  <dt><h3>5. compoundInterest.continuousRate()</h3>
  <dd>This method calculates the continuously compounded interest rate for the compoundInterest class.
  <dd><h6>Arguments</h6>
  <ul>
    <li>None</li>
  </ul>
  <dt><h3>6. compoundInterest.effectiveRate()</h3>
  <dd>This method calculates the effective interest rate for the compoundInterest class.
  <dd><h6>Arguments</h6>
  <ul>
    <li>None</li>
  </ul>
  <dt><h3>7. compoundInterest.futureValue(P, t)</h3>
  <dd>This method calculates the future value of a principle value compounded at the rate of a compoundInterest class.
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>P</b>: Principle value</li>
    <li><b>t</b>: time, in years, for compounding
  </ul>
</dl>

## Functions:
<dl>
  <dt><h3>1. erf(x)</h3>
  <dd>source (modified from original): http://www.codeproject.com/Articles/408214/Excel-Function-NORMSDIST-z
  <dd>The error function (a.k.a the Gauss error function) modified by Homer's method and is used in the normDist function.
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>x</b>: numeric input</li>
  </ul>
  <dt><h3>2. normDist(z)</h3>
  <dd>source (modified from original): http://www.codeproject.com/Articles/408214/Excel-Function-NORMSDIST-z
  <dd>"[This function] returns the probability that the observed value of a standard normal random variable will be less than or equal to z."
  <dd>This function is used in the Black-Scholes method.
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>z</b>: numeric input</li>
  </ul>
</dl>

## Examples:
  
```html
<!--HTML-->
<script>
  var testOption = new securitiesOption({
      Strike: 300000, //in cents!
      CorP: "put"
  });

  var testInterest = new compoundInterest({
    R: 0.06,
    Freq: 12
  });

  console.log("CRR: " + testOption.binomialCRR(141816, 0.3702, 0.00261, 0.06, 854, 800));
  console.log("Trinomial: " + testOption.trinomialTree(141816, 0.3702, 0.00261, 0.06, 854, 801));
  console.log("BS: " + testOption.BS(141816, 0.3702, 0.00261, 0.06, 854));
  console.log("BS Imp. Vol.: " + testOption.impVol(testOption.BS, [141816, 0.8, 0.00261, 0.06, 854], 177620.92, 1, 1000));
  console.log("Future Val.: " + testInterest.futureValue(10000, 10));
  console.log("Continuous R: " + testInterest.Rcont);
  console.log("Effective R: " + testInterest.Reff);
</script>

<!--Will Return-->
=>CRR: 177621.69841110162

=>Trinomial: 177621.92970654677

=>BS: 177620.92192159995

=>BS Imp. Vol.: 0.37020675930332103

=>Future Val.: 18193.967340322804

=>Continuous R: 0.059850498132467615

=>Effective R: 0.06167781186449761
```

## Licenses:
<dl><dd>This work is licensed under the (included) MIT license. Other works that have been included in this work have been properly identified and attributed. Licenses for these works have also been included in the licenses folder within the "deps" subfolder.
</dl>

```
The MIT License (MIT)

Copyright (c) 2014 Adam Hanna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
<<<<<<< HEAD
SOFTWARE.
=======
SOFTWARE.

>>>>>>> 8ecb467178fc76097230c6bcc2afb2db8ca99636
```