import React, { Component } from 'react';
import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import Item7 from '../../images/item7.jpg'
import Item8 from '../../images/item8.jpg'
import Item9 from '../../images/item9.jpg'
import Item10 from '../../images/item10.jpg'
 export default class Home extends Component{
    
    state = {
        items: [
            {id:1,title:'Puma', desc: "This is a genuine product of Puma Sports India Pvt Ltd.", price:"5,695 ",img:Item1},
            {id:2,title:'Nike', desc: "This is a genuine product of Nike Sports India Pvt Ltd.", price:"4,395 ",img: Item2},
            {id:3,title:'Woodland', desc: "The product comes with a standard brand warranty of 90 days",price:"5,395 ",img: Item3},
            {id:4,title:'ADIDAS', desc: "This is a genuine product of ADIDAS Sports India Pvt Ltd.", price:"4,445 ",img:Item4},
            {id:5,title:'Puma', desc: "The product comes with a standard brand warranty of 90 days", price:"3,395 ",img: Item5},
            {id:6,title:'Blues', desc: "This is a genuine product of Blues Sports India Pvt Ltd.",price:"3,305 ",img: Item6},
            {id:7,title:'Puma', desc: "This is a genuine product of Puma Sports India Pvt Ltd.",price:"4,395 ",img:Item7},
            {id:8,title:'Adidas', desc: "This is a genuine product of ADIDAS Sports India Pvt Ltd.",price:"1,395 ",img: Item8},
            {id:9,title:'Diesel', desc: "This is a genuine product of Diesel Sports India Pvt Ltd.", price:"2,495 ",img:Item9},
            {id:10,title:'Adidas', desc: "The product comes with a standard brand warranty of 90 days", price:"4,395 ",img: Item10},
            {id:6,title:'Blues', desc: "This is a genuine product of Blues Sports India Pvt Ltd.",price:"9,795 ",img: Item6},
            {id:1,title:'Puma', desc: "This is a genuine product of Puma Sports India Pvt Ltd.",price:"9,395 ",img:Item1}
            
             ],
        addedItems:[],
        total: 0
    
    }





    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    render(){
        let itemList = this.state.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={item.img} alt={item.title}/>
                            <span className="card-title">{item.title}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" ><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p><b>Price: {item.price}₹</b></p>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <h3 className="center">Our Products</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}