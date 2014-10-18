//Classes
function securitiesOption(oConstructor) {
    this.Strike = oConstructor.Strike;
    this.CorP = oConstructor.CorP.toLowerCase();
};

function compoundInterest(oConstructor) {
	this.Freq = oConstructor.Freq;
	this.R = oConstructor.R;
	this.Rcont = this.continuousRate();
	this.Reff = this.effectiveRate();
};


//Methods
securitiesOption.prototype.binomialCRR = function(Spot, Sigma, Rf, Rd, Days, Nodes) {
	//source (modified from original): http://en.wikipedia.org/wiki/Binomial_options_pricing_model

	Nodes = Math.round((Nodes || 800));
	var Delta_t_yrs, Up, P0, P1;

	Delta_t_yrs = (Days / 365 / Nodes);
	Up = Math.exp(Sigma * Math.sqrt(Delta_t_yrs));

	P0 = (Up * Math.exp(-Rf * Delta_t_yrs) - Math.exp(-Rd * Delta_t_yrs)) * Up / (Math.pow(Up,2) - 1);
	P1 = Math.exp(-Rf * Delta_t_yrs) - P0;

	var Derivative = [];
	var Excercise = 0;

	if (this.CorP === "put") {
		//Calculate initial values at time T
		for (var i = 0; i <= Nodes; i++) {
			Derivative[i] = Math.max(this.Strike - Spot * Math.pow(Up, 2 * i - Nodes), 0);
		};

		//move to earlier times
		for (var j = Nodes - 1; j >= 0; j--) {
			for (var i = 0; i <= j; i++) {
				Derivative[i] = P0 * Derivative[i] + P1 * Derivative[i + 1];
				Excercise = this.Strike - Spot * Math.pow(Up, 2 * i - j);
				Derivative[i] = Math.max(Derivative[i], Excercise);
			};
		};

		return	Derivative[0];

	} else if (this.CorP == "call") {
		//Calculate initial values at time T
		for (var i = 0; i <= Nodes; i++) {
			Derivative[i] = Math.max(Spot * Math.pow(Up, 2 * i - Nodes) - this.Strike, 0);
		};

		//move to earlier times
		for (var j = Nodes - 1; j >= 0; j--) {
			for (var i = 0; i <= j; i++) {
				Derivative[i] = P0 * Derivative[i] + P1 * Derivative[i + 1];
				Excercise = Spot * Math.pow(Up, 2 * i - j) - this.Strike;
				Derivative[i] = Math.max(Derivative[i], Excercise);
			};
		};

		return	Derivative[0];

	} else {
		return "Error!";
	}

};

securitiesOption.prototype.trinomialTree = function(Spot, Sigma, Rf, Rd, Days, Nodes) {
	Nodes = Math.round((Nodes || 801));
	var Delta_t_yrs, Up, Down, Pu, Pd, Pm, Max_up, No_Underlying;

	Delta_t_yrs = (Days / 365 / Nodes);
	Up = (Math.exp((Sigma * Math.sqrt(2 * Delta_t_yrs))));
	Down = (1 / Up);
	Pu = (Math.pow((Math.exp((Rf - Rd) * Delta_t_yrs / 2) - (Math.exp((-Sigma) * Math.sqrt(Delta_t_yrs / 2)))) / ((Math.exp(Sigma * Math.sqrt(Delta_t_yrs / 2))) - Math.exp((-Sigma) * Math.sqrt(Delta_t_yrs / 2))),2));
	Pd = (Math.pow(((Math.exp(Sigma * Math.sqrt(Delta_t_yrs / 2)) - Math.exp((Rf - Rd) * Delta_t_yrs / 2)) / (Math.exp(Sigma * Math.sqrt(Delta_t_yrs / 2)) - Math.exp((-Sigma) * Math.sqrt(Delta_t_yrs / 2)))),2));
	Pm = (1 - Pu - Pd);
	Max_up = (Spot * Math.pow(Up, Nodes));
	No_Underlying = (Nodes * 2);

	var Underlying = [];
	var Derivative = [];

	//Input the final values of the underlying into the underlying array
	for (var i = 0; i <= No_Underlying; i++) {
		Underlying[i] = (Max_up * Math.pow(Down, i));
	};

	//populate the trinomial tree
	if (this.CorP === "call") {
	    //start with the leaves
	    Derivative[Nodes] = [];

	    for (var i = 0; i <= No_Underlying; i++) {
	    	Derivative[Nodes][i] = Math.max((Underlying[i] - this.Strike), 0);
	    };
	    
	    //now the branches
	    for (var k = 1; Nodes - k >= 0; k++) {
	    	Derivative[Nodes - k] = [];

	        for (var i = k; i <= No_Underlying - k; i++) {
	            Derivative[Nodes - k][i] = (Math.max((Underlying[i] - this.Strike), (Math.exp(((-Rf) * Delta_t_yrs))) * (Pu * Derivative[Nodes - k + 1][i - 1] + Pd * Derivative[Nodes - k + 1][i + 1] + Pm * Derivative[Nodes - k + 1][i])));
	        };
	    };
	} else if (this.CorP === "put") {
		 //start with the leaves
	    Derivative[Nodes] = [];

	    for (var i = 0; i <= No_Underlying; i++) {
	    	Derivative[Nodes][i] = Math.max((this.Strike - Underlying[i]), 0);
	    };
	    
	    //now the branches
	    for (var k = 1; Nodes - k >= 0; k++) {
	    	Derivative[Nodes - k] = [];

	        for (var i = k; i <= No_Underlying - k; i++) {
	            Derivative[Nodes - k][i] = (Math.max((this.Strike - Underlying[i]), (Math.exp(((-Rf) * Delta_t_yrs))) * (Pu * Derivative[Nodes - k + 1][i - 1] + Pd * Derivative[Nodes - k + 1][i + 1] + Pm * Derivative[Nodes - k + 1][i])));
	        };
	    };
	} else {
		return "Error!";
	};

	return Derivative[0][Nodes];
};

