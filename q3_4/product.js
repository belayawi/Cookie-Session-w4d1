class Product{
    constructor(name, price, description,id){
        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
    }
    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
    getPrice(){
        return this.price;
    }
    getId(){
        return this.id;
    }
}

module.exports = Product;