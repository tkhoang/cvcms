utils = {
		toAssociativeTable: function (objectArray){
			
			var associativeTab = [];
			for(i in objectArray){
				associativeTab[objectArray[i].key] = objectArray[i].value;
			}
			return associativeTab;
		}
};

module.exports = utils;