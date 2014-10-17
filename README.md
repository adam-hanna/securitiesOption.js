securitiesOption.js is a javascript library for evaluating option prices.

Objects: 
	securitiesOption
		This is an object that represents an option.

		Arguments
	    Strike: //strike price of  the option
	    CorP: //"call" or "put" ; case-insensitive


Methods:
	securitiesOption.trinomialCRR(Spot, Sigma, Rf, Days, Nodes)
		This method calculates the trinomial Cox Ross Rubinstein value of the option.

		Arguments
		Sigma: //volatility
	    Rf: //risk free rate
	    Days: //days until expiry
	    Spot: //spot price of the underlying

- This is a work in progress -