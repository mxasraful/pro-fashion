import React from 'react';

const HomeMessage = () => {
    return (
        <div className="homeMessageComp my-5">
            <div className="container text-center">
                <h1 className="" style={{ fontSize: "4.5rem" }}>New Arrivals</h1>
                <br /><br />
                <div className="row">
                    <div className="col-2"></div>
                    <h4 className="text-secondary col-8 text-center">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections</h4>
                </div>
            </div>
        </div>
    );
};

export default HomeMessage;