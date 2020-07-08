window.onload=function(){
	document.querySelector('#item-name').value='';
	document.querySelector('#item-calories').value='';
}

//STORAGE MODULE PATTERN
const StorageControl=(function(){

	return{
		setItemToLS:function(item){
			let items;

			if(localStorage.getItem('items') === null){
				items=[];

				items.push(item);
				localStorage.setItem('items',JSON.stringify(items));
			}
			else{
				items=JSON.parse(localStorage.getItem('items'));
				items.push(item);

				localStorage.setItem('items',JSON.stringify(items));
			}
		},
		getItemsFromLS:function(){
			let items;

			if(localStorage.getItem('items') === null){
				items=[];
			}
			else{
				items=JSON.parse(localStorage.getItem('items'));
			}
			return items;
		},
		updateItemsInLS:function(itemUp){
			let items=JSON.parse(localStorage.getItem('items'));

			items.forEach(function(item,index){
				if(itemUp.id === item.id){
					items.splice(index,1,itemUp);
				}
			})
			localStorage.setItem('items',JSON.stringify(items));
		},
		deleteItemFromLS:function(id){
			let items=JSON.parse(localStorage.getItem('items'));

			items.forEach(function(item,index){
				if(id === item.id){
					items.splice(index,1);
				}
			})
			localStorage.setItem('items',JSON.stringify(items));
		},
		clearItemsFromLS:function(){
			localStorage.removeItem('items');
		}
	}
})()

//ITEM MODULE PATTERN
const ItemControl=(function(){

	const Item=function(id,name,calories){
		this.id=id;
		this.name=name;
		this.calories=calories;
	}
	const data={
		items:StorageControl.getItemsFromLS(),
		currenItem:null,
		totalCalories:0
	}
	return{
		datafunc:function(){
			return data;
		},
		getItemsFromDS:function(){
			return data.items;	
		},
		addNewDataToDS:function(inputData){
			let id;
			if(data.items.length > 0){
				id=data.items[data.items.length-1].id +1;
			}
			else{
				id=0;
			}
			inputData.calories=parseInt(inputData.calories)

			const newItem=new Item(id,inputData.name,inputData.calories)
			data.items.push(newItem);

			return newItem;
		},
		getTotalCalFromDS:function(){
			let total=0;
			data.items.forEach(function(item){
				total+=item.calories;
			})
			data.totalCalories=total;

			return total;
		},
		getItemToEditFromDS:function(itemId){
			let itemFound=null;

			data.items.forEach(function(item){
				if(item.id === itemId){
					itemFound=item;
				}
			})
			return itemFound;
		},
		setCurrentItemInDS:function(item){
			data.currentItem=item;
		},
		getCurrentItemFromDS:function(){
			return data.currentItem;
		},
		updateItemInDS:function(i){
			i.calories=parseInt(i.calories);
			let itemFound=null;

			data.items.forEach(function(item){
				if(item.id === data.currentItem.id){
					item.name=i.name;
					item.calories=i.calories;
					found=item;
				}
			})
			return found;
		},
		deleteItemFromDS:function(id){

			const ids=data.items.map(function(item){
				return item.id;
			})

			const index=ids.indexOf(id);

			data.items.splice(index,1)
		},
		clearItemsFromDS:function(){
			data.items=[];
		}
	}
})()

//UI MODULE PATTERN
const UIControl=(function(){

	const UIQuerySelectors={
		itemList:'#item-list',
		addButton:'.add-btn',
		itemInputName:'#item-name',
		itemInputCalories:'#item-calories',
		totalCalories:'.total-calories',
		updateButton:'.update-btn',
		deleteButton:'.delete-btn',
		backButton:'.back-btn',
		itemListItems:'#item-list li',
		clearButton:'.clear-btn'
	}

	return{
		showItemsOnUI:function(items){

			let output='';
			items.forEach(function(item){
				output+=`
				<li class="collection-item" id="item-${item.id}">
        			<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        			<a href="#" class="secondary-content">
          			<i class="edit-item fa fa-pencil"></i>
        			</a>
      			</li>
				`
			})
			document.querySelector(UIQuerySelectors.itemList).innerHTML=output;
		},
		getSelectors:function(){
			return UIQuerySelectors;
		},
		getInputData:function(){
			return{
				name:document.querySelector(UIQuerySelectors.itemInputName).value,
				calories:document.querySelector(UIQuerySelectors.itemInputCalories).value
			}
		},
		showDataOnScreen:function(newData){
			document.querySelector(UIQuerySelectors.itemList).style.display='block';

			const item=document.createElement('li');
			item.className="collection-item";
			item.id=`item-${newData.id}`;

			item.innerHTML=`
				<strong>${newData.name}: </strong> <em>${newData.calories} Calories</em>
        		<a href="#" class="secondary-content">
          		<i class="edit-item fa fa-pencil"></i>
        		</a>
			`
			document.querySelector(UIQuerySelectors.itemList).insertAdjacentElement('beforeend',item)
		},
		clearFields:function(){
			document.querySelector(UIQuerySelectors.itemInputName).value='';
			document.querySelector(UIQuerySelectors.itemInputCalories).value='';
		},
		hideListLine:function(){
			document.querySelector(UIQuerySelectors.itemList).style.display='none';
		},
		showTotalCaloriesInUI:function(totalCal){
			document.querySelector(UIQuerySelectors.totalCalories).textContent=totalCal;
		},
		initialState:function(){
			UIControl.clearFields();
			document.querySelector(UIQuerySelectors.updateButton).style.display='none';
			document.querySelector(UIQuerySelectors.deleteButton).style.display='none';
			document.querySelector(UIQuerySelectors.backButton).style.display='none';
			document.querySelector(UIQuerySelectors.addButton).style.display='inline';
		},
		editItemInUI:function(){

			document.querySelector(UIQuerySelectors.itemInputName).value=ItemControl.getCurrentItemFromDS().name;
			document.querySelector(UIQuerySelectors.itemInputCalories).value=ItemControl.getCurrentItemFromDS().calories;

			document.querySelector(UIQuerySelectors.addButton).style.display='none';
			document.querySelector(UIQuerySelectors.updateButton).style.display='inline';
			document.querySelector(UIQuerySelectors.deleteButton).style.display='inline';			
			document.querySelector(UIQuerySelectors.backButton).style.display='inline';						
		},
		updateItemInUI:function(item){
			let listItem=document.querySelectorAll(UIQuerySelectors.itemListItems);

			listItem=Array.from(listItem);

			listItem.forEach(function(i){

				const itemID=i.getAttribute('id');

				if(itemID === `item-${item.id}`){
					document.querySelector(`#${itemID}`).innerHTML=`
						<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        				<a href="#" class="secondary-content">
          				<i class="edit-item fa fa-pencil"></i>
        				</a>
					`
				}
			})
		},
		deleteItemFromUI:function(id){
			const itemID=`#item-${id}`;
			const item=document.querySelector(itemID);
			item.remove();
		},
		clearItemsFromUI:function(){
			let listItems=document.querySelectorAll(UIQuerySelectors.itemListItems);

			listItems=Array.from(listItems);

			listItems.forEach(function(item){
				item.remove();
			})
		}
	}

})()

