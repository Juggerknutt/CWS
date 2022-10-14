'strict';

const unorderList = document.getElementById('unorder-list');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit-btn');
const goToCountry = document.getElementById('go-to-country');
const showBtn = document.getElementById('show-btn');
const hideBtn = document.getElementById('hide-btn');
const counterElement = document.getElementById('counter-element');
const searchBtn = document.getElementById('search-btn');
const displayCountry = document.getElementById('display-country');
const formResult = document.getElementById('form-result');

let countryCategories = [
    {
        Country: "Sweden",
        Capital: "Stockholm",
        Habitants: "11 million",
		Democracy: "Yes",
    },
    {
        Country: "China",
        Capital: "Beijing",
        Habitants: "300 million",
		Democracy: "No",
    },
    {
        Country: "Finland",
        Capital: "Helsinki",
        Habitants: "7 million",
		Democracy: "Yes",
    },
    {
        Country: "England",
        Capital: "London",
        Habitants: "80 million",
		Democracy: "Yes",
    },
]

let i = 0;
nextBtn.addEventListener('click', function(event){
    if (i > countryCategories.length - 1){
        i = 0;
    }
	unorderList.innerHTML = '';
    for(const [key, value] of Object.entries(countryCategories[i])) {
		let listElement = document.createElement('li');
        unorderList.append(listElement) 
        listElement.innerText = [`${key}: ${value}`]
    }
    i++
    counterElement.innerHTML = `Country ${[i]} of ${countryCategories.length} total`
})

prevBtn.addEventListener('click', function(event){
    if (i === 0){
        i = countryCategories.length;
    }
	i--
	unorderList.innerHTML = '';
    for(const [key, value] of Object.entries(countryCategories[i])) {
		let listElement = document.createElement('li');
        unorderList.append(listElement) 
        listElement.innerText = [`${key}: ${value}`]
    }
    counterElement.innerHTML = `Country ${[i + 1]} of ${countryCategories.length} total`
})

submitBtn.addEventListener('click', function(event){
	event.preventDefault();
	let inputCountry = {
		Country: document.getElementById('input-cou').value,
		Capital: document.getElementById('input-cap').value,
		Habitants: document.getElementById('input-pop').value + " million",
		Democracy: '',
	}
	let radioBtn = document.getElementById('input-dem')
	if (radioBtn.checked === true){
		inputCountry.Democracy = 'Yes'
	} else if (radioBtn.checked === false){
		inputCountry.Democracy = 'No'
	}
	countryCategories.unshift(inputCountry)
	document.querySelector('.reset-form').reset();
})

showBtn.addEventListener('click', function(event){
    goToCountry.innerHTML = '';
    countryCategories.map(function (mapCountry) {
        let listElement = document.createElement('li');
        let btnElement = document.createElement('button');
        let btnDelete = document.createElement('button')
        btnElement.setAttribute('class', 'discover-btn')
        btnDelete.setAttribute('class', 'delete-btn')
        btnElement.innerHTML = 'Discover Me'
        btnDelete.innerHTML = 'Remove Me'
        goToCountry.append(listElement)
        goToCountry.append(btnElement)
        goToCountry.append(btnDelete)
        listElement.innerHTML = mapCountry.Country
    })  
    const discoverBtn = document.getElementsByClassName('discover-btn')
    const removeBtn = document.getElementsByClassName('delete-btn')
    for(let j = 0; j < discoverBtn.length; j++) {
        discoverBtn[j].addEventListener('click', function(openMe){
            goToCountry.innerHTML = '';
            for(const [key, value] of Object.entries(countryCategories[j])){
                let listElement = document.createElement('li')
                goToCountry.append(listElement)
                listElement.innerHTML = [`${key}: ${value}`]
            }
        })
        removeBtn[j].addEventListener('click', function(removeMe){
            if (countryCategories.length > 1){
                goToCountry.innerHTML = '';
                countryCategories.splice([j], 1) 
                let removedItem = document.createElement('p')
                removedItem.innerText = `Country Removed!`
                goToCountry.append(removedItem)
            } else if (countryCategories.length === 1) {
                goToCountry.innerHTML = '';
                let warningText = document.createElement('p')
                warningText.innerText = 'Nope, you cannot ruin this JavaScript!'
                goToCountry.append(warningText)
            }
        })
    }
})

hideBtn.addEventListener('click', function(event){
    goToCountry.innerHTML = '';
    displayCountry.innerHTML = '';
    formResult.innerHTML = '';
})

searchBtn.addEventListener('click', function(event){
    event.preventDefault()
    formResult.innerHTML = '';
    let mySearch = document.getElementById('my-search').value;
    let values = countryCategories.filter(function(findCountry){
        let returnValue = findCountry.Country.indexOf(mySearch) > - 1
        return returnValue
    })
	if(values.length == 0){
		alert(`No match found '${mySearch}', please type again.`)
		displayCountry.append("We could'nt match with your search result: "+mySearch)
	} else {
		let pElement = document.createElement('p')
		pElement.innerHTML = 'Your match result:'
		formResult.append(pElement)
		for(const [key, value] of Object.entries(values[0])) {
			let listElement = document.createElement('li')
			listElement.innerHTML = [`${key}: ${value}`]
			formResult.append(listElement)
		}
	}
})
