import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import NoData from "../layout/no-data.jsx";
import WishStore from '../../store/WishStore.js';
import Productsskeleton from './../../skeleton/products-skeleton';
import StarRatings from 'react-star-ratings';

const WishList = () => {

    const {WishListRequest,WishList,RemoveWishListRequest}=WishStore();


    useEffect(() => {
        (async ()=>{
           await WishListRequest()
        })()
    }, []);


    const remove = async (productID) => {
        await RemoveWishListRequest(productID)
        await WishListRequest();
    }


    if(WishList===null){
        return (
            <div className="container">
                <div className="row">
                    <Productsskeleton/>
                </div>
            </div>
        );
    }
    else if(WishList.length===0){
        return (
            <NoData/>
        );
    }
    else {
        return (
            <div className="container mt-3">
                <div className="row">

                    {
                        WishList.map((item,i)=>{
                            let price=<p className="bodyMedium  text-dark my-1">Price: ${item['product'][0]['price']} </p>
                            if(item['product']['discount']===true){
                                price=<p className="bodyMedium  text-dark my-1">Price:<strike> ${item['product'][0]['price']} </strike> ${item['product']['discountPrice']} </p>
                            }
                            return(
                                <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                    <div  className="card shadow-sm h-100 rounded-3 bg-white">
                                        <img alt="" className="w-100 rounded-top-2" src={item['product'][0]['image']} />
                                        <div className="card-body">
                                            <p className="bodySmal text-secondary my-1">{item['product'][0]['title']}</p>
                                            {price}
                                            <StarRatings rating={parseFloat(item['product'][0]['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />

                                           
                                            <p className="mt-3">
                                                <button onClick={async ()=>{await remove(item['productID'])}} className="btn  btn-outline-danger btn-sm">Remove</button>
                                                <Link className="btn mx-2 btn-outline-success btn-sm" to={`/details/${item['productID']}`}>Details</Link>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        );
    }
};

export default WishList;