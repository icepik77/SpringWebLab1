const container = document.querySelector('.container .group');
const currencyDate = document.querySelector('.container .date');

const firstInput = container.querySelector('.first-input');
const secondInput = container.querySelector('.second-input');

const firstSelect = container.querySelector('.first-select');
const secondSelect = container.querySelector('.second-select');

firstInput.addEventListener('input', () => firstHandle());
secondInput.addEventListener('input', () => secondHandle());

firstSelect.addEventListener('change', () => firstHandle());
secondSelect.addEventListener('change', () => secondHandle());

const firstHandle = () => {
	const value = firstInput.value;
	const currency = firstSelect.options[firstSelect.selectedIndex].dataset.currency;
	secondInput.value = value * currency;
}
const secondHandle = () => {
	const value = secondInput.value;
	const currency = secondSelect.options[secondSelect.selectedIndex].dataset.currency;
	firstInput.value = value * currency;
}

const handleInput = () => {
	const first = firstSelect.options[firstSelect.selectedIndex].dataset.currency;
	const second = secondSelect.options[secondSelect.selectedIndex].dataset.currency;
	
	firstInput.value = 1;
	firstHandle();
};

const handleRequest = ({ data }) => {
	const date = new Date(data.PreviousDate);
	const optionsDateFormat = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
 		minute: 'numeric',
		second: 'numeric'
	};
	
	currencyDate.innerHTML = date.toLocaleDateString('ru-RU', optionsDateFormat);


	Object.values(data.Valute).forEach(valute => {
		const option = document.createElement('option');
		const option2 = document.createElement('option');
		
		option.innerHTML = valute.Name;
		option.dataset.currency = valute.Value;
		if (valute.CharCode === 'EUR')
			option.selected = true;
			
		option2.innerHTML = valute.Name;
		option2.dataset.currency = valute.Value;
		if (valute.CharCode === 'BYN')
			option2.selected = true;
			
		firstSelect.append(option);
		secondSelect.append(option2);
	});
	
	handleInput();
}

const options = {
	headers: { 'Content-Type': 'application/json' }
}
axios.get('https://www.cbr-xml-daily.ru/daily_json.js', options)
	.then(handleRequest).catch();