securitiesOption.prototype.BS = function(Spot, Sigma, Rf, Rd, Days) {
	//note: the natural log is implemented with Math.log in javascript
	var Nd1 = normDist((Math.log(Spot/this.Strike)+Days/365*(Rf-Rd+Math.pow(Sigma,2)/2))/(Sigma*Math.pow((Days/365),0.5)));
	var Nd2 = normDist(((Math.log(Spot/this.Strike)+Days/365*(Rf-Rd+Math.pow(Sigma,2)/2))/(Sigma*Math.pow((Days/365),0.5)))-Sigma*Math.pow((Days/365),0.5));
	var PVx	= this.Strike*Math.exp(-Rf*Days/365);

	var BS = null;

	if (this.CorP === "put") {
		BS = Spot*Math.exp(-Rd*Days/365)*(Nd1-1)-this.Strike*(Nd2-1)*Math.exp(-Rf*Days/365);
	} else {
		BS = Spot*Math.exp(-Rd*Days/365)*Nd1-this.Strike*Nd2*Math.exp(-Rf*Days/365);
	};

	return BS;
};

compoundInterest.prototype.continuousRate = function() {
	return this.Freq * Math.log(1 + this.R / this.Freq);
};

compoundInterest.prototype.effectiveRate = function() {
	return (Math.pow(1 + this.R / this.Freq, this.Freq) - 1);
};

compoundInterest.prototype.futureValue = function(P, t) {
	return (P * Math.pow(1 + this.R / this.Freq, this.Freq * t));
};


//Functions
function erf(x) {
	//source (modified from original): http://www.codeproject.com/Articles/408214/Excel-Function-NORMSDIST-z
    //A&S formula 7.1.26
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;
    x = Math.abs(x);
    var t = 1 / (1 + p * x);
    //Direct calculation using formula 7.1.26 is absolutely correct
    //But calculation of nth order polynomial takes O(n^2) operations
    //return 1 - (a1 * t + a2 * t * t + a3 * t * t * t + a4 * t * t * t * t + a5 * t * t * t * t * t) * Math.Exp(-1 * x * x);

    //Horner's method, takes O(n) operations for nth order polynomial
    return (1 - ((((((a5 * t + a4) * t) + a3) * t + a2) * t) + a1) * t * Math.exp(-1 * x * x));

};

function normDist(z) {
	//source (modified from original): http://www.codeproject.com/Articles/408214/Excel-Function-NORMSDIST-z
	var sign = 1;
    if (z < 0) sign = -1;
    return (0.5 * (1.0 + sign * erf(Math.abs(z)/Math.sqrt(2))));
};