//MAIN APP(INITIALIZER) MODULE PATTERN
const AppControl=(function(ItemControl,StorageControl,UIControl){

	const loadEvents=function(){
		const UIQuerySelectors=UIControl.getSelectors();

		document.querySelector(UIQuerySelectors.addButton).addEventListener('click',addItem);

		document.querySelector(UIQuerySelectors.itemList).addEventListener('click',editItems);

		document.querySelector(UIQuerySelectors.updateButton).addEventListener('click',updateItems);

		document.querySelector(UIQuerySelectors.backButton).addEventListener('click',UIControl.initialState);

		document.querySelector(UIQuerySelectors.deleteButton).addEventListener('click',deleteItems);

		document.querySelector(UIQuerySelectors.clearButton).addEventListener('click',clearItems);

		document.addEventListener('keypress',function(e){
			if(e.keyCode === 13){
				e.preventDefault();
				return false;
			}
		})

	}

	function addItem(e){

		const inputData=UIControl.getInputData();

		if(inputData.name!=='' && inputData.calories!=''){
			
			const newData=ItemControl.addNewDataToDS(inputData);

			const totalCalories=ItemControl.getTotalCalFromDS();

			UIControl.showTotalCaloriesInUI(totalCalories);

			UIControl.showDataOnScreen(newData);

			StorageControl.setItemToLS(newData);

			UIControl.clearFields();
		}
		e.preventDefault();
	}

	function editItems(e){

		if(e.target.classList.contains('edit-item')){
			
			const item=e.target.parentNode.parentNode.id;

			const itemArr=item.split('-');

			const itemId=parseInt(itemArr[1]);

			const itemToEdit=ItemControl.getItemToEditFromDS(itemId);

			ItemControl.setCurrentItemInDS(itemToEdit);

			UIControl.editItemInUI();
		}
		e.preventDefault();
	}

	function updateItems(e){

		const updateInput=UIControl.getInputData();

		const itemToBeUpdated=ItemControl.updateItemInDS(updateInput);

		UIControl.updateItemInUI(itemToBeUpdated);

		const totalCalories=ItemControl.getTotalCalFromDS();

		UIControl.showTotalCaloriesInUI(totalCalories);

		StorageControl.updateItemsInLS(itemToBeUpdated);

		UIControl.initialState();	

		e.preventDefault();
	}

	function deleteItems(e){

		const currItem=ItemControl.getCurrentItemFromDS();

		ItemControl.deleteItemFromDS(currItem.id);

		UIControl.deleteItemFromUI(currItem.id);

		const totalCalories=ItemControl.getTotalCalFromDS();
		
		UIControl.showTotalCaloriesInUI(totalCalories);

		StorageControl.deleteItemFromLS(currItem.id);

		UIControl.initialState();	

		e.preventDefault();
	}

	function clearItems(e){

		ItemControl.clearItemsFromDS();

		UIControl.clearItemsFromUI();

		const totalCalories=ItemControl.getTotalCalFromDS();
		
		UIControl.showTotalCaloriesInUI(totalCalories);

		StorageControl.clearItemsFromLS();

		UIControl.initialState();	
	}

	return{
		initialize:function(){

			UIControl.initialState();

			const items=ItemControl.getItemsFromDS();

			if(items.length === 0){
				UIControl.hideListLine();
			}
			else{
				UIControl.showItemsOnUI(items);
			}
			const totalCalories=ItemControl.getTotalCalFromDS();

			UIControl.showTotalCaloriesInUI(totalCalories);

			loadEvents();
		}
	}

})(ItemControl,StorageControl,UIControl);

AppControl.initialize()