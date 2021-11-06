import React from 'react';
import { connect } from 'react-redux';

import { AddButton, BackgroundImage, CollectionFooterContainer, CollectionItemContainer, NameContainer, PriceContainer } from './collection-item.styles';

import { addItem } from '../../redux/cart/cart.actions';


const CollectionItem = ({ item, addItem }) => {
    const { name, imageUrl, price } = item;
    return (
        <CollectionItemContainer>
            <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer className="price">&#8377; {price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={()=> {addItem(item)}} inverted>Add to cart</AddButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
