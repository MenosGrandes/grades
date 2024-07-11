function process_csv(csv_file) {
	/*
		"First Name","Last Name","Email Address","Resit exam (Object oriented programming in javascript)","Points","Feedback","second graded test","Points","Feedback","RETAKE - First Graded Test!","Points","Feedback","First Graded Test!","Points","Feedback","Project","Points","Feedback"
		This is example of CSV Header in MSTeams export of grades..
		first 3 indexes are stable, but rest must be replaced
		*/
	var reader = new FileReader();

	reader.readAsText(csv_file, 'UTF-8');

	let getData = () => {
		return new Promise((resolve) => {
			reader.onload = function (evt) {
				var text = reader.result; // the entire file
				var file_array = text.split('\r\n');
				let header = file_array.shift(); // Get infor what delimiter is this MenosGrandes
				let _header = header
					.split(' ')
					.join('_')
					.replace(/"|!|-|\.|/g, '')
					.replace(/\(|\)/g, '')
					.replace(/\[|\]/g, '')
					.split(',');
				for (let i = 3; i < _header.length; i += 3) {
					_header[i] = _header[i].concat('__').concat("POINTS");
					_header[i + 1] = _header[i].concat('__').concat("MAX");
					_header[i + 2] = _header[i].concat('__').concat(_header[i + 2].toUpperCase());
				}
				file_array[0] = _header;
				let file_content = file_array.join('\r\n');
				resolve(new Blob([file_content], { type: 'plain/text' }));
			};
			reader.onerror = function (evt) {};
		});
	};
	return getData();
}
/*
	* csv - assume that this is an object like Json.
	* */
function get_headers_from_csv(csv)
{
	return Object.keys(csv)
}

function get_values_from_csv(csv)
{
	return Object.values(csv)
}
export {process_csv, get_headers_from_csv, get_values_from_csv};
