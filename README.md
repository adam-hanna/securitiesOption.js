# securitiesOption.js


securitiesOption.js is a javascript library for evaluating option prices.


## Classes:

### 1. securitiesOption(oConstructor)

This is an object that represents a securities option.

#### Arguments
oConstructor.Strike: //strike price of  the option
oConstructor.CorP: //"call" or "put" ; case-insensitive

#### Additional Properties - None. Same as arguments

#### Example
```javascript
var testOption = new securitiesOption({
    Strike: 3000,
    CorP: "call"
});
```

### 2. compoundInterest(oConstructor)

This is an object that represents an interest rate.

#### Arguments
oConstructor.Strike: //strike price of  the option
oConstructor.CorP: //"call" or "put" ; case-insensitive

#### Additional Properties - None. Same as arguments

#### Example
```javascript
var testOption = new securitiesOption({
    Strike: 3000,
    CorP: "call"
});
```

## Methods:

```javascript
securitiesOption.trinomialCRR(Spot, Sigma, Rf, Days, Nodes)
	This method calculates the trinomial Cox Ross Rubinstein value of the option. This method cannot account for dividends!

	Arguments
    Spot: //spot price of the underlying
	Sigma: //volatility
    Rf: //continuously compounded risk free rate
    Days: //days until expiry
    Nodes: //[OPTIONAL] the number of trinomial nodes to generate (Default = 800)
```

## Functions:

```javascript

```

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
```

#### Note: this is a work in progress