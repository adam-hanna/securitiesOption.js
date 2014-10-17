securitiesOptions.js
====================


securitiesOption.js is a javascript library for evaluating option prices.


Objects:
--------

```javascript
securitiesOption
	This is an object that represents an option.

	Arguments
    Strike: //strike price of  the option
    CorP: //"call" or "put" ; case-insensitive
```


Methods:
--------

```javascript
securitiesOption.trinomialCRR(Spot, Sigma, Rf, Days, Nodes)
	This method calculates the trinomial Cox Ross Rubinstein value of the option.

	Arguments
    Spot: //spot price of the underlying
	Sigma: //volatility
    Rf: //risk free rate
    Days: //days until expiry
    Nodes: //[OPTIONAL] the number of trinomial nodes to generate (Default = 800)
```

Example:
--------
	
```html
<!--HTML-->
<script>
	var testOption = new securitiesOption({
	    Strike: 3000,
	    CorP: "call"
	});

	console.log(testOption.trinomialCRR(1418.16, 0.3702, 0.00261, 854, 800));
</script>~~
```

- This is a work in progress -