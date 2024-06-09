import React from "react";

function StarRating({ score }) {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i}>&#9733;</span>);
    }

    if (hasHalfStar) {
        stars.push(<span key={fullStars}>&#9734;&#9733;</span>);
    }

    return <div>{stars}</div>;
}

export default StarRating;