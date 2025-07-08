document.addEventListener('DOMContentLoaded', () => {
  let fullbar = parseInt(localStorage.getItem("fullbars")) || 10;
  if(!localStorage.getItem("fullbars")){ //STUPID
    localStorage.setItem("fullbars", fullbar)
  }
  const test = 0;
  function plus(key,value){ // another fyunction
    let e = parseInt(localStorage.getItem(key)) || 0
    localStorage.setItem(key,e+value)
  }

  function minus(key,value){ // i hate this stuff
    let e = parseInt(localStorage.getItem(key)) || 0
    localStorage.setItem(key,e-value)
  }

  class Upgrade { // class for upgrades duh
    constructor(id, name,basecost,repeatable){
      const button = document.getElementById(id);
      if(!button){
        throw new Error("id wrong dumbass button doesn't exist")
      }
      this.repeatable = repeatable; // read
      this.bought = false;
      this.id = id;
      this.name = name;
      this.purchases = 0; // fixed stupid error
      this.basecost = basecost;
      this.cost = basecost;
      this.button = button;
      this.mult = 1;
      this.scaling = 1.25;
      this.capped = false;
      button.innerText = name + " " + "Cost: " + basecost.toString(); // because yes
      button.addEventListener('click', () => this.buy()); // JAUIREGJOAREGRAE
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
          localStorage.setItem("fullbars", fullbar)
        }
      }
    }
    change(name,repeatable,scaling){ // change floor
      this.name = name;
      this.repeatable = repeatable;
      this.scaling = scaling
      this.update();
    }
    getPurchases(){
      return this.purchases // b
    }
    getValue(){
      if(this.purchases != 0){ // so u dont divide ur brain by 0 accideantly
        return (this.purchases * this.mult) / 20
      }
      return 0
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
      this.p.innerText = value // set ur balls
    }
  }

  const bar1upg = new Upgrade("buy1bar", "Buy 1 bar", 10, true) // button to insert a brain
  bar1upg.update() // update ur balls
  const bartext = new Text("fullbarstext", "ur bars")

  const interval = setInterval(() => { // stupid while but js doesnt have wait
    bar1upg.update() // duh
    fullbar += bar1upg.getValue() || 0 // some nerd stuff
    bartext.update("You have " + fullbar.toString() + " " + "FullBars") // get a brain
    localStorage.setItem("fullbars", fullbar) // nedrline
  }, 50)
});
