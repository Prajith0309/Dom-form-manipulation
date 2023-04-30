// Item ctrl
const ItemCtrl = (function(){
    const item= function(id,firstname,lastname,address,pincode,food,gender,state,country){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.pincode = pincode;
        this.food = food;
        this.gender = gender;
        this.state = state;
        this.country = country

    }
    const data = {
        items : []
    }
    return{
       addItem:function(input){
           let strfood = input.food;
           let strgender = input.gender
          let ID;
          if(data.items.length>0){
           ID = data.items.length+1
          }else{
           ID =1;
          }
          let firstname = input.firstname;
          let lastname = input.lastname;
          let address = input.address;
          let pincode = input.pincode;
          let food = strfood.toString();
          let gender = strgender;
          let state = input.state;
          let country = input.country;

          newItem = new item(ID,firstname,lastname,address,pincode,food,gender,state,country)
          data.items.push(newItem)
          return newItem
       }
       
    }
    
})();

// UI ctrl
const UICtrl = (function(){
  const UIselectors={
     innerform :'.innerfrm',
     fnname:'#first-name',
     lnname:'#last-name',
     address:'#address',
     pincode:'#pincode',
     food:'#foo',
     gender:'#gender',
     state:'#state',
     country:'#country',
     submit:'.sub-btn',
     itemlist:'#item-list',
     collection:'.collection',
     tableheader:'.tablehead',
     datalist:'#data-list',
     noitem:'.no-item'
   }
   
   return{
       getselector:function(){
           return UIselectors
       },
       showItem:function(){
           document.querySelector(UIselectors.noitem).style.display = 'block';
       },
       hideItem:function(){
           document.querySelector(UIselectors.noitem).style.display = 'none';
       },
       getfoo:function(){
           let selectedFoods = [];
           let foods = document.querySelectorAll(UIselectors.food)
           foods.forEach((food)=>{
               if(food.checked){
                   selectedFoods.push(food.value);
               }
           })
           return selectedFoods
       },
       getgender:function(){
        let selectedgender = [];
        let genderx = document.querySelectorAll(UIselectors.gender)
        genderx.forEach((gender)=>{
            if(gender.checked){
                selectedgender.push(gender.value);
            }
        })
        return selectedgender
    },
       
       getInpitem:function(){
         let food =  UICtrl.getfoo()
         let gender = UICtrl.getgender()
           return{
               firstname:document.querySelector(UIselectors.fnname).value, 
               lastname:document.querySelector(UIselectors.lnname).value,
               address:document.querySelector(UIselectors.address).value,
               pincode:document.querySelector(UIselectors.pincode).value,
               food: food,
               gender:gender,
               state:document.querySelector(UIselectors.state).value,
               country:document.querySelector(UIselectors.country).value,
           }
           
       },
       addlistItem: function(item){
           const tr = document.createElement("tr");
             tr.className = `inner-item item-${item.id}`;
             tr.innerHTML=`
           <td>${item.id}</td>
           <td>${item.firstname}</td>
           <td>${item.lastname}</td>
           <td>${item.address}</td>
           <td>${item.pincode}</td>
           <td>${item.gender}</td>
           <td>${item.food}</td>
           <td>${item.state}</td>
           <td>${item.country}</td>
           `;

           document.querySelector(UIselectors.datalist).appendChild(tr)
       },
       clearCk:function(){
           let foods = document.querySelectorAll(UIselectors.food)
           foods.forEach((food)=>{
               if(food.checked){
                   food.checked = false;
               }
           })
       },
       clearCm:function(){
        let genderx = document.querySelectorAll(UIselectors.gender)
        genderx.forEach((gender)=>{
            if(gender.checked){
                gender.checked = false;
            }
        })
        },
       clerinp: function(){
           UICtrl.clearCk()
           UICtrl.clearCm()
           document.querySelector(UIselectors.fnname).value='',
           document.querySelector(UIselectors.lnname).value='',
           document.querySelector(UIselectors.address).value='',
           document.querySelector(UIselectors.pincode).value='',
           document.querySelector(UIselectors.state).value='',
           document.querySelector(UIselectors.country).value=''
       }
   }
})();


// App ctrl
const AppCtrl = (function(){
   const UIselectors = UICtrl.getselector();
   const loadEventListeners = function(){
     document.querySelector(UIselectors.submit).addEventListener('click',itemAddsubmit);
   }

   const itemAddsubmit = function(e){
        e.preventDefault();
        UICtrl.getfoo()
        UICtrl.getgender()
        const input = UICtrl.getInpitem()
       if(input.firstname === "" || input.lastname === "" || input.address === "" || input.pincode === "" || input.state === "" || input.country === ""){
           alert('Some fields are empty')
           return false
       }
       else if(input.food.length < 2){
           alert('must choose atleast 2 food')
           return false
       }
       else if(input.gender.length<1){
        alert('must choose atleast 1 gender')
        return false
    }
       else{
           const newItem = ItemCtrl.addItem(input)
           UICtrl.addlistItem(newItem)
           UICtrl.clerinp()
           UICtrl.hideItem()
       }
   } 
   return{
       init:function(){
           loadEventListeners()
       }
   }


})(ItemCtrl,UICtrl);

AppCtrl.init()