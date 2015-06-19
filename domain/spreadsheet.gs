/*
 * Wrapper around Google spreadsheets
 *
 */
function SpreadSheet() {
	this.__active = SpreadsheetApp.getActiveSpreadsheet();
}

/*
 * @param location With the form:
 *		location {
 *			name: 'the_sheet_name',
 *			range: 'A1:A1'
 *		}
 * @retun Range of cells
 *
 */
SpreadSheet.prototype.getRange = function(location) {
	return this.__active.getSheetByName(location.name).getRange(location.range);
};

/*
 * @param location See @link getRange
 * @param row The number of the returned row. Zero based.
 *
 * @return Array with the row's values.
 *
 */
SpreadSheet.prototype.getRow = function(location, row) {
	var r = this.getRange(location);
	var arr = new Array();

	for(var c = 0; c < r.getLastColumn(); c++) {
		cell = r.getCell(row, c);
		arr.push(cell.getValue());
	}

	return arr;
};

SpreadSheet.prototype.getValue = function(location, row, column) {
	var r = this.getRange(location);
	var c = r.getCell(row, column);

	return c.getValue();
};

/*
 * @param location
 * @param key Array of values that represent the key to look for, if an
 * element in the Array is null it will be mean that any value satisfice
 * the key. Ex: [null, 'DOG', 2015, null, 'July']. Or if we are looking just
 * one value: ['June']
 *
 * @return The row number were the value was found, null if it wasn't
 *
 */
SpreadSheet.prototype.find = function(location, key) {
	var r = this.getRange(location);

	if(key.length > r.getNumColumns()) return null;

	for(var row = 1; row <= r.getNumRows(); row++) {
		var ec = 0; // Empty cell counter

		for(var col = 1; col <= key.length; col++) {
			var v = r.getCell(row, col).getValue();

			if(!v) ec++;
			if(ec == key.length) return null; // Seems the row is empty...

			if(key[col - 1] === null) continue; // Any value is valid
			if( (v instanceof Date) && v.equalsTo(key[col - 1]) ) continue;
			if(key[col - 1] === v) continue;

			break; // if reach to here this is not our row;
		}

		if( col == (key.length + 1) ) return row; // We get it.
	}

	return null;
};

SpreadSheet.prototype.logData = function(location) {
	var r = this.getRange(location);

	Logger.log('Row (s, l, c): (%s, %s, %s)', r.getRow(), r.getLastRow(), r.getNumRows());
	Logger.log('Col (s, l, c): (%s, %s, %s)', r.getColumn(), r.getLastColumn(), r.getNumColumns());

	for(var row = 1; row <= r.getNumRows(); row++) {
		var ec = 0; // Empty cell counter

		for(var col = 1; col <= r.getNumColumns(); col++) {
			var v = r.getCell(row, col).getValue();

			if(!v) ec++;
			if(ec == r.getNumColumns()) return null; // All the row is empty, end reached.

			if(v instanceof Date) v = Utilities.formatDate(v, "GMT", "yyyy-MM-dd HH:mm:ss");
			Logger.log('(%s, %s) = %s', row, col, v)
		}
	}
};
