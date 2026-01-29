import BigNum from './break_infinity.js';
document.addEventListener('DOMContentLoaded', () => {
  let fullbar = parseInt(localStorage.getItem("fullbars")) || 10;
  if(!localStorage.getItem("fullbars")){ //STUPID
    localStorage.setItem("fullbars", fullbar)
  }
  let g = null;
  function plus(key,value){ // another fyunction
    let e = parseInt(localStorage.getItem(key)) || 0
    localStorage.setItem(key,e+value)
  }

  function minus(key,value){ // i hate this stuff
    let e = parseInt(localStorage.getItem(key)) || 0
    localStorage.setItem(key,e-value)
  }

  class Upgrade { // class for upgrades duh
    constructor(id, name,basecost,repeatable,active){
      const button = document.getElementById(id);
      if(!button){
        throw new Error("id wrong dumbass button doesn't exist")
      }
      this.repeatable = repeatable; // read
      this.bought = false;
      this.id = id;
      this.name = name;
      const storedPurch = localStorage.getItem(id) || 0;
      this.purchases = 0; // fixed stupid error
      this.basecost = basecost;
      this.cost = localStorage.getItem(id + "cost") || basecost;
      this.button = button;
      this.mult = 1;
      this.scaling = 1.25;
      this.capped = false;
      this.fullity = 0;
      this.generated = 0;
      this.active = active
      button.innerText = name + " " + "Cost: " + basecost.toString();// because yes
      button.addEventListener('click', () => this.buy()); // JAUIREGJOAREGRAE
    }
    isFull(){ // i hate this i dont think i need this but its useful i bet
      if(this.fullity >= 1) {
        return true;
      }
      if(this.fullity < 1) {
        return false;
      }
    }
    changeMult(mult){
        this.mult = mult;
    }
    getMult(){
      return this.mult;
    }
    hide(){
      document.getElementById(this.id).style.visibility = "hidden";
    }
    show(){
      document.getElementById(this.id).style.visibility = "visible";
    }
    updateFullity(){
      let a = this.basecost*1000;
      this.fullity = this.generated/a;
    }
    update(){ // update ur head
      this.button.innerText = this.name + " " + "Cost: " + this.cost.toString();
    }
    buy(){ // buy brain
      if(fullbar >= this.cost){
        if((!this.repeatable && !this.bought) || (this.repeatable && !this.capped)){
          fullbar = fullbar - this.cost
          this.cost = this.cost * this.scaling;
          this.bought = true
          this.purchases += 1 // understna
          this.update()
          localStorage.setItem(this.id + "cost", this.cost)
          localStorage.setItem("fullbars", fullbar)
          plus(this.id, 1)
        }
      }
    }
    buyMax(){
        let boughtSomething = false;
            
        while(fullbar >= this.cost){
          if((!this.repeatable && this.bought) || this.capped){
            break;
          }
            
              fullbar -= this.cost;
              this.cost = this.cost * this.scaling;
              this.bought = true;
              this.purchases += 1;
              boughtSomething = true;
            
              plus(this.id, 1);
              }
              if(boughtSomething){
                this.update();
                localStorage.setItem(this.id + "cost", this.cost);
                localStorage.setItem("fullbars", fullbar);
              }
          }
    resetfull(){
      this.fullity = 0;
      this.generated = 0;
    }
    reset(){
      this.cost = this.basecost;
      this.resetfull();
    }
    change(name,repeatable,scaling){ // change 
      if(name){
        this.name = name || 'Placeholder';
      }
      if(repeatable){
        this.repeatable = repeatable || false;
      }
      if(scaling){
        this.scaling = scaling || 1.025;
      }
      this.update();
    }
    addGenerated(gen){
      this.generated = this.generated + gen; // wow what a bad function
    }
    getPurchases(){
      return this.purchases // b
    }
    getValue(){
     // so u dont divide ur brain by 0 accideantly
      if(this.isActive() == true){
      return ((localStorage.getItem(this.id) || this.purchases) * this.mult) / 20
      } else {
        return 0
      }
    }
    isActive(){
      return this.active;
    }
    changeactive(active){
      this.active = active;
    }
  }
  class Text {
    constructor(id,text){
      this.id = id
      this.text = text
      this.p = document.getElementById(id) // get real, text
      this.p.innerText = text // u cant understand that ????
    }
    update(value){
      this.text = value
      this.p.innerText = value // set ur brain
    }
  }
  class SacrificeBase{
    constructor(id,name,cost,scaling){
       const button = document.getElementById(id);
       if(!button){
         throw new Error("id wrong dumbass button doesn't exist")
       }
      this.button = button;
      this.id = id;
      this.name = name;
      this.cost = cost;
      this.scaling = scaling;
    }
    change(name,scaling,cost){
      if(name){
        this.name = name || 'Placeholder';
      }
      if(cost){
        this.cost = cost || false;
      }
      if(scaling){
        this.scaling = scaling || 1.025;
      }
      this.update();
    }
    update(additional){
      this.button.innerText = this.name + " " + additional + " " + "Cost: " + this.cost.toString();
    }
  }
  class expand extends SacrificeBase{
    constructor(id,name,cost,scaling){
      super(id,name,cost,scaling);
      this.expanded = localStorage.getItem(id) || 0;
      this.button.addEventListener('click', () => this.expand());
    }
    expand(){
      if(this.expanded == 0){
        this.expanded += 1;
        bar2upg.show();
        bar1upg.reset();
        localStorage.setItem(this.id, this.expanded)
      }
    }
  }
  const bar1upg = new Upgrade("buy1bar", "Buy 1 bar", 10, true); // button to insert a brain
  bar1upg.update() // update ur br
  const bartext = new Text("fullbarstext", "ur bars");
  const bar2upg = new Upgrade("buy2bar", "Buy second bar", 100, true, false); // STUPID INTERPRETER I DIDNTAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  bar2upg.hide();
  let bar1full = false;
  const buyMaxBtn = document.getElementById("buyMax");
    buyMaxBtn.addEventListener("click", () => {
      bar1upg.buyMax();
    });  
  const interval = setInterval(() => { // stupid while but js doesnt have wait
    bar1upg.update() // duh
    fullbar += bar1upg.getValue() || 0 // some nerd stuff
    bar1upg.addGenerated(bar1upg.getValue() || 0) // i wonder why we need this
    bartext.update("You have " + fullbar.toFixed(2).toString() + " " + "FullBars") // get a brain
    if(bar1upg.isFull() == false){
      bar1upg.updateFullity() // dont ask the name
    }
    if(bar1upg.isFull() == true){
      bar1upg.change("Buy 1 bar ITS FULL ITS FULL") // Oh mi gawd! fix ur code u have terrible optimisation
    }
    if(bar2upg.isActive()){
      bar2upg.show()
      bar1upg.changeMult(bar1upg.getMult() + Math.log10(bar2upg.getValue()+1)/15)
    }
    localStorage.setItem("fullbars", fullbar) // nedrline
  }, 50)
});
// put here so it updates
// x2
