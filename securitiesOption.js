function securitiesOption(oConstructor) {
    this.Strike = oConstructor.Strike;
    this.CorP = oConstructor.CorP.toLowerCase();   

	this.trinomialCRR = function(Spot, Sigma, Rf, Days, Nodes) {
		Nodes = Math.round((Nodes || 800));
		var Delta_t_yrs, Up, Down, Pu, Pd, Pm, Max_up, No_Underlying;

		Delta_t_yrs = (Days / 365 / Nodes);
		Up = (Math.exp((Sigma * Math.sqrt(2 * Delta_t_yrs))));
		Down = (1 / Up);
		Pu = (Math.pow((Math.exp(Rf * Delta_t_yrs / 2) - (Math.exp((-Sigma) * Math.sqrt(Delta_t_yrs / 2)))) / ((Math.exp(Sigma * Math.sqrt(Delta_t_yrs / 2))) - Math.exp((-Sigma) * Math.sqrt(Delta_t_yrs / 2))),2));
		Pd = (Math.pow(((Math.exp(Sigma * Math.sqrt(Delta_t_yrs / 2)) - Math.exp(Rf * Delta_t_yrs / 2)) / (Math.exp(Sigma * Math.sqrt(Delta_t_yrs / 2)) - Math.exp((-Sigma) * Math.sqrt(Delta_t_yrs / 2)))),2));
		Pm = (1 - Pu - Pd);
		Max_up = (Spot * Math.pow(Up, Nodes));
		No_Underlying = (Nodes * 2);

		console.log(Delta_t_yrs, Up, Down, Pu, Pd, Pm, Max_up, No_Underlying);

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
};