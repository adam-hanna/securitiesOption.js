# securitiesOption.js


securitiesOption.js is a javascript library for evaluating option prices.


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
    <li>None; same as parameters</li>
  </ul>
  <dd><h6>Example</h6>
  <dd>
```javascript
var testOption = new securitiesOption({
    Strike: 3000,
    CorP: "call"
});
```

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
  <dd><h6>Example</h6>
  <dd>
```javascript
var testInterest = new compoundInterest({
	R: 0.06,
	Freq: 12
});
```
</dl>

## Methods:
<dl>
  <dt><h3>1. securitiesOption.trinomialCRR(Spot, Sigma, Rf, Days, Nodes)</h3>
  <dd>This method calculates the trinomial Cox Ross Rubinstein value of the option. This method cannot currently account for dividends!
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>Spot</b>: spot price of the underlying</li>
	<li><b>Sigma</b>: volatility of the underlying</li>
    <li><b>Rf</b>: continuously compounded risk free rate</li>
    <li><b>Days</b>: days until expiry</li>
    <li><b>Nodes</b>: [OPTIONAL] the number of trinomial nodes to generate (Default = 800)</li>
  </ul>
  <dt><h3>2. securitiesOption.BS(Spot, Sigma, Rf, Rd, Days)</h3>
  <dd>This method calculates the Black-Scholes value of the option. This method <b>CAN</b> account for dividends!
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>Spot</b>: spot price of the underlying</li>
	<li><b>Sigma</b>: volatility of the underlying</li>
    <li><b>Rf</b>: continuously compounded risk free rate</li>
    <li><b>Rd</b>: continuously compounded dividend rate</li>
    <li><b>Days</b>: days until expiry</li>
  </ul>
  <dt><h3>3. compoundInterest.continuousRate()</h3>
  <dd>This method calculates the continuously compounded interest rate for the compoundInterest class.
  <dd><h6>Arguments</h6>
  <ul>
    <li>None</li>
  </ul>
  <dt><h3>4. compoundInterest.effectiveRate()</h3>
  <dd>This method calculates the effective interest rate for the compoundInterest class.
  <dd><h6>Arguments</h6>
  <ul>
    <li>None</li>
  </ul>
  <dt><h3>5. compoundInterest.futureValue(P, t)</h3>
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
  <dd>source: http://www.codeproject.com/Articles/408214/Excel-Function-NORMSDIST-z
  <dd>The error function (a.k.a the Gauss error function) modified by Homer's method and is used in the normDist function.
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>x</b>: numeric input</li>
  </ul>
  <dt><h3>2. normDist(x)</h3>
  <dd>source: http://www.codeproject.com/Articles/408214/Excel-Function-NORMSDIST-z
  <dd>"[This function] returns the probability that the observed value of a standard normal random variable will be less than or equal to z."
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>z</b>: numeric input</li>
  </ul>
</dl>

## Example:
	
```html
<!--HTML-->
<script>
	var testOption = new securitiesOption({
	    Strike: 3000,
	    CorP: "call"
	});

	var testInterest = new compoundInterest({
		R: 0.06,
		Freq: 12
	});

	console.log(testOption.trinomialCRR(1418.16, 0.3702, 0.00261, 854, 800));
	console.log(testOption.BS(1418.16, 0.3702, 0.00261, 0, 854));
	console.log(testInterest.futureValue(100, 10));
	console.log(testInterest.Rcont);
	console.log(testInterest.Reff);
</script>

<!--Will Return-->
=>50.23282190616111

=>50.222064023751386

=>181.93967340322803

=>0.059850498132467615

=>0.06167781186449761
```

#### Note: this is a work in progress