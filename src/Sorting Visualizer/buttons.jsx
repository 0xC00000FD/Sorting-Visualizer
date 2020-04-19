import React from 'react';

const styles = {
    position: "relative",
    alignSelf: "center",
    border: 0,
    fontSize: 24,
    padding: 35,
    backgroundColor: "aquamarine"
}
export class Buttons extends React.Component{
    render(){
        return(
            <>
                <button onClick={this.props.onHandleShuffle} style={styles}>Shuffle</button>
                <button onClick={this.props.cSort} style={styles}>Counting Sort</button>
            </>
        );
    }
}